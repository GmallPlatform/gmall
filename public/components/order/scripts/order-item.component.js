'use strict';
(function(){
    angular.module('gmall.services')
        .directive('ordersItem',ordersItemDirective);
    function ordersItemDirective(){
        return {
            scope: {},
            restrict:'E',
            bindToController: true,
            controller: orderItemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/order/order-item.html',
        }
    }
    orderItemCtrl.$inject=['$rootScope','Orders','Stuff','$order','global','$anchorScroll','Helper','CreateContent','$window','$email','$notification','toaster','$q','$http','$location','exception','Confirm','CartInOrder','$user','$timeout','$dialogs','Seller','ExternalCatalog','$uibModal','FilterTags','Filters'];
    function orderItemCtrl($rootScope,Orders,Stuff,$order,global,$anchorScroll,Helper,CreateContent,$window,$email,$notification,toaster,$q,$http,$location,exception,Confirm,CartInOrder,$user,$timeout,$dialogs,Seller,ExternalCatalog,$uibModal,FilterTags,Filters){
        var self=this;
        if($rootScope.$stateParams.block){
            self.block=$rootScope.$stateParams.block
        }else{
            self.block='delivery';
        }
        //console.log(self.block)
        self.mobile=global.get('mobile' ).val;
        self.moment=moment;
        self.global=global;
        $rootScope.orderEditCtrl=self;
        self.statusArray=[{status:'поступил',value:1},
            {status:'принят',value:2},
            {status:'оплачен',value:3},
            {status:'отправлен',value:4},
            {status:'доставлен',value:5},
            {status:'удален',value:6}]
        var $stateParams= $rootScope.$stateParams;
        var $state= $rootScope.$state;
        self.stuff='';
        self.order=null;
        var reload=false;
        $rootScope.$on('logged',function(){
            //console.log('logged')
            self.participant=(global.get('seller').val)?'seller':'user';
        })
        self.participant=(global.get('seller').val)?'seller':'user';
        //*********** properties******

        //********** methods**********
        self.addStuffInOrder=addStuffInOrder;
        self.startChat=startChat;
        self.setStuffListForShip=setStuffListForShip;

        //*************shipdtail**********************************
        self.addStuffInShipDetail=addStuffInShipDetail;
        self.removeStuffFromShipDetail=removeStuffFromShipDetail;
        self.deleteShip=deleteShip;
        self.deletePay=deletePay;
        self.getExtCatalog=getExtCatalog;
        self.changeStatus=changeStatus;
        self.setNewPriceForStuff=setNewPriceForStuff;
        self.enableAddStussInShipDetail=enableAddStussInShipDetail;
        self.addStuffToShipDetail=addStuffToShipDetail;
        self.decreaseQty=decreaseQty;
        self.increaseQty=increaseQty;
        self.getFilterName=getFilterName;
        self.backState=backState;
        self.decreaseDiscount=decreaseDiscount
        self.increaseDiscount=increaseDiscount
        self.getShipDetailQty=getShipDetailQty
        self.createNewOrder=createNewOrder;
        self.addStuffToExistOrder=addStuffToExistOrder;
        self.updateDiscount=updateDiscount;

        //**********************************************************************************************
        //*********************************************************************************************

        //********************activate***************************
        activate();
        //*******************************************************
        function activate(){

            $anchorScroll();
            $q.when()
                .then(function(){
                    if(global.get('masters')){
                        return global.get('masters').val
                    }else{
                        return []
                    }
                })
                .then(function(data){
                    self.masters=data;
                    //console.log(self.masters)
                })
                .then(function(){
                    return FilterTags.getFilterTags()
                })
                .then(function(res){
                    self.filterTags=res;
                    return Filters.getFilters()
                })
                .then(function(res){
                    self.filters=res;
                    return ExternalCatalog.getItems()
                })
                .then(function(extCatalogs) {
                    //console.log(extCatalogs)
                    self.extCatalogs=extCatalogs;
                    $order.init('order',$stateParams.id).then(function(order){
                        //console.log(order.cart.stuffs)
                        order.sortCart();
                        self.order=order;
                        self.orderForChat={_id:order._id,num:order.num}
                        self.status=self.statusArray.getObjectFromArray('value',order.status);
                        // список для выбора товаров для доставки
                        /*self.listStuffForShip=order.cart.stuffs.map(function(s){
                         return  s.name+' '+(s.artikul||'')+' '+(s.sortName||'');
                         })*/
                        setStuffListForShip();

                        self.currencyArray = Object.keys(order.currencyStore).map(function(k) { return order.currencyStore[k] });
                        self.currency=order.currencyStore[order.currency]


                        //chat
                        //console.log(self.participant)
                        $q.when()
                        /*.then(function(){
                         return $user.getItem(order.user,'order')
                         })*/ // получение user
                            .then(function(user){
                                //order.user=user;
                                // купон
                                if(global.get('coupons').val && global.get('coupons').val[0] && (!order.coupon || !order.coupon._id)){
                                    if(order.user.coupons.indexOf(global.get('coupons').val[0]._id)<0){
                                        self.coupon=global.get('coupons').val[0]
                                    }else if(global.get('coupons').val[1] && order.user.coupons.indexOf(global.get('coupons').val[1]._id)<0){
                                        self.coupon=global.get('coupons').val[1]
                                    }
                                }
                            })
                            /*.then(function(){
                             return Seller.getItem(order.seller,'order')
                             }) // получение seller
                             .then(function(seller){
                             console.log(seller)
                             order.seller=seller;
                             })*/ // получение seller
                            .then(function(){
                                self.dialog={
                                    seller:self.order.seller._id,
                                    user:self.order.user._id,
                                    order: self.order._id
                                };
                                return $dialogs.query({query:self.dialog} ).$promise
                            })
                            .then(function(res){
                                self.dialog.sellerName=self.order.seller.name;
                                self.dialog.userName=self.order.user.name;
                                self.dialog.orderNum=self.order.num;
                                if (res && res[0] && res[0].index){
                                    return res[1]._id;
                                }else {
                                    return null;
                                }
                            })
                            .then(function(id){
                                if (id){
                                    self.dialog._id=id;
                                }else{
                                    self.buttonStartDialog=true;
                                }
                            })
                            .catch(function(err){
                                console.log(err);
                            })
                        //console.log(self.coupon)
                        //self.$broadcast('loadOrder')
                    },function(err){
                        $dialogs.query({query:{order:$stateParams.id}},function(res){
                            if(res && res[0].index){
                                for(var i=1;i<res.length;i++){
                                    if(res[i]._id){
                                        $dialogs.delete({id:res[i]._id} )
                                    }

                                }
                            }
                        })
                        $rootScope.$state.go('frame.404')
                    });
                })


        }
        function backState(){
            $rootScope.$state.go('frame.orders',$rootScope.$stateParams,{reload:reload})

        }
        function getExtCatalog(i){
            if(i==0 && self.order.cart.stuffs[i].extCatalog){
                return self.extCatalogs.find(function(c){return c._id==self.order.cart.stuffs[i].extCatalog})
            }else if(self.order.cart.stuffs[i].extCatalog && self.order.cart.stuffs[i-1].extCatalog!=self.order.cart.stuffs[i].extCatalog){
                return self.extCatalogs.find(function(c){return c._id==self.order.cart.stuffs[i].extCatalog})
            }
        }
        function addStuffInOrder(){
            $q.when()
                .then(function(){
                    return Stuff.selectItemWithSort()
                })
                .then(function(stuff){
                    //console.log(stuff)
                    $order.addItemToCart(stuff);
                })
                .then(function(stuff){
                    setStuffListForShip()
                    //return saveCartInOrder();
                })
                .then(function(){
                    showToaster('note','Сохренено','информация обновлена')
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('обновление данных')(err)
                    }

                })
        }
        function saveCartInOrder(){
            var o=angular.copy($order.getOrder().cart);
            o.order=self.order._id;
            setStuffListForShip()
            return CartInOrder.save(o).$promise
        }

        function decreaseQty(i){
            if(self.order.cart.stuffs[i].quantity==1){return}
            reload=true;
            $order.decreaseQty(i)
            var s = self.order.cart.stuffs[i]
            var n = s.name+' '+(s.artikul||'')+' '+(s.sortName||'');
            removeItemFromShip(self.order.shipDetail,n)
            updateOrderField('shipDetail');
            setStuffListForShip();
        }
        function removeItemFromShip(ship,n,all){
            var done=false
            for(var i=0;i<ship.length&&!done;i++){
                for(var j=0;j<ship[i].stuffs.length;j++){
                    if(n==ship[i].stuffs[j].name){
                        ship[i].stuffs[j].qty--;
                        if(!ship[i].stuffs[j].qty || all){
                            ship[i].stuffs.splice(j,1)
                        }
                        done=true;
                        break;
                    }
                }
            }
        }
        function increaseQty(i){
            reload=true;
            $order.increaseQty(i)
            setStuffListForShip();
        }
        function increaseDiscount(){
            if(self.order.discount.value<1000){
                self.order.discount.value++
            }
        }
        function decreaseDiscount(){
            if(self.order.discount.value>0){
                self.order.discount.value--
            }
        }
        function getFilterName(tag){
            if(!self.filterTags || !self.filters){return}
            //console.log(tag)
            var t = self.filterTags.getOFA('_id',tag)
            if(t && t.filter){
                var f = self.filters.getOFA('_id',t.filter)
                if(f){return f.name}else{
                    return ''
                }
            }else{return ''}
        }
        // купон в ордере может быть только удален. или добавлен из списка купонов пользователя
        self.removeItem=function(i){
            reload=true;
            var s = self.order.cart.stuffs[i]
            var n = s.name+' '+(s.artikul||'')+' '+(s.sortName||'');
            removeItemFromShip(self.order.shipDetail,n,true)
            updateOrderField('shipDetail');
            $order.removeItem(i);
            setStuffListForShip()

        }
        self.updateOrder=function(field){
            //console.log(self.order)
            $state.go('frame.orders',{reload:true})
            if (dontUpdate){
                return self.orderId=null;
            }

        }
        function getShipDetailQty(stuffs){
            var qty=stuffs.reduce(function(s,i){
                return s+Number(i.qty)
            },0);
            return qty;
        }

        //******************************************************************
        //****************** добавление товара******************************
        //******************************************************************
        self.selectStuff = function(stuff){
            reload=true;
            $order.addItemToCart(stuff)
        }
        self.refresStuffs = function(search) {
            //console.log(search)
            if (search && search.length && search.length>2){
                Stuff.getList(null,search.substring(0,30),0,30,'fullListForAddToCart').then(function(res){
                    if(res){
                        res.forEach(function(el){
                            var _sp;
                            if (global.getSticker){
                                _sp=global.getSticker(el,true);
                            }
                            if (_sp && _sp.sticker){
                                el.sticker=_sp.sticker;
                            } else {
                                el.sticker = _sp;
                            }
                        })
                        self.stuffs=res
                        //console.log(res)
                        //res.forEach(function(el){self.stuffs.push(el)})
                    }else{
                        self.stuffs=[]
                    }
                })
            }
        }

        function setNewPriceForStuff(stuff){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/order/modal/setNewPrice.html',
                controller: function($uibModalInstance,stuff){
                    var self=this;
                    self.price=(stuff.priceSale)?stuff.priceSale:'';
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                    self.ok = function () {
                        $uibModalInstance.close(self.price);
                    };
                },
                controllerAs:'$ctrl',
                resolve:{
                    stuff:function(){
                        return stuff;
                    }
                }
            });

            modalInstance.result.then(function (priceSale) {
                //console.log(priceSale,typeof priceSale,typeof stuff.price)
                reload=true;
                if(priceSale && priceSale!='0' && priceSale!=stuff.price){
                    stuff.priceSale=priceSale;
                    stuff.priceSaleHandle=true;
                }else{
                    stuff.priceSale=null;
                    stuff.priceSaleHandle=false;
                }
                stuff.campaignUrl=null;
                stuff.campaignId=null
                stuff.priceCampaign=null;
                $order.updateOrder();
            });
        }

        //************************************* helper**********************
        /*Helper.getItem($state.current.name,function(res){
            if(res.popover){
                self.popover=res.popover;
            }
            if(res.intro){
                self.intro=res.intro;
            }
            self.IntroOptions = {
                steps:[
                    {
                        element: document.querySelector('#step1'),
                        intro:self.intro[1]
                    },
                    {
                        element: document.querySelectorAll('#step2')[0],
                        intro: "<strong>You</strong> can also <em>include</em> HTML",
                        //position: 'right'
                    },
                    {
                        element: '#step3',
                        intro: 'More features, more fun.',
                        // position: 'left'
                    },
                    {
                        element: '#step4',
                        intro: "Another step.",
                        //position: 'bottom'
                    },
                    {
                        element: '#step5',
                        intro: 'Get it, use it.'
                    }
                ],
                showStepNumbers: false,
                showBullets: false,
                exitOnOverlayClick: true,
                exitOnEsc:true,
                nextLabel: '<strong>еще</strong>',
                prevLabel: '<span style="color:green">назад</span>',
                skipLabel: 'Выход',
                doneLabel: 'Thanks'
            };

        })*/
        function createNewOrder(){
            var newCart=[],n,name;
            for(var i=0;i<self.order.cart.stuffs.length;i++){
                if(self.order.cart.stuffs[i].selected){
                    n = self.order.cart.stuffs.splice(i,1)
                    i--;
                    newCart.push(n[0])
                    name = n[0].name+' '+(n[0].artikul||'')+' '+(n[0].sortName||'');
                    console.log(name)
                    removeItemFromShip(self.order.shipDetail,name,true)
                }
            }
            //console.log(newCart)
            if(newCart.length){
                var newOrder=angular.copy(self.order)
                newOrder.cart={stuffs:newCart}
                delete newOrder._id
                delete newOrder.num
                delete newOrder.date
                delete newOrder.date1
                delete newOrder.date2
                delete newOrder.date3
                delete newOrder.date4
                delete newOrder.invoice
                delete newOrder.invoiceInfo
                delete newOrder.statSent
                /*delete newOrder.maxDiscountOver
                delete newOrder.order.priceSaleHandle*/
                if(newOrder.coupon && newOrder.coupon._id){
                    newOrder.coupon = newOrder.coupon._id;
                }
                if(newOrder.seller && newOrder.seller._id){
                    newOrder.seller = newOrder.seller._id;
                }
                if(newOrder.user && newOrder.user._id){
                    newOrder.user = newOrder.user._id;
                }
                if(newOrder.userEntry){
                    newOrder.user=null;
                }
                if(newOrder.campaign && newOrder.campaign.length){
                    newOrder.campaign = newOrder.campaign.map(function(c){
                        if(c._id){return c._id}else{return c}

                    });
                }
                newOrder.status=1;
                newOrder.pay=[];
                newOrder.discount={type:0,value:0};


                newOrder.quantity=newOrder.cart.stuffs.reduce(function(q,i){return q+i.quantity},0)
                newOrder.sum=newOrder.cart.stuffs.reduce(function(s,i){return s+i.quantity*i.cena},0)
                newOrder.paySum = newOrder.sum*newOrder.kurs;
                newOrder.priceSaleHandle=newOrder.cart.stuffs.some(function(s){return s.priceSaleHandle})
                newOrder.maxDiscountOver=newOrder.cart.stuffs.some(function(s){return s.maxDiscountOver})
                console.log(newOrder)
                $timeout(function(){
                    $order.updateOrder()
                },100)

                updateOrderField('shipDetail');
                setStuffListForShip();

                Orders.save(newOrder,function(){
                    $rootScope.$emit('reloadOrderList')
                })
            }
        }
        function addStuffToExistOrder() {
            $q.when()
                .then(function () {
                    var paginate ={page:0,rows:20}
                    var query={};
                    query.user=self.order.user;
                    query.status={$lte:2}
                    return Orders.getList(paginate,query )
                })
                .then(function (results) {
                    var orders=results.filter(function (o) {
                        return o._id!=self.order._id
                    })
                    //console.log(orders)
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'components/order/modal/selectOrders.html',
                        controller: function($uibModalInstance,orders){
                            var self=this;
                            if(!orders){orders=[]}
                            self.orders=orders.map(function (o) {
                                o.date=moment(o.date).format('LLL')
                                return o;
                            });
                            //console.log(self.orders)
                            self.cancel = function () {
                                $uibModalInstance.dismiss();
                            };
                            self.ok = function (order) {
                                $uibModalInstance.close(order);
                            };
                        },
                        controllerAs:'$ctrl',
                        resolve:{
                            orders:function(){
                                return orders;
                            }
                        }
                    });
                    return modalInstance.result
                })
                .then(function (order) {
                    if(order && order._id){
                        return Orders.getItem(order._id)
                    }
                })
                .then(function (order) {

                    if(order && order.cart){
                        var cart = angular.copy(order.cart);
                        if(typeof cart=='object'){
                            if(!cart.stuffs){
                                cart.stuffs=[];
                            }
                            cart.order=order._id;
                            var n,is;
                            for(var i=0;i<self.order.cart.stuffs.length;i++){
                                if(self.order.cart.stuffs[i].selected){
                                    n = self.order.cart.stuffs.splice(i,1)
                                    i--;

                                    is=false;
                                    for(var j=0;j<cart.stuffs.length;j++){
                                        if(cart.stuffs[j]._id==n[0]._id && cart.stuffs[j].sort==n[0].sort){
                                            is=true;
                                            cart.stuffs[j].quantity++
                                            break;
                                        }
                                    }
                                    if(!is){
                                        cart.stuffs.push(n[0])
                                    }

                                    name = n[0].name+' '+(n[0].artikul||'')+' '+(n[0].sortName||'');
                                    //console.log(name)
                                    removeItemFromShip(self.order.shipDetail,name,true)
                                }
                            }
                            //console.log(cart)
                            //throw 'test'
                            return CartInOrder.save({update:'stuffs'},cart).$promise

                        }
                    }else{
                        throw 'нет корзины с товарами в ордере'
                    }
                })
                .then(function () {
                    $timeout(function(){
                        $order.updateOrder()
                    },100)

                    updateOrderField('shipDetail');
                    setStuffListForShip();
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('добавление товара в ордер')(err)
                    }
                })
        }
        //******************************************************************
        //****************** общие методы **********************************
        //******************************************************************
        self.getPercent = function () {
            if(!self.order.sum || !self.order.sum0){
                return 0;
            }else{
                /*console.log(self.order.sum,self.order.sum0)
                console.log(Math.round((1-self.order.sum/self.order.sum0)*100))*/
                return Math.round((1-self.order.getTotalSum()/self.order.sum0)*100)
            }

        }
        self.getNow=function(){
            return Date.now();
        }
        var getCategoryNameUrl = function(id){
            //console.log(id)
            if (!id || id=='category') return {name:'category',url:'id'};
            for (var i= 0,l=global.get('categories').val.length;i<l;i++){
                if (global.get('categories').val[i]._id==id){
                    var s= global.get('categories').val[i].name.replace(/(["'\/\s])/g, "-");
                    return {name:s,url:global.get('categories').val[i].url,groupUrl:global.get('categories').val[i].group.url} ;
                    break;
                }
            }
        }
        self.goToStuff = function(stuff){
            return $window.location.href='/content/stuffs/group/category/'+stuff.url;
            //console.log(global.get('categories').val);
            if (!stuff) return;
            var category = (stuff.category && stuff.category._id)?stuff.category._id:stuff.category;
            var brand = (stuff.brand && stuff.brand._id)?stuff.brand._id:stuff.brand;
            var categoryNameUrl=getCategoryNameUrl(category);
            var stuffUrl = (stuff.url)?stuff.url:stuff.stuffUrl;
            var obj = {
                groupUrl:categoryNameUrl.groupUrl,
                categoryName:categoryNameUrl.name.replaceBlanks(),
                categoryUrl:categoryNameUrl.url,
                stuffUrl:stuffUrl
            }
            var url ='/'+obj.groupUrl+'/'+obj.categoryName+'/'+obj.categoryUrl+'/'+obj.stuffUrl;
            if (stuff.addCriterionToCart && stuff.addCriterionToCart.length){
                obj.param1=stuff.addCriterionToCart[0];
                url+='?param1='+obj.param1;
                if(stuff.addCriterionToCart.length==2){
                    obj.param2=stuff.addCriterionToCart[1];
                    url+='&param2='+obj.param1;
                }
            }
            $window.location.href=url;

        }

        self.datePickerOptions ={

            locale: {
                applyClass: 'btn-green',
                applyLabel: "Выбрать",
                fromLabel: "от",
                toLabel: "до",
                cancelLabel: 'Отменить',
                customRangeLabel: 'Прозвольный диапазон',
                format:"DD.MM.YY",
                daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
                firstDay: 1,
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                    'Ноябрь', 'Декабрь'
                ]
            },
            singleDatePicker: true
        }

        //******************************************************************
        //****************** вспомогательные фунуции************************
        //******************************************************************
//********************************отправка письма
        var sendMail = function(dataEmail,cb){
            //console.log(dataEmail)
            var deferred=$q.defer();
            var domain=global.get('store').val.name||self.order.domain;
            var o={email:dataEmail.email,content:dataEmail.content,subject:dataEmail.subject+' ✔',from:domain+  '<'+dataEmail.addSubject+'@'+global.get('store').val.domain+'>'};
            $email.save(o,function(res){
                deferred.resolve();
            },function(err){
                deferred.reject();
            })
            return deferred.promise;
        }
        //********************************отправка push notification
        var pushNotification=function(note,cb){
            $notification.save(note,function(res){
                cb();
            },function(err){
                //console.log(err)
                cb(err)
            })
        }
        //********************* показ тостера
        function showToaster(type,title,content){
            toaster.pop({
                type: type,
                title: title,
                body: content,
                bodyOutputType: 'trustedHtml',
                showCloseButton: true,
                delay:15000,
                closeHtml: '<button>Close</button>'
            });
        }
        //****************************** обновление свойства ордера
        var updateOrderField=function(){
            var deferred=$q.defer();
            var fieldList='';
            //console.log(arguments);
            var order =self.order;
            var o={ _id:self.order._id,seller:self.order.seller}
            var args=arguments;
            $timeout(function(){
                Array.prototype.forEach.call(args,function(field){
                    //console.log(field)
                    if(field=='paySum'){
                        reload=true;
                    }
                    o[field]=self.order[field];
                    if(fieldList){fieldList+=' '};
                    fieldList+=field;
                })
                Orders.save({update:fieldList},o,function(){
                    deferred.resolve();
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)


                },function(err){
                    deferred.reject();
                });

            },300)
            return deferred.promise;
        }
        function updateDiscount(){
            self.order.priceSaleHandle=self.order.cart.stuffs.some(function(s){return s.priceSaleHandle})
            self.order.maxDiscountOver=self.order.cart.stuffs.some(function(s){return s.maxDiscountOver})
            updateOrderField('discount','sum', 'paySum','maxDiscountOver','priceSaleHandle')
        }
        //*************************************************************
        //******************************************************************
        //****************** управление ордером*****************************
        //******************************************************************
        self.changeCurrency=function(){
            reload=true;
            self.order.currency=self.currency[1];
            self.order.kurs=self.currency[0];
            self.updateOrderField('currency','kurs')
            self.updateCart()
        }
        //********************************************************************
        //********************************************************************
        self.updateOrderField=function(){
            updateOrderField.apply(updateOrderField,arguments).then(function(){
                global.set('saving',true);
                $timeout(function () {
                    global.set('saving',false);
                },1500)
                //showToaster('note','Сохренено','информация обновлена')
            },function(){
                showToaster('error','Ошибка','не удалось сохранить')
            });
        }

        function displayContentInPopUpWin(c){
            var popupWin=window.open();
            popupWin.window.focus();
            popupWin.document.write(c);
        }
        self.printShip=function(){
            displayContentInPopUpWin(CreateContent.orderShipInfo(self.order));
        }
        self.printOrder=function(){
            displayContentInPopUpWin(CreateContent.order(self.order,false,true));
            //displayContentInPopUpWin(CreateContent.order(self.order,true));
        }
        self.printInvoice=function(){
            displayContentInPopUpWin(CreateContent.order(self.order,'invoice'));
        }
        self.updateCart = function(){
            $order.updateOrder();
            setStuffListForShip();
        }
        function setStuffListForShip(){
            self.listStuffForShip=[]
            self.order.cart.stuffs.forEach(function(s){
                var n = s.name+' '+(s.artikul||'')+' '+(s.sortName||'');
                var o = {name:n.trim(),qty:s.quantity}
                if(s.unitOfMeasure){o.unitOfMeasure=s.unitOfMeasure}
                self.listStuffForShip.push(o)
            })
            if(!self.order.shipDetail){self.order.shipDetail=[];}
            self.order.shipDetail.forEach(function(sd){
                for(var i=0;i<sd.stuffs.length;i++){
                    if(sd.stuffs[i].name){
                        var s = self.listStuffForShip.getOFA('name',sd.stuffs[i].name)
                        if(s){
                            s.qty -=sd.stuffs[i].qty
                        }
                    }
                }
            })
            self.listStuffForShip=self.listStuffForShip.filter(function(o){return o.qty})
        }


        function enableAddStussInShipDetail(name){
            var s = self.listStuffForShip.getOFA('name',name)
            return s && s.qty
        }
        function addStuffInShipDetail(shipDetail,stuff){
            // из списка в селекте
            var added=false;
            for(var i =0;i<shipDetail.stuffs.length;i++){
                if(shipDetail.stuffs[i].name && shipDetail.stuffs[i].name==stuff.name){
                    added=true;
                    shipDetail.stuffs[i].qty +=stuff.qty;
                    break;
                }
            }
            if(!added){
                var o= {name:stuff.name,qty:stuff.qty};
                if(stuff.unitOfMeasure){o.unitOfMeasure=stuff.unitOfMeasure}
                shipDetail.stuffs.push(o)
            }
            setStuffListForShip();
            updateOrderField('shipDetail');
        }
        function addStuffToShipDetail(shipDetail,i){
            // из товара  по плюсике
            var s = self.listStuffForShip.getOFA('name',shipDetail.stuffs[i].name)
            if(s && s.qty){
                shipDetail.stuffs[i].qty++
                //s.qty--
            }
            setStuffListForShip()
            updateOrderField('shipDetail');
        }
        function removeStuffFromShipDetail(shipDetail,i){
            if(shipDetail.stuffs[i].qty && shipDetail.stuffs[i].qty>1){
                shipDetail.stuffs[i].qty--
            }else {
                shipDetail.stuffs.splice(i,1);
            }
            /*var s = self.listStuffForShip.getOFA('name',shipDetail.stuffs[i].name)
            if(s){
                s.qty++
            }*/
            setStuffListForShip()
            updateOrderField('shipDetail');
        }
        function deleteShip(i){
            self.order.shipDetail.splice(i,1);
            self.setStuffListForShip();
            updateOrderField('shipDetail','paySum');
        }
        function deletePay(i){
            self.order.pay.splice(i,1);
            updateOrderField('pay','paySum');
        }
        //console.log(global.get('store').val)

        self.sendNotification=function(type,obj,addressee){

            $q.when()
                .then(function () {
                    if(type=='invoice'){
                        return $order.getCheckOutLiqpayHtml(self.order,true)
                    }
                })
                .then(function () {
                    /*console.log(self.order.checkOutLiqpayHtml)
                    throw 'test'*/
                    if(self.order.checkOutLiqpayHtmlIs){
                        var pos = self.order.checkOutLiqpayHtml.indexOf('src="//');
                        self.order.checkOutLiqpayHtml=self.order.checkOutLiqpayHtml.substr(0, pos+5) + 'https:'+ self.order.checkOutLiqpayHtml.substr(pos+5)
                        /*pos = self.order.checkOutLiqpayHtml.indexOf('</form>');
                        var str = '<p><button type="submit" class="btn bnt-project" style="width: 200px; height: 50px; background-color: #9acc72; color:#fff; text-transform: uppercase">'+((global.get('langOrder').val.pay)?global.get('langOrder').val.pay.toUpperCase():'оплатИть')+'</button><style>.btn-project:hover {background-color: #6b904c}</style></p>';
                        self.order.checkOutLiqpayHtml=self.order.checkOutLiqpayHtml.substr(0, pos) + str+ '</form>';*/
                    }
                    //console.log(self.order.checkOutLiqpayHtml)
                    //throw 'ffff'

                    if (!addressee){addressee='seller'}else{addressee=self.order.user._id||self.order.user}
                    var o={addressee:addressee,type:type,content:''};
                    o.seller=self.order.seller._id;
                    //if (user=='seller'){o.seller=self.order.seller._id}
                    // console.log(user,o)
                    //**************** формирование контента
                    var dataEmail={content:''};
                    var noteContent;
                    var notification='send'
                    if (type=='pay'){
                        updateOrderField('pay')
                        o.content=CreateContent.payInfo(self.order,obj);
                        noteContent='уведомление об оплате отправлено'
                    }else if(type=='shipDetail'){
                        updateOrderField('shipDetail')
                        o.content=CreateContent.shipInfo(self.order,obj);
                        noteContent='уведомление о доставке отправлено'
                    }else if(type=='invoice'){
                        if(self.order.user.email){
                            self.order.invoice=Date.now();
                            updateOrderField('invoice')
                            noteContent='счет отправлен на email.'
                            o.content=CreateContent.invoiceInfo(self.order);
                            //console.log(o.content)
                            dataEmail.content=CreateContent.order(self.order,'invoice')
                            dataEmail.subject=(global.get('langOrder').val.invoiceforpay)?global.get('langOrder').val.invoiceforpay.toUpperCase():'СЧЕТ НА ОПЛАТУ'+' ✔';
                            dataEmail.addSubject='sales';
                            dataEmail.email=[self.order.user.email,global.get('store').val.seller.salemail];
                        }
                    }else if(type=='accepted'){
                        self.order.date2=Date.now();
                        updateOrderField('date2')
                        if(self.order.user.email){
                            dataEmail.content=CreateContent.order(self.order,false,true)
                            //console.log(dataEmail.content,self.order.user)
                            o.content=dataEmail.content;
                            noteContent='уведомление и письмо отправлены';
                            dataEmail.subject=(global.get('langOrder').val.orderaccepted)?global.get('langOrder').val.orderaccepted.toUpperCase():'ЗАКАЗ ПРИНЯТ'+' ✔';
                            dataEmail.addSubject='sales';
                            dataEmail.email=self.order.user.email;
                        }

                        //console.log(self.order.user)
                    }else if(type=='shipOrder'){
                        //notification=null;
                        if(self.order.user.email){
                            self.order.date4=Date.now();
                            updateOrderField('shipDetail','date4');
                            dataEmail.content=CreateContent.orderShipInfo(self.order);
                            o.content=CreateContent.shipInfoNote(self.order);
                            noteContent='информация о доставке отправлена на email.'
                            dataEmail.subject=(global.get('langOrder').val.shipinfo)?global.get('langOrder').val.shipinfo.toUpperCase():'ИНФОРМАЦИЯ О ДОСТАВКЕ'+' ✔';
                            dataEmail.addSubject='sales';
                            dataEmail.email=self.order.user.email;
                        }
                    }
                    if(!self.order.user.email){return;}
                    o.order=self.order._id;
                    $q.when((dataEmail.content)?sendMail(dataEmail):'note').then(function (res) {
                        // показ уведомления
                        var defer=$q.defer();
                        //console.log(res)
                        var title;
                        //console.log(notification)
                        if (notification=='send'){
                            title='Отправлено уведомление';
                            pushNotification(o,function(err){
                                if (!err){
                                    defer.resolve(title)
                                }else{
                                    defer.reject(err)
                                }
                            });
                        }else{
                            title='Отправлено письмо';
                            defer.resolve(title)
                        }
                        return defer.promise;
                    },function(){
                        showToaster('error','Ошибка','не удалось отправить письмо')
                    }).then(function(title){
                        showToaster('note',title, noteContent);
                    },function(){
                        showToaster('error','Ошибка','не удалось отаправить уведомление')
                    })
                })





        }
        self.deleteCoupon = function(){
            reload=true;
            // убираем купон как использованный у пользователя
            if(!self.order.user.coupons){self.order.user.coupons=[]}else{
                self.order.user.coupons.splice(self.order.user.coupons.indexOf(self.order.coupon._id),1)
            }
            var o={_id:self.order.user._id,coupons:self.order.user.coupons};
            $user.save({update:'coupons'},o);
            //устанавливаем купон доступный для использования
            if(global.get('coupons').val){
                if(self.order.user.coupons.indexOf(global.get('coupons').val[0]._id)<0){
                    self.coupon=global.get('coupons').val[0]
                }else if(global.get('coupons').val[1] && self.order.user.coupons.indexOf(global.get('coupons').val[1]._id)<0){
                    self.coupon=global.get('coupons').val[1]
                }
            }

            self.order.coupon=null;
            $timeout(function(){
                o={ _id:self.order._id,seller:self.order.seller}
                o.coupon=null;
                o.paySum=self.order.paySum;
                Orders.save({update:'coupon paySum'},o);
            },100)
        }
        self.setCoupon=function(coupon){
            self.order.coupon=coupon;
            $timeout(function(){
                var o={ _id:self.order._id,seller:self.order.seller}
                o.coupon=coupon._id;
                o.paySum=self.order.paySum;
                Orders.save({update:'coupon paySum'},o);
                if(!self.order.user.coupons){self.order.user.coupons=[]}
                self.order.user.coupons.push(coupon._id)
                o={_id:self.order.user._id,coupons:self.order.user.coupons};
                $user.save({update:'coupons'},o)
            },100)
        }

        function startChat() {
            if(self.dialog._id){return}
            $dialogs.save(self.dialog,function(res){
                self.dialog._id=res.id;
            },function(err){
                console.log(err)
            })
        }


        function changeStatus(status){


            self.order.status=status.value;
            self.updateOrderField('status')

            if(self.order.statSent ||(self.order.status!=3&&self.order.status!=5)){
                return
            }
            self.order.statSent=true;
            self.updateOrderField('statSent')
            var order = self.order;
            try{
                if ((global.get('local')&& !global.get('local').val) && $window.ga){
                    //$window.ga('send', 'event','order','complete');
                    var transaction = {
                        'id': order.num,
                        'affiliation': global.get('store').val.domain||global.get('store').val.subDomain,
                        'revenue': (order.kurs*order.getCouponSum()).toFixed(2),
                        'shipping': (order.shipCost)?order.shipCost:0,
                        'currency':  order.currency
                    }
                    console.log(transaction)
                    $window.ga('ecommerce:addTransaction', transaction);
                    var item;
                    order.cart.stuffs.forEach(function(el){
                        var o = {
                            id: '',
                            name: el.name+' '+((el.artikul)?el.artikul:'')+' '+((el.sortName)?el.sortName:''),
                            price: (order.kurs*el.cena).toFixed(2),
                            quantity: el.quantity
                        }
                        $window.ga('ecommerce:addItem',o);
                    });
                    $window.ga('ecommerce:send');
                    $window.ga('ecommerce:clear');
                }
            }catch(err){
                throw err
            }
            try{
                // яндекс
                if ((global.get('local')&&!global.get('local').val)&& window.yaCounter && window.yaCounter.reachGoal){
                    var yaParams = {
                        order_id: order.num,
                        order_price: (order.kurs*order.getCouponSum()).toFixed(2),
                        currency:  order.currency,
                        exchange_rate: order.rate,
                        goods:[]
                    };
                    order.cart.stuffs.forEach(function(el){
                        yaParams.goods.push({
                            id: '',
                            name: el.name+' '+((el.artikul)?el.artikul:'')+' '+((el.sortName)?el.sortName:''),
                            price: (order.kurs*el.cena).toFixed(2),
                            quantity: el.quantity
                        });
                    });
                    window.yaCounter.reachGoal('order',yaParams);
                }
            }catch(err){
                throw err
            }
        }


    }
})()
