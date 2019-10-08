$(function () {
    send_data_url();
    $(".black-friday-banner .close-banner").click(function () {
        $('.black-friday-banner').hide();
    });
    $('.user-btn-mob,.mob-login').click(function () {
        window.location.href = '/login';
    });
    $('#logout_client').click(function () {
        if ($(this).data('chat') && $(this).data('chat') == 1) {
            Intercom('shutdown');
        }
    });
    $('.cc_close_info,.action-info-btn,.cc_info .btn_term,.cc_close_info a').click(function () {
        $('.cc_info').hide();
        var data = {};
        $.post(window.location.origin + "/api_member/info_cookie_close", data, function (responce) {
        });
        return true;
    });
    $('.tabs li a').click(function (e) {
        e.preventDefault();

        var $tabs = $(this).closest('.tabs'),
            $li = $(this).parent(),
            id = $li.data('id'),
            $container = $tabs.siblings('.content');

        $tabs.find('.active').removeClass('active');
        $container.find('.active').removeClass('active');

        $li.addClass('active');
        $container.find('.tab.' + id).addClass('active');
    });

    if ($('.styler').length > 0) {
        $(".scroll").mCustomScrollbar({scrollButtons: {enable: true}, setHeight: 300});
        $('.styler').styler({
            onFormStyled: function () {
                $(".jq-selectbox__dropdown ul").mCustomScrollbar({
                    advanced: {updateOnContentResize: true},
                    autoDraggerLength: false,
                    scrollButtons: {enable: true}
                });
            }
        });
    }
    if ($('.showmore-list').length) {
        $('.more-works').click(function () {
            if ($('.showmore-list-item.hiddenitem').length <= 3) {
                $('.more-works').hide();
            }
            $('.showmore-list-item.hiddenitem:lt(3)').fadeIn().css({display: 'flex'}).removeClass('hiddenitem');
        });

    }
    if ($('.showmore-actlist').length) {
        $('.more-works').click(function () {
            if ($('.show-active.hiddenitem').length <= 3) {
                $('.more-works').hide();
            }
            $('.show-active.hiddenitem:lt(3)').fadeIn().removeClass('hiddenitem');
        });
    }

    if ($('.showmore-noactlist').length) {
        $('.more-nworks').click(function () {
            if ($('.show-noactive.hiddenitem').length <= 3) {
                $('.more-nworks').hide();
            }
            $('.show-noactive.hiddenitem:lt(3)').fadeIn().removeClass('hiddenitem');
        });
    }
    $('.mob').click(function (e) {
        e.preventDefault();
        $('header nav').slideToggle();
    });
    $('.accordion li').click(function () {
        $(this).find('.accordion__content').slideToggle().parent().toggleClass('open');
    });
    $(".go-subs").click(function () {
        var err = 0;
        $('#page-subscribe input').each(function () {
            if ($(this).val() != '') {
                $(this).removeClass('empty_field');
            } else {
                err = 1;
                $(this).addClass('empty_field');
            }
        });
        var r = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if (!r.test($("#email_sub").val())) {
            $('#email_sub').css('color', 'red');
            $('#email_sub').addClass('empty_field');
            return false;
        }
        if (err == 1) {
            return false;
        }
        $('.view-form-sub').fadeOut();
        $('.sbbtn').fadeOut();
        $('.thank-subs').html('Thank you greatly for filling up the form.<br> Your application will now be thoroughly checked by our project manager, so please stay in touch and check your email for the updates! ').fadeIn();
        var data = $('#page-subscribe').serialize();
        $.post('/api_member/new_subs', data, function (res) {
            $('#page-subscribe').trigger('reset');
            if (res == 1) {
                $('#page-subscribe').trigger('reset');
            }
        });
        return false;
    });
    $("button.sbbtn").click(function () {
        //$('.view-form-sub').fadeToggle("slow");
        return false;
    });
    $('a, button, input').click(function () {
        if ($(this).is("[data-href]")) {
            window.location.href = $(this).data('href');
            return false;
        }
    });

    $(".main_select").click(function () {
        let customOptionsBlock = $(this).find("ul.select_options");
        $(".main_select ul.select_options").not(customOptionsBlock).removeClass('act').hide();
        if (customOptionsBlock.hasClass('act')) {
            customOptionsBlock.hide();
        } else {
            customOptionsBlock.show();
        }
        customOptionsBlock.toggleClass('act');
    });
    $(".main_select ul.select_options li").click(function () {
        $(this).parent().find(' li').removeClass('active');
        $(this).addClass('active');
        $(this).parent().parent().find('.sel-opt').text($(this).text());
        $(this).parent().parent().find("input[type='hidden']").val($(this).attr("data-value"));
    });
    $(document).mouseup(function (e) {
        let div = $(".main_select");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $("ul.select_options").hide();
            if ($("ul.select_options").hasClass('act')) {
                $("ul.select_options").removeClass('act');
            }
        }

        if (window.screen.width > 840) {
            let samplesFilter = $(".content__feedback .filter-wrapper .dropdown");
            if (!samplesFilter.is(e.target) && samplesFilter.has(e.target).length === 0) {
                $(samplesFilter).find('.content').hide();
                if ($(".sample-dropdown .sample-select").hasClass('on')) {
                    $(".sample-dropdown .sample-select").removeClass('on');
                }
            }
        }
    });
    if (window.screen.width > 840) {
        $('.sample-dropdown').click(function () {
            let sampleSelect = $(this).find('.sample-select');
            $('.sample-dropdown .sample-select').not(sampleSelect).removeClass('on').next().hide();

            if ($(sampleSelect).hasClass('on')) {
                $(sampleSelect).next().fadeOut();
            } else {
                $(sampleSelect).next().fadeIn();
            }
            $(sampleSelect).toggleClass('on');
        });
    }
    $('.content__feedback .dropdown ul li').click(function () {
        let text = $(this).text();
        $('#ac_level_filter,#discipline_filter').hide();
        $('ul li').removeClass('active');
        $('#ac_level_form,#discipline_form').val('');
        $('#' + $(this).parent().data('type')).val(text);
        view_samples();
        let filterType = $(this).closest('.dropdown').attr('filter-data');
        let parent = $(this).closest('.dropdown').find('ul li');
        $(parent).not(this).removeClass('active');
        $(this).addClass('active');
        $('#' + filterType).show().html(text);
    });
    $('.filter-sample-type').click(function () {
        let id = $(this).attr('id');
        let el = $('[filter-data="' + id + '"]');
        $('#' + $(this).data('type')).val('');
        view_samples();
        el.find('ul li').removeClass('active');
        $(this).hide();
    });
    $('.sample-filter-mob-btn').click(function () {
        $(this).toggleClass('on');
        $('.content__feedback .dropdown-wrapper').slideToggle();
    });
    $('#close-filter-mob').click(function () {
        $('.sample-filter-mob-btn').toggleClass('on');
        $('.content__feedback .dropdown-wrapper').slideToggle();
    });

    var hiwSlider = document.querySelector('#hiw-slider');
    if (hiwSlider) {
        let slider = tns({
            container: hiwSlider,
            items: 1,
            lazyload: true,
            mouseDrag: false,
            loop: false,
            speed: 700,
            autoplay: false,
            navAsThumbnails: true,
            autoplayTimeout: 2500,
            autoplayButtonOutput: false,
            controlsContainer: '#hiw-slider-arrow',
        });

        let info = slider.getInfo();

        sliderNav(info);  
    }

    if (window.screen.width > 1024 && $('section.page_content').height() > 700) {
        window.addEventListener('scroll', scrollCalc);
    }

    if ($('#samples-list').length) {// SAMPLES
        send_request_json("/api_pages/get_samples", 'samples', {});
    }

    function view_samples() {
        let formData = new FormData(document.forms.filter_form);
        send_request_json("/api_pages/get_samples", 'samples', formData);
    }

    function send_request_json(url,type,data) {
        if (!!url) {
            var request = new XMLHttpRequest();
            request.open('POST', url, true);
            request.onreadystatechange = function () {
                if (this.readyState != 4) return;
                var dataJSON = JSON.parse(this.responseText);
                set_data_type(type, dataJSON);
            };
            request.send(data);
        }
    }

    function set_data_type(type, dataJSON) {
        if (type == 'samples') {
            obj_sapmles = dataJSON;
            if (dataJSON.length < 4) {
                $('.more-works').hide();
            } else {
                $('.more-works').show();
            }
            $('.res-samples').text(dataJSON.length+' results')
            $('#samples-list').html('');
            dataJSON.forEach(buildSamplesList);
        }
    }



    function buildSamplesList(item, index) {
        var listItemString = $('#template-samples-item').html();
        var listItem = (index <= 2)
            ? $('<li class="flex-item showmore-list-item">' + listItemString + '</li>')
            : $('<li class="flex-item showmore-list-item hiddenitem">' + listItemString + '</li>');
        var listItemTitle = $(listItem).find('.title');
        var listItemRate = $(listItem).find('.item-rate');
        var listItemRateStar = $(listItem).find('.rate-wrapper .rate');
        var listItemTypePaper = $(listItem).find('.type-paper');
        var listItemPages = $(listItem).find('.pages');
        var listItemAcLevel = $(listItem).find('.ac-level');
        var listItemDiscipline = $(listItem).find('.discipline');

        listItemTitle.html(item.title);
        listItemRate.text(item.rate + "/10");
        listItemRateStar.addClass('rate-' + item.rate);
        listItemTypePaper.html(item.type_paper);
        listItemPages.html(item.page);
        listItemAcLevel.html(item.ac_level);
        listItemDiscipline.html(item.discipline);

        $('#samples-list').append(listItem);
    }


});
var obj_sapmles = {};
function test_data_samples(){
    console.log(obj_sapmles.length);
}

var sliderNav = function sliderNav(info) {
    var text = [
        "Submit your instructions",
        "Calculate the price",
        "Complete the safe payment",
        "Get your paper done"
    ]

    var dots = info.navItems;

    for (var i = 0; i < dots.length; i++) {
        dots[i].innerHTML = '0' + (i + 1) + '<span class="small">'+text[i]+'</span>';
    }
}

function send_data_url() {
    var data = {'url_site': window.location.href, 'url_referrer': document.referrer};
    $.post(window.location.origin + "/api_url/send_url_data", data, function (responce) {
    });
}

var month = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// $('#calc-prices-data, #calc-prices-data input.styler').on('click change', function(e){
$('#calc-prices-data').on('click change', function () {
    var pagesNum = $('#num_pages').val();
    var currentPagePrice = $(this).find('.tab.active').find('.jq-radio.styler.checked').parent().children('.price').children('span').text();

    calcul_price_data(pagesNum, currentPagePrice);
});

function usertimeView(time_ms) {
    var dtm = new Date(time_ms);
    var mm = '' + month[dtm.getMonth()];
    var dd = '' + dtm.getDate();
    var hh = dtm.getHours();
    var ii = dtm.getMinutes();
    var ss = dtm.getSeconds();
    var ampm = hh >= 12 ? 'PM' : 'AM';
    if (parseInt(mm) < 10) mm = '0' + mm;
    if (parseInt(dd) < 10) dd = '0' + dd;
    hh = hh % 12;
    hh = hh ? hh : 12; // the hour '0' should be '12'
    ii = ii < 10 ? '0' + ii : ii;
    hh = hh < 10 ? '0' + hh : hh;
    var strTime = hh + ':' + ii + ' ' + ampm;
    var ddl_user = mm + " " + dd + " " + " " + strTime;
    return ddl_user;
}

function calcul_price_data(pagesNum, currentPagePrice) {
    var ddl = $("div.active fieldset").find("div.checked").nextAll("h4").data("days") / 1000;
    var ac_level = $("ul li.active a").data('levelid');
    var mob_calc_ = $("#mob_calc_").val();
    var time_ms = new Date(parseInt(ddl * 1000 + Math.round(new Date().getTime())));
    var ddl_user = usertimeView(time_ms);

    if (mob_calc_ == '1') {
        ac_level = $("#ac_level_m :selected").val();
        ddl = $("#place_ddl_m :selected").val();
        var tt = ddl * 1000;
        var currentPagePrice = $("div.tab-" + ac_level + " fieldset").find("h4[ data-days='" + tt + "']").nextAll(".price").find("span").filter(':first').text();
    }

    var advancedwriter = 1;
    if ($('#advancedwriter').prop('checked')) {
        advancedwriter = 1.25;
    }
    var addEditing = 1;
    if ($('#addediting').prop('checked')) {
        addEditing = 1.15;
    }
    var sourceCopy = 0;
    if ($('#sourcecopy').prop('checked')) {
        sourceCopy = 9.99;
    }

    total = ((pagesNum * currentPagePrice * addEditing * advancedwriter) + sourceCopy).toFixed(2);

    $('#deadline-time').text(ddl_user);
    $('#total_price_form').text('$' + total);
    $('#calc_order_price').val(total);
    $('#deadline_order_price').val(ddl);
    $('#calc_ac_lev').val(ac_level);

}

$('#place_order, #calc').on('click change keypress keyup', function (event) {
    place_calcul(0);
});

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
    '10800': 59.00,
    '28800': 48.00,
    '86400': 40.00,
    '172800': 34.00,
    '259200': 30.00,
    '432000': 29.00,
    '604800': 27.00,
    '864000': 23.00,
    '1209600': 19.00
};

function place_calcul(tp) {
    var tp = (tp > 0) ? tp : '';
    var ac_level = $("#academic_level" + tp).val();
    var deadline = $("#place_ddl" + tp).val();
    if (ac_level == '1') {
        var currentPagePrice = ac_level_hs[deadline]
    }
    if (ac_level == '2') {
        var currentPagePrice = ac_level_rs[deadline];
    }
    if (ac_level == '3') {
        var currentPagePrice = ac_level_un[deadline]
    }
    if (ac_level == '4') {
        var currentPagePrice = ac_level_ms[deadline]
    }
    if (ac_level == '5') {
        var currentPagePrice = ac_level_ph[deadline]
    }
    var pagesNum = $('#place_pages' + tp).val();
    var total = pagesNum * currentPagePrice;
    $('#price' + tp).text('$' + total);
}

var slideCalc = $('.right-sidebar + .widgets-area .calc');
var browserEdge = document.documentMode || /Edge/.test(navigator.userAgent);

function scrollCalc() {
    if (window.pageYOffset > $('header.fixed').height()) {
        if (!slideCalc.hasClass('fixed')) {
            slideCalc.addClass('fixed');
        }
        
        if (browserEdge) {
            slideCalc.css({'position':'fixed','top': '40px'});

            let heightCalc = slideCalc.height();
            let docHeight = $('header + *').height();

            if ((docHeight - window.pageYOffset) <= heightCalc) {
                let topPos = (docHeight - window.pageYOffset) - heightCalc;
                slideCalc.css({'top': topPos});
            }
        }
    } else {
        if (slideCalc.hasClass('fixed')) {
            slideCalc.removeClass('fixed');
            if (browserEdge) { 
                slideCalc.css({'position': 'static'});
            }
        }
    }
}

$('.min').click(function () {
    var min = $(this).parent().find('.count');
    if (parseInt(min.text()) > $(this).data('min')) {
        var count = parseInt(min.text()) - 1;
        min.text(count);
        $(this).parent().find('input').val(count);
    }
});
$('.max').click(function () {
    var max = $(this).parent().find('.count');
    if (parseInt(max.text()) < $(this).data('max')) {
        var count = parseInt(max.text()) + 1;
        max.text(count);
        $(this).parent().find('input').val(count);
    }
});

$('.cht-open').click(function () {
    Intercom('show');
});

