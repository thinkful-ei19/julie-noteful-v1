'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function () {
  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2 + 2).to.equal(4);
  });
});

describe('Express static', function () {
  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

describe('404 handler', function () {
  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/bad/path')
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});

describe('GET method', function() { 
  it ('should return a list with the correct fields', function() {
    return chai.request(app)
      .get('/v1/notes')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(10);
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys('id', 'title', 'content');
        });
      });
  });
});

describe('PUT method', function() {
  it('should update a note by its ID', function() {
    const updateNote = {
      'title': 'testing title',
      'content': 'testing content'
    };
    return chai.request(app)
      .put('/v1/noted/1001')
      .send(updateNote)
      .then(function(res){
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
      });
  });
});