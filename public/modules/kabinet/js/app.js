'use strict';
// jquery-play-sound / jquery.playSound.js
//Playing sound notifications using Javascript?
//$.playSound('http://example.org/sound.mp3');
(function($){

    $.extend({
        playSound: function(){
            return $("<embed src='"+arguments[0]+".mp3' hidden='true' autostart='true' loop='false' class='playSound'>" +
                "<audio autoplay='autoplay' style='display:none;' controls='controls'><source src='"+arguments[0]+".mp3' /><source src='"+arguments[0]+".ogg' /></audio>").appendTo('body');
        }
    });

})(jQuery);

var myApp= angular.module('gmall', [
        'ngRoute','ui.router','ngResource','ngCookies',
        'ngAnimate',
        'gmall.controllers',
        'gmall.services',
        'gmall.directives',
        'ui.select',
        'daterangepicker',
        'dndLists',
        // 3rd party dependencies
        'btford.socket-io',
        'toaster',
])



.run(['$rootScope', '$state', '$stateParams','globalSrv','global','socket','$timeout',function ($rootScope,$state,$stateParams,globalSrv,global,socket,$timeout){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.global=global;
    $rootScope.setDataForSocket=function(){
        var id=global.get('user').val._id||null;
        socket.emit('getUser:data',{user:id})
        getNotifications()
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
        $rootScope.setDataForSocket();
    })

    $rootScope.setInitData=function(store,user,admin,mobile){
        if(!user){$window.location.href='/login'}
        //console.log(store,user,admin,mobile);

        global.set('store',store);
        global.set('user',user);
        global.set('admin',admin);
        global.set('mobile',mobile);

        $rootScope.setDataForSocket();


    }

    globalSrv.getData('groups').then(function(response){
        global.set('groups',response.data);
    })
    globalSrv.getData('categories').then(function(response){
                response.data.shift();
                global.set('categories',response.data);
                globalSrv.getData('groups').then(function(response){
                    response.data.shift();
                    global.set('groups',response.data);
                    //console.log(response.data)
                    // установка имен категорий с группой
                    global.get('categories').val.forEach(function(el){
                        //console.log(el.group);
                        /*var g = global.get('groups').val.getObjectFromArray('_id',el.group);
                        //console.log(g)
                        if (g){
                            while(g && g.level && g.parent){
                                g = global.get('groups').val.getObjectFromArray('_id',g.parent);
                                //console.log(g)
                            }
                            //console.log(g.name)
                        }*/
                        el.name = el.name+'/'+ el.group.name
                    })
                })
            })
    globalSrv.getData('filters').then(function(response){
        response.data.shift();
        global.set('filters',response.data);
        globalSrv.getData('filterTags').then(function(response){
            response.data.shift();
            global.set('filterTags',response.data);
            global.set('nostore',
                response.data.getObjectFromArray('type','nostore'));
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
    globalSrv.getData('campaign').then(function(response){
        response.data.shift();
        global.set('campaign',response.data);
    })

    var getNotifications = function (){
        var user=global.get('user').val._id;
        console.log(user)
        globalSrv.getData('notifications',user).then(function(response){
            console.log(response)
            if (response.data.shift){
                response.data.shift();
            }
            global.set('notifications',response.data);
            $rootScope.notificationsCount=0;
            for(var i in response.data){
                $rootScope.notificationsCount+=response.data[i];
            }
        })
    }


    socket.on('newNotification',function(){
        console.log('newNotification');
        getNotifications();
    })


    $rootScope.getNotifications=getNotifications;
    $.material.init()


}])

.config(['$stateProvider', '$urlRouterProvider','$locationProvider','globalProvider',function ($stateProvider,$urlRouterProvider,$locationProvider,globalProvider){
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    globalProvider.setUrl( {
        groups:'/api/collections/Group/',
        categories:'/api/collections/Category/',
        filters:'/api/collections/Filter/',
        filterTags:'/api/collections/FilterTags/',
        brands : '/api/collections/Brand/',
        campaign:'/api/collections/Campaign',
        notifications:'/api/notificationList'
    });
    // инициализация глобальных переменных
    globalProvider.set('groups');
    globalProvider.set('categories');
    globalProvider.set('filters');
    globalProvider.set('filterTags');
    globalProvider.set('brands');
    globalProvider.set('campaign');
    globalProvider.set('notifications');

    globalProvider.set('store');
    globalProvider.set('user');
    globalProvider.set('admin');
    globalProvider.set('mobile');

    globalProvider.set('nostore');
    globalProvider.set('filterTagsSticker');
    globalProvider.set('coupon');





    $urlRouterProvider
        //.when('/','/home')
        .otherwise('/kabinet');
    $stateProvider
        .state("frame", {
            url: "/kabinet",
            abstruct:true,
            template:"<div ui-view></div>",
            controller:['$scope','$state',function($scope,$state){
                $state.go('frame.orders')
            }]
        })
        .state("frame.orders", {
            url: "/orders",
            templateUrl: function(){ return 'modules/order/views/orders.html' },
            controller: 'ordersCtrl'
        })
        .state("frame.orders.detail", {
            url: "/:id",
            templateUrl: function(){ return 'modules/order/views/order.detail.html' },
            controller: 'orders.detailCtrl'
        })
        .state("frame.notification", {
            url: "/notification/:type",
            templateUrl: function(){ return 'views/partials/notification.html' },
            controller: 'notificationCtrl'
        })


}])






