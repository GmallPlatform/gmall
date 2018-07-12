'use strict';
var _filterTags=[];
var _filterTagsO={}
var myApp= angular.module('gmall', [
        'ngRoute','ui.router','ngResource','ngCookies',
        'ngAnimate',
        'gmall.controllers',
        'gmall.services',
        'gmall.directives',
        'ui.select',
        'ui.bootstrap',
        'toaster',
        'gmall.exception',
        'textAngular',
        'satellizer',
        'ngMessages',
        'dndLists',
    'colorpicker.module',

])



.run(['$rootScope', '$state', '$stateParams','globalSrv','global','$timeout','$window','$location','$templateCache','$filter',function ($rootScope,$state,$stateParams,globalSrv,global,$timeout,$window,$location,$templateCache,$filter){

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
    $rootScope.$stateParams = $stateParams;
    $rootScope.global=global;
    $rootScope.setInitData=function(store,mobile){
        global.set('store',store);
        if(mobile){global.set('mobile',mobile);}
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
    //$authProvider.baseUrl=userHost;
    
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    globalProvider.set('user');
    globalProvider.set('mobile');
    globalProvider.set('store');
    globalProvider.set('seller');
    globalProvider.set('functions');

    globalProvider.set('lang')
    globalProvider.set('langError')
    globalProvider.set('langNote')
    globalProvider.set('langOrder')
    globalProvider.set('langForm')

    //$authProvider.baseUrl=userHost;


    globalProvider.setUrl( {
        lang:'/api/collections/Lang?query={"name":"gmall.home"}',
        langError:'/api/collections/Lang?query={"name":"index.error"}',
        langNote:'/api/collections/Lang?query={"name":"index.note"}',
        langOrder:'/api/collections/Lang?query={"name":"index.order"}',
        langForm:'/api/collections/Lang?query={"name":"index.form"}',
    });

    $stateProvider
        .state("frame", {
            url: "/admin123?token",
            controller: 'mainFrameCtrl',
            templateUrl:"modules/admin123/views/index.html",
        })
        .state("frame.stores", {
            url: "/stores",
            template:"<stores-list></stores-list>"
        })
        .state("frame.templates", {
            url: "/templates",
            template:"<templates-list></templates-list>"
        })
        .state("frame.templates.template", {
            url: "/:id",
            template:"<template-item></template-item>"
        })
        .state("frame.config", {
            url: "/config",
            template:"<main-config></main-config>"
        })
        .state("frame.configData", {
            url: "/configData",
            template:"<config-data></config-data>"
        })
        .state("frame.temaplateConfig", {
            url: "/temaplateConfig",
            template:"<template-config></template-config>"
        })
        .state("frame.lang", {
            url: "/lang",
            template:"<lang-list></lang-list>"
        })
        .state("frame.lang.item", {
            url: "/:id",
            template:"<lang-item></lang-item>"
        })
        .state("frame.blocksConfig", {
            url: "/blocksConfig",
            template:"<blocks-config></blocks-config>"
        })
}])

    .filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    })





