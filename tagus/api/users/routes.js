const User = require('./model');
const router = require('../router/router');
const messages = require('../shared').messages;

 const userRouter =  router.defineCRUDRoutes(User, {
     alt: [
        {
            method: 'put',
            path: '/:id/update_password',
            func: (req, res) => {
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
                    else if (!doc.validPassword(req.body.oldPassword, doc.password)) {
                        throw "Password is incorrect";
                    }
                    else {
                        doc.password = doc.generateHash(req.body.newPassword);
                        return doc.save()
                    }
                })
                .then(result => {
                    const user = Object.assign({}, result._doc);
                    delete user.password;
                    res.json({success: true, message: messages.success.updated("Password"), result: user});
                })
                .catch(error => {
                    res.json({success: false, error: true, message:error});
                });
            }
        }   
    ]
});

module.exports = userRouter;