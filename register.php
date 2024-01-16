<?php
$servername = "Localhost";  
$username = "cfjylqr1_admin"; 
$password = "Qwertyanton1!"; 
$dbname = "cfjylqr1_message";   


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirmPassword"];

    if ($password !== $confirmPassword) {
        echo json_encode(['message' => 'Passwords do not match']);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $sql->bind_param("sss", $username, $email, $hashedPassword);


    if ($sql->execute()) {
        echo json_encode(['message' => 'Data inserted successfully']);
    } else {
        echo json_encode(['message' => 'Error inserting data']);
    }


    $sql->close();
}

$conn->close();
?>
