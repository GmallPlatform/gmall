'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('categoriesForList', categoriesForListDirective)
        .directive('categoriesForListTatiana', categoriesForListTatiana)
        .directive('categoriesForListTemplate', categoriesForListTemplate)
        .directive('categoriesForListTemplate1', categoriesForListTemplate1)
        .directive('categoriesForListTemplate2', categoriesForListTemplate2)
        .directive('categoriesForListTemplate3', categoriesForListTemplate3);

    function categoriesForListTatiana(global) {
        return {
            scope: {
                padding:'='
            },
            restrict:"E",
            bindToController: true,
            controller: categoriesForListCtrl,
            controllerAs: '$ctrl',
            templateUrl:'views/'+global.get('store').val.template.folder+'/partials/category/categoriesForList.html',
        };
    }
    function categoriesForListTemplate() {
        return {
            scope: {
                padding:'='
            },
            restrict:"E",
            bindToController: true,
            controller: categoriesForListCtrl,
            controllerAs: '$ctrl',
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone) {
                    element.append(clone);
                });
            }
            //templateUrl:'views/template/partials/stuffs/categories/categoriesForList.html',
        };
    }
    function categoriesForListTemplate1() {
        return {
            scope: {
                padding:'='
            },
            restrict:"E",
            bindToController: true,
            controller: categoriesForListCtrl,
            controllerAs: '$ctrl',
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone) {
                    element.append(clone);
                });
            }
            //templateUrl:'views/template/partials/stuffs/categories/categoriesForList1.html',
        };
    }
    function categoriesForListTemplate2() {
        return {
            scope: {
                padding:'='
            },
            restrict:"E",
            bindToController: true,
            controller: categoriesForListCtrl,
            controllerAs: '$ctrl',
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone) {
                    element.append(clone);
                });
            }
            //templateUrl:'views/template/partials/stuffs/categories/categoriesForList2.html',
        };
    }
    function categoriesForListTemplate3() {
        return {
            scope: {
                padding:'='
            },
            restrict:"E",
            bindToController: true,
            controller: categoriesForListCtrl,
            controllerAs: '$ctrl',
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone) {
                    element.append(clone);
                });
            }
            //templateUrl:'views/template/partials/stuffs/categories/categoriesForList3.html',
        };
    }
    function categoriesForListDirective() {
        return {
            scope: {
                padding:'='
            },
            restrict:"E",
            bindToController: true,
            controller: categoriesForListCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/categoriesForList/categoriesForList.html'
        };
    }
    categoriesForListCtrl.$inject=['$stateParams','$state','$q','$location','global']
    function categoriesForListCtrl($stateParams,$state,$q,$location,global){
        if(!global.get('store').val){return}
        //console.log('sss')
        var self = this;
        var $ctrl=self;
        self.getFilterTagsPhoto=getFilterTagsPhoto;


        self.global=global;
        self.prop={};
        self.category=$stateParams.categoryUrl;
        self.parentSection=global.get('parentSection').val;
        //console.log(self.parentSection)
        self.breadcrumbs=global.get('breadcrumbs').val;
        //console.log(self.padding)
        self.changeCategory=changeCategory;
        self.deleteCrumb=deleteCrumb;
        self.checkInnerData=checkInnerData;
        self.queryTag=null;
        if($stateParams.queryTag){
            if(global.get('store').val.saleTag && global.get('store').val.saleTag==$stateParams.queryTag){
                self.queryTag='sale'
            }else if(global.get('store').val.newTag && global.get('store').val.newTag==$stateParams.queryTag){
                self.queryTag='new'
            }
        }
        active();

        function active(){}
        function changeCategory(category,tag){
            var brand = ($stateParams.brand)?brand=$stateParams.brand:null
            var queryTag=null;
            if(tag){
                if(tag=='sale'){
                    queryTag=global.get('store').val.saleTag
                }else if(tag='new'){
                    queryTag=global.get('store').val.newTag
                }
            }
            var o={
                groupUrl:$stateParams.groupUrl,
                categoryUrl:category,
                queryTag:queryTag,
                brand:brand,
                brandTag:null,
                searchStr:undefined,
            };
            //console.log(o)
            /*$state.transitionTo($state.current, o, {
                reload: true, inherit: false, notify: false
            });*/
            //$state.reload()
            $state.go('stuffs',o,{reload:true,lacation:true,inherit: false, notify: true});
        }
        function deleteCrumb(index){
            change(self.breadcrumbs.splice(index,1)[0].type)
            function change(type){
                var query = self.breadcrumbs.reduce(function(q,item){
                    if(item.type==type){
                        if(q){q+='__'}
                        q+=item.url;
                    }
                    return q;
                },'')
                if(!query){
                    query=null;
                }
                $location.search(type,query)
            }
        }
        function checkInnerData() {
            if($ctrl.parentSection){
                return $ctrl.parentSection.categories.length && $ctrl.parentSection.categories.filter(function(c){return !c.notActive}).length>1
            }else{return false}

        }
        function getFilterTagsPhoto(url) {
            //console.log(url)
            return global.get('filterTags').val.getOFA('url',url)
        }


    }
})()

