'use strict';
angular.module('gmall.directives').directive('chatBox',function($timeout){
    return{
        restrict:'E',
        controller:'chatCtrl',
        scope:{
            state:'@',
            order:'=',
            participant:'=',
            seller:'=',
            user:'=',
            dialog:'=',
            message:'='
        },
        templateUrl:'components/chat/chat.html',
        link:function(scope,element,attribute,ctrl){
            $timeout(function(){
                ctrl.participant=scope.participant;
                ctrl.seller=scope.seller;
                ctrl.order=scope.order;
                ctrl.user=scope.user;
                ctrl.dialog=scope.dialog;
                //ctrl.objDivInnerChat = document.getElementById("innerChat");
                ctrl.getMessages(ctrl.page,ctrl.rows)
                if(scope.message){
                    ctrl.message=scope.message;
                    $timeout(function(){
                        ctrl.sendMessage()
                    },20)

                }

            },10)
        }
    }
})