const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const { AttendanceSchema } = require('./attendance');

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

GameSchema.statics.currentGame = function(cb) {
  return this.findOne({
    date: moment().weekday(3).format('M/D')
  }, cb);
};

mongoose.model('Game', GameSchema);
module.exports = { Game: mongoose.model('Game'), GameSchema };
