var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    createdBy: { type: String, required: true },
    created: { type: Date, default: Date.now() },
    edited: Date,
    published: { type: Date, default: Date.now() },
    unitType: {
        id: String
    },
    content: {},
    template: { type: String, required: true },
    parent: String,
    sortOrder: { type: Number },
    isHome: { type: Boolean, default: false }
});

module.exports = mongoose.model('Page', pageSchema);