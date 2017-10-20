const testName = "Settings";
const Settings = require('../settings').model;
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../../app');
const mongoose = require('mongoose'); 
const url = "/api/settings/";
const SharedTests = require("../shared").tests;
const tests = new SharedTests();

chai.use(chaiHttp);
mongoose.Promise = require('bluebird');

const mock = {
    _id: new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca'),
    lang: 'pt'
};

const updatedValue = "testUpdate"

const updatedMock = Object.assign(mock, {lang: 'br'});

describe(testName, () => {
    it(`Should list all ${testName} at ${url} GET`, tests.getAll(url, Settings));
    
    it(`Should create a new ${testName} in ${url} POST`, tests.createNew(url, Settings, mock));

    it(`Should list a single ${testName} in ${url}<id> GET`, tests.getOneById(url, Settings, mock._id));

    it(`Should update existing ${testName} in ${url}<id> PUT`, tests.updateExisting(url, Settings, updatedMock));

    it(`Should delete existing ${testName} in ${url}<id> DELETE`, tests.deleteById(url, Settings, updatedMock._id));
});
