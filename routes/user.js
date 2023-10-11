const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');


router.post('/signup', (req, res) => {
    let user = req.body;
    query = "select ex_email,ex_password,role_id,status from tbl_user where ex_email = ?"
    connection.query(query, [user.ex_email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into tbl_user(ex_name,ex_contactNO,ex_email,ex_password,status,role_id) values(?,?,?,?,'false',4);"
                connection.query(query, [user.ex_name, user.ex_contactNO, user.ex_email, user.ex_password], (err, result) => {
                    if (!err) {
                        return res.status(200).json({ message: "successfully registered" });
                    }
                    else {
                        return res.status(500).json(err);

                    }
                })
            }
            else
                return res.status(400).json({ message: "Email Already Exist" });
        }
        else {
            return res.status(500).json(err);
        }

    });

})
router.post('/login', (req, res) => {
    const user = req.body;
    query = "select ex_email,ex_password,role_id,status from tbl_user where ex_email = ?"
    connection.query(query, [user.email], (err, result) => {
        if (!err) {
            if (result.length <= 0 || result[0].password != user.ex_password) {
                return res.status(401).json({ message: "Incorrect username or password" });

            } else if (result[0].status == 'false') {
                return res.status(401).json({ message: "wait for admin approval" });
            }
            else if (result[0].password == user.ex_password) {
                const response = { ex_email: result[0].email, role_id: result[0].role }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                res.status(200).json({ token: accessToken });


            }
            else {
                return res.status(400).json({ message: "Something went wrong" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get',auth.authenticateToken,checkRole.checkRole ,(req,res) => {
    var query = "select ex_id , ex_name, ex_email,ex_contactNO,status from tbl_user where role_id = 4" ;

    connection.query(query, (err, results) =>{
        if(!err){
            return res.status(200).json(results);
        }
        else
        {
            return res.status(500).json(err);
        }
    });

});
router.get('/checkToken',auth.authenticateToken,checkRole.checkRole, (req,res) =>{
    return res.status(200).json({message : "true"});

});


module.exports = router;
