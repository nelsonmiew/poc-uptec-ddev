function sliderCursor() {
    var owl = $('.owl-carousel');

    owl.each(function () {
        var owl_element = $(this);

        if (!owl_element.hasClass('olw-cursors')) {
            owl_element.addClass('olw-cursors');

            $('<a class="gallery-cursor cursor-prev" aria-label="Previous" href="javascript:;"></a>').prependTo(owl_element.parents('.owl-carousel-wrapper'));
            $('<a class="gallery-cursor cursor-next" aria-label="Next" href="javascript:;"></a>').appendTo(owl_element.parents('.owl-carousel-wrapper'));

            owl_element.owlCarousel();

            // disable cursors
            owl_element.on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {
                if (!event.namespace) return;
                var carousel = event.relatedTarget,
                    element = event.target,
                    current = carousel.current();

                $('.gallery-cursor.cursor-next', element).toggleClass('disabled', current === carousel.maximum());
                $('.gallery-cursor.cursor-prev', element).toggleClass('disabled', current === carousel.minimum());
            });
            // Go to the next item
            $('.gallery-cursor.cursor-prev').on('click', function () {
                owl_element.trigger('prev.owl.carousel');
            });
            // Go to the previous item
            $('.gallery-cursor.cursor-next').on('click', function () {
                owl_element.trigger('next.owl.carousel');
            });
        }
    });
}

function initMiewFilteredGrid() {
    // Get the filtered grid element
    var filteredGrid = document.querySelector(".filtered_grid");
    var listingDivs = $(".listing_divs");
    var detailElement = document.getElementById("detail");

    // Check if the filtered grid element exists
    if ($(filteredGrid).length > 0) {
        var searchTerm, filtersTop = $(".filtered_grid .filters_top"), action = $(".filtered_grid").attr("data-action"), filters = [], activeFilters = "", filteredElements = $(), listSwitcher = $(".listSwitcher a"), activeCenter = localStorage.getItem("activeCenter");

        // Add click event listener to the list switcher links
        if (listSwitcher.length > 0) {
            listSwitcher.on("click", function() {
                var $this = $(this);
                var gridClass = ".listing_grid";
                var listClass = ".listing_list";

                // Swap the grid and list classes based on the clicked link
                if ($(this).attr("data-switch") == "list") {
                    gridClass = ".listing_list";
                    listClass = ".listing_grid";
                }

                // Animate the switch between grid and list views
                TweenLite.to(listClass, 1, {
                    y: 80,
                    autoAlpha: 0,
                    ease: Power2.easeOut,
                    onComplete: function() {
                        listSwitcher.removeClass("active");
                        $this.addClass("active");
                        $(".listing_divs").removeClass("grid list");
                        $(".listing_divs").addClass($this.attr("data-switch"));
                        $(listClass).addClass("hidden");
                        $(gridClass).removeClass("hidden");
                        TweenLite.to(gridClass, 1, {
                            y: 0,
                            autoAlpha: 1,
                            ease: Power2.easeOut
                        });
                    }
                });
            });
        }

        // Initialize filters
        filtersTop.find(".field_holder").each(function() {
            var $this = $(this);
            filters.push({
                $inputs: $this.find(".filter"),
                active: "",
                tracker: false
            });
        });

        // Initialize MixItUp plugin for filtering

        // Filter listings based on selected filters
        filtersTop.find(".filter").on("change", function() {
            var activeFilters = [];
            for (var i = 0; i < filters.length; i++) {
                var filter = filters[i];
                filter.active = [];
                filter.$inputs.each(function() {
                    var $this = $(this);
                    if ($this.is("select") && $this.val() != 0 && $this.val() != "") {
                        filter.active.push($this.val());
                    }
                });
                activeFilters = activeFilters.concat(filter.active);
            }

            // Show/hide listings based on active filters
            $(".listing_divs, .fail-message").hide();
            if (activeFilters.length === 0) {
                $(".listing_divs, .detail_div").show();
            } else {
                var count = 0;
                activeFilters.forEach(function(filter) {
                    var listingDivs = $(".listing_divs" + filter);
                    if (listingDivs.length > 0) {
                        count++;
                        listingDivs.show();
                        listingDivs[0].click();
                    }
                });
                if (count === 0) {
                    $(".fail-message").show();
                    $(".detail_div").hide();
                }
            }
        });

        // Add keyup event listener to search input
        $("#pesq").keyup(debounce(function() {
            searchTerm = $("#pesq").val().toLowerCase();

            if (searchTerm.length > 0) {
                $(".listing_divs").each(function() {
                    var $this = $(this);
                    var found = false;
                    $this.find(".searcher").each(function() {
                        if ($(this).text().toLowerCase().includes(searchTerm)) {
                            found = true;
                        }
                    });
                    if (found) {
                        $this.show();
                    } else {
                        $this.hide();
                    }
                });
            } else {
                $(".listing_divs").show();
            }
        }, 500));

        // Add click event listener to listing divs for AJAX loading
        listingDivs.each(function(index) {
            $(this).off("click.gridAjax");
            $(this).on("click.gridAjax", function() {
                var id = $(this).attr("id").split("_")[1];
                var $this = $(this);
                var ajaxAction = action == "empresas" ? "getEmpresas" : "getJobs";
                var ajaxNonce = action == "empresas" ? phpVars.empresas_nonce : phpVars.jobs_nonce;

                $.ajax({
                    type: "post",
                    dataType: "html",
                    url: phpVars.ajaxurl,
                    data: "action=" + ajaxAction + "&id=" + id + "&security=" + ajaxNonce,
                    success: function(response) {
                        $(".listing_divs.active").removeClass("active");
                        if ($(".detail").length > 0) {
                            $(".detail").fadeOut("slow");
                        }
                        $this.addClass("active");
                        detailElement.innerHTML = response;
                        initstickyParallax(".detail_div");
                        setTimeout(function() {
                            setStickPosition(".detail_div");
                        }, 300);
                        if ($(detailElement).find(".button").length > 0) {
                            $(detailElement).find(".button").on("click", function() {
                                if (activeFilters) {
                                    localStorage.setItem("activeCenter", activeFilters);
                                }
                            });
                        }
                    }
                });
            });
        });

        // Trigger click on the first listing div if the filtered grid has the "setFirst" class
        if ($(filteredGrid).hasClass("setFirst")) {
            $(".listing_divs:eq(0)").trigger("click");
        }

        // Handle active center
        if (activeCenter && activeCenter != "") {
            localStorage.removeItem("activeCenter");
            $("#center").val(activeCenter).trigger("change");
            activeCenter = "";
        }
    }
}

function openNewsletter() {
    $('.newsletter_wrapper').slideToggle('slow');
}


$(document).ready(function () {
    $('.main-header').remove();
    $('.menu-container').removeClass('style-dark-bg');
    $('.navbar-header').removeClass('style-dark');

    $(window).resized(function () {
        var alt_menu = $('#masthead > div').outerHeight();
        $('.menu-wrapper').height(alt_menu);
    });
});

function customScripts(){
    /*HELPERS*/
    if ($('#main-logo svg').hasClass('dark')) $('#main-logo svg').removeClass('dark');
    $('.mobile-menu-button, .button-big').attr('data-mouse-attractor', 'true');

    initParallaxElements();
    initCentersMap();
    initMiewFilteredGrid();
    initNewsSlider();
    initApplyForm();
    horizontalAnnouncements();

    if ($('.page-body').hasClass('style-light-bg') || $('.page-body').hasClass('style-color-xsdn-bg')) {
        $('body').removeClass('style-color-jevc-bg').addClass('style-color-xsdn-bg');
        $('.body_lines').addClass('dark');
        $('#main-logo svg').addClass('dark');
        var $elements = $('.menu-wrapper [class^="dark-"], .menu-wrapper [class^="-dark"], .menu-wrapper [class*=" dark-"], .menu-wrapper [class*="-dark"]');

        $elements.each(function () {
            var str = $(this).attr("class");
            str = str.replace(new RegExp('dark', 'g'), 'light');

            $(this).attr("class", str);
        });
    }

    if ($('.button-big.custom-link').length > 0) {
        $('.button-big.custom-link').each(function () {
            $(this).html('<span>' + $(this).html() + '</span>');
            $('<svg viewBox="0 0 36 36"><path stroke-dasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/></svg>').prependTo(this);
        });
    }

    $(".about_img").length > 0 && ($(".about_img:eq(0)").attr({
        "data-y": 350
    }),
    $(".about_img:eq(1)").attr({
        "data-y": 220,
        "data-invert": 1
    }),
    $(".about_img:eq(2)").attr({
        "data-y": 190
    }));
    if ($('body').hasClass('home')) {
        if ($('.home_intro').length > 0) {
            $('body').addClass('overHidden');
        }

        $('.home_titles:eq(0)').attr({
            'data-parallax': '{"axis":"x"}',
            'data-parallax-mobile': 'true',
        });
        $('.home_titles:eq(1)').attr({
            'data-parallax': '{"axis":"x", "direction":"right"}',
            'data-parallax-mobile': 'true',
        });
        $('.home_titles:eq(2)').attr({
            'data-parallax': '{"axis":"x"}',
            'data-parallax-mobile': 'true',
        });

        setTimeout(function () {
            $('.home_svg path').addClass('parallaxed').attr({
                'data-parallax': '{"axis":"path"}',
                'data-parallax-mobile': 'true',
            });
            initstickyParallax('.parallaxed');
        }, 2500);


        // $('.parallax-el:eq(0)').attr({
        //     "data-y": 190,
        // });
        // $('.parallax-el:eq(1)').attr({
        //     "data-y": 220,
        //     "data-invert": 1
        // });

        if ($('.motion_effect .text-stroked').length > 0) {
            $('.motion_effect .text-stroked').addClass('animated');

            setInterval(function () {
                $('.motion_effect .text-stroked').addClass('animated');
                setTimeout(function () {
                    $('.motion_effect .text-stroked').removeClass('animated');
                }, 6000);
            }, 8000);
        }
    }

    if ($('.animated-counter .uncode-counter').length > 0) {
        $('.animated-counter .uncode-counter').addClass('animated');

        setInterval(function () {
            $('.animated-counter .uncode-counter').addClass('animated');
            setTimeout(function () {
                $('.animated-counter .uncode-counter').removeClass('animated');
            }, 4000);
        }, 6000);
    }

    if ($('.text_to_fill').length > 0) {
        var tl = new TimelineMax({ repeat: -1, yoyo: true });
        tl.to(".text_to_fill p", 2, { height: $('.text_to_fill').innerHeight(), ease: Power2.easeOut });
    }

    if ($('.posts_grid_title').length > 0) {
        var watcher = scrollMonitor.create('.posts_grid_title');
        watcher.enterViewport(function () {
            TweenLite.to($('.posts_grid_title svg path:eq(0)'), 1.8, {
                delay: 0.5,
                attr: { d: $('.posts_grid_title svg path:eq(0)').attr('to') },
                ease: Power2.easeOut
            });

            watcher.destroy();
        });
    }

    if ($('.equipa_grid').length > 0) {
        var e, t = function() {
            $("body").innerWidth() > 960 ? $(".equipa_cells").each(function() {
                var e = Math.floor(150 * Math.random() + 50);
                $(this).css("margin-top", e + "px")
            }) : ($(".equipa_listings").removeAttr("style"),
            $(".equipa_cells").removeAttr("style"))
        };
        (e = scrollMonitor.create(".equipa_listings")).fullyEnterViewport(function() {
            t(),
            e.destroy()
        }),
        $(window).resized(function() {
            t()
        })

        
        var watcher = scrollMonitor.create('.equipa_listings');
        watcher.fullyEnterViewport(function () {
            equipaGrid();
            watcher.destroy();
        });

        $(window).resized(function () {
            equipaGrid();
        });


        function equipaGrid() {
            if ($('body').innerWidth() > 960) {                
                $('.equipa_cells').each(function(){
                    var margin = Math.floor((Math.random() * 150) + 50);
                    $(this).css('margin-top', margin+'px');
                });
                // let $imgs = $('.equipa_divs');
                // const totalImgs = $imgs.length;
                // const maxColumns = 3;
                // const columnWidth = $('.equipa_listings').width() / maxColumns;
                // console.log(columnWidth);
                // let numPerColumn = totalImgs / maxColumns;
                // const maxHeightPerImg = 500; // $('.equipa_listings').height() / numPerColumn;
                
                // numPerColumn = numPerColumn % 1 !== 0 ? Math.floor(totalImgs / maxColumns) + 1 : Math.floor(totalImgs / maxColumns);
                // $('.equipa_listings').height(maxHeightPerImg * numPerColumn);
                // let lastH = 0, x = 0, y = 0, imgH = 0, imgW = 0;

                // for (let i = 0, k = 0; i < maxColumns; i++) {
                //     lastH = 0;

                //     for (let j = 0; j < numPerColumn; j++) {
                //         if ($($imgs[k]).length>0){
                //             imgW = $($imgs[k]).width();
                //             imgH = $($imgs[k]).height();

                //             if ($('body').innerWidth() > 960) {
                //                 y = (maxHeightPerImg * j) + ((maxHeightPerImg - imgH) * ((Math.random() * 1.2) + 0.3));
                //                 x = (columnWidth * i) + ((columnWidth - imgW) * ((Math.random() * 0.6) + 0.4));
                //             }

                //             TweenMax.to($imgs[k], 0.3, {
                //                 left: x,
                //                 top: y,
                //                 opacity: 1,
                //                 delay: 0.1 * k
                //             });

                //             lastH += imgH;
                //         }

                //         k++;
                //     }
                // }


            } else {
                $('.equipa_listings').removeAttr('style');
                $('.equipa_cells').removeAttr('style');
            }
        }
    }

    if ($('.slick-postsgrid').length > 0) {
        initPostsGrid();

        $(window).resize(function (e) {
            initPostsGrid();
        });

        function initPostsGrid() {
            if ($('body').innerWidth() <= 960) {
                if (!$('.slick-postsgrid').hasClass('slick-initialized')) {
                    $('.slick-postsgrid').slick({
                        dots: false,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                        cursors: false,
                        infinite: false,
                        adaptiveHeight: false,
                        autoplaySpeed: 8000,
                        responsive: [
                            {
                                breakpoint: 500,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    centerMode: true,
                                    centerPadding: '40px',
                                }
                            }
                        ]
                    });
                }
            } else {
                if ($('.slick-postsgrid').hasClass('slick-initialized')) $('.slick-postsgrid').slick('unslick');
            }
        }
    }

    if ($('.contactos_grid').length > 0 && $('.shuffled').length > 0) {
        if ($('body').innerWidth() > 960) {
            let allowTilt = true;
            let lineEq;
            let getMousePos;

            if (allowTilt) {
                // from http://www.quirksmode.org/js/events_properties.html#position
                getMousePos = (e) => {
                    let posx = 0;
                    let posy = 0;
                    if (!e) e = window.event;
                    if (e.pageX || e.pageY) {
                        posx = e.pageX;
                        posy = e.pageY;
                    } else if (e.clientX || e.clientY) {
                        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    }
                    return { x: posx, y: posy }
                };

                // Equation of a line (y = mx + b ).
                lineEq = (y2, y1, x2, x1, currentVal) => {
                    const m = (y2 - y1) / (x2 - x1);
                    const b = y1 - m * x1;
                    return m * currentVal + b;
                };

                setTimeout(function () {
                    TweenLite.to('.contactos_grid .contactos_divs', 1, {
                        autoAlpha: 1,
                        y: 0,
                        ease: Power2.easeOut,
                    });
                }, 800);

                window.addEventListener('mousemove', tiltGridMenu);
            }

            function tiltGridMenu(ev) {
                if (!allowTilt) return;
                const mousepos = getMousePos(ev);
                // Document scrolls.
                const docScrolls = {
                    left: document.body.scrollLeft + document.documentElement.scrollLeft,
                    top: document.body.scrollTop + document.documentElement.scrollTop
                };
                // Mouse position relative to the main element.
                const relmousepos = {
                    x: mousepos.x - docScrolls.left,
                    y: mousepos.y - docScrolls.top
                };
                // Movement settings for the tilt elements.
                Array.from(document.querySelectorAll('.contactos_divs')).forEach((item) => {
                    var delta = Number(item.dataset.cty) + lineEq(item.dataset.maxTy, item.dataset.minTy, $(window).height(), 0, relmousepos.y);
                    TweenLite.to(item, 4, {
                        y: delta,
                        ease: Power2.easeOut,
                    });
                });
            }
        }
    }

    window.dispatchEvent(new Event('resize'));
}
