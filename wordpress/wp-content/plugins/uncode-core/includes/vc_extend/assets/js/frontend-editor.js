window.vc || (window.vc = {}), (() => {
    function l(e) {
        return "\\" + n[e]
    }
    vc.templateOptions = {
        default: {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        },
        custom: {
            evaluate: /<#([\s\S]+?)#>/g,
            interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
            escape: /\{\{([^\}]+?)\}\}(?!\})/g
        }
    };
    var a = /(.)^/,
        n = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        i = /\\|'|\r|\n|\u2028|\u2029/g;
    vc.template = function(u, e) {
        e = _.defaults({}, e, vc.templateOptions.default);
        var n, t = RegExp([(e.escape || a).source, (e.interpolate || a).source, (e.evaluate || a).source].join("|") + "|$", "g"),
            c = 0,
            o = "__p+='";
        u.replace(t, function(e, n, t, r, a) {
            return o += u.slice(c, a).replace(i, l), c = a + e.length, n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : t ? o += "'+\n((__t=(" + t + "))==null?'':__t)+\n'" : r && (o += "';\n" + r + "\n__p+='"), e
        }), o += "';\n", o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + (o = e.variable ? o : "with(obj||{}){\n" + o + "}\n") + "return __p;\n";
        try {
            n = new Function(e.variable || "obj", "_", o)
        } catch (e) {
            throw e.source = o, e
        }

        function r(e) {
            return n.call(this, e, _)
        }
        t = e.variable || "obj";
        return r.source = "function(" + t + "){\n" + o + "}", r
    }
})();
window.vc || (window.vc = {}), (() => {
    var r = vc.events = {};
    _.extend(r, Backbone.Events), r.triggerShortcodeEvents = function(r, t) {
        var e = t.get("shortcode");
        this.trigger("shortcodes", t, r), this.trigger("shortcodes:" + e, t, r), this.trigger("shortcodes:" + r, t), this.trigger("shortcodes:" + e + ":" + r, t), this.trigger("shortcodes:" + e + ":" + r + ":parent:" + t.get("parent_id"), t), this.triggerParamsEvents(r, t)
    }, r.triggerParamsEvents = function(t, e) {
        var a = e.get("shortcode"),
            s = _.extend({}, e.get("params")),
            r = vc.map[a];
        _.isArray(r.params) && _.each(r.params, function(r) {
            this.trigger("shortcodes:" + t + ":param", e, s[r.param_name], r), this.trigger("shortcodes:" + a + ":" + t + ":param", e, s[r.param_name], r), this.trigger("shortcodes:" + t + ":param:type:" + r.type, e, s[r.param_name], r), this.trigger("shortcodes:" + a + ":" + t + ":param:type:" + r.type, e, s[r.param_name], r), this.trigger("shortcodes:" + t + ":param:name:" + r.param_name, e, s[r.param_name], r), this.trigger("shortcodes:" + a + ":" + t + ":param:name:" + r.param_name, e, s[r.param_name], r)
        }, this)
    }
})();
(e => {
    e.vc || (e.vc = {}), e.vc.utils = {
        fixUnclosedTags: function(e) {
            return e.replace(/<\/([^>]+)$/g, "&#60;/$1").replace(/<([^>]+)?$/g, "&#60;$1")
        },
        fallbackCopyTextToClipboard: function(e) {
            var t = document.createElement("textarea");
            t.value = e, t.style.top = "0", t.style.left = "0", t.style.position = "fixed", document.body.appendChild(t), t.focus(), t.select();
            try {
                document.execCommand("copy")
            } catch (e) {
                console.error("Unable to copy", e)
            }
        },
        copyTextToClipboard: function(e) {
            navigator.clipboard ? navigator.clipboard.writeText(e) : this.fallbackCopyTextToClipboard.call(this, e)
        },
        slugify: function(e) {
            return (e = e || "").toString().toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "")
        },
        stripHtmlTags: function(e) {
            return e.replace(/(<([^>]+)>)/gi, "")
        }
    }
})(window);
(s => {
    var o, t, a = function(t, o) {
        var i = this;
        this.options = o, this.$element = s(t), this.$dropdownContainer = this.$element.find(this.options.dropdownContainerSelector), this.$dropdown = this.$dropdownContainer.find(this.options.dropdownSelector), this.options.delayInit ? (i.$element.addClass(this.options.initializingClass), setTimeout(function() {
            i.options.autoRefresh || i.refresh(), i.moveTabs(), i.$element.removeClass(i.options.initializingClass)
        }, i.options.delayInitTime)) : (this.options.autoRefresh || this.refresh(), this.moveTabs()), s(window).on("resize", s.proxy(this.moveTabs, this)), this.$dropdownContainer.on("click.vc.tabsLine", s.proxy(this.checkDropdownContainerActive, this))
    };
    a.DEFAULTS = {
        initializingClass: "vc_initializing",
        delayInit: !1,
        delayInitTime: 1e3,
        activeClass: "vc_active",
        visibleClass: "vc_visible",
        dropdownContainerSelector: '[data-vc-ui-element="panel-tabs-line-toggle"]',
        dropdownSelector: '[data-vc-ui-element="panel-tabs-line-dropdown"]',
        tabSelector: '>li:not([data-vc-ui-element="panel-tabs-line-toggle"])',
        dropdownTabSelector: "li",
        freeSpaceOffset: 5,
        autoRefresh: !1,
        showDevInfo: !1
    }, a.prototype.refresh = function() {
        var t, o = this;
        return o.tabs = [], o.dropdownTabs = [], o.$element.find(o.options.tabSelector).each(function() {
            o.tabs.push({
                $tab: s(this),
                width: s(this).outerWidth()
            })
        }), o.$dropdown.find(o.options.dropdownTabSelector).each(function() {
            var t = s(this).clone().css({
                visibility: "hidden",
                position: "fixed"
            });
            t.appendTo(o.$element), o.dropdownTabs.push({
                $tab: s(this),
                width: t.outerWidth()
            }), t.remove(), s(this).on("click", o.options.onTabClick)
        }), "function" == typeof this.options.onTabClick && (o.tabs.map(t = function(t) {
            void 0 === t.$tab.data("tabClickSet") && (t.$tab.on("click", s.proxy(o.options.onTabClick, t.$tab)), t.$tab.data("tabClickSet", !0))
        }), o.dropdownTabs.map(t)), this
    }, a.prototype.moveLastToDropdown = function() {
        var t;
        return this.tabs.length && ((t = this.tabs.pop()).$tab.prependTo(this.$dropdown), this.dropdownTabs.unshift(t)), this.checkDropdownContainer(), this
    }, a.prototype.moveFirstToContainer = function() {
        var t;
        return this.dropdownTabs.length && ((t = this.dropdownTabs.shift()).$tab.appendTo(this.$element), this.tabs.push(t)), this.checkDropdownContainer(), this
    }, a.prototype.getTabsWidth = function() {
        var o = 0;
        return this.tabs.forEach(function(t) {
            o += t.width
        }), o
    }, a.prototype.isDropdownContainerVisible = function() {
        return this.$dropdownContainer.hasClass(this.options.visibleClass)
    }, a.prototype.getFreeSpace = function() {
        var t = this.$element.width() - this.getTabsWidth() - this.options.freeSpaceOffset;
        return this.isDropdownContainerVisible() && (t -= this.$dropdownContainer.outerWidth(), 1 === this.dropdownTabs.length) && 0 <= t - this.dropdownTabs[0].width + this.$dropdownContainer.outerWidth() && (t += this.$dropdownContainer.outerWidth()), t
    }, a.prototype.moveTabsToDropdown = function() {
        for (var t = this.tabs.length - 1; 0 <= t; t--) {
            if (!(this.getFreeSpace() < 0)) return this;
            this.moveLastToDropdown()
        }
        return this
    }, a.prototype.moveDropdownToTabs = function() {
        for (var t = this.dropdownTabs.length, o = 0; o < t; o++) {
            if (!(0 <= this.getFreeSpace() - this.dropdownTabs[0].width)) return this;
            this.moveFirstToContainer()
        }
        return this
    }, a.prototype.showDropdownContainer = function() {
        return this.$dropdownContainer.addClass(this.options.visibleClass), this
    }, a.prototype.hideDropdownContainer = function() {
        return this.$dropdownContainer.removeClass(this.options.visibleClass), this
    }, a.prototype.activateDropdownContainer = function() {
        return this.$dropdownContainer.addClass(this.options.activeClass), this
    }, a.prototype.deactivateDropdownContainer = function() {
        return this.$dropdownContainer.removeClass(this.options.activeClass), this
    }, a.prototype.checkDropdownContainerActive = function() {
        return this.$dropdown.find("." + this.options.activeClass + ":first").length ? this.activateDropdownContainer() : this.deactivateDropdownContainer(), this
    }, a.prototype.checkDropdownContainer = function() {
        return this.dropdownTabs.length ? this.showDropdownContainer() : this.hideDropdownContainer(), this.checkDropdownContainerActive(), this
    }, a.prototype.moveTabs = function() {
        return this.$element.closest(".vc_ui-panel-window").hasClass(this.options.activeClass) && (this.options.autoRefresh && this.refresh(), this.checkDropdownContainer(), this.moveTabsToDropdown(), this.moveDropdownToTabs(), this.options.showDevInfo) && this.showDevInfo(), this
    }, a.prototype.showDevInfo = function() {
        var t = s("#vc-ui-tabs-line-dev-info");
        t.length && (this.$devBlock = t), void 0 === this.$devBlock && (this.$devBlock = s('<div id="vc-ui-tabs-line-dev-info" />').css({
            position: "fixed",
            right: "40px",
            top: "40px",
            padding: "7px 12px",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            background: "rgba(0, 0, 0, 0.7)",
            color: "#0a0",
            "border-radius": "5px",
            "font-family": "tahoma",
            "font-size": "12px",
            "z-index": 1100
        }), this.$devBlock.appendTo("body")), void 0 === this.$devInfo && (this.$devInfo = s("<div />").css({
            "margin-bottom": "7px",
            "padding-bottom": "7px",
            "border-bottom": "1px dashed rgba(0, 200, 0, .35)"
        }), this.$devInfo.appendTo(this.$devBlock)), this.$devInfo.empty(), this.$devInfo.append(s("<div />").text("Tabs count: " + this.tabs.length)), this.$devInfo.append(s("<div />").text("Dropdown count: " + this.dropdownTabs.length)), this.$devInfo.append(s("<div />").text("El width: " + this.$element.width())), this.$devInfo.append(s("<div />").text("Tabs width: " + this.getTabsWidth())), this.$devInfo.append(s("<div />").text("Tabs width with dots: " + (this.getTabsWidth() + this.$dropdownContainer.outerWidth()))), this.$devInfo.append(s("<div />").text("Free space: " + this.getFreeSpace())), this.tabs.length && this.$devInfo.append(s("<div />").text("Last tab width: " + this.tabs[this.tabs.length - 1].width)), this.dropdownTabs.length && this.$devInfo.append(s("<div />").text("First dropdown tab width: " + this.dropdownTabs[0].width))
    }, t = s.fn.vcTabsLine, s.fn.vcTabsLine = o = function(e) {
        return this.each(function() {
            var t = s(this),
                o = t.data("vcUiTabsLine"),
                i = t.data("vc.tabsLine"),
                o = s.extend(!0, {}, a.DEFAULTS, t.data(), o, "object" == typeof e && e),
                n = "string" == typeof e ? e : o.action;
            i || t.data("vc.tabsLine", i = new a(this, o)), n && i[n]()
        })
    }, s.fn.vcTabsLine.Constructor = a, s.fn.vcTabsLine.noConflict = function() {
        return s.fn.vcTabsLine = t, this
    }, s(window).on("load", function() {
        s("[data-vc-ui-tabs-line]").each(function() {
            var t = s(this);
            o.call(t, t.data())
        })
    })
})(window.jQuery);
window.Backbone.View.vcExtendUI = function(t) {
    var e = this.extend(t);
    return e.prototype._vcUIEventsHooks || (e.prototype._vcUIEventsHooks = []), t.uiEvents && e.prototype._vcUIEventsHooks.push(t.uiEvents), e
}, window.vc.View = Backbone.View.extend({
    delegateEvents: function() {
        vc.View.__super__.delegateEvents.call(this), this._vcUIEventsHooks && this._vcUIEventsHooks.length && _.each(this._vcUIEventsHooks, function(t) {
            _.isObject(t) && _.each(t, function(t, e) {
                _.isString(t) && _.each(t.split(/\s+/), function(t) {
                    this.on(e, this[t], this)
                }, this)
            }, this)
        }, this)
    }
});
window._.isUndefined(window.vc) && (window.vc = {}), ((r, c, a) => {
    window.vc_toTitleCase = function(e) {
        return e.replace(/\w\S*/g, function(e) {
            return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
        })
    }, window.vc_convert_column_size = function(e) {
        var n = "vc_col-sm-",
            e = e ? e.split("/") : [1, 1],
            t = c.range(1, 13),
            r = !c.isUndefined(e[0]) && 0 <= c.indexOf(t, parseInt(e[0], 10)) && parseInt(e[0], 10),
            t = !c.isUndefined(e[1]) && 0 <= c.indexOf(t, parseInt(e[1], 10)) && parseInt(e[1], 10);
        return !1 !== r && !1 !== t ? n + 12 * r / t : n + "12"
    }, window.vc_convert_column_span_size = function(e) {
        return "span12" === (e = e.replace(/^vc_/, "")) ? "1/1" : "span11" === e ? "11/12" : "span10" === e ? "5/6" : "span9" === e ? "3/4" : "span8" === e ? "2/3" : "span7" === e ? "7/12" : "span6" === e ? "1/2" : "span5" === e ? "5/12" : "span4" === e ? "1/3" : "span3" === e ? "1/4" : "span2" === e ? "1/6" : "span1" === e && "1/12"
    }, window.vc_get_column_mask = function(e) {
        var n, t, r, a = e.split("_"),
            e = a.length;
        for (n in r = 0, a) !isNaN(parseFloat(a[n])) && isFinite(a[n]) && (t = a[n].match(/(\d{1,2})(\d{1,2})/), r = c.reduce(t.slice(1), function(e, n) {
            return e + parseInt(n, 10)
        }, r));
        return e + "" + r
    }, window.VCS4 = function() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
    }, window.vc_guid = function() {
        return window.VCS4() + window.VCS4() + "-" + window.VCS4()
    }, window.vc_button_param_target_callback = function() {
        var n = this.$content.find("[name=target]").parents('[data-vc-ui-element="panel-shortcode-param"]:first'),
            e = a(".wpb-edit-form [name=href]"),
            t = c.debounce(function() {
                var e = a(this).val();
                0 < e.length && "http://" !== e && "https://" !== e ? n.show() : n.hide()
            }, 300);
        e.on("keyup", t).trigger("keyup")
    }, window.vc_cta_button_param_target_callback = function() {
        var n = this.$content.find("[name=target]").parents('[data-vc-ui-element="panel-shortcode-param"]:first'),
            e = a(".wpb-edit-form [name=href]"),
            t = c.debounce(function() {
                var e = a(this).val();
                0 < e.length && "http://" !== e && "https://" !== e ? n.show() : n.hide()
            }, 300);
        e.on("keyup", t).trigger("keyup")
    }, window.vc_grid_exclude_dependency_callback = function() {
        var e = a(".wpb_vc_param_value[name=exclude]", this.$content).data("vc-param-object");
        if (!e) return !1;
        var n = a('select.wpb_vc_param_value[name="post_type"]', this.$content),
            t = n.val();
        e.source_data = function(e) {
            return {
                query: {
                    query: t,
                    term: e.term
                }
            }
        }, e.source_data_val = t, n.on("change", function() {
            t = a(this).val(), e.source_data_val != t && (e.source_data = function(e) {
                return {
                    query: {
                        query: t,
                        term: e.term
                    }
                }
            }, e.$el.data("uiAutocomplete").destroy(), e.$sortable_wrapper.find(".vc_data").remove(), e.render(), e.source_data_val = t)
        })
    }, window.vcGridFilterExcludeCallBack = function() {
        var e = a(".wpb_vc_param_value[name=filter_source]", this.$content),
            n = e.val(),
            t = a(".wpb_vc_param_value[name=exclude_filter]", this.$content).data("vc-param-object");
        if (void 0 === t) return !1;
        e.on("change", function() {
            var e = a(this);
            n !== e.val() && t.clearValue(), t.source_data = function() {
                return {
                    vc_filter_by: e.val()
                }
            }
        }).trigger("change")
    }, window.vcGridTaxonomiesCallBack = function() {
        var n = a(".wpb_vc_param_value[name=post_type]", this.$content),
            t = n.val(),
            r = a(".wpb_vc_param_value[name=taxonomies]", this.$content).data("vc-param-object");
        if (void 0 === r) return !1;
        n.on("change", function() {
            var e = a(this);
            t !== e.val() && r.clearValue(), r.source_data = function() {
                return {
                    vc_filter_post_type: n.val()
                }
            }
        }).trigger("change")
    }, window.vcChartCustomColorDependency = function() {
        var e = a(".wpb_vc_param_value[name=style]", this.$content),
            n = this.$content;
        e.on("change", function() {
            var e = a(this).val();
            n.toggleClass("vc_chart-edit-form-custom-color", "custom" === e)
        }), e.trigger("change")
    }, window.vc_wpnop = function(e) {
        var n, t, r, a, c;
        return e = void 0 !== e ? e + "" : "", window.switchEditors && void 0 !== window.switchEditors.pre_wpautop ? (e = window.switchEditors.pre_wpautop(e)).replace(/<p>(<!--(?:.*)-->)<\/p>/g, "$1") : e ? (n = (t = "blockquote|ul|ol|li|dl|dt|dd|table|thead|tbody|tfoot|tr|th|td|h[1-6]|fieldset|figure") + "|div|p", t = t + "|pre", a = r = !1, c = [], -1 !== (e = -1 === e.indexOf("<script") && -1 === e.indexOf("<style") ? e : e.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, function(e) {
            return c.push(e), "<wp-preserve>"
        })).indexOf("<pre") && (r = !0, e = e.replace(/<pre[^>]*>[\s\S]+?<\/pre>/g, function(e) {
            return (e = (e = e.replace(/<br ?\/?>(\r\n|\n)?/g, "<wp-line-break>")).replace(/<\/?p( [^>]*)?>(\r\n|\n)?/g, "<wp-line-break>")).replace(/\r?\n/g, "<wp-line-break>")
        })), -1 !== e.indexOf("[caption") && (a = !0, e = e.replace(/\[caption[\s\S]+?\[\/caption\]/g, function(e) {
            return e.replace(/<br([^>]*)>/g, "<wp-temp-br$1>").replace(/[\r\n\t]+/, "")
        })), e = (e = (e = (e = (e = -1 !== (e = -1 !== (e = -1 !== (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(new RegExp("\\s*</(" + n + ")>\\s*", "g"), "</$1>\n")).replace(new RegExp("\\s*<((?:" + n + ")(?: [^>]*)?)>", "g"), "\n<$1>")).replace(/(<p [^>]+>.*?)<\/p>/g, "$1</p#>")).replace(/<div( [^>]*)?>\s*<p>/gi, "<div$1>\n\n")).replace(/\s*<p>/gi, "")).replace(/\s*<\/p>\s*/gi, "\n\n")).replace(/\n[\s\u00a0]+\n/g, "\n\n")).replace(/(\s*)<br ?\/?>\s*/gi, function(e, n) {
            return n && -1 !== n.indexOf("\n") ? "\n\n" : "\n"
        })).replace(/\s*<div/g, "\n<div")).replace(/<\/div>\s*/g, "</div>\n")).replace(/\s*\[caption([^\[]+)\[\/caption\]\s*/gi, "\n\n[caption$1[/caption]\n\n")).replace(/caption\]\n\n+\[caption/g, "caption]\n\n[caption")).replace(new RegExp("\\s*<((?:" + t + ")(?: [^>]*)?)\\s*>", "g"), "\n<$1>")).replace(new RegExp("\\s*</(" + t + ")>\\s*", "g"), "</$1>\n")).replace(/<((li|dt|dd)[^>]*)>/g, " \t<$1>")).indexOf("<option") ? (e = e.replace(/\s*<option/g, "\n<option")).replace(/\s*<\/select>/g, "\n</select>") : e).indexOf("<hr") ? e.replace(/\s*<hr( [^>]*)?>\s*/g, "\n\n<hr$1>\n\n") : e).indexOf("<object") ? e.replace(/<object[\s\S]+?<\/object>/g, function(e) {
            return e.replace(/[\r\n]+/g, "")
        }) : e).replace(/<\/p#>/g, "</p>\n")).replace(/\s*(<p [^>]+>[\s\S]*?<\/p>)/g, "\n$1")).replace(/^\s+/, "")).replace(/[\s\u00a0]+$/, ""), r && (e = e.replace(/<wp-line-break>/g, "\n")), a && (e = e.replace(/<wp-temp-br([^>]*)>/g, "<br$1>")), c.length ? e.replace(/<wp-preserve>/g, function() {
            return c.shift()
        }) : e) : ""
    }, window.vc_wpautop = function(e) {
        var n, t, r;
        return e = void 0 !== e ? e + "" : "", (e = window.switchEditors && void 0 !== window.switchEditors.wpautop ? window.switchEditors.wpautop(e) : (t = n = !1, r = "table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|form|map|area|blockquote|address|math|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary", -1 === (e = (e = -1 !== (e = e.replace(/\r\n|\r/g, "\n")).indexOf("<object") ? e.replace(/<object[\s\S]+?<\/object>/g, function(e) {
            return e.replace(/\n+/g, "")
        }) : e).replace(/<[^<>]+>/g, function(e) {
            return e.replace(/[\n\t ]+/g, " ")
        })).indexOf("<pre") && -1 === e.indexOf("<script") || (n = !0, e = e.replace(/<(pre|script)[^>]*>[\s\S]*?<\/\1>/g, function(e) {
            return e.replace(/\n/g, "<wp-line-break>")
        })), -1 !== (e = -1 !== e.indexOf("<figcaption") ? (e = e.replace(/\s*(<figcaption[^>]*>)/g, "$1")).replace(/<\/figcaption>\s*/g, "</figcaption>") : e).indexOf("[caption") && (t = !0, e = e.replace(/\[caption[\s\S]+?\[\/caption\]/g, function(e) {
            return (e = (e = e.replace(/<br([^>]*)>/g, "<wp-temp-br$1>")).replace(/<[^<>]+>/g, function(e) {
                return e.replace(/[\n\t ]+/, " ")
            })).replace(/\s*\n\s*/g, "<wp-temp-br />")
        })), e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e += "\n\n").replace(/<br \/>\s*<br \/>/gi, "\n\n")).replace(new RegExp("(<(?:" + r + ")(?: [^>]*)?>)", "gi"), "\n\n$1")).replace(new RegExp("(</(?:" + r + ")>)", "gi"), "$1\n\n")).replace(/<hr( [^>]*)?>/gi, "<hr$1>\n\n")).replace(/\s*<option/gi, "<option")).replace(/<\/option>\s*/gi, "</option>")).replace(/\n\s*\n+/g, "\n\n")).replace(/([\s\S]+?)\n\n/g, "<p>$1</p>\n")).replace(/<p>\s*?<\/p>/gi, "")).replace(new RegExp("<p>\\s*(</?(?:" + r + ")(?: [^>]*)?>)\\s*</p>", "gi"), "$1")).replace(/<p>(<li.+?)<\/p>/gi, "$1")).replace(/<p>\s*<blockquote([^>]*)>/gi, "<blockquote$1><p>")).replace(/<\/blockquote>\s*<\/p>/gi, "</p></blockquote>")).replace(new RegExp("<p>\\s*(</?(?:" + r + ")(?: [^>]*)?>)", "gi"), "$1")).replace(new RegExp("(</?(?:" + r + ")(?: [^>]*)?>)\\s*</p>", "gi"), "$1")).replace(/(<br[^>]*>)\s*\n/gi, "$1")).replace(/\s*\n/g, "<br />\n")).replace(new RegExp("(</?(?:" + r + ")[^>]*>)\\s*<br />", "gi"), "$1")).replace(/<br \/>(\s*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)>)/gi, "$1")).replace(/(?:<p>|<br ?\/?>)*\s*\[caption([^\[]+)\[\/caption\]\s*(?:<\/p>|<br ?\/?>)*/gi, "[caption$1[/caption]")).replace(/(<(?:div|th|td|form|fieldset|dd)[^>]*>)(.*?)<\/p>/g, function(e, n, t) {
            return t.match(/<p( [^>]*)?>/) ? e : n + "<p>" + t + "</p>"
        }), n && (e = e.replace(/<wp-line-break>/g, "\n")), t ? e.replace(/<wp-temp-br([^>]*)>/g, "<br$1>") : e)).replace(/<p>(<!--(?:.*)-->)<\/p>/g, "$1")
    }, window.vc_regexp_shortcode = c.memoize(function() {
        return RegExp("\\[(\\[?)([\\w|-]+\\b)(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)")
    }), window.vcAddShortcodeDefaultParams = function(e) {
        var n = e.get("params"),
            t = e.get("preset"),
            n = c.extend({}, r.getDefaults(e.get("shortcode")), n);
        t && window.vc_all_presets[t] && (n = window.vc_all_presets[t], void 0 !== r.frame_window) && window.vc_all_presets[t].css && r.frame_window.vc_iframe.setCustomShortcodeCss(window.vc_all_presets[t].css), e.set({
            params: n
        }, {
            silent: !0
        })
    }, window.vc_globalHashCode = function(e) {
        return (e = "string" != typeof e ? JSON.stringify(e) : e).length ? e.split("").reduce(function(e, n) {
            return (e = (e << 5) - e + n.charCodeAt(0)) & e
        }, 0) : 0
    }, r.memoizeWrapper = function(n, t) {
        var r = {};
        return function() {
            var e = t ? t.apply(this, arguments) : arguments[0];
            return c.hasOwnProperty.call(r, e) || (r[e] = n.apply(this, arguments)), c.isObject(r[e]) ? window.jQuery.fn.extend(!0, {}, r[e]) : r[e]
        }
    }, window.vcChartParamAfterAddCallback = function(e, n) {
        if ("new" !== n && "clone" !== n || e.find(".vc_control.column_toggle").click(), "new" === n) {
            for (var t, r = ["white", "black"], a = e.find("[name=values_color]"), c = a.find("option"), i = 0;;) {
                if (100 < i++) break;
                if (t = Math.floor(Math.random() * c.length), -1 === window.jQuery.inArray(c.eq(t).val(), r)) {
                    c.eq(t).prop("selected", !0), a.trigger("change");
                    break
                }
            }
            n = ["#5472d2", "#00c1cf", "#fe6c61", "#8d6dc4", "#4cadc9", "#cec2ab", "#50485b", "#75d69c", "#f7be68", "#5aa1e3", "#6dab3c", "#f4524d", "#f79468", "#b97ebb", "#ebebeb", "#f7f7f7", "#0088cc", "#58b9da", "#6ab165", "#ff9900", "#ff675b", "#555555"], t = Math.floor(Math.random() * n.length), e.find("[name=values_custom_color]").val(n[t]).trigger("change")
        }
    }, r.events.on("shortcodes:vc_row:add:param:name:parallax shortcodes:vc_row:update:param:name:parallax", function(e, n) {
        n && (n = e.get("params")) && n.css && (n.css = n.css.replace(/(background(\-position)?\s*\:\s*[\S]+(\s*[^\!\s]+)?)[\s*\!important]*/g, "$1"), e.set("params", n, {
            silent: !0
        }))
    }), r.events.on("shortcodes:vc_single_image:sync shortcodes:vc_single_image:add", function(e) {
        var n = e.get("params");
        n.link && !n.onclick && (n.onclick = "custom_link", e.save({
            params: n
        }))
    }), window.vcEscapeHtml = function(e) {
        var n = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };
        return null == e ? "" : e.replace(/[&<>"']/g, function(e) {
            return n[e]
        })
    }, window.vc_slugify = function(e) {
        return e.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-")
    }
})(window.vc, window._, window.jQuery), window.jQuery.expr.pseudos.containsi = function(e, n, t) {
    return 0 <= window.jQuery(e).text().toUpperCase().indexOf(t[3].toUpperCase())
};
((o, r) => {
    var e, a = [],
        d = wp.media,
        i = d.featuredImage.set,
        n = d.editor.send.attachment,
        l = i18nLocale,
        c = {};

    function t(r, l) {
        var e = r.models ? r.pluck("id") : r;
        o.ajax({
            dataType: "json",
            type: "POST",
            url: window.ajaxurl,
            data: {
                action: "vc_media_editor_add_image",
                filters: window.vc_selectedFilters,
                ids: e,
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        }).done(function(e) {
            var t, i, a;
            if ("function" == typeof l) {
                for (t = [], a = 0; a < e.data.ids.length; a++) i = (i = "function" == typeof i ? r.get(e.data.ids[a]) : r[e.data.ids[a]]) || d.model.Attachment.get(e.data.ids[a]), t.push(i);
                var n = (e => {
                    for (var t = [], i = 0; i < e.length; i++) e[i].get("url") || t.push(e[i].fetch());
                    return t
                })(t);
                o.when.apply(o, n).done(function() {
                    l(t)
                })
            }
        }).fail(function(e) {
            o(".media-modal-close").click(), a = [], window.vc && window.vc.active_panel && window.i18nLocale && window.i18nLocale.error_while_saving_image_filtered && window.vc.active_panel.showMessage(window.i18nLocale.error_while_saving_image_filtered, "error"), window.console && window.console.warn && window.console.warn("processImages failed", e)
        }).always(function() {
            o(".media-modal").removeClass("processing-media")
        })
    }

    function s(e) {
        var t, i, a = o(".media-frame:visible [data-vc-preview-image-filter=" + e + "]");
        a.length && (t = o(".media-frame:visible .attachment-info .thumbnail-image").eq(-1), i = t.find("img"), t.addClass("loading"), i.data("original-src") || i.data("original-src", i.attr("src")), a.val().length ? o.ajax({
            type: "POST",
            dataType: "json",
            url: window.ajaxurl,
            data: {
                action: "vc_media_editor_preview_image",
                filter: a.val(),
                attachment_id: e,
                preferred_size: window.getUserSetting("imgsize", "medium"),
                _vcnonce: window.vcAdminNonce
            }
        }).done(function(e) {
            e.success && e.data.src.length && i.attr("src", e.data.src)
        }).fail(function(e, t, i) {
            window.console.warn("Filter preview failed:", t, i)
        }).always(function() {
            t.removeClass("loading")
        }) : (i.attr("src", i.data("original-src")), t.removeClass("loading")))
    }
    e = r.extend(d.view.AttachmentCompat.prototype.render), d.view.AttachmentCompat.prototype.render = function() {
        var a = this,
            n = this.model.get("id");
        return e.call(this), r.defer(function() {
            var e, t = a.controller.$el.find(".attachment-info"),
                i = a.controller.$el.find("[data-vc-preview-image-filter]");
            t.length && i.length && (e = '<div class="vc-filter-wrapper"><label class="setting vc-image-filter-setting">', e = (e += '<span class="name">' + i.parent().find(".vc-filter-label").text() + "</span>") + i[0].outerHTML + "</label></div>", o(".vc-filter-wrapper").length || t.before(e), i.parents("tr").remove()), void 0 !== window.vc_selectedFilters && void 0 !== window.vc_selectedFilters[n] && (t = o(".media-frame:visible [data-vc-preview-image-filter=" + n + "]")).length && t.val(window.vc_selectedFilters[n]).trigger("change"), s(n)
        }), this
    }, d.editor.send.attachment = function(i, e) {
        a.push(e.id), t([e.id], function(e) {
            var t = e.slice(0).pop().attributes;
            n(i, t).done(function(e) {
                ! function e(t, i) {
                    a && a[0] !== i ? setTimeout(function() {
                        e(t, i)
                    }, 50) : (a.shift(), d.editor.insert(t))
                }(e, t.id)
            })
        })
    }, d.featuredImage.set = function(t) {
        -1 !== t ? o.ajax({
            type: "POST",
            url: window.ajaxurl,
            data: {
                action: "vc_media_editor_add_image",
                filters: window.vc_selectedFilters,
                ids: [t],
                _vcnonce: window.vcAdminNonce
            }
        }).done(function(e) {
            !0 === e.success && e.data.ids.length ? (e = e.data.ids.pop(), i(e)) : i(t)
        }).fail(function() {
            i(t)
        }) : i(t)
    }, d.controller.VcSingleImage = d.controller.FeaturedImage.extend({
        defaults: r.defaults({
            id: "vc_single-image",
            filterable: "uploaded",
            multiple: !1,
            toolbar: "vc_single-image",
            title: l.set_image,
            priority: 60,
            syncSelection: !1
        }, d.controller.Library.prototype.defaults),
        updateSelection: function() {
            var e, t = this.get("selection"),
                i = d.vc_editor.getData();
            void 0 !== i && "" !== i && -1 !== i && (e = r.map(i.toString().split(/,/), function(e) {
                e = d.model.Attachment.get(e);
                return e.get("url") && e.get("url").length || e.fetch(), e
            })), t.reset(e)
        }
    }), d.controller.VcGallery = d.controller.VcSingleImage.extend({
        defaults: r.defaults({
            id: "vc_gallery",
            title: l.add_images,
            toolbar: "main-insert",
            filterable: "uploaded",
            library: d.query({
                type: "image"
            }),
            multiple: "add",
            editable: !0,
            priority: 60,
            syncSelection: !1
        }, d.controller.Library.prototype.defaults)
    }), d.VcSingleImage = {
        getData: function() {
            return this.$hidden_ids.val()
        },
        set: function(e) {
            var t = vc.template(o("#vc_settings-image-block").html(), vc.templateOptions.custom);
            return this.$img_ul.html(t(e)), this.$clear_button.show(), this.$hidden_ids.val(e.id).trigger("change"), !1
        },
        frame: function(e) {
            return window.vc_selectedFilters = {}, this.element = e, this.$button = o(this.element), this.$block = this.$button.closest(".edit_form_line"), this.$hidden_ids = this.$block.find(".gallery_widget_attached_images_ids"), this.$img_ul = this.$block.find(".gallery_widget_attached_images_list"), this.$clear_button = this.$img_ul.next(), this._frame || (this._frame = d({
                state: "vc_single-image",
                states: [new d.controller.VcSingleImage]
            }), this._frame.on("toolbar:create:vc_single-image", function(e) {
                this.createSelectToolbar(e, {
                    text: l.set_image,
                    close: !1
                })
            }, this._frame), this._frame.state("vc_single-image").on("select", this.select)), this._frame
        },
        select: function() {
            var e = this.get("selection");
            vc.events.trigger("click:media_editor:add_image", e, "single")
        }
    }, d.view.MediaFrame.VcGallery = d.view.MediaFrame.Post.extend({
        createStates: function() {
            this.states.add([new d.controller.VcGallery])
        },
        bindHandlers: function() {
            d.view.MediaFrame.Select.prototype.bindHandlers.apply(this, arguments), this.on("toolbar:create:main-insert", this.createToolbar, this);
            r.each({
                content: {
                    embed: "embedContent",
                    "edit-selection": "editSelectionContent"
                },
                toolbar: {
                    "main-insert": "mainInsertToolbar"
                }
            }, function(e, i) {
                r.each(e, function(e, t) {
                    this.on(i + ":render:" + t, this[e], this)
                }, this)
            }, this)
        },
        mainInsertToolbar: function(e) {
            var i = this;
            this.selectionStatusToolbar(e), e.set("insert", {
                style: "primary",
                priority: 80,
                text: l.add_images,
                requires: {
                    selection: !0
                },
                click: function() {
                    var e = i.state(),
                        t = e.get("selection");
                    vc.events.trigger("click:media_editor:add_image", t, "gallery"), e.trigger("insert", t)
                }
            })
        }
    }), d.vc_editor = r.clone(d.editor), r.extend(d.vc_editor, {
        $vc_editor_element: null,
        getData: function() {
            return d.vc_editor.$vc_editor_element.closest(".edit_form_line").find(".gallery_widget_attached_images_ids").val()
        },
        insert: function(e) {
            var t = d.vc_editor.$vc_editor_element.closest(".edit_form_line"),
                i = t.find(".gallery_widget_attached_images_ids"),
                t = t.find(".gallery_widget_attached_images_list"),
                a = "",
                n = vc.template(o("#vc_settings-image-block").html(), vc.templateOptions.custom);
            r.each(e, function(e) {
                a += n(e)
            }), i.val(r.map(e, function(e) {
                return e.id
            }).join(",")).trigger("change"), t.html(a)
        },
        open: function(e) {
            var t;
            return e = this.id(e), t = (t = this.get(e)) || this.add(e), window.vc_selectedFilters = {}, window.setTimeout(function() {
                t.state().get("library").more()
            }, 50), t.open()
        },
        add: function(e, t) {
            var i = this.get(e);
            if (!i) {
                if (c[e]) return c[e];
                i = c[e] = new d.view.MediaFrame.VcGallery(r.defaults(t || {}, {
                    state: "vc_gallery",
                    title: l.add_images,
                    library: {
                        type: "image"
                    },
                    multiple: !0
                }))
            }
            return i
        },
        init: function() {
            o("body").off("click.vcGalleryWidget").on("click.vcGalleryWidget", ".gallery_widget_add_images", function(e) {
                e.preventDefault();
                e = o(this);
                d.vc_editor.$vc_editor_element = o(this), "true" === e.attr("use-single") ? d.VcSingleImage.frame(this).open("vc_editor") : (e.blur(), d.vc_editor.open("wpbakery"))
            })
        }
    }), r.bindAll(d.vc_editor, "open"), o(document).ready(function() {
        d.vc_editor.init()
    }), vc.events.on("click:media_editor:add_image", function(i, a) {
        o(".media-modal").addClass("processing-media"), t(i, function(e) {
            var t, e = r.map(e, function(e) {
                return e.attributes
            });
            switch (i.reset(e), t = r.map(i.models, function(e) {
                    return e.attributes
                }), a = void 0 === a ? "" : a) {
                case "gallery":
                    d.vc_editor.insert(t);
                    break;
                case "single":
                    d.VcSingleImage.set(t[0])
            }
            o(".media-modal").removeClass("processing-media"), o(".media-modal-close").click()
        })
    }), o("body").on("change", "[data-vc-preview-image-filter]", function() {
        var e = o(this).data("vcPreviewImageFilter");
        void 0 === window.vc_selectedFilters && (window.vc_selectedFilters = {}), window.vc_selectedFilters[e] = o(this).val(), s(e)
    })
})(window.jQuery, window._);
_.isUndefined(window.vc) && (window.vc = {}), window.vc.filters = {
    templates: []
}, window.vc.addTemplateFilter = function(e) {
    _.isFunction(e) && this.filters.templates.push(e)
}, (d => {
    function a(e) {
        return encodeURIComponent(e).replace(/[!'()*]/g, escape)
    }

    function i(e, t) {
        this.el = e, this.$el = d(this.el), this.$el_wrap = "", this.$block = "", this.suggester = "", this.selected_items = [], this.options = _.isObject(t) ? t : {}, _.defaults(this.options, {
            css_class: "vc_suggester",
            limit: !1,
            source: {},
            predefined: [],
            locked: !1,
            select_callback: function() {},
            remove_callback: function() {},
            update_callback: function() {},
            check_locked_callback: function() {
                return !1
            }
        }), this.init()
    }
    window.init_textarea_html = function(t) {
        var n, e, a, i = d("#wp-link");
        i.parent().hasClass("wp-dialog") && i.wpdialog("destroy"), n = t.attr("id"), e = (i = t.closest(".edit_form_line")).find(".vc_textarea_html_content");
        try {
            _.isUndefined(tinyMCEPreInit.qtInit[n]) && (window.tinyMCEPreInit.qtInit[n] = _.extend({}, window.tinyMCEPreInit.qtInit[window.wpActiveEditor], {
                id: n
            })), window.tinyMCEPreInit && window.tinyMCEPreInit.mceInit[window.wpActiveEditor] && (a = !1, window.tinyMCEPreInit.mceInit[n] = _.extend({}, window.tinyMCEPreInit.mceInit[window.wpActiveEditor], {
                resize: "vertical",
                height: 200,
                id: n,
                setup: function(e) {
                    var t;
                    void 0 !== e.onLoadContent && e.onLoadContent.add(function() {
                        var e = setTimeout(function() {
                            1 === d("#" + n).size() && (d(".vc_edit-form-tab *:input[type!=hidden]:first").focus(), clearTimeout(e))
                        }, 100)
                    }), void 0 !== e.on ? (e.on("init", function() {
                        window.wpActiveEditor = n
                    }), window.vc_auto_save && (t = _.debounce(function() {
                        vc.edit_element_block_view.save(), a = !1
                    }, 500), e.on("keyup", function() {
                        a = !0, vc.saveInProcess = !0, t()
                    }), e.on("blur", function() {
                        a && !vc.saveInProcess && (vc.saveInProcess = !0, vc.edit_element_block_view.save(), a = !1)
                    }), e.on("ExecCommand", t), d("#wpb_tinymce_content").on("change", function() {
                        a = !0, vc.saveInProcess = !0, t()
                    }))) : e.onInit.add(function() {
                        window.wpActiveEditor = n
                    })
                }
            }), window.tinyMCEPreInit.mceInit[n].plugins = window.tinyMCEPreInit.mceInit[n].plugins.replace(/,?wpfullscreen/, ""), window.tinyMCEPreInit.mceInit[n].wp_autoresize_on = !1), vc.edit_element_block_view && vc.edit_element_block_view.currentModelParams ? t.val(vc_wpautop(vc.edit_element_block_view.currentModelParams[e.attr("name")] || "")) : t.val(e.val()), quicktags(window.tinyMCEPreInit.qtInit[n]), QTags._buttonsInit(), window.tinymce && (window.switchEditors && window.switchEditors.go(n, "tmce"), "4" === tinymce.majorVersion) && tinymce.execCommand("mceAddEditor", !0, n), window.wpActiveEditor = n
        } catch (e) {
            t.data("vcTinyMceDisabled", !0).appendTo(i), d("#wp-" + n + "-wrap").remove(), console && console.error && (console.error("VC: Tinymce error! Compatibility problem with other plugins."), console.error(e))
        }
    }, Color.prototype.toString = function() {
        if (this._alpha < 1) return this.toCSS("rgba", this._alpha).replace(/\s+/g, "");
        var e = parseInt(this._color, 10).toString(16);
        if (this.error) return "";
        if (e.length < 6)
            for (var t = 6 - e.length - 1; 0 <= t; t--) e = "0" + e;
        return "#" + e
    }, vc.loop_partial = function(e, t, n, a) {
        n = _.isObject(n) && !_.isUndefined(n[t]) ? n[t] : "";
        return vc.template(d("#_vcl-" + e).html(), vc.templateOptions.custom)({
            name: t,
            data: n,
            settings: a
        })
    }, vc.loop_field_not_hidden = function(e, t) {
        return !(_.isObject(t[e]) && _.isBoolean(t[e].hidden) && !0 === t[e].hidden)
    }, vc.is_locked = function(e) {
        return _.isObject(e) && _.isBoolean(e.locked) && !0 === e.locked
    }, i.prototype = {
        constructor: i,
        init: function() {
            _.bindAll(this, "buildSource", "itemSelected", "labelClick", "setFocus", "resize"), this.$el.wrap('<ul class="' + this.options.css_class + '"><li class="input"/></ul>'), this.$el_wrap = this.$el.parent(), this.$block = this.$el_wrap.closest("ul").append(d('<li class="clear"/>')), this.$el.on("focus", this.resize).on("blur", function() {
                d(this).parent().width(170), d(this).val("")
            }), this.$block.on("click", this.setFocus), this.suggester = this.$el.data("suggest"), this.$el.autocomplete({
                source: this.buildSource,
                select: this.itemSelected,
                minLength: 2,
                focus: function() {
                    return !1
                }
            }).data("ui-autocomplete")._renderItem = function(e, t) {
                return d('<li data-value="' + t.value + '">').append("<a>" + t.name + "</a>").appendTo(e)
            }, this.$el.autocomplete("widget").addClass("vc_ui-front"), _.isArray(this.options.predefined) && _.each(this.options.predefined, function(e) {
                this.create(e)
            }, this)
        },
        resize: function() {
            var e = this.$el_wrap.position(),
                t = this.$block.position();
            this.$el_wrap.width(parseFloat(this.$block.width()) - (parseFloat(e.left) - parseFloat(t.left) + 4))
        },
        setFocus: function(e) {
            e.preventDefault(), d(e.target).hasClass(this.options.css_class) && this.$el.trigger("focus")
        },
        itemSelected: function(e, t) {
            return this.$el.blur(), this.create(t.item), this.$el.trigger("focus"), !1
        },
        create: function(e) {
            var t, n = this.selected_items.push(e) - 1,
                a = !0 === this.options.check_locked_callback(this.$el, e) ? "" : ' <a class="remove">&times;</a>';
            _.isUndefined(this.selected_items[n].action) && (this.selected_items[n].action = "+"), t = "-" === this.selected_items[n].action ? " exclude" : " include", (t = d('<li class="vc_suggest-label' + t + '" data-index="' + n + '" data-value="' + e.value + '"><span class="label">' + e.name + "</span>" + a + "</li>")).insertBefore(this.$el_wrap), _.isEmpty(a) || t.on("click", this.labelClick), this.options.select_callback(t, this.selected_items)
        },
        labelClick: function(e) {
            e.preventDefault();
            var t = d(e.currentTarget),
                n = parseInt(t.data("index"), 10);
            if (d(e.target).is(".remove")) return this.selected_items.splice(n, 1), this.options.remove_callback(t, this.selected_items), t.remove(), !1;
            this.selected_items[n].action = "+" === this.selected_items[n].action ? "-" : "+", "+" === this.selected_items[n].action ? t.removeClass("exclude").addClass("include") : t.removeClass("include").addClass("exclude"), this.options.update_callback(t, this.selected_items)
        },
        buildSource: function(e, t) {
            this.ajax && (this.ajax.abort(), t([]), this.ajax = !1);
            var n = _.filter(_.map(this.selected_items, function(e) {
                return e ? e.value : void 0
            })).join(",");
            this.ajax = d.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: {
                    action: "wpb_get_loop_suggestion",
                    field: this.suggester,
                    exclude: n,
                    query: e.term,
                    _vcnonce: window.vcAdminNonce
                }
            }).done(function(e) {
                t(e)
            })
        }
    }, d.fn.suggester = function(n) {
        return this.each(function() {
            var e = d(this),
                t = e.data("suggester");
            t || e.data("suggester", t = new i(this, n)), "string" == typeof n && t[n]()
        })
    };
    var t = Backbone.View.extend({
            className: "loop_params_holder",
            events: {
                "click input, select": "save",
                "change input, select": "save",
                "change :checkbox[data-input]": "updateCheckbox"
            },
            query_options: {},
            return_array: {},
            controller: "",
            initialize: function() {
                _.bindAll(this, "save", "updateSuggestion", "suggestionLocked")
            },
            render: function(e) {
                var t = vc.template(d("#vcl-loop-frame").html(), _.extend({}, vc.templateOptions.custom, {
                    variable: "loop"
                }));
                return this.controller = e, this.$el.html(t(this.model)), this.controller.$el.append(this.$el), _.each(d("[data-suggest]"), function(e) {
                    var e = d(e),
                        t = window.decodeURIComponent(d("[data-suggest-prefill=" + e.data("suggest") + "]").val());
                    e.suggester({
                        predefined: d.parseJSON(t),
                        select_callback: this.updateSuggestion,
                        update_callback: this.updateSuggestion,
                        remove_callback: this.updateSuggestion,
                        check_locked_callback: this.suggestionLocked
                    })
                }, this), this.save(), this
            },
            show: function() {
                this.$el.slideDown()
            },
            save: function() {
                this.return_array = {}, _.each(this.model, function(e, t) {
                    e = this.getValue(t, e);
                    _.isString(e) && !_.isEmpty(e) && (this.return_array[t] = e)
                }, this), this.controller.setInputValue(this.return_array)
            },
            getValue: function(e) {
                return d("[name=" + e + "]", this.$el).val()
            },
            hide: function() {
                this.$el.slideUp()
            },
            toggle: function() {
                this.$el.is(":animated") || this.$el.slideToggle()
            },
            updateCheckbox: function(e) {
                var e = d(e.currentTarget).data("input"),
                    t = d("[data-name=" + e + "]", this.$el),
                    n = [];
                d("[data-input=" + e + "]:checked").each(function() {
                    n.push(d(this).val())
                }), t.val(n), this.save()
            },
            updateSuggestion: function(e, t) {
                e = e.closest("[data-block=suggestion]"), t = _.reduce(t, function(e, t) {
                    return _.isEmpty(t) ? "" : e + (_.isEmpty(e) ? "" : ",") + ("-" === t.action ? "-" : "") + t.value
                }, "").trim();
                e.find("[data-suggest-value]").val(t).trigger("change")
            },
            suggestionLocked: function(e, t) {
                t = t.value, e = e.closest("[data-block=suggestion]").find("[data-suggest-value]").data("suggest-value");
                return this.controller.settings && this.controller.settings[e] && _.isBoolean(this.controller.settings[e].locked) && 1 == this.controller.settings[e].locked && _.isString(this.controller.settings[e].value) && 0 <= _.indexOf(this.controller.settings[e].value.replace("-", "").split(/\,/), "" + t)
            }
        }),
        n = Backbone.View.extend({
            events: {
                "click .vc_loop-build": "showEditor"
            },
            initialize: function() {
                _.bindAll(this, "createEditor"), this.$input = d(".wpb_vc_param_value", this.$el), this.$button = this.$el.find(".vc_loop-build"), this.data = this.$input.val(), this.settings = d.parseJSON(window.decodeURIComponent(this.$button.data("settings")))
            },
            render: function() {
                return this
            },
            showEditor: function(e) {
                if (e.preventDefault(), _.isObject(this.loop_editor_view)) return this.loop_editor_view.toggle(), !1;
                d.ajax({
                    type: "POST",
                    dataType: "json",
                    url: window.ajaxurl,
                    data: {
                        action: "wpb_get_loop_settings",
                        value: this.data,
                        settings: this.settings,
                        post_id: vc_post_id,
                        _vcnonce: window.vcAdminNonce
                    }
                }).done(this.createEditor)
            },
            createEditor: function(e) {
                this.loop_editor_view = new t({
                    model: _.isEmpty(e) ? {} : e
                }), this.loop_editor_view.render(this).show()
            },
            setInputValue: function(e) {
                this.$input.val(_.map(e, function(e, t) {
                    return t + ":" + e
                }).join("|"))
            }
        }),
        o = Backbone.View.extend({
            events: {
                "click .vc_options-edit": "showEditor",
                "click .vc_close-button": "showEditor",
                "click input, select": "save",
                "change input, select": "save",
                "keyup input": "save"
            },
            data: {},
            fields: {},
            initialize: function() {
                this.$button = this.$el.find(".vc_options-edit"), this.$form = this.$el.find(".vc_options-fields"), this.$input = this.$el.find(".wpb_vc_param_value"), this.settings = this.$form.data("settings"), this.parseData(), this.render()
            },
            render: function() {
                var n = "";
                return _.each(this.settings, function(e) {
                    _.isUndefined(this.data[e.name]) ? _.isUndefined(e.value) || (e.value = e.value.toString().split(","), this.data[e.name] = e.value) : e.value = this.data[e.name], this.fields[e.name] = e;
                    var t = d("#vcl-options-field-" + e.type);
                    t.is("script") && (t = vc.template(t.html(), vc.templateOptions.custom), n += t(_.extend({}, {
                        name: "",
                        label: "",
                        value: [],
                        options: "",
                        description: ""
                    }, e)))
                }, this), this.$form.html(n + this.$form.html()), this
            },
            parseData: function() {
                _.each(this.$input.val().split("|"), function(e) {
                    var t;
                    e.match(/\:/) && (t = (e = e.split(":"))[0], this.data[t] = _.map(e[1].split(","), function(e) {
                        return window.decodeURIComponent(e)
                    }))
                }, this)
            },
            saveData: function() {
                var e = _.map(this.data, function(e, t) {
                    return t + ":" + _.map(e, function(e) {
                        return window.encodeURIComponent(e)
                    }).join(",")
                }).join("|");
                this.$input.val(e)
            },
            showEditor: function() {
                this.$form.slideToggle()
            },
            save: function(e) {
                var t, e = d(e.currentTarget);
                e.is(":checkbox") ? (t = [], this.$el.find("input[name=" + e.attr("name") + "]").each(function() {
                    this.checked && t.push(d(this).val())
                }), this.data[e.attr("name")] = t) : this.data[e.attr("name")] = [e.val()], this.saveData()
            }
        });

    function s(e) {
        this.el = e, this.$el = d(this.el), this.$data_field = this.$el.find(".wpb_vc_param_value"), this.$toolbar = this.$el.find(".vc_sorted-list-toolbar"), this.$current_control = this.$el.find(".vc_sorted-list-container"), _.defaults(this.options, {}), this.init()
    }
    s.prototype = {
        constructor: s,
        init: function() {
            _.bindAll(this, "controlEvent", "save"), this.$toolbar.on("change", "input", this.controlEvent);

            function e(e) {
                return window.decodeURIComponent(e)
            }
            var t, n = this.$data_field.val().split(",");
            for (t in n) {
                var a = n[t].split("|"),
                    i = !(!a.length || !a[0].length) && this.$toolbar.find("[data-element=" + decodeURIComponent(a[0]) + "]");
                !1 !== i && i.is("input") && (i.prop("checked", !0), this.createControl({
                    value: i.val(),
                    label: i.parent().text(),
                    sub: i.data("subcontrol"),
                    sub_value: _.map(a.slice(1), e)
                }))
            }
            this.$current_control.sortable({
                stop: this.save
            }).on("change", "select", this.save)
        },
		createControl: function (e) {
			// START UNCODE EDIT
			function buildTextInput(index, e) {
				var val = _.isString(a[index]) ? _.escape(a[index]) : '';
				val = val === '-' ? '' : val;
				return ' <input type="text" value="' + val + '" class="vc_sorted-list-text" placeholder="' + e[0][1] + '" />';
			}
            var n = "",
                a = _.isUndefined(e.sub_value) ? [] : e.sub_value;
			_.isArray(e.sub) && _.each(e.sub, function (e, t) {
				if (e[0][0] === 'text-post-element-option') {
					n += buildTextInput(t, e);
				} else {
					n += " <select>", _.each(e, function (e) {
						n += '<option value="' + e[0] + '"' + (_.isString(a[t]) && a[t] === e[0] ? ' selected="true"' : "") + ">" + e[1] + "</option>"
					}), n += "</select>"
				}
			}, this), this.$current_control.append('<li class="vc_control-' + e.value + '" data-name="' + e.value + '">' + e.label + n + "</li>")
			// END UNCODE EDIT
        },
        controlEvent: function(e) {
            e = d(e.currentTarget);
            e[0].checked ? this.createControl({
                value: e.val(),
                label: e.parent().text(),
                sub: e.data("subcontrol")
            }) : this.$current_control.find(".vc_control-" + e.val()).remove(), this.save()
        },
        save: function() {
            var e = _.map(this.$current_control.find("[data-name]"), function(e) {
				var t = encodeURIComponent(d(e).data("name"));
				// START UNCODE EDIT
                return d(e).find("select, .vc_sorted-list-text").each(function() {
					var e = d(this);
					if (e.is('select') && e.val() !== '') {
						t += '|' + encodeURIComponent(e.val());
					} else if (e.is('.vc_sorted-list-text')) {
						var textVal = e.val();
						textVal = textVal !== '' ? textVal : '-';
						t += '|' + encodeURIComponent(textVal);
					}
				}), t
				// END UNCODE EDIT
            }).join(",");
            this.$data_field.val(e)
        }
    }, d.fn.VcSortedList = function(n) {
        return this.each(function() {
            var e = d(this),
                t = e.data("vc_sorted_list");
            t || e.data("vc_sorted_list", t = new s(this)), "string" == typeof n && t[n]()
        })
    };
    var r = Backbone.View.extend({
            preview_el: ".vc_google_fonts_form_field-preview-container > span",
            font_family_dropdown_el: ".vc_google_fonts_form_field-font_family-container > select",
            font_style_dropdown_el: ".vc_google_fonts_form_field-font_style-container > select",
            font_style_dropdown_el_container: ".vc_google_fonts_form_field-font_style-container",
            status_el: ".vc_google_fonts_form_field-status-container > span",
            events: {
                "change .vc_google_fonts_form_field-font_family-container > select": "fontFamilyDropdownChange",
                "change .vc_google_fonts_form_field-font_style-container > select": "fontStyleDropdownChange"
            },
            initialize: function() {
                _.bindAll(this, "previewElementInactive", "previewElementActive", "previewElementLoading"), this.$preview_el = d(this.preview_el, this.$el), this.$font_family_dropdown_el = d(this.font_family_dropdown_el, this.$el), this.$font_style_dropdown_el = d(this.font_style_dropdown_el, this.$el), this.$font_style_dropdown_el_container = d(this.font_style_dropdown_el_container, this.$el), this.$status_el = d(this.status_el, this.$el), this.fontFamilyDropdownRender()
            },
            render: function() {
                return this
            },
            previewElementRender: function() {
                return this.$preview_el.css({
                    "font-family": this.font_family,
                    "font-style": this.font_style,
                    "font-weight": this.font_weight
                }), this
            },
            previewElementInactive: function() {
                this.$status_el.text(window.i18nLocale.gfonts_loading_google_font_failed || "Loading font failed.").css("color", "#FF0000")
            },
            previewElementActive: function() {
                this.$preview_el.text("Grumpy wizards make toxic brew for the evil Queen and Jack.").css("color", "inherit"), this.fontStyleDropdownRender()
            },
            previewElementLoading: function() {
                this.$preview_el.text(window.i18nLocale.gfonts_loading_google_font || "Loading Font...")
            },
            fontFamilyDropdownRender: function() {
                return this.fontFamilyDropdownChange(), this
            },
            fontFamilyDropdownChange: function() {
                this.$status_el.text("");
                var e = this.$font_family_dropdown_el.find(":selected");
                return this.font_family_format = e.val(), this.font_family = e.attr("data[font_family]"), this.font_types = e.attr("data[font_types]"), this.font_vendor = e.attr("data[font_vendor]"), this.font_url = e.attr("data[font_url]"), this.$font_style_dropdown_el_container.parent().hide(), this.font_family_format && 0 < this.font_family_format.length && (this.font_vendor ? WebFont.load({
                    custom: {
                        families: [this.font_family],
                        urls: [this.font_url]
                    },
                    inactive: this.previewElementInactive,
                    active: this.previewElementActive,
                    loading: this.previewElementLoading
                }) : WebFont.load({
                    google: {
                        families: [this.font_family_format]
                    },
                    inactive: this.previewElementInactive,
                    active: this.previewElementActive,
                    loading: this.previewElementLoading
                })), this
            },
            fontStyleDropdownRender: function() {
                var e, t = this.font_types.split(","),
                    n = "",
                    a = this.$font_family_dropdown_el.attr("default[font_style]");
                for (e in t) var i = t[e].split(":"),
                    o = "",
                    n = n + "<option " + (o = _.isString(a) && 0 < a.length && t[e] == a ? "selected" : o) + ' value="' + t[e] + '" data[font_weight]="' + i[1] + '" data[font_style]="' + i[2] + '" class="' + i[2] + "_" + i[1] + '" >' + i[0] + "</option>";
                return this.$font_style_dropdown_el.html(n), this.$font_style_dropdown_el_container.parent().show(), this.fontStyleDropdownChange(), this
            },
            fontStyleDropdownChange: function() {
                var e = this.$font_style_dropdown_el.find(":selected");
                return this.font_weight = e.attr("data[font_weight]"), this.font_style = e.attr("data[font_style]"), this.previewElementRender(), this
            }
        }),
        l = Backbone.View.extend({
            min_length: 2,
            delay: 500,
            auto_focus: !0,
            ajax_url: window.ajaxurl,
            source_data: function() {
                return {}
            },
            replace_values_on_select: !1,
            initialize: function(e) {
                _.bindAll(this, "sortableChange", "resize", "labelRemoveHook", "updateItems", "sortableCreate", "sortableUpdate", "source", "select", "labelRemoveClick", "createBox", "focus", "response", "change", "close", "open", "create", "search", "_renderItem", "_renderMenu", "_renderItemData", "_resizeMenu"), e = d.extend({
                    min_length: this.min_length,
                    delay: this.delay,
                    auto_focus: this.auto_focus,
                    replace_values_on_select: this.replace_values_on_select
                }, e), this.options = e, this.param_name = this.options.param_name, this.$el = this.options.$el, this.$el_wrap = this.$el.parent(), this.$sortable_wrapper = this.$el_wrap.parent(), this.$input_param = this.options.$param_input, this.selected_items = [], this.isMultiple = !1, this.render()
            },
            resize: function() {
                var e = this.$el_wrap.position(),
                    t = this.$block.position();
                this.$el.autocomplete("widget").width(parseFloat(this.$block.width()) - (parseFloat(e.left) - parseFloat(t.left) + 4) + 11)
            },
            enableMultiple: function() {
                this.isMultiple = !0, this.$el.show(), this.$el.trigger("focus")
            },
            enableSortable: function() {
                this.sortable = this.$sortable_wrapper.sortable({
                    items: ".vc_data",
                    axis: "y",
                    change: this.sortableChange,
                    create: this.sortableCreate,
                    update: this.sortableUpdate
                })
            },
            updateItems: function() {
                this.selected_items.length ? this.$input_param.val(this.getSelectedItems().join(", ")) : this.$input_param.val("")
            },
            sortableChange: function() {},
            itemsCreate: function() {
                var n = [];
                this.$block.find(".vc_data").each(function(e, t) {
                    n.push({
                        label: t.dataset.label,
                        value: t.dataset.value
                    })
                }), this.selected_items = n
            },
            sortableCreate: function() {},
            sortableUpdate: function() {
                var e = this.$sortable_wrapper.sortable("toArray", {
                        attribute: "data-index"
                    }),
                    t = [],
                    n = (_.each(e, function(e) {
                        t.push(this.selected_items[e])
                    }, this), 0);
                d("li.vc_data", this.$sortable_wrapper).each(function() {
                    d(this).attr("data-index", n++)
                }), this.selected_items = t, this.updateItems()
            },
            getWidget: function() {
                return this.$el.autocomplete("widget")
            },
            render: function() {
                var e;
                return this.$el.on("focus", this.resize), this.data = this.$el.autocomplete({
                    source: this.source,
                    minLength: this.options.min_length,
                    delay: this.options.delay,
                    autoFocus: this.options.auto_focus,
                    select: this.select,
                    focus: this.focus,
                    response: this.response,
                    change: this.change,
                    close: this.close,
                    open: this.open,
                    create: this.create,
                    search: this.search
                }), this.data.data("ui-autocomplete")._renderItem = this._renderItem, this.data.data("ui-autocomplete")._renderMenu = this._renderMenu, this.data.data("ui-autocomplete")._resizeMenu = this._resizeMenu, 0 < this.$input_param.val().length && (this.isMultiple ? this.$el.trigger("focus") : this.$el.hide(), d(".vc_autocomplete-label.vc_data", (e = this).$sortable_wrapper).each(function() {
                    e.labelRemoveHook(d(this))
                })), this.getWidget().addClass("vc_ui-front").addClass("vc_ui-auotocomplete"), this.$block = this.$el_wrap.closest("ul").append(d('<li class="clear"/>')), this.itemsCreate(), this
            },
            close: function() {
                this.selected && this.options.no_hide && (this.getWidget().show(), this.selected++, 2 < this.selected) && (this.selected = void 0)
            },
            open: function() {
                var e = this.getWidget().menu(),
                    t = e.position();
                e.css("left", t.left - 6), e.css("top", t.top + 2)
            },
            focus: function(e) {
                if (!this.options.replace_values_on_select) return e.preventDefault(), !1
            },
            create: function() {},
            change: function() {},
            response: function() {},
            search: function() {},
            select: function(e, t) {
                var n, a, i;
                return this.selected = 1, t.item && (this.options.unique_values && (n = this.getWidget().data("uiMenu").active, this.options.groups && (a = n.prev(), i = n.next(), a.hasClass("vc_autocomplete-group")) && !i.hasClass("vc_autocomplete-item") && a.remove(), n.remove(), d("li.ui-menu-item", this.getWidget()).length || (this.selected = void 0)), this.createBox(t.item), this.isMultiple ? this.$el.trigger("focus") : this.$el.hide()), !1
            },
            createBox: function(e) {
                var t = this.selected_items.push(e) - 1;
                this.updateItems(), (t = d('<li class="vc_autocomplete-label vc_data" data-index="' + t + '" data-value="' + e.value + '" data-label="' + e.label + '"><span class="vc_autocomplete-label"><a>' + e.label + '</a></span><a class="vc_autocomplete-remove">&times;</a></li>')).insertBefore(this.$el_wrap), this.labelRemoveHook(t)
            },
            labelRemoveHook: function(e) {
                this.$el.blur(), this.$el.val(""), e.on("click", this.labelRemoveClick)
            },
            labelRemoveClick: function(e) {
                e.preventDefault();
                var t = d(e.currentTarget);
                if (d(e.target).is(".vc_autocomplete-remove")) return this.selected_items.splice(t.index(), 1), t.remove(), this.updateItems(), this.$el.show(), !1
            },
            getSelectedItems: function() {
                var t;
                return !!this.selected_items.length && (t = [], _.each(this.selected_items, function(e) {
                    t.push(e.value)
                }), t)
            },
            _renderMenu: function(n, e) {
                var a = this,
                    i = null;
                this.options.groups && e.sort(function(e, t) {
                    return e.group > t.group
                }), d.each(e, function(e, t) {
                    a.options.groups && t.group != i && (i = t.group, n.append('<li class="ui-autocomplete-group vc_autocomplete-group" aria-label="' + i + '">' + i + "</li>")), a._renderItemData(n, t)
                })
            },
            _renderItem: function(e, t) {
                return d('<li data-value="' + t.value + '" class="vc_autocomplete-item">').append("<a>" + t.label + "</a>").appendTo(e)
            },
            _renderItemData: function(e, t) {
                return this._renderItem(e, t).data("ui-autocomplete-item", t)
            },
            _resizeMenu: function() {},
            clearValue: function() {
                this.selected_items = [], this.updateItems(), d(".vc_autocomplete-label.vc_data", this.$sortable_wrapper).remove()
            },
            source: function(e, t) {
                var n = this;
                this.options.values && 0 < this.options.values.length ? this.options.unique_values ? t(d.ui.autocomplete.filter(_.difference(this.options.values, this.selected_items), e.term)) : t(d.ui.autocomplete.filter(this.options.values, e.term)) : d.ajax({
                    type: "POST",
                    dataType: "json",
                    url: this.ajax_url,
                    data: d.extend({
                        action: "vc_get_autocomplete_suggestion",
                        shortcode: vc.active_panel.model.get("shortcode"),
                        param: this.param_name,
                        query: e.term,
                        _vcnonce: window.vcAdminNonce
                    }, this.source_data(e, t))
                }).done(function(e) {
                    n.options.unique_values ? t(_.filter(e, function(e) {
                        return !_.findWhere(n.selected_items, e)
                    })) : t(e)
                })
            }
        }),
        c = Backbone.View.extend({
            $content: {},
            initialize: function() {
                _.bindAll(this, "content"), this.$content = this.$el, this.model = vc.active_panel.model
            },
            setContent: function(e) {
                this.$content = e
            },
            content: function() {
                return this.$content
            },
            render: function() {
                var n = this;
                return d('[data-vc-ui-element="panel-shortcode-param"]', this.content()).each(function() {
                    var e = d(this),
                        t = e.data("param_settings");
                    vc.atts.init.call(n, t, e), e.data("vcInitParam", !0)
                }), this
            }
        }),
        p = Backbone.View.extend({
            options: {
                max_items: 0,
                sortable: !0,
                deletable: !0,
                collapsible: !0
            },
            items: 0,
            $ul: !1,
            initializer: {},
            mappedParams: {},
            adminLabelParams: [],
            groupParamName: "",
            events: {
                "click > .edit_form_line > .vc_param_group-list > .vc_param_group-add_content": "addNew"
            },
            initialize: function(e) {
                var t, n, a;
                this.$ul = this.$el.find("> .edit_form_line > .vc_param_group-list"), t = d("> .wpb_vc_row", this.$ul), this.initializer = new c({
                    el: this.$el
                }), this.model = vc.active_panel.model, n = this.$ul.data("settings"), this.mappedParams = {}, this.adminLabelParams = [], this.options = _.defaults({}, _.isObject(e.settings) ? e.settings : {}, n, this.options), this.groupParamName = this.options.param.param_name, _.isObject(this.options.param) && _.isArray(this.options.param.params) && _.each(this.options.param.params, function(e) {
                    var t = this.groupParamName + "_" + e.param_name;
                    this.mappedParams[t] = e, _.isObject(e) && !0 === e.admin_label && this.adminLabelParams.push(t)
                }, this), this.items = 0, a = this, t.length && t.each(function() {
                    t.data("vc-param-group-param", new u({
                        el: d(this),
                        parent: a
                    })), a.items++, a.afterAdd(d(this), "init")
                }), this.options.sortable && this.$ul.sortable({
                    handle: ".vc_control.column_move",
                    items: "> .wpb_vc_row:not(vc_param_group-add_content-wrapper)",
                    placeholder: "vc_placeholder",
                    stop: function() {
                        d(this).closest(".vc_edit-form-tab").trigger("change")
                    }
                })
            },
            addNew: function(e) {
                var t;
                e.preventDefault(), this.addAllowed() && (void 0 === this.options.param.callbacks || void 0 === this.options.param.callbacks.before_add || "function" != typeof(t = window[this.options.param.callbacks.before_add]) || t()) && ((t = d(JSON.parse(this.$ul.next(".vc_param_group-template").html()))).removeClass("vc_param_group-add_content-wrapper"), t.insertBefore(e.currentTarget), t.show(), this.initializer.setContent(t.find("> .wpb_element_wrapper")), this.initializer.render(), this.items++, t.data("vc-param-group-param", new u({
                    el: t,
                    parent: this
                })), this.afterAdd(t, "new"), vc.events.trigger("vc-param-group-add-new", e, t, this))
            },
            addAllowed: function() {
                return 0 < this.options.max_items && this.items + 1 <= this.options.max_items || this.options.max_items <= 0
            },
            afterAdd: function(e, t) {
                var n;
                this.addAllowed() || (this.$ul.find("> .wpb_vc_row > .vc_param_group-controls > .vc_row_edit_clone_delete > .vc_control.column_clone").hide(), this.$ul.find("> .vc_param_group-add_content").hide()), this.options.sortable || this.$ul.find("> .wpb_vc_row > .vc_param_group-controls > .vc_control.column_move").hide(), this.options.deletable || this.$ul.find("> .wpb_vc_row > .vc_param_group-controls > .vc_row_edit_clone_delete > .vc_control.column_delete").hide(), this.options.collapsible || this.$ul.find("> .wpb_vc_row > .vc_param_group-controls > .vc_row_edit_clone_delete > .vc_control.column_toggle").hide(), void 0 !== this.options.param.callbacks && void 0 !== this.options.param.callbacks.after_add && "function" == typeof(n = window[this.options.param.callbacks.after_add]) && n(e, t)
            },
            afterDelete: function() {
                var e;
                this.addAllowed() && (this.$ul.find("> .wpb_vc_row > .vc_param_group-controls > .vc_row_edit_clone_delete > .vc_control.column_clone").show(), this.$ul.find("> .vc_param_group-add_content").show()), void 0 !== this.options.param.callbacks && void 0 !== this.options.param.callbacks.after_delete && "function" == typeof(e = window[this.options.param.callbacks.after_delete]) && e()
            }
        }),
        u = Backbone.View.extend({
            dependentElements: !1,
            mappedParams: !1,
            groupParamName: "",
            adminLabelParams: [],
            events: {
                "click > .vc_controls > .vc_row_edit_clone_delete > .vc_control.column_toggle": "toggle",
                "click > .vc_controls > .vc_row_edit_clone_delete > .vc_control.column_delete": "deleteParam",
                "click > .vc_controls > .vc_row_edit_clone_delete > .vc_control.column_clone": "clone"
            },
            initialize: function(e) {
                this.options = e, this.$content = this.options.parent.$ul, this.model = vc.active_panel.model, this.mappedParams = this.options.parent.mappedParams, this.groupParamName = this.options.parent.groupParamName, this.adminLabelParams = this.options.parent.adminLabelParams, this.dependentElements = {}, _.bindAll(this, "hookDependent"), this.initializeDependency(), _.bindAll(this, "hookAdminLabel"), this.initializeAdminLabels()
            },
            initializeAdminLabels: function() {
                for (var t = this.hookAdminLabel, e = function() {
                        var e = d(this);
                        e.data("vc_admin_labels") || (e.data("vc_admin_labels", !0), e.on("keyup change", t), t({
                            currentTarget: this
                        }))
                    }, n = 0; n < this.adminLabelParams.length; n++) d("[name=" + this.adminLabelParams[n] + "].wpb_vc_param_value", this.$el).each(e)
            },
            hookAdminLabel: function(e) {
                for (var t = "", n = "", a = [], i = (s = d(e.currentTarget)).closest(".vc_param_group-wrapper"), e = s.closest(".vc_param").find(".vc_param-group-admin-labels"), o = 0; o < this.adminLabelParams.length; o++) {
                    var s, r = this.adminLabelParams[o],
                        l = (s = i.find("[name=" + r + "]")).closest('[data-vc-ui-element="panel-shortcode-param"]');
                    void 0 !== this.mappedParams[r] && (t = this.mappedParams[r].heading), n = s.is("select") ? s.find("option:selected").text() : !s.is("input:checkbox") || s[0].checked ? s.val() : "", r = {
                        type: l.data("param_type"),
                        param_name: l.data("param_name")
                    }, "" !== (n = _.isObject(vc.atts[r.type]) && _.isFunction(vc.atts[r.type].render) ? vc.atts[r.type].render.call(this, r, n) : n) && a.push("<label>" + _.escape(t) + "</label>: " + _.escape(n))
                }
                e.html(a.join(", ")).toggleClass("vc_hidden-label", !a.length)
            },
            initializeDependency: function() {
                var o = {};
                _.each(this.mappedParams, function(a, e) {
                    var t, i;
                    _.isObject(a) && _.isObject(a.dependency) && _.isString(a.dependency.element) && (t = d("[name=" + this.groupParamName + "_" + a.dependency.element + "].wpb_vc_param_value", this.$el), (i = d("[name=" + e + "].wpb_vc_param_value", this.$el)).length) && _.each(t, function(e) {
                        var e = d(e),
                            t = e.attr("name"),
                            n = a.dependency;
                        _.isArray(this.dependentElements[t]) || (this.dependentElements[t] = []), this.dependentElements[t].push(i), e.data("dependentSet") || (e.attr("data-dependent-set", "true"), e.on("keyup change", this.hookDependent)), o[t] || (o[t] = e), _.isString(n.callback) && window[n.callback].call(this)
                    }, this)
                }, this), _.each(o, function(e) {
                    this.hookDependent({
                        currentTarget: e
                    })
                }, this)
            },
            hookDependent: function(e) {
                var e = d(e.currentTarget),
                    t = e.closest(".vc_column"),
                    n = this.dependentElements[e.attr("name")],
                    a = e.is(":checkbox") ? _.map(this.$el.find("[name=" + e.attr("name") + "].wpb_vc_param_value:checked"), function(e) {
                        return d(e).val()
                    }) : e.val(),
                    i = e.is(":checkbox") ? !this.$el.find("[name=" + e.attr("name") + "].wpb_vc_param_value:checked").length : !a.length;
                return t.hasClass("vc_dependent-hidden") ? _.each(n, function(e) {
                    var t = d.Event("change");
                    t.extra_type = "vcHookDependedParamGroup", e.closest(".vc_column").addClass("vc_dependent-hidden"), e.trigger(t)
                }) : _.each(n, function(e) {
                    var t = e.attr("name"),
                        t = _.isObject(this.mappedParams[t]) && _.isObject(this.mappedParams[t].dependency) ? this.mappedParams[t].dependency : {},
                        n = e.closest(".vc_column");
                    _.isBoolean(t.not_empty) && !0 === t.not_empty && !i || _.isBoolean(t.is_empty) && !0 === t.is_empty && i || t.value && _.intersection(_.isArray(t.value) ? t.value : [t.value], _.isArray(a) ? a : [a]).length || t.value_not_equal_to && !_.intersection(_.isArray(t.value_not_equal_to) ? t.value_not_equal_to : [t.value_not_equal_to], _.isArray(a) ? a : [a]).length || t.value_includes && a.includes(t.value_includes) ? n.removeClass("vc_dependent-hidden") : n.addClass("vc_dependent-hidden"), (t = d.Event("change")).extra_type = "vcHookDependedParamGroup", e.trigger(t)
                }, this), this
            },
            deleteParam: function(e) {
                e && e.preventDefault && e.preventDefault(), !0 === confirm(window.i18nLocale.press_ok_to_delete_section) && (this.options.parent.items--, this.options.parent.afterDelete(), this.$el.remove(), this.unbind(), this.remove())
            },
            content: function() {
                return this.$content
            },
            clone: function(e) {
                var t, n;
                e.preventDefault(), this.options.parent.addAllowed() && (e = this.options.parent.$ul.data("settings"), t = this.$content, this.$content = this.$el, n = vc.atts.param_group.parseOne.call(this, e), d.ajax({
                    type: "POST",
                    url: window.ajaxurl,
                    data: {
                        action: "vc_param_group_clone",
                        param: a(JSON.stringify(e)),
                        shortcode: vc.active_panel.model.get("shortcode"),
                        value: n,
                        vc_inline: !0,
                        _vcnonce: window.vcAdminNonce
                    },
                    dataType: "json",
                    context: this
                }).done(function(e) {
                    e = e.data || "", e = d(e);
                    e.insertAfter(this.$el), this.$content = t, this.options.parent.initializer.$content = d("> .wpb_element_wrapper", e), this.options.parent.initializer.render(), e.data("vc-param-group-param", new u({
                        el: e,
                        parent: this.options.parent
                    })), this.options.parent.items++, this.options.parent.afterAdd(e, "clone")
                }))
            },
            toggle: function(e) {
                e.preventDefault();
                e = this.$el;
                e.find("> .wpb_element_wrapper").slideToggle(), e.toggleClass("vc_param_group-collapsed").siblings(":not(.vc_param_group-collapsed)").addClass("vc_param_group-collapsed").find("> .wpb_element_wrapper").slideUp()
            }
        }),
        h = (vc.edit_form_callbacks = [], vc.atts = {
            parse: function(e) {
                var t = this.content().find(".wpb_vc_param_value[name=" + e.param_name + "]"),
                    n = t.closest('[data-vc-ui-element="panel-shortcode-param"]'),
                    n = _.isUndefined(vc.atts[e.type]) || _.isUndefined(vc.atts[e.type].parse) ? t.length ? t.val() : null : n.data("vcInitParam") ? vc.atts[e.type].parse.call(this, e) : (n = this.model.get("params"), _.isUndefined(n[e.param_name]) ? t.length ? t.val() : null : n[e.param_name]);
                return void 0 !== t.data("js-function") && void 0 !== window[t.data("js-function")] && (0, window[t.data("js-function")])(this.$el, this, e), n
            },
            parseFrame: function(e) {
                return vc.atts.parse.call(this, e)
            },
            parseText: function(e) {
                var e = this.content().find(".wpb_vc_param_value[name=" + e.param_name + "]"),
                    t = e.val(),
                    e = e.attr("data-value-type");
                try {
                    e && "text" === e && (t = window.vc.utils.stripHtmlTags(t)), t = window.vc.utils.fixUnclosedTags(t)
                } catch (e) {
                    console.error("Failed to execute window.vc.utils functions during param parse: ", e)
                }
                return t
            },
            init: function(e, t) {
                _.isUndefined(vc.atts[e.type]) || _.isUndefined(vc.atts[e.type].init) || vc.atts[e.type].init.call(this, e, t)
            }
        }, vc.atts.textarea_html = {
            parse: function(e) {
                var t = this.window(),
                    e = this.content().find(".textarea_html." + e.param_name);
                try {
                    t.tinyMCE && _.isArray(t.tinyMCE.editors) && _.each(t.tinyMCE.editors, function(e) {
                        "wpb_tinymce_content" === e.id && e.save()
                    })
                } catch (e) {
                    window.console && window.console.warn && window.console.warn("textarea_html atts parse error", e)
                }
                return e.val()
            },
            render: function(e, t) {
                return _.isUndefined(t) ? t : vc_wpautop(t)
            }
        }, vc.atts.textfield = {
            parse: function(e) {
                return vc.atts.parseText.call(this, e)
            }
        }, vc.atts.textarea = {
            parse: function(e) {
                return vc.atts.parseText.call(this, e)
            }
        }, vc.atts.textarea_safe = {
            parse: function(e) {
                e = this.content().find(".wpb_vc_param_value[name=" + e.param_name + "]").val();
                return e.match(/"|(http)/) ? "#E-8_" + base64_encode(rawurlencode(e)) : e
            },
            render: function(e, t) {
                return t && t.match(/^#E\-8_/) ? d("<div/>").text(rawurldecode(base64_decode(t.replace(/^#E\-8_/, "")))).html() : t
            }
        }, vc.atts.checkbox = {
            parse: function(e) {
                var t = [],
                    n = "";
                return d("input[name=" + e.param_name + "]", this.content()).each(function() {
                    var e = d(this);
                    this.checked && t.push(e.attr("value"))
                }), n = 0 < t.length ? t.join(",") : n
            },
            defaults: function() {
                return ""
            }
        }, vc.atts.el_id = {
            clone: function(e, t, n) {
                var a = e.get("params");
                _.isUndefined(n) || _.isUndefined(n.settings) || _.isUndefined(n.settings.auto_generate) || !0 !== n.settings.auto_generate ? a[n.param_name] = "" : a[n.param_name] = Date.now() + "-" + vc_guid(), e.set({
                    params: a
                }, {
                    silent: !0
                })
            },
            create: function(e, t, n) {
                if (e.get("cloned")) return vc.atts.el_id.clone(e, t, n);
                !_.isEmpty(t) || _.isUndefined(n) || _.isUndefined(n.settings) || _.isUndefined(n.settings.auto_generate) || 1 != n.settings.auto_generate || ((t = e.get("params"))[n.param_name] = Date.now() + "-" + vc_guid(), e.set({
                    params: t
                }, {
                    silent: !0
                }))
            }
        }, vc.events.on("shortcodes:add:param:type:el_id", vc.atts.el_id.create), vc.atts.posttypes = {
            parse: function(e) {
                var t = [],
                    n = "";
                return d("input[name=" + e.param_name + "]", this.content()).each(function() {
                    var e = d(this);
                    this.checked && t.push(e.attr("value"))
                }), n = 0 < t.length ? t.join(",") : n
            }
        }, vc.atts.taxonomies = {
            parse: function(e) {
                var t = [],
                    n = "";
                return d("input[name=" + e.param_name + "]", this.content()).each(function() {
                    var e = d(this);
                    this.checked && t.push(e.attr("value"))
                }), n = 0 < t.length ? t.join(",") : n
            }
        }, vc.atts.exploded_textarea = {
            parse: function(e) {
                return this.content().find(".wpb_vc_param_value[name=" + e.param_name + "]").val().replace(/\n/g, ",")
            }
        }, vc.atts.exploded_textarea_safe = {
            parse: function(e) {
                e = this.content().find(".wpb_vc_param_value[name=" + e.param_name + "]").val();
                return (e = e.replace(/\n/g, ",")).match(/"|(http)/) ? "#E-8_" + base64_encode(rawurlencode(e)) : e
            },
            render: function(e, t) {
                return t && t.match(/^#E\-8_/) ? d("<div/>").text(rawurldecode(base64_decode(t.replace(/^#E\-8_/, "")))).html() : t
            }
        }, vc.atts.textarea_raw_html = {
            parse: function(e) {
                e = vc.atts.parseText.call(this, e);
                return base64_encode(rawurlencode(e))
            },
            render: function(e, t) {
                return t ? d("<div/>").text(rawurldecode(base64_decode(t.trim()))).html() : ""
            }
        }, vc.atts.textarea_ace = {
            init: function(e, t) {
                var n, a = t.find(".textarea_ace_container"),
                    i = t.find('input.wpb_vc_param_value[name="content"]'),
                    t = a.attr("id");
                "undefined" != typeof ace ? ((n = ace.edit(t)).setTheme("ace/theme/chrome"), a = e.mode || "html", n.session.setMode("ace/mode/" + a), n.session.setOption("wrap", "free"), a = "", i.val() && (a = rawurldecode(base64_decode(i.val()))), n.setValue(a, -1), n.clearSelection(), n.getSession().on("change", function() {
                    var e = n.getValue();
                    try {
                        e = window.vc.utils.fixUnclosedTags(e)
                    } catch (e) {
                        console.error("Failed to execute window.vc.utils.fixUnclosedTags function: ", e)
                    }
                    e = base64_encode(rawurlencode(e));
                    i.val(e)
                }), d(window).on("resize", function() {
                    n.resize()
                })) : console.error("ACE Editor is not loaded.")
            },
            parse: function() {
                return this.content().find('input.wpb_vc_param_value[name="content"]').val()
            },
            render: function(e, t) {
                t = t ? rawurldecode(base64_decode(t.trim())) : "";
                return t ? d("<div/>").text(t).html() : ""
            }
        }, vc.atts.dropdown = {
            render: function(e, t) {
                return t
            },
            init: function(e, t) {
                d(".wpb_vc_param_value.dropdown", t).on("change", function() {
                    var e = d(this),
                        t = e.find(":selected"),
                        n = e.data("option"),
                        t = t.length ? t.attr("class").replace(/\s/g, "_") : "";
                    t = t.replace("#", "hash-"), void 0 !== n && e.removeClass(n), void 0 !== t && (e.data("option", t), e.addClass(t))
                })
            },
            defaults: function(e) {
                var t;
                return _.isArray(e.value) || _.isString(e.value) ? _.isArray(e.value) ? (t = e.value[0], _.isArray(t) && t.length ? t[0] : t) : "" : (t = _.values(e.value)[0]).label ? t.value : t
            }
        }, vc.atts.href = {
            parse: function(e) {
                var e = this.content().find(".wpb_vc_param_value[name=" + e.param_name + "]"),
                    t = "";
                return t = e.length && "http://" !== e.val() ? e.val() : t
            }
        }, vc.atts.attach_image = {
            isParse: !1,
            parse: function(e) {
                var t = this.content().find(".wpb_vc_param_value[name=" + e.param_name + "]"),
                    n = "";
                return t.parent().find("li.added").length && (n = t.parent().find("li.added img").attr("src")), d("[data-model-id=" + this.model.id + "]").data("field-" + e.param_name + "-attach-image", n), vc.atts.attach_image.isParse = !0, t.length ? t.val() : null
            },
            render: function(e, t) {
                var n = d("[data-model-id=" + this.model.id + "]"),
                    a = n.data("field-" + e.param_name + "-attach-image"),
                    i = this.$el.find(".attachment-thumbnail[data-name=" + e.param_name + "]"),
                    o = {
                        image_src: "",
                        image_alt: ""
                    };
                return "image" === e.param_name && ("external_link" === this.model.getParam("source") ? (o.image_src = this.model.getParam("custom_src"), vc.atts.attach_image.updateImage(i, o)) : _.isEmpty(t) && "featured_image" !== this.model.getParam("source") ? _.isUndefined(a) || (n.removeData("field-" + e.param_name + "-attach-image"), o.image_src = a, vc.atts.attach_image.updateImage(i, o)) : (f("get_attach_image", e, t, this.model), vc.atts.attach_image.isParse && d.ajax({
                    type: "POST",
                    url: window.ajaxurl,
                    data: {
                        action: "wpb_single_image_data",
                        content: t,
                        params: this.model.get("params"),
                        postId: vc_post_id,
                        _vcnonce: window.vcAdminNonce
                    },
                    dataType: "json",
                    context: this
                }).done(function(e) {
                    var t;
                    e.success && (t = e.data.image_src.length || "featured_image" === this.model.getParam("source"), vc.atts.attach_image.updateImage(i, e.data, t))
                }))), t
            },
            updateImage: function(e, t, n) {
                var a = t.image_src,
                    t = t.image_alt;
                e.length && ((n = void 0 === n ? !1 : n) || !_.isEmpty(a) ? (e.attr("src", a), e.attr("alt", t), (_.isEmpty(a) ? (e.hide(), e.next().removeClass("image-exists")) : (e.show(), e.next().addClass("image-exists"))).next().addClass("image-exists")) : e.attr("src", "").hide().next().removeClass("image-exists").next().removeClass("image-exists"))
            }
        }, vc.atts.attach_images = {
            isParse: !1,
            parse: function(e) {
                var t = this.content().find(".wpb_vc_param_value[name=" + e.param_name + "]"),
                    n = "";
                return t.parent().find("li.added").each(function() {
                    n += '<li><img src="' + d(this).find("img").attr("src") + '" alt=""></li>'
                }), d("[data-model-id=" + this.model.id + "]").data("field-" + e.param_name + "-attach-images", n), vc.atts.attach_images.isParse = !0, t.length ? t.val() : null
            },
            render: function(e, t) {
                var n = this.$el.find(".attachment-thumbnails[data-name=" + e.param_name + "]");
                return "external_link" === this.model.getParam("source") && (t = this.model.getParam("custom_srcs")), _.isEmpty(t) ? (this.$el.removeData("field-" + e.param_name + "-attach-images"), vc.atts.attach_images.updateImages(n, "")) : (f("get_gallery_images", e, t, this.model), vc.atts.attach_images.isParse && d.ajax({
                    type: "POST",
                    url: window.ajaxurl,
                    data: {
                        action: "wpb_get_gallery_html",
                        content: t,
                        _vcnonce: window.vcAdminNonce
                    },
                    dataType: "json",
                    context: this
                }).done(function(e) {
                    e = e.data;
                    vc.atts.attach_images.updateImages(n, e)
                })), t
            },
            updateImages: function(e, t) {
                e.html(t), t.length ? e.removeClass("image-exists").next().addClass("image-exists") : e.addClass("image-exists").next().removeClass("image-exists")
            }
        }, vc.atts.google_fonts = {
            parse: function(e) {
                var e = this.content().find(".wpb_vc_param_value[name=" + e.param_name + "]").parent(),
                    t = {};
                return t.font_family = e.find(".vc_google_fonts_form_field-font_family-select > option:selected").val(), t.font_style = e.find(".vc_google_fonts_form_field-font_style-select > option:selected").val(), t.font_vendor = e.find(".vc_google_fonts_form_field-font_family-select > option:selected").attr("data[font_vendor]"), e = _.map(t, function(e, t) {
                    if (_.isString(e) && 0 < e.length) return t + ":" + encodeURIComponent(e)
                }), d.grep(e, function(e) {
                    return _.isString(e) && 0 < e.length
                }).join("|")
            },
            init: function(e, t) {
                var n = t;
                n.length && ("undefined" != typeof WebFont ? t.data("vc-param-object", new r({
                    el: n
                })) : n.find("> .edit_form_line").html(window.i18nLocale.gfonts_unable_to_load_google_fonts || "Unable to load Google Fonts"))
            }
        }, vc.atts.font_container = {
            parse: function(e) {
                var e = this.content().find(".wpb_vc_param_value[name=" + e.param_name + "]").parent(),
                    t = {};
                return t.tag = e.find(".vc_font_container_form_field-tag-select > option:selected").val(), t.font_size = e.find(".vc_font_container_form_field-font_size-input").val(), t.text_align = e.find(".vc_font_container_form_field-text_align-select > option:selected").val(), t.font_family = e.find(".vc_font_container_form_field-font_family-select > option:selected").val(), t.color = e.find(".vc_font_container_form_field-color-input").val(), t.line_height = e.find(".vc_font_container_form_field-line_height-input").val(), t.font_style_italic = e.find(".vc_font_container_form_field-font_style-checkbox.italic").prop("checked") ? "1" : "", t.font_style_bold = e.find(".vc_font_container_form_field-font_style-checkbox.bold").prop("checked") ? "1" : "", e = _.map(t, function(e, t) {
                    if (_.isString(e) && 0 < e.length) return t + ":" + encodeURIComponent(e)
                }), d.grep(e, function(e) {
                    return _.isString(e) && 0 < e.length
                }).join("|")
            },
            init: function(e, t) {
                vc.atts.colorpicker.init.call(this, e, t)
            }
        }, vc.atts.param_group = {
            parse: function(e) {
                var t = this.content(),
                    n = t.find('.wpb_el_type_param_group[data-vc-ui-element="panel-shortcode-param"][data-vc-shortcode-param-name="' + e.param_name + '"]').find("> .edit_form_line > .vc_param_group-list"),
                    e = vc.atts.param_group.extractValues.call(this, e, d('>.wpb_vc_row:not(".vc_param_group-add_content-wrapper")', n));
                return this.$content = t, encodeURIComponent(JSON.stringify(e))
            },
            extractValues: function(i, e) {
                var t = [],
                    o = this;
                return e.each(function() {
                    var a = {};
                    o.$content = d(this), _.each(i.params, function(e) {
                        var t, e = d.extend({}, e),
                            n = e.param_name;
                        e.param_name = i.param_name + "_" + n, ((t = vc.atts.parse.call(o, e)).length || e.save_always) && (a[n] = t)
                    }), t.push(a)
                }), t
            },
            parseOne: function(e) {
                var t = this.content(),
                    e = vc.atts.param_group.extractValues.call(this, e, t);
                return this.$content = t, a(JSON.stringify(e))
            },
            init: function(e, t) {
                t.data("vc-param-object", new p({
                    el: t,
                    settings: {
                        param: e
                    }
                }))
            }
        }, vc.atts.colorpicker = {
            init: function(e, t) {
                // START UNCODE EDIT
                return;
                // t = t[0];
                // vc.initColorPicker(t, null, {
                //     change: function(e) {
                //         d(e).trigger("change")
                //     },
                //     cancel: function(e) {
                //         d(e).trigger("change")
                //     }
                // })
                // END UNCODE EDIT
            }
        }, vc.atts.autocomplete = {
            init: function(e, t) {
                t.length && t.each(function() {
                    var e = d(".wpb_vc_param_value", this),
                        t = e.attr("name"),
                        n = d(".vc_auto_complete_param", this),
                        t = d.extend({
                            $param_input: e,
                            param_name: t,
                            $el: n
                        }, e.data("settings")),
                        n = new l(t);
                    t.multiple && n.enableMultiple(), t.sortable && n.enableSortable(), e.data("vc-param-object", n)
                })
            }
        }, vc.atts.loop = {
            init: function(e, t) {
                t.data("vc-param-object", new n({
                    el: t
                }))
            }
        }, vc.atts.vc_link = {
            init: function(e, t) {
                d(".vc_link-build", t).on("click", function(e) {
                    e && e.preventDefault && e.preventDefault(), e && e.stopImmediatePropagation && e.stopImmediatePropagation(), e = d(this).closest(".vc_link"), i = e.find(".wpb_vc_param_value"), o = e.find(".url-label"), s = e.find(".title-label"), e = i.data("json"), r = d("#wp-link-submit"), l = d('<input type="submit" name="vc_link-submit" id="vc_link-submit" class="button-primary" value="Set Link">'), r.hide(), d("#vc_link-submit").remove(), l.insertBefore(r), t = d('<div class="link-target vc-link-nofollow"><label><span></span> <input type="checkbox" id="vc-link-nofollow"> Add nofollow option to link</label></div>'), d("#link-options .vc-link-nofollow").remove(), t.insertAfter(d("#link-options .link-target")), setTimeout(function() {
                        var e = d("#most-recent-results").css("top");
                        d("#most-recent-results").css("top", parseInt(e, 10) + t.height())
                    }, 200), c = !window.wpLink && d.fn.wpdialog && d("#wp-link").length ? {
                        $link: !1,
                        open: function() {
                            this.$link = d("#wp-link").wpdialog({
                                title: wpLinkL10n.title,
                                width: 480,
                                height: "auto",
                                modal: !0,
                                dialogClass: "wp-dialog",
                                zIndex: 3e5
                            }), this.$link.addClass("vc-link-wrapper")
                        },
                        close: function() {
                            this.$link && (this.$link.wpdialog("close"), this.$link.removeClass("vc-link-wrapper"))
                        }
                    } : window.wpLink;
                    var i, o, s, r, l, t, c, n = function(e, t) {
                            jQuery(t).addClass("vc-link-wrapper");
                            var a = d("#wp-link-cancel button");
                            l.off("click.vcLink").on("click.vcLink", function(e) {
                                e && e.preventDefault && e.preventDefault(), e && e.stopImmediatePropagation && e.stopImmediatePropagation(), (e = {}).url = (d("#wp-link-url").length ? d("#wp-link-url") : d("#url-field")).val(), e.title = (d("#wp-link-text").length ? d("#wp-link-text") : d("#link-title-field")).val();
                                var t, n = d("#wp-link-target").length ? d("#wp-link-target") : d("#link-target-checkbox");
                                return e.target = n[0].checked ? "_blank" : "", e.rel = d("#vc-link-nofollow")[0].checked ? "nofollow" : "", t = _.map(e, function(e, t) {
                                    if (_.isString(e) && 0 < e.length) return t + ":" + encodeURIComponent(e).trim()
                                }).filter(function(e) {
                                    return e
                                }).join("|"), i.val(t).trigger("change"), i.data("json", e), o.html(e.url + e.target), s.html(e.title), c.close("noReset"), r.show(), l.off("click.vcLink"), l.remove(), a.off("click.vcLinkCancel"), window.wpLink.textarea = "", n.attr("checked", !1), d("#most-recent-results").css("top", ""), d("#vc-link-nofollow").attr("checked", !1), !1
                            }), a.off("click").on("click.vcLinkCancel", function(e) {
                                e && e.preventDefault && e.preventDefault(), e && e.stopImmediatePropagation && e.stopImmediatePropagation(), c.close("noReset"), l.off("click.vcLink"), l.remove(), a.off("click.vcLinkCancel"), window.wpLink.textarea = ""
                            })
                        },
                        a = function(e, t) {
                            jQuery(t).removeClass("vc-link-wrapper"), jQuery(document).off("wplink-open", n), jQuery(document).off("wplink-close", a)
                        };
                    jQuery(document).off("wplink-open", n).on("wplink-open", n), jQuery(document).off("wplink-close", a).on("wplink-close", a), "admin_frontend_editor" === vc_mode ? c.open("vc-hidden-editor") : c.open("content"), _.isString(e.url) && (d("#wp-link-url").length ? d("#wp-link-url") : d("#url-field")).val(e.url), _.isString(e.title) && (d("#wp-link-text").length ? d("#wp-link-text") : d("#link-title-field")).val(e.title), (d("#wp-link-target").length ? d("#wp-link-target") : d("#link-target-checkbox")).prop("checked", !_.isEmpty(e.target)), d("#vc-link-nofollow").length && d("#vc-link-nofollow").prop("checked", !_.isEmpty(e.rel))
                })
            }
        }, vc.atts.sorted_list = {
            init: function(e, t) {
                d(".vc_sorted-list", t).VcSortedList()
            }
        }, vc.atts.options = {
            init: function(e, t) {
                t.data("vc-param-object", new o({
                    el: t
                }))
            }
        }, vc.atts.iconpicker = {
            change: function(e, t) {
                t = t.find(".vc-iconpicker");
                t.val(this.value), t.data("vc-no-check", !0), t.find('[value="' + this.value + '"]').attr("selected", "selected"), t.data("vcFontIconPicker").loadIcons()
            },
            parse: function(e) {
                return this.content().find(".wpb_vc_param_value[name=" + e.param_name + "]").parent().find(".vc-iconpicker").val()
            },
            init: function(e, t) {
                var n = t.find(".wpb_vc_param_value"),
                    a = d.extend({
                        iconsPerPage: 100,
                        iconDownClass: "fip-fa fa fa-arrow-down",
                        iconUpClass: "fip-fa fa fa-arrow-up",
                        iconLeftClass: "fip-fa fa fa-arrow-left",
                        iconRightClass: "fip-fa fa fa-arrow-right",
                        iconSearchClass: "fip-fa fa fa-search",
                        iconCancelClass: "fip-fa fa fa-remove",
                        iconBlockClass: "fip-fa"
                    }, n.data("settings"));
                t.find(".vc-iconpicker").vcFontIconPicker(a).on("change", function() {
                    var e = d(this);
                    e.data("vc-no-check") || n.data("vc-no-check", !0).val(this.value).trigger("change"), e.data("vc-no-check", !1)
                }), n.on("change", function() {
                    n.data("vc-no-check") || vc.atts.iconpicker.change.call(this, e, t), n.data("vc-no-check", !1)
                })
            }
        }, vc.atts.animation_style = {
            init: function(e, t) {
                var n = t,
                    a = d(".wpb_vc_param_value[name=" + e.param_name + "]", n);

                function i(e, t) {
                    d(e).removeClass().addClass(t + " animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        d(this).removeClass().addClass("vc_param-animation-style-preview")
                    })
                }
                d('option[value="' + a.val() + '"]', n).attr("selected", !0), d(".vc_param-animation-style-trigger", n).on("click", function(e) {
                    e.preventDefault();
                    e = d(".vc_param-animation-style", n).val();
                    "none" !== e && i(this.parentNode, "vc_param-animation-style-preview " + e)
                }), d(".vc_param-animation-style", n).on("change", function() {
                    var e = d(this).val();
                    a.val(e), "none" !== e && i(d(".vc_param-animation-style-preview", n), "vc_param-animation-style-preview " + e)
                })
            }
        }, vc.atts.gutenberg = {
            content: null,
            gutenbergParamObj: null,
            $frame: null,
            closeEditor: function(e) {
                e && e.preventDefault && e.preventDefault();
                var t = this;
                _.delay(function() {
                    t.content.find(".vc_gutenberg-modal-wrapper").html(""), t.$frame = null, t.gutenbergParamObj = null
                }, 100)
            },
            updateEditor: function(e) {
                e && e.preventDefault && e.preventDefault(), this.gutenbergParamObj && this.gutenbergParamObj.updateValueFromIframe(), this.closeEditor()
            },
            init: function(e, t) {
                var n = vc.atts.gutenberg,
                    a = (n.content = t, d(".wpb_vc_param_value[name=" + e.param_name + "]", n.content));
                d('[data-vc-action="open"]', n.content).on("click", function(e) {
                    e.preventDefault();
                    var e = a.val(),
                        t = window.wpbGutenbergEditorUrl || "/wp-admin/post-new.php?post_type=wpb_gutenberg_param";
                    n.gutenbergParamObj = new v({
                        onSetValue: function(e) {
                            a.val(e), a.trigger("change")
                        },
                        onError: n.closeEditor,
                        value: e
                    }), vc.createOverlaySpinner(), n.content.find(".vc_gutenberg-modal-wrapper").html('<div class="wpb-gutenberg-modal"><div class="wpb-gutenberg-modal-inner"><iframe style="width: 100%;" data-vc-gutenberg-param-iframe></iframe></div></div>'), n.$frame = n.content.find("iframe[data-vc-gutenberg-param-iframe]"), n.$frame.attr("src", t), n.$frame.on("load", function() {
                        vc.removeOverlaySpinner(), n.gutenbergParamObj && (n.gutenbergParamObj.iframe = n.$frame.get(0), n.gutenbergParamObj.iframeLoaded())
                    })
                })
            }
        }, function() {
            return '<style>.wpb-gutenberg-controls-container {display: flex;justify-content: center;align-items: center;}.vc_gutenberg-modal-update-button {padding-top: 8px;padding-bottom: 8px;min-height: 10px;padding: 5px 10px;font-size: 12px;line-height: 1.5;border-radius: 3px;color: #fff;background-color: #00aef0;border-color: transparent;cursor: pointer;display: inline-block;text-decoration: none !important;}.vc_gutenberg-modal-update-button:hover {background-color: #0089bd;}.wpb-gutenberg-modal-close-button {display: inline-flex;justify-content: center;align-items: center;margin: 0 0 0 10px;background: transparent;border: 0;box-shadow: none;padding: 5px;cursor: pointer;outline: none;}.wpb-gutenberg-modal-close-button:hover .vc-c-icon-close {opacity: 1;}.vc-c-icon-close {position: relative;display: inline-flex;width: 13px;height: 13px;justify-content: center;align-items: center;transform: rotate(45deg);opacity: .65;transition: opacity .2s ease-in-out;}.vc-c-icon-close::before,.vc-c-icon-close::after {content: "";position: absolute;background: #353535;}.vc-c-icon-close::before {width: 1px;height: 100%;}.vc-c-icon-close::after {width: 100%;height: 1px;}.interface-interface-skeleton__sidebar {z-index: -1;}</style>'
        }),
        m = function() {
            var e = window.i18nLocale.gutenbergEditorUpdateButton || "Update";
            return '<div class="wpb-gutenberg-controls-container">' + h() + '<button class="vc_gutenberg-modal-update-button">' + e + '</button><button class="wpb-gutenberg-modal-close-button"><i class="vc-composer-icon vc-c-icon-close"></i></button></div>'
        },
        v = function(e) {
            return this.iframe = null, this.options = e || {}, this.value = this.options && this.options.value ? this.options.value : "", this.iframeLoaded = function() {
                var t = !!this.iframe.contentWindow.wp && this.iframe.contentWindow.wp.data,
                    n = (t || (e = (e = window.i18nLocale || !1) && e.gutenbergDoesntWorkProperly ? e.gutenbergDoesntWorkProperly : "Gutenberg plugin doesn't work properly. Please check Gutenberg plugin.", window.alert(e), this.options && this.options.onError && this.options.onError()), parseInt(this.iframe.contentWindow.document.getElementById("post_ID").value)),
                    a = {
                        id: n,
                        guid: {
                            raw: "/?",
                            rendered: "/?"
                        },
                        title: {
                            raw: ""
                        },
                        content: {
                            raw: this.value,
                            rendered: this.value
                        },
                        type: "wpb_gutenberg_param",
                        slug: "",
                        status: "auto-draft",
                        link: "/?",
                        format: "standard",
                        categories: []
                    },
                    i = t.dispatch("core/editor"),
                    e = t.select("core/edit-post"),
                    o = this.iframe.contentWindow.document.querySelector(".editor-post-title"),
                    s = this.iframe.contentWindow.document.querySelector(".components-notice-list"),
                    r = (o && o.classList.add("hidden"), s && s.classList.add("hidden"), e.isPublishSidebarOpened = function() {
                        return !0
                    }, "function" == typeof i.autosave && (i.autosave = function() {}), this.value),
                    l = !1,
                    c = (t.subscribe(function() {
                        var e = t.select("core/editor").getCurrentPost();
                        !l && e && e.id === n && (l = !0, i.setupEditor(a, {
                            content: r
                        }))
                    }), this.iframe);
                setTimeout(function() {
                    var e, t, n;
                    e = d(e = c).contents(), t = e.find(".edit-post-header-toolbar"), n = m(), d(n).insertAfter(t), e.find(".vc_gutenberg-modal-update-button, .wpb-gutenberg-modal-close-button").on("click", function() {
                        setTimeout(function() {
                            window.sessionStorage.removeItem("wp-autosave-block-editor-post-auto-draft")
                        }, "3000")
                    }), n = vc.atts.gutenberg, e.find(".wpb-gutenberg-modal-close-button").on("click", n.closeEditor.bind(n)), e.find(".vc_gutenberg-modal-update-button").on("click", n.updateEditor.bind(n))
                }, "3000")
            }, this.updateValueFromIframe = function() {
                var e;
                this.iframe && this.iframe.contentWindow && this.iframe.contentWindow.wp && this.iframe.contentWindow.wp.data && (e = this.iframe.contentWindow.wp.data) && (e = e.select("core/editor").getEditedPostContent(), this.setValue(e))
            }, this.setValue = function(e) {
                this.value = e, this.options.onSetValue && this.options.onSetValue(e)
            }, this
        };

    function f(e, t, n, a) {
        vc.backendEditorParamsAjaxStorage = vc.backendEditorParamsAjaxStorage || {}, vc.backendEditorParamsAjaxStorage[a.id] = {
            action: e,
            source: a.getParam("source"),
            paramName: t.param_name,
            value: n
        }
    }
    vc.atts.vc_grid_id = {
        parse: function() {
            return "vc_gid:" + Date.now() + "-" + this.model.get("id") + "-" + Math.floor(11 * Math.random())
        }
    }, vc.atts.addShortcodeIdParam = function(t) {
        var n = !1,
            a = t.get("params"),
            e = vc.map[t.get("shortcode")];
        _.isArray(e.params) && _.each(e.params, function(e) {
            e && !_.isUndefined(e.type) && ("tab_id" === e.type && _.isEmpty(a[e.param_name]) ? (n = !0, a[e.param_name] = vc_guid() + "-" + Math.floor(11 * Math.random())) : "vc_grid_id" === e.type && (n = !0, a[e.param_name] = vc.atts.vc_grid_id.parse.call({
                model: t
            })))
        }), n && t.save("params", a, {
            silent: !0
        })
    }, vc.getMapped = vc.memoizeWrapper(function(e) {
        return vc.map[e] || {}
    })
})(window.jQuery);
(s => {
    void 0 === window.vc && (window.vc = {}), window.vc.ShortcodesBuilder = function(e) {
        return this.models = e || [], this.is_build_complete = !0, this
    }, window.vc.ShortcodesBuilder.prototype = {
        _ajax: !1,
        message: !1,
        isBuildComplete: function() {
            return this.is_build_complete
        },
        create: function(e) {
            return this.is_build_complete = !1, this.models.push(window.vc.shortcodes.create(e)), this
        },
        render: function(e, t) {
            var n = _.map(this.models, function(e) {
                var t = this.toString(e);
                return {
                    id: e.get("id"),
                    string: t,
                    tag: e.get("shortcode")
                }
            }, this);
            window.vc.setDataChanged(), this.build(n, e, t)
        },
        build: function(e, t, n) {
            this.ajax({
                action: "vc_load_shortcode",
                shortcodes: e,
                _vcnonce: window.vcAdminNonce
            }, window.vc.frame_window.location.href).done(function(e) {
                _.each(s(e), function(e) {
                    this._renderBlockCallback(e)
                }, this), _.isFunction(t) && t(e), window.vc.frame.setSortable(), window.vc.activity = !1, this.checkNoContent(), window.vc.frame_window.vc_iframe.loadScripts(), this.models = [], this.showResultMessage(), this.is_build_complete = !0, vc.events.trigger("afterLoadShortcode"), n && this.buildDefaultCss(n)
            })
        },
        lastID: function() {
            return this.models.length ? _.last(this.models).get("id") : ""
        },
        last: function() {
            return !!this.models.length && _.last(this.models)
        },
        firstID: function() {
            return this.models.length ? _.first(this.models).get("id") : ""
        },
        first: function() {
            return !!this.models.length && _.first(this.models)
        },
        buildFromContent: function() {
            var e = decodeURIComponent(window.vc.frame_window.jQuery("#vc_template-post-content").html() + "").replace(/<style([^>]*)>\/\*\* vc_js-placeholder \*\*\//g, "<script$1>").replace(/<\/style([^>]*)><!-- vc_js-placeholder -->/g, "</script$1>");
            try {
                window.vc.$page.html(e).prepend(s('<div class="vc_empty-placeholder"></div>'))
            } catch (e) {
                window.console && window.console.warn && window.console.warn("BuildFromContent error", e)
            }
            _.each(window.vc.post_shortcodes, function(e) {
                var e = JSON.parse(decodeURIComponent(e + "")),
                    t = window.vc.$page.find("[data-model-id=" + e.id + "]"),
                    n = (t.parents("[data-model-id]"), _.isObject(e.attrs) ? e.attrs : {}),
                    n = window.vc.shortcodes.create({
                        id: e.id,
                        shortcode: e.tag,
                        params: this.unescapeParams(n),
                        parent_id: e.parent_id,
                        from_content: !0
                    }, {
                        silent: !0
                    });
                t.attr("data-model-id", n.get("id")), this._renderBlockCallback(t.get(0))
            }, this), window.vc.frame.setSortable(), this.checkNoContent(), window.vc.frame.render();
            try {
                window.vc.frame_window.vc_iframe.reload()
            } catch (e) {
                window.console && window.console.warn && window.console.warn("BuildFromContent render error", e)
            }
        },
        buildFromTemplate: function(e, t) {
            var i = !1;
            return _.each(s(e), function(e) {
                var t = s(e);
                t.is("[data-type=files]") ? this._renderBlockCallback(e) : window.vc.app.placeElement(t)
            }, this), _.each(t, function(e) {
                var t, e = JSON.parse(decodeURIComponent(e + "")),
                    n = window.vc.$page.find("[data-model-id=" + e.id + "]"),
                    o = _.isObject(e.attrs) ? e.attrs : {};
                i || (t = window.vc.shortcodeHasIdParam(e.tag)) && !_.isUndefined(o) && !_.isUndefined(o[t.param_name]) && 0 < o[t.param_name].length && (i = !0), t = window.vc.shortcodes.create({
                    id: e.id,
                    shortcode: e.tag,
                    params: this.unescapeParams(o),
                    parent_id: e.parent_id,
                    from_template: !0
                }), n.attr("data-model-id", t.get("id")), this._renderBlockCallback(n.get(0)), this.models.push(t), vc.latestAddedElement = t
            }, this), window.vc.frame.setSortable(), window.vc.activity = !1, this.checkNoContent(), window.vc.frame_window.vc_iframe.loadScripts(), this.models = [], this.showResultMessage(), window.vc.frame.render(), this.is_build_complete = !0, vc.events.trigger("templateAdd"), window.vc.setDataChanged(), i
        },
        _renderBlockCallback: function(e) {
            var t, e = s(e);
            "files" === e.data("type") ? (window.vc.frame_window.vc_iframe.addScripts(e.find("script,link")), window.vc.frame_window.vc_iframe.addStyles(e.find("style"))) : (t = window.vc.shortcodes.get(e.data("modelId")), e = e.is("[data-type=element]") ? s(e.html()) : e, t && t.get("shortcode") && this.renderShortcode(e, t)), window.vc.setFrameSize()
        },
        renderShortcode: function(e, t) {
            var n, o = this.getView(t),
                i = e;
            window.vc.last_inner = i.html(), s("script", i).each(function() {
                var e;
                n = ((s(this).attr("src") ? (e = window.vc.frame.addInlineScript(s(this)), s('<span class="js_placeholder_' + e + '"></span>')) : (e = window.vc.frame.addInlineScriptBody(s(this)), s('<span class="js_placeholder_inline_' + e + '"></span>'))).insertAfter(s(this)), !0), s(this).remove()
            }), n && e.html(i.html()), t.get("from_content") || t.get("from_template") || this.placeContainer(e, t), t.view = new o({
                model: t,
                el: e
            }).render(), this.notifyParent(t.get("parent_id")), t.view.rendered()
        },
        getView: function(e) {
            var t = e.setting("is_container") || e.setting("as_parent") ? InlineShortcodeViewContainer : InlineShortcodeView;
            return t = _.isObject(window["InlineShortcodeView_" + e.get("shortcode")]) ? window["InlineShortcodeView_" + e.get("shortcode")] : t
        },
        update: function(n) {
            var e = n.get("shortcode"),
                t = this.toString(n);
            window.vc.setDataChanged(), this.ajax({
                action: "vc_load_shortcode",
                shortcodes: [{
                    id: n.get("id"),
                    string: t,
                    tag: e
                }],
                _vcnonce: window.vcAdminNonce
            }, window.vc.frame_window.location.href).done(function(e) {
                var t = n.view;
                _.each(s(e), function(e) {
                    this._renderBlockCallback(e)
                }, this), n.view && (n.view.$el.insertAfter(t.$el), window.vc.shortcodes.where({
                    parent_id: n.get("id")
                }).length && t.content().find("> *").appendTo(n.view.content()), t.remove(), window.vc.frame_window.vc_iframe.loadScripts(), n.view.changed(), window.vc.frame.setSortable(), n.view.updated())
            })
        },
        ajax: function(e, t) {
            var n = {
                post_id: vc_post_id,
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce,
                wpb_js_google_fonts_save_nonce: window.wpb_js_google_fonts_save_nonce,
                wpb_vc_js_status: window.wpb_vc_js_status
            };
            return this._ajax = s.ajax({
                url: t || window.vc.admin_ajax,
                type: "POST",
                dataType: "html",
                data: _.extend(n, e),
                context: this
            }), this._ajax
        },
        notifyParent: function(e) {
            e = window.vc.shortcodes.get(e);
            e && e.view && e.view.changed()
        },
        remove: function() {},
        _getContainer: function(e) {
            var t, e = e.get("parent_id");
            if (!1 !== e) {
                if (e = window.vc.shortcodes.get(e), _.isUndefined(e)) return window.vc.app;
                t = e.view
            } else t = window.vc.app;
            return t
        },
        placeContainer: function(e, t) {
            t = this._getContainer(t);
            return t && t.placeElement(e, window.vc.activity), t
        },
        toString: function(e, t) {
            var n = {},
                o = e.get("shortcode"),
                e = _.extend({}, e.get("params")),
                i = window.vc.getMergedParams(o, e),
                e = _.isString(e.content) ? e.content : "";
            return _.each(i, function(e, t) {
                n[t] = this.escapeParam(e)
            }, this), wp.shortcode.string({
                tag: o,
                attrs: n,
                content: e,
                type: _.isString(t) ? t : ""
            })
        },
        getContent: function() {
            var e = _.sortBy(window.vc.shortcodes.where({
                parent_id: !1
            }), function(e) {
                return e.get("order")
            });
            return window.vc.shortcodes.modelsToString(e)
        },
        getTitle: function() {
            return window.vc.title
        },
        checkNoContent: function() {
            window.vc.frame.noContent(!vc.shortcodes.length)
        },
        save: function(e, t) {
            this.ajax(this.getPostData(e)).done(function() {
                window.vc.unsetDataChanged(), window.vc.showMessage(window.i18nLocale.vc_successfully_updated || "Successfully updated!"), t && window.location.reload()
            })
        },
        getPostData: function(e = "") {
            var t = this.getContent(),
                n = {
                    action: "vc_save"
                };
            return n.vc_post_custom_css = window.vc.$custom_css.val(), n.vc_post_custom_js_header = window.vc.$custom_js_header.val(), n.vc_post_custom_js_footer = window.vc.$custom_js_footer.val(), n.vc_post_custom_layout = s("#vc_post-custom-layout").val(), n.vc_post_custom_seo_settings = s("#vc_post-custom-seo-settings").val(), n.post_name = window.vc.utils.slugify(s("#vc_post_name").val()), n.vc_post_template = s("#vc_post_template option:selected").val(), n.post_excerpt = s("#vc_post_excerpt").val(), n.vc_post_author = s("#vc_post_author").val(), n.vc_post_comments = s("#vc_post_comments").is(":checked"), n.vc_post_pingbacks = s("#vc_post_pingbacks").is(":checked"), n.vc_post_featured_image = s("#vc_settings-featured-image .featured_image").val(), n.vc_selected_categories = s("#vc_post-category").val(), n.vc_post_tags = this.parseSelect2Tags(s("#vc_post-tags").val()), n.content = this.wpautop(t), e && (n.post_status = e, s(".vc_button_save_draft").hide(100), s("#vc_button-update p").text(window.i18nLocale.update_all)), n.post_title = s("#vc_page-title-field").val(), n.is_hide_title = s("#wpb_post-hide-title").is(":checked"), n
        },
        parse: function(r, e, d) {
            var l = _.keys(window.vc.map).join("|"),
                t = window.wp.shortcode.regexp(l),
                e = e.trim().match(t);
            return _.isNull(e) || _.each(e, function(e) {
                var t, n = e.match(this.regexp(l)),
                    o = n[5],
                    i = new RegExp("^[\\s]*\\[\\[?(" + _.keys(window.vc.map).join("|") + ")(?![\\w-])"),
                    s = window.wp.shortcode.attrs(n[3]),
                    c = {},
                    a = vc_guid();
                _.each(s.named, function(e, t) {
                    c[t] = this.unescapeParam(e)
                }, this), s = {
                    id: a,
                    shortcode: n[2],
                    params: _.extend({}, c),
                    parent_id: !!_.isObject(d) && d.id
                }, t = window.vc.getMapped(s.shortcode), _.isArray(r) ? (r.push(s), a = r.length - 1) : r[a] = s, a == s.root_id && (r[a].html = e), _.isString(o) && o.match(i) && (t.is_container && _.isBoolean(t.is_container) && !0 === t.is_container || !_.isEmpty(t.as_parent) && !1 !== t.as_parent) ? r = this.parse(r, o, r[a]) : _.isString(o) && o.length && "vc_row" === n[2] ? r = this.parse(r, '[vc_column width="1/1"][vc_column_text]' + o + "[/vc_column_text][/vc_column]", r[a]) : _.isString(o) && o.length && "vc_column" === n[2] ? r = this.parse(r, "[vc_column_text]" + o + "[/vc_column_text]", r[a]) : _.isString(o) && (r[a].params.content = o)
            }, this), r
        },
        regexp: _.memoize(function(e) {
            return new RegExp("\\[(\\[?)(" + e + ")(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)")
        }),
        wpautop: function(e) {
            return e = vc_wpautop(e)
        },
        escapeParam: function(e) {
            return _.isUndefined(e) || _.isNull(e) || !e.toString ? "" : e.toString().replace(/"/g, "``").replace(/\[/g, "`{`").replace(/\]/g, "`}`")
        },
        unescapeParam: function(e) {
            return e = e.replace(/(\`{\`)/g, "[").replace(/(\`}\`)/g, "]").replace(/(\`{2})/g, '"'), e = vc_wpnop(e)
        },
        unescapeParams: function(e) {
            return _.object(_.map(e, function(e, t) {
                return [t, this.unescapeParam(e)]
            }, this))
        },
        setResultMessage: function(e) {
            this.message = e
        },
        showResultMessage: function() {
            !1 !== this.message && window.vc.showMessage(this.message), this.message = !1
        },
        buildDefaultCss: function(e) {
            var t = "wpb_content_element" === e.settings.element_default_class;
            if (e.settings && !t) {
                var t = "",
                    n = e.settings.params,
                    o = null,
                    e = e.settings.element_default_class;
                if (n && n.length)
                    for (var i = 0; i < n.length; i++)
                        if ("css_editor" === n[i].type) {
                            o = n[i].value;
                            break
                        }(t = o ? "." + e + "{" + _.reduce(o, function(e, t, n) {
                            return t ? e + n + ": " + t + ";" : e
                        }, "", this) + "}" : t) && vc.frame_window && e && vc.frame_window.vc_iframe.setDefaultShortcodeCss(t, e)
            }
        },
        parseSelect2Tags: function(e) {
            let t = [];
            return e && e.length && e.forEach(e => {
                /^\d+$/.test(e) ? t.push({
                    id: parseInt(e, 10),
                    name: null
                }) : t.push({
                    id: null,
                    name: e
                })
            }), t
        }
    }, window.vc.builder = new window.vc.ShortcodesBuilder
})(window.jQuery);
(() => {
    _.isUndefined(window.vc) && (window.vc = {});
    var e = Backbone.Model.extend({
            defaults: function() {
                return {
                    id: vc_guid(),
                    shortcode: "vc_text_block",
                    order: vc.shortcodes.nextOrder(),
                    params: {},
                    parent_id: !1
                }
            },
            settings: !1,
            getParam: function(e) {
                return _.isObject(this.get("params")) && !_.isUndefined(this.get("params")[e]) ? this.get("params")[e] : ""
            },
            sync: function() {
                return !1
            },
            setting: function(e) {
                return !1 === this.settings && (this.settings = vc.getMapped(this.get("shortcode")) || {}), this.settings[e]
            },
            view: !1
        }),
        n = Backbone.Collection.extend({
            model: e,
            sync: function() {
                return !1
            },
            nextOrder: function() {
                return this.length ? this.last().get("order") + 1 : 1
            },
            initialize: function() {
                this.bind("remove", this.removeChildren, this), this.bind("remove", vc.builder.checkNoContent), this.bind("remove", this.removeEvents, this)
            },
            comparator: function(e) {
                return e.get("order")
            },
            removeEvents: function(e) {
                window.vc.events.triggerShortcodeEvents("destroy", e)
            },
            removeChildren: function(e) {
                e = vc.shortcodes.where({
                    parent_id: e.id
                });
                _.each(e, function(e) {
                    e.destroy()
                }, this)
            },
            stringify: function(e) {
                var t = _.sortBy(vc.shortcodes.where({
                    parent_id: !1
                }), function(e) {
                    return e.get("order")
                });
                return this.modelsToString(t, e)
            },
            singleStringify: function(e, t) {
                return this.modelsToString([vc.shortcodes.get(e)], t)
            },
            createShortcodeString: function(e, t) {
                var n, r = e.get("shortcode"),
                    i = _.extend({}, e.get("params")),
                    o = {},
                    i = vc.getMergedParams(r, i);
                return _.each(i, function(e, t) {
                    o[t] = vc.builder.escapeParam(e)
                }, this), i = vc.getMapped(r), i = _.isObject(i) && (_.isBoolean(i.is_container) && !0 === i.is_container || !_.isEmpty(i.as_parent)), n = this._getShortcodeContent(e, t), n = {
                    tag: r,
                    attrs: o,
                    content: n,
                    type: _.isUndefined(vc.getParamSettings(r, "content")) && !i ? "single" : ""
                }, _.isUndefined(t) ? e.trigger("stringify", e, n) : e.trigger("stringify:" + t, e, n), wp.shortcode.string(n)
            },
            modelsToString: function(e, n) {
                return _.reduce(e, function(e, t) {
                    return e + this.createShortcodeString(t, n)
                }, "", this)
            },
            _getShortcodeContent: function(e, n) {
                var t = _.sortBy(window.vc.shortcodes.where({
                    parent_id: e.get("id")
                }), function(e) {
                    return e.get("order")
                });
                return t.length ? _.reduce(t, function(e, t) {
                    return e + this.createShortcodeString(t, n)
                }, "", this) : (t = _.extend({}, e.get("params")), _.isUndefined(t.content) ? "" : t.content)
            },
            create: function(e, t) {
                return (e = n.__super__.create.call(this, e, t)).get("cloned") && window.vc.events.triggerShortcodeEvents("clone", e), window.vc.events.triggerShortcodeEvents("add", e), e
            }
        });
    window.vc.shortcodes = new n
})();
(r => {
    _.isUndefined(window.vc) && (window.vc = {}), r.ajaxSetup({
        beforeSend: function(e, t) {
            "script" === t.dataType && !0 === t.cache && (t.cache = !1), "script" === t.dataType && !1 === t.async && (t.async = !0)
        }
    }), vc.showSpinner = function() {
        r("#vc_logo").addClass("vc_ui-wp-spinner")
    }, vc.hideSpinner = function() {
        r("#vc_logo").removeClass("vc_ui-wp-spinner")
    }, r(document).ajaxSend(function(e, t, i) {
        i && i.data && "string" == typeof i.data && i.data.match(/vc_inline=true/) && vc.showSpinner()
    }).ajaxStop(function() {
        vc.hideSpinner()
    }), vc.active_panel = !1, vc.closeActivePanel = function(e) {
        // START UNCODE EDIT
        // if (!this.active_panel) return !1;
        if (!this.active_panel || (r('body').hasClass('vc-sidebar-switch') && (vc.active_panel.model === false || (typeof e !== 'undefined' && typeof e.is !== 'undefined' && e.is('#vc_ui-panel-templates') && vc.active_panel.model.get("id") !== 'vc_ui-panel-templates')))) return !1;
        // END UNCODE Edit
        (e && vc.active_panel.model && vc.active_panel.model.get("id") === e.get("id") || !e) && (vc.active_panel.model = null, this.active_panel.hide())
    }, vc.activePanelName = function() {
        return this.active_panel && this.active_panel.panelName ? this.active_panel.panelName : null
    }, vc.updateSettingsBadge = function() {
        r("a.vc_post-settings > .vc_post-settings-icon span.vc_badge").each(function() {
            var e = r(this);
            vc.isShowBadge() ? e.show() : e.hide()
        })
    }, vc.isShowBadge = function() {
        var t = !1;
        return ["css", "js_header", "js_footer"].forEach(function(e) {
            var e = "$custom_" + e;
            vc[e] && (e = vc[e].val()) && "" !== e.trim() && (t = !0)
        }), t
    }, vc.ModalView = Backbone.View.extend({
        message_box_timeout: !1,
        events: {
            "hidden.bs.modal": "hide",
            "shown.bs.modal": "shown"
        },
        initialize: function() {
            _.bindAll(this, "setSize", "hide")
        },
        setSize: function() {
            var e = r(window).height() - 150;
            this.$content.css("maxHeight", e), this.trigger("setSize")
        },
        render: function() {
            return r(window).on("resize.ModalView", this.setSize), this.setSize(), vc.closeActivePanel(), this.$el.modal("show"), this
        },
        showMessage: function(e, t) {
            this.message_box_timeout && this.$el.find(".vc_message").remove() && window.clearTimeout(this.message_box_timeout), this.message_box_timeout = !1;
            var i = r('<div class="vc_message type-' + t + '"></div>');
            this.$el.find(".vc_modal-body").prepend(i), i.text(e).fadeIn(), this.message_box_timeout = window.setTimeout(function() {
                i.remove()
            }, 6e3)
        },
        hide: function() {
            r(window).off("resize.ModalView")
        },
        shown: function() {}
    }), vc.element_start_index = 0, vc.AddElementBlockView = vc.ModalView.extend({
        el: r("#vc_add-element-dialog"),
        prepend: !1,
        builder: "",
        events: {
            "click .vc_shortcode-link": "createElement",
            "keyup #vc_elements_name_filter": "filterElements",
            "hidden.bs.modal": "hide",
            "show.bs.modal": "buildFiltering",
            "click .wpb-content-layouts-container [data-filter]": "filterElements",
            "shown.bs.modal": "shown"
        },
        buildFiltering: function() {
            this.do_render = !1, e = '[data-vc-ui-element="add-element-button"]', t = this.model ? this.model.get("shortcode") : "vc_column", i = this._getNotIn(t), r("#vc_elements_name_filter").val(""), this.$content.addClass("vc_filter-all"), this.$content.attr("data-vc-ui-filter", "*");
            var e, t, i, a, n = vc.getMapped(t),
                s = !(!t || _.isUndefined(n.as_parent)) && n.as_parent;
            _.isObject(s) ? (a = [], _.isString(s.only) && a.push(_.reduce(s.only.replace(/\s/, "").split(","), function(e, t) {
                return e + (_.isEmpty(e) ? "" : ",") + '[data-element="' + t.trim() + '"]'
            }, "")), _.isString(s.except) && a.push(_.reduce(s.except.replace(/\s/, "").split(","), function(e, t) {
                return e + ':not([data-element="' + t.trim() + '"])'
            }, "")), e += a.join(",")) : i && (e = i), t && !_.isUndefined(n.allowed_container_element) && (n.allowed_container_element ? _.isString(n.allowed_container_element) && (e += ":not([data-is-container=true]), [data-element=" + n.allowed_container_element + "]") : e += ":not([data-is-container=true])"), this.$buttons.removeClass("vc_visible").addClass("vc_inappropriate"), r(e, this.$content).removeClass("vc_inappropriate").addClass("vc_visible"), this.hideEmptyFilters()
        },
        hideEmptyFilters: function() {
            this.$el.find(".vc_filter-content-elements .active").removeClass("active"), this.$el.find(".vc_filter-content-elements > :first").addClass("active");
            var e = this;
            this.$el.find("[data-filter]").each(function() {
                r(r(this).data("filter") + ".vc_visible:not(.vc_inappropriate)", e.$content).length ? r(this).parent().show() : r(this).parent().hide()
            })
        },
        render: function(e, t) {
            return this.builder = new vc.ShortcodesBuilder, this.prepend = !!_.isBoolean(t) && t, this.place_after_id = !!_.isString(t) && t, this.model = !!_.isObject(e) && e, this.$content = this.$el.find('[data-vc-ui-element="panel-add-element-list"]'), this.$buttons = r('[data-vc-ui-element="add-element-button"]', this.$content), this.preventDoubleExecution = !1, vc.AddElementBlockView.__super__.render.call(this)
        },
        hide: function() {
            this.do_render && (this.show_settings && this.showEditForm(), this.exit())
        },
        showEditForm: function() {
            vc.edit_element_block_view.render(this.builder.last())
        },
        exit: function() {
            this.builder.render()
        },
        createElement: function(e) {
            var t, i, a;
            if (!this.preventDoubleExecution) {
                this.preventDoubleExecution = !0, this.do_render = !0, e.preventDefault(), e = r(e.currentTarget).data("tag"), n = {}, !(t = {
                    width: "1/1"
                }) === this.model && "vc_row" !== e ? (this.builder.create({
                    shortcode: "vc_row",
                    params: {}
                }).create({
                    shortcode: "vc_column",
                    parent_id: this.builder.lastID(),
                    params: t
                }), this.model = this.builder.last()) : !1 !== this.model && "vc_row" === e && (e += "_inner");
                var n = {
                    shortcode: e,
                    parent_id: !!this.model && this.model.get("id"),
                    params: "vc_row_inner" === e ? n : {}
                };
                for (this.prepend ? (n.order = 0, (s = vc.shortcodes.findWhere({
                        parent_id: this.model.get("id")
                    })) && (n.order = s.get("order") - 1), vc.activity = "prepend") : this.place_after_id && (n.place_after_id = this.place_after_id), this.builder.create(n), a = this.builder.models.length - 1; 0 <= a; a--) this.builder.models[a].get("shortcode");
                "vc_row" === e ? this.builder.create({
                    shortcode: "vc_column",
                    parent_id: this.builder.lastID(),
                    params: t
                }) : "vc_row_inner" === e && (t = {
                    width: "1/1"
                }, this.builder.create({
                    shortcode: "vc_column_inner",
                    parent_id: this.builder.lastID(),
                    params: t
                }));
                var s = vc.getMapped(e);
                _.isString(s.default_content) && s.default_content.length && (n = this.builder.parse({}, s.default_content, this.builder.last().toJSON()), _.each(n, function(e) {
                    e.default_content = !0, this.builder.create(e)
                }, this)), this.show_settings = !(_.isBoolean(s.show_settings_on_create) && !1 === s.show_settings_on_create), (i = this).$el.one("hidden.bs.modal", function() {
                    i.preventDoubleExecution = !1
                }).modal("hide")
            }
        },
        _getNotIn: _.memoize(function(a) {
            return '[data-vc-ui-element="add-element-button"]:not(' + _.reduce(vc.map, function(e, t) {
                var i = _.isEmpty(e) ? "" : ",";
                return _.isObject(t.as_child) ? (_.isString(t.as_child.only) && !_.contains(t.as_child.only.replace(/\s/, "").split(","), a) && (e += i + "[data-element=" + t.base + "]"), _.isString(t.as_child.except) && _.contains(t.as_child.except.replace(/\s/, "").split(","), a) && (e += i + "[data-element=" + t.base + "]")) : !1 === t.as_child && (e += i + "[data-element=" + t.base + "]"), e
            }, "") + ")"
        }),
        filterElements: function(e) {
            e.stopPropagation(), e.preventDefault();
            var e = r(e.currentTarget),
                t = '[data-vc-ui-element="add-element-button"]',
                i = r("#vc_elements_name_filter").val();
            this.$content.removeClass("vc_filter-all"), e.is("[data-filter]") ? (r(".wpb-content-layouts-container .isotope-filter .active", this.$content).removeClass("active"), e.parent().addClass("active"), t += e = e.data("filter"), "*" === e ? this.$content.addClass("vc_filter-all") : this.$content.removeClass("vc_filter-all"), this.$content.attr("data-vc-ui-filter", e.replace(".js-category-", "")), r("#vc_elements_name_filter").val("")) : 0 < i.length ? (t += ':containsi("' + i + '"):not(".vc_element-deprecated")', r(".wpb-content-layouts-container .isotope-filter .active", this.$content).removeClass("active"), this.$content.attr("data-vc-ui-filter", "name:" + i)) : i.length || (r('.wpb-content-layouts-container .isotope-filter [data-filter="*"]').parent().addClass("active"), this.$content.attr("data-vc-ui-filter", "*"), this.$content.addClass("vc_filter-all")), r(".vc_visible", this.$content).removeClass("vc_visible"), r(t, this.$content).addClass("vc_visible")
        },
        shown: function() {
            vc.is_mobile || r("#vc_elements_name_filter").trigger("focus")
        }
    }), vc.AddElementBlockViewBackendEditor = vc.AddElementBlockView.extend({
        render: function(e, t) {
            return this.prepend = !!_.isBoolean(t) && t, this.place_after_id = !!_.isString(t) && t, this.model = !!_.isObject(e) && e, this.$content = this.$el.find('[data-vc-ui-element="panel-add-element-list"]'), this.$buttons = r('[data-vc-ui-element="add-element-button"]', this.$content), vc.AddElementBlockView.__super__.render.call(this)
        },
        createElement: function(e) {
            var t, i, a;
            this.preventDoubleExecution || (this.preventDoubleExecution = !0, e && e.preventDefault && e.preventDefault(), this.do_render = !0, e = r(e.currentTarget).data("tag"), a = !(a = {
                width: "1/1"
            }) === this.model ? (i = vc.shortcodes.create({
                shortcode: "vc_row",
                params: {}
            }), a = vc.shortcodes.create({
                shortcode: "vc_column",
                params: a,
                parent_id: i.id,
                root_id: i.id
            }), "vc_row" !== e ? vc.shortcodes.create({
                shortcode: e,
                parent_id: a.id,
                root_id: i.id
            }) : i) : "vc_row" === e ? (a = {
                width: "1/1"
            }, i = vc.shortcodes.create({
                shortcode: "vc_row_inner",
                params: {},
                parent_id: this.model.id,
                order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.getNextOrder()
            }), vc.shortcodes.create({
                shortcode: "vc_column_inner",
                params: a,
                parent_id: i.id,
                root_id: i.id
            })) : vc.shortcodes.create({
                shortcode: e,
                parent_id: this.model.id,
                order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.getNextOrder(),
                root_id: this.model.get("root_id")
            }), this.show_settings = !(_.isBoolean(vc.getMapped(e).show_settings_on_create) && !1 === vc.getMapped(e).show_settings_on_create), this.model = a, this.model.get("shortcode"), (t = this).$el.one("hidden.bs.modal", function() {
                t.preventDoubleExecution = !1
            }).modal("hide"))
        },
        showEditForm: function() {
            vc.edit_element_block_view.render(this.model)
        },
        exit: function() {},
        getFirstPositionIndex: function() {
            return --vc.element_start_index, vc.element_start_index
        }
    }), vc.PanelView = vc.View.extend({
        mediaSizeClassPrefix: "vc_media-",
        customMediaQuery: !0,
        panelName: "panel",
        draggable: !1,
        $body: !1,
        $tabs: !1,
        $content: !1,
        events: {
            "click [data-dismiss=panel]": "hide",
            "mouseover [data-transparent=panel]": "addOpacity",
            "click [data-transparent=panel]": "toggleOpacity",
            "mouseout [data-transparent=panel]": "removeOpacity",
            "click .vc_panel-tabs-link": "changeTab"
        },
        _vcUIEventsHooks: [{
            resize: "setResize"
        }],
        options: {
            startTab: 0
        },
        clicked: !1,
        showMessageDisabled: !0,
        initialize: function() {
            this.clicked = !1, this.$el.removeClass("vc_panel-opacity"), this.$body = r("body"), this.$content = this.$el.find(".vc_panel-body"), _.bindAll(this, "setSize", "fixElContainment", "changeTab", "setTabsSize"), this.on("show", this.setSize, this), this.on("setSize", this.setResize, this), this.on("render", this.resetMinimize, this)
        },
        toggleOpacity: function() {
            this.clicked = !this.clicked
        },
        addOpacity: function() {
            this.clicked || this.$el.addClass("vc_panel-opacity")
        },
        removeOpacity: function() {
            this.clicked || this.$el.removeClass("vc_panel-opacity")
        },
        message_box_timeout: !1,
        init: function() {},
        render: function() {
            return this.trigger("render"), this.trigger("afterRender"), this
        },
        show: function() {
            var e;
            this.$el.hasClass("vc_active") || (vc.closeActivePanel(), this.init(), (vc.active_panel = this).clicked = !1, this.$el.removeClass("vc_panel-opacity"), (e = this.$el.find(".vc_panel-tabs")).length && (this.$tabs = e, this.setTabs()), this.$el.addClass("vc_active"), this.draggable ? this.initDraggable() : r(window).trigger("resize"), this.fixElContainment(), this.trigger("show"))
        },
        hide: function(e) {
            e && e.preventDefault && e.preventDefault(), this.model && (this.model = null), vc.active_panel = !1, this.$el.removeClass("vc_active")
        },
        content: function() {
            return this.$el.find(".panel-body")
        },
        setResize: function() {
            this.customMediaQuery && this.setMediaSizeClass()
        },
        setMediaSizeClass: function() {
            var e = this.$el.width(),
                t = {
                    xs: !0,
                    sm: !1,
                    md: !1,
                    lg: !1
                };
            525 <= e && (t.sm = !0), 745 <= e && (t.md = !0), 945 <= e && (t.lg = !0), _.each(t, function(e, t) {
                e ? this.$el.addClass(this.mediaSizeClassPrefix + t) : this.$el.removeClass(this.mediaSizeClassPrefix + t)
            }, this)
        },
        fixElContainment: function() {
            // START UNCODE EDIT
            if (r('body').hasClass('vc-sidebar-switch')) {
                this.setSize()
                return;
            }
            // END UNCODE EDIT
            this.$body || (this.$body = r("body"));
            var e = [20 - this.$el.width(), 0, this.$body.width() - 20, this.$body.height() - 30],
                t = this.$el.position(),
                i = {};
            t.left < e[0] && (i.left = e[0]), t.top < 0 && (i.top = 0), e[2] < t.left && (i.left = e[2]), e[3] < t.top && (i.top = e[3]), this.$el.css(i), this.trigger("fixElContainment"), this.setSize()
        },
        initDraggable: function() {
            this.$el.draggable({
                iframeFix: !0,
                handle: ".vc_panel-heading",
                start: this.fixElContainment,
                stop: this.fixElContainment
            }), this.draggable = !0
        },
        setSize: function() {
            this.trigger("setSize")
        },
        setTabs: function() {
            this.$tabs.length && (this.$tabs.find(".vc_panel-tabs-control").removeClass("vc_active").eq(this.options.startTab).addClass("vc_active"), this.$tabs.find(".vc_panel-tab").removeClass("vc_active").eq(this.options.startTab).addClass("vc_active"), window.setTimeout(this.setTabsSize, 100))
        },
        setTabsSize: function() {
            this.$tabs && this.$tabs.parents(".vc_with-tabs.vc_panel-body").css("margin-top", this.$tabs.find(".vc_panel-tabs-menu").outerHeight())
        },
        changeTab: function(e) {
            e && e.preventDefault && e.preventDefault(), e.target && this.$tabs && (e = r(e.target), this.$tabs.find(".vc_active").removeClass("vc_active"), e.parent().addClass("vc_active"), this.$el.find(e.data("target")).addClass("vc_active"), window.setTimeout(this.setTabsSize, 100))
        },
        showMessage: function(e, t) {
            if (this.showMessageDisabled) return !1;
            this.message_box_timeout && (this.$el.find(".vc_panel-message").remove(), window.clearTimeout(this.message_box_timeout)), this.message_box_timeout = !1;
            var i = r('<div class="vc_panel-message type-' + t + '"></div>').appendTo(this.$el.find(".vc_ui-panel-content-container"));
            i.text(e).fadeIn(), this.message_box_timeout = window.setTimeout(function() {
                i.remove()
            }, 6e3)
        },
        isVisible: function() {
            return this.$el.is(":visible")
        },
        resetMinimize: function() {
            this.$el.removeClass("vc_panel-opacity")
        }
    }), vc.PostSettingsPanelView = vc.PanelView.extend({
        events: {
            "click [data-save=true]": "save",
            "click [data-dismiss=panel]": "hide",
            "click [data-transparent=panel]": "toggleOpacity",
            "mouseover [data-transparent=panel]": "addOpacity",
            "mouseout [data-transparent=panel]": "removeOpacity"
        },
        saved_css_data: "",
        saved_js_header_data: "",
        saved_js_footer_data: "",
        editor_css: !1,
        editor_js_header: !1,
        editor_js_footer: !1,
        post_settings_editor: !1,
        is_frontend_editor: !1,
        eventsAdded: !1,
        initialize: function() {
            this.is_frontend_editor = 0 < r("#vc_inline-frame").length, vc.$custom_css = r("#vc_post-custom-css"), vc.$custom_js_header = r("#vc_post-custom-js-header"), vc.$custom_js_footer = r("#vc_post-custom-js-footer"), this.saved_css_data = vc.$custom_css.val(), this.saved_js_header_data = vc.$custom_js_header.val(), this.saved_js_footer_data = vc.$custom_js_footer.val(), this.$settingsFields = this.$el.find("#vc_page-settings-tab-0").find("input, textarea, select"), window.Vc_postSettingsEditor && this.initEditor(), this.$body = r("body"), _.bindAll(this, "setSize", "fixElContainment", "initializeCategorySelect2", "toggleAddCategory", "addNewCategory"), this.on("show", this.setSize, this), this.on("setSize", this.setResize, this), this.on("render", this.resetMinimize, this), this.on("afterRender", function() {
                r(".edit-form-info").initializeTooltips(".vc_column"), this.eventsAdded || this.addEvents(), this.initializeCategorySelect2(), this.initializeTagsSelect2()
            }, this), this.isPageSettingsStatusActive() && this.render().show()
        },
        initEditor: function() {
            this.editor_css = new Vc_postSettingsEditor, this.editor_css.sel = "wpb_css_editor", this.is_css = r("#" + this.editor_css.sel).length, this.editor_css.mode = "css", this.editor_css.is_focused = !0, this.editor_js_header = new Vc_postSettingsEditor, this.editor_js_header.sel = "wpb_js_header_editor", this.is_js_header = r("#" + this.editor_js_header.sel).length, this.editor_js_header.mode = "javascript", this.editor_js_footer = new Vc_postSettingsEditor, this.editor_js_footer.sel = "wpb_js_footer_editor", this.is_js_footer = r("#" + this.editor_js_footer.sel).length, this.editor_js_footer.mode = "javascript", this.setFieldValues()
        },
        render: function() {
            return this.trigger("render"), this.setEditor(), this.trigger("afterRender"), this
        },
        setEditor: function() {
            this.is_css && this.editor_css.setEditor(vc.$custom_css.val()), this.is_js_header && this.editor_js_header.setEditor(vc.$custom_js_header.val()), this.is_js_footer && this.editor_js_footer.setEditor(vc.$custom_js_footer.val())
        },
        setSize: function() {
            window.Vc_postSettingsEditor && (this.is_css && this.editor_css.setSize(), this.is_js_header && this.editor_js_header.setSize(), this.is_js_footer && this.editor_js_footer.setSize(), this.trigger("setSize"))
        },
        save: function() {
            this.setAlertOnDataChange(), this.is_css && vc.$custom_css.val(this.editor_css.getValue()), this.is_js_header && vc.$custom_js_header.val(this.editor_js_header.getValue()), this.is_js_footer && vc.$custom_js_footer.val(this.editor_js_footer.getValue()), vc.frame_window && (this.is_css && vc.frame_window.vc_iframe.loadCustomCss(vc.$custom_css.val()), this.is_js_header && vc.frame_window.vc_iframe.loadCustomJsHeader(vc.$custom_js_header.val()), this.is_js_footer) && vc.frame_window.vc_iframe.loadCustomJsFooter(vc.$custom_js_footer.val()), vc.updateSettingsBadge(), this.showMessage(window.i18nLocale.page_settings_updated, "success"), vc.storage = vc.storage || {}, vc.storage.isChanged = !0, this.trigger("save")
        },
        show: function() {
            this.$el.hasClass("vc_active") || (this.activatePageSettingsStatus(), vc.closeActivePanel(), (vc.active_panel = this).$el.addClass("vc_active"), this.draggable || this.initDraggable(), this.fixElContainment(), this.trigger("show"))
        },
        hide: function(e) {
            this.deactivatePageSettingsStatus(), this.isPageSettingsChanged() ? confirm(window.i18nLocale.page_settings_confirm) && (vc.PanelView.prototype.hide.call(this, e), this.rollBackChanges()) : vc.PanelView.prototype.hide.call(this, e), vc.updateSettingsBadge(), this.trigger("hide")
        },
        isPageSettingsChanged: function() {
            if (window.vc.pagesettingseditor) {
                var e, t = window.vc.pagesettingseditor;
                for (e of Object.keys(t))
                    if (!_.isEqual(t[e].currentValue, t[e].previousValue)) return !0
            }
            return !1
        },
        rollBackChanges: function() {
            var e, t, i, a, n, s = window.vc.pagesettingseditor;
            for (n of Object.keys(s)) e = s[n].currentValue, t = s[n].previousValue, i = this.$settingsFields.filter("#" + n), s[n].currentValue = t, i.val(t), "vc_featured_image" === n && i.next(".gallery_widget_attached_images").find(".vc_icon-remove").trigger("click"), "checkbox" === i.attr("type") && e !== t && i.next("label").trigger("click");
            a = new CustomEvent("wpbPageSettingRollBack", {
                detail: s
            }), document.dispatchEvent(a)
        },
        isPageSettingsStatusActive: function() {
            return new URL(window.location.href).searchParams.get(this.getPageSettingsSlug())
        },
        getPageSettingsSlug: function() {
            return "vc_page_settings"
        },
        activatePageSettingsStatus: function() {
            var e = new URL(window.location.href);
            e.searchParams.set(this.getPageSettingsSlug(), !0), window.history.pushState({}, "", e)
        },
        deactivatePageSettingsStatus: function() {
            var e = new URL(window.location.href);
            e.searchParams.delete(this.getPageSettingsSlug()), window.history.pushState({}, "", e)
        },
        setAlertOnDataChange: function() {
            0 <= [this.editor_css && this.saved_css_data !== this.editor_css.getValue(), this.editor_js_header && this.saved_js_header_data !== this.editor_js_header.getValue(), this.editor_js_footer && this.saved_js_footer_data !== this.editor_js_footer.getValue()].indexOf(!0) && vc.setDataChanged()
        },
        changeTab: function(e) {
            e.preventDefault();
            var e = r(e.currentTarget).parent(),
                t = (e.parent().find('[data-vc-ui-element="panel-add-element-tab"].vc_active').removeClass("vc_active"), e.addClass("vc_active"), this.$el.find(".vc_panel-tab")),
                e = (t.length && (this.$tabs = t), t.filter(".vc_active").removeClass("vc_active"), e.data("tabIndex"));
            if (t.filter('[data-tab-index="' + e + '"]').addClass("vc_active"), 1 === e && window.vc.pagesettingseditor)
                for (var i of Object.keys(window.vc.pagesettingseditor)) window.vc.pagesettingseditor[i].editor && window.vc.pagesettingseditor[i].editor.resize()
        },
        updatePost: function(e) {
            var t;
            this.save(), "admin_page" === window.vc_mode ? r("#publish").trigger("click") : (t = r("#vc_post_status"), e = r(e.currentTarget).data("changeStatus"), t.length && (e = r("#vc_post_status").val()), vc.builder.save(e, !0))
        },
        saveDraft: function() {
            this.save(), "admin_page" === window.vc_mode ? r("#save-post").trigger("click") : vc.builder.save("", !0)
        },
        handlePostNameInput: function(e) {
            var t = r(".wpb-post-url--slug");
            t && t.text(r(e.target).val())
        },
        handlePostNameBlur: function(e) {
            var e = r(e.target),
                t = r(".wpb-post-url--slug"),
                i = e.val(),
                i = window.vc.utils.slugify(i);
            e.val(i), t && t.text(i)
        },
        addEvents: function() {
            this.$el.find("[name=post_name]") && (this.$el.find("[name=post_name]").on("input", this.handlePostNameInput.bind(this)), this.$el.find("[name=post_name]").on("blur", this.handlePostNameBlur.bind(this))), this.$el.find("#vc_toggle-add-new-category") && this.$el.find("#vc_toggle-add-new-category").on("click", this.toggleAddCategory.bind(this)), this.$el.find("#vc_add-new-category-btn") && this.$el.find("#vc_add-new-category-btn").on("click", this.addNewCategory.bind(this)), this.$settingsFields && this.$settingsFields.on("change", this.handleSettingsChange.bind(this)), this.eventsAdded = !0
        },
        initializeCategorySelect2: function() {
            this.is_frontend_editor && r("#vc_post-category").select2({
                width: "100%",
                closeOnSelect: !1,
                allowHtml: !0,
                templateResult: function(e) {
                    var t, i, a;
                    return e.id ? (t = r('<span class="wpb_select2-option-checkbox"></span>'), i = e.text.replace(/^\s+/, ""), (a = e.text.match(/^\s+/)) && a[0] && t.html(a[0].replace(/\s/g, "&nbsp;")), a = r('<span class="option-text"></span>').text(i), t.append(a), t) : e.text
                },
                templateSelection: function(e) {
                    return e.text.replace(/^\s+/, "")
                }
            })
        },
        initializeTagsSelect2: function() {
            this.is_frontend_editor && r("#vc_post-tags").select2({
                width: "100%",
                tags: !0,
                tokenSeparators: [","],
                minimumInputLength: 1,
                ajax: {
                    url: window.ajaxurl,
                    type: "POST",
                    data: function(e) {
                        return {
                            action: "vc_get_tags",
                            _vcnonce: window.vcAdminNonce,
                            search: e.term
                        }
                    },
                    processResults: function(e) {
                        return e.success ? {
                            results: e.data.map(function(e) {
                                return {
                                    id: e.id,
                                    text: e.name
                                }
                            })
                        } : (console.error("Invalid response from server: ", e.data.message), vc.showMessage(e.data.message, "error"), {
                            results: []
                        })
                    }
                }
            })
        },
        toggleAddCategory: function() {
            r("#vc_add-new-category").toggle()
        },
        addNewCategory: function(e) {
            e.preventDefault();
            var t, e = r("#vc_new-category").val();
            e && (t = r("#vc_new-category-parent").val(), r.ajax({
                url: window.ajaxurl,
                type: "POST",
                data: {
                    action: "vc_create_new_category",
                    category_name: e,
                    "vc_new-category-parent": t,
                    _vcnonce: window.vcAdminNonce
                },
                success: function(e) {
                    var t;
                    e.success ? (0 < r('#vc_post-category option[value="' + e.data.id + '"]').length || (t = r("<option></option>").val(e.data.id).text(e.data.name).prop("selected", !0), r("#vc_post-category").prepend(t), r("#vc_post-category").trigger("change")), r("#vc_new-category").val(""), r("#vc_new-category-parent").val("")) : (console.error("Error adding category:", e.data.message), vc.showMessage(e.data.message, "error"))
                }
            }))
        },
        handleSettingsChange: function(e) {
            var t, e = r(e.currentTarget);
            window.vc.pagesettingseditor || (window.vc.pagesettingseditor = {}), e.attr("data-post-custom-layout") || (t = e.val(), "checkbox" === e.attr("type") && (t = e.is(":checked")), window.vc.pagesettingseditor[e.attr("id")] && (window.vc.pagesettingseditor[e.attr("id")] = {
                previousValue: window.vc.pagesettingseditor[e.attr("id")].previousValue,
                currentValue: t
            }))
        },
        setFieldValues: function() {
            window.vc.pagesettingseditor || (window.vc.pagesettingseditor = {}), this.$settingsFields.each(function() {
                var e = r(this),
                    t = e.val();
                "checkbox" === e.attr("type") && (t = e.is(":checked")), window.vc.pagesettingseditor[e.attr("id")] = {
                    previousValue: t,
                    currentValue: t
                }
            })
        }
    }), vc.PostSettingsSeoUIPanelView = vc.PanelView.extend({
        save: function() {
            for (var e = r("#vc_setting-seo-form").serializeArray(), t = {}, i = 0; i < e.length; i++) t[e[i].name] = e[i].value;
            r("#vc_post-custom-seo-settings").val(JSON.stringify(t)), this.trigger("save"), this.hide()
        }
    }), vc.PostSettingsPanelViewBackendEditor = vc.PostSettingsPanelView.extend({
        render: function() {
            return this.trigger("render"), this.setEditor(), this.trigger("afterRender"), this
        },
        setAlertOnDataChange: function() {
            this.editor_css && vc.saved_custom_css !== this.editor_css.getValue() && window.tinymce && (window.switchEditors.go("content", "tmce"), window.setTimeout(function() {
                window.tinymce.get("content").isNotDirty = !1
            }, 1e3))
        },
        save: function() {
            vc.PostSettingsPanelViewBackendEditor.__super__.save.call(this), vc.storage.isChanged = !0
        }
    }), vc.TemplatesEditorPanelView = vc.PanelView.extend({
        events: {
            "click [data-dismiss=panel]": "hide",
            "click [data-transparent=panel]": "toggleOpacity",
            "mouseover [data-transparent=panel]": "addOpacity",
            "mouseout [data-transparent=panel]": "removeOpacity",
            "click .wpb_remove_template": "removeTemplate",
            "click [data-template_id]": "loadTemplate",
            "click [data-template_name]": "loadDefaultTemplate",
            "click #vc_template-save": "saveTemplate"
        },
        render: function() {
            this.trigger("render"), this.$name = r("#vc_template-name"), this.$list = r("#vc_template-list");
            var t = r("#vc_tabs-templates");
            return t.find(".vc_edit-form-tab-control").removeClass("vc_active").eq(0).addClass("vc_active"), t.find('[data-vc-ui-element="panel-edit-element-tab"]').removeClass("vc_active").eq(0).addClass("vc_active"), t.find(".vc_edit-form-link").on("click", function(e) {
                e.preventDefault();
                e = r(this);
                t.find(".vc_active").removeClass("vc_active"), e.parent().addClass("vc_active"), r(e.attr("href")).addClass("vc_active")
            }), this.trigger("afterRender"), this
        },
        removeTemplate: function(e) {
            e && e.preventDefault && e.preventDefault();
            var e = r(e.currentTarget),
                t = e.closest('[data-vc-ui-element="template-title"]').text();
            confirm(window.i18nLocale.confirm_deleting_template.replace("{template_name}", t)) && (e.closest('[data-vc-ui-element="template"]').remove(), this.$list.html(window.i18nLocale.loading), r.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: {
                    action: "wpb_delete_template",
                    template_id: e.attr("rel"),
                    vc_inline: !0,
                    _vcnonce: window.vcAdminNonce
                },
                context: this
            }).done(function(e) {
                this.$list.html(e)
            }))
        },
        loadTemplate: function(e) {
            e && e.preventDefault && e.preventDefault();
            e = r(e.currentTarget);
            r.ajax({
                type: "POST",
                url: vc.frame_window.location.href,
                data: {
                    action: "vc_frontend_template",
                    template_id: e.data("template_id"),
                    vc_inline: !0,
                    _vcnonce: window.vcAdminNonce
                },
                context: this
            }).done(function(e) {
                var t, i;
                _.each(r(e), function(e) {
                    if ("vc_template-data" === e.id) try {
                        i = JSON.parse(e.innerHTML)
                    } catch (e) {
                        window.console && window.console.warn && window.console.warn("loadTemplate json error", e)
                    }
                    "vc_template-html" === e.id && (t = e.innerHTML)
                }), t && i && vc.builder.buildFromTemplate(t, i), this.showMessage(window.i18nLocale.template_added, "success"), vc.closeActivePanel()
            })
        },
        ajaxData: function(e) {
            return {
                action: "vc_frontend_default_template",
                template_name: e.data("template_name"),
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        loadDefaultTemplate: function(e) {
            e && e.preventDefault && e.preventDefault();
            e = r(e.currentTarget);
            r.ajax({
                type: "POST",
                url: vc.frame_window.location.href,
                data: this.ajaxData(e),
                context: this
            }).done(function(e) {
                var t, i;
                _.each(r(e), function(e) {
                    if ("vc_template-data" === e.id) try {
                        i = JSON.parse(e.innerHTML)
                    } catch (e) {
                        window.console && window.console.warn && window.console.warn("loadDefaultTemplate json error", e)
                    }
                    "vc_template-html" === e.id && (t = e.innerHTML)
                }), t && i && vc.builder.buildFromTemplate(t, i), this.showMessage(window.i18nLocale.template_added, "success")
            })
        },
        saveTemplate: function(e) {
            e && e.preventDefault && e.preventDefault();
            var t, e = this.$name.val();
            if (_.isString(e) && e.length) {
                if (!(t = this.getPostContent()).trim().length) return this.showMessage(window.i18nLocale.template_is_empty, "error"), !1;
                t = {
                    action: "wpb_save_template",
                    template: t,
                    template_name: e,
                    frontend: !0,
                    vc_inline: !0,
                    _vcnonce: window.vcAdminNonce
                }, this.$name.val(""), this.showMessage(window.i18nLocale.template_save, "success"), this.reloadTemplateList(t)
            } else this.showMessage(window.i18nLocale.please_enter_templates_name, "error")
        },
        reloadTemplateList: function(e) {
            this.$list.html(window.i18nLocale.loading).load(window.ajaxurl, e)
        },
        getPostContent: function() {
            return vc.builder.getContent()
        }
    }), vc.TemplatesEditorPanelViewBackendEditor = vc.TemplatesEditorPanelView.extend({
        ajaxData: function(e) {
            return {
                action: "vc_backend_template",
                template_id: e.attr("data-template_id"),
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        loadTemplate: function(e) {
            e && e.preventDefault && e.preventDefault();
            e = r(e.currentTarget);
            r.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: this.ajaxData(e),
                context: this
            }).done(function(t) {
                _.each(vc.filters.templates, function(e) {
                    t = e(t)
                }), vc.storage.append(t), vc.shortcodes.fetch({
                    reset: !0
                }), vc.closeActivePanel()
            })
        },
        loadDefaultTemplate: function(e) {
            e && e.preventDefault && e.preventDefault();
            e = r(e.currentTarget);
            r.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: {
                    action: "vc_backend_default_template",
                    template_name: e.attr("data-template_name"),
                    vc_inline: !0,
                    _vcnonce: window.vcAdminNonce
                },
                context: this
            }).done(function(t) {
                _.each(vc.filters.templates, function(e) {
                    t = e(t)
                }), vc.storage.append(t), vc.shortcodes.fetch({
                    reset: !0
                })
            })
        },
        getPostContent: function() {
            return vc.storage.getContent()
        }
    }), vc.TemplatesPanelViewBackend = vc.PanelView.extend({
        $name: !1,
        $list: !1,
        template_load_action: "vc_backend_load_template",
        templateLoadPreviewAction: "vc_load_template_preview",
        save_template_action: "vc_save_template",
        delete_template_action: "vc_delete_template",
        appendedTemplateType: "my_templates",
        appendedTemplateCategory: "my_templates",
        appendedCategory: "my_templates",
        appendedClass: "my_templates",
        loadUrl: window.ajaxurl,
        events: r.extend(vc.PanelView.prototype.events, {
            "click .vc_template-save-btn": "saveTemplate",
            "click [data-template_id] [data-template-handler]": "loadTemplate",
            "click .vc_template-delete-icon": "removeTemplate"
        }),
        initialize: function() {
            _.bindAll(this, "checkInput", "saveTemplate"), vc.TemplatesPanelViewBackend.__super__.initialize.call(this)
        },
        render: function() {
            return this.$el.css("left", (r(window).width() - this.$el.width()) / 2), this.$name = this.$el.find('[data-js-element="vc-templates-input"]'), this.$name.off("keypress").on("keypress", this.checkInput), this.$list = this.$el.find(".vc_templates-list-my_templates"), vc.TemplatesPanelViewBackend.__super__.render.call(this)
        },
        saveTemplate: function(e) {
            var t, i;
            return e && e.preventDefault && e.preventDefault(), e = this.$name.val(), i = this, _.isString(e) && e.length ? (t = this.getPostContent()).trim().length ? (t = {
                action: this.save_template_action,
                template: t,
                template_name: e,
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }, void this.setButtonMessage(void 0, void 0, !0).reloadTemplateList(t, function() {
                i.$name.val("").trigger("change")
            }, function() {
                i.showMessage(window.i18nLocale.template_save_error, "error"), i.clearButtonMessage()
            })) : (this.showMessage(window.i18nLocale.template_is_empty, "error"), !1) : (this.showMessage(window.i18nLocale.please_enter_templates_name, "error"), !1)
        },
        checkInput: function(e) {
            if (13 === e.which) return this.saveTemplate(), !1
        },
        removeTemplate: function(e) {
            e && e.preventDefault && e.preventDefault(), e && e.stopPropagation && e.stopPropagation();
            var t, i, e = r(e.target).closest("[data-template_id]"),
                a = e.find('[data-vc-ui-element="template-title"]').text();
            confirm(window.i18nLocale.confirm_deleting_template.replace("{template_name}", a)) && (t = e.data("template_id"), i = e.data("template_type"), a = e.data("template_action"), e.remove(), r.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: {
                    action: a || this.delete_template_action,
                    template_id: t,
                    template_type: i,
                    vc_inline: !0,
                    _vcnonce: window.vcAdminNonce
                },
                context: this
            }).done(function() {
                this.showMessage(window.i18nLocale.template_removed, "success"), vc.events.trigger("templates:delete", {
                    id: t,
                    type: i
                })
            }))
        },
        reloadTemplateList: function(e, t, i) {
            var a = this;
            r.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: e,
                context: this
            }).done(function(e) {
                a.filter = !1, a.$list || (a.$list = a.$el.find(".vc_templates-list-my_templates")), a.$list.prepend(r(e)), "function" == typeof t && t(e)
            }).fail("function" == typeof i ? i : function() {})
        },
        getPostContent: function() {
            return vc.shortcodes.stringify("template")
        },
        loadTemplate: function(e) {
            e && e.preventDefault && e.preventDefault(), e && e.stopPropagation && e.stopPropagation();
            e = r(e.target).closest("[data-template_id][data-template_type]");
            r.ajax({
                type: "POST",
                url: this.loadUrl,
                data: {
                    action: this.template_load_action,
                    template_unique_id: e.data("template_id"),
                    template_type: e.data("template_type"),
                    vc_inline: !0,
                    _vcnonce: window.vcAdminNonce
                },
                context: this
            }).done(this.renderTemplate)
        },
        renderTemplate: function(t) {
            var e;
            _.each(vc.filters.templates, function(e) {
                t = e(t)
            }), e = vc.storage.parseContent({}, t), _.each(e, function(e) {
                vc.shortcodes.create(e), vc.latestAddedElement = vc.shortcodes.get(e.id)
            }), vc.events.trigger("templateAdd"), vc.closeActivePanel()
        },
        buildTemplatePreview: function(e) {
            e && e.preventDefault && e.preventDefault();
            try {
                var a, n = r(e.currentTarget),
                    s = n.closest("[data-template_id]");
                if (s.hasClass("vc_active") || s.hasClass("vc_loading")) n.vcAccordion("collapseTemplate");
                else {
                    var t = s.find("[data-js-content]"),
                        o = 0 < t.children().length;
                    if (this.$content = t, this.$content.find("iframe").length) return n.vcAccordion("collapseTemplate"), !0;
                    var c = this;
                    n.vcAccordion("collapseTemplate", function() {
                        var e, t = s.data("template_id"),
                            i = s.data("template_type");
                        t && !o && (e = "?", -1 < window.ajaxurl.indexOf("?") && (e = "&"), a = window.ajaxurl + e + r.param({
                            action: c.templateLoadPreviewAction,
                            template_unique_id: t,
                            template_type: i,
                            vc_inline: !0,
                            post_id: vc_post_id,
                            _vcnonce: window.vcAdminNonce
                        }), n.find("i").addClass("vc_ui-wp-spinner"), c.$content.html('<iframe style="width: 100%;" data-vc-template-preview-frame="' + t + '"></iframe>'), (e = c.$content.find("[data-vc-template-preview-frame]")).attr("src", a), s.addClass("vc_loading"), e.on("load", function() {
                            s.removeClass("vc_loading"), n.find("i").removeClass("vc_ui-wp-spinner")
                        }))
                    })
                }
            } catch (e) {
                window.console && window.console.warn && window.console.warn("buildTemplatePreview error", e), this.showMessage("Failed to build preview", "error")
            }
        },
        setTemplatePreviewSize: function(e) {
            var t = this.$content.find("iframe");
            0 < t.length && (t = t[0], void 0 === e && (t.height = t.contentWindow.document.body.offsetHeight, e = t.contentWindow.document.body.scrollHeight), t.height = e + "px")
        }
    }), vc.TemplatesPanelViewFrontend = vc.TemplatesPanelViewBackend.extend({
        template_load_action: "vc_frontend_load_template",
        loadUrl: !1,
        initialize: function() {
            this.loadUrl = vc.$frame.attr("src"), vc.TemplatesPanelViewFrontend.__super__.initialize.call(this)
        },
        render: function() {
            return vc.TemplatesPanelViewFrontend.__super__.render.call(this)
        },
        renderTemplate: function(e) {
            var t, i;
            _.each(r(e), function(e) {
                if ("vc_template-data" === e.id) try {
                    i = JSON.parse(e.innerHTML)
                } catch (e) {
                    window.console && window.console.warn && window.console.warn("renderTemplate error", e)
                }
                "vc_template-html" === e.id && (t = e.innerHTML)
            }), t && i && vc.builder.buildFromTemplate(t, i) ? this.showMessage(window.i18nLocale.template_added_with_id, "error") : this.showMessage(window.i18nLocale.template_added, "success"), vc.closeActivePanel()
        }
    }), vc.RowLayoutEditorPanelView = vc.PanelView.extend({
        events: {
            "click [data-dismiss=panel]": "hide",
            "click [data-transparent=panel]": "toggleOpacity",
            "mouseover [data-transparent=panel]": "addOpacity",
            "mouseout [data-transparent=panel]": "removeOpacity",
            "click .vc_layout-btn": "setLayout",
            "click #vc_row-layout-update": "updateFromInput"
        },
        _builder: !1,
        render: function(e) {
            return this.$input = r("#vc_row-layout"), e && (this.model = e), this.addCurrentLayout(), this.resetMinimize(), vc.column_trig_changes = !0, r(".edit-form-info").initializeTooltips(".vc_ui-panel-content"), this
        },
        builder: function() {
            return this._builder || (this._builder = new vc.ShortcodesBuilder), this._builder
        },
        addCurrentLayout: function() {
            vc.shortcodes.sort();
            var e = _.map(vc.shortcodes.where({
                parent_id: this.model.get("id")
            }), function(e) {
                e = e.getParam("width");
                return e || "1/1"
            }, "", this).join(" + ");
            this.$input.val(e)
        },
        isBuildComplete: function() {
            return this.builder().isBuildComplete()
        },
        setLayout: function(e) {
            if (e && e.preventDefault && e.preventDefault(), !this.isBuildComplete()) return !1;
            e = r(e.currentTarget).attr("data-cells"), e = this.model.view.convertRowColumns(e, this.builder());
            this.$input.val(e.join(" + "))
        },
        updateFromInput: function(e) {
            if (e && e.preventDefault && e.preventDefault(), !this.isBuildComplete()) return !1;
            var e = this.$input.val();
            !1 !== (e = this.validateCellsList(e)) ? this.model.view.convertRowColumns(e, this.builder()) : window.alert(window.i18nLocale.wrong_cells_layout)
        },
        validateCellsList: function(e) {
            var i, a, n, s = [],
                e = e.replace(/\s/g, "").split("+");
            return !(1e3 <= _.reduce(_.map(e, function(e) {
                var t;
                return e.match(/^[vc\_]{0,1}span\d{1,2}$/) ? !1 === (t = vc_convert_column_span_size(e)) ? 1e3 : (i = t.split(/\//), s.push(i[0] + "" + i[1]), 12 * parseInt(i[0], 10) / parseInt(i[1], 10)) : !e.match(/^[1-9]|1[0-2]\/[1-9]|1[0-2]$/) || (i = e.split(/\//), a = parseInt(i[0], 10), 5 !== (n = parseInt(i[1], 10)) && 0 != 12 % n) || n < a ? 1e3 : (s.push(a + "" + n), 5 === n ? a : 12 * a / n)
            }), function(e, t) {
                return t += e
            }, 0)) && s.join("_")
        }
    }), vc.RowLayoutEditorPanelViewBackend = vc.RowLayoutEditorPanelView.extend({
        builder: function() {
            return this.builder || (this.builder = vc.storage), this.builder
        },
        isBuildComplete: function() {
            return !0
        },
        setLayout: function(e) {
            e && e.preventDefault && e.preventDefault();
            e = r(e.currentTarget).attr("data-cells"), e = this.model.view.convertRowColumns(e);
            this.$input.val(e.join(" + "))
        }
    }), r(window).on("orientationchange", function() {
        vc.active_panel && vc.active_panel.$el.css({
            top: "",
            left: "auto",
            height: "auto",
            width: "auto"
        })
    }), r(window).on("resize.fixElContainment", function() {
        vc.active_panel && vc.active_panel.fixElContainment && vc.active_panel.fixElContainment()
    }), r("body").on("keyup change input", "[data-vc-disable-empty]", function() {
        var e = r(this),
            t = r(e.data("vcDisableEmpty"));
        e.val().length ? t.prop("disabled", !1) : t.prop("disabled", !0)
    })
})(window.jQuery);
window.vc.HelperAjax = {
    ajax: !1,
    checkAjax: function() {
        this.ajax && this.ajax.abort()
    },
    resetAjax: function() {
        this.ajax = !1
    }
};
window.vc.HelperPrompts = {
    uiEvents: {
        render: "removeAllPrompts"
    },
    removeAllPrompts: function() {
        this.$el.find(".vc_ui-panel-content-container").removeClass("vc_ui-content-hidden"), this.$el.find(".vc_ui-prompt").remove()
    }
};
(d => {
    window.vc.HelperPanelViewHeaderFooter = {
        buttonMessageTimeout: !1,
        events: {
            'click [data-vc-ui-element="button-save"]': "save",
            'click [data-vc-ui-element="button-close"]': "hide",
            'touchstart [data-vc-ui-element="button-close"]': "hide",
            'click [data-vc-ui-element="button-minimize"]': "toggleOpacity"
        },
        uiEvents: {
            save: "setButtonMessage",
            render: "clearButtonMessage"
        },
        resetMinimize: function() {
            this.$el.removeClass("vc_panel-opacity"), this.$el.removeClass("vc_minimized")
        },
        toggleOpacity: function(t) {
            t.preventDefault();
            var e, i = "vc_animating",
                a = "vc_minimized",
                s = this,
                n = this.$el,
                o = n.find(n.data("vcPanel")),
                u = o.closest(o.data("vcPanelContainer")),
                c = d(t.currentTarget);
            void 0 === n.data("vcHasHeight") && n.data("vcHasHeight", (t = n.attr("style"), e = !1, t && t.split(";").forEach(function(t) {
                t = t.split(":");
                "height" === d.trim(t[0]) && (e = !0)
            }), e)), n.hasClass(a) ? (void 0 === n.data("vcMinimizeHeight") && n.data("vcMinimizeHeight", d(window).height() - .2 * d(window).height()), n.animate({
                height: n.data("vcMinimizeHeight")
            }, {
                duration: 400,
                start: function() {
                    c.prop("disabled", !0), n.addClass(i), s.tabsMenu && s.tabsMenu() && s.tabsMenu().vcTabsLine("moveTabs")
                },
                complete: function() {
                    n.removeClass(a), n.removeClass(i), n.data("vcHasHeight") || n.css({
                        height: ""
                    }), s.trigger("afterUnminimize"), c.prop("disabled", !1)
                }
            })) : (n.data("vcMinimizeHeight", n.height()), n.animate({
                height: o.outerHeight() + u.outerHeight() - u.height()
            }, {
                duration: 400,
                start: function() {
                    c.prop("disabled", !0), n.addClass(i)
                },
                complete: function() {
                    n.addClass(a), n.removeClass(i), n.css({
                        height: ""
                    }), s.trigger("afterMinimize"), c.prop("disabled", !1)
                }
            }))
        },
        setButtonMessage: function(t, e, i) {
            var a;
            // START UNCODE EDIT
            // return void 0 === i && (i = !1), this.clearButtonMessage = _.bind(this.clearButtonMessage, this), !i && !vc.frame_window || this.buttonMessageTimeout || (void 0 === t && (t = window.i18nLocale.ui_saved), void 0 === e && (e = "success"), a = (i = this.$el.find('[data-vc-ui-element="button-save"]')).html(), i.addClass("vc_ui-button-" + e + " vc_ui-button-undisabled").removeClass("vc_ui-button-action").data("vcCurrentTextHtml", a).data("vcCurrentTextType", e).html(t), _.delay(this.clearButtonMessage, 5e3), this.buttonMessageTimeout = !0), this
            return void 0 === i && (i = !1), this.clearButtonMessage = _.bind(this.clearButtonMessage, this), !i && !vc.frame_window || this.buttonMessageTimeout || (void 0 === t && (t = window.i18nLocale.ui_saved), void 0 === e && (e = "success"), a = (i = this.$el.find('[data-vc-ui-element="button-save"]')).html(), i.addClass("vc_ui-button-" + e + " vc_ui-button-undisabled").removeClass("vc_ui-button-action").data("vcCurrentTextHtml", a).data("vcCurrentTextType", e).html(t), _.delay(this.clearButtonMessage, 1e3), this.buttonMessageTimeout = !0), this
            // END UNCODE EDIT
        },
        clearButtonMessage: function() {
            var t, e, i;
            this.buttonMessageTimeout && (window.clearTimeout(this.buttonMessageTimeout), e = (i = this.$el.find('[data-vc-ui-element="button-save"]')).data("vcCurrentTextHtml") || "Save", t = i.data("vcCurrentTextType"), i.html(e).removeClass("vc_ui-button-" + t + " vc_ui-button-undisabled").addClass("vc_ui-button-action"), this.buttonMessageTimeout = !1)
        }
    }
})(window.jQuery);
(a => {
    window.vc.HelperTemplatesPanelViewSearch = {
        searchSelector: "[data-vc-templates-name-filter]",
        events: {
            "keyup [data-vc-templates-name-filter]": "searchTemplate",
            "search [data-vc-templates-name-filter]": "searchTemplate"
        },
        uiEvents: {
            show: "focusToSearch"
        },
        focusToSearch: function() {
            vc.is_mobile || a(this.searchSelector, this.$el).trigger("focus")
        },
        searchTemplate: function(e) {
            e = a(e.currentTarget);
            e.val().length ? this.searchByName(e.val()) : this.clearSearch()
        },
        clearSearch: function() {
            this.$el.find("[data-vc-templates-name-filter]").val(""), this.$el.find("[data-template_name]").css("display", "block"), this.$el.removeAttr("data-vc-template-search"), this.$el.find(".vc-search-result-empty").removeClass("vc-search-result-empty");
            var e = new jQuery.Event("click");
            e.isClearSearch = !0, this.$el.find('.vc_panel-tabs-control:first [data-vc-ui-element="panel-tab-control"]').trigger(e)
        },
        searchByName: function(e) {
            this.$el.find(".vc_panel-tabs-control.vc_active").removeClass("vc_active"), this.$el.attr("data-vc-template-search", "true"), this.$el.find("[data-template_name]").css("display", "none"), this.$el.find('[data-template_name*="' + vc_slugify(e) + '"]').css("display", "block"), this.$el.find('[data-vc-ui-element="panel-edit-element-tab"]').each(function() {
                var e = a(this);
                e.removeClass("vc-search-result-empty"), e.find("[data-template_name]:visible").length || e.addClass("vc-search-result-empty")
            })
        }
    }
})(window.jQuery);
(s => {
    window.vc.HelperPanelViewResizable = {
        sizeInitialized: !1,
        uiEvents: {
            show: "setSavedSize initResize",
            tabChange: "setDefaultHeightSettings",
            afterMinimize: "setupOnMinimize",
            afterUnminimize: "initResize",
            fixElContainment: "saveUIPanelSizes"
        },
        setDefaultHeightSettings: function() {
            this.$el.css("height", "auto"), this.$el.css("maxHeight", "75vh")
        },
        initResize: function() {
            var i = this;
            this.$el.data("uiResizable") && this.$el.resizable("destroy"), this.$el.resizable({
                minHeight: 240,
                // START UNCODE EDIT
                // minWidth: 380,
                minWidth: 340,
                // END UNCODE EDIT
                resize: function() {
                    i.trigger("resize")
                },
                handles: "n, e, s, w, ne, se, sw, nw",
                start: function(e, t) {
                    i.trigger("beforeResizeStart"), i.$el.css("maxHeight", "none"), i.$el.css("height", t.size.height), s("iframe").css("pointerEvents", "none"), i.trigger("afterResizeStart")
                },
                stop: function() {
                    i.trigger("beforeResizeStop"), s("iframe").css("pointerEvents", ""), i.saveUIPanelSizes(), i.trigger("afterResizeStop")
                }
            }), this.content().addClass("vc_properties-list-init"), this.trigger("resize")
        },
        setSavedSize: function() {
            if (this.setDefaultHeightSettings(), vc.is_mobile) return !1;
            var e = {
                width: getUserSetting(this.panelName + "_vcUIPanelWidth"),
                left: getUserSetting(this.panelName + "_vcUIPanelLeft").replace("minus", "-"),
                top: getUserSetting(this.panelName + "_vcUIPanelTop").replace("minus", "-")
            };
            _.isEmpty(e.width) || this.$el.width(e.width), _.isEmpty(e.left) || this.$el.css("left", e.left), _.isEmpty(e.top) || this.$el.css("top", e.top), this.sizeInitialized = !0
        },
        saveUIPanelSizes: function() {
            if (!1 === this.sizeInitialized) return !1;
            var e = {
                width: this.$el.width(),
                left: parseInt(this.$el.css("left"), 10),
                top: parseInt(this.$el.css("top"), 10)
            };
            setUserSetting(this.panelName + "_vcUIPanelWidth", e.width), setUserSetting(this.panelName + "_vcUIPanelLeft", e.left.toString().replace("-", "minus") + "px"), setUserSetting(this.panelName + "_vcUIPanelTop", e.top.toString().replace("-", "minus") + "px")
        },
        setupOnMinimize: function() {
            this.$el.data("uiResizable") && this.$el.resizable("destroy"), this.$el.resizable({
                minWidth: 380,
                handles: "w, e",
                start: function() {
                    s("iframe").css("pointerEvents", "none")
                },
                stop: function() {
                    s("iframe").css("pointerEvents", "")
                }
            })
        }
    }
})(window.jQuery);
window.vc.HelperPanelViewDraggable = {
    draggable: !0,
    draggableOptions: {
        iframeFix: !0,
        handle: '[data-vc-ui-element="panel-heading"]'
    },
    uiEvents: {
        show: "initDraggable"
    },
    initDraggable: function() {
        this.$el.draggable(_.extend({}, this.draggableOptions, {
            start: this.fixElContainment,
            stop: this.fixElContainment
        }))
    }
};
window.vc.HelperPanelTabs = {
    switchActiveTab: function(e, a) {
        e.find('[data-vc-ui-element="panel-tabs-controls"] .vc_active:not([data-vc-ui-element="panel-tabs-line-dropdown"])').removeClass("vc_active"), a.parent().addClass("vc_active"), e.find('[data-vc-ui-element="panel-edit-element-tab"].vc_active').removeClass("vc_active")
    }
};
(l => {
    window.vc.TemplateWindowUIPanelBackendEditor = vc.TemplatesPanelViewBackend.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperTemplatesPanelViewSearch).extend({
        panelName: "template_window",
        showMessageDisabled: !1,
        initialize: function() {
            window.vc.TemplateWindowUIPanelBackendEditor.__super__.initialize.call(this), this.trigger("show", this.initTemplatesTabs, this)
        },
        show: function() {
            this.clearSearch(), window.vc.TemplateWindowUIPanelBackendEditor.__super__.show.call(this)
        },
        initTemplatesTabs: function() {
            this.$el.find('[data-vc-ui-element="panel-tabs-controls"]').vcTabsLine("moveTabs")
        },
        showMessage: function(e, t) {
            var a;
            if (this.showMessageDisabled) return !1;
            a = "vc_col-xs-12 wpb_element_wrapper", this.message_box_timeout && (this.$el.find("[data-vc-panel-message]").remove(), window.clearTimeout(this.message_box_timeout)), this.message_box_timeout = !1;
            var i, c = vc.template('<div class="vc_message_box vc_message_box-standard vc_message_box-rounded vc_color-<%- color %>"><div class="vc_message_box-icon"><i class="fa fa fa-<%- icon %>"></i></div><p><%- text %></p></div>');
            switch (t) {
                case "error":
                    i = l('<div class="' + a + '" data-vc-panel-message>').html(c({
                        color: "danger",
                        icon: "times",
                        text: e
                    }));
                    break;
                case "warning":
                    i = l('<div class="' + a + '" data-vc-panel-message>').html(c({
                        color: "warning",
                        icon: "exclamation-triangle",
                        text: e
                    }));
                    break;
                case "success":
                    i = l('<div class="' + a + '" data-vc-panel-message>').html(c({
                        color: "success",
                        icon: "check",
                        text: e
                    }))
            }
            i.prependTo(this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_row.vc_active')), i.fadeIn(), this.message_box_timeout = window.setTimeout(function() {
                i.remove()
            }, 6e3)
        },
        changeTab: function(e) {
            e && e.preventDefault && e.preventDefault(), e && !e.isClearSearch && this.clearSearch();
            e = l(e.currentTarget);
            e.parent().hasClass("vc_active") || (this.$el.find('[data-vc-ui-element="panel-tabs-controls"] .vc_active:not([data-vc-ui-element="panel-tabs-line-dropdown"])').removeClass("vc_active"), e.parent().addClass("vc_active"), this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_active').removeClass("vc_active"), this.$el.find(e.data("vcUiElementTarget")).addClass("vc_active"), this.$tabsMenu && this.$tabsMenu.vcTabsLine("checkDropdownContainerActive"))
        },
        setPreviewFrameHeight: function(e, t) {
            parseInt(t, 10) < 100 && (t = 100), l('data-vc-template-preview-frame="' + e + '"').height(t)
        }
    }), window.vc.TemplateWindowUIPanelBackendEditor.prototype.events = l.extend(!0, window.vc.TemplateWindowUIPanelBackendEditor.prototype.events, {
        'click [data-vc-ui-element="button-save"]': "save",
        'click [data-vc-ui-element="button-close"]': "hide",
        'touchstart [data-vc-ui-element="button-close"]': "hide",
        'click [data-vc-ui-element="button-minimize"]': "toggleOpacity",
        "keyup [data-vc-templates-name-filter]": "searchTemplate",
        "search [data-vc-templates-name-filter]": "searchTemplate",
        "click .vc_template-save-btn": "saveTemplate",
        "click [data-template_id] [data-template-handler]": "loadTemplate",
        'click [data-vc-container=".vc_ui-list-bar"][data-vc-preview-handler]': "buildTemplatePreview",
        'click [data-vc-ui-delete="template-title"]': "removeTemplate",
        'click [data-vc-ui-element="panel-tab-control"]': "changeTab"
    }), window.vc.TemplateWindowUIPanelFrontendEditor = vc.TemplatesPanelViewFrontend.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperTemplatesPanelViewSearch).extend({
        panelName: "template_window",
        showMessageDisabled: !1,
        show: function() {
            this.clearSearch(), window.vc.TemplateWindowUIPanelFrontendEditor.__super__.show.call(this)
        },
        showMessage: function(e, t) {
            if (this.showMessageDisabled) return !1;
            this.message_box_timeout && (this.$el.find("[data-vc-panel-message]").remove(), window.clearTimeout(this.message_box_timeout)), this.message_box_timeout = !1;
            var a, i = vc.template('<div class="vc_message_box vc_message_box-standard vc_message_box-rounded vc_color-<%- color %>"><div class="vc_message_box-icon"><i class="fa fa fa-<%- icon %>"></i></div><p><%- text %></p></div>'),
                c = "vc_col-xs-12 wpb_element_wrapper";
            switch (t) {
                case "error":
                    a = l('<div class="' + c + '" data-vc-panel-message>').html(i({
                        color: "danger",
                        icon: "times",
                        text: e
                    }));
                    break;
                case "warning":
                    a = l('<div class="' + c + '" data-vc-panel-message>').html(i({
                        color: "warning",
                        icon: "exclamation-triangle",
                        text: e
                    }));
                    break;
                case "success":
                    a = l('<div class="' + c + '" data-vc-panel-message>').html(i({
                        color: "success",
                        icon: "check",
                        text: e
                    }))
            }
            a.prependTo(this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_row.vc_active')), a.fadeIn(), this.message_box_timeout = window.setTimeout(function() {
                a.remove()
            }, 6e3)
        },
        changeTab: function(e) {
            e && e.preventDefault && e.preventDefault(), e && !e.isClearSearch && this.clearSearch();
            e = l(e.currentTarget);
            e.parent().hasClass("vc_active") || (this.$el.find('[data-vc-ui-element="panel-tabs-controls"] .vc_active:not([data-vc-ui-element="panel-tabs-line-dropdown"])').removeClass("vc_active"), e.parent().addClass("vc_active"), this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_active').removeClass("vc_active"), this.$el.find(e.data("vcUiElementTarget")).addClass("vc_active"), this.$tabsMenu && this.$tabsMenu.vcTabsLine("checkDropdownContainerActive"))
        }
    }), l.fn.vcAccordion.Constructor.prototype.collapseTemplate = function(t) {
        var a, i, c, e = this.$element,
            s = 0,
            n = this.getContainer().find("[data-vc-preview-handler]").each(function() {
                var e = l(this),
                    t = e.data("vc.accordion");
                void 0 === t && (e.vcAccordion(), t = e.data("vc.accordion")), t && t.setIndex && t.setIndex(s++)
            }).filter(function() {
                var e = l(this).data("vc.accordion");
                return e.getTarget().hasClass(e.activeClass)
            }).filter(function() {
                return e[0] !== this
            });
        n.length && l.fn.vcAccordion.call(n, "hide"), this.isActive() ? l.fn.vcAccordion.call(e, "hide") : (l.fn.vcAccordion.call(e, "show"), a = e.closest(".vc_ui-list-bar-item"), i = e.closest("[data-template_id]"), c = i.closest("[data-vc-ui-element=panel-content]").parent(), setTimeout(function() {
            var e;
            Math.round(i.offset().top - c.offset().top) < 0 && (e = Math.round(i.offset().top - c.offset().top + c.scrollTop() - a.height()), c.animate({
                scrollTop: e
            }, 400)), "function" == typeof t && t(i, c)
        }, 400))
    }
})(window.jQuery);
(o => {
    window.vc.element_start_index = 0, window.vc.AddElementUIPanelBackendEditor = vc.PanelView.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperPanelTabs).extend({
        el: "#vc_ui-panel-add-element",
        searchSelector: "#vc_elements_name_filter",
        prepend: !1,
        builder: "",
        events: {
            'click [data-vc-ui-element="button-close"]': "hide",
            'touchstart [data-vc-ui-element="button-close"]': "hide",
            "click .vc_shortcode-link": "createElement",
            "keyup #vc_elements_name_filter": "handleFiltering",
            "search #vc_elements_name_filter": "handleFiltering",
            "cut #vc_elements_name_filter": "handleFiltering",
            "paste #vc_elements_name_filter": "handleFiltering",
            "click [data-vc-manage-elements]": "openPresetWindow",
            'click [data-vc-ui-element="panel-tab-control"]': "changeTab"
        },
        changeTab: function(e) {
            e && e.preventDefault && e.preventDefault();
            var t = o(e.currentTarget);
            t.parent().hasClass("vc_active") || (this.switchActiveTab(this.$el, t), this.trigger("tabChange"), this.$tabsMenu && this.$tabsMenu.vcTabsLine("checkDropdownContainerActive")), this.handleFiltering(e)
        },
        initialize: function() {
            window.vc.AddElementUIPanelBackendEditor.__super__.initialize.call(this), window.vc.events.on("vc:savePreset", this.updateAddElementPopUp.bind(this)), window.vc.events.on("vc:deletePreset", this.removePresetFromAddElementPopUp.bind(this))
        },
        render: function(e, t) {
            return _.isUndefined(vc.ShortcodesBuilder) || (this.builder = new vc.ShortcodesBuilder), this.$el.is(":hidden") && window.vc.closeActivePanel(), (window.vc.active_panel = this).prepend = !!_.isBoolean(t) && t, this.place_after_id = !!_.isString(t) && t, this.model = !!_.isObject(e) && e, this.$content = this.$el.find('[data-vc-ui-element="panel-add-element-list"]'), this.$buttons = o('[data-vc-ui-element="add-element-button"]', this.$content), this.buildFiltering(), this.$el.find('[data-vc-ui-element="panel-tab-control"]').eq(0).click(), this.show(), this.$el.find('[data-vc-ui-element="panel-tabs-controls"]').vcTabsLine("moveTabs"), vc.is_mobile || o(this.searchSelector).trigger("focus"), vc.AddElementUIPanelBackendEditor.__super__.render.call(this)
        },
        buildFiltering: function() {
            var e, t, i, n = '[data-vc-ui-element="add-element-button"]',
                a = this._getNotIn(this.model ? this.model.get("shortcode") : "");
            o(this.searchSelector).val(""), this.$content.addClass("vc_filter-all"), this.$content.attr("data-vc-ui-filter", "*"), t = !(!(e = this.model ? this.model.get("shortcode") : "vc_column") || _.isUndefined(vc.getMapped(e).as_parent)) && vc.getMapped(e).as_parent, _.isObject(t) ? (i = [], _.isString(t.only) && i.push(_.reduce(t.only.replace(/\s/, "").split(","), function(e, t) {
                return e + (_.isEmpty(e) ? "" : ",") + '[data-element="' + t.trim() + '"]'
            }, "")), _.isString(t.except) && i.push(_.reduce(t.except.replace(/\s/, "").split(","), function(e, t) {
                return e + ':not([data-element="' + t.trim() + '"])'
            }, "")), n += i.join(",")) : a && (n = a), !1 === e || _.isUndefined(vc.getMapped(e).allowed_container_element) || (!1 === vc.getMapped(e).allowed_container_element ? n += ":not([data-is-container=true])" : _.isString(vc.getMapped(e).allowed_container_element) && (n += ":not([data-is-container=true]), [data-element=" + vc.getMapped(e).allowed_container_element + "]")), this.$buttons.removeClass("vc_visible").addClass("vc_inappropriate"), o(n, this.$content).removeClass("vc_inappropriate").addClass("vc_visible"), this.hideEmptyFilters()
        },
        hideEmptyFilters: function() {
            var e = this;
            this.$el.find('[data-vc-ui-element="panel-add-element-tab"].vc_active').removeClass("vc_active"), this.$el.find('[data-vc-ui-element="panel-add-element-tab"]:first').addClass("vc_active"), this.$el.find("[data-filter]").each(function() {
                o(o(this).data("filter") + ".vc_visible:not(.vc_inappropriate)", e.$content).length ? o(this).parent().show() : o(this).parent().hide()
            })
        },
        _getNotIn: _.memoize(function(n) {
            return '[data-vc-ui-element="add-element-button"]:not(' + _.reduce(vc.map, function(e, t) {
                var i = _.isEmpty(e) ? "" : ",";
                return _.isObject(t.as_child) ? (_.isString(t.as_child.only) && !_.contains(t.as_child.only.replace(/\s/, "").split(","), n) && (e += i + "[data-element=" + t.base + "]"), _.isString(t.as_child.except) && _.contains(t.as_child.except.replace(/\s/, "").split(","), n) && (e += i + "[data-element=" + t.base + "]")) : !1 === t.as_child && (e += i + "[data-element=" + t.base + "]"), e
            }, "") + ")"
        }),
        handleFiltering: function(e) {
            "cut" == e.type || "paste" === e.type ? setTimeout(function() {
                this.filterElements(e)
            }.bind(this), 0) : (e ? (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()) : e = window.event, this.filterElements(e))
        },
        filterElements: function(e) {
            var t = o(e.currentTarget),
                i = '[data-vc-ui-element="add-element-button"]',
                n = o(this.searchSelector).val();
            this.$content.removeClass("vc_filter-all");
            t.closest(".vc_ui-tabs-line").parent().find('[data-vc-ui-element="panel-add-element-tab"].vc_active').removeClass("vc_active"), t.is("[data-filter]") ? (t.parent().addClass("vc_active"), i += t = t.data("filter"), "*" === t ? this.$content.addClass("vc_filter-all") : this.$content.removeClass("vc_filter-all"), this.$content.attr("data-vc-ui-filter", t.replace(".js-category-", "")), o(this.searchSelector).val("")) : n.length ? (i += ':containsi("' + n + '"):not(".vc_element-deprecated")', this.$content.attr("data-vc-ui-filter", "name:" + n)) : (n.length, o('[data-vc-ui-element="panel-tab-control"][data-filter="*"]').parent().addClass("vc_active"), this.$content.attr("data-vc-ui-filter", "*").addClass("vc_filter-all")), o(".vc_visible", this.$content).removeClass("vc_visible"), o(i, this.$content).addClass("vc_visible"), n.length && 13 === (e.keyCode || e.which) && 1 === (t = o(".vc_visible:not(.vc_inappropriate)", this.$content)).length && t.find("[data-vc-clickable]").click();
            var a = !1,
                i = o(".vc-panel-no-results-message");
            this.$content.find(".wpb-content-layouts").each(function() {
                var e = o(this);
                0 < e.find(".vc_visible").length ? (e.closest(".vc_clearfix").show(), a = !0) : e.closest(".vc_clearfix").hide()
            }), a ? i.hide() : i.show()
        },
        createElement: function(e) {
            var t, i, n, a, s, r, d, c, l;
            e && e.preventDefault && e.preventDefault(), d = (e = o(e.currentTarget)).data("tag"), r = {}, s = {
                width: "1/1"
            }, (e = e.closest("[data-preset]")) && (c = e.data("preset"), l = e.data("element")), !1 === this.model ? (window.vc.storage.lock(), "vc_section" === d ? (e = {
                shortcode: d
            }, c && "vc_section" === l && (e.preset = c), i = vc.shortcodes.create(e)) : (e = {
                shortcode: "vc_row",
                params: r
            }, c && l === d && (e.preset = c), e = {
                shortcode: "vc_column",
                params: s,
                parent_id: (a = vc.shortcodes.create(e)).id,
                root_id: a.id
            }, c && "vc_column" === l && (e.preset = c), n = vc.shortcodes.create(e), i = a, "vc_row" !== d && (t = {
                shortcode: d,
                parent_id: n.id,
                root_id: a.id
            }, c && l === d && (t.preset = c), i = vc.shortcodes.create(t)))) : i = "vc_row" === d ? (n = "vc_section" === this.model.get("shortcode") ? (window.vc.storage.lock(), a = vc.shortcodes.create({
                shortcode: "vc_row",
                params: r,
                parent_id: this.model.id,
                order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.getNextOrder()
            }), vc.shortcodes.create({
                shortcode: "vc_column",
                params: s,
                parent_id: a.id,
                root_id: a.id
            })) : (e = {}, r = {
                width: "1/1"
            }, window.vc.storage.lock(), a = vc.shortcodes.create({
                shortcode: "vc_row_inner",
                params: e,
                parent_id: this.model.id,
                order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.getNextOrder()
            }), vc.shortcodes.create({
                shortcode: "vc_column_inner",
                params: r,
                parent_id: a.id,
                root_id: a.id
            })), a) : (t = {
                shortcode: d,
                parent_id: this.model.id,
                order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.getNextOrder(),
                root_id: this.model.get("root_id")
            }, c && l === d && (t.preset = c), vc.shortcodes.create(t)), this.model = i, window.vc.latestAddedElement = i, s = !(_.isBoolean(vc.getMapped(d).show_settings_on_create) && !1 === vc.getMapped(d).show_settings_on_create), this.model.get("shortcode"), this.hide(), s && this.showEditForm()
        },
        getFirstPositionIndex: function() {
            return --window.vc.element_start_index, vc.element_start_index
        },
        show: function() {
            this.$el.addClass("vc_active"), this.trigger("show")
        },
        hide: function() {
            this.$el.removeClass("vc_active"), window.vc.active_panel = !1, this.trigger("hide")
        },
        showEditForm: function() {
            window.vc.edit_element_block_view.render(this.model, !1, !0)
        },
        updateAddElementPopUp: function(e, t, i, n) {
            var a = this.$el.find('[data-element="' + t + '"]:first').clone(!0);
            vc_all_presets[e] = n, a.find("[data-vc-shortcode-name]").text(i), a.find(".vc_element-description").text(""), a.attr("data-preset", e), a.addClass("js-category-_my_elements_"), a.insertAfter(this.$el.find('[data-element="' + t + '"]:last')), this.$el.find('[data-filter="js-category-_my_elements_"]').show();
            n = this.$body.find('[data-vc-ui-element="panel-preset"] [data-vc-presets-list-content] .vc_ui-template:first').clone(!0);
            n.find('[data-vc-ui-element="template-title"]').attr("title", i).text(i), n.find('[data-vc-ui-delete="preset-title"]').attr("data-preset", e).attr("data-preset-parent", t), n.find("[data-vc-ui-add-preset]").attr("data-preset", e).attr("id", t).attr("data-tag", t), n.show(), n.insertAfter(this.$body.find('[data-vc-ui-element="panel-preset"] [data-vc-presets-list-content] .vc_ui-template:last'))
        },
        removePresetFromAddElementPopUp: function(e) {
            this.$el.find('[data-preset="' + e + '"]').remove()
        },
        openPresetWindow: function(e) {
            e && e.preventDefault && e.preventDefault(), window.vc.preset_panel_view.render().show()
        }
    }), window.vc.AddElementUIPanelFrontendEditor = vc.AddElementUIPanelBackendEditor.vcExtendUI(vc.HelperPanelViewHeaderFooter).extend({
        events: {
            'click [data-vc-ui-element="button-close"]': "hide",
            'touchstart [data-vc-ui-element="button-close"]': "hide",
            "keyup #vc_elements_name_filter": "handleFiltering",
            "search #vc_elements_name_filter": "handleFiltering",
            "cut #vc_elements_name_filter": "handleFiltering",
            "paste #vc_elements_name_filter": "handleFiltering",
            "click .vc_shortcode-link": "createElement",
            'click [data-vc-ui-element="panel-tab-control"]': "changeTab"
        },
        createElement: function(e) {
            var t, i, n, a, s, r, d;
            for (e && e.preventDefault && e.preventDefault(), s = (e = o(e.currentTarget)).data("tag"), a = {}, n = {
                    width: "1/1"
                }, (e = e.closest("[data-preset]")) && (r = e.data("preset"), d = e.data("element")), this.prepend && (window.vc.activity = "prepend"), 0 == this.model ? "vc_section" === s ? (e = {
                    shortcode: s
                }, r && "vc_section" === d && (e.preset = r), this.builder.create(e)) : (e = {
                    shortcode: "vc_row",
                    params: a
                }, r && "vc_row" === d && (e.preset = r), this.builder.create(e), e = {
                    shortcode: "vc_column",
                    parent_id: this.builder.lastID(),
                    params: n
                }, r && "vc_column" === d && (e.preset = r), this.builder.create(e), "vc_row" !== s && (t = {
                    shortcode: s,
                    parent_id: this.builder.lastID()
                }, r && d === s && (t.preset = r), this.builder.create(t))) : "vc_row" === s ? "vc_section" === this.model.get("shortcode") ? this.builder.create({
                    shortcode: "vc_row",
                    params: a,
                    parent_id: this.model.id,
                    order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.nextOrder()
                }).create({
                    shortcode: "vc_column",
                    params: n,
                    parent_id: this.builder.lastID()
                }) : (e = {
                    width: "1/1"
                }, this.builder.create({
                    shortcode: "vc_row_inner",
                    params: {},
                    parent_id: this.model.id,
                    order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.nextOrder()
                }).create({
                    shortcode: "vc_column_inner",
                    params: e,
                    parent_id: this.builder.lastID()
                })) : (t = {
                    shortcode: s,
                    parent_id: this.model.id,
                    order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.nextOrder()
                }, r && d === s && (t.preset = r), this.builder.create(t)), this.model = this.builder.last(), i = this.builder.models.length - 1; 0 <= i; i--) this.builder.models[i].get("shortcode");
            _.isString(vc.getMapped(s).default_content) && vc.getMapped(s).default_content.length && (a = this.builder.parse({}, window.vc.getMapped(s).default_content, this.builder.last().toJSON()), _.each(a, function(e) {
                e.default_content = !0, this.builder.create(e)
            // START UNCODE EDIT
            // }, this)), this.model = this.builder.last(), window.vc.latestAddedElement = this.model, n = !(_.isBoolean(vc.getMapped(s).show_settings_on_create) && !1 === vc.getMapped(s).show_settings_on_create), this.hide(), n && this.showEditForm(), this.builder.render(null, this.model)
                }, this)), this.model = this.builder.last();
                column_params = !(_.isBoolean(vc.getMapped(s).show_settings_on_create) && !1 === vc.getMapped(s).show_settings_on_create), this.hide(), column_params && this.showEditForm(), this.builder.render(null, this.model)
                if (("vc_row" === s || "uncode_slider" === s || "vc_tabs" === s || "vc_accordion" === s || "vc_section" === s || "rev_slider" === s || "woocommerce_cart" === s || "woocommerce_checkout" === s || "woocommerce_order_tracking" === s) && o('body').hasClass('vc-sidebar-switch')) {
                    this.render()
                }
            // END UNCODE EDIT
        }
    })
})(window.jQuery);
(r => {
    window.vc.ExtendPresets = {
        settingsMenuSelector: '[data-vc-ui-element="settings-dropdown-list"]',
        settingsButtonSelector: '[data-vc-ui-element="settings-dropdown-button"]',
        settingsDropdownSelector: '[data-vc-ui-element="settings-dropdown"]',
        settingsPresetId: null,
        uiEvents: {
            init: "addEvents",
            render: "hideDropdown",
            afterRender: "afterRenderActions"
        },
        afterRenderActions: function() {
            this.untaintSettingsPresetData(), this.showDropdown()
        },
        hideDropdown: function() {
            this.$el.find('[data-vc-ui-element="settings-dropdown"]').hide()
        },
        showDropdown: function() {
            var t = this.model.get("shortcode");
            window.vc_settings_show && "vc_column" !== t && this.$el.find('[data-vc-ui-element="settings-dropdown"]').show()
        },
        showDropdownMenu: function() {
            var t = this.model.get("shortcode"),
                e = r(this);
            e.data("vcSettingsMenuLoaded") && t === e.data("vcShortcodeName") || this.reloadSettingsMenuContent()
        },
        addEvents: function() {
            var t = this.$el.find(".vc_edit-form-tab.vc_active"),
                e = this.model.get("shortcode"),
                i = this;
            r(document).off("beforeMinimize.vc.paramWindow", this.minimizeButtonSelector).on("beforeMinimize.vc.paramWindow", this.minimizeButtonSelector, function() {
                t.find(".vc_ui-prompt-presets .vc_ui-prompt-close").trigger("click")
            }), r(document).off("close.vc.paramWindow", this.closeButtonSelector).on("beforeClose.vc.paramWindow", this.closeButtonSelector, function() {
                t.find(".vc_ui-prompt-presets .vc_ui-prompt-close").trigger("click")
            }), r(document).off("show.vc.accordion", this.settingsButtonSelector).on("show.vc.accordion", this.settingsButtonSelector, function() {
                var t = r(this);
                t.data("vcSettingsMenuLoaded") && e === t.data("vcShortcodeName") || i.reloadSettingsMenuContent()
            })
        },
        saveSettingsAjaxData: function(t, e, i, s) {
            return {
                action: "vc_action_save_settings_preset",
                shortcode_name: t,
                is_default: i ? 1 : 0,
                vc_inline: !0,
                title: e,
                data: s,
                _vcnonce: window.vcAdminNonce
            }
        },
        saveSettings: function(t, e) {
            var i = this.model.get("shortcode"),
                s = JSON.stringify(this.getParamsForSettingsPreset());
            if (void 0 !== t && t.length) return void 0 === e && (e = !1), this.checkAjax(), this.ajax = r.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.saveSettingsAjaxData(i, t, e, s),
                context: this
            }).done(function(t) {
                t.success && (this.setSettingsMenuContent(t.html), this.settingsPresetId = t.id, this.untaintSettingsPresetData())
            }).always(this.resetAjax), this.ajax
        },
        fetchSaveSettingsDialogAjaxData: function() {
            return {
                action: "vc_action_render_settings_preset_title_prompt",
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        fetchSaveSettingsDialog: function(e) {
            var i = this.$el.find(".vc_ui-panel-content-container");
            i.find(".vc_ui-prompt-presets").length ? void 0 !== e && e(!1) : (this.checkAjax(), this.ajax = r.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.fetchSaveSettingsDialogAjaxData()
            }).done(function(t) {
                t.success && (i.prepend(t.html), void 0 !== e) && e(!0)
            }).fail(function() {
                void 0 !== e && e(!1)
            }).always(this.resetAjax))
        },
        showSaveSettingsDialog: function(t) {
            var d = this;
            this.isSettingsPresetDefault = !!t, this.fetchSaveSettingsDialog(function(t) {
                var s, n, a = d.$el.find(".vc_ui-panel-content-container"),
                    o = a.find(".vc_ui-prompt-presets"),
                    c = o.find(".textfield"),
                    e = (a.find(".vc_ui-prompt.vc_visible").removeClass("vc_visible"), o.find("[data-vc-view-settings-preset]"));
                "undefined" !== window.vc_vendor_settings_presets[d.model.get("shortcode")] ? e.removeAttr("disabled") : e.attr("disabled", "disabled"), o.addClass("vc_visible"), c.trigger("focus"), a.addClass("vc_ui-content-hidden"), t && (s = o.find("#vc_ui-save-preset-btn"), n = 0, o.on("submit", function() {
                    var i = c.val();
                    return i.length && d.saveSettings(i, d.isSettingsPresetDefault).done(function(t) {
                        var e = this.getParamsForSettingsPreset();
                        c.val(""), d.setCustomButtonMessage(s, void 0, void 0, !0), vc.events.trigger("vc:savePreset", t.id, d.model.get("shortcode"), i, e), n = _.delay(function() {
                            o.removeClass("vc_visible"), a.removeClass("vc_ui-content-hidden")
                        }, 5e3)
                    }).fail(function() {
                        d.setCustomButtonMessage(s, window.i18nLocale.ui_danger, "danger", !0)
                    }), !1
                }), o.on("click", ".vc_ui-prompt-close", function() {
                    return d.checkAjax(), o.removeClass("vc_visible"), a.removeClass("vc_ui-content-hidden"), d.clearCustomButtonMessage.call(this, s), n && (window.clearTimeout(n), n = 0), !1
                }), r(".edit-form-info").initializeTooltips())
            })
        },
        loadSettingsAjaxData: function(t) {
            return {
                action: "vc_action_get_settings_preset",
                vc_inline: !0,
                id: t,
                _vcnonce: window.vcAdminNonce
            }
        },
        loadSettings: function(e) {
            return this.panelInit = !1, this.checkAjax(), this.ajax = r.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.loadSettingsAjaxData(e),
                context: this
            }).done(function(t) {
                t.success && (this.settingsPresetId = e, this.applySettingsPreset(t.data))
            }).always(this.resetAjax), this.ajax
        },
        saveAsDefaultSettingsAjaxData: function(t, e) {
            return {
                action: "vc_action_set_as_default_settings_preset",
                shortcode_name: t,
                id: e,
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        saveAsDefaultSettings: function(t, e) {
            var i = this.model.get("shortcode"),
                t = t || this.settingsPresetId;
            t ? (this.checkAjax(), this.ajax = r.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.saveAsDefaultSettingsAjaxData(i, t),
                context: this
            }).done(function(t) {
                t.success && (this.setSettingsMenuContent(t.html), this.untaintSettingsPresetData(), e) && e()
            }).always(this.resetAjax)) : this.showSaveSettingsDialog(!0)
        },
        restoreDefaultSettingsAjaxData: function(t) {
            return {
                action: "vc_action_restore_default_settings_preset",
                shortcode_name: t,
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        restoreDefaultSettings: function() {
            var t = this.model.get("shortcode");
            this.checkAjax(), this.ajax = r.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.restoreDefaultSettingsAjaxData(t),
                context: this
            }).done(function(t) {
                t.success && this.setSettingsMenuContent(t.html)
            }).always(this.resetAjax)
        },
        setSettingsMenuContent: function(t) {
            var e = this.$el.find(this.settingsButtonSelector),
                i = this.$el.find(this.settingsMenuSelector),
                s = this.model.get("shortcode"),
                n = this;
            e.data("vcShortcodeName", s), i.html(t), window.vc_presets_data && 0 < window.vc_presets_data.presetsCount ? i.find("[data-vc-view-settings-preset]").removeAttr("disabled") : i.find("[data-vc-view-settings-preset]").attr("disabled", "disabled"), i.find("[data-vc-view-settings-preset]").on("click", function() {
                n.showViewSettingsList(), n.closeSettings()
            }), i.find("[data-vc-save-settings-preset]").on("click", function() {
                n.showSaveSettingsDialog(), n.closeSettings()
            }), i.find("[data-vc-save-template]").on("click", function() {
                n.showSaveTemplateDialog(), n.closeSettings()
            }), i.find("[data-vc-save-default-settings-preset]").on("click", function() {
                n.saveAsDefaultSettings(), n.closeSettings()
            }), i.find("[data-vc-restore-default-settings-preset]").on("click", function() {
                n.restoreDefaultSettings(), n.closeSettings()
            })
        },
        reloadSettingsMenuContentAjaxData: function(t) {
            return {
                action: "vc_action_render_settings_preset_popup",
                shortcode_name: t,
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        showViewSettingsList: function() {
            var e, t, i, s = this.$el.find(".vc_ui-panel-content-container");
            s.find(".vc_ui-prompt-view-presets:not(.vc_visible)").remove(), s.find(".vc_ui-prompt-view-presets").length || (s.find(".vc_ui-prompt.vc_visible").removeClass("vc_visible"), e = this, t = jQuery('<form class="vc_ui-prompt vc_ui-prompt-view-presets"><div class="vc_ui-prompt-controls"><button type="button" class="vc_general vc_ui-control-button vc_ui-prompt-close"><i class="vc-composer-icon vc-c-icon-close"></i></button></div><div class="vc_ui-prompt-title"><label for="prompt_title" class="wpb_element_label">Elements</label></div><div class="vc_ui-prompt-content"><div class="vc_ui-prompt-column"><div class="vc_ui-template-list vc_ui-list-bar" data-vc-action="collapseAll" style="margin-top: 20px;" data-vc-presets-list-content></div></div></div>'), this.buildsettingsListContent(t), t.appendTo(s), t.addClass("vc_visible"), s.addClass("vc_ui-content-hidden"), i = function() {
                return t.remove(), s.removeClass("vc_ui-content-hidden"), !1
            }, t.off("click.vc1").on("click.vc1", "[data-vc-load-settings-preset]", function(t) {
                e.loadSettings(r(t.currentTarget).data("vcLoadSettingsPreset")), i()
            }), t.off("click.vc4").on("click.vc4", "[data-vc-set-default-settings-preset]", function() {
                e.saveAsDefaultSettings(r(this).data("vcSetDefaultSettingsPreset"), function() {
                    e.buildsettingsListContent(t)
                })
            }), t.off("click.vc3").on("click.vc3", ".vc_ui-prompt-close", function() {
                i(), e.checkAjax()
            }))
        },
        buildsettingsListContent: function(t) {
            var s = vc.template('<div class="vc_ui-template"><div class="vc_ui-list-bar-item"><button class="vc_ui-list-bar-item-trigger" title="Apply Element" type="button" data-vc-load-settings-preset="<%- id %>"><%- title %></button><div class="vc_ui-list-bar-item-actions"><button class="vc_general vc_ui-control-button" title="Apply Element" type="button" data-vc-load-settings-preset="<%- id %>"><i class="vc-composer-icon vc-c-icon-add"></i></button><button class="vc_general vc_ui-control-button" title="Delete Element" type="button" data-vc-delete-settings-preset="<%- id %>"><i class="vc-composer-icon vc-c-icon-delete_empty"></i></button></div></div></div>'),
                n = t.find("[data-vc-presets-list-content]");
            n.empty(), _.each(window.vc_presets_data.presets[0], function(t, e) {
                var i = t;
                0 < window.vc_presets_data.defaultId && parseInt(e, 10) === window.vc_presets_data.defaultId && (i = t + " (default)"), n.append(s({
                    title: i,
                    id: e
                }))
            }), _.each(window.vc_presets_data.presets[1], function(t, e) {
                var i = t;
                0 < window.vc_presets_data.defaultId && parseInt(e, 10) === window.vc_presets_data.defaultId && (i = t + " (default)"), n.append(s({
                    title: i,
                    id: e
                }))
            })
        },
        reloadSettingsMenuContent: function() {
            var t = this.model.get("shortcode"),
                e = this.$el.find(this.settingsButtonSelector),
                i = !1;
            return this.setSettingsMenuContent(""), this.checkAjax(), this.ajax = r.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.reloadSettingsMenuContentAjaxData(t),
                context: this
            }).done(function(t) {
                t.success && (i = !0, this.setSettingsMenuContent(t.html), e.data("vcSettingsMenuLoaded", !0))
            }).always(function() {
                i || this.closeSettings(), this.resetAjax()
            }), this.ajax
        },
        closeSettings: function(t) {
            void 0 === t && (t = !1);
            var e = this.$el.find(this.settingsMenuSelector),
                i = this.$el.find(this.settingsButtonSelector);
            t && (i.data("vcSettingsMenuLoaded", !1), e.html("")), i.vcAccordion("hide")
        },
        isSettingsPresetDataTainted: function() {
            var t = (t = JSON.stringify(this.getParamsForSettingsPreset())).replace(/vc_custom_\d+/, "");
            return this.$el.data("vcSettingsPresetHash") !== vc_globalHashCode(t)
        },
        untaintSettingsPresetData: function() {
            var t = (t = JSON.stringify(this.getParamsForSettingsPreset())).replace(/vc_custom_\d+/, "");
            this.$el.data("vcSettingsPresetHash", vc_globalHashCode(t))
        },
        applySettingsPresetAjaxData: function(t) {
            var e = this.model.get("parent_id");
            return {
                action: "vc_edit_form",
                tag: this.model.get("shortcode"),
                parent_tag: e ? vc.shortcodes.get(e).get("shortcode") : null,
                post_id: vc_post_id,
                params: t,
                _vcnonce: window.vcAdminNonce
            }
        },
        applySettingsPreset: function(t) {
            return this.currentModelParams = t, vc.events.trigger("presets:apply", this.model, t), this._killEditor(), this.trigger("render"), this.show(), this.checkAjax(), this.ajax = r.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: this.applySettingsPresetAjaxData(t),
                context: this
            }).done(this.buildParamsContent).always(this.resetAjax), this
        },
        getParamsForSettingsPreset: function() {
            var t = this.model.get("shortcode"),
                e = this.getParams();
            return "vc_column" !== t && "vc_column_inner" !== t || (delete e.width, delete e.offset), e
        }
    }, vc.events.on("presets.apply", function(t, e) {
        return "vc_tta_section" === t.get("shortcode") && void 0 !== e.tab_id && (e.tab_id = vc_guid() + "-cl"), e
    })
})(window.jQuery);
(e => {
    window.vc.ExtendTemplates = {
        fetchSaveTemplateDialogAjaxData: function() {
            return {
                action: "vc_action_render_settings_templates_prompt",
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        fetchSaveTemplateDialog: function(t) {
            var n = this.$el.find(".vc_ui-panel-content-container");
            if (!n.find(".vc_ui-prompt-templates").length) return this.checkAjax(), this.ajax = e.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.fetchSaveTemplateDialogAjaxData()
            }).done(function(e) {
                e.success && (n.prepend(e.html), void 0 !== t) && t(!0)
            }).always(this.resetAjax), this.ajax;
            void 0 !== t && t(!1)
        },
        showSaveTemplateDialog: function() {
            var c = this;
            this.fetchSaveTemplateDialog(function(e) {
                var t, n, i = c.$el.find(".vc_ui-panel-content-container"),
                    a = i.find(".vc_ui-prompt-templates"),
                    o = a.find(".textfield");
                i.find(".vc_ui-prompt.vc_visible").removeClass("vc_visible"), a.addClass("vc_visible"), o.trigger("focus"), i.addClass("vc_ui-content-hidden"), e && (t = 0, n = a.find("#vc_ui-save-templates-btn"), a.on("submit", function() {
                    var e = o.val();
                    c.$el.find(c.settingsButtonSelector);
                    return e.length && (e = {
                        action: vc.templates_panel_view.save_template_action,
                        template: vc.shortcodes.singleStringify(c.model.get("id"), "template"),
                        template_name: e,
                        vc_inline: !0,
                        _vcnonce: window.vcAdminNonce
                    }, vc.templates_panel_view.reloadTemplateList(e, function() {
                        o.val(""), c.setCustomButtonMessage(n, void 0, void 0, !0), t = _.delay(function() {
                            a.removeClass("vc_visible"), i.removeClass("vc_ui-content-hidden")
                        }, 5e3)
                    }, function() {
                        c.setCustomButtonMessage(n, window.i18nLocale.ui_danger, "danger")
                    })), !1
                }), a.on("click", ".vc_ui-prompt-close", function() {
                    return c.checkAjax(), a.removeClass("vc_visible"), i.removeClass("vc_ui-content-hidden"), c.clearCustomButtonMessage.call(this, n), t && (window.clearTimeout(t), t = 0), !1
                }))
            })
        }
    }
})(window.jQuery);
(l => {
    window.vc.EditElementPanelView = vc.PanelView.vcExtendUI(vc.HelperAjax).vcExtendUI(vc.ExtendPresets).vcExtendUI(vc.ExtendTemplates).vcExtendUI(vc.HelperPrompts).extend({
        panelName: "edit_element",
        el: "#vc_properties-panel",
        contentSelector: ".vc_ui-panel-content.vc_properties-list",
        minimizeButtonSelector: '[data-vc-ui-element="button-minimize"]',
        closeButtonSelector: '[data-vc-ui-element="button-close"]',
        titleSelector: ".vc_panel-title",
        tabsInit: !1,
        doCheckTabs: !0,
        $tabsMenu: !1,
        dependent_elements: {},
        mapped_params: {},
        draggable: !1,
        panelInit: !1,
        $spinner: !1,
        activeTabIndex: 0,
        buttonMessageTimeout: !1,
        notRequestTemplate: !1,
        requiredParamsInitialized: !1,
        currentModelParams: !1,
        customButtonMessageTimeout: !1,
        events: {
            "click [data-save=true]": "save",
            "click [data-dismiss=panel]": "hide",
            "mouseover [data-transparent=panel]": "addOpacity",
            "click [data-transparent=panel]": "toggleOpacity",
            "mouseout [data-transparent=panel]": "removeOpacity"
        },
        formRender: function() {
            var t = this,
                n = null;
            this.$el.find(".vc_edit-form-tab").on("input change", function(e) {
                clearTimeout(n), vc.saveInProcess = !0, n = setTimeout(function() {
                    t.save(e)
                }, 500)
            })
        },
        initialize: function() {
            _.bindAll(this, "setSize", "setTabsSize", "fixElContainment", "hookDependent", "resetAjax", "removeAllPrompts"), this.on("setSize", this.setResize, this), this.on("render", this.resetMinimize, this), this.on("render", this.setTitle, this), this.on("render", this.prepareContentBlock, this), window.vc_auto_save && this.on("afterRender", this.formRender, this), this.on("afterRender", function() {
                l(".edit-form-info").initializeTooltips(), this.reInitJsFunctions()
            }, this)
        },
        reInitJsFunctions: function() {
            try {
                window.vc.frame_window && window.vc.frame_window.vc_js && vc.events.on("shortcodeView:updated", window.vc.frame_window.vc_js)
            } catch (e) {
                console.error("Failed to execute window.vc.frame_window.vc_js function in reInitJsFunctions(): ", e)
            }
        },
        setCustomButtonMessage: function(e, t, n, i) {
            return void 0 === e && (e = this.$el.find('[data-vc-ui-element="button-save"]')), void 0 === i && (i = !1), this.clearCustomButtonMessage = _.bind(this.clearCustomButtonMessage, this), !i && !vc.frame_window || this.customButtonMessageTimeout || (void 0 === t && (t = window.i18nLocale.ui_saved), void 0 === n && (n = "success"), i = e.html(), e.addClass("vc_ui-button-" + n + " vc_ui-button-undisabled").removeClass("vc_ui-button-action").data("vcCurrentTextHtml", i).data("vcCurrentTextType", n).html(t), _.delay(this.clearCustomButtonMessage.bind(this, e), 5e3), this.customButtonMessageTimeout = !0), this
        },
        clearCustomButtonMessage: function(e) {
            var t, n;
            this.customButtonMessageTimeout && (window.clearTimeout(this.customButtonMessageTimeout), n = e.data("vcCurrentTextHtml") || "Save", t = e.data("vcCurrentTextType"), e.html(n).removeClass("vc_ui-button-" + t + " vc_ui-button-undisabled").addClass("vc_ui-button-action"), this.customButtonMessageTimeout = !1)
        },
        render: function(e, t, n) {
            this.$el.is(":hidden") && vc.closeActivePanel(), t && (this.notRequestTemplate = !0), this.model = e, this.currentModelParams = this.model.get("params"), (vc.active_panel = this).resetMinimize(), this.clicked = !1, this.$el.css("height", "auto"), this.$el.css("maxHeight", "75vh"), t = this.model.setting("params") || [], this.$el.attr("data-vc-shortcode", this.model.get("shortcode")), this.tabsInit = !1, this.panelInit = !1, this.activeTabIndex = 0, this.requiredParamsInitialized = !1, this.mapped_params = {}, this.dependent_elements = {}, _.each(t, function(e) {
                this.mapped_params[e.param_name] = e
            }, this), this.trigger("render"), this.show(), this.checkAjax();
            e = this.model.get("id");
            return this.isEditElementPanelCache(e) ? this.buildParamsContent(window.vc.EditElementPanelCache[e]) : this.ajax = l.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: this.ajaxData(n),
                context: this
            }).done(this.buildParamsContent).always(this.resetAjax), this
        },
        prepareContentBlock: function() {
            this.$content = this.notRequestTemplate ? this.$el : this.$el.find(this.contentSelector).removeClass("vc_with-tabs"), this.$content.empty(), this.$spinner = l('<span class="vc_ui-wp-spinner vc_ui-wp-spinner-lg vc_ui-wp-spinner-dark"></span>'), this.$content.prepend(this.$spinner)
        },
        buildParamsContent: function(e) {
            var t, n, i, a = this.model.get("id"),
                a = (this.setEditElementPanelCache(a, e), this.getExternalScriptsFromDataHtml(e)),
                s = (e = this.removeExternalScriptsFromDataHtml(e), (t = (e = l(e)).find('[data-vc-ui-element="panel-tabs-controls"]')).find(".vc_edit-form-tab-control:first-child").addClass("vc_active"), n = this.$el.find('[data-vc-ui-element="panel-header-content"]'), (i = e.find('[data-vc-ui-element="panel-edit-element-tab"]')) && i.addClass("visually-hidden"), n && n.addClass("visually-hidden"), this.$content.html(e)),
                c = (this.loadScriptsSequentially(a, function() {
                    s.append("<script async>window.setTimeout(function(){window.wpb_edit_form_loaded=true;},100);<\/script>")
                }), this.$content.prepend(this.$spinner), t.prependTo(n), this),
                o = 0,
                d = function() {
                    !window.wpb_edit_form_loaded && o < 1e3 ? (o++, setTimeout(d, 100)) : (c.$content.removeAttr("data-vc-param-initialized"), c.activeTabIndex = 0, c.tabsInit = !1, c.panelInit = !1, c.dependent_elements = {}, c.requiredParamsInitialized = !1, c.$content.find("[data-vc-param-initialized]").removeAttr("data-vc-param-initialized"), i.removeClass("visually-hidden"), c.$content.find(".vc_ui-wp-spinner").remove(), c.init(), c.$content.parent().scrollTop(1).scrollTop(0), c.$content.removeClass("vc_properties-list-init"), c.$el.trigger("vcPanel.shown"), c.trigger("afterRender"), vc.events.trigger("editElementPanel:ready"))
                };
            window.setTimeout(d, 10)
        },
        getExternalScriptsFromDataHtml: function(e) {
            for (var t, n = [], i = this.getExternalScriptRegex(); t = i.exec(e);) n.push(t[1]);
            return n
        },
        removeExternalScriptsFromDataHtml: function(e) {
            return e.replace(this.getExternalScriptRegex(), "")
        },
        getExternalScriptRegex: function() {
            return /<script\s+src="([^"]+)"><\/script>/g
        },
        loadScriptsSequentially: function(e, t) {
            var n, i;
            0 === e.length ? t() : (n = e.shift(), (i = document.createElement("script")).src = n, i.onload = function() {
                this.loadScriptsSequentially(e, t)
            }.bind(this), document.head.appendChild(i))
        },
        setEditElementPanelCache: function(e, t) {
            window.vc.EditElementPanelCache || (window.vc.EditElementPanelCache = {}), window.vc.EditElementPanelCache[e] = t
        },
        removeElementEditElementPanelCache: function(e) {
            window.vc.EditElementPanelCache && window.vc.EditElementPanelCache[e] && delete window.vc.EditElementPanelCache[e]
        },
        isEditElementPanelCache: function(e) {
            return window.vc.EditElementPanelCache && window.vc.EditElementPanelCache[e]
        },
        resetMinimize: function() {
            this.$el.removeClass("vc_panel-opacity")
        },
        ajaxData: function(e) {
            var t = this.model.get("parent_id"),
                t = t ? this.model.collection.get(t).get("shortcode") : null,
                n = this.model.get("params"),
                n = _.extend({}, vc.getDefaults(this.model.get("shortcode")), n);
            return {
                action: "vc_edit_form",
                tag: this.model.get("shortcode"),
                parent_tag: t,
                post_id: vc_post_id,
                params: n,
                usage_count: e,
                _vcnonce: window.vcAdminNonce
            }
        },
        init: function() {
            vc.EditElementPanelView.__super__.init.call(this), this.$el.find('[data-vc-ui-element="panel-header-content"]').removeClass("visually-hidden"), this.initParams(), this.initDependency(), l(".wpb_edit_form_elements .textarea_html").each(function() {
                window.init_textarea_html(l(this))
            }), this.trigger("init"), this.panelInit = !0
        },
        initParams: function() {
            var n = this,
                e = this.content().find('#vc_edit-form-tabs [data-vc-ui-element="panel-edit-element-tab"]:eq(' + this.activeTabIndex + ")");
            (e = e.length ? e : this.content()).attr("data-vc-param-initialized") || (l('[data-vc-ui-element="panel-shortcode-param"]', e).each(function() {
                var e, t = l(this);
                t.data("vcInitParam") || (e = t.data("param_settings"), vc.atts.init.call(n, e, t), t.data("vcInitParam", !0))
            }), e.attr("data-vc-param-initialized", !0)), this.requiredParamsInitialized || _.isUndefined(vc.required_params_to_init) || (l('[data-vc-ui-element="panel-shortcode-param"]', this.content()).each(function() {
                var e, t = l(this);
                !t.data("vcInitParam") && -1 < _.indexOf(vc.required_params_to_init, t.data("param_type")) && (e = t.data("param_settings"), vc.atts.init.call(n, e, t), t.data("vcInitParam", !0))
            }), this.requiredParamsInitialized = !0)
        },
        initDependency: function() {
            var a = {};
            _.each(this.mapped_params, function(e) {
                var t, n, i;
                _.isObject(e) && _.isObject(e.dependency) && (t = e.dependency, _.isString(e.dependency.element) && (n = l("[name=" + e.dependency.element + "].wpb_vc_param_value", this.$content), i = l("[name= " + e.param_name + "].wpb_vc_param_value", this.$content), _.each(n, function(e) {
                    var e = l(e),
                        t = e.attr("name");
                    _.isArray(this.dependent_elements[e.attr("name")]) || (this.dependent_elements[e.attr("name")] = []), this.dependent_elements[e.attr("name")].push(i), e.data("dependentSet") || (e.attr("data-dependent-set", "true"), e.off("keyup change", this.hookDependent).on("keyup change", this.hookDependent)), a[t] || (a[t] = e)
                }, this)), _.isString(t.callback)) && window[t.callback].call(this)
            }, this), this.doCheckTabs = !1, _.each(a, function(e) {
                this.hookDependent({
                    currentTarget: e
                })
            }, this), this.doCheckTabs = !0, this.checkTabs(), a = null
        },
        hookDependent: function(e) {
            var i, t = l(e.currentTarget),
                n = t.closest(".vc_column"),
                a = this.dependent_elements[t.attr("name")],
                s = t.is(":checkbox") ? _.map(this.$content.find("[name=" + l(e.currentTarget).attr("name") + "].wpb_vc_param_value:checked"), function(e) {
                    return l(e).val()
                }) : t.val(),
                e = this.doCheckTabs;
            return this.doCheckTabs = !1, i = t.is(":checkbox") ? !this.$content.find("[name=" + t.attr("name") + "].wpb_vc_param_value:checked").length : !s.length, n.hasClass("vc_dependent-hidden") ? _.each(a, function(e) {
                var t = jQuery.Event("change");
                t.extra_type = "vcHookDepended", e.closest(".vc_column").addClass("vc_dependent-hidden"), e.trigger(t)
            }) : _.each(a, function(e) {
                var t = e.attr("name"),
                    t = _.isObject(this.mapped_params[t]) && _.isObject(this.mapped_params[t].dependency) ? this.mapped_params[t].dependency : {},
                    n = e.closest(".vc_column"),
                    t = (_.isBoolean(t.not_empty) && !0 === t.not_empty && !i || _.isBoolean(t.is_empty) && !0 === t.is_empty && i || t.value && _.intersection(_.isArray(t.value) ? t.value : [t.value], _.isArray(s) ? s : [s]).length || t.value_not_equal_to && !_.intersection(_.isArray(t.value_not_equal_to) ? t.value_not_equal_to : [t.value_not_equal_to], _.isArray(s) ? s : [s]).length || t.value_includes && s.includes(t.value_includes) ? n.removeClass("vc_dependent-hidden") : n.addClass("vc_dependent-hidden"), jQuery.Event("change"));
                t.extra_type = "vcHookDepended", e.trigger(t)
            }, this), e && (this.checkTabs(), this.doCheckTabs = !0), this
        },
        checkTabs: function() {
            var n = this;
            !1 === this.tabsInit && (this.tabsInit = !0, this.$content.hasClass("vc_with-tabs")) && (this.$tabsMenu = this.$content.find(".vc_edit-form-tabs-menu")), this.$tabsMenu && (this.$content.find('[data-vc-ui-element="panel-edit-element-tab"]').each(function(e) {
                var t = n.$tabsMenu.find('> [data-tab-index="' + e + '"]');
                l(this).find('[data-vc-ui-element="panel-shortcode-param"]:not(".vc_dependent-hidden")').length ? t.hasClass("vc_dependent-hidden") && (t.removeClass("vc_dependent-hidden").removeClass("vc_tab-color-animated").addClass("vc_tab-color-animated"), window.setTimeout(function() {
                    t.removeClass("vc_tab-color-animated")
                }, 200)) : t.addClass("vc_dependent-hidden")
            }), window.setTimeout(this.setTabsSize, 100))
        },
        setTabsSize: function() {
            this.$tabsMenu.parents(".vc_with-tabs.vc_panel-body").css("margin-top", this.$tabsMenu.outerHeight())
        },
        setActive: function() {
            this.$el.prev().addClass("active")
        },
        window: function() {
            return window
        },
        getParams: function() {
            var e = this.mapped_params;
            return this.params = _.extend({}, this.model.get("params")), _.each(e, function(e) {
                var t = vc.atts.parseFrame.call(this, e);
                this.params[e.param_name] = t
            }, this), _.each(vc.edit_form_callbacks, function(e) {
                e.call(this)
            }, this), this.params
        },
        content: function() {
            return this.$content
        },
        save: function(e) {
            var t = this.model.get("id"),
                t = (this.removeElementEditElementPanelCache(t), vc.saveInProcess = !0, e && e.target && e.target.classList.contains("textarea_html"));
            if (this.panelInit && this.model) {
                var e = this,
                    n = e.model.get("shortcode"),
                    i = e.getParams(),
                    a = _.extend({}, vc.getDefaults(n), vc.getMergedParams(n, i));
                if (!_.isUndefined(i.content)) {
                    if (t) try {
                        i.content = window.vc.utils.fixUnclosedTags(i.content)
                    } catch (e) {
                        console.error("Failed to execute window.vc.utils.fixUnclosedTags function: ", e)
                    }
                    a.content = i.content
                }
                e.model.save({
                    params: a
                }), e.showMessage(window.sprintf(window.i18nLocale.inline_element_saved, vc.getMapped(n).name), "success"), window.vc_auto_save || window.vc.frame_window || this.hide(), e.trigger("save"), vc.saveInProcess = !1
            }
        },
        show: function() {
            this.$el.hasClass("vc_active") || (this.$el.addClass("vc_active"), this.draggable || this.initDraggable(), this.fixElContainment(), this.trigger("show"))
        },
        hide: function(e) {
            e && e.preventDefault && e.preventDefault(), vc.saveInProcess ? (this.$el.addClass("visually-hidden"), setTimeout(function() {
                this.handleHide()
            }.bind(this), 500)) : this.handleHide()
        },
        handleHide: function() {
            this.checkAjax(), this.ajax = !1, this.model = null, vc.active_panel = !1, this.currentModelParams = !1, this._killEditor(), this.$el.removeClass("vc_active visually-hidden"), this.$el.find(".vc_properties-list").removeClass("vc_with-tabs").css("margin-top", "auto"), this.$content.empty(), this.trigger("hide")
        },
        setTitle: function() {
            return this.$el.find(this.titleSelector).html(vc.getMapped(this.model.get("shortcode")).name + " " + window.i18nLocale.settings), this
        },
        _killEditor: function() {
            _.isUndefined(window.tinyMCE) || l("textarea.textarea_html", this.$el).each(function() {
                var e = l(this).attr("id");
                "4" === tinymce.majorVersion ? window.tinyMCE.execCommand("mceRemoveEditor", !0, e) : window.tinyMCE.execCommand("mceRemoveControl", !0, e)
            }), jQuery("body").off("click.wpcolorpicker")
        }
    }), window.vc.EditElementUIPanel = vc.EditElementPanelView.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperPanelViewResizable).vcExtendUI(vc.HelperPanelViewDraggable).vcExtendUI(vc.HelperPanelTabs).extend({
        el: "#vc_ui-panel-edit-element",
        events: {
            'click [data-vc-ui-element="button-save"]': "save",
            'click [data-vc-ui-element="button-close"]': "hide",
            'touchstart [data-vc-ui-element="button-close"]': "hide",
            'click [data-vc-ui-element="button-minimize"]': "toggleOpacity",
            'click [data-vc-ui-element="panel-tab-control"]': "changeTab"
        },
        titleSelector: '[data-vc-ui-element="panel-title"]',
        initialize: function() {
            vc.EditElementUIPanel.__super__.initialize.call(this), this.on("afterResizeStart", function() {
                this.$el.css("maxHeight", "none")
            })
        },
        show: function() {
            vc.EditElementUIPanel.__super__.show.call(this), l('[data-vc-ui-element="panel-tabs-controls"]', this.$el).remove(), this.$el.css("maxHeight", "75vh")
        },
        tabsMenu: function() {
            var e;
            return !1 === this.tabsInit && (this.tabsInit = !0, (e = this.$el.find('[data-vc-ui-element="panel-tabs-controls"]')).length) && (this.$tabsMenu = e), this.$tabsMenu
        },
        buildTabs: function() {
            this.content().find('[data-vc-ui-element="panel-tabs-controls"]').prependTo('[data-vc-ui-element="panel-header-content"]')
        },
        changeTab: function(e) {
            e && e.preventDefault && e.preventDefault();
            e = l(e.currentTarget);
            e.parent().hasClass("vc_active") || (this.switchActiveTab(this.$el, e), this.activeTabIndex = this.$el.find(e.data("vcUiElementTarget")).addClass("vc_active").index(), this.initParams(), this.$tabsMenu && this.$tabsMenu.vcTabsLine("checkDropdownContainerActive"), this.$content.parent().scrollTop(1).scrollTop(0), this.trigger("tabChange"))
        },
        checkTabs: function() {
            var n = this;
            !1 === this.tabsInit && (this.tabsInit = !0, this.$tabsMenu = this.$el.find('[data-vc-ui-element="panel-tabs-controls"]')), this.tabsMenu() && (this.content().find('[data-vc-ui-element="panel-edit-element-tab"]').each(function(e) {
                // START UNCODE EDIT
                // var t = n.$tabsMenu.find('> [data-tab-index="' + e + '"]');
                var t = n.$tabsMenu.find('[data-tab-index="' + e + '"]');
                // END UNCODE EDIT
                l(this).find('[data-vc-ui-element="panel-shortcode-param"]:not(".vc_dependent-hidden")').length ? t.hasClass("vc_dependent-hidden") && (t.removeClass("vc_dependent-hidden").removeClass("vc_tab-color-animated").addClass("vc_tab-color-animated"), window.setTimeout(function() {
                    t.removeClass("vc_tab-color-animated")
                }, 200)) : t.addClass("vc_dependent-hidden")
            }), this.$tabsMenu.vcTabsLine("refresh"), this.$tabsMenu.vcTabsLine("moveTabs"))
        }
    })
})(window.jQuery);
(l => {
    window.vc.TemplateLibraryView = vc.PanelView.vcExtendUI(vc.HelperAjax).extend({
        myTemplates: [],
        $mainPopup: !1,
        $loadingPage: !1,
        $gridContainer: !1,
        $errorMessageContainer: !1,
        $myTemplateContainer: !1,
        $popupItems: !1,
        $previewImage: !1,
        $previewTitle: !1,
        $previewUpdate: !1,
        $previewDownload: !1,
        $previewUpdateBtn: !1,
        $previewDownloadBtn: !1,
        $templatePreview: !1,
        $templatePage: !1,
        $downloadPage: !1,
        $updatePage: !1,
        $content: !1,
        $filter: !1,
        compiledGridTemplate: !1,
        compiledTemplate: !1,
        loaded: !1,
        data: !1,
        events: {
            "click [data-dismiss=panel]": "hide",
            "click .vc_ui-panel-close-button": "closePopupButton",
            "click .vc_ui-access-library-btn": "accessLibrary",
            "click #vc_template-library-template-grid .vc_ui-panel-template-preview-button": "previewButton",
            "click .vc_ui-panel-back-button": "backToTemplates",
            "click .vc_ui-panel-template-download-button, #vc_template-library-download-btn": "downloadButton",
            "click .vc_ui-panel-template-update-button, #vc_template-library-update-btn": "updateButton",
            "keyup #vc_template_lib_name_filter": "filterTemplates",
            "search #vc_template_lib_name_filter": "filterTemplates"
        },
        initialize: function() {
            _.bindAll(this, "loadLibrary", "addTemplateStatus", "loadMyTemplates", "deleteTemplate"), this.$mainPopup = this.$el.find(".vc_ui-panel-popup"), this.$loadingPage = this.$el.find(".vc_ui-panel-loading"), this.$gridContainer = this.$el.find("#vc_template-library-template-grid"), this.$errorMessageContainer = this.$el.find("#vc_template-library-panel-error-message"), this.$myTemplateContainer = this.$el.find("#vc_template-library-shared_templates"), this.$popupItems = this.$el.find(".vc_ui-panel-popup-item"), this.$previewImage = this.$el.find(".vc_ui-panel-preview-image"), this.$previewTitle = this.$el.find(".vc_ui-panel-template-preview .vc_ui-panel-title"), this.$previewUpdate = this.$el.find("#vc_template-library-update"), this.$previewDownload = this.$el.find("#vc_template-library-download"), this.$previewUpdateBtn = this.$previewUpdate.find("#vc_template-library-update-btn"), this.$previewDownloadBtn = this.$previewUpdate.find("#vc_template-library-download-btn"), this.$templatePreview = this.$el.find(".vc_ui-panel-template-preview"), this.$templatePage = this.$el.find(".vc_ui-panel-template-content"), this.$downloadPage = this.$el.find(".vc_ui-panel-download"), this.$updatePage = this.$el.find(".vc_ui-panel-update"), this.$filter = this.$el.find("#vc_template_lib_name_filter"), this.$content = this.$el.find(".vc_ui-templates-content");
            var e = l("#vc_template-grid-item").html(),
                e = (this.compiledGridTemplate = vc.template(e), l("#vc_template-item").html());
            this.compiledTemplate = vc.template(e), window.vc.events.on("templates:delete", this.deleteTemplate)
        },
        getLibrary: function() {
            var e, t;
            this.loaded ? this.showLibrary() : (this.checkAjax(), e = this.getStorage("templates"), t = this, e && "object" == typeof e && !_.isEmpty(e) ? (this.loaded = !0, this.loadLibrary(e), this.showLibrary()) : this.ajax = l.getJSON("https://vc-cc-templates.wpbakery.com/templates.json").done(function(e) {
                t.setStorage("templates", e), t.loaded = !0, t.loadLibrary(e), t.showLibrary()
            }).always(this.resetAjax))
        },
        removeStorage: function(t) {
            try {
                localStorage.removeItem("vc4-" + t), localStorage.removeItem("vc4-" + t + "_expiresIn")
            } catch (e) {
                return console.error("removeStorage: Error removing key [" + t + "] from localStorage: " + JSON.stringify(e)), !1
            }
            return !0
        },
        getStorage: function(t) {
            var e = Date.now(),
                a = localStorage.getItem("vc4-" + t + "_expiresIn");
            if ((a = null == a ? 0 : a) < e) return this.removeStorage(t), null;
            try {
                return JSON.parse(localStorage.getItem("vc4-" + t))
            } catch (e) {
                return console.error("getStorage: Error reading key [" + t + "] from localStorage: " + JSON.stringify(e)), null
            }
        },
        setStorage: function(e, t, a) {
            a = null == a ? 86400 : Math.abs(a);
            a = Date.now() + 1e3 * a;
            try {
                localStorage.setItem("vc4-" + e, JSON.stringify(t)), localStorage.setItem("vc4-" + e + "_expiresIn", a)
            } catch (e) {
                return window.console && window.console.warn && window.console.warn("template setStorage error", e), !1
            }
            return !0
        },
        loadLibrary: function(e) {
            var t, a;
            e && (t = "", (a = this).loaded = !0, this.data = e, this.$filter.val(""), e.forEach(function(e) {
                e = a.addTemplateStatus(e), t += a.compiledGridTemplate({
                    id: e.id,
                    title: e.title,
                    thumbnailUrl: e.thumbnailUrl,
                    previewUrl: e.previewUrl,
                    status: e.status,
                    downloaded: _.find(a.myTemplates, {
                        id: e.id
                    }),
                    version: e.version
                })
            }), this.$gridContainer.html(t))
        },
        showLibrary: function() {
            this.$loadingPage.addClass("vc_ui-hidden"), this.$mainPopup.removeClass("vc_ui-hidden"), this.$templatePage.removeClass("vc_ui-hidden")
        },
        addTemplateStatus: function(e) {
            var t, a = "",
                i = _.find(this.myTemplates, {
                    id: e.id
                });
            return i && (t = window.i18nLocale.ui_template_downloaded, a = '<span class="vc_ui-panel-template-item-info"><span>' + (t = e.version > i.version ? window.i18nLocale.ui_template_fupdate : t) + "</span></span>"), e.status = a, e
        },
        loadMyTemplates: function() {
            var t = "",
                a = this;
            this.myTemplates.forEach(function(e) {
                t += a.compiledTemplate({
                    post_id: e.post_id,
                    title: e.title
                })
            }), this.$myTemplateContainer.html(t)
        },
        closePopupButton: function(e) {
            e && e.preventDefault && e.preventDefault(), this.$mainPopup.toggleClass("vc_ui-hidden"), this.$popupItems.addClass("vc_ui-hidden"), this.$content.removeClass("vc_ui-hidden")
        },
        accessLibrary: function() {
            this.$loadingPage.removeClass("vc_ui-hidden"), this.$content.addClass("vc_ui-hidden"), this.getLibrary()
        },
        previewButton: function(e) {
            var e = l(e.currentTarget),
                t = e.data("preview-url"),
                a = e.data("title"),
                i = e.data("template-id"),
                e = e.data("template-version"),
                t = (this.$previewImage.attr("src", t), this.$previewTitle.text(a), _.find(this.myTemplates, {
                    id: i
                }));
            this.$previewUpdate.toggleClass("vc_ui-hidden", !(t && t.version < e)), this.$previewDownload.toggleClass("vc_ui-hidden", !!t), this.$previewUpdateBtn.data("template-id", i), this.$previewDownloadBtn.data("template-id", i), this.$popupItems.addClass("vc_ui-hidden"), this.$templatePreview.removeClass("vc_ui-hidden"), this.$templatePreview.attr("data-template-id", i)
        },
        backToTemplates: function() {
            this.$popupItems.addClass("vc_ui-hidden"), this.$templatePage.removeClass("vc_ui-hidden")
        },
        deleteTemplate: function(e) {
            "shared_templates" === e.type && -1 !== (e = _.findIndex(this.myTemplates, {
                post_id: e.id
            })) && (this.myTemplates.splice(e, 1), this.loaded) && this.loadLibrary(this.data)
        },
        downloadButton: function(e) {
            e && e.preventDefault && e.preventDefault();
            e = jQuery(e.currentTarget).closest("[data-template-id]").data("templateId");
            e && (this.showDownloadOverlay(), this.downloadTemplate(e))
        },
        updateButton: function(e) {
            e && e.preventDefault && e.preventDefault(), jQuery(e.currentTarget).closest("[data-template-id]").data("templateId") && this.showUpdateOverlay()
        },
        showDownloadOverlay: function() {
            this.$popupItems.addClass("vc_ui-hidden"), this.$downloadPage.removeClass("vc_ui-hidden")
        },
        hideDownloadOverlay: function(e) {
            e ? (this.$errorMessageContainer.html(e), this.$errorMessageContainer.removeClass("vc_ui-hidden")) : this.$errorMessageContainer.addClass("vc_ui-hidden"), this.$downloadPage.addClass("vc_ui-hidden"), this.$templatePage.removeClass("vc_ui-hidden")
        },
        showUpdateOverlay: function() {
            this.$popupItems.addClass("vc_ui-hidden"), this.$updatePage.removeClass("vc_ui-hidden")
        },
        hideUpdateOverlay: function() {
            this.$updatePage.addClass("vc_ui-hidden"), this.$templatePage.removeClass("vc_ui-hidden")
        },
        downloadTemplate: function(a) {
            this.checkAjax();
            var i = !0;
            this.ajax = l.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: {
                    action: "vc_shared_templates_download",
                    id: a,
                    _vcnonce: window.vcAdminNonce
                },
                dataType: "json",
                context: this
            }).done(function(e) {
                var t;
                e && e.success && (t = _.find(this.data, {
                    id: a
                })) && (i = !1, t.post_id = e.data.post_id, this.myTemplates.unshift(t), this.loadMyTemplates(), this.loadLibrary(this.data), this.showLibrary())
            }).always(function(e, t) {
                var a = "";
                "success" === t && !i || (a = e && e.data && e.data.message ? e.data.message : window.i18nLocale.ui_templates_failed_to_download), this.hideDownloadOverlay(a), this.resetAjax()
            })
        },
        filterTemplates: function() {
            var e = '.vc_ui-panel-template-item .vc_ui-panel-template-item-name:containsi("' + this.$filter.val() + '")';
            l(".vc_ui-panel-template-item.vc_ui-visible", this.$gridContainer).removeClass("vc_ui-visible"), l(e, this.$gridContainer).closest(".vc_ui-panel-template-item").addClass("vc_ui-visible")
        }
    }), l(function() {
        window.vcTemplatesLibraryData && (window.vc.templatesLibrary = new vc.TemplateLibraryView({
            el: '[data-vc-ui-element="panel-edit-element-tab"][data-tab="shared_templates"]'
        }), window.vc.templatesLibrary.myTemplates = window.vcTemplatesLibraryData.templates || [], window.vc.templatesLibrary.loadMyTemplates())
    })
})(window.jQuery);
vc.PostSettingsUIPanelFrontendEditor = vc.PostSettingsPanelView.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperPanelViewResizable).vcExtendUI(vc.HelperPanelViewDraggable).vcExtendUI({
    panelName: "post_settings",
    uiEvents: {
        setSize: "setEditorSize",
        show: "setEditorSize"
    },
    previewTab: null,
    events: function() {
        return _.extend({
            'click [data-vc-ui-element="panel-tab-control"]': "changeTab",
            'click [data-vc-ui-element="button-update"], [data-vc-ui-element="button-publish"], [data-vc-ui-element="button-submit-review"]': "updatePost",
            'click [data-vc-ui-element="button-save-draft"]': "saveDraft",
            "click #wpb-settings-preview": "preview"
        }, window.vc.PostSettingsUIPanelFrontendEditor.__super__.events)
    },
    setSize: function() {
        this.trigger("setSize")
    },
    setDefaultHeightSettings: function() {
        this.$el.css("height", "75vh")
    },
    setEditorSize: function() {
        window.Vc_postSettingsEditor && (this.editor_css.setSizeResizable(), this.editor_js_header.setSizeResizable(), this.editor_js_footer.setSizeResizable())
    },
    preview: function(i) {
        this.save();
        var t = setInterval(function() {
            var e;
            vc.storage.isChanged && (clearInterval(t), (e = vc.builder.getPostData()).action = "vc_preview", vc.builder.ajax(e).done(function(e) {
                var t;
                (e = JSON.parse(e)).success ? (t = i.target.getAttribute("data-button-link")) && (this.previewTab && !this.previewTab.closed ? (this.previewTab.location.reload(), this.previewTab.focus()) : this.previewTab = window.open(t, "_blank")) : window.vc.showMessage(window.i18nLocale.preview_error + e.data, "error")
            }).fail(function() {
                window.vc.showMessage(window.i18nLocale.preview_error, "error")
            }))
        }, 50)
    }
}), vc.PostSettingsUIPanelBackendEditor = vc.PostSettingsPanelViewBackendEditor.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperPanelViewResizable).vcExtendUI(vc.HelperPanelViewDraggable).vcExtendUI({
    uiEvents: {
        setSize: "setEditorSize",
        show: "setEditorSize"
    },
    events: function() {
        return _.extend({
            'click [data-vc-ui-element="panel-tab-control"]': "changeTab",
            'click [data-vc-ui-element="button-update"], [data-vc-ui-element="button-publish"]': "updatePost",
            'click [data-vc-ui-element="button-save-draft"]': "saveDraft",
            "click #wpb-settings-preview": "preview"
        }, window.vc.PostSettingsUIPanelBackendEditor.__super__.events)
    },
    setSize: function() {
        this.trigger("setSize")
    },
    setEditorSize: function() {
        window.Vc_postSettingsEditor && (this.editor_css.setSizeResizable(), this.editor_js_header.setSizeResizable(), this.editor_js_footer.setSizeResizable())
    },
    setDefaultHeightSettings: function() {
        this.$el.css("height", "75vh")
    },
    preview: function() {
        this.save();
        var e = setInterval(function() {
            vc.storage.isChanged && (clearInterval(e), document.getElementById("post-preview").click(), 0 !== jQuery('#vc_ui-panel-post-settings [data-change-status="publish"]').length) && (window.vc.pagesettingseditor = {})
        }, 50)
    }
});
(() => {
    var e = {
        'click [data-vc-ui-element="button-save"]': "save",
        'click [data-vc-ui-element="button-close"]': "hide",
        'touchstart [data-vc-ui-element="button-close"]': "hide",
        'click [data-vc-ui-element="button-minimize"]': "toggleOpacity",
        'click [data-vc-ui-element="button-layout"]': "setLayout",
        'click [data-vc-ui-element="button-update-layout"]': "updateFromInput"
    };
    vc.RowLayoutUIPanelFrontendEditor = vc.RowLayoutEditorPanelView.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperPanelViewDraggable).extend({
        panelName: "rowLayouts",
        events: e
    }), vc.RowLayoutUIPanelBackendEditor = vc.RowLayoutEditorPanelViewBackend.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperPanelViewDraggable).extend({
        panelName: "rowLayouts",
        events: e
    })
})();
(o => {
    window.vc.PresetSettingsUIPanelFrontendEditor = vc.PanelView.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperAjax).vcExtendUI({
        panelName: "preset_settings",
        showMessageDisabled: !1,
        events: {
            'click [data-vc-ui-delete="preset-title"]': "removePreset",
            'click [data-vc-ui-element="button-close"]': "hide",
            'touchstart [data-vc-ui-element="button-close"]': "hide",
            'click [data-vc-ui-element="button-minimize"]': "toggleOpacity",
            "click [data-vc-ui-add-preset]": "createPreset"
        },
        initialize: function(e) {
            this.frontEnd = e && e.frontEnd
        },
        createPreset: function(e) {
            var t, s, i, a, c;
            _.isUndefined(vc.ShortcodesBuilder) || (this.builder = new vc.ShortcodesBuilder), i = (e = o(e.currentTarget)).data("preset"), e = e.data("tag"), a = {
                width: "1/1"
            }, c = {
                shortcode: "vc_row",
                params: {}
            }, this.frontEnd ? (this.builder.create(c), s = {
                shortcode: "vc_column",
                params: a,
                parent_id: this.builder.lastID()
            }, this.builder.create(s), t = {
                shortcode: e,
                parent_id: this.builder.lastID()
            }, i && (t.preset = i), window.vc.closeActivePanel(), this.builder.create(t), this.model = this.builder.last(), this.builder.render()) : (s = {
                shortcode: "vc_column",
                params: a,
                parent_id: (a = vc.shortcodes.create(c)).id,
                root_id: a.id
            }, t = {
                shortcode: e,
                parent_id: vc.shortcodes.create(s).id,
                root_id: a.id
            }, i && (t.preset = i), c = vc.shortcodes.create(t), window.vc.closeActivePanel(), this.model = c), _.isBoolean(vc.getMapped(e).show_settings_on_create) && !1 === vc.getMapped(e).show_settings_on_create || this.showEditForm()
        },
        showEditForm: function() {
            window.vc.edit_element_block_view.render(this.model)
        },
        render: function() {
            return this.$el.css("left", (o(window).width() - this.$el.width()) / 2), this
        },
        removePreset: function(e) {
            e && e.preventDefault && e.preventDefault();
            var t = jQuery(e.currentTarget).closest('[data-vc-ui-delete="preset-title"]'),
                s = t.data("preset"),
                t = t.data("preset-parent");
            this.deleteSettings(s, t, e)
        },
        deleteSettings: function(t, e) {
            var s = this;
            return !!confirm(window.i18nLocale.delete_preset_confirmation) && (this.checkAjax(), this.ajax = o.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.deleteSettingsAjaxData(e, t),
                context: this
            }).done(function(e) {
                e && e.success && (this.showMessage(window.i18nLocale.preset_removed, "success"), s.$el.find('[data-preset="' + t + '"]').closest(".vc_ui-template").remove(), window.vc.events.trigger("vc:deletePreset", t))
            }).always(this.resetAjax), this.ajax)
        },
        deleteSettingsAjaxData: function(e, t) {
            return {
                action: "vc_action_delete_settings_preset",
                shortcode_name: e,
                vc_inline: !0,
                id: t,
                _vcnonce: window.vcAdminNonce
            }
        },
        showMessage: function(e, t) {
            var s;
            if (this.showMessageDisabled) return !1;
            s = "vc_col-xs-12 wpb_element_wrapper", this.message_box_timeout && (this.$el.find("[data-vc-panel-message]").remove(), window.clearTimeout(this.message_box_timeout)), this.message_box_timeout = !1;
            var i, a = vc.template('<div class="vc_message_box vc_message_box-standard vc_message_box-rounded vc_color-<%- color %>"><div class="vc_message_box-icon"><i class="fa fa fa-<%- icon %>"></i></div><p><%- text %></p></div>');
            switch (t) {
                case "error":
                    i = o('<div class="' + s + '" data-vc-panel-message>').html(a({
                        color: "danger",
                        icon: "times",
                        text: e
                    }));
                    break;
                case "warning":
                    i = o('<div class="' + s + '" data-vc-panel-message>').html(a({
                        color: "warning",
                        icon: "exclamation-triangle",
                        text: e
                    }));
                    break;
                case "success":
                    i = o('<div class="' + s + '" data-vc-panel-message>').html(a({
                        color: "success",
                        icon: "check",
                        text: e
                    }))
            }
            i.prependTo(this.$el.find(".vc_properties-list")), i.fadeIn(), this.message_box_timeout = window.setTimeout(function() {
                i.remove()
            }, 6e3)
        }
    })
})(window.jQuery);
(n => {
    vc.showMessage = function(e, s, o, c) {
        vc.message_timeout && (n(".vc_message").remove(), window.clearTimeout(vc.message_timeout)), s = s || "success", o = o || 1e4;
        var i = window.vc_mode && "admin_page" === window.vc_mode ? ".metabox-composer-content" : "body",
            c = c || i,
            t = n('<div class="vc_message ' + s + '" style="z-index: 999;">' + e + "</div>").prependTo(n(c));
        t.fadeIn(500), vc.message_timeout = window.setTimeout(function() {
            t.slideUp(500, function() {
                n(this).remove()
            }), vc.message_timeout = !1
        }, o)
    }, window.vc_user_access && !window.vc_user_access().partAccess("unfiltered_html") && vc.showMessage(window.i18nLocale.unfiltered_html_access, "type-error", 15e3)
})(window.jQuery);

function vc_guid() {
    return VCS4() + VCS4() + "-" + VCS4()
}

function VCS4() {
    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
}
_.isUndefined(window.vc) && (window.vc = {}), _.extend(vc, {
    no_title_placeholder: window.i18nLocale.no_title_parenthesis,
    responsive_disabled: !1,
    activity: !1,
    clone_index: 1,
    loaded: !1,
    path: "",
    admin_ajax: window.ajaxurl,
    filters: {
        templates: []
    },
    title: "",
    $title: !1,
    $hold_active: !1,
    data_changed: !1,
    setDataChanged: function() {
        var e;
        vc.undoRedoApi && (e = this, _.defer(function() {
            e.addUndo(vc.builder.getContent())
        })), window.jQuery(window).on("beforeunload.vcSave", function() {
            return window.i18nLocale.confirm_to_leave
        }), this.data_changed = !0
    },
    addUndo: _.debounce(function(e) {
        vc.undoRedoApi.add(e)
    }, 100),
    unsetDataChanged: function() {
        window.jQuery(window).off("beforeunload.vcSave"), this.data_changed = !1
    },
    addTemplateFilter: function(e) {
        _.isFunction(e) && this.filters.templates.push(e)
    },
    unsetHoldActive: function() {
        this.$hold_active && (this.$hold_active.removeClass("vc_hold-active"), this.$hold_active = !1)
    }
}), (d => {
    vc.map = {}, vc.setFrameSize = function(e) {
            var t = d("#vc_navbar"),
                // START UNCODE EDIT
                // n = d(window).height() - t.height();
                vc_navbar_height = d('body').hasClass('vc-sidebar-switch') ? 0 : t.height(),
                n = d(window).height() - vc_navbar_height,
                max_height,
                iframe_top;
            if (typeof e == 'undefined') {
                return false;
            }
            if (e === '768px') {
                max_height = 1025
            } else if (e === '390px') {
                max_height = 800
            }
            if (n > max_height) {
                iframe_top = ((n - max_height) / 2 + vc_navbar_height)
                n = max_height;
            } else {
                iframe_top = vc_navbar_height
            }
            // vc.$frame.width(e), vc.$frame_wrapper.css({
            vc.$frame.width(e), vc.$frame.css({
                // top: t.height()
                'margin-top': iframe_top
                // END UNCODE EDIT
        }), vc.$frame.height(n)
    }, vc.getDefaults = vc.memoizeWrapper(function(e) {
        var t = {},
            e = _.isArray(vc.getMapped(e).params) ? vc.getMapped(e).params : [];
        return _.each(e, function(e) {
            _.isObject(e) && (_.isUndefined(e.std) ? vc.atts[e.type] && vc.atts[e.type].defaults ? t[e.param_name] = vc.atts[e.type].defaults(e) : _.isUndefined(e.value) || (!_.isObject(e.value) || _.isArray(e.value) || _.isString(e.value) ? _.isArray(e.value) ? t[e.param_name] = e.value[0] : t[e.param_name] = e.value : t[e.param_name] = _.values(e.value)[0]) : t[e.param_name] = e.std)
        }), t
    }), vc.getDefaultsAndDependencyMap = vc.memoizeWrapper(function(e) {
        var t = {},
            n = {},
            e = _.isArray(vc.getMapped(e).params) ? vc.getMapped(e).params : [];
        return _.each(e, function(e) {
            _.isObject(e) && "content" !== e.param_name && (_.isUndefined(e.std) ? _.isUndefined(e.value) || (vc.atts[e.type] && vc.atts[e.type].defaults ? n[e.param_name] = vc.atts[e.type].defaults(e) : _.isObject(e.value) ? n[e.param_name] = _.values(e.value)[0] : _.isArray(e.value) ? n[e.param_name] = e.value[0] : n[e.param_name] = e.value) : n[e.param_name] = e.std, _.isUndefined(e.dependency) || _.isUndefined(e.dependency.element) || (t[e.param_name] = e.dependency))
        }), {
            defaults: n,
            dependencyMap: t
        }
    }), vc.getMergedParams = function(i, r) {
        var s, d = vc.getDefaultsAndDependencyMap(i),
            l = {};
        return r = _.extend({}, d.defaults, r), s = _.extend({}, d.dependencyMap), _.each(r, function(e, t) {
            if ("content" !== t) {
                if (!_.isUndefined(s[t])) {
                    if (!_.isUndefined(s[s[t].element]) && _.isBoolean(s[s[t].element].failed) && !0 === s[s[t].element].failed) return void(s[t].failed = !0);
                    var n, a = s[t].element,
                        o = r[a],
                        c = !1;
                    if ("string" == typeof o && (c = r[a].split(",").map(function(e) {
                            return e.trim()
                        }).filter(function(e) {
                            return e
                        })), a = _.isEmpty(o), n = _.omit(s[t], "element"), _.isBoolean(n.not_empty) && !0 === n.not_empty && a || _.isBoolean(n.is_empty) && !0 === n.is_empty && !a || n.value && !_.intersection(_.isArray(n.value) ? n.value : [n.value], _.isArray(o) ? o : [o]).length && c && n.value && !_.intersection(_.isArray(n.value) ? n.value : [n.value], _.isArray(c) ? c : [c]).length || n.value_not_equal_to && _.intersection(_.isArray(n.value_not_equal_to) ? n.value_not_equal_to : [n.value_not_equal_to], _.isArray(o) ? o : [o]).length && c && n.value_not_equal_to && _.intersection(_.isArray(n.value_not_equal_to) ? n.value_not_equal_to : [n.value_not_equal_to], _.isArray(c) ? c : [c]).length || n.value_includes && (!o || "string" == typeof o && !o.includes(n.value_includes))) return void(s[t].failed = !0)
                }
                a = vc.getParamSettings(i, t), (_.isUndefined(a) || !_.isUndefined(d.defaults[t]) && d.defaults[t] !== e || _.isUndefined(d.defaults[t]) && "" !== e || !_.isUndefined(a.save_always) && !0 === a.save_always) && (l[t] = e)
            }
        }), l
    }, vc.getParamSettings = vc.memoizeWrapper(function(e, t) {
        e = _.isArray(vc.getMapped(e).params) ? vc.getMapped(e).params : [];
        return _.find(e, function(e) {
            return _.isObject(e) && e.param_name === t
        }, this)
    }, function() {
        return arguments[0] + "," + arguments[1]
    }), vc.getParamSettingsByType = vc.memoizeWrapper(function(e, t) {
        e = _.isArray(vc.getMapped(e).params) ? vc.getMapped(e).params : [];
        return _.find(e, function(e) {
            return _.isObject(e) && e.type === t
        }, this)
    }, function() {
        return arguments[0] + "," + arguments[1]
    }), vc.shortcodeHasIdParam = vc.memoizeWrapper(function(e) {
        return vc.getParamSettingsByType(e, "el_id")
    }), vc.buildRelevance = function() {
        vc.shortcode_relevance = {}, _.each(vc.map, function(e) {
            _.isObject(e.as_parent) && _.isString(e.as_parent.only) && (vc.shortcode_relevance["parent_only_" + e.base] = e.as_parent.only.replace(/\s/, "").split(",")), _.isObject(e.as_parent) && _.isString(e.as_parent.except) && (vc.shortcode_relevance["parent_except_" + e.base] = e.as_parent.except.replace(/\s/, "").split(",")), _.isObject(e.as_child) && _.isString(e.as_child.only) && (vc.shortcode_relevance["child_only_" + e.base] = e.as_child.only.replace(/\s/, "").split(",")), _.isObject(e.as_child) && _.isString(e.as_child.except) && (vc.shortcode_relevance["child_except_" + e.base] = e.as_child.except.replace(/\s/, "").split(","))
        }), vc.checkRelevance = function(e, t) {
            return !(_.isArray(vc.shortcode_relevance["parent_only_" + e]) && !_.contains(vc.shortcode_relevance["parent_only_" + e], t) || _.isArray(vc.shortcode_relevance["parent_except_" + e]) && _.contains(vc.shortcode_relevance["parent_except_" + e], t) || _.isArray(vc.shortcode_relevance["child_only_" + t]) && !_.contains(vc.shortcode_relevance["child_only_" + t], e) || _.isArray(vc.shortcode_relevance["child_except_" + t]) && _.contains(vc.shortcode_relevance["child_except" + t], e))
        }
    }, vc.CloneModel = function(t, e, n, a) {
        var o, c, i, r;
        return vc.clone_index /= 10, o = _.isBoolean(a) && !0 === a ? e.get("order") : parseFloat(e.get("order")) + vc.clone_index, c = _.extend({}, e.get("params")), n = {
            shortcode: i = e.get("shortcode"),
            parent_id: n,
            order: o,
            cloned: !0,
            cloned_from: e.toJSON(),
            params: c
        }, vc["cloneMethod_" + i] && (n = vc["cloneMethod_" + i](n, e)), _.isBoolean(a) && !0 === a || (n.place_after_id = e.get("id")), t.create(n), r = t.last(), _.each(vc.shortcodes.where({
            parent_id: e.get("id")
        }), function(e) {
            vc.CloneModel(t, e, r.get("id"), !0)
        }, this), r
    }, vc.getColumnSize = function(e) {
        var t, n = 12 % e;
        return 0 < n && (t = e, _.isNumber(t)) && 1 == t % 2 && e % 3 ? e + "/12" : e / (n = 0 === n ? e : n) + "/" + 12 / n
    }, window.InlineShortcodeView = vc.shortcode_view = Backbone.View.extend({
        hold_hover_on: !1,
        events: {
            "click > .vc_controls .vc_control-btn-delete": "destroy",
            "touchstart > .vc_controls .vc_control-btn-delete": "destroy",
            "click > .vc_controls .vc_control-btn-edit": "edit",
            "touchstart > .vc_controls .vc_control-btn-edit": "edit",
            "click > .vc_controls .vc_control-btn-clone": "clone",
            "touchstart > .vc_controls .vc_control-btn-clone": "clone",
            "click > .vc_controls .vc_control-btn-copy": "copy",
            "touchstart > .vc_controls .vc_control-btn-copy": "copy",
            "click > .vc_controls .vc_control-btn-paste": "paste",
            "touchstart > .vc_controls .vc_control-btn-paste": "paste",
            mousemove: "checkControlsPosition"
        },
        controls_set: !1,
        $content: !1,
        move_timeout: !1,
        out_timeout: !1,
        hold_active: !0,
        builder: !1,
        default_controls_template: !1,
        initialize: function() {
            this.listenTo(this.model, "destroy", this.removeView), this.listenTo(this.model, "change:params", this.update), this.listenTo(this.model, "change:parent_id", this.changeParentId)
        },
        render: function() {
            this.$el.attr("data-model-id", this.model.get("id"));
            var e = this.model.get("shortcode");
            return this.$el.attr("data-tag", e), this.$el.addClass("vc_" + e), this.addControls(), _.isObject(vc.getMapped(e)) && (_.isBoolean(vc.getMapped(e).is_container) && !0 === vc.getMapped(e).is_container || !_.isEmpty(vc.getMapped(e).as_parent)) && this.$el.addClass("vc_container-block"), this.changed(), this
        },
        checkControlsPosition: function() {
            var e, t;
            this.$controls_buttons && (t = this.$el.height(), vc.$frame.height() < t) && (e = d(vc.frame_window).scrollTop(), this.$controls_buttons.offset().top, 40 < (e = e - this.$el.offset().top + vc.$frame.height() / 2) && e < t ? this.$controls_buttons.css("top", e) : t < e ? this.$controls_buttons.css("top", t - 40) : this.$controls_buttons.css("top", 40))
        },
        beforeUpdate: function() {
            // START UNCODE EDIT
            vc.events.trigger("shortcodeView:beforeUpdate", this.model)
            // END UNCODE EDIT
        },
        beforeUpdate: function() {},
        updated: function() {
            _.each(vc.shortcodes.where({
                parent_id: this.model.get("id")
            }), function(e) {
                e.view.parent_view = this, e.view.parentChanged()
            }, this), _.defer(_.bind(function() {
                vc.events.trigger("shortcodeView:updated", this.model), vc.events.trigger("shortcodeView:updated:" + this.model.get("shortcode"), this.model), vc.events.trigger("shortcodeView:updated:" + this.model.get("id"), this.model)
            }, this))
        },
        parentChanged: function() {
            this.checkControlsPosition()
        },
        rendered: function() {
            _.defer(_.bind(function() {
                vc.events.trigger("shortcodeView:ready", this.model), vc.events.trigger("shortcodeView:ready:" + this.model.get("shortcode"), this.model), vc.events.trigger("shortcodeView:ready:" + this.model.get("id"), this.model)
            }, this))
        },
        hasUserAccess: function() {
            return !0
        },
        addControls: function() {
            var e = this.model.get("shortcode"),
                t = d("#vc_controls-template-" + e),
                n = vc_user_access().shortcodeAll(e),
                a = vc_user_access().shortcodeEdit(e),
                o = vc_user_access().partAccess("dragndrop"),
                t = t.length ? t.html() : this._getDefaultTemplate(),
                c = vc.shortcodes.get(this.model.get("parent_id")),
                e = {
                    name: vc.getMapped(e).name,
                    tag: e,
                    parent_name: c ? vc.getMapped(c.get("shortcode")).name : "",
                    parent_tag: c ? c.get("shortcode") : "",
                    can_edit: a,
                    can_all: n,
                    moveAccess: o,
                    state: vc_user_access().getState("shortcodes"),
                    allowAdd: null
                },
                c = vc.template(_.unescape(t), _.extend({}, vc.templateOptions.custom, {
                    evaluate: /\{#([\s\S]+?)#}/g
                }));
            this.$controls = d(c(e).trim()).addClass("vc_controls"), this.$controls.appendTo(this.$el), this.$controls_buttons = this.$controls.find("> :first")
        },
        content: function() {
            return !1 === this.$content && (this.$content = this.$el.find("> :first")), this.$content
        },
        changeParentId: function() {
            var e = this.model.get("parent_id");
            vc.builder.notifyParent(this.model.get("parent_id")), !1 === e ? this.placeElement(this.$el) : (e = vc.shortcodes.get(e)) && e.view && e.view.placeElement(this.$el), this.parentChanged()
        },
        _getDefaultTemplate: function() {
            var e;
            return !_.isUndefined(this.default_controls_template) && this.default_controls_template || (this.default_controls_template = d("<div><div>").html(d("#vc_controls-template-default").html()), e = this.$el.data("shortcode-controls"), _.isUndefined(e)) || d(".vc_control-btn[data-control]", this.default_controls_template).each(function() {
                -1 == d.inArray(d(this).data("control"), e) && d(this).remove()
            }), this.default_controls_template.html()
        },
        changed: function() {
            this.$el.removeClass("vc_empty-shortcode-element"), this.$el.height() < 5 && this.$el.addClass("vc_empty-shortcode-element")
        },
        edit: function(e) {
                // START UNCODE EDIT
                d(document.body).trigger('edit-block-window')
                // END UNCODE EDIT
            e && e.preventDefault && e.preventDefault(), e && e.stopPropagation && e.stopPropagation(), "edit_element" === vc.activePanelName() && vc.active_panel.model && vc.active_panel.model.get("id") === this.model.get("id") || (vc.closeActivePanel(), vc.edit_element_block_view.render(this.model))
        },
        destroy: function(e) {
            e && e.preventDefault && e.preventDefault(), e && e.stopPropagation && e.stopPropagation(), vc.showMessage(window.sprintf(window.i18nLocale.inline_element_deleted, this.model.setting("name"))), this.model.destroy()
	            // START UNCODE EDIT
                vc.events.trigger("shortcodeView:destroy", this.model)
                // END UNCODE EDIT
        },
        removeView: function(e) {
            this.remove(), vc.setDataChanged(), vc.builder.notifyParent(this.model.get("parent_id")), vc.closeActivePanel(e), vc.setFrameSize()
        },
        update: function(e) {
            this.beforeUpdate(), vc.builder.update(e || this.model)
        },
        clone: function(e) {
            var t = new vc.ShortcodesBuilder;
            if (e && e.preventDefault && e.preventDefault(), e && e.stopPropagation && e.stopPropagation(), this.builder && !this.builder.is_build_complete) return !1;
            this.builder = t, e = vc.CloneModel(t, this.model, this.model.get("parent_id")), t.setResultMessage(window.sprintf(window.i18nLocale.inline_element_cloned, e.setting("name"), e.get("id"))), t.render()
        },
        copy: function(e) {
            return e && e.preventDefault && e.preventDefault(), e && e.stopPropagation && e.stopPropagation(), !(this.builder && !this.builder.is_build_complete) && vc.copyShortcode(this.model)
        },
        paste: function(e) {
            var t = new vc.ShortcodesBuilder;
            if (e && e.preventDefault && e.preventDefault(), e && e.stopPropagation && e.stopPropagation(), this.builder && !this.builder.is_build_complete) return !1;
            this.builder = t, vc.clone_index /= 10, vc.pasteShortcode(this.model, t)
        },
        getParam: function(e) {
            return _.isObject(this.model.get("params")) && !_.isUndefined(this.model.get("params")[e]) ? this.model.get("params")[e] : null
        },
        placeElement: function(e, t) {
            var n = vc.shortcodes.get(e.data("modelId"));
            n && n.get("place_after_id") ? (e.insertAfter(vc.$page.find("[data-model-id=" + n.get("place_after_id") + "]")), n.unset("place_after_id")) : _.isString(t) && "prepend" === t ? e.prependTo(this.content()) : e.appendTo(this.content()), this.changed()
        }
    }), vc.FrameView = Backbone.View.extend({
        isDraggingAllowed: !0,
        isTitleControlsRendered: !1,
        events: {
            'click [data-vc-element="add-element-action"]': "addElement",
            "click #vc_no-content-add-text-block": "addTextBlock",
            "click #vc_templates-more-layouts": "openTemplatesWindow",
            "click .vc_template[data-template_id] > .wpb_wrapper": "loadDefaultTemplate",
            "dragstart .wpb-content-wrapper": "handleDragStart",
            "dragend .wpb-content-wrapper": "handleDragEnd",
            "dragenter .wpb-content-wrapper": "handleDragEnter",
            "dragover .wpb-content-wrapper": "handleDragOver",
            "dragleave .wpb-content-wrapper": "handleDragLeave",
            "drop .wpb-content-wrapper": "handleDrop"
        },
        handleDragStart: function(e) {
            if ("IMG" === e.target.tagName) return this.isDraggingAllowed = !1
        },
        handleDragEnd: function() {
            this.isDraggingAllowed = !0
        },
        handleDragEnter: function() {
            this.isDraggingAllowed || (this.isDraggingAllowed = !0)
        },
        handleDragOver: function(e) {
            this.isDraggingAllowed && vc.imageDrop && vc.imageDrop.handleDragOver(e)
        },
        handleDragLeave: function(e) {
            vc.imageDrop && vc.imageDrop.handleDragLeave(e)
        },
        handleDrop: function(e) {
            vc.imageDrop && vc.imageDrop.handleDrop(e)
        },
        openTemplatesWindow: function(e) {
                // START UNCODE EDIT
                d(document.body).trigger('open-templates-window')
                // END UNCODE EDIT
            vc.templates_panel_view.once("show", function() {
                d('[data-vc-ui-element-target="[data-tab=default_templates]"]').click()
            }), vc.app.openTemplatesWindow.call(this, e)
        },
        updateKeyPress: function(e) {
            if (13 === e.which) return e && e.preventDefault && e.preventDefault(), vc.$title.attr("contenteditable", !1), d(".entry-content").trigger("click"), !1
        },
        loadDefaultTemplate: function(e) {
            e && e.preventDefault && e.preventDefault(), vc.templates_panel_view.loadTemplate(e), d("#vc_no-content-helper").remove()
        },
        initialize: function() {
            vc.frame_window = vc.$frame.get(0).contentWindow, d(vc.frame_window.document.body).on("paste", this.handleEditorPaste)
        },
        handleEditorPaste: function(e) {
            var e = e.originalEvent.clipboardData.getData("text/plain") || "",
                t = new vc.ShortcodesBuilder;
            vc.pasteShortcode(!1, t, e)
        },
        setActiveHover: function(e) {
            this.$hover_element && this.$hover_element.removeClass("vc_hover"), this.$hover_element = d(e.currentTarget).addClass("vc_hover"), e.stopPropagation()
        },
        unsetActiveHover: function() {
            this.$hover_element && this.$hover_element.removeClass("vc_hover")
        },
        setSortable: function() {
            vc.frame_window.vc_iframe.setSortable(vc.app)
        },
        render: function() {
            return !1 !== vc_user_access().getState("post_settings") && (vc.$title = d(vc.$frame.get(0).contentWindow.document).find('h1:contains("' + (vc.title || vc.no_title_placeholder).replace(/"/g, '\\"') + '")'), vc.$title) && !this.isTitleControlsRendered && (this.addTitleControls(), this.isTitleControlsRendered = !0, vc.$title.on("mouseenter", this.handleTitleHover).on("mouseleave", this.handleTitleHover)), d(vc.$frame.get(0).contentWindow.document).find(".wpb-content-wrapper").length || window.vc.showMessage(window.i18nLocale.not_editable_post || "This post can not be edited with WPBakery since it is missing a WordPress default content area.", "error", "30000"), this
        },
        noContent: function(e) {
            vc.frame_window.vc_iframe.showNoContent(e)
        },
        addElement: function(e) {
            e && e.preventDefault && e.preventDefault(), vc.add_element_block_view.render(!1)
        },
        addTextBlock: function(e) {
            var t, n, a;
            e && e.preventDefault && e.preventDefault(), e = {}, n = {
                width: "1/1"
            }, a = vc.getDefaults("vc_column_text"), (t = new vc.ShortcodesBuilder).create({
                shortcode: "vc_row",
                params: e
            }).create({
                shortcode: "vc_column",
                parent_id: t.lastID(),
                params: n
            }).create({
                shortcode: "vc_column_text",
                parent_id: t.lastID(),
                params: a
            }).render(), vc.edit_element_block_view.render(t.last())
        },
        scrollTo: function(e) {
            vc.frame_window.vc_iframe.scrollTo(e.get("id"))
        },
        addInlineScript: function(e) {
            return vc.frame_window.vc_iframe.addInlineScript(e)
        },
        addInlineScriptBody: function(e) {
            return vc.frame_window.vc_iframe.addInlineScriptBody(e)
        },
        addTitleControls: function() {
            var e = (e = new URLSearchParams(window.location.search).get("post_type")).charAt(0).toUpperCase() + e.slice(1),
                e = window.sprintf(i18nLocale.post_title, e),
                t = i18nLocale.edit + " " + e,
                n = d('<div class="vc_controls-element vc_controls">'),
                a = d('<div class="vc_controls-cc">'),
                o = d('<span class="vc_control-btn vc_element-name">'),
                e = d('<span class="vc_btn-content">').text(e),
                t = d('<span class="vc_control-btn vc_control-btn-edit" title="' + t + '">').text(t),
                c = d('<span class="vc_btn-content"></span>'),
                i = d('<i class="vc-composer-icon vc-c-icon-mode_edit"></i>');
            c.append(i), t.append(c), o.append(e), a.append(o), a.append(t), n.append(a), vc.$title.append(n), vc.$title.addClass("wpb-post-title"), t.on("click", function(e) {
                e.preventDefault(), vc.post_settings_view.$el.find('.vc_ui-tabs-line [data-vc-ui-element="panel-tab-control"]:first').trigger("click"), vc.post_settings_view.render().show(), d("#vc_page-title-field").focus()
            })
        },
        handleTitleHover: function(e) {
            "mouseenter" !== e.type || vc.$title.hasClass("wpb-title-hover") ? vc.$title.removeClass("wpb-title-hover") : vc.$title.addClass("wpb-title-hover")
        }
    }), vc.View = Backbone.View.extend({
        el: d("body"),
        mode: "view",
        current_size: "100%",
        events: {
            "click #vc_add-new-row": "createRow",
            "click #vc_add-new-element": "addElement",
            "click #vc_post-settings-button": "editSettings",
            "click #vc_seo-button": "openSeo",
            "click #vc_templates-editor-button": "openTemplatesWindow",
            "click #vc_guides-toggle-button": "toggleMode",
            "click #vc_button-cancel": "cancel",
            "click #vc_button-edit-admin": "cancel",
            "click #vc_button-update": "save",
            "click #vc_button-save-draft, #vc_button-save-as-pending": "save",
            "click .vc_screen-width": "resizeFrame",
            "click .vc_edit-cloned": "editCloned",
            "click [data-vc-manage-elements]": "openPresetWindow"
        },
        initialize: function() {
            _.bindAll(this, "saveRowOrder", "saveElementOrder", "saveColumnOrder", "resizeWindow"), vc.shortcodes.on("change:params", this.changeParamsEvents, this), vc.events.on("shortcodes:add shortcodes:vc_section", vcAddShortcodeDefaultParams, this), vc.events.on("shortcodes:add", vc.atts.addShortcodeIdParam, this)
        },
        changeParamsEvents: function(e) {
            vc.events.triggerShortcodeEvents("update", e)
        },
        render: function() {
            return vc.updateSettingsBadge(), vc.$page = d(vc.$frame.get(0).contentWindow.document).find("#vc_inline-anchor").parent(), vc.$frame_body = d(vc.$frame.get(0).contentWindow.document).find("body").addClass("vc_editor"), this.setMode("compose"), this.$size_control = d("#vc_screen-size-control"), d(".vc_element-container", vc.frame_window.document).droppable({
                accept: ".vc_element_button"
            }), d(window).on("resize", this.resizeWindow), _.defer(function() {
                vc.events.trigger("app.render")
            }), this
        },
        cancel: function(e) {
            e && e.preventDefault && e.preventDefault(), window.location.href = d(e.currentTarget).data("url")
        },
        save: function(e) {
            e && e.preventDefault && e.preventDefault(), vc.builder.save(d(e.currentTarget).data("changeStatus"))
        },
        resizeFrame: function(e) {
            var t = d(e.currentTarget);
            if (e && e.preventDefault && e.preventDefault(), t.hasClass("active")) return !1;
            this.$size_control.find(".active").removeClass("active"), d("#vc_screen-size-current").attr("class", "vc_current-layout-icon " + t.attr("class")), this.current_size = t.data("size"), t.addClass("active"), vc.setFrameSize(this.current_size)
        },
        editCloned: function(e) {
            e && e.preventDefault && e.preventDefault(), e = d(e.currentTarget).data("modelId"), e = vc.shortcodes.get(e), vc.edit_element_block_view.render(e)
        },
        resizeWindow: function() {
            vc.setFrameSize(this.current_size)
        },
        switchMode: function(e) {
            var t = d(e.currentTarget);
            e && e.preventDefault && e.preventDefault(), this.setMode(t.data("mode")), t.siblings(".vc_active").removeClass("vc_active"), t.addClass("vc_active")
        },
        toggleMode: function(e) {
            var t = d(e.currentTarget);
            e && e.preventDefault && e.preventDefault(), "compose" === this.mode ? (t.addClass("vc_off").text(window.i18nLocale.guides_off), this.setMode("view")) : (t.removeClass("vc_off").text(window.i18nLocale.guides_on), this.setMode("compose"))
        },
        setMode: function(e) {
            var t = d("body").removeClass(this.mode + "-mode");
            vc.$frame_body.removeClass(this.mode + "-mode"), this.mode = e, t.addClass(this.mode + "-mode"), vc.$frame_body.addClass(this.mode + "-mode")
        },
        placeElement: function(e, t) {
            var n = vc.shortcodes.get(e.data("modelId"));
            n && n.get("place_after_id") ? (e.insertAfter(vc.$page.find("[data-model-id=" + n.get("place_after_id") + "]")), n.unset("place_after_id")) : _.isString(t) && "prepend" === t ? e.prependTo(vc.$page) : e.insertBefore(vc.$page.find("#vc_no-content-helper"))
        },
        addShortcodes: function(e) {
            _.each(e, function(e) {
                this.addShortcode(e), this.addShortcodes(vc.shortcodes.where({
                    parent_id: e.get("id")
                }))
            }, this)
        },
        createShortcodeHtml: function(e) {
            var t = d("#vc_template-" + e.get("shortcode")),
                t = t.length ? t.html() : '<div class="vc_block"></div>',
                t = vc.template(t, vc.templateOptions.custom);
            return d(t(e.toJSON()).trim())
        },
        addAll: function(e) {
            this.addShortcodes(e.where({
                parent_id: !1
            }))
        },
        createRow: function(e) {
            e && e.preventDefault && e.preventDefault();
            var e = new vc.ShortcodesBuilder,
                t = {
                    width: "1/1"
                };
            e.create({
                shortcode: "vc_row",
                params: {}
            }).create({
                shortcode: "vc_column",
                parent_id: e.lastID(),
                params: t
            }).render()
        },
        addElement: function(e) {
            e && e.preventDefault && e.preventDefault(), vc.add_element_block_view.render(!1)
        },
        editSettings: function(e) {
            e && e.preventDefault && e.preventDefault(), vc.post_settings_view.render().show()
        },
        openTemplatesEditor: function(e) {
            e && e.preventDefault && e.preventDefault(), vc.templates_editor_view.render().show()
        },
        openTemplatesWindow: function(e) {
            e && e.preventDefault && e.preventDefault(), vc.templates_panel_view.render().show()
        },
        setFrameSize: function() {
            vc.setFrameSize()
        },
        dropButton: function() {},
        saveRowOrder: function(e, t) {
            _.defer(function() {
                var o, c, i = d(t.item.parent()),
                    r = i.find("> [data-tag=vc_row],> [data-tag=vc_section]"),
                    s = new vc.ShortcodesBuilder;
                r.each(function(e) {
                    var t, n, a = d(this);
                    a.is(".droppable") ? (o = {}, c = {
                        width: "1/1"
                    }, a.remove(), t = {
                        shortcode: "vc_row",
                        params: o,
                        order: e
                    }, 0 === e ? vc.activity = "prepend" : e + 1 !== r.length && (t.place_after_id = vc.$page.find("> [data-tag=vc_row]:eq(" + (e - 1) + ")").data("modelId")), s.create(t).create({
                        shortcode: "vc_column",
                        parent_id: s.lastID(),
                        params: c
                    }).render()) : (a = (t = vc.shortcodes.get(a.data("modelId"))).get("parent_id"), n = i.closest(".vc_element").data("modelId") || !1, t.save({
                        order: e,
                        parent_id: n
                    }, {
                        silent: !0
                    }), a !== n && (vc.builder.notifyParent(n), vc.builder.notifyParent(a)))
                }), vc.setDataChanged()
            }, this)
        },
        saveElementOrder: function(e, t) {
            _.defer(function(e, t, n) {
                var o, c;
                _.isNull(n.sender) && (o = n.item.parent(), c = o.find("> [data-model-id]"), o.find("> [data-model-id]").each(function(e) {
                    var t, n = d(this),
                        a = !1;
                    n.is(".droppable") ? (t = vc.shortcodes.get(o.parents(".vc_element[data-tag]:first").data("modelId")), n.remove(), 0 === e ? a = !0 : e + 1 !== c.length && (a = o.find("> [data-tag]:eq(" + (e - 1) + ")").data("modelId")), t && vc.add_element_block_view.render(t, a)) : (n = (a = vc.shortcodes.get(n.data("modelId"))).get("parent_id"), t = o.parents(".vc_element[data-tag]:first").data("modelId"), a.save({
                        order: e,
                        parent_id: t
                    }, {
                        silent: !0
                    }), n !== t && (vc.builder.notifyParent(t), vc.builder.notifyParent(n)))
                })), vc.setDataChanged()
            }, this, e, t)
        },
        saveColumnOrder: function(e, t) {
            _.defer(function(e, t, n) {
                n.item.parent().find("> [data-model-id]").each(function() {
                    var e = d(this),
                        t = e.index();
                    vc.shortcodes.get(e.data("modelId")).save({
                        order: t
                    })
                })
            }, this, e, t), vc.setDataChanged()
        },
        openPresetWindow: function(e) {
            e && e.preventDefault && e.preventDefault(), vc.preset_panel_view.render().show()
        },
        openSeo: function(e) {
            e && e.preventDefault && e.preventDefault(), vc.post_seo_view.render()
        }
    })
})(window.jQuery);
_.isUndefined(window.vc) && (window.vc = {}), vc.addTemplateFilter(function(d) {
    var e = VCS4() + "-" + VCS4();
    return d.replace(/tab\_id\=\"([^\"]+)\"/g, 'tab_id="$1' + e + '"')
});
(d => {
    window.vc.events.on("shortcodeView:updated", function(e) {
        !0 === (vc.map[e.get("shortcode")] || !1).is_container && (e = e.get("id"), window.vc.frame_window.vc_iframe.updateChildGrids(e))
    }), window.InlineShortcodeViewContainer = window.InlineShortcodeView.extend({
        controls_selector: "#vc_controls-template-container",
        events: {
            "click > .vc_controls .vc_element .vc_control-btn-delete": "destroy",
            "touchstart > .vc_controls .vc_element .vc_control-btn-delete": "destroy",
            "click > .vc_controls .vc_element .vc_control-btn-edit": "edit",
            "touchstart > .vc_controls .vc_element .vc_control-btn-edit": "edit",
            "click > .vc_controls .vc_element .vc_control-btn-clone": "clone",
            "touchstart > .vc_controls .vc_element .vc_control-btn-clone": "clone",
            "click > .vc_controls .vc_element .vc_control-btn-copy": "copy",
            "touchstart > .vc_controls .vc_element .vc_control-btn-copy": "copy",
            "click > .vc_controls .vc_element .vc_control-btn-paste": "paste",
            "touchstart > .vc_controls .vc_element .vc_control-btn-paste": "paste",
            "click > .vc_controls .vc_element .vc_control-btn-prepend": "prependElement",
            "touchstart > .vc_controls .vc_element .vc_control-btn-prepend": "prependElement",
            "click > .vc_controls .vc_control-btn-append": "appendElement",
            "touchstart > .vc_controls .vc_control-btn-append": "appendElement",
            "click > .vc_empty-element": "appendElement",
            mouseenter: "resetActive",
            mouseleave: "holdActive"
        },
        hold_active: !1,
        parent_view: !1,
        initialize: function(e) {
            _.bindAll(this, "holdActive"), window.InlineShortcodeViewContainer.__super__.initialize.call(this, e), this.model.get("parent_id") && (this.parent_view = vc.shortcodes.get(this.model.get("parent_id")).view)
        },
        resetActive: function() {
            this.hold_active && window.clearTimeout(this.hold_active)
        },
        holdActive: function() {
            this.resetActive(), this.$el.addClass("vc_hold-active");
            var e = this;
            this.hold_active = window.setTimeout(function() {
                e.hold_active && window.clearTimeout(e.hold_active), e.hold_active = !1, e.$el.removeClass("vc_hold-active")
            }, 700)
        },
        content: function() {
            return !1 === this.$content && (this.$content = this.$el.find(".vc_container-anchor:first").parent(), this.$el.find(".vc_container-anchor:first").remove()), this.$content
        },
        render: function() {
            return window.InlineShortcodeViewContainer.__super__.render.call(this), this.content().addClass("vc_element-container"), this.$el.addClass("vc_container-block"), this
        },
        changed: function() {
            // START UNCODE EDIT
            // this.allowAddControlOnEmpty() && (0 === this.$el.find(".vc_element[data-tag]").length ? this.$el.addClass("vc_empty").find("> :first").addClass("vc_empty-element") : this.$el.removeClass("vc_empty").find("> .vc_empty-element").removeClass("vc_empty-element"))
            this.allowAddControlOnEmpty() && (0 === this.$el.find(".vc_element[data-tag]").length ? this.$el.addClass("vc_empty").find("> :first:not(.vc_controls), > :first + div:not(.vc_controls)").addClass("vc_empty-element") : this.$el.removeClass("vc_empty").find("> .vc_empty-element").removeClass("vc_empty-element"))
        },
        update: function() {
            if (this.model.attributes.shortcode === 'uncode_slider') {
                vc.events.trigger("vc.update-slider", this.model);
                return false
            } else {
                window.InlineShortcodeViewContainer.__super__.update.call(this)
            }
        },
        // END UNCODE EDIT
        prependElement: function(e) {
            //START UNCODE EDIT

            if (this.model.attributes.shortcode === 'uncode_slider') {
                e.preventDefault
                vc.builder.create({
                        shortcode: "vc_row_inner",
                        parent_id: this.model.get("id")
                    }),
                    vc.builder.create({
                        shortcode: "vc_column_inner",
                        params: {
                            width: "1/1",
                            el_class: "added-owl-item"
                        },
                        parent_id: vc.builder.lastID()
                    }).render();
                vc.events.trigger("added-owl-item", this.model);
                return false
            }
            // e && e.preventDefault && e.preventDefault(), this.prepend = !0, window.vc.add_element_block_view.render(this.model, !0)
            e && e.preventDefault && e.preventDefault(), window.vc.add_element_block_view.render(this.model)
            //END UNCODE EDIT
        },
        appendElement: function(e) {
            e && e.preventDefault && e.preventDefault(), window.vc.add_element_block_view.render(this.model)
        },
        addControls: function() {
            var e = this.model.get("shortcode"),
                t = d(this.controls_selector).html(),
                c = vc.shortcodes.get(this.model.get("parent_id")),
                c = (c && (s = vc.getMapped(c.get("shortcode")).name, r = c.get("shortcode")), vc_user_access().shortcodeAll(e)),
                n = vc_user_access().shortcodeEdit(e),
                o = vc_user_access().shortcodeAll(r),
                l = vc_user_access().shortcodeEdit(r),
                i = vc_user_access().partAccess("dragndrop"),
                e = {
                    name: vc.getMapped(e).name,
                    tag: e,
                    parent_name: s,
                    parent_tag: r,
                    can_edit: n,
                    can_all: c,
                    moveAccess: i,
                    parent_can_edit: l,
                    parent_can_all: o,
                    state: vc_user_access().getState("shortcodes"),
                    allowAdd: this.allowAddControl(),
                    switcherPrefix: o && c ? "" : "-disable-switcher"
                },
                s = vc.template(_.unescape(t), _.extend({}, vc.templateOptions.custom, {
                    evaluate: /\{#([\s\S]+?)#}/g
                })),
                r = "vc_controls";
            this.model.setting("as_parent") && this.model.setting("content_element") && (r += " vc_controls-parent"), this.$controls = d(s(e).trim()).addClass(r), this.$controls.appendTo(this.$el)
        },
        allowAddControl: function() {
            return "edit" !== vc_user_access().getState("shortcodes")
        },
        multi_edit: function(e) {
            var t, c = [];
            e && e.preventDefault && e.preventDefault(), (t = this.model.get("parent_id") ? vc.shortcodes.get(this.model.get("parent_id")) : t) ? (c.push(t), e = vc.shortcodes.where({
                parent_id: t.get("id")
            }), window.vc.multi_edit_element_block_view.render(c.concat(e), this.model.get("id"))) : window.vc.edit_element_block_view.render(this.model)
        },
        allowAddControlOnEmpty: function() {
            return "edit" !== vc_user_access().getState("shortcodes")
        }
    })
})(window.jQuery);
(e => {
    window.InlineShortcodeViewContainerWithParent = window.InlineShortcodeViewContainer.extend({
        controls_selector: "#vc_controls-template-container-with-parent",
        events: {
            "click > .vc_controls .vc_element .vc_control-btn-delete": "destroy",
            "touchstart > .vc_controls .vc_element .vc_control-btn-delete": "destroy",
            "click > .vc_controls .vc_element .vc_control-btn-edit": "edit",
            "touchstart > .vc_controls .vc_element .vc_control-btn-edit": "edit",
            "click > .vc_controls .vc_element .vc_control-btn-clone": "clone",
            "touchstart > .vc_controls .vc_element .vc_control-btn-clone": "clone",
            "click > .vc_controls .vc_element .vc_control-btn-copy": "copy",
            "touchstart > .vc_controls .vc_element .vc_control-btn-copy": "copy",
            "click > .vc_controls .vc_element .vc_control-btn-paste": "paste",
            "touchstart > .vc_controls .vc_element .vc_control-btn-paste": "paste",
            "click > .vc_controls .vc_element .vc_control-btn-prepend": "prependElement",
            "touchstart > .vc_controls .vc_element .vc_control-btn-prepend": "prependElement",
            "click > .vc_controls .vc_control-btn-append": "appendElement",
            "touchstart > .vc_controls .vc_control-btn-append": "appendElement",
            "click > .vc_controls .vc_parent .vc_control-btn-delete": "destroyParent",
            "touchstart > .vc_controls .vc_parent .vc_control-btn-delete": "destroyParent",
            "click > .vc_controls .vc_parent .vc_control-btn-edit": "editParent",
            "touchstart > .vc_controls .vc_parent .vc_control-btn-edit": "editParent",
            "click > .vc_controls .vc_parent .vc_control-btn-clone": "cloneParent",
            "touchstart > .vc_controls .vc_parent .vc_control-btn-clone": "cloneParent",
            "click > .vc_controls .vc_parent .vc_control-btn-copy": "copyParent",
            "touchstart > .vc_controls .vc_parent .vc_control-btn-copy": "copyParent",
            "click > .vc_controls .vc_parent .vc_control-btn-paste": "pasteParent",
            "touchstart > .vc_controls .vc_parent .vc_control-btn-paste": "pasteParent",
            "click > .vc_controls .vc_parent .vc_control-btn-prepend": "addSibling",
            "touchstart > .vc_controls .vc_parent .vc_control-btn-prepend": "addSibling",
            "click > .vc_controls .vc_parent .vc_control-btn-layout": "changeLayout",
            "touchstart > .vc_controls .vc_parent .vc_control-btn-layout": "changeLayout",
            "click > .vc_empty-element": "appendElement",
            "touchstart > .vc_empty-element": "appendElement",
            "click > .vc_controls .vc_control-btn-switcher": "switchControls",
            "touchstart > .vc_controls .vc_control-btn-switcher": "switchControls",
            mouseenter: "resetActive",
            mouseleave: "holdActive"
        },
        destroyParent: function(t) {
            t && t.preventDefault && t.preventDefault(), this.parent_view.destroy(t)
        },
        cloneParent: function(t) {
            t && t.preventDefault && t.preventDefault(), this.parent_view.clone(t)
        },
        copyParent: function(t) {
            t && t.preventDefault && t.preventDefault(), this.parent_view.copy(t)
        },
        pasteParent: function(t) {
            t && t.preventDefault && t.preventDefault(), this.parent_view.paste(t)
        },
        editParent: function(t) {
            t && t.preventDefault && t.preventDefault(), this.parent_view.edit(t)
        },
        addSibling: function(t) {
            t && t.preventDefault && t.preventDefault(), this.parent_view.addElement(t)
        },
        changeLayout: function(t) {
            t && t.preventDefault && t.preventDefault(), this.parent_view.changeLayout(t)
        },
        switchControls: function(t) {
            t && t.preventDefault && t.preventDefault(), vc.unsetHoldActive(), (t = e(t.currentTarget).parent()).addClass("vc_active"), (t = t.siblings(".vc_active")).removeClass("vc_active"), t.hasClass("vc_element") || window.setTimeout(this.holdActive, 500)
        }
    })
})(window.jQuery);
window.InlineShortcodeView_vc_section = window.InlineShortcodeViewContainer.extend({
    controls_selector: "#vc_controls-template-container",
    initialize: function() {
        _.bindAll(this, "checkSectionWidth"), window.InlineShortcodeView_vc_section.__super__.initialize.call(this), vc.frame_window.jQuery(vc.frame_window.document).off("vc-full-width-row-single", this.checkSectionWidth), vc.frame_window.jQuery(vc.frame_window.document).on("vc-full-width-row-single", this.checkSectionWidth)
    },
    checkSectionWidth: function(e, i) {
        i.el.hasClass("vc_section") && i.el.attr("data-vc-stretch-content") && i.el.siblings(".vc_controls").find(".vc_controls-out-tl").css({
            left: i.offset - 17
        })
    },
    render: function() {
        var e = this.content();
        return e && e.hasClass("vc_row-has-fill") && (e.removeClass("vc_row-has-fill"), this.$el.addClass("vc_row-has-fill")), window.InlineShortcodeView_vc_section.__super__.render.call(this)
    }
});
(t => {
    window.InlineShortcodeView_vc_row = window.InlineShortcodeView.extend({
        column_tag: "vc_column",
        events: {
            mouseenter: "removeHoldActive"
        },
        layout: 1,
        addControls: function() {
            return this.$controls = t('<div class="no-controls"></div>'), this.$controls.appendTo(this.$el), this
        },
        // START UNCODE EDIT
        manipulate: function() {
            var $uncode_slider,
                $row_inners,
                uncode_slider_id,
                uncode_slider_model,
                this_model = this.model;
            if (this_model.attributes.shortcode == 'vc_row') {
                $uncode_slider = this.$el.find('[data-tag="uncode_slider"]');
                uncode_slider_id = $uncode_slider.attr('data-model-id');
                uncode_slider_model = vc.shortcodes.get(uncode_slider_id);

                $row_inners = this.$el.find('[data-tag="vc_row_inner"]');
                if (typeof $uncode_slider !== 'undefined' && $uncode_slider.length) {
                    if (this_model.attributes.params.unlock_row === 'yes' && this_model.attributes.params.unlock_row_content !== 'yes') {
                        if ( typeof uncode_slider_model !== 'undefined' ) {
                            //uncode_slider_model.attributes.params.limit_content = 'yes';
                        }
                    } else {
                        if ( typeof uncode_slider_model !== 'undefined' ) {
                            //uncode_slider_model.attributes.params.limit_content = '';
                        }
                    }
                    if (typeof $row_inners !== 'undefined' && $row_inners.length) {
                        $row_inners.each(function() {
                            var $row_inner = t(this);
                            if (this_model.attributes.params.unlock_row === 'yes' && this_model.attributes.params.unlock_row_content !== 'yes') {
                                t('> .row-child', $row_inner).addClass('already_init single-top-padding single-bottom-padding single-h-padding limit-width');
                            } else {
                                t('> .row-child', $row_inner).addClass('already_init single-top-padding single-bottom-padding single-h-padding').removeClass('limit-width');
                            }
                        })
                    }
                }
            }
            if (typeof $uncode_slider !== 'undefined' && $uncode_slider.length) {
                this_model.attributes.params.front_end_with_slider = 'true';
                $uncode_slider.closest('.row-parent')
                    .addClass('row-slider no-top-padding no-bottom-padding no-h-padding full-width')
                    .removeClass('limit-width')
                    .removeClass('cols-sm-responsive')
                    .find('.row-child:not(.already_init)')
                    .addClass('single-top-padding single-bottom-padding single-h-padding limit-width');
                var $carousel_wrapper = $uncode_slider.closest('.owl-carousel-wrapper'),
                    $uncol = $uncode_slider.closest('[data-tag="vc_column"]').attr('class', 'vc_element');
                var $row_control = $carousel_wrapper.next('.vc_controls-column').remove();
            }
        },
        // END UNCODE EDIT
        render: function() {
            var t = this.content();
            return t && t.hasClass("vc_row-has-fill") && (t.removeClass("vc_row-has-fill"), this.$el.addClass("vc_row-has-fill")), window.InlineShortcodeView_vc_row.__super__.render.call(this), this
        },
        removeHoldActive: function() {
            vc.unsetHoldActive()
        },
        addColumn: function() {
            vc.builder.create({
                shortcode: this.column_tag,
                parent_id: this.model.get("id")
            }).render()
        },
        addElement: function(t) {
            t && t.preventDefault && t.preventDefault(), this.addColumn()
        },
        changeLayout: function(t) {
            t && t.preventDefault && t.preventDefault(), this.layoutEditor().render(this.model).show()
        },
        layoutEditor: function() {
            return _.isUndefined(vc.row_layout_editor) && (vc.row_layout_editor = new vc.RowLayoutUIPanelFrontendEditor({
                el: t("#vc_ui-panel-row-layout")
            })), vc.row_layout_editor
        },
        convertToWidthsArray: function(t) {
            return _.map(t.split(/_/), function(t) {
                var e = t.split("");
                return e.splice(Math.floor(t.length / 2), 0, "/"), e.join("")
            })
        },
        changed: function() {
            // START UNCODE EDIT
            // window.InlineShortcodeView_vc_row.__super__.changed.call(this), this.addLayoutClass()
            window.InlineShortcodeView_vc_row.__super__.changed.call(this), this.addLayoutClass(), this.manipulate()
            // END UNCODE EDIT
        },
        content: function() {
            return !1 === this.$content && (this.$content = this.$el.find(".vc_container-anchor:first").parent()), this.$el.find(".vc_container-anchor:first").remove(), this.$content
        },
        addLayoutClass: function() {
            this.$el.removeClass("vc_layout_" + this.layout), this.layout = _.reject(vc.shortcodes.where({
                parent_id: this.model.get("id")
            }), function(t) {
                return t.get("deleted")
            }).length, this.$el.addClass("vc_layout_" + this.layout)
        },
        convertRowColumns: function(t, o) {
            var n, r, s;
            return !!t && (s = [], t = this.convertToWidthsArray(t), vc.layout_change_shortcodes = [], vc.layout_old_columns = vc.shortcodes.where({
                parent_id: this.model.get("id")
            }), _.each(vc.layout_old_columns, function(t) {
                t.set("deleted", !0), s.push({
                    shortcodes: vc.shortcodes.where({
                        parent_id: t.get("id")
                    }),
                    params: t.get("params")
                })
            }), _.each(t, function(t) {
                var e = s.shift();
                _.isObject(e) ? (r = o.create({
                    shortcode: this.column_tag,
                    parent_id: this.model.get("id"),
                    order: vc.shortcodes.nextOrder(),
                    params: _.extend({}, e.params, {
                        width: t
                    })
                }).last(), _.each(e.shortcodes, function(t) {
                    t.save({
                        parent_id: r.get("id"),
                        order: vc.shortcodes.nextOrder()
                    }, {
                        silent: !0
                    }), vc.layout_change_shortcodes.push(t)
                }, this)) : (n = {
                    width: t
                }, r = o.create({
                    shortcode: this.column_tag,
                    parent_id: this.model.get("id"),
                    order: vc.shortcodes.nextOrder(),
                    params: n
                }).last())
            }, this), _.each(s, function(t) {
                _.each(t.shortcodes, function(t) {
                    t.save({
                        parent_id: r.get("id"),
                        order: vc.shortcodes.nextOrder()
                    }, {
                        silent: !0
                    }), vc.layout_change_shortcodes.push(t), t.view.rowsColumnsConverted && t.view.rowsColumnsConverted()
                }, this)
            }, this), o.render(function() {
                _.each(vc.layout_change_shortcodes, function(t) {
                    t.trigger("change:parent_id"), t.view.rowsColumnsConverted && t.view.rowsColumnsConverted()
                }), _.each(vc.layout_old_columns, function(t) {
                    t.destroy()
                }), vc.layout_old_columns = [], vc.layout_change_shortcodes = []
            }), t)
        },
        allowAddControl: function() {
            return "edit" !== vc_user_access().getState("shortcodes")
        },
        allowAddControlOnEmpty: function() {
            return "edit" !== vc_user_access().getState("shortcodes")
            // START UNCODE EDIT
        },
        destroy: function(e) {
            if (this.model.attributes.shortcode === 'vc_row_inner' && t(this.el.parentElement).hasClass('owl-item')) {
                var carousel_id = t(this.el.parentElement).closest('.owl-carousel').attr('id'),
                    item_index = t(this.el.parentElement).attr('data-index'),
                    randID = Math.round(new Date().getTime() + (Math.random() * 100));
                vc.events.trigger('removed-owl-item', carousel_id, item_index, randID);
            }
            window.InlineShortcodeView_vc_row.__super__.destroy.call(this, e)
            // END UNCODE EDIT
        }
    })
})(window.jQuery);
(i => {
    window.InlineShortcodeView_vc_column = window.InlineShortcodeViewContainerWithParent.extend({
        controls_selector: "#vc_controls-template-vc_column",
        resizeDomainName: "columnSize",
        _x: 0,
        css_width: 12,
        prepend: !1,
        initialize: function(s) {
            window.InlineShortcodeView_vc_column.__super__.initialize.call(this, s), _.bindAll(this, "startChangeSize", "stopChangeSize", "resize")
        },
        render: function() {
            return window.InlineShortcodeView_vc_column.__super__.render.call(this), this.prepend = !1, i('<div class="vc_resize-bar"></div>').appendTo(this.$el).mousedown(this.startChangeSize), this.setColumnClasses(), this.customCssClassReplace(), this
        },
        destroy: function(s) {
            var e = this.model.get("parent_id");
            //START UNCODE EDIT
            if (this.model.attributes.shortcode === 'vc_column_inner' && i(this.el).closest('.owl-item').length) {
                var carousel_id = i(this.el.parentElement).closest('.owl-carousel').attr('id'),
                    item_index = i(this.el).closest('.owl-item').attr('data-index'),
                    randID = Math.round(new Date().getTime() + (Math.random() * 100));
                vc.events.trigger('removed-owl-item', carousel_id, item_index, randID);
            }
            //END UNCODE EDIT
            window.InlineShortcodeView_vc_column.__super__.destroy.call(this, s), vc.shortcodes.where({
                parent_id: e
            }).length || vc.shortcodes.get(e).destroy()
        },
        customCssClassReplace: function() {
            var s = this.$el.find(".wpb_column").attr("class"),
                e = !(!s || !s.match) && s.match(/.*(vc_custom_\d+).*/);
            e && e[1] && (this.$el.addClass(e[1]), this.$el.find(".wpb_column").attr("class", s.replace(e[1], "").trim()))
        },
        setColumnClasses: function() {
            var s = this.getParam("offset") || "",
                e = this.getParam("width") || "1/1",
                i = this.$el.find("> .wpb_column");
            this.css_class_width = this.convertSize(e), this.css_class_width !== e && (this.css_class_width = this.css_class_width.replace(/[^\d]/g, "")), i.removeClass("vc_col-sm-" + this.css_class_width), s.match(/vc_col\-sm\-\d+/) || this.$el.addClass("vc_col-sm-" + this.css_class_width), vc.responsive_disabled && (s = s.replace(/vc_col\-(lg|md|xs)[^\s]*/g, "")), _.isEmpty(s) || (i.removeClass(s), this.$el.addClass(s))
        },
        startChangeSize: function(s) {
            var e = this.getParam(void 0) || 12;
            this._grid_step = this.parent_view.$el.width() / e, vc.frame_window.jQuery("body").addClass("vc_column-dragging").disableSelection(), this._x = parseInt(s.pageX, 10), vc.$page.bind("mousemove." + this.resizeDomainName, this.resize), i(vc.frame_window.document).on("mouseup", this.stopChangeSize)
        },
        stopChangeSize: function() {
            this._x = 0, vc.frame_window.jQuery("body").removeClass("vc_column-dragging").enableSelection(), vc.$page.unbind("mousemove." + this.resizeDomainName)
        },
        resize: function(s) {
            var e = this.model.get("params"),
                i = s.pageX - this._x;
            Math.abs(i) < this._grid_step || (this._x = parseInt(s.pageX, 10), s = "" + this.css_class_width, 0 < i ? this.css_class_width += 1 : i < 0 && --this.css_class_width, 12 < this.css_class_width && (this.css_class_width = 12), this.css_class_width < 1 && (this.css_class_width = 1), e.width = vc.getColumnSize(this.css_class_width), this.model.save({
                params: e
            }, {
                silent: !0
            }), this.$el.removeClass("vc_col-sm-" + s).addClass("vc_col-sm-" + this.css_class_width))
        },
        convertSize: function(s) {
            var e = "vc_col-sm-",
                i = s ? s.split("/") : [1, 1],
                t = _.range(1, 13),
                c = !_.isUndefined(i[0]) && 0 <= _.indexOf(t, parseInt(i[0], 10)) && parseInt(i[0], 10),
                t = !_.isUndefined(i[1]) && 0 <= _.indexOf(t, parseInt(i[1], 10)) && parseInt(i[1], 10);
            return "5" === i[1] ? s : !1 !== c && !1 !== t ? e + 12 * c / t : e + "12"
        },
        allowAddControl: function() {
            // START UNCODE EDIT
            var this_model = this.model;
            setTimeout(function() {
                vc.events.trigger("changeLayout", this_model)
            }, 1);
            // END UNCODE EDIT
            return vc_user_access().shortcodeAll("vc_column")
        }
    })
})(window.jQuery);
window.InlineShortcodeView_vc_row_inner = window.InlineShortcodeView_vc_row.extend({
    column_tag: "vc_column_inner"
});
window.InlineShortcodeView_vc_column_inner = window.InlineShortcodeView_vc_column.extend({});
window.InlineShortcodeView_vc_column_text = window.InlineShortcodeView.extend({
    initialize: function(t) {
        window.InlineShortcodeView_vc_column_text.__super__.initialize.call(this, t), _.bindAll(this, "setupEditor", "updateContent")
    },
    setupEditor: function(t) {
        t.on("keyup", this.updateContent)
    },
    updateContent: function() {
        var t = this.model.get("params");
        t.content = tinyMCE.activeEditor.getContent(), this.model.save({
            params: t
        }, {
            silent: !0
        })
    }
});
window.InlineShortcodeView_vc_pie = window.InlineShortcodeView.extend({
    render: function() {
        return _.bindAll(this, "parentChanged"), window.InlineShortcodeView_vc_pie.__super__.render.call(this), this.unbindResize(), vc.frame_window.vc_iframe.addActivity(function() {
            this.vc_iframe.vc_pieChart()
        }), this
    },
    unbindResize: function() {
        vc.frame_window.jQuery(vc.frame_window).off("resize.vcPieChartEditable")
    },
    parentChanged: function() {
        this.$el.find(".vc_pie_chart").removeClass("vc_ready"), vc.frame_window.vc_pieChart()
    },
    rowsColumnsConverted: function() {
        window.setTimeout(this.parentChanged, 200), this.parentChanged()
    }
});
window.InlineShortcodeView_vc_round_chart = window.InlineShortcodeView.extend({
    render: function() {
        var e = this.model.get("id");
        return window.InlineShortcodeView_vc_round_chart.__super__.render.call(this), vc.frame_window.vc_iframe.addActivity(function() {
            this.vc_round_charts(e)
        }), this
    },
    parentChanged: function() {
        var e = this.model.get("id");
        return window.InlineShortcodeView_vc_round_chart.__super__.parentChanged.call(this), _.defer(function() {
            vc.frame_window.vc_round_charts(e)
        }), this
    },
    remove: function() {
        var e = this.$el.find(".vc_round-chart").data("vcChartId");
        window.InlineShortcodeView_vc_round_chart.__super__.remove.call(this), e && void 0 !== vc.frame_window.Chart.instances[e] && delete vc.frame_window.Chart.instances[e]
    }
});
window.InlineShortcodeView_vc_line_chart = window.InlineShortcodeView.extend({
    render: function() {
        var e = this.model.get("id");
        return window.InlineShortcodeView_vc_line_chart.__super__.render.call(this), vc.frame_window.vc_iframe.addActivity(function() {
            this.vc_line_charts(e)
        }), this
    },
    parentChanged: function() {
        var e = this.model.get("id");
        return window.InlineShortcodeView_vc_line_chart.__super__.parentChanged.call(this), _.defer(function() {
            vc.frame_window.vc_line_charts(e)
        }), this
    },
    remove: function() {
        var e = this.$el.find(".vc_line-chart").data("vcChartId");
        window.InlineShortcodeView_vc_line_chart.__super__.remove.call(this), e && void 0 !== vc.frame_window.Chart.instances[e] && delete vc.frame_window.Chart.instances[e]
    }
});
window.InlineShortcodeView_vc_single_image = window.InlineShortcodeView.extend({
    render: function() {
        var e = this.model.get("id");
        return window.InlineShortcodeView_vc_single_image.__super__.render.call(this), vc.frame_window.vc_iframe.addActivity(function() {
            void 0 !== this.vc_image_zoom && this.vc_image_zoom(e)
        }), this
    },
    parentChanged: function() {
        var e = this.model.get("id");
        return window.InlineShortcodeView_vc_single_image.__super__.parentChanged.call(this), void 0 !== vc.frame_window.vc_image_zoom && _.defer(function() {
            vc.frame_window.vc_image_zoom(e)
        }), this
    }
});
window.InlineShortcodeView_vc_images_carousel = window.InlineShortcodeView.extend({
    render: function() {
        var e = this.model.get("id");
        return window.InlineShortcodeView_vc_images_carousel.__super__.render.call(this), vc.frame_window.vc_iframe.addActivity(function() {
            this.vc_iframe.vc_imageCarousel(e)
        }), this
    }
});
window.InlineShortcodeView_vc_gallery = window.InlineShortcodeView.extend({
    render: function() {
        var e = this.model.get("id");
        return window.InlineShortcodeView_vc_gallery.__super__.render.call(this), vc.frame_window.vc_iframe.addActivity(function() {
            this.vc_iframe.vc_gallery(e)
        }), this
    },
    parentChanged: function() {
        window.InlineShortcodeView_vc_gallery.__super__.parentChanged.call(this), vc.frame_window.vc_iframe.vc_gallery(this.model.get("id"))
    }
});
window.InlineShortcodeView_vc_posts_slider = window.InlineShortcodeView.extend({
    render: function() {
        var e = this.model.get("id");
        return window.InlineShortcodeView_vc_posts_slider.__super__.render.call(this), vc.frame_window.vc_iframe.addActivity(function() {
            this.vc_iframe.vc_postsSlider(e)
        }), this
    }
});
window.InlineShortcodeView_vc_toggle = window.InlineShortcodeView.extend({
    render: function() {
        var e = this.model.get("id");
        return window.InlineShortcodeView_vc_toggle.__super__.render.call(this), vc.frame_window.vc_iframe.addActivity(function() {
            this.vc_iframe.vc_toggle(e)
        }), this
    }
});
window.InlineShortcodeView_vc_raw_js = window.InlineShortcodeView.extend({
    render: function() {
        window.InlineShortcodeView_vc_raw_js.__super__.render.call(this);
        var e = this.$el.find(".vc_js_inline_holder").val();
        return this.$el.find(".wpb_wrapper").html(e), this
    }
});
window.InlineShortcodeView_vc_basic_grid = vc.shortcode_view.extend({
    render: function(i) {
        return window.InlineShortcodeView_vc_basic_grid.__super__.render.call(this, i), this.initGridJs(!0), this
    },
    parentChanged: function() {
        window.InlineShortcodeView_vc_basic_grid.__super__.parentChanged.call(this), this.initGridJs()
    },
    initGridJs: function(i) {
        var t = this.model;
        if (!0 === t.get("grid_activity")) return !1;
        t.set("grid_activity", !0), !0 === i ? vc.frame_window.vc_iframe.addActivity(function() {
            this.vc_iframe.gridInit(t.get("id")), t.set("grid_activity", !1)
        }) : (vc.frame_window.vc_iframe.gridInit(t.get("id")), t.set("grid_activity", !1))
    }
});
window.InlineShortcodeView_vc_masonry_grid = window.InlineShortcodeView_vc_basic_grid.extend();
window.InlineShortcodeView_vc_media_grid = window.InlineShortcodeView_vc_basic_grid.extend();
window.InlineShortcodeView_vc_masonry_media_grid = window.InlineShortcodeView_vc_basic_grid.extend();
(c => {
    window.InlineShortcodeView_vc_tta_accordion = window.InlineShortcodeViewContainer.extend({
        events: {},
        childTag: "vc_tta_section",
        activeClass: "vc_active",
        defaultSectionTitle: window.i18nLocale.section,
        initialize: function() {
            _.bindAll(this, "buildSortable", "updateSorting"), window.InlineShortcodeView_vc_tta_accordion.__super__.initialize.call(this)
        },
        render: function() {
            return window.InlineShortcodeViewContainer.__super__.render.call(this), this.content(), this.buildPagination(), this
        },
        addControls: function() {
            return this.$controls = c('<div class="no-controls"></div>'), this.$controls.appendTo(this.$el), this
        },
        addElement: function(t) {
            t && t.preventDefault && t.preventDefault(), this.addSection("parent.prepend" === c(t.currentTarget).data("vcControl"))
        },
        appendElement: function(t) {
            return this.addElement(t)
        },
        prependElement: function(t) {
            return this.addElement(t)
        },
        addSection: function(t) {
            var e, i = {
                shortcode: this.childTag,
                parent_id: this.model.get("id"),
                isActiveSection: !0,
                params: {
                    title: this.defaultSectionTitle
                }
            };
            for (t && (vc.activity = "prepend", i.order = this.getSiblingsFirstPositionIndex()), vc.builder.create(i), e = vc.builder.models.length - 1; 0 <= e; e--) vc.builder.models[e].get("shortcode");
            vc.builder.render()
        },
        getSiblingsFirstPositionIndex: function() {
            var t = 0,
                e = vc.shortcodes.sort().findWhere({
                    parent_id: this.model.get("id")
                });
            return t = e ? e.get("order") - 1 : t
        },
        changed: function() {
            vc.frame_window.vc_iframe.buildTTA(), window.InlineShortcodeView_vc_tta_accordion.__super__.changed.call(this), _.defer(this.buildSortable), this.buildPagination()
        },
        updated: function() {
            window.InlineShortcodeView_vc_tta_accordion.__super__.updated.call(this), _.defer(this.buildSortable), this.buildPagination()
        },
        buildSortable: function() {
            vc_user_access().shortcodeEdit(this.model.get("shortcode")) && this.$el && this.$el.find(".vc_tta-panels").sortable({
                forcePlaceholderSize: !0,
                placeholder: "vc_placeholder-row",
                start: this.startSorting,
                over: function(t, e) {
                    e.placeholder.css({
                        maxWidth: e.placeholder.parent().width()
                    }), e.placeholder.removeClass("vc_hidden-placeholder")
                },
                items: "> .vc_element",
                handle: ".vc_tta-panel-heading, .vc_child-element-move",
                update: this.updateSorting
            })
        },
        startSorting: function(t, e) {
            e.placeholder.width(e.item.width())
        },
        updateSorting: function() {
            var i = this;
            this.getPanelsList().find("> .vc_element").each(function() {
                var t = c(this),
                    e = t.data("modelId");
                vc.shortcodes.get(e).save({
                    order: i.getIndex(t)
                }, {
                    silent: !0
                })
            }), this.buildPagination()
        },
        getIndex: function(t) {
            return t.index()
        },
        getPanelsList: function() {
            return this.$el.find(".vc_tta-panels")
        },
        parentChanged: function() {
            window.InlineShortcodeView_vc_tta_accordion.__super__.parentChanged.call(this), void 0 !== vc.frame_window.vc_round_charts && vc.frame_window.vc_round_charts(this.model.get("id")), void 0 !== vc.frame_window.vc_line_charts && vc.frame_window.vc_line_charts(this.model.get("id"))
        },
        buildPagination: function() {},
        removePagination: function() {
            this.$el.find(".vc_tta-panels-container").find(" > .vc_pagination").remove()
        },
        getPaginationList: function() {
            var t, e, i, n, a, o = this.model.get("params");
            return !_.isUndefined(o.pagination_style) && o.pagination_style.length ? (t = this.$el.find("[data-vc-accordion]"), (e = []).push("vc_general"), e.push("vc_pagination"), i = o.pagination_style.split("-"), e.push("vc_pagination-style-" + i[0]), e.push("vc_pagination-shape-" + i[1]), !_.isUndefined(o.pagination_color) && o.pagination_color.length && e.push("vc_pagination-color-" + o.pagination_color), (a = []).push('<ul class="' + e.join(" ") + '">'), n = this, t.each(function() {
                var t, e = c(this),
                    i = ["vc_pagination-item"];
                e.closest(".vc_tta-panel").hasClass(n.activeClass) && i.push(n.activeClass), 0 !== (t = e.attr("href")).indexOf("#") && (t = ""), e = '<a href="javascript:;" data-vc-target="' + (t = e.attr("data-vc-target") ? e.attr("data-vc-target") : t) + '" class="vc_pagination-trigger" data-vc-tabs data-vc-container=".vc_tta"></a>', a.push('<li class="' + i.join(" ") + '" data-vc-tab>' + e + "</li>")
            }), a.push("</ul>"), c(a.join(""))) : null
        }
    })
})(window.jQuery);
(l => {
    window.InlineShortcodeView_vc_tta_tabs = window.InlineShortcodeView_vc_tta_accordion.extend({
        render: function() {
            return window.InlineShortcodeView_vc_tta_tabs.__super__.render.call(this), _.bindAll(this, "buildSortableNavigation", "updateSortingNavigation"), this.createTabs(), _.defer(this.buildSortableNavigation), this
        },
        createTabs: function() {
            var t = _.sortBy(vc.shortcodes.where({
                parent_id: this.model.get("id")
            }), function(t) {
                return t.get("order")
            });
            _.each(t, function(t) {
                this.sectionUpdated(t, !0)
            }, this)
        },
        defaultSectionTitle: window.i18nLocale.tab,
        addIcon: function(t, a) {
            var e, i;
            return "true" === t.getParam("add_icon") && (e = t.getParam("i_icon_" + t.getParam("i_type")), _.isUndefined(e) || (i = '<i class="' + ("vc_tta-icon " + e) + '"></i>'), "right" === t.getParam("i_position") ? a += i : a = i + a), a
        },
        sectionUpdated: function(t, a) {
            var e, i, n = !1,
                d = t.get("id"),
                s = this.$el.find(".vc_tta-tabs-container .vc_tta-tabs-list"),
                o = s.find('[data-vc-target="[data-model-id=' + d + ']"]'),
                r = this.$el.find(".wpb-tta-toggle"),
                c = t.getParam("title");
            o.length ? (i = this.addIcon(t, i = '<span class="vc_tta-title-text">' + c + "</span>"), o.html(i)) : r.length ? (o = this.$el.find('[data-model-id="' + d + '"]')).length && (r = this.$el.find(".wpb-tta-toggle-wrapper span:first"), e = this.$el.find(".wpb-tta-toggle-wrapper span:last"), ("1" === o.find("[data-vc-section-index]").attr("data-vc-section-index") ? r : e).html(c)) : (i = this.addIcon(t, i = '<span class="vc_tta-title-text">' + c + "</span>"), o = l('<li class="vc_tta-tab" data-vc-target-model-id="' + d + '" data-vc-tab><a href="javascript:;" data-vc-use-cache="false" data-vc-tabs data-vc-target="[data-model-id=' + d + ']" data-vc-container=".vc_tta">' + i + "</a></li>"), !0 !== a && -1 < (r = _.pluck(_.sortBy(vc.shortcodes.where({
                parent_id: this.model.get("id")
            }), function(t) {
                return t.get("order")
            }), "id").indexOf(t.get("id")) - 1) && s.find("[data-vc-tab]:eq(" + r + ")").length && (o.insertAfter(s.find("[data-vc-tab]:eq(" + r + ")")), n = !0), n || o.appendTo(s), t.get("isActiveSection") && o.addClass(this.activeClass)), this.buildPagination()
        },
        getNextTab: function(t) {
            var a = this.$el.find(".vc_tta-tabs-container .vc_tta-tabs-list").children(),
                e = a.length - 1,
                t = t.index(),
                e = t !== e ? a.eq(t + 1) : a.eq(t - 1);
            return e
        },
        removeSection: function(t) {
            var a, t = this.$el.find('.vc_tta-tabs-container .vc_tta-tabs-list [data-vc-target="[data-model-id=' + t + ']"]').parent();
            t.hasClass(this.activeClass) && (a = this.getNextTab(t), vc.frame_window.jQuery(a).find("[data-vc-target]").trigger("click")), t.remove(), this.buildPagination()
        },
        buildSortableNavigation: function() {
            vc_user_access().shortcodeEdit(this.model.get("shortcode")) && this.$el.find(".vc_tta-tabs-container .vc_tta-tabs-list").sortable({
                items: ".vc_tta-tab",
                forcePlaceholderSize: !0,
                placeholder: "vc_tta-tab vc_placeholder-tta-tab",
                helper: this.renderSortingHelper,
                start: function(t, a) {
                    a.placeholder.width(a.item.width())
                },
                over: function(t, a) {
                    a.placeholder.css({
                        maxWidth: a.placeholder.parent().width()
                    }), a.placeholder.removeClass("vc_hidden-placeholder")
                },
                update: this.updateSortingNavigation
            })
        },
        updateSorting: function(t, a) {
            window.InlineShortcodeView_vc_tta_tabs.__super__.updateSorting.call(this, t, a), this.updateTabsPositions(this.getPanelsList())
        },
        updateSortingNavigation: function() {
            var e = this,
                t = this.$el.find(".vc_tta-tabs-list");
            t.find("> .vc_tta-tab").each(function() {
                var t = l(this).removeAttr("style"),
                    a = t.data("vcTargetModelId");
                vc.shortcodes.get(a).save({
                    order: e.getIndex(t)
                }, {
                    silent: !0
                })
            }), this.updatePanelsPositions(t)
        },
        updateTabsPositions: function(t) {
            var a, e = this.$el.find(".vc_tta-tabs-list");
            e.length && (a = [], t = t.sortable("toArray", {
                attribute: "data-model-id"
            }), _.each(t, function(t) {
                a.push(e.find('[data-vc-target-model-id="' + t + '"]'))
            }, this), e.prepend(a)), this.buildPagination()
        },
        updatePanelsPositions: function(t) {
            var a = this.getPanelsList(),
                e = [],
                t = t.sortable("toArray", {
                    attribute: "data-vc-target-model-id"
                });
            _.each(t, function(t) {
                e.push(a.find('[data-model-id="' + t + '"]'))
            }, this), a.prepend(e), this.buildPagination()
        },
        renderSortingHelper: function(t, a) {
            var e = a,
                i = a.width() + 1,
                a = a.height();
            return e.width(i), e.height(a), e
        },
        buildPagination: function() {
            var t;
            this.removePagination(), t = this.model.get("params"), !_.isUndefined(t.pagination_style) && t.pagination_style.length && ("top" === t.tab_position ? this.$el.find(".vc_tta-panels-container").append(this.getPaginationList()) : this.getPaginationList().insertBefore(this.$el.find(".vc_tta-container .vc_tta-panels")))
        }
    })
})(window.jQuery);
window.InlineShortcodeView_vc_tta_tour = window.InlineShortcodeView_vc_tta_tabs.extend({
    defaultSectionTitle: window.i18nLocale.section,
    buildPagination: function() {
        this.removePagination();
        var i = this.model.get("params");
        !_.isUndefined(i.pagination_style) && i.pagination_style.length && this.$el.find(".vc_tta-panels-container").append(this.getPaginationList())
    }
});
window.InlineShortcodeView_vc_tta_toggle = window.InlineShortcodeView_vc_tta_tour.extend({
    render: function() {
        var t = this.model.get("id");
        return window.InlineShortcodeView_vc_tta_toggle.__super__.render.call(this), vc.frame_window.vc_iframe.addActivity(function() {
            this.vc_iframe.vc_tta_toggle(t)
        }), this
    }
});
window.InlineShortcodeView_vc_tta_pageable = window.InlineShortcodeView_vc_tta_tour.extend({});
(i => {
    window.vc.ttaSectionActivateOnClone = !1, window.InlineShortcodeView_vc_tta_section = window.InlineShortcodeViewContainerWithParent.extend({
        events: {
            'click > .vc_controls [data-vc-control="destroy"]': "destroy",
            'click > .vc_controls [data-vc-control="edit"]': "edit",
            'click > .vc_controls [data-vc-control="clone"]': "clone",
            'click > .vc_controls [data-vc-control="copy"]': "copy",
            'click > .vc_controls [data-vc-control="paste"]': "paste",
            'click > .vc_controls [data-vc-control="prepend"]': "prependElement",
            'click > .vc_controls [data-vc-control="append"]': "appendElement",
            'click > .vc_controls [data-vc-control="parent.destroy"]': "destroyParent",
            'click > .vc_controls [data-vc-control="parent.edit"]': "editParent",
            'click > .vc_controls [data-vc-control="parent.clone"]': "cloneParent",
            'click > .vc_controls [data-vc-control="parent.copy"]': "copyParent",
            'click > .vc_controls [data-vc-control="parent.paste"]': "pasteParent",
            'click > .vc_controls [data-vc-control="parent.append"]': "addSibling",
            "click .vc_tta-panel-body > [data-js-panel-body].vc_empty-element": "appendElement",
            "click > .vc_controls .vc_control-btn-switcher": "switchControls",
            mouseenter: "resetActive",
            mouseleave: "holdActive"
        },
        controls_selector: "#vc_controls-template-vc_tta_section",
        previousClasses: !1,
        activeClass: "vc_active",
        render: function() {
            var t = this.model;
            return window.InlineShortcodeView_vc_tta_section.__super__.render.call(this), _.bindAll(this, "bindAccordionEvents"), this.refreshContent(), this.moveClasses(), _.defer(this.bindAccordionEvents), this.isAsActiveSection() && window.vc.frame_window.vc_iframe.addActivity(function() {
                window.vc.frame_window.jQuery('[data-vc-accordion][data-vc-target="[data-model-id=' + t.get("id") + ']"]').trigger("click")
            }), this
        },
        allowAddControl: function() {
            return vc_user_access().shortcodeAll("vc_tta_section")
        },
        clone: function(t) {
            vc.ttaSectionActivateOnClone = !0, window.InlineShortcodeView_vc_tta_section.__super__.clone.call(this, t)
        },
        copy: function(t) {
            vc.ttaSectionActivateOnClone = !0, window.InlineShortcodeView_vc_tta_section.__super__.copy.call(this, t)
        },
        paste: function(t) {
            vc.ttaSectionActivateOnClone = !0, window.InlineShortcodeView_vc_tta_section.__super__.paste.call(this, t)
        },
        addSibling: function(t) {
            window.InlineShortcodeView_vc_tta_section.__super__.addSibling.call(this, t)
        },
        parentChanged: function() {
            return window.InlineShortcodeView_vc_tta_section.__super__.parentChanged.call(this), this.refreshContent(!0), this
        },
        changed: function() {
            this.allowAddControlOnEmpty() && 0 === this.$el.find(".vc_element[data-tag]").length ? this.$el.addClass("vc_empty").find(".vc_tta-panel-body > [data-js-panel-body]").addClass("vc_empty-element") : this.$el.removeClass("vc_empty").find(".vc_tta-panel-body > [data-js-panel-body].vc_empty-element").removeClass("vc_empty-element")
        },
        moveClasses: function() {
            var t;
            this.previousClasses && (this.$el.get(0).className = this.$el.get(0).className.replace(this.previousClasses, "")), t = this.$el.find(".vc_tta-panel").get(0).className, this.$el.attr("data-vc-content", this.$el.find(".vc_tta-panel").data("vcContent")), this.previousClasses = t, this.$el.find(".vc_tta-panel").get(0).className = "", this.$el.get(0).className = this.$el.get(0).className + " " + this.previousClasses, this.$el.find(".vc_tta-panel-title [data-vc-target]").attr("data-vc-target", "[data-model-id=" + this.model.get("id") + "]")
        },
        refreshContent: function(t) {
            var e, c, o, n = vc.shortcodes.get(this.model.get("parent_id"));
            _.isObject(n) && (o = vc.getDefaultsAndDependencyMap(n.get("shortcode")), o = _.extend({}, o.defaults, n.get("params")), e = this.$el.find(".vc_tta-controls-icon"), o && !_.isUndefined(o.c_icon) && 0 < o.c_icon.length ? (e.length ? e.attr("data-vc-tta-controls-icon", o.c_icon) : this.$el.find("[data-vc-tta-controls-icon-wrapper]").append(i('<i class="vc_tta-controls-icon" data-vc-tta-controls-icon="' + o.c_icon + '"></i>')), !_.isUndefined(o.c_position) && 0 < o.c_position.length && (c = this.$el.find("[data-vc-tta-controls-icon-position]")).length && ("default" === o.c_position ? c.attr("data-vc-tta-controls-icon-position", "rtl" === i("html").attr("dir") ? "right" : "left") : c.attr("data-vc-tta-controls-icon-position", o.c_position))) : (e.remove(), this.$el.find("[data-vc-tta-controls-icon-position]").attr("data-vc-tta-controls-icon-position", "")), !0 !== t) && n.view && n.view.sectionUpdated && n.view.sectionUpdated(this.model)
        },
        setAsActiveSection: function(t) {
            this.model.set("isActiveSection", !!t)
        },
        isAsActiveSection: function() {
            return !!this.model.get("isActiveSection")
        },
        bindAccordionEvents: function() {
            var e = this;
            window.vc.frame_window.jQuery('[data-vc-target="[data-model-id=' + this.model.get("id") + ']"]').on("show.vc.accordion hide.vc.accordion", function(t) {
                e.setAsActiveSection("show" === t.type)
            })
        },
        destroy: function(t) {
            var e = this.model.get("parent_id");
            window.InlineShortcodeView_vc_tta_section.__super__.destroy.call(this, t), t = vc.shortcodes.get(e), vc.shortcodes.where({
                parent_id: e
            }).length ? t.view && t.view.removeSection && t.view.removeSection(this.model.get("id")) : t.destroy()
        }
    })
})(window.jQuery);
window.vc.ttaSectionActivateOnClone = !1, window.InlineShortcodeView_vc_tta_toggle_section = window.InlineShortcodeView_vc_tta_section.extend({
    controls_selector: "#vc_controls-template-vc_tta_toggle_section",
    allowAddControl: function() {
        return vc_user_access().shortcodeAll("vc_tta_toggle_section")
    }
});
(() => {
    function t(t) {
        var e = "vc_tta_toggle" === t.get("shortcode") ? "vc_tta_toggle_section" : "vc_tta_section";
        window.vc.events.on("shortcodes:" + e + ":add:parent:" + t.get("id"), function(t) {
            var e = window.vc.shortcodes.get(t.get("parent_id")),
                o = parseInt(e.getParam("active_section"), 10);
            return void 0 === o && (o = 1), _.pluck(_.sortBy(window.vc.shortcodes.where({
                parent_id: e.get("id")
            }), function(t) {
                return t.get("order")
            }), "id").indexOf(t.get("id")) === o - 1 && t.set("isActiveSection", !0), t
        }), window.vc.events.on("shortcodes:" + e + ":clone:parent:" + t.get("id"), function(t) {
            window.vc.ttaSectionActivateOnClone && t.set("isActiveSection", !0), window.vc.ttaSectionActivateOnClone = !1
        })
    }
    window.vc.events.on("shortcodes:vc_tta_accordion:add", t), window.vc.events.on("shortcodes:vc_tta_tabs:add", t), window.vc.events.on("shortcodes:vc_tta_tour:add", t), window.vc.events.on("shortcodes:vc_tta_pageable:add", t), window.vc.events.on("shortcodes:vc_tta_toggle:add", t)
})();
window.InlineShortcodeView_vc_carousel = window.InlineShortcodeView_vc_images_carousel.extend({});
(i => {
    window.vc.cloneMethod_vc_tab = function(t, e) {
        return t.params = _.extend({}, t.params), t.params.tab_id = vc_guid() + "-cl", _.isUndefined(e.get("active_before_cloned")) || (t.active_before_cloned = e.get("active_before_cloned")), t
    }, window.InlineShortcodeView_vc_tabs = window.InlineShortcodeView_vc_row.extend({
        events: {
            "click > :first > .vc_empty-element": "addElement",
            "click > :first > .wpb_wrapper > .ui-tabs-nav > li": "setActiveTab"
        },
        already_build: !1,
        active_model_id: !1,
        $tabsNav: !1,
        active: 0,
        render: function() {
            return _.bindAll(this, "stopSorting"), this.$tabs = this.$el.find("> .wpb_tabs"), window.InlineShortcodeView_vc_tabs.__super__.render.call(this), this.buildNav(), this
        },
        buildNav: function() {
            var e = this.tabsControls();
                // START UNCODE EDIT
            if (e.closest('.product').length) {
                var params = this.model.get("params");
                if (params) {
                    params.product_from_builder = 'yes';
                    this.model.set("params", params);
                }
            }
            // END UNCODE EDIT
            this.$tabs.find('> .wpb_wrapper > .vc_element[data-tag="vc_tab"]').each(function(t) {
                i("li:eq(" + t + ")", e).attr("data-m-id", i(this).data("model-id"))
            })
        },
        changed: function() {
            this.allowAddControlOnEmpty() && 0 === this.$el.find(".vc_element[data-tag]").length ? this.$el.addClass("vc_empty").find("> :first > div").addClass("vc_empty-element") : this.$el.removeClass("vc_empty").find("> :first > div").removeClass("vc_empty-element"), this.setSorting()
        },
        setActiveTab: function(t) {
            t = i(t.currentTarget);
            this.active_model_id = t.data("m-id")
        },
        tabsControls: function() {
            return this.$tabsNav || (this.$tabsNav = this.$el.find(".wpb_tabs_nav"))
        },
        buildTabs: function(t) {
            t && (this.active_model_id = t.get("id"), this.active = this.tabsControls().find("[data-m-id=" + this.active_model_id + "]").index()), !1 === this.active_model_id && (t = this.tabsControls().find("li:first"), this.active = t.index(), this.active_model_id = t.data("m-id")), this.checkCount() || window.vc.frame_window.vc_iframe.buildTabs(this.$tabs, this.active)
        },
        checkCount: function() {
            return this.$tabs.find('> .wpb_wrapper > .vc_element[data-tag="vc_tab"]').length != this.$tabs.find("> .wpb_wrapper > .vc_element.vc_vc_tab").length
        },
        beforeUpdate: function() {
            // START UNCODE EDIT
            var $el = this.$el,
                $temp = i('<div id="temp_tabs" style="display:none"></div>'),
                data_classes = this.$el.attr('data-class');
            this.$el.closest('.vc_element-container').attr('data-temp-class', data_classes);
            this.$el.after($temp);
            $el.find('.wpb_tabs_nav li').each(function(){
                var $li = i(this);
                var $clone = $li.clone();
                $li.after($clone);
                $temp.append($li);
            });
            // END UNCODE EDIT
            this.$tabs.find(".wpb_tabs_heading").remove(), window.vc.frame_window.vc_iframe.destroyTabs(this.$tabs)
        },
        updated: function() {
            // START UNCODE EDIT
            var $tabsNav = this.$tabsNav,
                $temp = this.$el.closest('.uncol').find('#temp_tabs');
            $temp.find('li').each(function(){
                var $li = i(this);
                $tabsNav.append($li);
            });
            $temp.remove();
            if (typeof this.model.changed.params !== 'undefined' && this.model.changed.params.vertical === 'yes') {
                this.$tabsNav.addClass('vertical');
            } else {
                this.$tabsNav.removeClass('vertical');
            }
            var _this = this;
            $tabsNav.find('li').each(function(){
                var $li = i(this);
                if ( i('.tab-excerpt', $li) ) {
                    _this.updateIfExistTab($li.data('model'));
                }
            });
            // END UNCODE EDIT
            window.InlineShortcodeView_vc_tabs.__super__.updated.call(this), this.$tabs.find(".wpb_tabs_nav:first").remove(), this.buildNav(), window.vc.frame_window.vc_iframe.buildTabs(this.$tabs), this.setSorting()
        },
        rowsColumnsConverted: function() {
            _.each(window.vc.shortcodes.where({
                parent_id: this.model.get("id")
            }), function(t) {
                t.view.rowsColumnsConverted && t.view.rowsColumnsConverted()
            })
        },
        addTab: function(t) {
            // START UNCODE EDIT
            if (this.updateIfExistTab(t)) return !1;
            var $control = this.buildControlHtml(t);
            if (this.tabsControls().closest('.wootabs').length) {
                var $content = this.tabsControls().closest('.wootabs').find('.tab-content');
                var pane_length = i('.tab-pane', $content).length;
                i('.tab-pane', $content).eq(pane_length - 1).find('> div:first-child').addClass('product-tab');
            }
            var $first_tab = this.tabsControls().find('.vc_tta-tab').first(),
                tab_classes = $first_tab.attr('class');
                $control.addClass(tab_classes).removeClass('active');

            if ( t.get("cloned") ) {
                var slug = t.attributes.params.slug;
                if ( typeof slug !== 'undefined' && slug !== '' ) {
                    t.attributes.params.slug = slug + '_cloned';
                    window.vc.$page.find('[data-model-id="' + t.get("id") + '"]').attr('data-id', slug + '_cloned');
                }
            } else {
                var tab_extra_class = this.tabExtraClass(t),
                    link_extra_class = this.linkExtraClass(t);
            }
            if ( typeof tab_extra_class !== 'undefined' ) {
                $control.find('span span span').addClass(tab_extra_class.join(' '));
            }
            if ( typeof link_extra_class !== 'undefined' ) {
                $control.find('a').addClass(link_extra_class.join(' '));
            }
            //$view.attr('data-id', dataId);
            if ( t.get( 'cloned' ) && this.tabsControls().find( '[data-m-id=' + t.get( 'cloned_from' ).id + ']' ).length ) {
                if ( !t.get( 'cloned_appended' ) ) {
                    this.tabsControls().find( '[data-m-id=' + t.get( 'cloned_from' ).id + ']' ).after($control)
                    t.set( 'cloned_appended', true );
                }
            } else {
                $control.appendTo( this.tabsControls() );
                this.changed();
            }
            return true;
            // var e;
            // return !this.updateIfExistTab(t) && (e = this.buildControlHtml(t), t.get("cloned") && this.tabsControls().find("[data-m-id=" + t.get("cloned_from").id + "]").length ? t.get("cloned_appended") || (e.appendTo(this.tabsControls()), t.set("cloned_appended", !0)) : e.appendTo(this.tabsControls()), this.changed(), !0)
            // END UNCODE EDIT
        },
        cloneTabAfter: function(t) {
            this.$tabs.find("> .wpb_wrapper > .wpb_tabs_nav > div").remove(), this.buildTabs(t)
        },
        // START UNCODE EDIT
        tabExtraClass: function(model) {
            var model_parent = window.vc.shortcodes.get(model.get("parent_id")),
                tab_typography = model_parent.getParam("typography"),
                tab_extra_class = [];
            if (tab_typography === 'advanced') {
                tab_extra_class.push( model_parent.getParam("titles_font") );
                tab_extra_class.push( model_parent.getParam("titles_size") );
                tab_extra_class.push( model_parent.getParam("titles_weight") !== '' ? 'font-weight-' + model_parent.getParam("titles_weight") : '');
                tab_extra_class.push(model_parent.getParam("titles_transform") !== '' ? 'text-' + model_parent.getParam("titles_transform") : '');
                tab_extra_class.push( model_parent.getParam("titles_height") );
                tab_extra_class.push( model_parent.getParam("titles_space") );
            }
            return tab_extra_class;
        },
        linkExtraClass: function(model) {
            var model_parent = window.vc.shortcodes.get(model.get("parent_id")),
                tab_padding = model_parent.getParam("custom_padding"),
                tab_extra_class = [];
            if (tab_padding === 'yes') {
                var gutter_tab = model_parent.getParam("gutter_tab");
                switch (gutter_tab) {
                    case '1':
                        tab_extra_class.push( 'half-block-padding has-padding' );
                    break;
                    case '2':
                        tab_extra_class.push( 'single-block-padding has-padding' );
                    break;
                    case '3':
                        tab_extra_class.push( 'double-block-padding has-padding' );
                    break;
                }
            }
            return tab_extra_class;
        },
        tabIcon: function(model, $tab, tab_extra_class) {
            var icon_position = model.getParam("icon_position"),
                icon_size = model.getParam("icon_size"),
                icon = model.getParam("icon") !== '' ? '<span class="icon-tab icon-order-' + (icon_position === 'right' ? '1' : '0') + ' ' + tab_extra_class.join(' ') + '"><i class="' + model.getParam("icon") + ' icon-position-' + (icon_position !== '' ? icon_position : 'left') + ' icon-size-' + (icon_size !== '' ? icon_size : 'rg') + '"></i></span>' : '';
            $tab.removeClass('icon-position-left').removeClass('icon-position-right').removeClass('icon-position-above');
            $tab.addClass('icon-position-' + (icon_position !== '' ? icon_position : 'left'));
            $tab.find("> a > span i.fa").remove();
            return icon;
        },
        tabExcerpt: function(model) {
            var tab_excerpt = model.getParam("excerpt"),
                tab_link = model.getParam("link"),
                model_parent = window.vc.shortcodes.get(model.get("parent_id")),
                link_title = '';
            if ( ( tab_excerpt !== '' || tab_link !== '' ) && model_parent.getParam("vertical") === 'yes') {
                if ( tab_link !== '' ) {
                    var tab_link_arr = tab_link.split( '|' );
                    var link_title;
                    if ( tab_link_arr.length ) {
                        for (var i_u = 0; i_u < tab_link_arr.length; i_u++) {
                            var str_split = tab_link_arr[i_u].split( ':' );
                            if ( str_split[0] === 'title' ) {
                                link_title = '<span class="tab-excerpt-link color-accent-color">' + window.decodeURI( str_split[1] )  + '</span>';
                            }
                        }
                    }
                }
                var tab_excerpt_class = ['tab-excerpt'];
                tab_excerpt_class.push(model_parent.getParam("excerpt_text_size") !== '' ? ( model_parent.getParam("excerpt_text_size") === 'yes' ? 'text-lead' : 'text-small' ) : '' );
                tab_excerpt = '<span class="' + tab_excerpt_class.join(' ') + '">' + window.vcEscapeHtml( tab_excerpt ) + link_title + '</span>';
            } else {
                tab_excerpt = '';
            }
            return tab_excerpt;
        },
        // END UNCODE EDIT
        updateIfExistTab: function(t) {
            // START UNCODE EDIT
            // var $tab = this.tabsControls().find("[data-m-id=" + model.get("id") + "]");
            // return !!$tab.length && ($tab.attr("aria-controls", "tab-" + model.getParam("tab_id")).find("a").attr("href", "#tab-" + model.getParam("tab_id")).text(model.getParam("title")), !0)
            var tab_id = t.getParam("tab_id"),
                $tab = this.tabsControls().find("[data-tab-o-id=" + tab_id + "]");
            var tab_extra_class = this.tabExtraClass(t),
                icon = this.tabIcon(t, $tab, tab_extra_class),
                tab_excerpt = this.tabExcerpt(t);
            var data_temp = this.tabsControls().closest('.vc_element-container').attr('data-temp-class'),
                data_temp_arr = typeof data_temp !== 'undefined' ? data_temp.split(' ') : [],
                data_classes = this.tabsControls().closest('.uncode-tabs').attr('data-class');
            this.tabsControls().find("> li").each(function(key, value) {
                for (var i_c = 0; i_c < data_temp_arr.length; i_c++) {
                    i(value).removeClass(data_temp_arr[i_c]);
                }
                i(value).addClass( data_classes )
            });
            if (this.tabsControls().closest('.wootabs').length) {
                var params = t.get("params");
                if (params) {
                    params.product_from_builder = 'yes';
                    t.set("params", params);
                }
            }
            if ( $tab.length ) {
                var tab_slug = t.getParam("slug") !== '' ? t.getParam("slug") : 'tab-' + tab_id;
                $tab.attr( 'aria-controls', 'tab-' + tab_id )
                    .find( 'a' )
                    .attr( 'href', '#' + tab_slug )
                    .find("> span")
                    .text(
                        t.getParam("title"),
                        $tab.data("model", t).attr('data-m-id', t.get("id"))
                    )
                    .wrapInner( '<span class="' + tab_extra_class.join(' ') + '" />' )
                    .wrapInner( '<span />' )
                    .find('> span')
                    .append(tab_excerpt)
                    .closest('a')
                    .find('> span')
                    .prepend(icon);
                return true;
            }
            return false;
            // END UNCODE EDIT
            // var e = this.tabsControls().find("[data-m-id=" + t.get("id") + "]");
            // return !!e.length && (e.attr("aria-controls", "tab-" + t.getParam("tab_id")).find("a").attr("href", "#tab-" + t.getParam("tab_id")).text(t.getParam("title")), !0)
        },
        buildControlHtml: function(t) {
            t.get("params");
            // START UNCODE EDIT
            // var e = i('<li data-m-id="' + t.get("id") + '"><a href="#tab-' + t.getParam("tab_id") + '"></a></li>');
            // return e.data("model", t), e.find("> a").text(t.getParam("title")), e
            var active = '';
            if (!this.$el.find('.vc_tta-tab').length) {
                active = ' active';
            }
            var tab_id = 'tab-' + t.getParam("tab_id");
            if ( t.get("cloned") && typeof t.attributes.params.slug !== 'undefined' && t.attributes.params.slug !== '' ) {
                tab_id = t.attributes.params.slug + "_cloned";
            }
            var $tab = i('<li data-tab-id="' + tab_id + '" data-tab-o-id="' + t.getParam("tab_id") + '" class="vc_tta-tab' + active + '"><a href="#' + tab_id + '" data-toggle="tab" class=""><span></span></a></li>');
            // $tab.find("> a > span i.fa").remove();
            var tab_extra_class = [],
                icon = '',
                tab_excerpt = '';

            if ( t.get("cloned") ) {
                var cloned_from = t.get( 'cloned_from' ).id,
                    $parent = window.vc.shortcodes.get(cloned_from),
                    $panel =  $parent.view.$el,
                    $cloned_from = $panel.find('[data-m-id="' + cloned_from + '"]'),
                    cloned_class = $cloned_from.attr('class');

                $tab.attr('class', cloned_class);
                tab_extra_class = this.tabExtraClass(t);
                icon = this.tabIcon(t, $tab, tab_extra_class);
                tab_excerpt = this.tabExcerpt(t);
            }
            $tab
                .data("model", t)
                .attr('data-m-id', t.get("id"));
            $tab
                .find("> a > span")
                .text(
                    t.getParam("title"),
                    $tab
                        .data("model", t)
                        .attr('data-m-id', t.get("id"))
                )
                .wrapInner( '<span class="' + tab_extra_class.join(' ') + '" />' )
                .wrapInner( '<span />' )
                .find('> span')
                .append(tab_excerpt)
                .closest('a')
                .find('> span')
                .prepend(icon);
            return $tab
            // END UNCODE EDIT
        },
        addElement: function(t) {
            t && t.preventDefault && t.preventDefault(), (new window.vc.ShortcodesBuilder).create({
                shortcode: "vc_tab",
                params: {
                    tab_id: vc_guid() + "-" + this.tabsControls().find("li").length,
                    title: this.getDefaultTabTitle()
                },
                parent_id: this.model.get("id")
            }).render()
        },
        getDefaultTabTitle: function() {
            return window.i18nLocale.tab
        },
        setSorting: function() {
            this.hasUserAccess() && window.vc.frame_window.vc_iframe.setTabsSorting(this)
        },
        stopSorting: function() {
            this.tabsControls().find("> li").each(function(t) {
                i(this).data("model").save({
                    order: t
                }, {
                    silent: !0
                })
            })
        },
        placeElement: function(t) {
            var e = window.vc.shortcodes.get(t.data("modelId"));
            // START UNCODE EDIT
            // e && e.get("place_after_id") ? (t.insertAfter(window.vc.$page.find("[data-model-id=" + e.get("place_after_id") + "]")), e.unset("place_after_id")) : t.insertAfter(this.tabsControls()), this.changed()
            t.attr("id", t.data("id"))
            e && e.get("place_after_id") ? (t.insertAfter(window.vc.$page.find("[data-model-id=" + e.get("place_after_id") + "]")), e.unset("place_after_id")) : t.appendTo(this.content()), this.changed()
            // END UNCODE EDIT
        },
        removeTab: function(t) {
            if (1 === window.vc.shortcodes.where({
                    parent_id: this.model.get("id")
                }).length) return this.model.destroy();
            var t = this.tabsControls().find("[data-m-id=" + t.get("id") + "]"),
                e = t.index();
            this.tabsControls().find("[data-m-id]:eq(" + (e + 1) + ")").length ? window.vc.frame_window.vc_iframe.setActiveTab(this.$tabs, e + 1) : this.tabsControls().find("[data-m-id]:eq(" + (e - 1) + ")").length ? window.vc.frame_window.vc_iframe.setActiveTab(this.$tabs, e - 1) : window.vc.frame_window.vc_iframe.setActiveTab(this.$tabs, 0), t.remove()
        },
        clone: function(t) {
            _.each(window.vc.shortcodes.where({
                parent_id: this.model.get("id")
            }), function(t) {
                t.set("active_before_cloned", this.active_model_id === t.get("id"))
            }, this), window.InlineShortcodeView_vc_tabs.__super__.clone.call(this, t)
        }
    })
})(window.jQuery);
window.InlineShortcodeView_vc_tour = window.InlineShortcodeView_vc_tabs.extend({
    render: function() {
        return _.bindAll(this, "stopSorting"), this.$tabs = this.$el.find("> .wpb_tour"), window.InlineShortcodeView_vc_tabs.__super__.render.call(this), this.buildNav(), this
    },
    beforeUpdate: function() {
        this.$tabs.find(".wpb_tour_heading,.wpb_tour_next_prev_nav").remove(), vc.frame_window.vc_iframe.destroyTabs(this.$tabs)
    },
    updated: function() {
        this.$tabs.find(".wpb_tour_next_prev_nav").appendTo(this.$tabs), window.InlineShortcodeView_vc_tour.__super__.updated.call(this)
    }
});
window.InlineShortcodeView_vc_tab = window.InlineShortcodeViewContainerWithParent.extend({
    controls_selector: "#vc_controls-template-vc_tab",
    render: function() {
        var e, t = this.model.get("params");
        return window.InlineShortcodeView_vc_tab.__super__.render.call(this), this.$tab = this.$el.find("> :first"), _.isEmpty(t.tab_id) ? (t.tab_id = vc_guid() + "-" + Math.floor(11 * Math.random()), this.model.save("params", t), e = "tab-" + t.tab_id, this.$tab.attr("id", e)) : e = this.$tab.attr("id"), this.$el.attr("id", e), this.$tab.attr("id", e + "-real"), this.$tab.find(".vc_element[data-tag]").length || this.$tab.empty(), this.$el.addClass("ui-tabs-panel wpb_ui-tabs-hide"), this.$tab.removeClass("ui-tabs-panel wpb_ui-tabs-hide"), this.parent_view && this.parent_view.addTab && (this.parent_view.addTab(this.model) || this.$el.removeClass("wpb_ui-tabs-hide")), t = this.doSetAsActive(), this.parent_view.buildTabs(t), this
    },
    allowAddControl: function() {
        return vc_user_access().shortcodeAll("vc_tab")
    },
    doSetAsActive: function() {
        var e = this.model.get("active_before_cloned");
        return (!this.model.get("from_content") && !this.model.get("default_content") && _.isUndefined(e) || !_.isUndefined(e) && (this.model.unset("active_before_cloned"), !0 === e)) && this.model
    },
    removeView: function(e) {
        window.InlineShortcodeView_vc_tab.__super__.removeView.call(this, e), this.parent_view && this.parent_view.removeTab && this.parent_view.removeTab(e)
    },
    clone: function(e) {
        e && e.preventDefault && e.preventDefault(), e && e.stopPropagation && e.stopPropagation(), vc.clone_index /= 10, this.model.clone().get("params"), e = new vc.ShortcodesBuilder;
        var t = vc.CloneModel(e, this.model, this.model.get("parent_id")),
            i = (this.parent_view.active_model_id, this);
        e.render(function() {
            i.parent_view.cloneTabAfter && i.parent_view.cloneTabAfter(t)
        })
    },
    rowsColumnsConverted: function() {
        _.each(vc.shortcodes.where({
            parent_id: this.model.get("id")
        }), function(e) {
            e.view.rowsColumnsConverted && e.view.rowsColumnsConverted()
        })
    }
});
(e => {
    window.InlineShortcodeView_vc_accordion = window.InlineShortcodeView_vc_row.extend({
        events: {
            "click > .wpb_accordion > .vc_empty-element": "addElement"
        },
        render: function() {
            return _.bindAll(this, "stopSorting"), this.$accordion = this.$el.find("> .wpb_accordion"), window.InlineShortcodeView_vc_accordion.__super__.render.call(this), this
        },
        changed: function() {
            this.allowAddControlOnEmpty() && 0 === this.$el.find(".vc_element[data-tag]").length ? this.$el.addClass("vc_empty").find("> :first").addClass("vc_empty-element") : (this.allowAddControlOnEmpty() && this.$el.removeClass("vc_empty").find("> .vc_empty-element").removeClass("vc_empty-element"), this.setSorting())
        },
        buildAccordion: function(e) {
            var n = !1;
            e && (n = this.$accordion.find("[data-model-id=" + e.get("id") + "]").index()), vc.frame_window.vc_iframe.buildAccordion(this.$accordion, n)
        },
        setSorting: function() {
            vc.frame_window.vc_iframe.setAccordionSorting(this)
        },
        beforeUpdate: function() {
            this.$el.find(".wpb_accordion_heading").remove(), window.InlineShortcodeView_vc_accordion.__super__.beforeUpdate.call(this)
        },
        stopSorting: function() {
            this.$accordion.find("> .wpb_accordion_wrapper > .vc_element[data-tag]").each(function() {
                vc.shortcodes.get(e(this).data("modelId")).save({
                    order: e(this).index()
                }, {
                    silent: !0
                })
            })
        },
        addElement: function(e) {
            e && e.preventDefault && e.preventDefault(), (new vc.ShortcodesBuilder).create({
                shortcode: "vc_accordion_tab",
                params: {
                    title: window.i18nLocale.section
                },
                parent_id: this.model.get("id")
            }).render()
        },
        rowsColumnsConverted: function() {
            _.each(vc.shortcodes.where({
                parent_id: this.model.get("id")
            }), function(e) {
                e.view.rowsColumnsConverted && e.view.rowsColumnsConverted()
            })
        }
    })
})(window.jQuery);
window.InlineShortcodeView_vc_accordion_tab = window.InlineShortcodeView_vc_tab.extend({
    events: {
        "click > .vc_controls .vc_element .vc_control-btn-delete": "destroy",
        "touchstart > .vc_controls .vc_element .vc_control-btn-delete": "destroy",
        "click > .vc_controls .vc_element .vc_control-btn-edit": "edit",
        "touchstart > .vc_controls .vc_element .vc_control-btn-edit": "edit",
        "click > .vc_controls .vc_element .vc_control-btn-clone": "clone",
        "touchstart > .vc_controls .vc_element .vc_control-btn-clone": "clone",
        "click > .vc_controls .vc_element .vc_control-btn-prepend": "prependElement",
        "touchstart > .vc_controls .vc_element .vc_control-btn-prepend": "prependElement",
        "click > .vc_controls .vc_control-btn-append": "appendElement",
        "touchstart > .vc_controls .vc_control-btn-append": "appendElement",
        "click > .vc_controls .vc_parent .vc_control-btn-delete": "destroyParent",
        "touchstart > .vc_controls .vc_parent .vc_control-btn-delete": "destroyParent",
        "click > .vc_controls .vc_parent .vc_control-btn-edit": "editParent",
        "touchstart > .vc_controls .vc_parent .vc_control-btn-edit": "editParent",
        "click > .vc_controls .vc_parent .vc_control-btn-clone": "cloneParent",
        "touchstart > .vc_controls .vc_parent .vc_control-btn-clone": "cloneParent",
        "click > .vc_controls .vc_parent .vc_control-btn-prepend": "addSibling",
        // START UNCODE EDIT
        // "click > .wpb_accordion_section > .vc_empty-element": "appendElement",
        "click > .panel-collapse > .vc_empty-element": "appendElement",
        // END UNCODE EDIT
        "touchstart > .vc_controls .vc_parent .vc_control-btn-prepend": "addSibling",
        "click > .wpb_accordion_section > .vc_empty-element": "appendElement",
        "touchstart > .wpb_accordion_section > .vc_empty-element": "appendElement",
        "click > .vc_controls .vc_control-btn-switcher": "switchControls",
        "touchstart > .vc_controls .vc_control-btn-switcher": "switchControls",
        mouseenter: "resetActive",
        mouseleave: "holdActive"
    },
    changed: function() {
        this.allowAddControlOnEmpty() && 0 === this.$el.find(".vc_element[data-tag]").length ? (this.$el.addClass("vc_empty"), this.content().addClass("vc_empty-element")) : (this.$el.removeClass("vc_empty"), this.content().removeClass("vc_empty-element"))
    },
    render: function() {
        // START UNCODE EDIT
        var is_changed = false;
        if ( this.model.get("cloned") ) {
            var random_id = VCS4() + "-" + VCS4(),
                $parent = window.vc.shortcodes.get(this.model.get( 'cloned_from' ).id),
                $panel =  $parent.view.$el,
                href = $panel.find('.panel-title > a').attr('href');
            $panel.find('.panel-title > a').attr('href', '#' + random_id);
            $panel.find(href).attr('id', random_id)
            this.model.attributes.params.tab_id = random_id;
        } else {
            var $accordion = this.parent_view.$content,
                $panel =  $accordion.find('.panel').first();
        }
        if( this.model._previousAttributes.params.icon_position && typeof this.model.changed.params !== 'undefined' ) { // `icon_position` is missing on first render
            is_changed = true;
        }
        var $el = this.$el,
            panel_class = $panel.attr('class'),
            $heading = $panel.find('.panel-title'),
            heading_class = $heading.attr('class');
        $el.attr('class', panel_class).find('.panel-title').attr('class', heading_class);
        var active_tab = parseInt(this.parent_view.model.attributes.params.active_tab) - 1,
            tab_ind = $el.index();
        if ( active_tab !== tab_ind && !is_changed ) {
            $el.removeClass('active-group');
            $el.find('.active').removeClass('active');
        }
        // END UNCODE EDIT
        return window.InlineShortcodeView_vc_tab.__super__.render.call(this), this.content().find(".vc_element[data-tag]").length || this.content().empty(), this.parent_view.buildAccordion(!this.model.get("from_content") && !this.model.get("default_content") && this.model), this
    },
    rowsColumnsConverted: function() {
        _.each(vc.shortcodes.where({
            parent_id: this.model.get("id")
        }), function(t) {
            t.view.rowsColumnsConverted && t.view.rowsColumnsConverted()
        })
    },
    destroy: function(t) {
        var e = this.model.get("parent_id");
        window.InlineShortcodeView_vc_accordion_tab.__super__.destroy.call(this, t), vc.shortcodes.where({
            parent_id: e
        }).length || vc.shortcodes.get(e).destroy()
    },
    allowAddControl: function() {
        return vc_user_access().shortcodeAll("vc_accordion_tab")
    }
});
_.isUndefined(vc) && (window.vc = {}), (n => {
    vc.createPreLoader = function() {
        vc.$preloader = n("#vc_preloader").show()
            // START UNCODE EDIT
            n('body').addClass('vc_frontend_builder_loading');
            // END UNCODE EDIT
    }, vc.removePreLoader = function() {
        vc.$preloader && vc.$preloader.hide()
    }, vc.createOverlaySpinner = function() {
        vc.$overlaySpinner = n("#vc_overlay_spinner").show()
    }, vc.removeOverlaySpinner = function() {
        vc.$overlaySpinner && vc.$overlaySpinner.hide()
            // START UNCODE EDIT
            setTimeout(function() {
                n('body').removeClass('vc_frontend_builder_loading');
            }, 100);
        // }, vc.createPreLoader(), vc.$frame_wrapper = n("#vc_inline-frame-wrapper"), vc.$frame = n('<iframe src="' + window.vc_iframe_src + '" scrolling="auto" style="width: 100%;" id="vc_inline-frame"></iframe>'), vc.$frame.appendTo(vc.$frame_wrapper), vc.build = function() {
        }, vc.createPreLoader(), vc.createOverlaySpinner(), vc.$frame_wrapper = n("#vc_inline-frame-wrapper"), vc.$frame = n('<iframe src="' + window.vc_iframe_src + '" scrolling="auto" style="width: 100%;" id="vc_inline-frame"></iframe>'), vc.$frame.appendTo(vc.$frame_wrapper), vc.build = function() {
            // END UNCODE EDIT
        var e;
        vc.loaded || (vc.loaded = !0, vc.map = window.vc_mapper, n("#wpadminbar").remove(), n("#screen-meta-links, #screen-meta").hide(), (e = n("body")).attr("data-vc", !0), vc.is_mobile = 0 < n("body.mobile").length, vc.title = n("#vc_title-saved").val(), vc.add_element_block_view = new vc.AddElementUIPanelFrontendEditor({
            el: "#vc_ui-panel-add-element"
        }), vc.edit_element_block_view = new vc.EditElementUIPanel({
            el: "#vc_ui-panel-edit-element"
        }), vc.post_settings_view = new vc.PostSettingsUIPanelFrontendEditor({
            el: "#vc_ui-panel-post-settings"
        }), vc.post_seo_view = vc.PostSettingsSeoUIPanel && new vc.PostSettingsSeoUIPanel({
            el: "#vc_ui-panel-post-seo"
        }), vc.templates_editor_view = new vc.TemplatesEditorPanelView({
            el: "#vc_templates-editor"
        }), vc.templates_panel_view = new vc.TemplateWindowUIPanelFrontendEditor({
            el: "#vc_ui-panel-templates"
        }), vc.preset_panel_view = new vc.PresetSettingsUIPanelFrontendEditor({
            el: "#vc_ui-panel-preset",
            frontEnd: !0
        }), vc.app = new vc.View, vc.buildRelevance(), e.hasClass("vc_responsive_disabled") && (vc.responsive_disabled = !0), vc.setFrameSize("100%"), vc.frame = new vc.FrameView({
            el: n(vc.$frame.get(0).contentWindow.document).find("body").get(0)
        }), vc.app.render(), vc.post_shortcodes = vc.frame_window.vc_post_shortcodes, vc.builder.buildFromContent(), void 0 !== window.vc.undoRedoApi && _.defer(function() {
            vc.undoRedoApi.setZeroState(vc.builder.getContent())
        }), vc.removePreLoader(), vc.$frame.get(0).contentWindow.vc_js && vc.$frame.get(0).contentWindow.vc_js(), n(window).trigger("vc_build"))
    }, vc.$frame.on("load", function() {
        ! function e() {
            vc.$frame.get(0).contentWindow.vc_iframe ? vc.loaded || window.setTimeout(function() {
                vc.build()
            }, 50) : window.setTimeout(e, 100)
        }()
    })
})(window.jQuery);
(o => {
    var t = function(t, n, i) {
        this.target = t, this.$pointer = null, this.texts = i, this.pointerOptions = n, this.init()
    };
    t.prototype = {
        init: function() {
            _.bindAll(this, "openedEvent", "reposition")
        },
        show: function() {
            this.$pointer = o(this.target), this.$pointer.data("vcPointerMessage", this), this.pointerOptions.opened = this.openedEvent, this.$pointer.addClass("vc-with-vc-pointer").pointer(this.pointerOptions).pointer("open"), o(window).on("resize.vcPointer", this.reposition)
        },
        domButtonsWrapper: function() {
            return o('<div class="vc_wp-pointer-controls" />')
        },
        domCloseBtn: function() {
            return o('<a class="vc_pointer-close close">' + this.texts.finish + "</a>")
        },
        domNextBtn: function() {
            return o('<button class="button button-primary button-large vc_wp-pointers-next">' + this.texts.next + '<i class="vc_pointer-icon"></i></button>')
        },
        domPrevBtn: function() {
            return o('<button class="button button-primary button-large vc_wp-pointers-prev"><i class="vc_pointer-icon"></i>' + this.texts.prev + "</button> ")
        },
        openedEvent: function(t, n) {
            var i = n.pointer.offset();
            n.pointer.css("z-index", 1e5), i && i.top && o("body").scrollTop(80 < i.top ? i.top - 80 : 0)
        },
        reposition: function() {
            this.$pointer.pointer("reposition")
        },
        close: function() {
            this.$pointer && this.$pointer.removeClass("vc-with-vc-pointer").pointer("close"), o(window).off("resize.vcPointer")
        }
    }, window.vcPointerMessage = t
})(window.jQuery);
(i => {
    var t = function(t, i) {
        this.pointers = t && t.messages || [], this._texts = i, this.pointerId = t && t.pointer_id ? t.pointer_id : "", this.pointerData = {}, this._index = 0, this.messagesDismissed = !1, this.init()
    };
    t.prototype = {
        init: function() {
            _.bindAll(this, "show", "clickEventClose", "clickEventNext", "clickEventPrev", "buttonsEvent"), this.build()
        },
        getPointer: function(t) {
            return this.pointerData = this.pointers[t] && this.pointers[t].target ? this.pointers[t] : null, i("body").hasClass("vc_editor") && "#vc_ui-panel-post-custom-layout" === this.pointerData.target && "none" === i(this.pointerData.target).css("display") && this.next(), this.pointerData && this.pointerData.options ? new vcPointerMessage(this.pointerData.target, this.buildOptions(this.pointerData.options), this._texts) : null
        },
        buildOptions: function(t) {
            return t.buttonsEvent && _.isFunction(window[t.buttonsEvent]) ? t.buttons = _.bind(window[t.buttonsEvent], this) : t.buttons = this.buttonsEvent, t.vcPointerController = this, t
        },
        build: function() {
            if (this.pointer = this.getPointer(this._index), vc.events.once("backendEditor.close", this.close, this), !this.pointer) return !1;
            this.setShowEventHandler()
        },
        show: function() {
            this.pointer.show(), this.setCloseEventHandler(), vc.events.trigger("vcPointer:show")
        },
        setShowEventHandler: function() {
            var t;
            this.pointerData.showCallback && window[this.pointerData.showCallback] ? window[this.pointerData.showCallback].call(this) : this.pointerData.showEvent ? this.pointerData.showEvent.match(/\s/) ? 1 < (t = this.pointerData.closeEvent.split(/\s+(.+)?/)).length && i(t[1]).one(t[0], this.show) : vc.events.once(this.pointerData.showEvent, this.show) : this.show()
        },
        setCloseEventHandler: function() {
            var t;
            this.pointerData.closeCallback && window[this.pointerData.closeCallback] ? window[this.pointerData.closeCallback].call(this) : this.pointerData.closeEvent ? this.pointerData.closeEvent.match(/\s/) ? (t = this.pointerData.closeEvent.split(/\s+(.+)?/), i(t[1] || this.$pointer).one(t[1] && t[0] ? t[0] : "click", this.clickEventNext)) : vc.events.once(this.pointerData.closeEvent, this.nextOnEvent, this) : this.pointer.$pointer && 0 < this.pointer.$pointer.length && i(this.pointer.$pointer).one("click", this.clickEventNext)
        },
        nextOnEvent: function() {
            this.close(), this.next()
        },
        next: function() {
            this._index++, this.build()
        },
        prev: function() {
            this._index--, this.build()
        },
        close: function() {
            this.pointer && (this.pointer.close(), this.pointerData = null, this.pointer = null, vc.events.trigger("vcPointer:close", this))
        },
        buttonsEvent: function() {
            var t = this.pointer.domCloseBtn(),
                i = this.pointer.domNextBtn(),
                n = this.pointer.domPrevBtn();
            return t.bind("click.vcPointer", this.clickEventClose), t = this.pointer.domButtonsWrapper().append(t), 0 < this._index && (n.bind("click.vcPointer", this.clickEventPrev), t.addClass("vc_wp-pointer-controls-prev").append(n)), this._index + 1 < this.pointers.length && (i.bind("click.vcPointer", this.clickEventNext), t.addClass("vc_wp-pointer-controls-next").append(i)), t
        },
        clickEventClose: function() {
            this.close(), this.dismissMessages()
        },
        clickEventNext: function() {
            this.close(), this.next()
        },
        clickEventPrev: function() {
            this.close(), this.prev()
        },
        dismissMessages: function() {
            if (this.messagesDismissed) return !1;
            i.post(window.ajaxurl, {
                pointer: this.pointerId,
                action: "dismiss-wp-pointer"
            }), this.messagesDismissed = !0
        }
    }, window.vcPointersController = t
})(window.jQuery);
(t => {
    vc.events.on("app.render", function() {
        window.vcPointer && window.vcPointer.pointers && window.vcPointer.pointers.length && _.each(vcPointer.pointers, function(t) {
            new vcPointersController(t, vcPointer.texts)
        }, this)
    }), vc.events.on("vcPointer:show", function() {
        vc.app.disableFixedNav = !0
    }), vc.events.on("vcPointer:close", function() {
        vc.app.disableFixedNav = !1
    }), window.vcPointersEditorsTourEvents = function() {
        var t = this.pointer.domCloseBtn();
        return t.bind("click.vcPointer", this.clickEventClose), t
    }, window.vcPointersShowOnContentElementControls = function() {
        this.pointer && t(this.pointer.target).length ? (t(this.pointer.target).parent().addClass("vc-with-vc-pointer-controls"), this.show(), t("#wpb_wpbakery").one("click", function() {
            t(".vc-with-vc-pointer-controls").removeClass("vc-with-vc-pointer-controls")
        })) : vc.events.once("shortcodes:add", vcPointersShowOnContentElementControls, this)
    }, window.vcPointersSetInIFrame = function() {
        this.pointerData && vc.frame_window.jQuery(this.pointerData.target).length ? (this.pointer = new vc.frame_window.vcPointerMessage(this.pointerData.target, this.buildOptions(this.pointerData.options), this._texts), this.show(), this.pointer.$pointer.closest(".vc_controls").addClass("vc-with-vc-pointer-controls")) : vc.events.once("shortcodeView:ready", vcPointersSetInIFrame, this)
    }, window.vcPointersCloseInIFrame = function() {
        var t = this,
            n = vc.frame_window.jQuery;
        n("body").one("click", function() {
            n(".vc-with-vc-pointer-controls").removeClass("vc-with-vc-pointer-controls"), t.nextOnEvent()
        })
    }
})(window.jQuery);
(() => {
    var i = {
            stack: [],
            stackPosition: 0,
            stackHash: JSON.stringify(""),
            zeroState: null,
            locked: !1,
            add: function(t) {
                null === this.zeroState && this.setZeroState(t), this.stackHash !== JSON.stringify(t) && (this.can("redo") && (this.stack = this.stack.slice(0, this.stackPosition)), this.stack.push(t), this.stackPosition = this.stack.length, this.stackHash = JSON.stringify(this.get()))
            },
            can: function(t) {
                var i = !1;
                return "undo" === t ? i = 0 < this.stack.length && 0 < this.stackPosition : "redo" === t && (i = 0 < this.stack.length && this.stackPosition < this.stack.length), i
            },
            undo: function() {
                this.can("undo") && (--this.stackPosition, this.stackHash = JSON.stringify(this.get()))
            },
            redo: function() {
                this.can("redo") && (this.stackPosition += 1, this.stackHash = JSON.stringify(this.get()))
            },
            set: function(t) {
                return this.stackPosition < t && (this.stack = this.stack.slice(t - this.stackPosition), this.stackHash = JSON.stringify(this.get()), !0)
            },
            get: function() {
                return this.stackPosition < 1 ? this.zeroState : this.stack[this.stackPosition - 1]
            },
            setZeroState: function(t) {
                this.zeroState = t, this.stackHash = JSON.stringify(this.get())
            }
        },
        t = {
            add: function(t) {
                !0 !== i.locked && (i.add(t), window.vc.events.trigger("undoredo:add", t))
            },
            getCurrentPosition: function() {
                return i.stackPosition
            },
            undo: function() {
                return i.undo(), window.vc.events.trigger("undoredo:undo"), t.get()
            },
            redo: function() {
                return i.redo(), window.vc.events.trigger("undoredo:redo"), t.get()
            },
            get: function() {
                return i.get()
            },
            canUndo: function() {
                return !this.isLocked() && i.can("undo")
            },
            canRedo: function() {
                return !this.isLocked() && i.can("redo")
            },
            setZeroState: function(t) {
                null === i.zeroState ? this.add(t) : i.setZeroState(t)
            },
            lock: function() {
                i.locked = !0, window.vc.events.trigger("undoredo:lock")
            },
            unlock: function() {
                i.locked = !1, window.vc.events.trigger("undoredo:unlock")
            },
            isLocked: function() {
                return !0 === i.locked
            }
        };
    void 0 === window.vc && (window.vc = {}), window.vc.undoRedoApi = t
})();
(e => {
    e(function() {
        var o, d, n;
        window.vc && window.vc.events && (o = e(".vc_undo-button"), d = e(".vc_redo-button"), n = function(d) {
            for (vc.createOverlaySpinner(); vc.shortcodes.models.length;) vc.shortcodes.models[0].destroy();
            vc.shortcodes.reset([], {
                silent: !0
            }), _.delay(function() {
                var o = d.length ? vc.builder.parse([], d) : [];
                o.length && _.each(o, function(o) {
                    vc.builder.create(o)
                }), vc.builder.render(function() {
                    _.delay(function() {
                        window.vc.undoRedoApi.unlock(), vc.removeOverlaySpinner()
                    }, 100)
                })
            }, 50)
        }, window.vc.events.on("undoredo:add undoredo:undo undoredo:redo undoredo:lock undoredo:unlock", function() {
            o.attr("disabled", !window.vc.undoRedoApi.canUndo()), d.attr("disabled", !window.vc.undoRedoApi.canRedo())
        }), o.on("click.vc-undo", function(o) {
            e(this).is("[disabled]") || window.vc.undoRedoApi.isLocked() ? o && o.preventDefault && o.preventDefault() : (window.vc.undoRedoApi.lock(), o = window.vc.undoRedoApi.undo(), n(o))
        }), d.on("click.vc-redo", function(o) {
            e(this).is("[disabled]") || window.vc.undoRedoApi.isLocked() ? o && o.preventDefault && o.preventDefault() : (window.vc.undoRedoApi.lock(), o = window.vc.undoRedoApi.redo(), n(o))
        }))
        // START UNCODE EDIT
        window.listenKeyboardEvents = function(e, w, is_tinymce) {
            if (uncodeFrontEditorShortkeysConf.enable_front_editor_shortkeys !== '1') {
                return;
            }
            if (is_tinymce && uncodeFrontEditorShortkeysConf.enable_front_editor_shortkeys_in_tinymce !== '1') {
                return;
            }
            if (e[w.uncodeFrontEditorShortkeysConf.keys.modifier] && e.which === parseInt(w.uncodeFrontEditorShortkeysConf.keys.save, 10)) {
                // Save
                e.preventDefault();
                if (w.jQuery('#vc_ui-panel-edit-element.vc_active [data-vc-ui-element="button-save"]').length) {
                    // Save module
                    w.jQuery('#vc_ui-panel-edit-element.vc_active [data-vc-ui-element="button-save"]').click();
                } else if (w.jQuery('#vc_ui-panel-post-settings.vc_active [data-vc-ui-element="button-save"]').length) {
                    // Save post settings (custom CSS)
                    w.jQuery('#vc_ui-panel-post-settings.vc_active [data-vc-ui-element="button-save"]').click();
                } else {
                    // Save page
                    w.vc.builder.save();
                }
            } else if (e[w.uncodeFrontEditorShortkeysConf.keys.modifier] && e.which === parseInt(w.uncodeFrontEditorShortkeysConf.keys.close, 10)) {
                // Close
                e.preventDefault();
                if (window.vc.active_panel) {
                    jQuery('[data-vc-ui-element="button-close"]', window.vc.active_panel.$el).click();
                    if (jQuery('body').hasClass('vc-sidebar-switch')) {
                        window.vc.add_element_block_view.render(!1);
                    }
                } else if (w.jQuery('#vc_ui-panel-edit-element.vc_active [data-vc-ui-element="button-close"]').length) {
                    w.jQuery('#vc_ui-panel-edit-element.vc_active [data-vc-ui-element="button-close"]').click();
                }
            } else if (e[w.uncodeFrontEditorShortkeysConf.keys.modifier] && (e.which === parseInt(w.uncodeFrontEditorShortkeysConf.keys.left, 10) || e.which === parseInt(w.uncodeFrontEditorShortkeysConf.keys.right, 10))) {
                // Right/left
                e.preventDefault();
                if (w.jQuery('#vc_ui-panel-edit-element.vc_active .vc_ui-tabs-line').length) {
                    var tabs = window.jQuery('#vc_ui-panel-edit-element.vc_active .vc_ui-tabs-line');
                    var current_tab = w.jQuery('#vc_ui-panel-edit-element.vc_active .vc_ui-tabs-line').find('li.vc_active');
                    var current_tab_index = parseInt(current_tab.attr('data-tab-index'), 10);
                    var available_tabs = tabs.find('li[data-tab-index]').length;
                    if (current_tab.hasClass('vc_ui-tabs-line-dropdown-toggle')) {
                        current_tab = current_tab.find('li.vc_active');
                        current_tab_index = parseInt(current_tab.attr('data-tab-index'), 10);
                    }
                    for (var i = available_tabs - 1; i >= 0; i--) {
                        var target_tab_index = moveToNextTab(w, e, current_tab_index, available_tabs);
                        var target_tab = w.jQuery('#vc_ui-panel-edit-element.vc_active .vc_ui-tabs-line').find('li[data-tab-index="' + (target_tab_index) + '"]');
                        if (!target_tab.hasClass('vc_dependent-hidden')) {
                            break;
                        }
                        current_tab_index = parseInt(target_tab.attr('data-tab-index'), 10);
                    }
                    target_tab.find('button').click();
                    jQuery(document.activeElement).blur();
                    target_tab.blur();
                }
            }
        }
        function moveToNextTab(w, e, current_tab_index, available_tabs) {
            var target_tab_index = 0;
            if (e.which === parseInt(w.uncodeFrontEditorShortkeysConf.keys.left, 10)) {
                target_tab_index = current_tab_index === 0 ? available_tabs - 1 : current_tab_index - 1;
            } else {
                target_tab_index = current_tab_index === (available_tabs - 1) ? 0 : current_tab_index + 1;
            }
            return target_tab_index;
        }
        window.vc.events.on("app.render", function() {
            document.addEventListener('keydown', function(e) {
                window.listenKeyboardEvents(e, window, false);
            });
        });
    })
    var _triggerFrontSidebar = function(sidebar) {
        if (e('#vc_ui-panel-edit-element').hasClass('ui-resizable') && e('#vc_ui-panel-edit-element').hasClass('ui-draggable')) {
            if (sidebar === true) {
                e('#vc_ui-panel-edit-element').trigger('resize').resizable("disable").draggable("disable");
            } else {
                e('#vc_ui-panel-edit-element').resizable("enable").draggable("enable").trigger('resize');
            }
        }
        if (e('#vc_ui-panel-post-settings').hasClass('ui-resizable') && e('#vc_ui-panel-post-settings').hasClass('ui-draggable')) {
            if (sidebar === true) {
                e('#vc_ui-panel-post-settings').trigger('resize').resizable("disable").draggable("disable");
            } else {
                e('#vc_ui-panel-post-settings').resizable("enable").draggable("enable").trigger('resize');
            }
        }
    }
    e(window).on('vc_frontend-sidebar-switch', function(e, sidebar) {
        _triggerFrontSidebar(sidebar);
        setTimeout(function() {
            _triggerFrontSidebar(sidebar)
        }, 500);
    });
    // END UNCODE EDIT
})(window.jQuery);
window.vc || (window.vc = {}), (() => {
    function r(o, e, t) {
        "fromLocalStorage" === t && (t = JSON.parse(localStorage.getItem("copiedShortcode")));
        for (var r = !1, c = (o && (r = o.get("id")), Object.values(e ? vc.ShortcodesBuilder.prototype.parse({}, t, r) : vc.storage.parseContent({}, t, r))), n = 0; n < c.length; n++) {
            var i = c[n];
            if (a(o, i, c)) break;
            s(0 === n && o, i, c, e)
        }
        e && e.render()
    }
    vc.pasteShortcode = function(e, t, o) {
        o ? r(e, t, o) : navigator.clipboard ? navigator.permissions.query({
            name: "clipboard-read"
        }).then(function(o) {
            "granted" === o.state ? navigator.clipboard.readText().then(function(o) {
                r(e, t, o)
            }) : r(e, t, "fromLocalStorage")
        }).catch(function() {
            r(e, t, "fromLocalStorage")
        }) : r(e, t, "fromLocalStorage")
    }, vc.copyShortcode = function(o) {
        o = vc.shortcodes.createShortcodeString(o);
        localStorage.setItem("copiedShortcode", JSON.stringify(o)), vc.utils.copyTextToClipboard(o)
    };
    var a = function(o, e, t) {
            var r, c, n, i, a, s, d, l = !0;
            return o ? (e = (o = p(o, e, t)).isModelRow, r = o.isModelRowInner, c = o.isModelTtaSection, n = o.isTopShortcodeRow, i = o.isTopShortcodeRowInner, a = o.isTopShortcodeSection, s = o.containerPreventsShortcode, l = (d = o.isShortcodeContainer) && (s && !(c && i) || !s && c && n || e && !(n || a) || r && !i || o.isModelColumn && n || o.isModelColumnInner && (i || n)) || !d && (e || r) || (o.shortcodeRejectsAsChild || o.containerRejectsAsParent) && !(a && (o.isModelSection || e))) : "vc_row" === t[0].shortcode && (l = !1), l
        },
        s = function(o, e, t, r) {
            var c, n, i, a, s, d = Object.assign({}, e);
            return o && (t = (e = p(o, e, t)).isModelRow, c = e.isModelRowInner, n = e.isModelSection, i = e.isTopShortcodeRow, a = e.isTopShortcodeRowInner, s = e.isTopShortcodeSection, e = e.isModelContainer, d.params.tab_id && (d.params.tab_id = Date.now() + "-" + vc_guid()), c && a || t && i || !o.get("parent_id") && (!n || !i) ? (r && (d.place_after_id = o.get("id")), d.parent_id = o.get("parent_id")) : e && !t && (d.parent_id = o.get("id")), (t || c) && (i || a) || (t || n) && s) && (d.order = parseFloat(o.get("order")) + vc.clone_index), r ? (r.create(d), r.last()) : vc.shortcodes.create(d)
        },
        p = function(o, e, t) {
            var o = o.get("shortcode"),
                r = vc.map[o].allowed_container_element,
                c = vc.map[o].as_parent && vc.map[o].as_parent.only,
                n = vc.map[t[0].shortcode].as_child && vc.map[t[0].shortcode].as_child.only;
            return {
                isModelRow: "vc_row" === o,
                isModelSection: "vc_section" === o,
                isModelColumn: "vc_column" === o,
                isModelColumnInner: "vc_column_inner" === o,
                isModelRowInner: "vc_row_inner" === o,
                isModelTtaSection: "vc_tta_section" === o,
                isModelContainer: vc.map[o].is_container,
                isTopShortcodeRow: "vc_row" === t[0].shortcode,
                isTopShortcodeRowInner: "vc_row_inner" === t[0].shortcode,
                isTopShortcodeSection: "vc_section" === t[0].shortcode,
                containerPreventsShortcode: "string" == typeof r && !r.includes(t[0].shortcode) || !1 === r,
                isShortcodeContainer: vc.map[t[0].shortcode].is_container,
                shortcodeRejectsAsChild: "string" == typeof n && !n.includes(o),
                containerRejectsAsParent: "string" == typeof c && !c.includes(t[0].shortcode)
            }
        }
})();
(o => {
    var t = o("#vc_ui-helper-promo-popup");
    t.on("click", function(e) {
        o(e.target).closest('[data-vc-ui-element="button-close"]').length && t.removeClass("vc_active")
    })
})(window.jQuery);
(s => {
    s.fn.initializeTooltips = function(a) {
        return this.each(function() {
            var t, e = this,
                o = s(this).next(".tooltip-content")[0];

            function n() {
                clearTimeout(t), e.setAttribute("data-show", ""), r.update()
            }

            function i() {
                t = setTimeout(function() {
                    e.removeAttribute("data-show")
                }, 500)
            } ["mouseenter", "focus"].forEach(function(t) {
                e.addEventListener(t, n), o.addEventListener(t, n)
            }), ["mouseleave", "blur"].forEach(function(t) {
                e.addEventListener(t, i), o.addEventListener(t, i)
            }), a = a || ".vc_shortcode-param";
            var r = Popper.createPopper(e, o, {
                placement: "bottom-start",
                modifiers: [{
                    name: "offset",
                    options: {
                        offset: [10, 5]
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        boundary: e.closest(a),
                        altAxis: !0,
                        tether: !1,
                        rootBoundary: "document"
                    }
                }]
            })
        }), this
    }
})(jQuery);
window.vc || (window.vc = {}), (() => {
    function a(e, o, c, n) {
        var a = e ? e.querySelector(".wpb-color-picker") : null,
            l = e ? e.querySelector(".vc_color-control") : null,
            r = l && l.getAttribute("data-default-colorpicker-color"),
            t = e ? l.value || r || "" : null,
            a = {
                el: a,
                container: e,
                default: t,
                theme: "classic",
                appClass: "wpb-pickr",
                autoReposition: !1,
                swatches: (() => {
                    var e = ["#000000", "#FFFFFF", "#DD3333", "#DD9933", "#EEEE22", "#81D742", "#1E73BE", "#8224E3"];
                    return e = wpbData && wpbData.pickrColors && wpbData.pickrColors.length ? wpbData.pickrColors : e
                })(),
                position: "bottom-middle",
                components: {
                    preview: !0,
                    opacity: !0,
                    hue: !0,
                    interaction: {
                        hex: !0,
                        rgba: !0,
                        hsla: !0,
                        hsva: !1,
                        cmyk: !1,
                        input: !0,
                        cancel: !0,
                        clear: !0,
                        save: !1
                    }
                },
                i18n: {
                    "btn:cancel": "Cancel",
                    "btn:clear": "Default"
                }
            },
            i = (o && (a = Object.assign({}, a, o)), new Pickr(a));
        i.on("change", _.debounce(function(e) {
            l.value = e.toHEXA().toString(), i.applyColor(), c && c.change && c.change(l)
        }, 200)).on("cancel", _.debounce(function() {
            var e = l.dataset.prevColor || t;
            l.value = e, i.setColor(e), c && c.cancel && c.cancel(l)
        }, 200)).on("hide", function() {
            l.dataset.prevColor = l.value, i.hide()
        }).on("clear", _.debounce(function() {
            l.value = r, c && c.change && c.change(l), l.dataset.prevColor = r, i.setColor(r)
        }, 200)), n.push(i)
    }
    vc.initColorPicker = function(e, o, c, n) {
        o = o || {}, c = c || {}, n = n || [];
        e = (e || document).querySelectorAll(".color-group");
        try {
            o && o.single ? a(null, o, c, n) : e.length && e.forEach(function(e) {
                a(e, o, c, n)
            })
        } catch (e) {
            console.error("Error initializing color picker", e)
        }
    }
})();
(n => {
    n(document).ready(function() {
        n(".vc_dropdown-toggle").on("click", function(o) {
            o.stopPropagation(), n(this).closest(".vc_dropdown").toggleClass("open")
        }), n(document).on("click", function() {
            n(".vc_dropdown").removeClass("open")
        })
    }), n("iframe").on("load", function() {
        (this.contentWindow || this.contentDocument.defaultView).document.addEventListener("click", function() {
            n(".vc_dropdown").removeClass("open")
        })
    })
})(window.jQuery);
window.vc || (window.vc = {}), (t => {
    window.vc.InitGalleries = function() {
        t(".gallery_widget_attached_images_list", this.$view).off("click.removeImage").on("click.removeImage", "a.vc_icon-remove", function(e) {
            e.preventDefault();
            var e = t(this).closest(".edit_form_line"),
                i = (t(this).parent().remove(), []),
                a = (e.find(".added img").each(function() {
                    i.push(t(this).attr("rel"))
                }), e.find(".gallery_widget_attached_images_ids").val(i.join(",")).trigger("change"), e.attr("data-social-net-preview-slug"));
            a && ((a = t("#" + a)).find(".wpb-social-placeholder-image").show(), a.find("img").attr("src", ""), e.find(".gallery_widget_attached_images_ids").val(""))
        }), t(".gallery_widget_attached_images_list").each(function() {
            var i = t(this);
            i.sortable({
                forcePlaceholderSize: !0,
                placeholder: "widgets-placeholder-gallery",
                cursor: "move",
                items: "li",
                update: function() {
                    var e = [];
                    t(this).find(".added img").each(function() {
                        e.push(t(this).attr("rel"))
                    }), i.closest(".edit_form_line").find(".gallery_widget_attached_images_ids").val(e.join(",")).trigger("change")
                }
            })
        })
    }, new window.vc.InitGalleries
})(window.jQuery);
