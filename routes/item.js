const express = require('express');
const connection = require('../connection');
const router = express.Router();
//const jwt = require('jsonwebtoken');
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');

router.post('/add',auth.authenticateToken,(req,res,next) =>{
    let item = req.body;
    query = "insert into tbl_item(item_id,item_name,item_price) values(?,?,?)";
    connection.query(query,[item.item_id,item.item_name,item.item_price],(err,results) =>{
        if (!err) {
            return res.status(200).json({ message: "Item Added Succesfully" });
        }
        else {
            return res.status(500).json(err);

        }
    });
});
router.get('/get' , auth.authenticateToken , (req,res,next)=>{
   
    query = "select * from tbl_item ";
    connection.query(query,(err,results) =>{
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);

        }
    });
})
router.patch('/update', auth.authenticateToken, (req,res,next) =>{
    let item = req.body;
    
    query = "update tbl_item set item_name = ? where item_id = ?";
    connection.query(query,[item.item_name,item.item_id],(err,results) =>{
        if (!err) {
            if(results.affectedRows == 0)
            {
                return res.status(404).json({message : "item id not founnd"});
            }
            return res.status(200).json({ message: "Item updated Succesfully" });
        }
        else {
            return res.status(500).json(err);

        }
    });

})

module.exports = router;