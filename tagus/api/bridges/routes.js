const Bridge = require('./model');
const router = require('../router/router');

module.exports = router.defineCRUDRoutes(Bridge, {});
