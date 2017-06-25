const express = require('express');
const bodyParser = require('body-parser');
const { client, twilioNumber } = require('../twilio_config');
const { responseMapping } = require('../util/constants');

const Game = require('../models/game');
const Member = require('../models/user');
const Attendance = require('../models/attendance');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  // NB: creating an API will be v2 so information can be modified via Postman
});

router.post('/reply', (req, res) => {
  const { Body, From } = req.body;
  let reply = responseMapping[Body.toUpperCase()] || responseMapping['DEFAULT'];

  User.findOne({ phoneNumber: From }, (err, user) => {
    
  });

  Game.currentGame((err, currentGame) => {
    if (err) console.log(err);
    
  });
  

  client.messages.create({
    body: reply,
    to: From,
    from: twilioNumber
  });
});

module.exports = router;
