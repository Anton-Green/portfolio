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
    $musicId = intval($_GET["id"]);

    $query = "SELECT music_path FROM music WHERE id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("i", $musicId);
        $stmt->execute();
        $stmt->bind_result($musicPath);

        if ($stmt->fetch()) {
            header("Content-type: audio/mpeg");
            header("Content-length: " . filesize($musicPath));
            readfile($musicPath);
        } else {
            echo "Music not found";
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
