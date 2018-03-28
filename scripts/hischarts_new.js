(function() {
    var method;
    var noop = function() {};
    var methods = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = noop
        }
    }
} ());
if ("undefined" == typeof jQuery) {
    throw new Error("Bootstrap's JavaScript requires jQuery")
} +
function(a) {
    function b() {
        var a = document.createElement("bootstrap"),
        b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b) {
            if (void 0 !== a.style[c]) {
                return {
                    end: b[c]
                }
            }
        }
        return ! 1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
        d = this;
        a(this).one(a.support.transition.end,
        function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b),
        this
    },
    a(function() {
        a.support.transition = b()
    })
} (jQuery),
+
function(a) {
    var b = '[data-dismiss="alert"]',
    c = function(c) {
        a(c).on("click", b, this.close)
    };
    c.prototype.close = function(b) {
        function c() {
            f.trigger("closed.bs.alert").remove()
        }
        var d = a(this),
        e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(),
        f.length || (f = d.hasClass("alert") ? d: d.parent()),
        f.trigger(b = a.Event("close.bs.alert")),
        b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c())
    };
    var d = a.fn.alert;
    a.fn.alert = function(b) {
        return this.each(function() {
            var d = a(this),
            e = d.data("bs.alert");
            e || d.data("bs.alert", e = new c(this)),
            "string" == typeof b && e[b].call(d)
        })
    },
    a.fn.alert.Constructor = c,
    a.fn.alert.noConflict = function() {
        return a.fn.alert = d,
        this
    },
    a(document).on("click.bs.alert.data-api", b, c.prototype.close)
} (jQuery),
+
function(a) {
    var b = function(c, d) {
        this.$element = a(c),
        this.options = a.extend({},
        b.DEFAULTS, d),
        this.isLoading = !1
    };
    b.DEFAULTS = {
        loadingText: "loading..."
    },
    b.prototype.setState = function(b) {
        var c = "disabled",
        d = this.$element,
        e = d.is("input") ? "val": "html",
        f = d.data();
        b += "Text",
        f.resetText || d.data("resetText", d[e]()),
        d[e](f[b] || this.options[b]),
        setTimeout(a.proxy(function() {
            "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        },
        this), 0)
    },
    b.prototype.toggle = function() {
        var a = !0,
        b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")),
            a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        a && this.$element.toggleClass("active")
    };
    var c = a.fn.button;
    a.fn.button = function(c) {
        return this.each(function() {
            var d = a(this),
            e = d.data("bs.button"),
            f = "object" == typeof c && c;
            e || d.data("bs.button", e = new b(this, f)),
            "toggle" == c ? e.toggle() : c && e.setState(c)
        })
    },
    a.fn.button.Constructor = b,
    a.fn.button.noConflict = function() {
        return a.fn.button = c,
        this
    },
    a(document).on("click.bs.button.data-api", "[data-toggle^=button]",
    function(b) {
        var c = a(b.target);
        c.hasClass("btn") || (c = c.closest(".btn")),
        c.button("toggle"),
        b.preventDefault()
    })
} (jQuery),
+
function(a) {
    var b = function(b, c) {
        this.$element = a(b),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = c,
        this.paused = this.sliding = this.interval = this.$active = this.$items = null,
        "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.DEFAULTS = {
        interval: 5000,
        pause: "hover",
        wrap: !0
    },
    b.prototype.cycle = function(b) {
        return b || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)),
        this
    },
    b.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"),
        this.$items = this.$active.parent().children(),
        this.$items.index(this.$active)
    },
    b.prototype.to = function(b) {
        var c = this,
        d = this.getActiveIndex();
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel",
        function() {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next": "prev", a(this.$items[b]))
    },
    b.prototype.pause = function(b) {
        return b || (this.paused = !0),
        this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    },
    b.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    },
    b.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    },
    b.prototype.slide = function(b, c) {
        var d = this.$element.find(".item.active"),
        e = c || d[b](),
        f = this.interval,
        g = "next" == b ? "left": "right",
        h = "next" == b ? "first": "last",
        i = this;
        if (!e.length) {
            if (!this.options.wrap) {
                return
            }
            e = this.$element.find(".item")[h]()
        }
        if (e.hasClass("active")) {
            return this.sliding = !1
        }
        var j = a.Event("slide.bs.carousel", {
            relatedTarget: e[0],
            direction: g
        });
        return this.$element.trigger(j),
        j.isDefaultPrevented() ? void 0 : (this.sliding = !0, f && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel",
        function() {
            var b = a(i.$indicators.children()[i.getActiveIndex()]);
            b && b.addClass("active")
        })), a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end,
        function() {
            e.removeClass([b, g].join(" ")).addClass("active"),
            d.removeClass(["active", g].join(" ")),
            i.sliding = !1,
            setTimeout(function() {
                i.$element.trigger("slid.bs.carousel")
            },
            0)
        }).emulateTransitionEnd(1000 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), f && this.cycle(), this)
    };
    var c = a.fn.carousel;
    a.fn.carousel = function(c) {
        return this.each(function() {
            var d = a(this),
            e = d.data("bs.carousel"),
            f = a.extend({},
            b.DEFAULTS, d.data(), "object" == typeof c && c),
            g = "string" == typeof c ? c: f.slide;
            e || d.data("bs.carousel", e = new b(this, f)),
            "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    },
    a.fn.carousel.Constructor = b,
    a.fn.carousel.noConflict = function() {
        return a.fn.carousel = c,
        this
    },
    a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]",
    function(b) {
        var c, d = a(this),
        e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")),
        f = a.extend({},
        e.data(), d.data()),
        g = d.attr("data-slide-to");
        g && (f.interval = !1),
        e.carousel(f),
        (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g),
        b.preventDefault()
    }),
    a(window).on("load",
    function() {
        a('[data-ride="carousel"]').each(function() {
            var b = a(this);
            b.carousel(b.data())
        })
    })
} (jQuery),
+
function(a) {
    var b = function(c, d) {
        this.$element = a(c),
        this.options = a.extend({},
        b.DEFAULTS, d),
        this.transitioning = null,
        this.options.parent && (this.$parent = a(this.options.parent)),
        this.options.toggle && this.toggle()
    };
    b.DEFAULTS = {
        toggle: !0
    },
    b.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width": "height"
    },
    b.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b = a.Event("show.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.$parent && this.$parent.find("> .panel > .in");
                if (c && c.length) {
                    var d = c.data("bs.collapse");
                    if (d && d.transitioning) {
                        return
                    }
                    c.collapse("hide"),
                    d || c.data("bs.collapse", null)
                }
                var e = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[e](0),
                this.transitioning = 1;
                var f = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),
                    this.transitioning = 0,
                    this.$element.trigger("shown.bs.collapse")
                };
                if (!a.support.transition) {
                    return f.call(this)
                }
                var g = a.camelCase(["scroll", e].join("-"));
                this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g])
            }
        }
    },
    b.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),
                this.transitioning = 1;
                var d = function() {
                    this.transitioning = 0,
                    this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return a.support.transition ? void this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
            }
        }
    },
    b.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide": "show"]()
    };
    var c = a.fn.collapse;
    a.fn.collapse = function(c) {
        return this.each(function() {
            var d = a(this),
            e = d.data("bs.collapse"),
            f = a.extend({},
            b.DEFAULTS, d.data(), "object" == typeof c && c); ! e && f.toggle && "show" == c && (c = !c),
            e || d.data("bs.collapse", e = new b(this, f)),
            "string" == typeof c && e[c]()
        })
    },
    a.fn.collapse.Constructor = b,
    a.fn.collapse.noConflict = function() {
        return a.fn.collapse = c,
        this
    },
    a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]",
    function(b) {
        var c, d = a(this),
        e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""),
        f = a(e),
        g = f.data("bs.collapse"),
        h = g ? "toggle": d.data(),
        i = d.attr("data-parent"),
        j = i && a(i);
        g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass": "removeClass"]("collapsed")),
        f.collapse(h)
    })
} (jQuery),
+
function(a) {
    function b(b) {
        a(d).remove(),
        a(e).each(function() {
            var d = c(a(this)),
            e = {
                relatedTarget: this
            };
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e))
        })
    }
    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d: b.parent()
    }
    var d = ".dropdown-backdrop",
    e = "[data-toggle=dropdown2]",
    f = function(b) {
        a(b).on("click.bs.dropdown", this.toggle)
    };
    f.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
            g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) {
                    return
                }
                f.toggleClass("open").trigger("shown.bs.dropdown", h),
                e.focus()
            }
            return ! 1
        }
    },
    f.prototype.keydown = function(b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var f = c(d),
                g = f.hasClass("open");
                if (!g || g && 27 == b.keyCode) {
                    return 27 == b.which && f.find(e).focus(),
                    d.click()
                }
                var h = " li:not(.divider):visible a",
                i = f.find("[role=menu]" + h + ", [role=listbox]" + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--,
                    40 == b.keyCode && j < i.length - 1 && j++,
                    ~j || (j = 0),
                    i.eq(j).focus()
                }
            }
        }
    };
    var g = a.fn.dropdown;
    a.fn.dropdown = function(b) {
        return this.each(function() {
            var c = a(this),
            d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new f(this)),
            "string" == typeof b && d[b].call(c)
        })
    },
    a.fn.dropdown.Constructor = f,
    a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = g,
        this
    },
    a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form",
    function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu], [role=listbox]", f.prototype.keydown)
} (jQuery),
+
function(a) {
    var b = function(b, c) {
        this.options = c,
        this.$element = a(b),
        this.$backdrop = this.isShown = null,
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        },
        this))
    };
    b.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    b.prototype.toggle = function(a) {
        return this[this.isShown ? "hide": "show"](a)
    },
    b.prototype.show = function(b) {
        var c = this,
        d = a.Event("show.bs.modal", {
            relatedTarget: b
        });
        this.$element.trigger(d),
        this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function() {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(document.body),
            c.$element.show().scrollTop(0),
            d && c.$element[0].offsetWidth,
            c.$element.addClass("in").attr("aria-hidden", !1),
            c.enforceFocus();
            var e = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            d ? c.$element.find(".modal-dialog").one(a.support.transition.end,
            function() {
                c.$element.focus().trigger(e)
            }).emulateTransitionEnd(300) : c.$element.focus().trigger(e)
        }))
    },
    b.prototype.hide = function(b) {
        b && b.preventDefault(),
        b = a.Event("hide.bs.modal"),
        this.$element.trigger(b),
        this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    },
    b.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
        },
        this))
    },
    b.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        },
        this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    },
    b.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(),
        this.backdrop(function() {
            a.removeBackdrop(),
            a.$element.trigger("hidden.bs.modal")
        })
    },
    b.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null
    },
    b.prototype.backdrop = function(b) {
        var c = this.$element.hasClass("fade") ? "fade": "";
        if (this.isShown && this.options.backdrop) {
            var d = a.support.transition && c;
            if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            },
            this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) {
                return
            }
            d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
        } else { ! this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
        }
    };
    var c = a.fn.modal;
    a.fn.modal = function(c, d) {
        return this.each(function() {
            var e = a(this),
            f = e.data("bs.modal"),
            g = a.extend({},
            b.DEFAULTS, e.data(), "object" == typeof c && c);
            f || e.data("bs.modal", f = new b(this, g)),
            "string" == typeof c ? f[c](d) : g.show && f.show(d)
        })
    },
    a.fn.modal.Constructor = b,
    a.fn.modal.noConflict = function() {
        return a.fn.modal = c,
        this
    },
    a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]',
    function(b) {
        var c = a(this),
        d = c.attr("href"),
        e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")),
        f = e.data("bs.modal") ? "toggle": a.extend({
            remote: !/#/.test(d) && d
        },
        e.data(), c.data());
        c.is("a") && b.preventDefault(),
        e.modal(f, this).one("hide",
        function() {
            c.is(":visible") && c.focus()
        })
    }),
    a(document).on("show.bs.modal", ".modal",
    function() {
        a(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal",
    function() {
        a(document.body).removeClass("modal-open")
    })
} (jQuery),
+
function(a) {
    var b = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null,
        this.init("tooltip", a, b)
    };
    b.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    },
    b.prototype.init = function(b, c, d) {
        this.enabled = !0,
        this.type = b,
        this.$element = a(c),
        this.options = this.getOptions(d);
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) {
                this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this))
            } else {
                if ("manual" != g) {
                    var h = "hover" == g ? "mouseenter": "focusin",
                    i = "hover" == g ? "mouseleave": "focusout";
                    this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)),
                    this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
                }
            }
        }
        this.options.selector ? this._options = a.extend({},
        this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    },
    b.prototype.getDefaults = function() {
        return b.DEFAULTS
    },
    b.prototype.getOptions = function(b) {
        return b = a.extend({},
        this.getDefaults(), this.$element.data(), b),
        b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }),
        b
    },
    b.prototype.getDelegateOptions = function() {
        var b = {},
        c = this.getDefaults();
        return this._options && a.each(this._options,
        function(a, d) {
            c[a] != d && (b[a] = d)
        }),
        b
    },
    b.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b: a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout),
        c.hoverState = "in",
        c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        },
        c.options.delay.show)) : c.show()
    },
    b.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b: a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout),
        c.hoverState = "out",
        c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        },
        c.options.delay.hide)) : c.hide()
    },
    b.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(b), b.isDefaultPrevented()) {
                return
            }
            var c = this,
            d = this.tip();
            this.setContent(),
            this.options.animation && d.addClass("fade");
            var e = "function" == typeof this.options.placement ? this.options.placement.call(this, d[0], this.$element[0]) : this.options.placement,
            f = /\s?auto?\s?/i,
            g = f.test(e);
            g && (e = e.replace(f, "") || "top"),
            d.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(e),
            this.options.container ? d.appendTo(this.options.container) : d.insertAfter(this.$element);
            var h = this.getPosition(),
            i = d[0].offsetWidth,
            j = d[0].offsetHeight;
            if (g) {
                var k = this.$element.parent(),
                l = e,
                m = document.documentElement.scrollTop || document.body.scrollTop,
                n = "body" == this.options.container ? window.innerWidth: k.outerWidth(),
                o = "body" == this.options.container ? window.innerHeight: k.outerHeight(),
                p = "body" == this.options.container ? 0 : k.offset().left;
                e = "bottom" == e && h.top + h.height + j - m > o ? "top": "top" == e && h.top - m - j < 0 ? "bottom": "right" == e && h.right + i > n ? "left": "left" == e && h.left - i < p ? "right": e,
                d.removeClass(l).addClass(e)
            }
            var q = this.getCalculatedOffset(e, h, i, j);
            this.applyPlacement(q, e),
            this.hoverState = null;
            var r = function() {
                c.$element.trigger("shown.bs." + c.type)
            };
            a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, r).emulateTransitionEnd(150) : r()
        }
    },
    b.prototype.applyPlacement = function(b, c) {
        var d, e = this.tip(),
        f = e[0].offsetWidth,
        g = e[0].offsetHeight,
        h = parseInt(e.css("margin-top"), 10),
        i = parseInt(e.css("margin-left"), 10);
        isNaN(h) && (h = 0),
        isNaN(i) && (i = 0),
        b.top = b.top + h,
        b.left = b.left + i,
        a.offset.setOffset(e[0], a.extend({
            using: function(a) {
                e.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        },
        b), 0),
        e.addClass("in");
        var j = e[0].offsetWidth,
        k = e[0].offsetHeight;
        if ("top" == c && k != g && (d = !0, b.top = b.top + g - k), /bottom|top/.test(c)) {
            var l = 0;
            b.left < 0 && (l = -2 * b.left, b.left = 0, e.offset(b), j = e[0].offsetWidth, k = e[0].offsetHeight),
            this.replaceArrow(l - f + j, j, "left")
        } else {
            this.replaceArrow(k - g, k, "top")
        }
        d && e.offset(b)
    },
    b.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%": "")
    },
    b.prototype.setContent = function() {
        var a = this.tip(),
        b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html": "text"](b),
        a.removeClass("fade in top bottom left right")
    },
    b.prototype.hide = function() {
        function b() {
            "in" != c.hoverState && d.detach(),
            c.$element.trigger("hidden.bs." + c.type)
        }
        var c = this,
        d = this.tip(),
        e = a.Event("hide.bs." + this.type);
        return this.$element.trigger(e),
        e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.hoverState = null, this)
    },
    b.prototype.fixTitle = function() {
        var a = this.$element; (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    },
    b.prototype.hasContent = function() {
        return this.getTitle()
    },
    b.prototype.getPosition = function() {
        var b = this.$element[0];
        return a.extend({},
        "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
            width: b.offsetWidth,
            height: b.offsetHeight
        },
        this.$element.offset())
    },
    b.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        }: "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        }: "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        }: {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    },
    b.prototype.getTitle = function() {
        var a, b = this.$element,
        c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    },
    b.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    },
    b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    },
    b.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    },
    b.prototype.enable = function() {
        this.enabled = !0
    },
    b.prototype.disable = function() {
        this.enabled = !1
    },
    b.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    },
    b.prototype.toggle = function(b) {
        var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    },
    b.prototype.destroy = function() {
        clearTimeout(this.timeout),
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function(c) {
        return this.each(function() {
            var d = a(this),
            e = d.data("bs.tooltip"),
            f = "object" == typeof c && c; (e || "destroy" != c) && (e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]())
        })
    },
    a.fn.tooltip.Constructor = b,
    a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = c,
        this
    }
} (jQuery),
+
function(a) {
    var b = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) {
        throw new Error("Popover requires tooltip.js")
    }
    b.DEFAULTS = a.extend({},
    a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    b.prototype = a.extend({},
    a.fn.tooltip.Constructor.prototype),
    b.prototype.constructor = b,
    b.prototype.getDefaults = function() {
        return b.DEFAULTS
    },
    b.prototype.setContent = function() {
        var a = this.tip(),
        b = this.getTitle(),
        c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html": "text"](b),
        a.find(".popover-content")[this.options.html ? "string" == typeof c ? "html": "append": "text"](c),
        a.removeClass("fade top bottom left right in"),
        a.find(".popover-title").html() || a.find(".popover-title").hide()
    },
    b.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    },
    b.prototype.getContent = function() {
        var a = this.$element,
        b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    },
    b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    },
    b.prototype.tip = function() {
        return this.$tip || (this.$tip = a(this.options.template)),
        this.$tip
    };
    var c = a.fn.popover;
    a.fn.popover = function(c) {
        return this.each(function() {
            var d = a(this),
            e = d.data("bs.popover"),
            f = "object" == typeof c && c; (e || "destroy" != c) && (e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]())
        })
    },
    a.fn.popover.Constructor = b,
    a.fn.popover.noConflict = function() {
        return a.fn.popover = c,
        this
    }
} (jQuery),
+
function(a) {
    function b(c, d) {
        var e, f = a.proxy(this.process, this);
        this.$element = a(a(c).is("body") ? window: c),
        this.$body = a("body"),
        this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f),
        this.options = a.extend({},
        b.DEFAULTS, d),
        this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a",
        this.offsets = a([]),
        this.targets = a([]),
        this.activeTarget = null,
        this.refresh(),
        this.process()
    }
    b.DEFAULTS = {
        offset: 10
    },
    b.prototype.refresh = function() {
        var b = this.$element[0] == window ? "offset": "position";
        this.offsets = a([]),
        this.targets = a([]);
        var c = this;
        this.$body.find(this.selector).map(function() {
            var d = a(this),
            e = d.data("target") || d.attr("href"),
            f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [[f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            c.offsets.push(this[0]),
            c.targets.push(this[1])
        })
    },
    b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
        c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
        d = c - this.$scrollElement.height(),
        e = this.offsets,
        f = this.targets,
        g = this.activeTarget;
        if (b >= d) {
            return g != (a = f.last()[0]) && this.activate(a)
        }
        if (g && b <= e[0]) {
            return g != (a = f[0]) && this.activate(a)
        }
        for (a = e.length; a--;) {
            g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
        }
    },
    b.prototype.activate = function(b) {
        this.activeTarget = b,
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
        d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")),
        d.trigger("activate.bs.scrollspy")
    };
    var c = a.fn.scrollspy;
    a.fn.scrollspy = function(c) {
        return this.each(function() {
            var d = a(this),
            e = d.data("bs.scrollspy"),
            f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)),
            "string" == typeof c && e[c]()
        })
    },
    a.fn.scrollspy.Constructor = b,
    a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = c,
        this
    },
    a(window).on("load",
    function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            b.scrollspy(b.data())
        })
    })
} (jQuery),
+
function(a) {
    var b = function(b) {
        this.element = a(b)
    };
    b.prototype.show = function() {
        var b = this.element,
        c = b.closest("ul:not(.dropdown-menu)"),
        d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0],
            f = a.Event("show.bs.tab", {
                relatedTarget: e
            });
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.parent("li"), c),
                this.activate(g, g.parent(),
                function() {
                    b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e
                    })
                })
            }
        }
    },
    b.prototype.activate = function(b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),
            b.addClass("active"),
            g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"),
            b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"),
            d && d()
        }
        var f = c.find("> .active"),
        g = d && a.support.transition && f.hasClass("fade");
        g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(),
        f.removeClass("in")
    };
    var c = a.fn.tab;
    a.fn.tab = function(c) {
        return this.each(function() {
            var d = a(this),
            e = d.data("bs.tab");
            e || d.data("bs.tab", e = new b(this)),
            "string" == typeof c && e[c]()
        })
    },
    a.fn.tab.Constructor = b,
    a.fn.tab.noConflict = function() {
        return a.fn.tab = c,
        this
    },
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]',
    function(b) {
        b.preventDefault(),
        a(this).tab("show")
    })
} (jQuery),
+
function(a) {
    var b = function(c, d) {
        this.options = a.extend({},
        b.DEFAULTS, d),
        this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = a(c),
        this.affixed = this.unpin = this.pinnedOffset = null,
        this.checkPosition()
    };
    b.RESET = "affix affix-top affix-bottom",
    b.DEFAULTS = {
        offset: 0
    },
    b.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) {
            return this.pinnedOffset
        }
        this.$element.removeClass(b.RESET).addClass("affix");
        var a = this.$window.scrollTop(),
        c = this.$element.offset();
        return this.pinnedOffset = c.top - a
    },
    b.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    },
    b.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var c = a(document).height(),
            d = this.$window.scrollTop(),
            e = this.$element.offset(),
            f = this.options.offset,
            g = f.top,
            h = f.bottom;
            "top" == this.affixed && (e.top += d),
            "object" != typeof f && (h = g = f),
            "function" == typeof g && (g = f.top(this.$element)),
            "function" == typeof h && (h = f.bottom(this.$element));
            var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom": null != g && g >= d ? "top": !1;
            if (this.affixed !== i) {
                this.unpin && this.$element.css("top", "");
                var j = "affix" + (i ? "-" + i: ""),
                k = a.Event(j + ".bs.affix");
                this.$element.trigger(k),
                k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), "bottom" == i && this.$element.offset({
                    top: c - h - this.$element.height()
                }))
            }
        }
    };
    var c = a.fn.affix;
    a.fn.affix = function(c) {
        return this.each(function() {
            var d = a(this),
            e = d.data("bs.affix"),
            f = "object" == typeof c && c;
            e || d.data("bs.affix", e = new b(this, f)),
            "string" == typeof c && e[c]()
        })
    },
    a.fn.affix.Constructor = b,
    a.fn.affix.noConflict = function() {
        return a.fn.affix = c,
        this
    },
    a(window).on("load",
    function() {
        a('[data-spy="affix"]').each(function() {
            var b = a(this),
            c = b.data();
            c.offset = c.offset || {},
            c.offsetBottom && (c.offset.bottom = c.offsetBottom),
            c.offsetTop && (c.offset.top = c.offsetTop),
            b.affix(c)
        })
    })
} (jQuery); !
function(a) {
    var b = function() {
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
            },
            isBlankString: function(a) {
                return ! a || /^\s*$/.test(a)
            },
            escapeRegExChars: function(a) {
                return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            },
            isString: function(a) {
                return "string" == typeof a
            },
            isNumber: function(a) {
                return "number" == typeof a
            },
            isArray: a.isArray,
            isFunction: a.isFunction,
            isObject: a.isPlainObject,
            isUndefined: function(a) {
                return "undefined" == typeof a
            },
            toStr: function(a) {
                return b.isUndefined(a) || null === a ? "": a + ""
            },
            bind: a.proxy,
            each: function(b, c) {
                function d(a, b) {
                    return c(b, a)
                }
                a.each(b, d)
            },
            map: a.map,
            filter: a.grep,
            every: function(b, c) {
                var d = !0;
                return b ? (a.each(b,
                function(a, e) {
                    return (d = c.call(null, e, a, b)) ? void 0 : !1
                }), !!d) : d
            },
            some: function(b, c) {
                var d = !1;
                return b ? (a.each(b,
                function(a, e) {
                    return (d = c.call(null, e, a, b)) ? !1 : void 0
                }), !!d) : d
            },
            mixin: a.extend,
            getUniqueId: function() {
                var a = 0;
                return function() {
                    return a++
                }
            } (),
            templatify: function(b) {
                function c() {
                    return String(b)
                }
                return a.isFunction(b) ? b: c
            },
            defer: function(a) {
                setTimeout(a, 0)
            },
            debounce: function(a, b, c) {
                var d, e;
                return function() {
                    var f, g, h = this,
                    i = arguments;
                    return f = function() {
                        d = null,
                        c || (e = a.apply(h, i))
                    },
                    g = c && !d,
                    clearTimeout(d),
                    d = setTimeout(f, b),
                    g && (e = a.apply(h, i)),
                    e
                }
            },
            throttle: function(a, b) {
                var c, d, e, f, g, h;
                return g = 0,
                h = function() {
                    g = new Date,
                    e = null,
                    f = a.apply(c, d)
                },
                function() {
                    var i = new Date,
                    j = b - (i - g);
                    return c = this,
                    d = arguments,
                    0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)),
                    f
                }
            },
            noop: function() {}
        }
    } (),
    c = "0.10.4",
    d = function() {
        function a(a) {
            return a = b.toStr(a),
            a ? a.split(/\s+/) : []
        }
        function c(a) {
            return a = b.toStr(a),
            a ? a.split(/\W+/) : []
        }
        function d(a) {
            return function() {
                var c = [].slice.call(arguments, 0);
                return function(d) {
                    var e = [];
                    return b.each(c,
                    function(c) {
                        e = e.concat(a(b.toStr(d[c])))
                    }),
                    e
                }
            }
        }
        return {
            nonword: c,
            whitespace: a,
            obj: {
                nonword: d(c),
                whitespace: d(a)
            }
        }
    } (),
    e = function() {
        function c(c) {
            this.maxSize = b.isNumber(c) ? c: 100,
            this.reset(),
            this.maxSize <= 0 && (this.set = this.get = a.noop)
        }
        function d() {
            this.head = this.tail = null
        }
        function e(a, b) {
            this.key = a,
            this.val = b,
            this.prev = this.next = null
        }
        return b.mixin(c.prototype, {
            set: function(a, b) {
                var c, d = this.list.tail;
                this.size >= this.maxSize && (this.list.remove(d), delete this.hash[d.key]),
                (c = this.hash[a]) ? (c.val = b, this.list.moveToFront(c)) : (c = new e(a, b), this.list.add(c), this.hash[a] = c, this.size++)
            },
            get: function(a) {
                var b = this.hash[a];
                return b ? (this.list.moveToFront(b), b.val) : void 0
            },
            reset: function() {
                this.size = 0,
                this.hash = {},
                this.list = new d
            }
        }),
        b.mixin(d.prototype, {
            add: function(a) {
                this.head && (a.next = this.head, this.head.prev = a),
                this.head = a,
                this.tail = this.tail || a
            },
            remove: function(a) {
                a.prev ? a.prev.next = a.next: this.head = a.next,
                a.next ? a.next.prev = a.prev: this.tail = a.prev
            },
            moveToFront: function(a) {
                this.remove(a),
                this.add(a)
            }
        }),
        c
    } (),
    f = function() {
        function a(a) {
            this.prefix = ["__", a, "__"].join(""),
            this.ttlKey = "__ttl__",
            this.keyMatcher = new RegExp("^" + b.escapeRegExChars(this.prefix))
        }
        function c() {
            return (new Date).getTime()
        }
        function d(a) {
            return JSON.stringify(b.isUndefined(a) ? null: a)
        }
        function e(a) {
            return JSON.parse(a)
        }
        var f, g;
        try {
            f = window.localStorage,
            f.setItem("~~~", "!"),
            f.removeItem("~~~")
        } catch(h) {
            f = null
        }
        return g = f && window.JSON ? {
            _prefix: function(a) {
                return this.prefix + a
            },
            _ttlKey: function(a) {
                return this._prefix(a) + this.ttlKey
            },
            get: function(a) {
                return this.isExpired(a) && this.remove(a),
                e(f.getItem(this._prefix(a)))
            },
            set: function(a, e, g) {
                return b.isNumber(g) ? f.setItem(this._ttlKey(a), d(c() + g)) : f.removeItem(this._ttlKey(a)),
                f.setItem(this._prefix(a), d(e))
            },
            remove: function(a) {
                return f.removeItem(this._ttlKey(a)),
                f.removeItem(this._prefix(a)),
                this
            },
            clear: function() {
                var a, b, c = [],
                d = f.length;
                for (a = 0; d > a; a++) { (b = f.key(a)).match(this.keyMatcher) && c.push(b.replace(this.keyMatcher, ""))
                }
                for (a = c.length; a--;) {
                    this.remove(c[a])
                }
                return this
            },
            isExpired: function(a) {
                var d = e(f.getItem(this._ttlKey(a)));
                return b.isNumber(d) && c() > d ? !0 : !1
            }
        }: {
            get: b.noop,
            set: b.noop,
            remove: b.noop,
            clear: b.noop,
            isExpired: b.noop
        },
        b.mixin(a.prototype, g),
        a
    } (),
    g = function() {
        function c(b) {
            b = b || {},
            this.cancelled = !1,
            this.lastUrl = null,
            this._send = b.transport ? d(b.transport) : a.ajax,
            this._get = b.rateLimiter ? b.rateLimiter(this._get) : this._get,
            this._cache = b.cache === !1 ? new e(0) : i
        }
        function d(c) {
            return function(d, e) {
                function f(a) {
                    b.defer(function() {
                        h.resolve(a)
                    })
                }
                function g(a) {
                    b.defer(function() {
                        h.reject(a)
                    })
                }
                var h = a.Deferred();
                return c(d, e, f, g),
                h
            }
        }
        var f = 0,
        g = {},
        h = 6,
        i = new e(10);
        return c.setMaxPendingRequests = function(a) {
            h = a
        },
        c.resetCache = function() {
            i.reset()
        },
        b.mixin(c.prototype, {
            _get: function(a, b, c) {
                function d(b) {
                    c && c(null, b),
                    k._cache.set(a, b)
                }
                function e() {
                    c && c(!0)
                }
                function i() {
                    f--,
                    delete g[a],
                    k.onDeckRequestArgs && (k._get.apply(k, k.onDeckRequestArgs), k.onDeckRequestArgs = null)
                }
                var j, k = this;
                this.cancelled || a !== this.lastUrl || ((j = g[a]) ? j.done(d).fail(e) : h > f ? (f++, g[a] = this._send(a, b).done(d).fail(e).always(i)) : this.onDeckRequestArgs = [].slice.call(arguments, 0))
            },
            get: function(a, c, d) {
                var e;
                return b.isFunction(c) && (d = c, c = {}),
                this.cancelled = !1,
                this.lastUrl = a,
                (e = this._cache.get(a)) ? b.defer(function() {
                    d && d(null, e)
                }) : this._get(a, c, d),
                !!e
            },
            cancel: function() {
                this.cancelled = !0
            }
        }),
        c
    } (),
    h = function() {
        function c(b) {
            b = b || {},
            b.datumTokenizer && b.queryTokenizer || a.error("datumTokenizer and queryTokenizer are both required"),
            this.datumTokenizer = b.datumTokenizer,
            this.queryTokenizer = b.queryTokenizer,
            this.reset()
        }
        function d(a) {
            return a = b.filter(a,
            function(a) {
                return !! a
            }),
            a = b.map(a,
            function(a) {
                return a.toLowerCase()
            })
        }
        function e() {
            return {
                ids: [],
                children: {}
            }
        }
        function f(a) {
            for (var b = {},
            c = [], d = 0, e = a.length; e > d; d++) {
                b[a[d]] || (b[a[d]] = !0, c.push(a[d]))
            }
            return c
        }
        function g(a, b) {
            function c(a, b) {
                return a - b
            }
            var d = 0,
            e = 0,
            f = [];
            a = a.sort(c),
            b = b.sort(c);
            for (var g = a.length,
            h = b.length; g > d && h > e;) {
                a[d] < b[e] ? d++:a[d] > b[e] ? e++:(f.push(a[d]), d++, e++)
            }
            return f
        }
        return b.mixin(c.prototype, {
            bootstrap: function(a) {
                this.datums = a.datums,
                this.trie = a.trie
            },
            add: function(a) {
                var c = this;
                a = b.isArray(a) ? a: [a],
                b.each(a,
                function(a) {
                    var f, g;
                    f = c.datums.push(a) - 1,
                    g = d(c.datumTokenizer(a)),
                    b.each(g,
                    function(a) {
                        var b, d, g;
                        for (b = c.trie, d = a.split(""); g = d.shift();) {
                            b = b.children[g] || (b.children[g] = e()),
                            b.ids.push(f)
                        }
                    })
                })
            },
            get: function(a) {
                var c, e, h = this;
                return c = d(this.queryTokenizer(a)),
                b.each(c,
                function(a) {
                    var b, c, d, f;
                    if (e && 0 === e.length) {
                        return ! 1
                    }
                    for (b = h.trie, c = a.split(""); b && (d = c.shift());) {
                        b = b.children[d]
                    }
                    return b && 0 === c.length ? (f = b.ids.slice(0), void(e = e ? g(e, f) : f)) : (e = [], !1)
                }),
                e ? b.map(f(e),
                function(a) {
                    return h.datums[a]
                }) : []
            },
            reset: function() {
                this.datums = [],
                this.trie = e()
            },
            serialize: function() {
                return {
                    datums: this.datums,
                    trie: this.trie
                }
            }
        }),
        c
    } (),
    i = function() {
        function d(a) {
            return a.local || null
        }
        function e(d) {
            var e, f;
            return f = {
                url: null,
                thumbprint: "",
                ttl: 86400000,
                filter: null,
                ajax: {}
            },
            (e = d.prefetch || null) && (e = b.isString(e) ? {
                url: e
            }: e, e = b.mixin(f, e), e.thumbprint = c + e.thumbprint, e.ajax.type = e.ajax.type || "GET", e.ajax.dataType = e.ajax.dataType || "json", !e.url && a.error("prefetch requires url to be set")),
            e
        }
        function f(c) {
            function d(a) {
                return function(c) {
                    return b.debounce(c, a)
                }
            }
            function e(a) {
                return function(c) {
                    return b.throttle(c, a)
                }
            }
            var f, g;
            return g = {
                url: null,
                cache: !0,
                wildcard: "%QUERY",
                replace: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                send: null,
                filter: null,
                ajax: {}
            },
            (f = c.remote || null) && (f = b.isString(f) ? {
                url: f
            }: f, f = b.mixin(g, f), f.rateLimiter = /^throttle$/i.test(f.rateLimitBy) ? e(f.rateLimitWait) : d(f.rateLimitWait), f.ajax.type = f.ajax.type || "GET", f.ajax.dataType = f.ajax.dataType || "json", delete f.rateLimitBy, delete f.rateLimitWait, !f.url && a.error("remote requires url to be set")),
            f
        }
        return {
            local: d,
            prefetch: e,
            remote: f
        }
    } (); !
    function(c) {
        function e(b) {
            b && (b.local || b.prefetch || b.remote) || a.error("one of local, prefetch, or remote is required"),
            this.limit = b.limit || 5,
            this.sorter = j(b.sorter),
            this.dupDetector = b.dupDetector || k,
            this.local = i.local(b),
            this.prefetch = i.prefetch(b),
            this.remote = i.remote(b),
            this.cacheKey = this.prefetch ? this.prefetch.cacheKey || this.prefetch.url: null,
            this.index = new h({
                datumTokenizer: b.datumTokenizer,
                queryTokenizer: b.queryTokenizer
            }),
            this.storage = this.cacheKey ? new f(this.cacheKey) : null
        }
        function j(a) {
            function c(b) {
                return b.sort(a)
            }
            function d(a) {
                return a
            }
            return b.isFunction(a) ? c: d
        }
        function k() {
            return ! 1
        }
        var l, m;
        return l = c.Bloodhound,
        m = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        },
        c.Bloodhound = e,
        e.noConflict = function() {
            return c.Bloodhound = l,
            e
        },
        e.tokenizers = d,
        b.mixin(e.prototype, {
            _loadPrefetch: function(b) {
                function c(a) {
                    f.clear(),
                    f.add(b.filter ? b.filter(a) : a),
                    f._saveToStorage(f.index.serialize(), b.thumbprint, b.ttl)
                }
                var d, e, f = this;
                return (d = this._readFromStorage(b.thumbprint)) ? (this.index.bootstrap(d), e = a.Deferred().resolve()) : e = a.ajax(b.url, b.ajax).done(c),
                e
            },
            _getFromRemote: function(a, b) {
                function c(a, c) {
                    b(a ? [] : f.remote.filter ? f.remote.filter(c) : c)
                }
                var d, e, f = this;
                if (this.transport) {
                    return a = a || "",
                    e = encodeURIComponent(a),
                    d = this.remote.replace ? this.remote.replace(this.remote.url, a) : this.remote.url.replace(this.remote.wildcard, e),
                    this.transport.get(d, this.remote.ajax, c)
                }
            },
            _cancelLastRemoteRequest: function() {
                this.transport && this.transport.cancel()
            },
            _saveToStorage: function(a, b, c) {
                this.storage && (this.storage.set(m.data, a, c), this.storage.set(m.protocol, location.protocol, c), this.storage.set(m.thumbprint, b, c))
            },
            _readFromStorage: function(a) {
                var b, c = {};
                return this.storage && (c.data = this.storage.get(m.data), c.protocol = this.storage.get(m.protocol), c.thumbprint = this.storage.get(m.thumbprint)),
                b = c.thumbprint !== a || c.protocol !== location.protocol,
                c.data && !b ? c.data: null
            },
            _initialize: function() {
                function c() {
                    e.add(b.isFunction(f) ? f() : f)
                }
                var d, e = this,
                f = this.local;
                return d = this.prefetch ? this._loadPrefetch(this.prefetch) : a.Deferred().resolve(),
                f && d.done(c),
                this.transport = this.remote ? new g(this.remote) : null,
                this.initPromise = d.promise()
            },
            initialize: function(a) {
                return ! this.initPromise || a ? this._initialize() : this.initPromise
            },
            add: function(a) {
                this.index.add(a)
            },
            get: function(a, c) {
                function d(a) {
                    var d = f.slice(0);
                    b.each(a,
                    function(a) {
                        var c;
                        return c = b.some(d,
                        function(b) {
                            return e.dupDetector(a, b)
                        }),
                        !c && d.push(a),
                        d.length < e.limit
                    }),
                    c && c(e.sorter(d))
                }
                var e = this,
                f = [],
                g = !1;
                f = this.index.get(a),
                f = this.sorter(f).slice(0, this.limit),
                f.length < this.limit ? g = this._getFromRemote(a, d) : this._cancelLastRemoteRequest(),
                g || (f.length > 0 || !this.transport) && c && c(f)
            },
            clear: function() {
                this.index.reset()
            },
            clearPrefetchCache: function() {
                this.storage && this.storage.clear()
            },
            clearRemoteCache: function() {
                this.transport && g.resetCache()
            },
            ttAdapter: function() {
                return b.bind(this.get, this)
            }
        }),
        e
    } (this);
    var j = function() {
        return {
            wrapper: '<span class="twitter-typeahead"></span>',
            dropdown: '<span class="tt-dropdown-menu"></span>',
            dataset: '<div class="tt-dataset-%CLASS%"></div>',
            suggestions: '<span class="tt-suggestions"></span>',
            suggestion: '<div class="tt-suggestion"></div>'
        }
    } (),
    k = function() {
        var a = {
            wrapper: {
                position: "relative",
                display: "inline-block"
            },
            hint: {
                position: "absolute",
                top: "0",
                left: "0",
                borderColor: "transparent",
                boxShadow: "none",
                opacity: "1"
            },
            input: {
                position: "relative",
                verticalAlign: "top",
                backgroundColor: "transparent"
            },
            inputWithNoHint: {
                position: "relative",
                verticalAlign: "top"
            },
            dropdown: {
                position: "absolute",
                top: "100%",
                left: "0",
                zIndex: "100",
                display: "none"
            },
            suggestions: {
                display: "block"
            },
            suggestion: {
                whiteSpace: "nowrap",
                cursor: "pointer"
            },
            suggestionChild: {
                whiteSpace: "normal"
            },
            ltr: {
                left: "0",
                right: "auto"
            },
            rtl: {
                left: "auto",
                right: " 0"
            }
        };
        return b.isMsie() && b.mixin(a.input, {
            backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
        }),
        b.isMsie() && b.isMsie() <= 7 && b.mixin(a.input, {
            marginTop: "-1px"
        }),
        a
    } (),
    l = function() {
        function c(b) {
            b && b.el || a.error("EventBus initialized without el"),
            this.$el = a(b.el)
        }
        var d = "typeahead:";
        return b.mixin(c.prototype, {
            trigger: function(a) {
                var b = [].slice.call(arguments, 1);
                this.$el.trigger(d + a, b)
            }
        }),
        c
    } (),
    m = function() {
        function a(a, b, c, d) {
            var e;
            if (!c) {
                return this
            }
            for (b = b.split(i), c = d ? h(c, d) : c, this._callbacks = this._callbacks || {}; e = b.shift();) {
                this._callbacks[e] = this._callbacks[e] || {
                    sync: [],
                    async: []
                },
                this._callbacks[e][a].push(c)
            }
            return this
        }
        function b(b, c, d) {
            return a.call(this, "async", b, c, d)
        }
        function c(b, c, d) {
            return a.call(this, "sync", b, c, d)
        }
        function d(a) {
            var b;
            if (!this._callbacks) {
                return this
            }
            for (a = a.split(i); b = a.shift();) {
                delete this._callbacks[b]
            }
            return this
        }
        function e(a) {
            var b, c, d, e, g;
            if (!this._callbacks) {
                return this
            }
            for (a = a.split(i), d = [].slice.call(arguments, 1); (b = a.shift()) && (c = this._callbacks[b]);) {
                e = f(c.sync, this, [b].concat(d)),
                g = f(c.async, this, [b].concat(d)),
                e() && j(g)
            }
            return this
        }
        function f(a, b, c) {
            function d() {
                for (var d, e = 0,
                f = a.length; ! d && f > e; e += 1) {
                    d = a[e].apply(b, c) === !1
                }
                return ! d
            }
            return d
        }
        function g() {
            var a;
            return a = window.setImmediate ?
            function(a) {
                setImmediate(function() {
                    a()
                })
            }: function(a) {
                setTimeout(function() {
                    a()
                },
                0)
            }
        }
        function h(a, b) {
            return a.bind ? a.bind(b) : function() {
                a.apply(b, [].slice.call(arguments, 0))
            }
        }
        var i = /\s+/,
        j = g();
        return {
            onSync: c,
            onAsync: b,
            off: d,
            trigger: e
        }
    } (),
    n = function(a) {
        function c(a, c, d) {
            for (var e, f = [], g = 0, h = a.length; h > g; g++) {
                f.push(b.escapeRegExChars(a[g]))
            }
            return e = d ? "\\b(" + f.join("|") + ")\\b": "(" + f.join("|") + ")",
            c ? new RegExp(e) : new RegExp(e, "i")
        }
        var d = {
            node: null,
            pattern: null,
            tagName: "strong",
            className: null,
            wordsOnly: !1,
            caseSensitive: !1
        };
        return function(e) {
            function f(b) {
                var c, d, f;
                return (c = h.exec(b.data)) && (f = a.createElement(e.tagName), e.className && (f.className = e.className), d = b.splitText(c.index), d.splitText(c[0].length), f.appendChild(d.cloneNode(!0)), b.parentNode.replaceChild(f, d)),
                !!c
            }
            function g(a, b) {
                for (var c, d = 3,
                e = 0; e < a.childNodes.length; e++) {
                    c = a.childNodes[e],
                    c.nodeType === d ? e += b(c) ? 1 : 0 : g(c, b)
                }
            }
            var h;
            e = b.mixin({},
            d, e),
            e.node && e.pattern && (e.pattern = b.isArray(e.pattern) ? e.pattern: [e.pattern], h = c(e.pattern, e.caseSensitive, e.wordsOnly), g(e.node, f))
        }
    } (window.document),
    o = function() {
        function c(c) {
            var e, f, h, i, j = this;
            c = c || {},
            c.input || a.error("input is missing"),
            e = b.bind(this._onBlur, this),
            f = b.bind(this._onFocus, this),
            h = b.bind(this._onKeydown, this),
            i = b.bind(this._onInput, this),
            this.$hint = a(c.hint),
            this.$input = a(c.input).on("blur.tt", e).on("focus.tt", f).on("keydown.tt", h),
            0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = b.noop),
            b.isMsie() ? this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",
            function(a) {
                g[a.which || a.keyCode] || b.defer(b.bind(j._onInput, j, a))
            }) : this.$input.on("input.tt", i),
            this.query = this.$input.val(),
            this.$overflowHelper = d(this.$input)
        }
        function d(b) {
            return a('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: b.css("font-family"),
                fontSize: b.css("font-size"),
                fontStyle: b.css("font-style"),
                fontVariant: b.css("font-variant"),
                fontWeight: b.css("font-weight"),
                wordSpacing: b.css("word-spacing"),
                letterSpacing: b.css("letter-spacing"),
                textIndent: b.css("text-indent"),
                textRendering: b.css("text-rendering"),
                textTransform: b.css("text-transform")
            }).insertAfter(b)
        }
        function e(a, b) {
            return c.normalizeQuery(a) === c.normalizeQuery(b)
        }
        function f(a) {
            return a.altKey || a.ctrlKey || a.metaKey || a.shiftKey
        }
        var g;
        return g = {
            9 : "tab",
            27 : "esc",
            37 : "left",
            39 : "right",
            13 : "enter",
            38 : "up",
            40 : "down"
        },
        c.normalizeQuery = function(a) {
            return (a || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
        },
        b.mixin(c.prototype, m, {
            _onBlur: function() {
                this.resetInputValue(),
                this.trigger("blurred")
            },
            _onFocus: function() {
                this.trigger("focused")
            },
            _onKeydown: function(a) {
                var b = g[a.which || a.keyCode];
                this._managePreventDefault(b, a),
                b && this._shouldTrigger(b, a) && this.trigger(b + "Keyed", a)
            },
            _onInput: function() {
                this._checkInputValue()
            },
            _managePreventDefault: function(a, b) {
                var c, d, e;
                switch (a) {
                case "tab":
                    d = this.getHint(),
                    e = this.getInputValue(),
                    c = d && d !== e && !f(b);
                    break;
                case "up":
                case "down":
                    c = !f(b);
                    break;
                default:
                    c = !1
                }
                c && b.preventDefault()
            },
            _shouldTrigger: function(a, b) {
                var c;
                switch (a) {
                case "tab":
                    c = !f(b);
                    break;
                default:
                    c = !0
                }
                return c
            },
            _checkInputValue: function() {
                var a, b, c;
                a = this.getInputValue(),
                b = e(a, this.query),
                c = b ? this.query.length !== a.length: !1,
                this.query = a,
                b ? c && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query)
            },
            focus: function() {
                this.$input.focus()
            },
            blur: function() {
                this.$input.blur()
            },
            getQuery: function() {
                return this.query
            },
            setQuery: function(a) {
                this.query = a
            },
            getInputValue: function() {
                return this.$input.val()
            },
            setInputValue: function(a, b) {
                this.$input.val(a),
                b ? this.clearHint() : this._checkInputValue()
            },
            resetInputValue: function() {
                this.setInputValue(this.query, !0)
            },
            getHint: function() {
                return this.$hint.val()
            },
            setHint: function(a) {
                this.$hint.val(a)
            },
            clearHint: function() {
                this.setHint("")
            },
            clearHintIfInvalid: function() {
                var a, b, c, d;
                a = this.getInputValue(),
                b = this.getHint(),
                c = a !== b && 0 === b.indexOf(a),
                d = "" !== a && c && !this.hasOverflow(),
                !d && this.clearHint()
            },
            getLanguageDirection: function() {
                return (this.$input.css("direction") || "ltr").toLowerCase()
            },
            hasOverflow: function() {
                var a = this.$input.width() - 2;
                return this.$overflowHelper.text(this.getInputValue()),
                this.$overflowHelper.width() >= a
            },
            isCursorAtEnd: function() {
                var a, c, d;
                return a = this.$input.val().length,
                c = this.$input[0].selectionStart,
                b.isNumber(c) ? c === a: document.selection ? (d = document.selection.createRange(), d.moveStart("character", -a), a === d.text.length) : !0
            },
            destroy: function() {
                this.$hint.off(".tt"),
                this.$input.off(".tt"),
                this.$hint = this.$input = this.$overflowHelper = null
            }
        }),
        c
    } (),
    p = function() {
        function c(c) {
            c = c || {},
            c.templates = c.templates || {},
            c.source || a.error("missing source"),
            c.name && !f(c.name) && a.error("invalid dataset name: " + c.name),
            this.query = null,
            this.highlight = !!c.highlight,
            this.name = c.name || b.getUniqueId(),
            this.source = c.source,
            this.displayFn = d(c.display || c.displayKey),
            this.templates = e(c.templates, this.displayFn),
            this.$el = a(j.dataset.replace("%CLASS%", this.name))
        }
        function d(a) {
            function c(b) {
                return b[a]
            }
            return a = a || "value",
            b.isFunction(a) ? a: c
        }
        function e(a, c) {
            function d(a) {
                return "<p>" + c(a) + "</p>"
            }
            return {
                empty: a.empty && b.templatify(a.empty),
                header: a.header && b.templatify(a.header),
                footer: a.footer && b.templatify(a.footer),
                suggestion: a.suggestion || d
            }
        }
        function f(a) {
            return /^[_a-zA-Z0-9-]+$/.test(a)
        }
        var g = "ttDataset",
        h = "ttValue",
        i = "ttDatum";
        return c.extractDatasetName = function(b) {
            return a(b).data(g)
        },
        c.extractValue = function(b) {
            return a(b).data(h)
        },
        c.extractDatum = function(b) {
            return a(b).data(i)
        },
        b.mixin(c.prototype, m, {
            _render: function(c, d) {
                function e() {
                    return p.templates.empty({
                        query: c,
                        isEmpty: !0
                    })
                }
                function f() {
                    function e(b) {
                        var c;
                        return c = a(j.suggestion).append(p.templates.suggestion(b)).data(g, p.name).data(h, p.displayFn(b)).data(i, b),
                        c.children().each(function() {
                            a(this).css(k.suggestionChild)
                        }),
                        c
                    }
                    var f, l;
                    return f = a(j.suggestions).css(k.suggestions),
                    l = b.map(d, e),
                    f.append.apply(f, l),
                    p.highlight && n({
                        className: "tt-highlight",
                        node: f[0],
                        pattern: c
                    }),
                    f
                }
                function l() {
                    return p.templates.header({
                        query: c,
                        isEmpty: !o
                    })
                }
                function m() {
                    return p.templates.footer({
                        query: c,
                        isEmpty: !o
                    })
                }
                if (this.$el) {
                    var o, p = this;
                    this.$el.empty(),
                    o = d && d.length,
                    !o && this.templates.empty ? this.$el.html(e()).prepend(p.templates.header ? l() : null).append(p.templates.footer ? m() : null) : o && this.$el.html(f()).prepend(p.templates.header ? l() : null).append(p.templates.footer ? m() : null),
                    this.trigger("rendered")
                }
            },
            getRoot: function() {
                return this.$el
            },
            update: function(a) {
                function b(b) {
                    c.canceled || a !== c.query || c._render(a, b)
                }
                var c = this;
                this.query = a,
                this.canceled = !1,
                this.source(a, b)
            },
            cancel: function() {
                this.canceled = !0
            },
            clear: function() {
                this.cancel(),
                this.$el.empty(),
                this.trigger("rendered")
            },
            isEmpty: function() {
                return this.$el.is(":empty")
            },
            destroy: function() {
                this.$el = null
            }
        }),
        c
    } (),
    q = function() {
        function c(c) {
            var e, f, g, h = this;
            c = c || {},
            c.menu || a.error("menu is required"),
            this.isOpen = !1,
            this.isEmpty = !0,
            this.datasets = b.map(c.datasets, d),
            e = b.bind(this._onSuggestionClick, this),
            f = b.bind(this._onSuggestionMouseEnter, this),
            g = b.bind(this._onSuggestionMouseLeave, this),
            this.$menu = a(c.menu).on("click.tt", ".tt-suggestion", e).on("mouseenter.tt", ".tt-suggestion", f).on("mouseleave.tt", ".tt-suggestion", g),
            b.each(this.datasets,
            function(a) {
                h.$menu.append(a.getRoot()),
                a.onSync("rendered", h._onRendered, h)
            })
        }
        function d(a) {
            return new p(a)
        }
        return b.mixin(c.prototype, m, {
            _onSuggestionClick: function(b) {
                this.trigger("suggestionClicked", a(b.currentTarget))
            },
            _onSuggestionMouseEnter: function(b) {
                this._removeCursor(),
                this._setCursor(a(b.currentTarget), !0)
            },
            _onSuggestionMouseLeave: function() {
                this._removeCursor()
            },
            _onRendered: function() {
                function a(a) {
                    return a.isEmpty()
                }
                this.isEmpty = b.every(this.datasets, a),
                this.isEmpty ? this._hide() : this.isOpen && this._show(),
                this.trigger("datasetRendered")
            },
            _hide: function() {
                this.$menu.hide()
            },
            _show: function() {
                this.$menu.css("display", "block")
            },
            _getSuggestions: function() {
                return this.$menu.find(".tt-suggestion")
            },
            _getCursor: function() {
                return this.$menu.find(".tt-cursor").first()
            },
            _setCursor: function(a, b) {
                a.first().addClass("tt-cursor"),
                !b && this.trigger("cursorMoved")
            },
            _removeCursor: function() {
                this._getCursor().removeClass("tt-cursor")
            },
            _moveCursor: function(a) {
                var b, c, d, e;
                if (this.isOpen) {
                    if (c = this._getCursor(), b = this._getSuggestions(), this._removeCursor(), d = b.index(c) + a, d = (d + 1) % (b.length + 1) - 1, -1 === d) {
                        return void this.trigger("cursorRemoved")
                    } - 1 > d && (d = b.length - 1),
                    this._setCursor(e = b.eq(d)),
                    this._ensureVisible(e)
                }
            },
            _ensureVisible: function(a) {
                var b, c, d, e;
                b = a.position().top,
                c = b + a.outerHeight(!0),
                d = this.$menu.scrollTop(),
                e = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10),
                0 > b ? this.$menu.scrollTop(d + b) : c > e && this.$menu.scrollTop(d + (c - e))
            },
            close: function() {
                this.isOpen && (this.isOpen = !1, this._removeCursor(), this._hide(), this.trigger("closed"))
            },
            open: function() {
                this.isOpen || (this.isOpen = !0, !this.isEmpty && this._show(), this.trigger("opened"))
            },
            setLanguageDirection: function(a) {
                this.$menu.css("ltr" === a ? k.ltr: k.rtl)
            },
            moveCursorUp: function() {
                this._moveCursor( - 1)
            },
            moveCursorDown: function() {
                this._moveCursor(1)
            },
            getDatumForSuggestion: function(a) {
                var b = null;
                return a.length && (b = {
                    raw: p.extractDatum(a),
                    value: p.extractValue(a),
                    datasetName: p.extractDatasetName(a)
                }),
                b
            },
            getDatumForCursor: function() {
                return this.getDatumForSuggestion(this._getCursor().first())
            },
            getDatumForTopSuggestion: function() {
                return this.getDatumForSuggestion(this._getSuggestions().first())
            },
            update: function(a) {
                function c(b) {
                    b.update(a)
                }
                b.each(this.datasets, c)
            },
            empty: function() {
                function a(a) {
                    a.clear()
                }
                b.each(this.datasets, a),
                this.isEmpty = !0
            },
            isVisible: function() {
                return this.isOpen && !this.isEmpty
            },
            destroy: function() {
                function a(a) {
                    a.destroy()
                }
                this.$menu.off(".tt"),
                this.$menu = null,
                b.each(this.datasets, a)
            }
        }),
        c
    } (),
    r = function() {
        function c(c) {
            var e, f, g;
            c = c || {},
            c.input || a.error("missing input"),
            this.isActivated = !1,
            this.autoselect = !!c.autoselect,
            this.minLength = b.isNumber(c.minLength) ? c.minLength: 1,
            this.$node = d(c.input, c.withHint),
            e = this.$node.find(".tt-dropdown-menu"),
            f = this.$node.find(".tt-input"),
            g = this.$node.find(".tt-hint"),
            f.on("blur.tt",
            function(a) {
                var c, d, g;
                c = document.activeElement,
                d = e.is(c),
                g = e.has(c).length > 0,
                b.isMsie() && (d || g) && (a.preventDefault(), a.stopImmediatePropagation(), b.defer(function() {
                    f.focus()
                }))
            }),
            e.on("mousedown.tt",
            function(a) {
                a.preventDefault()
            }),
            this.eventBus = c.eventBus || new l({
                el: f
            }),
            this.dropdown = new q({
                menu: e,
                datasets: c.datasets
            }).onSync("suggestionClicked", this._onSuggestionClicked, this).onSync("cursorMoved", this._onCursorMoved, this).onSync("cursorRemoved", this._onCursorRemoved, this).onSync("opened", this._onOpened, this).onSync("closed", this._onClosed, this).onAsync("datasetRendered", this._onDatasetRendered, this),
            this.input = new o({
                input: f,
                hint: g
            }).onSync("focused", this._onFocused, this).onSync("blurred", this._onBlurred, this).onSync("enterKeyed", this._onEnterKeyed, this).onSync("tabKeyed", this._onTabKeyed, this).onSync("escKeyed", this._onEscKeyed, this).onSync("upKeyed", this._onUpKeyed, this).onSync("downKeyed", this._onDownKeyed, this).onSync("leftKeyed", this._onLeftKeyed, this).onSync("rightKeyed", this._onRightKeyed, this).onSync("queryChanged", this._onQueryChanged, this).onSync("whitespaceChanged", this._onWhitespaceChanged, this),
            this._setLanguageDirection()
        }
        function d(b, c) {
            var d, f, h, i;
            d = a(b),
            f = a(j.wrapper).css(k.wrapper),
            h = a(j.dropdown).css(k.dropdown),
            i = d.clone().css(k.hint).css(e(d)),
            i.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder required").prop("readonly", !0).attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            }),
            d.data(g, {
                dir: d.attr("dir"),
                autocomplete: d.attr("autocomplete"),
                spellcheck: d.attr("spellcheck"),
                style: d.attr("style")
            }),
            d.addClass("tt-input").attr({
                autocomplete: "off",
                spellcheck: !1
            }).css(c ? k.input: k.inputWithNoHint);
            try { ! d.attr("dir") && d.attr("dir", "auto")
            } catch(l) {}
            return d.wrap(f).parent().prepend(c ? i: null).append(h)
        }
        function e(a) {
            return {
                backgroundAttachment: a.css("background-attachment"),
                backgroundClip: a.css("background-clip"),
                backgroundColor: a.css("background-color"),
                backgroundImage: a.css("background-image"),
                backgroundOrigin: a.css("background-origin"),
                backgroundPosition: a.css("background-position"),
                backgroundRepeat: a.css("background-repeat"),
                backgroundSize: a.css("background-size")
            }
        }
        function f(a) {
            var c = a.find(".tt-input");
            b.each(c.data(g),
            function(a, d) {
                b.isUndefined(a) ? c.removeAttr(d) : c.attr(d, a)
            }),
            c.detach().removeData(g).removeClass("tt-input").insertAfter(a),
            a.remove()
        }
        var g = "ttAttrs";
        return b.mixin(c.prototype, {
            _onSuggestionClicked: function(a, b) {
                var c; (c = this.dropdown.getDatumForSuggestion(b)) && this._select(c)
            },
            _onCursorMoved: function() {
                var a = this.dropdown.getDatumForCursor();
                this.input.setInputValue(a.value, !0),
                this.eventBus.trigger("cursorchanged", a.raw, a.datasetName)
            },
            _onCursorRemoved: function() {
                this.input.resetInputValue(),
                this._updateHint()
            },
            _onDatasetRendered: function() {
                this._updateHint()
            },
            _onOpened: function() {
                this._updateHint(),
                this.eventBus.trigger("opened")
            },
            _onClosed: function() {
                this.input.clearHint(),
                this.eventBus.trigger("closed")
            },
            _onFocused: function() {
                this.isActivated = !0,
                this.dropdown.open()
            },
            _onBlurred: function() {
                this.isActivated = !1,
                this.dropdown.empty(),
                this.dropdown.close()
            },
            _onEnterKeyed: function(a, b) {
                var c, d;
                c = this.dropdown.getDatumForCursor(),
                d = this.dropdown.getDatumForTopSuggestion(),
                c ? (this._select(c), b.preventDefault()) : this.autoselect && d && (this._select(d), b.preventDefault())
            },
            _onTabKeyed: function(a, b) {
                var c; (c = this.dropdown.getDatumForCursor()) ? (this._select(c), b.preventDefault()) : this._autocomplete(!0)
            },
            _onEscKeyed: function() {
                this.dropdown.close(),
                this.input.resetInputValue()
            },
            _onUpKeyed: function() {
                var a = this.input.getQuery();
                this.dropdown.isEmpty && a.length >= this.minLength ? this.dropdown.update(a) : this.dropdown.moveCursorUp(),
                this.dropdown.open()
            },
            _onDownKeyed: function() {
                var a = this.input.getQuery();
                this.dropdown.isEmpty && a.length >= this.minLength ? this.dropdown.update(a) : this.dropdown.moveCursorDown(),
                this.dropdown.open()
            },
            _onLeftKeyed: function() {
                "rtl" === this.dir && this._autocomplete()
            },
            _onRightKeyed: function() {
                "ltr" === this.dir && this._autocomplete()
            },
            _onQueryChanged: function(a, b) {
                this.input.clearHintIfInvalid(),
                b.length >= this.minLength ? this.dropdown.update(b) : this.dropdown.empty(),
                this.dropdown.open(),
                this._setLanguageDirection()
            },
            _onWhitespaceChanged: function() {
                this._updateHint(),
                this.dropdown.open()
            },
            _setLanguageDirection: function() {
                var a;
                this.dir !== (a = this.input.getLanguageDirection()) && (this.dir = a, this.$node.css("direction", a), this.dropdown.setLanguageDirection(a))
            },
            _updateHint: function() {
                var a, c, d, e, f, g;
                a = this.dropdown.getDatumForTopSuggestion(),
                a && this.dropdown.isVisible() && !this.input.hasOverflow() ? (c = this.input.getInputValue(), d = o.normalizeQuery(c), e = b.escapeRegExChars(d), f = new RegExp("^(?:" + e + ")(.+$)", "i"), g = f.exec(a.value), g ? this.input.setHint(c + g[1]) : this.input.clearHint()) : this.input.clearHint()
            },
            _autocomplete: function(a) {
                var b, c, d, e;
                b = this.input.getHint(),
                c = this.input.getQuery(),
                d = a || this.input.isCursorAtEnd(),
                b && c !== b && d && (e = this.dropdown.getDatumForTopSuggestion(), e && this.input.setInputValue(e.value), this.eventBus.trigger("autocompleted", e.raw, e.datasetName))
            },
            _select: function(a) {
                this.input.setQuery(a.value),
                this.input.setInputValue(a.value, !0),
                this._setLanguageDirection(),
                this.eventBus.trigger("selected", a.raw, a.datasetName),
                this.dropdown.close(),
                b.defer(b.bind(this.dropdown.empty, this.dropdown))
            },
            open: function() {
                this.dropdown.open()
            },
            close: function() {
                this.dropdown.close()
            },
            setVal: function(a) {
                a = b.toStr(a),
                this.isActivated ? this.input.setInputValue(a) : (this.input.setQuery(a), this.input.setInputValue(a, !0)),
                this._setLanguageDirection()
            },
            getVal: function() {
                return this.input.getQuery()
            },
            destroy: function() {
                this.input.destroy(),
                this.dropdown.destroy(),
                f(this.$node),
                this.$node = null
            }
        }),
        c
    } (); !
    function() {
        var c, d, e;
        c = a.fn.typeahead,
        d = "ttTypeahead",
        e = {
            initialize: function(c, e) {
                function f() {
                    var f, g, h = a(this);
                    b.each(e,
                    function(a) {
                        a.highlight = !!c.highlight
                    }),
                    g = new r({
                        input: h,
                        eventBus: f = new l({
                            el: h
                        }),
                        withHint: b.isUndefined(c.hint) ? !0 : !!c.hint,
                        minLength: c.minLength,
                        autoselect: c.autoselect,
                        datasets: e
                    }),
                    h.data(d, g)
                }
                return e = b.isArray(e) ? e: [].slice.call(arguments, 1),
                c = c || {},
                this.each(f)
            },
            open: function() {
                function b() {
                    var b, c = a(this); (b = c.data(d)) && b.open()
                }
                return this.each(b)
            },
            close: function() {
                function b() {
                    var b, c = a(this); (b = c.data(d)) && b.close()
                }
                return this.each(b)
            },
            val: function(b) {
                function c() {
                    var c, e = a(this); (c = e.data(d)) && c.setVal(b)
                }
                function e(a) {
                    var b, c;
                    return (b = a.data(d)) && (c = b.getVal()),
                    c
                }
                return arguments.length ? this.each(c) : e(this.first())
            },
            destroy: function() {
                function b() {
                    var b, c = a(this); (b = c.data(d)) && (b.destroy(), c.removeData(d))
                }
                return this.each(b)
            }
        },
        a.fn.typeahead = function(b) {
            var c;
            return e[b] && "initialize" !== b ? (c = this.filter(function() {
                return !! a(this).data(d)
            }), e[b].apply(c, [].slice.call(arguments, 1))) : e.initialize.apply(this, arguments)
        },
        a.fn.typeahead.noConflict = function() {
            return a.fn.typeahead = c,
            this
        }
    } ()
} (window.jQuery); !
function(a, b) {
    "object" == typeof exports && "object" == typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? exports.Handlebars = b() : a.Handlebars = b()
} (this,
function() {
    return function(a) {
        function b(d) {
            if (c[d]) {
                return c[d].exports
            }
            var e = c[d] = {
                exports: {},
                id: d,
                loaded: !1
            };
            return a[d].call(e.exports, e, e.exports, b),
            e.loaded = !0,
            e.exports
        }
        var c = {};
        return b.m = a,
        b.c = c,
        b.p = "",
        b(0)
    } ([function(a, b, c) {
        function d() {
            var a = new g.HandlebarsEnvironment;
            return m.extend(a, g),
            a.SafeString = i["default"],
            a.Exception = k["default"],
            a.Utils = m,
            a.escapeExpression = m.escapeExpression,
            a.VM = o,
            a.template = function(b) {
                return o.template(b, a)
            },
            a
        }
        var e = c(7)["default"];
        b.__esModule = !0;
        var f = c(1),
        g = e(f),
        h = c(2),
        i = e(h),
        j = c(3),
        k = e(j),
        l = c(4),
        m = e(l),
        n = c(5),
        o = e(n),
        p = c(6),
        q = e(p),
        r = d();
        r.create = d,
        q["default"](r),
        r["default"] = r,
        b["default"] = r,
        a.exports = b["default"]
    },
    function(a, b, c) {
        function d(a, b) {
            this.helpers = a || {},
            this.partials = b || {},
            e(this)
        }
        function e(a) {
            a.registerHelper("helperMissing",
            function() {
                if (1 === arguments.length) {
                    return void 0
                }
                throw new k["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"')
            }),
            a.registerHelper("blockHelperMissing",
            function(b, c) {
                var d = c.inverse,
                e = c.fn;
                if (b === !0) {
                    return e(this)
                }
                if (b === !1 || null == b) {
                    return d(this)
                }
                if (o(b)) {
                    return b.length > 0 ? (c.ids && (c.ids = [c.name]), a.helpers.each(b, c)) : d(this)
                }
                if (c.data && c.ids) {
                    var g = f(c.data);
                    g.contextPath = i.appendContextPath(c.data.contextPath, c.name),
                    c = {
                        data: g
                    }
                }
                return e(b, c)
            }),
            a.registerHelper("each",
            function(a, b) {
                function c(b, c, e) {
                    j && (j.key = b, j.index = c, j.first = 0 === c, j.last = !!e, l && (j.contextPath = l + b)),
                    h += d(a[b], {
                        data: j,
                        blockParams: i.blockParams([a[b], b], [l + b, null])
                    })
                }
                if (!b) {
                    throw new k["default"]("Must pass iterator to #each")
                }
                var d = b.fn,
                e = b.inverse,
                g = 0,
                h = "",
                j = void 0,
                l = void 0;
                if (b.data && b.ids && (l = i.appendContextPath(b.data.contextPath, b.ids[0]) + "."), p(a) && (a = a.call(this)), b.data && (j = f(b.data)), a && "object" == typeof a) {
                    if (o(a)) {
                        for (var m = a.length; m > g; g++) {
                            c(g, g, g === a.length - 1)
                        }
                    } else {
                        var n = void 0;
                        for (var q in a) {
                            a.hasOwnProperty(q) && (n && c(n, g - 1), n = q, g++)
                        }
                        n && c(n, g - 1, !0)
                    }
                }
                return 0 === g && (h = e(this)),
                h
            }),
            a.registerHelper("if",
            function(a, b) {
                return p(a) && (a = a.call(this)),
                !b.hash.includeZero && !a || i.isEmpty(a) ? b.inverse(this) : b.fn(this)
            }),
            a.registerHelper("unless",
            function(b, c) {
                return a.helpers["if"].call(this, b, {
                    fn: c.inverse,
                    inverse: c.fn,
                    hash: c.hash
                })
            }),
            a.registerHelper("with",
            function(a, b) {
                p(a) && (a = a.call(this));
                var c = b.fn;
                if (i.isEmpty(a)) {
                    return b.inverse(this)
                }
                if (b.data && b.ids) {
                    var d = f(b.data);
                    d.contextPath = i.appendContextPath(b.data.contextPath, b.ids[0]),
                    b = {
                        data: d
                    }
                }
                return c(a, b)
            }),
            a.registerHelper("log",
            function(b, c) {
                var d = c.data && null != c.data.level ? parseInt(c.data.level, 10) : 1;
                a.log(d, b)
            }),
            a.registerHelper("lookup",
            function(a, b) {
                return a && a[b]
            })
        }
        function f(a) {
            var b = i.extend({},
            a);
            return b._parent = a,
            b
        }
        var g = c(7)["default"];
        b.__esModule = !0,
        b.HandlebarsEnvironment = d,
        b.createFrame = f;
        var h = c(4),
        i = g(h),
        j = c(3),
        k = g(j),
        l = "3.0.1";
        b.VERSION = l;
        var m = 6;
        b.COMPILER_REVISION = m;
        var n = {
            1 : "<= 1.0.rc.2",
            2 : "== 1.0.0-rc.3",
            3 : "== 1.0.0-rc.4",
            4 : "== 1.x.x",
            5 : "== 2.0.0-alpha.x",
            6 : ">= 2.0.0-beta.1"
        };
        b.REVISION_CHANGES = n;
        var o = i.isArray,
        p = i.isFunction,
        q = i.toString,
        r = "[object Object]";
        d.prototype = {
            constructor: d,
            logger: s,
            log: t,
            registerHelper: function(a, b) {
                if (q.call(a) === r) {
                    if (b) {
                        throw new k["default"]("Arg not supported with multiple helpers")
                    }
                    i.extend(this.helpers, a)
                } else {
                    this.helpers[a] = b
                }
            },
            unregisterHelper: function(a) {
                delete this.helpers[a]
            },
            registerPartial: function(a, b) {
                if (q.call(a) === r) {
                    i.extend(this.partials, a)
                } else {
                    if ("undefined" == typeof b) {
                        throw new k["default"]("Attempting to register a partial as undefined")
                    }
                    this.partials[a] = b
                }
            },
            unregisterPartial: function(a) {
                delete this.partials[a]
            }
        };
        var s = {
            methodMap: {
                0 : "debug",
                1 : "info",
                2 : "warn",
                3 : "error"
            },
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 1,
            log: function(a, b) {
                if ("undefined" != typeof console && s.level <= a) {
                    var c = s.methodMap[a]; (console[c] || console.log).call(console, b)
                }
            }
        };
        b.logger = s;
        var t = s.log;
        b.log = t
    },
    function(a, b) {
        function c(a) {
            this.string = a
        }
        b.__esModule = !0,
        c.prototype.toString = c.prototype.toHTML = function() {
            return "" + this.string
        },
        b["default"] = c,
        a.exports = b["default"]
    },
    function(a, b) {
        function c(a, b) {
            var e = b && b.loc,
            f = void 0,
            g = void 0;
            e && (f = e.start.line, g = e.start.column, a += " - " + f + ":" + g);
            for (var h = Error.prototype.constructor.call(this, a), i = 0; i < d.length; i++) {
                this[d[i]] = h[d[i]]
            }
            Error.captureStackTrace && Error.captureStackTrace(this, c),
            e && (this.lineNumber = f, this.column = g)
        }
        b.__esModule = !0;
        var d = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        c.prototype = new Error,
        b["default"] = c,
        a.exports = b["default"]
    },
    function(a, b) {
        function c(a) {
            return j[a]
        }
        function d(a) {
            for (var b = 1; b < arguments.length; b++) {
                for (var c in arguments[b]) {
                    Object.prototype.hasOwnProperty.call(arguments[b], c) && (a[c] = arguments[b][c])
                }
            }
            return a
        }
        function e(a, b) {
            for (var c = 0,
            d = a.length; d > c; c++) {
                if (a[c] === b) {
                    return c
                }
            }
            return - 1
        }
        function f(a) {
            if ("string" != typeof a) {
                if (a && a.toHTML) {
                    return a.toHTML()
                }
                if (null == a) {
                    return ""
                }
                if (!a) {
                    return a + ""
                }
                a = "" + a
            }
            return l.test(a) ? a.replace(k, c) : a
        }
        function g(a) {
            return a || 0 === a ? o(a) && 0 === a.length ? !0 : !1 : !0
        }
        function h(a, b) {
            return a.path = b,
            a
        }
        function i(a, b) {
            return (a ? a + ".": "") + b
        }
        b.__esModule = !0,
        b.extend = d,
        b.indexOf = e,
        b.escapeExpression = f,
        b.isEmpty = g,
        b.blockParams = h,
        b.appendContextPath = i;
        var j = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        },
        k = /[&<>"'`]/g,
        l = /[&<>"'`]/,
        m = Object.prototype.toString;
        b.toString = m;
        var n = function(a) {
            return "function" == typeof a
        };
        n(/x/) && (b.isFunction = n = function(a) {
            return "function" == typeof a && "[object Function]" === m.call(a)
        });
        var n;
        b.isFunction = n;
        var o = Array.isArray ||
        function(a) {
            return a && "object" == typeof a ? "[object Array]" === m.call(a) : !1
        };
        b.isArray = o
    },
    function(a, b, c) {
        function d(a) {
            var b = a && a[0] || 1,
            c = p.COMPILER_REVISION;
            if (b !== c) {
                if (c > b) {
                    var d = p.REVISION_CHANGES[c],
                    e = p.REVISION_CHANGES[b];
                    throw new o["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + d + ") or downgrade your runtime to an older version (" + e + ").")
                }
                throw new o["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + a[1] + ").")
            }
        }
        function e(a, b) {
            function c(c, d, e) {
                e.hash && (d = m.extend({},
                d, e.hash)),
                c = b.VM.resolvePartial.call(this, c, d, e);
                var f = b.VM.invokePartial.call(this, c, d, e);
                if (null == f && b.compile && (e.partials[e.name] = b.compile(c, a.compilerOptions, b), f = e.partials[e.name](d, e)), null != f) {
                    if (e.indent) {
                        for (var g = f.split("\n"), h = 0, i = g.length; i > h && (g[h] || h + 1 !== i); h++) {
                            g[h] = e.indent + g[h]
                        }
                        f = g.join("\n")
                    }
                    return f
                }
                throw new o["default"]("The partial " + e.name + " could not be compiled when running in runtime-only mode")
            }
            function d(b) {
                var c = void 0 === arguments[1] ? {}: arguments[1],
                f = c.data;
                d._setup(c),
                !c.partial && a.useData && (f = j(b, f));
                var g = void 0,
                h = a.useBlockParams ? [] : void 0;
                return a.useDepths && (g = c.depths ? [b].concat(c.depths) : [b]),
                a.main.call(e, b, e.helpers, e.partials, f, h, g)
            }
            if (!b) {
                throw new o["default"]("No environment passed to template")
            }
            if (!a || !a.main) {
                throw new o["default"]("Unknown template object: " + typeof a)
            }
            b.VM.checkRevision(a.compiler);
            var e = {
                strict: function(a, b) {
                    if (! (b in a)) {
                        throw new o["default"]('"' + b + '" not defined in ' + a)
                    }
                    return a[b]
                },
                lookup: function(a, b) {
                    for (var c = a.length,
                    d = 0; c > d; d++) {
                        if (a[d] && null != a[d][b]) {
                            return a[d][b]
                        }
                    }
                },
                lambda: function(a, b) {
                    return "function" == typeof a ? a.call(b) : a
                },
                escapeExpression: m.escapeExpression,
                invokePartial: c,
                fn: function(b) {
                    return a[b]
                },
                programs: [],
                program: function(a, b, c, d, e) {
                    var g = this.programs[a],
                    h = this.fn(a);
                    return b || e || d || c ? g = f(this, a, h, b, c, d, e) : g || (g = this.programs[a] = f(this, a, h)),
                    g
                },
                data: function(a, b) {
                    for (; a && b--;) {
                        a = a._parent
                    }
                    return a
                },
                merge: function(a, b) {
                    var c = a || b;
                    return a && b && a !== b && (c = m.extend({},
                    b, a)),
                    c
                },
                noop: b.VM.noop,
                compilerInfo: a.compiler
            };
            return d.isTop = !0,
            d._setup = function(c) {
                c.partial ? (e.helpers = c.helpers, e.partials = c.partials) : (e.helpers = e.merge(c.helpers, b.helpers), a.usePartial && (e.partials = e.merge(c.partials, b.partials)))
            },
            d._child = function(b, c, d, g) {
                if (a.useBlockParams && !d) {
                    throw new o["default"]("must pass block params")
                }
                if (a.useDepths && !g) {
                    throw new o["default"]("must pass parent depths")
                }
                return f(e, b, a[b], c, 0, d, g)
            },
            d
        }
        function f(a, b, c, d, e, f, g) {
            function h(b) {
                var e = void 0 === arguments[1] ? {}: arguments[1];
                return c.call(a, b, a.helpers, a.partials, e.data || d, f && [e.blockParams].concat(f), g && [b].concat(g))
            }
            return h.program = b,
            h.depth = g ? g.length: 0,
            h.blockParams = e || 0,
            h
        }
        function g(a, b, c) {
            return a ? a.call || c.name || (c.name = a, a = c.partials[a]) : a = c.partials[c.name],
            a
        }
        function h(a, b, c) {
            if (c.partial = !0, void 0 === a) {
                throw new o["default"]("The partial " + c.name + " could not be found")
            }
            return a instanceof Function ? a(b, c) : void 0
        }
        function i() {
            return ""
        }
        function j(a, b) {
            return b && "root" in b || (b = b ? p.createFrame(b) : {},
            b.root = a),
            b
        }
        var k = c(7)["default"];
        b.__esModule = !0,
        b.checkRevision = d,
        b.template = e,
        b.wrapProgram = f,
        b.resolvePartial = g,
        b.invokePartial = h,
        b.noop = i;
        var l = c(4),
        m = k(l),
        n = c(3),
        o = k(n),
        p = c(1)
    },
    function(a, b) { (function(c) {
            b.__esModule = !0,
            b["default"] = function(a) {
                var b = "undefined" != typeof c ? c: window,
                d = b.Handlebars;
                a.noConflict = function() {
                    b.Handlebars === a && (b.Handlebars = d)
                }
            },
            a.exports = b["default"]
        }).call(b,
        function() {
            return this
        } ())
    },
    function(a, b) {
        b["default"] = function(a) {
            return a && a.__esModule ? a: {
                "default": a
            }
        },
        b.__esModule = !0
    }])
}); (function(factory) {
    var registeredInModuleLoader = false;
    if (typeof define === "function" && define.amd) {
        define(factory);
        registeredInModuleLoader = true
    }
    if (typeof exports === "object") {
        module.exports = factory();
        registeredInModuleLoader = true
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function() {
            window.Cookies = OldCookies;
            return api
        }
    }
} (function() {
    function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key]
            }
        }
        return result
    }
    function init(converter) {
        function api(key, value, attributes) {
            var result;
            if (typeof document === "undefined") {
                return
            }
            if (arguments.length > 1) {
                attributes = extend({
                    path: "/"
                },
                api.defaults, attributes);
                if (typeof attributes.expires === "number") {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 86400000);
                    attributes.expires = expires
                }
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : "";
                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result
                    }
                } catch(e) {}
                if (!converter.write) {
                    value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)
                } else {
                    value = converter.write(value, key)
                }
                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);
                var stringifiedAttributes = "";
                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue
                    }
                    stringifiedAttributes += "; " + attributeName;
                    if (attributes[attributeName] === true) {
                        continue
                    }
                    stringifiedAttributes += "=" + attributes[attributeName]
                }
                return (document.cookie = key + "=" + value + stringifiedAttributes)
            }
            if (!key) {
                result = {}
            }
            var cookies = document.cookie ? document.cookie.split("; ") : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;
            for (; i < cookies.length; i++) {
                var parts = cookies[i].split("=");
                var cookie = parts.slice(1).join("=");
                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1)
                }
                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);
                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie)
                        } catch(e) {}
                    }
                    if (key === name) {
                        result = cookie;
                        break
                    }
                    if (!key) {
                        result[name] = cookie
                    }
                } catch(e) {}
            }
            return result
        }
        api.set = api;
        api.get = function(key) {
            return api.call(api, key)
        };
        api.getJSON = function() {
            return api.apply({
                json: true
            },
            [].slice.call(arguments))
        };
        api.defaults = {};
        api.remove = function(key, attributes) {
            api(key, "", extend(attributes, {
                expires: -1
            }))
        };
        api.withConverter = init;
        return api
    }
    return init(function() {})
}));
function save_preferences(chartName, index, chart) {
    var seriesVisible = [];
    for (i = 0; i < chart.series.length; i++) {
        if (i == index) {
            seriesVisible[i] = !chart.series[i].visible
        } else {
            seriesVisible[i] = chart.series[i].visible
        }
    }
    Cookies.set("highcharts_" + chartName, seriesVisible, {
        expires: 180
    })
}
function series_is_visible(chartName, index, defaultState) {
    var preferences = Cookies.getJSON("highcharts_" + chartName);
    if (preferences === undefined) {
        return defaultState
    }
    return preferences[index]
}
function tooltip_format_market_cap() {
    val = format_market_cap(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ": <b>" + val + " USD</b><br/>"
}
function tooltip_format_crypto() {
    val = format_crypto(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ": <b>" + val + "</b><br/>"
}
function tooltip_format_fiat() {
    val = format_crypto(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ": <b>" + val + "</b><br/>"
}
function tooltip_format_percentage() {
    val = this.y.toFixed(2);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ": <b>" + val + "%</b><br/>"
}
function label_format_market_cap() {
    val = format_market_cap(this.value);
    return "$" + val
}
function label_format_crypto() {
    val = format_crypto(this.value);
    return val + " BTC"
}
function label_format_fiat() {
    val = format_crypto(this.value);
    return "$" + val
}
function is_altcoin(slug) {
    if (slug == "bitcoin") {
        return false
    }
    return true
}
function is_mobile() {
    var mobile = $("#metadata").data("mobile");
    return mobile == "True"
}
function HighChartsGraph(graphId, loadingId, noDataId) {
    this.graphId = graphId;
    this.loadingId = loadingId;
    this.noDataId = noDataId
}
HighChartsGraph.prototype.init = function(start, end) {
    var that = this;
    that.fetchAndLoad(that.initCharts, start, end)
};
HighChartsGraph.prototype.chartsLoaded = function() {
    var chart = $("#" + this.graphId).highcharts();
    return chart !== undefined
};
HighChartsGraph.prototype.hideLoading = function() {
    $("#" + this.loadingId).hide()
};
HighChartsGraph.prototype.showNoData = function() {
    $("#" + this.noDataId).removeClass("hidden")
};
HighChartsGraph.prototype.afterSetExtremes = function(e) {
    if (e.dataMin != e.min || e.dataMax != e.max) {
        that = this;
        var min = Math.round(e.min);
        var max = Math.round(e.max);
        that.updateCharts(min, max)
    }
};
HighChartsGraph.prototype.updateCharts = function(min, max) {
    var that = this;
    var chart = $("#" + that.graphId).highcharts();
    chart.showLoading("");
    that.fetchAndLoad(that.finishUpdateCharts, min, max)
};
HighChartsGraph.prototype.finishUpdateCharts = function(seriesData) {};
HighChartsGraph.prototype.fetchAndLoad = function(callback, start, end) {};
HighChartsGraph.prototype.initCharts = function(seriesData) {};
function CurrencyDetailGraph(graphId, loadingId, noDataId) {
    HighChartsGraph.call(this, graphId, loadingId, noDataId);
    this.slug = $("#coincode").val();
    this.chartName = is_altcoin(this.slug) ? "altcoin": "bitcoin"
}
CurrencyDetailGraph.prototype = new HighChartsGraph;
CurrencyDetailGraph.constructor = CurrencyDetailGraph;
CurrencyDetailGraph.prototype.finishUpdateCharts = function(seriesData) {
    var that = this;
    var chart = $("#" + that.graphId).highcharts();
    chart.series[0].setData(seriesData["market_cap_by_available_supply"]);
    chart.series[1].setData(seriesData["price_usd"]);
    chart.series[2].setData(seriesData["price_btc"]);
    chart.series[3].setData(seriesData["vol_usd"]);
    chart.hideLoading()
};
CurrencyDetailGraph.prototype.fetchAndLoad = function(callback, start, end) {
    var that = this;
    var slug = $("#coincode").val();
    var apiDomain = "//api.feixiaohao.com";
    timeParams = "";
    if (start !== undefined && end !== undefined) {
        timeParams = start + "/" + end + "/"
    }

    var data3=$.parseJSON('{"market_cap_by_available_supply": [[1367174842000,73773387],[1367261402000,74936908],[1367347803000,72037635],[1367434202000,62957992],[1367523302000,58565339],[1367609702000,48265781],[1367696102000,60927537],[1367782802000,62963530],[1367869502000,60937066],[1367955902000,55968733],[1368042302000,60398778],[1368130201000,59867678],[1368218702000,61338134],[1368307501000,59463980],[1368393902000,56943561],[1368480301000,56414518],[1368566702000,54127354],[1368653702000,51798089],[1368740102000,50797474],[1368826502000,55996853],[1368913804000,59038384],[1369000201000,58186372],[1369086602000,56791063],[1369174202000,55006108],[1369261201000,55248109],[1369347602000,56423615],[1369435202000,56403681],[1369524902000,55979273],[1369611602000,58588656],[1369698002000,56217627],[1369784402000,55813422],[1369872302000,55603659],[1369958702000,53366120],[1370046304000,53448601],[1370133001000,51665695],[1370219702000,48943935],[1370306104000,49707917],[1370397302000,54475787],[1370484302000,51772915],[1370570747000,50528574],[1370657402000,47379921],[1370744102000,46505303],[1370830503000,42694276],[1370917502000,45767996],[1371004202000,44135421],[1371090602000,43539744],[1371177003000,41584043],[1371263702000,39364654],[1371350102000,38458764],[1371436802000,39316388],[1371523203000,42517610],[1371609902000,42300058],[1371696302000,42800884],[1371782702000,43102239],[1371869102000,52833336],[1371955502000,57803452],[1372041903000,57760047],[1372128302000,54201580],[1372214702000,53330232],[1372305902000,54425952],[1372392301000,56087992],[1372478702000,53796481],[1372565702000,53144002],[1372652102000,58227332],[1372738501000,56781049],[1372825227000,54146810],[1372912502000,49497209],[1372998663000,51161339],[1373085062000,46764997],[1373171462000,46297604],[1373257862000,51619462],[1373344262000,50609531],[1373430662000,50014108],[1373517962000,53831628],[1373604662000,54621449],[1373691062000,52393952],[1373777461000,54261137],[1373864462000,55660707],[1373951162000,57554352],[1374037562000,61185775],[1374124862000,60531872],[1374220862000,55412740],[1374308172000,57765118],[1374394562000,56294720],[1374480962000,56841783],[1374567362000,57203943],[1374653775000,57061914],[1374740162000,58203973],[1374826262000,57334259],[1374912661000,57041112],[1374999062000,57202275],[1375085462000,58528167],[1375171862000,58930647],[1375264262000,58962369],[1375350661000,58566621],[1375437061000,58416924],[1375523462000,57702309],[1375609861000,59903805],[1375696262000,58513878],[1375782662000,57512709],[1375869063000,55651448],[1375955461000,55816293],[1376041862000,54740214],[1376128262000,53463028],[1376214663000,52738439],[1376301474000,53363393],[1376387762000,54075067],[1376474161000,56179550],[1376560872000,55802279],[1376648462000,55891912],[1376734862000,55314934],[1376821262000,57562997],[1376907662000,57530167],[1376994063000,57964393],[1377080461000,56490814],[1377166862000,53980255],[1377253261000,56844377],[1377339662000,56132820],[1377426062000,54811520],[1377512462000,53307754],[1377598862000,52316999],[1377685262000,52689217],[1377771662000,52782065],[1377858062000,52708155],[1377944462000,55723932],[1378030862000,54168589],[1378117262000,54289992],[1378203662000,52372206],[1378290062000,56088096],[1378376762000,58580757],[1378463162000,57325938],[1378549562000,56830893],[1378635961000,56294920],[1378722362000,56037433],[1378808762000,56603888],[1378895162000,56034455],[1378981562000,56872536],[1379067963000,56464986],[1379154362000,55603075],[1379240762000,56628214],[1379327162000,56483740],[1379413562000,56078542],[1379499962000,55028305],[1379586362000,54778183],[1379672761000,55420666],[1379759161000,54158760],[1379845562000,54382855],[1379931962000,53364295],[1380018362000,52426203],[1380104762000,53103344],[1380191161000,51750349],[1380277562000,52733713],[1380363961000,50715791],[1380450361000,51819815],[1380536761000,48437430],[1380623162000,51957975],[1380709562000,52777201],[1380795962000,43890666],[1380888069000,49113207],[1380974469000,48327262],[1381060863000,46864500],[1381147268000,46932432],[1381233963000,44942540],[1381321263000,42997516],[1381407662000,43985012],[1381494063000,45755516],[1381580462000,46705349],[1381666862000,47141807],[1381753262000,45960588],[1381839662000,44917100],[1381926062000,42068294],[1382012463000,42083809],[1382098866000,42416229],[1382185265000,43490551],[1382274365000,42900654],[1382360761000,41206614],[1382447162000,38286159],[1382533869000,42228728],[1382620262000,48703545],[1382706662000,58395638],[1382793061000,49712688],[1382879462000,50528934],[1382965865000,48310710],[1383052262000,49306060],[1383138662000,49019879],[1383225061000,50644494],[1383311462000,52709694],[1383398468000,55517615],[1383484861000,67432899],[1383570967000,70086000],[1383657363000,69042504],[1383744062000,70252486],[1383830463000,100077508],[1383916862000,104375334],[1384003262000,97497063],[1384089672000,88960957],[1384176062000,89665425],[1384262462000,91693121],[1384348862000,96927695],[1384435262000,99901446],[1384521662000,99730890],[1384608362000,101190328],[1384694762000,99208581],[1384781162000,125762698],[1384867563000,181001594],[1384953973000,164670253],[1385040962000,211135932],[1385127365000,220307439],[1385213763000,255664267],[1385300163000,243464101],[1385389862000,251341715],[1385476263000,346288858],[1385562375000,608339092],[1385650275000,1177317283],[1385747470000,839393703],[1385833872000,910110222],[1385922962000,793111860],[1386010261000,731820216],[1386096662000,823445091],[1386183062000,1014459547],[1386269463000,926523473],[1386355862000,716944845],[1386442267000,579734934],[1386528662000,588094634],[1386615062000,729421501],[1386701766000,836876083],[1386788162000,737075965],[1386874561000,738888708],[1386960962000,734685099],[1387047663000,731620566],[1387134062000,741291928],[1387220463000,632561637],[1387306862000,559079418],[1387393262000,381657078],[1387479971000,435211247],[1387566362000,442900417],[1387654563000,408854558],[1387740962000,413275787],[1387828861000,419781896],[1387915262000,422298897],[1388001662000,487259761],[1388088362000,612031941],[1388174462000,545976523],[1388260862000,548619150],[1388347263000,563520469],[1388433664000,607594562],[1388520063000,597517492],[1388606463000,601777194],[1388692866000,625306505],[1388779562000,592221946],[1388865963000,619647470],[1388952363000,651252321],[1389040865000,728338292],[1389129065000,623425807],[1389215464000,592816515],[1389301879000,594994523],[1389388864000,606550333],[1389475264000,653268338],[1389561663000,630757731],[1389705364000,591066914],[1389791763000,623521165],[1389879062000,622918705],[1389973863000,592447287],[1390067162000,600175773],[1390154462000,620824589],[1390248662000,638079917],[1390335364000,620505326],[1390451777000,590899599],[1390560363000,524025252],[1390646763000,536977370],[1390733462000,581258500],[1390830663000,581115756],[1390917062000,544889387],[1391003462000,551403239],[1391089862000,537235146],[1391176263000,548414760],[1391262663000,582735252],[1391349063000,580614499],[1391435765000,552621780],[1391523366000,550255652],[1391609767000,547046728],[1391697074000,519013535],[1391783466000,487758721],[1391869876000,473926497],[1391958667000,471916470],[1392045384000,437355291],[1392132088000,465530969],[1392218497000,438109901],[1392304896000,421219789],[1392391294000,410011811],[1392477986000,413848776],[1392564379000,397347174],[1392651395000,407014106],[1392737818000,398556278],[1392824503000,404855950],[1392911197000,381268507],[1392998196000,359750266],[1393084888000,364226654],[1393171297000,410112003],[1393257698000,386790222],[1393344696000,354304949],[1393433783000,373034293],[1393521091000,369834264],[1393608092000,357432834],[1393695091000,358938030],[1393781499000,343975902],[1393869077000,356866964],[1393964479000,431728865],[1394053879000,423328604],[1394140880000,428933052],[1394227581000,417674298],[1394313993000,406196786],[1394400371000,423039731],[1394486776000,418636392],[1394573174000,427557682],[1394659576000,455638211],[1394745975000,451703565],[1394834774000,440658459],[1394921176000,450486517],[1395007590000,460853728],[1395093980000,462046585],[1395180385000,514410305],[1395267385000,470165756],[1395353785000,439003419],[1395440781000,424718445],[1395527181000,423885989],[1395613581000,413948724],[1395700583000,430719026],[1395787288000,437717964],[1395904883000,411846133],[1395991290000,384724958],[1396097492000,370028161],[1396194088000,344282108],[1396280485000,351326530],[1396368701000,358273493],[1396455104000,324515814],[1396543286000,301130466],[1396629688000,299637776],[1396716087000,300504131],[1396802496000,315797075],[1396888894000,311336551],[1396976485000,309599290],[1397063495000,307526925],[1397149885000,266932532],[1397236296000,290646281],[1397322696000,296325539],[1397409094000,271520779],[1397496089000,315233433],[1397582488000,349765257],[1397670387000,353529775],[1397757390000,341990142],[1397843789000,324941179],[1397930181000,347334221],[1398016585000,347271215],[1398103287000,343687094],[1398189693000,340133624],[1398278190000,334299481],[1398366089000,343697674],[1398453988000,305158726],[1398541286000,298607971],[1398629196000,280083931],[1398717087000,285639581],[1398820291000,289566891],[1398918085000,316391245],[1399004485000,305668323],[1399090883000,293068433],[1399177286000,289173147],[1399263694000,288940123],[1399350084000,278594807],[1399438584000,292984299],[1399524989000,302199747],[1399611984000,296800759],[1399698379000,304779496],[1399784782000,301885884],[1399871184000,291397790],[1399957583000,293931103],[1400043990000,296497569],[1400130994000,298080583],[1400217382000,295857227],[1400303795000,294899225],[1400390183000,295327841],[1400476583000,294252125],[1400562999000,297731741],[1400649445000,305482209],[1400736695000,300620866],[1400823091000,328320603],[1400955699000,316283811],[1401042094000,329874953],[1401131202000,329717744],[1401217590000,322956392],[1401303985000,315505842],[1401390386000,312862755],[1401477687000,323692697],[1401564109000,312898419],[1401650483000,325542908],[1401736887000,325603843],[1401823285000,331921735],[1401911785000,320393772],[1401998784000,326129780],[1402085180000,324858446],[1402171581000,322574735],[1402257984000,327499974],[1402344390000,325948399],[1402430792000,325504345],[1402519888000,322828353],[1402606291000,303578108],[1402692687000,296661029],[1402779086000,286226695],[1402865493000,284169110],[1402951887000,286491569],[1403038288000,283383430],[1403124684000,284807294],[1403211089000,296664103],[1403297485000,289226740],[1403383885000,290165974],[1403470282000,289376139],[1403560588000,286640167],[1403647904000,285947325],[1403764591000,273476969],[1403857885000,273967693],[1403982086000,273949553],[1404074784000,267269556],[1404161192000,264537696],[1404257188000,252831889],[1404352593000,242188296],[1404460890000,237880469],[1404608784000,218410006],[1404741464000,225550574],[1404869041000,235130985],[1404957841000,232910749],[1405044241000,235581503],[1405130641000,236280357],[1405217041000,260677342],[1405303741000,264132386],[1405390141000,260921539],[1405476541000,258619344],[1405562941000,251786472],[1405649341000,261469699],[1405735741000,262640020],[1405822141000,261763818],[1405908541000,256125532],[1405995241000,263022337],[1406081641000,261619512],[1406168041000,257013426],[1406254441000,238610194],[1406340841000,232874435],[1406427241000,232472191],[1406513641000,238443113],[1406603641000,231861892],[1406696041000,233440113],[1406782441000,225178192],[1406870348000,231371578],[1406957641000,236791187],[1407044941000,233151673],[1407131341000,230686051],[1407217742000,225186989],[1407304141000,224119065],[1407390541000,220269999],[1407476941000,223303192],[1407563341000,216064391],[1407649741000,216079336],[1407736141000,213130552],[1407822542000,174209414],[1407908941000,161351350],[1407995341000,153101015],[1408081741000,157786627],[1408168141000,154116916],[1408254541000,154852043],[1408340941000,128357032],[1408427341000,127530843],[1408513741000,138405450],[1408600141000,181265811],[1408686541000,159100360],[1408772941000,158906961],[1408859341000,170591533],[1408945741000,169045733],[1409032141000,173810214],[1409118541000,181230337],[1409204941000,168925377],[1409291341000,164638151],[1409377742000,165244377],[1409464141000,163059373],[1409550541000,153620516],[1409636941000,149620430],[1409723641000,151693063],[1409810041000,155690179],[1409896442000,163352174],[1409982841000,158022952],[1410069241000,161666350],[1410156841000,161477453],[1410243241000,158921853],[1410329641000,166988808],[1410416041000,175617295],[1410502441000,172106327],[1410588841000,174204351],[1410675242000,174686310],[1410761641000,173250762],[1410848041000,164773612],[1410934442000,162863180],[1411020841000,161087986],[1411107241000,149644602],[1411193641000,144739358],[1411280041000,135379599],[1411366441000,142020828],[1411452841000,137280876],[1411539240000,152280087],[1411626240000,145721412],[1411712641000,146589834],[1411799040000,144726823],[1411885440000,143929899],[1411971842000,137646810],[1412058240000,138665380],[1412167440000,143858021],[1412273640000,139892788],[1412360042000,137246997],[1412448541000,129413949],[1412534942000,116514860],[1412621341000,124172855],[1412707741000,124310470],[1412794141000,126826434],[1412880541000,129950389],[1412966941000,124735959],[1413053341000,122389841],[1413139741000,125755897],[1413226141000,126405874],[1413312541000,135863546],[1413398941000,132655979],[1413485641000,131029366],[1413572041000,132202395],[1413658442000,133664942],[1413744841000,132255335],[1413831242000,130215898],[1413917642000,130081388],[1414004041000,127796251],[1414090443000,124826076],[1414176842000,124326098],[1414263243000,122569864],[1414349643000,123927684],[1414436042000,127624070],[1414522441000,127626398],[1414608841000,124907364],[1414695241000,126005220],[1414781642000,125447373],[1414870141000,118977558],[1414960141000,119873692],[1415046542000,120279788],[1415132942000,120387197],[1415219343000,122129443],[1415305741000,122771761],[1415392141000,119960173],[1415478542000,119532561],[1415564941000,121886876],[1415651341000,125031380],[1415737742000,124156145],[1415824141000,137583839],[1415910542000,139049398],[1415996942000,134801239],[1416083342000,129470362],[1416169741000,131658268],[1416256142000,131565623],[1416342541000,129137184],[1416428941000,128320996],[1416515342000,123341852],[1416601742000,119540357],[1416688142000,120127439],[1416774543000,121289567],[1416860942000,125727097],[1416948241000,122390978],[1417034642000,121658521],[1417121041000,121908720],[1417207442000,123109954],[1417293842000,122744673],[1417380241000,122437547],[1417466641000,122593018],[1417553043000,124276462],[1417639443000,124122193],[1417725841000,123761073],[1417812242000,124492824],[1417898647000,124594136],[1417985041000,128016979],[1418071442000,127253720],[1418157841000,121871431],[1418244241000,121311522],[1418448542000,120810848],[1418554442000,121084671],[1418640842000,120390679],[1418727541000,107295904],[1418813941000,102452789],[1418900341000,98707497],[1418986741000,98147434],[1419073142000,102381653],[1419159541000,100132447],[1419245941000,100171166],[1419332341000,100682170],[1419418742000,99753401],[1419505143000,93839648],[1419591541000,96482898],[1419677941000,96750663],[1419764341000,96080937],[1419850741000,94860271],[1419937141000,94801327],[1420023542000,95146202],[1420109941000,95167201],[1420196342000,94173329],[1420282741000,83870972],[1420369141000,74902338],[1420455541000,73872677],[1420541941000,73560327],[1420628341000,74782480],[1420714741000,73169604],[1420816142000,70264222],[1420919343000,58645720],[1421005741000,60768736],[1421092143000,61697126],[1421178543000,56267449],[1421264941000,42536788],[1421351342000,45773877],[1421437741000,49211026],[1421524156000,46264412],[1421610542000,47627704],[1421696941000,47401390],[1421783342000,47291264],[1421869741000,47905941],[1421956141000,50753176],[1422042541000,50706179],[1422128941000,65071464],[1422215343000,78034145],[1422301741000,74804835],[1422388141000,75247886],[1422474541000,69276731],[1422560941000,69571047],[1422647341000,68781466],[1422734041000,69152910],[1422820443000,65595443],[1422906843000,64518745],[1422993243000,66410704],[1423079644000,64501176],[1423166043000,63046734],[1423252743000,65042989],[1423339143000,63551246],[1423425543000,64381587],[1423511943000,62986081],[1423598343000,64787993],[1423684743000,62910480],[1423771143000,63956586],[1423857543000,66785639],[1423943943000,67977177],[1424030343000,66653928],[1424116743000,65884947],[1424203143000,67936310],[1424289543000,66404512],[1424375943000,67299498],[1424462344000,67263790],[1424549343000,67496320],[1424635743000,66124984],[1424722143000,66224836],[1424808543000,67187902],[1424894943000,66387963],[1424981343000,66482117],[1425067743000,68053417],[1425159543000,67812428],[1425245943000,68557856],[1425332343000,71447033],[1425437343000,72324868],[1425523743000,70950156],[1425610143000,71267465],[1425696543000,69970631],[1425782943000,70648745],[1425869344000,70457110],[1425955743000,76604129],[1426042443000,74735553],[1426128843000,74708200],[1426215243000,75735299],[1426301643000,74561370],[1426388043000,74579184],[1426475044000,76394950],[1426561444000,75934309],[1426647843000,73352337],[1426734243000,63218887],[1426820643000,66681810],[1426907043000,65330428],[1426993443000,65474678],[1427079843000,67271304],[1427166243000,66354500],[1427252643000,62511205],[1427339043000,63078886],[1427425443000,63286385],[1427511843000,63664135],[1427598243000,62934065],[1427688843000,62922362],[1427775243000,63072354],[1427861943000,62192432],[1427958243000,63112447],[1428044643000,63526754],[1428131644000,63796164],[1428218043000,63558691],[1428304444000,63987765],[1428390843000,63382256],[1428477244000,63605072],[1428565143000,61650445],[1428651543000,59927892],[1428737943000,57324376],[1428824343000,56548859],[1428910743000,56240778],[1428997143000,51202509],[1429085643000,53827495],[1429172643000,53379165],[1429259043000,54383754],[1429345443000,53775614],[1429431843000,54311974],[1429518243000,54114551],[1429604943000,53941409],[1429691343000,55991808],[1429778043000,55822670],[1429864443000,54945930],[1429957743000,54230701],[1430061843000,50414642],[1430148243000,52178929],[1430234643000,52469391],[1430321044000,52634554],[1430407443000,55178423],[1430493843000,54862545],[1430580243000,54724366],[1430666643000,55589057],[1430753056000,54921241],[1430839454000,54274268],[1430932143000,54598393],[1431018543000,54548107],[1431104943000,57754917],[1431191343000,56594227],[1431277743000,55752058],[1431364143000,56405176],[1431450543000,56336901],[1431536943000,57165771],[1431623343000,56429613],[1431709750000,56697721],[1431796149000,56648253],[1431882543000,56946880],[1431968943000,57230475],[1432055343000,56907486],[1432142043000,57238139],[1432228443000,58183522],[1432314843000,71975803],[1432401243000,71517920],[1432487643000,71602467],[1432574043000,70721438],[1432661043000,71419235],[1432747443000,72451202],[1432834743000,72868486],[1432928643000,72282718],[1433015043000,71581560],[1433101443000,64871834],[1433188143000,63304278],[1433278143000,65944909],[1433364543000,66943353],[1433450944000,66061971],[1433537343000,68612191],[1433626143000,69996895],[1433712543000,68664030],[1433798944000,71174453],[1433885343000,71520618],[1433971743000,69904000],[1434058143000,71052806],[1434144543000,71824182],[1434236043000,74075719],[1434322443000,79628938],[1434408843000,80176480],[1434495243000,110522431],[1434581643000,115722030],[1434668043000,124722654],[1434754443000,112866745],[1434840843000,120614477],[1434927243000,120772392],[1435013643000,122068681],[1435100043000,119783129],[1435186443000,112780777],[1435272843000,114685789],[1435359244000,115131815],[1435445643000,124977151],[1435532043000,131765657],[1435618449000,152711945],[1435704870000,164842607],[1435791243000,159175760],[1435877643000,164543864],[1435964044000,167112516],[1436050443000,166054202],[1436136843000,194689433],[1436223243000,223616356],[1436309646000,218774290],[1436396043000,249137312],[1436482443000,315270775],[1436568843000,187868447],[1436655243000,178597776],[1436741647000,215051607],[1436828043000,192532833],[1436914443000,189310504],[1437000845000,172447982],[1437087247000,147013897],[1437173644000,157637938],[1437260344000,163820206],[1437346743000,152226970],[1437433444000,157977918],[1437519844000,155433458],[1437606244000,156510781],[1437692044000,155591412],[1437778443000,186679026],[1437864844000,190511061],[1437951243000,190674452],[1438037644000,191924356],[1438124044000,209175578],[1438210443000,198427041],[1438296844000,189261708],[1438383244000,189454800],[1438469943000,172588420],[1438556343000,173370476],[1438642744000,175271489],[1438729444000,180750638],[1438815844000,179978538],[1438902252000,168482628],[1438988644000,172488271],[1439075044000,163520819],[1439161445000,162165648],[1439247844000,163724405],[1439334544000,170900926],[1439420943000,168281564],[1439507343000,161676159],[1439593743000,167701283],[1439680143000,163589346],[1439766543000,165568962],[1439852943000,166781714],[1439939343000,161608324],[1440026643000,144610200],[1440113043000,150704811],[1440199443000,149760523],[1440286143000,146768523],[1440372543000,141830741],[1440459243000,125001786],[1440545643000,123385764],[1440632043000,124390843],[1440718443000,119578649],[1440804843000,122323261],[1440891843000,121089305],[1440978243000,119371453],[1441064643000,119722448],[1441151043000,118608307],[1441237443000,117723994],[1441323843000,110925302],[1441410243000,113822259],[1441496643000,123034416],[1441583043000,128580116],[1441669443000,128676165],[1441756443000,128632366],[1441842843000,123394768],[1441929243000,124464835],[1442015643000,124943347],[1442102643000,119372547],[1442189043000,118996550],[1442275443000,120279541],[1442361843000,119718306],[1442448243000,118756734],[1442534643000,123219527],[1442622243000,125231401],[1442709543000,120686297],[1442797443000,120773864],[1442894043000,119395177],[1442980443000,121692853],[1443066843000,122486903],[1443153843000,123766666],[1443240243000,122861531],[1443327543000,122626338],[1443413943000,126196962],[1443500643000,134498408],[1443587043000,127620352],[1443673443000,127784176],[1443759843000,127461499],[1443846243000,127789619],[1443933543000,130019503],[1444019943000,129045247],[1444106343000,128594043],[1444192743000,133039006],[1444279147000,130781253],[1444365543000,132457204],[1444451944000,133701111],[1444539243000,132719203],[1444625643000,135018013],[1444712043000,133100871],[1444798443000,135671851],[1444884843000,133690463],[1444971244000,132813417],[1445057644000,132795239],[1445144643000,131274082],[1445231043000,129096426],[1445317743000,131174184],[1445404143000,132973479],[1445490544000,131779690],[1445576943000,133474205],[1445663343000,133331316],[1445751243000,133989060],[1445837643000,131771075],[1445924043000,132761586],[1446010443000,132889785],[1446096843000,132127633],[1446183243000,172467317],[1446269643000,169636068],[1446361743000,164721849],[1446448143000,169882115],[1446534543000,180738567],[1446620943000,201912187],[1446707943000,172861924],[1446794343000,155354828],[1446880743000,157705305],[1446969243000,152412786],[1447055643000,142238877],[1447142045000,148112878],[1447228443000,128062141],[1447314843000,137864985],[1447401243000,137703672],[1447487643000,138637953],[1447575843000,138009610],[1447662243000,132980972],[1447748643000,137113412],[1447835043000,137087632],[1447921466000,137989082],[1448007856000,134549560],[1448094243000,136227457],[1448183943000,136050431],[1448270343000,135185344],[1448356743000,134896821],[1448443144000,134265627],[1448529551000,156509270],[1448615943000,156397910],[1448718543000,150599951],[1448804943000,156077121],[1448891344000,156734544],[1448977744000,149603315],[1449064145000,143682501],[1449150549000,146013355],[1449236943000,145529692],[1449323343000,150909990],[1449410044000,151451834],[1449496443000,158307801],[1449582843000,156203606],[1449669244000,159634932],[1449755643000,159319263],[1449842045000,163941607],[1449928444000,153720856],[1450014844000,157435042],[1450101243000,159367851],[1450187652000,166413455],[1450274043000,162593649],[1450360443000,162657865],[1450446844000,163533784],[1450533243000,163909389],[1450619644000,161879559],[1450706044000,153000108],[1450792444000,150036737],[1450878844000,155632445],[1450965244000,159160838],[1451051655000,157836363],[1451138044000,148616324],[1451224443000,150252733],[1451310843000,152039034],[1451397244000,152084651],[1451483643000,151212720],[1451570043000,151637584],[1451656443000,153065981],[1451742843000,153325866],[1451829245000,152693098],[1451915643000,152701219],[1452002043000,152190774],[1452088443000,152041732],[1452174871000,157030004],[1452261242000,156887282],[1452347643000,156233454],[1452434642000,154743773],[1452521043000,156273084],[1452608942000,155422528],[1452695942000,152080728],[1452782343000,152414634],[1452868742000,139573182],[1452955143000,133462559],[1453041543000,134555207],[1453127942000,134271306],[1453214343000,134441657],[1453300742000,140544910],[1453387743000,145124999],[1453474142000,138153233],[1453560543000,136376372],[1453646942000,139489121],[1453733343000,140236095],[1453819742000,139530143],[1453906142000,144056579],[1453993442000,139485122],[1454079842000,137358071],[1454166242000,137082877],[1454252643000,136815694],[1454339042000,136579014],[1454425442000,136253768],[1454511842000,135545634],[1454598242000,140082817],[1454684643000,139698034],[1454771043000,136971418],[1454857442000,137889536],[1454943842000,136890656],[1455030243000,136649343],[1455116642000,139108969],[1455203042000,137674205],[1455289443000,137923929],[1455375842000,138853755],[1455462242000,142375102],[1455548642000,142775800],[1455635043000,142733643],[1455721443000,145003497],[1455807842000,144366870],[1455894242000,145632036],[1455980642000,153571096],[1456067042000,152565300],[1456153443000,154180484],[1456239842000,151994825],[1456326243000,150498308],[1456412642000,150635252],[1456499643000,152042725],[1456586042000,152745480],[1456672442000,155041381],[1456758843000,155024765],[1456845242000,153640770],[1456931642000,152488645],[1457018042000,149219610],[1457104442000,148913428],[1457190842000,141658418],[1457277242000,144945317],[1457363642000,145625316],[1457450042000,144934064],[1457536742000,146630800],[1457623142000,146988344],[1457709542000,151688828],[1457795942000,147932537],[1457882342000,148197830],[1457968742000,148129345],[1458055142000,147672339],[1458141542000,148288786],[1458229142000,148406528],[1458315542000,143150323],[1458401942000,142389604],[1458488342000,143938007],[1458577442000,144104271],[1458663842000,145452960],[1458750242000,145799711],[1458836643000,145943864],[1458923042000,145689378],[1459009442000,144945545],[1459095842000,148683400],[1459182242000,147303632],[1459268642000,144801816],[1459355042000,145210877],[1459441442000,146254270],[1459527842000,146355890],[1459614243000,147215417],[1459701242000,147172683],[1459787642000,146146924],[1459877042000,146792649],[1459963442000,147004545],[1460049842000,146923058],[1460136542000,146863519],[1460222942000,145651888],[1460309342000,146207575],[1460395742000,146240560],[1460482142000,147721679],[1460568542000,147159087],[1460654942000,146932725],[1460741342000,148189467],[1460827742000,148619765],[1460914142000,148008817],[1461000542000,147695798],[1461086942000,147810228],[1461173342000,149297251],[1461259742000,150715545],[1461346142000,151280905],[1461432542000,150968841],[1461518942000,160906430],[1461605342000,171445354],[1461691742000,181123263],[1461778142000,182789884],[1461864542000,169958212],[1461950942000,173248726],[1462037342000,170417846],[1462123742000,168491314],[1462210142000,166841019],[1462296542000,169157613],[1462382942000,171120674],[1462469342000,169342630],[1462555742000,172009815],[1462642142000,179299688],[1462728542000,179385359],[1462814942000,185710846],[1462901342000,177507152],[1462987742000,176998394],[1463074142000,174580524],[1463160542000,180611574],[1463246942000,183121862],[1463333342000,186308616],[1463419742000,189800933],[1463506142000,182717931],[1463606342000,184778840],[1463692742000,178594095],[1463779142000,176934829],[1463865542000,181862767],[1463951942000,179720775],[1464038342000,181301238],[1464124742000,181448721],[1464211142000,184030133],[1464297542000,188090372],[1464383942000,210871383],[1464470342000,213729084],[1464556742000,217650700],[1464643142000,215168428],[1464729542000,212319655],[1464815942000,217987318],[1464902342000,217198779],[1464988742000,223687525],[1465075142000,221148971],[1465161542000,221155363],[1465247942000,227977426],[1465334343000,219264449],[1465420742000,217480194],[1465507142000,216842332],[1465593542000,223342484],[1465679942000,225262662],[1465766342000,249654128],[1465852742000,240943448],[1465939142000,241092395],[1466025543000,241212116],[1466111942000,249655971],[1466198342000,261228836],[1466284742000,256782478],[1466371142000,259441842],[1466457542000,249645333],[1466543942000,219841895],[1466630342000,185435567],[1466716742000,176136864],[1466803142000,194498969],[1466889542000,191590765],[1466975942000,189678329],[1467062342000,190272081],[1467148742000,190417495],[1467235142000,189094053],[1467321542000,193865856],[1467407942000,196828214],[1467494342000,212409609],[1467580742000,196899610],[1467667142000,209016620],[1467753542000,208083085],[1467839942000,208465578],[1467926342000,186233189],[1468012742000,195668519],[1468099142000,191042403],[1468185543000,191044688],[1468271942000,191133343],[1468358342000,195823576],[1468445342000,194246289],[1468531742000,193782322],[1468618142000,193945429],[1468704542000,193105335],[1468791242000,195660238],[1468877642000,194251348],[1468964042000,193786953],[1469050442000,192764693],[1469136842000,193176166],[1469223242000,190051557],[1469309642000,189462323],[1469396042000,190341264],[1469482442000,189385329],[1469568842000,186429439],[1469655242000,185954653],[1469741642000,185974555],[1469828042000,191550689],[1469914443000,190652891],[1470000842000,189922532],[1470087242000,183130937],[1470173642000,170650985],[1470260044000,174890212],[1470346442000,174590459],[1470432842000,175379226],[1470519242000,176810341],[1470605642000,176962955],[1470692042000,178048010],[1470778442000,176449327],[1470864842000,176641400],[1470951242000,175857838],[1471037642000,173958940],[1471126142000,174647669],[1471212542000,172081566],[1471298942000,169353668],[1471385342000,171594957],[1471471742000,169968289],[1471558142000,170278006],[1471644542000,170343811],[1471730942000,170423502],[1471817342000,170165596],[1471904042000,172273597],[1471990442000,186215915],[1472076843000,183498799],[1472163243000,179865017],[1472249643000,181079115],[1472336042000,177045312],[1472422449000,176830864],[1472508843000,177720821],[1472595243000,180445454],[1472681643000,179339650],[1472768043000,181186255],[1472854443000,180596857],[1472940843000,183627356],[1473027243000,189971279],[1473113643000,188546892],[1473200043000,188549080],[1473286443000,188302585],[1473372843000,188884038],[1473459243000,188463403],[1473545643000,188577505],[1473632043000,184605087],[1473718443000,182022343],[1473804843000,181483544],[1473891243000,182725749],[1473977643000,181825162],[1474064043000,181312006],[1474150456000,181369538],[1474236843000,193240021],[1474323243000,182243569],[1474409643000,183311427],[1474496043000,180153587],[1474582443000,183357661],[1474668843000,181844179],[1474755243000,181609428],[1474841642000,181263507],[1474928643000,184500823],[1475015043000,183671046],[1475101443000,183119593],[1475187843000,184266800],[1475274242000,183259263],[1475360643000,183891196],[1475447042000,183367131],[1475533443000,183514963],[1475619843000,183250010],[1475706243000,184126073],[1475792643000,183883203],[1475879042000,184975809],[1475965442000,184083097],[1476051843000,182735040],[1476138243000,181460502],[1476224644000,183329699],[1476311043000,180305503],[1476397443000,187730942],[1476483843000,186827740],[1476570243000,185996097],[1476656643000,186618316],[1476743043000,187743741],[1476829743000,184136912],[1476916143000,182856506],[1477002543000,182288376],[1477088943000,183411229],[1477175355000,187033437],[1477261743000,188224585],[1477348143000,186152584],[1477434543000,187836428],[1477521243000,190339845],[1477607643000,193269807],[1477694044000,191310277],[1477780743000,197140909],[1477867453000,194077106],[1477953843000,193494098],[1478040243000,197517650],[1478126643000,197587390],[1478213043000,186973975],[1478299443000,186696797],[1478385843000,187007435],[1478475843000,187823302],[1478562243000,185597767],[1478648643000,186029157],[1478735043000,186645877],[1478821443000,185008099],[1478907843000,184513006],[1478994243000,182051785],[1479080643000,187365735],[1479167043000,187646500],[1479253458000,188846405],[1479339843000,195154621],[1479426243000,191012325],[1479512643000,191919419],[1479599043000,191214976],[1479685443000,190450356],[1479771843000,191706657],[1479858243000,191915667],[1479944643000,190291414],[1480031043000,189803217],[1480117443000,190335119],[1480203843000,189211260],[1480290243000,188877163],[1480376643000,188881517],[1480463043000,188677262],[1480549443000,189304960],[1480635843000,190156994],[1480722243000,191858853],[1480808943000,191462667],[1480895343000,190009399],[1480981743000,173003218],[1481068143000,172417977],[1481154543000,176496031],[1481240943000,180202799],[1481327343000,180101605],[1481413743000,179947316],[1481500143000,177919986],[1481586543000,178888253],[1481673243000,178413620],[1481759643000,177649540],[1481846043000,177201415],[1481932443000,177454023],[1482018843000,180728047],[1482105259000,179819175],[1482191643000,179112167],[1482278043000,179287025],[1482364443000,179016129],[1482450843000,181673382],[1482537243000,226534598],[1482623643000,223116631],[1482710043000,213218795],[1482796443000,213400695],[1482882843000,218607414],[1482969243000,223904499],[1483055643000,223648377],[1483142043000,215536357],[1483228443000,212517503],[1483314843000,221698431],[1483401243000,228478985],[1483487643000,227400616],[1483574043000,237308612],[1483660443000,211378895],[1483746843000,189843912],[1483833243000,194374425],[1483919643000,196692371],[1484006043000,211959468],[1484092743000,226238983],[1484179143000,189604833],[1484265843000,194683771],[1484352243000,191986830],[1484438643000,191859102],[1484525043000,193560044],[1484611443000,192814075],[1484697843000,194677789],[1484784243000,189781622],[1484870643000,190693394],[1484957043000,192408200],[1485043443000,192952975],[1485129843000,190717271],[1485216243000,189741376],[1485302643000,187624602],[1485389081000,183872880],[1485475443000,190149197],[1485561843000,190872106],[1485648244000,190872918],[1485734644000,191114974],[1485821056000,199116002],[1485907443000,202128401],[1485994144000,202227791],[1486080540000,202322202],[1486166941000,203082699],[1486253340000,201790527],[1486339741000,201618456],[1486426140000,201458577],[1486512541000,201349355],[1486598940000,200152639],[1486685341000,189078138],[1486771741000,187957545],[1486858141000,188474587],[1486944540000,187568027],[1487030940000,184913406],[1487117940000,187675711],[1487204340000,189112257],[1487290740000,188356320],[1487377140000,190457967],[1487463540000,188754515],[1487549940000,187943368],[1487636340000,187406154],[1487722740000,189071583],[1487809140000,189670329],[1487895540000,191753053],[1487981941000,192242577],[1488068340000,190797853],[1488154741000,190415792],[1488241140000,190316561],[1488327840000,188534300],[1488414240000,189885647],[1488500641000,195526868],[1488587040000,195718981],[1488673441000,193358404],[1488759840000,193793702],[1488846240000,195171109],[1488932640000,190797340],[1489019040000,188900575],[1489105440000,191678693],[1489191840000,188921920],[1489278242000,190047576],[1489364640000,193141316],[1489451041000,209274207],[1489537441000,202621308],[1489623840000,207844875],[1489710240000,211091884],[1489797250000,207754986],[1489883641000,201063399],[1489970040000,198854849],[1490056740000,202918766],[1490143140000,200632192],[1490229541000,198077114],[1490315940000,200231249],[1490402340000,204853482],[1490488740000,205048929],[1490575141000,205806196],[1490661541000,205063588],[1490747940000,207468767],[1490834341000,211509227],[1490920741000,348968058],[1491007142000,328318337],[1491093541000,345122401],[1491179940000,388405224],[1491266340000,412076449],[1491352741000,413276856],[1491439140000,548094152],[1491525541000,504420245],[1491611940000,473715352],[1491698340000,500504460],[1491784740000,443110159],[1491871141000,445796525],[1491957541000,448410909],[1492043941000,543890033],[1492130341000,515299880],[1492216745000,524984515],[1492303141000,541770631],[1492389541000,539575398],[1492475941000,530619535],[1492562341000,523354454],[1492648740000,487178745],[1492735142000,521724479],[1492821540000,567271809],[1492907941000,667983072],[1492994341000,704384963],[1493080740000,763409963],[1493167140000,766301932],[1493253541000,759156495],[1493339941000,744870221],[1493426341000,733583664],[1493512740000,805140734],[1493599141000,798501026],[1493685542000,815434718],[1493771944000,806151071],[1493858342000,1076754143],[1493944741000,1240067280],[1494031141000,1358706710],[1494117541000,1456386654],[1494203941000,1520260255],[1494290341000,1501120777],[1494376741000,1614536404],[1494463140000,1655809727],[1494549541000,1600343425],[1494635941000,1406247337],[1494722341000,1495833730],[1494808741000,1467044936],[1494895141000,1282633569],[1494981541000,1170171069],[1495067941000,1284661593],[1495154342000,1438630296],[1495240741000,1407599383],[1495327141000,1400517195],[1495413559000,1343769383],[1495499941000,1301168952],[1495586342000,1637261844],[1495672740000,1739210857],[1495760641000,1526572144],[1495847041000,1267762096],[1495933441000,1271748760],[1496019841000,1247440531],[1496106241000,1290612555],[1496192641000,1264890246],[1496279041000,1313439540],[1496365441000,1468752045],[1496451841000,1486777315],[1496538241000,1396644530],[1496624641000,1477133348],[1496711041000,1572920961],[1496797441000,1559602846],[1496886241000,1447267323],[1496972641000,1562322513],[1497059041000,1548120095],[1497145441000,1561642037],[1497231841000,1689475882],[1497318241000,1533588330],[1497404641000,1626360235],[1497491041000,1528263868],[1497577441000,1537522013],[1497663841000,2031593612],[1497750241000,2396992363],[1497836641000,2336727295],[1497923041000,2588406312],[1498009441000,2427121984],[1498095841000,2440408858],[1498182241000,2458875409],[1498268641000,2434919043],[1498355041000,2275076430],[1498441442000,2280552648],[1498560271000,2014246308],[1498687741000,2244788221],[1498774141000,2145955864],[1498860541000,2091239000],[1498946941000,1996960630],[1499033341000,2158857188],[1499119742000,2484619416],[1499206141000,2778815706],[1499292541000,2726634426],[1499378941000,2674925978],[1499465341000,2383550177],[1499551742000,2661354589],[1499638141000,2649089002],[1499724542000,2424531136],[1499810940000,2363826503],[1499924641000,2449149134],[1500012541000,2370588604],[1500098941000,2094919817],[1500185341000,2065291193],[1500271741000,2182929245],[1500358141000,2259515711],[1500444541000,2287931345],[1500530941000,2200360515],[1500617341000,2445902797],[1500703741000,2392560166],[1500790141000,2386511676],[1500876543000,2262611633],[1500962943000,2321717642],[1501049344000,2131040904],[1501135743000,2210942926],[1501222145000,2205431543],[1501308545000,2059577916],[1501394944000,2129878573],[1501481345000,2099254405],[1501567744000,2284002757],[1501654144000,2243472452],[1501740545000,2206531022],[1501826946000,2247006670],[1501913344000,2389300255],[1501999742000,2389061962],[1502086142000,2386967948],[1502172541000,2415611660],[1502258941000,2610862057],[1502345341000,2499989090],[1502431741000,2468646798],[1502518141000,2474551379],[1502604541000,2481942005],[1502690942000,2413901613],[1502777341000,2272201262],[1502863741000,2236746160],[1502950143000,2318947386],[1503036542000,2414103209],[1503122943000,2388879414],[1503209344000,2383022671],[1503295742000,2414999457],[1503382143000,2440173796],[1503468543000,2460756705],[1503554943000,2713410830],[1503641345000,2624088401],[1503727744000,2664355826],[1503814144000,2922145565],[1503900544000,3197938400],[1503966844000,3296374790],[1504060445000,3315939035],[1504112643000,3265499643],[1504198746000,3654071012],[1504285144000,4182884170],[1504371544000,3907903832],[1504457945000,4059648147],[1504544645000,3347996191],[1504631045000,3631520232],[1504717143000,4159753784],[1504803545000,4182640500],[1504890246000,3654376172],[1504976647000,3500744053],[1505063046000,3343287294],[1505149443000,3555569408],[1505235845000,3480552024],[1505322242000,3283952389],[1505408643000,2543311216],[1505495045000,2494947512],[1505581443000,2556545734],[1505667843000,2613049365],[1505754245000,2883372492],[1505840344000,2873355882],[1505926742000,2819357142],[1506013142000,2558799492],[1506099842000,2433028774],[1506185942000,2593617239],[1506272641000,2545449008],[1506359042000,2758330208],[1506445142000,2776183075],[1506531842000,2852021212],[1506617941000,2881774336],[1506704341000,2850018912],[1506791041000,2918103274],[1506877142000,2878610897],[1506963843000,2864944469],[1507049942000,2763294237],[1507136642000,2761125982],[1507223041000,2738638731],[1507309142000,2787186426],[1507395842000,2755426621],[1507481942000,2870614537],[1507568641000,2708946537],[1507655042000,2728565474],[1507741141000,2705849166],[1507827841000,3066757119],[1507914241000,3133152096],[1508000642000,3482588254],[1508087042000,3373623597],[1508173441000,3423714353],[1508259841000,3206162367],[1508345941000,3102884599],[1508432342000,3180631409],[1508519041000,3273163109],[1508605441000,3061760511],[1508691841000,3053574049],[1508778241000,2904170535],[1508864642000,3079144908],[1508951041000,2947232961],[1509037445000,3003356792],[1509123842000,2966882805],[1509209941000,2929865964],[1509296641000,3053020593],[1509383042000,3035873251],[1509469441000,3015432278],[1509555541000,2931570855],[1509641941000,2850002912],[1509728641000,2953614540],[1509815041000,2987692042],[1509901441000,2951090417],[1509987842000,2985045087],[1510074241000,3184556677],[1510160641000,3331433126],[1510246742000,3410938430],[1510333441000,3308351334],[1510419541000,3319710127],[1510505941000,3202286097],[1510592341000,3276025328],[1510679041000,3387415807],[1510765142000,3441159686],[1510851542000,3467142283],[1510937942000,3642776245],[1511024642000,3635310905],[1511110741000,3874490641],[1511197141000,3887219975],[1511283542000,3827762805],[1511369942000,3829234940],[1511456642000,4113085030],[1511542742000,4095801946],[1511629442000,4624640939],[1511715542000,4613309303],[1511801942000,4874270748],[1511888641000,5050249426],[1511974741000,5479116951],[1512061141000,4327615166],[1512147841000,5102063630],[1512233941000,5380663026],[1512320342000,5600951883],[1512406742000,5325428943],[1512493142000,5513659166],[1512579541000,5483977215],[1512666242000,5076404089],[1512752342000,6756604857],[1512925441000,8072975473],[1513011842000,10083903870],[1513098242000,17781727884],[1513184642000,16906090585],[1513271042000,15476611890],[1513357443000,17031604103],[1513530242000,17248931963],[1513616642000,17395865821],[1513703041000,19467713126],[1513789441000,17130983433],[1513875842000,16820789050],[1513962242000,13025032059],[1514048644000,16564880152],[1514135042000,14646928735],[1514221441000,15051893917],[1514307841000,15752732132],[1514394241000,14553402581],[1514480641000,13377839592],[1514567041000,13638824537],[1514653441000,11355388783],[1514739841000,12929234297],[1514826242000,12384512327],[1514912641000,14104713123],[1514999041000,13704639112],[1515085441000,13276167282],[1515171542000,13764883988],[1515257941000,16594474297],[1515344641000,15726204823],[1515431097000,14354052614.868685],[1515517497000,14855133850.45269],[1515603897000,14194746305.946398],[1515690298000,13389470174.187511],[1515776698000,13272255412.211432],[1515863097000,14373946765.236006],[1515949497000,13689481681.669868],[1516035898000,13775441795.850443],[1516122298000,11258335592.447872],[1516208697000,9262781993.094057],[1516295098000,11126081605.865437],[1516381498000,10902944864.180557],[1516467898000,11833567687.034428],[1516554297000,10393301659.173273],[1516640698000,9871443559.885038],[1516727098000,10342344157.565903],[1516813498000,9972610213.264948],[1516899897000,9888855468.435188],[1516986298000,9803998870.834196],[1517072698000,10055617663.248795],[1517159098000,10438167268.878654],[1517245498000,10232584512.9828],[1517331898000,9502786098.43456],[1517418297000,8902174504.933586],[1517504699000,7872476735.151247],[1517591098000,7331492049.496685],[1517677498000,8233327245.055186],[1517763898000,8492284055.446213],[1517850297000,7283185296.645426],[1517936698000,7051025855.43738],[1518023097000,8150306987.50952],[1518109498000,7962045842.09704],[1518195898000,8488962846.272695],[1518282298000,8344369524.512177],[1518368698000,8451486812.320855],[1518455098000,8685073711.654446],[1518541498000,8676866916.61586],[1518627899000,11455386872.641571],[1518714298000,12161631200.021898],[1518800699000,12857616139.841719],[1518887098000,12650723444.215578],[1518973498000,12534192815.562597],[1519059898000,12370557648.469095],[1519146298000,13682093621.715286],[1519232697000,11602761307.52367],[1519319098000,10840252911.829586],[1519405497000,11520173320.902029],[1519491898000,11369347281.299126],[1519578298000,11728023758.591017],[1519664698000,12321381468.175707],[1519751098000,12026375700.021112],[1519837497000,11528692369.987854],[1519923899000,11852052485.86109],[1520010298000,11477828619.645748],[1520096701000,11835050842.082815],[1520183101000,11650913648.90564],[1520269500000,11794158021.90197],[1520355898000,11227148029.27226],[1520442299000,10139574107.535925],[1520528699000,9883521846.825167],[1520615098000,9806810341.158327],[1520701498000,10524419970.950926],[1520787898000,10440254931.25586],[1520874298000,10079112002.081686],[1520960699000,9891506801.777067],[1521047099000,9114248877.992346],[1521133499000,8957500808.409943],[1521219897000,9398265888.324194],[1521306298000,8712288219.321375],[1521355707000,8329292203.49148]],"price_usd": [[1367174842000,4.29983],[1367261402000,4.3594],[1367347803000,4.18295],[1367434202000,3.64914],[1367523302000,3.38879],[1367609702000,2.78957],[1367696102000,3.51708],[1367782802000,3.63013],[1367869502000,3.50733],[1367955902000,3.21463],[1368042302000,3.4615],[1368130201000,3.4239],[1368218702000,3.50018],[1368307501000,3.38675],[1368393902000,3.24093],[1368480301000,3.20229],[1368566702000,3.0673],[1368653702000,2.93058],[1368740102000,2.86922],[1368826502000,3.15827],[1368913804000,3.32471],[1369000201000,3.27158],[1369086602000,3.18818],[1369174202000,3.08331],[1369261201000,3.0921],[1369347602000,3.1525],[1369435202000,3.14642],[1369524902000,3.1162],[1369611602000,3.2562],[1369698002000,3.11957],[1369784402000,3.09213],[1369872302000,3.07544],[1369958702000,2.94667],[1370046304000,2.94623],[1370133001000,2.8435],[1370219702000,2.6895],[1370306104000,2.7273],[1370397302000,2.98423],[1370484302000,2.83148],[1370570747000,2.7589],[1370657402000,2.5823],[1370744102000,2.53026],[1370830503000,2.31937],[1370917502000,2.48252],[1371004202000,2.39022],[1371090602000,2.3539],[1371177003000,2.24431],[1371263702000,2.12094],[1371350102000,2.0696],[1371436802000,2.113],[1371523203000,2.28174],[1371609902000,2.26624],[1371696302000,2.28867],[1371782702000,2.30062],[1371869102000,2.81578],[1371955502000,3.07596],[1372041903000,3.06858],[1372128302000,2.87482],[1372214702000,2.82429],[1372305902000,2.87716],[1372392301000,2.96028],[1372478702000,2.83478],[1372565702000,2.796],[1372652102000,3.05876],[1372738501000,2.97799],[1372825227000,2.835],[1372912502000,2.58748],[1372998663000,2.67032],[1373085062000,2.43753],[1373171462000,2.40999],[1373257862000,2.68284],[1373344262000,2.62584],[1373430662000,2.5908],[1373517962000,2.78437],[1373604662000,2.82094],[1373691062000,2.702],[1373777461000,2.79461],[1373864462000,2.86238],[1373951162000,2.95499],[1374037562000,3.1363],[1374124862000,3.09778],[1374220862000,2.83108],[1374308172000,2.94747],[1374394562000,2.8741],[1374480962000,2.90203],[1374567362000,2.90663],[1374653775000,2.89478],[1374740162000,2.94829],[1374826262000,2.90025],[1374912661000,2.8811],[1374999062000,2.8854],[1375085462000,2.94805],[1375171862000,2.96412],[1375264262000,2.9615],[1375350661000,2.93786],[1375437061000,2.92638],[1375523462000,2.88654],[1375609861000,2.9925],[1375696262000,2.91851],[1375782662000,2.86431],[1375869063000,2.76763],[1375955461000,2.77139],[1376041862000,2.71414],[1376128262000,2.6471],[1376214663000,2.60786],[1376301474000,2.63477],[1376387762000,2.66569],[1376474161000,2.76535],[1376560872000,2.74753],[1376648462000,2.74309],[1376734862000,2.71122],[1376821262000,2.81783],[1376907662000,2.81232],[1376994063000,2.82928],[1377080461000,2.75302],[1377166862000,2.62637],[1377253261000,2.76157],[1377339662000,2.723],[1377426062000,2.65522],[1377512462000,2.57915],[1377598862000,2.52787],[1377685262000,2.54263],[1377771662000,2.5436],[1377858062000,2.53617],[1377944462000,2.67694],[1378030862000,2.59768],[1378117262000,2.60021],[1378203662000,2.50546],[1378290062000,2.68029],[1378376762000,2.79602],[1378463162000,2.73178],[1378549562000,2.70368],[1378635961000,2.67392],[1378722362000,2.65835],[1378808762000,2.6822],[1378895162000,2.65227],[1378981562000,2.68863],[1379067963000,2.66591],[1379154362000,2.62133],[1379240762000,2.66533],[1379327162000,2.6549],[1379413562000,2.63197],[1379499962000,2.57915],[1379586362000,2.56348],[1379672761000,2.59031],[1379759161000,2.52798],[1379845562000,2.53531],[1379931962000,2.48431],[1380018362000,2.43742],[1380104762000,2.46528],[1380191161000,2.39876],[1380277562000,2.44145],[1380363961000,2.34505],[1380450361000,2.39315],[1380536761000,2.23438],[1380623162000,2.3936],[1380709562000,2.42818],[1380795962000,2.01653],[1380888069000,2.2532],[1380974469000,2.21442],[1381060863000,2.14452],[1381147268000,2.1449],[1381233963000,2.05116],[1381321263000,1.95993],[1381407662000,2.00256],[1381494063000,2.08044],[1381580462000,2.12099],[1381666862000,2.13799],[1381753262000,2.0817],[1381839662000,2.03158],[1381926062000,1.90007],[1382012463000,1.89834],[1382098866000,1.91093],[1382185265000,1.95658],[1382274365000,1.92744],[1382360761000,1.849],[1382447162000,1.71588],[1382533869000,1.89033],[1382620262000,2.17744],[1382706662000,2.60692],[1382793061000,2.21626],[1382879462000,2.24922],[1382965865000,2.14753],[1383052262000,2.18909],[1383138662000,2.1736],[1383225061000,2.24327],[1383311462000,2.33186],[1383398468000,2.45307],[1383484861000,2.97589],[1383570967000,3.08881],[1383657363000,3.03873],[1383744062000,3.08807],[1383830463000,4.39321],[1383916862000,4.5758],[1384003262000,4.26784],[1384089672000,3.88841],[1384176062000,3.9143],[1384262462000,3.99794],[1384348862000,4.22092],[1384435262000,4.34478],[1384521662000,4.33204],[1384608362000,4.38939],[1384694762000,4.29775],[1384781162000,5.44113],[1384867563000,7.8202],[1384953973000,7.10458],[1385040962000,9.09769],[1385127365000,9.48073],[1385213763000,10.9884],[1385300163000,10.4496],[1385389862000,10.7737],[1385476263000,14.8243],[1385562375000,26.0103],[1385650275000,50.266],[1385747470000,35.7801],[1385833872000,38.7441],[1385922962000,33.7176],[1386010261000,31.067],[1386096662000,34.9061],[1386183062000,42.9471],[1386269463000,39.1735],[1386355862000,30.2663],[1386442267000,24.44],[1386528662000,24.7548],[1386615062000,30.6586],[1386701766000,35.1318],[1386788162000,30.9011],[1386874561000,30.9343],[1386960962000,30.7196],[1387047663000,30.5495],[1387134062000,30.9159],[1387220463000,26.3484],[1387306862000,23.2584],[1387393262000,15.8564],[1387479971000,18.0604],[1387566362000,18.3596],[1387654563000,16.9291],[1387740962000,17.0944],[1387828861000,17.344],[1387915262000,17.4283],[1388001662000,20.0852],[1388088362000,25.1989],[1388174462000,22.4503],[1388260862000,22.5277],[1388347263000,23.1105],[1388433664000,24.8874],[1388520063000,24.446],[1388606463000,24.5913],[1388692866000,25.5234],[1388779562000,24.144],[1388865963000,25.2298],[1388952363000,26.4831],[1389040865000,29.5781],[1389129065000,25.2845],[1389215464000,24.0103],[1389301879000,24.0718],[1389388864000,24.5063],[1389475264000,26.363],[1389561663000,25.4246],[1389705364000,23.7795],[1389791763000,25.056],[1389879062000,25.0017],[1389973863000,23.7499],[1390067162000,24.0262],[1390154462000,24.8231],[1390248662000,25.4841],[1390335364000,24.7594],[1390451777000,23.5596],[1390560363000,20.8659],[1390646763000,21.3619],[1390733462000,23.1017],[1390830663000,23.0753],[1390917062000,21.6138],[1391003462000,21.8387],[1391089862000,21.245],[1391176263000,21.6617],[1391262663000,22.9952],[1391349063000,22.8897],[1391435765000,21.7649],[1391523366000,21.6449],[1391609767000,21.4874],[1391697074000,20.3577],[1391783466000,19.1125],[1391869876000,18.5533],[1391958667000,18.4581],[1392045384000,17.092],[1392132088000,18.1777],[1392218497000,17.0879],[1392304896000,16.412],[1392391294000,15.9569],[1392477986000,16.0851],[1392564379000,15.4229],[1392651395000,15.7769],[1392737818000,15.4332],[1392824503000,15.6621],[1392911197000,14.7345],[1392998196000,13.8882],[1393084888000,14.0435],[1393171297000,15.7927],[1393257698000,14.875],[1393344696000,13.6107],[1393433783000,14.3143],[1393521091000,14.1769],[1393608092000,13.6863],[1393695091000,13.7268],[1393781499000,13.1378],[1393869077000,13.6136],[1393964479000,16.4496],[1394053879000,16.1083],[1394140880000,16.3005],[1394227581000,15.853],[1394313993000,15.397],[1394400371000,16.0151],[1394486776000,15.8318],[1394573174000,16.1522],[1394659576000,17.1924],[1394745975000,17.0246],[1394834774000,16.5879],[1394921176000,16.9373],[1395007590000,17.3074],[1395093980000,17.3328],[1395180385000,19.2724],[1395267385000,17.5924],[1395353785000,16.4095],[1395440781000,15.8585],[1395527181000,15.809],[1395613581000,15.4232],[1395700583000,16.0323],[1395787288000,16.2767],[1395904883000,15.2921],[1395991290000,14.2691],[1396097492000,13.7051],[1396194088000,12.7372],[1396280485000,12.9836],[1396368701000,13.2254],[1396455104000,11.9657],[1396543286000,11.0904],[1396629688000,11.0228],[1396716087000,11.0422],[1396802496000,11.5932],[1396888894000,11.4183],[1396976485000,11.343],[1397063495000,11.2546],[1397149885000,9.75873],[1397236296000,10.6145],[1397322696000,10.8104],[1397409094000,9.89581],[1397496089000,11.4767],[1397582488000,12.7204],[1397670387000,12.8443],[1397757390000,12.4126],[1397843789000,11.7826],[1397930181000,12.5835],[1398016585000,12.5689],[1398103287000,12.4269],[1398189693000,12.2852],[1398278190000,12.0613],[1398366089000,12.3855],[1398453988000,10.9843],[1398541286000,10.7344],[1398629196000,10.0568],[1398717087000,10.2442],[1398820291000,10.3693],[1398918085000,11.3166],[1399004485000,10.9216],[1399090883000,10.4595],[1399177286000,10.3099],[1399263694000,10.2913],[1399350084000,9.91287],[1399438584000,10.4147],[1399524989000,10.732],[1399611984000,10.5303],[1399698379000,10.8024],[1399784782000,10.6884],[1399871184000,10.3063],[1399957583000,10.384],[1400043990000,10.4638],[1400130994000,10.5078],[1400217382000,10.4178],[1400303795000,10.3732],[1400390183000,10.3778],[1400476583000,10.3296],[1400562999000,10.4407],[1400649445000,10.7017],[1400736695000,10.5215],[1400823091000,11.4798],[1400955699000,11.0415],[1401042094000,11.5039],[1401131202000,11.4844],[1401217590000,11.236],[1401303985000,10.9662],[1401390386000,10.8631],[1401477687000,11.2259],[1401564109000,10.8407],[1401650483000,11.2675],[1401736887000,11.2579],[1401823285000,11.4637],[1401911785000,11.0529],[1401998784000,11.2394],[1402085180000,11.1841],[1402171581000,11.094],[1402257984000,11.2512],[1402344390000,11.1851],[1402430792000,11.1587],[1402519888000,11.0569],[1402606291000,10.3879],[1402692687000,10.1421],[1402779086000,9.77515],[1402865493000,9.69412],[1402951887000,9.76309],[1403038288000,9.64693],[1403124684000,9.68775],[1403211089000,10.0761],[1403297485000,9.81321],[1403383885000,9.8359],[1403470282000,9.79951],[1403560588000,9.6964],[1403647904000,9.67275],[1403764591000,9.22875],[1403857885000,9.23487],[1403982086000,9.22004],[1404074784000,8.98542],[1404161192000,8.88478],[1404257188000,8.4818],[1404352593000,8.11544],[1404460890000,7.9605],[1404608784000,7.29569],[1404741464000,7.5221],[1404869041000,7.8285],[1404957841000,7.74621],[1405044241000,7.8269],[1405130641000,7.84225],[1405217041000,8.64372],[1405303741000,8.74961],[1405390141000,8.63521],[1405476541000,8.5506],[1405562941000,8.31703],[1405649341000,8.62781],[1405735741000,8.65653],[1405822141000,8.61971],[1405908541000,8.42665],[1405995241000,8.64548],[1406081641000,8.59142],[1406168041000,8.4317],[1406254441000,7.81981],[1406340841000,7.62424],[1406427241000,7.60359],[1406513641000,7.79101],[1406603641000,7.56796],[1406696041000,7.61125],[1406782441000,7.33514],[1406870348000,7.52942],[1406957641000,7.69851],[1407044941000,7.57351],[1407131341000,7.48616],[1407217742000,7.30106],[1407304141000,7.25921],[1407390541000,7.12744],[1407476941000,7.21774],[1407563341000,6.97684],[1407649741000,6.97066],[1407736141000,6.86914],[1407822542000,5.6091],[1407908941000,5.19019],[1407995341000,4.92022],[1408081741000,5.06556],[1408168141000,4.94336],[1408254541000,4.96226],[1408340941000,4.1097],[1408427341000,4.07959],[1408513741000,4.42368],[1408600141000,5.78817],[1408686541000,5.07553],[1408772941000,5.06436],[1408859341000,5.43209],[1408945741000,5.37791],[1409032141000,5.52444],[1409118541000,5.75518],[1409204941000,5.35952],[1409291341000,5.21873],[1409377742000,5.23326],[1409464141000,5.15978],[1409550541000,4.85679],[1409636941000,4.72594],[1409723641000,4.78678],[1409810041000,4.90842],[1409896442000,5.14525],[1409982841000,4.97313],[1410069241000,5.08312],[1410156841000,5.07364],[1410243241000,4.98857],[1410329641000,5.23714],[1410416041000,5.50308],[1410502441000,5.38787],[1410588841000,5.44793],[1410675242000,5.45743],[1410761641000,5.40656],[1410848041000,5.13732],[1410934442000,5.07313],[1411020841000,5.01325],[1411107241000,4.65323],[1411193641000,4.49689],[1411280041000,4.2026],[1411366441000,4.40471],[1411452841000,4.25387],[1411539240000,4.71408],[1411626240000,4.5064],[1411712641000,4.52897],[1411799040000,4.46745],[1411885440000,4.43887],[1411971842000,4.24129],[1412058240000,4.26885],[1412167440000,4.4236],[1412273640000,4.29692],[1412360042000,4.21165],[1412448541000,3.96767],[1412534942000,3.56901],[1412621341000,3.8003],[1412707741000,3.80151],[1412794141000,3.87528],[1412880541000,3.96728],[1412966941000,3.80459],[1413053341000,3.72951],[1413139741000,3.82871],[1413226141000,3.84518],[1413312541000,4.12966],[1413398941000,4.02857],[1413485641000,3.97552],[1413572041000,4.00756],[1413658442000,4.04825],[1413744841000,4.00217],[1413831242000,3.93697],[1413917642000,3.92963],[1414004041000,3.85719],[1414090443000,3.76401],[1414176842000,3.74563],[1414263243000,3.68964],[1414349643000,3.72703],[1414436042000,3.83503],[1414522441000,3.83141],[1414608841000,3.74637],[1414695241000,3.77611],[1414781642000,3.75637],[1414870141000,3.55966],[1414960141000,3.58333],[1415046542000,3.59228],[1415132942000,3.59228],[1415219343000,3.64065],[1415305741000,3.65656],[1415392141000,3.56977],[1415478542000,3.55392],[1415564941000,3.62078],[1415651341000,3.71106],[1415737742000,3.6817],[1415824141000,4.07659],[1415910542000,4.11627],[1415996942000,3.98693],[1416083342000,3.82576],[1416169741000,3.88704],[1416256142000,3.88069],[1416342541000,3.80553],[1416428941000,3.77821],[1416515342000,3.62845],[1416601742000,3.51344],[1416688142000,3.52745],[1416774543000,3.55857],[1416860942000,3.68551],[1416948241000,3.58416],[1417034642000,3.55988],[1417121041000,3.56426],[1417207442000,3.59651],[1417293842000,3.58284],[1417380241000,3.57079],[1417466641000,3.57223],[1417553043000,3.6183],[1417639443000,3.61066],[1417725841000,3.59722],[1417812242000,3.61583],[1417898647000,3.61547],[1417985041000,3.71138],[1418071442000,3.68579],[1418157841000,3.52672],[1418244241000,3.50766],[1418448542000,3.48501],[1418554442000,3.48922],[1418640842000,3.46629],[1418727541000,3.08671],[1418813941000,2.9449],[1418900341000,2.83509],[1418986741000,2.81669],[1419073142000,2.93599],[1419159541000,2.86919],[1419245941000,2.86806],[1419332341000,2.88046],[1419418742000,2.85149],[1419505143000,2.67985],[1419591541000,2.7528],[1419677941000,2.75802],[1419764341000,2.73667],[1419850741000,2.69996],[1419937141000,2.69631],[1420023542000,2.70405],[1420109941000,2.70255],[1420196342000,2.67208],[1420282741000,2.37777],[1420369141000,2.12187],[1420455541000,2.09109],[1420541941000,2.08072],[1420628341000,2.11378],[1420714741000,2.06664],[1420816142000,1.98277],[1420919343000,1.65324],[1421005741000,1.7118],[1421092143000,1.73657],[1421178543000,1.58262],[1421264941000,1.19551],[1421351342000,1.28555],[1421437741000,1.38111],[1421524156000,1.29745],[1421610542000,1.33467],[1421696941000,1.32732],[1421783342000,1.32311],[1421869741000,1.33932],[1421956141000,1.41772],[1422042541000,1.41516],[1422128941000,1.81462],[1422215343000,2.17421],[1422301741000,2.08256],[1422388141000,2.09319],[1422474541000,1.92549],[1422560941000,1.93207],[1422647341000,1.9086],[1422734041000,1.91742],[1422820443000,1.81733],[1422906843000,1.78606],[1422993243000,1.83696],[1423079644000,1.7828],[1423166043000,1.7413],[1423252743000,1.79497],[1423339143000,1.75234],[1423425543000,1.77391],[1423511943000,1.73421],[1423598343000,1.78249],[1423684743000,1.72945],[1423771143000,1.75674],[1423857543000,1.83299],[1423943943000,1.86414],[1424030343000,1.82639],[1424116743000,1.80394],[1424203143000,1.85873],[1424289543000,1.81535],[1424375943000,1.83848],[1424462344000,1.83606],[1424549343000,1.84096],[1424635743000,1.80207],[1424722143000,1.80342],[1424808543000,1.82815],[1424894943000,1.80495],[1424981343000,1.80613],[1425067743000,1.84743],[1425159543000,1.83936],[1425245943000,1.85811],[1425332343000,1.93497],[1425437343000,1.95695],[1425523743000,1.9183],[1425610143000,1.92551],[1425696543000,1.88902],[1425782943000,1.90583],[1425869344000,1.89908],[1425955743000,2.06308],[1426042443000,2.01105],[1426128843000,2.00866],[1426215243000,2.03479],[1426301643000,2.00165],[1426388043000,2.00056],[1426475044000,2.04785],[1426561444000,2.03391],[1426647843000,1.9634],[1426734243000,1.69119],[1426820643000,1.78275],[1426907043000,1.74537],[1426993443000,1.74762],[1427079843000,1.79404],[1427166243000,1.76814],[1427252643000,1.66436],[1427339043000,1.67796],[1427425443000,1.68222],[1427511843000,1.69098],[1427598243000,1.67024],[1427688843000,1.66855],[1427775243000,1.67124],[1427861943000,1.64662],[1427958243000,1.66967],[1428044643000,1.67938],[1428131644000,1.68513],[1428218043000,1.67759],[1428304444000,1.68761],[1428390843000,1.67042],[1428477244000,1.67499],[1428565143000,1.62219],[1428651543000,1.57576],[1428737943000,1.50615],[1428824343000,1.48467],[1428910743000,1.4754],[1428997143000,1.3423],[1429085643000,1.41006],[1429172643000,1.39717],[1429259043000,1.42237],[1429345443000,1.40545],[1429431843000,1.41843],[1429518243000,1.41221],[1429604943000,1.40655],[1429691343000,1.45895],[1429778043000,1.45342],[1429864443000,1.42956],[1429957743000,1.40995],[1430061843000,1.3095],[1430148243000,1.35431],[1430234643000,1.36089],[1430321044000,1.3641],[1430407443000,1.42893],[1430493843000,1.41968],[1430580243000,1.41509],[1430666643000,1.43643],[1430753056000,1.41812],[1430839454000,1.40044],[1430932143000,1.40775],[1431018543000,1.40537],[1431104943000,1.48681],[1431191343000,1.45574],[1431277743000,1.43299],[1431364143000,1.44874],[1431450543000,1.44603],[1431536943000,1.46624],[1431623343000,1.44629],[1431709750000,1.45206],[1431796149000,1.44967],[1431882543000,1.45625],[1431968943000,1.46244],[1432055343000,1.45308],[1432142043000,1.46038],[1432228443000,1.48349],[1432314843000,1.83386],[1432401243000,1.82089],[1432487643000,1.82173],[1432574043000,1.79802],[1432661043000,1.81437],[1432747443000,1.83936],[1432834743000,1.84856],[1432928643000,1.83241],[1433015043000,1.81327],[1433101443000,1.64204],[1433188143000,1.60114],[1433278143000,1.66666],[1433364543000,1.69067],[1433450944000,1.66712],[1433537343000,1.73023],[1433626143000,1.76379],[1433712543000,1.72893],[1433798944000,1.79089],[1433885343000,1.79834],[1433971743000,1.75647],[1434058143000,1.78413],[1434144543000,1.80211],[1434236043000,1.85723],[1434322443000,1.99507],[1434408843000,2.00734],[1434495243000,2.76529],[1434581643000,2.8933],[1434668043000,3.11599],[1434754443000,2.81772],[1434840843000,3.0089],[1434927243000,3.01047],[1435013643000,3.04052],[1435100043000,2.98153],[1435186443000,2.80523],[1435272843000,2.85037],[1435359244000,2.85943],[1435445643000,3.10172],[1435532043000,3.2676],[1435618449000,3.78449],[1435704870000,4.08246],[1435791243000,3.93916],[1435877643000,4.06901],[1435964044000,4.12938],[1436050443000,4.10024],[1436136843000,4.80357],[1436223243000,5.51323],[1436309646000,5.38977],[1436396043000,6.13298],[1436482443000,7.7559],[1436568843000,4.61861],[1436655243000,4.38765],[1436741647000,5.27938],[1436828043000,4.72308],[1436914443000,4.64056],[1437000845000,4.22417],[1437087247000,3.59868],[1437173644000,3.8561],[1437260344000,4.00476],[1437346743000,3.71904],[1437433444000,3.85684],[1437519844000,3.79197],[1437606244000,3.81546],[1437692044000,3.79034],[1437778443000,4.54429],[1437864844000,4.63416],[1437951243000,4.63491],[1438037644000,4.66191],[1438124044000,5.07731],[1438210443000,4.81314],[1438296844000,4.5878],[1438383244000,4.58911],[1438469943000,4.17755],[1438556343000,4.19345],[1438642744000,4.23626],[1438729444000,4.36564],[1438815844000,4.34408],[1438902252000,4.06365],[1438988644000,4.15754],[1439075044000,3.93867],[1439161445000,3.90341],[1439247844000,3.93829],[1439334544000,4.10814],[1439420943000,4.04244],[1439507343000,3.88109],[1439593743000,4.02305],[1439680143000,3.92174],[1439766543000,3.96663],[1439852943000,3.99292],[1439939343000,3.86625],[1440026643000,3.45715],[1440113043000,3.60033],[1440199443000,3.57523],[1440286143000,3.50152],[1440372543000,3.38141],[1440459243000,2.9782],[1440545643000,2.93785],[1440632043000,2.96087],[1440718443000,2.84544],[1440804843000,2.90982],[1440891843000,2.87953],[1440978243000,2.83779],[1441064643000,2.84515],[1441151043000,2.81762],[1441237443000,2.79555],[1441323843000,2.63323],[1441410243000,2.70104],[1441496643000,2.9186],[1441583043000,3.04908],[1441669443000,3.05026],[1441756443000,3.0481],[1441842843000,2.92291],[1441929243000,2.94721],[1442015643000,2.95752],[1442102643000,2.82479],[1442189043000,2.81492],[1442275443000,2.8442],[1442361843000,2.82994],[1442448243000,2.80622],[1442534643000,2.91062],[1442622243000,2.95712],[1442709543000,2.84883],[1442797443000,2.84993],[1442894043000,2.81637],[1442980443000,2.86964],[1443066843000,2.88735],[1443153843000,2.9165],[1443240243000,2.89424],[1443327543000,2.88772],[1443413943000,2.97079],[1443500643000,3.16504],[1443587043000,3.00216],[1443673443000,3.00498],[1443759843000,2.99646],[1443846243000,3.00312],[1443933543000,3.05447],[1444019943000,3.03047],[1444106343000,3.0188],[1444192743000,3.12207],[1444279147000,3.06803],[1444365543000,3.10635],[1444451944000,3.1345],[1444539243000,3.11043],[1444625643000,3.16326],[1444712043000,3.1173],[1444798443000,3.17645],[1444884843000,3.12902],[1444971244000,3.10748],[1445057644000,3.10603],[1445144643000,3.06939],[1445231043000,3.01751],[1445317743000,3.06501],[1445404143000,3.10596],[1445490544000,3.07696],[1445576943000,3.1155],[1445663343000,3.11109],[1445751243000,3.12536],[1445837643000,3.07263],[1445924043000,3.09472],[1446010443000,3.09653],[1446096843000,3.07779],[1446183243000,4.0162],[1446269643000,3.94892],[1446361743000,3.83316],[1446448143000,3.95192],[1446534543000,4.20296],[1446620943000,4.6938],[1446707943000,4.01708],[1446794343000,3.60897],[1446880743000,3.66232],[1446969243000,3.53827],[1447055643000,3.30095],[1447142045000,3.43616],[1447228443000,2.97004],[1447314843000,3.19637],[1447401243000,3.19157],[1447487643000,3.21223],[1447575843000,3.19659],[1447662243000,3.0791],[1447748643000,3.17375],[1447835043000,3.17214],[1447921466000,3.19193],[1448007856000,3.11138],[1448094243000,3.14921],[1448183943000,3.1442],[1448270343000,3.12326],[1448356743000,3.1155],[1448443144000,3.09992],[1448529551000,3.61249],[1448615943000,3.60897],[1448718543000,3.47375],[1448804943000,3.59874],[1448891344000,3.61247],[1448977744000,3.44683],[1449064145000,3.30907],[1449150549000,3.36145],[1449236943000,3.34918],[1449323343000,3.47192],[1449410044000,3.48323],[1449496443000,3.63983],[1449582843000,3.59028],[1449669244000,3.6679],[1449755643000,3.65935],[1449842045000,3.76422],[1449928444000,3.52826],[1450014844000,3.61233],[1450101243000,3.65542],[1450187652000,3.81585],[1450274043000,3.72704],[1450360443000,3.72735],[1450446844000,3.74616],[1450533243000,3.75341],[1450619644000,3.70563],[1450706044000,3.50127],[1450792444000,3.43237],[1450878844000,3.55934],[1450965244000,3.63877],[1451051655000,3.6071],[1451138044000,3.39525],[1451224443000,3.43151],[1451310843000,3.47121],[1451397244000,3.47114],[1451483643000,3.45019],[1451570043000,3.45872],[1451656443000,3.49018],[1451742843000,3.49503],[1451829245000,3.47947],[1451915643000,3.47845],[1452002043000,3.46565],[1452088443000,3.46103],[1452174871000,3.57345],[1452261242000,3.56906],[1452347643000,3.55302],[1452434642000,3.51795],[1452521043000,3.55153],[1452608942000,3.53092],[1452695942000,3.45379],[1452782343000,3.46031],[1452868742000,3.16776],[1452955143000,3.02809],[1453041543000,3.05192],[1453127942000,3.04443],[1453214343000,3.04732],[1453300742000,3.1846],[1453387743000,3.28738],[1453474142000,3.12844],[1453560543000,3.08723],[1453646942000,3.15665],[1453733343000,3.17247],[1453819742000,3.15547],[1453906142000,3.25662],[1453993442000,3.15229],[1454079842000,3.10328],[1454166242000,3.09619],[1454252643000,3.0894],[1454339042000,3.08294],[1454425442000,3.07454],[1454511842000,3.05744],[1454598242000,3.15875],[1454684643000,3.14909],[1454771043000,3.08656],[1454857442000,3.10618],[1454943842000,3.08267],[1455030243000,3.07624],[1455116642000,3.1307],[1455203042000,3.09742],[1455289443000,3.10207],[1455375842000,3.12197],[1455462242000,3.20012],[1455548642000,3.20807],[1455635043000,3.20608],[1455721443000,3.25593],[1455807842000,3.24062],[1455894242000,3.26804],[1455980642000,3.44515],[1456067042000,3.42146],[1456153443000,3.45651],[1456239842000,3.40643],[1456326243000,3.37178],[1456412642000,3.37372],[1456499643000,3.40416],[1456586042000,3.41875],[1456672442000,3.46898],[1456758843000,3.46746],[1456845242000,3.43553],[1456931642000,3.40875],[1457018042000,3.33463],[1457104442000,3.32668],[1457190842000,3.1636],[1457277242000,3.23593],[1457363642000,3.25003],[1457450042000,3.23356],[1457536742000,3.27039],[1457623142000,3.27729],[1457709542000,3.3811],[1457795942000,3.29642],[1457882342000,3.30123],[1457968742000,3.29865],[1458055142000,3.28745],[1458141542000,3.30004],[1458229142000,3.30156],[1458315542000,3.18352],[1458401942000,3.16552],[1458488342000,3.19888],[1458577442000,3.20141],[1458663842000,3.23033],[1458750242000,3.23694],[1458836643000,3.23913],[1458923042000,3.23249],[1459009442000,3.215],[1459095842000,3.29687],[1459182242000,3.26524],[1459268642000,3.20878],[1459355042000,3.21682],[1459441442000,3.23896],[1459527842000,3.24017],[1459614243000,3.2582],[1459701242000,3.25613],[1459787642000,3.23242],[1459877042000,3.2456],[1459963442000,3.24922],[1460049842000,3.2464],[1460136542000,3.24414],[1460222942000,3.2165],[1460309342000,3.22777],[1460395742000,3.22749],[1460482142000,3.25909],[1460568542000,3.24567],[1460654942000,3.23967],[1460741342000,3.2664],[1460827742000,3.27493],[1460914142000,3.26051],[1461000542000,3.25252],[1461086942000,3.25394],[1461173342000,3.28558],[1461259742000,3.31582],[1461346142000,3.32727],[1461432542000,3.31943],[1461518942000,3.53685],[1461605342000,3.76721],[1461691742000,3.97851],[1461778142000,4.01373],[1461864542000,3.73086],[1461950942000,3.80193],[1462037342000,3.73858],[1462123742000,3.69523],[1462210142000,3.65799],[1462296542000,3.70769],[1462382942000,3.74961],[1462469342000,3.70955],[1462555742000,3.76672],[1462642142000,3.92506],[1462728542000,3.92567],[1462814942000,4.06293],[1462901342000,3.88218],[1462987742000,3.86979],[1463074142000,3.81578],[1463160542000,3.94639],[1463246942000,4.00001],[1463333342000,4.0683],[1463419742000,4.14313],[1463506142000,3.98715],[1463606342000,4.03062],[1463692742000,3.89453],[1463779142000,3.85718],[1463865542000,3.96338],[1463951942000,3.91553],[1464038342000,3.94872],[1464124742000,3.95062],[1464211142000,4.00554],[1464297542000,4.09264],[1464383942000,4.58693],[1464470342000,4.64757],[1464556742000,4.73138],[1464643142000,4.67623],[1464729542000,4.61317],[1464815942000,4.73519],[1464902342000,4.71687],[1464988742000,4.85624],[1465075142000,4.79956],[1465161542000,4.79822],[1465247942000,4.9445],[1465334343000,4.75393],[1465420742000,4.71373],[1465507142000,4.69839],[1465593542000,4.8378],[1465679942000,4.8778],[1465766342000,5.40419],[1465852742000,5.21401],[1465939142000,5.21567],[1466025543000,5.21657],[1466111942000,5.3975],[1466198342000,5.64596],[1466284742000,5.54793],[1466371142000,5.60345],[1466457542000,5.39024],[1466543942000,4.74522],[1466630342000,4.00135],[1466716742000,3.79965],[1466803142000,4.1945],[1466889542000,4.13054],[1466975942000,4.08817],[1467062342000,4.09958],[1467148742000,4.10135],[1467235142000,4.07156],[1467321542000,4.17301],[1467407942000,4.23549],[1467494342000,4.56926],[1467580742000,4.23422],[1467667142000,4.49328],[1467753542000,4.47176],[1467839942000,4.47863],[1467926342000,3.99995],[1468012742000,4.20169],[1468099142000,4.10127],[1468185543000,4.09999],[1468271942000,4.1005],[1468358342000,4.19953],[1468445342000,4.1643],[1468531742000,4.15296],[1468618142000,4.15524],[1468704542000,4.13585],[1468791242000,4.18915],[1468877642000,4.15769],[1468964042000,4.14649],[1469050442000,4.12341],[1469136842000,4.13101],[1469223242000,4.06304],[1469309642000,4.04927],[1469396042000,4.06681],[1469482442000,4.0451],[1469568842000,3.9808],[1469655242000,3.96938],[1469741642000,3.96864],[1469828042000,4.08624],[1469914443000,4.06588],[1470000842000,4.04894],[1470087242000,3.90294],[1470173642000,3.63578],[1470260044000,3.72489],[1470346442000,3.71733],[1470432842000,3.73293],[1470519242000,3.76223],[1470605642000,3.76438],[1470692042000,3.78636],[1470778442000,3.75114],[1470864842000,3.75409],[1470951242000,3.73627],[1471037642000,3.69478],[1471126142000,3.70815],[1471212542000,3.65259],[1471298942000,3.59366],[1471385342000,3.64015],[1471471742000,3.6047],[1471558142000,3.61021],[1471644542000,3.61039],[1471730942000,3.61091],[1471817342000,3.6043],[1471904042000,3.64776],[1471990442000,3.94173],[1472076843000,3.88304],[1472163243000,3.80504],[1472249643000,3.82959],[1472336042000,3.74317],[1472422449000,3.73751],[1472508843000,3.75509],[1472595243000,3.81158],[1472681643000,3.78704],[1472768043000,3.82477],[1472854443000,3.81126],[1472940843000,3.87397],[1473027243000,4.00659],[1473113643000,3.97535],[1473200043000,3.9742],[1473286443000,3.96789],[1473372843000,3.97887],[1473459243000,3.96882],[1473545643000,3.96995],[1473632043000,3.88512],[1473718443000,3.82959],[1473804843000,3.81718],[1473891243000,3.84216],[1473977643000,3.82203],[1474064043000,3.81012],[1474150456000,3.81013],[1474236843000,4.05827],[1474323243000,3.82609],[1474409643000,3.84736],[1474496043000,3.78],[1474582443000,3.84605],[1474668843000,3.81303],[1474755243000,3.80699],[1474841642000,3.79859],[1474928643000,3.86532],[1475015043000,3.84684],[1475101443000,3.83416],[1475187843000,3.85731],[1475274242000,3.83478],[1475360643000,3.84679],[1475447042000,3.83465],[1475533443000,3.83652],[1475619843000,3.8298],[1475706243000,3.84708],[1475792643000,3.84087],[1475879042000,3.86252],[1475965442000,3.84286],[1476051843000,3.81357],[1476138243000,3.78579],[1476224644000,3.82368],[1476311043000,3.75946],[1476397443000,3.91315],[1476483843000,3.89325],[1476570243000,3.87488],[1476656643000,3.88678],[1476743043000,3.90897],[1476829743000,3.83269],[1476916143000,3.80478],[1477002543000,3.79186],[1477088943000,3.81413],[1477175355000,3.88836],[1477261743000,3.91205],[1477348143000,3.86782],[1477434543000,3.90156],[1477521243000,3.95228],[1477607643000,4.01184],[1477694044000,3.96991],[1477780743000,4.08971],[1477867453000,4.02498],[1477953843000,4.01151],[1478040243000,4.09367],[1478126643000,4.09376],[1478213043000,3.87268],[1478299443000,3.8658],[1478385843000,3.87113],[1478475843000,3.88683],[1478562243000,3.83969],[1478648643000,3.84756],[1478735043000,3.85916],[1478821443000,3.824],[1478907843000,3.8125],[1478994243000,3.76053],[1479080643000,3.86918],[1479167043000,3.87377],[1479253458000,3.89734],[1479339843000,4.02633],[1479426243000,3.93971],[1479512643000,3.95725],[1479599043000,3.94152],[1479685443000,3.9246],[1479771843000,3.94928],[1479858243000,3.95234],[1479944643000,3.91772],[1480031043000,3.90634],[1480117443000,3.91606],[1480203843000,3.89169],[1480290243000,3.8837],[1480376643000,3.8826],[1480463043000,3.87718],[1480549443000,3.88891],[1480635843000,3.9052],[1480722243000,3.93901],[1480808943000,3.92969],[1480895343000,3.89874],[1480981743000,3.54876],[1481068143000,3.53566],[1481154543000,3.61816],[1481240943000,3.69303],[1481327343000,3.68982],[1481413743000,3.6856],[1481500143000,3.64304],[1481586543000,3.66182],[1481673243000,3.65103],[1481759643000,3.63431],[1481846043000,3.62416],[1481932443000,3.62823],[1482018843000,3.69417],[1482105259000,3.67449],[1482191643000,3.65891],[1482278043000,3.66139],[1482364443000,3.65488],[1482450843000,3.70807],[1482537243000,4.6224],[1482623643000,4.55138],[1482710043000,4.34826],[1482796443000,4.35055],[1482882843000,4.45517],[1482969243000,4.56155],[1483055643000,4.55491],[1483142043000,4.38833],[1483228443000,4.3256],[1483314843000,4.5112],[1483401243000,4.64779],[1483487643000,4.62452],[1483574043000,4.8245],[1483660443000,4.29612],[1483746843000,3.85733],[1483833243000,3.94834],[1483919643000,3.99424],[1484006043000,4.30302],[1484092743000,4.59151],[1484179143000,3.84679],[1484265843000,3.94848],[1484352243000,3.89258],[1484438643000,3.88878],[1484525043000,3.92204],[1484611443000,3.9057],[1484697843000,3.94225],[1484784243000,3.8419],[1484870643000,3.85918],[1484957043000,3.89257],[1485043443000,3.90248],[1485129843000,3.85613],[1485216243000,3.83527],[1485302643000,3.79133],[1485389081000,3.71444],[1485475443000,3.8401],[1485561843000,3.85353],[1485648244000,3.85244],[1485734644000,3.85623],[1485821056000,4.0165],[1485907443000,4.07604],[1485994144000,4.07677],[1486080540000,4.07743],[1486166941000,4.09167],[1486253340000,4.06444],[1486339741000,4.05986],[1486426140000,4.05563],[1486512541000,4.05223],[1486598940000,4.02693],[1486685341000,3.80304],[1486771741000,3.77941],[1486858141000,3.78874],[1486944540000,3.76948],[1487030940000,3.71514],[1487117940000,3.76954],[1487204340000,3.79724],[1487290740000,3.78097],[1487377140000,3.82202],[1487463540000,3.78666],[1487549940000,3.76927],[1487636340000,3.75736],[1487722740000,3.78978],[1487809140000,3.80081],[1487895540000,3.84147],[1487981941000,3.85017],[1488068340000,3.82013],[1488154741000,3.81129],[1488241140000,3.80805],[1488327840000,3.77127],[1488414240000,3.79727],[1488500641000,3.90894],[1488587040000,3.91168],[1488673441000,3.86353],[1488759840000,3.87117],[1488846240000,3.89762],[1488932640000,3.80928],[1489019040000,3.77028],[1489105440000,3.8247],[1489191840000,3.76863],[1489278242000,3.79003],[1489364640000,3.85065],[1489451041000,4.17106],[1489537441000,4.03733],[1489623840000,4.14015],[1489710240000,4.20347],[1489797250000,4.13582],[1489883641000,4.0015],[1489970040000,3.95643],[1490056740000,4.03624],[1490143140000,3.98952],[1490229541000,3.93756],[1490315940000,3.97914],[1490402340000,4.06986],[1490488740000,4.07259],[1490575141000,4.08648],[1490661541000,4.07068],[1490747940000,4.11735],[1490834341000,4.19638],[1490920741000,6.92162],[1491007142000,6.51017],[1491093541000,6.84133],[1491179940000,7.69709],[1491266340000,8.16359],[1491352741000,8.18472],[1491439140000,10.8515],[1491525541000,9.98365],[1491611940000,9.37335],[1491698340000,9.90093],[1491784740000,8.7631],[1491871141000,8.81393],[1491957541000,8.86321],[1492043941000,10.7473],[1492130341000,10.1794],[1492216745000,10.3678],[1492303141000,10.6962],[1492389541000,10.6499],[1492475941000,10.4693],[1492562341000,10.3222],[1492648740000,9.60504],[1492735142000,10.2827],[1492821540000,11.1773],[1492907941000,13.158],[1492994341000,13.8711],[1493080740000,15.0285],[1493167140000,15.0808],[1493253541000,14.9356],[1493339941000,14.6508],[1493426341000,14.4255],[1493512740000,15.8288],[1493599141000,15.694],[1493685542000,16.0219],[1493771944000,15.8339],[1493858342000,21.1407],[1493944741000,24.3395],[1494031141000,26.6596],[1494117541000,28.5678],[1494203941000,29.8113],[1494290341000,29.427],[1494376741000,31.6411],[1494463140000,32.4409],[1494549541000,31.3444],[1494635941000,27.5339],[1494722341000,29.278],[1494808741000,28.7054],[1494895141000,25.0893],[1494981541000,22.8828],[1495067941000,25.1153],[1495154342000,28.1173],[1495240741000,27.5036],[1495327141000,27.357],[1495413559000,26.2407],[1495499941000,25.401],[1495586342000,31.9526],[1495672740000,33.9334],[1495760641000,29.7765],[1495847041000,24.7209],[1495933441000,24.7921],[1496019841000,24.3116],[1496106241000,25.1462],[1496192641000,24.637],[1496279041000,25.5753],[1496365441000,28.591],[1496451841000,28.9329],[1496538241000,27.1708],[1496624641000,28.729],[1496711041000,30.5832],[1496797441000,30.3166],[1496886241000,28.1264],[1496972641000,30.3556],[1497059041000,30.0735],[1497145441000,30.3299],[1497231841000,32.8029],[1497318241000,29.7662],[1497404641000,31.5562],[1497491041000,29.6445],[1497577441000,29.8158],[1497663841000,39.3866],[1497750241000,46.4568],[1497836641000,45.274],[1497923041000,50.1332],[1498009441000,46.9948],[1498095841000,47.2399],[1498182241000,47.5841],[1498268641000,47.1086],[1498355041000,44.004],[1498441442000,44.098],[1498560271000,38.9354],[1498687741000,43.3735],[1498774141000,41.4514],[1498860541000,40.383],[1498946941000,38.5524],[1499033341000,41.6669],[1499119742000,47.9407],[1499206141000,53.6017],[1499292541000,52.5788],[1499378941000,51.5658],[1499465341000,45.9346],[1499551742000,51.2745],[1499638141000,51.0244],[1499724542000,46.6857],[1499810940000,45.5044],[1499924641000,47.1294],[1500012541000,45.604],[1500098941000,40.2898],[1500185341000,39.709],[1500271741000,41.958],[1500358141000,43.4159],[1500444541000,43.9475],[1500530941000,42.2525],[1500617341000,46.9525],[1500703741000,45.9145],[1500790141000,45.7845],[1500876543000,43.3938],[1500962943000,44.5151],[1501049344000,40.8484],[1501135743000,42.3676],[1501222145000,42.2496],[1501308545000,39.4441],[1501394944000,40.7776],[1501481345000,40.1789],[1501567744000,43.7032],[1501654144000,42.9155],[1501740545000,42.197],[1501826946000,42.9587],[1501913344000,45.666],[1501999742000,45.6491],[1502086142000,45.597],[1502172541000,46.1313],[1502258941000,49.8457],[1502345341000,47.7154],[1502431741000,47.104],[1502518141000,47.2041],[1502604541000,47.3319],[1502690942000,46.0206],[1502777341000,43.3079],[1502863741000,42.6302],[1502950143000,44.1761],[1503036542000,45.9763],[1503122943000,45.4842],[1503209344000,45.3601],[1503295742000,45.9558],[1503382143000,46.4216],[1503468543000,46.7989],[1503554943000,51.5883],[1503641345000,49.8758],[1503727744000,50.6261],[1503814144000,55.5075],[1503900544000,60.7265],[1503966844000,62.5799],[1504060445000,62.93],[1504112643000,61.96],[1504198746000,69.31],[1504285144000,79.32],[1504371544000,74.08],[1504457945000,76.94],[1504544645000,63.43],[1504631045000,68.79],[1504717143000,78.77],[1504803545000,79.18],[1504890246000,69.16],[1504976647000,66.23],[1505063046000,63.24],[1505149443000,67.23],[1505235845000,65.80],[1505322242000,62.06],[1505408643000,48.05],[1505495045000,47.12],[1505581443000,48.27],[1505667843000,49.33],[1505754245000,54.41],[1505840344000,54.21],[1505926742000,53.18],[1506013142000,48.25],[1506099842000,45.86],[1506185942000,48.88],[1506272641000,47.96],[1506359042000,51.95],[1506445142000,52.27],[1506531842000,53.69],[1506617941000,54.23],[1506704341000,53.62],[1506791041000,54.88],[1506877142000,54.13],[1506963843000,53.85],[1507049942000,51.93],[1507136642000,51.87],[1507223041000,51.44],[1507309142000,52.33],[1507395842000,51.72],[1507481942000,53.87],[1507568641000,50.82],[1507655042000,51.18],[1507741141000,50.74],[1507827841000,57.49],[1507914241000,58.72],[1508000642000,65.25],[1508087042000,63.19],[1508173441000,64.11],[1508259841000,60.02],[1508345941000,58.07],[1508432342000,59.51],[1508519041000,61.23],[1508605441000,57.26],[1508691841000,57.09],[1508778241000,54.28],[1508864642000,57.53],[1508951041000,55.06],[1509037445000,56.09],[1509123842000,55.39],[1509209941000,54.69],[1509296641000,56.97],[1509383042000,56.63],[1509469441000,56.24],[1509555541000,54.66],[1509641941000,53.12],[1509728641000,55.04],[1509815041000,55.66],[1509901441000,54.96],[1509987842000,55.58],[1510074241000,59.28],[1510160641000,62.00],[1510246742000,63.46],[1510333441000,61.53],[1510419541000,61.73],[1510505941000,59.52],[1510592341000,60.88],[1510679041000,62.93],[1510765142000,63.92],[1510851542000,64.38],[1510937942000,67.63],[1511024642000,67.47],[1511110741000,71.89],[1511197141000,72.10],[1511283542000,70.98],[1511369942000,70.99],[1511456642000,76.23],[1511542742000,75.89],[1511629442000,85.66],[1511715542000,85.43],[1511801942000,90.23],[1511888641000,93.46],[1511974741000,101],[1512061141000,80.04],[1512147841000,94.34],[1512233941000,99.47],[1512320342000,104],[1512406742000,98.39],[1512493142000,102],[1512579541000,101],[1512666242000,93.70],[1512752342000,125],[1512925441000,149],[1513011842000,186],[1513098242000,328],[1513184642000,311],[1513271042000,285],[1513357443000,314],[1513530242000,317],[1513616642000,320],[1513703041000,358],[1513789441000,315],[1513875842000,309],[1513962242000,239],[1514048644000,304],[1514135042000,269],[1514221441000,276],[1514307841000,289],[1514394241000,267],[1514480641000,245],[1514567041000,250],[1514653441000,208],[1514739841000,237],[1514826242000,227],[1514912641000,258],[1514999041000,251],[1515085441000,243],[1515171542000,252],[1515257941000,304],[1515344641000,288],[1515431097000,263],[1515517497000,272],[1515603897000,260],[1515690298000,245],[1515776698000,243],[1515863097000,263],[1515949497000,250],[1516035898000,252],[1516122298000,206],[1516208697000,169],[1516295098000,203],[1516381498000,199],[1516467898000,216],[1516554297000,189],[1516640698000,180],[1516727098000,188],[1516813498000,182],[1516899897000,180],[1516986298000,178],[1517072698000,183],[1517159098000,190],[1517245498000,186],[1517331898000,173],[1517418297000,162],[1517504699000,143],[1517591098000,133],[1517677498000,150],[1517763898000,154],[1517850297000,132],[1517936698000,128],[1518023097000,148],[1518109498000,144],[1518195898000,154],[1518282298000,151],[1518368698000,153],[1518455098000,157],[1518541498000,157],[1518627899000,207],[1518714298000,220],[1518800699000,233],[1518887098000,229],[1518973498000,227],[1519059898000,224],[1519146298000,247],[1519232697000,210],[1519319098000,196],[1519405497000,208],[1519491898000,205],[1519578298000,212],[1519664698000,222],[1519751098000,217],[1519837497000,208],[1519923899000,214],[1520010298000,207],[1520096701000,213],[1520183101000,210],[1520269500000,213],[1520355898000,202],[1520442299000,183],[1520528699000,178],[1520615098000,177],[1520701498000,189],[1520787898000,188],[1520874298000,181],[1520960699000,178],[1521047099000,164],[1521133499000,161],[1521219897000,169],[1521306298000,156],[1521355707000,150]],"price_btc": [[1367174842000,0.0316211],[1367261402000,0.0307],[1367347803000,0.0311],[1367434202000,0.03201],[1367523302000,0.03241],[1367609702000,0.0306648],[1367696102000,0.0316],[1367782802000,0.0309079],[1367869502000,0.0299209],[1367955902000,0.0301589],[1368042302000,0.0301524],[1368130201000,0.0303],[1368218702000,0.0296625],[1368307501000,0.02945],[1368393902000,0.0279639],[1368480301000,0.0276],[1368566702000,0.0265682],[1368653702000,0.02555],[1368740102000,0.02469],[1368826502000,0.025744],[1368913804000,0.0268338],[1369000201000,0.0269],[1369086602000,0.02607],[1369174202000,0.0250941],[1369261201000,0.02518],[1369347602000,0.0250757],[1369435202000,0.02386],[1369524902000,0.0239422],[1369611602000,0.02412],[1369698002000,0.02396],[1369784402000,0.0240623],[1369872302000,0.023343],[1369958702000,0.02295],[1370046304000,0.0228471],[1370133001000,0.022],[1370219702000,0.0221248],[1370306104000,0.0225397],[1370397302000,0.0246],[1370484302000,0.02342],[1370570747000,0.02346],[1370657402000,0.02365],[1370744102000,0.0235679],[1370830503000,0.0238621],[1370917502000,0.02342],[1371004202000,0.02205],[1371090602000,0.02144],[1371177003000,0.0219],[1371263702000,0.02101],[1371350102000,0.0208],[1371436802000,0.02113],[1371523203000,0.02237],[1371609902000,0.02142],[1371696302000,0.02116],[1371782702000,0.0207281],[1371869102000,0.02584],[1371955502000,0.02875],[1372041903000,0.0284391],[1372128302000,0.02751],[1372214702000,0.02719],[1372305902000,0.0278],[1372392301000,0.02933],[1372478702000,0.0294098],[1372565702000,0.0294],[1372652102000,0.03149],[1372738501000,0.03307],[1372825227000,0.0314302],[1372912502000,0.0337302],[1372998663000,0.0336359],[1373085062000,0.03577],[1373171462000,0.03597],[1373257862000,0.03396],[1373344262000,0.0343544],[1373430662000,0.034],[1373517962000,0.0323764],[1373604662000,0.03001],[1373691062000,0.0300564],[1373777461000,0.02943],[1373864462000,0.03037],[1373951162000,0.03059],[1374037562000,0.03176],[1374124862000,0.03161],[1374220862000,0.0317742],[1374308172000,0.03209],[1374394562000,0.03197],[1374480962000,0.03201],[1374567362000,0.0314394],[1374653775000,0.03112],[1374740162000,0.03111],[1374826262000,0.03007],[1374912661000,0.03065],[1374999062000,0.030258],[1375085462000,0.0298386],[1375171862000,0.02906],[1375264262000,0.02712],[1375350661000,0.0277],[1375437061000,0.02761],[1375523462000,0.02787],[1375609861000,0.0285],[1375696262000,0.02742],[1375782662000,0.0270702],[1375869063000,0.0261097],[1375955461000,0.02633],[1376041862000,0.0261],[1376128262000,0.0257],[1376214663000,0.0250822],[1376301474000,0.025402],[1376387762000,0.02503],[1376474161000,0.02436],[1376560872000,0.0247525],[1376648462000,0.02491],[1376734862000,0.02476],[1376821262000,0.0246938],[1376907662000,0.0235229],[1376994063000,0.0235358],[1377080461000,0.02264],[1377166862000,0.02151],[1377253261000,0.0232],[1377339662000,0.02307],[1377426062000,0.02209],[1377512462000,0.02122],[1377598862000,0.0202879],[1377685262000,0.02066],[1377771662000,0.0208134],[1377858062000,0.0207883],[1377944462000,0.01994],[1378030862000,0.0190613],[1378117262000,0.0186783],[1378203662000,0.01879],[1378290062000,0.0195228],[1378376762000,0.02244],[1378463162000,0.02187],[1378549562000,0.02228],[1378635961000,0.02186],[1378722362000,0.0220738],[1378808762000,0.02081],[1378895162000,0.02095],[1378981562000,0.020333],[1379067963000,0.0196993],[1379154362000,0.019833],[1379240762000,0.02055],[1379327162000,0.02004],[1379413562000,0.019977],[1379499962000,0.0194492],[1379586362000,0.0196797],[1379672761000,0.01997],[1379759161000,0.01986],[1379845562000,0.01975],[1379931962000,0.01952],[1380018362000,0.01936],[1380104762000,0.0190723],[1380191161000,0.01865],[1380277562000,0.0185],[1380363961000,0.01762],[1380450361000,0.0171],[1380536761000,0.01689],[1380623162000,0.01788],[1380709562000,0.0183717],[1380795962000,0.01725],[1380888069000,0.0176086],[1380974469000,0.0170392],[1381060863000,0.01693],[1381147268000,0.01671],[1381233963000,0.0163413],[1381321263000,0.01525],[1381407662000,0.01533],[1381494063000,0.0159433],[1381580462000,0.0158],[1381666862000,0.015817],[1381753262000,0.0145706],[1381839662000,0.01458],[1381926062000,0.01262],[1382012463000,0.01313],[1382098866000,0.0127285],[1382185265000,0.0114253],[1382274365000,0.0112348],[1382360761000,0.01025],[1382447162000,0.00875],[1382533869000,0.00957224],[1382620262000,0.01102],[1382706662000,0.01473],[1382793061000,0.01212],[1382879462000,0.012246],[1382965865000,0.0109017],[1383052262000,0.01091],[1383138662000,0.0104899],[1383225061000,0.01117],[1383311462000,0.01141],[1383398468000,0.0119012],[1383484861000,0.01453],[1383570967000,0.0141177],[1383657363000,0.0127005],[1383744062000,0.0119083],[1383830463000,0.0149796],[1383916862000,0.01405],[1384003262000,0.01192],[1384089672000,0.01223],[1384176062000,0.0116507],[1384262462000,0.01115],[1384348862000,0.01104],[1384435262000,0.01023],[1384521662000,0.0099],[1384608362000,0.00983418],[1384694762000,0.00907004],[1384781162000,0.00984],[1384867563000,0.0141827],[1384953973000,0.0143353],[1385040962000,0.01369],[1385127365000,0.0121416],[1385213763000,0.0130579],[1385300163000,0.0134542],[1385389862000,0.01345],[1385476263000,0.0173641],[1385562375000,0.0276455],[1385650275000,0.0482909],[1385747470000,0.0326015],[1385833872000,0.0343961],[1385922962000,0.0357],[1386010261000,0.03137],[1386096662000,0.03233],[1386183062000,0.03741],[1386269463000,0.0377598],[1386355862000,0.0351945],[1386442267000,0.0331826],[1386528662000,0.0339],[1386615062000,0.0352722],[1386701766000,0.0359975],[1386788162000,0.0350608],[1386874561000,0.03593],[1386960962000,0.03517],[1387047663000,0.0347858],[1387134062000,0.0357294],[1387220463000,0.0351303],[1387306862000,0.03241],[1387393262000,0.02772],[1387479971000,0.0274795],[1387566362000,0.02803],[1387654563000,0.0275975],[1387740962000,0.0270101],[1387828861000,0.02685],[1387915262000,0.0261993],[1388001662000,0.03002],[1388088362000,0.0328667],[1388174462000,0.0312],[1388260862000,0.03108],[1388347263000,0.0318059],[1388433664000,0.0326555],[1388520063000,0.0323493],[1388606463000,0.031866],[1388692866000,0.0324911],[1388779562000,0.029793],[1388865963000,0.029462],[1388952363000,0.0280271],[1389040865000,0.0312503],[1389129065000,0.0296839],[1389215464000,0.0287428],[1389301879000,0.0286375],[1389388864000,0.0288204],[1389475264000,0.0291271],[1389561663000,0.0289818],[1389705364000,0.0286458],[1389791763000,0.02933],[1389879062000,0.02931],[1389973863000,0.0290547],[1390067162000,0.02906],[1390154462000,0.02918],[1390248662000,0.02911],[1390335364000,0.0287032],[1390451777000,0.027905],[1390560363000,0.0258956],[1390646763000,0.0260374],[1390733462000,0.02685],[1390830663000,0.0269725],[1390917062000,0.0265109],[1391003462000,0.02658],[1391089862000,0.02637],[1391176263000,0.026506],[1391262663000,0.0271083],[1391349063000,0.027153],[1391435765000,0.0267053],[1391523366000,0.0259649],[1391609767000,0.0259566],[1391697074000,0.0253773],[1391783466000,0.0262296],[1391869876000,0.0265746],[1391958667000,0.026486],[1392045384000,0.0262268],[1392132088000,0.0261437],[1392218497000,0.0260364],[1392304896000,0.0253683],[1392391294000,0.0248666],[1392477986000,0.024714],[1392564379000,0.024771],[1392651395000,0.0246822],[1392737818000,0.0251852],[1392824503000,0.0251373],[1392911197000,0.0248206],[1392998196000,0.0246075],[1393084888000,0.0243629],[1393171297000,0.0253084],[1393257698000,0.0259319],[1393344696000,0.0254106],[1393433783000,0.0247519],[1393521091000,0.0244527],[1393608092000,0.0240999],[1393695091000,0.0240846],[1393781499000,0.0235381],[1393869077000,0.0201146],[1393964479000,0.0249648],[1394053879000,0.0243663],[1394140880000,0.0247977],[1394227581000,0.0252819],[1394313993000,0.0249869],[1394400371000,0.0250632],[1394486776000,0.0256306],[1394573174000,0.0254353],[1394659576000,0.0270844],[1394745975000,0.0266055],[1394834774000,0.0263971],[1394921176000,0.0266134],[1395007590000,0.0274354],[1395093980000,0.0278921],[1395180385000,0.0313528],[1395267385000,0.0288589],[1395353785000,0.0278494],[1395440781000,0.0274669],[1395527181000,0.0278477],[1395613581000,0.0272292],[1395700583000,0.0273416],[1395787288000,0.027945],[1395904883000,0.0271869],[1395991290000,0.0274896],[1396097492000,0.0274066],[1396194088000,0.0283422],[1396280485000,0.0278664],[1396368701000,0.027245],[1396455104000,0.0263967],[1396543286000,0.024883],[1396629688000,0.0247845],[1396716087000,0.024373],[1396802496000,0.0253728],[1396888894000,0.0256],[1396976485000,0.0250115],[1397063495000,0.0253513],[1397149885000,0.0245563],[1397236296000,0.0250087],[1397322696000,0.0254499],[1397409094000,0.024438],[1397496089000,0.0247418],[1397582488000,0.0254527],[1397670387000,0.0252221],[1397757390000,0.0251739],[1397843789000,0.0247387],[1397930181000,0.0252838],[1398016585000,0.0253436],[1398103287000,0.0251428],[1398189693000,0.024886],[1398278190000,0.0247486],[1398366089000,0.0252493],[1398453988000,0.0238633],[1398541286000,0.0231598],[1398629196000,0.022647],[1398717087000,0.0229691],[1398820291000,0.0233075],[1398918085000,0.0248409],[1399004485000,0.024169],[1399090883000,0.0234383],[1399177286000,0.0236039],[1399263694000,0.0236381],[1399350084000,0.0233091],[1399438584000,0.0242337],[1399524989000,0.0241457],[1399611984000,0.0239235],[1399698379000,0.0239458],[1399784782000,0.0236146],[1399871184000,0.0236899],[1399957583000,0.0236196],[1400043990000,0.0236094],[1400130994000,0.0235427],[1400217382000,0.0233474],[1400303795000,0.0230969],[1400390183000,0.0231281],[1400476583000,0.0231726],[1400562999000,0.0229056],[1400649445000,0.0217846],[1400736695000,0.0213965],[1400823091000,0.0218581],[1400955699000,0.0212464],[1401042094000,0.0200043],[1401131202000,0.0198691],[1401217590000,0.0195018],[1401303985000,0.0192757],[1401390386000,0.0191619],[1401477687000,0.0184858],[1401564109000,0.0175424],[1401650483000,0.0174965],[1401736887000,0.0176644],[1401823285000,0.0171172],[1401911785000,0.0172205],[1401998784000,0.0171419],[1402085180000,0.0171192],[1402171581000,0.0169597],[1402257984000,0.0171944],[1402344390000,0.0171738],[1402430792000,0.0171024],[1402519888000,0.0172178],[1402606291000,0.0172699],[1402692687000,0.0170914],[1402779086000,0.0173712],[1402865493000,0.016938],[1402951887000,0.0163564],[1403038288000,0.0158285],[1403124684000,0.0159622],[1403211089000,0.0166116],[1403297485000,0.016491],[1403383885000,0.0165078],[1403470282000,0.0162995],[1403560588000,0.0163904],[1403647904000,0.0164316],[1403764591000,0.0161248],[1403857885000,0.0158568],[1403982086000,0.0154118],[1404074784000,0.015021],[1404161192000,0.0138048],[1404257188000,0.0130909],[1404352593000,0.0125958],[1404460890000,0.0123787],[1404608784000,0.0115226],[1404741464000,0.0120919],[1404869041000,0.012521],[1404957841000,0.012399],[1405044241000,0.0126873],[1405130641000,0.0123995],[1405217041000,0.0136858],[1405303741000,0.0140279],[1405390141000,0.0138813],[1405476541000,0.0137449],[1405562941000,0.0134874],[1405649341000,0.0138516],[1405735741000,0.0138152],[1405822141000,0.0137661],[1405908541000,0.0135466],[1405995241000,0.0139053],[1406081641000,0.0138209],[1406168041000,0.013612],[1406254441000,0.0130023],[1406340841000,0.0126726],[1406427241000,0.0127593],[1406513641000,0.0131447],[1406603641000,0.01296],[1406696041000,0.0130306],[1406782441000,0.0128392],[1406870348000,0.0128444],[1406957641000,0.0129734],[1407044941000,0.0129734],[1407131341000,0.0127968],[1407217742000,0.0123977],[1407304141000,0.012382],[1407390541000,0.012153],[1407476941000,0.0121262],[1407563341000,0.0118472],[1407649741000,0.011846],[1407736141000,0.0116642],[1407822542000,0.0098129],[1407908941000,0.00931579],[1407995341000,0.00920632],[1408081741000,0.00985524],[1408168141000,0.0100769],[1408254541000,0.00966333],[1408340941000,0.00844966],[1408427341000,0.00862299],[1408513741000,0.0094622],[1408600141000,0.0111417],[1408686541000,0.0100531],[1408772941000,0.0100139],[1408859341000,0.0107841],[1408945741000,0.0106483],[1409032141000,0.0109039],[1409118541000,0.0111737],[1409204941000,0.0104245],[1409291341000,0.0102817],[1409377742000,0.010361],[1409464141000,0.0103238],[1409550541000,0.0102181],[1409636941000,0.00989523],[1409723641000,0.00998705],[1409810041000,0.0102649],[1409896442000,0.0105054],[1409982841000,0.0102749],[1410069241000,0.0104446],[1410156841000,0.0106091],[1410243241000,0.0106644],[1410329641000,0.0109229],[1410416041000,0.011442],[1410502441000,0.0112549],[1410588841000,0.0113953],[1410675242000,0.0113792],[1410761641000,0.0112961],[1410848041000,0.0108271],[1410934442000,0.0108897],[1411020841000,0.0110545],[1411107241000,0.011061],[1411193641000,0.0109374],[1411280041000,0.0105012],[1411366441000,0.0108276],[1411452841000,0.0105512],[1411539240000,0.0109897],[1411626240000,0.0108325],[1411712641000,0.0109847],[1411799040000,0.0109956],[1411885440000,0.0111206],[1411971842000,0.0111887],[1412058240000,0.0113136],[1412167440000,0.0115445],[1412273640000,0.0114139],[1412360042000,0.0115379],[1412448541000,0.0117988],[1412534942000,0.0118676],[1412621341000,0.0113456],[1412707741000,0.0114916],[1412794141000,0.0112193],[1412880541000,0.0105927],[1412966941000,0.0106476],[1413053341000,0.0103364],[1413139741000,0.0103193],[1413226141000,0.0101049],[1413312541000,0.0101301],[1413398941000,0.0102294],[1413485641000,0.0105467],[1413572041000,0.0104363],[1413658442000,0.0103648],[1413744841000,0.0102125],[1413831242000,0.0102496],[1413917642000,0.0101365],[1414004041000,0.0100238],[1414090443000,0.0102969],[1414176842000,0.010435],[1414263243000,0.0105148],[1414349643000,0.0104915],[1414436042000,0.0107219],[1414522441000,0.0107646],[1414608841000,0.0109757],[1414695241000,0.0110153],[1414781642000,0.0110471],[1414870141000,0.0109742],[1414960141000,0.0109904],[1415046542000,0.0109513],[1415132942000,0.0108914],[1415219343000,0.0106687],[1415305741000,0.0104942],[1415392141000,0.0104205],[1415478542000,0.0102926],[1415564941000,0.0100855],[1415651341000,0.00997135],[1415737742000,0.0100345],[1415824141000,0.00961881],[1415910542000,0.0100435],[1415996942000,0.0101436],[1416083342000,0.0101943],[1416169741000,0.010005],[1416256142000,0.0100789],[1416342541000,0.00997317],[1416428941000,0.0100012],[1416515342000,0.0100477],[1416601742000,0.00994783],[1416688142000,0.00985998],[1416774543000,0.0098083],[1416860942000,0.00956573],[1416948241000,0.00943683],[1417034642000,0.00964057],[1417121041000,0.00963651],[1417207442000,0.00941957],[1417293842000,0.00959312],[1417380241000,0.00946322],[1417466641000,0.00945133],[1417553043000,0.0094947],[1417639443000,0.00958488],[1417725841000,0.00964533],[1417812242000,0.00961827],[1417898647000,0.00961567],[1417985041000,0.00989155],[1418071442000,0.0100405],[1418157841000,0.00997256],[1418244241000,0.010098],[1418448542000,0.00993939],[1418554442000,0.0100172],[1418640842000,0.00997194],[1418727541000,0.00926737],[1418813941000,0.00915426],[1418900341000,0.00896828],[1418986741000,0.00903667],[1419073142000,0.00899606],[1419159541000,0.00889015],[1419245941000,0.00871183],[1419332341000,0.00869533],[1419418742000,0.00864964],[1419505143000,0.00840805],[1419591541000,0.00853561],[1419677941000,0.0085859],[1419764341000,0.0086902],[1419850741000,0.00862068],[1419937141000,0.00862484],[1420023542000,0.00864631],[1420109941000,0.00855208],[1420196342000,0.00850631],[1420282741000,0.0077497],[1420369141000,0.00745591],[1420455541000,0.00765187],[1420541941000,0.00760913],[1420628341000,0.00738152],[1420714741000,0.00713381],[1420816142000,0.00697635],[1420919343000,0.00599554],[1421005741000,0.00642858],[1421092143000,0.00641338],[1421178543000,0.00670255],[1421264941000,0.00658099],[1421351342000,0.00600335],[1421437741000,0.00663157],[1421524156000,0.00647567],[1421610542000,0.00629286],[1421696941000,0.00628251],[1421783342000,0.00621073],[1421869741000,0.00622444],[1421956141000,0.00607253],[1422042541000,0.00609336],[1422128941000,0.00738008],[1422215343000,0.00877531],[1422301741000,0.00769331],[1422388141000,0.00791365],[1422474541000,0.00806212],[1422560941000,0.00820285],[1422647341000,0.00834676],[1422734041000,0.0083921],[1422820443000,0.00801144],[1422906843000,0.00789878],[1422993243000,0.00804593],[1423079644000,0.00792406],[1423166043000,0.00801065],[1423252743000,0.00802431],[1423339143000,0.00770986],[1423425543000,0.0079504],[1423511943000,0.00788681],[1423598343000,0.00808174],[1423684743000,0.00787866],[1423771143000,0.00794984],[1423857543000,0.00775673],[1423943943000,0.00753532],[1424030343000,0.00775005],[1424116743000,0.00761315],[1424203143000,0.00766407],[1424289543000,0.00778492],[1424375943000,0.00764114],[1424462344000,0.00758711],[1424549343000,0.00755643],[1424635743000,0.00764134],[1424722143000,0.00761733],[1424808543000,0.00765514],[1424894943000,0.00758283],[1424981343000,0.00761352],[1425067743000,0.00724998],[1425159543000,0.00722191],[1425245943000,0.00735048],[1425332343000,0.00708674],[1425437343000,0.00691869],[1425523743000,0.00702632],[1425610143000,0.00697076],[1425696543000,0.00695694],[1425782943000,0.00690634],[1425869344000,0.00690254],[1425955743000,0.00698791],[1426042443000,0.0068768],[1426128843000,0.00682036],[1426215243000,0.00693924],[1426301643000,0.00706769],[1426388043000,0.00706324],[1426475044000,0.00702458],[1426561444000,0.00699336],[1426647843000,0.00692438],[1426734243000,0.00674181],[1426820643000,0.00674431],[1426907043000,0.00671117],[1426993443000,0.00672651],[1427079843000,0.00668137],[1427166243000,0.00666],[1427252643000,0.0067279],[1427339043000,0.00681905],[1427425443000,0.00684366],[1427511843000,0.00679702],[1427598243000,0.00672997],[1427688843000,0.00678787],[1427775243000,0.00674874],[1427861943000,0.00674638],[1427958243000,0.0067819],[1428044643000,0.00663664],[1428131644000,0.00667663],[1428218043000,0.00664999],[1428304444000,0.00655196],[1428390843000,0.00659967],[1428477244000,0.00660945],[1428565143000,0.00666434],[1428651543000,0.00657014],[1428737943000,0.00640879],[1428824343000,0.00628188],[1428910743000,0.00626193],[1428997143000,0.00610157],[1429085643000,0.00635235],[1429172643000,0.00616284],[1429259043000,0.00632677],[1429345443000,0.00628189],[1429431843000,0.00627268],[1429518243000,0.00627606],[1429604943000,0.00624404],[1429691343000,0.00618158],[1429778043000,0.00618869],[1429864443000,0.0061948],[1429957743000,0.00617871],[1430061843000,0.0060763],[1430148243000,0.00606116],[1430234643000,0.00604043],[1430321044000,0.00607074],[1430407443000,0.0060941],[1430493843000,0.00605919],[1430580243000,0.00603529],[1430666643000,0.0059413],[1430753056000,0.00595338],[1430839454000,0.00595593],[1430932143000,0.00598382],[1431018543000,0.00604396],[1431104943000,0.00605824],[1431191343000,0.00602223],[1431277743000,0.00596464],[1431364143000,0.0059535],[1431450543000,0.00597792],[1431536943000,0.00603482],[1431623343000,0.00611325],[1431709750000,0.00611978],[1431796149000,0.00610962],[1431882543000,0.00613632],[1431968943000,0.00617751],[1432055343000,0.00623122],[1432142043000,0.00622409],[1432228443000,0.00628277],[1432314843000,0.00774814],[1432401243000,0.0075818],[1432487643000,0.00754004],[1432574043000,0.00758144],[1432661043000,0.00763316],[1432747443000,0.00775682],[1432834743000,0.00778239],[1432928643000,0.00773432],[1433015043000,0.00781413],[1433101443000,0.0070697],[1433188143000,0.00720064],[1433278143000,0.00737253],[1433364543000,0.00746732],[1433450944000,0.00741257],[1433537343000,0.00767492],[1433626143000,0.00783814],[1433712543000,0.00774495],[1433798944000,0.00783723],[1433885343000,0.00784084],[1433971743000,0.00767263],[1434058143000,0.00777334],[1434144543000,0.00781783],[1434236043000,0.00799232],[1434322443000,0.00855608],[1434408843000,0.00848111],[1434495243000,0.0110748],[1434581643000,0.0116897],[1434668043000,0.0125114],[1434754443000,0.0114788],[1434840843000,0.012255],[1434927243000,0.0123308],[1435013643000,0.012277],[1435100043000,0.0122181],[1435186443000,0.01165],[1435272843000,0.0117596],[1435359244000,0.0117357],[1435445643000,0.0123821],[1435532043000,0.0131156],[1435618449000,0.014781],[1435704870000,0.0154068],[1435791243000,0.0152174],[1435877643000,0.015918],[1435964044000,0.016119],[1436050443000,0.0157313],[1436136843000,0.0177371],[1436223243000,0.0202911],[1436309646000,0.0202726],[1436396043000,0.0227533],[1436482443000,0.0286657],[1436568843000,0.0162441],[1436655243000,0.0149355],[1436741647000,0.0169803],[1436828043000,0.0161804],[1436914443000,0.0160673],[1437000845000,0.0146964],[1437087247000,0.0129379],[1437173644000,0.0137815],[1437260344000,0.0145761],[1437346743000,0.0135874],[1437433444000,0.0138984],[1437519844000,0.0137076],[1437606244000,0.0137989],[1437692044000,0.0136959],[1437778443000,0.0157692],[1437864844000,0.0160875],[1437951243000,0.0158342],[1438037644000,0.0157933],[1438124044000,0.0172356],[1438210443000,0.0165668],[1438296844000,0.015942],[1438383244000,0.0161289],[1438469943000,0.0148308],[1438556343000,0.014835],[1438642744000,0.0149863],[1438729444000,0.0153102],[1438815844000,0.0153967],[1438902252000,0.0145738],[1438988644000,0.0148928],[1439075044000,0.0149268],[1439161445000,0.0147032],[1439247844000,0.0149109],[1439334544000,0.0152362],[1439420943000,0.0150252],[1439507343000,0.0146942],[1439593743000,0.0151194],[1439680143000,0.0149985],[1439766543000,0.0153524],[1439852943000,0.0154712],[1439939343000,0.0154003],[1440026643000,0.0152157],[1440113043000,0.0153223],[1440199443000,0.0153206],[1440286143000,0.0152304],[1440372543000,0.0148739],[1440459243000,0.014019],[1440545643000,0.0132468],[1440632043000,0.0131002],[1440718443000,0.0127208],[1440804843000,0.0125271],[1440891843000,0.0125679],[1440978243000,0.0124174],[1441064643000,0.0123693],[1441151043000,0.0123639],[1441237443000,0.0122089],[1441323843000,0.01155],[1441410243000,0.0117227],[1441496643000,0.0124257],[1441583043000,0.012727],[1441669443000,0.0127322],[1441756443000,0.0125165],[1441842843000,0.0122817],[1441929243000,0.0123456],[1442015643000,0.0123135],[1442102643000,0.0120087],[1442189043000,0.0122116],[1442275443000,0.0123315],[1442361843000,0.0122878],[1442448243000,0.0122494],[1442534643000,0.0126653],[1442622243000,0.0126934],[1442709543000,0.0123166],[1442797443000,0.0123489],[1442894043000,0.0123559],[1442980443000,0.0123873],[1443066843000,0.0124922],[1443153843000,0.012466],[1443240243000,0.0123052],[1443327543000,0.0123303],[1443413943000,0.0125166],[1443500643000,0.0132776],[1443587043000,0.0126358],[1443673443000,0.0126968],[1443759843000,0.0126076],[1443846243000,0.0126453],[1443933543000,0.0127992],[1444019943000,0.0126944],[1444106343000,0.0125566],[1444192743000,0.0126924],[1444279147000,0.0125711],[1444365543000,0.0127567],[1444451944000,0.0127912],[1444539243000,0.0127176],[1444625643000,0.0128129],[1444712043000,0.0127631],[1444798443000,0.0127416],[1444884843000,0.0122889],[1444971244000,0.012197],[1445057644000,0.0115994],[1445144643000,0.0114248],[1445231043000,0.0114593],[1445317743000,0.0116358],[1445404143000,0.0115115],[1445490544000,0.0115346],[1445576943000,0.0113394],[1445663343000,0.0111245],[1445751243000,0.0108081],[1445837643000,0.010915],[1445924043000,0.0107841],[1446010443000,0.0103399],[1446096843000,0.0100249],[1446183243000,0.0123312],[1446269643000,0.0121458],[1446361743000,0.0121088],[1446448143000,0.0120302],[1446534543000,0.0113488],[1446620943000,0.0108288],[1446707943000,0.0101578],[1446794343000,0.00988134],[1446880743000,0.00949325],[1446969243000,0.00933095],[1447055643000,0.00888009],[1447142045000,0.0090207],[1447228443000,0.00948042],[1447314843000,0.00965352],[1447401243000,0.00951065],[1447487643000,0.00962413],[1447575843000,0.00957546],[1447662243000,0.0096084],[1447748643000,0.00950445],[1447835043000,0.00956215],[1447921466000,0.00955176],[1448007856000,0.0098022],[1448094243000,0.00964749],[1448183943000,0.00964747],[1448270343000,0.00969456],[1448356743000,0.00969841],[1448443144000,0.00971684],[1448529551000,0.0106019],[1448615943000,0.00998977],[1448718543000,0.00981691],[1448804943000,0.00993235],[1448891344000,0.0096114],[1448977744000,0.00953753],[1449064145000,0.00938419],[1449150549000,0.00933675],[1449236943000,0.00930809],[1449323343000,0.00921179],[1449410044000,0.00895274],[1449496443000,0.00918448],[1449582843000,0.00909446],[1449669244000,0.00873609],[1449755643000,0.00875475],[1449842045000,0.00866624],[1449928444000,0.00833208],[1450014844000,0.00830412],[1450101243000,0.00822327],[1450187652000,0.00832287],[1450274043000,0.00816437],[1450360443000,0.00816238],[1450446844000,0.00814182],[1450533243000,0.0080982],[1450619644000,0.00809237],[1450706044000,0.00793759],[1450792444000,0.00782151],[1450878844000,0.00806389],[1450965244000,0.00800435],[1451051655000,0.00796536],[1451138044000,0.00808993],[1451224443000,0.00820715],[1451310843000,0.00817418],[1451397244000,0.00818907],[1451483643000,0.00816947],[1451570043000,0.00814594],[1451656443000,0.0080794],[1451742843000,0.00808858],[1451829245000,0.00814216],[1451915643000,0.00806451],[1452002043000,0.00803753],[1452088443000,0.00803638],[1452174871000,0.00787976],[1452261242000,0.00783204],[1452347643000,0.00791078],[1452434642000,0.00794312],[1452521043000,0.00795568],[1452608942000,0.00791745],[1452695942000,0.00804287],[1452782343000,0.00801446],[1452868742000,0.00816106],[1452955143000,0.00818909],[1453041543000,0.00790934],[1453127942000,0.00786598],[1453214343000,0.00787864],[1453300742000,0.00790585],[1453387743000,0.00788807],[1453474142000,0.00791288],[1453560543000,0.0080328],[1453646942000,0.00791241],[1453733343000,0.00793978],[1453819742000,0.00798282],[1453906142000,0.00825044],[1453993442000,0.00821035],[1454079842000,0.00818116],[1454166242000,0.00817929],[1454252643000,0.00817425],[1454339042000,0.00820686],[1454425442000,0.00820661],[1454511842000,0.00822553],[1454598242000,0.0082181],[1454684643000,0.00809886],[1454771043000,0.0082122],[1454857442000,0.00819307],[1454943842000,0.00816591],[1455030243000,0.00816667],[1455116642000,0.00812363],[1455203042000,0.00814017],[1455289443000,0.00808272],[1455375842000,0.00801951],[1455462242000,0.00798201],[1455548642000,0.00791574],[1455635043000,0.00787197],[1455721443000,0.00776223],[1455807842000,0.00768548],[1455894242000,0.00774495],[1455980642000,0.00799017],[1456067042000,0.00793505],[1456153443000,0.00790025],[1456239842000,0.00801988],[1456326243000,0.00795984],[1456412642000,0.00794145],[1456499643000,0.00797492],[1456586042000,0.0079078],[1456672442000,0.00796314],[1456758843000,0.00789632],[1456845242000,0.00789183],[1456931642000,0.00791345],[1457018042000,0.00786923],[1457104442000,0.00788913],[1457190842000,0.00793762],[1457277242000,0.00792225],[1457363642000,0.00789075],[1457450042000,0.00784185],[1457536742000,0.00788673],[1457623142000,0.0078737],[1457709542000,0.00802725],[1457795942000,0.00796807],[1457882342000,0.0079807],[1457968742000,0.0079378],[1458055142000,0.00791762],[1458141542000,0.00791701],[1458229142000,0.00785173],[1458315542000,0.00775875],[1458401942000,0.00773922],[1458488342000,0.00774477],[1458577442000,0.0077578],[1458663842000,0.00774202],[1458750242000,0.00774663],[1458836643000,0.00775638],[1458923042000,0.00773252],[1459009442000,0.00771901],[1459095842000,0.00773075],[1459182242000,0.00771011],[1459268642000,0.00774189],[1459355042000,0.00776143],[1459441442000,0.00777041],[1459527842000,0.00775446],[1459614243000,0.00773884],[1459701242000,0.0077344],[1459787642000,0.00768743],[1459877042000,0.00767217],[1459963442000,0.0076822],[1460049842000,0.00766313],[1460136542000,0.00764244],[1460222942000,0.00766954],[1460309342000,0.0076471],[1460395742000,0.00765463],[1460482142000,0.00765213],[1460568542000,0.00764246],[1460654942000,0.00764262],[1460741342000,0.00761925],[1460827742000,0.00760632],[1460914142000,0.00762686],[1461000542000,0.00761002],[1461086942000,0.00759233],[1461173342000,0.00743866],[1461259742000,0.00746666],[1461346142000,0.00745206],[1461432542000,0.00742373],[1461518942000,0.00784956],[1461605342000,0.00818697],[1461691742000,0.00854527],[1461778142000,0.00882127],[1461864542000,0.00835481],[1461950942000,0.00841731],[1462037342000,0.0082719],[1462123742000,0.00817402],[1462210142000,0.0082654],[1462296542000,0.00827536],[1462382942000,0.00838363],[1462469342000,0.0082886],[1462555742000,0.00830149],[1462642142000,0.00856643],[1462728542000,0.00857063],[1462814942000,0.00879299],[1462901342000,0.00857211],[1462987742000,0.00853403],[1463074142000,0.00846037],[1463160542000,0.00863769],[1463246942000,0.00878383],[1463333342000,0.00890409],[1463419742000,0.00906581],[1463506142000,0.00876708],[1463606342000,0.00884359],[1463692742000,0.00875606],[1463779142000,0.00873006],[1463865542000,0.00894206],[1463951942000,0.00890365],[1464038342000,0.00890533],[1464124742000,0.00885526],[1464211142000,0.00892142],[1464297542000,0.00904514],[1464383942000,0.00971025],[1464470342000,0.00898794],[1464556742000,0.00874504],[1464643142000,0.00872854],[1464729542000,0.00884255],[1464815942000,0.00884276],[1464902342000,0.00880165],[1464988742000,0.00845095],[1465075142000,0.00838766],[1465161542000,0.00836],[1465247942000,0.00848376],[1465334343000,0.0082556],[1465420742000,0.00813213],[1465507142000,0.00818556],[1465593542000,0.00837074],[1465679942000,0.00840127],[1465766342000,0.00801939],[1465852742000,0.00755351],[1465939142000,0.00754151],[1466025543000,0.00751562],[1466111942000,0.00703569],[1466198342000,0.00744838],[1466284742000,0.00738552],[1466371142000,0.0073522],[1466457542000,0.00725714],[1466543942000,0.00723077],[1466630342000,0.00645017],[1466716742000,0.00620332],[1466803142000,0.00640974],[1466889542000,0.00623331],[1466975942000,0.00645056],[1467062342000,0.00635782],[1467148742000,0.00633223],[1467235142000,0.00635515],[1467321542000,0.00624531],[1467407942000,0.00626053],[1467494342000,0.00656569],[1467580742000,0.00642415],[1467667142000,0.00662969],[1467753542000,0.00664458],[1467839942000,0.0066081],[1467926342000,0.0064722],[1468012742000,0.00636748],[1468099142000,0.00633629],[1468185543000,0.00630712],[1468271942000,0.00631189],[1468358342000,0.0062774],[1468445342000,0.00629506],[1468531742000,0.00629647],[1468618142000,0.00623796],[1468704542000,0.00625186],[1468791242000,0.0061615],[1468877642000,0.00618455],[1468964042000,0.00619593],[1469050442000,0.00620178],[1469136842000,0.00621165],[1469223242000,0.00620194],[1469309642000,0.00618576],[1469396042000,0.00615188],[1469482442000,0.00616601],[1469568842000,0.00607828],[1469655242000,0.00605333],[1469741642000,0.0060551],[1469828042000,0.0062127],[1469914443000,0.00620673],[1470000842000,0.00639786],[1470087242000,0.00633011],[1470173642000,0.00634411],[1470260044000,0.00656965],[1470346442000,0.00651364],[1470432842000,0.00648638],[1470519242000,0.00642328],[1470605642000,0.00637785],[1470692042000,0.0063942],[1470778442000,0.00637998],[1470864842000,0.0062988],[1470951242000,0.00631531],[1471037642000,0.00629907],[1471126142000,0.0063283],[1471212542000,0.00640978],[1471298942000,0.00633017],[1471385342000,0.00628215],[1471471742000,0.00628457],[1471558142000,0.00628042],[1471644542000,0.00626591],[1471730942000,0.0062086],[1471817342000,0.0062113],[1471904042000,0.00620784],[1471990442000,0.00675836],[1472076843000,0.00669083],[1472163243000,0.00659498],[1472249643000,0.0066123],[1472336042000,0.00655328],[1472422449000,0.00651888],[1472508843000,0.00654373],[1472595243000,0.00659454],[1472681643000,0.00658964],[1472768043000,0.00668813],[1472854443000,0.00663595],[1472940843000,0.006462],[1473027243000,0.00660468],[1473113643000,0.00655185],[1473200043000,0.00651604],[1473286443000,0.00646682],[1473372843000,0.00636625],[1473459243000,0.00636681],[1473545643000,0.00635224],[1473632043000,0.0064158],[1473718443000,0.00630056],[1473804843000,0.00624947],[1473891243000,0.00628761],[1473977643000,0.006286],[1474064043000,0.0062769],[1474150456000,0.00628799],[1474236843000,0.00665583],[1474323243000,0.00628515],[1474409643000,0.00631948],[1474496043000,0.00633103],[1474582443000,0.00643859],[1474668843000,0.00632221],[1474755243000,0.0063161],[1474841642000,0.00632326],[1474928643000,0.00635786],[1475015043000,0.00635634],[1475101443000,0.00633554],[1475187843000,0.00635898],[1475274242000,0.00631908],[1475360643000,0.00626619],[1475447042000,0.00627714],[1475533443000,0.00627045],[1475619843000,0.00628008],[1475706243000,0.00627668],[1475792643000,0.00626212],[1475879042000,0.00625677],[1475965442000,0.00621138],[1476051843000,0.00618251],[1476138243000,0.00612081],[1476224644000,0.00597927],[1476311043000,0.00590424],[1476397443000,0.00614423],[1476483843000,0.0060817],[1476570243000,0.00607329],[1476656643000,0.00605294],[1476743043000,0.0061176],[1476829743000,0.00603482],[1476916143000,0.00603889],[1477002543000,0.00601042],[1477088943000,0.00602903],[1477175355000,0.00591623],[1477261743000,0.00594875],[1477348143000,0.00591164],[1477434543000,0.00591597],[1477521243000,0.00585312],[1477607643000,0.00585718],[1477694044000,0.00576398],[1477780743000,0.0057075],[1477867453000,0.00573547],[1477953843000,0.00569691],[1478040243000,0.00562809],[1478126643000,0.00559267],[1478213043000,0.00563358],[1478299443000,0.0055547],[1478385843000,0.00550369],[1478475843000,0.00546472],[1478562243000,0.00545044],[1478648643000,0.00541576],[1478735043000,0.00533428],[1478821443000,0.00534483],[1478907843000,0.00532623],[1478994243000,0.00533308],[1479080643000,0.00550912],[1479167043000,0.00549703],[1479253458000,0.00547819],[1479339843000,0.0054098],[1479426243000,0.00531013],[1479512643000,0.00527037],[1479599043000,0.00524426],[1479685443000,0.00536811],[1479771843000,0.00534153],[1479858243000,0.0052589],[1479944643000,0.00526509],[1480031043000,0.00527621],[1480117443000,0.00528144],[1480203843000,0.00529114],[1480290243000,0.00531067],[1480376643000,0.00527765],[1480463043000,0.0052698],[1480549443000,0.00521489],[1480635843000,0.00516258],[1480722243000,0.0050693],[1480808943000,0.00509707],[1480895343000,0.00504029],[1480981743000,0.00467646],[1481068143000,0.00462709],[1481154543000,0.00471042],[1481240943000,0.00478639],[1481327343000,0.00477731],[1481413743000,0.0047584],[1481500143000,0.00473651],[1481586543000,0.00469221],[1481673243000,0.00467243],[1481759643000,0.00465316],[1481846043000,0.00465664],[1481932443000,0.00462242],[1482018843000,0.00467219],[1482105259000,0.00465022],[1482191643000,0.00461462],[1482278043000,0.00457174],[1482364443000,0.00440073],[1482450843000,0.00428835],[1482537243000,0.00502187],[1482623643000,0.00506713],[1482710043000,0.00484866],[1482796443000,0.00479637],[1482882843000,0.00477884],[1482969243000,0.00467491],[1483055643000,0.00467584],[1483142043000,0.00456441],[1483228443000,0.0044907],[1483314843000,0.00451899],[1483401243000,0.00455077],[1483487643000,0.00443072],[1483574043000,0.00417262],[1483660443000,0.00422909],[1483746843000,0.00428435],[1483833243000,0.00437499],[1483919643000,0.00439548],[1484006043000,0.00475766],[1484092743000,0.00505902],[1484179143000,0.00493884],[1484265843000,0.00490596],[1484352243000,0.0047241],[1484438643000,0.00475162],[1484525043000,0.00477251],[1484611443000,0.00469699],[1484697843000,0.00434198],[1484784243000,0.00433321],[1484870643000,0.0042924],[1484957043000,0.00434911],[1485043443000,0.00423359],[1485129843000,0.00417027],[1485216243000,0.00416419],[1485302643000,0.0042471],[1485389081000,0.00412009],[1485475443000,0.004185],[1485561843000,0.00418976],[1485648244000,0.00418021],[1485734644000,0.00419385],[1485821056000,0.00436395],[1485907443000,0.00420036],[1485994144000,0.00411794],[1486080540000,0.00403123],[1486166941000,0.00396737],[1486253340000,0.00389493],[1486339741000,0.00394774],[1486426140000,0.00389912],[1486512541000,0.00381451],[1486598940000,0.00378222],[1486685341000,0.00381972],[1486771741000,0.00382184],[1486858141000,0.00377545],[1486944540000,0.00377368],[1487030940000,0.0037461],[1487117940000,0.00374327],[1487204340000,0.0037662],[1487290740000,0.00368404],[1487377140000,0.0036412],[1487463540000,0.00359113],[1487549940000,0.00359314],[1487636340000,0.0034885],[1487722740000,0.00340074],[1487809140000,0.0033998],[1487895540000,0.00327376],[1487981941000,0.00329488],[1488068340000,0.00333796],[1488154741000,0.00327605],[1488241140000,0.00321816],[1488327840000,0.00319553],[1488414240000,0.00309903],[1488500641000,0.00312415],[1488587040000,0.0030631],[1488673441000,0.00308838],[1488759840000,0.00305367],[1488846240000,0.00306137],[1488932640000,0.0031081],[1489019040000,0.00326765],[1489105440000,0.00320541],[1489191840000,0.00333492],[1489278242000,0.00321975],[1489364640000,0.00315217],[1489451041000,0.0033875],[1489537441000,0.00325452],[1489623840000,0.00330211],[1489710240000,0.00359462],[1489797250000,0.0037389],[1489883641000,0.00403312],[1489970040000,0.00379846],[1490056740000,0.00380357],[1490143140000,0.0035749],[1490229541000,0.0037392],[1490315940000,0.00382436],[1490402340000,0.00430592],[1490488740000,0.00420344],[1490575141000,0.00420108],[1490661541000,0.00391044],[1490747940000,0.00397309],[1490834341000,0.00400059],[1490920741000,0.00670726],[1491007142000,0.00606754],[1491093541000,0.00633187],[1491179940000,0.00690012],[1491266340000,0.00710588],[1491352741000,0.00722164],[1491439140000,0.00956859],[1491525541000,0.00849824],[1491611940000,0.00805519],[1491698340000,0.00840393],[1491784740000,0.00738095],[1491871141000,0.00741084],[1491957541000,0.00735652],[1492043941000,0.00894176],[1492130341000,0.0087082],[1492216745000,0.00889867],[1492303141000,0.00910304],[1492389541000,0.00900109],[1492475941000,0.00874992],[1492562341000,0.00851452],[1492648740000,0.00792763],[1492735142000,0.00833411],[1492821540000,0.00914432],[1492907941000,0.0106878],[1492994341000,0.011436],[1493080740000,0.0120115],[1493167140000,0.0118984],[1493253541000,0.0116528],[1493339941000,0.011147],[1493426341000,0.0109283],[1493512740000,0.0119711],[1493599141000,0.0116009],[1493685542000,0.011309],[1493771944000,0.0108555],[1493858342000,0.0141588],[1493944741000,0.0156934],[1494031141000,0.0170561],[1494117541000,0.0180564],[1494203941000,0.0186182],[1494290341000,0.0171444],[1494376741000,0.0180065],[1494463140000,0.0185805],[1494549541000,0.0171212],[1494635941000,0.0162134],[1494722341000,0.0163824],[1494808741000,0.0160289],[1494895141000,0.0146179],[1494981541000,0.013194],[1495067941000,0.0138383],[1495154342000,0.0147518],[1495240741000,0.0139516],[1495327141000,0.0133691],[1495413559000,0.0128762],[1495499941000,0.0119674],[1495586342000,0.0140053],[1495672740000,0.0137933],[1495760641000,0.0125751],[1495847041000,0.0109763],[1495933441000,0.0118395],[1496019841000,0.0111331],[1496106241000,0.0111911],[1496192641000,0.0110674],[1496279041000,0.011104],[1496365441000,0.0119815],[1496451841000,0.0116856],[1496538241000,0.0108191],[1496624641000,0.0113108],[1496711041000,0.0111539],[1496797441000,0.0106429],[1496886241000,0.0105143],[1496972641000,0.0107864],[1497059041000,0.0106059],[1497145441000,0.010504],[1497231841000,0.0110079],[1497318241000,0.011175],[1497404641000,0.0114829],[1497491041000,0.0119218],[1497577441000,0.0126155],[1497663841000,0.0157672],[1497750241000,0.0185976],[1497836641000,0.0181241],[1497923041000,0.0200693],[1498009441000,0.0188129],[1498095841000,0.0189111],[1498182241000,0.0190488],[1498268641000,0.0174117],[1498355041000,0.0174367],[1498441442000,0.017365],[1498560271000,0.0162315],[1498687741000,0.0168553],[1498774141000,0.0162717],[1498860541000,0.0163127],[1498946941000,0.0160414],[1499033341000,0.0166766],[1499119742000,0.0186859],[1499206141000,0.0208726],[1499292541000,0.0201987],[1499378941000,0.0199072],[1499465341000,0.018405],[1499551742000,0.0202137],[1499638141000,0.0201863],[1499724542000,0.0199195],[1499810940000,0.0195283],[1499924641000,0.0198224],[1500012541000,0.0196111],[1500098941000,0.0192196],[1500185341000,0.0198399],[1500271741000,0.0209942],[1500358141000,0.0193939],[1500444541000,0.0187703],[1500530941000,0.0180253],[1500617341000,0.0167902],[1500703741000,0.0167297],[1500790141000,0.0164252],[1500876543000,0.015977],[1500962943000,0.0160934],[1501049344000,0.0166207],[1501135743000,0.016504],[1501222145000,0.0157054],[1501308545000,0.0144655],[1501394944000,0.0153907],[1501481345000,0.0147571],[1501567744000,0.0151098],[1501654144000,0.0156617],[1501740545000,0.0155405],[1501826946000,0.0154001],[1501913344000,0.014645],[1501999742000,0.0142138],[1502086142000,0.0140382],[1502172541000,0.0134606],[1502258941000,0.0147346],[1502345341000,0.0141832],[1502431741000,0.0135445],[1502518141000,0.0126969],[1502604541000,0.0117993],[1502690942000,0.0114241],[1502777341000,0.00992642],[1502863741000,0.0107335],[1502950143000,0.0102091],[1503036542000,0.0106668],[1503122943000,0.0111567],[1503209344000,0.0110907],[1503295742000,0.0114472],[1503382143000,0.0122716],[1503468543000,0.0114489],[1503554943000,0.0123973],[1503641345000,0.0115162],[1503727744000,0.0117219],[1503814144000,0.0127853],[1503900544000,0.0143001],[1503966844000,0.0142912],[1504060445000,0.0136],[1504112643000,0.0135],[1504198746000,0.0146],[1504285144000,0.0164],[1504371544000,0.0162],[1504457945000,0.0170],[1504544645000,0.0149],[1504631045000,0.0158],[1504717143000,0.0170],[1504803545000,0.0170],[1504890246000,0.0158],[1504976647000,0.0154],[1505063046000,0.0149],[1505149443000,0.0157],[1505235845000,0.0154],[1505322242000,0.0157],[1505408643000,0.0138],[1505495045000,0.0132],[1505581443000,0.0132],[1505667843000,0.0131],[1505754245000,0.0136],[1505840344000,0.0135],[1505926742000,0.0132],[1506013142000,0.0131],[1506099842000,0.0128],[1506185942000,0.0130],[1506272641000,0.0129],[1506359042000,0.0133],[1506445142000,0.0133],[1506531842000,0.0131],[1506617941000,0.0130],[1506704341000,0.0127],[1506791041000,0.0127],[1506877142000,0.0126],[1506963843000,0.0122],[1507049942000,0.0121],[1507136642000,0.0123],[1507223041000,0.0119],[1507309142000,0.0119],[1507395842000,0.0119],[1507481942000,0.0118],[1507568641000,0.0109],[1507655042000,0.0105],[1507741141000,0.0105],[1507827841000,0.0108],[1507914241000,0.0102],[1508000642000,0.0113],[1508087042000,0.0115],[1508173441000,0.0113],[1508259841000,0.0107],[1508345941000,0.0108],[1508432342000,0.0105],[1508519041000,0.0102],[1508605441000,0.009354],[1508691841000,0.009562],[1508778241000,0.009276],[1508864642000,0.0100],[1508951041000,0.009967],[1509037445000,0.009436],[1509123842000,0.009608],[1509209941000,0.009569],[1509296641000,0.009557],[1509383042000,0.009314],[1509469441000,0.008831],[1509555541000,0.008314],[1509641941000,0.007644],[1509728641000,0.007553],[1509815041000,0.007565],[1509901441000,0.007300],[1509987842000,0.007770],[1510074241000,0.008461],[1510160641000,0.008276],[1510246742000,0.008858],[1510333441000,0.008921],[1510419541000,0.009552],[1510505941000,0.009623],[1510592341000,0.009451],[1510679041000,0.009559],[1510765142000,0.008927],[1510851542000,0.008652],[1510937942000,0.008558],[1511024642000,0.008813],[1511110741000,0.009204],[1511197141000,0.008753],[1511283542000,0.008588],[1511369942000,0.008675],[1511456642000,0.009332],[1511542742000,0.009270],[1511629442000,0.009852],[1511715542000,0.009224],[1511801942000,0.009405],[1511888641000,0.009426],[1511974741000,0.009235],[1512061141000,0.008510],[1512147841000,0.008861],[1512233941000,0.009183],[1512320342000,0.008851],[1512406742000,0.008726],[1512493142000,0.008772],[1512579541000,0.007992],[1512666242000,0.005924],[1512752342000,0.008106],[1512925441000,0.009729],[1513011842000,0.0112],[1513098242000,0.0190],[1513184642000,0.0185],[1513271042000,0.0172],[1513357443000,0.0176],[1513530242000,0.0165],[1513616642000,0.0171],[1513703041000,0.0195],[1513789441000,0.0192],[1513875842000,0.0195],[1513962242000,0.0187],[1514048644000,0.0200],[1514135042000,0.0200],[1514221441000,0.0198],[1514307841000,0.0179],[1514394241000,0.0180],[1514480641000,0.0175],[1514567041000,0.0170],[1514653441000,0.0170],[1514739841000,0.0169],[1514826242000,0.0173],[1514912641000,0.0187],[1514999041000,0.0165],[1515085441000,0.0166],[1515171542000,0.0154],[1515257941000,0.0180],[1515344641000,0.0177],[1515431097000,0.0169],[1515517497000,0.0173],[1515603897000,0.0171],[1515690298000,0.0170],[1515776698000,0.0171],[1515863097000,0.0173],[1515949497000,0.0181],[1516035898000,0.0171],[1516122298000,0.0170],[1516208697000,0.0165],[1516295098000,0.0172],[1516381498000,0.0168],[1516467898000,0.0164],[1516554297000,0.0165],[1516640698000,0.0167],[1516727098000,0.0165],[1516813498000,0.0161],[1516899897000,0.0162],[1516986298000,0.0159],[1517072698000,0.0158],[1517159098000,0.0161],[1517245498000,0.0164],[1517331898000,0.0164],[1517418297000,0.0161],[1517504699000,0.0157],[1517591098000,0.0147],[1517677498000,0.0159],[1517763898000,0.0181],[1517850297000,0.0180],[1517936698000,0.0181],[1518023097000,0.0183],[1518109498000,0.0174],[1518195898000,0.0182],[1518282298000,0.0179],[1518368698000,0.0181],[1518455098000,0.0179],[1518541498000,0.0182],[1518627899000,0.0223],[1518714298000,0.0221],[1518800699000,0.0229],[1518887098000,0.0211],[1518973498000,0.0212],[1519059898000,0.0202],[1519146298000,0.0211],[1519232697000,0.0198],[1519319098000,0.0196],[1519405497000,0.0203],[1519491898000,0.0207],[1519578298000,0.0224],[1519664698000,0.0214],[1519751098000,0.0201],[1519837497000,0.0196],[1519923899000,0.0196],[1520010298000,0.0187],[1520096701000,0.0184],[1520183101000,0.0185],[1520269500000,0.0181],[1520355898000,0.0181],[1520442299000,0.0181],[1520528699000,0.0188],[1520615098000,0.0201],[1520701498000,0.0198],[1520787898000,0.0201],[1520874298000,0.0193],[1520960699000,0.0189],[1521047099000,0.0192],[1521133499000,0.0196],[1521219897000,0.0196],[1521306298000,0.0195],[1521355707000,0.0193]],"vol_usd": [[1367174842000,0],[1367261402000,0],[1367347803000,0],[1367434202000,0],[1367523302000,0],[1367609702000,0],[1367696102000,0],[1367782802000,0],[1367869502000,0],[1367955902000,0],[1368042302000,0],[1368130201000,0],[1368218702000,0],[1368307501000,0],[1368393902000,0],[1368480301000,0],[1368566702000,0],[1368653702000,0],[1368740102000,0],[1368826502000,0],[1368913804000,0],[1369000201000,0],[1369086602000,0],[1369174202000,0],[1369261201000,0],[1369347602000,0],[1369435202000,0],[1369524902000,0],[1369611602000,0],[1369698002000,0],[1369784402000,0],[1369872302000,0],[1369958702000,0],[1370046304000,0],[1370133001000,0],[1370219702000,0],[1370306104000,0],[1370397302000,0],[1370484302000,0],[1370570747000,0],[1370657402000,0],[1370744102000,0],[1370830503000,0],[1370917502000,0],[1371004202000,0],[1371090602000,0],[1371177003000,0],[1371263702000,0],[1371350102000,0],[1371436802000,0],[1371523203000,0],[1371609902000,0],[1371696302000,0],[1371782702000,0],[1371869102000,0],[1371955502000,0],[1372041903000,0],[1372128302000,0],[1372214702000,0],[1372305902000,0],[1372392301000,0],[1372478702000,0],[1372565702000,0],[1372652102000,0],[1372738501000,0],[1372825227000,0],[1372912502000,0],[1372998663000,0],[1373085062000,0],[1373171462000,0],[1373257862000,0],[1373344262000,0],[1373430662000,0],[1373517962000,0],[1373604662000,0],[1373691062000,0],[1373777461000,0],[1373864462000,0],[1373951162000,0],[1374037562000,0],[1374124862000,0],[1374220862000,0],[1374308172000,0],[1374394562000,0],[1374480962000,0],[1374567362000,0],[1374653775000,0],[1374740162000,0],[1374826262000,0],[1374912661000,0],[1374999062000,0],[1375085462000,0],[1375171862000,0],[1375264262000,0],[1375350661000,0],[1375437061000,0],[1375523462000,0],[1375609861000,0],[1375696262000,0],[1375782662000,0],[1375869063000,0],[1375955461000,0],[1376041862000,0],[1376128262000,0],[1376214663000,0],[1376301474000,0],[1376387762000,0],[1376474161000,0],[1376560872000,0],[1376648462000,0],[1376734862000,0],[1376821262000,0],[1376907662000,0],[1376994063000,0],[1377080461000,0],[1377166862000,0],[1377253261000,0],[1377339662000,0],[1377426062000,0],[1377512462000,0],[1377598862000,0],[1377685262000,0],[1377771662000,0],[1377858062000,0],[1377944462000,0],[1378030862000,0],[1378117262000,0],[1378203662000,0],[1378290062000,0],[1378376762000,0],[1378463162000,0],[1378549562000,0],[1378635961000,0],[1378722362000,0],[1378808762000,0],[1378895162000,0],[1378981562000,0],[1379067963000,0],[1379154362000,0],[1379240762000,0],[1379327162000,0],[1379413562000,0],[1379499962000,0],[1379586362000,0],[1379672761000,0],[1379759161000,0],[1379845562000,0],[1379931962000,0],[1380018362000,0],[1380104762000,0],[1380191161000,0],[1380277562000,0],[1380363961000,0],[1380450361000,0],[1380536761000,0],[1380623162000,0],[1380709562000,0],[1380795962000,0],[1380888069000,0],[1380974469000,0],[1381060863000,0],[1381147268000,0],[1381233963000,0],[1381321263000,0],[1381407662000,0],[1381494063000,0],[1381580462000,0],[1381666862000,0],[1381753262000,0],[1381839662000,0],[1381926062000,0],[1382012463000,0],[1382098866000,0],[1382185265000,0],[1382274365000,0],[1382360761000,0],[1382447162000,0],[1382533869000,0],[1382620262000,0],[1382706662000,0],[1382793061000,0],[1382879462000,0],[1382965865000,0],[1383052262000,0],[1383138662000,0],[1383225061000,0],[1383311462000,0],[1383398468000,0],[1383484861000,0],[1383570967000,0],[1383657363000,0],[1383744062000,0],[1383830463000,0],[1383916862000,0],[1384003262000,0],[1384089672000,0],[1384176062000,0],[1384262462000,0],[1384348862000,0],[1384435262000,0],[1384521662000,0],[1384608362000,0],[1384694762000,0],[1384781162000,0],[1384867563000,0],[1384953973000,0],[1385040962000,0],[1385127365000,0],[1385213763000,0],[1385300163000,0],[1385389862000,0],[1385476263000,0],[1385562375000,0],[1385650275000,0],[1385747470000,0],[1385833872000,0],[1385922962000,0],[1386010261000,0],[1386096662000,0],[1386183062000,0],[1386269463000,0],[1386355862000,0],[1386442267000,0],[1386528662000,0],[1386615062000,0],[1386701766000,0],[1386788162000,0],[1386874561000,0],[1386960962000,0],[1387047663000,0],[1387134062000,0],[1387220463000,0],[1387306862000,0],[1387393262000,0],[1387479971000,0],[1387566362000,0],[1387654563000,0],[1387740962000,0],[1387828861000,0],[1387915262000,0],[1388001662000,0],[1388088362000,0],[1388174462000,33300600],[1388260862000,13936600],[1388347263000,6729630],[1388433664000,16361000],[1388520063000,8350680],[1388606463000,8159590],[1388692866000,17790500],[1388779562000,25401900],[1388865963000,12291600],[1388952363000,23390300],[1389040865000,61315300],[1389129065000,39372200],[1389215464000,53885400],[1389301879000,20295200],[1389388864000,9204280],[1389475264000,25538900],[1389561663000,20664900],[1389705364000,14094100],[1389791763000,11696800],[1389879062000,6589470],[1389973863000,9157700],[1390067162000,6755730],[1390154462000,6780230],[1390248662000,6207610],[1390335364000,4938180],[1390451777000,10488600],[1390560363000,26887900],[1390646763000,9167740],[1390733462000,11689000],[1390830663000,12517200],[1390917062000,22454900],[1391003462000,8451760],[1391089862000,6156740],[1391176263000,6775300],[1391262663000,4416580],[1391349063000,5700950],[1391435765000,3479920],[1391523366000,4442980],[1391609767000,3391020],[1391697074000,8309390],[1391783466000,15229300],[1391869876000,8138110],[1391958667000,6625600],[1392045384000,23466300],[1392132088000,12517100],[1392218497000,12838900],[1392304896000,5799730],[1392391294000,23444500],[1392477986000,10056400],[1392564379000,5110250],[1392651395000,7948870],[1392737818000,3479380],[1392824503000,2194490],[1392911197000,6499250],[1392998196000,9077900],[1393084888000,2944030],[1393171297000,11342300],[1393257698000,7381230],[1393344696000,23109600],[1393433783000,11621100],[1393521091000,5028370],[1393608092000,5775470],[1393695091000,4091080],[1393781499000,2549840],[1393869077000,12965400],[1393964479000,46057300],[1394053879000,12138700],[1394140880000,8862560],[1394227581000,6267080],[1394313993000,5880260],[1394400371000,6731190],[1394486776000,5231530],[1394573174000,3777160],[1394659576000,12127300],[1394745975000,4462860],[1394834774000,4034760],[1394921176000,3102540],[1395007590000,5321400],[1395093980000,6980580],[1395180385000,26579500],[1395267385000,35474700],[1395353785000,16594700],[1395440781000,19233300],[1395527181000,6232650],[1395613581000,2759660],[1395700583000,7764140],[1395787288000,6918770],[1395904883000,13598300],[1395991290000,31210600],[1396097492000,6478590],[1396194088000,7874500],[1396280485000,10445300],[1396368701000,6905120],[1396455104000,9133720],[1396543286000,16372100],[1396629688000,6798500],[1396716087000,3269590],[1396802496000,5111940],[1396888894000,3652720],[1396976485000,3611800],[1397063495000,2305440],[1397149885000,8656450],[1397236296000,22164800],[1397322696000,10537000],[1397409094000,5321550],[1397496089000,11766600],[1397582488000,13455000],[1397670387000,17855400],[1397757390000,12209000],[1397843789000,8800750],[1397930181000,5656100],[1398016585000,6957530],[1398103287000,4401560],[1398189693000,2489890],[1398278190000,2800840],[1398366089000,4254670],[1398453988000,13019300],[1398541286000,3450500],[1398629196000,3202420],[1398717087000,3664590],[1398820291000,3381590],[1398918085000,8703100],[1399004485000,3199330],[1399090883000,3804410],[1399177286000,2370050],[1399263694000,1118940],[1399350084000,2036770],[1399438584000,3698560],[1399524989000,3907350],[1399611984000,2099120],[1399698379000,2575910],[1399784782000,1834120],[1399871184000,2563200],[1399957583000,1681220],[1400043990000,1408650],[1400130994000,1378400],[1400217382000,1868390],[1400303795000,1369370],[1400390183000,759749],[1400476583000,874059],[1400562999000,1662560],[1400649445000,4795380],[1400736695000,2485920],[1400823091000,8841960],[1400955699000,2561540],[1401042094000,8860550],[1401131202000,4005550],[1401217590000,4383510],[1401303985000,3276940],[1401390386000,1973480],[1401477687000,5547160],[1401564109000,4892950],[1401650483000,7019450],[1401736887000,5850270],[1401823285000,4210630],[1401911785000,4277830],[1401998784000,3802440],[1402085180000,2382680],[1402171581000,1954310],[1402257984000,1824320],[1402344390000,1790210],[1402430792000,2302150],[1402519888000,2114810],[1402606291000,3305450],[1402692687000,4111200],[1402779086000,3163620],[1402865493000,2682970],[1402951887000,2789200],[1403038288000,2318470],[1403124684000,2026830],[1403211089000,3232530],[1403297485000,2181660],[1403383885000,1269640],[1403470282000,1368400],[1403560588000,1472200],[1403647904000,1178910],[1403764591000,2168450],[1403857885000,2481100],[1403982086000,1592540],[1404074784000,1665000],[1404161192000,4407490],[1404257188000,4126590],[1404352593000,6400330],[1404460890000,1808770],[1404608784000,5152220],[1404741464000,4745300],[1404869041000,2769380],[1404957841000,3004400],[1405044241000,1846060],[1405130641000,1992940],[1405217041000,6123910],[1405303741000,5685510],[1405390141000,3778310],[1405476541000,1780580],[1405562941000,3350560],[1405649341000,2623970],[1405735741000,2493430],[1405822141000,1675030],[1405908541000,1843050],[1405995241000,1392820],[1406081641000,908634],[1406168041000,1186060],[1406254441000,4309280],[1406340841000,2849980],[1406427241000,1792480],[1406513641000,1288910],[1406603641000,1735410],[1406696041000,945293],[1406782441000,2119390],[1406870348000,2744200],[1406957641000,2008220],[1407044941000,893700],[1407131341000,851050],[1407217742000,1299760],[1407304141000,1167280],[1407390541000,1144680],[1407476941000,3466560],[1407563341000,2604760],[1407649741000,1200310],[1407736141000,1003180],[1407822542000,8279200],[1407908941000,3930330],[1407995341000,7002540],[1408081741000,4696220],[1408168141000,1779280],[1408254541000,1574480],[1408340941000,5623370],[1408427341000,7091700],[1408513741000,8357180],[1408600141000,13948000],[1408686541000,8468960],[1408772941000,4999560],[1408859341000,5891750],[1408945741000,6280740],[1409032141000,4960670],[1409118541000,4604710],[1409204941000,5743700],[1409291341000,3171060],[1409377742000,2564910],[1409464141000,1836930],[1409550541000,6357580],[1409636941000,2510670],[1409723641000,2721260],[1409810041000,1574500],[1409896442000,3815550],[1409982841000,1790110],[1410069241000,1694010],[1410156841000,3520750],[1410243241000,2044680],[1410329641000,3253610],[1410416041000,5069160],[1410502441000,3176190],[1410588841000,2133500],[1410675242000,2194570],[1410761641000,2064930],[1410848041000,3272230],[1410934442000,1982110],[1411020841000,3241600],[1411107241000,4619340],[1411193641000,4425280],[1411280041000,5759820],[1411366441000,2470960],[1411452841000,1377140],[1411539240000,5137720],[1411626240000,2648880],[1411712641000,1566150],[1411799040000,1461770],[1411885440000,895477],[1411971842000,2070890],[1412058240000,1475090],[1412167440000,2408010],[1412273640000,1130010],[1412360042000,1122190],[1412448541000,6873900],[1412534942000,7675640],[1412621341000,8798380],[1412707741000,8319780],[1412794141000,5345210],[1412880541000,8056570],[1412966941000,7169710],[1413053341000,3937040],[1413139741000,2365140],[1413226141000,4024740],[1413312541000,8158220],[1413398941000,5197490],[1413485641000,4005130],[1413572041000,3934070],[1413658442000,2479960],[1413744841000,1824490],[1413831242000,1973380],[1413917642000,2084270],[1414004041000,2131100],[1414090443000,2768640],[1414176842000,3613650],[1414263243000,2652330],[1414349643000,2100380],[1414436042000,2654180],[1414522441000,2241080],[1414608841000,2251090],[1414695241000,2595650],[1414781642000,2603200],[1414870141000,2372940],[1414960141000,2194460],[1415046542000,1971410],[1415132942000,2336580],[1415219343000,2773590],[1415305741000,2470170],[1415392141000,2547270],[1415478542000,1625460],[1415564941000,1638120],[1415651341000,3391130],[1415737742000,3004240],[1415824141000,7409270],[1415910542000,13878500],[1415996942000,8685850],[1416083342000,3961260],[1416169741000,3173980],[1416256142000,3639890],[1416342541000,4217870],[1416428941000,2961850],[1416515342000,3517390],[1416601742000,3852420],[1416688142000,2699850],[1416774543000,1587100],[1416860942000,3101170],[1416948241000,3592250],[1417034642000,2560260],[1417121041000,1894860],[1417207442000,1830380],[1417293842000,2471080],[1417380241000,1225470],[1417466641000,1232450],[1417553043000,1827970],[1417639443000,1853810],[1417725841000,2212070],[1417812242000,2424350],[1417898647000,1837340],[1417985041000,1663570],[1418071442000,2087910],[1418157841000,3687600],[1418244241000,2172930],[1418448542000,2033560],[1418554442000,1684110],[1418640842000,1803170],[1418727541000,3997480],[1418813941000,4360050],[1418900341000,4889490],[1418986741000,2842630],[1419073142000,2701840],[1419159541000,2529560],[1419245941000,2306830],[1419332341000,2111260],[1419418742000,1600330],[1419505143000,2254910],[1419591541000,1594420],[1419677941000,2351930],[1419764341000,1958310],[1419850741000,1618940],[1419937141000,1333100],[1420023542000,1493300],[1420109941000,1450530],[1420196342000,700467],[1420282741000,2707910],[1420369141000,4843750],[1420455541000,4996470],[1420541941000,9617040],[1420628341000,2785560],[1420714741000,3587460],[1420816142000,2096430],[1420919343000,3110020],[1421005741000,2564950],[1421092143000,1642860],[1421178543000,3907250],[1421264941000,4746220],[1421351342000,3718290],[1421437741000,2862360],[1421524156000,1560540],[1421610542000,1635040],[1421696941000,813750],[1421783342000,1050260],[1421869741000,757864],[1421956141000,2057570],[1422042541000,1175210],[1422128941000,3783720],[1422215343000,9284600],[1422301741000,9327670],[1422388141000,4687140],[1422474541000,2739330],[1422560941000,2918340],[1422647341000,1906660],[1422734041000,1061910],[1422820443000,2643350],[1422906843000,1765850],[1422993243000,2625570],[1423079644000,3490750],[1423166043000,4364930],[1423252743000,2397950],[1423339143000,1715580],[1423425543000,776454],[1423511943000,1207000],[1423598343000,1974110],[1423684743000,1184510],[1423771143000,1150540],[1423857543000,2336820],[1423943943000,2329040],[1424030343000,3825960],[1424116743000,2152040],[1424203143000,1795900],[1424289543000,1574330],[1424375943000,1192500],[1424462344000,1425940],[1424549343000,993589],[1424635743000,1359620],[1424722143000,1047070],[1424808543000,1158000],[1424894943000,760655],[1424981343000,930683],[1425067743000,2194380],[1425159543000,1082680],[1425245943000,1316770],[1425332343000,2634320],[1425437343000,2719930],[1425523743000,2472580],[1425610143000,1952040],[1425696543000,1674630],[1425782943000,1194080],[1425869344000,1226440],[1425955743000,3476210],[1426042443000,3529140],[1426128843000,1864100],[1426215243000,2127790],[1426301643000,1909380],[1426388043000,1350850],[1426475044000,1170000],[1426561444000,1277290],[1426647843000,1511090],[1426734243000,3307060],[1426820643000,2474840],[1426907043000,1037700],[1426993443000,982467],[1427079843000,1168740],[1427166243000,1184080],[1427252643000,2056500],[1427339043000,2172140],[1427425443000,1744130],[1427511843000,980990],[1427598243000,898613],[1427688843000,1358910],[1427775243000,1134420],[1427861943000,1211310],[1427958243000,1116870],[1428044643000,1218920],[1428131644000,1070750],[1428218043000,705383],[1428304444000,1127060],[1428390843000,1117850],[1428477244000,802737],[1428565143000,1469480],[1428651543000,1452930],[1428737943000,1581330],[1428824343000,1106350],[1428910743000,705980],[1428997143000,1558610],[1429085643000,1666770],[1429172643000,1078970],[1429259043000,1098860],[1429345443000,1021570],[1429431843000,837436],[1429518243000,983372],[1429604943000,947792],[1429691343000,1175750],[1429778043000,958793],[1429864443000,1014920],[1429957743000,803353],[1430061843000,1159900],[1430148243000,1134140],[1430234643000,1463390],[1430321044000,1126060],[1430407443000,1977820],[1430493843000,1532950],[1430580243000,1004280],[1430666643000,1312610],[1430753056000,1446240],[1430839454000,1452220],[1430932143000,1002480],[1431018543000,1178180],[1431104943000,1591480],[1431191343000,1649730],[1431277743000,1025290],[1431364143000,801878],[1431450543000,894688],[1431536943000,922598],[1431623343000,1835060],[1431709750000,858100],[1431796149000,735856],[1431882543000,538048],[1431968943000,525958],[1432055343000,629599],[1432142043000,804530],[1432228443000,1214310],[1432314843000,4059310],[1432401243000,3362590],[1432487643000,1910730],[1432574043000,1415760],[1432661043000,1374500],[1432747443000,1771380],[1432834743000,1259060],[1432928643000,1472110],[1433015043000,1657370],[1433101443000,1923790],[1433188143000,1923800],[1433278143000,1500170],[1433364543000,1139980],[1433450944000,1063020],[1433537343000,1299630],[1433626143000,1281710],[1433712543000,1169430],[1433798944000,1720310],[1433885343000,1462920],[1433971743000,1241190],[1434058143000,1030970],[1434144543000,959498],[1434236043000,1437820],[1434322443000,3129550],[1434408843000,1875550],[1434495243000,8684630],[1434581643000,13995900],[1434668043000,7647960],[1434754443000,7093780],[1434840843000,5880160],[1434927243000,3206670],[1435013643000,3083150],[1435100043000,2338660],[1435186443000,3319000],[1435272843000,4250910],[1435359244000,2093600],[1435445643000,4409160],[1435532043000,3090630],[1435618449000,12551000],[1435704870000,15567900],[1435791243000,7195250],[1435877643000,6276020],[1435964044000,4391760],[1436050443000,3914220],[1436136843000,12295400],[1436223243000,23944300],[1436309646000,14071600],[1436396043000,21789400],[1436482443000,43630100],[1436568843000,62553400],[1436655243000,21051300],[1436741647000,19225500],[1436828043000,14150900],[1436914443000,5502730],[1437000845000,7147340],[1437087247000,17341200],[1437173644000,9688590],[1437260344000,8647200],[1437346743000,4528350],[1437433444000,3987430],[1437519844000,4711260],[1437606244000,2976170],[1437692044000,2173170],[1437778443000,14431600],[1437864844000,10564100],[1437951243000,7975780],[1438037644000,5101830],[1438124044000,10655600],[1438210443000,6613580],[1438296844000,5457550],[1438383244000,4616030],[1438469943000,6244890],[1438556343000,6852770],[1438642744000,5469420],[1438729444000,4581850],[1438815844000,2603380],[1438902252000,3856160],[1438988644000,4128110],[1439075044000,4597630],[1439161445000,3520180],[1439247844000,2183980],[1439334544000,3231370],[1439420943000,3674540],[1439507343000,2508250],[1439593743000,3155050],[1439680143000,1915010],[1439766543000,3308760],[1439852943000,2352540],[1439939343000,2458250],[1440026643000,6899670],[1440113043000,2922090],[1440199443000,1733800],[1440286143000,1895780],[1440372543000,2056100],[1440459243000,7202340],[1440545643000,11428300],[1440632043000,4627120],[1440718443000,1843810],[1440804843000,4279490],[1440891843000,1665740],[1440978243000,1493240],[1441064643000,1780920],[1441151043000,1387960],[1441237443000,2423850],[1441323843000,2197450],[1441410243000,1450240],[1441496643000,2656740],[1441583043000,4273200],[1441669443000,2220770],[1441756443000,2590490],[1441842843000,2295440],[1441929243000,1418650],[1442015643000,1250520],[1442102643000,1518800],[1442189043000,1034680],[1442275443000,1134530],[1442361843000,594421],[1442448243000,876539],[1442534643000,1307730],[1442622243000,1229190],[1442709543000,884419],[1442797443000,592280],[1442894043000,789180],[1442980443000,1217710],[1443066843000,658883],[1443153843000,1067640],[1443240243000,604612],[1443327543000,527311],[1443413943000,989883],[1443500643000,2691980],[1443587043000,1972700],[1443673443000,1013080],[1443759843000,1388210],[1443846243000,749203],[1443933543000,815861],[1444019943000,738593],[1444106343000,1099570],[1444192743000,1920670],[1444279147000,1362760],[1444365543000,741224],[1444451944000,703041],[1444539243000,640519],[1444625643000,1172700],[1444712043000,846680],[1444798443000,1259540],[1444884843000,1734050],[1444971244000,941932],[1445057644000,1532480],[1445144643000,2021150],[1445231043000,1180380],[1445317743000,883742],[1445404143000,860579],[1445490544000,689776],[1445576943000,1059490],[1445663343000,925313],[1445751243000,937404],[1445837643000,1251130],[1445924043000,817724],[1446010443000,946133],[1446096843000,1403430],[1446183243000,15542700],[1446269643000,8603250],[1446361743000,4681110],[1446448143000,3474990],[1446534543000,8214410],[1446620943000,20818300],[1446707943000,22767300],[1446794343000,10257100],[1446880743000,6017040],[1446969243000,1973100],[1447055643000,2890240],[1447142045000,3094550],[1447228443000,6346860],[1447314843000,3127140],[1447401243000,2966400],[1447487643000,1602620],[1447575843000,819123],[1447662243000,1573700],[1447748643000,1510710],[1447835043000,1006550],[1447921466000,1061870],[1448007856000,1739760],[1448094243000,930476],[1448183943000,707729],[1448270343000,867164],[1448356743000,1487860],[1448443144000,756270],[1448529551000,6631490],[1448615943000,5204020],[1448718543000,1718590],[1448804943000,1923040],[1448891344000,3248520],[1448977744000,2725760],[1449064145000,2148850],[1449150549000,1939190],[1449236943000,1349960],[1449323343000,1992440],[1449410044000,3662860],[1449496443000,3892460],[1449582843000,2695330],[1449669244000,4033180],[1449755643000,3032210],[1449842045000,2966160],[1449928444000,7664340],[1450014844000,2214450],[1450101243000,3121000],[1450187652000,4893540],[1450274043000,3837880],[1450360443000,2112340],[1450446844000,2789690],[1450533243000,1231400],[1450619644000,1298080],[1450706044000,3239930],[1450792444000,1526930],[1450878844000,1908250],[1450965244000,2437070],[1451051655000,1548090],[1451138044000,2879310],[1451224443000,2279500],[1451310843000,1623580],[1451397244000,1655140],[1451483643000,2091790],[1451570043000,1705900],[1451656443000,2326170],[1451742843000,1998470],[1451829245000,2365120],[1451915643000,2646270],[1452002043000,1806420],[1452088443000,1508150],[1452174871000,3487770],[1452261242000,2804130],[1452347643000,2593110],[1452434642000,2021920],[1452521043000,2436880],[1452608942000,1867850],[1452695942000,6053020],[1452782343000,1903100],[1452868742000,3376070],[1452955143000,4512470],[1453041543000,2387780],[1453127942000,2038040],[1453214343000,1316870],[1453300742000,2283060],[1453387743000,4109230],[1453474142000,3158430],[1453560543000,2488090],[1453646942000,1469510],[1453733343000,1592540],[1453819742000,2561920],[1453906142000,4393260],[1453993442000,3536340],[1454079842000,2290080],[1454166242000,1254020],[1454252643000,1082300],[1454339042000,1382590],[1454425442000,1166660],[1454511842000,1114970],[1454598242000,1608380],[1454684643000,1445980],[1454771043000,1206960],[1454857442000,931646],[1454943842000,949639],[1455030243000,1068980],[1455116642000,1150360],[1455203042000,1034330],[1455289443000,1040770],[1455375842000,1146890],[1455462242000,1581080],[1455548642000,1513870],[1455635043000,1133940],[1455721443000,1652390],[1455807842000,1451730],[1455894242000,1447560],[1455980642000,2797990],[1456067042000,3614660],[1456153443000,1642570],[1456239842000,2436840],[1456326243000,1865710],[1456412642000,1356500],[1456499643000,1484030],[1456586042000,810792],[1456672442000,1005850],[1456758843000,1420940],[1456845242000,1122220],[1456931642000,1329360],[1457018042000,1653520],[1457104442000,1556600],[1457190842000,1611860],[1457277242000,1284390],[1457363642000,1127330],[1457450042000,915143],[1457536742000,862640],[1457623142000,1233020],[1457709542000,1659210],[1457795942000,1284660],[1457882342000,939648],[1457968742000,1038050],[1458055142000,711650],[1458141542000,685094],[1458229142000,1046850],[1458315542000,1231810],[1458401942000,886048],[1458488342000,920616],[1458577442000,566372],[1458663842000,543548],[1458750242000,1354670],[1458836643000,1345400],[1458923042000,970592],[1459009442000,832111],[1459095842000,1350430],[1459182242000,1722850],[1459268642000,1532710],[1459355042000,1206420],[1459441442000,1438240],[1459527842000,1226550],[1459614243000,884120],[1459701242000,1038590],[1459787642000,1004790],[1459877042000,837079],[1459963442000,931558],[1460049842000,964253],[1460136542000,916900],[1460222942000,1310830],[1460309342000,975735],[1460395742000,1156010],[1460482142000,1092230],[1460568542000,1143730],[1460654942000,987518],[1460741342000,1220940],[1460827742000,1005250],[1460914142000,1007290],[1461000542000,1078250],[1461086942000,1123610],[1461173342000,1436480],[1461259742000,1295390],[1461346142000,1562040],[1461432542000,1129320],[1461518942000,3384400],[1461605342000,4938090],[1461691742000,6771400],[1461778142000,9941300],[1461864542000,5268160],[1461950942000,2423980],[1462037342000,2073640],[1462123742000,2051760],[1462210142000,2244000],[1462296542000,2280520],[1462382942000,1630290],[1462469342000,1467160],[1462555742000,1181510],[1462642142000,2328750],[1462728542000,2330650],[1462814942000,2185030],[1462901342000,3639320],[1462987742000,2196930],[1463074142000,1569490],[1463160542000,1987940],[1463246942000,1938990],[1463333342000,1789610],[1463419742000,2919930],[1463506142000,3035260],[1463606342000,2371490],[1463692742000,2920090],[1463779142000,3878250],[1463865542000,1960080],[1463951942000,1677860],[1464038342000,1772670],[1464124742000,1710550],[1464211142000,2595340],[1464297542000,2561990],[1464383942000,9160910],[1464470342000,11324100],[1464556742000,8451120],[1464643142000,4286840],[1464729542000,4719470],[1464815942000,4655140],[1464902342000,2157360],[1464988742000,3791270],[1465075142000,3339600],[1465161542000,2017730],[1465247942000,3106820],[1465334343000,3307800],[1465420742000,2874760],[1465507142000,5972120],[1465593542000,6136810],[1465679942000,8568660],[1465766342000,13026900],[1465852742000,9246480],[1465939142000,8556290],[1466025543000,4259980],[1466111942000,7806670],[1466198342000,13323600],[1466284742000,8457660],[1466371142000,3784730],[1466457542000,3755750],[1466543942000,11655100],[1466630342000,9972120],[1466716742000,12648100],[1466803142000,8979840],[1466889542000,5847050],[1466975942000,4729240],[1467062342000,2633700],[1467148742000,2889150],[1467235142000,2190220],[1467321542000,2633520],[1467407942000,5544360],[1467494342000,14714600],[1467580742000,7748990],[1467667142000,4608540],[1467753542000,5041940],[1467839942000,3234070],[1467926342000,5484090],[1468012742000,4689600],[1468099142000,6133080],[1468185543000,2964530],[1468271942000,3227500],[1468358342000,2406680],[1468445342000,2340500],[1468531742000,1582820],[1468618142000,1573390],[1468704542000,1297730],[1468791242000,2056360],[1468877642000,1514250],[1468964042000,1502130],[1469050442000,1783000],[1469136842000,1439080],[1469223242000,2367910],[1469309642000,1724910],[1469396042000,1718310],[1469482442000,1410340],[1469568842000,2527480],[1469655242000,1815140],[1469741642000,1630060],[1469828042000,1703510],[1469914443000,1333360],[1470000842000,1643180],[1470087242000,1867910],[1470173642000,3375470],[1470260044000,4610490],[1470346442000,1502600],[1470432842000,1121120],[1470519242000,1315520],[1470605642000,1223640],[1470692042000,1345180],[1470778442000,1809710],[1470864842000,1605560],[1470951242000,2234740],[1471037642000,1907220],[1471126142000,2464620],[1471212542000,2561960],[1471298942000,3232980],[1471385342000,2245920],[1471471742000,1848920],[1471558142000,1580630],[1471644542000,1379950],[1471730942000,1453880],[1471817342000,1359520],[1471904042000,2286530],[1471990442000,11740800],[1472076843000,4779830],[1472163243000,3319080],[1472249643000,2435200],[1472336042000,1868280],[1472422449000,2332270],[1472508843000,2615230],[1472595243000,2162770],[1472681643000,1663420],[1472768043000,2213220],[1472854443000,1914160],[1472940843000,2210690],[1473027243000,4855280],[1473113643000,4171650],[1473200043000,1760070],[1473286443000,1928350],[1473372843000,2321370],[1473459243000,1510300],[1473545643000,655549],[1473632043000,2063120],[1473718443000,2405920],[1473804843000,2166460],[1473891243000,1221040],[1473977643000,1742500],[1474064043000,1602640],[1474150456000,1517650],[1474236843000,1655760],[1474323243000,1553120],[1474409643000,2193760],[1474496043000,1897950],[1474582443000,3324960],[1474668843000,1519000],[1474755243000,2024030],[1474841642000,1505900],[1474928643000,2040960],[1475015043000,1731880],[1475101443000,1847940],[1475187843000,1565730],[1475274242000,2086270],[1475360643000,1387670],[1475447042000,1325770],[1475533443000,1148480],[1475619843000,1065250],[1475706243000,1317870],[1475792643000,1351290],[1475879042000,1539840],[1475965442000,1440780],[1476051843000,1220230],[1476138243000,1352690],[1476224644000,1915320],[1476311043000,3145010],[1476397443000,3626250],[1476483843000,2174230],[1476570243000,1643850],[1476656643000,2095070],[1476743043000,1647230],[1476829743000,3671010],[1476916143000,2150710],[1477002543000,2355550],[1477088943000,2491160],[1477175355000,3789680],[1477261743000,3874180],[1477348143000,2928330],[1477434543000,2713650],[1477521243000,5636640],[1477607643000,6177940],[1477694044000,4291610],[1477780743000,5581100],[1477867453000,4344760],[1477953843000,3724330],[1478040243000,4884970],[1478126643000,3476230],[1478213043000,5705980],[1478299443000,3618070],[1478385843000,2328520],[1478475843000,2211240],[1478562243000,2768970],[1478648643000,2503380],[1478735043000,2878600],[1478821443000,2321770],[1478907843000,2112880],[1478994243000,2555300],[1479080643000,3337110],[1479167043000,2524050],[1479253458000,3025260],[1479339843000,4160830],[1479426243000,3175470],[1479512643000,2640650],[1479599043000,2023860],[1479685443000,2676410],[1479771843000,1992780],[1479858243000,2346720],[1479944643000,2169220],[1480031043000,2076840],[1480117443000,2202930],[1480203843000,1771510],[1480290243000,1633210],[1480376643000,1720060],[1480463043000,2411860],[1480549443000,1861150],[1480635843000,1972350],[1480722243000,2548100],[1480808943000,1799900],[1480895343000,1904420],[1480981743000,11096400],[1481068143000,3071720],[1481154543000,2527050],[1481240943000,2683340],[1481327343000,1761320],[1481413743000,2086430],[1481500143000,1947200],[1481586543000,2449670],[1481673243000,1949160],[1481759643000,2627470],[1481846043000,2675810],[1481932443000,1622990],[1482018843000,2550990],[1482105259000,1946930],[1482191643000,2268410],[1482278043000,2332630],[1482364443000,2899380],[1482450843000,3662530],[1482537243000,15089900],[1482623643000,19934400],[1482710043000,11363600],[1482796443000,7587500],[1482882843000,9251050],[1482969243000,10348400],[1483055643000,9334540],[1483142043000,11903300],[1483228443000,9211230],[1483314843000,11336800],[1483401243000,14525400],[1483487643000,10100100],[1483574043000,13718200],[1483660443000,19219000],[1483746843000,11041500],[1483833243000,14582600],[1483919643000,11745600],[1484006043000,11147700],[1484092743000,15157900],[1484179143000,21863300],[1484265843000,12844000],[1484352243000,7012350],[1484438643000,3272150],[1484525043000,8638490],[1484611443000,7457980],[1484697843000,4095110],[1484784243000,3653600],[1484870643000,3359630],[1484957043000,2698540],[1485043443000,2007320],[1485129843000,1954320],[1485216243000,1992950],[1485302643000,1901620],[1485389081000,6815580],[1485475443000,5094120],[1485561843000,4263440],[1485648244000,2590080],[1485734644000,2068420],[1485821056000,9579320],[1485907443000,14619900],[1485994144000,6839860],[1486080540000,4443390],[1486166941000,7855860],[1486253340000,6097240],[1486339741000,3946740],[1486426140000,4179860],[1486512541000,5850030],[1486598940000,6270420],[1486685341000,20716900],[1486771741000,6948310],[1486858141000,2675750],[1486944540000,1976670],[1487030940000,4071080],[1487117940000,3357900],[1487204340000,1949520],[1487290740000,3292400],[1487377140000,3286000],[1487463540000,2521580],[1487549940000,2036020],[1487636340000,2439630],[1487722740000,3390260],[1487809140000,3857190],[1487895540000,3443790],[1487981941000,6175340],[1488068340000,2827340],[1488154741000,2033370],[1488241140000,3083320],[1488327840000,3324560],[1488414240000,3739480],[1488500641000,8713160],[1488587040000,6774170],[1488673441000,2645790],[1488759840000,2121500],[1488846240000,3673570],[1488932640000,4918390],[1489019040000,3885070],[1489105440000,2552620],[1489191840000,6522880],[1489278242000,2671820],[1489364640000,2702980],[1489451041000,21760700],[1489537441000,7158430],[1489623840000,5679730],[1489710240000,11708900],[1489797250000,10860500],[1489883641000,10934100],[1489970040000,5017180],[1490056740000,3395940],[1490143140000,4396240],[1490229541000,4994840],[1490315940000,2644520],[1490402340000,12032500],[1490488740000,6891130],[1490575141000,3134470],[1490661541000,4420300],[1490747940000,3492310],[1490834341000,7832420],[1490920741000,191569000],[1491007142000,94807100],[1491093541000,55207300],[1491179940000,86847400],[1491266340000,116154000],[1491352741000,126006000],[1491439140000,223115000],[1491525541000,182959000],[1491611940000,91248800],[1491698340000,55104800],[1491784740000,90169500],[1491871141000,73039400],[1491957541000,48052000],[1492043941000,157206000],[1492130341000,61967300],[1492216745000,58641700],[1492303141000,45824200],[1492389541000,21554400],[1492475941000,106000000],[1492562341000,78272900],[1492648740000,54406000],[1492735142000,53165700],[1492821540000,97163700],[1492907941000,161344000],[1492994341000,193126000],[1493080740000,58174300],[1493167140000,53326400],[1493253541000,68622700],[1493339941000,73436900],[1493426341000,38476300],[1493512740000,43740300],[1493599141000,39955200],[1493685542000,66059400],[1493771944000,33297900],[1493858342000,252296000],[1493944741000,243138000],[1494031141000,211271000],[1494117541000,103917000],[1494203941000,186303000],[1494290341000,128699000],[1494376741000,254694000],[1494463140000,397332000],[1494549541000,204720000],[1494635941000,111065000],[1494722341000,80004300],[1494808741000,62316500],[1494895141000,99450400],[1494981541000,132789000],[1495067941000,136084000],[1495154342000,113607000],[1495240741000,93483000],[1495327141000,56744100],[1495413559000,105017000],[1495499941000,160963000],[1495586342000,217637000],[1495672740000,191934000],[1495760641000,686377000],[1495847041000,507942000],[1495933441000,526753000],[1496019841000,354678000],[1496106241000,217102000],[1496192641000,219789000],[1496279041000,301269000],[1496365441000,406319000],[1496451841000,334031000],[1496538241000,284212000],[1496624641000,229135000],[1496711041000,343074000],[1496797441000,306072000],[1496886241000,276204000],[1496972641000,219164000],[1497059041000,174239000],[1497145441000,196643000],[1497231841000,401958000],[1497318241000,374461000],[1497404641000,166485000],[1497491041000,266954000],[1497577441000,300473000],[1497663841000,708511000],[1497750241000,1630670000],[1497836641000,908307000],[1497923041000,1334320000],[1498009441000,577116000],[1498095841000,633755000],[1498182241000,435894000],[1498268641000,287834000],[1498355041000,333995000],[1498441442000,327560000],[1498560271000,537564000],[1498687741000,378299000],[1498774141000,308946000],[1498860541000,245600000],[1498946941000,218725000],[1499033341000,304007000],[1499119742000,760179000],[1499206141000,1009610000],[1499292541000,835442000],[1499378941000,483220000],[1499465341000,516596000],[1499551742000,577576000],[1499638141000,454346000],[1499724542000,344304000],[1499810940000,447435000],[1499924641000,352223000],[1500012541000,203657000],[1500098941000,348431000],[1500185341000,319805000],[1500271741000,412498000],[1500358141000,355575000],[1500444541000,339529000],[1500530941000,226845000],[1500617341000,470234000],[1500703741000,166285000],[1500790141000,137420000],[1500876543000,208305000],[1500962943000,161123000],[1501049344000,197184000],[1501135743000,100972000],[1501222145000,80064100],[1501308545000,147760000],[1501394944000,92555800],[1501481345000,64481700],[1501567744000,265655000],[1501654144000,181779000],[1501740545000,96008800],[1501826946000,98007000],[1501913344000,213209000],[1501999742000,180382000],[1502086142000,106521000],[1502172541000,116923000],[1502258941000,269985000],[1502345341000,174528000],[1502431741000,136363000],[1502518141000,129251000],[1502604541000,238897000],[1502690942000,137697000],[1502777341000,162230000],[1502863741000,147991000],[1502950143000,110402000],[1503036542000,178706000],[1503122943000,223012000],[1503209344000,138901000],[1503295742000,140825000],[1503382143000,241127000],[1503468543000,119740000],[1503554943000,584134000],[1503641345000,259305000],[1503727744000,130216000],[1503814144000,304441000],[1503900544000,833984000],[1503966844000,540546000],[1504060445000,284419000],[1504112643000,232714000],[1504198746000,459404000],[1504285144000,1136410000],[1504371544000,1629240000],[1504457945000,774971000],[1504544645000,759859000],[1504631045000,1048030000],[1504717143000,863188000],[1504803545000,603693000],[1504890246000,780233000],[1504976647000,646866000],[1505063046000,511437000],[1505149443000,471694000],[1505235845000,429934000],[1505322242000,520942000],[1505408643000,681729000],[1505495045000,1537580000],[1505581443000,702723000],[1505667843000,257714000],[1505754245000,388385000],[1505840344000,291348000],[1505926742000,191101000],[1506013142000,159679000],[1506099842000,231006000],[1506185942000,189939000],[1506272641000,89206500],[1506359042000,181648000],[1506445142000,189458000],[1506531842000,160290000],[1506617941000,249108000],[1506704341000,201472000],[1506791041000,130521000],[1506877142000,100510000],[1506963843000,96492200],[1507049942000,94412700],[1507136642000,68712100],[1507223041000,77734500],[1507309142000,61747500],[1507395842000,49715400],[1507481942000,76667900],[1507568641000,112808000],[1507655042000,149183000],[1507741141000,64844800],[1507827841000,197245000],[1507914241000,444949000],[1508000642000,283188000],[1508087042000,449509000],[1508173441000,221989000],[1508259841000,198992000],[1508345941000,244990000],[1508432342000,207126000],[1508519041000,142034000],[1508605441000,145786000],[1508691841000,100326000],[1508778241000,159723000],[1508864642000,216534000],[1508951041000,117436000],[1509037445000,86220200],[1509123842000,82840200],[1509209941000,69155800],[1509296641000,116360000],[1509383042000,144494000],[1509469441000,94561600],[1509555541000,105796000],[1509641941000,186289000],[1509728641000,148618000],[1509815041000,105904000],[1509901441000,78752400],[1509987842000,124592000],[1510074241000,232678000],[1510160641000,397960000],[1510246742000,322157000],[1510333441000,297326000],[1510419541000,295989000],[1510505941000,342542000],[1510592341000,284087000],[1510679041000,163867000],[1510765142000,213517000],[1510851542000,168600000],[1510937942000,550036000],[1511024642000,187563000],[1511110741000,200904000],[1511197141000,228193000],[1511283542000,240656000],[1511369942000,158692000],[1511456642000,292010000],[1511542742000,286210000],[1511629442000,400330000],[1511715542000,423856000],[1511801942000,441887000],[1511888641000,349339000],[1511974741000,705730000],[1512061141000,575928000],[1512147841000,479278000],[1512233941000,553032000],[1512320342000,278163000],[1512406742000,350375000],[1512493142000,356645000],[1512579541000,446515000],[1512666242000,621259000],[1512752342000,1194630000],[1512925441000,1202530000],[1513011842000,1698010000],[1513098242000,7673500000],[1513184642000,4081700000],[1513271042000,2395190000],[1513357443000,2769010000],[1513530242000,1765900000],[1513616642000,1247380000],[1513703041000,2568870000],[1513789441000,2125610000],[1513875842000,1580280000],[1513962242000,2457510000],[1514048644000,1850940000],[1514135042000,1134710000],[1514221441000,879264000],[1514307841000,820009000],[1514394241000,743047000],[1514480641000,1631910000],[1514567041000,2313560000],[1514653441000,898617000],[1514739841000,822912000],[1514826242000,651902000],[1514912641000,1060430000],[1514999041000,1469400000],[1515085441000,5062820000],[1515171542000,1893800000],[1515257941000,2351420000],[1515344641000,1135350000],[1515431097000,1197140098.05919],[1515517497000,1069070970.0785843],[1515603897000,1047190000],[1515690298000,1134907551.8155243],[1515776698000,829208448.1805499],[1515863097000,869577367.6886634],[1515949497000,1101092429.6807933],[1516035898000,701128968.336793],[1516122298000,1079831936.5195606],[1516208697000,1451819387.7913744],[1516295098000,1290058676.7569242],[1516381498000,718919160.712341],[1516467898000,592591037.2957419],[1516554297000,526283523.45088995],[1516640698000,421587000],[1516727098000,592778397.8793269],[1516813498000,362503584.1324279],[1516899897000,413818872.2319426],[1516986298000,445288464.9371303],[1517072698000,365487152.61192554],[1517159098000,381426310.25785714],[1517245498000,342614000],[1517331898000,316761000],[1517418297000,482355000],[1517504699000,373680000],[1517591098000,921204000],[1517677498000,487873000],[1517763898000,1119791755.0596845],[1517850297000,752228000],[1517936698000,1143760000],[1518023097000,947162000],[1518109498000,990180007.9449742],[1518195898000,697638348.3087099],[1518282298000,639145740.0981076],[1518368698000,571670731.8953614],[1518455098000,522171894.08867913],[1518541498000,532411111.88922095],[1518627899000,2143348050.5222523],[1518714298000,2139199790.4875832],[1518800699000,1494775555.541095],[1518887098000,1004162942.8118684],[1518973498000,966663501.0657971],[1519059898000,942288452.9577008],[1519146298000,1604142514.8543823],[1519232697000,1364473088.6550589],[1519319098000,1039135308.9557635],[1519405497000,1105369584.2786648],[1519491898000,948928397.9986346],[1519578298000,921890146.1809577],[1519664698000,1432544682.7192788],[1519751098000,950205965.0535316],[1519837497000,812423693.9670458],[1519923899000,720951285.3789333],[1520010298000,651137318.4314287],[1520096701000,731089276.0079204],[1520183101000,577310666.6789974],[1520269500000,637724586.2255672],[1520355898000,644528802.5891653],[1520442299000,673859936.9735699],[1520528699000,745103631.2587496],[1520615098000,851155195.7060922],[1520701498000,760034199.6261896],[1520787898000,702448351.647828],[1520874298000,620165736.5497489],[1520960699000,536706751.07011557],[1521047099000,425758197.938428],[1521133499000,630138612.1494454],[1521219897000,461487750.4052657],[1521306298000,403468374.8959198],[1521355707000,450537077.63729]]}');
    if (undefined != data3 && null != data3) {
        if (data3.price_usd.length >= 1) {
            $("#cointrend").css("display", "block")
        }
    }
    callback.call(that, data3)
    // $.ajax({
    //     url: apiDomain + "/coinhisdata/" + slug + "/" + timeParams,
    //     type: "GET",
    //     dataType: "json",
    //     error: function() {
    //         that.hideLoading();
    //         that.showNoData()
    //     },
    //     success: function(data) {
    //         if (undefined != data && null != data) {
    //             if (data.price_usd.length >= 1) {
    //                 $("#cointrend").css("display", "block")
    //             }
    //         }
    //         callback.call(that, data)
    //     }
    // })
};
CurrencyDetailGraph.prototype.initCharts = function(seriesData) {
    var that = this;
    Highcharts.setOptions({
        global: {
            useUTC: false
        },
        lang: {
            downloadJPEG: "下载jpg",
            downloadPDF: "下载pdf",
            downloadPNG: "下载png",
            downloadSVG: "下载svg",
            loading: "",
            months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            printChart: "打印图表",
            shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            rangeSelectorFrom: "从",
            rangeSelectorTo: "到",
            rangeSelectorZoom: "缩放",
            resetZoom: "恢复初始缩放等级",
            resetZoomTitle: " 1:1缩放等级",
            shortWeekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            numericSymbols: ["千", "百万", "十亿"],
            thousandsSep: ","
        }
    });
    var titleName = $("#coinname").val();
    $("#" + that.graphId).highcharts("StockChart", {
        chart: {
            type: "line",
            zoomType: is_mobile() ? "null": "x",
            height: 520,
            ignoreHiddenSeries: true
        },
        tooltip: {
            shared: true,
            hideDelay: 50,
            xDateFormat: "%A, %b %d %Y, %H:%M:%S"
        },
        legend: {
            enabled: true,
            align: "center",
            backgroundColor: "#FFFFFF",
            borderColor: "black",
            borderWidth: 0,
            layout: "horizontal",
            verticalAlign: "bottom",
            y: 0,
            shadow: false,
            floating: false
        },
        navigator: {
            adaptToUpdatedData: false
        },
        scrollbar: {
            liveRedraw: false
        },
        subtitle: {
            text: ""
        },
        rangeSelector: {
            allButtonsEnabled: true,
            buttons: [{
                type: "day",
                count: 1,
                text: "天"
            },
            {
                type: "week",
                count: 1,
                text: "周"
            },
            {
                type: "month",
                count: 1,
                text: "1月"
            },
            {
                type: "month",
                count: 3,
                text: "3月"
            },
            {
                type: "year",
                count: 1,
                text: "1年"
            },
            {
                type: "ytd",
                count: 1,
                text: "今年"
            },
            {
                type: "all",
                text: "所有"
            }],
            selected: 6,
            inputEnabled: true,
            enabled: true
        },
        xAxis: [{
            events: {
                afterSetExtremes: function(e) {
                    that.afterSetExtremes(e)
                }
            },
            minRange: 24 * 3600 * 1000
        }],
        yAxis: [{
            labels: {
                formatter: function() {
                    return "$" + this.axis.defaultLabelFormatter.call(this)
                },
                align: "right",
                style: {
                    color: "#7cb5ec"
                }
            },
            title: {
                text: "市值",
                style: {
                    color: "#7cb5ec",
                    "font-weight": "bold"
                }
            },
            showEmpty: false,
            height: "80%",
            opposite: false,
            floor: 0
        },
        {
            labels: {
                formatter: label_format_fiat,
                style: {
                    color: "#009933",
                },
                align: "left",
                x: 15
            },
            title: {
                text: "价格 (美元)",
                style: {
                    color: "#009933",
                    "font-weight": "bold"
                }
            },
            showEmpty: false,
            height: "80%",
            opposite: true,
            floor: 0
        },
        {
            labels: {
                formatter: label_format_crypto,
                style: {
                    color: "#f7931a",
                },
                align: "left",
                x: 15
            },
            title: {
                text: "价格 (BTC)",
                style: {
                    color: "#f7931a",
                    "font-weight": "bold"
                }
            },
            showEmpty: false,
            height: "80%",
            opposite: true,
            floor: 0
        },
        {
            labels: {
                align: "right",
                style: {
                    color: "#777",
                }
            },
            title: {
                text: "24h 成交量",
                style: {
                    color: "#777",
                    "font-weight": "bold"
                }
            },
            showEmpty: false,
            top: "80%",
            height: "20%",
            offset: 2,
            lineWidth: 1,
            opposite: false
        }],
        series: [{
            name: "市值",
            color: "#7cb5ec",
            tooltip: {
                pointFormatter: tooltip_format_market_cap
            },
            data: seriesData["market_cap_by_available_supply"],
            visible: series_is_visible(this.chartName, 0, true),
            dataGrouping: {
                enabled: false
            }
        },
        {
            name: "价格 (美元)",
            yAxis: 1,
            color: "#009933",
            tooltip: {
                pointFormatter: tooltip_format_fiat
            },
            data: seriesData["price_usd"],
            visible: series_is_visible(this.chartName, 1, (!is_altcoin(this.slug) || !is_mobile())),
            dataGrouping: {
                enabled: false
            }
        },
        {
            name: "价格 (BTC)",
            color: "#f7931a",
            yAxis: 2,
            tooltip: {
                pointFormatter: tooltip_format_crypto
            },
            data: seriesData["price_btc"],
            visible: series_is_visible(this.chartName, 2, is_altcoin(this.slug)),
            dataGrouping: {
                enabled: false
            }
        },
        {
            type: "column",
            name: "24h 成交量",
            color: "#777",
            yAxis: 3,
            tooltip: {
                pointFormatter: tooltip_format_market_cap
            },
            data: seriesData["vol_usd"],
            visible: series_is_visible(this.chartName, 3, true),
            dataGrouping: {
                approximation: "average",
                enabled: false
            }
        }],
        plotOptions: {
            series: {
                events: {
                    legendItemClick: function(event) {
                        var index = event.target.index;
                        save_preferences(that.chartName, index, this.chart)
                    }
                }
            }
        },
    });
    that.hideLoading()
};
$(document).ready(function() {
    $(function() {
        var hash = window.location.hash;
        var currencyDetailGraph = new CurrencyDetailGraph("highcharts-graph", "highcharts-loading", "highcharts-nodata");
        currencyDetailGraph.init();
        $(".tabTit2 .tit a").click(function() {
            var box = $(this).closest(".box").find(".tabBody");
            var index = $(this).closest(".tit").index();
            if (box.eq(index).css("display") !== "block") {
                $(this).closest(".tabTit2").find(".tit").removeClass("active");
                $(this).closest(".tit").addClass("active");
                box.css("display", "none");
                box.eq(index).fadeIn("100")
            }
            if (this.hash == "#trendgraph" && !currencyDetailGraph.chartsLoaded()) {
                currencyDetailGraph.init()
            }
        });
        if (hash != "#trendgraph" && hash.length > 0) {
            $('.tabTit2 .tit a[href="' + hash + '"]').trigger("click")
        }
    })
});