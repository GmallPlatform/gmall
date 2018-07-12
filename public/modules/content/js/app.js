'use strict';
var _filterTags=[];
var _filterTagsO={}
function url_slug(s, opt) {
    s = String(s);
    opt = Object(opt);

    var defaults = {
        'delimiter': '-',
        'limit': undefined,
        'lowercase': true,
        'replacements': {},
        'transliterate': (typeof(XRegExp) === 'undefined') ? true : false
    };

    // Merge options
    for (var k in defaults) {
        if (!opt.hasOwnProperty(k)) {
            opt[k] = defaults[k];
        }
    }

    var char_map = {
        // Latin
        'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C',
        'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
        'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ő': 'O',
        'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ű': 'U', 'Ý': 'Y', 'Þ': 'TH',
        'ß': 'ss',
        'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c',
        'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
        'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ő': 'o',
        'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u', 'ý': 'y', 'þ': 'th',
        'ÿ': 'y',

        // Latin symbols
        '©': '(c)',

        // Greek
        'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': '8',
        'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': '3', 'Ο': 'O', 'Π': 'P',
        'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W',
        'Ά': 'A', 'Έ': 'E', 'Ί': 'I', 'Ό': 'O', 'Ύ': 'Y', 'Ή': 'H', 'Ώ': 'W', 'Ϊ': 'I',
        'Ϋ': 'Y',
        'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': '8',
        'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3', 'ο': 'o', 'π': 'p',
        'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'x', 'ψ': 'ps', 'ω': 'w',
        'ά': 'a', 'έ': 'e', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ή': 'h', 'ώ': 'w', 'ς': 's',
        'ϊ': 'i', 'ΰ': 'y', 'ϋ': 'y', 'ΐ': 'i',

        // Turkish
        'Ş': 'S', 'İ': 'I', 'Ç': 'C', 'Ü': 'U', 'Ö': 'O', 'Ğ': 'G',
        'ş': 's', 'ı': 'i', 'ç': 'c', 'ü': 'u', 'ö': 'o', 'ğ': 'g',

        // Russian
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
        'З': 'Z', 'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
        'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C',
        'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
        'Я': 'Ya',
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
        'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
        'я': 'ya',

        // Ukrainian
        'Є': 'Ye', 'І': 'I', 'Ї': 'Yi', 'Ґ': 'G',
        'є': 'ye', 'і': 'i', 'ї': 'yi', 'ґ': 'g',

        // Czech
        'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ů': 'U',
        'Ž': 'Z',
        'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u',
        'ž': 'z',

        // Polish
        'Ą': 'A', 'Ć': 'C', 'Ę': 'e', 'Ł': 'L', 'Ń': 'N', 'Ó': 'o', 'Ś': 'S', 'Ź': 'Z',
        'Ż': 'Z',
        'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z',
        'ż': 'z',

        // Latvian
        'Ā': 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'i', 'Ķ': 'k', 'Ļ': 'L', 'Ņ': 'N',
        'Š': 'S', 'Ū': 'u', 'Ž': 'Z',
        'ā': 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l', 'ņ': 'n',
        'š': 's', 'ū': 'u', 'ž': 'z',
        // addition symbols
        /*'.':'-',
         ',':'-'*/
    };

    // Make custom replacements
    for (var k in opt.replacements) {
        s = s.replace(RegExp(k, 'g'), opt.replacements[k]);
    }

    // Transliterate characters to ASCII
    if (opt.transliterate) {
        for (var k in char_map) {
            s = s.replace(RegExp(k, 'g'), char_map[k]);
        }
    }

    // Replace non-alphanumeric characters with our delimiter
    var alnum = (typeof(XRegExp) === 'undefined') ? RegExp('[^a-z0-9]+', 'ig') : XRegExp('[^\\p{L}\\p{N}]+', 'ig');
    s = s.replace(alnum, opt.delimiter);

    // Remove duplicate delimiters
    s = s.replace(RegExp('[' + opt.delimiter + ']{2,}', 'g'), opt.delimiter);

    // Truncate slug to max. characters
    s = s.substring(0, opt.limit);

    // Remove delimiter from ends
    s = s.replace(RegExp('(^' + opt.delimiter + '|' + opt.delimiter + '$)', 'g'), '');

    return opt.lowercase ? s.toLowerCase() : s;
}

//console.log(url_slug('jjтт лл м,ю   вв.cc'))

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
        'angularCircularNavigation',
        'gmall.exception',
    'angular-intro',
        'satellizer',
        'ngMessages',
        'pageslide-directive',
        'angular-click-outside',
        'rzModule',
    'ui.mask',
    'colorpicker.module',
    'ui.tinymce'
])



.run(['$rootScope', '$state', '$stateParams','globalSrv','global','$timeout','$window','$location','$templateCache','Helper','$q','$order','$filter','$route','Stuff','Filters','FilterTags','Sections','Brands','BrandTags',
    function ($rootScope,$state,$stateParams,globalSrv,global,$timeout,$window,$location,$templateCache,Helper,$q,$order,$filter,$route,Stuff,Filters,FilterTags,Sections,Brands,BrandTags){
        global.set('store',storeTemp);
        //console.log(global.get('store').val)
        //global.set('lang',store.lang);
        if(mobileFromServer){global.set('mobile',mobileFromServer);}
    moment.locale('ru')
    $rootScope.displaySlideMenu=false;
    /*$rootScope.displaySlideMenuFoo=function(){
        if($state.current.name=='frame.stuffs' || $state.current.name=='frame.stuffs.stuff'){
            $rootScope.displaySlideMenu=!$rootScope.displaySlideMenu;
        }else{
            $state.go('frame.stuffs',{groupUrl:'group',categoryUrl:'category'})
        }
    }*/

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

    $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
        //true only for onPopState
        if($rootScope.actualLocation === newLocation) {
            $rootScope.$emit('$stateChangeEndToStuff');
            var back,
                historyState = $window.history.state;
            back = !!(historyState && historyState.position <= $rootScope.stackPosition);
            if (back) {
                //back button
                $rootScope.stackPosition--;
            } else {
                //forward button
                $rootScope.stackPosition++;
            }
        } else {
            //normal-way change of page (via link click)
            if ($route.current) {
                $window.history.replaceState({
                    position: $rootScope.stackPosition
                });
                $rootScope.stackPosition++;
            }
        }

    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
        if(fromState.name=='frame.sections'){
            Sections.reloadItems();
        }
        if(fromState.name=='frame.filters'){
            Filters.reloadItems();
            FilterTags.reloadItems();
            Sections.reloadItems();
        }
        if(fromState.name=='frame.brands'){
            Brands.reloadItems();
            Sections.reloadItems();
        }
        if(fromState.name=='frame.stuffs' && toState.name=='frame.stuffs.stuff'){
            $rootScope.srollPosition=$(window).scrollTop();
        }
        if(fromState.name=='frame.stuffs.stuff' && toState.name=='frame.stuffs'){
            console.log("fromState.name=='frame.stuffs.stuff' && toState.name=='frame.stuffs'")
            $rootScope.$broadcast('fromStuffToStuffs')
        }

        if(toState.name=='frame.stuffs'||toState.name=='frame.stuffs.stuff'){
            $rootScope.$emit('$stateChangeStartToStuff');
        } else{
            $rootScope.endLoadStuffs=true;
        }
        $rootScope.slideMenu=false
    })

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
        $timeout(function(){
            if(!global.get('user').val){$state.go('frame');return;}
        },4000)
        $rootScope.actualLocation = $location.path();
        if(fromState.name=='frame.stuffs.stuff' && toState.name=='frame.stuffs' && ($rootScope.srollPosition||$rootScope.srollPosition==0)){
            $timeout(function(){
                window.scrollTo(0, $rootScope.srollPosition);
            },500)
        }
        if(toState.name=='frame'){
            $q.when()
                .then(function(){
                    return Sections.getSections();
                })
                .then(function(sections){
                    //console.log(sections)
                    $rootScope.sectopnsForMenu=sections;
                })

        }
    })

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
        console.log('start2')
        global.set('store',store);
        //global.set('lang',store.lang);
        if(mobile){global.set('mobile',mobile);}
    }
    $rootScope.changeLang=function(lang){
        global.get('store').val.lang=lang;
        $rootScope.$broadcast('changeLang',lang)
        //console.log(global.get('store').val.lang)
    }

    $rootScope.changeLocation=function(url){
        $window.location.href=url;
    }


    var functions={
        changeLocation:_changeLocation,
        logout:_logout,
        logged:_logged,
        taPaste: _taPaste,
        getSection:_getSection
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
        /*console.log($html)
        console.log($filter('htmlToPlaintextWithBr')($html))*/
        return $filter('htmlToPlaintextWithBr')($html);
    }
    function _getSection(sectionUrl,id) {
        var sections=global.get('groups').val;
        if(!sections) return  null;
        var field=(id)?'_id':'url'
        for(var i=0,l=sections.length;i<l;i++){
            if(sections[i][field] && sections[i][field]==sectionUrl){
                return sections[i];
                break
            }
            if (sections[i].child && sections[i].child.length){
                for(var j=0,ll=sections[i].child.length;j<ll;j++){
                    if(sections[i].child[j][field] && sections[i].child[j][field]==sectionUrl){
                        return sections[i].child[j];
                        break
                    }
                }
            }
        }
        return null;
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
        campaign:'/api/collections/Campaign?query={"dateEnd":"dateEnd"}',
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
    globalProvider.set('sections'); //дубдь
    globalProvider.set('categories');
    globalProvider.set('categoriesO');
    //globalProvider.set('filters');
    globalProvider.set('campaign');
    globalProvider.set('brands');
    globalProvider.set('filters');
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
    globalProvider.set('buff_stuffs'); // для обновления данных в списке после редактирования товара
    globalProvider.set('lang')
    globalProvider.set('langError')
    globalProvider.set('langNote')
    globalProvider.set('langOrder')
    globalProvider.set('langForm')


    /*globalProvider.set('config');
    globalProvider.set('currency');
    globalProvider.set('rate');*/




    $stateProvider
        .state("frame", {
            url: "/content?token",
            controller: 'mainFrameCtrl',
            templateUrl:"modules/content/views/index.html"

        })
        .state("frame.schedule", {
            url: "/schedule",
            template: '<schedule-list></schedule-list>',
        })
        .state("frame.sections", {
            url: "/sections",
            template :'<sections-list></sections-list>'
        })
        .state("frame.sections.category", {
            url: "/:id",
            template:'<category-edit></category-edit>',
        })
        .state("frame.filters", {
            url: "/filters",
            templateUrl: function(){ return 'modules/content/views/filters.html' },
        })
        .state("frame.filters.tag", {
            url: "/:id",
            template:'<filter-tag-edit></filter-tag-edit>',
        })

        .state("frame.stuffs", {
            url: "/stuffs/:groupUrl/:categoryUrl?searchStr&queryTag&brand&brandTag&msg&filters",
            templateUrl: function(){ return 'modules/content/views/stuffs.html'},
            controller:function($scope){
                $scope.rate={val:1};
            }
        })
        .state("frame.stuffs.stuff", {
            url: "/:stuffUrl",
            //template: '<stuff-edit back-state="frame.stuffs"></stuff-edit>',
            template: '<stuff-edit back-state="frame.stuffs"></stuff-edit>',
        })
        .state("frame.brands", {
            url: "/brands",
            templateUrl: function(){ return 'modules/content/views/brands.html' },
        })
        .state("frame.brands.brand", {
            url: "/brand/:id",
            template:'<brand-edit></brand-edit>',
            //templateUrl: function(){ return 'modules/content/views/filters.html' },
        })
        .state("frame.brands.category", {
            url: "/category/:id",
            resolve: {
                field: function() {
                    return 'brands'
                }
            },
            template:'<bind-model-to-category id="{{id}}" field="brands" backstate="frame.brands"></bind-model-to-category>',
            controller:function($scope,$stateParams,field){
                $scope.field=field;
                $scope.id=$stateParams.id;
            }
            //templateUrl: function(){ return 'modules/content/views/filters.html' },
        })
        .state("frame.brands.categoryTag", {
            url: "/categoryTag/:id",
            resolve: {
                field: function() {
                    return 'brandTags'
                }
            },
            template:'<bind-model-to-category id="{{id}}" revers="true" model="BrandTags" field="categories" backstate="frame.brands"></bind-model-to-category>',
            controller:function($scope,$stateParams,field){
                $scope.field=field;
                $scope.id=$stateParams.id;
            }
        })
        .state("frame.brands.tag", {
            url: "/tag/:id",
            resolve: { /* @ngInject */
                item: function(BrandTags,$stateParams) {
                    return;
                    /*return BrandTags.get({id:$stateParams.id}).$promise.then(function(res){
                        return res;
                    })*/
                }
            },
            template:'<brand-tag-edit ></brand-tag-edit>',
        })

        .state("frame.stats", {
            url: "/stats",
            template: '<static-pages></static-pages>',
        })
        .state("frame.stats.stat", {
            url: "/:id",
            template:'<static-page></static-page>',
        })
        .state("frame.additionals", {
            url: "/additionals",
            template: '<additional-pages></additional-pages>',
        })
        .state("frame.additionals.additional", {
            url: "/:id",
            template:'<additional-page></additional-page>',
        })
        .state("frame.homePage", {
            url: "/homePage",
            template: '<home-page></home-page>',
        })

        .state("frame.news", {
            url: "/news",
            template: '<news-list></news-list>',
        })
        .state("frame.news.item", {
            url: "/:id",
            template:'<news-item></news-item>',
        })
        .state("frame.lookbook", {
            url: "/lookbook",
            template: '<lookbook-list></lookbook-list>',
        })
        .state("frame.lookbook.item", {
            url: "/:id",
            template:'<lookbook-item></lookbook-item>',
        })
        .state("frame.master", {
            url: "/master",
            template: '<master-list></master-list>',
        })
        .state("frame.master.item", {
            url: "/:id",
            template:'<master-item></master-item>',
        })
        .state("frame.workplace", {
            url: "/workplace",
            template: '<workplace-list></workplace-list>',
        })
        .state("frame.workplace.item", {
            url: "/:id",
            template:'<workplace-item></workplace-item>',
        })
        .state("frame.groupStuffs", {
            url: "/groupStuffs",
            template: '<group-stuffs-list></group-stuffs-list>',
        })
        .state("frame.groupStuffs.item", {
            url: "/:id",
            template:'<group-stuffs-item></group-stuffs-item>',
        })

        .state("frame.paps", {
            url: "/paps",
            template: '<paps-list></paps-list>',
        })
        .state("frame.paps.item", {
            url: "/:id",
            template:'<paps-item></paps-item>',
        })
        .state("frame.info", {
            url: "/info",
            template: '<info-list></info-list>',
        })
        .state("frame.info.item", {
            url: "/:id",
            template:'<info-item></info-item>',
        })
        .state("frame.cart", {
            url: "/cart",
            template:'<cart-item></cart-item>',
        })
        .state("frame.externalCatalog", {
            url: "/externalCatalog",
            template: '<external-catalog-download></external-catalog-download>',
        })
        .state("frame.help", {
            url: "/help",
            template: '<help-component></help-component>',
        })
        .state("frame.help.category", {
            url: "/:category?store",
            template:'<help-category></help-category>',
        })
        .state("frame.help.category.stuff", {
            url: "/:stuff",
            template:'<help-stuff></help-stuff>',
        })
}])

    .config(function ($provide) {
        //return;
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
                    //console.log(element)
                    attr.$observe('ngSrc', function(value) {
                        //console.log('photoHost',photoHost,value)
                        if (getters.every(function (getter) { return getter(scope); })) {
                            if(value && value.indexOf('images/') > -1&& value.indexOf('http') < 0){
                                if(photoHost){attr.$set('src', photoHost+'/'+value);}else{attr.$set('src',value)}
                            }else{
                                attr.$set('src',value);
                            }
                        }else{
                            if(value && value.indexOf('images/') > -1&& value.indexOf('http') < 0){
                                if(photoHost){attr.$set('src', photoHost+'/'+value);}else{attr.$set('src',value)}
                            }else{
                                attr.$set('src',value);
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


//console.log('photoHost',photoHost)

/*setTimeout(function(){
    var options = {

        /!*componentRestrictions: {country: ["ua",'ru']}*!/
    };
    var inputFrom = document.getElementById('from');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
    console.log(autocompleteFrom)
    console.log(google.maps.event.addListener(autocompleteFrom, 'place_changed', place_changed))
    function place_changed() {
        console.log('dddd')
        var place = autocompleteFrom.getPlace();
        /!*self.user1.fromLat = place.geometry.location.lat();
        self.user1.fromLng = place.geometry.location.lng();
        self.user1.from = place.formatted_address;*!/
    }
},1000)*/






