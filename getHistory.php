<?php
$servername = "Localhost";
$username = "cfjylqr1_admin";
$password = "Qwertyanton1!";
$dbname = "cfjylqr1_message";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = array();

$sql = "SELECT user_id, user_history FROM history";
$query_result = $conn->query($sql);

if ($query_result->num_rows > 0) {
    while ($row = $query_result->fetch_assoc()) {
        $result[] = array(
            'user_id' => $row['user_id'],
            'user_history' => $row['user_history']
        );
    }
}

echo json_encode($result);

$conn->close();
?>
