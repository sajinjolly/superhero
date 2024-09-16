// auth.routes.js
const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// POST request to register a new user
router.post('/signup', signup);

// POST request for user login
router.post('/login', login);

module.exports = router;
