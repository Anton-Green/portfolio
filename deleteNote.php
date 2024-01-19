<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    exit;
}

$user_id = $_SESSION['user_id'];
$note_id = $_POST['note_id'];

$servername = "Localhost";  
$username = "cfjylqr1_admin"; 
$password = "Qwertyanton1!"; 
$dbname = "cfjylqr1_message";   

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = $conn->prepare("DELETE FROM user_notes WHERE user_id = ? AND id = ?");
$sql->bind_param("ii", $user_id, $note_id);

if ($sql->execute()) {
    echo json_encode(['message' => 'Note deleted successfully']);
} else {
    echo json_encode(['message' => 'Error deleting note']);
}

$sql->close();
$conn->close();
?>
