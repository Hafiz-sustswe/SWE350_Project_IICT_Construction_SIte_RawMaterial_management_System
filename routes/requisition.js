const express = require('express');
const connection = require('../connection');
require('mysql2/promise');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');

  

//id genration
let lastRequisitionId = 0;


async function getLastRequisitionIdFromDatabase() {
    const query = "SELECT MAX(CAST(SUBSTRING(id, 5) AS UNSIGNED)) AS lastId FROM requisitions";
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
    const { item_id, quantity, purpose, project_name, location } = req.body;

    try {
        const reqId = await generateRequisitionId();
        if (!reqId) {
            return res.status(500).json({ message: "Failed to generate requisition ID" });
        }


        // Access req_creator_id from the decoded token
        const creator_id = res.locals.user.ex_id;

       
        const query =
        "INSERT INTO requisitions (id,creator_id, item_id, quantity, purpose, project_name, location) VALUES (?, ?, ?, ?, ?,?,?)";
        const values = [reqId,creator_id,item_id, quantity, purpose, project_name, location];

        const [created_req] = await connection.promise().query(query, values);
        const selectQuery =
        "SELECT * FROM requisitions WHERE id = LAST_INSERT_ID()";
        const [result] = (await connection.promise().query(selectQuery))[0];


        if( created_req?.affectedRows == 1)
        {
            
         const itemQuery = "SELECT * FROM items WHERE id = ?";
         const [itemResult] = (await connection.promise().query(itemQuery, [item_id]))[0];

         const userQuery = "SELECT ex_id, ex_email , ex_name FROM tbl_user where ex_id = ? ";
         const [userResult] = (await connection.promise().query(userQuery, [creator_id]))[0];

          return res.status(200).json({
              status : 200,
              message : "Requistion Created Successfully",
              success : true,
              data : {
                     ...result ,
                    user : userResult,
                    item: itemResult}});
      }  

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status : 500,
              message : "Error in creating requisition",
              success : false,
              data : error
        });
    }
});


router.patch('/:id', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const { id } = req.params;
    const { item_id, creator_id, quantity, purpose, project_name, location } = req.body;

    const updateColumns = [];
    const updateValues = [];

    if (item_id) {
        updateColumns.push('item_id');
        updateValues.push(item_id);
    }

    if (creator_id) {
        updateColumns.push('creator_id');
        updateValues.push(creator_id);
    }

    if (quantity) {
        updateColumns.push('quantity');
        updateValues.push(quantity);
    }

    if (purpose) {
        updateColumns.push('purpose');
        updateValues.push(purpose);
    }

    if (project_name) {
        updateColumns.push('project_name');
        updateValues.push(project_name);
    }

    if (location) {
        updateColumns.push('location');
        updateValues.push(location);
    }

    const updateQuery = `UPDATE requisitions SET ${updateColumns.map(col => `${col} = ?`).join(', ')} WHERE id = ?`;
    const getByIdQuery = "SELECT * FROM requisitions WHERE id = ?";
    const itemQuery = "SELECT * FROM items WHERE id = ?";
    const userQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";

    try {
        const valuesToUpdate = [...updateValues, id];
        const [updateResult] = await connection.promise().query(updateQuery, valuesToUpdate);

        // Check if the requisition with the given id exists
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                message: "Requisition not found or not updated",
                success: false,
            });
        }

        const [result] = await connection.promise().query(getByIdQuery, [id]);

        // Fetch additional details for the requisition
        const [itemResult] = await connection.promise().query(itemQuery, [item_id]);
        const [userResult] = await connection.promise().query(userQuery, [creator_id]);

        return res.status(200).json({
            status: 200,
            message: "Requisition Updated Successfully",
            success: true,
            data: {
                ...result[0],
                user: userResult[0],
                item: itemResult[0]
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in updating requisition",
            success: false,
            data: error
        });
    }
});


// API endpoint to delete a requisition by ID
router.delete('/:id', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const { id } = req.params;

    const deleteQuery = "DELETE FROM requisitions WHERE id = ?";
    const selectQuery = "SELECT * FROM requisitions WHERE id = ?";
    const itemQuery = "SELECT * FROM items WHERE id = ?";
    const userQuery = "SELECT ex_id, ex_email , ex_name FROM tbl_user WHERE ex_id = ?";

    try {
        const [result] = await connection.promise().query(selectQuery, [id]);
        
        // Check if the requisition with the given id exists
        if (result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Requisition not found",
                success: false,
            });
        }

        // Delete the requisition
        const [delete_result] = await connection.promise().query(deleteQuery, [id]);

        if (delete_result?.affectedRows === 1) {
            // Fetch item details
            const [itemResult] = await connection.promise().query(itemQuery, [result[0].item_id]);

            // Fetch user details
            const [userResult] = await connection.promise().query(userQuery, [result[0].creator_id]);

            return res.status(200).json({
                status: 200,
                message: "Requisition Deleted Successfully",
                success: true,
                data: {
                    ...result[0],
                    user: userResult[0],
                    item: itemResult[0]
                }
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in deleting requisition",
            success: false,
            data: error
        });
    }
});



// API endpoint to get requisitions
router.get('/getAllRequisition', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const getAllQuery = "SELECT * FROM requisitions";
    const itemQuery = "SELECT * FROM items WHERE id = ?";
    const userQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";

    try {
        const [results] = await connection.promise().query(getAllQuery);

        // Fetch additional details for each requisition
        const requisitionsWithDetails = await Promise.all(results.map(async (requisition) => {
            const [itemResult] = await connection.promise().query(itemQuery, [requisition.item_id]);
            const [userResult] = await connection.promise().query(userQuery, [requisition.creator_id]);

            return {
                ...requisition,
                user: userResult[0],
                item: itemResult[0]
            };
        }));

        return res.status(200).json({
            status: 200,
            message: "Requisitions Fetched Successfully",
            success: true,
            data: requisitionsWithDetails
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in fetching requisitions",
            success: false,
            data: error
        });
    }
});

router.get('/:id', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const { id } = req.params;
    const getByIdQuery = "SELECT * FROM requisitions WHERE id = ?";
    const itemQuery = "SELECT * FROM items WHERE id = ?";
    const userQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";

    try {
        const [result] = await connection.promise().query(getByIdQuery, [id]);

        // Check if the requisition with the given id exists
        if (result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Requisition not found",
                success: false,
            });
        }

        // Fetch additional details for the requisition
        const [itemResult] = await connection.promise().query(itemQuery, [result[0].item_id]);
        const [userResult] = await connection.promise().query(userQuery, [result[0].creator_id]);

        return res.status(200).json({
            status: 200,
            message: "Requisition Fetched Successfully",
            success: true,
            data: {
                ...result[0],
                user: userResult[0],
                item: itemResult[0]
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in fetching requisition",
            success: false,
            data: error
        });
    }
});

module.exports = router;
