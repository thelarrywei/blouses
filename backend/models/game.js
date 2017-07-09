const mongoose = require('mongoose');
const moment = require('moment-timezone');

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

GameSchema.statics.currentGame = function currentGame(cb) {
  // not sure why I can't pass these from utils... is it bc you can't pass a moment? even as a string? :(
  // TODO: check if the wednesday calculated below has already passed, if passed use 10 next wednesday's game
  const start = moment.tz(process.env.MOMENT_LOCALE).weekday(3).startOf('day').toISOString();
  const end = moment(start).add(1, 'days').toISOString();

  return this.findOne({
    date: {
      $gte: start,
      $lt: end
    }
  }, cb);
};

mongoose.model('Game', GameSchema);
module.exports = { Game: mongoose.model('Game'), GameSchema };
