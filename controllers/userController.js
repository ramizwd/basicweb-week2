'use strict';


const {users, getUser} = require('../models/userModel');

const user_get_list = (req, res) => {
    users.forEach((user) => {
        delete user.password;
    });
    res.json(users);
};

const user_get = (req, res) => {
    const user = getUser(req.params.userId);
    delete user.password;
    res.json(user);
};

const user_post = (req, res) => {
    console.log('add user data', req.body);
    res.send('From this point you can add users.');
};

module.exports = {
    user_get_list,
    user_get,
    user_post,
};