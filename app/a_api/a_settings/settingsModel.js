var mongoose = require('mongoose');

var settingsSchema = new mongoose.Schema({
    lang: {type: String, default: "en-us", required: true}
});

module.exports = mongoose.model('Settings', settingsSchema);
