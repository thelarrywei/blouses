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
        reply = replyText.DROIDS;
      } else if (message === 'COMMANDS') {
        reply = responseMapping[message];
      } else if (!user.active) {
        reply = replyText.INACTIVE;
      } else if (!nextGame) {
        reply = replyText.NO_CONTEST;
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
              // TODO: rethink the design of Game's attendances, maybe it should mirror the structure below
              const currentRoster = { IN: [], OUT: [], MAYBE: [] };
              Object.values(nextGame.attendances).forEach((attendance) => {
                currentRoster[attendance.status].push(attendance.user.name);
              });

              Object.keys(currentRoster).forEach((status) => {
                reply += `${status}: ${currentRoster[status].join(', ')} \r\n`;
              });
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
      }).then((response) => {
        res.status(200).send(response);
      });
    });
  });
});

module.exports = router;
