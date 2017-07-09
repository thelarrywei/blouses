const express = require('express');
const bodyParser = require('body-parser');
const { client, twilioNumber } = require('../twilio_config');
const { responseMapping, replyText } = require('../util/constants');
const { isValidStatus, formatGame } = require('../util/utils');
const { handleError } = require('../util/error_handler');

const { Game } = require('../models/game');
const { User } = require('../models/user');
const { Attendance } = require('../models/attendance');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/reply', (req, res) => {
  const { Body, From } = req.body;
  const message = Body.trim().toUpperCase();

  User.findOne({ phone: From }, (userErr, user) => {
    handleError(userErr);
    let reply;

    Game.nextGame((gameErr, nextGame) => {
      handleError(gameErr);
      
      if (!user) {
        reply = 'This is not the number you\'re looking for...';
      } else if (message === 'COMMANDS') {
        reply = responseMapping[message];
      } else if (!nextGame) {
        reply = 'Couldn\'t find the next game, are you sure the season is underway?';
      } else {
        if (isValidStatus(message)) {
          const currentAttendance = nextGame.attendances[user.id];
          if (currentAttendance) currentAttendance.status = message;
          // do I really need an Attendance model? or can I just use a POJO here
          else nextGame.attendances[user.id] = new Attendance({ status: message, user });

          Game.update(
            { _id: nextGame._id },
            { $set: { attendances: nextGame.attendances } },
            handleError
          );
        }

        switch (message) {
          case ('ROSTER'):
            // TODO: this (currentRoster) should be a model method like nextGame
            reply = `Next game is ${formatGame(nextGame)} \r\n`;

            if (nextGame.bye) {
              reply = replyText.BYE;
            } else {
              const currentRoster = [];
              Object.values(nextGame.attendances).forEach((attendance) => {
                if (attendance.status === 'IN') currentRoster.push(attendance.user.name);
              });

              reply += currentRoster.join('\r\n') || replyText.EMPTY;
            }

            break;
          default:
            reply = responseMapping[message] || responseMapping.DEFAULT;
        }
      }

      client.messages.create({
        body: reply,
        to: From,
        from: twilioNumber,
      });
    });
  });
});

module.exports = router;
