'use strict';
(function(){

    angular.module('gmall.services')
        .directive('customListsList',customListsListDirective)

    function customListsListDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: customListsListCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/SETTING/customLists/customLists.html',
        }
    };
    customListsListCtrl.$inject=['CustomLists','$state','global','Confirm','$q','exception','Photo','$timeout'];
    function customListsListCtrl(CustomLists,$state,global,Confirm,$q,exception,Photo,$timeout){
        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$state;
        self.Items=CustomLists;
        self.query={};
        self.paginate={page:0,rows:20,totalItems:0}
        self.newItem={name:'название списка'}
        self.getList=getList;
        self.saveField = saveField;
        self.searchItem=searchItem;
        self.deleteItem=deleteItem;
        self.createItem=createItem;
        self.dropCallback=dropCallback;
        //*******************************************************
        activate();

        function activate() {
            return getList().then(function() {
                //console.log('Activated news list View');
            });
        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.items = data;
                    return self.items;
                });
        }
        function searchItem(searchStr){
            if(searchStr){
                self.query = {name:searchStr.substring(0,10)};
            }else{
                self.query = {};
            }

            self.paginate.page=0;
            return getList().then(function() {
                console.log('Activated list View');
            });
        }
        function saveField(item,field){
            var o={_id:item._id};
            o[field]=item[field]
            return self.Items.save({update:field},o ).$promise.then(function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            });
        };
        function createItem(){
            self.Items.create()
                .then(function(res){
                    self.newItem={}
                    self.newItem.name=res;
                    self.newItem.store=global.get('store').val._id
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem._id=res.id;
                    self.newItem.url=res.url;
                    self.paginate.page=0;
                    getList(self.paginate);
                })
                .then(function(){
                    var id=self.newItem._id;
                    delete self.newItem._id
                    setTimeout(function(){
                        $state.go('frame.customLists.item',{id:id})
                    },100)

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('создание списка')(err)
                    }
                })
        }
        function deleteItem(item){
            var folder='images/'+global.get('store').val.subDomain+'/CustomLists/'+item.url
            // console.log(folder)


            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    return self.getList();
                })
                .then(function(){
                    Photo.deleteFolder('CustomLists',folder)
                })
                .catch(function(err){
                    if(!err){return}
                    err = (err &&err.data)||err
                    if(err){
                        exception.catcher('удаление объекта')(err)
                    }
                })
        }
        function dropCallback(item){
            var i=0;
            //http://stackoverflow.com/questions/28983424/make-angular-foreach-wait-for-promise-after-going-to-next-object
            setTimeout(function(){
                self.items.reduce(function(p, item) {
                    return p.then(function() {
                        i++;
                        item.index=i;
                        return saveField(item,'index')
                    });
                }, $q.when(true)).then(function(){
                    console.log(self.items.map(function(el){return el.index}))
                });
            },50)
            return item;
        }
    }
})()
