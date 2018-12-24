'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/defaults');
const User = require('../models/user.model');

const index = function index (req, res) {
  res.json({
    success: true,
    message: 'Index page'
  });
};

const login = function login (req, res) {
  let email = req.body.email;
  let pass = req.body.pass;
  if(!email || !pass) {
    res.status(422).json({
      success: false,
      message: 'Your request is missing parameters!'
    });
  }
  // For the given username fetch user from DB
  User.findOne({email}, (err, user) => {
    if(err) {
      res.status(500).json({
        success: false,
        message: 'Error validating the user!'
      });
    }
    bcrypt.hash(pass, 10, (errHash, hash) => {
      if (errHash) {
        res.status(500).json({
          success: false,
          message: 'Error verifiying password!'
        });
      }
      pass = hash;
    });
    bcrypt.compare(pass, user.pass)
      .then( equalPass => {
        if(equalPass && user.email === email) {
          let token = jwt.sign(
            {id: user._id, email},
            config.secret,
            {expiresIn: '1h'}
          );
          // return the JWT token for the future API calls
          res.status(200).json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
          res.status(403).json({
            success: false,
            message: 'Incorrect email or password'
          });
        }
      })
      .catch(e => {
        res.status(500).json({
          success: false,
          message: 'Server error!',
          error: e
        });
      });
  });
};

const createUser = function createUser (req, res) {
  User.create(req.body)
    .then(newUser => {
      console.log('nuevo usuario creado', newUser);
      res.status(201).json({
        success: true,
        message: 'User created successfully!',
        user: newUser
      });
    })
    .catch(err => {
      console.log('errores: ', err);
      res.status(500).json({
        success: false,
        message: 'Server error!',
        error: err
      });
    });
};

module.exports = {
  index,
  login,
  createUser
};
