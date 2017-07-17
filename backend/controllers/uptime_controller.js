const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  console.log('yawn, yeah yeah I\'m waking up');
  res.status(200).send('yawn, yeah yeah I\'m waking up');
});

module.exports = router;
