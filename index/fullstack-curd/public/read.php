<?php
require "../config.php";
require "../common.php";

if (isset($_POST['submit'])) {
    try {
        $connection = new PDO($dsn, $username, $password, $options);

        $sql = "SELECT * FROM users WHERE location = :location";
        $location = $_POST['location'];

        $statement = $connection->prepare($sql);
        $statement->bindParam(':location', $location, PDO::PARAM_STR);
        $statement->execute();
        $result = $statement->fetchAll();
    } catch (PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }
}
?>

<?php include "templates/header.php"; ?>

<h2>Find users by location</h2>

<form method="post">
    <label for="location">Location</label>
    <input type="text" id="location" name="location">
    <input type="submit" name="submit" value="View Results">
</form>

<?php
if (isset($_POST['submit'])) {
    if ($result && $statement->rowCount() > 0) {
        echo "<table><thead><tr><th>ID</th><th>First</th><th>Last</th><th>Email</th><th>Age</th><th>Location</th><th>Date</th></tr></thead><tbody>";
        foreach ($result as $row) {
            echo "<tr><td>".escape($row["id"])."</td><td>".escape($row["firstname"])."</td><td>".escape($row["lastname"])."</td><td>".escape($row["email"])."</td><td>".escape($row["age"])."</td><td>".escape($row["location"])."</td><td>".escape($row["date"])."</td></tr>";
        }
        echo "</tbody></table>";
    } else {
        echo "<p>No results found for ".escape($_POST['location']).".</p>";
    }
}
?>

<a href="index.php">Back to home</a>

<?php include "templates/footer.php"; ?>
