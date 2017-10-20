const testName = "Units";
const Unit = require('../units').model;
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../../app');
const mongoose = require('mongoose'); 
const url = "/api/units/";
const SharedTests = require("../shared").tests;
const tests = new SharedTests();

chai.use(chaiHttp);
mongoose.Promise = require('bluebird');

const mock = {
    _id: new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca'),
    name: 'Home',
    tabs: [
        {
            name: 'Content',
            fields: [
                {
                    name: 'Field 1',
                    alias: 'field1',
                    type: 'text',
                    required: true
                },
                {
                    name: 'Field 2',
                    alias: 'field2',
                    type: 'richText'
                }
            ]
        }
    ],
    createdBy: 'user',
    created: new Date(),
    edited: new Date(),
    templates: ['index']
};

const updatedValue = "testUpdate"

const updatedMock = Object.assign(mock, {name: updatedValue});

describe(testName, () => {
    it(`Should list all ${testName} at ${url} GET`, tests.getAll(url, Unit));
    
    it(`Should create a new ${testName} in ${url} POST`, tests.createNew(url, Unit, mock));

    it(`Should list a single ${testName} in ${url}<id> GET`, tests.getOneById(url, Unit, mock._id));

    it(`Should update existing ${testName} in ${url}<id> PUT`, tests.updateExisting(url, Unit, updatedMock));

    it(`Should delete existing ${testName} in ${url}<id> DELETE`, tests.deleteById(url, Unit, updatedMock._id));
});
