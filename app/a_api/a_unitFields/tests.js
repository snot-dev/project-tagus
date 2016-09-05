var UnitField = require('./unitFieldModel');
var lib = require('../../a_lib/lib');
var requiredFields = lib.models(UnitField).getRequiredFields();
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../app');

chai.use(chaiHttp);

describe('UnitFields', function(){
    it("Should list all unitFields on /api/unitfields GET", function(done) {
        chai.request(server)
        .get('/api/unitfields/')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.forEach(function(unitfield) {
                lib.tests.testRequiredFields(unitfield, requiredFields);
            });
            done();
        });
    });

    it("should insert a new unitField on /api/unitfields POST", function(done) {
        var totalUnitFields = 0;
        chai.request(server)
        .get('/api/unitfields')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            totalUnitFields = res.body.length;

            chai.request(server)
            .post('/api/unitfields')
            .send({
                name: "testUnitField",
                type: "test"
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                lib.tests.testRequiredFields(res.body,requiredFields);

                chai.request(server)
                .get('/api/unitfields')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');

                    res.body.length.should.to.equal(totalUnitFields + 1);
                    done();
                });
            });
        });
    });


    it("Should list a single unitField on /api/unitfields/<id> GET", function(done) {
        chai.request(server)
        .get('/api/unitfields/')
        .end(function(err, res) {
            chai.request(server)
            .get("/api/unitfields/" + res.body[0]._id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                lib.tests.testRequiredFields(res.body,requiredFields);
                done();
            });
        });

    });

    it("Should update a single unitField on /api/unitFields/<id> POST", function(done) {
        chai.request(server)
        .get('/api/unitfields')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            var unitField = res.body[res.body.length - 1];
            unitField.name = "This will be deleted afterwards";

            chai.request(server)
            .post('/api/unitfields/' + unitField._id)
            .send(unitField)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.name.should.to.equal("This will be deleted afterwards");

                done();
            });

        });
    });

    it("Should delete a unitField on api/unitfields/<id> DELETE", function(done) {
        var totalUnitFields = 0;
        var deletedId;

        chai.request(server)
        .get('/api/unitfields')
        .end(function(err, res) {
            totalUnitFields = res.body.length;
            deletedId = res.body[totalUnitFields - 1]._id;

            chai.request(server)
            .delete('/api/unitfields/' + deletedId)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body._id.should.to.equal(deletedId);

                chai.request(server)
                .get('/api/unitfields')
                .end(function(err, res) {
                    res.body.length.should.to.equal(totalUnitFields - 1);

                    done();
                });
            });
        });
    });
});
