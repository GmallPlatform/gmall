'use strict';
(function(){

    angular.module('gmall.services')
        .service('Info', infoService);
    infoService.$inject=['$resource','$uibModal','$q'];
    function infoService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/Info/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            query:Items.query,
            get:Items.get,
            create:create,
            selectInfo:selectInfo,
            select:selectInfo
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
                console.log('XHR Failed for getPaps.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            //console.log(id)
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
        function create(header,button){
            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    restrict:"E",
                    templateUrl: 'components/info/createItem.html',
                    controller: createCtrl,
                    size:'lg',
                    controllerAs:'$ctrl',
                    resolve:{
                        header:function(){
                            return header
                        },
                        button:function(){
                            return button;
                        }
                    }
                }
                $uibModal.open(options).result.then(function (name) {
                    if(name){
                        resolve(name.substring(0,100))
                    }else{
                        reject()
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
        createCtrl.$inject=['$uibModalInstance','header','button']
        function createCtrl($uibModalInstance,header,button){
            var self=this;
            self.header=(header)?header:'создание информационной страницы'
            self.button=(button)?button:'создать страницу'
            self.name=''
            self.ok=function(){
                $uibModalInstance.close(self.name);
            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }

        function selectInfo(){
            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    templateUrl: 'components/info/selectInfo.html',
                    controller: selectInfoCtrl,
                    size: 'lg',
                    controllerAs:'$ctrl',
                }
                var modalInstance = $uibModal.open(options);
                modalInstance.result.then(function (selectedItem) {
                    resolve(selectedItem)
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                    reject()
                });
            })
        }
        selectInfoCtrl.$inject=['Info','$uibModalInstance','$q'];
        function selectInfoCtrl(Info,$uibModalInstance,$q){
            var self=this;
            $q.when()
                .then(function(){
                    return Info.getList();
                } )
                .then(function(items){
                    self.items=items;
                })
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            self.ok = function (item) {
                $uibModalInstance.close(item);
            };
        }
    }
})()
