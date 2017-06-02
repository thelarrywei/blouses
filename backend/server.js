const twilio = require('twilio');

const app = require('./app');
const whenIsTheGame = require('./util/utils');
// TODO: v2 api should allow for creating users and games, meaning no seed data import just query db
const { games, members } = require('./seed');
const { accountSid, authToken, fromNumber } = require('./twilio_config');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

const client = new twilio(accountSid, authToken)

const weeklySMS = (week) => {
  let SMSBody;

  const game = games[week];
  const gameText = game.bye ? 'we have a bye this week' : `this week's game is on ${game.date} at ${game.time} reply IN, OUT, or MAYBE`;

  members.forEach(({ name, phoneNumber }) => {
    console.log(name, phoneNumber);
    SMSBody = `Hey ${name}, ${gameText}`;
    client.messages.create({
      body: SMSBody,
      to: phoneNumber,
      from: fromNumber
    }).then(response => {
      console.log(response);
    });
  });

};

whenIsTheGame(weeklySMS);
