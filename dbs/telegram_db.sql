-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2018 at 04:23 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `telegram_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_mensajes`
--

CREATE TABLE `tbl_mensajes` (
  `codigo_mensaje` int(11) NOT NULL,
  `codigo_usuario_emisor` int(11) NOT NULL,
  `codigo_usuario_receptor` int(11) NOT NULL,
  `mensaje` varchar(4000) DEFAULT NULL,
  `fecha_hora` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_mensajes`
--

INSERT INTO `tbl_mensajes` (`codigo_mensaje`, `codigo_usuario_emisor`, `codigo_usuario_receptor`, `mensaje`, `fecha_hora`) VALUES
(1, 1, 2, 'Hola Vegeta', '2012-12-12'),
(2, 2, 1, 'No molestes estupido insecto', '2017-10-18'),
(3, 1, 2, 'Ok :(', '2017-10-23'),
(4, 1, 2, 'Nuevo mensaje', '2016-05-22'),
(5, 1, 2, 'Nuevo mensaje 2', '2016-05-22'),
(6, 1, 2, 'Nuevo mensaje 2', '2016-05-22'),
(7, 1, 2, 'Otro nuevo mensaje', '2016-05-22');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_usuarios`
--

CREATE TABLE `tbl_usuarios` (
  `codigo_usuario` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `fotografia` varchar(1000) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_usuarios`
--

INSERT INTO `tbl_usuarios` (`codigo_usuario`, `nombre`, `apellido`, `usuario`, `fotografia`, `telefono`) VALUES
(1, 'Goku', 'Rodriguez', '@goku', '/img/profile-pics/goku.jpg', '11'),
(2, 'Vegeta', 'Martinez', '@vegeta', '/img/profile-pics/vegeta.jpg', '22'),
(3, 'Trunks', 'Lopez', '@trunks', '/img/profile-pics/trunks.jpg', '33'),
(4, 'Bulma', 'Gomez', '@bulma', '/img/profile-pics/bulma.jpg', '44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_mensajes`
--
ALTER TABLE `tbl_mensajes`
  ADD PRIMARY KEY (`codigo_mensaje`),
  ADD KEY `fk_tbl_mensajes_tbl_usuarios_idx` (`codigo_usuario_emisor`),
  ADD KEY `fk_tbl_mensajes_tbl_usuarios1_idx` (`codigo_usuario_receptor`);

--
-- Indexes for table `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD PRIMARY KEY (`codigo_usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_mensajes`
--
ALTER TABLE `tbl_mensajes`
  MODIFY `codigo_mensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  MODIFY `codigo_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_mensajes`
--
ALTER TABLE `tbl_mensajes`
  ADD CONSTRAINT `fk_tbl_mensajes_tbl_usuarios` FOREIGN KEY (`codigo_usuario_emisor`) REFERENCES `tbl_usuarios` (`codigo_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tbl_mensajes_tbl_usuarios1` FOREIGN KEY (`codigo_usuario_receptor`) REFERENCES `tbl_usuarios` (`codigo_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
