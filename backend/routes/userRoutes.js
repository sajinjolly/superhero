// routes/userRoutes.js
const express = require('express');
const { changePassword } = require('../controllers/userController');

const router = express.Router();

router.put('/change-password', changePassword);

module.exports = router;
