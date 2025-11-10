<?php
require "../config.php";
require "../common.php";

if (isset($_POST['submit'])) {
    try {
        $connection = new PDO($dsn, $username, $password, $options);
        $user = [
            "id" => $_POST["id"],
            "firstname" => $_POST["firstname"],
            "lastname" => $_POST["lastname"],
            "email" => $_POST["email"],
            "age" => $_POST["age"],
            "location" => $_POST["location"],
        ];

        $sql = "UPDATE users 
                SET firstname = :firstname, lastname = :lastname, 
                    email = :email, age = :age, location = :location
                WHERE id = :id";

        $statement = $connection->prepare($sql);
        $statement->execute($user);
        echo "<p style='color:green;'>✅ " . htmlspecialchars($_POST['firstname']) . " updated successfully.</p>";
    } catch (PDOException $error) {
        echo "<p style='color:red;'>❌ Error: " . $error->getMessage() . "</p>";
    }
}

if (isset($_GET['id'])) {
    try {
        $connection = new PDO($dsn, $username, $password, $options);
        $id = $_GET['id'];
        $sql = "SELECT * FROM users WHERE id = :id";
        $statement = $connection->prepare($sql);
        $statement->bindValue(":id", $id);
        $statement->execute();
        $user = $statement->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $error) {
        echo "<p style='color:red;'>❌ Error: " . $error->getMessage() . "</p>";
    }
} else {
    echo "<p style='color:red;'>Something went wrong! No user ID provided.</p>";
    exit;
}
?>

<?php require "templates/header.php"; ?>

<h2>Edit User</h2>

<form method="post">
  <?php foreach ($user as $key => $value): ?>
    <label for="<?= $key; ?>"><?= ucfirst($key); ?></label>
    <input type="text" name="<?= $key; ?>" id="<?= $key; ?>" value="<?= escape($value); ?>" <?= ($key === "id" ? "readonly" : ""); ?>>
  <?php endforeach; ?>
  <input type="submit" name="submit" value="Update">
</form>

<a href="update.php">Back to update list</a>
<?php require "templates/footer.php"; ?>
