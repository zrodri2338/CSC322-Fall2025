<?php
require "../config.php";
require "../common.php";

try {
    $connection = new PDO($dsn, $username, $password, $options);
    echo "<p style='color: green;'>✅ Connected successfully to database: $dbname</p>";

    // Retrieve all users (no filter)
    $sql = "SELECT * FROM users";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();

    if ($result && count($result) > 0) {
        echo "<h2>Results</h2>";
        echo "<table border='1' cellpadding='6' cellspacing='0'>";
        echo "<tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Location</th>
                <th>Date</th>
              </tr>";

        foreach ($result as $row) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($row['id']) . "</td>";
            echo "<td>" . htmlspecialchars($row['firstname']) . "</td>";
            echo "<td>" . htmlspecialchars($row['lastname']) . "</td>";
            echo "<td>" . htmlspecialchars($row['email']) . "</td>";
            echo "<td>" . htmlspecialchars($row['age']) . "</td>";
            echo "<td>" . htmlspecialchars($row['location']) . "</td>";
            echo "<td>" . htmlspecialchars($row['date']) . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "<p style='color: red;'>⚠️ No rows found in the <strong>users</strong> table.</p>";
    }

} catch (PDOException $error) {
    echo "<p style='color: red;'>❌ Error: " . $error->getMessage() . "</p>";
}
?>
