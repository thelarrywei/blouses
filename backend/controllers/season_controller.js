const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const { Game } = require('../models/game');
const { fail } = require('../util/error_handler');
const { sendWeeklySMS } = require('../util/utils');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  Game.find({}, (err, games) => {
    if (err) fail(res, err, 'Error on getting all games!', 400);
    res.send(games);
  });
});

router.post('/', (req, res) => {
  const season = req.body.map(({ date, time, bye = false }) => {
    return { date: moment.tz(`${date} ${time}`, 'M/D H:m', process.env.MOMENT_LOCALE).toISOString(), bye };
  });

  Game.insertMany(season, (err, games) => {
    err ? fail(res, err, 'Error on creating season!', 400) : sendWeeklySMS();
    res.send(games);
  });
});

router.delete('/', (req, res) => {
  Game.remove({}, (err) => {
    if (err) fail(res, err, 'Error on destroy!', 400);
    res.send('Entire season was deleted');
  });
});

module.exports = router;
