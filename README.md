# Blouses
## Weekly Schedule

### create a backend/seed.js file that looks like this: 

    const members = [
      {
        name: 'Julian',
        phoneNumber: '+12345678901',
      },
    ];

    const games = [
      {
        date: '6/7',
        time: '8pm',
      },
      {
        date: '6/14',
        time: '6pm',
      },
      {
        bye: true
      }
    ]

module.exports = { members, games };

### create dotenv file with the following and supply values

    MONGO_URI
    TWILIO_SID
    TWILIO_TOKEN
    TWILIO_NUMBER

### npm start to start server