/*if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position)
        $.getJSON('http://ws.geonames.org/countryCode', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            type: 'JSON'
        }, function(result) {
            console.log('Country: ' + result.countryName + '\n' + 'Code: ' + result.countryCode);
            $('#newURL').attr('href','https://www.google.com&jobid='+result.countryCode);
        });
    });
}*/


/*if (window.Worker) {


    var myWorker = new Worker("scripts/worker.js");
    console.log(myWorker)
}*/

/*UA-106626597-1*/


Number.isInteger = Number.isInteger || function(value) {
        return typeof value === 'number' &&
            isFinite(value) &&
            Math.floor(value) === value;
 };

/*function getDataFromIp2(data) {
    console.log(data)
    console.log(angular)
}*/

// ipstack http://api.ipstack.com/46.200.228.18?access_key=96b8e490d1ca4838c950dbe1d08d79cc&format=1
//getDataFromIp(kdkdk)



//console.log(Number.isInteger)
setMetaOG()
var preloadPade = document.getElementById('preloadPage')
//console.log(preloadPade)
var durationTemp=2;
try{
    if(preloadDuration){
        preloadDuration=Number(preloadDuration)
        if(preloadDuration>1 && preloadDuration<10){
            durationTemp=preloadDuration
        }
    }
}catch(err){}

var preloadAnimateClass='hidden-preload-page';
if($(preloadPade).data('preloadAnimateClass')){
    preloadAnimateClass=$(preloadPade).data('preloadAnimateClass')
}
//console.log(durationTemp)
var k = getCookie('preload')
//console.log("getCookie preload",k)
if(k){
    $(preloadPade).remove()
}else{
    setTimeout(function () {
        //$(preloadPade).slideUp()
        $(preloadPade).addClass(preloadAnimateClass)
        setTimeout(function () {
            $(preloadPade).remove()
        },1000)
    },durationTemp*1000)
    var options ={
        path:'/',
        expires:3600
    }
    setCookie('preload', 'true', options)
}







$('#hidePreloadPage').click(function () {
    $(preloadPade).addClass(preloadAnimateClass)
    setTimeout(function () {
        $(preloadPade).remove()
    },1000)
})



/*var a=342.23
var b=17;
 var c = Math.ceil10(a-(a/100*17),-2)
console.log(c)*/
//console.log(topPage)
var iPhone=false;
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if(userAgent.match( /iPhone/i )) {
        iPhone=true;
    } else if( userAgent.match( /iPad/i )) {
        return 'iOS';
    } else if( userAgent.match( /Android/i ) ) {
        return 'Android';
    } else {
        return 'unknown';
    }
}
getMobileOperatingSystem();

// классы для создания запроса для получения списка товаров
//console.log(DesignQuery)
var sectionClass;
var dQ;
// получение тегов
var _filterTags=[];
var _filterTagsO={}
//console.log(filters)
//console.log(filtersFromServer)
var _filtersO={}
filtersFromServer.forEach(function(filter){
    _filtersO[(filter)._id]=(filter);
    if(filter.tags && filter.tags.length){
        filter.tags.forEach(function (t,i) {
            t.index=i;
            _filterTagsO[t._id]=t
        })
        _filterTags.push.apply(_filterTags,filter.tags)
    }
})

angular.module('gmall', ['ngRoute',
    'ui.router',
    'ui.router.state.events',
    'ngResource','gmall.controllers',
    'gmall.services',
    'gmall.directives',
    'gmall.filters',
    'ui.bootstrap',
    'ngTouch',
    'lazyImg',
    //"checklist-model",
    'ngSocial',
    'ngAnimate',
    //'ngAutocomplete',
    'gmall.exception',
    'toaster', // https://github.com/jirikavi/AngularJS-Toaster
    'ui.select',
    'pageslide-directive',
    'btford.socket-io',
    //'timer',
        'satellizer',
        'ngMessages',
        'angular-click-outside',
    'ui.mask',
    'vcRecaptcha',

    'rzModule',
    //'ksSwiper'
        //'moment-picker',

    //'i-comments'
])

.run(['$rootScope', '$state', '$stateParams','global','globalSrv','$window','$location','$anchorScroll','$timeout','seoContent','$order','socket','Campaign','$user','Witget','$auth','Account','Sections','$q','Seopage','$uibModal','Stuff','$injector','$route','$document','$transitions','$sce','$email','exception','$http','$notification','CreateContent',function ($rootScope,$state,$stateParams,global,globalSrv,$window,$location,$anchorScroll,$timeout,seoContent,$order,socket,Campaign,$user,Witget,$auth,Account,Sections,$q,Seopage,$uibModal,Stuff,$injector,$route,$document,$transitions,$sce,$email,exception,$http,$notification,CreateContent){

    $rootScope.getDataFromIp=function (data) {
        console.log(data)
    }

    //myWorker.postMessage([22]);
    global.set('filterTags',_filterTags)
    global.set('filterTagsO',_filterTagsO)
    //console.log('sections-',global.get('sections'));

        //reCAPTCHA.setPublicKey('6LfW0gcUAAAAAPBl-LPkiKPpF2E84zUPTzg8WEKl');
    $(this).scrollTop(0);
    $rootScope.checkedMenu={m:false,slideMenu:false}
    $rootScope.stuffHost=stuffHost;
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.global=global;
    $rootScope.soundChat=document.getElementById('soundChat');

    $rootScope.globalProperty={entryStuff:null,displaySearch:false};
    function getPromise(q){
        return $q.when()

        $q(function(resolve,reject){

        })
    }
    $rootScope.ignoreClick = function($event) {
        if ($event) {
            $event.stopPropagation();
            $event.preventDefault();
        }
    }

   // var i=0;
    /* отслеживание кнопки назад в браузере*/
    //How to detect browser back button click event using angular?
    //http://stackoverflow.com/questions/15813850/how-to-detect-browser-back-button-click-event-using-angular

    /*
    * For anybody (like me) who doesn't understand how it works:
     * When url changing in usual way (not using back/forward button),
     * then $locationChangeSuccess event firing after $watch callback.
     * But when url changing using back/forward button or history.back() api,
     * then $locationChangeSuccess event firing before $watch callback.
     * So when watch callback firing actualLocation is already equals to newLocation.
    * It is just how angular works internally and this solution just uses this internal behaviour. */



    $rootScope.$watch(function () {return $location.url()}, function (newLocation, oldLocation) {
        //true only for onPopState
        //console.log($rootScope.actualLocation,newLocation)
        if($rootScope.actualLocation === newLocation) {
            //console.log('dd')
            //$rootScope.$emit('$stateChangeEndToStuff');
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

    $transitions.onBefore({ to: '*', from: '*' }, function(trans) {
        /*var substate = trans.to().defaultSubstate;
        return trans.router.stateService.target(substate);*/
        //console.log(trans)
    });

    var firstStateChenged;
    $rootScope.$on('$stateChangeStart', function(event, to, toParams, fromState, fromParams){
        //console.log('????')
        $rootScope.globalProperty.displaySearch=false;
        if(fromState.name=='master.item' && to.name=='master.item' ){return}

        if(!firstStateChenged){
            firstStateChenged=true;
            global.set('tempContent',templateContentHTML)
        }
        if(to.name=='cart' && global.get('store').val.cartSetting && global.get('store').val.cartSetting.slide){
            _openChatWitget('cart')
            $rootScope.$emit('cartslide',{event:'init'})
            event.preventDefault();
        }
        if(to.name=='stuffs'||to.name=='stuffs.stuff'){
            var groups = global.get('sections').val,
                sec={type:'good'};
            loop1 : for(var i=0;i<groups.length;i++){
                if(groups[i].url==toParams.groupUrl){
                    sec=groups[i];
                    break;
                }
                if(groups[i].child && groups[i].child.length){
                    for(var j=0;j<groups[i].child.length;j++){
                        if(groups[i].child[j].url==toParams.groupUrl){
                            sec=groups[i].child[j];
                            break loop1;
                        }
                    }
                }
            }
            /*console.log('sec',sec)
            console.log(groups,toParams.groupUrl)*/
            global.set('sectionType',sec.type);
            //console.log(global.get('sectionType'))
            /*Stuff.set*/
            //console.log(fromState.name!='stuffs.stuff' && !global.get('tempContent').val )
            if(fromState.name!='stuffs.stuff' && !global.get('tempContent').val ){
                $rootScope.$emit('$stateChangeStartToStuff');
            }
        }
        /*if(fromState.name=='stuffs' && to.name=='stuffs.stuff'){
            $rootScope.srollPosition=$(window).scrollTop();
        }*/
        if($rootScope.checkedMenu.slideMenu){
            $rootScope.checkedMenuChange('slideMenu',false)
        }
        /*if(to.name=='stuffs.stuff'&& fromState.name=='stuffs' && fromParams.categoryUrl=='category' && toParams.categoryUrl!='category'){
            event.preventDefault();

            var o = angular.copy(toParams)
            o.categoryUrl='category'
            console.log(o)
            $state.go('stuffs.stuff',o)
        }
*/


        $rootScope.checkedMenu.m=false;
        if(!global.get('tempContent').val){
            if(to.name=='news.item'||to.name=='master.item' || to.name=='campaign.detail'){
                $rootScope.$emit('$stateChangeStartToStuff');
            }
            if(to.name=='news'  && fromState.name!='news.item' ){
                $rootScope.$emit('$stateChangeStartToStuff');
            }
            if(to.name=='master' && fromState.name!='master.item' ){
                $rootScope.$emit('$stateChangeStartToStuff');
            }
            if(to.name=='info' && fromState.name!='info.item' ){
                $rootScope.$emit('$stateChangeStartToStuff');
            }
        }
        if(fromState.name=='news' && to.name=='news.item'){
            scrollPositionNewsList=$(window).scrollTop();
        }else if(fromState.name!='news.item' && to.name!='news'){
            scrollPositionNewsList=0;

        }

    })
    var scrollPositionNewsList=0;
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        if(from.name=='news.item' && to.name=='news' && scrollPositionNewsList){
            $timeout(function(){
                window.scrollTo(0, scrollPositionNewsList);
            })
        }
        $rootScope.actualLocation = $location.url();

        // ***************** seo block ************************
        var url = $location.url();
        var titles = angular.copy(global.get('store' ).val.seo);
        //console.log(JSON.stringify(titles))
        titles.image=global.get('store').val.logo;
        if(global.get('store').val.logo.fbPhoto){
            titles.image=global.get('store').val.fbPhoto;
        }
        if(titles.image){
            titles.image=photoHost+'/'+titles.image;
        }
        titles.url=$location.url()


        //titles.url = url;
        /*try{
         titles.canonical= $sce.trustAsResourceUrl(titles.url);
         }catch(err){console.log(err)}*/
        titles.desc=null
        global.set('titles',titles);
        if($location.search() && Object.keys($location.search()).length==1 && $location.search().subDomain){
            url=url.substring(0,url.indexOf('?'))
        }
        url=url.replace("?_escaped_fragment_","");
        var seopage=global.get('seopages').val.getOFA('link',url)
        //console.log(global.get('seopages').val,seopage,url)
        /*
        console.log(global.get('seopages').val)*/
        if(seopage){
            //console.log(seopage)
            if(seopage.data){
                global.set('currentSeopage',seopage.data);
            }else{
                var q = $q.when()
                    .then(function(){
                        return Seopage.getItem(seopage._id)
                    })
                //console.log(q)
                global.set('currentSeopage',q);
            }
        }else{
            global.set('currentSeopage',null);
        }
        //console.log("global.get('titles').val.desc",global.get('titles').val.desc)

        //******************************************************



        if(window.dataLayer && window.dataLayer.push){
            window.dataLayer.push({
                event: 'pageview',
                action: $location.path(),
            });

            /*window.dataLayer.push({
                event: 'Page View',
                action: $location.path(),
            });*/

        }
        //console.log(window.dataLayer)


        if ($window.ga){
            //$window.ga('send', 'pageview', { page: $location.path() });
            $window.ga('send', 'pageview',$location.path());
        }
        if(typeof gtag!== 'undefined'){
            setTimeout(function(){
                gtag('config', googleAnalytics, {
                    'page_title': global.get('titles').val.title,
                    'page_location': $location.url(),
                    'page_path': $location.path()
                });
            },300)

        }


        if ($window.fbq){
            //console.log('fb')
            fbq('track', 'PageView')
        }

        if(window.yaCounter){
            if(to.name=='thanksPage'){
                window.yaCounter.reachGoal(toParams.id);
                window.yaCounter.hit($location.path())
            }
        }

        /*if(from.name=='stuffs.stuff' && to.name=='stuffs' && ($rootScope.srollPosition||$rootScope.srollPosition==0) && toParams.categoryUrl=='category'){
            console.log('$rootScope.srollPosition',$rootScope.srollPosition)
            $timeout(function(){
                window.scrollTo(0, $rootScope.srollPosition);
            },1000)
        }*/
        /*if(from.name=='stuffs.stuff' && to.name=='stuffs' && toParams.categoryUrl=='category'){
            $timeout(function(){
                $location.replace();
            },1000)
        }*/



        if (to.name=='home') {
            seoContent.setDataHomePage();
        }
        $rootScope.endLoadStuffs=true;
        //console.log(JSON.stringify(global.get('titles').val.title))
    });
    $rootScope.$on('$stateChangeError', function(event,toState, toParams, fromState, fromParams, error) {
           console.log(error);
        });

    $rootScope.$on('$allDataLoaded',function(e,data){
        //console.log('$allDataLoaded');
        $rootScope.endLoadStuffs=true;
    });

    $rootScope.$on('InitiateCheckout',function () {
        if($window.fbq){
            fbq('track', 'InitiateCheckout');
        }
    })
    $rootScope.$on('AddToCart',function () {
        //console.log($window.fbq)
        if($window.fbq){
            fbq('track', 'AddToCart');
        }

        if(typeof dataLayer!== 'undefined'){
            setTimeout(function(){
                dataLayer.push({'event': 'AddToCart'});
            },300)

        }
    })
    $rootScope.$on('Purchase',function (event, data) {
        if($window.fbq){
            fbq('track', 'Purchase', data);
        }
    })
    $rootScope.$on('CompleteRegistration',function (event, data) {
        if($window.fbq){
            fbq('track', 'CompleteRegistration');
        }
    })

    /*$rootScope.$on('$allImagesLoadedInHomePage',function(){
        $(function () { objectFitImages() });
    });*/
    var scrollbarWidth=0;
    var scrolled=0;
    var padding_right=angular.element($document[0].body).css('padding-right').split('px')
    var padding_rightM=[];
    var nav = angular.element($document.find('.navbar-fixed-top'))
    var styleSheet,ng_pageslide_body_closed;
    $timeout(function () {
        scrollbarWidth = (window.innerWidth-$(document).width());
        if(padding_right && padding_right[0]){
            if(Number.isInteger(Number(padding_right[0]))){
                padding_right= Number(padding_right[0])
            }else{
                padding_right=0
            }
        }else{
            padding_right=0;
        }
        nav.each(function(i,n){
            if(n){
                padding_rightM[i]=angular.element(n).css('padding-right').split('px')
                if(padding_rightM[i] && padding_rightM[i][0]){
                    if(Number.isInteger(Number(padding_rightM[i][0]))){
                        padding_rightM[i]= Number(padding_rightM[i][0])
                    }else{
                        padding_rightM[i]=0
                    }
                }else{
                    padding_rightM[i]=0;
                }
            }
        })

        //console.log(padding_right)

        //document.styleSheets[0].addRule('body.ng-pageslide-body-closed::before', 'height: 7777px', 0);
        //console.log(document.styleSheets)
        try{
            if(document.styleSheets && document.styleSheets.length){
                for(var i =0;i<document.styleSheets.length;i++){
                    if(document.styleSheets[i].cssRules && document.styleSheets[i].cssRules.length){
                        for(var j =0;j<document.styleSheets[i].cssRules.length;j++){

                            if(document.styleSheets[i].cssRules[j].selectorText && document.styleSheets[i].cssRules[j].selectorText.indexOf('body.ng-pageslide-body-closed::before')>-1){
                                /*console.log(document.styleSheets[i].cssRules[j])
                                 styleSheet=document.styleSheets[i];*/
                                ng_pageslide_body_closed=document.styleSheets[i].cssRules[j]
                                //break;
                            }
                        }
                    }
                }
            }
        }catch (err){

        }

    },500)




    //console.log(document.styleSheets[0])

    $rootScope.$on('modalOpened',function(e,data){
        var height=$($document[0].body).height()
        if(nav && nav.each){
            nav.each(function(i,n){
                if(n){
                    $(n).css('padding-right',scrollbarWidth+padding_rightM[i])
                }
            })
        }
        angular.element($document[0].body).css('overflow-y','hidden')
        angular.element($document[0].body).css('padding-right',scrollbarWidth+padding_right)

        if(ng_pageslide_body_closed && ng_pageslide_body_closed.style){
            ng_pageslide_body_closed.style.height=height+'px';
        }

        /*if(styleSheet && styleSheet.cssRules){
            for(var i=0;i<styleSheet.cssRules.length;i++){
                if(styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.indexOf('body.ng-pageslide-body-closed::before')>-1){

                    //styleSheet.cssRules[i].style.height='9999px'
                    console.log(styleSheet.cssRules[i])
                }
            }
        }*/


        /*if(iPhone){
            scrolled = window.pageYOffset || document.documentElement.scrollTop;
            angular.element($document[0].body).css('position','fixed')
            angular.element($document[0].body).css('top',-(scrolled+16))
        }*/
    });
    $rootScope.$on('modalClosed',function(e,data){
        angular.element($document[0].body).css('overflow-y','auto')
        angular.element($document[0].body).css('padding-right',padding_right)
        if(nav && nav.each){
            nav.each(function(i,n){
                if(n){
                    $(n).css('padding-right',padding_rightM[i])
                }
            })
        }
        $timeout(function () {
            if(ng_pageslide_body_closed && ng_pageslide_body_closed.style){
                ng_pageslide_body_closed.style.height='auto'
            }

        },800)
        //console.log(padding_rightM)
        /*if(iPhone){
            angular.element($document[0].body).css('position','static');
            window.scrollTo( 0, scrolled );
        }*/

    });
    $rootScope.checkedMenuChange=function(field,val){
        //console.log(field,val)
        if(val){
            $rootScope.$emit('modalOpened')
            $rootScope.$broadcast('openMenu')
        }else{
            $rootScope.$emit('modalClosed')
            $rootScope.$broadcast('closeMenu')
        }
        $rootScope.checkedMenu[field]=val;
    }

    function _logged(){
        var id=(global.get('user').val)?global.get('user').val._id:null;
        $rootScope.$broadcast('logged');
        //console.log('???????????????????')
        socket.emit('getUser:data',{
            user:id,
            seller:global.get('store').val.seller._id,
            store:global.get('store').val._id
        })
       // return;
        /*$user.save({update:'coupons'},{_id:global.get('user' ).val._id,coupons:[]},function(res){

        },function(err){
            if(err){console.log(err)}
        });*/
    }
    socket.on('newMessage',function(data){
        var dd = angular.copy(data)
        $rootScope.$broadcast('newChatMessage',dd)
        data.count=1;
        $rootScope.soundChat.play();
        //setChatMessagesCount(data);

    })
    socket.on('getUser',function(){
        var id=(global.get('user').val)?global.get('user').val._id:null;
        socket.emit('getUser:data',{
            user:id,
            seller:global.get('store').val.seller._id,
            store:global.get('store').val._id
        })
    })

    //set global variables *********
    global.set('iPadVerticalWidth',770);
    global.set('iPadHorizontalWidth',1024);
    //*****************************
    //console.log('run init1')
    var clickForOpenChat;
    function _openChatWitget(field){
        //console.log('field',field)
        //console.log('$rootScope.checkedMenu[field]',$rootScope.checkedMenu[field])
        if(clickForOpenChat){return}
        clickForOpenChat=true;
        $rootScope.checkedMenuChange(field,!$rootScope.checkedMenu[field])
        //$rootScope.checkedMenu[field]=!$rootScope.checkedMenu[field];
        setTimeout(function(){
            clickForOpenChat=false;
        },200)
    }

    function setInitData(dataFromServer){
        var store=dataFromServer[0],
            crawler=dataFromServer[1],
            local=dataFromServer[2],
            mobile=dataFromServer[3],
            tablet=dataFromServer[4],
            sections=dataFromServer[5],
            brands=brandsFromServer,//dataFromServer[6],
            stats=dataFromServer[6],
            filters=filtersFromServer,//dataFromServer[8],
            paps=dataFromServer[9],
            seopages=dataFromServer[10],
            coupons=dataFromServer[11],
            witget=dataFromServer[12],
            lang=dataFromServer[13],
            campaign=dataFromServer[14],
            masters=dataFromServer[15].filter(function (m) {
                return m.actived
            });
        //console.log(store.texts)
        //console.log(store.currency)


        brands.forEach(function(b){
            b.tags=b.tags.filter(function (t) {
                return t.actived
            })

        })

        // инициализация объектов для создания запроса для получения списка
        sectionClass= new SectionClass(sections)
        dQ= new DesignQuery(brands,null,filters,sectionClass)
        //************************************************************

        moment.locale(store.lang)
        //console.log(filtersFromServer)
        if(!store.seller){store.seller={}}
        //store.dontDisplayRetail=(store.seller.opt.quantity==1||!store.seller.opt.quantity)?true:false;
        if(!store.seller.opt ||(store.seller.opt && store.seller.opt.quantity<2)){
            store.seller.retail=null;
        }
        global.set('country',{country_code:'UA'});
        if(!store.seo){store.seo={}}
        store.seo.domain=store.domain?store.domain:store.subDomain;
        //store.seo.author='https://plus.google.com/u/0/106574592575126022578/posts';
        store.seo.name=store.name;
        global.set('store',store);
        global.set('seller',store.seller._id);
        socket.emit('seller',store.seller._id)
        global.set('titles',store.seo)
        //console.log(global.get('titles' ).val,store.seo);
        //$rootScope.titles=global.get('titles');
        global.set('config',{currency:store.currency});
        global.set('currency',store.mainCurrency);
        //console.log(store.mainCurrency)
        if(!store.mainCurrency){store.mainCurrency="UAH"}
        global.set('rate',store.currency[store.mainCurrency][0]);
        if(masters && masters.length){
            masters.forEach(function(m){
                if(m.timeTable && m.timeTable.length){
                    m.timeTable.forEach(function (p) {
                        if(p.is){
                            if(p.is=='false'){p.is=false}else if(p.is=='true'){p.is=true}
                        }
                    })
                }

            })
        }
        global.set('masters',masters)
        if(masters && masters.length){
            global.set('mastersO',masters.reduce(function(o,m){o[m._id]=m;return o;},{}))
        }


        if(!crawler){
            if($auth.isAuthenticated()){
                Account.getProfile()
                    .then(function(response) {
                        //console.log(coupons)
                        global.set('user',response.data);
                        _logged()
                        //witget for coupon
                        //console.log(global.get('user').val)
                        //console.log(coupons)
                        if (global.get('user').val && coupons && coupons[0] && !coupons[0].hide){
                            if(global.get('user').val.coupons.indexOf(coupons[0]._id)<0){
                                Witget.show(coupons[0],true);
                            }else if(coupons[1] && !coupons[1].hide && global.get('user').val.coupons.indexOf(coupons[1]._id)<0){
                                Witget.show(coupons[1],true);
                            }
                        }/*else{
                            if (coupons && coupons[0] && !coupons[0].hide){
                                Witget.show(coupons[0],true);
                            }
                        }*/

                        //witget for call  обдумпть
                        for(var i=0,l=witget.length;i<l;i++){
                            if(witget[i].type!='call'){
                                Witget.show(witget[i],true)
                            }
                        }
                        socket.on('sellerStatus',function(data){
                            //console.log(data);
                            if(data.status && !$rootScope.witgetShowen){
                                $rootScope.witgetShowen=true;
                                if(witget && witget.length){
                                    for(var i=0,l=witget.length;i<l;i++){
                                        if(witget[i].type=='call'){
                                            if (!global.get('user').val || (global.get('user').val && witget[0].forAll)){
                                                Witget.show(witget[i],true)
                                            }
                                        }
                                    }
                                }
                            }
                        });

                    })
                    .catch(function(response) {
                        if(response && response.data){
                            exception.catcher(response.status)(response.data.message);
                        }
                    });
            }else{
                for(var i=0,l=witget.length;i<l;i++){
                    if(witget[i].type!='call'){
                        Witget.show(witget[i],true)
                    }
                }
                socket.on('sellerStatus',function(data){
                    //console.log(data);
                    if(data.status && !$rootScope.witgetShowen){
                        $rootScope.witgetShowen=true;
                        if(witget && witget.length){
                            for(var i=0,l=witget.length;i<l;i++){
                                if(witget[i].type=='call'){
                                    if (!global.get('user').val || (global.get('user').val && witget[0].forAll)){
                                        Witget.show(witget[i],true)
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }





        global.set('crawler',crawler);
        global.set('local',local);
        global.set('mobile',mobile);
        global.set('tablet',tablet);
        global.set('lang',lang);
        //global.get('store').val.template.menu2.slideMenuSpeed
        $rootScope.slideMenuSpeed=(global.get('store').val.template.menu2 && (global.get('store').val.template.menu2.slideMenuSpeed || global.get('store').val.template.menu2.slideMenuSpeed=='0'))?global.get('store').val.template.menu2.slideMenuSpeed:'0.3'
        if(mobile){
            $rootScope.slideMenuWidth =(global.get('store').val.template.menu2.slideMenuWidth)?global.get('store').val.template.menu2.slideMenuWidth:'90%';
            //$rootScope.slideMenuWidth = '90%';
            $rootScope.checkedMenu.sizeEntryTime='100%';
            $rootScope.checkedMenu.sizeCartSlide='100%';
            //console.log($rootScope.slideMenuWidth)
        }else if(tablet){
            $rootScope.slideMenuWidth =(global.get('store').val.template.menu2.slideMenuWidth)?global.get('store').val.template.menu2.slideMenuWidth:'60%';
            //$rootScope.slideMenuWidth = '60%';
            $rootScope.checkedMenu.sizeEntryTime='80%';
            $rootScope.checkedMenu.sizeCartSlide='80%';
        }else{
            $rootScope.slideMenuWidth =global.get('store').val.template.menu2.slideMenuWidth;
            $rootScope.checkedMenu.sizeEntryTime='40%';
            $rootScope.checkedMenu.sizeCartSlide='50%';
        }
        //$rootScope.slideMenuWidth=(!mobile)?global.get('store').val.slideMenuWidth:'90%'

        global.set('sections',sections);

        var categories=[];
        sections.forEach(function(section){
            if(!section.type){
                section.type='good';
            }
            if(section.categories && section.categories.length){
                section.categories.forEach(function(c){

                    //console.log(c.linkData)
                    c.section={url:section.url,name:section.name}
                    c.linkData={groupUrl:section.url,categoryUrl:c.url,
                    searchStr:null,brand:null,brandTag:null,queryTag:null}
                })
                categories.push.apply(categories,section.categories)
            }
            if(section.child && section.child.length){
                section.child.forEach(function(subSection){
                    subSection.type=section.type;
                    if(subSection.categories && subSection.categories.length){
                        subSection.categories.forEach(function(c){
                            //console.log(c.linkData)
                            c.section={url:section.url,name:section.name,subSectionName:subSection.name,
                                subSectionUrl:subSection.url}
                            c.linkData={groupUrl:subSection.url,categoryUrl:c.url,
                                searchStr:null,brand:null,brandTag:null,queryTag:null}
                            /*var parentSection= Sections.getParentSection(c.group,true);
                            if(parentSection && parentSection.url && parentSection.url!=c.section.url){
                                c.parentGroupUrl=parentSection.url;
                            }*/
                        })
                        categories.push.apply(categories,subSection.categories)
                    }
                })
            }
        })
        global.set('categories',categories);
        var categoriesO={};
        categories.forEach(function(c){
            "use strict";
            categoriesO[c._id]=c;
        })
        global.set('categoriesO',categoriesO);
        //console.log(categories)
        /*console.log(categories)
        console.log(brands)*/
        global.set('brands',brands);
        /*if(!filters.length){
            globalSrv.getData('filters').then(function(response){
                console.log(response.data)
                global.set('filters',response.data);
                filterTags=[];
                response.data.forEach(function(filter){
                    if(filter.tags && filter.tags.length){
                        filter.tags.forEach(function (t,i) {
                            t.index=i;
                        })
                        //console.log(filter.tags)
                        filterTags.push.apply(filterTags,filter.tags)
                    }
                })
                global.set('filterTags',filterTags)
            })
        }*/
        global.set('filters',filters);


        var filtersO={}
        filters.forEach(function(f){
            filtersO[f._id]=f

        })
        global.set('filtersO',filtersO)
        var brandsO={}
        brands.forEach(function(b){
            brandsO[b._id]=b

        })
        global.set('brandsO',brandsO)



        global.set('paps',paps)
        global.set('coupons',coupons)
        global.set('seopages',seopages);
        global.set('campaign',campaign);

        $order.init('cart');
        $rootScope.order=$order.getOrder()
        /*$rootScope.cart={}
        $rootScope.cart.inCart = $order.cartCount();
        $rootScope.$watch(function(){return $order.cartCount()},function(n,o){
            if ($order.type=='cart'&&  n!==o  ){
                $rootScope.cart.inCart=n;
                $rootScope.cart.changeCartItems=true;
                $timeout(function(){
                    $rootScope.cart.changeCartItems=false;
                },600)
            }
        })*/
        var listener1 = $rootScope.$watch(function(){return $rootScope.checkedMenu.chatMenu},function(n){
            //console.log($rootScope.checkedMenu.chatMenu,n)
            if (n){
                $rootScope.globalProperty.chatMenuFist=true;
                listener1()
            }
        })
        var listener2 = $rootScope.$watch(function(){return $rootScope.checkedMenu.entryTime},function(n){
            //console.log($rootScope.globalProperty.entryTimeFist,n)
            if (n){
                $rootScope.globalProperty.entryTimeFist=true;
                listener2()
            }
        })


        global.set('models',{'Campaign':Campaign})


        global.set('cache',{});
        var functions={
            changeCurrency:_changeCurrency,
            searchStuff:_searchStuff,
            searchStuffList:_searchStuffList,
            searchLostFocus:_searchLostFocus,
            searchData:_searchData,
            searchModal:_searchModal,
            changeLocation:_changeLocation,
            changeLang:_changeLang,
            enter:_enter,
            logout:_logout,
            logged:_logged,
            witget:_witget,
            closeMenu:_closeMenu,
            openSlideMenu:_openSlideMenu,
            closeChatWitget:_closeChatWitget,
            openChatWitget:_openChatWitget,
            setRows:_setRows,
            getSection:_getSection,
            orderStuffFromHP:_orderStuffFromHP,
            action:_action,
            zoomImg:_zoomImg,
            cloneStore:_cloneStore,
            orderGroupStuffs:_orderGroupStuffs,
            bookingFromSchedule:bookingFromSchedule
        }

        function bookingFromSchedule(entry){
            console.log(entry);
            var hour = Math.floor(entry.start/4)
            var minutes = (entry.start%4)*15
            var year = entry.date.substring(4,8)
            var month = entry.date.substring(8,10)
            var day = entry.date.substring(10)
            var entryDate = new Date(year,month,day,hour,minutes)
            return $q.when()
                .then(function(){
                    if(!global.get('user' ).val || !global.get('user' ).val._id){
                        return $user.loginOnlyPhone();
                    }else{
                        return
                    }
                })
                .then(function () {
                    if(!global.get('user').val || !global.get('user').val._id){
                        throw 'not auth'
                    }

                    if(!entry.users){
                        entry.users=[];
                    }

                    if(entry.users.some(function(u){return u._id==global.get('user' ).val._id})){
                        throw 'already in deal'
                    }
                    var o = {
                        _id:global.get('user' ).val._id,
                        name:global.get('user' ).val.name,
                        phone:global.get('user' ).val.profile.phone,
                        email:global.get('user' ).val.email,
                    }
                    entry.users.push(o)
                    var data={users:entry.users,_id:entry._id}
                    return $http.post('/api/collections/Booking/'+entry._id+'?update=users',data)

                })
                .then(function(res){
                    socket.emit('newRecordOnSite',{store:global.get('store').val._id,seller:global.get('store').val.seller._id})
                    console.log("global.get('store').val.submitDateTime",global.get('store').val.submitDateTime)
                    // admin
                    if(global.get('store').val.seller.phone){
                        var dataForSend={phone:global.get('store').val.seller.phone}
                        dataForSend.userId=global.get('user' ).val._id
                        dataForSend.text=global.get('langOrder').val.recordedOn+' '+entry.stuffName.toUpperCase()+' '+global.get('langOrder').val.onn+' '+entryDate;
                        return $http.post('/api/users/sendMessageAboutDeal',dataForSend)
                    }
                })
                .then(function(res){
                    //notification отправка уведомления
                    try{
                        entry.dateForNote =moment(entryDate).format('lll');
                        var entryT = angular.copy(entry);
                        var content=CreateContent.dateTimeNote(entryT)
                        //console.log(content)
                        var o={addressee:'seller',
                            type:'dateTime',
                            content:content,
                            seller:global.get('store').val.seller._id};
                    }catch(err){
                        console.log(err)
                    }
                    return $q(function(resolve,reject){
                        $notification.save(o,function(res){
                            exception.showToaster('note', global.get('langNote').val.sent,'');
                            resolve()
                        },function(err){
                            exception.catcher('error')(err);
                            resolve()
                        } )
                    })
                })
                .then(function(res){
                    var pap = global.get('paps').val.getOFA('action','booking');
                    if(pap && pap.url){
                        $state.go('thanksPage',{id:pap.url})
                    }
                })
                .catch(function(err) {
                    console.log(err)
                    if(err){
                        exception.catcher('booking')(err);
                    }
                });

        }

        var delay;
        function _action(link,argsObj){
            //console.log(argsObj)
            if(delay){return}
            delay=true;
            $timeout(function(){delay=false},1000)
            //console.log(link)
            if(!link){return}
            if(link == "subscription"){
                _witget('subscription')
            }else if(link == "feedback"){
                _witget('feedback')
            }else if(link == "call"){
                _witget('call')
            }else if(link == "dateTime"){
                //console.log(argsObj)
                _witget('dateTime',argsObj)
            }else if(link == "subscriptionAdd"){
                _witget('subscriptionAdd')
            }else if(link == "allBonus"){
                Stuff.getAllBonus()
            }else{
                $location.path(link)
            }

        }


        function _orderStuffFromHP(url) {
            $q.when()
                .then(function(){
                    return Stuff.getItem(url)
                 })
                .then(function (stuff) {
                    //console.log(stuff)
                    if(stuff.orderType==1){
                        stuff.order()
                    }else if(stuff.orderType==2){
                        $rootScope.$broadcast('dateTime',{stuff:stuff})
                        if(!$rootScope.checkedMenu['entryTime']){
                            _openChatWitget('entryTime')
                        }
                    }else if(stuff.orderType==4){
                        stuff.getBonus()
                    }else{
                        $state.go('stuffs.stuff',{'groupUrl':'group',categoryUrl:'category',stuffUrl:stuff.url})
                    }
                })
        }
        function _orderGroupStuffs(groupStuffs){
            //onsole.log(groupStuffs)
            $order.clearCart();
            groupStuffs.stuffs.forEach(function(stuff){
                stuff.quantity=1;
                stuff.cena=stuff.price;
                stuff.sum= stuff.cena*stuff.quantity;
                $order.addItemToCart(stuff)
            })
            return $q.when()
                .then(function(){
                    if(!global.get('user' ).val || !global.get('user' ).val._id){
                        return $user.login();
                    }else{
                        return
                    }
                })
                .then(function(){
                    return $order.getShipInfo()
                })
                .then(function(){
                    $rootScope.$emit('$stateChangeStartToStuff');
                    return $order.sendOrder()
                })
                .then(function () {
                    $rootScope.$emit('Purchase',{value:$order.paySum,currency:$order.currency});
                    $rootScope.$emit('$stateChangeEndToStuff');
                    $order.reinitCart()
                    $rootScope.order=$order.getOrder();
                    $order.clearCart()
                    $rootScope.checkedMenu.cart=false
                })
                .then(function(){
                    return $user.saveProfile(global.get('user' ).val)
                })
                .catch(function(err){
                    $rootScope.$emit('$stateChangeEndToStuff');
                    if(!err){return;}
                    console.log('errerrerr ',err)
                    if(err.data){
                        var content = JSON.stringify(err.data);
                    }else{
                        var content = JSON.stringify(err, ["message", "arguments", "type", "name"]);
                    }
                    if(global.get('user').val){
                        content +="\r"+global.get('user').val.email
                    }
                    if($order.getOrder()){
                        content +="\r"+JSON.stringify($order.getOrder(), null, 4)
                    }
                    var domain=global.get('store').val.domain;
                    var o={email:['igorchugurov@gmail.com','vikachugurova@gmail.com'],content:content,
                        subject:'error in order ✔',from:  global.get('store').val.name+'<'+global.get('store').val.subDomain+'@'+domain+'>'};
                    //console.log(o)
                    $q(function(resolve,reject){$email.save(o,function(res){resolve()},function(err){resolve()} )})
                    if(err){
                        exception.catcher(global.get('langNote').val.error)(err)
                    }
                })

        }
        global.set('functions',functions)
        function _changeCurrency(lan){
            // установка курса для данной валюты
            //console.log(lan)
            if (global.get('config').val && global.get('config').val.currency
                && global.get('config').val.currency[lan]){
                global.set('currency',lan);
                global.set('rate',global.get('config').val.currency[lan][0])
                $order.changeCurrency(lan);
            }
            if($rootScope.checkedMenu.slideMenu){
                $rootScope.checkedMenuChange('slideMenu',false);
            }
            $rootScope.$emit('changeCurrency')
        }
        function _searchStuff(searchStr){
            if(!searchStr || searchStr.length<3){return}
            var o = {searchStr:searchStr.substring(0,20)}
            //console.log(o)
            $state.go('search',o,{reload: true,inherit: false,notify: true });
        }
        function _searchData(searchStr){
            if(!searchStr || searchStr.length<3){return}
            var o = {searchStr:searchStr.substring(0,20)}
            //console.log(o)
            $state.go('search',o,{reload: true,inherit: false,notify: true });
        }
        function _searchStuffList(searchStr){
            if(!searchStr || searchStr.length<3){
                $rootScope.globalProperty.stuffSearchList=[{name:global.get('lang').val.enterChar}];
                return}
            //console.log('_searchStuffList');

            if(!$rootScope.globalProperty.searchList){$rootScope.globalProperty.searchList=true}
            $q.when()
                .then(function () {
                    return Stuff.search(searchStr);
                })
                .then(function (res) {
                    console.log(res)
                    if(res.length){
                        $rootScope.globalProperty.stuffSearchList=res;
                    }else{
                        $rootScope.globalProperty.stuffSearchList=[{name:global.get('lang').val.noResults}];
                    }
                })
                .catch(function () {
                    $rootScope.globalProperty.stuffSearchList=[{name:global.get('lang').val.noResults}];
                })

        }

        function _searchLostFocus(){
            //return;
            $timeout(function(){
                $rootScope.globalProperty.searchList=false
                $rootScope.globalProperty.stuffSearchList=[]
            },2000)

        }
        function _zoomImg(i,images,home){
            if(home){
                Stuff.zoomImg(i,images,home)
            }else{
                Stuff.zoomImg(i,images)
            }

        }

        function _cloneStore(subDomain){
            //console.log('clone store ')
            var cloneServ = $injector.get('cloneStore');
            cloneServ.clone(subDomain)
        }
        function _searchModal() {
            //console.log('dddd')
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/template/modal/search.html',
                controller: function($uibModalInstance,$rootScope,global){
                    var self=this;
                    self.item=''
                    self.focus=true;
                    self.globalProperty=$rootScope.globalProperty
                    self.global=global;
                    self.ok=function(){
                        //console.log('close')
                        $uibModalInstance.close(self.item);
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                    $rootScope.$on('closeSearchModal',function(){
                        $uibModalInstance.dismiss();

                    })
                },
                controllerAs:'$ctrl',
            });
            modalInstance.result.then(function (item) {
                //console.log(item)
               _searchStuff(item);
            });
        }

        function _changeLocation(url){
            //console.log(url)
            //return;

            if(url=='/manage' && !global.get('store').val.cabinetFull && !global.get('store').val.owner.some(function(o){return o==global.get('user').val._id})){
                $state.go('cabinet');
                return;
            }
            $window.location.href=url;
        }
        function _changeLang(lang){
            //console.log(lang)
            if(global.get('store').lang!=lang){
                $location.search('lang',lang)
                //console.log($location.url())
                var url= $location.url()
                _changeLocation(url)

            }
        }
        function _enter(){
            if($rootScope.checkedMenu.slideMenu){
                $rootScope.checkedMenuChange('slideMenu',false);
            }
            $user.login()
        }
        function _logout(){
            $rootScope.$broadcast('logout');
            if($rootScope.checkedMenu.slideMenu){
                $rootScope.checkedMenuChange('slideMenu',false);
            }
            $auth.logout()
            $state.go('home')
            global.set('user',null)
            socket.emit('getUser:data',{user:null})
        }

        function _witget(type,argsObj){
            //console.log(argsObj)
            //console.log(type)
            var data ={type:type}
            if(argsObj && argsObj.stuff){
                data.stuff=argsObj.stuff;
            }
            if(type=='subscription'){
                data.name=(store.texts.subscriptionName)?store.texts.subscriptionName[store.lang]:'';
                data.desc=(store.texts.subscriptionText)?store.texts.subscriptionText[store.lang]:'';
                return Witget.show(data);
            }if(type=='subscriptionAdd'){
                data.name=(store.texts.subscriptionAddName)?store.texts.subscriptionAddName[store.lang]:'';
                data.desc=(store.texts.subscriptionAddText)?store.texts.subscriptionAddText[store.lang]:'';
                return Witget.show(data);
            }else if(type=='call'){
                data.name=(store.texts.callName)?store.texts.callName[store.lang]:'';
                data.desc=(store.texts.callText)?store.texts.callText[store.lang]:'';
                return Witget.show(data);
            }else if(type=='feedback'){
                data.name=(store.texts.feedbackName)?store.texts.feedbackName[store.lang]:'';
                data.desc=(store.texts.feedbackText)?store.texts.feedbackText[store.lang]:'';
                return Witget.show(data);
            }else if(type=='dateTime'){
                //console.log("$rootScope.checkedMenu['entryTime']",$rootScope.checkedMenu['entryTime'])
                $timeout(function(){
                    $rootScope.$broadcast('dateTime',argsObj)
                },500)

                //$rootScope.globalProperty.entryStuff=(stuff)?stuff:null;
                if(!$rootScope.checkedMenu['entryTime']){
                    _openChatWitget('entryTime')
                }
                return;
            }
        }

        function _closeChatWitget(field){
            //console.log(field)
            //return;
            //console.log(field,$rootScope.checkedMenu[field],clickForOpenChat,$rootScope.checkedMenu[field] && !clickForOpenChat)
            if($rootScope.checkedMenu[field] && !clickForOpenChat){
                $rootScope.checkedMenuChange(field,false);
                //$rootScope.checkedMenu[field]=false;

            }
        }

        function _setRows(){
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
            //var w=1500;
            //console.log(w)
            var type = (global.get('sectionType').val)?global.get('sectionType').val:'good';
            var r = (global.get('store').val.template.stuffListType[type].rows)?global.get('store').val.template.stuffListType[type].rows:4;
            //console.log(global.get('mobile').val,global.get('store').val.template.stuffListType[type])

            /*if(global.get('store').val.template.stuffListType[type].filters &&
                !global.get('store').val.template.stuffListType[type].filtersInModal && !global.get('mobile').val && r>=2
            && ($stateParams.categoryUrl!='category' ||($stateParams.categoryUrl=='category' && global.get('store').val.template.stuffListType[type].filtersForAll)) ){
                r--;
            }*/
            //console.log(r)
            if(w>1350){
                return r
            }else if(w>global.get('iPadHorizontalWidth').val){
                return (r-1<2)?2:r-1
            }else if(w>global.get('iPadVerticalWidth').val){
                return 2;
            }else{
                return 1;
            }

        }
        function _getSection(sectionUrl,id) {
            var sections=global.get('sections').val
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



        var clickForOpen;
        function _closeMenu(event){
            if($rootScope.checkedMenu.slideMenu && !clickForOpen){
                $rootScope.checkedMenuChange('slideMenu',false)
            }
        }
        function _openSlideMenu(){
            if(clickForOpen){return}
            clickForOpen=true;
            $rootScope.checkedMenuChange('slideMenu',true)
            setTimeout(function(){
                clickForOpen=false;
            },200)
        }
        $timeout(function(){
            if($stateParams['action']){
                _witget($stateParams.action)
                $location.search('action',null)
            }

        },1000)

        $rootScope.contentLoaded=true;
    }
    //console.log(ngInitData)
    setInitData(ngInitData);

    var langError,langOrder,langForm,langNote;




    //console.log(global.get('langOrder').val)
    //console.log(global.get('lang').val)
    if(global.get('store').val.langError){
        global.set('langError',global.get('store').val.langError)
    }else{
        globalSrv.getData('langError').then(function(response){
            var d = {}
            if(response.data && response.data.length && response.data[1].tags){
                langError=response.data[1].tags;
                for(var k in response.data[1].tags){
                    d[k]=response.data[1].tags[k][global.get('store').val.lang]
                }
            }
            global.set('langError',d);
        })
    }
    if(global.get('store').val.langNote){
        global.set('langNote',global.get('store').val.langNote)
    }else{
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
    }
    if(global.get('store').val.langOrder){
        global.set('langOrder',global.get('store').val.langOrder)
    }else{
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
    }

    if(global.get('store').val.langForm){
        global.set('langForm',global.get('store').val.langForm)
    }else{
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

    }



    //http://api.ipstack.com/176.9.41.28?access_key=96b8e490d1ca4838c950dbe1d08d79cc
    if(global.get('store').val.ipstack){
        var urlForgetIp="http://api.ipstack.com/check?access_key="+global.get('store').val.ipstack;
        $.get( urlForgetIp ).then(
            function(result) {
                //console.log(result)
                var currencyForCountry={}
                for(var key in global.get('store').val.currency){
                    $rootScope.detectCurrency=false;
                    //console.log(key,global.get('store').val.currency[key])
                    if(global.get('store').val.currency[key] && global.get('store').val.currency[key][3] && global.get('store').val.currency[key][3].forEach){
                        $rootScope.detectCurrency=true
                        global.get('store').val.currency[key][3].forEach(function(country){
                            currencyForCountry[country]=global.get('store').val.currency[key][1]
                        })
                    }
                    if($rootScope.detectCurrency){
                        if(currencyForCountry[result.country_code]){
                            global.get('functions').val.changeCurrency(currencyForCountry[result.country_code])
                        }else if(currencyForCountry['ALLOTHER']){
                            global.get('functions').val.changeCurrency(currencyForCountry['ALLOTHER'])
                        }else{
                            $rootScope.detectCurrency=false;
                        }
                    }
                }
            }, function(err) {
                console.log(err)
            }
        );
    }



}])
.config(['$stateProvider', '$urlRouterProvider','$locationProvider','globalProvider','$authProvider','$httpProvider',function ($stateProvider,$urlRouterProvider,$locationProvider,globalProvider,$authProvider,$httpProvider){

    $httpProvider.interceptors.push('myInterceptorService');
    //$authProvider.baseUrl=userHost;
    if(facebookAppID){
        //console.log(facebookAppID)
        $authProvider.facebook({
            clientId: facebookAppID
        });
    }
    if(googleAppID){
        //console.log(googleAppID)
        $authProvider.google({
            clientId: googleAppID
        });
    }

    if(vkAppID){
        //console.log(vkAppID)
        $authProvider.oauth2({
            name: 'vkontakte',
            url: '/auth/vkontakte',
            redirectUri:window.location.origin || window.location.protocol + '//' + window.location.host,
            clientId: vkAppID,
            authorizationEndpoint: 'http://oauth.vk.com/authorize',
            scope: 'friends, photos, email, photo_big',
            display: 'popup',
            responseType: 'code',
            requiredUrlParams: ['response_type', 'client_id', 'redirect_uri', 'display', 'scope', 'v'],
            scopeDelimiter: ',',
            v: '5.37'
        });
    }





    globalProvider.setUrl( {
             //user:'/api/users/me/',
             campaign:'/api/collections/Campaign?query={"actived":"true","dateEnd":{"$gte":'+Date.now()+'}}',
             masters:'/api/collections/Master?query={"actived":true}',
             langError:'/api/collections/Lang?query={"name":"index.error"}',
             langNote:'/api/collections/Lang?query={"name":"index.note"}',
             langOrder:'/api/collections/Lang?query={"name":"index.order"}',
             langForm:'/api/collections/Lang?query={"name":"index.form"}',
             keywords:'/api/collections/Keywords',
             filters:'/api/collections/Filter'
    });
    // инициализация глобальных переменных
    globalProvider.set('store');
    globalProvider.set('seller') // из данных магазина
    globalProvider.set('titles');//// из данных магазина
    globalProvider.set('config');// из данных магазина

    globalProvider.set('currency');// delault UAH
    globalProvider.set('rate');//1
    globalProvider.set('country');// UA

    globalProvider.set('crawler');
    globalProvider.set('user');
    globalProvider.set('local');
    globalProvider.set('mobile')
    globalProvider.set('tablet')


    globalProvider.set('sections','penging')
    globalProvider.set('categories','penging'); // from sections
    globalProvider.set('categoriesO');
    globalProvider.set('category'); // data for seoContent
    globalProvider.set('brands','penging');
    globalProvider.set('brandsO');
    globalProvider.set('filters','penging');
    globalProvider.set('filtersO');
    globalProvider.set('filterTags','penging');// from filters
    globalProvider.set('filterTagsO');
    globalProvider.set('parentSection');
    globalProvider.set('breadcrumbs');

    globalProvider.set('stats');
    globalProvider.set('paps')
    globalProvider.set('homePage')


    // will do
    globalProvider.set('newTag');
    globalProvider.set('coupon');
    globalProvider.set('campaign');
    globalProvider.set('seopages')
    globalProvider.set('currentSeopage')
    globalProvider.set('info')
    globalProvider.set('lang')

    globalProvider.set('models')
    globalProvider.set('functions')
    globalProvider.set('masters')
    globalProvider.set('mastersO')
    globalProvider.set('iPadVerticalWidth')
    globalProvider.set('iPadHorizontalWidth')
    globalProvider.set('sectionType')
    globalProvider.set('tempContent')
    globalProvider.set('cache')
    globalProvider.set('langError')
    globalProvider.set('langNote')
    globalProvider.set('langOrder')
    globalProvider.set('langForm')
    globalProvider.set('services')
    globalProvider.set('stuffsInList')
    globalProvider.set('campaignStuffCart')



    
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


//http://briantford.com/blog/angular-hacking-core
//Hacking Core Directives in AngularJS
    .config(function ($provide) {
        //return;
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
                //console.log(attrs)
                var expressions = getExpressions(attrs.ngSrc);
                var getters = expressions.map($parse);

                return function(scope, element, attr) {
                    attr.$observe('ngSrc', function(value) {
                        //console.log('photoHost',photoHost,value)

                        if (getters.every(function (getter) { return getter(scope); })) {

                            /*if(value && value.indexOf('images/Store/') > -1){
                                attr.$set('src', storeHost+'/'+value);
                            }else */
                            if(value &&  value.indexOf('images/') > -1 && value.indexOf('http') < 0){
                                if(photoHost){attr.$set('src', photoHost+'/'+value);}else{attr.$set('src',value)}

                            }else {
                                attr.$set('src',value);
                            }
                        }else{
                            if(value){
                                if(value.indexOf('images/') > -1&& value.indexOf('http') < 0){
                                    if(photoHost){attr.$set('src', photoHost+'/'+value);}else{attr.$set('src',value)}
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
    })


//console.log('photoHost',photoHost)
var tempTitles,templateContentHTML;
function setMetaOG() {
    templateContentHTML=$('#tempContent').html()
    //templateContentHTML= document.getElementById('#tempContent')
    //console.log(templateContentHTML)
    var o={};
    o.keywords=$("meta[name='keywords']").attr("content");
    o.description=$("meta[name='description']").attr("content");
    //og
    o.title=$("meta[property='og\\:title']").attr("content")
    o.canonical=$("meta[property='og\\:url']").attr("content")
    o.image=$("meta[property='og\\:image']").attr("content")
    //console.log(o)
    tempTitles=o;




    $("meta[name='keywords']").attr("content", "{{global.get('titles').val.keywords}}");
    $("meta[name='description']").attr("content", "{{global.get('titles').val.description}}");

    //og
    $("meta[property='og\\:title']").attr("content","{{global.get('titles').val.title}}")
    $("meta[property='og\\:url']").attr("content","{{global.get('titles').val.url}}")
    $("meta[property='og\\:description']").attr("content", "{{global.get('titles').val.description}}")
    $("meta[property='og\\:image']").attr("content", "{{global.get('titles').val.image}}")

    //$("meta[name='author']").attr("{{global.get('titles').val.author}}")
    $("link[rel='canonical']").attr("href","{{global.get('titles').val.canonical}}")
    //$("link[rel='author']").attr("{{global.get('titles').val.author}}")


}


//console.log( document.cookie );
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

// это теперь в номеpage component parallax-banner
/*https://codepen.io/ArielBeninca/pen/zojIy?limit=all&page=2&q=paralax*/
/*$(document).ready(function(){
    var $window = $(window);

    $('div[data-type="background"]').each(function(i){
        var $bgobj = $(this);
        console.log(i,$bgobj)
        console.log($bgobj.offset().top)
        $(window).scroll(function() {
            console.log(i,$window.scrollTop(),$bgobj.offset().top)
            var yPos = -($window.scrollTop()/$bgobj.data('speed'));
            var coords = '50% '+ yPos + 'px';
            $bgobj.css({
                backgroundPosition: coords
            });
        });
    });
});*/
/*jQuery(document).ready(function( $ ) {
    $("#google-reviews").googlePlaces({
        placeId: 'ChIJp2QxV_sJVFMR1DEp1x_16F8' //Find placeID @: https://developers.google.com/places/place-id
        , render: ['reviews']
        , min_rating: 4
        , max_rows:4
    });
});*/



/*
 हरे कृष्ण हरे कृष्ण
 कृष्ण कृष्ण हरे हरे
 हरे रम हरे रम
 रम रम हरे हरे

 ﷲ اكبر

* */

/*AIzaSyCzzOEL5DctMotIDgUTCGJsu7YM1rEY0gA


AIzaSyCMsHKlZ_Q8-pBaTr7KjEpbcVON4GrAvg0*/







