var mongoose = require('mongoose');

var settingsSchema = new mongoose.Schema({
    lang: {type: String, default: "en", required: true}
});

module.exports = mongoose.model('Settings', settingsSchema);
