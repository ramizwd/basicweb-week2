'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const userRouter = express.Router();
const {user_get_list, user_get, user_post, user_delete, user_update} = require('../controllers/userController');


userRouter.route('/')
    .get(user_get_list)
    .put(user_update)
    .post(upload.single('user'), user_post);
    
    
userRouter.route('/:userId')
    .get(user_get)
    .delete(user_delete);

module.exports = userRouter;
