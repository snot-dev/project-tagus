const router = require('express').Router();
const content = require('./content/routes');
const units = require('./units/routes');
const unitFields = require('./unitFields/routes');
const users = require('./users/routes');
const translates = require('./translates/routes');
const settings = require('./settings/routes');
const User = require('./users/model');
const auth = require('./auth/index');
const bridges = require('./bridges').routes;

const routes = (strategy) => {
    let protectMiddleware = (req, res, next) => {
        next();
    };


    if(strategy && auth.passport.strategies[strategy]) {
        const session = {session: false};

        auth.passport.strategies[strategy](User);

        protectMiddleware =  auth.passport.authenticate(strategy, session)
    }
    
    router.use('/content', protectMiddleware, content);
    router.use('/bridges', protectMiddleware, bridges);
    router.use('/units', protectMiddleware, units);
    router.use('/unitfields', protectMiddleware, unitFields);
    router.use('/users', protectMiddleware, users);
    router.use('/translates', protectMiddleware, translates);
    router.use('/settings', protectMiddleware, settings);
    router.use('/authenticate', auth.routes(User));

    return router;
};


module.exports = routes;    