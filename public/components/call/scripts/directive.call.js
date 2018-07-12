'use strict';
angular.module('gmall.directives')
    .directive('callFromStore',[function(){
        return {
            scope: {
                modalClose:'&',
                stuff:'@'
            },
            restrict:"E",
            bindToController: true,
            controllerAs: '$ctrl',
            controller:"callCtrl",
            templateUrl:"components/call/call.html",
        }
    }])
    .directive('enterPhoneNumder',[function(){
        return {
            scope: {
                enterPhoneNumder:'=',
                changeFoo:'&',
            },
            restrict:"A",
            bindToController: true,
            controllerAs: '$ctrl',
            controller:enterPhoneNumderCtrl,
            templateUrl:"components/call/phoneNumber.html",
        }
    }])
enterPhoneNumderCtrl.$inject=['$scope','global']
function enterPhoneNumderCtrl($scope,global) {
    var self=this;
    self.global=global;
    self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
    self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';
    $scope.$watch(function(){return self.enterPhoneNumder},function(enterPhoneNumder,old){
        if(enterPhoneNumder){
            var phoneCode='+'+enterPhoneNumder.substring(0,enterPhoneNumder.length-10);
            if(self.phoneCodes.getOFA('code',phoneCode)){
                self.phoneCode=phoneCode;
            }
            self.phone=enterPhoneNumder.substring(enterPhoneNumder.length-10)
        }
        /*if(enterPhoneNumder!=old){
            changePhone()
        }*/

    })



    self.changePhone=changePhone;
    self.changeCode=changeCode;

    function changePhone(){
        if(!self.phone){
            self.enterPhoneNumder=''
        }else{
            self.enterPhoneNumder=self.phoneCode.substring(1)+self.phone.substring(0,10);
        }
        //console.log(self.enterPhoneNumder,self.changeFoo)
        if(self.changeFoo && typeof self.changeFoo == 'function'){
            self.changeFoo({phone:self.enterPhoneNumder})
        }
    }
    function changeCode() {
        
    }
}


