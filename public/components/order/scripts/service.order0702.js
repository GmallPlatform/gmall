'use strict';
angular.module('gmall.services')
.service('$order',['localStorage','global','Orders','$q','$uibModal','CartInOrder','exception','$email','CreateContent','$notification','$state','$window','Coupon','$user','$rootScope',function(localStorage,global,Orders,$q,$uibModal,CartInOrder,exception,$email,CreateContent,$notification,$state,$window,Coupon,$user,$rootScope){
    //console.log(global.get('seller').val);
    var order;
    var storageName;
    this.type=null;
    this.init=function(type,id){
        storageName=global.get('store').val._id;
        var q = $q.defer();
        order= myShareData.getOrder();
        //console.log(order)
        //var order1= myShareData.getOrder();
        var campaign=(global.get('campaign'))?global.get('campaign').val:null;
       // console.log(campaign)
        var mainCurrency = global.get('store').val.mainCarrency;
        var currencyStore = global.get('store').val.currency;

        var currency = (global.get('currency') && global.get('currency').val)?global.get('currency').val:'UAH';
        var seller=global.get('store').val.seller;
        this.type=type;
        order.type=type;
        // получили новый объект с меьлдами для расчета цены
        // создание нового ордера или корзина
        if(type=='cart'){
            //корзина
            order.init(campaign,mainCurrency,currencyStore);
            order.setSellerData(seller._id,seller.cascade,seller.opt)
            order.setCurrency(currency);
            order.kurs=order.currencyStore[order.currency][0];
            //localStorage.set(storageName,[]);
            var o= localStorage.get(storageName);
            //console.log(o)
            if(!o){
                o=[];
                localStorage.set(storageName,o);
            }
            order.setCart(o);
            order.totalCount= order._cartCount();
            q.resolve(order)
        }else if(type=='order') {
            Orders.get({_id:id},function(res){
                /*res.prototype=order.prototype;
                console.log(order)
                console.log(res)*/
                /*for(var k in res) order[k]=res[k];
                order.init(res.campaign,mainCurrency,currencyStore);
                order.setCurrency(res.currency);
                order.kurs=order.currencyStore[order.currency][0];
                order.payInfo=res.seller.payInfo;
                order.setSellerData(res.seller,res.cascade,res.opt)
                order.setCart(res.cart.stuffs)
                order.setDiscount(res.discount)
                order.setCoupon(res.coupon)
                order.totalCount= order._cartCount();*/
                order._id=res._id;
                order.init(res.campaign,mainCurrency,currencyStore);
                order.setCurrency(res.currency);
                order.kurs=order.currencyStore[order.currency][0];
                order.payInfo=res.seller.payInfo;
                order.setSellerData(res.seller,res.cascade,res.opt)
                order.setCart(res.cart.stuffs)
                order.cart._id=res.cart._id;
                order.setDiscount(res.discount)
                order.setCoupon(res.coupon)
                order.totalCount= order._cartCount();
                order.date=res.date;
                order.date2=res.date2;
                order.date3=res.date3;
                order.date4=res.date4;
                order.date5=res.date5;
                order.invoice=res.invoice;
                order.invoiceInfo=res.invoiceInfo;
                order.pay=res.pay;
                order.shipCost=res.shipCost;
                order.num=res.num;
                order.status=res.status;
                order.profile=res.profile;
                order.comment=res.comment;
                order.note=res.note;
                order.user=res.user;
                order.shipDetail=res.shipDetail;
                order.domain=global.get('store').val.domain||global.get('store').val.subDomain;
                //order=res;
                q.resolve(order)
            },function(err){
                q.resolve(order)
            })
            order.totalCount= order._cartCount();
        }
        return q.promise;

    };
    this.getOrder=function(){
        return order;
    }
    this.addItemToCart = function(itemTo){
       //console.log(global.get('seller').val,itemTo.seller)
        itemTo.seller=global.get('seller').val;
        /*if (!itemTo.seller){
            itemTo.seller=global.get('seller').val;
        }
        console.log(itemTo)*/
        //if(itemTo.seller!=global.get('seller').val){return};
        itemTo.img=(itemTo.gallery && itemTo.gallery.length && itemTo.gallery[0].thumbSmall)?itemTo.gallery[0].thumbSmall:'';
        itemTo.quantity||(itemTo.quantity=1);
        //console.log(itemTo)
        order.addStuffToOrder(itemTo)
        this.updateOrder(itemTo);
    }
    this.checkInCart=function(item){
        //console.log(item.sort,item.name)
        return order.checkInCart(item)
    }
    this.updateOrder=function(itemTo){
        order.totalCount= order._cartCount();
        if(itemTo){
            console.log('send message')
            $rootScope.$broadcast('updateOrder',itemTo);
        }
        if (this.type=='cart'){
            localStorage.set(storageName,order.cart.stuffs);
            order.totalCount= order._cartCount();
        }else{
            $q.when()
                .then(function(){
                    var o=angular.copy(order.cart);
                    o.order=order._id;
                    return CartInOrder.save(o).$promise;
                })
                .then(function(){
                    return Orders.save({update:'totalCount sum paySum'},
                        {_id:order._id,
                            totalCount:order.totalCount,
                        sum:order.sum,
                        paySum:order.paySum}).$promise;
                })
                .then(function(){
                    exception.showToaster('note','обновлено','')
                })
                .catch(function(error){
                    exception.catcher('сохранение изменений')(error)
                })

        }
    }
    this.removeItem=function(i){
        //console.log(i)
        order.cart.stuffs.splice(i,1);
        this.updateOrder();
    }

    this.clearCart=function(){
        order.clearOrder();
        this.updateOrder();
    }
    this.cartCount=function(){
        return order.totalCount;
    }
    this.sendOrder=function(user){
        console.log(user)
       // console.log('????')
        var self=this;
        if(user){
            if(!user._id){
                exception.catcher('авторизация')('возникли сложности(. Позвоните.')
                return
            }
        } else{
            if(global.get('user' ).val){
                order.user=global.get('user' ).val._id;
            }else{
                return alert('не авторизирован!')
            }
        }

        if (order.coupon && order.coupon._id){
            order.paySum=order.kurs*order.getCouponSum();

        }else{
            order.paySum=order.kurs*order.getTotalSum();
        }
        //console.log('????')
        return $q.when()
            .then(function(){
                // проверка купона. если есть купон в ордере.
                // если его нет у пользователя. получаем его, если купон активен и не просрочен, то
                //записываем его в использованные купоны у пользователя.
                // при удалении ордера купон у пользователя аннулируется.
                return $q(function(resolve,reject){
                    if (order.coupon && order.coupon._id){
                        if (!global.get('user' ).val.coupons){global.get('user' ).val.coupons=[]}
                        //user.coupons=[]
                        if (global.get('user' ).val.coupons.indexOf(order.coupon._id)>-1){
                            // купон уже был использован
                            order.coupon=null;
                            resolve();
                        }else{
                            var now= Date.now();
                            Coupon.get({_id:order.coupon._id},function(coupon){
                                //console.log(coupon)
                                if (coupon){
                                    // добавляем купон в список использованных
                                    if(!global.get('user' ).val.coupons){
                                        global.get('user' ).val.coupons=[];
                                    }
                                    global.get('user' ).val.coupons=global.get('user' ).val.coupons.filter(function(el){return el})
                                    global.get('user' ).val.coupons.push(coupon._id);
                                    //console.log(global.get('user' ).val.coupons)
                                    $user.save({update:'coupons'},{_id:global.get('user' ).val._id,coupons:global.get('user' ).val.coupons},function(res){
                                        resolve();
                                    },function(err){
                                        if(err){return reject(err)}
                                    });
                                }else{
                                    // купон просрочен или не активен
                                    order.coupon=null;
                                    resolve();
                                }
                            })
                        }
                    }else{
                        resolve();
                    }
                })
            })// coupon
            .then(function(){
                //throw order;
                //console.log(order)

                return Orders.save(order).$promise
            })//сам заказ
            .then(function(res){
                //console.log(res)
                // google
                //console.log((global.get('local')&& !global.get('local').val))

                if ((global.get('local')&& !global.get('local').val) && $window.ga){
                    //console.log("$window.ga('send', 'event','order','complete')")
                    $window.ga('send', 'event','order','complete');
                    var transaction = {
                        'id': res.num,
                        'affiliation': global.get('store').val.domain||global.get('store').val.subDomain,
                        'revenue': order.paySum,
                        'shipping': (order.shipCost)?order.shipCost:0,
                        'currency':  global.get('currency').val
                    }
                    $window.ga('ecommerce:addTransaction', transaction);
                    var item;
                    order.cart.stuffs.forEach(function(el){
                        var o = {
                            id: '',
                            name: el.name+' '+((el.artikul)?el.artikul:'')+' '+((el.sortName)?el.sortName:''),
                            price: el.cena,
                            quantity: el.quantity
                        }
                        $window.ga('ecommerce:addItem',o);
                    });
                    $window.ga('ecommerce:send');
                    $window.ga('ecommerce:clear');
                }
                //console.log('yandex')
                // яндекс
                if ((global.get('local')&&!global.get('local').val)&& window.yaCounter && window.yaCounter.reachGoal){
                    var yaParams = {
                        order_id: res.num,
                        order_price: order.paySum,
                        currency:  global.get('currency').val,
                        exchange_rate: global.get('rate').val,
                        goods:[]
                    };
                    order.cart.stuffs.forEach(function(el){
                        yaParams.goods.push({
                            id: '',
                            name: el.name+' '+((el.artikul)?el.artikul:'')+' '+((el.sortName)?el.sortName:''),
                            price: el.cena,
                            quantity: el.quantity
                        });
                    });
                    window.yaCounter.reachGoal('order',yaParams);
                }
                // для отправка письма
                order._id = res.id;
                order.num = res.num;
                order.date = Date.now();
                order.seller = global.get( 'store' ).val.seller;
            })//google
            .then(function(){
                //console.log('letter1')
                //return
                // письмо
                order.user=(user)?user:global.get('user').val;
                var email =(user)?user.email:global.get('user').val.email;
                if(global.get('store').val.seller.salemail){
                    email=[email,global.get('store').val.seller.salemail]
                }
                var content=CreateContent.order(order)
                /*console.log(content)
                return;*/
                var domain=global.get('store').val.domain;
                var o={email:email,content:content,
                    subject:global.get('langOrder').val.order+' ✔',from:  global.get('store').val.name+'<'+global.get('store').val.subDomain+'@'+domain+'>'};
                console.log(o)
                //return;
                return $q(function(resolve,reject){
                    $email.save(o,function(res){
                        exception.showToaster('note',global.get('langNote').val.emailSent,'');
                        resolve()
                    },function(err){
                        exception.showToaster('warning',global.get('langNote').val.error,err.data)
                        resolve()
                    } )
                })
            }) //email
            .then(function(){
                //return
                // отправка уведомления
                var content=CreateContent.orderNote(order)
                var o={addressee:'seller',
                    type:'order',
                    content:content,order:order._id,
                    num:order.num,
                    seller:order.seller._id};
                //console.log(o)
                return $q(function(resolve,reject){
                    $notification.save(o,function(res){
                        exception.showToaster('note', global.get('langNote').val.sent,'');
                        resolve()
                    },function(err){
                        exception.catcher('error')(err);
                        resolve()
                    } )
                })
            })//notification
            .then(function(){
                var states= $state.get();
                if(global.get('paps') && states.some(function(state){return state.name=='thanksPage'})){
                    var pap = global.get('paps').val.getOFA('action','order');
                    //console.log(pap)
                    if(pap && pap.url){
                        $state.go('thanksPage',{id:pap.url})
                    }else{
                        exception.showToaster('note',global.get('langNote').val.orderSuccess,'');
                    }
                }else{
                    exception.showToaster('note',global.get('langNote').val.orderSuccess,'');
                }

            })//paps
            .then(function(){
                self.init('cart')
                //console.log(order)
            })
            .catch(function(err){
                //console.log(err)
                exception.catcher(global.get('langNote').val.error)(err)
            })
    }

    this.changeCurrency=function(lan){
        order.changeCurrency(lan)
    }
    this.checkCampaign=function(stuff){
        if(order && order.type){
            return order.checkCampaign(stuff);
        }else{
            return null;
        }

    }
    this.checkOutFromList = function(user){
        order.comment= (user.comment)?user.comment.clearTag(400):'';
        //*********************************************
        order.profile=user.profile;
        order.user=user._id;
        order.action='order'
        order.seller=global.get('store' ).val.seller._id;
        return this.sendOrder(user)
    }
    this.getShipInfo=function(){
        return $q(function(resolve,reject){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/order/modal/shipInfo.html',
                controller: shipInfoCtrl,
                controllerAs:'$ctrl',
                size: 'lg',
            });
            modalInstance.result.then(function(item){resolve(item)},function(){reject()});
        })
    }
    shipInfoCtrl.$inject=['$uibModalInstance','global','$order','exception','$window']
    function shipInfoCtrl($uibModalInstance,global,$order,exception,$window){
        var self=this;
        self.order=$order.getOrder();
        self.global=global;
        //console.log(self.order)
        self.user=global.get('user' );
        if(!self.user.val){self.user.val={email:'',profile:{}}}
        self.checkOut=checkOut;
        self.ok=function(){
            $uibModalInstance.close();
        }
        self.cancel = function () {$uibModalInstance.dismiss();};

        function checkOut(formProfile){
            //console.log(formProfile.$valid)
            if(formProfile.$valid) {
                self.click=true;
                if (self.order.comment){
                    self.order.comment.clearTag(400);
                }
                //*********************************************
                self.order.profile=global.get('user').val.profile;
                self.order.user=global.get('user').val._id;
                self.order.action='order'
                //console.log(self.order);return;
                $order.sendOrder().then(function(res) {
                    $uibModalInstance.close()
                },function(err){
                    $uibModalInstance.dismiss(err)
                })
                // *****************************************

            } else{
                if(formProfile.$error){
                    if(formProfile.$error.required){
                        formProfile.$error.required.forEach(function(el){
                            var error=global.get('langNote').val.formError
                            /*if(el.$name=='cityId'){
                                error='выберите город из предлагаемого списка, появляющегося после начала набора'
                            }else if(el.$name=='fio'){
                                error='необходимо указать ФИО'
                            }*/
                            exception.catcher(global.get('langNote').val.error)(error)
                        })

                    }
                    if(formProfile.$error.pattern){

                    }
                    if(formProfile.$error.maxlenth){

                    }
                }
                //console.log(formProfile)
            }
        }




    }

}])
.factory('localStorage', function(){
    var APP_ID =  'frame-local-storage';

    // api exposure
    return {
        // return item value
        getB: function(item){

            return JSON.parse(localStorage.getItem(item) || 'false');
        },
        // return item value
        getN: function(item){
            var i = localStorage.getItem(item);
            if (i!='undefined'){
                return JSON.parse(i)
            }
            else
                return '';
        },
        // return item value
        get: function(item){
            return JSON.parse(localStorage.getItem(item) || '[]');
        },
        set: function(item, value){
            // set item value
            localStorage.setItem(item, JSON.stringify(value));
        }

    };

})
