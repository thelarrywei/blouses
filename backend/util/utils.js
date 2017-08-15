const moment = require('moment-timezone');
const converter = require('number-to-words');
const _ = require('lodash');

const { client, twilioNumber } = require('../twilio_config');
const { validStatuses, replyText, oneWeek, remindDay, announceDay, scheduledTime } = require('./constants');
const { handleError } = require('./error_handler');
const { Game } = require('../models/game');
const { User } = require('../models/user');

// TODO: breakout kickOffSMS, sendWeeklySMS, and gameReminder into a ScheduledTexts module?

const getInitialDelay = (game, day, time) => {
  // moment diff is negative we're already past the scheduled time
  return moment.tz(game.date, process.env.MOMENT_LOCALE).weekday(day).startOf('day').hour(time).diff(moment()) || 0;
};

const scheduleWeeklySMS = (game, day, time, sendSMS) => {
  // PROD
  const initialDelay = getInitialDelay(game, day, time);
  const intervalDelay = oneWeek;
  // DEV
  // const initialDelay = 5000;
  // const intervalDelay = 5000;
  // PROD
  const startInterval = setInterval(() => {
      sendSMS();
  }, intervalDelay);

  setTimeout(() => { sendSMS(); startInterval; }, initialDelay);
};

const sendMessage = ({ members, gameId, gameText, messagesType }) => {
  const activeAndLonely = ({ active, sentWeeklySMS }) => {
    // undefined check bc Mongoose doesn't support minimize: false for nested objects
    if (typeof sentWeeklySMS[messagesType] === 'undefined') sentWeeklySMS[messagesType] = {};
    return active && !sentWeeklySMS[messagesType][gameId]
  };
  // filter by members who are active and haven't received the weekly message
  // TODO: think about decoupling activeAndLonely from sendMessage, perhaps move it into announce and remind
  members.filter(activeAndLonely).forEach(({ _id, name, phone, active, sentWeeklySMS }) => {
    SMSBody = `Hey ${name}, ${gameText} ${replyText.SIG}`;
    client.messages.create({
      body: SMSBody,
      to: phone,
      from: twilioNumber,
    }).then(response => {
      console.log(response);
      sentWeeklySMS[messagesType][gameId] = true;
      User.update(
        { _id },
        { $set: { sentWeeklySMS } },
        handleError
      );
    });
  });
};

const announce = (game) => {
  const gameTime = formatGame(game);

  let SMSBody;
  const gameText = game.bye
    ? replyText.BYE.toLowerCase()
    : `the next game is on ${gameTime} reply 'In', 'Out', or 'Maybe'. Text 'Roster' to see who's playing.`;

  User.find({}, (err, members) => {
    if (err) return handleError(err);

    if (members) sendMessage({ members, gameId: game.id, gameText, messagesType: 'announcements' });
  });
};

const remind = (game) => {
  if (game.bye) return;

  const attendances = Object.values(game.attendances);
  const isIn = (val) => (val.status === 'IN');
  const notIn = (val) => (['OUT', 'MAYBE'].includes(val.status));
  const maybe = (val) => (val.status === 'MAYBE');
  const allResponses = (val) => (true);
  const rosterSize = attendances.filter(isIn).length;
  let rosterText = (() => {
    switch (rosterSize) {
      case 0:
        return 'have no blouses';
      case 1:
        return `only have ${converter.toWords(rosterSize)} blouse`;
      default:
        return `only have ${converter.toWords(rosterSize)} blouses`;
    }
  })();

  let gameText = `we ${rosterText} showing up this week, `;

  const findMembers = (filter) => {
    return attendances.reduce((members, attendance) => {
      // not sure if we need to do this nil/undefined check here but jic
      if (!_.isNil(attendance) && filter(attendance)) return members.concat([attendance.user]);
      else return members;
    }, []);
  };

  const responderIds = findMembers(allResponses).map(member => member._id);

  User.find({ _id: { $nin: responderIds } }, (err, users) => {
    // not sure what happens with users if mongoose returns an error, we want to execute reminder anyways
    const nonResponders = users || [];
    let membersToRemind = (() => {
      switch (true) {
        case (rosterSize < 5):
          gameText += 'can you help us avoid a forfeit?';
          return nonResponders.concat(findMembers(notIn));
        case (rosterSize === 5):
          gameText += 'can you help us get a few more on the floor?';
          return nonResponders.concat(findMembers(maybe));
        default:
          return [];
      }
    })();

    if (membersToRemind.length > 0) sendMessage({ members: membersToRemind, gameId: game.id, gameText, messagesType: 'reminders' });
    if (err) return handleError(err);
  });
};


const kickOffSMS = () => {
  Game.nextGame((err, game) => {
    if (err) return handleError(err);

    if (game) {
      scheduleWeeklySMS(game, announceDay, scheduledTime, () => announce(game));
      scheduleWeeklySMS(game, remindDay, scheduledTime, () => remind(game));
      console.log('announcement delay: ', getInitialDelay(game, announceDay, scheduledTime));
      console.log('reminder delay: ', getInitialDelay(game, remindDay, scheduledTime));
    } else {
      console.log(replyText.NO_CONTEST);
    };
  });
};

const sendWeeklySMS = () => {
  Game.nextGame((err, game) => {
    if (err) return handleError(err);
    if (game) {
      // DEV
      // announce(game);
      // remind(game);
      // PROD
      // only announce and remind if we're already overdue for the week
      if (getInitialDelay(game, announceDay, scheduledTime) === 0) announce(game);
      if (getInitialDelay(game, remindDay, scheduledTime) === 0) remind(game);
    }
  });
};

const formatGame = (game) => {
  return moment.tz(game.date, process.env.MOMENT_LOCALE).format('M/D, h:mma');
};

const isValidStatus = status => validStatuses.includes(status);

module.exports = { kickOffSMS, sendWeeklySMS, isValidStatus, formatGame };
