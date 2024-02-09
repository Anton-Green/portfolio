<?php

$servername = "Localhost";  
$username = "cfjylqr1_admin"; 
$password = "Qwertyanton1!"; 
$dbname = "cfjylqr1_message";   

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("error: " . $conn->connect_error);
}

$conn->set_charset("utf8"); 

session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    exit;
}

$user_id = userId;

$fileName = isset($_GET['fileName']) ? $_GET['fileName'] : '';

$query = $conn->prepare("SELECT * FROM userHtml WHERE fileName LIKE ?");
$searchFileName = '%' . $conn->real_escape_string($fileName) . '%';
$query->bind_param('s', $searchFileName);
$query->execute();
$result = $query->get_result();

$results = array();
while ($row = $result->fetch_assoc()) {
    $results[] = $row;
}

echo json_encode($results);

$conn->close();
?>
