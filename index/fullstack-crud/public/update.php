<?php
require "../config.php";
require "../common.php";

try{
    $connection = new PDO($dsn, $username, $password, $options);
    $sql = "Select * FROM user";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchALL();
} catch (PDOException $error) {
    echo $sql . "<br>" . $error->getMessage();
}
?>

<?php include "templates/header.php"; ?>

<h2>Update Users</h2>

<table>
<thead><tr><th>ID</th><th>First</th><th>Last</th><th>Email</th><th>Age</th><th>Location</th><th>Date</th><th>Edit</th></tr></thead>
<tbody>
<?php foreach ($result as $row): ?>
<tr>
<td><?= escape($row["id"]); ?></td>
<td><?= escape($row["firstname"]); ?></td>
<td><?= escape($row["lastname"]); ?></td>
<td><?= escape($row["email"]); ?></td>
<td><?= escape($row["age"]); ?></td>
<td><?= escape($row["location"]); ?></td>
<td><?= escape($row["date"]); ?></td>
<td><a href="update-single.php?id=<?= escape($row["id"]); ?>">Edit</a></td>
</tr>
<?php endforeach; ?>
</tbody>
</table>

<a href="index.php">Back to home</a>

<?php include "templates/footer.php"; ?>