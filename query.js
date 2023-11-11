const connection = require("./connection");

function query()
{
    connection.query(
                    "CREATE TABLE report (id VARCHAR(255) PRIMARY KEY, item_id VARCHAR(255), total_quantity_in INT, total_quantity_out INT, balance INT, start_date DATE, end_date DATE, creator_id INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (item_id) REFERENCES items(id), FOREIGN KEY (creator_id) REFERENCES tbl_user(ex_id));",
                    (error) => {
                      if (error) {
                        console.log(`error occurred while creating users table ${error}`);
                      } else {
                        console.log("query successfull");
                      }
                    }
          );


}
module.exports = query;