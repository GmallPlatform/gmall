'use strict';
(function(){

    angular.module('gmall.services')
        .directive('ordersList',ordersListDirective)
        .directive('emptyList',['$timeout',function($timeout){
            return {
                restrict:'E',
                scope:{
                    items:"=items",
                    message:'@'
                },
                template:'<div ng-if="show" class="text-center">' +
                '<h3 ng-bind="message"></h3></div>',
                link:function(scope, element){
                    scope.$watch('items',function(n,o){
                        if(n===0){
                            scope.show=true;
                        }else{
                            scope.show=false;
                        }
                    })
                }
            }
        }])
    function ordersListDirective(){
        return {
            scope: {},
            restrict:'E',
            bindToController: true,
            controller: orderListCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/order/orders-list.html',
        }
    }
    orderListCtrl.$inject=['Orders','global','$rootScope','$window','$timeout','$location','socket','$q','$user','exception','Confirm','$dialogs','CartInOrder'];
    function orderListCtrl(Orders,global,$rootScope,$window,$timeout,$location,socket,$q,$user,exception,Confirm,$dialogs,CartInOrder){
        var self=this;
        self.global=global;
        self.mobile=global.get('mobile').val
        $rootScope.ordersCtrl=self;
        self.$state=$rootScope.$state;
        self.paginate={page:0,rows:20,items:0}
        self.query={}
        var query=null,newId;
        self.listOfActions={
            delete:'удаление'
        }
        self.action1=null;
        //********** methods**********
        //self.setUnReadChatMessages=setUnReadChatMessages;
        self.getList=getList;
        self.reloadOrders=reloadOrders;
        self.deleteItem=deleteItem;
        self.newOrder=newOrder;
        self.getUnReadChatMessages=getUnReadChatMessages;
        self.searchItem=searchItem;
        self.filterOrderList=filterOrderList;
        self.markAllStuffs=markAllStuffs;
        self.changeAction=changeAction;
        self.changeRows=changeRows;
        //*************watchers**********************************
        function changeRows(rows) {
            if(self.paginate.rows!=rows){
                self.paginate.rows=rows;
                self.paginate.page=0;
                self.paginate.items=0;
                getList(0);
            }
        }
        function markAllStuffs(m){
            self.orders.forEach(function(el){
                el.select=m;
            })
        }
        function changeAction() {
            Confirm(self.action+'?')
                .then(function () {
                    if(!self.action){return}
                    var a=angular.copy(self.action);
                    self.action=null;
                    self.mark=false;
                    switch (a) {
                        case 'delete':
                            return deleteOrders()
                            break;

                    }
                }).catch(function () {self.action=null;})


        }

        function deleteOrders(){
            Confirm('потверждаете?').then(function () {
                var ids=self.orders.filter(function(el){return el.select}).map(function(el){return el._id}).join('_')
                var idsInnerCart=self.orders.filter(function(el){return el.select}).map(function(el){return el.cart}).join('_')
                $q.when()
                    .then(function () {
                        return Orders.delete({ids:ids}).$promise.then(function(){
                            global.set('saving',true);
                            getList()
                            $timeout(function(){
                                global.set('saving',false);
                            },1500)},function(err){console.log(err)});
                    })
                    .then(function () {
                        return CartInOrder.delete({ids:idsInnerCart}).$promise.then(function(){},function(err){console.log(err)});
                    })


            })
                .catch(function () {self.action=null;})

        }
        socket.on('newMessage',function(){
            //console.log('newMessage')
            /*$timeout(
                function() {
                    setUnReadChatMessages()
                },100
            )*/
        })
        // установка диапазона дат для получения списка
        self.dt  = new Date();
        self.today = function(t) {
            if(t){return new Date(self.dt.setHours(0,0,0));}else {return new Date(self.dt.setHours(23,59,59));}
        };
        self.maxDate=self.today(true)
        var dtto = self.today();
        var dtfrom=self.today(true);
        dtfrom.setDate(dtfrom.getDate() - 30);
        self.dtto=dtto;
        self.dtfrom=dtfrom;
        var now = new Date();
        var yesterday=new Date(new Date(self.today(true)).setDate(now.getDate() - 1));
        var nextWeek = new Date(new Date(self.today(true)).setDate(now.getDate() - 7));
        var nextMonth = new Date(new Date(self.today(true)).setMonth(now.getMonth() - 1));
        var y = dtto.getFullYear(), m = dtto.getMonth();
        var thisMonth = new Date(y, m, 1);
        var last30day = new Date(new Date(self.today(true)).setDate(now.getDate() - 30));

        self.datePicker={};
        self.options={
            "ranges": {
                "сегодня": [
                    self.today(true),
                    dtto
                ],
                "вчера": [
                    yesterday,
                    self.today(true)
                ],
                "последние 7 дней": [
                    nextWeek,
                    dtto
                ],
                "последние 30 дней": [
                    last30day,
                    dtto
                ],
                "текущий месяц": [
                    thisMonth,
                    dtto
                ],
                "прошлый месяц": [
                    nextMonth,
                    dtto
                ]
            },
            locale: {
                applyClass: 'btn-green',
                applyLabel: "Выбрать",
                fromLabel: "от",
                toLabel: "до",
                cancelLabel: 'Отменить',
                customRangeLabel: 'прозвольный диапазон',
                format:"DD.MM.YY",
                daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
                firstDay: 1,
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                    'Ноябрь', 'Декабрь'
                ]
            }
        }
        self.datePicker.date = {
            startDate: dtfrom,
            endDate: dtto
        };
        moment.locale("ru");
        self.moment=moment;

        //**********************************************************************************************
        //*********************************************************************************************

        //********************activate***************************
        if(global.get('user').val){
            activate()
        } else{
            $rootScope.$on('logged',function(){
                activate()
            })
        }
        //*******************************************************
        //console.log(global.get('campaign').val)
        function activate(){
            self.participant=(global.get('seller').val)?'seller':'user';
            //console.log(self.participant)
            if (self.participant=='seller'){
                socket.on('userStatus',function(data){
                    self.orders.forEach(function(o){
                        if(o.user==data.user){
                            o.online=data.status;
                        }
                    })

                })
                socket.on('newNotification',function(data){
                    //console.log('newNotification',data)
                    if(data && data.type=='order'){
                        self.getList(0);
                    }
                })
            }else {
                socket.on('sellerStatus',function(data){
                    if(!self.orders ||  !self.orders.length){return}
                    self.orders.forEach(function(o){
                        o.online=data.status;
                    })
                })
            }
            return self.getList(0);
        }
        $rootScope.$on('reloadOrderList',function(){
            getList(self.paginate.page)
        })
        function getList(page){
            if (page===0){
                self.paginate.page=page;
            }
            //console.log(page,rows)
            if(!global.get('user' ).val || !global.get('user' ).val._id){
                setTimeout(function(){
                    getList(page)
                },1500)
                return;
            };
            //console.log(global.get('user' ).val)
            if (!global.get('seller' ) || !global.get('seller' ).val){
                self.query['user']=global.get('user' ).val._id;
            }
            //console.log(self.query)
            if (!self.query.num){
                self.query.date={$gte:new Date(self.datePicker.date.startDate),$lte: new Date(self.datePicker.date.endDate)};
            }
            if (Object.keys(self.query).length>1){
                //console.log(Object.keys(self.query).length)
                query={$and:[]}
                for(var key in self.query){
                    var o={}
                    o[key]=self.query[key];
                    query.$and.push(o)
                }
            }else{
                query=self.query;
            }
            //console.log(query);
            Orders.getList(self.paginate,self.query )
                .then(function(res){
                    self.orders=res;
                    //self.query={}
                    query=null;
                    self.itemsCount=self.paginate.items;
                    /*$timeout(
                        function() {
                            self.setUnReadChatMessages()
                        },100
                    )*/
                    //console.log(self.participant)
                    self.orders.forEach(function(o){
                        if (self.participant=='seller'){
                            socket.emit('getUserStatus',{user:o.user})
                        }else {
                            socket.emit('getSellerStatus',{seller:o.seller})
                        }
                    })
                })
                .then(function(){})
        };
        function reloadOrders(s){
            // do it after getiing list
            self.query={};
            if(s){
                var a = parseInt(s.substring(0,30));
                if (typeof a==='number' && (a%1)===0){
                    self.query['num']=a;
                }else{
                    self.query['profile.fio']=s.substring(0,30);
                    console.log(self.query['profile.fio'])
                }
            }
            self.getList(0);
        }
        function deleteItem(item,e){
            e.stopPropagation();
            if(!global.get('seller').val){
                Confirm("удалить???" )
                    .then(function(){
                        item.status=6;
                        return Orders.save({update:'status'},{_id:item._id,status:item.status}).$promise;
                    })
                    .then(function () {
                        return self.getList(0);
                    })
            }else{
                //console.log(item);return
                Confirm("удалить???" )
                    .then(function(){
                        var dialog={
                            seller:item.seller,
                            user:item.user,
                            order: item._id
                        };
                       // console.log(dialog)
                        return $dialogs.query({query:dialog} ).$promise
                    } )
                    .then(function(dialogs){
                        if (dialogs && dialogs[0] && dialogs[0].index){
                            return $dialogs.delete({id:dialogs[1]._id} ).$promise
                        }

                    } )
                    .then(function(){
                        return Orders.delete({_id:item._id}).$promise;
                    } )
                    .then(function(){
                        return self.getList(0);
                    })
                    /*.then(function(){
                        return $http.get(socketHost+'/api/deleteDialog/')
                    })*/
                    .catch(function(err){
                        err = (err &&err.data)||err
                        if(err){
                            exception.catcher('удаление ордера')(err)
                        }
                    })
            }
        }
        function newOrder(){
            $q.when()
                .then(function(){
                    //return $user.selectItem()
                    return $user.selectOrCreat()

                })
                .then(function(user){
                    //console.log(user)
                    if(!user.profile){
                        user.profile={
                            phone:user.phone,
                            fio:user.name,
                        }
                    }

                    var order={
                        cart:{stuffs:[]},
                        kurs:1,
                        currency:'UAH',
                        profile:user.profile,
                        seller:global.get('store').val.seller._id,
                        currencyStore:global.get('store' ).val.currency,
                        opt:global.get('store' ).val.seller.opt,
                        campaign:(global.get('campaign').val)?global.get('campaign').val.map(function (el) {
                            return el._id
                        }):null
                    }
                    //console.log(order)
                    if(user.type=='user'){
                        order.user=user._id;
                    }else if(user.type=='userEntry'){
                        order.userEntry=user._id;
                    }
                    //throw 'test'
                    return Orders.save(order).$promise;
                })
                .then(function(res){
                    newId=res.id;
                    return activate()

                })
                .then(function(){
                    self.$state.go('frame.orders.order',{id:newId})
                })
                .catch(function(err){
                    if(!err){return}
                    err = err.data||err
                    if(err){
                        exception.catcher('создание ордера')(err)
                    }
                })
        }
        function getUnReadChatMessages(order){
            if(!global.get('dialogs' ).val || !global.get('dialogs' ).val.length){return;}
            //console.log(dialog)
            var d =global.get('dialogs' ).val.getOFA('order',order._id);
            if(d){return d.count}
            /*for(var i=0,l=global.get('dialogs' ).val.length;i<l;i++){
                console.log(order._id)
                if (global.get('dialogs' ).val[i].order==order._id){
                    return global.get('dialogs').val[i].count;
                }
            }*/
        }
        function searchItem(searchStr){
            console.log(searchStr)
            self.query={}
            if(!searchStr){
                return getList(0);
            }
            var n = Number(searchStr);
            console.log(n)
            if(n){
                self.query.num=n;
            }else{
                var s= searchStr.substring(0,20)
                self.query['profile.fio']=s;
            }

            getList(0);
            //console.log(n)
            /*self.query={num:self.searchStr};
            */

        }
        function filterOrderList(item) {
            //console.log(item.status)
            if(!global.get('seller').val){
                return item.status!=6;
            }else{
                return true;
            }


        }



//***************************************************************************************************
    }
})()
