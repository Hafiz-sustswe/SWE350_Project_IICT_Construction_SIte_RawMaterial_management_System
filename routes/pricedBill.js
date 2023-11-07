const express = require('express');
const connection = require('../connection');
require('mysql2/promise');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');
let lastPricedBillId = 0;

async function getLastPricedBillIdFromDatabase() {
    const query = "SELECT MAX(CAST(SUBSTRING(id, 13) AS UNSIGNED)) AS lastId FROM priced_bill";
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

        // Fetch quantity and item_id from requisition table based on tender_id
        const requisitionQuery = "SELECT quantity, item_id FROM requisitions WHERE id IN (SELECT requisition_id FROM tender WHERE id = ?)";
        const [requisitionResult] = await connection.promise().query(requisitionQuery, [tender_id]);

        if (requisitionResult.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Requisition not found for the given tender_id",
                success: false,
            });
        }

        const quantity = requisitionResult[0].quantity;
        const item_id = requisitionResult[0].item_id;

        // Calculate total_price
        const total_price = price * quantity;

        const query =
            "INSERT INTO priced_bill (id, tender_id, creator_id, price, total_price, status) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [pricedBillId, tender_id, creator_id, price, total_price, status];

        const [created_priced_bill] = await connection.promise().query(query, values);

        if (created_priced_bill?.affectedRows == 1) {
            const selectPricedBillQuery = "SELECT * FROM priced_bill WHERE id = ?";
            const [result] = (await connection.promise().query(selectPricedBillQuery, [pricedBillId]))[0];

            const selectTenderQuery = "SELECT * FROM tender WHERE id = ?";
            const [tenderResult] = (await connection.promise().query(selectTenderQuery, [tender_id]))[0];

            const userQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
            const [userResult] = (await connection.promise().query(userQuery, [creator_id]))[0];

            // Fetch item details based on item_id
            const itemQuery = "SELECT * FROM items WHERE id = ?";
            const [itemResult] = (await connection.promise().query(itemQuery, [item_id]))[0];

            return res.status(200).json({
                status: 200,
                message: "Priced Bill Created Successfully",
                success: true,
                data: {
                    ...result,
                    user: userResult,
                    tender: {
                        ...tenderResult,
                        requisition: {
                            ...requisitionResult[0],
                            item: itemResult,
                        },
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
router.get('/getAllPricedBill', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    try {
        // Fetch all priced bills
        const selectPricedBillQuery = "SELECT * FROM priced_bill";
        const [pricedBills] = await connection.promise().query(selectPricedBillQuery);

        // Array to store the final result
        const pricedBillDetails = [];

        // Loop through each priced bill to fetch additional details
        for (const pricedBill of pricedBills) {
            const selectTenderQuery = "SELECT * FROM tender WHERE id = ?";
            const [tenderResult] = await connection.promise().query(selectTenderQuery, [pricedBill.tender_id]);

            const selectRequisitionQuery = "SELECT * FROM requisitions WHERE id = ?";
            const [requisitionResult] = await connection.promise().query(selectRequisitionQuery, [tenderResult[0]?.requisition_id]);

            const itemQuery = "SELECT * FROM items WHERE id = ?";
            const [itemResult] = await connection.promise().query(itemQuery, [requisitionResult[0]?.item_id]);

            const userQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
            const [userResult] = await connection.promise().query(userQuery, [pricedBill.creator_id]);

            // Calculate total price based on price and quantity
            const totalPrice = pricedBill.price * (requisitionResult[0]?.quantity || 0);

            // Add details for the current priced bill to the array
            pricedBillDetails.push({
                ...pricedBill,
                user: userResult[0],
                tender: {
                    ...tenderResult[0],
                    requisition: {
                        ...requisitionResult[0],
                        item: itemResult[0],
                    },
                },
                total_price: totalPrice,
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Priced Bills fetched Successfully",
            success: true,
            data: pricedBillDetails,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in fetching Priced Bills",
            success: false,
            data: error
        });
    }
});
router.get('/:id', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the priced bill with the given ID
        const selectPricedBillQuery = "SELECT * FROM priced_bill WHERE id = ?";
        const [pricedBillResult] = await connection.promise().query(selectPricedBillQuery, [id]);

        // Check if the priced bill with the given ID exists
        if (pricedBillResult.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Priced Bill not found",
                success: false,
            });
        }

        const selectTenderQuery = "SELECT * FROM tender WHERE id = ?";
        const [tenderResult] = await connection.promise().query(selectTenderQuery, [pricedBillResult[0]?.tender_id]);

        const selectRequisitionQuery = "SELECT * FROM requisitions WHERE id = ?";
        const [requisitionResult] = await connection.promise().query(selectRequisitionQuery, [tenderResult[0]?.requisition_id]);

        const itemQuery = "SELECT * FROM items WHERE id = ?";
        const [itemResult] = await connection.promise().query(itemQuery, [requisitionResult[0]?.item_id]);

        const userQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
        const [userResult] = await connection.promise().query(userQuery, [pricedBillResult[0]?.creator_id]);

        // Calculate total price based on price and quantity
        const totalPrice = pricedBillResult[0]?.price * (requisitionResult[0]?.quantity || 0);

        return res.status(200).json({
            status: 200,
            message: "Priced Bill fetched Successfully",
            success: true,
            data: {
                ...pricedBillResult[0],
                user: userResult[0],
                tender: {
                    ...tenderResult[0],
                    requisition: {
                        ...requisitionResult[0],
                        item: itemResult[0],
                    },
                },
                total_price: totalPrice,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in fetching Priced Bill",
            success: false,
            data: error
        });
    }
});
router.patch('/:id', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const { id } = req.params;
    const { tender_id, price, status } = req.body;
    const creator_id = res.locals.user.ex_id;

    // Calculate total_price based on requisition quantity and price
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

    // Construct the update query with the calculated total_price
    const updateQuery = "UPDATE priced_bill SET tender_id = ?, creator_id = ?, price = ?, total_price = ?, status = ? WHERE id = ?";
    const valuesToUpdate = [tender_id, creator_id, price, total_price, status, id];

    try {
        const [updateResult] = await connection.promise().query(updateQuery, valuesToUpdate);

        // Check if the priced_bill with the given id exists
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                message: "Priced Bill not found or not updated",
                success: false,
            });
        }

        // Fetch additional details for the updated priced_bill
        const [result] = await connection.promise().query("SELECT * FROM priced_bill WHERE id = ?", [id]);

        // Fetch additional details for the tender associated with the priced_bill
        const [tenderResult] = await connection.promise().query("SELECT * FROM tender WHERE id = ?", [tender_id]);

        // Fetch additional details for the requisition associated with the tender
        const [requisitionResult] = await connection.promise().query("SELECT * FROM requisitions WHERE id = ?", [tenderResult[0].requisition_id]);

        // Fetch additional details for the item associated with the requisition
        const [itemResult] = await connection.promise().query("SELECT * FROM items WHERE id = ?", [requisitionResult[0].item_id]);

        // Fetch additional details for the user associated with the creator_id
        const [userResult] = await connection.promise().query("SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?", [creator_id]);

        return res.status(200).json({
            status: 200,
            message: "Priced Bill Updated Successfully",
            success: true,
            data: {
                ...result[0],
                user: userResult[0],
                tender: {
                    ...tenderResult[0],
                    requisition: {
                        ...requisitionResult[0],
                        item: itemResult[0],
                    },
                },
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in updating priced_bill",
            success: false,
            data: error,
        });
    }
});
router.delete('/:id', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch priced bill details
        const selectPricedBillQuery = "SELECT * FROM priced_bill WHERE id = ?";
        const [result] = await connection.promise().query(selectPricedBillQuery, [id]);

        // Check if the priced bill with the given id exists
        if (result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Priced Bill not found",
                success: false,
            });
        }

        // Fetch additional details for the tender associated with the priced bill
        const selectTenderQuery = "SELECT * FROM tender WHERE id = ?";
        const [tenderResult] = await connection.promise().query(selectTenderQuery, [result[0].tender_id]);

        // Check if the tender for the priced bill is found
        if (tenderResult.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Tender not found for the priced bill",
                success: false,
            });
        }

        // Fetch additional details for the tender
        const selectRequisitionQuery = "SELECT * FROM requisitions WHERE id = ?";
        const [requisitionResult] = await connection.promise().query(selectRequisitionQuery, [tenderResult[0].requisition_id]);

        // Check if the requisition for the tender is found
        if (requisitionResult.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Requisition not found for the given tender",
                success: false,
            });
        }

        // Fetch additional details for the requisition
        const itemQuery = "SELECT * FROM items WHERE id = ?";
        const [itemResult] = await connection.promise().query(itemQuery, [requisitionResult[0].item_id]);

        // Delete the priced bill from the database
        const deleteQuery = "DELETE FROM priced_bill WHERE id = ?";
        const [deleteResult] = await connection.promise().query(deleteQuery, [id]);

        // Check if the priced bill was successfully deleted
        if (deleteResult.affectedRows === 1) {
            return res.status(200).json({
                status: 200,
                message: "Priced Bill Deleted Successfully",
                success: true,
                data: {
                    ...result[0],
                    tender: {
                        ...tenderResult[0],
                        requisition: {
                            ...requisitionResult[0],
                            item: itemResult[0],
                        },
                    },
                },
            });
        } else {
            return res.status(500).json({
                status: 500,
                message: "Error in deleting priced bill",
                success: false,
                data: "Unexpected error occurred while deleting priced bill",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in deleting priced bill",
            success: false,
            data: error,
        });
    }
});


module.exports = router;
