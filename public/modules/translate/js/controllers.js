'use strict';
angular.module('gmall.controllers', [] )
.controller('mainFrameCtrl',['$rootScope','$auth','$location','Account','toaster','global','$user','$q',function($rootScope,$auth,$location,Account,toaster,global,$user,$q){
    //console.log('mainFrameCtrl')
    if($rootScope.$stateParams.token){
        $auth.setToken({data:{token:$rootScope.$stateParams.token}})
        $location.search('token',null);
    }
    activate()
    function activate(){
        $q.when($auth.isAuthenticated())
            .then(function(auth){
                //console.log(auth)
                if(!auth){
                    return $user.login()
                }
            })
            .then(function(){
                return Account.getPermissionTranslator();
            })
            .then(function(res){
                //console.log(res)
                if(!res){
                    toaster.error('у данного аккаунта нет прав');
                    logout()
                }else{
                    global.set('user',res.data)
                    global.set('seller',res.data.seller);
                }
                //console.log(global.get('store').val)
            } )
            .catch(function(error){
                if(error && error.data){
                    try{
                        var m =(error.data && error.data.message)?error.data.message:error.statusText
                        toaster.error(m, error.status);
                    }catch (err){
                        console.log(err)
                    }

                }
                return  logout();
            })
    }
    function logout(){
        $q.when($auth.isAuthenticated())
            .then(function(auth){
                console.log(auth)
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

 
