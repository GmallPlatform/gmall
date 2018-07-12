'use strict';
angular.module('gmall.controllers')
.controller('usersCtrl',['$scope','$rootScope','global','$anchorScroll','$user','$chat','$sce','$timeout','$http',function($scope,$rootScope,global,$anchorScroll,$user,$chat,$sce,$timeout,$http){
    $anchorScroll();
    $scope.usersCtrl=this;
    $scope.usersCtrl.paginate={page:0,rows:20,totalItems:0}
    $scope.usersCtrl.query={}
    var query=null;
    if ($rootScope.$stateParams.user){
        $scope.usersCtrl.query={_id:$rootScope.$stateParams.user}
    }
    $scope.usersCtrl.deleteUser=function(id){
        $user.delete({id:id},function(res){
            $scope.usersCtrl.getList($scope.usersCtrl.paginate.page,$scope.usersCtrl.paginate.rows)
        })
    }
    $scope.usersCtrl.getList = function(page,rows){
        if(!global.get('user' ).val || !global.get('user' ).val._id)return;
        /*if (global.get('seller' ) && global.get('seller' ).val){
            $scope.usersCtrl.query['seller']=global.get('seller' ).val;
        }else{
            $scope.usersCtrl.query['user']=global.get('user' ).val._id;
        }
        if (page!=$scope.usersCtrl.paginate.page){
            $scope.usersCtrl.paginate.page=page;
        }*/

        $user.query({perPage:rows , page:page,query:$scope.usersCtrl.query},function(res){
            if (page==0 && res.length>0){
                $scope.usersCtrl.paginate.totalItems=res.shift().index;
            }
            if(res.length==0){
                $scope.usersCtrl.paginate.totalItems=0;
            }
            $scope.usersCtrl.users=res;
            $scope.usersCtrl.query={}
            query=null;
            //console.log($scope.ordersCtrl.orders);
        })
    };
    $scope.usersCtrl.getList($scope.usersCtrl.paginate.page,$scope.usersCtrl.paginate.rows)

}])/*userCtrl*/
