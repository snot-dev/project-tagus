var router = require('express').Router();
var open = require('open');
var mongoose = require('mongoose');
var usersSeed = require('../tagus_users/usersInitializer');
var User = require('../tagus_users/userModel');
var unitFieldsSeed = require('../tagus_unitFields/unitFieldsInitializer');
var UnitField = require('../tagus_unitFields/unitFieldModel');
var unitsSeed = require('../tagus_units/unitInitializer');
var Unit = require('../tagus_units/unitModel');
var pagesSeed = require('../tagus_pages/pageInitializer');
var Page = require('../tagus_pages/pageModel');
var translatesSeed = require('../tagus_translates/translatesInitializer');
var Translate = require('../tagus_translates/translateModel');
var settingsSeed = require('../tagus_settings/settingsInitializer');
var Settings = require('../tagus_settings/settingsModel');
var initializer = require('../../tagus_lib/lib').initializer;
var lib = require('../../tagus_lib/lib');

mongoose.Promise = require('bluebird');

var _initScript = function() {
    console.log("DB Initializer Started!");

    Settings.collection.insert(settingsSeed)
    .then(function(){
        console.log('Inserted Settings!');
        return Translate.find({});
    })
    .then(function(translates) {
        if(translates.length === 0) {
            Translate.collection.insert(translatesSeed);
        }
    })
    .then(function(){
        console.log("Inserted Translates!");
        return UnitField.find({});
    })
    .then(function(unitFields){
        if(unitFields.length === 0) {
            UnitField.collection.insert(unitFieldsSeed);
        }
    })
    .then(function(){
        console.log("Inserted UnitFields!!")
        return Unit.find({});
    })
    .then(function(units) {
        if(units.length ===0) {
            Unit.collection.insert(unitsSeed);
        }
    })
    .then(function() {
        console.log("Inserted Units!");
        return Unit.find({});
    })
    .then(function(dbUnits){
        unit = dbUnits[0];

        return Page.find({});
    })
    .then(function(pages) {
        if(pages.length === 0){
            var index;

            for(var i = 0; i < pagesSeed.length; i++) {
                if(pagesSeed[i].url === '/'){
                    index = pagesSeed[i];
                    break;
                }
            }

            index.unitType = unit._id.toString();

            var page = new Page(index);

            return page.save();
        }
    })
    .then(function(index){
        if(index) {
            var pagesToSave = [];
            var page;
            
            console.log("Saved Index!");

            for(var i = 0; i < pagesSeed.length; i++) {
                page = pagesSeed[i];
                if(page.url !== '/' && page.url !== '/contacts/emails'){
                    page.parent = index._id.toString();
                    page.unitType = unit._id.toString();    
                    pagesToSave.push(page);
                }
            }

            return Page.collection.insert(pagesToSave);
        }
    })
    .then(function(){
        console.log("Saved Contacts and About pages!");

        return Page.findOne({name: 'Contacts'});
    })
    .then(function(contacts){
        if(contacts) {
            Page.findOne({name: 'Emails'}, function(err, doc) {
                if(!doc) {
                    return contacts
                }
            })
        }
    })
    .then(function(contacts){
        if(contacts) {
            var emails;
            contactsPage = contacts;

            for(var i = 0; i < pagesSeed.length; i++){
                if(pagesSeed[i].name === 'Emails') {
                    emails = pagesSeed[i];

                break;
                }
            }

            emails.parent = contactsPage._id.toString();
            emails.unitType = unit._id.toString();
            var page = new Page(emails);

            return page.save();
        }
    })
    .then(function(emails) {
        console.log("Saved Emails page!");
        console.log("DB Initializer Finished!");
    })
    .catch(function(err) {
        console.log(err);
    });
}

module.exports = function(passport, initializerUrl) {
    var initialize = function(passport, initializerUrl) {
        User.find({}, function(err, docs) {
            if(err) {
                throw err;
            }

            if(!docs || docs.length === 0) {
                open(process.env.DOMAIN + initializerUrl);
            }
        });
    };

    router.get('/', function(req, res) {
        var unit;
        var contactsPage;   


        User.find({}, function(err, docs) {
            if(err) {
                throw err;
            }

            res.render('initializer');
            // TODO: uncomment this after all work is done!
            if(!docs || docs.length === 0) {
                // _initScript();
            }
            else {
                res.redirect(process.env.DOMAIN);
            }
        })
    });

    router.post('/', passport.authenticate('signin', {
        successRedirect: '/',
        failureRedirect: '/api/initializer'
    }));
    
    return {router, initialize};
}




