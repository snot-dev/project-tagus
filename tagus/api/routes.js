const router = require('express').Router();
const content = require('./content/routes');
const units = require('./units/routes');
const unitFields = require('./unitFields/routes');
const users = require('./users/routes');
const translates = require('./translates/routes');
const settings = require('./settings/routes');

router.use('/content', content);
router.use('/units', units);
router.use('/unitfields', unitFields);
router.use('/users', users);
router.use('/translates', translates);
router.use('/settings', settings);

module.exports = router;