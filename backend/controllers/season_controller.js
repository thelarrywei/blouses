const express = require('express');
const bodyParser = require('body-parser');
const { Game } = require('../models/game');
const { fail } = require('../util/error_handler');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  Game.find({}, (err, games) => {
    if (err) fail(res, err, 'Error on getting all games!', 400);
    res.send(games);
  });
});

router.post('/', (req, res) => {
  Game.insertMany(req.body, (err, games) => {
    if (err) fail(res, err, 'Error on creating season!', 400);
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
