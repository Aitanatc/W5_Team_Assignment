const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
// const { auth } = require('express-openid-connect');

const port = process.env.PORT || 3000;
const app = express();

const config = {
  // authRequired: false,
  // auth0Logout: true,
  // secret: process.env.SECRET,
  // baseURL: process.env.BASE_URL,
  // clientID: process.env.CLIENT_ID,
  // issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app
  // .use(auth(config))
  .use(express.json())

  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});