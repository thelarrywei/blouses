const express = require('express');
const app = express();
const db = require('./db');

const UsersController = require('./controllers/users_controller');
app.use('/users', UsersController);

module.exports = app;
