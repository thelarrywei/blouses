const responseMapping = {
  IN: 'Great, see you at the game!',
  OUT: 'That\'s too bad, bye bye playing time!',
  MAYBE: 'Okay, well it\'s never too late to change your mind and reply \'In\'',
  COMMANDS: 'Try one of these keywords: \'In\', \'Out\', \'Maybe\', \'Roster\'',
  DEFAULT: 'Sorry I didn\'t understand that, reply with \'Commands\' for more information.',
};

const replyText = {
  BYE: 'We have a bye this week',
  EMPTY: 'Uh oh, nobody\'s playing yet',
  SIG: '-Blouses Bot',
};

const validStatuses = ['IN', 'OUT', 'MAYBE'];

module.exports = { responseMapping, replyText, validStatuses };
