const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const bridgeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    content: {},
    unitType: {type: String, required: true},
    createdBy: String,
    created: {type:Date, default: Date.now()},
    edited: {type:Date, default: Date.now()}
});

module.exports = mongoose.model('Bridge', bridgeSchema);
