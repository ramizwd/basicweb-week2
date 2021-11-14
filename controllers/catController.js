'use strict';
// catController

const {getAllCats, getCat, insertCat, deleteCat, updateCat} = require('../models/catModel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');

const cat_list_get = async (req, res, next) => {
    const cats = await getAllCats(next);
    console.log('all cats', cats);

    if(cats.length > 0){
        res.json(cats);
        return;
    }
    const err = httpError('cats not found', 404);
    next(err);
};

const cat_get = async (req, res, next) => {
    const catById = await getCat(req.params.catId, next);
    console.log('get cat by id', catById);

    if(catById){
        res.json(catById);
        return;
    }
    const err = httpError('cat not found', 404);
    next(err);
};

const cat_post = async (req, res, next) => {
    console.log('add cat data', req.body);
    console.log('filename', req.file);

    const cat = req.body;
    cat.filename = req.file.filename;

    if(!req.file){
        const err = httpError('Invalid file', 400);
        next(err);
        return;
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.error('Set post validation', errors.array());
        const err = httpError(`data not valid`, 400);
        next(err);
        return;
    }

    cat.message = `cat added with id: ${await insertCat(cat, next)}`;
    res.json(cat);
};

const cat_delete = async (req, res) => {
    const deleted = await deleteCat(req.params.catId);
    res.json({message: `Cat deleted: ${deleted}`});
};

const cat_update = async (req, res, next) => {
    const updated = await updateCat(req.body, next);
    res.json({message: `Cat updated: ${updated}`});
};

module.exports = {
    cat_list_get,
    cat_get,
    cat_post,
    cat_delete,
    cat_update,
};



