function jsonBodyParser(req, res, next) {
  const data = [];

  req.on('data', (chunk) => {
    data.push(chunk);
  });

  req.on('end', () => {
    try {
      req.body = JSON.parse(data.toString());
    } catch (err) {
      req.body = data.toString();
    }

    next();
  });
}

module.exports = jsonBodyParser;
