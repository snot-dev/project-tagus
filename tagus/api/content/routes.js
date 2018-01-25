const Content = require('./model');
const S = require('string');
//const router = require('../router/router');
const router = require('express').Router();

const convertToAlias = name => {
    return S(name).slugify().camelize().s;
};

const convertToUrl = name => {
    return S(name).slugify().s;
}

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
        if (!newContent.parent) {
            newContent.url = '/'; 
        }
        else {
            if(newContent.url === '/') {
                newContent.url = '';
            }
            newContent.url = `${newContent.url}/${convertToUrl(newContent.name)}`;
        }
    }
    
    //TODO: Change this to an actual user
    newContent.createdBy = 'User';
    newContent.created = new Date();
    
    newContent.save()
    .then(result => {
        newContent = result;
        return Content.findOne({'_id': newContent.parent})
    })
    .then( parent => {
        if(parent && !parent.children.includes(newContent._id)) {
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
});

router.delete('/:id', (req, res)=>{
    let docsArray = [req.params.id];

    Content.find({})
    .then(docs => {
        const dictionary = {};
        const docID = req.params.id;
        
        for(const doc of docs) {
            dictionary[doc._id] = doc;
        }
        
        addChildrenToArray(dictionary, docID, docsArray);

        return Content.findOne({'_id': dictionary[docID].parent})
    })
    .then( doc => {
        if(doc) {
            for(const child of docsArray) {
                const indexOfChild = doc.children.indexOf(child);
                
                if(indexOfChild > -1) {
                    doc.children.splice(indexOfChild, 1);
                }
            }            

            return doc.save();
        }
    })
    .then(() => {
        return Content.remove({'_id': {$in:docsArray}})
    })
    .then(docs => {
        res.json(docs);
    }).catch(err => {
        res.json(err);
    });

    const addChildrenToArray = (dictionary, id, arr) => {
        const children = dictionary[id].children;
        
        for(const child of children) {
            arr.push(child);
            if(dictionary[child].children) {
                addChildrenToArray(dictionary, child, arr);
            }
        }
    }
});

module.exports = router;