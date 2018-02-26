const User = require('./model');
const router = require('../router/router');

 const userRouter =  router.defineCRUDRoutes(User, {
     alt: [
        {
            method: 'put',
            path: '/:id/update_password',
            func: (req, res) => {
                //TODO: Use only encrypted data after registering users!
                User.findOne({'_id': req.params.id}).select('+password')
                .then(doc => {
                    if (!req.body.oldPassword || !req.body.newPassword || !req.body.confirmPassword ) {
                        throw "You must send all required fields";
                    }
                    else if (req.body.oldPassword === req.body.newPassword) {
                        throw "The new password can't be the same as the old";
                    } 
                    else if (req.body.newPassword.length <= 4) {
                        throw "Password must have more ther 4 characters";
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