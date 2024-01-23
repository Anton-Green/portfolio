<?php

$servername = "Localhost";  
$username = "cfjylqr1_admin"; 
$password = "Qwertyanton1!"; 
$dbname = "cfjylqr1_message";   


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}


$name = isset($_GET['name']) ? $_GET['name'] : '';


$query = "SELECT * FROM images WHERE image_name LIKE '%" . $name . "%'";
$result = $conn->query($query);


$results = array();
while ($row = $result->fetch_assoc()) {
    $results[] = $row;
}


echo json_encode($results);


$conn->close();
?>
