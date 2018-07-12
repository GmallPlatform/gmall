/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=fc87356b5c1507d4543f1b8c6b7ddadd)
 * Config saved to config.json and https://gist.github.com/fc87356b5c1507d4543f1b8c6b7ddadd
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),n=i.data("bs.alert");n||i.data("bs.alert",n=new o(this)),"string"==typeof e&&n[e].call(i)})}var i='[data-dismiss="alert"]',o=function(e){t(e).on("click",i,this.close)};o.VERSION="3.3.7",o.TRANSITION_DURATION=150,o.prototype.close=function(e){function i(){a.detach().trigger("closed.bs.alert").remove()}var n=t(this),s=n.attr("data-target");s||(s=n.attr("href"),s=s&&s.replace(/.*(?=#[^\s]*$)/,""));var a=t("#"===s?[]:s);e&&e.preventDefault(),a.length||(a=n.closest(".alert")),a.trigger(e=t.Event("close.bs.alert")),e.isDefaultPrevented()||(a.removeClass("in"),t.support.transition&&a.hasClass("fade")?a.one("bsTransitionEnd",i).emulateTransitionEnd(o.TRANSITION_DURATION):i())};var n=t.fn.alert;t.fn.alert=e,t.fn.alert.Constructor=o,t.fn.alert.noConflict=function(){return t.fn.alert=n,this},t(document).on("click.bs.alert.data-api",i,o.prototype.close)}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.button"),s="object"==typeof e&&e;n||o.data("bs.button",n=new i(this,s)),"toggle"==e?n.toggle():e&&n.setState(e)})}var i=function(e,o){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,o),this.isLoading=!1};i.VERSION="3.3.7",i.DEFAULTS={loadingText:"loading..."},i.prototype.setState=function(e){var i="disabled",o=this.$element,n=o.is("input")?"val":"html",s=o.data();e+="Text",null==s.resetText&&o.data("resetText",o[n]()),setTimeout(t.proxy(function(){o[n](null==s[e]?this.options[e]:s[e]),"loadingText"==e?(this.isLoading=!0,o.addClass(i).attr(i,i).prop(i,!0)):this.isLoading&&(this.isLoading=!1,o.removeClass(i).removeAttr(i).prop(i,!1))},this),0)},i.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")?(i.prop("checked")&&(t=!1),e.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==i.prop("type")&&(i.prop("checked")!==this.$element.hasClass("active")&&(t=!1),this.$element.toggleClass("active")),i.prop("checked",this.$element.hasClass("active")),t&&i.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var o=t.fn.button;t.fn.button=e,t.fn.button.Constructor=i,t.fn.button.noConflict=function(){return t.fn.button=o,this},t(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(i){var o=t(i.target).closest(".btn");e.call(o,"toggle"),t(i.target).is('input[type="radio"], input[type="checkbox"]')||(i.preventDefault(),o.is("input,button")?o.trigger("focus"):o.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(e){t(e.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(e.type))})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.carousel"),s=t.extend({},i.DEFAULTS,o.data(),"object"==typeof e&&e),a="string"==typeof e?e:s.slide;n||o.data("bs.carousel",n=new i(this,s)),"number"==typeof e?n.to(e):a?n[a]():s.interval&&n.pause().cycle()})}var i=function(e,i){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=i,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",t.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",t.proxy(this.pause,this)).on("mouseleave.bs.carousel",t.proxy(this.cycle,this))};i.VERSION="3.3.7",i.TRANSITION_DURATION=600,i.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},i.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},i.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},i.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},i.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e),o="prev"==t&&0===i||"next"==t&&i==this.$items.length-1;if(o&&!this.options.wrap)return e;var n="prev"==t?-1:1,s=(i+n)%this.$items.length;return this.$items.eq(s)},i.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));return t>this.$items.length-1||0>t?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(t>i?"next":"prev",this.$items.eq(t))},i.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},i.prototype.next=function(){return this.sliding?void 0:this.slide("next")},i.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},i.prototype.slide=function(e,o){var n=this.$element.find(".item.active"),s=o||this.getItemForDirection(e,n),a=this.interval,r="next"==e?"left":"right",l=this;if(s.hasClass("active"))return this.sliding=!1;var h=s[0],d=t.Event("slide.bs.carousel",{relatedTarget:h,direction:r});if(this.$element.trigger(d),!d.isDefaultPrevented()){if(this.sliding=!0,a&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var p=t(this.$indicators.children()[this.getItemIndex(s)]);p&&p.addClass("active")}var c=t.Event("slid.bs.carousel",{relatedTarget:h,direction:r});return t.support.transition&&this.$element.hasClass("slide")?(s.addClass(e),s[0].offsetWidth,n.addClass(r),s.addClass(r),n.one("bsTransitionEnd",function(){s.removeClass([e,r].join(" ")).addClass("active"),n.removeClass(["active",r].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(c)},0)}).emulateTransitionEnd(i.TRANSITION_DURATION)):(n.removeClass("active"),s.addClass("active"),this.sliding=!1,this.$element.trigger(c)),a&&this.cycle(),this}};var o=t.fn.carousel;t.fn.carousel=e,t.fn.carousel.Constructor=i,t.fn.carousel.noConflict=function(){return t.fn.carousel=o,this};var n=function(i){var o,n=t(this),s=t(n.attr("data-target")||(o=n.attr("href"))&&o.replace(/.*(?=#[^\s]+$)/,""));if(s.hasClass("carousel")){var a=t.extend({},s.data(),n.data()),r=n.attr("data-slide-to");r&&(a.interval=!1),e.call(s,a),r&&s.data("bs.carousel").to(r),i.preventDefault()}};t(document).on("click.bs.carousel.data-api","[data-slide]",n).on("click.bs.carousel.data-api","[data-slide-to]",n),t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var i=t(this);e.call(i,i.data())})})}(jQuery),+function(t){"use strict";function e(e){var i=e.attr("data-target");i||(i=e.attr("href"),i=i&&/#[A-Za-z]/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,""));var o=i&&t(i);return o&&o.length?o:e.parent()}function i(i){i&&3===i.which||(t(n).remove(),t(s).each(function(){var o=t(this),n=e(o),s={relatedTarget:this};n.hasClass("open")&&(i&&"click"==i.type&&/input|textarea/i.test(i.target.tagName)&&t.contains(n[0],i.target)||(n.trigger(i=t.Event("hide.bs.dropdown",s)),i.isDefaultPrevented()||(o.attr("aria-expanded","false"),n.removeClass("open").trigger(t.Event("hidden.bs.dropdown",s)))))}))}function o(e){return this.each(function(){var i=t(this),o=i.data("bs.dropdown");o||i.data("bs.dropdown",o=new a(this)),"string"==typeof e&&o[e].call(i)})}var n=".dropdown-backdrop",s='[data-toggle="dropdown"]',a=function(e){t(e).on("click.bs.dropdown",this.toggle)};a.VERSION="3.3.7",a.prototype.toggle=function(o){var n=t(this);if(!n.is(".disabled, :disabled")){var s=e(n),a=s.hasClass("open");if(i(),!a){"ontouchstart"in document.documentElement&&!s.closest(".navbar-nav").length&&t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click",i);var r={relatedTarget:this};if(s.trigger(o=t.Event("show.bs.dropdown",r)),o.isDefaultPrevented())return;n.trigger("focus").attr("aria-expanded","true"),s.toggleClass("open").trigger(t.Event("shown.bs.dropdown",r))}return!1}},a.prototype.keydown=function(i){if(/(38|40|27|32)/.test(i.which)&&!/input|textarea/i.test(i.target.tagName)){var o=t(this);if(i.preventDefault(),i.stopPropagation(),!o.is(".disabled, :disabled")){var n=e(o),a=n.hasClass("open");if(!a&&27!=i.which||a&&27==i.which)return 27==i.which&&n.find(s).trigger("focus"),o.trigger("click");var r=" li:not(.disabled):visible a",l=n.find(".dropdown-menu"+r);if(l.length){var h=l.index(i.target);38==i.which&&h>0&&h--,40==i.which&&h<l.length-1&&h++,~h||(h=0),l.eq(h).trigger("focus")}}}};var r=t.fn.dropdown;t.fn.dropdown=o,t.fn.dropdown.Constructor=a,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=r,this},t(document).on("click.bs.dropdown.data-api",i).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",s,a.prototype.toggle).on("keydown.bs.dropdown.data-api",s,a.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",a.prototype.keydown)}(jQuery),+function(t){"use strict";function e(e,o){return this.each(function(){var n=t(this),s=n.data("bs.modal"),a=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e);s||n.data("bs.modal",s=new i(this,a)),"string"==typeof e?s[e](o):a.show&&s.show(o)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};i.VERSION="3.3.7",i.TRANSITION_DURATION=300,i.BACKDROP_TRANSITION_DURATION=150,i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var o=this,n=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(n),this.isShown||n.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){o.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(o.$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var n=t.support.transition&&o.$element.hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.adjustDialog(),n&&o.$element[0].offsetWidth,o.$element.addClass("in"),o.enforceFocus();var s=t.Event("shown.bs.modal",{relatedTarget:e});n?o.$dialog.one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(s)}).emulateTransitionEnd(i.TRANSITION_DURATION):o.$element.trigger("focus").trigger(s)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(i.TRANSITION_DURATION):this.hideModal())},i.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},i.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},i.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},i.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},i.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var o=this,n=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var s=t.support.transition&&n;if(this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+n).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),s&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;s?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var a=function(){o.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):a()}else e&&e()},i.prototype.handleUpdate=function(){this.adjustDialog()},i.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},i.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},i.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},i.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},i.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},i.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var o=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function(){return t.fn.modal=o,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(i){var o=t(this),n=o.attr("href"),s=t(o.attr("data-target")||n&&n.replace(/.*(?=#[^\s]+$)/,"")),a=s.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(n)&&n},s.data(),o.data());o.is("a")&&i.preventDefault(),s.one("show.bs.modal",function(t){t.isDefaultPrevented()||s.one("hidden.bs.modal",function(){o.is(":visible")&&o.trigger("focus")})}),e.call(s,a,this)})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.tooltip"),s="object"==typeof e&&e;!n&&/destroy|hide/.test(e)||(n||o.data("bs.tooltip",n=new i(this,s)),"string"==typeof e&&n[e]())})}var i=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};i.VERSION="3.3.7",i.TRANSITION_DURATION=150,i.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},i.prototype.init=function(e,i,o){if(this.enabled=!0,this.type=e,this.$element=t(i),this.options=this.getOptions(o),this.$viewport=this.options.viewport&&t(t.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var n=this.options.trigger.split(" "),s=n.length;s--;){var a=n[s];if("click"==a)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=a){var r="hover"==a?"mouseenter":"focusin",l="hover"==a?"mouseleave":"focusout";this.$element.on(r+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},i.prototype.getDefaults=function(){return i.DEFAULTS},i.prototype.getOptions=function(e){return e=t.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},i.prototype.getDelegateOptions=function(){var e={},i=this.getDefaults();return this._options&&t.each(this._options,function(t,o){i[t]!=o&&(e[t]=o)}),e},i.prototype.enter=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),e instanceof t.Event&&(i.inState["focusin"==e.type?"focus":"hover"]=!0),i.tip().hasClass("in")||"in"==i.hoverState?void(i.hoverState="in"):(clearTimeout(i.timeout),i.hoverState="in",i.options.delay&&i.options.delay.show?void(i.timeout=setTimeout(function(){"in"==i.hoverState&&i.show()},i.options.delay.show)):i.show())},i.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},i.prototype.leave=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),e instanceof t.Event&&(i.inState["focusout"==e.type?"focus":"hover"]=!1),i.isInStateTrue()?void 0:(clearTimeout(i.timeout),i.hoverState="out",i.options.delay&&i.options.delay.hide?void(i.timeout=setTimeout(function(){"out"==i.hoverState&&i.hide()},i.options.delay.hide)):i.hide())},i.prototype.show=function(){var e=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var o=t.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!o)return;var n=this,s=this.tip(),a=this.getUID(this.type);this.setContent(),s.attr("id",a),this.$element.attr("aria-describedby",a),this.options.animation&&s.addClass("fade");var r="function"==typeof this.options.placement?this.options.placement.call(this,s[0],this.$element[0]):this.options.placement,l=/\s?auto?\s?/i,h=l.test(r);h&&(r=r.replace(l,"")||"top"),s.detach().css({top:0,left:0,display:"block"}).addClass(r).data("bs."+this.type,this),this.options.container?s.appendTo(this.options.container):s.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var d=this.getPosition(),p=s[0].offsetWidth,c=s[0].offsetHeight;if(h){var f=r,u=this.getPosition(this.$viewport);r="bottom"==r&&d.bottom+c>u.bottom?"top":"top"==r&&d.top-c<u.top?"bottom":"right"==r&&d.right+p>u.width?"left":"left"==r&&d.left-p<u.left?"right":r,s.removeClass(f).addClass(r)}var g=this.getCalculatedOffset(r,d,p,c);this.applyPlacement(g,r);var v=function(){var t=n.hoverState;n.$element.trigger("shown.bs."+n.type),n.hoverState=null,"out"==t&&n.leave(n)};t.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",v).emulateTransitionEnd(i.TRANSITION_DURATION):v()}},i.prototype.applyPlacement=function(e,i){var o=this.tip(),n=o[0].offsetWidth,s=o[0].offsetHeight,a=parseInt(o.css("margin-top"),10),r=parseInt(o.css("margin-left"),10);isNaN(a)&&(a=0),isNaN(r)&&(r=0),e.top+=a,e.left+=r,t.offset.setOffset(o[0],t.extend({using:function(t){o.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),o.addClass("in");var l=o[0].offsetWidth,h=o[0].offsetHeight;"top"==i&&h!=s&&(e.top=e.top+s-h);var d=this.getViewportAdjustedDelta(i,e,l,h);d.left?e.left+=d.left:e.top+=d.top;var p=/top|bottom/.test(i),c=p?2*d.left-n+l:2*d.top-s+h,f=p?"offsetWidth":"offsetHeight";o.offset(e),this.replaceArrow(c,o[0][f],p)},i.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},i.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},i.prototype.hide=function(e){function o(){"in"!=n.hoverState&&s.detach(),n.$element&&n.$element.removeAttr("aria-describedby").trigger("hidden.bs."+n.type),e&&e()}var n=this,s=t(this.$tip),a=t.Event("hide.bs."+this.type);return this.$element.trigger(a),a.isDefaultPrevented()?void 0:(s.removeClass("in"),t.support.transition&&s.hasClass("fade")?s.one("bsTransitionEnd",o).emulateTransitionEnd(i.TRANSITION_DURATION):o(),this.hoverState=null,this)},i.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},i.prototype.hasContent=function(){return this.getTitle()},i.prototype.getPosition=function(e){e=e||this.$element;var i=e[0],o="BODY"==i.tagName,n=i.getBoundingClientRect();null==n.width&&(n=t.extend({},n,{width:n.right-n.left,height:n.bottom-n.top}));var s=window.SVGElement&&i instanceof window.SVGElement,a=o?{top:0,left:0}:s?null:e.offset(),r={scroll:o?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop()},l=o?{width:t(window).width(),height:t(window).height()}:null;return t.extend({},n,r,l,a)},i.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},i.prototype.getViewportAdjustedDelta=function(t,e,i,o){var n={top:0,left:0};if(!this.$viewport)return n;var s=this.options.viewport&&this.options.viewport.padding||0,a=this.getPosition(this.$viewport);if(/right|left/.test(t)){var r=e.top-s-a.scroll,l=e.top+s-a.scroll+o;r<a.top?n.top=a.top-r:l>a.top+a.height&&(n.top=a.top+a.height-l)}else{var h=e.left-s,d=e.left+s+i;h<a.left?n.left=a.left-h:d>a.right&&(n.left=a.left+a.width-d)}return n},i.prototype.getTitle=function(){var t,e=this.$element,i=this.options;return t=e.attr("data-original-title")||("function"==typeof i.title?i.title.call(e[0]):i.title)},i.prototype.getUID=function(t){do t+=~~(1e6*Math.random());while(document.getElementById(t));return t},i.prototype.tip=function(){if(!this.$tip&&(this.$tip=t(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},i.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},i.prototype.enable=function(){this.enabled=!0},i.prototype.disable=function(){this.enabled=!1},i.prototype.toggleEnabled=function(){this.enabled=!this.enabled},i.prototype.toggle=function(e){var i=this;e&&(i=t(e.currentTarget).data("bs."+this.type),i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i))),e?(i.inState.click=!i.inState.click,i.isInStateTrue()?i.enter(i):i.leave(i)):i.tip().hasClass("in")?i.leave(i):i.enter(i)},i.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})};var o=t.fn.tooltip;t.fn.tooltip=e,t.fn.tooltip.Constructor=i,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=o,this}}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.popover"),s="object"==typeof e&&e;!n&&/destroy|hide/.test(e)||(n||o.data("bs.popover",n=new i(this,s)),"string"==typeof e&&n[e]())})}var i=function(t,e){this.init("popover",t,e)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");i.VERSION="3.3.7",i.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),i.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),i.prototype.constructor=i,i.prototype.getDefaults=function(){return i.DEFAULTS},i.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof i?"html":"append":"text"](i),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},i.prototype.hasContent=function(){return this.getTitle()||this.getContent()},i.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},i.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var o=t.fn.popover;t.fn.popover=e,t.fn.popover.Constructor=i,t.fn.popover.noConflict=function(){return t.fn.popover=o,this}}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.tab");n||o.data("bs.tab",n=new i(this)),"string"==typeof e&&n[e]()})}var i=function(e){this.element=t(e)};i.VERSION="3.3.7",i.TRANSITION_DURATION=150,i.prototype.show=function(){var e=this.element,i=e.closest("ul:not(.dropdown-menu)"),o=e.data("target");if(o||(o=e.attr("href"),o=o&&o.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var n=i.find(".active:last a"),s=t.Event("hide.bs.tab",{relatedTarget:e[0]}),a=t.Event("show.bs.tab",{relatedTarget:n[0]});if(n.trigger(s),e.trigger(a),!a.isDefaultPrevented()&&!s.isDefaultPrevented()){var r=t(o);this.activate(e.closest("li"),i),this.activate(r,r.parent(),function(){n.trigger({type:"hidden.bs.tab",relatedTarget:e[0]}),e.trigger({type:"shown.bs.tab",relatedTarget:n[0]})})}}},i.prototype.activate=function(e,o,n){function s(){a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),r?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu").length&&e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),n&&n()}var a=o.find("> .active"),r=n&&t.support.transition&&(a.length&&a.hasClass("fade")||!!o.find("> .fade").length);a.length&&r?a.one("bsTransitionEnd",s).emulateTransitionEnd(i.TRANSITION_DURATION):s(),a.removeClass("in")};var o=t.fn.tab;t.fn.tab=e,t.fn.tab.Constructor=i,t.fn.tab.noConflict=function(){return t.fn.tab=o,this};var n=function(i){i.preventDefault(),e.call(t(this),"show")};t(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',n).on("click.bs.tab.data-api",'[data-toggle="pill"]',n)}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.affix"),s="object"==typeof e&&e;n||o.data("bs.affix",n=new i(this,s)),"string"==typeof e&&n[e]()})}var i=function(e,o){this.options=t.extend({},i.DEFAULTS,o),this.$target=t(this.options.target).on("scroll.bs.affix.data-api",t.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",t.proxy(this.checkPositionWithEventLoop,this)),this.$element=t(e),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};i.VERSION="3.3.7",i.RESET="affix affix-top affix-bottom",i.DEFAULTS={offset:0,target:window},i.prototype.getState=function(t,e,i,o){var n=this.$target.scrollTop(),s=this.$element.offset(),a=this.$target.height();if(null!=i&&"top"==this.affixed)return i>n?"top":!1;if("bottom"==this.affixed)return null!=i?n+this.unpin<=s.top?!1:"bottom":t-o>=n+a?!1:"bottom";var r=null==this.affixed,l=r?n:s.top,h=r?a:e;return null!=i&&i>=n?"top":null!=o&&l+h>=t-o?"bottom":!1},i.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(i.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},i.prototype.checkPositionWithEventLoop=function(){setTimeout(t.proxy(this.checkPosition,this),1)},i.prototype.checkPosition=function(){if(this.$element.is(":visible")){var e=this.$element.height(),o=this.options.offset,n=o.top,s=o.bottom,a=Math.max(t(document).height(),t(document.body).height());"object"!=typeof o&&(s=n=o),"function"==typeof n&&(n=o.top(this.$element)),"function"==typeof s&&(s=o.bottom(this.$element));var r=this.getState(a,e,n,s);if(this.affixed!=r){null!=this.unpin&&this.$element.css("top","");var l="affix"+(r?"-"+r:""),h=t.Event(l+".bs.affix");if(this.$element.trigger(h),h.isDefaultPrevented())return;this.affixed=r,this.unpin="bottom"==r?this.getPinnedOffset():null,this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix","affixed")+".bs.affix")}"bottom"==r&&this.$element.offset({top:a-e-s})}};var o=t.fn.affix;t.fn.affix=e,t.fn.affix.Constructor=i,t.fn.affix.noConflict=function(){return t.fn.affix=o,this},t(window).on("load",function(){t('[data-spy="affix"]').each(function(){var i=t(this),o=i.data();o.offset=o.offset||{},null!=o.offsetBottom&&(o.offset.bottom=o.offsetBottom),null!=o.offsetTop&&(o.offset.top=o.offsetTop),e.call(i,o)})})}(jQuery),+function(t){"use strict";function e(e){var i,o=e.attr("data-target")||(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"");return t(o)}function i(e){return this.each(function(){var i=t(this),n=i.data("bs.collapse"),s=t.extend({},o.DEFAULTS,i.data(),"object"==typeof e&&e);!n&&s.toggle&&/show|hide/.test(e)&&(s.toggle=!1),n||i.data("bs.collapse",n=new o(this,s)),"string"==typeof e&&n[e]()})}var o=function(e,i){this.$element=t(e),this.options=t.extend({},o.DEFAULTS,i),this.$trigger=t('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};o.VERSION="3.3.7",o.TRANSITION_DURATION=350,o.DEFAULTS={toggle:!0},o.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},o.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e,n=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(n&&n.length&&(e=n.data("bs.collapse"),e&&e.transitioning))){var s=t.Event("show.bs.collapse");if(this.$element.trigger(s),!s.isDefaultPrevented()){n&&n.length&&(i.call(n,"hide"),e||n.data("bs.collapse",null));var a=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var r=function(){this.$element.removeClass("collapsing").addClass("collapse in")[a](""),this.transitioning=0,
this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return r.call(this);var l=t.camelCase(["scroll",a].join("-"));this.$element.one("bsTransitionEnd",t.proxy(r,this)).emulateTransitionEnd(o.TRANSITION_DURATION)[a](this.$element[0][l])}}}},o.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.dimension();this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var n=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return t.support.transition?void this.$element[i](0).one("bsTransitionEnd",t.proxy(n,this)).emulateTransitionEnd(o.TRANSITION_DURATION):n.call(this)}}},o.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},o.prototype.getParent=function(){return t(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(t.proxy(function(i,o){var n=t(o);this.addAriaAndCollapsedClass(e(n),n)},this)).end()},o.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var n=t.fn.collapse;t.fn.collapse=i,t.fn.collapse.Constructor=o,t.fn.collapse.noConflict=function(){return t.fn.collapse=n,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(o){var n=t(this);n.attr("data-target")||o.preventDefault();var s=e(n),a=s.data("bs.collapse"),r=a?"toggle":n.data();i.call(s,r)})}(jQuery),+function(t){"use strict";function e(i,o){this.$body=t(document.body),this.$scrollElement=t(t(i).is(document.body)?window:i),this.options=t.extend({},e.DEFAULTS,o),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",t.proxy(this.process,this)),this.refresh(),this.process()}function i(i){return this.each(function(){var o=t(this),n=o.data("bs.scrollspy"),s="object"==typeof i&&i;n||o.data("bs.scrollspy",n=new e(this,s)),"string"==typeof i&&n[i]()})}e.VERSION="3.3.7",e.DEFAULTS={offset:10},e.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},e.prototype.refresh=function(){var e=this,i="offset",o=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),t.isWindow(this.$scrollElement[0])||(i="position",o=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var e=t(this),n=e.data("target")||e.attr("href"),s=/^#./.test(n)&&t(n);return s&&s.length&&s.is(":visible")&&[[s[i]().top+o,n]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){e.offsets.push(this[0]),e.targets.push(this[1])})},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),o=this.options.offset+i-this.$scrollElement.height(),n=this.offsets,s=this.targets,a=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),e>=o)return a!=(t=s[s.length-1])&&this.activate(t);if(a&&e<n[0])return this.activeTarget=null,this.clear();for(t=n.length;t--;)a!=s[t]&&e>=n[t]&&(void 0===n[t+1]||e<n[t+1])&&this.activate(s[t])},e.prototype.activate=function(e){this.activeTarget=e,this.clear();var i=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',o=t(i).parents("li").addClass("active");o.parent(".dropdown-menu").length&&(o=o.closest("li.dropdown").addClass("active")),o.trigger("activate.bs.scrollspy")},e.prototype.clear=function(){t(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var o=t.fn.scrollspy;t.fn.scrollspy=i,t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=o,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);i.call(e,e.data())})})}(jQuery),+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,o=this;t(this).one("bsTransitionEnd",function(){i=!0});var n=function(){i||t(o).trigger(t.support.transition.end)};return setTimeout(n,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery);
/*
 * arrive.js
 * v2.3.0
 * https://github.com/uzairfarooq/arrive
 * MIT licensed
 *
 * Copyright (c) 2014-2015 Uzair Farooq
 */

var Arrive = (function(window, $, undefined) {

  "use strict";

  if(!window.MutationObserver || typeof HTMLElement === 'undefined'){
    return; //for unsupported browsers
  }

  var arriveUniqueId = 0;

  var utils = (function() {
    var matches = HTMLElement.prototype.matches || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector
                  || HTMLElement.prototype.msMatchesSelector;

    return {
      matchesSelector: function(elem, selector) {
        return elem instanceof HTMLElement && matches.call(elem, selector);
      }, 
      // to enable function overloading - By John Resig (MIT Licensed)
      addMethod: function (object, name, fn) {
        var old = object[ name ];
        object[ name ] = function(){
          if ( fn.length == arguments.length )
            return fn.apply( this, arguments );
          else if ( typeof old == 'function' )
            return old.apply( this, arguments );
        };
      },
      callCallbacks: function(callbacksToBeCalled) {
        for (var i = 0, cb; cb = callbacksToBeCalled[i]; i++) {
          cb.callback.call(cb.elem);
        }
      },
      // traverse through all descendants of a node to check if event should be fired for any descendant
      checkChildNodesRecursively: function(nodes, registrationData, matchFunc, callbacksToBeCalled) {
        // check each new node if it matches the selector
        for (var i=0, node; node = nodes[i]; i++) {
          if (matchFunc(node, registrationData, callbacksToBeCalled)) {
            callbacksToBeCalled.push({ callback: registrationData.callback, elem: node });
          }

          if (node.childNodes.length > 0) {
            utils.checkChildNodesRecursively(node.childNodes, registrationData, matchFunc, callbacksToBeCalled);
          }
        }
      },
      mergeArrays: function(firstArr, secondArr){
        // Overwrites default options with user-defined options.
        var options = {},
            attrName;
        for (attrName in firstArr) {
          options[attrName] = firstArr[attrName];
        }
        for (attrName in secondArr) {
          options[attrName] = secondArr[attrName];
        }
        return options;
      },
      toElementsArray: function (elements) {
        // check if object is an array (or array like object)
        // Note: window object has .length property but it's not array of elements so don't consider it an array
        if (typeof elements !== "undefined" && (typeof elements.length !== "number" || elements === window)) {
          elements = [elements];
        }
        return elements;
      }
    };
  })();


  // Class to maintain state of all registered events of a single type
  var EventsBucket = (function() {
    var EventsBucket = function() {
      // holds all the events

      this._eventsBucket    = [];
      // function to be called while adding an event, the function should do the event initialization/registration
      this._beforeAdding    = null;
      // function to be called while removing an event, the function should do the event destruction
      this._beforeRemoving  = null;
    };

    EventsBucket.prototype.addEvent = function(target, selector, options, callback) {
      var newEvent = {
        target:             target, 
        selector:           selector, 
        options:            options, 
        callback:           callback, 
        firedElems:         []
      };

      if (this._beforeAdding) {
        this._beforeAdding(newEvent);
      }
      
      this._eventsBucket.push(newEvent);
      return newEvent;
    };

    EventsBucket.prototype.removeEvent = function(compareFunction) {
      for (var i=this._eventsBucket.length - 1, registeredEvent; registeredEvent = this._eventsBucket[i]; i--) {
        if (compareFunction(registeredEvent)) {
          if (this._beforeRemoving) {
              this._beforeRemoving(registeredEvent);
          }
          this._eventsBucket.splice(i, 1);
        }
      }
    };

    EventsBucket.prototype.beforeAdding = function(beforeAdding) {
      this._beforeAdding = beforeAdding;
    };

    EventsBucket.prototype.beforeRemoving = function(beforeRemoving) {
      this._beforeRemoving = beforeRemoving;
    };

    return EventsBucket;
  })();


  /**
   * @constructor
   * General class for binding/unbinding arrive and leave events
   */
  var MutationEvents = function(getObserverConfig, onMutation) {
    var eventsBucket    = new EventsBucket(), 
        me              = this;

    var defaultOptions = {
      fireOnAttributesModification: false
    };

    // actual event registration before adding it to bucket
    eventsBucket.beforeAdding(function(registrationData) {
      var 
        target    = registrationData.target, 
        selector  = registrationData.selector, 
        callback  = registrationData.callback, 
        observer;

      // mutation observer does not work on window or document
      if (target === window.document || target === window)
        target = document.getElementsByTagName("html")[0];

      // Create an observer instance
      observer = new MutationObserver(function(e) {
        onMutation.call(this, e, registrationData);
      });

      var config = getObserverConfig(registrationData.options);
      
      observer.observe(target, config);

      registrationData.observer = observer;
      registrationData.me = me;
    });

    // cleanup/unregister before removing an event
    eventsBucket.beforeRemoving(function (eventData) {
      eventData.observer.disconnect();
    });

    this.bindEvent = function(selector, options, callback) {
      options = utils.mergeArrays(defaultOptions, options);

      var elements = utils.toElementsArray(this);

      for (var i = 0; i < elements.length; i++) {
        eventsBucket.addEvent(elements[i], selector, options, callback);
      }
    };

    this.unbindEvent = function() {
      var elements = utils.toElementsArray(this);
      eventsBucket.removeEvent(function(eventObj) {
        for (var i = 0; i < elements.length; i++) {
          if (this === undefined || eventObj.target === elements[i]) {
            return true;
          }
        }
        return false;
      });
    };

    this.unbindEventWithSelectorOrCallback = function(selector) {
      var elements = utils.toElementsArray(this),
          callback = selector, 
          compareFunction;

      if (typeof selector === "function") {
        compareFunction = function(eventObj) {
          for (var i = 0; i < elements.length; i++) {
            if ((this === undefined || eventObj.target === elements[i]) && eventObj.callback === callback) {
              return true;
            }
          }
          return false;
        };
      }
      else {
        compareFunction = function(eventObj) {
          for (var i = 0; i < elements.length; i++) {
            if ((this === undefined || eventObj.target === elements[i]) && eventObj.selector === selector) {
              return true;
            }
          }
          return false;
        };
      }
      eventsBucket.removeEvent(compareFunction);
    };

    this.unbindEventWithSelectorAndCallback = function(selector, callback) {
      var elements = utils.toElementsArray(this);
      eventsBucket.removeEvent(function(eventObj) {
          for (var i = 0; i < elements.length; i++) {
            if ((this === undefined || eventObj.target === elements[i]) && eventObj.selector === selector && eventObj.callback === callback) {
              return true;
            }
          }
          return false;
      });
    };

    return this;
  };


  /**
   * @constructor
   * Processes 'arrive' events
   */
  var ArriveEvents = function() {
    var mutationEvents,
        me = this;

    // Default options for 'arrive' event
    var arriveDefaultOptions = {
      fireOnAttributesModification: false,
      onceOnly: false,
      existing: false
    };

    function getArriveObserverConfig(options) {
      var config = {
        attributes: false,
        childList: true,
        subtree: true
      };

      if (options.fireOnAttributesModification) {
        config.attributes = true;
      }

      return config;
    }

    function onArriveMutation(mutations, registrationData) {
      mutations.forEach(function( mutation ) {
        var newNodes    = mutation.addedNodes,
            targetNode = mutation.target,
            callbacksToBeCalled = [];

        // If new nodes are added
        if( newNodes !== null && newNodes.length > 0 ) {
          utils.checkChildNodesRecursively(newNodes, registrationData, nodeMatchFunc, callbacksToBeCalled);
        }
        else if (mutation.type === "attributes") {
          if (nodeMatchFunc(targetNode, registrationData, callbacksToBeCalled)) {
            callbacksToBeCalled.push({ callback: registrationData.callback, elem: node });
          }
        }

        utils.callCallbacks(callbacksToBeCalled);
      });
    }

    function nodeMatchFunc(node, registrationData, callbacksToBeCalled) {
      // check a single node to see if it matches the selector
      if (utils.matchesSelector(node, registrationData.selector)) {
        if(node._id === undefined) {
          node._id = arriveUniqueId++;
        }
        // make sure the arrive event is not already fired for the element
        if (registrationData.firedElems.indexOf(node._id) == -1) {

          if (registrationData.options.onceOnly) {
            if (registrationData.firedElems.length === 0) {
              // On first callback, unbind event.
              registrationData.me.unbindEventWithSelectorAndCallback.call(
                  registrationData.target, registrationData.selector, registrationData.callback);
            } else {
              // Ignore multiple mutations which may have been queued before the event was unbound.
              return;
            }
          }

          registrationData.firedElems.push(node._id);
          callbacksToBeCalled.push({ callback: registrationData.callback, elem: node });
        }
      }
    }

    arriveEvents = new MutationEvents(getArriveObserverConfig, onArriveMutation);

    var mutationBindEvent = arriveEvents.bindEvent;

    // override bindEvent function
    arriveEvents.bindEvent = function(selector, options, callback) {

      if (typeof callback === "undefined") {
        callback = options;
        options = arriveDefaultOptions;
      } else {
        options = utils.mergeArrays(arriveDefaultOptions, options);
      }

      var elements = utils.toElementsArray(this);

      if (options.existing) {
        var existing = [];

        for (var i = 0; i < elements.length; i++) {
          var nodes = elements[i].querySelectorAll(selector);
          for (var j = 0; j < nodes.length; j++) {
            existing.push({ callback: callback, elem: nodes[j] });
          }
        }

        // no need to bind event if the callback has to be fired only once and we have already found the element
        if (options.onceOnly && existing.length) {
          return callback.call(existing[0].elem);
        }

        utils.callCallbacks(existing)
      }

      mutationBindEvent.call(this, selector, options, callback);
    };

    return arriveEvents;
  };


  /**
   * @constructor
   * Processes 'leave' events
   */
  var LeaveEvents = function() {
    var mutationEvents,
        me = this;

    // Default options for 'leave' event
    var leaveDefaultOptions = {};

    function getLeaveObserverConfig(options) {
      var config = {
        childList: true,
        subtree: true
      };

      return config;
    }

    function onLeaveMutation(mutations, registrationData) {
      mutations.forEach(function( mutation ) {
        var removedNodes  = mutation.removedNodes,
            targetNode   = mutation.target,
            callbacksToBeCalled = [];

        if( removedNodes !== null && removedNodes.length > 0 ) {
          utils.checkChildNodesRecursively(removedNodes, registrationData, nodeMatchFunc, callbacksToBeCalled);
        }

        utils.callCallbacks(callbacksToBeCalled);
      });
    }

    function nodeMatchFunc(node, registrationData) {
      return utils.matchesSelector(node, registrationData.selector);
    }

    leaveEvents = new MutationEvents(getLeaveObserverConfig, onLeaveMutation);

    var mutationBindEvent = leaveEvents.bindEvent;

    // override bindEvent function
    leaveEvents.bindEvent = function(selector, options, callback) {

      if (typeof callback === "undefined") {
        callback = options;
        options = leaveDefaultOptions;
      } else {
        options = utils.mergeArrays(leaveDefaultOptions, options);
      }

      mutationBindEvent.call(this, selector, options, callback);
    };

    return leaveEvents;
  };


  var arriveEvents = new ArriveEvents(),
      leaveEvents  = new LeaveEvents();

  function exposeUnbindApi(eventObj, exposeTo, funcName) {
    // expose unbind function with function overriding
    utils.addMethod(exposeTo, funcName, eventObj.unbindEvent);
    utils.addMethod(exposeTo, funcName, eventObj.unbindEventWithSelectorOrCallback);
    utils.addMethod(exposeTo, funcName, eventObj.unbindEventWithSelectorAndCallback);
  }

  /*** expose APIs ***/
  function exposeApi(exposeTo) {
    exposeTo.arrive = arriveEvents.bindEvent;
    exposeUnbindApi(arriveEvents, exposeTo, "unbindArrive");

    exposeTo.leave = leaveEvents.bindEvent;
    exposeUnbindApi(leaveEvents, exposeTo, "unbindLeave");
  }

  if ($) {
    exposeApi($.fn);
  }
  exposeApi(HTMLElement.prototype);
  exposeApi(NodeList.prototype);
  exposeApi(HTMLCollection.prototype);
  exposeApi(HTMLDocument.prototype);
  exposeApi(Window.prototype);

  var Arrive = {};
  // expose functions to unbind all arrive/leave events
  exposeUnbindApi(arriveEvents, Arrive, "unbindAllArrive");
  exposeUnbindApi(leaveEvents, Arrive, "unbindAllLeave");

  return Arrive;

})(this, typeof jQuery === 'undefined' ? null : jQuery, undefined);

/* globals jQuery */

(function ($) {
  // Selector to select only not already processed elements
  $.expr[":"].notmdproc = function (obj) {
    if ($(obj).data("mdproc")) {
      return false;
    } else {
      return true;
    }
  };

  function _isChar(evt) {
    if (typeof evt.which == "undefined") {
      return true;
    } else if (typeof evt.which == "number" && evt.which > 0) {
      return (
        !evt.ctrlKey
        && !evt.metaKey
        && !evt.altKey
        && evt.which != 8  // backspace
        && evt.which != 9  // tab
        && evt.which != 13 // enter
        && evt.which != 16 // shift
        && evt.which != 17 // ctrl
        && evt.which != 20 // caps lock
        && evt.which != 27 // escape
      );
    }
    return false;
  }

  function _addFormGroupFocus(element) {
    var $element = $(element);
    if (!$element.prop('disabled')) {  // this is showing as undefined on chrome but works fine on firefox??
      $element.closest(".form-group").addClass("is-focused");
    }
  }

  function _toggleTypeFocus($input) {
    $input.closest('label').hover(function () {
      var $i = $(this).find('input');
      if (!$i.prop('disabled')) { // hack because the _addFormGroupFocus() wasn't identifying the property on chrome
        _addFormGroupFocus($i);     // need to find the input so we can check disablement
      }
    }, function () {
      _removeFormGroupFocus($(this).find('input'));
    });
  }

  function _removeFormGroupFocus(element) {
    $(element).closest(".form-group").removeClass("is-focused"); // remove class from form-group
  }

  $.material = {
    "options": {
      // These options set what will be started by $.material.init()
      "validate": true,
      "input": true,
      "ripples": true,
      "checkbox": true,
      "togglebutton": true,
      "radio": true,
      "arrive": true,
      "autofill": false,

      "withRipples": [
        ".btn:not(.btn-link)",
        ".card-image",
        ".navbar a:not(.withoutripple)",
        ".dropdown-menu a",
        ".nav-tabs a:not(.withoutripple)",
        ".withripple",
        ".pagination li:not(.active):not(.disabled) a:not(.withoutripple)"
      ].join(","),
      "inputElements": "input.form-control, textarea.form-control, select.form-control",
      "checkboxElements": ".checkbox > label > input[type=checkbox]",
      "togglebuttonElements": ".togglebutton > label > input[type=checkbox]",
      "radioElements": ".radio > label > input[type=radio]"
    },
    "checkbox": function (selector) {
      // Add fake-checkbox to material checkboxes
      var $input = $((selector) ? selector : this.options.checkboxElements)
        .filter(":notmdproc")
        .data("mdproc", true)
        .after("<span class='checkbox-material'><span class='check'></span></span>");

      _toggleTypeFocus($input);
    },
    "togglebutton": function (selector) {
      // Add fake-checkbox to material checkboxes
      var $input = $((selector) ? selector : this.options.togglebuttonElements)
        .filter(":notmdproc")
        .data("mdproc", true)
        .after("<span class='toggle'></span>");

      _toggleTypeFocus($input);
    },
    "radio": function (selector) {
      // Add fake-radio to material radios
      var $input = $((selector) ? selector : this.options.radioElements)
        .filter(":notmdproc")
        .data("mdproc", true)
        .after("<span class='circle'></span><span class='check'></span>");

      _toggleTypeFocus($input);
    },
    "input": function (selector) {
      $((selector) ? selector : this.options.inputElements)
        .filter(":notmdproc")
        .data("mdproc", true)
        .each(function () {
          var $input = $(this);

          // Requires form-group standard markup (will add it if necessary)
          var $formGroup = $input.closest(".form-group"); // note that form-group may be grandparent in the case of an input-group
          if ($formGroup.length === 0) {
            $input.wrap("<div class='form-group'></div>");
            $formGroup = $input.closest(".form-group"); // find node after attached (otherwise additional attachments don't work)
          }

          // Legacy - Add hint label if using the old shorthand data-hint attribute on the input
          if ($input.attr("data-hint")) {
            $input.after("<p class='help-block'>" + $input.attr("data-hint") + "</p>");
            $input.removeAttr("data-hint");
          }

          // Legacy - Change input-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
          var legacySizes = {
            "input-lg": "form-group-lg",
            "input-sm": "form-group-sm"
          };
          $.each(legacySizes, function (legacySize, standardSize) {
            if ($input.hasClass(legacySize)) {
              $input.removeClass(legacySize);
              $formGroup.addClass(standardSize);
            }
          });

          // Legacy - Add label-floating if using old shorthand <input class="floating-label" placeholder="foo">
          if ($input.hasClass("floating-label")) {
            var placeholder = $input.attr("placeholder");
            $input.attr("placeholder", null).removeClass("floating-label");
            var id = $input.attr("id");
            var forAttribute = "";
            if (id) {
              forAttribute = "for='" + id + "'";
            }
            $formGroup.addClass("label-floating");
            $input.after("<label " + forAttribute + "class='control-label'>" + placeholder + "</label>");
          }

          // Set as empty if is empty (damn I must improve this...)
          if ($input.val() === null || $input.val() == "undefined" || $input.val() === "") {
            $formGroup.addClass("is-empty");
          }

          // Add at the end of the form-group
          $formGroup.append("<span class='material-input'></span>");

          // Support for file input
          if ($formGroup.find("input[type=file]").length > 0) {
            $formGroup.addClass("is-fileinput");
          }
        });
    },
    "attachInputEventHandlers": function () {
      var validate = this.options.validate;

      $(document)
        .on("change", ".checkbox input[type=checkbox]", function () {
          $(this).blur();
        })
        .on("keydown paste", ".form-control", function (e) {
          if (_isChar(e)) {
            $(this).closest(".form-group").removeClass("is-empty");
          }
        })
        .on("keyup change", ".form-control", function () {
          var $input = $(this);
          var $formGroup = $input.closest(".form-group");
          var isValid = (typeof $input[0].checkValidity === "undefined" || $input[0].checkValidity());

          if ($input.val() === "") {
            $formGroup.addClass("is-empty");
          }
          else {
            $formGroup.removeClass("is-empty");
          }

          // Validation events do not bubble, so they must be attached directly to the input: http://jsfiddle.net/PEpRM/1/
          //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
          //  the form-group on change.
          //
          // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
          //        BUT, I've left it here for backwards compatibility.
          if (validate) {
            if (isValid) {
              $formGroup.removeClass("has-error");
            }
            else {
              $formGroup.addClass("has-error");
            }
          }
        })
        .on("focus", ".form-control, .form-group.is-fileinput", function () {
          _addFormGroupFocus(this);
        })
        .on("blur", ".form-control, .form-group.is-fileinput", function () {
          _removeFormGroupFocus(this);
        })
        // make sure empty is added back when there is a programmatic value change.
        //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
        .on("change", ".form-group input", function () {
          var $input = $(this);
          if ($input.attr("type") == "file") {
            return;
          }

          var $formGroup = $input.closest(".form-group");
          var value = $input.val();
          if (value) {
            $formGroup.removeClass("is-empty");
          } else {
            $formGroup.addClass("is-empty");
          }
        })
        // set the fileinput readonly field with the name of the file
        .on("change", ".form-group.is-fileinput input[type='file']", function () {
          var $input = $(this);
          var $formGroup = $input.closest(".form-group");
          var value = "";
          $.each(this.files, function (i, file) {
            value += file.name + ", ";
          });
          value = value.substring(0, value.length - 2);
          if (value) {
            $formGroup.removeClass("is-empty");
          } else {
            $formGroup.addClass("is-empty");
          }
          $formGroup.find("input.form-control[readonly]").val(value);
        });
    },
    "ripples": function (selector) {
      $((selector) ? selector : this.options.withRipples).ripples();
    },
    "autofill": function () {
      // This part of code will detect autofill when the page is loading (username and password inputs for example)
      var loading = setInterval(function () {
        $("input[type!=checkbox]").each(function () {
          var $this = $(this);
          if ($this.val() && $this.val() !== $this.attr("value")) {
            $this.trigger("change");
          }
        });
      }, 100);

      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
      setTimeout(function () {
        clearInterval(loading);
      }, 10000);
    },
    "attachAutofillEventHandlers": function () {
      // Listen on inputs of the focused form (because user can select from the autofill dropdown only when the input has focus)
      var focused;
      $(document)
        .on("focus", "input", function () {
          var $inputs = $(this).parents("form").find("input").not("[type=file]");
          focused = setInterval(function () {
            $inputs.each(function () {
              var $this = $(this);
              if ($this.val() !== $this.attr("value")) {
                $this.trigger("change");
              }
            });
          }, 100);
        })
        .on("blur", ".form-group input", function () {
          clearInterval(focused);
        });
    },
    "init": function (options) {
      this.options = $.extend({}, this.options, options);
      var $document = $(document);

      if ($.fn.ripples && this.options.ripples) {
        this.ripples();
      }
      if (this.options.input) {
        this.input();
        this.attachInputEventHandlers();
      }
      if (this.options.checkbox) {
        this.checkbox();
      }
      if (this.options.togglebutton) {
        this.togglebutton();
      }
      if (this.options.radio) {
        this.radio();
      }
      if (this.options.autofill) {
        this.autofill();
        this.attachAutofillEventHandlers();
      }

      if (document.arrive && this.options.arrive) {
        if ($.fn.ripples && this.options.ripples) {
          $document.arrive(this.options.withRipples, function () {
            $.material.ripples($(this));
          });
        }
        if (this.options.input) {
          $document.arrive(this.options.inputElements, function () {
            $.material.input($(this));
          });
        }
        if (this.options.checkbox) {
          $document.arrive(this.options.checkboxElements, function () {
            $.material.checkbox($(this));
          });
        }
        if (this.options.radio) {
          $document.arrive(this.options.radioElements, function () {
            $.material.radio($(this));
          });
        }
        if (this.options.togglebutton) {
          $document.arrive(this.options.togglebuttonElements, function () {
            $.material.togglebutton($(this));
          });
        }

      }
    }
  };

})(jQuery);

!function(a,b,c,d){"use strict";function e(b,c){g=this,this.element=a(b),this.options=a.extend({},h,c),this._defaults=h,this._name=f,this.init()}var f="ripples",g=null,h={};e.prototype.init=function(){var c=this.element;c.on("mousedown touchstart",function(d){if(!g.isTouch()||"mousedown"!==d.type){c.find(".ripple-container").length||c.append('<div class="ripple-container"></div>');var e=c.children(".ripple-container"),f=g.getRelY(e,d),h=g.getRelX(e,d);if(f||h){var i=g.getRipplesColor(c),j=a("<div></div>");j.addClass("ripple").css({left:h,top:f,"background-color":i}),e.append(j),function(){return b.getComputedStyle(j[0]).opacity}(),g.rippleOn(c,j),setTimeout(function(){g.rippleEnd(j)},500),c.on("mouseup mouseleave touchend",function(){j.data("mousedown","off"),"off"===j.data("animating")&&g.rippleOut(j)})}}})},e.prototype.getNewSize=function(a,b){return Math.max(a.outerWidth(),a.outerHeight())/b.outerWidth()*2.5},e.prototype.getRelX=function(a,b){var c=a.offset();return g.isTouch()?(b=b.originalEvent,1===b.touches.length?b.touches[0].pageX-c.left:!1):b.pageX-c.left},e.prototype.getRelY=function(a,b){var c=a.offset();return g.isTouch()?(b=b.originalEvent,1===b.touches.length?b.touches[0].pageY-c.top:!1):b.pageY-c.top},e.prototype.getRipplesColor=function(a){var c=a.data("ripple-color")?a.data("ripple-color"):b.getComputedStyle(a[0]).color;return c},e.prototype.hasTransitionSupport=function(){var a=c.body||c.documentElement,b=a.style,e=b.transition!==d||b.WebkitTransition!==d||b.MozTransition!==d||b.MsTransition!==d||b.OTransition!==d;return e},e.prototype.isTouch=function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},e.prototype.rippleEnd=function(a){a.data("animating","off"),"off"===a.data("mousedown")&&g.rippleOut(a)},e.prototype.rippleOut=function(a){a.off(),g.hasTransitionSupport()?a.addClass("ripple-out"):a.animate({opacity:0},100,function(){a.trigger("transitionend")}),a.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){a.remove()})},e.prototype.rippleOn=function(a,b){var c=g.getNewSize(a,b);g.hasTransitionSupport()?b.css({"-ms-transform":"scale("+c+")","-moz-transform":"scale("+c+")","-webkit-transform":"scale("+c+")",transform:"scale("+c+")"}).addClass("ripple-on").data("animating","on").data("mousedown","on"):b.animate({width:2*Math.max(a.outerWidth(),a.outerHeight()),height:2*Math.max(a.outerWidth(),a.outerHeight()),"margin-left":-1*Math.max(a.outerWidth(),a.outerHeight()),"margin-top":-1*Math.max(a.outerWidth(),a.outerHeight()),opacity:.2},500,function(){b.trigger("transitionend")})},a.fn.ripples=function(b){return this.each(function(){a.data(this,"plugin_"+f)||a.data(this,"plugin_"+f,new e(this,b))})}}(jQuery,window,document);
//# sourceMappingURL=ripples.min.js.map
/* globals jQuery, window, document */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

  var methods = {
    options : {
      "optionClass": "",
      "dropdownClass": "",
      "autoinit": false,
      "callback": false,
      "onSelected": false,
      "dynamicOptLabel": "Add a new option..."
    },
    init: function(options) {

      // Apply user options if user has defined some
      if (options) {
        options = $.extend(methods.options, options);
      } else {
        options = methods.options;
      }

      function initElement($select) {
        // Don't do anything if this is not a select or if this select was already initialized
        if ($select.data("dropdownjs") || !$select.is("select")) {
          return;
        }

        // Is it a multi select?
        var multi = $select.attr("multiple");

        // Does it allow to create new options dynamically?
        var dynamicOptions = $select.attr("data-dynamic-opts"),
            $dynamicInput = $();

        // Create the dropdown wrapper
        var $dropdown = $("<div></div>");
        $dropdown.addClass("dropdownjs").addClass(options.dropdownStyle);
        $dropdown.data("select", $select);

        // Create the fake input used as "select" element and cache it as $input
        var $input = $("<input type=text readonly class=fakeinput>");
        if ($.material) { $input.data("mdproc", true); }
        // Append it to the dropdown wrapper
        $dropdown.append($input);

        // Create the UL that will be used as dropdown and cache it AS $ul
        var $ul = $("<ul></ul>");
        $ul.data("select", $select);

        // Append it to the dropdown
        $dropdown.append($ul);

        // Transfer the placeholder attribute
        $input.attr("placeholder", $select.attr("placeholder"));

        // Loop trough options and transfer them to the dropdown menu
        $select.find("option").each(function() {
          // Cache $(this)
          var $this = $(this);
          methods._addOption($ul, $this);

        });

        // If this select allows dynamic options add the widget
        if (dynamicOptions) {
          $dynamicInput = $("<li class=dropdownjs-add></li>");
          $dynamicInput.append("<input>");
          $dynamicInput.find("input").attr("placeholder", options.dynamicOptLabel);
          $ul.append($dynamicInput);
        }



        // Cache the dropdown options
        var selectOptions = $dropdown.find("li");

        // If is a single select, selected the first one or the last with selected attribute
        if (!multi) {
            var $selected;
            if ($select.find(":selected").length) {
                $selected = $select.find(":selected").last();
            }
            else {
                $selected = $select.find("option, li").first();
               // $selected = $select.find("option").first();
            }
            methods._select($dropdown, $selected);
        } else {
            var selectors = [], val = $select.val()
            for (var i in val) {
              selectors.push('li[value=' + val[i] + ']')
            }
            if (selectors.length > 0) {
              methods._select($dropdown, $dropdown.find(selectors.join(',')));
            }
        }

        // Transfer the classes of the select to the input dropdown
        $input.addClass($select[0].className);

        // Hide the old and ugly select
        $select.hide().attr("data-dropdownjs", true);

        // Bring to life our awesome dropdownjs
        $select.after($dropdown);

        // Call the callback
        if (options.callback) {
          options.callback($dropdown);
        }

        //---------------------------------------//
        // DROPDOWN EVENTS                       //
        //---------------------------------------//

        // On click, set the clicked one as selected
        $ul.on("click", "li:not(.dropdownjs-add)", function(e) {
          methods._select($dropdown, $(this));
          // trigger change event, if declared on the original selector
          $select.change();
        });
        $ul.on("keydown", "li:not(.dropdownjs-add)", function(e) {
          if (e.which === 27) {
            $(".dropdownjs > ul > li").attr("tabindex", -1);
            return $input.removeClass("focus").blur();
          }
          if (e.which === 32 && !$(e.target).is("input")) {
            methods._select($dropdown, $(this));
            return false;
          }
        });

        $ul.on("focus", "li:not(.dropdownjs-add)", function() {
          if ($select.is(":disabled")) {
            return;
          }
          $input.addClass("focus");
        });

        // Add new options when the widget is used
        if (dynamicOptions && dynamicOptions.length) {
          $dynamicInput.on("keydown", function(e) {
            if(e.which !== 13) return;
            var $option = $("<option>"),
                val = $dynamicInput.find("input").val();
            $dynamicInput.find("input").val("");

            $option.attr("value", val);
            $option.text(val);
            $select.append($option);

          });
        }

        // Listen for new added options and update dropdown if needed
        $select.on("DOMNodeInserted", function(e) {
          var $this = $(e.target);
          if (!$this.val().length) return;

          methods._addOption($ul, $this);
          $ul.find("li").not(".dropdownjs-add").attr("tabindex", 0);

        });

        // Used to make the dropdown menu more dropdown-ish
        $input.on("click focus", function(e) {
          e.stopPropagation();
          if ($select.is(":disabled")) {
            return;
          }
          $(".dropdownjs > ul > li").attr("tabindex", -1);
          $(".dropdownjs > input").not($(this)).removeClass("focus").blur();

          $(".dropdownjs > ul > li").not(".dropdownjs-add").attr("tabindex", 0);

          // Set height of the dropdown
          var coords = {
            top: $(this).offset().top - $(document).scrollTop(),
            left: $(this).offset().left - $(document).scrollLeft(),
            bottom: $(window).height() - ($(this).offset().top - $(document).scrollTop()),
            right: $(window).width() - ($(this).offset().left - $(document).scrollLeft())
          };

          var height = coords.bottom;

          // Decide if place the dropdown below or above the input
          if (height < 200 && coords.top > coords.bottom) {
            height = coords.top;
            $ul.attr("placement", "top-left");
          } else {
            $ul.attr("placement", "bottom-left");
          }

          $(this).next("ul").css("max-height", height - 20);
          $(this).addClass("focus");
        });
        // Close every dropdown on click outside
        $(document).on("click", function(e) {

          // Don't close the multi dropdown if user is clicking inside it
          if (multi && $(e.target).parents(".dropdownjs").length) return;

          // Don't close the dropdown if user is clicking inside the dynamic-opts widget
          if ($(e.target).parents(".dropdownjs-add").length || $(e.target).is(".dropdownjs-add")) return;

          // Close opened dropdowns
          $(".dropdownjs > ul > li").attr("tabindex", -1);
          $input.removeClass("focus");
        });
      }

      if (options.autoinit) {
        $(document).on("DOMNodeInserted", function(e) {
          var $this = $(e.target);
          if (!$this.is("select")) {
            $this = $this.find('select');
          }
          if ($this.is(options.autoinit)) {
            initElement($this);
          }
        });
      }

      // Loop trough elements
      $(this).each(function() {
        initElement($(this));
      });
    },
    select: function(target) {
      var $target = $(this).find("[value=\"" + target + "\"]");
      methods._select($(this), $target);
    },
    _select: function($dropdown, $target) {
      if ($target.is(".dropdownjs-add")) return;

      // Get dropdown's elements
      var $select = $dropdown.data("select"),
          $input  = $dropdown.find("input.fakeinput");
      // Is it a multi select?
      var multi = $select.attr("multiple");

      // Cache the dropdown options
      var selectOptions = $dropdown.find("li");

      // Behavior for multiple select
      if (multi) {
        // Toggle option state
        $target.toggleClass("selected");
        // Toggle selection of the clicked option in native select
        $target.each(function(){
          var $selected = $select.find("[value=\"" + $(this).attr("value") + "\"]");
          $selected.prop("selected", $(this).hasClass("selected"));
        })
        // Add or remove the value from the input
        var text = [];
        selectOptions.each(function() {
          if ($(this).hasClass("selected")) {
            text.push($(this).text());
          }
        });
        $input.val(text.join(", "));
      }

      // Behavior for single select
      if (!multi) {
        // Unselect options except the one that will be selected
        selectOptions.not($target).removeClass("selected");
        // Select the selected option
        $target.addClass("selected");
        // Set the value to the native select
        $select.val($target.attr("value"));
        // Set the value to the input
        $input.val($target.text().trim());
      }

      // This is used only if Material Design for Bootstrap is selected
      if ($.material) {
        if ($input.val().trim()) {
          $select.removeClass("empty");
        } else {
          $select.addClass("empty");
        }
      }
      
       // Call the callback
        if (this.options.onSelected) {
            this.options.onSelected($target.attr("value"));
        }

    },
    _addOption: function($ul, $this) {
      // Create the option
      var $option = $("<li></li>");

      // Style the option
      $option.addClass(this.options.optionStyle);

      // If the option has some text then transfer it
      if ($this.text()) {
        $option.text($this.text());
      }
      // Otherwise set the empty label and set it as an empty option
      else {
        $option.html("&nbsp;");
      }
      // Set the value of the option
      $option.attr("value", $this.val());

      // Will user be able to remove this option?
      if ($ul.data("select").attr("data-dynamic-opts")) {
        $option.append("<span class=close></span>");
        $option.find(".close").on("click", function() {
          $option.remove();
          $this.remove();
        });
      }

      // Ss it selected?
      if ($this.prop("selected")) {
        $option.attr("selected", true);
      }

      // Append option to our dropdown
      if ($ul.find(".dropdownjs-add").length) {
        $ul.find(".dropdownjs-add").before($option);
      } else {
        $ul.append($option);
      }
    }
  };

  $.fn.dropdown = function(params) {
    if (methods[params]) {
      return methods[params].apply(this, Array.prototype.slice.call(arguments,1));
    } else if (typeof params === "object" | !params) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + params + " does not exists on jQuery.dropdown");
    }
  };

}));

/*
 * @license
 * angular-socket-io v0.7.0
 * (c) 2014 Brian Ford http://briantford.com
 * License: MIT
 */

angular.module('btford.socket-io', []).
  provider('socketFactory', function () {

    'use strict';

    // when forwarding events, prefix the event name
    var defaultPrefix = 'socket:',
      ioSocket;

    // expose to provider
    this.$get = ['$rootScope', '$timeout', 'global',function ($rootScope, $timeout,global) {

      var asyncAngularify = function (socket, callback) {
        return callback ? function () {
          var args = arguments;
          $timeout(function () {
            callback.apply(socket, args);
          }, 0);
        } : angular.noop;
      };

      return function socketFactory (options) {
        //console.log(options)
        options = options || {};
        if(!options.host){
          options.host=socketHost
        }
        //console.log(options)
        var socket = options.ioSocket || io.connect(options.host);
        var prefix = options.prefix === undefined ? defaultPrefix : options.prefix ;
        var defaultScope = options.scope || $rootScope;

        var addListener = function (eventName, callback) {
          socket.on(eventName, callback.__ng = asyncAngularify(socket, callback));
        };

        var addOnceListener = function (eventName, callback) {
          socket.once(eventName, callback.__ng = asyncAngularify(socket, callback));
        };

        var wrappedSocket = {
          on: addListener,
          addListener: addListener,
          once: addOnceListener,

          emit: function (eventName, data, callback) {
            var lastIndex = arguments.length - 1;
            var callback = arguments[lastIndex];
            if(typeof callback == 'function') {
              callback = asyncAngularify(socket, callback);
              arguments[lastIndex] = callback;
            }
            return socket.emit.apply(socket, arguments);
          },

          removeListener: function (ev, fn) {
            if (fn && fn.__ng) {
              arguments[1] = fn.__ng;
            }
            return socket.removeListener.apply(socket, arguments);
          },

          removeAllListeners: function() {
            return socket.removeAllListeners.apply(socket, arguments);
          },

          disconnect: function (close) {
            return socket.disconnect(close);
          },

          connect: function() {
            return socket.connect();
          },

          // when socket.on('someEvent', fn (data) { ... }),
          // call scope.$broadcast('someEvent', data)
          forward: function (events, scope) {
            if (events instanceof Array === false) {
              events = [events];
            }
            if (!scope) {
              scope = defaultScope;
            }
            events.forEach(function (eventName) {
              var prefixedEvent = prefix + eventName;
              var forwardBroadcast = asyncAngularify(socket, function () {
                Array.prototype.unshift.call(arguments, prefixedEvent);
                scope.$broadcast.apply(scope, arguments);
              });
              scope.$on('$destroy', function () {
                socket.removeListener(eventName, forwardBroadcast);
              });
              socket.on(eventName, forwardBroadcast);
            });
          }
        };

        return wrappedSocket;
      };
    }];
  });

/**
 * @license AngularJS v1.3.20
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

/**
 * @ngdoc module
 * @name ngCookies
 * @description
 *
 * # ngCookies
 *
 * The `ngCookies` module provides a convenient wrapper for reading and writing browser cookies.
 *
 *
 * <div doc-module-components="ngCookies"></div>
 *
 * See {@link ngCookies.$cookies `$cookies`} and
 * {@link ngCookies.$cookieStore `$cookieStore`} for usage.
 */


angular.module('ngCookies', ['ng']).
  /**
   * @ngdoc service
   * @name $cookies
   *
   * @description
   * Provides read/write access to browser's cookies.
   *
   * Only a simple Object is exposed and by adding or removing properties to/from this object, new
   * cookies are created/deleted at the end of current $eval.
   * The object's properties can only be strings.
   *
   * Requires the {@link ngCookies `ngCookies`} module to be installed.
   *
   * @example
   *
   * ```js
   * angular.module('cookiesExample', ['ngCookies'])
   *   .controller('ExampleController', ['$cookies', function($cookies) {
   *     // Retrieving a cookie
   *     var favoriteCookie = $cookies.myFavorite;
   *     // Setting a cookie
   *     $cookies.myFavorite = 'oatmeal';
   *   }]);
   * ```
   */
   factory('$cookies', ['$rootScope', '$browser', function($rootScope, $browser) {
      var cookies = {},
          lastCookies = {},
          lastBrowserCookies,
          runEval = false,
          copy = angular.copy,
          isUndefined = angular.isUndefined;

      //creates a poller fn that copies all cookies from the $browser to service & inits the service
      $browser.addPollFn(function() {
        var currentCookies = $browser.cookies();
        if (lastBrowserCookies != currentCookies) { //relies on browser.cookies() impl
          lastBrowserCookies = currentCookies;
          copy(currentCookies, lastCookies);
          copy(currentCookies, cookies);
          if (runEval) $rootScope.$apply();
        }
      })();

      runEval = true;

      //at the end of each eval, push cookies
      //TODO: this should happen before the "delayed" watches fire, because if some cookies are not
      //      strings or browser refuses to store some cookies, we update the model in the push fn.
      $rootScope.$watch(push);

      return cookies;


      /**
       * Pushes all the cookies from the service to the browser and verifies if all cookies were
       * stored.
       */
      function push() {
        var name,
            value,
            browserCookies,
            updated;

        //delete any cookies deleted in $cookies
        for (name in lastCookies) {
          if (isUndefined(cookies[name])) {
            $browser.cookies(name, undefined);
            delete lastCookies[name];
          }
        }

        //update all cookies updated in $cookies
        for (name in cookies) {
          value = cookies[name];
          if (!angular.isString(value)) {
            value = '' + value;
            cookies[name] = value;
          }
          if (value !== lastCookies[name]) {
            $browser.cookies(name, value);
            lastCookies[name] = value;
            updated = true;
          }
        }

        //verify what was actually stored
        if (updated) {
          browserCookies = $browser.cookies();

          for (name in cookies) {
            if (cookies[name] !== browserCookies[name]) {
              //delete or reset all cookies that the browser dropped from $cookies
              if (isUndefined(browserCookies[name])) {
                delete cookies[name];
                delete lastCookies[name];
              } else {
                cookies[name] = lastCookies[name] = browserCookies[name];
              }
            }
          }
        }
      }
    }]).


  /**
   * @ngdoc service
   * @name $cookieStore
   * @requires $cookies
   *
   * @description
   * Provides a key-value (string-object) storage, that is backed by session cookies.
   * Objects put or retrieved from this storage are automatically serialized or
   * deserialized by angular's toJson/fromJson.
   *
   * Requires the {@link ngCookies `ngCookies`} module to be installed.
   *
   * @example
   *
   * ```js
   * angular.module('cookieStoreExample', ['ngCookies'])
   *   .controller('ExampleController', ['$cookieStore', function($cookieStore) {
   *     // Put cookie
   *     $cookieStore.put('myFavorite','oatmeal');
   *     // Get cookie
   *     var favoriteCookie = $cookieStore.get('myFavorite');
   *     // Removing a cookie
   *     $cookieStore.remove('myFavorite');
   *   }]);
   * ```
   */
   factory('$cookieStore', ['$cookies', function($cookies) {

      return {
        /**
         * @ngdoc method
         * @name $cookieStore#get
         *
         * @description
         * Returns the value of given cookie key
         *
         * @param {string} key Id to use for lookup.
         * @returns {Object} Deserialized cookie value.
         */
        get: function(key) {
          var value = $cookies[key];
          return value ? angular.fromJson(value) : value;
        },

        /**
         * @ngdoc method
         * @name $cookieStore#put
         *
         * @description
         * Sets a value for given cookie key
         *
         * @param {string} key Id for the `value`.
         * @param {Object} value Value to be stored.
         */
        put: function(key, value) {
          $cookies[key] = angular.toJson(value);
        },

        /**
         * @ngdoc method
         * @name $cookieStore#remove
         *
         * @description
         * Remove given cookie
         *
         * @param {string} key Id of the key-value pair to delete.
         */
        remove: function(key) {
          delete $cookies[key];
        }
      };

    }]);


})(window, window.angular);

/**
 * @license AngularJS v1.2.29
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

/**
 * @ngdoc module
 * @name ngTouch
 * @description
 *
 * # ngTouch
 *
 * The `ngTouch` module provides touch events and other helpers for touch-enabled devices.
 * The implementation is based on jQuery Mobile touch event handling
 * ([jquerymobile.com](http://jquerymobile.com/)).
 *
 *
 * See {@link ngTouch.$swipe `$swipe`} for usage.
 *
 * <div doc-module-components="ngTouch"></div>
 *
 */

// define ngTouch module
/* global -ngTouch */
var ngTouch = angular.module('ngTouch', []);

/* global ngTouch: false */

    /**
     * @ngdoc service
     * @name $swipe
     *
     * @description
     * The `$swipe` service is a service that abstracts the messier details of hold-and-drag swipe
     * behavior, to make implementing swipe-related directives more convenient.
     *
     * Requires the {@link ngTouch `ngTouch`} module to be installed.
     *
     * `$swipe` is used by the `ngSwipeLeft` and `ngSwipeRight` directives in `ngTouch`, and by
     * `ngCarousel` in a separate component.
     *
     * # Usage
     * The `$swipe` service is an object with a single method: `bind`. `bind` takes an element
     * which is to be watched for swipes, and an object with four handler functions. See the
     * documentation for `bind` below.
     */

ngTouch.factory('$swipe', [function() {
  // The total distance in any direction before we make the call on swipe vs. scroll.
  var MOVE_BUFFER_RADIUS = 10;

  function getCoordinates(event) {
    var touches = event.touches && event.touches.length ? event.touches : [event];
    var e = (event.changedTouches && event.changedTouches[0]) ||
        (event.originalEvent && event.originalEvent.changedTouches &&
            event.originalEvent.changedTouches[0]) ||
        touches[0].originalEvent || touches[0];

    return {
      x: e.clientX,
      y: e.clientY
    };
  }

  return {
    /**
     * @ngdoc method
     * @name $swipe#bind
     *
     * @description
     * The main method of `$swipe`. It takes an element to be watched for swipe motions, and an
     * object containing event handlers.
     *
     * The four events are `start`, `move`, `end`, and `cancel`. `start`, `move`, and `end`
     * receive as a parameter a coordinates object of the form `{ x: 150, y: 310 }`.
     *
     * `start` is called on either `mousedown` or `touchstart`. After this event, `$swipe` is
     * watching for `touchmove` or `mousemove` events. These events are ignored until the total
     * distance moved in either dimension exceeds a small threshold.
     *
     * Once this threshold is exceeded, either the horizontal or vertical delta is greater.
     * - If the horizontal distance is greater, this is a swipe and `move` and `end` events follow.
     * - If the vertical distance is greater, this is a scroll, and we let the browser take over.
     *   A `cancel` event is sent.
     *
     * `move` is called on `mousemove` and `touchmove` after the above logic has determined that
     * a swipe is in progress.
     *
     * `end` is called when a swipe is successfully completed with a `touchend` or `mouseup`.
     *
     * `cancel` is called either on a `touchcancel` from the browser, or when we begin scrolling
     * as described above.
     *
     */
    bind: function(element, eventHandlers) {
      // Absolute total movement, used to control swipe vs. scroll.
      var totalX, totalY;
      // Coordinates of the start position.
      var startCoords;
      // Last event's position.
      var lastPos;
      // Whether a swipe is active.
      var active = false;

      element.on('touchstart mousedown', function(event) {
        startCoords = getCoordinates(event);
        active = true;
        totalX = 0;
        totalY = 0;
        lastPos = startCoords;
        eventHandlers['start'] && eventHandlers['start'](startCoords, event);
      });

      element.on('touchcancel', function(event) {
        active = false;
        eventHandlers['cancel'] && eventHandlers['cancel'](event);
      });

      element.on('touchmove mousemove', function(event) {
        if (!active) return;

        // Android will send a touchcancel if it thinks we're starting to scroll.
        // So when the total distance (+ or - or both) exceeds 10px in either direction,
        // we either:
        // - On totalX > totalY, we send preventDefault() and treat this as a swipe.
        // - On totalY > totalX, we let the browser handle it as a scroll.

        if (!startCoords) return;
        var coords = getCoordinates(event);

        totalX += Math.abs(coords.x - lastPos.x);
        totalY += Math.abs(coords.y - lastPos.y);

        lastPos = coords;

        if (totalX < MOVE_BUFFER_RADIUS && totalY < MOVE_BUFFER_RADIUS) {
          return;
        }

        // One of totalX or totalY has exceeded the buffer, so decide on swipe vs. scroll.
        if (totalY > totalX) {
          // Allow native scrolling to take over.
          active = false;
          eventHandlers['cancel'] && eventHandlers['cancel'](event);
          return;
        } else {
          // Prevent the browser from scrolling.
          event.preventDefault();
          eventHandlers['move'] && eventHandlers['move'](coords, event);
        }
      });

      element.on('touchend mouseup', function(event) {
        if (!active) return;
        active = false;
        eventHandlers['end'] && eventHandlers['end'](getCoordinates(event), event);
      });
    }
  };
}]);

/* global ngTouch: false */

/**
 * @ngdoc directive
 * @name ngClick
 *
 * @description
 * A more powerful replacement for the default ngClick designed to be used on touchscreen
 * devices. Most mobile browsers wait about 300ms after a tap-and-release before sending
 * the click event. This version handles them immediately, and then prevents the
 * following click event from propagating.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * This directive can fall back to using an ordinary click event, and so works on desktop
 * browsers as well as mobile.
 *
 * This directive also sets the CSS class `ng-click-active` while the element is being held
 * down (by a mouse click or touch) so you can restyle the depressed element if you wish.
 *
 * @element ANY
 * @param {expression} ngClick {@link guide/expression Expression} to evaluate
 * upon tap. (Event object is available as `$event`)
 *
 * @example
    <example module="ngClickExample" deps="angular-touch.js">
      <file name="index.html">
        <button ng-click="count = count + 1" ng-init="count=0">
          Increment
        </button>
        count: {{ count }}
      </file>
      <file name="script.js">
        angular.module('ngClickExample', ['ngTouch']);
      </file>
    </example>
 */

ngTouch.config(['$provide', function($provide) {
  $provide.decorator('ngClickDirective', ['$delegate', function($delegate) {
    // drop the default ngClick directive
    $delegate.shift();
    return $delegate;
  }]);
}]);

ngTouch.directive('ngClick', ['$parse', '$timeout', '$rootElement',
    function($parse, $timeout, $rootElement) {
  var TAP_DURATION = 750; // Shorter than 750ms is a tap, longer is a taphold or drag.
  var MOVE_TOLERANCE = 12; // 12px seems to work in most mobile browsers.
  var PREVENT_DURATION = 2500; // 2.5 seconds maximum from preventGhostClick call to click
  var CLICKBUSTER_THRESHOLD = 25; // 25 pixels in any dimension is the limit for busting clicks.

  var ACTIVE_CLASS_NAME = 'ng-click-active';
  var lastPreventedTime;
  var touchCoordinates;
  var lastLabelClickCoordinates;


  // TAP EVENTS AND GHOST CLICKS
  //
  // Why tap events?
  // Mobile browsers detect a tap, then wait a moment (usually ~300ms) to see if you're
  // double-tapping, and then fire a click event.
  //
  // This delay sucks and makes mobile apps feel unresponsive.
  // So we detect touchstart, touchmove, touchcancel and touchend ourselves and determine when
  // the user has tapped on something.
  //
  // What happens when the browser then generates a click event?
  // The browser, of course, also detects the tap and fires a click after a delay. This results in
  // tapping/clicking twice. We do "clickbusting" to prevent it.
  //
  // How does it work?
  // We attach global touchstart and click handlers, that run during the capture (early) phase.
  // So the sequence for a tap is:
  // - global touchstart: Sets an "allowable region" at the point touched.
  // - element's touchstart: Starts a touch
  // (- touchmove or touchcancel ends the touch, no click follows)
  // - element's touchend: Determines if the tap is valid (didn't move too far away, didn't hold
  //   too long) and fires the user's tap handler. The touchend also calls preventGhostClick().
  // - preventGhostClick() removes the allowable region the global touchstart created.
  // - The browser generates a click event.
  // - The global click handler catches the click, and checks whether it was in an allowable region.
  //     - If preventGhostClick was called, the region will have been removed, the click is busted.
  //     - If the region is still there, the click proceeds normally. Therefore clicks on links and
  //       other elements without ngTap on them work normally.
  //
  // This is an ugly, terrible hack!
  // Yeah, tell me about it. The alternatives are using the slow click events, or making our users
  // deal with the ghost clicks, so I consider this the least of evils. Fortunately Angular
  // encapsulates this ugly logic away from the user.
  //
  // Why not just put click handlers on the element?
  // We do that too, just to be sure. If the tap event caused the DOM to change,
  // it is possible another element is now in that position. To take account for these possibly
  // distinct elements, the handlers are global and care only about coordinates.

  // Checks if the coordinates are close enough to be within the region.
  function hit(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) < CLICKBUSTER_THRESHOLD && Math.abs(y1 - y2) < CLICKBUSTER_THRESHOLD;
  }

  // Checks a list of allowable regions against a click location.
  // Returns true if the click should be allowed.
  // Splices out the allowable region from the list after it has been used.
  function checkAllowableRegions(touchCoordinates, x, y) {
    for (var i = 0; i < touchCoordinates.length; i += 2) {
      if (hit(touchCoordinates[i], touchCoordinates[i+1], x, y)) {
        touchCoordinates.splice(i, i + 2);
        return true; // allowable region
      }
    }
    return false; // No allowable region; bust it.
  }

  // Global click handler that prevents the click if it's in a bustable zone and preventGhostClick
  // was called recently.
  function onClick(event) {
    if (Date.now() - lastPreventedTime > PREVENT_DURATION) {
      return; // Too old.
    }

    var touches = event.touches && event.touches.length ? event.touches : [event];
    var x = touches[0].clientX;
    var y = touches[0].clientY;
    // Work around desktop Webkit quirk where clicking a label will fire two clicks (on the label
    // and on the input element). Depending on the exact browser, this second click we don't want
    // to bust has either (0,0), negative coordinates, or coordinates equal to triggering label
    // click event
    if (x < 1 && y < 1) {
      return; // offscreen
    }
    if (lastLabelClickCoordinates &&
        lastLabelClickCoordinates[0] === x && lastLabelClickCoordinates[1] === y) {
      return; // input click triggered by label click
    }
    // reset label click coordinates on first subsequent click
    if (lastLabelClickCoordinates) {
      lastLabelClickCoordinates = null;
    }
    // remember label click coordinates to prevent click busting of trigger click event on input
    if (event.target.tagName.toLowerCase() === 'label') {
      lastLabelClickCoordinates = [x, y];
    }

    // Look for an allowable region containing this click.
    // If we find one, that means it was created by touchstart and not removed by
    // preventGhostClick, so we don't bust it.
    if (checkAllowableRegions(touchCoordinates, x, y)) {
      return;
    }

    // If we didn't find an allowable region, bust the click.
    event.stopPropagation();
    event.preventDefault();

    // Blur focused form elements
    event.target && event.target.blur();
  }


  // Global touchstart handler that creates an allowable region for a click event.
  // This allowable region can be removed by preventGhostClick if we want to bust it.
  function onTouchStart(event) {
    var touches = event.touches && event.touches.length ? event.touches : [event];
    var x = touches[0].clientX;
    var y = touches[0].clientY;
    touchCoordinates.push(x, y);

    $timeout(function() {
      // Remove the allowable region.
      for (var i = 0; i < touchCoordinates.length; i += 2) {
        if (touchCoordinates[i] == x && touchCoordinates[i+1] == y) {
          touchCoordinates.splice(i, i + 2);
          return;
        }
      }
    }, PREVENT_DURATION, false);
  }

  // On the first call, attaches some event handlers. Then whenever it gets called, it creates a
  // zone around the touchstart where clicks will get busted.
  function preventGhostClick(x, y) {
    if (!touchCoordinates) {
      $rootElement[0].addEventListener('click', onClick, true);
      $rootElement[0].addEventListener('touchstart', onTouchStart, true);
      touchCoordinates = [];
    }

    lastPreventedTime = Date.now();

    checkAllowableRegions(touchCoordinates, x, y);
  }

  // Actual linking function.
  return function(scope, element, attr) {
    var clickHandler = $parse(attr.ngClick),
        tapping = false,
        tapElement,  // Used to blur the element after a tap.
        startTime,   // Used to check if the tap was held too long.
        touchStartX,
        touchStartY;

    function resetState() {
      tapping = false;
      element.removeClass(ACTIVE_CLASS_NAME);
    }

    element.on('touchstart', function(event) {
      tapping = true;
      tapElement = event.target ? event.target : event.srcElement; // IE uses srcElement.
      // Hack for Safari, which can target text nodes instead of containers.
      if(tapElement.nodeType == 3) {
        tapElement = tapElement.parentNode;
      }

      element.addClass(ACTIVE_CLASS_NAME);

      startTime = Date.now();

      var touches = event.touches && event.touches.length ? event.touches : [event];
      var e = touches[0].originalEvent || touches[0];
      touchStartX = e.clientX;
      touchStartY = e.clientY;
    });

    element.on('touchmove', function(event) {
      resetState();
    });

    element.on('touchcancel', function(event) {
      resetState();
    });

    element.on('touchend', function(event) {
      var diff = Date.now() - startTime;

      var touches = (event.changedTouches && event.changedTouches.length) ? event.changedTouches :
          ((event.touches && event.touches.length) ? event.touches : [event]);
      var e = touches[0].originalEvent || touches[0];
      var x = e.clientX;
      var y = e.clientY;
      var dist = Math.sqrt( Math.pow(x - touchStartX, 2) + Math.pow(y - touchStartY, 2) );

      if (tapping && diff < TAP_DURATION && dist < MOVE_TOLERANCE) {
        // Call preventGhostClick so the clickbuster will catch the corresponding click.
        preventGhostClick(x, y);

        // Blur the focused element (the button, probably) before firing the callback.
        // This doesn't work perfectly on Android Chrome, but seems to work elsewhere.
        // I couldn't get anything to work reliably on Android Chrome.
        if (tapElement) {
          tapElement.blur();
        }

        if (!angular.isDefined(attr.disabled) || attr.disabled === false) {
          element.triggerHandler('click', [event]);
        }
      }

      resetState();
    });

    // Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
    // something else nearby.
    element.onclick = function(event) { };

    // Actual click handler.
    // There are three different kinds of clicks, only two of which reach this point.
    // - On desktop browsers without touch events, their clicks will always come here.
    // - On mobile browsers, the simulated "fast" click will call this.
    // - But the browser's follow-up slow click will be "busted" before it reaches this handler.
    // Therefore it's safe to use this directive on both mobile and desktop.
    element.on('click', function(event, touchend) {
      scope.$apply(function() {
        clickHandler(scope, {$event: (touchend || event)});
      });
    });

    element.on('mousedown', function(event) {
      element.addClass(ACTIVE_CLASS_NAME);
    });

    element.on('mousemove mouseup', function(event) {
      element.removeClass(ACTIVE_CLASS_NAME);
    });

  };
}]);

/* global ngTouch: false */

/**
 * @ngdoc directive
 * @name ngSwipeLeft
 *
 * @description
 * Specify custom behavior when an element is swiped to the left on a touchscreen device.
 * A leftward swipe is a quick, right-to-left slide of the finger.
 * Though ngSwipeLeft is designed for touch-based devices, it will work with a mouse click and drag
 * too.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * @element ANY
 * @param {expression} ngSwipeLeft {@link guide/expression Expression} to evaluate
 * upon left swipe. (Event object is available as `$event`)
 *
 * @example
    <example module="ngSwipeLeftExample" deps="angular-touch.js">
      <file name="index.html">
        <div ng-show="!showActions" ng-swipe-left="showActions = true">
          Some list content, like an email in the inbox
        </div>
        <div ng-show="showActions" ng-swipe-right="showActions = false">
          <button ng-click="reply()">Reply</button>
          <button ng-click="delete()">Delete</button>
        </div>
      </file>
      <file name="script.js">
        angular.module('ngSwipeLeftExample', ['ngTouch']);
      </file>
    </example>
 */

/**
 * @ngdoc directive
 * @name ngSwipeRight
 *
 * @description
 * Specify custom behavior when an element is swiped to the right on a touchscreen device.
 * A rightward swipe is a quick, left-to-right slide of the finger.
 * Though ngSwipeRight is designed for touch-based devices, it will work with a mouse click and drag
 * too.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * @element ANY
 * @param {expression} ngSwipeRight {@link guide/expression Expression} to evaluate
 * upon right swipe. (Event object is available as `$event`)
 *
 * @example
    <example module="ngSwipeRightExample" deps="angular-touch.js">
      <file name="index.html">
        <div ng-show="!showActions" ng-swipe-left="showActions = true">
          Some list content, like an email in the inbox
        </div>
        <div ng-show="showActions" ng-swipe-right="showActions = false">
          <button ng-click="reply()">Reply</button>
          <button ng-click="delete()">Delete</button>
        </div>
      </file>
      <file name="script.js">
        angular.module('ngSwipeRightExample', ['ngTouch']);
      </file>
    </example>
 */

function makeSwipeDirective(directiveName, direction, eventName) {
  ngTouch.directive(directiveName, ['$parse', '$swipe', function($parse, $swipe) {
    // The maximum vertical delta for a swipe should be less than 75px.
    var MAX_VERTICAL_DISTANCE = 75;
    // Vertical distance should not be more than a fraction of the horizontal distance.
    var MAX_VERTICAL_RATIO = 0.3;
    // At least a 30px lateral motion is necessary for a swipe.
    var MIN_HORIZONTAL_DISTANCE = 30;

    return function(scope, element, attr) {
      var swipeHandler = $parse(attr[directiveName]);

      var startCoords, valid;

      function validSwipe(coords) {
        // Check that it's within the coordinates.
        // Absolute vertical distance must be within tolerances.
        // Horizontal distance, we take the current X - the starting X.
        // This is negative for leftward swipes and positive for rightward swipes.
        // After multiplying by the direction (-1 for left, +1 for right), legal swipes
        // (ie. same direction as the directive wants) will have a positive delta and
        // illegal ones a negative delta.
        // Therefore this delta must be positive, and larger than the minimum.
        if (!startCoords) return false;
        var deltaY = Math.abs(coords.y - startCoords.y);
        var deltaX = (coords.x - startCoords.x) * direction;
        return valid && // Short circuit for already-invalidated swipes.
            deltaY < MAX_VERTICAL_DISTANCE &&
            deltaX > 0 &&
            deltaX > MIN_HORIZONTAL_DISTANCE &&
            deltaY / deltaX < MAX_VERTICAL_RATIO;
      }

      $swipe.bind(element, {
        'start': function(coords, event) {
          startCoords = coords;
          valid = true;
        },
        'cancel': function(event) {
          valid = false;
        },
        'end': function(coords, event) {
          if (validSwipe(coords)) {
            scope.$apply(function() {
              element.triggerHandler(eventName);
              swipeHandler(scope, {$event: event});
            });
          }
        }
      });
    };
  }]);
}

// Left is negative X-coordinate, right is positive.
makeSwipeDirective('ngSwipeLeft', -1, 'swipeleft');
makeSwipeDirective('ngSwipeRight', 1, 'swiperight');



})(window, window.angular);

/*!
 * angular-ui-mask
 * https://github.com/angular-ui/ui-mask
 * Version: 1.8.7 - 2016-07-26T15:59:07.992Z
 * License: MIT
 */
!function(){"use strict";angular.module("ui.mask",[]).value("uiMaskConfig",{maskDefinitions:{9:/\d/,A:/[a-zA-Z]/,"*":/[a-zA-Z0-9]/},clearOnBlur:!0,clearOnBlurPlaceholder:!1,escChar:"\\",eventsToHandle:["input","keyup","click","focus"],addDefaultPlaceholder:!0,allowInvalidValue:!1}).provider("uiMask.Config",function(){var e={};this.maskDefinitions=function(n){return e.maskDefinitions=n},this.clearOnBlur=function(n){return e.clearOnBlur=n},this.clearOnBlurPlaceholder=function(n){return e.clearOnBlurPlaceholder=n},this.eventsToHandle=function(n){return e.eventsToHandle=n},this.addDefaultPlaceholder=function(n){return e.addDefaultPlaceholder=n},this.allowInvalidValue=function(n){return e.allowInvalidValue=n},this.$get=["uiMaskConfig",function(n){var t=n;for(var a in e)angular.isObject(e[a])&&!angular.isArray(e[a])?angular.extend(t[a],e[a]):t[a]=e[a];return t}]}).directive("uiMask",["uiMask.Config",function(e){function n(e){return e===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(e.type||e.href||~e.tabIndex)}return{priority:100,require:"ngModel",restrict:"A",compile:function(){var t=angular.copy(e);return function(e,a,i,r){function l(e){return angular.isDefined(e)?(w(e),K?(h(),d(),!0):f()):f()}function u(e){e&&(T=e,!K||0===a.val().length&&angular.isDefined(i.placeholder)||a.val(m(p(a.val()))))}function o(){return l(i.uiMask)}function c(e){return K?(j=p(e||""),R=g(j),r.$setValidity("mask",R),j.length&&(R||Q.allowInvalidValue)?m(j):void 0):e}function s(e){return K?(j=p(e||""),R=g(j),r.$viewValue=j.length?m(j):"",r.$setValidity("mask",R),R||Q.allowInvalidValue?J?r.$viewValue:j:void 0):e}function f(){return K=!1,v(),angular.isDefined(q)?a.attr("placeholder",q):a.removeAttr("placeholder"),angular.isDefined(W)?a.attr("maxlength",W):a.removeAttr("maxlength"),a.val(r.$modelValue),r.$viewValue=r.$modelValue,!1}function h(){j=F=p(r.$modelValue||""),H=_=m(j),R=g(j),i.maxlength&&a.attr("maxlength",2*S[S.length-1]),!q&&Q.addDefaultPlaceholder&&a.attr("placeholder",T);for(var e=r.$modelValue,n=r.$formatters.length;n--;)e=r.$formatters[n](e);r.$viewValue=e||"",r.$render()}function d(){Z||(a.bind("blur",y),a.bind("mousedown mouseup",V),a.bind("keydown",M),a.bind(Q.eventsToHandle.join(" "),O),Z=!0)}function v(){Z&&(a.unbind("blur",y),a.unbind("mousedown",V),a.unbind("mouseup",V),a.unbind("keydown",M),a.unbind("input",O),a.unbind("keyup",O),a.unbind("click",O),a.unbind("focus",O),Z=!1)}function g(e){return e.length?e.length>=I:!0}function p(e){var n,t,i="",r=a[0],l=A.slice(),u=L,o=u+C(r),c="";return e=e.toString(),n=0,t=e.length-T.length,angular.forEach(B,function(a){var i=a.position;i>=u&&o>i||(i>=u&&(i+=t),e.substring(i,i+a.value.length)===a.value&&(c+=e.slice(n,i),n=i+a.value.length))}),e=c+e.slice(n),angular.forEach(e.split(""),function(e){l.length&&l[0].test(e)&&(i+=e,l.shift())}),i}function m(e){var n="",t=S.slice();return angular.forEach(T.split(""),function(a,i){e.length&&i===t[0]?(n+=e.charAt(0)||"_",e=e.substr(1),t.shift()):n+=a}),n}function b(e){var n,t=angular.isDefined(i.uiMaskPlaceholder)?i.uiMaskPlaceholder:i.placeholder;return angular.isDefined(t)&&t[e]?t[e]:(n=angular.isDefined(i.uiMaskPlaceholderChar)&&i.uiMaskPlaceholderChar?i.uiMaskPlaceholderChar:"_","space"===n.toLowerCase()?" ":n[0])}function k(){var e,n,t=T.split("");S&&!isNaN(S[0])&&angular.forEach(S,function(e){t[e]="_"}),e=t.join(""),n=e.replace(/[_]+/g,"_").split("_"),n=n.filter(function(e){return""!==e});var a=0;return n.map(function(n){var t=e.indexOf(n,a);return a=t+1,{value:n,position:t}})}function w(e){var n=0;if(S=[],A=[],T="",angular.isString(e)){I=0;var t=!1,a=0,i=e.split(""),r=!1;angular.forEach(i,function(e,i){r?(r=!1,T+=e,n++):Q.escChar===e?r=!0:Q.maskDefinitions[e]?(S.push(n),T+=b(i-a),A.push(Q.maskDefinitions[e]),n++,t||I++,t=!1):"?"===e?(t=!0,a++):(T+=e,n++)})}S.push(S.slice().pop()+1),B=k(),K=S.length>1?!0:!1}function y(){if((Q.clearOnBlur||Q.clearOnBlurPlaceholder&&0===j.length&&i.placeholder)&&(L=0,N=0,R&&0!==j.length||(H="",a.val(""),e.$apply(function(){r.$pristine||r.$setViewValue("")}))),j!==U){var n=a.val(),t=""===j&&n&&angular.isDefined(i.uiMaskPlaceholderChar)&&"space"===i.uiMaskPlaceholderChar;t&&a.val(""),$(a[0]),t&&a.val(n)}U=j}function $(e){var n;if(angular.isFunction(window.Event)&&!e.fireEvent)try{n=new Event("change",{view:window,bubbles:!0,cancelable:!1})}catch(t){n=document.createEvent("HTMLEvents"),n.initEvent("change",!1,!0)}finally{e.dispatchEvent(n)}else"createEvent"in document?(n=document.createEvent("HTMLEvents"),n.initEvent("change",!1,!0),e.dispatchEvent(n)):e.fireEvent&&e.fireEvent("onchange")}function V(e){"mousedown"===e.type?a.bind("mouseout",E):a.unbind("mouseout",E)}function E(){N=C(this),a.unbind("mouseout",E)}function M(e){var n=8===e.which,t=P(this)-1||0,i=90===e.which&&e.ctrlKey;if(n){for(;t>=0;){if(D(t)){x(this,t+1);break}t--}z=-1===t}i&&(a.val(""),e.preventDefault())}function O(n){n=n||{};var t=n.which,i=n.type;if(16!==t&&91!==t){var l,u=a.val(),o=_,c=!1,s=p(u),f=F,h=P(this)||0,d=L||0,v=h-d,g=S[0],b=S[s.length]||S.slice().shift(),k=N||0,w=C(this)>0,y=k>0,$=u.length>o.length||k&&u.length>o.length-k,V=u.length<o.length||k&&u.length===o.length-k,E=t>=37&&40>=t&&n.shiftKey,M=37===t,O=8===t||"keyup"!==i&&V&&-1===v,A=46===t||"keyup"!==i&&V&&0===v&&!y,B=(M||O||"click"===i)&&h>g;if(N=C(this),!E&&(!w||"click"!==i&&"keyup"!==i&&"focus"!==i)){if(O&&z)return a.val(T),e.$apply(function(){r.$setViewValue("")}),void x(this,d);if("input"===i&&V&&!y&&s===f){for(;O&&h>g&&!D(h);)h--;for(;A&&b>h&&-1===S.indexOf(h);)h++;var I=S.indexOf(h);s=s.substring(0,I)+s.substring(I+1),s!==f&&(c=!0)}for(l=m(s),_=l,F=s,!c&&u.length>l.length&&(c=!0),a.val(l),c&&e.$apply(function(){r.$setViewValue(l)}),$&&g>=h&&(h=g+1),B&&h--,h=h>b?b:g>h?g:h;!D(h)&&h>g&&b>h;)h+=B?-1:1;(B&&b>h||$&&!D(d))&&h++,L=h,x(this,h)}}}function D(e){return S.indexOf(e)>-1}function P(e){if(!e)return 0;if(void 0!==e.selectionStart)return e.selectionStart;if(document.selection&&n(a[0])){e.focus();var t=document.selection.createRange();return t.moveStart("character",e.value?-e.value.length:0),t.text.length}return 0}function x(e,t){if(!e)return 0;if(0!==e.offsetWidth&&0!==e.offsetHeight)if(e.setSelectionRange)n(a[0])&&(e.focus(),e.setSelectionRange(t,t));else if(e.createTextRange){var i=e.createTextRange();i.collapse(!0),i.moveEnd("character",t),i.moveStart("character",t),i.select()}}function C(e){return e?void 0!==e.selectionStart?e.selectionEnd-e.selectionStart:window.getSelection?window.getSelection().toString().length:document.selection?document.selection.createRange().text.length:0:0}var S,A,T,B,I,j,H,R,_,F,L,N,z,K=!1,Z=!1,q=i.placeholder,W=i.maxlength,G=r.$isEmpty;r.$isEmpty=function(e){return G(K?p(e||""):e)};var J=!1;i.$observe("modelViewValue",function(e){"true"===e&&(J=!0)}),i.$observe("allowInvalidValue",function(e){Q.allowInvalidValue=""===e?!0:!!e,c(r.$modelValue)});var Q={};i.uiOptions?(Q=e.$eval("["+i.uiOptions+"]"),Q=angular.isObject(Q[0])?function(e,n){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(void 0===n[t]?n[t]=angular.copy(e[t]):angular.isObject(n[t])&&!angular.isArray(n[t])&&(n[t]=angular.extend({},e[t],n[t])));return n}(t,Q[0]):t):Q=t,i.$observe("uiMask",l),angular.isDefined(i.uiMaskPlaceholder)?i.$observe("uiMaskPlaceholder",u):i.$observe("placeholder",u),angular.isDefined(i.uiMaskPlaceholderChar)&&i.$observe("uiMaskPlaceholderChar",o),r.$formatters.unshift(c),r.$parsers.unshift(s);var U=a.val();a.bind("mousedown mouseup",V),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(null===this)throw new TypeError;var n=Object(this),t=n.length>>>0;if(0===t)return-1;var a=0;if(arguments.length>1&&(a=Number(arguments[1]),a!==a?a=0:0!==a&&a!==1/0&&a!==-(1/0)&&(a=(a>0||-1)*Math.floor(Math.abs(a)))),a>=t)return-1;for(var i=a>=0?a:Math.max(t-Math.abs(a),0);t>i;i++)if(i in n&&n[i]===e)return i;return-1})}}}}])}();
/*
 * AngularJS Toaster
 * Version: 0.4.16
 *
 * Copyright 2013-2015 Jiri Kavulak.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Jiri Kavulak
 * Related to project of John Papa, Hans Fjällemark and Nguyễn Thiện Hùng (thienhung1989)
 */
!function(){"use strict";angular.module("toaster",[]).constant("toasterConfig",{limit:0,"tap-to-dismiss":!0,"close-button":!1,"newest-on-top":!0,"time-out":5e3,"icon-classes":{error:"toast-error",info:"toast-info",wait:"toast-wait",success:"toast-success",warning:"toast-warning"},"body-output-type":"","body-template":"toasterBodyTmpl.html","icon-class":"toast-info","position-class":"toast-top-right","title-class":"toast-title","message-class":"toast-message","prevent-duplicates":!1,"mouseover-timer-stop":!0}).service("toaster",["$rootScope","toasterConfig",function(t,e){function o(t){return function(e,o,s,i,a,n,r,c,l,u){angular.isString(e)?this.pop(t,e,o,s,i,a,n,r,c,l,u):this.pop(angular.extend(e,{type:t}))}}this.pop=function(e,o,s,i,a,n,r,c,l,u,d){if(angular.isObject(e)){var p=e;this.toast={type:p.type,title:p.title,body:p.body,timeout:p.timeout,bodyOutputType:p.bodyOutputType,clickHandler:p.clickHandler,showCloseButton:p.showCloseButton,uid:p.toastId,onHideCallback:p.onHideCallback,directiveData:p.directiveData},l=p.toastId,r=p.toasterId}else this.toast={type:e,title:o,body:s,timeout:i,bodyOutputType:a,clickHandler:n,showCloseButton:c,uid:l,onHideCallback:u,directiveData:d};t.$emit("toaster-newToast",r,l)},this.clear=function(e,o){t.$emit("toaster-clearToasts",e,o)};for(var s in e["icon-classes"])this[s]=o(s)}]).factory("toasterEventRegistry",["$rootScope",function(t){var e,o=null,s=null,i=[],a=[];return e={setup:function(){o||(o=t.$on("toaster-newToast",function(t,e,o){for(var s=0,a=i.length;a>s;s++)i[s](t,e,o)})),s||(s=t.$on("toaster-clearToasts",function(t,e,o){for(var s=0,i=a.length;i>s;s++)a[s](t,e,o)}))},subscribeToNewToastEvent:function(t){i.push(t)},subscribeToClearToastsEvent:function(t){a.push(t)},unsubscribeToNewToastEvent:function(t){var e=i.indexOf(t);e>=0&&i.splice(e,1),0===i.length&&(o(),o=null)},unsubscribeToClearToastsEvent:function(t){var e=a.indexOf(t);e>=0&&a.splice(e,1),0===a.length&&(s(),s=null)}},{setup:e.setup,subscribeToNewToastEvent:e.subscribeToNewToastEvent,subscribeToClearToastsEvent:e.subscribeToClearToastsEvent,unsubscribeToNewToastEvent:e.unsubscribeToNewToastEvent,unsubscribeToClearToastsEvent:e.unsubscribeToClearToastsEvent}}]).directive("directiveTemplate",["$compile","$injector",function(t,e){return{restrict:"A",scope:{directiveName:"@directiveName",directiveData:"@directiveData"},replace:!0,link:function(o,s,i){o.$watch("directiveName",function(a){if(angular.isUndefined(a)||a.length<=0)throw new Error("A valid directive name must be provided via the toast body argument when using bodyOutputType: directive");var n=e.has(i.$normalize(a)+"Directive");if(!n)throw new Error(a+" could not be found.");o.directiveData&&(o.directiveData=angular.fromJson(o.directiveData));var r=t("<div "+a+"></div>")(o);s.append(r)})}}}]).directive("toasterContainer",["$parse","$rootScope","$interval","$sce","toasterConfig","toaster","toasterEventRegistry",function(t,e,o,s,i,a,n){return{replace:!0,restrict:"EA",scope:!0,link:function(e,r,c){function l(t,s){t.timeoutPromise=o(function(){e.removeToast(t.id)},s,1)}function u(o,i){if(o.type=m["icon-classes"][o.type],o.type||(o.type=m["icon-class"]),m["prevent-duplicates"]===!0)if(v(i)){if(e.toasters.length>0&&e.toasters[e.toasters.length-1].body===o.body)return}else{var a,n;for(a=0,n=e.toasters.length;n>a;a++)e.toasters[a].uid===i&&(d(a),a--,n=e.toasters.length)}o.id=++f,v(i)||(o.uid=i);var r=m["close-button"];if("boolean"==typeof o.showCloseButton);else if("boolean"==typeof r)o.showCloseButton=r;else if("object"==typeof r){var c=r[o.type];"undefined"!=typeof c&&null!==c&&(o.showCloseButton=c)}else o.showCloseButton=!1;switch(o.bodyOutputType=o.bodyOutputType||m["body-output-type"],o.bodyOutputType){case"trustedHtml":o.html=s.trustAsHtml(o.body);break;case"template":o.bodyTemplate=o.body||m["body-template"];break;case"templateWithData":var l=t(o.body||m["body-template"]),u=l(e);o.bodyTemplate=u.template,o.data=u.data;break;case"directive":o.html=o.body}e.configureTimer(o),m["newest-on-top"]===!0?(e.toasters.unshift(o),m.limit>0&&e.toasters.length>m.limit&&e.toasters.pop()):(e.toasters.push(o),m.limit>0&&e.toasters.length>m.limit&&e.toasters.shift())}function d(t){var s=e.toasters[t];s&&(s.timeoutPromise&&o.cancel(s.timeoutPromise),e.toasters.splice(t,1),angular.isFunction(s.onHideCallback)&&s.onHideCallback())}function p(t){for(var o=e.toasters.length-1;o>=0;o--)v(t)?d(o):e.toasters[o].uid==t&&d(o)}function v(t){return angular.isUndefined(t)||null===t}var m,f=0;m=angular.extend({},i,e.$eval(c.toasterOptions)),e.config={toasterId:m["toaster-id"],position:m["position-class"],title:m["title-class"],message:m["message-class"],tap:m["tap-to-dismiss"],closeButton:m["close-button"],animation:m["animation-class"],mouseoverTimer:m["mouseover-timer-stop"]},e.$on("$destroy",function(){n.unsubscribeToNewToastEvent(e._onNewToast),n.unsubscribeToClearToastsEvent(e._onClearToasts)}),e.configureTimer=function(t){var e=angular.isNumber(t.timeout)?t.timeout:m["time-out"];"object"==typeof e&&(e=e[t.type]),e>0&&l(t,e)},e.removeToast=function(t){var o,s;for(o=0,s=e.toasters.length;s>o;o++)if(e.toasters[o].id===t){d(o);break}},e.toasters=[],e._onNewToast=function(t,o,s){(v(e.config.toasterId)&&v(o)||!v(e.config.toasterId)&&!v(o)&&e.config.toasterId==o)&&u(a.toast,s)},e._onClearToasts=function(t,o,s){("*"==o||v(e.config.toasterId)&&v(o)||!v(e.config.toasterId)&&!v(o)&&e.config.toasterId==o)&&p(s)},n.setup(),n.subscribeToNewToastEvent(e._onNewToast),n.subscribeToClearToastsEvent(e._onClearToasts)},controller:["$scope","$element","$attrs",function(t){t.stopTimer=function(e){t.config.mouseoverTimer===!0&&e.timeoutPromise&&(o.cancel(e.timeoutPromise),e.timeoutPromise=null)},t.restartTimer=function(e){t.config.mouseoverTimer===!0?e.timeoutPromise||t.configureTimer(e):null===e.timeoutPromise&&t.removeToast(e.id)},t.click=function(e,o){if(t.config.tap===!0||e.showCloseButton===!0&&o===!0){var s=!0;e.clickHandler&&(angular.isFunction(e.clickHandler)?s=e.clickHandler(e,o):angular.isFunction(t.$parent.$eval(e.clickHandler))?s=t.$parent.$eval(e.clickHandler)(e,o):console.log("TOAST-NOTE: Your click handler is not inside a parent scope of toaster-container.")),s&&t.removeToast(e.id)}}}],template:'<div id="toast-container" ng-class="[config.position, config.animation]"><div ng-repeat="toaster in toasters" class="toast" ng-class="toaster.type" ng-click="click(toaster)" ng-mouseover="stopTimer(toaster)" ng-mouseout="restartTimer(toaster)"><button type="button" class="toast-close-button" ng-show="toaster.showCloseButton" ng-click="click(toaster, true)">&times;</button><div ng-class="config.title">{{toaster.title}}</div><div ng-class="config.message" ng-switch on="toaster.bodyOutputType"><div ng-switch-when="trustedHtml" ng-bind-html="toaster.html"></div><div ng-switch-when="template"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="templateWithData"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="directive"><div directive-template directive-name="{{toaster.html}}" directive-data="{{toaster.directiveData}}"></div></div><div ng-switch-default >{{toaster.body}}</div></div></div></div>'}}])}(window,document);
/**
* @version: 2.1.14
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2015 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: https://www.improvely.com/
*/

(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['moment', 'jquery', 'exports'], function(momentjs, $, exports) {
      root.daterangepicker = factory(root, exports, momentjs, $);
    });

  } else if (typeof exports !== 'undefined') {
      var momentjs = require('moment');
      var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;  //isomorphic issue
      if (!jQuery) {
          try {
              jQuery = require('jquery');
              if (!jQuery.fn) jQuery.fn = {}; //isomorphic issue
          } catch (err) {
              if (!jQuery) throw new Error('jQuery dependency not found');
          }
      }

    factory(root, exports, momentjs, jQuery);

  // Finally, as a browser global.
  } else {
    root.daterangepicker = factory(root, {}, root.moment || moment, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this || {}, function(root, daterangepicker, moment, $) { // 'this' doesn't exist on a server

    var DateRangePicker = function(element, options, cb) {

        //default settings for options
        this.parentEl = 'body';
        this.element = $(element);
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.minDate = false;
        this.maxDate = false;
        this.dateLimit = false;
        this.autoApply = false;
        this.singleDatePicker = false;
        this.showDropdowns = false;
        this.showWeekNumbers = false;
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        this.linkedCalendars = true;
        this.autoUpdateInput = true;
        this.ranges = {};

        this.opens = 'right';
        if (this.element.hasClass('pull-right'))
            this.opens = 'left';

        this.drops = 'down';
        if (this.element.hasClass('dropup'))
            this.drops = 'up';

        this.buttonClasses = 'btn btn-sm';
        this.applyClass = 'btn-success';
        this.cancelClass = 'btn-default';

        this.locale = {
            format: 'MM/DD/YYYY',
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        };

        this.callback = function() { };

        //some state information
        this.isShowing = false;
        this.leftCalendar = {};
        this.rightCalendar = {};

        //custom options from user
        if (typeof options !== 'object' || options === null)
            options = {};

        //allow setting options with data attributes
        //data-api options will be overwritten with custom javascript options
        options = $.extend(this.element.data(), options);

        //html template for the picker UI
        if (typeof options.template !== 'string')
            options.template = '<div class="daterangepicker dropdown-menu">' +
                '<div class="calendar left">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini" type="text" name="daterangepicker_start" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' +
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="calendar right">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini" type="text" name="daterangepicker_end" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' +
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="ranges">' +
                    '<div class="range_inputs">' +
                        '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
                        '<button class="cancelBtn" type="button"></button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(options.template).appendTo(this.parentEl);

        //
        // handle all the possible options overriding defaults
        //

        if (typeof options.locale === 'object') {

            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;

            if (typeof options.locale.separator === 'string')
                this.locale.separator = options.locale.separator;

            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

            if (typeof options.locale.monthNames === 'object')
              this.locale.monthNames = options.locale.monthNames.slice();

            if (typeof options.locale.firstDay === 'number')
              this.locale.firstDay = options.locale.firstDay;

            if (typeof options.locale.applyLabel === 'string')
              this.locale.applyLabel = options.locale.applyLabel;

            if (typeof options.locale.cancelLabel === 'string')
              this.locale.cancelLabel = options.locale.cancelLabel;

            if (typeof options.locale.weekLabel === 'string')
              this.locale.weekLabel = options.locale.weekLabel;

            if (typeof options.locale.customRangeLabel === 'string')
              this.locale.customRangeLabel = options.locale.customRangeLabel;

        }

        if (typeof options.startDate === 'string')
            this.startDate = moment(options.startDate, this.locale.format);

        if (typeof options.endDate === 'string')
            this.endDate = moment(options.endDate, this.locale.format);

        if (typeof options.minDate === 'string')
            this.minDate = moment(options.minDate, this.locale.format);

        if (typeof options.maxDate === 'string')
            this.maxDate = moment(options.maxDate, this.locale.format);

        if (typeof options.startDate === 'object')
            this.startDate = moment(options.startDate);

        if (typeof options.endDate === 'object')
            this.endDate = moment(options.endDate);

        if (typeof options.minDate === 'object')
            this.minDate = moment(options.minDate);

        if (typeof options.maxDate === 'object')
            this.maxDate = moment(options.maxDate);

        // sanity check for bad options
        if (this.minDate && this.startDate.isBefore(this.minDate))
            this.startDate = this.minDate.clone();

        // sanity check for bad options
        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();

        if (typeof options.applyClass === 'string')
            this.applyClass = options.applyClass;

        if (typeof options.cancelClass === 'string')
            this.cancelClass = options.cancelClass;

        if (typeof options.dateLimit === 'object')
            this.dateLimit = options.dateLimit;

        if (typeof options.opens === 'string')
            this.opens = options.opens;

        if (typeof options.drops === 'string')
            this.drops = options.drops;

        if (typeof options.showWeekNumbers === 'boolean')
            this.showWeekNumbers = options.showWeekNumbers;

        if (typeof options.buttonClasses === 'string')
            this.buttonClasses = options.buttonClasses;

        if (typeof options.buttonClasses === 'object')
            this.buttonClasses = options.buttonClasses.join(' ');

        if (typeof options.showDropdowns === 'boolean')
            this.showDropdowns = options.showDropdowns;

        if (typeof options.singleDatePicker === 'boolean') {
            this.singleDatePicker = options.singleDatePicker;
            if (this.singleDatePicker)
                this.endDate = this.startDate.clone();
        }

        if (typeof options.timePicker === 'boolean')
            this.timePicker = options.timePicker;

        if (typeof options.timePickerSeconds === 'boolean')
            this.timePickerSeconds = options.timePickerSeconds;

        if (typeof options.timePickerIncrement === 'number')
            this.timePickerIncrement = options.timePickerIncrement;

        if (typeof options.timePicker24Hour === 'boolean')
            this.timePicker24Hour = options.timePicker24Hour;

        if (typeof options.autoApply === 'boolean')
            this.autoApply = options.autoApply;

        if (typeof options.autoUpdateInput === 'boolean')
            this.autoUpdateInput = options.autoUpdateInput;

        if (typeof options.linkedCalendars === 'boolean')
            this.linkedCalendars = options.linkedCalendars;

        if (typeof options.isInvalidDate === 'function')
            this.isInvalidDate = options.isInvalidDate;

        // update day names order to firstDay
        if (this.locale.firstDay != 0) {
            var iterator = this.locale.firstDay;
            while (iterator > 0) {
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                iterator--;
            }
        }

        var start, end, range;

        //if no start/end dates set, check if an input element contains initial values
        if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
            if ($(this.element).is('input[type=text]')) {
                var val = $(this.element).val(),
                    split = val.split(this.locale.separator);

                start = end = null;

                if (split.length == 2) {
                    start = moment(split[0], this.locale.format);
                    end = moment(split[1], this.locale.format);
                } else if (this.singleDatePicker && val !== "") {
                    start = moment(val, this.locale.format);
                    end = moment(val, this.locale.format);
                }
                if (start !== null && end !== null) {
                    this.setStartDate(start);
                    this.setEndDate(end);
                }
            }
        }

        if (typeof options.ranges === 'object') {
            for (range in options.ranges) {

                if (typeof options.ranges[range][0] === 'string')
                    start = moment(options.ranges[range][0], this.locale.format);
                else
                    start = moment(options.ranges[range][0]);

                if (typeof options.ranges[range][1] === 'string')
                    end = moment(options.ranges[range][1], this.locale.format);
                else
                    end = moment(options.ranges[range][1]);

                // If the start or end date exceed those allowed by the minDate or dateLimit
                // options, shorten the range to the allowable period.
                if (this.minDate && start.isBefore(this.minDate))
                    start = this.minDate.clone();

                var maxDate = this.maxDate;
                if (this.dateLimit && start.clone().add(this.dateLimit).isAfter(maxDate))
                    maxDate = start.clone().add(this.dateLimit);
                if (maxDate && end.isAfter(maxDate))
                    end = maxDate.clone();

                // If the end of the range is before the minimum or the start of the range is
                // after the maximum, don't display this range option at all.
                if ((this.minDate && end.isBefore(this.minDate)) || (maxDate && start.isAfter(maxDate)))
                    continue;
                
                //Support unicode chars in the range names.
                var elem = document.createElement('textarea');
                elem.innerHTML = range;
                var rangeHtml = elem.value;

                this.ranges[rangeHtml] = [start, end];
            }

            var list = '<ul>';
            for (range in this.ranges) {
                list += '<li>' + range + '</li>';
            }
            list += '<li>' + this.locale.customRangeLabel + '</li>';
            list += '</ul>';
            this.container.find('.ranges').prepend(list);
        }

        if (typeof cb === 'function') {
            this.callback = cb;
        }

        if (!this.timePicker) {
            this.startDate = this.startDate.startOf('day');
            this.endDate = this.endDate.endOf('day');
            this.container.find('.calendar-time').hide();
        }

        //can't be used together for now
        if (this.timePicker && this.autoApply)
            this.autoApply = false;

        if (this.autoApply && typeof options.ranges !== 'object') {
            this.container.find('.ranges').hide();
        } else if (this.autoApply) {
            this.container.find('.applyBtn, .cancelBtn').addClass('hide');
        }

        if (this.singleDatePicker) {
            this.container.addClass('single');
            this.container.find('.calendar.left').addClass('single');
            this.container.find('.calendar.left').show();
            this.container.find('.calendar.right').hide();
            this.container.find('.daterangepicker_input input, .daterangepicker_input i').hide();
            if (!this.timePicker) {
                this.container.find('.ranges').hide();
            }
        }

        if (typeof options.ranges === 'undefined' && !this.singleDatePicker) {
            this.container.addClass('show-calendar');
        }

        this.container.addClass('opens' + this.opens);

        //swap the position of the predefined ranges if opens right
        if (typeof options.ranges !== 'undefined' && this.opens == 'right') {
            var ranges = this.container.find('.ranges');
            var html = ranges.clone();
            ranges.remove();
            this.container.find('.calendar.left').parent().prepend(html);
        }

        //apply CSS classes and labels to buttons
        this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        //
        // event listeners
        //

        this.container.find('.calendar')
            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
            .on('click.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
            .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
            .on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))
            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this))
            .on('click.daterangepicker', '.daterangepicker_input input', $.proxy(this.showCalendars, this))
            //.on('keyup.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this))
            .on('change.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this));

        this.container.find('.ranges')
            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
            .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
            .on('mouseenter.daterangepicker', 'li', $.proxy(this.hoverRange, this))
            .on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));

        if (this.element.is('input')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.elementChanged, this),
                'keydown.daterangepicker': $.proxy(this.keydown, this)
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
        }

        //
        // if attached to a text input, set the initial value
        //

        if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.element.trigger('change');
        } else if (this.element.is('input') && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format));
            this.element.trigger('change');
        }

    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.locale.format);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);

            if (!this.timePicker)
                this.startDate = this.startDate.startOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.minDate && this.startDate.isBefore(this.minDate))
                this.startDate = this.minDate;

            if (this.maxDate && this.startDate.isAfter(this.maxDate))
                this.startDate = this.maxDate;

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.locale.format);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (!this.timePicker)
                this.endDate = this.endDate.endOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.endDate.isBefore(this.startDate))
                this.endDate = this.startDate.clone();

            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate;

            if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
                this.endDate = this.startDate.clone().add(this.dateLimit);

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        isInvalidDate: function() {
            return false;
        },

        updateView: function() {
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
                if (!this.endDate) {
                    this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');
                } else {
                    this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');
                }
            }
            if (this.endDate) {
                this.container.find('input[name="daterangepicker_end"]').removeClass('active');
                this.container.find('input[name="daterangepicker_start"]').addClass('active');
            } else {
                this.container.find('input[name="daterangepicker_end"]').addClass('active');
                this.container.find('input[name="daterangepicker_start"]').removeClass('active');
            }
            this.updateMonthsInView();
            this.updateCalendars();
            this.updateFormInputs();
        },

        updateMonthsInView: function() {
            if (this.endDate) {

                //if both dates are visible already, do nothing
                if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                    (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    &&
                    (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    ) {
                    return;
                }

                this.leftCalendar.month = this.startDate.clone().date(2);
                if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                    this.rightCalendar.month = this.endDate.clone().date(2);
                } else {
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
                
            } else {
                if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                    this.leftCalendar.month = this.startDate.clone().date(2);
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
            }
        },

        updateCalendars: function() {

            if (this.timePicker) {
                var hour, minute, second;
                if (this.endDate) {
                    hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                } else {
                    hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                }
                this.leftCalendar.month.hour(hour).minute(minute).second(second);
                this.rightCalendar.month.hour(hour).minute(minute).second(second);
            }

            this.renderCalendar('left');
            this.renderCalendar('right');

            //highlight any predefined range matching the current start and end dates
            this.container.find('.ranges li').removeClass('active');
            if (this.endDate == null) return;

            var customRange = true;
            var i = 0;
            for (var range in this.ranges) {
                if (this.timePicker) {
                    if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                        break;
                    }
                } else {
                    //ignore times when comparing dates if time picker is not enabled
                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                        break;
                    }
                }
                i++;
            }
            if (customRange) {
                this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
                this.showCalendars();
            }

        },

        renderCalendar: function(side) {

            //
            // Build the matrix of dates that will populate the calendar
            //

            var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
            var month = calendar.month.month();
            var year = calendar.month.year();
            var hour = calendar.month.hour();
            var minute = calendar.month.minute();
            var second = calendar.month.second();
            var daysInMonth = moment([year, month]).daysInMonth();
            var firstDay = moment([year, month, 1]);
            var lastDay = moment([year, month, daysInMonth]);
            var lastMonth = moment(firstDay).subtract(1, 'month').month();
            var lastYear = moment(firstDay).subtract(1, 'month').year();
            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
            var dayOfWeek = firstDay.day();

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            calendar.firstDay = firstDay;
            calendar.lastDay = lastDay;

            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

            var col, row;
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);

                if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                    calendar[row][col] = this.minDate.clone();
                }

                if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                    calendar[row][col] = this.maxDate.clone();
                }

            }

            //make the calendar object available to hoverDate/clickDate
            if (side == 'left') {
                this.leftCalendar.calendar = calendar;
            } else {
                this.rightCalendar.calendar = calendar;
            }

            //
            // Display the calendar
            //

            var minDate = side == 'left' ? this.minDate : this.startDate;
            var maxDate = this.maxDate;
            var selected = side == 'left' ? this.startDate : this.endDate;

            var html = '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers)
                html += '<th></th>';

            if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
                html += '<th class="prev available"><i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

            if (this.showDropdowns) {
                var currentMonth = calendar[1][1].month();
                var currentYear = calendar[1][1].year();
                var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
                var minYear = (minDate && minDate.year()) || (currentYear - 50);
                var inMinYear = currentYear == minYear;
                var inMaxYear = currentYear == maxYear;

                var monthHtml = '<select class="monthselect">';
                for (var m = 0; m < 12; m++) {
                    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            ">" + this.locale.monthNames[m] + "</option>";
                    } else {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                    }
                }
                monthHtml += "</select>";

                var yearHtml = '<select class="yearselect">';
                for (var y = minYear; y <= maxYear; y++) {
                    yearHtml += '<option value="' + y + '"' +
                        (y === currentYear ? ' selected="selected"' : '') +
                        '>' + y + '</option>';
                }
                yearHtml += '</select>';

                dateHtml = monthHtml + yearHtml;
            }

            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
                html += '<th class="next available"><i class="fa fa-chevron-right glyphicon glyphicon-chevron-right"></i></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //adjust maxDate to reflect the dateLimit setting in order to
            //grey out end dates beyond the dateLimit
            if (this.endDate == null && this.dateLimit) {
                var maxLimit = this.startDate.clone().add(this.dateLimit).endOf('day');
                if (!maxDate || maxLimit.isBefore(maxDate)) {
                    maxDate = maxLimit;
                }
            }

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';

                for (var col = 0; col < 7; col++) {

                    var classes = [];

                    //highlight today's date
                    if (calendar[row][col].isSame(new Date(), "day"))
                        classes.push('today');

                    //highlight weekends
                    if (calendar[row][col].isoWeekday() > 5)
                        classes.push('weekend');

                    //grey out the dates in other months displayed at beginning and end of this calendar
                    if (calendar[row][col].month() != calendar[1][1].month())
                        classes.push('off');

                    //don't allow selection of dates before the minimum date
                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of dates after the maximum date
                    if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of date if a custom function decides it's invalid
                    if (this.isInvalidDate(calendar[row][col]))
                        classes.push('off', 'disabled');

                    //highlight the currently selected start date
                    if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                        classes.push('active', 'start-date');

                    //highlight the currently selected end date
                    if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                        classes.push('active', 'end-date');

                    //highlight dates in-between the selected dates
                    if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                        classes.push('in-range');

                    var cname = '', disabled = false;
                    for (var i = 0; i < classes.length; i++) {
                        cname += classes[i] + ' ';
                        if (classes[i] == 'disabled')
                            disabled = true;
                    }
                    if (!disabled)
                        cname += 'available';

                    html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';

            this.container.find('.calendar.' + side + ' .calendar-table').html(html);

        },

        renderTimePicker: function(side) {

            var html, selected, minDate, maxDate = this.maxDate;

            if (this.dateLimit && (!this.maxDate || this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)))
                maxDate = this.startDate.clone().add(this.dateLimit);

            if (side == 'left') {
                selected = this.startDate.clone();
                minDate = this.minDate;
            } else if (side == 'right') {
                selected = this.endDate ? this.endDate.clone() : this.startDate.clone();
                minDate = this.startDate;

                //Preserve the time already selected
                var timeSelector = this.container.find('.calendar.right .calendar-time div');
                if (timeSelector.html() != '') {
                  selected.hour(timeSelector.find('.hourselect option:selected').val() || selected.hour());
                  selected.minute(timeSelector.find('.minuteselect option:selected').val() || selected.minute());
                  selected.second(timeSelector.find('.secondselect option:selected').val() || selected.second());
                  if (selected.isAfter(maxDate))
                    selected = maxDate.clone();
                }
            }

            //
            // hours
            //

            html = '<select class="hourselect">';

            var start = this.timePicker24Hour ? 0 : 1;
            var end = this.timePicker24Hour ? 23 : 12;

            for (var i = start; i <= end; i++) {
                var i_in_24 = i;
                if (!this.timePicker24Hour)
                    i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

                var time = selected.clone().hour(i_in_24);
                var disabled = false;
                if (minDate && time.minute(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.minute(0).isAfter(maxDate))
                    disabled = true;

                if (i_in_24 == selected.hour() && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
                } else {
                    html += '<option value="' + i + '">' + i + '</option>';
                }
            }

            html += '</select> ';

            //
            // minutes
            //

            html += ': <select class="minuteselect">';

            for (var i = 0; i < 60; i += this.timePickerIncrement) {
                var padded = i < 10 ? '0' + i : i;
                var time = selected.clone().minute(i);

                var disabled = false;
                if (minDate && time.second(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.second(0).isAfter(maxDate))
                    disabled = true;

                if (selected.minute() == i && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                } else {
                    html += '<option value="' + i + '">' + padded + '</option>';
                }
            }

            html += '</select> ';

            //
            // seconds
            //

            if (this.timePickerSeconds) {
                html += ': <select class="secondselect">';

                for (var i = 0; i < 60; i++) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().second(i);

                    var disabled = false;
                    if (minDate && time.isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.isAfter(maxDate))
                        disabled = true;

                    if (selected.second() == i && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + padded + '</option>';
                    }
                }

                html += '</select> ';
            }

            //
            // AM/PM
            //

            if (!this.timePicker24Hour) {
                html += '<select class="ampmselect">';

                var am_html = '';
                var pm_html = '';

                if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                    am_html = ' disabled="disabled" class="disabled"';

                if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                    pm_html = ' disabled="disabled" class="disabled"';

                if (selected.hour() >= 12) {
                    html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
                } else {
                    html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
                }

                html += '</select>';
            }

            this.container.find('.calendar.' + side + ' .calendar-time div').html(html);

        },

        updateFormInputs: function() {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.locale.format));
            if (this.endDate)
                this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.locale.format));

            if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }

        },

        move: function() {
            var parentOffset = { top: 0, left: 0 },
                containerTop;
            var parentRightEdge = $(window).width();
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
                parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
            }

            if (this.drops == 'up')
                containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
            else
                containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
            this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');

            if (this.opens == 'left') {
                this.container.css({
                    top: containerTop,
                    right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else if (this.opens == 'center') {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                            - this.container.outerWidth() / 2,
                    right: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        show: function(e) {
            if (this.isShowing) return;

            // Create a click proxy that is private to this instance of datepicker, for unbinding
            this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);

            // Bind global datepicker mousedown for hiding and
            $(document)
              .on('mousedown.daterangepicker', this._outsideClickProxy)
              // also support mobile devices
              .on('touchend.daterangepicker', this._outsideClickProxy)
              // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
              .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
              // and also close when focus changes to outside the picker (eg. tabbing between controls)
              .on('focusin.daterangepicker', this._outsideClickProxy);

            // Reposition the picker if the window is resized while it's open
            $(window).on('resize.daterangepicker', $.proxy(function(e) { this.move(e); }, this));

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();

            this.updateView();
            this.container.show();
            this.move();
            this.element.trigger('show.daterangepicker', this);
            this.isShowing = true;
        },

        hide: function(e) {
            if (!this.isShowing) return;

            //incomplete date selection, revert to last values
            if (!this.endDate) {
                this.startDate = this.oldStartDate.clone();
                this.endDate = this.oldEndDate.clone();
            }

            //if a new date range was selected, invoke the user callback function
            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.callback(this.startDate, this.endDate, this.chosenLabel);

            //if picker is attached to a text input, update it
            this.updateElement();

            $(document).off('.daterangepicker');
            $(window).off('.daterangepicker');
            this.container.hide();
            this.element.trigger('hide.daterangepicker', this);
            this.isShowing = false;
        },

        toggle: function(e) {
            if (this.isShowing) {
                this.hide();
            } else {
                this.show();
            }
        },

        outsideClick: function(e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (
                // ie modal dialog fix
                e.type == "focusin" ||
                target.closest(this.element).length ||
                target.closest(this.container).length ||
                target.closest('.calendar-table').length
                ) return;
            this.hide();
        },

        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
            this.element.trigger('showCalendar.daterangepicker', this);
        },

        hideCalendars: function() {
            this.container.removeClass('show-calendar');
            this.element.trigger('hideCalendar.daterangepicker', this);
        },

        hoverRange: function(e) {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            var label = e.target.innerHTML;
            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
                this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.locale.format));
                this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.locale.format));
            }
            
        },

        clickRange: function(e) {
            var label = e.target.innerHTML;
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];
                this.startDate = dates[0];
                this.endDate = dates[1];

                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }

                this.hideCalendars();
                this.clickApply();
            }
        },

        clickPrev: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract(1, 'month');
                if (this.linkedCalendars)
                    this.rightCalendar.month.subtract(1, 'month');
            } else {
                this.rightCalendar.month.subtract(1, 'month');
            }
            this.updateCalendars();
        },

        clickNext: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add(1, 'month');
            } else {
                this.rightCalendar.month.add(1, 'month');
                if (this.linkedCalendars)
                    this.leftCalendar.month.add(1, 'month');
            }
            this.updateCalendars();
        },

        hoverDate: function(e) {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            //ignore dates that can't be selected
            if (!$(e.target).hasClass('available')) return;

            //have the text inputs above calendars reflect the date being hovered over
            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            if (this.endDate) {
                this.container.find('input[name=daterangepicker_start]').val(date.format(this.locale.format));
            } else {
                this.container.find('input[name=daterangepicker_end]').val(date.format(this.locale.format));
            }

            //highlight the dates between the start date and the date being hovered as a potential end date
            var leftCalendar = this.leftCalendar;
            var rightCalendar = this.rightCalendar;
            var startDate = this.startDate;
            if (!this.endDate) {
                this.container.find('.calendar td').each(function(index, el) {

                    //skip week numbers, only look at dates
                    if ($(el).hasClass('week')) return;

                    var title = $(el).attr('data-title');
                    var row = title.substr(1, 1);
                    var col = title.substr(3, 1);
                    var cal = $(el).parents('.calendar');
                    var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

                    if (dt.isAfter(startDate) && dt.isBefore(date)) {
                        $(el).addClass('in-range');
                    } else {
                        $(el).removeClass('in-range');
                    }

                });
            }

        },

        clickDate: function(e) {

            if (!$(e.target).hasClass('available')) return;

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            //
            // this function needs to do a few things:
            // * alternate between selecting a start and end date for the range,
            // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
            // * if autoapply is enabled, and an end date was chosen, apply the selection
            // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
            //

            if (this.endDate || date.isBefore(this.startDate)) {
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = cal.find('.ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.endDate = null;
                this.setStartDate(date.clone());
            } else {
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.setEndDate(date.clone());
                if (this.autoApply)
                    this.clickApply();
            }

            if (this.singleDatePicker) {
                this.setEndDate(this.startDate);
                if (!this.timePicker)
                    this.clickApply();
            }

            this.updateView();

        },

        clickApply: function(e) {
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function(e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },

        monthOrYearChanged: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.'+leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            if (!isLeft) {
                if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                    month = this.startDate.month();
                    year = this.startDate.year();
                }
            }

            if (this.minDate) {
                if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                    month = this.minDate.month();
                    year = this.minDate.year();
                }
            }

            if (this.maxDate) {
                if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                    month = this.maxDate.month();
                    year = this.maxDate.year();
                }
            }

            if (isLeft) {
                this.leftCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
            } else {
                this.rightCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
            }
            this.updateCalendars();
        },

        timeChanged: function(e) {

            var cal = $(e.target).closest('.calendar'),
                isLeft = cal.hasClass('left');

            var hour = parseInt(cal.find('.hourselect').val(), 10);
            var minute = parseInt(cal.find('.minuteselect').val(), 10);
            var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

            if (!this.timePicker24Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm === 'PM' && hour < 12)
                    hour += 12;
                if (ampm === 'AM' && hour === 12)
                    hour = 0;
            }

            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                start.second(second);
                this.setStartDate(start);
                if (this.singleDatePicker) {
                    this.endDate = this.startDate.clone();
                } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                    this.setEndDate(start.clone());
                }
            } else if (this.endDate) {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                end.second(second);
                this.setEndDate(end);
            }

            //update the calendars so all clickable dates reflect the new time component
            this.updateCalendars();

            //update the form inputs above the calendars with the new time
            this.updateFormInputs();

            //re-render the time pickers because changing one selection can affect what's enabled in another
            this.renderTimePicker('left');
            this.renderTimePicker('right');

        },

        formInputsChanged: function(e) {
            var isRight = $(e.target).closest('.calendar').hasClass('right');
            var start = moment(this.container.find('input[name="daterangepicker_start"]').val(), this.locale.format);
            var end = moment(this.container.find('input[name="daterangepicker_end"]').val(), this.locale.format);

            if (start.isValid() && end.isValid()) {

                if (isRight && end.isBefore(start))
                    start = end.clone();

                this.setStartDate(start);
                this.setEndDate(end);

                if (isRight) {
                    this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format));
                } else {
                    this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format));
                }

            }

            this.updateCalendars();
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
            }
        },

        elementChanged: function() {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;
            if (this.element.val().length < this.locale.format.length) return;

            var dateString = this.element.val().split(this.locale.separator),
                start = null,
                end = null;

            if (dateString.length === 2) {
                start = moment(dateString[0], this.locale.format);
                end = moment(dateString[1], this.locale.format);
            }

            if (this.singleDatePicker || start === null || end === null) {
                start = moment(this.element.val(), this.locale.format);
                end = start;
            }

            if (!start.isValid() || !end.isValid()) return;

            this.setStartDate(start);
            this.setEndDate(end);
            this.updateView();
        },

        keydown: function(e) {
            //hide on tab or enter
            if ((e.keyCode === 9) || (e.keyCode === 13)) {
                this.hide();
            }
        },

        updateElement: function() {
            if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.element.trigger('change');
            } else if (this.element.is('input') && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format));
                this.element.trigger('change');
            }
        },

        remove: function() {
            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData();
        }

    };

    $.fn.daterangepicker = function(options, callback) {
        this.each(function() {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, options, callback));
        });
        return this;
    };
    
    return DateRangePicker;

}));

(function() {
  var picker;

  picker = angular.module('daterangepicker', []);

  picker.constant('dateRangePickerConfig', {
    clearLabel: 'Clear',
    locale: {
      separator: ' - ',
      format: 'YYYY-MM-DD'
    }
  });

  picker.directive('dateRangePicker', ['$compile', '$timeout', '$parse', 'dateRangePickerConfig', function($compile, $timeout, $parse, dateRangePickerConfig) {
    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        min: '=',
        max: '=',
        model: '=ngModel',
        opts: '=options',
        clearable: '='
      },
      link: function($scope, element, attrs, modelCtrl) {
        var _clear, _init, _initBoundaryField, _mergeOpts, _picker, _setDatePoint, _setEndDate, _setStartDate, _validate, _validateMax, _validateMin, customOpts, el, opts;
        _mergeOpts = function() {
          var extend, localeExtend;
          localeExtend = angular.extend.apply(angular, Array.prototype.slice.call(arguments).map(function(opt) {
            return opt != null ? opt.locale : void 0;
          }).filter(function(opt) {
            return !!opt;
          }));
          extend = angular.extend.apply(angular, arguments);
          extend.locale = localeExtend;
          return extend;
        };
        el = $(element);
        customOpts = $scope.opts;
        opts = _mergeOpts({}, dateRangePickerConfig, customOpts);
        _picker = null;
        _clear = function() {
          _picker.setStartDate();
          return _picker.setEndDate();
        };
        _setDatePoint = function(setter) {
          return function(newValue) {
            if (_picker && newValue) {
              return setter(moment(newValue));
            }
          };
        };
        _setStartDate = _setDatePoint(function(m) {
          if (_picker.endDate < m) {
            _picker.setEndDate(m);
          }
          opts.startDate = m;
          return _picker.setStartDate(m);
        });
        _setEndDate = _setDatePoint(function(m) {
          if (_picker.startDate > m) {
            _picker.setStartDate(m);
          }
          opts.endDate = m;
          return _picker.setEndDate(m);
        });
        _validate = function(validator) {
          return function(boundary, actual) {
            if (boundary && actual) {
              return validator(moment(boundary), moment(actual));
            } else {
              return true;
            }
          };
        };
        _validateMin = _validate(function(min, start) {
          return min.isBefore(start) || min.isSame(start, 'day');
        });
        _validateMax = _validate(function(max, end) {
          return max.isAfter(end) || max.isSame(end, 'day');
        });
        modelCtrl.$formatters.push(function(objValue) {
          var f;
          f = function(date) {
            if (!moment.isMoment(date)) {
              return moment(date).format(opts.locale.format);
            } else {
              return date.format(opts.locale.format);
            }
          };
          if (opts.singleDatePicker && objValue) {
            return f(objValue);
          } else if (objValue.startDate) {
            return [f(objValue.startDate), f(objValue.endDate)].join(opts.locale.separator);
          } else {
            return '';
          }
        });
        modelCtrl.$render = function() {
          if (modelCtrl.$modelValue && modelCtrl.$modelValue.startDate) {
            _setStartDate(modelCtrl.$modelValue.startDate);
            _setEndDate(modelCtrl.$modelValue.endDate);
          } else {
            _clear();
          }
          return el.val(modelCtrl.$viewValue);
        };
        modelCtrl.$parsers.push(function(val) {
          var f, objValue, x;
          f = function(value) {
            return moment(value, opts.locale.format);
          };
          objValue = {
            startDate: null,
            endDate: null
          };
          if (angular.isString(val) && val.length > 0) {
            if (opts.singleDatePicker) {
              objValue = f(val);
            } else {
              x = val.split(opts.locale.separator).map(f);
              objValue.startDate = x[0];
              objValue.endDate = x[1];
            }
          }
          return objValue;
        });
        modelCtrl.$isEmpty = function(val) {
          return !(angular.isString(val) && val.length > 0);
        };
        _init = function() {
          var eventType, results;
          el.daterangepicker(angular.extend(opts, {
            autoUpdateInput: false
          }), function(start, end) {
            return $scope.$apply(function() {
              return $scope.model = opts.singleDatePicker ? start : {
                startDate: start,
                endDate: end
              };
            });
          });
          _picker = el.data('daterangepicker');
          results = [];
          for (eventType in opts.eventHandlers) {
            results.push(el.on(eventType, function(e) {
              var eventName;
              eventName = e.type + '.' + e.namespace;
              return $scope.$evalAsync(opts.eventHandlers[eventName]);
            }));
          }
          return results;
        };
        _init();
        $scope.$watch('model.startDate', function(n) {
          return _setStartDate(n);
        });
        $scope.$watch('model.endDate', function(n) {
          return _setEndDate(n);
        });
        _initBoundaryField = function(field, validator, modelField, optName) {
          if (attrs[field]) {
            modelCtrl.$validators[field] = function(value) {
              return value && validator(opts[optName], value[modelField]);
            };
            return $scope.$watch(field, function(date) {
              opts[optName] = date ? moment(date) : false;
              return _init();
            });
          }
        };
        _initBoundaryField('min', _validateMin, 'startDate', 'minDate');
        _initBoundaryField('max', _validateMax, 'endDate', 'maxDate');
        if (attrs.options) {
          $scope.$watch('opts', function(newOpts) {
            opts = _mergeOpts(opts, newOpts);
            return _init();
          }, true);
        }
        if (attrs.clearable) {
          $scope.$watch('clearable', function(newClearable) {
            if (newClearable) {
              opts = _mergeOpts(opts, {
                locale: {
                  cancelLabel: opts.clearLabel
                }
              });
            }
            _init();
            if (newClearable) {
              return el.on('cancel.daterangepicker', function() {
                return $scope.$apply(function() {
                  return $scope.model = opts.singleDatePicker ? null : {
                    startDate: null,
                    endDate: null
                  };
                });
              });
            }
          });
        }
        return $scope.$on('$destroy', function() {
          return _picker != null ? _picker.remove() : void 0;
        });
      }
    };
  }]);

}).call(this);

/**
 * angular-drag-and-drop-lists v1.3.0
 *
 * Copyright (c) 2014 Marcel Juenemann mail@marcel-juenemann.de
 * Copyright (c) 2014-2015 Google Inc.
 * https://github.com/marceljuenemann/angular-drag-and-drop-lists
 *
 * License: MIT
 */
angular.module('dndLists', [])

  /**
   * Use the dnd-draggable attribute to make your element draggable
   *
   * Attributes:
   * - dnd-draggable      Required attribute. The value has to be an object that represents the data
   *                      of the element. In case of a drag and drop operation the object will be
   *                      serialized and unserialized on the receiving end.
   * - dnd-selected       Callback that is invoked when the element was clicked but not dragged.
   *                      The original click event will be provided in the local event variable.
   * - dnd-effect-allowed Use this attribute to limit the operations that can be performed. Options:
   *                      - "move": The drag operation will move the element. This is the default.
   *                      - "copy": The drag operation will copy the element. Shows a copy cursor.
   *                      - "copyMove": The user can choose between copy and move by pressing the
   *                        ctrl or shift key. *Not supported in IE:* In Internet Explorer this
   *                        option will be the same as "copy". *Not fully supported in Chrome on
   *                        Windows:* In the Windows version of Chrome the cursor will always be the
   *                        move cursor. However, when the user drops an element and has the ctrl
   *                        key pressed, we will perform a copy anyways.
   *                      - HTML5 also specifies the "link" option, but this library does not
   *                        actively support it yet, so use it at your own risk.
   * - dnd-moved          Callback that is invoked when the element was moved. Usually you will
   *                      remove your element from the original list in this callback, since the
   *                      directive is not doing that for you automatically. The original dragend
   *                      event will be provided in the local event variable.
   * - dnd-canceled       Callback that is invoked if the element was dragged, but the operation was
   *                      canceled and the element was not dropped. The original dragend event will
   *                      be provided in the local event variable.
   * - dnd-copied         Same as dnd-moved, just that it is called when the element was copied
   *                      instead of moved. The original dragend event will be provided in the local
   *                      event variable.
   * - dnd-dragstart      Callback that is invoked when the element was dragged. The original
   *                      dragstart event will be provided in the local event variable.
   * - dnd-dragend        Callback that is invoked when the drag operation ended. Available local
   *                      variables are event and dropEffect.
   * - dnd-type           Use this attribute if you have different kinds of items in your
   *                      application and you want to limit which items can be dropped into which
   *                      lists. Combine with dnd-allowed-types on the dnd-list(s). This attribute
   *                      should evaluate to a string, although this restriction is not enforced.
   * - dnd-disable-if     You can use this attribute to dynamically disable the draggability of the
   *                      element. This is useful if you have certain list items that you don't want
   *                      to be draggable, or if you want to disable drag & drop completely without
   *                      having two different code branches (e.g. only allow for admins).
   *                      **Note**: If your element is not draggable, the user is probably able to
   *                      select text or images inside of it. Since a selection is always draggable,
   *                      this breaks your UI. You most likely want to disable user selection via
   *                      CSS (see user-select).
   *
   * CSS classes:
   * - dndDragging        This class will be added to the element while the element is being
   *                      dragged. It will affect both the element you see while dragging and the
   *                      source element that stays at it's position. Do not try to hide the source
   *                      element with this class, because that will abort the drag operation.
   * - dndDraggingSource  This class will be added to the element after the drag operation was
   *                      started, meaning it only affects the original element that is still at
   *                      it's source position, and not the "element" that the user is dragging with
   *                      his mouse pointer.
   */
  .directive('dndDraggable', ['$parse', '$timeout', 'dndDropEffectWorkaround', 'dndDragTypeWorkaround',
                      function($parse,   $timeout,   dndDropEffectWorkaround,   dndDragTypeWorkaround) {
    return function(scope, element, attr) {
      // Set the HTML5 draggable attribute on the element
      element.attr("draggable", "true");

      // If the dnd-disable-if attribute is set, we have to watch that
      if (attr.dndDisableIf) {
        scope.$watch(attr.dndDisableIf, function(disabled) {
          element.attr("draggable", !disabled);
        });
      }

      /**
       * When the drag operation is started we have to prepare the dataTransfer object,
       * which is the primary way we communicate with the target element
       */
      element.on('dragstart', function(event) {
        event = event.originalEvent || event;

        // Serialize the data associated with this element. IE only supports the Text drag type
        event.dataTransfer.setData("Text", angular.toJson(scope.$eval(attr.dndDraggable)));

        // Only allow actions specified in dnd-effect-allowed attribute
        event.dataTransfer.effectAllowed = attr.dndEffectAllowed || "move";

        // Add CSS classes. See documentation above
        element.addClass("dndDragging");
        $timeout(function() { element.addClass("dndDraggingSource"); }, 0);

        // Workarounds for stupid browsers, see description below
        dndDropEffectWorkaround.dropEffect = "none";
        dndDragTypeWorkaround.isDragging = true;

        // Save type of item in global state. Usually, this would go into the dataTransfer
        // typename, but we have to use "Text" there to support IE
        dndDragTypeWorkaround.dragType = attr.dndType ? scope.$eval(attr.dndType) : undefined;

        // Invoke callback
        $parse(attr.dndDragstart)(scope, {event: event});

        event.stopPropagation();
      });

      /**
       * The dragend event is triggered when the element was dropped or when the drag
       * operation was aborted (e.g. hit escape button). Depending on the executed action
       * we will invoke the callbacks specified with the dnd-moved or dnd-copied attribute.
       */
      element.on('dragend', function(event) {
        event = event.originalEvent || event;

        // Invoke callbacks. Usually we would use event.dataTransfer.dropEffect to determine
        // the used effect, but Chrome has not implemented that field correctly. On Windows
        // it always sets it to 'none', while Chrome on Linux sometimes sets it to something
        // else when it's supposed to send 'none' (drag operation aborted).
        var dropEffect = dndDropEffectWorkaround.dropEffect;
        scope.$apply(function() {
          switch (dropEffect) {
            case "move":
              $parse(attr.dndMoved)(scope, {event: event});
              break;
            case "copy":
              $parse(attr.dndCopied)(scope, {event: event});
              break;
            case "none":
              $parse(attr.dndCanceled)(scope, {event: event});
              break;
          }
          $parse(attr.dndDragend)(scope, {event: event, dropEffect: dropEffect});
        });

        // Clean up
        element.removeClass("dndDragging");
        $timeout(function() { element.removeClass("dndDraggingSource"); }, 0);
        dndDragTypeWorkaround.isDragging = false;
        event.stopPropagation();
      });

      /**
       * When the element is clicked we invoke the callback function
       * specified with the dnd-selected attribute.
       */
      element.on('click', function(event) {
        if (!attr.dndSelected) return;

        event = event.originalEvent || event;
        scope.$apply(function() {
          $parse(attr.dndSelected)(scope, {event: event});
        });

        // Prevent triggering dndSelected in parant elements.
        event.stopPropagation();
      });

      /**
       * Workaround to make element draggable in IE9
       */
      element.on('selectstart', function() {
        if (this.dragDrop) this.dragDrop();
      });
    };
  }])

  /**
   * Use the dnd-list attribute to make your list element a dropzone. Usually you will add a single
   * li element as child with the ng-repeat directive. If you don't do that, we will not be able to
   * position the dropped element correctly. If you want your list to be sortable, also add the
   * dnd-draggable directive to your li element(s). Both the dnd-list and it's direct children must
   * have position: relative CSS style, otherwise the positioning algorithm will not be able to
   * determine the correct placeholder position in all browsers.
   *
   * Attributes:
   * - dnd-list             Required attribute. The value has to be the array in which the data of
   *                        the dropped element should be inserted.
   * - dnd-allowed-types    Optional array of allowed item types. When used, only items that had a
   *                        matching dnd-type attribute will be dropable.
   * - dnd-disable-if       Optional boolean expresssion. When it evaluates to true, no dropping
   *                        into the list is possible. Note that this also disables rearranging
   *                        items inside the list.
   * - dnd-horizontal-list  Optional boolean expresssion. When it evaluates to true, the positioning
   *                        algorithm will use the left and right halfs of the list items instead of
   *                        the upper and lower halfs.
   * - dnd-dragover         Optional expression that is invoked when an element is dragged over the
   *                        list. If the expression is set, but does not return true, the element is
   *                        not allowed to be dropped. The following variables will be available:
   *                        - event: The original dragover event sent by the browser.
   *                        - index: The position in the list at which the element would be dropped.
   *                        - type: The dnd-type set on the dnd-draggable, or undefined if unset.
   * - dnd-drop             Optional expression that is invoked when an element is dropped over the
   *                        list. If the expression is set, it must return the object that will be
   *                        inserted into the list. If it returns false, the drop will be aborted
   *                        and the event is propagated. The following variables will be available:
   *                        - event: The original drop event sent by the browser.
   *                        - index: The position in the list at which the element would be dropped.
   *                        - item: The transferred object.
   *                        - type: The dnd-type set on the dnd-draggable, or undefined if unset.
   * - dnd-inserted         Optional expression that is invoked after a drop if the element was
   *                        actually inserted into the list. The same local variables as for
   *                        dnd-drop will be available. Note that for reorderings inside the same
   *                        list the old element will still be in the list due to the fact that
   *                        dnd-moved was not called yet.
   * - dnd-external-sources Optional boolean expression. When it evaluates to true, the list accepts
   *                        drops from sources outside of the current browser tab. This allows to
   *                        drag and drop accross different browser tabs. Note that this will allow
   *                        to drop arbitrary text into the list, thus it is highly recommended to
   *                        implement the dnd-drop callback to check the incoming element for
   *                        sanity. Furthermore, the dnd-type of external sources can not be
   *                        determined, therefore do not rely on restrictions of dnd-allowed-type.
   *
   * CSS classes:
   * - dndPlaceholder       When an element is dragged over the list, a new placeholder child
   *                        element will be added. This element is of type li and has the class
   *                        dndPlaceholder set. Alternatively, you can define your own placeholder
   *                        by creating a child element with dndPlaceholder class.
   * - dndDragover          Will be added to the list while an element is dragged over the list.
   */
  .directive('dndList', ['$parse', '$timeout', 'dndDropEffectWorkaround', 'dndDragTypeWorkaround',
                 function($parse,   $timeout,   dndDropEffectWorkaround,   dndDragTypeWorkaround) {
    return function(scope, element, attr) {
      // While an element is dragged over the list, this placeholder element is inserted
      // at the location where the element would be inserted after dropping
      var placeholder = getPlaceholderElement();
      var placeholderNode = placeholder[0];
      var listNode = element[0];
      placeholder.remove();

      var horizontal = attr.dndHorizontalList && scope.$eval(attr.dndHorizontalList);
      var externalSources = attr.dndExternalSources && scope.$eval(attr.dndExternalSources);

      /**
       * The dragover event is triggered "every few hundred milliseconds" while an element
       * is being dragged over our list, or over an child element.
       */
      element.on('dragover', function(event) {
        event = event.originalEvent || event;

        if (!isDropAllowed(event)) return true;

        // First of all, make sure that the placeholder is shown
        // This is especially important if the list is empty
        if (placeholderNode.parentNode != listNode) {
          element.append(placeholder);
        }

        if (event.target !== listNode) {
          // Try to find the node direct directly below the list node.
          var listItemNode = event.target;
          while (listItemNode.parentNode !== listNode && listItemNode.parentNode) {
            listItemNode = listItemNode.parentNode;
          }

          if (listItemNode.parentNode === listNode && listItemNode !== placeholderNode) {
            // If the mouse pointer is in the upper half of the child element,
            // we place it before the child element, otherwise below it.
            if (isMouseInFirstHalf(event, listItemNode)) {
              listNode.insertBefore(placeholderNode, listItemNode);
            } else {
              listNode.insertBefore(placeholderNode, listItemNode.nextSibling);
            }
          }
        } else {
          // This branch is reached when we are dragging directly over the list element.
          // Usually we wouldn't need to do anything here, but the IE does not fire it's
          // events for the child element, only for the list directly. Therefore we repeat
          // the positioning algorithm for IE here.
          if (isMouseInFirstHalf(event, placeholderNode, true)) {
            // Check if we should move the placeholder element one spot towards the top.
            // Note that display none elements will have offsetTop and offsetHeight set to
            // zero, therefore we need a special check for them.
            while (placeholderNode.previousElementSibling
                 && (isMouseInFirstHalf(event, placeholderNode.previousElementSibling, true)
                 || placeholderNode.previousElementSibling.offsetHeight === 0)) {
              listNode.insertBefore(placeholderNode, placeholderNode.previousElementSibling);
            }
          } else {
            // Check if we should move the placeholder element one spot towards the bottom
            while (placeholderNode.nextElementSibling &&
                 !isMouseInFirstHalf(event, placeholderNode.nextElementSibling, true)) {
              listNode.insertBefore(placeholderNode,
                  placeholderNode.nextElementSibling.nextElementSibling);
            }
          }
        }

        // At this point we invoke the callback, which still can disallow the drop.
        // We can't do this earlier because we want to pass the index of the placeholder.
        if (attr.dndDragover && !invokeCallback(attr.dndDragover, event, getPlaceholderIndex())) {
          return stopDragover();
        }

        element.addClass("dndDragover");
        event.preventDefault();
        event.stopPropagation();
        return false;
      });

      /**
       * When the element is dropped, we use the position of the placeholder element as the
       * position where we insert the transferred data. This assumes that the list has exactly
       * one child element per array element.
       */
      element.on('drop', function(event) {
        event = event.originalEvent || event;

        if (!isDropAllowed(event)) return true;

        // The default behavior in Firefox is to interpret the dropped element as URL and
        // forward to it. We want to prevent that even if our drop is aborted.
        event.preventDefault();

        // Unserialize the data that was serialized in dragstart. According to the HTML5 specs,
        // the "Text" drag type will be converted to text/plain, but IE does not do that.
        var data = event.dataTransfer.getData("Text") || event.dataTransfer.getData("text/plain");
        var transferredObject;
        try {
          transferredObject = JSON.parse(data);
        } catch(e) {
          return stopDragover();
        }

        // Invoke the callback, which can transform the transferredObject and even abort the drop.
        var index = getPlaceholderIndex();
        if (attr.dndDrop) {
          transferredObject = invokeCallback(attr.dndDrop, event, index, transferredObject);
          if (!transferredObject) {
            return stopDragover();
          }
        }

        // Retrieve the JSON array and insert the transferred object into it.
        var targetArray = scope.$eval(attr.dndList);
        scope.$apply(function() {
          targetArray.splice(index, 0, transferredObject);
        });
        invokeCallback(attr.dndInserted, event, index, transferredObject);

        // In Chrome on Windows the dropEffect will always be none...
        // We have to determine the actual effect manually from the allowed effects
        if (event.dataTransfer.dropEffect === "none") {
          if (event.dataTransfer.effectAllowed === "copy" ||
              event.dataTransfer.effectAllowed === "move") {
            dndDropEffectWorkaround.dropEffect = event.dataTransfer.effectAllowed;
          } else {
            dndDropEffectWorkaround.dropEffect = event.ctrlKey ? "copy" : "move";
          }
        } else {
          dndDropEffectWorkaround.dropEffect = event.dataTransfer.dropEffect;
        }

        // Clean up
        stopDragover();
        event.stopPropagation();
        return false;
      });

      /**
       * We have to remove the placeholder when the element is no longer dragged over our list. The
       * problem is that the dragleave event is not only fired when the element leaves our list,
       * but also when it leaves a child element -- so practically it's fired all the time. As a
       * workaround we wait a few milliseconds and then check if the dndDragover class was added
       * again. If it is there, dragover must have been called in the meantime, i.e. the element
       * is still dragging over the list. If you know a better way of doing this, please tell me!
       */
      element.on('dragleave', function(event) {
        event = event.originalEvent || event;

        element.removeClass("dndDragover");
        $timeout(function() {
          if (!element.hasClass("dndDragover")) {
            placeholder.remove();
          }
        }, 100);
      });

      /**
       * Checks whether the mouse pointer is in the first half of the given target element.
       *
       * In Chrome we can just use offsetY, but in Firefox we have to use layerY, which only
       * works if the child element has position relative. In IE the events are only triggered
       * on the listNode instead of the listNodeItem, therefore the mouse positions are
       * relative to the parent element of targetNode.
       */
      function isMouseInFirstHalf(event, targetNode, relativeToParent) {
        var mousePointer = horizontal ? (event.offsetX || event.layerX)
                                      : (event.offsetY || event.layerY);
        var targetSize = horizontal ? targetNode.offsetWidth : targetNode.offsetHeight;
        var targetPosition = horizontal ? targetNode.offsetLeft : targetNode.offsetTop;
        targetPosition = relativeToParent ? targetPosition : 0;
        return mousePointer < targetPosition + targetSize / 2;
      }

      /**
       * Tries to find a child element that has the dndPlaceholder class set. If none was found, a
       * new li element is created.
       */
      function getPlaceholderElement() {
        var placeholder;
        angular.forEach(element.children(), function(childNode) {
          var child = angular.element(childNode);
          if (child.hasClass('dndPlaceholder')) {
            placeholder = child;
          }
        });
        return placeholder || angular.element("<li class='dndPlaceholder'></li>");
      }

      /**
       * We use the position of the placeholder node to determine at which position of the array the
       * object needs to be inserted
       */
      function getPlaceholderIndex() {
        return Array.prototype.indexOf.call(listNode.children, placeholderNode);
      }

      /**
       * Checks various conditions that must be fulfilled for a drop to be allowed
       */
      function isDropAllowed(event) {
        // Disallow drop from external source unless it's allowed explicitly.
        if (!dndDragTypeWorkaround.isDragging && !externalSources) return false;

        // Check mimetype. Usually we would use a custom drag type instead of Text, but IE doesn't
        // support that.
        if (!hasTextMimetype(event.dataTransfer.types)) return false;

        // Now check the dnd-allowed-types against the type of the incoming element. For drops from
        // external sources we don't know the type, so it will need to be checked via dnd-drop.
        if (attr.dndAllowedTypes && dndDragTypeWorkaround.isDragging) {
          var allowed = scope.$eval(attr.dndAllowedTypes);
          if (angular.isArray(allowed) && allowed.indexOf(dndDragTypeWorkaround.dragType) === -1) {
            return false;
          }
        }

        // Check whether droping is disabled completely
        if (attr.dndDisableIf && scope.$eval(attr.dndDisableIf)) return false;

        return true;
      }

      /**
       * Small helper function that cleans up if we aborted a drop.
       */
      function stopDragover() {
        placeholder.remove();
        element.removeClass("dndDragover");
        return true;
      }

      /**
       * Invokes a callback with some interesting parameters and returns the callbacks return value.
       */
      function invokeCallback(expression, event, index, item) {
        return $parse(expression)(scope, {
          event: event,
          index: index,
          item: item || undefined,
          external: !dndDragTypeWorkaround.isDragging,
          type: dndDragTypeWorkaround.isDragging ? dndDragTypeWorkaround.dragType : undefined
        });
      }

      /**
       * Check if the dataTransfer object contains a drag type that we can handle. In old versions
       * of IE the types collection will not even be there, so we just assume a drop is possible.
       */
      function hasTextMimetype(types) {
        if (!types) return true;
        for (var i = 0; i < types.length; i++) {
          if (types[i] === "Text" || types[i] === "text/plain") return true;
        }

        return false;
      }
    };
  }])

  /**
   * Use the dnd-nodrag attribute inside of dnd-draggable elements to prevent them from starting
   * drag operations. This is especially useful if you want to use input elements inside of
   * dnd-draggable elements or create specific handle elements.
   */
  .directive('dndNodrag', function() {
    return function(scope, element, attr) {
      // Set as draggable so that we can cancel the events explicitly
      element.attr("draggable", "true");

      /**
       * Since the element is draggable, the browser's default operation is to drag it on dragstart.
       * We will prevent that and also stop the event from bubbling up.
       */
      element.on('dragstart', function(event) {
        event = event.originalEvent || event;

        // If a child element already reacted to dragstart and set a dataTransfer object, we will
        // allow that. For example, this is the case for user selections inside of input elements.
        if (!(event.dataTransfer.types && event.dataTransfer.types.length)) {
          event.preventDefault();
        }
        event.stopPropagation();
      });

      /**
       * Stop propagation of dragend events, otherwise dnd-moved might be triggered and the element
       * would be removed.
       */
      element.on('dragend', function(event) {
        event = event.originalEvent || event;
        event.stopPropagation();
      });
    };
  })

  /**
   * This workaround handles the fact that Internet Explorer does not support drag types other than
   * "Text" and "URL". That means we can not know whether the data comes from one of our elements or
   * is just some other data like a text selection. As a workaround we save the isDragging flag in
   * here. When a dropover event occurs, we only allow the drop if we are already dragging, because
   * that means the element is ours.
   */
  .factory('dndDragTypeWorkaround', function(){ return {} })

  /**
   * Chrome on Windows does not set the dropEffect field, which we need in dragend to determine
   * whether a drag operation was successful. Therefore we have to maintain it in this global
   * variable. The bug report for that has been open for years:
   * https://code.google.com/p/chromium/issues/detail?id=39399
   */
  .factory('dndDropEffectWorkaround', function(){ return {} });

/* jquery.nicescroll
-- version 3.6.6
-- copyright 2015-11-17 InuYaksa*2015
-- licensed under the MIT
--
-- http://nicescroll.areaaperta.com/
-- https://github.com/inuyaksa/jquery.nicescroll
--
*/

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS.
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
}(function(jQuery) {
  "use strict";

  // globals
  var domfocus = false;
  var mousefocus = false;
  var tabindexcounter = 0;
  var ascrailcounter = 2000;
  var globalmaxzindex = 0;

  var $ = jQuery; // sandbox

  // http://stackoverflow.com/questions/2161159/get-script-path
  function getScriptPath() {
    var scripts = document.getElementsByTagName('script');
    var path = scripts.length ? scripts[scripts.length - 1].src.split('?')[0] : '';
    return (path.split('/').length > 0) ? path.split('/').slice(0, -1).join('/') + '/' : '';
  }

  var vendors = ['webkit','ms','moz','o'];

  var setAnimationFrame = window.requestAnimationFrame || false;
  var clearAnimationFrame = window.cancelAnimationFrame || false;

  if (!setAnimationFrame) {  // legacy detection
    for (var vx in vendors) {
      var v = vendors[vx];
      if (!setAnimationFrame) setAnimationFrame = window[v + 'RequestAnimationFrame'];
      if (!clearAnimationFrame) clearAnimationFrame = window[v + 'CancelAnimationFrame'] || window[v + 'CancelRequestAnimationFrame'];
    }
  }

  var ClsMutationObserver = window.MutationObserver || window.WebKitMutationObserver || false;

  var _globaloptions = {
    zindex: "auto",
    cursoropacitymin: 0,
    cursoropacitymax: 1,
    cursorcolor: "#424242",
    cursorwidth: "5px",
    cursorborder: "1px solid #fff",
    cursorborderradius: "5px",
    scrollspeed: 60,
    mousescrollstep: 8 * 3,
    touchbehavior: false,
    hwacceleration: true,
    usetransition: true,
    boxzoom: false,
    dblclickzoom: true,
    gesturezoom: true,
    grabcursorenabled: true,
    autohidemode: true,
    background: "",
    iframeautoresize: true,
    cursorminheight: 32,
    preservenativescrolling: true,
    railoffset: false,
    railhoffset: false,
    bouncescroll: true,
    spacebarenabled: true,
    railpadding: {
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    },
    disableoutline: true,
    horizrailenabled: true,
    railalign: "right",
    railvalign: "bottom",
    enabletranslate3d: true,
    enablemousewheel: true,
    enablekeyboard: true,
    smoothscroll: true,
    sensitiverail: true,
    enablemouselockapi: true,
    //      cursormaxheight:false,
    cursorfixedheight: false,
    directionlockdeadzone: 6,
    hidecursordelay: 400,
    nativeparentscrolling: true,
    enablescrollonselection: true,
    overflowx: true,
    overflowy: true,
    cursordragspeed: 0.3,
    rtlmode: "auto",
    cursordragontouch: false,
    oneaxismousemode: "auto",
    scriptpath: getScriptPath(),
    preventmultitouchscrolling: true
  };

  var browserdetected = false;

  var getBrowserDetection = function() {

    if (browserdetected) return browserdetected;

    var _el = document.createElement('DIV'),
        _style = _el.style,
        _agent = navigator.userAgent,
        _platform = navigator.platform,
        d = {};

    d.haspointerlock = "pointerLockElement" in document || "webkitPointerLockElement" in document || "mozPointerLockElement" in document;

    d.isopera = ("opera" in window); // 12-
    d.isopera12 = (d.isopera && ("getUserMedia" in navigator));
    d.isoperamini = (Object.prototype.toString.call(window.operamini) === "[object OperaMini]");

    d.isie = (("all" in document) && ("attachEvent" in _el) && !d.isopera); //IE10-
    d.isieold = (d.isie && !("msInterpolationMode" in _style)); // IE6 and older
    d.isie7 = d.isie && !d.isieold && (!("documentMode" in document) || (document.documentMode == 7));
    d.isie8 = d.isie && ("documentMode" in document) && (document.documentMode == 8);
    d.isie9 = d.isie && ("performance" in window) && (document.documentMode >= 9);
    d.isie10 = d.isie && ("performance" in window) && (document.documentMode == 10);
    d.isie11 = ("msRequestFullscreen" in _el) && (document.documentMode >= 11); // IE11+
		d.isieedge = (navigator.userAgent.match(/Edge\/12\./));

    d.isie9mobile = /iemobile.9/i.test(_agent); //wp 7.1 mango
    if (d.isie9mobile) d.isie9 = false;
    d.isie7mobile = (!d.isie9mobile && d.isie7) && /iemobile/i.test(_agent); //wp 7.0

    d.ismozilla = ("MozAppearance" in _style);

    d.iswebkit = ("WebkitAppearance" in _style);

    d.ischrome = ("chrome" in window);
    d.ischrome22 = (d.ischrome && d.haspointerlock);
    d.ischrome26 = (d.ischrome && ("transition" in _style)); // issue with transform detection (maintain prefix)

    d.cantouch = ("ontouchstart" in document.documentElement) || ("ontouchstart" in window); // detection for Chrome Touch Emulation
    d.hasmstouch = (window.MSPointerEvent || false); // IE10 pointer events
    d.hasw3ctouch = (window.PointerEvent || false) && ((navigator.MaxTouchPoints > 0)||(navigator.msMaxTouchPoints > 0)); //IE11 pointer events, following W3C Pointer Events spec

    d.ismac = /^mac$/i.test(_platform);

    d.isios = (d.cantouch && /iphone|ipad|ipod/i.test(_platform));
    d.isios4 = ((d.isios) && !("seal" in Object));
    d.isios7 = ((d.isios)&&("webkitHidden" in document));  //iOS 7+

    d.isandroid = (/android/i.test(_agent));

    d.haseventlistener = ("addEventListener" in _el);
    
    d.trstyle = false;
    d.hastransform = false;
    d.hastranslate3d = false;
    d.transitionstyle = false;
    d.hastransition = false;
    d.transitionend = false;

    var a;
    var check = ['transform', 'msTransform', 'webkitTransform', 'MozTransform', 'OTransform'];    
    for (a = 0; a < check.length; a++) {
      if (typeof _style[check[a]] != "undefined") {
        d.trstyle = check[a];
        break;
      }
    }
    d.hastransform = (!!d.trstyle);
    if (d.hastransform) {
      _style[d.trstyle] = "translate3d(1px,2px,3px)";
      d.hastranslate3d = /translate3d/.test(_style[d.trstyle]);
    }

    d.transitionstyle = false;
    d.prefixstyle = '';
    d.transitionend = false;
    check = ['transition', 'webkitTransition', 'msTransition', 'MozTransition', 'OTransition', 'OTransition', 'KhtmlTransition'];
    var prefix = ['', '-webkit-', '-ms-', '-moz-', '-o-', '-o', '-khtml-'];
    var evs = ['transitionend', 'webkitTransitionEnd', 'msTransitionEnd',  'transitionend', 'otransitionend', 'oTransitionEnd', 'KhtmlTransitionEnd'];
    for (a = 0; a < check.length; a++) {
      if (check[a] in _style) {
        d.transitionstyle = check[a];
        d.prefixstyle = prefix[a];
        d.transitionend = evs[a];
        break;
      }
    }
    if (d.ischrome26) {  // always use prefix
      d.prefixstyle = prefix[1];
    }

    d.hastransition = (d.transitionstyle);

    function detectCursorGrab() {
      var lst = ['-webkit-grab', '-moz-grab', 'grab'];
      if ((d.ischrome && !d.ischrome22) || d.isie) lst = []; // force setting for IE returns false positive and chrome cursor bug
      for (var a = 0; a < lst.length; a++) {
        var p = lst[a];
        _style.cursor = p;
        if (_style.cursor == p) return p;
      }
      return 'url(//mail.google.com/mail/images/2/openhand.cur),n-resize'; // thank you google for custom cursor!
    }
    d.cursorgrabvalue = detectCursorGrab();

    d.hasmousecapture = ("setCapture" in _el);

    d.hasMutationObserver = (ClsMutationObserver !== false);

    _el = null; //memory released

    browserdetected = d;

    return d;
  };

  var NiceScrollClass = function(myopt, me) {

    var self = this;

    this.version = '3.6.6';
    this.name = 'nicescroll';

    this.me = me;

    this.opt = {
      doc: $("body"),
      win: false
    };

    $.extend(this.opt, _globaloptions);  // clone opts

    // Options for internal use
    this.opt.snapbackspeed = 80;

    if (myopt || false) {
      for (var a in self.opt) {
        if (typeof myopt[a] != "undefined") self.opt[a] = myopt[a];
      }
    }

    this.doc = self.opt.doc;
    this.iddoc = (this.doc && this.doc[0]) ? this.doc[0].id || '' : '';
    this.ispage = /^BODY|HTML/.test((self.opt.win) ? self.opt.win[0].nodeName : this.doc[0].nodeName);
    this.haswrapper = (self.opt.win !== false);
    this.win = self.opt.win || (this.ispage ? $(window) : this.doc);
    this.docscroll = (this.ispage && !this.haswrapper) ? $(window) : this.win;
    this.body = $("body");
    this.viewport = false;

    this.isfixed = false;

    this.iframe = false;
    this.isiframe = ((this.doc[0].nodeName == 'IFRAME') && (this.win[0].nodeName == 'IFRAME'));

    this.istextarea = (this.win[0].nodeName == 'TEXTAREA');

    this.forcescreen = false; //force to use screen position on events

    this.canshowonmouseevent = (self.opt.autohidemode != "scroll");

    // Events jump table    
    this.onmousedown = false;
    this.onmouseup = false;
    this.onmousemove = false;
    this.onmousewheel = false;
    this.onkeypress = false;
    this.ongesturezoom = false;
    this.onclick = false;

    // Nicescroll custom events
    this.onscrollstart = false;
    this.onscrollend = false;
    this.onscrollcancel = false;

    this.onzoomin = false;
    this.onzoomout = false;

    // Let's start!  
    this.view = false;
    this.page = false;

    this.scroll = {
      x: 0,
      y: 0
    };
    this.scrollratio = {
      x: 0,
      y: 0
    };
    this.cursorheight = 20;
    this.scrollvaluemax = 0;

    this.isrtlmode = (this.opt.rtlmode == "auto") ? ((this.win[0] == window ? this.body : this.win).css("direction") == "rtl") : (this.opt.rtlmode === true);
    //    this.checkrtlmode = false;
    
    this.scrollrunning = false;

    this.scrollmom = false;

    this.observer        = false;  // observer div changes
    this.observerremover = false;  // observer on parent for remove detection
    this.observerbody    = false;  // observer on body for position change

    do {
      this.id = "ascrail" + (ascrailcounter++);
    } while (document.getElementById(this.id));

    this.rail = false;
    this.cursor = false;
    this.cursorfreezed = false;
    this.selectiondrag = false;

    this.zoom = false;
    this.zoomactive = false;

    this.hasfocus = false;
    this.hasmousefocus = false;

    this.visibility = true;
    this.railslocked = false;  // locked by resize
    this.locked = false;  // prevent lost of locked status sets by user
    this.hidden = false; // rails always hidden
    this.cursoractive = true; // user can interact with cursors

    this.wheelprevented = false; //prevent mousewheel event

    this.overflowx = self.opt.overflowx;
    this.overflowy = self.opt.overflowy;

    this.nativescrollingarea = false;
    this.checkarea = 0;

    this.events = []; // event list for unbind

    this.saved = {};  // style saved

    this.delaylist = {};
    this.synclist = {};

    this.lastdeltax = 0;
    this.lastdeltay = 0;

    this.detected = getBrowserDetection();

    var cap = $.extend({}, this.detected);

    this.canhwscroll = (cap.hastransform && self.opt.hwacceleration);
    this.ishwscroll = (this.canhwscroll && self.haswrapper);

    this.hasreversehr = (this.isrtlmode&&!cap.iswebkit);  //RTL mode with reverse horizontal axis
    
    this.istouchcapable = false; // desktop devices with touch screen support

    //## Check WebKit-based desktop with touch support
    //## + Firefox 18 nightly build (desktop) false positive (or desktop with touch support)
    if (cap.cantouch && !cap.isios && !cap.isandroid && (cap.iswebkit || cap.ismozilla)) {
      this.istouchcapable = true;
      cap.cantouch = false; // parse normal desktop events
    }

    //## disable MouseLock API on user request
    if (!self.opt.enablemouselockapi) {
      cap.hasmousecapture = false;
      cap.haspointerlock = false;
    }

/* deprecated
    this.delayed = function(name, fn, tm, lazy) {
    };
*/    

    this.debounced = function(name, fn, tm) {
      var dd = self.delaylist[name];
      self.delaylist[name] = fn;
      if (!dd) {
        self.debouncedelayed =  setTimeout(function() {
					if (!self) return;
          var fn = self.delaylist[name];
          self.delaylist[name] = false;
          fn.call(self);
        }, tm);
      }
    };

    var _onsync = false;

    this.synched = function(name, fn) {

      function requestSync() {
        if (_onsync) return;
        setAnimationFrame(function() {
          _onsync = false;
          for (var nn in self.synclist) {
            var fn = self.synclist[nn];
            if (fn) fn.call(self);
            self.synclist[nn] = false;
          }
        });
        _onsync = true;
      }

      self.synclist[name] = fn;
      requestSync();
      return name;
    };

    this.unsynched = function(name) {
      if (self.synclist[name]) self.synclist[name] = false;
    };

    this.css = function(el, pars) { // save & set
      for (var n in pars) {
        self.saved.css.push([el, n, el.css(n)]);
        el.css(n, pars[n]);
      }
    };

    this.scrollTop = function(val) {
      return (typeof val == "undefined") ? self.getScrollTop() : self.setScrollTop(val);
    };

    this.scrollLeft = function(val) {
      return (typeof val == "undefined") ? self.getScrollLeft() : self.setScrollLeft(val);
    };

    // derived by by Dan Pupius www.pupius.net
    var BezierClass = function(st, ed, spd, p1, p2, p3, p4) {
    
      this.st = st;
      this.ed = ed;
      this.spd = spd;

      this.p1 = p1 || 0;
      this.p2 = p2 || 1;
      this.p3 = p3 || 0;
      this.p4 = p4 || 1;

      this.ts = (new Date()).getTime();
      this.df = this.ed - this.st;
    };
    BezierClass.prototype = {
      B2: function(t) {
        return 3 * t * t * (1 - t);
      },
      B3: function(t) {
        return 3 * t * (1 - t) * (1 - t);
      },
      B4: function(t) {
        return (1 - t) * (1 - t) * (1 - t);
      },
      getNow: function() {
        var nw = (new Date()).getTime();
        var pc = 1 - ((nw - this.ts) / this.spd);
        var bz = this.B2(pc) + this.B3(pc) + this.B4(pc);
        return (pc < 0) ? this.ed : this.st + Math.round(this.df * bz);
      },
      update: function(ed, spd) {
        this.st = this.getNow();
        this.ed = ed;
        this.spd = spd;
        this.ts = (new Date()).getTime();
        this.df = this.ed - this.st;
        return this;
      }
    };

    //derived from http://stackoverflow.com/questions/11236090/
    function getMatrixValues() {
      var tr = self.doc.css(cap.trstyle);
      if (tr && (tr.substr(0, 6) == "matrix")) {
        return tr.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, '').split(/, +/);
      }
      return false;
    }

    if (this.ishwscroll) {
      // hw accelerated scroll
      this.doc.translate = {
        x: 0,
        y: 0,
        tx: "0px",
        ty: "0px"
      };

      //this one can help to enable hw accel on ios6 http://indiegamr.com/ios6-html-hardware-acceleration-changes-and-how-to-fix-them/
      if (cap.hastranslate3d && cap.isios) this.doc.css("-webkit-backface-visibility", "hidden"); // prevent flickering http://stackoverflow.com/questions/3461441/      

      this.getScrollTop = function(last) {
        if (!last) {
          var mtx = getMatrixValues();
          if (mtx) return (mtx.length == 16) ? -mtx[13] : -mtx[5]; //matrix3d 16 on IE10
          if (self.timerscroll && self.timerscroll.bz) return self.timerscroll.bz.getNow();
        }
        return self.doc.translate.y;
      };

      this.getScrollLeft = function(last) {
        if (!last) {
          var mtx = getMatrixValues();
          if (mtx) return (mtx.length == 16) ? -mtx[12] : -mtx[4]; //matrix3d 16 on IE10
          if (self.timerscroll && self.timerscroll.bh) return self.timerscroll.bh.getNow();
        }
        return self.doc.translate.x;
      };

      this.notifyScrollEvent = function(el) {
        var e = document.createEvent("UIEvents");
        e.initUIEvent("scroll", false, true, window, 1);
        e.niceevent = true;
        el.dispatchEvent(e);
      };

      var cxscrollleft = (this.isrtlmode) ? 1 : -1;

      if (cap.hastranslate3d && self.opt.enabletranslate3d) {
        this.setScrollTop = function(val, silent) {
          self.doc.translate.y = val;
          self.doc.translate.ty = (val * -1) + "px";
          self.doc.css(cap.trstyle, "translate3d(" + self.doc.translate.tx + "," + self.doc.translate.ty + ",0px)");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
        this.setScrollLeft = function(val, silent) {
          self.doc.translate.x = val;
          self.doc.translate.tx = (val * cxscrollleft) + "px";
          self.doc.css(cap.trstyle, "translate3d(" + self.doc.translate.tx + "," + self.doc.translate.ty + ",0px)");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
      } else {
        this.setScrollTop = function(val, silent) {
          self.doc.translate.y = val;
          self.doc.translate.ty = (val * -1) + "px";
          self.doc.css(cap.trstyle, "translate(" + self.doc.translate.tx + "," + self.doc.translate.ty + ")");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
        this.setScrollLeft = function(val, silent) {
          self.doc.translate.x = val;
          self.doc.translate.tx = (val * cxscrollleft) + "px";
          self.doc.css(cap.trstyle, "translate(" + self.doc.translate.tx + "," + self.doc.translate.ty + ")");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
      }
    } else {
      // native scroll
      this.getScrollTop = function() {
        return self.docscroll.scrollTop();
      };
      this.setScrollTop = function(val) {
        return setTimeout(function() {self.docscroll.scrollTop(val)}, 1);
      };
      this.getScrollLeft = function() {
        if (self.detected.ismozilla && self.isrtlmode)
          return Math.abs(self.docscroll.scrollLeft());
        return self.docscroll.scrollLeft();
      };
      this.setScrollLeft = function(val) {
        return setTimeout(function() {self.docscroll.scrollLeft((self.detected.ismozilla && self.isrtlmode) ? -val : val)}, 1);
      };
    }

    this.getTarget = function(e) {
      if (!e) return false;
      if (e.target) return e.target;
      if (e.srcElement) return e.srcElement;
      return false;
    };

    this.hasParent = function(e, id) {
      if (!e) return false;
      var el = e.target || e.srcElement || e || false;
      while (el && el.id != id) {
        el = el.parentNode || false;
      }
      return (el !== false);
    };

    function getZIndex() {
      var dom = self.win;
      if ("zIndex" in dom) return dom.zIndex(); // use jQuery UI method when available
      while (dom.length > 0) {
        if (dom[0].nodeType == 9) return false;
        var zi = dom.css('zIndex');
        if (!isNaN(zi) && zi != 0) return parseInt(zi);
        dom = dom.parent();
      }
      return false;
    }

    //inspired by http://forum.jquery.com/topic/width-includes-border-width-when-set-to-thin-medium-thick-in-ie
    var _convertBorderWidth = {
      "thin": 1,
      "medium": 3,
      "thick": 5
    };

    function getWidthToPixel(dom, prop, chkheight) {
      var wd = dom.css(prop);
      var px = parseFloat(wd);
      if (isNaN(px)) {
        px = _convertBorderWidth[wd] || 0;
        var brd = (px == 3) ? ((chkheight) ? (self.win.outerHeight() - self.win.innerHeight()) : (self.win.outerWidth() - self.win.innerWidth())) : 1; //DON'T TRUST CSS
        if (self.isie8 && px) px += 1;
        return (brd) ? px : 0;
      }
      return px;
    }

    this.getDocumentScrollOffset = function() {
      return {top:window.pageYOffset||document.documentElement.scrollTop,
              left:window.pageXOffset||document.documentElement.scrollLeft};
    }
    
    this.getOffset = function() {
      if (self.isfixed) {
        var ofs = self.win.offset();  // fix Chrome auto issue (when right/bottom props only)
        var scrl = self.getDocumentScrollOffset();
        ofs.top-=scrl.top;
        ofs.left-=scrl.left;
        return ofs;  
      }
      var ww = self.win.offset();
      if (!self.viewport) return ww;      
      var vp = self.viewport.offset();
      return {
        top: ww.top - vp.top,// + self.viewport.scrollTop(),
        left: ww.left - vp.left // + self.viewport.scrollLeft()
      };
    };

    this.updateScrollBar = function(len) {
      if (self.ishwscroll) {
        self.rail.css({  //**
          height: self.win.innerHeight() - (self.opt.railpadding.top + self.opt.railpadding.bottom)
        });
        if (self.railh) self.railh.css({  //**
          width: self.win.innerWidth() - (self.opt.railpadding.left + self.opt.railpadding.right)
        });
        
      } else {
        var wpos = self.getOffset();
        var pos = {
          top: wpos.top,
          left: wpos.left  - (self.opt.railpadding.left + self.opt.railpadding.right)
        };
        pos.top += getWidthToPixel(self.win, 'border-top-width', true);
        pos.left += (self.rail.align) ? self.win.outerWidth() - getWidthToPixel(self.win, 'border-right-width') - self.rail.width : getWidthToPixel(self.win, 'border-left-width');

        var off = self.opt.railoffset;
        if (off) {
          if (off.top) pos.top += off.top;
          if (off.left) pos.left += off.left;
        }
        
        if (!self.railslocked) self.rail.css({
          top: pos.top,
          left: pos.left,
          height: ((len) ? len.h : self.win.innerHeight()) - (self.opt.railpadding.top + self.opt.railpadding.bottom)
        });

        if (self.zoom) {
          self.zoom.css({
            top: pos.top + 1,
            left: (self.rail.align == 1) ? pos.left - 20 : pos.left + self.rail.width + 4
          });
        }

        if (self.railh && !self.railslocked) {
          var pos = {
            top: wpos.top,
            left: wpos.left
          };
          var off = self.opt.railhoffset;
          if (!!off) {
            if (!!off.top) pos.top += off.top;
            if (!!off.left) pos.left += off.left;
          }
          var y = (self.railh.align) ? pos.top + getWidthToPixel(self.win, 'border-top-width', true) + self.win.innerHeight() - self.railh.height : pos.top + getWidthToPixel(self.win, 'border-top-width', true);
          var x = pos.left + getWidthToPixel(self.win, 'border-left-width');
          self.railh.css({
            top: y  - (self.opt.railpadding.top + self.opt.railpadding.bottom),
            left: x,
            width: self.railh.width
          });
        }


      }
    };

    this.doRailClick = function(e, dbl, hr) {
      var fn, pg, cur, pos;

      if (self.railslocked) return;
      self.cancelEvent(e);

      if (dbl) {
        fn = (hr) ? self.doScrollLeft : self.doScrollTop;
        cur = (hr) ? ((e.pageX - self.railh.offset().left - (self.cursorwidth / 2)) * self.scrollratio.x) : ((e.pageY - self.rail.offset().top - (self.cursorheight / 2)) * self.scrollratio.y);
        fn(cur);
      } else {
        fn = (hr) ? self.doScrollLeftBy : self.doScrollBy;
        cur = (hr) ? self.scroll.x : self.scroll.y;
        pos = (hr) ? e.pageX - self.railh.offset().left : e.pageY - self.rail.offset().top;
        pg = (hr) ? self.view.w : self.view.h;
        fn((cur >= pos) ? pg: -pg);//   (cur >= pos) ? fn(pg): fn(-pg);
      }

    };

    self.hasanimationframe = (setAnimationFrame);
    self.hascancelanimationframe = (clearAnimationFrame);

    if (!self.hasanimationframe) {
      setAnimationFrame = function(fn) {
        return setTimeout(fn, 15 - Math.floor((+new Date()) / 1000) % 16);
      }; // 1000/60)};
      clearAnimationFrame = clearInterval;
    } else if (!self.hascancelanimationframe) clearAnimationFrame = function() {
      self.cancelAnimationFrame = true;
    };

    this.init = function() {

      self.saved.css = [];

      if (cap.isie7mobile) return true; // SORRY, DO NOT WORK!
      if (cap.isoperamini) return true; // SORRY, DO NOT WORK!

      if (cap.hasmstouch) self.css((self.ispage) ? $("html") : self.win, {
        '-ms-touch-action': 'none'
      });

      self.zindex = "auto";
      if (!self.ispage && self.opt.zindex == "auto") {
        self.zindex = getZIndex() || "auto";
      } else {
        self.zindex = self.opt.zindex;
      }

      if (!self.ispage && self.zindex != "auto") {
        if (self.zindex > globalmaxzindex) globalmaxzindex = self.zindex;
      }

      if (self.isie && self.zindex == 0 && self.opt.zindex == "auto") { // fix IE auto == 0
        self.zindex = "auto";
      }

      if (!self.ispage || (!cap.cantouch && !cap.isieold && !cap.isie9mobile)) {

        var cont = self.docscroll;
        if (self.ispage) cont = (self.haswrapper) ? self.win : self.doc;

        if (!cap.isie9mobile) self.css(cont, {
          'overflow-y': 'hidden'
        });

        if (self.ispage && cap.isie7) {
          if (self.doc[0].nodeName == 'BODY') self.css($("html"), {
            'overflow-y': 'hidden'
          }); //IE7 double scrollbar issue
          else if (self.doc[0].nodeName == 'HTML') self.css($("body"), {
            'overflow-y': 'hidden'
          }); //IE7 double scrollbar issue
        }

        if (cap.isios && !self.ispage && !self.haswrapper) self.css($("body"), {
          "-webkit-overflow-scrolling": "touch"
        }); //force hw acceleration

        var cursor = $(document.createElement('div'));
        cursor.css({
          position: "relative",
          top: 0,
          "float": "right",
          width: self.opt.cursorwidth,
          height: "0px",
          'background-color': self.opt.cursorcolor,
          border: self.opt.cursorborder,
          'background-clip': 'padding-box',
          '-webkit-border-radius': self.opt.cursorborderradius,
          '-moz-border-radius': self.opt.cursorborderradius,
          'border-radius': self.opt.cursorborderradius
        });

        cursor.hborder = parseFloat(cursor.outerHeight() - cursor.innerHeight());
        
        cursor.addClass('nicescroll-cursors');
        
        self.cursor = cursor;

        var rail = $(document.createElement('div'));
        rail.attr('id', self.id);
        rail.addClass('nicescroll-rails nicescroll-rails-vr');

        var v, a, kp = ["left","right","top","bottom"];  //**
        for (var n in kp) {
          a = kp[n];
          v = self.opt.railpadding[a];
          (v) ? rail.css("padding-"+a,v+"px") : self.opt.railpadding[a] = 0;
        }

        rail.append(cursor);

        rail.width = Math.max(parseFloat(self.opt.cursorwidth), cursor.outerWidth());
        rail.css({
          width: rail.width + "px",
          'zIndex': self.zindex,
          "background": self.opt.background,
          cursor: "default"
        });

        rail.visibility = true;
        rail.scrollable = true;

        rail.align = (self.opt.railalign == "left") ? 0 : 1;

        self.rail = rail;

        self.rail.drag = false;

        var zoom = false;
        if (self.opt.boxzoom && !self.ispage && !cap.isieold) {
          zoom = document.createElement('div');

          self.bind(zoom, "click", self.doZoom);
          self.bind(zoom, "mouseenter", function() {
            self.zoom.css('opacity', self.opt.cursoropacitymax);
          });
          self.bind(zoom, "mouseleave", function() {
            self.zoom.css('opacity', self.opt.cursoropacitymin);
          });

          self.zoom = $(zoom);
          self.zoom.css({
            "cursor": "pointer",
            'z-index': self.zindex,
            'backgroundImage': 'url(' + self.opt.scriptpath + 'zoomico.png)',
            'height': 18,
            'width': 18,
            'backgroundPosition': '0px 0px'
          });
          if (self.opt.dblclickzoom) self.bind(self.win, "dblclick", self.doZoom);
          if (cap.cantouch && self.opt.gesturezoom) {
            self.ongesturezoom = function(e) {
              if (e.scale > 1.5) self.doZoomIn(e);
              if (e.scale < 0.8) self.doZoomOut(e);
              return self.cancelEvent(e);
            };
            self.bind(self.win, "gestureend", self.ongesturezoom);
          }
        }

        // init HORIZ

        self.railh = false;
        var railh;

        if (self.opt.horizrailenabled) {

          self.css(cont, {
            'overflow-x': 'hidden'
          });

          var cursor = $(document.createElement('div'));
          cursor.css({
            position: "absolute",
            top: 0,
            height: self.opt.cursorwidth,
            width: "0px",
            'background-color': self.opt.cursorcolor,
            border: self.opt.cursorborder,
            'background-clip': 'padding-box',
            '-webkit-border-radius': self.opt.cursorborderradius,
            '-moz-border-radius': self.opt.cursorborderradius,
            'border-radius': self.opt.cursorborderradius
          });

          if (cap.isieold) cursor.css({'overflow':'hidden'});  //IE6 horiz scrollbar issue
          
          cursor.wborder = parseFloat(cursor.outerWidth() - cursor.innerWidth());
          
          cursor.addClass('nicescroll-cursors');
          
          self.cursorh = cursor;

          railh = $(document.createElement('div'));
          railh.attr('id', self.id + '-hr');
          railh.addClass('nicescroll-rails nicescroll-rails-hr');
          railh.height = Math.max(parseFloat(self.opt.cursorwidth), cursor.outerHeight());
          railh.css({
            height: railh.height + "px",
            'zIndex': self.zindex,
            "background": self.opt.background
          });

          railh.append(cursor);

          railh.visibility = true;
          railh.scrollable = true;

          railh.align = (self.opt.railvalign == "top") ? 0 : 1;

          self.railh = railh;

          self.railh.drag = false;

        }

        //        

        if (self.ispage) {
          rail.css({
            position: "fixed",
            top: "0px",
            height: "100%"
          });
          (rail.align) ? rail.css({
            right: "0px"
          }): rail.css({
            left: "0px"
          });
          self.body.append(rail);
          if (self.railh) {
            railh.css({
              position: "fixed",
              left: "0px",
              width: "100%"
            });
            (railh.align) ? railh.css({
              bottom: "0px"
            }): railh.css({
              top: "0px"
            });
            self.body.append(railh);
          }
        } else {
          if (self.ishwscroll) {
            if (self.win.css('position') == 'static') self.css(self.win, {
              'position': 'relative'
            });
            var bd = (self.win[0].nodeName == 'HTML') ? self.body : self.win;
            $(bd).scrollTop(0).scrollLeft(0);  // fix rail position if content already scrolled
            if (self.zoom) {
              self.zoom.css({
                position: "absolute",
                top: 1,
                right: 0,
                "margin-right": rail.width + 4
              });
              bd.append(self.zoom);
            }
            rail.css({
              position: "absolute",
              top: 0
            });
            (rail.align) ? rail.css({
              right: 0
            }): rail.css({
              left: 0
            });
            bd.append(rail);
            if (railh) {
              railh.css({
                position: "absolute",
                left: 0,
                bottom: 0
              });
              (railh.align) ? railh.css({
                bottom: 0
              }): railh.css({
                top: 0
              });
              bd.append(railh);
            }
          } else {
            self.isfixed = (self.win.css("position") == "fixed");
            var rlpos = (self.isfixed) ? "fixed" : "absolute";

            if (!self.isfixed) self.viewport = self.getViewport(self.win[0]);
            if (self.viewport) {
              self.body = self.viewport;
              if ((/fixed|absolute/.test(self.viewport.css("position"))) == false) self.css(self.viewport, {
                "position": "relative"
              });
            }

            rail.css({
              position: rlpos
            });
            if (self.zoom) self.zoom.css({
              position: rlpos
            });
            self.updateScrollBar();
            self.body.append(rail);
            if (self.zoom) self.body.append(self.zoom);
            if (self.railh) {
              railh.css({
                position: rlpos
              });
              self.body.append(railh);
            }
          }

          if (cap.isios) self.css(self.win, {
            '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
            '-webkit-touch-callout': 'none'
          }); // prevent grey layer on click

          if (cap.isie && self.opt.disableoutline) self.win.attr("hideFocus", "true"); // IE, prevent dotted rectangle on focused div
          if (cap.iswebkit && self.opt.disableoutline) self.win.css({"outline": "none"});  // Webkit outline
          //if (cap.isopera&&self.opt.disableoutline) self.win.css({"outline":"0"});  // Opera 12- to test [TODO]

        }

        if (self.opt.autohidemode === false) {
          self.autohidedom = false;
          self.rail.css({
            opacity: self.opt.cursoropacitymax
          });
          if (self.railh) self.railh.css({
            opacity: self.opt.cursoropacitymax
          });
        } else if ((self.opt.autohidemode === true) || (self.opt.autohidemode === "leave")) {
          self.autohidedom = $().add(self.rail);
          if (cap.isie8) self.autohidedom = self.autohidedom.add(self.cursor);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.railh);
          if (self.railh && cap.isie8) self.autohidedom = self.autohidedom.add(self.cursorh);
        } else if (self.opt.autohidemode == "scroll") {
          self.autohidedom = $().add(self.rail);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.railh);
        } else if (self.opt.autohidemode == "cursor") {
          self.autohidedom = $().add(self.cursor);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.cursorh);
        } else if (self.opt.autohidemode == "hidden") {
          self.autohidedom = false;
          self.hide();
          self.railslocked = false;
        }

        if (cap.isie9mobile) {

          self.scrollmom = new ScrollMomentumClass2D(self);

          self.onmangotouch = function() {
            var py = self.getScrollTop();
            var px = self.getScrollLeft();

            if ((py == self.scrollmom.lastscrolly) && (px == self.scrollmom.lastscrollx)) return true;

            var dfy = py - self.mangotouch.sy;
            var dfx = px - self.mangotouch.sx;
            var df = Math.round(Math.sqrt(Math.pow(dfx, 2) + Math.pow(dfy, 2)));
            if (df == 0) return;

            var dry = (dfy < 0) ? -1 : 1;
            var drx = (dfx < 0) ? -1 : 1;

            var tm = +new Date();
            if (self.mangotouch.lazy) clearTimeout(self.mangotouch.lazy);

            if (((tm - self.mangotouch.tm) > 80) || (self.mangotouch.dry != dry) || (self.mangotouch.drx != drx)) {
              self.scrollmom.stop();
              self.scrollmom.reset(px, py);
              self.mangotouch.sy = py;
              self.mangotouch.ly = py;
              self.mangotouch.sx = px;
              self.mangotouch.lx = px;
              self.mangotouch.dry = dry;
              self.mangotouch.drx = drx;
              self.mangotouch.tm = tm;
            } else {

              self.scrollmom.stop();
              self.scrollmom.update(self.mangotouch.sx - dfx, self.mangotouch.sy - dfy);
              self.mangotouch.tm = tm;

              var ds = Math.max(Math.abs(self.mangotouch.ly - py), Math.abs(self.mangotouch.lx - px));
              self.mangotouch.ly = py;
              self.mangotouch.lx = px;

              if (ds > 2) {
                self.mangotouch.lazy = setTimeout(function() {
                  self.mangotouch.lazy = false;
                  self.mangotouch.dry = 0;
                  self.mangotouch.drx = 0;
                  self.mangotouch.tm = 0;
                  self.scrollmom.doMomentum(30);
                }, 100);
              }
            }
          };

          var top = self.getScrollTop();
          var lef = self.getScrollLeft();
          self.mangotouch = {
            sy: top,
            ly: top,
            dry: 0,
            sx: lef,
            lx: lef,
            drx: 0,
            lazy: false,
            tm: 0
          };

          self.bind(self.docscroll, "scroll", self.onmangotouch);

        } else {

          if (cap.cantouch || self.istouchcapable || self.opt.touchbehavior || cap.hasmstouch) {

            self.scrollmom = new ScrollMomentumClass2D(self);

            self.ontouchstart = function(e) {
              if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
              
              self.hasmoving = false;

              if (!self.railslocked) {

                var tg;
                if (cap.hasmstouch) {
                  tg = (e.target) ? e.target : false;
                  while (tg) {
                    var nc = $(tg).getNiceScroll();
                    if ((nc.length > 0) && (nc[0].me == self.me)) break;
                    if (nc.length > 0) return false;
                    if ((tg.nodeName == 'DIV') && (tg.id == self.id)) break;
                    tg = (tg.parentNode) ? tg.parentNode : false;
                  }
                }

                self.cancelScroll();

                tg = self.getTarget(e);

                if (tg) {
                  var skp = (/INPUT/i.test(tg.nodeName)) && (/range/i.test(tg.type));
                  if (skp) return self.stopPropagation(e);
                }

                if (!("clientX" in e) && ("changedTouches" in e)) {
                  e.clientX = e.changedTouches[0].clientX;
                  e.clientY = e.changedTouches[0].clientY;
                }

                if (self.forcescreen) {
                  var le = e;
                  e = {
                    "original": (e.original) ? e.original : e
                  };
                  e.clientX = le.screenX;
                  e.clientY = le.screenY;
                }

                self.rail.drag = {
                  x: e.clientX,
                  y: e.clientY,
                  sx: self.scroll.x,
                  sy: self.scroll.y,
                  st: self.getScrollTop(),
                  sl: self.getScrollLeft(),
                  pt: 2,
                  dl: false
                };

                if (self.ispage || !self.opt.directionlockdeadzone) {
                  self.rail.drag.dl = "f";
                } else {

                  var view = {
                    w: $(window).width(),
                    h: $(window).height()
                  };

                  var page = {
                    w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                    h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                  };

                  var maxh = Math.max(0, page.h - view.h);
                  var maxw = Math.max(0, page.w - view.w);

                  if (!self.rail.scrollable && self.railh.scrollable) self.rail.drag.ck = (maxh > 0) ? "v" : false;
                  else if (self.rail.scrollable && !self.railh.scrollable) self.rail.drag.ck = (maxw > 0) ? "h" : false;
                  else self.rail.drag.ck = false;
                  if (!self.rail.drag.ck) self.rail.drag.dl = "f";
                }

                if (self.opt.touchbehavior && self.isiframe && cap.isie) {
                  var wp = self.win.position();
                  self.rail.drag.x += wp.left;
                  self.rail.drag.y += wp.top;
                }

                self.hasmoving = false;
                self.lastmouseup = false;
                self.scrollmom.reset(e.clientX, e.clientY);
                
                if (!cap.cantouch && !this.istouchcapable && !e.pointerType) {       
                
                  var ip = (tg) ? /INPUT|SELECT|TEXTAREA/i.test(tg.nodeName) : false;
                  if (!ip) {
                    if (!self.ispage && cap.hasmousecapture) tg.setCapture();
                    if (self.opt.touchbehavior) {
                      if (tg.onclick && !(tg._onclick || false)) { // intercept DOM0 onclick event
                        tg._onclick = tg.onclick;
                        tg.onclick = function(e) {
                          if (self.hasmoving) return false;
                          tg._onclick.call(this, e);
                        };
                      }
                      return self.cancelEvent(e);
                    }
                    return self.stopPropagation(e);
                  }

                  if (/SUBMIT|CANCEL|BUTTON/i.test($(tg).attr('type'))) {
                    pc = {
                      "tg": tg,
                      "click": false
                    };
                    self.preventclick = pc;
                  }

                }
              }

            };

            self.ontouchend = function(e) {              
              if (!self.rail.drag) return true;              
              if (self.rail.drag.pt == 2) {
                if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
                self.scrollmom.doMomentum();
                self.rail.drag = false;
                if (self.hasmoving) {
                  self.lastmouseup = true;
                  self.hideCursor();
                  if (cap.hasmousecapture) document.releaseCapture();
                  if (!cap.cantouch) return self.cancelEvent(e);
                }
              }
              else if (self.rail.drag.pt == 1) {
                return self.onmouseup(e);
              }

            };

            var moveneedoffset = (self.opt.touchbehavior && self.isiframe && !cap.hasmousecapture);

            self.ontouchmove = function(e, byiframe) {

              if (!self.rail.drag) return false;
            
              if (e.targetTouches && self.opt.preventmultitouchscrolling) {
                if (e.targetTouches.length > 1) return false; // multitouch
              }
            
              if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
          
              if (self.rail.drag.pt == 2) {
                if (cap.cantouch && (cap.isios) && (typeof e.original == "undefined")) return true; // prevent ios "ghost" events by clickable elements

                self.hasmoving = true;

                if (self.preventclick && !self.preventclick.click) {
                  self.preventclick.click = self.preventclick.tg.onclick || false;
                  self.preventclick.tg.onclick = self.onpreventclick;
                }

                var ev = $.extend({
                  "original": e
                }, e);
                e = ev;

                if (("changedTouches" in e)) {
                  e.clientX = e.changedTouches[0].clientX;
                  e.clientY = e.changedTouches[0].clientY;
                }

                if (self.forcescreen) {
                  var le = e;
                  e = {
                    "original": (e.original) ? e.original : e
                  };
                  e.clientX = le.screenX;
                  e.clientY = le.screenY;
                }

                var ofy,ofx;
                ofx = ofy = 0;

                if (moveneedoffset && !byiframe) {
                  var wp = self.win.position();
                  ofx = -wp.left;
                  ofy = -wp.top;
                }

                var fy = e.clientY + ofy;
                var my = (fy - self.rail.drag.y);
                var fx = e.clientX + ofx;
                var mx = (fx - self.rail.drag.x);

                var ny = self.rail.drag.st - my;

                if (self.ishwscroll && self.opt.bouncescroll) {
                  if (ny < 0) {
                    ny = Math.round(ny / 2);
                    //                    fy = 0;
                  } else if (ny > self.page.maxh) {
                    ny = self.page.maxh + Math.round((ny - self.page.maxh) / 2);
                    //                    fy = 0;
                  }
                } else {
                  if (ny < 0) {
                    ny = 0;
                    fy = 0;
                  }
                  if (ny > self.page.maxh) {
                    ny = self.page.maxh;
                    fy = 0;
                  }
                }

                var nx;
                if (self.railh && self.railh.scrollable) {
                  nx = (self.isrtlmode) ? mx - self.rail.drag.sl : self.rail.drag.sl - mx;

                  if (self.ishwscroll && self.opt.bouncescroll) {
                    if (nx < 0) {
                      nx = Math.round(nx / 2);
                      //                      fx = 0;
                    } else if (nx > self.page.maxw) {
                      nx = self.page.maxw + Math.round((nx - self.page.maxw) / 2);
                      //                      fx = 0;
                    }
                  } else {
                    if (nx < 0) {
                      nx = 0;
                      fx = 0;
                    }
                    if (nx > self.page.maxw) {
                      nx = self.page.maxw;
                      fx = 0;
                    }
                  }

                }

                var grabbed = false;
                if (self.rail.drag.dl) {
                  grabbed = true;
                  if (self.rail.drag.dl == "v") nx = self.rail.drag.sl;
                  else if (self.rail.drag.dl == "h") ny = self.rail.drag.st;
                } else {
                  var ay = Math.abs(my);
                  var ax = Math.abs(mx);
                  var dz = self.opt.directionlockdeadzone;
                  if (self.rail.drag.ck == "v") {
                    if (ay > dz && (ax <= (ay * 0.3))) {
                      self.rail.drag = false;
                      return true;
                    } else if (ax > dz) {
                      self.rail.drag.dl = "f";
                      $("body").scrollTop($("body").scrollTop()); // stop iOS native scrolling (when active javascript has blocked)
                    }
                  } else if (self.rail.drag.ck == "h") {
                    if (ax > dz && (ay <= (ax * 0.3))) {
                      self.rail.drag = false;
                      return true;
                    } else if (ay > dz) {
                      self.rail.drag.dl = "f";
                      $("body").scrollLeft($("body").scrollLeft()); // stop iOS native scrolling (when active javascript has blocked)
                    }
                  }
                }

                self.synched("touchmove", function() {
                  if (self.rail.drag && (self.rail.drag.pt == 2)) {
                    if (self.prepareTransition) self.prepareTransition(0);
                    if (self.rail.scrollable) self.setScrollTop(ny);
                    self.scrollmom.update(fx, fy);
                    if (self.railh && self.railh.scrollable) {
                      self.setScrollLeft(nx);
                      self.showCursor(ny, nx);
                    } else {
                      self.showCursor(ny);
                    }
                    if (cap.isie10) document.selection.clear();
                  }
                });

                if (cap.ischrome && self.istouchcapable) grabbed = false; //chrome touch emulation doesn't like!
                if (grabbed) return self.cancelEvent(e);
              }
              else if (self.rail.drag.pt == 1) { // drag on cursor
                return self.onmousemove(e);
              }

            };

          }

          self.onmousedown = function(e, hronly) {
            if (self.rail.drag && self.rail.drag.pt != 1) return;
            if (self.railslocked) return self.cancelEvent(e);
            self.cancelScroll();
            self.rail.drag = {
              x: e.clientX,
              y: e.clientY,
              sx: self.scroll.x,
              sy: self.scroll.y,
              pt: 1,
              hr: (!!hronly)
            };
            var tg = self.getTarget(e);
            if (!self.ispage && cap.hasmousecapture) tg.setCapture();
            if (self.isiframe && !cap.hasmousecapture) {
              self.saved.csspointerevents = self.doc.css("pointer-events");
              self.css(self.doc, {
                "pointer-events": "none"
              });
            }
            self.hasmoving = false;
            return self.cancelEvent(e);
          };

          self.onmouseup = function(e) {
            if (self.rail.drag) {
              if (self.rail.drag.pt != 1) return true;
              if (cap.hasmousecapture) document.releaseCapture();
              if (self.isiframe && !cap.hasmousecapture) self.doc.css("pointer-events", self.saved.csspointerevents);              
              self.rail.drag = false;
              //if (!self.rail.active) self.hideCursor();
              if (self.hasmoving) self.triggerScrollEnd(); // TODO - check &&!self.scrollrunning
              return self.cancelEvent(e);
            }
          };

          self.onmousemove = function(e) {
            if (self.rail.drag) {
              if (self.rail.drag.pt != 1) return;

              if (cap.ischrome && e.which == 0) return self.onmouseup(e);

              self.cursorfreezed = true;
              self.hasmoving = true;

              if (self.rail.drag.hr) {
                self.scroll.x = self.rail.drag.sx + (e.clientX - self.rail.drag.x);
                if (self.scroll.x < 0) self.scroll.x = 0;
                var mw = self.scrollvaluemaxw;
                if (self.scroll.x > mw) self.scroll.x = mw;
              } else {
                self.scroll.y = self.rail.drag.sy + (e.clientY - self.rail.drag.y);
                if (self.scroll.y < 0) self.scroll.y = 0;
                var my = self.scrollvaluemax;
                if (self.scroll.y > my) self.scroll.y = my;
              }

              self.synched('mousemove', function() {
                if (self.rail.drag && (self.rail.drag.pt == 1)) {
                  self.showCursor();
                  if (self.rail.drag.hr) {
                    if (self.hasreversehr) {
                      self.doScrollLeft(self.scrollvaluemaxw-Math.round(self.scroll.x * self.scrollratio.x), self.opt.cursordragspeed);
                    } else {
                      self.doScrollLeft(Math.round(self.scroll.x * self.scrollratio.x), self.opt.cursordragspeed);
                    }
                  }
                  else self.doScrollTop(Math.round(self.scroll.y * self.scrollratio.y), self.opt.cursordragspeed);
                }
              });

              return self.cancelEvent(e);
            }
            else {
              self.checkarea = 0;
            }
          };

          if (cap.cantouch || self.opt.touchbehavior) {

            self.onpreventclick = function(e) {
              if (self.preventclick) {
                self.preventclick.tg.onclick = self.preventclick.click;
                self.preventclick = false;
                return self.cancelEvent(e);
              }
            }

            self.bind(self.win, "mousedown", self.ontouchstart); // control content dragging

            self.onclick = (cap.isios) ? false : function(e) {
              if (self.lastmouseup) {
                self.lastmouseup = false;
                return self.cancelEvent(e);
              } else {
                return true;
              }
            };

            if (self.opt.grabcursorenabled && cap.cursorgrabvalue) {
              self.css((self.ispage) ? self.doc : self.win, {
                'cursor': cap.cursorgrabvalue
              });
              self.css(self.rail, {
                'cursor': cap.cursorgrabvalue
              });
            }

          } else {

            var checkSelectionScroll = function(e) {
              if (!self.selectiondrag) return;

              if (e) {
                var ww = self.win.outerHeight();
                var df = (e.pageY - self.selectiondrag.top);
                if (df > 0 && df < ww) df = 0;
                if (df >= ww) df -= ww;
                self.selectiondrag.df = df;
              }
              if (self.selectiondrag.df == 0) return;

              var rt = -Math.floor(self.selectiondrag.df / 6) * 2;
              self.doScrollBy(rt);

              self.debounced("doselectionscroll", function() {
                checkSelectionScroll()
              }, 50);
            };

            if ("getSelection" in document) { // A grade - Major browsers
              self.hasTextSelected = function() {
                return (document.getSelection().rangeCount > 0);
              };
            } else if ("selection" in document) { //IE9-
              self.hasTextSelected = function() {
                return (document.selection.type != "None");
              };
            } else {
              self.hasTextSelected = function() { // no support
                return false;
              };
            }

            self.onselectionstart = function(e) {
/*  More testing - severe chrome issues            
              if (!self.haswrapper&&(e.which&&e.which==2)) {  // fool browser to manage middle button scrolling
                self.win.css({'overflow':'auto'});
                setTimeout(function(){
                  self.win.css({'overflow':''});
                },10);                
                return true;
              }            
*/              
              if (self.ispage) return;
              self.selectiondrag = self.win.offset();
            };
            
            self.onselectionend = function(e) {
              self.selectiondrag = false;
            };
            self.onselectiondrag = function(e) {
              if (!self.selectiondrag) return;
              if (self.hasTextSelected()) self.debounced("selectionscroll", function() {
                checkSelectionScroll(e)
              }, 250);
            };


          }

          if (cap.hasw3ctouch) { //IE11+
            self.css(self.rail, {
              'touch-action': 'none'
            });
            self.css(self.cursor, {
              'touch-action': 'none'
            });
            self.bind(self.win, "pointerdown", self.ontouchstart);
            self.bind(document, "pointerup", self.ontouchend);
            self.bind(document, "pointermove", self.ontouchmove);
          } else if (cap.hasmstouch) { //IE10
            self.css(self.rail, {
              '-ms-touch-action': 'none'
            });
            self.css(self.cursor, {
              '-ms-touch-action': 'none'
            });
            self.bind(self.win, "MSPointerDown", self.ontouchstart);
            self.bind(document, "MSPointerUp", self.ontouchend);
            self.bind(document, "MSPointerMove", self.ontouchmove);
            self.bind(self.cursor, "MSGestureHold", function(e) {
              e.preventDefault()
            });
            self.bind(self.cursor, "contextmenu", function(e) {
              e.preventDefault()
            });
          } else if (this.istouchcapable) { //desktop with screen touch enabled
            self.bind(self.win, "touchstart", self.ontouchstart);
            self.bind(document, "touchend", self.ontouchend);
            self.bind(document, "touchcancel", self.ontouchend);
            self.bind(document, "touchmove", self.ontouchmove);
          }

          
          if (self.opt.cursordragontouch || (!cap.cantouch && !self.opt.touchbehavior)) {

            self.rail.css({
              "cursor": "default"
            });
            self.railh && self.railh.css({
              "cursor": "default"
            });

            self.jqbind(self.rail, "mouseenter", function() {
              if (!self.ispage && !self.win.is(":visible")) return false;
              if (self.canshowonmouseevent) self.showCursor();
              self.rail.active = true;
            });
            self.jqbind(self.rail, "mouseleave", function() {
              self.rail.active = false;
              if (!self.rail.drag) self.hideCursor();
            });

            if (self.opt.sensitiverail) {
              self.bind(self.rail, "click", function(e) {
                self.doRailClick(e, false, false)
              });
              self.bind(self.rail, "dblclick", function(e) {
                self.doRailClick(e, true, false)
              });
              self.bind(self.cursor, "click", function(e) {
                self.cancelEvent(e)
              });
              self.bind(self.cursor, "dblclick", function(e) {
                self.cancelEvent(e)
              });
            }

            if (self.railh) {
              self.jqbind(self.railh, "mouseenter", function() {
                if (!self.ispage && !self.win.is(":visible")) return false;
                if (self.canshowonmouseevent) self.showCursor();
                self.rail.active = true;
              });
              self.jqbind(self.railh, "mouseleave", function() {
                self.rail.active = false;
                if (!self.rail.drag) self.hideCursor();
              });

              if (self.opt.sensitiverail) {
                self.bind(self.railh, "click", function(e) {
                  self.doRailClick(e, false, true)
                });
                self.bind(self.railh, "dblclick", function(e) {
                  self.doRailClick(e, true, true)
                });
                self.bind(self.cursorh, "click", function(e) {
                  self.cancelEvent(e)
                });
                self.bind(self.cursorh, "dblclick", function(e) {
                  self.cancelEvent(e)
                });
              }

            }

          }

          if (!cap.cantouch && !self.opt.touchbehavior) {

            self.bind((cap.hasmousecapture) ? self.win : document, "mouseup", self.onmouseup);
            self.bind(document, "mousemove", self.onmousemove);
            if (self.onclick) self.bind(document, "click", self.onclick);

            self.bind(self.cursor, "mousedown", self.onmousedown);
            self.bind(self.cursor, "mouseup", self.onmouseup);

            if (self.railh) {
              self.bind(self.cursorh, "mousedown", function(e) {
                self.onmousedown(e, true)
              });
              self.bind(self.cursorh, "mouseup", self.onmouseup);
            }
            
            if (!self.ispage && self.opt.enablescrollonselection) {
              self.bind(self.win[0], "mousedown", self.onselectionstart);
              self.bind(document, "mouseup", self.onselectionend);
              self.bind(self.cursor, "mouseup", self.onselectionend);
              if (self.cursorh) self.bind(self.cursorh, "mouseup", self.onselectionend);
              self.bind(document, "mousemove", self.onselectiondrag);
            }

            if (self.zoom) {
              self.jqbind(self.zoom, "mouseenter", function() {
                if (self.canshowonmouseevent) self.showCursor();
                self.rail.active = true;
              });
              self.jqbind(self.zoom, "mouseleave", function() {
                self.rail.active = false;
                if (!self.rail.drag) self.hideCursor();
              });
            }

          } else {

            self.bind((cap.hasmousecapture) ? self.win : document, "mouseup", self.ontouchend);
            self.bind(document, "mousemove", self.ontouchmove);
            if (self.onclick) self.bind(document, "click", self.onclick);

            if (self.opt.cursordragontouch) {
              self.bind(self.cursor, "mousedown", self.onmousedown);
              self.bind(self.cursor, "mouseup", self.onmouseup);
              //self.bind(self.cursor, "mousemove", self.onmousemove);
              self.cursorh && self.bind(self.cursorh, "mousedown", function(e) {
                self.onmousedown(e, true)
              });
              //self.cursorh && self.bind(self.cursorh, "mousemove", self.onmousemove);
              self.cursorh && self.bind(self.cursorh, "mouseup", self.onmouseup);
            }

          }

          if (self.opt.enablemousewheel) {
            if (!self.isiframe) self.bind((cap.isie && self.ispage) ? document : self.win /*self.docscroll*/ , "mousewheel", self.onmousewheel);
            self.bind(self.rail, "mousewheel", self.onmousewheel);
            if (self.railh) self.bind(self.railh, "mousewheel", self.onmousewheelhr);
          }

          if (!self.ispage && !cap.cantouch && !(/HTML|^BODY/.test(self.win[0].nodeName))) {
            if (!self.win.attr("tabindex")) self.win.attr({
              "tabindex": tabindexcounter++
            });

            self.jqbind(self.win, "focus", function(e) {
              domfocus = (self.getTarget(e)).id || true;
              self.hasfocus = true;
              if (self.canshowonmouseevent) self.noticeCursor();
            });
            self.jqbind(self.win, "blur", function(e) {
              domfocus = false;
              self.hasfocus = false;
            });

            self.jqbind(self.win, "mouseenter", function(e) {
              mousefocus = (self.getTarget(e)).id || true;
              self.hasmousefocus = true;
              if (self.canshowonmouseevent) self.noticeCursor();
            });
            self.jqbind(self.win, "mouseleave", function() {
              mousefocus = false;
              self.hasmousefocus = false;
              if (!self.rail.drag) self.hideCursor();
            });

          }

        } // !ie9mobile

        //Thanks to http://www.quirksmode.org !!
        self.onkeypress = function(e) {
          if (self.railslocked && self.page.maxh == 0) return true;

          e = (e) ? e : window.e;
          var tg = self.getTarget(e);
          if (tg && /INPUT|TEXTAREA|SELECT|OPTION/.test(tg.nodeName)) {
            var tp = tg.getAttribute('type') || tg.type || false;
            if ((!tp) || !(/submit|button|cancel/i.tp)) return true;
          }

          if ($(tg).attr('contenteditable')) return true;

          if (self.hasfocus || (self.hasmousefocus && !domfocus) || (self.ispage && !domfocus && !mousefocus)) {
            var key = e.keyCode;

            if (self.railslocked && key != 27) return self.cancelEvent(e);

            var ctrl = e.ctrlKey || false;
            var shift = e.shiftKey || false;

            var ret = false;
            switch (key) {
              case 38:
              case 63233: //safari
                self.doScrollBy(24 * 3);
                ret = true;
                break;
              case 40:
              case 63235: //safari
                self.doScrollBy(-24 * 3);
                ret = true;
                break;
              case 37:
              case 63232: //safari
                if (self.railh) {
                  (ctrl) ? self.doScrollLeft(0): self.doScrollLeftBy(24 * 3);
                  ret = true;
                }
                break;
              case 39:
              case 63234: //safari
                if (self.railh) {
                  (ctrl) ? self.doScrollLeft(self.page.maxw): self.doScrollLeftBy(-24 * 3);
                  ret = true;
                }
                break;
              case 33:
              case 63276: // safari
                self.doScrollBy(self.view.h);
                ret = true;
                break;
              case 34:
              case 63277: // safari
                self.doScrollBy(-self.view.h);
                ret = true;
                break;
              case 36:
              case 63273: // safari                
                (self.railh && ctrl) ? self.doScrollPos(0, 0): self.doScrollTo(0);
                ret = true;
                break;
              case 35:
              case 63275: // safari
                (self.railh && ctrl) ? self.doScrollPos(self.page.maxw, self.page.maxh): self.doScrollTo(self.page.maxh);
                ret = true;
                break;
              case 32:
                if (self.opt.spacebarenabled) {
                  (shift) ? self.doScrollBy(self.view.h): self.doScrollBy(-self.view.h);
                  ret = true;
                }
                break;
              case 27: // ESC
                if (self.zoomactive) {
                  self.doZoom();
                  ret = true;
                }
                break;
            }
            if (ret) return self.cancelEvent(e);
          }
        };

        if (self.opt.enablekeyboard) self.bind(document, (cap.isopera && !cap.isopera12) ? "keypress" : "keydown", self.onkeypress);

        self.bind(document, "keydown", function(e) {
          var ctrl = e.ctrlKey || false;
          if (ctrl) self.wheelprevented = true;
        });
        self.bind(document, "keyup", function(e) {
          var ctrl = e.ctrlKey || false;
          if (!ctrl) self.wheelprevented = false;
        });
        self.bind(window,"blur",function(e){
          self.wheelprevented = false;
        });        

        self.bind(window, 'resize', self.lazyResize);
        self.bind(window, 'orientationchange', self.lazyResize);

        self.bind(window, "load", self.lazyResize);

        if (cap.ischrome && !self.ispage && !self.haswrapper) { //chrome void scrollbar bug - it persists in version 26
          var tmp = self.win.attr("style");
          var ww = parseFloat(self.win.css("width")) + 1;
          self.win.css('width', ww);
          self.synched("chromefix", function() {
            self.win.attr("style", tmp)
          });
        }


        // Trying a cross-browser implementation - good luck!

        self.onAttributeChange = function(e) {
          self.lazyResize(self.isieold ? 250 : 30);
        };

        if (ClsMutationObserver !== false) {
          self.observerbody = new ClsMutationObserver(function(mutations) {
            mutations.forEach(function(mut){
              if (mut.type=="attributes") {
                return ($("body").hasClass("modal-open") && !$.contains($('.modal-dialog')[0],self.doc[0])) ? self.hide() : self.show();  // Support for Bootstrap modal; Added check if the nice scroll element is inside a modal
              }
            });  
            if (document.body.scrollHeight!=self.page.maxh) return self.lazyResize(30);
          });
          self.observerbody.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: false,
            attributes: true,
            attributeFilter: ['class']
          });
        }
        
        if (!self.ispage && !self.haswrapper) {
          // redesigned MutationObserver for Chrome18+/Firefox14+/iOS6+ with support for: remove div, add/remove content
          if (ClsMutationObserver !== false) {
            self.observer = new ClsMutationObserver(function(mutations) {
              mutations.forEach(self.onAttributeChange);
            });
            self.observer.observe(self.win[0], {
              childList: true,
              characterData: false,
              attributes: true,
              subtree: false
            });
            self.observerremover = new ClsMutationObserver(function(mutations) {
              mutations.forEach(function(mo) {
                if (mo.removedNodes.length > 0) {
                  for (var dd in mo.removedNodes) {
                    if (!!self && (mo.removedNodes[dd] == self.win[0])) return self.remove();
                  }
                }
              });
            });
            self.observerremover.observe(self.win[0].parentNode, {
              childList: true,
              characterData: false,
              attributes: false,
              subtree: false
            });
          } else {
            self.bind(self.win, (cap.isie && !cap.isie9) ? "propertychange" : "DOMAttrModified", self.onAttributeChange);
            if (cap.isie9) self.win[0].attachEvent("onpropertychange", self.onAttributeChange); //IE9 DOMAttrModified bug
            self.bind(self.win, "DOMNodeRemoved", function(e) {
              if (e.target == self.win[0]) self.remove();
            });
          }
        }

        //

        if (!self.ispage && self.opt.boxzoom) self.bind(window, "resize", self.resizeZoom);
				if (self.istextarea) {
					self.bind(self.win, "keydown", self.lazyResize);
					self.bind(self.win, "mouseup", self.lazyResize);
				}

        //        self.checkrtlmode = true;
        self.lazyResize(30);

      }
      
      if (this.doc[0].nodeName == 'IFRAME') {
        var oniframeload = function() {
          self.iframexd = false;
          var doc;
          try {
            doc = 'contentDocument' in this ? this.contentDocument : this.contentWindow.document;
            var a = doc.domain;
          } catch (e) {
            self.iframexd = true;
            doc = false
          }
          
          if (self.iframexd) {
            if ("console" in window) console.log('NiceScroll error: policy restriced iframe');
            return true; //cross-domain - I can't manage this        
          }

          self.forcescreen = true;

          if (self.isiframe) {
            self.iframe = {
              "doc": $(doc),
              "html": self.doc.contents().find('html')[0],
              "body": self.doc.contents().find('body')[0]
            };
            self.getContentSize = function() {
              return {
                w: Math.max(self.iframe.html.scrollWidth, self.iframe.body.scrollWidth),
                h: Math.max(self.iframe.html.scrollHeight, self.iframe.body.scrollHeight)
              };
            };
            self.docscroll = $(self.iframe.body); //$(this.contentWindow);
          }

          if (!cap.isios && self.opt.iframeautoresize && !self.isiframe) {
            self.win.scrollTop(0); // reset position
            self.doc.height(""); //reset height to fix browser bug
            var hh = Math.max(doc.getElementsByTagName('html')[0].scrollHeight, doc.body.scrollHeight);
            self.doc.height(hh);
          }
          self.lazyResize(30);

          if (cap.isie7) self.css($(self.iframe.html), {
            'overflow-y': 'hidden'
          });
          self.css($(self.iframe.body), {
            'overflow-y': 'hidden'
          });

          if (cap.isios && self.haswrapper) {
            self.css($(doc.body), {
              '-webkit-transform': 'translate3d(0,0,0)'
            }); // avoid iFrame content clipping - thanks to http://blog.derraab.com/2012/04/02/avoid-iframe-content-clipping-with-css-transform-on-ios/
          }

          if ('contentWindow' in this) {
            self.bind(this.contentWindow, "scroll", self.onscroll); //IE8 & minor
          } else {
            self.bind(doc, "scroll", self.onscroll);
          }

          if (self.opt.enablemousewheel) {
            self.bind(doc, "mousewheel", self.onmousewheel);
          }

          if (self.opt.enablekeyboard) self.bind(doc, (cap.isopera) ? "keypress" : "keydown", self.onkeypress);

          if (cap.cantouch || self.opt.touchbehavior) {
            self.bind(doc, "mousedown", self.ontouchstart);
            self.bind(doc, "mousemove", function(e) {
              return self.ontouchmove(e, true)
            });
            if (self.opt.grabcursorenabled && cap.cursorgrabvalue) self.css($(doc.body), {
              'cursor': cap.cursorgrabvalue
            });
          }

          self.bind(doc, "mouseup", self.ontouchend);

          if (self.zoom) {
            if (self.opt.dblclickzoom) self.bind(doc, 'dblclick', self.doZoom);
            if (self.ongesturezoom) self.bind(doc, "gestureend", self.ongesturezoom);
          }
        };

        if (this.doc[0].readyState && this.doc[0].readyState == "complete") {
          setTimeout(function() {
            oniframeload.call(self.doc[0], false)
          }, 500);
        }
        self.bind(this.doc, "load", oniframeload);

      }

    };

    this.showCursor = function(py, px) {
      if (self.cursortimeout) {
        clearTimeout(self.cursortimeout);
        self.cursortimeout = 0;
      }
      if (!self.rail) return;
      if (self.autohidedom) {
        self.autohidedom.stop().css({
          opacity: self.opt.cursoropacitymax
        });
        self.cursoractive = true;
      }

      if (!self.rail.drag || self.rail.drag.pt != 1) {
        if ((typeof py != "undefined") && (py !== false)) {
          self.scroll.y = Math.round(py * 1 / self.scrollratio.y);
        }
        if (typeof px != "undefined") {
          self.scroll.x = Math.round(px * 1 / self.scrollratio.x);
        }
      }

      self.cursor.css({
        height: self.cursorheight,
        top: self.scroll.y
      });
      if (self.cursorh) {        
        var lx = (self.hasreversehr) ? self.scrollvaluemaxw-self.scroll.x : self.scroll.x;
        (!self.rail.align && self.rail.visibility) ? self.cursorh.css({
          width: self.cursorwidth,
          left: lx + self.rail.width
        }): self.cursorh.css({
          width: self.cursorwidth,
          left: lx
        });
        self.cursoractive = true;
      }

      if (self.zoom) self.zoom.stop().css({
        opacity: self.opt.cursoropacitymax
      });
    };

    this.hideCursor = function(tm) {
      if (self.cursortimeout) return;
      if (!self.rail) return;
      if (!self.autohidedom) return;
      if (self.hasmousefocus && self.opt.autohidemode == "leave") return;
      self.cursortimeout = setTimeout(function() {
        if (!self.rail.active || !self.showonmouseevent) {
          self.autohidedom.stop().animate({
            opacity: self.opt.cursoropacitymin
          });
          if (self.zoom) self.zoom.stop().animate({
            opacity: self.opt.cursoropacitymin
          });
          self.cursoractive = false;
        }
        self.cursortimeout = 0;
      }, tm || self.opt.hidecursordelay);
    };

    this.noticeCursor = function(tm, py, px) {
      self.showCursor(py, px);
      if (!self.rail.active) self.hideCursor(tm);
    };

    this.getContentSize =
      (self.ispage) ?
      function() {
        return {
          w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
          h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }
      } : (self.haswrapper) ?
      function() {
        return {
          w: self.doc.outerWidth() + parseInt(self.win.css('paddingLeft')) + parseInt(self.win.css('paddingRight')),
          h: self.doc.outerHeight() + parseInt(self.win.css('paddingTop')) + parseInt(self.win.css('paddingBottom'))
        }
      } : function() {
        return {
          w: self.docscroll[0].scrollWidth,
          h: self.docscroll[0].scrollHeight
        }
      };

    this.onResize = function(e, page) {
    
      if (!self || !self.win) return false;

      if (!self.haswrapper && !self.ispage) {
        if (self.win.css('display') == 'none') {
          if (self.visibility) self.hideRail().hideRailHr();
          return false;
        } else {
          if (!self.hidden && !self.visibility) self.showRail().showRailHr();
        }
      }

      var premaxh = self.page.maxh;
      var premaxw = self.page.maxw;

      var preview = {
        h: self.view.h,
        w: self.view.w
      };

      self.view = {
        w: (self.ispage) ? self.win.width() : parseInt(self.win[0].clientWidth),
        h: (self.ispage) ? self.win.height() : parseInt(self.win[0].clientHeight)
      };

      self.page = (page) ? page : self.getContentSize();

      self.page.maxh = Math.max(0, self.page.h - self.view.h);
      self.page.maxw = Math.max(0, self.page.w - self.view.w);
      
      if ((self.page.maxh == premaxh) && (self.page.maxw == premaxw) && (self.view.w == preview.w) && (self.view.h == preview.h)) {
        // test position        
        if (!self.ispage) {
          var pos = self.win.offset();
          if (self.lastposition) {
            var lst = self.lastposition;
            if ((lst.top == pos.top) && (lst.left == pos.left)) return self; //nothing to do            
          }
          self.lastposition = pos;
        } else {
          return self; //nothing to do
        }
      }

      if (self.page.maxh == 0) {
        self.hideRail();
        self.scrollvaluemax = 0;
        self.scroll.y = 0;
        self.scrollratio.y = 0;
        self.cursorheight = 0;
        self.setScrollTop(0);
        if (self.rail) self.rail.scrollable = false;
      } else {
        self.page.maxh -= (self.opt.railpadding.top + self.opt.railpadding.bottom);  //**
        self.rail.scrollable = true;
      }

      if (self.page.maxw == 0) {
        self.hideRailHr();
        self.scrollvaluemaxw = 0;
        self.scroll.x = 0;
        self.scrollratio.x = 0;
        self.cursorwidth = 0;
        self.setScrollLeft(0);
        if (self.railh) {
          self.railh.scrollable = false;
        }
      } else {
          self.page.maxw -= (self.opt.railpadding.left + self.opt.railpadding.right);  //**
          if (self.railh) self.railh.scrollable = (self.opt.horizrailenabled);
      }

      self.railslocked = (self.locked) || ((self.page.maxh == 0) && (self.page.maxw == 0));
      if (self.railslocked) {
        if (!self.ispage) self.updateScrollBar(self.view);
        return false;
      }

      if (!self.hidden && !self.visibility) {
        self.showRail().showRailHr();
      }
      else if (self.railh && (!self.hidden && !self.railh.visibility)) self.showRailHr();

      if (self.istextarea && self.win.css('resize') && self.win.css('resize') != 'none') self.view.h -= 20;

      self.cursorheight = Math.min(self.view.h, Math.round(self.view.h * (self.view.h / self.page.h)));
      self.cursorheight = (self.opt.cursorfixedheight) ? self.opt.cursorfixedheight : Math.max(self.opt.cursorminheight, self.cursorheight);

      self.cursorwidth = Math.min(self.view.w, Math.round(self.view.w * (self.view.w / self.page.w)));
      self.cursorwidth = (self.opt.cursorfixedheight) ? self.opt.cursorfixedheight : Math.max(self.opt.cursorminheight, self.cursorwidth);

      self.scrollvaluemax = self.view.h - self.cursorheight - self.cursor.hborder - (self.opt.railpadding.top + self.opt.railpadding.bottom);  //**

      if (self.railh) {
        self.railh.width = (self.page.maxh > 0) ? (self.view.w - self.rail.width) : self.view.w;
        self.scrollvaluemaxw = self.railh.width - self.cursorwidth - self.cursorh.wborder - (self.opt.railpadding.left + self.opt.railpadding.right);  //**
      }

      /*
      if (self.checkrtlmode&&self.railh) {
        self.checkrtlmode = false;
        if (self.opt.rtlmode&&self.scroll.x==0) self.setScrollLeft(self.page.maxw);
      }
*/

      if (!self.ispage) self.updateScrollBar(self.view);

      self.scrollratio = {
        x: (self.page.maxw / self.scrollvaluemaxw),
        y: (self.page.maxh / self.scrollvaluemax)
      };

      var sy = self.getScrollTop();
      if (sy > self.page.maxh) {
        self.doScrollTop(self.page.maxh);
      } else {
        self.scroll.y = Math.round(self.getScrollTop() * (1 / self.scrollratio.y));
        self.scroll.x = Math.round(self.getScrollLeft() * (1 / self.scrollratio.x));
        if (self.cursoractive) self.noticeCursor();
      }

      if (self.scroll.y && (self.getScrollTop() == 0)) self.doScrollTo(Math.floor(self.scroll.y * self.scrollratio.y));

      return self;
    };

    this.resize = self.onResize;

    this.lazyResize = function(tm) { // event debounce
      tm = (isNaN(tm)) ? 30 : tm;
      self.debounced('resize', self.resize, tm);
      return self;
    };

    // modified by MDN https://developer.mozilla.org/en-US/docs/DOM/Mozilla_event_reference/wheel
    function _modernWheelEvent(dom, name, fn, bubble) {
      self._bind(dom, name, function(e) {
        var e = (e) ? e : window.event;
        var event = {
          original: e,
          target: e.target || e.srcElement,
          type: "wheel",
          deltaMode: e.type == "MozMousePixelScroll" ? 0 : 1,
          deltaX: 0,
          deltaZ: 0,
          preventDefault: function() {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            return false;
          },
          stopImmediatePropagation: function() {
            (e.stopImmediatePropagation) ? e.stopImmediatePropagation(): e.cancelBubble = true;
          }
        };

        if (name == "mousewheel") {
          event.deltaY = -1 / 40 * e.wheelDelta;
          e.wheelDeltaX && (event.deltaX = -1 / 40 * e.wheelDeltaX);
        } else {
          event.deltaY = e.detail;
        }

        return fn.call(dom, event);
      }, bubble);
    };



    this.jqbind = function(dom, name, fn) { // use jquery bind for non-native events (mouseenter/mouseleave)
      self.events.push({
        e: dom,
        n: name,
        f: fn,
        q: true
      });
      $(dom).bind(name, fn);
    };

    this.bind = function(dom, name, fn, bubble) { // touch-oriented & fixing jquery bind
      var el = ("jquery" in dom) ? dom[0] : dom;

      if (name == 'mousewheel') {
        if ("onwheel" in self.win) { // modern brosers & IE9 detection fix
          self._bind(el, "wheel", fn, bubble || false);
        } else {
          var wname = (typeof document.onmousewheel != "undefined") ? "mousewheel" : "DOMMouseScroll"; // older IE/Firefox
          _modernWheelEvent(el, wname, fn, bubble || false);
          if (wname == "DOMMouseScroll") _modernWheelEvent(el, "MozMousePixelScroll", fn, bubble || false); // Firefox legacy
        }
      } else if (el.addEventListener) {
        if (cap.cantouch && /mouseup|mousedown|mousemove/.test(name)) { // touch device support
          var tt = (name == 'mousedown') ? 'touchstart' : (name == 'mouseup') ? 'touchend' : 'touchmove';
          self._bind(el, tt, function(e) {
            if (e.touches) {
              if (e.touches.length < 2) {
                var ev = (e.touches.length) ? e.touches[0] : e;
                ev.original = e;
                fn.call(this, ev);
              }
            } else if (e.changedTouches) {
              var ev = e.changedTouches[0];
              ev.original = e;
              fn.call(this, ev);
            } //blackberry
          }, bubble || false);
        }
        self._bind(el, name, fn, bubble || false);
        if (cap.cantouch && name == "mouseup") self._bind(el, "touchcancel", fn, bubble || false);
      } else {
        self._bind(el, name, function(e) {
          e = e || window.event || false;
          if (e) {
            if (e.srcElement) e.target = e.srcElement;
          }
          if (!("pageY" in e)) {
            e.pageX = e.clientX + document.documentElement.scrollLeft;
            e.pageY = e.clientY + document.documentElement.scrollTop;
          }
          return ((fn.call(el, e) === false) || bubble === false) ? self.cancelEvent(e) : true;
        });
      }
    };

    if (cap.haseventlistener) {  // W3C standard model
      this._bind = function(el, name, fn, bubble) { // primitive bind
        self.events.push({
          e: el,
          n: name,
          f: fn,
          b: bubble,
          q: false
        });
        el.addEventListener(name, fn, bubble || false);
      };    
      this.cancelEvent = function(e) {
        if (!e) return false;
        var e = (e.original) ? e.original : e;
        e.preventDefault();
        e.stopPropagation();
        if (e.preventManipulation) e.preventManipulation(); //IE10
        return false;
      };
      this.stopPropagation = function(e) {
        if (!e) return false;
        var e = (e.original) ? e.original : e;
        e.stopPropagation();
        return false;
      };
      this._unbind = function(el, name, fn, bub) { // primitive unbind
        el.removeEventListener(name, fn, bub);
      };
    } else {  // old IE model
      this._bind = function(el, name, fn, bubble) { // primitive bind
        self.events.push({
          e: el,
          n: name,
          f: fn,
          b: bubble,
          q: false
        });
        if (el.attachEvent) {
          el.attachEvent("on" + name, fn);
        } else {
          el["on" + name] = fn;
        }
      };    
      // Thanks to http://www.switchonthecode.com !!
      this.cancelEvent = function(e) {
        var e = window.event || false;
        if (!e) return false;
        e.cancelBubble = true;
        e.cancel = true;
        e.returnValue = false;
        return false;
      };
      this.stopPropagation = function(e) {
        var e = window.event || false;
        if (!e) return false;
        e.cancelBubble = true;
        return false;
      };
      this._unbind = function(el, name, fn, bub) { // primitive unbind IE old
        if (el.detachEvent) {
          el.detachEvent('on' + name, fn);
        } else {
          el['on' + name] = false;
        }
      };
    }
    
    this.unbindAll = function() {
      for (var a = 0; a < self.events.length; a++) {
        var r = self.events[a];
        (r.q) ? r.e.unbind(r.n, r.f): self._unbind(r.e, r.n, r.f, r.b);
      }
    };

    this.showRail = function() {
      if ((self.page.maxh != 0) && (self.ispage || self.win.css('display') != 'none')) {
        self.visibility = true;
        self.rail.visibility = true;
        self.rail.css('display', 'block');
      }
      return self;
    };

    this.showRailHr = function() {
      if (!self.railh) return self;
      if ((self.page.maxw != 0) && (self.ispage || self.win.css('display') != 'none')) {
        self.railh.visibility = true;
        self.railh.css('display', 'block');
      }
      return self;
    };

    this.hideRail = function() {
      self.visibility = false;
      self.rail.visibility = false;
      self.rail.css('display', 'none');
      return self;
    };

    this.hideRailHr = function() {
      if (!self.railh) return self;
      self.railh.visibility = false;
      self.railh.css('display', 'none');
      return self;
    };

    this.show = function() {
      self.hidden = false;
      self.railslocked = false;
      return self.showRail().showRailHr();
    };

    this.hide = function() {
      self.hidden = true;
      self.railslocked = true;
      return self.hideRail().hideRailHr();
    };

    this.toggle = function() {
      return (self.hidden) ? self.show() : self.hide();
    };

    this.remove = function() {
      self.stop();
      if (self.cursortimeout) clearTimeout(self.cursortimeout);
      if (self.debouncedelayed) clearTimeout(self.debouncedelayed);
      self.doZoomOut();
      self.unbindAll();

      if (cap.isie9) self.win[0].detachEvent("onpropertychange", self.onAttributeChange); //IE9 DOMAttrModified bug

      if (self.observer !== false) self.observer.disconnect();
      if (self.observerremover !== false) self.observerremover.disconnect();
      if (self.observerbody !== false) self.observerbody.disconnect();

      self.events = null;

      if (self.cursor) {
        self.cursor.remove();
      }
      if (self.cursorh) {
        self.cursorh.remove();
      }
      if (self.rail) {
        self.rail.remove();
      }
      if (self.railh) {
        self.railh.remove();
      }
      if (self.zoom) {
        self.zoom.remove();
      }
      for (var a = 0; a < self.saved.css.length; a++) {
        var d = self.saved.css[a];
        d[0].css(d[1], (typeof d[2] == "undefined") ? '' : d[2]);
      }
      self.saved = false;
      self.me.data('__nicescroll', ''); //erase all traces

      // memory leak fixed by GianlucaGuarini - thanks a lot!
      // remove the current nicescroll from the $.nicescroll array & normalize array
      var lst = $.nicescroll;
      lst.each(function(i) {
        if (!this) return;
        if (this.id === self.id) {
          delete lst[i];
          for (var b = ++i; b < lst.length; b++, i++) lst[i] = lst[b];
          lst.length--;
          if (lst.length) delete lst[lst.length];
        }
      });

      for (var i in self) {
        self[i] = null;
        delete self[i];
      }

      self = null;

    };

    this.scrollstart = function(fn) {
      this.onscrollstart = fn;
      return self;
    };
    this.scrollend = function(fn) {
      this.onscrollend = fn;
      return self;
    };
    this.scrollcancel = function(fn) {
      this.onscrollcancel = fn;
      return self;
    };

    this.zoomin = function(fn) {
      this.onzoomin = fn;
      return self;
    };
    this.zoomout = function(fn) {
      this.onzoomout = fn;
      return self;
    };

    this.isScrollable = function(e) {
      var dom = (e.target) ? e.target : e;
      if (dom.nodeName == 'OPTION') return true;
      while (dom && (dom.nodeType == 1) && !(/^BODY|HTML/.test(dom.nodeName))) {
        var dd = $(dom);
        var ov = dd.css('overflowY') || dd.css('overflowX') || dd.css('overflow') || '';
        if (/scroll|auto/.test(ov)) return (dom.clientHeight != dom.scrollHeight);
        dom = (dom.parentNode) ? dom.parentNode : false;
      }
      return false;
    };

    this.getViewport = function(me) {
      var dom = (me && me.parentNode) ? me.parentNode : false;
      while (dom && (dom.nodeType == 1) && !(/^BODY|HTML/.test(dom.nodeName))) {
        var dd = $(dom);
        if (/fixed|absolute/.test(dd.css("position"))) return dd;
        var ov = dd.css('overflowY') || dd.css('overflowX') || dd.css('overflow') || '';
        if ((/scroll|auto/.test(ov)) && (dom.clientHeight != dom.scrollHeight)) return dd;
        if (dd.getNiceScroll().length > 0) return dd;
        dom = (dom.parentNode) ? dom.parentNode : false;
      }
      return false; //(dom) ? $(dom) : false;
    };

    this.triggerScrollEnd = function() {
      if (!self.onscrollend) return;

      var px = self.getScrollLeft();
      var py = self.getScrollTop();

      var info = {
        "type": "scrollend",
        "current": {
          "x": px,
          "y": py
        },
        "end": {
          "x": px,
          "y": py
        }
      };
      self.onscrollend.call(self, info);
    }

    function execScrollWheel(e, hr, chkscroll) {
      var px, py;
      
      if (e.deltaMode == 0) { // PIXEL
        px = -Math.floor(e.deltaX * (self.opt.mousescrollstep / (18 * 3)));
        py = -Math.floor(e.deltaY * (self.opt.mousescrollstep / (18 * 3)));
      } else if (e.deltaMode == 1) { // LINE
        px = -Math.floor(e.deltaX * self.opt.mousescrollstep);
        py = -Math.floor(e.deltaY * self.opt.mousescrollstep);
      }

      if (hr && self.opt.oneaxismousemode && (px == 0) && py) { // classic vertical-only mousewheel + browser with x/y support 
        px = py;
        py = 0;
      
        if (chkscroll) {
          var hrend = (px < 0) ? (self.getScrollLeft() >= self.page.maxw) : (self.getScrollLeft() <= 0);
          if (hrend) {  // preserve vertical scrolling
            py = px;
            px = 0;            
          }
        }
        
      }

      if (px) {
        if (self.scrollmom) {
          self.scrollmom.stop()
        }
        self.lastdeltax += px;
        self.debounced("mousewheelx", function() {
          var dt = self.lastdeltax;
          self.lastdeltax = 0;
          if (!self.rail.drag) {
            self.doScrollLeftBy(dt)
          }
        }, 15);
      }
      if (py) {
        if (self.opt.nativeparentscrolling && chkscroll && !self.ispage && !self.zoomactive) {
          if (py < 0) {
            if (self.getScrollTop() >= self.page.maxh) return true;
          } else {
            if (self.getScrollTop() <= 0) return true;
          }
        }
        if (self.scrollmom) {
          self.scrollmom.stop()
        }
        self.lastdeltay += py;
        self.debounced("mousewheely", function() {
          var dt = self.lastdeltay;
          self.lastdeltay = 0;
          if (!self.rail.drag) {
            self.doScrollBy(dt)
          }
        }, 15);
      }

      e.stopImmediatePropagation();
      return e.preventDefault();
    };

    this.onmousewheel = function(e) {
      if (self.wheelprevented) return;
      if (self.railslocked) {
        self.debounced("checkunlock", self.resize, 250);
        return true;
      }
      if (self.rail.drag) return self.cancelEvent(e);

      if (self.opt.oneaxismousemode == "auto" && e.deltaX != 0) self.opt.oneaxismousemode = false; // check two-axis mouse support (not very elegant)

      if (self.opt.oneaxismousemode && e.deltaX == 0) {
        if (!self.rail.scrollable) {
          if (self.railh && self.railh.scrollable) {
            return self.onmousewheelhr(e);
          } else {
            return true;
          }
        }
      }

      var nw = +(new Date());
      var chk = false;
      if (self.opt.preservenativescrolling && ((self.checkarea + 600) < nw)) {
        self.nativescrollingarea = self.isScrollable(e);
        chk = true;
      }
      self.checkarea = nw;
      if (self.nativescrollingarea) return true; // this isn't my business
      var ret = execScrollWheel(e, false, chk);
      if (ret) self.checkarea = 0;
      return ret;
    };

    this.onmousewheelhr = function(e) {
      if (self.wheelprevented) return;
      if (self.railslocked || !self.railh.scrollable) return true;
      if (self.rail.drag) return self.cancelEvent(e);

      var nw = +(new Date());
      var chk = false;
      if (self.opt.preservenativescrolling && ((self.checkarea + 600) < nw)) {
        self.nativescrollingarea = self.isScrollable(e);
        chk = true;
      }
      self.checkarea = nw;
      if (self.nativescrollingarea) return true; // this isn't my business
      if (self.railslocked) return self.cancelEvent(e);

      return execScrollWheel(e, true, chk);
    };

    this.stop = function() {
      self.cancelScroll();
      if (self.scrollmon) self.scrollmon.stop();
      self.cursorfreezed = false;
      self.scroll.y = Math.round(self.getScrollTop() * (1 / self.scrollratio.y));
      self.noticeCursor();
      return self;
    };

    this.getTransitionSpeed = function(dif) {
      var sp = Math.round(self.opt.scrollspeed * 10);
      var ex = Math.min(sp, Math.round((dif / 20) * self.opt.scrollspeed));
      return (ex > 20) ? ex : 0;
    };

    if (!self.opt.smoothscroll) {
      this.doScrollLeft = function(x, spd) { //direct
        var y = self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };
      this.doScrollTop = function(y, spd) { //direct
        var x = self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };
      this.doScrollPos = function(x, y, spd) { //direct
        var nx = (x > self.page.maxw) ? self.page.maxw : x;
        if (nx < 0) nx = 0;
        var ny = (y > self.page.maxh) ? self.page.maxh : y;
        if (ny < 0) ny = 0;
        self.synched('scroll', function() {
          self.setScrollTop(ny);
          self.setScrollLeft(nx);
        });
      };
      this.cancelScroll = function() {}; // direct
    } else if (self.ishwscroll && cap.hastransition && self.opt.usetransition && !!self.opt.smoothscroll) {
      this.prepareTransition = function(dif, istime) {
        var ex = (istime) ? ((dif > 20) ? dif : 0) : self.getTransitionSpeed(dif);
        var trans = (ex) ? cap.prefixstyle + 'transform ' + ex + 'ms ease-out' : '';
        if (!self.lasttransitionstyle || self.lasttransitionstyle != trans) {
          self.lasttransitionstyle = trans;
          self.doc.css(cap.transitionstyle, trans);
        }
        return ex;
      };

      this.doScrollLeft = function(x, spd) { //trans
        var y = (self.scrollrunning) ? self.newscrolly : self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollTop = function(y, spd) { //trans
        var x = (self.scrollrunning) ? self.newscrollx : self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollPos = function(x, y, spd) { //trans

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if (((self.newscrolly - py) * (y - py) < 0) || ((self.newscrollx - px) * (x - px) < 0)) self.cancelScroll(); //inverted movement detection      

        if (self.opt.bouncescroll == false) {
          if (y < 0) y = 0;
          else if (y > self.page.maxh) y = self.page.maxh;
          if (x < 0) x = 0;
          else if (x > self.page.maxw) x = self.page.maxw;
        }

        if (self.scrollrunning && x == self.newscrollx && y == self.newscrolly) return false;

        self.newscrolly = y;
        self.newscrollx = x;

        self.newscrollspeed = spd || false;

        if (self.timer) return false;

        self.timer = setTimeout(function() {

          var top = self.getScrollTop();
          var lft = self.getScrollLeft();

          var dst = {};
          dst.x = x - lft;
          dst.y = y - top;
          dst.px = lft;
          dst.py = top;

          var dd = Math.round(Math.sqrt(Math.pow(dst.x, 2) + Math.pow(dst.y, 2)));
          var ms = (self.newscrollspeed && self.newscrollspeed > 1) ? self.newscrollspeed : self.getTransitionSpeed(dd);
          if (self.newscrollspeed && self.newscrollspeed <= 1) ms *= self.newscrollspeed;

          self.prepareTransition(ms, true);

          if (self.timerscroll && self.timerscroll.tm) clearInterval(self.timerscroll.tm);

          if (ms > 0) {

            if (!self.scrollrunning && self.onscrollstart) {
              var info = {
                "type": "scrollstart",
                "current": {
                  "x": lft,
                  "y": top
                },
                "request": {
                  "x": x,
                  "y": y
                },
                "end": {
                  "x": self.newscrollx,
                  "y": self.newscrolly
                },
                "speed": ms
              };
              self.onscrollstart.call(self, info);
            }

            if (cap.transitionend) {
              if (!self.scrollendtrapped) {
                self.scrollendtrapped = true;
                self.bind(self.doc, cap.transitionend, self.onScrollTransitionEnd, false); //I have got to do something usefull!!
              }
            } else {
              if (self.scrollendtrapped) clearTimeout(self.scrollendtrapped);
              self.scrollendtrapped = setTimeout(self.onScrollTransitionEnd, ms); // simulate transitionend event
            }

            var py = top;
            var px = lft;
            self.timerscroll = {
              bz: new BezierClass(py, self.newscrolly, ms, 0, 0, 0.58, 1),
              bh: new BezierClass(px, self.newscrollx, ms, 0, 0, 0.58, 1)
            };
            if (!self.cursorfreezed) self.timerscroll.tm = setInterval(function() {
              self.showCursor(self.getScrollTop(), self.getScrollLeft())
            }, 60);

          }

          self.synched("doScroll-set", function() {
            self.timer = 0;
            if (self.scrollendtrapped) self.scrollrunning = true;
            self.setScrollTop(self.newscrolly);
            self.setScrollLeft(self.newscrollx);
            if (!self.scrollendtrapped) self.onScrollTransitionEnd();
          });


        }, 50);

      };

      this.cancelScroll = function() {
        if (!self.scrollendtrapped) return true;
        var py = self.getScrollTop();
        var px = self.getScrollLeft();
        self.scrollrunning = false;
        if (!cap.transitionend) clearTimeout(cap.transitionend);
        self.scrollendtrapped = false;
        self._unbind(self.doc[0], cap.transitionend, self.onScrollTransitionEnd);
        self.prepareTransition(0);
        self.setScrollTop(py); // fire event onscroll
        if (self.railh) self.setScrollLeft(px);
        if (self.timerscroll && self.timerscroll.tm) clearInterval(self.timerscroll.tm);
        self.timerscroll = false;

        self.cursorfreezed = false;

        self.showCursor(py, px);
        return self;
      };
      this.onScrollTransitionEnd = function() {
        if (self.scrollendtrapped) self._unbind(self.doc[0], cap.transitionend, self.onScrollTransitionEnd);
        self.scrollendtrapped = false;
        self.prepareTransition(0);
        if (self.timerscroll && self.timerscroll.tm) clearInterval(self.timerscroll.tm);
        self.timerscroll = false;
        var py = self.getScrollTop();
        var px = self.getScrollLeft();
        self.setScrollTop(py); // fire event onscroll        
        if (self.railh) self.setScrollLeft(px); // fire event onscroll left

        self.noticeCursor(false, py, px);

        self.cursorfreezed = false;

        if (py < 0) py = 0
        else if (py > self.page.maxh) py = self.page.maxh;
        if (px < 0) px = 0
        else if (px > self.page.maxw) px = self.page.maxw;
        if ((py != self.newscrolly) || (px != self.newscrollx)) return self.doScrollPos(px, py, self.opt.snapbackspeed);

        if (self.onscrollend && self.scrollrunning) {
          self.triggerScrollEnd();
        }
        self.scrollrunning = false;

      };

    } else {

      this.doScrollLeft = function(x, spd) { //no-trans
        var y = (self.scrollrunning) ? self.newscrolly : self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollTop = function(y, spd) { //no-trans
        var x = (self.scrollrunning) ? self.newscrollx : self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollPos = function(x, y, spd) { //no-trans
        var y = ((typeof y == "undefined") || (y === false)) ? self.getScrollTop(true) : y;

        if ((self.timer) && (self.newscrolly == y) && (self.newscrollx == x)) return true;

        if (self.timer) clearAnimationFrame(self.timer);
        self.timer = 0;

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if (((self.newscrolly - py) * (y - py) < 0) || ((self.newscrollx - px) * (x - px) < 0)) self.cancelScroll(); //inverted movement detection

        self.newscrolly = y;
        self.newscrollx = x;

        if (!self.bouncescroll || !self.rail.visibility) {
          if (self.newscrolly < 0) {
            self.newscrolly = 0;
          } else if (self.newscrolly > self.page.maxh) {
            self.newscrolly = self.page.maxh;
          }
        }
        if (!self.bouncescroll || !self.railh.visibility) {
          if (self.newscrollx < 0) {
            self.newscrollx = 0;
          } else if (self.newscrollx > self.page.maxw) {
            self.newscrollx = self.page.maxw;
          }
        }

        self.dst = {};
        self.dst.x = x - px;
        self.dst.y = y - py;
        self.dst.px = px;
        self.dst.py = py;

        var dst = Math.round(Math.sqrt(Math.pow(self.dst.x, 2) + Math.pow(self.dst.y, 2)));

        self.dst.ax = self.dst.x / dst;
        self.dst.ay = self.dst.y / dst;

        var pa = 0;
        var pe = dst;

        if (self.dst.x == 0) {
          pa = py;
          pe = y;
          self.dst.ay = 1;
          self.dst.py = 0;
        } else if (self.dst.y == 0) {
          pa = px;
          pe = x;
          self.dst.ax = 1;
          self.dst.px = 0;
        }

        var ms = self.getTransitionSpeed(dst);
        if (spd && spd <= 1) ms *= spd;
        if (ms > 0) {
          self.bzscroll = (self.bzscroll) ? self.bzscroll.update(pe, ms) : new BezierClass(pa, pe, ms, 0, 1, 0, 1);
        } else {
          self.bzscroll = false;
        }

        if (self.timer) return;

        if ((py == self.page.maxh && y >= self.page.maxh) || (px == self.page.maxw && x >= self.page.maxw)) self.checkContentSize();

        var sync = 1;

        function scrolling() {
          if (self.cancelAnimationFrame) return true;

          self.scrollrunning = true;

          sync = 1 - sync;
          if (sync) return (self.timer = setAnimationFrame(scrolling) || 1);

          var done = 0;
          var sx, sy;

          var sc = sy = self.getScrollTop();
          if (self.dst.ay) {
            sc = (self.bzscroll) ? self.dst.py + (self.bzscroll.getNow() * self.dst.ay) : self.newscrolly;
            var dr = sc - sy;
            if ((dr < 0 && sc < self.newscrolly) || (dr > 0 && sc > self.newscrolly)) sc = self.newscrolly;
            self.setScrollTop(sc);
            if (sc == self.newscrolly) done = 1;
          } else {
            done = 1;
          }

          var scx = sx = self.getScrollLeft();
          if (self.dst.ax) {
            scx = (self.bzscroll) ? self.dst.px + (self.bzscroll.getNow() * self.dst.ax) : self.newscrollx;
            var dr = scx - sx;
            if ((dr < 0 && scx < self.newscrollx) || (dr > 0 && scx > self.newscrollx)) scx = self.newscrollx;
            self.setScrollLeft(scx);
            if (scx == self.newscrollx) done += 1;
          } else {
            done += 1;
          }

          if (done == 2) {
            self.timer = 0;
            self.cursorfreezed = false;
            self.bzscroll = false;
            self.scrollrunning = false;
            if (sc < 0) sc = 0;
            else if (sc > self.page.maxh) sc = self.page.maxh;
            if (scx < 0) scx = 0;
            else if (scx > self.page.maxw) scx = self.page.maxw;
            if ((scx != self.newscrollx) || (sc != self.newscrolly)) self.doScrollPos(scx, sc);
            else {
              if (self.onscrollend) {
                self.triggerScrollEnd();
              }
            }
          } else {
            self.timer = setAnimationFrame(scrolling) || 1;
          }
        };
        self.cancelAnimationFrame = false;
        self.timer = 1;

        if (self.onscrollstart && !self.scrollrunning) {
          var info = {
            "type": "scrollstart",
            "current": {
              "x": px,
              "y": py
            },
            "request": {
              "x": x,
              "y": y
            },
            "end": {
              "x": self.newscrollx,
              "y": self.newscrolly
            },
            "speed": ms
          };
          self.onscrollstart.call(self, info);
        }

        scrolling();

        if ((py == self.page.maxh && y >= py) || (px == self.page.maxw && x >= px)) self.checkContentSize();

        self.noticeCursor();
      };

      this.cancelScroll = function() {
        if (self.timer) clearAnimationFrame(self.timer);
        self.timer = 0;
        self.bzscroll = false;
        self.scrollrunning = false;
        return self;
      };

    }

    this.doScrollBy = function(stp, relative) {
      var ny = 0;
      if (relative) {
        ny = Math.floor((self.scroll.y - stp) * self.scrollratio.y)
      } else {
        var sy = (self.timer) ? self.newscrolly : self.getScrollTop(true);
        ny = sy - stp;
      }
      if (self.bouncescroll) {
        var haf = Math.round(self.view.h / 2);
        if (ny < -haf) ny = -haf
        else if (ny > (self.page.maxh + haf)) ny = (self.page.maxh + haf);
      }
      self.cursorfreezed = false;

      var py = self.getScrollTop(true);
      if (ny < 0 && py <= 0) return self.noticeCursor();
      else if (ny > self.page.maxh && py >= self.page.maxh) {
        self.checkContentSize();
        return self.noticeCursor();
      }

      self.doScrollTop(ny);
    };

    this.doScrollLeftBy = function(stp, relative) {
      var nx = 0;
      if (relative) {
        nx = Math.floor((self.scroll.x - stp) * self.scrollratio.x)
      } else {
        var sx = (self.timer) ? self.newscrollx : self.getScrollLeft(true);
        nx = sx - stp;
      }
      if (self.bouncescroll) {
        var haf = Math.round(self.view.w / 2);
        if (nx < -haf) nx = -haf;
        else if (nx > (self.page.maxw + haf)) nx = (self.page.maxw + haf);
      }
      self.cursorfreezed = false;

      var px = self.getScrollLeft(true);
      if (nx < 0 && px <= 0) return self.noticeCursor();
      else if (nx > self.page.maxw && px >= self.page.maxw) return self.noticeCursor();

      self.doScrollLeft(nx);
    };

    this.doScrollTo = function(pos, relative) {
      var ny = (relative) ? Math.round(pos * self.scrollratio.y) : pos;
      if (ny < 0) ny = 0;
      else if (ny > self.page.maxh) ny = self.page.maxh;
      self.cursorfreezed = false;
      self.doScrollTop(pos);
    };

    this.checkContentSize = function() {
      var pg = self.getContentSize();
      if ((pg.h != self.page.h) || (pg.w != self.page.w)) self.resize(false, pg);
    };

    self.onscroll = function(e) {
      if (self.rail.drag) return;
      if (!self.cursorfreezed) {
        self.synched('scroll', function() {
          self.scroll.y = Math.round(self.getScrollTop() * (1 / self.scrollratio.y));
          if (self.railh) self.scroll.x = Math.round(self.getScrollLeft() * (1 / self.scrollratio.x));
          self.noticeCursor();
        });
      }
    };
    self.bind(self.docscroll, "scroll", self.onscroll);

    this.doZoomIn = function(e) {
      if (self.zoomactive) return;
      self.zoomactive = true;

      self.zoomrestore = {
        style: {}
      };
      var lst = ['position', 'top', 'left', 'zIndex', 'backgroundColor', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight'];
      var win = self.win[0].style;
      for (var a in lst) {
        var pp = lst[a];
        self.zoomrestore.style[pp] = (typeof win[pp] != "undefined") ? win[pp] : '';
      }

      self.zoomrestore.style.width = self.win.css('width');
      self.zoomrestore.style.height = self.win.css('height');

      self.zoomrestore.padding = {
        w: self.win.outerWidth() - self.win.width(),
        h: self.win.outerHeight() - self.win.height()
      };

      if (cap.isios4) {
        self.zoomrestore.scrollTop = $(window).scrollTop();
        $(window).scrollTop(0);
      }

      self.win.css({
        "position": (cap.isios4) ? "absolute" : "fixed",
        "top": 0,
        "left": 0,
        "z-index": globalmaxzindex + 100,
        "margin": "0px"
      });
      var bkg = self.win.css("backgroundColor");
      if (bkg == "" || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(bkg)) self.win.css("backgroundColor", "#fff");
      self.rail.css({
        "z-index": globalmaxzindex + 101
      });
      self.zoom.css({
        "z-index": globalmaxzindex + 102
      });
      self.zoom.css('backgroundPosition', '0px -18px');
      self.resizeZoom();

      if (self.onzoomin) self.onzoomin.call(self);

      return self.cancelEvent(e);
    };

    this.doZoomOut = function(e) {
      if (!self.zoomactive) return;
      self.zoomactive = false;

      self.win.css("margin", "");
      self.win.css(self.zoomrestore.style);

      if (cap.isios4) {
        $(window).scrollTop(self.zoomrestore.scrollTop);
      }

      self.rail.css({
        "z-index": self.zindex
      });
      self.zoom.css({
        "z-index": self.zindex
      });
      self.zoomrestore = false;
      self.zoom.css('backgroundPosition', '0px 0px');
      self.onResize();

      if (self.onzoomout) self.onzoomout.call(self);

      return self.cancelEvent(e);
    };

    this.doZoom = function(e) {
      return (self.zoomactive) ? self.doZoomOut(e) : self.doZoomIn(e);
    };

    this.resizeZoom = function() {
      if (!self.zoomactive) return;

      var py = self.getScrollTop(); //preserve scrolling position
      self.win.css({
        width: $(window).width() - self.zoomrestore.padding.w + "px",
        height: $(window).height() - self.zoomrestore.padding.h + "px"
      });
      self.onResize();

      self.setScrollTop(Math.min(self.page.maxh, py));
    };

    this.init();

    $.nicescroll.push(this);

  };

  // Inspired by the work of Kin Blas
  // http://webpro.host.adobe.com/people/jblas/momentum/includes/jquery.momentum.0.7.js  


  var ScrollMomentumClass2D = function(nc) {
    var self = this;
    this.nc = nc;

    this.lastx = 0;
    this.lasty = 0;
    this.speedx = 0;
    this.speedy = 0;
    this.lasttime = 0;
    this.steptime = 0;
    this.snapx = false;
    this.snapy = false;
    this.demulx = 0;
    this.demuly = 0;

    this.lastscrollx = -1;
    this.lastscrolly = -1;

    this.chkx = 0;
    this.chky = 0;

    this.timer = 0;

    this.time = function() {
      return +new Date(); //beautifull hack
    };

    this.reset = function(px, py) {
      self.stop();
      var now = self.time();
      self.steptime = 0;
      self.lasttime = now;
      self.speedx = 0;
      self.speedy = 0;
      self.lastx = px;
      self.lasty = py;
      self.lastscrollx = -1;
      self.lastscrolly = -1;
    };

    this.update = function(px, py) {
      var now = self.time();
      self.steptime = now - self.lasttime;
      self.lasttime = now;
      var dy = py - self.lasty;
      var dx = px - self.lastx;
      var sy = self.nc.getScrollTop();
      var sx = self.nc.getScrollLeft();
      var newy = sy + dy;
      var newx = sx + dx;
      self.snapx = (newx < 0) || (newx > self.nc.page.maxw);
      self.snapy = (newy < 0) || (newy > self.nc.page.maxh);
      self.speedx = dx;
      self.speedy = dy;
      self.lastx = px;
      self.lasty = py;
    };

    this.stop = function() {
      self.nc.unsynched("domomentum2d");
      if (self.timer) clearTimeout(self.timer);
      self.timer = 0;
      self.lastscrollx = -1;
      self.lastscrolly = -1;
    };

    this.doSnapy = function(nx, ny) {
      var snap = false;

      if (ny < 0) {
        ny = 0;
        snap = true;
      } else if (ny > self.nc.page.maxh) {
        ny = self.nc.page.maxh;
        snap = true;
      }

      if (nx < 0) {
        nx = 0;
        snap = true;
      } else if (nx > self.nc.page.maxw) {
        nx = self.nc.page.maxw;
        snap = true;
      }

      (snap) ? self.nc.doScrollPos(nx, ny, self.nc.opt.snapbackspeed): self.nc.triggerScrollEnd();
    };

    this.doMomentum = function(gp) {
      var t = self.time();
      var l = (gp) ? t + gp : self.lasttime;

      var sl = self.nc.getScrollLeft();
      var st = self.nc.getScrollTop();

      var pageh = self.nc.page.maxh;
      var pagew = self.nc.page.maxw;

      self.speedx = (pagew > 0) ? Math.min(60, self.speedx) : 0;
      self.speedy = (pageh > 0) ? Math.min(60, self.speedy) : 0;

      var chk = l && (t - l) <= 60;

      if ((st < 0) || (st > pageh) || (sl < 0) || (sl > pagew)) chk = false;

      var sy = (self.speedy && chk) ? self.speedy : false;
      var sx = (self.speedx && chk) ? self.speedx : false;

      if (sy || sx) {
        var tm = Math.max(16, self.steptime); //timeout granularity

        if (tm > 50) { // do smooth
          var xm = tm / 50;
          self.speedx *= xm;
          self.speedy *= xm;
          tm = 50;
        }

        self.demulxy = 0;

        self.lastscrollx = self.nc.getScrollLeft();
        self.chkx = self.lastscrollx;
        self.lastscrolly = self.nc.getScrollTop();
        self.chky = self.lastscrolly;

        var nx = self.lastscrollx;
        var ny = self.lastscrolly;

        var onscroll = function() {
          var df = ((self.time() - t) > 600) ? 0.04 : 0.02;

          if (self.speedx) {
            nx = Math.floor(self.lastscrollx - (self.speedx * (1 - self.demulxy)));
            self.lastscrollx = nx;
            if ((nx < 0) || (nx > pagew)) df = 0.10;
          }

          if (self.speedy) {
            ny = Math.floor(self.lastscrolly - (self.speedy * (1 - self.demulxy)));
            self.lastscrolly = ny;
            if ((ny < 0) || (ny > pageh)) df = 0.10;
          }

          self.demulxy = Math.min(1, self.demulxy + df);

          self.nc.synched("domomentum2d", function() {

            if (self.speedx) {
              var scx = self.nc.getScrollLeft();
              if (scx != self.chkx) self.stop();
              self.chkx = nx;
              self.nc.setScrollLeft(nx);
            }

            if (self.speedy) {
              var scy = self.nc.getScrollTop();
              if (scy != self.chky) self.stop();
              self.chky = ny;
              self.nc.setScrollTop(ny);
            }

            if (!self.timer) {
              self.nc.hideCursor();
              self.doSnapy(nx, ny);
            }

          });

          if (self.demulxy < 1) {
            self.timer = setTimeout(onscroll, tm);
          } else {
            self.stop();
            self.nc.hideCursor();
            self.doSnapy(nx, ny);
          }
        };

        onscroll();

      } else {
        self.doSnapy(self.nc.getScrollLeft(), self.nc.getScrollTop());
      }

    }

  };


  // override jQuery scrollTop

  var _scrollTop = jQuery.fn.scrollTop; // preserve original function

  jQuery.cssHooks["pageYOffset"] = {
    get: function(elem, computed, extra) {
      var nice = $.data(elem, '__nicescroll') || false;
      return (nice && nice.ishwscroll) ? nice.getScrollTop() : _scrollTop.call(elem);
    },
    set: function(elem, value) {
      var nice = $.data(elem, '__nicescroll') || false;
      (nice && nice.ishwscroll) ? nice.setScrollTop(parseInt(value)): _scrollTop.call(elem, value);
      return this;
    }
  };

  /*  
  $.fx.step["scrollTop"] = function(fx){    
    $.cssHooks["scrollTop"].set( fx.elem, fx.now + fx.unit );
  };
*/

  jQuery.fn.scrollTop = function(value) {
    if (typeof value == "undefined") {
      var nice = (this[0]) ? $.data(this[0], '__nicescroll') || false : false;
      return (nice && nice.ishwscroll) ? nice.getScrollTop() : _scrollTop.call(this);
    } else {
      return this.each(function() {
        var nice = $.data(this, '__nicescroll') || false;
        (nice && nice.ishwscroll) ? nice.setScrollTop(parseInt(value)): _scrollTop.call($(this), value);
      });
    }
  };

  // override jQuery scrollLeft

  var _scrollLeft = jQuery.fn.scrollLeft; // preserve original function

  $.cssHooks.pageXOffset = {
    get: function(elem, computed, extra) {
      var nice = $.data(elem, '__nicescroll') || false;
      return (nice && nice.ishwscroll) ? nice.getScrollLeft() : _scrollLeft.call(elem);
    },
    set: function(elem, value) {
      var nice = $.data(elem, '__nicescroll') || false;
      (nice && nice.ishwscroll) ? nice.setScrollLeft(parseInt(value)): _scrollLeft.call(elem, value);
      return this;
    }
  };

  /*  
  $.fx.step["scrollLeft"] = function(fx){
    $.cssHooks["scrollLeft"].set( fx.elem, fx.now + fx.unit );
  };  
*/

  jQuery.fn.scrollLeft = function(value) {
    if (typeof value == "undefined") {
      var nice = (this[0]) ? $.data(this[0], '__nicescroll') || false : false;
      return (nice && nice.ishwscroll) ? nice.getScrollLeft() : _scrollLeft.call(this);
    } else {
      return this.each(function() {
        var nice = $.data(this, '__nicescroll') || false;
        (nice && nice.ishwscroll) ? nice.setScrollLeft(parseInt(value)): _scrollLeft.call($(this), value);
      });
    }
  };

  var NiceScrollArray = function(doms) {
    var self = this;
    this.length = 0;
    this.name = "nicescrollarray";

    this.each = function(fn) {
      for (var a = 0, i = 0; a < self.length; a++) fn.call(self[a], i++);
      return self;
    };

    this.push = function(nice) {
      self[self.length] = nice;
      self.length++;
    };

    this.eq = function(idx) {
      return self[idx];
    };

    if (doms) {
      for (var a = 0; a < doms.length; a++) {
        var nice = $.data(doms[a], '__nicescroll') || false;
        if (nice) {
          this[this.length] = nice;
          this.length++;
        }
      };
    }

    return this;
  };

  function mplex(el, lst, fn) {
    for (var a = 0; a < lst.length; a++) fn(el, lst[a]);
  };
  mplex(
    NiceScrollArray.prototype, ['show', 'hide', 'toggle', 'onResize', 'resize', 'remove', 'stop', 'doScrollPos'],
    function(e, n) {
      e[n] = function() {
        var args = arguments;
        return this.each(function() {
          this[n].apply(this, args);
        });
      };
    }
  );

  jQuery.fn.getNiceScroll = function(index) {
    if (typeof index == "undefined") {
      return new NiceScrollArray(this);
    } else {
      var nice = this[index] && $.data(this[index], '__nicescroll') || false;
      return nice;
    }
  };

  jQuery.extend(jQuery.expr[':'], {
    nicescroll: function(a) {
      return ($.data(a, '__nicescroll')) ? true : false;
    }
  });

  $.fn.niceScroll = function(wrapper, opt) {
    if (typeof opt == "undefined") {
      if ((typeof wrapper == "object") && !("jquery" in wrapper)) {
        opt = wrapper;
        wrapper = false;
      }
    }
    opt = $.extend({},opt); // cloning
    var ret = new NiceScrollArray();
    if (typeof opt == "undefined") opt = {};

    if (wrapper || false) {
      opt.doc = $(wrapper);
      opt.win = $(this);
    }
    var docundef = !("doc" in opt);
    if (!docundef && !("win" in opt)) opt.win = $(this);

    this.each(function() {
      var nice = $(this).data('__nicescroll') || false;
      if (!nice) {
        opt.doc = (docundef) ? $(this) : opt.doc;
        nice = new NiceScrollClass(opt, $(this));
        $(this).data('__nicescroll', nice);
      }
      ret.push(nice);
    });
    return (ret.length == 1) ? ret[0] : ret;
  };

  window.NiceScroll = {
    getjQuery: function() {
      return jQuery
    }
  };

  if (!$.nicescroll) {
    $.nicescroll = new NiceScrollArray();
    $.nicescroll.options = _globaloptions;
  }

}));

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Create pipe for all hint messages from different modules
require('./src/modules/hintEmitter');

// Load angular hint modules
require('./src/modules/controllers');
// require('./src/modules/directives');
// require('./src/modules/dom');
require('./src/modules/events');
// require('./src/modules/interpolation');
require('./src/modules/modules');
require('./src/modules/scopes');

// List of all possible modules
// The default ng-hint behavior loads all modules
var AVAILABLE_MODULES = [
  'ngHintControllers',
// 'ngHintDirectives',
//  'ngHintDom',
  'ngHintEvents',
//  'ngHintInterpolation',
  'ngHintModules',
  'ngHintScopes'
];

var SEVERITY_WARNING = 2;
var DEFER_LABEL = 'NG_DEFER_BOOTSTRAP!';

var deferRegex = new RegExp('^' + DEFER_LABEL + '.*');
// Determine whether this run is by protractor.
// If protractor is running, the bootstrap will already be deferred.
// In this case `resumeBootstrap` should be patched to load the hint modules.
if (deferRegex.test(window.name)) {
  var originalResumeBootstrap;
  Object.defineProperty(angular, 'resumeBootstrap', {
    get: function() {
      return function(modules) {
        return originalResumeBootstrap.call(angular, modules.concat(loadModules()));
      };
    },
    set: function(resumeBootstrap) {
      originalResumeBootstrap = resumeBootstrap;
    }
  });
}
//If this is not a test, defer bootstrapping
else {
  window.name = DEFER_LABEL + window.name;

  // determine which modules to load and resume bootstrap
  document.addEventListener('DOMContentLoaded', maybeBootstrap);

  /* angular should remove DEFER_LABEL from window.name, but if angular is never loaded, we want
   to remove it ourselves, otherwise hint will incorrectly detect protractor as being present on
   the next page load */
  window.addEventListener('beforeunload', function() {
    if (deferRegex.test(window.name)) {
      window.name = window.name.substring(DEFER_LABEL.length);
    }
  });
}

function maybeBootstrap() {
  // we don't know if angular is loaded
  if (!angular.resumeBootstrap) {
    return setTimeout(maybeBootstrap, 1);
  }

  var modules = loadModules();
  angular.resumeBootstrap(modules);
}

function loadModules() {
  var modules = [], elt;
  if (angular.version.minor < 2) {
    return modules;
  }

  if ((elt = document.querySelector('[ng-hint-include]'))) {
    modules = hintModulesFromElement(elt);
  } else if (elt = document.querySelector('[ng-hint-exclude]')) {
    modules = excludeModules(hintModulesFromElement(elt));
  } else if (document.querySelector('[ng-hint]')) {
    modules = AVAILABLE_MODULES;
  } else {
    angular.hint.emit('general:noinclude', 'ngHint is included on the page, but is not active because ' +
      'there is no `ng-hint` attribute present', SEVERITY_WARNING);
  }
  return modules;
}

function excludeModules(modulesToExclude) {
  return AVAILABLE_MODULES.filter(function(module) {
    return modulesToExclude.indexOf(module) === -1;
  });
}

function hintModulesFromElement (elt) {
  var selectedModules = (elt.attributes['ng-hint-include'] ||
    elt.attributes['ng-hint-exclude']).value.split(' ');

  return selectedModules.map(hintModuleName).filter(function (name) {
    return (AVAILABLE_MODULES.indexOf(name) > -1) ||
      angular.hint.emit('general:404module', 'Module ' + name + ' could not be found', SEVERITY_WARNING);
  });
}

function hintModuleName(name) {
  return 'ngHint' + title(name);
}

function title(str) {
  return str[0].toUpperCase() + str.substr(1);
}

var LEVELS = [
  'error',
  'warning',
  'suggestion'
];

},{"./src/modules/controllers":23,"./src/modules/events":24,"./src/modules/hintEmitter":25,"./src/modules/modules":26,"./src/modules/scopes":27}],2:[function(require,module,exports){
module.exports = function debounceOn (fn, timeout, hash) {
  var timeouts = {};

  timeout = typeof timeout === 'number' ? timeout : (hash = timeout, 100);
  hash = typeof hash === 'function' ? hash : defaultHash;

  return function () {
    var key = hash.apply(null, arguments);
    var args = arguments;
    if (typeof timeouts[key] === 'undefined') {
      timeouts[key] = setTimeout(function () {
        delete timeouts[key];
        fn.apply(null, args);
      }, timeout);
    }
    return function cancel () {
      if (timeouts[key]) {
        clearTimeout(timeouts[key]);
        delete timeouts[key];
        return true;
      }
      return false;
    };
  };
};

function defaultHash () {
  return Array.prototype.join.call(arguments, '::');
}

},{}],3:[function(require,module,exports){
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {

      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;

            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
              console.trace();
            }
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
    if (!this._conf) this._conf = {};
    this._conf.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    }

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {

      if (!this._all &&
        !this._events.error &&
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || !!this._all;
    }
    else {
      return !!this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {

    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;

        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if(!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          return this;
        }
      }
    } else {
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
     // AMD. Register as an anonymous module.
    define(function() {
      return EventEmitter;
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    exports.EventEmitter2 = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();

},{}],4:[function(require,module,exports){
module.exports = distance;

function distance(a, b) {
  var table = [];
  if (a.length === 0 || b.length === 0) return Math.max(a.length, b.length);
  for (var ii = 0, ilen = a.length + 1; ii !== ilen; ++ii) {
    table[ii] = [];
    for (var jj = 0, jlen = b.length + 1; jj !== jlen; ++jj) {
      if (ii === 0 || jj === 0) table[ii][jj] = Math.max(ii, jj);
      else {
        var diagPenalty = Number(a[ii-1] !== b[jj-1]);
        var diag = table[ii - 1][jj - 1] + diagPenalty;
        var top = table[ii - 1][jj] + 1;
        var left = table[ii][jj - 1] + 1;
        table[ii][jj] = Math.min(left, top, diag);
      }
    }
  }
  return table[a.length][b.length];
}


},{}],5:[function(require,module,exports){
module.exports = suggestDictionary;

var distance = require('./levenstein_distance');

function suggestDictionary(dict, opts) {
  opts = opts || {};
  var threshold = opts.threshold || 0.5;
  return function suggest(word) {
    var length = word.length;
    return dict.reduce(function (result, dictEntry) {
      var score = distance(dictEntry, word);
      if (result.score > score && score / length < threshold) {
        result.score = score;
        result.word = dictEntry;
      }
      return result;
    }, { score: Infinity }).word;
  };
}

suggestDictionary.distance = distance;

},{"./levenstein_distance":4}],6:[function(require,module,exports){
'use strict';

var list = 'click submit mouseenter mouseleave mousemove mousedown mouseover mouseup dblclick keyup keydown keypress blur focus submit cut copy paste'.split(' ');

module.exports = list.map(function(eventName) {
  return 'ng' + eventName.charAt(0).toUpperCase() + eventName.substr(1);
});

},{}],7:[function(require,module,exports){
'use strict';

module.exports = function summarizeModel (model) {

  if (model instanceof Array) {
    return JSON.stringify(model.map(summarizeProperty));
  } else if (typeof model === 'object') {
    return JSON.stringify(Object.
        keys(model).
        filter(isAngularPrivatePropertyName).
        reduce(shallowSummary, {}));
  } else {
    return model;
  }

  function shallowSummary (obj, prop) {
    obj[prop] = summarizeProperty(model[prop]);
    return obj;
  }
};

function isAngularPrivatePropertyName (key) {
  return !(key[0] === '$' && key[1] === '$') && key !== '$parent' && key !== '$root';
}

// TODO: handle DOM nodes, fns, etc better.
function summarizeProperty (obj) {
  return obj instanceof Array ?
      { '~array-length': obj.length } :
    obj === null ?
      null :
    typeof obj === 'object' ?
      { '~object': true } :
      obj;
}

},{}],8:[function(require,module,exports){
var MODULE_NAME = 'Modules';

module.exports = function(modules) {
  modules.forEach(function(module) {
    angular.hint.emit(MODULE_NAME, module.message, module.severity);
  });
};

},{}],9:[function(require,module,exports){
var modData = require('./moduleData');
  MODULE_NAME = 'Modules',
  SEVERITY_WARNING = 2;

module.exports = function() {
  var multiLoaded = [];
  for(var modName in modData.createdMulti) {
    var message = 'Multiple modules with name "' + modName + '" are being created and they will ' +
      'overwrite each other.';
    var multi = modData.createdMulti[modName];
    var multiLength = multi.length;
    var details = {
      existingModule: multi[multiLength - 1],
      overwrittenModules: multi.slice(0, multiLength - 1)
    };
    multiLoaded
      .push({module: details, message: message, name: MODULE_NAME, severity: SEVERITY_WARNING});
  }
  return multiLoaded;
};

},{"./moduleData":16}],10:[function(require,module,exports){
var modData = require('./moduleData');

module.exports = function(moduleName, getCreated) {
  return (getCreated)? modData.createdModules[moduleName] : modData.loadedModules[moduleName];
};

},{"./moduleData":16}],11:[function(require,module,exports){
var MODULE_NAME = 'Modules',
  SEVERITY_ERROR = 1;
 module.exports = function(attrs, ngAppFound) {
   if(attrs['ng-app'] && ngAppFound) {
     angular.hint.emit(MODULE_NAME, 'ng-app may only be included once. The module "' +
      attrs['ng-app'].value + '" was not used to bootstrap because ng-app was already included.',
      SEVERITY_ERROR);
   }
  return attrs['ng-app'] ? attrs['ng-app'].value : undefined;
 };



},{}],12:[function(require,module,exports){
var getModule = require('./getModule'),
  dictionary = Object.keys(require('./moduleData').createdModules),
  suggest = require('suggest-it')(dictionary),
  SEVERITY_ERROR = 1;

module.exports = function(loadedModules) {
  var undeclaredModules = [];
  for(var module in loadedModules) {
    var cModule = getModule(module, true);
    if(!cModule) {
      var match = suggest(module),
        suggestion = (match) ? '; Try: "'+match+'"' : '',
        message = 'Module "'+module+'" was loaded but does not exist'+suggestion+'.';

      undeclaredModules.push({module: null, message: message, severity: SEVERITY_ERROR});
    }
  }
  return undeclaredModules;
};

},{"./getModule":10,"./moduleData":16,"suggest-it":5}],13:[function(require,module,exports){
var getModule = require('./getModule');

var IGNORED = ['ngHintControllers', 'ngHintDirectives', 'ngHintDom', 'ngHintEvents',
             'ngHintInterpolation', 'ngHintModules', 'ngHintScopes', 'ng', 'ngLocale', 'protractorBaseModule_'],
    SEVERITY_WARNING = 2;

module.exports = function(createdModules) {
  var unusedModules = [];
  for(var module in createdModules) {
    if(!getModule(module)) {
      var cModule = createdModules[module],
        message = 'Module "' + cModule.name + '" was created but never loaded.';
      if(IGNORED.indexOf(cModule.name) === -1) {
        unusedModules.push({module: cModule, message: message, severity: SEVERITY_WARNING});
      }
    }
  }
  return unusedModules;
};

},{"./getModule":10}],14:[function(require,module,exports){
var MODULE_NAME = 'Modules',
    SEVERITY_SUGGESTION = 3;

module.exports = function(str) {
  if (str === 'ng') {
    return true;
  }

  if(str.charAt(0).toUpperCase() === str.charAt(0)) {
    angular.hint.emit(MODULE_NAME, 'The best practice for' +
      ' module names is to use dot.case or lowerCamelCase. Check the name of "' + str + '".',
      SEVERITY_SUGGESTION);
    return false;
  }
  if(str.toLowerCase() === str && str.indexOf('.') === -1) {
    angular.hint.emit(MODULE_NAME, 'Module names should be namespaced' +
      ' with a dot (app.dashboard) or lowerCamelCase (appDashboard). Check the name of "' + str + '".', SEVERITY_SUGGESTION);
    return false;
  }
  return true;
};

},{}],15:[function(require,module,exports){
var normalizeAttribute = require('./normalizeAttribute');

module.exports = function(attrs) {
  for(var i = 0, length = attrs.length; i < length; i++) {
    if(normalizeAttribute(attrs[i].nodeName) === 'ng-view' ||
        attrs[i].value.indexOf('ng-view') > -1) {
          return true;
    }
  }
};

},{"./normalizeAttribute":18}],16:[function(require,module,exports){
module.exports = {
  createdModules: {},
  createdMulti: {},
  loadedModules: {}
};

},{}],17:[function(require,module,exports){
var modData = require('./moduleData'),
  getModule = require('./getModule');

module.exports = function() {
  if(modData.ngViewExists && !getModule('ngRoute')) {
    return {message: 'Directive "ngView" was used in the application however "ngRoute" was not loaded into any module.'};
  }
};

},{"./getModule":10,"./moduleData":16}],18:[function(require,module,exports){
module.exports = function(attribute) {
  return attribute.replace(/^(?:data|x)[-_:]/, '').replace(/[:_]/g, '-');
};

},{}],19:[function(require,module,exports){
var display = require('./display'),
  formatMultiLoaded = require('./formatMultiLoaded'),
  getUnusedModules = require('./getUnusedModules'),
  getUndeclaredModules = require('./getUndeclaredModules'),
  modData = require('./moduleData'),
  ngViewNoNgRoute = require('./ngViewNoNgRoute');

module.exports = function() {
  var unusedModules = getUnusedModules(modData.createdModules),
    undeclaredModules = getUndeclaredModules(modData.loadedModules),
    multiLoaded = formatMultiLoaded(),
    noNgRoute = ngViewNoNgRoute();
  if(unusedModules.length || undeclaredModules.length || multiLoaded.length || noNgRoute) {
    var toSend = unusedModules.concat(undeclaredModules)
      .concat(multiLoaded);
    if(noNgRoute) {
      toSend = toSend.concat(noNgRoute);
    }
    display(toSend);
  }
};

},{"./display":8,"./formatMultiLoaded":9,"./getUndeclaredModules":12,"./getUnusedModules":13,"./moduleData":16,"./ngViewNoNgRoute":17}],20:[function(require,module,exports){
var modData = require('./moduleData');

module.exports = function(module, isNgAppMod) {
  var name = module.name || module;
  if(!isNgAppMod){
    module.requires.forEach(function(dependency){
      modData.loadedModules[dependency] = dependency;
    });
  }
  else {
    modData.loadedModules[name] = name;
    modData.ngAppMod = name;
  }
};

},{"./moduleData":16}],21:[function(require,module,exports){
var getNgAppMod = require('./getNgAppMod'),
  inAttrsOrClasses = require('./inAttrsOrClasses'),
  storeDependencies = require('./storeDependencies'),
  modData = require('./moduleData');

module.exports = function(doms) {
  var bothFound,
      ngViewFound,
      elem,
      isElemName,
      isInAttrsOrClasses,
      ngAppMod;

  for(var i = 0; i < doms.length; i++) {
    elem = doms[i];
    var attributes = elem.attributes;
    isElemName = elem.nodeName.toLowerCase() === 'ng-view';
    isInAttrsOrClasses = inAttrsOrClasses(attributes);

    ngViewFound = isElemName || isInAttrsOrClasses;

    ngAppMod = getNgAppMod(attributes, modData.ngAppFound);
    modData.ngAppFound = modData.ngAppFound || ngAppMod;

    if(ngAppMod) {
      storeDependencies(ngAppMod, true);
    }
    modData.ngViewExists = ngViewFound ? true : modData.ngViewExists;

    if(bothFound) {
      break;
    }
  }
};

},{"./getNgAppMod":11,"./inAttrsOrClasses":15,"./moduleData":16,"./storeDependencies":20}],22:[function(require,module,exports){
var storeDependencies = require('./storeDependencies');

var seen = [];

var storeUsedModules = module.exports = function(module, modules){
  var name = module.name || module;
  if(module && seen.indexOf(name) === -1) {
    seen.push(name);
    storeDependencies(module);
    module.requires.forEach(function(modName) {
      var mod = modules[modName];
      storeUsedModules(mod, modules);
    });
  }
};
},{"./storeDependencies":20}],23:[function(require,module,exports){
'use strict';

var MODULE_NAME = 'Controllers',
    CNTRL_REG = /^(\S+)(\s+as\s+(\w+))?$/,
    CATEGORY_CONTROLLER_NAME = 'Name controllers according to best practices',
    CATEGORY_GLOBAL_CONTROLLER = 'Using global functions as controllers is against Angular best practices and depricated in Angular 1.3 and up',
    SEVERITY_ERROR = 1,
    SEVERITY_WARNING = 2;

// local state
var nameToControllerMap = {};

/**
* Decorates $controller with a patching function to
* log a message if the controller is instantiated on the window
*/
angular.module('ngHintControllers', []).
  config(['$provide', '$controllerProvider', function ($provide, $controllerProvider) {
    $provide.decorator('$controller', ['$delegate', controllerDecorator]);

    var originalRegister = $controllerProvider.register;
    $controllerProvider.register = function(name, constructor) {
      stringOrObjectRegister(name);
      originalRegister.apply($controllerProvider, arguments);
    }
  }]);

function controllerDecorator($delegate) {
  return function(ctrl) {
    if (typeof ctrl === 'string') {
      var match = ctrl.match(CNTRL_REG);
      var ctrlName = (match && match[1]) || ctrl;

      if (!nameToControllerMap[ctrlName]) {
        sendMessageForControllerName(ctrlName);
      }

      if (!nameToControllerMap[ctrlName] && typeof window[ctrlName] === 'function') {
        sendMessageForGlobalController(ctrlName);
      }
    }
    return $delegate.apply(this, arguments);
  };
}

/**
* Save details of the controllers as they are instantiated
* for use in decoration.
* Hint about the best practices for naming controllers.
*/
var originalModule = angular.module;

function stringOrObjectRegister(controllerName) {
  if ((controllerName !== null) && (typeof controllerName === 'object')) {
    Object.keys(controllerName).forEach(processController);
  } else {
    processController(controllerName);
  }
}

function processController(ctrlName) {
  nameToControllerMap[ctrlName] = true;
  sendMessageForControllerName(ctrlName);
}

function sendMessageForGlobalController(name) {
  angular.hint.emit(MODULE_NAME + ':global',
    'add `' + name + '` to a module',
    angular.version.minor <= 2 ? SEVERITY_WARNING : SEVERITY_ERROR,
    CATEGORY_GLOBAL_CONTROLLER);
}

function sendMessageForControllerName(name) {
  var newName = name;
  if (!startsWithUpperCase(name)) {
    newName = title(newName);
  }
  if (!endsWithController(name)) {
    newName = addControllerSuffix(newName);
  }
  if (name !== newName) {
    angular.hint.emit(MODULE_NAME + ':rename',
      'Consider renaming `' + name + '` to `' + newName + '`.',
      SEVERITY_WARNING,
      CATEGORY_CONTROLLER_NAME);
  }
}

function startsWithUpperCase(name) {
  var firstChar = name.charAt(0);
  return firstChar === firstChar.toUpperCase() &&
         firstChar !== firstChar.toLowerCase();
}

function title (name) {
  return name[0].toUpperCase() + name.substr(1);
}

var CONTROLLER_RE = /Controller$/;
function endsWithController(name) {
  return CONTROLLER_RE.test(name);
}

var RE = /(Ctrl|Kontroller)?$/;
function addControllerSuffix(name) {
  return name.replace(RE, 'Controller');
}

/*
 * decorate angular module API
 */

angular.module = function() {
  var module = originalModule.apply(this, arguments),
      originalController = module.controller;

  module.controller = function(controllerName, controllerConstructor) {
    stringOrObjectRegister(controllerName);
    return originalController.apply(this, arguments);
  };

  return module;
};

},{}],24:[function(require,module,exports){
'use strict';

/**
* Load necessary functions from /lib into variables.
*/
var ngEventAttributes = require('../lib/event-directives'),
    MODULE_NAME = 'Events';

/*
 * Remove string expressions except property accessors.
 * ex. abc["def"] = "gef"; // `removeStringExp` will remove "gef" but not "def".
 */
function removeStringExp(str) {
  return str.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g,
    function(match, pos, full) {
      // this is our lookaround code so that our regex doesn't become so
      // complicated.
      if (pos !== 0 && (match.length + pos) !== full.length &&
          full[pos - 1] === '[' && full[pos + match.length] === ']') {
           return match;
      }
      return '';
    });
}

var getFunctionNames = function(str) {
  if (typeof str !== 'string') {
    return [];
  }
  // There are still a bunch of corner cases here where we aren't going to be able to handle
  // but we shouldn't break the user's app and we should handle most common cases.
  // example of corner cases: we can't check for properties inside of function
  // arguments like `move(a.b.c)` with the current implementation
  // or property accessors with parentheses in them
  // like `prop["hello (world)"] = "test";`.
  // To fully fix these issues we would need a full blown expression parser.
  var results = removeStringExp(str.replace(/\s+/g, ''))
    .replace(/\(.*?\)/g, '')
    .split(/[\+\-\/\|\<\>\^=&!%~?:;]/g).map(function(x) {
      if (isNaN(+x)) {
        if (x.match(/\w+\(.*\)$/)){
          return x.substr(0, x.indexOf('('));
        }
        return x;
      }
  }).filter(function(x){
    return x;
  });
  return results;
};

/**
* Decorate $provide in order to examine ng-event directives
* and hint about their effective use.
*/
angular.module('ngHintEvents', [])
  .config(['$provide', function($provide) {
    for (var i = 0; i < ngEventAttributes.length; i++) {
      try {
        $provide.decorator(ngEventAttributes[i] + 'Directive',
            ['$delegate', '$parse', ngEventDirectivesDecorator(ngEventAttributes[i])]);
      } catch(e) {}
    }
  }]);

function ngEventDirectivesDecorator(ngEventAttrName) {
  return function ($delegate, $parse) {
    var originalCompileFn = $delegate[0].compile;

    $delegate[0].compile = function(element, attrs, transclude) {
      var linkFn = originalCompileFn.apply(this, arguments);

      return function ngEventHandler(scope, element, attrs) {
        var boundFuncs = getFunctionNames(attrs[ngEventAttrName]);

        // guard against any parsing errors since the parsing code
        // to split the expression is pretty simple and naive.
        try {
          boundFuncs.forEach(function(boundFn) {
            var property, propChain, lastProp = '';
            while((property = boundFn.match(/^.+?([^\.\[])*/)) !== null) {
              property = property[0];
              propChain = lastProp + property;
              if ($parse(propChain)(scope) === undefined) {
                angular.hint.emit(MODULE_NAME + ':undef', propChain + ' is undefined');
              }
              boundFn = boundFn.replace(property, '');
              lastProp += property;
              if(boundFn.charAt(0) === '.') {
                lastProp += '.';
                boundFn = boundFn.substr(1);
              }
            }
          });
        } catch (e) {
          angular.hint.emit(MODULE_NAME + ':undef', '' +
            'parsing error: please inform the angular-hint ' +
            'or batarang teams. expression: ' + boundFuncs.join(''));
        }

        return linkFn.apply(this, arguments);
      };
    };
    return $delegate;
  }
}

},{"../lib/event-directives":6}],25:[function(require,module,exports){
'use strict';

/**
 * We use EventEmitter2 here in order to have scoped events
 * For instance:
 *    hint.emit('scope:digest', {
 */
var EventEmitter2 = require('eventemitter2').EventEmitter2;

angular.hint = new EventEmitter2({
  wildcard: true,
  delimiter: ':'
});
},{"eventemitter2":3}],26:[function(require,module,exports){
'use strict';

var getModule = require('./angular-hint-modules/getModule'),
    start = require('./angular-hint-modules/start'),
    storeNgAppAndView = require('./angular-hint-modules/storeNgAppAndView'),
    storeUsedModules = require('./angular-hint-modules/storeUsedModules'),
    hasNameSpace = require('./angular-hint-modules/hasNameSpace'),
    modData = require('./angular-hint-modules/moduleData');

var doc = Array.prototype.slice.call(document.getElementsByTagName('*')),
    originalAngularModule = angular.module,
    modules = {};

storeNgAppAndView(doc);

angular.module = function(name, requiresOriginal) {
  var module = originalAngularModule.apply(this, arguments),
      name = module.name;

  module.requiresOriginal = requiresOriginal;
  modules[name] = module;
  var modToCheck = getModule(name, true);
  //check arguments to determine if called as setter or getter
  var modIsSetter = arguments.length > 1;

  if (modIsSetter) {
    hasNameSpace(name);
  }

  if(modToCheck && modToCheck.requiresOriginal !== module.requiresOriginal && modIsSetter) {
    if(!modData.createdMulti[name]) {
      modData.createdMulti[name] = [getModule(name,true)];
    }
    modData.createdMulti[name].push(module);
  }
  modData.createdModules[name] = module;
  return module;
};

angular.module('ngHintModules', []).config(function() {
  var ngAppMod = modules[modData.ngAppMod];
  if (ngAppMod) {
    storeUsedModules(ngAppMod, modules);
  }
  start();
});

},{"./angular-hint-modules/getModule":10,"./angular-hint-modules/hasNameSpace":14,"./angular-hint-modules/moduleData":16,"./angular-hint-modules/start":19,"./angular-hint-modules/storeNgAppAndView":21,"./angular-hint-modules/storeUsedModules":22}],27:[function(require,module,exports){
'use strict';

var summarize = require('../lib/summarize-model');
var debounceOn = require('debounce-on');

var hint = angular.hint;

hint.emit = hint.emit || function () {};

module.exports = angular.module('ngHintScopes', []).config(['$provide', function ($provide) {
  $provide.decorator('$rootScope', ['$delegate', '$parse', decorateRootScope]);
  $provide.decorator('$compile', ['$delegate', decorateDollaCompile]);
}]);

function decorateRootScope($delegate, $parse) {

  var perf = window.performance || { now: function () { return 0; } };

  var scopes = {},
      watching = {};

  var debouncedEmitModelChange = debounceOn(emitModelChange, 10);

  hint.watch = function (scopeId, path) {
    path = typeof path === 'string' ? path.split('.') : path;

    if (!watching[scopeId]) {
      watching[scopeId] = {};
    }

    for (var i = 1, ii = path.length; i <= ii; i += 1) {
      var partialPath = path.slice(0, i).join('.');
      if (watching[scopeId][partialPath]) {
        continue;
      }
      var get = gettterer(scopeId, partialPath);
      var value = summarize(get());
      watching[scopeId][partialPath] = {
        get: get,
        value: value
      };
      hint.emit('model:change', {
        id: convertIdToOriginalType(scopeId),
        path: partialPath,
        value: value
      });
    }
  };

  hint.assign = function (scopeId, path, value) {
    var scope;
    if (scope = scopes[scopeId]) {
      scope.$apply(function () {
        return $parse(path).assign(scope, value);
      });
    }
  };

  hint.inspectScope = function (scopeId) {
    var scope;
    if (scope = scopes[scopeId]) {
      window.$scope = scope;
    }
  };

  hint.unwatch = function (scopeId, unwatchPath) {
    Object.keys(watching[scopeId]).
      forEach(function (path) {
        if (path.indexOf(unwatchPath) === 0) {
          delete watching[scopeId][path];
        }
      });
  };

  var scopePrototype = ('getPrototypeOf' in Object) ?
      Object.getPrototypeOf($delegate) : $delegate.__proto__;

  var _watch = scopePrototype.$watch;
  var _digestEvents = [];
  var skipNextPerfWatchers = false;
  scopePrototype.$watch = function (watchExpression, reactionFunction) {
    // if `skipNextPerfWatchers` is true, this means the previous run of the
    // `$watch` decorator was a one time binding expression and this invocation
    // of the $watch function has the `oneTimeInterceptedExpression` (internal angular function)
    // as the `watchExpression` parameter. If we decorate it with the performance
    // timers function this will cause us to invoke `oneTimeInterceptedExpression`
    // on subsequent digest loops and will update the one time bindings
    // if anything mutated the property.
    if (skipNextPerfWatchers) {
      skipNextPerfWatchers = false;
      return _watch.apply(this, arguments);
    }

    if (typeof watchExpression === 'string' &&
        isOneTimeBindExp(watchExpression)) {
      skipNextPerfWatchers = true;
      return _watch.apply(this, arguments);
    }
    var watchStr = humanReadableWatchExpression(watchExpression);
    var scopeId = this.$id;
    var expressions = null;
    if (typeof watchExpression === 'function') {
      expressions = watchExpression.expressions;
      if (Object.prototype.toString.call(expressions) === '[object Array]' &&
          expressions.some(isOneTimeBindExp)) {
        skipNextPerfWatchers = true;
        return _watch.apply(this, arguments);
      }

      arguments[0] = function () {
        var start = perf.now();
        var ret = watchExpression.apply(this, arguments);
        var end = perf.now();
        _digestEvents.push({
          eventType: 'scope:watch',
          id: scopeId,
          watch: watchStr,
          time: end - start
        });
        return ret;
      };
    } else {
      var thatScope = this;
      arguments[0] = function () {
        var start = perf.now();
        var ret = thatScope.$eval(watchExpression);
        var end = perf.now();
        _digestEvents.push({
          eventType: 'scope:watch',
          id: scopeId,
          watch: watchStr,
          time: end - start
        });
        return ret;
      };
    }

    if (typeof reactionFunction === 'function') {
      arguments[1] = function () {
        var start = perf.now();
        var ret = reactionFunction.apply(this, arguments);
        var end = perf.now();
        _digestEvents.push({
          eventType: 'scope:reaction',
          id: this.$id,
          watch: watchStr,
          time: end - start
        });
        return ret;
      };
    }

    return _watch.apply(this, arguments);
  };

  var _digest = scopePrototype.$digest;
  scopePrototype.$digest = function (fn) {
    _digestEvents = [];
    var start = perf.now();
    var ret = _digest.apply(this, arguments);
    var end = perf.now();
    hint.emit('scope:digest', {
      id: this.$id,
      time: end - start,
      events: _digestEvents
    });
    return ret;
  };

  var _destroy = scopePrototype.$destroy;
  scopePrototype.$destroy = function () {
    var id = this.$id;

    hint.emit('scope:destroy', { id: id });

    delete scopes[id];
    delete watching[id];

    return _destroy.apply(this, arguments);
  };


  var _new = scopePrototype.$new;
  scopePrototype.$new = function () {
    var child = _new.apply(this, arguments);

    scopes[child.$id] = child;
    watching[child.$id] = {};

    hint.emit('scope:new', { parent: this.$id, child: child.$id });
    setTimeout(function () {
      emitScopeElt(child);
    }, 0);
    return child;
  };

  function emitScopeElt (scope) {
    var scopeId = scope.$id;
    var elt = findElt(scopeId);
    var descriptor = scopeDescriptor(elt, scope);
    hint.emit('scope:link', {
      id: scopeId,
      descriptor: descriptor
    });
  }

  function findElt (scopeId) {
    var elts = document.querySelectorAll('.ng-scope');
    var elt, scope;

    for (var i = 0; i < elts.length; i++) {
      elt = angular.element(elts[i]);
      scope = elt.scope();
      if (scope.$id === scopeId) {
        return elt;
      }
    }
  }

  var _apply = scopePrototype.$apply;
  scopePrototype.$apply = function (fn) {
    // var start = perf.now();
    var ret = _apply.apply(this, arguments);
    // var end = perf.now();
    // hint.emit('scope:apply', { id: this.$id, time: end - start });
    debouncedEmitModelChange();
    return ret;
  };


  function gettterer (scopeId, path) {
    if (path === '') {
      return function () {
        return scopes[scopeId];
      };
    }
    var getter = $parse(path);
    return function () {
      return getter(scopes[scopeId]);
    };
  }

  function emitModelChange () {
    Object.keys(watching).forEach(function (scopeId) {
      Object.keys(watching[scopeId]).forEach(function (path) {
        var model = watching[scopeId][path];
        var value = summarize(model.get());
        if (value !== model.value) {
          hint.emit('model:change', {
            id: convertIdToOriginalType(scopeId),
            path: path,
            oldValue: model.value,
            value: value
          });
          model.value = value;
        }
      });
    });
  }

  hint.emit('scope:new', {
    parent: null,
    child: $delegate.$id
  });
  scopes[$delegate.$id] = $delegate;
  watching[$delegate.$id] = {};

  return $delegate;
}

function decorateDollaCompile ($delegate) {
  var newCompile = function () {
    var link = $delegate.apply(this, arguments);

    return function (scope) {
      var elt = link.apply(this, arguments);
      var descriptor = scopeDescriptor(elt, scope);
      hint.emit('scope:link', {
        id: scope.$id,
        descriptor: descriptor
      });
      return elt;
    };
  };

  // TODO: test this
  // copy private helpers like $$addScopeInfo
  for (var prop in $delegate) {
    if ($delegate.hasOwnProperty(prop)) {
      newCompile[prop] = $delegate[prop];
    }
  }
  return newCompile;
}

var TYPES = [
  'ng-app',
  'ng-controller',
  'ng-repeat',
  'ng-include'
];

function scopeDescriptor (elt, scope) {
  var val,
      theseTypes = [],
      type;

  if (elt) {
    for (var i = 0, ii = TYPES.length; i < ii; i++) {
      type = TYPES[i];
      if (val = elt.attr(type)) {
        theseTypes.push(type + '="' + val + '"');
      }
    }
  }
  if (theseTypes.length === 0) {
    return 'scope.$id=' + scope.$id;
  } else {
    return theseTypes.join(' ');
  }
}

function humanReadableWatchExpression (fn) {
  if (fn == null) {
    return null;
  }
  if (fn.exp) {
    fn = fn.exp;
  } else if (fn.name) {
    fn = fn.name;
  }
  return fn.toString();
}

function isOneTimeBindExp(exp) {
  // this is the same code angular 1.3.15 has to check
  // for a one time bind expression
  return exp.charAt(0) === ':' && exp.charAt(1) === ':';
}

function convertIdToOriginalType(scopeId) {
  return (angular.version.minor < 3) ? scopeId : parseInt(scopeId, 10);
}

},{"../lib/summarize-model":7,"debounce-on":2}]},{},[1]);

angular.module("colorpicker.module",[]).factory("Helper",function(){"use strict";return{closestSlider:function(e){var o=e.matches||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector;return o.bind(e)("I")?e.parentNode:e},getOffset:function(e,o){for(var t=0,n=0,r=e.getBoundingClientRect();e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)o||"BODY"!==e.tagName?(t+=e.scrollLeft,n+=e.scrollTop):(t+=document.documentElement.scrollLeft||e.scrollLeft,n+=document.documentElement.scrollTop||e.scrollTop),e=e.offsetParent;return{top:r.top+window.pageYOffset,left:r.left+window.pageXOffset,scrollX:t,scrollY:n}},stringParsers:[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}}]}}).factory("Color",["Helper",function(e){"use strict";return{value:{h:1,s:1,b:1,a:1},rgb:function(){var e=this.toRGB();return"rgb("+e.r+","+e.g+","+e.b+")"},rgba:function(){var e=this.toRGB();return"rgba("+e.r+","+e.g+","+e.b+","+e.a+")"},hex:function(){return this.toHex()},RGBtoHSB:function(e,o,t,n){e/=255,o/=255,t/=255;var r,i,l,s;return l=Math.max(e,o,t),s=l-Math.min(e,o,t),r=0===s?null:l===e?(o-t)/s:l===o?(t-e)/s+2:(e-o)/s+4,r=(r+360)%6*60/360,i=0===s?0:s/l,{h:r||1,s:i,b:l,a:n||1}},setColor:function(o){o=o?o.toLowerCase():o;for(var t in e.stringParsers)if(e.stringParsers.hasOwnProperty(t)){var n=e.stringParsers[t],r=n.re.exec(o),i=r&&n.parse(r);if(i)return this.value=this.RGBtoHSB.apply(null,i),!1}},setHue:function(e){this.value.h=1-e},setSaturation:function(e){this.value.s=e},setLightness:function(e){this.value.b=1-e},setAlpha:function(e){this.value.a=parseInt(100*(1-e),10)/100},toRGB:function(e,o,t,n){e||(e=this.value.h,o=this.value.s,t=this.value.b),e*=360;var r,i,l,s,c;return e=e%360/60,c=t*o,s=c*(1-Math.abs(e%2-1)),r=i=l=t-c,e=~~e,r+=[c,s,0,0,s,c][e],i+=[s,c,c,s,0,0][e],l+=[0,0,s,c,c,s][e],{r:Math.round(255*r),g:Math.round(255*i),b:Math.round(255*l),a:n||this.value.a}},toHex:function(e,o,t,n){var r=this.toRGB(e,o,t,n);return"#"+(1<<24|parseInt(r.r,10)<<16|parseInt(r.g,10)<<8|parseInt(r.b,10)).toString(16).substr(1)}}}]).factory("Slider",["Helper",function(e){"use strict";var o={maxLeft:0,maxTop:0,callLeft:null,callTop:null,knob:{top:0,left:0}},t={};return{getSlider:function(){return o},getLeftPosition:function(e){return Math.max(0,Math.min(o.maxLeft,o.left+((e.pageX||t.left)-t.left)))},getTopPosition:function(e){return Math.max(0,Math.min(o.maxTop,o.top+((e.pageY||t.top)-t.top)))},setSlider:function(n,r){var i=e.closestSlider(n.target),l=e.getOffset(i,r),s=i.getBoundingClientRect(),c=n.clientX-s.left,a=n.clientY-s.top;o.knob=i.children[0].style,o.left=n.pageX-l.left-window.pageXOffset+l.scrollX,o.top=n.pageY-l.top-window.pageYOffset+l.scrollY,t={left:n.pageX-(c-o.left),top:n.pageY-(a-o.top)}},setSaturation:function(e,t,n){o={maxLeft:n,maxTop:n,callLeft:"setSaturation",callTop:"setLightness"},this.setSlider(e,t)},setHue:function(e,t,n){o={maxLeft:0,maxTop:n,callLeft:!1,callTop:"setHue"},this.setSlider(e,t)},setAlpha:function(e,t,n){o={maxLeft:0,maxTop:n,callLeft:!1,callTop:"setAlpha"},this.setSlider(e,t)},setKnob:function(e,t){o.knob.top=e+"px",o.knob.left=t+"px"}}}]).directive("colorpicker",["$document","$compile","Color","Slider","Helper",function(e,o,t,n,r){"use strict";return{require:"?ngModel",restrict:"A",link:function(i,l,s,c){function a(){e.on("mousemove",u),e.on("mouseup",f)}function p(){try{D.css("backgroundColor",M[w]())}catch(e){D.css("backgroundColor",M.toHex())}B.css("backgroundColor",M.toHex(M.value.h,1,1,1)),"rgba"===w&&(x.css.backgroundColor=M.toHex())}function u(e){var o=n.getLeftPosition(e),t=n.getTopPosition(e),r=n.getSlider();n.setKnob(t,o),r.callLeft&&M[r.callLeft].call(M,o/P),r.callTop&&M[r.callTop].call(M,t/P),p();var s=M[w]();return l.val(s),c&&i.$apply(c.$setViewValue(s)),$&&F.val(s),!1}function f(){m("colorpicker-selected"),e.off("mousemove",u),e.off("mouseup",f)}function d(e){M.setColor(l.val()),$&&!e&&F.val(l.val()),Y.eq(0).css({left:M.value.s*P+"px",top:P-M.value.b*P+"px"}),Y.eq(1).css("top",P*(1-M.value.h)+"px"),Y.eq(2).css("top",P*(1-M.value.a)+"px"),p()}function h(){var e,o=r.getOffset(l[0]);return angular.isDefined(s.colorpickerParent)&&(o.left=0,o.top=0),"top"===S?e={top:o.top-147,left:o.left}:"right"===S?e={top:o.top,left:o.left+126}:"bottom"===S?e={top:o.top+l[0].offsetHeight+2,left:o.left}:"left"===S&&(e={top:o.top,left:o.left-150}),{top:e.top+"px",left:e.left+"px"}}function g(){v()}function k(){y.hasClass("colorpicker-visible")||(d(),y.addClass("colorpicker-visible").css(h()),m("colorpicker-shown"),I===!1&&e.on("mousedown",g),s.colorpickerIsOpen&&(i[s.colorpickerIsOpen]=!0,i.$$phase||i.$digest()))}function m(e){c&&i.$emit(e,{name:s.ngModel,value:c.$modelValue})}function v(){y.hasClass("colorpicker-visible")&&(y.removeClass("colorpicker-visible"),m("colorpicker-closed"),e.off("mousedown",g),s.colorpickerIsOpen&&(i[s.colorpickerIsOpen]=!1,i.$$phase||i.$digest()))}var b,x,w=s.colorpicker?s.colorpicker:"hex",S=angular.isDefined(s.colorpickerPosition)?s.colorpickerPosition:"bottom",I=angular.isDefined(s.colorpickerInline)?s.colorpickerInline:!1,C=angular.isDefined(s.colorpickerFixedPosition)?s.colorpickerFixedPosition:!1,L=angular.isDefined(s.colorpickerParent)?l.parent():angular.element(document.body),$=angular.isDefined(s.colorpickerWithInput)?s.colorpickerWithInput:!1,P=angular.isDefined(s.colorpickerSize)?s.colorpickerSize:100,b=P+"px",H=$?'<input type="text" name="colorpicker-input" spellcheck="false">':"",T=I?"":'<button type="button" class="close close-colorpicker">&times;</button>',O='<div class="colorpicker dropdown"><div class="dropdown-menu"><colorpicker-saturation><i></i></colorpicker-saturation><colorpicker-hue><i></i></colorpicker-hue><colorpicker-alpha><i></i></colorpicker-alpha><colorpicker-preview></colorpicker-preview>'+H+T+"</div></div>",y=angular.element(O),M=t,A=y.find("colorpicker-hue"),B=y.find("colorpicker-saturation"),D=y.find("colorpicker-preview"),Y=y.find("i");if(o(y)(i),y.css("min-width",parseInt(P)+29+"px"),B.css({width:b,height:b}),A.css("height",b),$){var F=y.find("input");F.css("width",b),F.on("mousedown",function(e){e.stopPropagation()}).on("keyup",function(){var e=this.value;l.val(e),c&&c.$modelValue!==e&&(i.$apply(c.$setViewValue(e)),d(!0))})}"rgba"===w&&(y.addClass("alpha"),x=y.find("colorpicker-alpha"),x.css("height",b),x.on("click",function(e){n.setAlpha(e,C,P),u(e)}).on("mousedown",function(e){n.setAlpha(e,C,P),a()}).on("mouseup",function(e){m("colorpicker-selected-alpha")})),A.on("click",function(e){n.setHue(e,C,P),u(e)}).on("mousedown",function(e){n.setHue(e,C,P),a()}).on("mouseup",function(e){m("colorpicker-selected-hue")}),B.on("click",function(e){n.setSaturation(e,C,P),u(e),angular.isDefined(s.colorpickerCloseOnSelect)&&v()}).on("mousedown",function(e){n.setSaturation(e,C,P),a()}).on("mouseup",function(e){m("colorpicker-selected-saturation")}),C&&y.addClass("colorpicker-fixed-position"),y.addClass("colorpicker-position-"+S),"true"===I&&y.addClass("colorpicker-inline"),L.append(y),c&&(c.$render=function(){l.val(c.$viewValue),d()}),l.on("blur keyup change",function(){d()}),l.on("$destroy",function(){y.remove()}),I===!1?l.on("click",k):k(),y.on("mousedown",function(e){e.stopPropagation(),e.preventDefault()}),y.find("button").on("click",function(){v()}),s.colorpickerIsOpen&&i.$watch(s.colorpickerIsOpen,function(e){e===!0?k():e===!1&&v()})}}}]);
(function(B,n){"object"===typeof exports?n(exports):"function"===typeof define&&define.amd?define(["exports"],n):n(B)})(this,function(B){function n(a){this._targetElement=a;this._options={nextLabel:"Next &rarr;",prevLabel:"&larr; Back",skipLabel:"Skip",doneLabel:"Done",tooltipPosition:"bottom",tooltipClass:"",highlightClass:"",exitOnEsc:!0,exitOnOverlayClick:!0,showStepNumbers:!0,keyboardNavigation:!0,showButtons:!0,showBullets:!0,showProgress:!1,scrollToElement:!0,overlayOpacity:0.8,positionPrecedence:["bottom",
"top","right","left"],disableInteraction:!1}}function M(a){var b=[],c=this;if(this._options.steps)for(var e=0,d=this._options.steps.length;e<d;e++){var f=H(this._options.steps[e]);f.step=b.length+1;"string"===typeof f.element&&(f.element=document.querySelector(f.element));if("undefined"===typeof f.element||null==f.element){var h=document.querySelector(".introjsFloatingElement");null==h&&(h=document.createElement("div"),h.className="introjsFloatingElement",document.body.appendChild(h));f.element=h;
f.position="floating"}null!=f.element&&b.push(f)}else{d=a.querySelectorAll("*[data-intro]");if(1>d.length)return!1;e=0;for(f=d.length;e<f;e++){var h=d[e],q=parseInt(h.getAttribute("data-step"),10);0<q&&(b[q-1]={element:h,intro:h.getAttribute("data-intro"),step:parseInt(h.getAttribute("data-step"),10),tooltipClass:h.getAttribute("data-tooltipClass"),highlightClass:h.getAttribute("data-highlightClass"),position:h.getAttribute("data-position")||this._options.tooltipPosition})}e=q=0;for(f=d.length;e<
f;e++)if(h=d[e],null==h.getAttribute("data-step")){for(;"undefined"!=typeof b[q];)q++;b[q]={element:h,intro:h.getAttribute("data-intro"),step:q+1,tooltipClass:h.getAttribute("data-tooltipClass"),highlightClass:h.getAttribute("data-highlightClass"),position:h.getAttribute("data-position")||this._options.tooltipPosition}}}e=[];for(d=0;d<b.length;d++)b[d]&&e.push(b[d]);b=e;b.sort(function(a,b){return a.step-b.step});c._introItems=b;N.call(c,a)&&(x.call(c),a.querySelector(".introjs-skipbutton"),a.querySelector(".introjs-nextbutton"),
c._onKeyDown=function(b){if(27===b.keyCode&&!0==c._options.exitOnEsc)void 0!=c._introExitCallback&&c._introExitCallback.call(c),y.call(c,a);else if(37===b.keyCode)C.call(c);else if(39===b.keyCode)x.call(c);else if(13===b.keyCode){var d=b.target||b.srcElement;d&&0<d.className.indexOf("introjs-prevbutton")?C.call(c):d&&0<d.className.indexOf("introjs-skipbutton")?(c._introItems.length-1==c._currentStep&&"function"===typeof c._introCompleteCallback&&c._introCompleteCallback.call(c),void 0!=c._introExitCallback&&
c._introExitCallback.call(c),y.call(c,a)):x.call(c);b.preventDefault?b.preventDefault():b.returnValue=!1}},c._onResize=function(a){t.call(c,document.querySelector(".introjs-helperLayer"));t.call(c,document.querySelector(".introjs-tooltipReferenceLayer"))},window.addEventListener?(this._options.keyboardNavigation&&window.addEventListener("keydown",c._onKeyDown,!0),window.addEventListener("resize",c._onResize,!0)):document.attachEvent&&(this._options.keyboardNavigation&&document.attachEvent("onkeydown",
c._onKeyDown),document.attachEvent("onresize",c._onResize)));return!1}function H(a){if(null==a||"object"!=typeof a||"undefined"!=typeof a.nodeType)return a;var b={},c;for(c in a)b[c]="undefined"!=typeof jQuery&&a[c]instanceof jQuery?a[c]:H(a[c]);return b}function x(){this._direction="forward";"undefined"===typeof this._currentStep?this._currentStep=0:++this._currentStep;if(this._introItems.length<=this._currentStep)"function"===typeof this._introCompleteCallback&&this._introCompleteCallback.call(this),
y.call(this,this._targetElement);else{var a=this._introItems[this._currentStep];"undefined"!==typeof this._introBeforeChangeCallback&&this._introBeforeChangeCallback.call(this,a.element);I.call(this,a)}}function C(){this._direction="backward";if(0===this._currentStep)return!1;var a=this._introItems[--this._currentStep];"undefined"!==typeof this._introBeforeChangeCallback&&this._introBeforeChangeCallback.call(this,a.element);I.call(this,a)}function y(a){var b=a.querySelector(".introjs-overlay");if(null!=
b){b.style.opacity=0;setTimeout(function(){b.parentNode&&b.parentNode.removeChild(b)},500);var c=a.querySelector(".introjs-helperLayer");c&&c.parentNode.removeChild(c);(c=a.querySelector(".introjs-tooltipReferenceLayer"))&&c.parentNode.removeChild(c);(a=a.querySelector(".introjs-disableInteraction"))&&a.parentNode.removeChild(a);(a=document.querySelector(".introjsFloatingElement"))&&a.parentNode.removeChild(a);if(a=document.querySelector(".introjs-showElement"))a.className=a.className.replace(/introjs-[a-zA-Z]+/g,
"").replace(/^\s+|\s+$/g,"");if((a=document.querySelectorAll(".introjs-fixParent"))&&0<a.length)for(c=a.length-1;0<=c;c--)a[c].className=a[c].className.replace(/introjs-fixParent/g,"").replace(/^\s+|\s+$/g,"");window.removeEventListener?window.removeEventListener("keydown",this._onKeyDown,!0):document.detachEvent&&document.detachEvent("onkeydown",this._onKeyDown);this._currentStep=void 0}}function J(a,b,c,e){var d="",f,h;b.style.top=null;b.style.right=null;b.style.bottom=null;b.style.left=null;b.style.marginLeft=
null;b.style.marginTop=null;c.style.display="inherit";"undefined"!=typeof e&&null!=e&&(e.style.top=null,e.style.left=null);if(this._introItems[this._currentStep]){d=this._introItems[this._currentStep];d="string"===typeof d.tooltipClass?d.tooltipClass:this._options.tooltipClass;b.className=("introjs-tooltip "+d).replace(/^\s+|\s+$/g,"");h=this._introItems[this._currentStep].position;if(("auto"==h||"auto"==this._options.tooltipPosition)&&"floating"!=h){d=h;f=this._options.positionPrecedence.slice();
h=F();var q=v(b).height+10,r=v(b).width+20,k=v(a),l="floating";k.left+r>h.width||0>k.left+k.width/2-r?(s(f,"bottom"),s(f,"top")):(k.height+k.top+q>h.height&&s(f,"bottom"),0>k.top-q&&s(f,"top"));k.width+k.left+r>h.width&&s(f,"right");0>k.left-r&&s(f,"left");0<f.length&&(l=f[0]);d&&"auto"!=d&&-1<f.indexOf(d)&&(l=d);h=l}d=v(a);a=v(b);f=F();switch(h){case "top":c.className="introjs-arrow bottom";z(d,15,a,f,b);b.style.bottom=d.height+20+"px";break;case "right":b.style.left=d.width+20+"px";d.top+a.height>
f.height?(c.className="introjs-arrow left-bottom",b.style.top="-"+(a.height-d.height-20)+"px"):c.className="introjs-arrow left";break;case "left":!0==this._options.showStepNumbers&&(b.style.top="15px");d.top+a.height>f.height?(b.style.top="-"+(a.height-d.height-20)+"px",c.className="introjs-arrow right-bottom"):c.className="introjs-arrow right";b.style.right=d.width+20+"px";break;case "floating":c.style.display="none";b.style.left="50%";b.style.top="50%";b.style.marginLeft="-"+a.width/2+"px";b.style.marginTop=
"-"+a.height/2+"px";"undefined"!=typeof e&&null!=e&&(e.style.left="-"+(a.width/2+18)+"px",e.style.top="-"+(a.height/2+18)+"px");break;case "bottom-right-aligned":c.className="introjs-arrow top-right";K(d,0,a,b);b.style.top=d.height+20+"px";break;case "bottom-middle-aligned":c.className="introjs-arrow top-middle";c=d.width/2-a.width/2;K(d,c,a,b)&&(b.style.right=null,z(d,c,a,f,b));b.style.top=d.height+20+"px";break;default:c.className="introjs-arrow top",z(d,0,a,f,b),b.style.top=d.height+20+"px"}}}
function z(a,b,c,e,d){if(a.left+b+c.width>e.width)return d.style.left=e.width-c.width-a.left+"px",!1;d.style.left=b+"px";return!0}function K(a,b,c,e){if(0>a.left+a.width-b-c.width)return e.style.left=-a.left+"px",!1;e.style.right=b+"px";return!0}function s(a,b){-1<a.indexOf(b)&&a.splice(a.indexOf(b),1)}function t(a){if(a&&this._introItems[this._currentStep]){var b=this._introItems[this._currentStep],c=v(b.element),e=10;"floating"==b.position&&(e=0);a.setAttribute("style","width: "+(c.width+e)+"px; height:"+
(c.height+e)+"px; top:"+(c.top-5)+"px;left: "+(c.left-5)+"px;")}}function O(){var a=document.querySelector(".introjs-disableInteraction");null===a&&(a=document.createElement("div"),a.className="introjs-disableInteraction",this._targetElement.appendChild(a));t.call(this,a)}function I(a){"undefined"!==typeof this._introChangeCallback&&this._introChangeCallback.call(this,a.element);var b=this,c=document.querySelector(".introjs-helperLayer"),e=document.querySelector(".introjs-tooltipReferenceLayer"),
d="introjs-helperLayer";v(a.element);"string"===typeof a.highlightClass&&(d+=" "+a.highlightClass);"string"===typeof this._options.highlightClass&&(d+=" "+this._options.highlightClass);if(null!=c){var f=e.querySelector(".introjs-helperNumberLayer"),h=e.querySelector(".introjs-tooltiptext"),q=e.querySelector(".introjs-arrow"),r=e.querySelector(".introjs-tooltip"),k=e.querySelector(".introjs-skipbutton"),l=e.querySelector(".introjs-prevbutton"),p=e.querySelector(".introjs-nextbutton");c.className=d;
r.style.opacity=0;r.style.display="none";if(null!=f){var g=this._introItems[0<=a.step-2?a.step-2:0];if(null!=g&&"forward"==this._direction&&"floating"==g.position||"backward"==this._direction&&"floating"==a.position)f.style.opacity=0}t.call(b,c);t.call(b,e);if((g=document.querySelectorAll(".introjs-fixParent"))&&0<g.length)for(d=g.length-1;0<=d;d--)g[d].className=g[d].className.replace(/introjs-fixParent/g,"").replace(/^\s+|\s+$/g,"");g=document.querySelector(".introjs-showElement");g.className=g.className.replace(/introjs-[a-zA-Z]+/g,
"").replace(/^\s+|\s+$/g,"");b._lastShowElementTimer&&clearTimeout(b._lastShowElementTimer);b._lastShowElementTimer=setTimeout(function(){null!=f&&(f.innerHTML=a.step);h.innerHTML=a.intro;r.style.display="block";J.call(b,a.element,r,q,f);e.querySelector(".introjs-bullets li > a.active").className="";e.querySelector('.introjs-bullets li > a[data-stepnumber="'+a.step+'"]').className="active";e.querySelector(".introjs-progress .introjs-progressbar").setAttribute("style","width:"+L.call(b)+"%;");r.style.opacity=
1;f&&(f.style.opacity=1);-1===p.tabIndex?k.focus():p.focus()},350)}else{var n=document.createElement("div"),l=document.createElement("div"),c=document.createElement("div"),m=document.createElement("div"),s=document.createElement("div"),D=document.createElement("div"),E=document.createElement("div"),u=document.createElement("div");n.className=d;l.className="introjs-tooltipReferenceLayer";t.call(b,n);t.call(b,l);this._targetElement.appendChild(n);this._targetElement.appendChild(l);c.className="introjs-arrow";
s.className="introjs-tooltiptext";s.innerHTML=a.intro;D.className="introjs-bullets";!1===this._options.showBullets&&(D.style.display="none");for(var n=document.createElement("ul"),d=0,B=this._introItems.length;d<B;d++){var z=document.createElement("li"),A=document.createElement("a");A.onclick=function(){b.goToStep(this.getAttribute("data-stepnumber"))};d===a.step-1&&(A.className="active");A.href="javascript:void(0);";A.innerHTML="&nbsp;";A.setAttribute("data-stepnumber",this._introItems[d].step);
z.appendChild(A);n.appendChild(z)}D.appendChild(n);E.className="introjs-progress";!1===this._options.showProgress&&(E.style.display="none");d=document.createElement("div");d.className="introjs-progressbar";d.setAttribute("style","width:"+L.call(this)+"%;");E.appendChild(d);u.className="introjs-tooltipbuttons";!1===this._options.showButtons&&(u.style.display="none");m.className="introjs-tooltip";m.appendChild(s);m.appendChild(D);m.appendChild(E);!0==this._options.showStepNumbers&&(g=document.createElement("span"),
g.className="introjs-helperNumberLayer",g.innerHTML=a.step,l.appendChild(g));m.appendChild(c);l.appendChild(m);p=document.createElement("a");p.onclick=function(){b._introItems.length-1!=b._currentStep&&x.call(b)};p.href="javascript:void(0);";p.innerHTML=this._options.nextLabel;l=document.createElement("a");l.onclick=function(){0!=b._currentStep&&C.call(b)};l.href="javascript:void(0);";l.innerHTML=this._options.prevLabel;k=document.createElement("a");k.className="introjs-button introjs-skipbutton";
k.href="javascript:void(0);";k.innerHTML=this._options.skipLabel;k.onclick=function(){b._introItems.length-1==b._currentStep&&"function"===typeof b._introCompleteCallback&&b._introCompleteCallback.call(b);b._introItems.length-1!=b._currentStep&&"function"===typeof b._introExitCallback&&b._introExitCallback.call(b);y.call(b,b._targetElement)};u.appendChild(k);1<this._introItems.length&&(u.appendChild(l),u.appendChild(p));m.appendChild(u);J.call(b,a.element,m,c,g)}!0===this._options.disableInteraction&&
O.call(b);l.removeAttribute("tabIndex");p.removeAttribute("tabIndex");0==this._currentStep&&1<this._introItems.length?(l.className="introjs-button introjs-prevbutton introjs-disabled",l.tabIndex="-1",p.className="introjs-button introjs-nextbutton",k.innerHTML=this._options.skipLabel):this._introItems.length-1==this._currentStep||1==this._introItems.length?(k.innerHTML=this._options.doneLabel,l.className="introjs-button introjs-prevbutton",p.className="introjs-button introjs-nextbutton introjs-disabled",
p.tabIndex="-1"):(l.className="introjs-button introjs-prevbutton",p.className="introjs-button introjs-nextbutton",k.innerHTML=this._options.skipLabel);p.focus();a.element.className+=" introjs-showElement";g=w(a.element,"position");"absolute"!==g&&"relative"!==g&&(a.element.className+=" introjs-relativePosition");for(g=a.element.parentNode;null!=g&&"body"!==g.tagName.toLowerCase();){c=w(g,"z-index");m=parseFloat(w(g,"opacity"));u=w(g,"transform")||w(g,"-webkit-transform")||w(g,"-moz-transform")||w(g,
"-ms-transform")||w(g,"-o-transform");if(/[0-9]+/.test(c)||1>m||"none"!==u&&void 0!==u)g.className+=" introjs-fixParent";g=g.parentNode}P(a.element)||!0!==this._options.scrollToElement||(m=a.element.getBoundingClientRect(),g=F().height,c=m.bottom-(m.bottom-m.top),m=m.bottom-g,0>c||a.element.clientHeight>g?window.scrollBy(0,c-30):window.scrollBy(0,m+100));"undefined"!==typeof this._introAfterChangeCallback&&this._introAfterChangeCallback.call(this,a.element)}function w(a,b){var c="";a.currentStyle?
c=a.currentStyle[b]:document.defaultView&&document.defaultView.getComputedStyle&&(c=document.defaultView.getComputedStyle(a,null).getPropertyValue(b));return c&&c.toLowerCase?c.toLowerCase():c}function F(){if(void 0!=window.innerWidth)return{width:window.innerWidth,height:window.innerHeight};var a=document.documentElement;return{width:a.clientWidth,height:a.clientHeight}}function P(a){a=a.getBoundingClientRect();return 0<=a.top&&0<=a.left&&a.bottom+80<=window.innerHeight&&a.right<=window.innerWidth}
function N(a){var b=document.createElement("div"),c="",e=this;b.className="introjs-overlay";if("body"===a.tagName.toLowerCase())c+="top: 0;bottom: 0; left: 0;right: 0;position: fixed;",b.setAttribute("style",c);else{var d=v(a);d&&(c+="width: "+d.width+"px; height:"+d.height+"px; top:"+d.top+"px;left: "+d.left+"px;",b.setAttribute("style",c))}a.appendChild(b);b.onclick=function(){!0==e._options.exitOnOverlayClick&&(void 0!=e._introExitCallback&&e._introExitCallback.call(e),y.call(e,a))};setTimeout(function(){c+=
"opacity: "+e._options.overlayOpacity.toString()+";";b.setAttribute("style",c)},10);return!0}function v(a){var b={};b.width=a.offsetWidth;b.height=a.offsetHeight;for(var c=0,e=0;a&&!isNaN(a.offsetLeft)&&!isNaN(a.offsetTop);)c+=a.offsetLeft,e+=a.offsetTop,a=a.offsetParent;b.top=e;b.left=c;return b}function L(){return 100*(parseInt(this._currentStep+1,10)/this._introItems.length)}var G=function(a){if("object"===typeof a)return new n(a);if("string"===typeof a){if(a=document.querySelector(a))return new n(a);
throw Error("There is no element with given selector.");}return new n(document.body)};G.version="1.1.1";G.fn=n.prototype={clone:function(){return new n(this)},setOption:function(a,b){this._options[a]=b;return this},setOptions:function(a){var b=this._options,c={},e;for(e in b)c[e]=b[e];for(e in a)c[e]=a[e];this._options=c;return this},start:function(){M.call(this,this._targetElement);return this},goToStep:function(a){this._currentStep=a-2;"undefined"!==typeof this._introItems&&x.call(this);return this},
nextStep:function(){x.call(this);return this},previousStep:function(){C.call(this);return this},exit:function(){y.call(this,this._targetElement);return this},refresh:function(){t.call(this,document.querySelector(".introjs-helperLayer"));t.call(this,document.querySelector(".introjs-tooltipReferenceLayer"));return this},onbeforechange:function(a){if("function"===typeof a)this._introBeforeChangeCallback=a;else throw Error("Provided callback for onbeforechange was not a function");return this},onchange:function(a){if("function"===
typeof a)this._introChangeCallback=a;else throw Error("Provided callback for onchange was not a function.");return this},onafterchange:function(a){if("function"===typeof a)this._introAfterChangeCallback=a;else throw Error("Provided callback for onafterchange was not a function");return this},oncomplete:function(a){if("function"===typeof a)this._introCompleteCallback=a;else throw Error("Provided callback for oncomplete was not a function.");return this},onexit:function(a){if("function"===typeof a)this._introExitCallback=
a;else throw Error("Provided callback for onexit was not a function.");return this}};return B.introJs=G});

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["angular", "intro"], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('angular'), require('intro'));
    } else {
        root.angularIntroJs = factory(root.angular, root.introJs);
    }
}(this, function (angular, introJs) {
    if(typeof introJs == 'object')
        introJs=introJs.introJs;

    var ngIntroDirective = angular.module('angular-intro', []);


    ngIntroDirective.directive('ngIntroOptions', ['$timeout', function ($timeout) {

        return {
            restrict: 'A',
            scope: {
                ngIntroMethod: "=",
                ngIntroExitMethod: "=?",
                ngIntroNextMethod: "=?",
                ngIntroPreviousMethod: "=?",
                ngIntroOptions: '=',
                ngIntroOncomplete: '=',
                ngIntroOnexit: '=',
                ngIntroOnchange: '=',
                ngIntroOnbeforechange: '=',
                ngIntroOnafterchange: '=',
                ngIntroAutostart: '=',
                ngIntroAutorefresh: '='
            },
            link: function(scope, element, attrs) {

                var intro;

                scope.ngIntroMethod = function(step) {

                    var navigationWatch = scope.$on('$locationChangeStart', function(){
                      intro.exit();
                    });

                    if (typeof(step) === 'string') {
                        intro = introJs(step);

                    } else {
                        intro = introJs();
                    }
                    console.log(scope.ngIntroOptions)
                    intro.setOptions(scope.ngIntroOptions);

                    if (scope.ngIntroAutorefresh) {
                      scope.$watch(function(){
                        intro.refresh();
                      });
                    }

                    if (scope.ngIntroOncomplete) {
                        intro.oncomplete(function() {
                            scope.ngIntroOncomplete.call(this, scope);
                            $timeout(function() {scope.$digest();});
                            navigationWatch();
                        });
                    }

                    if (scope.ngIntroOnexit) {
                        intro.onexit(function() {
                            scope.ngIntroOnexit.call(this, scope);
                            $timeout(function() {scope.$digest();});
                            navigationWatch();
                        });
                    }

                    if (scope.ngIntroOnchange) {
                        intro.onchange(function(targetElement){
                            scope.ngIntroOnchange.call(this, targetElement, scope);
                            $timeout(function() {scope.$digest();});
                        });
                    }

                    if (scope.ngIntroOnbeforechange) {
                        intro.onbeforechange(function(targetElement) {
                            scope.ngIntroOnbeforechange.call(this, targetElement, scope);
                            $timeout(function() {scope.$digest();});
                        });
                    }

                    if (scope.ngIntroOnafterchange) {
                        intro.onafterchange(function(targetElement){
                            scope.ngIntroOnafterchange.call(this, targetElement, scope);
                            $timeout(function() {scope.$digest();});
                        });
                    }

                    if (typeof(step) === 'number') {
                        intro.goToStep(step).start();
                    } else {
                        console.log('start')
                        intro.start();
                    }
                };

                scope.ngIntroNextMethod = function () {
                    intro.nextStep();
                };

                scope.ngIntroPreviousMethod = function () {
                    intro.previousStep();
                };

                scope.ngIntroExitMethod = function (callback) {
                    intro.exit();
                    callback();
                };

                var autoStartWatch = scope.$watch('ngIntroAutostart', function (){
                    if(scope.ngIntroAutostart){
                        $timeout(function() {
                            scope.ngIntroMethod();
                        });
                    }
                    autoStartWatch();
                });

                scope.$on('$locationChangeSuccess', function() {
                    if (typeof intro !== 'undefined')
                        intro.exit();
                });
            }
        };
    }]);

    return ngIntroDirective;

}));



(function () {

  'use strict';

  /*global define, module, exports, require */

  /* istanbul ignore next */
  var angular = window.angular ? window.angular : 'undefined' !== typeof require ? require('angular') : undefined;

  var circular = angular.module('angularCircularNavigation', [])
    .directive('circular', ['$compile', function ($compile) {

      return {
        restrict: 'EA',
        scope: {
          options: '='
        },
        template: '<button ng-click="toggleMenu()" class="cn-button {{options.button.size}}" ng-class="options.button.cssClass" style="background: {{options.button.background ? options.button.background : options.background}}; color: {{options.button.color ? options.button.color :options.color}};">{{options.content}}</button>' +
          '<div class="cn-wrapper {{options.size}} items-{{options.items.length}}" ng-class="{\'opened-nav\': options.isOpen}"><ul>' +
          '<li ng-repeat="item in options.items">' +
          '<a ng-hide="item.empty" ng-click="perform(options, item)" ng-class="{\'is-active\': item.isActive}" class="{{item.cssClass}}" style="background: {{item.background ? item.background : options.background}}; color: {{item.color ? item.color : options.color}};">' +
          '<span>{{item.content}}</span>' +
          '</a></li></ul></div>',
        controller: ['$scope', '$element', '$attrs',
          function ($scope, $element, $attrs) {

            $scope.toggleMenu = function () {
              $scope.options.isOpen = !$scope.options.isOpen;
            };

            $scope.perform = function (options, item) {
              if (typeof item.onclick === 'function') {
                item.onclick(options, item);
              }

              if ($scope.options.toggleOnClick) {
                $scope.toggleMenu();
              }
            };

          }
        ]
      };
    }]);

  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define('circular', ['angular'], circular);
  } else if ('undefined' !== typeof exports && 'undefined' !== typeof module) {
    module.exports = circular;
  }

})();
!function(a,b){b["true"]=a,function(b,c){"function"==typeof define&&define.amd?define(b):"undefined"!=typeof module&&"object"==typeof a?module.exports=b():c.rangy=b()}(function(){function a(a,b){var c=typeof a[b];return c==u||!(c!=t||!a[b])||"unknown"==c}function b(a,b){return!(typeof a[b]!=t||!a[b])}function c(a,b){return typeof a[b]!=v}function d(a){return function(b,c){for(var d=c.length;d--;)if(!a(b,c[d]))return!1;return!0}}function e(a){return a&&A(a,z)&&C(a,y)}function f(a){return b(a,"body")?a.body:a.getElementsByTagName("body")[0]}function g(b){typeof console!=v&&a(console,"log")&&console.log(b)}function h(a,b){F&&b?alert(a):g(a)}function i(a){H.initialized=!0,H.supported=!1,h("Rangy is not supported in this environment. Reason: "+a,H.config.alertOnFail)}function j(a){h("Rangy warning: "+a,H.config.alertOnWarn)}function k(a){return a.message||a.description||String(a)}function l(){if(F&&!H.initialized){var b,c=!1,d=!1;a(document,"createRange")&&(b=document.createRange(),A(b,x)&&C(b,w)&&(c=!0));var h=f(document);if(!h||"body"!=h.nodeName.toLowerCase())return void i("No body element found");if(h&&a(h,"createTextRange")&&(b=h.createTextRange(),e(b)&&(d=!0)),!c&&!d)return void i("Neither Range nor TextRange are available");H.initialized=!0,H.features={implementsDomRange:c,implementsTextRange:d};var j,l;for(var m in E)(j=E[m])instanceof p&&j.init(j,H);for(var n=0,o=K.length;o>n;++n)try{K[n](H)}catch(q){l="Rangy init listener threw an exception. Continuing. Detail: "+k(q),g(l)}}}function m(a,b,c){c&&(a+=" in module "+c.name),H.warn("DEPRECATED: "+a+" is deprecated. Please use "+b+" instead.")}function n(a,b,c,d){a[b]=function(){return m(b,c,d),a[c].apply(a,G.toArray(arguments))}}function o(a){a=a||window,l();for(var b=0,c=L.length;c>b;++b)L[b](a)}function p(a,b,c){this.name=a,this.dependencies=b,this.initialized=!1,this.supported=!1,this.initializer=c}function q(a,b,c){var d=new p(a,b,function(b){if(!b.initialized){b.initialized=!0;try{c(H,b),b.supported=!0}catch(d){var e="Module '"+a+"' failed to load: "+k(d);g(e),d.stack&&g(d.stack)}}});return E[a]=d,d}function r(){}function s(){}var t="object",u="function",v="undefined",w=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"],x=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"],y=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"],z=["collapse","compareEndPoints","duplicate","moveToElementText","parentElement","select","setEndPoint","getBoundingClientRect"],A=d(a),B=d(b),C=d(c),D=[].forEach?function(a,b){a.forEach(b)}:function(a,b){for(var c=0,d=a.length;d>c;++c)b(a[c],c)},E={},F=typeof window!=v&&typeof document!=v,G={isHostMethod:a,isHostObject:b,isHostProperty:c,areHostMethods:A,areHostObjects:B,areHostProperties:C,isTextRange:e,getBody:f,forEach:D},H={version:"1.3.0",initialized:!1,isBrowser:F,supported:!0,util:G,features:{},modules:E,config:{alertOnFail:!1,alertOnWarn:!1,preferTextRange:!1,autoInitialize:typeof rangyAutoInitialize==v?!0:rangyAutoInitialize}};H.fail=i,H.warn=j;var I;({}).hasOwnProperty?(G.extend=I=function(a,b,c){var d,e;for(var f in b)b.hasOwnProperty(f)&&(d=a[f],e=b[f],c&&null!==d&&"object"==typeof d&&null!==e&&"object"==typeof e&&I(d,e,!0),a[f]=e);return b.hasOwnProperty("toString")&&(a.toString=b.toString),a},G.createOptions=function(a,b){var c={};return I(c,b),a&&I(c,a),c}):i("hasOwnProperty not supported"),F||i("Rangy can only run in a browser"),function(){var a;if(F){var b=document.createElement("div");b.appendChild(document.createElement("span"));var c=[].slice;try{1==c.call(b.childNodes,0)[0].nodeType&&(a=function(a){return c.call(a,0)})}catch(d){}}a||(a=function(a){for(var b=[],c=0,d=a.length;d>c;++c)b[c]=a[c];return b}),G.toArray=a}();var J;F&&(a(document,"addEventListener")?J=function(a,b,c){a.addEventListener(b,c,!1)}:a(document,"attachEvent")?J=function(a,b,c){a.attachEvent("on"+b,c)}:i("Document does not have required addEventListener or attachEvent method"),G.addListener=J);var K=[];G.deprecationNotice=m,G.createAliasForDeprecatedMethod=n,H.init=l,H.addInitListener=function(a){H.initialized?a(H):K.push(a)};var L=[];H.addShimListener=function(a){L.push(a)},F&&(H.shim=H.createMissingNativeApi=o,n(H,"createMissingNativeApi","shim")),p.prototype={init:function(){for(var a,b,c=this.dependencies||[],d=0,e=c.length;e>d;++d){if(b=c[d],a=E[b],!(a&&a instanceof p))throw new Error("required module '"+b+"' not found");if(a.init(),!a.supported)throw new Error("required module '"+b+"' not supported")}this.initializer(this)},fail:function(a){throw this.initialized=!0,this.supported=!1,new Error(a)},warn:function(a){H.warn("Module "+this.name+": "+a)},deprecationNotice:function(a,b){H.warn("DEPRECATED: "+a+" in module "+this.name+" is deprecated. Please use "+b+" instead")},createError:function(a){return new Error("Error in Rangy "+this.name+" module: "+a)}},H.createModule=function(a){var b,c;2==arguments.length?(b=arguments[1],c=[]):(b=arguments[2],c=arguments[1]);var d=q(a,c,b);H.initialized&&H.supported&&d.init()},H.createCoreModule=function(a,b,c){q(a,b,c)},H.RangePrototype=r,H.rangePrototype=new r,H.selectionPrototype=new s,H.createCoreModule("DomUtil",[],function(a,b){function c(a){var b;return typeof a.namespaceURI==F||null===(b=a.namespaceURI)||"http://www.w3.org/1999/xhtml"==b}function d(a){var b=a.parentNode;return 1==b.nodeType?b:null}function e(a){for(var b=0;a=a.previousSibling;)++b;return b}function f(a){switch(a.nodeType){case 7:case 10:return 0;case 3:case 8:return a.length;default:return a.childNodes.length}}function g(a,b){var c,d=[];for(c=a;c;c=c.parentNode)d.push(c);for(c=b;c;c=c.parentNode)if(K(d,c))return c;return null}function h(a,b,c){for(var d=c?b:b.parentNode;d;){if(d===a)return!0;d=d.parentNode}return!1}function i(a,b){return h(a,b,!0)}function j(a,b,c){for(var d,e=c?a:a.parentNode;e;){if(d=e.parentNode,d===b)return e;e=d}return null}function k(a){var b=a.nodeType;return 3==b||4==b||8==b}function l(a){if(!a)return!1;var b=a.nodeType;return 3==b||8==b}function m(a,b){var c=b.nextSibling,d=b.parentNode;return c?d.insertBefore(a,c):d.appendChild(a),a}function n(a,b,c){var d=a.cloneNode(!1);if(d.deleteData(0,b),a.deleteData(b,a.length-b),m(d,a),c)for(var f,g=0;f=c[g++];)f.node==a&&f.offset>b?(f.node=d,f.offset-=b):f.node==a.parentNode&&f.offset>e(a)&&++f.offset;return d}function o(a){if(9==a.nodeType)return a;if(typeof a.ownerDocument!=F)return a.ownerDocument;if(typeof a.document!=F)return a.document;if(a.parentNode)return o(a.parentNode);throw b.createError("getDocument: no document found for node")}function p(a){var c=o(a);if(typeof c.defaultView!=F)return c.defaultView;if(typeof c.parentWindow!=F)return c.parentWindow;throw b.createError("Cannot get a window object for node")}function q(a){if(typeof a.contentDocument!=F)return a.contentDocument;if(typeof a.contentWindow!=F)return a.contentWindow.document;throw b.createError("getIframeDocument: No Document object found for iframe element")}function r(a){if(typeof a.contentWindow!=F)return a.contentWindow;if(typeof a.contentDocument!=F)return a.contentDocument.defaultView;throw b.createError("getIframeWindow: No Window object found for iframe element")}function s(a){return a&&G.isHostMethod(a,"setTimeout")&&G.isHostObject(a,"document")}function t(a,b,c){var d;if(a?G.isHostProperty(a,"nodeType")?d=1==a.nodeType&&"iframe"==a.tagName.toLowerCase()?q(a):o(a):s(a)&&(d=a.document):d=document,!d)throw b.createError(c+"(): Parameter must be a Window object or DOM node");return d}function u(a){for(var b;b=a.parentNode;)a=b;return a}function v(a,c,d,f){var h,i,k,l,m;if(a==d)return c===f?0:f>c?-1:1;if(h=j(d,a,!0))return c<=e(h)?-1:1;if(h=j(a,d,!0))return e(h)<f?-1:1;if(i=g(a,d),!i)throw new Error("comparePoints error: nodes have no common ancestor");if(k=a===i?i:j(a,i,!0),l=d===i?i:j(d,i,!0),k===l)throw b.createError("comparePoints got to case 4 and childA and childB are the same!");for(m=i.firstChild;m;){if(m===k)return-1;if(m===l)return 1;m=m.nextSibling}}function w(a){var b;try{return b=a.parentNode,!1}catch(c){return!0}}function x(a){if(!a)return"[No node]";if(L&&w(a))return"[Broken node]";if(k(a))return'"'+a.data+'"';if(1==a.nodeType){var b=a.id?' id="'+a.id+'"':"";return"<"+a.nodeName+b+">[index:"+e(a)+",length:"+a.childNodes.length+"]["+(a.innerHTML||"[innerHTML not supported]").slice(0,25)+"]"}return a.nodeName}function y(a){for(var b,c=o(a).createDocumentFragment();b=a.firstChild;)c.appendChild(b);return c}function z(a,b,c){var d=H(a),e=a.createElement("div");e.contentEditable=""+!!c,b&&(e.innerHTML=b);var f=d.firstChild;return f?d.insertBefore(e,f):d.appendChild(e),e}function A(a){return a.parentNode.removeChild(a)}function B(a){this.root=a,this._next=a}function C(a){return new B(a)}function D(a,b){this.node=a,this.offset=b}function E(a){this.code=this[a],this.codeName=a,this.message="DOMException: "+this.codeName}var F="undefined",G=a.util,H=G.getBody;G.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||b.fail("document missing a Node creation method"),G.isHostMethod(document,"getElementsByTagName")||b.fail("document missing getElementsByTagName method");var I=document.createElement("div");G.areHostMethods(I,["insertBefore","appendChild","cloneNode"]||!G.areHostObjects(I,["previousSibling","nextSibling","childNodes","parentNode"]))||b.fail("Incomplete Element implementation"),G.isHostProperty(I,"innerHTML")||b.fail("Element is missing innerHTML property");var J=document.createTextNode("test");G.areHostMethods(J,["splitText","deleteData","insertData","appendData","cloneNode"]||!G.areHostObjects(I,["previousSibling","nextSibling","childNodes","parentNode"])||!G.areHostProperties(J,["data"]))||b.fail("Incomplete Text Node implementation");var K=function(a,b){for(var c=a.length;c--;)if(a[c]===b)return!0;return!1},L=!1;!function(){var b=document.createElement("b");b.innerHTML="1";var c=b.firstChild;b.innerHTML="<br />",L=w(c),a.features.crashyTextNodes=L}();var M;typeof window.getComputedStyle!=F?M=function(a,b){return p(a).getComputedStyle(a,null)[b]}:typeof document.documentElement.currentStyle!=F?M=function(a,b){return a.currentStyle?a.currentStyle[b]:""}:b.fail("No means of obtaining computed style properties found"),B.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var a,b,c=this._current=this._next;if(this._current)if(a=c.firstChild)this._next=a;else{for(b=null;c!==this.root&&!(b=c.nextSibling);)c=c.parentNode;this._next=b}return this._current},detach:function(){this._current=this._next=this.root=null}},D.prototype={equals:function(a){return!!a&&this.node===a.node&&this.offset==a.offset},inspect:function(){return"[DomPosition("+x(this.node)+":"+this.offset+")]"},toString:function(){return this.inspect()}},E.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11,INVALID_NODE_TYPE_ERR:24},E.prototype.toString=function(){return this.message},a.dom={arrayContains:K,isHtmlNamespace:c,parentElement:d,getNodeIndex:e,getNodeLength:f,getCommonAncestor:g,isAncestorOf:h,isOrIsAncestorOf:i,getClosestAncestorIn:j,isCharacterDataNode:k,isTextOrCommentNode:l,insertAfter:m,splitDataNode:n,getDocument:o,getWindow:p,getIframeWindow:r,getIframeDocument:q,getBody:H,isWindow:s,getContentDocument:t,getRootContainer:u,comparePoints:v,isBrokenNode:w,inspectNode:x,getComputedStyleProperty:M,createTestElement:z,removeNode:A,fragmentFromNodeChildren:y,createIterator:C,DomPosition:D},a.DOMException=E}),H.createCoreModule("DomRange",["DomUtil"],function(a,b){function c(a,b){return 3!=a.nodeType&&(P(a,b.startContainer)||P(a,b.endContainer))}function d(a){return a.document||Q(a.startContainer)}function e(a){return W(a.startContainer)}function f(a){return new L(a.parentNode,O(a))}function g(a){return new L(a.parentNode,O(a)+1)}function h(a,b,c){var d=11==a.nodeType?a.firstChild:a;return N(b)?c==b.length?J.insertAfter(a,b):b.parentNode.insertBefore(a,0==c?b:S(b,c)):c>=b.childNodes.length?b.appendChild(a):b.insertBefore(a,b.childNodes[c]),d}function i(a,b,c){if(z(a),z(b),d(b)!=d(a))throw new M("WRONG_DOCUMENT_ERR");var e=R(a.startContainer,a.startOffset,b.endContainer,b.endOffset),f=R(a.endContainer,a.endOffset,b.startContainer,b.startOffset);return c?0>=e&&f>=0:0>e&&f>0}function j(a){for(var b,c,e,f=d(a.range).createDocumentFragment();c=a.next();){if(b=a.isPartiallySelectedSubtree(),c=c.cloneNode(!b),b&&(e=a.getSubtreeIterator(),c.appendChild(j(e)),e.detach()),10==c.nodeType)throw new M("HIERARCHY_REQUEST_ERR");f.appendChild(c)}return f}function k(a,b,c){var d,e;c=c||{stop:!1};for(var f,g;f=a.next();)if(a.isPartiallySelectedSubtree()){if(b(f)===!1)return void(c.stop=!0);if(g=a.getSubtreeIterator(),k(g,b,c),g.detach(),c.stop)return}else for(d=J.createIterator(f);e=d.next();)if(b(e)===!1)return void(c.stop=!0)}function l(a){for(var b;a.next();)a.isPartiallySelectedSubtree()?(b=a.getSubtreeIterator(),l(b),b.detach()):a.remove()}function m(a){for(var b,c,e=d(a.range).createDocumentFragment();b=a.next();){if(a.isPartiallySelectedSubtree()?(b=b.cloneNode(!1),c=a.getSubtreeIterator(),b.appendChild(m(c)),c.detach()):a.remove(),10==b.nodeType)throw new M("HIERARCHY_REQUEST_ERR");e.appendChild(b)}return e}function n(a,b,c){var d,e=!(!b||!b.length),f=!!c;e&&(d=new RegExp("^("+b.join("|")+")$"));var g=[];return k(new p(a,!1),function(b){if((!e||d.test(b.nodeType))&&(!f||c(b))){var h=a.startContainer;if(b!=h||!N(h)||a.startOffset!=h.length){var i=a.endContainer;b==i&&N(i)&&0==a.endOffset||g.push(b)}}}),g}function o(a){var b="undefined"==typeof a.getName?"Range":a.getName();return"["+b+"("+J.inspectNode(a.startContainer)+":"+a.startOffset+", "+J.inspectNode(a.endContainer)+":"+a.endOffset+")]"}function p(a,b){if(this.range=a,this.clonePartiallySelectedTextNodes=b,!a.collapsed){this.sc=a.startContainer,this.so=a.startOffset,this.ec=a.endContainer,this.eo=a.endOffset;var c=a.commonAncestorContainer;this.sc===this.ec&&N(this.sc)?(this.isSingleCharacterDataNode=!0,this._first=this._last=this._next=this.sc):(this._first=this._next=this.sc!==c||N(this.sc)?T(this.sc,c,!0):this.sc.childNodes[this.so],this._last=this.ec!==c||N(this.ec)?T(this.ec,c,!0):this.ec.childNodes[this.eo-1])}}function q(a){return function(b,c){for(var d,e=c?b:b.parentNode;e;){if(d=e.nodeType,V(a,d))return e;e=e.parentNode}return null}}function r(a,b){if(ea(a,b))throw new M("INVALID_NODE_TYPE_ERR")}function s(a,b){if(!V(b,a.nodeType))throw new M("INVALID_NODE_TYPE_ERR")}function t(a,b){if(0>b||b>(N(a)?a.length:a.childNodes.length))throw new M("INDEX_SIZE_ERR")}function u(a,b){if(ca(a,!0)!==ca(b,!0))throw new M("WRONG_DOCUMENT_ERR")}function v(a){if(da(a,!0))throw new M("NO_MODIFICATION_ALLOWED_ERR")}function w(a,b){if(!a)throw new M(b)}function x(a,b){return b<=(N(a)?a.length:a.childNodes.length)}function y(a){return!!a.startContainer&&!!a.endContainer&&!(X&&(J.isBrokenNode(a.startContainer)||J.isBrokenNode(a.endContainer)))&&W(a.startContainer)==W(a.endContainer)&&x(a.startContainer,a.startOffset)&&x(a.endContainer,a.endOffset)}function z(a){if(!y(a))throw new Error("Range error: Range is not valid. This usually happens after DOM mutation. Range: ("+a.inspect()+")")}function A(a,b){z(a);var c=a.startContainer,d=a.startOffset,e=a.endContainer,f=a.endOffset,g=c===e;N(e)&&f>0&&f<e.length&&S(e,f,b),N(c)&&d>0&&d<c.length&&(c=S(c,d,b),g?(f-=d,e=c):e==c.parentNode&&f>=O(c)&&f++,d=0),a.setStartAndEnd(c,d,e,f)}function B(a){z(a);var b=a.commonAncestorContainer.parentNode.cloneNode(!1);return b.appendChild(a.cloneContents()),b.innerHTML}function C(a){a.START_TO_START=ka,a.START_TO_END=la,a.END_TO_END=ma,a.END_TO_START=na,a.NODE_BEFORE=oa,a.NODE_AFTER=pa,a.NODE_BEFORE_AND_AFTER=qa,a.NODE_INSIDE=ra}function D(a){C(a),C(a.prototype)}function E(a,b){return function(){z(this);var c,d,e=this.startContainer,f=this.startOffset,h=this.commonAncestorContainer,i=new p(this,!0);e!==h&&(c=T(e,h,!0),d=g(c),e=d.node,f=d.offset),k(i,v),i.reset();var j=a(i);return i.detach(),b(this,e,f,e,f),j}}function F(b,d){function e(a,b){return function(c){s(c,Z),s(W(c),$);var d=(a?f:g)(c);(b?h:i)(this,d.node,d.offset)}}function h(a,b,c){var e=a.endContainer,f=a.endOffset;(b!==a.startContainer||c!==a.startOffset)&&((W(b)!=W(e)||1==R(b,c,e,f))&&(e=b,f=c),d(a,b,c,e,f))}function i(a,b,c){var e=a.startContainer,f=a.startOffset;(b!==a.endContainer||c!==a.endOffset)&&((W(b)!=W(e)||-1==R(b,c,e,f))&&(e=b,f=c),d(a,e,f,b,c))}var j=function(){};j.prototype=a.rangePrototype,b.prototype=new j,K.extend(b.prototype,{setStart:function(a,b){r(a,!0),t(a,b),h(this,a,b)},setEnd:function(a,b){r(a,!0),t(a,b),i(this,a,b)},setStartAndEnd:function(){var a=arguments,b=a[0],c=a[1],e=b,f=c;switch(a.length){case 3:f=a[2];break;case 4:e=a[2],f=a[3]}d(this,b,c,e,f)},setBoundary:function(a,b,c){this["set"+(c?"Start":"End")](a,b)},setStartBefore:e(!0,!0),setStartAfter:e(!1,!0),setEndBefore:e(!0,!1),setEndAfter:e(!1,!1),collapse:function(a){z(this),a?d(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset):d(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(a){r(a,!0),d(this,a,0,a,U(a))},selectNode:function(a){r(a,!1),s(a,Z);var b=f(a),c=g(a);d(this,b.node,b.offset,c.node,c.offset)},extractContents:E(m,d),deleteContents:E(l,d),canSurroundContents:function(){z(this),v(this.startContainer),v(this.endContainer);var a=new p(this,!0),b=a._first&&c(a._first,this)||a._last&&c(a._last,this);return a.detach(),!b},splitBoundaries:function(){A(this)},splitBoundariesPreservingPositions:function(a){A(this,a)},normalizeBoundaries:function(){z(this);var a,b=this.startContainer,c=this.startOffset,e=this.endContainer,f=this.endOffset,g=function(a){var b=a.nextSibling;b&&b.nodeType==a.nodeType&&(e=a,f=a.length,a.appendData(b.data),Y(b))},h=function(a){var d=a.previousSibling;if(d&&d.nodeType==a.nodeType){b=a;var g=a.length;if(c=d.length,a.insertData(0,d.data),Y(d),b==e)f+=c,e=b;else if(e==a.parentNode){var h=O(a);f==h?(e=a,f=g):f>h&&f--}}},i=!0;if(N(e))f==e.length?g(e):0==f&&(a=e.previousSibling,a&&a.nodeType==e.nodeType&&(f=a.length,b==e&&(i=!1),a.appendData(e.data),Y(e),e=a));else{if(f>0){var j=e.childNodes[f-1];j&&N(j)&&g(j)}i=!this.collapsed}if(i){if(N(b))0==c?h(b):c==b.length&&(a=b.nextSibling,a&&a.nodeType==b.nodeType&&(e==a&&(e=b,f+=b.length),b.appendData(a.data),Y(a)));else if(c<b.childNodes.length){var k=b.childNodes[c];k&&N(k)&&h(k)}}else b=e,c=f;d(this,b,c,e,f)},collapseToPoint:function(a,b){r(a,!0),t(a,b),this.setStartAndEnd(a,b)}}),D(b)}function G(a){a.collapsed=a.startContainer===a.endContainer&&a.startOffset===a.endOffset,a.commonAncestorContainer=a.collapsed?a.startContainer:J.getCommonAncestor(a.startContainer,a.endContainer)}function H(a,b,c,d,e){a.startContainer=b,a.startOffset=c,a.endContainer=d,a.endOffset=e,a.document=J.getDocument(b),G(a)}function I(a){this.startContainer=a,this.startOffset=0,this.endContainer=a,this.endOffset=0,this.document=a,G(this)}var J=a.dom,K=a.util,L=J.DomPosition,M=a.DOMException,N=J.isCharacterDataNode,O=J.getNodeIndex,P=J.isOrIsAncestorOf,Q=J.getDocument,R=J.comparePoints,S=J.splitDataNode,T=J.getClosestAncestorIn,U=J.getNodeLength,V=J.arrayContains,W=J.getRootContainer,X=a.features.crashyTextNodes,Y=J.removeNode;p.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:!1,reset:function(){this._current=null,this._next=this._first},hasNext:function(){return!!this._next},next:function(){var a=this._current=this._next;return a&&(this._next=a!==this._last?a.nextSibling:null,N(a)&&this.clonePartiallySelectedTextNodes&&(a===this.ec&&(a=a.cloneNode(!0)).deleteData(this.eo,a.length-this.eo),this._current===this.sc&&(a=a.cloneNode(!0)).deleteData(0,this.so))),a},remove:function(){var a,b,c=this._current;!N(c)||c!==this.sc&&c!==this.ec?c.parentNode&&Y(c):(a=c===this.sc?this.so:0,b=c===this.ec?this.eo:c.length,a!=b&&c.deleteData(a,b-a))},isPartiallySelectedSubtree:function(){var a=this._current;return c(a,this.range)},getSubtreeIterator:function(){var a;if(this.isSingleCharacterDataNode)a=this.range.cloneRange(),a.collapse(!1);else{a=new I(d(this.range));var b=this._current,c=b,e=0,f=b,g=U(b);P(b,this.sc)&&(c=this.sc,e=this.so),P(b,this.ec)&&(f=this.ec,g=this.eo),H(a,c,e,f,g)}return new p(a,this.clonePartiallySelectedTextNodes)},detach:function(){this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};var Z=[1,3,4,5,7,8,10],$=[2,9,11],_=[5,6,10,12],aa=[1,3,4,5,7,8,10,11],ba=[1,3,4,5,7,8],ca=q([9,11]),da=q(_),ea=q([6,10,12]),fa=document.createElement("style"),ga=!1;try{fa.innerHTML="<b>x</b>",ga=3==fa.firstChild.nodeType}catch(ha){}a.features.htmlParsingConforms=ga;var ia=ga?function(a){var b=this.startContainer,c=Q(b);if(!b)throw new M("INVALID_STATE_ERR");var d=null;return 1==b.nodeType?d=b:N(b)&&(d=J.parentElement(b)),d=null===d||"HTML"==d.nodeName&&J.isHtmlNamespace(Q(d).documentElement)&&J.isHtmlNamespace(d)?c.createElement("body"):d.cloneNode(!1),d.innerHTML=a,J.fragmentFromNodeChildren(d)}:function(a){var b=d(this),c=b.createElement("body");return c.innerHTML=a,J.fragmentFromNodeChildren(c)},ja=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"],ka=0,la=1,ma=2,na=3,oa=0,pa=1,qa=2,ra=3;K.extend(a.rangePrototype,{compareBoundaryPoints:function(a,b){z(this),u(this.startContainer,b.startContainer);var c,d,e,f,g=a==na||a==ka?"start":"end",h=a==la||a==ka?"start":"end";return c=this[g+"Container"],d=this[g+"Offset"],e=b[h+"Container"],f=b[h+"Offset"],R(c,d,e,f)},insertNode:function(a){if(z(this),s(a,aa),v(this.startContainer),P(a,this.startContainer))throw new M("HIERARCHY_REQUEST_ERR");var b=h(a,this.startContainer,this.startOffset);this.setStartBefore(b)},cloneContents:function(){z(this);var a,b;if(this.collapsed)return d(this).createDocumentFragment();if(this.startContainer===this.endContainer&&N(this.startContainer))return a=this.startContainer.cloneNode(!0),a.data=a.data.slice(this.startOffset,this.endOffset),b=d(this).createDocumentFragment(),b.appendChild(a),b;var c=new p(this,!0);return a=j(c),c.detach(),a},canSurroundContents:function(){z(this),v(this.startContainer),v(this.endContainer);var a=new p(this,!0),b=a._first&&c(a._first,this)||a._last&&c(a._last,this);return a.detach(),!b},surroundContents:function(a){if(s(a,ba),!this.canSurroundContents())throw new M("INVALID_STATE_ERR");var b=this.extractContents();if(a.hasChildNodes())for(;a.lastChild;)a.removeChild(a.lastChild);h(a,this.startContainer,this.startOffset),a.appendChild(b),this.selectNode(a)},cloneRange:function(){z(this);for(var a,b=new I(d(this)),c=ja.length;c--;)a=ja[c],b[a]=this[a];return b},toString:function(){z(this);var a=this.startContainer;if(a===this.endContainer&&N(a))return 3==a.nodeType||4==a.nodeType?a.data.slice(this.startOffset,this.endOffset):"";var b=[],c=new p(this,!0);return k(c,function(a){(3==a.nodeType||4==a.nodeType)&&b.push(a.data)}),c.detach(),b.join("")},compareNode:function(a){z(this);var b=a.parentNode,c=O(a);if(!b)throw new M("NOT_FOUND_ERR");var d=this.comparePoint(b,c),e=this.comparePoint(b,c+1);return 0>d?e>0?qa:oa:e>0?pa:ra},comparePoint:function(a,b){return z(this),w(a,"HIERARCHY_REQUEST_ERR"),u(a,this.startContainer),R(a,b,this.startContainer,this.startOffset)<0?-1:R(a,b,this.endContainer,this.endOffset)>0?1:0},createContextualFragment:ia,toHtml:function(){return B(this)},intersectsNode:function(a,b){if(z(this),W(a)!=e(this))return!1;var c=a.parentNode,d=O(a);if(!c)return!0;var f=R(c,d,this.endContainer,this.endOffset),g=R(c,d+1,this.startContainer,this.startOffset);return b?0>=f&&g>=0:0>f&&g>0},isPointInRange:function(a,b){return z(this),w(a,"HIERARCHY_REQUEST_ERR"),u(a,this.startContainer),R(a,b,this.startContainer,this.startOffset)>=0&&R(a,b,this.endContainer,this.endOffset)<=0},intersectsRange:function(a){return i(this,a,!1)},intersectsOrTouchesRange:function(a){return i(this,a,!0)},intersection:function(a){if(this.intersectsRange(a)){var b=R(this.startContainer,this.startOffset,a.startContainer,a.startOffset),c=R(this.endContainer,this.endOffset,a.endContainer,a.endOffset),d=this.cloneRange();return-1==b&&d.setStart(a.startContainer,a.startOffset),1==c&&d.setEnd(a.endContainer,a.endOffset),d}return null},union:function(a){if(this.intersectsOrTouchesRange(a)){var b=this.cloneRange();return-1==R(a.startContainer,a.startOffset,this.startContainer,this.startOffset)&&b.setStart(a.startContainer,a.startOffset),1==R(a.endContainer,a.endOffset,this.endContainer,this.endOffset)&&b.setEnd(a.endContainer,a.endOffset),b}throw new M("Ranges do not intersect")},containsNode:function(a,b){return b?this.intersectsNode(a,!1):this.compareNode(a)==ra},containsNodeContents:function(a){return this.comparePoint(a,0)>=0&&this.comparePoint(a,U(a))<=0},containsRange:function(a){var b=this.intersection(a);return null!==b&&a.equals(b)},containsNodeText:function(a){var b=this.cloneRange();b.selectNode(a);var c=b.getNodes([3]);if(c.length>0){b.setStart(c[0],0);var d=c.pop();return b.setEnd(d,d.length),this.containsRange(b)}return this.containsNodeContents(a)},getNodes:function(a,b){return z(this),n(this,a,b)},getDocument:function(){return d(this)},collapseBefore:function(a){this.setEndBefore(a),this.collapse(!1)},collapseAfter:function(a){this.setStartAfter(a),this.collapse(!0)},getBookmark:function(b){var c=d(this),e=a.createRange(c);b=b||J.getBody(c),e.selectNodeContents(b);var f=this.intersection(e),g=0,h=0;return f&&(e.setEnd(f.startContainer,f.startOffset),g=e.toString().length,h=g+f.toString().length),{start:g,end:h,containerNode:b}},moveToBookmark:function(a){var b=a.containerNode,c=0;this.setStart(b,0),this.collapse(!0);for(var d,e,f,g,h=[b],i=!1,j=!1;!j&&(d=h.pop());)if(3==d.nodeType)e=c+d.length,!i&&a.start>=c&&a.start<=e&&(this.setStart(d,a.start-c),i=!0),i&&a.end>=c&&a.end<=e&&(this.setEnd(d,a.end-c),j=!0),c=e;else for(g=d.childNodes,f=g.length;f--;)h.push(g[f])},getName:function(){return"DomRange"},equals:function(a){return I.rangesEqual(this,a)},isValid:function(){return y(this)},inspect:function(){return o(this)},detach:function(){}}),F(I,H),K.extend(I,{rangeProperties:ja,RangeIterator:p,copyComparisonConstants:D,createPrototypeRange:F,inspect:o,toHtml:B,getRangeDocument:d,rangesEqual:function(a,b){return a.startContainer===b.startContainer&&a.startOffset===b.startOffset&&a.endContainer===b.endContainer&&a.endOffset===b.endOffset}}),a.DomRange=I}),H.createCoreModule("WrappedRange",["DomRange"],function(a,b){var c,d,e=a.dom,f=a.util,g=e.DomPosition,h=a.DomRange,i=e.getBody,j=e.getContentDocument,k=e.isCharacterDataNode;if(a.features.implementsDomRange&&!function(){function d(a){for(var b,c=m.length;c--;)b=m[c],a[b]=a.nativeRange[b];a.collapsed=a.startContainer===a.endContainer&&a.startOffset===a.endOffset}function g(a,b,c,d,e){var f=a.startContainer!==b||a.startOffset!=c,g=a.endContainer!==d||a.endOffset!=e,h=!a.equals(a.nativeRange);(f||g||h)&&(a.setEnd(d,e),a.setStart(b,c))}var k,l,m=h.rangeProperties;c=function(a){if(!a)throw b.createError("WrappedRange: Range must be specified");this.nativeRange=a,d(this)},h.createPrototypeRange(c,g),k=c.prototype,k.selectNode=function(a){this.nativeRange.selectNode(a),d(this)},k.cloneContents=function(){return this.nativeRange.cloneContents()},k.surroundContents=function(a){this.nativeRange.surroundContents(a),d(this)},k.collapse=function(a){this.nativeRange.collapse(a),d(this)},k.cloneRange=function(){return new c(this.nativeRange.cloneRange())},k.refresh=function(){d(this)},k.toString=function(){return this.nativeRange.toString()};var n=document.createTextNode("test");i(document).appendChild(n);var o=document.createRange();o.setStart(n,0),o.setEnd(n,0);try{o.setStart(n,1),k.setStart=function(a,b){this.nativeRange.setStart(a,b),d(this)},k.setEnd=function(a,b){this.nativeRange.setEnd(a,b),d(this)},l=function(a){return function(b){this.nativeRange[a](b),d(this)}}}catch(p){k.setStart=function(a,b){try{this.nativeRange.setStart(a,b)}catch(c){this.nativeRange.setEnd(a,b),this.nativeRange.setStart(a,b)}d(this)},k.setEnd=function(a,b){try{this.nativeRange.setEnd(a,b)}catch(c){this.nativeRange.setStart(a,b),this.nativeRange.setEnd(a,b)}d(this)},l=function(a,b){return function(c){try{this.nativeRange[a](c)}catch(e){this.nativeRange[b](c),this.nativeRange[a](c)}d(this)}}}k.setStartBefore=l("setStartBefore","setEndBefore"),k.setStartAfter=l("setStartAfter","setEndAfter"),k.setEndBefore=l("setEndBefore","setStartBefore"),k.setEndAfter=l("setEndAfter","setStartAfter"),k.selectNodeContents=function(a){this.setStartAndEnd(a,0,e.getNodeLength(a))},o.selectNodeContents(n),o.setEnd(n,3);var q=document.createRange();q.selectNodeContents(n),q.setEnd(n,4),q.setStart(n,2),-1==o.compareBoundaryPoints(o.START_TO_END,q)&&1==o.compareBoundaryPoints(o.END_TO_START,q)?k.compareBoundaryPoints=function(a,b){return b=b.nativeRange||b,a==b.START_TO_END?a=b.END_TO_START:a==b.END_TO_START&&(a=b.START_TO_END),this.nativeRange.compareBoundaryPoints(a,b)}:k.compareBoundaryPoints=function(a,b){return this.nativeRange.compareBoundaryPoints(a,b.nativeRange||b)};var r=document.createElement("div");r.innerHTML="123";var s=r.firstChild,t=i(document);t.appendChild(r),o.setStart(s,1),o.setEnd(s,2),o.deleteContents(),"13"==s.data&&(k.deleteContents=function(){this.nativeRange.deleteContents(),d(this)},k.extractContents=function(){var a=this.nativeRange.extractContents();return d(this),a}),t.removeChild(r),t=null,f.isHostMethod(o,"createContextualFragment")&&(k.createContextualFragment=function(a){return this.nativeRange.createContextualFragment(a)}),i(document).removeChild(n),k.getName=function(){return"WrappedRange"},a.WrappedRange=c,a.createNativeRange=function(a){return a=j(a,b,"createNativeRange"),a.createRange()}}(),a.features.implementsTextRange){var l=function(a){var b=a.parentElement(),c=a.duplicate();c.collapse(!0);var d=c.parentElement();c=a.duplicate(),c.collapse(!1);var f=c.parentElement(),g=d==f?d:e.getCommonAncestor(d,f);return g==b?g:e.getCommonAncestor(b,g)},m=function(a){return 0==a.compareEndPoints("StartToEnd",a)},n=function(a,b,c,d,f){var h=a.duplicate();h.collapse(c);var i=h.parentElement();if(e.isOrIsAncestorOf(b,i)||(i=b),!i.canHaveHTML){var j=new g(i.parentNode,e.getNodeIndex(i));return{boundaryPosition:j,nodeInfo:{nodeIndex:j.offset,containerElement:j.node}}}var l=e.getDocument(i).createElement("span");l.parentNode&&e.removeNode(l);for(var m,n,o,p,q,r=c?"StartToStart":"StartToEnd",s=f&&f.containerElement==i?f.nodeIndex:0,t=i.childNodes.length,u=t,v=u;;){if(v==t?i.appendChild(l):i.insertBefore(l,i.childNodes[v]),h.moveToElementText(l),m=h.compareEndPoints(r,a),0==m||s==u)break;if(-1==m){if(u==s+1)break;s=v}else u=u==s+1?s:v;v=Math.floor((s+u)/2),i.removeChild(l)}if(q=l.nextSibling,-1==m&&q&&k(q)){h.setEndPoint(c?"EndToStart":"EndToEnd",a);var w;if(/[\r\n]/.test(q.data)){var x=h.duplicate(),y=x.text.replace(/\r\n/g,"\r").length;for(w=x.moveStart("character",y);-1==(m=x.compareEndPoints("StartToEnd",x));)w++,x.moveStart("character",1)}else w=h.text.length;p=new g(q,w)}else n=(d||!c)&&l.previousSibling,o=(d||c)&&l.nextSibling,p=o&&k(o)?new g(o,0):n&&k(n)?new g(n,n.data.length):new g(i,e.getNodeIndex(l));return e.removeNode(l),{boundaryPosition:p,nodeInfo:{nodeIndex:v,containerElement:i}}},o=function(a,b){var c,d,f,g,h=a.offset,j=e.getDocument(a.node),l=i(j).createTextRange(),m=k(a.node);return m?(c=a.node,d=c.parentNode):(g=a.node.childNodes,c=h<g.length?g[h]:null,d=a.node),f=j.createElement("span"),f.innerHTML="&#feff;",c?d.insertBefore(f,c):d.appendChild(f),l.moveToElementText(f),l.collapse(!b),d.removeChild(f),m&&l[b?"moveStart":"moveEnd"]("character",h),l};d=function(a){this.textRange=a,this.refresh()},d.prototype=new h(document),
d.prototype.refresh=function(){var a,b,c,d=l(this.textRange);m(this.textRange)?b=a=n(this.textRange,d,!0,!0).boundaryPosition:(c=n(this.textRange,d,!0,!1),a=c.boundaryPosition,b=n(this.textRange,d,!1,!1,c.nodeInfo).boundaryPosition),this.setStart(a.node,a.offset),this.setEnd(b.node,b.offset)},d.prototype.getName=function(){return"WrappedTextRange"},h.copyComparisonConstants(d);var p=function(a){if(a.collapsed)return o(new g(a.startContainer,a.startOffset),!0);var b=o(new g(a.startContainer,a.startOffset),!0),c=o(new g(a.endContainer,a.endOffset),!1),d=i(h.getRangeDocument(a)).createTextRange();return d.setEndPoint("StartToStart",b),d.setEndPoint("EndToEnd",c),d};if(d.rangeToTextRange=p,d.prototype.toTextRange=function(){return p(this)},a.WrappedTextRange=d,!a.features.implementsDomRange||a.config.preferTextRange){var q=function(a){return a("return this;")()}(Function);"undefined"==typeof q.Range&&(q.Range=d),a.createNativeRange=function(a){return a=j(a,b,"createNativeRange"),i(a).createTextRange()},a.WrappedRange=d}}a.createRange=function(c){return c=j(c,b,"createRange"),new a.WrappedRange(a.createNativeRange(c))},a.createRangyRange=function(a){return a=j(a,b,"createRangyRange"),new h(a)},f.createAliasForDeprecatedMethod(a,"createIframeRange","createRange"),f.createAliasForDeprecatedMethod(a,"createIframeRangyRange","createRangyRange"),a.addShimListener(function(b){var c=b.document;"undefined"==typeof c.createRange&&(c.createRange=function(){return a.createRange(c)}),c=b=null})}),H.createCoreModule("WrappedSelection",["DomRange","WrappedRange"],function(a,b){function c(a){return"string"==typeof a?/^backward(s)?$/i.test(a):!!a}function d(a,c){if(a){if(C.isWindow(a))return a;if(a instanceof r)return a.win;var d=C.getContentDocument(a,b,c);return C.getWindow(d)}return window}function e(a){return d(a,"getWinSelection").getSelection()}function f(a){return d(a,"getDocSelection").document.selection}function g(a){var b=!1;return a.anchorNode&&(b=1==C.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset)),b}function h(a,b,c){var d=c?"end":"start",e=c?"start":"end";a.anchorNode=b[d+"Container"],a.anchorOffset=b[d+"Offset"],a.focusNode=b[e+"Container"],a.focusOffset=b[e+"Offset"]}function i(a){var b=a.nativeSelection;a.anchorNode=b.anchorNode,a.anchorOffset=b.anchorOffset,a.focusNode=b.focusNode,a.focusOffset=b.focusOffset}function j(a){a.anchorNode=a.focusNode=null,a.anchorOffset=a.focusOffset=0,a.rangeCount=0,a.isCollapsed=!0,a._ranges.length=0}function k(b){var c;return b instanceof F?(c=a.createNativeRange(b.getDocument()),c.setEnd(b.endContainer,b.endOffset),c.setStart(b.startContainer,b.startOffset)):b instanceof G?c=b.nativeRange:J.implementsDomRange&&b instanceof C.getWindow(b.startContainer).Range&&(c=b),c}function l(a){if(!a.length||1!=a[0].nodeType)return!1;for(var b=1,c=a.length;c>b;++b)if(!C.isAncestorOf(a[0],a[b]))return!1;return!0}function m(a){var c=a.getNodes();if(!l(c))throw b.createError("getSingleElementFromRange: range "+a.inspect()+" did not consist of a single element");return c[0]}function n(a){return!!a&&"undefined"!=typeof a.text}function o(a,b){var c=new G(b);a._ranges=[c],h(a,c,!1),a.rangeCount=1,a.isCollapsed=c.collapsed}function p(b){if(b._ranges.length=0,"None"==b.docSelection.type)j(b);else{var c=b.docSelection.createRange();if(n(c))o(b,c);else{b.rangeCount=c.length;for(var d,e=L(c.item(0)),f=0;f<b.rangeCount;++f)d=a.createRange(e),d.selectNode(c.item(f)),b._ranges.push(d);b.isCollapsed=1==b.rangeCount&&b._ranges[0].collapsed,h(b,b._ranges[b.rangeCount-1],!1)}}}function q(a,c){for(var d=a.docSelection.createRange(),e=m(c),f=L(d.item(0)),g=M(f).createControlRange(),h=0,i=d.length;i>h;++h)g.add(d.item(h));try{g.add(e)}catch(j){throw b.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)")}g.select(),p(a)}function r(a,b,c){this.nativeSelection=a,this.docSelection=b,this._ranges=[],this.win=c,this.refresh()}function s(a){a.win=a.anchorNode=a.focusNode=a._ranges=null,a.rangeCount=a.anchorOffset=a.focusOffset=0,a.detached=!0}function t(a,b){for(var c,d,e=ba.length;e--;)if(c=ba[e],d=c.selection,"deleteAll"==b)s(d);else if(c.win==a)return"delete"==b?(ba.splice(e,1),!0):d;return"deleteAll"==b&&(ba.length=0),null}function u(a,c){for(var d,e=L(c[0].startContainer),f=M(e).createControlRange(),g=0,h=c.length;h>g;++g){d=m(c[g]);try{f.add(d)}catch(i){throw b.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)")}}f.select(),p(a)}function v(a,b){if(a.win.document!=L(b))throw new H("WRONG_DOCUMENT_ERR")}function w(b){return function(c,d){var e;this.rangeCount?(e=this.getRangeAt(0),e["set"+(b?"Start":"End")](c,d)):(e=a.createRange(this.win.document),e.setStartAndEnd(c,d)),this.setSingleRange(e,this.isBackward())}}function x(a){var b=[],c=new I(a.anchorNode,a.anchorOffset),d=new I(a.focusNode,a.focusOffset),e="function"==typeof a.getName?a.getName():"Selection";if("undefined"!=typeof a.rangeCount)for(var f=0,g=a.rangeCount;g>f;++f)b[f]=F.inspect(a.getRangeAt(f));return"["+e+"(Ranges: "+b.join(", ")+")(anchor: "+c.inspect()+", focus: "+d.inspect()+"]"}a.config.checkSelectionRanges=!0;var y,z,A="boolean",B="number",C=a.dom,D=a.util,E=D.isHostMethod,F=a.DomRange,G=a.WrappedRange,H=a.DOMException,I=C.DomPosition,J=a.features,K="Control",L=C.getDocument,M=C.getBody,N=F.rangesEqual,O=E(window,"getSelection"),P=D.isHostObject(document,"selection");J.implementsWinGetSelection=O,J.implementsDocSelection=P;var Q=P&&(!O||a.config.preferTextRange);if(Q)y=f,a.isSelectionValid=function(a){var b=d(a,"isSelectionValid").document,c=b.selection;return"None"!=c.type||L(c.createRange().parentElement())==b};else{if(!O)return b.fail("Neither document.selection or window.getSelection() detected."),!1;y=e,a.isSelectionValid=function(){return!0}}a.getNativeSelection=y;var R=y();if(!R)return b.fail("Native selection was null (possibly issue 138?)"),!1;var S=a.createNativeRange(document),T=M(document),U=D.areHostProperties(R,["anchorNode","focusNode","anchorOffset","focusOffset"]);J.selectionHasAnchorAndFocus=U;var V=E(R,"extend");J.selectionHasExtend=V;var W=typeof R.rangeCount==B;J.selectionHasRangeCount=W;var X=!1,Y=!0,Z=V?function(b,c){var d=F.getRangeDocument(c),e=a.createRange(d);e.collapseToPoint(c.endContainer,c.endOffset),b.addRange(k(e)),b.extend(c.startContainer,c.startOffset)}:null;D.areHostMethods(R,["addRange","getRangeAt","removeAllRanges"])&&typeof R.rangeCount==B&&J.implementsDomRange&&!function(){var b=window.getSelection();if(b){for(var c=b.rangeCount,d=c>1,e=[],f=g(b),h=0;c>h;++h)e[h]=b.getRangeAt(h);var i=C.createTestElement(document,"",!1),j=i.appendChild(document.createTextNode("   ")),k=document.createRange();if(k.setStart(j,1),k.collapse(!0),b.removeAllRanges(),b.addRange(k),Y=1==b.rangeCount,b.removeAllRanges(),!d){var l=window.navigator.appVersion.match(/Chrome\/(.*?) /);if(l&&parseInt(l[1])>=36)X=!1;else{var m=k.cloneRange();k.setStart(j,0),m.setEnd(j,3),m.setStart(j,2),b.addRange(k),b.addRange(m),X=2==b.rangeCount}}for(C.removeNode(i),b.removeAllRanges(),h=0;c>h;++h)0==h&&f?Z?Z(b,e[h]):(a.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend"),b.addRange(e[h])):b.addRange(e[h])}}(),J.selectionSupportsMultipleRanges=X,J.collapsedNonEditableSelectionsSupported=Y;var $,_=!1;T&&E(T,"createControlRange")&&($=T.createControlRange(),D.areHostProperties($,["item","add"])&&(_=!0)),J.implementsControlRange=_,z=U?function(a){return a.anchorNode===a.focusNode&&a.anchorOffset===a.focusOffset}:function(a){return a.rangeCount?a.getRangeAt(a.rangeCount-1).collapsed:!1};var aa;E(R,"getRangeAt")?aa=function(a,b){try{return a.getRangeAt(b)}catch(c){return null}}:U&&(aa=function(b){var c=L(b.anchorNode),d=a.createRange(c);return d.setStartAndEnd(b.anchorNode,b.anchorOffset,b.focusNode,b.focusOffset),d.collapsed!==this.isCollapsed&&d.setStartAndEnd(b.focusNode,b.focusOffset,b.anchorNode,b.anchorOffset),d}),r.prototype=a.selectionPrototype;var ba=[],ca=function(a){if(a&&a instanceof r)return a.refresh(),a;a=d(a,"getNativeSelection");var b=t(a),c=y(a),e=P?f(a):null;return b?(b.nativeSelection=c,b.docSelection=e,b.refresh()):(b=new r(c,e,a),ba.push({win:a,selection:b})),b};a.getSelection=ca,D.createAliasForDeprecatedMethod(a,"getIframeSelection","getSelection");var da=r.prototype;if(!Q&&U&&D.areHostMethods(R,["removeAllRanges","addRange"])){da.removeAllRanges=function(){this.nativeSelection.removeAllRanges(),j(this)};var ea=function(a,b){Z(a.nativeSelection,b),a.refresh()};W?da.addRange=function(b,d){if(_&&P&&this.docSelection.type==K)q(this,b);else if(c(d)&&V)ea(this,b);else{var e;X?e=this.rangeCount:(this.removeAllRanges(),e=0);var f=k(b).cloneRange();try{this.nativeSelection.addRange(f)}catch(g){}if(this.rangeCount=this.nativeSelection.rangeCount,this.rangeCount==e+1){if(a.config.checkSelectionRanges){var i=aa(this.nativeSelection,this.rangeCount-1);i&&!N(i,b)&&(b=new G(i))}this._ranges[this.rangeCount-1]=b,h(this,b,ha(this.nativeSelection)),this.isCollapsed=z(this)}else this.refresh()}}:da.addRange=function(a,b){c(b)&&V?ea(this,a):(this.nativeSelection.addRange(k(a)),this.refresh())},da.setRanges=function(a){if(_&&P&&a.length>1)u(this,a);else{this.removeAllRanges();for(var b=0,c=a.length;c>b;++b)this.addRange(a[b])}}}else{if(!(E(R,"empty")&&E(S,"select")&&_&&Q))return b.fail("No means of selecting a Range or TextRange was found"),!1;da.removeAllRanges=function(){try{if(this.docSelection.empty(),"None"!=this.docSelection.type){var a;if(this.anchorNode)a=L(this.anchorNode);else if(this.docSelection.type==K){var b=this.docSelection.createRange();b.length&&(a=L(b.item(0)))}if(a){var c=M(a).createTextRange();c.select(),this.docSelection.empty()}}}catch(d){}j(this)},da.addRange=function(b){this.docSelection.type==K?q(this,b):(a.WrappedTextRange.rangeToTextRange(b).select(),this._ranges[0]=b,this.rangeCount=1,this.isCollapsed=this._ranges[0].collapsed,h(this,b,!1))},da.setRanges=function(a){this.removeAllRanges();var b=a.length;b>1?u(this,a):b&&this.addRange(a[0])}}da.getRangeAt=function(a){if(0>a||a>=this.rangeCount)throw new H("INDEX_SIZE_ERR");return this._ranges[a].cloneRange()};var fa;if(Q)fa=function(b){var c;a.isSelectionValid(b.win)?c=b.docSelection.createRange():(c=M(b.win.document).createTextRange(),c.collapse(!0)),b.docSelection.type==K?p(b):n(c)?o(b,c):j(b)};else if(E(R,"getRangeAt")&&typeof R.rangeCount==B)fa=function(b){if(_&&P&&b.docSelection.type==K)p(b);else if(b._ranges.length=b.rangeCount=b.nativeSelection.rangeCount,b.rangeCount){for(var c=0,d=b.rangeCount;d>c;++c)b._ranges[c]=new a.WrappedRange(b.nativeSelection.getRangeAt(c));h(b,b._ranges[b.rangeCount-1],ha(b.nativeSelection)),b.isCollapsed=z(b)}else j(b)};else{if(!U||typeof R.isCollapsed!=A||typeof S.collapsed!=A||!J.implementsDomRange)return b.fail("No means of obtaining a Range or TextRange from the user's selection was found"),!1;fa=function(a){var b,c=a.nativeSelection;c.anchorNode?(b=aa(c,0),a._ranges=[b],a.rangeCount=1,i(a),a.isCollapsed=z(a)):j(a)}}da.refresh=function(a){var b=a?this._ranges.slice(0):null,c=this.anchorNode,d=this.anchorOffset;if(fa(this),a){var e=b.length;if(e!=this._ranges.length)return!0;if(this.anchorNode!=c||this.anchorOffset!=d)return!0;for(;e--;)if(!N(b[e],this._ranges[e]))return!0;return!1}};var ga=function(a,b){var c=a.getAllRanges();a.removeAllRanges();for(var d=0,e=c.length;e>d;++d)N(b,c[d])||a.addRange(c[d]);a.rangeCount||j(a)};_&&P?da.removeRange=function(a){if(this.docSelection.type==K){for(var b,c=this.docSelection.createRange(),d=m(a),e=L(c.item(0)),f=M(e).createControlRange(),g=!1,h=0,i=c.length;i>h;++h)b=c.item(h),b!==d||g?f.add(c.item(h)):g=!0;f.select(),p(this)}else ga(this,a)}:da.removeRange=function(a){ga(this,a)};var ha;!Q&&U&&J.implementsDomRange?(ha=g,da.isBackward=function(){return ha(this)}):ha=da.isBackward=function(){return!1},da.isBackwards=da.isBackward,da.toString=function(){for(var a=[],b=0,c=this.rangeCount;c>b;++b)a[b]=""+this._ranges[b];return a.join("")},da.collapse=function(b,c){v(this,b);var d=a.createRange(b);d.collapseToPoint(b,c),this.setSingleRange(d),this.isCollapsed=!0},da.collapseToStart=function(){if(!this.rangeCount)throw new H("INVALID_STATE_ERR");var a=this._ranges[0];this.collapse(a.startContainer,a.startOffset)},da.collapseToEnd=function(){if(!this.rangeCount)throw new H("INVALID_STATE_ERR");var a=this._ranges[this.rangeCount-1];this.collapse(a.endContainer,a.endOffset)},da.selectAllChildren=function(b){v(this,b);var c=a.createRange(b);c.selectNodeContents(b),this.setSingleRange(c)},da.deleteFromDocument=function(){if(_&&P&&this.docSelection.type==K){for(var a,b=this.docSelection.createRange();b.length;)a=b.item(0),b.remove(a),C.removeNode(a);this.refresh()}else if(this.rangeCount){var c=this.getAllRanges();if(c.length){this.removeAllRanges();for(var d=0,e=c.length;e>d;++d)c[d].deleteContents();this.addRange(c[e-1])}}},da.eachRange=function(a,b){for(var c=0,d=this._ranges.length;d>c;++c)if(a(this.getRangeAt(c)))return b},da.getAllRanges=function(){var a=[];return this.eachRange(function(b){a.push(b)}),a},da.setSingleRange=function(a,b){this.removeAllRanges(),this.addRange(a,b)},da.callMethodOnEachRange=function(a,b){var c=[];return this.eachRange(function(d){c.push(d[a].apply(d,b||[]))}),c},da.setStart=w(!0),da.setEnd=w(!1),a.rangePrototype.select=function(a){ca(this.getDocument()).setSingleRange(this,a)},da.changeEachRange=function(a){var b=[],c=this.isBackward();this.eachRange(function(c){a(c),b.push(c)}),this.removeAllRanges(),c&&1==b.length?this.addRange(b[0],"backward"):this.setRanges(b)},da.containsNode=function(a,b){return this.eachRange(function(c){return c.containsNode(a,b)},!0)||!1},da.getBookmark=function(a){return{backward:this.isBackward(),rangeBookmarks:this.callMethodOnEachRange("getBookmark",[a])}},da.moveToBookmark=function(b){for(var c,d,e=[],f=0;c=b.rangeBookmarks[f++];)d=a.createRange(this.win),d.moveToBookmark(c),e.push(d);b.backward?this.setSingleRange(e[0],"backward"):this.setRanges(e)},da.saveRanges=function(){return{backward:this.isBackward(),ranges:this.callMethodOnEachRange("cloneRange")}},da.restoreRanges=function(a){this.removeAllRanges();for(var b,c=0;b=a.ranges[c];++c)this.addRange(b,a.backward&&0==c)},da.toHtml=function(){var a=[];return this.eachRange(function(b){a.push(F.toHtml(b))}),a.join("")},J.implementsTextRange&&(da.getNativeTextRange=function(){var c;if(c=this.docSelection){var d=c.createRange();if(n(d))return d;throw b.createError("getNativeTextRange: selection is a control selection")}if(this.rangeCount>0)return a.WrappedTextRange.rangeToTextRange(this.getRangeAt(0));throw b.createError("getNativeTextRange: selection contains no range")}),da.getName=function(){return"WrappedSelection"},da.inspect=function(){return x(this)},da.detach=function(){t(this.win,"delete"),s(this)},r.detachAll=function(){t(null,"deleteAll")},r.inspect=x,r.isDirectionBackward=c,a.Selection=r,a.selectionPrototype=da,a.addShimListener(function(a){"undefined"==typeof a.getSelection&&(a.getSelection=function(){return ca(a)}),a=null})});var M=!1,N=function(a){M||(M=!0,!H.initialized&&H.config.autoInitialize&&l())};return F&&("complete"==document.readyState?N():(a(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",N,!1),J(window,"load",N))),H},this),function(b,c){"function"==typeof define&&define.amd?define(["./rangy-core"],b):"undefined"!=typeof module&&"object"==typeof a?module.exports=b(require("rangy")):b(c.rangy)}(function(a){return a.createModule("SaveRestore",["WrappedRange"],function(a,b){function c(a,b){return(b||document).getElementById(a)}function d(a,b){var c,d="selectionBoundary_"+ +new Date+"_"+(""+Math.random()).slice(2),e=o.getDocument(a.startContainer),f=a.cloneRange();return f.collapse(b),c=e.createElement("span"),c.id=d,c.style.lineHeight="0",c.style.display="none",c.className="rangySelectionBoundary",c.appendChild(e.createTextNode(r)),f.insertNode(c),c}function e(a,d,e,f){var g=c(e,a);g?(d[f?"setStartBefore":"setEndBefore"](g),p(g)):b.warn("Marker element has been removed. Cannot restore selection.")}function f(a,b){return b.compareBoundaryPoints(a.START_TO_START,a)}function g(b,c){var e,f,g=a.DomRange.getRangeDocument(b),h=b.toString(),i=q(c);return b.collapsed?(f=d(b,!1),{document:g,markerId:f.id,collapsed:!0}):(f=d(b,!1),e=d(b,!0),{document:g,startMarkerId:e.id,endMarkerId:f.id,collapsed:!1,backward:i,toString:function(){return"original text: '"+h+"', new text: '"+b.toString()+"'"}})}function h(d,f){var g=d.document;"undefined"==typeof f&&(f=!0);var h=a.createRange(g);if(d.collapsed){var i=c(d.markerId,g);if(i){i.style.display="inline";var j=i.previousSibling;j&&3==j.nodeType?(p(i),h.collapseToPoint(j,j.length)):(h.collapseBefore(i),p(i))}else b.warn("Marker element has been removed. Cannot restore selection.")}else e(g,h,d.startMarkerId,!0),e(g,h,d.endMarkerId,!1);return f&&h.normalizeBoundaries(),h}function i(b,d){var e,h,i=[],j=q(d);b=b.slice(0),b.sort(f);for(var k=0,l=b.length;l>k;++k)i[k]=g(b[k],j);for(k=l-1;k>=0;--k)e=b[k],h=a.DomRange.getRangeDocument(e),e.collapsed?e.collapseAfter(c(i[k].markerId,h)):(e.setEndBefore(c(i[k].endMarkerId,h)),e.setStartAfter(c(i[k].startMarkerId,h)));return i}function j(c){if(!a.isSelectionValid(c))return b.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus."),null;var d=a.getSelection(c),e=d.getAllRanges(),f=1==e.length&&d.isBackward(),g=i(e,f);return f?d.setSingleRange(e[0],f):d.setRanges(e),{win:c,rangeInfos:g,restored:!1}}function k(a){for(var b=[],c=a.length,d=c-1;d>=0;d--)b[d]=h(a[d],!0);return b}function l(b,c){if(!b.restored){var d=b.rangeInfos,e=a.getSelection(b.win),f=k(d),g=d.length;1==g&&c&&a.features.selectionHasExtend&&d[0].backward?(e.removeAllRanges(),e.addRange(f[0],!0)):e.setRanges(f),b.restored=!0}}function m(a,b){var d=c(b,a);d&&p(d)}function n(a){for(var b,c=a.rangeInfos,d=0,e=c.length;e>d;++d)b=c[d],b.collapsed?m(a.doc,b.markerId):(m(a.doc,b.startMarkerId),m(a.doc,b.endMarkerId))}var o=a.dom,p=o.removeNode,q=a.Selection.isDirectionBackward,r="\ufeff";a.util.extend(a,{saveRange:g,restoreRange:h,saveRanges:i,restoreRanges:k,saveSelection:j,restoreSelection:l,removeMarkerElement:m,removeMarkers:n})}),a},this)}({},function(){return this}());
/**
 * @license AngularJS v1.3.10
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

var $sanitizeMinErr = angular.$$minErr('$sanitize');

/**
 * @ngdoc module
 * @name ngSanitize
 * @description
 *
 * # ngSanitize
 *
 * The `ngSanitize` module provides functionality to sanitize HTML.
 *
 *
 * <div doc-module-components="ngSanitize"></div>
 *
 * See {@link ngSanitize.$sanitize `$sanitize`} for usage.
 */

/*
 * HTML Parser By Misko Hevery (misko@hevery.com)
 * based on:  HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * htmlParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 */


/**
 * @ngdoc service
 * @name $sanitize
 * @kind function
 *
 * @description
 *   The input is sanitized by parsing the HTML into tokens. All safe tokens (from a whitelist) are
 *   then serialized back to properly escaped html string. This means that no unsafe input can make
 *   it into the returned string, however, since our parser is more strict than a typical browser
 *   parser, it's possible that some obscure input, which would be recognized as valid HTML by a
 *   browser, won't make it through the sanitizer. The input may also contain SVG markup.
 *   The whitelist is configured using the functions `aHrefSanitizationWhitelist` and
 *   `imgSrcSanitizationWhitelist` of {@link ng.$compileProvider `$compileProvider`}.
 *
 * @param {string} html HTML input.
 * @returns {string} Sanitized HTML.
 *
 * @example
   <example module="sanitizeExample" deps="angular-sanitize.js">
   <file name="index.html">
     <script>
         angular.module('sanitizeExample', ['ngSanitize'])
           .controller('ExampleController', ['$scope', '$sce', function($scope, $sce) {
             $scope.snippet =
               '<p style="color:blue">an html\n' +
               '<em onmouseover="this.textContent=\'PWN3D!\'">click here</em>\n' +
               'snippet</p>';
             $scope.deliberatelyTrustDangerousSnippet = function() {
               return $sce.trustAsHtml($scope.snippet);
             };
           }]);
     </script>
     <div ng-controller="ExampleController">
        Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
       <table>
         <tr>
           <td>Directive</td>
           <td>How</td>
           <td>Source</td>
           <td>Rendered</td>
         </tr>
         <tr id="bind-html-with-sanitize">
           <td>ng-bind-html</td>
           <td>Automatically uses $sanitize</td>
           <td><pre>&lt;div ng-bind-html="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
           <td><div ng-bind-html="snippet"></div></td>
         </tr>
         <tr id="bind-html-with-trust">
           <td>ng-bind-html</td>
           <td>Bypass $sanitize by explicitly trusting the dangerous value</td>
           <td>
           <pre>&lt;div ng-bind-html="deliberatelyTrustDangerousSnippet()"&gt;
&lt;/div&gt;</pre>
           </td>
           <td><div ng-bind-html="deliberatelyTrustDangerousSnippet()"></div></td>
         </tr>
         <tr id="bind-default">
           <td>ng-bind</td>
           <td>Automatically escapes</td>
           <td><pre>&lt;div ng-bind="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
           <td><div ng-bind="snippet"></div></td>
         </tr>
       </table>
       </div>
   </file>
   <file name="protractor.js" type="protractor">
     it('should sanitize the html snippet by default', function() {
       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).
         toBe('<p>an html\n<em>click here</em>\nsnippet</p>');
     });

     it('should inline raw snippet if bound to a trusted value', function() {
       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).
         toBe("<p style=\"color:blue\">an html\n" +
              "<em onmouseover=\"this.textContent='PWN3D!'\">click here</em>\n" +
              "snippet</p>");
     });

     it('should escape snippet without any filter', function() {
       expect(element(by.css('#bind-default div')).getInnerHtml()).
         toBe("&lt;p style=\"color:blue\"&gt;an html\n" +
              "&lt;em onmouseover=\"this.textContent='PWN3D!'\"&gt;click here&lt;/em&gt;\n" +
              "snippet&lt;/p&gt;");
     });

     it('should update', function() {
       element(by.model('snippet')).clear();
       element(by.model('snippet')).sendKeys('new <b onclick="alert(1)">text</b>');
       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).
         toBe('new <b>text</b>');
       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).toBe(
         'new <b onclick="alert(1)">text</b>');
       expect(element(by.css('#bind-default div')).getInnerHtml()).toBe(
         "new &lt;b onclick=\"alert(1)\"&gt;text&lt;/b&gt;");
     });
   </file>
   </example>
 */
function $SanitizeProvider() {
  this.$get = ['$$sanitizeUri', function($$sanitizeUri) {
    return function(html) {
      if (typeof arguments[1] != 'undefined') {
        arguments[1].version = 'taSanitize';
      }
      var buf = [];
      htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {
        return !/^unsafe/.test($$sanitizeUri(uri, isImage));
      }));
      return buf.join('');
    };
  }];
}

function sanitizeText(chars) {
  var buf = [];
  var writer = htmlSanitizeWriter(buf, angular.noop);
  writer.chars(chars);
  return buf.join('');
}


// Regular Expressions for parsing tags and attributes
var START_TAG_REGEXP =
       /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,
  END_TAG_REGEXP = /^<\/\s*([\w:-]+)[^>]*>/,
  ATTR_REGEXP = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
  BEGIN_TAG_REGEXP = /^</,
  BEGING_END_TAGE_REGEXP = /^<\//,
  COMMENT_REGEXP = /<!--(.*?)-->/g,
  SINGLE_COMMENT_REGEXP = /(^<!--.*?-->)/,
  DOCTYPE_REGEXP = /<!DOCTYPE([^>]*?)>/i,
  CDATA_REGEXP = /<!\[CDATA\[(.*?)]]>/g,
  SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  // Match everything outside of normal chars and " (quote character)
  NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g,
  WHITE_SPACE_REGEXP = /^(\s+)/;


// Good source of info about elements and attributes
// http://dev.w3.org/html5/spec/Overview.html#semantics
// http://simon.html5.org/html-elements

// Safe Void Elements - HTML5
// http://dev.w3.org/html5/spec/Overview.html#void-elements
var voidElements = makeMap("area,br,col,hr,img,wbr,input");

// Elements that you can, intentionally, leave open (and which close themselves)
// http://dev.w3.org/html5/spec/Overview.html#optional-tags
var optionalEndTagBlockElements = makeMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
    optionalEndTagInlineElements = makeMap("rp,rt"),
    optionalEndTagElements = angular.extend({},
                                            optionalEndTagInlineElements,
                                            optionalEndTagBlockElements);

// Safe Block Elements - HTML5
var blockElements = angular.extend({}, optionalEndTagBlockElements, makeMap("address,article," +
        "aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5," +
        "h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul"));

// Inline Elements - HTML5
var inlineElements = angular.extend({}, optionalEndTagInlineElements, makeMap("a,abbr,acronym,b," +
        "bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s," +
        "samp,small,span,strike,strong,sub,sup,time,tt,u,var"));

// SVG Elements
// https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Elements
var svgElements = makeMap("animate,animateColor,animateMotion,animateTransform,circle,defs," +
        "desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient," +
        "line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set," +
        "stop,svg,switch,text,title,tspan,use");

// Special Elements (can contain anything)
var specialElements = makeMap("script,style");

var validElements = angular.extend({},
                                   voidElements,
                                   blockElements,
                                   inlineElements,
                                   optionalEndTagElements,
                                   svgElements);

//Attributes that have href and hence need to be sanitized
var uriAttrs = makeMap("background,cite,href,longdesc,src,usemap,xlink:href,ng-click");

var htmlAttrs = makeMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,'+
    'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,'+
    'id,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,'+
    'scope,scrolling,shape,size,span,start,summary,target,title,type,'+
    'valign,value,vspace,width','ng-click');

// SVG attributes (without "id" and "name" attributes)
// https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Attributes
var svgAttrs = makeMap('accent-height,accumulate,additive,alphabetic,arabic-form,ascent,' +
    'attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,' +
    'color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,' +
    'font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,' +
    'gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,' +
    'keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,' +
    'markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,' +
    'overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,' +
    'repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,' +
    'stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,' +
    'stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,' +
    'stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,' +
    'underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,' +
    'viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,' +
    'xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,' +
    'zoomAndPan');

var validAttrs = angular.extend({},
                                uriAttrs,
                                svgAttrs,
                                htmlAttrs);

function makeMap(str) {
  var obj = {}, items = str.split(','), i;
  for (i = 0; i < items.length; i++) obj[items[i]] = true;
  return obj;
}


/**
 * @example
 * htmlParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * @param {string} html string
 * @param {object} handler
 */
function htmlParser(html, handler) {
  if (typeof html !== 'string') {
    if (html === null || typeof html === 'undefined') {
      html = '';
    } else {
      html = '' + html;
    }
  }
  var index, chars, match, stack = [], last = html, text;
  stack.last = function() { return stack[ stack.length - 1 ]; };

  while (html) {
    text = '';
    chars = true;

    // Make sure we're not in a script or style element
    if (!stack.last() || !specialElements[ stack.last() ]) {

      // White space
      if (WHITE_SPACE_REGEXP.test(html)) {
        match = html.match(WHITE_SPACE_REGEXP);

        if (match) {
          var mat = match[0];
          if (handler.whitespace) handler.whitespace(match[0]);
          html = html.replace(match[0], '');
          chars = false;
        }
      //Comment
      } else if (SINGLE_COMMENT_REGEXP.test(html)) {
        match = html.match(SINGLE_COMMENT_REGEXP);

        if (match) {
          if (handler.comment) handler.comment(match[1]);
          html = html.replace(match[0], '');
          chars = false;
        }
      // DOCTYPE
      } else if (DOCTYPE_REGEXP.test(html)) {
        match = html.match(DOCTYPE_REGEXP);

        if (match) {
          html = html.replace(match[0], '');
          chars = false;
        }
      // end tag
      } else if (BEGING_END_TAGE_REGEXP.test(html)) {
        match = html.match(END_TAG_REGEXP);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(END_TAG_REGEXP, parseEndTag);
          chars = false;
        }

      // start tag
      } else if (BEGIN_TAG_REGEXP.test(html)) {
        match = html.match(START_TAG_REGEXP);

        if (match) {
          // We only have a valid start-tag if there is a '>'.
          if (match[4]) {
            html = html.substring(match[0].length);
            match[0].replace(START_TAG_REGEXP, parseStartTag);
          }
          chars = false;
        } else {
          // no ending tag found --- this piece should be encoded as an entity.
          text += '<';
          html = html.substring(1);
        }
      }

      if (chars) {
        index = html.indexOf("<");

        text += index < 0 ? html : html.substring(0, index);
        html = index < 0 ? "" : html.substring(index);

        if (handler.chars) handler.chars(decodeEntities(text));
      }

    } else {
      html = html.replace(new RegExp("([^]*)<\\s*\\/\\s*" + stack.last() + "[^>]*>", 'i'),
        function(all, text) {
          text = text.replace(COMMENT_REGEXP, "$1").replace(CDATA_REGEXP, "$1");

          if (handler.chars) handler.chars(decodeEntities(text));

          return "";
      });

      parseEndTag("", stack.last());
    }

    if (html == last) {
      throw $sanitizeMinErr('badparse', "The sanitizer was unable to parse the following block " +
                                        "of html: {0}", html);
    }
    last = html;
  }

  // Clean up any remaining tags
  parseEndTag();

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = angular.lowercase(tagName);
    if (blockElements[ tagName ]) {
      while (stack.last() && inlineElements[ stack.last() ]) {
        parseEndTag("", stack.last());
      }
    }

    if (optionalEndTagElements[ tagName ] && stack.last() == tagName) {
      parseEndTag("", tagName);
    }

    unary = voidElements[ tagName ] || !!unary;

    if (!unary)
      stack.push(tagName);

    var attrs = {};

    rest.replace(ATTR_REGEXP,
      function(match, name, doubleQuotedValue, singleQuotedValue, unquotedValue) {
        var value = doubleQuotedValue
          || singleQuotedValue
          || unquotedValue
          || '';

        attrs[name] = decodeEntities(value);
    });
    if (handler.start) handler.start(tagName, attrs, unary);
  }

  function parseEndTag(tag, tagName) {
    var pos = 0, i;
    tagName = angular.lowercase(tagName);
    if (tagName)
      // Find the closest opened tag of the same type
      for (pos = stack.length - 1; pos >= 0; pos--)
        if (stack[ pos ] == tagName)
          break;

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (i = stack.length - 1; i >= pos; i--)
        if (handler.end) handler.end(stack[ i ]);

      // Remove the open elements from the stack
      stack.length = pos;
    }
  }
}

var hiddenPre=document.createElement("pre");
var spaceRe = /^(\s*)([\s\S]*?)(\s*)$/;
/**
 * decodes all entities into regular string
 * @param value
 * @returns {string} A string with decoded entities.
 */
function decodeEntities(value) {
  if (!value) { return ''; }

  // Note: IE8 does not preserve spaces at the start/end of innerHTML
  // so we must capture them and reattach them afterward
  var parts = spaceRe.exec(value);
  var spaceBefore = parts[1];
  var spaceAfter = parts[3];
  var content = parts[2];
  if (content) {
    hiddenPre.innerHTML=content.replace(/</g,"&lt;");
    // innerText depends on styling as it doesn't display hidden elements.
    // Therefore, it's better to use textContent not to cause unnecessary
    // reflows. However, IE<9 don't support textContent so the innerText
    // fallback is necessary.
    content = 'textContent' in hiddenPre ?
      hiddenPre.textContent : hiddenPre.innerText;
  }
  return spaceBefore + content + spaceAfter;
}

/**
 * Escapes all potentially dangerous characters, so that the
 * resulting string can be safely inserted into attribute or
 * element text.
 * @param value
 * @returns {string} escaped text
 */
function encodeEntities(value) {
  return value.
    replace(/&/g, '&amp;').
    replace(SURROGATE_PAIR_REGEXP, function(value) {
      var hi = value.charCodeAt(0);
      var low = value.charCodeAt(1);
      return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
    }).
    replace(NON_ALPHANUMERIC_REGEXP, function(value) {
      // unsafe chars are: \u0000-\u001f \u007f-\u009f \u00ad \u0600-\u0604 \u070f \u17b4 \u17b5 \u200c-\u200f \u2028-\u202f \u2060-\u206f \ufeff \ufff0-\uffff from jslint.com/lint.html
      // decimal values are: 0-31, 127-159, 173, 1536-1540, 1807, 6068, 6069, 8204-8207, 8232-8239, 8288-8303, 65279, 65520-65535
      var c = value.charCodeAt(0);
      // if unsafe character encode
      if(c <= 159 ||
        c == 173 ||
        (c >= 1536 && c <= 1540) ||
        c == 1807 ||
        c == 6068 ||
        c == 6069 ||
        (c >= 8204 && c <= 8207) ||
        (c >= 8232 && c <= 8239) ||
        (c >= 8288 && c <= 8303) ||
        c == 65279 ||
        (c >= 65520 && c <= 65535)) return '&#' + c + ';';
      return value; // avoids multilingual issues
    }).
    replace(/</g, '&lt;').
    replace(/>/g, '&gt;');
}

var trim = (function() {
  // native trim is way faster: http://jsperf.com/angular-trim-test
  // but IE doesn't have it... :-(
  // TODO: we should move this into IE/ES5 polyfill
  if (!String.prototype.trim) {
    return function(value) {
      return angular.isString(value) ? value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : value;
    };
  }
  return function(value) {
    return angular.isString(value) ? value.trim() : value;
  };
})();

// Custom logic for accepting certain style options only - textAngular
// Currently allows only the color, background-color, text-align, float, width and height attributes
// all other attributes should be easily done through classes.
function validStyles(styleAttr){
	var result = '';
	var styleArray = styleAttr.split(';');
	angular.forEach(styleArray, function(value){
		var v = value.split(':');
		if(v.length == 2){
			var key = trim(angular.lowercase(v[0]));
			var value = trim(angular.lowercase(v[1]));
			if(
				(key === 'color' || key === 'background-color') && (
					value.match(/^rgb\([0-9%,\. ]*\)$/i)
					|| value.match(/^rgba\([0-9%,\. ]*\)$/i)
					|| value.match(/^hsl\([0-9%,\. ]*\)$/i)
					|| value.match(/^hsla\([0-9%,\. ]*\)$/i)
					|| value.match(/^#[0-9a-f]{3,6}$/i)
					|| value.match(/^[a-z]*$/i)
				)
			||
				key === 'text-align' && (
					value === 'left'
					|| value === 'right'
					|| value === 'center'
					|| value === 'justify'
				)
			||
                key === 'text-decoration' && (
                    value === 'underline'
                    || value === 'line-through'
                )
            || key === 'font-weight' && (
                    value === 'bold'
                )
            ||
				key === 'float' && (
					value === 'left'
					|| value === 'right'
					|| value === 'none'
				)
			||
				(key === 'width' || key === 'height') && (
					value.match(/[0-9\.]*(px|em|rem|%)/)
				)
			|| // Reference #520
				(key === 'direction' && value.match(/^ltr|rtl|initial|inherit$/))
			) result += key + ': ' + value + ';';
		}
	});
	return result;
}

// this function is used to manually allow specific attributes on specific tags with certain prerequisites
function validCustomTag(tag, attrs, lkey, value){
	// catch the div placeholder for the iframe replacement
    if (tag === 'img' && attrs['ta-insert-video']){
        if(lkey === 'ta-insert-video' || lkey === 'allowfullscreen' || lkey === 'frameborder' || (lkey === 'contenteditable' && value === 'false')) return true;
    }
    return false;
}

/**
 * create an HTML/XML writer which writes to buffer
 * @param {Array} buf use buf.jain('') to get out sanitized html string
 * @returns {object} in the form of {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * }
 */
function htmlSanitizeWriter(buf, uriValidator) {
  var ignore = false;
  var out = angular.bind(buf, buf.push);
  return {
    start: function(tag, attrs, unary) {
      tag = angular.lowercase(tag);
      if (!ignore && specialElements[tag]) {
        ignore = tag;
      }
      if (!ignore && validElements[tag] === true) {
        out('<');
        out(tag);
        angular.forEach(attrs, function(value, key) {
          var lkey=angular.lowercase(key);
          var isImage=(tag === 'img' && lkey === 'src') || (lkey === 'background');
          if ((lkey === 'style' && (value = validStyles(value)) !== '') || validCustomTag(tag, attrs, lkey, value) || validAttrs[lkey] === true &&
            (uriAttrs[lkey] !== true || uriValidator(value, isImage))) {
            out(' ');
            out(key);
            out('="');
            out(encodeEntities(value));
            out('"');
          }
        });
        out(unary ? '/>' : '>');
      }
    },
    comment: function (com) {
      out(com);
    },
    whitespace: function (ws) {
      out(encodeEntities(ws));
    },
    end: function(tag) {
        tag = angular.lowercase(tag);
        if (!ignore && validElements[tag] === true) {
          out('</');
          out(tag);
          out('>');
        }
        if (tag == ignore) {
          ignore = false;
        }
      },
    chars: function(chars) {
        if (!ignore) {
          out(encodeEntities(chars));
        }
      }
  };
}


// define ngSanitize module and register $sanitize service
angular.module('ngSanitize', []).provider('$sanitize', $SanitizeProvider);

/* global sanitizeText: false */

/**
 * @ngdoc filter
 * @name linky
 * @kind function
 *
 * @description
 * Finds links in text input and turns them into html links. Supports http/https/ftp/mailto and
 * plain email address links.
 *
 * Requires the {@link ngSanitize `ngSanitize`} module to be installed.
 *
 * @param {string} text Input text.
 * @param {string} target Window (_blank|_self|_parent|_top) or named frame to open links in.
 * @returns {string} Html-linkified text.
 *
 * @usage
   <span ng-bind-html="linky_expression | linky"></span>
 *
 * @example
   <example module="linkyExample" deps="angular-sanitize.js">
     <file name="index.html">
       <script>
         angular.module('linkyExample', ['ngSanitize'])
           .controller('ExampleController', ['$scope', function($scope) {
             $scope.snippet =
               'Pretty text with some links:\n'+
               'http://angularjs.org/,\n'+
               'mailto:us@somewhere.org,\n'+
               'another@somewhere.org,\n'+
               'and one more: ftp://127.0.0.1/.';
             $scope.snippetWithTarget = 'http://angularjs.org/';
           }]);
       </script>
       <div ng-controller="ExampleController">
       Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
       <table>
         <tr>
           <td>Filter</td>
           <td>Source</td>
           <td>Rendered</td>
         </tr>
         <tr id="linky-filter">
           <td>linky filter</td>
           <td>
             <pre>&lt;div ng-bind-html="snippet | linky"&gt;<br>&lt;/div&gt;</pre>
           </td>
           <td>
             <div ng-bind-html="snippet | linky"></div>
           </td>
         </tr>
         <tr id="linky-target">
          <td>linky target</td>
          <td>
            <pre>&lt;div ng-bind-html="snippetWithTarget | linky:'_blank'"&gt;<br>&lt;/div&gt;</pre>
          </td>
          <td>
            <div ng-bind-html="snippetWithTarget | linky:'_blank'"></div>
          </td>
         </tr>
         <tr id="escaped-html">
           <td>no filter</td>
           <td><pre>&lt;div ng-bind="snippet"&gt;<br>&lt;/div&gt;</pre></td>
           <td><div ng-bind="snippet"></div></td>
         </tr>
       </table>
     </file>
     <file name="protractor.js" type="protractor">
       it('should linkify the snippet with urls', function() {
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
             toBe('Pretty text with some links: http://angularjs.org/, us@somewhere.org, ' +
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(4);
       });

       it('should not linkify snippet without the linky filter', function() {
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText()).
             toBe('Pretty text with some links: http://angularjs.org/, mailto:us@somewhere.org, ' +
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
         expect(element.all(by.css('#escaped-html a')).count()).toEqual(0);
       });

       it('should update', function() {
         element(by.model('snippet')).clear();
         element(by.model('snippet')).sendKeys('new http://link.');
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
             toBe('new http://link.');
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(1);
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText())
             .toBe('new http://link.');
       });

       it('should work with the target property', function() {
        expect(element(by.id('linky-target')).
            element(by.binding("snippetWithTarget | linky:'_blank'")).getText()).
            toBe('http://angularjs.org/');
        expect(element(by.css('#linky-target a')).getAttribute('target')).toEqual('_blank');
       });
     </file>
   </example>
 */
angular.module('ngSanitize').filter('linky', ['$sanitize', function($sanitize) {
  var LINKY_URL_REGEXP =
        /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"”’]/,
      MAILTO_REGEXP = /^mailto:/;

  return function(text, target) {
    if (!text) return text;
    var match;
    var raw = text;
    var html = [];
    var url;
    var i;
    while ((match = raw.match(LINKY_URL_REGEXP))) {
      // We can not end in these as they are sometimes found at the end of the sentence
      url = match[0];
      // if we did not match ftp/http/www/mailto then assume mailto
      if (!match[2] && !match[4]) {
        url = (match[3] ? 'http://' : 'mailto:') + url;
      }
      i = match.index;
      addText(raw.substr(0, i));
      addLink(url, match[0].replace(MAILTO_REGEXP, ''));
      raw = raw.substring(i + match[0].length);
    }
    addText(raw);
    return $sanitize(html.join(''));

    function addText(text) {
      if (!text) {
        return;
      }
      html.push(sanitizeText(text));
    }

    function addLink(url, text) {
      html.push('<a ');
      if (angular.isDefined(target)) {
        html.push('target="',
                  target,
                  '" ');
      }
      html.push('href="',
                url.replace(/"/g, '&quot;'),
                '">');
      addText(text);
      html.push('</a>');
    }
  };
}]);


})(window, window.angular);

!function(a,b){function c(a){try{return 0!==angular.element(a).length}catch(b){return!1}}function d(a,b){if(!a||""===a||e.hasOwnProperty(a))throw"textAngular Error: A unique name is required for a Tool Definition";if(b.display&&(""===b.display||!c(b.display))||!b.display&&!b.buttontext&&!b.iconclass)throw'textAngular Error: Tool Definition for "'+a+'" does not have a valid display/iconclass/buttontext value';e[a]=b}b["true"]=a;var e={};angular.module("textAngularSetup",[]).constant("taRegisterTool",d).value("taTools",e).value("taOptions",{forceTextAngularSanitize:!0,keyMappings:[],toolbar:[["h1","h2","h3","h4","h5","h6","p","pre","quote"],["bold","italics","underline","strikeThrough","ul","ol","redo","undo","clear"],["justifyLeft","justifyCenter","justifyRight","justifyFull","indent","outdent"],["html","insertImage","insertLink","insertVideo","wordcount","charcount"]],classes:{focussed:"focussed",toolbar:"btn-toolbar",toolbarGroup:"btn-group",toolbarButton:"btn btn-default",toolbarButtonActive:"active",disabled:"disabled",textEditor:"form-control",htmlEditor:"form-control"},defaultTagAttributes:{a:{target:""}},setup:{textEditorSetup:function(a){},htmlEditorSetup:function(a){}},defaultFileDropHandler:function(a,b){var c=new FileReader;return"image"===a.type.substring(0,5)?(c.onload=function(){""!==c.result&&b("insertImage",c.result,!0)},c.readAsDataURL(a),!0):!1}}).value("taSelectableElements",["a","img"]).value("taCustomRenderers",[{selector:"img",customAttribute:"ta-insert-video",renderLogic:function(a){var b=angular.element("<iframe></iframe>"),c=a.prop("attributes");angular.forEach(c,function(a){b.attr(a.name,a.value)}),b.attr("src",b.attr("ta-insert-video")),a.replaceWith(b)}}]).value("taTranslations",{html:{tooltip:"Toggle html / Rich Text"},heading:{tooltip:"Heading "},p:{tooltip:"Paragraph"},pre:{tooltip:"Preformatted text"},ul:{tooltip:"Unordered List"},ol:{tooltip:"Ordered List"},quote:{tooltip:"Quote/unquote selection or paragraph"},undo:{tooltip:"Undo"},redo:{tooltip:"Redo"},bold:{tooltip:"Bold"},italic:{tooltip:"Italic"},underline:{tooltip:"Underline"},strikeThrough:{tooltip:"Strikethrough"},justifyLeft:{tooltip:"Align text left"},justifyRight:{tooltip:"Align text right"},justifyFull:{tooltip:"Justify text"},justifyCenter:{tooltip:"Center"},indent:{tooltip:"Increase indent"},outdent:{tooltip:"Decrease indent"},clear:{tooltip:"Clear formatting"},insertImage:{dialogPrompt:"Please enter an image URL to insert",tooltip:"Insert image",hotkey:"the - possibly language dependent hotkey ... for some future implementation"},insertVideo:{tooltip:"Insert video",dialogPrompt:"Please enter a youtube URL to embed"},insertLink:{tooltip:"Insert / edit link",dialogPrompt:"Please enter a URL to insert"},editLink:{reLinkButton:{tooltip:"Relink"},unLinkButton:{tooltip:"Unlink"},targetToggle:{buttontext:"Open in New Window"}},wordcount:{tooltip:"Display words Count"},charcount:{tooltip:"Display characters Count"}}).factory("taToolFunctions",["$window","taTranslations",function(a,b){return{imgOnSelectAction:function(a,b,c){var d=function(){c.updateTaBindtaTextElement(),c.hidePopover()};a.preventDefault(),c.displayElements.popover.css("width","375px");var e=c.displayElements.popoverContainer;e.empty();var f=angular.element('<div class="btn-group" style="padding-right: 6px;">'),g=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');g.on("click",function(a){a.preventDefault(),b.css({width:"100%",height:""}),d()});var h=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');h.on("click",function(a){a.preventDefault(),b.css({width:"50%",height:""}),d()});var i=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');i.on("click",function(a){a.preventDefault(),b.css({width:"25%",height:""}),d()});var j=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');j.on("click",function(a){a.preventDefault(),b.css({width:"",height:""}),d()}),f.append(g),f.append(h),f.append(i),f.append(j),e.append(f),f=angular.element('<div class="btn-group" style="padding-right: 6px;">');var k=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');k.on("click",function(a){a.preventDefault(),b.css("float","left"),b.css("cssFloat","left"),b.css("styleFloat","left"),d()});var l=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');l.on("click",function(a){a.preventDefault(),b.css("float","right"),b.css("cssFloat","right"),b.css("styleFloat","right"),d()});var m=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');m.on("click",function(a){a.preventDefault(),b.css("float",""),b.css("cssFloat",""),b.css("styleFloat",""),d()}),f.append(k),f.append(m),f.append(l),e.append(f),f=angular.element('<div class="btn-group">');var n=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');n.on("click",function(a){a.preventDefault(),b.remove(),d()}),f.append(n),e.append(f),c.showPopover(b),c.showResizeOverlay(b)},aOnSelectAction:function(c,d,e){c.preventDefault(),e.displayElements.popover.css("width","436px");var f=e.displayElements.popoverContainer;f.empty(),f.css("line-height","28px");var g=angular.element('<a href="'+d.attr("href")+'" target="_blank">'+d.attr("href")+"</a>");g.css({display:"inline-block","max-width":"200px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap","vertical-align":"middle"}),f.append(g);var h=angular.element('<div class="btn-group pull-right">'),i=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="'+b.editLink.reLinkButton.tooltip+'"><i class="fa fa-edit icon-edit"></i></button>');i.on("click",function(c){c.preventDefault();var f=a.prompt(b.insertLink.dialogPrompt,d.attr("href"));f&&""!==f&&"http://"!==f&&(d.attr("href",f),e.updateTaBindtaTextElement()),e.hidePopover()}),h.append(i);var j=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="'+b.editLink.unLinkButton.tooltip+'"><i class="fa fa-unlink icon-unlink"></i></button>');j.on("click",function(a){a.preventDefault(),d.replaceWith(d.contents()),e.updateTaBindtaTextElement(),e.hidePopover()}),h.append(j);var k=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on">'+b.editLink.targetToggle.buttontext+"</button>");"_blank"===d.attr("target")&&k.addClass("active"),k.on("click",function(a){a.preventDefault(),d.attr("target","_blank"===d.attr("target")?"":"_blank"),k.toggleClass("active"),e.updateTaBindtaTextElement()}),h.append(k),f.append(h),e.showPopover(d)},extractYoutubeVideoId:function(a){var b=/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i,c=a.match(b);return c&&c[1]||null}}}]).run(["taRegisterTool","$window","taTranslations","taSelection","taToolFunctions","$sanitize","taOptions",function(a,b,c,d,e,f,g){var h={};if(f("",h),g.forceTextAngularSanitize===!0&&"taSanitize"!==h.version)throw angular.$$minErr("textAngular")("textAngularSetup","The textAngular-sanitize provider has been replaced by another -- have you included angular-sanitize by mistake?");a("html",{iconclass:"fa fa-code",tooltiptext:c.html.tooltip,action:function(){this.$editor().switchView()},activeState:function(){return this.$editor().showHtml}});var i=function(a){return function(){return this.$editor().queryFormatBlockState(a)}},j=function(){return this.$editor().wrapSelection("formatBlock","<"+this.name.toUpperCase()+">")};angular.forEach(["h1","h2","h3","h4","h5","h6"],function(b){a(b.toLowerCase(),{buttontext:b.toUpperCase(),tooltiptext:c.heading.tooltip+b.charAt(1),action:j,activeState:i(b.toLowerCase())})}),a("p",{buttontext:"P",tooltiptext:c.p.tooltip,action:function(){return this.$editor().wrapSelection("formatBlock","<P>")},activeState:function(){return this.$editor().queryFormatBlockState("p")}}),a("pre",{buttontext:"pre",tooltiptext:c.pre.tooltip,action:function(){return this.$editor().wrapSelection("formatBlock","<PRE>")},activeState:function(){return this.$editor().queryFormatBlockState("pre")}}),a("ul",{iconclass:"fa fa-list-ul",tooltiptext:c.ul.tooltip,action:function(){return this.$editor().wrapSelection("insertUnorderedList",null)},activeState:function(){return this.$editor().queryCommandState("insertUnorderedList")}}),a("ol",{iconclass:"fa fa-list-ol",tooltiptext:c.ol.tooltip,action:function(){return this.$editor().wrapSelection("insertOrderedList",null)},activeState:function(){return this.$editor().queryCommandState("insertOrderedList")}}),a("quote",{iconclass:"fa fa-quote-right",tooltiptext:c.quote.tooltip,action:function(){return this.$editor().wrapSelection("formatBlock","<BLOCKQUOTE>")},activeState:function(){return this.$editor().queryFormatBlockState("blockquote")}}),a("undo",{iconclass:"fa fa-undo",tooltiptext:c.undo.tooltip,action:function(){return this.$editor().wrapSelection("undo",null)}}),a("redo",{iconclass:"fa fa-repeat",tooltiptext:c.redo.tooltip,action:function(){return this.$editor().wrapSelection("redo",null)}}),a("bold",{iconclass:"fa fa-bold",tooltiptext:c.bold.tooltip,action:function(){return this.$editor().wrapSelection("bold",null)},activeState:function(){return this.$editor().queryCommandState("bold")},commandKeyCode:98}),a("justifyLeft",{iconclass:"fa fa-align-left",tooltiptext:c.justifyLeft.tooltip,action:function(){return this.$editor().wrapSelection("justifyLeft",null)},activeState:function(a){if(a&&"#document"===a.nodeName)return!1;var b=!1;return a&&(b="left"===a.css("text-align")||"left"===a.attr("align")||"right"!==a.css("text-align")&&"center"!==a.css("text-align")&&"justify"!==a.css("text-align")&&!this.$editor().queryCommandState("justifyRight")&&!this.$editor().queryCommandState("justifyCenter")&&!this.$editor().queryCommandState("justifyFull")),b=b||this.$editor().queryCommandState("justifyLeft")}}),a("justifyRight",{iconclass:"fa fa-align-right",tooltiptext:c.justifyRight.tooltip,action:function(){return this.$editor().wrapSelection("justifyRight",null)},activeState:function(a){if(a&&"#document"===a.nodeName)return!1;var b=!1;return a&&(b="right"===a.css("text-align")),b=b||this.$editor().queryCommandState("justifyRight")}}),a("justifyFull",{iconclass:"fa fa-align-justify",tooltiptext:c.justifyFull.tooltip,action:function(){return this.$editor().wrapSelection("justifyFull",null)},activeState:function(a){var b=!1;return a&&(b="justify"===a.css("text-align")),b=b||this.$editor().queryCommandState("justifyFull")}}),a("justifyCenter",{iconclass:"fa fa-align-center",tooltiptext:c.justifyCenter.tooltip,action:function(){return this.$editor().wrapSelection("justifyCenter",null)},activeState:function(a){if(a&&"#document"===a.nodeName)return!1;var b=!1;return a&&(b="center"===a.css("text-align")),b=b||this.$editor().queryCommandState("justifyCenter")}}),a("indent",{iconclass:"fa fa-indent",tooltiptext:c.indent.tooltip,action:function(){return this.$editor().wrapSelection("indent",null)},activeState:function(){return this.$editor().queryFormatBlockState("blockquote")},commandKeyCode:"TabKey"}),a("outdent",{iconclass:"fa fa-outdent",tooltiptext:c.outdent.tooltip,action:function(){return this.$editor().wrapSelection("outdent",null)},activeState:function(){return!1},commandKeyCode:"ShiftTabKey"}),a("italics",{iconclass:"fa fa-italic",tooltiptext:c.italic.tooltip,action:function(){return this.$editor().wrapSelection("italic",null)},activeState:function(){return this.$editor().queryCommandState("italic")},commandKeyCode:105}),a("underline",{iconclass:"fa fa-underline",tooltiptext:c.underline.tooltip,action:function(){return this.$editor().wrapSelection("underline",null)},activeState:function(){return this.$editor().queryCommandState("underline")},commandKeyCode:117}),a("strikeThrough",{iconclass:"fa fa-strikethrough",tooltiptext:c.strikeThrough.tooltip,action:function(){return this.$editor().wrapSelection("strikeThrough",null)},activeState:function(){return document.queryCommandState("strikeThrough")}}),a("clear",{iconclass:"fa fa-ban",tooltiptext:c.clear.tooltip,action:function(a,b){var c;this.$editor().wrapSelection("removeFormat",null);var e=angular.element(d.getSelectionElement()),f=function(a){a=angular.element(a);var b=a;angular.forEach(a.children(),function(a){var c=angular.element("<p></p>");c.html(angular.element(a).html()),b.after(c),b=c}),a.remove()};if(angular.forEach(e.find("ul"),f),angular.forEach(e.find("ol"),f),"li"===e[0].tagName.toLowerCase()){var g=e[0].parentNode.childNodes,h=[],i=[],j=!1;for(c=0;c<g.length;c++)g[c]===e[0]?j=!0:j?i.push(g[c]):h.push(g[c]);var k=angular.element(e[0].parentNode),l=angular.element("<p></p>");if(l.html(angular.element(e[0]).html()),0===h.length||0===i.length)0===i.length?k.after(l):k[0].parentNode.insertBefore(l[0],k[0]),0===h.length&&0===i.length?k.remove():angular.element(e[0]).remove();else{var m=angular.element("<"+k[0].tagName+"></"+k[0].tagName+">"),n=angular.element("<"+k[0].tagName+"></"+k[0].tagName+">");for(c=0;c<h.length;c++)m.append(angular.element(h[c]));for(c=0;c<i.length;c++)n.append(angular.element(i[c]));k.after(n),k.after(l),k.after(m),k.remove()}d.setSelectionToElementEnd(l[0])}var o=this.$editor(),p=function(a){a=angular.element(a),a[0]!==o.displayElements.text[0]&&a.removeAttr("class"),angular.forEach(a.children(),p)};angular.forEach(e,p),"li"!==e[0].tagName.toLowerCase()&&"ol"!==e[0].tagName.toLowerCase()&&"ul"!==e[0].tagName.toLowerCase()&&this.$editor().wrapSelection("formatBlock","default"),b()}}),a("insertImage",{iconclass:"fa fa-picture-o",tooltiptext:c.insertImage.tooltip,action:function(){var a;return a=b.prompt(c.insertImage.dialogPrompt,"http://"),a&&""!==a&&"http://"!==a?this.$editor().wrapSelection("insertImage",a,!0):void 0},onElementSelect:{element:"img",action:e.imgOnSelectAction}}),a("insertVideo",{iconclass:"fa fa-youtube-play",tooltiptext:c.insertVideo.tooltip,action:function(){var a;if(a=b.prompt(c.insertVideo.dialogPrompt,"https://"),a&&""!==a&&"https://"!==a&&(videoId=e.extractYoutubeVideoId(a),videoId)){var d="https://www.youtube.com/embed/"+videoId,f='<img class="ta-insert-video" src="https://img.youtube.com/vi/'+videoId+'/hqdefault.jpg" ta-insert-video="'+d+'" contenteditable="false" allowfullscreen="true" frameborder="0" />';return this.$editor().wrapSelection("insertHTML",f,!0)}},onElementSelect:{element:"img",onlyWithAttrs:["ta-insert-video"],action:e.imgOnSelectAction}}),a("insertLink",{tooltiptext:c.insertLink.tooltip,iconclass:"fa fa-link",action:function(){var a;return a=b.prompt(c.insertLink.dialogPrompt,"http://"),a&&""!==a&&"http://"!==a?this.$editor().wrapSelection("createLink",a,!0):void 0},activeState:function(a){return a?"A"===a[0].tagName:!1},onElementSelect:{element:"a",action:e.aOnSelectAction}}),a("wordcount",{display:'<div id="toolbarWC" style="display:block; min-width:100px;">Words: <span ng-bind="wordcount"></span></div>',disabled:!0,wordcount:0,activeState:function(){var a=this.$editor().displayElements.text,b=a[0].innerHTML||"",c=0;return""!==b.replace(/\s*<[^>]*?>\s*/g,"")&&(c=b.replace(/<\/?(b|i|em|strong|span|u|strikethrough|a|img|small|sub|sup|label)( [^>*?])?>/gi,"").replace(/(<[^>]*?>\s*<[^>]*?>)/gi," ").replace(/(<[^>]*?>)/gi,"").replace(/\s+/gi," ").match(/\S+/g).length),this.wordcount=c,this.$editor().wordcount=c,!1}}),a("charcount",{display:'<div id="toolbarCC" style="display:block; min-width:120px;">Characters: <span ng-bind="charcount"></span></div>',disabled:!0,charcount:0,activeState:function(){var a=this.$editor().displayElements.text,b=a[0].innerText||a[0].textContent,c=b.replace(/(\r\n|\n|\r)/gm,"").replace(/^\s+/g," ").replace(/\s+$/g," ").length;return this.charcount=c,this.$editor().charcount=c,!1}})}]),/*
@license textAngular
Author : Austin Anderson
License : 2013 MIT
Version 1.5.0

See README.md or https://github.com/fraywing/textAngular/wiki for requirements and use.
*/
"undefined"!=typeof module&&"undefined"!=typeof a&&module.exports===a&&(module.exports="textAngular"),function(){"use strict";var b={ie:function(){for(var a,b=3,c=document.createElement("div"),d=c.getElementsByTagName("i");c.innerHTML="<!--[if gt IE "+ ++b+"]><i></i><![endif]-->",d[0];);return b>4?b:a}(),webkit:/AppleWebKit\/([\d.]+)/i.test(navigator.userAgent)},c=!1;b.webkit&&(document.addEventListener("mousedown",function(a){var b=a||window.event,d=b.target;if(c&&null!==d){for(var e=!1,f=d;null!==f&&"html"!==f.tagName.toLowerCase()&&!e;)e="true"===f.contentEditable,f=f.parentNode;e||(document.getElementById("textAngular-editableFix-010203040506070809").setSelectionRange(0,0),d.focus(),d.select&&d.select())}c=!1},!1),angular.element(document).ready(function(){angular.element(document.body).append(angular.element('<input id="textAngular-editableFix-010203040506070809" class="ta-hidden-input" aria-hidden="true" unselectable="on" tabIndex="-1">'))}));var d=/^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)$/i,f=/^(ul|li|ol)$/i,g=/^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video|li)$/i;String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var h,i,j,k,l,m;if(b.ie>8||void 0===b.ie){for(var n=document.styleSheets,o=0;o<n.length;o++)if((0===n[o].media.length||n[o].media.mediaText.match(/(all|screen)/gi))&&n[o].href&&n[o].href.match(/textangular\.(min\.|)css/gi)){h=n[o];break}h||(h=function(){var a=document.createElement("style");return b.webkit&&a.appendChild(document.createTextNode("")),document.getElementsByTagName("head")[0].appendChild(a),a.sheet}()),i=function(a,b){return k(h,a,b)},k=function(a,b,c){var d,e;return a.cssRules?d=Math.max(a.cssRules.length-1,0):a.rules&&(d=Math.max(a.rules.length-1,0)),a.insertRule?a.insertRule(b+"{"+c+"}",d):a.addRule(b,c,d),h.rules?e=h.rules[d]:h.cssRules&&(e=h.cssRules[d]),e},m=function(a,b){var c,d;for(c=0;c<b.length;c++)if(b[c].cssText===a.cssText){d=c;break}return d},j=function(a){l(h,a)},l=function(a,b){var c=a.cssRules||a.rules;if(c&&0!==c.length){var d=m(b,c);a.removeRule?a.removeRule(d):a.deleteRule(d)}}}angular.module("textAngular.factories",[]).factory("taBrowserTag",[function(){return function(a){return a?""===a?void 0===b.ie?"div":b.ie<=8?"P":"p":b.ie<=8?a.toUpperCase():a:b.ie<=8?"P":"p"}}]).factory("taApplyCustomRenderers",["taCustomRenderers","taDOM",function(a,b){return function(c){var d=angular.element("<div></div>");return d[0].innerHTML=c,angular.forEach(a,function(a){var c=[];a.selector&&""!==a.selector?c=d.find(a.selector):a.customAttribute&&""!==a.customAttribute&&(c=b.getByAttribute(d,a.customAttribute)),angular.forEach(c,function(b){b=angular.element(b),a.selector&&""!==a.selector&&a.customAttribute&&""!==a.customAttribute?void 0!==b.attr(a.customAttribute)&&a.renderLogic(b):a.renderLogic(b)})}),d[0].innerHTML}}]).factory("taFixChrome",function(){var a=function(a){if(!a||!angular.isString(a)||a.length<=0)return a;for(var b,c,d,e=/<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/gi,f="",g=0;b=e.exec(a);)c=b[3]||b[4],c&&c.match(/line-height: 1.[0-9]{3,12};|color: inherit; line-height: 1.1;/i)&&(c=c.replace(/( |)font-family: inherit;|( |)line-height: 1.[0-9]{3,12};|( |)color: inherit;/gi,""),d="<"+b[1].trim(),c.trim().length>0&&(d+=" style="+b[2].substring(0,1)+c+b[2].substring(0,1)),d+=b[5].trim()+">",f+=a.substring(g,b.index)+d,g=b.index+b[0].length);return f+=a.substring(g),g>0?f.replace(/<span\s?>(.*?)<\/span>(<br(\/|)>|)/gi,"$1"):a};return a}).factory("taSanitize",["$sanitize",function(a){function b(a,b){for(var c,d=0,e=0,f=/<[^>]*>/gi;c=f.exec(a);)if(e=c.index,"/"===c[0].substr(1,1)){if(0===d)break;d--}else d++;return b+a.substring(0,e)+angular.element(b)[0].outerHTML.substring(b.length)+a.substring(e)}function c(a){if(!a||!angular.isString(a)||a.length<=0)return a;for(var d,f,g,h,i,k,l=/<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/gi,m="",n="",o=0;f=l.exec(a);){h=f[3]||f[4];var p=new RegExp(j,"i");if(angular.isString(h)&&p.test(h)){i="";for(var q=new RegExp(j,"ig");g=q.exec(h);)for(d=0;d<e.length;d++)g[2*d+2]&&(i+="<"+e[d].tag+">");k=c(a.substring(o,f.index)),n+=m.length>0?b(k,m):k,h=h.replace(new RegExp(j,"ig"),""),n+="<"+f[1].trim(),h.length>0&&(n+=' style="'+h+'"'),n+=f[5]+">",o=f.index+f[0].length,m=i}}return n+=m.length>0?b(a.substring(o),m):a.substring(o)}function d(a){if(!a||!angular.isString(a)||a.length<=0)return a;for(var b,c=/<([^>\/]+?)align=("([^"]+)"|'([^']+)')([^>]*)>/gi,d="",e=0;b=c.exec(a);){d+=a.substring(e,b.index),e=b.index+b[0].length;var f="<"+b[1]+b[5];/style=("([^"]+)"|'([^']+)')/gi.test(f)?f=f.replace(/style=("([^"]+)"|'([^']+)')/i,'style="$2$3 text-align:'+(b[3]||b[4])+';"'):f+=' style="text-align:'+(b[3]||b[4])+';"',f+=">",d+=f}return d+a.substring(e)}for(var e=[{property:"font-weight",values:["bold"],tag:"b"},{property:"font-style",values:["italic"],tag:"i"}],f=[],g=0;g<e.length;g++){for(var h="("+e[g].property+":\\s*(",i=0;i<e[g].values.length;i++)i>0&&(h+="|"),h+=e[g].values[i];h+=");)",f.push(h)}var j="("+f.join("|")+")";return function(b,e,f){if(!f)try{b=c(b)}catch(g){}b=d(b);var h;try{h=a(b),f&&(h=b)}catch(g){h=e||""}var i,j=h.match(/(<pre[^>]*>.*?<\/pre[^>]*>)/gi),k=h.replace(/(&#(9|10);)*/gi,""),l=/<pre[^>]*>.*?<\/pre[^>]*>/gi,m=0,n=0;for(h="";null!==(i=l.exec(k))&&m<j.length;)h+=k.substring(n,i.index)+j[m],n=i.index+i[0].length,m++;return h+k.substring(n)}}]).factory("taToolExecuteAction",["$q","$log",function(a,b){return function(c){void 0!==c&&(this.$editor=function(){return c});var d,e=a.defer(),f=e.promise,g=this.$editor();try{d=this.action(e,g.startAction()),f["finally"](function(){g.endAction.call(g)})}catch(h){b.error(h)}(d||void 0===d)&&e.resolve()}}]),angular.module("textAngular.DOM",["textAngular.factories"]).factory("taExecCommand",["taSelection","taBrowserTag","$document",function(a,b,c){var e=function(b,c){var d,e,f=b.find("li");for(e=f.length-1;e>=0;e--)d=angular.element("<"+c+">"+f[e].innerHTML+"</"+c+">"),b.after(d);b.remove(),a.setSelectionToElementEnd(d[0])},g=function(b){/(<br(|\/)>)$/i.test(b.innerHTML.trim())?a.setSelectionBeforeElement(angular.element(b).find("br")[0]):a.setSelectionToElementEnd(b)},h=function(a,b){var c=angular.element("<"+b+">"+a[0].innerHTML+"</"+b+">");a.after(c),a.remove(),g(c.find("li")[0])},i=function(a,c,d){for(var e="",f=0;f<a.length;f++)e+="<"+b("li")+">"+a[f].innerHTML+"</"+b("li")+">";var h=angular.element("<"+d+">"+e+"</"+d+">");c.after(h),c.remove(),g(h.find("li")[0])};return function(g,j){return g=b(g),function(k,l,m,n){var o,p,q,r,s,t,u,v=angular.element("<"+g+">");try{u=a.getSelectionElement()}catch(w){}var x=angular.element(u);if(void 0!==u){var y=u.tagName.toLowerCase();if("insertorderedlist"===k.toLowerCase()||"insertunorderedlist"===k.toLowerCase()){var z=b("insertorderedlist"===k.toLowerCase()?"ol":"ul");if(y===z)return e(x,g);if("li"===y&&x.parent()[0].tagName.toLowerCase()===z&&1===x.parent().children().length)return e(x.parent(),g);if("li"===y&&x.parent()[0].tagName.toLowerCase()!==z&&1===x.parent().children().length)return h(x.parent(),z);if(y.match(d)&&!x.hasClass("ta-bind")){if("ol"===y||"ul"===y)return h(x,z);var A=!1;return angular.forEach(x.children(),function(a){a.tagName.match(d)&&(A=!0)}),A?i(x.children(),x,z):i([angular.element("<div>"+u.innerHTML+"</div>")[0]],x,z)}if(y.match(d)){if(r=a.getOnlySelectedElements(),0===r.length)p=angular.element("<"+z+"><li>"+u.innerHTML+"</li></"+z+">"),x.html(""),x.append(p);else{if(1===r.length&&("ol"===r[0].tagName.toLowerCase()||"ul"===r[0].tagName.toLowerCase()))return r[0].tagName.toLowerCase()===z?e(angular.element(r[0]),g):h(angular.element(r[0]),z);q="";var B=[];for(o=0;o<r.length;o++)if(3!==r[o].nodeType){var C=angular.element(r[o]);if("li"===r[o].tagName.toLowerCase())continue;q+="ol"===r[o].tagName.toLowerCase()||"ul"===r[o].tagName.toLowerCase()?C[0].innerHTML:"span"!==r[o].tagName.toLowerCase()||"ol"!==r[o].childNodes[0].tagName.toLowerCase()&&"ul"!==r[o].childNodes[0].tagName.toLowerCase()?"<"+b("li")+">"+C[0].innerHTML+"</"+b("li")+">":C[0].childNodes[0].innerHTML,B.unshift(C)}p=angular.element("<"+z+">"+q+"</"+z+">"),B.pop().replaceWith(p),angular.forEach(B,function(a){a.remove()})}return void a.setSelectionToElementEnd(p[0])}}else{if("formatblock"===k.toLowerCase()){for(t=m.toLowerCase().replace(/[<>]/gi,""),"default"===t.trim()&&(t=g,m="<"+g+">"),p="li"===y?x.parent():x;!p[0].tagName||!p[0].tagName.match(d)&&!p.parent().attr("contenteditable");)p=p.parent(),y=(p[0].tagName||"").toLowerCase();if(y===t){r=p.children();var D=!1;for(o=0;o<r.length;o++)D=D||r[o].tagName.match(d);D?(p.after(r),s=p.next(),p.remove(),p=s):(v.append(p[0].childNodes),p.after(v),p.remove(),p=v)}else if(p.parent()[0].tagName.toLowerCase()!==t||p.parent().hasClass("ta-bind"))if(y.match(f))p.wrap(m);else{for(r=a.getOnlySelectedElements(),0===r.length&&(r=[p[0]]),o=0;o<r.length;o++)if(3===r[o].nodeType||!r[o].tagName.match(d))for(;3===r[o].nodeType||!r[o].tagName||!r[o].tagName.match(d);)r[o]=r[o].parentNode;if(angular.element(r[0]).hasClass("ta-bind"))p=angular.element(m),p[0].innerHTML=r[0].innerHTML,r[0].innerHTML=p[0].outerHTML;else if("blockquote"===t){for(q="",o=0;o<r.length;o++)q+=r[o].outerHTML;for(p=angular.element(m),p[0].innerHTML=q,r[0].parentNode.insertBefore(p[0],r[0]),o=r.length-1;o>=0;o--)r[o].parentNode&&r[o].parentNode.removeChild(r[o])}else for(o=0;o<r.length;o++)p=angular.element(m),p[0].innerHTML=r[o].innerHTML,r[o].parentNode.insertBefore(p[0],r[o]),r[o].parentNode.removeChild(r[o])}else{var E=p.parent(),F=E.contents();for(o=0;o<F.length;o++)E.parent().hasClass("ta-bind")&&3===F[o].nodeType&&(v=angular.element("<"+g+">"),v[0].innerHTML=F[o].outerHTML,F[o]=v[0]),E.parent()[0].insertBefore(F[o],E[0]);E.remove()}return void a.setSelectionToElementEnd(p[0])}if("createlink"===k.toLowerCase()){var G='<a href="'+m+'" target="'+(n.a.target?n.a.target:"")+'">',H="</a>",I=a.getSelection();if(I.collapsed)a.insertHtml(G+m+H,j);else if(rangy.getSelection().getRangeAt(0).canSurroundContents()){var J=angular.element(G+H)[0];rangy.getSelection().getRangeAt(0).surroundContents(J)}return}if("inserthtml"===k.toLowerCase())return void a.insertHtml(m,j)}}try{c[0].execCommand(k,l,m)}catch(w){}}}}]).service("taSelection",["$window","$document","taDOM",function(a,b,c){var e=b[0],f=a.rangy,h=function(a,b){return a.tagName&&a.tagName.match(/^br$/i)&&0===b&&!a.previousSibling?{element:a.parentNode,offset:0}:{element:a,offset:b}},i={getSelection:function(){var a=f.getSelection().getRangeAt(0),b=a.commonAncestorContainer,c={start:h(a.startContainer,a.startOffset),end:h(a.endContainer,a.endOffset),collapsed:a.collapsed};return b=3===b.nodeType?b.parentNode:b,b.parentNode===c.start.element||b.parentNode===c.end.element?c.container=b.parentNode:c.container=b,c},getOnlySelectedElements:function(){var a=f.getSelection().getRangeAt(0),b=a.commonAncestorContainer;return b=3===b.nodeType?b.parentNode:b,a.getNodes([1],function(a){return a.parentNode===b})},getSelectionElement:function(){return i.getSelection().container},setSelection:function(a,b,c){var d=f.createRange();d.setStart(a,b),d.setEnd(a,c),f.getSelection().setSingleRange(d)},setSelectionBeforeElement:function(a){var b=f.createRange();b.selectNode(a),b.collapse(!0),f.getSelection().setSingleRange(b)},setSelectionAfterElement:function(a){var b=f.createRange();b.selectNode(a),b.collapse(!1),f.getSelection().setSingleRange(b)},setSelectionToElementStart:function(a){var b=f.createRange();b.selectNodeContents(a),b.collapse(!0),f.getSelection().setSingleRange(b)},setSelectionToElementEnd:function(a){var b=f.createRange();b.selectNodeContents(a),b.collapse(!1),a.childNodes&&a.childNodes[a.childNodes.length-1]&&"br"===a.childNodes[a.childNodes.length-1].nodeName&&(b.startOffset=b.endOffset=b.startOffset-1),f.getSelection().setSingleRange(b)},insertHtml:function(a,b){var h,j,k,l,m,n,o,p=angular.element("<div>"+a+"</div>"),q=f.getSelection().getRangeAt(0),r=e.createDocumentFragment(),s=p[0].childNodes,t=!0;if(s.length>0){for(l=[],k=0;k<s.length;k++)"p"===s[k].nodeName.toLowerCase()&&""===s[k].innerHTML.trim()||3===s[k].nodeType&&""===s[k].nodeValue.trim()||(t=t&&!d.test(s[k].nodeName),l.push(s[k]));for(var u=0;u<l.length;u++)n=r.appendChild(l[u]);!t&&q.collapsed&&/^(|<br(|\/)>)$/i.test(q.startContainer.innerHTML)&&q.selectNode(q.startContainer)}else t=!0,n=r=e.createTextNode(a);if(t)q.deleteContents();else if(q.collapsed&&q.startContainer!==b)if(q.startContainer.innerHTML&&q.startContainer.innerHTML.match(/^<[^>]*>$/i))h=q.startContainer,1===q.startOffset?(q.setStartAfter(h),q.setEndAfter(h)):(q.setStartBefore(h),q.setEndBefore(h));else{if(3===q.startContainer.nodeType&&q.startContainer.parentNode!==b)for(h=q.startContainer.parentNode,j=h.cloneNode(),c.splitNodes(h.childNodes,h,j,q.startContainer,q.startOffset);!g.test(h.nodeName);){angular.element(h).after(j),h=h.parentNode;var v=j;j=h.cloneNode(),c.splitNodes(h.childNodes,h,j,v)}else h=q.startContainer,j=h.cloneNode(),c.splitNodes(h.childNodes,h,j,void 0,void 0,q.startOffset);if(angular.element(h).after(j),q.setStartAfter(h),q.setEndAfter(h),/^(|<br(|\/)>)$/i.test(h.innerHTML.trim())&&(q.setStartBefore(h),q.setEndBefore(h),angular.element(h).remove()),/^(|<br(|\/)>)$/i.test(j.innerHTML.trim())&&angular.element(j).remove(),"li"===h.nodeName.toLowerCase()){for(o=e.createDocumentFragment(),m=0;m<r.childNodes.length;m++)p=angular.element("<li>"),c.transferChildNodes(r.childNodes[m],p[0]),c.transferNodeAttributes(r.childNodes[m],p[0]),o.appendChild(p[0]);r=o,n&&(n=r.childNodes[r.childNodes.length-1],n=n.childNodes[n.childNodes.length-1])}}else q.deleteContents();q.insertNode(r),n&&i.setSelectionToElementEnd(n)}};return i}]).service("taDOM",function(){var a={getByAttribute:function(b,c){var d=[],e=b.children();return e.length&&angular.forEach(e,function(b){d=d.concat(a.getByAttribute(angular.element(b),c))}),void 0!==b.attr(c)&&d.push(b),d},transferChildNodes:function(a,b){for(b.innerHTML="";a.childNodes.length>0;)b.appendChild(a.childNodes[0]);return b},splitNodes:function(b,c,d,e,f,g){if(!e&&isNaN(g))throw new Error("taDOM.splitNodes requires a splitNode or splitIndex");for(var h=document.createDocumentFragment(),i=document.createDocumentFragment(),j=0;b.length>0&&(isNaN(g)||g!==j)&&b[0]!==e;)h.appendChild(b[0]),j++;for(!isNaN(f)&&f>=0&&b[0]&&(h.appendChild(document.createTextNode(b[0].nodeValue.substring(0,f))),b[0].nodeValue=b[0].nodeValue.substring(f));b.length>0;)i.appendChild(b[0]);a.transferChildNodes(h,c),a.transferChildNodes(i,d)},transferNodeAttributes:function(a,b){for(var c=0;c<a.attributes.length;c++)b.setAttribute(a.attributes[c].name,a.attributes[c].value);return b}};return a}),angular.module("textAngular.validators",[]).directive("taMaxText",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){var e=parseInt(a.$eval(c.taMaxText));if(isNaN(e))throw"Max text must be an integer";c.$observe("taMaxText",function(a){if(e=parseInt(a),isNaN(e))throw"Max text must be an integer";d.$dirty&&d.$validate()}),d.$validators.taMaxText=function(a){var b=angular.element("<div/>");return b.html(a),b.text().length<=e}}}}).directive("taMinText",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){var e=parseInt(a.$eval(c.taMinText));if(isNaN(e))throw"Min text must be an integer";c.$observe("taMinText",function(a){if(e=parseInt(a),isNaN(e))throw"Min text must be an integer";d.$dirty&&d.$validate()}),d.$validators.taMinText=function(a){var b=angular.element("<div/>");return b.html(a),!b.text().length||b.text().length>=e}}}}),angular.module("textAngular.taBind",["textAngular.factories","textAngular.DOM"]).service("_taBlankTest",[function(){var a=/<(a|abbr|acronym|bdi|bdo|big|cite|code|del|dfn|img|ins|kbd|label|map|mark|q|ruby|rp|rt|s|samp|time|tt|var)[^>]*(>|$)/i;return function(b){return function(c){if(!c)return!0;var d,e=/(^[^<]|>)[^<]/i.exec(c);return e?d=e.index:(c=c.toString().replace(/="[^"]*"/i,"").replace(/="[^"]*"/i,"").replace(/="[^"]*"/i,"").replace(/="[^"]*"/i,""),d=c.indexOf(">")),c=c.trim().substring(d,d+100),/^[^<>]+$/i.test(c)?!1:0===c.length||c===b||/^>(\s|&nbsp;)*<\/[^>]+>$/gi.test(c)?!0:/>\s*[^\s<]/i.test(c)||a.test(c)?!1:!0}}}]).directive("taButton",[function(){return{link:function(a,b,c){b.attr("unselectable","on"),b.on("mousedown",function(a,b){return b&&angular.extend(a,b),a.preventDefault(),!1})}}}]).directive("taBind",["taSanitize","$timeout","$window","$document","taFixChrome","taBrowserTag","taSelection","taSelectableElements","taApplyCustomRenderers","taOptions","_taBlankTest","$parse","taDOM","textAngularManager",function(a,e,f,h,k,l,m,n,o,q,r,s,t,u){return{priority:2,require:["ngModel","?ngModelOptions"],link:function(l,v,w,x){function y(a){var b;return R.forEach(function(c){if(c.keyCode===a.keyCode){var d=(a.metaKey?O:0)+(a.ctrlKey?N:0)+(a.shiftKey?Q:0)+(a.altKey?P:0);if(c.forbiddenModifiers&d)return;c.mustHaveModifiers.every(function(a){return d&a})&&(b=c.specialKey)}}),b}var z,A,B,C,D=x[0],E=x[1]||{},F=void 0!==v.attr("contenteditable")&&v.attr("contenteditable"),G=F||"textarea"===v[0].tagName.toLowerCase()||"input"===v[0].tagName.toLowerCase(),H=!1,I=!1,J=!1,K=w.taUnsafeSanitizer||q.disableSanitizer,L=/^(9|19|20|27|33|34|35|36|37|38|39|40|45|112|113|114|115|116|117|118|119|120|121|122|123|144|145)$/i,M=/^(8|13|32|46|59|61|107|109|173|186|187|188|189|190|191|192|219|220|221|222)$/i,N=1,O=2,P=4,Q=8,R=[{specialKey:"UndoKey",forbiddenModifiers:P+Q,mustHaveModifiers:[O+N],keyCode:90},{specialKey:"RedoKey",forbiddenModifiers:P,mustHaveModifiers:[O+N,Q],keyCode:90},{specialKey:"RedoKey",forbiddenModifiers:P+Q,mustHaveModifiers:[O+N],keyCode:89},{specialKey:"TabKey",forbiddenModifiers:O+Q+P+N,mustHaveModifiers:[],keyCode:9},{specialKey:"ShiftTabKey",forbiddenModifiers:O+P+N,mustHaveModifiers:[Q],keyCode:9}];void 0===w.taDefaultWrap&&(w.taDefaultWrap="p"),""===w.taDefaultWrap?(B="",C=void 0===b.ie?"<div><br></div>":b.ie>=11?"<p><br></p>":b.ie<=8?"<P>&nbsp;</P>":"<p>&nbsp;</p>"):(B=void 0===b.ie||b.ie>=11?"<"+w.taDefaultWrap+"><br></"+w.taDefaultWrap+">":b.ie<=8?"<"+w.taDefaultWrap.toUpperCase()+"></"+w.taDefaultWrap.toUpperCase()+">":"<"+w.taDefaultWrap+"></"+w.taDefaultWrap+">",C=void 0===b.ie||b.ie>=11?"<"+w.taDefaultWrap+"><br></"+w.taDefaultWrap+">":b.ie<=8?"<"+w.taDefaultWrap.toUpperCase()+">&nbsp;</"+w.taDefaultWrap.toUpperCase()+">":"<"+w.taDefaultWrap+">&nbsp;</"+w.taDefaultWrap+">"),E.$options||(E.$options={});var S=r(C),T=function(a){if(S(a))return a;var b=angular.element("<div>"+a+"</div>");if(0===b.children().length)a="<"+w.taDefaultWrap+">"+a+"</"+w.taDefaultWrap+">";else{var c,e=b[0].childNodes,f=!1;for(c=0;c<e.length&&!(f=e[c].nodeName.toLowerCase().match(d));c++);if(f)for(a="",c=0;c<e.length;c++){var g=e[c],h=g.nodeName.toLowerCase();if("#comment"===h)a+="<!--"+g.nodeValue+"-->";else if("#text"===h){var i=g.textContent;a+=i.trim()?"<"+w.taDefaultWrap+">"+i+"</"+w.taDefaultWrap+">":i}else if(h.match(d))a+=g.outerHTML;else{var j=g.outerHTML||g.nodeValue;a+=""!==j.trim()?"<"+w.taDefaultWrap+">"+j+"</"+w.taDefaultWrap+">":j}}else a="<"+w.taDefaultWrap+">"+a+"</"+w.taDefaultWrap+">"}return a};w.taPaste&&(A=s(w.taPaste)),v.addClass("ta-bind");var U;l["$undoManager"+(w.id||"")]=D.$undoManager={_stack:[],_index:0,_max:1e3,push:function(a){return"undefined"==typeof a||null===a||"undefined"!=typeof this.current()&&null!==this.current()&&a===this.current()?a:(this._index<this._stack.length-1&&(this._stack=this._stack.slice(0,this._index+1)),this._stack.push(a),U&&e.cancel(U),this._stack.length>this._max&&this._stack.shift(),this._index=this._stack.length-1,a)},undo:function(){return this.setToIndex(this._index-1)},redo:function(){return this.setToIndex(this._index+1)},setToIndex:function(a){return 0>a||a>this._stack.length-1?void 0:(this._index=a,this.current())},current:function(){return this._stack[this._index]}};var V,W=l["$undoTaBind"+(w.id||"")]=function(){if(!H&&F){var a=D.$undoManager.undo();"undefined"!=typeof a&&null!==a&&(ka(a),Z(a,!1),V&&e.cancel(V),V=e(function(){v[0].focus(),m.setSelectionToElementEnd(v[0])},1))}},X=l["$redoTaBind"+(w.id||"")]=function(){if(!H&&F){var a=D.$undoManager.redo();"undefined"!=typeof a&&null!==a&&(ka(a),Z(a,!1),V&&e.cancel(V),V=e(function(){v[0].focus(),m.setSelectionToElementEnd(v[0])},1))}},Y=function(){if(F)return v[0].innerHTML;if(G)return v.val();throw"textAngular Error: attempting to update non-editable taBind"},Z=function(a,b,c){J=c||!1,("undefined"==typeof b||null===b)&&(b=F),("undefined"==typeof a||null===a)&&(a=Y()),S(a)?(""!==D.$viewValue&&D.$setViewValue(""),b&&""!==D.$undoManager.current()&&D.$undoManager.push("")):(ja(),D.$viewValue!==a&&(D.$setViewValue(a),b&&D.$undoManager.push(a))),D.$render()};l["updateTaBind"+(w.id||"")]=function(){H||Z(void 0,void 0,!0)};var $=function(b){return D.$oldViewValue=a(k(b),D.$oldViewValue,K)};if(v.attr("required")&&(D.$validators.required=function(a,b){return!S(a||b)}),D.$parsers.push($),D.$parsers.unshift(T),D.$formatters.push($),D.$formatters.unshift(T),D.$formatters.unshift(function(a){return D.$undoManager.push(a||"")}),G)if(l.events={},F){var _=!1,aa=function(b){if(b&&b.trim().length){if(b.match(/class=["']*Mso(Normal|List)/i)||b.match(/content=["']*Word.Document/i)){var c=b.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);c=c?c[1]:b,c=c.replace(/<o:p>[\s\S]*?<\/o:p>/gi,"").replace(/class=(["']|)MsoNormal(["']|)/gi,"");var d=angular.element("<div>"+c+"</div>"),f=angular.element("<div></div>"),g={element:null,lastIndent:[],lastLi:null,isUl:!1};g.lastIndent.peek=function(){var a=this.length;return a>0?this[a-1]:void 0};for(var h=function(a){g.isUl=a,g.element=angular.element(a?"<ul>":"<ol>"),g.lastIndent=[],g.lastIndent.peek=function(){var a=this.length;return a>0?this[a-1]:void 0},g.lastLevelMatch=null},i=0;i<=d[0].childNodes.length;i++)if(d[0].childNodes[i]&&"#text"!==d[0].childNodes[i].nodeName){var j=d[0].childNodes[i].tagName.toLowerCase();if("p"===j||"h1"===j||"h2"===j||"h3"===j||"h4"===j||"h5"===j||"h6"===j){var k=angular.element(d[0].childNodes[i]),n=(k.attr("class")||"").match(/MsoList(Bullet|Number|Paragraph)(CxSp(First|Middle|Last)|)/i);if(n){if(k[0].childNodes.length<2||k[0].childNodes[1].childNodes.length<1)continue;var o="bullet"===n[1].toLowerCase()||"number"!==n[1].toLowerCase()&&!(/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(k[0].childNodes[1].innerHTML)||/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(k[0].childNodes[1].childNodes[0].innerHTML)),p=(k.attr("style")||"").match(/margin-left:([\-\.0-9]*)/i),q=parseFloat(p?p[1]:0),r=(k.attr("style")||"").match(/mso-list:l([0-9]+) level([0-9]+) lfo[0-9+]($|;)/i);if(r&&r[2]&&(q=parseInt(r[2])),r&&(!g.lastLevelMatch||r[1]!==g.lastLevelMatch[1])||!n[3]||"first"===n[3].toLowerCase()||null===g.lastIndent.peek()||g.isUl!==o&&g.lastIndent.peek()===q)h(o),f.append(g.element);else if(null!=g.lastIndent.peek()&&g.lastIndent.peek()<q)g.element=angular.element(o?"<ul>":"<ol>"),g.lastLi.append(g.element);else if(null!=g.lastIndent.peek()&&g.lastIndent.peek()>q){for(;null!=g.lastIndent.peek()&&g.lastIndent.peek()>q;)if("li"!==g.element.parent()[0].tagName.toLowerCase()){if(!/[uo]l/i.test(g.element.parent()[0].tagName.toLowerCase()))break;g.element=g.element.parent(),g.lastIndent.pop()}else g.element=g.element.parent();g.isUl="ul"===g.element[0].tagName.toLowerCase(),o!==g.isUl&&(h(o),f.append(g.element))}g.lastLevelMatch=r,q!==g.lastIndent.peek()&&g.lastIndent.push(q),g.lastLi=angular.element("<li>"),g.element.append(g.lastLi),g.lastLi.html(k.html().replace(/<!(--|)\[if !supportLists\](--|)>[\s\S]*?<!(--|)\[endif\](--|)>/gi,"")),k.remove()}else h(!1),f.append(k)}}var s=function(a){a=angular.element(a);for(var b=a[0].childNodes.length-1;b>=0;b--)a.after(a[0].childNodes[b]);a.remove()};angular.forEach(f.find("span"),function(a){a.removeAttribute("lang"),a.attributes.length<=0&&s(a)}),angular.forEach(f.find("font"),s),b=f.html()}else{if(b=b.replace(/<(|\/)meta[^>]*?>/gi,""),b.match(/<[^>]*?(ta-bind)[^>]*?>/)){if(b.match(/<[^>]*?(text-angular)[^>]*?>/)){var u=angular.element("<div>"+b+"</div>");u.find("textarea").remove();for(var w=t.getByAttribute(u,"ta-bind"),x=0;x<w.length;x++){for(var y=w[x][0].parentNode.parentNode,z=0;z<w[x][0].childNodes.length;z++)y.parentNode.insertBefore(w[x][0].childNodes[z],y);y.parentNode.removeChild(y)}b=u.html().replace('<br class="Apple-interchange-newline">',"")}}else b.match(/^<span/)&&(b.match(/<span class=(\"Apple-converted-space\"|\'Apple-converted-space\')>.<\/span>/gi)||(b=b.replace(/<(|\/)span[^>]*?>/gi,"")));b=b.replace(/<br class="Apple-interchange-newline"[^>]*?>/gi,"").replace(/<span class="Apple-converted-space">( |&nbsp;)<\/span>/gi,"&nbsp;")}/<li(\s.*)?>/i.test(b)&&/(<ul(\s.*)?>|<ol(\s.*)?>).*<li(\s.*)?>/i.test(b)===!1&&(b=b.replace(/<li(\s.*)?>.*<\/li(\s.*)?>/i,"<ul>$&</ul>")),b=b.replace(/^[ |\u00A0]+/gm,function(a){for(var b="",c=0;c<a.length;c++)b+="&nbsp;";return b}).replace(/\n|\r\n|\r/g,"<br />").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;"),A&&(b=A(l,{$html:b})||b),b=a(b,"",K),m.insertHtml(b,v[0]),e(function(){D.$setViewValue(Y()),_=!1,v.removeClass("processing-paste")},0)}else _=!1,v.removeClass("processing-paste")};v.on("paste",l.events.paste=function(a,b){if(b&&angular.extend(a,b),H||_)return a.stopPropagation(),a.preventDefault(),!1;_=!0,v.addClass("processing-paste");var c,d=(a.originalEvent||a).clipboardData;if(d&&d.getData&&d.types.length>0){for(var g="",i=0;i<d.types.length;i++)g+=" "+d.types[i];return/text\/html/i.test(g)?c=d.getData("text/html"):/text\/plain/i.test(g)&&(c=d.getData("text/plain")),aa(c),a.stopPropagation(),a.preventDefault(),!1}var j=f.rangy.saveSelection(),k=angular.element('<div class="ta-hidden-input" contenteditable="true"></div>');h.find("body").append(k),k[0].focus(),e(function(){f.rangy.restoreSelection(j),aa(k[0].innerHTML),v[0].focus(),k.remove()},0)}),v.on("cut",l.events.cut=function(a){H?a.preventDefault():e(function(){D.$setViewValue(Y())},0)}),v.on("keydown",l.events.keydown=function(a,b){b&&angular.extend(a,b),a.specialKey=y(a);var c;if(q.keyMappings.forEach(function(b){a.specialKey===b.commandKeyCode&&(a.specialKey=void 0),b.testForKey(a)&&(c=b.commandKeyCode),("UndoKey"===b.commandKeyCode||"RedoKey"===b.commandKeyCode)&&(b.enablePropagation||a.preventDefault())}),"undefined"!=typeof c&&(a.specialKey=c),"undefined"==typeof a.specialKey||"UndoKey"===a.specialKey&&"RedoKey"===a.specialKey||(a.preventDefault(),u.sendKeyCommand(l,a)),!H&&("UndoKey"===a.specialKey&&(W(),a.preventDefault()),"RedoKey"===a.specialKey&&(X(),a.preventDefault()),13===a.keyCode&&!a.shiftKey)){var d,e=function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return!0;return!1},f=m.getSelectionElement();if(!f.tagName.match(g))return;var h=angular.element(B),i=["blockquote","ul","ol"];if(e(i,f.parentNode.tagName.toLowerCase())){if(/^<br(|\/)>$/i.test(f.innerHTML.trim())&&!f.nextSibling){d=angular.element(f);var j=d.parent();j.after(h),d.remove(),0===j.children().length&&j.remove(),m.setSelectionToElementStart(h[0]),a.preventDefault()}/^<[^>]+><br(|\/)><\/[^>]+>$/i.test(f.innerHTML.trim())&&(d=angular.element(f),d.after(h),d.remove(),m.setSelectionToElementStart(h[0]),a.preventDefault())}}});var ba;if(v.on("keyup",l.events.keyup=function(a,b){if(b&&angular.extend(a,b),9===a.keyCode){var c=m.getSelection();return void(c.start.element===v[0]&&v.children().length&&m.setSelectionToElementStart(v.children()[0]))}if(U&&e.cancel(U),!H&&!L.test(a.keyCode)){if(""!==B&&13===a.keyCode&&!a.shiftKey){for(var d=m.getSelectionElement();!d.tagName.match(g)&&d!==v[0];)d=d.parentNode;if(d.tagName.toLowerCase()!==w.taDefaultWrap&&"li"!==d.tagName.toLowerCase()&&(""===d.innerHTML.trim()||"<br>"===d.innerHTML.trim())){var f=angular.element(B);angular.element(d).replaceWith(f),m.setSelectionToElementStart(f[0])}}var h=Y();""!==B&&""===h.trim()?(ka(B),m.setSelectionToElementStart(v.children()[0])):"<"!==h.substring(0,1)&&""!==w.taDefaultWrap;var i=z!==a.keyCode&&M.test(a.keyCode);ba&&e.cancel(ba),ba=e(function(){Z(h,i,!0)},E.$options.debounce||400),i||(U=e(function(){D.$undoManager.push(h)},250)),z=a.keyCode}}),v.on("blur",l.events.blur=function(){I=!1,H?(J=!0,D.$render()):Z(void 0,void 0,!0)}),w.placeholder&&(b.ie>8||void 0===b.ie)){var ca;if(!w.id)throw"textAngular Error: An unique ID is required for placeholders to work";ca=i("#"+w.id+".placeholder-text:before",'content: "'+w.placeholder+'"'),l.$on("$destroy",function(){j(ca)})}v.on("focus",l.events.focus=function(){I=!0,v.removeClass("placeholder-text"),ja()}),v.on("mouseup",l.events.mouseup=function(){var a=m.getSelection();a.start.element===v[0]&&v.children().length&&m.setSelectionToElementStart(v.children()[0])}),v.on("mousedown",l.events.mousedown=function(a,b){b&&angular.extend(a,b),a.stopPropagation()})}else{v.on("change blur",l.events.change=l.events.blur=function(){H||D.$setViewValue(Y())}),v.on("keydown",l.events.keydown=function(a,b){if(b&&angular.extend(a,b),9===a.keyCode){var c=this.selectionStart,d=this.selectionEnd,e=v.val();if(a.shiftKey){var f=e.lastIndexOf("\n",c),g=e.lastIndexOf("	",c);-1!==g&&g>=f&&(v.val(e.substring(0,g)+e.substring(g+1)),this.selectionStart=this.selectionEnd=c-1)}else v.val(e.substring(0,c)+"	"+e.substring(d)),this.selectionStart=this.selectionEnd=c+1;a.preventDefault()}});var da=function(a,b){for(var c="",d=0;b>d;d++)c+=a;return c},ea=function(a,b,c){for(var d=0;d<a.length;d++)b.call(c,d,a[d])},fa=function(a,b){var c="",d=a.childNodes;return b++,c+=da("	",b-1)+a.outerHTML.substring(0,4),ea(d,function(a,d){var e=d.nodeName.toLowerCase();return"#comment"===e?void(c+="<!--"+d.nodeValue+"-->"):"#text"===e?void(c+=d.textContent):void(d.outerHTML&&(c+="ul"===e||"ol"===e?"\n"+fa(d,b):"\n"+da("	",b)+d.outerHTML))}),c+="\n"+da("	",b-1)+a.outerHTML.substring(a.outerHTML.lastIndexOf("<"))};D.$formatters.unshift(function(a){var b=angular.element("<div>"+a+"</div>")[0].childNodes;return b.length>0&&(a="",ea(b,function(b,c){var d=c.nodeName.toLowerCase();return"#comment"===d?void(a+="<!--"+c.nodeValue+"-->"):"#text"===d?void(a+=c.textContent):void(c.outerHTML&&(a.length>0&&(a+="\n"),a+="ul"===d||"ol"===d?""+fa(c,0):""+c.outerHTML))})),a})}var ga,ha=function(a){return l.$emit("ta-element-select",this),a.preventDefault(),!1},ia=function(a,b){if(b&&angular.extend(a,b),!p&&!H){p=!0;var c;c=a.originalEvent?a.originalEvent.dataTransfer:a.dataTransfer,l.$emit("ta-drop-event",this,a,c),e(function(){p=!1,Z(void 0,void 0,!0)},100)}},ja=l["reApplyOnSelectorHandlers"+(w.id||"")]=function(){H||angular.forEach(n,function(a){v.find(a).off("click",ha).on("click",ha)})},ka=function(a){v[0].innerHTML=a},la=!1;D.$render=function(){if(!la){la=!0;var a=D.$viewValue||"";J||(F&&I&&(v.removeClass("placeholder-text"),ga&&e.cancel(ga),ga=e(function(){I||(v[0].focus(),m.setSelectionToElementEnd(v.children()[v.children().length-1])),ga=void 0},1)),F?(ka(w.placeholder?""===a?B:a:""===a?B:a),H?v.off("drop",ia):(ja(),v.on("drop",ia))):"textarea"!==v[0].tagName.toLowerCase()&&"input"!==v[0].tagName.toLowerCase()?ka(o(a)):v.val(a)),F&&w.placeholder&&(""===a?I?v.removeClass("placeholder-text"):v.addClass("placeholder-text"):v.removeClass("placeholder-text")),la=J=!1}},w.taReadonly&&(H=l.$eval(w.taReadonly),H?(v.addClass("ta-readonly"),("textarea"===v[0].tagName.toLowerCase()||"input"===v[0].tagName.toLowerCase())&&v.attr("disabled","disabled"),void 0!==v.attr("contenteditable")&&v.attr("contenteditable")&&v.removeAttr("contenteditable")):(v.removeClass("ta-readonly"),"textarea"===v[0].tagName.toLowerCase()||"input"===v[0].tagName.toLowerCase()?v.removeAttr("disabled"):F&&v.attr("contenteditable","true")),l.$watch(w.taReadonly,function(a,b){b!==a&&(a?(v.addClass("ta-readonly"),("textarea"===v[0].tagName.toLowerCase()||"input"===v[0].tagName.toLowerCase())&&v.attr("disabled","disabled"),
void 0!==v.attr("contenteditable")&&v.attr("contenteditable")&&v.removeAttr("contenteditable"),angular.forEach(n,function(a){v.find(a).on("click",ha)}),v.off("drop",ia)):(v.removeClass("ta-readonly"),"textarea"===v[0].tagName.toLowerCase()||"input"===v[0].tagName.toLowerCase()?v.removeAttr("disabled"):F&&v.attr("contenteditable","true"),angular.forEach(n,function(a){v.find(a).off("click",ha)}),v.on("drop",ia)),H=a)})),F&&!H&&(angular.forEach(n,function(a){v.find(a).on("click",ha)}),v.on("drop",ia),v.on("blur",function(){b.webkit&&(c=!0)}))}}}]);var p=!1,q=angular.module("textAngular",["ngSanitize","textAngularSetup","textAngular.factories","textAngular.DOM","textAngular.validators","textAngular.taBind"]);q.config([function(){angular.forEach(e,function(a,b){delete e[b]})}]),q.run([function(){if("function"==typeof define&&define.amd)define(function(a){window.rangy=a("rangy"),window.rangy.saveSelection=a("rangy/lib/rangy-selectionsaverestore")});else if("function"==typeof require&&"undefined"!=typeof module&&"object"==typeof a)window.rangy=require("rangy"),window.rangy.saveSelection=require("rangy/lib/rangy-selectionsaverestore");else{if(!window.rangy)throw"rangy-core.js and rangy-selectionsaverestore.js are required for textAngular to work correctly, rangy-core is not yet loaded.";if(window.rangy.init(),!window.rangy.saveSelection)throw"rangy-selectionsaverestore.js is required for textAngular to work correctly."}}]),q.directive("textAngular",["$compile","$timeout","taOptions","taSelection","taExecCommand","textAngularManager","$window","$document","$animate","$log","$q","$parse",function(a,b,c,d,e,f,g,h,i,j,k,l){return{require:"?ngModel",scope:{},restrict:"EA",priority:2,link:function(m,n,o,p){var q,r,s,t,u,v,w,x,y,z,A,B=o.serial?o.serial:Math.floor(1e16*Math.random());m._name=o.name?o.name:"textAngularEditor"+B;var C=function(a,c,d){b(function(){var b=function(){a.off(c,b),d.apply(this,arguments)};a.on(c,b)},100)};if(y=e(o.taDefaultWrap),angular.extend(m,angular.copy(c),{wrapSelection:function(a,b,c){"undo"===a.toLowerCase()?m["$undoTaBindtaTextElement"+B]():"redo"===a.toLowerCase()?m["$redoTaBindtaTextElement"+B]():(y(a,!1,b,m.defaultTagAttributes),c&&m["reApplyOnSelectorHandlerstaTextElement"+B](),m.displayElements.text[0].focus())},showHtml:m.$eval(o.taShowHtml)||!1}),o.taFocussedClass&&(m.classes.focussed=o.taFocussedClass),o.taTextEditorClass&&(m.classes.textEditor=o.taTextEditorClass),o.taHtmlEditorClass&&(m.classes.htmlEditor=o.taHtmlEditorClass),o.taDefaultTagAttributes)try{angular.extend(m.defaultTagAttributes,angular.fromJson(o.taDefaultTagAttributes))}catch(D){j.error(D)}o.taTextEditorSetup&&(m.setup.textEditorSetup=m.$parent.$eval(o.taTextEditorSetup)),o.taHtmlEditorSetup&&(m.setup.htmlEditorSetup=m.$parent.$eval(o.taHtmlEditorSetup)),o.taFileDrop?m.fileDropHandler=m.$parent.$eval(o.taFileDrop):m.fileDropHandler=m.defaultFileDropHandler,w=n[0].innerHTML,n[0].innerHTML="",m.displayElements={forminput:angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),html:angular.element("<textarea></textarea>"),text:angular.element("<div></div>"),scrollWindow:angular.element("<div class='ta-scroll-window'></div>"),popover:angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"></div>'),popoverArrow:angular.element('<div class="arrow"></div>'),popoverContainer:angular.element('<div class="popover-content"></div>'),resize:{overlay:angular.element('<div class="ta-resizer-handle-overlay"></div>'),background:angular.element('<div class="ta-resizer-handle-background"></div>'),anchors:[angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')],info:angular.element('<div class="ta-resizer-handle-info"></div>')}},m.displayElements.popover.append(m.displayElements.popoverArrow),m.displayElements.popover.append(m.displayElements.popoverContainer),m.displayElements.scrollWindow.append(m.displayElements.popover),m.displayElements.popover.on("mousedown",function(a,b){return b&&angular.extend(a,b),a.preventDefault(),!1}),m.showPopover=function(a){m.displayElements.popover.css("display","block"),m.reflowPopover(a),i.addClass(m.displayElements.popover,"in"),C(h.find("body"),"click keyup",function(){m.hidePopover()})},m.reflowPopover=function(a){m.displayElements.text[0].offsetHeight-51>a[0].offsetTop?(m.displayElements.popover.css("top",a[0].offsetTop+a[0].offsetHeight+m.displayElements.scrollWindow[0].scrollTop+"px"),m.displayElements.popover.removeClass("top").addClass("bottom")):(m.displayElements.popover.css("top",a[0].offsetTop-54+m.displayElements.scrollWindow[0].scrollTop+"px"),m.displayElements.popover.removeClass("bottom").addClass("top"));var b=m.displayElements.text[0].offsetWidth-m.displayElements.popover[0].offsetWidth,c=a[0].offsetLeft+a[0].offsetWidth/2-m.displayElements.popover[0].offsetWidth/2;m.displayElements.popover.css("left",Math.max(0,Math.min(b,c))+"px"),m.displayElements.popoverArrow.css("margin-left",Math.min(c,Math.max(0,c-b))-11+"px")},m.hidePopover=function(){m.displayElements.popover.css("display",""),m.displayElements.popoverContainer.attr("style",""),m.displayElements.popoverContainer.attr("class","popover-content"),m.displayElements.popover.removeClass("in")},m.displayElements.resize.overlay.append(m.displayElements.resize.background),angular.forEach(m.displayElements.resize.anchors,function(a){m.displayElements.resize.overlay.append(a)}),m.displayElements.resize.overlay.append(m.displayElements.resize.info),m.displayElements.scrollWindow.append(m.displayElements.resize.overlay),m.reflowResizeOverlay=function(a){a=angular.element(a)[0],m.displayElements.resize.overlay.css({display:"block",left:a.offsetLeft-5+"px",top:a.offsetTop-5+"px",width:a.offsetWidth+10+"px",height:a.offsetHeight+10+"px"}),m.displayElements.resize.info.text(a.offsetWidth+" x "+a.offsetHeight)},m.showResizeOverlay=function(a){var b=h.find("body");z=function(c){var d={width:parseInt(a.attr("width")),height:parseInt(a.attr("height")),x:c.clientX,y:c.clientY};(void 0===d.width||isNaN(d.width))&&(d.width=a[0].offsetWidth),(void 0===d.height||isNaN(d.height))&&(d.height=a[0].offsetHeight),m.hidePopover();var e=d.height/d.width,f=function(b){function c(a){return Math.round(Math.max(0,a))}var f={x:Math.max(0,d.width+(b.clientX-d.x)),y:Math.max(0,d.height+(b.clientY-d.y))},g=void 0!==o.taResizeForceAspectRatio,h=o.taResizeMaintainAspectRatio,i=g||h&&!b.shiftKey;if(i){var j=f.y/f.x;f.x=e>j?f.x:f.y/e,f.y=e>j?f.x*e:f.y}var k=angular.element(a);k.css("height",c(f.y)+"px"),k.css("width",c(f.x)+"px"),m.reflowResizeOverlay(a)};b.on("mousemove",f),C(b,"mouseup",function(a){a.preventDefault(),a.stopPropagation(),b.off("mousemove",f),m.$apply(function(){m.hidePopover(),m.updateTaBindtaTextElement()},100)}),c.stopPropagation(),c.preventDefault()},m.displayElements.resize.anchors[3].off("mousedown"),m.displayElements.resize.anchors[3].on("mousedown",z),m.reflowResizeOverlay(a),C(b,"click",function(){m.hideResizeOverlay()})},m.hideResizeOverlay=function(){m.displayElements.resize.anchors[3].off("mousedown",z),m.displayElements.resize.overlay.css("display","")},m.setup.htmlEditorSetup(m.displayElements.html),m.setup.textEditorSetup(m.displayElements.text),m.displayElements.html.attr({id:"taHtmlElement"+B,"ng-show":"showHtml","ta-bind":"ta-bind","ng-model":"html","ng-model-options":n.attr("ng-model-options")}),m.displayElements.text.attr({id:"taTextElement"+B,contentEditable:"true","ta-bind":"ta-bind","ng-model":"html","ng-model-options":n.attr("ng-model-options")}),m.displayElements.scrollWindow.attr({"ng-hide":"showHtml"}),o.taDefaultWrap&&m.displayElements.text.attr("ta-default-wrap",o.taDefaultWrap),o.taUnsafeSanitizer&&(m.displayElements.text.attr("ta-unsafe-sanitizer",o.taUnsafeSanitizer),m.displayElements.html.attr("ta-unsafe-sanitizer",o.taUnsafeSanitizer)),m.displayElements.scrollWindow.append(m.displayElements.text),n.append(m.displayElements.scrollWindow),n.append(m.displayElements.html),m.displayElements.forminput.attr("name",m._name),n.append(m.displayElements.forminput),o.tabindex&&(n.removeAttr("tabindex"),m.displayElements.text.attr("tabindex",o.tabindex),m.displayElements.html.attr("tabindex",o.tabindex)),o.placeholder&&(m.displayElements.text.attr("placeholder",o.placeholder),m.displayElements.html.attr("placeholder",o.placeholder)),o.taDisabled&&(m.displayElements.text.attr("ta-readonly","disabled"),m.displayElements.html.attr("ta-readonly","disabled"),m.disabled=m.$parent.$eval(o.taDisabled),m.$parent.$watch(o.taDisabled,function(a){m.disabled=a,m.disabled?n.addClass(m.classes.disabled):n.removeClass(m.classes.disabled)})),o.taPaste&&(m._pasteHandler=function(a){return l(o.taPaste)(m.$parent,{$html:a})},m.displayElements.text.attr("ta-paste","_pasteHandler($html)")),a(m.displayElements.scrollWindow)(m),a(m.displayElements.html)(m),m.updateTaBindtaTextElement=m["updateTaBindtaTextElement"+B],m.updateTaBindtaHtmlElement=m["updateTaBindtaHtmlElement"+B],n.addClass("ta-root"),m.displayElements.scrollWindow.addClass("ta-text ta-editor "+m.classes.textEditor),m.displayElements.html.addClass("ta-html ta-editor "+m.classes.htmlEditor),m._actionRunning=!1;var E=!1;if(m.startAction=function(){return m._actionRunning=!0,E=g.rangy.saveSelection(),function(){E&&g.rangy.restoreSelection(E)}},m.endAction=function(){m._actionRunning=!1,E&&(m.showHtml?m.displayElements.html[0].focus():m.displayElements.text[0].focus(),g.rangy.removeMarkers(E)),E=!1,m.updateSelectedStyles(),m.showHtml||m["updateTaBindtaTextElement"+B]()},u=function(){m.focussed=!0,n.addClass(m.classes.focussed),x.focus(),n.triggerHandler("focus")},m.displayElements.html.on("focus",u),m.displayElements.text.on("focus",u),v=function(a){return m._actionRunning||h[0].activeElement===m.displayElements.html[0]||h[0].activeElement===m.displayElements.text[0]||(n.removeClass(m.classes.focussed),x.unfocus(),b(function(){m._bUpdateSelectedStyles=!1,n.triggerHandler("blur"),m.focussed=!1},0)),a.preventDefault(),!1},m.displayElements.html.on("blur",v),m.displayElements.text.on("blur",v),m.displayElements.text.on("paste",function(a){n.triggerHandler("paste",a)}),m.queryFormatBlockState=function(a){return!m.showHtml&&a.toLowerCase()===h[0].queryCommandValue("formatBlock").toLowerCase()},m.queryCommandState=function(a){return m.showHtml?"":h[0].queryCommandState(a)},m.switchView=function(){m.showHtml=!m.showHtml,i.enabled(!1,m.displayElements.html),i.enabled(!1,m.displayElements.text),m.showHtml?b(function(){return i.enabled(!0,m.displayElements.html),i.enabled(!0,m.displayElements.text),m.displayElements.html[0].focus()},100):b(function(){return i.enabled(!0,m.displayElements.html),i.enabled(!0,m.displayElements.text),m.displayElements.text[0].focus()},100)},o.ngModel){var F=!0;p.$render=function(){if(F){F=!1;var a=m.$parent.$eval(o.ngModel);void 0!==a&&null!==a||!w||""===w||p.$setViewValue(w)}m.displayElements.forminput.val(p.$viewValue),m.html=p.$viewValue||""},n.attr("required")&&(p.$validators.required=function(a,b){var c=a||b;return!(!c||""===c.trim())})}else m.displayElements.forminput.val(w),m.html=w;if(m.$watch("html",function(a,b){a!==b&&(o.ngModel&&p.$viewValue!==a&&p.$setViewValue(a),m.displayElements.forminput.val(a))}),o.taTargetToolbars)x=f.registerEditor(m._name,m,o.taTargetToolbars.split(","));else{var G=angular.element('<div text-angular-toolbar name="textAngularToolbar'+B+'">');o.taToolbar&&G.attr("ta-toolbar",o.taToolbar),o.taToolbarClass&&G.attr("ta-toolbar-class",o.taToolbarClass),o.taToolbarGroupClass&&G.attr("ta-toolbar-group-class",o.taToolbarGroupClass),o.taToolbarButtonClass&&G.attr("ta-toolbar-button-class",o.taToolbarButtonClass),o.taToolbarActiveButtonClass&&G.attr("ta-toolbar-active-button-class",o.taToolbarActiveButtonClass),o.taFocussedClass&&G.attr("ta-focussed-class",o.taFocussedClass),n.prepend(G),a(G)(m.$parent),x=f.registerEditor(m._name,m,["textAngularToolbar"+B])}m.$on("$destroy",function(){f.unregisterEditor(m._name),angular.element(window).off("blur")}),m.$on("ta-element-select",function(a,b){x.triggerElementSelect(a,b)&&m["reApplyOnSelectorHandlerstaTextElement"+B]()}),m.$on("ta-drop-event",function(a,c,d,e){m.displayElements.text[0].focus(),e&&e.files&&e.files.length>0?(angular.forEach(e.files,function(a){try{k.when(m.fileDropHandler(a,m.wrapSelection)||m.fileDropHandler!==m.defaultFileDropHandler&&k.when(m.defaultFileDropHandler(a,m.wrapSelection))).then(function(){m["updateTaBindtaTextElement"+B]()})}catch(b){j.error(b)}}),d.preventDefault(),d.stopPropagation()):b(function(){m["updateTaBindtaTextElement"+B]()},0)}),m._bUpdateSelectedStyles=!1,angular.element(window).on("blur",function(){m._bUpdateSelectedStyles=!1,m.focussed=!1}),m.updateSelectedStyles=function(){var a;A&&b.cancel(A),void 0!==(a=d.getSelectionElement())&&a.parentNode!==m.displayElements.text[0]?x.updateSelectedStyles(angular.element(a)):x.updateSelectedStyles(),m._bUpdateSelectedStyles&&(A=b(m.updateSelectedStyles,200))},q=function(){return m.focussed?void(m._bUpdateSelectedStyles||(m._bUpdateSelectedStyles=!0,m.$apply(function(){m.updateSelectedStyles()}))):void(m._bUpdateSelectedStyles=!1)},m.displayElements.html.on("keydown",q),m.displayElements.text.on("keydown",q),r=function(){m._bUpdateSelectedStyles=!1},m.displayElements.html.on("keyup",r),m.displayElements.text.on("keyup",r),s=function(a,b){b&&angular.extend(a,b),m.$apply(function(){return x.sendKeyCommand(a)?(m._bUpdateSelectedStyles||m.updateSelectedStyles(),a.preventDefault(),!1):void 0})},m.displayElements.html.on("keypress",s),m.displayElements.text.on("keypress",s),t=function(){m._bUpdateSelectedStyles=!1,m.$apply(function(){m.updateSelectedStyles()})},m.displayElements.html.on("mouseup",t),m.displayElements.text.on("mouseup",t)}}}]),q.service("textAngularManager",["taToolExecuteAction","taTools","taRegisterTool",function(a,b,c){var d={},e={};return{registerEditor:function(c,f,g){if(!c||""===c)throw"textAngular Error: An editor requires a name";if(!f)throw"textAngular Error: An editor requires a scope";if(e[c])throw'textAngular Error: An Editor with name "'+c+'" already exists';var h=[];return angular.forEach(g,function(a){d[a]&&h.push(d[a])}),e[c]={scope:f,toolbars:g,_registerToolbar:function(a){this.toolbars.indexOf(a.name)>=0&&h.push(a)},editorFunctions:{disable:function(){angular.forEach(h,function(a){a.disabled=!0})},enable:function(){angular.forEach(h,function(a){a.disabled=!1})},focus:function(){angular.forEach(h,function(a){a._parent=f,a.disabled=!1,a.focussed=!0,f.focussed=!0})},unfocus:function(){angular.forEach(h,function(a){a.disabled=!0,a.focussed=!1}),f.focussed=!1},updateSelectedStyles:function(a){angular.forEach(h,function(b){angular.forEach(b.tools,function(c){c.activeState&&(b._parent=f,c.active=c.activeState(a))})})},sendKeyCommand:function(c){var d=!1;return(c.ctrlKey||c.metaKey||c.specialKey)&&angular.forEach(b,function(b,e){if(b.commandKeyCode&&(b.commandKeyCode===c.which||b.commandKeyCode===c.specialKey))for(var g=0;g<h.length;g++)if(void 0!==h[g].tools[e]){a.call(h[g].tools[e],f),d=!0;break}}),d},triggerElementSelect:function(a,c){var d=function(a,b){for(var c=!0,d=0;d<b.length;d++)c=c&&a.attr(b[d]);return c},e=[],g={},i=!1;c=angular.element(c);var j=!1;if(angular.forEach(b,function(a,b){a.onElementSelect&&a.onElementSelect.element&&a.onElementSelect.element.toLowerCase()===c[0].tagName.toLowerCase()&&(!a.onElementSelect.filter||a.onElementSelect.filter(c))&&(j=j||angular.isArray(a.onElementSelect.onlyWithAttrs)&&d(c,a.onElementSelect.onlyWithAttrs),(!a.onElementSelect.onlyWithAttrs||d(c,a.onElementSelect.onlyWithAttrs))&&(g[b]=a))}),j?(angular.forEach(g,function(a,b){a.onElementSelect.onlyWithAttrs&&d(c,a.onElementSelect.onlyWithAttrs)&&e.push({name:b,tool:a})}),e.sort(function(a,b){return b.tool.onElementSelect.onlyWithAttrs.length-a.tool.onElementSelect.onlyWithAttrs.length})):angular.forEach(g,function(a,b){e.push({name:b,tool:a})}),e.length>0)for(var k=0;k<e.length;k++){for(var l=e[k].tool,m=e[k].name,n=0;n<h.length;n++)if(void 0!==h[n].tools[m]){l.onElementSelect.action.call(h[n].tools[m],a,c,f),i=!0;break}if(i)break}return i}}},e[c].editorFunctions},retrieveEditor:function(a){return e[a]},unregisterEditor:function(a){delete e[a]},registerToolbar:function(a){if(!a)throw"textAngular Error: A toolbar requires a scope";if(!a.name||""===a.name)throw"textAngular Error: A toolbar requires a name";if(d[a.name])throw'textAngular Error: A toolbar with name "'+a.name+'" already exists';d[a.name]=a,angular.forEach(e,function(b){b._registerToolbar(a)})},retrieveToolbar:function(a){return d[a]},retrieveToolbarsViaEditor:function(a){var b=[],c=this;return angular.forEach(this.retrieveEditor(a).toolbars,function(a){b.push(c.retrieveToolbar(a))}),b},unregisterToolbar:function(a){delete d[a]},updateToolsDisplay:function(a){var b=this;angular.forEach(a,function(a,c){b.updateToolDisplay(c,a)})},resetToolsDisplay:function(){var a=this;angular.forEach(b,function(b,c){a.resetToolDisplay(c)})},updateToolDisplay:function(a,b){var c=this;angular.forEach(d,function(d,e){c.updateToolbarToolDisplay(e,a,b)})},resetToolDisplay:function(a){var b=this;angular.forEach(d,function(c,d){b.resetToolbarToolDisplay(d,a)})},updateToolbarToolDisplay:function(a,b,c){if(!d[a])throw'textAngular Error: No Toolbar with name "'+a+'" exists';d[a].updateToolDisplay(b,c)},resetToolbarToolDisplay:function(a,c){if(!d[a])throw'textAngular Error: No Toolbar with name "'+a+'" exists';d[a].updateToolDisplay(c,b[c],!0)},removeTool:function(a){delete b[a],angular.forEach(d,function(b){delete b.tools[a];for(var c=0;c<b.toolbar.length;c++){for(var d,e=0;e<b.toolbar[c].length;e++){if(b.toolbar[c][e]===a){d={group:c,index:e};break}if(void 0!==d)break}void 0!==d&&(b.toolbar[d.group].slice(d.index,1),b._$element.children().eq(d.group).children().eq(d.index).remove())}})},addTool:function(a,b,e,f){c(a,b),angular.forEach(d,function(c){c.addTool(a,b,e,f)})},addToolToToolbar:function(a,b,e,f,g){c(a,b),d[e].addTool(a,b,f,g)},refreshEditor:function(a){if(!e[a])throw'textAngular Error: No Editor with name "'+a+'" exists';e[a].scope.updateTaBindtaTextElement(),e[a].scope.$$phase||e[a].scope.$digest()},sendKeyCommand:function(a,b){var c=e[a._name];return c&&c.editorFunctions.sendKeyCommand(b)?(a._bUpdateSelectedStyles||a.updateSelectedStyles(),b.preventDefault(),!1):void 0}}}]),q.directive("textAngularToolbar",["$compile","textAngularManager","taOptions","taTools","taToolExecuteAction","$window",function(a,b,c,d,e,f){return{scope:{name:"@"},restrict:"EA",link:function(g,h,i){if(!g.name||""===g.name)throw"textAngular Error: A toolbar requires a name";angular.extend(g,angular.copy(c)),i.taToolbar&&(g.toolbar=g.$parent.$eval(i.taToolbar)),i.taToolbarClass&&(g.classes.toolbar=i.taToolbarClass),i.taToolbarGroupClass&&(g.classes.toolbarGroup=i.taToolbarGroupClass),i.taToolbarButtonClass&&(g.classes.toolbarButton=i.taToolbarButtonClass),i.taToolbarActiveButtonClass&&(g.classes.toolbarButtonActive=i.taToolbarActiveButtonClass),i.taFocussedClass&&(g.classes.focussed=i.taFocussedClass),g.disabled=!0,g.focussed=!1,g._$element=h,h[0].innerHTML="",h.addClass("ta-toolbar "+g.classes.toolbar),g.$watch("focussed",function(){g.focussed?h.addClass(g.classes.focussed):h.removeClass(g.classes.focussed)});var j=function(b,c){var d;if(d=b&&b.display?angular.element(b.display):angular.element("<button type='button'>"),b&&b["class"]?d.addClass(b["class"]):d.addClass(g.classes.toolbarButton),d.attr("name",c.name),d.attr("ta-button","ta-button"),d.attr("ng-disabled","isDisabled()"),d.attr("tabindex","-1"),d.attr("ng-click","executeAction()"),d.attr("ng-class","displayActiveToolClass(active)"),b&&b.tooltiptext&&d.attr("title",b.tooltiptext),b&&!b.display&&!c._display&&(d[0].innerHTML="",b.buttontext&&(d[0].innerHTML=b.buttontext),b.iconclass)){var e=angular.element("<i>"),f=d[0].innerHTML;e.addClass(b.iconclass),d[0].innerHTML="",d.append(e),f&&""!==f&&d.append("&nbsp;"+f)}return c._lastToolDefinition=angular.copy(b),a(d)(c)};g.tools={},g._parent={disabled:!0,showHtml:!1,queryFormatBlockState:function(){return!1},queryCommandState:function(){return!1}};var k={$window:f,$editor:function(){return g._parent},isDisabled:function(){return"function"!=typeof this.$eval("disabled")&&this.$eval("disabled")||this.$eval("disabled()")||"html"!==this.name&&this.$editor().showHtml||this.$parent.disabled||this.$editor().disabled},displayActiveToolClass:function(a){return a?g.classes.toolbarButtonActive:""},executeAction:e};angular.forEach(g.toolbar,function(a){var b=angular.element("<div>");b.addClass(g.classes.toolbarGroup),angular.forEach(a,function(a){g.tools[a]=angular.extend(g.$new(!0),d[a],k,{name:a}),g.tools[a].$element=j(d[a],g.tools[a]),b.append(g.tools[a].$element)}),h.append(b)}),g.updateToolDisplay=function(a,b,c){var d=g.tools[a];if(d){if(d._lastToolDefinition&&!c&&(b=angular.extend({},d._lastToolDefinition,b)),null===b.buttontext&&null===b.iconclass&&null===b.display)throw'textAngular Error: Tool Definition for updating "'+a+'" does not have a valid display/iconclass/buttontext value';null===b.buttontext&&delete b.buttontext,null===b.iconclass&&delete b.iconclass,null===b.display&&delete b.display;var e=j(b,d);d.$element.replaceWith(e),d.$element=e}},g.addTool=function(a,b,c,e){g.tools[a]=angular.extend(g.$new(!0),d[a],k,{name:a}),g.tools[a].$element=j(d[a],g.tools[a]);var f;void 0===c&&(c=g.toolbar.length-1),f=angular.element(h.children()[c]),void 0===e?(f.append(g.tools[a].$element),g.toolbar[c][g.toolbar[c].length-1]=a):(f.children().eq(e).after(g.tools[a].$element),g.toolbar[c][e]=a)},b.registerToolbar(g),g.$on("$destroy",function(){b.unregisterToolbar(g.name)})}}}])}()}({},function(){return this}());
angular.module('pageslide-directive', [])

.directive('pageslide', ['$document', '$timeout',
    function ($document, $timeout) {
        var defaults = {};
        return {
            restrict: 'EAC',
            transclude: false,
            scope: {
                psOpen: '=?',
                psAutoClose: '=?',
                psSide: '@',
                psSpeed: '@',
                psClass: '@',
                psSize: '@',
                psSqueeze: '@',
                psCloak: '@',
                psPush: '@',
                psContainer: '@',
                psKeyListener: '@',
                psBodyClass: '@'
            },
            link: function ($scope, el, attrs) {

                /* Inspect */

                //console.log($scope);
                //console.log(el);
                //console.log(attrs);

                var param = {};

                param.side = $scope.psSide || 'right';
                param.speed = $scope.psSpeed || '0.5';
                param.size = $scope.psSize || '300px';
                param.zindex = 1000; // Override with custom CSS
                param.className = $scope.psClass || 'ng-pageslide';
                param.cloak = $scope.psCloak && $scope.psCloak.toLowerCase() == 'false' ? false : true;
                param.squeeze = Boolean($scope.psSqueeze) || false;
                param.push = Boolean($scope.psPush) || false;
                param.container = $scope.psContainer || false;
                param.keyListener = Boolean($scope.psKeyListener) || false;
                param.bodyClass = $scope.psBodyClass || false;

                param.className=param.className.split(' ')
                param.className.forEach(function (cl) {
                    el.addClass(cl);
                })
                //el.addClass(param.className);

                /* DOM manipulation */

                var content = null;
                var slider = null;
                var body = param.container ? document.getElementById(param.container) : document.body;

                // TODO verify that we are meaning to use the param.className and not the param.bodyClass
                var scrolled=0;
                function setBodyClass(value){
                    //console.log('value',value)
                    /*if(value=='open'){
                        angular.element($document[0].body).css('overflow-y','hidden')
                        if(iPhone){
                            scrolled = window.pageYOffset || document.documentElement.scrollTop;
                            angular.element($document[0].body).css('position','fixed')
                            angular.element($document[0].body).css('top',-(scrolled+16))
                        }
                    }else if(value=='closed'){
                        angular.element($document[0].body).css('overflow-y','scroll')
                        if(iPhone){
                            angular.element($document[0].body).css('position','static');
                            window.scrollTo( 0, scrolled );
                        }
                    }*/

                    if (param.bodyClass) {
                        var bodyClass = param.className[param.className.length-1] + '-body';
                        var bodyClassRe = new RegExp(' ' + bodyClass + '-closed| ' + bodyClass + '-open'+'|' + bodyClass + '-closed|' + bodyClass + '-open'+'/g');
                        //console.log(bodyClassRe)
                        body.className = body.className.replace(bodyClassRe, '');
                        if(!body.className){
                            body.className += ' ' + bodyClass + '-' + value;
                        }else if(body.className.indexOf(bodyClass + '-' + value)<0){
                            body.className += ' ' + bodyClass + '-' + value;
                        }

                    }
                    //console.log('body.className',body.className)
                }

                setBodyClass('closed');

                slider = el[0];

                // Check for div tag
                if (slider.tagName.toLowerCase() !== 'div' &&
                    slider.tagName.toLowerCase() !== 'pageslide')
                    throw new Error('Pageslide can only be applied to <div> or <pageslide> elements');

                // Check for content
                if (slider.children.length === 0)
                    throw new Error('You have to content inside the <pageslide>');

                content = angular.element(slider.children);

                /* Append */
                body.appendChild(slider);

                /* Style setup */
                slider.style.zIndex = param.zindex;
                slider.style.position = param.container !== false ? 'absolute' : 'fixed';
                slider.style.width = 0;
                slider.style.height = 0;
                slider.style.overflow = 'auto';
                slider.style.transitionDuration = param.speed + 's';
                slider.style.webkitTransitionDuration = param.speed + 's';
                slider.style.transitionProperty = 'width, height';

                if (param.squeeze) {
                    body.style.position = 'absolute';
                    body.style.transitionDuration = param.speed + 's';
                    body.style.webkitTransitionDuration = param.speed + 's';
                    body.style.transitionProperty = 'top, bottom, left, right';
                }

                switch (param.side) {
                    case 'right':
                        slider.style.height = attrs.psCustomHeight || '100%';
                        slider.style.top = attrs.psCustomTop || '0px';
                        slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                    case 'left':
                        slider.style.height = attrs.psCustomHeight || '100%';
                        slider.style.top = attrs.psCustomTop || '0px';
                        slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        break;
                    case 'top':
                        slider.style.width = attrs.psCustomWidth || '100%';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        slider.style.top = attrs.psCustomTop || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                    case 'bottom':
                        slider.style.width = attrs.psCustomWidth || '100%';
                        slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                }


                /* Closed */
                function psClose(slider, param) {
                    if (slider && slider.style.width !== 0) {
                        if (param.cloak) content.css('display', 'none');
                        switch (param.side) {
                            case 'right':
                                slider.style.width = '0px';
                                if (param.squeeze) body.style.right = '0px';
                                if (param.push) {
                                    body.style.right = '0px';
                                    body.style.left = '0px';
                                }
                                break;
                            case 'left':
                                slider.style.width = '0px';
                                if (param.squeeze) body.style.left = '0px';
                                if (param.push) {
                                    body.style.left = '0px';
                                    body.style.right = '0px';
                                }
                                break;
                            case 'top':
                                slider.style.height = '0px';
                                if (param.squeeze) body.style.top = '0px';
                                if (param.push) {
                                    body.style.top = '0px';
                                    body.style.bottom = '0px';
                                }
                                break;
                            case 'bottom':
                                slider.style.height = '0px';
                                if (param.squeeze) body.style.bottom = '0px';
                                if (param.push) {
                                    body.style.bottom = '0px';
                                    body.style.top = '0px';
                                }
                                break;
                        }
                    }
                    $scope.psOpen = false;

                    if (param.keyListener) {
                        $document.off('keydown', keyListener);
                    }

                    setBodyClass('closed');
                }

                /* Open */
                function psOpen(slider, param) {
                    if (slider.style.width !== 0) {
                        switch (param.side) {
                            case 'right':
                                slider.style.width = param.size;
                                if (param.squeeze) body.style.right = param.size;
                                if (param.push) {
                                    body.style.right = param.size;
                                    body.style.left = '-' + param.size;
                                }
                                break;
                            case 'left':
                                slider.style.width = param.size;
                                if (param.squeeze) body.style.left = param.size;
                                if (param.push) {
                                    body.style.left = param.size;
                                    body.style.right = '-' + param.size;
                                }
                                break;
                            case 'top':
                                slider.style.height = param.size;
                                if (param.squeeze) body.style.top = param.size;
                                if (param.push) {
                                    body.style.top = param.size;
                                    body.style.bottom = '-' + param.size;
                                }
                                break;
                            case 'bottom':
                                slider.style.height = param.size;
                                if (param.squeeze) body.style.bottom = param.size;
                                if (param.push) {
                                    body.style.bottom = param.size;
                                    body.style.top = '-' + param.size;
                                }
                                break;
                        }

                        $timeout(function() {
                            if (param.cloak) content.css('display', 'block');
                        }, (param.speed * 1000));

                        $scope.psOpen = true;

                        if (param.keyListener) {
                            $document.on('keydown', keyListener);
                        }

                        setBodyClass('open');
                    }
                }

                function isFunction(functionToCheck) {
                    var getType = {};
                    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
                }

                /*
                * Close the sidebar if the 'esc' key is pressed
                * */

                function keyListener(e) {
                    var ESC_KEY = 27;
                    var key = e.keyCode || e.which;

                    if (key === ESC_KEY) {
                        psClose(slider, param);
                    }
                }

                /*
                * Watchers
                * */

                $scope.$watch('psOpen', function(value) {
                    if (!!value) {
                        psOpen(slider, param);
                    } else {
                        psClose(slider, param);
                    }
                });

                $scope.$watch('psSize', function(newValue, oldValue) {
                    if (oldValue !== newValue) {
                        param.size = newValue;
                        psOpen(slider, param);
                    }
                });

                /*
                * Events
                * */

                $scope.$on('$destroy', function () {
                    body.removeChild(slider);
                });

                if ($scope.psAutoClose) {
                    $scope.$on('$locationChangeStart', function() {
                        psClose(slider, param);
                    });
                    $scope.$on('$stateChangeStart', function() {
                        psClose(slider, param);
                    });

                }
            }
        };
    }
]);

/*global angular, navigator*/

(function() {
    'use strict';

    angular
        .module('angular-click-outside', [])
        .directive('clickOutside', [
            '$document', '$parse', '$timeout',
            clickOutside
        ]);
    
    /**
     * @ngdoc directive
     * @name angular-click-outside.directive:clickOutside
     * @description Directive to add click outside capabilities to DOM elements
     * @requires $document
     * @requires $parse
     * @requires $timeout
     **/
    function clickOutside($document, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function($scope, elem, attr) {

                // postpone linking to next digest to allow for unique id generation
                $timeout(function() {
                    var classList = (attr.outsideIfNot !== undefined) ? attr.outsideIfNot.split(/[ ,]+/) : [],
                        fn;

                    function eventHandler(e) {
                        /*console.log(e.target.className)
                        console.log(e)*/
                        if(e && e.target && (e.target.className=='pac-matched' || e.target.className=='pac-item-query'  || e.target.className=='pac-item' || e.target.className=='pac-icon' || e.target.className=='pac-container'
                            || e.target.className=='pac-icon-marker'|| e.target.className=='pac-logo' || e.target.className=='pac-matched')){
                            //console.log(e.target.className)
                            event.stopPropagation()
                            return
                        }
                        var i,
                            element,
                            r,
                            id,
                            classNames,
                            l;

                        // check if our element already hidden and abort if so
                        if (angular.element(elem).hasClass("ng-hide")) {
                            return;
                        }

                        // if there is no click target, no point going on
                        if (!e || !e.target) {
                            return;
                        }

                        // loop through the available elements, looking for classes in the class list that might match and so will eat
                        for (element = e.target; element; element = element.parentNode) {
                            // check if the element is the same element the directive is attached to and exit if so (props @CosticaPuntaru)
                            if (element === elem[0]) {
                                return;
                            }
                            
                            // now we have done the initial checks, start gathering id's and classes
                            id = element.id,
                            classNames = element.className,
                            l = classList.length;

                            // Unwrap SVGAnimatedString classes
                            if (classNames && classNames.baseVal !== undefined) {
                                classNames = classNames.baseVal;
                            }

                            // if there are no class names on the element clicked, skip the check
                            if (classNames || id) {

                                // loop through the elements id's and classnames looking for exceptions
                                for (i = 0; i < l; i++) {
                                    //prepare regex for class word matching
                                    r = new RegExp('\\b' + classList[i] + '\\b');

                                    // check for exact matches on id's or classes, but only if they exist in the first place
                                    if ((id !== undefined && id === classList[i]) || (classNames && r.test(classNames))) {
                                        // now let's exit out as it is an element that has been defined as being ignored for clicking outside
                                        return;
                                    }
                                }
                            }
                        }

                        // if we have got this far, then we are good to go with processing the command passed in via the click-outside attribute
                        $timeout(function() {
                            fn = $parse(attr['clickOutside']);
                            fn($scope, { event: e });
                        });
                    }

                    // if the devices has a touchscreen, listen for this event
                    if (_hasTouch()) {
                        $document.on('touchstart', eventHandler);
                    }

                    // still listen for the click event even if there is touch to cater for touchscreen laptops
                    $document.on('click', eventHandler);

                    // when the scope is destroyed, clean up the documents event handlers as we don't want it hanging around
                    $scope.$on('$destroy', function() {
                        if (_hasTouch()) {
                            $document.off('touchstart', eventHandler);
                        }

                        $document.off('click', eventHandler);
                    });

                    /**
                     * @description Private function to attempt to figure out if we are on a touch device
                     * @private
                     **/
                    function _hasTouch() {
                        // works on most browsers, IE10/11 and Surface
                        return 'ontouchstart' in window || navigator.maxTouchPoints;
                    };
                });
            }
        };
    }
})();

/*! angularjs-slider - v6.0.1 -  (c) Rafal Zajac <rzajac@gmail.com>, Valentin Hervieu <valentin@hervieu.me>, Jussi Saarivirta <jusasi@gmail.com>, Angelin Sirbu <angelin.sirbu@gmail.com> -  https://github.com/angular-slider/angularjs-slider -  2017-02-15 */
!function(a,b){"use strict";if("function"==typeof define&&define.amd)define(["angular"],b);else if("object"==typeof module&&module.exports){var c=angular||require("angular");c&&c.module||"undefined"==typeof angular||(c=angular),module.exports=b(c)}else b(a.angular)}(this,function(a){"use strict";var b=a.module("rzModule",[]).factory("RzSliderOptions",function(){var b={floor:0,ceil:null,step:1,precision:0,minRange:null,maxRange:null,pushRange:!1,minLimit:null,maxLimit:null,id:null,translate:null,getLegend:null,stepsArray:null,bindIndexForStepsArray:!1,draggableRange:!1,draggableRangeOnly:!1,showSelectionBar:!1,showSelectionBarEnd:!1,showSelectionBarFromValue:null,hidePointerLabels:!1,hideLimitLabels:!1,autoHideLimitLabels:!0,readOnly:!1,disabled:!1,interval:350,showTicks:!1,showTicksValues:!1,ticksArray:null,ticksTooltip:null,ticksValuesTooltip:null,vertical:!1,getSelectionBarColor:null,getTickColor:null,getPointerColor:null,keyboardSupport:!0,scale:1,enforceStep:!0,enforceRange:!1,noSwitching:!1,onlyBindHandles:!1,onStart:null,onChange:null,onEnd:null,rightToLeft:!1,boundPointerLabels:!0,mergeRangeLabelsIfSame:!1,customTemplateScope:null,logScale:!1,customValueToPosition:null,customPositionToValue:null,selectionBarGradient:null},c={},d={};return d.options=function(b){a.extend(c,b)},d.getOptions=function(d){return a.extend({},b,c,d)},d}).factory("rzThrottle",["$timeout",function(a){return function(b,c,d){var e,f,g,h=Date.now||function(){return(new Date).getTime()},i=null,j=0;d=d||{};var k=function(){j=h(),i=null,g=b.apply(e,f),e=f=null};return function(){var l=h(),m=c-(l-j);return e=this,f=arguments,0>=m?(a.cancel(i),i=null,j=l,g=b.apply(e,f),e=f=null):i||d.trailing===!1||(i=a(k,m)),g}}}]).factory("RzSlider",["$timeout","$document","$window","$compile","RzSliderOptions","rzThrottle",function(b,c,d,e,f,g){var h=function(a,b){this.scope=a,this.lowValue=0,this.highValue=0,this.sliderElem=b,this.range=void 0!==this.scope.rzSliderModel&&void 0!==this.scope.rzSliderHigh,this.dragging={active:!1,value:0,difference:0,position:0,lowLimit:0,highLimit:0},this.positionProperty="left",this.dimensionProperty="width",this.handleHalfDim=0,this.maxPos=0,this.precision=0,this.step=1,this.tracking="",this.minValue=0,this.maxValue=0,this.valueRange=0,this.intermediateTicks=!1,this.initHasRun=!1,this.firstKeyDown=!1,this.internalChange=!1,this.cmbLabelShown=!1,this.currentFocusElement=null,this.fullBar=null,this.selBar=null,this.minH=null,this.maxH=null,this.flrLab=null,this.ceilLab=null,this.minLab=null,this.maxLab=null,this.cmbLab=null,this.ticks=null,this.init()};return h.prototype={init:function(){var b,c,e=this,f=function(){e.calcViewDimensions()};this.applyOptions(),this.syncLowValue(),this.range&&this.syncHighValue(),this.initElemHandles(),this.manageElementsStyle(),this.setDisabledState(),this.calcViewDimensions(),this.setMinAndMax(),this.addAccessibility(),this.updateCeilLab(),this.updateFloorLab(),this.initHandles(),this.manageEventsBindings(),this.scope.$on("reCalcViewDimensions",f),a.element(d).on("resize",f),this.initHasRun=!0,b=g(function(){e.onLowHandleChange()},e.options.interval),c=g(function(){e.onHighHandleChange()},e.options.interval),this.scope.$on("rzSliderForceRender",function(){e.resetLabelsValue(),b(),e.range&&c(),e.resetSlider()}),this.scope.$watch("rzSliderOptions()",function(a,b){a!==b&&(e.applyOptions(),e.syncLowValue(),e.range&&e.syncHighValue(),e.resetSlider())},!0),this.scope.$watch("rzSliderModel",function(a,c){e.internalChange||a!==c&&b()}),this.scope.$watch("rzSliderHigh",function(a,b){e.internalChange||a!==b&&(null!=a&&c(),(e.range&&null==a||!e.range&&null!=a)&&(e.applyOptions(),e.resetSlider()))}),this.scope.$on("$destroy",function(){e.unbindEvents(),a.element(d).off("resize",f),e.currentFocusElement=null})},findStepIndex:function(b){for(var c=0,d=0;d<this.options.stepsArray.length;d++){var e=this.options.stepsArray[d];if(e===b){c=d;break}if(a.isDate(e)){if(e.getTime()===b.getTime()){c=d;break}}else if(a.isObject(e)&&(a.isDate(e.value)&&e.value.getTime()===b.getTime()||e.value===b)){c=d;break}}return c},syncLowValue:function(){this.options.stepsArray?this.options.bindIndexForStepsArray?this.lowValue=this.scope.rzSliderModel:this.lowValue=this.findStepIndex(this.scope.rzSliderModel):this.lowValue=this.scope.rzSliderModel},syncHighValue:function(){this.options.stepsArray?this.options.bindIndexForStepsArray?this.highValue=this.scope.rzSliderHigh:this.highValue=this.findStepIndex(this.scope.rzSliderHigh):this.highValue=this.scope.rzSliderHigh},getStepValue:function(b){var c=this.options.stepsArray[b];return a.isDate(c)?c:a.isObject(c)?c.value:c},applyLowValue:function(){this.options.stepsArray?this.options.bindIndexForStepsArray?this.scope.rzSliderModel=this.lowValue:this.scope.rzSliderModel=this.getStepValue(this.lowValue):this.scope.rzSliderModel=this.lowValue},applyHighValue:function(){this.options.stepsArray?this.options.bindIndexForStepsArray?this.scope.rzSliderHigh=this.highValue:this.scope.rzSliderHigh=this.getStepValue(this.highValue):this.scope.rzSliderHigh=this.highValue},onLowHandleChange:function(){this.syncLowValue(),this.range&&this.syncHighValue(),this.setMinAndMax(),this.updateLowHandle(this.valueToPosition(this.lowValue)),this.updateSelectionBar(),this.updateTicksScale(),this.updateAriaAttributes(),this.range&&this.updateCmbLabel()},onHighHandleChange:function(){this.syncLowValue(),this.syncHighValue(),this.setMinAndMax(),this.updateHighHandle(this.valueToPosition(this.highValue)),this.updateSelectionBar(),this.updateTicksScale(),this.updateCmbLabel(),this.updateAriaAttributes()},applyOptions:function(){var b;b=this.scope.rzSliderOptions?this.scope.rzSliderOptions():{},this.options=f.getOptions(b),this.options.step<=0&&(this.options.step=1),this.range=void 0!==this.scope.rzSliderModel&&void 0!==this.scope.rzSliderHigh,this.options.draggableRange=this.range&&this.options.draggableRange,this.options.draggableRangeOnly=this.range&&this.options.draggableRangeOnly,this.options.draggableRangeOnly&&(this.options.draggableRange=!0),this.options.showTicks=this.options.showTicks||this.options.showTicksValues||!!this.options.ticksArray,this.scope.showTicks=this.options.showTicks,(a.isNumber(this.options.showTicks)||this.options.ticksArray)&&(this.intermediateTicks=!0),this.options.showSelectionBar=this.options.showSelectionBar||this.options.showSelectionBarEnd||null!==this.options.showSelectionBarFromValue,this.options.stepsArray?this.parseStepsArray():(this.options.translate?this.customTrFn=this.options.translate:this.customTrFn=function(a){return String(a)},this.getLegend=this.options.getLegend),this.options.vertical&&(this.positionProperty="bottom",this.dimensionProperty="height"),this.options.customTemplateScope&&(this.scope.custom=this.options.customTemplateScope)},parseStepsArray:function(){this.options.floor=0,this.options.ceil=this.options.stepsArray.length-1,this.options.step=1,this.options.translate?this.customTrFn=this.options.translate:this.customTrFn=function(a){return this.options.bindIndexForStepsArray?this.getStepValue(a):a},this.getLegend=function(b){var c=this.options.stepsArray[b];return a.isObject(c)?c.legend:null}},resetSlider:function(){this.manageElementsStyle(),this.addAccessibility(),this.setMinAndMax(),this.updateCeilLab(),this.updateFloorLab(),this.unbindEvents(),this.manageEventsBindings(),this.setDisabledState(),this.calcViewDimensions(),this.refocusPointerIfNeeded()},refocusPointerIfNeeded:function(){this.currentFocusElement&&(this.onPointerFocus(this.currentFocusElement.pointer,this.currentFocusElement.ref),this.focusElement(this.currentFocusElement.pointer))},initElemHandles:function(){a.forEach(this.sliderElem.children(),function(b,c){var d=a.element(b);switch(c){case 0:this.fullBar=d;break;case 1:this.selBar=d;break;case 2:this.minH=d;break;case 3:this.maxH=d;break;case 4:this.flrLab=d;break;case 5:this.ceilLab=d;break;case 6:this.minLab=d;break;case 7:this.maxLab=d;break;case 8:this.cmbLab=d;break;case 9:this.ticks=d}},this),this.selBar.rzsp=0,this.minH.rzsp=0,this.maxH.rzsp=0,this.flrLab.rzsp=0,this.ceilLab.rzsp=0,this.minLab.rzsp=0,this.maxLab.rzsp=0,this.cmbLab.rzsp=0},manageElementsStyle:function(){this.range?this.maxH.css("display",""):this.maxH.css("display","none"),this.alwaysHide(this.flrLab,this.options.showTicksValues||this.options.hideLimitLabels),this.alwaysHide(this.ceilLab,this.options.showTicksValues||this.options.hideLimitLabels);var a=this.options.showTicksValues&&!this.intermediateTicks;this.alwaysHide(this.minLab,a||this.options.hidePointerLabels),this.alwaysHide(this.maxLab,a||!this.range||this.options.hidePointerLabels),this.alwaysHide(this.cmbLab,a||!this.range||this.options.hidePointerLabels),this.alwaysHide(this.selBar,!this.range&&!this.options.showSelectionBar),this.options.vertical&&this.sliderElem.addClass("rz-vertical"),this.options.draggableRange?this.selBar.addClass("rz-draggable"):this.selBar.removeClass("rz-draggable"),this.intermediateTicks&&this.options.showTicksValues&&this.ticks.addClass("rz-ticks-values-under")},alwaysHide:function(a,b){a.rzAlwaysHide=b,b?this.hideEl(a):this.showEl(a)},manageEventsBindings:function(){this.options.disabled||this.options.readOnly?this.unbindEvents():this.bindEvents()},setDisabledState:function(){this.options.disabled?this.sliderElem.attr("disabled","disabled"):this.sliderElem.attr("disabled",null)},resetLabelsValue:function(){this.minLab.rzsv=void 0,this.maxLab.rzsv=void 0},initHandles:function(){this.updateLowHandle(this.valueToPosition(this.lowValue)),this.range&&this.updateHighHandle(this.valueToPosition(this.highValue)),this.updateSelectionBar(),this.range&&this.updateCmbLabel(),this.updateTicksScale()},translateFn:function(a,b,c,d){d=void 0===d?!0:d;var e="",f=!1,g=b.hasClass("no-label-injection");d?(this.options.stepsArray&&!this.options.bindIndexForStepsArray&&(a=this.getStepValue(a)),e=String(this.customTrFn(a,this.options.id,c))):e=String(a),(void 0===b.rzsv||b.rzsv.length!==e.length||b.rzsv.length>0&&0===b.rzsd)&&(f=!0,b.rzsv=e),g||b.html(e),this.scope[c+"Label"]=e,f&&this.getDimension(b)},setMinAndMax:function(){if(this.step=+this.options.step,this.precision=+this.options.precision,this.minValue=this.options.floor,this.options.logScale&&0===this.minValue)throw Error("Can't use floor=0 with logarithmic scale");this.options.enforceStep&&(this.lowValue=this.roundStep(this.lowValue),this.range&&(this.highValue=this.roundStep(this.highValue))),null!=this.options.ceil?this.maxValue=this.options.ceil:this.maxValue=this.options.ceil=this.range?this.highValue:this.lowValue,this.options.enforceRange&&(this.lowValue=this.sanitizeValue(this.lowValue),this.range&&(this.highValue=this.sanitizeValue(this.highValue))),this.applyLowValue(),this.range&&this.applyHighValue(),this.valueRange=this.maxValue-this.minValue},addAccessibility:function(){this.minH.attr("role","slider"),this.updateAriaAttributes(),!this.options.keyboardSupport||this.options.readOnly||this.options.disabled?this.minH.attr("tabindex",""):this.minH.attr("tabindex","0"),this.options.vertical&&this.minH.attr("aria-orientation","vertical"),this.range&&(this.maxH.attr("role","slider"),!this.options.keyboardSupport||this.options.readOnly||this.options.disabled?this.maxH.attr("tabindex",""):this.maxH.attr("tabindex","0"),this.options.vertical&&this.maxH.attr("aria-orientation","vertical"))},updateAriaAttributes:function(){this.minH.attr({"aria-valuenow":this.scope.rzSliderModel,"aria-valuetext":this.customTrFn(this.scope.rzSliderModel,this.options.id,"model"),"aria-valuemin":this.minValue,"aria-valuemax":this.maxValue}),this.range&&this.maxH.attr({"aria-valuenow":this.scope.rzSliderHigh,"aria-valuetext":this.customTrFn(this.scope.rzSliderHigh,this.options.id,"high"),"aria-valuemin":this.minValue,"aria-valuemax":this.maxValue})},calcViewDimensions:function(){var a=this.getDimension(this.minH);if(this.handleHalfDim=a/2,this.barDimension=this.getDimension(this.fullBar),this.maxPos=this.barDimension-a,this.getDimension(this.sliderElem),this.sliderElem.rzsp=this.sliderElem[0].getBoundingClientRect()[this.positionProperty],this.initHasRun){this.updateFloorLab(),this.updateCeilLab(),this.initHandles();var c=this;b(function(){c.updateTicksScale()})}},updateTicksScale:function(){if(this.options.showTicks){var a=this.options.ticksArray||this.getTicksArray(),b=this.options.vertical?"translateY":"translateX",c=this;this.options.rightToLeft&&a.reverse(),this.scope.ticks=a.map(function(a){var d=c.valueToPosition(a);c.options.vertical&&(d=c.maxPos-d);var e={selected:c.isTickSelected(a),style:{transform:b+"("+Math.round(d)+"px)"}};if(e.selected&&c.options.getSelectionBarColor&&(e.style["background-color"]=c.getSelectionBarColor()),!e.selected&&c.options.getTickColor&&(e.style["background-color"]=c.getTickColor(a)),c.options.ticksTooltip&&(e.tooltip=c.options.ticksTooltip(a),e.tooltipPlacement=c.options.vertical?"right":"top"),c.options.showTicksValues&&(e.value=c.getDisplayValue(a,"tick-value"),c.options.ticksValuesTooltip&&(e.valueTooltip=c.options.ticksValuesTooltip(a),e.valueTooltipPlacement=c.options.vertical?"right":"top")),c.getLegend){var f=c.getLegend(a,c.options.id);f&&(e.legend=f)}return e})}},getTicksArray:function(){var a=this.step,b=[];this.intermediateTicks&&(a=this.options.showTicks);for(var c=this.minValue;c<=this.maxValue;c+=a)b.push(c);return b},isTickSelected:function(a){if(!this.range)if(null!==this.options.showSelectionBarFromValue){var b=this.options.showSelectionBarFromValue;if(this.lowValue>b&&a>=b&&a<=this.lowValue)return!0;if(this.lowValue<b&&b>=a&&a>=this.lowValue)return!0}else if(this.options.showSelectionBarEnd){if(a>=this.lowValue)return!0}else if(this.options.showSelectionBar&&a<=this.lowValue)return!0;return this.range&&a>=this.lowValue&&a<=this.highValue?!0:!1},updateFloorLab:function(){this.translateFn(this.minValue,this.flrLab,"floor"),this.getDimension(this.flrLab);var a=this.options.rightToLeft?this.barDimension-this.flrLab.rzsd:0;this.setPosition(this.flrLab,a)},updateCeilLab:function(){this.translateFn(this.maxValue,this.ceilLab,"ceil"),this.getDimension(this.ceilLab);var a=this.options.rightToLeft?0:this.barDimension-this.ceilLab.rzsd;this.setPosition(this.ceilLab,a)},updateHandles:function(a,b){"lowValue"===a?this.updateLowHandle(b):this.updateHighHandle(b),this.updateSelectionBar(),this.updateTicksScale(),this.range&&this.updateCmbLabel()},getHandleLabelPos:function(a,b){var c=this[a].rzsd,d=b-c/2+this.handleHalfDim,e=this.barDimension-c;return this.options.boundPointerLabels?this.options.rightToLeft&&"minLab"===a||!this.options.rightToLeft&&"maxLab"===a?Math.min(d,e):Math.min(Math.max(d,0),e):d},updateLowHandle:function(a){if(this.setPosition(this.minH,a),this.translateFn(this.lowValue,this.minLab,"model"),this.setPosition(this.minLab,this.getHandleLabelPos("minLab",a)),this.options.getPointerColor){var b=this.getPointerColor("min");this.scope.minPointerStyle={backgroundColor:b}}this.options.autoHideLimitLabels&&this.shFloorCeil()},updateHighHandle:function(a){if(this.setPosition(this.maxH,a),this.translateFn(this.highValue,this.maxLab,"high"),this.setPosition(this.maxLab,this.getHandleLabelPos("maxLab",a)),this.options.getPointerColor){var b=this.getPointerColor("max");this.scope.maxPointerStyle={backgroundColor:b}}this.options.autoHideLimitLabels&&this.shFloorCeil()},shFloorCeil:function(){if(!this.options.hidePointerLabels){var a=!1,b=!1,c=this.isLabelBelowFloorLab(this.minLab),d=this.isLabelAboveCeilLab(this.minLab),e=this.isLabelAboveCeilLab(this.maxLab),f=this.isLabelBelowFloorLab(this.cmbLab),g=this.isLabelAboveCeilLab(this.cmbLab);if(c?(a=!0,this.hideEl(this.flrLab)):(a=!1,this.showEl(this.flrLab)),d?(b=!0,this.hideEl(this.ceilLab)):(b=!1,this.showEl(this.ceilLab)),this.range){var h=this.cmbLabelShown?g:e,i=this.cmbLabelShown?f:c;h?this.hideEl(this.ceilLab):b||this.showEl(this.ceilLab),i?this.hideEl(this.flrLab):a||this.showEl(this.flrLab)}}},isLabelBelowFloorLab:function(a){var b=this.options.rightToLeft,c=a.rzsp,d=a.rzsd,e=this.flrLab.rzsp,f=this.flrLab.rzsd;return b?c+d>=e-2:e+f+2>=c},isLabelAboveCeilLab:function(a){var b=this.options.rightToLeft,c=a.rzsp,d=a.rzsd,e=this.ceilLab.rzsp,f=this.ceilLab.rzsd;return b?e+f+2>=c:c+d>=e-2},updateSelectionBar:function(){var a=0,b=0,c=this.options.rightToLeft?!this.options.showSelectionBarEnd:this.options.showSelectionBarEnd,d=this.options.rightToLeft?this.maxH.rzsp+this.handleHalfDim:this.minH.rzsp+this.handleHalfDim;if(this.range)b=Math.abs(this.maxH.rzsp-this.minH.rzsp),a=d;else if(null!==this.options.showSelectionBarFromValue){var e=this.options.showSelectionBarFromValue,f=this.valueToPosition(e),g=this.options.rightToLeft?this.lowValue<=e:this.lowValue>e;g?(b=this.minH.rzsp-f,a=f+this.handleHalfDim):(b=f-this.minH.rzsp,a=this.minH.rzsp+this.handleHalfDim)}else c?(b=Math.abs(this.maxPos-this.minH.rzsp)+this.handleHalfDim,a=this.minH.rzsp+this.handleHalfDim):(b=Math.abs(this.maxH.rzsp-this.minH.rzsp)+this.handleHalfDim,a=0);if(this.setDimension(this.selBar,b),this.setPosition(this.selBar,a),this.options.getSelectionBarColor){var h=this.getSelectionBarColor();this.scope.barStyle={backgroundColor:h}}else if(this.options.selectionBarGradient){var i=null!==this.options.showSelectionBarFromValue?this.valueToPosition(this.options.showSelectionBarFromValue):0,j=i-a>0^c,k=this.options.vertical?j?"bottom":"top":j?"left":"right";this.scope.barStyle={backgroundImage:"linear-gradient(to "+k+", "+this.options.selectionBarGradient.from+" 0%,"+this.options.selectionBarGradient.to+" 100%)"},this.options.vertical?(this.scope.barStyle.backgroundPosition="center "+(i+b+a+(j?-this.handleHalfDim:0))+"px",this.scope.barStyle.backgroundSize="100% "+(this.barDimension-this.handleHalfDim)+"px"):(this.scope.barStyle.backgroundPosition=i-a+(j?this.handleHalfDim:0)+"px center",this.scope.barStyle.backgroundSize=this.barDimension-this.handleHalfDim+"px 100%")}},getSelectionBarColor:function(){return this.range?this.options.getSelectionBarColor(this.scope.rzSliderModel,this.scope.rzSliderHigh):this.options.getSelectionBarColor(this.scope.rzSliderModel)},getPointerColor:function(a){return"max"===a?this.options.getPointerColor(this.scope.rzSliderHigh,a):this.options.getPointerColor(this.scope.rzSliderModel,a)},getTickColor:function(a){return this.options.getTickColor(a)},updateCmbLabel:function(){var a=null;if(a=this.options.rightToLeft?this.minLab.rzsp-this.minLab.rzsd-10<=this.maxLab.rzsp:this.minLab.rzsp+this.minLab.rzsd+10>=this.maxLab.rzsp){var b=this.getDisplayValue(this.lowValue,"model"),c=this.getDisplayValue(this.highValue,"high"),d="";d=this.options.mergeRangeLabelsIfSame&&b===c?b:this.options.rightToLeft?c+" - "+b:b+" - "+c,this.translateFn(d,this.cmbLab,"cmb",!1);var e=this.options.boundPointerLabels?Math.min(Math.max(this.selBar.rzsp+this.selBar.rzsd/2-this.cmbLab.rzsd/2,0),this.barDimension-this.cmbLab.rzsd):this.selBar.rzsp+this.selBar.rzsd/2-this.cmbLab.rzsd/2;this.setPosition(this.cmbLab,e),this.cmbLabelShown=!0,this.hideEl(this.minLab),this.hideEl(this.maxLab),this.showEl(this.cmbLab)}else this.cmbLabelShown=!1,this.showEl(this.maxLab),this.showEl(this.minLab),this.hideEl(this.cmbLab);this.options.autoHideLimitLabels&&this.shFloorCeil()},getDisplayValue:function(a,b){return this.options.stepsArray&&!this.options.bindIndexForStepsArray&&(a=this.getStepValue(a)),this.customTrFn(a,this.options.id,b)},roundStep:function(a,b){var c=b?b:this.step,d=parseFloat((a-this.minValue)/c).toPrecision(12);d=Math.round(+d)*c;var e=(this.minValue+d).toFixed(this.precision);return+e},hideEl:function(a){return a.css({visibility:"hidden"})},showEl:function(a){return a.rzAlwaysHide?a:a.css({visibility:"visible"})},setPosition:function(a,b){a.rzsp=b;var c={};return c[this.positionProperty]=Math.round(b)+"px",a.css(c),b},getDimension:function(a){var b=a[0].getBoundingClientRect();return this.options.vertical?a.rzsd=(b.bottom-b.top)*this.options.scale:a.rzsd=(b.right-b.left)*this.options.scale,a.rzsd},setDimension:function(a,b){a.rzsd=b;var c={};return c[this.dimensionProperty]=Math.round(b)+"px",a.css(c),b},sanitizeValue:function(a){return Math.min(Math.max(a,this.minValue),this.maxValue)},valueToPosition:function(a){var b=this.linearValueToPosition;this.options.customValueToPosition?b=this.options.customValueToPosition:this.options.logScale&&(b=this.logValueToPosition),a=this.sanitizeValue(a);var c=b(a,this.minValue,this.maxValue)||0;return this.options.rightToLeft&&(c=1-c),c*this.maxPos},linearValueToPosition:function(a,b,c){var d=c-b;return(a-b)/d},logValueToPosition:function(a,b,c){a=Math.log(a),b=Math.log(b),c=Math.log(c);var d=c-b;return(a-b)/d},positionToValue:function(a){var b=a/this.maxPos;this.options.rightToLeft&&(b=1-b);var c=this.linearPositionToValue;return this.options.customPositionToValue?c=this.options.customPositionToValue:this.options.logScale&&(c=this.logPositionToValue),c(b,this.minValue,this.maxValue)||0},linearPositionToValue:function(a,b,c){return a*(c-b)+b},logPositionToValue:function(a,b,c){b=Math.log(b),c=Math.log(c);var d=a*(c-b)+b;return Math.exp(d)},getEventXY:function(a){var b=this.options.vertical?"clientY":"clientX";return void 0!==a[b]?a[b]:void 0===a.originalEvent?a.touches[0][b]:a.originalEvent.touches[0][b]},getEventPosition:function(a){var b=this.sliderElem.rzsp,c=0;return c=this.options.vertical?-this.getEventXY(a)+b:this.getEventXY(a)-b,c*this.options.scale-this.handleHalfDim},getEventNames:function(a){var b={moveEvent:"",endEvent:""};return a.touches||void 0!==a.originalEvent&&a.originalEvent.touches?(b.moveEvent="touchmove",b.endEvent="touchend"):(b.moveEvent="mousemove",b.endEvent="mouseup"),b},getNearestHandle:function(a){if(!this.range)return this.minH;var b=this.getEventPosition(a),c=Math.abs(b-this.minH.rzsp),d=Math.abs(b-this.maxH.rzsp);return d>c?this.minH:c>d?this.maxH:this.options.rightToLeft?b>this.minH.rzsp?this.minH:this.maxH:b<this.minH.rzsp?this.minH:this.maxH},focusElement:function(a){var b=0;a[b].focus()},bindEvents:function(){var b,c,d;this.options.draggableRange?(b="rzSliderDrag",c=this.onDragStart,d=this.onDragMove):(b="lowValue",c=this.onStart,d=this.onMove),this.options.onlyBindHandles||(this.selBar.on("mousedown",a.bind(this,c,null,b)),this.selBar.on("mousedown",a.bind(this,d,this.selBar))),this.options.draggableRangeOnly?(this.minH.on("mousedown",a.bind(this,c,null,b)),this.maxH.on("mousedown",a.bind(this,c,null,b))):(this.minH.on("mousedown",a.bind(this,this.onStart,this.minH,"lowValue")),this.range&&this.maxH.on("mousedown",a.bind(this,this.onStart,this.maxH,"highValue")),this.options.onlyBindHandles||(this.fullBar.on("mousedown",a.bind(this,this.onStart,null,null)),this.fullBar.on("mousedown",a.bind(this,this.onMove,this.fullBar)),this.ticks.on("mousedown",a.bind(this,this.onStart,null,null)),this.ticks.on("mousedown",a.bind(this,this.onTickClick,this.ticks)))),this.options.onlyBindHandles||(this.selBar.on("touchstart",a.bind(this,c,null,b)),this.selBar.on("touchstart",a.bind(this,d,this.selBar))),this.options.draggableRangeOnly?(this.minH.on("touchstart",a.bind(this,c,null,b)),this.maxH.on("touchstart",a.bind(this,c,null,b))):(this.minH.on("touchstart",a.bind(this,this.onStart,this.minH,"lowValue")),this.range&&this.maxH.on("touchstart",a.bind(this,this.onStart,this.maxH,"highValue")),this.options.onlyBindHandles||(this.fullBar.on("touchstart",a.bind(this,this.onStart,null,null)),this.fullBar.on("touchstart",a.bind(this,this.onMove,this.fullBar)),this.ticks.on("touchstart",a.bind(this,this.onStart,null,null)),this.ticks.on("touchstart",a.bind(this,this.onTickClick,this.ticks)))),this.options.keyboardSupport&&(this.minH.on("focus",a.bind(this,this.onPointerFocus,this.minH,"lowValue")),this.range&&this.maxH.on("focus",a.bind(this,this.onPointerFocus,this.maxH,"highValue")))},unbindEvents:function(){this.minH.off(),this.maxH.off(),this.fullBar.off(),this.selBar.off(),this.ticks.off()},onStart:function(b,d,e){var f,g,h=this.getEventNames(e);e.stopPropagation(),e.preventDefault(),this.calcViewDimensions(),b?this.tracking=d:(b=this.getNearestHandle(e),this.tracking=b===this.minH?"lowValue":"highValue"),b.addClass("rz-active"),this.options.keyboardSupport&&this.focusElement(b),f=a.bind(this,this.dragging.active?this.onDragMove:this.onMove,b),g=a.bind(this,this.onEnd,f),c.on(h.moveEvent,f),c.one(h.endEvent,g),this.callOnStart()},onMove:function(b,c,d){var e,f=this.getEventPosition(c),g=this.options.rightToLeft?this.minValue:this.maxValue,h=this.options.rightToLeft?this.maxValue:this.minValue;0>=f?e=h:f>=this.maxPos?e=g:(e=this.positionToValue(f),e=d&&a.isNumber(this.options.showTicks)?this.roundStep(e,this.options.showTicks):this.roundStep(e)),this.positionTrackingHandle(e)},onEnd:function(a,b){var d=this.getEventNames(b).moveEvent;this.options.keyboardSupport||(this.minH.removeClass("rz-active"),this.maxH.removeClass("rz-active"),this.tracking=""),this.dragging.active=!1,c.off(d,a),this.callOnEnd()},onTickClick:function(a,b){this.onMove(a,b,!0)},onPointerFocus:function(b,c){this.tracking=c,b.one("blur",a.bind(this,this.onPointerBlur,b)),b.on("keydown",a.bind(this,this.onKeyboardEvent)),b.on("keyup",a.bind(this,this.onKeyUp)),this.firstKeyDown=!0,b.addClass("rz-active"),this.currentFocusElement={pointer:b,ref:c}},onKeyUp:function(){this.firstKeyDown=!0,this.callOnEnd()},onPointerBlur:function(a){a.off("keydown"),a.off("keyup"),this.tracking="",a.removeClass("rz-active"),this.currentFocusElement=null},getKeyActions:function(a){var b=a+this.step,c=a-this.step,d=a+this.valueRange/10,e=a-this.valueRange/10,f={UP:b,DOWN:c,LEFT:c,RIGHT:b,PAGEUP:d,PAGEDOWN:e,HOME:this.minValue,END:this.maxValue};return this.options.rightToLeft&&(f.LEFT=b,f.RIGHT=c,this.options.vertical&&(f.UP=c,f.DOWN=b)),f},onKeyboardEvent:function(a){var c=this[this.tracking],d=a.keyCode||a.which,e={38:"UP",40:"DOWN",37:"LEFT",39:"RIGHT",33:"PAGEUP",34:"PAGEDOWN",36:"HOME",35:"END"},f=this.getKeyActions(c),g=e[d],h=f[g];if(null!=h&&""!==this.tracking){a.preventDefault(),this.firstKeyDown&&(this.firstKeyDown=!1,this.callOnStart());var i=this;b(function(){var a=i.roundStep(i.sanitizeValue(h));if(i.options.draggableRangeOnly){var b,c,d=i.highValue-i.lowValue;"lowValue"===i.tracking?(b=a,c=a+d,c>i.maxValue&&(c=i.maxValue,b=c-d)):(c=a,b=a-d,b<i.minValue&&(b=i.minValue,c=b+d)),i.positionTrackingBar(b,c)}else i.positionTrackingHandle(a)})}},onDragStart:function(a,b,c){var d=this.getEventPosition(c);this.dragging={active:!0,value:this.positionToValue(d),difference:this.highValue-this.lowValue,lowLimit:this.options.rightToLeft?this.minH.rzsp-d:d-this.minH.rzsp,highLimit:this.options.rightToLeft?d-this.maxH.rzsp:this.maxH.rzsp-d},this.onStart(a,b,c)},getValue:function(a,b,c,d){var e=this.options.rightToLeft,f=null;return f="min"===a?c?d?e?this.minValue:this.maxValue-this.dragging.difference:e?this.maxValue-this.dragging.difference:this.minValue:e?this.positionToValue(b+this.dragging.lowLimit):this.positionToValue(b-this.dragging.lowLimit):c?d?e?this.minValue+this.dragging.difference:this.maxValue:e?this.maxValue:this.minValue+this.dragging.difference:e?this.positionToValue(b+this.dragging.lowLimit)+this.dragging.difference:this.positionToValue(b-this.dragging.lowLimit)+this.dragging.difference,this.roundStep(f)},onDragMove:function(a,b){var c,d,e,f,g,h,i,j,k=this.getEventPosition(b);if(this.options.rightToLeft?(e=this.dragging.lowLimit,f=this.dragging.highLimit,i=this.maxH,j=this.minH):(e=this.dragging.highLimit,f=this.dragging.lowLimit,i=this.minH,j=this.maxH),g=f>=k,h=k>=this.maxPos-e,g){if(0===i.rzsp)return;c=this.getValue("min",k,!0,!1),d=this.getValue("max",k,!0,!1)}else if(h){if(j.rzsp===this.maxPos)return;d=this.getValue("max",k,!0,!0),c=this.getValue("min",k,!0,!0)}else c=this.getValue("min",k,!1),d=this.getValue("max",k,!1);this.positionTrackingBar(c,d)},positionTrackingBar:function(a,b){null!=this.options.minLimit&&a<this.options.minLimit&&(a=this.options.minLimit,b=a+this.dragging.difference),null!=this.options.maxLimit&&b>this.options.maxLimit&&(b=this.options.maxLimit,a=b-this.dragging.difference),this.lowValue=a,this.highValue=b,this.applyLowValue(),this.range&&this.applyHighValue(),this.applyModel(!0),this.updateHandles("lowValue",this.valueToPosition(a)),this.updateHandles("highValue",this.valueToPosition(b))},positionTrackingHandle:function(a){var b=!1;a=this.applyMinMaxLimit(a),this.range&&(this.options.pushRange?(a=this.applyPushRange(a),b=!0):(this.options.noSwitching&&("lowValue"===this.tracking&&a>this.highValue?a=this.applyMinMaxRange(this.highValue):"highValue"===this.tracking&&a<this.lowValue&&(a=this.applyMinMaxRange(this.lowValue))),a=this.applyMinMaxRange(a),"lowValue"===this.tracking&&a>this.highValue?(this.lowValue=this.highValue,this.applyLowValue(),this.applyModel(),this.updateHandles(this.tracking,this.maxH.rzsp),this.updateAriaAttributes(),this.tracking="highValue",this.minH.removeClass("rz-active"),this.maxH.addClass("rz-active"),this.options.keyboardSupport&&this.focusElement(this.maxH),b=!0):"highValue"===this.tracking&&a<this.lowValue&&(this.highValue=this.lowValue,this.applyHighValue(),this.applyModel(),this.updateHandles(this.tracking,this.minH.rzsp),this.updateAriaAttributes(),this.tracking="lowValue",this.maxH.removeClass("rz-active"),this.minH.addClass("rz-active"),this.options.keyboardSupport&&this.focusElement(this.minH),b=!0))),this[this.tracking]!==a&&(this[this.tracking]=a,"lowValue"===this.tracking?this.applyLowValue():this.applyHighValue(),this.applyModel(),this.updateHandles(this.tracking,this.valueToPosition(a)),this.updateAriaAttributes(),b=!0),b&&this.applyModel(!0)},applyMinMaxLimit:function(a){return null!=this.options.minLimit&&a<this.options.minLimit?this.options.minLimit:null!=this.options.maxLimit&&a>this.options.maxLimit?this.options.maxLimit:a},applyMinMaxRange:function(a){var b="lowValue"===this.tracking?this.highValue:this.lowValue,c=Math.abs(a-b);return null!=this.options.minRange&&c<this.options.minRange?"lowValue"===this.tracking?this.highValue-this.options.minRange:this.lowValue+this.options.minRange:null!=this.options.maxRange&&c>this.options.maxRange?"lowValue"===this.tracking?this.highValue-this.options.maxRange:this.lowValue+this.options.maxRange:a},applyPushRange:function(a){var b="lowValue"===this.tracking?this.highValue-a:a-this.lowValue,c=null!==this.options.minRange?this.options.minRange:this.options.step,d=this.options.maxRange;return c>b?("lowValue"===this.tracking?(this.highValue=Math.min(a+c,this.maxValue),a=this.highValue-c,this.applyHighValue(),this.updateHandles("highValue",this.valueToPosition(this.highValue))):(this.lowValue=Math.max(a-c,this.minValue),a=this.lowValue+c,this.applyLowValue(),this.updateHandles("lowValue",this.valueToPosition(this.lowValue))),this.updateAriaAttributes()):null!==d&&b>d&&("lowValue"===this.tracking?(this.highValue=a+d,this.applyHighValue(),this.updateHandles("highValue",this.valueToPosition(this.highValue))):(this.lowValue=a-d,this.applyLowValue(),this.updateHandles("lowValue",this.valueToPosition(this.lowValue))),this.updateAriaAttributes()),a},applyModel:function(a){this.internalChange=!0,this.scope.$apply(),a&&this.callOnChange(),this.internalChange=!1},callOnStart:function(){if(this.options.onStart){var a=this,b="lowValue"===this.tracking?"min":"max";this.scope.$evalAsync(function(){a.options.onStart(a.options.id,a.scope.rzSliderModel,a.scope.rzSliderHigh,b)})}},callOnChange:function(){if(this.options.onChange){var a=this,b="lowValue"===this.tracking?"min":"max";this.scope.$evalAsync(function(){a.options.onChange(a.options.id,a.scope.rzSliderModel,a.scope.rzSliderHigh,b)})}},callOnEnd:function(){if(this.options.onEnd){var a=this,b="lowValue"===this.tracking?"min":"max";this.scope.$evalAsync(function(){a.options.onEnd(a.options.id,a.scope.rzSliderModel,a.scope.rzSliderHigh,b)})}this.scope.$emit("slideEnded")}},h}]).directive("rzslider",["RzSlider",function(a){return{restrict:"AE",replace:!0,scope:{rzSliderModel:"=?",rzSliderHigh:"=?",
rzSliderOptions:"&?",rzSliderTplUrl:"@"},templateUrl:function(a,b){return b.rzSliderTplUrl||"rzSliderTpl.html"},link:function(b,c){b.slider=new a(b,c)}}}]);return b.run(["$templateCache",function(a){a.put("rzSliderTpl.html",'<div class=rzslider><span class=rz-bar-wrapper><span class=rz-bar></span></span> <span class=rz-bar-wrapper><span class="rz-bar rz-selection" ng-style=barStyle></span></span> <span class="rz-pointer rz-pointer-min" ng-style=minPointerStyle></span> <span class="rz-pointer rz-pointer-max" ng-style=maxPointerStyle></span> <span class="rz-bubble rz-limit rz-floor"></span> <span class="rz-bubble rz-limit rz-ceil"></span> <span class=rz-bubble></span> <span class=rz-bubble></span> <span class=rz-bubble></span><ul ng-show=showTicks class=rz-ticks><li ng-repeat="t in ticks track by $index" class=rz-tick ng-class="{\'rz-selected\': t.selected}" ng-style=t.style ng-attr-uib-tooltip="{{ t.tooltip }}" ng-attr-tooltip-placement={{t.tooltipPlacement}} ng-attr-tooltip-append-to-body="{{ t.tooltip ? true : undefined}}"><span ng-if="t.value != null" class=rz-tick-value ng-attr-uib-tooltip="{{ t.valueTooltip }}" ng-attr-tooltip-placement={{t.valueTooltipPlacement}}>{{ t.value }}</span> <span ng-if="t.legend != null" class=rz-tick-legend>{{ t.legend }}</span></li></ul></div>')}]),b.name});
/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.tinymce', [])
  .value('uiTinymceConfig', {})
  .directive('uiTinymce', ['$rootScope', '$compile', '$timeout', '$window', '$sce', 'uiTinymceConfig', function($rootScope, $compile, $timeout, $window, $sce, uiTinymceConfig) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    var ID_ATTR = 'ui-tinymce';
    if (uiTinymceConfig.baseUrl) {
      tinymce.baseURL = uiTinymceConfig.baseUrl;
    }

    return {
      require: ['ngModel', '^?form'],
      link: function(scope, element, attrs, ctrls) {
        if (!$window.tinymce) {
          return;
        }

        var ngModel = ctrls[0],
          form = ctrls[1] || null;

        var expression, options = {}, tinyInstance,
          updateView = function(editor) {
            var content = editor.getContent({format: options.format}).trim();
            content = $sce.trustAsHtml(content);

            ngModel.$setViewValue(content);
            if (!$rootScope.$$phase) {
              scope.$apply();
            }
          };

        function toggleDisable(disabled) {
          if (disabled) {
            ensureInstance();

            if (tinyInstance) {
              tinyInstance.getBody().setAttribute('contenteditable', false);
            }
          } else {
            ensureInstance();

            if (tinyInstance && !tinyInstance.settings.readonly) {
              tinyInstance.getBody().setAttribute('contenteditable', true);
            }
          }
        }

        // generate an ID
        attrs.$set('id', ID_ATTR + '-' + generatedIds++);

        expression = {};

        angular.extend(expression, scope.$eval(attrs.uiTinymce));

        var setupOptions = {
          // Update model when calling setContent
          // (such as from the source editor popup)
          setup: function(ed) {
            ed.on('init', function() {
              ngModel.$render();
              ngModel.$setPristine();
              if (form) {
                form.$setPristine();
              }
            });

            // Update model on button click
            ed.on('ExecCommand', function() {
              ed.save();
              updateView(ed);
            });

            // Update model on change
            ed.on('change', function() {
              ed.save();
              updateView(ed);
            });

            ed.on('blur', function() {
              element[0].blur();
            });

            // Update model when an object has been resized (table, image)
            ed.on('ObjectResized', function() {
              ed.save();
              updateView(ed);
            });

            ed.on('remove', function() {
              element.remove();
            });

            if (expression.setup) {
              expression.setup(ed, {
                updateView: updateView
              });
            }
          },
          format: expression.format || 'html',
          selector: '#' + attrs.id
        };
        // extend options with initial uiTinymceConfig and
        // options from directive attribute value
        angular.extend(options, uiTinymceConfig, expression, setupOptions);
        // Wrapped in $timeout due to $tinymce:refresh implementation, requires
        // element to be present in DOM before instantiating editor when
        // re-rendering directive
        $timeout(function() {
          tinymce.init(options);
          toggleDisable(scope.$eval(attrs.ngDisabled));
        });

        ngModel.$formatters.unshift(function(modelValue) {
          return modelValue ? $sce.trustAsHtml(modelValue) : '';
        });

        ngModel.$parsers.unshift(function(viewValue) {
          return viewValue ? $sce.getTrustedHtml(viewValue) : '';
        });

        ngModel.$render = function() {
          ensureInstance();

          var viewValue = ngModel.$viewValue ?
            $sce.getTrustedHtml(ngModel.$viewValue) : '';

          // instance.getDoc() check is a guard against null value
          // when destruction & recreation of instances happen
          if (tinyInstance &&
            tinyInstance.getDoc()
          ) {
            tinyInstance.setContent(viewValue);
            // Triggering change event due to TinyMCE not firing event &
            // becoming out of sync for change callbacks
            tinyInstance.fire('change');
          }
        };

        attrs.$observe('disabled', toggleDisable);

        // This block is because of TinyMCE not playing well with removal and
        // recreation of instances, requiring instances to have different
        // selectors in order to render new instances properly
        scope.$on('$tinymce:refresh', function(e, id) {
          var eid = attrs.id;
          if (angular.isUndefined(id) || id === eid) {
            var parentElement = element.parent();
            var clonedElement = element.clone();
            clonedElement.removeAttr('id');
            clonedElement.removeAttr('style');
            clonedElement.removeAttr('aria-hidden');
            tinymce.execCommand('mceRemoveEditor', false, eid);
            parentElement.append($compile(clonedElement)(scope));
          }
        });

        scope.$on('$destroy', function() {
          ensureInstance();

          if (tinyInstance) {
            tinyInstance.remove();
            tinyInstance = null;
          }
        });

        function ensureInstance() {
          if (!tinyInstance) {
            tinyInstance = tinymce.get(attrs.id);
          }
        }
      }
    };
  }]);
