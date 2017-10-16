const router = require('express').Router();
const jwt = require('jwt-simple');

module.exports = User => {
    router.post('/', (req, res) => {
        console.log("here");
        console.log(req.body);
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            
            User.findOne({email, password}).then(user => {
                console.log("here we are");
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

