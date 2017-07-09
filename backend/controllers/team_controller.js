const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../models/user');
const { fail } = require('../util/error_handler');
const { whenIsTheGame, sendWeeklySMS } = require('../util/utils');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) fail(res, err, 'Error on getting all users!', 400);
    res.send(users);
  });
});

router.post('/', (req, res) => {
  User.insertMany(req.body, (err, members) => {
    err ? fail(res, err, 'Error on creating team!', 400) : whenIsTheGame(sendWeeklySMS);
    res.send(members);
  });
});

router.delete('/', (req, res) => {
  User.remove({}, (err) => {
    if (err) fail(res, err, 'Error on destroy!', 400);
    res.send('Entire team was deleted');
  });
});

module.exports = router;
