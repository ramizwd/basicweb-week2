'use strict';
// catController

const {getAllCats, getCat, insertCat, deleteCat, updateCat} = require('../models/catModel');

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
    cat.message = `cat added with id: ${await insertCat(cat)}`;
    res.json(cat);
};

const cat_delete = async (req, res) => {
    const deleted = await deleteCat(req.params.catId);
    res.json({message: `Cat deleted: ${deleted}`});
};

const cat_update = async (req, res) => {
    const updated = await updateCat(req.body);
    res.json({message: `Cat updated: ${updated}`});
};

module.exports = {
    cat_list_get,
    cat_get,
    cat_post,
    cat_delete,
    cat_update,
};



