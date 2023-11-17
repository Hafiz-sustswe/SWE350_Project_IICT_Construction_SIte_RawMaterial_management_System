const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const auth = require('../services/authentication');
const checkRole = require('../services/checkrole');

//ok
// For /AllUser endpoint
// For /AllUser endpoint
router.get('/AllUser', auth.authenticateToken, checkRole.checkRole([1,2], 'role'), async (req, res) => {
    const getAllQuery = "SELECT ex_id, ex_name, ex_email, ex_contactNO, role_id, status FROM tbl_user";

    try {
        const [user_results] = await connection.promise().query(getAllQuery);

        if (user_results.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "No users found",
                success: false,
                data: null,
            });
        }

        const query2 = "SELECT role_name FROM roles WHERE role_id = ?";
        const usersWithRoles = await Promise.all(user_results.map(async (user) => {
            const [role_result] = await connection.promise().query(query2, [user.role_id]);
            return {
                ...user,
                role: role_result[0],
            };
        }));

        return res.status(200).json({
            status: 200,
            message: "Users Fetched Successfully",
            success: true,
            data: usersWithRoles,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

// For /:id endpoint
router.get('/:id', auth.authenticateToken, checkRole.checkRole([1,2], 'role'), async (req, res) => {
    const { id } = req.params;
    const query = "SELECT ex_id, ex_name, ex_email, ex_contactNO, role_id,status FROM tbl_user WHERE ex_id = ?";

    try {
        const [user_result] = await connection.promise().query(query, [id]);

        if (user_result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
                success: false,
                data: null,
            });
        }

        const query2 = "SELECT role_name FROM roles WHERE role_id = ?";
        const [role_result] = await connection.promise().query(query2, [user_result[0].role_id]);

        return res.status(200).json({
            status: 200,
            message: "User Fetched Successfully",
            success: true,
            data: {
                user: {
                    ...user_result[0],
                    role: role_result[0],
                },
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});


//ok
router.delete('/deleteUserById', auth.authenticateToken, checkRole.checkRole([1,2], 'role'), async (req, res) => {
    const user = req.body;
    const query = "DELETE FROM tbl_user WHERE ex_id = ?";

    try {
        const [results] = await connection.promise().query(query, [user.ex_id]);
        if (results.affectedRows > 0) {
            return res.status(200).json({ message: "user Deleted successfully" });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//ok
router.patch('/:id', auth.authenticateToken, checkRole.checkRole([1,2], 'role'), async (req, res) => {
    const { id } = req.params;
    const { role_id } = req.body;

    const updateQuery = "UPDATE tbl_user SET role_id = ? WHERE ex_id = ?";
    const selectUserQuery = "SELECT ex_id, ex_name, ex_email, ex_contactNO, role_id, status FROM tbl_user WHERE ex_id = ?";
    const selectRoleQuery = "SELECT role_name FROM roles WHERE role_id = ?";

    try {
        // Update user's role
        const [updateResults] = await connection.promise().query(updateQuery, [role_id, id]);

        // Check if the user was updated
        if (updateResults.affectedRows === 0) {
            return res.status(404).json({ 
                status: 404,
                message: "User not found",
                success: false,
                data: null,
            });
        }

        // Fetch updated user details
        const [userResult] = await connection.promise().query(selectUserQuery, [id]);

        // Fetch role details for the updated role
        const [roleResult] = await connection.promise().query(selectRoleQuery, [role_id]);

        return res.status(200).json({ 
            status: 200,
            message: "User Status updated successfully",
            success: true,
            data: {
                user: {
                    ...userResult[0],
                    role: roleResult[0],
                },
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

//---------------------------

//ok
router.get('/seeProfile', auth.authenticateToken,  async (req, res) => {
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



//ok
router.get('/checkToken', auth.authenticateToken, (req, res) => {
    return res.status(200).json({ message: "true" });
});

//ok
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

//ok
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
