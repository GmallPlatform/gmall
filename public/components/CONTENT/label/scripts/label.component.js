'use strict';
(function(){
    angular.module('gmall.services')
        .directive('labels',labelDirective);
    function labelDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: pagesCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/label/labels.html',
        }
    };
    pagesCtrl.$inject=['Label','$state','global','Confirm','exception','$q','$timeout'];
    function pagesCtrl(Items,$state,global,Confirm,exception,$q,$timeout){
        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$state;
        self.Items=Items;
        self.query={};
        self.paginate={page:0,rows:50,totalItems:0}
        self.newItem={name:'Новая  метка',actived:false}
        self.lists=listOfListName.map(function (n) {
            var o={name:n,type:n}
            if(global.get('store').val.nameLists[n+'List']){
                o.name=global.get('store').val.nameLists[n+'List']
            }
            return o;
        });
        self.getList=getList;
        self.saveField = saveField;
        self.searchItems=searchItems;
        self.createItem=createItem;
        self.deleteItem=deleteItem;


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
        function searchItems(searchStr){
            if(searchStr){
                self.query = {name:searchStr.substring(0,10)};
            }else{
                self.query = {};
            }
            self.paginate.page=0;
            activate();
        }
        function saveField(item,field,defer){
            defer =defer||0
            setTimeout(function(){
                var o={_id:item._id};
                o[field]=item[field]
                return self.Items.save({update:field},o ).$promise.then(function(){
                    console.log('saved')
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)

                },function(err){console.log(err)});
            },defer)
        };
        function createItem(){
            self.Items.create()
                .then(function(res){
                    self.newItem={name:'Новая  страница',actived:false}
                    self.newItem.name=res;
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem._id=res.id;
                    self.newItem.url=res.url;
                    self.paginate.page=0;
                    return getList(self.paginate);
                })
                .catch(function(err){
                    exception.catcher('создание страницы')(err)
                })
        }
        function deleteItem(item){
            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){

                    activate(0);
                })
                .catch(function(err){
                    exception.catcher('удаление страницы')(err)
                })
        }
    }
})()
