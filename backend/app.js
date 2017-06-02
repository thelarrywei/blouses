const express = require('express');
const db = require('./db');
const UsersController = require('./controllers/users_controller');
const MessagesController = require('./controllers/messages_controller');

const app = express();

app.use('/users', UsersController);
app.use('/messages', MessagesController);

module.exports = app;
