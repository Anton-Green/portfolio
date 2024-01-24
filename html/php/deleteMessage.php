<?php

session_start();

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(400); // Bad Request
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401); 
    echo json_encode(['status' => 'error', 'message' => 'Пользователь не аутентифицирован']);
    exit;
}

$sender_id = $_SESSION['user_id'];
$message_id = $_POST["messageId"];

$servername = "localhost";
$username = "cfjylqr1_admin";
$password = "Qwertyanton1!";
$dbname = "cfjylqr1_message";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500); 
    echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit;
}


$deleteSql = $conn->prepare("DELETE FROM chat WHERE id = ? AND sender_id = ?");
$deleteSql->bind_param("ii", $message_id, $sender_id);

if ($deleteSql->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Message deleted successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error deleting message']);
}

$deleteSql->close();
$conn->close();

?>
