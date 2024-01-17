<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; 

function generateUniqueCode() {
    return bin2hex(random_bytes(16));
}

function sendResetCodeByEmail($email, $code) {
    $mail = new PHPMailer(true);
    try 
    {
        $mail->isSMTP();
        $mail->Host       = 'mail.anthonyonokin.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'testmail@anthonyonokin.com';
        $mail->Password   = 'Qwertyanton1!'; 
        $mail->SMTPSecure = 'ssl'; 
        $mail->Port       = 465; 

        $mail->setFrom('testmail@anthonyonokin.com', 'anthony'); 
        $mail->addAddress($email); 

        $mail->isHTML(true);
        $mail->Subject = 'Password Reset Code';
        $mail->Body    = 'Your password reset code is: ' . $code;

        $mail->send();

        // Update reset_code in the database
        updateResetCode($email, $code);

        echo json_encode(['message' => 'Reset code sent successfully']);
    } 
    catch (Exception $e) 
    {
        echo json_encode(['message' => 'Error sending reset code']);
    }
}

function updateResetCode($email, $code) {
    $servername = "Localhost";  
    $username = "cfjylqr1_admin"; 
    $password = "Qwertyanton1!"; 
    $dbname = "cfjylqr1_message";   

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $updateSql = $conn->prepare("UPDATE users SET reset_code = ? WHERE email = ?");
    $updateSql->bind_param("ss", $code, $email);
    $updateSql->execute();

    $updateSql->close();
    $conn->close();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
}

$servername = "Localhost";  
$username = "cfjylqr1_admin"; 
$password = "Qwertyanton1!"; 
$dbname = "cfjylqr1_message";   

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = $conn->prepare("SELECT id FROM users WHERE email = ?");
$sql->bind_param("s", $email);
$sql->execute();
$result = $sql->get_result();

if ($result->num_rows > 0) {
    $resetCode = generateUniqueCode();

    sendResetCodeByEmail($email, $resetCode);
}

$sql->close();
$conn->close();
?>
