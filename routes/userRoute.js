'use strict';

const express = require('express')
const userRouter = express.Router()
const {user_get_list, user_get} = require('../controllers/userController');

userRouter.get('/', user_get_list);
userRouter.get('/:userId', user_get);


module.exports = userRouter;
