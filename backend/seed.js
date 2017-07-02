const users = [
  {
    name: 'DEV',
    phone: process.env.DEV_NUMBER,
  }
];

// TODO: game data should be scraped/pulled from the excel spreadsheet
const games = [
  // {
  //   date: '6/21',
  //   time: '8pm',
  // },
  {
    date: '6/28',
    time: '6pm',    
  },
  // {
  //   date: null,
  //   time: null,
  //   bye: true,
  // }
]

module.exports = { users, games };
