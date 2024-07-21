CREATE DATABASE IF NOT EXISTS toitenvue;

USE toitenvue;

CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(20) UNIQUE NOT NULL,
    role VARCHAR(10) NOT NULL,
    password VARCHAR(120) NOT NULL
);

CREATE TABLE housing (
    housing_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    address VARCHAR(255) NOT NULL,
    bathrooms INT NOT NULL,
    bedrooms INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    description VARCHAR(2500) NOT NULL,
    highlights VARCHAR(255) NOT NULL,
    housing_condition VARCHAR(50) NOT NULL,
    living_space INT NOT NULL,
    price DOUBLE NOT NULL,
    rooms INT NOT NULL,
    title VARCHAR(120) NOT NULL,
    year_of_construction INT NOT NULL,
    zipcode INT NOT NULL,
    city VARCHAR(45) NOT NULL,
    user_id BIGINT(20) NOT NULL,
    CONSTRAINT fk_housing_user FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE booking (
    booking_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    beginning_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    user_id BIGINT(20) NOT NULL,
    user_id_interested BIGINT(20) NOT NULL,
    housing_id INT NOT NULL,
    CONSTRAINT fk_booking_user_id FOREIGN KEY(user_id) REFERENCES user(id),
    CONSTRAINT fk_booking_user_id_interested FOREIGN KEY(user_id_interested) REFERENCES user(id),
    CONSTRAINT fk_booking_housing FOREIGN KEY (housing_id) REFERENCES housing(housing_id)
);

CREATE TABLE file (
    file_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    file_name VARCHAR(255) NOT NULL,
    content_type VARCHAR(255) NOT NULL,
    housing_id INT NOT NULL,
    CONSTRAINT fk_file_housing FOREIGN KEY (housing_id) REFERENCES housing (housing_id)
);