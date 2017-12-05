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
    newContent.content = req.body.content;
    newContent.markModified('content');
  
    if(newContent.name) {
        newContent.alias = convertToAlias(newContent.name);
    }
    
    console.log(req.body);
    //TODO: Change this to an actual user
    newContent.createdBy = 'User';
    newContent.created = new Date();
    newContent.url = `${newContent.url}/${newContent.alias.toLowerCase()}`;
    
    //TODO: Fix this ASAP
    newContent.template = 'test';
    
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
            updatedContent.alias = convertToAlias(updatedContent.name);
        }
        return updatedContent.save();
    })
    .then(result =>{
        res.json({message: "Document updated!", result});
    })
    .catch( err => {
        res.json(err);
    });

    router.delete('/:id', (req, res)=>{
        //TODO: Remove all children
        let deletedDoc;
        Content.findOne({_id : req.params.id}) 
        .then( result => {
            return result.remove(); 
            
        })
        .then( doc => {
            deletedDoc = doc;
            return Content.findOne({'_id': deletedDoc.parent});
        })
        .then( parent => {
            const indexOfChildren = parent.children.indexOf(deletedDoc._id.toString());

            if(indexOfChildren > -1) {
                parent.children.splice(indexOfChildren, 1);
                return parent.save();
            }
        })
        .then( () => {
            res.json({ message: "Document successfully deleted!", result: deletedDoc });
        })
        .catch( err => {
            res.json(err);
        })
    });
});

module.exports = router;