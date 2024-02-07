-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 06, 2024 at 03:16 PM
-- Server version: 10.6.16-MariaDB-cll-lve-log
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cfjylqr1_message`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `message_text` text DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `sender_id`, `receiver_id`, `message_text`, `timestamp`) VALUES
(18, 1, 3, '124', '2024-01-23 21:41:19'),
(19, 1, 3, 'srg', '2024-01-23 21:46:45'),
(20, 1, 3, 'we', '2024-01-23 21:58:23'),
(22, 1, 3, 'drg', '2024-01-23 22:04:26'),
(23, 1, 3, 'efsd', '2024-01-23 22:05:39'),
(24, 1, 3, 'asc', '2024-01-23 22:06:10'),
(25, 1, 3, 'sdv', '2024-01-23 22:07:40'),
(26, 1, 3, 'sdv', '2024-01-23 22:09:05'),
(27, 1, 3, 'Ñ‹Ð²Ð¼', '2024-01-23 22:30:10'),
(28, 1, 3, '123', '2024-01-24 02:59:12'),
(29, 1, 3, '123', '2024-01-24 17:31:01'),
(30, 1, 3, 'dr', '2024-01-24 17:31:55'),
(31, 1, 3, 'egrer', '2024-01-24 18:24:12'),
(32, 1, 3, 'test', '2024-01-24 23:32:28'),
(33, 1, 3, 'web test', '2024-01-24 23:44:32'),
(34, 1, 3, 'aesfvaesfv', '2024-01-24 23:46:36'),
(35, 1, 3, 'sdvsdvs', '2024-01-24 23:47:12'),
(36, 1, 3, 'afas', '2024-01-24 23:57:56'),
(37, 1, 2, '', '2024-01-25 00:05:48'),
(38, 1, 4, 'rgbsrbs', '2024-01-25 00:05:59'),
(39, 1, 2, 'efsvdv', '2024-01-25 00:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `user_history` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `user_history`, `user_id`) VALUES
(34, '2024-02-01 22:57:33', 1),
(35, '2024-02-01 22:57:33', 1),
(36, '2024-02-01 22:57:33', 1),
(37, '2024-02-01 22:57:33', 1),
(38, '2024-02-01 22:57:33', 1),
(39, '2024-02-01 22:57:33', 1),
(40, '2024-02-01 22:57:33', 1),
(41, '2024-02-01 22:57:33', 1),
(42, '2024-02-01 22:57:33', 1);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `image_name`, `image_path`, `user_id`) VALUES
(28, '65ad7f819bc6e_snowflake.png', 'uploads/gallery/65ad7f819bc6e_snowflake.png', 1),
(30, '65ad820edfa30_snowflake.png', 'uploads/gallery/65ad820edfa30_snowflake.png', 1),
(32, '65af25d7b1325_downloadedItem.png', 'uploads/gallery/65af25d7b1325_downloadedItem.png', 1),
(33, '65afe5acbdd89_snowflake.png', 'uploads/gallery/65afe5acbdd89_snowflake.png', 1),
(34, '65afea5d00a11_snowflake.png', 'uploads/gallery/65afea5d00a11_snowflake.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `name`, `email`, `message`) VALUES
(65, 'Antoni', 'anton.onokhin2@gmail.com', 'test'),
(66, 'Antoni', 'anton.onokhin2@gmail.com', '12'),
(67, 'Antoni', 'anton.onokhin2@gmail.com', '123'),
(68, '123', 'anton.onokhin2@gmail.com', '13'),
(69, 'Antoni', 'anton.onokhin2@gmail.com', '12'),
(70, 'Antoni', 'anton.onokhin2@gmail.com', 'check'),
(71, 'Antoni', 'anton.onokhin2@gmail.com', '132'),
(72, 'test', 'anton.onokhin2@gmail.com', '123'),
(73, 'test', '123@123', '123');

-- --------------------------------------------------------

--
-- Table structure for table `music`
--

CREATE TABLE `music` (
  `id` int(11) NOT NULL,
  `music_name` varchar(255) NOT NULL,
  `music_path` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `music`
--

INSERT INTO `music` (`id`, `music_name`, `music_path`, `user_id`) VALUES
(1, '65aa160d6ec37_funkyDark.mp3', 'uploads/65aa160d6ec37_funkyDark.mp3', NULL),
(2, '65aa8b0fe67dc_funkyDark.mp3', 'uploads/65aa8b0fe67dc_funkyDark.mp3', NULL),
(3, '65aab4df773e2_funkyDark.mp3', 'uploads/65aab4df773e2_funkyDark.mp3', NULL),
(4, '65ad93b31fe68_deltree.mp3', 'uploads/65ad93b31fe68_deltree.mp3', 1),
(5, '65ad94ccbf460_deltree.mp3', 'uploads/65ad94ccbf460_deltree.mp3', 1),
(7, '65aee92e3de6c_65aa160d6ec37_funkyDark.mp3', 'uploads/65aee92e3de6c_65aa160d6ec37_funkyDark.mp3', 1),
(8, '65af2872cdab4_65aa160d6ec37_funkyDark.mp3', 'uploads/65af2872cdab4_65aa160d6ec37_funkyDark.mp3', 1),
(9, '65afe8b830e3c_downloadedAudio.mp3', 'uploads/65afe8b830e3c_downloadedAudio.mp3', 1);

-- --------------------------------------------------------

--
-- Table structure for table `userHtml`
--

CREATE TABLE `userHtml` (
  `id` int(11) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `htmlPath` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `userHtml`
--

INSERT INTO `userHtml` (`id`, `fileName`, `htmlPath`, `userId`, `created_at`, `author`) VALUES
(2, 'test', '../html/php/uploads/userTexts/test.html', 1, '2024-01-25 15:50:21', 'tony'),
(3, 'web test', 'uploads/userTexts/web test.html', 1, '2024-01-25 17:32:59', 'tony'),
(4, 'webTest', 'uploads/userTexts/webTest.html', 1, '2024-01-25 17:34:03', 'tony'),
(5, 'asfd', '../html/php/uploads/userTexts/asfd.html', 1, '2024-01-25 17:51:11', 'tony'),
(6, 'thdb', '../html/php/uploads/userTexts/thdb.html', 1, '2024-01-26 01:35:33', 'tony');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reset_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `reset_code`) VALUES
(1, 'tony', 'anton.onokhin2@gmail.com', '$2y$10$Uj0mT3k/YcAb5Fa0hC5gEenqFxQxqO1dJPK2EbPxaK5OMZkjWmXCS', '0a5808b364a8c4f5f0f052e9260f46aa'),
(2, 'test1', '123@123', '$2y$10$dxRJPu/VcaOy1UBtMlWmtede0RLImkbuP93JILkkkaQg.hz9qJUyS', NULL),
(3, 'test', '123@132', '$2y$10$PxEG4mEFydv6GvcrRE0xp.Aoi8Px4P0.dZ0C6N65vyOSrn9E8vFQq', NULL),
(4, 'test2', 'onokhin2@gmail.com', '$2y$10$CgGEA.qZqLzOYzRzFXCGg.zWS78JbOpOGBAdzMT.X4zKUhzSAOhKy', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_notes`
--

CREATE TABLE `user_notes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_notes`
--

INSERT INTO `user_notes` (`id`, `user_id`, `title`, `content`, `created_at`) VALUES
(3, 6, 'test', 'text', '2024-01-16 18:35:26'),
(4, 6, 'test4', 'text', '2024-01-16 18:38:58'),
(6, 1, 'test', 'text', '2024-01-17 00:38:51'),
(7, 11, 'newNote', '123', '2024-01-17 01:42:14'),
(8, 1, 'text', '123', '2024-01-17 14:54:33'),
(11, 1, 'test', 'text', '2024-01-23 15:39:58'),
(12, 1, 'test', ',mngbfv', '2024-01-23 15:46:19'),
(15, 1, 'srgrg', 'ef', '2024-01-27 01:30:39'),
(16, 1, 'srgrg', 'sgdfb', '2024-01-27 03:06:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userHtml`
--
ALTER TABLE `userHtml`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_notes`
--
ALTER TABLE `user_notes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `userHtml`
--
ALTER TABLE `userHtml`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_notes`
--
ALTER TABLE `user_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
