'use strict';
angular.module('gmall.directives')
.directive('arrawDown',[function(){
    return{
        tempalte:"<a ng-click='scrollUp()'><h1>ddddd</h1></a>",
        link:function(scope,element){
           scope.scrollUp=function () {
               console.log('fffff')
           }
        }
    }
}])



