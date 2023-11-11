const express = require('express');
const connection = require('../connection');
require('mysql2/promise');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');

let lastReceiptId = 0;

async function getLastReceiptIdFromDatabase() {
    const query = "SELECT MAX(CAST(SUBSTRING(id, 9) AS UNSIGNED)) AS lastId FROM receipt";
    try {
        const [results] = await connection.promise().query(query);
        return results[0].lastId || 0;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function generateReceiptId() {
    try {
        const lastId = await getLastReceiptIdFromDatabase();
        lastReceiptId = lastId + 1;
        return `RECEIPT_${lastReceiptId.toString().padStart(4, '0')}`;
    } catch (error) {
        console.log(error);
        return null;
    }
}

router.post('/createReceipt', auth.authenticateToken, checkRole.checkRole([4], 'role'), async (req, res) => {
    const { priced_bill_id, expected_delivery_date} = req.body;

    try {
        const receiptId = await generateReceiptId();
        if (!receiptId) {
            return res.status(500).json({ message: "Failed to generate receipt ID" });
        }

        // Access creator_id from the decoded token
        const creator_id = res.locals.user.ex_id;

        const query =
            "INSERT INTO receipt (id, priced_bill_id, expected_delivery_date, creator_id) VALUES (?, ?, ?, ?)";
        const values = [receiptId, priced_bill_id, expected_delivery_date,  creator_id];

        const [created_receipt] = await connection.promise().query(query, values);

        if (created_receipt?.affectedRows === 1) {
            // Fetch details for the created receipt
            const selectReceiptQuery =
                "SELECT * FROM receipt WHERE id = ?";
            const [receiptResult] = await connection.promise().query(selectReceiptQuery, [receiptId]);

            // Fetch details for the associated priced_bill
            const selectPricedBillQuery =
                "SELECT * FROM priced_bill WHERE id = ?";
            const [pricedBillResult] = await connection.promise().query(selectPricedBillQuery, [priced_bill_id]);

            // Fetch details for the associated tender
            const selectTenderQuery =
                "SELECT * FROM tender WHERE id = ?";
            const [tenderResult] = await connection.promise().query(selectTenderQuery, [pricedBillResult[0].tender_id]);

            // Fetch details for the associated requisition
            const selectRequisitionQuery =
                "SELECT * FROM requisitions WHERE id = ?";
            const [requisitionResult] = await connection.promise().query(selectRequisitionQuery, [tenderResult[0].requisition_id]);

            // Fetch details for the associated item
            const selectItemQuery =
                "SELECT * FROM items WHERE id = ?";
            const [itemResult] = await connection.promise().query(selectItemQuery, [requisitionResult[0].item_id]);

            // Fetch details for the creator user
            const selectUserQuery =
                "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
            const [userResult] = await connection.promise().query(selectUserQuery, [creator_id]);

            return res.status(200).json({
                status: 200,
                message: "Receipt Created Successfully",
                success: true,
                data: {
                    ...receiptResult[0],
                    priced_bill: {
                        ...pricedBillResult[0],
                        tender: {
                            ...tenderResult[0],
                            requisition: {
                                ...requisitionResult[0],
                                item: itemResult[0]
                            }
                        },
                        user: userResult[0]
                    }
                }
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in creating receipt",
            success: false,
            data: error
        });
    }
});

// Get all receipts
router.get('/getAllReceipts', auth.authenticateToken, checkRole.checkRole([4], 'role'), async (req, res) => {
    try {
        // Fetch all receipts
        const selectReceiptsQuery = "SELECT * FROM receipt";
        const [receipts] = await connection.promise().query(selectReceiptsQuery);

        // Array to store the final result
        const receiptDetails = [];

        // Loop through each receipt to fetch additional details
        for (const receipt of receipts) {
            // Fetch details for the created receipt
            const selectReceiptQuery =
                "SELECT * FROM receipt WHERE id = ?";
            const [receiptResult] = await connection.promise().query(selectReceiptQuery, [receipt.id]);

            // Fetch details for the associated priced_bill
            const selectPricedBillQuery =
                "SELECT * FROM priced_bill WHERE id = ?";
            const [pricedBillResult] = await connection.promise().query(selectPricedBillQuery, [receipt.priced_bill_id]);

            // Fetch details for the associated tender
            const selectTenderQuery =
                "SELECT * FROM tender WHERE id = ?";
            const [tenderResult] = await connection.promise().query(selectTenderQuery, [pricedBillResult[0].tender_id]);

            // Fetch details for the associated requisition
            const selectRequisitionQuery =
                "SELECT * FROM requisitions WHERE id = ?";
            const [requisitionResult] = await connection.promise().query(selectRequisitionQuery, [tenderResult[0].requisition_id]);

            // Fetch details for the associated item
            const selectItemQuery =
                "SELECT * FROM items WHERE id = ?";
            const [itemResult] = await connection.promise().query(selectItemQuery, [requisitionResult[0].item_id]);

            // Fetch details for the creator user
            const selectUserQuery =
                "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
            const [userResult] = await connection.promise().query(selectUserQuery, [receipt.creator_id]);


            // Add details for the current receipt to the array
            receiptDetails.push({
              
                    ...receiptResult[0],
                    priced_bill: {
                        ...pricedBillResult[0],
                        tender: {
                            ...tenderResult[0],
                            requisition: {
                                ...requisitionResult[0],
                                item: itemResult[0]
                            }
                        },
                        user: userResult[0]
                    
                }
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Receipts fetched Successfully",
            success: true,
            data: receiptDetails,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in fetching receipts",
            success: false,
            data: error
        });
    }
});

// Get receipt by ID
router.get('/:id', auth.authenticateToken, checkRole.checkRole([4], 'role'), async (req, res) => {
    const { id } = req.params;

    try {
        const selectReceiptQuery = "SELECT * FROM receipt WHERE id = ?";
        const [receiptResult] = (await connection.promise().query(selectReceiptQuery, [id]))[0];
        // Check if the receipt with the given id exists
        if (receiptResult.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Receipt not found",
                success: false,
            });
        }

        // Fetch details for the associated priced_bill
        const selectPricedBillQuery =
            "SELECT * FROM priced_bill WHERE id = ?";
        const [pricedBillResult] = await connection.promise().query(selectPricedBillQuery, [receiptResult.priced_bill_id]);

        // Fetch details for the associated tender
        const selectTenderQuery =
            "SELECT * FROM tender WHERE id = ?";
        const [tenderResult] = await connection.promise().query(selectTenderQuery, [pricedBillResult[0].tender_id]);

        // Fetch details for the associated requisition
        const selectRequisitionQuery =
            "SELECT * FROM requisitions WHERE id = ?";
        const [requisitionResult] = await connection.promise().query(selectRequisitionQuery, [tenderResult[0].requisition_id]);

        // Fetch details for the associated item
        const selectItemQuery =
            "SELECT * FROM items WHERE id = ?";
        const [itemResult] = await connection.promise().query(selectItemQuery, [requisitionResult[0].item_id]);

        // Fetch details for the creator user
        const selectUserQuery =
            "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
        const [userResult] = await connection.promise().query(selectUserQuery, [receiptResult.creator_id]);

        return res.status(200).json({
            status: 200,
            message: "Receipt Fetched Successfully",
            success: true,
            data: {
                ...receiptResult,
                priced_bill: {
                    ...pricedBillResult[0],
                    tender: {
                        ...tenderResult[0],
                        requisition: {
                            ...requisitionResult[0],
                            item: itemResult[0]
                        }
                    },
                    user: userResult[0]
                }
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in fetching receipt",
            success: false,
            data: error
        });
    }
});

router.patch('/:id', auth.authenticateToken, checkRole.checkRole([4], 'role'), async (req, res) => {
    const { id } = req.params;
    const { priced_bill_id, expected_delivery_date, damaged_quantity, receiver_id } = req.body;

    const updateColumns = [];
    const updateValues = [];

    if (priced_bill_id !== undefined) {
        updateColumns.push('priced_bill_id');
        updateValues.push(priced_bill_id);
    }

    if (expected_delivery_date !== undefined) {
        updateColumns.push('expected_delivery_date');
        updateValues.push(expected_delivery_date);
    }

    if (damaged_quantity !== undefined) {
        updateColumns.push('damaged_quantity');
        updateValues.push(damaged_quantity);
    }

    if (receiver_id !== undefined) {
        updateColumns.push('receiver_id');
        updateValues.push(receiver_id);
    }

    // Build the SET part of the update query dynamically
    const setClause = updateColumns.map(col => `${col} = ?`).join(', ');

    const updateQuery = `UPDATE receipt SET ${setClause} WHERE id = ?`;
    const valuesToUpdate = [...updateValues, id];

    try {
        const [updateResult] = await connection.promise().query(updateQuery, valuesToUpdate);

        // Check if the receipt with the given id exists
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                message: "Receipt not found or not updated",
                success: false,
            });
        }

        // Fetch additional details for the updated receipt
        const getByIdQuery = "SELECT * FROM receipt WHERE id = ?";
        const [result] = await connection.promise().query(getByIdQuery, [id]);

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Receipt not found",
                success: false,
            });
        }

        // Fetch additional details for the associated priced_bill
        const selectPricedBillQuery = "SELECT * FROM priced_bill WHERE id = ?";
        const [pricedBillResult] = await connection.promise().query(selectPricedBillQuery, [result[0].priced_bill_id]);

        // Fetch additional details for the associated tender
        const selectTenderQuery = "SELECT * FROM tender WHERE id = ?";
        const [tenderResult] = await connection.promise().query(selectTenderQuery, [pricedBillResult[0].tender_id]);

        // Fetch additional details for the associated requisition
        const selectRequisitionQuery = "SELECT * FROM requisitions WHERE id = ?";
        const [requisitionResult] = await connection.promise().query(selectRequisitionQuery, [tenderResult[0].requisition_id]);

        // Fetch additional details for the associated item
        const selectItemQuery = "SELECT * FROM items WHERE id = ?";
        const [itemResult] = await connection.promise().query(selectItemQuery, [requisitionResult[0].item_id]);

        // Fetch additional details for the user associated with the creator_id
        const selectUserQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
        const [userResult] = await connection.promise().query(selectUserQuery, [result[0].creator_id]);

        return res.status(200).json({
            status: 200,
            message: "Receipt Updated Successfully",
            success: true,
            data: {
                ...result[0],
                priced_bill: {
                    ...pricedBillResult[0],
                    tender: {
                        ...tenderResult[0],
                        requisition: {
                            ...requisitionResult[0],
                            item: itemResult[0],
                        },
                    },
                    user: userResult[0],
                },
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in updating receipt",
            success: false,
            data: error,
        });
    }
});

router.delete('/:id', auth.authenticateToken, checkRole.checkRole([4], 'role'), async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch receipt details
        const selectReceiptQuery = "SELECT * FROM receipt WHERE id = ?";
        const [result] = await connection.promise().query(selectReceiptQuery, [id]);

        // Check if the receipt with the given id exists
        if (result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Receipt not found",
                success: false,
            });
        }

        // Fetch additional details for the associated priced_bill
        const selectPricedBillQuery = "SELECT * FROM priced_bill WHERE id = ?";
        const [pricedBillResult] = await connection.promise().query(selectPricedBillQuery, [result[0].priced_bill_id]);

        // Fetch additional details for the associated tender
        const selectTenderQuery = "SELECT * FROM tender WHERE id = ?";
        const [tenderResult] = await connection.promise().query(selectTenderQuery, [pricedBillResult[0].tender_id]);

        // Fetch additional details for the associated requisition
        const selectRequisitionQuery = "SELECT * FROM requisitions WHERE id = ?";
        const [requisitionResult] = await connection.promise().query(selectRequisitionQuery, [tenderResult[0].requisition_id]);

        // Fetch additional details for the associated item
        const itemQuery = "SELECT * FROM items WHERE id = ?";
        const [itemResult] = await connection.promise().query(itemQuery, [requisitionResult[0].item_id]);

        // Fetch additional details for the user associated with the creator_id
        const selectUserQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
        const [userResult] = await connection.promise().query(selectUserQuery, [result[0].creator_id]);

        // Delete the receipt from the database
        const deleteQuery = "DELETE FROM receipt WHERE id = ?";
        const [deleteResult] = await connection.promise().query(deleteQuery, [id]);

        // Check if the receipt was successfully deleted
        if (deleteResult.affectedRows === 1) {
            return res.status(200).json({
                status: 200,
                message: "Receipt Deleted Successfully",
                success: true,
                data: {
                    ...result[0],
                    priced_bill: {
                        ...pricedBillResult[0],
                        tender: {
                            ...tenderResult[0],
                            requisition: {
                                ...requisitionResult[0],
                                item: itemResult[0],
                            },
                        },
                    },
                    user: userResult[0],
                },
            });
        } else {
            return res.status(500).json({
                status: 500,
                message: "Error in deleting receipt",
                success: false,
                data: "Unexpected error occurred while deleting receipt",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in deleting receipt",
            success: false,
            data: error,
        });
    }
});



module.exports = router;