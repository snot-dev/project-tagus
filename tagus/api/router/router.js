'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

class Router {
    constructor(name, model) {
        this._error = null;

        if(typeof name !== 'string' && !name && !model) {
            this._error = 'You must pass a valid name and model!';
        }

        this._name = name;

        this._routeName = '/' + name;
        
        this._routes = {
            getAll: (req, res) => {
                if(this._error) {
                    this._printError(res);
                }
                else {
                    // model.find({}).then((err, items) => {
                    //     res.json(err || items);
                    // }); 

                    res.json('HEllo from the api!');
                }
            }
        };

        this._router = router;
    }

    getRouter() {
        return this._router;
    }

    getRouteName() {
        return this._routeName;
    }

    getName() {
        return this._name;
    }

    setRouteName(routeName) {
        this._routeName = routeName;
    }

    defineRoutes() {
        this._router.get('/', this._routes.getAll);
    }

    _printError(res) {
        res.json(this._error);
    }
}

module.exports = Router;