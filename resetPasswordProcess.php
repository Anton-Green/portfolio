<?php

require 'vendor/autoload.php';

function updateUserPassword($email, $newPassword) {
    $servername = "localhost";  
    $username = "cfjylqr1_admin"; 
    $password = "Qwertyanton1!"; 
    $dbname = "cfjylqr1_message";   

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    $updateSql = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
    $updateSql->bind_param("ss", $hashedPassword, $email);
    $updateSql->execute();

    echo json_encode(['message' => 'Password updated successfully']);

    $updateSql->close();
    $conn->close();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $resetCode = $_POST["resetCode"];
    $newPassword = $_POST["newPassword"];

    $servername = "localhost";  
    $username = "cfjylqr1_admin"; 
    $password = "Qwertyanton1!"; 
    $dbname = "cfjylqr1_message";   

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = $conn->prepare("SELECT id FROM users WHERE email = ? AND reset_code = ?");
    $sql->bind_param("ss", $email, $resetCode);
    $sql->execute();
    $result = $sql->get_result();

    if ($result->num_rows > 0) {
        // User and code match, update the password
        updateUserPassword($email, $newPassword);
    } else {
        // User or code doesn't match
        echo json_encode(['message' => 'Invalid email or reset code']);
    }

    $sql->close();
    $conn->close();
} 

?>
