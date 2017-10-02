module.exports = {
        defineCRUDRoutes: (model, routes = {}) => {
            let router = require('express').Router();

            try {
                if(!model) {
                    throw 'You must pass a valid model!';
                }
            }
            catch(err) {
                console.log(err);
                return 0;
            }

            router.get('/', (req, res)=> {
                if(routes.getAll) {
                    routes.getAll(req, res);
                }
                else {
                    model.find({})
                    .then( (err, items) => {
                        res.json(err || items);
                    });
                }
            });

            router.get('/:id', (req, res)=> {
                if(routes.getById) {
                    routes.getById(req, res);
                }
                else {
                    model.findOne({'_id': req.params.id})
                    .then((err, item) => {
                        res.json(err || item);
                    });
                }
            });

            return router;
        }  
};