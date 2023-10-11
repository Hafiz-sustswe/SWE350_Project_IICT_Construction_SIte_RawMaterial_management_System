const express = require('express');
const connection = require('../connection');
const router = express.Router();
//const jwt = require('jsonwebtoken');
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');




router.post('/add',auth.authenticateToken,(req,res,next) =>{
    let tender = req.body;
    query = "insert into  tbl_tender  values(?,?,?,?,?,?,?,?)";
    connection.query(query,[tender.tender_SLNO,tender.tender_creator_id,tender.tender_date,tender.Project_Name,tender.tender_location,tender.tender_item_id,tender.tender_item_qtity,tender.tender_deadline],(err,results) =>{
        if (!err) {
            return res.status(200).json({ message: "Tender Added Succesfully" });
        }
        else {
            return res.status(500).json(err);  

        }
    });
});
router.get('/get' , auth.authenticateToken , (req,res,next)=>{
   
    query = "select * from tbl_tender";
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
    let tender = req.body;
    
    query = "DELETE FROM tbl_tender where tender_SLNO = ?";
    connection.query(query,[tender.tender_SLNO],(err,results) =>{
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