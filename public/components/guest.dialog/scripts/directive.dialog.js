'use strict';
angular.module('gmall.directives' ).directive('guestDialog',function(){
    return {
        controller:'questDialogCtrl',
        bindToController: true,
        controllerAs: '$ctrl',
        templateUrl:'components/guest.dialog/dialog.html',
        link:function(scope,element,attr,ctrl){
           //console.log('link questDialogCtrl')
        }
    }
})

