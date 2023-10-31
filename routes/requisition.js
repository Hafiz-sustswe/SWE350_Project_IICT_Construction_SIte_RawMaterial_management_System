const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');
// Global variable to store the last used requisition ID
let lastRequisitionId = 0;

// Function to retrieve the last used requisition ID from the database
function getLastRequisitionIdFromDatabase(callback) {
    const query = "SELECT MAX(CAST(SUBSTRING(req_id, 5) AS UNSIGNED)) AS lastId FROM tbl_requisition_detail";
   try {
    connection.query(query, (err, results) => {
        if (!err) {
            const lastId = results[0].lastId || 0;
            callback(lastId);
        } else {
            console.error(err);
            callback(0);
        }
    });
   } catch (error) {
     console.log(error);
   }
}

// Function to generate a sequential Requisition ID
function generateRequisitionId(callback) {
    // Retrieve the last used requisition ID from the database
    getLastRequisitionIdFromDatabase((lastId) => {
        lastRequisitionId = lastId;

        // Increment the last used requisition ID
        lastRequisitionId++;

        // Convert the incremented ID to a string
        const reqId = `REQ_${lastRequisitionId.toString().padStart(4, '0')}`;

        // Callback with the generated requisition ID
        callback(reqId);
    });
}

// API endpoint to add a requisition
router.post('/addRequisition', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role')(req, res, next);
}, (req, res, next) => {
    const requisition = req.body;

    // Generate Requisition ID using the function
    generateRequisitionId((reqId) => {
        // Use the generated ID in the SQL query
        const query = "INSERT INTO tbl_requisition_detail (req_id, req_creator_id, req_date, req_item_id, req_qtity, purpose) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            connection.query(query, [reqId, requisition.req_creator_id, requisition.req_date, requisition.req_item_id, requisition.req_qtity, requisition.purpose], (err, results) => {
                if (!err) {
                    return res.status(200).json({ message: "Requisition Added Successfully" });
                } else {
                    return res.status(500).json(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    });
});

// API endpoint to update a requisition
router.patch('/updateRequisition', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role')(req, res, next);
}, (req, res, next) => {
    let requisition = req.body;

    const query = "UPDATE tbl_requisition_detail SET req_item_id = ?, req_qtity = ?, purpose = ? WHERE req_id = ?";
    try {
        connection.query(query, [requisition.req_item_id, requisition.req_qtity, requisition.purpose, requisition.req_id], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).json({ message: "Requisition not found" });
                }
                return res.status(200).json({ message: "Requisition updated Successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// API endpoint to delete a requisition by ID
router.delete('/deleteRequisitionById', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role')(req, res, next);
}, (req, res, next) => {
    let requisition = req.body;

    const query = "DELETE FROM tbl_requisition_detail WHERE req_id = ?";
    try {
        connection.query(query, [requisition.req_id], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).json({ message: "Requisition not found" });
                }
                return res.status(200).json({ message: "Requisition deleted Successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/getRequisition', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role')(req, res, next);
}, (req, res, next) => {
    query = "SELECT * FROM tbl_requisition_detail ";
    try {
        connection.query(query, (err, results) => {
            if (!err) {
                return res.status(200).json(results);
            } else {
                return res.status(500).json(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
