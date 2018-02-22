const async = require('async');
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

const collections = [
    {
        model: Settings,
        seed: settingsSeed
    },
    {
        model: User,
        seed: usersSeed
    },
    {
        model: Translate,
        seed: translatesSeed    
    },
    {
        model: UnitField,
        seed: unitFieldsSeed    
    },
    {
        model: Unit,
        seed: unitsSeed    
    },
    {
        model: Bridges,
        seed: bridgesSeed    
    },
    {
        model: Content,
        seed: contentSeed    
    }
];


function insertCollection(collection, done) {
     collection.model.find({})
    .then(docs => {
        if (docs.length === 0) {
            return collection.model.insertMany(collection.seed);
        }
        else {
            collectionCreated = true;
        }
    })
    .then(() => {
        const collectionName = collection.model.collection.collectionName;
        console.log(collectionCreated ? `${collectionName} already created!` : `Inserted ${collectionName}`);
        done();
    })
    .catch( err => {
        console.log(err);
        process.exit(1);
        done();
    });
}

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {

    console.log("Connected! Building DB....");

    async.eachSeries(collections, (collection, done) => {
        insertCollection(collection, done);
    }, (err) => {
        console.log("DB was built!");
        process.exit(0);
    });
});
