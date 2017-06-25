const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  // NB: creating an API will be v2 so information can be modified via Postman
  res.status(200).send('hello world')
});

router.post('/', (req, res) => {
  const user = new User({ name: req.body.name, phone: req.body.phone });
  user.save(err => {
    if (err) fail(err, 'Error on save!', 400);
  }).then(() => {
    res.status(201).send(user.toJSON());  
  });
  debugger;
});

const fail = (err, msg, code) => {
  console.log(err);
  res.status(code).send(msg);
}

module.exports = router;
