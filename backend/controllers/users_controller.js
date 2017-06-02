const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const User = require('../models/user');
module.exports = router;

router.get('/', (req, res) => {
  // NB: creating an API will be v2 so information can be modified via Postman
  res.status(200).send('hello world')
});