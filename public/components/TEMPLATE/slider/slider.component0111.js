'use strict';
(function(){

    angular.module('gmall.directives')
        .directive('gmallSlider',gmallSliderDirective)
        .directive('gmallSliderHome',gmallSliderHomeDirective)
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
                                $(div).css('opacity', 0)
                                var k = 1000+ getRandomInt(100,2000)
                                //console.log(k)
                                $timeout(function(){sliderFunc()},k)

                                setHeight($(self).height())

                            })
                        }else{
                            $(div).css('opacity', 0)
                            var k = 1000+ getRandomInt(100,2000)
                            //console.log(k)
                            $timeout(function(){sliderFunc()},k)
                            setHeight($(self).height())
                            //console.log($(self).height())
                        }
                    })
                })

                function next() {
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
                function sliderFunc() {
                    var timer = $timeout(function() {
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
    function gmallSliderHomeDirective($timeout,global){
        return {
            restrict:"A",
            link:function(scope,element,attr){

                var number =iii++;var timer;
                //console.log(element,number)
                var index=0;
                var timeSlide=4000;
                if(global.get('mobile').val){
                    timeSlide=3000
                }

                var innerDiv = element.find('.mytoggle'),substrate;
                scope.foo={}
                scope.foo.setSlide=setSlide;
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
                    //*****************************************
                    //https://codepen.io/timohausmann/pen/xdKkA
                    //element.find('img').each(function (i,img) {
                    innerDiv.each(function (i,img) {
                        $(img).hammer().on( "swipe",function(event){
                            //console.log(img,event.gesture.direction)
                            if(event && event.gesture && event.gesture.direction){
                                if(event.gesture.direction=='left'){
                                    //console.log(number,timer)
                                    $timeout.cancel(timer)
                                    next()}
                                else if(event.gesture.direction=='right'){
                                    //console.log(number,timer)
                                    $timeout.cancel(timer)
                                    prev()
                                }
                            }
                        })
                    })
                    //*****************************************
                    element.find('.prev').each(function (i,a) {
                        //console.log(a)
                        $(a).click(function(e) {
                            //console.log('dd',timer)
                            $timeout.cancel(timer)
                            //e.stopPropagation()
                            prev()
                            //$timeout.cancel(timer)
                            /*$timeout(function () {
                             prev()
                             })*/

                        });
                    })
                    element.find('.navright-carousel').each(function (i,a) {
                        //console.log(a)
                        //return;
                        $(a).click(function(e) {
                            //console.log('dd')
                            $timeout.cancel(timer)
                            next()
                            //timer = $timeout(sliderFunc, 4000);
                        });
                    })
                    /*var lis = element.find('.carousel-box li');
                    console.log(lis)*/
                    element.find('.carousel-box li').each(function (i,li) {
                        //console.log(li)
                        $(li).click(function(e) {
                            //console.log(i)
                            //$timeout.cancel(timer)
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
                    //console.log(slideMark)
                    /*$(li).click(function(event) {
                        $timeout.cancel(timer);
                        setSlide(i)
                    });*/
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
                    //console.log('next',index)
                    //$timeout.cancel(timer)
                    var oldIdx=index;
                    $('#'+slideMark[index]).removeClass('active')
                    $('#'+imgs[index]).css('opacity',0)
                    index < innerDiv.length - 1 ? index++ : index = 0;

                    $('#'+imgs[index]).css('opacity',1)
                    $('#'+slideMark[index]).addClass('active')
                    try{$(lastLink).attr('href',links[index])}catch (err){console.log(err)}
                    
                };
                function prev(){
                    if(slideDelay){return}
                    slideDelay=true
                    $timeout(function () {
                        slideDelay=false
                    },700)
                    //console.log('prev',index)
                    //$timeout.cancel(timer)
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
                        $(this).height(h)
                    })
                }
                function sliderFunc() {
                    //$timeout.cancel(number,timer)
                    timer = $timeout(function() {
                        $timeout.cancel(timer)
                        next();
                        sliderFunc()
                        //timer = $timeout(sliderFunc, 2000);
                        //console.log(number,timer)
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

