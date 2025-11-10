<?php
$host       = "localhost";
$username   = "root";
$password   = "root"; // MAMP uses 'root' as password by default
$dbname     = "test";
$dsn        = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
$options    = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
?>
