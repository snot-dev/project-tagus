const router = require('express').Router();
const jwt = require('jwt-simple');

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
                        success: {
                            token,
                            user: user  
                        }
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

    return router;
};

