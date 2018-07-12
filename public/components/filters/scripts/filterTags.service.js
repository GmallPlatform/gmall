'use strict';
//console.log(_filterTagsO);
var __filterTagsO=_filterTagsO
var __filterTags=_filterTags
//(function(){

    angular.module('gmall.services')
        .service('FilterTags', filterTagsService);
    filterTagsService.$inject=['$resource','$uibModal','$q','global','$timeout','Sections'];
    function filterTagsService($resource,$uibModal,$q,global,$timeout,Sections){
        var Items= $resource('/api/collections/FilterTags/:_id',{_id:'@_id'});
        var filterTags=null;
        var pending=true;
        var qu;
        //console.log(_filterTagsO)
        /*console.log(_filterTagsO)
        if(typeof _filterTagsO=='undefined'){
            var _filterTagsO={}
        }*/
        //filterTags=global.get('filterTags').val
        /*if(typeof _filterTags!='undefined' && _filterTags.length){
            filterTags=_filterTags
        }*/
        filterTags=__filterTags
        $timeout(function(){ // это для админки
            qu={query:JSON.stringify({store:global.get('store').val._id})}
            if(!global.get('filterTags') || !global.get('filterTags' ).val){
                //console.log('????????????????')
                init();
            }else{
                filterTags=global.get('filterTags').val
            }
        },50)


        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            query:Items.query,
            get:Items.get,
            getFilterTags:getFilterTags,
            getTagsByUrl:getTagsByUrl,
            selectFilterTag:selectFilterTag,
            select:selectFilterTag,
            reloadItems:reloadItems,
            getSticker:getSticker,
            reloadItems:reloadItems
        }

        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            //console.log(query)
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
        function returnFilterTags(resolve){
            if(pending){setTimeout(function(){returnFilterTags(resolve)}, 100);}else{
                resolve(filterTags)
            }
        }
        function getFilterTags(){
            return $q(function(resolve,reject){
                //console.log( global.get('filterTags').val)
                if(global.get('filterTags') && global.get('filterTags').val){
                    if(!filterTags){filterTags=global.get('filterTags').val}
                    return resolve(global.get('filterTags').val);
                }
                if(pending){
                    return $timeout(function(){return resolve(filterTags)}, 400);
                }else{
                    if(filterTags){
                        resolve(filterTags)
                    } else{
                        pending=true;
                        Items.query(function(res){
                            //console.log(res)
                            res.shift();
                            filterTags=(res)?res:[];
                            pending=false;
                            resolve(filterTags)
                        },function(err){pending=false;;reject(err)})
                    }
                }
            })
        }
        function getTagsByUrl(queryTags,cb){
            //console.log(queryTags)
            $q.when()
                .then(function(){
                    return getFilterTags();
                })
                .then(function(){
                    //console.log(filterTags)
                    queryTags=queryTags.map(function(url){
                        //console.log(url)

                        return filterTags.getOFA('url',url)
                    });
                    cb(queryTags)
                })
        }

        function selectFilterTag(data){
            var sections =(data &&  data.section)?Sections.getSections():null;

            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    templateUrl: 'components/filters/bindFilterTagToModel.html',
                    controller: selectFilterTagCtrl,
                    size: 'lg',
                    controllerAs:'$ctrl',
                    resolve:{
                        sections: function(){
                            return sections
                        }
                    }
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
        selectFilterTagCtrl.$inject=['Filters','$uibModalInstance','$q',,'global','sections'];
        function selectFilterTagCtrl(Filters,$uibModalInstance,$q,global,sections){
            var self=this;
            self.global=global;
            self.sections=sections;
            if(self.sections){
                self.section=self.sections[0].url
            }
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
            self.ok = function (filterTag) {
                //console.log(filterTag)
                if(self.section){
                    filterTag.section=self.section;
                }
                $uibModalInstance.close(filterTag);
            };
        }
        function init(){
            Items.query(qu,function(res){
                res.shift();
                filterTags=res;
                filterTags.forEach(function (t) {
                    _filterTagsO[t._id]=t;
                })
                pending=false;
            })
        }
        function reloadItems(){
            pending=true;
            init();
        }
        function getSticker(tags){
            if(tags && tags.length && filterTags && filterTags.length){
                for(var i =0;i<tags.length;i++){
                    if(__filterTagsO[tags[i]] && __filterTagsO[tags[i]].sticker){
                        //console.log(angular.copy(__filterTagsO[tags[i]].sticker))
                        return __filterTagsO[tags[i]].sticker
                    }
                }
            }
        }
    }
//})()


/*'use strict';
angular.module('gmall.services')
.service('FilterTags', function ($resource,$q) {
    var Items= $resource('/api/collections/FilterTags/:id',{id:'@_id'});
    var filterTags=null;
    var pending=true;
    this.query=Items.query;
    this.get=Items.get;
    this.delete=Items.delete;
    this.save=Items.save;

    var getFilterTags=function(){
        return $q(function(resolve,reject){
            if(pending){
                setTimeout(function(){returnFilterTags(resolve)}, 100);
            }else{
                if(filterTags){
                    resolve(filterTags)
                } else{
                    pending=true;
                    Items.query(function(res){
                        res.shift();
                        filterTags=res;
                        pending=false;
                        resolve(filterTags)
                    },function(err){pending=false;;reject(err)})
                }
            }
        })
    }
    this.getFilterTags=getFilterTags;
    this.getTagsByUrl=function(queryTags,cb){
        $q.when()
            .then(function(){
                return getFilterTags();
            })
            .then(function(){
                queryTags=queryTags.map(function(url){
                    return filterTags.getOFA('url',url)
                });
                cb(queryTags)
            })
    }

    Items.query(function(res){
        res.shift();
        filterTags=res;
        pending=false;
    })

})*/
angular.module('gmall.services')
.service('SelectFilterTags', ['$q','$uibModal', function($q,$uibModal) {
    function bindFilterTagToModelCtrl(Filters,$uibModalInstance){
        var self=this;
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
        self.ok = function (filterTag) {
            $uibModalInstance.close(filterTag);
        };
    }
    this.bindFiterTagToModel=function(){
        return $q(function(resolve,reject){
            var options={
                animation: true,
                templateUrl: 'components/filters/bindFilterTagToModel.html',
                controller: bindFilterTagToModelCtrl,
                size: 'lg',
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
}])

