'use strict';

const Joi = require('joi');
 
module.exports.validationContact = {
  body: {
    email: Joi.string().email().required(),
    name: Joi.string().regex(/[a-zA-Z]{3,30}/).required()
      .error(() => 'name is a required field. It must have between 3 and 30 alphanumeric characters'),
    lastname: Joi.string().regex(/[a-zA-Z]{3,30}/).required()
      .error(() => 'lastName is a required field. It must have between 3 and 30 alphanumeric characters'),
    phone: Joi.string().regex(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/).required()
      .error(() => 'phone is a required field. It must have any of these USA phone formats (000) 000-0000, 000-000-0000')
  }
};
