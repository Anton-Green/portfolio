$(document).ready(function () {
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
                    alert(response.message);

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

    $("#logoutButton").click(function () {
        //event.preventDefault();

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

    displayUserNotes();

    if (window.location.pathname === '/user_cabinet.html') {
        checkLoginStatus();
    }

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

    /*in develop*/
   
    
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


    var numberOfSnowflakes = 200;
    var snowflakeInterval = 500;
    var isSnowfallEnabled = true;
 
    var snowflakeCreation = setInterval(function () {
        if (numberOfSnowflakes > 0) {
            createSnowflake();
            numberOfSnowflakes--;
        } else {
            clearInterval(snowflakeCreation); // Остановка интервала 
        }
    }, snowflakeInterval);
   
    function createSnowflake() {
        var snowflake = $("<div class='snowflake'>").appendTo(".snow-container");
        var startPositionLeft = Math.random() * $(window).width();
        var startOpacity = 0.5 + Math.random() * 0.5;
        var sizeSnowflake = 20;
        var endPositionTop = $(window).height() + 1500;
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
            
            createSnowflake();
        });
    }

    // Обработчик нажатия на кнопку
    $("#toggleSnow").on("click", function () {
        isSnowfallEnabled = !isSnowfallEnabled;
        if (isSnowfallEnabled) {
            alert("turn on");
            snowflakeCreation = setInterval(createSnowflake, snowflakeInterval);
        } else {
            alert("turn off");
            clearInterval(snowflakeCreation);
        }
    });


});

