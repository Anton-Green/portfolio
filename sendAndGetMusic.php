<?php
$servername = "localhost";
$username = "cfjylqr1_admin";
$password = "Qwertyanton1!";
$dbname = "cfjylqr1_message";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_FILES['music'])) {
        $musicTmpName = $_FILES['music']['tmp_name'];

        // Проверка успешности чтения файла
        $musicData = file_get_contents($musicTmpName);
        if ($musicData === false) {
            echo json_encode(['message' => 'Error reading music file']);
            $conn->close();
            exit;
        }

        $uploadPath = 'uploads/';
        $musicName = $conn->real_escape_string(uniqid() . '_' . $_FILES['music']['name']);
        $targetPath = $conn->real_escape_string($uploadPath . $musicName);

        if (move_uploaded_file($musicTmpName, $targetPath)) {
            $insertMusicSql = $conn->prepare("INSERT INTO music (music_name, music_path) VALUES (?, ?)");
            $insertMusicSql->bind_param("ss", $musicName, $targetPath);

            if ($insertMusicSql->execute()) {
                echo json_encode(['message' => 'Music sent successfully']);
            } else {
                echo json_encode(['message' => 'Error sending music', 'error' => $insertMusicSql->error]);
                $insertMusicSql->close();
                $conn->close();
                exit;
            }

            $insertMusicSql->close();
        } else {
            echo json_encode(['message' => 'Error moving uploaded file']);
            $conn->close();
        }
    } else {
        echo json_encode(['message' => 'No music provided']);
        $conn->close();
    }
}

elseif ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["id"])) {
	$musicId = intval($_GET["id"]);

    $query = "SELECT music_path FROM music WHERE id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("i", $musicId);
        $stmt->execute();
        $stmt->bind_result($musicPath);

        if ($stmt->fetch()) {
            header("Content-type: audio/mpeg");
            header("Content-length: " . filesize($musicPath));
            readfile($musicPath);
        } else {
            echo "Music not found";
        }

        $stmt->close();
    } else 
    {
        echo "Error in SQL query preparation";
    }
}
else 
{
    echo "Invalid request or missing 'id' parameter";
}

$conn->close();
?>
