'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

const getUser = async (userId, next) => {
    try {
        const [rows] = await promisePool.query(`SELECT * FROM wop_user WHERE user_id = ?`, [userId]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const getAllUsers = async (next) => {
    try {
        const [rows] = await promisePool.query(`SELECT * FROM wop_user`);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const insertUser = async (user, next) => {
    try{
        const [rows] = await promisePool.execute('INSERT INTO wop_user (name, email, password) VALUES (?,?,?)',
        [
            user.name,
            user.email,
            user.passwd
        ]);

        console.log('model insert user', rows);
        return rows.insertId;
    } catch (e) {
        console.error('model insert user', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const deleteUser = async (userId, next) => {
    try{
        const [rows] = await promisePool.execute('DELETE FROM wop_user WHERE user_id = ?', [userId]);
        console.log('model delete user', rows);
        return true;
    } catch (e) {
        console.error('model delete user', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
}

const updateUser = async (user, next) => {
    try {
        const [rows] = await promisePool.execute('UPDATE wop_user SET name=?, email=?, password=?, role=? WHERE user_id=?',
        [
            user.name,
            user.email,
            user.password,
            user.role,
            user.id
        ]);

        console.log('model update user', rows);
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('model update user', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};


module.exports = {
    getUser,
    getAllUsers,
    insertUser,
    deleteUser,
    updateUser,
};
