'use strict';
angular.module('gmall.directives')
.directive('lostFocus',['$window',function($window){
    return{
        scope:{
            lostFocus:'&',
            focusElement:'=',
        },
        link:function(scope,element){
            //console.log('lostFocus')
            setTimeout(function () {
                if(scope.focusElement){
                    element[0].focus();
                }
                element.bind('blur', function (e) {
                    setTimeout(function () {
                        //console.log('scope.lostFocus()')
                        scope.lostFocus()
                    })
                });
                element.trigger('change')
            },  500);

            /*scope.$watch('focusElement',function(n){
                if(n){
                    setTimeout(function() {
                        element[0].focus();
                        scope.focusElement=false;
                    });
                }
            })*/
        }
    }
}])

    .directive('focusMe',[function(){
        return{
            scope:{
                focusMe:'=',
            },
            link:function(scope,element){
                scope.$watch('focusMe',function(n){
                    if(n){
                        setTimeout(function() {
                            element[0].focus();
                            scope.focusMe=false;
                        });
                    }
                })
            }
        }
    }])
    .directive('isScrolledIntoView',[function(){
        return {
            scope:{
                isScrolledIntoView:'='
            },
            link:function(scope,elem){
                function isScrolledIntoViewF(elem) {
                    var docViewTop = $(window).scrollTop();
                    var docViewBottom = docViewTop + $(window).height();

                    var elemTop = $(elem).offset().top-150;
                    var elemBottom = elemTop + $(elem).height();

                    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
                }
                $(window).scroll(function(){
                    scope.isScrolledIntoView=isScrolledIntoViewF(elem)
                    scope.$apply()
                })
            }

        }
    }])

