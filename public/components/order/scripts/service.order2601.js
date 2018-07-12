'use strict';
angular.module('gmall.services')
.service('$order',['localStorage','global','Orders','$q','$uibModal','CartInOrder','exception','$email','CreateContent','$notification','$state','$window','Coupon','$user','$rootScope','$timeout','$http',function(localStorage,global,Orders,$q,$uibModal,CartInOrder,exception,$email,CreateContent,$notification,$state,$window,Coupon,$user,$rootScope,$timeout,$http){
    //console.log(global.get('seller').val);
    var order;
    var storageName;
    this.type=null;
    this.reinitCart=function(){
        //console.log('reinitCart')
        order.comment='';
        delete order.action;
        delete order._id;
        delete order.num;
        delete order.date;
        delete order.seller;
        var seller=global.get('store').val.seller;
        order.setSellerData(seller._id,seller.cascade,seller.opt);
    }
    this.initOrderInList=function (res) {
        var order= myShareData.getOrder();
        //console.log(order)
        //var order1= myShareData.getOrder();
        var campaign=(global.get('campaign'))?global.get('campaign').val:null;
        // console.log(campaign)
        var mainCurrency = global.get('store').val.mainCarrency;
        var currencyStore = global.get('store').val.currency;

        var currency = (global.get('currency') && global.get('currency').val)?global.get('currency').val:'UAH';
        var seller=global.get('store').val.seller;

        order.type='order';
        order._id=res._id;
        order.init(res.campaign,mainCurrency,currencyStore);
        order.setCurrency(res.currency);
        order.kurs=order.currencyStore[order.currency][0];
        order.payInfo=res.seller.payInfo;
        order.setSellerData(res.seller,res.cascade,res.opt)
        order.unitOfMeasure=order._getUnitOfMeasure()
        /*order.setCart(res.cart.stuffs)
         */
        order.cart._id=res.cart;
        order.setDiscount(res.discount)
        order.setCoupon(res.coupon)
        //order.totalCount= order._cartCount();
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
        order.paySum=res.paySum;
        return order;
    }
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
            order.unitOfMeasure=order._getUnitOfMeasure()
            //console.log(order.unitOfMeasure)
            order.totalCount= order._cartCount();
            q.resolve(order)
        }else if(type=='order') {
            Orders.get({_id:id},function(res){
                if(!res || !res._id){q.reject('404')}
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
                order.unitOfMeasure=order._getUnitOfMeasure()
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
                q.reject(order)
            })
            order.totalCount= order._cartCount();
        }
        return q.promise;

    };
    this.getOrder=function(){
        return order;
    }
    this.addItemToCart = function(itemTo){
        //console.log(itemTo);return;
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
        order.unitOfMeasure=order._getUnitOfMeasure()
        if(itemTo){
            //console.log('send message &')
            $rootScope.$broadcast('$updateOrder',itemTo);
        }
        //console.log(this.type)
        if (this.type=='cart'){
            //console.log(order.cart.stuffs)
            localStorage.set(storageName,order.cart.stuffs);
            order.totalCount= order._cartCount();
        }else{
            $timeout( function(){}, 100 )
                .then(function(){
                    var o=angular.copy(order.cart);
                    o.order=order._id;
                    return CartInOrder.save(o).$promise;
                })
                .then(function(){
                    order.priceSaleHandle=order.cart.stuffs.some(function(s){return s.priceSaleHandle})
                    order.maxDiscountOver=order.cart.stuffs.some(function(s){return s.maxDiscountOver})
                    return Orders.save({update:'totalCount sum paySum maxDiscountOver priceSaleHandle'},
                        {_id:order._id,
                            totalCount:order.totalCount,
                        sum:order.sum,
                        paySum:order.paySum,
                            priceSaleHandle:order.priceSaleHandle,
                            maxDiscountOver:order.maxDiscountOver,
                        }).$promise;
                })
                .then(function(){

                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)

                    //exception.showToaster('note','обновлено','')
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
    this.decreaseQty=function(i){
        var stuff=order.cart.stuffs[i]
        if(stuff && stuff.quantity>1){
            if(stuff.multiple && stuff.minQty){
                if(stuff.quantity-1>=stuff.minQty){
                    stuff.quantity--
                    this.updateOrder();
                }
            }else{
                stuff.quantity--
                this.updateOrder();
            }

        }
    }
    this.increaseQty=function(i){
        var stuff=order.cart.stuffs[i]
        if(stuff) {
            if(stuff.single && stuff.maxQty){
                if (stuff.quantity + 1 <= stuff.maxQty) {
                    stuff.quantity++
                    this.updateOrder();
                }
            }else{
                stuff.quantity++
                this.updateOrder();
            }


        }
    }

    this.clearCart=function(){
        order.clearOrder();
        this.updateOrder();
    }
    this.cartCount=function(){
        return order.totalCount;
    }
    this.sendOrder=function(user){
        var self=this;
        return $q.when()
            .then(function () {
                try{
                    if(user){
                        if(!user._id){
                            conosole.log(user)
                            throw  'не авторизирован!';
                        }
                    } else{
                        if(global.get('user' ).val && global.get('user' ).val._id){
                            order.user=global.get('user' ).val;
                            //order.profile=global.get('user').val.profile;
                            order.profile=angular.copy(global.get('user').val.profile);
                        }else{
                            throw  'не авторизирован!';
                        }
                    }
                    order.action='order'
                    if (order.comment){
                        order.comment.clearTag(400);
                    }else{
                        order.comment=''
                    }
                    //*********************************************
                    if (order.coupon && order.coupon._id){
                        order.paySum=order.kurs*order.getCouponSum();

                    }else{
                        order.paySum=order.kurs*order.getTotalSum();
                    }
                }catch(err){
                    throw err
                }

            })
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
                try{
                    order._id = res.id;
                    order.num = res.num;
                    order.date = Date.now();
                    order.seller = global.get( 'store' ).val.seller;
                    order.status=1;
                }catch(err){
                    throw err
                }
                // для отправка письма

            })
            .then(function(){
                if(!global.get('store').val.seller.salemail){
                    return;
                }
                try{
                    // письмо
                    order.profile.admin='Admin'
                    var email=global.get('store').val.seller.salemail;
                    var content=CreateContent.order(order,false,true)
                    delete order.profile.admin;

                    var domain=global.get('store').val.domain,
                        subj = ((global.get('langOrder').val.neworder)?global.get('langOrder').val.neworder.toUpperCase()+' ✔':'НОВЫЙ ЗАКАЗ'+' ✔')
                    var o={email:email,content:content,
                        subject:subj,from:  global.get('store').val.name+'<sales@'+domain+'>'};
                }catch(err){
                    throw err
                }

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
                //order.profile=global.get('user').val.profile;
                try{
                    // письмо
                    order.user=(user)?user:global.get('user').val;
                    var email =(user)?user.email:global.get('user').val.email;
                    /*if(global.get('store').val.seller.salemail){
                     email=[email,global.get('store').val.seller.salemail]
                     }*/
                    var content=CreateContent.order(order,false,true)
                    var domain=global.get('store').val.domain,
                        subj = ((global.get('langOrder').val.neworder)?global.get('langOrder').val.neworder.toUpperCase()+' ✔':'НОВЫЙ ЗАКАЗ'+' ✔')
                    var o={email:email,content:content,
                        //subject:global.get('langOrder').val.order+' ✔',from:  global.get('store').val.name+'<'+global.get('store').val.subDomain+'@'+domain+'>'};
                        subject:subj,from:  global.get('store').val.name+'<sales@'+domain+'>'};
                }catch(err){
                    throw err
                }

                return $q(function(resolve,reject){
                    $email.save(o,function(res){
                        resolve()
                    },function(err){
                        exception.showToaster('warning',global.get('langNote').val.error,err.data)
                        resolve()
                    } )
                })
            }) //email admin
            .then(function(){
                try{
                    // отправка уведомления
                    var content=CreateContent.orderNote(order)
                    var o={addressee:'seller',
                        type:'order',
                        content:content,order:order._id,
                        num:order.num,
                        seller:order.seller._id};
                }catch(err){
                    throw err
                }

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
                try{
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
                }catch(err){
                    throw err
                }


            })
            .catch(function(err){
               throw err
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
        order.comment= (user.comment)?user.comment:'';
        order.profile=user.profile;
        order.user=user._id;
        order.seller=global.get('store').val.seller._id;
        return this.sendOrder(user)
    }
    this.getShipInfo=function(){
        return $q(function(resolve,reject){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/order/modal/shipInfo.html',
                controller: shipInfoCtrl,
                controllerAs:'$ctrl',
                //size: 'lg',
                windowClass:'modalProject',
                //windowTopClass:'modalTopProject',
                backdropClass:'modalBackdropClass',
                //openedClass:'modalOpenedClass'
            });
            $rootScope.$emit('modalOpened')
            modalInstance.result.then(function(item){$rootScope.$emit('modalClosed');resolve(item)},function(){$rootScope.$emit('modalClosed');reject()});
        })
    }
    shipInfoCtrl.$inject=['$uibModalInstance','$rootScope']
    function shipInfoCtrl($uibModalInstance,$rootScope) {
        var self = this;
        $rootScope.$on('closeShipModal',function(){
            $uibModalInstance.close();
        })
        self.ok = function () {
            $uibModalInstance.close();
        }
        self.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }

    this.getCheckOutLiqpayHtml=function(order) {
        //console.log(order)
        return $q.when()
            .then(function () {
                return $http.post('/api/orders/checkoutLiqpay',order)
            })
            .then(function (res) {
                //console.log(res)
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
