'use strict';
angular.module('gmall.controllers', [] )
    .controller('mainFrameCtrl',['$rootScope','$auth','$location','Account','toaster','global','$user','$q',function($rootScope,$auth,$location,Account,toaster,global,$user,$q){
        if($rootScope.$stateParams.token){
            $auth.setToken({data:{token:$rootScope.$stateParams.token}})
            $location.search('token',null);
        }
        activate()
        function activate(){
            $q.when($auth.isAuthenticated())
                .then(function(auth){
                    if(!auth){
                        return $user.login()
                    }
                })
                .then(function(){
                    return Account.getPermission();
                })
                .then(function(res){
                    if(!res){
                        toaster.error('у данного аккаунта нет прав');
                        logout()
                    }else{
                        global.set('user',res.data)
                        global.set('seller',res.data.seller);
                    }
                } )
                .catch(function(error){
                    console.log(error)
                    if(error && error.data){
                        console.log(error.data)
                        toaster.error(error.data.message, error.status);
                    }
                    return  logout();
                })
        }
        function logout(){
            $q.when($auth.isAuthenticated())
                .then(function(auth){
                    if(auth){
                        return $auth.logout()
                    }
                })
                .then(function() {
                    global.set('user',null)
                    global.set('seller',null);
                    activate()
                });
        }
        $rootScope.logout=logout;
    }])





 
