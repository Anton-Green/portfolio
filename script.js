$(document).ready(function () {
<<<<<<< HEAD
    $("#myForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: 'insert_data.php',
            type: 'POST',
            data: $(this).serialize(), 
            dataType: 'json',
            success: function (response) {
                alert("Message sented")
            },
            error: function (error) {
                alert("Something goes wrong");
            }
        });
    });
});

$(document).ready(function () {
    $("#registrationForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: 'register.php',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (response) {
                alert("Message sented")

            },
            error: function (xhr, status, error) {
                alert("Something goes wrong");
            }
        });
    });
});
=======
    // Event handler for form submission
    $("#myForm").submit(function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Use jQuery to make an Ajax request
        $.ajax({
            url: 'insert_data.php',
            type: 'POST',
            data: $(this).serialize(), // Serialize form data
            dataType: 'json',
            success: function (response) {
                // Check if the response contains a message
                if (response.message) {
                    // Update the content of the result div with the data from PHP
                    $('#result').html('Message from PHP: ' + response.message);
                    alert("all good");
                } else {
                    // Handle unexpected response
                    $('#result').html('Unexpected response from server');
                }
            },
            error: function (xhr, status, error) {
                // Handle Ajax errors
                console.log('Ajax request failed: ' + status + ' - ' + error);

                // Display an error message to the user
                $('#result').html('Error: Unable to submit the form. Please try again.');
            }
        });
    });
});
>>>>>>> 865d2f0c5d846065df2ade6e4ff31cc8c7d62e25
