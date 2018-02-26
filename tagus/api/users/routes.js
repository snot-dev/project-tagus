const User = require('./model');
const router = require('../router/router');

 const userRouter =  router.defineCRUDRoutes(User, {
     alt: [
        {
            method: 'put',
            path: '/:id/update_password',
            func: (req, res) => {
                //TODO: Use only encrypted data after registering users!
                
                User.findOne({'_id': req.body._id}).select('+password')
                .then(doc => {
                    if(req.body.oldPassword === req.body.newPassword) {
                        throw "The new password can't be the same as the old"
                    } 
                    else if (req.body.oldPassword !== doc.password) {
                        throw "Password is incorrect";
                    }
                    else {
                        doc.password = req.body.newPassword;
                        return doc.save()
                    }
                })
                .then(result => {
                    res.json({message: "Document updated!", result: {name:'Password'}});
                })
                .catch(error => {
                    res.json({error});
                });
            }
        }   
    ]
});

module.exports = userRouter;