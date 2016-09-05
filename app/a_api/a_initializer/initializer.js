var router = require('express').Router();
var users = require('../a_users/usersInitializer');
var userModel = require('../a_users/userModel');
var unitFields = require('../a_unitFields/unitFieldsInitializer');
var unitFieldModel = require('../a_unitFields/unitFieldModel');
var units = require('../a_units/unitInitializer');
var unitModel = require('../a_units/unitModel');
var pages = require('../a_pages/pageInitializer');
var pageModel = require('../a_pages/pageModel');
var translates = require('../a_translates/translatesInitializer');
var translateModel = require('../a_translates/translateModel');
var settings = require('../a_settings/settingsInitializer');
var settingsModel = require('../a_settings/settingsModel');
var initializer = require('../../a_lib/lib').initializer;

router.get('/users', function(req, res, next) {
    initializer.initialize(userModel, users, res);
});

router.get('/unitFields', function(req,res, next) {
    initializer.initialize(unitFieldModel, unitFields, res);
});

router.get('/units', function(req, res, next) {
    initializer.initialize(unitModel, units, res);
});

router.get('/pages', function(req, res, next) {
    initializer.initialize(pageModel, pages, res);
});

router.get('/translates', function(req, res, next) {
    initializer.initialize(translateModel, translates, res);
});

router.get('/settings', function(req, res, next) {
    initializer.initialize(settingsModel, settings, res);
});

module.exports = router;
