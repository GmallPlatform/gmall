'use strict';
angular.module('gmall.controllers')
.controller('chatCtrl',['$scope','$rootScope','global','$anchorScroll','$chat','$sce','$order','$timeout','$location','$http','socket','$auth',function($scope,$rootScope,global,$anchorScroll,$chat,$sce,$order,$timeout,$location,$http,socket,$auth){
    $anchorScroll();


    $scope.chatCtrl=this;
    $scope.chatCtrl.messages=[];
    $scope.chatCtrl.page=0;
    $scope.chatCtrl.rows=10;
    $scope.chatCtrl.localCount=0;
    $scope.chatCtrl.totalCount=0;
    $scope.chatCtrl.firstMessage=null;
    $scope.chatCtrl.global=global;
    $scope.moment=moment;
    socket.on('newMessage',function(message){
        //console.log(message)
        if($scope.chatCtrl.order && $scope.chatCtrl.order._id != message.order){return}
        if($scope.chatCtrl.dialog && $scope.chatCtrl.dialog._id != message.dialog){return}
        if(message.recipient=='seller'){
            message.name=$scope.chatCtrl.user.name;
        } else{
            message.name=$scope.chatCtrl.seller.name;
        }
        $scope.chatCtrl.messages.push(message)
        setMessagesRead([message._id])
    })
    var delay;
    console.log($scope.chatCtrl.dialog)
    $scope.chatCtrl.sendMessage=function(){
        var form=$scope.formChat;
        //console.log($scope.formChat);
        var message=$scope.chatCtrl.message;
        if(delay){return}
        delay=true;
        $timeout(function(){delay=false},1200)
        //if(!message){return}
        if(form.$valid) {
            //$scope.chatCtrl.participant=(global.get('seller').val)?'seller':'user';
            //console.log($scope.chatCtrl.participant);
            $scope.chatCtrl.submitted = false;
            var o={
                message:message.clearTag(250),
            }
            //console.log(o)
            o.seller=$scope.chatCtrl.seller._id;
            o.user=$scope.chatCtrl.user._id;
            if(!$scope.chatCtrl.order){
                if($scope.chatCtrl.participant=='seller'){
                    o.recipient= o.user;
                    o.name=$scope.chatCtrl.seller.name;
                }else{
                    o.recipient= 'seller';
                    o.name=$scope.chatCtrl.user.name;
                }
                o.type='user';
                o.dialog=$scope.chatCtrl.dialog._id;
            } else{
                o.order=$scope.chatCtrl.order._id
                o.name='N-'+$scope.chatCtrl.order.num;
                o.recipient=($scope.chatCtrl.participant=='seller')?$scope.chatCtrl.user._id:'seller';
                o.type='order';
            }
            /*$chat.save(o,function(err,res){
                //console.log('add message')
                if(o.recipient=='seller'){
                    o.name=$scope.chatCtrl.user.name;
                } else{
                    o.name=$scope.chatCtrl.seller.name;
                }
                $scope.chatCtrl.messages.push(o)
                $scope.chatCtrl.message='';
            })*/
            //console.log(o)
            o.token=$auth.getToken();
            o.host=socketHost;
            socket.emit('newMessage',o);
            $scope.chatCtrl.messages.push(o)
            $scope.chatCtrl.message='';
        }else{
            $scope.chatCtrl.submitted = true;
        }
    }

    function setMessagesRead(ids,correct){
        $http({
            method: 'POST',
            url: '/api/chatSetReadMessages',
            data: {
                ids:ids
            }
        }).then(function() {
            //$scope.chatCtrl.participant=(global.get('seller').val)?'seller':'user';
            if(correct){
                //$rootScope.getChatNewMessages();
                if ($scope.chatCtrl.order){
                    var name='N-'+$scope.chatCtrl.order.num;
                    //console.log(name,global.get('chatMessages').val)
                    if (global.get('chatMessages') && global.get('chatMessages').val && global.get('chatMessages').val[name]){
                        global.get('chatMessages').val[name].count -=ids.length;
                        if (!global.get('chatMessages').val[name].count){
                            delete global.get('chatMessages').val[name];
                        }
                    }
                }
                if ($scope.chatCtrl.dialog){
                    var name;
                    if($scope.chatCtrl.participant=='seller'){
                        name=$scope.chatCtrl.user.name;
                    }else{
                        name=$scope.chatCtrl.seller.name;
                    }
                    //console.log(name,global.get('chatMessages').val)
                    if (global.get('dialogs') && global.get('dialogs').val && global.get('dialogs').val[name]){
                        global.get('dialogs').val[name].count -=ids.length;
                        if (!global.get('dialogs').val[name].count){
                            delete global.get('dialogs').val[name];
                        }
                    }
                }
                if ($rootScope.setChatMessagesCount){
                    $rootScope.setChatMessagesCount();
                }
            }
        }, function errorCallback(response) {
            console.log(response)
        });
    }
    $scope.chatCtrl.getMessages = function(p,r){
        //$scope.chatCtrl.seller._id;
        var query;
        if ($scope.chatCtrl.order){
            query={order:$scope.chatCtrl.order._id}
        }else{
            query={$and:[{order:{$exists: false}},{user:$scope.chatCtrl.user._id},{seller:$scope.chatCtrl.seller._id}]}
        }
        //console.log(query)
        $chat.query({perPage:r,page:p,query:query},function(res){
            if(p==0 && res && res.length){
                $scope.chatCtrl.totalCount=res.shift().index;
            }
            $scope.chatCtrl.localCount+=res.length;
            res.forEach(function(el){
                if(el.recipient=='seller'){
                    el.name=$scope.chatCtrl.user.name;
                    /*if ($scope.chatCtrl.order){
                        el.name=$scope.chatCtrl.order.user.name;
                    }else{
                        el.name=global.get('user').val.name;
                    }*/
                } else{
                    el.name=$scope.chatCtrl.seller.name;
                    /*if ($scope.chatCtrl.order){
                        el.name=$scope.chatCtrl.order.seller.name;
                    }else{
                        el.name=$scope.chatCtrl.seller.name;
                    }*/
                }
            })
            if(!$scope.chatCtrl.messages.length){
                $scope.chatCtrl.messages=res.reverse();
                /*$timeout(function(){

                   // console.log(objDivInnerChat.scrollHeight)
                    $scope.chatCtrl.objDivInnerChat.scrollTop = $scope.chatCtrl.objDivInnerChat.scrollHeight;
                },100)*/
            }else{
                res.forEach(function(el){
                    $scope.chatCtrl.messages.unshift(el);
                })
            }
            var ids=res.reduce(function(ids,c){
                if (!c.read){ids.push( c._id)}
                return ids;
            },[])
            if(ids.length){
                setMessagesRead(ids,true)
            }
        })
    }

    $scope.chatCtrl.getMoreMessage = function(){
        $scope.chatCtrl.page++;
        $scope.chatCtrl.getMessages($scope.chatCtrl.page,$scope.chatCtrl.rows)
    }
    $scope.chatCtrl.getWho=function(recipient){
        //$scope.chatCtrl.participant=(global.get('seller').val)?'seller':'user';
        var participant = $scope.chatCtrl.participant;
        if ((recipient=='seller'&& participant=='seller')||(recipient!='seller'&&participant!='seller')){return 'he'};
        if ((recipient!='seller'&& participant=='seller')||(recipient=='seller'&&participant!='seller')){return 'me'};
    }


}])/*chatCtrl*/
