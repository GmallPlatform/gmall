'use strict';
angular.module('gmall.directives')
    //https://github.com/deltreey/angular-simple-focus/blob/master/simple-focus.js
.directive('focusElement',['$timeout',function($timeout){
    return{
        scope:{
            focusElement:'=',
        },
        link:function($scope, $element, $attr){
            $scope.$watch('focusElement', function(value) {
                console.log(value)
                if (value) {
                    setTimeout(function(){
                        $element[0].focus();
                        $scope.focusElemen=false;
                    },200)
                    return;
                }
            })
        }
    }
}])
    .directive('simpleFocusElement',[function(){
        return{
            restrict: 'A',
            link:function(scope,element,attrs){
                setTimeout(function() {
                    element[0].focus();
                    //console.log(element[0])
                },300);
                if(attrs.simpleFocusElement=='false'){
                    console.log('focus',element[0])
                    //element[0].focus();
                    setTimeout(function() {
                        element[0].focus();
                    },200);
                }

            }
        }
    }])
    //http://stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field
    .directive('focusMe1', function($timeout, $parse) {
        return {
            //scope: true,   // optionally create a child scope
            link: function(scope, element, attrs) {
                var model = $parse(attrs.focusMe);
                scope.$watch(model, function(value) {
                    console.log('value=',value);
                    if(value === true) {
                        $timeout(function() {
                            element[0].focus();
                            //https://docs.angularjs.org/error/$rootScope/inprog?p0=$apply
                        },300, false);
                    }
                });
                // to address @blesh's comment, set attribute value to 'false'
                // on blur event:
                element.bind('blur', function() {
                    console.log('blur');
                    scope.$apply(model.assign(scope, false));
                });
            }
        };
    })
.directive('focusMe', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.focusMe, function(value) {
                if(value === true) {
                    //console.log('value=',value);
                    $timeout(function() {
                        element[0].focus();
                        scope[attrs.focusMe] = false;
                    },300,false);
                }
            });
        }
    };
});


