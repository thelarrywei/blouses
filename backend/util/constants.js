const responseMapping = {
  'IN': 'Great, see you at the game!',
  'OUT': 'That\'s too bad, bye bye playing time!',
  'MAYBE': 'Okay, well it\'s never too late to change your mind and reply \'IN\'',
  'HELP': 'Try some of these keywords \'IN\', \'OUT\', \'MAYBE\', \'ROSTER\'',
  'DEFAULT': 'Sorry I didn\'t understand that, reply with \'HELP\' for more information.',
};

const _replyText = {
  'BYE': 'We have a bye this week',
  'EMPTY': 'Uh oh, nobody\'s playing yet',
};

const validStatuses = ['IN', 'OUT', 'MAYBE'];

module.exports = { responseMapping, _replyText, validStatuses };
