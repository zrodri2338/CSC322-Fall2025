<?php
$host = 'localhost';
$port = '8889'; // MAMP’s default MySQL port
$username = 'root';
$password = 'root'; // MAMP’s default MySQL password
$dbname = 'test';   // your confirmed database name

$dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
?>
