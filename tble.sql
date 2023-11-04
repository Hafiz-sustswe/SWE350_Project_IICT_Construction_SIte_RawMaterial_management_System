CREATE TABLE tbl_user(
    ex_id int NOT NULL Auto Increment,
	ex_name varchar(20),
    ex_contactNO int,
	ex_email varchar(50),
	ex_password varchar(250)
	role_id int,
	
	status varchar(30),
    
    PRIMARY KEY(ex_id),
	foreign key (role_id) references roles(role_id),
	unique(ex_email)
    );
insert into tbl_user(name,contactNo,email,password,status,role) values('Admin','123456778','admin@gmail.com','admin','true','admin');


CREATE TABLE `tbl_tender` (`tender_SLNo` varchar(11) NOT NULL, `tender_creator_id` int(11) NOT NULL, `tender_date` date DEFAULT NULL, `Project_Name` varchar(40) DEFAULT NULL, `tender_location` varchar(50) DEFAULT NULL, `tender_item_id` varchar(11) DEFAULT NULL, `tender_item_qtity` int(11) DEFAULT NULL, `tender_deadline` date DEFAULT NULL, PRIMARY KEY (`tender_SLNo`), FOREIGN KEY (`tender_creator_id`) 
REFERENCES `tbl_user` (`ex_id`), FOREIGN KEY (`tender_item_id`) REFERENCES `tbl_item` (`item_id`));

CREATE TABLE tbl_user (ex_id INT NOT NULL AUTO_INCREMENT, ex_name VARCHAR(20),ex_contactNO INT,ex_email VARCHAR(50), ex_password VARCHAR(250), role_id INT, status VARCHAR(30),
PRIMARY KEY (ex_id), FOREIGN KEY (role_id) REFERENCES roles(role_id),UNIQUE (ex_email) );