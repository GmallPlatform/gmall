'use strict';
(function(){
    angular.module('gmall.services')
        .directive('blocksConfig',directiveFoo);
    function directiveFoo(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: directiveCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/storeSetting/blocksConfig.html',
        }
    };
    directiveCtrl.$inject=['BlocksConfig','$state','global','Confirm','exception','$q','Photo','$timeout','Store','$http','SetCSS'];
    function directiveCtrl(Items,$state,global,Confirm,exception,$q,Photo,$timeout,Store,$http,SetCSS){
        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$state;
        self.Items=Items;
        self.query={};
        self.paginate={page:0,rows:500,totalItems:0}
        self.newItem={name:'новая',page:'',block:'',templ:0,style:0,desc:''}
        self.page='';
        self.block='';
        self.pages=[
            'homePage',
            'stuffs',
            'stuffDetail',
            'news',
            'master',
            'stat',
            'additional',
            'header',
            'footer'
        ]
        self.blocksListTypes={}
        self.blocksListTypes.homePage=[];
        for(var key in listOfBlocksForMainPage){
            self.blocksListTypes.homePage.push({type:key,name:listOfBlocksForMainPage[key]})
        }
        self.blocksListTypes.stuffs=[];
        for(var key in listOfBlocksForStuffList){
            self.blocksListTypes.stuffs.push({type:key,name:listOfBlocksForStuffList[key]})
        }
        self.blocksListTypes.stuffs.push({type:'cart',name:'карточка'})
        self.blocksListTypes.stuffDetail=[];
        for(var key in listOfBlocksForStuffDetail){
            self.blocksListTypes.stuffDetail.push({type:key,name:listOfBlocksForStuffDetail[key]})
        }
        self.blocksListTypes.news=[];
        for(var key in listOfBlocksForNewsDetailPage){
            self.blocksListTypes.news.push({type:key,name:listOfBlocksForNewsDetailPage[key]})
        }
        self.blocksListTypes.master=[];
        for(var key in listOfBlocksForMasterPage){
            self.blocksListTypes.master.push({type:key,name:listOfBlocksForMasterPage[key]})
        }
        self.blocksListTypes.stat=[];
        for(var key in listOfBlocksForStaticPage){
            self.blocksListTypes.stat.push({type:key,name:listOfBlocksForStaticPage[key]})
        }
        self.blocksListTypes.additional=[];
        for(var key in listOfBlocksForAddPage){
            self.blocksListTypes.additional.push({type:key,name:listOfBlocksForAddPage[key]})
        }
        self.blocksListTypes.header=[];
        for(var key in listOfBlocksForHeader){
            self.blocksListTypes.header.push({type:key,name:listOfBlocksForHeader[key]})
        }
        self.blocksListTypes.footer=[];
        for(var key in listBlocksForFooter){
            self.blocksListTypes.footer.push({type:key,name:listBlocksForFooter[key]})
        }
        var listGoodTypes=[{type:'good',name:'good'},{type:'info',name:'info'},{type:'media',name:'media'},{type:'service',name:'service'}]


        self.getList=getList;
        self.saveField = saveField;
        self.selectItems=selectItems;
        self.createItem=createItem;
        self.deleteItem=deleteItem;
        self.changePage=changePage;
        self.getBlockName=getBlockName;
        self.changeSelectPage=changeSelectPage;
        self.getStyleForItem=getStyleForItem;
        self.setBlockStyle=setBlockStyle;


        //*******************************************************
        activate();


        function activate(page) {
            if(page || page===0){
                self.paginate.page=0;
            }
            return getList().then(function() {
                console.log('Activated  list View');
            });
        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.items = data;
                    return self.items;
                });
        }
        function selectItems(){
            self.query = {};
            if(self.page){
                self.query.page=self.page
            }
            if(self.block){
                self.query.block=self.block
            }
            self.paginate.page=0;
            activate();
        }
        function saveField(item,field,defer){
            var p = field.split(' ')
            defer =defer||0
            setTimeout(function(){
                var o={_id:item._id};
                for(var i=0;i<p.length;i++){
                    o[p[i]]=item[p[i]]
                }

                return self.Items.save({update:field},o).$promise.then(function(){
                    console.log('saved')
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)

                },function(err){console.log(err)});
            },defer)
        };
        function createItem(){
            if(!self.newItem.page || !self.newItem.block){return}
            $q.when()
                .then(function () {
                    return self.Items.save(self.newItem).$promise
                })
                .then(function () {
                    self.newItem.name='новая';
                    self.newItem.page='';
                    self.newItem.block='';
                    self.newItem.desc='';
                    self.newItem.templ=0;
                    self.newItem.style=0;
                })
                .then(function () {
                    activate();
                })
                .catch(function(err){
                    exception.catcher('создание конфигурации')(err)
                })
        }
        function deleteItem(item){
            //var folder='images/'+global.get('store').val.subDomain+'/Store/'+item.url
            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    activate(0);
                    //return Photo.deleteFolder('Stat',folder)
                })
                .catch(function(err){
                    exception.catcher('удаление конфигурации')(err)
                })
        }

        function changePage() {
            self.blocksList=[];
            self.newItem.block='';
            if(self.newItem.page=='homePage'){
                self.blocksList=self.blocksListTypes.homePage;
            }else if(self.newItem.page=='stuffs'){
                self.blocksList=self.blocksListTypes.stuffs;
            }else if(self.newItem.page=='stuffDetail'){
                self.blocksList=self.blocksListTypes.stuffDetail;
            }else if(self.newItem.page=='news'){
                self.blocksList=self.blocksListTypes.news;
            }else if(self.newItem.page=='master'){
                self.blocksList=self.blocksListTypes.master;
            }else if(self.newItem.page=='stat'){
                self.blocksList=self.blocksListTypes.stat;
            }else if(self.newItem.page=='additional'){
                self.blocksList=self.blocksListTypes.additional;
            }else if(self.newItem.page=='header'){
                self.blocksList=self.blocksListTypes.header;
            }else if(self.newItem.page=='footer'){
                self.blocksList=self.blocksListTypes.footer;
            }else{
                self.blocksList={}
            }
        }
        function getBlockName(item) {
            var a = self.blocksListTypes[item.page]
            return a.getOFA('type',item.block).name
        }
        function changeSelectPage() {
            self.block='';
            if(self.page=='homePage'){
                self.blocksListForSelect=self.blocksListTypes.homePage;
            }else if(self.page=='stuffs'){
                self.blocksListForSelect=self.blocksListTypes.stuffs;
            }else if(self.page=='stuffDetail'){
                self.blocksListForSelect=self.blocksListTypes.stuffDetail;
            }else if(self.page=='news'){
                self.blocksListForSelect=self.blocksListTypes.news;
            }else if(self.page=='master'){
                self.blocksListForSelect=self.blocksListTypes.master;
            }else if(self.page=='stat'){
                self.blocksListForSelect=self.blocksListTypes.stat;
            }else if(self.page=='additional'){
                self.blocksListForSelect=self.blocksListTypes.additional;
            }else if(self.page=='header'){
                self.blocksListForSelect=self.blocksListTypes.header;
            }else if(self.page=='footer'){
                self.blocksListForSelect=self.blocksListTypes.footer;
            }else{
                self.blocksListForSelect={}
            }
            selectItems()
        }
        function getStyleForItem(item) {
            var t;
            $q.when()
                .then(function () {
                    return $http.get(storeHost+'/api/getTemplates')
                })
                .then(function (res) {
                    return Store.selectPartOfTemplate(res.data)
                })
                .then(function (store) {
                    t=store.template;
                    console.log(t)
                    if(item.page=='stuffs' || item.page=='stuffDetail'){
                        return Store.selectItemFromList(listGoodTypes,'выберите тип')
                    }
                })
                .then(function (listType) {
                    console.log(listType)
                    var parts;
                    if(item.page=='stuffs'){
                        if(item.block=='cart'){
                            return t.stuffListCart[listType.type]
                        }else{
                            parts=t.stuffListType[listType.type].parts
                            if(parts && parts.length){
                                return parts.getOFA('name',item.block)
                            }
                        }
                    }else if(item.page=='stuffDetail'){
                        parts=t.stuffDetailType[listType.type]
                        if(parts && parts.length){
                            return parts.getOFA('name',item.block)
                        }
                    }else if(item.page=='news'){

                    }
                })
                .then(function (block) {
                    console.log(block)
                    var field;
                    if(block){
                        if(block.blockStyle){
                            item.blockStyle=block.blockStyle
                            field='blockStyle'
                        }
                        if(block.elements){
                            item.elements=block.elements
                            if(field){
                                field +=' elements';
                            }else{
                                field='elements'
                            }
                        }
                        if(!block.templ){
                            item.templ=0
                        }else{
                            item.templ=block.templ;
                        }
                        if(!block.style){
                            item.style=0
                        }else{
                            item.style=block.style;
                        }
                        if(field){
                            field +=' templ style'
                        }else{
                            field='templ style'
                        }
                        saveField(item,field)
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
        function setBlockStyle(item) {
            $q.when()
                .then(function () {
                    return SetCSS.setStyles(item)
                })
                .then(function () {
                    var field='blockStyle elements'
                    saveField(item,field)
                })
        }
    }
})()
