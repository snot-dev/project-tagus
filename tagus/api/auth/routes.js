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
                        token
                    })
                }
                else {
                    console.log("not found!");
                    res.sendStatus(401);
                }
            });
        }
        else {
            res.sendStatus(401);
        }
    });

    return router;
};

