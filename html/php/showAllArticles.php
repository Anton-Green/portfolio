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

$user_id = userId; // Assuming userId is a variable containing the user ID

$query = "SELECT fileName FROM userHtml"; // Query to fetch all filenames
$result = $conn->query($query);

$results = array();
while ($row = $result->fetch_assoc()) {
    $results[] = $row['fileName'];
}

echo json_encode($results);

$conn->close();
?>
