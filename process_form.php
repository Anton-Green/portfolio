<?php
$servername = "Localhost";  
$username = "cfjylqr1_admin"; 
$password = "Qwertyanton1!"; 
$dbname = "cfjylqr1_message";   


$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];


    $sql = "INSERT INTO message (name, email, message) VALUES ('$name', '$email', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "Record added successfully";
    } 
    header("Location: /index.html");
}

$conn->close();
?>
