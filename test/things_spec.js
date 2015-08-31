var app = require('../app');
var    assert = require('assert');
//var    api = require('hippie');
var expect = require('chai').expect;

var should = require('should');
var request = require('supertest');
var api = require('../routes/things');
var Thing = require('../models/things');





var    port = process.env.PORT || 3000;
var    baseUrl = 'http://localhost:' + port;

describe('Things api', function () {
    // clear out data for tests
    beforeEach(function (done) {
        Thing.remove({}, done);
    });

    it('it exists', function () {
        expect(api).to.exist;
    });


    describe('GET /api/things', function () {

        // add three records
        beforeEach(function (done) {
            var things = [
                {name: 'Rock', price: '10'},
                {name: 'Paper', price: '20'},
                {name: 'Scissors', price: '30'}
            ]

          // this only works in mongo db NOT MONGOOSE
         //   Thing.create(things, done);
            Thing.create(things, function(err, things_){
                if (err ) {
                    console.log('Could not create things')
                }
                else {
                    console.log('Successfully created things')
                }
            });


        });

        it('/api/things exists', function (done) {
            api.get('/')
                .expect(200)
                .end(done)
        });

/*
        it('has 3 posts', function (done) {
            api.get('/api/posts')
                .expect(200)
                .expect(function (response) {
                    expect(response.body).to.have.length(3);
                })
                .end(done)
        });
        **/
    });

});



