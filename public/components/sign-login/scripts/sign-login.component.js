'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('userSign',userSign)
        .directive('subscriptionAdd',subscriptionAdd)
        .directive('userSignShort',userSignShort)
        .directive('userLogin',userLogin)
        .directive('userLoginPhone',userLoginPhone)
        .directive('enterButton',enterButton);

    function userSign(){
        return {
            scope: {
                closeModal:'&',
                toaster:'@',
                social:'=',

            },
            bindToController: true,
            controller: signupCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/sign-login/sign.html',
            restrict:'AE'
        }
    }
    function subscriptionAdd(){
        return {
            scope: {
                closeModal:'&',
                toaster:'@',
            },
            bindToController: true,
            controller: signupCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/sign-login/subscriptionAdd.html',
            restrict:'AE'
        }
    }
    function userSignShort(){
        return {
            scope: {
                toaster:'@',
                buttonName:'@'
            },
            bindToController: true,
            controller: signupCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/sign-login/sign-short.html',
            restrict:'AE'
        }
    }
    function userLogin(){
        return {
            scope: {
                closeModal:'&',
                modalClose:"&",
                toaster:'@',
                social:'=',
                successFoo:'&',

            },
            bindings: {
                toaster:'<',
                social:'=',
                successFoo:'&',
            },


            bindToController: true,
            controller: loginCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/sign-login/login.html',
            restrict:'AE'
        }
    }
    function userLoginPhone(){
        return {
            scope: {
                closeModal:'&',
                modalClose:"&",
                toaster:'@',
                social:'=',
                successFoo:'&',

            },
            bindings: {
                toaster:'<',
                social:'=',
                successFoo:'&',
            },


            bindToController: true,
            controller: loginPhoneCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/sign-login/loginPhone.html',
            restrict:'AE'
        }
    }
    function enterButton(){
        return {
            scope: {
                toaster:'@',
            },
            bindToController: true,
            controller: enterButtonCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/sign-login/enter-button.html',
            restrict:'AE'
        }
    }
    signupCtrl.$inject=['$scope','$auth', 'toaster','$q','global','Account','$state','Stuff','CreateContent','$email','exception'];
    function signupCtrl($scope,$auth, toaster,$q,global,Account,$state,Stuff,CreateContent,$email,exception){
        var self=this;
        self.global=global;
        self.formData=(global.get('store').val.bonusForm)?global.get('store').val.bonusForm:{phone:true,fields:[]}
        self.user={email:'',profile:{},addInfo:{}};
        if(!self.buttonName){self.buttonName=='подписаться!!'}
        //console.log(self.buttonName)

        self.signup=signup;
        self.authenticate=authenticate;


        function signup(form) {
            if(!form.$valid){retrun}
            self.user.store=global.get('store').val._id;
            $auth.signup(self.user)
                .then(function(response) {
                    //console.log(response)
                    if(response && response.data &&  response.data.token){
                        if(response.data.token=='update'){
                            $scope.$emit('closeWitget')
                            toaster.info(response.data.message);
                            throw null;
                        }else{
                            $auth.setToken(response);
                            var msg = global.get('langNote').val.subscriptionSuccess;
                            toaster.info(msg);
                            return Account.getProfile()
                        }
                    } else{
                        throw response;
                    }

                })
                .then(function(response){
                    $scope.$emit('closeWitget')
                    //console.log(response)
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                        $scope.$emit('cartslide',{event:'signLogin'})
                        if($state.current.name=='cart' || $state.current.name=='stuffs.stuff'){return}
                        //if(!response){return;}
                        var states= $state.get();
                        //console.log(global.get('paps'))
                        if(global.get('paps') && global.get('paps').val && states.some(function(state){return state.name=='thanksPage'})){
                            var pap = global.get('paps').val.getOFA('action','subscription');
                            if(pap && pap.url){
                                $state.go('thanksPage',{id:pap.url})
                            }
                        }
                    }

                })
                .then(function () {
                    if(self.user.type=="subscription"){
                        //console.log(global.get('coupons').val);
                        if(global.get('coupons') && global.get('coupons').val && global.get('coupons').val.length){
                            return [{imgs:global.get('coupons').val}]
                        }
                    }else if (self.user.type=='subscriptionAdd'){
                        var p={page:0,rows:100};
                        var query={$and:[{orderType:4},{actived:true}]}
                        return Stuff.getList(p,query);
                    }

                })
                .then(function (stuffs) {
                    //console.log(stuffs)
                    if(!stuffs || !stuffs.length){return}
                    if(!self.user || !self.user.email){throw 'нет email'}
                    var content=CreateContent.emailBonus(stuffs);
                    var bonus=global.get('langNote').val.getBonus;
                    var domain=global.get('store').val.domain;
                    var o={email:self.user.email,content:content,
                        subject:bonus+' ✔',from:  '<promo@'+domain+'>'};
                    return $q(function(resolve,reject){
                        $email.save(o,function(res){
                            exception.showToaster('note','',global.get('langNote').val.emailSent);
                            resolve()
                        },function(err){
                            exception.showToaster('warning',global.get('langNote').val.error,err.data)
                            resolve()
                        } )
                    })
                })
                .catch(function(err){
                    if(err){
                        toaster.error(err.data.message,err.status);
                    }
                })
        };
        function authenticate(provider) {
            $auth.authenticate(provider)
                .then(function(response) {
                    $scope.$emit('closeWitget')
                    $auth.setToken(response);
                    var msg = global.get('langNote').val.subscriptionSuccess;
                    toaster.info(msg);

                    /*if(self.toaster){
                        toaster.success('Вы успешно подписались с помощью ' + provider + '!');
                    }*/
                })
                .then(function(){
                    return Account.getProfile()
                })
                .then(function(response){
                    console.log(response)
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                        $scope.$emit('cartslide',{event:'signLogin'})
                    }
                })
                .catch(function(error) {
                    if(self.toaster){
                        if (error.error) {
                            // Popup error - invalid redirect_uri, pressed cancel button, etc.
                            toaster.error(error.error);
                        } else if (error.data) {
                            // HTTP response error from server
                            toaster.error(error.data.message, error.status);
                        } else {
                            toaster.error(error);
                        }
                    }

                });
        };



    }
    loginCtrl.$inject=['$scope','$auth', 'toaster','$q','global','Account','exception','sendPhoneFactory','$timeout'];
    function loginCtrl($scope,$auth, toaster,$q,global,Account,exception,sendPhoneFactory,$timeout){


        var self=this;
        self.$onInit=function () {
            //console.log($scope.toaster,$scope.successFoo,self.toaster)
        }

        self.login=login;
        self.authenticate=authenticate;
        self.sendCodeToPhone=sendCodeToPhone;
        self.verifyCode=verifyCode;
        self.global=global;
        self.phone=null;
        self.codeSent;
        self.sendCodeDisable;
        self.sendVerifyCodeDisable;
        function login(form){
            //console.log(form)
            if(!form.$valid){retrun}
            self.user.store=global.get('store').val._id;
            $auth.login(self.user)
                .then(function() {
                    //console.log($scope.successFoo,self.toaster)
                    if(self.successFoo){
                        self.successFoo();
                    }else{
                        $scope.$emit('closeWitget')
                    }

                    if(self.toaster){
                        toaster.info(global.get('langNote').val.authComplite);
                    }
                })
                .then(function(){
                    //console.log(Account.getProfile())
                    return Account.getProfile()
                })
                .then(function(response){
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                        $scope.$emit('cartslide',{event:'signLogin'})
                    }
                    $timeout(function () {
                        $scope.$emit('closeWitget')
                    },50)

                })
                .catch(function(err) {
                    global.set('user',null);
                    if(self.toaster){
                        exception.catcher('login')(err);
                    }
                });
        }
        function authenticate(provider) {
            $auth.authenticate(provider)
                .then(function(response) {
                    //console.log(response)
                    $scope.$emit('closeWitget')
                    if(self.successFoo && typeof self.successFoo=='function'){
                        self.successFoo();
                    }else{
                        $scope.$emit('closeWitget')
                    }

                    var msg = global.get('langNote').val.authComplite;
                    toaster.info(msg);
                })
                .then(function(){
                    return Account.getProfile()
                })
                .then(function(response){
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                        $scope.$emit('cartslide',{event:'signLogin'})
                    }
                })
                .catch(function(error) {
                    if(self.toaster){
                        if (error.error) {
                            // Popup error - invalid redirect_uri, pressed cancel button, etc.
                            toaster.error(error.error);
                        } else if (error.data) {
                            // HTTP response error from server
                            toaster.error(error.data.message, error.status);
                        } else {
                            toaster.error(error);
                        }
                    }

                });
        };
        function sendCodeToPhone() {
            if(self.sendCodeDisable){return}
            self.sendCodeDisable=true;
            console.log(self.phone)
            if(!self.phone){
                return;
            }
            $q.when()
                .then(function () {
                    return sendPhoneFactory.sendCodeToPhone(self.phone)
                })
                .then(function () {
                    self.codeSent=true;
                    exception.showToaster('info','send code','success')
                    $timeout(function () {
                        self.sendCodeDisable=false
                    },10000)
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('send code')(err)
                    }
                    $timeout(function () {
                        self.sendCodeDisable=false
                    },10000)
                })
        }
        function verifyCode(form) {
            if(self.sendVerifyCodeDisable){return}
            if(form.$invalid){return}
            /*if(!self.phone){
                exception.catcher('verify code')('phone is empty')
            }
            if(!code){
                exception.catcher('verify code')('code is empty')
            }*/
            if(!self.code || !self.phone){
                return;
            }
            self.sendVerifyCodeDisable=true;
            $q.when()
                .then(function () {
                    return sendPhoneFactory.verifyCode(self.code,self.phone)
                })
                .then(function (response) {
                    //console.log(response)
                    exception.showToaster('info','verify code','success')
                    $timeout(function () {
                        self.sendVerifyCodeDisable=false
                    },5000);
                    if(response && response.data &&  response.data.token){
                        $auth.setToken(response);
                        return Account.getProfile()
                    }else{throw 'wrong response'}
                })
                .then(function(response){
                    if(self.successFoo){
                        self.successFoo();
                    }else{
                        $scope.$emit('closeWitget')
                    }
                    $scope.$emit('closeWitget')
                    if(self.toaster){
                        toaster.info(global.get('langNote').val.authComplite);
                    }
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                        $scope.$emit('cartslide',{event:'signLogin'})
                    }

                })
                .catch(function (err) {
                    self.wrongCode=true;
                    global.set('user',null);
                    if(err){
                        exception.catcher('verify code')(err)
                    }
                    $timeout(function () {
                        self.sendVerifyCodeDisable=false
                    },5000)
                })
        }


    };
    function enterButtonCtrl(toaster,$q,Account,global,exception){
        var self=this;
        self.global=global;
        self.getEnterButton=getEnterButton;
        function getEnterButton(form){
            if(form.$invalid){return}
            $q.when()
                .then(function(){
                    self.blockButton=true;
                    setTimeout(function(){
                        self.blockButton=false
                    },1000)
                    return Account.getEnterButton(self.user)
                })
                .then(function(response) {

                    if(self.toaster){
                        toaster.info(response.data.message);
                    }
                })
                .catch(function(err) {
                    //console.log(err)
                    if(err){
                        exception.catcher(global.get('langNote').val.error)(err);
                    }

                });
        }
    };

    loginPhoneCtrl.$inject=['$scope','$auth', 'toaster','$q','global','Account','exception','sendPhoneFactory','$timeout','$user'];
    function loginPhoneCtrl($scope,$auth, toaster,$q,global,Account,exception,sendPhoneFactory,$timeout,$user){


        var self=this;
        self.$onInit=function () {
            //console.log($scope.toaster,$scope.successFoo,self.toaster)
        }

        self.sendCodeToPhone=sendCodeToPhone;
        self.verifyCode=verifyCode;
        self.global=global;
        self.phone=null;
        self.name='';
        self.codeSent;
        self.sendCodeDisable;
        self.sendVerifyCodeDisable;




        function sendCodeToPhone() {
            if(self.sendCodeDisable){return}
            self.sendCodeDisable=true;
            //console.log(self.phone)
            if(!self.phone){
                return;
            }
            $q.when()
                .then(function(){
                    return sendPhoneFactory.checkPhone(self.phone)
                })
                .then(function (res) {
                    console.log(res)
                    if(!res || !res._id){
                        return $user.newUserByPhone(self.name,self.phone)
                    }
                })
                .then(function () {
                    console.log('sendPhoneFactory.sendCodeToPhone(self.phone)')
                    return sendPhoneFactory.sendCodeToPhone(self.phone)
                })
                .then(function () {
                    self.codeSent=true;
                    exception.showToaster('info','send code','success')
                    $timeout(function () {
                        self.sendCodeDisable=false
                    },10000)
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('send code')(err)
                    }
                    $timeout(function () {
                        self.sendCodeDisable=false
                    },10000)
                })
        }
        function verifyCode(form) {
            if(self.sendVerifyCodeDisable){return}
            if(form.$invalid){return}
            /*if(!self.phone){
             exception.catcher('verify code')('phone is empty')
             }
             if(!code){
             exception.catcher('verify code')('code is empty')
             }*/
            if(!self.code || !self.phone){
                return;
            }
            self.sendVerifyCodeDisable=true;
            $q.when()
                .then(function () {
                    return sendPhoneFactory.verifyCode(self.code,self.phone)
                })
                .then(function (response) {
                    //console.log(response)
                    exception.showToaster('info','verify code','success')
                    $timeout(function () {
                        self.sendVerifyCodeDisable=false
                    },5000);
                    if(response && response.data &&  response.data.token){
                        $auth.setToken(response);
                        return Account.getProfile()
                    }else{throw 'wrong response'}
                })
                .then(function(response){
                    if(self.successFoo){
                        self.successFoo();
                    }else{
                        $scope.$emit('closeWitget')
                    }
                    $scope.$emit('closeWitget')
                    if(self.toaster){
                        toaster.info(global.get('langNote').val.authComplite);
                    }
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                        $scope.$emit('cartslide',{event:'signLogin'})
                    }

                })
                .catch(function (err) {
                    self.wrongCode=true;
                    global.set('user',null);
                    if(err){
                        exception.catcher('verify code')(err)
                    }
                    $timeout(function () {
                        self.sendVerifyCodeDisable=false
                    },5000)
                })
        }


    };

})()
