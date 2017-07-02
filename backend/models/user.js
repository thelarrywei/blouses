const mongoose = require('mongoose');
// const { AttendanceSchema } = require('./attendance');

const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  // attendances: [AttendanceSchema],
});

mongoose.model('User', UserSchema);
module.exports = { User: mongoose.model('User'), UserSchema };