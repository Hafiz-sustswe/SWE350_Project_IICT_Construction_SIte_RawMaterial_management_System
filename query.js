const connection = require("./connection");

function query()
{
    connection.query(
                    "ALTER TABLE tbl_item DROP COLUMN supplier_id;",
                    (error) => {
                      if (error) {
                        console.log(`error occurred while creating users table ${error}`);
                      } else {
                        console.log("users table created");
                      }
                    }
          );


}
module.exports = query;