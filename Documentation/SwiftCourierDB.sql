-- Courier Management System Database Schema

CREATE DATABASE IF NOT EXISTS cms;
USE cms;

-- =====================
-- USERS TABLE
-- =====================
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(255) UNIQUE,
    role VARCHAR(255)
);

-- =====================
-- ADDRESSES TABLE
-- =====================
CREATE TABLE addresses (
    address_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255),
    address_2 VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    postal_code INT,
    state VARCHAR(255),
    user_id BIGINT,
    CONSTRAINT fk_addresses_users FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- =====================
-- BRANCHES TABLE
-- =====================
CREATE TABLE branches (
    branch_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    address_id BIGINT,
    CONSTRAINT fk_branches_addresses FOREIGN KEY (address_id) REFERENCES addresses(address_id)
);

-- =====================
-- CUSTOMERS TABLE
-- =====================
CREATE TABLE customers (
    customer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_type VARCHAR(255),
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(255),
    address_id BIGINT,
    CONSTRAINT fk_customers_addresses FOREIGN KEY (address_id) REFERENCES addresses(address_id)
);

-- =====================
-- EMPLOYEES TABLE
-- =====================
CREATE TABLE employees (
    hire_date DATE,
    salary DOUBLE NOT NULL,
    user_id BIGINT PRIMARY KEY,
    branch_id BIGINT,
    CONSTRAINT fk_employees_users FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_employees_branches FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
);

-- =====================
-- PARCELS TABLE
-- =====================
CREATE TABLE parcels (
    parcel_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    height INT NOT NULL,
    length INT NOT NULL,
    weight FLOAT NOT NULL,
    width INT NOT NULL
);

-- =====================
-- PAYMENTS TABLE
-- =====================
CREATE TABLE payments (
    payment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    amount FLOAT,
    payment_date DATE,
    payment_method INT
);

-- =====================
-- ORDERS TABLE
-- =====================
CREATE TABLE orders (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    declared_value DOUBLE,
    delivery_date DATE,
    order_date DATE,
    service_type VARCHAR(255),
    status VARCHAR(255),
    tracking_number VARCHAR(255),
    parcel_id_parcel_id BIGINT,
    payment_id BIGINT,
    receiver_id BIGINT,
    sender_id BIGINT,
    user_id BIGINT,
    CONSTRAINT fk_orders_parcels FOREIGN KEY (parcel_id_parcel_id) REFERENCES parcels(parcel_id),
    CONSTRAINT fk_orders_payments FOREIGN KEY (payment_id) REFERENCES payments(payment_id),
    CONSTRAINT fk_orders_receiver FOREIGN KEY (receiver_id) REFERENCES customers(customer_id),
    CONSTRAINT fk_orders_sender FOREIGN KEY (sender_id) REFERENCES customers(customer_id),
    CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- =====================
-- COMPLAINTS TABLE
-- =====================
CREATE TABLE complaints (
    complaint_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    complaint_date DATE,
    complaint_status VARCHAR(255),
    description VARCHAR(255),
    remark VARCHAR(255),
    order_id BIGINT,
    CONSTRAINT fk_complaints_orders FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
