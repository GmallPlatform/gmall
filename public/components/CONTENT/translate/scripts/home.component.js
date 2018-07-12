'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('homeComponent',homeComponent)

    function homeComponent(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: homeComponentCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/homeCmponent/homeComponent.html',
        }
    }

    homeComponentCtrl.$inject=['$scope','$timeout','$http','$rootScope','$q']
    function homeComponentCtrl($scope,$timeout,$http,$rootScope,$q) {
        var self = this;


    }

})()



