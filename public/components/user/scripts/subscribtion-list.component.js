(function(){
'use strict';
angular.module('gmall.directives')
.directive("subscibtionList",itemDirective);
    function itemDirective(){
        return {
            scope: {
                modalClose:'&'
            },
            rescrict:"E",
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/user/subscribtionList.html',
        }
    }
    itemCtrl.$inject=['$q','global','$state','SubscibtionList','exception']
    function itemCtrl($q,global,$state,SubscibtionList,exception){
        var self = this;
        self.Items=SubscibtionList;
        self.mobile=global.get('mobile' ).val;
        self.$state=$state;
        self.moment=moment;
        self.query={};
        self.paginate={page:0,rows:1,totalItems:0}
        self.saveField = saveField;
        //*******************************************************
        activate();

        function activate() {
            return getItem().then(function() {
                console.log('Activated SubscibtionList View');
            });
        }
        function getItem() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    if(data &&  !data.length){
                        return createItem()
                    }else{
                        self.item = data[0];
                    }
                })
                .catch(function(err){
                    if(err.data){
                        exception.catcher('получение данных')(err.data)
                    }

                });
        }
        function saveField(){
            console.log(self.item.list)
            var o={_id:self.item._id};
            o.list=self.item.list;
            for(var key in o.list){
                o.list[key]=o.list[key].substring(0,20)
            }
            return self.Items.save({update:'list'},o ).$promise.then(function(){
                console.log('saved');
            },function(err){console.log(err)});
        }

        function createItem(){
            var o={};
            o.list={1:'Первая',2:'вторая',3:'третья',4:'четвертая',5:'пятая'}
            o.store=global.get('store').val._id
            return self.Items.save(o).$promise.then(function(res){
                console.log(res)
                getItem();
                console.log('saved');
            },function(err){console.log(err)});
        }
    }
})()