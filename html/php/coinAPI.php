<?php
// Include the API wrapper class
require('/src/CoinpaymentsAPI.php');

// Include your API keys
require('/src/keys.php');

// Create an API wrapper instance
try {
    $cps_api = new CoinpaymentsAPI($private_key, $public_key, 'json');
    $information = $cps_api->GetBasicInfo();
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
    exit();
}

// Check for success of API call
if ($information['error'] == 'ok') {
    // Display account information
    echo "Username: " . $information['result']['username'] . "\n";
    echo "Merchant ID: " . $information['result']['merchant_id'] . "\n";
    echo "Email: " . $information['result']['email'] . "\n";
    echo "Public Name: " . $information['result']['public_name'] . "\n";
} else {
    // Display error message
    echo 'There was an error returned by the API call: ' . $information['error'];
}





?>