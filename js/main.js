require.config({
    paths: {
        jquery: './jquery-1.8.3.min',
        skrollr: './skrollr.min',
        scrollto: './scrollTo.min',
        bxslider: './jquery.bxslider',
        fancybox: './jquery.fancybox.pack',
        easing: './jquery.easing.1.3',
        waypoints: './waypoint'
    },
    shim: {
        mousewheel: { deps: ['jquery'] },
        scrollto: { deps: ['jquery'] },
        bxslider: { deps: ['jquery'] },
        fancybox: { deps: ['jquery'] },
        easing: { deps: ['jquery'] },
        waypoints: { deps: ['jquery'] }
    }
});

require(['jquery','skrollr','scrollto','bxslider','fancybox','easing','waypoints'], function ($) {
    'use strict';

    /** INITIALISER **/
    init();
    function init() {
        if(!$('html').is('.oldie')) {
            // Fantastic plugin for parallax and animation
            // https://github.com/Prinzhorn/skrollr
            var s = skrollr.init({ forceHeight: false, smoothScrolling:false });
        } else {
            $('html').removeClass('js');
            $('html').addClass('no-js');
        }



        // Init controls
        initHomeControls();
        initMenuControls();
        initGalleryControls();
        initAnimation();

        // Bind window resize
        $(window).resize(windowResize);
        $(window).trigger('resize');
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
            if(event.clientX < $(window).width()/2){
                bxSlider.goToPrevSlide();
            }
            else {
                bxSlider.goToNextSlide();
            }
        });

        $('.menu_list_bxslider li a').click(function(event){
           //event.preventDefault();
        });

        $('.menu_list_bxslider li a').fancybox({
            padding:0,
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

    function initGalleryControls() {
        var bxSlider = $('.gallery_slider').bxSlider({
            useCSS: false,
            auto: true,
            easing: 'easeInOutQuart',
            speed: 1000,
            responsive:true
        });

    }

    function windowResize() {
        // re-align the down icon
        var downTop = $(window).height() - 120;
        if(downTop > 655) {
            downTop = 655;
        }
        $('.down').css({top:downTop});
    }


    function initAnimation() {
        $('#menu').waypoint(function() {
            $('#menu .menu_list li').each(function(index,obj){
                $(obj).delay(index*200).animate({opacity:1});
            });
        }, { offset: '80%',triggerOnce:true });
    }


    /** PRELOADER **/
    /**
     * @abstract Pulls in any image on the stage with the preload class
     */
//    function loadAssets() {
//        var manifest = [];
//
//        // get all preload objects & populate manifest
//        $('body').find('img.preload').each(function() {
//            var obj = $(this);
//            var objSrc = obj.attr('src');
//            manifest.push({ 'src': objSrc, 'id': obj });
//        });
//
//        // load and execute manifest
//        var preload = new createjs.LoadQueue(false);
//        preload.addEventListener("progress", handleProgress);
//        preload.addEventListener("complete", handleComplete);
//        preload.loadManifest(manifest);
//
//        function handleComplete(event) {
//            initialContentHide();
//            preloadComplete();
//        }
//
//        function handleProgress(event) {
//            $('#loader .bar').css('width', (event.progress*100) + '%');
//        }
//    }


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