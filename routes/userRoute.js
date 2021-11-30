'use strict';

const express = require('express');

const userRouter = express.Router();
const {
    user_get_list,
    user_get,
    user_delete,
    user_update,
    checkToken,
} = require('../controllers/userController');

userRouter.get('/token', checkToken);

userRouter.route('/').get(user_get_list).put(user_update);

userRouter.route('/:userId').get(user_get).delete(user_delete);

module.exports = userRouter;
