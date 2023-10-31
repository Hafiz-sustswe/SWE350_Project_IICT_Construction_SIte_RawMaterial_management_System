const express = require('express');
const connection = require('../connection');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkrole');

// Function to retrieve the last used item ID from the database
async function getLastItemIdFromDatabase() {
    const query = "SELECT MAX(CAST(SUBSTRING(item_id, 6) AS UNSIGNED)) AS lastId FROM tbl_item";
    try {
        const [results] = await connection.promise().query(query);
        const lastId = results[0].lastId || 0;
        return lastId;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

// Function to generate a sequential Item ID
async function generateItemId() {
    // Retrieve the last used item ID from the database
    const lastId = await getLastItemIdFromDatabase();

    // Increment the last used item ID
    const newItemId = lastId + 1;

    // Convert the incremented ID to a string
    const itemId = `ITEM_${newItemId.toString().padStart(4, '0')}`;
    return itemId;
}

// API endpoint to add an item
router.post('/addItem', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const item = req.body;

    try {
        // Generate Item ID using the function
        const itemId = await generateItemId();

        // Use the generated ID in the SQL query
        const query = "INSERT INTO tbl_item (item_id, item_name, item_price, date_added, supplier_id) VALUES (?, ?, ?, ?, ?)";
        const [results] = await connection.promise().query(query, [itemId, item.item_name, item.item_price, item.date_added, item.supplier_id]);

        return res.status(200).json({ message: "Item Added Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

// ...

// API endpoint to get items
router.get('/getItem', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const query = "SELECT * FROM tbl_item";
    try {
        const [results] = await connection.promise().query(query);
        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

// API endpoint to update an item
router.patch('/updateItem', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const item = req.body;

    const query = "UPDATE tbl_item SET item_name = ? WHERE item_id = ?";
    try {
        const [results] = await connection.promise().query(query, [item.item_name, item.item_id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Item ID not found" });
        }
        return res.status(200).json({ message: "Item updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

// API endpoint to delete an item by ID
router.delete('/deleteItemById', auth.authenticateToken, checkRole.checkRole([1], 'role'), async (req, res) => {
    const item = req.body;

    const query = "DELETE FROM tbl_item WHERE item_id = ?";
    try {
        const [results] = await connection.promise().query(query, [item.item_id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Item ID not found" });
        }
        return res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});




module.exports = router;
