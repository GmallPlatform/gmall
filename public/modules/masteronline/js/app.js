'use strict';
var _filterTags=[];
var _filterTagsO={}
var myApp= angular.module('gmall', [
        'ngRoute','ui.router','ngResource','ngCookies',
        'ui.bootstrap',
        'ngAnimate',
        'gmall.controllers',
        'gmall.services',
        'gmall.directives',
    'gmall.exception',
    'rzModule',

        'ui.select',
        'dndLists',
        'daterangepicker',
        // 3rd party dependencies
        'btford.socket-io',
        'toaster',
        'satellizer',
        'ngMessages',
    'ui.mask'
        
])

.run(['$rootScope', '$state', '$stateParams','globalSrv','global','socket','$timeout','$window','$location',function ($rootScope,$state,$stateParams,globalSrv,global,socket,$timeout,$window,$location){

    $timeout(function(){
        //console.log('init materaal')
       /* $.material.checkbox = function(selector) {
            // Add fake-checkbox to material checkboxes
            $((selector) ? selector : this.options.checkboxElements)
                .filter(":notmdproc")
                .filter(function(){ //added this filter to skip checkboxes that were already initialized
                    return $(this).parent().find(".check").length === 0;
                })
                .data("mdproc", true)
                .after("<span class=check></span>");
        };*/
        $.material.togglebutton = function(selector) {
            // Add fake-checkbox to material checkboxes
            $((selector) ? selector : this.options.togglebuttonElements)
                .filter(":notmdproc")
                .filter(function(){ //added this filter to skip checkboxes that were already initialized
                    return $(this).parent().find(".toggle").length === 0;
                })
                .data("mdproc", true)
                .after("<span class=toggle></span>");
        };
        $.material.init()},1000)
    $rootScope.moment=moment;

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.global=global;
    $rootScope.soundChat=document.getElementById('soundChat');
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
        if(!global.get('user').val){$state.go('frame');return;}

    })
    //console.log($rootScope.soundChat.currentSrc)
    //$rootScope.soundChat.play();
    //var i=1;
    $rootScope.setDataForSocket=function(seller){
        //console.log(i++)
        if(seller){
            socket.emit('getUser:data',{user:'seller',seller:seller,store:global.get('store').val._id})
        }else{
            var id=global.get('user').val._id||null;
            socket.emit('getUser:data',{user:id,
                seller:global.get('store').val.seller._id,
                store:global.get('store').val._id
            })
        }
        getChatUnReadMessages();
        getNotifications(seller);
    }

    socket.on('connect_failed', function () {
        /* Insert code to reestablish connection. */
        console.log('connect_failed');
    });
    socket.on('disconnected', function () {
        /* Insert code to reestablish connection. */
        console.log('disconnected');
    });
    socket.on('getUser',function(){
        //console.log('on get Data')
        if(!global.get('user').val){return}
        if (global.get('seller').val){
            $rootScope.setDataForSocket(global.get('seller' ).val)
        } else {
            $rootScope.setDataForSocket();
        }
    })
    socket.on('newMessage',function(data){
        var dd = angular.copy(data)
        $rootScope.$broadcast('newChatMessage',dd)
        //console.log(dd)
        try{
            var participant=(global.get('seller').val)?'seller':'user';
            //console.log(participant)
            if(data.recipient!=participant){return}
            data.count=1;
            data.participant=(global.get('seller').val)?data.userName:data.sellerName;
            //console.log(global.get('dialogs' ).val,typeof global.get('dialogs' ).val)
            $rootScope.soundChat.play()
            if(global.get('dialogs').val){
                if(!global.get('dialogs').val.length){
                    global.set('dialogs',[]);
                }
                for(var i=0,l=global.get('dialogs' ).val.length;i<l;i++){
                    if (global.get('dialogs').val[i].dialog==data.dialog){
                        global.get('dialogs').val[i].count++;
                        //console.log(global.get('dialogs').val[i].count)
                        var is=true;
                        break;
                    }
                }
                //console.log(is)
                if(!is){
                    global.get('dialogs').val.push(data)
                }
                //console.log(global.get('dialogs').val)
            }else{
                global.set('dialogs' ,[data])
            }
        }catch(err){
            console.log(err)
        }



    })


    $rootScope.setInitData=function(store,mobile,local){
        //console.log(store)
        global.set('store',store);
        global.set('local',local);
        moment.locale(store.lang)
        if(mobile){global.set('mobile',mobile);}
        var q= {query:JSON.stringify({"actived":"true","dateEnd":{"$gte":'+Date.now()+'}})}
        var q1= {perPage:2,query:JSON.stringify({"actived":true})}
        globalSrv.getData('groups').then(function(response){
            global.set('groups',angular.copy(response.data));
            if(response.data && response.data.length){
                response.data.shift()
            }
            global.set('sections',response.data);
        })
        globalSrv.getData('categories').then(function(response){
            response.data.shift();
            global.set('categories',response.data);
            var o ={}
            response.data.forEach(function(c){
                o[c._id]=c;
            })
            global.set('categoriesO',o);
        })
        globalSrv.getData('filters').then(function(response){
            response.data.shift();
            global.set('filters',response.data);
            globalSrv.getData('filterTags').then(function(response){
                response.data.shift();
                global.set('filterTags',response.data);
                var filterSticker = global.get('filters').val.getObjectFromArray('sticker',true);
                if (filterSticker){
                    global.set('filterTagsSticker',global.get('filterTags').val.getObjectFromArray('filter',filterSticker._id,'array','sticker'));
                }
            })
        })
        globalSrv.getData('brands').then(function(response){
            response.data.shift();
            global.set('brands',response.data);

        })
        globalSrv.getData('campaign',null,q).then(function(response) {
            //console.log(response)
            response.data.shift();
            global.set('campaign',response.data);
        })
        globalSrv.getData('coupons',null,q1).then(function(response) {
            response.data.shift();
            global.set('coupons',response.data);
        })
    }






    function setNotificationsCount(newNote){
        var lastCount=$rootScope.notificationsCount;
        if(!lastCount && lastCount!==0){lastCount=0;}
        $rootScope.notificationsCount=0;
        //console.log(global.get('notifications'))
        for(var type in global.get('notifications').val){
            if (newNote && newNote['type']==type){
                global.get('notifications').val[type]++;
                delete newNote['type']
            }
            $rootScope.notificationsCount+=global.get('notifications').val[type];
        }
        if (newNote && newNote['type']){
            var o = global.get('notifications').val;
            if(o){global.get('notifications').val[newNote['type']]=1;
            }else{
                o={};
                o[newNote['type']]=1;
                global.set('notifications',o);
            }
            $rootScope.notificationsCount++;
        }
        //console.log($rootScope.notificationsCount,lastCount)
        if ($rootScope.notificationsCount && $rootScope.notificationsCount>lastCount){
            $rootScope.soundChat.play();
        }

    }
    var getNotifications = function (seller){
        //console.log(global.get('seller').val)
        var user=(!global.get('seller').val)?global.get('user').val._id:'seller';
        //console.log(user)
        globalSrv.getData('notifications',user,{seller:seller}).then(function(response){
            if (response.data.shift){
                response.data.shift();
            }
            global.set('notifications',response.data);
            setNotificationsCount()
        })
    }


    socket.on('newNotification',function(data){
        //console.log(data)
        setNotificationsCount(data)
    })

    $rootScope.getNotifications=getNotifications;
    function getChatUnReadMessages(){
        //if(!global.get('seller').val){return}
        // получение данных с сервера о непрочитанных сообщения для ордеров и диалогов
        var o={},recipient;
        if(global.get('seller').val){
            o['seller']=global.get('seller').val;
            recipient='seller';
        }else{
            o.user=global.get('user').val._id;
            recipient='user'
        }
        //console.log(recipient,o)
        globalSrv.getData('chatMessages',recipient,o).then(function(response){
            //console.log(response.data)
            global.set('chatMessages',response.data);
            global.set('dialogs',response.data);
            //setChatMessagesCount();
        })
    }
    function getNotificationsCount(){
        
    }

    $rootScope.getTotalUnreadMessage=function(){
        if(!global.get('dialogs')||!global.get('dialogs').val || !global.get('dialogs').val.length){return}
        var count=0;
        global.get('dialogs').val.forEach(function(el){
            count += el.count;
        })
        return count||undefined;
    }
    $rootScope.changeLocation=function(url){
        console.log(url)
        $window.location.href=url;
    }


    var functions={
        changeLocation:_changeLocation,
        logout:_logout,
        logged:_logged
    }
    global.set('functions',functions)
    function _changeLocation(url){
        $window.location.href=url;
    }
    function _logout(){
        $rootScope.$broadcast('logout');
        $auth.logout()
        global.set('user',null)
        socket.emit('getUser:data',{user:null})
    }
    function _logged(){
        var id=(global.get('user').val)?global.get('user').val._id:null;
        $rootScope.$broadcast('logged');
        socket.emit('getUser:data',{
            user:id,
            seller:global.get('store').val.seller._id,
            store:global.get('store').val._id
        })
    }

    var qm = globalSrv.getData('masters').then(function(response){
        response.data.shift();
        var ms=response.data.filter(function(m){return m.actived})
        //console.log(ms)
        global.set('masters',ms);
        return response.data
    })
    global.set('masters',qm);

    var lang,langError,langOrder,langForm,langNote;
    globalSrv.getData('lang').then(function(response){
        var d = {}
        //console.log(response.data[1].tags)
        if(response.data && response.data.length && response.data[1].tags){
            lang=response.data[1].tags;
            for(var k in response.data[1].tags){
                d[k]=response.data[1].tags[k][global.get('store').val.lang]
            }
        }
        global.set('lang',d);
        //console.log(global.get('lang').val);
        //console.log(global.get('langError'))
        //console.log(global.get('store').val,global.get('langError'))
        //return response.data
    })
    globalSrv.getData('langError').then(function(response){
        var d = {}
        //console.log(response.data[1].tags)
        if(response.data && response.data.length && response.data[1].tags){
            langError=response.data[1].tags;
            for(var k in response.data[1].tags){
                d[k]=response.data[1].tags[k][global.get('store').val.lang]
            }
        }
        global.set('langError',d);
        //console.log(global.get('langError'))
        //console.log(global.get('store').val,global.get('langError'))
        //return response.data
    })
    globalSrv.getData('langNote').then(function(response){
        var d = {}
        //console.log(response.data[1].tags)
        if(response.data && response.data.length && response.data[1].tags){
            langNote=response.data[1].tags;
            for(var k in response.data[1].tags){
                d[k]=response.data[1].tags[k][global.get('store').val.lang]
            }
        }
        global.set('langNote',d);
        //console.log(global.get('langNote'))
        //console.log(global.get('store').val,global.get('langNote'))
        //return response.data
    })
    globalSrv.getData('langOrder').then(function(response){
        var d = {}
        //console.log(response.data[1].tags)
        if(response.data && response.data.length && response.data[1].tags){
            langOrder=response.data[1].tags;
            for(var k in response.data[1].tags){
                d[k]=response.data[1].tags[k][global.get('store').val.lang]
            }
        }
        global.set('langOrder',d);
        //console.log(global.get('langOrder'))
    })
    globalSrv.getData('langForm').then(function(response){
        var d = {}
        //console.log(response.data[1].tags)
        if(response.data && response.data.length && response.data[1].tags){
            langForm=response.data[1].tags;
            for(var k in response.data[1].tags){
                d[k]=response.data[1].tags[k][global.get('store').val.lang]
            }
        }
        global.set('langForm',d);
        //console.log(global.get('langForm'))
    })

    $timeout(function () {
        if ($window.ga){
            $window.ga('require', 'ecommerce');
        }
    },2000)


}])

.config(['$stateProvider', '$urlRouterProvider','$locationProvider','globalProvider','$authProvider','$httpProvider',function ($stateProvider,$urlRouterProvider,$locationProvider,globalProvider,$authProvider,$httpProvider){
    $httpProvider.interceptors.push('myInterceptorService');
    $authProvider.baseUrl=userHost;

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    globalProvider.setUrl( {
        groups:'/api/collections/Group/',
        categories:'/api/collections/Category/',
        filters:'/api/collections/Filter/',
        filterTags:'/api/collections/FilterTags/',
        brands : '/api/collections/Brand/',
        campaign:'/api/collections/Campaign',
        coupons:'/api/collections/Coupon',
        notifications:'/api/notificationList',
        chatMessages:'/api/chatMessagesList',
        masters:'/api/collections/Master?query={"actived":true}',
        lang:'/api/collections/Lang?query={"name":"gmall.home"}',
        langError:'/api/collections/Lang?query={"name":"index.error"}',
        langNote:'/api/collections/Lang?query={"name":"index.note"}',
        langOrder:'/api/collections/Lang?query={"name":"index.order"}',
        langForm:'/api/collections/Lang?query={"name":"index.form"}',

    });
    // инициализация глобальных переменных
    globalProvider.set('groups');
    globalProvider.set('sections');
    globalProvider.set('categories');
    globalProvider.set('categoriesO');
    globalProvider.set('filters');
    globalProvider.set('filterTags');
    globalProvider.set('brands');
    globalProvider.set('campaign');
    globalProvider.set('notifications');
    globalProvider.set('chatMessages');
    globalProvider.set('dialogs');
    globalProvider.set('store');
    globalProvider.set('user');
    globalProvider.set('admin');
    globalProvider.set('mobile');
    globalProvider.set('local');

    globalProvider.set('nostore');
    globalProvider.set('filterTagsSticker');
    globalProvider.set('coupons');
    globalProvider.set('sellers');
    globalProvider.set('seller');

    globalProvider.set('functions')
    globalProvider.set('masters')

    globalProvider.set('lang')
    globalProvider.set('langError')
    globalProvider.set('langNote')
    globalProvider.set('langOrder')
    globalProvider.set('langForm')


    $authProvider.baseUrl=userHost;
    $stateProvider
        .state("frame", {
            url: "/masteronline?token",
            controller: 'mainFrameCtrl',
            templateUrl:"modules/masteronline/views/masters.html"
        })
        .state("frame.master", {
            url: "/:id",
            //controller: 'masterCtrl',
            templateUrl:"modules/masteronline/views/index.html"
        })
        .state("frame.master.online", {
            url: "/online",
            template:'<online-booking></online-booking>'
        })
        .state("frame.master.schedule", {
            url: "/schedule",
            template: function($stateParams){
                //console.log($stateParams)
                return '<master-schedule master="'+$stateParams.id+'"></master-schedule>'
            }
        })
        .state("frame.404", {
            url: "/404",
            templateUrl:'modules/order/masteronline/404.html',
            //controller: '404Ctrl'
        })

        /*.state("frame.master.online", {
            url: "/online",
            template:'<online-booking></online-booking>'
        })*/
}])
    .config(function ($provide) {
        function getExpressions (str) {
            var offset = 0,
                parts = [],
                left,
                right;
            while ((left = str.indexOf('{{', offset)) > -1 &&
            (right = str.indexOf('}}', offset)) > -1) {
                parts.push(str.substr(left+2, right-left-2));
                offset = right + 1;
            }

            return parts;
        }

        $provide.decorator('ngSrcDirective', function ($delegate, $parse) {
            // `$delegate` is an array of directives registered as `ngSrc`
            // btw, did you know you can register multiple directives to the same name?

            // the one we want is the first one.
            var ngSrc = $delegate[0];

            ngSrc.compile = function (element, attrs) {
                var expressions = getExpressions(attrs.ngSrc);
                var getters = expressions.map($parse);

                return function(scope, element, attr) {
                    attr.$observe('ngSrc', function(value) {
                        //console.log(stuffHost,value)

                        if (getters.every(function (getter) { return getter(scope); })) {

                            /*if(value && value.indexOf('images/Store/') > -1){
                             attr.$set('src', storeHost+'/'+value);
                             }else*/ if(value &&  value.indexOf('images/') > -1){
                                //console.log(stuffHost+'/'+value)
                                attr.$set('src', photoHost+'/'+value);
                            }else {
                                attr.$set('src',value);
                            }
                        }else{
                            if(value){
                                /*if(value.indexOf('images/Store/') > -1){
                                 attr.$set('src', storeHost+'/'+value);
                                 }else */if(value.indexOf('images/') > -1){
                                    //console.log(stuffHost+'/'+value)
                                    attr.$set('src', photoHost+'/'+value);
                                }else{
                                    attr.$set('src',value);
                                }
                            }
                        }
                    });
                };
            };

            // our compile function above returns a linking function
            // so we can delete this
            delete ngSrc.link;

            return $delegate;
        });
    })
    .filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    })






