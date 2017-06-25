const mongoose = require('mongoose');
const moment = require('moment');
const GameSchema = new mongoose.Schema({
  date: String,
  time: String,
  bye: Boolean
});

GameSchema.statics.currentGame = function(cb) {
  this.findOne({
    date: moment().weekday(3).format('M/D')
  }, cb);
};

mongoose.model('Game', GameSchema);
module.exports = mongoose.model('Game');
