const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const translateSchema = new mongoose.Schema({
    translates: {type: mongoose.Schema.Types.Mixed, default: {}},
}, {minimize: false});

module.exports = mongoose.model('Translate', translateSchema);
