const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  date: String,
  time: String,
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
  return this.findOne({ date: moment().weekday(3).format('M/D') }, cb);
};

mongoose.model('Game', GameSchema);
module.exports = { Game: mongoose.model('Game'), GameSchema };
