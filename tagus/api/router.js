const router = require('express').Router();
const content = require('./content/routes');
const units = require('./units/routes');

router.use('/content', content);
//router.use(units.getRouteName(), units.getRouter());

router.use('/units', units);

module.exports = router;