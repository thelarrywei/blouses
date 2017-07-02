const mongoose = require('mongoose');
const { UserSchema } = require('./user');
// const { GameSchema } = require('./game');

const AttendanceSchema = new mongoose.Schema({
  status: { type: String, uppercase: true },
  user: UserSchema,
  // game: GameSchema,
});

mongoose.model('Attendance', AttendanceSchema);
module.exports = { Attendance: mongoose.model('Attendance'), AttendanceSchema };
