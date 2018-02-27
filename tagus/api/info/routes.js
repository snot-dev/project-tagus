const User = require('../users').model;
const router = require('express').Router();

router.get('/', (req, res) => {
    User.find({})
    .then(docs => {
        res.json(docs.length === 0);
    });
});

module.exports = router;