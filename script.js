$(document).ready(function () {

    
    var isSnowfallCookieValue = getCookie('isSnowfallEnabled');
    var isSnowfallEnabled = isSnowfallCookieValue === 'true';

    var storedUser = getCookie('user');
    var numberOfSnowflakes = 200;
    var snowflakeInterval = 500;
    
    //setCookie('cookieName', var, daysNum);
    //var name = getCookie('cookieName');

    var snowflakeCreation = setInterval(function () {
        if (isSnowfallEnabled) {
            createSnowflake();
            numberOfSnowflakes--;
        } else {
            clearInterval(snowflakeCreation);
        }
    }, snowflakeInterval);

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

    function checkLoginStatus() {
        $.ajax({
            url: 'check_login.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (!data.loggedIn) {
                    //console.log('unknown user');
                    alert('you need to log in');
                    window.location.href = 'users.html';
                }
            },
            error: function (error) {
                console.error(error);
            }
        });
    }

    function displayUserNotes() {
        $.ajax({
            url: 'view_notes.php',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response && response.notes) {
                    $('#notes-container').empty();
                    response.notes.forEach(function (note) {
                        var noteHtml = '<div class="note">' +
                            '<h3>' + note.title + '</h3>' +
                            '<p>' + note.content + '</p>' +
                            '<button class="delete-btn" data-note-id="' + note.id + '">Delete</button>' +
                            '</div>';

                        $('#notes-container').append(noteHtml);
                    });

                    // Attach click event to delete buttons
                    $('.delete-btn').click(function () {
                        var noteId = $(this).data('note-id');
                        deleteNote(noteId);
                    });
                } else {
                    console.error('Error fetching user notes');
                }
            },
            error: function (error) {
                //console.error(error);
            }
        });
    }

    function deleteNote(noteId) {
        $.ajax({
            url: 'delete_note.php',
            type: 'POST',
            data: { note_id: noteId },
            dataType: 'json',
            success: function (response) {
                if (response.message === 'Note deleted successfully') {
                    console.log(response.message);
                    displayUserNotes();
                } else {
                    console.error(response.message);
                }
            },
            error: function (error) {
                console.error(error);
            }
        });
    }

    function createSnowflake() {
        var snowflake = $("<div class='snowflake'>").appendTo(".snow-container");
        var startPositionLeft = Math.random() * $(window).width();
        var startOpacity = 0.5 + Math.random() * 0.5;
        var sizeSnowflake = 20;
        var endPositionTop = $(window).height() + 2000;
        var endPositionLeft = startPositionLeft - 100 + Math.random() * 200;
        var durationFall = 15000 + Math.random() * 5000;

        snowflake.css({
            left: startPositionLeft,
            /*opacity: startOpacity,*/
            width: sizeSnowflake,
            height: sizeSnowflake
        });

        snowflake.animate({
            top: endPositionTop,
            left: endPositionLeft,
            /*opacity: 0.2*/
        }, durationFall, 'linear', function () {
            $(this).remove();
        });
    }

    $("#myForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: 'insert_data.php',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (response) {
                alert(response.message)
            },
            error: function (error) {
                alert("Something goes wrong");
            }
        });
    });

    $("#registrationForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: 'register.php',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (response) {
                alert(response.message)
            },
            error: function (error) {
                alert("Something goes wrong");
            }
        });
    });

    $("#loginForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: 'login.php',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (response) {
                if (response.message === 'Login successful') {
                    alert(response.message);

                    $('#user-info').html('Welcome, ' + response.user.username);

                    setCookie('user', JSON.stringify(response.user), 30);

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

    $("#sendCodeForm").submit(function (event) {
        event.preventDefault();

        var email = $("#email").val();

        $.ajax({
            url: 'reset_password_request.php',
            type: 'POST',
            data: { email: email },
            dataType: 'json',
            success: function (response) {
                alert(response.message);
            },
            error: function (error) {
                alert(error);
            }
        });
    });

    $("#resetForm").submit(function (event) {
        event.preventDefault();

        var email = $("#email").val();
        var resetCode = $("#resetCode").val();
        var newPassword = $("#newPassword").val();

        $.ajax({
            url: 'reset_password_process.php',
            type: 'POST',
            data: {
                email: email,
                resetCode: resetCode,
                newPassword: newPassword
            },
            dataType: 'json',
            success: function (response) {
                /*$('#message').html(response.message);*/
                alert(response.message);
            },
            error: function (error) {

                console.error(error);
            }
        });
    });

    $("#logoutButton").click(function () {
        //event.preventDefault();

        $.ajax({
            url: 'logout.php',
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                alert("you logged out");

                document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                window.location.href = "index.html";
            },
            error: function (error) {
                alert("Logout error:", error);
            }
        });
    });

    $("#saveNote").click(function () {
        var title = $("#noteTitle").val();
        var content = $("#noteContent").val();

        $.ajax({
            url: 'save_note.php',
            type: 'POST',
            data: { title: title, content: content },
            dataType: 'json',
            success: function (response) {
                alert(response.message);
            },
            error: function (xhr, status, error) {
                alert("Error saving note");
            }
        });
    });

    $("#toggleSnow").on("click", function () {

        isSnowfallEnabled = !isSnowfallEnabled;

        if (isSnowfallEnabled) {
            setCookie('isSnowfallEnabled', isSnowfallEnabled, 30);
            snowflakeCreation = setInterval(createSnowflake, snowflakeInterval);
            alert(isSnowfallEnabled);
        } else {
            setCookie('isSnowfallEnabled', isSnowfallEnabled, 30);
            clearInterval(snowflakeCreation);
            alert(isSnowfallEnabled);
        } 
    });

    if (storedUser) {
        var user = JSON.parse(storedUser);
        $('#user-info').html('Welcome back, ' + user.username);
    }

    if (window.location.pathname === '/user_cabinet.html') {
        checkLoginStatus();
    }

    

    displayUserNotes();


});
