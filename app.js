'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cats = require('./routes/catRoute');
const users = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const { httpError } = require('./utils/errors');
const passport = require('./utils/pass');
const port = 3000;
const app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
    require('./utils/production')(app, port);
} else {
    require('./utils/localhost')(app, 8000, port);
}

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
