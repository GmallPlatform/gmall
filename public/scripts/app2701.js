setMetaOG()
/*var a=342.23
var b=17;
 var c = Math.ceil10(a-(a/100*17),-2)
console.log(c)*/
//console.log(topPage)
angular.module('gmall', ['ngRoute',
    'ui.router','ngResource','gmall.controllers',
    'gmall.services',
    'gmall.directives',
    'gmall.filters',
    'ui.bootstrap',
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
    'vcRecaptcha'

        //'moment-picker',

    //'i-comments'
])
.run(['$rootScope', '$state', '$stateParams','global','globalSrv','$window','$location','$anchorScroll','$timeout','seoContent','$order','socket','Campaign','$user','Witget','$auth','Account','Sections','$q','Seopage','Keywords','$uibModal','Stuff','$injector',function ($rootScope,$state,$stateParams,global,globalSrv,$window,$location,$anchorScroll,$timeout,seoContent,$order,socket,Campaign,$user,Witget,$auth,Account,Sections,$q,Seopage,Keywords,$uibModal,Stuff,$injector){
    //console.log('sections-',global.get('sections'));

        //reCAPTCHA.setPublicKey('6LfW0gcUAAAAAPBl-LPkiKPpF2E84zUPTzg8WEKl');
    $(this).scrollTop(0);
    $rootScope.checkedMenu={m:false,slideMenu:false}
    $rootScope.stuffHost=stuffHost;
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.global=global;
    $rootScope.soundChat=document.getElementById('soundChat');
    function getPromise(q){
        return $q.when()

        $q(function(resolve,reject){

        })
    }
   // var i=0;
    $rootScope.$on('$stateChangeStart', function(event, to, toParams, fromState, fromParams){
        //console.log(to,toParams)

        if(to.name=='stuffs'||to.name=='stuffs.stuff'){
            var sec=global.get('sections').val.getOFA('url',toParams.groupUrl);

            global.set('sectionType',(sec && sec.type)?sec.type:'good');
            global.set('category',null);
            $rootScope.endLoadStuffs=false;
        } else{
            $rootScope.endLoadStuffs=true;
        }
        if(fromState.name=='stuffs' && to.name=='stuffs.stuff'){
            $rootScope.srollPosition=$(window).scrollTop();
        }
        $rootScope.checkedMenu.slideMenu=false;
        $rootScope.checkedMenu.m=false;
        /*if ((to.name=='page' || to.name=='page.pageDetail')&&(toParams.type!="News" && toParams.type!="Stat")){
            console.log('нет такоой статики');
                    event.preventDefault();
                    return $state.transitionTo('404');
                }*/
    })
    //console.log($location.url())
    var firstStateChenged;
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        if(!firstStateChenged){
            firstStateChenged=true;
            global.set('tempContent',templateContentHTML)

            //window.scrollTo(0, 0);
            //$('#tempContent').empty()
        }
        //console.log(to)
        /*$timeout(function(){
            if(to.name=='home'){
                console.log(to.name)
                ui_view.empty()
            }

        },200)*/

        // ***************** seo block ************************
        global.set('titles',global.get('store' ).val.seo);
        //console.log(global.get('titles'))
        global.set('category',null);
        //console.log($location.url())
        var url = $location.url();
        //url='/group/category?queryTag=new';

        //console.log('$location.search()',$location.search())
        if($location.search() && Object.keys($location.search()).length==1 && $location.search().subDomain){
            url=url.substring(0,url.indexOf('?'))
        }
        url=url.replace("?_escaped_fragment_","");
        //console.log('url',url)
        //console.log($location.search())
       // console.log(url,global.get('seopages').val)
        var seopage=global.get('seopages').val.getOFA('link',url)
        //console.log(seopage)
        if(seopage){
            if(seopage.data){
                global.set('currentSeopage',seopage.data);
            }else{
                var q = $q.when()
                    .then(function(){
                        return Seopage.getItem(seopage._id)
                    })
                global.set('currentSeopage',q);
                console.log('q promise')
            }
        }else{
            global.set('currentSeopage',null);
        }
        //console.log(global.get('seopages').val)

        //******************************************************
        if ($window.ga){
            //$window.ga('send', 'pageview', { page: $location.path() });
            $window.ga('send', 'pageview',$location.path());
        }

        if(from.name=='stuffs.stuff' && to.name=='stuffs' && ($rootScope.srollPosition||$rootScope.srollPosition==0)){
            $timeout(function(){
                window.scrollTo(0, $rootScope.srollPosition);
            },100)

            //$rootScope.srollPosition=$(window).scrollTop();
        }
        //console.log($rootScope.srollPosition)


        /*$timeout(function(){
                if ($rootScope.repeat){
                    console.log($rootScope.srollPosition);
                    //$location.hash();
                    
                    $location.hash($rootScope.repeat)
                    $anchorScroll();
                    $rootScope.repeat=false;
                }
            },10)*/
        if (to.name=='home') {
            seoContent.setDataHomePage();
        }
        /*if(to.name!='stuffs' || to.name!='stuffs.stuff'){
            $rootScope.endLoadStuffs=true;
        }*/
        $rootScope.endLoadStuffs=true;


    });
    $rootScope.$on('$stateChangeError', function(event,toState, toParams, fromState, fromParams, error) {
           console.log(error);
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
    function _logged(){
        var id=(global.get('user').val)?global.get('user').val._id:null;
        $rootScope.$broadcast('logged');
        socket.emit('getUser:data',{
            user:id,
            seller:global.get('store').val.seller._id,
            store:global.get('store').val._id
        })
    }
    socket.on('newMessage',function(data){
        console.log('newMessage')
        $rootScope.$broadcast('newMessage',data)
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
    $rootScope.globalProperty={entryStuff:null};
    //set global variables *********
    global.set('iPadVerticalWidth',770);
    global.set('iPadHorizontalWidth',1024);
    //*****************************
    $rootScope.setInitData = function(dataFromServer){
        var store=dataFromServer[0],
            crawler=dataFromServer[1],
            local=dataFromServer[2],
            mobile=dataFromServer[3],
            tablet=dataFromServer[4],
            sections=dataFromServer[5],
            brands=dataFromServer[6],
            //stats=dataFromServer[6],
            filters=dataFromServer[8],
            paps=dataFromServer[9],
            seopages=dataFromServer[10],
            coupons=dataFromServer[11],
            witget=dataFromServer[12],
            lang=dataFromServer[13],
            campaign=dataFromServer[14],
            masters=dataFromServer[15];
        //console.log('tablet',tablet)
        moment.locale(store.lang)
        //console.log(campaign)
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
        $rootScope.titles=global.get('titles');
        global.set('config',{currency:store.currency});
        global.set('currency',store.mainCurrency);
        if(!store.mainCurrency){store.mainCurrency="UAH"}
        global.set('rate',store.currency[store.mainCurrency][0]);

        global.set('masters',masters)

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
                    console.log(data);
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
        //console.log(lang)
        if(mobile){
            $rootScope.slideMenuWidth = '90%';
            $rootScope.checkedMenu.sizeEntryTime='90%';
            //console.log($rootScope.slideMenuWidth)
        }else if(tablet){
            $rootScope.slideMenuWidth = '60%';
            $rootScope.checkedMenu.sizeEntryTime='60%';
        }else{
            $rootScope.slideMenuWidth =global.get('store').val.template.menu2.slideMenuWidth;
            $rootScope.checkedMenu.sizeEntryTime='40%';
        }
        //$rootScope.slideMenuWidth=(!mobile)?global.get('store').val.slideMenuWidth:'90%'

        global.set('sections',sections);

        var categories=[];
        sections.forEach(function(section){
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
                    if(subSection.categories && subSection.categories.length){
                        subSection.categories.forEach(function(c){
                            //console.log(c.linkData)
                            c.section={url:section.url,name:section.name,subSectionName:subSection.name,
                                subSectionUrl:subSection.url}
                            c.linkData={groupUrl:section.url,categoryUrl:c.url,parentGroup:subSection.url,
                                searchStr:null,brand:null,brandTag:null,queryTag:null}
                            var parentSection= Sections.getParentSection(c.group,true);
                            if(parentSection && parentSection.url && parentSection.url!=c.section.url){
                                c.parentGroupUrl=parentSection.url;
                            }
                        })
                        categories.push.apply(categories,subSection.categories)
                    }
                })
            }
        })
        global.set('categories',categories);
        /*console.log(categories)
        console.log(brands)*/
        global.set('brands',brands);
        global.set('filters',filters);
        var filterTags=[];
        //console.log(filters)
        filters.forEach(function(filter){
            //console.log(filter)
            if(filter.tags && filter.tags.length){
                filter.tags.forEach(function (t,i) {
                    t.index=i;
                })
                //console.log(filter.tags)
                filterTags.push.apply(filterTags,filter.tags)
            }
        })
        global.set('filterTags',filterTags)
        global.set('paps',paps)
        global.set('coupons',coupons)
        global.set('seopages',seopages);
        global.set('campaign',campaign);

        $order.init('cart');
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
            cloneStore:_cloneStore
        }

        var delay;
        function _action(link){

            if(delay){return}
            //console.log(link)
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
                _witget('dateTime')
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
                    console.log(stuff)
                    if(stuff.orderType==1){
                        stuff.order()
                    }else if(stuff.orderType==2){
                        $rootScope.$broadcast('dateTime',stuff)
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
        global.set('functions',functions)
        function _changeCurrency(lan){
            // установка курса для данной валюты
            console.log(lan)
            if (global.get('config').val && global.get('config').val.currency
                && global.get('config').val.currency[lan]){
                global.set('currency',lan);
                global.set('rate',global.get('config').val.currency[lan][0])
                $order.changeCurrency(lan);
            }
            $rootScope.checkedMenu.slideMenu=false;
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
                $rootScope.globalProperty.stuffSearchList=[];
                return}
            //console.log('_searchStuffList');

            if(!$rootScope.globalProperty.searchList){$rootScope.globalProperty.searchList=true}
            $q.when()
                .then(function () {
                    return Stuff.search(searchStr);
                })
                .then(function (res) {
                    $rootScope.globalProperty.stuffSearchList=res;
                })
                .catch(function () {
                    $rootScope.globalProperty.stuffSearchList=[];
                })
            /*Stuff.search(searchStr,function(res){
                $rootScope.globalProperty.stuffSearchList=res;
            })*/
            /*$rootScope.globalProperty.stuffSearchList=[
            {name:'werwer'},
            {name:'werwer11'},
            {name:'werwer22'},
                ]*/

        }

        function _searchLostFocus(){
            //return;
            $timeout(function(){
                $rootScope.globalProperty.searchList=false
                $rootScope.globalProperty.stuffSearchList=[]
            },2000)

        }
        function _zoomImg(i,images){
            Stuff.zoomImg(i,images)
        }

        function _cloneStore(item){
            //console.log('clone store ')
            var cloneServ = $injector.get('cloneStore');
            cloneServ.clone(item)
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
            $window.location.href=url;
        }
        function _enter(){
            $rootScope.checkedMenu.slideMenu=false;
            $user.login()
        }
        function _logout(){
            $rootScope.$broadcast('logout');
            $rootScope.checkedMenu.slideMenu=false;
            $auth.logout()
            global.set('user',null)
            socket.emit('getUser:data',{user:null})
        }

        function _witget(type,argsObj){

            //console.log(type,stuff,store.texts)
            var data ={type:type}
            if(type=='subscription'){
                data.name=store.texts.subscriptionName[store.lang];
                data.desc=store.texts.subscriptionText[store.lang];
                return Witget.show(data);
            }if(type=='subscriptionAdd'){
                data.name=store.texts.subscriptionAddName[store.lang];
                data.desc=store.texts.subscriptionAddText[store.lang];
                return Witget.show(data);
            }else if(type=='call'){
                data.name=store.texts.callText[store.lang];
                data.desc=store.texts.callText[store.lang];
                return Witget.show(data);
            }else if(type=='feedback'){
                data.name=store.texts.feedbackName[store.lang];
                data.desc=store.texts.feedbackText[store.lang];
                return Witget.show(data);
            }else if(type=='dateTime'){
                //console.log(data)
                $rootScope.$broadcast('dateTime',argsObj)
                //$rootScope.globalProperty.entryStuff=(stuff)?stuff:null;
                if(!$rootScope.checkedMenu['entryTime']){
                    _openChatWitget('entryTime')
                }
                return;
            }
        }
        var clickForOpenChat;
        function _closeChatWitget(field){
            //console.log(field)
            if($rootScope.checkedMenu[field] && !clickForOpenChat){
                $rootScope.checkedMenu[field]=false;
            }
        }
        function _openChatWitget(field){
            clickForOpenChat=true;
            $rootScope.checkedMenu[field]=!$rootScope.checkedMenu[field];
            setTimeout(function(){
                clickForOpenChat=false;
            },200)
        }
        function _setRows(){
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
            //var w=1500;
            //console.log(w)
            if(w>1200){
                return 4
            }else if(w>global.get('iPadHorizontalWidth').val){
                return 3
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
            //e.stopPropagation();
            //console.log(event)
            if($rootScope.checkedMenu.slideMenu && !clickForOpen){
                $rootScope.checkedMenu.slideMenu=false;
            }
        }
        function _openSlideMenu(){
            clickForOpen=true;
            $rootScope.checkedMenu.slideMenu=!$rootScope.checkedMenu.slideMenu;
            setTimeout(function(){
                clickForOpen=false;
            },100)
        }

        $timeout(function(){
            if($stateParams['action']){
                _witget($stateParams.action)
                $location.search('action',null)
            }

        },1000)

        $rootScope.contentLoaded=true;
    }

    var langError,langOrder,langForm,langNote;
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
    $authProvider.baseUrl=userHost;
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
             keywords:'/api/collections/Keywords'
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
    globalProvider.set('category'); // data for seoContent
    globalProvider.set('brands','penging');
    globalProvider.set('filters','penging');
    globalProvider.set('filterTags','penging');// from filters

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
    globalProvider.set('iPadVerticalWidth')
    globalProvider.set('iPadHorizontalWidth')
    globalProvider.set('sectionType')
    globalProvider.set('tempContent')
    globalProvider.set('cache')
    globalProvider.set('langError')
    globalProvider.set('langNote')
    globalProvider.set('langOrder')
    globalProvider.set('langForm')



    
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

        .state('search', {
            url: '/search?searchStr',
            template:'<search-list></search-list>',
        })


        /*.state("subscription", {
            url: "/subscription",
            templateProvider: function(global,$http) {
                var url = 'views/'+global.get('store').val.template.folder+'/partials/subscription.html';
                return $http.get(url).then(function(tpl){return tpl.data;});
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
        .state("info", {
            url: "/info",
            template: '<items-list></items-list>',
        })
        .state("info.item", {
            url: "/:id?block",
            template: '<items-detail></items-detail>',
        })
        .state("campaign", {
            url: "/campaign",
            abstract:true,
            template:'<items-list></items-list>'
        })
        .state("campaign.detail", {
            url: "/:id",
            template:'<items-detail></items-detail>'
            //template:'<campaign-item-template></campaign-item-template>'
        })
        .state("stuffs", {
            templateUrl: function(){ return 'views/template/partials/stuffs/stuffs.html' },
            url: "/:groupUrl/:categoryUrl?parentGroup&categoryList&searchStr&queryTag&brand&brandTag",
            reloadOnSearch : true,
        })
        .state("stuffs.stuff", {
            url: "/:stuffUrl?param1&param2",
            //template:'<h1>ddd</h1>'
            templateUrl:'views/template/partials/stuffs/stuffDetail.html'
        })

}])


//http://briantford.com/blog/angular-hacking-core
//Hacking Core Directives in AngularJS
    .config(function ($provide) {
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
                            }else */
                            if(value &&  value.indexOf('images/') > -1 && value.indexOf('http') < 0){
                                //console.log(stuffHost+'/'+value)
                                attr.$set('src', photoHost+'/'+value);
                            }else {
                                attr.$set('src',value);
                            }
                        }else{
                            if(value){
                                /*if(value.indexOf('images/Store/') > -1){
                                    attr.$set('src', storeHost+'/'+value);
                                }else*/ if(value.indexOf('images/') > -1&& value.indexOf('http') < 0){
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
    })


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

/*
 हरे कृष्ण हरे कृष्ण
 कृष्ण कृष्ण हरे हरे
 हरे रम हरे रम
 रम रम हरे हरे

 ﷲ اكبر

* */






