const mongoose = require('mongoose');
const usersSeed = require('../users/data');
const User = require('../users/model');
const unitFieldsSeed = require('../unitFields/data');
const UnitField = require('../unitFields/model');
const unitsSeed = require('../units/data');
const Unit = require('../units/model');
const translatesSeed = require('../translates/data');
const Translate = require('../translates/model');
const settingsSeed = require('../settings/data');
const Settings = require('../settings/model');
const contentSeed = require('../content/data');
const Content = require('../content/model');
require('../../../config');

mongoose.Promise = require('bluebird');

let collectionCreated = false;

console.log("Connecting to " + process.env.MONGO_CONNECTION_STRING)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {

    console.log("Connected! Building DB....");

    Settings.find({}).then(settings => {
        if( settings.length === 0) {
            Settings.collection.insert(settingsSeed)
        }
        else {
            collectionCreated = true;
        }
    })
    .then(() => {
        console.log(collectionCreated ? 'Settings already created!': 'Inserted Settings!' );
        collectionCreated = false;
        return Translate.find({});
    })
    .then(translates => {
        if(translates.length === 0) {
            Translate.collection.insert(translatesSeed);
        } 
        else {
            collectionCreated = true;
        }
    })
    .then(() => {
        console.log(collectionCreated ? 'Translates already created!' : 'Inserted Translates!');
        collectionCreated = false;
        return UnitField.find({});
    })
    .then(unitFields => {
        if(unitFields.length === 0) {
            UnitField.collection.insert(unitFieldsSeed);
        } else {
            collectionCreated = true;
        }
    })
    .then(() => {
        console.log(collectionCreated ? 'UnitFields already created!' : 'Inserted UnitFields!!');
        collectionCreated = false;
        return Unit.find({});
    })
    .then(units => {
        if(units.length ===0) {
            Unit.collection.insert(unitsSeed);
        } 
        else {
            collectionCreated = true;
        }
    })
    .then(() => {
        console.log(collectionCreated ? 'Units already created!' : 'Inserted Units!');
        collectionCreated = false;
        return Unit.find({});
    })
    .then(dbUnits => {
        unit = dbUnits[0];

        return Content.find({});
    })
    .then(content => {
        if(content.length === 0){
            let index;

            for(let i = 0; i < contentSeed.length; i++) {
                if(contentSeed[i].url === '/'){
                    index = contentSeed[i];
                    break;
                }
            }

            index.unitType = unit._id.toString();

            const content = new Content(index);

            return content.save();
        }
        else {
            collectionCreated = true;
        }
    })
    .then(index => {
        console.log(collectionCreated ? 'Home Page already created' : 'Created Home page!');
        collectionCreated = false;
        if(index) {
            let contentToSave = [];
            let content;
            

            for(let i = 0; i < contentSeed.length; i++) {
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
    .then(() => {
        console.log(collectionCreated ? 'Contacts and About content already created!' : 'Created Contacts and About content!');
        collectionCreated = false;
        return Content.findOne({name: 'Contacts'});
    })
    .then(contacts => {
        if(contacts) {
            Content.findOne({name: 'Emails'}, (err, doc) => {
                if(!doc) {
                    return contacts
                }
            })
        }
    })
    .then(contacts => {
        if(contacts) {
            let emails;
            contactsContent = contacts;

            for(let i = 0; i < contentSeed.length; i++){
                if(contentSeed[i].name === 'Emails') {
                    emails = contentSeed[i];

                break;
                }
            }

            emails.parent = contactsContent._id.toString();
            emails.unitType = unit._id.toString();
            const content = new Content(emails);

            return content.save();
        }
        else {
            collectionCreated = true;
        }
    })
    .then(emails => {
        console.log(collectionCreated ? 'Emails page already created!' : 'Created Emails page!');
        collectionCreated = false;
        console.log("DB was built!");
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
});
