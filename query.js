const connection = require("./connection");

function query()
{
    connection.query(
                    "CREATE TABLE tbl_user (ex_id INT NOT NULL AUTO_INCREMENT, ex_name VARCHAR(20),ex_contactNO INT,ex_email VARCHAR(50), ex_password VARCHAR(250), role_id INT, status VARCHAR(30),   PRIMARY KEY (ex_id), FOREIGN KEY (role_id) REFERENCES roles(role_id),UNIQUE (ex_email) );",
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