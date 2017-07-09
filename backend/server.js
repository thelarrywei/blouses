const app = require('./app');
const { whenIsTheGame, sendWeeklySMS, DEV_SMS } = require('./util/utils');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

// PROD
whenIsTheGame(sendWeeklySMS);
// DEV
// whenIsTheGame(DEV_SMS);
// setTimeout(() => {whenIsTheGame(sendWeeklySMS);}, 5000);
