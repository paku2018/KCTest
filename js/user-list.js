let currentIdx = 0
let perPage = 5

$(document).ready(function () {
    getUsers()
})

function getUsers() {
    $.ajax({
        url: "/users.php?start=" + currentIdx + "&perpage=" + perPage,
        method: "GET",
        success: function (response) {
            let result = JSON.parse(response)
            if (result.status) {
                $('body').removeClass('d-none')

                if (result.total_count == 0){
                    $('.list-table').addClass("d-none")
                    $('.no-data').removeClass("d-none")
                }else {
                    $('#t_users').html(generateList(result.data))
                    $('.pagination-box').html(generatePagination(result.total_count))

                    $('.list-table').removeClass("d-none")
                    $('.no-data').addClass("d-none")
                }
            }else {
                location.href = "/index.html"
            }
        },
        error: function () {
            alert("Server Error")
        }
    })
}

function generateList(data) {
    let len = data.length;
    let code = '<tbody>'

    for (let i = 0; i < len; i++) {
        code += '<tr>\n' +
            '                            <td></td>\n' +
            '                            <td>\n' +
            '                                <div class="d-flex">\n' +
            '                                    <i class="fa fa-check-circle text-success" style="font-size: 1.5rem"></i>\n' +
            '                                    <div class="ms-3 text-left">\n' +
            '                                        <h5 class="text-left mb-0">' + data[i].nickname + '</h5>\n' +
            '                                        <p class="text-left mb-0">' + data[i].fullname + '</p>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </td>\n' +
            '                            <td>Default group</td>\n' +
            '                        </tr>'
    }

    code += '</tbody>'

    return code
}

function generatePagination(totalCount) {
    let code = '<nav>\n' +
        '<ul class="pagination justify-content-center">\n';

    let maxPage = parseInt(totalCount / perPage)
    if(totalCount > maxPage * perPage) {
        maxPage++
    }

    let active = ""
    for (let i = 1; i <= maxPage; i++){
        if(currentIdx == perPage * (i-1)){
            active = "active"
        }else {
            active = ""
        }
        code += '<li class="page-item ' + active + '"><a class="page-link page-index" href="javascript:;" data-index="' + i + '">' + i + '</a></li>'
    }

    if(currentIdx < perPage * (maxPage - 1)) {
        code += '<li class="page-item">\n' +
            '                                <a class="page-link page-next" href="javascript:;">Next>></a>\n' +
            '                            </li>'
    }

    code += '</ul>\n' +
        '</nav>'

    return code
}

$(document).on('click', '.page-index', function () {
    let page = $(this).data('index')
    currentIdx = perPage * (parseInt(page) - 1)
    getUsers()
})

$(document).on('click', '.page-next', function () {
    let page = $(this).data('index')
    currentIdx += perPage
    getUsers()
})

function logout() {
    $.ajax({
        url: "/auth.php",
        method: "DELETE",
        success: function (response) {
            location.href = "/index.html"
        },
        error: function () {
            alert("Server Error")
        }
    })
}