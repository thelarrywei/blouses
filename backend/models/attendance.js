const mongoose = require('mongoose');
const { UserSchema } = require('./user');

const AttendanceSchema = new mongoose.Schema({
  status: { type: String, uppercase: true },
  user: UserSchema,
});

mongoose.model('Attendance', AttendanceSchema);
module.exports = { Attendance: mongoose.model('Attendance'), AttendanceSchema };
