var mongoose = require('mongoose');

var unitFieldSchema = new mongoose.Schema({
    name: {type: String, required: true },
    type: {type: String, required: true },
    createdBy: String,
    created: {type:Date, default: Date.now()},
    edited: Date
});

module.exports = mongoose.model('UnitField', unitFieldSchema);
