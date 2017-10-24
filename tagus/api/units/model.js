const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const unitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    tabs: { type : Array , default : [] },
    createdBy: String,
    created: {type:Date, default: Date.now()},
    edited: {type:Date, default: Date.now()},
    templates: {type: Array, default: [], required: true},
    masterTemplate: String,
});

module.exports = mongoose.model('Unit', unitSchema);
