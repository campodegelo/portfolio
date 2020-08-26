// CONSTANT DECLARATIONS
const express = require("express");
const app = express();
// const basicAuth = require("basic-auth");
const cookieSession = require("cookie-session");
const server = require("http").Server(app);
const path = require("path");
const compression = require("compression");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const db = require("./scripts/db");
const axios = require("axios");
const s3 = require("./scripts/s3.js");
const { s3Url } = require("./config");
const { compare, hash } = require("./scripts/bcrypt");

// HANDLING SECRETS
let secrets;
if (process.env.NODE_ENV === "production") {
  secrets = process.env; // in prod the secrets are environment variables
} else {
  secrets = require("./secret"); // in dev they are in secrets.json which is listed in .gitignore
}

// COMPRESSION MIDDLEWARE
app.use(compression());

// STATIC FILES
app.use(express.static(__dirname + "../public"));

// REQ.BODY ACCESSIBILITY
app.use(
  express.urlencoded({
    extended: false
  })
);

// COOKIES HANDLER
const cookieSessionMiddleware = cookieSession({
  secret: secrets.SESSION_SECRET,
  maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);

// SERVE JSON
app.use(express.json());

// CSURF MIDDLEWARE
app.use(csurf());
app.use(function(req, res, next) {
  var token = req.csrfToken();
  res.cookie("XSRF-TOKEN", token);
  res.locals.csrfToken = token;
  next();
});

/************** Multer - DO NOT TOUCH *********************/
const diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

const uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 20971520
  }
});

axios.create({
  xsrfCookieName: "mytoken",
  xsrfHeaderName: "csrf-token"
});

/************** Multer - DO NOT TOUCH *********************/

/***********************************************************************/
// ROUTES
// 
// REGISTER - POST
app.post("/register", (req, res) => {
  const { first, last, email, password, confirm } = req.body;
  console.log("Input to /register : ", req.body);
  // check for empty inputs
  if (!first || !last || !email || !password || !confirm) {
    // console.log("empty input");
    res.json({
      success: false
    });
  } else {
    // check if type pwd and the confirmation match
    if (!(password === confirm)) {
      res.json({
        success: false
      });
    } else {
      // check if email is already registered
      db.userExists(email).then(data => {
        if (data.length > 0) {
          console.log('user exists already');
          // user is already in the db
          res.json({
            success: false
          });
        } else {
          // hash the password
          hash(password).then(hashedPass => {
            // console.log("password hashed");
            db.insertNewUser(first, last, email, hashedPass)
              .then(data => {
                console.log('user has been inserted');
                // set a cookie for the new user
                req.session.userId = data[0].id;
                res.json({
                  success: true
                });
              })
              .catch(err => console.log("err in insertNewUser : ", err));
          });
        }
      });
    }
  }
});

// LOGIN
app.post('/login', (req, res) => {
  console.log('login route reached');

  console.log('/login route reached');
  
  db.userExists(req.body.email).then(data => {
    // if results array > 0, means the user was found in the db
    if (data.length > 0) {
      console.log('user found in the db');
      
      const userId = data[0].id;
      compare(req.body.password, data[0].password).then(data => {
        if (data) {
          // password is correct and cookie will be created
          console.log('password match');
          
          req.session.userId = userId;
          // res.redirect('/games');
          res.json({
            success: true
          });
        } else {
          // passwords do not match
          console.log('password do not match');
          res.json({
            success: false
          });
        }
      });
    } else {
      // user is not registered
      res.json({
        success: false
      });
    }
  });

})

// GET INFO ABOUT USER
app.get('/getUserInfo', (req, res) => {
  console.log('getting info about user');

  if (req.session && typeof req.session.userId !== "undefined") {
    db.getUserInfo(req.session.userId)
      .then(data => {
        console.log("user data from getUserInfo: ", data);
        res.json({
          success: true,
          data: data[0]});
      })
      .catch(err => console.log("err in getUserInfo: ", err));
  } else {
    console.log('user not found');
    
    res.json({ success: false });
  }

});

// UPLOAD PICTURE TO AWS
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
  const imageUrl = s3Url + req.file.filename;
  console.log('uploading picture from : ',imageUrl );
  if (req.file) {
      // Insert in the database
      db.updatePicture(req.session.userId, imageUrl)
          .then(data => {
              res.json(data);
          })
          .catch(err => console.log("err in updatePicture: ", err));
  }
});

// UPDATE ABOUT
app.post('/updateAbout', (req, res) => {
  const {first, last, description} = req.body;
  console.log('first, last, description = ', first, last, description);

  db.updateAbout(req.session.userId, first, last, description).then(data => {
    res.json(data)
  }).catch(err => console.log('err in updateAbout: ', err));
});

// CHECK LANGUAGE 
app.get('/checkLang', (req, res) => {
  console.log('checking for language');
  if (typeof req.session.lang === 'undefined') {
    req.session.lang = 'en';
  }
  res.json({
    language: req.session.lang
  })
});

// CHANGE LANGUAGE
app.get('/changeLang', (req, res) => {
  console.log('changing language');
  console.log(req.session.lang);
  if(req.session.lang === 'en') {
    req.session.lang = 'pt'; 
  } else {
    req.session.lang = 'en';
  }
  res.json({
    language: req.session.lang
  })
});

// FETCH EXISTING PROJECTS
app.get('/fetchProjects', (req, res) => {
  console.log('fetching projects');
  db.selectAllProjects()
  .then(data => {
    console.log('data from selectAllProjects: ', data);
      db.findImagesProject().then(imgs => {
        console.log('results from find images: ', imgs);

        let results = [];

            for(let j = 0; j<data.length;j++) {
                results.push(data[j]);
                for (let i = 0; i<imgs.length; i++){
                    if(data[j].id === imgs[i].id) {
                        if(results[j].images === undefined){
                            results[j].images = [];
                        }
                        results[j].images.push(imgs[i]);
                    }
                }
            }


        res.json({
          success: true,
          results
        });
      }).catch(err => console.log('err in findImagesProject'))
    console.log('data complete from fetch projects = ', data);
  }).catch(err => {
    console.log('err in selectAllProjecst: ', err);
    res.json({
      success: false
    })
  })
});

// ADD A NEW PROJECT
app.post('/addProject', (req, res) => {
  const {name, description, location, area, yearStart, yearConclusion} = req.body;

  db.addProject(name, description, location, area, yearStart, yearConclusion).then(data => {
    console.log('data from addProject : ', data);

    res.json({
      success: true,
      data
    })

  }).catch(err => {
    console.log('err in addProject: ', err);
    res.json({success: false})
  });
});

// INSERT THE URL OF THE UPLOADED IMAGES TO THE PROJECT
app.post('/addUrlProject', (req, res) => {
  const {id, url} = req.body;
  console.log('id e url = ', id , url);
  db.addUrlProject(id, url).then(data => {
    console.log('data from addUrlProject: ', data);

    res.json({success: true});
  }).catch(err => {
    console.log('err in addUrlProject: ', err);
    res.json({success: false})
  });
})


server.listen(process.env.PORT || 8080, () => {
  console.log("Listening...");
});
