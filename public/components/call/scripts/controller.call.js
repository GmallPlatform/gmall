'use strict';
angular.module('gmall.controllers')
.controller('callCtrl',['$scope','global','$notification','toaster','CreateContent','$rootScope','$http','exception','$q','$email','$attrs',function($scope,global,$notification,toaster,CreateContent,$rootScope,$http,exception,$q,$email,$attrs){

    self=this;
    self.global=global;



    $scope.callCtrl=this;
    self.user=(global.get('user').val)?global.get('user'):{val:{profile:{phone:'',fio:''}}};
    $scope.phoneNumberPattern = (function() {
        var regexp = /^([0-9\(\)\/\+ \-]*)$/;
        return {
            test: function(value) {
                if( $scope.requireTel === false ) {
                    return true;
                }
                return regexp.test(value);
            }
        };
    })();
    var o={addressee:'seller',type:'call',content:''};
    o.seller=global.get('store' ).val.seller._id;

    $scope.callCtrl.pushNotification=function(form){

        //console.log($scope.callCtrl.blockButton,form.$valid)
        if($scope.callCtrl.blockButton){return};
        if(form.$valid) {
            $scope.callCtrl.blockButton=true;
            o.content=global.get('langOrder').val.requestacallback+' '+self.user.val.profile.phone+((self.user.val.fio)?' '+self.user.val.fio:'')+' '+moment().format('LLLL');

            if(self.stuff){
                o.content +=','+self.stuff
            }
            //console.log(self.user.val.profile.phone)
            /*$rootScope.checkedMenu.chatMenu=false;
            if(self.modalClose && typeof self.modalClose=='function'){
                self.modalClose();
            }
            $scope.$emit('closeWitget')*/

            sendMessage(o.content)

            $scope.$emit('closeWitget')
            $rootScope.checkedMenuChange('chatMenu',false)

            $notification.save(o,function(res){
                toaster.pop({
                    type: 'note',
                    title: global.get('langNote').val.sent,
                    body: '',
                    delay:3000,
                    showCloseButton: true,
                });
                $scope.callCtrl.blockButton=false;
            },function(err){
                toaster.pop({
                    type: 'error',
                    title: global.get('langNote').val.error,
                    body: '',
                    delay:3000,
                    showCloseButton: true,
                });
            })
            var pap;
            if (global.get('paps' ) && global.get('paps' ).val && (pap=global.get('paps' ).val.getOFA('action','call'))){
                $rootScope.$state.go('thanksPage',{id:pap.url})
            }

            // отпраыка письма pap

        }
    }

    function sendMessage(textForSend) {
        /*if($attrs.stuff){
            console.log($attrs.stuff)
        }*/
        self.dataForSend={}
        self.dataForSend.phone= global.get('store').val.seller.phone;
        self.dataForSend.text=textForSend
        self.dataForSend.userId=md5www(global.get('store').val.subDomain)
        self.dataForSend.onlyText=true;
        //console.log(self.dataForSend)
        return $q.when()
            .then(function () {
                return $http.post('/api/users/sendMessageAboutDealFromServer',self.dataForSend)
            })
            .catch(function (err) {
                sendEmail(self.dataForSend)
                /*if(err){
                    exception.catcher('send message')(err)
                }*/
            })
    }
    function sendEmail(data) {
        if(!global.get('store').val.feedbackEmail){return}
        //console.log(global.get('store').val)
        var domain=global.get('store').val.domain;
        var o={email:[global.get('store').val.feedbackEmail],content:data.text,
            subject:global.get('lang').val.callorder+' ✔',from:  global.get('store').val.name+'<'+global.get('store').val.subDomain+'@'+domain+'>'};
        //console.log(o)
        $q(function(resolve,reject){$email.save(o,function(res){resolve()},function(err){resolve()} )})

    }



}])/*callCtrl*/
