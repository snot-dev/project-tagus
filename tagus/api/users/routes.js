const User = require('./model');
const router = require('../router/router');
const messages = require('../shared').messages;
const mailer = require('../shared/mailer');

 const userRouter =  router.defineCRUDRoutes(User, {
     postOne: (req, res) => {
        const newUser = new User(req.body);

        if (!newUser.email) {
            throw 'No email';
        }

        //TODO: Generate random pass
        newUser.password = newUser.generateHash('123456');

        newUser.created = new Date();
        newUser.isAdmin = false;

        newUser.save()
        .then(result => {
            saveResult = result;

            return mailer.verifyEmail(newUser.email, newUser.password);
        })
        .then (()=>{
            res.json({ success: true, message: messages.success.created('Document'), result:saveResult});

        })
        .catch(err =>{
            res.json({success: false, error: messages.error.whileCreating('Document')});
        });
     },
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