const Content = require('./model');
//const router = require('../router/router');
const router = require('express').Router();

router.get('/', (req, res) => {
    Content.find({})
    .populate('children')
    .populate('unitType')
    .exec((err,docs) => {
        res.json(err || docs);
    });  
});

module.exports = router;