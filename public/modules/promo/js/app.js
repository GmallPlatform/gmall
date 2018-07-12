'use strict';
var _filterTags=[];
var _filterTagsO={}
var myApp= angular.module('gmall', [
        'ngRoute','ui.router','ngResource','ngCookies',

    'ngAnimate',
        'ngSanitize',
    'ui.bootstrap',

        'gmall.controllers',
        'gmall.services',
        'gmall.directives',
        'gmall.filters',
        'ui.select',
        'dndLists',
        'daterangepicker',
        // 3rd party dependencies
        //'btford.socket-io',
        'toaster',
        'textAngular',
        'gmall.exception',
    'angular-intro',
        'satellizer',
        'ngMessages',
    'ui.mask',
    'colorpicker.module',

    'btford.socket-io',
    'ui.tinymce'
    //'angular-loading-bar'
])




.run(['$rootScope', '$state', '$stateParams','globalSrv','global','$timeout','$window','$location','$templateCache','Helper','$q','$filter','socket',function ($rootScope,$state,$stateParams,globalSrv,global,$timeout,$window,$location,$templateCache,Helper,$q,$filter,socket){
    //console.log(socket)
    global.set('store',storeTemp);
    global.set('lang',storeTemp.lang);
    if(mobileFromServer){global.set('mobile',mobileFromServer);}
    moment.locale('ru')
    $timeout(function(){
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
        scrollPos=$(window).scrollTop();
    })
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
        $timeout(function(){
            if(!global.get('user').val){$state.go('frame');return;}
        },1000)

    })

    /*$rootScope.$on('$viewContentLoaded', function() {
        $templateCache.removeAll();
    });*/
    $rootScope.getHelp=function(){
        return Helper.getHelp($state.current.name)
    }
    $rootScope.getIntro=function(){
        var intro = introJs();
        console.log($rootScope.IntroOptions.steps)
        intro.setOptions({
            steps: $rootScope.IntroOptions.steps

                /*[{
                    intro: "Hello world!"
                },
                {
                    element: document.querySelector('#topMenu'),
                    intro: "This is a tooltip."
                },
                {
                    element: document.querySelectorAll('#step6')[0],
                    intro: "Ok, wasn't that fun?",
                    position: 'right'
                },
                {
                    element: '#step3',
                    intro: 'More features, more fun.',
                    position: 'left'
                },
                {
                    element: '#step4',
                    intro: "Another step.",
                    position: 'bottom'
                },
                {
                    element: '#step5',
                    intro: 'Get it, use it.'
                }
            ]*/
        });
        $timeout(function(){
            intro.start();
        },300)

    }
    $rootScope.changeLang=function(lang){
        global.get('store').val.lang=lang;
        $rootScope.$broadcast('changeLang',lang)
    }
    $rootScope.changeLocation=function(url){
        //console.log(url)
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
        socket.emit('getUser:data',{user:null})
    }
    function _logged(){
        $rootScope.$broadcast('logged');
    }
    function _taPaste($html){
        //console.log($html)
        return $filter('htmlToPlaintext')($html);
    }

    $rootScope.$on('logged',function(){
        //console.log('logged')
        socket.emit('userConnect',{user:global.get('user').val._id})
    });
    /*socket.on('userslistCreating',function(data){
        console.log(data)
    })*/

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
        //console.log(global.get('langForm').val);
    })





}])

.config(function ($provide) {
    $provide.decorator("$q",['$delegate', function ($delegate) {
        //console.log($q)
        function whenFn() {
            $q.when(typeof obj === "function" ? obj() : obj);
        }
        $delegate.whenFn = whenFn;
        return $delegate;
    }]);
    $provide.decorator("$resource",['$delegate', function ($delegate) {
        $delegate.updateFiled = function(){
            console.log(this)
        };
        return $delegate;
    }]);
})
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
    globalProvider.set('lang');
    globalProvider.set('langError')
    globalProvider.set('langNote')
    globalProvider.set('langOrder')
    globalProvider.set('langForm')




    $stateProvider
        .state("frame", {
            url: "/promo?token",
            controller: 'mainFrameCtrl',

            templateUrl:"modules/promo/views/index.html",
            //controller:'mainFrameCtrl'
        })
        .state("frame.campaigns", {
            url: "/campaigns",
            template :'<campaign-list></campaign-list>'
        })
        .state("frame.campaigns.campaign", {
            url: "/:id",
            template:'<campaign-item></campaign-item>',
        })
        .state("frame.coupons", {
            url: "/coupons",
            template :'<coupons-list></coupons-list>'
        })
        .state("frame.news", {
            url: "/news",
            template: '<news-list></news-list>',
        })
        .state("frame.users", {
            url: "/users",
            template :'<users-list></users-list>'
        })
        .state("frame.subscribersList", {
            url: "/subscribersList",
            template :'<subscibtion-list></subscibtion-list>'
        })

        .state("frame.news.item", {
            url: "/:id",
            template:'<news-item></news-item>',
        })
        .state("frame.witget", {
            url: "/witget",
            template: '<witget-list></witget-list>',
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
    })

/*
myApp.decorator("$xhrFactory", [
    "$delegate", "$injector",
    function($delegate, $injector) {
        return function(method, url) {
            var xhr = $delegate(method, url);
            var $http = $injector.get("$http");
            var callConfig = $http.pendingRequests[$http.pendingRequests.length - 1];
            if (angular.isFunction(callConfig.onProgress))
                xhr.addEventListener("progress", callConfig.onProgress);
            return xhr;
        };
    }
])
*/


/*
  ul(class="dropdown-menu",style="color:#666")
li
a(href="") 1
li
a(href="") 2*/




