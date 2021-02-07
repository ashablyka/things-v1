const express = require('express');
const router = require('./routes');
const cors = require('./middlewares/cors');
const logger = require('./middlewares/logger');
const jsonBodyParser = require('./middlewares/jsonBodyParser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors);
app.use(logger);
app.use(jsonBodyParser);
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
