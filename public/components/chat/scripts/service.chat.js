'use strict';
angular.module('gmall.services')
.factory('$chat', function ($resource) {
    var Items= $resource('/api/collections/Chat/:id',{id:'@_id'});
    return {
        getList:getList,
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
})

