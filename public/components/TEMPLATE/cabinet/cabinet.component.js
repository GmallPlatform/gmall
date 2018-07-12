'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('cabinetItem',cabinetItem)
    function cabinetItem(global){
        var s=(global.get('store').val.template.addcomponents.cabinet && global.get('store').val.template.addcomponents.cabinet.templ)?global.get('store').val.template.addcomponents.cabinet.templ:''
        //console.log('views/template/partials/cabinet/cabinet'+s+'.html')
        return {
            scope: {},
            restrict:"EA",
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'views/template/partials/cabinet/cabinet'+s+'.html',
        }
    }
    itemCtrl.$inject=['global','$q','$timeout','$state','exception','Orders','CartInOrder','$order','$user','Coupon','Confirm','Booking','CreateContent','$notification','socket','$http','$uibModal','$stateParams'];
    function itemCtrl(global,$q,$timeout,$state,exception,Orders,CartInOrder,$order,$user,Coupon,Confirm,Booking,CreateContent,$notification,socket,$http,$uibModal,$stateParams) {
        var self=this;
        self.moment=moment;
        self.global=global;
        self.paginate={page:0,rows:20,items:0}
        self.paginateEntry={page:0,rows:5,items:0}
        self.query={}
        self.orderDetail=orderDetail;
        self.deleteOrder=deleteOrder;
        self.getOrders=getOrders;

        self.changePswd=changePswd;
        self.saveFieldUser=saveFieldUser;
        self.saveProfile=saveProfile;
        self.changeEmail=changeEmail;
        self.changeSubscription=changeSubscription;

        self.getEntries=getEntries;
        self.cancelEntry=cancelEntry;
        self.changePhone=changePhone;



        activate();
        function activate() {
            $q.when()
                .then(function () {
                    if(!global.get('user').val){
                        return $timeout(function () {},700)
                    }
                })
                .then(function () {
                    //console.log(global.get('user').val)
                    if(!global.get('user').val){
                        $state.go('home');
                        throw 'there is not a user in the system'
                    }
                })
                .then(function () {
                    self.query['user']=global.get('user' ).val._id;
                    self.user=global.get('user');
                    return getOrders()
                    //return Orders.getList(self.paginate,self.query)
                })
                /*.then(function (res) {
                    self.orders= res.filter(function (o) {return o.status!=6}).map(function(o){return $order.init('orderInList',o)});
                    //console.log(self.orders)
                })*/
                .then(function () {
                    self.queryEntry={$or:[{},{}]}
                    self.queryEntry.$or[0]['user._id']=global.get('user' ).val._id;
                    self.queryEntry.$or[1]['users._id']=  global.get('user' ).val._id;
                    return getEntries()
                    //return Booking.getList(self.paginateEntry,self.queryEntry)
                })
                .then(function () {
                    if($stateParams && $stateParams.sec){
                        if($stateParams.sec=='order'){
                            self.activeTabIndex=0
                        }else if($stateParams.sec=='online'){
                            self.activeTabIndex=1
                        }else if($stateParams.sec=='personal'){
                            self.activeTabIndex=2
                        }else if($stateParams.sec=='subscription'){
                            self.activeTabIndex=3
                        }else{
                            self.activeTabIndex=0
                        }
                    }else{
                        self.activeTabIndex=0
                        if(global.get('store').val.orderis){
                            if(global.get('store').val.onlineis){
                                self.activeTabIndex=2;
                            }else{
                                self.activeTabIndex=1;
                            }

                        }

                    }
                })
               /* .then(function (res) {
                    self.entries= res;
                    console.log(res)
                })*/
                .catch(function (err) {
                    console.log(err)
                    if(err){
                        exception.catcher('cabinet')(err)
                    }
                })
        }
        function getOrders() {
            var payData = global.get('store').val.payData
            return Orders.getList(self.paginate,self.query)
                .then(function (res) {
                    self.orders= res.filter(function (o) {
                        return o
                    }).map(function(o){return $order.initOrderInList(o)});
                    self.orders.forEach(function (o) {
                        o.date= moment(o.date).format('lll')
                        if(o.status==2 && global.get('store').val.onlinePay){
                            if(payData && payData.liqPay && payData.liqPay.is){
                                $order.getCheckOutLiqpayHtml(o)
                            }
                        }else if(o.pay && o.pay[0]){
                            o.pay[0].date=moment(o.pay[0].date).format('lll')
                        }
                    })
                })
        }
        function getEntries() {
            var payData = global.get('store').val.payData
            return Booking.getList(self.paginateEntry,self.queryEntry)
                .then(function (res) {
                    self.entries= res.map(function (entry) {
                        entry.master = global.get('mastersO').val[entry.master]
                        //console.log(entry.master)
                        entry.dateOblect=Booking.getDateFromEntry(entry);
                        entry.dateString= moment(entry.dateOblect).format('LLL')
                        //var date = new Date(entry.date)
                        //console.log(entry.date)
                        //console.log(moment(entry.dateOblect).unix()-moment().unix())
                        try{
                            if(moment(entry.dateOblect).unix()-moment().unix()>3600){
                                entry.cancel=true;
                            }
                        }catch(err){console.log(err)}

                        //entry.date= moment(entry.date).format('lll')
                        //console.log((!entry.status || entry.status!=1) && global.get('store').val.onlinePayEntry)
                        if(entry.user && entry.user._id!='schedule'){
                            if((!entry.status || entry.status!=1) && global.get('store').val.onlinePayEntry){
                                if(payData && payData.liqPay && payData.liqPay.is){
                                    Booking.getCheckOutLiqpayHtml(entry)
                                }
                            }else if(entry.pay && entry.pay.date){
                                entry.pay.date=moment(entry.pay.date).format('lll')
                            }
                        }else if(entry.user && entry.user._id=='schedule' && entry.users){
                            var userData =  entry.users.getOFA('_id',global.get('user').val._id)
                            console.log(userData)
                            if(global.get('store').val.onlinePayEntry){
                                if(!userData.pay || !userData.pay.date){
                                    Booking.getCheckOutLiqpayHtml(entry,userData)
                                }else if(userData.pay && userData.pay.date){
                                    entry.pay.date=moment( userData.pay.date).format('lll')
                                }
                            }
                        }
                        return entry;
                    });
                })
        }
        function cancelEntry(entry) {
            console.log(entry)
            //notification
            try{
                // отправка уведомления
                entry.masterName=(entry.master && entry.master.name)?entry.master.name:'?????'
                entry.dateForNote = entry.dateString;
                var content=CreateContent.dateTimeCancelNote(entry)
                var o={addressee:'seller',
                    type:'dateTime',
                    content:content,
                    seller:global.get('store').val.seller._id};
            }catch(err){
                console.log(err)
            }
            Confirm(global.get('lang').val.delete+"?" )
                .then(function () {
                    return Booking.delete({_id:entry._id}).$promise;
                })
                .then(function () {
                    getEntries()
                    socket.emit('newRecordOnSite',{store:global.get('store').val._id,seller:global.get('store').val.seller._id})
                    return $notification.save(o).$promise;
                })
                .then(function(res){
                    exception.showToaster('note', global.get('langNote').val.sent,'');
                    if(global.get('store').val.seller.phone){
                        var o={}
                        o.userId=global.get('user').val._id
                        o.text="удалена запись на "+entry.dateString+" "+entry.master.name;
                        o.phone=global.get('store').val.seller.phone;
                        //console.log(o)
                        return $http.post('/api/users/sendMessageAboutDeal',o)
                    }
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('error')(err);
                    }

                })

        }
        function orderDetail(order) {
            order.collapse=!order.collapse;
            if(!order.firsOpen){
                order.firsOpen=true;
                CartInOrder.get({_id:order.cart._id},function (res) {
                    order.setCart(res.stuffs)
                    if(order.coupon){
                        Coupon.get({_id:order.coupon},function (res) {
                            if(res){
                                order.coupon=res
                            }
                        })
                    }
                })
            }
        }
        function deleteOrder(order) {
            Confirm(global.get('lang').val.delete+"?" )
                .then(function(){
                    order.status=6;
                    return Orders.save({update:'status'},{_id:order._id,status:order.status}).$promise;
                })
                .then(function () {
                    self.paginate.page=0;
                    return Orders.getList(self.paginate,self.query)
                })
                .then(function (res) {
                    self.orders= res.filter(function (o) {
                        return o
                        //return o.status!=6
                    }).map(function(o){return $order.initOrderInList(o)});
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('cabinet')(err)
                    }
                })
        }



        function getCheckOutLiqpayHtml(order) {
            $q.when()
                .then(function () {
                    return $http.post('/api/orders/checkoutLiqpay',order)
                })
                .then(function (res) {
                    console.log(res)
                    if(!res || !res.data.html){
                        return;
                    }
                    order.checkOutLiqpayHtml=res.data.html
                    order.checkOutLiqpayHtmlIs=true;
                })
                .then(function(res){
                })
                .catch(function(err){
                    exception.catcher('error')(err);
                })


            /*LiqPayCheckout.init({
                data: "eyAidmVyc2lvbiIgOiAzLCAicHVibGljX2tleSIgOiAieW91cl9wdWJsaWNfa2V5IiwgImFjdGlv" +
                "biIgOiAicGF5IiwgImFtb3VudCIgOiAxLCAiY3VycmVuY3kiIDogIlVTRCIsICJkZXNjcmlwdGlv" +
                "biIgOiAiZGVzY3JpcHRpb24gdGV4dCIsICJvcmRlcl9pZCIgOiAib3JkZXJfaWRfMSIgfQ==",
                signature: "QvJD5u9Fg55PCx/Hdz6lzWtYwcI=",
                embedTo: "#liqpay_checkout",
                mode: "popup" // embed || popup
            }).on("liqpay.callback", function(data){
                console.log(data.status);
                console.log(data);
            }).on("liqpay.ready", function(data){
                // ready
            }).on("liqpay.close", function(data){
                // close
            });*/
        }


        /*********** users ***************************************/
        function changePswd(_){
            $q.when()
                .then(function(){
                    return $user.changePswd(self.user.val._id)
                })
                .then(function () {
                    exception.showToaster('succes','статус','обновлено!')
                })
                .catch(function(err){
                    if(err){
                        err=err.data||err;
                        exception.catcher('смена пароля')(err)
                    }
                })
        }
        function saveProfile(form){
            //console.log(form)
            var o ={_id:self.user.val._id,profile:self.user.val.profile}
            $user.save({update:'profile'},o,function () {
                exception.showToaster('succes','статус','обновлено!')
            })

        }
        function changePhone(phone) {
            /*console.log(self.user.val.profile);
            console.log(phone)*/
            if(phone){
                $q.when()
                    .then(function () {
                        return $user.checkPhoneForExist(phone)
                    })
                    .then(function (res) {
                        console.log('done')
                        if(res && res.exist){
                            throw 'phone exist in base'
                        }
                        saveProfile()

                    })
                    .catch(function (err) {
                        if(err){
                            exception.catcher('change phone')(err)
                        }

                    })

            }else{
                self.user.val.profile.phone=''
                //phone=''
                saveProfile()
            }


        }

        function saveFieldUser(field) {
            var o ={_id:self.user.val._id}
            var fieldFoDB='profile.'+field;
            o[fieldFoDB]=self.user.val.profile[field]
            if(field=='cityId'){
                fieldFoDB+=' profile.city';
                o['profile.city']=self.user.val.profile['city']
            }
            $user.save({update:fieldFoDB},o,function () {
                exception.showToaster('succes','статус','обновлено!')
            })
        }
        function changeEmail(){
            $q.when()
                .then(function () {
                    return $user.changeEmail(global.get('user').val._id)
                })
                .then(function (res) {
                    console.log(res)
                    global.get('user').val.email=res
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('change email')(err)
                    }
                })
        }
        function changeSubscription() {
            var item=global.get('user').val
            var o={_id:item._id};
            o['subscription']=item['subscription']
            return $user.save({update:'subscription'},o ).$promise.then(function(){
                exception.showToaster('succes','статус','обновлено!')
            },function(err){console.log(err)});
        }

    }
})()
