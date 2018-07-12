'use strict';
(function(){
angular.module('gmall.directives')
.directive('additionalPage',additionalDirective)


    function additionalDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: pageCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/additional/additional.html',
        }
    }
    pageCtrl.$inject=['Additional','$stateParams','global','Photo','$q','$uibModal','News','Stuff','FilterTags','BrandTags','Brands','Campaign','Category','$timeout','$scope','Confirm','SetCSS']
    function pageCtrl(Additional,$stateParams,global,Photo,$q,$uibModal,News,Stuff,FilterTags,BrandTags,Brands,Campaign,Category,$timeout,$scope,Confirm,SetCSS){
        var self = this;
        self.Items=Additional;
        self.type='Additional'
        self.global=global;
        self.listOfBlocksForStaticPage=listOfBlocksForStaticPage;
        self.listOfBlocks=listOfBlocksForStaticPage;
        self.setStyles=setStyles;
        self.saveField=saveField;
        self.newBlock=null;
        self.addBlock=addBlock;
        self.refreshBlocks=refreshBlocks;
        self.deleteBlock=deleteBlock;
        //self.movedSlide=movedSlide;
        self.deleteSlide=deleteSlide;
        self.editSlide=editSlide;
        //self.filterBlocks=filterBlocks;

        // collections
        self.addItemInBlock=addItemInBlock;
        self.movedItem=movedItem;
        self.deleteItemFromBlock=deleteItemFromBlock;
        self.changeItem=changeItem;

        activate()

        function activate(){
            self.Items.get({_id:$stateParams.id}).$promise.then(function(res){
                //console.log(res)
                if(res && !res.blocks){
                    res.blocks=[];
                    saveField('blocks',[])
                }
                var bl=res.blocks.filter(function (b) {
                    return b
                })
                if(bl.length!=res.blocks.length){
                    saveField('blocks',bl)
                    res.blocks=bl;
                }
                //console.log(res.blocks)
                res.blocks.forEach(function (b,i) {
                    if(b){
                        b.i=i;
                    }

                })
                res.blocks.sort(function (a,b) {
                    return a.index-b.index
                })
                self.item=res
            })
        }

        $scope.$on('changeLang',function(){
            activate();
        })






        function setStyles(block,idx) {
            $q.when()
                .then(function(){
                    return SetCSS.setStyles(block)
                })
                .then(function(){
                    saveField('blocks.'+block.i,block)
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
            var defer =100
            setTimeout(function(){
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
            if(type=='slider'){
                o.imgs=[];
                update.update+=' imgs'
            }
            if(type=='stuffs' || type=="campaign" || type=="filterTags"|| type=="brandTags"|| type=="brands"|| type=="categories"){
                o.imgs=[];
                update.update+=' imgs'
            }

            //console.log(update,o)
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
            //console.log(block,index)
            var o={_id:self.item._id};
            o['id']=block.id;
            var update={update:'id',embeddedName:'blocks'};
            update.embeddedPull=true;

            console.log(update,o)
            //return;
            Confirm('подтверждаете?')
                .then(function () {
                    return self.Items.save(update,o).$promise;
                })
                .then(function (res) {
                    self.item.blocks.splice(index,1)
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
                        return Photo.deleteFiles('Additional',images)
                    }

                })
                .then(function () {
                    activate()
                })



        }
        function deleteSlide(block,index){
            Photo.deleteFiles('Additional',[block.imgs[index].img])
                .then(function(response) {
                    block.imgs.splice(index,1)
                    self.saveField('blocks.'+block.i+'.imgs',block.imgs,null,index)
                },function(err) {console.log(err)});
        }
        function editSlide(block,index){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/CONTENT/additional/editSlide.html',
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
        var keyParts=global.get('store').val.template.additional.parts.filter(function (el) {
            return el.is
        }).map(function (el) {
            return el.name
        });
        //console.log(keyParts)
        /*function filterBlocks(item) {
            return keyParts.indexOf(item.key)>-1
        }*/

        // collections
        function addItemInBlock(block,$index) {
            var model;
            switch(block.type){
                case 'stuffs':model=Stuff;break;
                case 'news':model=News;break;
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
                    if(!block[block.type]){
                        block[block.type]=[];
                    }
                    var img,link,url=item.url;
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
                        case 'news':
                            img=(item.img)?item.img:null;
                            link='news/'+item.url;
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
                    if(typeof $index != 'undefined'){
                        block.imgs[$index]={name:item.name,img:img,link:link,url:url};
                    }else{
                        if(!block.imgs){block.imgs=[]}
                        block.imgs.push({name:item.name,img:img,link:link,url:url})
                    }
                    
                    //console.log(block)
                    saveField('blocks.'+block.i+'.imgs',block.imgs)
                    //saveField('blocks.'+block.i,block)
                })
        }
        function movedItem(block,item) {
            $timeout(function(){
                saveField('blocks.'+block.i+'.imgs',block.imgs)
            },100)
            return item;
        }
        function deleteItemFromBlock(block,$index) {
            block.imgs.splice($index,1);
            saveField('blocks.'+block.i+'.imgs',block.imgs);
        }
        function changeItem(block,$index) {
            addItemInBlock(block,$index)
        }


    }
})()