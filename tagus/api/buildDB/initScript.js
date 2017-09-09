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
require('../../../config');

mongoose.Promise = require('bluebird');

var collectionCreated = false;

console.log("Connecting to " + process.env.MONGO_CONNECTION_STRING)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(function(){

    console.log("Connected! Building DB....");

    Settings.find({}).then(function(settings){
        if( settings.length === 0) {
            Settings.collection.insert(settingsSeed)
        }
        else {
            collectionCreated = true;
        }
    })
    .then(function(){
        console.log(collectionCreated ? 'Settings already created!': 'Inserted Settings!' );
        collectionCreated = false;
        return Translate.find({});
    })
    .then(function(translates) {
        if(translates.length === 0) {
            Translate.collection.insert(translatesSeed);
        } 
        else {
            collectionCreated = true;
        }
    })
    .then(function(){
        console.log(collectionCreated ? 'Translates already created!' : 'Inserted Translates!');
        collectionCreated = false;
        return UnitField.find({});
    })
    .then(function(unitFields){
        if(unitFields.length === 0) {
            UnitField.collection.insert(unitFieldsSeed);
        } else {
            collectionCreated = true;
        }
    })
    .then(function(){
        console.log(collectionCreated ? 'UnitFields already created!' : 'Inserted UnitFields!!');
        collectionCreated = false;
        return Unit.find({});
    })
    .then(function(units) {
        if(units.length ===0) {
            Unit.collection.insert(unitsSeed);
        } 
        else {
            collectionCreated = true;
        }
    })
    .then(function() {
        console.log(collectionCreated ? 'Units already created!' : 'Inserted Units!');
        collectionCreated = false;
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
        else {
            collectionCreated = true;
        }
    })
    .then(function(index){
        console.log(collectionCreated ? 'Home Page already created' : 'Created Home page!');
        collectionCreated = false;
        if(index) {
            var contentToSave = [];
            var content;
            

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
        else {
            collectionCreated = true;
        }
    })
    .then(function(){
        console.log(collectionCreated ? 'Contacts and About content already created!' : 'Created Contacts and About content!');
        collectionCreated = false;
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
        else {
            collectionCreated = true;
        }
    })
    .then(function(emails) {
        console.log(collectionCreated ? 'Emails page already created!' : 'Created Emails page!');
        collectionCreated = false;
        console.log("DB was built!");
        process.exit(0);
    })
    .catch(function(err) {
        console.log(err);
        process.exit(1);
    });
});
