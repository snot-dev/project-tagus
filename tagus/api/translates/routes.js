const Translate = require('./model');
const router = require('express').Router();
const messages = require('../shared').messages;

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
        res.json({success: true, message: messages.success.updated("Translates"), result});
    })
    .catch(err => {
        res.json({success: false, error: messages.error.whileUpdating("Translates")});
    })
}); 

module.exports = router;
