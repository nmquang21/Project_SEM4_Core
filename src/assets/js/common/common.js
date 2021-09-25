$(document).ready(function () {
    $('#btn-logout').on('click', function () {
        setCookie('x-access-token', '', 0);
        location.href = `http://localhost:1999`
    });
});

setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}