var lib = require('../../tagus_lib/lib');
var pageModel = require('./pageModel');
var router = require('express').Router();
var open = require('open');

pageModel.find({}, function(err, docs) {
    if (err) {
        console.log(err);
    }

    if( docs && docs.length > 0 ) {
        docs.forEach(function(doc) {
            var viewBag = doc.content;

            router.get(doc.url, function(req, res, next) {
                res.render(doc.template, viewBag);
            });
        });
    }
    else {
        open(process.env.DOMAIN + '/api/initializer');
    }
});

module.exports = router;