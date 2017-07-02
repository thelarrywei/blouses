const express = require('express');
const db = require('./db');
// const seedApp = require('./initialize');
const bodyParser = require('body-parser');
const { checkAuth } = require('./util/middlewares');
const UsersController = require('./controllers/users_controller');
const MessagesController = require('./controllers/messages_controller');
const TeamController = require('./controllers/team_controller');
const SeasonController = require('./controllers/season_controller');

const app = express();

// NB: only seed for dev
// seedApp();
app.use(bodyParser.json());
app.use(checkAuth);
app.use('/users', UsersController);
app.use('/messages', MessagesController);
app.use('/team', TeamController);
app.use('/season', SeasonController);

module.exports = app;
