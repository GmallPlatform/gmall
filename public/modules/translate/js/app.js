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
        //storeTemp.googleTranslateQty=234544;
    if(storeTemp.googleTranslateQty){
        $rootScope.googleTranslateQty=storeTemp.googleTranslateQty;
    }
    global.set('store',storeTemp);
        //console.log(global.get('store').val)
        //global.set('lang',store.lang);
        if(mobileFromServer){global.set('mobile',mobileFromServer);}
    moment.locale('ru')
    $rootScope.displaySlideMenu=false;

    $timeout(function(){
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
        if(toState.name=='frame.translate'){
            $q.when()
                .then(function(){
                    return Sections.getSections();
                })
                .then(function(sections){
                    //console.log(sections)
                    $rootScope.sectopnsForMenu=sections;
                })
            $q.when()
                .then(function(){
                    return Filters.getFilters();
                })
                .then(function(Filters){
                    //console.log(sections)
                    $rootScope.filtersForMenu=Filters;
                })
            $q.when()
                .then(function(){
                    return Brands.getBrands();
                })
                .then(function(items){
                    //console.log(sections)
                    $rootScope.brandsForMenu=items;
                })

        }
        $timeout(function(){
            //console.log(global.get('user').val)
            if(!global.get('user').val){$state.go('frame');return;}
        },4000)
    })

    $rootScope.setInitData=function(store,mobile){
        console.log('start2')
        global.set('store',store);
        //global.set('lang',store.lang);
        if(mobile){global.set('mobile',mobile);}
    }
    $rootScope.changeLocation=function(url){
        $window.location.href=url;
    }


    var functions={
        changeLocation:_changeLocation,
        logout:_logout,
        logged:_logged,
        taPaste: _taPaste,

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
            url: "/translate?token",
            controller: 'mainFrameCtrl',
            templateUrl:"modules/translate/views/index.html"

        })
        .state("frame.translate", {
            url: "/:lang",
            template:"<translate-all></translate-all>"
        })
        .state("frame.translate.hp", {
            url: "/hp",
            template:"<translate-hp></translate-hp>"
        })
        .state("frame.translate.catalog", {
            url: "/catalog",
            template:"<translate-catalog></translate-catalog>"
        })
        .state("frame.translate.brand", {
            url: "/brand",
            template:"<translate-brand data-model='Brand'></translate-brand>"
        })
        .state("frame.translate.filters", {
            url: "/filters",
            template:"<translate-brand data-model='Filters'></translate-brand>"
        })
        .state("frame.translate.filterTags", {
            url: "/filterTags/:filter",
            template:"<translate-filter-tags model='FilterTags'></translate-filter-tags>"
        })
        .state("frame.translate.brandTags", {
            url: "/brandTags/:filter",
            template:"<translate-filter-tags model='BrandTags'></translate-filter-tags>"
        })

        .state("frame.translate.store", {
            url: "/store",
            template:"<translate-store></translate-store>"
        })
        .state("frame.translate.stuffs", {
            url: "/stuffs/:section",
            template:"<translate-stuffs></translate-stuffs>"
        })
        .state("frame.translate.stuffs.stuff", {
            url: "/:id",
            template:"<translate-stuff></translate-stuff>"
        })

        .state("frame.translate.stats", {
            url: "/stat/:type",
            template:"<translate-stat-pages></translate-stat-pages>",
            onEnter: function($rootScope){
                $rootScope.$emit('$stateChangeStartToStuff');
            },
        })
        .state("frame.translate.stats.page", {
            url: "/:id",
            template:"<translate-stat-page></translate-stat-page>"
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
    });







