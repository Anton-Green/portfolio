$(document).ready(function () {

    currentUserId = getCookie("currentUserId");
    console.log(currentUserId);
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }

    $('#registerForm').submit(function (event) {

        event.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '../dean/userReg.php',
            data: formData,
            dataType: 'json',
            success: function (response) {


                window.location.href = '../dean/main.html';
                setCookie("currentUserId", response.user_id, 30);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $('#loginForm').submit(function (event) {

        event.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '../dean/userLog.php',
            data: formData,
            dataType: 'json',
            success: function (response) {


                window.location.href = '../dean/main.html';
                setCookie("currentUserId", response.user_id, 30);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $.ajax({
        
        type: 'POST',
        url: '../dean/showUserPoints.php',
        data: { userId: getCookie("currentUserId") }, 
        dataType: 'json',
        success: function (response) {

            var responseContainer = document.getElementById("responseContainer");
            var message = "Hello " + response.username + ". You have " + response.pointsNumber + " points";
            responseContainer.textContent = message;

        },
        error: function (xhr, status, error) {
            console.error('Error:', xhr.responseText);
        }
    });


});