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