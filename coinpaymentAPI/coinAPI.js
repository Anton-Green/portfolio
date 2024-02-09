function loadCoinInfo() {
    $.ajax({
        url: 'get_basic_information.php',
        type: 'GET',
        dataType: 'html',
        success: function (response) {
            $('#accountInfo').html(response);
        },
        error: function (xhr) {
            console.error(xhr.responseText);
        }
    });
}

if (window.location.pathname === '/html/coinPayment.html') {
    loadCoinInfo();
}