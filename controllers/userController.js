'use strict';

const {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
} = require('../models/userModel');

const user_get_list = async (req, res, next) => {
    const users = await getAllUsers(next);
    console.log('all users', users);
    res.json(users);
};

const user_get = async (req, res, next) => {
    const user = await getUser(req.params.userId, next);
    console.log('get user by id', user);
    res.json(user);
};

const user_delete = async (req, res, next) => {
    const deleted = await deleteUser(
        req.params.userId,
        req.user.user_id,
        req.user.role,
        next
    );
    res.json({ message: `User deleted: ${deleted}` });
};

const user_update = async (req, res, next) => {
    const updated = await updateUser(
        req.body,
        req.user.user_id,
        req.user.role,
        next
    );
    res.json({ message: `User updated: ${updated}` });
};

const checkToken = (req, res, next) => {
    if (!req.user) {
        next(new Error('token not valid'));
    } else {
        res.json({ user: req.user });
    }
};

module.exports = {
    user_get_list,
    user_get,
    user_delete,
    user_update,
    checkToken,
};
