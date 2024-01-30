<?php
session_regenerate_id();

$servername = "Localhost";  
$username = "cfjylqr1_admin"; 
$password = "Qwertyanton1!"; 
$dbname = "cfjylqr1_message";   

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    
    
    $id = $_SESSION['user_id'] ?? null;

    if (empty($id)) {
        echo json_encode(['error' => 'User ID not available']);
        exit;
    }

    $sql = $conn->prepare("SELECT id FROM users WHERE id = ?");
    $sql->bind_param("s", $id);
    $sql->execute();
    $result = $sql->get_result();
    $user = $result->fetch_assoc();

    if (!empty($user['id'])) {
        $_SESSION['user_id'] = $user['id'];

        if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
            echo json_encode(['loggedIn' => true]);
        } else {
            echo json_encode(['loggedIn' => false]);
        }
    } else {
        echo json_encode(['error' => 'User not found']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>
