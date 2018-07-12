'use strict';
(function(){
angular.module('gmall.directives')
.directive("commentList",itemDirective);
    function itemDirective(){
        return {
            rescrict:"E",
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/comment/commentsList.html',
        }
    }
    itemCtrl.$inject=['$q','global','$state','Comment','exception','SubscibtionList','Confirm','$uibModal','$http','socket','$timeout']
    function itemCtrl($q,global,$state,Comment,exception,SubscibtionList,Confirm,$uibModal,$http,socket,$timeout){
        var self = this;
        self.Items=Comment;

        self.$state=$state;
        self.moment=moment;
        self.query={};
        self.paginate={page:0,rows:100,totalItems:0}
        self.store=global.get('store').val._id;
        self.getList=getList;
        self.deleteItem=deleteItem;
        self.saveField = saveField;
        //*******************************************************
        activate();

        function activate() {
            self.participant=(global.get('seller').val)?'seller':'user';
            //console.log(self.participant)
            if (self.participant=='seller'){
                socket.on('newNotification',function(data){
                    console.log('newNotification',data)
                    if(data && data.type=='comment'){
                        getList(0);
                    }
                })
            }

            return getList().then(function() {
                console.log('Activated list View');
            })
        }
        function getList(page) {
            if(page!=='undefined'){self.paginate,page=page}
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    data.forEach(function (el) {
                        if(el.stuff && el.stuff.gallery && el.stuff.gallery.sort){
                            el.stuff.gallery.sort(function (a,b) {
                                return a.index-b.index
                            })
                        }
                    })
                    self.items = data;
                    return self.items;
                });
        }

        function saveField(item,field){
            var o={_id:item._id};
            o[field]=item[field]
            return self.Items.save({update:field},o ).$promise.then(function(){
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
                console.log('saved');
            },function(err){console.log(err)});
        }
        function deleteItem(item) {
            Confirm('Удалить??')
                .then(function(){
                    return Comment.delete({_id:item._id}).$promise
                })
                .then(function(){
                    getList()
                })
                .catch(function(err){
                    err=err.data||err;
                    exception.catcher('Удаление')(err)
                })
            console.log(item);return;

        }

        socket.on('newComment',function(data){
            console.log(data)
            self.paginate.page=0;
            activate();
        })
    }
})()

