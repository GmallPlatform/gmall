'use strict';
angular.module('gmall.directives')
.directive('selectDropDown',['$window',function($window){
    return{
        link:function(scope,element,attrs){
            //console.log(attrs['selectDropDown'])
            var defer=50;
            if(attrs['selectDropDown']=='defer'){
                defer=200;
            }
            setTimeout(function(){
                $(element).dropdown({ "callback": function($dropdown) {
                    // $dropdown is the shiny new generated dropdown element!
                    $dropdown.fadeIn("slow");
                }})
            },defer)
        }
    }
}])


