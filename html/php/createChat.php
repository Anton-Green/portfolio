<?php

$servername = "localhost";
$username = "cfjylqr1_admin";
$password = "Qwertyanton1!";
$dbname = "cfjylqr1_message";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("connect error: " . $conn->connect_error);
}


session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(['status' => 'error', 'message' => 'Пользователь не аутентифицирован']);
    exit;
}

$sender_id = $_SESSION['user_id'];


if (isset($_GET['username'])) {
    $receiver_id = $_GET['username'];
} else {
    die("No username provided.");
}


$table_name = "chat_" . $sender_id . "_" . $receiver_id;


$sql = "CREATE TABLE IF NOT EXISTS $table_name (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message_text TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "chat created";
} else {
    echo "chat exsist: " . $conn->error;
}


$conn->close();

?>
