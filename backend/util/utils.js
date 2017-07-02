const moment = require('moment');
const { client, twilioNumber } = require('../twilio_config');
const { games, users: members } = require('../seed');
const { validStatuses } = require('./constants');

// TODO: breakout whenIsTheGame, sendWeeklySMS, DEV_SMS, and gameReminder into a ScheduledTexts module?

const whenIsTheGame = (sendSMS) => {
  // PROD
  const initialDelay = moment().weekday(7).diff(moment());
  const weeklyDelay = 6.048e+8;
  // DEV
  // const initialDelay = 100;
  // const weeklyDelay = 100;

  let count = 0;

  const startInterval = setInterval(() => {
    sendSMS(count);
    if (count >= games.length) {
      clearInterval(startInterval);
    }

    count += 1;
  }, weeklyDelay);

  setTimeout(() => { sendSMS(count); startInterval; }, initialDelay);
};

const sendWeeklySMS = (week) => {
  let SMSBody;

  const game = games[week];
  const gameText = game.bye ? 'we have a bye this week' : `this week's game is on ${game.date} at ${game.time} reply IN, OUT, or MAYBE`;

  members.forEach(({ name, phoneNumber }) => {
    SMSBody = `Hey ${name}, ${gameText}. -Blouses Bot`;
    client.messages.create({
      body: SMSBody,
      to: phoneNumber,
      from: twilioNumber,
    }).then(response => console.log(response));
  });
};

const DEV_SMS = () => {
  client.messages.create({
    body: 'it\'s working! *cue Anakin in podracer gif*',
    to: process.env.DEV_NUMBER,
    from: twilioNumber,
  });
};

const gameReminder = () => {

};

const isValidStatus = status => validStatuses.includes(status);

module.exports = { whenIsTheGame, sendWeeklySMS, DEV_SMS, isValidStatus };
