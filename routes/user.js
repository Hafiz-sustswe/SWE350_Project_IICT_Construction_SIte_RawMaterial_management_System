const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');
const { response } = require('..');




router.get('/AllUser', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    var query = "select ex_id , ex_name, ex_email,ex_contactNO,status from tbl_user where role_id = 4";

    try {
        connection.query(query, (err, results) => {
            if (!err) {
                return res.status(200).json(results);
            }
            else {
                return res.status(500).json(err);
            }
        });
    } catch (error) {
        console.log(error);
    }

});
router.get('/seeProfile', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'userId', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    // Access user information from res.locals.user


    const userId = res.locals.user.ex_id;
    const role = res.locals.user.role;

    var query = "SELECT u.ex_id, u.ex_name, u.ex_email, u.ex_contactNO, u.status, r.role_name FROM tbl_user u JOIN roles r ON u.role_id = r.role_id WHERE u.ex_id = ?";
   try {
    connection.query(query, [userId], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(500).json(err);
        }
    });
   } catch (error) {
    console.log(error);
   }
});



router.get('/userById', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    const user = req.body;
    var query = "select ex_id , ex_name, ex_email,ex_contactNO,status from tbl_user where ex_id = ?";

    try {
        connection.query(query, [user.ex_id], (err, results) => {
            if (!err) {
                return res.status(200).json(results);
            }
            else {
                return res.status(500).json(err);
            }
        });
    } catch (error) {
        console.log(error);
    }

});
router.get('/deleteUserById', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    const user = req.body;
    var query = "delete  from tbl_user where ex_id = ?";

    try {
        connection.query(query, [user.ex_id], (err, results) => {
            if (!err) {
                return res.status(200).json(results);
            }
            else {
                return res.status(500).json(err);
            }
        });
    } catch (error) {
        console.log(error);
    }

});
router.get('/checkToken', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'userId', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    return res.status(200).json({ message: "true" });

});



router.patch('/approveUser', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    let user = req.body;
    var query = "update tbl_user set status = ? where ex_id = ?";
   try {
    connection.query(query, [user.status, user.ex_id], (err, results) => {
        if (!err) {
            if (results.affetedRows == 0) {
                return res.status(404).json({ message: "user id not found" });

            }
            return res.status(200).json({ message: "User Status updated succesfully" });

        }
        else {
            return res.status(500).json(err);
        }
    })
   } catch (error) {
    console.log(error);
   }

})

router.post('/changePassword', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'userId', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    const user = req.body;
    const email = res.locals.ex_email;

    // Use parameterized queries to prevent SQL injection
    const query = "SELECT * FROM tbl_user WHERE ex_email = ? AND ex_password = ?";
    try {
        
    connection.query(query, [email, user.oldPassword], (err, results) => {
        if (!err) {
            if (results.length === 0) {
                return res.status(400).json({ message: "Incorrect old password" });
            } else {
                const updateQuery = "UPDATE tbl_user SET ex_password = ? WHERE ex_email = ?";
                connection.query(updateQuery, [user.newPassword, email], (err, updateResults) => {
                    if (!err) {
                        // Use 204 status for successful updates with no content in the response body
                        return res.status(204).send();
                    } else {
                        return res.status(500).json({ message: "Failed to update password" });
                    }
                });
            }
        } else {
            return res.status(500).json({ message: "Database error" });
        }
    });
    } catch (error) {
        console.log(error);
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
)
router.post("/forgotPassword",
     (req, res) => {
    const user = req.body;
    let query = "select ex_email, ex_password from tbl_user where ex_email=?";
    try {
        connection.query(query, [user.ex_email], (err, results) => {
            if (!err) {
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
            } else {
                return res.status(500).json({ err });
            }
        });
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;

