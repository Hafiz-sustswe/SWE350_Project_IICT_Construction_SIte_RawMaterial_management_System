const express = require('express');
const connection = require('../connection');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkrole');

// Function to generate inventory ID
let lastInventoryId = 0;

async function getLastInventoryIdFromDatabase() {
    const query = "SELECT MAX(CAST(SUBSTRING(id, 11) AS UNSIGNED)) AS lastId FROM inventory";
    try {
        const [results] = await connection.promise().query(query);
        return results[0].lastId || 0;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function generateInventoryId() {
    try {
        const lastId = await getLastInventoryIdFromDatabase();
        lastInventoryId = lastId + 1;
        return `INVENTORY_${lastInventoryId.toString().padStart(4, '0')}`;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Create API endpoint for inventory
router.post('/addInventory', auth.authenticateToken, async (req, res) => {
    const { item_id, quantity_in, quantity_out  } = req.body;
    const manager_id = res.locals.user.ex_id;
    try {
        const inventoryId = await generateInventoryId();
        if (!inventoryId) {
            return res.status(500).json({ message: "Failed to generate inventory ID" });
        }

        const query =
            "INSERT INTO inventory (id, item_id, quantity_in, quantity_out, manager_id) VALUES (?, ?, ?, ?, ?)";
        const values = [inventoryId, item_id, quantity_in, quantity_out, manager_id];

        const [created_inventory] = await connection.promise().query(query, values);

        if (created_inventory?.affectedRows == 1) {
            const selectInventoryQuery =
                "SELECT * FROM inventory WHERE id = ?";
            const [result] = (await connection.promise().query(selectInventoryQuery, [inventoryId]))[0];

            // Fetch additional details for the associated item
            const selectItemQuery =
                "SELECT * FROM items WHERE id = ?";
            const [itemResult] = await connection.promise().query(selectItemQuery, [item_id]);

            // Fetch additional details for the user associated with the manager_id
            const selectUserQuery =
                "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
            const [userResult] = await connection.promise().query(selectUserQuery, [manager_id]);

            return res.status(200).json({
                status: 200,
                message: "Inventory Created Successfully",
                success: true,
                data: {
                    ...result,
                    item: itemResult[0],
                    manager: userResult[0],
                },
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in creating inventory",
            success: false,
            data: error,
        });
    }
});
router.get('/getAllInventory', auth.authenticateToken, checkRole.checkRole([3], 'role'), async (req, res) => {
    try {
        const selectInventoryQuery = "SELECT * FROM inventory";
        const [inventoryResult] = await connection.promise().query(selectInventoryQuery);

        const inventoryDetails = await Promise.all(
            inventoryResult.map(async (inventory) => {
                const itemDetails = await getItemDetailsById(inventory.item_id);
                const managerDetails = await getUserDetailsById(inventory.manager_id);

                return {
                    ...inventory,
                    item: itemDetails,
                    manager: managerDetails,
                };
            })
        );

        return res.status(200).json({
            status: 200,
            message: "All Inventory Fetched Successfully",
            success: true,
            data: inventoryDetails,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in fetching inventory",
            success: false,
            data: error,
        });
    }
});
router.get('/:id', auth.authenticateToken, checkRole.checkRole([3], 'role'), async (req, res) => {
    const { id } = req.params;

    try {
        const selectInventoryQuery = "SELECT * FROM inventory WHERE id = ?";
        const [inventoryResult] = await connection.promise().query(selectInventoryQuery, [id]);

        if (inventoryResult.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Inventory not found",
                success: false,
            });
        }

        const inventory = inventoryResult[0];
        const itemDetails = await getItemDetailsById(inventory.item_id);
        const managerDetails = await getUserDetailsById(inventory.manager_id);

        return res.status(200).json({
            status: 200,
            message: "Inventory Fetched Successfully",
            success: true,
            data: {
                ...inventory,
                item: itemDetails,
                manager: managerDetails,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in fetching inventory",
            success: false,
            data: error,
        });
    }
});

async function getItemDetailsById(itemId) {
    const selectItemQuery = "SELECT * FROM items WHERE id = ?";
    const [itemResult] = await connection.promise().query(selectItemQuery, [itemId]);
    return itemResult[0];
}

async function getUserDetailsById(userId) {
    const selectUserQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
    const [userResult] = await connection.promise().query(selectUserQuery, [userId]);
    return userResult[0];
}

router.patch('/:id', auth.authenticateToken, checkRole.checkRole([3], 'role'), async (req, res) => {
    const { id } = req.params;
    const { item_id, quantity_in, quantity_out } = req.body;
    const manager_id = res.locals.user.ex_id;

    const updateColumns = [];
    const updateValues = [];

    if (item_id !== undefined) {
        updateColumns.push('item_id');
        updateValues.push(item_id);
    }

    if (quantity_in !== undefined) {
        updateColumns.push('quantity_in');
        updateValues.push(quantity_in);
    }

    if (quantity_out !== undefined) {
        updateColumns.push('quantity_out');
        updateValues.push(quantity_out);
    }

    if (manager_id !== undefined) {
        updateColumns.push('manager_id');
        updateValues.push(manager_id);
    }

    // Build the SET part of the update query dynamically
    const setClause = updateColumns.map(col => `${col} = ?`).join(', ');

    const updateQuery = `UPDATE inventory SET ${setClause} WHERE id = ?`;
    const valuesToUpdate = [...updateValues, id];

    try {
        const [updateResult] = await connection.promise().query(updateQuery, valuesToUpdate);

        // Check if the inventory record with the given id exists
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                message: "Inventory record not found or not updated",
                success: false,
            });
        }

        // Fetch additional details for the updated inventory record
        const getByIdQuery = "SELECT * FROM inventory WHERE id = ?";
        const [result] = await connection.promise().query(getByIdQuery, [id]);

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Inventory record not found",
                success: false,
            });
        }

        // Fetch additional details for the associated item
        const selectItemQuery = "SELECT * FROM items WHERE id = ?";
        const [itemResult] = await connection.promise().query(selectItemQuery, [result[0].item_id]);

        // Fetch additional details for the user associated with the manager_id
        const selectUserQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
        const [userResult] = await connection.promise().query(selectUserQuery, [result[0].manager_id]);

        return res.status(200).json({
            status: 200,
            message: "Inventory Record Updated Successfully",
            success: true,
            data: {
                ...result[0],
                user: userResult[0],
                item: itemResult[0],
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in updating inventory record",
            success: false,
            data: error,
        });
    }
});

router.delete('/:id', auth.authenticateToken, checkRole.checkRole([3], 'role'), async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch inventory details
        const selectInventoryQuery = "SELECT * FROM inventory WHERE id = ?";
        const [result] = await connection.promise().query(selectInventoryQuery, [id]);

        // Check if the inventory with the given id exists
        if (result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Inventory not found",
                success: false,
            });
        }

        // Fetch additional details for the manager associated with the manager_id
        const selectUserQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
        const [userResult] = await connection.promise().query(selectUserQuery, [result[0].manager_id]);

        // Fetch additional details for the associated item
        const selectItemQuery = "SELECT * FROM items WHERE id = ?";
        const [itemResult] = await connection.promise().query(selectItemQuery, [result[0].item_id]);

        // Delete the inventory from the database
        const deleteQuery = "DELETE FROM inventory WHERE id = ?";
        const [deleteResult] = await connection.promise().query(deleteQuery, [id]);

        // Check if the inventory was successfully deleted
        if (deleteResult.affectedRows === 1) {
            return res.status(200).json({
                status: 200,
                message: "Inventory Deleted Successfully",
                success: true,
                data: {
                    ...result[0],
                    manager: userResult[0],
                    item: itemResult[0],
                },
            });
        } else {
            return res.status(500).json({
                status: 500,
                message: "Error in deleting inventory",
                success: false,
                data: "Unexpected error occurred while deleting inventory",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in deleting inventory",
            success: false,
            data: error,
        });
    }
});




module.exports = router;
