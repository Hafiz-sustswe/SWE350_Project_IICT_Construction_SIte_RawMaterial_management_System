const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');
const { response } = require('..');



// router.post('/signup', async (req, res) => {
//     let user = req.body;
//     query = "select ex_email,ex_password,role_id,status from tbl_user where ex_email = ?"
//     connection.query(query, [user.ex_email], (err, results) => {
//         if (!err) {
//             if (results.length <= 0) {
//                 query = "insert into tbl_user(ex_name,ex_contactNO,ex_email,ex_password,status,role_id) values(?,?,?,?,'true',1);"
//                 connection.query(query, [user.ex_name, user.ex_contactNO, user.ex_email, user.ex_password], (err, result) => {
//                     if (!err) {
//                        let mailOptions = {
//                         from: process.env.EMAIL,
//                         to: user.ex_email,
//                         subject: "Signup Successfull",
//                         html:
//                           "<p>Thanks For Registering with our Website <br> " +

//                           "<br> <a href='http://localhost:8088'>Click Here to Login</a>" +
//                           "</p>",
//                       };
//                       transporter.sendMail(mailOptions, (error, info) => {
//                         if (error) {
//                           console.log(error);
//                         } else {
//                           console.log(info.response);
//                           console.log(" \n Email sent");
//                           return res.status(200).json({
//                             message: "SuccessFully Registered With Us",
//                           });
//                         }
//                       });

//                     }
//                 })
//             }
//             else
//                 return res.status(400).json({ message: "Email Already Exist" });
//         }
//         else {
//             return res.status(500).json(err);
//         }

//     });
// })


// router.post('/login', (req, res) => {
//     const user = req.body;
//     query = "select ex_email,ex_password,role_id,status from tbl_user where ex_email = ?"
//     connection.query(query, [user.ex_email ], (err, result) => {
//         if (!err) {
//             if (result.length <= 0 || result[0].ex_password != user.ex_password) {
//                 return res.status(401).json({ message: "Incorrect username or password" });

//             } else if (result[0].status == 'false') {
//                 return res.status(401).json({ message: "wait for admin approval" });
//             }
//             else if (result[0].ex_password == user.ex_password) {
//                 const response = { ex_email: result[0].ex_email, role_id: result[0].role_id }
//                 const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
//                 res.status(200).json({ token: accessToken });
//             }

//             else {
//                 return res.status(400).json({ message: "Something went wrong" });
//             }
//         }
//         else {
//             return res.status(500).json(err);
//         }
//     })
// })

router.get('/AllUser', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    var query = "select ex_id , ex_name, ex_email,ex_contactNO,status from tbl_user where role_id = 4";

    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    });

});
router.get('/seeProfile', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'userId', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    // Access user information from res.locals.user


    const userId = res.locals.user.ex_id;
    const role = res.locals.user.role;

    var query = "select ex_id , ex_name, ex_email, ex_contactNO, status from tbl_user where ex_id = ?";
    connection.query(query, [userId], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});



router.get('/userById', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    const user = req.body;
    var query = "select ex_id , ex_name, ex_email,ex_contactNO,status from tbl_user where ex_id = ?";

    connection.query(query, [user.ex_id], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    });

});
router.get('/deleteUserById', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    const user = req.body;
    var query = "delete  from tbl_user where ex_id = ?";

    connection.query(query, [user.ex_id], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    });

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

})

router.post('/changePassword', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'userId', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    const user = req.body;
    const email = res.locals.ex_email;
    var query = "select * from tbl_user where ex_email = ? and ex_password = ?";
    connection.query(query, [email, user.oldPassword], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(400).json({ message: "incorrect Old password" });
            }
            else if (results[0].ex_password == user.oldPassword) {
                query = "update tbl_user set ex_password = ? where ex_email = ?";
                connection.query(query, [user.newPassword, email], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "password Updated successfully" });

                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        }
    })
})

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
router.post("/forgotPassword", auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'userId', res.locals.user.ex_id)(req, res, next);
}, (req, res) => {
    const user = req.body;
    let query = "select ex_email, ex_password from tbl_user where ex_email=?";
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
});




module.exports = router;
