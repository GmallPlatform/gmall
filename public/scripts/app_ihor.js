angular.module('dip', ['ngRoute',
    'ui.router',
    'ui.router.state.events',
    'ngResource',
    /*'dip.controllers',
    'dip.services',
    'dip.directives',
    'dip.filters',*/
    'ui.bootstrap',
    'ngTouch',
    'ngAnimate',
    'dip.exception',
    'ui.select',
    'satellizer',
        'ngMessages',
])

.run(['$rootScope', '$state', '$stateParams',,function ($rootScope,$state,$stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeStart', function(event, to, toParams, fromState, fromParams){

    })
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {

    });
    $rootScope.$on('$stateChangeError', function(event,toState, toParams, fromState, fromParams, error) {
           console.log(error);
        });




}])
.config(['$stateProvider', '$urlRouterProvider','$locationProvider',function ($stateProvider,$urlRouterProvider,$locationProvider,){
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $urlRouterProvider
        .when('/home','/')
        .otherwise('/404');
    $stateProvider
        .state("404", {
            url: "/404",
            templateUrl:'views/template/partials/404.html',
            controller: '404Ctrl'
        })
        .state("home", {
            url: "/?token&action",
            controller: 'homeCtrl',
        })
        .state('cart', {
            url: '/cart',
            template:'<cart-item></cart-item>',
        })
        .state('cabinet', {
            url: '/cabinet?sec',
            template:'<cabinet-item></cabinet-item>',
        })

        .state('search', {
            url: '/search?searchStr',
            template:'<search-list></search-list>',
        })
        // price component
        .state("pricegoods", {
            url: "/pricegoods",
            template:"<price-goods></price-goods>"
        })
        .state("priceservices", {
            url: "/priceservices",
            template:"<price-services></price-services>"
        })



        /*.state("subscription", {
            url: "/subscription",
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/subscription.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
         if(store.ipstack)
         script(src='http://api.ipstack.com/check?access_key='+store.ipstack+"&callback=getDataFromIp")
            },
        })*/
        .state("unsubscription", {
            url: "/unsubscribe-done",
            templateUrl:'views/template/partials/unsubscription.html',
            controller:'unsubscriptionCtrl'
        })
        .state("thanksPage", {
            url: "/thanks/:id",
            template:"<paps-item-template></paps-item-template>"
        })


        .state("lookbook", {
            url: "/lookbook",
            template:"<items-list></items-list>"
        })

        .state("stat", {
            url: "/stat",
            template:'<items-list></items-list>'
        })
        .state("stat.item", {
            url: "/:id",
            template:'<items-detail></items-detail>'
        })
        .state("additional", {
            url: "/additional",
            template:'<items-list></items-list>'
        })
        .state("additional.item", {
            url: "/:id",
            template:'<items-detail></items-detail>'
        })
        .state("news", {
            url: "/news",
            template: '<items-list></items-list>',
        })
        .state("news.item", {
            url: "/:id",
            template: "<items-detail></items-detail>",
        })
        .state("master", {
            url: "/master",
            template: '<items-list></items-list>',
        })
        .state("master.item", {
            url: "/:id",
            template: "<items-detail></items-detail>",
        })
        .state("workplace", {
            url: "/workplace",
            template: '<items-list></items-list>',
        })
        .state("workplace.item", {
            url: "/:id",
            template: "<items-detail></items-detail>",
        })
        .state("info", {
            url: "/info",
            template: '<items-list></items-list>',
        })
        .state("info.item", {
            url: "/:id?block",
            reloadOnSearch : false,
            template: '<items-detail></items-detail>',
        })
        .state("campaign", {
            url: "/campaign",
            //abstract:true,
            template:'<items-list></items-list>'
        })
        .state("campaign.detail", {
            url: "/:id",
            template:'<items-detail></items-detail>'
            //template:'<campaign-item-template></campaign-item-template>'
        })
        .state("stuffs", {
            templateUrl: function(){ return 'views/template/partials/stuffs/stuffsNew.html' },
            url: "/:groupUrl/:categoryUrl?searchStr&queryTag&brand&brandTag&filterTag",
            reloadOnSearch : true,
        })
        .state("stuffs.stuff", {
            url: "/:stuffUrl?param1&param2&store",
            templateUrl:'views/template/partials/stuffs/stuffDetail.html',

        })

}])




