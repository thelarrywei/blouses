const users = [
  {
    name: 'DEV',
    phone: process.env.DEV_NUMBER,
  },
];

// TODO: game data should be scraped/pulled from the excel spreadsheet
const games = [
  // NOT A REAL GAME
  {
    date: '7/5',
    time: '6pm',
  },
  // NOT A REAL GAME
  {
    date: '7/12',
    time: '9pm',
  },
  {
    date: '7/19',
    time: '8pm',
  },
  {
    date: '7/26',
    time: null,
    bye: true,
  },
  {
    date: '8/2',
    time: '7pm',
  },
  {
    date: '8/9',
    time: null,
    bye: true,
  },
  {
    date: '8/16',
    time: '6pm',
  },
  {
    date: '8/23',
    time: '7pm',
  },
  {
    date: '8/30',
    time: '8pm',
  },
  {
    date: '9/6',
    time: '7pm',
  },
];

module.exports = { users, games };
