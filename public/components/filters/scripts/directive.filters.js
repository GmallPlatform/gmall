'use strict';
angular.module('gmall.directives')
.directive('filtersList',[function(){
    function filterCtrl($anchorScroll,Filters,FilterTags,$q,SelectCategory,$state,$timeout,$scope,global,Confirm,$http,$uibModal,exception){
        var self=this;
        self.$state=$state;
        $scope.$on('changeLang',function(){
            activate()
        })
        activate()
        self.setCountData=setCountData;
        function activate() {
            $q.when()
                .then(function(){
                    return Filters.query().$promise;
                } )
                .then(function(res){
                    res.shift();
                    self.filters=res;
                    console.log(self.filters)
                })
                .then(function(){
                    return FilterTags.query().$promise;
                } )
                .then(function(res){
                    res.shift();
                    self.filterTags=res;
                })
                .then(function(){
                    self.filters.forEach(function(filter){
                        if(!filter.tags){filter.tags=[];}
                        if(!filter.tags.length){
                            self.filterTags.forEach(function(tag){
                                if(tag.filter==filter._id){
                                    tag.index=filter.tags.length;
                                    filter.tags.push(tag);
                                }
                            })
                        }else{
                            filter.tags.forEach(function(tag,i){
                                //console.log(tag)
                                tag.index=i;
                            })

                        }
                    })
                    //console.log(self.filters[0].tags)
                })
        }


        // управление фильтрами*************
        self.newFilter={name:''}
        self.addNewFilter=function(filter){
            console.log(filter)
            if(!filter.name){return};
            var newFilter={
                name:filter.name.substring(0,50),
                index:0,type:1,tags:[],
                active:false,
                showTags:true}
            if(self.filters && self.filters.length){
                newFilter.index=self.filters[self.filters.length-1].index;
            }
            Filters.save(newFilter,function(res){
                // console.log(res);
                newFilter._id=res.id;
                self.filters.push(newFilter);
                filter.name='';
                //Filter.save(filter)
            })
        }
        self.deleteFilter=function(filter,idx){
            Confirm('Delete?').then(function () {
                Filters.delete({id:filter._id},function(res){
                    self.filters.splice(idx,1)
                },function(err){
                    console.log(err)
                })
            })


        }
        self.saveFilter = function(filter,field){
            if (!filter.name){return};
            //filter.url=filter.name.getUrl();
            var o={_id:filter._id};
            o[field]=filter[field];
            Filters.save({update:field},o,function(res){
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
            })
        }
        self.dropFilterCallback=function(filter){
            setTimeout(function(){
                self.filters.forEach(function(filter,idx){
                    filter.index=idx+1;
                    Filters.save({update:'index'},filter)
                })
            },200)
            return filter
        }
        self.saveField=function(item,field){
            var o={_id:item._id};
            o[field]=item[field]
            Filters.save({update:field},o,function(res){
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
            });
        }
        self.fixBrands=function(){
            Confirm('Подтверждаете?')
                .then(function () {
                    $scope.fixBrandsDesable=true;
                    var data = {}
                    return $http({
                        method: "post",
                        url: '/api/fixedDB/filter',
                        data:data,
                    })
                })
                .then(function(){
                    exception.showToaster('info','fix stucture','Ok')
                })
                .catch(function (err) {
                    exception.catcher('fix stucture')(err)
                })

        }
        //********************************************************
        self.addTag=function(filter){
            if(!filter.newTag){return};
            var newTag={name:filter.newTag.substring(0,50),index:1,filter:filter._id};
            if(filter.tags && filter.tags.length){
                newTag.index=filter.tags[filter.tags.length-1].index;
            }
            $q.when()
                .then(function(){
                    return FilterTags.save(newTag ).$promise
                })
                .then(function(res){
                    newTag._id=res.id;
                    filter.tags.push(newTag);
                    filter.newTag=''
                    //console.log(filter)
                    Filters.save({update:'tags'},{_id:filter._id,tags:filter.tags.map(function(el){return el._id})},function(res){})
                })
                .catch(function(err){
                    console.log(err)
                })
        }
        self.saveTag=function(tag,field){
            if (!tag.name){return};
            /*if(!tag.url){
                tag.url=tag.name.getUrl();
            }*/

            var o={_id:tag._id};
            o[field]=tag[field];
            FilterTags.save({update:field},o,function(res){
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
            },function(err){});
        }
        function saveTagPromise(tag,field) {
            return $q(function (res,rej) {
                var o={_id:tag._id};
                o[field]=tag[field];
                FilterTags.save({update:field},o,function(){res()},function(err){rej(err)});
            })
        }
        self.deleteTag=function(filter,idx){
            Confirm('Delete?').then(function () {
                FilterTags.delete({_id:filter.tags[idx]._id},function(res){
                    var tag = filter.tags.splice(idx,1);
                    Filters.save({update:'tags'},{_id:filter._id,tags:filter.tags.map(function(el){return el._id})},function(res){})
                },function(err){
                    console.log(err)
                })
            })

        }
        self.dropTagCallback = function(tag,index,filter) {
            //console.log(tag,filter)
            setTimeout(function(){
                Filters.save({update:'tags'},{_id:filter._id,tags:filter.tags.map(function(el){return el._id})},function(res){
                    //console.log(res)
                })
                var acts=[];
                filter.tags.forEach(function(tag,i){
                    tag.index=i
                    acts.push(saveTagPromise(tag,'index'))

                })
                $q.all(acts)
                if (tag.filter!=filter._id && tag.filter){
                    //var acts=[];
                    filter.tags.forEach(function(tag,i){
                        tag.index=i
                        //acts.push(saveTagPromise(tag,'index'))

                    })
                    //$q.all(acts)
                    var oldFilter=self.filters.getObjectFromArray('_id',tag.filter);
                    Filters.save({update:'tags'},{_id:oldFilter._id,tags:oldFilter.tags.map(function(el){return el._id})},function(res){})
                    tag.filter=filter._id;
                    FilterTags.save({update:'filter'},tag,function(res){})
                }
            },200)
            /* console.log(filter.tags)
             console.log('dropTagCallback')*/
            return tag;

        };
        self.tagMoved=function(filter,tag,idx){
            //console.log(idx,tag.index)
            if(idx==tag.index){
                filter.tags.splice(idx,1)
            } else {
                filter.tags.splice(idx+1,1)
            }
            filter.tags.forEach(function(tag,i){
                tag.index=i
            })

            //console.log(filter.tags)

        }


        // привязка к категориям
        self.selectCategory=function(id){
            SelectCategory.bindCategoryForFilterBrandCol(id,'filters')
        }

        function setCountData(filter){
            $uibModal.open({
                animation: true,
                templateUrl: 'components/filters/modal/countData.html',
                controller: function($uibModalInstance,$q,saveField,filter){
                   // console.log(saveField,filter)
                    var self=this;
                    self.filter=filter
                    self.ok=function(){$uibModalInstance.close()}
                    self.cancel = function () {$uibModalInstance.dismiss()}
                    self.saveField=function(field){
                        saveField(filter,field)
                    }

                },
                resolve:{
                    saveField:function () {
                        return self.saveField
                    },
                    filter:function () {
                        return filter
                    },
                },
                controllerAs:'$ctrl',
                size:'lg',
            })
        }


    }
    return {
        scope: {},
        bindToController: true,
        controller: filterCtrl,
        controllerAs: '$ctrl',
        restrict:"E",
        templateUrl:"components/filters/filters.html"
    }
}])
.directive('filterTagEdit',[function(){
        /*return {
            restrict:"E",
            scope:{
                id:'@'
            },
            templateUrl:"components/filters/tagEdit.html",
            link:function($scope,element,attrs){
                FilterTags.get({id:$scope.id},function(res){
                    //console.log(res)
                    $scope.itemTag=res;
                    if(!$scope.itemTag.sticker){
                        $scope.itemTag.sticker=null;
                    }
                    if(!$scope.itemTag.img){
                        $scope.itemTag.img=null;
                    }
                })
                $scope.ItemsTag=FilterTags;
                $scope.updateItemTag=function(field){
                    FilterTags.save({update:field},$scope.itemTag)
                }
                /!*$scope.updateItemTag=function(field){
                 FilterTags.save({update:field},$scope.itemTag)
                 $state.go('frame.filters')
                 }*!/

            }
        }*/
    function tagCtrl($stateParams,global,FilterTags,$q,$timeout,$scope){
        var self=this;
        self.Items=FilterTags;
        self.global=global;
        $scope.$on('changeLang',function(){
            activate()
        })
       activate()
        function activate() {
            $q.when()
                .then(function(){
                    return self.Items.get({_id:$stateParams.id} ).$promise;
                })
                .then(function(res){
                    self.item=res;
                })
                .catch(function(err){
                    self.edit=false;
                })
        }
        self.saveField = function(field,defer){
            defer =defer||0
            setTimeout(function(){
                var o={_id:self.item._id};
                o[field]=self.item[field]
                self.Items.save({update:field},o,function(res){
                        global.set('saving',true);
                        $timeout(function(){
                            global.set('saving',false);
                        },1500)
                    }
                );
            },defer)
        };
    }
    return {
        scope: {},
        bindToController: true,
        controller: tagCtrl,
        controllerAs: '$ctrl',
        restrict:"E",
        templateUrl:"components/filters/tagEdit.html",
    }
}])

    .directive('filterTagComponent',[function(){
        return {
            restrict:"E",
            templateUrl:"components/filters/filterTag.component.html",
        }
    }])
    .directive('filterComponent',[function(){
        return {
            restrict:"E",
            templateUrl:"components/filters/filter.component.html",
        }
    }])
/*.directive('bindFilterToCategory1',['Sections','Category',function(Sections,Category){
    return {
        restrict:"E",
        scope:{
            id:'@',
        },
        templateUrl:"components/filters/bindFiltersToCategory.html",
        link:function($scope,element,attrs){
            console.log($scope.id)
            function checkFilters(section){
                section.showCheck=false;
                if(section.categories && section.categories.length){
                    section.checkAll=true;
                    section.showCheck=true;
                    section.categories.forEach(function(category){
                        if(category.filters.indexOf($scope.id)>-1){
                            category.checked=true;
                        }else{
                            section.checkAll=false;
                        }
                    })
                }
                if(section.child && section.child.length){
                    section.checkAll=false;
                    section.child.forEach(function(s){
                        if (checkFilters(s)){
                            section.showCheck=true;
                        }
                    })
                }
                return section.showCheck;
            }
            function checkCategory(category){
                if (category.checked){
                    if(!category.filters ){
                        category.filters=[];
                        category.filters.push($scope.id)
                    }else{
                        console.log(category.filters.indexOf($scope.id))
                        if(category.filters.indexOf($scope.id)<0){
                            category.filters.push($scope.id)
                        }
                    }
                }else{
                    if(category.filters && category.filters.length){
                        var i = category.filters.indexOf($scope.id);
                        if(i>-1){
                            category.filters.splice(i,1)
                        }
                    }
                }
                Category.save({update:'filters'},category);
            }
            $scope.bindFilter=function(category,section){
                //console.log(category)
                checkCategory(category)
                section.checkAll=true;
                for(var i= 0,l=section.categories.length;i<l;i++){
                    if(section.categories[i].filters.indexOf($scope.id)<0){
                        section.checkAll=false;
                        break;
                    }
                }
            }
            $scope.bindFilterForSection=function(section,checkAll){
                section.checkAll=checkAll;
                if(section.categories && section.categories.length){
                    section.categories.forEach(function(category){
                        category.checked=checkAll;
                        checkCategory(category)
                    })
                }

                if(section.child && section.child.length){
                    section.child.forEach(function(s){
                        $scope.bindFilterForSection(s,checkAll)
                    })
                }
            }
            function foo(s){
                if (s.child && s.child.length){
                    for(var i = 0,l= s.child.length;i<l;i++){
                        var section=s.child[i];
                        //console.log( 'section - ',section.name,' ',section.showCheck)
                        if (section.showCheck){
                            if (section.child && section.child.length){
                                section.checkAll=foo(section);
                                if (!section.checkAll){
                                    return false;
                                }
                                //console.log( 'checkAll - ',section.name,' ',section.checkAll)
                            } else{
                                //console.log('end section ', section.name,' ',section.checkAll)
                                if(!section.checkAll){
                                    return false;
                                }
                            }
                        }
                    }
                    return true;
                }

            }

            Sections.query(function(res){
                res.shift();
                $scope.sections=res.filter(function(el){return el.level===0});
                $scope.sections.forEach(checkFilters)

                $scope.sections.forEach(function(s){
                    if(s.showCheck){
                        s.checkAll=foo(s);
                    }
                })

                console.log($scope.sections);
            });

        }
    }
}])*/



