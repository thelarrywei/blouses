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
  console.log(`${moment(game.date).diff(moment.tz(process.env.MOMENT_LOCALE))} milliseconds till game`);
  console.log('game date: ', moment(game.date).toString());
  console.log('tz game date: ', moment.tz(game.date, process.env.MOMENT_LOCALE).toString());
  console.log('current date: ', moment().toString());
  console.log('tz current date: ', moment.tz(process.env.MOMENT_LOCALE).toString());
  const gameDate = moment(game.date);
  console.log('sigh maybe this will have to do: ',moment.tz(game.date, process.env.MOMENT_LOCALE).weekday(3).startOf('day').hour(gameDate.hours()).minute(gameDate.minutes()).diff(moment()));
  return moment.tz(game.date, process.env.MOMENT_LOCALE).weekday(3).startOf('day').hour(gameDate.hours()).minute(gameDate.minutes()).diff(moment()) < 0;
};

mongoose.model('Game', GameSchema);
module.exports = { Game: mongoose.model('Game'), GameSchema };
