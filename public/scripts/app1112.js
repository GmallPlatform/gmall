// Замыкание
(function() {
  /**
   * Корректировка округления десятичных дробей.
   *
   * @param {String}  type  Тип корректировки.
   * @param {Number}  value Число.
   * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
   * @returns {Number} Скорректированное значение.
   */
  function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Обратный сдвиг
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Десятичное округление к ближайшему
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Десятичное округление вниз
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Десятичное округление вверх
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();
'use strict';
var globalFunction = globalFunction || {};

var getFactoryPrice = function(){
    return {
        getThis : function(){
            console.log(this);
        }
    }
}


globalFunction.getObjectFromArray= function(arr,prop,value,a,filter){
    //возвращается елемент. если  есть 4 -ый параметр то возвращается массив
    // если есть пятый параметр то в массив пишется тот елемент исходного массива у котороко совйство filter true.
    var ar=[];
    for (var i=0,l=arr.length;i<l;i++){
        if (arr[i][prop] && arr[i][prop]==value){
            if (a){
                if (filter){
                    if (arr[i][filter]){
                        ar.push(arr[i]) 
                    } 
                }else {
                   ar.push(arr[i]) 
                }
                
            } else {
                return arr[i];
                break;
            }
            
        }
    } 
    
    if (a) {return ar;} else  {return undefined};
}
globalFunction.replaceBlanks = function(name){
            if (!name) return;
            var s= name.replace(/\//g,'-')
            s.split("/").join('-')
            return s.split(" ").join('-')
}
String.prototype.replaceBlanks = function(){
            if (!this) return;
            return this.replace(/(["',.\/\s])/g, "-");
}

Array.prototype.getObjectFromArray=function(prop,value,a,filter){
    //возвращается елемент. если  есть 4 -ый параметр то возвращается массив
    // если есть пятый параметр то в массив пишется тот елемент исходного массива у котороко совйство filter true.
    var ar=[];
    for (var i=0,l=this.length;i<l;i++){
        if (this[i][prop] && this[i][prop]==value){
            if (a){
                if (filter){
                    if (this[i][filter]){
                        ar.push(this[i]) 
                    } 
                }else {
                   ar.push(this[i]) 
                }
                
            } else {
                return this[i];
                break;
            }
            
        }
    } 
    
    if (a) {return ar;} else  {return undefined};
}
// get array of objects by condition / if value is in array's property of this object
Array.prototype.getArrayObjects = function(prop,value){
    //console.log(prop,value)
    var arr=[];
    for (var i=0,l=this.length;i<l;i++){
        if (this[i][prop] && this[i][prop].length){
            var _arr = this[i][prop].map(function(item){return (typeof item=='object')?item._id:item})
            if (_arr.indexOf(value)>-1){
                arr.push(this[i]);                
            }
        }
    } 
    return arr;
}

String.prototype.clearTag = function(num){
    var regex=/<\/?[^>]+(>|$)/g;
    if (num){
        return (this.replace(regex, '').substring(0,num)+'...')
    } else {
        return this.replace(regex, '')
    }
}
String.prototype.getFormatedDate=function(){
    var d=new Date(this);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    return   curr_date+ "-" + curr_month+ "-" +curr_year
}



angular.module('gmall', ['ngRoute',
    'ui.router','ngResource','gmall.controllers',
    'gmall.services',
    'gmall.directives',
    'gmall.filters',
    'ui.bootstrap',
    'lazyImg',
    "checklist-model",
    'ngSocial',
    'ngAnimate',
    'ngAutocomplete',
    'i.mongoPaginate',
    'toaster', // https://github.com/jirikavi/AngularJS-Toaster
    'ui.select',
    'pageslide-directive',
    'angular-intro',
    'dndLists'

        /*'ngAutocomplete',
        'checklist-model',
        'i.mongoPaginate',
    'ngSocial',
    */])



.run(['$rootScope', '$state', '$stateParams','global','globalSrv','$window','$location','$anchorScroll','$timeout','seoContent','$order',function ($rootScope,$state,$stateParams,global,globalSrv,$window,$location,$anchorScroll,$timeout,seoContent,$order){

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.global=global;
    global.set('country',{country_code:'UA'});
    global.set('currency',"UAH");
    global.set('rate',1);
    $rootScope.titles=global.get('titles');
    $rootScope.$on('$stateChangeStart', function(event, to, toParams, fromState, fromParams){
               //console.log(to,toParams)
        $rootScope.checkedMenu=false;
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
            if (to.name=='home'){
                seoContent.setDataHomePage();
            }
            //console.log(to.name);
            //********* start titles
            //console.log('to.name-',to.name)
            // установка SEO data
            /*$timeout(function(){
                if (to.name=='home'){
                    seoContent.setDataHomePage();
                } else if(to.name=='stuff'){
                    seoContent.setDataCatalog($rootScope.dataForSeoService);;
                } else if(to.name=='stuff.stuffDetail'){
                    console.log($rootScope.dataForSeoService)
                    $rootScope.objShare=seoContent.setDataStuff($rootScope.dataForSeoService);
                }
            },200)*/

            /*if (to.name=='home'){
                seoContent.setDataHomePage();
            } else if(to.name=='stuff'){
                seoContent.setDataCatalog($rootScope.dataForSeoService);;
            } else if(to.name=='stuff.stuffDetail'){
                console.log($rootScope.dataForSeoService)
                $rootScope.objShare=seoContent.setDataStuff($rootScope.dataForSeoService);
            }*/

            //********* end titles
        });
    $rootScope.$on('$stateChangeError', function(event) {
            console.log(event);
        });
    $rootScope.$on('$allDataLoaded',function(e,data){
            if(data.name=='stuff'){
                seoContent.setDataCatalog(data.data);;
            } else if(data.name=='stuff.stuffDetail'){
                console.log($rootScope.dataForSeoService)
                $rootScope.objShare=seoContent.setDataStuff(data.data);
            }
        });
    globalSrv.getData('campaign').then(function(response){
            response.data.shift();
            global.set('campaign',response.data);
            //console.log($order);
            if ($order.type){
                $order.getOrder().setCamapign(response.data)
            }
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
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/campaign_detail.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
             /*templateUrl: function(global){
                return 'mobile/views/partials/campaign_detail.html'
            },*/
            controller:'campaignDetailCtrl'
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
        .state("page", {
            url: "/page/:type",
            templateProvider: function(global,$http,$stateParam) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/page_'+$stateParams.type+'.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            //templateUrl: function(global){ return 'mobile/views/partials/page_'+$stateParams.type+'.html' },
            controller:'pageCtrl'
        })
        .state("page.pageDetail", {
            url: "/:id",
            templateProvider: function(global,$http,$stateParam) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/page_detail_'+$stateParams.type+'.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            /* templateUrl: function(global){
                return 'mobile/views/partials/page_detail_'+$stateParams.type+'.html'
            },*/
            controller:'pageDetailCtrl'
        })
        .state("stuff", {
            url: "/:groupUrl/:categoryName/:categoryUrl?parentGroup&searchStr&queryTag&brand&brandTag&msg",
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/stuff.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            //templateUrl: function(global){ return 'mobile/views/partials/stuff.html' },
            controller: 'stuffCtrl',
            reloadOnSearch : false
        })
        .state("stuff.stuffDetail", {
            url: "/:stuffUrl?param1&param2",
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/stuffDetail.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
           // templateUrl: function(global){ return 'mobile/views/partials/stuffDetail.html' },
            controller: 'stuffDetailCtrl'
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
        .state('profile', {
            url: '/profile',
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/profile.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            //templateUrl: function(global){ return 'mobile/views/partials/profile.html' },
            controller: 'profileCtrl'
        })
        .state("orders", {
            url: "/orders",
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/orders.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            //templateUrl: function(global){ return 'mobile/views/partials/customorder.html' },
            controller:'ordersCtrl',
            onEnter: ['global','$state',function (global,$state) {
                    if (!global.get('user').val){
                        $state.go('login');
                    }
            }]

        })
        .state("orders.detail", {
            url: "/:id",
            templateProvider: function(global,$http){
                var url = 'views/'+global.get('store').val.template.folder+'/partials/order.detail.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
            },
            //templateUrl: function(global){ return 'mobile/views/partials/customorder.html' },
            controller:'orders.detailCtrl',
            onEnter: ['global','$state',function (global,$state) {
                if (!global.get('user').val){
                    $state.go('login');
                }
            }]

        })

}])


