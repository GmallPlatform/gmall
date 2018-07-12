'use strict';
(function(){
    'use strict';
    angular.module('gmall.services')
        .service('Seopage', itemService);
    itemService.$inject=['$resource','$uibModal','$q'];
    function itemService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/Seopage/:_id',{_id:'@_id'});
        return {
            get:Items.get,
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            create:create,
        }
        function getList(paginate,query){
            if(!paginate){paginate={page:0}}
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
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
                return response;
            }
            function getListFailed(error) {
                console.log('XHR Failed for seopage.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                //.catch(getItemFailed);
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
                    templateUrl: 'components/SEO/seopages/createSeopage.html',
                    controller: createCtrl,
                    size:'lg',
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
        createCtrl.$inject=['$uibModalInstance','Category']
        function createCtrl($uibModalInstance,Category){
            var self=this;
            self.name=''
            self.data={category:null};
            self.selectCategory=selectCategory;
            self.getUrl=getUrl;
            self.clearUrl=clearUrl;

            function getUrl(){
                var url='/';
                if(self.data.category){
                    if(self.data.category._id){
                        //var params=
                    }
                }
                return url;
            }
            function clearUrl(){
                self.data={};
            }
            function selectCategory(){
                Category.select(null,true).then(function(category,section){
                    console.log(category);
                    self.data.category=category;
                })
            }

            function getSectionUrlParams(section){
                //console.log(section)
                var params={
                    groupUrl:'group',
                    categoryUrl:'category',
                    categoryList:null,
                    parentGroup:null,
                    brand:null,
                    artikul:null,
                    brandTag:null,
                    queryTag:null,
                    searchStr:null
                }
                if (section.level===0){
                    params.groupUrl=section.url
                }else{
                    params.groupUrl=section.section.url;
                    params.parentGroup=section.url;
                }
                return params;
            }
            function getCategoryUrlParams(section,category){
                var params =self.getSectionUrlParams(section);
                if(category){
                    params.categoryUrl=category.url;
                } else{
                    params.categoryUrl='category';
                    params.categoryList='allCategories'
                }
                return params;
            }

            self.ok=function(){
                $uibModalInstance.close(self.name);
            }
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
    }
})()
