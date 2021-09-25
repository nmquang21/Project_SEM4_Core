var handlerVerifyUser, loginForm;
CHECK_USERNAME_URL_CUSTOM = 'http://localhost:8017/checkuserexists'
$(document).ready(function () {
    $(loginForm.validateModel);
    let n = "ontouchstart" in window ? "touchstart" : "click";
    $("#login-form").on(n, ".icons-hidden", loginForm.showPassword);
    $("#login-form").on(n, ".icons-show", loginForm.hiddenPassword);
    $("#login-form").on(n, ".button-show", loginForm.showHiddenPassword);
    $("#Password").focus(loginForm.checkPasswordFocus);
    $("#Username").focus(loginForm.checkUsernameFocus);
    $("#Captcha").focusin(loginForm.checkCaptchaFocus);
    $("#Code").focusin(loginForm.checkCodeFocus);
    $("#label-Username").click(loginForm.labelOnclick);
    $("#label-Password").click(loginForm.labelOnclick);
    $("#label-Captcha").click(loginForm.labelOnclick);
    $("#label-Code").click(loginForm.labelOnclick);
    $("#Username").focusin(loginForm.inputFocus);
    $("#Password").focusin(loginForm.inputFocus);
    $("#Captcha").focusin(loginForm.inputFocus);
    $("#Code").focusin(loginForm.inputFocus);
    $("#Username").blur(loginForm.inputBlur);
    $("#Password").blur(loginForm.inputBlur);
    $("#Captcha").blur(loginForm.inputBlur);
    $("#Code").blur(loginForm.inputBlur)

    $('#login').on('click', function () {
        let username = $("#Username").val(),
            password = $("#Password").val();
        if (!username || !password) {
            $('.login-error2 ').show();
        }
        else {
            $.ajax({
                method: "POST",
                url: "http://localhost:8017/login",
                data: { username, password }
            })
                .done(function (data) {
                    if (data.status === 'Pending') {
                        showToast('Tài khoản đang chờ xác thực, vui lòng xác thực tài khoản để tiếp tục', 'info');
                    }
                    else if (data.status === 'Block') {
                        showToast('Tài khoản đang bị khóa, vui lòng liên hệ để được hỗ trợ','error');
                    }
                    else if (data.status === 'fail') {
                        showToast('Sai tên đăng nhập hoặc mật khẩu','error');
                    }
                    else if (data.status === 'Active') {
                        setCookie('x-access-token', data.accessToken,1)
                        location.href = `http://localhost:1999`
                    }
                });

        }
    })
    if(getParameterByName('verify_status') === '1'){
        showToast('Xác thực tài khoản thành công, vui lòng đăng nhập để tiếp tục','info')
    }
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
setCookie = (name,value,days)=>  {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
showToast = (text, type) => {
    $.toast({
        heading: 'Thông báo',
        text: text,
        showHideTransition: 'slide',
        position: 'top-right',
        icon: type
    })
}
loginForm = {

    labelOnclick: function () {
        $("#" + this.id.substring(6)).is(":focus") || $("#" + this.id.substring(6)).focus()
    },
    inputBlur: function () {
        $("#" + this.id + "-form").removeClass("active");
        $("#" + this.id).val() || ($("#" + this.id).removeClass("transFocus"),
            $("#label-" + this.id).removeClass("trans"))
    },
    inputFocus: function () {
        $("#" + this.id + "-form").addClass("active");
        $("#label-" + this.id).addClass("trans");
        $("#" + this.id).addClass("transFocus")
    },
    checkInputBlur: function () {
        var n = $("#" + this.id).val();
        $("#" + this.id + "-form").removeClass("active");
        n === "" ? ($("." + this.id + "-border").addClass("border-error"),
            $("#" + this.id + "-form label#" + this.id + "-error.error").removeAttr("hidden"),
            $("#" + this.id + "-error").css("display", "inline-block"),
            $("#" + this.id + "-error").html(""),
            this.id === "Username" ? $("#" + this.id + "-error").append('<img src="../../img/icons/startbooks/icon_waning.svg" /> ' + lang.UsernameRequired) : this.id === "Password" ? $("#" + this.id + "-error").append('<img src="../../img/icons/startbooks/icon_waning.svg" /> ' + lang.PasswordRequired) : this.id === "Captcha" ? $("#" + this.id + "-error").append('<img src="../../img/icons/startbooks/icon_waning.svg" /> ' + lang.CaptchaRequired) : $("#" + this.id + "-error").append('<img src="../../img/icons/startbooks/icon_waning.svg" /> ' + lang.CodeRequired)) : ($("." + this.id + "-border").removeClass("border-error"),
                $("#" + this.id + "-form label#" + this.id + "-error.error").attr("hidden"))
    },
    checkUsernameFocus: function () {
        $("#Username-form").addClass("active");
        $('.login-error2 ').hide();
    },
    checkPasswordFocus: function () {
        $("#Password-form").addClass("active");
        $('.login-error2 ').hide();
    },
    showHiddenPassword: function () {
        $(".icon-hidden").is(":visible") ? ($(".icon-hidden").hide(),
            $(".icon-show").show(),
            $("#Password").attr("type", "text")) : ($(".icon-hidden").show(),
                $(".icon-show").hide(),
                $("#Password").attr("type", "password"))
    },
    showPassword: function (n) {
        return n.preventDefault(),
            n.stopPropagation(),
            $(this).removeClass("icons-hidden"),
            $(this).parent().find("#Password").attr("type", "text"),
            !1
    },
    hiddenPassword: function (n) {
        return n.preventDefault(),
            n.stopPropagation(),
            $(this).addClass("icons-hidden"),
            $(this).parent().find("#Password").attr("type", "password"),
            !1
    },
    validateModel: function () {
        $("#login-form").validate({
            rules: {
                Username: {
                    required: !0
                },
                Password: {
                    required: !0
                },
                Captcha: {
                    required: !0
                },
                Code: {
                    required: !0
                }
            },
            messages: {
                Username: {
                    required: '<img src="/images/icon_waning.svg" /> ' + lang.UsernameRequired
                },
                Password: {
                    required: '<img src="/images/icon_waning.svg" /> ' + lang.PasswordRequired
                },
                Captcha: {
                    required: '<img src="/images/icon_waning.svg" /> ' + lang.CaptchaRequired
                },
                Code: {
                    required: '<img src="/images/icon_waning.svg" /> ' + lang.CodeRequired
                }
            },
            highlight: function (n) {
                n.id == "Password" ? $(".Password-border").addClass("border-error") : $(n).addClass("border-error");
                n.id == "Username" ? $(".Username-border").addClass("border-error") : $(n).addClass("border-error");
                n.id == "Captcha" ? $(".Captcha-border").addClass("border-error") : $(n).addClass("border-error");
                n.id == "Code" ? $(".Code-border").addClass("border-error") : $(n).addClass("border-error");
                $(".login-error").html("");
                $(".login-error").removeClass("show");
                $(".error-msg-summary").html("");
                $(".error-msg-summary").hide()
            },
            unhighlight: function (n) {
                n.id == "Password" ? $(".Password-border").removeClass("border-error") : $(n).removeClass("border-error");
                n.id == "Username" ? $(".Username-border").removeClass("border-error") : $(n).removeClass("border-error");
                n.id == "Captcha" ? $(".Captcha-border").removeClass("border-error") : $(n).removeClass("border-error");
                n.id == "Code" ? $(".Code-border").removeClass("border-error") : $(n).removeClass("border-error")
            },
            invalidHandler: function () { },
            submitHandler: function (n) {
                n.submit()
            }
        })
    }
};

