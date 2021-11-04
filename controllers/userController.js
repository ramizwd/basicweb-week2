'use strict';


const {getAllUsers, getUser} = require('../models/userModel');

const user_get_list = async (req, res) => {
    const users = await getAllUsers();
    console.log('all users', users);
    // users.For((user) => {
    //     delete user.password;
    // });
    res.json(users);
};

const user_get = async (req, res) => {
    const user = await getUser(req.params.userId);
    console.log('get user by id', user);
    // delete user.password;
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