var previousTop = 0;
function initParallaxElements() {
    $("body").innerWidth() > 960 ? initstickyParallax("[data-parallax]") : initstickyParallax('[data-parallax-mobile="true"]')
}
function initstickyParallax(t) {
    stickyParallaxHolder(t),
    window.addEventListener("scroll", function() {
        stickParallax(t)
    }, {
        capture: !0,
        passive: !0
    }),
    $(window).resized(function() {
        stickyParallaxHolder(t)
    })
}
function stickyParallaxHolder(t) {
    $(t).each(function(t, e) {
        var i = $(e)
          , r = i.data("parallax")
          , n = r.axis;
        if ("x" == n)
            r.fixed && i.parent().height(i.height());
        else if ("y" == n) {
            var o = i.outerHeight(!0)
              , a = $(".parallaxParent");
            i.parent(".parallaxParent").length > 0 ? a.css("height", o + "px") : (i.wrap("<div class='parallaxParent'></div>"),
            (a = i.parent(".parallaxParent")).css("height", o + "px"))
        }
    })
}
function stickParallax(t) {
    var e = $(document).scrollTop();
    e != previousTop && setStickPosition(t),
    previousTop = e
}
function setStickPosition(t) {
    var e = $(document).scrollTop();
    $(t).each(function(t, i) {
        var r = $(i)
          , n = r.data("parallax")
          , o = n.axis;
        if ("path" == o) {
            var a = $(this).parents(".row-inner").offset().top + $(this).parents(".row-inner").height()
              , s = parseInt(r.css("stroke-dasharray"));
            (h = 100 * e / a * s / 100) < 0 && (h = 0),
            TweenLite.set(r, {
                strokeDashoffset: h
            })
        } else if ("x" == o) {
            var l = n.fixed
              , u = n.direction
              , c = (a = $(this).parents(".row-inner").offset().top + $(this).parents(".row-inner").height(),
            r.outerWidth());
            "true" == l && (a = $("footer.site-footer").offset().top - r.outerHeight() - ($(window).height() / 2 - r.outerHeight()),
            c = $("body").innerWidth() + r.outerWidth());
            var p = 100 * e / a * c / 100
              , h = p;
            "true" == l && (h = p - r.outerWidth());
            var d = "true" == l ? "-50%" : "0";
            TweenLite.to(r, 0, {
                x: "right" == u ? -h : h,
                y: d,
                ease: Power2.easeOut
            })
        } else {
            var f = r.parent().offset().top
              , m = $(n.fixedTil);
            if (e >= f) {
                if (m.length > 0) {
                    var y = r.outerHeight();
                    a = m.offset().top + m.outerHeight() - y;
                    e >= f && e < a ? $(i).css({
                        position: "fixed",
                        top: "100px",
                        width: $(i).parent().width()
                    }) : $(i).removeAttr("style")
                }
            } else
                $(i).removeAttr("style")
        }
    })
}