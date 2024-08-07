const express = require('express');
const router = express.Router();
const DefaultController = require('../controllers/defaultController');

router.get('/', DefaultController.getIndex);

module.exports = (app) => {
  app.use('/', router);
};