'use strict';
(function(){

    angular.module('gmall.directives')
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
})()

