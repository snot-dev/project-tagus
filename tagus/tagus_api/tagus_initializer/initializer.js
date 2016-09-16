var router = require('express').Router();
var users = require('../tagus_users/usersInitializer');
var userModel = require('../tagus_users/userModel');
var unitFields = require('../tagus_unitFields/unitFieldsInitializer');
var unitFieldModel = require('../tagus_unitFields/unitFieldModel');
var units = require('../tagus_units/unitInitializer');
var unitModel = require('../tagus_units/unitModel');
var pages = require('../tagus_pages/pageInitializer');
var pageModel = require('../tagus_pages/pageModel');
var translates = require('../tagus_translates/translatesInitializer');
var translateModel = require('../tagus_translates/translateModel');
var settings = require('../tagus_settings/settingsInitializer');
var settingsModel = require('../tagus_settings/settingsModel');
var initializer = require('../../tagus_lib/lib').initializer;

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
