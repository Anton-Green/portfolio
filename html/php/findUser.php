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

$username = isset($_GET['username']) ? $_GET['username'] : '';

$query = $conn->prepare("SELECT * FROM users WHERE username LIKE ?");
$searchUsername = '%' . $conn->real_escape_string($username) . '%';
$query->bind_param('s', $searchUsername);
$query->execute();
$result = $query->get_result();

$results = array();
while ($row = $result->fetch_assoc()) {
    $results[] = $row;
}

echo json_encode($results);

$conn->close();
?>
