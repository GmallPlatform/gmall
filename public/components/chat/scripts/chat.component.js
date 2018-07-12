'use strict';
(function(){
    angular.module('gmall.services')
        .directive('chatDialog',itemDirective)
        .directive('scrollUp', function($timeout) {
            //http://stackoverflow.com/questions/25347852/how-to-scroll-bottom-of-div-using-angular-js
            return {
                restrict: 'A',
                scope:true,
                link: function(scope, element, attr) {
                    scope.$watchCollection(attr.scrollUp, function(newVal) {
                        //console.log(newVal)
                        $timeout(function() {
                            if(scope.$ctrl && scope.$ctrl.dontscroll){
                                scope.$ctrl.dontscroll=false;
                            }else{
                                element[0].scrollTop = element[0].scrollHeight;
                            }

                        });
                        
                    });
                }
            }
        });

    function itemDirective(){
        return {
            restrict:"E",
            scope: {
                participant:"@",
                dialog:"=",
            },
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/chat/chat-dialog.html',
        }
    };
    itemCtrl.$inject=['$scope','$chat','$state','global','$timeout','socket','exception'];
    function itemCtrl($scope,$chat,$state,global,$timeout,socket,exception){

        var self = this;
        //console.log(angular.version)


        self.mobile=global.get('mobile' ).val;
        self.$state=$state;
        self.global=global;
        self.Items=$chat;
        self.moment=moment;

        self.paginate={page:0,rows:5,items:0};
        self.text='';
        var delay;


        if(angular.version.minor<6){
            //console.log(self.dialog)
            self.query={dialog:self.dialog._id};
            if(self.dialog.order && global.get('dialogs').val){
                //console.log(global.get('dialogs').val)
                //self.dontFocus=!global.get('dialogs').val.getOFA('order',self.dialog.order);
            }

            self.guest=(self.dialog.user.split('-')[0]=='guest');
            self.message={
                dialog:self.dialog,
                recipient:(self.participant=='seller')?'user':'seller',
                sellerName:self.dialog.sellerName,
                userName:self.dialog.userName
            }
            if(self.dialog.order){
                self.message.order=self.dialog.order
                self.message.orderNum=self.dialog.orderNum;
            }
            activate();
        }else{
            self.$onInit = function() {
                self.query={dialog:self.dialog._id};
                if(self.dialog.order && global.get('dialogs').val){
                    //console.log(global.get('dialogs').val)
                    //self.dontFocus=!global.get('dialogs').val.getOFA('order',self.dialog.order);
                }

                self.guest=(self.dialog.user.split('-')[0]=='guest');
                self.message={
                    dialog:self.dialog,
                    recipient:(self.participant=='seller')?'user':'seller',
                    sellerName:self.dialog.sellerName,
                    userName:self.dialog.userName
                }
                if(self.dialog.order){
                    self.message.order=self.dialog.order
                    self.message.orderNum=self.dialog.orderNum;
                }
                activate();
            }
        }




        self.getList=getList;
        self.getWho=getWho;
        self.sendMessage =sendMessage;
        self.getMoreMessage=getMoreMessage;

        //*******************************************************


        function activate() {
            //console.log(self.dialog,self.participant);
            if(global.get('store').val.seller._id==self.dialog.seller){
                self.dialog.sellerName=global.get('store').val.seller.name||global.get('store').val.name;
            }
            if (self.participant=='seller'){
                //console.log("self.participant=='seller' - ",self.participant=='seller')
                socket.emit('getUserStatus',{user:self.dialog.user})
                socket.on('userStatus',function(data){
                    //console.log('data.status ',data)
                    //console.log('self.online ',self.online)
                    self.online=data.status;
                })
            }else {
                socket.emit('getSellerStatus',{seller:self.dialog.seller})
                socket.on('sellerStatus',function(data){
                    self.online=data.status;
                })
            }
            return getList().then(function() {
                //console.log('Activated news list View');
            });

        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    data.reverse();
                    data.forEach(function(mes){getWho(mes)})
                    var ids=data.filter(function(mes){
                        //console.log(mes)
                        return !mes.read && mes.recipient==self.participant
                    }).map(function(mes){return mes._id});
                    //console.log(ids);
                    if(ids.length){
                        $chat.save({update:'read'},{_id:ids,read:true},function(res){
                            getChatUnReadMessages({dialog:self.dialog._id,count:ids.length})
                        },function (err) {
                            if(err.data){err=err.data;}
                            exception.catcher('обновление статуса сообщений')(err)
                        })
                    }
                    if(self.items && self.items.length){
                        if(data && data.length){
                            Array.prototype.push.apply(data,self.items)
                        }
                    }
                    self.items = data;
                    //console.log(self.items)

                    return self.items;
                })
                .catch(function(err){
                    if(err){
                        if(err.data){err=err.data;}
                        exception.catcher('получение сообщений')(укк)
                    }

                })

        }
        function getWho(mes){
            if ((mes.recipient=='seller'&& self.participant=='seller')||(mes.recipient!='seller'&&self.participant!='seller')){mes.who ='he'};
            if ((mes.recipient!='seller'&& self.participant=='seller')||(mes.recipient=='seller'&&self.participant!='seller')){mes.who= 'me'};
            if(mes.recipient=='seller'){
               mes.name= self.dialog.userName;
            }else if(mes.recipient=='user'){
                mes.name= self.dialog.sellerName;
            }
            //console.log(mes)
        }
        function sendMessage(form){
            if(delay){return}
            delay=true;
            $timeout(function(){delay=false},1200)
            //console.log(form)
            if(form.$valid) {
                var o = angular.copy(self.message)
                o.message=self.text.clearTag(250);
                /*if(!$scope.chatCtrl.order){
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
                }*/
               // o.token=$auth.getToken();
                //o.host=socketHost;
                //console.log(o)
                socket.emit('newMessage',o);
                /*console.log(o)
                self.items.push(o)*/
                self.text='';
            }
        }
        $scope.$on('newChatMessage',function(event,message){
            //console.log(message)
            if(self.dialog._id!=message.dialog){
                return;
            }
            getWho(message)
            self.items.push(message);
            // проверка на авторство и update
            if(message.recipient==self.participant){
                //console.log(message)
                $timeout(function(){
                    getChatUnReadMessages({dialog:message.dialog,count:1})
                },300)

                $chat.save({update:'read'},{_id:message._id,read:true});
            }
            //setMessagesRead([message._id])
        })
        function getChatUnReadMessages(data){
           //console.log(data,global.get('dialogs').val)
            if(global.get('dialogs') && global.get('dialogs').val){
                for(var i=0,l=global.get('dialogs').val.length;i<l;i++){
                    if(global.get('dialogs').val[i].dialog==data.dialog){
                        global.get('dialogs').val[i].count -=data.count;
                        if(!global.get('dialogs').val[i].count || global.get('dialogs').val[i].count<0){
                            global.get('dialogs').val.splice(i,1)
                        }
                        break;
                    }
                }
            }else{
                if(!global.get('dialogs')){
                    setTimeout(function (data) {
                        getChatUnReadMessages(data)
                    },4000)
                }

            }
        }
        function getMoreMessage(){
            self.paginate.page++;
            self.dontscroll=true;
            getList()
        }
        /*$scope.$on("$destroy", function () {
            console.log('removeMe')
        })
*/

    }
})()
