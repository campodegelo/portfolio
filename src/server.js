// CONSTANT DECLARATIONS
const express = require("express");
const app = express();
// const basicAuth = require("basic-auth");
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
// let secrets;
// if (process.env.NODE_ENV === "production") {
//   secrets = process.env; // in prod the secrets are environment variables
// } else {
//   secrets = require("../secret"); // in dev they are in secrets.json which is listed in .gitignore
// }

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

/* HANDLING SECRETS */
let secrets;
if (process.env.NODE_ENV === "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secret");
}

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

server.listen(process.env.PORT || 8080, () => {
  console.log("Listening...");
});
