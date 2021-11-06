'use strict';


const {getAllUsers, getUser, insertUser, deleteUser, updateUser} = require('../models/userModel');

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

const user_post = async (req, res) => {
    console.log('add user data', req.body);
    const user = req.body;
    user.message = `user added with id: ${await insertUser(user)}`;
    res.json(user);
};

const user_delete = async (req, res) => {
    const deleted = await deleteUser(req.params.userId);
    res.json({message: `User deleted: ${deleted}`});
}

const user_update = async (req, res) => {
    const updated = await updateUser(req.body);
    res.json({message: `User updated: ${updated}`});
}

module.exports = {
    user_get_list,
    user_get,
    user_post,
    user_delete,
    user_update,
};