-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2026 at 09:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `totem_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `itens_pedido`
--

CREATE TABLE `itens_pedido` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `item_nome` varchar(100) NOT NULL,
  `preco_unitario` decimal(10,2) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `cliente_nome` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `itens_pedido`
--

INSERT INTO `itens_pedido` (`id`, `pedido_id`, `item_nome`, `preco_unitario`, `quantidade`, `cliente_nome`) VALUES
(1, 1, 'Carpaccio di Manzo', 46.00, 1, 'Mikael'),
(2, 1, 'Risotto ai Frutti di Mare', 86.00, 1, 'Mikael'),
(3, 1, 'Pizza Diavola', 60.00, 1, 'Mikael'),
(4, 1, 'Tiramisù Tradicional', 32.00, 1, 'Mikael'),
(5, 1, 'Água com Gás', 8.00, 1, 'Mikael'),
(6, 1, 'Limoncello', 18.00, 1, 'Mikael'),
(7, 2, 'Burrata com Tomates Assados', 54.00, 1, 'Sara'),
(8, 2, 'Pizza Margherita', 52.00, 1, 'Sara'),
(9, 2, 'Risotto ai Frutti di Mare', 86.00, 1, 'Sara'),
(10, 2, 'Água com Gás', 8.00, 1, 'Sara'),
(11, 2, 'Taça de Vinho Tinto', 24.00, 1, 'Sara'),
(12, 3, 'Burrata com Tomates Assados', 54.00, 1, 'Henrique'),
(13, 3, 'Spaghetti Carbonara', 62.00, 1, 'Henrique'),
(14, 3, 'Petit Gâteau Belga', 28.00, 1, 'Henrique'),
(15, 3, 'Taça de Vinho Tinto', 24.00, 1, 'Henrique'),
(16, 4, 'Bruschetta al Pomodoro', 28.00, 1, 'Patrícia'),
(17, 4, 'Spaghetti Carbonara', 62.00, 1, 'Patrícia'),
(18, 4, 'Petit Gâteau Belga', 28.00, 1, 'Patrícia'),
(19, 4, 'Limoncello', 18.00, 1, 'Patrícia'),
(20, 5, 'Carpaccio di Manzo', 46.00, 1, 'Gabriel'),
(21, 5, 'Taça de Vinho Branco', 22.00, 1, 'Gabriel'),
(22, 6, 'Carpaccio di Manzo', 46.00, 1, 'Luana'),
(23, 6, 'Pizza Margherita', 52.00, 1, 'Luana'),
(24, 6, 'Petit Gâteau Belga', 28.00, 1, 'Luana'),
(25, 7, 'Burrata com Tomates Assados', 54.00, 1, 'Paola'),
(26, 8, 'Carpaccio di Manzo', 46.00, 1, 'Anna'),
(27, 9, 'Carpaccio di Manzo', 46.00, 1, 'Luana'),
(28, 9, 'Insalata Caprese', 38.00, 1, 'Luana'),
(29, 10, 'Pizza Diavola', 60.00, 1, 'Mikael'),
(30, 10, 'Espresso Italiano', 10.00, 1, 'Mikael'),
(31, 11, 'Gnocchi ao Quatro Queijos', 58.00, 1, 'Daniele'),
(32, 12, 'Carpaccio di Manzo', 46.00, 1, 'Fabio'),
(33, 12, 'Risotto ai Frutti di Mare', 86.00, 1, 'Fabio'),
(34, 12, 'Petit Gâteau Belga', 28.00, 1, 'Fabio'),
(35, 12, 'Taça de Vinho Branco', 22.00, 1, 'Fabio'),
(36, 13, 'Carpaccio di Manzo', 46.00, 1, NULL),
(37, 14, 'Carpaccio di Manzo', 46.00, 1, 'Bang Chan'),
(38, 14, 'Pizza Diavola', 60.00, 1, 'Bang Chan'),
(39, 15, 'Carpaccio di Manzo', 46.00, 1, 'Ana'),
(40, 16, 'Carpaccio di Manzo', 46.00, 1, 'ana'),
(41, 17, 'Burrata com Tomates Assados', 54.00, 1, 'Katarina'),
(42, 18, 'Spaghetti Carbonara', 62.00, 1, 'miguel'),
(43, 19, 'Gnocchi ao Quatro Queijos', 58.00, 1, 'gio');

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `codigo_pedido` varchar(10) NOT NULL,
  `cliente_nome` varchar(100) NOT NULL,
  `cliente_cpf` varchar(14) DEFAULT NULL,
  `tipo_consumo` varchar(20) NOT NULL,
  `metodo_pagamento` varchar(30) NOT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT 'pendente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`id`, `codigo_pedido`, `cliente_nome`, `cliente_cpf`, `tipo_consumo`, `metodo_pagamento`, `valor_total`, `data_criacao`, `status`) VALUES
(1, 'A73', 'Mikael', '000.000.000-00', 'local', 'debito', 250.00, '2026-07-13 22:14:20', 'concluido'),
(2, 'A54', 'Sara', '123.456.789-00', 'local', 'pix', 224.00, '2026-07-13 22:24:30', 'concluido'),
(3, 'A24', 'Henrique', '147.852.369-33', 'viagem', 'pix', 168.00, '2026-07-13 22:59:58', 'concluido'),
(4, 'A18', 'Patrícia', '963.258.741-23', 'local', 'pix', 136.00, '2026-07-14 02:03:04', 'concluido'),
(5, 'A64', 'Gabriel', '456.114.861-12', 'local', 'credito', 68.00, '2026-07-14 02:22:42', 'concluido'),
(6, 'A37', 'Luana', '410.258.963-11', 'local', 'debito', 126.00, '2026-07-14 03:02:17', 'concluido'),
(7, 'A76', 'Paola', '741.568.445-12', 'local', 'debito', 54.00, '2026-07-14 03:02:50', 'concluido'),
(8, 'A95', 'Anna', NULL, 'viagem', 'debito', 46.00, '2026-07-15 01:48:03', 'concluido'),
(9, 'A52', 'Luana', NULL, 'viagem', 'credito', 84.00, '2026-07-15 18:30:55', 'concluido'),
(10, 'A43', 'Mikael', '148.989.456-43', 'viagem', 'debito', 70.00, '2026-07-15 18:45:13', 'concluido'),
(11, 'A31', 'Daniele', NULL, 'local', 'pix', 58.00, '2026-07-15 20:14:01', 'concluido'),
(12, 'A39', 'Fabio', NULL, 'local', 'credito', 182.00, '2026-07-15 21:07:33', 'concluido'),
(13, 'A38', 'Weslley', '418.411.515-15', 'viagem', 'pix', 46.00, '2026-07-15 21:30:00', 'concluido'),
(14, 'A80', 'Bang Chan', NULL, 'local', 'pix', 106.00, '2026-07-15 21:38:10', 'pendente'),
(15, 'A73', 'Ana', '151.511.202-02', 'local', 'pix', 46.00, '2026-07-15 22:18:15', 'pendente'),
(16, 'A91', 'ana', NULL, 'local', 'pix', 46.00, '2026-07-15 22:19:53', 'pendente'),
(17, 'A60', 'Katarina', '154.854.351-31', 'local', 'credito', 54.00, '2026-07-16 04:38:07', 'concluido'),
(18, 'A28', 'miguel', NULL, 'viagem', 'pix', 62.00, '2026-07-16 04:47:04', 'concluido'),
(19, 'A53', 'gio', NULL, 'local', 'pix', 58.00, '2026-07-16 05:08:45', 'concluido');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `itens_pedido`
--
ALTER TABLE `itens_pedido`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `itens_pedido`
--
ALTER TABLE `itens_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
