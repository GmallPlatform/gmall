'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('newsItem',newsItemDirective)
        .directive('newsDetailTemplate',itemTemplateDirective);
    function itemTemplateDirective($stateParams){
        return {
            template:"<div ng-bind-html='$ctrl.content|unsafe'></div>",
            bindToController: true,
            scope: {},
            controllerAs: '$ctrl',
            controller: ['$http','$stateParams','global',function ($http,$stateParams,global) {
                var self=this;
                $http.get('views/template/partials/News/itemPage/'+$stateParams.id).then(function(response){
                    console.log(response)
                    self.content=response.data.html;
                    console.log(response.data.titles)
                    global.set('titles',response.data.titles)
                })
            }],
            /*templateUrl: function () {
                return 'views/template/partials/News/itemPage/'+$stateParams.id;
            }*/
        }
    }
    function newsItemDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: newsItemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/news/newsItem.html',
        }
    }
    newsItemCtrl.$inject=['News','$stateParams','$q','$uibModal','global','exception','Stuff','CreateContent','Email','seoContent','Photo','$resource','$anchorScroll','$timeout','FilterTags','BrandTags','Brands','Campaign','Category','$scope','Confirm','SetCSS'];
    function newsItemCtrl(News,$stateParams,$q,$uibModal,global,exception,Stuff,CreateContent,Email,seoContent,Photo,$resource,$anchorScroll,$timeout,FilterTags,BrandTags,Brands,Campaign,Category,$scope,Confirm,SetCSS){
        var self = this;
        self.Items=News;
        self.type='News'
        self.item={};
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.listOfBlocksForNewsDetailPage=listOfBlocksForAll;
        self.listOfBlocks=listOfBlocksForAll;
        self.animationTypes=animationTypes;
        //console.log(self.listOfBlocksForNewsDetailPage)
        self.datePickerOptions ={
            locale: {
                applyClass: 'btn-green',
                applyLabel: "Выбрать",
                fromLabel: "от",
                toLabel: "до",
                cancelLabel: 'Отменить',
                customRangeLabel: 'Прозвольный диапазон',
                format:"DD-MMMM-YYYY",
                daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
                firstDay: 1,
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                    'Ноябрь', 'Декабрь'
                ]
            },
            singleDatePicker: true,
            date:{
                startDate: null, endDate: null
            }
        }
        self.setStyles=setStyles;
        self.saveField=saveField;
        /*self.movedSlide=movedSlide;
        self.deleteSlide=deleteSlide;
        self.editSlide=editSlide;
        self.addStuff=addStuff;
        self.movedStuff=movedStuff;
        self.deleteStuff=deleteStuff;*/
        self.sendEmail = sendEmail;
        var Store=$resource('/api/collections/Store/:_id',{_id:'@_id'});
        //*********************************************************************
        self.newBlock=null;
        self.addBlock=addBlock;
        self.refreshBlocks=refreshBlocks;
        self.deleteBlock=deleteBlock;
        self.deleteSlide=deleteSlide;
        self.editSlide=editSlide;
        self.filterBlocks=filterBlocks;
        // collections
        self.addItemInBlock=addItemInBlock;
        self.movedItem=movedItem;
        self.deleteItemFromBlock=deleteItemFromBlock;
        self.changeItem=changeItem;
        self.clearDesc=clearDesc;
        //********************activate***************************
        activate();
        $scope.$on('changeLang',function(){
            activate();
        })
        /*var d = new Date();
        var n = d.getMonth();
        console.log(n)*/
        //*******************************************************
        function activate() {
            //console.log(id)
            return getItem($stateParams.id).then(function() {
                //console.log('Activated item View');
            } ).catch(function(err){
                err = err.data||err
                exception.catcher('получение новости')(err)
            });
        }
        function getItem(id) {
            //console.log(id)
            return self.Items.getItem(id)
                //console.log(id)
                .then(function(data) {
                    console.log(data)
                    if(data && !data.blocks){
                        data.blocks=[];
                        saveField('blocks',[])
                    }
                    data.blocks.forEach(function (b,i) {
                        b.i=i;
                    })
                    data.blocks.sort(function (a,b) {
                        return a.index-b.index
                    })
                    //self.item.addProperties(data);
                    for(var key in data){
                        self.item[key]=data[key];
                    }

                    self.objShare=seoContent.setDataItem(data,true)
                    $anchorScroll();
                    /*$timeout(function(){
                        window.scrollTo(0, 0);
                    },400)*/
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
                    saveField('blocks.'+block.i,block)
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
            $timeout(function(){
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
                    global.set('saving',true);
                    $timeout(function(){
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
            //console.log(type)
            $scope.$broadcast('addNewBlock',{type:type})
            self.newBlock=null;
            return;
            if(!type){return}
            var index=1;
            self.item.blocks.forEach(function(block){
                if(block.index && block.index>=index){
                    index=block.index+1;
                }
            })
            var o={_id:self.item._id,type:type,index:index,id:Date.now()};
            var update={update:'type index id',embeddedName:'blocks',embeddedPush:true};
            if(type=='slider' || type=='stuffs' || type=="campaign" || type=="filterTags"|| type=="brandTags"|| type=="brands"|| type=="categories"){
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
            Confirm('Подтверждаете?')
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
                        return Photo.deleteFiles('Stat',images)
                    }

                })



        }
        function deleteSlide(block,index){
            Photo.deleteFiles('Stat',[block.imgs[index].img])
                .then(function(response) {
                    block.imgs.splice(index,1)
                    self.saveField('blocks.'+block.i+'.imgs',block.imgs)
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
                self.saveField('blocks.'+block.i+'.imgs',block.imgs,null,index)
            }, function () {
            });
        }
        var keyParts=global.get('store').val.template.news.parts.filter(function (el) {
            return el.is
        }).map(function (el) {
            return el.name
        });
        //console.log(keyParts)
        function filterBlocks(item) {
            return keyParts.indexOf(item.key)>-1
        }

        // collections
        function addItemInBlock(block,$index) {
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
                    if(!block[block.type]){
                        block[block.type]=[];
                    }
                    var img,link;
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
                        block.imgs[$index]={name:item.name,img:img,link:link};
                    }else{
                        if(!block.imgs){block.imgs=[]}
                        block.imgs.push({name:item.name,img:img,link:link})
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


        function sendEmail(){

            var item = angular.copy(self.item)
            if(item.blocks && item.blocks.length){
                item.blocks.forEach(function (b) {
                    if(b.type=='stuffs'){
                        b.imgs=b.stuffs
                    }
                })
            }
            //console.log(item)
            var content =CreateContent.emailFromNews(item);
            //console.log(content)
            var d = new Date();
            var n = d.getMonth()+1;
            //console.log(global.get('store').val.seller)
            var ownerDomain;
            if(global.get('store').val.seller.mailgun && global.get('store').val.seller.mailgun['domain']){
                ownerDomain=global.get('store').val.seller.mailgun['domain'];
            }
            //console.log(ownerDomain)
            $q.when()
                .then(function(){
                    return ;
                })
                .then(function(){
                    return self.Items.viewEmail(self.item,content)
                })
                .then(function(data){
                    var lists= data.lists;
                    var except=data.except;
                    //console.log(global.get('store').val.mailData);

                    if( !ownerDomain &&
                        global.get('store').val.mailData && global.get('store').val.mailData.month &&
                        global.get('store').val.mailData.month==n
                        && global.get('store').val.mailData.quantity>500){
                        throw 'Превышен лимит количества писем в месяц'
                    }
                    var o={
                        content:content,lists:lists,
                        except:except,
                        subject:self.item.name.substring(0,50)
                    }
                    return Email.save(o).$promise

                })
                .then(function(res){
                    exception.showToaster('note','Сообщение','Рассылка отправлена');
                    if(!self.item.send){self.item.send={}}
                    self.item.send.date=Date.now();
                    //console.log(self.item.send)
                    saveField('send',self.item.send);
                    if(res.quantity && !ownerDomain){
                        if(!global.get('store').val.mailData){
                            global.get('store').val.mailData={
                                month:n,
                                quantity:res.quantity
                            }
                        }else{
                            if(!global.get('store').val.mailData.month){
                                global.get('store').val.mailData={
                                    month:n,
                                    quantity:res.quantity
                                }
                            }else{
                                if(global.get('store').val.mailData.month!=n){
                                    global.get('store').val.mailData={
                                        month:n,
                                        quantity:res.quantity
                                    }
                                } else{
                                    if(!global.get('store').val.mailData.quantity){
                                        global.get('store').val.mailData.quantity=0;
                                    }
                                    global.get('store').val.mailData.quantity+=res.quantity;
                                }
                            }
                        }
                        //save data in store about quantity mails
                        var o= {_id:global.get('store').val._id}
                        o['mailData']=global.get('store').val.mailData;
                        Store.save({update:'mailData'},o)
                    }

                } )
                .catch(function(err){
                    if(err){
                        exception.catcher('отправка писем')(err)
                    }

                })
        }
        function clearDesc(block) {
            console.log('???????????????')
            block.desc='';
            saveField('blocks.'+block.i+'.index',block.desc)
        }

        /*function movedSlide(){
            self.item.imgs.forEach(function(el,i){
                el.index=i;
            })
            self.saveField('imgs')
        }
        function deleteSlide(images,index){
            //var data={file:images.img,id:self.item._id,_id:'fileDeleteFromImgs'}
            //News.save(data).$promise
            Photo.deleteFiles('News',[images.img])
            .then(function(response) {
                self.item.imgs.splice(index,1)
                self.saveField('imgs')
            }, function(err) {
                console.log(err)
            });

        }
        function editSlide(slide,index){
            //console.log(slide)
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/news/editSlide.html',
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
                self.saveField('imgs')
            }, function () {
            });
        }
        function addStuff(){
            $q.when()
                .then(function(){
                    //return selectStuffModalService.selectStuff();
                    return Stuff.selectItem()
                })
                .then(function(stuff){
                    //console.log(stuff)
                    if(stuff){
                        if(!self.item.stuffs){self.item.stuffs=[];}
                        if(!self.item.stuffs.some(function(el){return el._id==stuff._id})){
                            self.item.stuffs.push(stuff);
                            self.saveField('stuffs');
                        }

                    }
                })
                .catch(function(err){
                    err = err.data||err
                    if(err){
                        exception.catcher('получение новости')(err)
                    }
                })

        }
        function movedStuff(){
            self.saveField('stuffs')
        }
        function deleteStuff(index){
            self.item.stuffs.splice(index,1);
            self.saveField('stuffs')
        }*/







    }
    //=====================newsTemplateDirective
    /*function itemTemplateDirective(global){
        var s=(global.get('store').val.template.newsTempl)?global.get('store').val.template.newsTempl:'';
        return {
            scope: {},
            bindToController: true,
            controller: newsItemCtrl,
            controllerAs: '$ctrl',
            templateUrl:'views/template/partials/news/newsDetail'+s+'.html',
            restrict:'E'
        }
    }*/
})()
