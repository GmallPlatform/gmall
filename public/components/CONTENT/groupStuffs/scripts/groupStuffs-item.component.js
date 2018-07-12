'use strict';
(function(){

    angular.module('gmall.directives')
        .directive('groupStuffsItem',groupStuffsItemDirective)
    function groupStuffsItemDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: groupStuffsItemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/groupStuffs/groupStuffsItem.html',
        }
    }
    groupStuffsItemCtrl.$inject=['GroupStuffs','$stateParams','$q','$uibModal','global','exception','Stuff','Photo','$scope','$timeout','Confirm','Category'];
    function groupStuffsItemCtrl(GroupStuffs,$stateParams,$q,$uibModal,global,exception,Stuff,Photo,$scope,$timeout,Confirm,Category){
        var self = this;
        self.Items=GroupStuffs;
        self.type='GroupStuffs'
        self.item={};
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.moment=moment;
        self.saveField=saveField;


        self.addItemInBlock=addItemInBlock;
        self.movedItem=movedItem;
        self.deleteItemFromBlock=deleteItemFromBlock;
        self.changeItem=changeItem;
        self.changeCategory=changeCategory;
        self.deleteCategory=deleteCategory;


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
            //console.log(id)
            return self.Items.getItem(id)
                //console.log(id)
                .then(function(data) {
                    if(data.category && global.get('categoriesO').val[data.category]){
                        data.category=global.get('categoriesO').val[data.category];
                    }
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
                if(field=='stuffs'){
                    var value = self.item['stuffs'].map(function (s) {
                        return s._id
                    })
                }else if(field=='category'){
                    if(self.item.category &&self.item.category._id){
                        var value =self.item.category._id;
                    }else{
                        var value =  null
                    }
                }else{
                    var value =  self.item[field]
                }
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


        function addItemInBlock(index) {
            var model=Stuff
            $q.when()
                .then(function () {
                    return model.select()
                })
                .then(function (item) {
                    item.img=(item.gallery[0] && item.gallery[0].thumb)?item.gallery[0].thumb:null;
                    if(!self.item.stuffs){
                        self.item.stuffs=[];
                    }
                    if(typeof index=='undefined'){
                        self.item.stuffs.push(item)
                    }else{
                        self.item.stuffs[index]=item
                    }

                    saveField('stuffs')

                })
        }
        function movedItem(item) {
            $timeout(function(){
                saveField('stuffs')
            },100)
            return item;
        }
        function deleteItemFromBlock($index) {
            Confirm('удалить?').then(function () {
                self.item.stuffs.splice($index,1);
                saveField('stuffs')
            })
        }
        function changeItem($index) {
            addItemInBlock($index)
        }

        function changeCategory() {
            $q.when()
                .then(function(){
                    var categoryId=(self.item.category && self.item.category._id)?self.item.category._id:null
                    return Category.select(categoryId,null,null,'groupStuffs');
                })
                .then(function(selectedCategory){
                    self.item.category=selectedCategory;
                    saveField('category')
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('выбор категории')(err)
                    }
                })
        }
        function deleteCategory() {
            self.item.category=null;
            saveField('category')
        }
    }
})()
