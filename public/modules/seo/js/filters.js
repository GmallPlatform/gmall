'use strict';
angular.module('gmall.filters', [] )
.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
})
    .filter('htmlToPlaintext', function() {
        return function(text) {
            if(text){
                var s = text.replace(/(<[^>]+) style=".*?"/i, '');
                return  s ? String(s).replace(/<[^>]+>/gm, '') : '';
            }

        };
    })

 
