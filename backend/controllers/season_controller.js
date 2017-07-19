const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
// TODO: should consolidate model requires into one file and export
const { Game } = require('../models/game');
const { User } = require('../models/user');
const { Attendance } = require('../models/attendance');
const { fail } = require('../util/error_handler');
const { sendWeeklySMS } = require('../util/utils');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  Game.find({}, (err, games) => {
    if (err) return fail(res, err, 'Error on getting all games!', 400);
    res.send(games);
  });
});

router.post('/', (req, res) => {
  // Assumes team has been created, maybe TODO: change create team to insert default attendances
  User.find({ active: true }, (err, users) => {
    if (err) return fail(res, err, 'Error on creating season!', 400);
    const attendances = users.reduce((accum, user) => {
      // so... should I ever save these Attendances and create actual documents or just use POJO?
      accum[user._id] = new Attendance({ status: 'SILENT', user });
      return accum;
    }, {});

    const season = req.body.map(({ date, time, bye = false }) => {
      return {
        date: moment.tz(`${date} ${time}`,'M/D H:m', process.env.MOMENT_LOCALE).toISOString(),
        attendances,
        bye
      };
    });

    Game.insertMany(season, (err, games) => {
      if (err) return fail(res, err, 'Error on creating season!', 400)
      sendWeeklySMS();
      res.send(games);
    });
  });
});

router.delete('/', (req, res) => {
  Game.remove({}, (err) => {
    if (err) return fail(res, err, 'Error on destroy!', 400);
    res.send('Entire season was deleted');
  });
});

module.exports = router;
