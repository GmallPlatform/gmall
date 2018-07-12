'use strict';
(function(){
    angular.module('gmall.services')
        .service('Witget', serviceFunction);
    serviceFunction.$inject=['$uibModal','$q','$state','$timeout'];
    function serviceFunction($uibModal,$q,$state,$timeout){
        return {
            show:show,
        }
        function show(){
            $uibModal.open({animation: true,
                templateUrl: 'components/TEMPLATE/witget/index.html',})

        }
    }
})()
