'use strict';
(function(){

    angular.module('gmall.services')
        .directive('cartItem',itemDirective)
        .directive('previewCart',previewCartDirective)
        .directive('addedCart',addedCartDirective)
    function itemDirective(){
        //var s =(global.get('store').val.template.cartTempl)?global.get('store').val.template.cartTempl:'';
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'views/template/partials/cart.html'
        }
    }
    function previewCartDirective(){
        return {
            scope:{},
            restrict:"EA",
            bindToController: true,
            controller: previewCartCtrl,
            controllerAs: '$ctrl',
            transclude: true,
            templateUrl:'views/template/partials/cart/previewCart.html'
        }
    }
    function addedCartDirective(){
        return {
            scope:{},
            bindToController: true,
            controller: function($scope,$element,$timeout,global){
                $($element).fadeOut()
                var self = this;
                self.global=global;
                self.addItem=null;
                var timer=null;
                $scope.$on('$updateOrder',function(event,itemTo){
                    //console.log(itemTo)
                    self.addItem=angular.copy(itemTo);
                    //console.log(timer)
                    if(timer){
                        $timeout.cancel(timer)
                    }else{
                        $($element).fadeIn()
                    }
                    timer = $timeout(function () {
                        self.addItem =null;
                        timer=null;
                        $($element).fadeOut()
                    },2500)

                });
                $($element).hover(function () {
                    if(timer){
                        $timeout.cancel(timer)
                        timer=null
                    }
                },function () {
                    $($element).fadeOut()
                })
                $($element).click(function () {
                    $($element).fadeOut()
                })

            },
            controllerAs: '$ctrl',
            templateUrl:'views/template/partials/cart/addedCart.html'
        }
    }

    itemCtrl.$inject=['$scope','$anchorScroll','$order','global','exception','Confirm','$user','$q','CreateContent','$email','$notification','$state','$rootScope','$timeout'];
    function itemCtrl($scope,$anchorScroll,$order,global,exception,Confirm,$user,$q,CreateContent,$email,$notification,$state,$rootScope,$timeout){
        var self = this;
        $scope.myInterval = 2000;
        $scope.noWrapSlides = true;
        $scope.active33 = 2;
        var slides = $scope.slides = [];
        var currIndex = 0;
        $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '//unsplash.it/' + newWidth + '/300',
                text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
                id: currIndex++
            });
        };

        $scope.randomize = function() {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
        };

        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }




        self.currentBlock=0;
        var w2,blocks,widthBlock,cartSlidePageElement;
        self.global=global;
        self.mobile=global.get('mobile' ).val;
        //??
        /*console.log(global.get('store').val.seller.retail)
        console.log(global.get('store').val.seller.opt.quantity)*/
        self.opt=(global.get('store').val.seller.opt && global.get('store').val.seller.opt.quantity)?global.get('store').val.seller.opt.quantity:0;
        var retail=global.get('store').val.seller.retail
        self.disabledMessage=(self.opt>1&&!retail)?true:false;
        //console.log(self.disabledCheckOut);
        self.countryCode=global.get('country');
        self.clearCart=clearCart;
        self.removeItem=removeItem;
        self.saveCart=saveCart;
        self.checkOut=checkOut;
        self.enableCheckOut=enableCheckOut;
        self.goToStuff=goToStuff;
        self.disabledCheckOut=disabledCheckOut
        self.back=back;
        self.getFilterName=getFilterName;
        self.decreaseQty=decreaseQty
        self.increaseQty=increaseQty
        self.setCouponForOrder=setCouponForOrder;

        //********************activate***************************
        //var initDone=false;
        activate();
        $rootScope.$on('cartslide',function(event,data){
            console.log(data)
            //return;
            if(data){
                if(data.event =="shipInfoDone"){
                    sendOrder()
                }else if(data.event =="shipInfoDone"){
                    setSlide(0)
                }else if(data.event =="signLogin"){
                    forward()
                }else if(data.event =="init"){
                    setSlide(0)
                    /*if(!initDone){
                        initDone=true;
                        setSlide(0)
                    }*/
                }
            }
        })
        //*******************************************************
        function _setCoupons(){
            self.coupons=null;
            if(global.get('coupons') && global.get('coupons').val && global.get('coupons').val.length){
                global.get('coupons').val.forEach(function(c){
                    if(global.get('user').val){
                        if(global.get('user').val.coupons.indexOf(c._id)<0){
                            if(!self.coupons){
                                self.coupons=[]
                            }
                            self.coupons.push(c)
                        }
                    }else{
                        if(!self.coupons){
                            self.coupons=[]
                        }
                        self.coupons.push(c)
                    }
                })
            }
            //console.log(self.coupons)
            self.coupon=null;
            if(global.get('coupons') && global.get('coupons').val && global.get('user').val){
                if(global.get('coupons').val[0] && global.get('user').val.coupons.indexOf(global.get('coupons').val[0]._id)<0){
                    self.coupon=global.get('coupons').val[0]
                }else if(global.get('coupons').val[1] && global.get('user').val.coupons.indexOf(global.get('coupons').val[1]._id)<0){
                    self.coupon=global.get('coupons').val[1]
                }
            }else if(!global.get('user').val && global.get('coupons') && global.get('coupons').val){
                self.coupon=global.get('coupons').val[0]
            }
            //console.log(self.coupon)
        }
        function activate() {
            // если корзина была инициализированна, то просто получаем ордер.
            if(!$order.type || $order.type!='cart'){
                $order.init('cart' ).then(function(order){
                    self.order=order;
                })
            }else{
                self.order=$order.getOrder();
            }
            //console.log(self.order.cart.stuffs)
            $anchorScroll();
            // купон
            //console.log(global.get('user').val)
            _setCoupons()
            $scope.$on('logged',function(){
               _setCoupons();
                //console.log('logged')
            })
            if(global.get('store').val.cartSetting && global.get('store').val.cartSetting.slide){
                setSlide(0)
            }

        }

        function clearCart(){
            Confirm(global.get('langNote').val.clean+"?")
                .then(function(){
                    $order.clearCart();
                } ).catch(function(err){
                err = (err &&err.data)||err
                if(err){
                    exception.catcher(global.get('langNote').val.error)(err)
                }
            })
        }
        function removeItem(i){
            $order.removeItem(i);
        }
        function saveCart(stuff){
            //console.log(stuff)
            if(stuff){
                if(stuff.quantity){
                    if(stuff.quantity>stuff.maxQty){
                        stuff.quantity=stuff.maxQty
                        exception.catcher(global.get('langNote').val.error)('слишком много')
                    }else if(stuff.quantity<stuff.minQty){
                        stuff.quantity=stuff.minQty
                        exception.catcher(global.get('langNote').val.error)('слишком мало')
                    }else{
                        $order.updateOrder();
                    }
                }

            }else{
                $order.updateOrder();
            }

        }
        function decreaseQty(i){
            $order.decreaseQty(i)
        }
        function increaseQty(i){
            $order.increaseQty(i)
        }
        function checkOut(){

            $rootScope.$emit('InitiateCheckout')



            //console.log('checkOut')
            if(!self.order.cart.stuffs.length){return}
            //console.log(global.get('user').val)
            if(global.get('store').val.cartSetting && global.get('store').val.cartSetting.slide){
                if(global.get('user').val && global.get('user' ).val._id){
                    // проезжаем регистрацию
                    forward(2)
                }else{
                    forward()
                }
            }else{
                self.order = $order.getOrder();
                $q.when()
                    .then(function(){
                        if(!global.get('user' ).val || !global.get('user' ).val._id){
                            return $user.login();
                        }else{
                            return
                        }
                    })
                    .then(function(){
                        return $order.getShipInfo()
                    })
                    .then(function(){
                        return sendOrder()
                    })

            }



        }

        function sendOrder(){
            return $q.when()
                .then(function(){
                    $rootScope.$emit('$stateChangeStartToStuff');
                    return $order.sendOrder()
                })
                .then(function(){
                    return;
                    /*$rootScope.$emit('$stateChangeEndToStuff');
                    $order.init('cart');
                    $order.clearCart()
                    self.order=$order.getOrder();
                    $rootScope.order=$order.getOrder();
                    self.order.setCoupon(null)
                    _setCoupons();
                    $rootScope.$emit('Purchase');
                    $rootScope.checkedMenu.cart=false*/
                })
                .then(function () {
                    $rootScope.$emit('$stateChangeEndToStuff');
                    $rootScope.$emit('Purchase',{value:$order.paySum,currency:$order.currency});
                    $order.reinitCart()
                    $rootScope.order=$order.getOrder();
                    self.order.setCoupon(null)
                    _setCoupons();
                    $order.clearCart()
                    $rootScope.checkedMenu.cart=false
                })
                .then(function(){
                    return $user.saveProfile(global.get('user' ).val)
                })
                .catch(function(err){
                    $rootScope.$emit('$stateChangeEndToStuff');
                    if(!err){return;}
                    console.log('errerrerr ',err)
                    if(err.data){
                        var content = JSON.stringify(err.data);
                    }else{
                        var content = JSON.stringify(err, ["message", "arguments", "type", "name"]);
                    }
                    if(global.get('user').val){
                        content +="\r"+global.get('user').val.email
                    }

                    if($order.getOrder()){
                        content +="\r"+JSON.stringify($order.getOrder(), null, 4)
                    }
                    //console.log(content)
                    var domain=global.get('store').val.domain;
                    var o={email:['igorchugurov@gmail.com','vikachugurova@gmail.com'],content:content,
                        subject:'error in order ✔',from:  global.get('store').val.name+'<'+global.get('store').val.subDomain+'@'+domain+'>'};
                    //console.log(o)
                    $q(function(resolve,reject){$email.save(o,function(res){resolve()},function(err){resolve()} )})

                    if(err){
                        exception.catcher(global.get('langNote').val.error)(err)
                    }
                })
        }
        function enableCheckOut(){
            //console.log(self.opt,retail,self.order)
            if(!self.order.totalCount || !self.order.cart.stuffs.length){
                return false
            }else if(self.opt>1 && !retail && self.order.totalCount<self.opt){
                return false
            }else{
                return true;
            }
        }
        function goToStuff(o){
            var states= $state.get();
            if(states.some(function(state){return state.name=='frame.stuffs.stuff'})){
                $state.go('frame.stuffs.stuff',o)
            }else if(states.some(function(state){return state.name=='stuffs.stuff'})){
                $state.go('stuffs.stuff',o)
            }
        }

        function disabledCheckOut(){
            //console.log(self.order)
            if(!self.order.cart.stuffs.length){
                return true;
            }
        }

        function back() {
            if(self.currentBlock==2 && global.get('user').val){
                self.currentBlock=1;
            }
            if(self.currentBlock){self.currentBlock--}
        }
        function forward(num){
            if(num){
                self.currentBlock+=num
            }else{
                self.currentBlock++
            }
            console.log(self.currentBlock)
        }
        function setSlide(s){
            self.currentBlock=s;
        }

        function getFilterName(tag){
            //console.log(tag)
            var t = global.get('filterTags').val.getOFA('_id',tag)
            if(t && t.filter){
                var f = global.get('filters').val.getOFA('_id',t.filter)
                if(f){return f.name}else{
                    return ''
                }
            }else{return ''}
        }
        function setCouponForOrder(c,e) {
            e.stopPropagation()
            self.order.setCoupon(c)
        }
    }


    previewCartCtrl.$inject=['$scope','$anchorScroll','global','exception','$q','$state','$order','$element','$timeout','$rootScope'];
    function previewCartCtrl($scope,$anchorScroll,global,exception,$q,$state,$order,$element,$timeout,$rootScope){
        var self = this;
        self.global=global;
        //self.showPreview=false;
        var listDiv= $element.find('.cartItems')[0]
        $(listDiv).fadeOut()
        var hoverIn;
        $($element).hover(function () {
            //console.log('in')
            hoverIn=true
            $timeout(function () {
                if(hoverIn ){
                    $(listDiv).fadeIn(150)
                }
            },50)
            $(listDiv).fadeIn(100)
        },function () {
            //console.log('out')
            hoverIn=false
            $timeout(function () {
                if(!hoverIn ){
                    $(listDiv).fadeOut(100)
                }
            },100)

        })
        //$scope.$on('updateOrder',function(itemTo){console.log(itemTo)});


        self.global=global;
        self.mobile=global.get('mobile' ).val;
        self.opt=(global.get('store').val.seller.opt && global.get('store').val.seller.opt.quantity)?global.get('store').val.seller.opt.quantity:0;
        var retail=global.get('store').val.seller.retail
        self.disabledMessage=(self.opt>1&&!retail)?true:false;
        self.countryCode=global.get('country');
        self.removeItem=removeItem;
        self.saveCart=saveCart;
        self.goToStuff=goToStuff;

        //********************activate***************************

        //*******************************************************
        $timeout(function () {
            activate()
        },400)

        function activate() {
            //console.log("$order.type",$order.type)
            // если корзина была инициализированна, то просто получаем ордер.
            if(!$order.type || $order.type!='cart'){
                $order.init('cart' ).then(function(order){
                    self.order=order;
                })
            }else{
                self.order=$order.getOrder();
            }
            //self.inCart = self.items.cart.stuffs.reduce(function(sum,stuff){return sum+stuff.quantity},0)
            //console.log(self.order)
            $anchorScroll();
            self.loaded=true;
        }
        function removeItem(i){
            $order.removeItem(i);
        }
        function saveCart(){
            $order.updateOrder();
        }

        function goToStuff(o){
            var states= $state.get();
            if(states.some(function(state){return state.name=='frame.stuffs.stuff'})){
                $state.go('frame.stuffs.stuff',o)
            }else if(states.some(function(state){return state.name=='stuffs.stuff'})){
                $state.go('stuffs.stuff',o)
            }
        }

        $rootScope.$on('Purchase',function(){
            self.order=$order.getOrder();
        })

    }
})()
