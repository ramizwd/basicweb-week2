'use strict';
// catRoute

const express = require('express')
const router = express.Router()
const {cat_list_get, cat_get} = require('../controllers/catController');

router.get('/', cat_list_get);

router.get('/:catId', cat_get);


router.post('/', (req, res) => {
    res.send("POST req cats");
});

router.put('/', (req, res) => {
    res.send("PUT req cats");
});

router.delete('/', (req, res) => {
    res.send("DELETE req cats");
});

module.exports = router;
