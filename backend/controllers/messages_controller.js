const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const { client, twilioNumber } = require('../twilio_config');
const { responseMapping, validStatuses } = require('../util/constants');
const { fail } = require('../util/error_handler');

const Game = require('../models/game');
const User = require('../models/user');
const Attendance = require('../models/attendance');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  // NB: creating an API will be v2 so information can be modified via Postman
});

router.post('/reply', (req, res) => {
  const { Body, From } = req.body;
  let reply = responseMapping[Body.toUpperCase()] || responseMapping['DEFAULT'];

  if (isValidStatus(Body.toUpperCase())) {
    User.findOne({ phone: From }, (err, user) => {
      if (err) console.log(err);
      Game.currentGame((err, currentGame) => {
        if (user && currentGame) {
          const currentAttendance = { status: Body, user: user, game: currentGame };
          Attendance.findOneAndUpdate({ user: user, game: currentGame }, currentAttendance, {upsert: true}, (err, attendance) => {
            if (err) fail(res, err, 'Can\'t find attendance!', 404);
          })
        }
      });
    });
  }

  client.messages.create({
    body: reply,
    to: From,
    from: twilioNumber
  });
});

const isValidStatus = status => validStatuses.includes(status);

module.exports = router;
