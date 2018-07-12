'use strict';
(function(){

    angular.module('gmall.services')
        .service('Workplace', serviceFoo);
    angular.module('gmall.directives')
        .directive('workplaceList',itemListDirective)
        .directive('workplaceItem',workplaceItemDirective);
    function itemListDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: itemListCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/workplace/workplaceList.html',
        }
    };
    function workplaceItemDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: ItemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/workplace/workplaceItem.html',
        }
    }
    itemListCtrl.$inject=['Workplace','$state','global','Confirm','$q','exception','Photo','$timeout'];
    function itemListCtrl(Items,$state,global,Confirm,$q,exception,Photo,$timeout){

        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$state;
        self.Items=Items;
        self.query={};
        self.paginate={page:0,rows:20,totalItems:0}
        self.newItem={name:'наименование'}
        self.getList=getList;
        self.saveField = saveField;
        self.searchItem=searchItem;
        self.deleteItem=deleteItem;
        self.createItem=createItem;
        self.dropCallback=dropCallback;
        self.cloneItem=cloneItem;
        //*******************************************************
        activate();

        function activate() {
            return getList().then(function() {
                //console.log('Activated news list View');
            });
        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.items = data;
                    return self.items;
                });
        }
        function searchItem(searchStr){
            if(searchStr){
                self.query = {name:searchStr.substring(0,10)};
            }else{
                self.query = {};
            }

            self.paginate.page=0;
            return getList().then(function() {
                console.log('Activated list View');
            });
        }
        function saveField(item,field){
            var o={_id:item._id};
            o[field]=item[field]
            self.Items.save({update:field},o ,function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            })
        };
        function createItem(){
            self.Items.create()
                .then(function(res){
                    self.newItem={}
                    self.newItem.name=res;
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem._id=res.id;
                    self.newItem.url=res.url;
                    self.paginate.page=0;
                    getList(self.paginate);
                })
                .then(function(){
                    var id=self.newItem._id;
                    delete self.newItem._id
                    setTimeout(function(){
                        $state.go('frame.workplace.item',{id:id})
                    },100)

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('создание мастера')(err)
                    }
                })
        }
        function cloneItem(item){
            var name;
            self.Items.create()
                .then(function (res) {
                    name=res;
                    return self.Items.getItem(item._id)
                })
                .then(function(master){
                    self.newItem=angular.copy(master)
                    self.newItem.name=name;
                    self.newItem.nameL={};

                    delete self.newItem._id
                    delete self.newItem.__v
                    delete self.newItem.url;
                    console.log( self.newItem)
                    self.newItem.blocks.forEach(function (block) {
                        delete block.img;
                        delete block._id;
                        if(block.type=='stuffs'){
                            if(block.stuffs && block.stuffs.length){
                                block.stuffs=block.stuffs.map(function (s) {
                                    return s._id
                                })
                            }
                        }
                        block.imgs=[]
                    })
                    //throw 'test'
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem._id=res.id;
                    self.newItem.url=res.url;
                    self.paginate.page=0;
                    getList(self.paginate);
                })
                .then(function(){
                    var id=self.newItem._id;
                    delete self.newItem._id
                    setTimeout(function(){
                        $state.go('frame.workplace.item',{id:id})
                    },100)

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('создание объекта')(err)
                    }
                })
        }
        function deleteItem(item){
            var folder='images/'+global.get('store').val.subDomain+'/Workplace/'+item.url
            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    return self.getList();
                })
                .then(function(){
                    Photo.deleteFolder('Workplace',folder)
                })
                .catch(function(err){
                    if(!err){return}
                    err = (err &&err.data)||err
                    if(err){
                        exception.catcher('удаление объекта')(err)
                    }

                })
        }
        function dropCallback(item){
            var i=0;
            //http://stackoverflow.com/questions/28983424/make-angular-foreach-wait-for-promise-after-going-to-next-object
            setTimeout(function(){
                self.items.reduce(function(p, item) {
                    return p.then(function() {
                        i++;
                        item.index=i;
                        return saveField(item,'index')
                    });
                }, $q.when(true)).then(function(){
                    console.log(self.items.map(function(el){return el.index}))
                });
            },50)
            return item;
        }
    }

    ItemCtrl.$inject=['Workplace','$stateParams','$q','$uibModal','global','exception','Stuff','Photo','$scope','$timeout','Confirm','SetCSS'];
    function ItemCtrl(Items,$stateParams,$q,$uibModal,global,exception,Stuff,Photo,$scope,$timeout,Confirm,SetCSS){
        var self = this;
        self.Items=Items;
        self.type='Workplace'
        self.item={};
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.listOfBlocksForWorkplacePage=listOfBlocksForWorkplacePage;
        self.listOfBlocks=listOfBlocksForWorkplacePage;
        console.log(self.listOfBlocksForWorkplacePage)
        console.log(self.listOfBlocks)
        self.moment=moment;
        self.saveField=saveField;

        self.setStyles=setStyles;

        self.addBlock=addBlock;
        self.refreshBlocks=refreshBlocks;
        self.deleteBlock=deleteBlock;
        self.deleteSlide=deleteSlide;
        self.editSlide=editSlide;


        // collections
        self.addItemInBlock=addItemInBlock;
        self.movedItem=movedItem;
        self.deleteItemFromBlock=deleteItemFromBlock;
        self.changeItem=changeItem;

        //********************activate***************************
        activate();
        //*******************************************************
        function activate() {
            //console.log(id)
            return getItem($stateParams.id).then(function() {})
            .catch(function(err){
                err = err.data||err
                exception.catcher('получение объекта')(err)
            });
        }
        $scope.$on('changeLang',function(){
            activate();
        })
        function getItem(id) {
            return self.Items.getItem(id)
                .then(function(data) {
                    if(data && !data.blocks){
                        data.blocks=[];
                        saveField('blocks',[])
                    }
                    var bl=data.blocks.filter(function (b) {
                        return b
                    })
                    if(bl.length!=data.blocks.length){
                        saveField('blocks',bl)
                        data.blocks=bl;
                    }
                    data.blocks.forEach(function (b,i) {
                        if(b.type=='stuffs' && b.stuffs.length){
                            //b.imgs=b.stuffs
                            b.stuffs=b.stuffs.map(function (s) {
                                return (s._is || s)
                            })
                        }
                        b.i=i;
                    })
                    data.blocks.sort(function (a,b) {
                        return a.index-b.index
                    })
                    self.item=data;
                    return self.item;
                } ).catch(function(err){
                    console.log(err)
                    return $q.reject(err)
                });
        }
        function setStyles(block,idx) {
            $q.when()
                .then(function(){
                    return SetCSS.setStyles(block)
                })
                .then(function(){
                    if(block.elements){
                        saveField('blocks.'+block.i+'.elements',block.elements)
                    }
                    if(block.blockStyle){
                        saveField('blocks.'+block.i+'.blockStyle',block.blockStyle)
                    }

                })
        }
        function saveField(field,value,defer,indexImgs){
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
            defer =(defer)?defer:100;
            setTimeout(function(){
                if(field=='date'){
                    value=new Date(self.item[field])
                }
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
                });
            },defer)
        };
        function refreshBlocks() {
            return self.Items.getItem($stateParams.id)
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
                    self.item.blocks=data.blocks
                    /*console.log(self.item.blocks.length)*/
                })
        }
        function addBlock(type){
            if(!type){return}
            $scope.$broadcast('addNewBlock',{type:type})
            self.newBlock=null;
            return;

            var index=1;
            self.item.blocks.forEach(function(block){
                if(block.index && block.index>=index){
                    index=block.index+1;
                }
            })
            var o={_id:self.item._id,type:type,index:index,id:Date.now()};
            var update={update:'type index id',embeddedName:'blocks',embeddedPush:true};
            if(type=='slider' || type=='stuffs'){
                o.imgs=[];
                update.update+=' imgs'
            }
            $q.when()
                .then(function () {
                    return self.Items.save(update,o).$promise;
                })
                .then(function (res) {
                    activate()
                    self.newBlock=null
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('добавление блока')(err)
                    }
                })
        }
        function deleteBlock(block,index) {
            var o={_id:self.item._id};
            var update={update:'_id_id',embeddedName:'blocks'};
            o['id']=block.id;
            update.embeddedPull=true;

            Confirm('потверждаете?')
                .then(function () {
                    self.item.blocks.splice(index,1)
                    if(!block._id){
                        update={update:'blocks'};
                        o['blocks']=self.item['blocks']
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
                        return Photo.deleteFiles('Stat',images)
                    }

                })
                .then(function () {
                    activate()
                })



        }

        function deleteSlide(block,index){
            Photo.deleteFiles('Workplace',[block.imgs[index].img])
                .then(function(response) {
                    block.imgs.splice(index,1)
                    self.saveField('blocks.'+block.i+'.imgs',block.imgs,null,index)
                },function(err) {console.log(err)});
        }
        function editSlide(block,index){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/CONTENT/workplace/editSlide.html',
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
                self.saveField('blocks.'+block.i+'.imgs',block.imgs)
            }, function () {
            });
        }
        //console.log(global.get('store').val.template.master)
        if(!global.get('store').val.template.workplace){
            global.get('store').val.template.workplace={parts:[]}
        }
        var keyParts=global.get('store').val.template.workplace.parts.filter(function (el) {
            return el.is
        }).map(function (el) {
            return el.name
        });
        //console.log(keyParts)
        function filterBlocks(item) {
            return keyParts.indexOf(item.key)>-1
        }

        function addItemInBlock(block,$index) {
            //console.log(block)
            var model;
            switch(block.type){
                case 'stuffs':model=Stuff;break;
                case 'campaign':model=Campaign;break;
                case 'filterTags':model=FilterTags;break;
                case 'brandTags':model=BrandTags;break;
                case 'brands':model=Brans;break;
                case 'categories':model=Category;break;
            }
            $q.when()
                .then(function () {
                    return model.select()
                })
                .then(function (item) {
                    if(block.type=='stuffs'){
                        if(block.stuffs && block.stuffs.length && block.stuffs.some(function(s){ if(s && s._id){return s._id==item._id}else{return s==item._id}})){
                            throw 'такой объект уже есть'
                        }
                    }
                    if(!block[block.type]){
                        block[block.type]=[];
                    }
                    var img,link;
                    name=item.name;
                    switch(block.type){
                        case 'stuffs':
                            img=(item.gallery[0] && item.gallery[0].thumb)?item.gallery[0].thumb:null;
                            link=item.link;
                            if(item.artikul){
                                item.name+=' '+item.artikul;
                            }
                            break;
                        case 'campaign':
                            img=(item.img)?item.img:null;
                            link='campaign/'+item.url;
                            break;
                        case 'filterTags':
                            img=(item.img)?item.img:null;
                            link='/group/category?queryTag='+item.url;
                            break;
                        case 'brandTags':
                            img=(item.img)?item.img:null;
                            link='/group/category?brandTag='+item.url;
                            break;
                        case 'brands':
                            img=(item.img)?item.img:null;
                            link='/group/category?brand='+item.url;
                            break;
                        case 'categories':
                            img=(item.img)?item.img:null;
                            link='/group/'+item.url;
                            break;
                    }
                    //console.log(typeof $index=='undefined')
                    //console.log(link)
                    if(typeof $index != 'undefined'){
                        block.imgs[$index]={name:item.name,img:img,link:link,_id:item._id};
                    }else{
                        if(!block.imgs){block.imgs=[]}
                        block.imgs.push({name:item.name,img:img,link:link,_id:item._id})
                    }

                    //console.log(block)
                    saveField('blocks.'+block.i+'.imgs',block.imgs)
                    if(block.type=='stuffs'){
                        block.stuffs=block.imgs.map(function (img) {
                            return img._id
                        })
                        saveField('blocks.'+block.i+'.stuffs',block.stuffs)
                    }


                    //saveField('blocks.'+block.i,block)
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('добавление')(err)
                    }
                })
        }
        function movedItem(block,item) {
            $timeout(function(){
                saveField('blocks.'+block.i+'.imgs',block.imgs)
                if(block.type=='stuffs'){
                    block.stuffs=block.imgs.map(function (img) {
                        return img._id
                    })
                    saveField('blocks.'+block.i+'.stuffs',block.stuffs)
                }
            },100)
            return item;
        }
        function deleteItemFromBlock(block,$index) {
            block.imgs.splice($index,1);
            saveField('blocks.'+block.i+'.imgs',block.imgs);
            if(block.type=='stuffs'){
                block.stuffs=block.imgs.map(function (img) {
                    return img._id
                })
                saveField('blocks.'+block.i+'.stuffs',block.stuffs)
            }
        }
        function changeItem(block,$index) {
            addItemInBlock(block,$index)
        }

    }

    serviceFoo.$inject=['$resource','$uibModal','$q','global'];
    function serviceFoo($resource,$uibModal,$q,global){
        var Items= $resource('/api/collections/Workplace/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            create:create,
        }
        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return Items.query(data).$promise
                .then(getListComplete)
            //.catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
            //.catch(getItemFailed);
            function getItemComplete(response) {
                if(response && response.blocks && response.blocks.length){
                    response.blocks.forEach(function (b) {
                        if(b.type=='stuffs'){
                            if(b.stuffs && b.stuffs.length){
                                b.imgs=b.stuffs.map(function(s){
                                    if(s.gallery && s.gallery.length && s.gallery[0].img){
                                        s.img=s.gallery[0].img;
                                    }
                                    return s;
                                });
                            }else{b.imgs=[]}
                        }
                    })
                }
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/CONTENT/workplace/createItem.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.name=''
                        self.ok=function(){
                            $uibModalInstance.close(self.name);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (name) {
                    if(name){
                        resolve(name.substring(0,50))
                    }else{
                        reject()
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
    }
})()
