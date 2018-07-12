'use strict';
(function(){

    angular.module('gmall.services')
        .service('Master', serviceFoo);
    serviceFoo.$inject=['$resource','$uibModal','$q','global'];
    function serviceFoo($resource,$uibModal,$q,global){
        var Items= $resource('/api/collections/Master/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            create:create,
        }
        function getList(paginate,query){
           if(!paginate){
               paginate={page:0}
           }
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return Items.query(data).$promise
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
                //console.log(response)
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                //.catch(getItemFailed);
            function getItemComplete(response) {
                if(response && response.blocks && response.blocks.length){
                    response.blocks.forEach(function (b) {
                        if(b.type=='stuffs'){
                            if(b.stuffs && b.stuffs.length){
                                b.imgs=b.stuffs.map(function(s){
                                    if(s.gallery && s.gallery.length && s.gallery[0].img){
                                        s.img=s.gallery[0].img;
                                    }
                                    return s;
                                });
                            }else{b.imgs=[]}
                        }
                    })
                }
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/CONTENT/master/createMaster.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.name=''
                        self.ok=function(){
                            $uibModalInstance.close(self.name);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (name) {
                    if(name){
                        resolve(name.substring(0,50))
                    }else{
                        reject()
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
        
        /*selectServiceCtrl.$inject=['$uibModalInstance'];
        function selectServiceCtrl($uibModalInstance){
            var self=this;
            console.log(services )
            //self.services=services;
            self.ok=function(item){
                $uibModalInstance.close(item);
            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }*/
    }
})()
