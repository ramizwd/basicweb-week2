'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cats = require('./routes/catRoute');
const users = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const { httpError } = require('./utils/errors');
const passport = require('./utils/pass');
const port = 3000;

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

const options = {
    key: sslkey,
    cert: sslcert,
};

const app = express();

https.createServer(options, app).listen(8000);

http.createServer((req, res) => {
    res.writeHead(301, { Location: 'https://localhost:8000' + req.url });
    res.end();
}).listen(3000);

app.use(cors());
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', { session: false }), cats);
app.use('/user', passport.authenticate('jwt', { session: false }), users);

app.get('/', (req, res) => {
    if (req.secure) {
        res.send('Hello Secure World!');
    } else {
        res.send('not secured?');
    }
});

app.use((req, res, next) => {
    const err = httpError('Not found', 404);
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send({ message: err.message || 'internal error' });
});
