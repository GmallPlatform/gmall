'use strict';
angular.module('gmall.services')
.service('Store', function($resource,$q,$uibModal,$http){
    var Items= $resource('/api/collections/Store/:_id',{_id:'@_id'});
    return {
        getList:getList,
        getItem:getItem,
        query:Items.query,
        get:Items.get,
        save:Items.save,
        delete:Items.delete,
        upload:upload,
        create:create,
        selectPartOfTemplate:selectPartOfTemplate,
        selectItemFromList:selectItemFromList,
    }
    function getList(paginate,query){
        var data ={perPage:paginate.rows ,page:paginate.page,query:query};
        return Items.query(data).$promise
            .then(getListComplete)
        function getListComplete(response) {
            if(paginate.page==0){
                if(response && response.length){
                    paginate.items=response.shift().index;
                    //console.log(paginate)
                }else{
                    paginate.items=0;
                }
            }
            return response;
        }
    }
    function getItem(id){
        return Items.get({_id:id} ).$promise
            .then(getItemComplete)
        function getItemComplete(response) {
            return response;
        }
    }

    function upload(item) {
        var url =(storeHost)? 'http://'+storeHost+'/api/upload/'+item._id:'/api/upload/'+item._id
        //console.log(url)
        return $http.get(url)
    }
    function create(){
        return $q(function(resolve,reject){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/storeSetting/createStore.html',
                controller: createStoreCtrl,
                controllerAs:'$ctrl',
            });
            modalInstance.result.then(function (store) {
                if(store.name){
                    store.name=store.name.substring(0,25)
                    //store.user={_id:store.user._id,name:store.user.name}
                    resolve(store)
                }else{
                    reject('empty')
                }

            }, function (err) {
                reject(err)
            });
        })


    }

    function selectPartOfTemplate(stores){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/storeSetting/modal/selectStore.html',
            controllerAs:'$ctrl',
            controller: function ($uibModalInstance ,global,stores) {
                var self=this;
                self.stores=stores;
                self.selectStore=selectStore;
                self.cancel = cancel;

                function selectStore(store){
                    $uibModalInstance.close(store);
                }
                function cancel() {
                    $uibModalInstance.dismiss();
                };
            },
            resolve: {
                stores:function () {
                    return stores
                }
            }
        });
        return modalInstance.result
    }
    function selectItemFromList(items,header){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/storeSetting/modal/selectItem.html',
            controllerAs:'$ctrl',
            controller: function ($uibModalInstance ,global,items,header) {
                var self=this;
                self.items=items;
                self.header=header||'выберите из предложенного списка'
                self.selectItem=selectItem;
                self.cancel = cancel;

                function selectItem(item){
                    $uibModalInstance.close(item);
                }
                function cancel() {
                    $uibModalInstance.dismiss();
                };
            },
            resolve: {
                items:function () {
                    return items
                },
                header:function () {
                    return header
                }
            }
        });
        return modalInstance.result
    }

    createStoreCtrl=['$uibModalInstance','exception','$user'];
    function createStoreCtrl($uibModalInstance,exception,$user){
        var self=this;
        self.name='';
        self.addOwner=addOwner;
        self.ok=function(){
            /*if(!self.name || !self.user){
                exception.catcher('создание магазина')('нужен владелец')
                return
            }*/
            if(!self.name){
                exception.catcher('создание магазина')('нужено название')
                return
            }
            $uibModalInstance.close({name:self.name});
            //$uibModalInstance.close({name:self.name,user:self.user});
        }
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        function addOwner(){
            $user.selectItem().then(function(user){
                self.user=user
            })
        }
    }
})
    .service('Template', function($resource,$q,$uibModal){
        var Items= $resource('/api/collections/Template/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            create:create
        }
        function getList(paginate,query){
            if(!paginate){
                paginate ={page:0}
            }
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
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
        function create(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/storeSetting/createTemplate.html',
                    controller: createTemplateCtrl,
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (o) {
                    if(o.name){
                        o.name=o.name.substring(0,25)
                        resolve(o)
                    }else{
                        reject('empty')
                    }

                }, function (err) {
                    reject(err)
                });
            })


        }
        createTemplateCtrl=['$uibModalInstance','exception'];
        function createTemplateCtrl($uibModalInstance,exception){
            var self=this;
            self.name='';
            self.folder=''
            self.ok=function(){
                if(!self.name || !self.folder){
                    exception.catcher('создание шаблона')('нужено имя и папка')
                    return
                }
                $uibModalInstance.close({name:self.name,folder:self.folder});
            }
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
    })
    .service('BlocksConfig', function($resource,$q,$uibModal){
        var Items= $resource('/api/collections/BlocksConfig/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            selectItemFromList:selectItemFromList,
        }
        function getList(paginate,query){
            if(!paginate){
                paginate ={page:0,rows:500}
            }
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
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
        function selectItemFromList(items,header){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/storeSetting/modal/selectItemForBlocks.html',
                controllerAs:'$ctrl',
                controller: function ($uibModalInstance ,global,items,header) {
                    var self=this;
                    self.items=items;
                    self.header=header||'выберите из предложенного списка'
                    self.selectItem=selectItem;
                    self.cancel = cancel;

                    function selectItem(item){
                        $uibModalInstance.close(item);
                    }
                    function cancel() {
                        $uibModalInstance.dismiss();
                    };
                },
                resolve: {
                    items:function () {
                        return items
                    },
                    header:function () {
                        return header
                    }
                }
            });
            return modalInstance.result
        }
        /*function create(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/storeSetting/createTemplate.html',
                    controller: createTemplateCtrl,
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (o) {
                    if(o.name){
                        o.name=o.name.substring(0,25)
                        resolve(o)
                    }else{
                        reject('empty')
                    }

                }, function (err) {
                    reject(err)
                });
            })


        }
        createTemplateCtrl=['$uibModalInstance','exception'];
        function createTemplateCtrl($uibModalInstance,exception){
            var self=this;
            self.name='';
            self.folder=''
            self.ok=function(){
                if(!self.name || !self.folder){
                    exception.catcher('создание шаблона')('нужено имя и папка')
                    return
                }
                $uibModalInstance.close({name:self.name,folder:self.folder});
            }
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }*/
    })
    .service('Config', function($resource){
        var Items= $resource('/api/collections/Config/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
        }
        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
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
    })
    .service('ConfigData', function($resource,$q){
        var Items= $resource('/api/collections/ConfigData/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
        }
        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
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
    })

    .service('Seller', function($resource){
        var Items= $resource('/api/collections/Seller/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
        }
        function getList(paginate,query){
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            return Items.query(data).$promise
                .then(getListComplete)
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
        }
        function getItem(id,param){
            return Items.get({_id:id,param:param} ).$promise
                .then(getItemComplete)
            function getItemComplete(response) {
                return response;
            }
        }
    })

    .service('siteName', function($uibModal){
        return {
            choiceName:choiceName,
        }
        function choiceName(data){
            return $uibModal.open({
                animation: true,
                templateUrl: 'components/storeSetting/modal/websiteName.html',
                controller: function($uibModalInstance,global,Store,data){
                    var self=this;
                    self.global=global;
                    self.item=''
                    self.focus=true;
                    self.windowName='Выберите поддомен';
                    self.field = 'subDomain'
                    if(data){
                        if(data.windowName){
                            self.windowName=data.windowName;
                        }
                        if(data.field){
                            self.field=data.field;
                        }
                    }
                    self.checkSubDomain=checkSubDomain;
                    self.exist=false
                    //self.re=/^[a-z][a-z0-9-_]/
                    self.re=/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/
                    self.ok=function(websiteNameForm){
                        if(websiteNameForm.$invalid || self.exist){
                            return;
                        }
                        $uibModalInstance.close(self.item.toLowerCase());
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                    function checkSubDomain(name){
                        if(!name || name.length>20){return}
                        var o={};
                        o[self.field]=name.toLowerCase();
                        Store.query({query:o},function(res){
                            if(res &&  res.length){
                                console.log(true)
                                self.exist =true;
                            }else{
                                self.exist= false
                            }
                        },function(err){
                            self.exist= true;
                        })
                    }
                },
                controllerAs:'$ctrl',
                resolve: {
                    data : function () {
                        return data
                    }
                }
            }).result
        }
    })

/*
$resource('/api/collections/Template/:id',{id:'@_id'}).query({perPage:500,page:0},function(res){
    res.shift();
    $scope.listEditCtrl.templates=res;
});
$resource('/api/collections/Config/:id',{id:'@_id'}).query({perPage:500,page:0},function(res){
    res.shift();
    $scope.listEditCtrl.currency=res[0].currency;
    $scope.listEditCtrl.unitOfMeasure=res[0].unitOfMeasure;
    $scope.listEditCtrl.config=res[0];
});*/
