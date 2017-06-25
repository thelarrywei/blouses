const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');