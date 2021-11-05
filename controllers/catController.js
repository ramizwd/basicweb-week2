'use strict';
// catController

const {getAllCats, getCat, insertCat, deleteCat} = require('../models/catModel');

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

const cat_post = async (req, res) => {
    console.log('add user data', req.body);
    console.log('filename', req.file);
    const cat = req.body;
    cat.filename = req.file.filename;
    const id = await insertCat(cat);
    res.send(`cat added with id: ${id}`);
};

const cat_delete = async (req, res) => {
    await deleteCat(req.params.catId);
    res.send('Cat deleted');
};

module.exports = {
    cat_list_get,
    cat_get,
    cat_post,
    cat_delete,
};



