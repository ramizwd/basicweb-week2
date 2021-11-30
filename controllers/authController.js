'use strict';
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { insertUser } = require('../models/userModel');
const { httpError } = require('../utils/errors');
const bcrypt = require('bcryptjs');

const login = (req, res, next) => {
    // TODO: add passport authenticate
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('local params', err, user, info);
        if (err || !user) {
            next(httpError('username / password incorrect', 400));
            return;
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                next(httpError('login error', 400));
                return;
            }
            const token = jwt.sign(user, 'doaiwoaijfa');
            return res.json({ user, token });
        });
    })(req, res, next);
};

const user_post = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(`Set post validation`, errors.array());
        const err = httpError('data not valid', 400);
        next(err);
        return;
    }
    console.log('add user data', req.body);

    try {
        req.body.passwd = bcrypt.hashSync(req.body.passwd, 12);
        const user = req.body;
        user.message = `user added with id: ${await insertUser(user, next)}`;
        res.json(user);
    } catch (e) {
        console.log('user_post error', e.message);
        const err = httpError('Error registering user', 400);
        next(err);
        return;
    }
};

const logout = (req, res) => {
    req.logout();
    res.json({ message: 'logout' });
};

module.exports = {
    login,
    logout,
    user_post,
};
