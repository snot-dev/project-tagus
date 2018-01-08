var Unit = require('./model');
const router = require('../router/router');
const S = require('string');

const convertToAlias = name => {
    return S(name).slugify().camelize().s;
};

module.exports = router.defineCRUDRoutes(Unit, {
    postOne: (req, res) => {
        const unit = {
            name: req.body.name,
            alias: convertToAlias(req.body.name),
            tabs: [
                {
                    name: 'Default',
                    alias: 'default',
                    fields: []
                }
            ],
            templates: []
        };

        const newUnit = new Unit(unit);


        newUnit.save()
        .then(result => {
            res.json({ message: "Document successfully created!", result });
        });
    }
});
