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
        'ngMessages'
])



.run(['$rootScope', '$state', '$stateParams','globalSrv','global','$timeout','$window','$location','$templateCache','Helper','$q','$filter',function ($rootScope,$state,$stateParams,globalSrv,global,$timeout,$window,$location,$templateCache,Helper,$q,$filter){
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
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
    })
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
        $timeout(function(){
            if(!global.get('user').val){$state.go('frame');return;}
        },1000)
    })
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
        //global.set('lang',d);
        console.log(global.get('lang').val);
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
        brands : '/api/collections/Brand/',
        lang:'/api/collections/Lang?query={"name":"gmall.home"}',
        langError:'/api/collections/Lang?query={"name":"index.error"}',
        langNote:'/api/collections/Lang?query={"name":"index.note"}',
        langOrder:'/api/collections/Lang?query={"name":"index.order"}',
        langForm:'/api/collections/Lang?query={"name":"index.form"}',
    });
    // инициализация глобальных переменных
    globalProvider.set('groups');
    globalProvider.set('categories');
    globalProvider.set('brands');
    globalProvider.set('store');
    globalProvider.set('user');
    globalProvider.set('mobile');
    globalProvider.set('seller');
    globalProvider.set('functions');
    globalProvider.set('lang')

    globalProvider.set('langError')
    globalProvider.set('langNote')
    globalProvider.set('langOrder')
    globalProvider.set('langForm')




    $stateProvider
        .state("frame", {
            url: "/seo?token",
            controller: 'mainFrameCtrl',
            templateUrl:"modules/seo/views/index.html",
        })
        .state("frame.sitemap", {
            url: "/sitemap",
            template:"<site-map></site-map>",
        })
        .state("frame.seoPages", {
            url: "/seoPages",
            template:"<seopage-list></seopage-list>",
        })
        .state("frame.seoPages.page", {
            url: "/:id",
            template:"<seo-page></seo-page>",
        })
        .state("frame.keywords", {
            url: "/keywords?page",
            template:"<keywords-page></keywords-page>",
        })
        .state("frame.maskStuff", {
            url: "/maskStuff",
            template:"<mask-stuff></mask-stuff>",
        })
        .state("frame.baseSEO", {
            url: "/baseSEO",
            template:"<base-seo></base-seo>",
        })


}])







