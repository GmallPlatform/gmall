(function(){
    'use strict';
    angular.module('gmall.services')
        .directive('witgetList',listDirective)

    function listDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/PROMO/witget/witgetList.html',
        }
    };
    listCtrl.$inject=['Witget','$state','global','exception','$q','$timeout','Confirm','$scope'];
    function listCtrl(Witget,$state,global,exception,$q,$timeout,Confirm,$scope){
        var self = this;
        self.Items = Witget;
        self.mobile=global.get('mobile').val;
        self.global=global;
        self.query={};
        self.paginate={page:0,rows:5,totalItems:0}
        self.newItem={name:'Здесь текст CTA',actived:false,delay:30,type:'subscription'}
        self.types=[{type:'call',name:'звонок'},{type:'subscription',name:'подписка'}
        ,{type:'subscriptionAdd',name:'бонусная подписка'},{type:'feedback',name:'сообщение на email'}]
        self.times=[{type:0,name:'при уходе со страницы'},{type:1,name:'при входе на страницу'},{type:15,name:'через 15 секунд'}
            ,{type:30,name:'через 30 секунд'},{type:60,name:'через минуту'}]
        self.getList=getList;
        self.saveField = saveField;
        self.createItem=createItem;
        self.deleteItem=deleteItem;
        //*******************************************************
        activate();
        $scope.$on('changeLang',function(){
            activate()
        })

        function activate() {
            return getList().then(function() {
                //console.log('Activated news list View');
            });
        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.items = data;
                    /*if(!data.length){
                        createItems();
                    }*/
                    return self.items;
                });
        }
        function saveField(item,field,defer){
            defer =defer||0
            setTimeout(function(){
                var o={_id:item._id};
                o[field]=item[field]
                return self.Items.save({update:field},o ).$promise.then(function(){
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)

                },function(err){console.log(err)});
            },defer)
        };
        /*function createItemss(){
            self.newItem.name='купон на первую покупку';
            self.newItem.code=true;
            self.newItem.index=9999;
            $q.when()
                .then(function(){
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem.name='купон для подписчиков';
                    self.newItem.code=false;
                    self.newItem.index=1;
                    return self.Items.save(self.newItem).$promise
                })
                .then(function(){
                    return getList();
                } )
                .catch(function(err){
                    exception.catcher('создание купона')(err)
                })
        }*/
        function deleteItem(item){
            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    return getList();
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('удаление')(err)
                    }
                })
        }
        function createItem(){
            $q.when()
                .then(function(){
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    if(res){
                        return getList();
                    }
                } )
                .catch(function(err){
                    exception.catcher('создание witget(всплывающего окна с CTA - призыв к действию.)')(err)
                })
        }
    }
})()
