'use strict';
(function(){

    angular.module('gmall.services')
        .service('CartInOrder', cartInOrderService);

    cartInOrderService.$inject=['$resource','$uibModal','$q'];
    function cartInOrderService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/CartInOrder/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
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

    }
})()

