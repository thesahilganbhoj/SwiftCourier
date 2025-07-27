-- Drop and Create Database
DROP DATABASE IF EXISTS SwiftCourier;
CREATE DATABASE SwiftCourier;
USE SwiftCourier;

-- Fix: Create Warehouses first (used in foreign keys)
CREATE TABLE warehouses (
    warehouse_id INT PRIMARY KEY AUTO_INCREMENT,
    city VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact_number VARCHAR(15)
);

-- Fix: Use VARCHAR instead of TEXT for indexed/unique columns like email
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    contact_number VARCHAR(15),
    address VARCHAR(255)
);

-- Create Admin Table
CREATE TABLE admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Create Staff Table (after warehouses)
CREATE TABLE staff (
    staff_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    contact_number VARCHAR(15),
    current_warehouse_id INT,
    FOREIGN KEY (current_warehouse_id) REFERENCES warehouses(warehouse_id)
);

-- Fix: Create Orders Table now
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    assigned_staff_id INT,
    source_warehouse_id INT,
    destination_warehouse_id INT,
    sender_name VARCHAR(100),
    receiver_name VARCHAR(100),
    receiver_address VARCHAR(255),
    receiver_contact VARCHAR(15),
    weight FLOAT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending Assignment',
    tracking_id VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (assigned_staff_id) REFERENCES staff(staff_id),
    FOREIGN KEY (source_warehouse_id) REFERENCES warehouses(warehouse_id),
    FOREIGN KEY (destination_warehouse_id) REFERENCES warehouses(warehouse_id)
);

-- Courier Status History Table
CREATE TABLE courier_status_history (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    updated_by_staff INT,
    updated_by_admin INT,
    status VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (updated_by_staff) REFERENCES staff(staff_id),
    FOREIGN KEY (updated_by_admin) REFERENCES admins(admin_id)
);

-- Staff Availability Table
CREATE TABLE staff_availability (
    staff_id INT PRIMARY KEY,
    current_location VARCHAR(255),
    is_available BOOLEAN DEFAULT TRUE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);

-- Feedback Table
CREATE TABLE feedback (
    feedback_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    customer_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Route Tracking Table
CREATE TABLE route_tracking (
    tracking_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    from_warehouse_id INT,
    to_warehouse_id INT,
    departure_time TIMESTAMP,
    arrival_time TIMESTAMP,
    status VARCHAR(100),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (from_warehouse_id) REFERENCES warehouses(warehouse_id),
    FOREIGN KEY (to_warehouse_id) REFERENCES warehouses(warehouse_id)
);
