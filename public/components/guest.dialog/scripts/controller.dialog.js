'use strict';
angular.module('gmall.controllers')
.controller('questDialogCtrl',['$scope','$rootScope','global','socket','$dialogs','$timeout','$location','$q',function($scope,$rootScope,global,socket,$dialogs,$timeout,$location,$q){
    var self=this;
    self.global=global;
    $scope.questDialogCtrl=this;
    $scope.questDialogCtrl.dialog=null;
    $scope.questDialogCtrl.seller=global.get('store' ).val.seller;
    $scope.questDialogCtrl.communication=global.get('store' ).val.template.communication;
    //console.log($scope.questDialogCtrl.communication)
    $scope.questDialogCtrl.user=global.get('user' ).val;
    $scope.questDialogCtrl.participant='user';
    $scope.questDialogCtrl.sellerIn=true; //?????????????
    $scope.questDialogCtrl.submitted=false;
    socket.emit('getSellerStatus');
    socket.on('sellerStatus',function(data){
        //console.log(data)
        $scope.questDialogCtrl.sellerIn=data.status;;
    });
    $scope.$on('logout',function(){
        console.log('logout')
        $scope.questDialogCtrl.user={};
        $scope.questDialogCtrl.dialog=null;
        $scope.questDialogCtrl.message='';
    })
    $scope.$on('logged',function(){
        //console.log('logged')
        $scope.questDialogCtrl.user=global.get('user' ).val;
        $scope.questDialogCtrl.dialog=null;
        $scope.questDialogCtrl.message='';
    })
    var delay;
    $scope.questDialogCtrl.startDialog=function(form){
        if(delay){return}
        delay=true;
        $timeout(function(){delay=false},1000)
        //$scope.questDialogCtrl.submitted = true;
        if(form.$valid) {
            var str='abcdefgpqrstuvwxyzQAZWSXEDCRFVTGB567890'.shuffle(10);
            var userId=(global.get('user' ).val && global.get('user' ).val._id) ?
                global.get('user' ).val._id:'guest-'+Date.now()+str;
            //console.log(userId)
            $scope.questDialogCtrl.blockStartDialog=true;
            $scope.questDialogCtrl.user.name=$scope.questDialogCtrl.user.name.clearTag();
            var query;
            $q.when().then(function(){
                query={
                    seller:global.get('store').val.seller._id,
                    user:userId,
                    order:{ $exists: false }
                };
                return $dialogs.query({query:query} ).$promise
            }).then(function(res){
                if (res && res[0] && res[0].index){
                    return res[1]._id;
                }else {
                    return null;
                }
            }).then(function(id){
                query.sellerName=global.get('store').val.seller.name;
                query.userName=$scope.questDialogCtrl.user.name;
                delete query.order;
                if (id){
                    query._id=id;
                    $scope.questDialogCtrl.dialog=query;
                }else{
                    $dialogs.save(query,function(res){
                        query._id=res.id;
                        $scope.questDialogCtrl.dialog=query;
                    },function(err){
                        console.log(err)
                    })
                }
            }).then(function(){
                if(!global.get('user' ).val){
                    socket.emit('getUser:data',{
                        user:userId,
                        seller:global.get('store').val.seller._id,
                        store:global.get('store').val._id
                    })
                }
                // получение списка сообщений
            }).catch(function(err){
                console.log(err);
            })
        }

    }
}])/*questDialogCtrl*/
