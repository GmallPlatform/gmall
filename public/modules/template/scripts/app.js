angular.module('gmall', ['ngRoute',
    'ui.router','ngResource',
    'gmall.controllers',
    'gmall.services',
    'gmall.directives',
    'gmall.filters',
    'ui.bootstrap',
    'lazyImg',
    "checklist-model",
    'ngSocial',
    'ngAnimate',
    'ngAutocomplete',
    'toaster', // https://github.com/jirikavi/AngularJS-Toaster
    'ui.select',
    'pageslide-directive',
    'btford.socket-io',
    'timer',
    ])
.run(['$rootScope', '$state', '$stateParams','global','globalSrv','$window','$location','$anchorScroll','$timeout','seoContent','$order','socket','Campaign',function ($rootScope,$state,$stateParams,global,globalSrv,$window,$location,$anchorScroll,$timeout,seoContent,$order,socket,Campaign){
    $rootScope.checkedMenu={m:false}
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.global=global;
    global.set('models',{Campaign:Campaign});
    $rootScope.soundChat=document.getElementById('soundChat');
    global.set('country',{country_code:'UA'});
    global.set('currency',"UAH");
    global.set('rate',1);
    $rootScope.titles=global.get('titles');
    $rootScope.$on('$stateChangeStart', function(event, to, toParams, fromState, fromParams){
               //console.log(to,toParams)
        if(to.name=='stuffs'||to.name=='stuffs.stuff'){
            $rootScope.endLoadStuffs=false;
        } else{
            $rootScope.endLoadStuffs=true;
        }
        $rootScope.checkedMenu.m=false;
        //console.log($rootScope.checkedMenu)
                if ((to.name=='page' || to.name=='page.pageDetail')&&(toParams.type!="News" && toParams.type!="Stat")){
                    console.log('нет такоой статики');
                    event.preventDefault();
                    return $state.transitionTo('404');
                }
                

                if ($rootScope.prevState=="undefined"){
                    $rootScope.prevState='none';
                };
                
                if ($rootScope.prevState=='stuff' && 
                    $rootScope.prevStateParam.groupUrl==toParams.groupUrl &&
                    $rootScope.prevStateParam.categoryUrl==toParams.categoryUrl){
                    $rootScope.repeat=fromParams.stuffUrl;
                    //console.log($rootScope.repeat);
                } else if  ($rootScope.prevState=='page' && 
                    $rootScope.prevStateParam.type==toParams.type ){
                    $rootScope.repeat=fromParams.id;
                    //console.log('повтор');
                } else {
                    $rootScope.repeat=false;
                }

                $rootScope.prevState=fromState.name;
                $rootScope.prevStateParam=fromParams;

                var titles;
                if (global.get('config').val && global.get('config').val.titles) {
                    titles = global.get('config').val.titles;
                } else {
                    titles={
                        pageTitle:'Купить модные платья оптом. Одежда больших размеров оптом от украинского производителя Taniana-Lux - платья, юбки, майки, сарафаны, туники, блузы, гольфы.',
                        pageKeyWords:
                        " большие размеры, одежда больших размеров, платья оптом производителя украинского, оптом одежда больших размеров, купить, украина, интернет магазин, опт, оптовый, модная женская одежда больших размеров, женские юбки оптом, " +
                            "женские платья , сарафаны, туники, гольфы, блузы," +
                            " купить, оптом, мода, стиль, россия, казахстан,молдова, фабрика, оптом купить"+
                            'стильная одежда, женская одежда оптом, красивая одежда больших размеров',
                        pageDescription : 'В нашем интернет-магщине Вы можете купить модную и стильную одежду больших размеров от украинского производителя. Благодаря нашему опыту мы знаем все секреты и тонкости стиля. В нашем интернет магазине представлены красивые модные и качественные вещи больших размеров.',
                        namePageFooter:'',
                        pageDescFooter:''
                    }
                }
            titles.canonical='';      
            global.set('titles',titles);
            //console.log(global.get('config'));
          //  console.log(global.get('titles'));

        })

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        //console.log($rootScope.repeat);
        if ($window.ga){
            $window.ga('send', 'pageview', { page: $location.path() });
        }
        $timeout(function(){
                if ($rootScope.repeat){
                    console.log($rootScope.repeat);
                    //$location.hash();
                    
                    $location.hash($rootScope.repeat)
                    $anchorScroll();
                    $rootScope.repeat=false;
                }
            },10)
        if (to.name=='home') {
            seoContent.setDataHomePage();
        }
        /*if(to.name!='stuffs' || to.name!='stuffs.stuff'){
            $rootScope.endLoadStuffs=true;
        }*/
        $rootScope.endLoadStuffs=true;


    });
    $rootScope.$on('$stateChangeError', function(event) {
            console.log(event);
        });
    $rootScope.$on('$allDataLoaded',function(e,data){
        //console.log('$allDataLoaded');
        $rootScope.endLoadStuffs=true;
        //console.log($state.current.name)
            /*if(data.name=='stuffs'){
                seoContent.setDataCatalog(data.data);;
            } else if(data.name=='stuffs.stuff'){
                console.log($rootScope.dataForSeoService)
                $rootScope.objShare=seoContent.setDataStuff(data.data);
            }*/
        });
    globalSrv.getData('campaign').then(function(response){
            response.data.shift();
            global.set('campaign',response.data);
            //console.log(response.data);
            if ($order.type){
                $order.getOrder().setCamapign(response.data)
            }
        })

    socket.on('newMessage',function(data){
        console.log('newMessage')
        $rootScope.$broadcast('newMessage',data)
        data.count=1;
        $rootScope.soundChat.play();
        //setChatMessagesCount(data);

    })

    socket.on('getUser',function(){
        var id=(global.get('user').val)?global.get('user').val._id:null;
        var o={
            user:id,
            seller:global.get('store').val.seller._id,
            store:global.get('store').val._id
        }
        console.log(o)
        socket.emit('getUser:data',o)
    })
    $rootScope.$on('logged',function(){
        var id=(global.get('user').val)?global.get('user').val._id:null;
        socket.emit('getUser:data',{
            user:id,
            seller:global.get('store').val.seller._id,
            store:global.get('store').val._id
        })
    })
    $rootScope.$on('logout',function(){
        socket.emit('getUser:data',{user:null})
    })


}])
.config(['$stateProvider', '$urlRouterProvider','$locationProvider','globalProvider',function ($stateProvider,$urlRouterProvider,$locationProvider,globalProvider){
        //facebookProvider.init ({appId: "1511240965819743"});        
        globalProvider.setUrl( {
             country : '/api/getip/',
             //config : '/api/config/',
             //categories : '/api/collections/Category/',
             //brands : '/api/collections/Brand/',
             user:'/api/users/me/',
             campaign:'/api/collections/Campaign?query={"dateEnd":{"$gte":'+Date.now()+'}}'
            /*filter:'/api/collections/Filter/',
            filterTags:'/api/collections/FilterTags/'*/
        });



        // инициализация глобальных переменных
    globalProvider.set('store');
    globalProvider.set('seller')
        globalProvider.set('user');
        globalProvider.set('config');
        globalProvider.set('country');
        globalProvider.set('currency');
        globalProvider.set('categories');
        globalProvider.set('brands');
        globalProvider.set('titles');
        globalProvider.set('stats');
        globalProvider.set('filters');
        globalProvider.set('filterTags');
        globalProvider.set('rate');
        globalProvider.set('local');
        globalProvider.set('coupon');
        globalProvider.set('discounts');
        globalProvider.set('partners');
        globalProvider.set('saleTag');
        globalProvider.set('newTag');
        globalProvider.set('mainTags');
        globalProvider.set('campaign');
        globalProvider.set('filterTagsSticker');
        globalProvider.set('sections') // категории для журнала
        globalProvider.set('sectionTags') // теги для мтатей жернала
        globalProvider.set('nostore') // тег для товаров отсутствующих в наличие. не выводится в списке
        globalProvider.set('seopage') //
        globalProvider.set('groups')
        globalProvider.set('mobile')
        globalProvider.set('paps')
    globalProvider.set('models')

        $locationProvider.html5Mode(true);

    $locationProvider.hashPrefix('!');
    
    $urlRouterProvider
        .when('/','/home')
        .otherwise('/404');
    $stateProvider
        .state("404", {
            url: "/404",
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/404.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            //templateUrl: function(global){ return 'views/'+global.get('store').val.template.folder+'/partials/404.html' },
            controller: '404Ctrl'
        })
        .state("home", {
            url: "/home",
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/home.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            //templateUrl: function(global){ console.log(global);return 'views/tatiana/partials/home.html' },
            controller: 'homeCtrl',
        })
        .state("signup", {
            url: "/signup?email",
            //templateUrl: function(global){ return 'mobile/views/partials/signup.html' },
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/signup.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            controller: 'signupCtrl',
        })
        .state("login", {
            url: "/login",
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/login.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            //templateUrl: function(global){ return 'mobile/views/partials/login.html' },
            controller: 'loginCtrl'
        })
        .state("campaign", {
            url: "/campaign",
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/campaign.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            //templateUrl: function(global){ return 'mobile/views/partials/campaign.html' },
            controller:'campaignCtrl'
        })
        .state("campaign.detail", {
            url: "/:url",
            resolve: {
                model: function() {
                    return 'Campaign'
                }
            },
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/campaign_detail.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
             /*templateUrl: function(global){
                return 'mobile/views/partials/campaign_detail.html'
            },*/
            controller:'modelInstanceCtrl'
        })
        .state("couponDetail", {
            url: "/coupon/:id",
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/coupon_detail.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            /*templateUrl: function(global){
                return 'mobile/views/partials/coupon_detail.html'
            },*/
            resolve:{
                Model:function(){return 'Coupon'}
            },
            controller:'detailWithIdCtrl'
        })
        .state("thanksPage", {
            url: "/thanks/:url",
            resolve: {
                model: function() {
                    return 'PAP'
                }
            },
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/thanksPage.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            //templateUrl: function(global){ return 'mobile/views/partials/thanksPage.html' },
            controller:'detailCtrl'
        })
        .state("stuffs", {
            url: "/:groupUrl/:categoryName/:categoryUrl?parentGroup&categoryList&searchStr&queryTag&brand&brandTag&msg",
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/stuffs.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            controller: 'stuffsCtrl',
            reloadOnSearch : false
        })
        .state("stuffs.stuff", {
            url: "/:stuffUrl?param1&param2",
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/stuffDetail.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },

        })
        .state('cart', {
            url: '/cart',
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/cart.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            //templateUrl: function(global){ return 'mobile/views/partials/cart.html' },
            controller: 'cartCtrl'
        })
        .state('profile2', {
            url: '/profile2',
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/profile.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            //templateUrl: function(global){ return 'mobile/views/partials/profile.html' },
            controller: 'profileCtrl'
        })

}])


