'use strict';

/* Directives */
// for material design
angular.module('gmall.directives', [])

.directive('emptyList',['$timeout',function($timeout){
    return {
        restrict:'E',
        scope:{
            items:"=items",
            message:'@'
        },
        template:'<div ng-if="show" class="alert alert-dismissible alert-warning">' +
        '<h3 ng-bind="message"></h3></div>',
        link:function(scope, element){
            scope.$watch('items',function(n,o){
                if(n===0){
                    scope.show=true;
                }else{
                    scope.show=false;
                }
            })
        }
    }
}])
    .directive('contentLoaded', ['$timeout','$rootScope','anchorSmoothScroll',function ($timeout,$rootScope,anchorSmoothScroll){
        return {
            restrict: 'AC',
            link: function (scope, element, attr) {
                /*$rootScope.$on('$allImagesLoadedInHomePage',function(){
                 $(element).fadeOut();
                 });*/
                $rootScope.$on('$stateChangeStartToStuff',function(){
                    //console.log('$stateChangeStartToStuff')
                    $(element).fadeIn();
                });
                $rootScope.$on('$stateChangeEndToStuff',function(){
                    //console.log('$stateChangeEndToStuff')
                    $(element).fadeOut();
                });
            }

        }
    }])
