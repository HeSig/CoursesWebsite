-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1:3308
-- Tid vid skapande: 05 jul 2021 kl 16:42
-- Serverversion: 8.0.18
-- PHP-version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `coursedb`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `company`
--

DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumpning av Data i tabell `company`
--

INSERT INTO `company` (`id`, `name`, `email`, `phone`) VALUES
(1, 'test', 'test@test.se', '12345'),
(2, 'Skövde däck och fälg', 'Info@SDF.se', '12512513513'),
(3, 'Deep Space 9', 'info@DS9.fdr', '13515132354'),
(4, 'Deep Space 9', 'info@DS9.fdr', '12512513513');

-- --------------------------------------------------------

--
-- Tabellstruktur `course`
--

DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumpning av Data i tabell `course`
--

INSERT INTO `course` (`id`, `courseName`) VALUES
(1, 'Cutting trees, the ins and outs'),
(2, 'CSS and you - a love story'),
(3, 'Baking mud cakes using actual mud'),
(4, 'Christmas eve - myth or reality?'),
(5, 'LEGO colors through time');

-- --------------------------------------------------------

--
-- Tabellstruktur `participant`
--

DROP TABLE IF EXISTS `participant`;
CREATE TABLE IF NOT EXISTS `participant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyId` int(11) NOT NULL,
  `fname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lname` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `companyId` (`companyId`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumpning av Data i tabell `participant`
--

INSERT INTO `participant` (`id`, `companyId`, `fname`, `lname`, `phone`, `email`) VALUES
(1, 1, 'Test', 'Testsson', '12345', 'test@test.se'),
(2, 2, 'Sven', 'Svensson', '1241241', 'Sven.Svensson@SDF.se'),
(3, 1, 'Test2', 'Testsson2', '12345', 'test2@test.se'),
(4, 3, 'Benjamin', 'Sisko', '15251352352', 'Benjamin.Sisko@DS9.fdr'),
(5, 3, 'Nerys', 'Kira', '1346462423', 'Kira.Nerys@DS9.fdr'),
(6, 3, 'jadzia', 'Dax', '13534234562345', 'Jadzia.Dax@DS9.fdr'),
(7, 3, 'Odo', 'Just Odo', '135255234', 'Odo@ds9.fdr');

-- --------------------------------------------------------

--
-- Tabellstruktur `participation`
--

DROP TABLE IF EXISTS `participation`;
CREATE TABLE IF NOT EXISTS `participation` (
  `schedule` int(11) NOT NULL,
  `participant` int(11) NOT NULL,
  KEY `schedule` (`schedule`),
  KEY `participant` (`participant`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumpning av Data i tabell `participation`
--

INSERT INTO `participation` (`schedule`, `participant`) VALUES
(2, 1),
(9, 2),
(13, 1),
(13, 3),
(11, 1),
(7, 1),
(13, 4),
(13, 5),
(13, 6),
(13, 7);

-- --------------------------------------------------------

--
-- Tabellstruktur `schedule`
--

DROP TABLE IF EXISTS `schedule`;
CREATE TABLE IF NOT EXISTS `schedule` (
  `scheduleId` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `course` int(11) NOT NULL,
  PRIMARY KEY (`scheduleId`),
  KEY `course` (`course`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumpning av Data i tabell `schedule`
--

INSERT INTO `schedule` (`scheduleId`, `date`, `course`) VALUES
(1, '2017-01-01', 1),
(2, '2017-10-31', 1),
(3, '2017-05-25', 2),
(4, '2017-05-26', 2),
(5, '2017-05-27', 2),
(6, '2017-01-01', 3),
(7, '2018-12-10', 3),
(8, '2017-04-01', 3),
(9, '2019-03-12', 3),
(10, '2017-12-24', 4),
(11, '2018-12-24', 4),
(12, '2019-12-24', 4),
(13, '2017-06-30', 5);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
