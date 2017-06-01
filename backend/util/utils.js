const moment = require('moment');

const whenIsTheGame = (sendSMS) => {
  const initialDelay = moment().weekday(7).diff(moment());
  const weeklyDelay = 6.048e+8;
  // const initialDelay = 100;
  // const weeklyDelay = 100;
  let count = 0;
  // NB: this hardcodes 9 game slots per season

  const startInterval = setInterval(() => {
    sendSMS();
    if (count >= 9) {
      clearInterval(startInterval);
    };
    count += 1;
  }, weeklyDelay);

  setTimeout(() => { sendSMS(); startInterval; }, initialDelay);

};

module.exports = whenIsTheGame;