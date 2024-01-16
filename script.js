$(document).ready(function () {
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
            error: function (error) {
                alert("Something goes wrong");
            }
        });
    });
});

$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: 'login.php',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (response) {
                if (response.message === 'Login successful') {
                    alert("Login successful");

                    // ќтображение имени и email на странице
                    $('#user-info').html('Welcome, ' + response.user.email);

                    // ћожете добавить код дл€ перенаправлени€ на другую страницу после успешного входа
                } else {
                    alert("Invalid email or password");
                }
            },
            error: function (xhr, status, error) {
                alert("Something went wrong");
            }
        });
    });
});

