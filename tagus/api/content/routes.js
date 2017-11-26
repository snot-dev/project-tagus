const Content = require('./model');
const S = require('string');
//const router = require('../router/router');
const router = require('express').Router();

const convertToAlias = name => {
    return S(name).slugify().camelize().s;
};

router.get('/', (req, res) => {
    Content.find({})
    .populate('children')
    .exec((err,docs) => {
        res.json(err || docs);
    });  
});


router.post('/', (req, res) => {
    let newContent = new Content(req.body);
  
    console.log("here");
    console.log(req.body);
    if(newContent.name) {
        newContent.alias = convertToAlias(newContent.name);
    }

    newContent.save()
    .then(result => {
        newContent = result;
        return Content.findOne({'_id': newContent.parent})
    })
    .then( parent => {
        if(!parent.children.includes(newContent._id)) {
            parent.children.push(newContent._id);
            
            return parent.save();
        }
    })
    .then( () => {
        res.json({ message: "Document successfully created!", result: newContent });
    });
});

router.get('/:id', (req, res) => {
    Content.findOne({'_id': req.params.id})
    .then( result => {
        res.json( result );
    });
});

router.put('/:id', (req, res) => {
    //TODO: Assign to a new Parent
    Content.findOne({'_id': req.params.id})
    .then(result => {
        const updatedContent = Object.assign(result, req.body);

        if(updatedContent.name) {
            newContent.alias = convertToAlias(newContent.name);
        }
        console.log("1");
        return newContent.save();
    })
    .then(result =>{
        console.log("2");
        res.json({message: "Document updated!", result});
    })
    .catch( err => {
        res.json(err);
    });

    router.delete('/:id', (req, res)=>{
        //TODO: Remove all children
        let resultMessage;
        console.log("delete");
        Content.remove({_id : req.params.id}) 
        .then( result => {
            resultMessage = result;
            return Content.findOne({'_id': req.body.parent});
            
        })
        .then( parent => {
            const indexOfChildren = parent.children.indexOf(req.body._id);
            
            if(indexOfChildren > -1) {
                parent.children.splice(indexOfChildren, 0);
                return parent.save();
            }
        })
        .then( () => {
            res.json(err || { message: "Document successfully deleted!", result });
        });
    });
});

module.exports = router;