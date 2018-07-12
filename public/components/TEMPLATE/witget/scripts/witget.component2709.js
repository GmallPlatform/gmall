'use strict';
(function(){
    angular.module('gmall.services')
        .service('Witget', serviceFunction);
    serviceFunction.$inject=['$uibModal','$q','$state','$timeout'];
    function serviceFunction($uibModal,$q,$state,$timeout){
        return {
            show:show,
        }
        function show(item,delay){
            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    templateUrl: 'components/TEMPLATE/witget/index.html',
                    controller: function($uibModalInstance,item){
                        var self=this;
                        self.item=item;
                        self.modalClose=$uibModalInstance.close;
                        self.ok=function(state){
                            $uibModalInstance.close(state);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    resolve:{item:function(){return item}},
                    controllerAs:'$ctrl',
                }
                if (delay){
                    if(item.delay){
                        delay=Number(item.delay)*1000;
                    }else{
                        delay=0;
                    }
                }else{
                    delay=0;
                }
                //console.log(item.delay,delay)
                $timeout(function(){
                    $uibModal.open(options ).result.then(function () {
                        resolve()
                    }, function (err) {
                        reject(err)
                    })
                },delay)

                //var modalInstance = $uibModal.open(options);


               /* modalInstance.result.then(function () {
                    //if(state){$state.go(state)}
                    resolve()
                }, function (err) {
                    reject(err)
                });*/
            })

        }
    }
})()
