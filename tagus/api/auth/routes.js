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
                            message: "No user was found"
                        }
                    });
                }
            });
        }
        else {
            res.sendStatus(401);
        }
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

