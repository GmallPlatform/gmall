'use strict';
var _filterTags=[];
var _filterTagsO={}
var myApp= angular.module('gmall', [
        'ngRoute','ui.router','ngResource','ngCookies',
        'ngAnimate',
        'gmall.controllers',
        'gmall.services',
        'gmall.directives',
    'gmall.filters',
        'ui.select',
        'ui.bootstrap',
        'dndLists',
        'toaster',
        'gmall.exception',
        'textAngular',
        'satellizer',
        'ngMessages',
    'colorpicker.module',
    'rzModule',
    'ui.mask',

])



.run(['$rootScope', '$state', '$stateParams','globalSrv','global','$timeout','$window','$location','$templateCache','$filter','$auth',function ($rootScope,$state,$stateParams,globalSrv,global,$timeout,$window,$location,$templateCache,$filter,$auth){
    global.set('store',storeTemp);
    global.set('lang',storeTemp.lang);
    if(mobileFromServer){global.set('mobile',mobileFromServer);}
    $rootScope.displaySlideMenu=false;
    $rootScope.displaySlideMenuFoo=function(){
        if($state.current.name=='frame.stuffs' || $state.current.name=='frame.stuffs.stuff'){
            $rootScope.displaySlideMenu=!$rootScope.displaySlideMenu;
        }else{
            $state.go('frame.stuffs',{groupUrl:'group',categoryUrl:'category'})
        }
    }

    $timeout(function(){
        //https://github.com/FezVrasta/bootstrap-material-design/issues/391
        /*$.material.checkbox = function(selector) {
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
        $.material.init()
    });
    $rootScope.moment=moment;
    $rootScope.$state = $state;
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.global=global;
    var scrollPos;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

        if(fromState.name=='frame.stuffs' && toState.name=='frame.stuffs.stuff'){
            //console.log("fomState.name=='frame.stuffs' && toState.name=='frame.stuffs.stuff'")
            scrollPos=$(window).scrollTop();
        }

    })
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
        $timeout(function(){
            if(!global.get('user').val){$state.go('frame');return;}
        },1000)
        if(fromState.name=='frame.stuffs.stuff' && toState.name=='frame.stuffs'){
            //console.log("fomState.name=='frame.stuffs.stuff' && toState.name=='frame.stuffs'")
            //console.log(scrollPos)
            $(window).scrollTop(scrollPos);
        }
    })


    $rootScope.changeLang=function(lang){
        global.get('store').val.lang=lang;
        $rootScope.$broadcast('changeLang',lang)
    }

    $rootScope.changeLocation=function(url){
        console.log(url)
        $window.location.href=url;
    }

    var functions={
        changeLocation:_changeLocation,
        logout:_logout,
        logged:_logged,
        taPaste: _taPaste
    }
    global.set('functions',functions)
    function _changeLocation(url){
        $window.location.href=url;
    }
    function _logout(){
        $rootScope.$broadcast('logout');
        $auth.logout()
        global.set('user',null)
        //socket.emit('getUser:data',{user:null})
        location.reload()
    }
    function _logged(){
        $rootScope.$broadcast('logged');
    }
    function _taPaste($html){
        //console.log($html)
        return $filter('htmlToPlaintext')($html);
    }
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

}])

.config(['$stateProvider', '$urlRouterProvider','$locationProvider','globalProvider','$authProvider','$httpProvider',function ($stateProvider,$urlRouterProvider,$locationProvider,globalProvider,$authProvider,$httpProvider){
    $httpProvider.interceptors.push('myInterceptorService');
    $authProvider.baseUrl=userHost;

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    globalProvider.setUrl( {
        groups:'/api/collections/Group/',
        categories:'/api/collections/Category/',
        //filters:'/api/collections/Filter/',
        //filterTags:'/api/collections/FilterTags/',
        brands : '/api/collections/Brand/',
        campaign:'/api/collections/Campaign',
        notifications:'/api/notificationList',
        chatMessages:'/api/chatMessagesList',
        lang:'/api/collections/Lang?query={"name":"gmall.home"}',
        langError:'/api/collections/Lang?query={"name":"index.error"}',
        langNote:'/api/collections/Lang?query={"name":"index.note"}',
        langOrder:'/api/collections/Lang?query={"name":"index.order"}',
        langForm:'/api/collections/Lang?query={"name":"index.form"}',

    });
    // инициализация глобальных переменных
    globalProvider.set('groups');
    globalProvider.set('categories');
    //globalProvider.set('filters');

    globalProvider.set('brands');
    globalProvider.set('store');
    globalProvider.set('user');
    globalProvider.set('admin');
    globalProvider.set('mobile');
    globalProvider.set('nostore');
    globalProvider.set('filterTagsSticker');
    globalProvider.set('coupon');
    globalProvider.set('sellers');
    globalProvider.set('seller');

    globalProvider.set('functions');
    globalProvider.set('lang')
   
    globalProvider.set('langError')
    globalProvider.set('langNote')
    globalProvider.set('langOrder')
    globalProvider.set('langForm')

    $authProvider.baseUrl=userHost;



    $stateProvider
        .state("frame", {
            url: "/setting?token",
            controller: 'mainFrameCtrl',
            templateUrl:"modules/setting/views/index.html",
        })
        .state("frame.store", {
            url: "/store",
            template:"<store-setting></store-setting>"
        })
        .state("frame.template", {
            url: "/template?block",
            template:"<template-item-from-store></template-item-from-store>"
        })
        .state("frame.customLists", {
            url: "/customLists",
            template:"<custom-lists-list></custom-lists-list>"
        })
        .state("frame.customLists.item", {
            url: "/:id",
            template:"<custom-lists-item></custom-lists-item>"
        })
        .state("frame.seller", {
            url: "/seller",
            template:"<parent-for-seller></parent-for-seller>"
        })
        .state("frame.catalog", {
            url: "/catalog",
            template:"<external-catalog></external-catalog>"
        })
        .state("frame.redirect", {
            url: "/redirect",
            template:"<redirect-list></redirect-list>"
        })
}])

    .config(function ($provide) {
// given `{{x}} y {{z}}` return `['x', 'z']`
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
    });




