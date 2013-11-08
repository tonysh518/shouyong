require.config({
    paths: {
        jquery: './jquery-1.8.3.min',
        skrollr: './skrollr.min',
        scrollto: './scrollTo.min',
        bxslider: './jquery.bxslider',
        fancybox: './jquery.fancybox.pack',
        easing: './jquery.easing.1.3',
        hoverIntent: './jquery.hoverIntent.min',
        queryLoader: './jquery.queryloader22',
        cloudzoom: './cloudzoom/cloudzoom',
        waypoints: './waypoint'
    },
    shim: {
        mousewheel: { deps: ['jquery'] },
        scrollto: { deps: ['jquery'] },
        bxslider: { deps: ['jquery'] },
        fancybox: { deps: ['jquery'] },
        easing: { deps: ['jquery'] },
        hoverIntent: { deps: ['jquery'] },
        queryLoader: { deps: ['jquery'] },
        cloudzoom: { deps: ['jquery'] },
        waypoints: { deps: ['jquery'] }
    }
});

require(['jquery','skrollr','scrollto','bxslider','fancybox','easing','hoverIntent','queryLoader','waypoints','cloudzoom'], function ($) {
    'use strict';
    /** INITIALISER **/
    init();
    function init() {

        var isIe6 = $.browser.msie && $.browser.version == 6;
        var isIe7 = $.browser.msie && $.browser.version == 7;
        if(!(isIe6 || isIe7)) {
            var s = skrollr.init({ forceHeight: false, smoothScrolling:false });
        }


        // Init controls
        initHomeControls();
        initMenuControls();
        initGalleryControls();
        initAnimation();

        preLoad();

        // Bind window resize
        $(window).resize(windowResize);
        $(window).trigger('resize');
    }

    function preLoad() {
        $(document.body).queryLoader2({
            onLoading : function( percentage ){
                var per = parseInt(percentage);
                $('.loading-percentage').html(per+'%');
                $('.loading-bar').css({'width':per+'%'});
            },
            onComplete : function(){
                $('.loading-wrap').fadeOut();
            }
        });
    }

    function initHomeControls() {
        var bxSlider = $('.home_slider').bxSlider({
            useCSS: false,
            auto: true,
            mode: 'fade',
            speed: 1000,
            responsive:true
        });

        $('.nav a').click(function(e) {
            e.preventDefault();
            $(window).scrollTo($(this).attr('href'),500,'easeInOutQuart');
        });

        $('.down').click(function(){
            $(window).scrollTo('#menu',500,'easeInOutQuart');
        });

        $('#home .readmore').fancybox({
            padding:10,
            prevSpeed: 400,
            nextSpeed: 800,
            openMethod : 'dropIn',
            closeMethod : 'dropOut',
            nextEffect: 'fade',
            prevEffect: 'fade',
            nextEasing: 'easeInOutQuart',
            prevEasing: 'easeInQuart',
            maxWidth: '90%',
            maxHeight: '90%'
        });
    }

    function initMenuControls() {
        var bxSlider = $('.menu_list_bxslider').bxSlider({
            minSlides: 2,
            maxSlides: 2,
            slideWidth: 339,
            useCSS: false,
            slideMargin: 90,
            responsive:true,
            onSliderLoad: function(){
                $('#menu .menu_list li').css('opacity',0);
            }
        });

        $('.menu_list_bxslider li').click(function(event){
            if(event.clientX < $(window).width()*0.25){
                bxSlider.goToPrevSlide();
            }
            if(event.clientX > $(window).width()*0.75){
                bxSlider.goToNextSlide();
            }
        }).hoverIntent(function(){
                $(this).animate({'opacity':0.5});
            },function(){
                $(this).animate({'opacity':1});
            });

        $('.menu_arrow_left').click(function() {
            bxSlider.goToPrevSlide();
        });

        $('.menu_arrow_right').click(function() {
            bxSlider.goToNextSlide();
        });

        $('.menu_list_bxslider li a').click(function(event){
           //event.preventDefault();
        });

        $('.menu_list_bxslider li a').fancybox({
            padding:10,
            prevSpeed: 400,
            nextSpeed: 800,
            openMethod : 'dropIn',
            closeMethod : 'dropOut',
            nextEffect: 'fade',
            prevEffect: 'fade',
            nextEasing: 'easeInOutQuart',
            prevEasing: 'easeInQuart',
            maxWidth: '90%',
            maxHeight: '90%',
            afterShow: function(){
                var src = $('.fancybox-image').attr('src');
                $('.fancybox-image').addClass('cloudzoom').attr("data-cloudzoom", "zoomImage: '"+src+"'");
                $('.fancybox-image').CloudZoom({zoomPosition:'inside',zoomOffsetX:0});
            },
            beforeClose: function(){
                $('.cloudzoom-zoom-inside,.cloudzoom-blank').remove();
                $('.fancybox-image').unbind().die();
            }
        });
    }

    function initGalleryControls() {
//
//        var switchEffect = 'horizontal';
//        if(isIe6) {
//            switchEffect = 'fade';
//        }

        var bxSlider = $('.gallery_slider').bxSlider({
            useCSS: false,
            auto: true,
            easing: 'easeInOutQuart',
            //mode: switchEffect,
            speed: 1000,
            responsive:true,
            pagerCustom: '#gallery_slider_pager',
            onSliderLoad: function() {
                resizeGalleryHeight();
            }
        });

        $('#gallery').hoverIntent(function(){
            $('#gallery_slider_pager').css({opacity:0,display:'block'}).animate({'bottom':0,'opacity':1});
        },function(){
            $('#gallery_slider_pager').animate({'bottom':-110,'opacity':0});
        });

        $('.gallery_arrow_left').click(function() {
            bxSlider.goToPrevSlide();
        });

        $('.gallery_arrow_right').click(function() {
            bxSlider.goToNextSlide();
        });
    }

    function initAnimation() {
        $('#menu').waypoint(function() {
            $('#menu .menu_list li').each(function(index,obj){
                $(obj).delay(index*300).animate({opacity:1},1000);
            });
        }, { offset: '70%'});

        $('#aboutus').waypoint(function(direction) {
            if(direction === 'down') {
                $('#aboutus').css('zIndex',1);
            }
            else
            {
                $('#aboutus').css('zIndex',0);
            }
        }, { offset: '100%' });

        $('#aboutus .intro h2').hide();
        $('#aboutus .intro div').hide();
        $('#aboutus .intro p').hide();
        $('#aboutus').waypoint(function() {
            $('#aboutus .intro h2').fadeIn();
            $('#aboutus .intro div').delay(600).fadeIn();
            $('#aboutus .intro p').delay(1200).fadeIn();
        }, { offset: '70%' });

//        $('#menu').waypoint(function(direction) {
//            if(direction === 'down') {
//                $('.menu_wrap').css('position','fixed');
//            }
//            else
//            {
//                $('.menu_wrap').css('position','absolute');
//            }
//        });

//        $('#aboutus').waypoint(function(direction) {
//            if(direction === 'down') {
//                $('.aboutus_wrap').css('position','fixed');
//            }
//            else
//            {
//                $('.aboutus_wrap').css('position','absolute');
//            }
//        });

//        $('#gallery').waypoint(function(direction) {
//            if(direction === 'down') {
//                $('#contact').css('zIndex',2);
//                $('.contact_wrap').css('position','fixed');
//            }
//            else
//            {
//                $('#contact').css('zIndex',0);
//                $('.contact_wrap').css('position','absolute');
//            }
//        }, { offset: function() {
//            return $(window).height() - $('#gallery').height();
//        } });
    }


    function windowResize() {
        // re-align the down icon
        var downTop = $(window).height() - 120;
        if(downTop > 655) {
            downTop = 655;
        }
        $('.down').css({top:downTop});
        resizeGalleryHeight();
    }

    function resizeGalleryHeight() {
        var height = $('#gallery .bx-viewport').height() + 174; // gallery height + title height
        $('#gallery,.gallery_wrap').height(height);
    }


    (function ($, F) {
        F.transitions.dropIn = function() {
            var endPos = F._getPosition(true);
            endPos.opacity = 0;
            endPos.top = (parseInt(endPos.top, 10) - 400);

            F.wrap.css(endPos).show().animate({
                top: endPos.top + 400,
                opacity: 1
            }, {
                easing: 'easeOutQuart',
                duration: 800,
                complete: F._afterZoomIn
            });
        };

        F.transitions.dropOut = function() {
            F.wrap.removeClass('fancybox-opened').animate({
                top: '-=200',
                opacity: 0
            }, {
                easing: 'easeInQuart',
                duration: 600,
                complete: F._afterZoomOut
            });
        };



    }(jQuery, jQuery.fancybox));
});