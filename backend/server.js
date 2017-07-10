const app = require('./app');
const { kickOffSMS, sendWeeklySMS } = require('./util/utils');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

if (process.env.ENV === 'PROD') {
  kickOffSMS(sendWeeklySMS);
} else {
  // DEV
  setTimeout(() => {kickOffSMS(sendWeeklySMS);}, 5000);
}
