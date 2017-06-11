const app = require('./app');
const { whenIsTheGame, sendWeeklySMS, DEV_SMS } = require('./util/utils');
// TODO: v2 api should allow for creating users and games, meaning no seed data import just query db

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

whenIsTheGame(sendWeeklySMS);
