const Content = require('./model');
const Router = require('../router/router2');
const routes = Router.defineCrudRoutes(Content);

console.log(routes);
module.exports = routes;