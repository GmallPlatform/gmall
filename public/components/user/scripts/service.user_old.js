'use strict';
(function(){
    'use strict';
    angular.module('gmall.services')
        .factory('Session',['$resource', function ($resource) {
            return $resource('/api/session/');
        }])
        .factory('User', function ($resource) {
            return $resource('/api/users/:id/:email', {
                id: '@id'
            }, { //parameters default
                update: {
                    method: 'PUT',
                    params: {
                        id:'profile',
                        email:''
                    }
                },
                updateCoupon: {
                    method: 'PUT',
                    params: {
                        id:'coupon',
                        email:''
                    }
                },
                updatePswd: {
                    method: 'PUT',
                    params: {
                        // id:'profile'
                        id:'changepswd',
                        email:''
                    }
                },
                resetPswd: {
                    method: 'POST',
                    params: {
                        id:'resetpswd',
                        email:'@email'
                    }
                },
                get: {
                    method: 'GET',
                    params: {
                        id:'me',
                        email:''
                    }
                },
                checkEmail: {
                    method: 'GET',
                    params: {
                        id:'checkemail',
                       /* email:''*/
                    }
                },
                checkPhone: {
                    method: 'GET',
                    params: {
                        id:'checkphone',
                       /* email:''*/
                    }
                },
                useCoupon: {
                    method: 'GET',
                    params: {
                        id:'useCoupon'
                    }
                },
                cancelCoupon: {
                    method: 'GET',
                    params: {
                        id:'cancelCoupon'
                    }
                },
                repeatMailForConfirm: {
                    method: 'GET',
                    params: {
                        id:'repeatMailForConfirm'
                    }
                },

            });
        })
        .service('$user', userService)
        .service('UserEntry', userEntryService)
        .factory('Account', accountFactory)
        .factory('sendPhoneFactory', sendPhoneFactory)
        .service('SubscibtionList', subscibtionListService)

    userService.$inject=['$resource','$uibModal','$q','Session','User','global','exception','$state','$window','$rootScope','$http'];
    function userService($resource,$uibModal,$q,Session,User,global,exception,$state,$window,$rootScope,$http){
        var Items= $resource('/api/collections/User/:_id',{_id:'@_id'});
        //console.log(userHost)
        this.query=Items.query;
        this.get=Items.get;
        this.delete=Items.delete;
        this.save=Items.save;
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            selectItem:selectItem,
            selectOrCreat:selectOrCreat,
            login:login,
            logout:logout,
            saveProfile:saveProfile,
            newUser:newUser,
            query:Items.query,
            getInfo:getInfo,
            createUser:createUser,
            changePswd:changePswd,
            getInfoBonus:getInfoBonus,
            changeEmail:changeEmail,
            changePhone:changePhone,
            checkEmailForExist:checkEmailForExist,
            checkPhoneForExist:checkPhoneForExist
        }

        function newUser(name,email,password){
            if(!name){
                name=email.split('@')[0]
            }
            return User.save({name: name, email: email,password: password,action:'subscribtion'} ).$promise
                .then( function(user) {
                    $rootScope.emit('CompleteRegistration')
                    //console.log(user)
                    if(global && global.get('user')){global.set('user',user);}
                    if ((global.get('local') && !global.get('local').val) && $window.ga){
                        $window.ga('send', 'event','registration','complete');}
                    if ($state.current.name!='cart' && $state.current.name!='couponDetail'){
                        var states= $state.get();
                        if(global.get('paps') && states.some(function(state){return state.name=='thanksPage'})){
                            var pap = global.get('paps').val.getOFA('action','subscribtion');
                            if (pap && pap.url){
                                $state.go('thanksPage',{url:pap.url})
                            } else {
                                //exception.showToaster('note','Подписка','вы успешно зарегистрировались');
                            }
                        }else{
                            //exception.showToaster('note','Подписка','вы успешно зарегистрировались');
                        }
                    }else {
                        //exception.showToaster('note','Подписка','вы успешно зарегистрировались');
                    }
                    return user;
                })
        }
        function getList(paginate,query){
            //console.log(query)
            if(!paginate){paginate={}}
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }
            function getListFailed(error) {
                /*console.log('XHR Failed for getList.' + error.data);
                console.log(error.data)*/
                return $q.reject(error);
            }
        }
        function getItem(id,param){
            return Items.get({_id:id,param:param}).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function selectItem(query){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/selectUser.html',
                    controller: function($user,$uibModalInstance,query){
                        //console.log(query)
                        var cashQuery=angular.copy(query)
                        var self=this;
                        self.items=[];
                        self.name='';
                        var paginate={page:0,rows:30,items:0}
                        self.search = function(name){
                            var q=angular.copy(query);
                            if (name.length<3){return}
                            //console.log(query)
                            if(q){
                                if (!q.$and){q={$and:[query]}}
                                q.$and.push({$or:[{name:name},{email:name}, {'profile.fio':name}]})
                            }else{
                                q={$or:[{name:name},{email:name}, {'profile.fio':name}]}
                            }
                            //console.log(query)
                            $user.getList(paginate,q).then(function(res){
                                self.items=res;
                            })
                        }
                        self.selectItem=function(item){
                            $uibModalInstance.close(item);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                    size: 'lg',
                    resolve:{
                        query:function(){
                            return query;
                        }
                    }
                });
                modalInstance.result.then(function(item){resolve(item)},function(){reject()});
            })

        }

        function selectOrCreat(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/selectOrCreate.html',
                    controller: function($user,UserEntry,global,$uibModalInstance){
                        var self=this;
                        self.items=[];
                        self.user='';
                        self.oldPhone=null;
                        self.userName='name';
                        self.userEmail='';
                        self.global=global;
                        self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
                        self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';
                        var paginate={page:0,rows:30,items:0}
                        self.refreshUsers=refreshUsers;
                        self.addUser=addUser;
                        self.clearUser=clearUser;
                        function refreshUsers(str){
                            if (str.length<3){return}
                            //var newVal = phone.replace(pattern, '').substring(0,10);
                            //self.oldPhone=phone
                            //if(self.oldPhone==phone){return}else{self.oldPhone=phone}
                            searchUser(str)
                        }
                        var reg = new RegExp(/^\d+$/);
                        function searchUser(str){
                            /*console.log(reg.test(str))
                            console.log(str,jQuery.isNumeric(str))*/
                            if(isNumeric(str)){
                                if(str.length>10){
                                    self.oldPhone=str.substring(0,10);
                                }else{
                                    var d = 10-str.length;
                                    for(var i=0;i<d;i++){
                                        str+='0';
                                    }
                                    self.oldPhone=str
                                }

                                self.userName=''
                            }else{
                                self.oldPhone=null;
                                self.userName=str;
                            }

                            self.users=[]
                            var users=[];
                            var q={$or:[{name:str},{email:str}, {'profile.fio':str},{'profile.phone':str}]}
                            var q1= {$or:[{'phone':str},{name:str},{email:str}]}

                            var acts=[];
                            acts.push(get$user(q))
                            acts.push(getEntryUser(q1))
                            $q.all(acts)
                                .then(function(res){
                                    if(res[0] && res[0].length){
                                        res[0].forEach(function(item){
                                            item.type='user'
                                            users.push(item)
                                        })
                                    }
                                    if(res[1] && res[1].length){
                                        res[1].forEach(function(item){
                                            item.type='userEntry'
                                            users.push(item)
                                        })
                                    }
                                    self.users=users;
                                })


                        }
                        function get$user(q){
                            return $user.getList(paginate,q)
                        }
                        function getEntryUser(q){
                            return  UserEntry.getList(paginate,q)
                        }
                        function addUser(){
                           // console.log('add user')
                            var user={name:self.userName,
                                email:self.userEmail,
                                phone:self.phoneCode.substring(1)+self.oldPhone.substring(0,10),
                                type:"userEntry"
                            }
                            return $q.when()
                                .then(function(){
                                    return UserEntry.save(user).$promise
                                })
                                .then(function(res){
                                    user._id=(res._id)?res._id:res.id;
                                    self.addingUser=false;
                                    self.userName='';
                                    self.user=user;
                                    //console.log(user)
                                    self.oldPhone=''
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('новый клиент')(err)
                                    }
                                })
                        }
                        function clearUser(){
                            self.user=null;
                        }
                        self.ok=function(){
                            $uibModalInstance.close(self.user);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                        function isNumeric(n) {
                            return !isNaN(parseFloat(n)) && isFinite(n);
                        }
                    },
                    controllerAs:'$ctrl',
                    size: 'lg',

                });
                modalInstance.result.then(function(item){resolve(item)},function(){reject()});
            })

        }
        function saveProfile(user){
            return Items.save({update:'profile'},{_id:user._id,profile:user.profile}).$promise;
        }
        function login(){
            return $q(function(resolve,reject){
                if(global.get('user') && global.get('user').val && global.get('user').val._id){
                    return resolve()
                }
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/login-sign.html',
                    controller: loginCtrl2,
                    controllerAs:'$ctrl',
                    //size: 'lg',
                    windowClass:'modalProject',
                    //windowTopClass:'modalTopProject',
                    backdropClass:'modalBackdropClass',
                    //openedClass:'modalOpenedClass'
                });
                $rootScope.$emit('modalOpened')
                modalInstance.result.then(function(item){$rootScope.$emit('modalClosed');resolve(item)},function(){$rootScope.$emit('modalClosed');reject()});
            })

        }
        function getInfo(service){
            service=false;
            service=(service)?'Service':'Good'
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/getInfo.html',
                    controller: getInfoCtrl,
                    controllerAs:'$ctrl',
                    //size: 'lg',
                    windowClass:'modalProject',
                    //windowTopClass:'modalTopProject',
                    backdropClass:'modalBackdropClass',
                    //openedClass:'modalOpenedClass'
                    resolve:{
                        service:function(){return service}
                    }
                });
                $rootScope.$emit('modalOpened')
                modalInstance.result.then(function(item){$rootScope.$emit('modalClosed');resolve(item)},function(){$rootScope.$emit('modalClosed');reject()});
            })

        }
        getInfoCtrl.$inject=['$uibModalInstance','exception','global','User','$q','$http','service',Account];
        function getInfoCtrl($uibModalInstance,exception,global,User,$q,$http,service,Account){
            var self=this;
            self.service=service;
            self.global=global;
            self.user=global.get('user' ).val;
            if(!self.user){
                self.user={email:'',profile:{}};
            }
            self.ok=closeModal;
            function  closeModal(){
                $q.when()
                    .then(function(){
                        // если не авторизированy
                        /*нужен айд пользователя*/
                        if(!self.user._id){
                            return $http.post('/auth/signupOrder',self.user)
                        }else{
                            // обновляем профайл
                            return Items.save({update:'profile'},{_id:self.user._id,profile:self.user.profile}).$promise
                        }
                    })
                    .then(function(response){
                        if(response && response.data && response.data.token){
                            $auth.setToken(response);
                            return Account.getProfile()
                        }else if(response && response.data && response.data._id) {
                            self.user._id = response.data._id;
                        }/*else{
                            $uibModalInstance.dismiss('не получилось авторизировать');
                        }*/

                    })
                    .then(function(){
                        if (global.get('user').val){
                            self.user=global.get('user').val;
                        }
                        $uibModalInstance.close(self.user);
                    })

            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }


        function getInfoBonus(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/getInfoBonus.html',
                    controller: getInfoBonusCtrl,
                    controllerAs:'$ctrl',
                    //size: 'lg',
                    windowClass:'modalProject',
                    //windowTopClass:'modalTopProject',
                    backdropClass:'modalBackdropClass',
                    //openedClass:'modalOpenedClass'
                });
                $rootScope.$emit('modalOpened')
                modalInstance.result.then(function(item){$rootScope.$emit('modalClosed');resolve(item)},function(){$rootScope.$emit('modalClosed');reject()});
            })

        }
        getInfoBonusCtrl.$inject=['$uibModalInstance','exception','global','User','$q','$http','Account','$auth'];
        function getInfoBonusCtrl($uibModalInstance,exception,global,User,$q,$http,Account,$auth){
            var self=this;
            self.global=global;
            self.user=global.get('user').val;
            self.formData=(global.get('store').val.bonusForm)?global.get('store').val.bonusForm:null;
            //console.log(self.formData)
            if(!self.user){
                self.user={email:'',profile:{},addInfo:{}};
            }
            self.ok=closeModal;
            function  closeModal(){
                $q.when()
                    .then(function(){
                        // если не авторизированy
                        /*нужен айд пользователя*/
                        if(!self.user._id){
                            return $http.post('/auth/signupOrder',self.user)
                        }else{
                            // обновляем профайл
                            return Items.save({update:'profile'},{_id:self.user._id,profile:self.user.profile}).$promise
                        }
                    })
                    .then(function(response){
                        if(response && response.data && response.data.token){
                            $auth.setToken(response);
                            return Account.getProfile()
                        }else if(response && response.data && response.data._id) {
                            self.user._id = response.data._id;
                        }

                    })
                    .then(function(){
                        if (global.get('user').val){
                            self.user=global.get('user').val;
                        }
                        $uibModalInstance.close(self.user);
                    })

            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }

        function createUser(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/createUser.html',
                    controller: function($user,$uibModalInstance,$http,$q,exception){
                        var self=this;
                        self.user={profile:{}}
                        self.ok=function(form){
                            if(form.$invalid){return}
                            self.blockButton=true;
                            $q.when()
                                .then(function () {
                                    if(self.user.profile && self.user.profile.phone){
                                        var phone=self.user.profile.phone
                                        //return $user.checkPhoneForExist(phone)
                                        return $user.getItem(phone,'profile.phone')
                                    }else {
                                        return null;
                                    }
                                })
                                .then(function(res){
                                    //console.log(res)
                                    if(res && res._id){throw 'phone exist'}
                                })
                                .then(function(){
                                    return $user.checkEmailForExist(self.user.email)
                                })
                                .then(function(res){
                                    if(res && res.exist){throw 'email exist'}
                                })
                                .then(function(){
                                    var uploadUrl='/api/createUser'
                                    return $http.post(userHost+uploadUrl,self.user);
                                })
                                .then(function(res){
                                    $uibModalInstance.close(res);
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('error')(err)
                                    }
                                    self.blockButton=false;
                                    //$uibModalInstance.dismiss(err);
                                })
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                    //size: 'lg',
                });
                modalInstance.result.then(function(item){resolve(item)},function(){reject()});
            })
        }
        function changeEmail(userId){
            //console.log('userId',userId)
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/changeEmail.html',
                    controller: function($user,global,$uibModalInstance,$http,$q,exception){
                        var self=this;
                        self.global=global;
                        self.checkEmail=checkEmail;
                        self.email=''
                        self.ok=function(){
                            if(!self.cheched){
                                exception.catcher('change email')('email используется')
                                return;
                            }
                            self.blockButton=true;
                            $q.when()
                                .then(function(){
                                    return Items.save({update:'email'},{_id:userId,email:self.email})
                                    //return User.changeEmail({email:self.email,id:userId})
                                })
                                .then(function(res){
                                    $uibModalInstance.close(self.email);
                                })
                                .catch(function(err){
                                    self.blockButton=false;
                                })
                            return;
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                        function checkEmail(email,valid) {
                            if(!valid){
                                self.cheched=false;
                                return;
                            }
                            $q.when()
                                .then(function(){
                                    return $user.checkEmailForExist(email)
                                })
                                .then(function(res){
                                    if(res && !res.exist){
                                        self.cheched=true;
                                    }else{
                                        throw 'email exist'
                                    }
                                    //console.log(self.cheched)
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('change email')(err)
                                    }
                                    self.cheched=false;
                                })
                        }
                    },
                    controllerAs:'$ctrl',
                    windowClass:'modalProject',
                });
                modalInstance.result.then(function(item){resolve(item)},function(){reject()});
            })
        }
        function checkEmailForExist(email,_id) {
            return $q(function (rs,rj) {
                var o={email:email}
                if(_id){
                    o['_id']=_id
                }
                //console.log(o)
                User.checkEmail(o,function (res) {
                    //console.log(res)
                    rs(res)
                },function (err) {
                    //console.log(err)
                  rj(err)
                })

            })
        }
        function checkPhoneForExist(phone,_id) {
            return $q(function (rs,rj) {
                var o={email:phone}
                if(_id){
                    o['_id']=_id
                }
                User.checkPhone(o,function (res) {
                    //console.log(res)
                    rs(res)
                },function (err) {
                    //console.log(err)
                    rj(err)
                })

            })
        }
        function changePhone(userId){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/changePhone.html',
                    controller: function($user,global,$uibModalInstance,$http,$q,exception){
                        var self=this;
                        self.global=global;
                        self.checkPhone=checkPhone;
                        self.email=''
                        self.ok=function(){
                            //console.log(self.phone)
                            if(!self.phone){
                                exception.catcher('change phone')('phone???')
                                return;
                            }
                            self.blockButton=true;
                            $q.when()
                                .then(function () {
                                    return checkPhone(self.phone)
                                })
                                .then(function(){
                                    var o ={_id:userId}
                                    o['profile.phone']=self.phone;
                                    return Items.save({update:'profile.phone'},o)
                                })
                                .then(function(res){
                                    $uibModalInstance.close(self.phone);
                                })
                                .catch(function(err){
                                    exception.catcher('change phone')(err)
                                    self.blockButton=false;
                                })
                            return;
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                        function checkPhone(phone) {
                            return $q.when()
                                .then(function(){
                                    return $user.checkPhoneForExist(phone)
                                })
                                .then(function(res){
                                    if(!res || res.exist){
                                        throw 'phone exist'
                                    }
                                })
                        }
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function(item){resolve(item)},function(){reject()});
            })
        }
        function changePswd(_id){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/changePswd.html',
                    controller: function($user,global,$uibModalInstance,$http,$q,_id){
                        var self=this;
                        self.global=global;
                        self.user={_id:_id,password:''}
                        self.ok=function(){
                            $q.when()
                                .then(function(){
                                    var uploadUrl='/api/changePswd'
                                    return $http.post(userHost+uploadUrl,self.user);
                                })
                                .then(function(res){
                                    $uibModalInstance.close(res);
                                })
                                .catch(function(err){
                                    $uibModalInstance.dismiss(err);
                                })
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                    resolve:{_id:function(){return _id}},
                    windowClass:'modalProject',
                    //size: 'lg',
                });
                modalInstance.result.then(function(item){resolve(item)},function(){reject()});
            })

        }
        function logout(callback) {
            var cb = callback || angular.noop;
            return Session.delete(function() {
                    global.set('user',null);
                    //$rootScope.$broadcast('logout', null);
                    return cb();
                },
                function(err) {
                    return cb(err);
                }).$promise;
        }
        loginCtrl2.$inject=['$scope','$uibModalInstance','exception','global','User','$state']
        function loginCtrl2($scope,$uibModalInstance,exception,global,User,$state){
            var self=this;
            self.global=global;
            //self.closeModal=closeModal;
            $scope.$on('closeWitget',function () {
                //console.log('ssss')
                $uibModalInstance.close()
            })
            /*function  closeModal(action){
                //paps action
                $uibModalInstance.close();
            }*/
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }
        loginCtrl.$inject=['$uibModalInstance','exception','global','User','$state']
        function loginCtrl($uibModalInstance,exception,global,User,$state){
            var self=this;
            // авторизация
            //-- Variables --//
            self.login={};
            self.login.user={email : '',password:''};
            //-- Methods --//
            self.login.resetPswd = function(form) {
                if(form.$valid) {
                    self.submittedReset=true;
                    User.resetPswd({email:self.login.reseteEmail}).$promise
                    /*Auth.resetPswd({email: self.login.reseteEmail,action:'resetPassword'})*/
                        .then( function(data) {
                            exception.showToaster('note','Сброс пароля','информация отправлена на email')
                        })
                        .catch( function(err) {
                            self.errors = {};
                            //console.log(err);
                            if (err.data && err.data.error){
                                form['emailreset'].$setValidity('mongoose', false);
                                self.errors['emailreset'] = err.data.error;
                                exception.catcher('авторизация')(err.data.error);
                            } else {
                                exception.catcher('авторизация')(err.data);
                            }
                        });
                }
            } // end resetPswd

            self.login.login2 =function(form) {
                //console.log(form)
                self.submittedLogin = true;
                if(form.$valid) {
                    return Session.save({email: self.login.user.email, password: self.login.user.password} ).$promise
                        .then(function(user){
                            if(global && global.get('user')){
                                global.set('user',user);
                            }
                            //$rootScope.$broadcast('logged', user);
                            $uibModalInstance.close(user)
                        })
                        .catch( function(err) {

                            err = err.data;
                            console.log(err)
                            self.errors = {};
                            // Update validity of form fields that match the mongoose errors
                            if (err && err.errors){
                                angular.forEach(err.errors, function(error, field) {
                                    console.log(field)
                                    form[field].$setValidity('mongoose', false);
                                    self.errors[field] = error.message;
                                    exception.catcher('авторизация')(error.message)
                                });
                            } else {
                                exception.catcher('авторизация')(err)
                            }
                        });
                }
            }; // end login
            self.signup={};
            self.signup.user = {name:'',email : '',password:''};
            self.signup.signup =function(form) {
                //console.log(form);
                self.submitted = true;
                if(form.$valid) {
                    newUser(self.signup.user.name, self.signup.user.email,
                        self.signup.user.password,'subscribtion')
                        .then(function(user){
                            //console.log(user)
                            $uibModalInstance.close(user);
                            var pap;
                            if (global.get('paps' ) && global.get('paps' ).val && (pap=global.get('paps' ).val.getOFA('action','subscription'))){
                                $state.go('thanksPage',{url:pap.url})
                            }
                        })
                        .catch( function(err) {
                            err = err.data;
                            self.errors = {};
                            if (err && err.error){
                                form['email'].$setValidity('mongoose', false);
                                self.errors['email'] = err.error;
                                exception.catcher('подписка')(err.error)
                            } else {
                                exception.catcher('подписка')(err)
                            }
                        });
                }
            }; // end signup
            self.selectItem=function(item){
                $uibModalInstance.close(item);
            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }
    }
    accountFactory.$inject=['$http','$state','global'];
    function accountFactory($http,$state,global) {
        return {
            getProfile: function() {
                //console.log('ssss')
                var store=global.get('store').val._id;
                return $http.get(userHost+'/api/me/'+store);
            },
            getPermission: function() {
                var store=global.get('store').val._id;
                //console.log(global.get('store').val)
                return $http.get(userHost+'/api/permission/'+store);
            },
            getPermissionTranslator: function() {
                var store=global.get('store').val._id;
                //console.log(global.get('store').val)
                return $http.get(userHost+'/api/permissionTranslator/'+store);
            },
            getPermissionOrder: function() {
                var store=global.get('store').val._id;
                return $http.get(userHost+'/api/permissionOrder/'+store);
            },
            getPermissionMaster: function(master) {
                var store=global.get('store').val._id;
                return $http.get(userHost+'/api/permissionMaster/'+store+'/'+master);
            },
            getEnterButton: function(user) {
                var store=global.get('store').val._id;
                user.frame=$state.get('frame')?$state.get('frame' ).url:null;
                user.store=store;
                return $http.post(userHost+'/api/getEnterButton',user);
            },
            updateProfile: function(profileData) {
                var store=global.get('store').val._id;
                profileData.store=store;
                return $http.put(userHost+'/api/me', profileData);
            },
            unsubscription: function() {
                var store=global.get('store').val._id;
                return $http.get(userHost+'/api/unsubscription/'+global.get('user').val._id);
            }

        };
    }
    subscibtionListService.$inject=['$resource'];
    function subscibtionListService($resource){
        var Items= $resource('/api/collections/SubscribtionList/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            query:Items.query,
            get:Items.get,
        }
        function getList(paginate,query){
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                //.catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                //console.log('XHR Failed for SubscibtionList.' + error);
                throw  error
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return error
            }
        }
    }
    userEntryService.$inject=['$resource','$q'];
    function userEntryService($resource,$q){
        var Items= $resource('/api/collections/UserEntry/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            query:Items.query
        }
        function getList(paginate,query){
            //console.log(query)
            if(!paginate){paginate={}}
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(!paginate.page){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }
            function getListFailed(error) {
                return $q.reject(error);
            }
        }
        function getItem(id,param){
            return Items.get({_id:id,param:param}).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
    }



    sendPhoneFactory.$inject=['$http','$q']
    function sendPhoneFactory($http,$q) {
        return {
            sendCodeToPhone:sendCodeToPhone,
            verifyCode:verifyCode
        }

        function sendCodeToPhone(phone) {
            if(!phone){return}
            var o = {phone:phone}
            return $q.when()
                .then(function () {
                    return $http.post('/api/users/sendSMS',o)
                })
        }
        function verifyCode(code,phone) {
            var o = {code:code,phone:phone}
            return $q.when()
                .then(function () {
                    return $http.post('/api/users/verifySMScode',o)
                })


        }
    }

})()

