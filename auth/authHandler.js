const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config();
const auth = require('../services/authentication');
const checkRole = require('../services/checkrole');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    debug: true,
});

router.post('/signup', async (req, res) => {
    const user = req.body;
    let query = "select ex_email,ex_password,role_id,status,ex_id from tbl_user where ex_email = ?";
    
    try {
        const [results] = await connection.promise().query(query, [user.ex_email]);

        if (results.length <= 0) {
            query = "insert into tbl_user(ex_name,ex_contactNO,ex_email,ex_password,status,role_id) values(?,?,?,?,'true',4);";
            
            const [result] = await connection.promise().query(query, [user.ex_name, user.ex_contactNO, user.ex_email, user.ex_password]);
            const userId = result.insertId;

            const token = jwt.sign({ ex_id: userId, ex_email: user.ex_email, role_id: 1 }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });

            let mailOptions = {
                from: process.env.EMAIL,
                to: user.ex_email,
                subject: "Signup Successful",
                html: "<p>Thanks For Registering with our Website <br> " +
                      "<br> <a href='https://icsrmms-two.vercel.app/signin'>Click Here to Login</a>" +
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
                        token: token,
                    });
                }
            });
        } else {
            return res.status(400).json({ message: "Email Already Exist" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.get('/checkToken', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    return res.status(200).json({ message: "true" });
});

router.post('/login', async (req, res) => {
    const user = req.body;
    let query = "select ex_id, ex_email, ex_password, role_id, status from tbl_user where ex_email = ?";
    
    try {
        const [result] = await connection.promise().query(query, [user.ex_email]);

        if (result.length <= 0 || result[0].ex_password != user.ex_password) {
            return res.status(401).json({ message: "Incorrect username or password" });
        } else if (result[0].status == 'false') {
            return res.status(401).json({ message: "Wait for admin approval" });
        } else if (result[0].ex_password == user.ex_password) {
            const response = { ex_id: result[0].ex_id, ex_email: result[0].ex_email, role_id: result[0].role_id };
            const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });

            res.status(200).json({
                status: 200,
                success: "true",
                message: "User Login Successful",
                token: accessToken
            });
        } else {
            return res.status(400).json({ message: "Something went wrong" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

module.exports = router;
