<?php

$servername = "Localhost";
$username = "cfjylqr1_admin";
$password = "Qwertyanton1!";
$dbname = "cfjylqr1_message";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT citation_id, text FROM citations ORDER BY RAND() LIMIT 1";
$result = $conn->query($sql);


$citation = array();

if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();

    $citation = array(
        'citation_id' => $row['citation_id'],
        'text' => $row['text']
    );
}


$json_response = json_encode($citation);


echo $json_response;


$conn->close();
?>
