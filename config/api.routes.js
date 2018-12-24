'use strict';

const express = require('express');
const validate = require('express-validation');
const {verifyToken} = require('../middleware/jwt');
const {validationContact} = require('../middleware/validation.contact');
const {index, login, createUser} = require('../handlers/user.handler');
const {createContact} = require('../handlers/contact.handler');
let router = new express.Router();

router.post('/api/v1/signin', createUser);
router.post('/api/v1/login', login);
router.get('/api/v1/', verifyToken, index);

router.post('/api/v1/contact', [verifyToken, validate(validationContact, {abortEarly: false})], createContact);

router
  .all('*', (req, res) => {
    res.status(501).json({
      success: false,
      message: 'Wrong endpoint!'
    });
  });

module.exports = router;
