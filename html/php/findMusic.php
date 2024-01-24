<?php

$servername = "Localhost";  
$username = "cfjylqr1_admin"; 
$password = "Qwertyanton1!"; 
$dbname = "cfjylqr1_message";   

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("error: " . $conn->connect_error);
}

$musicName = isset($_GET['music_name']) ? $_GET['music_name'] : '';

$query = "SELECT * FROM music WHERE music_name LIKE '%" . $musicName . "%'";
$result = $conn->query($query);

$results = array();
while ($row = $result->fetch_assoc()) {
    $results[] = $row;
}

echo json_encode($results);

$conn->close();
?>
