<?php
$servername = "localhost";
$username = "cfjylqr1_admin";
$password = "Qwertyanton1!";
$dbname = "cfjylqr1_message";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is GET and the 'id' parameter is set
if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["id"])) {
    $imageId = $_GET["id"];

    // Prepare and execute the SQL query to fetch image_path
    $query = "SELECT image_path FROM images WHERE id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("i", $imageId);
        $stmt->execute();
        $stmt->bind_result($imagePath);

        // Check if the image is found
        if ($stmt->fetch()) {
            // Output the image
            header("Content-type: image/png"); // Adjust the content type based on your image format
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

// Close the database connection
$conn->close();
?>
