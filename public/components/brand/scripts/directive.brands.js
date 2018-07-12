'use strict';
angular.module('gmall.directives')
    .directive('brandsList',['$anchorScroll','Brands','BrandTags','$q','SelectCategory','$timeout','global','$http','Confirm',function($anchorScroll,Brands,BrandTags,$q,SelectCategory,$timeout,global,$http,Confirm){
        return {
            restrict:"E",
            templateUrl:"components/brand/brands.html",
            link:function($scope,element,attrs){

                $scope.$on('changeLang',function(){
                    activate()
                })

                activate();
                function activate() {
                    $q.when()
                        .then(function(){
                            var q=$q.defer();
                            Brands.query(function(res){
                                res.shift();
                                $scope.brands=res;

                                q.resolve()
                            },function(err){q.reject(err)})
                            return q.promise;
                        } )
                        .then(function(){
                            var q=$q.defer();
                            BrandTags.query(function(res){
                                res.shift();
                                $scope.brandTags=res;
                                q.resolve()
                            },function(err){q.reject(err)})
                            return q.promise;
                        } )
                        .then(function(){
                            return;
                            $scope.brands.forEach(function(brand){
                                /*brand.tags=[];
                                $scope.brandTags.forEach(function(tag){
                                    if(tag.brand==brand._id){
                                        tag.index=brand.tags.length;
                                        brand.tags.push(tag);
                                    }
                                })*/
                                brand.showTags=true;
                                if(!brand.tags){brand.tags=[];}

                                if(!brand.tags.length){
                                    $scope.brandTags.forEach(function(tag){
                                        if(tag.brand==brand._id){
                                            tag.index=brand.tags.length;
                                            brand.tags.push(tag);
                                        }
                                    })
                                }else{
                                    brand.tags.forEach(function(tag,i){
                                        tag.index=i;
                                    })
                                }
                            })
                        })
                }

                $scope.fixBrands=function(){
                    Confirm('Подтверждаете?')
                        .then(function () {
                            $scope.fixBrandsDesable=true;
                            var data = {}
                            return $http({
                                method: "post",
                                url: '/api/fixedDB/brand',
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
                // управление фильтрами*************
                //**********************************
                $scope.addNewBrand=function(newBrand){
                    if(!newBrand.name){return};

                    var brand={name:newBrand.name.substring(0,25),
                        index:0,tags:[],

                    }
                    newBrand.name=''
                    //brand.focus=true;
                    $scope.brands.unshift(brand);
                    Brands.save(brand,function(res){
                        console.log(res);
                        brand._id=res.id;
                        //Filter.save(filter)
                    })
                }
                $scope.deleteBrand=function(brand,idx){
                    Brands.delete({id:brand._id},function(res){
                        $scope.brands.splice(idx,1)
                    },function(err){
                        console.log(err)
                    })

                }
                $scope.saveBrand = function(brand,field){
                    if (!brand.name){return};
                    //brand.url=brand.name.getUrl();
                    var o={_id:brand._id}
                    o[field]=brand[field]
                    Brands.save({update:field},o,function(res){
                        global.set('saving',true);
                        $timeout(function () {
                            global.set('saving',false);
                        },1500)
                    })
                }
                $scope.dropBrandCallback=function(brand){
                    console.log(brand)
                    $timeout(function(){
                        $scope.brands.forEach(function(brand,idx){
                            brand.index=idx+1;
                            Brands.save({update:'index'},brand)
                        })
                    },200)
                    return brand;
                }
                //********************************************************
                $scope.addTag=function(brand,newTag){
                    if(!newTag.name){return}
                    var tag={name:newTag.name.substring(0,25),
                        brand:brand._id,actived:true}
                    newTag.name='';
                    brand.tags.unshift(tag);
                    //tag.focus=true;
                    BrandTags.save(tag,function(res){
                        //console.log(res);
                        tag._id=res.id;
                        Brands.save({update:'tags'},{_id:brand._id,tags:brand.tags.map(function(el){return el._id})},function(res){})
                        //Filter.save(filter)
                    })

                }
                $scope.saveTag=function(tag,field){
                    if (!tag.name){return};
                    //tag.url=tag.name.getUrl();
                    var o={_id:tag._id}
                    o[field]=tag[field]
                    BrandTags.save({update:field},o,function(res){
                        global.set('saving',true);
                        $timeout(function () {
                            global.set('saving',false);
                        },1500)
                    },function(err){});
                }

                $scope.deleteTag=function(brand,idx){
                    BrandTags.delete({id:brand.tags[idx]._id},function(res){
                        var tag = brand.tags.splice(idx,1);
                        Brands.save({update:'tags'},{_id:brand._id,tags:brand.tags.map(function(el){return el._id})},function(res){})
                    },function(err){
                        console.log(err)
                    })
                }
                $scope.dropTagCallback = function(tag,index,brand) {
                    console.log(brand.tags.map(function(e){return e.name}))
                    $timeout(function(){
                        Brands.save({update:'tags'},{_id:brand._id,tags:brand.tags.map(function(el){return el._id})},function(res){
                            //console.log(res)
                        })
                        if (tag.brand!=brand._id){
                            brand.tags.forEach(function(tag,i){tag.index=i})
                            var oldBrand=$scope.brands.getObjectFromArray('_id',tag.brand);
                            Brands.save({update:'tags'},{_id:oldBrand._id,tags:oldBrand.tags.map(function(el){return el._id})},function(res){})
                            tag.brand=brand._id;
                            BrandTags.save({update:'brand'},tag,function(res){})
                        }
                    },450)
                   /* console.log(filter.tags)
                    console.log('dropTagCallback')*/
                    return tag;

                };
                $scope.tagMoved=function(brand,tag,idx){
                    if(idx==tag.index){
                        brand.tags.splice(idx,1)
                    } else {
                        brand.tags.splice(idx+1,1)
                    }
                    brand.tags.forEach(function(tag,i){
                        tag.index=i
                    })

                    //console.log(filter.tags)

                }

                // привязка к категориям
                $scope.selectCategory=function(id,revers){
                    if(revers){
                        SelectCategory.bindCategoryForFilterBrandCol(id,'categories',revers)
                    } else{
                        SelectCategory.bindCategoryForFilterBrandCol(id,'brands')
                    }

                }
            }
        }
    }])
    .directive('brandEdit',function(){
        return {
            restrict:"E",
            templateUrl:"components/brand/brandEdit.html",
            scope: {},
            bindToController: true,
            controller: brandEditCtrl,
            controllerAs: '$ctrl',
        }
    })



.directive('brandTagEdit',brandTagEdit);

brandEditCtrl.$inject=['$anchorScroll','Brands','global','$q','exception','$stateParams','$scope','$timeout'];
function brandEditCtrl($anchorScroll,Brands,global,$q,exception,$stateParams,$scope,$timeout){
    var self=this;
    self.Items=Brands;
    self.global=global;
    self.saveField=saveField;
    activate();
    $scope.$on('changeLang',function(){
        activate()
    })

    function activate(){
        $q.when()
            .then(function(){
                return self.Items.get({id:$stateParams.id}).$promise;
            })
            .then(function(res){
                self.item=res
                console.log(self.item)
            })
            .catch(function(err){
               if(err){
                   exception.catch('получение данных')(err)
               }
            })
    }
    function saveField(field,defer){
        defer =defer||0
        setTimeout(function(){
            var o={_id:self.item._id};
            o[field]=self.item[field]
            self.Items.save({update:field},o,function(){
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
            });
        },defer)
    };
}


function brandTagEdit(){
    return {
        scope: {
            min: '='
        },
        bindToController: true,
        controller: brandTagEditCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/brand/collectionEdit.html',
        restrict: 'EA',
        //link: linkFunc
    }
    /*function linkFunc(scope, el, attr, ctrl) {

    }*/
}
brandTagEditCtrl.$inject=['BrandTags','$q','$state','global','$stateParams','$scope','$timeout'];
function brandTagEditCtrl(BrandTags,$q,$state,global,$stateParams,$scope,$timeout){
    var vm=this;
    vm.Items=BrandTags;
    self.global=global;
    vm.saveField=saveField;
    //*******************************************************
    activate($stateParams.id);
    //*******************************************************
    $scope.$on('changeLang',function(){
        activate($stateParams.id);
    })
    function activate(id) {
        return getItem(id).then(function() {
            //console.log('Activated item View');
        });
    }
    function getItem(id) {
        return vm.Items.get({id:$stateParams.id} ).$promise.then(function(res){
            vm.item=res;
        },function(err){

        })
    }
    function saveField(field,defer){
        defer =defer||0
        setTimeout(function(){
            var o={_id:vm.item._id};
            o[field]=vm.item[field];
            vm.Items.save({update:field},o,function(){
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
            });
        },defer)
    };
}
