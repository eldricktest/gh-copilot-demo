const express = require('express');
const bodyParser = require('body-parser');
const albumsRouter = require('./routes/albums');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use('/albums', albumsRouter);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
