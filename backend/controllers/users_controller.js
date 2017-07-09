const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../models/user');
const { fail } = require('../util/error_handler');
const { whenIsTheGame, sendWeeklySMS } = require('../util/utils');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  const user = new User({ name: req.body.name, phone: req.body.phone });
  user.save((err) => {
    if (err) fail(res, err, 'Error on save!', 400);
  }).then(() => {
    whenIsTheGame(sendWeeklySMS);
    res.status(201).send(user);
  });
});

router.put('/', (req, res) => {
  
});

module.exports = router;
