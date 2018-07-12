'use strict';
angular.module('gmall.controllers')
.controller('dialogsCtrl',['$scope','$rootScope','global','$anchorScroll','$dialogs','$timeout','$location','$q','socket','Confirm','exception',function($scope,$rootScope,global,$anchorScroll,$dialogs,$timeout,$location,$q,socket,Confirm,exception){
    //console.log('load dialogsCtrl')
    $anchorScroll();
    $scope.dialogsCtrl=this;

    $scope.dialogsCtrl.paginate={page:0,rows:20,items:0}
    var query=null;
    $scope.dialogsCtrl.items=[];
    $scope.dialogsCtrl.getGuest=getGuest;
    $scope.dialogsCtrl.startDialog=startDialog;
    function startDialog() {
        var newDialog={
            seller:global.get('store').val.seller._id,
            user:global.get('user' ).val._id,
            ellerName:global.get('store').val.seller.name,
            userName:(global.get('user' ).val.profile && global.get('user' ).val.profile.fio)?global.get('user' ).val.profile.fio:global.get('user' ).val.name,
        };
        /*console.log(mewDialog)
        return;*/
        $dialogs.save(newDialog,function(res){
            $scope.dialogsCtrl.getList(0,1)
        },function(err){
            console.log(err)
        })
    }

    $scope.dialogsCtrl.getUnReadChatMessages=function(dialog){
        if(!global.get('dialogs' ).val){return;}
        //console.log(dialog)
        for(var i=0,l=global.get('dialogs' ).val.length;i<l;i++){
            if (global.get('dialogs' ).val[i].dialog==dialog._id){
                return global.get('dialogs').val[i].count;
            }
        }
    }

    $scope.dialogsCtrl.deleteDialog=function(id,e){
        e.stopPropagation();
        Confirm("удалить???" )
            .then(function(){
                return $dialogs.delete({id:id}).$promise;
            } )
            .then(function(){
                for(var i=0,l=global.get('dialogs').val.length;i<l;i++){
                    if(id==global.get('dialogs').val[i].dialog){
                        global.get('dialogs').val.splice(i,1);
                        break;
                    }
                }
                $scope.dialogsCtrl.getList($scope.dialogsCtrl.paginate.page,$scope.dialogsCtrl.paginate.rows);
            })
            .catch(function(err){
                err = (err &&err.data)||err
                if(err){
                    exception.catcher('удаление диалога')(err)
                }
            })
    }
    $scope.dialogsCtrl.getList = function(page,rows){
        if(!global.get('user' ).val || !global.get('user' ).val._id)return;
        query=(global.get('seller' ).val)?{seller:global.get('seller' ).val}
            :{user:global.get('user' ).val._id}
        query={$and:[{order:{$exists:false}},query]}
        //console.log(query)
        $dialogs.query({perPage:rows , page:page,query:query},function(res){
            if (page==0 && res.length>0){
                $scope.dialogsCtrl.paginate.items=res.shift().index;
            }
            if(res.length==0){
                $scope.dialogsCtrl.paginate.items=0;
            }
            $scope.dialogsCtrl.items=res;
            $scope.dialogsCtrl.items.forEach(function(d){
                if ($scope.dialogsCtrl.participant=='seller'){
                    socket.emit('getUserStatus',{user:d.user})
                }else {
                    socket.emit('getSellerStatus',{seller:d.seller})
                }
            })
            query=null;
        },function(err){
            console.log(err)
            exception.catcher('получение диалогов')(err)
        })
    };

    if(global.get('user').val){
        activate()
    } else{
        $scope.$on('logged',function(){
            activate()
        })
    }
    function activate(){
        $scope.dialogsCtrl.participant=(global.get('seller').val)?'seller':'user';
        $scope.dialogsCtrl.getList($scope.dialogsCtrl.paginate.page,$scope.dialogsCtrl.paginate.rows)
        if ($scope.dialogsCtrl.participant=='seller'){
            socket.on('userStatus',function(data){
                var d;
                if(d=$scope.dialogsCtrl.items.getOFA('user',data.user)){
                    d.online=data.status;
                }
            })
        }else {
            socket.on('sellerStatus',function(data){
                $scope.dialogsCtrl.items.forEach(function(d){
                    d.online=data,status;
                })
            })
        }
    }
    function getGuest(d){
        if(d.user.split('-')[0]=='guest'){
            //console.log(d.user.split('-')[0])
            return true;
        }
    }

    socket.on('deleteDialog',function(data){
        $scope.dialogsCtrl.items.forEach(function(el){
            $scope.dialogsCtrl.getList($scope.dialogsCtrl.paginate.page,$scope.dialogsCtrl.paginate.rows)
        })
    })
    socket.on('newDialog',function(data){
        //console.log(data)
        $scope.dialogsCtrl.getList($scope.dialogsCtrl.paginate.page,$scope.dialogsCtrl.paginate.rows)
    })
    /*socket.on('newMessage',function(){
        //console.log('newMessage')
        $timeout(
            function() {
                $scope.dialogsCtrl.setUnReadChatMessages()
            },100
        )
    })*/
    socket.on('newMessage',function(data){
        if(!$scope.dialogsCtrl.items.some(function(d){return d._id==data.dialog})){
            $scope.dialogsCtrl.paginate.page=0;
            activate()
        }
    })

    $scope.$on("$destroy", function() {
        //console.log('destriy')
        socket.removeListener('deleteDialog');
    });

}])/*dialogCtrl*/
.controller('dialogCtrl',['$scope','$rootScope','global','$anchorScroll','$dialogs','$timeout','$location','$q','socket',function($scope,$rootScope,global,$anchorScroll,$dialogs,$timeout,$location,$q,socket){
        //console.log('load dialogsCtrl')
        $anchorScroll();
        $scope.dialogCtrl=this;

    if(global.get('user').val){
        activate()
    } else{
        $scope.$on('logged',function(){
            activate()
        })
    }
    function activate(){
        $dialogs.get({id: $rootScope.$stateParams.id}, function (res) {
            if (res) {
                $scope.dialogCtrl.participant = (global.get( 'seller' ).val) ? 'seller' : 'user';
                $scope.dialogCtrl.dialog = res;
            } else {
                console.log( 'нет такого диалога' )
            }
        }, function (err) {
        } )
    }






    }])/*dialogCtrl*/
