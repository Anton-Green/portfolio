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

    

    var storedUser = localStorage.getItem('user');

    if (storedUser) {
        var user = JSON.parse(storedUser);
        $('#user-info').html('Welcome back, ' + user.username);
    }

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

                    $('#user-info').html('Welcome, ' + response.user.username);

                    localStorage.setItem('user', JSON.stringify(response.user));

                    window.location.href = "user_cabinet.html";
                } else {
                    alert("Invalid email or password");
                }
            },
            error: function (error) {
                alert("Something went wrong");
            }
        });
    });
});

$(document).ready(function () {

    $("#logoutButton").click(function () {
        event.preventDefault();
   
        $.ajax({
            url: 'logout.php',
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                alert("you logged out");

                localStorage.removeItem('user');

                window.location.href = "index.html";
            },
            error: function (error) {
  
                alert("Logout error:", error);
            }
        });
    });
});