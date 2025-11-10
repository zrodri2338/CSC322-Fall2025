<?php
require "config.php";

$sql = "";  

try {
    $connection = new PDO("mysql:host=$host", $username, $password, $options);
    $sql = file_get_contents("data/init.sql");
    $connection->exec($sql);

    echo " Database and table users created successfully.";
} catch (PDOException $error) {
    echo "<strong>Error:</strong><br>" . $error->getMessage();
}
?>
