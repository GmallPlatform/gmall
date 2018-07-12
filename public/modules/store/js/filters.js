'use strict';
angular.module('gmall.filters', [] )
.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

 
