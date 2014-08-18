// new cbpScroller(document.getElementById('about'));


;(function(window){
    'use strict';

    var docElem = window.document.documentElement;

    function getViewportH() {
        var client = docElem['clientHeight'],
            inner = window['innerHeight'];

        if(client < inner)
            return inner;
        else
            return client;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    // http://stackoverflow.com/a/5598797/989439
    function getOffset(el) {
        var offsetTop = 0, offsetLeft = 0;
        do {
            if (!isNaN(el.offsetTop)) {
                offsetTop += el.offsetTop;
            }
            if (!isNaN(el.offsetLeft)) {
                offsetLeft += el.offsetLeft;
            }
        } while(el = el.offsetParent)

        return {
            top : offsetTop,
            left : offsetLeft
        }
    }

    function inViewport(el, h) {
        var elH = el.offsetHeight,
            scrolled = scrollY(),
            viewed = scrolled + getViewportH(),
            elTop = getOffset(el).top,
            elBottom = elTop + elH,
            // if 0, the element is considered in the viewport as soon as it enters.
            // if 1, the element is considered in the viewport only when it's fully inside
            // value in percentage (1 >= h >= 0)
            h = h || 0;

        return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
    }

    function extend(a, b) {
        for(var key in b) {
            if(b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function cbpScroller(el, options) {
        this.el = el;
        this.options = extend(this.defaults, options);
        this._init();
    }

    cbpScroller.prototype = {
        defaults : {
            // The viewportFactor defines how much of the appearing item has to be visible in order to trigger the animation
            // if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport.
            // If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
            viewportFactor : 0.2
        },
        _init : function() {
            if(Modernizr.touch) return;
            this.sections = Array.prototype.slice.call(this.el.querySelectorAll('.animated'));
            this.didScroll = false;

            var self = this;

            var scrollHandler = function() {
                    if(!self.didScroll) {
                        self.didScroll = true;
                        setTimeout(function() { self._scrollPage(); }, 60);
                    }
                },
                resizeHandler = function() {
                    function delayed() {
                        self._scrollPage();
                        self.resizeTimeout = null;
                    }
                    if (self.resizeTimeout) {
                        clearTimeout(self.resizeTimeout);
                    }
                    self.resizeTimeout = setTimeout(delayed, 200);
                };

            window.addEventListener('scroll', scrollHandler, false);
            window.addEventListener('resize', resizeHandler, false);
        },
        _scrollPage : function() {
            var self = this;

            this.sections.forEach(function(el, i) {
                if(inViewport(el, self.options.viewportFactor)) {
                    classie.add(el, 'appeared');

                    if (classie.has(el, 'fade-in-left')) {
                        classie.add(el, 'fadeInLeft');
                    } else if (classie.has(el, 'fade-in-right')) {
                        classie.add(el, 'fadeInRight');
                    } else if (classie.has(el, 'fade-in-up')) {
                        classie.add(el, 'fadeInUp');
                    } else if (classie.has(el, 'fade-in')) {
                        classie.add(el, 'fadeIn');
                    } else if (classie.has(el, 'fade-in-down')) {
                        classie.add(el, 'fadeInDown');
                    }
                }
            });
            this.didScroll = false;
        }
    }

    // add to global namespace
    window.cbpScroller = cbpScroller;

})(window);