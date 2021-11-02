'use strict';


const {users, getUser} = require('../models/userModel');

const user_get_list = (req, res) => {
    res.json(users);
};

const user_get = (req, res) => {
    const user = getUser(req.params.userId);
    res.json(user);
};

module.exports = {
    user_get_list,
    user_get,
};