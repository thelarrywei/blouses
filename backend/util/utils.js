const moment = require('moment');
const { client, twilioNumber } = require('../twilio_config');
const { games, users: members } = require('../seed');
const { validStatuses, replyText } = require('./constants');
const { handleError } = require('./error_handler');
const { Game } = require('../models/game');

// TODO: breakout whenIsTheGame, sendWeeklySMS, DEV_SMS, and gameReminder into a ScheduledTexts module?

const whenIsTheGame = (sendSMS) => {
  Game.currentGame((err, currentGame) => {
    handleError(err);
    // if currentGame is null no game was found
    console.log('*****Current Game*****\r\n', currentGame);

    // PROD
    let initialDelay;
    const weeklyDelay = 6.048e+8;
    // DEV
    // const initialDelay = 5000;
    // const weeklyDelay = 5000;
    nextGame = true;
    // PROD

    let game;
    if (currentGame) {
      game = currentGame;
      initialDelay = moment.tz(currentGame.date, process.env.MOMENT_LOCALE).weekday(0).startOf('day').hour(10).diff(moment());
      // debugger;
      initialDelay = 5000;
      // if initialDelay is negative meaning when it is calculated we're already past Sunday 10AM of that week's game
      // that week's game 
    } else if (nextGame) {
      // game = nextGame;
      // TODO: implement nextGame and remove the below game assignment
      game = currentGame;
      initialDelay = 5000;
      // find the next game i.e. first game past today's date and set the initialDelay accordingly
      // might want to implement nextGame as a Game method
    } else {
      console.log('Was not able to find a current or next game, maybe it\'s the offseason?');
    };

    const startInterval = setInterval(() => {
        sendSMS(game);
    }, weeklyDelay);
    setTimeout(() => { sendSMS(game); startInterval; }, initialDelay);
  });
};

const sendWeeklySMS = (game) => {
  // maybe we should return something more useful here, but basically don't spam if there's no game
  if (!game) return;
  const gameTime = moment(currentGame.date).format('dddd M/D, h:ma');

  let SMSBody;
  const gameText = game.bye
    ? 'we have a bye this week'
    : `this week's game is on ${gameTime} reply IN, OUT, or MAYBE`;

  members.forEach(({ name, phone }) => {
    SMSBody = `Hey ${name}, ${gameText}. replyText.SIG`;
    client.messages.create({
      body: SMSBody,
      to: phone,
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
  // TODO: every Tuesday remind the team of the game time and who's in so far
  // TODO: if we're at 5 ask the maybe's to confirm in or out
  // TODO: if we're under 5 tell the maybe's and the out's we need more people
  // TODO: append text with replyText.SIG, maybe for all non reply sms we should append the sig
};

const isValidStatus = status => validStatuses.includes(status);

module.exports = { whenIsTheGame, sendWeeklySMS, DEV_SMS, isValidStatus };
