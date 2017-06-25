const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
  status: { type: String, uppercase: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
});

mongoose.model('Attendance', AttendanceSchema);
module.exports = mongoose.model('Attendance');