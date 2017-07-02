const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  body: String,
  toNumber: String,
});

mongoose.model('Message', MessageSchema);
module.exports = mongoose.model('Message');
