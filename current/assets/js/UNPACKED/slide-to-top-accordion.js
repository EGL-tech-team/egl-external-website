/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work?
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */ (function ($) {

	var $event = $.event,
		$special,
		resizeTimeout;

	$special = $event.special.debouncedresize = {
		setup: function () {
			$(this).on("resize", $special.handler);
		},
		teardown: function () {
			$(this).off("resize", $special.handler);
		},
		handler: function (event, execAsap) {
			// Save the context
			var context = this,
				args = arguments,
				dispatch = function () {
					// set correct event type
					event.type = "debouncedresize";
					$event.dispatch.apply(context, args);
				};

			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}

			execAsap ?
				dispatch() :
				resizeTimeout = setTimeout(dispatch, $special.threshold);
		},
		threshold: 150
	};

})(jQuery);

/* __________________ Slide To Top Accordion __________________*/
/* http://tympanus.net/Tutorials/FlexibleSlideToTopAccordion/ â€¢ fixes: http://jsfiddle.net/ruwjn/7/ added + custom fixes and class names
smartresize: debounced resize event for jQuerylatest version and complete README available on Github: https://github.com/louisremi/jquery.smartresize.js
Copyright 2011 @louis_remi / Licensed under the MIT license.*/
(function (d, e, f) {
	e.Accordion = function (g, h) {
		this.$el = e(h);
		this.$items = this.$el.children("ul").children("li.st-content-wrapper");
		this.itemsCount = this.$items.length;
		this._init(g)
	};
	e.Accordion.defaults = {
		open: -1,
		oneOpenedItem: false,
		speed: 600,
		easing: "easeInOutExpo",
		scrollSpeed: 900,
		scrollEasing: "easeInOutExpo"
	};
	e.Accordion.prototype = {
		_init: function (g) {
			this.options = e.extend(true, {}, e.Accordion.defaults, g);
			this._validate();
			this.current = this.options.open;
			this.$items.find("div.st-content").hide();
			this._saveDimValues();
			if (this.current != -1) {
				this._toggleItem(this.$items.eq(this.current))
			}
			this._initEvents()
		},
		_saveDimValues: function () {
			scrollOffset = this.options.scrollOffset;
			this.$items.each(function () {
				var g = e(this);
				g.data({
					originalHeight: g.find("a:first").height(),
					offsetTop: g.offset().top - scrollOffset
				})
			})
		},
		_validate: function () {
			if (this.options.open < -1 || this.options.open > this.itemsCount - 1) {
				this.options.open = -1
			}
		},
		_initEvents: function () {
			var g = this;
			this.$items.find("a:first").bind("click.slideaccordion", function (i) {
				var h = e(this).parent();
				if (g.options.oneOpenedItem && g._isOpened() && g.current !== h.index()) {
					g._toggleItem(g.$items.eq(g.current))
				}
				g._toggleItem(h);
				return false
			});
			e(d).bind("smartresize.slideaccordion", function (h) {
				g._saveDimValues();
				g.$el.find("li.st-open").each(function () {
					var i = e(this);
					i.css("height", i.data("originalHeight") + i.find("div.st-content").outerHeight(true))
				});
				if (g._isOpened()) {
					g._scroll()
				}
			})
		},
		_isOpened: function () {
			return (this.$el.find("li.st-open").length > 0)
		},
		_toggleItem: function (g) {
			var h = g.find("div.st-content");
			(g.hasClass("st-open")) ? (this.current = -1, h.stop(true, true).fadeOut(this.options.speed), g.removeClass("st-open").stop().animate({
				height: g.data("originalHeight")
			}, this.options.speed, this.options.easing)) : (this.current = g.index(), h.stop(true, true).fadeIn(this.options.speed), g.addClass("st-open").stop().animate({
				height: g.data("originalHeight") + h.outerHeight(true)
			}, this.options.speed, this.options.easing), this._scroll(this))
		},
		_scroll: function (g) {
			var g = g || this,
				h;
			(g.current !== -1) ? h = g.current : h = g.$el.find("li.st-open:last").index();
			e("html, body").stop().animate({
				scrollTop: (g.options.oneOpenedItem) ? g.$items.eq(h).data("offsetTop") : g.$items.eq(h).offset().top
			}, g.options.scrollSpeed, g.options.scrollEasing)
		}
	};
	var b = function (g) {
		if (this.console) {
			console.error(g)
		}
	};
	e.fn.slideaccordion = function (h) {
		if (typeof h === "string") {
			var g = Array.prototype.slice.call(arguments, 1);
			this.each(function () {
				var i = e.data(this, "slideaccordion");
				if (!i) {
					b("cannot call methods on slideaccordion prior to initialization; attempted to call method '" + h + "'");
					return
				}
				if (!e.isFunction(i[h]) || h.charAt(0) === "_") {
					b("no such method '" + h + "' for slideaccordion instance");
					return
				}
				i[h].apply(i, g)
			})
		} else {
			this.each(function () {
				var i = e.data(this, "slideaccordion");
				if (!i) {
					e.data(this, "slideaccordion", new e.Accordion(h, this))
				}
			})
		}
		return this
	}
})(window, jQuery);

/*================================================================*/
/*  SLIDE TO TOP ACCORDION
/*================================================================*/
//all closed
$(document).ready(function () {
	$('.slide-to-top.all-closed').slideaccordion({
		oneOpenedItem: true,
		scrollOffset: 0,
		open: -1 // 0 = first pane is open / -1 all are closed
	});
});

//initialize FIRST OPEN
$(document).ready(function () {
	$('.slide-to-top.first-pane-open').slideaccordion({
		oneOpenedItem: true,
		scrollOffset: 0,
		open: 0 // 0 = first pane is open / -1 all are closed
	});
});