const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../models/user');
const { fail } = require('../util/error_handler');
const { whenIsTheGame, sendWeeklySMS } = require('../util/utils');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/:name', (req, res) => {
  User.findOne({ name: req.params.name }, (err, user) => {
    if (err) return fail(res, err, 'Error on finding user!', 400);
    res.status(200).send(user);
  })
});

router.post('/', (req, res) => {
  const user = new User({ name: req.body.name, phone: req.body.phone });
  user.save((err) => {
    if (err) fail(res, err, 'Error on save!', 400);
  }).then(() => {
    whenIsTheGame(sendWeeklySMS);
    res.status(201).send(user);
  });
});

router.patch('/:name', (req, res) => {
  // this assumes names are unique
  User.findOne({ name: req.params.name }, (err, user) => {
    if (err) return fail(res, err, 'Error on finding user!', 400);
    // may want to refactor this to be a put so you don't need to update this whenever you change User
    user.phone = req.body.phone || user.phone;
    user.name = req.body.name || user.name;
    user.active = typeof req.body.active !== 'undefined' ? req.body.active : user.active;

    user.save((err, updatedUser) => {
      if (err) return fail(res, err, 'Error on update!', 400);
      whenIsTheGame(sendWeeklySMS);
      res.status(200).send(updatedUser);
    });
  })
});

module.exports = router;
