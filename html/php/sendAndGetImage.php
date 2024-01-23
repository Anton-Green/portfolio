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
    http_response_code(401); 
    exit;
}

$user_id = $_SESSION['user_id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_FILES['image'])) {
        $imageTmpName = $_FILES['image']['tmp_name'];
        $imageData = file_get_contents($imageTmpName);

        $uploadPath = 'uploads/gallery/';
        $imageName = uniqid() . '_' . $_FILES['image']['name'];
        $targetPath = $uploadPath . $imageName;

        if (move_uploaded_file($imageTmpName, $targetPath)) {
            $insertImageSql = $conn->prepare("INSERT INTO images (image_name, image_path, user_id) VALUES (?, ?, ?)");
            $insertImageSql->bind_param("ssi", $imageName, $targetPath, $user_id);

            if ($insertImageSql->execute()) {
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



elseif ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["id"])) {
	$imageId = $_GET["id"];


    $query = "SELECT image_path FROM images WHERE id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("i", $imageId);
        $stmt->execute();
        $stmt->bind_result($imagePath);


        if ($stmt->fetch()) {
            
            header("Content-type: image/png"); 
            readfile($imagePath);
        } else {
            echo "Image not found";
        }

        $stmt->close();
    } else {
        echo "Error in SQL query preparation";
    }
}
else 
{
    echo "Invalid request or missing 'id' parameter";
}





$conn->close();
?>
