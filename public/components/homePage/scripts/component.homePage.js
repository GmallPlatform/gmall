'use strict';
/*var lengthStyleBlock=19;
var arrEmptyForProperties=[];
for(var i=0;i<lengthStyleBlock;i++){arrEmptyForProperties.push('')}*/

angular.module('gmall.services')
.service('HomePage', function($resource,$uibModal){
    //console.log(stuffHost)
    var Items= $resource('/api/collections/HomePage/:_id',{_id:'@_id'});
    this.query=Items.query;
    this.get=Items.get;
    this.delete=Items.delete;
    this.save=Items.save;
    this.selectItemFromList=selectItemFromList;

    function selectItemFromList(items,header){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/homePage/selectItem.html',
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


})
    .directive('parallaxBanner',function($timeout) {
        return {
            scope: {},
            restrict: 'C',
            link:function (scope,elem,attr) {
                //console.log('link',elem,$(elem).offset().top)
                var $window=$(window)
                //doIt();
                $timeout(function () {
                    doIt()
                },100)

                $(window).scroll(doIt);
                function doIt() {
                    //console.log(elem,$(elem).offset().top);
                    var elementTop = $(elem).offset().top;
                    var elementBottom = elementTop + $(elem).outerHeight();
                    var viewportTop = $(window).scrollTop();
                    var viewportBottom = viewportTop + $(window).height();
                    var viewportHeight = $(window).height();
                    if (elementTop<viewportBottom){
                        var lastPositionY=parseInt(elem.css('background-position-y'));
                        var yPos = (elementTop-viewportBottom+$(elem).height())/4;
                        var delta = lastPositionY-yPos;
                        /*if(delta>150){
                         console.log(delta)
                         }*/
                        var coords = '0% '+ yPos + 'px';
                        elem.css({
                            backgroundPosition: coords
                        });

                    }
                }
                /*scope.$on('$destroy', function() {
                    console.log('$destroy$destroy')
                    angular.element($window).off('scroll',doIt);
                });
                this.$onInit = function () {
                    console.log('$onInit')
                };

                this.$onDestroy = function () {
                    console.log('$onDestroy')
                };*/
                elem.on('$destroy', function(){
                    //console.log('$destroy')
                    angular.element($window).off('scroll',doIt);
                });

            }
        }
    })
.directive('homePage',function(){
    return {
        scope: {},
        restrict:'E',
        bindToController: true,
        controller: homePageCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/homePage/homePage.html',
    }
    homePageCtrl.$inject=['HomePage','$stateParams','$state','$q','global','$http','$uibModal','Stuff','FilterTags','Category','BrandTags','exception','Store','Brands','EditModelData','Photo','News','Campaign','Info','$scope','$timeout','Confirm','SetCSS','$rootScope'];
    function homePageCtrl(HomePage,$stateParams,$state,$q,global,$http,$uibModal,Stuff,FilterTags,Category,exception,BrandTags,Store,Brands,EditModelData,Photo,News,Campaign,Info,$scope,$timeout,Confirm,SetCSS,$rootScope){
        var self = this;
        self.Items=HomePage;
        self.global=global;
        self.$state=$state;
        self.activeSide='left'
        self.store=global.get('store').val
        /*self.listOfBlocksForMainPage=listOfBlocksForMainPage;
        self.listOfBlocks=listOfBlocksForMainPage*/
        self.listOfBlocks=listOfBlocksForAll
        self.blockEditPermission={}

        self.animationTypes=animationTypes;
        self.addBlock=addBlock;
        self.deleteBlock=deleteBlock;

        self.saveInfo=saveInfo;
        self.saveField=saveField;
        self.movedSlide=movedSlide;
        self.deleteSlide =deleteSlide;
        self.editSlide=editSlide;
        self.movedStuff =movedStuff;
        self.editModelData=editModelData;
        self.setCollection=setCollection;
        self.deleteCollection=deleteCollection;
        self.saveFieldInSide=saveFieldInSide;
        self.addItemInBlock=addItemInBlock;
        self.getNameCollection=getNameCollection;
        self.setColor=setColor;
        self.uploadHP=uploadHP;
        self.downloadHP=downloadHP;
        self.cloneBlock=cloneBlock;
        self.getBlockConfig=getBlockConfig;
        self.getNameBlock=getNameBlock;
        self.refreshBlocks=refreshBlocks;

        function getNameBlock(type) {
            if(listOfBlocksForAll[type]){
                return listOfBlocksForAll[type]
            }else{
                return type;
            }
        }

        activate();
        $scope.$on('changeLang',function(){
            activate();
        })


        function activate(){
            $q.when()
                .then(function(){
                    self.blockForAdd=null
                    return $q(function(resolve,reject){
                        self.Items.get({_id:self.store.subDomain},function(res){resolve(res)},function(err){
                            console.log(err)
                            if(err && err.status && err.status==404){
                                resolve(404)
                            }else{
                                resolve()
                            }
                        })
                    })
                    //return self.Items.get({_id:self.store.subDomain} ).$promise
                })
                .then(function (res) {
                    /*var o={_id:res._id,url:null,left:[]}
                    console.log(o)
                    self.Items.save({update:'url left'},o)
                    throw 0;*/

                    if(res && res!=404){
                        self.item=res;
                        if(!self.item.blocks){
                            self.item.blocks=[];
                        }
                        self.item.blocks.forEach(function (el,index) {
                            el.i=index
                        })
                        //console.log(self.item.left)
                       /* self.item.left=self.item.left.filter(function (b) {
                            //console.log(b._id)
                            return b;
                        })*/

                        /*if(!self.item.left.length){
                            self.Items.save({update:'left'},{_id:self.item._id,left:[]});
                        }
                        self.item['left'].forEach(function (el,index) {
                            el.dbIndex=index
                        })
                        self.item['left'].sort(function (a,b) {
                            return a.index-b.index;
                        })
                        self.item['right'].forEach(function (el,index) {
                            el.dbIndex=index
                        })
                        self.item['right'].sort(function (a,b) {
                            return a.index-b.index;
                        })
                        self.item['header'].forEach(function (el,index) {
                            el.dbIndex=index
                        })
                        self.item['header'].sort(function (a,b) {
                            return a.index-b.index;
                        })*/
                    }else if(res==404){
                        self.item={
                            url:self.store.subDomain,
                            header:[],
                            left:[],
                            right:[],
                            blocks:[],
                        }
                        return self.Items.save(self.item).$promise
                    }
                })
                .then(function(res){
                    if(self.item && !self.item._id && res && res.id){
                        self.item._id = res.id;
                    }
                })

                .catch(function(err){
                    exception.catcher('получение home page')(err)
                })
        }


        function addBlock(type){
            if(!type){return}
            console.log('addNewBlock')
            $scope.$broadcast('addNewBlock',{type:type})
            self.newBlock=null;
            return;


            if(!type){return}
            var index=1;
            self.item.blocks.forEach(function(block){
                //console.log(block.index,index)
                if(block.index && block.index>=index){
                    index=block.index+1;
                }
            })
            var o={_id:self.item._id,type:type,index:index,position:self.activeSide};
            var update={update:'type index position',embeddedName:'blocks',embeddedPush:true};
            console.log(update,o)
            $q.when()
                .then(function () {
                    return self.Items.save(update,o).$promise;
                })
                .then(function (res) {
                    $timeout(function () {
                        global.set('saving',false);
                    },1500)
                    activate()
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('добавление блока')(err)
                    }
                })
        }
        var delay=false;
        function cloneBlock(block){
            if(delay){return}
            delay=true;
            $timeout(function () {
                delay=false
            },2000)
            var newBlock = angular.copy(block)
            delete newBlock._id
            delete newBlock.__v
            if(!newBlock.index){newBlock.index=1}else{newBlock.index++}
            newBlock.img=null;
            newBlock.imgs=[];
            var arr=['stuffs','filterTags','brandTags','categories','brands','news','campaign','info']
            arr.forEach(function (field) {
                if(newBlock[field] && newBlock[field].length){
                    newBlock[field]=newBlock[field].map(function (item) {
                        return item._id
                    })
                }
            })
            self.item.blocks.forEach(function(block){
                //console.log(block.index,index)
                if(block.index && block.index>=newBlock.index){
                    newBlock.index=block.index+1;
                }
            })
            self.item.blocks.push(newBlock)
            var o={_id:self.item._id};
            o[blocks]=self.item.blocks
            var update={update:'blocks'};
            Confirm('потверждаете?')
                .then(function () {
                    return self.Items.save(update,o).$promise;
                })
                .then(function (res) {
                    $timeout(function () {
                        global.set('saving',false);
                    },1500)
                    activate()
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('добавление блока')(err)
                    }
                })
        }
        function refreshBlocks() {
            return self.Items.get({_id:self.store.subDomain} ).$promise
                .then(function(data) {
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
                    self.item.blocks=data.blocks
                })
        }
        function deleteBlock(block) {
            //console.log(block)
            var o={_id:self.item._id};
            var update;
            Confirm('потверждаете?')
                .then(function () {
                    self.item.blocks.splice(block.i,1)
                    if(!block._id){
                        update={update:'blocks'};
                        o.blocks=self.item.blocks
                    } else{
                        o['_id_id']=block._id;
                        update={update:'_id_id',embeddedName:'blocks'};
                        update.embeddedPull=true;
                    }
                    //console.log(update,o)
                    return self.Items.save(update,o).$promise;
                })
                .then(function (res) {
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
                        return Photo.deleteFiles('Homepage',images)
                    }

                })
                .then(function () {
                    activate()
                })
        }

        function saveInfo(){
            saveField('info')
        }
        function saveField(field,value){
            console.log(field,value)
            if(field.indexOf('index')>-1){
                self.item.blocks.sort(function (a,b) {
                    return a.index-b.index
                })
                self.item.blocks.forEach(function (b,i) {
                    b.i=i;
                })
                value=self.item.blocks;
                field='blocks'
            }

            setTimeout(function(){
                if(field=='date'){
                    value=new Date(self.item[field])
                }
                //console.log(defer,value)
                var o={_id:self.item._id};
                o[field]=value
                var query={update:field}
                self.Items.save(query,o,function () {
                    global.set('saving',true)
                    $timeout(function () {
                        global.set('saving',false);
                    },1500)
                    if(field.indexOf('.type')>-1){
                        activate()
                    }
                });
            },100)
        }
        function saveField1001(field,value){
            //console.log(self.activeSide);
            var lang=global.get('store').val.lang;
            self.item[self.activeSide].sort(function (a,b) {
                return a.index-b.index;
            })
            self.item[self.activeSide].forEach(function (b) {
                if(b.name ||  b.name!=undefined){
                    if(!b.nameL){b.nameL={}}
                    b.nameL[lang]=b.name;
                }
                if(b.name1 ||  b.name1!=undefined){
                    if(!b.name1L){b.name1L={}}
                    b.name1L[lang]=b.name1;
                }
                if(b.desc ||  b.desc!=undefined){
                    if(!b.descL){b.descL={}}
                    b.descL[lang]=b.desc;
                }
                if(b.desc1 ||  b.desc1!=undefined){
                    if(!b.desc1L){b.desc1L={}}
                    b.desc1L[lang]=b.desc1;
                }
                if(b.imgs && b.imgs.length){
                    b.imgs.forEach(function (img) {
                        if(img.name ||  img.name!=undefined){
                            if(!img.nameL){img.nameL={}}
                            img.nameL[lang]=img.name;
                        }
                        if(img.desc ||  img.desc!=undefined){
                            if(!img.descL){img.descL={}}
                            img.descL[lang]=img.desc;
                        }
                    })
                }
            })
            var o={_id:self.item._id};
            o[self.activeSide]=self.item[self.activeSide]
            var field=self.activeSide
            var query={update:field}
            var defer = 300
            return $q(function (resolve,reject) {
                $timeout(function(){
                    self.Items.save(query,o,function () {
                        resolve()
                        global.set('saving',true)
                        $timeout(function () {
                            global.set('saving',false);
                        },1500)
                    })
                },defer)
            })

        };

        function saveFieldOld(block,index,f,defer,indexImgs){
            console.log(self.activeSide);
            if(f=='index'){
                self.item[self.activeSide].sort(function (a,b) {
                    return a.index-b.index;
                })
            }
            var o={_id:self.item._id};
            o[self.activeSide]=self.item[self.activeSide]
            var field=self.activeSide

            return;
            defer =defer||200
            setTimeout(function(){
                var o={_id:self.item._id};
                var field=self.activeSide+'.'+block.dbIndex;
                if(f){
                    field=field+'.'+f;
                    o[field]=block[f];
                }else{
                    o[field]=block;
                }
                var query={update:field}
                if(field.indexOf('.imgs')>-1 && typeof indexImgs!='undefined'){
                    query.indexImgs=indexImgs;
                }
                self.Items.save(query,o,function () {
                    global.set('saving',true)
                    $timeout(function () {
                        global.set('saving',false);
                    },1500)
                })
                if(f=='index'){
                    self.item[self.activeSide].sort(function (a,b) {
                        return a.index-b.index;
                    })
                }
            },defer)
        };

        function movedSlide(block,field,item){
            setTimeout(function(){
                block[field].forEach(function(el,i){
                    el.index=i;
                })
                //console.log($index)
                self.saveField(block,null,field)
            },100)
            return item;
        }
        function deleteSlide(block,index,$index){
            Confirm('Удалить?')
                .then(function(){
                    return Photo.deleteFiles('Homepage',[block.imgs[index].img])
                })
                .then(function(response) {
                    block.imgs.splice(index,1)
                    self.saveField(block,$index,'imgs')
                },function(err) {console.log(err)});

        }
        function editSlide(block,index,$index){
            //console.log(slide)
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/homePage/editSlide.html',
                controller: function(slide,$uibModalInstance){
                    var self=this;
                    if(!slide.button){slide.button={}}
                    self.item=slide;
                    self.animationTypes=animationTypes;
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
                self.saveField(block,$index,'imgs',null,index)
            }, function () {
            });
        }


        function movedStuff(block,item){
            setTimeout(function(){
                saveFieldInSide(block)
            },100)

            return item;
        }




        function editModelData(block,i){
            var model=block.type,
                items=block[block.type]

            if(items[i] && items[i]._id){
                var field;
                 if(model=='brands'){
                    field='Brand';
                 } else if(model=='categories'){
                    field='Category';
                 } else if(model=='filterTags'){
                    field='FilterTags';
                 }else if(model=='brandTags'){
                    field='BrandTags';
                 }else if(model=='stuffs'){
                     field='Stuff';
                 }else if(model=='news'){
                     field='News';
                 }else if(model=='campaign'){
                     field='Campaign';
                 }else if(model=='info'){
                     field='Info';
                 }
                $q.when()
                    .then(function(){
                        return EditModelData.doIt(field,items[i]._id,items[i])
                    })
                    .then(function(img){
                        console.log(img==items[i].img)
                        if(img && img!=items[i].img){
                            items[i].img=img
                            console.log(img)
                        }
                        
                    })
                    /*.catch(function(item){
                        if(item && item._id){
                            items[i]=res;
                        }
                    })*/


            } else{
                /*var field;
                if(model=='Brand'){
                    field='brands';
                } else if(model=='Category'){
                    field='categories';
                } else if(model=='FilterTags'){
                    field='filterTags';
                }else if(model=='BrandTags'){
                    field='brandTags';
                }*/

                setCollection(items,i,model)
            }

        }
        function addItemInBlock(block) {
            var field=block.type;
            if(!block[block.type]){block[block.type]=[]}
            var collections=block[block.type]
            var Items;
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
                    collections.push(item);
                    self.saveFieldInSide(block)
                })
                .catch(function(){
                    console.log('dismiss')
                })
        }
        function setCollection(block,idx){
            var field=block.type;
            var collections=block[block.type]
            var Items;
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
                    return Items.select()
                })
                .then(function(item){
                    collections[idx]=item;
                    self.saveFieldInSide(block)
                })
                .catch(function(){
                    console.log('dismiss')
                })
        }
        function saveFieldInSide(item) {
            var field=item.type;
            console.log(item[item.type])
            //console.log('saveField',item)
            //console.log('saveField',item)
            var o={_id:self.item._id};
            o[field]=item[field].map(function(e){return e._id});
            var update={update:field,embeddedName:self.activeSide};
            update.embeddedVal=item._id
            console.log(update,o)
            return self.Items.save(update,o).$promise;


        }


        function deleteCollection(block,idx){
            block[block.type].splice(idx,1);
            saveFieldInSide(block)
        }
        function getNameCollection(type) {
            switch (type) {
                case 'categories': return 'категории'
                case 'brands': return 'бренды'
                case 'brandTags': return 'коллекции'
                case 'filterTags': return 'характеристики'
                default: return '???????';
            }

        }

        function setColor(block,idx){
            //console.log(block,idx)
            $q.when()
                .then(function(){
                    return SetCSS.setStyles(block)
                })
                .then(function(){
                    saveField(block,idx,'blockStyle')
                    console.log(block.elements)
                    saveField(block,idx,'elements')
                })

        }
        function uploadHP() {
            Confirm('выгрузить?')
                .then(function () {
                    return $http.post('/api/setTemplateHP', {
                        template:{
                            blocks:self.item.blocks,
                            /*left:self.item.left,
                            right:self.item.right*/
                        },
                        store:global.get('store').val._id}
                    )
                })
                .then(function (res) {
                    exception.showToaster('success','статус','обновлено')
                })
                .catch(function(err){
                    exception.catcher('выгрузка шаблона')(err)
                })
        }
        function downloadHP() {
            Confirm('загрузить?')
                .then(function () {
                    return $http.get('/views/templatesHP/'+global.get('store').val.subDomain+'.json')
                })
                .then(function (res) {
                    //console.log(res.data)
                    /*self.item.template=res.data;
                    Store.save({update:'template'},{_id:self.item._id,template:self.item.template})*/
                    if(res.data && res.data.left){
                        res.data._id=self.item._id;
                        console.log(res.data.left)
                        res.data.left.splice(2,1)
                        res.data.left.splice(4,1)
                        res.data.left.splice(5,1)

                        //console.log(res.data.left)
                        self.Items.save({update:'blocks'},{blocks:res.data.left},function(){
                            self.item.blocks=res.data.left;
                            /*self.item.left=res.data.left;
                            self.item.right=res.data.right;*/
                            exception.showToaster('success','статус','обновлено')
                        })
                    }else{
                        throw 'не верный формат данных'
                    }



                })
                .catch(function(err){
                    exception.catcher('загрузка шаблона')(err)
                })

        }
        function getBlockConfig(block) {
            $q.when()
                .then(function () {
                    return $http.get('/api/getBlocksHP/'+block.type)
                })
                .then(function (res) {
                    //console.log(res)
                    if(res.data){
                        return HomePage.selectItemFromList(res.data)
                    }
                })
                .then(function (b) {
                    //console.log(b)
                    if(b){
                        if(block.img){
                            //Photo.deleteFiles('Homepage',[block.img])
                        }else if(block.video){
                            Photo.deleteFiles('Homepage',[block.video])
                        }else if(block.imgs && block.type!='stuffs'){
                            var a=[];
                            block.imgs.forEach(function (i) {
                                a.push(i.img)
                            })
                            if(a.length){
                                Photo.deleteFiles('Homepage',a)
                            }
                        }
                        for(var key in block){
                            if(key!='_id' && key!='index'){
                                delete block[key]
                            }
                        }
                        var photos=[];
                        for(var key in b){
                            if(key!='_id' && key!='template' && key !='nameTemplate' && key!='index'){
                                if(key=='img' && b[key]){
                                    var p = b[key].split('/')
                                    p[p.length-2]=self.item.url;
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
                                            p[p.length-2]=self.item.url;
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
                                    p[p.length-2]=self.item.url;
                                    p[p.length-4]=global.get('store').val.subDomain;
                                    var img = p[p.length-1].split('.')
                                    img[img.length-2] +='copy'
                                    p[p.length-1]=img.join('.')
                                    block[key]=p.join('/')
                                    photos.push([b[key],block[key]])
                                }else{
                                    block[key] = b[key];
                                }

                            }
                        }
                        var folder = '/images/'+global.get('store').val.subDomain+'/HomePage/'+self.item.url;
                        var o={folder:folder,photos:photos};
                        return $http.post(photoUpload+'/api/copyPhotosFromBrowser',o)

                    }
                })
                .then(function () {
                    return saveField(block,block.i)
                })
                .then(function () {
                    activate()
                })
        }
    }
})


function HPtransform(HP,template){
    function setData(e){
        var o={type:e.name}
        if(e.templ){o.templ=e.templ}
        if(e.style){o.style=e.style};
        if(e.name=='stuffs'){
            if(HP.stuffs && HP.stuffs.length){
                o.stuffs=HP.stuffs;
            }

            if(e.namebox){
                o.name=e.namebox;
            }
            //console.log(o)
        }else if(e.name=='brands'){
            if(HP.brands && HP.brands.length){
                o.brands=HP.brands;
            }
            if(e.namebox){
                o.name=e.namebox;
            }
        }else if(e.name=='brandTags'){
            if(HP.brandTags && HP.brandTags.length){
                o.brandTags=HP.brandTags;
            }
            if(e.namebox){
                o.name=e.namebox;
            }
        }else if(e.name=='filterTags'){
            if(HP.filterTags && HP.filterTags.length){
                o.filterTags=HP.filterTags;
            }
            if(e.namebox){
                o.name=e.namebox;
            }
        }else if(e.name=='categories'){
            if(HP.categories && HP.categories.length){
                o.categories=HP.categories;
            }
            if(e.namebox){
                o.name=e.namebox;
            }
        }else if(e.name=='campaign'){
            if(HP.campaign && HP.campaign.length){
                o.campaign=HP.campaign
            }
            if(e.namebox){
                o.name=e.namebox;
            }
        }else if(e.name=='news'){
            if(HP.news && HP.news.length){
                o.news=HP.news
            }
            if(e.namebox){
                o.name=e.namebox;
            }

        }else if(e.name=='text'){
            o.name=HP.textName;
            o.desc=HP.textDesc;
            if(HP.textButton){
                o.button={
                    is:HP.textButton.button,
                    link:HP.textButton.link,
                    text:HP.textButton.text,
                }
            }
        }else if(e.name=='mission'){
            o.name=HP.name;
            o.desc=HP.desc;
            if(HP.descButton){
                o.button={
                    is:HP.descButton.button,
                    link:HP.descButton.link,
                    text:HP.descButton.text,
                }
            }
        }else if(e.name=='banner'){
            o.img=HP.bannerSrc;
            if(HP.banner){
                o.desc=HP.banner.desc;
                o.button={
                    is:HP.banner.button,
                    link:HP.banner.link,
                    text:HP.banner.text,
                }
            }
        }else if(e.name=='video'){
            o.video=HP.videoSrc;
            if(HP.video){
                o.audio=HP.video.audio;
                o.desc=HP.video.desc;
                o.button={
                    is:HP.video.button,
                    link:HP.video.link,
                    text:HP.video.text,
                }
            }

        }else if(e.name=='slider'){
            if(HP.imgs){
                o.imgs=HP.imgs;
            }
        } else if(e.name=='info'){
            o.img=HP.infoImg;
            if(HP.info){
                o.name=HP.info.name;
                o.button={link:HP.info.link};
            }

        }
        return o;
    }
    if(!HP.url){
        var hp={header:[],left:[],right:[]};
        //console.log(template)
        template.left.forEach(function(e){
            hp.left.push(setData(e))
        })
        template.right.forEach(function(e){
            hp.right.push(setData(e))
        })
    }else{
        var hp=HP;
    }
    return hp;
}



// blocks
angular.module('gmall.directives')
    .directive('directivehp', function($compile, $interpolate) {
        return {
            template: '',
            link: function($scope, element, attributes) {
                element.append($compile('<div ' + attributes.directivehp.toLowerCase() + 'hp-block></div>')($scope));
            }
        };
    })
    .directive('styleBlock',styleBlock)
    .directive('bannerhpBlock',bannerHPBlock)
    .directive('banneronehpBlock',banneroneHPBlock)
    .directive('infohpBlock',infohpBlock)
    .directive('sliderhpBlock',sliderhpBlock)
    .directive('texthpBlock',texthpBlock)
    .directive('texttwohpBlock',texttwohpBlock)
    .directive('videohpBlock',videohpBlock)
    .directive('missionhpBlock',missionhpBlock)
    .directive('brandshpBlock',brandshpBlock)
    .directive('stuffshpBlock',stuffshpBlock)
    .directive('newshpBlock',newshpBlock)
    .directive('campaignhpBlock',campaignhpBlock)
    .directive('maphpBlock',maphpBlock)
    .directive('reviewhpBlock',reviewhpBlock)
    .directive('subscriptionhpBlock',subscriptionhpBlock)
    .directive('callhpBlock',callhpBlock)
    .directive('feedbackhpBlock',feedbackhpBlock)
    .directive('brandtagshpBlock',brandTagshpBlock)
    .directive('subscriptionaddhpBlock',subscriptionAddhpBlock)
    .directive('filtertagshpBlock',filterTagshpBlock)
    .directive('categorieshpBlock',categorieshpBlock)
    .directive('calendarhpBlock',calendarhpBlock)
    .directive('videolinkhpBlock',videolinkhpBlock)
    .directive('pricegoodshpBlock',pricegoodshpBlock)
    .directive('priceserviceshpBlock',priceserviceshpBlock)
    .directive('scheduleplacehpBlock',scheduleplacehpBlock)
    .directive('hpBlock',undefinedhpBlock)

    .directive('googlePlaceReviews',googlePlaceReviews)






function googlePlaceReviews(global) {
    /*https://support.google.com/business/answer/7035772?hl=ru*/
    return{
        restrict :'C',
        scope:true,
        link:function(scope,element){
            if(global.get('store').val.glPlaceId){
                console.log("global.get('store').val.glPlaceId",global.get('store').val.glPlaceId)
                $(element).googlePlaces({
                    //placeId: 'ChIJp2QxV_sJVFMR1DEp1x_16F8' //Find placeID @: https://developers.google.com/places/place-id
                    placeId: global.get('store').val.glPlaceId
                    , render: ['reviews']
                    , min_rating: 1
                    , max_rows:4
                });
            }
            //console.log($(element).find("#google-reviews"))
        }
    }
}


function undefinedhpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/undefinedBlock.html',
    }
}

function styleBlock(){
    return {
        templateUrl: 'components/homePage/blocks/styleBlock.html',
    }
}


function bannerHPBlock(){
    return {
        templateUrl: 'components/homePage/blocks/bannerBlock.html',
    }
}
function banneroneHPBlock(){
    return {
        templateUrl: 'components/homePage/blocks/banneroneBlock.html',
    }
}
function infohpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/infoBlock.html',
    }
}
function sliderhpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/sliderBlock.html',
    }
}
function texthpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/textBlock.html',
    }
}
function texttwohpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/texttwoBlock.html',
    }
}
function videohpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/videoBlock.html',
    }
}
function missionhpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/missionBlock.html',
    }
}
function brandshpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/brandsBlock.html',
    }
}
function stuffshpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/stuffsBlock.html',
    }
}
function newshpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/newsBlock.html',
    }
}
function campaignhpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/campaignBlock.html',
    }
}
function maphpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/mapBlock.html',
    }
}
function reviewhpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/reviewBlock.html',
    }
}
function subscriptionhpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/subscriptionBlock.html',
    }
}
function callhpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/callBlock.html',
    }
}
function feedbackhpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/feedbackBlock.html',
    }
}
function brandTagshpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/brandTagsBlock.html',
    }
}
function subscriptionAddhpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/subscriptionAddBlock.html',
    }
}
function filterTagshpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/filterTagsBlock.html',
    }
}
function categorieshpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/categoriesBlock.html',
    }
}
function calendarhpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/calendarBlock.html',
    }
}
function videolinkhpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/videolinkhpBlock.html',
    }
}
function pricegoodshpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/pricegoodsBlock.html',
    }
}
function priceserviceshpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/priceservicesBlock.html',
    }
}
function scheduleplacehpBlock(){
    return {
        templateUrl: 'components/homePage/blocks/scheduleplaceBlock.html',
    }
}


/*
var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position)
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);

            //http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=false

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    console.log(error)
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
*/
