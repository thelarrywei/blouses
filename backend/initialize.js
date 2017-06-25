const { games, members } = require('./seed');
const Game = require('./models/game');
const Member = require('./models/user');
const { handleError } = require('./util/error_handler');

const seedApp = () => {
  games.forEach(({ date, time, bye }) => {
    Game.create({
      date,
      time,
      bye,
    }, handleError);
  });

  members.forEach(({ name, phoneNumber }) => {
    Member.create({
      name,
      phoneNumber
    }, handleError);
  });
};

module.exports = seedApp;
