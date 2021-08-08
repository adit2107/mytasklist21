const express = require('express');

const userRoutes = require('./user');
const todoRoutes = require('./todo')

const router = express.Router();

router.use('/user', userRoutes);
router.use('/', todoRoutes);

module.exports = router;