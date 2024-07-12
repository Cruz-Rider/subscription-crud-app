--@block
CREATE TABLE Admin(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255)
);

--@block
DROP DATABASE world;

--@block
SELECT * FROM admin;