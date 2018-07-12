/*
 * Superfish v1.5.13 - jQuery menu widget
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */
/*
;(function($){
    $.fn.superfish = function(op){

        var sf = $.fn.superfish,
            c = sf.c,
            $arrow = $('<span class="'+c.arrowClass+'"> &#187;</span>'),
            over = function(){
                var $$ = $(this), menu = getMenu($$);
                clearTimeout(menu.sfTimer);
                $$.showSuperfishUl().siblings().hideSuperfishUl();
            },
            out = function(e){
                var $$ = $(this), menu = getMenu($$), o = sf.op;

                var close = function(){
                    o.retainPath=($.inArray($$[0],o.$path)>-1);
                    $$.hideSuperfishUl();
                    if (o.$path.length && $$.parents('li.'+o.hoverClass).length<1){
                        o.onIdle.call();
                        $.proxy(over,o.$path,e)();
                    }
                };
                if (e.type === 'click'){
                    close();
                } else {
                    clearTimeout(menu.sfTimer);
                    menu.sfTimer=setTimeout(close,o.delay);
                }
            },
            getMenu = function($child){
                if ($child.hasClass(c.menuClass)){
                    $.error('Superfish requires you to update to a version of hoverIntent that supports event-delegation, such as this one: https://github.com/joeldbirch/onHoverIntent');
                }
                var menu = $child.closest('.'+c.menuClass)[0];
                sf.op = sf.o[menu.serial];
                return menu;
            },
            applyTouchAction = function($menu){
                //needed by MS pointer events
                $menu.css('ms-touch-action','none');
            },
            applyHandlers = function($menu){
                var targets = 'li:has(ul)';
                if (!sf.op.useClick){
                    if ($.fn.hoverIntent && !sf.op.disableHI){
                        $menu.hoverIntent(over, out, targets);
                    } else {
                        $menu
                            .on('mouseenter', targets, over)
                            .on('mouseleave', targets, out);
                    }
                }
                var touchstart = 'MSPointerDown';
                //Sorry, but avoiding weird glitches with touchstart. iOS doesn't need it, anyway.
                if ( !navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/) ){
                    touchstart += ' touchstart';
                }
                $menu
                    .on('focusin', 'li', over)
                    .on('focusout', 'li', out)
                    .on('click', 'a', clickHandler)
                    .on(touchstart, 'a', touchHandler);
            },
            touchHandler = function(e){
                var $$ = $(this),
                    $ul = $$.siblings('ul');
                if ($ul.length > 0 && !$ul.is(':visible')){
                    $$.data('follow', false);
                    if (e.type === 'MSPointerDown'){
                        $$.trigger('focus');
                        return false;
                    }
                }
            },
            clickHandler = function(e){
                var $a = $(this),
                    $submenu = $a.siblings('ul'),
                    follow = ($a.data('follow') === false) ? false : true;

                if ( $submenu.length && (sf.op.useClick || !follow) ){
                    e.preventDefault();
                    if (!$submenu.is(':visible')){
                        $.proxy(over,$a.parent('li'))();
                    } else if (sf.op.useClick && follow) {
                        $.proxy(out,$a.parent('li'),e)();
                    }
                }
            },
            addArrows = function($li,o){
                if (o.autoArrows) {
                    $li.children('a').each(function() {
                        addArrow( $(this) );
                    });
                }
            },
            addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };

        return this.addClass(c.menuClass).each(function() {
            var s = this.serial = sf.o.length;
            var o = $.extend({},sf.defaults,op);
            var $$ = $(this);
            var $liHasUl = $$.find('li:has(ul)');
            o.$path = $$.find('li.'+o.pathClass).slice(0,o.pathLevels).each(function(){
                $(this).addClass(o.hoverClass+' '+c.bcClass)
                    .filter('li:has(ul)').removeClass(o.pathClass);
            });
            sf.o[s] = sf.op = o;

            addArrows($liHasUl,o);
            applyTouchAction($$);
            applyHandlers($$);

            //	$liHasUl.not('.'+c.bcClass).children('ul').show().hide(); // -
            $liHasUl.not('.'+c.bcClass).hideSuperfishUl();            // +

            o.onInit.call(this);

        });
    };

    var sf = $.fn.superfish;
    sf.o = [];
    sf.op = {};

    sf.c = {
        bcClass     : 'sf-breadcrumb',
        menuClass   : 'sf-js-enabled',
        anchorClass : 'sf-with-ul',
        arrowClass  : 'sf-sub-indicator'
    };
    sf.defaults = {
        hoverClass	: 'sfHover',
        pathClass	: 'overideThisToUse',
        pathLevels	: 1,
        delay		: 800,
        animation	: {opacity:'show'},
        animationOut: {opacity:'hide'},
        speed		: 'normal',
        speedOut : 'fast',
        autoArrows	: true,
        disableHI	: false,		// true disables hoverIntent detection
        useClick : false,
        onInit		: function(){}, // callback functions
        onBeforeShow: function(){},
        onShow		: function(){},
        onHide		: function(){},
        onIdle		: function(){}
    };
    $.fn.extend({
        hideSuperfishUl : function(){
            var o = sf.op,
                $$ = this,
                not = (o.retainPath===true) ? o.$path : '';
            o.retainPath = false;
            $('li.'+o.hoverClass,this).add(this).not(not)
                .children('ul').stop(true,true).animate(o.animationOut,o.speedOut,function(){
                    $ul = $(this);
                    $ul.parent().removeClass(o.hoverClass);
                    o.onHide.call($ul);
                    if (sf.op.useClick){
                        $$.children('a').data('follow', false);
                    }
                });
            return this;
        },
        showSuperfishUl : function(){
            var o = sf.op,
                $$ = this,
                $ul = this.children('ul');
            $$.addClass(o.hoverClass);
            o.onBeforeShow.call($ul);
            $ul.stop(true,true).animate(o.animation,o.speed,function(){
                o.onShow.call($ul);
                $$.children('a').data('follow', true);
            });
            return this;
        }
    });

})(jQuery);*/


/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

;(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<b class="',c.arrowClass,'"></b>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
				},o.delay);	
			},
			getMenu = function($menu){
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;
			
			$('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
				if (o.autoArrows) addArrow( $('>a:first-child',this) );
			})
			.not('.'+c.bcClass)
				.hideSuperfishUl();
			
			var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
			});
			o.onInit.call(this);
			
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function(){
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
			this.toggleClass(sf.c.shadowClass+'-off');
		};
	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator',
		shadowClass : 'sf-shadow'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 2,
		delay		: 200,
		animation	: {height:'show'},
		speed		: 'normal',
		autoArrows	: true,
		dropShadows : false,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide();
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				sh = sf.c.shadowClass+'-off',
				$ul = this.not('.accorChild').addClass(o.hoverClass)
					.find('>ul:hidden');
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,200,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});

})(jQuery);
/*---------------------*/
