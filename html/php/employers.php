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


$sql = "SELECT user_id, email FROM employers";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $userId = $row['user_id'];
        $userEmail = $row['email'];


        $mail = new PHPMailer(true);

        try {

            $mail->isSMTP();
            $mail->Host       = 'mail.anthonyonokin.com'; 
            $mail->SMTPAuth   = true;
            $mail->Username   = 'contact@anthonyonokin.com';
            $mail->Password   = 'Qwertyanton1!'; 
            $mail->SMTPSecure = 'ssl'; 
            $mail->Port       = 465; 

            $mail->setFrom('contact@anthonyonokin.com', 'Anthony Green');


            $mail->addAddress($userEmail);

            $mail->isHTML(true);
            $mail->Subject = 'Application for Web developer position';
            $mail->Body    = "Dear Mr/Ms,<br><br>I hope this email finds you well. I am writing to express my interest in the Web developer role at your company.<br><br>I’d be happy to send you my portfolio for your review. You can find it at: <a href='https://github.com/Anton-Green/portfolio'>GitHub Portfolio</a><br><br>Warm regards,<br>Anthony Green";


            $mail->send();
            


            echo "Email sent to $userEmail successfully<br>";
        } catch (Exception $e) {
            echo "Email sending failed to $userEmail. Error: {$mail->ErrorInfo}<br>";
        }
    }
} else {
    echo "No users found in the database";
}


$conn->close();
?>
