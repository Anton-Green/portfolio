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

    // Проверка уникальности email
    $checkEmailSql = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $checkEmailSql->bind_param("s", $email);
    $checkEmailSql->execute();
    $checkEmailResult = $checkEmailSql->get_result();

    if ($checkEmailResult->num_rows > 0) {
        echo json_encode(['message' => 'User with this email already exists']);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $insertSql = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $insertSql->bind_param("sss", $username, $email, $hashedPassword);

    if ($insertSql->execute()) {
        echo json_encode(['message' => 'User created successfully']);
    } else {
        echo json_encode(['message' => 'Error creating user']);
    }

    $insertSql->close();
    $checkEmailSql->close();
}

$conn->close();
?>
