const dashRoutes = require('./dash-routes.js');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const router = require('express').Router();

router.use('/dash', dashRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;