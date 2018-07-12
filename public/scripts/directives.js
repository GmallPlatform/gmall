'use strict';

/* Directives */

angular.module('gmall.directives', [])


    .directive('spy',function spy() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {
            var h = $('#menu1-section').height()+$('#menu2-section').height()
            // Dom ready
            $(function () {
                if (attrs.spy === 'affix') {
                    $(element).affix({
                        offset: {
                            top: 0,
                            bottom: function(){return this.bottom = $('.footer').outerHeight(true)}

                        }
                    });
                }
            });
        }
    })




/*.directive('openShare1',function(global,$timeout){
    return {
        restrict:'A',
        link:function(scope,element,attrs){
            console.log(document.querySelector('[data-my-element]'))
            new OpenShare.share({
                type: attrs['openShare'],
                innerHTML: 'Check it out!'
            }, document.querySelector('[data-my-element]'))
        }
    }
})

    .directive('verticalAlign',function(global,$timeout){
        return {
            restrict:'A',
            link:function(scope,element,attrs){
                console.log(document.querySelector('[data-my-element]'))
                new OpenShare.share({
                    type: attrs['openShare'],
                    innerHTML: 'Check it out!'
                }, document.querySelector('[data-my-element]'))
            }
        }
    })*/


    //http://stackoverflow.com/questions/22384078/angularjs-manipulating-the-dom-after-ng-repeat-is-finished
    //AngularJS - Manipulating the DOM after ng-repeat is finished
    .directive('imageLoadWatcher', function($rootScope,$timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                if (typeof $rootScope.loadCounter === 'undefined') {
                    $rootScope.loadCounter = 0;
                }
                /*element.find('img').bind('load', function() {
                    scope.$emit('$imageLoaded', $rootScope.loadCounter++);
                });*/
                $timeout(function(){
                    element.find('img').bind('load', function() {
                        scope.$emit('$imageLoaded', $rootScope.loadCounter++);
                    });
                },10)


            },
            controller: function($scope) {
                console.log($scope.$last)
                $scope.$parent.$on('$imageLoaded', function(event, data) {
                    if ($scope.$last && $scope.$index === $rootScope.loadCounter - 1) {
                        $scope.$emit('$allImagesLoaded');
                        delete $rootScope.loadCounter;
                    }
                });
            }
        };
    })
    .directive('imageLoadWatcherHomePage', function($rootScope,$timeout) {
        return {
            restrict: 'AC',
            link: function(scope, element, attrs) {
                //console.log('link imageLoadWatcherHomePage')
                var loadCounter=0,imagesQty=0;
                if (typeof $rootScope.loadCounter === 'undefined') {
                    $rootScope.loadCounter = 0;
                }
                $timeout(function(){
                    var images = element.find('img');
                    //console.log(element.find('img'))
                    imagesQty=images.length;
                    //console.log(imagesQty)
                    var send;

                    images.each(function(img){
                        //console.log(this)
                        if(!this.complete){
                            $(this).bind('load', function() {
                                loadCounter++;
                                //console.log(loadCounter)
                                if(loadCounter==imagesQty){
                                    //console.log('$allImagesLoadedInHomePage')
                                    send=true;
                                    $rootScope.$broadcast('$allImagesLoadedInHomePage');
                                    $rootScope.$emit('$allImagesLoadedInHomePage');
                                }
                            })
                        }else{
                            imagesQty--;
                        }

                    })
                    if(!imagesQty && !send){
                        $rootScope.$broadcast('$allImagesLoadedInHomePage');
                        $rootScope.$emit('$allImagesLoadedInHomePage');
                    }
                    //console.log(imagesQty)
                })

            }
        };
    })


    .directive('owlCarousel',function(global,$timeout){
        return {
            restrict:'A',
            link:function(scope,element,attrs){
                console.log('$allImagesLoaded')
                scope.$on('$allImagesLoaded', function() {
                    $(element).owlCarousel({
                        items : 2, //10 items above 1000px browser width
                        itemsDesktop : [1000,2], //5 items between 1000px and 901px
                        itemsDesktopSmall : [900,1], // betweem 900px and 601px
                        itemsTablet: [600,1], //2 items between 600 and 0
                        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
                    });

                    setTimeout(function(){
                        $('#owl-carousel-next').click(function(){
                            $(element).trigger('owl.prev');
                        })
                        $('#owl-carousel-prev').click(function(){
                            $(element).trigger('owl.prev');
                        })
                    },500)
                });
            }
        }
    })
    .directive('owlCarouselWithAttr',function(global,$timeout){
        return {
            restrict:'A',
            scope:{},
            link:function(scope,element,attrs){
                //console.log(attrs)
                //console.log('$allImagesLoaded')
                var items =(attrs.items)?(attrs.items):1;
                var items3=3,items2=2,items1=1;
                if(items==2){
                    items3=2;
                }else if(items==1){
                    items3=1;
                    items2=1;
                }
                var loop =(attrs.loop)?(attrs.loop):false;
                var nav =(attrs.nav)?(attrs.nav):false;
                var autoplay =(attrs.autoplay)?(attrs.autoplay):false;
                if(attrs.duration && Number(attrs.duration)&& attrs.duration>1 && attrs.duration<10){
                    var autoplaytimeout=1000*Number(attrs.duration);
                }else{
                    var autoplaytimeout=3000
                }
                //console.log(items)
                setTimeout(function(){
                    $(element).owlCarousel({
                        items : items, //10 items above 1000px browser width
                        itemsDesktop : [1000,items], //5 items between 1000px and 901px
                        itemsDesktopSmall : [900,items], // betweem 900px and 601px
                        itemsTablet: [600,1], //2 items between 600 and 0
                        itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
                        responsive:{
                            0:{
                                items:items1,
                                nav:false,
                                dots:true
                            },
                            380:{
                                items:items2,
                                nav:false,
                                dots:true
                            },
                            1068:{
                                items:items3,
                                nav:false,
                                dots:true
                            },
                            1400:{
                                items:items,
                                nav:false,
                                dots:true
                            }
                        },
                        loop:loop,
                        nav:nav,
                        autoplay:autoplay,
                        autoplayTimeout:autoplaytimeout,
                        dots:true,
                        /*nav: true,
                        navText: [
                            "&lsaquo;",
                            "&rsaquo;"
                        ]*/
                        //autoplayHoverPause:true

                    });
                    element.find('.owl-dots').click(function(){
                        console.log('stop')
                        $timeout(function () {
                            $(element).trigger('stop.owl.autoplay');
                            var carousel = $(element).data('owl.carousel');
                            carousel.settings.autoplay = false; //don't know if both are necessary
                            carousel.options.autoplay = false;
                            $('.owl-carousel').trigger('refresh.owl.carousel');

                        },900)

                    })

                    element.find('#owl-carousel-next').click(function(){
                        console.log('next')
                        $(element).trigger('owl.prev');
                        $(element).trigger('stop.owl.autoplay');


                    })
                    element.find('#owl-carousel-prev').click(function(){
                        console.log('next')
                        $(element).trigger('owl.prev');
                        $(element).trigger('stop.owl.autoplay');

                    })

                    $(element).on('mouseenter',function(e){
                        $(element).trigger('stop.owl.autoplay');

                    })

                    $(element).on('mouseleave',function(e){
                        $(element).trigger('play.owl.autoplay');
                    })
                },500)
                /*scope.$on('$allImagesLoaded', function() {
                    $(element).owlCarousel({
                        items : 2, //10 items above 1000px browser width
                        itemsDesktop : [1000,2], //5 items between 1000px and 901px
                        itemsDesktopSmall : [900,1], // betweem 900px and 601px
                        itemsTablet: [600,1], //2 items between 600 and 0
                        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
                    });

                    setTimeout(function(){
                        element.find('#owl-carousel-next').click(function(){
                            $(element).trigger('owl.prev');
                        })
                        element.find('#owl-carousel-prev').click(function(){
                            $(element).trigger('owl.prev');
                        })
                    },500)
                });*/
            }
        }
    })


    .directive('arrowDown',[function(){
        return{
            template:"<a class='nav-down animate-style' ng-click='scrollUp()'>" +
            "<span class='icon-down-img'></span></a>",
            link:function(scope,element){
                var visible=false;
                $(element).hide()
                scope.scrollUp=function () {
                    var arrowDown=$("#arrowDownDiv")
                    var target=arrowDown.offset().top + arrowDown.height()-60
                    $('html, body').animate({
                        scrollTop: target
                    }, 1000);
                }

                $(window).scroll(scrollFoo)
                function scrollFoo() {
                    var arrowDown=$("#arrowDownDiv")
                    //console.log(arrowDown.offset())
                    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                    //console.log(scrolled)
                    if (scrolled > 0 && visible) {
                        visible=false;
                        $(element).hide()
                    } else if(scrolled <= 0 && !visible){
                        visible=true;
                        if(arrowDown && arrowDown.offset()){
                            var offset=arrowDown.offset().top + arrowDown.height()
                            //console.log(offset,$(window).height())
                            if(offset>$(window).height()-10){
                                //console.log('show')
                                $(element).show()
                            }
                        }
                    }
                }
                setTimeout(scrollFoo,1000)

            }
        }
    }])
    .directive('removeClassByScroll',[function(){
        return{
            restrict : 'EA',
            scope:{
                className :'@removeClassByScroll'
            },
            link:function(scope,element){
                $(window).scroll(scrollHandler)
                var done = false
                function scrollHandler() {
                    console.log('scroll')
                    if(!done){
                        element.removeClass(scope.className)
                        done = true;
                    } else{
                        $(window).off("scroll", scrollHandler);
                    }
                }

            }
        }
    }])
    .directive('addRemoveClassByScroll',['$rootScope',function($rootScope){
        return{
            restrict : 'A',
            scope:{
                className :'@addRemoveClassByScroll'
            },
            link:function(scope,element){

                var hasClass = false
                var lastScrollTop=0;
                function scrollHandler(event) {
                    try{
                        var st = $(this).scrollTop();
                        if (st > lastScrollTop){
                           // console.log('downscroll',$(element).isOnScreen())
                            if(!hasClass && $(element).isOnScreen()){
                                element.addClass(scope.className)
                                hasClass = true;
                            }
                            // downscroll code
                        } else {
                            if(hasClass && $(element).isOnScreen()){
                                element.removeClass(scope.className)
                                hasClass = false;
                            }
                            //console.log('upscroll')
                            // upscroll code
                        }
                        lastScrollTop = st;

                    }catch (err){
                        console.log(err)
                    }
                }

                $rootScope.$on('$stateChangeStart', function(event, to, toParams, fromState, fromParams){
                    if(to.name=='home'){
                        $(window).scroll(scrollHandler)
                    }else{
                        $(window).off('scroll',scrollHandler)
                    }
                })


            }
        }
    }])
    .directive('addRemoveClassByFirstMenu',['$rootScope',function($rootScope){
        return{
            restrict : 'A',
            scope:{
                className :'@addRemoveClassByFirstMenu'
            },
            link:function(scope,element){
                console.log('addRemoveClassByFirstMenu',scope.className)
                $rootScope.$on('hideMenu1AfterScroll', function(event, to, toParams, fromState, fromParams){
                    element.addClass(scope.className)
                })
                $rootScope.$on('showMenu1AfterScroll', function(event, to, toParams, fromState, fromParams){
                    element.removeClass(scope.className)
                })


            }
        }
    }])
    .directive('addClassByScroll',[function(){
        return{
            restrict : 'EA',
            scope:{
                className :'@addClassByScroll'
            },
            link:function(scope,element){
                $(window).scroll(scrollHandler)
                var done = false
                function scrollHandler() {
                    //console.log('scroll2')
                    if(!done){
                        element.addClass(scope.className)
                        done = true;
                    } else{
                        $(window).off("scroll", scrollHandler);
                    }
                }

            }
        }
    }])

    .directive('homePageTwoRowsContainer',function($rootScope,$timeout,global,$compile){
        return {
            restrict:'E',
            link:function(scope,element){
                //console.log(element)
                var row1=element[0].firstChild,h1;
                var row2=element[0].lastChild,h2;
                var s = [
                    '<div></div>'
                ].join('');
                var d = angular.element(s)
                var sec = global.get("sections").val[0].url
                var katalog = global.get("lang").val.catalog
                var h = angular.element('<div class="inner"><h1><a href="/'+sec+'/category">'+katalog+'</a></h1></div>');
                var linkFn = $compile(h);
                var hc = linkFn(scope);
                var resize;
                if(!$rootScope.homePageTwoRowsContainer){

                    scope.$on('$allImagesLoadedInHomePage', function(){
                        //console.log('$allImagesLoadedInHomePage')
                        $timeout(function(){
                            initBlock();
                            $rootScope.homePageTwoRowsContainer=true;
                        },300)

                    })
                }else{
                    $timeout(function(){
                        initBlock()
                    },100)

                }

                $(window).resize(function(){
                    if(!resize){
                        resize=true;
                        $timeout(function(){
                            resize=false;
                        },50)
                        $(d).remove()
                        //console.log('resize')
                        $timeout(function(){
                            initBlock();
                        })
                    }
                })
                function initBlock(){
                    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                    //console.log(width,global.get('iPadVerticalWidth').val)
                    if(width<992){
                        //console.log('?????')
                        $(d).remove()
                        return
                    }
                    h1=$(row1).height();
                    h2=$(row2).height();
                    var w = $(row2).width()+30;

                    var diff=Math.abs(h1-h2);
                    if(diff>100){
                        $(d).addClass('catalog-block')
                        $(d).append(hc);
                    }else{
                        $(d).addClass('catalog-block-mini')
                    }
                    $(d).height(diff);
                    $(d).width(w);

                    //console.log(diff)
                    if(h1>h2){
                        $(row2).append(d)
                    }else{
                        $(row1).append(d)
                    }
                    $(d).wrap('<div></div>');

                }


            }
        }
    })

    /*if(type=='header' && block.type=='menu1'&& block.BGColorOnHover && block.blockStyle[1]){
     mixinArgs+=block.blockStyle[1];
     }*/
    //mixinArgsDefine+='$hover-background-color'+':null';









    .directive('freewall',function($timeout,global){
        return {
            restrict:"C",
            link:function(scope,element){
                if(global.get('crawler').val){return}
                $timeout(function(){
                    var images = wall.container.find('.brick');
                    images.find('img').load(function() {
                        wall.fitWidth();
                    });
                    /*scope.container=$(element).mosaicflow({
                        itemSelector: '.mosaicflow-item',
                        minItemWidth: 300
                    });*/
                },200)

                var wall = new Freewall("#freewall");
                wall.reset({
                    selector: '.brick',
                    animate: true,
                    cellW: 200,
                    cellH: 'auto',
                    onResize: function() {
                        wall.fitWidth();
                    }
                });



                /*console.log(scope.container)
                $timeout(function(){
                    var elms = $('.mosaicflow-item');
                    $('.mosaicflow-item').each(function(i,value){
                        console.log(value)
                        $timeout(function(){
                            scope.container.mosaicflow('add', $(value));
                        },i*100)

                    })
                })*/

            }
        }
    })
    .directive('stuffCartMinHeight',function($timeout,global){
        return {
            restrict:"AC",
            link:function(scope,element){
                onsole.log('link stuffCartMinHeight')
                if(global.get('crawler').val){return}
                //console.log($('.stuff-list-wrapper .td-inner'))
                $timeout(function(){
                    var el=$('.stuff-list-wrapper #td-inner0');
                    //console.log(el)
                    if(el){
                        var h=$(el).height()
                        //console.log(h)
                        element.height(h)
                    }
                },1550)
                    function setHeight(){
                    //var d= scope.tableRow2[0].length-scope.tableRow2[1].length
                    var tds =element.find('td');
                    var h1=$(tds[0]).find('.td-wrapper').height();
                    var h2=$(tds[1]).find('.td-wrapper').height();
                    var d = h1-h2;
                    console.log(h1,h2)
                    if(d>0){
                        console.log('1 больше')
                    }else if(d<0){
                        console.log('2 больше');
                        d = scope.tableRow2[0].length;

                    }else if(d==0){
                        console.log('равны')
                    }

                }
            }
        }
    })
    .directive('mosaicflowItem',function($timeout){
        return {
            restrict:"C",
            link:function(scope,element){
                //console.log('link ',scope.test)
                $timeout(function(){
                    var elm = $(element);
                    //scope.container('add', elm)
                    //var elms = $('.mosaicflow__item');
                    //container.mosaicflow('add', elms);
                    //console.log(element)


                    /*$(element).mosaicflow({
                     itemSelector: '.mosaicflow__item',
                     minItemWidth: 300
                     });*/
                },2000)

            }
        }
    })




    .directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  })

 .directive('mongooseError', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            element.on('keydown', function() {
                return ngModel.$setValidity('mongoose', true);
            });
        }
    };
})
 //AngularJS browser autofill workaround by using a directive
//http://stackoverflow.com/questions/14965968/angularjs-browser-autofill-workaround-by-using-a-directive/16800988#16800988
// Form model doesn't update on autocomplete #1460 https://github.com/angular/angular.js/issues/1460
.directive('autoFillableField', function() {
      return {
          restrict: "A",
          require: "?ngModel",
          link: function(scope, element, attrs, ngModel) {
              setInterval(function() {
                  var prev_val = '';
                  if (!angular.isUndefined(attrs.xAutoFillPrevVal)) {
                      prev_val = attrs.xAutoFillPrevVal;
                  }
                  if (element.val()!=prev_val) {
                      if (!angular.isUndefined(ngModel)) {
                          if (!(element.val()=='' && ngModel.$pristine)) {
                              attrs.xAutoFillPrevVal = element.val();
                              scope.$apply(function() {
                                  ngModel.$setViewValue(element.val());
                              });
                          }
                      }
                      else {
                          element.trigger('input');
                          element.trigger('change');
                          element.trigger('keyup');
                          attrs.xAutoFillPrevVal = element.val();
                      }
                  }
              }, 300);
          }
      };
})





.directive( 'hideSpinner', function() {
   return {
       restrict: 'A',
       scope:{hideSpinner:'='},
       link: function( scope, elem, attrs ) {    
          scope.$watch('hideSpinner',function(n,o){
            //console.log(n,o)
            if (n){
                //console.log(elem);
                $(elem).hide();
            }
          })
       }
    }
})



/*----------------------------------------------------*/
/*  Back Top Link
/*----------------------------------------------------*/
.directive('toTop', [function () {
    return {
        restrict: 'C',
        scope:{go:'&'},
        link: function (scope, element, iAttrs) {
            var offset = 200;
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled > offset) {
                element.addClass('toTopDispalay');
            } else {
                element.addClass('toTopDispalayNone');
            }
            window.onscroll = function() {
                scrolled = window.pageYOffset || document.documentElement.scrollTop;
                if (scrolled > offset) {
                    element.addClass('toTopDispalay');
                    element.removeClass('toTopDispalayNone');
                } else {
                    element.removeClass('toTopDispalay');
                    element.addClass('toTopDispalayNone');
                }
            }
            /*element.click(function(event) {
                event.preventDefault();
                scope.go({id:'firstDiv'})
                return false;
            })*/
        }
    };
}])

.directive('pswdCheck', ['$timeout',function ($timeout) {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pswdCheck;
        $timeout(function(){
            elem.on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val()===$(firstPassword).val();
                    ctrl.$setValidity('pswdmatch', v);
                });
            });
        },100)

    }
  }
}])

.directive('profileData',['global','User', function(global,User) {
  return {
    restrict: 'E',
    scope:{
      confirmFunction:'&',
      bottomName:'@'
    },
    templateUrl: 'mobile/views/template/profile.html',
    link: function( scope, elem, attrs ) {
      console.log('link')    
      scope.profileSave= function(formProfile) {
        scope.submittedProfile = true;
        if(formProfile.$valid) {
          scope.errors={};
          User.update(global.get('user').val,function(res){
              if (res='OK'){
                scope.submittedProfile=false;
                scope.confirmFunction();
              }
          });
        }
      };    
    }
  }
}])


    // на странице купона
    //http://plnkr.co/edit/11NIZqB3G3KYKI0OChGA?p=preview
    //http://stackoverflow.com/questions/16677304/slide-up-down-effect-with-ng-show-and-ng-animate
    .directive('sliderToggle', function($timeout,$rootScope) {
        return {
            scope:{
                sliderToggle:"="
            },
            restrict: 'AE',
            link: function(scope, element, attrs) {
                var target = element.parent()[0].querySelector('[slider]');
                attrs.expanded = false;
                $rootScope.$on('$includeContentLoaded', function(event) {
                    $timeout(function(){
                        scope.$watch('sliderToggle',function(n){
                            var content = target.querySelector('.slideable_content');
                            if(!n) {
                                content.style.border = '1px solid rgba(0,0,0,0)';
                                var y = content.clientHeight;
                                content.style.border = 0;
                                target.style.height = y + 'px';
                            } else {
                                target.style.height = '0px';
                            }
                        })
                    },10)
                });


                element.bind('click', function() {
                    if (scope.sliderToggle){return;}
                    var content = target.querySelector('.slideable_content');
                    if(!attrs.expanded) {
                        //content.style.border = '1px solid rgba(0,0,0,0)';
                        var y = content.clientHeight;
                        console.log()
                        content.style.border = 0;
                        target.style.height = y + 'px';
                    } else {
                        target.style.height = '0px';
                    }
                    attrs.expanded = !attrs.expanded;
                });
            }
        }
    })
    .directive('slider', function () {
        return {
            restrict:'A',
            compile: function (element, attr) {
                // wrap tag
                var contents = element.html();
                element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

                return function postLink(scope, element, attrs) {
                    // default properties
                    var content = element.parent()[0].querySelector('.slideable_content');
                    attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                    attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                    element.css({
                        //'overflow': 'hidden',
                        'height': '0px',
                        'transitionProperty': 'height',
                        'transitionDuration': attrs.duration,
                        'transitionTimingFunction': attrs.easing
                    });
                };
            }
        };
    })


//https://www.jsnippet.net/snippet/258/pure-javascript-slidetoggle
.directive('slideToggle11', function($timeout) {
    // в корзине применяется для сообщений о применении акции
    return {
        restrict: 'A',
        scope:{
            slideToggle:'='
        },
        link: function(scope, elem, attrs) {
            var querySelector='aaa'+guidGenerator();
            elem.addClass(querySelector)
            var div;
            $timeout(function(){
              div = document.querySelector('.'+querySelector)
              console.log(div)
            },50)
              //console.log(elem)

            
             /*attrs.$observe('slideToggle', function(n){
                //console.log(n);
                var val = scope.$eval(attrs.slideToggle);
                //console.log(val);
                if (val){} else {}
            });*/
            if (!scope.slideToggle) {
              elem.hide();
            }
            scope.$watch('slideToggle',function(n,o){
                console.log(n,o)
                if (n!=o){
                  toggleSlide(div)
                  //toggleSlide(document.querySelector('.text'));
                    //$(elem).slideToggle()
                }
            })

            
        }
    }
})
    .directive('inline', function () {
        return {
            template: '<span >' +
            '<span ng-show="!edit" ng-class="{\'redColor\':!value}">{{value||empty}}</span>' +
            '<span ng-show="!edit" ng-transclude></span>'+
            '<input ng-show="edit" style="width:{{width}}" class="input-inline" type="{{type}}" ng-model="value"/>' +
            '</span>',
            restrict: 'C',
            scope: {
                value: '=',
                empty:"@",
                type:"@",
                width:"@"
            },

            transclude: true,
            link: function (scope, element, attribs) {

                if(!scope.type){
                    scope.type='text';
                }
                if(!scope.width){
                    scope.width='80%';
                }

                /* watch for changes from the controller */
                scope.$watch('inline', function (val) {
                    scope.value = val;
                });

                /* enable inline editing functionality */
                var enablingEditing = function () {
                    scope.edit = true;

                    setTimeout(function () {
                        //console.log(element.children().children('input')[2]);
                        element.children().children('input')[2].focus();
                        element.children().children('input').bind('blur', function (e) {
                            scope.$apply(function () {
                                disablingEditing();
                            });
                        });
                    }, 100);
                };


                /* disable inline editing functionality */
                var disablingEditing = function () {
                    scope.edit = false;
                    scope.inline = scope.value;
                };


                /* set up the default */
                disablingEditing();


                /* when the element with the inline attribute is clicked, enable editing */
                element.bind('click', function (e) {

                    if ((e.target.nodeName.toLowerCase() === 'span') || (e.target.nodeName.toLowerCase() === 'img')) {
                        scope.$apply(function () { // bind to scope
                            enablingEditing();
                        });
                    }
                });

                /* allow editing to be disabled by pressing the enter key */
                element.bind('keypress', function (e) {

                    if (e.target.nodeName.toLowerCase() != 'input') return;

                    var keyCode = (window.event) ? e.keyCode : e.which;

                    if (keyCode === 13) {
                        scope.$apply(function () { // bind scope
                            disablingEditing();
                        });
                    }
                });
            }
        }
    })

    .directive('inlineTextarea', function () {
        return {
            template: '<span >' +
            '<span ng-show="!edit" ng-class="{\'redColor\':!value}">{{value||empty}}</span>' +
            '<span ng-show="!edit" ng-transclude></span>'+
            '<textarea ng-show="edit" style="width:{{width}}" class="textarea-inline" rows="{{rows}}" cols1="{{cols}}" ng-model="value">' +
            '</textarea></span>',
            restrict: 'C',
            scope: {
                value: '=',
                empty:"@",
                rows:"@",
                cols:"@"
            },

            transclude: true,
            link: function (scope, element, attribs) {

                /*if(!scope.cols){
                    scope.cols=100;
                }*/
                if(!scope.rows){
                    scope.rows=5;
                }

                /* watch for changes from the controller */
                scope.$watch('inline', function (val) {
                    scope.value = val;
                });

                /* enable inline editing functionality */
                var enablingEditing = function () {
                    scope.edit = true;

                    setTimeout(function () {
                        console.log(element.children().children('input')[2]);
                        element.children().children('input')[2].focus();
                        element.children().children('input').bind('blur', function (e) {
                            scope.$apply(function () {
                                disablingEditing();
                            });
                        });
                    }, 100);
                };


                /* disable inline editing functionality */
                var disablingEditing = function () {
                    scope.edit = false;
                    scope.inline = scope.value;
                };


                /* set up the default */
                disablingEditing();


                /* when the element with the inline attribute is clicked, enable editing */
                element.bind('click', function (e) {

                    if ((e.target.nodeName.toLowerCase() === 'span') || (e.target.nodeName.toLowerCase() === 'img')) {
                        scope.$apply(function () { // bind to scope
                            enablingEditing();
                        });
                    }
                });

                /* allow editing to be disabled by pressing the enter key */
                element.bind('keypress', function (e) {

                    if (e.target.nodeName.toLowerCase() != 'input') return;

                    var keyCode = (window.event) ? e.keyCode : e.which;

                    if (keyCode === 13) {
                        scope.$apply(function () { // bind scope
                            disablingEditing();
                        });
                    }
                });
            }
        }
    })
    .directive('ngPageslideWrapper', function ($document,$timeout,$rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attribs) {
               console.log(element);
                var wrappedID,wrappedClass;
                $timeout(function(){
                    var queryResult = document.getElementsByTagName("body")[0]
                    wrappedID = angular.element(queryResult);
                    var queryResult1 = document.getElementsByClassName("navbar-nav")[0]
                    wrappedClass = angular.element(queryResult1);
                },200)
                $timeout(function(){
                    element.bind('mouseenter', function (event) {
                        console.log('mouseenter');
                        wrappedID.css('overflow-y','hidden')
                        wrappedID.css('margin-right','20px')
                        wrappedClass.css('margin-right','20px')
                    });

                    element.bind('mouseleave', function (event) {
                        console.log('mouseleave');
                        $rootScope.checkedMenu.m=false;
                        console.log($rootScope.checkedMenu)
                        wrappedID.css('overflow-y','scroll')
                        wrappedID.css('margin-right','0')
                        wrappedClass.css('margin-right','0')
                    });
                },300)

            }
        }
    })

    .directive('halfMenu',function($rootScope){
        return {
            link: function (scope, element, attrs) {
                if(!$){return}
                setTimeout(function(){
                    //console.log($(element).height())
                    var height=$(element).height();
                    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams){
                        if(to.name!='home' && !$(element ).hasClass('hafhMenuHeight')){
                            $(element).height(height/2)
                        }else if(to.name=='home' && $(element ).hasClass('hafhMenuHeight')){
                            $(element).height(height)
                        }
                    })
                },50)
            }
        }

    })

var guidGenerator=function() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        console.log((S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()));
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }


'use strict';
    /**
    * getHeight - for elements with display:none
     */
var getHeight = function(el) {
  console.log(el)
        var el_style      = window.getComputedStyle(el),
            el_display    = el_style.display,
            el_position   = el_style.position,
            el_visibility = el_style.visibility,
            el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),

            wanted_height = 0;


        // if its not hidden we just return normal height
        if(el_display !== 'none' && el_max_height !== '0') {
            return el.offsetHeight;
        }

        // the element is hidden so:
        // making the el block so we can meassure its height but still be hidden
        el.style.position   = 'absolute';
        el.style.visibility = 'hidden';
        el.style.display    = 'block';

        wanted_height     = el.offsetHeight;

        // reverting to the original values
        el.style.display    = el_display;
        el.style.position   = el_position;
        el.style.visibility = el_visibility;

        return wanted_height;
    },


    /**
    * toggleSlide mimics the jQuery version of slideDown and slideUp
    * all in one function comparing the max-heigth to 0
     */
    toggleSlide = function(el) {
        var el_max_height = 0;

       /* if(el.getAttribute('data-max-height')) {
            // we've already used this before, so everything is setup
            if(el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
                el.style.maxHeight = el.getAttribute('data-max-height');
            } else {
                el.style.maxHeight = '0';
            }
        } else {
            el_max_height                  = getHeight(el) + 'px';
            el.style['transition']         = 'max-height 0.5s ease-in-out';
            el.style.overflowY             = 'hidden';
            el.style.maxHeight             = '0';
            el.setAttribute('data-max-height', el_max_height);
            el.style.display               = 'block';

            // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
            setTimeout(function() {
                el.style.maxHeight = el_max_height;
            }, 10);
        }*/


        el_max_height                  = getHeight(el) + 'px';
            el.style['transition']         = 'max-height 0.5s ease-in-out';
            el.style.overflowY             = 'hidden';
            el.style.maxHeight             = '0';
            el.setAttribute('data-max-height', el_max_height);
            el.style.display               = 'block';

            // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
            setTimeout(function() {
                el.style.maxHeight = el_max_height;
            }, 10);
    }

/*document.addEventListener("DOMContentLoaded", function(event) { 

  document.querySelector('.showme').addEventListener('click', function(e) {
      toggleSlide(document.querySelector('.text'));
  }, false);
});*/







