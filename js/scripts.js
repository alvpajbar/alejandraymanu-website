$(document).ready(function () {

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function () {
        $('.wp5').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function () {
        $('.wp6').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });

    /***************** Nav Transformicon ******************/

    $('.nav-toggle').click(function () {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        event.preventDefault();
    });

    $('.header-nav li a').click(function () {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');
    });

    /***************** Header BG Scroll ******************/

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 20) {
            $('section.navigation').addClass('fixed');
            $('header').css({
                "border-bottom": "none",
                "padding": "35px 0"
            });
            $('header .member-actions').css({ "top": "26px" });
            $('header .navicon').css({ "top": "34px" });
        } else {
            $('section.navigation').removeClass('fixed');
            $('header').css({
                "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
                "padding": "50px 0"
            });
            $('header .member-actions').css({ "top": "41px" });
            $('header .navicon').css({ "top": "48px" });
        }
    });

    /***************** Smooth Scrolling ******************/

    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 90
                }, 2000);
                return false;
            }
        }
    });

    /***************** Add to Calendar ******************/

    var config = window.WEDDING_CONFIG;

    var myCalendar = createCalendar({
        options: {
            class: '',
            id: ''
        },
        data: {
            title: config.calendar.title,
            start: new Date(config.calendar.start),
            end: new Date(config.calendar.end),
            address: config.calendar.address,
            description: config.calendar.description
        }
    });

    $('#add-to-cal').html(myCalendar);

    /***************** RSVP ******************/

    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();

        $('#alert-wrapper').html(alert_markup('info', '<strong>¡Un momento!</strong> Estamos guardando tu información.'));

        // fetch con no-cors porque Apps Script responde con 302 a googleusercontent.com
        // y el navegador bloquea leer la respuesta. El POST sí llega al servidor.
        fetch(config.rsvpEndpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data
        })
        .then(function () {
            $('#alert-wrapper').html('');
            $('#rsvp-modal').modal('show');
        })
        .catch(function (err) {
            console.log(err);
            $('#alert-wrapper').html(alert_markup('danger', '<strong>¡Lo sentimos!</strong> Hay algún problema con el servidor. '));
        });
    });

});

function alert_markup(alert_type, msg) {
    return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
}
