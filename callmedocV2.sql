-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2020 at 01:08 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `callmedoc`
--

-- --------------------------------------------------------

--
-- Table structure for table `ambulances`
--

CREATE TABLE `ambulances` (
  `a_Id` int(5) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `location` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `price` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ambulances`
--

INSERT INTO `ambulances` (`a_Id`, `contact`, `location`, `type`, `price`) VALUES
(1, '01845435118', 'Bashundhar', 'Freezing C', '500'),
(2, '0184545646', 'dhanmondi', 'ICU', '500'),
(3, '0184s45646asd', 'baridhara', 'with oxygen service', '800'),
(4, '32432432432', 'Agargaon', 'A/C Ambulance', '400');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `ap_Id` int(5) NOT NULL,
  `date` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL,
  `d_Id` int(11) NOT NULL,
  `u_Id` int(11) NOT NULL,
  `p_Id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`ap_Id`, `date`, `time`, `status`, `d_Id`, `u_Id`, `p_Id`) VALUES
(1, '26-11-2020', '14:00 -15:00', 'completed', 2, 8, 1),
(3, '26-11-2020', '15:00 -16:00', 'canceled', 2, 8, 0),
(4, '26-11-2020', '14:00 -15:00', 'canceled', 2, 8, 0),
(5, '28-11-2020', '17:00 -18:00', 'canceled', 2, 8, 0),
(6, '28-11-2020', '18:00 -19:00', 'canceled', 2, 8, 0),
(7, '28-11-2020', '19:00 -20:00', 'pending', 2, 8, 0),
(8, '28-11-2020', '16:00 -17:00', 'pending', 2, 8, 0),
(9, '28-11-2020', '12:00 -13:00', 'completed', 3, 10, 0),
(10, '25-11-2020', '11:00 -12:00', 'completed', 3, 14, 0),
(11, '30-11-2020', '19:00 -20:00', 'pending', 2, 8, 0),
(12, '7-12-2020', '16:00 -17:00', 'pending', 4, 8, 0),
(13, '9-12-2020', '12:00 -13:00', 'pending', 3, 10, 0),
(14, '14-12-2020', '11:00 -12:00', 'canceled', 3, 16, 0),
(15, '29-11-2020', '18:00 -19:00', 'pending', 2, 8, 0),
(16, '29-11-2020', '18:00 -19:00', 'pending', 2, 8, 0),
(17, '29-11-2020', '18:00 -19:00', 'pending', 2, 8, 0),
(18, '29-11-2020', '16:00 -17:00', 'pending', 2, 8, 0),
(19, '29-11-2020', '17:00 -18:00', 'pending', 2, 8, 0),
(20, '28-11-2020', '17:00 -18:00', 'pending', 2, 10, 0),
(21, '29-11-2020', '17:00 -18:00', 'pending', 2, 6, 0),
(22, '28-11-2020', '17:00 -18:00', 'pending', 2, 8, 0),
(23, '29-11-2020', '16:00 -17:00', 'pending', 2, 8, 0),
(24, '28-11-2020', '17:00 -18:00', 'pending', 2, 10, 0),
(25, '28-11-2020', '17:00 -18:00', 'pending', 2, 10, 0),
(26, '30-11-2020', '12:00 -13:00', 'pending', 3, 10, 0),
(27, '29-11-2020', '17:00 -18:00', 'canceled', 2, 8, 0),
(28, '5-12-2020', '19:00 -20:00', 'pending', 2, 10, 0);

-- --------------------------------------------------------

--
-- Table structure for table `complains`
--

CREATE TABLE `complains` (
  `c_Id` int(5) NOT NULL,
  `details` varchar(100) NOT NULL,
  `u_Id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `complains`
--

INSERT INTO `complains` (`c_Id`, `details`, `u_Id`) VALUES
(4, 'sdasasdsadasdsadasdasd', 10);

-- --------------------------------------------------------

--
-- Table structure for table `doctor_info`
--

CREATE TABLE `doctor_info` (
  `d_Id` int(11) NOT NULL,
  `specialization` varchar(20) NOT NULL,
  `qualification` varchar(20) NOT NULL,
  `availability` varchar(20) NOT NULL,
  `time` varchar(50) NOT NULL,
  `charge` varchar(10) NOT NULL,
  `u_Id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor_info`
--

INSERT INTO `doctor_info` (`d_Id`, `specialization`, `qualification`, `availability`, `time`, `charge`, `u_Id`) VALUES
(2, 'Dentist', 'MBBS', 'Sat,Sun,Mon', '16-22', '400', 1),
(3, 'Neurologist', 'MBBS', 'Fri,Sat,Mon,Wed', '11-15', '600', 11),
(4, 'physiotherapist', 'MBBS', 'Mon,Tue', '13-18', '300', 13),
(5, 'Psychiatrist', 'MBBS', 'Mon,Fri,Sat', '15-18', '2500', 12);

-- --------------------------------------------------------

--
-- Table structure for table `financeforms`
--

CREATE TABLE `financeforms` (
  `f_Id` int(11) NOT NULL,
  `details` varchar(100) NOT NULL,
  `u_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `inv_Id` int(5) NOT NULL,
  `total` varchar(50) NOT NULL,
  `transaction` varchar(50) NOT NULL,
  `date` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `u_Id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`inv_Id`, `total`, `transaction`, `date`, `status`, `u_Id`) VALUES
(2, '540', 'asdasdsadsadsadasdasdasd', '11/24/2020', 'pending', 10),
(3, '540', 'sadsadsadsadasdasdsa', '11/25/2020', 'pending', 10),
(4, '400', '', '11/25/2020', 'pending', 8),
(5, '400', '', '11/25/2020', 'pending', 8),
(6, '400', '', '11/25/2020', 'pending', 8),
(7, '400', '', '11/25/2020', 'pending', 8),
(8, '400', '', '11/25/2020', 'pending', 8),
(9, '400', 'sadsadasdsadasd', '11/25/2020', 'pending', 8),
(10, '400', 'sadasdsadasd', '11/25/2020', 'pending', 8),
(11, '360', 'asdsadasdasdasd', '11/25/2020', 'pending', 10),
(12, '360', 'sdasdasdsadasdsadsadsa', '11/25/2020', 'pending', 10);

-- --------------------------------------------------------

--
-- Table structure for table `labtests`
--

CREATE TABLE `labtests` (
  `t_Id` int(11) NOT NULL,
  `test` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `u_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `labtests`
--

INSERT INTO `labtests` (`t_Id`, `test`, `date`, `file_name`, `file_path`, `u_Id`) VALUES
(1, 'X-Ray', '10-12-20', 'cd2.jpg', 'assets/uploads/cd2.jpg', 8);

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `n_Id` int(5) NOT NULL,
  `n_details` varchar(100) NOT NULL,
  `posted_by` varchar(20) NOT NULL,
  `date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notices`
--

INSERT INTO `notices` (`n_Id`, `n_details`, `posted_by`, `date`) VALUES
(1, 'Welccome to Better call Doc', 'Admin', '19/11/20'),
(2, 'Take Appointments from our Reknowned doctor', 'Admin', '20/11/20');

-- --------------------------------------------------------

--
-- Table structure for table `prescriptions`
--

CREATE TABLE `prescriptions` (
  `p_Id` int(5) NOT NULL,
  `details` varchar(100) NOT NULL,
  `prescribed_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prescriptions`
--

INSERT INTO `prescriptions` (`p_Id`, `details`, `prescribed_by`) VALUES
(1, 'Losctil 0-0-1\r\nMonax 1-0-1\r\nAce 1-1-1', 'Dr.Hamim');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `r_Id` int(5) NOT NULL,
  `rating` int(5) NOT NULL,
  `review` varchar(50) NOT NULL,
  `d_Id` int(5) NOT NULL,
  `u_Id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`r_Id`, `rating`, `review`, `d_Id`, `u_Id`) VALUES
(7, 3, 'asdasdasdsadsadasd', 3, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `bloodgroup` varchar(5) NOT NULL,
  `phonenumber` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `profilepic` varchar(1000) NOT NULL,
  `type` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `bloodgroup`, `phonenumber`, `password`, `profilepic`, `type`, `status`, `gender`) VALUES
(1, 'Dr. Michael', 'asdasd@asdas.com', 'B+', 'asdasdas', 'asdasd', 'https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg', 'Doctor', 'unverified', 'on'),
(6, 'hamimaam', 'hamim@email.com', 'sadas', 'asdasda', 'MTIzNA==', 'assets/uploads/cd2.jpg', 'Patient', 'Verified:Finance', 'Male'),
(8, 'Saqif Haque', 'saqifhaque@gmail.com', 'B+', '+880-1845435118', 'MTIzNA==', 'https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg', 'Patient', 'Verified:Finance', 'on'),
(9, 'Prodipta', 'id15282391@gmail.com', 'A-', '+880-1845435118', '1234', 'https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg', 'Patient', 'Unverified', 'on'),
(10, 'sadasdsadsad', 'saqifhaque@yahoo.com', 'A-', '+880-1845435118', 'MTIzNA==', 'assets/uploads/t1.jpg', 'Patient', 'Verified', 'on'),
(11, 'Dr. Hamim', 'hamim@gmail.com', 'AB+', '021389478219', '123', 'https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg', 'Doctor', 'Verified', 'Male'),
(12, 'Dr. Tahsin', 'tasin@gmail.com', 'AB+', '123215346457', '123', 'https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg', 'Doctor', 'Verified', 'Male'),
(13, 'Dr. Sandbox', 'sandbox@gmail.com', 'AB+', '123356463432', '123', 'https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg', 'Doctor', 'Verified', 'Male'),
(14, 'Asir Hameem', 'asirhameem@gmail.com', 'B+', '+880-1521400829', 'MTIzNA==', 'https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg', 'Patient', 'Verified', 'on'),
(16, 'Sabur Ali', 'sabur@gmail.com', 'B+', '+880-1845435118', 'MTIzNA==', 'https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg', 'Patient', 'Verified', 'on'),
(17, 'saqif ', '16-32963-3@student.a', 'A-', '+88-01845435118', 'MTIzNA==', 'https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg', 'Patient', 'Unverified', 'on');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ambulances`
--
ALTER TABLE `ambulances`
  ADD PRIMARY KEY (`a_Id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`ap_Id`),
  ADD KEY `u_Id` (`u_Id`);

--
-- Indexes for table `complains`
--
ALTER TABLE `complains`
  ADD PRIMARY KEY (`c_Id`);

--
-- Indexes for table `doctor_info`
--
ALTER TABLE `doctor_info`
  ADD PRIMARY KEY (`d_Id`),
  ADD UNIQUE KEY `u_Id` (`u_Id`);

--
-- Indexes for table `financeforms`
--
ALTER TABLE `financeforms`
  ADD PRIMARY KEY (`f_Id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`inv_Id`);

--
-- Indexes for table `labtests`
--
ALTER TABLE `labtests`
  ADD PRIMARY KEY (`t_Id`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`n_Id`);

--
-- Indexes for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD PRIMARY KEY (`p_Id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`r_Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ambulances`
--
ALTER TABLE `ambulances`
  MODIFY `a_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `ap_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `complains`
--
ALTER TABLE `complains`
  MODIFY `c_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `doctor_info`
--
ALTER TABLE `doctor_info`
  MODIFY `d_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `financeforms`
--
ALTER TABLE `financeforms`
  MODIFY `f_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `inv_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `labtests`
--
ALTER TABLE `labtests`
  MODIFY `t_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `n_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `p_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `r_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctor_info`
--
ALTER TABLE `doctor_info`
  ADD CONSTRAINT `doctor_extend` FOREIGN KEY (`u_Id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
