'use strict';

const firebase = require('firebase-admin');
const config = require('./defaults');

const serviceAccount = require('../' + config.firebaseServiceAccFileName);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: config.firebaseDatabaseURI
});

module.exports.firebase = firebase;


