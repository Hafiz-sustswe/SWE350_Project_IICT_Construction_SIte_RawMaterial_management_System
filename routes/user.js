const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const auth = require('../services/authentication');
const checkRole = require('../services/checkrole');

router.get('/AllUser', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const query = "select ex_id , ex_name, ex_email,ex_contactNO,status from tbl_user where role_id = 4";

    try {
        const [results] = await connection.promise().query(query);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.get('/seeProfile', auth.authenticateToken, checkRole.checkRole([1], 'userId'), async (req, res) => {
    const userId = res.locals.user.ex_id;

    const query = "SELECT u.ex_id, u.ex_name, u.ex_email, u.ex_contactNO, u.status, r.role_name FROM tbl_user u JOIN roles r ON u.role_id = r.role_id WHERE u.ex_id = ?";
    try {
        const [results] = await connection.promise().query(query, [userId]);
        return res.status(200).json(results[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.get('/userById', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const user = req.body;
    const query = "select ex_id , ex_name, ex_email,ex_contactNO,status from tbl_user where ex_id = ?";

    try {
        const [results] = await connection.promise().query(query, [user.ex_id]);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.get('/deleteUserById', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const user = req.body;
    const query = "delete  from tbl_user where ex_id = ?";

    try {
        const [results] = await connection.promise().query(query, [user.ex_id]);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.get('/checkToken', auth.authenticateToken, checkRole.checkRole([1], 'userId'), (req, res) => {
    return res.status(200).json({ message: "true" });
});

router.patch('/approveUser', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    let user = req.body;
    const query = "update tbl_user set status = ? where ex_id = ?";
    try {
        const [results] = await connection.promise().query(query, [user.status, user.ex_id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "user id not found" });
        }
        return res.status(200).json({ message: "User Status updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
router.post('/changePassword', auth.authenticateToken, async (req, res) => {
    const user = req.body;
    const email = res.locals.user.ex_email;

    const query = "SELECT * FROM tbl_user WHERE ex_email = ? AND ex_password = ?";
    try {
        const [results] = await connection.promise().query(query, [email, user.oldPassword]);
        if (results.length === 0) {
            return res.status(400).json({ success: false, message: "Incorrect old password" });
        } else {
            const updateQuery = "UPDATE tbl_user SET ex_password = ? WHERE ex_email = ?";
            const [updateResults] = await connection.promise().query(updateQuery, [user.newPassword, email]);
            return res.status(200).json({ success: true, message: "Password updated successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to update password" });
    }
});



var transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        debug: true,
    }
);

router.post("/forgotPassword", async (req, res) => {
    const user = req.body;
    let query = "select ex_email, ex_password from tbl_user where ex_email=?";
    try {
        const [results] = await connection.promise().query(query, [user.ex_email]);
        if (results.length <= 0) {
            return res.status(200).json({
                message: "Password Successfully sent to your Email",
            });
        } else {
            let mailOptions = {
                from: process.env.EMAIL,
                to: results[0].ex_email,
                subject: "Password retrieval by ICSRMMS",
                html:
                    "<p>Your login details for IICT Construction Site Raw <br> Email: " +
                    results[0].ex_email +
                    "<br> Password: " +
                    results[0].ex_password +
                    "<br> <a href='http://localhost:8088'>Click Here to Login</a>" +
                    "</p>",
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info.response);
                    console.log(" \n Email sent");
                    return res.status(200).json({
                        message: "Password sent to your email",
                    });
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
});

module.exports = router;
