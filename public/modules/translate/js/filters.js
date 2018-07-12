'use strict';

angular.module('gmall.filters', [] )
.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
})
    .filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }])
    .filter('htmlToPlaintext', function() {
        return function(text) {
            if(text){
                var s = text.replace(/(<[^>]+) style=".*?"/i, '');
                return  s ? String(s).replace(/<[^>]+>/gm, '') : '';
            }

        };
    })
    .filter('htmlToPlaintextWithBr', function() {
        var walk_the_DOM = function walk(node, func) {
            func(node);
            node = node.firstChild;
            while (node) {
                walk(node, func);
                node = node.nextSibling;
            }
        };
        return function(markup) {
            var wrapper = document.createElement('div');
            wrapper.innerHTML= markup;
            walk_the_DOM(wrapper, function(el) {
                if(el.removeAttribute) {
                    el.removeAttribute('id');
                    el.removeAttribute('style');
                    el.removeAttribute('class');
                }
            });
            var result = wrapper.innerHTML;
            var arr = result.split('<br>')
            arr.forEach(function(s,i){
                //console.log(s)
                arr[i]=s.replace(/<[^>]+>/gm, '')
            })
            //console.log(arr.join('<br>'))
            //console.log($(wrapper).find(':not(br)').contents().unwrap())
            return result
        };
    })



 
