const Bridge = require('../bridges/model');
const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
// const mongoose = require('mongoose'); 
const SharedTests = require("../shared/tests");
const tests = new SharedTests();

const testName = "Bridges";
const url = "/tagus/api/bridges/";

// chai.use(chaiHttp);
// mongoose.Promise = require('bluebird');

const mock = {
    _id: new mongoose.mongo.ObjectId('56cb91bdc3464f14678934cb'),
	name: "site",
	alias: "Site",
	createdBy: "System",
	unitType: "5a017a9e83dd7214c8661648",
	content: {
		default: {
			title: "Start Bootstrap",
			subTitle: "/"
		}
	}
};

const updatedValue = "testUpdate"

const updatedMock = Object.assign(mock, {name: updatedValue});

describe(`Test CRUD of ${testName}`, tests.CRUD(url, Bridge, {new: mock, update: {mock: updatedMock, test: "name"}}));
