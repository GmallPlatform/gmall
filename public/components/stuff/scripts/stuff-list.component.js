'use strict';
(function(){
    angular.module('gmall.controllers').controller('stuffListFromServerCtrl',stuffListFromServerCtrl);
    angular.module('gmall.services')
        .directive('stuffList',stuffListDirective)
        .directive('stuffListTemplate',stuffListTemplateDirective)
        .directive('stuffListTemplateList',stuffListTemplateDirectiveList)
        .directive('stuffListTemplateServer',stuffListTemplateServer) // список товаро на сайте у клиента
        .directive('stuffListTemplateCampaignList',stuffListTemplateDirectiveCampaignList)
        .directive('emptyList',emptyList)
        .directive('stuffInList',stuffInList)
        .directive('homePageStuffOwl',function(){return {
            scope: {
                homePageStuffOwl:'@',
                zoomImg:"@",
                stuffs:'@',
                items:"@",
                autoplay:'@',
                duration:'@',
                gallery:'='
            },
            bindToController: true,
            controllerAs: '$ctrl',
            /*require: {
                parent: '^dateTimeEntry'
            },*/
            controller: homePageStuffOwlCtrl}})
        .directive('homePageHtml',function(){return {
            restrict:'C',
            scope: true,
            bindToController: true,
            controllerAs: '$ctrl',
            controller: homePageHtmlCtrl}})

    homePageHtmlCtrl.$inject=['$scope','$rootScope','$timeout','$element','$compile','global','$q','$http']
    function homePageHtmlCtrl($scope,$rootScope,$timeout,$element,$compile,global,$q,$http){
        //console.log('homePageHtmlCtrl')
        var loaded=null;
        $rootScope.$on('$stateChangeStart', function(event, to, toParams, fromState, fromParams){
          if(to.name=='home' && !loaded){
              getHomePageHtml()
          }
        })
        function getHomePageHtml() {
            console.log('getHomePageHtml')
            $q.when()
                .then(function () {
                    return $http.get('homepageHTML.html')
                })
                .then(function (response) {
                    var linkFn = $compile(response.data.html);
                    var content = linkFn($scope);
                    $element.append(content);
                    loaded=true;
                })
                .catch(function (err) {
                    
                })

        }
    }

    homePageStuffOwlCtrl.$inject=['$scope','$timeout','$element','$compile','global']
    function homePageStuffOwlCtrl($scope,$timeout,$element,$compile,global){
            //console.log('homePageStuffOwlCtrl')
        /*if($element.context){
            if($element.context.attributes){
                console.log($element.context.attributes)
            }
        }*/
        var self = this;
        self.prev=prev;
        self.next=next;
        self.moment=moment;
        self.global=global;
        var imgs;
        self.zoomSliderImg=zoomSliderImg;
        var items=4,items3=3,items2=2,items1=1;
        var autoplay=false;
        var autoplayTimeout=4000;



        this.$onInit = function(){
            $timeout(function () {
                if(self.items){items=self.items}
                if(items==2){
                    items3=2;
                }else if(items==1){
                    items3=1;
                    items2=1;
                }
                if(self.autoplay){
                    autoplay=true;
                }

                if(self.duration){
                    try{
                        var duration=Number(self.duration)
                        if(duration>0 && duration<10){
                            autoplayTimeout=duration*1000;
                        }
                    }catch(err){console.log(err)}
                }


                self.$owl=$('body').find('#'+self.homePageStuffOwl)
                //console.log(self.$owl)
                self.$owl.on('initialized.owl.carousel', function(event) {
                    //console.log('initialized.owl.carousel for ',self.homePageStuffOwl)
                })
                var navLeft=$element.find('.nav-left')
                $(navLeft).click(function () {prev()})
                var navRight=$element.find('.nav-right')
                //console.log(navRight)
                $(navRight).click(function () {next()})
                activate()


            },100)

        }

        $scope.$watch(function () {
            return self.gallery
        },function (n,o) {
            //console.log(n,o)
            if(n && n.length){
                //console.log('reload gallery')
                var html=''
                imgs=[];
                //console.log(n.length)
                n.forEach(function (item,i) {
                    //console.log(photoHost)
                    if(photoHost){
                        item.src=photoHost+'/' + item.img;
                    }else{
                        item.src=item.img;
                    }

                    html+=
                        //'<div class="owl-item">' +
                            '<a>' +
                                '<span class="zoom-plus" data-i="'+i+'">' +
                                    '<span class="icon-zoom-img"></span>' +
                                    '<span class="icon-zoom-inverse"></span>' +
                                '</span>' +
                                '<img class="img-responsive2" src="'+item.src+'">' +
                            '</a>' +
                        //'</div>'
                    imgs.push({index:i,img:item.src})
                })
                self.$owl.trigger('replace.owl.carousel', html).trigger('to.owl.carousel',0).trigger('refresh.owl.carousel');
                $timeout(function () {
                    self.$owl.trigger('refresh.owl.carousel');
                },10)
                $timeout(function () {
                    if(self.zoomImg){
                        var spans=self.$owl.find('span.zoom-plus')
                        //console.log(spans)
                        spans.each(function (i,img) {
                            $(img).click(function (event) {
                                //console.log(img)

                                var ii=($(img).data('i')>=0)?$(img).data('i'):0;
                                /*console.log(i,imgs)
                                var imgTemp = imgs[i].img
                                var imgsTemp=imgs.reduce(function (o,item) {
                                    var i=o.getOFA('img',item.img)
                                    if(!i){
                                        o.push(item)
                                    }
                                    return o;
                                },[])
                                var ii=0;
                                for(var j=0;j<imgsTemp.length;j++){
                                    if(imgsTemp[j].img==imgTemp){
                                        ii=j;
                                        break;
                                    }
                                }
                                console.log(imgsTemp)*/
                                global.get('functions').val.zoomImg(ii,imgs,'home')
                            })
                        })

                    }

                },400)
            }
        })

        var items=(self.items)?self.items:4;

        var  activate = function(){
            $timeout(function(){
                //console.log('?????')
                var carousel_Settings={
                    loop:true,
                    margin:10,
                    responsiveClass:true,
                    autoplay:autoplay,
                    autoplayHoverPause:true,
                    autoplayTimeout:autoplayTimeout,
                    responsive:{
                        0:{
                            items:items1,
                            nav:false,
                            dots:true
                        },
                        380:{
                            items:items2,
                            nav:false,
                            dots:true
                        },
                        1068:{
                            items:items3,
                            nav:false,
                            dots:true
                        },
                        1400:{
                            items:items,
                            nav:false,
                            dots:true
                        }
                    }
                };
                //console.log(carousel_Settings)
                self.$owl.owlCarousel( carousel_Settings );
                var imgsEl=self.$owl.find('img')
                if(imgsEl && imgsEl.each){
                    imgs=[];
                    imgsEl.each(function (i,img) {
                        imgs.push({index:i,img:img.src,el:imgsEl[i]})
                        //console.log(img.src)
                    })
                }

                //console.log(imgs)
                if(self.zoomImg){
                    var spans=self.$owl.find('span.zoom-plus')
                    //console.log(spans)
                    spans.each(function (i,img) {
                        $(img).click(function (event) {
                            //console.log(i,imgs)
                            var imgTemp = imgs[i].img
                            var imgsTemp=imgs.reduce(function (o,item) {
                                var i=o.getOFA('img',item.img)
                                if(!i){
                                    o.push(item)
                                }
                                return o;
                            },[])
                            var ii=0;
                            for(var j=0;j<imgsTemp.length;j++){
                                if(imgsTemp[j].img==imgTemp){
                                    ii=j;
                                    break;
                                }
                            }
                            global.get('functions').val.zoomImg(ii,imgsTemp,'home')
                        })
                    })

                }
            },200)
        }

        function prev() {
            //console.log('prev')
            self.$owl.trigger('prev.owl.carousel', [self.selectedDay-3,300]);
        }
        function next() {
            //console.log('next')
            self.$owl.trigger('next.owl.carousel', [self.selectedDay+3,300]);
        }
        function zoomSliderImg(i) {
            $rootScope.zoomSliderImg(i,imgs)
        }
    }



    function emptyList(){
        return {
            templateUrl: 'views/template/partials/stuffs/emptyList.html',
            restrict:'E'
        }
    }
    function stuffListDirective(){
        return {
            scope: {
                //filtersBlock:'='
            },
            bindToController: true,
            controller: stuffListCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/stuff/stuffsAdminList.html',
            restrict:'E'
        }
    }
    function stuffListTemplateDirective(global){
        return {
            scope: {
                filtersBlock:'@'
            },
            bindToController: true,
            controller: stuffListCtrl,
            controllerAs: '$ctrl',
            templateUrl:'views/template/partials/stuffs/stuffs-block.html',
            /*templateProvider: function(global,$http) {

                var url = 'views/'+global.get('store').val.template.folder+'/partials/stuff/stuffs.html';
                console.log(url)
                return $http.get(url).then(function(tpl){return tpl.data;});
            },*/
            restrict:'E'
        }
    }
    function stuffListTemplateDirectiveList(global){
        return {
            scope: {},
            bindToController: true,
            controller: stuffListCtrl,

            controllerAs: '$ctrl',
            templateUrl: function() {
                return 'views/template/partials/stuffs/stuffs-list/'+global.get('sectionType').val
            },
            //template:"<div ui-view></div></div><div></div>",
            //controller: stuffListFromServerCtrl,


            restrict:'E'
        }
    }
    function stuffInList(global,$timeout){
        return {
            scope: {
                stuffInList:'@'
            },
            bindToController: true,
            controllerAs: '$ctrl',
            restrict:'A',
            controller:function($scope,Stuff,global,$attrs,$stateParams,$rootScope){
                var self=this;
                self.global=global;
                $scope.global=global;
                //console.log($scope.global)

                //console.log(JSON.parse($attrs.stuffInList))
                $scope.stuff=JSON.parse($attrs.stuffInList)
                /*if($scope.stuff._id=='5aaf95fddfcc1b35f65cc17d'){
                    console.log(JSON.parse(JSON.stringify($scope.stuff)))
                }*/

                $scope.stuff = Stuff.setDataForStuff($scope.stuff,global.get('filterTags').val,'stuffs')
                $scope.stuff.stateObj=angular.copy($stateParams);
                //console.log($scope.stuff.stateObj)
                $scope.stuff.stateObj.stuffUrl=$scope.stuff.url;

                self.stuff=$scope.stuff;
                self.getMastersName=getMastersName
                self.getAveragePrice=getAveragePrice;
                var currency=global.get('currency').val
                var formatAverage=global.get('store').val.currency[currency][4];
                var del=-1;
                if(formatAverage==1){del=-1}else if(formatAverage==2){del=0}else if(formatAverage==3){del=1} else if(formatAverage==4){del=2}
                self.formatPrice=global.get('store').val.currency[currency][5];
                if(typeof self.formatPrice=='undefined'){
                    self.formatPrice=2;
                }
                self.stuff.currencySymbol=(global.get('store').val.currency[global.get('currency').val] && global.get('store').val.currency[global.get('currency').val][2])?global.get('store').val.currency[global.get('currency').val][2]:'';
                $rootScope.$on('changeCurrency',function () {
                    //console.log(global.get('currency').val,global.get('store').val.currency)
                    currency=global.get('currency').val
                    formatAverage=global.get('store').val.currency[currency][4];
                    self.formatPrice=global.get('store').val.currency[currency][5];
                    //console.log('self.formatPrice',self.formatPrice)
                    if(typeof self.formatPrice=='undefined'){
                        self.formatPrice=2;
                    }
                    del=-1;
                    if(formatAverage==1){del=-1}else if(formatAverage==2){del=0}else if(formatAverage==3){del=1} else if(formatAverage==4){del=2}
                    self.stuff.currencySymbol=(global.get('store').val.currency[global.get('currency').val] && global.get('store').val.currency[global.get('currency').val][2])?global.get('store').val.currency[global.get('currency').val][2]:global.get('currency').val;
                    //console.log(formatAverage,del)
                })
                //console.log(formatAverage,del)
                function getAveragePrice(price) {
                    //console.log(price)
                    if(!price){return}

                    if(!formatAverage){
                        return price*global.get('rate').val
                    }else{

                        //console.log(price*global.get('rate').val,Math.round10(price*global.get('rate').val,del),del)
                        var p = Math.round10(price*global.get('rate').val,del)
                        var del1=del;
                        while(!p){
                            p = Math.round10(price*global.get('rate').val,--del1)
                        }
                        return p;

                    }


                    /*if(global.get('rate').val==1){
                        return price
                    }else{
                        if(!formatAverage){
                            return price*global.get('rate').val
                        }else{

                            //console.log(price*global.get('rate').val,Math.round10(price*global.get('rate').val,del),del)
                            var p = Math.round10(price*global.get('rate').val,del)
                            var del1=del;
                            while(!p){
                                p = Math.round10(price*global.get('rate').val,--del1)
                            }
                            return p;

                        }
                    }*/


                }

                //console.log(self.stuff)


                function getMastersName() {
                    self.stuff.masters=[]
                    global.get('masters').val.forEach(function (m) {
                        if(m.stuffs && m.stuffs.length){
                            if(m.stuffs.indexOf(self.stuff._id)>-1){
                                var o ={
                                    name:m.name,
                                    url:m.url,
                                }
                                self.stuff.masters.push(o)
                            }
                        }
                    })
                }
                getMastersName();
            },
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                $timeout(function () {
                    if(global.get('stuffsInList').val){
                        //console.log(element[0].parentElement && element[0].parentElement.parentElement && element[0].parentElement.parentElement.id && global.get('stuffsInList').val[element[0].parentElement.parentElement.id])
                        /*console.log(element[0])
                        console.log(element[0].parentElement )
                        console.log(element[0].parentElement && element[0].parentElement.parentElement)
                        console.log(element[0].parentElement && element[0].parentElement.parentElement && element[0].parentElement.parentElement.id)
                        console.log(element[0].parentElement && element[0].parentElement.parentElement && element[0].parentElement.parentElement.id && global.get('stuffsInList').val[element[0].parentElement.parentElement.id])*/
                        if(element[0].parentElement && element[0].parentElement.parentElement && element[0].parentElement.parentElement.id && global.get('stuffsInList').val[element[0].parentElement.parentElement.id]){
                            global.get('stuffsInList').val[element[0].parentElement.parentElement.id].push(scope.stuff)
                            //console.log(scope.stuff)
                        }
                    }
                    //console.log(global.get('stuffsInList').val)
                },200)
                //console.log(scope.stuff)
                transclude(scope, function(clone) {
                    /*if(scope.stuff._id=='5aaf95fddfcc1b35f65cc17d'){
                        console.log(element,scope.stuff)
                    }*/

                    element.append(clone);
                });

            }

        }
    }
    function stuffListTemplateServer(){
        return {
            scope: {},
            bindToController: true,
            controllerAs: '$ctrl',
            template:"<div></div>",
            controller: stuffListFromServerCtrl,
            restrict:'E'
        }
    }

    stuffListFromServerCtrl.$inject=['$scope','$state','$compile','$element','$window','Stuff','$rootScope','$q','$uibModal','global','exception','FilterTags','Filters','Confirm','Helper','anchorSmoothScroll','Photo','$timeout','$anchorScroll','Category','Brands','BrandTags','seoContent','AddInfo','$http','$location','$sce'];
    function stuffListFromServerCtrl($scope,$state,$compile,$element,$window,Stuff,$rootScope,$q,$uibModal,global,exception,FilterTags,Filters,Confirm,Helper,anchorSmoothScroll,Photo,$timeout,$anchorScroll,Category,Brands,BrandTags,seoContent,AddInfo,$http,$location,$sce){

        //anchorSmoothScroll.scrollTo('topPage')
        console.log('stuffListFromServerCtrl')

        var stuffsInList = {'td-list-1':[],'td-list-2':[],'td-list-3':[],'td-list-4':[],'td-list-5':[],'td-list-6':[]}
        global.set('stuffsInList',stuffsInList)
        var self = this;
        $scope.global=global;
        self.stuffs={}
        self.Items=Stuff;
        self.mobile=global.get('mobile').val;
        self.global=global;
        self.globalProperty=$rootScope.globalProperty;
        self.$state=$rootScope.$state;
        self.$stateParams=$rootScope.$stateParams;
        self.query={};
        self.paginate={page:0,rows:20,items:0}


        self.filterList=filterList;
        self.initStuff=setDataForStuff;

        self.getList=getList;
        $scope.$on('addBlockAfterScroll',function () {
            //console.log(" $rootScope.$on('addBlockAfterScroll', from stuff-list")
            $scope.addBlockAfterScroll()
        })




        


        var pages=[0]
        var perPage=20;
        var rows=global.get('functions').val.setRows();


        if(global.get('store').val.template.stuffListType[global.get('sectionType').val] &&
            global.get('store').val.template.stuffListType[global.get('sectionType').val].perPage){
            //console.log('perPage')
            perPage = global.get('store').val.template.stuffListType[global.get('sectionType').val].perPage;
            self.paginate.rows=perPage;
        }
        //console.log(global.get('sectionType').val)
        var url='views/template/partials/stuffs/stuffs-list/'+global.get('sectionType').val+'/'+$rootScope.$stateParams.groupUrl+'/'+$rootScope.$stateParams.categoryUrl;
        var waiting,lastElement,page=0,waitingDiv;
        var td1,td2,td3,td4,td5;
        var color = (global.get('store').val.template.dimScreenColor)?global.get('store').val.template.dimScreenColor:"#000000"
        var BGcolor = (global.get('store').val.template.dimScreenBGColor)?global.get('store').val.template.dimScreenBGColor:"#F5F5F5"
        var innerWaitingDiv=[
            '<div class="spinner-box clearfix text-center" style="width:100%;height:200px;background-color:'+BGcolor+';color:'+color+'">',
            '<span class="icon-spinner-img"></span>',
            //'<img class="spinner" src="/img/spinner.gif" style="margin-top: 70px">',
            '</div>'
        ].join('')
        var tempContentIs=false;
        $q.when()
            .then(function(){
                var params ={group:self.$stateParams.groupUrl,category:self.$stateParams.categoryUrl}
                var query={
                    brand:self.$stateParams.brand,
                    brandTag:self.$stateParams.brandTag,
                };
                for(var k in self.$stateParams){
                    params[k]=self.$stateParams[k]
                }
                //console.log('params',params)
                self.query=dQ.getQuery(params)
                //console.log('self.query',self.query)

                if(self.query && self.query['priceForFilter']){
                    if(global.get('rate').val!=1){
                        self.query['priceForFilter'].$gte=Math.ceil10(self.query['priceForFilter'].$gte/global.get('rate').val,0)
                        self.query['priceForFilter'].$lte=Math.ceil10(self.query['priceForFilter'].$lte/global.get('rate').val,0)
                    }
                }


                if(global.get('tempContent').val){
                    if($state.current.name.indexOf('.stuff')<0){
                        //var html = global.get('tempContent').val;
                        //$('#tempContent').remove()
                        var html = $('#tempContent').detach();
                        var o ={data:{html:html}}
                        //console.log(tempTitles)
                        if(tempTitles){
                            o.data.titles=tempTitles
                        }
                        return o;
                    }else{
                        return null
                    }
                }else{
                    //console.log(url.trim())

                    return $q.when(self.query)
                        .then(function (query) {
                            /*console.log('query',query)
                            console.log(url)*/
                            return $http.get(url.trim()+'.html', {params:{pages:pages,perPage:perPage,rows:rows,query:query,url:$location.url()}})
                        })




                }
            })
            .then(function (response) {
                if(!response){$rootScope.$emit('$stateChangeEndToStuff');return;}
                //console.log(response.data.html)
                if(global.get('tempContent').val){
                    global.set('tempContent',null)
                    var content = response.data.html;
                }else{
                    var linkFn = $compile(response.data.html);
                    var content = linkFn($scope);
                }

                $element.append(content);
                var style = $element.find('style')
                if(style && style[0]){
                    //console.log(style[0]);
                }
                //console.log(response.data.titles)
                var titles = {};
                if(response.data.titles && response.data.titles.title){
                    for(var k in response.data.titles){
                        if(response.data.titles[k]){
                            if(k=='canonical'){
                                titles[k] = $sce.trustAsResourceUrl(response.data.titles[k])
                            }else if(k!='desc'){
                                titles[k]= response.data.titles[k]
                            }
                        }

                    }
                    global.set('titles',titles)
                }else{
                    seoContent.setSeopageData()
                }
                //console.log(global.get('titles').val)

                //seoContent.setDataCatalog()

                waitingDiv=$('#paginateData'+page);
                self.totalQty=waitingDiv.data('total');
                self.paginate.items=self.totalQty;
                //console.log(self.totalQty)
                self.currentQty=waitingDiv.data('qty');
                self.page=waitingDiv.data('page');
                self.lastItemId=waitingDiv.data('lastItemId');
                td1=$('#td-list-1 .td-wrapper');
                td2=$('#td-list-2 .td-wrapper');
                td3=$('#td-list-3 .td-wrapper');
                td4=$('#td-list-4 .td-wrapper');
                td5=$('#td-list-5 .td-wrapper');
                //console.log(self.totalQty,self.currentQty,page,self.lastItemId)
                $timeout(function(){
                    $anchorScroll()
                    lastElement=(self.lastItemId!=null)?$('#list'+self.lastItemId):null;
                    //console.log(lastElement)
                })
                $timeout(function () {
                    $scope.$broadcast('rzSliderForceRender');
                },500);
                var addBlockAfterScroll = function(){
                    if($state.current.name!='stuffs'){return}
                    //console.log('addBlockAfterScroll')
                    if(!waiting && lastElement && $(lastElement).isOnScreen() && self.currentQty<self.totalQty){
                        /*console.log($(lastElement).offset())
                        console.log('addBlockAfterScroll start')
                        console.log(lastElement)
                        console.log($(lastElement).isOnScreen())*/
                        waiting=true;
                        page++
                        $q.when()
                            .then(function(){
                                //console.log({params:{pages:[page],perPage:perPage,rows:rows,query:self.query}})
                                waitingDiv.html(innerWaitingDiv);
                                return $http.get(url.trim()+'.html', {params:{pages:[page],perPage:perPage,rows:rows,query:self.query,url:$location.url()}})
                               // return $http.post(url.trim(),{pages:[page],perPage:perPage,rows:rows,query:self.query})
                            })
                            .then(function(response){
                                if(!response){return;}
                                lastElement=null;
                                waitingDiv.html('');
                                var addHtml=angular.element(response.data.html)
                                var atd1,atd2,atd3,atd4,atd5;
                                if(addHtml.find('#td-list-1 .td-wrapper').html()){
                                    atd1=$compile(addHtml.find('#td-list-1 .td-wrapper').html())($scope)
                                }
                                if(addHtml.find('#td-list-2 .td-wrapper').html()){
                                    atd2=$compile(addHtml.find('#td-list-2 .td-wrapper').html())($scope)
                                }
                                if(addHtml.find('#td-list-3 .td-wrapper').html()){
                                    atd3=$compile(addHtml.find('#td-list-3 .td-wrapper').html())($scope)
                                }
                                if(addHtml.find('#td-list-4 .td-wrapper').html()){
                                    atd4=$compile(addHtml.find('#td-list-4 .td-wrapper').html())($scope)
                                }
                                if(addHtml.find('#td-list-5 .td-wrapper').html()){
                                    atd5=$compile(addHtml.find('#td-list-5 .td-wrapper').html())($scope)
                                }
                                if(atd5){td5.append(atd5)}
                                if(atd4){td4.append(atd4)}
                                if(atd3){td3.append(atd3)}
                                if(atd2){td2.append(atd2)}
                                if(atd1){td1.append(atd1)}
                                //console.log(addHtml.find('#td-list-4 .td-wrapper').html())



                                self.lastItemId=addHtml.find('#paginateData'+page).data('lastItemId');
                                self.currentQty+=addHtml.find('#paginateData'+page).data('qty');
                                //console.log(addHtml.find('#paginateData'+page))
                                //console.log(self.currentQty,self.totalQty)
                                $timeout(function () {
                                    lastElement=(self.lastItemId!=null)?$('#list'+self.lastItemId):null;
                                    //console.log(lastElement)
                                    waiting=false;
                                },200)
                            })
                    }
                }


                if(!global.get('store').val.template.stuffListType[global.get('sectionType').val] ||
                    !global.get('store').val.template.stuffListType[global.get('sectionType').val].paginate){
                    angular.element($window).on('scroll', addBlockAfterScroll);
                }


                $scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', addBlockAfterScroll);
                });
                $timeout(function(){
                    $rootScope.$emit('$stateChangeEndToStuff');
                })
            })

        $scope.addBlockAfterScroll = function(){
            //console.log('$scope.addBlockAfterScroll',self.currentQty,self.totalQty)
            if(!waiting && lastElement && self.currentQty<self.totalQty){
                waiting=true;
                page++
                $rootScope.$emit('$stateChangeStartToStuff');
                $q.when()
                    .then(function(){
                        //console.log({params:{pages:[page],perPage:perPage,rows:rows,query:self.query}})
                        waitingDiv.html(innerWaitingDiv);
                        return $http.get(url.trim()+'.html', {params:{pages:[page],perPage:perPage,rows:rows,query:self.query,url:$location.url()}})
                        // return $http.post(url.trim(),{pages:[page],perPage:perPage,rows:rows,query:self.query})
                    })
                    .then(function(response){
                        if(!response){return;}
                        lastElement=null;
                        waitingDiv.html('');
                        var addHtml=angular.element(response.data.html)
                        var atd1,atd2,atd3,atd4,atd5;
                        if(addHtml.find('#td-list-1 .td-wrapper').html()){
                            atd1=$compile(addHtml.find('#td-list-1 .td-wrapper').html())($scope)
                        }
                        if(addHtml.find('#td-list-2 .td-wrapper').html()){
                            atd2=$compile(addHtml.find('#td-list-2 .td-wrapper').html())($scope)
                        }
                        if(addHtml.find('#td-list-3 .td-wrapper').html()){
                            atd3=$compile(addHtml.find('#td-list-3 .td-wrapper').html())($scope)
                        }
                        if(addHtml.find('#td-list-4 .td-wrapper').html()){
                            atd4=$compile(addHtml.find('#td-list-4 .td-wrapper').html())($scope)
                        }
                        if(addHtml.find('#td-list-5 .td-wrapper').html()){
                            atd5=$compile(addHtml.find('#td-list-5 .td-wrapper').html())($scope)
                        }
                        if(atd5){td5.append(atd5)}
                        if(atd4){td4.append(atd4)}
                        if(atd3){td3.append(atd3)}
                        if(atd2){td2.append(atd2)}
                        if(atd1){td1.append(atd1)}
                        //console.log(addHtml.find('#td-list-4 .td-wrapper').html())



                        self.lastItemId=addHtml.find('#paginateData'+page).data('lastItemId');
                        self.currentQty+=addHtml.find('#paginateData'+page).data('qty');
                        //console.log(addHtml.find('#paginateData'+page))
                        //console.log(self.currentQty,self.totalQty)
                        $timeout(function () {
                            lastElement=(self.lastItemId!=null)?$('#list'+self.lastItemId):null;
                            //console.log(lastElement)
                            waiting=false;
                        },200)
                        $timeout(function () {
                            //console.log("$rootScope.$emit('addBlockAfterScrollDone') from stuff-list")
                            $rootScope.$broadcast('addBlockAfterScrollDone')
                            $rootScope.$emit('$stateChangeEndToStuff')

                        },300)
                    })
                    .catch(function () {
                        $rootScope.$emit('$stateChangeEndToStuff')
                    })
            }else{
                $timeout(function () {
                    $rootScope.$broadcast('addBlockAfterScrollDone')
                },200)

            }
        }

        function filterList(){
            console.log('filterList22')
            $q.when()
                .then(function(){
                    return self.Items.setFilters()
                })
                .catch(function(err){
                    //console.log(err)
                })
        }
        function setDataForStuff(stuff) {
            //console.log(stuff.name)
            /*if($rootScope.$state.current.name!='stuffs'){
                console.log('exit')
            }*/
            //console.log(stuff.name)
            stuff = Stuff.setDataForStuff(stuff,global.get('filterTags').val)
            stuff = angular.copy(stuff)
            console.log(stuff.name+' '+stuff.artikul,stuff.sticker)
            return stuff;
        }
        function getList() {
            $q.when()
                .then(function(){
                    return $http.get(url.trim()+'.html', {params:{pages:[self.paginate.page],perPage:perPage,rows:rows,query:self.query,url:$location.url()}})
                    //return $http.post(url.trim(),{pages:[self.paginate.page],perPage:self.paginate.rows,rows:rows,query:self.query})
                })
                .then(function(response){
                    if(!response){return;}
                    $anchorScroll()
                    lastElement=null;
                    var addHtml=angular.element(response.data.html)
                    if(addHtml.find('#td-list-1').html()){
                        var atd1=$compile(addHtml.find('#td-list-1').html())($scope)
                        td1.html(atd1)
                    }
                    if(addHtml.find('#td-list-2').html()){
                        var atd2=$compile(addHtml.find('#td-list-2').html())($scope)
                        td2.html(atd2)
                    }
                    if(addHtml.find('#td-list-3').html()){
                        var atd3=$compile(addHtml.find('#td-list-3').html())($scope)
                        td3.html(atd3)
                    }
                    if(addHtml.find('#td-list-4').html()){
                        var atd4=$compile(addHtml.find('#td-list-4').html())($scope)
                        td4.html(atd4)
                    }
                    self.lastItemId=addHtml.find('#paginateData'+page).data('lastItemId');
                    self.currentQty+=addHtml.find('#paginateData'+page).data('qty');
                    $timeout(function () {
                        lastElement=(self.lastItemId!=null)?$('#list'+self.lastItemId):null;
                    },200)
                })
        }

    }
    function stuffListTemplateDirectiveCampaignList(){
        return {
            scope: {
                campaignCondition:'@',
            },
            bindToController: true,
            controller: campaignStuffListCtrl,
            controllerAs: '$ctrl',
            template:"<div></div>",
            /*templateUrl: function (el,attr) {
                var campaign = attr.campaign;
                var url = 'views/template/partials/'+campaign+'/stuffs';
                return url
            },*/
            restrict:'E'
        }
    }
    campaignStuffListCtrl.$inject=['$scope','$state','$compile','$element','$window','Stuff','$rootScope','$q','$uibModal','global','exception','FilterTags','Filters','Confirm','Helper','anchorSmoothScroll','Photo','$timeout','$anchorScroll','Category','Brands','BrandTags','seoContent','AddInfo','$http','$location'];
    function campaignStuffListCtrl($scope,$state,$compile,$element,$window,Stuff,$rootScope,$q,$uibModal,global,exception,FilterTags,Filters,Confirm,Helper,anchorSmoothScroll,Photo,$timeout,$anchorScroll,Category,Brands,BrandTags,seoContent,AddInfo,$http,$location){
        anchorSmoothScroll.scrollTo('topPage')

        var stuffsInList = {'td-list-1':[],'td-list-2':[],'td-list-3':[],'td-list-4':[],'td-list-5':[],'td-list-6':[]}
        global.set('stuffsInList',stuffsInList)
        var self = this;
        self.stuffs={}
        self.Items=Stuff;
        self.mobile=global.get('mobile').val;
        self.global=global;
        self.globalProperty=$rootScope.globalProperty;
        self.$state=$rootScope.$state;
        self.$stateParams=$rootScope.$stateParams;
        self.query={};
        self.paginate={page:0,rows:20,items:0}

        var cartType = ($element.data('cart'))?$element.data('cart'):'good'
        var campaignCondition = ($element.data('condition'))?$element.data('condition'):'stuffs'


        self.filterList=filterList;
        self.initStuff=setDataForStuff;
        self.getList=getList;
        $scope.$on('addBlockAfterScroll',function () {
            //console.log(" $rootScope.$on('addBlockAfterScroll', from stuff-list")
            $scope.addBlockAfterScroll()
        })





        var pages=[0]
        var perPage=20;
        var rows=global.get('functions').val.setRows();


        if(global.get('store').val.template.stuffListType[cartType] &&
            global.get('store').val.template.stuffListType[cartType].perPage){
            //console.log('perPage')
            perPage = global.get('store').val.template.stuffListType[cartType].perPage;
            self.paginate.rows=perPage;
        }
        var waiting,lastElement,page=0,waitingDiv;
        var td1,td2,td3,td4,td5;
        var color = (global.get('store').val.template.dimScreenColor)?global.get('store').val.template.dimScreenColor:"#000000"
        var BGcolor = (global.get('store').val.template.dimScreenBGColor)?global.get('store').val.template.dimScreenBGColor:"#F5F5F5"
        var innerWaitingDiv=[
            '<div class="spinner-box clearfix text-center" style="width:100%;height:200px;background-color:'+BGcolor+';color:'+color+'">',
            '<span class="icon-spinner-img"></span>',
            //'<img class="spinner" src="/img/spinner.gif" style="margin-top: 70px">',
            '</div>'
        ].join('')
        var campaign = $element.data('campaign');
        var url = 'views/template/partials/'+campaign+'/'+campaignCondition;
        $q.when()
            .then(function(){
                return $http.get(url, {params:{pages:pages,perPage:perPage,rows:rows}})
            })
            .then(function (response) {
                if(!response){$rootScope.$emit('$stateChangeEndToStuff');return;}
                //console.log(response.data.html)
                var linkFn = $compile(response.data.html);
                var content = linkFn($scope);
                $element.append(content);
                var style = $element.find('style')
                if(style && style[0]){
                    //console.log(style[0]);
                }

                waitingDiv=$('#paginateData'+page);
                self.totalQty=waitingDiv.data('total');
                self.paginate.items=self.totalQty;
                //console.log(self.totalQty)
                self.currentQty=waitingDiv.data('qty');
                self.page=waitingDiv.data('page');
                self.lastItemId=waitingDiv.data('lastItemId');
                td1=$('#td-list-1 .td-wrapper');
                td2=$('#td-list-2 .td-wrapper');
                td3=$('#td-list-3 .td-wrapper');
                td4=$('#td-list-4 .td-wrapper');
                td5=$('#td-list-5 .td-wrapper');
                //console.log(self.totalQty,self.currentQty,page,self.lastItemId)
                $timeout(function(){
                    $anchorScroll()
                    lastElement=(self.lastItemId!=null)?$('#list'+self.lastItemId):null;
                    //console.log(lastElement)
                })

                var addBlockAfterScroll = function(){
                    if(!waiting && lastElement && $(lastElement).isOnScreen() && self.currentQty<self.totalQty){
                        waiting=true;
                        page++
                        $q.when()
                            .then(function(){
                                //console.log({params:{pages:[page],perPage:perPage,rows:rows,query:self.query}})
                                waitingDiv.html(innerWaitingDiv);
                                return $http.get(url, {params:{pages:[page],perPage:perPage,rows:rows}})
                                // return $http.post(url.trim(),{pages:[page],perPage:perPage,rows:rows,query:self.query})
                            })
                            .then(function(response){
                                if(!response){return;}
                                lastElement=null;
                                waitingDiv.html('');
                                var addHtml=angular.element(response.data.html)
                                var atd1,atd2,atd3,atd4,atd5;
                                if(addHtml.find('#td-list-1 .td-wrapper').html()){
                                    atd1=$compile(addHtml.find('#td-list-1 .td-wrapper').html())($scope)
                                }
                                if(addHtml.find('#td-list-2 .td-wrapper').html()){
                                    atd2=$compile(addHtml.find('#td-list-2 .td-wrapper').html())($scope)
                                }
                                if(addHtml.find('#td-list-3 .td-wrapper').html()){
                                    atd3=$compile(addHtml.find('#td-list-3 .td-wrapper').html())($scope)
                                }
                                if(addHtml.find('#td-list-4 .td-wrapper').html()){
                                    atd4=$compile(addHtml.find('#td-list-4 .td-wrapper').html())($scope)
                                }
                                if(addHtml.find('#td-list-5 .td-wrapper').html()){
                                    atd5=$compile(addHtml.find('#td-list-5 .td-wrapper').html())($scope)
                                }
                                if(atd5){td5.append(atd5)}
                                if(atd4){td4.append(atd4)}
                                if(atd3){td3.append(atd3)}
                                if(atd2){td2.append(atd2)}
                                if(atd1){td1.append(atd1)}
                                //console.log(addHtml.find('#td-list-4 .td-wrapper').html())



                                self.lastItemId=addHtml.find('#paginateData'+page).data('lastItemId');
                                self.currentQty+=addHtml.find('#paginateData'+page).data('qty');
                                //console.log(addHtml.find('#paginateData'+page))
                                //console.log(self.currentQty,self.totalQty)
                                $timeout(function () {
                                    lastElement=(self.lastItemId!=null)?$('#list'+self.lastItemId):null;
                                    //console.log(lastElement)
                                    waiting=false;
                                },200)
                            })
                    }
                }


                if(!global.get('store').val.template.stuffListType[cartType] ||
                    !global.get('store').val.template.stuffListType[cartType].paginate){
                    angular.element($window).on('scroll', addBlockAfterScroll);
                }
                $scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', addBlockAfterScroll);
                });
                $timeout(function(){
                    $rootScope.$emit('$stateChangeEndToStuff');
                })
            })

        $scope.addBlockAfterScroll = function(){
            if(!waiting && lastElement && self.currentQty<self.totalQty){
                waiting=true;
                page++
                $rootScope.$emit('$stateChangeStartToStuff');
                $q.when()
                    .then(function(){
                        //console.log({params:{pages:[page],perPage:perPage,rows:rows,query:self.query}})
                        waitingDiv.html(innerWaitingDiv);
                        return $http.get(url, {params:{pages:[page],perPage:perPage,rows:rows}})
                        // return $http.post(url.trim(),{pages:[page],perPage:perPage,rows:rows,query:self.query})
                    })
                    .then(function(response){
                        if(!response){return;}
                        lastElement=null;
                        waitingDiv.html('');
                        var addHtml=angular.element(response.data.html)
                        var atd1,atd2,atd3,atd4,atd5;
                        if(addHtml.find('#td-list-1 .td-wrapper').html()){
                            atd1=$compile(addHtml.find('#td-list-1 .td-wrapper').html())($scope)
                        }
                        if(addHtml.find('#td-list-2 .td-wrapper').html()){
                            atd2=$compile(addHtml.find('#td-list-2 .td-wrapper').html())($scope)
                        }
                        if(addHtml.find('#td-list-3 .td-wrapper').html()){
                            atd3=$compile(addHtml.find('#td-list-3 .td-wrapper').html())($scope)
                        }
                        if(addHtml.find('#td-list-4 .td-wrapper').html()){
                            atd4=$compile(addHtml.find('#td-list-4 .td-wrapper').html())($scope)
                        }
                        if(addHtml.find('#td-list-5 .td-wrapper').html()){
                            atd5=$compile(addHtml.find('#td-list-5 .td-wrapper').html())($scope)
                        }
                        if(atd5){td5.append(atd5)}
                        if(atd4){td4.append(atd4)}
                        if(atd3){td3.append(atd3)}
                        if(atd2){td2.append(atd2)}
                        if(atd1){td1.append(atd1)}
                        //console.log(addHtml.find('#td-list-4 .td-wrapper').html())



                        self.lastItemId=addHtml.find('#paginateData'+page).data('lastItemId');
                        self.currentQty+=addHtml.find('#paginateData'+page).data('qty');
                        //console.log(addHtml.find('#paginateData'+page))
                        //console.log(self.currentQty,self.totalQty)
                        $timeout(function () {
                            lastElement=(self.lastItemId!=null)?$('#list'+self.lastItemId):null;
                            //console.log(lastElement)
                            waiting=false;
                        },200)
                        $timeout(function () {
                            //console.log("$rootScope.$emit('addBlockAfterScrollDone') from stuff-list")
                            $rootScope.$broadcast('addBlockAfterScrollDone')
                            $rootScope.$emit('$stateChangeEndToStuff')

                        },300)
                    })
                    .catch(function () {
                        $rootScope.$emit('$stateChangeEndToStuff')
                    })
            }
        }

        function filterList(){
            $q.when()
                .then(function(){
                    return self.Items.setFilters()
                })
                .catch(function(err){
                    //console.log(err)
                })
        }
        function setDataForStuff(stuff) {
            console.log(stuff.name)
            /*if($rootScope.$state.current.name!='stuffs'){
             console.log('exit')
             }*/
            //console.log(stuff.name)
            stuff = Stuff.setDataForStuff(stuff,global.get('filterTags').val)
            stuff = angular.copy(stuff)
            console.log(stuff.name+' '+stuff.artikul,stuff.sticker)
            return stuff;
        }
        function getList() {
            //console.log('getList')
            $q.when()
                .then(function(){
                    return $http.get(url, {params:{pages:[self.paginate.page],perPage:self.paginate.rows,rows:rows}})
                    /*return $http.get(url.trim()+'.html', {params:{pages:[self.paginate.page],perPage:perPage,rows:rows,query:self.query}})
                    return $http.post(url.trim(),{pages:[self.paginate.page],perPage:self.paginate.rows,rows:rows,query:self.query})*/
                })
                .then(function(response){
                    if(!response){return;}
                    $anchorScroll()
                    lastElement=null;
                    var addHtml=angular.element(response.data.html)
                    if(addHtml.find('#td-list-1').html()){
                        var atd1=$compile(addHtml.find('#td-list-1').html())($scope)
                        td1.html(atd1)
                    }
                    if(addHtml.find('#td-list-2').html()){
                        var atd2=$compile(addHtml.find('#td-list-2').html())($scope)
                        td2.html(atd2)
                    }
                    if(addHtml.find('#td-list-3').html()){
                        var atd3=$compile(addHtml.find('#td-list-3').html())($scope)
                        td3.html(atd3)
                    }
                    if(addHtml.find('#td-list-4').html()){
                        var atd4=$compile(addHtml.find('#td-list-4').html())($scope)
                        td4.html(atd4)
                    }
                    self.lastItemId=addHtml.find('#paginateData'+page).data('lastItemId');
                    self.currentQty+=addHtml.find('#paginateData'+page).data('qty');
                    $timeout(function () {
                        lastElement=(self.lastItemId!=null)?$('#list'+self.lastItemId):null;
                    },200)
                })
        }

    }

    function stuffListTemplateDirectiveCampaignListOld(global){
        return {
            scope: {
                campaignCondition:'@'
            },
            bindToController: true,
            controller: stuffListCtrl,
            controllerAs: '$ctrl',
            templateUrl: function (el,attr) {
                var url = 'views/template/partials/stuffs/stuffs-list/campaign';
                return url
            },
            restrict:'E'
        }
    }
    stuffListCtrl.$inject=['$scope','Stuff','$rootScope','$q','$uibModal','global','exception','FilterTags','Filters','Confirm','Helper','anchorSmoothScroll','Photo','$timeout','$anchorScroll','Category','Brands','BrandTags','seoContent','AddInfo','$http','$location','$element'];
    function stuffListCtrl($scope,Stuff,$rootScope,$q,$uibModal,global,exception,FilterTags,Filters,Confirm,Helper,anchorSmoothScroll,Photo,$timeout,$anchorScroll,Category,Brands,BrandTags,seoContent,AddInfo,$http,$location,$element){
        //conosole.log('&&&&')
        anchorSmoothScroll.scrollTo('topPage')
        $element.on('$destroy', function () {
            //console.log('$destroy',stamp)
            //$scope.$destroy();
        });
        var stamp = Date.now()
        console.log('stuffListCtrl from admin ',stamp)
        var self = this;
        self.Items=Stuff;
        self.mobile=global.get('mobile').val;
        self.global=global;
        self.globalProperty=$rootScope.globalProperty;
        self.$state=$rootScope.$state;
        self.$stateParams=$rootScope.$stateParams;
        self.query={};
        self.data={rows:2}
        self.itemsArr2=[[],[]]
        self.itemsArr3=[[],[],[]]
        self.itemsArr4=[[],[],[],[]]
        self.itemsArr5=[[],[],[],[],[]]
        var queryForFilter;
        self.paginate={page:0,rows:100,items:0}
        setTimeout(function(){$rootScope.displaySlideMenu=true;},400)
        self.newStuff={name:'',actived:false}
        self.listOfActions={
            filterTag:'добавить характеристику',
            unfilterTag:'снять характеристику',
            addInfo:'таблица доп. параметров',
            category:'смена категории',
            brand:'смена бренда',
            order:'способ заказа',
            brandTag:'смена коллекции',
            changePrice:'смена цены',
            changeMinMax:'смена min max кол-ва для заказа',
            deleteStuffs:'удаление товаров',

            actived:'смена видимости',
            index:'смена позиции'
        }
        self.maxIndex=0;
        self.listCriteria={actived:true}
        self.getList=getList;
        self.saveField = saveField;
        self.searchItem=searchItem;
        self.createItem=createItem;
        self.filterList=filterList;
        self.getTagName=getTagName;
        self.getFilterName=getFilterName;
        self.deleteItem=deleteItem;
        self.zoomImg=zoomImg;
        self.markAllStuffs=markAllStuffs;
        self.changeAction=changeAction;
        self.dropCallback=dropCallback;
        self.filteringList=filteringList;
        self.alignmentIndex=alignmentIndex;
        self.fixData=fixData;
        self.reNewKeyWords=reNewKeyWords;
        self.changeRows=changeRows;
        self.clearSearch=clearSearch;
        self.changeListCriteria=changeListCriteria;
        self.changeStock=changeStock

        //*******************************************************
        activate();
       // var d1=Date.now()
        function activate() {

            if(global.get('tempContent') && global.get('tempContent').val){
                $('#tempContent').empty()
                global.set('tempContent',null)
            }
            self.data.rows=setRows();
            if(global.get('crawler') && global.get('crawler').val && self.$state.current.name=='stuffs.stuff'){
                return
            }
            $q.when()
                .then(function(){
                    return self.Items.getQueryFromUrl(self.campaignCondition)
                })
                .then(function(query){
                    self.query=query
                    //console.log(self.query)
                    return getList()

                })
                .then(function(){
                    return FilterTags.getFilterTags()
                })
                .then(function(filterTags){
                    self.filterTags=filterTags;
                })
                .then(function(){
                    return Filters.getFilters()
                })
                .then(function(filters){
                    self.filters=filters;
                })
                .then(function(){
                    if($rootScope.reloadStuffId){
                        //console.log($rootScope.reloadStuffId)
                        $timeout(function(){
                            anchorSmoothScroll.scrollTo('stuff'+$rootScope.reloadStuffId,-150)
                            $rootScope.reloadStuffId=null;
                        },1300)

                    }
                    return;
                    return Helper.getItem(self.$state.current.name)
                })
                .then(function(helper){
                    if(helper){
                        self.helper=helper;
                        if(!global.get('store').val.helper) {
                            self.helper.popover=null;
                        }
                    }
                })
                .then(function(){
                    seoContent.setDataCatalog();
                })
                .catch(function(err){
                    console.log(err)
                })
        }
        $scope.$on('fromStuffToStuffs',function () {
            console.log("$rootScope.$on('fromStuffToStuffs'",stamp)
            getList(true)
        });
        function getList(reload) {
            //console.log(reload)
            if(reload){
                $rootScope.$emit('$stateChangeStartToStuff');
            }
            if(self.listCriteria && !$rootScope.$stateParams.searchStr){
                for(var k in self.listCriteria){
                    if(self.listCriteria[k]!==null){
                        self.query[k]=self.listCriteria[k]
                    }else{
                        delete self.query[k];
                    }

                }

            }
            //console.log(self.query)
            //var search;
            /*if(self.query.search){
                search=self.query.search;
                delete  self.query.search
            }*/
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    //console.log(data)
                    $anchorScroll();
                    self.itemsArr2=data.divideArrayWithChunk(2);
                    self.itemsArr3=data.divideArrayWithChunk(3);
                    self.itemsArr4=data.divideArrayWithChunk(4);
                    self.itemsArr5=data.divideArrayWithChunk(5);
                    self.items = data;
                    if(data.length){
                        self.maxIndex=data[0].index;
                        data.forEach(function(el,i){
                            (el.index>self.maxIndex)&&(self.maxIndex=el.index)
                        })
                    }
                    if(self.$state.current.name=='stuffs.stuff' && self.paginate.page){
                        console.log(':::::')
                        self.$state.go('stuffs',self.$stateParams)
                    }
                    return self.items;
                })
                .then(function(items){
                    //console.log(items)
                    if(!items || !items.length){
                        self.stateComplite=true;
                        $rootScope.$emit('$stateChangeEndToStuff');
                    }else{
                        $timeout(function(){
                            $rootScope.$emit('$stateChangeEndToStuff');
                        },100)
                    }
                })
                .catch(function(err){
                    err = err.data||err
                    exception.catcher('получение списка')(err)
                });
        }
        function setRows(){
            return (global.get('functions').val.setRows)?
                global.get('functions').val.setRows():2
        }

        $(window).resize(function(){
            $timeout(function (){
                self.data.rows=setRows();
                //console.log(self.data.rows)
            })

        })
        function filteringList(item){
            //console.log(self.filterStr)
            if (!self.filterStr || (item.name.toLowerCase().indexOf(self.filterStr.toLowerCase()) != -1) ||
                (item.artikul.toLowerCase().indexOf(self.filterStr.toLowerCase()) != -1) ){
                return true;
            }
            return false;
        }
        function searchItem(artikul){

            if(!artikul || artikul.length<3){return};
            artikul=artikul.substring(0,20)
            self.$state.current.reloadOnSearch = true;
            var o={groupUrl:'group',categoryUrl:'category',searchStr:artikul.substring(0,20),
                queryTag:null,brand:null,brandTag:null,categoryList:null}
            self.$state.go(self.$state.current.name,o,{reload:true})
        }
        function saveField(item,field,defer){
            var o={_id:item._id};
            o[field]=item[field]
            if(field=='name' || field=='artikul'){
                var lang= global.get('store').val.lang
                //console.log($scope.item.keywords[lang]);
                var k = item.name;
                if(item.artikul){
                    k+=' '+item.artikul;
                }
                if(item.category && item.category[0] && global.get('categoriesO').val && global.get('categoriesO').val[item.category[0]] && global.get('categoriesO').val[item.category[0]].nameL){
                    k+=' '+global.get('categoriesO').val[item.category[0]].nameL[lang];
                }
                if(item.brand && global.get('brands').val){
                    var id = (item.brand._id)?item.brand._id:item.brand;
                    var b = global.get('brands').val.getOFA('_id',id)
                    k+=' '+((b.nameL && b.nameL[lang])?b.nameL[lang]:b.name);
                    if(item.brandTag){
                        var bt = b.tags.getOFA('_id',item.brandTag);
                        if(bt && bt.nameL && bt.nameL[lang]){
                            k+=' '+bt.nameL[lang]
                        }
                    }
                }
                //console.log(k)
                if(!item.keywords){item.keywords={}}
                item.keywords[lang]=k;
                field +=' keywords.'+lang
                o['keywords.'+lang]=k;
            }


            //console.log(o)
            if(field=='archived' && item[field]){
                field +=' actived'
                o['actived']=false;
                item['actived']=false;

            }

            return self.Items.save({update:field},o ).$promise.then(function(){
                global.set('saving',true);
                /*if(field=='index'){
                    var reload=true
                    getList(reload)
                }*/
                $timeout(function(){
                    global.set('saving',false);
                },1500)},function(err){console.log(err)});


            /*defer =defer||0
            $timeout(function(){

            },defer)*/
        };
        function createItem(stuff,clone){
            if(!stuff){
                stuff={name:''}
                stuff.index=(self.items&&self.items[0]&& self.items[0].index)?self.items[0].index:0;
            }

            $q.when()
                .then(function(){
                    return self.Items.cloneStuff(stuff,clone)
                })
                .then(function(stuff){
                    self.newStuff=stuff
                })
                .then(function(){
                    var url=self.newStuff.url;
                    var c = global.get('categoriesO').val[self.newStuff.category]
                    /*if(c.url==self.$stateParams.categoryUrl){
                        self.getList(true);
                    }*/
                    //self.$state.go('frame.stuffs.stuff',{groupUrl:c.linkData.groupUrl,categoryUrl:c.linkData.categoryUrl,stuffUrl:url},{reload: "frame.stuffs"});
                    self.$state.go('frame.stuffs.stuff',{groupUrl:self.$stateParams.groupUrl,categoryUrl:self.$stateParams.categoryUrl,stuffUrl:url});
                })
                .catch(function(err){
                    if(err){
                        err = err.data||err
                        exception.catcher('создание товара')(err)
                        console.log(err)
                    }
                })
        }
        function filterList(){
            $q.when()
                .then(function(){
                    return self.Items.setFilters()
                })
                .catch(function(err){
                    //console.log(err)
                })
        }
        function getTagName(_id){
            //console.log(_id)
            if(!_id || !self.filterTags || _id=='notag'  || !self.filterTags.length)return;
            return self.filterTags.getOFA('_id',_id ).name||null;
        }
        function getFilterName(_id){
            if(!_id ||!self.filters){return}
            var filter=self.filters.getOFA('_id',_id );
            return (filter)?filter.name:'';
        }
        function deleteItem(stuff){
            var folder='images/'+global.get('store').val.subDomain+'/Stuff/'+stuff.url
               // console.log(folder)


            Confirm("удалить?" )
                .then(function(){
                    self.whileActions=true;
                    return Stuff.delete({_id:stuff._id} ).$promise;
                } )
                .then(function(){
                    var reload=true;
                    return self.getList(reload);
                })
                .then(function(){
                    self.whileActions=null;
                    return Photo.deleteFolder('Stuff',folder)
                })
                .catch(function(err){
                    self.whileActions=null;
                    err = (err &&err.data)||err
                    if(err){
                        exception.catcher('удаление товара')(err)
                    }

            })

            /*Stuff.Items.delete({_id:stuff._id} ).$promise.then(function(res){
                $scope.getList($scope.paginate.page,$scope.paginate.rows,'reload');
            } ).catch(function(err){
                err = err.data||err
                exception.catcher('удаление товара')(err)
            })*/
        }
        function zoomImg(stuff) {
            if(!stuff.gallery || !stuff.gallery.length){return}
            var options={
                animation: true,
                bindToController: true,
                controllerAs: '$ctrl',
                //windowClass: 'app-modal-window',
                templateUrl: 'views/template/partials/stuffDetail/modal/zoom.html',
                controller: function ($uibModalInstance,gallery,i){
                    var self=this;
                    self.gallery=gallery;
                    self.idx=i;
                    self.ok=function(){
                        $uibModalInstance.close();
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                },
                //size: 'lg',
                resolve:{
                    gallery:function(){
                        return stuff.gallery
                    },
                    i:function(){
                        return 0;
                    }
                }
            }
            $uibModal.open(options)

        }
        function markAllStuffs(m){
            self.items.forEach(function(el){
                el.select=m;
            })
        }
        function selectCategory() {
            function save(id,field) {

            }
            var acts=[]
            return $q.when()
                .then(function(){
                    return Category.select()
                } )
                .then(function(item){
                    self.items.forEach(function(el){
                        if(el.select){
                            //console.log(el.category)
                            if(typeof el.category=='object'){
                                el.category[0]=item._id
                            }else{
                                el.category=[item._id]
                            }
                            acts.push(saveField(el,'category'))
                        }

                    })
                    return $q.all(acts)
                })
                .then(function () {
                    getList(0)
                })
        }
        function selectBrand(){
            var acts=[];
            return $q.when()
                .then(function(){
                    return Brands.select()
                } )
                .then(function (item) {
                    var o={}
                    o.brand=item._id;
                    o.brandTag=null;
                    massSaveField(o)
                })
        }
        function selectBrandTag(){
            var acts=[];
            return $q.when()
                .then(function(){
                    return BrandTags.select()
                } )
                .then(function (item) {
                    //console.log(item)
                    var o={}
                    o.brand=item.brand._id;
                    o.brandTag=item._id;
                    massSaveField(o)
                })
        }
        function selectFilterTag(){
            var acts=[];
            return $q.when()
                .then(function(){
                    return FilterTags.select()
                } )
                .then(function(item){
                    //console.log(item)
                    var tag=item._id;
                    self.items.forEach(function(el){
                        if(el.select){
                            el.select=false;
                            var k = el.tags.indexOf(tag)
                            if(k<0){
                                el.tags.push(tag)
                                acts.push(saveField(el,'tags'));
                            }
                        }
                    })
                })
                .then(function () {
                    return $q.all(acts);
                })
        }
        function unSelectFilterTag(){
            var acts=[];
            return $q.when()
                .then(function(){
                    return FilterTags.select()
                } )
                .then(function(item){
                    //console.log(item)
                    var tag=item._id;
                    self.items.forEach(function(el){
                        if(el.select){
                            el.select=false;
                            var k = el.tags.indexOf(tag);
                            if(k>-1){
                                el.tags.splice(k,1)
                                acts.push(saveField(el,'tags'));
                            }
                        }
                    })
                })
                .then(function () {
                    return $q.all(acts);
                })
        }
        function selectAddInfo(){
            return $q.when()
                .then(function(){
                    return AddInfo.select()
                } )
                .then(function(item){
                    massSaveField({'addInfo':item._id})
                })

        }
        function selectActived(){
            var options={
                animation: true,
                templateUrl: 'components/stuff/modal/selectActivedModal.html',
                bindToController: true,
                controller: selectActivedCtrl,
                controllerAs: '$ctrl',
            }
            $uibModal.open(options).result.then(function (actived){
                massSaveField({'actived':actived}).then(function () {
                    getList(0)
                })

            });
        }
        selectActivedCtrl.$inject=['$uibModalInstance']
        function selectActivedCtrl($uibModalInstance){
            var self=this;
            self.actived=false;
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            self.ok = function () {
                $uibModalInstance.close(self.actived);
            };
        }
        function selectPosition(){
            if(!self.items.length){return}
            var options={
                animation: true,
                templateUrl: 'components/stuff/modal/selectPositionModal.html',
                bindToController: true,
                controller: selectPositionCtrl,
                controllerAs: '$ctrl',
            }
            $uibModal.open(options).result.then(function (position){

                //console.log(position)
                if(position=='down'){
                    var minIndex=Number(self.items[self.items.length-1].index)-1;

                    self.items.forEach(function(el){
                        //el.select=false;
                        if(el.select){

                            var i=minIndex--;
                            el.index=i;
                            saveField(el,'index');
                        }
                    })
                }else if(position=='up'){
                    var minIndex=Number(self.items[0].index)+1;
                    self.items.forEach(function(el){
                        //el.select=false
                        if(el.select){
                            var i=minIndex++;
                            el.index=i;
                            saveField(el,'index');
                        }
                    })
                }
                self.items.sort(function(a,b){return b.index-a.index})

            });
        }
        selectPositionCtrl.$inject=['$uibModalInstance']
        function selectPositionCtrl($uibModalInstance){
            var self=this;
            self.position='up';
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            self.ok = function () {
                $uibModalInstance.close(self.position);
            };
        }
        function changeOrderType(){
            var options={
                animation: true,
                templateUrl: 'components/stuff/modal/orderTypeModal.html',
                bindToController: true,
                controller: orderTypeCtrl,
                controllerAs: '$ctrl',
            }
            $uibModal.open(options).result.then(function (orderType){
                massSaveField({orderType:orderType})
                /*var item={orderType:orderType}
                item.ids=self.items.filter(function(el){return el.select}).map(function(el){return el._id})
                return self.Items.save({update:'orderType'},item).$promise.then(function(){
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)},function(err){console.log(err)});*/
            });
        }
        orderTypeCtrl.$inject=['$uibModalInstance']
        function orderTypeCtrl($uibModalInstance){
            var self=this;
            self.orderType=0;
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            self.ok = function () {
                $uibModalInstance.close(self.orderType);
            };
        }

        function changeMinMax(){
            var options={
                animation: true,
                templateUrl: 'components/stuff/modal/changeMinMaxModal.html',
                bindToController: true,
                controller: changeMinMaxCtrl,
                size:'lg',
                controllerAs: '$ctrl',
            }
            $uibModal.open(options).result.then(function (item){
                massSaveField(item)
                /*item.ids=self.items.filter(function(el){return el.select}).map(function(el){return el._id})
                return self.Items.save({update:'single multiple minQty maxQty'},item ).$promise.then(function(){
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)},function(err){console.log(err)});*/
            });
        }
        changeMinMaxCtrl.$inject=['$uibModalInstance']
        function changeMinMaxCtrl($uibModalInstance){
            var self=this;
            self.item={minQty:1,maxQty:1,single:false,multiple:false};
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            self.ok = function () {
                $uibModalInstance.close(self.item);
            };
        }
        function changePrice(){
            var options={
                animation: true,
                templateUrl: 'components/stuff/modal/changePriceModal.html',
                bindToController: true,
                controller: changePriceCtrl,
                size:'lg',
                controllerAs: '$ctrl',
            }
            $uibModal.open(options).result.then(function (item){
                item.ids=self.items.filter(function(el){return el.select}).map(function(el){return el._id})
                
                item.price=Number(item.value)
                delete item.value;
                try{

                    if(item.price){
                        if(item.sum){
                            item.$inc=true;
                            if(item.price<0){
                                self.items.forEach(function (el) {
                                    if(el.select){
                                        if(el.price+item.price<0){
                                            throw el.name+' '+'price below 0'
                                        }
                                    }
                                })
                            }
                        }else{
                            item.$mul=true;
                            if(item.price<-99){
                                throw 'percent value -99 - ~'
                            }
                            item.price +=100;

                            if(item.price>0){
                                item.price=item.price/100
                            }
                        }
                    }
                    delete item.sum;

                    //console.log(item)
                    return self.Items.save({update:'price'},item).$promise.then(function(){
                        global.set('saving',true);
                        getList(true)
                        $timeout(function(){
                            global.set('saving',false);
                        },1500)},function(err){console.log(err)});

                }catch(err){
                    exception.catcher('error')(err)
                }

            });
        }
        changePriceCtrl.$inject=['$uibModalInstance']
        function changePriceCtrl($uibModalInstance){
            var self=this;
            self.item={value:0,sum:false};
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            self.ok = function () {
                $uibModalInstance.close(self.item);
            };
        }

        function deleteStuffs(){
            Confirm('потверждаете?').then(function () {
                var ids=self.items.filter(function(el){return el.select}).map(function(el){return el._id}).join('_')
                var folders=self.items.filter(function(el){return el.select}).map(function(el){
                    var folder='images/'+global.get('store').val.subDomain+'/Stuff/'+el.url
                    return folder;
                })
                $q.when()
                    .then(function () {
                        return self.Items.delete({ids:ids}).$promise.then(function(){
                            global.set('saving',true);
                            getList(true)
                            $timeout(function(){
                                global.set('saving',false);
                            },1500)},function(err){console.log(err)});
                    })
                    .then(function(){
                        Photo.deleteFolders('Stuff',folders)
                    })
                
            })

        }
        function massSaveField(item) {

            var fields= Object.keys(item).join(' ')
            //console.log(fields)
            item.ids=self.items.filter(function(el){return el.select}).map(function(el){return el._id})
            return self.Items.save({update:fields},item).$promise.then(function(){
                global.set('saving',true);
                if(item.actived || item.category){
                    getList(true)
                }
                $timeout(function(){
                    global.set('saving',false);
                },1500)},function(err){console.log(err)});
        }

        function changeAction(){
            Confirm('подтвердите действие')
                .then(function () {
                    if(!self.action){return}
                    var a=angular.copy(self.action);
                    self.action=null;
                    self.mark=false;
                    switch (a) {
                        case 'category':
                            return selectCategory()
                            break;
                        case 'brand':
                            return selectBrand()
                            break;
                        case 'brandTag':
                            return selectBrandTag()
                            break;
                        case 'filterTag':
                            return selectFilterTag()
                            break;
                        case 'unfilterTag':
                            return unSelectFilterTag()
                            break;
                        case 'addInfo':
                            return selectAddInfo()
                            break;
                        case 'actived':
                            return selectActived()
                            break;
                        case 'index':
                            return selectPosition()
                            break;
                        case 'order':
                            return changeOrderType()
                            break;
                        case 'changePrice':
                            return changePrice()
                            break;
                        case 'changeMinMax':
                            return changeMinMax()
                            break;
                        case 'deleteStuffs':
                            return deleteStuffs()
                            break;

                    }
                })

        }
        function dropCallback(item){
            return item;
        }
        function alignmentIndex(){
            Confirm('Подтверждаете?')
                .then(function () {
                    self.alignmentIndexDisable=true;
                    var data = {}
                    return $http({
                        method: "post",
                        url:'/api/alignmentIndex',
                        data:data,
                    })
                })
                .then(function(){})
                .catch(function (err) {
                    console.log(err)
                })



        }
        function fixData(){
            Confirm('Подтверждаете?')
                .then(function () {
                    self.fixDesable=true;
                    var data = {}
                    return $http({
                        method: "post",
                        url: '/api/fixedDB/stuff',
                        data:data,
                    })
                })
                .then(function(){
                    self.fixDesable=false
                    exception.showToaster('info','fix stucture','Ok')
                })
                .catch(function (err) {
                    exception.catcher('fix stucture')(err)
                })

        }
        function reNewKeyWords(){
            Confirm('Подтверждаете?')
                .then(function () {
                    self.reNewKeyWordsDisable=true;
                    var data = {}
                    return $http({
                        method: "GET",
                        url: '/api/reNewKeyWords',
                        data:data,
                    })
                })
                .then(function(){
                    self.reNewKeyWordsDisable=false
                    exception.showToaster('info','reNewKeyWords','Ok')
                })
                .catch(function (err) {
                    exception.catcher('reNewKeyWords')(err)
                })

        }
        function changeRows(rows) {
            if(self.paginate.rows!=rows){
                self.paginate.rows=rows;
                self.paginate.page=0;
                self.paginate.items=0;
                var reload = true;
                getList(reload);
            }
        }
        function clearSearch() {
            $location.search('searchStr',null)
        }
        function changeListCriteria(field,val) {
            if(self.listCriteria){
                self.listCriteria.actived=null
                self.listCriteria.archived=null
            }
            //console.log(self.listCriteria)
            if(field){
                self.listCriteria[field]=val;
            }
            if(field=='actived' && !val){
                self.listCriteria.archived=false
            }
            self.paginate.page=0;
            getList(true)
        }
        function changeStock(stuff,tag) {
            //console.log(stuff)
            if(stuff.stock && stuff.stock[tag._id]){
                stuff.stock[tag._id].quantity=tag.quantity
                saveField(stuff,'stock');
            }
            //console.log(tag)
            //console.log(tag.quantity)
        }
    }


    angular.module('gmall.directives')
        .directive('filtersWrap',filtersWrapDirective)
    function filtersWrapDirective(global){
        return {
            scope: {},
            restrict:"C",
            bindToController: true,
            controller: filtersWrapCtrl,
            controllerAs: '$ctrl',
            templateUrl: function(){
                var s='';
                if(global.get('store').val){
                    var type = (global.get('sectionType') && global.get('sectionType').val)?global.get('sectionType').val:'good';
                    var sec = global.get('store').val.template.stuffListType[type];
                    if(sec.filters){
                        for(var i=0;i<sec.parts.length;i++){
                            if(sec.parts[i].name=='filters'){
                                if(sec.parts[i].templ){
                                    s=sec.parts[i].templ;
                                }
                                break;
                            }
                        }
                    }
                }
                return 'views/template/partials/stuffs/filters/filtersWrap'+s+'.html'
            }

        }
    }
    filtersWrapCtrl.$inject=['$element','$timeout','$q','$stateParams','Sections','$location','Filters','global','Brands','Stuff','$scope','$rootScope','$state'];
    function filtersWrapCtrl($element,$timeout,$q,$stateParams,Sections,$location,Filters,global,Brands,Stuff,$scope,$rootScope,$state) {
        var self=this;
        self.global=global;


        //console.log('set filers')

        //console.log(self.filters)

        self.chars=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        self.char=self.chars[0]
        self.changeAllBrands=changeAllBrands;
        self.changeAllTags=changeAllTags;
        self.clearAll=clearAll;
        self.setCountFilter=setCountFilter;
        self.clearCountFilter=clearCountFilter;
        self.openFilterForBrands=openFilterForBrands;

        self.filterBrands = filterBrands;
        self.setCharForBrands=setCharForBrands;

        $rootScope.$on('changeCurrency',function () {
            console.log('changeCurrency',global.get('rate').val)
            self.filters.forEach(function (f) {
                if(f.count && f.price){
                    console.log(f.mixSave,global.get('rate').val)
                    f.min =Math.ceil10(f.mixSave*global.get('rate').val,0)
                    console.log(f.min)
                    f.max =Math.ceil10(f.maxSave*global.get('rate').val,0)
                    f.maxValue =f.max
                    f.minValue =f.min

                    console.log(f)
                }
            })
            $timeout(function () {
                $scope.$broadcast('rzSliderForceRender');
            },500);
        })

        activate()

        function activate(){
            $q.when()
                .then(function(){
                    return Brands.getBrands()
                })
                .then(function(brands){
                    self.brands=brands
                    self.checkedBrand=0;
                    if(self.brands){
                        self.brands.forEach(function (b) {
                            if(b.set){self.checkedBrand++}
                        })
                    }
                })
                .then(function(){
                    return Filters.getFilters()
                })
                .then(function(filters){
                    filters.forEach(function (f) {
                        if(f.count && f.price){
                            if(!f.maxSave){
                                f.maxSave =f.max
                            }
                            if(!f.mixSave){
                                f.mixSave =f.min
                            }
                            /*f.maxValue =f.maxValue*global.get('rate').val
                            f.minValue =f.minValue*global.get('rate').val*/
                            f.min =Math.ceil10(f.mixSave*global.get('rate').val,0)
                            f.max =Math.ceil10(f.maxSave*global.get('rate').val,0)
                            //console.log(f)
                        }
                    })
                    self.filters=filters

                })
        }

        self.changeTag=changeTag;
        var parentDiv=$element.offsetParent()
        var box = $element.find('div')[0];
        //console.log(box)


        $timeout(function () {

            var w = $element.parent().width();
            var w1= Math.round(w/5)
            var list = $element.parent().children()[1];

            var nav = $('.navbar-fixed-top');
            var sdvig=0;
            nav.each(function (i,n) {
                // console.log($(n).outerHeight())
                sdvig+=$(n).outerHeight()
            })

            var filtersFirstBox=$element.find('.filters-first-box')[0];
            var filtersBox=$element.find('.filter-box')[0];

            var win = $(window);
            var delta=0 // сдвиг вверх от нижнего края окна просмотра

            win.scroll(filtersForScroll)
            var lastScrollTop = 0;
            $(filtersFirstBox).height($(filtersBox).height())

            $scope.$watch(function(){return $(filtersBox).height()},function (n,o) {
                $(filtersFirstBox).height(n+'px')
                //console.log(o,n)
                return;
                if(n>o){
                    /*if($(filtersBox).css('position')=='absolute'){
                     if($(filtersBox).height()>$(filtersFirstBox).height()){
                     $(filtersFirstBox).height($(filtersBox).height()+'px')
                     }
                     }*/
                    //console.log($(filtersBox).height(),$(filtersFirstBox).height())
                    if($(filtersBox).height()>$(filtersFirstBox).height()){
                        $(filtersFirstBox).height($(filtersBox).height()+'px')
                    }
                }
            })

            function filtersForScroll(event) {
                //console.log(list)
                if(!list){return}
                if($state.current.name!='stuffs'){return}
                var docViewTop = win.scrollTop();
                var docViewBottom = docViewTop + win.height();
                var elemTop =$(filtersBox).offset().top;
                var elemBottom = elemTop + $(filtersBox).height();
                var elemWidth = $(filtersBox).width();
                var listTop = $(list).offset().top;
                var listBottom = listTop + $(list).height();
                var st = $(this).scrollTop();
                if (st > lastScrollTop){
                    downscroll()
                } else {
                    upscroll()
                }
                lastScrollTop = st;


                /*function isOnScreen(element){
                 var bounds = $(element).offset();
                 bounds.bottom = bounds.top + $(element).outerHeight();
                 return (docViewTop < bounds.top-sdvig &&  docViewBottom > bounds.bottom);
                 };
                 */


                function upscroll() {
                    if(!elemBottom){return}
                    if($(filtersBox).css('position')=='fixed'){
                        if($(filtersBox).css('bottom')=='0px'){
                            // блок зафиксирован по нижнему краю
                            $(filtersFirstBox).css('height',docViewBottom-$(filtersFirstBox).offset().top)
                            $(filtersBox).css('position','absolute')
                            $(filtersBox).css('bottom','0px')
                            $(filtersBox).css('top','auto')
                            $(filtersBox).css('width',elemWidth+'px')
                            if($(filtersFirstBox).height()<$(filtersBox).height()){
                                $(filtersFirstBox).height($(filtersBox).height())
                            }
                        }else if($(filtersBox).css('top')==sdvig+'px'){
                            if(docViewTop+sdvig<=listTop){
                                $(filtersBox).css('position','absolute')
                                $(filtersBox).css('bottom','auto')
                                $(filtersBox).css('top','0px')
                                $(filtersBox).css('width',elemWidth+'px')
                            }else{

                            }
                        }else{
                            console.log('?????????????')
                        }
                    }else if($(filtersBox).css('position')=='absolute'){

                        if(elemTop > docViewTop+sdvig && elemTop>listTop){
                            /*****************/
                            /******* 7 *******/
                            /*****************/
                            $(filtersBox).css('position','fixed')
                            $(filtersBox).css('top',sdvig+'px')
                            $(filtersBox).css('bottom','auto')
                            $(filtersBox).css('width',elemWidth+'px')
                            /*console.log('ниже',$(filtersBox).css('top'))
                             if($(filtersBox).css('top')!='0px'){
                             $(filtersBox).css('position','fixed')
                             $(filtersBox).css('top',sdvig+'px')
                             $(filtersBox).css('bottom','auto')
                             $(filtersBox).css('width',elemWidth+'px')
                             }*/
                        }else{
                            //console.log('выше')
                        }




                        /*if(isOnScreen(filtersBox)){

                         }else{
                         // не помещается на экран
                         //console.log(listTop,elemTop)

                         }*/



                    }
                }

                function downscroll() {
                    if(!elemBottom){return}
                    if($(filtersBox).css('position')=='fixed'){
                        if($(filtersBox).css('top')==sdvig+'px'){
                            // по верхнему краю
                            if(elemBottom<docViewBottom){
                                console.log('здесь?')
                            }else{
                                var t = elemTop-$(filtersFirstBox).offset().top
                                $(filtersFirstBox).css('height',t+'px')
                                $(filtersBox).css('position','absolute')
                                $(filtersBox).css('top',t+'px')
                                $(filtersBox).css('bottom','auto')
                            }
                        }else if($(filtersBox).css('bottom')=='0px'){
                            // по нижнему краю
                            if(listBottom<=elemBottom){
                                // список поднялся выше фильтров
                                $(filtersFirstBox).css('height',$(list).height())
                                $(filtersBox).css('position','absolute')
                                $(filtersBox).css('bottom','0px')
                                $(filtersBox).css('top','auto')
                            }

                        }

                    }else if($(filtersBox).css('position')=='absolute'){
                        if(docViewTop-sdvig >=elemTop &&  elemBottom  < docViewBottom && $(filtersBox).height()<(docViewBottom-docViewTop-sdvig)){
                            // фильтры не на весь екран
                            $(filtersBox).css('position','fixed')
                            $(filtersBox).css('bottom','auto')
                            $(filtersBox).css('top',sdvig+'px')
                            $(filtersBox).css('width',elemWidth+'px')
                        } else if(elemBottom <= docViewBottom && elemBottom<listBottom  && !($(filtersBox).height()<(docViewBottom-docViewTop-sdvig))){
                            // фильтры поднялись над низом окна и есть еще список
                            $(filtersBox).css('position','fixed')
                            $(filtersBox).css('bottom','0px')
                            $(filtersBox).css('top','auto')
                            $(filtersBox).css('width',elemWidth+'px')
                        }
                    }
                }

            }
            $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
                //console.log('filtersForScroll()')
                if(to.name=='stuffs'){
                    filtersForScroll()
                }
            })
            /*$timeout(function () {
                $scope.$broadcast('rzSliderForceRender')
            },200)*/
            $scope.$on('$destroy', function() {
                angular.element(window).off('scroll', filtersForScroll);
            });
        },150)




        function changeTag(){
            var queryTag='',brandTag='',brand='',filterTag='';
            //console.log(self.filters)
            self.filters.forEach(function(filter){
                if(filter.count){
                    if(filter.set){
                        //console.log(filter.name)
                        if(filterTag){filterTag+='__'}
                        filterTag+=filter._id+"_"+filter.minValue+"_"+filter.maxValue
                    }
                }else{
                    filter.tags.forEach(function(tag){
                        if (tag.set){
                            //console.log(filter.tags)
                            if(queryTag){queryTag+='__'}
                            queryTag+=tag.url;
                        }
                    })
                }

            })

            self.brands.forEach(function(b){
                if(b.set){
                    if(brand){brand+='__'}
                    brand+=b.url;
                }
                b.tags.forEach(function(tag){
                    if (tag.set){
                        if(brandTag){brandTag+='__'}
                        //console.log(tag.url,arr)
                        brandTag+=tag.url;
                    }
                })
            })
            //console.log(filterTag)
            if(brand.split('__').length>1){
                brandTag=null;
            }
            //console.log('query.brandTag при закрытии ',query.brandTag);

            if(!queryTag){
                $location.search('queryTag',null)
            }else{
                $location.search('queryTag',queryTag)
            }
            if(!brandTag){
                $location.search('brandTag',null)
            }else{
                $location.search('brandTag',brandTag)
            }

            if(brand){
                $location.search('brand',brand)
            }else{
                $location.search('brand',null)
            }
            if(filterTag){
                $location.search('filterTag',filterTag)
            }else{
                $location.search('filterTag',null)
            }
            //console.log(self.brand)

            var o={
                groupUrl:$stateParams.groupUrl,
                categoryUrl:$stateParams.categoryUrl,
                queryTag:queryTag,
                brand:self.brand,
                brandTag:brandTag,
                categoryList:undefined

            };
            //console.log(o)
        }
        function clearAllBrands() {
            self.brands.forEach(function (b) {
                b.set=false;
                if(b.tags && b.tags.length){
                    b.tags.forEach(function (t) {
                        t.set=false;
                    })
                }
            })
        }
        function changeAllBrands() {
            clearAllBrands()
            changeTag()
        }
        function clearFilter(filter) {
            filter.set=null;
            if(filter.tags && filter.tags.length){
                filter.tags.forEach(function (t) {
                    t.set=false;
                })
            }
        }
        function changeAllTags(filter) {
            clearFilter(filter)
            changeTag()
        }
        function clearAll() {
            clearAllBrands()
            self.filters.forEach(function(filter){
                clearFilter(filter)
            })
            changeTag()
        }
        function setCountFilter(filter){
            filter.set=true;
            //console.log(filter)
            changeTag();
        }
        function clearCountFilter(filter) {
            filter.set=null;
            changeTag();

        }
        function openFilterForBrands() {
            if(self.brands && self.brands.length){
                return self.brands.some(function(b){return b.open})
            }
        }
        function setCharForBrands(char) {
            self.char=char
        }
        function filterBrands(item) {
            //console.log(item)
            return item.name.toUpperCase()[0]==self.char
        }





    }
})()
