<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    exit;
}

$user_id = $_SESSION['user_id'];

$servername = "Localhost";  
$username = "cfjylqr1_admin"; 
$password = "Qwertyanton1!"; 
$dbname = "cfjylqr1_message";  

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = $conn->prepare("SELECT id, title, content FROM user_notes WHERE user_id = ?");
$sql->bind_param("i", $user_id);

if ($sql->execute()) {
    $result = $sql->get_result();
    $notes = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode(['message' => 'Notes retrieved successfully', 'notes' => $notes]);
} else {
    echo json_encode(['message' => 'Error retrieving notes']);
}

$sql->close();
$conn->close();
?>
