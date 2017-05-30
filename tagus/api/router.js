const router = require('express').Router();
const content = require('./content/routes');
const units = require('./units/routes');

router.use(content.getRouteName(), content.getRouter());
router.use(units.getRouteName(), units.getRouter());

module.exports = router;