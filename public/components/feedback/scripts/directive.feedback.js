'use strict';
angular.module('gmall.directives').directive('feedbackMessage',[function(){
    return {
        restrict:"E",
        scope: {
            modalClose:'&'
        },
        bindToController: true,
        controllerAs: '$ctrl',
        controller:"feedbackCtrl",
        templateUrl:"components/feedback/feedback.html",
        link:function(){
        }
    }
}])
