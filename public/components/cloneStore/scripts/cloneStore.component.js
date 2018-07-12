(function(){
    'use strict';
    angular.module('gmall.services')
        .service('cloneStore', cloneStoreService)

    cloneStoreService.$inject=['$resource','$uibModal','$q','exception','$user','global','Account','$window','$rootScope','$timeout','Store','$http'];
    function cloneStoreService($resource,$uibModal,$q,exception,$user,global,Account,$window,$rootScope,$timeout,Store,$http){
        return {
            clone:clone,
        }
        function clone(stuff){

            var subDomainFrom = stuff.templateUrl
            if(!subDomainFrom){
                return exception.catcher('error')('there is not subDomain')
            }
            var subDomain,newStore
            $q.when()
                .then(function(){
                    // choose your website name
                    return $user.login()
                })
                .then(function(){
                    // choose your website name
                    return websiteName()
                })
                .then(function(domain){
                    subDomain=domain
                    //console.log(subDomain)
                    //return $user.login();

                    if(!global.get('user' ).val){
                        return $user.login();
                    }else{
                        return
                    }
                })

                .then(function(){
                    //return
                    //console.log(global.get('user' ).val)
                    if(!global.get('user' ).val){throw 'необходимо зарегистрироваться'}
                    //console.log(global.get('user' ).val)
                    //if(global.get('user' ).val.confirmEmail){
                    if(!global.get('user' ).val.confirmEmail || global.get('user' ).val.confirmEmail){
                        return
                    }else{
                        return confirmEmailStatus()
                    }
                })
                .then(function(){
                    console.log('OOKK!!!')
                    $rootScope.$emit('$stateChangeStartToStuff');

                    var u = global.get('user' ).val;
                    var user ={profile:{}}
                    user.name=u.name;
                    user.email=u.email;
                    if(u.profile && u.profile.fio){
                        user.profile.fio= u.profile.fio;
                    }

                    var store = {subDomain:subDomain,name:subDomain+' store',user:user}
                    store.currencyArr=['UAH'];
                    store.mainCurrency='UAH';
                    store.currency={UAH:[1,'UAH','грн.']};
                    store.feedbackEmail=user.email;
                    store.clone=true;
                    // store._id='56f42aaafc50a3171d0e90e0'
                    return Store.save(store).$promise



                    /*var u = global.get('user' ).val;
                    var o={_id:'cloneStore',user:{profile:{}},subDomainFrom:subDomainFrom,subDomain:subDomain}
                    o.user.name=u.name;
                    o.user.email=u.email;
                    if(u.profile && u.profile.fio){
                        o.user.profile.fio= u.profile.fio;
                    }

                    return Store.save(o)*/


                    // get store
                    // clone
                    /* delete id subdomain owners ???
                        save cloned store
                        open new window with new store admin greeting?
                    * */
                })
                .then(function (res) {
                    //throw 'test'
                    newStore=res;
                    if(!newStore._id){newStore._id=newStore.id}
                    return $http.get(storeHost+'/api/readStore/'+newStore._id+'?subDomain='+subDomainFrom)
                })
                .then(function () {
                    exception.showToaster('success','статус','чтение Store завершено')
                })
                .then(function () {
                    return $http.get(stuffHost+'/api/readStore/'+newStore._id+'?subDomain='+subDomainFrom)
                    //return Store.pickSubDomain()
                })
                .then(function () {
                    exception.showToaster('success','статус','чтение models завершено')

                })
                .then(function (res) {
                    //console.log(res)
                    $timeout(function () {
                        $rootScope.$emit('$stateChangeEndToStuff');
                    },2000)
                    var suff = (global.get('local').val)?'.localhost:8909':'.gmall.io'
                    var url='http://'+subDomain+suff;
                   /* console.log(newStore)
                    console.log(url)*/
                    if(newStore.token){
                        url +='?token='+newStore.token
                    }
                    var newWindow = window.open(url);
                })
                .then(function(){
                    var suff = (global.get('local').val)?'.localhost:8909':'.gmall.io';
                    window.location.href='http://help'+suff+"/rabota-s-sajtomRcMhly/nachalo-raboty/nachalo-raboty";
                })
                .catch(function(err){
                    $rootScope.$emit('$stateChangeEndToStuff');
                    if(err){
                        exception.catcher('error')(err)
                    }
                })
        }
        function websiteName(){
            return $uibModal.open({
                animation: true,
                templateUrl: 'views/template/modal/websiteName.html',
                controller: function($uibModalInstance,global,Store){
                    var self=this;
                    self.global=global;
                    self.item=''
                    self.focus=true;
                    self.checkSubDomain=checkSubDomain;
                    self.exist=false
                    //self.re=/^[a-z][a-z0-9-_]/
                    self.re=/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/
                    self.ok=function(websiteNameForm){
                        //console.log(websiteNameForm)
                        if(websiteNameForm.$invalid || self.exist){
                            return;
                        }
                        $uibModalInstance.close(self.item.toLowerCase());
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                    function checkSubDomain(name){
                        if(!name || name.length>20){return}
                        var o={subDomain:name.toLowerCase()};
                        Store.query({query:o},function(res){
                            if(res &&  res.length){
                                console.log(true)
                                self.exist =true;
                            }else{
                                self.exist= false
                            }
                        },function(err){
                            self.exist= true;
                        })
                    }
                },
                controllerAs:'$ctrl',
            }).result
        }
        function confirmEmailStatus() {
            return $q(function (rs,rj) {
                actived()


                function actived() {
                    $q.when()
                        .then(function () {
                            return $uibModal.open({
                                animation: true,
                                templateUrl: 'views/template/modal/confirmedEmail.html',
                                controller: function($uibModalInstance,global,Store,User,exception,$timeout){
                                    var self=this;
                                    self.global=global
                                    self.ok=function(websiteNameForm){
                                        $uibModalInstance.close();
                                    }
                                    self.cancel = function () {
                                        $uibModalInstance.dismiss();
                                    };
                                    self.confirmEmailRepeat=confirmEmailRepeat;
                                    var delay;
                                    function confirmEmailRepeat() {
                                        if(delay){return}
                                        delay=true;
                                        $timeout(function () {
                                            delay=false;
                                        },3000)
                                        $q.when()
                                            .then(function () {
                                                return User.repeatMailForConfirm().$promise;
                                            })
                                            .then(function () {
                                                exception.showToaster('info','send')
                                            })
                                            .catch(function (err) {
                                                if(err){
                                                    exception.catcher('send email')(err)
                                                }
                                            })

                                    }
                                },
                                controllerAs:'$ctrl',
                            }).result
                        })
                        .then(function () {
                            return Account.getProfile()
                        })
                        .then(function (response) {
                            if(response){
                                global.set('user',response.data);
                                global.get('functions').val.logged();
                                if(response.data.confirmEmail){
                                    return
                                }else{
                                    throw 'error'
                                }
                            }else{
                                throw 'error'
                            }

                        })
                        .then(function () {
                            rs()
                        })
                        .catch(function (err) {
                            if(err){
                                actived()
                            }else{
                                rj()
                            }

                        })
                }



            })
        }




    }
})()

