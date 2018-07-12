'use strict';
angular.module('gmall.controllers', [])
.controller('mainFrameCtrl',['$scope','global','$witgets','$http','anchorSmoothScroll','$state','Auth','$timeout','$sce','$order','toaster','$rootScope','User','$window',function($scope,global,$witgets,$http,anchorSmoothScroll,$state,Auth,$timeout,$sce,$order,toaster,$rootScope,User,$window){

    $scope.mainFrameCtrl=this;
    $scope.mainFrameCtrl.checkedMenu = false; // This will be binded using the ps-open attribute
    $scope.mainFrameCtrl.sizeMenu='350px';

    $scope.mainFrameCtrl.toggleMenu = function(){
        console.log('???')
        $rootScope.checkedMenu = !$rootScope.checkedMenu
    }
    $scope.mainFrameCtrl.titles=global.get('titles');
    //localStorage.set('viewed', []);
    $scope.setInitData=function(store,seller,user,config,local,mobile,groups,categories,brands,stats,filters,filterTags,discounts,partners,coupon,seopage,paps,sections){
        if(mobile){
            $scope.mainFrameCtrl.sizeMenu='90%';
        }

        // установка глобальных переменных данными переданными с сервера при загрузке страницы
        //console.log(sections)
        /*console.log(discounts);
        console.log(config)
        console.log(seller)
        console.log(user)*/
        //console.log(store)
        //console.log(groups)
        //console.log(user)
        //console.log(coupon)
        //console.log(user,config,local,groups,categories)

        if(user){
            if(!user.coupons){user.coupons=[]};
            if(!user.coupon){user.coupon=[]};
        }

        global.set('store',store);global.set('seller',seller);
        global.set('user',user);global.set('config',config);global.set('local',local);global.set('mobile',mobile);
        global.set('groups',groups);global.set('categories',categories);global.set('brands',brands);
        global.set('stats',stats);global.set('filters',filters);global.set('filterTags',filterTags);
        global.set('discounts',discounts);global.set('partners',partners);global.set('coupon',coupon);
        global.set('seopage',seopage);global.set('paps',paps);global.set('sections',sections);
        /*if (witgets && witgets.length && !local){
            $witgets.set(witgets)                                
        }*/
        //console.log(paps)
        
        // установка переменных для использования в темплейтах
        $scope.mainFrameCtrl.config=global.get('config');
        $scope.mainFrameCtrl.user=global.get('user');
        $scope.mainFrameCtrl.rate=global.get('rate');
        $scope.mainFrameCtrl.currency=global.get('currency');
        // для формы обратной связи
        if (global.get('user').val){
            $scope.mainFrameCtrl.feedback.email=global.get('user').val.email;
            $scope.mainFrameCtrl.feedback.name=global.get('user').val.name;
        }
        // получение группы filter для стикеров
        var filterSticker = filters.getObjectFromArray('sticker',true);
        //console.log(filters[1])
        if (filterSticker){
            global.set('filterTagsSticker',filterTags.getObjectFromArray('filter',filterSticker._id,'array','sticker'));
        }
        //console.log(global.get('filterTagsSticker'));
        // получение тега для nostore
        global.set('nostore',filterTags.getObjectFromArray('type','nostore'));
        // установка фильтров для new sale main
        global.set('newTag',filterTags.getObjectFromArray('type','new'));
        global.set('saleTag',filterTags.getObjectFromArray('type','sale'));
        global.set('mainTags',filterTags.getObjectFromArray('type','main'));
        // привязка данных по опту к брендам в партнерке
        /*global.get('partners').val.forEach(function(partner){
            //console.log(partner);
            for(var i=0,l=partner.brands.length;i<l;i++){
                var opt=globalFunction.getObjectFromArray(global.get('brands').val,'_id',partner.brands[i]).opt;
                //console.log(globalFunction.getObjectFromArray(global.get('brands').val,'_id',partner.brands[i]))
                var name = partner.brands[i];
                partner.brands[i]={};
                partner.brands[i][name]=opt;                    
            }  
        })*/
        $order.init('cart');
        // изменение количества товаров в корзине
        $scope.mainFrameCtrl.inCart = $order.cartCount();

        $scope.$watch(function(){return $order.cartCount()},function(n,o){
            //console.log(n)
            if (n!==o && $order.type=='cart'){
                //console.log('ddd');
                $scope.mainFrameCtrl.inCart=n;
                $scope.mainFrameCtrl.changeCartItems=true;
                $timeout(function(){
                    $scope.mainFrameCtrl.changeCartItems=false;
                },600)
            }
        })
        /*$scope.mainFrameCtrl.user.val.coupon=[];
        User.updateCoupon($scope.mainFrameCtrl.user.val)*/
        $scope.mainFrameCtrl.mobile=global.get('mobile' ).val;

    }

    // смена вылюты из главного меню
    $scope.mainFrameCtrl.changeCurrency= function(lan){
        console.log(lan)
            // установка курса для данной валюты
            if ($scope.mainFrameCtrl.config.val && $scope.mainFrameCtrl.config.val.currency 
                && $scope.mainFrameCtrl.config.val.currency[lan]){
                global.set('currency',lan);
                global.set('rate',global.get('config').val.currency[lan][0])
                $order.changeCurrency(lan);
            }
        }
    // сообщение из формы обратной связи в футере
    $scope.mainFrameCtrl.feedback={email:'',name:'',text:''}
    $scope.mainFrameCtrl.sendMessage = function(form){
        if ($scope.mainFrameCtrl.feedback.text.length<10){
            alert('В сообщении меньше 10 символов');
        }else{
            $scope.mainFrameCtrl.feedback.text=$scope.mainFrameCtrl.feedback.text.clearTag(1000);
            //console.log($scope.mainFrameCtrl.feedback.text);
            $scope.mainFrameCtrl.feedback.action='feedback';
            $http.post('/api/feedback',$scope.mainFrameCtrl.feedback)
                .success(function(data, status) {
                    $scope.mainFrameCtrl.feedback.text='';
                    var pap = global.get('paps').val.getObjectFromArray('action','feedback');
                    if(pap && pap.url){
                        $state.go('thanksPage',{url:pap.url})
                    } else {
                        alert('УВЕДОМЛЕНИЕ'+' сообщение отправлено');
                    }
                })
                .error(function(data, status) {
                    alert('не получается отправить сообщение, повторите отправку позже')
                });
        }
    };
    $scope.mainFrameCtrl.goToAdmin= function(){
        window.location="/admin123";
    }
    // поиск товара
    $scope.mainFrameCtrl.searchStuff = function(searchStr){
        console.log(searchStr)
        console.log($state.current.name)
        //$state.go('stuff',{searchStr:searchStr,groupUrl:'group',categoryName:'category',categoryUrl:'id'},{reload: true, notify: true});
        if ($state.current.name=='stuff'){
            $state.reload();
            /*$state.transitionTo($state.current, {}, {
                reload: true,     inherit: false,     notify: true });*/
        }else{
            $state.go('stuff',{searchStr:searchStr,groupUrl:'group',categoryName:'category',categoryUrl:'id'},{reload: true,inherit: false,notify: true });
        }

    }


    $scope.mainFrameCtrl.getTamplatePath = function(s){
        return 'views/'+global.get('store').val.template.folder+'/partials/'+s;
    }
    $scope.mainFrameCtrl.trustHtml = function(text){
        var trustedHtml = $sce.trustAsHtml(text);
        //console.log(text)
        return trustedHtml;
    };
    // генерация произвольного id
    $scope.mainFrameCtrl.guidGenerator=function() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        console.log((S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()));
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    $scope.mainFrameCtrl.getDate=function(date){
        if (!date) return '';
        var d=new Date(date);
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        return   curr_date+ "-" + curr_month+ "-" +curr_year 
    }


    $scope.mainFrameCtrl.scrollTo = function(id) {
        console.log(id);
        anchorSmoothScroll.scrollTo(id);
    };
    // подписка . переходим на страницу авторизации с передачей email
    $scope.mainFrameCtrl.signup={email:''};
    $scope.mainFrameCtrl.signup.signup=function(){
        $state.go('signup',{email:$scope.mainFrameCtrl.signup.email});
    }
    $scope.mainFrameCtrl.logout = function() {
        Auth.logout()
        $state.go('home')
    };

    // авторизация
        //-- Variables --//
    $scope.mainFrameCtrl.login={};
    $scope.mainFrameCtrl.login.user={email : '',password:''};
        //-- Methods --//
    $scope.mainFrameCtrl.login.resetPswd = function(form) {
        if(form.$valid) {
            $scope.submittedReset=true;
            Auth.resetPswd({email: $scope.mainFrameCtrl.login.reseteEmail,action:'resetPassword'})
                .then( function(data) {
                    var pap = global.get('paps').val.getObjectFromArray('action','resetPassword');
                    if(pap && pap.url){
                        $state.go('thanksPage',{url:pap.url})
                    } else {
                        alert('На указанную почту  отправлено письмо с новым паролем!')
                    }
                })
                .catch( function(err) {
                    $scope.errors = {};
                    //console.log(err);
                    if (err.data && err.data.error){
                        form['emailreset'].$setValidity('mongoose', false);
                        $scope.errors['emailreset'] = err.data.error;
                    } else {
                        alert(err.data);
                    }
                });
        }
    } // end resetPswd

    $scope.mainFrameCtrl.login.login2 =function(form) {
        //console.log(form)
        $scope.submittedLogin = true;
        if(form.$valid) {
            Auth.login({email: $scope.mainFrameCtrl.login.user.email, password: $scope.mainFrameCtrl.login.user.password})
                .then( function(data) {
                    //console.log($state.current.name)
                    if ($state.current.name!='cart'&& $state.current.name!='couponDetail'){
                        $state.go('home');
                    }
                })
                .catch( function(err) {
                    err = err.data;
                    $scope.errors = {};
                    // Update validity of form fields that match the mongoose errors
                    if (err.errors){
                        angular.forEach(err.errors, function(error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.errors[field] = error.message;
                        });
                     } else {
                        alert(err.error)
                    }
                });
        }
    }; // end login
    $scope.mainFrameCtrl.signup={};
    $scope.mainFrameCtrl.signup.user = {name:'',email : '',password:''};
    

    $scope.mainFrameCtrl.signup.signup =function(form) {
        console.log(form);
        $scope.submitted = true;
        if(form.$valid) {
            Auth.createUser({name: $scope.mainFrameCtrl.signup.user.name, email: $scope.mainFrameCtrl.signup.user.email,
                password: $scope.mainFrameCtrl.signup.user.password,action:'subscribe'})
                .then( function(res) {
                    //console.log(res)
                    if ($state.current.name!='cart' && $state.current.name!='couponDetail'){
                        var pap = global.get('paps').val.getObjectFromArray('action','subscribe');
                        if (pap && pap.url){
                            $state.go('thanksPage',{url:pap.url})
                        } else {
                            alert('Вы успешно подписались на нашу рассылку.');
                            $state.go('home');
                        }
                    }                    
                })
                .catch( function(err) {
                    console.log(err)
                    err = err.data;
                    $scope.errors = {};
                    if (err && err.errors){
                        angular.forEach(err.errors, function(error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.errors[field] = error.message;
                        });
                    } else {
                        alert(err.error);
                    }
                });
        }
    }; // end signup
    $scope.mainFrameCtrl.signup.goToLogin = function(){        
        $state.go('login');
    }
    $scope.mainFrameCtrl.login.goToSignup = function(){
        $state.go('signup');
    }

    //-- Methods --//
    $scope.mainFrameCtrl.toKabinet=function(){
        $window.location.href='/manage/order';
    }
    // поместить в админку ввод этих данных
    /*$scope.mainFrameCtrl.popover={};
    $scope.mainFrameCtrl.popover.addShip={content:'enter new data sdfsdf',title:'titlere'}*/

}])
.controller('homeCtrl', ['$scope','$resource','global','$stateParams','seoContent','anchorSmoothScroll','$anchorScroll',function ($scope,$resource,global,$stateParams,seoContent,anchorSmoothScroll,$anchorScroll) {
    $scope.homeCtrl=this;
    $anchorScroll();
    $scope.homeCtrl.saleTag=global.get('saleTag');
    $scope.homeCtrl.newTag=global.get('newTag');
    $scope.homeCtrl.campaign=global.get('campaign');
    if (!global.get('mobile').val){
        $resource('/api/collections/FilterTags/:id',{id:'@_id'}).query({perPage:4 , page:0,query:{type:'main'}},function(res){
            if (res.length){
                res.shift();
                $scope.homeCtrl.mainTags=res;
            }
        });
        $resource('/api/collections/News/:id',{id:'@_id'}).query({perPage:2 , page:0},function(res){
            if (res.length){
                res.shift();
                res.forEach(function(el){if(el.gallery && el.gallery.length){el.gallery.sort(function(a,b){return a.index- b.index})}})
                $scope.homeCtrl.lastNews=res;
            }
        }); 
        $resource('/api/collections/Article/:id',{id:'@_id'}).query({perPage:2 , page:0},function(res){
            if (res.length){
                res.shift();
                res.forEach(function(el){if(el.gallery && el.gallery.length){el.gallery.sort(function(a,b){return a.index- b.index})}})
                $scope.homeCtrl.articles=res;
            } 
        }); 
        $resource('/api/collections/Slide/:id',{id:'@_id'}).query({perPage:10 , page:0,query:{active:true}},function(res){
            if (res.length){
                res.shift();
                res.forEach(function(el){if(el.gallery && el.gallery.length){el.gallery.sort(function(a,b){return a.index- b.index})}})
                $scope.homeCtrl.slides=res;
            } 
        }); 
    }
    //********* start titles
    //seoContent.setDataHomePage();
    //********* end titles
    $scope.homeCtrl.mobile=global.get('mobile' ).val;
}])
.controller('signupCtrl', ['$scope','global','$stateParams','$anchorScroll','$state',function ($scope,global,$stateParams,$anchorScroll,$state){
    $anchorScroll();
    if (global.get('user').val){
        $state.go('home');
    }
    $scope.$parent.mainFrameCtrl.signup.user.email=($stateParams.email)?$stateParams.email:'';
}])
.controller('loginCtrl',['$scope','$anchorScroll','$state','global',function($scope,$anchorScroll,$state,global){
    $anchorScroll()
    if (global.get('user').val){
        $state.go('home');
    }
    /*$scope.wewe = function(s){
        console.log(s);
    }*/
}]) // end controller(loginCtrl)
.controller('stuffsCtrl', ['$scope','$anchorScroll',function ($scope,$anchorScroll) {
    /*$anchorScroll();
    $scope.endLoadStuffs=false;
    $scope.$on('endLoadStuffs',function(){
        $scope.endLoadStuffs=true;
    })*/
    //console.log('stuffsCtrl')
}]) // end controller(stuffCtrl)
.controller('stuffDetailCtrl1', ['$scope','$rootScope','global','Stuff','$timeout','$window','$anchorScroll', function ($scope,$rootScope,global,Stuff,$timeout,$window,$anchorScroll) {
    $anchorScroll();
    $scope.stuffDetailCtrl=this;
    //-- Variables --//
    $scope.stuffDetailCtrl.coupons=global.get('coupon').val;
   //console.log($scope.stuffDetailCtrl.coupons)
    // получение товара
    Stuff.getItem($stateParams.stuffUrl,function(item){
        //console.log(item)
        $scope.stuff=item;
        if ($scope.stuff.group){
            $scope.colorGroup=$scope.stuff.group.col;
            $scope.recommendGroup=$scope.stuff.group.rec;
        }
        // мета данные
        $timeout(function(){
            $scope.objShare=seoContent.setDataStuff($scope.stuff);
        },600)
        //console.log($scope.objShare);
        //!***********************************************************
        $scope.endLoad=true;
        $scope.stuffDetailCtrl.filterCoupon = filterCoupon;
    });
    var filterCoupon=function(item){
        //console.log(item)
        // показываем только те купоны, которые есть в списке у пользователя и относятся к данному seller
        if (!item.seller)return;
        //console.log();
        return item.seller && $scope.stuff.seller==item.seller && global.get('user').val.coupons.indexOf(item._id)<0 &&
            global.get('user').val.coupon.indexOf(item._id)<0;

    }
    /*$scope.stuffDetailCtrl.getCoupon = function(coupon){
        $state.go('couponDetail',{id:coupon._id})
    }*/
}]) // end controller(stuffDetailCtrl)
.controller('detailWithIdCtrl', ['$scope','$rootScope','global','$window','seoContent','$anchorScroll','Model','$resource',function ($scope,$rootScope,global,$window,seoContent,$anchorScroll,Model,$resource) {
        $anchorScroll();
        $scope.detailCtrl=this;

        var Item = $resource('/api/collections/'+Model+'/:id',{'id':'id'})

        Item.get($rootScope.$stateParams,function(item){
            $scope.detailCtrl.item=item;
            $scope.endLoad=true;
        });
    //*********************************
    $scope.templateSrc='mobile/views/partials/404.html';
    $scope.curTemplate = "msg1.html";
    $scope.templates = ["msg1.html","msg2.html"];

    $scope.switch = function(idx){
        if($scope.templates.length > idx){
            $scope.curTemplate = $scope.templates[idx];
        }
    }
}]) // end controller(detailCtrl)
.controller('cartCtrl',['$scope','$resource','$timeout','$state','Auth','User','global','$anchorScroll','$window','anchorSmoothScroll','$order','globalSrv','toaster','CreateContent','$email','$notification',function($scope,$resource,$timeout,$state,Auth,User,global,$anchorScroll,$window,anchorSmoothScroll,$order,globalSrv,toaster,CreateContent,$email,$notification){
    $anchorScroll();
    $scope.cartCtrl=this;
    //**** variables
    //$scope.sendCart=false;
    //$scope.cartCtrl.comment='';
    $scope.countryCode=global.get('country');
    $scope.country={};
    // если корзина была инициализированна, то просто получаем ордер.
    if(!$order.type || $order.type!='cart'){
        $order.init('cart' ).then(function(order){
            $scope.cartCtrl.order=order;
        })
    }else{
        $scope.cartCtrl.order=$order.getOrder();
    }
    // не понятно как сделать по другому.
    $scope.$watch('cartCtrl.order.sum',function(n,o){
        if (n!=o && n){
            //console.log(n)
          $timeout(function(){
              $scope.cartCtrl.messageForCampaign=JSON.parse(JSON.stringify($scope.cartCtrl.order.messageForCampaign));
          })
        }
    },10)
    //console.log($scope.cartCtrl.order);

    // купон
    $scope.cartCtrl.coupons = global.get('coupon').val;
    //console.log(global.get('user' ).val)
    $scope.cartCtrl.filterCoupon = function(item){
        // показываем только те купоны, которые есть в списке у пользователя и относятся к данному seller
        //console.log(item)
        if (!item.seller)return;
        return item.seller && $scope.cartCtrl.order.seller==item.seller && global.get('user').val.coupon.indexOf(item._id)>-1;
    }


    // наблюдатели для данных по акционным компаниям
    // эти данные будут непосредственнно в одрере записаны. и просто вывобиться ng-repeat
    // вызывать эту функцию при определении суммы.
    //Естественно сумма меняется один раз при расчете корзины. Отлично.
    // Сделать добавление купона и в ордере. Можно применять  купон и управлении ордерами у клиента.
    /*$scope.$watch('cart.cartCount()',function(n,o){
        if (n!=o){
            $scope.cartCtrl.campaignMessageForCart=$scope.cartCtrl.genericPrice.getCampaignMessageForCart();
        }
    })*/
    //*********************
    //***** methods

    /*$scope.cartCtrl.getDateForId=function(){
        return Date.now();
    }*/

    // управление содержимым
    $scope.cartCtrl.clearCart=function(){
        if (confirm("Очистить корзину?")){
            //$scope.cart.clearCart();
            $order.clearCart();
        }

    }
    $scope.cartCtrl.removeItem=function(i){
        $order.removeItem(i);
    }
    $scope.cartCtrl.saveCart=function(){
        $order.updateOrder();
    }
    //************** заказ
    // правило для количества в корзине для разных стран
    $scope.checkLocation = function(){
        // console.log(global.get('country'));
        if (global.get('country').val.country_code!='UA' &&
            $scope.cart.cartCount()<Number(global.get('config').val.qForOtherCountry))
        {return true} else {return false}
    }
    // первый шаг оформления заказа. Прокрутка до блока авторизации
    $scope.goToLogin= function(){
        if ($order.cartCount<1) return;
        if (!global.get('local').val && $window.ga)
            $window.ga('send', 'event','order','firstStep');
        //console.log('ddd');
        anchorSmoothScroll.scrollTo('cartProfile')
    }
    // оформление заказа
    $scope.checkOut=function(formProfile){
        //проверка на пустую корзину
        if($order.cartCount<1){
            return;
        }
        // проверка всех полей и способа доставки
        $scope.submittedProfile = true;
        if(formProfile.$valid) {
            $scope.sendCart=true;
            if ($scope.cartCtrl.order.comment){
                $scope.cartCtrl.order.comment.clearTag(400);
            }
            $scope.cartCtrl.order.profile=global.get('user').val.profile;
            $scope.cartCtrl.order.user=global.get('user').val._id;
            $scope.cartCtrl.order.action='order'
            $order.sendOrder().then(function(res){
                //console.log(res)
                // google
                if (!global.get('local').val && $window.ga){
                    $window.ga('send', 'event','order','complete');
                    var transaction = {
                        'id': res.num,
                        'affiliation': 'tatiana-lux',
                        //'revenue': $scope.cart.getTotalSum(global.get('coupon').val)*global.get('rate').val,
                        //'shipping': '5',
                        //'tax': '1.29',
                        'currency':  global.get('currency').val // local currency code.
                    }
                    $window.ga('ecommerce:addTransaction', transaction);
                    var item;
                    /*$scope.cart.getItems().forEach(function(el){
                        // todo  добавить цену для купона если она таковая? а если купон был использован?
                        item =  {
                            id: res.num,
                            name: el.name+' '+el.sizeName,
                            category:el.categoryName,
                            price: ($scope.cart.cartCount()<5)?el.retail*global.get('rate').val:el.price*global.get('rate').val,
                            quantity: el.quantity
                        }
                        $window.ga('ecommerce:addItem',item);
                    });
                    $window.ga('ecommerce:send');*/

                }
                // яндекс
                if (!global.get('local').val&& window.yaCounter && window.yaCounter.reachGoal){
                    /*var yaParams = {
                        order_id: res.num,
                        order_price: $scope.cart.getTotalSum(),
                        currency:  global.get('currency').val,
                        exchange_rate: global.get('rate').val,
                        goods:[]
                    };*/
                    /*$scope.cart.getItems().forEach(function(el){
                        yaParams.goods.push({
                            id: "1",
                            //name: el.categoryName+' '+ el.name+' '+ el.colorName+' '+el.sizeName,
                            price: el.price,
                            quantity: el.quantity
                        });
                    });
                    window.yaCounter.reachGoal('ORDER',yaParams);*/
                }



                //$scope.cartCtrl.clearCart();
                // отправка письма
                $scope.cartCtrl.order._id=res.id;
                $scope.cartCtrl.order.num=res.num;
                $scope.cartCtrl.order.date=Date.now();
                $scope.cartCtrl.order.seller=global.get('seller').val.getObjectFromArray('_id',$scope.cartCtrl.order.seller)
                var content=CreateContent.order($scope.cartCtrl.order)





                var domain=global.get('store').val.domain||global.get('store').val.subDomain;
                var o={email:global.get('user').val.email,content:content,
                    subject:'заказ'+' ✔',from:domain+  '<order@madaland.biz>'};
                $email.save(o,function(res){
                    toaster.pop({
                        type: 'note',
                        title: 'Сообщение',
                        body: 'На Ваш email отправлено письмо',
                        delay:15000,
                    });
                },function(err){
                    toaster.pop({
                        type: 'error',
                        title: 'Ошибка',
                        body: 'Не удалось отправить письмо',
                        delay:15000,
                    });
                })
                // отправка уведомления
                var content=CreateContent.orderNote($scope.cartCtrl.order)
                var o={addressee:'seller',type:'order',content:content,order:$scope.cartCtrl.order._id,seller:$scope.cartCtrl.order.seller._id};
                $notification.save(o,function(res){console.log(res)},function(err){console.log(err)})

                // сохранение данных по отправке в профиле
                User.update(global.get('user').val,function(res){
                    globalSrv.getData('user').then(function(response){
                        global.set('user',response.data);
                        console.log(global.get('user'))
                    })
                });
                var pap = global.get('paps').val.getObjectFromArray('action','order');
                if(pap && pap.url){
                    $state.go('thanksPage',{url:pap.url})
                } else {
                    $state.transitionTo('home');
                }
                /*,function(res){
                    if (res='OK'){
                        if (!global.get('local').val && $window.ga){
                            $window.ga('send', 'event','registration','complete');
                        }
                    }
                })*/
                //
            },function(err){
                toaster.pop({
                    type: 'error',
                    title: 'Ошибка',
                    body: 'Не удалось отправить заказ',
                    delay:15000,
                });
                console.log(err)
            })
        }
    } //end sendOrder

}])// end controller(cartCtrl)
.controller('profileCtrl', ['$scope','$resource','$anchorScroll','$state','global','Auth','$timeout',function ($scope,$resource,$anchorScroll,$state,global,Auth,$timeout){       
    $scope.profileCtrl=this;
    if (!global.get('user').val){$state.go('login')}
    $anchorScroll();
    $scope.profileCtrl.oldPassword='';
    $scope.profileCtrl.newPassword='';
    $scope.profileCtrl.newPassword1='';
    $scope.profileCtrl.changePswdSuccess = false;
    $scope.errors = {};
    $scope.profileCtrl.changePassword = function(form) {
        $scope.profileCtrl.submitted = true;
        if(form.$valid) {
            Auth.changePassword( $scope.profileCtrl.oldPassword, $scope.profileCtrl.newPassword )
                .then( function() {
                    //console.log('ssss');
                    $scope.profileCtrl.submitted = false;
                    $scope.profileCtrl.enableChangePswd = false;
                    $scope.profileCtrl.oldPassword='';
                    $scope.profileCtrl.newPassword='';
                    $scope.profileCtrl.newPassword1='';
                    $scope.profileCtrl.changePswdSuccess=true;
                    $timeout(function(){$scope.profileCtrl.changePswdSuccess=false},3000);
                })
                .catch( function(err) {
                    err = err.data;
                    $scope.errors = {};
                    //console.log(err);
                    // Update validity of form fields that match the mongoose errors
                    if (err.errors){
                        angular.forEach(err.errors, function(error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.errors[field] = (error.message)?(error.message):error;
                        });
                    } else {
                        alert(err.error);
                    }
                });
        }
    };

    $scope.profileCtrl.updateProfile=function(){
        $scope.showUpdateSuccess=true;
        $timeout(function(){$scope.showUpdateSuccess=false;}, 3000);
    }
}])// end controller(profileCtrl)   
.controller('customOrderCtrl',['$scope','$window','$state','global','$resource','$anchorScroll','genericPrice',function($scope,$window,$state,global,$resource,$anchorScroll,genericPrice){
    if (!global.get('user').val){
        $state.go('login')
    }
    $window.locrion.href='/kabinet'
    $scope.customOrderCtrl=this;
    $anchorScroll();
    $scope.paginate={page:0,rows:5,totalItems:0}
    
    $scope.customOrderCtrl.initPriceInstanceForOrder= function(order){
        order.genericPrice= new genericPrice('order',order);
    }
    

    var Orders=$resource('/api/order/:id',{id:'@_id'});
    $scope.customOrderCtrl.getList =function(page,rows){
        if (global.get('user').val){
            Orders.query({'user':global.get('user').val._id,page:page,perPage:rows},function(res){
                if ($scope.paginate.page==0 && res.length>0){
                    $scope.paginate.totalItems=res.shift().index;
                }
                $scope.orders=res;
            });
        }
    }
    $scope.customOrderCtrl.getList(0,$scope.paginate.rows)   
    $scope.filterStatus='';
    $scope.filterNumber='';
    $scope.updateOrder =  function(order){
        order.$update(function(err){
            if (err) console.log(err);
                $scope.customOrderCtrl.getList($scope.paginate.gage,$scope.paginate.rows)  
            });
        };

     $scope.deleteOrder= function(order){
        if (confirm("Удалить?")){
            order.$delete(function(){
                $scope.customOrderCtrl.getList($scope.paginate.page,$scope.paginate.rows)  
            });
        }
    };
    $scope.customOrderCtrl.showDetail = function(order){
        console.log(order.showDetail)
        order.showDetail!=order.showDetail;
    }
}])// end controller(customOrderCtrl)  
.controller('pageCtrl',['$scope','$resource','$stateParams','$anchorScroll','$timeout','global',function($scope,$resource,$stateParams,$anchorScroll,$timeout,global){
    console.log('dd')
    if ($stateParams.type!='News' && $stateParams.type!='Stat'){
        $state.transitionTo('404')
    }
    $anchorScroll();
    $scope.pageCtrl=this;
    $scope.pageCtrl.ready=false;
    $scope.pageCtrl.itemsInList=0;
    var Items=$resource('/api/collections/'+$stateParams.type+'/:id',{id:'@_id'});
    $scope.type=$stateParams.type;
    $scope.Items=Items;
    $scope.paginate={page:0,rows:20,totalItems:0}
        
    $scope.moreNews = function(){
        $scope.paginate.page++;
        $scope.pageCtrl.getList($scope.paginate.page,$scope.paginate.rows);
    }
    var config=global.get('config').val
    $scope.pageCtrl.getList = function(page,rows){
            Items.query({perPage:rows , page:page},function(res){
                if ($scope.paginate.page==0 && res.length>0){
                    $scope.paginate.totalItems=res.shift().index;
                }
                res.forEach(function(item){
                    if(item.gallery && item.gallery.length){
                        item.gallery.sort(function(a,b){return a.index- b.index})
                    }
                })
                if ($scope.paginate.page==0){
                    $scope.items=res;
                    //console.log(res);
                }else{
                    //$scope.pageNewsCtrl.dopElem=res;
                    res.forEach(function(item){                        
                        $scope.items.push(item);
                    })
                }
                $scope.pageCtrl.itemsInList+=res.length;
                var titles={};
                if ($stateParams.type=='News'){
                    titles.pageTitle='новости от '+config.domain;
                    titles.pageDescription='обзор новостей с акциями, скидкими, новинками  от '+config.domain;
                    titles.pageKeyWords='новости,блог,обзоры'
                    titles.url='http://'+config.domain+'/page/'+$stateParams.type;
                    titles.canonical= titles.url;       
                    global.set('titles',titles);
                }else if($stateParams.type=='Stat'){
                    titles.pageTitle='информационные страницы от '+config.domain;
                    titles.pageDescription='информационные страницы со всеми данными необходимыми для взаимодействия с '+config.domain;
                    titles.pageKeyWords='страницы,статические страницы,информационные страницы';
                    titles.url='http://'+config.domain+'/page/'+$stateParams.type;
                    titles.canonical= titles.url;       
                    global.set('titles',titles);
                }
                $scope.pageCtrl.ready=true;
            })
        };
    $scope.pageCtrl.getList($scope.paginate.page,$scope.paginate.rows);
}])// end controller(pageCtrl)  
.controller('pageDetailCtrl',['$scope','$resource','$stateParams','$state','$anchorScroll','global','seoContent','$timeout',function($scope,$resource,$stateParams,$state,$anchorScroll,global,seoContent,$timeout){
    $anchorScroll();
    $scope.pageDetailCtrl=this;
    var Items=$resource('/api/collections/'+$stateParams.type+'/:id',{id:'@_id'});
    Items.get({id:$stateParams.id},function(res){
        console.log(res)
        if (!res) { return $state.go('404');}
        if(res.gallery && res.gallery.length){
            res.gallery.sort(function(a,b){return a.index- b.index})
        }
        $scope.item=res;
        // мета данные
        $timeout(function(){
            $scope.objShare=seoContent.setDataPage(res,$stateParams.type);
        },600)        
    },function(err){
        console.log(err);
        $state.go('404');
    });
}])// end controller(pageDetailCtrl)  
.controller('campaignCtrl',['$scope','$resource','$stateParams','$anchorScroll','$timeout','global',function($scope,$resource,$stateParams,$anchorScroll,$timeout,global){
    $anchorScroll();
    $scope.campaignCtrl=this;
    $scope.campaignCtrl.ready=false;
    $scope.campaignCtrl.itemsInList=0;
    var Items=$resource('/api/collections/Campaign/:url',{url:'@url'});
    $scope.Items=Items;
    $scope.campaignCtrl.paginate={page:0,rows:20,totalItems:0}
        
    $scope.campaignCtrl.moreItems = function(){
        $scope.campaignCtrl.paginate.page++;
        $scope.campaignCtrl.pageCtrl.getList($scope.campaignCtrl.paginate.page,$scope.campaignCtrl.paginate.rows);
    }
    $scope.campaignCtrl.getList = function(page,rows){
        Items.query({perPage:rows , page:page},function(res){
            if ($scope.campaignCtrl.paginate.page==0 && res.length>0){
                $scope.campaignCtrl.paginate.totalItems=res.shift().index;
            }
            if ($scope.campaignCtrl.paginate.page==0){
                $scope.campaignCtrl.items=res;
                //console.log(res);
            }else{
                //$scope.pageNewsCtrl.dopElem=res;
                res.forEach(function(item){                        
                    $scope.campaignCtrl.items.push(item);
                })
            }
            $scope.campaignCtrl.itemsInList+=res.length;

            var titles={};
            titles.pageTitle='Акции от '+global.get('config').domain;
            titles.pageDescription='обзор акций со скидкими от '+global.get('config').domain;
            titles.pageKeyWords='акции,распродажи'
            titles.url='http://'+global.get('config').domain+'/campaign';
            titles.canonical= titles.url;       
            global.set('titles',titles);                
            $scope.campaignCtrl.ready=true;
        })
    };
    $scope.campaignCtrl.getList($scope.campaignCtrl.paginate.page,$scope.campaignCtrl.paginate.rows);
}])// end controller(pageCtrl)  
.controller('campaignDetailCtrl',['$scope','$resource','$stateParams','$state','$anchorScroll','global','seoContent','$timeout',function($scope,$resource,$stateParams,$state,$anchorScroll,global,seoContent,$timeout){
    $anchorScroll();
    $scope.campaignDetailCtrl=this;
    var Items=$resource('/api/collections/Campaign/:url',{url:'@url'});
    Items.get({url:$stateParams.url},function(res){
        if (!res) { return $state.go('404');}
        res.stuffs.forEach(function(el){
            el.priceCampaign=Math.round(Number(el.price)-((Number(el.price)/100)*Number(res.discount)));
            el.sticker=res.sticker;
        })
        $scope.campaignDetailCtrl.item=res;
        // мета данные
        $timeout(function(){
            //$scope.objShare=seoContent.setDataPage(res);
        },600)
        
    },function(err){
        console.log(err);
        $state.go('404');
    });
}])// end controller(pageDetailCtrl) 
.controller('detailCtrl', ['$scope','$stateParams','$resource',function ($scope,$stateParams,$resource) {
    $scope.detailCtrl = this;
    $resource('/api/collections/PAP/:id',{id:'@_id'} ).get({id:$stateParams.url},function(res){
        $scope.detailCtrl.item=res;
        console.log(res)
    });
}]) //end thanksCtrl
.controller('journalCtrl',['$scope','$resource', '$stateParams','global','seoContent',function($scope,$resource,$stateParams,global,seoContent) {
// мета данные
    seoContent.setDataJournal();
    //***********************************************************

    if (!global.get('sections').val){
        $resource('/api/collections/Section/:id',{id:'@_id'}).query(function(res){
            res.shift();
            $scope.sections=res;
            global.set('sections',$scope.sections)
        });
    } else {
        $scope.sections=global.get('sections').val;
    }

    if (!global.get('sectionTags').val){
        $resource('/api/collections/SectionTags/:id',{id:'@_id'}).query(function(res){
            res.shift();
            $scope.sectionTags=res;
            global.set('sectionTags',$scope.sectionTags)

        });
    } else {
        $scope.sectionTags=global.get('sectionTags').val;
    }


    var Items = $resource('/api/collections/Article/:id',{id:'@_id'});

    $scope.paginate={page:0,row:15,totalItems:0}
    $scope.moreArticles = function(){
        $scope.paginate.page++;
        $scope.afterSave();
    }





    $scope.query={section:'',sectionTags:''}
    if ($stateParams.section){
        $scope.query.section=global.get('sections').val.getObjectFromArray('url',$stateParams.section)._id;
    }
    if ($stateParams.sectionTag){
        $scope.query.sectionTags=$stateParams.sectionTag;
    }
    //console.log($scope.query);


    $scope.$watch('query',function(newVal, oldVal){

        //console.log(newVal,oldVal,firstAjax);
        if (newVal!=oldVal){
            $scope.paginate.page=0;
            $scope.afterSave();
        }
    },true)

    $scope.afterSave = function(){
        var query='';
        if ($scope.query.section){
            query={section:$scope.query.section}
        }
        if ($scope.query.sectionTags){
            if (query){
                query ={$and:[{section:$scope.query.section},{sectionTags:$scope.query.sectionTags}]}
            } else {
                query={sectionTags:$scope.query.sectionTags}
            }
        }

        Items.query({perPage:$scope.paginate.row , page:$scope.paginate.page,query:JSON.stringify(query)},function(res){
            if ($scope.paginate.page==0 && res.length>0){
                $scope.paginate.totalItems=res.shift().index;
            }
            if (res.length==0){$scope.paginate.totalItems=0}


            res.forEach(function(el){
                if(el.gallery && el.gallery.length){
                    el.gallery.sort(function(a,b){return a.index- b.index})
                }
            })
            if ($scope.paginate.page==0){
                $scope.articles=res;
            }else{
                res.forEach(function(item){
                    $scope.articles.push(item);
                })
            }

        })
    };
    $scope.afterSave();
}])
.controller('articleCtrl',['$scope','$resource','$stateParams', 'global','seoContent',function($scope,$resource,$stateParams,global,seoContent) {
    if (!global.get('sections').val){
        $resource('/api/collections/Section/:id',{id:'@_id'}).query(function(res){
            res.shift();
            $scope.sections=res;
            global.set('sections',$scope.sections)
        });
    } else {
        $scope.sections=global.get('sections').val;
    }

    if (!global.get('sectionTags').val){
        $resource('/api/collections/SectionTags/:id',{id:'@_id'}).query(function(res){
            res.shift();
            $scope.sectionTags=res;
            global.set('sectionTags',$scope.sectionTags)

        });
    } else {
        $scope.sectionTags=global.get('sectionTags').val;
    }
    var domain=global.get('config').val.domain;
    var Item=$resource('/api/collections/Article/:id',{id:'@_id'});
    Item.get({id:$stateParams.id},function(el){
        if(el.gallery && el.gallery.length){
            el.gallery.sort(function(a,b){return a.index- b.index})
        }
        $scope.item=el;
        //console.log('-=kkdk')
        // блок SEO
        $timeout(function(){
            seoContent.setDataArticle(el);
        },600)
        seoContent.setDataArticle(el);
        //***********************************************************

        //получение дополнительных статей из раздела
        Item.query({perPage:5 , page:0,query:JSON.stringify({$and:[{section:$scope.item.section},{_id:{$ne:$scope.item._id}}]})},function(res){
            res.shift();
            res.forEach(function(el){
                if(el.gallery && el.gallery.length){
                    el.gallery.sort(function(a,b){return a.index- b.index})
                }
            })
            $scope.articles=res;
        });
        // получение товаров из связанных категорий
        if ($scope.sections.val){
            $resource('/api/collections/Stuff/:id',{id:'@_id'}).query({perPage:3 , page:0,query:JSON.stringify({category:{$in:findObInArray($scope.sections.val,'_id',$scope.item.section).categories}})},function(res){
                res.shift();
                res.forEach(function(el){
                    if(el.gallery && el.gallery.length){
                        el.gallery.sort(function(a,b){return a.index- b.index})
                    }
                })
                $scope.stuffs=res;
            });
        }

    },function(err){
        if (err) consoe.log('???')
    });
}])


.controller('modelInstanceCtrl',['$scope','global','model','$stateParams','$state','$anchorScroll','$timeout',function($scope,global,model,$stateParams,$state,$anchorScroll,$timeout){
    $anchorScroll();
    $scope.modelInstanceCtrl=this;
    $scope.endLoadStuffs=false;
    $scope.$on('endLoadStuffs',function(){
        $scope.endLoadStuffs=true;
    })

    var Items=global.get('models' ).val[model];
    if(!Items){console.log('не зарегестрованная модель');return;}
    Items.get({id:$stateParams.id||$stateParams.url},function(res){
        //console.log(res)
        if (!res) { return $state.go('404');}
        if(res.gallery && res.gallery.length){
            res.gallery.sort(function(a,b){return a.index- b.index})
        }
        $scope.item=res;
        // мета данные
        $timeout(function(){
            //$scope.objShare=seoContent.setDataPage(res,$stateParams.type);
        },600)
        if(model=='Campaign'){
            console.log(Date.parse($scope.item.dateEnd),Date.now())
            $scope.item.dateEnd=Date.parse($scope.item.dateEnd)-Date.now();
            console.log(Math.round($scope.item.dateEnd/1000));
            $scope.dateEnd=Math.round($scope.item.dateEnd/1000)
            if($scope.item.groupStuffTag){
                $scope.stuffQuery={tags:$scope.item.groupStuffTag}
            }
            if($scope.item.groupBaseTag){
                $scope.baseQuery={tags:$scope.item.groupBaseTag}
            }
        }



    },function(err){
        console.log(err);
        $state.go('404');
    });
}])
.controller('404Ctrl', ['$scope','seoContent',function ($scope,seoContent) {       
    //********* start titles
    seoContent.setData404();
    //********* end titles
}])
    

 
 

    .controller('CommentCtrl', function($scope, $element, $timeout) {
        var children;
        $scope.collapsed = true;
        $scope.$on('$filledNestedComments', function(nodes) {
            $scope.collapsed = true;
            $timeout(function() {
                children = nodes;
                children.addClass('collapse').removeClass('in');
                children.collapse({
                    toggle: false
                });
                // Stupid hack to wait for DOM insertion prior to setting up plugin
            }, 1);
        });
        $scope.$on('$emptiedNestedComments', function(nodes) {
            children = undefined;
        });
        $scope.collapse = function() {
            console.log('is colla[se');
            $scope.collapsed = children.hasClass('in');
            children.collapse('toggle');
        };

      
    })




   .controller('articleCtrl33',['$scope','$resource','$stateParams', 'global','seoContent',function($scope,$resource,$stateParams,global,seoContent) {

        //$scope.$on('$viewContentLoaded',function(){console.log('content loaded!')})
        if (!global.get('sections').val){
            $resource('/api/collections/Section/:id',{id:'@_id'}).query(function(res){
                res.shift();
                $scope.sections=res;
                global.set('sections',$scope.sections)
            });
        } else {
            $scope.sections=global.get('sections').val;
        }

        if (!global.get('sectionTags').val){
            $resource('/api/collections/SectionTags/:id',{id:'@_id'}).query(function(res){
                res.shift();
                $scope.sectionTags=res;
                global.set('sectionTags',$scope.sectionTags)

            });            
        } else {
            $scope.sectionTags=global.get('sectionTags').val;
        }
        var domain=global.get('config').val.domain;
        var Item=$resource('/api/collections/Article/:id',{id:'@_id'});
        Item.get({id:$stateParams.id},function(el){
            if(el.gallery && el.gallery.length){
                        el.gallery.sort(function(a,b){return a.index- b.index})
                    }
            $scope.item=el;
            //console.log('-=kkdk')
            // блок SEO
            $timeout(function(){
                seoContent.setDataArticle(el);  
            },600)
            seoContent.setDataArticle(el);           
            //***********************************************************

            //получение дополнительных статей из раздела
            Item.query({perPage:5 , page:0,query:JSON.stringify({$and:[{section:$scope.item.section},{_id:{$ne:$scope.item._id}}]})},function(res){
                res.shift();
                res.forEach(function(el){
                    if(el.gallery && el.gallery.length){
                        el.gallery.sort(function(a,b){return a.index- b.index})
                    }
                })
                $scope.articles=res;
            });
            // получение товаров из связанных категорий
            if ($scope.sections.val){
               $resource('/api/collections/Stuff/:id',{id:'@_id'}).query({perPage:3 , page:0,query:JSON.stringify({category:{$in:findObInArray($scope.sections.val,'_id',$scope.item.section).categories}})},function(res){
                    res.shift();
                    res.forEach(function(el){
                        if(el.gallery && el.gallery.length){
                            el.gallery.sort(function(a,b){return a.index- b.index})
                        }
                    })
                    $scope.stuffs=res;
                }); 
            }
            
        },function(err){
            if (err) consoe.log('???')
        });
        

        
    }])

   .controller('actionsCtrl',['$scope','$state','global',function($scope,$state,global){
        $scope.actionsCtrl=this;
        $scope.actionsCtrl.campaign=global.get('campaign').val;
        console.log($scope.actionsCtrl.campaign);
    }])

    .controller('tagsforpageCtrl',['$scope','$state','global','$resource',function($scope,$state,global,$resource){
        $scope.tagsforpageCtrl=this;
        //scope.tagsforpageCtrl.tags=globalFunction.getObjectFromArray(global.get('filterTags').val,'type','doppage','array')
        //console.log($scope.tagsforpageCtrl.tags);
        $resource('/api/collections/FilterTags/:id',{id:'@_id'}).query({perPage:100 , page:0,query:{type:'doppage'}},function(res){
            res.shift();
            $scope.tagsforpageCtrl.tags=res;
        }); 
    }]) 

   

   /* .controller('profileCtrl',['$scope','$rootScope','$stateParams','$http','$timeout','User','Auth','global',function($scope,$rootScope,$stateParams,$http,$timeout,User,Auth,global){
        *//* if (!$rootScope.Signed) $rootScope.$state.go('language.home');*//*
        /*//***********************************
        // редактирование профиля
        /*//************************************

        // смена пароля
        $scope.profile={};
        //$scope.profile.changePswdNameBtn = 'Сменить пароль';
        $scope.profile.showChangePswd =  false;
        $scope.oldPassword='';
        $scope.newPassword='';
        $scope.newPassword1='';
        $scope.changePswdSuccess = false;
        $scope.changePswdError = false;
        $scope.changePswdMatch = false;
        //$scope.changePswdMatch

        $scope.profile.changePswdF = function(){
            // console.log('info');
            if (!$scope.profile.showChangePswd)
                $scope.profile.showChangePswd = true;
            $scope.oldPassword='';
            $scope.newPassword='';
            $scope.newPassword1='';

            //$scope.profile.changePswdNameBtn = 'Отправить';
        };

        $scope.errors = {};

        $scope.changePassword = function(form) {

            if ($scope.newPassword != $scope.newPassword1){
                $scope.changePswdMatch=true;
                $timeout(function(){$scope.changePswdMatch=false},3000);
                return;
            }

            $scope.submitted = true;

            //if(form.$valid) {
            //$http.get('/api/change');//,{oldPassword:$scope.oldPassword,newPassword: $scope.newPassword });
            //$rootScope.user.$updatePswd();
            Auth.changePassword( $scope.oldPassword, $scope.newPassword )
                .then( function() {
                    console.log('ssss');
                    $scope.profile.showChangePswd = false;
                    $scope.oldPassword='';
                    $scope.newPassword='';
                    $scope.newPassword1='';
                    $scope.changePswdSuccess=true;
                    $timeout(function(){$scope.changePswdSuccess=false},3000);

                })
                .catch( function(err) {
                    err = err.data;
                    //s$scope.errors.other = err.message;
                    $scope.changePswdError=true;
                    $timeout(function(){$scope.changePswdError=false},3000);
                    $scope.errors.other = 'Incorrect password';
                });
            //}
        };

        *//*        $scope.user;
         if (Auth.isLoggedIn()){
         $timeout(function(){
         $scope.user=Auth.isLoggedIn();
         });
         }
         $scope.$on('logout', function(event, user) {
         $scope.user=null;
         $rootScope.$state.transitionTo('language.home',{lang:$rootScope.$stateParams.lang});
         });
         $scope.$on('logged', function(event, user) {
         $timeout(function(){
         $scope.user=user;

         });

         });*//*

        $scope.user=global.get('user').val;
        *//*$scope.$watch('user',function(n,o){
         if(n){
         $scope.afterSave();
         }
         });*//*
        $scope.disableButtonSave = false;
        $scope.showUpdateError = false;
        $scope.showUpdateSuccess = false;

        $scope.submittedProfile = false;
        $scope.profileSave= function(formProfile) {

            $scope.submittedProfile = true;
            if(formProfile.$valid) {
                $scope.disableButtonSave = true;
                $scope.showUpdateSuccess=true;
                $scope.errors={};
                User.update($scope.user,function(res){
                    Auth.setUserProfile($scope.user.profile);
                    console.log(res);
                    if (res='OK'){
                        $timeout(function(){$scope.showUpdateSuccess=false;$scope.disableButtonSave = false;}, 3000);
                    }
                });
            }
        };

    }])*/