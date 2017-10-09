const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const translateSchema = new mongoose.Schema({
    key: {type: String, required: true},
    langs: {type: Array, default: [], required: true}
});

module.exports = mongoose.model('Translate', translateSchema);
