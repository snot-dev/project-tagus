const mongoose = require('mongoose');
const usersSeed = require('../users/data');
const User = require('../users').model;
const unitFieldsSeed = require('../unitFields/data');
const UnitField = require('../unitFields').model;
const unitsSeed = require('../units/data');
const Unit = require('../units').model;
const translatesSeed = require('../translates/data');
const Translate = require('../translates').model;
const settingsSeed = require('../settings/data');
const Settings = require('../settings').model;
const bridgesSeed = require('../bridges/data');
const Bridges = require('../bridges').model;
const contentSeed = require('../content/data');
const Content = require('../content').model;
require('../../../config');

mongoose.Promise = require('bluebird');

let collectionCreated = false;

console.log("Connecting to " + process.env.MONGO_CONNECTION_STRING)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {

    console.log("Connected! Building DB....");

    Settings.find({}).then(settings => {
        if( settings.length === 0) {
            return Settings.insertMany(settingsSeed)
        }
        else {
            collectionCreated = true;
        }
    })
    .then(settings => {
        console.log(collectionCreated ? 'Settings already created!': 'Inserted Settings!' );
        collectionCreated = false;
        return Translate.find({});
    })
    .then(translates => {
        if(translates.length === 0) {
            return Translate.insertMany(translatesSeed);
        } 
        else {
            collectionCreated = true;
        }
    })
    .then(translates => {
        console.log(collectionCreated ? 'Translates already created!' : 'Inserted Translates!');
        collectionCreated = false;
        return UnitField.find({});
    })
    .then(unitFields => {
        if(unitFields.length === 0) {
            return UnitField.insertMany(unitFieldsSeed);
        } else {
            collectionCreated = true;
        }
    })
    .then(unitFields => {
        console.log(collectionCreated ? 'UnitFields already created!' : 'Inserted UnitFields!!');
        collectionCreated = false;
        return Unit.find({});
    })
    .then(units => {
        if(units.length ===0) {
            return Unit.insertMany(unitsSeed);
        } 
        else {
            collectionCreated = true;
            return units;
        }
    })
    .then(units => {
        console.log(collectionCreated ? 'Units already created!' : 'Inserted Units!');
        collectionCreated = false;
        return Bridges.find({});
    })
    .then( bridges => {
        if(bridges.length === 0) {
            for(let i = 0; i < bridgesSeed.length; i++) {
                bridgesSeed[i].unitType = unit._id.toString();
            }

            Bridges.insertMany(bridgesSeed);
        } 
        else {
            collectionCreated = true;
        }
    })
    .then(bridges => {
        console.log(collectionCreated ? 'Bridges already created!' : 'Inserted Bridges!');
        collectionCreated = false;
        return Content.find({});
    })
    .then(content => {
        if(content.length === 0) {
            return Content.insertMany(contentSeed);
        } 
        else {
            collectionCreated = true;
            return content;
        }
    })
    .then(content => {
        console.log(collectionCreated ? 'Content already created!' : 'Inserted Content!');
        collectionCreated = false;
        console.log("DB was built!");
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
});
