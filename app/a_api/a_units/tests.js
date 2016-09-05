var Unit = require('./unitModel');
var lib = require('../../a_lib/lib');
var requiredFields = lib.models(Unit).getRequiredFields();
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../app');

chai.use(chaiHttp);

describe('Units', function(){
    it("Should list all units on /api/units GET", function(done) {
        chai.request(server)
        .get('/api/units/')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.forEach(function(unit) {
                lib.tests.testRequiredFields(unit, requiredFields);
            });
            done();
        });
    });

    it("should insert a new unit on /api/units POST", function(done) {
        var totalUnits = 0;
        chai.request(server)
        .get('/api/units')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            totalUnits = res.body.length;

            chai.request(server)
            .post('/api/units')
            .send({
                name: "test",
                templates: ["test"]
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                lib.tests.testRequiredFields(res.body,requiredFields);

                chai.request(server)
                .get('/api/units')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.to.equal(totalUnits + 1);
                    done();
                });
            });
        });
    });

    it("Should list a single unit on /api/units/<id> GET", function(done) {
        chai.request(server)
        .get('/api/units/')
        .end(function(err, res) {
            chai.request(server)
            .get("/api/units/" + res.body[0]._id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                lib.tests.testRequiredFields(res.body,requiredFields);
                done();
            });
        });

    });

    it("Should update a single unit on /api/units/<id> POST", function(done) {
        chai.request(server)
        .get('/api/units')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            var unit = res.body[res.body.length - 1];
            unit.name = "This will be deleted afterwards";

            chai.request(server)
            .post('/api/units/' + unit._id)
            .send(unit)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.name.should.to.equal("This will be deleted afterwards");

                done();
            });

        });
    });

    it("Should delete a unit on api/units/<id> DELETE", function(done) {
        var totalUnits = 0;
        var deletedId;

        chai.request(server)
        .get('/api/units')
        .end(function(err, res) {
            totalUnits = res.body.length;
            deletedId = res.body[totalUnits - 1]._id;

            chai.request(server)
            .delete('/api/units/' + deletedId)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body._id.should.to.equal(deletedId);

                chai.request(server)
                .get('/api/units')
                .end(function(err, res) {
                    res.body.length.should.to.equal(totalUnits - 1);

                    done();
                });
            });
        });
    });
});
