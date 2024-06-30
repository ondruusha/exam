-- Создание таблицы Банки
CREATE TABLE Banks (
    bank_code INT PRIMARY KEY,
    bank_name VARCHAR(100),
    legal_address VARCHAR(255)
);

-- Создание таблицы Банкоматы
CREATE TABLE ATMs (
    atm_number INT PRIMARY KEY,
    address VARCHAR(255),
    bank_code INT,
    FOREIGN KEY (bank_code) REFERENCES Banks(bank_code)
);

-- Создание таблицы Клиенты
CREATE TABLE Clients (
    card_number VARCHAR(19) PRIMARY KEY,
    full_name VARCHAR(100),
    address VARCHAR(255),
    bank_code INT,
    FOREIGN KEY (bank_code) REFERENCES Banks(bank_code)
);

-- Создание таблицы Операции
CREATE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    card_number VARCHAR(19),
    atm_number INT,
    date_time DATETIME,
    commission BOOLEAN,
    amount DECIMAL(10, 2),
    FOREIGN KEY (card_number) REFERENCES Clients(card_number),
    FOREIGN KEY (atm_number) REFERENCES ATMs(atm_number)
);