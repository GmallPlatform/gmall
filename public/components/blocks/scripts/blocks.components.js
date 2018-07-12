'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('blocksEdit',blocksEdit)
        .directive('blockTextEdit',blockTextEdit)
        .directive('blockText1Edit',blockText1Edit)
        .directive('blockMediaEdit',blockMediaEdit)
        .directive('blockMedia1Edit',blockMedia1Edit)
        .directive('directive', function($compile, $interpolate) {
            return {
                template: '',
                link: function($scope, element, attributes) {
                    var s = (attributes.directive)?attributes.directive.toLowerCase():'undefined';
                    if(s=='categories' || s=='campaign' ||s=='info'||s=='news'||s=='brands'||s=='brandtags'||s=='filtertags'||s=='stuffs' || s=='scheduleplace'){
                        element.append($compile('<div items-block></div>')($scope));
                    }else{
                        element.append($compile('<div block-media1-edit></div>')($scope));
                    }


                }
            };
        })
        .directive('itemsBlock',itemsBlock)


        .directive('nameBlock',nameBlock)
        .directive('textBlock',textBlock)
        .directive('text2Block',text2Block)
        .directive('bannerBlock',bannerBlock)
        .directive('banner1Block',banner1Block)
        .directive('bannerOneBlock',banner1Block)
        .directive('sliderBlock',sliderBlock)
        .directive('videoBlock',videoBlock)
        .directive('video1Block',video1Block)
        .directive('video2Block',video2Block)
        .directive('mapBlock',mapBlock)
        .directive('map1Block',map1Block)
        .directive('map2Block',map2Block)
        .directive('mastersBlock',mastersBlock)
        .directive('feedbackBlock',feedbackBlock)
        .directive('feedback1Block',feedback1Block)
        .directive('feedback2Block',feedback2Block)

        .directive('stuffsBlock',itemsBlock)
        .directive('filtertagsBlock',itemsBlock)
        .directive('brandtagsBlock',itemsBlock)
        .directive('brandsBlock',itemsBlock)
        .directive('categoriesBlock',itemsBlock)
        .directive('campaignBlock',itemsBlock)
        .directive('newsBlock',itemsBlock)
        .directive('infoBlock',itemsBlock)


        .directive('dateBlock',dateBlock)
        .directive('positionBlock',positionBlock)
        .directive('videolinkBlock',videoLinkBlock)
        .directive('snBlock',snBlock)
        .directive('calendarBlock',calendarBlock)
        .directive('scheduleBlock',scheduleBlock)
        .directive('callBlock',callBlock)
        .directive('buttonBlock',buttonBlock)
        .directive('undefinedBlock',undefinedBlock)
        .directive('reviewBlock',reviewBlock)
        .directive('subscriptionBlock',subscriptionBlock)
        .directive('subscriptionaddBlock',subscriptionAddBlock)


        .directive('videolinkBlock',videolinkBlock)
        .directive('pricegoodsBlock',pricegoodsBlock)
        .directive('priceservicesBlock',priceservicesBlock)
        .directive('scheduleplaceBlock',scheduleplaceBlock)

    function infoBlock(){
        return {
            templateUrl: 'components/blocks/infoBlock.html',
        }
    }
    function filterTagsBlock(){
        return {
            templateUrl: 'components/blocks/filterTagsBlock.html',
        }
    }
    function categoriesBlock(){
        return {
            templateUrl: 'components/blocks/categoriesBlock.html',
        }
    }
    function newsBlock(){
        return {
            templateUrl: 'components/blocks/newsBlock.html',
        }
    }
    function reviewBlock(){
        return {
            templateUrl: 'components/blocks/reviewBlock.html',
        }
    }
    function subscriptionBlock(){
        return {
            templateUrl: 'components/blocks/subscriptionBlock.html',
        }
    }
    function subscriptionAddBlock(){
        return {
            templateUrl: 'components/blocks/subscriptionAddBlock.html',
        }
    }
    function undefinedBlock(){
        return {
            templateUrl: 'components/blocks/undefinedBlock.html',
        }
    }
    function nameBlock(){
        return {
            templateUrl: 'components/blocks/nameBlock.html',
        }
    }
    function positionBlock(){
        return {
            templateUrl: 'components/blocks/positionBlock.html',
        }
    }
    function videoLinkBlock(){
        return {
            templateUrl: 'components/blocks/videoLinkBlock.html',
        }
    }
    function textBlock(){
        return {
            templateUrl: 'components/blocks/textBlock.html',
        }
    }
    function text2Block(){
        return {
            templateUrl: 'components/blocks/text2Block.html',
        }
    }
    function bannerBlock(){
        return {
            templateUrl: 'components/blocks/bannerBlock.html',
        }
    }
    function banner1Block(){
        return {
            templateUrl: 'components/blocks/banner1Block.html',
        }
    }
    function sliderBlock(){
        return {
            templateUrl: 'components/blocks/sliderBlock.html',
        }
    }
    function videoBlock(){
        return {
            templateUrl: 'components/blocks/videoBlock.html',
        }
    }
    function video1Block(){
        return {
            templateUrl: 'components/blocks/video1Block.html',
        }
    }
    function video2Block(){
        return {
            templateUrl: 'components/blocks/video2Block.html',
        }
    }
    function mapBlock(){
        return {
            templateUrl: 'components/blocks/mapBlock.html',
        }
    }
    function map1Block(){
        return {
            templateUrl: 'components/blocks/map1Block.html',
        }
    }
    function map2Block(){
        return {
            templateUrl: 'components/blocks/map2Block.html',
        }
    }
    function mastersBlock(){
        return {
            templateUrl: 'components/blocks/mastersBlock.html',
        }
    }
    function feedbackBlock(){
        return {
            templateUrl: 'components/blocks/feedbackBlock.html',
        }
    }
    function feedback1Block(){
        return {
            templateUrl: 'components/blocks/feedback1Block.html',
        }
    }
    function feedback2Block(){
        return {
            templateUrl: 'components/blocks/feedback2Block.html',
        }
    }
    function imgsBlock(){
        return {
            templateUrl: 'components/blocks/imgsBlock.html',
        }
    }
    function itemsBlock(){
        return {
            templateUrl: 'components/blocks/itemsBlock.html',
        }
    }
    function dateBlock(){
        return {
            templateUrl: 'components/blocks/dateBlock.html',
        }
    }
    function snBlock(){
        return {
            templateUrl: 'components/blocks/sn.html',
        }
    }
    function calendarBlock(){
        return {
            templateUrl: 'components/blocks/calendarBlock.html',
        }
    }
    function scheduleBlock(){
        return {
            templateUrl: 'components/blocks/sheduleBlock.html',
        }
    }
    function callBlock(){
        return {
            templateUrl: 'components/blocks/callBlock.html',
        }
    }
    function buttonBlock(){
        return {
            templateUrl: 'components/blocks/buttonBlock.html',
        }
    }

    function calendarBlock(){
        return {
            templateUrl: 'components/blocks/calendarBlock.html',
        }
    }
    function videolinkBlock(){
        return {
            templateUrl: 'components/blocks/videolinkhpBlock.html',
        }
    }
    function pricegoodsBlock(){
        return {
            templateUrl: 'components/blocks/pricegoodsBlock.html',
        }
    }
    function priceservicesBlock(){
        return {
            templateUrl: 'components/blocks/priceservicesBlock.html',
        }
    }
    function scheduleplaceBlock(){
        return {
            templateUrl: 'components/blocks/scheduleplaceBlock.html',
        }
    }

    function blockTextEdit(){
        return {
            templateUrl: 'components/blocks/blockTextEdit.html',
        }
    }
    function blockText1Edit(){
        return {
            templateUrl: 'components/blocks/blockText1Edit.html',
        }
    }
    function blockMediaEdit(){
        return {
            templateUrl: 'components/blocks/blockMediaEdit.html',
        }
    }
    function blockMedia1Edit(){
        return {
            templateUrl: 'components/blocks/blockMedia1Edit.html',
        }
    }


    function blocksEdit(){
        return {
            scope: {
                item:'=',
                type:'@',
                activeSide:'=',
                refreshBlocks:'&'
            },
            restrict:'EA',
            bindToController: true,
            controller: blocksEditCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/blocks/blocksEdit.html',
        }
    }
    blocksEditCtrl.$inject=['$http','$uibModal','HomePage','$q','global','Photo','$fileUpload','SetCSS','Blocks','Confirm','EditModelData','Brands','Category','FilterTags','BrandTags','Stuff','News','Campaign','Info','exception','$timeout','Master','Stat','Additional','$scope','$rootScope']
    function blocksEditCtrl($http,$uibModal,HomePage,$q,global,Photo,$fileUpload,SetCSS,Blocks,Confirm,EditModelData,Brands,Category,FilterTags,BrandTags,Stuff,News,Campaign,Info,exception,$timeout,Master,Stat,Additional,$scope,$rootScope) {
        var self=this;

        if(self.item.blocks && self.item.blocks.forEach){
            self.item.blocks.forEach(function (b) {
                if(!b.desc){b.desc=''}
                if(!b.descL){b.descL={}}
                if(!b.desc1){b.desc1=''}
                if(!b.desc1L){b.desc1L={}}
                if(!b.name){b.name=''}
                if(!b.nameL){b.nameL={}}
                if(!b.name1){b.name1=''}
                if(!b.name1L){b.name1L={}}
                if(!b.videoLink){b.videoLink=''}
            })
        }

        if(self.item.date){self.item.date=new Date(self.item.date)}
        //console.log(self.item)
        if(!self.item.blocks){self.item.blocks=[]}

        if(self.type=='HomePage'){
            self.Items=HomePage;
            self.uploadUrl="/api/collections/Photo/fileUpload?collectionName=HomePage";
            self.uploadVideoUrl="/api/collections/Photo/uploadVideoFile?collectionName=HomePage"
        }else if(self.type=='Stuff'){
            self.Items=Stuff;
            self.uploadUrl="/api/collections/Photo/fileUpload?collectionName=Stuff";
            self.uploadVideoUrl="/api/collections/Photo/uploadVideoFile?collectionName=Stuff"
        }else if(self.type=='Master'){
            self.Items=Master;
            self.uploadUrl="/api/collections/Photo/fileUpload?collectionName=Master";
            self.uploadVideoUrl="/api/collections/Photo/uploadVideoFile?collectionName=Master"
        } else if(self.type=='News'){
            self.Items=News;
            self.uploadUrl="/api/collections/Photo/fileUpload?collectionName=News";
            self.uploadVideoUrl="/api/collections/Photo/uploadVideoFile?collectionName=News"
        } else if(self.type=='Stat'){
            self.Items=Stat;
            self.uploadUrl="/api/collections/Photo/fileUpload?collectionName=Stat";
            self.uploadVideoUrl="/api/collections/Photo/uploadVideoFile?collectionName=Stat"
        } else if(self.type=='Additional'){
            self.Items=Additional;
            self.uploadUrl="/api/collections/Photo/fileUpload?collectionName=Additional";
            self.uploadVideoUrl="/api/collections/Photo/uploadVideoFile?collectionName=Additional"
        } else if(self.type=='Category'){
            self.Items=Category;
            self.uploadUrl="/api/collections/Photo/fileUpload?collectionName=Category";
            self.uploadVideoUrl="/api/collections/Photo/uploadVideoFile?collectionName=Category"
        }else if(self.type=='BrandTags'){
            self.Items=BrandTags;
            self.uploadUrl="/api/collections/Photo/fileUpload?collectionName=BrandTags";
            self.uploadVideoUrl="/api/collections/Photo/uploadVideoFile?collectionName=BrandTags"
        }


        self.global=global

        self.listOfBlocks=listOfBlocksForAll;
        self.animationTypes=animationTypes;
        self.animationTypesForSlider=['sliceDown','sliceDownLeft','sliceUp','sliceUpLeft','sliceUpDown','sliceUpDownLeft','fold','fade','random','slideInRight','slideInLeft','boxRandom','boxRain','boxRainReverse','boxRainGrow','boxRainGrowReverse'];
        self.blockEditPermission={};
        self.blockSettingPermission={};
        self.blockEditTextPermission={};
        self.blockEditText1Permission={};
        self.blockEditMediaPermission={};
        self.blockEditMedia1Permission={};

        self.tinymceOptions = {
            plugins: 'code print preview fullpage searchreplace autolink directionality  visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount  imagetools  contextmenu colorpicker textpattern help',
            toolbar: 'code | formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | code '
        };
        //console.log(self.tinymceOptions)

        self.filterBlocks=filterBlocks;
        self.getBlockType=getBlockType;
        self.getNameBlock=getNameBlock;
        self.saveField=saveField;
        self.loadPhoto=loadPhoto;
        self.setStyles=setStyles;
        self.getBlockConfig=getBlockConfig;
        self.deleteBlock=deleteBlock;
        self.cloneBlock=cloneBlock;
        $scope.$on('addNewBlock',function (e,data) {
            //console.log(data)
            if(data && data.type){
                addNewBlock(data.type)
            }
        })

        self.deleteSlide=deleteSlide;
        self.editSlide=editSlide;
        self.deleteImg=deleteImg;

        self.deleteCollection=deleteCollection;
        /*self.editModelData=editModelData;*/
        self.setCollection=setCollection;
        self.changeSlidePhoto=changeSlidePhoto;
        self.movedItemInSlider=movedItemInSlider;
        self.movedItemInCollection=movedItemInCollection;



        /*console.log(self.Items)
        console.log(self.type)
        console.log(self.item)*/
        function filterBlocks(item) {
            if(self.activeSide){
                if(item.position==self.activeSide){
                    return true
                }
            }else{
                return true
            }

        }
        function getBlockType(type) {
            if(type=='scheduleplace'){
                return 'stuffs'
            }else{
                return type;
            }

        }
        function getNameBlock(type) {
            if(listOfBlocksForMainPage[type]){
                return listOfBlocksForMainPage[type]
            }else{
                return type;
            }
        }
        function saveField(field,value){
            //self.saveFoo({field:field,value:value})
            if(field.indexOf('index')>-1){
                self.item.blocks.sort(function (a,b) {
                    return a.index-b.index
                })
                self.item.blocks.forEach(function (b,i) {
                    b.i=i;
                })
                value=angular.copy(self.item.blocks);
                value.forEach(function (b) {
                    if(typeof b.videoLink=='object'){
                        b.videoLink=''
                    }
                    delete b.$$hashKey
                    delete b.__v;
                    //delete b._id;
                })
                field='blocks'
            }

            var defer =(defer)?defer:100;
            setTimeout(function(){
                if(field=='date'){
                    value=new Date(self.item[field])
                }
                //console.log(defer,value)
                var o={_id:self.item._id};
                o[field]=value
                var query={update:field}
                if(field.indexOf('.imgs')>-1 && typeof indexImgs!='undefined'){
                    query.indexImgs=indexImgs;
                }
                self.Items.save(query,o,function () {
                    global.set('saving',true)
                    $timeout(function () {
                        global.set('saving',false);
                    },1500)
                    if(field=='blocks'){
                        self.refreshBlocks()
                    }
                },function (err) {
                    if(err){
                        exception.catcher('save '+field)(err)
                    }
                });
            },defer)

        }
        function loadPhoto(block,field){
            $q.when()
                .then(function () {
                    if(field=='video'){
                        return $fileUpload.fileUpload(self.uploadVideoUrl,field,self.item.url)
                    }else{
                        return $fileUpload.fileUpload(self.uploadUrl,field,self.item.url)
                    }
                    console.log(self.uploadUrl)

                })
                .then(function (res) {
                    if(res && res.length){
                        var a=[];
                        if((field=='img' || field=='videoCover' || field=='video') && res[0].data && res[0].data.img){
                            if(block[field]){
                                a.push(block[field])
                            }
                            block[field]=res[0].data.img
                            saveField('blocks.'+block.i+'.'+field,block[field])
                        }else if(field=='imgs'){
                            if(!block.imgs){
                                block.imgs=[];
                            }
                            res.forEach(function (r) {
                                console.log(r.data)
                               if( r.data.imgs &&  r.data.imgs[0] &&  r.data.imgs[0].img){
                                    var o={img:r.data.imgs[0].img,index:block.imgs.length,active:true}
                                   block.imgs.push(o)
                               }
                            })
                            saveField('blocks.'+block.i+'.imgs',block.imgs)
                        }
                        if(a.length){
                            Photo.deleteFiles(self.type,a)
                        }

                    }

                    //console.log(res)
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
        function setStyles(block,idx){
            //console.log(block,idx)
            $q.when()
                .then(function(){
                    return SetCSS.setStyles(block)
                })
                .then(function(){
                    saveField('blocks.'+block.i+'.blockStyle',block.blockStyle)
                    if(block.elements){
                        saveField('blocks.'+block.i+'.elements',block.elements)
                    }
                    /*console.log(block.mobile)
                    console.log(block.tablet)
                    return;*/
                    if(block.mobile){
                        saveField('blocks.'+block.i+'.mobile',block.mobile)
                    }
                    if(block.tablet){
                        saveField('blocks.'+block.i+'.tablet',block.tablet)
                    }
                })

        }
        function getBlockConfig(block) {
            $q.when()
                .then(function () {
                    return Blocks.getBlockConfig(block,self.item.url,self.type)
                })
                .then(function () {
                    saveField('blocks.'+block.i,block)
                })

        }
        function deleteBlock(block,idx) {
            //self.deleteFoo({block:block})
            var o={_id:self.item._id};
            var update={update:'_id_id',embeddedName:'blocks'};
            o['id']=block.id;
            update.embeddedPull=true;
            Confirm('потверждаете?')
                .then(function () {
                    $rootScope.$emit('$stateChangeStartToStuff');



                    //console.log(idx)
                    //self.item.blocks.splice(idx,1)
                    if(!block._id){
                        update={update:'blocks'};
                        o['blocks']=self.item['blocks']
                    } else{
                        o['_id_id']=block._id;
                        update={update:'_id_id',embeddedName:'blocks'};
                        update.embeddedPull=true;
                    }
                    //console.log(update,o)
                    return $q(function (res,rej) {
                        self.Items.save(update,o,function () {
                            res()
                        },function (err) {
                            rej(err)
                        })
                    })
                    //return self.Items.save(update,o).$promise;
                })
                .then(function () {
                    return self.refreshBlocks()
                })
                .then(function (res) {
                    $rootScope.$emit('$stateChangeEndToStuff');
                    var images=[]
                    if(block.img){
                        images.push(block.img);
                    }
                    if(block.video){
                        images.push(block.video);
                    }
                    if(block.videoCover){
                        images.push(block.videoCover);
                    }
                    if(block.imgs && block.imgs.length){
                        block.imgs.forEach(function(im){
                            if(im.img){
                                images.push(im.img);
                            }
                        })
                    }
                    if(images.length){
                        return Photo.deleteFiles('Stat',images)
                    }

                })
                .catch(function (err) {
                    $rootScope.$emit('$stateChangeEndToStuff');
                    console.log(err)
                    exception.catcher('delete block')(err)
                })


        }
        function addNewBlock(type) {
            try{
                var index=1;
                self.item.blocks.forEach(function(block){
                    if(block.index && block.index>=index){
                        index=block.index+1;
                    }
                })
                var o={_id:self.item._id,type:type,index:index,id:Date.now()};
                var update={update:'type index id',embeddedName:'blocks',embeddedPush:true};
                o.imgs=[];
                update.update+=' imgs'
                //console.log(activeSide)
                if(self.activeSide){
                    update.update+=' position';
                    o.position=self.activeSide
                }
            }catch(err){
                console.log(err)}

            $q.when()
                .then(function () {
                    $rootScope.$emit('$stateChangeStartToStuff');
                    return $q(function (res,rej) {
                        self.Items.save(update,o,function () {
                            res()
                        },function (err) {
                            rej(err)
                        })
                    })
                    //return self.Items.save(update,o).$promise;
                })
                .then(function (res) {
                    return self.refreshBlocks()
                })
                .then(function () {
                    $rootScope.$emit('$stateChangeEndToStuff');
                })
                .catch(function(err){
                    $rootScope.$emit('$stateChangeEndToStuff');
                    if(err){
                        exception.catcher('добавление блока')(err)
                    }
                })
        }
        function cloneBlock(block) {
            var bl = angular.copy(block)
            var index=1;
            self.item.blocks.forEach(function(block){
                if(block.index && block.index>=index){
                    index=block.index+1;
                }
            })
            var o={_id:self.item._id,index:index,id:Date.now()};
            var update={update:'index id',embeddedName:'blocks',embeddedPush:true};

            for(var key in bl){
                if((key=='type' || key=='is' || key=='nameAnimate'|| key=='name1Animate'|| key=='nameAnimateDelay'|| key=='audio'|| key=='templ'
                    || key=='style'|| key=='blockStyle'|| key=='elements'|| key=='mobile'|| key=='tablet'|| key=='animate'|| key=='animateRepeat'
                    || key=='duration'|| key=='position') && bl[key]){
                    update.update+=' '+key
                    o[key]=bl[key]
                }
                /*if(key[0]!='_' && key!='index' && key!='id' && key !='_id' && key!='i' && key!='img' && key!="imgs"
                    && key!='stuffs' && key!='brands' && key!='brandTags' && key!='categories'&& key!='info' && key!='campaign'&& key!='filterTags' && key!='news'
                    && key!='videoLink' &&  key!='name' && key!='nameL' && key!='name1' && key!='name1L' && key!='desc' && key!='descL' && key!='desc1' && key!='desc1L'
                    && key!='template' && key!='nameTemplate'){
                    update.update+=' '+key
                    o[key]=bl[key]
                }*/
            }
            /*console.log(bl)
            console.log(update)
            console.log(o)
            return;*/


            $q.when()
                .then(function () {
                    return self.Items.save(update,o).$promise;
                })
                .then(function (res) {
                    self.refreshBlocks()
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('добавление блока')(err)
                    }
                })
        }

        function deleteSlide(block,index){
            Confirm('Удалить?')
                .then(function () {
                    return Photo.deleteFiles(self.type,[block.imgs[index].img])
                })
                .then(function(response) {
                    block.imgs.splice(index,1)
                    block.imgs.forEach(function (slide,i) {
                        slide.index=i
                    })
                    saveField('blocks.'+block.i+'.imgs',block.imgs)
                },function(err) {console.log(err)});
        }
        function editSlide(block,index){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/blocks/editSlide.html',
                controller: function(slide,$uibModalInstance,global){
                    var self=this;
                    self.item=slide;
                    self.lang=global.get('store').val.lang
                    self.ok=function(){
                        //console.log(self.item)
                        $uibModalInstance.close(self.item);
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                size:'lg',
                resolve: {
                    slide: function () {
                        return block.imgs[index];
                    },
                }
            });
            modalInstance.result.then(function (slide) {
                //console.log(slide)
                self.saveField('blocks.'+block.i+'.imgs',block.imgs)
            }, function () {
            });
        }
        function deleteImg(block,field) {
            Confirm('Удалить?')
                .then(function () {
                    return Photo.deleteFiles(self.type,[block[field]])
                })
                .then(function(response) {
                    block[field]=null;
                    saveField('blocks.'+block.i+'.'+field,block[field])
                },function(err) {console.log(err)});
        }

        function changeSlidePhoto(block,idx) {
            console.log(idx)
            $q.when()
                .then(function () {
                    return $fileUpload.fileUpload(self.uploadUrl,'img',self.item.url)
                })
                .then(function (res) {
                    if(res && res.length){
                        var a=[];
                        if(res[0].data && res[0].data.img){
                            if(block.imgs[idx].img){
                                a.push(block.imgs[idx].img)
                            }
                            block.imgs[idx].img=res[0].data.img
                            saveField('blocks.'+block.i+'.imgs',block.imgs)
                        }
                        if(a.length){
                            Photo.deleteFiles(self.type,a)
                        }

                    }
                })
                .catch(function (err) {
                    exception.catcher('load photo')(err)
                    console.log(err)
                })

        }
        function movedItemInSlider(block) {
            $timeout(function () {
                block.imgs.forEach(function (item,i) {
                    item.index=i
                })
                saveField('blocks.'+block.i+'.imgs',block.imgs)
            },300)
        }

        function movedItemInCollection(block) {
            /*console.log(block[block.type].map(function (item) {
                return item._id
            }))*/
            $timeout(function () {
                var data = block[block.type].map(function (item) {
                    return item._id
                })
                //console.log(data)
                saveField('blocks.'+block.i+'.'+block.type,data)
            },300)
        }


        /*models*/
        function deleteCollection(block,idx){
            Confirm('Удалить?').then(function () {
                block[block.type].splice(idx,1);
                var data = block[block.type].map(function (item) {
                    return item._id
                })
                self.saveField('blocks.'+block.i+'.'+block.type,data)
            })
        }
        function setCollection(block,idx){
            console.log(block)
            var field=block.type;
            if(field=='scheduleplace'){
                field='stuffs'
            };
            if(!block[field]){block[field]=[]}
            var collections=block[field];
            var Items;
            if(typeof idx=='undefined'){idx=block[field].length;}
            if(field=='brands'){
                Items=Brands;
            } else if(field=='categories'){
                Items=Category;
            } else if(field=='filterTags'){
                Items=FilterTags;
            }else if(field=='brandTags'){
                Items=BrandTags;
            }else if(field=='stuffs'){
                Items=Stuff;
            }else if(field=='news'){
                Items=News;
            }else if(field=='campaign'){
                Items=Campaign;
            }else if(field=='info'){
                Items=Info;
            }
            $q.when()
                .then(function(){
                    return Items.select({actived:true})
                })
                .then(function(item){
                    //console.log(item)
                    collections[idx]=item;
                    var data = block[field].map(function (item) {
                        return item._id
                    })
                    console.log(field)
                    self.saveField('blocks.'+block.i+'.'+field,data)

                })
                .catch(function(){
                    console.log('dismiss')
                })
        }
        function editModelData(block,i){
            var field=block.type,model;
            if(field=='scheduleplace'){
                field=='stuffs'
            };
            var items=block[field]
            if(items[i] && items[i]._id){
                if(field=='brands'){
                    model='Brand';
                } else if(field=='categories'){
                    model='Category';
                } else if(field=='filterTags'){
                    model='FilterTags';
                }else if(field=='brandTags'){
                    model='BrandTags';
                }else if(field=='stuffs'){
                    model='Stuff';
                }else if(field=='news'){
                    model='News';
                }else if(field=='campaign'){
                    model='Campaign';
                }else if(field=='info'){
                    model='Info';
                }
                $q.when()
                    .then(function(){
                        return EditModelData.doIt(model,items[i]._id,items[i])
                    })
                    .then(function(img){
                        console.log(img==items[i].img)
                        if(img && img!=items[i].img){
                            items[i].img=img
                            console.log(img)
                        }

                    })

            } else{
                setCollection(items,i,field)
            }

        }
    }


    angular.module('gmall.services')
        .service('Blocks',blocks)
    blocks.$inject=['$http','$uibModal','HomePage','$q','global','Photo']
    function blocks($http,$uibModal,HomePage,$q,global,Photo) {
        return {
            getBlockConfig:getBlockConfig
        }
        function getBlockConfig(block,itemUrl,model) {
            return $q.when()
                .then(function () {
                    return $http.get('/api/getBlocksForAll/'+block.type)
                })
                .then(function (res) {
                    if(res.data){
                        return selectItemFromList(res.data)
                    }
                })
                .then(function (b) {
                    if(b){
                        if(b.allData){
                            if(block.img){
                                Photo.deleteFiles(model,[block.img])
                            }else if(block.video){
                                Photo.deleteFiles(model,[block.video])
                            }else if(block.imgs && block.type!='stuffs'){
                                var a=[];
                                block.imgs.forEach(function (i) {
                                    a.push(i.img)
                                })
                                if(a.length){
                                    Photo.deleteFiles(model,a)
                                }
                            }
                            for(var key in block){
                                if(key!='_id' && key!='index' &&  key!='i' &&  key!='position'){
                                    delete block[key]
                                }
                            }
                            var photos=[];
                            for(var key in b){
                                if(key!='_id' && key!='template' && key !='nameTemplate' && key!='index' &&  key!='i'){
                                    if(key=='img' && b[key]){
                                        var p = b[key].split('/')
                                        p[p.length-2]=itemUrl;
                                        p[p.length-3]=model;
                                        p[p.length-4]=global.get('store').val.subDomain;

                                        var img = p[p.length-1].split('.')
                                        img[img.length-2] +='copy'
                                        p[p.length-1]=img.join('.')
                                        block[key]=p.join('/')
                                        photos.push([b[key],block[key]])
                                    }else if(key=='imgs' && b[key] && b[key].length){
                                        b[key].forEach(function (i) {
                                            if(i.img){
                                                var p = i.img.split('/')
                                                p[p.length-2]=itemUrl;
                                                p[p.length-3]=model;
                                                p[p.length-4]=global.get('store').val.subDomain;

                                                var img = p[p.length-1].split('.')
                                                img[img.length-2] +='copy'
                                                p[p.length-1]=img.join('.')
                                                photos.push([i.img,p.join('/')])
                                                i.img=p.join('/');
                                            }

                                        })
                                        block[key] = b[key];
                                    }else if(key=='video' && b[key]){
                                        var p = b[key].split('/')
                                        p[p.length-2]=itemUrl;
                                        p[p.length-3]=model;
                                        p[p.length-4]=global.get('store').val.subDomain;
                                        var img = p[p.length-1].split('.')
                                        img[img.length-2] +='copy'
                                        p[p.length-1]=img.join('.')
                                        block[key]=p.join('/')
                                        photos.push([b[key],block[key]])
                                    }else if(key!='link'){
                                        block[key] = b[key];
                                        if(key=='button'){
                                            block.button.link=null;
                                        }

                                    }
                                }
                            }
                            var folder = '/images/'+global.get('store').val.subDomain+'/'+model+'/'+itemUrl;
                            var o={folder:folder,photos:photos};
                            return $http.post(photoUpload+'/api/copyPhotosFromBrowser',o)
                        }else{
                            block.templ=b.templ;
                            block.style=b.style;
                            block.blockStyle=b.blockStyle;
                            block.elements=b.elements;
                            block.mobile=b.mobile;
                            block.tablet=b.tablet;
                            block.animate=b.animate;
                            block.animateRepeat=b.animateRepeat;
                            block.duration=b.duration;
                        }
                    }
                })

        }
        function selectItemFromList(items,header){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/blocks/selectItem.html',
                controllerAs:'$ctrl',
                controller: function ($uibModalInstance ,global,items,header) {
                    var self=this;
                    self.items=items;
                    self.header=header||'выберите из предложенного списка'
                    self.selectItem=selectItem;
                    self.cancel = cancel;

                    function selectItem(item){
                        $uibModalInstance.close(item);
                    }
                    function cancel() {
                        $uibModalInstance.dismiss();
                    };
                },
                resolve: {
                    items:function () {
                        return items
                    },
                    header:function () {
                        return header
                    }
                }
            });
            return modalInstance.result
        }
    }

})()

