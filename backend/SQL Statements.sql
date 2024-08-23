-- Groups Table
CREATE TABLE `groups` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Subgroups Table
CREATE TABLE `subgroups` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (group_id) REFERENCES `groups`(id) ON DELETE CASCADE
);

-- Products Table
CREATE TABLE `products` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subgroup_id INT,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (subgroup_id) REFERENCES `subgroups`(id) ON DELETE CASCADE
);

-- Orders Table
CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Order Details Table
CREATE TABLE `productorder` (
  product_id INT,
  order_id INT,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- users details Table
CREATE TABLE `users` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO `groups` (name) VALUES 
('Electronics'),
('Furniture'),
('Clothing');

INSERT INTO `subgroups` (group_id, name) VALUES 
(1, 'Mobile Phones'),
(1, 'Laptops'),
(2, 'Sofas'),
(2, 'Tables'),
(3, 'Men Wear'),
(3, 'Women Wear');

INSERT INTO `products` (name, subgroup_id, price) VALUES 
('iPhone 14', 1, 999.99),
('MacBook Pro', 2, 1999.99),
('Leather Sofa', 3, 499.99),
('Wooden Dining Table', 4, 299.99),
('Men T-Shirt', 5, 19.99),
('Women Dress', 6, 39.99);

INSERT INTO `Orders` (`createdAt`, `updatedAt`) VALUES
(NOW(), NOW()),
(NOW(), NOW()),
(NOW(), NOW());

INSERT INTO `ProductOrder` (product_id, order_id, quantity) VALUES
(1, 1, 2),
(2, 1, 1),
(3, 2, 3),
(1, 3, 1),
(3, 3, 2);
