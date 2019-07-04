DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NULL,
    product_sales INT NULL,

    PRIMARY KEY(item_id)
);

CREATE TABLE departments
(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_cost INT NOT NULL,
    PRIMARY Key (department_id)
    
);

INSERT INTO departments (department_name, over_head_cost)
VALUES ("Electronics", 10000);
INSERT INTO departments (department_name, over_head_cost)
VALUES ("Active", 5000);

/*1*/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro","Electronics", 2000, 100);
/*2*/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Air","Electronics", 1500, 150);
/*3*/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ipad","Electronics", 700, 30);
/*4*/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Surface Pro","Electronics", 799, 200);
/*5*/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Surface Laptop","Electronics", 1299, 120);
/*6*/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Surface Book","Electronics", 3000, 50);
/*7*/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Airpods","Electronics", 150, 1000);
/*8*/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Watch","Active", 300, 500);
/*9*/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fitbit","Active", 99, 100);
/*10*/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cortana","Electronics", 200, 100);

