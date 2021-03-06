'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getCat = async (catId) => {
    // TODO find single cat object from wop_cat table and return it.
    try {
        // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
        const [rows] = await promisePool.execute('SELECT * FROM wop_cat WHERE cat_id = ?', [catId]);
        return rows[0];
      } catch (e) {
        console.error('error', e.message);
      }
};

const getAllCats = async () => {
    try {
      // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
      const [rows] = await promisePool.query('SELECT cat_id, wop_cat.name AS name, weight, birthdate, filename, ' + 
      'wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = user_id');
      return rows;
    } catch (e) {
      console.error('error', e.message);
    }
};

const insertCat = async (cat) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO `wop_cat` (name, weight, owner, birthdate, filename) VALUES (?,?,?,?,?)', 
        [
            cat.name, 
            cat.weight, 
            cat.owner,
            cat.birthdate, 
            cat.filename
        ]);

        console.log('model insert cat', rows);
        return rows.insertId;
    } catch (e){
        console.error('model insert cat', e.message);
    }
};

const deleteCat = async (catId) => {
    try{
        const [rows] = await promisePool.execute('DELETE FROM wop_cat WHERE cat_id = ?', [catId]);
        console.log('model delete cat', rows);
        return true;
    } catch (e) {
        console.error('model delete cat', e.message);
    }
};

const updateCat = async (cat) => {
    try{
        const [rows] = await promisePool.execute('UPDATE wop_cat SET name=?, weight=?, owner=?, birthdate=? WHERE cat_id=?',
        [
            cat.name, 
            cat.weight, 
            cat.owner, 
            cat.birthdate, 
            cat.id
        ]);

        console.log('model update cat', rows);
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('model update cat', e.message);
    }
};


module.exports = {
  getCat,
  getAllCats,
  insertCat,
  deleteCat,
  updateCat,
};