'use strict';
angular.module('gmall.services')
.service('filterStuffsListService', function($uibModal,$q,Filters){
    this.setFilters=function(query){
        return $q(function(resolve,reject){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl:'components/filterStuffsList/filterStuffsList.html',
                controller: function($scope,$stateParams,Sections,$uibModalInstance,query,$location){
                    var self=this;
                    self.global=global;
                    self.query=query;
                    console.log(query)
                    $q.when()
                        .then(function(){
                            return Filters.getFilters();
                        })
                        .then(function(filters){
                            //console.log(filters)
                            self.filters=filters;
                        })
                        .then(function(){
                            return Sections.getSections()
                        })
                        .then(function(sections){
                            if ($stateParams.groupUrl!='brand' && $stateParams.groupUrl!='group'){
                                if($stateParams.parentGroup){
                                    self.parentSection=Sections.getParentSection($stateParams.parentGroup);
                                }else{
                                    self.parentSection=Sections.getParentSection($stateParams.groupUrl);
                                }
                                if($stateParams.categoryList=='allCategories' || $stateParams.categoryUrl!='category'){
                                    if($stateParams.categoryUrl!='category' && self.parentSection && self.parentSection.categories){
                                        self.category= self.parentSection.categories.getOFA('url',$stateParams.categoryUrl)
                                        //console.log(self.category)
                                        if(self.category && self.category.filters && self.category.filters.length){
                                            self.filters=self.filters.filter(function(filter){
                                                return self.category.filters.indexOf(filter._id)>-1
                                            })

                                        }
                                    }
                                }
                            }
                            if(!self.filters || !self.filters.length){$uibModalInstance.dismiss('cancel');}
                            if(query && query.tags && typeof query.tags=='object'){
                                self.filters.forEach(function(filter){
                                    if(query.tags[filter._id]){
                                        filter.tags.forEach(function(tag){
                                            if (query.tags[filter._id].indexOf(tag._id)>-1){
                                                tag.set=true;
                                            }
                                        })
                                    }
                                })
                            }
                        })// категория

                    self.changeAllTags=function(filter){
                        filter.tags.forEach(function(tag){
                            tag.set=false;
                        })
                    }
                    self.clearAll=function(){
                        self.filters.forEach(function(filter){
                            filter.tags.forEach(function(tag){
                                tag.set=false;
                            })
                        })
                    }

                    /*self.changeTag=function(filter){
                        if(filter.tags.every(function(tag){return tag.set})){
                            filter.allTags=true;
                        }
                        if(filter.tags.some(function(tag){return !tag.set})){
                            filter.allTags=false;
                        }
                    }*/

                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                    self.ok = function () {
                        query.tags={}
                        var queryTag='';
                        self.filters.forEach(function(filter){
                            var arr=[];
                            filter.tags.forEach(function(tag){
                                if (tag.set){
                                    arr.push(tag._id);
                                    if(queryTag){queryTag+='+'}
                                    queryTag+=tag.url;
                                }
                            })
                            if(arr.length){
                                query.tags[filter._id]=arr;
                            }
                        })
                        if(!queryTag){
                            $location.search('queryTag',null)
                        }else{
                            $location.search('queryTag',queryTag)
                        }
                        $uibModalInstance.close(self.query);
                    };
                    //queryTag=novinki%2Bskoro-v-prodazhe%2Brozovyj%2Bkorichnevyj%2B52%2B56

                },
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    query: function () {
                        return query;
                    }
                }
            });
            modalInstance.result.then(function (query) {
                resolve(query)
            },function(){
                reject('отказ')
            });
        })

    }
})

/*
angular.module('gmall.directives')
    .directive('filtersWrap',filtersWrapDirective)
function filtersWrapDirective(){
    return {
        scope: {},
        restrict:"C",
        bindToController: true,
        controller: filtersWrapCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'views/template/partials/stuffs/filters/filtersWrap.html'
    }
}
filtersWrapCtrl.$inject=[];
function filtersWrapCtrl() {
    var self=this;
    self.is=[];
    for(var i =0;i<100;i++){
        self.is.push(i)
    }
    console.log('link')

}
*/
