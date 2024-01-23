<?php
$servername = "localhost";
$username = "cfjylqr1_admin";
$password = "Qwertyanton1!";
$dbname = "cfjylqr1_message";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$imageId = $_POST['imageId'];
$sql = "DELETE FROM images WHERE id = ?";

$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("i", $imageId);

    if ($stmt->execute()) {
        echo "Image deleted";
    } else {
        echo "Error executing SQL query";
    }

    $stmt->close();
} else {
    echo "Error in SQL query preparation";
}

$conn->close();
?>
