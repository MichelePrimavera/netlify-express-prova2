const express = require('express');
const app = express();

const homePageController = require("../controller/homepage");

module.exports.getHomePageItems = app.get('/items', homePageController.getHomepage);

module.exports.updateHomePageItem = app.put('/item', homePageController.updateItem);

module.exports.updateHomePageItems = app.put('/items', homePageController.updateItems);
