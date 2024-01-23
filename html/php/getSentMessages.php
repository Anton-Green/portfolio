<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(['status' => 'error', 'message' => 'Пользователь не аутентифицирован']);
    exit;
}

$user_id = $_SESSION['user_id'];
$receiver_username = $_POST['receiver_username'];

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

$sql = "SELECT message_text FROM chat WHERE sender_id = ? AND receiver_id = (SELECT id FROM users WHERE username = ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $user_id, $receiver_username);

if (!$stmt->execute()) {
    http_response_code(500); 
    echo json_encode(['status' => 'error', 'message' => 'Error executing query']);
    exit;
}

$result = $stmt->get_result();
$sentMessages = [];

while ($row = $result->fetch_assoc()) {
    $sentMessages[] = $row;
}

echo json_encode(['status' => 'success', 'messages' => $sentMessages]);

$stmt->close();
$conn->close();
?>
