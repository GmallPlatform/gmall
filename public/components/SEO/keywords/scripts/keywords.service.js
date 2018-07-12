'use strict';
(function(){
    'use strict';
    angular.module('gmall.services')
        .service('Keywords', itemService);
    itemService.$inject=['$resource','$uibModal','$q'];
    function itemService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/Keywords/:_id',{_id:'@_id'});
        return {
            //get:Items.get,
            getList:getList,
            //getItem:getItem,
            save:Items.save,
            delete:Items.delete,
        }
        function getList(){
            return Items.query().$promise
                .then(getListComplete)
                //.catch(getListFailed);
            function getListComplete(response) {
                if(response && response.length){
                    response.shift()
                }
                return response;
            }
            function getListFailed(error) {
                console.log('XHR Failed for seopage.' + error);
                return $q.reject(error);
            }
        }
    }
})()
