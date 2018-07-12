'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('userShipInfo',userShipInfo)
    function userShipInfo(){
        return {
            scope: {},
            bindToController: true,
            controller: shipInfoCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/user/shipInfo.html',
            restrict:'AE'
        }
    }
    shipInfoCtrl.$inject=['global','$order','exception','$window','$rootScope','$q','$user','$timeout'];
    function shipInfoCtrl(global,$order,exception,$window,$rootScope,$q,$user,$timeout){
        var self=this;
        self.order = $order.getOrder();
        self.global = global;
        self.user = global.get('user');
        self.ok = ok;
        $rootScope.$on('logged',function(){
            self.user = global.get('user');
        })
        $rootScope.$on('loggout',function(){
            self.user.val = {email: '', profile: {}}
        })
        self.changeEmail=changeEmail;

        function changeEmail(){
            $q.when()
                .then(function () {
                    return $user.changeEmail(global.get('user').val._id)
                })
                .then(function (res) {
                    console.log(res)
                    global.get('user').val.email=res
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('change email')(err)
                    }
                })
        }


        function checkPhone(phone) {
            var query = {phone:phone};
            return $q.when()
                .then(function () {
                    return $user.getItem(phone,'profile.phone')
                })
                .then(function(res){
                    if(res){return res}else{return null}
                })
        }



        function ok(formProfile) {
            //console.log(formProfile.$error)
            if (formProfile.$valid) {
                $q.when()
                    .then(function () {
                        if(self.user.val.profile.phone){
                            return $user.getItem(self.user.val.profile.phone,'profile.phone')
                        }else{
                            return null;
                        }

                    })
                    .then(function(res){
                        /*console.log(res)
                        console.log(self.user.val)
                        console.log("!res ",!res)
                        console.log("(res && !res._id)",(res && !res._id))
                        console.log("(res && res._id && res._id==self.user.val._id)",(res && res._id && res._id==self.user.val._id))*/
                        if(!res ||  (res && !res._id) || (res && res._id && res._id==self.user.val._id)){
                            if(global.get('store').val.cartSetting&& global.get('store').val.cartSetting.slide){
                                $rootScope.$emit('cartslide',{event:'shipInfoDone'})
                            }else{
                                $rootScope.$emit('closeShipModal');
                            }
                        }else{

                            self.phoneExist=true;
                            $timeout(function () {
                                self.phoneExist=false;
                            },5000)
                            //console.log(self.phoneExist)
                        }

                    })
            } else {
                if (formProfile.$error) {
                    if (formProfile.$error.required) {
                        formProfile.$error.required.forEach(function (el) {
                            var error = global.get('langNote').val.formError + " "+el.$name+"\n";
                            exception.catcher(global.get('langNote').val.error)(error)
                        })

                    }
                    if (formProfile.$error.pattern) {

                    }
                    if (formProfile.$error.maxlenth) {

                    }
                }
            }
        }
    }

})()
