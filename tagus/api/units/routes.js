var Unit = require('./model');

const Router = require('../router/router.js');

const unit = new Router('unit', Unit);

unit.defineRoutes();

module.exports = unit;
