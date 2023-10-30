const connection = require("./connection");

function query()
{
    connection.query(
                    "CREATE TABLE `tbl_tender` (`tender_SLNo` varchar(11) NOT NULL, `tender_creator_id` int(11) NOT NULL, `tender_date` date DEFAULT NULL, `Project_Name` varchar(40) DEFAULT NULL, `tender_location` varchar(50) DEFAULT NULL, `tender_item_id` varchar(11) DEFAULT NULL, `tender_item_qtity` int(11) DEFAULT NULL, `tender_deadline` date DEFAULT NULL, PRIMARY KEY (`tender_SLNo`), FOREIGN KEY (`tender_creator_id`) REFERENCES `tbl_user` (`ex_id`), FOREIGN KEY (`tender_item_id`) REFERENCES `tbl_item` (`item_id`));",
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