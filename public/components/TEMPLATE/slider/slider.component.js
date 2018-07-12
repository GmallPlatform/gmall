'use strict';
(function(){

    angular.module('gmall.directives')
        .directive('gmallSlider',gmallSliderDirective)
        .directive('gmallSliderHome',gmallSliderHomeDirective)
        .directive('gmallSliderHomeNivo',gmallSliderHomeNivoDirective)
        .directive('gmallSliderPage',gmallSliderPageDirective);
    function gmallSliderDirective(){
        return {
            scope: {
                images:"=",
                index:"="
            },
            restrict:"E",
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            template:[
                '<div  class="slider-fade">',
                    '<div class="mytoggle" ng-repeat="slide in $ctrl.images" ng-init="$first && $ctrl.finished()" ng-show="$ctrl.currentIndex==$index">',
                        '<a  href="{{slide.link}}">',
                            '<img class="img-responsive" ng-src="{{slide.img}}">',
                            '<div class="box-overlay"></div>',
                            '<div>',
                                '<h1 ng-bind="slide.name"></h1>',
                                '<p ng-bind-html="slide.desc|unsafe"></p>',
                            '</div>',
                        '</a>',
                    '</div>',
                    '<a ng-click="$ctrl.prev()" class="navleft-carousel">',
                        '<img src="img/icon/back.png">',
                    '</a>',
                    '<a ng-click="$ctrl.next()" class="navright-carousel">',
                        '<img src="img/icon/next.png">',
                    '</a>',
                    '<ol class="carousel-indicators">',
                        '<li ng-repeat="slide in $ctrl.images track by $index" ng-click="$ctrl.setSlide($index)" ng-class="{active:$ctrl.currentIndex==$index}">',
                        '</li>',
                    '</ol>',
                '</div>'
            ].join(''),
            //templateUrl111: 'components/TEMPLATE/slider/slider.html',
        }
    }
    function gmallSliderPageDirective($timeout,$rootScope,global){
        return {
            restrict:"A",
            replace:false,
            link:function(scope,element,attr){
                //console.log('active')
                var index=0;
                var timeSlide=4000;
                if(global.get('mobile').val){
                    timeSlide=3000
                }
                var innerDiv = element.find('.mytoggle-page'),substrate;
                var imgs=[]
                var links=[];
                var lastLink;
                var maxHeight=0;
                innerDiv.each(function (i,div) {
                    //console.log(div,$(div).attr('id'))
                    imgs.push($(div).attr('id'))
                    links.push($(div).find('a'));
                    if(!i){
                        $(div).css('opacity', 1)
                    }
                })
                try{
                    lastLink=links[links.length-1]
                    links= links.map(function (l) {
                        return l.attr('href');
                    })
                }catch (err){console.log(err)}

                element.find('.substrate').each(function(i,div){
                    if(i){return}
                    substrate=$(div);
                    substrate.find('img').each(function(i,img){
                        //console.log(i,img)
                        if(i){return}
                        //console.log(this.complete)
                        var self=this;
                        if(!this.complete){
                            $(this).bind('load', function() {
                                /*console.log(self.complete)
                                 console.log($(this).height())*/

                                var k = 1000+ getRandomInt(100,2000)
                                //console.log('k',k)
                                $timeout(function(){sliderFunc()},k)

                                setHeight($(self).height())
                                $timeout(function () {
                                    $(div).css('opacity', 0)
                                },50)


                            })
                        }else{

                            var k = 1000+ getRandomInt(100,2000)
                            //console.log('k1',k)
                            $timeout(function(){sliderFunc()},k)
                            //console.log(self,$(self).height())
                            setHeight($(self).height())
                            $timeout(function () {
                                $(div).css('opacity', 0)
                            },50)
                        }
                    })
                })

                function next() {
                    //console.log('next',imgs[index],index,innerDiv.length)
                    $('#'+imgs[index]).css('opacity',0)
                    index < innerDiv.length - 1 ? index++ : index = 0;
                    $('#'+imgs[index]).css('opacity',1)
                    try{$(lastLink).attr('href',links[index])}catch (err){console.log(err)}
                };


                function setHeight(h){
                    //console.log(h)
                    innerDiv.each(function(i,div){
                        //console.log(div)
                        //console.log(h,this)
                        $(div).height(h)

                    })
                    /*$timeout(function () {
                        innerDiv.each(function(i,div){
                            var img =$(div).find('img');
                            if(maxHeight<$(img).height()){
                                maxHeight=$(img).height()
                            }
                            if(maxHeight<$(div).height()){
                                maxHeight=$(div).height()
                            }
                        })
                        //console.log(maxHeight)
                        element.find('.substrate').each(function(i,div){
                            $(div).height(maxHeight)
                        })
                    },1500)*/

                }
                var timer;
                function sliderFunc() {
                    timer =  $timeout(function() {
                        //console.log(timer)
                        $timeout.cancel(timer)
                        next();
                        sliderFunc()
                    }, timeSlide);
                };

                $(window).resize(function(){
                    setHeight(element.height())
                })

            }
        }
    }

    var iii=0;
    function gmallSliderHomeDirective($timeout,$compile,global){
        return {
            restrict:"A",
            scope: true,
            link:function(scope,element,attr){

                var timeSlide=4000;
                if(global.get('mobile').val){
                    timeSlide=3000
                }
                var duration = attr['duration']
                //console.log('duration',duration)
                if(duration){
                    try{
                        duration=Number(duration)
                        if(duration>0 && duration<10){
                            timeSlide=duration*1000;
                        }
                    }catch(err){console.log(err)}
                }
                //console.log('timeSlide',timeSlide)
                var number =iii++;var timer;
                var index=0;


                var innerDiv = element.find('.mytoggle'),substrate;
                var innerDivBox = element.find('.box-overlay');
                scope.foo={}
                scope.foo.setSlide=setSlide;
                scope.slideswipeLeft=function () {
                    $timeout.cancel(timer)
                    next()
                }

                scope.slideswipeRight= function() {
                    $timeout.cancel(timer)
                    prev()
                }

                var imgs=[]
                var links=[];
                var ngClick=[]
                var lastLink=[];
                innerDiv.each(function (i,div) {
                    imgs.push($(div).attr('id'));
                    links.push($(div).find('a'));
                    if(!i){
                        $(div).css('opacity', 1)
                    }
                })
                //console.log(links)
                try{
                    lastLink=links[links.length-1]
                    ngClick= links.map(function (l) {
                        return l.attr('ng-click');
                    })
                    links= links.map(function (l) {
                        return l.attr('href');
                    })

                }catch (err){console.log(err)}

                $timeout(function(){
                    element.find('.prev').each(function (i,a) {
                        $(a).click(function(e) {
                            $timeout.cancel(timer)
                            prev()


                        });
                    })
                    element.find('.navright-carousel').each(function (i,a) {
                        $(a).click(function(e) {
                            $timeout.cancel(timer)
                            next()
                        });
                    })
                    element.find('.carousel-box li').each(function (i,li) {
                        $(li).click(function(e) {
                            $timeout.cancel(timer)
                            setSlide(i)
                        });
                    })
                },200)

                var slideMark=[]
                element.find('.set-slide').each(function (i,li) {
                    slideMark.push($(li).attr('id'))
                    if(!i){
                        $(li).addClass('active')
                    }
                })
                element.find('.substrate').each(function(i,div){
                    substrate=$(div);
                    //console.log(substrate.find('img').length)
                    substrate.find('img').each(function(){
                       //console.log(this.complete)
                        var self=this;
                        if(!this.complete){
                            $(this).bind('load', function() {
                                /*console.log(self.complete)
                                 console.log($(this).height())*/
                                $(div).css('opacity', 0)

                                $timeout(function () {
                                    sliderFunc()
                                },500*iii)

                                $timeout(function () {
                                    setHeight($(self).height())
                                    setDivAgainstOverlapping(0,imgs.length-1)
                                },50)

                            })
                        }else{
                            $(div).css('opacity', 0)
                            $timeout(function () {
                                sliderFunc()
                            },1000*iii)
                            //console.log(self)
                            $timeout(function () {
                                setHeight($(self).height())
                                setDivAgainstOverlapping(0,imgs.length-1)
                            },50)

                            //console.log($(this).height())
                        }
                    })
                })
                var slideDelay;
                /*console.log(links)
                console.log(ngClick)*/

                function setDivAgainstOverlapping(idx,oldIdx) {
                    $timeout(function () {
                        $(innerDiv[idx]).insertAfter(innerDiv[oldIdx])
                    },1600)

                }


                function next() {
                    if(slideDelay){return}
                    slideDelay=true
                    $timeout(function () {
                        slideDelay=false
                    },700)
                    var oldIdx=index;
                    $('#'+slideMark[index]).removeClass('active')
                    $('#'+imgs[index]).css('opacity',0)
                    var oldIndex = index;
                    index < innerDiv.length - 1 ? index++ : index = 0;

                    //$('#'+imgs[index]).css('display','block')

                    $('#'+imgs[index]).css('opacity',1)
                    $('#'+slideMark[index]).addClass('active')
                    setDivAgainstOverlapping(index,oldIdx)

                    $timeout(function () {
                        //$('#'+imgs[oldIndex]).css('display','none')
                    },2500)
                };
                function prev(){
                    if(slideDelay){return}
                    var oldIdx=index;
                    slideDelay=true
                    $timeout(function () {
                        slideDelay=false
                    },700)
                    $('#'+slideMark[index]).removeClass('active')
                    $('#'+imgs[index]).css('opacity',0)

                    index == 0 ? index=innerDiv.length - 1  : index--;
                    $('#'+imgs[index]).css('opacity',1)
                    $('#'+slideMark[index]).addClass('active')

                    //try{$(lastLink).attr('href',links[index])}catch (err){console.log(err)}
                    //setLinks(index)
                    setDivAgainstOverlapping(index,oldIdx)

                };
                function setSlide(i) {
                    var oldIdx=index;
                    //console.log(i,scope.timer)
                    $timeout.cancel(timer)
                    $('#'+slideMark[index]).removeClass('active')
                    $('#'+imgs[index]).css('opacity',0)
                    index = i;
                    $('#'+imgs[index]).css('opacity',1)
                    $('#'+slideMark[index]).addClass('active')
                    //try{$(lastLink).attr('href',links[index])}catch (err){console.log(err)}
                    //setLinks(index)
                    //$compile(element)(scope);
                    setDivAgainstOverlapping(index,oldIdx)
                };


                function setHeight(h){
                    //console.log(h)
                    innerDiv.each(function(){
                        var self=this;
                        /*$(this).hover(function () {
                            console.log('in',self)
                        },function () {
                            console.log('out',self)
                        })*/
                        $(this).height(h)
                    })
                }
                function sliderFunc() {
                    timer = $timeout(function() {
                        $timeout.cancel(timer)
                        next();
                        sliderFunc()
                    }, timeSlide);
                };

                scope.zoomSliderImg=function(i,images){
                    //console.log(i,images)
                    global.get('functions').val.zoomImg(index,images)
                }

                $(window).resize(function(){
                    setHeight(element.height())
                })

            }
        }
    }
    function gmallSliderHomeNivoDirective($timeout,global){
        return {
            restrict:"A",
            scope: true,
            link:function(scope,element,attr){
                var options={};
                if(attr.effect){
                    options.effect = attr.effect;
                }else{
                    options.effect='fade'
                }
                if(attr.pausetime){
                    options.pauseTime = Number(attr.pausetime);
                    if(!options.pauseTime || options.pauseTime<2 || options.pauseTime>20){
                        options.pauseTime=3000
                    }else{
                        options.pauseTime=1000*options.pauseTime;
                    }
                }
                options.controlNavThumbs=true;
                //console.log(options)


                $(window).on('load', function() {
                    $(element).nivoSlider(options);
                    var nextEl=$(element).find('.nivo-nextNav')
                    var prevEl=$(element).find('.nivo-prevNav')
                    $(element).bind('swipeleft',function(e){
                        console.log('left')
                        $(nextEl).trigger('click');
                            e.stopImmediatePropagation();
                            return false;
                    });
                    $(element).bind('swiperight',function(e){
                        console.log('swiperight')
                        $(prevEl).trigger('click');
                        e.stopImmediatePropagation();
                        return false;
                    });
                    /*$(‘#slider’).bind(‘swiperight’,function(e){
                        $(‘#slider img’).attr(“data-transition”,“slideInRight”);
                        $(‘a.nivo-prevNav’).trigger(‘click’);
                        e.stopImmediatePropagation();
                        returnfalse;}
                    );*/



                });
                return;



                var imgs=[]
                var links=[];
                var lastLink=[];
                innerDiv.each(function (i,div) {
                    imgs.push($(div).attr('id'));
                    links.push($(div).find('a'));
                    if(!i){
                        $(div).css('opacity', 1)
                    }
                })
                //console.log(imgs)
                try{
                    lastLink=links[links.length-1]
                    links= links.map(function (l) {
                        return l.attr('href');
                    })
                }catch (err){console.log(err)}

                $timeout(function(){
                    element.find('.prev').each(function (i,a) {
                        $(a).click(function(e) {
                            $timeout.cancel(timer)
                            prev()


                        });
                    })
                },200)

                var slideMark=[]
                element.find('.set-slide').each(function (i,li) {
                    slideMark.push($(li).attr('id'))
                    if(!i){
                        $(li).addClass('active')
                    }
                })
                element.find('.substrate').each(function(i,div){
                    substrate=$(div);
                    //console.log(substrate.find('img').length)
                    substrate.find('img').each(function(){
                        //console.log(this.complete)
                        var self=this;
                        if(!this.complete){
                            $(this).bind('load', function() {
                                /*console.log(self.complete)
                                 console.log($(this).height())*/
                                $(div).css('opacity', 0)

                                $timeout(function () {
                                    sliderFunc()
                                },500*iii)

                                $timeout(function () {
                                    setHeight($(self).height())
                                },50)

                            })
                        }else{
                            $(div).css('opacity', 0)
                            $timeout(function () {
                                sliderFunc()
                            },1000*iii)
                            //console.log(self)
                            $timeout(function () {
                                setHeight($(self).height())
                            },50)

                            //console.log($(this).height())
                        }
                    })
                })
                var slideDelay;
                function next() {
                    if(slideDelay){return}
                    slideDelay=true
                    $timeout(function () {
                        slideDelay=false
                    },700)
                    var oldIdx=index;
                    $('#'+slideMark[index]).removeClass('active')
                    $('#'+imgs[index]).css('opacity',0)
                    var oldIndex = index;
                    index < innerDiv.length - 1 ? index++ : index = 0;

                    //$('#'+imgs[index]).css('display','block')

                    $('#'+imgs[index]).css('opacity',1)
                    $('#'+slideMark[index]).addClass('active')
                    try{$(lastLink).attr('href',links[index])}catch (err){console.log(err)}

                    $timeout(function () {
                        //$('#'+imgs[oldIndex]).css('display','none')
                    },2500)
                };
                function prev(){
                    if(slideDelay){return}
                    slideDelay=true
                    $timeout(function () {
                        slideDelay=false
                    },700)
                    $('#'+slideMark[index]).removeClass('active')
                    $('#'+imgs[index]).css('opacity',0)

                    index == 0 ? index=innerDiv.length - 1  : index--;
                    $('#'+imgs[index]).css('opacity',1)
                    $('#'+slideMark[index]).addClass('active')

                    try{$(lastLink).attr('href',links[index])}catch (err){console.log(err)}

                };
                function setSlide(i) {
                    //console.log(i,scope.timer)
                    $timeout.cancel(timer)
                    $('#'+slideMark[index]).removeClass('active')
                    $('#'+imgs[index]).css('opacity',0)
                    index = i;
                    $('#'+imgs[index]).css('opacity',1)
                    $('#'+slideMark[index]).addClass('active')
                    try{$(lastLink).attr('href',links[index])}catch (err){console.log(err)}
                };


                function setHeight(h){
                    //console.log(h)
                    innerDiv.each(function(){
                        var self=this;
                        /*$(this).hover(function () {
                         console.log('in',self)
                         },function () {
                         console.log('out',self)
                         })*/
                        $(this).height(h)
                    })
                }
                function sliderFunc() {
                    timer = $timeout(function() {
                        $timeout.cancel(timer)
                        next();
                        sliderFunc()
                    }, timeSlide);
                };

                scope.zoomSliderImg=function(i,images){
                    //console.log(i,images)
                    global.get('functions').val.zoomImg(index,images)
                }

                $(window).resize(function(){
                    setHeight(element.height())
                })

            }
        }
    }
    itemCtrl.$inject=['$element','$timeout','$scope'];
    function itemCtrl($element,$timeout,$scope){
        var h=0;
        var self = this;
        setTimeout(function(){
            setHeight();
        })
        console.log($scope.images)

        /*$scope.$on('$allImagesLoadedInHomePage', function(){
            console.log('$allImagesLoadedInHomePage')
            console.log('2')
            setHeight()
        })*/
        self.currentIndex = 0;
        self.prev = function() {
            //self.images[self.currentIndex].visible = false;
            self.currentIndex == 0 ? self.currentIndex=self.images.length - 1 : self.currentIndex--;
            self.index=self.currentIndex;
            //self.images[self.currentIndex].visible = true;

        };
        self.next = function() {
            //self.images[self.currentIndex].visible = false;
            self.currentIndex < self.images.length - 1 ? self.currentIndex++ : self.currentIndex = 0;
            self.index=self.currentIndex;
            //self.images[self.currentIndex].visible = true;

        };
        self.setSlide = function(i) {
            //self.images[self.currentIndex].visible = false;
            self.currentIndex =i;
            self.index=self.currentIndex;
            //self.images[self.currentIndex].visible = true;

        };
        var timer;
        var sliderFunc = function() {
            timer = $timeout(function() {
                self.next();
                timer = $timeout(sliderFunc, 3000);
            }, 3000);
        };
        $timeout(function(){sliderFunc();},1000)
        self.finished=function(){
            self.height=0;
            $($element.find('.mytoggle img')[0]).bind('load', function() {
                //console.log('1')
                setHeight()
            })
        }
        function setHeight(){
            self.height=0;
            $element.find('.mytoggle img').each(function() {
                var h=$(this).height();
                /*console.log(this)
                 console.log($(this).height())*/
                if(h>self.height){
                    self.height=h;
                }
            });

            if(self.height>h && self.height>100){
                //console.log(self.height)
                h=self.height;
                $($element[0]).find('.slider-fade').height(self.height)
            }


        }
        $(window).resize(function(){
            h=0;
            setHeight()
        })
        
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

})()

