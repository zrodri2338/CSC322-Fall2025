<?php
require "../config.php";
require "../common.php";

if (isset($_POST['submit'])) {
    if (!hash_equals($_SESSION['csrf'], $_POST['csrf'])) die();

    try {
        $connection = new PDO($dsn, $username, $password, $options);

        $new_user = [
            "firstname" => $_POST['firstname'],
            "lastname"  => $_POST['lastname'],
            "email"     => $_POST['email'],
            "age"       => $_POST['age'],
            "location"  => $_POST['location']
        ];

        $sql = sprintf(
            "INSERT INTO %s (%s) values (%s)",
            "users",
            implode(", ", array_keys($new_user)),
            ":" . implode(", :", array_keys($new_user))
        );

        $statement = $connection->prepare($sql);
        $statement->execute($new_user);
        $success = "User successfully added!";
    } catch (PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }
}
?>

<?php include "templates/header.php"; ?>

<h2>Add a User</h2>

<?php if (!empty($success)) echo "<p>$success</p>"; ?>

<form method="post">
    <label for="firstname">First Name</label>
    <input type="text" name="firstname" id="firstname">

    <label for="lastname">Last Name</label>
    <input type="text" name="lastname" id="lastname">

    <label for="email">Email</label>
    <input type="text" name="email" id="email">

    <label for="age">Age</label>
    <input type="text" name="age" id="age">

    <label for="location">Location</label>
    <input type="text" name="location" id="location">

    <input type="hidden" name="csrf" value="<?php echo escape($_SESSION['csrf']); ?>">
    <input type="submit" name="submit" value="Submit">
</form>

<a href="index.php">Back to home</a>

<?php include "templates/footer.php"; ?>
