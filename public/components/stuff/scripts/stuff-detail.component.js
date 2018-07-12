'use strict';
(function(){

    angular.module('gmall.directives')
        //.directive('stuffDetailTemplate',itemDirective)
        .directive('stuffDetailTemplate',itemDirectiveFromServer)
        .directive('stuffFromServer',stuffFromServer)

        .directive('stuffCart',stuffCartDirective)
        .directive('homePageStuff',homePageStuffDirective)
        //http://stackoverflow.com/questions/16670931/hide-scroll-bar-but-still-being-able-to-scroll
        .directive('gallerySmall',gallerySmallDirective)
        .directive('directiveBlockStuff', function($compile, $interpolate) {
            return {
                template: '',
                link: function($scope, element, attributes) {
                    var attr=(attributes.blockTempl)?attributes.blockTempl:''
                    //console.log(attr)
                    var div='<div ' + attributes.directiveBlockStuff.toLowerCase() + '-block-stuff block-templ="'+attr+'"></div>'
                    //console.log(div)
                    element.append($compile(div)($scope));
                }
            };
        })
        .directive('nameBlockStuff',nameBlockStuff)
        .directive('textBlockStuff',textBlockStuff)
        .directive('text2BlockStuff',text2BlockStuff)
        .directive('bannerBlockStuff',bannerBlockStuff)
        .directive('banner1BlockStuff',banner1BlockStuff)
        .directive('sliderBlockStuff',sliderBlockStuff)
        .directive('videoBlockStuff',videoBlockStuff)
        .directive('video1BlockStuff',video1BlockStuff)
        .directive('video2BlockStuff',video2BlockStuff)
        .directive('mapBlockStuff',mapBlockStuff)
        .directive('map1BlockStuff',map1BlockStuff)
        .directive('map2BlockStuff',map2BlockStuff)
        .directive('mastersBlockStuff',mastersBlockStuff)
        .directive('feedbackBlockStuff',feedbackBlockStuff)
        .directive('feedback1BlockStuff',feedback1BlockStuff)
        .directive('feedback2BlockStuff',feedback2BlockStuff)
        .directive('stuffsBlockStuff',imgsBlockStuff)
        .directive('filterTagsBlockStuff',imgsBlockStuff)
        .directive('brandTagsBlockStuff',imgsBlockStuff)
        .directive('brandsBlockStuff',imgsBlockStuff)
        .directive('categoriesBlockStuff',imgsBlockStuff)
        .directive('campaignBlockStuff',imgsBlockStuff)
        .directive('dateBlockStuff',dateBlockStuff)
        .directive('positionBlockStuff',positionBlockStuff)
        .directive('videolinkBlockStuff',videoLinkBlockStuff)
        .directive('snBlockStuff',snBlockStuff)
        .directive('calendarBlockStuff',calendarBlockStuff)
        .directive('carouselControls', function() {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    scope.goNext = function() {
                        element.isolateScope().next();
                    };
                    scope.goPrev = function() {
                        element.isolateScope().prev();
                    };

                }
            };
        })
        .directive('dirDisqus', ['$window','global', function ($window,global) {
            return {
                restrict: 'E',
                scope: {
                    config: '='
                },
                template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink"></a>',
                link: function (scope) {
                    //if(!global.get('store').val.disqus){return}
                    scope.$watch('config', configChanged, true);

                    function configChanged(n,o) {
                        if(!n){return}
                        // Ensure that the disqus_identifier and disqus_url are both set, otherwise we will run in to identifier conflicts when using URLs with "#" in them
                        // see http://help.disqus.com/customer/portal/articles/662547-why-are-the-same-comments-showing-up-on-multiple-pages-
                        if (!scope.config.disqus_shortname ||
                            !scope.config.disqus_identifier ||
                            !scope.config.disqus_url) {
                            return;
                        }
                        //console.log(scope.config)
                        $window.disqus_shortname = scope.config.disqus_shortname;
                        $window.disqus_identifier = scope.config.disqus_identifier;
                        $window.disqus_url = scope.config.disqus_url;
                        $window.disqus_title = scope.config.disqus_title;
                        //$window.disqus_category_id = scope.config.disqus_category_id;
                        //$window.disqus_disable_mobile = scope.config.disqus_disable_mobile;
                       /* $window.disqus_config = function () {
                            this.language = scope.config.disqus_config_language;
                            this.page.remote_auth_s3 = scope.config.disqus_remote_auth_s3;
                            this.page.api_key = scope.config.disqus_api_key;
                            if (scope.config.disqus_on_ready) {
                                this.callbacks.onReady = [function () {
                                    scope.config.disqus_on_ready();
                                }];
                            }
                        };*/

                        // Get the remote Disqus script and insert it into the DOM, but only if it not already loaded (as that will cause warnings)
                        if (!$window.DISQUS) {
                            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                            dsq.src = 'https://' + scope.config.disqus_shortname + '.disqus.com/embed.js';
                            dsq.setAttribute('data-timestamp', +new Date());
                            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                            //console.log('dsq',dsq)
                        } else {
                            $window.DISQUS.reset({
                                reload: true,
                                config: function () {
                                    this.page.identifier = scope.config.disqus_identifier;
                                    this.page.url = scope.config.disqus_url;
                                    this.page.title = scope.config.disqus_title;
                                    //this.language = scope.config.disqus_config_language;
                                    /*this.page.remote_auth_s3 = scope.config.disqus_remote_auth_s3;
                                    this.page.api_key = scope.config.disqus_api_key;*/
                                }
                            });
                        }
                    }
                }
            };
        }])
        .directive('checkOrienForPhoto', ['$window', function ($window,global) {
            return {
                restrict: 'A',
                link: function (scope,elem,attrs) {
                    var img = elem[0];

                    function loaded() {
                        if(img.naturalWidth && img.naturalHeight && img.naturalWidth < img.naturalHeight){
                            elem.addClass('img-detail')
                        }else{
                            elem.removeClass('img-detail')
                        }
                    }

                    if (img.complete) {
                        loaded()
                    } else {
                        img.addEventListener('load', loaded)
                        img.addEventListener('error', function() {
                            //alert('error')
                        })
                    }
                    attrs.$observe('src', function (newValue, oldValue) {
                        if (newValue && oldValue && newValue !== oldValue) {
                            console.log(newValue)
                        }
                    });

                }
            };
        }]);



    function gallerySmallDirective(){
        return {
            restrict:'C',
            controller: gallerySmallCtrl
        }
    }
    function stuffCartDirective(global){
        //var s=(global.get('store').val.template.stuff)?global.get('store').val.template.stuff:'';
        return {
            templateUrl:function(){
                //console.log(global.get('campaignStuffCart').val)

                var s = (global.get('campaignStuffCart').val && global.get('campaignStuffCart').val!=0)?global.get('campaignStuffCart').val:'';
                //console.log(type,global.get('store').val.template.stuffListCart[type],s)
                var url = '/views/template/partials/stuffs/list/stuff-cart/stuff-cart'+s+'.html';
                //console.log(url)
                return '/views/template/partials/stuffs/list/stuff-cart/stuff-cart'+s+'.html'
            },
            restrict:'A'
        }
    }
    function homePageStuffDirective(global){
        return {
            restrict:'A',
            scope: {
                homePageStuff:"@"
            },
            bindToController: true,
            controllerAs: '$ctrl',
            controller: homePageStuffCtrl,
        }
    }

    function itemDirective(global,$stateParams){
        return {
            scope: {
                filtersBlock:"@"
            },
            bindToController: true,
            controller: itemCtrl,

            controllerAs: '$ctrl',
            templateUrl: function() {
                //console.log($stateParams)
                //console.log(global.get('sectionType').val)
                //return 'views/template/partials/stuffDetail/stuffDetail/'+global.get('sectionType').val+'.html'
                //console.log('itemDirective',global.get('sectionType').val)
                return 'views/template/partials/stuffDetail/stuffDetail/'+global.get('sectionType').val+'/'+$stateParams.stuffUrl

            },
            restrict:'E',
            /*link: function(scope, iElement, iAttributes, ctrl){
                console.log(ctrl)
            }*/
        }
    }
    itemCtrl.$inject=['$scope','$anchorScroll','global','Stuff','$stateParams','$window','$q','BrandTags','FilterTags','Filters','AddInfo','Comments','exception','seoContent','$location','Sections','$uibModal','$notification','$rootScope','$timeout','$element'];
    function itemCtrl($scope,$anchorScroll,global,Stuff,$stateParams,$window,$q,BrandTags,FilterTags ,Filters,AddInfo,Comments,exception,seoContent,$location,Sections,$uibModal,$notification,$rootScope,$timeout,$element){
        //console.log('new reload')
        $anchorScroll();
        //console.log(global.get('stuffsInList').val)
        var stuffsInList=[];
        var currentStuffInList=null;
        var maxNumInRow=0;


        //console.log(global.get('stuffsInList').val)
        //https://medium.freecodecamp.com/how-to-get-the-most-out-of-the-javascript-console-b57ca9db3e6d
        /*console.group();
        console.log('I will output');
        console.group();
        console.log('more indents')
        console.groupEnd();
        console.log('ohh look a bear');
        console.groupEnd();
        console.time('id for timer stuffDetail')*/
        //console.log(Comments)
        var self=this;
        if(global.get('tempContent').val){
            self.firstLook=true;
        }else{
            self.firstLook=false;
        }
        self.global=global;
        self.$stateParams=$stateParams;
        self.lang=global.get('store').val.lang;
        self.rate=global.get('rate');
        self.mobile=global.get('mobile').val;
        self.crawler=global.get('crawler').val;
        self.currency=global.get('currency');
        self.moment=moment;
        self.activeSlide=0
        self.paginate={rows:5,page:0,items:0};// for comments
        //*******************************************************
        self.getTagName=getTagName;
        self.getFilterName=getFilterName;
        /*self.getCategoryName=getCategoryName;
        self.getBrandName=getBrandName;
        self.getBrandTagName=getBrandTagName;*/

        self.createNewComment=createNewComment;
        self.getComments=getComments;
        self.increaseQty=increaseQty;
        self.decreaseQty=decreaseQty;
        self.chancheStuff=chancheStuff;
        self.chancheActiveSlide=chancheActiveSlide;
        self.nextStuff=nextStuff;
        self.prevStuff=prevStuff;
        self.returnToList=returnToList;
        var slideDelay,carousel;
        //self.filterSorts=filterSorts;


        //****************************************************************
        activate();
        function getStuff(url,reload) {
            if(reload && self.item.stockKeysArray){
                self.item.stockKeysArray=[]
            }

            var leftRow =  $('#stuffDetailLeftClass');
            var rightRow = $('#stuffDetailRightClass')
            return  $q.when()
                .then(function(){
                    var o;
                    if($stateParams.store){
                        o={}
                        o.store=$stateParams.store;
                    }
                    return  Stuff.getItem(url,o)
                })
                .then(function(item){
                    //console.log(global.get('category'))

                    if(item.grid!=null && item.grid!=undefined){
                        item.leftClass =ratioClassStuffDetail[item.grid]['left']
                        item.rightClass=ratioClassStuffDetail[item.grid]['right']
                    }else{
                        //console.log(global.get('store').val.template.stuffDetailType)
                        item.leftClass =ratioClassStuffDetail[global.get('store').val.template.stuffDetailType[global.get('sectionType').val].ratio]['left']
                        item.rightClass=ratioClassStuffDetail[global.get('store').val.template.stuffDetailType[global.get('sectionType').val].ratio]['right']
                        //console.log(item.leftClass,item.rightClass)
                    }
                    if(!self.item){
                        leftRow.removeAttr('class')
                        rightRow.removeAttr('class')
                    }else if(self.item.leftClass!=item.leftClass){
                        leftRow.removeAttr('class')
                    }else if(self.item.rightClass!=item.rightClass){
                        rightRow.removeAttr('class')
                    }

                    // titles
                    /*var titles = {
                        canonical:item.link
                    }
                    console.log(titles)
                    global.set('titles',titles)*/


                    //console.log(item.stock)
                    //getCategoryName(item); // set name anf url category
                    self.objShare=seoContent.setDataItem(item);
                    //console.log(self.objShare)
                    if(item.blocks && item.blocks.length){
                        /*item.blocks.forEach(function (b) {
                            console.log(b)
                        })*/
                        item.blocks.sort(function(a,b){return a.index-b.index})
                        // формирование стилей блоков в браузере
                        var styleElement = document.getElementById('style'+item.url);
                        //console.log(styleElement)
                        if(!styleElement && false){
                            var css = '';
                            var preffix = '#blocks'+item.url;
                            item.blocks.forEach(function(block,i){
                                var p =preffix+i
                                var blocksStyleArr=compileStyleForBlock(block);
                                blocksStyleArr.forEach(function(el){
                                    css += p+" "+el;
                                })

                            })
                            //console.log(css)
                            var head = document.head || document.getElementsByTagName('head')[0],
                                style = document.createElement('style');

                            style.type = 'text/css';
                            style.id='style'+item.url
                            //console.log(style.id)
                            if (style.styleSheet){
                                style.styleSheet.cssText = css;
                            } else {
                                style.appendChild(document.createTextNode(css));
                            }
                            head.appendChild(style);
                            console.log('append')
                        }
                    }

                    if(reload){
                        $rootScope.$broadcast('reloadGallery')
                        //console.log(self.item.stockKeysArray)
                        for(var key in self.item){
                            if(key!='gallery' && key!='sortsOfStuff'){
                              if(item[key] && typeof item[key]!='function'){
                                  if(key=='stockKeysArray'){
                                      //console.log('stockKeysArray',item[key])
                                      $timeout(function () {
                                          self.item.stockKeysArray=item.stockKeysArray;
                                          //console.log(key,self.item.stockKeysArray)
                                      },700)
                                  }else{
                                      self.item[key]=item[key];
                                  }

                              }else{
                                  delete self.item[key]
                              }
                            }
                        }
                        for(var key in item){
                            if(key!='gallery' && key!='sortsOfStuff' && !self.item[key]){
                                self.item[key]=item[key];
                            }
                        }
                        //console.log(self.item.stockKeysArray)
                        /*var  $params = angular.copy($rootScope.$stateParams);
                        $params['stuffUrl'] = item.url;*/
                        //$rootScope.$state.go('.', {stuffUrl:item.url});

                        //$location.search('stuffUrl', item.url)

                        /*$rootScope.$state.go('stuffs.stuff', $params, {
                            location: 'replace', //  update url and replace
                            notify: false,
                            reload: false}
                            );*/

                        //$location.path('model/123').replace();
                        //$rootScope.$state.current.reloadOnSearch = false;
                        //$location.path('/zhenskaya-odezhda-optom/platya/plate-s-zanizhennoj-taliej');
                        self.activeSlide=0
                    }else{
                        self.item=item;
                        //$anchorScroll();
                    }
                    $anchorScroll();
                    return item;
                })
                .then(function(item){
                    console.dir(item)
                    /*console.log(_filtersO)
                    console.log(item.sortsOfStuff)*/
                    //console.log('item from server %o',item)
                    if(item.sortsOfStuff && item.sortsOfStuff.stuffs && item.sortsOfStuff.stuffs.length){
                        var filterGroup,filterGroupTags=[];
                        if(item.sortsOfStuff.filterGroup){
                            //filterGroup=global.get('filters').val.getOFA('_id',item.sortsOfStuff.filterGroup)
                            filterGroup= _filtersO[item.sortsOfStuff.filterGroup]
                            if(filterGroup){
                                filterGroupTags=filterGroup.tags.map(function(t){return t._id})
                            }
                        }
                        //console.log(filterGroup)
                        item.sortsOfStuff.stuffs.forEach(function (stuff,i) {
                            //console.log(stuff)
                            stuff.gallery.forEach(function (s,ii) {
                                //console.log(ii)
                                if(!ii){
                                    s.active=true
                                }else{
                                    s.active=false
                                }

                                //console.log(s)
                            })
                            for(var ii=0;ii<stuff.tags.length;ii++){
                                var idx=filterGroupTags.indexOf(stuff.tags[ii]);
                                if(idx>-1){
                                    //console.log(filterGroup.tags[idx])
                                    if(filterGroup.tags[idx].img){
                                        //item.sortsOfStuff.stuffs[i].gallery[0].thumbSmallSave=item.sortsOfStuff.stuffs[i].gallery[0].thumbSmall;
                                        item.sortsOfStuff.stuffs[i].gallery[0].thumbSmallTag=filterGroup.tags[idx].img
                                    }
                                    break;
                                }
                            }


                            /*var c = global.get('categories').val.getOFA('_id',stuff.category)
                            var linkData={groupUrl:'group',categoryUrl:'category'}
                            if(c){
                                linkData=angular.copy(c.linkData);
                            }
                            linkData.stuffUrl=stuff.url;
                            item.sortsOfStuff.stuffs[i].link=linkData;*/
                        })
                        self.item.sortsOfStuff=item.sortsOfStuff
                    }


                })
                .then(function(){
                    self.disqusConfig={
                        disqus_shortname: global.get('store').val.disqus,//'tatiana-lux'
                        disqus_identifier: self.item._id,
                        disqus_url: $location.absUrl(),
                        disqus_title:self.item.name,
                        disqus_config_language:global.get('store').val.lang,
                    }
                    if(reload){
                        var u = self.disqusConfig.disqus_url.split('/')
                        u[u.length-1]=self.item.url
                        self.disqusConfig.disqus_url=u.join('/')
                    }
                    //console.log(self.disqusConfig.disqus_url)
                    self.getComments(0);
                    self.commentName=(global.get('user').val)?global.get('user').val.name||global.get('user').val.profile.fio:''
                    if(self.item.addInfo){
                        return getAddInfos();
                    }

                })

                .then(function () {
                    //console.timeEnd('id for timer stuffDetail')
                    $timeout(function(){
                        $rootScope.$emit('$stateChangeEndToStuff');
                        carousel=$($element).find('.gallery-carousel')
                        //console.log(carousel)


                        //if(!reload){
                        if(false){
                            $('.carousel-control.right').click(function(){
                                //console.log(self.activeSlide)
                                if(self.activeSlide<self.item.gallery.length-1){self.activeSlide++}else{
                                    self.activeSlide=0;
                                }
                                slideDelay=true
                                $timeout(function () {
                                    slideDelay=false
                                },700)
                            })
                            $('.carousel-control.left').click(function(){
                                //console.log(self.activeSlide)
                                if(self.activeSlide){self.activeSlide--}else{
                                    self.activeSlide=self.item.gallery.length-1;
                                }
                                slideDelay=true
                                $timeout(function () {
                                    slideDelay=false
                                },700)
                            })
                        }

                    },300)
                })
                .then(function () {
                    //console.log(global.get('filters').val)
                    self.item.FullTags=self.item.tags.map(function(t){
                        if(t){
                            t = angular.copy(global.get('filterTags').val.getOFA('_id',t))
                            if(t){
                                if(t.filter && !t.filter._id){
                                    t.filter=global.get('filters').val.getOFA('_id',t.filter)
                                }
                                //console.log(t.name,global.get('filters').val.getOFA('_id',t.filter),t.filter)

                                return t;
                            }
                        }
                        return null
                    })
                    //console.log(self.item.FullTags)
                })
                .then(function () {
                    prepareStuffList()
                })
                .catch(function(err){
                    console.log(err)
                    err = err.data||err
                    exception.catcher('получение товара')(err)
                })
        }

        function activate(){
            if(global.get('tempContent') && global.get('tempContent').val){
                $('#tempContent').empty()
                global.set('tempContent',null)
            }
            $location.search('searchStr',null)
            $q.when()
                .then(function(){
                    return FilterTags.getFilterTags()
                })
                .then(function(filterTags){
                    self.filterTags=filterTags;
                    return Filters.getFilters()
                })
                .then(function(filters){
                    self.filters=filters;
                    return  getStuff($stateParams.stuffUrl)
                })
        }
        function getTagName(tag){
            if(tag){
                return self.filterTags.getOFA('_id',tag ).name;
            }
        }
        function getFilterName(filter){
            if(filter && _filterO[filter]){
                return _filterO[filter].name;
            }
        }
        function decreaseQty(){
            var stuff=self.item;
            if(stuff && stuff.quantity>1){
                if(stuff.multiple && stuff.minQty){
                    if(stuff.quantity-1>=stuff.minQty){
                        stuff.quantity--
                    }
                }else{
                    stuff.quantity--
                }

            }
        }
        function increaseQty(){
            var stuff=self.item;
            if(stuff) {
                if(stuff.single && stuff.maxQty){
                    if (stuff.quantity + 1 <= stuff.maxQty) {
                        stuff.quantity++
                    }
                }else{
                    stuff.quantity++
                }


            }
        }
        function chancheStuff(item) {
            //console.log(item)
            /*if(item.gallery[0].thumbSmallSave){
                item.gallery[0].thumbSmall=item.gallery[0].thumbSmallSave;
            }*/
            self.item.gallery=item.gallery
            self.activeSlide=0;
            getStuff(item.url,'reload')
        }
        function getAddInfos(){
            return $q(function(resolve,reject){
                if(self.item.addInfo){
                    AddInfo.get({id:self.item.addInfo,store:self.item.store},function(res){
                        self.item.addInfo=res;
                        resolve()
                    },function(err){reject(err)})
                }else{
                    resolve()
                }

            })
        }
        //$scope.$emit('cartslide',{event:'signLogin'})
        $rootScope.$on('cartslide',function (data) {
            if(global.get('user').val){
                self.commentName=global.get('user').val.name
            }

        })
        $rootScope.$on('logout',function (data) {
            self.commentName=''
        })
        /*$scope.$on('cartslide',function (data) {
            console.log(data)
        })*/
        function createNewComment(text){
            if(!text){return}
            if(!global.get('user').val){
                self.commentAccess=true;
                $timeout(function () {
                    self.commentAccess=false;
                },6000)
                return;
            }
            var newComment={text:text.substring(0,500),stuff:self.item._id,user:global.get('user' ).val.name}
            $q.when()
                .then(function(){
                    return Comments.save(newComment ).$promise;
                })
                .then(function(){
                    var o={addressee:'seller',type:'comment',content:''};
                    o.seller=global.get('store').val.seller._id;
                    o.content = "<h3>КОММЕНТАРИЙ К ТОВАРУ</h3>"+moment(Date.now()).format('LLL')+"<h4>"+self.item.name+((self.item.artikul)?' '+self.item.artikul:'')+"</h4>"+text.substring(0,30)+'...'
                    //console.log(o)
                    return $notification.save(o).$promise

                })
                .then(function () {
                    self.comment='';
                    return getComments(0)
                })
                .catch(function(err){
                    err = err.data||err
                    exception.catcher('создание комментария')(err)
                });
        }
        function getComments(page){
            if(page===0){self.paginate.page=page}else if(page==='more'){
                self.paginate.page++;
            }
            var query={stuff:self.item._id}
            //console.log(self.paginate)
            return Comments.getList(self.paginate,query)
                .then(function(data) {
                    if(self.paginate.page){
                        self.item.comments.push.apply(self.item.comments,data);
                    }else{
                        self.item.comments=data
                    }
                    //console.table(data)
                    return;
                })
                .catch(function(err){
                    err = err.data||err
                    exception.catcher('получение комментариев')(err)
                });
        }


        function chancheActiveSlide(index,swipe){
            //console.log(index,swipe)
            if(slideDelay){return}
            slideDelay=true
            $timeout(function () {
                slideDelay=false
            },700)
            //https://stackoverflow.com/questions/30300737/angular-ui-trigger-events-on-carousel
            if(swipe){
                carousel=$element.find('.gallery-carousel')
                if(swipe=='left'){
                    if(carousel && carousel.isolateScope && typeof carousel.isolateScope=='function'){
                        carousel.isolateScope().next();
                    }

                    //index = (self.activeSlide<self.item.gallery.length-1)?self.activeSlide+1:0;
                }else if(swipe=='right'){
                    if(carousel && carousel.isolateScope && typeof carousel.isolateScope=='function'){
                        carousel.isolateScope().prev();
                    }

                   // index = (self.activeSlide>0)?self.activeSlide-1:self.item.gallery.length-1;
                }
            }else{
                self.activeSlide=index;self.item.gallery[index].active=true;
            }
            //console.log(index)



        }
        function prepareStuffList() {
            // создание последовательности для перелистывания товаров
            if(global.get('stuffsInList').val){
                maxNumInRow=0;
                stuffsInList=[];
                currentStuffInList=0;
                for(var k in global.get('stuffsInList').val){
                    if(global.get('stuffsInList').val[k].length && global.get('stuffsInList').val[k].length>maxNumInRow){
                        maxNumInRow=global.get('stuffsInList').val[k].length;
                    }
                }
                for(var j=0;j<maxNumInRow;j++){
                    for(var i=1;i<=6;i++){
                        if(global.get('stuffsInList').val['td-list-'+i] && global.get('stuffsInList').val['td-list-'+i].length && global.get('stuffsInList').val['td-list-'+i][j]){
                            stuffsInList.push(global.get('stuffsInList').val['td-list-'+i][j])
                        }
                    }
                }

                for(var i=0;i<stuffsInList.length;i++){
                    if(self.item && self.item._id==stuffsInList[i]._id){
                        currentStuffInList=i;
                        break;
                    }
                }
            }
        }
        $scope.$on('addBlockAfterScrollDone',function () {
            console.log('addBlockAfterScrollDone')
            prepareStuffList()
            nextStuff()
        })
        function nextStuff() {
            /*console.log('nextStuff',stuffsInList)
            console.log(slideDelay)*/
            if(slideDelay){return}
            slideDelay=true
            $timeout(function () {
                slideDelay=false
            },400)
            //console.log(currentStuffInList,stuffsInList.length)
            if(currentStuffInList<stuffsInList.length-1){
                currentStuffInList++
                if(stuffsInList && stuffsInList[currentStuffInList]){
                    self.item=stuffsInList[currentStuffInList]
                }
            }else{
                console.log('addBlockAfterScroll')
                $rootScope.$broadcast('addBlockAfterScroll')

            }


            //getStuff(stuffsInList[currentStuffInList].url)
        }
        //console.log($scope.$parent)

        function prevStuff() {
            //console.log('prevStuff')
            if(slideDelay){return}
            slideDelay=true
            $timeout(function () {
                slideDelay=false
            },700)
            if(currentStuffInList>0){
                currentStuffInList--
            }
            if(stuffsInList && stuffsInList[currentStuffInList]){
                self.item=stuffsInList[currentStuffInList]
            }
            //getStuff(stuffsInList[currentStuffInList].url)
        }
        function returnToList() {
            $rootScope.$state.go('stuffs')
        }

    }

    homePageStuffCtrl.$inject=['$scope','global','Stuff','$q','$compile','$element','exception']
    function homePageStuffCtrl($scope,global,Stuff,$q,$compile,$element,exception) {
        var self=this;
        self.global=global;
        //console.log(self.homePageStuff,$element)
        activate();

        function activate(){
            $q.when()
                .then(function(filters){
                    return  Stuff.getItem(self.homePageStuff)
                })
                .then(function(item){
                    self.stuff=item;
                    //console.log($element[0].innerHTML)
                    var linkFn = $compile($element[0].innerHTML)
                    var content=linkFn($scope);
                    $element[0].innerHTML=null;
                    $element.append(content);

                    //console.log(content)
                    /*var linkFn = $compile($element);
                    var content = linkFn($scope);*/
                })
                .catch(function(err){
                    err = err.data||err
                    exception.catcher('get stuff home page')(err)
                })
        }

    }

    gallerySmallCtrl.$inject=['$element','$timeout','$scope','$attrs']
    function gallerySmallCtrl($element,$timeout,$scope,$attrs) {

        //var self=this;
        var galleryBigH,wrapDiv=$element.children()
        //console.log(wrapDiv)
        var paddingLeft=0,paddingRight=0;
        //self.activeSlide=0
        var arrowUp = $element.find('.arrow-up-gallery-small')
        var arrowDown = $element.find('.arrow-down-gallery-small')
        //console.log(arrowUp,arrowDown)
        $(arrowUp).css('display','none')
        $(arrowDown).css('display','none')
        $scope.arrowUp=function(display){
            if(display){
                $(arrowUp).css('display','inline-block')
            }else{
                $(arrowUp).css('display','none')
            }
        }
        $scope.arrowDown=function(display){
            if(display){
                $(arrowDown).css('display','inline-block')
            }else{
                $(arrowDown).css('display','none')
            }
        }
        $timeout(function(){

            var images = $element.find('img');
            $scope.loadCounter=images.length+1;

            var listener=$scope.$watch('loadCounter',function(n,o){
                if(n==0){
                    listener()

                    //console.log('!!!!!!')
                    top=$(child).offset().top;
                    bottom =$(child).offset().top+$(child).height()
                    left=$(child).offset().left;
                    right =$(child).offset().top+$(child).width()
                    //console.log(bottom,)

                    if(!$attrs.orientation || $attrs.orientation!="horizontal"){
                        child.style.right = child.clientWidth - child.offsetWidth + "px";
                        var topFirstImg=$(images[0]).offset().top
                        var bottomLastImg=$(images[images.length-1]).offset().top+$(images[images.length-1]).height()
                        if(top>topFirstImg){
                            $scope.arrowUp(true);
                        }
                        if(bottom<bottomLastImg){
                            $scope.arrowDown(true);
                        }
                    }else if($attrs.orientation && $attrs.orientation=="horizontal"){
                        paddingLeft=$(child).css('padding-left').replace(/[^-\d\.]/g, '');
                        paddingRight=$(child).css('padding-right').replace(/[^-\d\.]/g, '');
                        //console.log(paddingLeft,paddingRight)
                        var leftFirstImg=$(images[0]).offset().left
                        var rightLastImg=$(images[images.length-1]).offset().left+$(images[images.length-1]).width()
                        //console.log(left,leftFirstImg)
                        if(left>leftFirstImg){
                            $scope.arrowUp(true);
                        }
                        //console.log(right,rightLastImg)
                        if(right<rightLastImg){
                            $scope.arrowDown(true);
                        }
                    }


                }
            })

            var imagesQty=images.length,loadCounter=0;

            var imagesBig= $('.gallery-big img');
            //console.log(imagesBig.length)
            if(!imagesBig.length){
                imagesBig= $('.zoom-big-slide img');
            }
            //console.log(imagesBig.length)
            var galleryBigH;
            var child = $element.find('#gallery-small-container')[0];
            //console.log(child)
            var top=$(child).offset().top;
            var bottom =$(child).offset().top+$(child).height()
            var left=$(child).offset().left;
            var right =$(child).offset().top+$(child).width()

            //console.log($attrs,$attrs.orientation || $attrs.orientation!="horizontal")
           // console.log(child)

            imagesBig.each(function(i,img){
                if(!i){
                    if(!this.complete){
                        $(this).bind('load', function() {
                            //console.log(imagesBig.height())
                            if(!$attrs.orientation || $attrs.orientation!="horizontal"){
                                galleryBigH=imagesBig.height()
                                wrapDiv.css('height',galleryBigH)
                            }else if($attrs.orientation && $attrs.orientation=="horizontal"){
                                galleryBigH=imagesBig.width()
                                //console.log(galleryBigH)
                                wrapDiv.css('width',galleryBigH)
                            }
                            top=$(child).offset().top;
                            bottom =$(child).offset().top+$(child).height()
                            left=$(child).offset().left;
                            right =$(child).offset().top+$(child).width()
                            $timeout(function(){
                                $scope.loadCounter--
                            })

                            //console.log(left,right)
                        })
                    }else{
                        //console.log(imagesBig.height())
                        if(!$attrs.orientation || $attrs.orientation!="horizontal"){
                            galleryBigH=imagesBig.height()
                            wrapDiv.css('height',galleryBigH)
                        }else if($attrs.orientation && $attrs.orientation=="horizontal"){

                            galleryBigH=imagesBig.width()
                            //console.log(galleryBigH)
                            wrapDiv.css('width',galleryBigH)
                        }
                        top=$(child).offset().top;
                        bottom =$(child).offset().top+$(child).height()
                        left=$(child).offset().left;
                        right =$(child).offset().top+$(child).width()
                        $timeout(function(){
                            $scope.loadCounter--
                        })
                    }
                }
            })

            



            images.each(function(img){
                if(!this.complete){
                    $(this).bind('load', function() {
                        $scope.loadCounter--
                    })
                }else{
                    $scope.loadCounter--
                }

            })
            //console.log(imagesQty)
            $(child).bind('scroll', scrollFoo);
            function scrollFoo(reload) {
                console.log('scrollFoo')
                //if(reload){self.activeSlide=0;console.log(self.activeSlide)}
                if(!$attrs.orientation || $attrs.orientation!="horizontal"){
                    var top=$(child).offset().top;
                    var bottom =$(child).offset().top+$(child).height()
                    var topFirstImg=$(images[0]).offset().top
                    var bottomLastImg=$(images[imagesQty-1]).offset().top+$(images[imagesQty-1]).height()
                    //console.log(top,bottomFirstImg,bottom,bottomLastImg)
                    //console.log(bottom,bottomLastImg)
                    if(top>topFirstImg){
                        $scope.arrowUp(true);
                    }else{
                        $scope.arrowUp(false);
                    }
                    if(bottom<bottomLastImg){
                        $scope.arrowDown(true);
                    }else {
                        $scope.arrowDown(false);
                    }
                }else if($attrs.orientation && $attrs.orientation=="horizontal"){
                    var left=$(child).offset().left;
                    var right =$(child).offset().left+$(child).width()
                    var leftFirstImg=$(images[0]).offset().left
                    var rightLastImg=$(images[imagesQty-1]).offset().left+$(images[imagesQty-1]).width()
                    //console.log(left,leftFirstImg)
                    if(left>leftFirstImg){
                        $scope.arrowUp(true);
                    }else{
                        $scope.arrowUp(false);
                    }
                    //console.log(right,rightLastImg)
                    if(right<rightLastImg){
                        $scope.arrowDown(true);
                    }else {
                        $scope.arrowDown(false);
                    }
                }
            }
            function move_up() {
                if(!$attrs.orientation || $attrs.orientation!="horizontal"){
                    var scrollTop = child.scrollTop-500;
                    $(child).stop().animate({scrollTop:scrollTop}, '500', 'swing', function() {});
                }else if($attrs.orientation && $attrs.orientation=="horizontal"){
                    var scrollLeft = child.scrollLeft-200;
                    $(child).stop().animate({scrollLeft:scrollLeft}, '500', 'swing', function() {});
                }
            }

            function move_down() {
                console.log('move_down')
                if(!$attrs.orientation || $attrs.orientation!="horizontal"){
                    var scrollTop = child.scrollTop+500;
                    console.log(scrollTop,child)
                    $(child).stop().animate({scrollTop:scrollTop}, '500', 'swing', function() {});
                }else if($attrs.orientation && $attrs.orientation=="horizontal"){
                    //console.log(child.scrollLeft)
                    var scrollLeft = child.scrollLeft+200;
                    $(child).stop().animate({scrollLeft:scrollLeft}, '500', 'swing', function() {});
                }
            }
            function changeImg() {
                $timeout(function () {
                    var h=$('.gallery-big').height()
                    //console.log(h,galleryBigH)
                    if(h>galleryBigH){
                        galleryBigH=h;
                        wrapDiv.css('height',h)
                    }

                },700)
            }
            $scope.smallGalleryF={
                move_up:move_up,
                move_down:move_down,
                changeImg:changeImg
            };
            $scope.$on('reloadGallery',function(){
                //console.log('reload')
                $timeout(function () {
                    images = $element.find('img');
                    imagesQty=images.length;
                    scrollFoo('reload');
                    //self.activeSlide=0
                },300)

            })

        },100)


    }




    function nameBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/nameBlock.html',
        }
    }
    function positionBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/positionBlock.html',
        }
    }
    function videoLinkBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/videoLinkBlock.html',
        }
    }
    function textBlockStuff(){
        return {
            templateUrl: function(el,attrs){
                //console.log(el,attrs)
                var s=(attrs && attrs.blockTempl && attrs.blockTempl!='0')?attrs.blockTempl:'';
                return 'views/template/partials/stuffDetail/blocks/blocks/textBlock'+s+'.html'}
        }
    }
    function text2BlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/text2Block.html',
        }
    }
    function bannerBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/bannerBlock.html',
        }
    }
    function banner1BlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/banner1Block.html',
        }
    }
    function sliderBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/sliderBlock.html',
        }
    }
    function videoBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/videoBlock.html',
        }
    }
    function video1BlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/video1Block.html',
        }
    }
    function video2BlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/video2Block.html',
        }
    }
    function mapBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/mapBlock.html',
        }
    }
    function map1BlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/map1Block.html',
        }
    }
    function map2BlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/map2Block.html',
        }
    }
    function mastersBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/mastersBlock.html',
        }
    }
    function feedbackBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/feedbackBlock.html',
        }
    }
    function feedback1BlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/feedback1Block.html',
        }
    }
    function feedback2BlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/feedback2Block.html',
        }
    }
    function imgsBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/imgsBlock.html',
        }
    }
    function dateBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/dateBlock.html',
        }
    }
    function snBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/snBlock.html',
        }
    }
    function calendarBlockStuff(){
        return {
            templateUrl: 'views/template/partials/stuffDetail/blocks/blocks/calendarBlock.html',
        }
    }


    function itemDirectiveFromServer(){
        return {
            scope: {},
            bindToController: true,
            controllerAs: '$ctrl',
            template:"<div></div>",
            controller: stuffDetailFromServerCtrl,
            restrict:'E'
        }
    }
    stuffDetailFromServerCtrl.$inject=['$scope','$element','$compile','$http','$stateParams','$state','$anchorScroll','global','$q','$rootScope','$location','$timeout','$sce']
    function stuffDetailFromServerCtrl($scope,$element,$compile,$http,$stateParams,$state,$anchorScroll,global,$q,$rootScope,$location,$timeout,$sce){
        var self=this;
        self.global=global;
        $q.when()
            .then(function(){
                if(global.get('tempContent').val){
                    var html = global.get('tempContent').val;
                    $('#tempContent').empty()
                    global.set('tempContent',null)
                    var o ={data:{html:html}}
                    //console.log(tempTitles)
                    if(tempTitles){
                        o.data.titles=tempTitles
                    }
                    return o;
                }else{

                    return $http.get('views/template/partials/stuffDetail/stuffDetailNew/'+global.get('sectionType').val+'/'+$stateParams.stuffUrl+'.html')
                }
            })
            .then(function (response) {
                //console.log(response.data)
                var linkFn = $compile(response.data.html);
                var content = linkFn($scope);
                $element.append(content);
                //$element.append(response.data.html);
                $anchorScroll()
                //console.log(response.data.titles)
                //var titles = {}
                if(response.data.titles && response.data.titles.title){
                    for(var k in response.data.titles){
                        //console.log(k,response.data.titles[k])
                        if(response.data.titles[k]){
                            if(k=='title_______'){
                                //console.log(global.get('titles').val[k])
                                if(response.data.titles[k].indexOf(global.get('titles').val[k])<0){
                                    global.get('titles').val[k]=response.data.titles[k]+'. '+global.get('titles').val[k];
                                }else{
                                    global.get('titles').val[k]=response.data.titles[k];
                                }
                            }else if(k=='canonical'){
                                try{
                                    global.get('titles').val[k]=$sce.trustAsResourceUrl(response.data.titles[k]);
                                }catch(err){console.log(err)}

                                //console.log(global.get('titles').val[k])
                            }else{
                                global.get('titles').val[k]=response.data.titles[k]
                            }
                        }
                    }

                    //console.log(global.get('titles').val)
                }
                $rootScope.$emit('$stateChangeEndToStuff');
            })
    }


    function stuffFromServer(global,$timeout){
        return {
            scope: {
                stuffFromServer:'@'
            },
            bindToController: true,
            controllerAs: '$ctrl',
            restrict:'A',
            controller:function($scope,Stuff,global,$attrs,$stateParams,$q,seoContent,$timeout,$rootScope,$anchorScroll,$location,Comments,exception,$element){


                //console.log()
                var self=this;
                self.global=global;
                $scope.global=global;
                $scope.stuff=JSON.parse($attrs.stuffFromServer)
                //$scope.stuff22=JSON.parse($attrs.stuffFromServer)
                //console.log($scope.stuff22)
                $scope.stuff = Stuff.setDataForStuff($scope.stuff,global.get('filterTags').val)
                self.stuff=$scope.stuff;
                //console.log(self.stuff)
                self.item=$scope.stuff
                self.objShare=seoContent.setDataItem(self.item);
                //console.log(self.item)
                var stuffsInList=[];
                var currentStuffInList=null;
                var maxNumInRow=0;
                var slideDelay;
                self.global=global;
                self.lang=global.get('store').val.lang;
                self.rate=global.get('rate');
                self.mobile=global.get('mobile').val;
                self.crawler=global.get('crawler').val;
                self.currency=global.get('currency');
                self.moment=moment;
                self.activeSlide=0
                self.paginate={rows:5,page:0,items:0};// for comments
                self.gallery=[]


                self.chancheActiveSlide=chancheActiveSlide;
                self.getMastersName=getMastersName
                self.decreaseQty=decreaseQty;
                self.increaseQty=increaseQty;
                self.chancheStuff=chancheStuff;
                self.nextStuff=nextStuff;
                self.prevStuff=prevStuff;
                self.returnToList=returnToList;
                self.getComments=getComments;
                self.getTagName=getTagName;
                self.getFilterName=getFilterName;

                self.getAveragePrice=getAveragePrice;
                var currency=global.get('currency').val
                var formatAverage=global.get('store').val.currency[currency][4];
                var del=-1;
                if(formatAverage==1){del=-1}else if(formatAverage==2){del=0}else if(formatAverage==3){del=1} else if(formatAverage==4){del=2}
                self.formatPrice=global.get('store').val.currency[currency][5];
                if(typeof self.formatPrice=='undefined'){
                    self.formatPrice=2;
                }
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

                }



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
                function chancheActiveSlide(index,swipe){
                    //console.log(index,swipe)
                    if(slideDelay){return}
                    slideDelay=true
                    $timeout(function () {
                        slideDelay=false
                    },700)
                    //https://stackoverflow.com/questions/30300737/angular-ui-trigger-events-on-carousel
                    if(swipe){
                        var carousel=$element.find('.gallery-carousel')
                        if(swipe=='left'){
                            if(carousel && carousel.isolateScope && typeof carousel.isolateScope=='function'){
                                carousel.isolateScope().next();
                            }

                            //index = (self.activeSlide<self.item.gallery.length-1)?self.activeSlide+1:0;
                        }else if(swipe=='right'){
                            if(carousel && carousel.isolateScope && typeof carousel.isolateScope=='function'){
                                carousel.isolateScope().prev();
                            }

                            // index = (self.activeSlide>0)?self.activeSlide-1:self.item.gallery.length-1;
                        }
                    }else{
                        self.activeSlide=index;self.item.gallery[index].active=true;
                    }
                    //console.log(index)



                }
                function decreaseQty(){
                    var stuff=self.item;
                    if(stuff && stuff.quantity>1){
                        if(stuff.multiple && stuff.minQty){
                            if(stuff.quantity-1>=stuff.minQty){
                                stuff.quantity--
                            }
                        }else{
                            stuff.quantity--
                        }

                    }
                }
                function increaseQty(){
                    var stuff=self.item;
                    if(stuff) {
                        if(stuff.single && stuff.maxQty){
                            if (stuff.quantity + 1 <= stuff.maxQty) {
                                stuff.quantity++
                            }
                        }else{
                            stuff.quantity++
                        }


                    }
                }
                function chancheStuff(item) {
                    self.item.gallery=item.gallery
                    self.activeSlide=0;
                    getStuff(item.url)
                }
                function getComments(page){
                    if(page===0){self.paginate.page=page}else if(page==='more'){
                        self.paginate.page++;
                    }
                    var query={stuff:self.item._id}
                    //console.log(self.paginate)
                    return Comments.getList(self.paginate,query)
                        .then(function(data) {
                            if(self.paginate.page){
                                self.item.comments.push.apply(self.item.comments,data);
                            }else{
                                self.item.comments=data
                            }
                            //console.table(data)
                            return;
                        })
                        .catch(function(err){
                            err = err.data||err
                            exception.catcher('получение комментариев')(err)
                        });
                }

                $scope.$on('logged',function () {
                    self.commentName=(global.get('user').val)?global.get('user').val.name||global.get('user').val.profile.fio:''
                    //console.log(self.commentName)
                })
                function getStuff(url) {
                    if(self.item.stockKeysArray){
                        self.item.stockKeysArray=[]
                    }

                    var leftRow =  $('#stuffDetailLeftClass');
                    var rightRow = $('#stuffDetailRightClass')
                    return  $q.when()
                        .then(function(){
                            var o;
                            if($stateParams.store){
                                o={}
                                o.store=$stateParams.store;
                            }
                            return  Stuff.getItem(url,o)
                        })
                        .then(function(item){

                            self.gallery=item.gallery
                            //console.log(item.gallery)
                            if(item.grid!=null && item.grid!=undefined){
                                item.leftClass =ratioClassStuffDetail[item.grid]['left']
                                item.rightClass=ratioClassStuffDetail[item.grid]['right']
                            }else{
                                item.leftClass =ratioClassStuffDetail[global.get('store').val.template.stuffDetailType[global.get('sectionType').val].ratio]['left']
                                item.rightClass=ratioClassStuffDetail[global.get('store').val.template.stuffDetailType[global.get('sectionType').val].ratio]['right']
                            }
                            if(!self.item){
                                leftRow.removeAttr('class')
                                rightRow.removeAttr('class')
                            }else if(self.item.leftClass!=item.leftClass){
                                leftRow.removeAttr('class')
                            }else if(self.item.rightClass!=item.rightClass){
                                rightRow.removeAttr('class')
                            }

                            self.objShare=seoContent.setDataItem(item);


                            $rootScope.$broadcast('reloadGallery')
                            for(var key in self.item){
                                if(key!='gallery' && key!='sortsOfStuff'){
                                    if(item[key] && typeof item[key]!='function'){
                                        if(key=='stockKeysArray'){
                                            $timeout(function () {
                                                self.item.stockKeysArray=item.stockKeysArray;
                                            },700)
                                        }else{
                                            self.item[key]=item[key];
                                        }

                                    }else{
                                        delete self.item[key]
                                    }
                                }
                            }
                            for(var key in item){
                                //console.log(item.desc)
                                if(key!='gallery' && key!='sortsOfStuff' && !self.item[key]){
                                    self.item[key]=item[key];
                                }
                            }
                            self.activeSlide=0
                            //$anchorScroll();
                            if(item.sortsOfStuff && item.sortsOfStuff.stuffs && item.sortsOfStuff.stuffs.length){
                                var filterGroup,filterGroupTags=[];
                                if(item.sortsOfStuff.filterGroup){
                                    filterGroup= _filtersO[item.sortsOfStuff.filterGroup]
                                    if(filterGroup){
                                        filterGroupTags=filterGroup.tags.map(function(t){return t._id})
                                    }
                                }
                                item.sortsOfStuff.stuffs.forEach(function (stuff,i) {
                                    stuff.gallery.forEach(function (s,ii) {
                                        if(!ii){
                                            s.active=true
                                        }else{
                                            s.active=false
                                        }
                                    })
                                    for(var ii=0;ii<stuff.tags.length;ii++){
                                        var idx=filterGroupTags.indexOf(stuff.tags[ii]);
                                        if(idx>-1){
                                            if(filterGroup.tags[idx].img){
                                                item.sortsOfStuff.stuffs[i].gallery[0].thumbSmallTag=filterGroup.tags[idx].img
                                            }
                                            break;
                                        }
                                    }
                                })
                                self.item.sortsOfStuff=item.sortsOfStuff
                            }
                            setComments()
                            /*if(self.item.addInfo){
                                return getAddInfos();
                            }*/
                        })
                        .then(function () {
                            $timeout(function(){
                                $rootScope.$emit('$stateChangeEndToStuff');
                            },300)
                        })
                        .then(function () {
                            //console.log(global.get('filters').val)
                            self.item.FullTags=self.item.tags.map(function(t){
                                if(t){
                                    t = angular.copy(global.get('filterTags').val.getOFA('_id',t))
                                    if(t){
                                        if(t.filter && !t.filter._id){
                                            t.filter=global.get('filters').val.getOFA('_id',t.filter)
                                        }
                                        return t;
                                    }
                                }
                                return null
                            })
                        })
                        .then(function () {
                            //prepareStuffList()
                            //console.log(self.item.addInfo)
                        })
                        .catch(function(err){
                            console.log(err)
                            err = err.data||err
                            exception.catcher('получение товара')(err)
                        })
                }
                function setComments() {
                    if(global.get('store').val.disqus){
                        self.disqusConfig={
                            disqus_shortname: global.get('store').val.disqus,
                            disqus_identifier: self.item._id,
                            disqus_url: $location.absUrl(),
                            disqus_title:self.item.name,
                            disqus_config_language:global.get('store').val.lang,
                        }
                        var u = self.disqusConfig.disqus_url.split('/')
                        u[u.length-1]=self.item.url
                        self.disqusConfig.disqus_url=u.join('/')
                    }else{
                        self.getComments(0);
                        self.commentName=(global.get('user').val)?global.get('user').val.name||global.get('user').val.profile.fio:''
                        //console.log(global.get('user').val,self.commentName)
                    }
                }
                function prepareStuffList() {
                    // создание последовательности для перелистывания товаров
                    if(global.get('stuffsInList').val){
                        maxNumInRow=0;
                        stuffsInList=[];
                        currentStuffInList=0;
                        for(var k in global.get('stuffsInList').val){
                            if(global.get('stuffsInList').val[k].length && global.get('stuffsInList').val[k].length>maxNumInRow){
                                maxNumInRow=global.get('stuffsInList').val[k].length;
                            }
                        }
                        for(var j=0;j<maxNumInRow;j++){
                            for(var i=1;i<=6;i++){
                                if(global.get('stuffsInList').val['td-list-'+i] && global.get('stuffsInList').val['td-list-'+i].length && global.get('stuffsInList').val['td-list-'+i][j]){
                                    stuffsInList.push(global.get('stuffsInList').val['td-list-'+i][j])
                                }
                            }
                        }

                        for(var i=0;i<stuffsInList.length;i++){
                            if(self.item && self.item._id==stuffsInList[i]._id){
                                currentStuffInList=i;
                                break;
                            }
                        }
                    }
                }

                $scope.$on('addBlockAfterScrollDone',function () {
                    //console.log('addBlockAfterScrollDone')
                    prepareStuffList()
                    nextStuff()
                })

                function nextStuff() {
                    //console.log('nextStuff',stuffsInList)
                    if(slideDelay){return}
                    slideDelay=true
                    $timeout(function () {
                        slideDelay=false
                    },150)
                    //console.log(currentStuffInList,stuffsInList.length-1)
                    if(currentStuffInList<stuffsInList.length-1){
                        currentStuffInList++
                        //console.log('currentStuffInList++',currentStuffInList)
                        if(stuffsInList && stuffsInList[currentStuffInList]){
                            self.item=stuffsInList[currentStuffInList]
                        }
                    }else{
                        //console.log('addBlockAfterScroll')
                        $rootScope.$broadcast('addBlockAfterScroll')

                    }
                }

                function prevStuff() {
                    //console.log('prevStuff')
                    if(slideDelay){return}
                    slideDelay=true
                    $timeout(function () {
                        slideDelay=false
                    },700)
                    if(currentStuffInList>0){
                        currentStuffInList--
                    }
                    if(stuffsInList && stuffsInList[currentStuffInList]){
                        self.item=stuffsInList[currentStuffInList]
                    }
                }
                function returnToList() {
                    window.history.back()
                    //$rootScope.$state.go('stuffs')
                }

                function getTagName(tag){
                    if(tag){
                        return global.get('filterTagsO').val[tag].name;
                    }
                }
                function getFilterName(filter){
                    if(filter){
                        return global.get('filtersO').val[filter].name;
                    }
                }





                getMastersName();

                setComments()
            },
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                $timeout(function () {
                    if(global.get('stuffsInList').val){
                        if(element[0].parentElement && element[0].parentElement.parentElement && element[0].parentElement.parentElement.id && global.get('stuffsInList').val[element[0].parentElement.parentElement.id]){
                            global.get('stuffsInList').val[element[0].parentElement.parentElement.id].push(scope.stuff)
                        }
                    }
                },200)
                transclude(scope, function(clone) {
                    element.append(clone);
                });
            }

        }
    }



})()


