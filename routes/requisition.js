const express = require('express');
const connection = require('../connection');
const router = express.Router();
//const jwt = require('jsonwebtoken');
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');

router.post('/add',auth.authenticateToken,(req,res,next) =>{
    let reqstn = req.body;
    query = "insert into  tbl_requisition_detail(req_id,req_creator_id,req_date,req_itemID,req_qtity,purpose) values(?,?,?,?,?,?)";
    connection.query(query,[reqstn.req_id,reqstn.req_creator_id,reqstn.req_date,reqstn.req_itemID,reqstn.req_qtity,reqstn.purpose],(err,results) =>{
        if (!err) {
            return res.status(200).json({ message: "Requisition Added Succesfully" });
        }
        else {
            return res.status(500).json(err);  

        }
    });
});
router.get('/get' , auth.authenticateToken , (req,res,next)=>{
   
    query = "select * from tbl_requisition_detail";
    connection.query(query,(err,results) =>{
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);

        }
    });
})
// router.patch('/update', auth.authenticateToken, (req,res,next) =>{
//     let item = req.body;
    
//     query = "update tbl_requisition_detail set item_name = ? where item_id = ?";
//     connection.query(query,[item.item_name,item.item_id],(err,results) =>{
//         if (!err) {
//             if(results.affectedRows == 0)
//             {
//                 return res.status(404).json({message : "item id not founnd"});
//             }
//             return res.status(200).json({ message: "Item updated Succesfully" });
//         }
//         else {
//             return res.status(500).json(err);

//         }
//     });

// });

router.delete('/deleteById', auth.authenticateToken, (req,res,next) =>{
    let reqstn = req.body;
    
    query = "DELETE FROM tbl_requisition_detail where req_id = ?";
    connection.query(query,[reqstn.req_id],(err,results) =>{
        if (!err) {
            if(results.affectedRows == 0)
            {
                return res.status(404).json({message : "item id not founnd"});
            }
            return res.status(200).json({ message: "Item deleted Succesfully" });
        }
        else {
            return res.status(500).json(err);

        }
    });

})

module.exports = router;