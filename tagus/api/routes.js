const content = require('./content');
const units = require('./units').routes;
const unitFields = require('./unitFields').routes;
const users = require('./users').routes;
const translates = require('./translates').routes;
const bridges = require('./bridges');
const settings = require('./settings').routes;
const User = require('./users').model;
const auth = require('./auth');

const api = (strategy) => {
    const router = require('express').Router();
    let protectMiddleware = (req, res, next) => {
        next();
    };


    if(strategy && auth.passport.strategies[strategy]) {
        const session = {session: false};

        auth.passport.strategies[strategy](User);

        protectMiddleware =  auth.passport.authenticate(strategy, session)
    }
    
    router.use('/content', protectMiddleware, content.routes);
    router.use('/bridges', protectMiddleware, bridges.routes);
    router.use('/units', protectMiddleware, units);
    router.use('/unitfields', protectMiddleware, unitFields);
    router.use('/users', protectMiddleware, users);
    router.use('/translates', protectMiddleware, translates);
    router.use('/settings', protectMiddleware, settings);
    router.use('/authenticate', auth.routes(User));

    return router;
};

const site = () => {
    const router = require('express').Router();
    const bridgesContent = {};

    bridges.model.find({})
    .then( docs => {
        if(docs) {
            for(let i = 0; i < docs.length; i++) {
                const bridge = docs[i];

                bridgesContent[bridge.alias] = bridge.content;
            }
        }

        return content.model.find({});
    })
    .then( docs => {
        for(let i = 0; i < docs.length; i++ ) {
            const doc = docs[i];
            const viewBag = {};

            viewBag[doc.alias] = doc.content;
            viewBag.bridges = bridgesContent;

            router.get(doc.url, (req, res) => {
                res.render(doc.template, viewBag);
            });
        }
    });

    return router;
};


module.exports = {
    api,
    site
};