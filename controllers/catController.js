'use strict';
// catController

const {getAllCats, getCat} = require('../models/catModel');

const cat_list_get = async (req, res) => {
    const cats = await getAllCats();
    console.log('all cats', cats);
    res.json(cats);
};

const cat_get = async (req, res) => {
    const catById = await getCat(req.params.catId);
    console.log('get cat by id', catById);
    res.json(catById);
};

const cat_post = (req, res) => {
    console.log('add user data', req.body);
    res.send('From this point you can add users.');
};

module.exports = {
    cat_list_get,
    cat_get,
    cat_post,
};

