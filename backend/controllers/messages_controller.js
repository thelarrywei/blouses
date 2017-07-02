const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const { client, twilioNumber } = require('../twilio_config');
const { responseMapping, _replyText, validStatuses } = require('../util/constants');
const { fail, handleError } = require('../util/error_handler');

const { Game } = require('../models/game');
const { User } = require('../models/user');
const { Attendance } = require('../models/attendance');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  
});

router.post('/reply', (req, res) => {
  // TODO: if there is no current game the we're in the offseason, reply as such and skip all below queries
  const { Body, From } = req.body;
  const message = Body.trim().toUpperCase();
  let reply;

  if (isValidStatus(message)) {
    User.findOne({ phone: From }, (err, user) => {
      handleError(err);
      Game.currentGame((err, currentGame) => {
        handleError(err);
        if (user && currentGame) {
          let userAttendance = currentGame.attendances[user.id];
          if (userAttendance) userAttendance.status = message;
          else currentGame.attendances[user.id] = new Attendance({ status: message, user });

          Game.update(
            { _id: currentGame._id },
            { $set: { attendances: currentGame.attendances } },
            handleError
          );
        }
      });
    });
  }

  switch (message) {
    case ("ROSTER"):
      Game.currentGame((err, currentGame) => {
        if (currentGame.bye) {
          reply = _replyText['BYE'];
        } else {
          const currentRoster = [];
          Object.values(currentGame.attendances).forEach((attendance) => {
            if (attendance.status === 'IN') currentRoster.push(attendance.user.name);
          });

          reply = currentRoster.join('\r\n') || _replyText['EMPTY'];
        }

        client.messages.create({
          body: reply,
          to: From,
          from: twilioNumber
        });
      });

      break;
    default:
      reply = responseMapping[Body.toUpperCase()] || responseMapping['DEFAULT'];
      client.messages.create({
        body: reply,
        to: From,
        from: twilioNumber
      });
  }
});

const isValidStatus = status => validStatuses.includes(status);

module.exports = router;
