'use strict';
// catRoute

const express = require('express')
const multer  = require('multer');
const upload = multer({dest: './uploads/'});
const {cat_list_get, cat_get, cat_post} = require('../controllers/catController');
const router = express.Router();


router.get('/', cat_list_get);

router.get('/:catId', cat_get);

router.post('/', upload.single('cat'), cat_post);

router.put('/', (req, res) => {
    res.send("PUT req cats");
});

router.delete('/', (req, res) => {
    res.send("DELETE req cats");
});

module.exports = router;
