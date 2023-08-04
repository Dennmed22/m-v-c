const userRoutes = require('./user-routes.js');
const recordRoutes = require('./record-routes');
const commentRoutes = require('./comment-routes');
const router = require('express').Router();


router.use('/user', userRoutes);
router.use('/record', recordRoutes);
router.use('/comment', commentRoutes);

module.exports = router;