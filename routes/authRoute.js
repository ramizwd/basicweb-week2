'use strict';
const express = require('express');
const router = express.Router();
const { login, user_post, logout } = require('../controllers/authController');
const { body } = require('express-validator');

router.post('/login', login);

router.get('/logout', logout);

router.post(
    '/register',
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('passwd').matches('(?=.*[A-Z]).{8,}'),
    user_post
);

module.exports = router;
