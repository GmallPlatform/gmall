'use strict';
angular.module('gmall.services')
.service('selectStuffModalService', function($uibModal,$q,$state,global){
    this.selectStuff=function(){
        return $q(function(resolve,reject){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/selectStuffModal/selectStuffModal.html',
                controller: function(Stuff,$uibModalInstance){
                    var self=this;
                    self.stuffs=[];
                    self.name='';
                    // select only stuffs with the same category
                    var items={};

                    var paginate={page:0,rows:30,items:0}
                    self.search = function(name){
                        if (name.length<3){return}
                        // console.log(name);
                        Stuff.getList(paginate,query,name).then(function(res){
                            //console.log(res)
                            self.stuffs=res;
                        })
                    }
                    self.selectStuff=function(stuff){
                        $uibModalInstance.close(stuff);
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                size: 'lg',
            });

            modalInstance.result.then(function (stuff) {
                resolve(stuff)
            },function(){
                reject('отказ')
            });
        })

    }
})
