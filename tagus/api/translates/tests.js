var Translate = require('./translateModel');
var lib = require('../../tagus_lib/lib');
var requiredFields = lib.models(Translate).getRequiredFields();
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../app');

chai.use(chaiHttp);

describe('Translates', function(){
    it("Should list all translates on /api/translates GET", function(done) {
        chai.request(server)
        .get('/api/translates/')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.forEach(function(translate) {
                lib.tests.testRequiredFields(translate, requiredFields);
            });
            done();
        });
    });

    it("should insert a new translate on /api/translates POST", function(done) {
        var totalTranslates = 0;
        chai.request(server)
        .get('/api/translates')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            totalTranslates = res.body.length;

            chai.request(server)
            .post('/api/translates')
            .send({
                key: "test",
                langs: [
                    {
                        "en": "This is a test",
                        "pt": "Isto é um teste"
                    }
                ]
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                lib.tests.testRequiredFields(res.body,requiredFields);

                chai.request(server)
                .get('/api/translates')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.to.equal(totalTranslates + 1);
                    done();
                });
            });
        });
    });

    it("Should list a single translate on /api/translates/<id> GET", function(done) {
        chai.request(server)
        .get('/api/translates/')
        .end(function(err, res) {
            chai.request(server)
            .get("/api/translates/" + res.body[0]._id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                lib.tests.testRequiredFields(res.body,requiredFields);
                done();
            });
        });

    });

    it("Should update a single translate on /api/translates/<id> POST", function(done) {
        chai.request(server)
        .get('/api/translates')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            var translate = res.body[res.body.length - 1];
            translate.langs[0].en = "This will be deleted afterwards";

            chai.request(server)
            .post('/api/translates/' + translate._id)
            .send(translate)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.langs[0].en.should.to.equal("This will be deleted afterwards");

                done();
            });

        });
    });

    it("Should delete a translate on api/translates/<id> DELETE", function(done) {
        var totalTranslates = 0;
        var deletedId;

        chai.request(server)
        .get('/api/translates')
        .end(function(err, res) {
            totalTranslates = res.body.length;
            deletedId = res.body[totalTranslates - 1]._id;

            chai.request(server)
            .delete('/api/translates/' + deletedId)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body._id.should.to.equal(deletedId);

                chai.request(server)
                .get('/api/translates')
                .end(function(err, res) {
                    res.body.length.should.to.equal(totalTranslates - 1);

                    done();
                });
            });
        });
    });
});
