const Content = require('./model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../../app');
const mongoose = require('mongoose'); 
const url = "/api/content/";
const tests = require("../sharedTests/sharedTests");
const mock = {
    name: 'testPage',
    url: '/testPage',
    createdBy: 'user',
    created: new Date(),
    edited: new Date(),
    published: new Date(),
    unitType:  '123213232313131',
    template: 'index',
    parent: '',
    isHome: false,
    content: {
        'siteName': 'Example Site'
    }
};
let putObj = null;

chai.use(chaiHttp);
mongoose.Promise = require('bluebird');


describe('Content', function(){
    it(`Should list all content at ${url} GET`, tests.getAll(url, Content));

    it(`Should list a single content on ${url}<id> GET`, tests.getOneById(url, Content));

    it(`Should create a new content on ${url} POST`, tests.createNew(url, Content, mock, (res) => {
        const instance = new Content(res.body.result);
        
        putObj = res.body.result;

        should.not.exist(instance.validateSync())
    }));

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
