const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const { fail } = require('../util/error_handler');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// router.get('/', (req, res) => {
//   // NB: creating an API will be v2 so information can be modified via Postman
//   User.find({}, function(err, users) {
//     if (err) fail(res, err, 'Error on getting all users!', 400);
//     res.send(users);
//   });
// });

// router.post('/', (req, res) => {
//   const user = new User({ name: req.body.name, phone: req.body.phone });
//   user.save(err => {
//     if (err) fail(res, err, 'Error on save!', 400);
//   }).then(() => {
//     res.status(201).send(user);
//   });
// });

// router.delete('/', (req, res) => {
//   User.remove({}, (err, users) => {
//     if (err) fail(res, err, 'Error on destroy!', 400);
//     res.send('sayonara');
//   });
// });

module.exports = router;
