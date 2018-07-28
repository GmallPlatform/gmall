'use strict';
(function(){
    angular.module('gmall.services')
        .service('Category', categoryService);
    categoryService.$inject=['$resource','$uibModal','$q'];
    function categoryService($resource,$uibModal,$q){



        var Items= $resource('/api/collections/Category/:_id',{_id:'@_id'});
        return {
            //query:getList,
            get:Items.get,
            query:Items.query,
            save:save,
            delete:Items.delete,
            select:select,
            selectWithSection:selectWithSection

        }
        function save(){
            return Items.save.apply(this,arguments).$promise.then(function(){
                
            })
        }
        function getList(query,cb){
            console.log(query)
            Items.query(query,function(res){
                cb(res)
            })

        }
        function select(categoryId,selectSection,sections,forGroupStuffs){
            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    templateUrl: 'components/sections/selectCategoryModal.html',
                    controller: selectCategoryCtrl,
                    size: 'lg',
                    resolve:{
                        categoryId:function(){return categoryId},
                        selectSection:function(){return selectSection},
                        sections:function(){if(sections){return sections}else{return null}},
                        forGroupStuffs:function(){if(forGroupStuffs){return forGroupStuffs}else{return null}}
                    },
                    controllerAs:'$ctrl'
                }
                var modalInstance = $uibModal.open(options);
                modalInstance.result.then(function (selectedItem) {
                    resolve(selectedItem)
                }, function () {
                    //console.log('Modal dismissed at: ' + new Date());
                    reject()
                });
            })
        }

        function selectWithSection(){
            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    templateUrl: 'components/sections/selectCategoryWithSectionModal.html',
                    controller: selectCategoryWithSectionCtrl,
                    size: 'lg',
                    controllerAs:'$ctrl'
                }
                var modalInstance = $uibModal.open(options);
                modalInstance.result.then(function (selectedItem) {
                    resolve(selectedItem)
                }, function () {
                    //console.log('Modal dismissed at: ' + new Date());
                    reject()
                });
            })
        }

    }
    selectCategoryCtrl.$inject=['$q','$uibModalInstance','Sections','categoryId','selectSection','sections','forGroupStuffs'];
    function selectCategoryCtrl($q,$uibModalInstance,Sections,categoryId,selectSection,sections,forGroupStuffs){
        var self=this;
        self.categoryId=categoryId;
        self.selectSection=selectSection;
        $q.when()
            .then(function(){
                if(sections){
                    return sections
                }else{
                    return Sections.getSections();
                }
            })
            .then(function(sections){
                //console.log(sections)
                self.sections = sections.filter(function (s) {
                    if(forGroupStuffs){
                        return s.groupStuffs
                    }else{
                        return !s.groupStuffs
                    }
                });
            })
        self.ok = function (selectedCategory) {
            $uibModalInstance.close(selectedCategory);
        };
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
    selectCategoryWithSectionCtrl.$inject=['$q','$uibModalInstance','Sections'];
    function selectCategoryWithSectionCtrl($q,$uibModalInstance,Sections){
        var self=this;
        $q.when()
            .then(function(){
                return Sections.getSections();
            })
            .then(function(sections){
                //console.log(sections)
                self.sections = sections;
            })
        self.ok = function (selectedCategory) {
            $uibModalInstance.close(selectedCategory);
        };
        self.okSection = function (section) {
            var categories=section.categories;
            $uibModalInstance.close(categories);
        };
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})()


/*
var store = {store:req.store._id};
if (!options.criteria){
    options.criteria= store;
}else{
    if (options.criteria['$and']){
        /!*if(!options.criteria['$and'].some(function(el){
         return Object.keys(el)[0]=='store'
         })){
         options.criteria['$and'].push(store);
         }*!/
        options.criteria['$and'].push(store);
    }else{
        /!*if(Object.keys(options.criteria)[0]!='store'){
         options.criteria={$and:[options.criteria,store]}
         }*!/
        options.criteria={$and:[options.criteria,store]}
    }
}*/
