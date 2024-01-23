<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(400); // Bad Request
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(['status' => 'error', 'message' => 'Пользователь не аутентифицирован']);
    exit;
}

$sender_id = $_SESSION['user_id'];
$message_text = $_POST["message_text"];
$receiver_username = $_POST["receiver_username"];

$servername = "localhost";
$username = "cfjylqr1_admin";
$password = "Qwertyanton1!";
$dbname = "cfjylqr1_message";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit;
}

$getReceiverIdSql = $conn->prepare("SELECT id FROM users WHERE username = ?");
$getReceiverIdSql->bind_param("s", $receiver_username);
$getReceiverIdSql->execute();
$getReceiverIdResult = $getReceiverIdSql->get_result();

if ($getReceiverIdResult->num_rows > 0) {
    $row = $getReceiverIdResult->fetch_assoc();
    $receiver_id = $row["id"];

    $insertSql = $conn->prepare("INSERT INTO chat (sender_id, receiver_id, message_text) VALUES (?, ?, ?)");
    $insertSql->bind_param("iis", $sender_id, $receiver_id, $message_text);

    if ($insertSql->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Message sent successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error sending message']);
    }

    $insertSql->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'User with this username not found']);
}

$getReceiverIdSql->close();
$conn->close();
?>
