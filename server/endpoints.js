const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/api/v1/category/:name', controller.getCategory)

module.exports = router;
