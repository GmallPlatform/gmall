'use strict';
(function(){

    angular.module('gmall.services')
        .service('News', newsService);
    newsService.$inject=['$resource','$uibModal','$q','global'];
    function newsService($resource,$uibModal,$q,global){
        var Items= $resource('/api/collections/News/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            create:create,
            viewEmail:viewEmail,
            select:selectItem,
            search:search
        }
        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            /*if(global.get('crawler').val){
                query={$and:[{store:global.get('store').val._id},{actived:true}]}
            }*/
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }

            return Items.query(data).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function search(search,setData){
            // setData - если ищем товар в админке для дальнейшего использования необходимо получить с сервера все данные
            var data ={search:search,setData:setData};
            return Items.query(data).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                //response.shift()

                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(name){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/news/createNews.html',
                    controller: function($uibModalInstance,name){
                        var self=this;
                        self.name=name;
                        self.ok=function(){
                            $uibModalInstance.close(self.name);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    controllerAs:'$ctrl',
                    resolve:{
                        name:function () {
                            return name
                        }
                    }
                });
                modalInstance.result.then(function (name) {
                    if(name){
                        resolve(name.substring(0,100))
                    }else{
                        reject('empty')
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
        function viewEmail(item,content){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/news/viewEmail.html',
                    controller: function($q,$uibModalInstance,SubscibtionList,item,content){
                        var self=this;
                        self.item=item;
                        self.except=false;
                        self.list
                        self.content=content;
                        self.ok=function(){
                            $uibModalInstance.close({lists:self.lists,except:self.except});
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                        activate()
                        function activate(){
                            $q.when()
                                .then(function() {
                                    return SubscibtionList.getList( {page: 0, rows: 1, items: 0}, {} )
                                })
                                .then(function(data){

                                    if(data && data[0]){
                                        if(!data[0].list){data[0].list=[]}
                                        for(var key in data[0].list){
                                            if(!data[0].list[key]){
                                                delete data[0].list[key]
                                            }
                                        }
                                        self.subscibtionList = data[0];
                                    }else{
                                        self.subscibtionList={list:[]}
                                    }
                                    //console.log(self.subscibtionList)
                                })
                        }
                    },
                    size:'lg',
                    controllerAs:'$ctrl',
                    resolve:{
                        item:function(){
                            return item;

                        },
                        content:function(){
                            return content;

                        }
                    }
                });
                modalInstance.result.then(function (item) {
                   resolve(item)
                }, function (err) {
                    reject(err)
                });
            })

        }
        function selectItem(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/news/selectNews.html',
                    controller: function(News,$uibModalInstance,$q){
                        var self=this;
                        self.stuffs=[];
                        self.name='';
                        var query;
                        var paginate={page:0,rows:30,items:0}
                        self.search = function(name){
                            if (name.length<3){return}
                            query={name:name}



                            News.search(name,true)
                                .then(function(res){
                                    self.items=res;
                                    //console.log(self.items)
                                })


                            /*News.getList(paginate,query).then(function(res){
                                self.items=res;
                            })*/
                        }
                        self.selectItem=function(item){
                            $uibModalInstance.close(item);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    controllerAs:'$ctrl',
                    size: 'lg',
                });

                modalInstance.result.then(function (stuff) {
                    resolve(stuff)
                },function(){
                    reject()
                });
            })

        }
    }
})()
