var app = require('../app');
var    assert = require('assert');
//var    api = require('hippie');
var expect = require('chai').expect;

var should = require('should');
var request = require('supertest');
var api = require('../routes/things');
var db = require('../config/db');
var Thing = require('../models/things');





var    port = process.env.PORT || 3000;
var    baseUrl = 'http://localhost:' + port;

describe('Things api', function () {
    var things = [
        {name: 'Rock', price: '10'},
        {name: 'Paper', price: '20'},
        {name: 'Scissors', price: '30'}
    ];




    it('it exists', function () {
        expect(api).to.exist;
    });


    describe('GET /api/things', function () {

        // add three records
        beforeEach(function (done) {


            db.connect(function (err, conn) {
                if (err)
                    console.log(err);
                else
                    console.log("connected");
            });

                    // clear out data for tests
            Thing.remove({})
                .then(function () {
                    // this only works in mongo db NOT MONGOOSE
                    //   Thing.create(things, done);
                   return  Thing.create(things);
                })
                .then(function (things_) {
                    console.log(things_);
                    done();
                })
                .catch(function (err) {
                    console.log(err);
                    done();
                })


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



