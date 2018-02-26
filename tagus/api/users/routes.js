const User = require('./model');
const router = require('../router/router');

 const userRouter =  router.defineCRUDRoutes(User, {alt: [{
     method: 'get',
     path: '/test',
     func: (req, res) => {
         res.json("test");
     }
 }]});

module.exports = userRouter;