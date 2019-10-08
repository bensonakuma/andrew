jQuery(document).ready(function ($) {
  send_data_url();
    $(".black-friday-banner .close-banner").click(function () {
        $('.black-friday-banner').hide();
    });
    if (window.location.href.indexOf("#signup") != -1) {
        if ($('#logged_user').val() == 0) {
            $('.signup-btn').addClass('active');
            $('.login-btn').removeClass('active');
            $("#form_next_signup").text('Sign Up');
            $("#form_next_signup").data('type', 'signup');
            $('#order_section_header').text('SIGN UP FOR FREE');
            $(".social_login-btn .soc_fb").text('Sign up with Facebook');
            $(".social_login-btn .soc_gg").text('Sign up with Google');
            $('#login_link_client').data('type', 'login').text('Already Registered?');
        }
    }
     $('#logout_client').click(function () {
        if ($(this).data('chat') && $(this).data('chat') == 1) {
            Intercom('shutdown');
        }
    });
    $("#email_form").keypress(function (e) {
        if (e.keyCode == 13) {
            $('#password_form').focus();
            return false;
        }
    });
    $("#password_form").keypress(function (e) {
        if (e.keyCode == 13) {
            $('#form_next_signup').focus().click();
            return false;
        }
    });
    $("#login_mail_forgot").keypress(function (e) {
        if (e.keyCode == 13) {
            $('#forget_btn').focus().click(); 
            return false;
        }
    });
    $('#login_link_client').click(function () {
        if ($(this).data('type') == 'forgot') {
            $('.login_inner,#login-popup').show();
            $(".login_inner").hide();
            $('#login_mail_forgot,#forget_btn,#login_back,#forget_btn,.forgot_inner').show();
            $('#login_mail_forgot').focus();
        } else {
            $('.login-btn').addClass('active');
            $('.signup-btn').removeClass('active');
            $("#form_next_signup").text('Log In');
            $("#form_next_signup").data('type', 'login');
            $('#order_section_header').text('LOG IN TO YOUR ACCOUNT');
            $(".social_login-btn .soc_fb").text('Log in with Facebook');
            $(".social_login-btn .soc_gg").text('Log in with Google');
            $('#login_link_client').data('type', 'forgot').text('Forgot Password?');
        }
        return false;
    });
    $('.login_close,.close-forgot').click(function () {
        $('#login-popup,.txt_forgot_send,.close-forgot').hide();
    });
    $("#forget_btn").click(function () {
        var email = $('#login_mail_forgot').val();
        if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$/i.test(email) || email == '') {
            $('#login_mail_forgot').addClass('err-input').focus();
            return false;
        }
        var data = {email: email};
        $('#forget_btn,#login_back,#forget_btn').hide();
        $('.loader-forgot').show();
        $.post(window.location.origin + "/forgot", data, function (responce) {
            if (responce) {
                if (responce == 1) {
                    $('#login_mail_forgot,.loader-forgot').hide();
                    $('#login_mail_forgot').val('');
                    $('.txt_forgot_send').text('We sent you a notification, please check your email!').show();
                    $('.close-forgot').show();
                    setTimeout(function () {
                        $('.close-forgot').click();
                    }, 4000);
                } else {
                    $('#forget_btn,#login_back,#forget_btn').show();
                    $('#login_mail_forgot').addClass('err-input');
                }
            } else {
                $('#forget_btn,#login_back,#forget_btn').show();
                $('#login_mail_forgot').addClass('err-input');
            }
            $('.loader-forgot').hide();
        });
        return false;
    });
    $("#form_next_signup").click(function () {
        $('#username').css('color', '#000');
        $('#password').css('color', '#000');
        $('.err-reg').hide();
        if ($(this).data('type') == 'login') {
            login_user();
            return false;
        }
        var email = $("#email_form").val().trim();
        var pass = $("#password_form").val().trim();

        //var data = {'uname': email, 'upass': pass, 'signup': 1};
	var data = {'uname': email, 'upass': pass, 'signup': 1, 'key_wpg':$("#key_wpg").val(), 'sub_id':$("#sub_id").val()};

        if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$/i.test(email) || email == '') {
            $("#email_form").addClass('err-input');
            $("#email_form").focus();
            return false;
        }
        if (pass == '') {
            $("#password_form").addClass('err-input');
            $("#password_form").focus();
            return false;
        }
        $("#form_next_signup,#login_link_client").hide();
        $('.img-loader-form').show();
        if (email != '' && pass != '') {
            $.post(window.location.origin + "/user", data, function (responce) {
                if (responce) {
                    var obj = $.parseJSON(responce);
                    if (obj.auth == 1) {
                        window.location.href = window.location.origin + '/user/dashboard';
                    } else {
                        if (obj.id_current_member == -1) {
                            $('.signup-btn').removeClass('active');
                            $('.login-btn').addClass('active');
                            $("#form_next_signup").text('Log In');
                            $("#form_next_signup").data('type', 'login');
                            $('.err-reg').show();
                        }
                        $("#form_next_signup").show();
                        $('.img-loader-form').hide();
                        $("#password_form").focus();
                    }
                }
                /*
                 $("#form_next_signup").show();
                 $('.img-loader-form').hide();
                 */
            });
        }
    });
    $("#btn_login_google").click(function () {
        handleSignInClick();
    });
});

function login_user() {
    var email = $("#email_form").val();
    var data = {username: email, password: $("#password_form").val(), order_page: '1'};
    if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$/i.test(email) || email == '') {
        $('#email_form').addClass('err-input');
        $("#email_form").focus();
        return false;
    }
    if ($("#password_form").val() == '') {
        $('#password_form').addClass('err-input');
        $('#password_form').focus();
        return false;
    }
    if (data.username.trim() != '') {
        $("#form_next_signup,#login_link_client").hide();
        $('.img-loader-form').show();
        $.post(window.location.origin + "/user", data, function (responce) {
            if (responce) {
                var obj = $.parseJSON(responce);
                if (obj.auth == 1) {
                    window.location.href = window.location.origin + '/user/dashboard';
                    /*
                     $('#user_name').text(obj.member);
                     $("#no_logged,.login-form-content-wrp").hide();
                     $('#logged_in,#user_logged').show();
                     $('#logged_user').val(1);
                     */
                } else {
                    $('#email_form').css('color', 'red');
                    $('#password_form').css('color', 'red');
                    $("#form_next_signup,#login_link_client").show();
                    $("#email_form").focus();
                }
            }
            $('.img-loader-form').hide();
        });

    }
}
/*----- FB JS SDK -----*/
//add event listener to login button
document.getElementById('btn_login_facebook').addEventListener('click', function () {
    //do the login
    FB.login(function (response) {
        if (response.authResponse) {
            //user just authorized your app
            //document.getElementById('btnLoginFb').style.display = 'none';
            fb_api_call();
        }
    }, {scope: 'email,public_profile', return_scopes: true});
}, false);
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
        fb_api_call();
    }
}
function fb_api_call() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=name,email,first_name', function (response) {
        social_acc(response, 'facebook');
        console.log(response);
        console.log('Successful login for: ' + response.name + '--' + response.id + '--' + response.email + '--' + response.location + '--' + response.birthday);
    });
}
/*-----Google JS SDK -----*/
function HandleGoogleApiLibrary() {// Called when Google Javascript API Javascript is loaded
    gapi.load('client:auth2', {// Load "client" & "auth2" libraries
        callback: function () {
            gapi.client.init({// Initialize client & auth libraries
                apiKey: 'VrSxfccCkpeVdECRyN7-ZFpU',
                clientId: '594053869467-0ugc05abundk0u9gm7gr4p1c45cm8osd.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me'
            }).then(
                    function (success) {// Libraries are initialized successfully
                        //  var ttt = gapi.auth2.getAuthInstance().isSignedIn.get();
                        if (ttt == true) {
                            //alert(ttt);
                        }
                        // You can now make API calls
                    },
                    function (error) {// Error occurred
                        // console.log(error) to find the reason
                    }
            );
        },
        onerror: function () {
            // Failed to load libraries
        }
    });
}
function handleSignInClick() {
    gapi.auth2.getAuthInstance().signIn().then(// API call for Google login
            function (success) {// Login API call is successful	
                gapi.client.request({path: 'https://www.googleapis.com/plus/v1/people/me'}).then(// Make an API call to the People API, and print the user's given name.
                        function (success) {// API call is successful
                            var user_info = JSON.parse(success.body);// user profile information
                            social_acc(user_info, 'google');
                            console.log(user_info);
                        },
                        function (error) {// Error occurred
                            // console.log(error) to find the reason
                        }
                );
            },
            function (error) {// Error occurred
                // console.log(error) to find the reason
            }
    );
}
function social_acc(social_data, type) {
    var data = {'social': social_data, 'type': type};
    $("#form_next_signup").hide();
    $('.img-loader-form').show();
    jQuery.post("/api_member/customer_accesses_social", data, function (responce) {
        if (responce) {
            var obj = $.parseJSON(responce);
            if (obj.user_auth == 1) {
                window.location.href = window.location.origin + '/user/dashboard';
                /*
                 $('#user_name').text(obj.user_name);
                 $("#no_logged,.login-form-content-wrp,.signup.action-btn,.login-o-form,.signup-o-form").hide();
                 $('.btn-next1,#logged_in,#user_logged').show();
                 $('#logged_user').val(1);
                 */
            } else {
                $('.err_email_acc').text('Oops, something went wrong. Please try another method.').show();
            }
        }
    });
}
function send_data_url() {
    var data = {'url_site': window.location.href, 'url_referrer': document.referrer};
    $.post(window.location.origin + "/api_url/send_url_data", data, function (responce) {
    });
}