var User = require('./userModel');
var lib = require('../../tagus_lib/lib');
var requiredFields = lib.models(User).getRequiredFields();
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../app');

chai.use(chaiHttp);

describe('Users', function(){
    it("Should list all user on /api/users GET", function(done) {
        chai.request(server)
        .get('/api/users/')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.forEach(function(user) {
                lib.tests.testRequiredFields(user, requiredFields);
            });
            done();
        });
    });

    it("should insert a new user on /api/users POST", function(done) {
        var totalUsers = 0;
        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            totalUsers = res.body.length;

            chai.request(server)
            .post('/api/users')
            .send({username: "username", email: "email@email.com", password: "123456"})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                lib.tests.testRequiredFields(res.body,requiredFields);

                chai.request(server)
                .get('/api/users')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.to.equal(totalUsers + 1);
                    done();
                });
            });
        });
    });

    it("Should list a single user on /api/users/<id> GET", function(done) {
        chai.request(server)
        .get('/api/users/')
        .end(function(err, res) {
            chai.request(server)
            .get("/api/users/" + res.body[0]._id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                lib.tests.testRequiredFields(res.body, requiredFields);
                done();
            });
        });

    });

    it("Should update a single user on /api/users/<id> POST", function(done) {
        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            var user = res.body[res.body.length - 1];
            user.username = "newUsername";

            chai.request(server)
            .post('/api/users/' + user._id)
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.username.should.to.equal("newUsername");

                done();
            });

        });
    });

    it("Should delete a user on api/users/<id> DELETE", function(done) {
        var totalUsers = 0;
        var deletedId;

        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            totalUsers = res.body.length;
            deletedId = res.body[totalUsers - 1]._id;

            chai.request(server)
            .delete('/api/users/' + deletedId)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body._id.should.to.equal(deletedId);

                chai.request(server)
                .get('/api/users')
                .end(function(err, res) {
                    res.body.length.should.to.equal(totalUsers - 1);

                    done();
                });
            });
        });
    });
});
