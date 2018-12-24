'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/defaults');

const verifyToken = (req, res, next) => {
  let token = req.headers['x-api-token'] || req.headers.authorization;
  if (typeof token === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, config.secret, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }
    req.decodedToken = decodedToken;
    next();
  });
};

module.exports = {
  verifyToken
};
