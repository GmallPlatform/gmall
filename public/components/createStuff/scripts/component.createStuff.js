'use strict';
angular.module('gmall.services')
.service('createStuffService', function($uibModal,$q,$state,global){
    this.cloneStuff=function(stuff,clone){
        if(!global.get('seller' ).val){return};
        stuff.seller = global.get('seller' ).val
        console.log(global.get('seller'));
        stuff.brand=(stuff.brand && stuff.brand._id)?stuff.brand._id:stuff.brand;
        stuff.brandTag=(stuff.brandTag && stuff.brandTag._id)?stuff.brandTag._id:stuff.brandTag;
        stuff.category=(stuff.category && stuff.category._id)?stuff.category._id:stuff.category;
        stuff.sortsOfStuff=(stuff.sortsOfStuff && stuff.sortsOfStuff._id)?stuff.sortsOfStuff._id:stuff.sortsOfStuff;
        delete stuff._id;
        delete stuff.url;
        delete stuff.gallery;
        delete stuff.setTagsValue;
        delete stuff.sortsOfStuff;
        if (stuff.stock){
            for(var key in stuff.stock){
                stuff.stock[key].quantity=1;
            }
        }
        //console.log(stuff)
        return $q(function(resolve,reject){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl:'components/createStuff/cloneStuffModal.html',
                controller: function($scope,stuff,$uibModalInstance,clone){
                    var self=this;
                    self.stuff=stuff;
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.clone=clone;
                    $scope.$watch('clone',function(n){
                        //console.log(n)
                        if(n=='ready'){
                            $uibModalInstance.close(self.stuff);
                        }
                    })

                },
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    stuff: function () {
                        return stuff;
                    },
                    clone: function () {
                        return clone;
                    },
                }
            });
            modalInstance.result.then(function (stuff) {
                resolve(stuff)
            },function(){
                reject('отказ')
            });
        })

    }
})

.directive('createNewStuff', function(){
    function createStuffCtrl($uibModal,$q,Stuff,$state){
        var self = this;
        var $ctrl=self;

       // console.log(self.goToStuff)

        self.categoryDisabled=true;
        self.selectCategory=function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/selectCategoryModal/selectCategoryModal.html',
                controller: 'selectCategoryModalCtrl',
                size: 'lg',
                resolve: {
                    categoryId: function () {
                        return null;
                    }
                }
            });
            modalInstance.result.then(function (selectedCategory) {
                if(!self.stuff.category){
                    self.categoryDisabled=false
                    setTimeout(function(){
                        $('#createStuffCategory').trigger("change");
                        self.categoryDisabled=true;
                    },100)
                }

                self.stuff.category=selectedCategory;
            },function(){});
        }
        self.createNewStuff = function(){
            if(!self.stuff.category){
                self.alertMessage2=true;
                setTimeout(function(){
                    console.log('))))')
                    self.alertMessage2=false;
                },3000)
                return;
            }
            if(!self.stuff.name){
                self.alertMessage2=true;
                setTimeout(function(){
                    self.alertMessage2=false;
                },3000)
                return;
            }
            self.stuff.name=self.stuff.name.substring(0,50);
            if(self.stuff.artikul){
                self.stuff.artikul=self.stuff.artikul.substring(0,50);
            }


            if(!self.clone && self.stuff.category && self.stuff.category._id){
                self.stuff.category=self.stuff.category._id;
            }

            $q.when()
                .then(function(){
                    return $q(function(resolve,reject){
                        Stuff.Items.save(self.stuff,function(res){
                            //self.stuff={name:'',actived:false};
                            self.stuff._id=res.id;
                            self.stuff.url=res.url;
                            resolve(res.url);
                        },function(err){reject(err)})
                    })
                })
                .then(function(url){
                    self.clone='ready'
                })
                .then(function(){
                    return
                })
                .catch(function(err){
                    console.log(err)
                })

        }
    }
    return {
        scope: {
            stuff: '=',
            clone:'=',
            /*goToStuff:"@",
            reloadList:'&'*/
        },
        bindToController: true,
        controller: createStuffCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/createStuff/createStuff.html'
    };
})