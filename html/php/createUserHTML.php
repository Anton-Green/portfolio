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

$stmt_username = $conn->prepare("SELECT username FROM users WHERE id = ?");
$stmt_username->bind_param("i", $user_id);
$stmt_username->execute();
$stmt_username->bind_result($author_username);
$stmt_username->fetch();
$stmt_username->close();

if (isset($_POST['fileName'])) {
    
    $fileName = $_POST['fileName'];

    $htmlName = $fileName . '.html';
    $htmlPath = '../html/php/uploads/userTexts/' . $htmlName;
    $htmlContent = "<html><head><title>{$fileName}</title></head><body><h1>in development</h1></body></html>";
    
    file_put_contents($htmlPath, $htmlContent);

    $stmt = $conn->prepare("INSERT INTO userHtml (htmlPath, userId, fileName, author) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("siss", $htmlPath, $user_id, $fileName, $author_username);

    if ($stmt->execute()) {
        $fileId = $stmt->insert_id;
        echo json_encode(['message' => 'File created successfully', 'id' => $fileId]);
    } else {
        echo json_encode(['message' => 'Error creating file']);
    }

    $stmt->close();
} else {
    echo json_encode(['message' => 'No fileName provided']);
}

$conn->close();
?>
