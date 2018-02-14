const Bridge = require('./model');
const S = require('string');
const router = require('../router/router');

const convertToAlias = name => {
    return S(name).slugify().camelize().s;
};

module.exports = router.defineCRUDRoutes(Bridge, {
    postOne: (req, res) => {
        const newBridge = new Bridge(req.body);
        newBridge.content = {
            default: {}
         };
         
         newBridge.markModified('content');
                    
        if(newBridge.name) {
            newBridge.alias = convertToAlias(newBridge.name);
        }
        
        // TODO: Change this
        newBridge.createdBy = 'Admin';

        Bridge.findOne({'alias': newBridge.alias})
        .then( doc => {
            if (doc && doc._id !== req.params.id) {
                res.json({message: "warning", result: newBridge.alias})
            } 
            else {
                newBridge.save()
                .then(result => {
                    res.json({ message: "Document successfully created!", result });
                })
                .catch(err =>{
                    res.json(err);
                });
            }
        })
    }
});
