<?php
session_start();

if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) 
{
    echo json_encode(['loggedIn' => true]);
} 
else 
{
    echo json_encode(['loggedIn' => false]);
}
?>
