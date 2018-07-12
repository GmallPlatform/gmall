'use strict';
(function(){

    angular.module('gmall.services')
        .service('Helper', helperService);
    helperService.$inject=['$resource','$uibModal','$q','exception'];
    function helperService($resource,$uibModal,$q,exception){
        var Items= $resource('/api/collections/Helper/:_id',{_id:'@_id'});
        var _items={};
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            getHelp:getHelp
        }
        function getList(paginate,query){
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            if(_items[id]){return $q.when(_items[id])}
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                _items[id]=response;
                return response;
            }
            function getItemFailed(error) {
                _items[id]=null;
                return $q.reject(error);
            }
        }
        function getHelp(state){
            $q.when()
                .then(function(){
                    return getItem(state)
                })
                .then(function(helper){
                    $uibModal.open({
                        animation: true,
                        templateUrl:'components/helper/helperModal.html',
                        controller: function($uibModalInstance,$sce,desc){
                            var self=this;
                            self.desc=desc;
                            /*self.trustHtml=function(text){
                                console.log($sce.trustAsHtml(text))
                                return $sce.trustAsHtml(text)
                            }*/
                            self.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                        },
                        resolve:{desc:function(){return helper.desc}},
                        controllerAs:'$ctrl',
                    });

                    /*return $q(function(resolve,reject){
                        var modalInstance = $uibModal.open({
                            animation: true,
                            template:'ssdsdsd',
                            controller: function($uibModalInstance,desc){
                                var self=this;
                                self.desc=desc;
                                self.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            resolve:{desc:function(){return helper.desc}},
                            controllerAs:'$ctrl',
                        });
                        modalInstance.result.then(function () {resolve()}, function (err) {reject(err)});
                    })*/
                })
                .catch(function(err){
                    var msg='ошибка';
                    if(err){
                        if(typeof err =='object'){
                            if(err.data){
                                msg=err.data
                            }else if(err.message){
                                msg=err.message;
                            }
                        }else{msg=err}
                    }
                    err = err.data||err
                    exception.catcher('получение справки')(msg)
                })
        }


    }
})()

