<?php

$servername = "Localhost";  
$username = "cfjylqr1_admin"; 
$password = "Qwertyanton1!"; 
$dbname = "cfjylqr1_message";   

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$userId = $_POST['userId'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Query to fetch points number and username for the given user ID
    $sql = "SELECT username, points FROM deanUsers WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch the username and points number
        $row = $result->fetch_assoc();
        $username = $row["username"];
        $pointsNumber = $row["points"];
        // Send the username and points number as JSON response
        echo json_encode(['success' => true, 'username' => $username, 'pointsNumber' => $pointsNumber]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found or points not available']);
    }

    // Close statement and database connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
}
?>