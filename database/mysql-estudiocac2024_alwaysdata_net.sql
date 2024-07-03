-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-estudiocac2024.alwaysdata.net
-- Generation Time: Jul 03, 2024 at 03:27 PM
-- Server version: 10.6.17-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `estudiocac2024_tienda_sm`
--
CREATE DATABASE IF NOT EXISTS `estudiocac2024_tienda_sm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `estudiocac2024_tienda_sm`;

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `descripcion`) VALUES
(1, 'tortas', 'tortas varias'),
(2, 'postres', 'Postres varios'),
(3, 'tartas', 'tartas varias');

-- --------------------------------------------------------

--
-- Table structure for table `detalle`
--

CREATE TABLE `detalle` (
  `id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `factura_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `factura`
--

CREATE TABLE `factura` (
  `num_factura` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `modo_pago_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `login`
--
DELIMITER $$
CREATE TRIGGER `before_insert_usuario` BEFORE INSERT ON `login` FOR EACH ROW BEGIN
    DECLARE count_rows INT;
    SELECT COUNT(*) INTO count_rows FROM login;
    IF count_rows = 0 THEN
        SET NEW.id = 1;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `modo_pago`
--

CREATE TABLE `modo_pago` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `otros_detalles` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `urlfoto` varchar(100) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `precio`, `stock`, `urlfoto`, `categoria_id`) VALUES
(1, 'Arrollado de Matcha', 15500, 10, 'https://i.postimg.cc/SxVjZ539/arrollado-matcha.jpg', 2),
(6, 'Pavlova', 25000, 7, 'https://i.postimg.cc/3rPGpsQJ/pavlova.jpg', 2),
(7, 'Macarons', 10000, 20, 'https://i.postimg.cc/pV98m276/macarons.jpg', 2),
(8, 'Sabayón de oporto', 15000, 11, 'https://i.postimg.cc/Bt9J65y4/sabayon-oporto.jpg', 2),
(9, 'Carrot cake', 28000, 9, 'https://i.postimg.cc/HLZcLKtm/carrot-cake.jpg', 2),
(10, 'Pera al vino tinto', 18000, 5, 'https://i.postimg.cc/gkVxhrKN/pera-al-vino-tinto.jpg', 2),
(11, 'Cheesecake', 25000, 5, 'https://i.postimg.cc/ZYyBTwvk/cheesecake.jpg', 2),
(12, 'Petit gateau', 18000, 7, 'https://i.postimg.cc/13yfrPCP/petit-gateau.jpg', 2);

--
-- Triggers `producto`
--
DELIMITER $$
CREATE TRIGGER `before_insert_producto` BEFORE INSERT ON `producto` FOR EACH ROW BEGIN
        DECLARE count_rows INT;
		SELECT COUNT(*) INTO count_rows FROM producto;
		IF count_rows = 0 THEN
			SET NEW.id = 1;
		END IF;
    END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `usuario`
--
DELIMITER $$
CREATE TRIGGER `before_create_user` BEFORE INSERT ON `usuario` FOR EACH ROW BEGIN
            DECLARE count_rows INT;
            SELECT COUNT(*) INTO count_rows FROM usuario;
                IF count_rows = 0 THEN
                SET NEW.id = 1;
                END IF;
    	 END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detalle`
--
ALTER TABLE `detalle`
  ADD PRIMARY KEY (`id`,`factura_id`),
  ADD KEY `fk_detalle_factura1_idx` (`factura_id`),
  ADD KEY `fk_detalle_producto1_idx` (`producto_id`);

--
-- Indexes for table `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`num_factura`),
  ADD KEY `fk_factura_usuario1_idx` (`usuario_id`),
  ADD KEY `fk_factura_modo_pago1_idx` (`modo_pago_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `fk_login_usuario1_idx` (`usuario_id`);

--
-- Indexes for table `modo_pago`
--
ALTER TABLE `modo_pago`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_producto_categoria1_idx` (`categoria_id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `detalle`
--
ALTER TABLE `detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `factura`
--
ALTER TABLE `factura`
  MODIFY `num_factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `modo_pago`
--
ALTER TABLE `modo_pago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detalle`
--
ALTER TABLE `detalle`
  ADD CONSTRAINT `fk_detalle_factura1` FOREIGN KEY (`factura_id`) REFERENCES `factura` (`num_factura`),
  ADD CONSTRAINT `fk_detalle_producto1` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`);

--
-- Constraints for table `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `fk_factura_modo_pago1` FOREIGN KEY (`modo_pago_id`) REFERENCES `modo_pago` (`id`),
  ADD CONSTRAINT `fk_factura_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `fk_login_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_producto_categoria1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
