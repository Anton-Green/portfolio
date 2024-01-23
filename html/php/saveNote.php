<?php
session_start();

if (!isset($_SESSION['user_id'])) {
        http_response_code(401); // Unauthorized
    exit;
}

$user_id = $_SESSION['user_id'];
$title = $_POST['title'];
$content = $_POST['content'];

$servername = "Localhost";  
$username = "cfjylqr1_admin"; 
$password = "Qwertyanton1!"; 
$dbname = "cfjylqr1_message";   

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = $conn->prepare("INSERT INTO user_notes (user_id, title, content) VALUES (?, ?, ?)");
$sql->bind_param("iss", $user_id, $title, $content);

if ($sql->execute()) {
    echo json_encode(['message' => 'Note saved successfully']);
} else {
    echo json_encode(['message' => 'Error saving note']);
}

$sql->close();
$conn->close();
?>