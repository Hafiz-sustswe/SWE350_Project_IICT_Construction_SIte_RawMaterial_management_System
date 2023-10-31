const express = require('express');
const connection = require('../connection');
const router = express.Router();
//const jwt = require('jsonwebtoken');
var auth = require('../services/authentication');
var checkRole = require('../services/checkrole');


// Global variable to store the last used item ID
// Function to retrieve the last used item ID from the database
function getLastItemIdFromDatabase(callback) {
    const query = "SELECT MAX(CAST(SUBSTRING(item_id, 6) AS UNSIGNED)) AS lastId FROM tbl_item";
   try {
    connection.query(query, (err, results) => {
        if (!err) {
            const lastId = results[0].lastId || 0;
            callback(lastId);
        } else {
            console.error(err);
            callback(0);
        }
    });
   } catch (error) {
    console.log(error);
   }
}

// Function to generate a sequential Item ID
function generateItemId(callback) {
    // Retrieve the last used item ID from the database
    getLastItemIdFromDatabase((lastId) => {
        lastItemId = lastId;

        // Increment the last used item ID
        lastItemId++;

        // Convert the incremented ID to a string
        const itemId = `ITEM_${lastItemId.toString().padStart(4, '0')}`;

        // Callback with the generated item ID
        callback(itemId);
    });
}

// API endpoint to add an item

router.post('/addItem', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role')(req, res, next);
}, (req, res, next) => {
    const item = req.body;

    // Generate Item ID using the function
    generateItemId((itemId) => {
        // Use the generated ID in the SQL query
        const query = "INSERT INTO tbl_item (item_id, item_name, item_price, date_added, supplier_id) VALUES (?, ?, ?, ?, ?)";
        try {
            connection.query(query, [itemId, item.item_name, item.item_price, item.date_added, item.supplier_id], (err, results) => {
                if (!err) {
                    return res.status(200).json({ message: "Item Added Successfully" });
                } else {
                    return res.status(500).json(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    });
});


router.get('/getItem', auth.authenticateToken, (req, res, next) => {
    checkRole.checkRole([1], 'role')(req, res, next);
}, (req, res, next) => {

    query = "select * from tbl_item ";
    try {
        connection.query(query, (err, results) => {
            if (!err) {
                return res.status(200).json(results);
            }
            else {
                return res.status(500).json(err);
    
            }
        });
        
    } catch (error) {
        console.log(error);
    }
})
router.patch('/updateItem', auth.authenticateToken, (req, res, next) => {
    
    checkRole.checkRole([1], 'role')(req, res, next);
}, (req, res, next) => {
   
    let item = req.body;

    query = "update tbl_item set item_name = ? where item_id = ?";
    try {
        connection.query(query, [item.item_name, item.item_id], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).json({ message: "item id not found" });
                }
                return res.status(200).json({ message: "Item updated Successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
});


router.delete('/deleteItemById', auth.authenticateToken, (req, res, next) => {
    
    checkRole.checkRole([1], 'role')(req, res, next);
}, (req, res, next) => {
    let item = req.body;

    query = "DELETE FROM tbl_item where item_id = ?";
    try {
        connection.query(query, [item.item_id], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).json({ message: "item id not founnd" });
                }
                return res.status(200).json({ message: "Item deleted Succesfully" });
            }
            else {
                return res.status(500).json(err);
    
            }
        });
    } catch (error) {
        console.log(error);
    }

})

module.exports = router;