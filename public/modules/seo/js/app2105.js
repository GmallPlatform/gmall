'use strict';
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
    moment.locale('ru')
    $timeout(function(){
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
    $rootScope.setInitData=function(store,mobile){
        global.set('store',store);
        if(mobile){global.set('mobile',mobile);}
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


}])







