'use strict';
(function(){
    'use strict';
    angular.module('gmall.services')
       
        .service('Comment', itemService)

    itemService.$inject=['$resource','$uibModal','$q','global','exception','$state'];
    function itemService($resource,$uibModal,$q,global,exception,$state){
        var Items= $resource('/api/collections/Comment/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
        }


        function getList(paginate,query){
            //console.log(query)
            if(!paginate){paginate={}}
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
                /*console.log('XHR Failed for getList.' + error.data);
                console.log(error.data)*/
                return $q.reject(error);
            }
        }
        function getItem(id,param){
            return Items.get({_id:id,param:param}).$promise
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

