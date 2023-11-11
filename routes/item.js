const express = require('express');
const connection = require('../connection');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkrole');
  
// Function to retrieve the last used item ID from the database
async function getLastItemIdFromDatabase() {
    const query = "SELECT MAX(CAST(SUBSTRING(id, 6) AS UNSIGNED)) AS lastId FROM items";
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
//ok
router.post('/addItem', auth.authenticateToken, checkRole.checkRole([2], 'role'), async (req, res) => {
    const {item_name} = req.body;

    try {
        // Generate Item ID using the function
        const itemId = await generateItemId();

        const query = "INSERT INTO items (id,item_name) VALUES (?,?)";
        const values = [itemId ,item_name];
      
        const [created_item] = await connection.promise().query(query, values);
      
        const selectQuery =
          "SELECT * FROM items WHERE id = ?";
        const [result] = (await connection.promise().query(selectQuery,[itemId]))[0];
        if( created_item?.affectedRows == 1)
        {
            return res.status(200).json({
                status : 200,
                message : "Item added succesfully",
                success : true,
                data : result});
        }  
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

// ...

// API endpoint to get items
//ok
router.get('/getItem', auth.authenticateToken, checkRole.checkRole([1,2,3], 'role'), async (req, res) => {
    const query = "SELECT * FROM items";
    try {
        const [result] = await connection.promise().query(query);
        return res.status(200).json({
            status : 200,
            success : true,
            data : result});
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

router.get('/:id', auth.authenticateToken, checkRole.checkRole([1,2,3], 'role'), async (req, res) => {
    const {id} = req.params;
    const query = "SELECT * FROM items where id = ?";
    try {
        const [result] = await connection.promise().query(query,[id]);
        return res.status(200).json({
            status : 200,
            success : true,
            data : result});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500,
            message: "Error in getting items",
            success: false,
            data: error,});
    }
});

// API endpoint to update an item
//ok
router.patch('/:id', auth.authenticateToken, checkRole.checkRole([2], 'role'), async (req, res) => {
    const i = req.body;
    const {id} = req.params;

    const query = "UPDATE items SET item_name = ? WHERE id = ?";
    try {
        const [update_result] = await connection.promise().query(query, [i.item_name, id]);



        if (update_result?.affectedRows == 1) {
            // Retrieve the updated item
            const selectQuery = "SELECT * FROM items WHERE id = ?";
            const [result] = await connection.promise().query(selectQuery, [id]);

            return res.status(200).json({
                status: 200,
                message: "Item updated successfully",
                success: true,
                data: result[0], // Return the updated item
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: "Item not found or not updated",
                success: false,
            });
        }
    } catch (error) {
        
        return res.status(500).json({
            status: 500,
            message: "Error in updating items",
            success: false,
            data: error,
        });
    }
});




// API endpoint to delete an item by ID
//ok
router.delete('/:id', auth.authenticateToken, checkRole.checkRole([2], 'role'), async (req, res) => {
    const {id} = req.params;

    const query = "DELETE FROM items WHERE id = ?";
    try {
        const selectQuery =
        "SELECT * FROM items WHERE id = ?";
        const [result] = (await connection.promise().query(selectQuery,[id]))[0];
        const [delete_result] = await connection.promise().query(query, [id]);
        if( delete_result?.affectedRows == 1)
        {
          return res.status(200).json({
              status : 200,
              message : "Item deleted Successfully",
              success : true,
              data : {
                     ...result ,
                   
                    }});
      }  

    } catch (error) {
        console.error(error);
        return res.status(500).json({status : 500,
            message : "Error in deleting items",
            success : false,
            data : error});
    }
});




module.exports = router;
