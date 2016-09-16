var Settings = require('./settingsModel');
var lib = require('../../tagus_lib/lib');
var requiredFields = lib.models(Settings).getRequiredFields();
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../app');
