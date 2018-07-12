'use strict';
(function(){
    angular.module('gmall.services')
        .service('Witget', serviceFunction);
    serviceFunction.$inject=['$uibModal','$q','$state','$timeout','$rootScope'];
    function serviceFunction($uibModal,$q,$state,$timeout,$rootScope){
        return {
            show:show,
        }
        function show(item,delay){
            if(item.showOnes){
                var k = getCookie('witget'+item._id)
                //console.log("getCookie('witget'+item._id)",k)
                if(k){
                    return;
                }else{
                    var options ={
                        path:'/',
                        expires:3600
                    }
                    setCookie('witget'+item._id, '111', options)
                }
            }

            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    templateUrl: 'components/TEMPLATE/witget/index.html',
                    controller: function($scope,$uibModalInstance,item){
                        $scope.flag=false;
                        var self=this;
                        self.item=item;
                        if(item.stuff && item.stuff.name){
                            self.stuff=item.stuff.name+((item.stuff.artikul)?' '+item.stuff.artikul:'')
                        }
                        //console.log(self.stuff)
                        self.ok=function(state){
                            //console.log(state)
                            $uibModalInstance.close(state);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };

                        $scope.$on('closeWitget',function () {
                            $uibModalInstance.close()
                        })
                    },
                    resolve:{item:function(){return item}},
                    controllerAs:'$ctrl',
                    //size: 'lg',
                    windowClass:'modalProject',
                    //windowTopClass:'modalTopProject',
                    backdropClass:'modalBackdropClass',
                    //openedClass:'modalOpenedClass'
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
                    $rootScope.$emit('modalOpened')
                    $uibModal.open(options ).result.then(function () {
                        $rootScope.$emit('modalClosed')
                        resolve()
                    }, function (err) {
                        $rootScope.$emit('modalClosed')
                        reject(err)
                    })
                },delay)
            })

        }
    }
})()
