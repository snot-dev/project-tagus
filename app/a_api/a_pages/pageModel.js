var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    url: {type: String, required: true},
    createdBy: {type: String, required: true},
    created: {type: Date, default: Date.now()},
    edited: Date,
    published: {type: Date, default: Date.now()},
    unitType: {
        name: String,
        unitFields: { type : Array , "default" : [] }
    },
    template: {type: String, required: true},
    child: Number,
    parent: Number
});

module.exports = mongoose.model('Page', pageSchema);
