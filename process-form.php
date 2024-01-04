<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Basic email content
    $to = "anton.onokhin2@gmail.com";
    $subject = "New Contact Form Submission";
    $headers = "From: $email";

    // Compose the email body
    $email_body = "Name: $name\n\nEmail: $email\n\nMessage:\n$message";

    // Send email
    mail($to, $subject, $email_body, $headers);

    
    exit();
}
?>
