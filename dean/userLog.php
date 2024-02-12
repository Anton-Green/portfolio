<?php
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


    // Prepare and bind parameters
    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = $conn->prepare("SELECT id, username, email, password FROM deanUsers WHERE email = ?");
    $sql->bind_param("s", $email);
    $sql->execute();
    $result = $sql->get_result();
    $user = $result->fetch_assoc();

 // Check if user exists and password is correct
    if ($user && password_verify($password, $user['password'])) {
        // Start session and set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['logged_in'] = true;

        // Send success response to JavaScript along with the user ID
        echo json_encode(array('success' => true, 'message' => 'Login successful', 'user_id' => $user['id']));
    } else {
        // Send error response to JavaScript
        echo json_encode(array('success' => false, 'message' => 'Invalid email or password'));
    }

    // Close statement and database connection
    $sql->close();
    $conn->close();
} else {
    // If the form is not submitted, send error response to JavaScript
    echo json_encode(array('success' => false, 'message' => 'Invalid request'));
}
?>