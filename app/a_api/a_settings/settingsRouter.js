var settingsModel = require('./settingsModel');
var lib = require('../../a_lib/lib');

module.exports = lib.routes.registerRoutes(settingsModel, {
    get: function(req, res) {
        settingsModel.findOne({}, function(err, result) {
            res.json(err || result);
        });
    }
});
