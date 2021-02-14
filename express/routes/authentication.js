const express = require('express');
const app = express();

const authenticationController = require('../controller/authentication');

module.exports.getLogin = app.post('/login', authenticationController.getLogin);
