'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./config/api.routes');
const config = require('./config/defaults');

// Starting point of the server
const main = function main() {
  let app = express();
  const port = process.env.PORT || 8000;

  mongoose.connect(config.mongoDBURI, {useCreateIndex: true, useNewUrlParser: true});
  app.use(bodyParser.urlencoded({extended: true})); 
  app.use(bodyParser.json());
  app.use(apiRoutes);
  app.use((err, req, res, next) => {
    res.status(400).json(err);
    next();
  });
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
};

main();
