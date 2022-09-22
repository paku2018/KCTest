$(document).on('click', '.btn-login', function (e) {
    let username = $('#username').val()
    let password = $('#password').val()

    if (!username) {
        alert("Input username")
        return;
    }
    if (!password) {
        alert("Input password")
        return;
    }

    let remember = $('#remember').is(':checked') ? 1 : 0

    $.ajax({
        url: "/auth.php",
        method: "POST",
        data: {
            username: username,
            password: password,
            remember: remember
        },
        success: function (response) {
            let result = JSON.parse(response)
            if (result.status) {
                if (result.success) {
                    location.href = "/users.html"
                }else {
                    $('#message').html(result.msg)
                    $('#message').removeClass('d-none')
                }
            }else {
                alert("Cannot login")
            }
        },
        error: function () {
            alert("Server Error")
        }
    })
})

function hideAlert() {
    $('#message').addClass('d-none')
}