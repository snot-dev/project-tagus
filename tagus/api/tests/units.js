const Unit = require('../units').model;
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../../app');
const mongoose = require('mongoose'); 
const SharedTests = require("../shared/tests");
const tests = new SharedTests();

const testName = "Units";
const url = "/tagus/api/units/";

chai.use(chaiHttp);
mongoose.Promise = require('bluebird');

const mock = {
    _id: new mongoose.mongo.ObjectId('56cb91bdc3464f14678934cd'),
    name: "Icon",
    createdBy: "System"
};

const updatedValue = "testUpdate"

const updatedMock = Object.assign(mock, {name: updatedValue});

describe(`Test CRUD of ${testName}`, tests.CRUD(url, Unit, {new: mock, update: {mock: updatedMock, test: "name"}}));;
