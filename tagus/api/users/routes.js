const User = require('./model');
const router = require('../router/router');
const usersRouter = require('express').Router()

usersRouter.get('/authenticate', (req, res) => {
    res.json("Allo Allo!");
});

 module.exports = router.defineCRUDRoutes(User, {}, usersRouter);