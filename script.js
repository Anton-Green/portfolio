$(document).ready(function () {

    
    var storedUser = getCookie('user');
    var isSnowfallCookieValue = getCookie('isSnowfallEnabled');

    if (isSnowfallCookieValue === null) {
        isSnowfallEnabled = true
    }
    else {
        var isSnowfallEnabled = isSnowfallCookieValue === 'true';
    }

    
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
            url: 'checkLogin.php',
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
            url: 'viewNotes.php',
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
            url: 'deleteNote.php',
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

    $("#contactForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: 'insertData.php',
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

                    window.location.href = "userCabinet.html";

                    var user_id = response.user.id;
                    var user_history = new Date();
                    function sendHistory() {


                        $.ajax({
                            type: "POST",
                            url: "sendHistory.php",
                            data: {
                                user_id: user_id,
                                user_history: user_history
                            },
                            success: function (response) {
                                //console.log(response);
                                //alert("send");
                            },
                            error: function (error) {
                                //console.log(error);
                                //alert("error");
                            }
                        });
                    }
                    sendHistory();
                    
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
            url: 'resetPasswordRequest.php',
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
            url: 'resetPasswordProcess.php',
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
        //aler("check");
        $.ajax({
            url: 'logout.php',
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                alert("you logged out");

                function deleteCookie() {
                    document.cookie = "user_history=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "isSnowfallEnabled=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "user_pic=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }
                deleteCookie();

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
            url: 'saveNote.php',
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

    if (window.location.pathname !== '/users.html') {
        checkLoginStatus()
    }

    if (window.location.pathname === '/userCabinet.html') {
        changeImageFromCookie();
        getOldUsers();
        function getOldUsers() {
            $.ajax({
                type: "GET",
                url: "getHistory.php",
                dataType: "json",
                success: function (response) {

                    var currentDate = new Date();
                    var oldUsers = [];

                    //console.log(response);

                    response.forEach(function (data) {
                        var historyDate = new Date(data.user_history);
                        var timeDifference = currentDate - historyDate;
                        var daysDifference = timeDifference / (1000 * 60 * 60 * 24); 

                        if (daysDifference > 7) {
                            oldUsers.push(data.user_id);
                        }
                    });

                    sendReminder();
                    //console.log(oldUsers);

                    function sendReminder() {
                        var array = oldUsers;
                        
                        $.ajax({
                            type: 'POST',
                            url: 'sendReminder.php', 
                            data: JSON.stringify({ data: array }),
                            success: function (response) {
                                console.log(response);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.error("AJAX Error:", textStatus, errorThrown);
                            }
                        });
                    }

                    var oldUsers = [];
                    //console.log(oldUsers);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("AJAX Error:", textStatus, errorThrown);
                    console.log("Server response:", jqXHR.responseText);
                }
            });
        }
    }

    $("#send_image").submit(function (event) {
        event.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: 'sendImage.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                alert(response.message);
                changeImage(response.id);
                setCookie('user_pic', response.id, 30);
            },
            error: function (error) {
                alert("Something goes wrong");
            }
        });
    });

    $("#musicForm").submit(function (event) {
        var formData = new FormData(document.getElementById('musicForm'));

        $.ajax({
            url: 'sendMusic.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                alert(response.message);
                // ƒобавьте свой код дл€ обновлени€ интерфейса или выполнени€ дополнительных действий после успешной загрузки музыки
            },
            error: function (error) {
                alert(response);
            }
        });
    });



    
    function changeImage(id) {
        document.getElementById("displayedImage").src = "displayImage.php?id=" + id;
    }
    
    function changeImageFromCookie() {
        var imageId = getCookie("user_pic");
        if (imageId !== null) {
            changeImage(imageId);
        } else {
            // default
            changeImage(1);
        }
    }

    displayUserNotes();

   
    
});
