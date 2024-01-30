<?php
ini_set('session.cookie_lifetime', 0);
session_start();


$servername = "Localhost";  
$username = "cfjylqr1_admin"; 
$password = "Qwertyanton1!"; 
$dbname = "cfjylqr1_message";   

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = $conn->prepare("SELECT id, username, email, password FROM users WHERE email = ?");
    $sql->bind_param("s", $email);
    $sql->execute();
    $result = $sql->get_result();
    $user = $result->fetch_assoc();

    

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['logged_in'] = true;
        echo json_encode(['message' => 'Login successful', 'user' => $user]);
    } else {
        echo json_encode(['message' => 'Invalid email or password']);
    }

    $sql->close();
} else {
    header("Location: login.html");
}
$conn->close();
?>

