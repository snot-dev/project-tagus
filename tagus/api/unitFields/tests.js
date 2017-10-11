const testName = "Unit Fields";
const UnitField = require('./model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../../app');
const mongoose = require('mongoose'); 
const url = "/api/unitfields/";
const SharedTests = require("../shared/sharedTests");
const tests = new SharedTests();

chai.use(chaiHttp);
mongoose.Promise = require('bluebird');

const mock = {
    _id: new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca'),
    name: "Text",
    type: "text",
    createdBy: "user",
    created: new Date(),
    edited: new Date()
};

const updatedValue = "testUpdate"
const updatedMock = Object.assign(mock, {name: updatedValue});

describe(testName, () => {
    it(`Should list all ${testName} at ${url} GET`, tests.getAll(url, UnitField));
    
    it(`Should create a new ${testName} in ${url} POST`, tests.createNew(url, UnitField, mock));

    it(`Should list a single ${testName} in ${url}<id> GET`, tests.getOneById(url, UnitField, mock._id));

    it(`Should update existing ${testName} in ${url}<id> PUT`, tests.updateExisting(url, UnitField, updatedMock));

    it(`Should delete existing ${testName} in ${url}<id> DELETE`, tests.deleteById(url, UnitField, updatedMock._id));
});
