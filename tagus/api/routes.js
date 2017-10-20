const router = require('express').Router();
const content = require('./content/routes');
const units = require('./units/routes');
const unitFields = require('./unitFields/routes');
const users = require('./users/routes');
const translates = require('./translates/routes');
const settings = require('./settings/routes');
const User = require('./users/model');
const auth = require('./auth/index');

const strategy  = 'jwt';
const session = {session: false};
auth.passport.strategies.jwt(User);

router.use('/content', content);
router.use('/units', auth.passport.authenticate(strategy, session), units);
router.use('/unitfields', unitFields);
router.use('/users', users);
router.use('/translates', translates);
router.use('/settings', settings);
router.use('/authenticate', auth.routes(User));

module.exports = router;    