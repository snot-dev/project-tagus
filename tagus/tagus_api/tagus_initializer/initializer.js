var router = require('express').Router();
var open = require('open');
var mongoose = require('mongoose');
var User = require('../tagus_users/userModel');
var _initScript = require('./initScript');

mongoose.Promise = require('bluebird');

module.exports = function(passport, initializerUrl) {
    var initialize = function(passport, initializerUrl) {
        User.find({}, function(err, docs) {
            if(err) {
                throw err;
            }

            if(!docs || docs.length === 0) {
                open(process.env.DOMAIN + initializerUrl);
            }
        });
    };

    router.get('/', function(req, res) {
        var unit;
        var contactsPage;   

        res.render('initializer');
        // TODO: uncomment this after all work is done!
        User.find({}, function(err, docs) {
            if(err) {
                throw err;
            }

            if(!docs || docs.length === 0) {
                _initScript();
            }
            else {
                res.redirect(process.env.DOMAIN);
            }
        })
    });

    router.post('/', passport.authenticate('signin', {
        failureRedirect: '/api/initializer'
    }), function(req, res){
        res.json(req.user);
    });
    
    return {router: router, initialize: initialize};
}




