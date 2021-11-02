'use strict';

const express = require('express')
const userRouter = express.Router()
const {user_get_list, user_get, user_post} = require('../controllers/userController');

userRouter.get('/', user_get_list);

userRouter.get('/:userId', user_get);

userRouter.post('/', user_post);

userRouter.put('/', (req, res) => {
    res.send("PUT req user");
});

userRouter.delete('/', (req, res) => {
    res.send("DELETE req user");
});

module.exports = userRouter;
