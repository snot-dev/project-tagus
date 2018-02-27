const content = require('./content');
const units = require('./units').routes;
const unitFields = require('./unitFields').routes;
const users = require('./users').routes;
const translates = require('./translates').routes;
const bridges = require('./bridges');
const settings = require('./settings').routes;
const User = require('./users').model;
const auth = require('./auth');
const templates = require('./templates/routes');
const info = require('./info/routes');
const Cookies = require('universal-cookie');

const api = (app, strategy) => {
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
    router.use('/templates', protectMiddleware, templates(app));
    router.use('/authenticate', auth.routes(User));
    router.use('/info', info);

    return router;
};

const site = () => {
    const router = require('express').Router();
    const bridgesContent = {};
    const fields = 'name alias url template partial content'
    
    router.get('/preview/:id', (req, res) => {
        const cookies = new Cookies(req.headers.cookie);
        const shouldPreview = cookies.get(`preview_${req.params.id}`);
        
        if (shouldPreview) {
            bridges.model.find({})
            .then( docs => {
                if(docs) {
                    for(const bridge of docs) {
                        bridgesContent[bridge.alias] = bridge.content;
                    }
                }
        
                content.model.findOne({'_id': req.params.id})
                .populate({
                    path: 'children',
                    populate: {path: 'children'}
                })
                .exec((err, result) => {
                    if(result) {
                        res.render(result.template, {viewContent: result, bridges: bridgesContent});
                    }
                    else {
                        res.json("404 - not found");
                    }
                });
            })
        }
        else {
            res.json("404 - not found");
        }
    });

    router.get('*', (req, res) => {
        bridges.model.find({})
        .then( docs => {
            if(docs) {
                for(const bridge of docs) {
                    bridgesContent[bridge.alias] = bridge.content;
                }
            }
    
            content.model.findOne({'url': req.url})
            .populate({
                path: 'children',
                populate: {path: 'children'}
            })
            .exec((err, result) => {
                if(result && result.published ) {
                    res.render(result.template, {viewContent: result, bridges: bridgesContent});
                }
                else {
                    res.json("404 - not found");
                }
            });
        })
    });

    return router;
};


module.exports = {
    api,
    site
};