'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { 
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'The email is required',
    validate: [email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email), 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  pass: { 
    type: String,
    required: true
  }
});

userSchema.pre('save', function preSave (next) {
  let self = this;
  bcrypt.hash(self.pass, 10, function hashPass (err, hash) {
    if (err) {
      return next(err);
    }
    console.log(self.email, hash);
    self.pass = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
