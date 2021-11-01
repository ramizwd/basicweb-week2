'use strict';
// catRoute

var express = require('express')
var router = express.Router()

router.get('/cat', (req, res) => {
    res.send('From this endpoint you can get cats.')
});

router.post('/cat', (req, res) => {
    res.send("POST req cats");
});

router.put('/cat', (req, res) => {
    res.send("PUT req cats");
});

router.delete('/cat', (req, res) => {
    res.send("DELETE req cats");
});

router.get('/cat/:catId', (req, res) => {
    console.log('/cat route', req.params);
    res.send(`From this endpoint you can get cats from catId: ${req.params.catId}`);
});

module.exports = router;
