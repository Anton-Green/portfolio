<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(['status' => 'error', 'message' => 'unknown user']);
    exit;
}

$user_id = $_SESSION['user_id'];
$receiver_username = $_POST['receiver_username'] ?? '';

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

$sql = "SELECT message_text, sender_id, receiver_id FROM chat WHERE 
        (sender_id = ? AND receiver_id IN (SELECT id FROM users WHERE username = ?)) OR 
        (receiver_id = ? AND sender_id IN (SELECT id FROM users WHERE username = ?))";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issi", $user_id, $receiver_username, $user_id, $receiver_username);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Error executing query: ' . $stmt->error]);
    exit;
}

$result = $stmt->get_result();
$messages = [];

while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

echo json_encode(['status' => 'success', 'messages' => $messages]);

$stmt->close();
$conn->close();
?>
