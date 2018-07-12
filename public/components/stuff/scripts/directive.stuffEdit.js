'use strict';
angular.module('gmall.directives')
    .directive('driveSale',driveSaleDirective)
    .directive('driveRetail',driveRetailDirective)

.directive('stuffEdit',['$anchorScroll','global','Stuff','$stateParams','$window','$q','$http','Category','Filters','Brands','$uibModal','$document','$location','AddInfo','Comments','exception','Photo','$timeout','$rootScope','Confirm','SetCSS','Blocks',function($anchorScroll,global,Stuff,$stateParams,$window,$q,$http,Category,Filters,Brands,$uibModal,$document,$location,AddInfo,Comments,exception,Photo,$timeout,$rootScope,Confirm,SetCSS,Blocks){
    return {
        restrict:"E",
        scope:{},
        templateUrl:"components/stuff/stuffEdit.html",
        link:function($scope,element,attrs){
            $scope.$ctrl={};
            $scope.$ctrl.lang=global.get('store').val.lang
            $scope.$ctrl.deleteSlideStuff=deleteSlideStuff;
            $scope.$ctrl.editSlideStuff=editSlideStuff;
            $scope.Items= Stuff.Items;
            $scope.$ctrl.Items= Stuff.Items;
            $scope.global=global;
            $scope.$stateParams=$stateParams;
            $scope.item={name:'name',artikul:'',index:0,price:0,minQty:0,maxQty:0}
            $scope.unitOfMeasure=global.get('store').val.unitOfMeasure;
            $scope.$ctrl.listOfBlocksForStuffDetailBlocks=listOfBlocksForStuffDetailBlocks;
            $scope.$ctrl.listOfBlocks=angular.copy(listOfBlocksForAll);


            $scope.$ctrl.addBlock=addBlock;
            $scope.$ctrl.deleteBlock=deleteBlock;
            $scope.$ctrl.saveField=saveFieldBlocks;
            $scope.$ctrl.type='Stuff';
            /*$scope.$ctrl.setStyles=setStyles;
             $scope.$ctrl.deleteSlide=deleteSlide;
            $scope.$ctrl.movedItem=movedItem;
             $scope.$ctrl.editSlide=editSlide;
             $scope.$ctrl.getBlockConfig=getBlockConfig
            */

            $scope.$ctrl.changeStock=changeStock;
            $scope.$ctrl.refreshBlocks=refreshBlocks;

            $scope.$ctrl.animationTypes=animationTypes;
            $scope.$ctrl.tinymceOption = {
                plugins: 'code print preview fullpage searchreplace autolink directionality  visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount  imagetools  contextmenu colorpicker textpattern help',
                // toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                toolbar: 'code | formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | code '
                //id:'editingText'

                /*plugins: 'link image code',
                 toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'*/
            };



            function getBlockConfig(block) {
                $q.when()
                    .then(function () {
                        return Blocks.getBlockConfig(block,$scope.item._id,'Stuff')
                    })
                    .then(function () {
                        return saveField($scope.item,'blocks')
                    })
                    .then(function () {
                        //activate()
                    })
            }
            //console.log(SetCSS)
            function setStyles(block){
                $q.when()
                    .then(function(){
                        return SetCSS.setStyles(block)
                    })
                    .then(function(){
                        if(block.elements){
                            saveFieldBlocks('blocks.'+block.i+'.elements',block.elements)
                        }
                        if(block.blockStyle){
                            saveFieldBlocks('blocks.'+block.i+'.blockStyle',block.blockStyle)
                        }
                        //saveFieldBlocks('blocks.'+block.i,block)
                    })

            }
            function saveFieldBlocks(field,value,defer,indexImgs){
                console.log(field,value)
                /*if(field.indexOf('index')>-1){
                    $scope.item.blocks.sort(function (a,b) {
                        return a.index-b.index
                    })
                }*/
                defer =(defer)?defer:100;
                setTimeout(function(){
                    var o={_id:$scope.item._id};
                    o[field]=value
                    var query={update:field}
                    if(field.indexOf('.imgs')>-1 && typeof indexImgs!='undefined'){
                        query.indexImgs=indexImgs;
                    }
                    $scope.Items.save(query,o,function () {
                        global.set('saving',true)
                        $timeout(function () {
                            global.set('saving',false);
                        },1500)
                    },function(err){
                        if(field.indexOf('desc1')>-1){
                            o[field+'L']={}
                            $scope.Items.save({update:field+'L'},o,function () {
                                o[field]=value
                                $scope.Items.save(query,o,function () {
                                    global.set('saving',true)
                                    $timeout(function () {
                                        global.set('saving',false);
                                    },1500)
                                })
                            })
                        }
                    });
                },defer)
            };

            function refreshBlocks() {
                return Stuff.getItem($stateParams.stuffUrl)
                //console.log(id)
                    .then(function(data) {
                        /*console.log(data)
                         console.log(self.item.blocks.length)*/
                        data.blocks.forEach(function (b,i) {
                            b.i=i;
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
                        $scope.item.blocks=data.blocks
                        /*console.log(self.item.blocks.length)*/
                    })
            }
            function addBlock(type){
                if(!type){return}
                $scope.$broadcast('addNewBlock',{type:type})
                $scope.$ctrl.newBlock=null;
                return;
                //console.log(type)

                var index=1;
                $scope.item.blocks.forEach(function(block){
                    if(block.index && block.index>=index){
                        index=block.index+1;
                    }
                })
                var o={_id:$scope.item._id,type:type,index:index,id:Date.now()};
                var update={update:'type index id',embeddedName:'blocks',embeddedPush:true};
                if(type=='slider'){
                    o.imgs=[];
                    update.update+=' imgs'
                }

                //console.log(update,o)
                $q.when()
                    .then(function () {
                        return $scope.Items.save(update,o).$promise;
                    })
                    .then(function (res) {
                        $scope.$ctrl.newBlock=null
                        return  Stuff.getItem($stateParams.stuffUrl)
                    })
                    .then(function (item) {
                        item.blocks.forEach(function(b,i){
                            b.i=i
                        })
                        $scope.item.blocks=item.blocks;
                    })
                    .catch(function(err){
                        if(err){
                            exception.catcher('добавление блока')(err)
                        }
                    })
            }
            function deleteBlock(block) {
                console.log(block)

                var o={_id:$scope.item._id};
                o['id']=block.id;
                var update={update:'id',embeddedName:'blocks'};
                update.embeddedPull=true;

                console.log(update,o)
                //return;
                Confirm('удалить?')
                    .then(function () {
                        return $scope.Items.save(update,o).$promise;
                    })
                    .then(function (res) {
                        $scope.item.blocks.splice(block.i,1)
                        $scope.item.blocks.forEach(function(b,i){
                            b.i=i;
                        })

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
                            return Photo.deleteFiles('Stuff',images)
                        }

                    })



            }

            var reload = false;
            //var buff_stuff=null;
            //console.log($stateParams)
            /*if($scope.unitOfMeasure){
                $scope.unitOfMeasure.unshift('')
            }*/



            //***** nav
            //console.log($stateParams)
            if($stateParams.block){
                $scope.block=$stateParams.block;

            }else{$scope.block='mainInfo'}
            $scope.cnahgeBlock=function(block){
                $scope.block=block;
                $location.search('block',block)
            }
            //*************************************
            function getAddInfos(){
                return $q(function(resolve,reject){
                    var query=$scope.item.category[0].filters.map(function(filter){return filter._id})
                    query={filter:{$in:query}}
                    AddInfo.query({query:query},function(res){
                        res.shift();
                        $scope.item.addInfos=res;
                        //console.log($scope.item.addInfos)
                        resolve()
                    },function(err){reject(err)})
                })
            }
            //*******************************************************
           // textangular took bar
            $scope.textAngularToolBar="[['h1','h2','h3'],['bold','italics']]";
            // filters
            //****************************************************************
            function _setTagsValue(){
                if(!this.category){return}
                if(this.category[0] && (!this.category[0].filters || !this.category[0].filters.length)){
                    // console.log($scope.item.category)
                    this.category[0].filters=$scope.filters;
                }
                //**********************
                var tags=this.tags;
                if (this.category[0].filters.length){
                    this.category[0].filters.forEach(function(filter){
                        filter.tags.forEach(function(tag){
                            if(tags.indexOf(tag._id)>-1){
                                tag.set=true;
                            } else{
                                tag.set=false;
                            }
                        })
                    })
                }
                //console.log(this.category.filters)
                return;
            }
            function _getTagName(tag,e){
                if(e)console.log(e)
                if(!this.category || !this.category.filters){return}
                if (this.category.filters.length){
                    for(var i= 0,l=this.category.filters.length;i<l;i++){
                        for(var ii= 0,ll=this.category.filters[i].tags.length;ii<ll;ii++){
                            if(this.category.filters[i].tags[ii]._id==tag){
                                return this.category.filters[i].tags[ii].name
                            }
                        }
                    }
                }
            }
            /*$scope.item={name:'name',
                priceSale:1,price:1,retail:1,artikul:'SKU',
                index:1,url:'url',desc:'description',
                setTagsValue:_setTagsValue,
                timePart:0
            }*/
            self.minDurationForService=global.get('store').val.seller.minDurationForService||15;
            $scope.deltaTimePart=1;
            //console.log(self.minDurationForService)
            switch (self.minDurationForService){
                case 30: $scope.deltaTimePart=2;break;
                case 60: $scope.deltaTimePart=4;break;
                case 90: $scope.deltaTimePart=6;break;
                case 120:$scope.deltaTimePart=8;break;
                default :$scope.deltaTimePart=1;
            }
            $scope.slider = {
                value: 0,
                options: {
                    ceil: 12,
                    floor: 0,
                    showSelectionBar: true,
                    showTicks: true,
                    getTickColor: function (value) {
                        if (value < 3)
                            return 'red';
                        if (value < 6)
                            return 'orange';
                        if (value < 9)
                            return 'yellow';
                        return '#2AE02A';
                    },
                    //onChange : saveField($scope.item,'timePart')
                    onChange : function(){
                        $scope.item.timePart=$scope.slider.value*$scope.deltaTimePart
                        saveField($scope.item,'timePart')
                    }
                }
            };

            $scope.$on('changeLang',function(){
                activate();
                /*$q.when()
                    .then(function(){
                        return  Stuff.getItem($stateParams.stuffUrl)
                    })
                    .then(function(item){
                        $scope.item.name=item.name
                        $scope.item.artikul=item.artikul
                        $scope.item.desc=item.desc
                        $scope.item.desc1=item.desc1
                        $scope.item.desc2=item.desc2
                    })*/

            })
            $scope.$ctrl.paginate1={rows:5,page:0,items:0};
            activate();
            function activate() {
                $q.when()
                    .then(function(){
                        return Filters.getFilters()
                    } )
                    .then(function(filters){
                        $scope.filters=filters;
                    })
                    .then(function(){
                        return  Stuff.getItem($stateParams.stuffUrl)
                    })
                    .then(function(item){
                        //console.log(item);
                       if(item.addInfo && item.addInfo._id){
                           item.addInfo=item.addInfo._id
                       }
                        if(!item.blocks){
                            item.blocks=[];
                            saveField(item,'blocks')
                        }
                        item.blocks.forEach(function(b,i){
                            b.i=i
                        })

                        if(!item.timePart){
                            item.timePart=0;
                        }
                        $scope.slider.value=item.timePart/$scope.deltaTimePart;

                        for(var key in item){
                            if (item.hasOwnProperty(key)) {
                                $scope.item[key]=item[key];
                            }
                        }
                        $scope.item.setTagsValue=_setTagsValue;
                        $scope.$ctrl.checked=(item.index==99999)?true:false;
                        $scope.$ctrl.getComments();
                        $scope.$ctrl.item=$scope.item;
                    })
                    .then(function(){
                        //console.log($scope.item.category)
                        if($scope.item.category){
                            if(typeof $scope.item.category != 'object'){
                                $scope.item.category=[$scope.item.category]
                            }
                            var q=$q.defer()
                            //console.log($scope.item.category,$scope.item.category[0])
                            Category.get({_id:$scope.item.category[0]},function(res){
                                //console.log($scope.item.category)
                                $scope.item.category[0]=res;
                                $scope.item.setTagsValue();
                                q.resolve();
                            },function(err){q.reject(err)})
                            return q.promise;
                        }
                    })
                    .then(function(){
                        $timeout(function () {
                            $scope.item.ready=true;
                        },2000)

                        $rootScope.$emit('$stateChangeEndToStuff');
                        var q=$q.defer()
                        if($scope.item.brand){
                            Brands.get({id:$scope.item.brand},function(res){
                                $scope.item.brand=res;
                                q.resolve();
                            },function(err){q.reject(err)})
                        }else{
                            q.resolve()
                        }
                        return q.promise;
                    })
                    .then(function(){
                        //console.log($scope.item.sortsOfStuff)
                        if($scope.item.sortsOfStuff){
                            //console.log($scope.item.sortsOfStuff.filter)
                            if($scope.item.sortsOfStuff.filter){
                                //console.log($scope.item.category[0])
                                $scope.item.sortsOfStuff.filter=angular.copy($scope.item.category[0].filters.getOFA('_id',$scope.item.sortsOfStuff.filter));
                                //console.log($scope.item.sortsOfStuff.filter)
                            }
                            if($scope.item.sortsOfStuff.filterGroup){
                                $scope.item.sortsOfStuff.filterGroup=angular.copy($scope.item.category[0].filters.getOFA('_id',$scope.item.sortsOfStuff.filterGroup));
                            }
                            if($scope.item.sortsOfStuff.stuffs && $scope.item.sortsOfStuff.stuffs.length){
                                $scope.item.sortsOfStuff.stuffs.forEach(function (stuff) {
                                    if(stuff.stock && typeof stuff.stock=='object'){
                                        for(var k21 in stuff.stock){
                                            stuff.stock[k21].quantity=Number(stuff.stock[k21].quantity)
                                        }
                                    }
                                })
                            }
                        }
                        return;
                    })
                    .then(function(){
                        $anchorScroll();
                        return getAddInfos();
                    })
                    .catch(function(err){
                        console.log(err)
                        //$window.history.back();
                    })
            }



            function calculatePriceSale(price){
               return Math.ceil10(Number(price)-(global.get('store').val.seller.sale/100)*price,-2);
            }
            function calculatePriceRetail(price){
                return Math.ceil10(Number(price)+(global.get('store').val.seller.retail/100)*price,-2);
            }
            function saveField(stuff,field){
                if(field=='name' ||field=='artikul' || field=='category' || field=='brand' || field=='brandTag'){
                    var lang= global.get('store').val.lang
                    //console.log($scope.item.keywords[lang]);
                    var k = $scope.item.name;
                    if($scope.item.artikul){
                        k+=' '+$scope.item.artikul;
                    }
                    if($scope.item.category && $scope.item.category[0] && $scope.item.category[0].nameL && $scope.item.category[0].nameL[lang]){
                        k+=' '+$scope.item.category[0].nameL[lang];
                    }
                    if($scope.item.brand && $scope.item.brand.nameL && $scope.item.brand.nameL[lang]){
                        k+=' '+$scope.item.brand.nameL[lang];
                        if($scope.item.brandTag){
                            var bt = $scope.item.brand.tags.getOFA('_id',$scope.item.brandTag);
                            if(bt && bt.nameL && bt.nameL[lang]){
                                k+=' '+bt.nameL[lang]
                            }
                        }
                    }
                    //console.log(k)
                    if(!$scope.item.keywords){$scope.item.keywords={}}
                    $scope.item.keywords[lang]=k;
                    field +=' keywords.'+lang
                }


                if(field=='price' || field=='name' ||field=='artikul' ||field=='actived' ||field=='category'||field=='index'){
                    reload =true;
                }
                //console.log(field)

                if(field==='price' || field==='driveSalePrice'|| field==='driveRetailPrice'){
                    for(var key in stuff.stock){
                        stuff.stock[key].price= stuff.price
                    }
                    stuff.setPrice()
                    field +=' stock';



                }
                if(field==='stock'){
                    //stuff.priceSale = calculatePriceSale(stuff.price);
                    if(stuff.sortsOfStuff && stuff.sortsOfStuff.differentPrice && stuff.store){
                        for(var key in stuff.stock){
                            if(key==stuff.sort && !stuff.stock[key].quantity){
                                stuff.sort=null;
                                field +=' sort'
                            }
                            stuff.stock[key].priceSale= calculatePriceSale(stuff.stock[key].price);
                            stuff.stock[key].retail= calculatePriceRetail(stuff.stock[key].price);
                        }
                    }else{
                        for(var key in stuff.stock){
                            if(key==stuff.sort && !stuff.stock[key].quantity){
                                stuff.sort=null;
                                field +=' sort'
                            }
                        }
                    }

                }
                if(field==='stock' || field==='price'){
                    stuff.priceForFilter=[]
                    for(var key in stuff.stock){
                        if(stuff.stock[key].quantity){
                            var c = (stuff.currency)?stuff.currency:global.get('store').val.mainCurrency;
                            var price =(c==global.get('store').val.mainCurrency)?stuff.stock[key].price:Math.ceil10(stuff.stock[key].price/global.get('store').val.currency[c][0],-2)
                            stuff.priceForFilter.push(price)
                        }
                    }
                    field +=' priceForFilter'
                }

                var o={_id:stuff._id};
                var fieldArr=field.split(' ');
                fieldArr.forEach(function(el){
                    if(el.indexOf('.')>-1){
                        var ks = el.split('.');
                        if(ks.length){
                            var d=$scope.item;
                            for(var i=0;i<ks.length;i++){
                                if(d[ks[i]]){
                                    d=d[ks[i]];
                                }
                            }
                            if(d && !d._id){
                                o[el]=d;
                            }
                        }
                    }else{
                        o[el]=stuff[el];
                    }

                })
                if(field=='archived'){
                    if(stuff['archived']){
                        o['archivedDate']=Date.now()
                    }else{
                        o['archivedDate']=null;
                    }
                    field +=' archivedDate'
                }
                //console.log(field,o)
                Stuff.Items.save({update:field},o,function(res){
                    $scope.growlNotification='сохранено';
                    global.set('saving',true);
                    $timeout(function () {
                        global.set('saving',false);
                    },1500)

                })
            }

            $scope.saveField = saveField;


            // select category in modal *************************


            $scope.selectCategory=function(){
                $q.when()
                    .then(function(){
                        return Category.select()
                    } )
                    .then(function(selectedCategory){
                       // console.log(selectedCategory)

                        if(!$scope.item.category || ($scope.item.category[0] && selectedCategory._id!=$scope.item.category[0]._id)){
                            Category.get({_id:selectedCategory._id},function(res){
                                $scope.item.category=[res];
                                if(res.mp && typeof res.mp =='object'){
                                    for(var key in res.mp){
                                        $scope.item.category.push(res.mp[key])
                                    }
                                }
                                console.log($scope.item.category)
                                $scope.item.setTagsValue();
                                var brandsArr=$scope.item.category[0].brands.map(function(el){return el._id});
                                var tagsArr=$scope.item.category[0].filters.reduce(function(tags,el){el.tags.forEach(function(t){tags.push(t._id)});return tags},[]);
                                //console.log(brandsArr,tagsArr)
                                var link='/'+selectedCategory.linkData.groupUrl+'/'+selectedCategory.linkData.categoryUrl+'/'+$scope.item.url;
                                var o ={_id:$scope.item._id,category:$scope.item.category.map(function(c){return c._id||c}),link:link}
                                var field='category link'
                                if($scope.item.brand && $scope.item.brand._id && brandsArr.indexOf($scope.item.brand._id)<0){
                                    $scope.item.brand=null;
                                    $scope.item.brandTag=null;
                                    field+=' brand brandTag'
                                    o.brnad=null;
                                    o.brandTag=null;
                                }
                                var oldLength=$scope.item.tags.length;
                                for(var i=0;i<$scope.item.tags.length;i++){
                                    if(tagsArr.indexOf($scope.item.tags[i])<0){
                                        console.log($scope.item.tags[i])
                                        $scope.item.tags.splice(i,1)
                                        i--;
                                    }
                                }
                                if(oldLength!=$scope.item.tags.length){
                                    field+=' tags';
                                    o.tags=$scope.item.tags;
                                }
                                //console.log(field)
                                $scope.saveField(o,field);
                                return;;

                            })
                        }
                    })
            }
            var editBody = $document.find('#filterBlock').eq(0);
            //console.log(editBody)
            $scope.selectFilter=function(filter,tags){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/selectCategoryModal/selectFilterModal.html',
                    controller: 'selectFilterModalCtrl',
                    size: 'sm',
                    appendTo:editBody,
                    resolve: {
                        filter: function () {
                            return filter;
                        },
                        tags: function () {
                            return tags;
                        }
                    }
                });
                modalInstance.result.then(function (selectedTags) {
                    //console.log(selectedTags)


                }, function () {
                    $scope.item.tags=[];
                    if ($scope.item.category[0].filters.length){
                        $scope.item.category[0].filters.forEach(function(filter){
                            filter.tags.forEach(function(tag){
                                if(tag.set){
                                    $scope.item.tags.push(tag._id)
                                }
                            })
                        })
                    }
                    //console.log($scope.item.tags);return;
                    $scope.saveField($scope.item,'tags');
                });
            }
            $scope.selectBrand=function(){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/selectCategoryModal/selectBrandModal.html',
                    controller: function($scope,$uibModalInstance,brandItem,brands){
                        $scope.brandItem=brandItem;
                        $scope.brands=brands;
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.ok = function (brandItem) {
                            $uibModalInstance.close(brandItem);
                        };
                    },
                    size: 'sm',
                    resolve: {
                        brandItem: function () {

                            return ($scope.item.brand && $scope.item.brand._id)?$scope.item.brand._id:null;
                        },
                        brands:function () {
                            return ($scope.item.category[0] && $scope.item.category[0].brands)?$scope.item.category[0].brands:[];
                        },
                    }
                });
                modalInstance.result.then(function (selectedBrand) {
                    if(!$scope.item.brand ||($scope.item.brand && selectedBrand!=$scope.item.brand._id)){
                        // get new brand;
                        $scope.item.brandTag=null;
                        if(!selectedBrand){
                            $scope.item.brand=selectedBrand;
                        }else{
                            Brands.get({id:selectedBrand},function(res){
                                $scope.item.brand=res;
                            })
                        }
                        $scope.saveField({_id:$scope.item._id,brand:selectedBrand,brandTag:$scope.item.brandTag},'brand brandTag');
                    }
                }, function () {
                });
            }
            $scope.selectBrandTag=function(){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/selectCategoryModal/selectBrandTagModal.html',
                    controller: 'selectBrandTagModalCtrl',
                    size: 'sm',
                    resolve: {
                        brandTag: function () {
                            return $scope.item.brandTag||null;
                        },
                        brandTags: function () {
                            return $scope.item.brand.tags||null;
                        }
                    }
                });
                modalInstance.result.then(function (selectedBrandTag) {
                    if(selectedBrandTag!=$scope.item.brandTag){
                        $scope.item.brandTag=selectedBrandTag;
                        $scope.saveField({_id:$scope.item._id,brandTag:$scope.item.brandTag},'brandTag');
                    }
                }, function () {
                });
            }
            //********************************************************
            //*************** additionl info *************************
            $scope.setAddInfos=function(filter,currentAddInfo){
                $q.when()
                    .then(function(){
                        return AddInfo.editTable(filter)
                    })
                    .then(function () {
                        getAddInfos()
                    })
                    .catch(function(){
                        getAddInfos()
                    })

                
            }
            //********************************************************

            //***************************************************
            $scope.backState=function(){
                //console.log(reload)
                if(reload){
                    $rootScope.reloadStuffId=$scope.item._id
                }
                $rootScope.$state.go('frame.stuffs',$rootScope.$stateParams,{reload:reload})
                /*if(reload){

                }else{
                    $rootScope.$state.go('frame.stuffs',$rootScope.$stateParams,{reload:false})
                }*/
            }
            $scope.getUrlParams=function(stuff){
                //console.log($scope.stuff.getUrlParams.call(stuff))
                return $scope.stuff.getUrlParams.call(stuff)
            }

            $scope.movedImage = function() {
                $timeout(function(){
                    $scope.item.gallery.forEach(function(el,i){
                        el.index=i;
                    })
                    $scope.Items.save({update:'gallery'},{_id:$scope.item._id,gallery:$scope.item.gallery})
                },100)

            };

            $scope.deleteImage = function(images,index){
                var files=[];
                if(images){
                    if(images.img){
                        files.push(images.img)
                    }
                    if(images.thumb){
                        files.push(images.thumb)
                    }
                    if(images.thumbSmall){
                        files.push(images.thumbSmall)
                    }
                }
                var data={files:files,id:$scope.item._id,_id:'deleteFilesFromStuff'};

                $q.when()
                    .then(function(){
                        return Photo.deleteFiles('Stuff',files);
                    })
                    .then(function(){
                        $scope.item.gallery.splice(index,1)
                        $scope.Items.save({update:'gallery'},{_id:$scope.item._id,gallery:$scope.item.gallery})
                    })
                    .catch(function(err){
                        err = err.data||err
                        exception.catcher('удаление файла')(err)
                    });

                /*Stuff.save(data).$promise
                    .then(function successCallback(response) {
                    $scope.item.gallery.splice(index,1)
                    $scope.Items.save({update:'gallery'},{_id:$scope.item._id,gallery:$scope.item.gallery})
                }, function errorCallback(response) {

                });*/

            }

           /* $scope.onSelected=function(){
                setTimeout(function(){
                    $(':focus').blur();
                })
            }*/
            //******************** comment ************************
            $scope.$ctrl.moment=moment;
            $scope.$ctrl.createNewComment=function(){
                //console.log(Comments)
                $q.when()
                    .then(function(){
                        return Comments.create()
                    })
                    .then(function(res){
                        var newComment={text:res,stuff:$scope.item._id,user:global.get('user' ).val._id}
                        return Comments.save(newComment ).$promise;
                    })
                    .then(function(){
                        return $scope.$ctrl.getComments(0)
                    })
                    .catch(function(err){
                        err = err.data||err
                        exception.catcher('создание комментария')(err)
                    });
            }

            $scope.$ctrl.getComments=function(page){
                if(page===0){$scope.$ctrl.paginate1.page=page}
                var query={stuff:$scope.item._id}
                return Comments.getList($scope.$ctrl.paginate1,query)
                    .then(function(data) {
                        $scope.$ctrl.comments = data;
                        return $scope.$ctrl.comments;
                    })
                    .catch(function(err){
                        err = err.data||err
                        exception.catcher('получение списка')(err)
                    });
            }
            $scope.$ctrl.deleteComment = function(id){
                $q.when()
                    .then(function() {
                        return Comments.delete({_id:id}).$promise;
                    })
                    .then(function(){
                        return $scope.$ctrl.getComments(0)
                    })
                    .catch(function(err){
                        err = err.data||err
                        exception.catcher('удаление комментария')(err)
                    });
            }
            $scope.$ctrl.saveCommentField = function(item,field){
                $q.when()
                    .then(function() {
                        var o={
                            _id:item._id
                        }
                        o[field]=item[field];

                        return Comments.save({update:field},o).$promise;
                    })
                    .catch(function(err){
                        err = err.data||err
                        exception.catcher('схранение комментария')(err)
                    });
            }
            $scope.$ctrl.setBigIndex = function(checked){
                if(checked){
                    $scope.item.index=99999;
                }else{
                    $scope.item.index=1;
                }
                $scope.saveField($scope.item,'index')
            }

            function deleteSlideStuff(image,index){
                //var data={file:images.img,id:self.item._id,_id:'fileDeleteFromImgs'}
                //News.save(data).$promise
                Photo.deleteFiles('Stuff',[image.img])
                    .then(function(response) {
                        $scope.item.imgs.splice(index,1)
                        $scope.saveField($scope.item,'imgs')
                    }, function(err) {
                        console.log(err)
                    });

            }
            function editSlideStuff(slide,index){
                //console.log(slide)
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/stuff/modal/editSlide.html',
                    controller: function(slide,$uibModalInstance){
                        var self=this;
                        self.item=slide;
                        self.ok=function(){
                            console.log(self.item)
                            $uibModalInstance.close(self.item);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    controllerAs:'$ctrl',
                    resolve: {
                        slide: function () {
                            return slide;
                        },
                    }
                });
                modalInstance.result.then(function (slide) {
                    console.log(slide)
                    $scope.saveField($scope.item,'imgs')
                }, function () {
                });
            }

            //******************** blocks ************************
            function deleteSlide(block,index){
                Photo.deleteFiles('Stuff',[block.imgs[index].img])
                    .then(function(response) {
                        block.imgs.splice(index,1)
                        saveFieldBlocks('blocks.'+block.i+'.imgs',block.imgs)
                    },function(err) {console.log(err)});
            }
            function editSlide(block,index){
                //console.log(index)
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/staticPage/editSlide.html',
                    controller: function(slide,$uibModalInstance){
                        var self=this;
                        self.item=slide;
                        self.ok=function(){
                            console.log(self.item)
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
                    saveFieldBlocks('blocks.'+block.i+'.imgs',block.imgs,null,index)
                }, function () {
                });
            }
            function movedItem(block,item) {
                $timeout(function(){
                    saveFieldBlocks('blocks.'+block.i+'.imgs',block.imgs)
                },100)
                return item;
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
    }
}])

function driveSaleDirective(){
    return {
        restrict:'E',
        bindToController: true,
        controllerAs: '$ctrl',
        controller: driveSaleCtrl,
    }
}
driveSaleCtrl.$inject=['$scope','$element','$uibModal']
function driveSaleCtrl($scope,$element,$uibModal) {
    //console.log($scope.$parent.item)
    $element.bind('click',function(){
        if(!$scope.item.driveSalePrice){$scope.item.driveSalePrice={type:0,condition:true,percent:0,sum:0}}
        editPriceSetting($scope.item.driveSalePrice,'driveSalePrice')
    })
    function editPriceSetting(data,field){
        $uibModal.open({
            animation: true,
            templateUrl: 'components/stuff/modal/editPriceSetting.html',
            controller: editPriceSettingModalCtrl,
            controllerAs:'$ctrl',
            resolve: {
                data: function () {
                    return data;
                },
                field:function(){
                    return field;
                }
            }
        }).result.then(function (data) {
            console.log(data)
            $scope.saveField($scope.item,'driveSalePrice')
        }, function () {});
    }

}
function driveRetailDirective(){
    return {
        restrict:'E',
        bindToController: true,
        controllerAs: '$ctrl',
        controller: driveRetailCtrl,
    }
}
driveRetailCtrl.$inject=['$scope','$element','$uibModal']
function driveRetailCtrl($scope,$element,$uibModal) {
    //console.log($scope.$parent.item)
    $element.bind('click',function(){
        if(!$scope.item.driveRetailPrice){$scope.item.driveRetailPrice={type:0,condition:true,percent:0,sum:0}}
        editPriceSetting($scope.item.driveRetailPrice,'driveRetailPrice')
    })
    function editPriceSetting(data,field){
        $uibModal.open({
            animation: true,
            templateUrl: 'components/stuff/modal/editPriceSetting.html',
            controller: editPriceSettingModalCtrl,
            controllerAs:'$ctrl',
            resolve: {
                data: function () {
                    return data;
                },
                field:function(){
                    return field;
                }
            }
        }).result.then(function (data) {
            console.log(data)
            $scope.saveField($scope.item,'driveRetailPrice')
        }, function () {});
    }

}
editPriceSettingModalCtrl.$inject=['data','field','$uibModalInstance'];
function editPriceSettingModalCtrl(data,field,$uibModalInstance) {
    var self=this;
    self.header='';
    if(field=='driveSalePrice'){
        self.header='sale';
    }else if(field=='driveRetailPrice'){
        self.header='розница';
    }
    self.item=data;
    self.ok=function(){
        console.log(self.item)
        $uibModalInstance.close(self.item);
    }
    self.cancel = function () {
        $uibModalInstance.dismiss();
    };
}


