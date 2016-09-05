var models = require('./modules/models');
var tests = require('./modules/tests');
var routes = require('./modules/routes');
var initializer = require('./modules/initializer');
var auth = require('./modules/auth');

module.exports = {
    models: models,
    tests: tests,
    routes: routes,
    initializer: initializer,
    auth: auth
};
