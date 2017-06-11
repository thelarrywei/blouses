const express = require('express');
const bodyParser = require('body-parser');
const { client, twilioNumber } = require('../twilio_config');
const { responseMapping } = require('../util/constants');
const Message = require('../models/message');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  // NB: creating an API will be v2 so information can be modified via Postman
});

router.post('/reply', (req, res) => {
  const { Body, From } = req.body;
  let reply = responseMapping[Body.toUpperCase()] || responseMapping['DEFAULT'];

  client.messages.create({
    body: reply,
    to: From,
    from: twilioNumber
  });
});

module.exports = router;
