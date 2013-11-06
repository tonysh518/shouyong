require.config({
    paths: {
        jquery: './jquery-1.8.3.min',
        skrollr: './skrollr.min',
        scrollto: './jquery.scrollTo.min',
        bxslider: './jquery.bxslider',
        waypoints: './waypoint'
    },
    shim: {
        mousewheel: { deps: ['jquery'] },
        scrollto: { deps: ['jquery'] },
        bxslider: { deps: ['jquery'] },
        waypoints: { deps: ['jquery'] }
    }
});

var shouyong = {};
require(['jquery','skrollr','bxslider','waypoints'], function ($) {
    'use strict';

    /** INITIALISER **/
    init();
    function init() {
        if(!$('html').is('.oldie')) {
            // Fantastic plugin for parallax and animation
            // https://github.com/Prinzhorn/skrollr
            var s = skrollr.init({ forceHeight: false, smoothScrolling:true });
        } else {
            $('html').removeClass('js');
            $('html').addClass('no-js');
        }

        shouyong.bxSlider = $('.menu_list_bxslider').bxSlider({
            minSlides: 2,
            maxSlides: 2,
            slideWidth: 339,
            useCSS: false,
            slideMargin: 90,
            responsive:true
        });

        initMenuControls();


    }

    function initMenuControls() {
        $('.menu_list_bxslider li').click(function(event){
            if(event.clientX < $(window).width()/2){
                shouyong.bxSlider.goToPrevSlide();
            }
            else {
                shouyong.bxSlider.goToNextSlide();
            }
        });

        $('.menu_list_bxslider li a').click(function(event){
           event.preventDefault();
        });
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



});