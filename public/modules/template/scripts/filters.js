'use strict';

/* Filters */

angular.module('gmall.filters', []).
  filter('interpolate', function (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  })

.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || '');
    };
})
.filter('filterSection', function (version) {
    // http://toddmotto.com/everything-about-custom-filters-in-angular-js/
    return function(input,sectionId) {
        if (sectionId==0)
            return input
        else {
            var temp=[];
            angular.forEach(input, function (item) {
                if (item.category== sectionId) {
                    temp.push(item);
                }
            });
            return temp;
        }
    };
})
.filter('filterSizeIs',function(){
    return function (items,tags) {
        if (!items) return [];
        return items.filter(function (item) {
            var is;
            if (tags.length){
                //console.log('the length is and need to check');
                tags.forEach(function(el){
                   if (el && el.length){
                        //console.log('the length of array tags is and need to check');
                        is=!el.some(function(tag){
                            if (item.store[tag] && !item.store[tag].quantity) {
                                //console.log('no elements');
                                return true;
                            }else {
                                return false
                            }
                        })
                        //return true;
                   } else {
                        //console.log('no length in array tags');
                        is=true
                        //return true;
                   } 
                });
                
            } else {
                //console.log('no length in array filters');
                is=true;
                //return true;
            }
            //console.log(is);
            return is;
          
        });
    };    
})
