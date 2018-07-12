'use strict';
angular.module('gmall.controllers')
.controller('ordersCtrl',['$scope','Orders','global','$rootScope','$window','$timeout','$location',function($scope,Orders,global,$rootScope,$window,$timeout,$location){
    $scope.ordersCtrl=this;
    $rootScope.ordersCtrl=$scope.ordersCtrl;
    $scope.ordersCtrl.paginate={page:0,rows:20,totalItems:0}
    $scope.ordersCtrl.query={}
    var query=null;

    //var i=0;
    $scope.ordersCtrl.setUnReadChatMessages=function(){
        //console.log(i++)
        $scope.ordersCtrl.orders.forEach(function(order){
            var name='N-'+order.num;
            if(global.get('chatMessages').val[name]){
                console.log(global.get('chatMessages').val[name]);
                order.chatMessages=global.get('chatMessages').val[name].count;
            }else {
                order.chatMessages=null;
            }
        })
    }
    $scope.ordersCtrl.getList = function(page,rows){
        //console.log(page,rows)
        if(!global.get('user' ).val || !global.get('user' ).val._id)return;
        //console.log(global.get('user' ).val)
        if (global.get('seller' ) && global.get('seller' ).val){
            $scope.ordersCtrl.query['seller']=global.get('seller' ).val;
        }else{
            $scope.ordersCtrl.query['user']=global.get('user' ).val._id;
        }
        if (page!=$scope.ordersCtrl.paginate.page){
            $scope.ordersCtrl.paginate.page=page;
        }
        //console.log($scope.ordersCtrl.dtfrom,$scope.ordersCtrl.dtto)
        /*if (!$scope.ordersCtrl.query.num){
            $scope.ordersCtrl.query.date={$gte:new Date($scope.ordersCtrl.dtfrom),$lte: new Date($scope.ordersCtrl.dtto)};
        }*/
        if (!$scope.ordersCtrl.query.num){
            $scope.ordersCtrl.query.date={$gte:new Date($scope.datePicker.date.startDate),$lte: new Date($scope.datePicker.date.endDate)};
        }

        /*for(var key in $scope.ordersCtrl.query){
            if (!$scope.ordersCtrl.query[key]){
                delete $scope.ordersCtrl.query[key];
            }
        }*/
        //console.log($scope.ordersCtrl.query)
        if (Object.keys($scope.ordersCtrl.query).length>1){
            //console.log(Object.keys($scope.ordersCtrl.query).length)
            query={$and:[]}
            for(var key in $scope.ordersCtrl.query){
                var o={}
                o[key]=$scope.ordersCtrl.query[key];
                query.$and.push(o)
            }
        }else{
            query=$scope.ordersCtrl.query;
        }
        //console.log(query);
        Orders.list({perPage:rows , page:page,query:query},function(res){
            if (page==0 && res.length>0){
                $scope.ordersCtrl.paginate.totalItems=res.shift().index;
            }
            if(res.length==0){
                $scope.ordersCtrl.paginate.totalItems=0;
            }
            $scope.ordersCtrl.orders=res;
            $scope.ordersCtrl.query={}
            query=null;
            $scope.ordersCtrl.itemsCount=$scope.ordersCtrl.paginate.totalItems;
            //console.log($scope.ordersCtrl.orders);
            // количество не прочитанных сообщений по ордерам
            //console.log('!')
            $timeout(
                function() {
                    $scope.ordersCtrl.setUnReadChatMessages()
                },100
            )

        })
    };
    $scope.$on('newMessage',function(){
        //console.log('newMessage')
        $timeout(
            function() {
                $scope.ordersCtrl.setUnReadChatMessages()
            },100
        )
    })
    $scope.ordersCtrl.reloadOrders = function(s){
        // do it after getiing list
        //$scope.ordersCtrl.query={};
        if(s){
            var a = parseInt(s.substring(0,30));
            if (typeof a==='number' && (a%1)===0){
                $scope.ordersCtrl.query['num']=a;
            }else{

                $scope.ordersCtrl.query['profile.fio']=s.substring(0,30);
                console.log($scope.ordersCtrl.query['profile.fio'])
            }
        }
        $scope.ordersCtrl.getList(0,$scope.ordersCtrl.paginate.rows);
    }
    $scope.ordersCtrl.deleteItem = function(item){
        if (confirm("Удалить?")){
            Orders.delete({id:item._id},function(err){
                if (err) console.log(err);
                $scope.ordersCtrl.getList($scope.ordersCtrl.paginate.page,$scope.ordersCtrl.paginate.rows);
            });
        }
    }
//***************************************************************************************************
    //**********************************************даты**********************************************
    // установка диапазона дат для получения списка
    $scope.ordersCtrl.dt  = new Date();
    $scope.ordersCtrl.today = function(t) {
        if(t){return new Date($scope.ordersCtrl.dt.setHours(0,0,0));}else {return new Date($scope.ordersCtrl.dt.setHours(23,59,59));}
    };
    $scope.ordersCtrl.maxDate=$scope.ordersCtrl.today(true)
    var dtto = $scope.ordersCtrl.today();
    var dtfrom=$scope.ordersCtrl.today(true);
    dtfrom.setDate(dtfrom.getDate() - 30);
    $scope.ordersCtrl.dtto=dtto;
    $scope.ordersCtrl.dtfrom=dtfrom;

    var now = new Date();
    var yesterday=new Date(new Date($scope.ordersCtrl.today(true)).setDate(now.getDate() - 1));

    var nextWeek = new Date(new Date($scope.ordersCtrl.today(true)).setDate(now.getDate() - 7));
    var nextMonth = new Date(new Date($scope.ordersCtrl.today(true)).setMonth(now.getMonth() - 1));
    var y = dtto.getFullYear(), m = dtto.getMonth();
    var thisMonth = new Date(y, m, 1);
    var last30day = new Date(new Date($scope.ordersCtrl.today(true)).setDate(now.getDate() - 30));

    $scope.datePicker={};
    $scope.ordersCtrl.options={
        "ranges": {
            "сегодня": [
                $scope.ordersCtrl.today(true),
                dtto
            ],
            "вчера": [
                yesterday,
                $scope.ordersCtrl.today(true)
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
            format:"DD MMMM YYYY",
            daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
            firstDay: 1,
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                'Ноябрь', 'Декабрь'
            ]
        }
    }
    $scope.datePicker.date = {
        startDate: dtfrom,
        endDate: dtto
    };
    moment.locale("ru");
    $scope.moment=moment;

    //**********************************************************************************************
    //*********************************************************************************************

    // boots controller
    $scope.ordersCtrl.getList($scope.ordersCtrl.paginate.page,$scope.ordersCtrl.paginate.rows);
    $scope.ordersCtrl.deleteOrder=function(order){
        if (confirm("Удалить?")){
            order.$delete(function(err){
                if (err) console.log(err);
                $scope.ordersCtrl.getList($scope.ordersCtrl.paginate.page,$scope.ordersCtrl.paginate.rows);
            });
        }
    }

    // выбор ордера
    $scope.ordersCtrl.pickOrder = function(id){
        if($rootScope.$stateParams.order!=id){
            $location.search('order',id);
            $rootScope.$stateParams.order=id;
        }
        $scope.ordersCtrl.orderId=id;

    }
    if($rootScope.$stateParams.order){
        $scope.ordersCtrl.pickOrder($rootScope.$stateParams.order);
    }

}])
.controller('orderCtrl',['$scope','$rootScope','Orders','Stuff','$order','global','$anchorScroll','Helper','CreateContent','$window','$email','$notification','toaster','$q','$http','$location',function($scope,$rootScope,Orders,Stuff,$order,global,$anchorScroll,Helper,CreateContent,$window,$email,$notification,toaster,$q,$http,$location){
    $anchorScroll();
    $scope.orderEditCtrl=this;
    $scope.moment=moment;
    $scope.global=global;
    $rootScope.orderEditCtrl=$scope.orderEditCtrl;
    $scope.orderEditCtrl.stuff='';
    $scope.orderEditCtrl.statusArray=[{status:'поступил',value:1},{status:'принят',value:2},{status:'оплачен',value:3},{status:'доставлен',value:5}]
    var $stateParams= $rootScope.$stateParams;
    var $state= $rootScope.$state;
   // console.log($state.current.name)
    $scope.orderEditCtrl.order=null;
    $scope.orderEditCtrl.participant=(global.get('seller').val)?'seller':'user';

    $scope.orderEditCtrl.orderId=null;
    $scope.orderEditCtrl.loadOrder = function(){
        $order.init('order',$scope.orderEditCtrl.orderId).then(function(order){
            $scope.orderEditCtrl.order=order;
            $scope.orderEditCtrl.status=$scope.orderEditCtrl.statusArray.getObjectFromArray('value',order.status);
            //console.log($scope.orderEditCtrl.order)
            // список для выбора товаров для доставки
            $scope.orderEditCtrl.listStuffForShip=order.cart.stuffs.map(function(s){
                return  s.name+' '+s.artikul+' '+s.addCriterionName;
            })

            $scope.orderEditCtrl.currencyArray = Object.keys(order.currencyStore).map(function(k) { return order.currencyStore[k] });
            $scope.orderEditCtrl.currency=order.currencyStore[order.currency]
            // список доступных купонов, если купон не был установлне в корзине
            if (!$scope.orderEditCtrl.order.coupon){
                $http({
                    method: 'GET',
                    url: '/api/getCouponsForOrder/'+$scope.orderEditCtrl.order._id
                }).then(function successCallback(data) {
                    //console.log(data)
                    $scope.orderEditCtrl.coupons=data.data;
                }, function errorCallback(response) {
                });
            }
            //$scope.$broadcast('loadOrder')
        });
    }



    // купон в ордере может быть только удален. или добавлен из списка купонов пользователя
    $scope.orderEditCtrl.removeItem=function(i){
        $order.removeItem(i);
    }
    $scope.orderEditCtrl.updateOrder=function(dontUpdate){
        $location.search('order',null);
        $rootScope.$stateParams.id=null;
        if ($scope.$parent.$parent.ordersCtrl && $scope.$parent.$parent.ordersCtrl.setUnReadChatMessages){
            console.log($scope.$parent.$parent.ordersCtrl)
            $scope.$parent.$parent.ordersCtrl.setUnReadChatMessages()
        }
        if (dontUpdate){
            return $scope.orderEditCtrl.orderId=null;
        }
        Orders.save($scope.orderEditCtrl.order).$promise.then(function(res){
            $scope.$parent.ordersCtrl.reloadOrders();
            $scope.orderEditCtrl.orderId=null;
        },function(){
            $scope.orderEditCtrl.orderId=null;
        });
    }
    //******************************************************************
    //****************** добавление товара******************************
    //******************************************************************
    $scope.orderEditCtrl.selectStuff = function(stuff){
        $order.addItemToCart(stuff)
    }
    $scope.orderEditCtrl.refresStuffs = function(search) {
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
                    $scope.orderEditCtrl.stuffs=res
                    //console.log(res)
                    //res.forEach(function(el){$scope.orderEditCtrl.stuffs.push(el)})
                }else{
                    $scope.orderEditCtrl.stuffs=[]
                }
            })
        }
    }



    //************************************* helper**********************
    Helper.getItem($state.current.name,function(res){
        if(res.popover){
            $scope.orderEditCtrl.popover=res.popover;
        }
        if(res.intro){
            $scope.orderEditCtrl.intro=res.intro;
        }
        $scope.IntroOptions = {
            steps:[
                {
                    element: document.querySelector('#step1'),
                    intro:$scope.orderEditCtrl.intro[1]
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

    })

    //******************************************************************
    //****************** общие методы **********************************
    //******************************************************************

    $scope.orderEditCtrl.getNow=function(){
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
    $scope.orderEditCtrl.goToStuff = function(stuff){
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

    $scope.orderEditCtrl.datePickerOptions ={
        
        locale: {
            applyClass: 'btn-success',
            applyLabel: "Выбрать",
            fromLabel: "от",
            toLabel: "до",
            cancelLabel: 'Отменить',
            customRangeLabel: 'Прозвольный диапазон',
            format:"DD-MMMM-YYYY",
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
        var domain=$scope.orderEditCtrl.order.domain;
        var o={email:dataEmail.email,content:dataEmail.content,subject:dataEmail.subject+' ✔',from:domain+  '<'+dataEmail.addSubject+'@madaland.biz>'};
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
        var order =$scope.orderEditCtrl.order;
        var o={ _id:$scope.orderEditCtrl.order._id,seller:$scope.orderEditCtrl.order.seller}
        Array.prototype.forEach.call(arguments,function(field){
            //console.log(field)
            o[field]=$scope.orderEditCtrl.order[field];
            if(fieldList){fieldList+=' '};
            fieldList+=field;
        })
        //console.log(fieldList)
        Orders.save({update:fieldList},o,function(){
            deferred.resolve();
        },function(err){
            deferred.reject();
        });
        return deferred.promise;
    }
    //*************************************************************
    //******************************************************************
    //****************** управление ордером*****************************
    //******************************************************************
    $scope.orderEditCtrl.changeCurrency=function(){
        $scope.orderEditCtrl.order.currency=$scope.orderEditCtrl.currency[1];
        $scope.orderEditCtrl.order.kurs=$scope.orderEditCtrl.currency[0];
        $scope.orderEditCtrl.updateOrderField('currency','kurs')
        /*updateOrderField('currency','kurs' ).then(function(){
            showToaster('note','Сохренено','информация обновлена')
        },function(){
            showToaster('error','Ошибка','не удалось сохранить')
        });*/


    }
    //********************************************************************
    //********************************************************************
    $scope.orderEditCtrl.updateOrderField=function(){
        updateOrderField.apply(updateOrderField,arguments).then(function(){
            showToaster('note','СОХРАНЕНО','информация обновлена')
        },function(){
            showToaster('error','ОШИБКА','не удалось сохранить')
        });
    }

    function displayContentInPopUpWin(c){
        var popupWin=window.open();
        popupWin.window.focus();
        popupWin.document.write(c);
    }
    $scope.orderEditCtrl.printShip=function(){
        displayContentInPopUpWin(CreateContent.orderShipInfo($scope.orderEditCtrl.order));
    }
    $scope.orderEditCtrl.printOrder=function(){
        displayContentInPopUpWin(CreateContent.order($scope.orderEditCtrl.order));
    }
    $scope.orderEditCtrl.printInvoice=function(){
        displayContentInPopUpWin(CreateContent.order($scope.orderEditCtrl.order,'invoice'));
    }






    $scope.orderEditCtrl.sendNotification=function(type,obj,addressee){
        if (!addressee){addressee='seller'}else{addressee=$scope.orderEditCtrl.order.user._id||$scope.orderEditCtrl.order.user}
        var o={addressee:addressee,type:type,content:''};
        o.seller=$scope.orderEditCtrl.order.seller._id;
        //if (user=='seller'){o.seller=$scope.orderEditCtrl.order.seller._id}
        // console.log(user,o)
        //**************** формирование контента
        var dataEmail={content:''};
        var noteContent;
        var notification='send'
        if (type=='pay'){
            updateOrderField('pay')
            o.content=CreateContent.payInfo($scope.orderEditCtrl.order,obj);
            noteContent='уведомление об оплате отправлено'
        }else if(type=='shipDetail'){
            updateOrderField('shipDetail')
            o.content=CreateContent.shipInfo($scope.orderEditCtrl.order,obj);
            noteContent='уведомление о доставке отправлено'
        }else if(type=='invoice'){
            $scope.orderEditCtrl.order.invoice=Date.now();
            updateOrderField('ivoice')
            noteContent='счет отправлен на email.'
            o.content=CreateContent.invoiceInfo($scope.orderEditCtrl.order);
            dataEmail.content=CreateContent.order($scope.orderEditCtrl.order,'invoice')
            dataEmail.subject='счет';
            dataEmail.addSubject='invoice';
            dataEmail.email=$scope.orderEditCtrl.order.user.email;
        }else if(type=='accepted'){
            $scope.orderEditCtrl.order.date2=Date.now();
            updateOrderField('date2')
            dataEmail.content=CreateContent.acceptedInfo($scope.orderEditCtrl.order);
            o.content=dataEmail.content;
            noteContent='уведомление и письмо отправлены';
            dataEmail.subject='заказ принят';
            dataEmail.addSubject='accepted';
            dataEmail.email=$scope.orderEditCtrl.order.user.email;
        }else if(type=='shipOrder'){
            notification=null;
            updateOrderField('shipDetail');
            dataEmail.content=CreateContent.orderShipInfo($scope.orderEditCtrl.order);
            noteContent='информация о доставке отправлена на email.'
            dataEmail.subject='информация о доставке';
            dataEmail.addSubject='shipDetail';
            dataEmail.email=$scope.orderEditCtrl.order.user.email;
        }
        o.order=$scope.orderEditCtrl.order._id;
        $q.when((dataEmail.content)?sendMail(dataEmail):'note').then(function (res) {
            // показ уведомления
            var defer=$q.defer();
            //console.log(res)
            var title;
            //console.log(notification)
            if (notification=='send'){
                title='отправлено уведомление';
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
            showToaster('error','ОШИБКА','не удалось отправить письмо')
        }).then(function(title){
            showToaster('note',title, noteContent);
        },function(){
            showToaster('error','ОШИБКА','не удалось отаправить уведомление')
        })



    }
    $scope.orderEditCtrl.deleteCoupon = function(){
        $http({
            method: 'GET',
            url: '/api/deleteCouponFromOrder/'+$scope.orderEditCtrl.order._id
        }).then(function successCallback(data) {
            $scope.orderEditCtrl.order.coupon=null;
            updateOrderField('coupon');
            $scope.orderEditCtrl.coupons=data.data;
        }, function errorCallback(response) {
            showToaster('error','ОШИБКА','не удалось удалить купон')
        });
    }
    $scope.orderEditCtrl.setCoupon=function(){
        //updateOrderField('coupon');
        $http({
            method: 'POST',
            url: '/api/setCouponToOrder',
            data: {
                order:$scope.orderEditCtrl.order._id,
                coupon:$scope.orderEditCtrl.order.coupon._id,
                user:$scope.orderEditCtrl.order.user._id
            }
        }).then(function successCallback() {
            $scope.orderEditCtrl.coupons=null;
        }, function errorCallback(response) {
            showToaster('error','ОШИБКА','не удалось установить купон')
        });

    }


}])/*orders.detailCtrl*/