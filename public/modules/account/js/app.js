
var myApp= angular.module('gmall', [
    'ngRoute','ui.router','ngResource','ngCookies',
    'ui.bootstrap',
    'ngAnimate',
    'gmall.controllers',
    'gmall.services',
    'gmall.directives',
    'ui.select',
    'dndLists',
    'daterangepicker',
    'toaster',
    //'textAngular',
    'gmall.exception',
    'satellizer',
    'ngMessages',
    'pageslide-directive',
    'angular-click-outside',
    'rzModule',
    'ui.mask',
    'colorpicker.module',
    'ui.tinymce'
])


myApp.run(['$rootScope', '$state', '$stateParams','globalSrv','global','$timeout','$window','$location','$templateCache','$q','$filter','$route', function ($rootScope,$state,$stateParams,globalSrv,global,$timeout,$window,$location,$templateCache,$q,$filter,$route) {
    global.set('store', storeTemp);
    if (mobileFromServer) {
        global.set('mobile', mobileFromServer);

    }

    if( typeof unitOfMeasure !='undefined'){
        global.set('unitOfMeasure', unitOfMeasure);
    }
    moment.locale('ru')
    $rootScope.moment=moment;
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.global=global;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
        console.log(toState,toParams)
    })

}])

myApp.config(['$stateProvider', '$urlRouterProvider','$locationProvider','globalProvider','$authProvider','$httpProvider',function ($stateProvider,$urlRouterProvider,$locationProvider,globalProvider,$authProvider,$httpProvider){

    $httpProvider.interceptors.push('myInterceptorService');
    $authProvider.baseUrl=userHost;
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    globalProvider.setUrl( {
        lang:'/api/collections/Lang?query={"name":"gmall.home"}',
        langError:'/api/collections/Lang?query={"name":"index.error"}',
        langNote:'/api/collections/Lang?query={"name":"index.note"}',
        langOrder:'/api/collections/Lang?query={"name":"index.order"}',
        langForm:'/api/collections/Lang?query={"name":"index.form"}',

    });
    // инициализация глобальных переменных
    globalProvider.set('store');
    globalProvider.set('user');
    globalProvider.set('admin');
    globalProvider.set('mobile');
    globalProvider.set('unitOfMeasure');
    globalProvider.set('nostore');
    globalProvider.set('sellers');
    globalProvider.set('seller');
    globalProvider.set('functions');
    globalProvider.set('lang')
    globalProvider.set('langError')
    globalProvider.set('langNote')
    globalProvider.set('langOrder')
    globalProvider.set('langForm')

    /*$urlRouterProvider
        .when('/account/','/account')*/

    $stateProvider
        .state("frame", {
            url: "/bookkeep?token",
            controller: 'mainFrameCtrl',
            templateUrl:"modules/account/views/index.html"
        })
        .state("frame.warehouse", {
            url: "/warehouse",
            template :'<warehouse></warehouse>'
        })
        .state("frame.material", {
            url: "/material",
            template :'<material></material>'
        })
        .state("frame.pns", {
            url: "/pns",
            template :'<pns></pns>'
        })
        .state("frame.pns.pn", {
            url: "/:id",
            template :'<pn></pn>'
        })
        /*.state("frame.acclist.item", {
            url: "/:id",
            template :'<account-item></account-item>'
        })*/

}])
