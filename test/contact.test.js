'use strict';

const should = require('chai').should();
const {assert} = require('chai');
const supertest = require('supertest');
const api = supertest('http://localhost:8000/api/v1');

describe('Contact', function fn () {
  it('POST a new contact. Should return a 201 response.', function fnit (done) { 
    this.timeout(10000);
    api.post('/login')
      .set('Accept', 'application/json')
      .send({email: 'piero@gmail.com', pass: 'horacio'})
      .expect(200)
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        should.exist(res.body);
        should.exist(res.body.token);
        should.exist(res.body.success);
        should.exist(res.body.message);
        assert.propertyVal(res.body, 'success', true);
        api.post('/contact')
          .set('x-api-token', res.body.token)
          .set('Accept', 'application/json')
          .send({
            name: 'test',
            lastname: 'sacco',
            email: 'pierosac@gmail.asdf',
            phone: '777-777-' + Math.floor(1000 + Math.random() * 9000)
          })
          .expect(201)
          .end((erro, resp) => {
            if(erro) {
              throw new Error(erro);
            }
            should.exist(resp.body);
            should.exist(resp.body.success);
            should.exist(resp.body.message);
            assert.propertyVal(resp.body, 'success', true);
            done();
          }); 
      });    
  });
});
