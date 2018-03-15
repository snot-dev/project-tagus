var Unit = require('./model');
const router = require('../router/router');
const helpers = require('../shared').helpers;
const messages = require('../shared').messages;

module.exports = router.defineCRUDRoutes(Unit, {
    postOne: (req, res) => {
        const unit = {
            name: req.body.name,
            alias: helpers.convertToAlias(req.body.name),
            tabs: [
                {
                    name: 'Default',
                    alias: 'default',
                    fields: []
                }
            ],
            templates: [],
            createdBy: req.body.createdBy
        };

        const newUnit = new Unit(unit);

        
        Unit.findOne({'alias': unit.alias})
        .then( doc => {
            if(doc && doc._id != req.params.id) {
                res.json({success:false, warning: true, message: messages.warning.alreadyExists(unit.alias)})
            } 
            else {
                newUnit.save()
                .then(result => {
                    res.json({success: true, message: messages.success.created(result.alias), result});
                })
                .catch(err => {
                    console.warn(err);
                    res.json({success: false, error: true, message: messages.error.whileCreating(unit.alias)});
                });
            }
        })
        .catch(err => {
            res.json({success: false, error: true, message: messages.error.whileCreating(unit.alias)});
        });
    }
});
