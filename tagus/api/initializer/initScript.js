var mongoose = require('mongoose');
var usersSeed = require('../users/usersInitializer');
var User = require('../users/userModel');
var unitFieldsSeed = require('../unitFields/unitFieldsInitializer');
var UnitField = require('../unitFields/unitFieldModel');
var unitsSeed = require('../units/data');
var Unit = require('../units/model');
var pagesSeed = require('../pages/pageInitializer');
var Page = require('../pages/pageModel');
var translatesSeed = require('../translates/translatesInitializer');
var Translate = require('../translates/translateModel');
var settingsSeed = require('../settings/settingsInitializer');
var Settings = require('../settings/settingsModel');
var Content = require('../content/model');
var contentSeed = require('../content/data');

mongoose.Promise = require('bluebird');

//module.exports = function() {
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

        return Content.find({});
    })
    .then(function(content) {
        if(content.length === 0){
            var index;

            for(var i = 0; i < contentSeed.length; i++) {
                if(contentSeed[i].url === '/'){
                    index = contentSeed[i];
                    break;
                }
            }

            index.unitType = unit._id.toString();

            var content = new Content(index);

            return content.save();
        }
    })
    .then(function(index){
        if(index) {
            var contentToSave = [];
            var content;
            
            console.log("Saved Index!");

            for(var i = 0; i < contentSeed.length; i++) {
                content = contentSeed[i];
                if(content.url !== '/' && content.url !== '/contacts/emails'){
                    content.parent = index._id.toString();
                    content.unitType = unit._id.toString();    
                    contentToSave.push(content);
                }
            }

            return Content.collection.insert(contentToSave);
        }
    })
    .then(function(){
        console.log("Saved Contacts and About content!");

        return Content.findOne({name: 'Contacts'});
    })
    .then(function(contacts){
        if(contacts) {
            Content.findOne({name: 'Emails'}, function(err, doc) {
                if(!doc) {
                    return contacts
                }
            })
        }
    })
    .then(function(contacts){
        if(contacts) {
            var emails;
            contactsContent = contacts;

            for(var i = 0; i < contentSeed.length; i++){
                if(contentSeed[i].name === 'Emails') {
                    emails = contentSeed[i];

                break;
                }
            }

            emails.parent = contactsContent._id.toString();
            emails.unitType = unit._id.toString();
            var content = new Content(emails);

            return content.save();
        }
    })
    .then(function(emails) {
        console.log("Saved Emails page!");
        console.log("DB Initializer Finished!");
    })
    .catch(function(err) {
        console.log(err);
    });
//}