'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('categoriesForList', categoriesForListDirective)
        .directive('categoriesForListTatiana', categoriesForListTatiana)
        .directive('categoriesForListTemplate', categoriesForListTemplate);

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
    function categoriesForListTemplate(global) {
        var temp;
        if(global.get('store').val.template.stuffsList && global.get('store').val.template.stuffsList.length){
            temp=global.get('store').val.template.stuffsList.getOFA('name','categories')
        }

        var s=(temp && temp.templ)?temp.templ:'';
        return {
            scope: {
                padding:'='
            },
            restrict:"E",
            bindToController: true,
            controller: categoriesForListCtrl,
            controllerAs: '$ctrl',
            templateUrl:function(){
                //console.log(global.get('store').val.template)
                //console.log(global.get('store').val.template.stuffListType)
                var type=global.get('sectionType').val;
                var block=(global.get('store').val.template.stuffListType && global.get('store').val.template.stuffListType[type]
                && global.get('store').val.template.stuffListType[type].parts
                && global.get('store').val.template.stuffListType[type].parts.length)?
                    global.get('store').val.template.stuffListType[type].parts.getOFA('name','categories'):null

                var s = (block && block.templ)?block.templ:'';
                return 'views/template/partials/stuffs/categories/categoriesForList'+s+'.html'
            },


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
    categoriesForListCtrl.$inject=['$stateParams','$state','$q','Sections','global']
    function categoriesForListCtrl($stateParams,$state,$q,Sections,global){
        var self = this;
        var $ctrl=self;
        self.global=global;
        self.prop={};
        self.category=$stateParams.categoryUrl;
        self.breadcrumbs=[];
        //console.log(self.padding)
        self.changeCategory=changeCategory;
        self.deleteCrumb=deleteCrumb;
        active();

        function active(){
            $q.when()
                .then(function(){
                    return Sections.getSections()
                }) // полчение списка разделов
                .then(function(sections){
                    return $q(function(resolve,reject){
                        if($stateParams.groupUrl!='group'){
                            if($stateParams.parentGroup){
                                self.parentSection=angular.copy(Sections.getParentSection($stateParams.parentGroup));
                            }else{
                                self.parentSection=angular.copy(Sections.getParentSection($stateParams.groupUrl));
                            }
                        }
                        //console.log(self.parentSection)
                        self.padding=(self.parentSection && self.parentSection.categories)?self.parentSection.categories.length:null;
                        //console.log(self.padding,self.parentSection)
                        resolve();
                    })
                })// категория
                .then(function(){
                    //console.log(self.parentSection);
                    //console.log(global.get('categories'))
                    if(self.category!='category' && global.get('categories')&& global.get('categories').val){
                        self.categoryData=global.get('categories').val.getOFA('url',self.category)
                        if(self.categoryData){global.set('category',self.categoryData)}
                    }else{
                        global.set('category',null)
                    }
                    if($stateParams.brand && global.get('brands') && global.get('brands').val){
                        self.brandData=global.get('brands').val.getOFA('url',$stateParams.brand)
                    }
                    //console.log(global.get('category'))
                })
                .then(function () {
                    if($stateParams.brand){
                        var ob={type:'brand'}
                        var b = global.get('brands').val.getOFA('url',$stateParams.brand)
                        if(b){
                            ob.name=b.name;
                            self.breadcrumbs.push(ob)

                            for(var i=0;i<self.parentSection.categories.length;i++){
                                var c = self.parentSection.categories[i]
                                if(!c.brands || c.brands.indexOf(b._id)<0){
                                    self.parentSection.categories.splice(i,1)
                                    i--;
                                }
                            }


                        }

                    }
                    if(b && $stateParams.brandTag){
                        var obt={type:'brandTag'}
                        var bt = b.tags.getOFA('url',$stateParams.brandTag)
                        if(bt){
                            obt.name=bt.name;
                            self.breadcrumbs.push(obt)
                        }
                    }
                    if($stateParams.queryTag){
                        var arr = $stateParams.queryTag.split('+');
                        arr.forEach(function (qt) {
                            var qt = global.get('filterTags').val.getOFA('url',qt)
                            if(qt){
                                var oqt={type:'queryTag'}
                                oqt.name=qt.name;
                                oqt.url=qt.url;
                                self.breadcrumbs.push(oqt)
                            }
                            console.log(self.breadcrumbs)
                        })
                    }

                })
                .catch(function(err){
                    console.log(err)
                })
        }



        function changeCategory(category,brandTag,queryTag){
            var categoryList,brand;
            if(category=='category'){categoryList='allCategories'}else{categoryList=undefined}
            if($stateParams.brand){brand=$stateParams.brand}
            //$state.current.reloadOnSearch = true;
            var o={
                groupUrl:$stateParams.groupUrl,
                categoryUrl:category,
                queryTag:queryTag,
                brand:brand,
                brandTag:brandTag,
                categoryList:undefined,
                searchStr:undefined,
                parentGroup:undefined
            };
            console.log(o)
            /*$state.transitionTo($state.current, o, {
                reload: true, inherit: false, notify: false
            });*/
            //$state.reload()
            $state.go($state.current.name,o,{reload:true,lacation:true,inherit: false, notify: true});
        }
        function deleteCrumb(index){
            var crumb=self.breadcrumbs.splice(index,1)
            console.log(crumb)
            switch(crumb[0].type){
                case 'brand':
                    $stateParams.brand=undefined;
                    $stateParams.brandTag=undefined;
                    changeCategory($stateParams.categoryUrl)
                    break;
                case 'brandTag':
                    $stateParams.brandTag=undefined;
                    changeCategory($stateParams.categoryUrl)
                    break;
                case 'queryTag':
                    var queryTag = self.breadcrumbs.reduce(function(q,item){
                        if(item.type=='queryTag'){
                            if(q){q+='/+'}
                            q+=item.url;
                        }
                        return q;
                    },'')
                    if(!queryTag){
                        queryTag=undefined;
                    }
                    changeCategory($stateParams.categoryUrl,$stateParams.brandTag,queryTag)
                    break;
            }
        }

    }
})()

