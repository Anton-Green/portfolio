<?php
$servername = "localhost";
$username = "cfjylqr1_admin";
$password = "Qwertyanton1!";
$dbname = "cfjylqr1_message";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["id"])) {
    $imageId = $_GET["id"];


    $query = "SELECT image_path FROM images WHERE id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("i", $imageId);
        $stmt->execute();
        $stmt->bind_result($imagePath);


        if ($stmt->fetch()) {
            
            header("Content-type: image/png"); 
            readfile($imagePath);
        } else {
            echo "Image not found";
        }

        $stmt->close();
    } else {
        echo "Error in SQL query preparation";
    }
} else {
    echo "Invalid request or missing 'id' parameter";
}


$conn->close();
?>
