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
    $user_id = isset($_POST["user_id"]) ? $_POST["user_id"] : '';
    $userHistory = isset($_POST["user_history"]) ? $_POST["user_history"] : '';

    $sql = $conn->prepare("INSERT INTO history (user_id, user_history) VALUES (?, ?)");
    $sql->bind_param("ss", $user_id, $userHistory);

    if ($sql->execute()) {
        echo json_encode(['message' => 'Data inserted successfully']);
    } else {
        echo json_encode(['message' => 'Error inserting data']);
    }

    $sql->close();
}
elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
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
}



$conn->close();
?>
