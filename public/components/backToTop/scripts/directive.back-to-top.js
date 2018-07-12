'use strict';
angular.module('gmall.directives')
.directive('backToTop',[function(){
    return{
        restrict: 'AC',
        link:function(scope,element){
            $(element).hide()
            $(window).scroll(function() {
                if ($(this).scrollTop() > 200) {
                    $(element).fadeIn(400);
                } else {
                    $(element).fadeOut(400);
                }
            });
            element.bind('click',function(){
                $('html, body').animate({
                    scrollTop: 0
                },300);

                return false;
            })
        }
    }
}])
.directive('bounce', [function () {
        return {
            restrict: 'C',
            link: function (scope, iElement, iAttrs) {

                $(window).scroll(function() {
                    if ($(this).scrollTop() < 30) {
                        $(iElement).fadeIn(400);
                    } else {
                        $(iElement).fadeOut(400);
                    }
                });
            }
        };
    }])




