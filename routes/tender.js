const express = require('express');
const connection = require('../connection');
require('mysql2/promise');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');

let lastTenderSLNo = 0;

async function getLastTenderSLNoFromDatabase() {
    const query = "SELECT MAX(CAST(SUBSTRING(tender_SLNo, 8) AS UNSIGNED)) AS lastSLNo FROM tbl_tender";
    try {
        const [results] = await connection.promise().query(query);
        return results[0].lastSLNo || 0;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function generateTenderSLNo() {
    try {
        const lastSLNo = await getLastTenderSLNoFromDatabase();
        lastTenderSLNo = lastSLNo + 1;
        return `TENDER_${lastTenderSLNo.toString().padStart(4, '0')}`;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// API endpoint to add a tender
router.post('/addTender', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const tender = req.body;

    try {
        const tenderSLNo = await generateTenderSLNo();
        if (!tenderSLNo) {
            return res.status(500).json({ message: "Failed to generate tender SLNo" });
        }

        const query = "INSERT INTO tbl_tender (tender_SLNo, tender_creator_id, tender_date, Project_Name, tender_location, tender_item_id, tender_item_qtity, tender_deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const [results] = await connection.promise().query(query, [tenderSLNo, tender.tender_creator_id, tender.tender_date, tender.Project_Name, tender.tender_location, tender.tender_item_id, tender.tender_item_qtity, tender.tender_deadline]);

        return res.status(200).json({ message: "Tender Added Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

// API endpoint to get all tenders
router.get('/getTender', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const query = "SELECT * FROM tbl_tender";
    try {
        const [results] = await connection.promise().query(query);
        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

// API endpoint to update a tender
router.patch('/updateTender', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const tender = req.body;

    const query = "UPDATE tbl_tender SET tender_creator_id = ?, tender_date = ?, Project_Name = ?, tender_location = ?, tender_item_id = ?, tender_item_qtity = ?, tender_deadline = ? WHERE tender_SLNo = ?";
    try {
        const [results] = await connection.promise().query(query, [tender.tender_creator_id, tender.tender_date, tender.Project_Name, tender.tender_location, tender.tender_item_id, tender.tender_item_qtity, tender.tender_deadline, tender.tender_SLNo]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Tender not found" });
        }
        return res.status(200).json({ message: "Tender updated Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

// API endpoint to delete a tender by SLNo
router.delete('/deleteTenderBySLNo', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const tender = req.body;

    const query = "DELETE FROM tbl_tender WHERE tender_SLNo = ?";
    try {
        const [results] = await connection.promise().query(query, [tender.tender_SLNo]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Tender not found" });
        }
        return res.status(200).json({ message: "Tender deleted Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

module.exports = router;
