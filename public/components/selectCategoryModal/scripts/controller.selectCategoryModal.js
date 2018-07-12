"use strict";
angular.module('gmall.controllers')
 // for stuff edit
.controller('selectCategoryModalCtrl', function ($scope, $uibModalInstance,$q,Sections,categoryId) {
    $scope.categoryId=categoryId;
    console.log($scope.categoryId)
    $q.when().then(function(){
            return Sections.getSections();
        } )
        .then(function(sections){
            $scope.sections = sections;
        })
    $scope.selectCategory = function (selectedCategory) {
        $uibModalInstance.close(selectedCategory);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})
// for filters brans collections edit
.controller('bindCategoryToFilterCtrl', function ($scope, $uibModalInstance,Category,$resource,$q, sections,field,id,revers) {
    $scope.id=id;
    $scope.revers=revers;
    sections.forEach(function(s){
        if(s.categories && s.categories.length){
            s.categories.forEach(function (c) {
                c.checked=false;
            })
        }
        if(s.child && s.child.length){
            s.child.forEach(function (s) {
                if(s.categories && s.categories.length){
                    s.categories.forEach(function (c) {
                        c.checked=false;
                    })
                }
            })
        }

    })
    function checkField(section){
        section.showCheck=false;
        if(section.categories && section.categories.length){
            section.checkAll=true;
            section.showCheck=true;
            section.categories.forEach(function(category){
                if(!$scope.revers){
                    if(category[field].indexOf($scope.id)>-1){
                        category.checked=true;
                    }else{
                        section.checkAll=false;
                    }
                }else{
                    if($scope.item[field].indexOf(category._id)>-1){
                        category.checked=true;
                    }else{
                        section.checkAll=false;
                    }
                }

            })
        }
        if(section.child && section.child.length){
            section.checkAll=false;
            section.child.forEach(function(s){
                if (checkField(s)){
                    section.showCheck=true;
                }
            })
        }
        return section.showCheck;
    }
    function checkCategory(category){
        if (category.checked){
            if(!$scope.revers){
                if(!category[field] ){
                    category[field]=[];
                    category[field].push($scope.id)
                }else{
                    if(category[field].indexOf($scope.id)<0){
                        category[field].push($scope.id)
                    }
                }
            }else{
                if($scope.item[field].indexOf(category._id)<0){
                    $scope.item[field].push(category._id)
                }
                category=$scope.item;
            }

        }else{
            if(!$scope.revers){
                if(category[field] && category[field].length){
                    var i = category[field].indexOf($scope.id);
                    if(i>-1){
                        category[field].splice(i,1)
                    }
                }
            }else{
                if($scope.item[field] && $scope.item[field].length){
                    var i = $scope.item[field].indexOf(category._id);
                    if(i>-1){
                        $scope.item[field].splice(i,1)
                    }
                }
                category=$scope.item;
            }
        }
        var o={_id:category._id}
        o[field]=category[field].filter(function(el){return el;})
        Category.save({update:field},category);
    }
    $scope.bindFilter=function(category,section){
        checkCategory(category)
        section.checkAll=true;
        for(var i= 0,l=section.categories.length;i<l;i++){
            if(!$scope.revers){
                if(section.categories[i][field].indexOf($scope.id)<0){
                    section.checkAll=false;
                    break;
                }
            }else{
                if($scope.item[field].indexOf(section.categories[i]._id)<0){
                    section.checkAll=false;
                    break;
                }
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


    $q.when()
        .then(function(){
            var q=$q.defer();
            if($scope.revers){
                var Item = $resource('/api/collections/BrandTags/:id',{id:'@_id'});
                Item.get({id:$scope.id},function(res){
                    if(!res[$scope.field]){
                        res[$scope.field]=[]
                    }
                    $scope.item=res;
                    q.resolve()
                })
                Category=Item;
            }else{
                q.resolve()
            }
            return q.promise
        })
        .then(function(){
            $scope.sections=sections.filter(function(el){return el.level===0});
            $scope.sections.forEach(checkField)
            $scope.sections.forEach(function(s){
                if(s.showCheck){
                    s.checkAll=foo(s);
                }
            })
        })


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})
.controller('selectFilterModalCtrl', function ($scope, $uibModalInstance,filter,tags) {
    $scope.filter=filter;
    $scope.allTags=false;
    $scope.changeAllTags=function(criteria){
        filter.tags.forEach(function(tag){
            tag.set=criteria;
        })
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})
.controller('selectBrandModalCtrl', function ($scope, $uibModalInstance,$q,Brands,brandItem,brands) {
    $scope.brandItem=brandItem;
    $scope.brands=brands;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.ok = function (brandItem) {
        $uibModalInstance.close(brandItem);
    };
    $q.when()
        .then(function(){
            var q=$q.defer()
            if(brands && brands.length){
                $scope.brands=brands;
                q.resolve();
            }else{
                Brands.query(function(res){
                    res.shift();
                    $scope.brands=res;
                    q.resolve();
                },function(err){q.reject(err)})
            }
            return q.promise;
        } )


    

})
.controller('selectBrandTagModalCtrl', function ($scope, $uibModalInstance,brandTag,brandTags) {
    setTimeout(function(){
        $scope.brandTag=brandTag;
    },200)
    $scope.brandTags=brandTags;
    console.log(brandTag,brandTags)
    $scope.ok = function (brandTag) {
        $uibModalInstance.close(brandTag);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

})

