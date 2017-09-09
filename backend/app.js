const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const { checkAuth } = require('./util/middlewares');
const UsersController = require('./controllers/users_controller');
const MessagesController = require('./controllers/messages_controller');
const TeamController = require('./controllers/team_controller');
const GamesController = require('./controllers/games_controller');
const SeasonController = require('./controllers/season_controller');
const UptimeController = require('./controllers/uptime_controller');

const app = express();

app.use(bodyParser.json());
app.use(checkAuth);
app.use('/users', UsersController);
app.use('/messages', MessagesController);
app.use('/games', GamesController);
app.use('/team', TeamController);
app.use('/season', SeasonController);
app.use('/coffee', UptimeController);

module.exports = app;
