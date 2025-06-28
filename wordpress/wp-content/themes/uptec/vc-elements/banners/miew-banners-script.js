$(document).ready(function () {
    var initMiewSlider = function () {
        if ($('.banners').length > 0) {//Banners Homepage        
            if ($('.slick-banners').length > 0) {
                if (($('.banners').hasClass('fullscreen') || $('.banners').hasClass('fullscreen-mobile')) && !$('#masthead').hasClass('absolute-start')) {
                    $(window).resized(function () {
                        var $responsiveW = 960;
                        var newH = 'auto';

                        if ($('.banners').hasClass('fullscreen') && $('body').innerWidth() > $responsiveW) {
                            newH = $('#masthead > div').outerHeight() + 'px';
                        } else if ($('.banners').hasClass('fullscreen-mobile') && $('body').innerWidth() <=  $responsiveW) {
                            newH = $('#masthead > div').outerHeight() + 'px';
                        }
                        
                        if (newH !== $('.banners').attr('data-margin')) {
                            $('.banners').attr('data-margin', newH);

                            if (newH != 'auto'){
                                $('.banners').css('height', '-webkit-calc(100vh - ' + newH + ')');
                                $('.banners').css('height', 'calc(100vh - ' + newH + ')');
                            }else{
                                $('.banners').css('height', newH);
                            }
                        }
                    });
                }

                var $dots = false,
                    $arrows = false,
                    $cursors = false,
                    $dots_mobile = false,
                    $arrows_mobile = false,
                    $cursors_mobile = false;

                if ($('.banners').hasClass('has_dots')) $dots = true;
                if ($('.banners').hasClass('has_arrows')) $arrows = true;
                if ($('.banners').hasClass('has_cursors')) $cursors = true;
                if ($('.banners').hasClass('has_dots_mobile')) $dots_mobile = true;
                if ($('.banners').hasClass('has_arrows_mobile')) $arrows_mobile = true;
                if ($('.banners').hasClass('has_cursors_mobile')) $cursors_mobile = true;

                $('.slick-banners').on('init', function (event, slick, currentSlide, nextSlide) {
                    var bgss = new bgsrcset();
                    bgss.callonce = false;
                    bgss.init('.banners_img');
        
                    toogleBanners(0, $('.slick-banners').find('.slick-current'));
                });
                $('.slick-banners').slick({
                    dots: $dots,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: $arrows,
                    cursors: $cursors,
                    infinite: false,
                    adaptiveHeight: false,
                    fade: true,
                    autoplay: true,
                    autoplaySpeed: 8000,
                    cssEase: 'linear',
                    responsive: [
                        {
                            breakpoint: 960,
                            settings: {
                                dots: $dots_mobile,
                                arrows: $arrows_mobile,
                                cursors: $cursors_mobile,
                            }
                        }
                    ]
                });
                $('.slick-banners').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    toogleBanners(1, $('.slick-banners').find('.slick-current'));

                    if ($('.slick-slide:eq(' + currentSlide + ') video').length > 0) {
                        $('.slick-slide:eq(' + currentSlide + ') video').get(0).pause();
                    }
                });
                $('.slick-banners').on('afterChange', function (event, slick, currentSlide, nextSlide) {
                    toogleBanners(0, $('.slick-banners').find('.slick-current'));

                    if ($('.slick-slide:eq(' + currentSlide + ') video').length > 0) {
                        $('.slick-slide:eq(' + currentSlide + ') video').get(0).play();
                    }
                });

                function toogleBanners(type, $el) {
                    if ($el.length > 0) {
                        var tit = $el.find('.slide-title');
                        var txt = $el.find('.slide-text');
                        var btn = $el.find('a.button');

                        $(tit).toggleClass('banners-show');
                        $(txt).toggleClass('banners-show');
                        $(btn).toggleClass('banners-show');
                    }
                }
            }
        }
    }

    initMiewSlider();
});