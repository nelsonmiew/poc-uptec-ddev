/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */

// From http://www.quirksmode.org/js/events_properties.html#position
// Get the mouse position.
const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { x: posx, y: posy }
};

// Window sizes.
let winsize;
const calcWinsize = () => winsize = { width: window.innerWidth, height: window.innerHeight };
calcWinsize();
window.addEventListener('resize', calcWinsize, true);

let allowTilt = winsize.width <= 960 ? false : true;    

// The Slide class.
class Slide {
    constructor(el) {
        this.DOM = { el: el };

        // The header wrap element.
        this.DOM.header = document.querySelector('#masthead > div');
        // The figure wrap element.
        this.DOM.figWrap = this.DOM.el.querySelector('.slide_fig-wrap');
        // The image wrap element.
        this.DOM.imgWrap = this.DOM.el.querySelector('.slide_img-wrap');
        // The image element.
        this.DOM.img = this.DOM.imgWrap.querySelector('.slide_img');
        // The texts: the parent wrap, title, number and side text.
        this.DOM.texts = {
            wrap: this.DOM.el.querySelector('.slide_title-wrap'),
            title: this.DOM.el.querySelector('.slide_title'),
            subtitle: this.DOM.el.querySelector('.slide_subtitle'),
        };

        // Calculate the sizes of the image wrap. 
        this.calcSizes();
        // And also the transforms needed per position. 
        // We have 5 different possible positions for a slide: center, bottom right, top left and outside the viewport (top left or bottom right).
        this.calcTransforms();
        // Init/Bind events.
        this.initEvents();
    }
    // Gets the size of the image wrap.
    calcSizes() {
        this.width = this.DOM.imgWrap.offsetWidth;
        this.height = this.DOM.imgWrap.offsetHeight;
        this.headerHeight = this.DOM.header.offsetHeight;
    }
    // Gets the transforms per slide position.
    calcTransforms() {
        /*
        Each position corresponds to the position of a given slide:
        0: left top corner outside the viewport
        1: left top corner (prev slide position)
        2: center (current slide position)
        3: right bottom corner (next slide position)
        4: right bottom corner outside the viewport
        */

        //ORIGINALS
        // var offsetSide1 = winsize.width / 2 + this.width;
        // var offsetSide2 = winsize.width / 2 - this.width / 3;
        // var offsetTop1 = winsize.height / 2 + this.height;
        // var offsetTop2 = winsize.height / 2 - this.height / 3;

        //RUI
        var offsetSide = winsize.width / 2;
        var offsetTopOuter = winsize.height / 2 + this.height;
        var offsetTopLeft = winsize.width <= 1150 ? winsize.height : this.DOM.figWrap.offsetHeight;
        var offsetTopRight = winsize.width <= 1150 ? winsize.height : (this.height + this.headerHeight);

        this.transforms = [
            { x: -1 * (offsetSide), y: offsetTopOuter, rotation: 30 },
            { x: -1 * (offsetSide), y: offsetTopLeft, rotation: 0 },
            { x: 0, y: 0, rotation: 0 },
            { x: offsetSide, y: -1 * (offsetTopRight), rotation: 0 },
            { x: offsetSide, y: -1 * (offsetTopOuter), rotation: -30 },
        ];

        
    }
    // Init events:
    // Mouseevents for mousemove/tilt/scale on the current image, and window resize.
    initEvents() {
        this.mouseenterFn = () => {
            if (!this.isPositionedCenter() || !allowTilt) return;
            clearTimeout(this.mousetime);
            this.mousetime = setTimeout(() => {
                // Scale the image.
                TweenMax.to(this.DOM.img, 0.8, {
                    ease: Power3.easeOut,
                    scale: 1.1
                });
            }, 40);
        };
        this.mousemoveFn = ev => requestAnimationFrame(() => {
            // Tilt the current slide.
            if (!allowTilt || !this.isPositionedCenter()) return;
            this.tilt(ev);
        });
        this.mouseleaveFn = (ev) => requestAnimationFrame(() => {
            if (!allowTilt || !this.isPositionedCenter()) return;
            clearTimeout(this.mousetime);

            // Reset tilt and image scale.
            TweenMax.to([this.DOM.imgWrap, this.DOM.texts.wrap], 1.8, {
                ease: 'Power4.easeOut',
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0
            });
            TweenMax.to(this.DOM.img, 1.8, {
                ease: 'Power4.easeOut',
                scale: 1
            });
        });
        // When resizing the window recalculate size and transforms, since both will depend on the window size.
        this.resizeFn = () => {
            this.calcSizes();
            this.calcTransforms();
        };
        this.DOM.imgWrap.addEventListener('mouseenter', this.mouseenterFn, true);
        this.DOM.imgWrap.addEventListener('mousemove', this.mousemoveFn, true);
        this.DOM.imgWrap.addEventListener('mouseleave', this.mouseleaveFn, true);
        $(window).on('resize.slideResize', this.resizeFn);
    }
    removeEvents() {
        this.DOM.imgWrap.removeEventListener('mouseenter', this.mouseenterFn);
        this.DOM.imgWrap.removeEventListener('mousemove', this.mousemoveFn);
        this.DOM.imgWrap.removeEventListener('mouseleave', this.mouseleaveFn);
        
        TweenMax.set([this.DOM.imgWrap, this.DOM.texts.wrap], {
            clearProps: "all"
        });
        TweenMax.set(this.DOM.img, {
            clearProps: "transform"
        });

        this.reset();
        
        $(window).off('resize.slideResize');
    }
    // Tilt the image wrap and texts when mouse moving the current slide.
    tilt(ev) {
        const mousepos = getMousePos(ev);
        // Document scrolls.
        const docScrolls = {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        };
        const bounds = this.DOM.imgWrap.getBoundingClientRect();;
        // Mouse position relative to the main element (this.DOM.el).
        const relmousepos = {
            x: mousepos.x - bounds.left - docScrolls.left,
            y: mousepos.y - bounds.top - docScrolls.top
        };

        // Move the element from -20 to 20 pixels in both x and y axis.
        // Rotate the element from -15 to 15 degrees in both x and y axis.
        let t = { x: [-20, 20], y: [-20, 20] },
            r = { x: [-15, 15], y: [-15, 15] };

        const transforms = {
            translation: {
                x: (t.x[1] - t.x[0]) / bounds.width * relmousepos.x + t.x[0],
                y: (t.y[1] - t.y[0]) / bounds.height * relmousepos.y + t.y[0]
            },
            rotation: {
                x: (r.x[1] - r.x[0]) / bounds.height * relmousepos.y + r.x[0],
                y: (r.y[1] - r.y[0]) / bounds.width * relmousepos.x + r.y[0]
            }
        };

        // Move the image wrap.
        TweenMax.to(this.DOM.imgWrap, 1.5, {
            ease: 'Power1.easeOut',
            x: transforms.translation.x,
            y: transforms.translation.y,
            rotationX: transforms.rotation.x,
            rotationY: transforms.rotation.y
        });

        // Move the texts wrap.
        TweenMax.to(this.DOM.texts.wrap, 1.5, {
            ease: 'Power1.easeOut',
            x: -1 * transforms.translation.x,
            y: -1 * transforms.translation.y
        });
    }
    // Positions one slide (left, right or current) in the viewport.
    position(pos) {
        TweenMax.set(this.DOM.imgWrap, {
            x: this.transforms[pos].x,
            y: this.transforms[pos].y,
            rotationX: 0,
            rotationY: 0,
            opacity: 1,
            rotationZ: this.transforms[pos].rotation,
        });
        
    }
    // Sets it as current.
    setCurrent() {
        this.isCurrent = true;
        this.DOM.el.classList.add('slide-current', 'slide-visible');
        // Position it on the currentÂ´s position.
        this.position(2);
    }
    // Position the slide on the left side.
    setLeft() {
        this.isRight = this.isCurrent = false;
        this.isLeft = true;
        this.DOM.el.classList.add('slide-visible', 'slide-left');
        // Position it on the left position.
        this.position(1);
    }
    // Position the slide on the right side.
    setRight() {
        this.isLeft = this.isCurrent = false;
        this.isRight = true;
        this.DOM.el.classList.add('slide-visible', 'slide-right');
        // Position it on the right position.
        this.position(3);
    }
    // Check if the slide is positioned on the right side (if itÂ´s the next slide in the slideshow).
    isPositionedRight() {
        return this.isRight;
    }
    // Check if the slide is positioned on the left side (if itÂ´s the previous slide in the slideshow).
    isPositionedLeft() {
        return this.isLeft;
    }
    // Check if the slide is the current one.
    isPositionedCenter() {
        return this.isCurrent;
    }
    // Reset classes and state.
    reset() {
        this.isRight = this.isLeft = this.isCurrent = false;
        //this.DOM.el.classList = 'slide';
        this.DOM.el.classList.remove('slide-current', 'slide-visible', 'slide-left', 'slide-right');
    }
    hide() {
        TweenMax.set(this.DOM.imgWrap, { x: 0, y: 0, rotationX: 0, rotationY: 0, rotationZ: 0, opacity: 0 });
    }
    // Moves a slide to a specific position defined in settings.position.
    // Also, moves it from position settings.from and if we need to reset the image scale when moving the slide then settings.resetImageScale should be true.
    moveToPosition(settings) {
        return new Promise((resolve, reject) => {
            /*
            Moves the slide to a specific position:
            -2: left top corner outside the viewport
            -1: left top corner (prev slide position)
            0: center (current slide position)
            1: right bottom corner (next slide position)
            2: right bottom corner outside the viewport
            3: left side, for when the content is shown
            */

            TweenMax.to(this.DOM.imgWrap, .8, {
                ease: Power4.easeInOut,
                delay: settings.delay || 0,
                startAt: settings.from !== undefined ? {
                    x: this.transforms[settings.from + 2].x,
                    y: this.transforms[settings.from + 2].y,
                    rotationX: 0,
                    rotationY: 0,
                    rotationZ: this.transforms[settings.from + 2].rotation,
                } : {},
                x: this.transforms[settings.position + 2].x,
                y: this.transforms[settings.position + 2].y,
                rotationX: 0,
                rotationY: 0,
                rotationZ: this.transforms[settings.position + 2].rotation,
                onStart: settings.from !== undefined ? () => TweenMax.set(this.DOM.imgWrap, { opacity: 1 }) : null,
                onComplete: resolve
            });
        });
    }
    // Hides the current slideÂ´s texts.
    hideTexts() {
        TweenMax.to(this.DOM.texts.wrap, 1, { 
            opacity: 0 
        });
    }
    // Shows the current slideÂ´s texts.
    showTexts() {
        TweenMax.to(this.DOM.texts.wrap, 1, {
            delay: 1,
            ease: Elastic.easeOut.config(1, 0.5),
            startAt: { x: '-10%', opacity: 0 },
            x: '0%',
            opacity: 1
        });
    }
}

// The Slideshow class.
class Slideshow {
    constructor(el) {
        this.DOM = { el: el };
        // The Categories
        this.categories = this.DOM.el.querySelector('.categories_filter');
        this.categoriesItems = $('.categories_filter a');
        // The navigation arrows
        this.navItems = $('.slideshow .nav');
        // The slides.
        this.slides = [];
        Array.from(this.DOM.el.querySelectorAll('.slide:not(.hidden)')).forEach(slideEl => this.slides.push(new Slide(slideEl)));
        // The total number of slides.
        this.slidesTotal = this.slides.length;
        // At least 4 slides to continue...
        if (this.slidesTotal == 1) {
            this.currentSlide = this.slides[0];
            this.currentSlide.setCurrent();
            this.currentSlide.showTexts(true);
            return false;
        }
        // Current slide position.
        this.current = 0;
        this.DOM.deco = this.DOM.el.querySelector('.slideshow_deco');

        // Set the current/next/previous slides. 
        this.render();
        this.currentSlide.showTexts(false);
        // Init/Bind events.
        this.initEvents();
    }
    render() {
        // The current, next, and previous slides.
        this.currentSlide = this.slides[this.current];
        this.nextSlide = this.slides[this.current + 1 <= this.slidesTotal - 1 ? this.current + 1 : 0];
        this.prevSlide = this.slides[this.current - 1 >= 0 ? this.current - 1 : this.slidesTotal - 1];
        this.currentSlide.setCurrent();
        this.nextSlide.setRight();
        this.prevSlide.setLeft();
    }
    initEvents() {
        var $this = this;

        // Clicking the next and previous slide starts the navigation / clicking the current shows its content..
        this.clickFn = (slide) => {
            if (slide.isPositionedRight()) {
                this.navigate('next');
            } else if (slide.isPositionedLeft()) {
                this.navigate('prev');
            } else {
                //this.showContent();
            }
        };
        this.categoryClickFn = (category) => {
            var $this = this;
            TweenLite.to('.slide', 1, {
                y: 80,
                autoAlpha: 0,
                ease: Power2.easeOut,
                onComplete: function () {
                    $this.destroy();
                    
                    $this.categories.querySelector('.active').classList.remove('active');
                    category.classList.add('active');

                    $('.slide').addClass('hidden');
                    $('.slide.category-' + category.id).removeClass('hidden');                        

                    new Slideshow(document.querySelector('.slideshow'));

                    TweenLite.to('.slide.category-' + category.id, 1, {
                        y: 0,
                        autoAlpha: 1,
                        ease: Power2.easeOut,
                        onComplete: function () {

                        }
                    });      
                }
            });
        };




        for (let slide of this.slides) {
            slide.DOM.imgWrap.addEventListener('click', () => this.clickFn(slide), true);
        }
        
        // $($this.categoriesItems).on('click.catFilter', function (ev) {
        //     $this.categoryClickFn(ev.target);
        // });
        $($this.navItems).on('click.navClick', function (ev) {
            if ($(this).hasClass('nav-prev')) {
                $('.slide-left .slide_img-wrap').trigger('click');
            }
            if ($(this).hasClass('nav-next')) {
                $('.slide-right .slide_img-wrap').trigger('click');
            }
        });

        this.resizeFn = () => {
            // Reposition the slides.
            this.nextSlide.setRight();
            this.prevSlide.setLeft();
            this.currentSlide.setCurrent();

            //Set categories at right place
            if ($(this.categories).length > 0) {
                var height = $('.slide:eq(0) > div').height() + 100;
                $(this.categories).css('margin-top', -height + 'px');
            }
        };

    
        $(window).on('resize.showResize', this.resizeFn);
        //window.addEventListener('resize', this.resizeFn, true);
    }
    destroy() {
        $(window).off('resize.showResize');
        //window.removeEventListener('resize', this.resizeFn);

        for (let slide of this.slides) {
            slide.removeEvents();
        }
        $(this.categoriesItems).off('click.catFilter');
        $(this.navItems).off('click.navClick');
    }

    // Animates the element behind the current slide.
    bounceDeco(direction, delay) {
        TweenMax.to(this.DOM.deco, .4, {
            ease: 'Power2.easeIn',
            delay: delay + delay * 0.2,
            marginLeft: direction === 'next' ? 40 : -40,
            marginTop: direction === 'next' ? 40 : -40,
            onComplete: () => {
                TweenMax.to(this.DOM.deco, 0.6, {
                    ease: 'Power2.easeOut',
                    marginLeft: 0,
                    marginTop: 0,
                });
            }
        });
    }
    // Navigate the slideshow.
    navigate(direction) {
        // If animating return.
        if (this.isAnimating) return;
        this.isAnimating = true;
        allowTilt = false;


        const upcomingPos = direction === 'next' ?
            this.current < this.slidesTotal - 2 ? this.current + 2 : Math.abs(this.slidesTotal - 2 - this.current) :
            this.current >= 2 ? this.current - 2 : Math.abs(this.slidesTotal - 2 + this.current);

        this.upcomingSlide = this.slides[upcomingPos];
        
        // Update current.
        this.current = direction === 'next' ?
            this.current < this.slidesTotal - 1 ? this.current + 1 : 0 :
            this.current > 0 ? this.current - 1 : this.slidesTotal - 1;

        // Move slides (the previous, current, next and upcoming slide).
        this.prevSlide.moveToPosition({ position: direction === 'next' ? -2 : 0, delay: direction === 'next' ? 0 : 0.14 }).then(() => {
            if (direction === 'next') {
                this.prevSlide.hide();
            }
        });

        this.currentSlide.moveToPosition({ position: direction === 'next' ? -1 : 1, delay: 0.07 });
        this.currentSlide.hideTexts();

        this.bounceDeco(direction, 0.07);

        this.nextSlide.moveToPosition({ position: direction === 'next' ? 0 : 2, delay: direction === 'next' ? 0.14 : 0 }).then(() => {
            if (direction === 'prev') {
                this.nextSlide.hide();
            }
        });

        if (direction === 'next') {
            this.nextSlide.showTexts();
        }else {
            this.prevSlide.showTexts();
        }

        this.upcomingSlide.moveToPosition({ position: direction === 'next' ? 1 : -1, from: direction === 'next' ? 2 : -2, delay: 0.21 }).then(() => {
            // Reset classes.
            [this.nextSlide, this.currentSlide, this.prevSlide].forEach(slide => slide.reset());
            this.render();
            allowTilt = true;
            this.isAnimating = false;
        });
    }
}


function initNewsSlider(){
    if ($('.slideshow').length > 0) {
        const slideshow = new Slideshow(document.querySelector('.slideshow'));
        //document.querySelector('.categories_filter a.active').click();
    }
}