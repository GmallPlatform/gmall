'use strict';
angular.module('gmall.services')
.service('Filters', function ($resource,$q,global,$uibModal) {
    var Items= $resource('/api/collections/Filter/:id',{id:'@_id'});
    var filters=null;
    var pending=true;
    this.query=Items.query;
    this.get=Items.get;
    this.delete=Items.delete;
    this.save=Items.save;
    this.select=selectFilter;
    this.reloadItems=reloadItems;
    this.getItem=getItem;
    this.getList=getList;


    function getList(paginate,query){
        if(!paginate){
            paginate={page:0}
        }
        var data ={perPage:paginate.rows ,page:paginate.page,query:query};
        if(global.get('crawler') && global.get('crawler').val){
            data.subDomain=global.get('store').val.subDomain;
        }
        return Items.query(data).$promise
            .then(getListComplete)
        //.catch(getListFailed);
        function getListComplete(response) {
            if(paginate.page==0){
                if(response && response.length){
                    paginate.items=response.shift().index;
                }else{
                    paginate.items=0;
                }
            }
            //console.log(response)
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
        //.catch(getItemFailed);
        function getItemComplete(response) {
            if(response && response.blocks && response.blocks.length){
                response.blocks.forEach(function (b) {
                    if(b.type=='stuffs'){
                        if(b.stuffs && b.stuffs.length){
                            b.imgs=b.stuffs.map(function(s){
                                if(s.gallery && s.gallery.length && s.gallery[0].img){
                                    s.img=s.gallery[0].img;
                                }
                                return s;
                            });
                        }else{b.imgs=[]}
                    }
                })
            }
            return response;
        }
        function getItemFailed(error) {
            return $q.reject(error);
        }
    }


    function returnFilters(resolve){
        if(pending){setTimeout(function(){returnFilters(resolve)}, 300);}else{
            resolve(filters)
        }

    }
    this.getFilters=function(){
        return $q(function(resolve,reject){
            if(global.get('filters') && global.get('filters').val){
                if(!filters){filters=global.get('filters').val}
                return resolve(global.get('filters').val);
            }
            if(pending){
                setTimeout(function(){returnFilters(resolve)}, 300);
            }else{
                if(filters){
                    resolve(filters)
                } else{
                    pending=true;
                    Items.query(function(res){
                        res.shift();
                        filters=res;
                        pending=false;
                        resolve(filters)
                    },function(err){pending=false;;reject(err)})
                }
            }
        })
    }
    if(!global.get('filters') || !global.get('filters' ).val){
        Items.query(function(res){
            res.shift();
            filters=res;
            if(global.get('filters') && !global.get('filters' ).val){
                global.set('filters',filters)
            }
            pending=false;
        })
    }

    function reloadItems(){
        pending=true;
        Items.query(function(res){
            res.shift();
            filters=res;
            global.set('filters',filters)
            pending=false;
        })
    }

    function selectFilter(){
        return $q(function(resolve,reject){
            var options={
                animation: true,
                templateUrl: 'components/filters/selectFilter.html',
                controller: selectFilterCtrl,
                size: 'lg',
                controllerAs:'$ctrl',
            }
            var modalInstance = $uibModal.open(options);
            modalInstance.result.then(function (selected) {
                //console.log(selected)
                resolve(selected)
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                reject()
            });
        })
    }
    selectFilterCtrl.$inject=['Filters','$uibModalInstance','$q','global'];
    function selectFilterCtrl(Filters,$uibModalInstance,$q,global){
        var self=this;
        self.lang=global.get('lang').val;
        $q.when()
            .then(function(){
                return Filters.getFilters();
            } )
            .then(function(filters){
                self.filters=filters;
                //console.log(filters)
            })
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        self.ok = function (filter) {
            $uibModalInstance.close(filter);
        };
    }


})
    /*.service('FilterTags', function ($resource,) {
        var Items= $resource('/api/collections/FilterTags/:id',{id:'@_id'});
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
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return Items.query(data).$promise
                .then(getListComplete)
            //.catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                //console.log(response)
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
            //.catch(getItemFailed);
            function getItemComplete(response) {
                if(response && response.blocks && response.blocks.length){
                    response.blocks.forEach(function (b) {
                        if(b.type=='stuffs'){
                            if(b.stuffs && b.stuffs.length){
                                b.imgs=b.stuffs.map(function(s){
                                    if(s.gallery && s.gallery.length && s.gallery[0].img){
                                        s.img=s.gallery[0].img;
                                    }
                                    return s;
                                });
                            }else{b.imgs=[]}
                        }
                    })
                }
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }



    })*/


