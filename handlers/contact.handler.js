'use strict';

const {isEquivalent} = require('../utils/functions');
const {firebase} = require('../config/firebase');

const createContact = function createContact (req, res) {
  console.log(req.decodedToken);
  let db = firebase.database();
  let query = db.ref('contacts').child(req.decodedToken.id).orderByKey();
  query.once('value')
    .then(snapshot => {
      let alreadyExists = false;
      snapshot.forEach(allContacts => {
        // let key = allContacts.key;
        if(isEquivalent(allContacts.val(), req.body)) {
          alreadyExists = true;
        }
      });
      if(alreadyExists) {
        res.status(409).json({
          success: true,
          message: 'The contact already exists!'
        });
      } else {
        let contactRef = db.ref('contacts').child(req.decodedToken.id);
        contactRef.push().set(req.body, err => {
          if(err) {
            res.status(500).json({
              success: true,
              message: 'Error saving the data!'
            });
          } else {
            res.status(201).json({
              success: true,
              message: 'Contact created successfully!'
            });
          }
        });
      }
    });
};

module.exports = {
  createContact
};
