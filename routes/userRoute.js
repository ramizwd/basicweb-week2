'use strict';

const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const userRouter = express.Router();
const {
    user_get_list,
    user_get,
    user_post,
    user_delete,
    user_update,
    checkToken,
} = require('../controllers/userController');

userRouter.get('/token', checkToken);

userRouter
    .route('/')
    .get(user_get_list)
    .put(user_update)
    .post(
        upload.single('user'),
        body('name').isLength({ min: 3 }),
        body('email').isEmail(),
        body('passwd').matches('(?=.*[A-Z]).{8,}'),
        user_post
    );

userRouter.route('/:userId').get(user_get).delete(user_delete);

module.exports = userRouter;
