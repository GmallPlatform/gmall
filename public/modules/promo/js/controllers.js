'use strict';
angular.module('gmall.controllers', [] )
    .controller('mainFrameCtrl',['$rootScope','$auth','$location','Account','toaster','global','$user','$q',function($rootScope,$auth,$location,Account,toaster,global,$user,$q){

        if($rootScope.$stateParams.token){
            $auth.setToken({data:{token:$rootScope.$stateParams.token}})
            $location.search('token',null);
        }
        activate()
        function activate(){
            console.log('activate')
            $q.when($auth.isAuthenticated())
                .then(function(auth){
                    console.log(auth)
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
                        $rootScope.$broadcast('logged');
                        //console.log(res.data)
                    }
                } )
                .catch(function(error){
                    if(error && error.data){
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
                    $rootScope.$broadcast('logout');
                    activate()
                });
        }
        $rootScope.logout=logout;
    }])




 
