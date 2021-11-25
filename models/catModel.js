'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

const getCat = async (catId, next) => {
    // TODO find single cat object from wop_cat table and return it.
    try {
        // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
        const [rows] = await promisePool.execute(
            'SELECT coords, cat_id, owner, wop_cat.name AS name, weight, birthdate,' +
                'filename, wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = user_id WHERE cat_id = ?',
            [catId]
        );
        console.log('Get cat by ID', rows);
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const getAllCats = async (next) => {
    try {
        // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
        const [rows] = await promisePool.query(
            'SELECT cat_id, owner, wop_cat.name AS name, weight, birthdate, filename, ' +
                'wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = user_id'
        );
        return rows;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const insertCat = async (cat, next) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO `wop_cat` (name, weight, owner, birthdate, filename, coords) VALUES (?,?,?,?,?,?)',
            [
                cat.name,
                cat.weight,
                cat.owner,
                cat.birthdate,
                cat.filename,
                cat.coords,
            ]
        );

        console.log('model insert cat', rows);
        return rows.insertId;
    } catch (e) {
        console.error('model insert cat', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const deleteCat = async (catId, user_id, role, next) => {
    let sql = 'DELETE FROM wop_cat WHERE cat_id = ? AND owner = ?';
    let params = [catId, user_id];
    if (role === 0) {
        sql = 'DELETE FROM wop_cat WHERE cat_id = ?';
        params = [catId];
    }
    try {
        const [rows] = await promisePool.execute(sql, params);
        console.log('Deleted cat', rows);
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('model delete cat', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const updateCat = async (cat, role, next) => {
    let sql =
        'UPDATE wop_cat SET name=?, weight=?, birthdate=?  WHERE cat_id=? AND owner=?';
    let params = [cat.name, cat.weight, cat.birthdate, cat.id, cat.owner];
    if (role === 0) {
        sql =
            'UPDATE wop_cat SET name=?, weight=?,owner=?, birthdate=? WHERE cat_id=? ';
        params = [cat.name, cat.weight, cat.owner, cat.birthdate, cat.id];
    }
    try {
        const [rows] = await promisePool.execute(sql, params);
        console.log('model update cat', rows);
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('model update cat', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

module.exports = {
    getCat,
    getAllCats,
    insertCat,
    deleteCat,
    updateCat,
};
