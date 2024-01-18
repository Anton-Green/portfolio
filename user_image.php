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
    if (isset($_FILES['image'])) {
        $imageTmpName = $_FILES['image']['tmp_name'];
        $imageData = file_get_contents($imageTmpName);

        $uploadPath = 'uploads/';
        $imageName = uniqid() . '_' . $_FILES['image']['name'];
        $targetPath = $uploadPath . $imageName;

        if (move_uploaded_file($imageTmpName, $targetPath)) {
            $insertImageSql = $conn->prepare("INSERT INTO images (image_name, image_path) VALUES (?, ?)");
            $insertImageSql->bind_param("ss", $imageName, $targetPath);

            if ($insertImageSql->execute()) {
                // Отправляем id в ответе
                $imageId = $insertImageSql->insert_id;
                echo json_encode(['message' => 'Image sent successfully', 'id' => $imageId]);
            } else {
                echo json_encode(['message' => 'Error sending image']);
            }

            $insertImageSql->close();
        } else {
            echo json_encode(['message' => 'Error moving uploaded file']);
        }
    } else {
        echo json_encode(['message' => 'No image provided']);
    }
}

$conn->close();
?>
