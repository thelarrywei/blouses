const express = require('express');
const db = require('./db');
const seedApp = require('./initialize');
const bodyParser = require('body-parser');
const UsersController = require('./controllers/users_controller');
const MessagesController = require('./controllers/messages_controller');

const app = express();

seedApp();
app.use(bodyParser.json());
app.use('/users', UsersController);
app.use('/messages', MessagesController);

module.exports = app;
