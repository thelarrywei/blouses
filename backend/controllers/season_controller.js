const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const { Game } = require('../models/game');
const { fail } = require('../util/error_handler');
const { whenIsTheGame, sendWeeklySMS } = require('../util/utils');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  Game.find({}, (err, games) => {
    if (err) fail(res, err, 'Error on getting all games!', 400);
    res.send(games);
  });
});

router.post('/', (req, res) => {
  const season = req.body.map(({ date, time }) => {
    return { date: moment(`${date} ${time}`, 'M/D H:m').toISOString() }
  });

  Game.insertMany(season, (err, games) => {
    err ? fail(res, err, 'Error on creating season!', 400) : whenIsTheGame(sendWeeklySMS);
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
