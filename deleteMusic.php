<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(400); 
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'unknown user']);
    exit;
}

$user_id = $_SESSION['user_id'];

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


$audioId = $_POST['audioId'];


$sql = "SELECT id FROM music WHERE id = ? AND user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $audioId, $user_id);

if (!$stmt->execute()) {
    http_response_code(500); 
    echo json_encode(['status' => 'error', 'message' => 'Error executing query']);
    exit;
}

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'no file']);
    exit;
}


$sqlDelete = "DELETE FROM music WHERE id = ?";
$stmtDelete = $conn->prepare($sqlDelete);
$stmtDelete->bind_param("i", $audioId);

if (!$stmtDelete->execute()) {
    http_response_code(500); 
    echo json_encode(['status' => 'error', 'message' => 'Error deleting audio']);
    exit;
}

/*
$sqlFilePath = "SELECT music_path FROM music WHERE id = ?";
$stmtFilePath = $conn->prepare($sqlFilePath);
$stmtFilePath->bind_param("i", $audioId);
$stmtFilePath->execute();
$resultFilePath = $stmtFilePath->get_result();
$rowFilePath = $resultFilePath->fetch_assoc();
$filePath = $rowFilePath['music_path'];
unlink($filePath);
*/

echo json_encode(['status' => 'success', 'message' => 'Аудиофайл успешно удален']);

$stmt->close();
$stmtDelete->close();
$conn->close();
?>
