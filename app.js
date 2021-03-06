'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cats = require('./routes/catRoute');
const users = require('./routes/userRoute');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cat', cats);
app.use('/user', users);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message || 'internal error');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
