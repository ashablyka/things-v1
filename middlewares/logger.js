function logger(req, res, next) {
  console.log(`${new Date().toGMTString()} ${req.method} ${req.url}`);

  next();
}

module.exports = logger;
