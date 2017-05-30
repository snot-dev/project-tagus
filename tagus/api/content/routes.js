const Content = require('./model');
const Router = require('../router/router.js');

const content = new Router('content', Content);

content.defineRoutes();

module.exports = content;