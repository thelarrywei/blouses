const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  // NB: creating an API will be v2 so information can be modified via Postman
  res.status(200).send('hello world')
});

module.exports = router;
