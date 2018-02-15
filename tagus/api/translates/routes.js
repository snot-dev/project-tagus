const Translate = require('./model');
const router = require('express').Router();

router.get('/', (req, res) => {
    Translate.findOne()
    .then(doc => {
        res.json(doc);
    });
});

router.post('/', (req, res) => {
    Translate.findOne()
    .then(doc => {
        doc.translates = req.body;

        return doc.save();
    })
    .then( result => {
        res.json({message: "Document updated!", result});
    })
    .catch(err => {
        res.json(err);
    })
}); 

module.exports = router;
