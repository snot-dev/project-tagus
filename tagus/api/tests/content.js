const testName = "Content";
const Content = require('../content').model;
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../../app');
const mongoose = require('mongoose'); 
const url = "/tagus/api/content/";
const SharedTests = require("../shared/tests");
const tests = new SharedTests();

chai.use(chaiHttp);
mongoose.Promise = require('bluebird');

const mock = {
    _id: new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca'),
    name: "Home",
    alias: "home",
    url: "/",
    createdBy: "System",
    unitType: "5a017a9e83dd7214c8661648",
    partial: null,
    template: "master",
    isHome: true,
    published: true,
    children: [
        "5a0181a26602223bd865660c",
    ],
    content: {
        default: {
            title: "Your Favorite Source of Free Bootstrap Themes",
            subTitle: "Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!",
            link: "#about",
            linkText: "Find Out More"
        }
    }
};

const updatedValue = "testUpdate"

const updatedMock = Object.assign(mock, {name: updatedValue});

describe("this is just a test", tests.CRUD(url, Content, {new: mock}));

/*
describe(testName, function() {
    before(function(){
        console.log("Before");
        it(`Should list all ${testName} at ${url} GET`, tests.getAll(url, Content));
    });
    
    after(function(){
        console.log("after");
        it(`Should delete existing ${testName} in ${url}<id> DELETE`, function(done) {
            let totalPages = 0;
            let deletedId;
    
            chai.request(server)
            .get(url)
            .end(function(err, res) {
                totalPages = res.body.length;
    
                chai.request(server)
                .delete(`${url}${mock._id}`)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Document successfully deleted!');
                    res.body.should.be.a('object');
                    res.body.result.should.have.property('_id').eql(mock._id.toString());
    
                    chai.request(server)
                    .get(`${url}${mock.parent}`)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.children.should.be.a('array');
                        res.body.children.should.not.include(mock._id.toString());
                        done();
                    });
                });
            });
        });
    });

    it(`Should create a new ${testName} in ${url} POST`, function(done){
        let totalDocs = 0;
        chai.request(server)
        .get(url)
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            totalDocs = res.body.length;

            chai.request(server)
            .post(url)
            .send(mock)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                const instance = new Content(res.body.result);

                should.not.exist(instance.validateSync())

                chai.request(server)
                .get(url)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.to.equal(totalDocs + 1);

                    chai.request(server)
                    .get(`${url}${mock.parent}`)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.children.should.be.a('array');
                        res.body.children.should.include(mock._id.toString());
                        done();
                    });
                });
            });
        });
    });

    it(`Should list a single ${testName} in ${url}<id> GET`, tests.getOneById(url, Content, mock._id));

    it(`Should update existing ${testName} in ${url}<id> PUT`, tests.updateExisting(url, Content, updatedMock, function(res) {
        const instance = new Content(res.body.result);
        instance.name.should.be.equal(updatedValue);
        res.body.message.should.be.equal("Document updated!");

        should.not.exist(instance.validateSync());
    }));

    
});
*/