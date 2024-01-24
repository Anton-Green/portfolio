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

        

        if (storedUser === null) {
            alert('you need to log in');
            window.location.href = '/html/users.html';
        }
        
    }

    function displayUserNotes() {
        $.ajax({
            url: 'php/viewNotes.php',
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

                        location.reload();
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
            url: 'php/deleteNote.php',
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

    function addImageToGallery() {
        $.ajax({
            url: 'php/sendImagesToGallery.php',
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    var imageIds = response.image_ids;

                    for (var i = 0; i < imageIds.length; i++) {
                        console.log("Image ID is: " + imageIds[i]);

                        const imageDiv = document.createElement('div');
                        imageDiv.id = imageIds[i];
                        imageDiv.classList.add('grid-item');

                        const imageElement = document.createElement('img');
                        imageElement.src = `php/sendAndGetImage.php?id=${imageIds[i]}`;
                        imageDiv.appendChild(imageElement);


                        const deleteButton = document.createElement('button');
                        deleteButton.innerText = 'delete';

                        deleteButton.addEventListener('click', () => {



                            //console.log(imageDiv.id);

                            deleteImage(imageDiv.id);
                        });



                        function deleteImage(imageDivId) {
                            $.ajax({
                                type: "POST",
                                url: "php/deleteImage.php",
                                data: { imageId: imageDivId },
                                success: function (response) {
                                    alert("image deleted");
                                    console.log(response);
                                    location.reload();
                                },
                                error: function (error) {
                                    console.error("error: " + error.responseText);
                                }
                            });
                        }

                        imageDiv.appendChild(deleteButton);


                        const downloadButton = document.createElement('button');
                        downloadButton.innerText = 'download';
                        downloadButton.addEventListener('click', function () {
                            var imageId = imageDiv.id;
                            console.log(imageDiv.id);

                            $.ajax({
                                type: 'GET',
                                url: "php/getImagePath.php",
                                data: { id: imageId },
                                dataType: 'json',
                                success: function (data) {
                                    if (data.error) {
                                        console.error(data.error);
                                    } else {


                                        var fileUrl = data.fileUrl;
                                        var link = document.createElement('a');
                                        link.href = fileUrl;
                                        link.download = 'downloadedItem';
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);


                                    }
                                },
                                error: function (error) {
                                    console.error('error:', error);
                                }
                            });
                        });


                        imageDiv.appendChild(downloadButton);



                        document.getElementById('imageContainer').appendChild(imageDiv);


                    }
                } else {
                    console.log(response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error(status + ", " + error);
            }
        });
    }

    function addMusicToGallery() {
        $.ajax({
            url: 'php/sendMusicToGallery.php',
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    var audioIds = response.audio_ids;

                    for (var i = 0; i < audioIds.length; i++) {
                        //console.log("Audio ID is: " + audioIds[i]);

                        const audioDiv = document.createElement('div');
                        audioDiv.id = audioIds[i];
                        audioDiv.classList.add('grid-item');

                        const audioElement = document.createElement('audio');
                        audioElement.controls = true;
                        audioElement.src = `php/getMusic.php?id=${audioIds[i]}`;
                        audioElement.id = 'audioPlayer' + audioIds[i]; // ���������� �������
                        audioDiv.appendChild(audioElement);

                        const deleteButton = document.createElement('button');
                        deleteButton.innerText = 'delete';

                        deleteButton.addEventListener('click', () => {
                            deleteAudio(audioDiv.id);
                        });

                        function deleteAudio(audioDivId) {
                            $.ajax({
                                type: "POST",
                                url: "php/deleteMusic.php",
                                data: { audioId: audioDivId },
                                success: function (response) {
                                    alert("audio deleted");
                                    console.log(response);
                                    location.reload();
                                },
                                error: function (error) {
                                    console.error("error: " + error.responseText);
                                }
                            });
                        }

                        audioDiv.appendChild(deleteButton);

                        var audioId = audioDiv.id;

                        const downloadButton = document.createElement('button');
                        downloadButton.innerText = 'download';
                        downloadButton.addEventListener('click', function () {
                            var audioPlayerId = 'audioPlayer' + audioId; // ������� ��� ��������� ���������
                            var audioElement = document.getElementById(audioPlayerId);

                            if (audioElement) {
                                var fileUrl = audioElement.src;
                                var link = document.createElement('a');
                                link.href = fileUrl;
                                link.download = 'downloadedAudio';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            } else {
                                console.error("Audio element not found");
                            }
                        });

                        audioDiv.appendChild(downloadButton);

                        document.getElementById('audioContainer').appendChild(audioDiv);
                    }
                } else {
                    console.log(response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error(status + ", " + error);
            }
        });
    }

    function changeImage(id) {
        document.getElementById("displayedImage").src = "../html/php/sendAndGetImage.php?id=" + id;

       
    }

    function changeImageFromCookie() {
        var imageId = getCookie("user_pic");
        if (imageId !== null) {
            changeImage(imageId);

            
        } else {
            // default
            changeImage(34);
        }
    }

    function displayResults(results) {
        var resultsDiv = document.getElementById('searchResults');
        resultsDiv.innerHTML = '';

        if (results.length > 0) {
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                resultsDiv.innerHTML += '<p>ID: ' + result.id + ', name: ' + result.image_name + '</p>';
            }
        } else {
            resultsDiv.innerHTML = '<p>nothing founded</p>';
        }
    }

    function getOldUsers() {
        $.ajax({
            type: "GET",
            url: "php/sendAndGetHistory.php",
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
                        url: 'php/sendReminder.php',
                        data: JSON.stringify({ data: array }),
                        success: function (response) {

                            //console.log(response);

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

    $("#searchImage").click(function () {
        var searchInput = $("#searchInput").val();

        $.ajax({
            url: 'php/findImages.php',
            type: 'GET',
            data: { name: searchInput },
            dataType: 'json',
            success: function (results) {
                console.log(results);
            },
            error: function (xhr, status, error) {
                alert("Error searching objects");
            }
        });
    });

    $("#searchMusic").click(function () {
        var searchInput = $("#searchInput").val();

        $.ajax({
            url: 'php/findMusic.php',
            type: 'GET',
            data: { music_name: searchInput },
            dataType: 'json',
            success: function (results) {
                console.log(results);
            },
            error: function (xhr, status, error) {
                alert("Error searching objects");
            }
        });
    });






    function displayResults(results) {
        
        console.log(results);
    }


    $("#contactForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: 'php/insertData.php',
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
            url: 'php/register.php',
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
            url: 'php/login.php',
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
                            url: "php/sendAndGetHistory.php",
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
            url: 'php/resetPasswordRequest.php',
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
            url: 'php/resetPasswordProcess.php',
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
            url: 'php/logout.php',
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
            url: 'php/saveNote.php',
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
        location.reload();
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

    $("#sendImage").submit(function (event) {
        event.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: 'php/sendAndGetImage.php',
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
                console.log(error);

            }
        });
    });

    $("#sendMusic").submit(function (event) {
        var formData = new FormData(document.getElementById('sendMusic'));

        $.ajax({
            url: 'php/sendMusic.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                alert(response.message);

            },
            error: function (error) {
                alert(response);
            }
        });
    });

    if (storedUser) {
        var user = JSON.parse(storedUser);
        $('#user-info').html('Welcome back, ' + user.username);
    }

    if (window.location.pathname !== '/html/users.html') {
        checkLoginStatus()
    }

    if (window.location.pathname === '/html/userCabinet.html') {

        
        displayUserNotes();
        changeImageFromCookie();

        getOldUsers();
        

        
    }

    if (window.location.pathname === '/html/imageGallery.html') {
        addImageToGallery();
    }

    if (window.location.pathname === '/html/musicGallery.html') {
        addMusicToGallery();
    }


    $("#searchUser").click(function () {
        var searchInput = $("#searchInput").val();

        $.ajax({
            url: 'php/findUser.php',
            type: 'GET',
            data: { username: searchInput },
            dataType: 'json',
            success: function (results) {
                displayResults(results);

                var myList = document.getElementById("myList");

                var usernames = results.map(function (item) {
                    return item.username;
                });

                for (var i = 0; i < usernames.length; i++) {

                    var linkElement = document.createElement('a');
                    linkElement.href = 'https://example.com';
                    linkElement.textContent = usernames[i];

                    var listItem = document.createElement('li');
                    //listItem.textContent = usernames[i];

                    listItem.appendChild(linkElement);
                    myList.appendChild(listItem);

                    
                    
                }

                /*if (results.length > 0) {
                    
                    displayUsername(results[0].username);

                    
                    createDivAndButton();
                } else {
                    
                    $("#resultDiv").empty();
                    $("#writeButton").hide();
                }*/
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });

/*    function createDivAndButton() {
        
        var resultDiv = $("<div>").attr("id", "resultDiv");
        $("body").append(resultDiv);

        
        var writeButton = $("<button>").text("write").click(function () {
            
           
        });
        $("body").append(writeButton);
    }

    function displayUsername(username) {
        $("#resultDiv").text(username);
    }*/


    $("#sendMessageForm").submit(function (event) {
        event.preventDefault();

        var message_text = $("#message_text").val();
        var receiver_username = $("#receiver_username").val();

        var chatId = "chat-with-" + receiver_username;
        var existingChat = $("#" + chatId);

        if (existingChat.length === 0) {
            var newChat = $("<div></div>").attr("id", chatId);

            var chatInfo = $("<p></p>").text("Chat with " + receiver_username);
            newChat.append(chatInfo);

            newChat.appendTo("#chats-container");
        }

        $.ajax({
            url: 'php/sendMessage.php',
            type: 'POST',
            data: {
                message_text: message_text,
                receiver_username: receiver_username
            },
            dataType: 'json',
            success: function (response) {
                alert(response.message);

                getMessages('getReceived', receiver_username);
                getMessages('getSent', receiver_username);

                newChat.scrollTop(newChat[0].scrollHeight);
            },
            error: function (error) {
                alert("Something goes wrong");
                console.log(error);
            }
        });
    });



    function getMessages(type, receiver_username) {
        $.ajax({
            url: 'php/' + type + 'Messages.php',
            type: 'POST',
            data: {
                receiver_username: receiver_username
            },
            dataType: 'json',
            success: function (response) {
                //alert(response.message);

                var chatContainer = $("#chat-with-" + receiver_username);
                //chatContainer.empty();

                if (response.messages && response.messages.length > 0) {
                    for (var i = 0; i < response.messages.length; i++) {
                        var messageText = response.messages[i].message_text;
                        var messageElement = $("<div></div>").text(messageText);
                        chatContainer.append(messageElement);
                    }
                }

                /*else {
                    var noMessages = $("<div></div>").text("No messages yet.");
                    chatContainer.append(noMessages);
                }*/

                //chatContainer.scrollTop(chatContainer[0].scrollHeight);
            },
            error: function (error) {
                alert("Something goes wrong");
                console.log(error);
            }
        });
    }







});
