const mongoose = require('mongoose');
const { UserSchema } = require('./user');
// don't think I need this to be a mongoose model, just a class?
const AttendanceSchema = new mongoose.Schema({
  status: { type: String, uppercase: true },
  user: UserSchema,
});

mongoose.model('Attendance', AttendanceSchema);
module.exports = { Attendance: mongoose.model('Attendance'), AttendanceSchema };
