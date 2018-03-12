const router = require('express').Router();
const jwt = require('jwt-simple');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const insertCollections = require('../buildDB/dbScripts').insertCollections;

module.exports = User => {
    router.post('/', (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            
            User.findOne({email}).select('+password').then(user => {
                if (user && user.validPassword(password, user.password)) {
                    const payload = {
                        id: user._id
                    };
                    
                    const token = jwt.encode(payload, process.env.AUTHSECRETORKEY);
                    
                    const clonedUser = Object.assign({}, user._doc);
                    delete clonedUser.password;

                    res.json({ 
                        success: true,
                        token,
                        user: clonedUser  
                    });
                }
                else {
                    res.json({
                        error: "Wrong Email/Password"
                    });
                }
            });
        }
        else {
            res.sendStatus(401);
        }
    });
    
    router.post('/create', (req, res) => {
        let response = {};

        User.find({})
        .then(users => {
            if (users.length === 0) {
                if (req.body.password !== req.body.confirmPassword) {
                    throw "Password don't match!";
                }

                const admin = new User(req.body);
                
                admin.password = admin.generateHash(req.body.password);
                
                return admin.save();
            } 
            else {
                throw 'Unauthorized';
            }
        })
        .then(result => {
            const user = Object.assign({}, result._doc);
            delete user.password;
            
            const payload = {
                id: user._id
            }
            
            const token = jwt.encode(payload, process.env.AUTHSECRETORKEY);

            response = { 
                success: true,
                token,
                user  
            }; 
        })
        .then(() => {
            return insertCollections();
        })
        .then(() => {
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(401);
        });
    });
    
    router.get('/', (req, res) => {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        
        if (token) {
            try {
                const user = jwt.decode(token, process.env.AUTHSECRETORKEY);
                
                User.findOne({'_id': user.id})
                .then(doc => {  
                    if (doc) {
                        res.json({
                            user: doc
                        });
                    } 
                });
            }
            catch (error) {
                res.sendStatus(401);
            }
        }
        else {
            res.sendStatus(401);
        }
    });
    
    router.get('/info', (req, res) => {
        User.findOne({})
        .then(doc => {
            res.json(!doc);
        });
    });
    
    return router;
};

