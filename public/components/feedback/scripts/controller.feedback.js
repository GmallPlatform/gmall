'use strict';

angular.module('gmall.controllers')
.controller('feedbackCtrl',['$scope','global','$notification','toaster','CreateContent','$email','$rootScope','exception',function($scope,global,$notification,toaster,CreateContent,$email,$rootScope,exception){

    self=this;
    $scope.feedbackCtrl=this;
    self.global=global

    var note={addressee:'seller',type:'feedback',content:''};
    note.seller=global.get('store' ).val.seller._id;
    //console.log(global.get('store' ).val.feedbackEmail)
    $scope.feedbackCtrl.sendMessage=function(form){
        if($scope.feedbackCtrl.blockButton){return};
        if(form.$valid) {
            $scope.feedbackCtrl.blockButton=true;
            note.content=$scope.feedbackCtrl.message;
                //CreateContent.callbackCtrl($scope.callbackCtrl.message);
            //$notification.save(o);
            var content=$scope.feedbackCtrl.message+"<br />"+$scope.mainFrameCtrl.feedback.name+
                "<br />"+$scope.mainFrameCtrl.feedback.email;
            var domain=global.get('store').val.domain||global.get('store').val.subDomain;
            var o={email:global.get('store' ).val.feedbackEmail,content:content,
                subject:'обратная связь'+' ✔',from:domain+  '<feedback@'+domain+'>'};
            $email.save(o,function(res){
                $scope.$emit('closeWitget')
                $rootScope.checkedMenuChange('chatMenu',false)
                var pap;
                if (global.get('paps' ) && global.get('paps' ).val && (pap=global.get('paps' ).val.getOFA('action','feedback'))){
                    $rootScope.$state.go('thanksPage',{id:pap.url})
                }
                toaster.pop({
                    type: 'note',
                    title: global.get('langNote').val.sent,
                    body: '',
                    delay:4000,
                    showCloseButton: true,
                });
            },function(err){
                //$scope.$emit('closeWitget')
                console.log(err)
                exception.catcher(global.get('langNote').val.error)(err)

                /*toaster.pop({
                    type: 'error',
                    title: global.get('langNote').val.error,
                    body: '',
                    delay:4000,
                });*/
            })
        }
    }


}])/*feedbackCtrl*/
