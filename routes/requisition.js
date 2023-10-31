const express = require('express');
const connection = require('../connection');
require('mysql2/promise');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');

let lastRequisitionId = 0;

async function getLastRequisitionIdFromDatabase() {
    const query = "SELECT MAX(CAST(SUBSTRING(req_id, 5) AS UNSIGNED)) AS lastId FROM tbl_requisition_detail";
    try {
        const [results] = await connection.promise().query(query);
        return results[0].lastId || 0;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function generateRequisitionId() {
    try {
        const lastId = await getLastRequisitionIdFromDatabase();
        lastRequisitionId = lastId + 1;
        return `REQ_${lastRequisitionId.toString().padStart(4, '0')}`;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// API endpoint to add a requisition
router.post('/addRequisition', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const requisition = req.body;

    try {
        const reqId = await generateRequisitionId();
        if (!reqId) {
            return res.status(500).json({ message: "Failed to generate requisition ID" });
        }

        const query = "INSERT INTO tbl_requisition_detail (req_id, req_creator_id, req_date, req_item_id, req_qtity, purpose) VALUES (?, ?, ?, ?, ?, ?)";
        const [results] = await connection.promise().query(query, [reqId, requisition.req_creator_id, requisition.req_date, requisition.req_item_id, requisition.req_qtity, requisition.purpose]);

        return res.status(200).json({ message: "Requisition Added Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

// API endpoint to update a requisition
router.patch('/updateRequisition', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const requisition = req.body;

    const query = "UPDATE tbl_requisition_detail SET req_item_id = ?, req_qtity = ?, purpose = ? WHERE req_id = ?";
    try {
        const [results] = await connection.promise().query(query, [requisition.req_item_id, requisition.req_qtity, requisition.purpose, requisition.req_id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Requisition not found" });
        }
        return res.status(200).json({ message: "Requisition updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

// API endpoint to delete a requisition by ID
router.delete('/deleteRequisitionById', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const requisition = req.body;

    const query = "DELETE FROM tbl_requisition_detail WHERE req_id = ?";
    try {
        const [results] = await connection.promise().query(query, [requisition.req_id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Requisition not found" });
        }
        return res.status(200).json({ message: "Requisition deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

// API endpoint to get requisitions
router.get('/getRequisition', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const query = "SELECT * FROM tbl_requisition_detail";
    try {
        const [results] = await connection.promise().query(query);
        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

module.exports = router;
