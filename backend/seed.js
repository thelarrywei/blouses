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
    time: '18:15',
  },
  // NOT A REAL GAME
  {
    date: '7/12',
    time: '21:00',
  },
  {
    date: '7/19',
    time: '20:05',
  },
  {
    date: '7/26',
    time: null,
    bye: true,
  },
  {
    date: '8/2',
    time: '19:10',
  },
  {
    date: '8/9',
    time: null,
    bye: true,
  },
  {
    date: '8/16',
    time: '18:15',
  },
  {
    date: '8/23',
    time: '19:10',
  },
  {
    date: '8/30',
    time: '20:05',
  },
  {
    date: '9/6',
    time: '19:10',
  },
];

module.exports = { users, games };
