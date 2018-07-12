'use strict';
(function(){
    'use strict';
    angular.module('gmall.services')
        .service('Campaign', campaignService);
    campaignService.$inject=['$resource','$uibModal','$q'];
    function campaignService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/Campaign/:_id',{_id:'@_id'});
        return {
            get:Items.get,
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            create:create,
            select:selectItem,
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
                    templateUrl: 'components/PROMO/campaign/createCampaign.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.name=''
                        self.ok=function(){
                            if(!self.name || self.name.length<3){return}
                            $uibModalInstance.close(self.name);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
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
                    reject()
                });
            })

        }
        function selectItem(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/PROMO/campaign/selectItem.html',
                    controller: function(Campaign,$uibModalInstance){
                        var self=this;
                        self.stuffs=[];
                        self.name='';
                        var query;
                        var paginate={page:0,rows:30,items:0}
                        self.search = function(name){
                            if (name.length<3){return}
                            query={name:name}
                            Campaign.getList(paginate,query).then(function(res){
                                self.items=res;
                            })
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
