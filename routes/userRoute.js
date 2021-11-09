'use strict';

const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const userRouter = express.Router();
const {user_get_list, user_get, user_post, user_delete, user_update} = require('../controllers/userController');


userRouter.route('/')
    .get(user_get_list)
    .post(upload.single('user'), 
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('passwd').matches('(?=.*[A-Z].{8,}'),
    user_post);
    

userRouter.route('/:userId')
    .get(user_get)
    .delete(user_delete)
    .put(user_update);

module.exports = userRouter;
