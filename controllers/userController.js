'use strict';

const { validationResult } = require('express-validator');
const {
	getAllUsers,
	getUser,
	insertUser,
	deleteUser,
	updateUser,
} = require('../models/userModel');
const { httpError } = require('../utils/errors');

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

const user_post = async (req, res, next) => {
	console.log('add user data', req.body);
	const user = req.body;
	user.message = `user added with id: ${await insertUser(user, next)}`;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.error(`Set post validation`, errors.array());
		const err = httpError('data not valid', 400);
		next(err);
		return;
	}
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
	user_post,
	user_delete,
	user_update,
	checkToken,
};
