<?php
require "../config.php";
require "../common.php";

if (isset($_GET["id"])) {
    try {
        $connection = new PDO($dsn, $username, $password, $options);
        $id = $_GET["id"];
        $sql = "DELETE FROM users WHERE id = :id";
        $statement = $connection->prepare($sql);
        $statement->bindValue(":id", $id);
        $statement->execute();
        echo "<p style='color:green;'>✅ User deleted successfully.</p>";
    } catch (PDOException $error) {
        echo "<p style='color:red;'>❌ Error: " . $error->getMessage() . "</p>";
    }
}

try {
    $connection = new PDO($dsn, $username, $password, $options);
    $sql = "SELECT * FROM users";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();
} catch (PDOException $error) {
    echo "<p style='color:red;'>❌ Error: " . $error->getMessage() . "</p>";
}
?>

<?php require "templates/header.php"; ?>

<h2>Delete Users</h2>

<?php if ($result && $statement->rowCount() > 0) : ?>
<table border="1" cellpadding="6">
  <thead>
    <tr>
      <th>ID</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Age</th>
      <th>Location</th>
      <th>Date</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    <?php foreach ($result as $row) : ?>
    <tr>
      <td><?= escape($row["id"]); ?></td>
      <td><?= escape($row["firstname"]); ?></td>
      <td><?= escape($row["lastname"]); ?></td>
      <td><?= escape($row["email"]); ?></td>
      <td><?= escape($row["age"]); ?></td>
      <td><?= escape($row["location"]); ?></td>
      <td><?= escape($row["date"]); ?></td>
      <td><a href="delete.php?id=<?= escape($row["id"]); ?>" onclick="return confirm('Are you sure?');">Delete</a></td>
    </tr>
    <?php endforeach; ?>
  </tbody>
</table>
<?php else : ?>
<p style="color:red;">⚠️ No users found in database.</p>
<?php endif; ?>

<a href="index.php">Back to home</a>

<?php require "templates/footer.php"; ?>
