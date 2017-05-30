var User = require('./userModel');
var lib = require('../../tagus_lib/lib');

module.exports = lib.routes.registerRoutes(User, {
    post: function(req, res) {
        var newUser = new User(req.body);
        
        newUser.save(function(err, result) {
            res.json(err || result);
        });
    }
});
