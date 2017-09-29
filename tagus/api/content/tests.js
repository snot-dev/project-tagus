var Content = require('./model');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../app');
var mongoose = require('mongoose'); 
var url = "/api/content";
chai.use(chaiHttp);

describe('Content', function(){
    it("Should list all content at /api/content GET", function(done) {
        chai.request(server)
        .get(url)
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.forEach(function(content) {
                var cont = new Content(content);
                should.not.exist(cont.validateSync())
            });

            done();
        });
    });

/*    it("should insert a new page on /api/pages POST", function(done) {
        var totalPages = 0;
        chai.request(server)
        .get('/api/pages')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            totalPages = res.body.length;

            chai.request(server)
            .post('/api/pages')
            .send({
                name: "Test",
                url: "/",
                createdBy: "user",
                created: new Date(),
                edited: new Date(),
                published: new Date(),
                unitType: {
                    name: "Test",
                    unitFields: [{
                        name: "Test Name",
                        alias: "test",
                        type: "text",
                        value: "This is a test",
                    }]
                },
                template: "index",
                child: "",
                parent: ""
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                lib.tests.testRequiredFields(res.body,requiredFields);

                chai.request(server)
                .get('/api/pages')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.to.equal(totalPages + 1);
                    done();
                });
            });
        });
    });

    it("Should list a single page on /api/pages/<id> GET", function(done) {
        chai.request(server)
        .get('/api/pages/')
        .end(function(err, res) {
            chai.request(server)
            .get("/api/pages/" + res.body[0]._id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                lib.tests.testRequiredFields(res.body,requiredFields);
                done();
            });
        });

    });

    it("Should update a single page on /api/pages/<id> POST", function(done) {
        chai.request(server)
        .get('/api/pages')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            var page = res.body[res.body.length - 1];
            page.name = "This will be deleted afterwards";

            chai.request(server)
            .post('/api/pages/' + page._id)
            .send(page)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.name.should.to.equal("This will be deleted afterwards");

                done();
            });

        });
    });

    it("Should delete a page on api/pages/<id> DELETE", function(done) {
        var totalPages = 0;
        var deletedId;

        chai.request(server)
        .get('/api/pages')
        .end(function(err, res) {
            totalPages = res.body.length;
            deletedId = res.body[totalPages - 1]._id;

            chai.request(server)
            .delete('/api/pages/' + deletedId)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body._id.should.to.equal(deletedId);

                chai.request(server)
                .get('/api/pages')
                .end(function(err, res) {
                    res.body.length.should.to.equal(totalPages - 1);

                    done();
                });
            });
        });
    }); */
});
