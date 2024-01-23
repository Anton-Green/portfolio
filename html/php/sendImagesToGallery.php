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

$user_id = $_SESSION['user_id'];

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

$sql = "SELECT id FROM images WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);

if (!$stmt->execute()) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['status' => 'error', 'message' => 'Error executing query']);
    exit;
}

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $imageIds = array();

    while ($row = $result->fetch_assoc()) {
        $imageId = $row["id"];
        $imageIds[] = $imageId;
    }

    echo json_encode(['status' => 'success', 'image_ids' => $imageIds]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'you didnt upload anything yet']);
}

$stmt->close();
$conn->close();
?>
