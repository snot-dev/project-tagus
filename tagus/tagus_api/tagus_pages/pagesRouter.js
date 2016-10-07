var PageModel = require('./pageModel');
var lib = require('../../tagus_lib/lib');

module.exports = lib.routes.registerRoutes(PageModel, {
    get: function(req, res) {
        var selectedFields = req.query.contenttree === "true" ?
            'name parent isHome' : ''; 

        PageModel.find({}, selectedFields ,function(err, result) {
            res.json(err || result);
        });
    }
});
