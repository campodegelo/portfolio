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
  res.cookie("mytoken", req.csrfToken());
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
// LOGIN
app.post('/login', (req, res) => {
  console.log('login route reached');

  const {email, password} = req.body;
  res.json({
      success: (email === secrets.NAME && password === secrets.PASS)
  })
})

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
  
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Listening...");
});
