'use strict';
(function(){

    angular.module('gmall.directives')
        //.directive('remider-online',reminderDirective)
        .directive('reminderOnline',reminderDirective)

    function reminderDirective(){
        return {
            templateUrl: 'components/ORDERS/online/reminderOnline.html',
        }
    };


})()
