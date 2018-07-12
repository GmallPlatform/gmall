'use strict';
(function(){

    angular.module('gmall.services')
        .service('Orders', orderService);

    orderService.$inject=['$resource','$uibModal','$q'];
    function orderService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/Order/:_id',{_id:'@_id'});
        this.query=Items.query;
        this.get=Items.get;
        this.delete=Items.delete;
        this.save=Items.save;
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
                if(response && response.length){
                    response.forEach(function(o){
                        o.totalPay=(o.pay && o.pay.length)?o.pay.reduce(function(s,i){return s+=i.sum},0):0;
                    })
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
            function getItemComplete(o) {
                //console.log(o)
                return o;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }

    }
})()

