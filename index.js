const express = require('express');
var cors = require ('cors');
const connection = require('./connection');
const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');
const requisitionRoutes = require('./routes/requisition');
const tenderRoutes = require('./routes/tender');
const pricedBillRoutes = require('./routes/priced_bill');
const auth = require('./auth/authHandler');


const app = express();

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use('/',userRoutes);

app.get("/", (req, res) => {
    res.send("You can create ToDo here!");
  });
  
app.use('/item',itemRoutes);
app.use('/requisition',requisitionRoutes);
app.use('/tender',tenderRoutes);
app.use('/auth',auth);
//app.use('/pricedBill',pricedBillRoutes);

module.exports = app;
