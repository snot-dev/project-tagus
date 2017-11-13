const mongoose = require('mongoose');
const S = require('string');
mongoose.Promise = require('bluebird');

const convertToAlias = name => {
    return S(name).slugify().camelize().s;
};

module.exports = {
        defineCRUDRoutes: (model, routes = {}, router = require('express').Router()) => {
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
                    .then(items => {
                        res.json(items);
                    })
                    .catch(err => {
                        res.json(err);
                    });
                }
            });

            router.post('/', (req, res)=> {
                if(routes.postOne) {
                    routes.postOne(req, res);
                } 
                else {
                    console.log(req.body);
                    const newModel = new model(req.body);
                    
                    if(newModel.name) {
                        newModel.alias = convertToAlias(newModel.name);
                    }

                    newModel.save()
                    .then(result => {
                        res.json({ message: "Document successfully created!", result });
                    })
                    .catch(err =>{
                        res.json(err);
                    });
                }
            });

            router.get('/:id', (req, res)=> {
                if(routes.getById) {
                    routes.getById(req, res);
                }
                else {
                    model.findOne({'_id': req.params.id})
                    .then(item => {
                        res.json(item);
                    })
                    .catch(err => {
                        res.json(err);
                    });
                }
            });

            router.put('/:id', (req, res)=> {
                if(routes.updateById) {
                    routes.updateById(req, res);
                }
                else {
                    
                    model.findOne({'_id': req.params.id})
                    .then(doc => {
                        const updatedDoc = Object.assign(doc, req.body);
                        
                        if(updatedDoc.name) {
                            updatedDoc.alias = convertToAlias(updatedDoc.name);
                        }

                        return updatedDoc.save();
                    })
                    .then(result =>{
                        res.json({message: "Document updated!", result});
                    })
                    .catch( err => {
                        res.json(err);
                    })
                }
            });

            router.delete('/:id', (req, res)=>{
                if(routes.deleteById) {
                    routes.deleteById(req, res);
                }
                else {
                    model.remove({_id : req.params.id}, (err, result) => {
                        res.json(err || { message: "Document successfully deleted!", result });
                    });
                }
            });

            return router;
        }  
};