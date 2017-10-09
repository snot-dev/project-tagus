const Content = require('./model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../../app');
const mongoose = require('mongoose'); 
const url = "/api/content/";
const SharedTests = require("../shared/sharedTests");
const tests = new SharedTests();

chai.use(chaiHttp);
mongoose.Promise = require('bluebird');

const mock = {
    _id: new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca'),
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

const updatedValue = "testUpdate"

const updatedMock = Object.assign(mock, {name: updatedValue});

describe('Content', () => {
    it(`Should list all content at ${url} GET`, tests.getAll(url, Content));
    
    it(`Should create a new content in ${url} POST`, tests.createNew(url, Content, mock));

    it(`Should list a single content in ${url}<id> GET`, tests.getOneById(url, Content, mock._id));

    it(`Should update existing content in ${url}<id> PUT`, tests.updateExisting(url, Content, updatedMock, res => {
        const instance = new Content(res.body.result);
        
        instance.name.should.be.equal(updatedValue);
        res.body.message.should.be.equal("Document updated!");

        should.not.exist(instance.validateSync());
    }));

    it(`Should delete existing content in ${url}<id> DELETE`, tests.deleteById(url, Content, updatedMock._id));
});
