function horizontalAnnouncements(){
    $('footer.site-footer').html('');
    if ($('.announcements-footer').length > 0) {
        $('.announcements-footer').appendTo('footer.site-footer');
        var opt = {
            base: {
                width: 2100,
                time: $('body').innerWidth() > 960 ? 16000 : 20000
            },
            itemWidth: "auto",
            ticker: ".announcements",
            tickerClone: "announcements_cloned",
            wrapper: ".announcements_wrapper",
            slide: ".announcements_slide",
            content: ".announcements_content",

            core: {
                _getTime: function (w) {
                    baseMargin = (typeof $contentTickers === "undefined") ? 0 : $contentTickers.first().css("margin-left");
                    baseMargin = (baseMargin < 0) ? baseMargin : 0;
                    return opt.base.time * (w / (baseMargin + opt.base.width));
                },
                _contentWidth: function ($tickers) {
                    var w = 0;
                    if (opt.itemWidth !== "auto" && opt.itemWidth !== 0) {
                        w = $tickers.length * opt.itemWidth;
                        $tickers.width(opt.itemWidth);
                    } else {
                        $tickers.each(function () { w = w + $(this).width() });
                    }
                    return Math.ceil(w + 2);
                }
            }
        };

        var $Ticker = $('.announcements-footer');

        $('.main-container').addClass('padded');

        $($Ticker).on('mouseenter', function() {
            var _anim = $Ticker.data("animation"),
                _stop = $Ticker.data("stop");
            if (!!_stop || !_anim) return;
            _anim.stop();
            $Ticker.data("stop", true);
        });
        $($Ticker).on('mouseleave', function(){
            if (!$Ticker.data("stop")) return;
            animateTicker($Ticker);
            $Ticker.data("stop", false);
        });

        $Ticker.data("ticker", {
            stop: true,
            animation: null
        });

        var $notizieTicker = $Ticker.find(opt.ticker),
            $wrapperTicker = $Ticker.find(opt.wrapper),
            $ti_slide = $Ticker.find(opt.slide),
            $contentTicker = $Ticker.find(opt.content);

        var width_content = opt.core._contentWidth($notizieTicker),
            wrapper_width = $wrapperTicker.width(),
            $current,
            $old = $();

        if (width_content < wrapper_width) {
            var x = Math.ceil(wrapper_width / width_content),
                $clone = $contentTicker.children().clone();
            for (var i = 1; i <= x; i++) {
                $contentTicker.append($clone.clone());
            }
            if (!opt.itemWidth || opt.itemWidth == "auto") {
                width_content = width_content * i;
            } else {
                width_content = ($contentTicker.children().length * opt.itemWidth);
            }
        }

        if (width_content * 3 > $ti_slide.width()) $ti_slide.width((width_content * 3) + 100);

        $ti_slide.append($contentTicker.clone().addClass(opt.tickerClone));
        $ti_slide.append($contentTicker.clone().addClass(opt.tickerClone));

        var $contentTickers = $Ticker.find(opt.content);
        $contentTickers.width(width_content);

        $current = $contentTickers.first();


        var animateTicker = function (m) {
            $ti_slide.append($old);
            var m = (typeof m == "undefined") ? 0 : m;
            $old.css("margin-left", m);

            $Ticker.data("stop", false);
            var tickerAnimation = $current.animate({
                "margin-left": -width_content,
            }, {
                easing: "linear",
                duration: opt.core._getTime(width_content),
                complete: function () {
                    $old = $current;
                    $current = $current.next();
                    animateTicker.call($Ticker);
                }
            });
            $Ticker.data("animation", tickerAnimation);
        }

        animateTicker.call(this);
    }

}