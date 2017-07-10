const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  active: {
    type: Boolean,
    default: true
  },
  sentWeeklySMS: {
    type: Schema.Types.Mixed,
    default: {
      announcements: {},
      reminders: {}
    }
  },
}, { minimize: false });

mongoose.model('User', UserSchema);
module.exports = { User: mongoose.model('User'), UserSchema };
