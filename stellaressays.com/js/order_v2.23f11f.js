var payment_err = {
    '3.00': 'Payment error.<br>Your account was not debited for the service.<br>Card is blocked for the Internet payments. Contact support of your bank to unblock your card or use another card.',
    '3.02': 'Payment error.<br>Your account was not debited for the service.<br>Not enough funds for payment on the card. Please try to use another card or choose another payment method.',
    '2.06': 'Payment error.<br>Your account was not debited for the service.<br>CVV code is wrong. CVV code is the last three digits on the back of the card. Please, try again.',
    '2.08': 'Payment error.<br>Your account was not debited for the service.<br>Card number is wrong. Enter the card number exactly as it is written on your bank card.',
    '2.09': 'Payment error.<br>Funds for the service have not been withdrawn from your account.<br>This card has expired. Try using another card.'
};
var ac_level_hs = {
    '10800': 30.00,
    '28800': 24.00,
    '86400': 19.00,
    '172800': 16.00,
    '259200': 15.00,
    '432000': 14.00,
    '604800': 13.00,
    '864000': 11.00,
    '1209600': 9.00
};
var ac_level_rs = {
    '10800': 35.00,
    '28800': 26.00,
    '86400': 20.00,
    '172800': 17.00,
    '259200': 16.00,
    '432000': 15.00,
    '604800': 14.00,
    '864000': 12.00,
    '1209600': 10.00
};
var ac_level_un = {
    '10800': 39.00,
    '28800': 29.00,
    '86400': 21.00,
    '172800': 18.00,
    '259200': 17.00,
    '432000': 16.00,
    '604800': 15.00,
    '864000': 13.00,
    '1209600': 11.00
};
var ac_level_ms = {
    '10800': 49.00,
    '28800': 41.00,
    '86400': 29.00,
    '172800': 26.00,
    '259200': 24.00,
    '432000': 22.00,
    '604800': 20.00,
    '864000': 17.00,
    '1209600': 14.00
};
var ac_level_ph = {
    '10800': 0.01,//59.00
    '28800': 48.00,
    '86400': 40.00,
    '172800': 34.00,
    '259200': 30.00,
    '432000': 29.00,
    '604800': 27.00,
    '864000': 23.00,
    '1209600': 19.00
};

if (!Object.entries)
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };

var kf_level = {'1': 0.65, '2': 0.70, '3': 0.75, '4': 0.80, '5': 0.85};

jQuery(document).ready(function ($) {
    $('.tabs_slider-wrapper').css('display', 'flex');
    $('.img-loader-form.main-loader').css('display', 'none');

    $('.cc_close_info,.action-info-btn,.cc_info .btn_term,.cc_close_info a').click(function () {
        $('.cc_info').hide();
        var data ={};
        $.post(window.location.origin + "/api_member/info_cookie_close", data, function (responce) { });
        return true;
    });
    $('.radio-checkbox-btn').click(function(){
        var sp = ($(this).hasClass('left')) ? 1 : 2;
        $(this).addClass('on');
        $('.radio-checkbox-btn').not(this).removeClass('on');
        $('#spacing').val(sp);
        $('#sidebar_spacing').html('('+ $(this).text() +')');
    });
    send_data_url();
    $('.mob').click(function (e) {
        e.preventDefault();
        $('header nav').slideToggle();
    });

    if ($('#logged_user').length > 0 && $('#logged_user').val() == 1) {
        slide_next(1);
    }
     $('.logout').click(function () {
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
    // TAB PAGINATION
    $('.signup-tab_btn,.signup-o-form,.login-o-form').click(function () {
        let btn = ($(this).hasClass('login-btn') || $(this).hasClass('login-o-form')) ? 'login' : 'registration';
        chk_btn_login(btn);
        return false;
    });

    function chk_btn_login(btn){
        if (btn == 'login') {
            $('.login-btn').addClass('active');
            $('.signup-btn').removeClass('active');
            $("#form_next_signup").text('Log In');
            $("#form_next_signup").data('type', 'login');
            $("#tab-1-title").text('Log In');
            $(".login-signup-text .title").text('Don’t have an account?');
            $(".login-signup-text span").not(".title").text('Register now and get access to your personal control panel');
            $('#login_link_client').data('type', 'forgot').text('Forgot Password?');
        } else {
            $('.signup-btn').addClass('active');
            $('.login-btn').removeClass('active');
            $("#form_next_signup").text('Sign Up');
            $("#form_next_signup").data('type', 'signup');
            $("#tab-1-title").text('Registration');
            $(".login-signup-text .title").text('Have an account?');
            $(".login-signup-text span").not(".title").text('Sign in to your personal control panel');
            $('#login_link_client').data('type', 'login').text('Already Registered?')
        }
    }


    $('#login_link_client').click(function (e) {
        e.preventDefault();
        if ($(this).data('type') == 'forgot') {
            $('.login_inner,#login-popup').show();
            $(".login_inner").hide();
            $('#login_mail_forgot,#forget_btn,#login_back,#forget_btn,.forgot_inner').show();
            return false;
        }
        if ($(this).data('type') == 'login') {
            $('.login-btn').addClass('active');
            $('.signup-btn').removeClass('active');
            $("#form_next_signup").text('Log In');
            $("#form_next_signup").data('type', 'login');
            $("#tab-1-title").text('Log In');
            $(".login-signup-text .title").text('Don’t have an account?');
            $(".login-signup-text span").not(".title").text('Register now and get access to your personal control panel');
            $('#login_link_client').data('type', 'forgot').text('Forgot Password?');
        }
    });
    if($('#pay_order_form').length){
        $('#num_charts,#num_slides,#sources').val(0);
        calcul_price();
    }
    $('#pay_order_form').on('click change keypress keyup', function (event) {
        calcul_price();
    });
    $("#topic_title").bind({
        focus: function () {
            if ($("#topic_title").val() == "Writer's choice") {
                $("#topic_title").val('');
            }
        },
        focusout: function () {
            if ($("#topic_title").val() == '') {
                $("#topic_title").val("Writer's choice");
            }
        }
    });
    $("#btn_login_google").click(function () {
        $("#form_next_signup,#login_link_client").hide();
        $('.img-loader-form.reg-loader').show();
        handleSignInClick();
    });
    $(".custom_select").click(function () {
        customOptionsBlock = $(this).find("ul.options");
        if (customOptionsBlock.hasClass('act')) {
            customOptionsBlock.hide();
        } else {
            customOptionsBlock.show();
        }
        $(this).find('.sel_input_search').focus();
        customOptionsBlock.toggleClass('act');
    });
    $(".custom_select ul.options li").click(function () {
        $('.custom_select ul.options li').removeClass('active');
        $(this).addClass('active');
        $(this).parent().parent().find('.sel_input_search').val($(this).text());
        $(this).parent().parent().find("input[type='hidden']").val($(this).attr("data-value"));
        if ($(this).parent().is('#paper_opt')) {
            $('#sidebar_type_paper').html($(this).text());
        }
    });
    $(".just_custom_select").click(function () {
        customOptionsBlock = $(this).find("ul.options");
        if (customOptionsBlock.hasClass('act')) {
            customOptionsBlock.hide();
        } else {
            customOptionsBlock.show();
        }
        if ($(this).parent().height() > 200) {
            $(this).parent().css('height', '200');
        } else {
            //if (search.length > 1) {
            $(this).parent().css('height', 'auto');
            //}
        }
        /*$('.just_custom_select').find("ul.options").css('height', '200');*/
        $(this).find('.sel-opt').focus();
        customOptionsBlock.toggleClass('act');
    });
    $(".just_custom_select ul.options li").click(function () {
        $(this).parent().find('li').removeClass('active');
        $(this).addClass('active');
        $(this).parent().parent().find('.sel-opt').text($(this).text());
        $(this).parent().parent().find("input[type='hidden']").val($(this).attr("data-value"));
        if ($(this).parent().is('#lvl_opt')) {
            $('#sidebar_level').html($(this).text());
        }
        if ($(this).parent().is('#deadline_opt')) {
            $('#sidebar_ddl').html($(this).text());
        }
    });
    $('.sel_input_search').on('input change keypress keyup', function () {
        var search = $(this).val().toLowerCase();
        var el = $(this).parent().parent();
        $(el).find("ul.options").show();
        $(el).find('li').each(function () {
            var str = $(this).text().toLowerCase();
            if (str.indexOf(search) + 1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        if ($(el).find("ul.options").height() > 200) {
            $(el).find("ul.options").css('height', '200');
        } else {
            if (search.length > 1) {
                $(el).find("ul.options").css('height', 'auto');
            }
        }
    });
    $(document).mouseup(function (e) {
        var div = $("ul.options  li");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $("ul.options").hide();
        }
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
       // var data = {'uname': email, 'upass': pass, 'signup': 1};
        var data = {'uname': email, 'upass': pass, 'signup': 1, 'key_wpg':$("#key_wpg").val(), 'sub_id':$("#sub_id").val(),'key_cpl': $("#key_cpl").val()};
        if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$/i.test(email) || email == '') {
            $("#email_form").addClass('err-input');
            return false;
        }
        if (pass == '') {
            $("#password_form").addClass('err-input');
            return false;
        }
        $("#form_next_signup,#login_link_client").hide();
        $('.img-loader-form.reg-loader').show();
        if (email != '' && pass != '') {
            $('#pp_email_cl').val(email);
            $.post(window.location.origin + "/user", data, function (responce) {
                if (responce) {
                    var obj = $.parseJSON(responce);
                    if (obj.auth == 1) {
                        slide_next(1);
                        $('#user_name').text('Customer');
                        $("#no_logged,.login-form-content-wrp,.signup.action-btn,.login-o-form,.signup-o-form,.login.action-btn").hide();
                        $('.btn-next1,#logged_in,#user_logged').show();
                        $('#logged_user').val(1);
                        $('#user_name').text(obj.member);
                        $('#new_lead').val(1).click();
                        check_id(obj.id);

                    } else {
                        if (obj.auth == -2) {
                            chk_btn_login('login');
                            $('.err-reg').show();
                        }
                    }
                }
                $("#form_next_signup").show();
                $('.img-loader-form.reg-loader').hide();
            });
        }
    });
    $('.min').click(function () {
        var min = $(this).parent().find('.count');
        if (parseInt(min.text()) > $(this).data('min')) {
            var count = parseInt(min.text()) - 1;
            min.text(count);
            $(this).parent().find('input').val(count);
            if ($(this).parent().find('input').is('#num_pages')) {
                $('#sidebar_pages').html(count);
            }
        }
    });
    $('.max').click(function () {
        var max = $(this).parent().find('.count');
        if (parseInt(max.text()) < $(this).data('max')) {
            var count = parseInt(max.text()) + 1;
            max.text(count);
            $(this).parent().find('input').val(count);
            if ($(this).parent().find('input').is('#num_pages')) {
                $('#sidebar_pages').html(count);
            }
        }
    });
    $("#customer_phone, #customer_name").click(function () {
        $(this).removeClass('err-input');
    });

    $("#place_free_inquiry").click(function () {
        if(verify_fields() == 1){
            return false;
        }
        if (parseInt($('#ptotal').val()) == 0) {
            $('#total_cost').css('color', 'red');
            return false;
        }
        $('#pay').val(0);
        $(".inquiry-place,.pays-place,.pp_label").hide();//Please hold on, processing your data...
        $('.pp-load,.loader-order').show();
        $('#pay_order_form').submit();
        return false;
    });
    $(".pay-credit-card, .icon-row a").click(function () {
        if(verify_fields() == 1){
            return false;
        }
        if (parseInt($('#ptotal').val()) == 0) {
            $('#total_cost').css('color', 'red');
            return false;
        }
        $('#pay').val(1);
        $(".inquiry-place,.pays-place,.pp_label").hide();//Please hold on, processing your data...
        $('.pp-load').show();
        new_pay_order();
        return false;
    });
    $('.close-pay-card').click(function () {
        $('#modal_pay_card').hide();
        document.location.href = window.location.origin + '/user/dashboard/'+$('#pay_card_order').val()+'/?pay=unpaid&p=co';
        //document.location.href = window.location.origin + '/user/orders';
    });
    $('.form-tab').on('click', function (e) {
        e.preventDefault();
        if ($('#logged_user').val() == 1) {
            var id = $(this).data('tab') - 1;
            var step = $('.tabs_content-wrp').width();
            var activeStep = $('#tab-' + (id + 1));
            $(".form-tab").removeClass("active");
            $('.tabs_content-wrp .tab.active').removeClass("active");
            $(this).addClass("active").removeClass("completed");
            $(this).nextAll().removeClass("completed");
            $(this).prevAll().addClass("completed");
            $(activeStep).prevAll().css('marginLeft',- step);
            $(activeStep).nextAll().css('marginLeft','0');
            $(activeStep).addClass('active').css('marginLeft','0');
            orderContainerHeight();
        } else {
            $('#email_form,#password_form').addClass('err-input');
        }
    });

    $('#email_form,#password_form').click(function () {
        $(this).removeClass('err-input');
    });
    $('.btn-next1').click(function () {
        slide_next(1);
    });
    $('.btn-next2').click(function () {
        slide_next(2);
    });
    $("#preffered_writer").keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
            (event.keyCode == 65 && event.ctrlKey === true) ||
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        } else {
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
    $("#preffered_writer").on('click change keypress keyup', function () {
        check_pref();
    });
    if ($('.discount_code').length) {
        $('.discount_code').onpropertychange = function () {
            if (event.propertyName == "value") check_discount();
        }
    }
    $(".discount_code").on('keypress keyup click', function () {
        check_discount();
    });
    $('.login_close,.close-forgot').click(function () {
        $('#login-popup,.txt_forgot_send,.close-forgot').hide();
    });
    $("#login_popup_btn").click(function () {
        var email = $('#login_mail').val().trim();
        var pass = $('#login_pass').val().trim();
        if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$/i.test(email) || email == '') {
            $('#login_mail').addClass('err-input');
            return false;
        }
        if (pass == '') {
            $("#login_pass").addClass('err-input');
            return false;
        }
        var data = {email: email, password: pass};
        $(this).hide();
        $('.loader-acc').show();
        $.post(window.location.origin + "/check_email", data, function (responce) {
            if (responce) {
                if (parseInt(responce) > 0) {
                    $('#form_login').submit();
                } else {
                    $("#login_popup_btn").show();
                    $('#login_mail').css('color', 'red');
                    $('#login_pass').css('color', 'red');
                }
            } else {
                $("#login_popup_btn").show();
            }
            $('.loader-acc').hide();
        });
        return false;
    });
    $("#login_pass,#login_mail").click(function () {
        $("#login_pass,#login_mail").removeClass('err-input');
    });

    $("#login_pass,#login_mail").click(function () {
        $("#login_pass,#login_mail").removeClass('err-input');
    });
    $("#login_forget").click(function () {
        $(".login_inner").hide();
        $('#login_mail_forgot,#forget_btn,#login_back,#forget_btn,.forgot_inner').show();
    });
    $("#login_back").click(function () {
        $(".login_inner").show();
        $(".forgot_inner").hide();
    });
    $("#forget_btn").click(function () {
        var email = $('#login_mail_forgot').val();
        if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$/i.test(email) || email == '') {
            $('#login_mail_forgot').addClass('err-input');
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

    $("#customer_phone").keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        } else {
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });

    $("#customer_phone").intlTelInput({
        preferredCountries: ['us', 'gb', 'ca', 'au'], defaultCountry: "auto", nationalMode: false
    });


    /*ToolTip*/
    top_opt = {
        position: {
            my: 'center left', // Position my top left...
            at: 'center right', // at the bottom right of...
        },
        style: {
            classes: 'qtip-bootstrap qtip-rounded',
            width: 200, // No set width
        }
    };
    opt2 = {
        position: {
            my: 'bottom center', // Position my top left...
            at: 'top center', // at the bottom right of...
        },
        style: {
            classes: 'qtip-bootstrap qtip-rounded',
            width: 200, // No set width
        }
    };
    if (window.screen.width > 650) {
        $('.qtip_advance').qtip($.extend({}, top_opt, {
            content: "By enabling this feature your order will be completed by an Advanced and/or Native English writer."
        }));
        $('.qtip_addittional').qtip($.extend({}, top_opt, {
            content: "By enabling this option your text will receive a professional proofreading and be edited by our U.S. editorial staff. This feature signifies your desire to receive a flawless paper, eliminating the slightest chance of mistakes."
        }));
        $('.qtip_digital').qtip($.extend({}, top_opt, {
            content: "You will receive articles in PDF, or access to the sources used online. Mind that in cases where books are used for orders you will not be provided with them in their entirety. However, you will receive the locations where the books are stored, either for viewing or purchasing."
        }));
        $('.qtip_plagiarism').qtip($.extend({}, top_opt, {
            content: "Get a plagiarism report to prove originality of your paper."
        }));

        $('.qtip_initial_draft').qtip($.extend({}, top_opt, {
            content: "Get a 30-50% draft of your paper to make sure you and the writer are on the same page."
        }));
        $('.qtip_one_page_summary').qtip($.extend({}, top_opt, {
            content: "Bullet-points of your paper in one double-spaced page."
        }));
        $('.qtip_extended_revision_period').qtip($.extend({}, top_opt, {
            content: "Extra 20 days of free alterations period."
        }));
        $('.qtip_vip_support').qtip($.extend({}, top_opt, {
            content: "Get calls and follow-ups from our support regarding the status of your order."
        }));

        $('.qtip_free-inq').qtip($.extend({}, top_opt, {
            content: "Get the confirmation from the writer first - pay for your order after!"
        }));
        $('.qtip_subs_inq').qtip($.extend({}, top_opt, {
            content: "Place an order as an inquiry to proceed with the course subscribtion."
        }));
        $('.qtip_edit_order').qtip($.extend({}, top_opt, {
            content: "Mind that you can only edit your order before payment."
        }));
        $('.qtip_num_page').qtip($.extend({}, top_opt, {
            content: "If you need slides, select pages in proportion 2 slides = 1 page"
        }));
        $('.qtip_form_np').qtip($.extend({}, opt2, {
            content: "If you need slides, select pages in proportion 2 slides = 1 page"
        }));

    }
    $(".qtip_pages_info button").click(function () {
        $('.qtip-npages').qtip({
            position: {
                my: 'bottom center', // Position my top left...
                at: 'top center', // at the bottom right of...
            },
            style: {
                classes: 'qtip-bootstrap qtip-rounded',
               // width: 250, // No set width
            },
            hide: {
                event: 'unfocus'
            },
            content: function(){
                var sps = ($('#spacing').val() == 1) ? 'Double spacing' : 'Single spacing'
                var count_words = parseInt($('#spacing').val())*275*parseInt($('#num_pages').val());
                var txt = sps+', '+count_words+ '&nbsp;words';
                return txt;
            },
        }).qtip('show');
    });
    if ($("div").is(".tabs_content-wrp")) {
        orderContainerHeight();
    }

});

function sel_height(el) {
    if ($(el).find("ul.options").height() > 200) {
        $(el).find("ul.options").css('height', '200');
    } else {
        if (search.length > 1) {
            $(el).find("ul.options").css('height', 'auto');
        }
    }
}

function check_pref() {
    if ($("#preffered_writer").val() == '') {
        $('#advanced_writer_client').val(0);
        $("#preffered_writer").css('color', '#333');
        calcul_price();
        return false;
    }
    var data = {preffered_writer: $("#preffered_writer").val()};
    if (data.preffered_writer != '') {
        $('.writer_loader').show();
        $.post(window.location.origin + "/check_writer", data, function (responce) {
            var obj = $.parseJSON(responce);
            if (obj.id > 0) {
                if (obj.advanced == 1) {
                    $('#advanced_writer_client').val(1);
                    $('#adv_wr').prop('checked', true);
                }
                $("#preffered_writer").css('color', '#21569A');
            } else {
                $("#preffered_writer").css('color', 'red');
                $("#pref_wr_error").show();
            }
            $('.writer_loader').hide();
            calcul_price();
        });
    } else {
        $("#preffered_writer").css('color', '#333');
    }
    calcul_price();
}

function view_dsc_life(discount,discount_order){
    if (discount_order > 0) {
        $('#info_dsc_code').html(discount_order+'% '+' ( code: '+$('.discount_code').val()+' )');
    }else{
        let dsc = (discount > 0) ? discount+'% (Lifetime)' : 'none';
        $('#info_dsc_code').html(dsc);
    }
}

function calcul_price() {
    var txt_discount = '';
    var space = $('#spacing').val();
    var ac_level = $("#academic_level").val();
    var pagesNum = $('#num_pages').val();
    var count_slides = $('#num_slides').val();
    var count_charts = $('#num_charts').val();
    var deadline = $('#deadline_period').val();
    var hours = parseInt($('#spinner_hours').val());
    var discount = parseInt($('#discount_order').val());
    var discount_order = parseInt($('#discount_one_code').val());
    var need_urgently = 0;
    var count_words = parseInt(space)*275*parseInt($('#num_pages').val());
    $('.count-words').html('('+count_words+ '&nbsp;words)');

    if(pagesNum >= 20) {
        $('#initial_draft').prop('checked', true);
        //$('#initial_draft').prop('disabled', true);
    } else {
        //$('#initial_draft').prop('disabled', false);
    }

    if (deadline == 0 || deadline == 'undefined') {
        need_urgently = 1;
        deadline = '86400';
    }
    var deadline_date = deadline;
    var currentPagePrice_tmp = (ac_level == '1') ? ac_level_hs[deadline] : 0;
    var currentPagePrice_tmp = (ac_level == '2') ? ac_level_rs[deadline] : currentPagePrice_tmp;
    var currentPagePrice_tmp = (ac_level == '3') ? ac_level_un[deadline] : currentPagePrice_tmp;
    var currentPagePrice_tmp = (ac_level == '4') ? ac_level_ms[deadline] : currentPagePrice_tmp;
    var currentPagePrice_tmp = (ac_level == '5') ? ac_level_ph[deadline] : currentPagePrice_tmp;
    var currentPagePrice = currentPagePrice_tmp;
    var advancedwriter = 1;


    advanced_master_phd(ac_level,pagesNum);
    
    if ($('#adv_wr').prop('checked') || $('#advanced_writer_client').val() == 1) {
        if ($('#advanced_writer_client').val() == 1) {
            $('#adv_wr').prop('checked', true);
        }
        advancedwriter = 1.25;
    }

    var addEditing = ($('#prof_editor').prop('checked')) ? 1.15 : 1;
    var sourceCopy = ($('#dig_copies').prop('checked')) ? 9.99 : 0;
    var plagiarism = ($('#plag_rep').prop('checked')) ? 7.99 : 0;
    var slides = (parseInt(count_slides) > 0) ? (currentPagePrice/2)*count_slides : 0;
    var charts = (parseInt(count_charts) > 0) ? (currentPagePrice/2)*count_charts : 0;

    var initialDraft = ($('#initial_draft').prop('checked')) ? 1.10 : 1;
    var onePageSummary = ($('#one_page_summary').prop('checked')) ? 17.99 : 0;
    var extendedRevisionPeriod = ($('#extended_revision_period').prop('checked')) ? 1.15 : 1;
    var vipSupport = ($('#vip_support').prop('checked')) ? 9.99 : 0;

    currentPagePrice = (space * currentPagePrice * pagesNum) + slides + charts;

    var total = ((currentPagePrice * addEditing * advancedwriter * initialDraft * extendedRevisionPeriod) + sourceCopy + plagiarism + onePageSummary + vipSupport).toFixed(2);

    var time_ms = new Date(parseInt(deadline_date * 1000 + Math.round(((new Date).getTime()))));
    var dtm = new Date(time_ms);
    var mm = '' + (dtm.getMonth() + 1);
    var dd = '' + dtm.getDate();
    var yy = dtm.getFullYear();
    var hh = dtm.getHours();
    var ii = dtm.getMinutes();
    var ss = dtm.getSeconds();
    if (mm.length < 2)
        mm = '0' + mm;
    if (dd.length < 2)
        dd = '0' + dd;
    if (hh.length < 2)
        hh = '0' + hh;
    if (ii.length < 2)
        ii = '0' + ii;
    if (ss.length < 2)
        ss = '0' + ss;
    var ddl_user = yy + "-" + mm + "-" + dd + " " + hh + ":" + ii + ":" + ss;
    $("#deadline").val(ddl_user);
    //var details = pagesNum + " pages x $" + currentPagePrice_tmp + txt_discount + " = <span>$" + summ_pages + "</span>";
    view_info_data();
    if(pagesNum == 0 && slides == 0 && charts == 0){
        total = '0.00';
        $('#total_cost').css('color', 'red');
        $('.select_btn-wrp.f-verify').addClass('decline');
    }else{
        $('.select_btn-wrp.f-verify').removeClass('decline');
        $('#total_cost').css('color', '');
    }
    view_info_total(total, discount, discount_order);
}

function view_info_total(price, discount, discount_order){
    $('#sidebar-price').html("$" + price);

    view_dsc_life(discount,discount_order);

    discount = (discount_order > 0) ? discount_order : discount;

    let total = (discount > 0) ? (price - (price * (discount / 100))).toFixed(2) : price;
    let txt_discount = (discount > 0) ? " / " + discount + "%" : '';

    $('#total_cost,#total_cost_unreg').html("$" + total);
    if(discount > 0){
        let econom = (price * (discount / 100)).toFixed(2);
        $('.order-info-discout-wrapper').removeClass('hidden-el');
        let txt_save = "<span id='sidebar-discount'>"+discount+"%</span>&nbsp;(you save&nbsp;$"+ econom+")";
        $('.info-discount-data p.green').html(txt_save);
    }else{
        $('.order-info-discout-wrapper').addClass('hidden-el');
    }
    $('#sidebar_total_cost').html("$"+total);
    $('#ptotal').val(total);
}
function view_info_data(){
    var arr = [];
    $('.extra-options-wrapper input').each(function(){
        if ($(this).prop('checked')) {
            let opt = $($(this)).next("label").text();
            arr.push(opt);
        }
    });
    view_el_info('#num_slides','slides');
    view_el_info('#num_charts','charts');
    view_el_info('#sources','sources');
    $('.info-pformat').text($('#paper_format').parent().find('.sel-opt').text());
    if(arr.length > 0){
        $('.info-ex-options').html(arr.join('<br>'));
        $('.ex-opt-data').show();
    }else{
        $('.ex-opt-data').hide();
        $('.info-ex-options').html('');
    }
}
function view_el_info(el,el1) {
    if($(el).val() > 0){
        $('.info-'+el1).text($(el).val());
        $('.'+el1+'-data').css('display','flex');
    }else{
        $('.'+el1+'-data').hide();
    }
}
function advanced_master_phd(ac_level,page){
    if(page > 15 && (ac_level == 4 || ac_level == 5)){
        $('#adv_wr').prop('checked', true);
    }else{
        if($('#preffered_writer').val() == ''){
            $('#advanced_writer_client').val(0);
        }
    }
}

function slide_next(id) {
    var step = $('.tabs_content-wrp').width();
    var activeStep = $('#tab-' + (id + 1));
    $('.form-tab, .tabs_content-wrp .tab.active').removeClass("active");
    $(activeStep).prevAll().css('marginLeft',- step);
    $(activeStep).addClass('active').css('marginLeft','0').nextAll().css('marginLeft','0');
    $('.form-tab[data-tab = ' + (id + 1) + ']').addClass('active');
    $('.form-tab[data-tab = ' + (id + 1) + ']').prevAll().addClass('completed');
    orderContainerHeight();
   // check_discount();
}

// order slider height
function orderContainerHeight() {
    let activeTabHeight = $('.tabs_content-wrp .tab.active .content-height').height();
    let containerHeight = $('.tabs_content-wrp').height();
    let newContainerHeight = containerHeight - (containerHeight - activeTabHeight);
    $('.tabs_content-wrp').height(newContainerHeight + 'px');
}

function pp_complete(id_pp, id_tr_pp, user_ip) {
    var data = {
        'order_id': $("#order_id").val(),
        'price': $('#ptotal').val(),
        'id_pp': id_pp,
        'id_tr_pp': id_tr_pp,
        'user_ip': user_ip
    };
    $("#paypal-button-container,#place_free_inquiry,.pp_label").hide();//Please hold on, processing your data...
    $('.pp-load').show();
    jQuery.post("/api_member/check_pp_order", data, function (responce) {
        window.location.href = window.location.origin + '/user/dashboard/'+$("#order_id").val()+'/?pay=success&p=pp';
        //return responce;
    });
}

function login_user() {
    var email = $("#email_form").val();
    var data = {username: email, password: $("#password_form").val(), order_page: '1'};
    if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$/i.test(email) || email == '') {
        $('#email_form').addClass('err-input');
        return false;
    }
    if ($("#password_form").val() == '') {
        $('#password_form').addClass('err-input');
        return false;
    }
    if (data.username.trim() != '') {
        $("#form_next_signup,#login_link_client").hide();
        $('.img-loader-form.reg-loader').show();
        $.post(window.location.origin + "/user", data, function (responce) {
            if (responce) {
                var obj = $.parseJSON(responce);
                if (obj.auth == 1) {
                    if (obj.register == 2) {
                        $(".unregister-total,.unregister-pp_label.pp_label,.signup.action-btn,.login-o-form,.signup-o-form,.login.action-btn").hide();
                        $(".paym-col-wrp .right-col").addClass("register-user");
                        $(".register-total,.register-select-set").show();
                    }
                    if(obj.discount > 0){
                        $('#discount_code_order').val(obj.discount);
                        $('#discount_order').val(obj.discount);
                    }
                    if(obj.phone != ''){
                        $('.f-phone').hide();
                    }
                    if(obj.member != 'Customer' && obj.phone != ''){
                        $('.f-customer').hide();
                    }
                    var member_name = obj.member.substring(0, 5)+'...';
                    if($('.f-customer').is(':visible')){
                        $('#customer_name').val(obj.member);
                    }
                    $('#user_name').text(member_name);
                    if (window.screen.width < 480) {
                        $('a.logo-unsigned,img.max,.user-btn-mob').hide();
                        $('a.logo-signed,img.min').show();
                    }
                    calcul_price();
                    slide_next(1);
                    $("#no_logged,.login-form-content-wrp").hide();
                    $('.btn-next1,#logged_in,#user_logged').show();
                    $('#logged_user').val(1);
                } else {
                    $('#email_form').css('color', 'red');
                    $('#password_form').css('color', 'red');
                    $("#form_next_signup").show();
                    $('.img-loader-form.reg-loader').hide();
                }
            }
            $('.img-loader-form.reg-loader').hide();
        });
    }

    $('#drop').on('dragover dragenter', function() {
        $(this).addClass('is-dragover');
    })
    .on('dragleave dragend drop', function() {
        $(this).removeClass('is-dragover');
    })
}

function social_acc(social_data, type) {
    var data = {'social': social_data, 'type': type};
    jQuery.post("/api_member/customer_accesses_social", data, function (responce) {
        if (responce) {
            var obj = $.parseJSON(responce);
            if (obj.user_auth == 1) {
                if(obj.phone != ''){
                    $('.f-phone').hide();
                }
                if(obj.user_name != 'Customer' && obj.phone != ''){
                    $('.f-customer').hide();
                }
                if($('.f-customer').is(':visible')){
                    $('#customer_name').val(obj.user_name);
                }
                if(obj.user_reg == 1){
                    $('#new_lead').val(1).click();
                }
                $('#user_name').text(obj.user_name);
                $("#no_logged,.login-form-content-wrp,.signup.action-btn,.login-o-form,.signup-o-form,.login.action-btn").hide();
                $('.btn-next1,#logged_in,#user_logged').show();
                $('#logged_user').val(1);
                slide_next(1);
                $('.img-loader-form.reg-loader').hide();
            } else {
                $('.err_email_acc').text('Oops, something went wrong. Please try another method.').show();
            }
        }
    });
}



/*----- FB JS SDK -----*/
//add event listener to login button
document.getElementById('btn_login_facebook').addEventListener('click', function () {
    //do the login
    $("#form_next_signup,#login_link_client").hide();
    $('.img-loader-form.reg-loader').show();
    FB.login(function (response) {
        if (response.authResponse) {
            //user just authorized your app
            //document.getElementById('btnLoginFb').style.display = 'none';
            fb_api_call();
        }else{
            $("#form_next_signup,#login_link_client").show();
            $('.img-loader-form.reg-loader').hide();
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
                    /*
                     * var chek = gapi.auth2.getAuthInstance().isSignedIn.get();
                     if (check == true) {
                     }
                     */
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
                    $("#form_next_signup,#login_link_client").show();
                    $('.img-loader-form.reg-loader').hide();
                }
            );
        },
        function (error) {// Error occurred
            $("#form_next_signup,#login_link_client").show();
            $('.img-loader-form.reg-loader').hide();
            // console.log(error) to find the reason
        }
    );
}

function verify_fields(){
    var err = 0;
    if($('#customer_phone').is(":visible") && $('#customer_phone').val() == ''){
        $('#customer_phone').addClass('err-input');
        err = 1;
    }
    if($('#customer_name').is(":visible") && ($('#customer_name').val() == '' || $('#customer_name').val() == 'Customer')){
        $('#customer_name').addClass('err-input');
        err = 1;
    }
    return err;
}

/*---- PayPal Client --------*/
paypal.Button.render({
     //env: 'sandbox', // sandbox | production
    env: 'production', // sandbox | production
    style: {
        //layout: 'vertical',
        fundingicons: true,
        label: 'paypal',
        size: 'responsive',
        shape: 'rect',
        color: 'gold',
        tagline: false
    },
    funding: {
        //allowed: [paypal.FUNDING.CARD],
        disallowed: [paypal.FUNDING.CREDIT]
    },
    commit: true, // Show the buyer a 'Pay Now' button in the checkout flow
    //payment() is called when the button is clicked
    payment: function () {
        if(verify_fields() == 1){
            return false;
        }
        $('#check_paypal').val(1);
        $('#check_paypal').click();
        var CREATE_URL = window.location.origin + '/api_paypal/check_payment';// Set up a url on your server to create the payment
        var data = {};
        var x = 0;
        /*
        var formData = new FormData($('#pay_order_form')[0]);
        for (var [key, value] of formData.entries()) {
            if (key == 'new_files[]') {
                data['new_files[' + x + ']'] = value;
                x = x + 1;
            } else {
                data[key] = value;
            }
        }
*/
        var form_str = $('#pay_order_form').serializeArray();
        for (var i = 0; i < form_str.length; i++) {
            if (form_str[i].name == 'new_files[]') {
                data['new_files[' + x + ']'] = form_str[i].value;
                x = x + 1;
            } else {
                data[form_str[i].name] = form_str[i].value;
            }
        }
        return paypal.request.post(CREATE_URL, data)// Make a call to your server to set up the payment
            .then(function (res) {
                var order_id = (res.order_id) ? res.order_id : 0;
                var success_order = (res.firstorder == 1) ? 'firstpay=success' : 'pay=success';
                var url_return = window.location.origin + '/user/dashboard/' + order_id + '?order_id=' + order_id + '&' + success_order+'&p=pp';
                $("#order_id").val(order_id);
                $("#pp_return").val(url_return);
                return res.id;
            });
    },
    onAuthorize: function (data, actions) {// onAuthorize() is called when the buyer approves the payment
        var EXECUTE_URL = window.location.origin + '/api_paypal/check_execute';// Set up a url on your server to execute the payment
        var data = {// Set up the data you need to pass to your server
            paymentID: data.paymentID,
            payerID: data.payerID
        };
        // Make a call to your server to execute the payment
        return paypal.request.post(EXECUTE_URL, data)
            .then(function (res) {
                pp_complete(data.payerID, res.id, res.ip);
            });
    },
    onCancel: function (data, actions) {
        //window.location.href = window.location.origin + '/user/dashboard';
        document.location.href = window.location.origin + '/user/dashboard/'+$("#order_id").val()+'/?pay=unpaid&p=pp';
    },
    onError: function (data, actions) {
        //document.location.href = window.location.origin + '/user/dashboard/'+$("#order_id").val()+'/?pay=decline&p=pp';
    },
}, '#paypal-button-container');

/*-------------------------------*/

function check_discount() {
    var dsc = $(".discount_code");
    if (dsc.val().length == 5 && $(".prc_view").html() == '') {
        console.log(dsc.val().length);
        var data = {code: dsc.val()};
        $('.prc_loader').show();
        $.post(window.location.origin + "/check_dcode", data, function (responce) {
            var obj = $.parseJSON(responce);
            $('.prc_loader').hide();
            if (obj.id > 0) {
                $(".prc_view").html(obj.discount + "%").show();
                dsc.removeClass('dsc_decline').addClass('dsc_ok');
                $("#discount_code_order").val(obj.discount);
                $("#discount_one_code").val(obj.discount);
            } else {
                $("#discount_code_order").val('0');
                $("#discount_one_code").val('0');
                dsc.removeClass('dsc_ok').addClass('dsc_decline');
            }
            calcul_price();
        });
    }
    if (dsc.val().length < 5) {
        dsc.removeClass('dsc_ok').removeClass('dsc_decline');
        $(".prc_view").html("");
        $("#discount_code_order").val('0');
        $("#discount_one_code").val('0');
    }
    calcul_price();
}

function GetURLParameter(s_param) {
    var param_name = 0;
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == s_param) {
            param_name = sParameterName[1];
        }
    }
    return param_name;
}

function send_data_url() {
    var data = {'url_site': window.location.href, 'url_referrer': document.referrer};
    $.post(window.location.origin + "/api_url/send_url_data", data, function (responce) {
    });
}

window.addEventListener('message', function (msg) {
    var orderInformation;
    var order = $('#pay_card_order').val();
    if(order.indexOf('/') != -1){
        arr_order =  order.split('/');
        order = arr_order[0];
    }
    $('#pay_loader_img').hide();
    if (msg.data.type === 'orderStatus') {
        orderInformation = msg.data.response.order;
        if (msg.data.response.order.status == 'declined') {
            err = $('#p_err').val();
            $('#p_err').val(parseInt(err)+1);
            var error = msg.data.response.order.error;
            var txt_err = (payment_err[error]) ? payment_err[error] : payment_err['3.00'];
            $('#pay_card_err').html(txt_err);
            $('#pay_card_err').show();
            if($('#p_err').val() > 2){
                setTimeout(function () {
                    document.location.href = window.location.origin + '/user/dashboard/'+order+'/?pay=decline&p=so';
                }, 2000);
            }else{
                get_payment_card_token(order,$('#ptotal').val());
            }
        }
        if (msg.data.response.order.status == 'approved') {
            $('#modal_pay_card, #pay_card_err').hide();
            //document.location.href = '/user/order/'+order;
            document.location.href = window.location.origin + '/user/dashboard/'+order+'/?pay=success&p=so';
        }
    }
}, false);

function get_payment_card_token(order_id,total_amount) {
    var data = {'order_id': order_id};
    $('.pay_order_info').html("Order #" + order_id);
    $('.pay_price_info').html("$" + total_amount);
    $('#pay_card_order').val(order_id);
    $('#pay_loader_img').show();
    $('#payment_iframe_data').attr('src', '');
    $.post(window.location.origin + "/api_paypal/new_payment_form", data, function (responce) {
        if (responce) {
            var obj = jQuery.parseJSON(responce);
            if (obj.pay_form.token) {
                $('#payment_iframe_data').attr('src', 'https://pay.signedpay.com/api/v1/purchase/' + obj.pay_form.token);
                $('#modal_pay_card').show();
                $('.pp-load').hide();
            } else {
                alert('Error Token');
            }
        } else {
            alert('Error Server');
        }
    });
}
function new_pay_order() {
    var fd = $('#pay_order_form').serializeArray();
    jQuery.post("/api_paypal/check_payment_card", fd, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj && obj.order_id > 0) {
            get_payment_card_token(obj.order_id, $('#ptotal').val());
        } else {
           window.location.href = window.location.origin + '/user/dashboard';
        }
    });
}
var fsPassedParameters = {
    "fs_aff_source": "",
    "fs_product_id": "11",
    "fs_product_name": "ExtraEssay",
    "fs_transaction_id": ""
};
function check_id(id) {
    fsPassedParameters = {
        "fs_aff_source": document.getElementById('key_cpl').value,
        "fs_product_id": "11",
        "fs_product_name": "ExtraEssay",
        "fs_transaction_id": id
    }
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://fstrk.net/api/tracker/89f03f7d02720160f1b04cf5b27f5ccb/conversion.js";
    document.head.appendChild(script);
}