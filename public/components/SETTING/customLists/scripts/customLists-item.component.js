'use strict';
(function(){

    angular.module('gmall.directives')
        .directive('customListsItem',customListsItemDirective)
    function customListsItemDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: customListsItemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/SETTING/customLists/customListsItem.html',
        }
    }
    customListsItemCtrl.$inject=['CustomLists','$stateParams','$q','$uibModal','global','exception','$scope','$timeout','Confirm','SetCSS'];
    function customListsItemCtrl(CustomLists,$stateParams,$q,$uibModal,global,exception,$scope,$timeout,Confirm,SetCSS){
        var self = this;
        self.Items=CustomLists;
        self.item={};
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.listOfBlocksForStuffList=angular.copy(listOfBlocksForStuffList);
        self.listOfBlocksForStuffList['button']='кнопка'
        //console.log(self.listOfBlocksForStuffList)
        self.animationTypes=animationTypes;
        self.saveField=saveField;

        self.setColor=setColor;
        self.movedItem=movedItem;
        self.getUrl=getUrl;




        //********************activate***************************
        activate();
        //*******************************************************
        function activate() {
            //console.log(id)
            return getItem($stateParams.id).then(function() {
            }).catch(function(err){
                err = err.data||err
                exception.catcher('получение объекта')(err)
            });
        }
        $scope.$on('changeLang',function(){
            activate();
        })
        function getItem(id) {
            return self.Items.getItem(id)
                //console.log(id)
                .then(function(data) {

                    var keysStuffs=Object.keys(self.listOfBlocksForStuffList);

                    if(!data.blocks){
                        data.blocks=[]
                    }
                    data.blocks.forEach(function (p) {
                        keysStuffs.splice(keysStuffs.indexOf(p.name),1)
                    })
                    keysStuffs.forEach(function (ks) {
                        var o= {name:ks,is:false}
                        data.blocks.push(o)
                    })
                    if(!data.stuffListCart){
                        data.stuffListCart={}
                    }
                    if(!data.button){
                        data.button={}
                    }
                    self.lang=global.get('store').val.lang
                    self.item=data;
                    return self.item;
                } ).catch(function(err){
                    console.log(err)
                    return $q.reject(err)
                });
        }
        function saveField(field,defer){
            console.log(field)
            defer =(defer)?defer:100;
            setTimeout(function(){
                var o={_id:self.item._id};
                var value =  self.item[field]
                o[field]=value;
                var query={update:field}
                self.Items.save(query,o,function () {
                    global.set('saving',true)
                    $timeout(function () {
                        global.set('saving',false);
                    },1500)
                });
            },defer)
        };

        function setColor(value,field){
            $q.when()
                .then(function(){
                    var data = (value)?value:self.item
                    return SetCSS.setStyles(data)
                })
                .then(function(){
                    if(value){
                        saveField(field)
                    }else{
                        if(self.item.blockStyle){
                            saveField('blockStyle')
                        }
                        if(self.item.elements){
                            saveField('elements')
                        }
                    }

                    //
                })

        }
        function movedItem(item) {
            $timeout(function(){
                saveField('blocks')
            },100)
            return item;
        }
        function getUrl() {
            if(self.item.link){
                var url = self.item.link.split('/').join('~')
                url=url.split('?').join('~~')
                url=url.split('&').join('~~~')
                url=url.split('=').join('~~~~')

                console.log(url,self.item.link)
                $q.when()
                    .then(function () {
                        return self.Items.getItem(url)
                    })
                    .then(function (res) {
                        if(res && res._id != self.item._id){
                            exception.catcher('такой URL')('уже есть в списке')
                        }else{
                            self.item.url=url
                            saveField('url')
                        }
                    })
                    .catch(function(err){
                        console.log(err)
                        err = err.data||err
                        if(err && err =='Not Found'){
                            self.item.url=url
                            saveField('url')
                        }else{

                            exception.catcher('получение данных')(err)
                        }

                    });
            }
        }
    }
})()
