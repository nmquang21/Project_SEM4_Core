$(document).ready(function () {
    var $LastName = $('#LastName');
    var $FirstName = $('#FirstName');
    var $Email = $('#Email');
    var $Username = $('#Username');
    var $Password = $('#Password');

    $('#btnRegister').on('click', function () {
        if (!$LastName.val() || !$FirstName.val() || !$Email.val() || !$Username.val() || !$Password.val()) {
            $('.login-error2 ').show();
        }
        else {
            $('.login-error2 ').hide();
            $.ajax({
                method: "POST",
                url: "http://localhost:8017/register",
                data: {
                    firstname: $FirstName.val(),
                    lastname: $LastName.val(),
                    username: $Email.val(),
                    password: $Password.val(),
                    email: $Email.val(),
                }
            })
                .done(function (data) {
                    debugger
                    if (data.status === 'SUCCESS'){
                        location.href = '/active_account'
                    }
                    else{
                        showToast('Có lỗi xảy ra!','error')
                    }
                });
        }
    });




});
showToast = (text, type) => {
    $.toast({
        heading: 'Thông báo',
        text: text,
        showHideTransition: 'slide',
        position: 'top-right',
        icon: type
    })
}