const express = require('express');
const connection = require('../connection');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkrole');

// Function to generate report ID
let lastReportId = 0;

async function getLastReportIdFromDatabase() {
    const query = "SELECT MAX(CAST(SUBSTRING(id, 8) AS UNSIGNED)) AS lastId FROM report";
    try {
        const [results] = await connection.promise().query(query);
        return results[0].lastId || 0;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function generateReportId() {
    try {
        const lastId = await getLastReportIdFromDatabase();
        lastReportId = lastId + 1;
        return `REPORT_${lastReportId.toString().padStart(4, '0')}`;
    } catch (error) {
        console.log(error);
        return null;
    }
}

router.post('/addReport', auth.authenticateToken, checkRole.checkRole([3], 'role'), async (req, res) => {
    const { item_id, start_date, end_date } = req.body;
    const creator_id = res.locals.user.ex_id;

    try {
    
        // Format the date values for the SQL query
        const formattedStartDate = new Date(start_date).toISOString().slice(0, 19).replace('T', ' ');
        const formattedEndDate = new Date(end_date).toISOString().slice(0, 19).replace('T', ' ');

        

        // Calculate total_quantity_in for the specified item within the date range
        const totalQuantityInQuery = "SELECT SUM(quantity_in) as total_quantity_in FROM inventory WHERE item_id = ? AND created_at BETWEEN ? AND ?";
    
        const [totalQuantityInResult] = await connection.promise().query(totalQuantityInQuery, [item_id, formattedStartDate, formattedEndDate]);
       

        // Calculate total_quantity_out for the specified item within the date range
        const totalQuantityOutQuery = "SELECT SUM(quantity_out) as total_quantity_out FROM inventory WHERE item_id = ? AND created_at BETWEEN ? AND ?";
       
        const [totalQuantityOutResult] = await connection.promise().query(totalQuantityOutQuery, [item_id, formattedStartDate, formattedEndDate]);
       

        const total_quantity_in = totalQuantityInResult[0].total_quantity_in || 0;
        const total_quantity_out = totalQuantityOutResult[0].total_quantity_out || 0;

       
        // Calculate balance
        const balance = total_quantity_in - total_quantity_out;

        // Generate a unique ID for the report
        const id = await generateReportId();
        if (!id) {
            return res.status(500).json({ message: "Failed to generate report ID" });
        }

        // Insert the report into the database
        const query = `
            INSERT INTO report (id, item_id, total_quantity_in, total_quantity_out, balance, start_date, end_date, creator_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [id, item_id, total_quantity_in, total_quantity_out, balance, start_date, end_date, creator_id];

        const [createdReport] = await connection.promise().query(query, values);

        if (createdReport?.affectedRows === 1) {
            const selectReportQuery = "SELECT * FROM report WHERE id = ?";
            const [result] = (await connection.promise().query(selectReportQuery, [id]))[0];

            // Fetch additional details for the associated item
            const selectItemQuery = "SELECT * FROM items WHERE id = ?";
            const [itemResult] = await connection.promise().query(selectItemQuery, [item_id]);

            // Fetch additional details for the user associated with the creator_id
            const selectUserQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
            const [userResult] = await connection.promise().query(selectUserQuery, [creator_id]);

            return res.status(200).json({
                status: 200,
                message: "Report Created Successfully",
                success: true,
                data: {
                    ...result,
                    item: itemResult[0],
                    creator: userResult[0],
                },
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in creating report",
            success: false,
            data: error,
        });
    }
});

router.patch('/:id', auth.authenticateToken, checkRole.checkRole([3], 'role'), async (req, res) => {
    const { id } = req.params;
    const { item_id, start_date, end_date } = req.body;
    const creator_id = res.locals.user.ex_id;

    try {
        // Format the date values for the SQL query
        const formattedStartDate = start_date ? new Date(start_date).toISOString().slice(0, 19).replace('T', ' ') : null;
        const formattedEndDate = end_date ? new Date(end_date).toISOString().slice(0, 19).replace('T', ' ') : null;

        // Calculate total_quantity_in for the specified item within the date range
        const totalQuantityInQuery = "SELECT SUM(quantity_in) as total_quantity_in FROM inventory WHERE item_id = ? AND created_at BETWEEN ? AND ?";
        const [totalQuantityInResult] = await connection.promise().query(totalQuantityInQuery, [item_id, formattedStartDate, formattedEndDate]);

        // Calculate total_quantity_out for the specified item within the date range
        const totalQuantityOutQuery = "SELECT SUM(quantity_out) as total_quantity_out FROM inventory WHERE item_id = ? AND created_at BETWEEN ? AND ?";
        const [totalQuantityOutResult] = await connection.promise().query(totalQuantityOutQuery, [item_id, formattedStartDate, formattedEndDate]);

        const total_quantity_in = totalQuantityInResult[0].total_quantity_in || 0;
        const total_quantity_out = totalQuantityOutResult[0].total_quantity_out || 0;

        // Calculate balance
        const balance = total_quantity_in - total_quantity_out;

        const updateColumns = [];
        const updateValues = [];

        if (item_id !== undefined) {
            updateColumns.push('item_id');
            updateValues.push(item_id);
        }

        if (start_date !== undefined) {
            updateColumns.push('start_date');
            updateValues.push(formattedStartDate);
        }

        if (end_date !== undefined) {
            updateColumns.push('end_date');
            updateValues.push(formattedEndDate);

            // Update quantities and balance if start_date and end_date are provided
            updateColumns.push('total_quantity_in', 'total_quantity_out', 'balance');
            updateValues.push(total_quantity_in, total_quantity_out, balance);
        }

        // Build the SET part of the update query dynamically
        const setClause = updateColumns.map((col, index) => `${col} = ?`).join(', ');

        const updateQuery = `UPDATE report SET ${setClause} WHERE id = ?`;
        const valuesToUpdate = [...updateValues, id];

        // Update the report in the database
        const [updateResult] = await connection.promise().query(updateQuery, valuesToUpdate);

        // Check if the report with the given id exists
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                message: "Report not found or not updated",
                success: false,
            });
        }

        // Fetch updated report details
        const selectReportQuery = "SELECT * FROM report WHERE id = ?";
        const [result] = (await connection.promise().query(selectReportQuery, [id]))[0];

        // Fetch additional details for the associated item
        const selectItemQuery = "SELECT * FROM items WHERE id = ?";
        const [itemResult] = await connection.promise().query(selectItemQuery, [item_id]);

        // Fetch additional details for the user associated with the creator_id
        const selectUserQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
        const [userResult] = await connection.promise().query(selectUserQuery, [creator_id]);

        return res.status(200).json({
            status: 200,
            message: "Report Updated Successfully",
            success: true,
            data: {
                ...result,
                item: itemResult[0],
                creator: userResult[0],
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in updating report",
            success: false,
            data: error,
        });
    }
});

// Get all reports
router.get('/getAllReports', auth.authenticateToken, checkRole.checkRole([3], 'role'), async (req, res) => {
    try {
        const getAllReportsQuery = "SELECT * FROM report";
        const reports = (await connection.promise().query(getAllReportsQuery))[0];

        // Fetch additional details for each report
        const reportsWithDetails = await Promise.all(reports.map(async (report) => {
            const selectItemQuery = "SELECT * FROM items WHERE id = ?";
            const [itemResult] = await connection.promise().query(selectItemQuery, [report.item_id]);

            const selectUserQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
            const [userResult] = await connection.promise().query(selectUserQuery, [report.creator_id]);

            return {
                ...report,
                item: itemResult[0],
                creator: userResult[0],
            };
        }));

        return res.status(200).json({
            status: 200,
            message: "Reports Retrieved Successfully",
            success: true,
            data: reportsWithDetails,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in getting reports",
            success: false,
            data: error,
        });
    }
});

// Get report by ID
router.get('/:id', auth.authenticateToken, checkRole.checkRole([3], 'role'), async (req, res) => {
    const { id } = req.params;
    
    try {
        const getReportByIdQuery = "SELECT * FROM report WHERE id = ?";
        const [report] = (await connection.promise().query(getReportByIdQuery, [id]))[0];

        if (!report) {
            return res.status(404).json({
                status: 404,
                message: "Report not found",
                success: false,
            });
        }

        // Fetch additional details for the associated item
        const selectItemQuery = "SELECT * FROM items WHERE id = ?";
        const [itemResult] = await connection.promise().query(selectItemQuery, [report.item_id]);

        // Fetch additional details for the user associated with the creator_id
        const selectUserQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
        const [userResult] = await connection.promise().query(selectUserQuery, [report.creator_id]);

        return res.status(200).json({
            status: 200,
            message: "Report Retrieved Successfully",
            success: true,
            data: {
                ...report,
                item: itemResult[0],
                creator: userResult[0],
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in getting report",
            success: false,
            data: error,
        });
    }
});

// Delete report by ID
router.delete('/:id', auth.authenticateToken, checkRole.checkRole([3], 'role'), async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch report details
        const selectReportQuery = "SELECT * FROM report WHERE id = ?";
        const [result] = await connection.promise().query(selectReportQuery, [id]);

        // Check if the report with the given id exists
        if (result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Report not found",
                success: false,
            });
        }

        // Fetch additional details for the creator associated with the creator_id
        const selectUserQuery = "SELECT ex_id, ex_email, ex_name FROM tbl_user WHERE ex_id = ?";
        const [userResult] = await connection.promise().query(selectUserQuery, [result[0].creator_id]);

        // Fetch additional details for the associated item
        const selectItemQuery = "SELECT * FROM items WHERE id = ?";
        const [itemResult] = await connection.promise().query(selectItemQuery, [result[0].item_id]);

        // Delete the report from the database
        const deleteQuery = "DELETE FROM report WHERE id = ?";
        const [deleteResult] = await connection.promise().query(deleteQuery, [id]);

        // Check if the report was successfully deleted
        if (deleteResult.affectedRows === 1) {
            return res.status(200).json({
                status: 200,
                message: "Report Deleted Successfully",
                success: true,
                data: {
                    ...result[0],
                    creator: userResult[0],
                    item: itemResult[0],
                },
            });
        } else {
            return res.status(500).json({
                status: 500,
                message: "Error in deleting report",
                success: false,
                data: "Unexpected error occurred while deleting report",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Error in deleting report",
            success: false,
            data: error,
        });
    }
});




module.exports = router;
