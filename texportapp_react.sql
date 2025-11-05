-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2025 at 07:46 PM
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
-- Database: `texportapp_react`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('harsh@gmail.com|127.0.0.1', 'i:1;', 1762269190),
('harsh@gmail.com|127.0.0.1:timer', 'i:1762269190;', 1762269190);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_11_03_160937_laratrust_setup_tables', 1),
(5, '2025_11_03_163934_add_created_by_to_roles_table', 1),
(6, '2025_01_15_000000_modify_roles_unique_constraint', 2),
(7, '2025_11_05_164912_create_parties_table', 3),
(8, '2025_11_05_183212_add_party_number_to_parties_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `parties`
--

CREATE TABLE `parties` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `party_number` int(11) DEFAULT NULL,
  `party_name` varchar(255) NOT NULL,
  `gst_number` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `business_name` varchar(255) NOT NULL,
  `business_location` varchar(255) NOT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `parties`
--

INSERT INTO `parties` (`id`, `party_number`, `party_name`, `gst_number`, `phone_number`, `email`, `address`, `business_name`, `business_location`, `created_by`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Party First', 'GSTNUMBERPARTY', '+911234567890', 'party@gmail.com', 'Address', 'Business Name', 'Business Location', 1, '2025-11-05 12:38:29', '2025-11-05 12:50:39'),
(3, NULL, 'Harsh', '09AAACH7409R1ZZ', '7778884950', 'sdf@sdz.sf', 'szdfsgfdrgrv', 'dfsdfs', 'SDF', 1, '2025-11-05 12:56:23', '2025-11-05 12:56:23'),
(4, 3, 'Demo', '09AAACH7409R1ZZ', '8759802678', 'demo@jksdf.sdf', 'sdfdsdggsdg', 'sdf', 'sf', 1, '2025-11-05 13:11:16', '2025-11-05 13:11:16'),
(5, 4, 'demo', '09AAACH7409R1ZZ', '7645874563', 'def@fdzv.sgf', 'dgdsgdgdgfe', 'sf', 'dg', 10, '2025-11-05 13:12:30', '2025-11-05 13:12:30'),
(6, 4, 'sdsd', '09AAACH7409R1ZZ', '9887654563', 'df@dg.rtgsr', 'grgrsgerfgre', 'gare', 'aerg', 1, '2025-11-05 13:14:04', '2025-11-05 13:14:04'),
(7, 1, 'sfr', '09AAACH7409R1ZZ', '8764783672', 'weroi@ewrio.frt', 'orindjweuy', 'sfuei', 'ertoihn', 11, '2025-11-05 13:15:46', '2025-11-05 13:15:46');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'manage user', NULL, NULL, '2025-11-04 09:40:55', '2025-11-04 09:40:55'),
(2, 'create user', NULL, NULL, '2025-11-04 09:40:55', '2025-11-04 09:40:55'),
(3, 'view user', NULL, NULL, '2025-11-04 09:40:55', '2025-11-04 09:40:55'),
(4, 'edit user', NULL, NULL, '2025-11-04 09:40:55', '2025-11-04 09:40:55'),
(5, 'delete user', NULL, NULL, '2025-11-04 09:40:55', '2025-11-04 09:40:55'),
(6, 'create product', NULL, NULL, '2025-11-04 09:40:55', '2025-11-04 09:40:55'),
(7, 'edit product', NULL, NULL, '2025-11-04 09:40:55', '2025-11-04 09:40:55'),
(8, 'manage staff', NULL, NULL, '2025-11-04 10:15:25', '2025-11-04 10:15:25'),
(9, 'create staff', NULL, NULL, '2025-11-04 10:15:25', '2025-11-04 10:15:25'),
(10, 'edit staff', NULL, NULL, '2025-11-04 10:15:25', '2025-11-04 10:15:25'),
(11, 'delete staff', NULL, NULL, '2025-11-04 10:15:25', '2025-11-04 10:15:25'),
(12, 'manage role', NULL, NULL, '2025-11-04 10:32:06', '2025-11-04 10:32:06'),
(13, 'create role', NULL, NULL, '2025-11-04 10:32:06', '2025-11-04 10:32:06'),
(14, 'edit role', NULL, NULL, '2025-11-04 10:32:06', '2025-11-04 10:32:06'),
(15, 'delete role', NULL, NULL, '2025-11-04 10:32:06', '2025-11-04 10:32:06'),
(16, 'manage party', NULL, NULL, '2025-11-05 11:43:16', '2025-11-05 11:43:16'),
(17, 'create party', NULL, NULL, '2025-11-05 11:43:16', '2025-11-05 11:43:16'),
(18, 'edit party', NULL, NULL, '2025-11-05 11:43:16', '2025-11-05 11:43:16'),
(19, 'view party', NULL, NULL, '2025-11-05 11:43:16', '2025-11-05 11:43:16'),
(20, 'delete party', NULL, NULL, '2025-11-05 11:43:16', '2025-11-05 11:43:16');

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`permission_id`, `role_id`) VALUES
(1, 2),
(1, 5),
(1, 6),
(2, 5),
(2, 6),
(3, 5),
(3, 6),
(4, 5),
(4, 6),
(5, 5),
(5, 6),
(6, 4),
(6, 5),
(6, 6),
(7, 5),
(7, 6),
(8, 1),
(8, 2),
(8, 5),
(8, 6),
(9, 1),
(9, 2),
(9, 5),
(9, 6),
(10, 1),
(10, 5),
(10, 6),
(11, 1),
(11, 5),
(11, 6),
(12, 1),
(12, 5),
(12, 6),
(12, 7),
(13, 1),
(13, 5),
(13, 6),
(13, 7),
(14, 1),
(14, 5),
(14, 6),
(14, 7),
(15, 1),
(15, 5),
(15, 6),
(15, 7),
(16, 1),
(16, 2),
(17, 1),
(17, 2),
(17, 7),
(18, 1),
(19, 1),
(20, 1);

-- --------------------------------------------------------

--
-- Table structure for table `permission_user`
--

CREATE TABLE `permission_user` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `user_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `created_by`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, NULL, 'owner', NULL, NULL, '2025-11-04 09:40:55', '2025-11-04 09:40:55'),
(2, 1, 'Manager', NULL, NULL, '2025-11-04 09:44:09', '2025-11-04 09:44:09'),
(4, 11, 'Manager', NULL, NULL, '2025-11-05 10:51:57', '2025-11-05 10:51:57'),
(5, 11, 'Admin', NULL, NULL, '2025-11-05 10:52:31', '2025-11-05 10:52:31'),
(6, 1, 'Admin', NULL, NULL, '2025-11-05 10:53:05', '2025-11-05 10:53:05'),
(7, 1, 'Demo role', NULL, NULL, '2025-11-05 12:35:17', '2025-11-05 12:35:17');

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `user_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`role_id`, `user_id`, `user_type`) VALUES
(1, 1, 'App\\Models\\User'),
(2, 3, 'App\\Models\\User'),
(2, 4, 'App\\Models\\User'),
(2, 5, 'App\\Models\\User'),
(2, 6, 'App\\Models\\User'),
(2, 7, 'App\\Models\\User'),
(2, 8, 'App\\Models\\User'),
(2, 9, 'App\\Models\\User'),
(2, 10, 'App\\Models\\User'),
(1, 11, 'App\\Models\\User'),
(2, 12, 'App\\Models\\User');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('CnyfI5HVdvnAJMrpsU917siOW1ltozl5JyCADE9f', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiWnVTa1hJVTI1ZHR3SDljUzNmNjZDR3VCcHlQVHhlUzFINEtVSFJZSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHA6Ly9sb2NhbGhvc3QvcGFydGllcyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1762368248),
('nXVc9cSwGUuUdZgQzv8umohTf7URRqduUTFpVPLs', 11, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoib1JqMkVtSXNuUGdWVDFzeEpxWms2cDBrVU40dkE5elZXNk5iamt5ayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTY6Imh0dHA6Ly9sb2NhbGhvc3QiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxMTt9', 1762368347),
('Tw7oNb6BNI9yrNLU2r2vXJB7RhmAj8FEbVdlyXtH', 10, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiRFZMWERGemRPTks4ekQ3SVJyUHJTQVRDdzhJNk5MUXBoQndlaGprZCI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI2OiJodHRwOi8vbG9jYWxob3N0L2Rhc2hib2FyZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjEwO30=', 1762367850),
('yfAaZv6E8HYWMQAFgWfLvASxDDr0wX9IsNspNdSp', 10, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiR3k3TnJETjlpdmg2c0ZweDlnY3lkMGgyZjU4YWhIZk1naUIzcFFoOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHA6Ly9sb2NhbGhvc3QvcGFydGllcyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjEwO30=', 1762368288);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'owner',
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `is_staff` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `created_by`, `is_staff`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', '2025-11-04 09:40:56', '$2y$12$dLx78tABGwrk.LY5qjKmkexpdRrbnzd8INBOITxwcba29l/AmbCei', 'owner', NULL, 0, 'Wso0At3cqo', '2025-11-04 09:40:56', '2025-11-04 09:40:56'),
(10, 'divy', 'divy@gmail.com', NULL, '$2y$12$vqh8/Xm8K/T1.u4t0i9fPeiRGErA3URug2DDhabUBnFUBcGlD2Psm', 'Manager', 1, 1, NULL, '2025-11-05 10:26:06', '2025-11-05 10:26:06'),
(11, 'harsh', 'harsh@gmail.com', NULL, '$2y$12$V0znjbRMJx2Fm2dre.aRn.neno/gvQukjvtDzfgN7K4B3hiO9ucda', 'owner', NULL, 0, NULL, '2025-11-05 10:48:47', '2025-11-05 10:48:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parties`
--
ALTER TABLE `parties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parties_created_by_foreign` (`created_by`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`);

--
-- Indexes for table `permission_user`
--
ALTER TABLE `permission_user`
  ADD PRIMARY KEY (`user_id`,`permission_id`,`user_type`),
  ADD KEY `permission_user_permission_id_foreign` (`permission_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_created_by_unique` (`name`,`created_by`),
  ADD KEY `roles_created_by_foreign` (`created_by`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`user_id`,`role_id`,`user_type`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_created_by_foreign` (`created_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `parties`
--
ALTER TABLE `parties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `parties`
--
ALTER TABLE `parties`
  ADD CONSTRAINT `parties_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `permission_user`
--
ALTER TABLE `permission_user`
  ADD CONSTRAINT `permission_user_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
