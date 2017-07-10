const app = require('./app');
const { whenIsTheGame, sendWeeklySMS } = require('./util/utils');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

if (process.env.ENV === 'PROD') {
  whenIsTheGame(sendWeeklySMS);
} else {
  // DEV
  setTimeout(() => {whenIsTheGame(sendWeeklySMS);}, 5000);
}
