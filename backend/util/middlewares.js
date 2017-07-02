const checkAuth = function(req, res, next) {
  if (req.path !== '/messages') {
    if (req.headers.api_key !== process.env.API_KEY) res.send('You are not authorized to perform this action');
    // TODO: properly handle unauthorized scenario
  }

  next();
};

module.exports = { checkAuth };