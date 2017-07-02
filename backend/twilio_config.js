const Twilio = require('twilio');

const twilioConfig = {};
twilioConfig.twilioNumber = process.env.TWILIO_NUMBER;
twilioConfig.client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

module.exports = twilioConfig;
