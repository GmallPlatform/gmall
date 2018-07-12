'use strict';
'use strict';
var myApp= angular.module('gmall', [
        'ngRoute','ui.router','ngResource',
        'ngAnimate',
        'gmall.controllers',
        'gmall.services',
        'gmall.directives',

        'ui.bootstrap',
        'toaster',
        'gmall.exception',

        'satellizer',
        'ngMessages'

    ])



    .run(['$rootScope', '$state', '$stateParams','globalSrv','global','$timeout','$window','$location','$templateCache',function ($rootScope,$state,$stateParams,globalSrv,global,$timeout,$window,$location,$templateCache){
        $rootScope.displaySlideMenu=false;
        $rootScope.displaySlideMenuFoo=function(){
            if($state.current.name=='frame.stuffs' || $state.current.name=='frame.stuffs.stuff'){
                $rootScope.displaySlideMenu=!$rootScope.displaySlideMenu;
            }else{
                $state.go('frame.stuffs',{groupUrl:'group',categoryUrl:'category'})
            }
        }

        $timeout(function(){
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
            if(fromState.name=='frame.stuffs.stuff' && toState.name=='frame.stuffs'){
                //console.log("fomState.name=='frame.stuffs.stuff' && toState.name=='frame.stuffs'")
                //console.log(scrollPos)
                $(window).scrollTop(scrollPos);
            }
        })

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
            $rootScope.$broadcast('logged');
        }


    }])

    .config(['$stateProvider', '$urlRouterProvider','$locationProvider','globalProvider','$authProvider','$httpProvider',function ($stateProvider,$urlRouterProvider,$locationProvider,globalProvider,$authProvider,$httpProvider){
        $httpProvider.interceptors.push('myInterceptorService');
        $authProvider.baseUrl=userHost;

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        
        globalProvider.set('store');
        globalProvider.set('user');
        globalProvider.set('admin');
        globalProvider.set('mobile');
        globalProvider.set('seller');
        globalProvider.set('functions');

        $authProvider.baseUrl=userHost;



        $stateProvider
            .state("frame", {
                url: "/store?token",
                controller: 'mainFrameCtrl',
                templateUrl:"modules/store/views/index.html",
            })
            /*.state("frame.store", {
                url: "/store",
                template:"<store-setting></store-setting>"
            })
            .state("frame.seller", {
                url: "/seller",
                template:"<parent-for-seller></parent-for-seller>"
            })*/
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

                            if(value && value.indexOf('images/Store/') > -1){
                                attr.$set('src', storeHost+'/'+value);
                            }else if(value &&  value.indexOf('images/') > -1){
                                //console.log(stuffHost+'/'+value)
                                attr.$set('src', stuffHost+'/'+value);
                            }else {
                                attr.$set('src',value);
                            }
                        }else{
                            if(value){
                                if(value.indexOf('images/Store/') > -1){
                                    attr.$set('src', storeHost+'/'+value);
                                }else if(value.indexOf('images/') > -1){
                                    //console.log(stuffHost+'/'+value)
                                    attr.$set('src', stuffHost+'/'+value);
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



