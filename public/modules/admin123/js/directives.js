'use strict';

/* Directives */
// for material design
angular.module('gmall.directives', []);
angular.module('gmall.filters', [] )
    .filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    })
    .filter('htmlToPlaintext', function() {
        return function(text) {
            return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
    })


