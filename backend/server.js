const app = require('./app');
const whenIsTheGame = require('./util/utils');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

whenIsTheGame(() => console.log('hi'));
// TODO: replace this print with user controller send method, access via app? e.g. app.use
