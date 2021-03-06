const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;
const GameSchema = new Schema({
  date: Date,
  bye: {
    type: Boolean,
    default: false,
  },
  attendances: {
    type: Schema.Types.Mixed,
    default: {},
  },
}, { minimize: false });

GameSchema.statics.nextGame = function nextGame(cb) {
  // not sure why I can't pass these from utils... is it bc you can't pass a moment? even as a string? :(
  let start = moment.tz(process.env.MOMENT_LOCALE).weekday(3).startOf('day').toISOString();
  let end = moment(start).add(1, 'days').toISOString();

  return this.findOne({
    date: {
      $gte: start,
      $lt: end
    }
  }, (err, nextGame) => {
    if (nextGame && !gameHasPassed(nextGame)) {
      cb(err, nextGame);
    } else {
      start = moment.tz(process.env.MOMENT_LOCALE).weekday(10).startOf('day').toISOString();
      end = moment(start).add(1, 'days').toISOString();
      this.findOne({
        date: {
          $gte: start,
          $lt: end
        }
      }, cb);
    };
  });
};

const gameHasPassed = function gameHasPassed(game) {
  console.log(`${moment.tz(game.date, process.env.MOMENT_LOCALE).diff(moment())} milliseconds till next game`);
  return moment.tz(game.date, process.env.MOMENT_LOCALE).diff(moment()) < 0;
};

mongoose.model('Game', GameSchema);
module.exports = { Game: mongoose.model('Game'), GameSchema };
