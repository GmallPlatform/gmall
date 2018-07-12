'use strict';
(function(){
    angular.module('gmall.services')
        .directive('staticPages',staticPagesDirective);
    function staticPagesDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: staticPagesCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/staticPage/staticPages.html',
        }
    };
    staticPagesCtrl.$inject=['Stat','$state','global','Confirm','exception','$q','Photo','$timeout'];
    function staticPagesCtrl(Items,$state,global,Confirm,exception,$q,Photo,$timeout){
        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$state;
        self.Items=Items;
        self.query={};
        self.paginate={page:0,rows:25,totalItems:0}
        self.newItem={name:'Новая статическая страница',actived:false}
        self.getList=getList;
        self.saveField = saveField;
        self.searchItems=searchItems;
        self.createItem=createItem;
        self.deleteItem=deleteItem;
        self.movedItem = movedItem;

        //*******************************************************
        activate();


        function activate(page) {
            if(page || page===0){
                self.paginate.page=0;
            }
            return getList().then(function() {
                console.log('Activated staticPage list View');
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
                    self.newItem={name:'Новая статическая страница',actived:false}
                    self.newItem.name=res;
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem._id=res.id;
                    self.newItem.url=res.url;
                    self.paginate.page=0;
                    return getList(self.paginate);
                })
                .then(function(){
                    $state.go('frame.stats.stat',{id:self.newItem._id})
                })
                .catch(function(err){
                    exception.catcher('создание компании')(err)
                })
        }
        function deleteItem(item){
            var folder='images/'+global.get('store').val.subDomain+'/Stat/'+item.url
            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){

                    activate(0);
                    return Photo.deleteFolder('Stat',folder)
                })
                .catch(function(err){
                    exception.catcher('удаление компании')(err)
                })
        }
        function movedItem(){
            var actions = self.items.map(function(e,i){
                e.index=i;
                return self.saveField(e,'index')
            })
            $q.all(actions);
        }
    }
})()
