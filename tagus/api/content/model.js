const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const contentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    alias: {type: String, required: true},
    url: { type: String, required: true },
    createdBy: { type: String, required: true },
    created: { type: Date, default: Date.now() },
    edited: Date,
    published: {type: Boolean, default: true},
    nav: {type: Boolean, default: true},
    publishedAt: { type: Date, default: Date.now() },
    unitType: {type: mongoose.Schema.Types.ObjectId, ref: 'Unit'},
    content: {},
    template: { type: String, required: true },
    partial: String,
    parent: String,
    children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Content'}],
    sortOrder: { type: Number },
    isHome: { type: Boolean, default: false }
});

let model = mongoose.model('Content', contentSchema);

model.collection.name = 'content';

module.exports = model;