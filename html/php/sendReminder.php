<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; 

$servername = "Localhost";
$username = "cfjylqr1_admin";
$password = "Qwertyanton1!";
$dbname = "cfjylqr1_message";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['data']) && is_array($data['data'])) {
    
    foreach ($data['data'] as $userId) {
        $userId = intval($userId);
        
        
        $sql = "SELECT id, email FROM users WHERE id = $userId";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            
            $row = $result->fetch_assoc();
            $userId = $row['id'];
            $userEmail = $row['email'];

            

            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = 'mail.anthonyonokin.com'; 
            $mail->SMTPAuth   = true;
            $mail->Username   = 'contact@anthonyonokin.com';
            $mail->Password   = 'Qwertyanton1!'; 
            $mail->SMTPSecure = 'ssl'; 
            $mail->Port       = 465; 

            $mail->setFrom('contact@anthonyonokin.com', 'Anthony');
            $mail->addAddress($userEmail);
            $mail->Subject = 'comeback';
            $mail->Body = 'user comeback to website';

            if ($mail->send()) {
                echo "email sented to $userEmail.";

                $updateSql = "UPDATE history SET user_history = NULL WHERE user_id = $userId";
                $conn->query($updateSql);
            } else {
                echo "error " . $mail->ErrorInfo;
            }
        } else {
            echo "not foundD $userId ";
        }
    }
} else {
    echo "error.";
}



$conn->close();
?>
