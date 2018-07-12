'use strict';
function setFieldsTemplate(item,field){
    //console.log(item)


    delete item.footerBlock;
    delete item.headerBlock;
    delete item.main;
    delete item.newsDetail;
    delete item.newsTempl;
    delete item.statTempl;
    delete item.staticPage;
    delete item.stats;
    delete item.stuffDetail;
    delete item.stuffs;
    delete item.stuffsList;




    if(!item.menu1){
        item.menu1={
            is:true,
            position:'top',
            fixed:true,
            background:true,
            animate:'',
            parts:[],
        }
    }
    if(!item.pricegoods){item.pricegoods={}}
    if(!item.priceservices){item.priceservices={}}
    //console.log(item.menu1)
    if(!item.menu1.parts.length){
        item.menu1.parts= [];
    }
    if(!item.menu2){
        item.menu2={
            is:false,
            position:'top',
            fixed:true,
            background:true,
            animate:'',
            parts:[],
        }
    }
    var numPartsHeader=Object.keys(listOfBlocksForHeader);
    if(!item.menuTablet){
        item.menuTablet={
            use:false,
            inverseColor:{},
            clickMenu:false,
            margin:false,
            menu1:{
                is:false,
                position:'top',
                fixed:true,
                background:true,
                parts:[],
            },
            menu2:{
                is:false,
                position:'top',
                fixed:true,
                background:true,
                parts:[],
            }
        }



    }
    numPartsHeader.forEach(function (name) {
        var o = {name:name,is:false,templ:null,position:'left'};
        var tempPart = item.menuTablet.menu1.parts.getOFA('name',name)
        if(!tempPart){
            item.menuTablet.menu1.parts.push(o);
        }
        var tempPart = item.menuTablet.menu2.parts.getOFA('name',name)
        if(!tempPart){
            item.menuTablet.menu2.parts.push(o);
        }

    })

    if(!item.menuTablet.humburger){item.menuTablet.humburger={}}
    if(!item.menuMobile){
        item.menuMobile={
            use:false,
            inverseColor:{},
            clickMenu:false,
            margin:false,
            menu1:{
                is:false,
                position:'top',
                fixed:true,
                background:true,
                parts:[],
            },
            menu2:{
                is:false,
                position:'top',
                fixed:true,
                background:true,
                parts:[],
            }
        }

    }
    numPartsHeader.forEach(function (name) {
        var o = {name:name,is:false,templ:null,position:'left'};
        var tempPart = item.menuMobile.menu1.parts.getOFA('name',name)
        if(!tempPart){
            item.menuMobile.menu1.parts.push(o);
        }
        var tempPart = item.menuMobile.menu2.parts.getOFA('name',name)
        if(!tempPart){
            item.menuMobile.menu2.parts.push(o);
        }

    })
    if(!item.menuMobile.humburger){item.menuMobile.humburger={}}
    /*item.menuTablet.menu2.parts=[]
    numPartsHeader.forEach(function (name) {
        var o = {name:name,is:false,templ:null,position:'left'};
        item.menuTablet.menu2.parts.push(o);
    })*/
    //item.menuTablet.menu1.parts[0]={name:'name',is:false,templ:null,position:'left'};
   //console.log(item.menuTablet)



    if(!item.menu2.parts.length){
        item.menu2.parts= [];
    }
    numPartsHeader=Object.keys(listOfBlocksForHeader);

    if(!item.menu2.parts || !item.menu2.parts.length || item.menu2.parts.length!=numPartsHeader.length){
        if(!item.menu2.parts){
            item.menu2.parts=[];
        }
        item.menu2.parts.forEach(function (b) {
            var i = numPartsHeader.indexOf(b.name)
            //b.is=false;
            if(i>-1){
                numPartsHeader.splice(i,1)
            }

        })
        numPartsHeader.forEach(function (name) {
            var o = {name:name,is:false,templ:null,position:'left'};
            item.menu2.parts.push(o);
        })
    }
    //console.log(numPartsHeader)

    //console.log(item.menu1.parts)
    numPartsHeader=Object.keys(listOfBlocksForHeader);
    //console.log(item.menu1.parts.length,numPartsHeader.length)
    if(!item.menu1.parts || !item.menu1.parts.length || item.menu1.parts.length!=numPartsHeader.length){
        if(!item.menu1.parts){
            item.menu1.parts=[];
        }
        item.menu1.parts.forEach(function (b) {

            var i = numPartsHeader.indexOf(b.name)
            //console.log(b.name,i)
            //b.is=false;
            if(i>-1){
                numPartsHeader.splice(i,1)
            }
        })

        numPartsHeader.forEach(function (name) {
            var o = {name:name,is:false,templ:null,position:'left'};
            item.menu1.parts.push(o);
        })
    }

    /**/

    if(!item.stuffListType || field=='stuffListType'){
        item.stuffListType={'good':{parts:[]},'service':{parts:[]},'info':{parts:[]},'media':{parts:[]}}
    }
    //console.log(item.stuffListType)
    for(var k in item.stuffListType){
        var keysStuffs=Object.keys(listOfBlocksForStuffList);
        //console.log(item.stuffListType[k])
        /*if(!item.stuffListType[k]){
            item.stuffListType[k]={parts:[]};
        }
*/
        if(item.stuffListType[k] && !item.stuffListType[k].parts){
            item.stuffListType[k].parts=[]
        }
        if(item.stuffListType[k]){
            item.stuffListType[k].parts.forEach(function (p) {
                keysStuffs.splice(keysStuffs.indexOf(p.name),1)
            })
            keysStuffs.forEach(function (ks) {
                var o= {name:ks,is:false}
                item.stuffListType[k].parts.push(o)
            })
        }

    }
    if(!item.paps || typeof item.paps!='object'){
        item.paps={}
    }
    if(!item.campaign || typeof item.campaign!='object'){
        item.campaign={}
    }
    if(!item.campaign.cart || typeof item.campaign.cart!='object'){
        item.campaign.cart={}
    }


    if(!item.stuffDetailType || field=='stuffDetailType'){
        item.stuffDetailType={'good':{parts:[]},'service':{parts:[]},'info':{parts:[]},'media':{parts:[]}}
    }

    var keySD=Object.keys(listOfBlocksForStuffDetail)
    listOfStuffDetailKind.forEach(function (kind) {
        if(!item.stuffDetailType[kind].parts.length || item.stuffDetailType[kind].parts.length!=keySD.length){
            var keys=item.stuffDetailType[kind].parts.map(function(b){return b.name})
            for(var k in listOfBlocksForStuffDetail){
                if(keys.indexOf(k)<0){
                    item.stuffDetailType[kind].parts.push({name:k,is:false,templ:null})
                }
            }
        }
    })





    if(!item.stuffListCart){
        item.stuffListCart={'good':{templ:null,style:null},'service':{templ:null,style:null},'info':{templ:null,style:null},'media':{templ:null,style:null}}
    }

    if(!item.newsList || typeof item.newsList!='object'){
        item.newsList={}
    }
    if(!item.campaignList || typeof item.campaignList!='object'){
        item.campaignList={}
    }
    if(!item.masterList || typeof item.masterList!='object'){
        item.masterList={}
    }
    if(!item.workplaceList || typeof item.workplaceList!='object'){
        item.workplaceList={}
    }
    if(!item.statList || typeof item.statList!='object'){
        item.statList={}
    }
    if(!item.infoList || typeof item.infoList!='object'){
        item.infoList={}
    }
    if(!item.info || typeof item.info!='object'){
        item.info={}
    }
    if(!item.lookbookList || typeof item.lookbookList!='object'){
        item.lookbookList={}
    }
    if(!item.additionalList || typeof item.additionalList!='object'){
        item.additionalList={}
    }
    if(!item.addcomponents){
        item.addcomponents={}
    }
    if(!item.addcomponents.button){
        item.addcomponents.button={};
    }
    if(!item.addcomponents.zoom){
        item.addcomponents.zoom={};
    }
    if(!item.addcomponents.chat){
        item.addcomponents.chat={};
    }
    if(!item.addcomponents.datetime){
        item.addcomponents.datetime={};
    }
    if(!item.addcomponents.campaign){
        item.addcomponents.campaign={};
    }
    //console.log(item.addcomponents.cabinet)
    if(!item.addcomponents.cabinet){
        item.addcomponents.cabinet={};
    }
    if(!item.addcomponents.toastError){
        item.addcomponents.toastError={};
    }
    if(!item.addcomponents.toastInfo){
        item.addcomponents.toastInfo={};
    }





    if(!item.footer || typeof item.footer=='boolean' ||field=='footer' || item.footer.length){
        item.footer={parts:[
           /* {name:'infoline',is:false,templ:null,position:'top',blocks:[{},{},{}]},
            {name:'text',is:false,templ:null,position:left},
            {name:'sn',is:false,templ:null,position:left},
            {name:'subscription',is:false,templ:null,position:left},
            {name:'feedback',is:false,templ:null,position:left},
            {name:'stat',is:false,templ:null,position:left},
            {name:'catalog',is:false,templ:null,position:left},
            {name:'copyright',is:false,templ:null,position:left},
            {name:'news',is:false,templ:null,position:'left'},
            {name:'campaign',is:false,templ:null,position:'left'}*/
        ]}
        for(var name in listBlocksForFooter){
            var o = {name:name,is:false,templ:null,position:'left'};
            if(name=='infoline'){
                o.position='top'
                o.blocks=[{},{},{}];
            }
            item.footer.parts.push(o);
        }
    }

    var keysF = Object.keys(listBlocksForFooter)
    if(!item.footer.parts){item.footer.parts=[]}
    keysF.forEach(function (k) {
        //console.log(k)
        var o =item.footer.parts.getOFA('name',k)
        //console.log(o)
        if(!o){
            o = {name:k,is:false,templ:null,position:'left'};
            item.footer.parts.push(o);
        }
    })
    //console.log(item.footer.parts)



    if(!item.index){
        item.index={}
    }
    if(!item.index.body){
        item.index.body=angular.copy(arrEmptyForProperties)
    }
    if(!item.index.icons){
        item.index.icons={}

    }
    for(var i=0,l=listOfIcons.length;i<l;i++){
        if(!item.index.icons[listOfIcons[i]]){
            item.index.icons[listOfIcons[i]]={img:'',hoverImg:''};
        }
    }
    var keys = Object.keys(item.index.icons);
    keys.forEach(function (k) {
        if(listOfIcons.indexOf(k)<0){
           delete item.index.icons[k]
        }
    })

    if(!item.stat|| !item.stat.parts){
        item.stat={parts:[]};
        for(var k in listOfBlocksForStaticPage){
            item.stat.parts.push({name:k,is:false,templ:null})
        }
    }
    if(!item.news || !item.news.parts){
        item.news={parts:[]};
        for(var k in listOfBlocksForNewsDetailPage){
            item.news.parts.push({name:k,is:false,templ:null})
        }
    }
   /* if(!item.news.parts.getOFA('name','date')){
        item.news.parts.push({name:'date',is:false,templ:null})
    }*/
    if(!item.master|| !item.master.parts){
        item.master={parts:[]};
        for(var k in listOfBlocksForMasterPage){
            item.master.parts.push({name:k,is:false,templ:null})
        }
    }
    if(!item.workplace|| !item.workplace.parts){
        item.workplace={parts:[]};
        for(var k in listOfBlocksForWorkplacePage){
            item.workplace.parts.push({name:k,is:false,templ:null})
        }
    }
    if(!item.additional|| !item.additional.parts){
        item.additional={parts:[]};
        for(var k in listOfBlocksForAddPage){
            item.additional.parts.push({name:k,is:false,templ:null})
        }
    }
    if(!item.additional.parts.length || item.additional.parts.length!=listOfBlocksForAddPage.length){
        var keys=item.additional.parts.map(function(b){return b.name})
        for(var k in listOfBlocksForAddPage){
            if(keys.indexOf(k)<0){
                item.additional.parts.push({name:k,is:false,templ:null})
            }

        }
    }
    //console.log(item.additional.parts)
    if(!item.master.parts.length || item.master.parts.length!=listOfBlocksForMasterPage.length){
        var keys=item.master.parts.map(function(b){return b.name})
        for(var k in listOfBlocksForMasterPage){
            if(keys.indexOf(k)<0){
                item.master.parts.push({name:k,is:false,templ:null})
            }

        }
    }
    if(!item.workplace.parts.length || item.workplace.parts.length!=listOfBlocksForWorkplacePage.length){
        var keys=item.workplace.parts.map(function(b){return b.name})
        for(var k in listOfBlocksForWorkplacePage){
            if(keys.indexOf(k)<0){
                item.workplace.parts.push({name:k,is:false,templ:null})
            }

        }
    }

    //return;
    if(!item.stat.parts.length || item.stat.parts.length!=listOfBlocksForStaticPage.length){
        var keys=item.stat.parts.map(function(b){return b.name})
        for(var k in listOfBlocksForStaticPage){
            if(keys.indexOf(k)<0){
                item.stat.parts.push({name:k,is:false,templ:null})
            }

        }
    }
    //console.log(item.stat)

    if(!item.news.parts.length || item.news.parts.length!=listOfBlocksForNewsDetailPage.length){
        var keys=item.news.parts.map(function(b){return b.name})
        for(var k in listOfBlocksForNewsDetailPage){
            if(keys.indexOf(k)<0){
                item.news.parts.push({name:k,is:false,templ:null})
            }

        }
    }
    if(!item.humburger){item.humburger={}}


    for(var k22 in item){
        if(typeof item[k22]=='object'){
            for(var k23 in item[k22]){
                if(item[k22][k23] =='false'){item[k22][k23]=false}else if(item[k22][k23] =='true'){item[k22][k23]=true}
                if(k23=='parts' && item[k22].parts && item[k22].parts.length){
                    item[k22].parts.forEach(function (p) {
                        if(p.is =='false'){p.is=false}else if(p.is =='true'){p.is=true}
                    })
                }
                if(typeof item[k22][k23]=='object' && k23!='parts'){
                    for(var k24 in item[k22][k23]){
                        if(item[k22][k23][k24] && item[k22][k23][k24] ==='false'){item[k22][k23][k24]=false}else if(item[k22][k23][k24] && item[k22][k23][k24] ==='true'){item[k22][k23][k24]=true}
                        if(k24=='parts' && item[k22][k23].parts && item[k22][k23].parts.length){
                            item[k22][k23].parts.forEach(function (p) {
                                if(p.is =='false'){p.is=false}else if(p.is =='true'){p.is=true}
                            })
                        }
                        if(typeof item[k22][k23][k24]=='object' && k24!='parts'){
                            for(var k25 in item[k22][k23][k24]){
                                if(item[k22][k23][k24][k25] && item[k22][k23][k24][k25] ==='false'){item[k22][k23][k24][k25]=false}else if(item[k22][k23][k24][k25] && item[k22][k23][k24][k25] ==='true'){item[k22][k23][k24][k25]=true}
                                if(k25=='parts'&& item[k22][k23][k24].parts&& item[k22][k23][k24].parts.length){
                                    item[k22][k23][k24].parts.forEach(function (p) {
                                        if(p.is =='false'){p.is=false}else if(p.is =='true'){p.is=true}
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    //console.log(item)



}
angular.module('gmall.directives')
    .directive('templatesList', function(){
        return {
            scope: {},
            restrict:'E',
            bindToController: true,
            controller: templateListCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/storeSetting/templateList.html'
        };
        templateListCtrl.$inject=['$q','$state','global','exception','Template']
        function templateListCtrl($q,$state,global,exception,Template){
            var self = this;
            self.Items=Template;
            self.$state=$state;
            self.query={};
            self.paginate={page:0,rows:10,items:0}
            self.createItem=createItem;
            self.saveField=saveField;
            self.getList=getList;

            activate()

            function activate(){
                getList()
            }
            function getList(){
                $q.when()
                    .then(function(){
                        return Template.getList(self.paginate)
                    })
                    .then(function(data) {
                        self.items = data;
                        return self.items;
                    })
                    .catch(function(err){
                        exception.catcher('получение данных')(err)
                    })
            }
            function saveField(item,field){
                var o ={_id:item._id}
                o[field]=angular.copy(item[field]);
                Template.save({update:field},o)
               // console.log(field,o)
            }
            function createItem(){
                //console.log('create')
                $q.when()
                    .then(function(){
                        return Template.create()
                    })
                    .then(function(template){
                        //console.log(store)
                        return Template.save(template).$promise
                    })
                    .then(function(){
                        return Template.getList(self.paginate,self.query)

                    })
                    .then(function(data) {
                        self.items = data;
                        return self.items;
                    })
                    .catch(function(err){
                        if(err){
                            exception.catcher('создание шаблона')(err)
                        }
                    })
            }

        }
    })
    .directive('templateMenuSetting',function(){return {templateUrl:'components/storeSetting/template/header.html'}})
    .directive('templateMenuSettingA',function(){return {templateUrl:'components/storeSetting/template/headermain1.html'}})
    .directive('templateFooterSetting',function(){return {templateUrl:'components/storeSetting/template/footer.html'}})
    .directive('templateBaseSetting',function(){return {templateUrl:'components/storeSetting/template/baseComponent.html'}})
    .directive('templateIndexSetting',function(){return {templateUrl:'components/storeSetting/template/homePage.html'}})
    .directive('templateCartSetting',function(){return {templateUrl:'components/storeSetting/template/cart.html'}})
    .directive('templateStuffsSetting',function(){return {templateUrl:'components/storeSetting/template/stuffs.html'}})
    .directive('templateStuffDetailSetting',function(){return {templateUrl:'components/storeSetting/template/stuffDetail.html'}})
    .directive('templateNewsSetting',function(){return {templateUrl:'components/storeSetting/template/news.html'}})
    .directive('templateNewsDetailSetting',function(){return {templateUrl:'components/storeSetting/template/newsDetail.html'}})
    .directive('templateStatsSetting',function(){return {templateUrl:'components/storeSetting/template/stats.html'}})
    .directive('templateMasterSetting',function(){return {templateUrl:'components/storeSetting/template/master.html'}})
    .directive('templateWorkplaceSetting',function(){return {templateUrl:'components/storeSetting/template/workplace.html'}})
    .directive('templateAdditionalSetting',function(){return {templateUrl:'components/storeSetting/template/additional.html'}})
    .directive('templateAddcomponentsSetting',function(){return {templateUrl:'components/storeSetting/template/addcomponents.html'}})
    .directive('templateSocialSetting',function(){return {templateUrl:'components/storeSetting/template/social.html'}})
    .directive('templatePapsSetting',function(){return {templateUrl:'components/storeSetting/template/paps.html'}})
    .directive('templateCampaignSetting',function(){return {templateUrl:'components/storeSetting/template/campaign.html'}})

    .directive('templateItemFromStore', function(){
        return {
            scope: {},
            restrict:'E',
            bindToController: true,
            controller: templateItemFromStoreCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/storeSetting/templateItemFromStore.html'
        };
        templateItemFromStoreCtrl.$inject=['$csope','$q','$stateParams','global','exception','Store','$uibModal','$http','Info','Confirm','$timeout','Sections','Category','SetCSS','BlocksConfig','$fileUpload']
        function templateItemFromStoreCtrl($scope,$q,$stateParams,global,exception,Store,$uibModal,$http,Info,Confirm,$timeout,Sections,Category,SetCSS,BlocksConfig,$fileUpload){
            //console.log('dd')

            var self = this;
            self.Items=Store;
            self.type='good';
            self.global=global;
            //self.lang=global.get('store').val.lang
            self.item={}
            self.block=($stateParams.block)?$stateParams.block:'';
            self.selectors={index:'',modalwindow:''};

            //   main setting
            self.listElements=/*['a','p','div','h1','h2','h3','h4','ol','ul','li','span','img']*/elementsList;
            self.fontFaces=[];
            //self.displayList=['block','inline','inline-block','inline-table','none']
            self.displayList=['block','inline','inline-block','none','table','inline-table','table-cell','table-column','table-row','table-caption']
            self.positionList=['relative','absolute','fixed','inherit','static'];


            self.setIcon=setIcon;
            self.deleteIcon=deleteIcon;
            self.filterMainElements=filterMainElements;
            self.addElementInMain=addElementInMain;
            self.deleteElementInMain=deleteElementInMain;

            self.saveFieldTemplate=saveFieldTemplate;
            self.showPhoneField=showPhoneField;

            self.addGroup=addGroup;
            self.deleteGroup=deleteGroup;
            self.addCategory=addCategory;
            self.deleteCategory=deleteCategory;
            self.getGroupName=getGroupName;
            self.getCategoryName=getCategoryName;
            self.changeMenuSetting=changeMenuSetting;
            self.deleteBlockFromStuffDetail=deleteBlockFromStuffDetail;
            self.downloadPartOfTemplate=downloadPartOfTemplate;
            self.getBlockConfig=getBlockConfig;

            self.loadPhoto=loadPhoto;
            self.deleteFon=deleteFon;
            self.showPhoto=showPhoto;

            self.clearCashe=clearCashe;

            function clearCashe() {
                $q.when()
                    .then(function () {
                        return $http.get("/api/resetStoreCashe/"+global.get('store').val._id)
                    })
                    .then(function (res) {
                        global.set('saving',true);
                        $timeout(function(){
                            global.set('saving',false);
                        },1500)
                    })
                    .catch(function (err) {
                        exception.catcher('cброс кеша')(err)
                    })

            }


            function deleteBlockFromStuffDetail($index){
                Confirm('Удалить?')
                    .then(function () {
                        self.item.stuffDetailType[self.type].parts.splice($index,1);
                        self.saveFieldTemplate('stuffDetailType.'+self.type+'.parts',self.item.stuffDetailType[self.type].parts)
                    })

            }
            //********************


            //self.listOfBlocksForMainPage=listOfBlocksForMainPage;
            self.listBlocksForFooter=listBlocksForFooter;
            self.tableOfColorsForButton=tableOfColorsForButton;
            self.tableOfButtonsFile=tableOfButtonsFile;
            self.listOfBlocksForStats=listOfBlocksForStats;
            self.listOfBlocksForStuffDetail=listOfBlocksForStuffDetail;
            self.listOfBlocksForStuffList=listOfBlocksForStuffList;
            self.listOfBlocksForHeader=listOfBlocksForHeader;
            self.listOfBlocksForStaticPage=listOfBlocksForStaticPage;
            self.listOfBlocksForNewsDetailPage=listOfBlocksForNewsDetailPage;
            self.listOfBlocksForMasterPage=listOfBlocksForMasterPage;
            self.listOfBlocksForWorkplacePage=listOfBlocksForWorkplacePage;
            self.listOfBlocksForAddPage=listOfBlocksForAddPage;
            self.animationTypes=animationTypes;
            self.listOfListName=listOfListName.map(function (item) {return item+'List'});
            self.listOfListNameObject=self.listOfListName.reduce(function(o,item){
                switch(item){
                    case 'newsList': o[item]='новости';break;
                    case 'statList':o[item]='статические страницы';break;
                    case 'masterList':o[item]='мастера';break;
                    case 'infoList':o[item]='информационные разделы';break;
                    case 'campaignList':o[item]='акции';break;
                    case 'lookbookList':o[item]='список галерей';break;
                    case 'lookbookList':o[item]='список галерей';break;
                    case 'additionalList':o[item]='дополнительный';break;
                    case 'workplaceList':o[item]='рабочее место';break;
                }
                return o;
            },{})


            self.saveField=saveField;
            self.saveFieldStore=saveFieldStore;
            //self.dropCallbackHP=dropCallbackHP;
            self.dropCallbackFooter=dropCallbackFooter;
            self.dropCallbackBlock=dropCallbackBlock;
            self.dropCallbackMenu1=dropCallbackMenu1;
            self.dropCallbackMenu2=dropCallbackMenu2;
            self.dropCallbackStuffDetail=dropCallbackStuffDetail;
            self.dropCallbackMenuType=dropCallbackMenuType;
            self.dropCallbackStuffDetail=dropCallbackStuffDetail;
            /*self.addBlockForMainPage=addBlockForMainPage;
            self.filterMainListL=filterMainListL;
            self.filterMainListR=filterMainListR;*/
            self.changeAnimations=changeAnimations;
            self.setColor=setColor;
            //stats
            self.addBlockForStats=addBlockForStats;
            self.filterStatsListH=filterStatsListH;
            self.filterStatsListF=filterStatsListF;
            self.filterStatsListL=filterStatsListL;
            self.filterStatsListR=filterStatsListR;
            self.dropCallbackStats=dropCallbackStats;
            //stuff
            self.filterStuffList=filterStuffList;
            self.addBlockForList=addBlockForList;
            self.filterSDListH=filterSDListH;
            /*self.filterSDListF=filterSDListF;
            self.filterSDListL=filterSDListL;
            self.filterSDListR=filterSDListR;*/
            self.dropCallbackSD=dropCallbackSD;
            //header
            self.addBlockForListHeader=addBlockForListHeader;
            self.filterListHeader1=filterListHeader1;
            self.filterListHeader2=filterListHeader2;
            self.addInfoBlock=addInfoBlock;

            self.setSatartValue=setSatartValue;
            
            self.indexAddSelector=indexAddSelector;
            self.indexAddElement=indexAddElement;
            self.indexDeleteElement=indexDeleteElement;
            self.makeMainCSS=makeMainCSS;
            function makeMainCSS() {
                $q.when()
                    .then(function () {
                        return $http.get('/api/makeMainCSS')
                    })
                    .then(function () {
                        exception.showToaster('info','ok')
                    })
                    .catch(function(err){
                        exception.catcher('получение данных')(err)
                    })
            }


            self.hasIcons=hasIcons;

            self.getImg=getImg;

            function getImg(element,field) {
                //console.log(element,field)
                var options={
                    animation: true,
                    bindToController: true,
                    size:'md',
                    controllerAs: '$ctrl',
                    windowClass: 'app-modal-window',
                    templateUrl: 'components/storeSetting/modal/setImg.html',
                    controller: function bindtoPageCtrl($uibModalInstance,Store,global,field){
                        var self=this;
                        self.store= global.get('store').val
                        self.field=field;
                        self.Item=Store;
                        self.done=done;
                        self.cancel = cancel;
                        activate()
                        function activate(){}
                        function done(){
                            $uibModalInstance.close();
                        }
                        function cancel() {
                            $uibModalInstance.dismiss();
                        };
                    },
                    resolve:{
                        field:function(){
                            return field;
                        }
                    }
                }
                $q.when()
                    .then(function(){
                        return $uibModal.open(options).result
                    })
                    .then(function(){
                        var data;
                        var parts = nameBlock.split('.')
                        console.log(parts)
                        if(parts.length>1){
                            parts.forEach(function (key) {
                                if(!data){
                                    data=self.item[key];
                                }else{
                                    data=data[key];
                                }
                            })
                        }else{
                            data=self.item[nameBlock]
                        }

                        saveFieldTemplate(nameBlock,data)
                    })
            }
            function setColorOld(block,nameBlock){
                var options={
                    animation: true,
                    bindToController: true,
                    size:'lg',
                    controllerAs: '$ctrl',
                    windowClass: 'app-modal-window',
                    templateUrl: 'components/storeSetting/modal/setColor.html',
                    controller: function bindtoPageCtrl(Confirm,$uibModalInstance,block,fontFaces){
                        var self=this;
                        self.block=block;
                        self.selector=''

                        if(!block.blockStyle){block.blockStyle=angular.copy(arrEmptyForProperties)}
                        self.listElements=['a','p','div','h1','h2','h3','h4','ol','ul','li','span','img'];
                        self.fontFaces=fontFaces
                        self.displayList=['block','inline','inline-block','none','table','inline-table','table-cell','table-column','table-row','table-caption']
                        self.positionList=['relative','absolute','fixed','inherit','static']
                        self.filterListElements=filterListElements;
                        self.addNewElement=addNewElement;
                        self.deleteElement=deleteElement;
                        self.done=done;
                        self.cancel = cancel;
                        self.addSelector=addSelector;

                        activate()
                        function activate(){}
                        function addNewElement() {
                            //console.log(self.element)
                            if(!self.block.elements){self.block.elements={}}
                            self.block.elements[self.element]=angular.copy(arrEmptyForProperties)
                            self.element=null;
                        }
                        function deleteElement(element) {
                            //console.log(element)
                            Confirm('delete?').then(function () {
                                delete self.block.elements[element]
                            })

                        }
                        function filterListElements(el) {
                            if(!self.block.elements){return true}
                            var elems=Object.keys(self.block.elements);
                            return elems.indexOf(el)<0
                            /*for(var i=0,l=self.block.elements.length;i<l;i++){

                             if(Object.keys(self.block.elements[i])[0]==el){
                             return false;
                             }
                             }
                             return true;*/
                        }
                        function done(){
                            $uibModalInstance.close();
                        }
                        function cancel() {
                            $uibModalInstance.dismiss();
                        };

                        function addSelector(){
                            if(!self.block.elements){self.block.elements={}}
                            var selector= self.selector.trim().substring('0,25').replace(/([^a-z0-9_&]+)/gi, '-');
                            //console.log(selector)
                            if(selector[0]=='&'){var field=selector}else{var field='@'+selector}
                            self.block.elements[field]=angular.copy(arrEmptyForProperties)
                            self.selector=''
                        }
                    },
                    resolve:{
                        block:function(){
                            return block
                        },
                        fontFaces:function(){
                            return self.item.index.fontFaces;
                        }
                    }
                }
                $q.when()
                    .then(function(){
                        return $uibModal.open(options).result
                    })
                    .then(function(){
                        var data;
                        var parts = nameBlock.split('.')
                        console.log(parts)
                        if(parts.length>1){
                            parts.forEach(function (key) {
                                if(!data){
                                    data=self.item[key];
                                }else{
                                    data=data[key];
                                }
                            })
                        }else{
                            data=self.item[nameBlock]
                        }

                        saveFieldTemplate(nameBlock,data)
                    })
            }

            function indexAddSelector(field,item) {
                console.log(self.selectors)
                console.log(field)
                //console.log(field)
                if(!item.elements){
                    item.elements={}
                }
                var fieldSave = field
                var selector= self.selectors[field].trim().substring('0,25').replace(/([^a-z0-9_&]+)/gi, '-');
                if(selector[0]=='&'){field=selector}else{field='@'+selector}
                console.log(field)
                item.elements[field]=angular.copy(arrEmptyForProperties)
                self.selectors[fieldSave]=''
            }
            function indexAddElement(item) {
                if(!item.elements){
                    item.elements={}
                }
                item.elements[self.element]=angular.copy(arrEmptyForProperties)
                self.element=null;

            }
            function indexDeleteElement(elements,element) {
                //console.log(elements,element)
                Confirm('удалить?').then(function () {
                    delete elements[element]
                    console.log(elements)
                    self.saveFieldTemplate('item.index.modalProject.elements',elements)
                })

            }
            activate()
            /*$scope.$on('changeLang',function(){
                setConfigData(global.get('store' ).val.lang)
            })
            function setConfigData(){
                self.lang=glabal.get('store').val.lang
            }*/
            var sections={},categories={};
            function activate(){
                $scope.$watch(function () {
                    return self.type
                },function (n,o) {
                    //console.log(n,o)
                    self.sections=[]
                    if(n!=o){
                        self.sectionsList.forEach(function (s) {
                            if(s.type==n){
                                self.sections.push(s.name)
                            }
                        })
                    }
                })
                $q.when()
                    .then(function () {
                        return Sections.getSections()
                    })
                    .then(function(sec){
                        self.sections=[];
                        sec.forEach(function(s){
                            if(!sec.type){
                                sec.type='good'
                            }
                            if(s.type=='good'){
                                self.sections.push(s.name)
                            }
                            sections[s._id]=s.name;
                            s.categories.forEach(function (c) {
                                categories[c._id]=c.name
                            })
                            s.child.forEach(function (ch) {
                                if(ch.catgories){
                                    ch.catgories.forEach(function (c) {
                                        categories[c._id]=c.name
                                    })
                                }
                            })
                        })
                        //console.log(self.sections)
                        self.sectionsList = sec;
                        return Store.getItem(global.get('store').val._id)
                    })

                    .then(function(data) {
                        self.store=data;
                        if(!self.store.nameListsL){
                            self.store.nameListsL={}
                        }
                        if(!self.store.addcomponents){
                            self.store.addcomponents={}
                        }
                        if(!self.store.addcomponents.button){
                            self.store.addcomponents.button={
                                name:'',
                                nameL:{},
                                is:false,
                                link:''
                            }
                        }
                        if(!self.store.nameListsL[global.get('store').val.lang]){
                            self.store.nameListsL[global.get('store').val.lang]={}
                        }
                        self.item = data.template;
                        if(!self.item){
                            self.item={};
                            setFieldsTemplate(self.item)
                            Store.save({update:'template'},{_id:global.get('store').val._id,template:self.item})
                        }
                        if(!self.item.index || typeof self.item.index!='object'){
                            self.item.index={};
                            saveFieldTemplate('index',{})

                        }
                        if(!self.item.index.modalProject || typeof self.item.index.modalProject!='object' || !self.item.index.modalProject.styles){
                            self.item.index.modalProject={}
                            self.item.index.modalProject.styles=angular.copy(arrEmptyForProperties)
                            saveFieldTemplate('index.modalProject',self.item.index.modalProject)
                        }

                        setFieldsTemplate(self.item)
                        if(!self.item.footer.parts){
                            setFieldsTemplate(self.item,'footer')
                            saveFieldTemplate('footer',self.item.footer)
                        }
                        if(!self.item.stuffDetailType.good || !self.item.stuffDetailType.good.parts){
                            setFieldsTemplate(self.item,'stuffDetailType')
                            saveFieldTemplate('stuffDetailType',self.item.stuffDetailType)
                        }
                        //console.log(self.item.stuffListType.good)
                        if(!self.item.stuffListType.good || !self.item.stuffListType.good.parts){
                            setFieldsTemplate(self.item,'stuffListType')
                            //saveFieldTemplate('stuffListType',self.item.stuffListType)
                        }
                        for(var typeOfList in self.item.stuffListType){
                            if(self.item.stuffListType[typeOfList].parts && self.item.stuffListType[typeOfList].parts.length){
                                self.item.stuffListType[typeOfList].parts.forEach(function (p) {
                                    if(p.is){
                                        if(p.is=='false'){p.is=false}else if(p.is=='true'){p.is=true}
                                    }
                                })
                            }
                        }
                        //saveFieldTemplate('stuffDetailType',self.item.stuffDetailType)
                        //console.log(self.item)
                        //Store.save({update:'template'},self.store)
                        //saveFieldTemplate('main.elements',{})

                    })
                    .then(function () {
                        return $http.get('/api/getFontFaces')
                    })
                    .then(function (res) {
                        self.fontFaces = res.data;
                        //console.log(self.fontFaces)
                    })
                    .catch(function(err){
                        exception.catcher('получение данных')(err)
                    })
            }
            $scope.$on('changeLang',function(){
                if(!self.store.nameListsL[global.get('store').val.lang]){
                    self.store.nameListsL[global.get('store').val.lang]={}
                }
            })
            function saveField(field){
                /*console.log(self.item[field])
                return;*/
                saveFieldTemplate(field,self.item[field])
                return;

                var o ={_id:global.get('store').val._id,template:angular.copy(self.item)}
                Store.save({update:'template'},o,function(err){
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)
                })

            }
            function saveFields(fields){
                var o ={_id:global.get('store').val._id}
                fields=fields.split(' ');
                fields.forEach(function (field) {
                    o['template.'+field]=self.item[field]
                })

                console.log(o)
                /*Store.save({update:'template.'+field},o,function(err){
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)
                })
*/
            }
            function saveFieldTemplate(field,value){
                /*console.log(field,value);return;*/
                var o ={_id:global.get('store').val._id}
                var field1 ='template.'+field
                o[field1]=value
                //console.log(o)
                $q.when()
                    .then(function () {
                        return Store.save({update:field1},o).$promise
                    })
                    .then(function () {
                        global.set('saving',true);
                        $timeout(function(){
                            global.set('saving',false);
                        },1500)
                    })
                    .catch(function (err) {
                        if(err){
                            console.log(err)
                            if(field1.indexOf('template.stuffListType.')>-1){
                                var parts=field1.split('.')
                                var field2 = parts[0]+'.'+parts[1]+'.'+parts[2];
                                var o1 ={_id:global.get('store').val._id}
                                o1[field2]={}
                                Store.save({update:field2},o1,function(err){
                                    Store.save({update:field1},o,function(err){
                                        global.set('saving',true);
                                        $timeout(function(){
                                            global.set('saving',false);
                                        },1500)
                                    })
                                })

                            }
                            //***************************************
                        }
                    })

            }
            function saveFieldStore(field){
                console.log('store - ',field)
                var o ={_id:self.store._id};
                var ff = field.split('.')
                if(ff.length==1){
                    o[field]=self.store[field];
                }else{
                    o[field]=self.store[ff[0]][ff[1]];
                }

                Store.save({update:field},o,function () {
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)
                })
            }
            //***************************************************** main
            function deleteIcon(icon,typeImg) {
                self.item.index.icons[icon][typeImg]=null;
                saveFieldTemplate('index.icons.'+icon+'.'+typeImg,null);
            }
            function setIcon(icon,typeImg) {

                //console.log(icon,typeImg)
                //console.log(self.item.index.icons)
                var options={
                    animation: true, bindToController: true, controllerAs: '$ctrl',
                    templateUrl: 'components/storeSetting/modal/setIcon.html',
                    controller: function bindtoPageCtrl($uibModalInstance,$http,icon){
                        var self=this;
                        self.icon=icon
                        self.done=done;
                        self.cancel = cancel;
                        activate()
                        function activate(){

                            var url = '/api/getIcons/'+icon;
                            //console.log(url)
                            return $http.get(url).then(function (res) {
                                self.icons=res.data;
                                //console.log(self.icons)
                            }).catch(function(err){
                                console.log(err)
                            })
                        }
                        function done(newIcon){
                            $uibModalInstance.close(newIcon);
                        }
                        function cancel() {
                            $uibModalInstance.dismiss();
                        };
                    },
                    resolve:{
                        icon:function(){
                            return icon
                        }
                    }
                }
                $q.when()
                    .then(function(){
                        return $uibModal.open(options).result
                    })
                    .then(function(newIcon){
                        console.log(newIcon)
                        self.item.index.icons[icon][typeImg]='/img/icon/'+icon+'/'+newIcon;
                        saveFieldTemplate('index.icons.'+icon+'.'+typeImg,self.item.index.icons[icon][typeImg]);
                        //saveFieldTemplate('main',self.item.index);

                    })
            }
            function filterMainElements(item) {
                if(!self.item || !self.item.index || !self.item.index.elements){return true}else{
                    var els= Object.keys(self.item.index.elements)
                    return els.indexOf(item)<0
                }
            }
            function addElementInMain() {
                if(!self.item.index.elements){self.item.index.elements={}}
                self.item.index.elements[self.element]=angular.copy(arrEmptyForProperties)
                saveFieldTemplate('index.elements.'+self.element,self.item.index.elements[self.element])
                self.element=null;

            }
            function deleteElementInMain(element) {
                //console.log(element)
                Confirm('удалить?').then(function () {
                    delete self.item.index.elements[element]
                    saveFieldTemplate('index.elements',self.item.index.elements)
                })
            }
            //**********************************************************

            //******************************************************footer
            function addInfoBlock(blocks,i) {

                $q.when()
                    .then(function(){
                        return Info.select()
                    })
                    .then(function(item){
                        return Info.get({_id:item._id,clone:'clone'}).$promise
                    })
                    .then(function(item){
                        console.log(item)
                        blocks[i]={}
                        blocks[i]._id=item._id;
                        blocks[i].url=item.url;
                        blocks[i].name=item.name;
                        blocks[i].nameL=item.nameL;
                        blocks[i].img=(item.img)?item.img:null;
                        saveFieldTemplate('footer',self.item.footer)
                    })
                    .catch(function(){
                        console.log('dismiss')
                    })
            }
            function addGroup() {
                $q.when()
                    .then(function () {
                        return Sections.select()
                    })
                    .then(function (group) {
                        if(!self.item.footer.catalog){
                            self.item.footer.catalog={}
                        }
                        if(!self.item.footer.catalog.groups){
                            self.item.footer.catalog.groups=[]
                        }
                        if(self.item.footer.catalog.groups.indexOf(group._id)<0){
                            self.item.footer.catalog.groups.push(group._id)
                            saveFieldTemplate('footer.catalog',self.item.footer.catalog)
                        }

                    })

            }
            function deleteGroup(i) {
                self.item.footer.catalog.groups.splice(i,1)
                saveFieldTemplate('footer.catalog',self.item.footer.catalog)
            }
            function addCategory() {
                $q.when()
                    .then(function () {
                        return Category.select()
                    })
                    .then(function (category) {
                        if(!self.item.footer.catalog){
                            self.item.footer.catalog={}
                        }
                        if(!self.item.footer.catalog.categories){
                            self.item.footer.catalog.categories=[]
                        }
                        //console.log(self.item.footer.catalog.categories.indexOf(category._id))
                        if(self.item.footer.catalog.categories.indexOf(category._id)<0){
                            self.item.footer.catalog.categories.push(category._id)
                            saveFieldTemplate('footer.catalog',self.item.footer.catalog)
                        }

                    })
            }
            function deleteCategory(i) {
                self.item.footer.catalog.categories.splice(i,1)
                saveFieldTemplate('footer.catalog',self.item.footer.catalog)
            }
            function getGroupName(id) {
                if(sections[id]){
                    return sections[id]
                }
            }
            function getCategoryName(id) {
                if(categories[id]){
                    return categories[id]
                }
            }


            //************************************************************


            function dropCallbackFooter(item){
                //console.log(item)
                setTimeout(function(){
                    /*self.item.footer.forEach(function(part,idx){
                        part.index=idx+1;
                    })*/
                    saveField('footer')
                },100)
                return item
            }
            function dropCallbackBlock(item){
                setTimeout(function(){
                    self.item.stuffListType[self.type].parts.forEach(function(part,idx){
                        part.index=idx+1;
                    })
                    saveFieldTemplate('stuffListType.'+self.type+'.parts',self.item.stuffListType[self.type].parts)
                },100)
                return item
            }
            function dropCallbackMenu1(item){
                //console.log(item)
                setTimeout(function(){
                    self.item.menu1.parts.forEach(function(part,idx){
                        part.index=idx+1;
                    })
                    saveField('menu1')
                },100)
                return item
            }
            function dropCallbackMenuType(item,type,menu){
                console.log(item,type,menu);
                //return item;
                setTimeout(function(){
                    self.item[type][menu].parts.forEach(function(part,idx){
                        part.index=idx+1;
                    })
                    saveField(type)
                },100)
                return item;
            }

            function dropCallbackMenu2(item){
                //console.log(item)
                setTimeout(function(){
                    self.item.menu2.parts.forEach(function(part,idx){
                        part.index=idx+1;
                    })
                    saveField('menu2')
                },100)
                return item
            }
            function dropCallbackStuffDetail(item){
                setTimeout(function(){
                    self.item.stuffDetailType[self.type].parts.forEach(function(part,idx){
                        part.index=idx+1;
                    })
                    saveFieldTemplate('stuffDetailType.'+self.type+'.parts',self.item.stuffDetailType[self.type].parts)
                },100)
                return item
            }
            function changeAnimations(component){
                //console.log(component)
                var options={
                    animation: true,
                    bindToController: true,
                    controllerAs: '$ctrl',
                    templateUrl: 'components/storeSetting/modal/changeAnimation.html',
                    controller: function bindtoPageCtrl($uibModalInstance,component){
                        var self=this;
                        self.animationData=(component.animationData)?component.animationData:{}
                        //console.log(self.animationData)
                        self.animationList={
                            'bounce':'отскок',
                            'animated8':'fadeInDown',
                            'animated10':'fadeInLeft',
                            'animated23':'fadeInRight',

                        }
                        self.clipList={'triangle':'трегольник','radius':'radius'}
                        self.ok=done;
                        self.cancel = cancel;
                        activate()
                        function activate(){}
                        function done(){
                            $uibModalInstance.close(self.animationData);
                        }
                        function cancel() {
                            $uibModalInstance.dismiss();
                        };
                    },
                    resolve:{
                        component:function(){
                            return component
                        }
                    }
                }
                $q.when()
                    .then(function(){
                        return $uibModal.open(options).result
                    })
                    .then(function(val){
                        console.log(val)
                        component.animationData=val;
                        //self.saveField('main')
                        /*if(!val){val=null;}
                        var field='f';
                        //console.log(field)
                        if(list=='frequencies'){
                            field='f'}else if(list=='competitives'){
                            field='c'
                        }
                        var actions=[]
                        for(var i=0;i<self.item.keywords.length;i++){
                            if(self.item.keywords[i].select){
                                self.item.keywords[i][field]=val;
                                self.saveField(self.item.keywords[i],field)
                            }
                        }*/
                    })

            }
            function setSatartValue(type) {
                Confirm("Сбросить значения?" )
                    .then(function(){
                        var list;
                        switch(type){
                            case 'stat':list=self.listOfBlocksForStaticPage;break;
                            case 'news':list=self.listOfBlocksForNewsDetailPage;break;
                            case 'master':list=self.listOfBlocksForMasterPage;break;
                        }
                        if(list){
                            self.item[type]={parts:[]};
                            for(var k in list){
                                self.item[type].parts.push({name:k,is:false,templ:null})
                            }
                            self.saveFieldTemplate('stat',self.item.stat)
                        }
                    })

            }

            function setColor(block,nameBlock,short){
                var data;
                var parts = nameBlock.split('.')
                $q.when()
                    .then(function(){
                        if(short){
                            if(!block){
                                if(parts.length>1){
                                    parts.forEach(function (key,i) {
                                        if(!data){
                                            data=self.item[key];
                                        }else{
                                            if(!data[key]){
                                                if(i==parts.length-1){
                                                    data[key] = angular.copy(arrEmptyForProperties)
                                                    block=data[key];
                                                }else{
                                                    data[key]={}
                                                }
                                            }else{
                                                data=data[key];
                                            }

                                        }
                                    })
                                    //block=data;
                                }else{
                                    self.item[nameBlock]=angular.copy(arrEmptyForProperties)
                                    block=self.item[nameBlock];
                                }
                            }
                        }

                        return SetCSS.setStyles(block,short)
                    })
                    .then(function(){
                        data=null
                        //console.log(parts)
                        if(parts.length>1){
                            parts.forEach(function (key) {
                                //console.log(key)
                                if(!data){
                                    data=self.item[key];
                                }else{
                                    data=data[key];
                                }
                                //console.log(data)
                            })
                        }else{
                            data=self.item[nameBlock]
                        }
                        //console.log(data)
                        saveFieldTemplate(nameBlock,data)
                    })

            }
            function loadPhoto(block,type,field){
                self.uploadUrl="/api/collections/"+type+"/fileUpload";
                self.uploadVideoUrl="/api/collections/"+type+"/uploadVideoFile"
                $q.when()
                    .then(function () {
                        if(field=='video'){
                            return $fileUpload.fileUpload(self.uploadVideoUrl,field,'backgroundCover')
                        }else{
                            return $fileUpload.fileUpload(self.uploadUrl,field,'backgroundCover')
                        }

                    })
                    .then(function (res) {
                        //console.log(res)
                        if(res && res.length){
                            var a=[];
                            if((field=='img' || field=='videoCover' || field=='video') && res[0].data && res[0].data.img){
                                if(block[field]){
                                    a.push(block[field])
                                }
                                block[field]=res[0].data.img
                                saveField(type)
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
                                saveField(type)
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
            function deleteFon(block,type,field){
                Confirm('удалить?').then(function () {
                    var a=[];
                    if(block[field]){
                        a.push(block[field])
                    }
                    block[field]=null
                    saveField(type)
                    if(a.length){
                        Photo.deleteFiles(type,a)
                    }
                })


            }
            function showPhoto(block,field){

                $q.when()
                    .then(function () {
                        return $fileUpload.showFile(block,field)

                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }



            
            // stats
            function addBlockForStats(value,arr){
                //console.log(value,arr)
                arr.unshift({name:value,is:true,index:1,templ:0})
                saveField('stats')
            }
            function filterStatsListH(item){
                if(!self.item.stats)return;
                if(self.item.stats[0].getOFA('name',item.key)){
                    return false
                }
                return true;
            }
            function filterStatsListL(item){
                if(!self.item.stats)return;
                if(self.item.stats[1].getOFA('name',item.key)){
                    return false
                }
                return true;
            }
            function filterStatsListR(item){
                if(!self.item.stats)return;
                if(self.item.stats[2].getOFA('name',item.key)){
                    return false
                }
                return true;
            }
            function filterStatsListF(item){
                if(!self.item.stats)return;
                if(self.item.stats[3].getOFA('name',item.key)){
                    return false
                }
                return true;
            }
            function dropCallbackStats(item){
                //console.log(item)
                setTimeout(function(){
                    /*self.item.stuffDetail.forEach(function(part,idx){
                     part.index=idx+1;
                     })*/
                    saveField('stats')
                },100)
                return item
            }
            //stuff
            function filterStuffList(item) {
                //console.log(item)
                if(!self.item || !self.item.stuffListType || !self.item.stuffListType[self.type]){return}
                for(var i=0,l=self.item.stuffListType[self.type].parts.length;i<l;i++){
                    if(self.item.stuffListType[self.type].parts[i].name==item.key){
                        return false
                    }
                }
                return true;

            }
            function addBlockForList(value,arr,field){
                console.log(value,arr,field)
                var o={name:value,index:1,templ:0}
                if(field.indexOf('stuffDetailType')>-1){o.position='left'}
                arr.push(o)
                console.log(field.split('.').length>-1)
                if(field.split('.').length>-1){
                    saveFieldTemplate(field,arr)
                }else{
                    saveField(field)
                }

            }
            function filterSDListH(item){

                if(!self.item.stuffDetailType || !self.item.stuffDetailType[self.type].parts)return;
                if(self.item.stuffDetailType[self.type].parts.getOFA('name',item.key)){
                    return false
                }
                return true;
            }

            /*function filterSDListL(item){
                if(!self.item.stuffDetailType || !self.item.stuffDetailType[self.type])return;
                if(self.item.stuffDetailType[self.type][1].getOFA('name',item.key)){
                    return false
                }
                return true;
            }
            function filterSDListR(item){
                if(!self.item.stuffDetailType || !self.item.stuffDetailType[self.type])return;
                if(self.item.stuffDetailType[self.type][2].getOFA('name',item.key)){
                    return false
                }
                return true;
            }
            function filterSDListF(item){
                if(!self.item.stuffDetailType || !self.item.stuffDetailType[self.type])return;
                if(self.item.stuffDetailType[self.type][3].getOFA('name',item.key)){
                    return false
                }
                return true;
            }*/
            function dropCallbackSD(item){
                //console.log(item)
                setTimeout(function(){
                    /*self.item.stuffDetail.forEach(function(part,idx){
                     part.index=idx+1;
                     })*/
                    saveField('stuffDetail')
                },100)
                return item
            }
            //header
            function addBlockForListHeader(value,arr,field) {
                arr.unshift({name:value,position:'left',templ:null,style:null})
                saveField(field)
            }
            function filterListHeader1(item) {
                if(!self.item.menu1)return;
                if(self.item.menu1.parts.getOFA('name',item.key)){
                    return false
                }
                return true;
            }
            function filterListHeader2(item) {
                if(!self.item.menu2)return;
                if(self.item.menu2.parts.getOFA('name',item.key)){
                    return false
                }
                return true;
            }
            function showPhoneField(parts) {
                if(parts && parts.length){
                    return parts.some(function(el){return el.name=='phone'})
                }

            }

            //****************** menu *********************
            function changeMenuSetting(to) {
                if(to=='menuDesctop'){
                    if(self.item[self.sourseMenu]){
                        //console.log(self.sourseMenu,to)
                        self.item.clickMenu=self.item[self.sourseMenu].clickMenu;
                        self.item.margin=self.item[self.sourseMenu].margin;
                        self.item.humburger=self.item[self.sourseMenu].humburger;
                        self.item.inverseColor=self.item[self.sourseMenu].inverseColor;
                        self.item.menu1=self.item[self.sourseMenu].menu1;
                        self.item.menu2=self.item[self.sourseMenu].menu2;
                        saveFields('clickMenu margin humburger inverseColor menu1 menu2')
                    }
                }else{
                    if(self.sourseMenu=='menuDesctop'){
                        //console.log(self.sourseMenu,to)
                        self.item[to].clickMenu=self.item.clickMenu;
                        self.item[to].margin=self.item.margin;
                        self.item[to].humburger=self.item.humburger;
                        self.item[to].inverseColor=self.item.inverseColor;
                        self.item[to].menu1=self.item.menu1;
                        self.item[to].menu2=self.item.menu2;
                        saveField(to)
                    }else if(self.item[self.sourseMenu]){
                        //console.log(self.sourseMenu,to)
                        self.item[to].clickMenu=self.item[self.sourseMenu].clickMenu;
                        self.item[to].margin=self.item[self.sourseMenu].margin;
                        self.item[to].humburger=self.item[self.sourseMenu].humburger;
                        self.item[to].inverseColor=self.item[self.sourseMenu].inverseColor;
                        self.item[to].menu1=self.item[self.sourseMenu].menu1;
                        self.item[to].menu2=self.item[self.sourseMenu].menu2;
                        saveField(to)
                    }

                }
                self.sourseMenu=null;

            }
            function hasIcons(key){
                if(!self.iconSearch){
                    return true;
                }else{
                    if(typeof key == 'string' && key.indexOf( self.iconSearch) >-1){
                        return true
                    }
                    return false;
                }
            }

            function downloadPartOfTemplate(field) {
                //console.log(self.item.index.fontFaces)
                $q.when()
                    .then(function () {
                        return $http.get(storeHost+'/api/getTemplates')
                    })
                    .then(function (res) {
                        return Store.selectPartOfTemplate(res.data)
                    })
                    .then(function (store) {
                        var ps = field.split('.')
                        var num =ps.length;
                        var val;
                        var tempVal={};
                        //console.log(store.template)
                        for(var i=0;i<ps.length;i++){
                            //console.log(ps[i])
                            if(!i){
                                val=store.template[ps[0]]
                                tempVal[ps[i]]=self.item[ps[i]]
                                tempVal=tempVal[ps[i]];
                            }else{
                                val=val[ps[i]]
                                if(tempVal[ps[i]]){
                                    tempVal=tempVal[ps[i]]
                                }else{
                                    if(val.length){
                                        tempVal[ps[i]]=[]
                                    }else{
                                        tempVal[ps[i]]={}
                                    }
                                    tempVal=tempVal[ps[i]]
                                }
                            }
                        }

                       /* console.log(val)
                        console.log(tempVal)
                        console.log(ps[num-1])*/
                       var font;
                        if(val){
                            if(val.length){
                                if(val[11]){font=val[11]}
                                tempVal.length=0
                                val.forEach(function (item,i) {
                                    tempVal[i]=item
                                })
                            }else{
                                for(var key in tempVal){
                                    delete tempVal[key]
                                }
                                for(var key in val){
                                    if(key=='blockStyle' && val[key][11]){font=val[key][11]}
                                    tempVal[key]=val[key]
                                }
                            }
                        }else{
                            if(tempVal){
                                if(tempVal.length){
                                    tempVal.length=0;
                                }else{
                                    for(var key in tempVal){
                                        delete tempVal[key]
                                    }
                                }
                            }
                        }

                        saveFieldTemplate(field,val);
                        if(font){
                            if(!self.item.index.fontFaces){
                                self.item.index.fontFaces=[]
                            }
                            if(self.item.index.fontFaces.indexOf(font)<0){
                                self.item.index.fontFaces.push(font)
                                saveFieldTemplate('index.fontFaces',self.item.index.fontFaces);
                            }
                        }

                    })
                    .catch(function (err) {
                        if(err){
                            exception.catcher('выбор шаблона')(err)
                        }
                    })
            }
            function getBlockConfig(page,name,block,field,value) {
                //console.log(block)
                var query={page:page,block:name}
                $q.when()
                    .then(function () {
                        return BlocksConfig.getList(null,query)
                    })
                    .then(function (blocks) {
                        return BlocksConfig.selectItemFromList(blocks,'выберите подходищий блок')
                    })
                    .then(function (b) {
                        //console.log(block)
                        if(!b.style){
                            block.style=0
                        }else{
                            block.style=b.style;
                        }
                        if(!b.templ){
                            block.templ=0
                        }else{
                            block.templ=b.templ;
                        }
                        block.elements=b.elements;
                        block.blockStyle=b.blockStyle;
                    })
                    .then(function () {
                        saveFieldTemplate(field,value)
                    })
            }
        }
    })
    .directive('templateConfig', function(){
        return {
            scope: {},
            restrict:'E',
            bindToController: true,
            controller: templateConfigCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/storeSetting/templateConfig.html'
        };
        templateConfigCtrl.$inject=['Config','$q','global','exception','toaster'];
        function templateConfigCtrl(Config,$q,global,exception,toaster){
            var self=this;
            self.updateField=updateField;
            activate();
            function activate(){
                $q.when()
                    .then(function(){
                        return Config.query().$promise
                    })
                    .then(function(res){
                        self.item=res[1]
                        console.log(self.item)
                        if(!self.item.template){
                            self.item.template={
                                header:{
                                    logo:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    info:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    cart:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    name:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    enter:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    news:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    currency:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    new:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    search:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    lookbook:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    sale:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    catalog:{
                                        '1':{
                                            name:'Hover',
                                            img:'',
                                            desc:'по наведению'
                                        },
                                        '2':{
                                            name:'Click',
                                            img:'',
                                            desc:'по клику mouse'
                                        }
                                    }
                                },
                                homePage:{
                                    banner:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    video:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    mission:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    slider:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    brnads:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    brandTags:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    news:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    group:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    text:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    campaign:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    categories:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    stuffs:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                },
                                stuffs:{
                                    call:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    list:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    filters:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    categories:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    subscription:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    
                                },
                                stuffDetail:{
                                    gallery:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    comments:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    desc:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    sort:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    lastViewed:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },
                                    addInfo:{
                                        '1':{
                                            name:'Стандарт',
                                            img:'',
                                            desc:''
                                        }
                                    },

                                },
                                news:{},
                                newsDetail:{},
                                stat:{},
                                lookbook:{},
                                cart:{},
                                footer:{}
                            }
                        }
                    })
                    .catch(function(err){
                        err=err.data||err;
                        exception.catcher('получение данных')(err)
                    })
            }
            function updateField(field){
                var item=angular.copy(self.item)
                delete item._id;
                delete item.__v
                var keys=Object.keys(item).join(' ')
                /*console.log(keys)
                 return;*/
                Config.save({update:field},self.item,function(res){
                    toaster.pop('success', "сохранение", "перезаписано");
                })

            }
        }
    })

    .directive('templateItem', function(){

        return {
            scope: {},
            restrict:'E',
            bindToController: true,
            controller: templateListCtrl,

            controllerAs: '$ctrl',
            templateUrl: 'components/storeSetting/templateItem.html'
        };
        templateListCtrl.$inject=['$q','$stateParams','global','exception','Template']
        function templateListCtrl($q,$stateParams,global,exception,Template){
            var self = this;
            self.Items=Template;
            self.saveField=saveField;
            self.dropCallbackHP=dropCallbackHP;
            self.dropCallbackFooter=dropCallbackFooter;
            self.dropCallbackBlock=dropCallbackBlock;
            self.dropCallbackMenu1=dropCallbackMenu1;
            self.dropCallbackMenu2=dropCallbackMenu2;
            self.dropCallbackStuffDetail=dropCallbackStuffDetail;
            activate()
            function activate(){
                $q.when()
                    .then(function(){
                        return Template.getItem($stateParams.id)
                    })
                    .then(function(data) {
                        /*if(data.main && data.main.sort){
                         data.main.sort(function(a,b){return a.index-b.index});
                         }*/

                        self.item = data;
                        setFieldsTemplate(self.item)

                    })
                    .catch(function(err){
                        exception.catcher('получение данных')(err)
                    })
            }
            function saveField(field){
                var o ={_id:self.item._id}
                o[field]=angular.copy(self.item[field]);
                Template.save({update:field},o)
            }
            /*function dropCallbackHP(item){
             //console.log(item)
             setTimeout(function(){
             self.item.index.forEach(function(part,idx){
             part.index=idx+1;
             })
             saveField('main')
             },100)
             return item
             }*/
            function dropCallbackFooter(item){
                //console.log(item)
                setTimeout(function(){
                    /*self.item.footer.forEach(function(part,idx){
                     part.index=idx+1;
                     })*/
                    saveField('footer')
                },100)
                return item
            }
            function dropCallbackBlock(item){
                setTimeout(function(){
                    self.item.stuffsListType[self.type].forEach(function(part,idx){
                        part.index=idx+1;
                    })
                    saveField('stuffsList')
                },100)
                return item
            }
            function dropCallbackMenu1(item){
                //console.log(item)
                setTimeout(function(){
                    self.item.menu1.parts.forEach(function(part,idx){
                        part.index=idx+1;
                    })
                    saveField('menu1')
                },100)
                return item
            }
            function dropCallbackMenu2(item){
                //console.log(item)
                setTimeout(function(){
                    self.item.menu2.parts.forEach(function(part,idx){
                        part.index=idx+1;
                    })
                    saveField('menu2')
                },100)
                return item
            }
            function dropCallbackStuffDetail(item){
                //console.log(item)
                setTimeout(function(){
                    /*self.item.stuffDetail.forEach(function(part,idx){
                     part.index=idx+1;
                     })*/
                    saveField('stuffDetail')
                },100)
                return item
            }

        }
    })




