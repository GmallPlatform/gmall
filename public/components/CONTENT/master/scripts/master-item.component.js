'use strict';
(function(){

    angular.module('gmall.directives')
        .directive('masterItem',masterItemDirective)
        .directive('masterDetailTemplate',masterTemplateDirective)
        .directive('masterSchedule',masterScheduleDirective);
    function masterItemDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: masterItemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/master/masterItem.html',
        }
    }
    masterItemCtrl.$inject=['Master','$stateParams','$q','$uibModal','global','exception','Stuff','Photo','$scope','$timeout','Confirm','SetCSS','$user','Workplace','$rootScope'];
    function masterItemCtrl(Master,$stateParams,$q,$uibModal,global,exception,Stuff,Photo,$scope,$timeout,Confirm,SetCSS,$user,Workplace,$rootScope){
        var self = this;
        self.Items=Master;
        self.type='Master'
        self.item={};
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.listOfBlocksForMasterPage=listOfBlocksForAll;
        self.listOfBlocks=listOfBlocksForAll;
        self.moment=moment;
        self.saveField=saveField;

        self.setStyles=setStyles;

        self.addBlock=addBlock;
        self.refreshBlocks=refreshBlocks;
        self.deleteBlock=deleteBlock;
        //self.movedSlide=movedSlide;
        self.deleteSlide=deleteSlide;
        self.editSlide=editSlide;


        // collections
        self.addItemInBlock=addItemInBlock;
        self.movedItem=movedItem;
        self.deleteItemFromBlock=deleteItemFromBlock;
        self.changeItem=changeItem;

        self.deleteReview=deleteReview;
        self.toggleEdit=toggleEdit;
        self.addReview=addReview;
        self.toggleAdd =toggleAdd;
        self.saveReview=saveReview;
        self.newReview={name:'',desc:'',date:Date.now()}
        self.savePhone=savePhone;
        self.refreshUsers=refreshUsers;
        self.changeUser=changeUser;
        self.clearUser=clearUser;

        self.workplaces=[];
        self.deleteWorkplace=deleteWorkplace;
        self.addWorkplace=addWorkplace;
        self.getWorkplaces=getWorkplaces;


        //********************activate***************************
        activate();
        //*******************************************************
        function activate() {
            //console.log(id)
            return getItem($stateParams.id).then(function() {
                //console.log('Activated item View');
                if(self.item.user){
                    return $user.getItem(self.item.user)
                }
            } ).then(function (user) {
                if(user){
                    if(user.profile && user.profile.phone && user.profile.phone[0]=="+"){
                        user.profile.phone=user.profile.phone.substring(1)
                    }
                    if(user.profile && user.profile.phone && user.profile.phone.length<10){
                        while(user.profile.phone.length<10){
                            user.profile.phone+='0'
                        }
                    }
                    if(user.profile && user.profile.phone && user.profile.phone.length==10){
                        user.profile.phone='38'+user.profile.phone
                    }
                    user.phone=(user.profile)?user.profile.phone:null;
                    self.item.user=user
                }
            }).catch(function(err){
                err = err.data||err
                exception.catcher('получение объекта')(err)
            });
        }
        $scope.$on('changeLang',function(){
            activate();
        })
        function getItem(id) {
            //console.log(id)
            return self.Items.getItem(id)
                //console.log(id)
                .then(function(data) {
                    //self.item.addProperties(data);
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
                    if(data.notification==undefined){
                        data.notification=0
                    }
                    self.item=data;
                    return self.item;
                } ).catch(function(err){
                    console.log(err)
                    return $q.reject(err)
                });
        }
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
            //console.log(field)
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
                });
            },defer)
        };

        function addBlock(type){
            $scope.$broadcast('addNewBlock',{type:type})
            self.newBlock=null;
            return;
            console.log(self.item.blocks)
            if(!type){return}
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
            /*if(type=='slider' || type=='stuffs' || type=="campaign" || type=="filterTags"|| type=="brandTags"|| type=="brands"|| type=="categories"){
                o.imgs=[];
                update.update+=' imgs'
            }
*/
            //console.log(update,o)
            $q.when()
                .then(function () {
                    return self.Items.save(update,o).$promise;
                })
                .then(function (res) {
                    refreshBlocks()
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

        /*function movedSlide(){
            self.item.imgs.forEach(function(el,i){
                el.index=i;
            })
            self.saveField('imgs')
        }*/
        function deleteSlide(block,index){
            Photo.deleteFiles('Master',[block.imgs[index].img])
                .then(function(response) {
                    block.imgs.splice(index,1)
                    self.saveField('blocks.'+block.i+'.imgs',block.imgs,null,index)
                },function(err) {console.log(err)});
        }
        function editSlide(block,index){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/CONTENT/master/editSlide.html',
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
        if(!global.get('store').val.template.master){
            global.get('store').val.template.master={parts:[]}
        }
        var keyParts=global.get('store').val.template.master.parts.filter(function (el) {
            return el.is
        }).map(function (el) {
            return el.name
        });
        //console.log(keyParts)
        function filterBlocks(item) {
            return keyParts.indexOf(item.key)>-1
        }

        function savePhone(phone) {
            saveField('phone',phone)
        }
        function clearUser() {
            console.log(self.user)
            changeUser(self.user)
            /*self.item.user=null;
            saveField('user',null)*/



        }

        function refreshUsers(phone){
            if (phone.length<3){return}
            self.cachePhone=phone
            searchUser(phone)
        }
        function searchUser(phone){
            var q= {$or:[{'profile.phone':phone},{name:phone},{email:phone}]}
            $user.getList({page:0,rows:20},q).then(function(res){
                self.users=res.map(function (user) {
                    if(user.profile && user.profile.phone && user.profile.phone[0]=="+"){
                        user.profile.phone=user.profile.phone.substring(1)
                    }
                    if(user.profile && user.profile.phone && user.profile.phone.length<10){
                        while(user.profile.phone.length<10){
                            user.profile.phone+='0'
                        }
                    }
                    if(user.profile && user.profile.phone && user.profile.phone.length==10){
                        user.profile.phone='38'+user.profile.phone
                    }
                    user.phone=(user.profile)?user.profile.phone:null;
                    return user
                });
            })
        }
        function changeUser(user) {
            /*console.log(self.item.user)
            console.log(user)*/
            if(self.item.user && self.item.user._id){
                if(!user || user._id!=self.item.user._id){
                    var o ={_id:self.item.user._id,master:null}
                    $user.save({update:'master'},o,function () {
                        //exception.showToaster('succes','статус','обновлено!')
                    })
                }
            }


            var u=null;
            if(user){u=user._id;self.item.user=user}else{self.item.user=null;}

            saveField('user',u)
            self.user=null;


            if(self.item.user && self.item.user._id){
                var o ={_id:self.item.user._id,master:self.item._id}
                $user.save({update:'master'},o,function () {
                    //exception.showToaster('succes','статус','обновлено!')
                })
            }
        }

        function getWorkplaces() {
            Workplace.getList({page:0,rows:50}).then(function(res){
                console.log(res,res && res.length)
                if(res && res.length){
                    self.workplaces=res;
                    console.log(self.workplaces)
                }

            })
        }
        function addWorkplace(wp) {
            console.log(wp)
            if(!self.item.workplaces){self.item.workplaces=[]}
            self.item.workplaces=self.item.workplaces.filter(function (wp) {
                return wp
            })
            var value=self.item.workplaces.map(function (wp) {
                return wp._id
            });
            if(value.indexOf(wp._id)>-1){return}else{
                value.push(wp._id)
                self.item.workplaces.push(wp)
            }
            console.log(value)
            saveField('workplaces',value);
            $timeout(function () {
                //self.workplace=null;
            },1000)

        }
        function deleteWorkplace(idx) {
            if(!self.item.workplaces){self.item.workplaces=[]}
            self.item.workplaces.splice(idx,1)
            var value=self.item.workplaces.map(function (wp) {
                return wp._id
            });
            saveField('workplaces',value);
        }



// collections
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




        function toggleEdit(item){
            item.editMode = !item.editMode;
        }
        function toggleAdd() {
            self.addMode = !self.addMode;
        }
        function saveReview(item){
            item.name=item.name.substring(0,20);
            item.desc=item.desc.substring(0,200);
            delete item.editMode
            saveField('reviews',item.reviews);

        }
        function deleteReview(i){
            self.item.reviews.splice(i,1);
            saveField('reviews',item.reviews);
        }
        function addReview(admin){
            //self.newReview;
            if(admin){
                var o =self.newReview;
            }else{
                var o={name:global.get('user').val.profile.fio||global.get('user').val.name,
                    date:Date.now(),
                    desc:self.newReviewText.substring(0,200)
                }
            }
            self.newReviewText='';
            self.unableAddReview=false;
            if(!self.item.reviews){
                self.item.reviews=[];
            }
            self.item.reviews.unshift(o)
            saveField('reviews',self.item.reviews);
            if(admin){
                toggleAdd()
            }
        }
    }

    //=====================newsTemplateDirective
    /*function masterTemplateDirective(global){
        var s=(global.get('store').val.template.masterTempl)?global.get('store').val.template.masterTempl:'';
        return {
            scope: {},
            bindToController: true,
            controller: masterItemCtrl,
            controllerAs: '$ctrl',
            templateUrl:'views/template/partials/master/masterDetail'+s+'.html',
            restrict:'E'
        }
    }*/
    function masterTemplateDirective($stateParams){
        return {
            template:"<div ng-bind-html='$ctrl.content|unsafe'></div>",
            bindToController: true,
            scope: {},
            controllerAs: '$ctrl',
            controller: ['$http','$stateParams','global',function ($http,$stateParams,global) {
                var self=this;
                $http.get('views/template/partials/Master/itemPage/'+$stateParams.id).then(function(response){
                    console.log(response)
                    self.content=response.data.html;
                    console.log(response.data.titles)
                    global.set('titles',response.data.titles)
                })
            }],
        }
    }
    function masterScheduleDirective($stateParams){
        return {
            bindToController: true,
            scope: {
                master:'@'
            },
            controllerAs: '$ctrl',
            controller: masterScheduleCtrl,
            templateUrl:'components/CONTENT/master/masterSchedule.html'
        }
    }
    masterScheduleCtrl.$inject=['$http','$stateParams','global']
    function masterScheduleCtrl($http,$stateParams,global) {
        var self=this;
        console.log('init',self.master)
    }
})()
