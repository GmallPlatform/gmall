'use strict';
angular.module('gmall.directives')
.directive('lostFocus',['$window',function($window){
    return{
        scope:{
            lostFocus:'&',
            focusElement:'=',
        },
        link:function(scope,element){
            setTimeout(function () {
                element.bind('blur', function (e) {
                        scope.lostFocus()
                });
            }, 100);
            scope.$watch('focusElement',function(n){
                if(n){
                    setTimeout(function() {
                        element[0].focus();
                        /*if (!$window.getSelection().toString()) {
                            // Required for mobile Safari
                            this.setSelectionRange(0, this.value.length)
                        }*/
                    });
                }
            })
        }
    }
}])


