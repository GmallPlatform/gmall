'use strict';
angular.module('gmall.controllers', [] )
    .controller('mainFrameCtrl',['$rootScope','$auth','$location','Account','toaster','global','$user','$q',function($rootScope,$auth,$location,Account,toaster,global,$user,$q){
        if($rootScope.$stateParams.token){
            $auth.setToken({data:{token:$rootScope.$stateParams.token}})
            $location.search('token',null);
        }
        activate()
        function activate(){
            console.log('$auth.isAuthenticated()',$auth.isAuthenticated())
            $q.when($auth.isAuthenticated())
                .then(function(auth){
                    if(!auth){
                        return $user.login()
                    }
                })
                .then(function(){
                    return Account.getPermissionOrder();
                })
                .then(function(res){
                    console.log(res)
                    if(!res){
                        toaster.error('у данного аккаунта нет прав');
                        logout()
                    }else{
                        global.set('user',res.data)
                        global.set('seller',res.data.seller);
                        //console.log(global.get('seller').val)
                        $rootScope.$broadcast('logged')
                        if (global.get('seller').val){
                            $rootScope.setDataForSocket(global.get('seller' ).val)
                        } else {
                            $rootScope.setDataForSocket();
                        }
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
                    $rootScope.setDataForSocket()
                    activate()
                });
        }
        $rootScope.logout=logout;
    }])




 
