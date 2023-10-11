const express = require('express');
var cors = require ('cors');
const connection = require('./connection');
const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use('/user',userRoutes);
app.use('/item',itemRoutes);

module.exports = app;
