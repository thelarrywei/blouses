const { games, users } = require('./seed');
const { Game } = require('./models/game');
const { User } = require('./models/user');
const { handleError } = require('./util/error_handler');

const seedApp = () => {
  Game.remove({}, handleError)
    .then(() => {
      User.remove({}, handleError);
    })
    .then(() => {
      games.forEach(({ date, time, bye, attendances }) => {
        Game.create({
          date,
          time,
          bye,
          attendances,
        }, handleError);
      });

      users.forEach(({ name, phone }) => {
        User.create({
          name,
          phone,
        }, handleError);
      });
    });
};

module.exports = seedApp;
