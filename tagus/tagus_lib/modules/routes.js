var registerRoutes = function(Model, options) {
    var router = require('express').Router();

    router.get('/', function(req, res) {
        if(options && options.get) {
            options.get(req, res);
        }
        else {
            Model.find({}, function(err, result) {
                res.json(err || result);
            });
        }
    });

    router.post('/', function(req, res) {
        if(options && options.post){
            options.post(req, res);
        }
        else {
            var newModel = new Model(req.body);


            newModel.save(function(err, result) {
                res.json(err || result);
            });
        }
    });

    router.get('/:id', function(req, res, next) {
        if(options && options.getId) {
            options.getId(req, res);
        }
        else {
            Model.findOne({'_id': req.params.id}, function(err, result) {
                res.json(err || result);
            });
        }
    });

    router.post('/:id', function(req, res, next) {
        if(options && options.postId) {
            options.postId(req, res);
        }
        else {
            Model.findOne({'_id': req.params.id}, function(err, result) {
                if(err) {
                    res.json(err);
                }
                else{
                    for(var key in req.body) {
                        if(result[key] !== req.body[key]) {
                            result[key] = req.body[key];
                        }
                    }

                    result.save(function(err, doc) {
                        res.json(err || doc);
                    });
                }
            });
        }
    });

    router.delete('/:id', function(req, res) {
        if(options && options.delete) {
            options.delete(req, res);
        }
        else {
            Model.findOneAndRemove({'_id': req.params.id}, function(err, result) {
                res.json(err || result);
            });
        }
    });


    return router;
};

module.exports = {
    registerRoutes: registerRoutes
};
