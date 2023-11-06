const express = require('express');
const connection = require('../connection');
require('mysql2/promise');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');
// ID generation for tender
// id generation
let lastTenderId = 0;

async function getLastTenderIdFromDatabase() {
    const query = "SELECT MAX(CAST(SUBSTRING(id, 8) AS UNSIGNED)) AS lastId FROM tender";
    try {
        const [results] = await connection.promise().query(query);
        return results[0].lastId || 0;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function generateTenderId() {
    try {
        const lastId = await getLastTenderIdFromDatabase();
        lastTenderId = lastId + 1;
        return `TENDER_${lastTenderId.toString().padStart(4, '0')}`;
    } catch (error) {
        console.log(error);
        return null;
    }
}
router.post('/addTender', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const { requisition_id, deadline } = req.body;

    try {
        const tenderId = await generateTenderId();
        if (!tenderId) {
            return res.status(500).json({ message: "Failed to generate tender ID" });
        }

        // Access creator_id from the decoded token
        const creator_id = res.locals.user.ex_id;

        const query =
            "INSERT INTO tender (id, requisition_id, creator_id, deadline) VALUES (?, ?, ?, ?)";
        const values = [tenderId, requisition_id, creator_id, deadline];

        const [created_tender] = await connection.promise().query(query, values);
        
        
        if (created_tender?.affectedRows == 1) {
            const selectTenderQuery = "SELECT * FROM tender WHERE id = ?";
            const [result] = (await connection.promise().query(selectTenderQuery,[tenderId]))[0];

            const selectRequisitionQuery = "SELECT * FROM requisitions WHERE id = ?";
            const [requisitionResult] = (await connection.promise().query(selectRequisitionQuery,[result.requisition_id]))[0];
            
            const itemQuery = "SELECT * FROM items WHERE id = ?";
            const [itemResult] = (await connection.promise().query(itemQuery, [requisitionResult.item_id]))[0];

            const userQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
            const [userResult] = (await connection.promise().query(userQuery, [creator_id]))[0];

            return res.status(200).json({
                status: 200,
                message: "Tender Created Successfully",
                success: true,
                data: {
                    ...result,
                    user: userResult,
                    requisition: {
                        ...requisitionResult,
                            item: itemResult}
                    
                }
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in creating tender",
            success: false,
            data: error
        });
    }
});



// API endpoint to update a tender
router.patch('/:id', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const { id } = req.params;
    const { requisition_id, creator_id, deadline } = req.body;

    const updateColumns = [];
    const updateValues = [];

    if (requisition_id) {
        updateColumns.push('requisition_id');
        updateValues.push(requisition_id);
    }

    if (creator_id) {
        updateColumns.push('creator_id');
        updateValues.push(creator_id);
    }

    if (deadline) {
        updateColumns.push('deadline');
        updateValues.push(deadline);
    }

    const updateQuery = `UPDATE tender SET ${updateColumns.map(col => `${col} = ?`).join(', ')} WHERE id = ?`;

    try {
        const valuesToUpdate = [...updateValues, id];
        const [updateResult] = await connection.promise().query(updateQuery, valuesToUpdate);

        // Check if the tender with the given id exists
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                message: "Tender not found or not updated",
                success: false,
            });
        }
        
            const selectTenderQuery = "SELECT * FROM tender WHERE id = ?";
            const [result] = (await connection.promise().query(selectTenderQuery,[id]))[0];

            const selectRequisitionQuery = "SELECT * FROM requisitions WHERE id = ?";
            const [requisitionResult] = (await connection.promise().query(selectRequisitionQuery,[result.requisition_id]))[0];
            
            const itemQuery = "SELECT * FROM items WHERE id = ?";
            const [itemResult] = (await connection.promise().query(itemQuery, [requisitionResult.item_id]))[0];

            const userQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
            const [userResult] = (await connection.promise().query(userQuery, [creator_id]))[0];


        return res.status(200).json({
            status: 200,
            message: "Tender Updated Successfully",
            success: true,
            data: {
                ...result,
                user: userResult,
                requisition: {
                    ...requisitionResult,
                    item: itemResult,
                },
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in updating tender",
            success: false,
            data: error
        });
    }
});



// API endpoint to delete a tender by ID
router.delete('/:id', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const { id } = req.params;
    try {
        const selectTenderQuery = "SELECT * FROM tender WHERE id = ?";
        const [result] = (await connection.promise().query(selectTenderQuery,[id]))[0];

        // Check if the tender with the given id exists
        if (result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Tender not found",
                success: false,
            });
        }

        // Delete the tender
        const deleteQuery = "DELETE FROM tender WHERE id = ?";
        const [delete_result] = await connection.promise().query(deleteQuery, [id])[0];

        if (delete_result?.affectedRows === 1) {
            // Fetch requisition details
            
            const selectRequisitionQuery = "SELECT * FROM requisitions WHERE id = ?";
            const [requisitionResult] = (await connection.promise().query(selectRequisitionQuery,[result.requisition_id]))[0];
            
            const itemQuery = "SELECT * FROM items WHERE id = ?";
            const [itemResult] = (await connection.promise().query(itemQuery, [requisitionResult.item_id]))[0];

            const userQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
            const [userResult] = (await connection.promise().query(userQuery, [result.creator_id]))[0];
            return res.status(200).json({
                status: 200,
                message: "Tender Deleted Successfully",
                success: true,
                data: {
                    ...result,
                    user: userResult,
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
            message: "Error in deleting tender",
            success: false,
            data: error
        });
    }
});

// API endpoint to get tenders
//--done
router.get('/getAllTender', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    
    try {
        // Fetch additional details for each tender
            const selectTenderQuery = "SELECT * FROM tender";
            const [result] = (await connection.promise().query(selectTenderQuery))[0];

            const selectRequisitionQuery = "SELECT * FROM requisitions WHERE id = ?";
            const [requisitionResult] = (await connection.promise().query(selectRequisitionQuery,[result.requisition_id]))[0];
            
            const itemQuery = "SELECT * FROM items WHERE id = ?";
            const [itemResult] = (await connection.promise().query(itemQuery, [requisitionResult.item_id]))[0];

            const userQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
            const [userResult] = (await connection.promise().query(userQuery, [result.creator_id]))[0];


        return res.status(200).json({
            status: 200,
            message: "Tender fetched Successfully",
            success: true,
            data: {
                ...result,
                user: userResult,
                requisition: {
                    ...requisitionResult,
                    item: itemResult,
                },
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in fetching tenders",
            success: false,
            data: error
        });
    }
});

router.get('/:id', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const { id } = req.params;
    const getByIdQuery = "SELECT * FROM tender WHERE id = ?";
    const requisitionQuery = "SELECT * FROM requisitions WHERE id = ?";
    const userQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
    const itemQuery = "SELECT * FROM items WHERE id = ?";

    try {
        const [result] = await connection.promise().query(getByIdQuery, [id]);

        // Check if the tender with the given id exists
        if (result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Tender not found",
                success: false,
            });
        }

        // Fetch additional details for the tender
        const [requisitionResult] = await connection.promise().query(requisitionQuery, [result[0].requisition_id]);
        const [userResult] = await connection.promise().query(userQuery, [result[0].creator_id]);
        const [itemResult] = (await connection.promise().query(itemQuery, [requisitionResult.item_id]))[0];
        return res.status(200).json({
            status: 200,
            message: "Tender Fetched Successfully",
            success: true,
            data: {
                ...result[0],
                user: userResult[0],
                item: itemResult,
                requisition: requisitionResult[0]
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in fetching tender",
            success: false,
            data: error
        });
    }
});




module.exports = router;
