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

    
    $checkEmailSql = $conn->prepare("SELECT id FROM deanUsers WHERE email = ?");
    $checkEmailSql->bind_param("s", $email);
    $checkEmailSql->execute();
    $checkEmailResult = $checkEmailSql->get_result();

    if ($checkEmailResult->num_rows > 0) {
        echo json_encode(['message' => 'User with this email already exists']);
        exit;
    }




    $checkUsernameSql = $conn->prepare("SELECT id FROM deanUsers WHERE username = ?");
    $checkUsernameSql->bind_param("s", $username);
    $checkUsernameSql->execute();
    $checkUsernameResult = $checkUsernameSql->get_result();

    if ($checkUsernameResult->num_rows > 0) {
       echo json_encode(['message' => 'User with this username already exists']);
       exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $insertSql = $conn->prepare("INSERT INTO deanUsers (username, email, password) VALUES (?, ?, ?)");
    $insertSql->bind_param("sss", $username, $email, $hashedPassword);

if ($insertSql->execute()) {
    // Get the last inserted user ID
    $lastInsertedId = $conn->insert_id;
    // Send the user ID in the JSON response along with the success message
    echo json_encode(['message' => 'User created successfully', 'user_id' => $lastInsertedId]);
} else {
    echo json_encode(['message' => 'Error creating user']);
}

    $insertSql->close();
    $checkEmailSql->close();
}

$conn->close();
?>