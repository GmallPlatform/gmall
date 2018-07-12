'use strict';
angular.module('gmall.directives')
.directive('growlNotification',[function(){
    return{
        restrict:"AE",
        scope:{msg:'='},
        templateUrl:"components/growlNotification/growlNotification.html",
        link:function(scope,element,arrts){
            $(element ).hide();
            scope.$watch('msg',function(n){
                if(n){
                    $(element).fadeIn(500);
                    setTimeout(function(){
                        $(element ).fadeOut(500);
                        scope.msg=null;
                    },2000)
                }
            })
        }
    }
}])



