const router = require("express").Router();
const { User, Thought } = require('../../models');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);


module.exports = router;