'use strict';
(function(){
    angular.module('gmall.directives')

        .directive('stuffListTemplateServer',stuffListTemplateServer) // список товаро на сайте у клиента
        .directive('stuffListTemplateCampaignList',stuffListTemplateDirectiveCampaignList)
        .directive('emptyList',emptyList)
        .directive('stuffInList',stuffInList)
        .directive('homePageStuffOwl',function(){return {
            scope: {
                homePageStuffOwl:'@',
                zoomImg:"@",
                stuffs:'@'
            },
            bindToController: true,
            controllerAs: '$ctrl',
            /*require: {
                parent: '^dateTimeEntry'
            },*/
            controller: homePageStuffOwlCtrl}})

    homePageStuffOwlCtrl.$inject=['$scope','$timeout','$element','$compile','global']
    function homePageStuffOwlCtrl($scope,$timeout,$element,$compile,global){
        var self = this;
        self.prev=prev;
        self.next=next;
        self.moment=moment;
        self.global=global;
        var imgs;
        self.zoomSliderImg=zoomSliderImg;
        this.$onInit = function(){
            $timeout(function () {
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
        var carousel_Settings={
            loop:true,
            margin:10,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    dots:false
                },
                380:{
                    items:2,
                    nav:false,
                    dots:false
                },
                1068:{
                    items:3,
                    nav:false,
                    dots:false
                },
                1400:{
                    items:4,
                    nav:false,
                    dots:false
                }
            }
        };
        var  activate = function(){
            $timeout(function(){
                self.$owl.owlCarousel( carousel_Settings );
                var imgsEl=self.$owl.find('img')
                if(imgsEl && imgsEl.each){
                    imgs=[];
                    imgsEl.each(function (i,img) {
                        imgs.push({index:i,img:img.src})
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
    function stuffInList(global,$timeout){
        return {
            scope: {
                stuffInList:'@'
            },
            bindToController: true,
            controllerAs: '$ctrl',
            restrict:'A',
            controller:function($scope,Stuff,global,$attrs,$stateParams){
                var self=this;
                self.global=global;
                $scope.global=global;

                //console.log(JSON.parse($attrs.stuffInList))
                $scope.stuff=JSON.parse($attrs.stuffInList)
                $scope.stuff = Stuff.setDataForStuff($scope.stuff,global.get('filterTags').val,'stuffs')
                $scope.stuff.stateObj=angular.copy($stateParams);
                //console.log($scope.stuff.stateObj)
                $scope.stuff.stateObj.stuffUrl=$scope.stuff.url;

                self.stuff=$scope.stuff;
                self.getMastersName=getMastersName

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

                transclude(scope, function(clone) {
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
        //console.log('stuffListFromServerCtrl')

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
                    return $http.get(url.trim()+'.html', {params:{pages:[self.paginate.page],perPage:perPage,rows:rows,query:self.query}})
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
