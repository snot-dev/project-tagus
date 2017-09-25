var User = require('./model');
const router = require('../router/router');

module.exports = router.defineCRUDRoutes(User, {});


// module.exports = lib.routes.registerRoutes(User, {
//     post: function(req, res) {
//         var newUser = new User(req.body);
        
//         newUser.save(function(err, result) {
//             res.json(err || result);
//         });
//     }
// });
