'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const authenticationRoutes = require('./routes/authentication');
const homePageRoutes = require('./routes/homepage');
const homePageController = require("./controller/homepage");

const mongoConnect = require('./util/database').mongoConnect;

const router = express.Router();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

router.get('/prova', (req, res) => {
  res.send({message: 'aweee'});
});


router.get('/homepage/items', homePageController.getHomepage);
router.put('homepage/item', homePageController.updateItem);
router.put('homepage/items', homePageController.updateItems);

router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

mongoConnect(() => {
  console.log('connessoo')
});

module.exports = app;
module.exports.handler = serverless(app);
