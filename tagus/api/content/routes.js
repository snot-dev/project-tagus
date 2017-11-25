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

router.post('/', (req, res) => {
    let newContent = new Content(req.body);
    
    newContent.save()
    .then(result => {
        newContent = result;
        return Content.findOne({'_id': newContent.parent})
    })
    .then( parent => {
        if(!parent.children.includes(newContent._id)) {
            parent.push(newContent._id);
            
            return parent.save();
        }
    })
    .then( () => {
        res.json({ message: "Document successfully created!", result: newContent });
    })
});

module.exports = router;