<?php
$servername = "localhost";
$username = "cfjylqr1_admin";
$password = "Qwertyanton1!";
$dbname = "cfjylqr1_message";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    exit;
}

$user_id = $conn->real_escape_string($_SESSION['user_id']);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_FILES['music'])) {
        $musicTmpName = $_FILES['music']['tmp_name'];

        $musicData = file_get_contents($musicTmpName);
        if ($musicData === false) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['message' => 'Error reading music file']);
            $conn->close();
            exit;
        }

        $uploadPath = 'uploads/';
        $musicName = $conn->real_escape_string(uniqid() . '_' . $_FILES['music']['name']);
        $targetPath = $conn->real_escape_string($uploadPath . $musicName);

        if (move_uploaded_file($musicTmpName, $targetPath)) {
            $insertMusicSql = $conn->prepare("INSERT INTO music (music_name, music_path, user_id) VALUES (?, ?, ?)");
            $insertMusicSql->bind_param("sss", $musicName, $targetPath, $user_id);

            if ($insertMusicSql->execute()) {
                echo json_encode(['message' => 'Music sent successfully']);
            } else {
                http_response_code(500); // Internal Server Error
                echo json_encode(['message' => 'Error sending music', 'error' => $insertMusicSql->error]);
                $insertMusicSql->close();
                $conn->close();
                exit;
            }

            $insertMusicSql->close();
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(['message' => 'Error moving uploaded file']);
            $conn->close();
        }
    } else {
        echo json_encode(['message' => 'No music provided']);
        $conn->close();
    }
} 



$conn->close();
?>
