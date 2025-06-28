/***************** PAGE LOADER *****************/
var $domain = window.location.href.split("/"),
    $domain = $domain[0] + "//" + $domain[2],
    //$internalLinks = $("a[href^='" + $domain + "'], a[href^='/'], a[href^='./'], a[href^='../'], a[href^='#']"),
    internalLinks = "a[href^='".concat($domain, "'], a[href^='/'], a[href^='./'], a[href^='../']"),
    $pageloaderActive = 1,
    $pageloaderStarted = 0,
    $_window = $(window),
    $_body = $("body"),
    $body = $("body"),
    $window = $(window),
    $_html = $("html"),
    $html = $("html"),
    $debug = 0,
    $lazyLoad = 1,
    menuElement = "nav#menu",
    $urlParams = '',
    $gaActive = 1,
    $_debug = 0,
    $_forPopstate = 1,
    $currentPage = "",    
    $loaderState = "finish",
    $_loaderTimeout = 0,
    _loaderTimer = 1500,
    url_old = '',
    newMetas = ['[rel="shortlink"]', '[rel="canonical"]', '[property="og:title"]', '[property="og:url"]', '[property="og:image"]', '[name="twitter:title"]', '[name="twitter:image"]', '[name="description"]'],
    globalAllowClick = 0; //When loading do not allow clicks by user ( onStartPage revers to true);    

    function loadPages(e, t) {
        var a = $(".box-wrapper");
        "default" === t && ($debug && console.log("page: default"),
        $.ajax({
            type: "GET",
            dataType: "html",
            url: e,
            success: function(t) {
                loadingTransition("start", function() {
                    if (t) {
                        $(menuElement).length > 0 && $body.hasClass("menu-opened"),
                        $("body > .compare-basket").length > 0 && ($("body > .compare-basket").remove(),
                        $("body > .compare").remove());
                        var n = (new DOMParser).parseFromString(t, "text/html")
                          , o = $(n.body)
                          , i = $(n.head)
                          , s = "".concat(o.attr("class"), " loading-page")
                          , r = $(".box-wrapper", o).contents();
                        TweenLite.delayedCall(.4, function() {
                            if ($body.attr("class", s),
                            a.html(r),
                            $(internalLinks, a).attr("data-remote", "true"),
                            $(".wpml-ls-link", a).removeAttr("data-remote"),
                            $(".product-dummy-image").length > 0) {
                                var e = $(".main-image", a)
                                  , t = $(".main-image .uncol picture .has_bg", a)
                                  , n = $("#masthead > div").outerHeight(!0)
                                  , o = $(".main-image .uncol picture .has_bg").offset().left
                                  , i = t.width()
                                  , l = t.height();
                                TweenLite.set(e, {
                                    opacity: 0
                                }),
                                TweenLite.to(".product-dummy-image", 1, {
                                    width: "".concat(i, "px"),
                                    height: "".concat(l, "px"),
                                    top: "".concat(n, "px"),
                                    left: "".concat(o, "px"),
                                    className: "+=contain",
                                    ease: Expo.easeInOut
                                })
                            }
                        }),
                        TweenLite.delayedCall(.8, function() {
                            handleMetas(i, 0),
                            clearPagesAfterloading(0),
                            TweenLite.delayedCall(.6, function() {
                                loadingTransition("finish", function() {
                                    document.dispatchEvent(new Event("DOMContentLoaded")),
                                    window.dispatchEvent(new Event("load")),
                                    UNCODE.init(),
                                    TweenLite.delayedCall(.3, function() {
                                        if ($(".produtos-list").length > 0) {
                                            var e = $(".wcpf-filter").attr("id").match(/(\d+)/)[0];
                                            (t = document.createElement("script")).id = "wcpf-load-project-".concat(e, "-script"),
                                            t.type = "text/javascript",
                                            t.innerText = document.getElementById("wcpf-load-project-".concat(e, "-script")).innerHTML,
                                            document.getElementById("wcpf-load-project-".concat(e, "-script")).remove(),
                                            $(t).insertAfter("#wcpf-filter-".concat(e))
                                        }
                                        var t;
                                        $(".iubenda-embed").length > 0 && ((t = document.createElement("script")).id = "iubenda-script",
                                        t.type = "text/javascript",
                                        t.innerText = document.querySelector(".iubenda-embed + script").innerHTML,
                                        document.querySelector(".iubenda-embed + script").remove(),
                                        $(t).insertAfter(".iubenda-embed"))
                                    }),
                                    $(".product-dummy-image").length > 0 && (TweenLite.set(".main-image", {
                                        opacity: 1
                                    }),
                                    $(".product-dummy-image").fadeOut("fast").remove())
                                })
                            })
                        })
                    } else
                        window.location = e
                })
            },
            error: function(t, a, n) {
                window.location = e
            },
            cache: !1
        }))
    }
    function loadingTransition(e, t) {
        var a = $(".loaderTransition");
        "start" == e && (a.addClass("loading"),
        $debug && console.log("loader started completed"),
        "function" == typeof t && t()),
        "finish" == e && (a.removeClass("loading"),
        $debug && console.log("loader completed"),
        "function" == typeof t && t()),
        $loaderState = e
    }

    $window.on("load", function() {
        if ($pageloaderStarted === 0) {
            $debug && console.log("doc ready");
            var stylesheetDirectoryUri = phpVars.stylesheet_directory_uri;

            $pageloaderStarted = 1;
            onStartPageWhenRefresh(0);

            if ($pageloaderActive === 1) {
                // $(internalLinks, ".box-container").attr("data-remote", "true"),
                $(".wpml-ls-link").removeAttr("data-remote");
                $('[rel^="external"]').removeAttr("data-remote");

                var currentUrl = document.location.href.substr(document.location.href.lastIndexOf("/") + 1);
                if (currentUrl.indexOf("?") > 0) {
                    currentUrl = currentUrl.split("?");
                    $urlParams = currentUrl[1];
                }

                initRemote();
                lookForActive();

                if (window.addEventListener) {
                    window.addEventListener("popstate", function(event) {
                        $debug && console.log("entrou no popstate");

                        if (!$html.hasClass("mobile")) {
                            $debug && console.log(event);
                            $debug && console.log(`${event.state}||${urlOld}!=${window.location.href}`);

                            if (!event.state || urlOld !== window.location.href) {
                                $forPopstate = 0;
                                TweenLite.delayedCall(0.5, function() {
                                    window.location = window.location;
                                });
                            } else {
                                $forPopstate = 1;
                            }
                        }
                    });
                }
            }

            WebFont.load({
                custom: {
                    families: ["FoundryMonoline:n3,n4,n5,n7,n9"],
                    urls: [stylesheetDirectoryUri + "/dist/fonts.css"]
                }
            });

            $(document).on("keydown", function(event) {
                switch (event.which) {
                    case 40:
                    case 38:
                    case 13:
                    case 39:
                    case 37:
                        break;
                    case 27:
                        if ($(menuElement).length > 0 && $body.hasClass("menu-opened")) {
                            triggerMobileMenu();
                        }
                        break;
                }
            });
        }
    });



function clearPagesAfterloading(e) {
    TweenLite.delayedCall(e, function() {
        $debug && console.log("clearPagesAfterloading"),
        onStartPageWhenRefresh(1)
    })
}

function onStartPageWhenRefresh(byRefresh) {
    if ($_debug) console.log("onStartPageWhenRefresh");

    var delay = 0;
    if (byRefresh == 1 && $pageloaderActive == 1) {
        $(window).scrollTop(0);
        $("html,body").scrollTop(0);
        
        initScripts();
        customScripts();
    } else {
        delay = $_body.hasClass('home') && 1000;
        //setTimeout(function () {
            $('.page-wrapper').imagesLoaded({ background: true }, function () {
                $('.loader').fadeOut('fast', function () {
                    //initMouseEvents();
                    initMenuMobile();
                    init_inputs();
                    customScripts();

                    if ($('.home_intro').length == 0) {
                        initScripts();
                    }
                });
            });
        //}, delay);
    }

    $_body.removeClass("loading-page");
    globalAllowClick = 1;
}

function handleMetas(response, is_load) {
    if ($_debug) console.log("altera metatags");

    document.title = response.find('title')[0].innerText;

    for (var i = 0, len = newMetas.length; i < len; i++) {
        if ($(newMetas[i]).attr('content') !=""){
            $(newMetas[i]).attr('content', $(newMetas[i], response).attr('content'));
        } else if ($(newMetas[i]).attr('href') != ""){
            $(newMetas[i]).attr('href', $(newMetas[i], response).attr('href'));
        }        
    }

    handleParams();

    url_old = window.location.href;

    if ($_forPopstate) {
        history.pushState({}, document.title, $currentPage);
        window.history.replaceState('Object', document.title, $currentPage);
    }

    if ($gaActive && is_load == 0) {
        if (typeof ga != 'undefined') {
            var d = location.pathname;
            ga('set', { page: d, title: document.title });
            ga('send', 'pageview');
        }
    }

    $_forPopstate = 1;
}

function handleParams() {
    if ($urlParams) {
        if ($loaderState == "finish" && $('.mask').css('display') == "none") {
            clearInterval($_loaderTimeout);
            if ($_debug) console.log("handleParams: " + $urlParams);

            if ($urlParams.indexOf("&") > 0) {
                var all_params = $urlParams.split("&");
                all_params.forEach(function (param) {
                    var paramSplited = param.split("=");
                    if (paramSplited[0] == "anchor") {
                        $('html').stop(true, true).animate({
                            scrollTop: $('#' + paramSplited[1]).offset().top
                        }, 1500, 'easeInOutExpo', function () { });
                    }
                });
            } else {
                var paramSplited = $urlParams.split("=");
                if (paramSplited[0] == "anchor") {
                    $('html').stop(true, true).animate({
                        scrollTop: $('#' + paramSplited[1]).offset().top
                    }, 1500, 'easeInOutExpo', function () { });
                }
            }
        } else {
            clearInterval($_loaderTimeout);
            $_loaderTimeout = setInterval(function () {
                handleParams();
            }, 100);
        }
    }
}

function initRemote() {
    $debug && console.log("initRemote"),
    $body.on("click", 'a[data-remote="true"]', function(e) {
        e.preventDefault();
        var t = $(this);
        if (!t.hasClass("wpml-ls-link")) {
            $debug && console.log("remote link: ".concat(t.attr("href"))),
            $body.addClass("loading-page");
            var a = t.attr("href");
            t.attr("href");
            if (t.attr("href").indexOf("?") > 0) {
                $debug && console.log("found params on remote btn: ".concat($urlParams));
                var n = t.attr("href").split("?");
                n[0],
                $urlParams = n[1]
            } else
                $urlParams = "";
            if ($debug && console.log("btn remote clicked"),
            $("nav#menu .current").removeClass("current"),
            t.parent(".menu-page").length > 0 && t.parent(".menu-page").addClass("current"),
            $currentPage = a,
            1 === parseInt(t.attr("data-product"))) {
                if ($debug && console.log("btn prod clicked"),
                t.find(".product-loader").length > 0) {
                    var o = t.find(".product-loader");
                    o.addClass("active"),
                    TweenLite.to(o, .5, {
                        autoAlpha: 1
                    })
                }
                var i = t.parents("figure").find("picture span.has_bg")
                  , s = i.attr("data-big")
                  , r = $('<div class="product-dummy-image"><span role="img" aria-label="" class="has_bg" style="background-image:url('.concat(s, ')"></span>'));
                $debug && console.log("dummy image loaded");
                var l = i.offset().top - $window.scrollTop()
                  , c = i.offset().left
                  , d = i.width()
                  , u = i.height();
                r.css({
                    top: "".concat(l, "px"),
                    left: "".concat(c, "px"),
                    width: "".concat(d, "px"),
                    height: "".concat(u, "px")
                }),
                $("body").append(r),
                $debug && console.log("dummy image appended")
            }
            if (!globalAllowClick)
                return $debug && console.log("globalAllowClick is 0, exit"),
                $body.removeClass("loading-page"),
                !1;
            var m = "default";
            t.attr("data-pageTrans") && (m = t.attr("data-pageTrans")),
            loadPages(a, m),
            globalAllowClick = 0
        }
    })
}

function lookForActive() {
    var path = document.location.href.substr(document.location.href.lastIndexOf('/') + 1);

    if (path) {
        if ($_debug) console.log("looking for active link: " + path);

        var $element = $('a[data-remote="true"][href*="' + path + '"]');

        if ($element.length > 0) {
            if ($_debug) console.log("found active");

            $currentPage = $element.attr("href");

            if ($currentPage.indexOf("?") > 0) {
                var ajaxUrlField = $currentPage.split("?");
                $currentPage = ajaxUrlField[0];
            }

            if ($element.parent('.menu-page').length > 0) {
                $element.parent('.menu-page').addClass('current');
            }
        }
    }
}

/***************** FUNCTIONS *****************/
function initScrollIndicator() {    
    if ($('#progress-bar').length==0) $('<div id="progress-bar"></div>').appendTo('body');
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
}
function goTo(obj, center) {
    'use strict';

    if ($(obj).length > 0) {
        if (center == 1) {
            var elOffset = $(obj).offset().top;
            var elHeight = $(obj).height();
            var windowHeight = $(window).height();
            var offset;

            var cenas = (windowHeight / 2);
            var cenas2 = (elHeight / 2);

            if (elHeight < windowHeight) {
                offset = elOffset - (cenas - cenas2);
            }

            $('html, body').stop(true, true).animate({
                scrollTop: offset
            }, 1500, '', function () { });
        } else {
            var offset = $(obj).offset().top;
            $('html, body').stop(true, true).animate({
                scrollTop: offset
            }, 1500, '', function () { });
        }
    }
}
function debounce(fn, threshold) {
    var timeout;
    threshold = threshold || 100;
    return function debounced() {
        clearTimeout(timeout);
        var args = arguments;
        var _this = this;
        function delayed() {
            fn.apply(_this, args);
        }
        timeout = setTimeout(delayed, threshold);
    };
}
function elementParallax() {
    // if ($('.animated-parallax').length>0){        
    //     var scrollMagicController = new ScrollMagic.Controller();
        
    //     $('.animated-parallax').each(function (index, element) {            
    //         var neChild = $(this).find('.parallax-el'),
    //             data_y = neChild.attr('data-y'),
    //             data_invert = neChild.attr('data-invert');

    //         if (data_invert == 1) {
    //             var scrollMagicTween = new TimelineMax().add([
    //                 TweenMax.fromTo(neChild, 1, { y: -data_y }, { y: data_y, ease: Linear.easeNone }),
    //             ]);
    //         } else {
    //             var scrollMagicTween = new TimelineMax().add([
    //                 TweenMax.fromTo(neChild, 1, { y: data_y }, { y: -data_y, ease: Linear.easeNone }),
    //             ]);
    //         }

    //         var scrollMagicScene = new ScrollMagic.Scene({
    //             triggerElement: element,
    //             triggerHook: 1,
    //             duration: '200%'
    //         }).setTween(scrollMagicTween).addTo(scrollMagicController);
    //     });
    // }
}



function init_fades() {
    'use strict';
    //Elements Fading
    if ($('.elements_animated').length > 0) {
        $('.elements_animated').each(function (index, element) {
            var watcher = scrollMonitor.create(element);

            watcher.enterViewport(function () {
                $(element).addClass('active');

                setTimeout(function () {
                    $(element).removeClass('elements_animated active');
                }, 1000);

                watcher.destroy();
            });
        });
    }
}

function init_inputs() {
    'use strict';

    if ($('.field_holder').length > 0) {
        $('.field_holder').each(function (index, element) {
            $("input, textarea", element).on("keypress focus", function () {
                if ($(this).val() !== '') {
                    $(this).parents('.field_holder').addClass('focused');
                } else {
                    $(this).parents('.field_holder').removeClass('focused');
                }
            });
            $("input, textarea", element).on("blur", function () {
                if ($(this).val() !== '') {
                    $(this).addClass('focused filled');
                } else {
                    $(this).removeClass('focused filled');
                }
            });
        });
    }
}

function init_appear(){
    var appearedElements = '.home_svg, .button-big, .svg_arrow, .parceiros_grid, span[style^="text-decoration: underline"], span[style *= " text-decoration: underline"], .uptec_portfolio';

    if ($(appearedElements).length > 0) {
        $(appearedElements).each(function (index, element) {
            var watcher = scrollMonitor.create(element);

            if ($(element).height() > $(window).height()) {
                watcher.enterViewport(function () {
                    $(element).addClass('appeared');
                    watcher.destroy();
                });
            } else {
                watcher.fullyEnterViewport(function () {
                    $(element).addClass('appeared');
                    watcher.destroy();
                });
            }
        });
    }
}

/*-------------------------------------------------------------------------------------------
=HANDLE MENU EFFECT - RUI
--------------------------------------------------------------------------------------------*/
function initMenuMobile() {
    if ($('nav#menu').length > 0) {
        $('.mobile-menu-button').on('click', function () {
            triggerMobileMenu();
        });
    }
}

function triggerMobileMenu() {
    if ($('nav#menu').length > 0) {
        $_body.toggleClass('overHidden-menu');
        if (!$('body').hasClass('style-color-xsdn-bg')) $('#main-logo svg').toggleClass('dark');
        if (!$('body').hasClass('style-color-xsdn-bg')) $('.wpml-ls-item').toggleClass('dark');
        if (!$('.body_lines').hasClass('dark')) $('.body_lines').toggleClass('dark');

        var menuTimer = $_body.hasClass('loading-page') ? 0.2 : 0.8;

        if (!$_body.hasClass('off-opened')) {  
            var animation = new TimelineMax({
                onComplete: function () {
                    setTimeout(function () {
                        $_body.removeClass('menu-opened');
                        $('.mobile-menu-button').removeClass('close closing');
                        if (!$_body.hasClass('style-color-xsdn-bg') && $('.body_lines').hasClass('dark')) $('.body_lines').removeClass('dark');
                        TweenMax.set(".menu_paths.dark span", { scaleX: 0, clearProps: 'all' });
                    }, 600);
                }
            });

            animation.staggerFromTo(document.querySelectorAll(".menu_paths.dark span"), menuTimer, {
                scaleX: 0
            }, {
                scaleX: 1,
                ease: Power0.easeNone
            }, 0);

            TweenMax.to(".post-body", 1, {
                opacity: 1
            });
        }else{
            var animation = new TimelineMax({
                onComplete: function () {
                    $_body.addClass('menu-opened');
                    $('.mobile-menu-button').addClass('close');
                    if (!$_body.hasClass('style-color-xsdn-bg') && !$('.body_lines').hasClass('dark')) $('.body_lines').addClass('dark');

                    setTimeout(function () {
                        TweenMax.set(".menu_paths.light span", { scaleX: 0, clearProps: 'all' });
                    }, 200);
                }
            });
            
            animation.staggerFromTo(document.querySelectorAll(".menu_paths.light span"), menuTimer, {
                scaleX: 0
            }, {
                scaleX: 1,
                ease: Power0.easeNone
            }, 0);

            TweenMax.to(".post-body", 1, {
                opacity: 0
            });
        }        
    }
}   

function getRandom(min, max){
    return (Math.random() * (max - min) + min).toFixed(2);
}

/***************** PLUGINS *****************/
(function ($) { //$(window).scrolled(function() {	 Utilizar em vez de window on scroll, corre o codigo apenas quando o utilizar para o scroll
    'use strict';
    var uniqueCntr = 0;
    $.fn.scrolled = function (waitTime, fn) {
        if (typeof waitTime === "function") {
            fn = waitTime;
            waitTime = 200;
        }
        var tag = "scrollTimer" + uniqueCntr++;
        this.scroll(function () {
            var self = $(this);
            var timer = self.data(tag);
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                self.removeData(tag);
                fn.call(self[0]);
            }, waitTime);
            self.data(tag, timer);
        });
    };
})(jQuery);

(function ($) { //$(window).resized(function() {	 Utilizar em vez de window on resize, corre o codigo apenas quando o utilizar para o resize
    'use strict';
    var uniqueCntr = 0;
    $.fn.resized = function (waitTime, fn) {
        if (typeof waitTime === "function") {
            fn = waitTime;
            waitTime = 200;
        }
        var tag = "resizeTimer" + uniqueCntr++;
        this.resize(function () {
            var self = $(this);
            var timer = self.data(tag);
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                self.removeData(tag);
                fn.call(self[0]);
            }, waitTime);
            self.data(tag, timer);
        });
    };
})(jQuery);


/***************** INITS *****************/

 
function initLazyLoad() {
    if (1 == $lazyLoad) {
        if (!("IntersectionObserver"in window)) {
            var e = document.createElement("script");
            e.src = "https://raw.githubusercontent.com/w3c/IntersectionObserver/master/polyfill/intersection-observer.js",
            document.getElementsByTagName("head")[0].appendChild(e)
        }
        lozad(document.querySelectorAll("[data-src], [data-background-image]"), {
            threshold: .3
        }).observe()
    }
}
function initScripts(){
    $_body.addClass('doc-ready');
    init_appear();
    
    init_fades();

    setTimeout(function(){
        elementParallax();
    }, 500);
    $(".about_img:eq(1)").attr({
        "data-y": 220,
        "data-invert": 1
    }),
    
    $(window).scroll(function () {
        initScrollIndicator();
    });

    initSearchOverlay();

    initLazyLoad();
    
}

function initSearchOverlay() {
    // the overlay runs mainly by uncode. this is only to change the close button behaviour
    const searchElement = ".overlay-search";
    if (  $(searchElement).length > 0) {
        // $(".trigger-overlay.search-icon").off("click.searchOverlay");
        $(".trigger-overlay.search-icon").on("click.searchOverlay", function() {
            $html.toggleClass("overHidden-search");
            $(".menu-close-search").toggleClass("close");
        });

        // Close search overlay
        $(".menu-close-search").off("click.closeSearch");
        $(".menu-close-search").on("click.closeSearch", function() {
            console.log("click on the link");
            $html.toggleClass("overHidden-search");
            
            $(searchElement).toggleClass("open");
        });
    }
}