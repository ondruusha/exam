CREATE DATABASE IF NOT EXISTS BankATM;
USE BankATM;

CREATE TABLE ATMs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bankName VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('Active', 'Inactive') NOT NULL
);

INSERT INTO ATMs (bankName, location, status) VALUES
('Bank A', 'City X', 'Active'),
('Bank B', 'City Y', 'Inactive'),
('Bank C', 'City Z', 'Active');