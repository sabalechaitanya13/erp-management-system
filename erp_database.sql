-- ERP System Database Schema
CREATE DATABASE IF NOT EXISTS erp_system;
USE erp_system;

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'EMPLOYEE', 'MANAGER') DEFAULT 'EMPLOYEE',
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- Company Table
CREATE TABLE company (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100),
    gst_number VARCHAR(20),
    pan_number VARCHAR(20),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    logo_path VARCHAR(255),
    financial_year_start VARCHAR(5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_gst (gst_number)
);

-- Department Table
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    company_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    INDEX idx_company (company_id)
);

-- Designation Table
CREATE TABLE designation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    company_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    INDEX idx_company (company_id)
);

-- Employee Table
CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    aadhar_number VARCHAR(20),
    pan_number VARCHAR(20),
    bank_account_number VARCHAR(30),
    bank_name VARCHAR(100),
    ifsc_code VARCHAR(20),
    department_id INT,
    designation_id INT,
    company_id INT NOT NULL,
    joining_date DATE NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE', 'ON_LEAVE') DEFAULT 'ACTIVE',
    profile_picture_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL,
    FOREIGN KEY (designation_id) REFERENCES designation(id) ON DELETE SET NULL,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    INDEX idx_employee_id (employee_id),
    INDEX idx_company (company_id),
    INDEX idx_department (department_id)
);

-- Attendance Table
CREATE TABLE attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    in_time TIME,
    out_time TIME,
    status ENUM('PRESENT', 'ABSENT', 'HALF_DAY', 'LEAVE') DEFAULT 'ABSENT',
    overtime_hours DECIMAL(5, 2) DEFAULT 0,
    is_late BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
    INDEX idx_employee_date (employee_id, attendance_date),
    INDEX idx_date (attendance_date),
    UNIQUE KEY unique_employee_date (employee_id, attendance_date)
);

-- Salary Structure Table
CREATE TABLE salary_structure (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL UNIQUE,
    basic_salary DECIMAL(12, 2) NOT NULL,
    house_rent_allowance DECIMAL(12, 2) DEFAULT 0,
    dearness_allowance DECIMAL(12, 2) DEFAULT 0,
    special_allowance DECIMAL(12, 2) DEFAULT 0,
    other_allowances DECIMAL(12, 2) DEFAULT 0,
    pf_contribution DECIMAL(12, 2) DEFAULT 0,
    esic_contribution DECIMAL(12, 2) DEFAULT 0,
    professional_tax DECIMAL(12, 2) DEFAULT 0,
    other_deductions DECIMAL(12, 2) DEFAULT 0,
    effective_from DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
    INDEX idx_employee (employee_id)
);

-- Payroll Table
CREATE TABLE payroll (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    payroll_month VARCHAR(7) NOT NULL,
    basic_salary DECIMAL(12, 2),
    allowances DECIMAL(12, 2) DEFAULT 0,
    overtime_amount DECIMAL(12, 2) DEFAULT 0,
    bonus DECIMAL(12, 2) DEFAULT 0,
    pf_deduction DECIMAL(12, 2) DEFAULT 0,
    esic_deduction DECIMAL(12, 2) DEFAULT 0,
    professional_tax_deduction DECIMAL(12, 2) DEFAULT 0,
    other_deductions DECIMAL(12, 2) DEFAULT 0,
    net_salary DECIMAL(12, 2),
    gross_salary DECIMAL(12, 2),
    status ENUM('DRAFT', 'APPROVED', 'PAID') DEFAULT 'DRAFT',
    payment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
    INDEX idx_employee_month (employee_id, payroll_month),
    INDEX idx_status (status),
    UNIQUE KEY unique_employee_payroll (employee_id, payroll_month)
);

-- Inventory Table
CREATE TABLE inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    item_code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(100),
    unit VARCHAR(20),
    quantity INT DEFAULT 0,
    reorder_level INT DEFAULT 0,
    unit_price DECIMAL(12, 2),
    supplier_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    INDEX idx_company (company_id),
    INDEX idx_item_code (item_code)
);

-- Material Inward Table
CREATE TABLE material_inward (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    vendor_id INT,
    inward_date DATE NOT NULL,
    total_amount DECIMAL(12, 2),
    gst_amount DECIMAL(12, 2) DEFAULT 0,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_company (company_id),
    INDEX idx_date (inward_date)
);

-- Material Inward Items Table
CREATE TABLE material_inward_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    inward_id INT NOT NULL,
    inventory_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(12, 2),
    total_price DECIMAL(12, 2),
    FOREIGN KEY (inward_id) REFERENCES material_inward(id) ON DELETE CASCADE,
    FOREIGN KEY (inventory_id) REFERENCES inventory(id),
    INDEX idx_inward (inward_id)
);

-- Material Outward Table
CREATE TABLE material_outward (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT,
    outward_date DATE NOT NULL,
    total_amount DECIMAL(12, 2),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_company (company_id),
    INDEX idx_date (outward_date)
);

-- Material Outward Items Table
CREATE TABLE material_outward_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    outward_id INT NOT NULL,
    inventory_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(12, 2),
    total_price DECIMAL(12, 2),
    FOREIGN KEY (outward_id) REFERENCES material_outward(id) ON DELETE CASCADE,
    FOREIGN KEY (inventory_id) REFERENCES inventory(id),
    INDEX idx_outward (outward_id)
);

-- Purchase Table
CREATE TABLE purchase (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    purchase_number VARCHAR(50) UNIQUE NOT NULL,
    vendor_id INT,
    purchase_date DATE NOT NULL,
    gst_number VARCHAR(20),
    total_amount DECIMAL(12, 2),
    gst_amount DECIMAL(12, 2) DEFAULT 0,
    net_amount DECIMAL(12, 2),
    status ENUM('DRAFT', 'APPROVED', 'RECEIVED', 'PAID') DEFAULT 'DRAFT',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_company (company_id),
    INDEX idx_status (status)
);

-- Purchase Items Table
CREATE TABLE purchase_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    purchase_id INT NOT NULL,
    inventory_id INT,
    description VARCHAR(255),
    quantity INT NOT NULL,
    unit_price DECIMAL(12, 2),
    total_price DECIMAL(12, 2),
    FOREIGN KEY (purchase_id) REFERENCES purchase(id) ON DELETE CASCADE,
    FOREIGN KEY (inventory_id) REFERENCES inventory(id),
    INDEX idx_purchase (purchase_id)
);

-- Vendor Table
CREATE TABLE vendor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    vendor_name VARCHAR(255) NOT NULL,
    vendor_code VARCHAR(50) UNIQUE,
    email VARCHAR(100),
    phone VARCHAR(20),
    gst_number VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    contact_person VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    INDEX idx_company (company_id)
);

-- Expense Table
CREATE TABLE expense (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    expense_date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    description TEXT,
    payment_method ENUM('CASH', 'CHEQUE', 'BANK_TRANSFER', 'CARD') DEFAULT 'CASH',
    receipt_path VARCHAR(255),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_company (company_id),
    INDEX idx_date (expense_date),
    INDEX idx_category (category)
);

-- Audit Log Table
CREATE TABLE audit_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100),
    entity_id INT,
    old_values JSON,
    new_values JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user (user_id),
    INDEX idx_date (created_at)
);

-- Insert default company
INSERT INTO company (name, registration_number, gst_number, pan_number, email, phone, address, city, state, country, postal_code, financial_year_start)
VALUES ('Default Company', 'REG123456', '18AABCU9603R1Z0', 'AAAPK1234C', 'admin@company.com', '9876543210', '123 Business Street', 'Mumbai', 'Maharashtra', 'India', '400001', '04-01');

-- Insert default departments
INSERT INTO department (name, company_id) VALUES ('Engineering', 1), ('Sales', 1), ('HR', 1), ('Operations', 1);

-- Insert default designations
INSERT INTO designation (name, company_id) VALUES ('Manager', 1), ('Senior Developer', 1), ('Developer', 1), ('Executive', 1), ('Intern', 1);

-- Insert default admin user
INSERT INTO users (username, email, password, role, status) 
VALUES ('admin', 'admin@erpsystem.com', '$2a$10$slYQmyNdGzSqe0ztk4kFae0/JlY5j7PH4RbQRJLp.h0YzmpW.KQAy', 'ADMIN', 'ACTIVE');

-- Insert default employee user
INSERT INTO users (username, email, password, role, status) 
VALUES ('employee1', 'employee1@erpsystem.com', '$2a$10$slYQmyNdGzSqe0ztk4kFae0/JlY5j7PH4RbQRJLp.h0YzmpW.KQAy', 'EMPLOYEE', 'ACTIVE');

-- Insert sample employee
INSERT INTO employee (user_id, employee_id, first_name, last_name, email, phone, department_id, designation_id, company_id, joining_date, status)
VALUES (2, 'EMP001', 'John', 'Doe', 'john.doe@company.com', '9876543210', 1, 3, 1, '2024-01-15', 'ACTIVE');

-- Insert sample salary structure
INSERT INTO salary_structure (employee_id, basic_salary, house_rent_allowance, effective_from)
VALUES (1, 50000, 15000, '2024-01-15');

-- Insert sample vendor
INSERT INTO vendor (company_id, vendor_name, vendor_code, email, phone, gst_number)
VALUES (1, 'ABC Suppliers', 'VENDOR001', 'contact@abcsupply.com', '9876543211', '18AABCS1234R1Z0');

-- Insert sample inventory
INSERT INTO inventory (company_id, item_name, item_code, category, unit, quantity, reorder_level, unit_price)
VALUES (1, 'Office Paper', 'INV001', 'Supplies', 'Reams', 500, 100, 250);
