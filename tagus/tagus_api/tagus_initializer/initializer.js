var router = require('express').Router();
var usersSeed = require('../tagus_users/usersInitializer');
var User = require('../tagus_users/userModel');
var unitFieldsSeed = require('../tagus_unitFields/unitFieldsInitializer');
var UnitField = require('../tagus_unitFields/unitFieldModel');
var unitsSeed = require('../tagus_units/unitInitializer');
var Unit = require('../tagus_units/unitModel');
var pagesSeed = require('../tagus_pages/pageInitializer');
var Pages = require('../tagus_pages/pageModel');
var translatesSeed = require('../tagus_translates/translatesInitializer');
var Translate = require('../tagus_translates/translateModel');
var settingsSeed = require('../tagus_settings/settingsInitializer');
var Settings = require('../tagus_settings/settingsModel');
var initializer = require('../../tagus_lib/lib').initializer;
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

router.get('/', function(req, res) {
    var units;

    res.render('initializer');

    Settings.find({})
    .then(function(settings){
        if(settings.length === 0) {
            Settings.collection.insert(settingsSeed);
        }
    })
    .then(function(){
        console.log('Settings inserted!');
        return Translate.find({});
    })
    .then(function(translates) {
        if(translates.length === 0) {
            Translate.collection.insert(translatesSeed);
        }
    })
    .then(function(){
        console.log("Translates inserted!");
        return UnitField.find({});
    })
    .then(function(unitFields){
        if(unitFields.length === 0) {
            UnitField.collection.insert(unitFieldsSeed);
        }
    })
    .then(function(){
        console.log("UnitFields inserted!!")
        return Unit.find({});
    })
    .then(function(units) {
        if(units.length ===0) {
            Unit.collection.insert(unitsSeed);
        }
    })
    .then(function() {
        console.log("Units inserted!");
        return Unit.find({});
    })
    .then(function(dbUnits){
        units = dbUnits
    });



});

module.exports =  router;
