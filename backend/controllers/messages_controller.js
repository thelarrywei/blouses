const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const Message = require('../models/message');
module.exports = router;

router.post('/', (req, res) => {
  // NB: creating an API will be v2 so information can be modified via Postman
});