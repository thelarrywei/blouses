const whiteListed = [
  '/messages/reply',
  '/coffee',
];

const checkAuth = function checkAuth(req, res, next) {
  if (!whiteListed.includes(req.path)) {
    if (req.headers.api_key !== process.env.API_KEY) return res.send('You are not authorized to perform this action');
  }

  next();
};

module.exports = { checkAuth };
