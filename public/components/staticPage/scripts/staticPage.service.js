'use strict';
(function(){
    angular.module('gmall.services')
        .service('Stat', statService);
    statService.$inject=['$resource','$uibModal','$q'];
    function statService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/Stat/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            query:Items.query,
            get:Items.get,
            create:create,
            selectItem:selectItem
        }
        function getList(paginate,query){
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
                var options={
                    animation: true,
                    restrict:"E",
                    templateUrl: 'components/staticPage/createStaticPage.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.name=''
                        self.ok=function(){
                            $uibModalInstance.close(self.name);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    controllerAs:'$ctrl',
                }
                $uibModal.open(options).result.then(function (name) {
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
        function selectItem(){
            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    templateUrl: 'components/staticPage/selectItem.html',
                    controller: selectItemCtrl,
                    controllerAs:'$ctrl',
                }
                var modalInstance = $uibModal.open(options);
                modalInstance.result.then(function (selectedFilterTag) {
                    resolve(selectedFilterTag)
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                    reject()
                });
            })
        }
        selectItemCtrl.$inject=['Stat','$uibModalInstance','$q'];
        function selectItemCtrl(Stat,$uibModalInstance,$q){
            var self=this;
            $q.when()
                .then(function(){
                    return Stat.getList({rows:100,page:0});
                } )
                .then(function(stats){
                    self.stats=stats;
                })
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            self.ok = function (stat) {
                $uibModalInstance.close(stat);
            };
        }
    }
})()
