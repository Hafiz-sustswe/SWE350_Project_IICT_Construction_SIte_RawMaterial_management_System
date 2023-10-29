const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');
const { response } = require('..');

var transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        debug: true,
    }
)
router.post('/signup', async (req, res) => {
    let user = req.body;
    query = "select ex_email,ex_password,role_id,status,ex_id from tbl_user where ex_email = ?"
    connection.query(query, [user.ex_email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into tbl_user(ex_name,ex_contactNO,ex_email,ex_password,status,role_id) values(?,?,?,?,'true',1);"
                connection.query(query, [user.ex_name, user.ex_contactNO, user.ex_email, user.ex_password], (err, result) => {
                    if (!err) {
                        // Assuming ex_id is the primary key or auto-incremented ID
                        const userId = result.insertId;

                        // Create a token with ex_id in the payload
                        const token = jwt.sign({ ex_id: userId, ex_email: user.ex_email, role_id: 1 }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });

                        let mailOptions = {
                            from: process.env.EMAIL,
                            to: user.ex_email,
                            subject: "Signup Successful",
                            html:
                                "<p>Thanks For Registering with our Website <br> " +
                                "<br> <a href='http://localhost:8088'>Click Here to Login</a>" +
                                "</p>",
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(info.response);
                                console.log("\n Email sent");
                                return res.status(200).json({
                                    message: "Successfully Registered With Us",
                                    token: token, // Send the token in the response
                                });
                            }
                        });
                    }
                });
            } else {
                return res.status(400).json({ message: "Email Already Exist" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get('/checkToken',auth.authenticateToken,checkRole.checkRole, (req,res) =>{
    return res.status(200).json({message : "true"});

});
router.post('/login', (req, res) => {
    const user = req.body;
    query = "select ex_id, ex_email, ex_password, role_id, status from tbl_user where ex_email = ?"
    connection.query(query, [user.ex_email], (err, result) => {
        if (!err) {
            if (result.length <= 0 || result[0].ex_password != user.ex_password) {
                return res.status(401).json({ message: "Incorrect username or password" });
            } else if (result[0].status == 'false') {
                return res.status(401).json({ message: "Wait for admin approval" });
            } else if (result[0].ex_password == user.ex_password) {
                const response = { ex_id: result[0].ex_id, ex_email: result[0].ex_email, role_id: result[0].role_id }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                res.status(200).json({
                    status: 200,
                    success: "true",
                    message: "User Login Successfull",
                    token: accessToken
                });
            } else {
                return res.status(400).json({ message: "Something went wrong" });
            }
        } else {
            return res.status(500).json(err);
        }
    })
});


module.exports = router;