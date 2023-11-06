const connection = require("./connection");

function query()
{
    connection.query(
                    "CREATE TABLE priced_bill (id varchar(20) PRIMARY KEY , tender_id varchar(20) NOT NULL, creator_id INT NOT NULL, price DECIMAL(10,2) NOT NULL, total_price DECIMAL(10,2) NOT NULL, status ENUM('PENDING', 'ACCEPTED', 'CANCEL') NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (tender_id) REFERENCES tender(id), FOREIGN KEY (creator_id) REFERENCES tbl_user(ex_id));",
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