'use strict';
//http://owlgraphic.com/owlcarousel/demos/manipulations.html
angular.module('gmall.directives')
.directive('owlCaruselGallery',['$timeout',function($timeout){
        return{
            restrict: 'AC',
            link:function(scope,element){
                var owl;
                function initCarousel(defer){
                    if(owl){
                        owl.trigger('destroy.owl.carousel');
                    }
                    $timeout(function(){
                        owl = $(element).owlCarousel({
                            items : 5, //10 items above 1000px browser width
                            itemsDesktop : [1000,4], //5 items between 1000px and 901px
                            itemsDesktopSmall : [900,3], // betweem 900px and 601px
                            itemsTablet: [600,2], //2 items between 600 and 0
                            itemsMobile : [400,1] // itemsMobile disabled - inherit from itemsTablet option
                        });
                    },defer)
                }
                scope.$watch(function(){return scope.item.gallery},function(n,o){
                    if (n && !owl){
                        initCarousel(10)
                    }
                    else if (o && n){
                        initCarousel(100)
                    }
                })
                scope.changeIndex=function(){
                    scope.item.gallery.sort(function(a,b){return a.index- b.index});
                    console.log(scope.item.gallery)
                    initCarousel(700)

                }
                scope.deleteElement=function(index){
                    scope.item.gallery.splice(index,1);
                }


                scope.addElement=function(image){
                    var content="<div class='item'><img class='img-responsive' src='"+image.thumb+"'></div>"
                    owl.trigger('add.owl.carousel',[content,0])
                }
                scope.$on('$destroy', function() {
                    owl.trigger('destroy.owl.carousel');
                });
            }
        }
}])






