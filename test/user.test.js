'use strict';

const should = require('chai').should();
const { assert } = require('chai');
const supertest = require('supertest');
const api = supertest('http://localhost:8000/api/v1');

describe('User', function fn () {
  it('Login. Should return a 200 ok response and the token for future request', function fnit (done) { 
    api.post('/login')
      .set('Accept', 'application/json')
      .send({email: 'piero@gmail.com', pass: 'horacio'})
      .expect(200)
      .end((err, res) => {
        console.log('res', res.body);
        if(err) {
          throw new Error(err);
        }
        should.exist(res.body);
        should.exist(res.body.token);
        should.exist(res.body.success);
        should.exist(res.body.message);
        assert.propertyVal(res.body, 'success', true);
        done();
      });    
  });
});
