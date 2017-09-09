const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const { Game } = require('../models/game');
const { fail } = require('../util/error_handler');
const { sendWeeklySMS } = require('../util/utils');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  const { date, time, bye = false } = req.body;
  const game = new Game({ date: moment.tz(`${date} ${time}`, 'M/D H:m', process.env.MOMENT_LOCALE).toISOString(), bye });

  game.save((err) => {
    if (err) fail(res, err, 'Error on save!', 400);
  }).then(() => {
    sendWeeklySMS();
    res.status(201).send(game);
  });
});

module.exports = router;
