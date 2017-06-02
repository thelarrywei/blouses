const twilioConfig = {};

twilioConfig.accountSid = process.env.TWILIO_SID;
twilioConfig.authToken = process.env.TWILIO_TOKEN;
twilioConfig.fromNumber = process.env.TWILIO_NUMBER;

module.exports = twilioConfig;