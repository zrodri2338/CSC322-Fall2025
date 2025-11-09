<?php
require "../config.php";
require "../common.php";

if (isset($_POST['submit'])) {
    if (!hash_equals($_SESSION['csrf'], $_POST['csrf'])) die();

    try {
        $connection = new PDO($dsn, $username, $password, $options);
        $user = [
            "id" => $_POST['id'],
            "firstname" => $_POST['firstname'],
            "lastname" => $_POST['lastname'],
            "email" => $_POST['email'],
            "age" => $_POST['age'],
            "location" => $_POST['location']
        ];

        $sql = "UPDATE users
                SET firstname = :firstname,
                    lastname = :lastname,
                    email = :email,
                    age = :age,
                    location = :location
                WHERE id = :id";

        $statement = $connection->prepare($sql);
        $statement->execute($user);
        $success = "User successfully updated.";
    } catch (PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }
}

if (isset($_GET['id'])) {
    try {
        $connection = new PDO($dsn, $username, $password, $options);
        $id = $_GET['id'];
        $sql = "SELECT * FROM users WHERE id = :id";
        $statement = $connection->prepare($sql);
        $statement->bindValue(':id', $id);
        $statement->execute();
        $user = $statement->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }
}
?>

<?php include "templates/header.php"; ?>

<h2>Edit User</h2>
<?php if (!empty($success)) echo "<p>$success</p>"; ?>

<form method="post">
    <?php foreach ($user as $key => $value): ?>
        <label for="<?= $key; ?>"><?= ucfirst($key); ?></label>
        <input type="text" name="<?= $key; ?>" id="<?= $key; ?>" value="<?= escape($value); ?>" <?= ($key === 'id' ? 'readonly' : ''); ?>>
    <?php endforeach; ?>
    <input type="hidden" name="csrf" value="<?= escape($_SESSION['csrf']); ?>">
    <input type="submit" name="submit" value="Submit">
</form>

<a href="update.php">Back to update list</a>

<?php include "templates/footer.php"; ?>
