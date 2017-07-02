const handleError = (err) => {
  if (err) console.log(err);
};

const fail = (res, err, msg, code) => {
  console.log(err);
  return res.status(code).send(msg);
};


module.exports = { handleError, fail };
