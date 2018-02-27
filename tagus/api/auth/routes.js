const router = require('express').Router();
const jwt = require('jwt-simple');
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = User => {
    router.post('/', (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            
            User.findOne({email, password}).then(user => {
                if (user) {
                    const payload = {
                        id: user._id
                    }

                    const token = jwt.encode(payload, process.env.AUTHSECRETORKEY);
                        
                    res.json({ 
                        success: true,
                        token,
                        user: user  
                    })
                }
                else {
                    res.json({
                        error: {
                            message: "Wrong Email/Password"
                        }
                    });
                }
            });
        }
        else {
            res.sendStatus(401);
        }
    });

    router.post('/create', (req, res) => {
        User.find({})
        .then(users => {
            if(users.length === 0) {
                const user = new User(req.body);

                //TODO: encrypt password

                return user.save();
            } 
            else {
                throw 'Unauthorized';
            }
        })
        .then(result => {
            res.json({});
        })
        .catch(error => {
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

    return router;
};

