<?php

$servername = "localhost";
$username = "cfjylqr1_admin";
$password = "Qwertyanton1!";
$dbname = "cfjylqr1_message";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$imageId = isset($_GET['id']) ? $_GET['id'] : null;


if ($imageId !== null) {
    
    $stmt = $conn->prepare("SELECT image_path FROM images WHERE id = ?");
    $stmt->bind_param("s", $imageId);
    $stmt->execute();
    $stmt->bind_result($fileUrl);
    
    
    if ($stmt->fetch()) {
        echo json_encode(array('fileUrl' => $fileUrl));
    } else {
        
        echo json_encode(array('error' => 'File not found'));
    }

    
    $stmt->close();
} else {
    
    echo json_encode(array('error' => 'ID not specified'));
}


$conn->close();

?>
