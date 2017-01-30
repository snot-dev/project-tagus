var PageModel = require('./pageModel');
var lib = require('../../tagus_lib/lib');

module.exports = lib.routes.registerRoutes(PageModel, {
    get: function(req, res) {
        if(req.query.contenttree === "true") {
            PageModel.find({}, 'name parent isHome',function(err, docs) {
                if(err){
                    res.json(err);
                } 

                if(docs) {
                    var pageList = docs.map(function(doc) {
                        return doc.toObject();
                    })

                    res.json(lib.pages.loadContentTree(pageList));
                }
            });
        }
        else {
            PageModel.find({}, function(err, result) {
                res.json(err || result);
            });

        }
    }
});
