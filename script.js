$(document).ready(function () {

    //var storedUser = getCookie('user');
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

    function deleteCookie() {
        var cookiesToDelete = ["user_history", "user", "isSnowfallEnabled", "user_pic"];

        cookiesToDelete.forEach(function (cookieName) {
            document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });
    }

    function checkLoginStatus() {

        $.ajax({
            url: '../html/php/checkLogin.php', 
            type: 'GET',
            dataType: 'json', 
            success: function (response) {
                
                //console.log(response);
                
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });

    }

    function displayUserNotes() {
        $.ajax({
            url: '../html/php/viewNotes.php',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response && response.notes) {
                    $('#notes-container').empty();
                    response.notes.forEach(function (note) {
                        var noteHtml = '<div class="note" data-note-id="' + note.id + '">' +
                            '<h3>' + note.title + '</h3>' +
                            '<p >' + note.content + '</p>' +
                            '</div>';

                        $('#notes-container').append(noteHtml);

                        
                        
                    });
                    
                    
                  
                    $('#notes-container').on('click', '.note', function () {
                        var noteId = $(this).data('note-id');
                        deleteNote(noteId);
                           
                        location.reload();
                    });
                } else {
                    console.error('Error fetching user notes');
                }
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function deleteNote(noteId) {
        $.ajax({
            url: '../html/php/deleteNote.php',
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
            error: function (xhr) {
                console.error(xhr.responseText);
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

    function deleteImage(imageDivId) {
        $.ajax({
            type: "POST",
            url: "../html/php/deleteImage.php",
            data: { imageId: imageDivId },
            success: function (response) {
                alert("image deleted");
                console.log(response);
                location.reload();
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function downloadImage(imageId) {


        $.ajax({
            type: 'GET',
            url: "../html/php/getImagePath.php",
            data: { id: imageId },
            dataType: 'json',
            success: function (data) {
                if (data.error) {
                    console.error(data.error);
                } else {


                    var downloadLink = document.createElement('a');
                    downloadLink.href = `../html/php/sendAndGetImage.php?id=${imageId}`;
                    downloadLink.download = `image_${imageId}.png`; 

                  
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);


                }
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function imageHandler(object) {
        var imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = '';

        if (object !== null) {
            var imageIds = object;

            for (var i = 0; i < imageIds.length; i++) {
                //console.log("Image ID is: " + imageIds[i]);

                const imageDiv = document.createElement('div');
                imageDiv.id = imageIds[i];
                imageDiv.classList.add('grid-item');

                const imageElement = document.createElement('img');
                imageElement.src = `../html/php/sendAndGetImage.php?id=${imageIds[i]}`;
                imageDiv.appendChild(imageElement);


                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'delete';

                deleteButton.addEventListener('click', () => {



                    //console.log(imageDiv.id);

                    deleteImage(imageDiv.id);
                });

                imageDiv.appendChild(deleteButton);




                const downloadButton = document.createElement('button');
                downloadButton.innerText = 'download';
                downloadButton.addEventListener('click', function () {
                    
                    //console.log(imageDiv.id);

                    downloadImage(imageDiv.id);
                    

                    
                });

                imageDiv.appendChild(downloadButton);



                document.getElementById('imageContainer').appendChild(imageDiv);


            }
        }
        else {
            console.log(object);
        }
    }

    function addImageToGallery() {
        $.ajax({
            url: '../html/php/sendImagesToGallery.php',
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                console.log(response);

                // написать функцию принимающюю данные
                var object = response.image_ids;

                imageHandler(object);


                
                


            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function deleteAudio(audioDivId) {
        $.ajax({
            type: "POST",
            url: "../html/php/deleteMusic.php",
            data: { audioId: audioDivId },
            success: function (response) {
                alert("audio deleted");
                console.log(response);
                location.reload();
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function downloadAudio(audioId) {
        var audioPlayerId = 'audioPlayer' + audioId;
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
    }

    function addMusicToGallery() {


        $.ajax({
            url: '../html/php/sendMusicToGallery.php',
            type: 'POST',
            dataType: 'json',
            success: function (response) {

                //console.log(response);
                var object = response.audio_ids;

                musicHandler(object)

                
            },

            

            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function musicHandler(musicSearchResults) {
        if (musicSearchResults !== null) {

            const searchResultsContainer = document.getElementById('searchResults');
            searchResultsContainer.innerHTML = '';


            var container = musicSearchResults;

            for (var i = 0; i < container.length; i++) {

                const audioDiv = document.createElement('div');
                audioDiv.id = container[i];
                audioDiv.classList.add('grid-item');

                const audioElement = document.createElement('audio');
                audioElement.controls = true;
                audioElement.src = `php/getMusic.php?id=${container[i]}`;
                audioElement.id = 'audioPlayer' + container[i];
                audioDiv.appendChild(audioElement);

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'delete';

                deleteButton.addEventListener('click', () => {
                    deleteAudio(audioDiv.id);
                });

                audioDiv.appendChild(deleteButton);

                const downloadButton = document.createElement('button');
                downloadButton.innerText = 'download';
                downloadButton.addEventListener('click', function () {
                    downloadAudio(audioDiv.id);
                });

                audioDiv.appendChild(downloadButton);

                searchResultsContainer.appendChild(audioDiv);
            }
        } else {
            console.error(response.message);
        }
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

   /* function sendReminder(oldUsers) {
        var array = oldUsers;

        $.ajax({
            type: 'POST',
            url: '../html/php/sendReminder.php',
            data: JSON.stringify({ data: array }),
            success: function (response) {

                //console.log(response);

            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }*/

    function getOldUsers() {
        $.ajax({
            type: "GET",
            url: "../html/php/sendAndGetHistory.php",
            dataType: "json",
            success: function (response) {

                var currentDate = new Date();
                var oldUsers = [];

                

                response.forEach(function (data) {
                    var historyDate = new Date(data.user_history);
                    var timeDifference = currentDate - historyDate;
                    var daysDifference = timeDifference / (1000 * 60 * 60 * 24);

                    if (daysDifference > 7) {
                        oldUsers.push(data.user_id);
                    }
                });

                sendReminder(oldUsers);
                

                

                var oldUsers = [];
                
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function sendMessage(message_text, receiver_username, container) {

        $.ajax({
            url: '../html/php/sendMessage.php',
            type: 'POST',
            data: {
                message_text: message_text,
                receiver_username: receiver_username
            },
            dataType: 'json',
            success: function (response) {


                getMessages(receiver_username, container);


                //newChat.scrollTop(newChat[0].scrollHeight);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function getMessages(receiver_username, container) {
        $.ajax({
            url: '../html/php/getMessages.php',
            type: 'POST',
            data: {
                receiver_username: receiver_username
            },
            dataType: 'json',
            success: function (response) {
                container.empty();

                if (response.messages && response.messages.length > 0) {
                    for (var i = 0; i < response.messages.length; i++) {
                        var messageId = response.messages[i].id;
                        var messageText = response.messages[i].message_text;

                        var messageElement = $('<div class="message" data-message-id="' + messageId + '">' + messageText + '</div>');
                        container.append(messageElement);


                        messageElement.on('click', function () {
                            var messageId = $(this).data('message-id');

                            console.log(messageId);

                            deleteMessage(messageId, receiver_username, container);
                        });
                    }
                }
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function createHTMLChat(username) {

        var mainDiv = document.createElement('div');


        var chatInfo = document.createElement('p');
        chatInfo.textContent = "chat with " + username;
        mainDiv.appendChild(chatInfo);


        var divForMessages = document.createElement('div');
        divForMessages.id = 'messagesContainer';
        mainDiv.appendChild(divForMessages);

        var formForMessages = document.createElement('form');


        var inputForMessages = document.createElement('input');
        inputForMessages.type = 'text';
        inputForMessages.placeholder = 'write a message';

        inputForMessages.id = 'messageInput';

        formForMessages.appendChild(inputForMessages);



        var buttonForMessages = document.createElement('button');
        buttonForMessages.textContent = 'send';
        formForMessages.appendChild(buttonForMessages);

        buttonForMessages.addEventListener('click', function (event) {
            event.preventDefault();

            var messageText = $("#messageInput").val();

            sendMessage(messageText, username, $("#messagesContainer"));
        });

        mainDiv.appendChild(formForMessages);





        var buttonHideChat = document.createElement('button');
        buttonHideChat.textContent = 'hide chat';
        mainDiv.appendChild(buttonHideChat);

        buttonHideChat.addEventListener('click', function (event) {
            event.preventDefault();
            hideChat(mainDiv);
        });



        var buttonDeleteChat = document.createElement('button');
        buttonDeleteChat.textContent = 'delete chat';
        mainDiv.appendChild(buttonDeleteChat);

        buttonDeleteChat.addEventListener('click', function (event) {
            event.preventDefault();

            //deleteChat();
        });




        return mainDiv;
    }

    function hideChat(container) {

        container.remove();
    }

    function deleteMessage(messageId, receiver_username, container) {
        $.ajax({
            url: '../html/php/deleteMessage.php',
            type: 'POST',
            data: {
                messageId: messageId,
                receiver_username: receiver_username
            },
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    console.log('Message deleted successfully');


                    getMessages(receiver_username, container);

                } else {
                    console.error('Error deleting message: ' + response.message);
                }
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function sendHistory() {


        $.ajax({
            type: "POST",
            url: "../html/php/sendAndGetHistory.php",
            data: {
                user_id: user_id,
                user_history: user_history
            },
            success: function (response) {
                //console.log(response);
                //alert("send");
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function displayRandomCitation() {
        $.ajax({
            url: "../html/php/citations.php",
            type: "GET",
            dataType: "json",
            success: function (response) {
                $('#citation').html('<strong>Citation of the day:</strong> ' + '<br>' + response.text);
            },

            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function SEO() {
        const structuredData = {
            "@context": "https://schema.org/",
            "@type": "Article",
            "headline": "Example article",
            "description": "Anthony Greene's personal website, check out the works of a young software developer.",
            "author": {
                "@type": "The guy",
                "name": "Anthony"
            },
            "datePublished": "2024-02-06",
            "image": "../images/favicon.ico",
            "publisher": {
                "@type": "Organization",
                "name": "my Organization",
                "logo": {
                    "@type": "ImageObject",
                    "url": "../images/favicon.ico"
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://anthonyonokin.com/"
            }
        };

        const structuredDataString = JSON.stringify(structuredData);

        const scriptElement = document.createElement('script');
        scriptElement.type = 'application/ld+json';
        scriptElement.textContent = structuredDataString;
        document.head.appendChild(scriptElement);
    }

    $("#searchImage").click(function () {
        var searchInput = $("#searchInput").val();

        $.ajax({
            url: '../html/php/findImages.php',
            type: 'GET',
            data: { name: searchInput },
            dataType: 'json',
            success: function (results) {

                
                var object = results.map(item => item.id);

                //console.log(object);

                

                imageHandler(object);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $("#searchMusic").click(function () {
        var searchInput = $("#searchInput").val();

        $.ajax({
            url: '../html/php/findMusic.php',
            type: 'GET',
            data: { music_name: searchInput },
            dataType: 'json',
            success: function (results) {
                console.log(results);
                
                musicHandler(results);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $("#contactForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: '../html/php/insertData.php',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (response) {
                alert(response.message)
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $("#registrationForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: '../html/php/register.php',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (response) {
                alert(response.message)
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $("#loginForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: '../html/php/login.php',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (response) {

                if (response.message === 'Login successful') {
                    alert(response.message);

                    $('#user-info').html('Welcome, ' + response.user.username);
                    setCookie('user', JSON.stringify(response.user), 30);
                    setCookie('userId', response.user.id, 30);

                    window.location.href = "userCabinet.html";

                    var user_id = response.user.id;
                    var user_history = new Date();
                    
                    sendHistory();
                    
                } else {
                    alert("Invalid email or password");
                }
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $("#sendCodeForm").submit(function (event) {
        event.preventDefault();

        var email = $("#email").val();

        $.ajax({
            url: '../html/php/resetPasswordRequest.php',
            type: 'POST',
            data: { email: email },
            dataType: 'json',
            success: function (response) {
                alert(response.message);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $("#resetForm").submit(function (event) {
        event.preventDefault();

        var email = $("#email").val();
        var resetCode = $("#resetCode").val();
        var newPassword = $("#newPassword").val();

        $.ajax({
            url: '../html/php/resetPasswordProcess.php',
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
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $("#logoutButton").click(function () {
        
        
        $.ajax({
            url: '../html/php/logout.php',
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                alert("you logged out");

                
                deleteCookie();

                window.location.href = "../index.html";
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $("#saveNote").click(function () {
        var title = $("#noteTitle").val();
        var content = $("#noteContent").val();

        $.ajax({
            url: '../html/php/saveNote.php',
            type: 'POST',
            data: { title: title, content: content },
            dataType: 'json',
            success: function (response) {
                alert(response.message);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
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

    $("#setUserPic").submit(function (event) {
        event.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: '../html/php/sendAndGetImage.php',
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
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $("#sendImage").submit(function (event) {
        event.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: '../html/php/sendAndGetImage.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                alert(response.message);



            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $("#sendMusic").submit(function (event) {
        var formData = new FormData(document.getElementById('sendMusic'));

        $.ajax({
            url: '../html/php/sendMusic.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                alert(response.message);

            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    /*if (storedUser) {
        var user = JSON.parse(storedUser);
        $('#user-info').html('Welcome back, ' + user.username);
    }*/

    if (window.location.pathname !== '/html/users.html') {
        checkLoginStatus()
        SEO();
    }

    if (window.location.pathname === '/index.html') {
        displayRandomCitation();
        cursor();
    }

    if (window.location.pathname === '/html/userCabinet.html') {

        
        displayUserNotes();
        changeImageFromCookie();

        getOldUsers();
        
        getMessages("test", $("#chatContainer"));
        
    }

    if (window.location.pathname === '/html/imageGallery.html') {
        addImageToGallery();
    }

    if (window.location.pathname === '/html/musicGallery.html') {
        addMusicToGallery();
    }

    if (window.location.pathname === '/html/notes.html') {
        displayUserNotes()
    }

    if (window.location.pathname === '/html/userArticles.html') {
        /*ShowAllArticles()*/
        
    }

    if (window.location.pathname === '/html/anim.html') {
        typeWriter();
    }


    $("#searchUser").click(function () {
        var searchInput = $("#searchInput").val();

        $.ajax({
            url: '../html/php/findUser.php',
            type: 'GET',
            data: { username: searchInput },
            dataType: 'json',
            success: function (results) {
                

                


                var userList = document.getElementById("userListContainer");
                var userChat = document.getElementById("chatWithUserContainer");

                var usernames = results.map(function (item) {
                    return item.username;
                });

                for (var i = 0; i < usernames.length; i++) {
                    

                    var listItem = document.createElement('li');
                    listItem.textContent = usernames[i];

                    listItem.addEventListener('click', function (event) {
                        event.preventDefault();

                        userChat.innerHTML = '';

                        var createdChat = createHTMLChat(this.textContent);
                        userChat.appendChild(createdChat);

                        getMessages(this.textContent, $("#messagesContainer"));
                    });

                    
                    userList.appendChild(listItem);
                    
                    
                    
                }


                

            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $("#sendMessageForm").submit(function (event) {
        event.preventDefault();

        var message_text = $("#message_text").val();
        var receiver_username = $("#receiver_username").val();
        

        sendMessage(message_text, receiver_username, $("#chatContainer"));

        
    });

    $("#sendHTML").submit(function (event) {
        event.preventDefault();

        var fileName = $("#articleName").val();

        $.ajax({
            url: '../html/php/createUserHTML.php',
            type: 'POST',
            data: { fileName: fileName },
            dataType: 'json',
            success: function (response) {
                alert(response.message);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    });

    $("#searchArticle").click(function () {
        var searchInput = $("#searchInput").val();

        $.ajax({
            url: '../html/php/findArticle.php',
            type: 'GET',
            data: { fileName: searchInput, userId: getCookie('userId')},
            dataType: 'json',
            success: function (results) {

                //console.log(results);



                var articleList = document.getElementById("articleListContainer");

                var articlePath = results.map(function (item) {
                    return item.htmlPath;
                });

                var articleNames = results.map(function (item) {
                    return item.fileName;
                });

                var articleAuthor = results.map(function (item) {
                    return item.author;
                });

              
               

                for (var i = 0; i < articleNames.length; i++) {
                    (function (index) {
                        var listItem = document.createElement('li');
                        listItem.textContent = articleNames[index] + ". Written by: " + articleAuthor[index];

                        listItem.addEventListener('click', function (event) {
                            event.preventDefault();

                            //console.log(articleNames[index]);
                            window.location.href = articlePath[index];
                        });

                        articleList.appendChild(listItem);
                    })(i);
                }


            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });

   /* function ShowAllArticles() {
        $.ajax({
            url: '../html/php/showAllArticles.php',
            method: 'GET',
            dataType: 'json',
            success: function (results) {
                var articleList = $('#articleListContainer');

                var articlePath = results.map(function (item) {
                    return item.htmlPath;
                });

                var articleNames = results.map(function (item) {
                    return item.fileName;
                });

                var articleAuthor = results.map(function (item) {
                    return item.author;
                });

                for (var i = 0; i < articleNames.length; i++) {
                    (function (index) {
                        var listItem = $('<li></li>').text(articleNames[index] + ". Written by: " + articleAuthor[index]);

                        listItem.on('click', function (event) {
                            event.preventDefault();
                            window.location.href = articlePath[index];
                        });

                        articleList.append(listItem);
                    })(i);
                }
            },
            error: function (xhr, status, error) {
                // Handle any errors
                console.error('Error:', error);
            }
        });
    }*/







    function typeWriter() {
        var i = 0;
        var txt = 'Typing text example';
        var speed = 50;
        var typingElement = document.getElementById("typing");

        function type() {
            if (i < txt.length) {
                typingElement.innerHTML += txt.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }



   /* function sendEmailToEmployers() {
        $.ajax({
            url: "../html/php/employers.php",
            type: "POST",
            success: function (response) {
                alert(response); 
            },
            error: function (xhr) {
                console.error(xhr.responseText); 
            }
        });
    }*/



    function cursor() {
        const cursorCanvas = document.getElementById("cursorCanvas");
        const ctx = cursorCanvas.getContext('2d');

        const pointer = {
            x: .5 * window.innerWidth,
            y: .5 * window.innerHeight,
        };

        const params = {
            pointsNumber: 40,
            widthFactor: .3,
            mouseThreshold: .6,
            spring: .4,
            friction: .5
        };

        const trail = new Array(params.pointsNumber);
        for (let i = 0; i < params.pointsNumber; i++) {
            trail[i] = {
                x: pointer.x,
                y: pointer.y,
                dx: 0,
                dy: 0,
            };
        }

        window.addEventListener("mousemove", e => {
            updateMousePosition(e.pageX, e.pageY);
        });
        window.addEventListener("touchmove", e => {
            updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
        });

        function updateMousePosition(eX, eY) {
            pointer.x = eX;
            pointer.y = eY;
        }

        setupCanvas();
        update(0);
        window.addEventListener("resize", setupCanvas);

        function update(t) {
            ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
            ctx.strokeStyle = 'white';
            trail.forEach((p, pIdx) => {
                const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
                const spring = pIdx === 0 ? .4 * params.spring : params.spring;
                p.dx += (prev.x - p.x) * spring;
                p.dy += (prev.y - p.y) * spring;
                p.dx *= params.friction;
                p.dy *= params.friction;
                p.x += p.dx;
                p.y += p.dy;
            });

            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(trail[0].x, trail[0].y);

            for (let i = 1; i < trail.length - 1; i++) {
                const xc = .5 * (trail[i].x + trail[i + 1].x);
                const yc = .5 * (trail[i].y + trail[i + 1].y);
                ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
                ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
                ctx.stroke();
            }
            ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
            ctx.stroke();

            window.requestAnimationFrame(update);
        }

        function setupCanvas() {
            cursorCanvas.width = window.innerWidth;
            cursorCanvas.height = window.innerHeight;
        }
    }
    
    $(window).scroll(function () {
        $('.slide-right-on-scroll').each(function () {
            var position = $(this).offset().top;
            var windowHeight = $(window).height();
            var scroll = $(window).scrollTop();

            if (position < scroll + windowHeight) {
                $(this).addClass('active');
            }
        });
    });


});
