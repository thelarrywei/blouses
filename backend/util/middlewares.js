const checkAuth = function(req, res, next) {
  if (req.path !== '/messages/reply') {
    if (req.headers.api_key !== process.env.API_KEY) return res.send('You are not authorized to perform this action');
  }

  next();
};

module.exports = { checkAuth };