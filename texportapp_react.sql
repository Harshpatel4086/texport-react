-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2025 at 11:00 AM
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
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `staff_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `status` enum('present','absent') NOT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`id`, `staff_id`, `date`, `status`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 10, '2025-11-06', 'present', 1, '2025-11-06 12:49:21', '2025-11-06 12:53:06'),
(3, 14, '2025-11-06', 'absent', 11, '2025-11-06 13:01:56', '2025-11-06 13:01:56'),
(5, 10, '2025-11-07', 'absent', 1, '2025-11-06 13:07:32', '2025-11-06 13:07:32'),
(7, 10, '2025-11-05', 'present', 1, '2025-11-06 13:08:03', '2025-11-06 13:08:03'),
(9, 10, '2025-11-03', 'absent', 1, '2025-11-06 13:08:16', '2025-11-06 13:08:16'),
(10, 14, '2025-11-07', 'present', 11, '2025-11-07 10:17:06', '2025-11-07 10:17:06'),
(12, 10, '2025-10-30', 'present', 1, '2025-11-07 11:13:19', '2025-11-07 11:13:19'),
(14, 10, '2025-12-06', 'absent', 1, '2025-12-06 03:26:11', '2025-12-06 05:07:33');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Table structure for table `challans`
--

CREATE TABLE `challans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `challan_number` int(11) NOT NULL,
  `party_id` bigint(20) UNSIGNED NOT NULL,
  `quality_id` bigint(20) UNSIGNED DEFAULT NULL,
  `total_meter` decimal(10,2) NOT NULL,
  `total_lots` int(11) NOT NULL,
  `date` date NOT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `challans`
--

INSERT INTO `challans` (`id`, `challan_number`, `party_id`, `quality_id`, `total_meter`, `total_lots`, `date`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 1, 7, NULL, 718.00, 1, '2025-12-27', 11, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(2, 2, 7, NULL, 26.00, 1, '2025-12-27', 11, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(3, 3, 7, 2, 160.00, 1, '2025-12-28', 11, '2025-12-28 08:21:16', '2025-12-30 04:27:47'),
(4, 4, 7, 2, 723.99, 5, '2025-12-28', 11, '2025-12-28 09:09:50', '2025-12-30 03:07:16');

-- --------------------------------------------------------

--
-- Table structure for table `challan_items`
--

CREATE TABLE `challan_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `challan_id` bigint(20) UNSIGNED NOT NULL,
  `sr_number` int(11) NOT NULL,
  `meter` decimal(8,2) NOT NULL,
  `group_number` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `challan_items`
--

INSERT INTO `challan_items` (`id`, `challan_id`, `sr_number`, `meter`, `group_number`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 90.00, 1, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(2, 1, 2, 95.00, 1, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(3, 1, 3, 85.00, 1, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(4, 1, 4, 80.00, 1, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(5, 1, 5, 70.00, 1, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(6, 1, 6, 50.00, 1, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(7, 1, 7, 45.00, 1, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(8, 1, 8, 25.00, 1, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(9, 1, 9, 35.00, 1, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(10, 1, 10, 38.00, 1, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(11, 1, 11, 50.00, 1, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(12, 1, 12, 55.00, 1, '2025-12-27 12:22:06', '2025-12-27 12:22:06'),
(13, 2, 1, 1.00, 1, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(14, 2, 2, 2.00, 1, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(15, 2, 3, 3.00, 1, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(16, 2, 4, 4.00, 1, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(17, 2, 5, 2.00, 1, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(18, 2, 6, 3.00, 1, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(19, 2, 7, 5.00, 1, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(20, 2, 8, 2.00, 1, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(21, 2, 9, 1.00, 1, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(22, 2, 10, 1.00, 1, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(23, 2, 11, 1.00, 1, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(24, 2, 12, 1.00, 1, '2025-12-27 12:25:07', '2025-12-27 12:25:07'),
(301, 4, 1, 10.00, 1, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(302, 4, 2, 11.00, 1, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(303, 4, 3, 12.00, 1, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(304, 4, 4, 13.00, 1, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(305, 4, 5, 14.00, 1, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(306, 4, 6, 15.00, 1, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(307, 4, 7, 10.00, 1, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(308, 4, 8, 11.00, 1, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(309, 4, 9, 12.00, 1, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(310, 4, 10, 13.00, 1, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(311, 4, 11, 14.00, 1, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(312, 4, 12, 15.00, 1, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(313, 4, 13, 10.00, 2, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(314, 4, 14, 11.00, 2, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(315, 4, 15, 12.00, 2, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(316, 4, 16, 13.00, 2, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(317, 4, 17, 14.00, 2, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(318, 4, 18, 15.00, 2, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(319, 4, 19, 16.00, 2, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(320, 4, 20, 17.00, 2, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(321, 4, 21, 18.00, 2, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(322, 4, 22, 19.00, 2, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(323, 4, 23, 20.00, 2, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(324, 4, 24, 25.00, 2, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(325, 4, 25, 12.00, 3, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(326, 4, 26, 11.00, 3, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(327, 4, 27, 12.00, 3, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(328, 4, 28, 11.00, 3, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(329, 4, 29, 12.00, 3, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(330, 4, 30, 11.00, 3, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(331, 4, 31, 12.00, 3, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(332, 4, 32, 11.00, 3, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(333, 4, 33, 12.00, 3, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(334, 4, 34, 11.00, 3, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(335, 4, 35, 12.00, 3, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(336, 4, 36, 10.99, 3, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(337, 4, 37, 10.00, 4, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(338, 4, 38, 11.00, 4, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(339, 4, 39, 10.00, 4, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(340, 4, 40, 11.00, 4, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(341, 4, 41, 10.00, 4, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(342, 4, 42, 11.00, 4, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(343, 4, 43, 10.00, 4, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(344, 4, 44, 11.00, 4, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(345, 4, 45, 10.00, 4, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(346, 4, 46, 11.00, 4, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(347, 4, 47, 10.00, 4, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(348, 4, 48, 11.00, 4, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(349, 4, 49, 10.00, 5, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(350, 4, 50, 10.00, 5, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(351, 4, 51, 10.00, 5, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(352, 4, 52, 10.00, 5, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(353, 4, 53, 10.00, 5, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(354, 4, 54, 10.00, 5, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(355, 4, 55, 10.00, 5, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(356, 4, 56, 10.00, 5, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(357, 4, 57, 10.00, 5, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(358, 4, 58, 10.00, 5, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(359, 4, 59, 10.00, 5, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(360, 4, 60, 10.00, 5, '2025-12-30 03:07:16', '2025-12-30 03:07:16'),
(361, 3, 1, 10.00, 1, '2025-12-30 04:27:47', '2025-12-30 04:27:47'),
(362, 3, 2, 11.00, 1, '2025-12-30 04:27:47', '2025-12-30 04:27:47'),
(363, 3, 3, 12.00, 1, '2025-12-30 04:27:47', '2025-12-30 04:27:47'),
(364, 3, 4, 13.00, 1, '2025-12-30 04:27:47', '2025-12-30 04:27:47'),
(365, 3, 5, 14.00, 1, '2025-12-30 04:27:47', '2025-12-30 04:27:47'),
(366, 3, 6, 15.00, 1, '2025-12-30 04:27:47', '2025-12-30 04:27:47'),
(367, 3, 7, 10.00, 1, '2025-12-30 04:27:47', '2025-12-30 04:27:47'),
(368, 3, 8, 11.00, 1, '2025-12-30 04:27:47', '2025-12-30 04:27:47'),
(369, 3, 9, 12.00, 1, '2025-12-30 04:27:47', '2025-12-30 04:27:47'),
(370, 3, 10, 13.00, 1, '2025-12-30 04:27:47', '2025-12-30 04:27:47'),
(371, 3, 11, 14.00, 1, '2025-12-30 04:27:47', '2025-12-30 04:27:47'),
(372, 3, 12, 25.00, 1, '2025-12-30 04:27:47', '2025-12-30 04:27:47');

-- --------------------------------------------------------

--
-- Table structure for table `fabric_stocks`
--

CREATE TABLE `fabric_stocks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `fabric_type` varchar(255) NOT NULL,
  `gsm` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `lot_no` varchar(255) NOT NULL,
  `roll_count` int(11) NOT NULL,
  `total_weight` decimal(10,2) NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `vendor_party_id` bigint(20) UNSIGNED NOT NULL,
  `received_date` date NOT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fabric_stocks`
--

INSERT INTO `fabric_stocks` (`id`, `user_id`, `fabric_type`, `gsm`, `color`, `lot_no`, `roll_count`, `total_weight`, `rate`, `vendor_party_id`, `received_date`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 11, 'Cotton', '200', 'White', 'CT-240120-001', 20, 1000.00, 180.00, 7, '2025-12-01', 'Premium quality for bed sheets', '2025-12-12 12:28:51', '2025-12-12 12:28:51');

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
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` int(11) NOT NULL,
  `challan_id` bigint(20) UNSIGNED NOT NULL,
  `party_id` bigint(20) UNSIGNED NOT NULL,
  `quality_id` bigint(20) UNSIGNED NOT NULL,
  `total_meter` decimal(10,2) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `base_amount` decimal(10,2) NOT NULL,
  `cgst_percentage` decimal(5,2) DEFAULT NULL,
  `sgst_percentage` decimal(5,2) DEFAULT NULL,
  `igst_percentage` decimal(5,2) DEFAULT NULL,
  `cgst_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `sgst_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `igst_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_tax` decimal(10,2) NOT NULL DEFAULT 0.00,
  `subtotal` decimal(10,2) NOT NULL,
  `round_off` decimal(10,2) NOT NULL DEFAULT 0.00,
  `final_amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoice_number`, `challan_id`, `party_id`, `quality_id`, `total_meter`, `price`, `base_amount`, `cgst_percentage`, `sgst_percentage`, `igst_percentage`, `cgst_amount`, `sgst_amount`, `igst_amount`, `total_tax`, `subtotal`, `round_off`, `final_amount`, `date`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 4, 4, 7, 2, 723.99, 10.25, 7420.90, NULL, NULL, NULL, 0.00, 0.00, 0.00, 0.00, 7420.90, 0.10, 7421.00, '2025-12-30', 11, '2025-12-30 03:36:47', '2025-12-30 03:36:47'),
(2, 3, 3, 7, 2, 160.00, 15.75, 2520.00, 2.50, 2.50, NULL, 63.00, 63.00, 0.00, 126.00, 2646.00, 0.00, 2646.00, '2025-12-30', 11, '2025-12-30 04:28:19', '2025-12-30 04:28:19');

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
-- Table structure for table `machines`
--

CREATE TABLE `machines` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `number` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `machines`
--

INSERT INTO `machines` (`id`, `user_id`, `number`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, '1', 'This is machine 1', '2025-12-06 04:24:46', '2025-12-06 05:38:47'),
(2, 1, '2', NULL, '2025-12-06 04:24:49', '2025-12-06 04:24:49'),
(3, 1, '3', NULL, '2025-12-06 04:24:52', '2025-12-06 04:24:52'),
(4, 1, '4', NULL, '2025-12-06 04:24:57', '2025-12-06 04:24:57'),
(5, 1, '5', NULL, '2025-12-06 04:25:00', '2025-12-06 04:25:00'),
(6, 1, '6', NULL, '2025-12-06 04:25:03', '2025-12-06 04:25:03'),
(7, 1, '7', NULL, '2025-12-06 04:25:05', '2025-12-06 04:25:05'),
(8, 1, '8', NULL, '2025-12-06 04:25:08', '2025-12-06 04:25:08'),
(9, 1, '9', NULL, '2025-12-06 04:25:16', '2025-12-06 04:25:16'),
(10, 1, '10', NULL, '2025-12-06 04:25:20', '2025-12-06 04:25:20'),
(11, 1, '11', NULL, '2025-12-06 04:25:23', '2025-12-06 04:25:23'),
(12, 1, '12', NULL, '2025-12-06 04:26:17', '2025-12-06 04:26:17'),
(13, 1, '13', NULL, '2025-12-06 04:26:24', '2025-12-06 04:26:24'),
(14, 1, '14', NULL, '2025-12-06 04:26:28', '2025-12-06 04:26:28'),
(15, 1, '15', NULL, '2025-12-06 04:26:32', '2025-12-06 04:26:32'),
(16, 1, '16', NULL, '2025-12-06 04:26:35', '2025-12-06 04:26:35'),
(17, 1, '17', NULL, '2025-12-06 04:26:39', '2025-12-06 04:26:39'),
(18, 1, '18', NULL, '2025-12-06 04:26:43', '2025-12-06 04:26:43'),
(19, 1, '19', NULL, '2025-12-06 04:26:46', '2025-12-06 04:26:46'),
(20, 1, '20', NULL, '2025-12-06 04:26:50', '2025-12-06 04:26:50'),
(21, 1, '21', NULL, '2025-12-06 04:26:54', '2025-12-06 04:26:54'),
(22, 1, '22', NULL, '2025-12-06 04:26:57', '2025-12-06 04:26:57'),
(23, 1, '23', NULL, '2025-12-06 04:27:00', '2025-12-06 04:27:00'),
(24, 1, '24', NULL, '2025-12-06 04:27:03', '2025-12-06 04:27:03'),
(25, 1, '26', NULL, '2025-12-06 05:12:26', '2025-12-06 05:19:30'),
(26, 1, '25', NULL, '2025-12-06 05:19:15', '2025-12-06 05:19:15'),
(27, 1, '30', NULL, '2025-12-06 10:40:21', '2025-12-06 10:40:21'),
(28, 11, '1', NULL, '2025-12-07 00:26:12', '2025-12-07 00:26:12'),
(29, 11, '2', NULL, '2025-12-07 00:26:15', '2025-12-07 00:26:15'),
(30, 11, '3', NULL, '2025-12-07 00:26:18', '2025-12-07 00:26:18'),
(31, 11, '4', NULL, '2025-12-07 00:26:22', '2025-12-07 00:26:22'),
(32, 11, '5', NULL, '2025-12-07 00:26:24', '2025-12-07 00:26:24'),
(34, 11, '6', NULL, '2025-12-27 10:55:33', '2025-12-27 10:55:33');

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
(8, '2025_11_05_183212_add_party_number_to_parties_table', 4),
(9, '2025_11_06_164427_create_staff_details_table', 5),
(11, '2025_11_06_181257_create_attendances_table', 6),
(12, '2025_01_15_120000_create_staff_salaries_table', 7),
(13, '2025_01_16_000001_create_workers_table', 8),
(14, '2025_01_16_000002_create_machines_table', 8),
(15, '2025_01_16_000003_create_worker_machine_assignments_table', 9),
(16, '2025_01_16_000004_create_worker_daily_production_entries_table', 9),
(17, '2025_01_16_000005_create_settings_table', 9),
(19, '2025_12_07_055244_create_payslips_table', 10),
(24, '2025_01_17_000001_create_user_push_subscriptions_table', 11),
(25, '2025_01_20_000001_create_fabric_stocks_table', 12),
(26, '2025_01_20_000002_create_production_stocks_table', 12),
(27, '2025_01_20_000003_create_stock_ledgers_table', 12),
(28, '2025_01_20_000004_create_stock_dispatches_table', 12),
(30, '2025_01_17_000003_create_meter_based_stocks_table', 13),
(31, '2025_01_17_000004_modify_stocks_table_to_meter_based', 14),
(32, '2025_01_17_000005_ensure_stocks_foreign_key', 15),
(33, '2025_12_13_064412_create_stocks_table', 14),
(34, '2025_01_18_000001_create_takas_table', 16),
(35, '2025_01_18_000002_add_date_to_takas_table', 17),
(36, '2025_12_27_100840_create_challans_table', 18),
(37, '2025_12_27_100845_create_challan_items_table', 18),
(38, '2025_12_27_141534_add_soft_deletes_to_takas_table', 19),
(39, '2025_12_27_161027_drop_takas_table', 20),
(40, '2025_12_27_161043_drop_challans_and_challan_items_tables', 20),
(41, '2025_01_18_000001_create_challans_table', 21),
(42, '2025_01_18_000002_create_challan_items_table', 21),
(43, '2025_01_19_000001_create_qualities_table', 22),
(44, '2025_01_19_000002_add_quality_id_to_challans_table', 22),
(45, '2025_01_20_000001_add_tax_fields_to_qualities_table', 23),
(46, '2025_01_20_000002_create_invoices_table', 23);

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

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('harsh@gmail.com', '$2y$12$KbbBVYGyw625H87jaCQ4ZeZgh76U1eqvrhRT4AtGIzv3LiHxJzYWm', '2025-11-09 04:41:37');

-- --------------------------------------------------------

--
-- Table structure for table `payslips`
--

CREATE TABLE `payslips` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `worker_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `shift_id` varchar(255) DEFAULT NULL,
  `total_meters` decimal(10,2) NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `total_salary` decimal(10,2) NOT NULL,
  `calculation_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`calculation_data`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payslips`
--

INSERT INTO `payslips` (`id`, `worker_id`, `user_id`, `date_from`, `date_to`, `shift_id`, `total_meters`, `rate`, `total_salary`, `calculation_data`, `created_at`, `updated_at`) VALUES
(1, 6, 11, '2025-12-01', '2025-12-15', NULL, 47.00, 2.00, 94.00, '[{\"id\":13,\"user_id\":11,\"date\":\"2025-12-07T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":28,\"shift_id\":\"day\",\"meters\":\"12.00\",\"created_at\":\"2025-12-07T05:57:12.000000Z\",\"updated_at\":\"2025-12-07T05:57:12.000000Z\",\"machine\":{\"id\":28,\"user_id\":11,\"number\":\"1\",\"description\":null,\"created_at\":\"2025-12-07T05:56:12.000000Z\",\"updated_at\":\"2025-12-07T05:56:12.000000Z\"}},{\"id\":14,\"user_id\":11,\"date\":\"2025-12-07T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":29,\"shift_id\":\"day\",\"meters\":\"15.00\",\"created_at\":\"2025-12-07T05:57:12.000000Z\",\"updated_at\":\"2025-12-07T05:57:12.000000Z\",\"machine\":{\"id\":29,\"user_id\":11,\"number\":\"2\",\"description\":null,\"created_at\":\"2025-12-07T05:56:15.000000Z\",\"updated_at\":\"2025-12-07T05:56:15.000000Z\"}},{\"id\":15,\"user_id\":11,\"date\":\"2025-12-07T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":30,\"shift_id\":\"day\",\"meters\":\"20.00\",\"created_at\":\"2025-12-07T05:57:12.000000Z\",\"updated_at\":\"2025-12-07T05:57:12.000000Z\",\"machine\":{\"id\":30,\"user_id\":11,\"number\":\"3\",\"description\":null,\"created_at\":\"2025-12-07T05:56:18.000000Z\",\"updated_at\":\"2025-12-07T05:56:18.000000Z\"}}]', '2025-12-07 00:40:14', '2025-12-07 00:40:14'),
(2, 6, 11, '2025-12-01', '2025-12-15', 'day', 47.00, 2.00, 94.00, '[{\"id\":13,\"user_id\":11,\"date\":\"2025-12-07T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":28,\"shift_id\":\"day\",\"meters\":\"12.00\",\"created_at\":\"2025-12-07T05:57:12.000000Z\",\"updated_at\":\"2025-12-07T05:57:12.000000Z\",\"machine\":{\"id\":28,\"user_id\":11,\"number\":\"1\",\"description\":null,\"created_at\":\"2025-12-07T05:56:12.000000Z\",\"updated_at\":\"2025-12-07T05:56:12.000000Z\"}},{\"id\":14,\"user_id\":11,\"date\":\"2025-12-07T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":29,\"shift_id\":\"day\",\"meters\":\"15.00\",\"created_at\":\"2025-12-07T05:57:12.000000Z\",\"updated_at\":\"2025-12-07T05:57:12.000000Z\",\"machine\":{\"id\":29,\"user_id\":11,\"number\":\"2\",\"description\":null,\"created_at\":\"2025-12-07T05:56:15.000000Z\",\"updated_at\":\"2025-12-07T05:56:15.000000Z\"}},{\"id\":15,\"user_id\":11,\"date\":\"2025-12-07T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":30,\"shift_id\":\"day\",\"meters\":\"20.00\",\"created_at\":\"2025-12-07T05:57:12.000000Z\",\"updated_at\":\"2025-12-07T05:57:12.000000Z\",\"machine\":{\"id\":30,\"user_id\":11,\"number\":\"3\",\"description\":null,\"created_at\":\"2025-12-07T05:56:18.000000Z\",\"updated_at\":\"2025-12-07T05:56:18.000000Z\"}}]', '2025-12-07 00:46:16', '2025-12-07 00:46:16'),
(3, 6, 11, '2025-12-01', '2025-12-15', NULL, 47.00, 2.50, 117.50, '[{\"id\":13,\"user_id\":11,\"date\":\"2025-12-07T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":28,\"shift_id\":\"day\",\"meters\":\"12.00\",\"created_at\":\"2025-12-07T05:57:12.000000Z\",\"updated_at\":\"2025-12-07T05:57:12.000000Z\",\"machine\":{\"id\":28,\"user_id\":11,\"number\":\"1\",\"description\":null,\"created_at\":\"2025-12-07T05:56:12.000000Z\",\"updated_at\":\"2025-12-07T05:56:12.000000Z\"}},{\"id\":14,\"user_id\":11,\"date\":\"2025-12-07T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":29,\"shift_id\":\"day\",\"meters\":\"15.00\",\"created_at\":\"2025-12-07T05:57:12.000000Z\",\"updated_at\":\"2025-12-07T05:57:12.000000Z\",\"machine\":{\"id\":29,\"user_id\":11,\"number\":\"2\",\"description\":null,\"created_at\":\"2025-12-07T05:56:15.000000Z\",\"updated_at\":\"2025-12-07T05:56:15.000000Z\"}},{\"id\":15,\"user_id\":11,\"date\":\"2025-12-07T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":30,\"shift_id\":\"day\",\"meters\":\"20.00\",\"created_at\":\"2025-12-07T05:57:12.000000Z\",\"updated_at\":\"2025-12-07T05:57:12.000000Z\",\"machine\":{\"id\":30,\"user_id\":11,\"number\":\"3\",\"description\":null,\"created_at\":\"2025-12-07T05:56:18.000000Z\",\"updated_at\":\"2025-12-07T05:56:18.000000Z\"}}]', '2025-12-07 01:35:18', '2025-12-07 01:35:18'),
(4, 6, 11, '2025-12-01', '2025-12-10', 'day', 47.00, 2.50, 117.50, '[{\"id\":13,\"user_id\":11,\"date\":\"2025-12-07T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":28,\"shift_id\":\"day\",\"meters\":\"12.00\",\"created_at\":\"2025-12-07T05:57:12.000000Z\",\"updated_at\":\"2025-12-07T05:57:12.000000Z\",\"machine\":{\"id\":28,\"user_id\":11,\"number\":\"1\",\"description\":null,\"created_at\":\"2025-12-07T05:56:12.000000Z\",\"updated_at\":\"2025-12-07T05:56:12.000000Z\"}},{\"id\":14,\"user_id\":11,\"date\":\"2025-12-07T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":29,\"shift_id\":\"day\",\"meters\":\"15.00\",\"created_at\":\"2025-12-07T05:57:12.000000Z\",\"updated_at\":\"2025-12-07T05:57:12.000000Z\",\"machine\":{\"id\":29,\"user_id\":11,\"number\":\"2\",\"description\":null,\"created_at\":\"2025-12-07T05:56:15.000000Z\",\"updated_at\":\"2025-12-07T05:56:15.000000Z\"}},{\"id\":15,\"user_id\":11,\"date\":\"2025-12-07T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":30,\"shift_id\":\"day\",\"meters\":\"20.00\",\"created_at\":\"2025-12-07T05:57:12.000000Z\",\"updated_at\":\"2025-12-07T05:57:12.000000Z\",\"machine\":{\"id\":30,\"user_id\":11,\"number\":\"3\",\"description\":null,\"created_at\":\"2025-12-07T05:56:18.000000Z\",\"updated_at\":\"2025-12-07T05:56:18.000000Z\"}}]', '2025-12-10 10:43:54', '2025-12-10 10:43:54'),
(5, 6, 11, '2025-12-16', '2025-12-31', NULL, 382.00, 2.50, 955.00, '[{\"id\":22,\"user_id\":11,\"date\":\"2025-12-26T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":28,\"shift_id\":\"day\",\"meters\":\"7.00\",\"created_at\":\"2025-12-26T18:05:58.000000Z\",\"updated_at\":\"2025-12-26T18:05:58.000000Z\",\"machine\":{\"id\":28,\"user_id\":11,\"number\":\"1\",\"description\":null,\"created_at\":\"2025-12-07T05:56:12.000000Z\",\"updated_at\":\"2025-12-07T05:56:12.000000Z\"}},{\"id\":23,\"user_id\":11,\"date\":\"2025-12-26T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":29,\"shift_id\":\"day\",\"meters\":\"20.00\",\"created_at\":\"2025-12-26T18:05:58.000000Z\",\"updated_at\":\"2025-12-26T18:05:58.000000Z\",\"machine\":{\"id\":29,\"user_id\":11,\"number\":\"2\",\"description\":null,\"created_at\":\"2025-12-07T05:56:15.000000Z\",\"updated_at\":\"2025-12-07T05:56:15.000000Z\"}},{\"id\":24,\"user_id\":11,\"date\":\"2025-12-26T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":30,\"shift_id\":\"day\",\"meters\":\"10.00\",\"created_at\":\"2025-12-26T18:05:58.000000Z\",\"updated_at\":\"2025-12-26T18:05:58.000000Z\",\"machine\":{\"id\":30,\"user_id\":11,\"number\":\"3\",\"description\":null,\"created_at\":\"2025-12-07T05:56:18.000000Z\",\"updated_at\":\"2025-12-07T05:56:18.000000Z\"}},{\"id\":25,\"user_id\":11,\"date\":\"2025-12-27T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":28,\"shift_id\":\"day\",\"meters\":\"250.00\",\"created_at\":\"2025-12-27T15:34:45.000000Z\",\"updated_at\":\"2025-12-27T16:27:44.000000Z\",\"machine\":{\"id\":28,\"user_id\":11,\"number\":\"1\",\"description\":null,\"created_at\":\"2025-12-07T05:56:12.000000Z\",\"updated_at\":\"2025-12-07T05:56:12.000000Z\"}},{\"id\":26,\"user_id\":11,\"date\":\"2025-12-27T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":29,\"shift_id\":\"day\",\"meters\":\"35.00\",\"created_at\":\"2025-12-27T15:34:45.000000Z\",\"updated_at\":\"2025-12-27T15:34:45.000000Z\",\"machine\":{\"id\":29,\"user_id\":11,\"number\":\"2\",\"description\":null,\"created_at\":\"2025-12-07T05:56:15.000000Z\",\"updated_at\":\"2025-12-07T05:56:15.000000Z\"}},{\"id\":27,\"user_id\":11,\"date\":\"2025-12-27T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":30,\"shift_id\":\"day\",\"meters\":\"15.00\",\"created_at\":\"2025-12-27T15:34:45.000000Z\",\"updated_at\":\"2025-12-27T15:34:45.000000Z\",\"machine\":{\"id\":30,\"user_id\":11,\"number\":\"3\",\"description\":null,\"created_at\":\"2025-12-07T05:56:18.000000Z\",\"updated_at\":\"2025-12-07T05:56:18.000000Z\"}},{\"id\":28,\"user_id\":11,\"date\":\"2025-12-27T00:00:00.000000Z\",\"worker_id\":6,\"machine_id\":31,\"shift_id\":\"day\",\"meters\":\"45.00\",\"created_at\":\"2025-12-27T16:27:28.000000Z\",\"updated_at\":\"2025-12-27T16:27:28.000000Z\",\"machine\":{\"id\":31,\"user_id\":11,\"number\":\"4\",\"description\":null,\"created_at\":\"2025-12-07T05:56:22.000000Z\",\"updated_at\":\"2025-12-07T05:56:22.000000Z\"}}]', '2025-12-27 11:00:22', '2025-12-27 11:00:22');

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
(30, 'manage role', NULL, NULL, '2025-12-10 05:59:45', '2025-12-10 05:59:45'),
(31, 'create role', NULL, NULL, '2025-12-10 05:59:45', '2025-12-10 05:59:45'),
(32, 'edit role', NULL, NULL, '2025-12-10 05:59:45', '2025-12-10 05:59:45'),
(33, 'delete role', NULL, NULL, '2025-12-10 05:59:45', '2025-12-10 05:59:45'),
(34, 'manage staff', NULL, NULL, '2025-12-10 05:59:45', '2025-12-10 05:59:45'),
(35, 'create staff', NULL, NULL, '2025-12-10 05:59:45', '2025-12-10 05:59:45'),
(36, 'edit staff', NULL, NULL, '2025-12-10 05:59:45', '2025-12-10 05:59:45'),
(37, 'delete staff', NULL, NULL, '2025-12-10 05:59:45', '2025-12-10 05:59:45'),
(42, 'manage party', NULL, NULL, '2025-12-10 05:59:45', '2025-12-10 05:59:45'),
(43, 'create party', NULL, NULL, '2025-12-10 05:59:45', '2025-12-10 05:59:45'),
(44, 'edit party', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(45, 'view party', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(46, 'delete party', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(52, 'manage workers', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(53, 'create workers', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(54, 'edit workers', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(55, 'delete workers', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(56, 'view workers', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(57, 'manage worker machines', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(58, 'create worker machines', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(59, 'edit worker machines', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(60, 'delete worker machines', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(61, 'view worker machines', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(62, 'manage worker machine assign', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(63, 'assign worker machine assign', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(64, 'manage worker daily production', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(65, 'entry worker daily production', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(66, 'manage worker salary', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(67, 'calculate worker salary', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(68, 'generate worker payslip', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(69, 'view worker payslip', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(70, 'download worker payslip', NULL, NULL, '2025-12-10 05:59:46', '2025-12-10 05:59:46'),
(71, 'manage stock management', NULL, NULL, '2025-12-13 06:53:12', '2025-12-13 06:53:12'),
(72, 'view stock management', NULL, NULL, '2025-12-13 06:53:12', '2025-12-13 06:53:12'),
(73, 'refresh stock management', NULL, NULL, '2025-12-13 06:53:12', '2025-12-13 06:53:12'),
(119, 'manage challan', NULL, NULL, '2025-12-27 11:56:58', '2025-12-27 11:56:58'),
(120, 'create challan', NULL, NULL, '2025-12-27 11:56:58', '2025-12-27 11:56:58'),
(121, 'edit challan', NULL, NULL, '2025-12-27 11:56:58', '2025-12-27 11:56:58'),
(122, 'view challan', NULL, NULL, '2025-12-27 11:56:58', '2025-12-27 11:56:58'),
(123, 'delete challan', NULL, NULL, '2025-12-27 11:56:58', '2025-12-27 11:56:58'),
(124, 'manage quality', NULL, NULL, '2025-12-30 02:50:38', '2025-12-30 02:50:38'),
(125, 'create quality', NULL, NULL, '2025-12-30 02:50:38', '2025-12-30 02:50:38'),
(126, 'edit quality', NULL, NULL, '2025-12-30 02:50:38', '2025-12-30 02:50:38'),
(127, 'delete quality', NULL, NULL, '2025-12-30 02:50:38', '2025-12-30 02:50:38'),
(128, 'manage invoice', NULL, NULL, '2025-12-30 03:28:59', '2025-12-30 03:28:59'),
(129, 'create invoice', NULL, NULL, '2025-12-30 03:28:59', '2025-12-30 03:28:59'),
(130, 'view invoice', NULL, NULL, '2025-12-30 03:28:59', '2025-12-30 03:28:59'),
(131, 'delete invoice', NULL, NULL, '2025-12-30 03:28:59', '2025-12-30 03:28:59');

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
(30, 1),
(30, 10),
(31, 1),
(31, 10),
(32, 1),
(32, 10),
(33, 1),
(34, 1),
(34, 11),
(35, 1),
(35, 11),
(36, 1),
(36, 11),
(37, 1),
(37, 11),
(42, 1),
(43, 1),
(44, 1),
(45, 1),
(46, 1),
(52, 1),
(52, 11),
(53, 1),
(53, 11),
(54, 1),
(54, 11),
(55, 1),
(55, 11),
(56, 1),
(56, 11),
(57, 1),
(57, 11),
(58, 1),
(58, 11),
(59, 1),
(59, 11),
(60, 1),
(60, 11),
(61, 1),
(61, 11),
(62, 1),
(62, 11),
(63, 1),
(63, 11),
(64, 1),
(64, 11),
(65, 1),
(65, 11),
(66, 1),
(66, 11),
(67, 1),
(67, 11),
(68, 1),
(68, 11),
(69, 1),
(69, 11),
(70, 1),
(70, 11),
(71, 1),
(71, 10),
(72, 1),
(73, 1),
(73, 10),
(119, 1),
(120, 1),
(121, 1),
(122, 1),
(123, 1),
(124, 1),
(125, 1),
(126, 1),
(127, 1),
(128, 1),
(129, 1),
(130, 1),
(131, 1);

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
-- Table structure for table `production_stocks`
--

CREATE TABLE `production_stocks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `production_date` date NOT NULL,
  `machine_id` bigint(20) UNSIGNED NOT NULL,
  `worker_id` bigint(20) UNSIGNED NOT NULL,
  `fabric_type` varchar(255) NOT NULL,
  `roll_count` int(11) NOT NULL,
  `total_weight` decimal(10,2) NOT NULL,
  `quality_grade` enum('A','B','C','Reject') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `production_stocks`
--

INSERT INTO `production_stocks` (`id`, `user_id`, `production_date`, `machine_id`, `worker_id`, `fabric_type`, `roll_count`, `total_weight`, `quality_grade`, `created_at`, `updated_at`) VALUES
(1, 11, '2025-12-10', 28, 6, 'Cotton', 50, 500.00, 'A', '2025-12-12 12:29:34', '2025-12-12 12:30:58'),
(2, 11, '2025-12-11', 29, 7, 'Cotton', 200, 1000.00, 'A', '2025-12-12 12:32:50', '2025-12-12 12:32:50');

-- --------------------------------------------------------

--
-- Table structure for table `qualities`
--

CREATE TABLE `qualities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `quality_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `cgst_percentage` decimal(5,2) DEFAULT NULL,
  `sgst_percentage` decimal(5,2) DEFAULT NULL,
  `igst_percentage` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `qualities`
--

INSERT INTO `qualities` (`id`, `user_id`, `quality_name`, `description`, `status`, `cgst_percentage`, `sgst_percentage`, `igst_percentage`, `created_at`, `updated_at`) VALUES
(1, 11, 'Reniyal', NULL, 1, NULL, NULL, NULL, '2025-12-30 02:58:57', '2025-12-30 02:59:38'),
(2, 11, 'Rayon', NULL, 1, 2.50, 2.50, NULL, '2025-12-30 03:07:05', '2025-12-30 04:26:54');

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
(6, 1, 'Admin', NULL, NULL, '2025-11-05 10:53:05', '2025-11-05 10:53:05'),
(7, 1, 'Demo role', NULL, NULL, '2025-11-05 12:35:17', '2025-11-05 12:35:17'),
(8, 1, 'Supervisor', NULL, NULL, '2025-11-07 11:09:51', '2025-11-07 11:09:51'),
(10, 11, 'Admin', NULL, NULL, '2025-12-26 12:52:28', '2025-12-26 12:52:41'),
(11, 11, 'Manager', NULL, NULL, '2025-12-26 12:53:10', '2025-12-26 12:53:10'),
(12, 14, 'demo', NULL, NULL, '2025-12-27 10:53:55', '2025-12-27 10:53:55');

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
(2, 12, 'App\\Models\\User'),
(7, 13, 'App\\Models\\User'),
(10, 14, 'App\\Models\\User'),
(1, 15, 'App\\Models\\User'),
(11, 16, 'App\\Models\\User'),
(1, 17, 'App\\Models\\User'),
(11, 18, 'App\\Models\\User'),
(11, 19, 'App\\Models\\User');

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
('0VuKmNdBTFbpil74fsMiIT6AtBKbIEU8kqC9G34j', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTXh5eTRDSHlSSFgzNXVtTTE3TTJUblhSNlI2eXdWSzZOaFdPRDVwcSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdHJhbnNsYXRpb25zL2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1767088627),
('AT0gisz1kAI7lugo0YMr03q1NQ8HZMAKJa4Ot0we', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMGVXMkZ2dGhxT1U4T0ZoTE9BZUxEWEpSNDlyZ2FrYUJCN2ViWGwxcSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdHJhbnNsYXRpb25zL2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1767083840),
('CsB8qbLDmUGHaZ6wTisNbKokR1ZXaWNqahI4oiVa', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQnJaVkFWM3pZRXNTN1RiRW9Zb3BWa0xDb0tFc0k3aHJaN1RZUjlGVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdHJhbnNsYXRpb25zL2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1767085662),
('nKSF18MmSyMJvr9zGPy7bW5z06ChPagw4q9eRy6t', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYVZtUFFRMUVncjJQSDJCdFBuZXRodHB5OEwxMUV5aHUwTGJ0b3hZQSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdHJhbnNsYXRpb25zL2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1767086891),
('qeYphf2ipx3Ya2oA0wvxpAfm7izykWZdVohIElj7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUDN6NDQ4cTBQcHFvRjhpWnEwVFp2ckRqSmV2dkJSbmIxZXhQSzI5SSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdHJhbnNsYXRpb25zL2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1767088831),
('WfWTWQeBuZaDju9Utp1P09thF8kMOCnivFoI0tGg', 11, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiWUprWWVzZ3FPUk9ydndWT0lVTHBmcDcxZGtwYkFaNWFJQUxKMFlJSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdHJhbnNsYXRpb25zL2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTE7fQ==', 1767088700);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'worker_per_meter_rate', '3', 1, '2025-12-06 08:33:51', '2025-12-06 08:33:51'),
(2, 'worker_per_meter_rate', '2.5', 11, '2025-12-07 01:34:29', '2025-12-07 01:34:29'),
(3, 'lot_meter_size', '100', 11, '2025-12-13 01:22:33', '2025-12-13 03:00:56');

-- --------------------------------------------------------

--
-- Table structure for table `staff_details`
--

CREATE TABLE `staff_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `salary_type` enum('monthly','per_meter') NOT NULL DEFAULT 'monthly',
  `salary_amount` decimal(10,2) DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staff_details`
--

INSERT INTO `staff_details` (`id`, `user_id`, `phone_number`, `salary_type`, `salary_amount`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 10, NULL, 'monthly', 1000.00, 1, '2025-11-06 11:18:28', '2025-11-07 11:23:00'),
(3, 14, '1234567890', 'monthly', 100.00, 11, '2025-11-06 13:01:49', '2025-12-26 13:16:54'),
(4, 16, '1234567890', 'monthly', 2.00, 11, '2025-11-09 05:23:18', '2025-12-26 13:16:49');

-- --------------------------------------------------------

--
-- Table structure for table `staff_salaries`
--

CREATE TABLE `staff_salaries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `staff_id` bigint(20) UNSIGNED NOT NULL,
  `staff_salary` decimal(10,2) NOT NULL,
  `salary_type` enum('monthly','per_meter') NOT NULL,
  `meter` decimal(8,2) DEFAULT NULL,
  `working_days` int(11) DEFAULT NULL,
  `total_salary` decimal(10,2) NOT NULL,
  `salary_date` date NOT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staff_salaries`
--

INSERT INTO `staff_salaries` (`id`, `staff_id`, `staff_salary`, `salary_type`, `meter`, `working_days`, `total_salary`, `salary_date`, `created_by`, `created_at`, `updated_at`) VALUES
(2, 14, 100.00, 'monthly', 14.00, NULL, 1400.00, '2025-11-07', 11, '2025-11-07 10:57:22', '2025-11-07 10:57:22');

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `total_meters` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`id`, `user_id`, `date`, `total_meters`, `created_at`, `updated_at`) VALUES
(946, 11, '2025-12-28', 2070.00, '2025-12-30 01:53:55', '2025-12-30 01:53:55'),
(947, 11, '2025-12-27', 345.00, '2025-12-30 01:53:55', '2025-12-30 01:53:55'),
(948, 11, '2025-12-26', 37.00, '2025-12-30 01:53:55', '2025-12-30 01:53:55'),
(949, 11, '2025-12-13', 275.00, '2025-12-30 01:53:55', '2025-12-30 01:53:55'),
(950, 11, '2025-12-12', 41.00, '2025-12-30 01:53:55', '2025-12-30 01:53:55'),
(951, 11, '2025-12-07', 47.00, '2025-12-30 01:53:55', '2025-12-30 01:53:55');

-- --------------------------------------------------------

--
-- Table structure for table `stock_dispatches`
--

CREATE TABLE `stock_dispatches` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `challan_number` varchar(255) NOT NULL,
  `party_id` bigint(20) UNSIGNED NOT NULL,
  `dispatch_date` date NOT NULL,
  `fabric_type` varchar(255) NOT NULL,
  `roll_count` int(11) NOT NULL,
  `total_weight` decimal(10,2) NOT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_ledgers`
--

CREATE TABLE `stock_ledgers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `transaction_type` enum('IN','OUT') NOT NULL,
  `transaction_date` date NOT NULL,
  `fabric_type` varchar(255) NOT NULL,
  `quantity_rolls` int(11) NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `reason` enum('Production','Dispatch','Purchase','Return','Adjustment') NOT NULL,
  `linked_record_type` varchar(255) DEFAULT NULL,
  `linked_record_id` bigint(20) UNSIGNED DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stock_ledgers`
--

INSERT INTO `stock_ledgers` (`id`, `user_id`, `transaction_type`, `transaction_date`, `fabric_type`, `quantity_rolls`, `weight`, `reason`, `linked_record_type`, `linked_record_id`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 11, 'IN', '2025-12-01', 'Cotton', 20, 1000.00, 'Purchase', 'FabricStock', 1, 'Fabric stock received from sfr', '2025-12-12 12:28:51', '2025-12-12 12:28:51'),
(2, 11, 'IN', '2025-12-10', 'Cotton', 5, 50.00, 'Production', 'ProductionStock', 1, 'Production by Rohit on Machine 1', '2025-12-12 12:29:34', '2025-12-12 12:29:34'),
(3, 11, 'IN', '2025-12-11', 'Cotton', 200, 1000.00, 'Production', 'ProductionStock', 2, 'Production by Mohit on Machine 2', '2025-12-12 12:32:50', '2025-12-12 12:32:50');

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
(1, 'Harsh', 'test@example.com', '2025-11-04 09:40:56', '$2y$12$dLx78tABGwrk.LY5qjKmkexpdRrbnzd8INBOITxwcba29l/AmbCei', 'owner', NULL, 0, 'Bv4EEOFNee9mpcB17yYaS6MvBDjHGREXdM1t1AN0CfLeSP2j1qPcdywAR7AN', '2025-11-04 09:40:56', '2025-11-06 12:47:04'),
(10, 'divy', 'divy@gmail.com', NULL, '$2y$12$vqh8/Xm8K/T1.u4t0i9fPeiRGErA3URug2DDhabUBnFUBcGlD2Psm', 'Manager', 1, 1, NULL, '2025-11-05 10:26:06', '2025-11-07 11:15:14'),
(11, 'harsh', 'hp004086@gmail.com', '2025-11-09 10:37:41', '$2y$12$V0znjbRMJx2Fm2dre.aRn.neno/gvQukjvtDzfgN7K4B3hiO9ucda', 'owner', NULL, 0, NULL, '2025-11-05 10:48:47', '2025-11-09 10:37:41'),
(14, 'New Staff', 'new@staff.com', NULL, '$2y$12$cJg5UFtUBuEp1exvYm2Mo.7qFeFz059.3mU8tyAtPdPXk8iTlFyWe', 'Admin', 11, 1, NULL, '2025-11-06 13:01:49', '2025-12-26 12:54:23'),
(15, 'demo', 'demo@test.com', NULL, '$2y$12$FhAKfqDcifDvDTsrviuqCu2cxqoDBP6xhbpGGuTFylsiAhq7BYmzm', 'owner', NULL, 0, NULL, '2025-11-09 05:22:31', '2025-11-09 05:22:31'),
(16, 'staff1', 'staff1@gmail.com', NULL, '$2y$12$QQfj5vgXBJPzvcwrcgVe9u31O2aoyih7BaZCQzhYszvv9Z8wu7ZIm', 'Manager', 11, 1, NULL, '2025-11-09 05:23:18', '2025-11-09 05:23:18'),
(17, 'sdf', 'sdf@sfe.sdf', NULL, '$2y$12$gSNG28nwBWM9pDId4ny8LO6mCr2e.lMzVox0mdJWCGvVv20TcYRzO', 'owner', NULL, 0, NULL, '2025-11-09 06:50:52', '2025-11-09 06:50:52');

-- --------------------------------------------------------

--
-- Table structure for table `user_push_subscriptions`
--

CREATE TABLE `user_push_subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `endpoint` text NOT NULL,
  `p256dh` varchar(255) NOT NULL,
  `auth` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_push_subscriptions`
--

INSERT INTO `user_push_subscriptions` (`id`, `user_id`, `endpoint`, `p256dh`, `auth`, `created_at`, `updated_at`) VALUES
(1, 11, 'https://fcm.googleapis.com/fcm/send/cr9NojS0XF4:APA91bG9CPtFWhVsqQ1l8XxOqrb9yFws0j9S3Gpq4IC2b57dbFYBLvFBVe58QZVYYwQymFYP_x4EUY4AitZWa1lQHGwagfUrfqcswNsSfClOS0z124iFFjVCy3aJjBBdP7qPrpcYsXyv', 'BNHSHn3xI3ee8eO5RqZmYKcGOVxPtSMRMileU77qsrwdeCKXYJFI-4Py_N6DjK0kMM0hnDQVq1CejPNX8Lif0FE', 'XOFqAe7GmXt4hl751BEcBQ', '2025-12-07 08:19:17', '2025-12-07 08:19:17'),
(2, 11, 'https://fcm.googleapis.com/fcm/send/dHrzXKksN24:APA91bFRrF0vivQmiwLWwRFEjRRkK-AyUKLQzWOqLaO7K6KHbki4v5PEA5FwzGncuNl5C-s40ePCvCHGtFJHaX2sfGyhAfas5whtmdKJJCzIiKjkLFDz4Ejb4dWaoj9SA9DOkaGTtUXa', 'BLE-vApEehYodQj3koOHDAH3nAu4njP7457Yb55FzzORn8Ssxzx0k6FMgFV80Jv8Caozf0PyEqva2wsLdI_14EU', 'cpM78PhXDRmTKUYww7xGuA', '2025-12-07 08:22:13', '2025-12-07 08:22:13'),
(3, 11, 'https://fcm.googleapis.com/fcm/send/c9J_iVe7_V0:APA91bHQ6oTuZZOEx-6XPbN1-vFFktkBpQzZZMzjprRjGlIGcwY-Zei2xxSBejpanmOzIC7cRwIeA0KYmIzw9nvHc5-rU8kmCmZBNiyOdwb13y9GM4RCrztw5DP1sVLi_YZaz9-FgjWD', 'BEUd0O8mptW6BoC26iD01MM77L7oS-V3HQ-eqOb7jKxwStprE4oZvS0F52JIo2wnBNik1sraEfT7NPuMtp-5T_A', 'l1DmCKMiDaIbkLaBxAu5ZA', '2025-12-07 09:11:47', '2025-12-07 09:11:47'),
(4, 11, 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABpNZl3VgSCvEHlLOuKfv2hAUulLnRU5_rW4OsyFFPKrhmT8NzzXHpIIviKIPOC7yZeSYHyAq8U4b7ebhHQfgX_9vNkETFZp5eN1PEGEG26YuvfLDxcbnVG-dmMSpWUoMERc4r04C9pkx_k5U866_LtUuIeuTNXIA3t_MsZhYeiGxsgd7s', 'BPb1WrcnmntQDGaGO0xkQfgYHYF444I5hauMwSCMWj14B8gzrIvf-I3BL8PWsxkPkZ7TcBCix5jTFqs99nLWHg8', 'MhfH_W0KZo_HPA3uM_9UGg', '2025-12-07 09:42:55', '2025-12-07 09:42:55'),
(5, 11, 'https://fcm.googleapis.com/fcm/send/fUlHO-GW58E:APA91bE0Bw-Uva5J5MRLaiPF7NukFEQ7zoyBOhbpDmOSaZXVVLdWa24KvKM5ydN1KbjwnqLzjCmIl2g4O2mLfVUYJwBWBAzInHgKXndNqUoPRscYMATUkrMF-dQg8GAnDt0hTZhM92NX', 'BMcK1AIEkceMdZIcCZQUE1TQ91ICxvCISMxKTVgvlPIHHtHsWPvH-x5a0w_PyoYURmLYjzWti1GoXazlWIhS64s', 'nvrP8XhnMvSlbF5E3Wa9Ww', '2025-12-10 10:11:31', '2025-12-30 01:53:54');

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`id`, `user_id`, `name`, `phone`, `created_at`, `updated_at`) VALUES
(6, 11, 'Rohit', '+911234567890', '2025-12-07 00:26:06', '2025-12-07 01:22:48'),
(7, 11, 'Mohit', NULL, '2025-12-07 08:22:30', '2025-12-07 08:22:30'),
(9, 11, 'Demo', NULL, '2025-12-07 08:26:43', '2025-12-07 08:26:43');

-- --------------------------------------------------------

--
-- Table structure for table `worker_daily_production_entries`
--

CREATE TABLE `worker_daily_production_entries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `worker_id` bigint(20) UNSIGNED NOT NULL,
  `machine_id` bigint(20) UNSIGNED NOT NULL,
  `shift_id` enum('day','night') NOT NULL,
  `meters` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `worker_daily_production_entries`
--

INSERT INTO `worker_daily_production_entries` (`id`, `user_id`, `date`, `worker_id`, `machine_id`, `shift_id`, `meters`, `created_at`, `updated_at`) VALUES
(13, 11, '2025-12-07', 6, 28, 'day', 12.00, '2025-12-07 00:27:12', '2025-12-07 00:27:12'),
(14, 11, '2025-12-07', 6, 29, 'day', 15.00, '2025-12-07 00:27:12', '2025-12-07 00:27:12'),
(15, 11, '2025-12-07', 6, 30, 'day', 20.00, '2025-12-07 00:27:12', '2025-12-07 00:27:12'),
(16, 11, '2025-12-12', 6, 28, 'day', 12.00, '2025-12-12 09:06:59', '2025-12-12 09:06:59'),
(17, 11, '2025-12-12', 6, 29, 'day', 15.00, '2025-12-12 09:06:59', '2025-12-12 09:06:59'),
(18, 11, '2025-12-12', 6, 30, 'day', 14.00, '2025-12-12 09:06:59', '2025-12-12 09:06:59'),
(19, 11, '2025-12-13', 6, 28, 'day', 150.00, '2025-12-13 01:23:07', '2025-12-13 01:29:54'),
(20, 11, '2025-12-13', 6, 29, 'day', 100.00, '2025-12-13 01:23:07', '2025-12-13 03:01:28'),
(21, 11, '2025-12-13', 6, 30, 'day', 25.00, '2025-12-13 01:23:07', '2025-12-13 01:23:07'),
(22, 11, '2025-12-26', 6, 28, 'day', 7.00, '2025-12-26 12:35:58', '2025-12-26 12:35:58'),
(23, 11, '2025-12-26', 6, 29, 'day', 20.00, '2025-12-26 12:35:58', '2025-12-26 12:35:58'),
(24, 11, '2025-12-26', 6, 30, 'day', 10.00, '2025-12-26 12:35:58', '2025-12-26 12:35:58'),
(25, 11, '2025-12-27', 6, 28, 'day', 250.00, '2025-12-27 10:04:45', '2025-12-27 10:57:44'),
(26, 11, '2025-12-27', 6, 29, 'day', 35.00, '2025-12-27 10:04:45', '2025-12-27 10:04:45'),
(27, 11, '2025-12-27', 6, 30, 'day', 15.00, '2025-12-27 10:04:45', '2025-12-27 10:04:45'),
(28, 11, '2025-12-27', 6, 31, 'day', 45.00, '2025-12-27 10:57:28', '2025-12-27 10:57:28'),
(29, 11, '2025-12-28', 6, 28, 'day', 200.00, '2025-12-28 08:14:41', '2025-12-28 08:14:41'),
(30, 11, '2025-12-28', 6, 29, 'day', 400.00, '2025-12-28 08:14:41', '2025-12-28 08:14:41'),
(31, 11, '2025-12-28', 6, 30, 'day', 520.00, '2025-12-28 08:14:41', '2025-12-28 08:14:41'),
(32, 11, '2025-12-28', 6, 31, 'day', 950.00, '2025-12-28 08:14:41', '2025-12-28 08:14:41');

-- --------------------------------------------------------

--
-- Table structure for table `worker_machine_assignments`
--

CREATE TABLE `worker_machine_assignments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `worker_id` bigint(20) UNSIGNED NOT NULL,
  `machine_id` bigint(20) UNSIGNED NOT NULL,
  `shift_id` enum('day','night') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `worker_machine_assignments`
--

INSERT INTO `worker_machine_assignments` (`id`, `user_id`, `worker_id`, `machine_id`, `shift_id`, `created_at`, `updated_at`) VALUES
(16, 11, 6, 28, 'day', '2025-12-27 10:56:29', '2025-12-27 10:56:29'),
(17, 11, 6, 29, 'day', '2025-12-27 10:56:29', '2025-12-27 10:56:29'),
(18, 11, 6, 30, 'day', '2025-12-27 10:56:29', '2025-12-27 10:56:29'),
(19, 11, 6, 31, 'day', '2025-12-27 10:56:29', '2025-12-27 10:56:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attendances_staff_id_date_unique` (`staff_id`,`date`),
  ADD KEY `attendances_created_by_foreign` (`created_by`);

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
-- Indexes for table `challans`
--
ALTER TABLE `challans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `challans_party_id_foreign` (`party_id`),
  ADD KEY `challans_created_by_foreign` (`created_by`),
  ADD KEY `challans_quality_id_foreign` (`quality_id`);

--
-- Indexes for table `challan_items`
--
ALTER TABLE `challan_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `challan_items_challan_id_foreign` (`challan_id`);

--
-- Indexes for table `fabric_stocks`
--
ALTER TABLE `fabric_stocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fabric_stocks_user_id_foreign` (`user_id`),
  ADD KEY `fabric_stocks_vendor_party_id_foreign` (`vendor_party_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoices_challan_id_unique` (`challan_id`),
  ADD KEY `invoices_party_id_foreign` (`party_id`),
  ADD KEY `invoices_quality_id_foreign` (`quality_id`),
  ADD KEY `invoices_created_by_foreign` (`created_by`);

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
-- Indexes for table `machines`
--
ALTER TABLE `machines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `machines_user_id_foreign` (`user_id`);

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
-- Indexes for table `payslips`
--
ALTER TABLE `payslips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payslips_worker_id_foreign` (`worker_id`),
  ADD KEY `payslips_user_id_foreign` (`user_id`);

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
-- Indexes for table `production_stocks`
--
ALTER TABLE `production_stocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `production_stocks_user_id_foreign` (`user_id`),
  ADD KEY `production_stocks_machine_id_foreign` (`machine_id`),
  ADD KEY `production_stocks_worker_id_foreign` (`worker_id`);

--
-- Indexes for table `qualities`
--
ALTER TABLE `qualities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `qualities_user_id_quality_name_unique` (`user_id`,`quality_name`);

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
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_user_id_unique` (`key`,`user_id`),
  ADD KEY `settings_user_id_foreign` (`user_id`);

--
-- Indexes for table `staff_details`
--
ALTER TABLE `staff_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff_details_user_id_foreign` (`user_id`),
  ADD KEY `staff_details_created_by_foreign` (`created_by`);

--
-- Indexes for table `staff_salaries`
--
ALTER TABLE `staff_salaries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff_salaries_staff_id_foreign` (`staff_id`),
  ADD KEY `staff_salaries_created_by_foreign` (`created_by`);

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stocks_user_id_date_unique` (`user_id`,`date`);

--
-- Indexes for table `stock_dispatches`
--
ALTER TABLE `stock_dispatches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stock_dispatches_challan_number_unique` (`challan_number`),
  ADD KEY `stock_dispatches_user_id_foreign` (`user_id`),
  ADD KEY `stock_dispatches_party_id_foreign` (`party_id`);

--
-- Indexes for table `stock_ledgers`
--
ALTER TABLE `stock_ledgers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stock_ledgers_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_created_by_foreign` (`created_by`);

--
-- Indexes for table `user_push_subscriptions`
--
ALTER TABLE `user_push_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_push_subscriptions_endpoint_unique` (`endpoint`) USING HASH,
  ADD KEY `user_push_subscriptions_user_id_index` (`user_id`);

--
-- Indexes for table `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workers_user_id_foreign` (`user_id`);

--
-- Indexes for table `worker_daily_production_entries`
--
ALTER TABLE `worker_daily_production_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `worker_daily_production_entries_user_id_foreign` (`user_id`);

--
-- Indexes for table `worker_machine_assignments`
--
ALTER TABLE `worker_machine_assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `worker_machine_assignments_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `challans`
--
ALTER TABLE `challans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `challan_items`
--
ALTER TABLE `challan_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=373;

--
-- AUTO_INCREMENT for table `fabric_stocks`
--
ALTER TABLE `fabric_stocks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `machines`
--
ALTER TABLE `machines`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `parties`
--
ALTER TABLE `parties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `payslips`
--
ALTER TABLE `payslips`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `production_stocks`
--
ALTER TABLE `production_stocks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `qualities`
--
ALTER TABLE `qualities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `staff_details`
--
ALTER TABLE `staff_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `staff_salaries`
--
ALTER TABLE `staff_salaries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=952;

--
-- AUTO_INCREMENT for table `stock_dispatches`
--
ALTER TABLE `stock_dispatches`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_ledgers`
--
ALTER TABLE `stock_ledgers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_push_subscriptions`
--
ALTER TABLE `user_push_subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `worker_daily_production_entries`
--
ALTER TABLE `worker_daily_production_entries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `worker_machine_assignments`
--
ALTER TABLE `worker_machine_assignments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attendances_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `challans`
--
ALTER TABLE `challans`
  ADD CONSTRAINT `challans_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `challans_party_id_foreign` FOREIGN KEY (`party_id`) REFERENCES `parties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `challans_quality_id_foreign` FOREIGN KEY (`quality_id`) REFERENCES `qualities` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `challan_items`
--
ALTER TABLE `challan_items`
  ADD CONSTRAINT `challan_items_challan_id_foreign` FOREIGN KEY (`challan_id`) REFERENCES `challans` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `fabric_stocks`
--
ALTER TABLE `fabric_stocks`
  ADD CONSTRAINT `fabric_stocks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fabric_stocks_vendor_party_id_foreign` FOREIGN KEY (`vendor_party_id`) REFERENCES `parties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_challan_id_foreign` FOREIGN KEY (`challan_id`) REFERENCES `challans` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invoices_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invoices_party_id_foreign` FOREIGN KEY (`party_id`) REFERENCES `parties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invoices_quality_id_foreign` FOREIGN KEY (`quality_id`) REFERENCES `qualities` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `machines`
--
ALTER TABLE `machines`
  ADD CONSTRAINT `machines_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `parties`
--
ALTER TABLE `parties`
  ADD CONSTRAINT `parties_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payslips`
--
ALTER TABLE `payslips`
  ADD CONSTRAINT `payslips_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `payslips_worker_id_foreign` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`);

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
-- Constraints for table `production_stocks`
--
ALTER TABLE `production_stocks`
  ADD CONSTRAINT `production_stocks_machine_id_foreign` FOREIGN KEY (`machine_id`) REFERENCES `machines` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `production_stocks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `production_stocks_worker_id_foreign` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `qualities`
--
ALTER TABLE `qualities`
  ADD CONSTRAINT `qualities_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
-- Constraints for table `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `settings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `staff_details`
--
ALTER TABLE `staff_details`
  ADD CONSTRAINT `staff_details_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `staff_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `staff_salaries`
--
ALTER TABLE `staff_salaries`
  ADD CONSTRAINT `staff_salaries_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `staff_salaries_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stocks`
--
ALTER TABLE `stocks`
  ADD CONSTRAINT `stocks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stock_dispatches`
--
ALTER TABLE `stock_dispatches`
  ADD CONSTRAINT `stock_dispatches_party_id_foreign` FOREIGN KEY (`party_id`) REFERENCES `parties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `stock_dispatches_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stock_ledgers`
--
ALTER TABLE `stock_ledgers`
  ADD CONSTRAINT `stock_ledgers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_push_subscriptions`
--
ALTER TABLE `user_push_subscriptions`
  ADD CONSTRAINT `user_push_subscriptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workers`
--
ALTER TABLE `workers`
  ADD CONSTRAINT `workers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `worker_daily_production_entries`
--
ALTER TABLE `worker_daily_production_entries`
  ADD CONSTRAINT `worker_daily_production_entries_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `worker_machine_assignments`
--
ALTER TABLE `worker_machine_assignments`
  ADD CONSTRAINT `worker_machine_assignments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
