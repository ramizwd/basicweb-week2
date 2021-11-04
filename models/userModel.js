'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getUser = async (userId) => {
    try {
        const [rows] = await promisePool.query(`SELECT * FROM wop_user WHERE user_id=${userId}`);
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.query(`SELECT * FROM wop_user`);
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

module.exports = {
    getUser,
    getAllUsers,
};



// const users = [
//   {
//     id: '1',
//     name: 'John Doe',
//     email: 'john@metropolia.fi',
//     password: '1234',
//   },
//   {
//     id: '2',
//     name: 'Jane Doez',
//     email: 'jane@metropolia.fi',
//     password: 'qwer',
//   },
// ];

// const getUser = (userId) => {
//     return users.find((user) => user.id == userId);
// }

// module.exports = {
//   users,
//   getUser,
// };
