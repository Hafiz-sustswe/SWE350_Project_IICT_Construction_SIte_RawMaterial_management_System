const express = require('express');
const connection = require('../connection');
require('mysql2/promise');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');

let lastPricedBillId = 0;

async function getLastPricedBillIdFromDatabase() {
    const query = "SELECT MAX(CAST(SUBSTRING(id, 12) AS UNSIGNED)) AS lastId FROM priced_bill";
    try {
        const [results] = await connection.promise().query(query);
        return results[0].lastId || 0;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function generatePricedBillId() {
    try {
        const lastId = await getLastPricedBillIdFromDatabase();
        lastPricedBillId = lastId + 1;
        return `PRICED_BILL_${lastPricedBillId.toString().padStart(4, '0')}`;
    } catch (error) {
        console.log(error);
        return null;
    }
}
router.post('/addPricedBill', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const { tender_id, price, status } = req.body;

    try {
        const pricedBillId = await generatePricedBillId();
        if (!pricedBillId) {
            return res.status(500).json({ message: "Failed to generate priced_bill ID" });
        }

        // Access creator_id from the decoded token
        const creator_id = res.locals.user.ex_id;

        // Fetch quantity from requisition table based on tender_id
        const requisitionQuery = "SELECT quantity FROM requisitions WHERE id IN (SELECT requisition_id FROM tender WHERE id = ?)";
        const [requisitionResult] = await connection.promise().query(requisitionQuery, [tender_id]);

        if (requisitionResult.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Requisition not found for the given tender_id",
                success: false,
            });
        }

        const quantity = requisitionResult[0].quantity;

        // Calculate total_price
        const total_price = price * quantity;

        const query =
            "INSERT INTO priced_bill (id, tender_id, creator_id, price, total_price, status) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [pricedBillId, tender_id, creator_id, price, total_price, status];

        const [created_priced_bill] = await connection.promise().query(query, values);

        if (created_priced_bill?.affectedRows == 1) {
            const selectPricedBillQuery = "SELECT * FROM priced_bill WHERE id = ?";
            const [result] = (await connection.promise().query(selectPricedBillQuery, [pricedBillId]))[0];

            // Fetch other details (tender, requisition, item, user) similar to the previous example

            return res.status(200).json({
                status: 200,
                message: "Priced Bill Created Successfully",
                success: true,
                data: {
                    ...result,
                    user: userResult,
                    tender: tenderResult,
                    requisition: {
                        ...requisitionResult,
                        item: itemResult,
                    },
                }
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in creating priced_bill",
            success: false,
            data: error
        });
    }
});
