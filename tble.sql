CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(255) NOT NULL
);

CREATE TABLE tbl_user (
    ex_id INT PRIMARY KEY AUTO_INCREMENT,
    ex_name VARCHAR(20),
    ex_contactNO INT,
    ex_email VARCHAR(50) UNIQUE NOT NULL,
    ex_password VARCHAR(250),
    role_id INT,
    status VARCHAR(30),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE items (
    id VARCHAR(20) PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE requisitions (
    id VARCHAR(20) PRIMARY KEY,
    creator_id INT NOT NULL,
    item_id VARCHAR(20) NOT NULL,
    quantity INT,
    purpose VARCHAR(255) NOT NULL,
    project_name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(id),
    FOREIGN KEY (creator_id) REFERENCES tbl_user(ex_id)
);

CREATE TABLE tender (
    id VARCHAR(20) PRIMARY KEY,
    requisition_id VARCHAR(20) NOT NULL,
    creator_id INT NOT NULL,
    deadline DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (requisition_id) REFERENCES requisitions(id),
    FOREIGN KEY (creator_id) REFERENCES tbl_user(ex_id)
);

CREATE TABLE priced_bill (
    id VARCHAR(20) PRIMARY KEY,
    tender_id VARCHAR(20) NOT NULL,
    creator_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('PENDING', 'ACCEPTED', 'CANCEL') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tender_id) REFERENCES tender(id),
    FOREIGN KEY (creator_id) REFERENCES tbl_user(ex_id)
);

CREATE TABLE receipt (
    id VARCHAR(20) PRIMARY KEY,
    priced_bill_id VARCHAR(20) NOT NULL,
    creator_id INT NOT NULL,
    expected_delivery_date DATE,
    damaged_quantity INT,
    receiver_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (priced_bill_id) REFERENCES priced_bill(id),
    FOREIGN KEY (receiver_id) REFERENCES tbl_user(ex_id),
    FOREIGN KEY (creator_id) REFERENCES tbl_user(ex_id)
);

CREATE TABLE inventory (
    id VARCHAR(255) PRIMARY KEY,
    item_id VARCHAR(20),  
    quantity_in INT,
    quantity_out INT,
    manager_id INT,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(id),
    FOREIGN KEY (manager_id) REFERENCES tbl_user(ex_id)
);

CREATE TABLE report (
    id VARCHAR(255) PRIMARY KEY,
    item_id VARCHAR(255),
    total_quantity_in INT,
    total_quantity_out INT,
    balance INT,
    start_date DATE,
    end_date DATE,
    creator_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(id),
    FOREIGN KEY (creator_id) REFERENCES tbl_user(ex_id)
);
