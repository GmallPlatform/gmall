'use strict';
(function(){

    angular.module('gmall.services')
        .directive('papsList',listDirective);
    function listDirective(){
        return {
            scope: {},
            restrict:'E',
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/paps/papsList.html',
        }
    };
    listCtrl.$inject=['Paps','$state','global','exception','Confirm','$q'];
    function listCtrl(Paps,$state,global,exception,Confirm,$q){
        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$state;
        self.Items=Paps;
        self.query={};
        self.paginate={page:0,rows:10,totalItems:0}
        self.getList=getList;
        self.saveField = saveField;
        self.deleteItem=deleteItem;

        //*******************************************************
        activate();

        function activate() {
            return getList()
                .then(function() {
                    //console.log('Activated news list View');
                    var actions=[];
                    if(!self.items || !self.items.some(function(e){return e.action=='order'})){
                        actions.push(createItem('order'))
                    }
                    if(!self.items || !self.items.some(function(e){return e.action=='feedback'})){
                        actions.push(createItem('feedback'))
                    }
                    if(!self.items || !self.items.some(function(e){return e.action=='subscription'})){
                        actions.push(createItem('subscription'))
                    }
                    if(!self.items || !self.items.some(function(e){return e.action=='subscriptionAdd'})){
                        actions.push(createItem('subscriptionAdd'))
                    }

                    if(!self.items || !self.items.some(function(e){return e.action=='call'})){
                        actions.push(createItem('call'))
                    }
                    if(!self.items || !self.items.some(function(e){return e.action=='booking'})){
                        actions.push(createItem('booking'))
                    }
                    if(!self.items || !self.items.some(function(e){return e.action=='bonus'})){
                        actions.push(createItem('bonus'))
                    }
                    console.log(actions);
                    if (actions.length){
                        return $q.all(actions)
                    }
                       // return $q.all(actions)*/
                } )
                .then(function(res){
                    //console.log(res)
                    if(res){
                         return getList();
                    }
                })
                .catch(function(err){
                exception.catcher('получение списка')(err)
            })
        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.items = data;
                    return self.items;
                } )
                .catch(function(err){
                    exception.catcher('получение списка')(err)
                })
        }
        function saveField(item,field,defer){
            defer =defer||0
            setTimeout(function(){
                var o={_id:item._id};
                o[field]=item[field]
                return self.Items.save({update:field},o ).$promise.then(function(){
                },function(err){
                    exception.catcher('получение списка')(err)
                });
            },defer)
        };
        function createItem(name){
             return self.Items.save({name:name,action:name,url:name} ).$promise;
        }
        function deleteItem(item){
            Confirm("удалить?" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    return getList();
                })
                .catch(function(err){
                    err = (err && err.data)||err
                    if(err){
                        exception.catcher('удаление страницы')(err)
                    }

                })
        }
    }
})()