'use strict';
(function(){
    angular.module('gmall.services')
        .directive('itemsList',itemsList)
        .directive('itemsDetail',itemsDetail)

    function itemsList(){
        return {
            template:"<div ui-view></div><div></div>",
            bindToController: true,
            scope: {},
            controllerAs: '$ctrl',
            controller: listCtrl
        }
    }
    function itemsDetail(){
        return {
            template:"<div></div>",
            bindToController: true,
            scope: {},
            controllerAs: '$ctrl',
            controller: detailCtrl
        }
    }


    function listCtrl($scope,$http,$element,global,$state,$q,$anchorScroll,$timeout,$window,$compile,$rootScope,seoContent,$sce,$location){
        //console.log(!!global.get('tempContent').val)
        //console.log('??????')

        var self=this;
        self.global=global;
        self.$state=$state;
        self.$stateParams=$rootScope.$stateParams;
        self.setLabel=setLabel;

        function setLabel(label) {

            //console.log(label,labelsFromQuery)
            if(labelsFromQuery && labelsFromQuery.length){

                var i = labelsFromQuery.indexOf(label)
                labelsFromQuery=[];
                if(i==-1){
                    labelsFromQuery.push(label)
                }
                /*if(i>-1){
                    labelsFromQuery.splice(i,1)
                }else{
                    labelsFromQuery.push(label)
                }*/
                //console.log(labelsFromQuery)
                if(labelsFromQuery.length){
                    var str = labelsFromQuery.reduce(function (s,el) {
                       if(s){
                           s+='__'
                       }
                       return s+=el
                    },'')
                    $location.search('labels',str)
                }else{
                    $location.search('labels',null)
                }
            }else{
                $location.search('labels',label)
            }
        }

        //console.log(self.$stateParams);

        var labels='',labelsFromQuery,query;
        if(self.$stateParams && self.$stateParams.labels && global.get('labels').val){
            labelsFromQuery=self.$stateParams.labels.split('__');
            if(global.get('labels').val && global.get('labels').val.length && labelsFromQuery && labelsFromQuery.length){
                /* формируем запрос для получения позиций привязанных к меткам*/
                labelsFromQuery.forEach(function (name) {
                    var ll = global.get('labels').val.getOFA('name',name)
                    if(ll){
                        if(labels){
                            labels+='__'
                        }
                        labels+=ll.name;
                    }
                })
            }
            //console.log(labels)
            if(labels && labels.length){
                query='labels='+labels
            }
            console.log(query)
        }
        var waiting,lastElement,page=0,waitingDiv;
        var td1,td2,td3;
        var model=getModel($state);
        //console.log(model,global.get('store').val);

        var url = 'views/template/partials/'+model+'.html';
        var color = (global.get('store').val.template.dimScreenColor)?global.get('store').val.template.dimScreenColor:"#000000"
        var BGcolor = (global.get('store').val.template.dimScreenBGColor)?global.get('store').val.template.dimScreenBGColor:"#F5F5F5"
        var innerWaitingDiv=[
            '<div style="width:100%;height:200px;background-color:'+BGcolor+';color:'+color+'" class="clearfix text-center">',
            '<img src="/img/spinner.gif" style="margin-top: 70px">',
            '</div>'
        ].join('')
        self.hideList= global.get('store').val.template[model+'List'].hideList;
        self.hideCart= (global.get('store').val.template[model+'List'].hideCart)?global.get('store').val.template[model+'List'].hideCart:false;
        //console.log(self.hideCart)
        //console.log((self.$state.current.name!='news'&&self.$state.current.name!='stat'||self.$state.current.name!='additional'||self.$state.current.name!='campaign'||self.$state.current.name!='master'||self.$state.current.name!='info'||self.$state.current.name!='lookbook'))
        $q.when()
            .then(function(){

                if(global.get('tempContent').val){
                    if($state.current.name.indexOf('.item')<0 && $state.current.name.indexOf('.detail')<0){
                        var html = global.get('tempContent').val;
                        $('#tempContent').empty()
                        global.set('tempContent',null)
                        var o ={data:{html:html}}
                        if(tempTitles){
                            o.data.titles=tempTitles
                        }
                        return o;
                    }else{
                        return null
                    }
                }else{
                    /*if(global.get('cache').val[model+'list']) {
                        return {data:{html:global.get('cache').val[model + 'list']}};
                    }else {
                        return $http.get(url.trim())
                    }*/
                    return $http.get(url.trim()+((query)?'?'+query:''))

                }
            })
            .then(function (response) {
                if(!response){return;}
                var linkFn = $compile(response.data.html);
                var content = linkFn($scope);
                $element.append(content);
                /*if(!global.get('cache').val[model+'list']) {
                    global.get('cache').val[model + 'list']=response.data.html;
                }*/
               // $element.append(response.data.html)
                //console.log(response.data)
                if(response.data.titles && response.data.titles.title){
                    for(var k in response.data.titles){
                        if(response.data.titles[k]){
                            if(k=='title'){
                                global.get('titles').val[k]=response.data.titles[k];

                                /*if(response.data.titles[k].indexOf(global.get('titles').val[k])<0){
                                    global.get('titles').val[k]=response.data.titles[k]+'. '+global.get('titles').val[k];
                                }else{
                                    global.get('titles').val[k]=response.data.titles[k];
                                }*/
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
                }else{
                    var key = model+'List'
                    var name= (global.get('store').val.nameLists && global.get('store').val.nameLists[key])?global.get('store').val.nameLists[key]:'list'
                    seoContent.setDataList(model,name)
                }

                waitingDiv=$('#paginateData'+page);
                self.totalQty=waitingDiv.data('total');
                self.currentQty=waitingDiv.data('qty');
                self.page=waitingDiv.data('page');
                self.lastItemId=waitingDiv.data('lastItemId');
                td1=$('#td-list-1-items');
                td2=$('#td-list-2-items');
                td3=$('#td-list-3-items');
                //console.log(self.totalQty,self.currentQty,page,self.lastItemId)

                $timeout(function(){
                    $anchorScroll()
                    lastElement=(self.lastItemId!=null)?$('#item-'+self.lastItemId):null;
                    /*self.td1HideCart=(td1.find('.list-item').length>1)?true:false;
                    self.td2HideCart=(td2.find('.list-item').length>1)?true:false;
                    self.td3HideCart=(td3.find('.list-item').length>1)?true:false;*/
                })
               /* $timeout(function(){
                    lastElement=(self.lastItemId!=null)?$('#item-'+self.lastItemId):null;
                },100)*/
                var addBlockAfterScroll = function (){
                    //console.log('!!!!!!!!!!!!!!')
                    if(!waiting && lastElement && $(lastElement).isOnScreen() && self.currentQty<self.totalQty){
                        waiting=true;
                        page++
                        $q.when()
                            .then(function(){
                                waitingDiv.html(innerWaitingDiv);
                                //console.log(url)
                                return $http.get(url.trim()+'?page='+page+((query)?'&'+query:''))
                            })
                            .then(function(response){
                                //console.log('response',response)
                                if(!response){return;}
                                lastElement=null;
                                waitingDiv.html('');
                                var addHtml=angular.element(response.data.html)
                                var atd1=addHtml.find('#td-list-1-items').html()
                                var atd2=addHtml.find('#td-list-2-items').html()
                                var atd3=addHtml.find('#td-list-3-items').html()
                                //console.log(atd1,atd2,atd3)
                                self.lastItemId=addHtml.find('#paginateData'+page).data('lastItemId');
                                self.currentQty+=addHtml.find('#paginateData'+page).data('qty');
                                td1.append(atd1)
                                td2.append(atd2)
                                td3.append(atd3)
                                $timeout(function () {
                                    lastElement=(self.lastItemId!=null)?$('#item-'+self.lastItemId):null;
                                    waiting=false;
                                },200)
                            })
                    }
                }
                angular.element($window).on('scroll', addBlockAfterScroll);
                $scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', addBlockAfterScroll);
                });
                $timeout(function(){
                    $rootScope.$emit('$stateChangeEndToStuff');
                },100)
            })
     }

    function detailCtrl($scope,$element,$compile,$http,$stateParams,$state,$anchorScroll,global,$q,$rootScope,$location,$timeout,$sce){
        //console.log(!!global.get('tempContent').val)
        //console.log('!S')
        var self=this;
        self.global=global;
        $scope.global=global;
        var model=getModel($state)
        model= model[0].toUpperCase() + model.substr(1);
        $q.when()
            .then(function(){
                //console.log(global.get('tempContent').val)
                if(global.get('tempContent').val){
                    var html = global.get('tempContent').val;
                    $('#tempContent').empty()
                    global.set('tempContent',null)
                    var o ={data:{html:html}}
                    if(tempTitles){
                        o.data.titles=tempTitles
                    }
                    return o;
                    //return {data:{html:html}};
                }else{
                    return $http.get('views/template/partials/'+model+'/itemPage/'+$stateParams.id+'.html')
                }
            })
            .then(function (response) {
                //console.log(response)
                var linkFn = $compile(response.data.html);
                var content = linkFn($scope);
                //console.log($element)
                $element.append(content);
                //$element.append(response.data.html);
                $anchorScroll()
               /* console.log('response.data.titles',response.data.titles)
                console.log(JSON.stringify(global.get('titles').val.title))*/
                //var titles = {}
                if(response.data.titles && response.data.titles.title){
                    for(var k in response.data.titles){
                        //console.log(k)
                        if(response.data.titles[k]){
                            if(k=='title'){
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

                    //global.set('titles',titles)
                }

                //console.log(model)
                if(model!="Campaign"){
                    $rootScope.$emit('$stateChangeEndToStuff');
                }else{
                    $timeout(function () {
                        $rootScope.$emit('$stateChangeEndToStuff');
                    },800)
                }


            })


        //info

        $timeout(function(){
            self.$stateParams=$stateParams;
            if($stateParams.block && self.isOpen){
                self.isOpen[$stateParams.block]=true;
            }

        },500)

        self.openBlock=openBlock;
        function openBlock(url) {
           // console.log(url)
            $timeout(function(){
                if(self.isOpen[url]){
                    $location.search('block',url)
                }else{
                    $location.search('block',null)
                }
            },200)
        }


    }
    function getModel($state){
        //console.log($state)
        var model='news'
        if($state.current.name=='lookbook'||$state.current.name=='lookbook.item'){
            model='lookbook'
        }else if($state.current.name=='stat'||$state.current.name=='stat.item'){
            model='stat'
        }else if($state.current.name=='additional'||$state.current.name=='additional.item'){
            model='additional'
        }else if($state.current.name=='workplace'||$state.current.name=='workplace.item'){
            model='workplace'
        }else if($state.current.name=='news'||$state.current.name=='news.item'){
            model='news'
        }else if($state.current.name=='master'||$state.current.name=='master.item'){
            model='master'
        }else if($state.current.name=='info'||$state.current.name=='info.item'){
            model='info'
        }else if($state.current.name=='campaign'||$state.current.name=='campaign.detail'){
            model='campaign'
        }
        return model;
    }

})()



