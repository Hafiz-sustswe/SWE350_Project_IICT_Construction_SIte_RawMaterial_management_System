const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');

// Global variable to store the last used tender SLNo
let lastTenderSLNo = 0;

// Function to retrieve the last used tender SLNo from the database
// Function to retrieve the last used tender SLNo from the database
function getLastTenderSLNoFromDatabase(callback) {
    const query = "SELECT MAX(CAST(SUBSTRING(tender_SLNo, 8) AS UNSIGNED)) AS lastSLNo FROM tbl_tender";
    try {
        connection.query(query, (err, results) => {
            if (!err) {
                const lastSLNo = results[0].lastSLNo || 0;
                callback(lastSLNo);
            } else {
                console.error(err);
                callback(0);
            }
        });
    } catch (error) {
        console.log(error);
    }
}


// Function to generate a sequential Tender SLNo
function generateTenderSLNo(callback) {
    // Retrieve the last used tender SLNo from the database
    getLastTenderSLNoFromDatabase((lastSLNo) => {
        lastTenderSLNo = lastSLNo;

        // Increment the last used tender SLNo
        lastTenderSLNo++;

        // Convert the incremented SLNo to a string
        const tenderSLNo = `TENDER_${lastTenderSLNo.toString().padStart(4, '0')}`;

        // Callback with the generated tender SLNo
        callback(tenderSLNo);
    });
}

// API endpoint to add a tender
router.post('/addTender', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role')(req, res, next);
}, (req, res, next) => {
    const tender = req.body;

    // Generate Tender SLNo using the function
    generateTenderSLNo((tenderSLNo) => {
        // Use the generated SLNo in the SQL query
        const query = "INSERT INTO tbl_tender (tender_SLNo, tender_creator_id, tender_date, Project_Name, tender_location, tender_item_id, tender_item_qtity, tender_deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            connection.query(query, [tenderSLNo, tender.tender_creator_id, tender.tender_date, tender.Project_Name, tender.tender_location, tender.tender_item_id, tender.tender_item_qtity, tender.tender_deadline], (err, results) => {
                if (!err) {
                    return res.status(200).json({ message: "Tender Added Successfully" });
                } else {
                    return res.status(500).json(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    });
});

// API endpoint to get all tenders
router.get('/getTender', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role')(req, res, next);
}, (req, res, next) => {
    const query = "SELECT * FROM tbl_tender";
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

// API endpoint to update a tender
router.patch('/updateTender', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role')(req, res, next);
}, (req, res, next) => {
    const tender = req.body;

    const query = "UPDATE tbl_tender SET tender_creator_id = ?, tender_date = ?, Project_Name = ?, tender_location = ?, tender_item_id = ?, tender_item_qtity = ?, tender_deadline = ? WHERE tender_SLNo = ?";
    try {
        connection.query(query, [tender.tender_creator_id, tender.tender_date, tender.Project_Name, tender.tender_location, tender.tender_item_id, tender.tender_item_qtity, tender.tender_deadline, tender.tender_SLNo], (err, results) => {
            if (!err) {
                if (results.affectedRows === 0) {
                    return res.status(404).json({ message: "Tender not found" });
                }
                return res.status(200).json({ message: "Tender updated Successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// API endpoint to delete a tender by SLNo
router.delete('/deleteTenderBySLNo', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role')(req, res, next);
}, (req, res, next) => {
    const tender = req.body;

    const query = "DELETE FROM tbl_tender WHERE tender_SLNo = ?";
    try {
        connection.query(query, [tender.tender_SLNo], (err, results) => {
            if (!err) {
                if (results.affectedRows === 0) {
                    return res.status(404).json({ message: "Tender not found" });
                }
                return res.status(200).json({ message: "Tender deleted Successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;
