const twilioConfig = {};

twilioConfig.accountSid = process.env.TWILIO_ACCOUNT_SID;
twilioConfig.authToken = process.env.TWILIO_AUTH_TOKEN;
twilioConfig.fromNumber = process.env.TWILIO_NUMBER;

module.exports = twilioConfig;