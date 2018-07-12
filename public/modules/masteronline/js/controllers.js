'use strict';
angular.module('gmall.controllers', [] )
    .controller('mainFrameCtrl',['$scope','$rootScope','$auth','$location','Account','toaster','global','$user','$q','Master',function($scope,$rootScope,$auth,$location,Account,toaster,global,$user,$q,Master){

        //console.log('mainFrameCtrl')
        if($rootScope.$stateParams.token){
            $auth.setToken({data:{token:$rootScope.$stateParams.token}})
            $location.search('token',null);
        }
        //console.log($rootScope.$stateParams)
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
                    return Account.getPermissionMaster($rootScope.$stateParams.id);
                })
                .then(function(res){
                    //console.log(res)
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
                        return getMasters()

                    }
                } )
                .then(function () {

                })
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

        function getMasters() {
            return $q.when()
                .then(function () {
                    return Master.getList()
                })
                .then(function (items) {
                    var user = global.get('user').val
                    $scope.masters=items.filter(function (m) {
                        return (m._id==user.master || user.seller)&& m.stuffs && m.stuffs.length
                    })
                    if($scope.masters.length ==1){
                        $rootScope.$state.go('frame.master',{id:$scope.masters[0]._id})
                    }
                })
        }
    }])
    /*.controller('masterCtrl',['$rootScope'],function ($rootScope) {
        console.log('masterCtrl')
    })*/




 
