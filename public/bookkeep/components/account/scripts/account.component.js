'use strict';
(function(){
angular.module('gmall.directives')
.directive('accountItem',accountItemDirective)


    function accountItemDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'account/components/account/account.html',
        }
    }
    itemCtrl.$inject=['AccountList','$stateParams','global','$q','$uibModal','$timeout','$scope','Confirm']
    function itemCtrl(Items,$stateParams,global,$q,$uibModal,$timeout,$scope,Confirm){
        var self = this;
        self.Items=Items;
        self.type='Account'
        self.global=global;

        activate()

        function activate(){
            self.Items.get({_id:$stateParams.id}).$promise.then(function(res){
                self.item=res
            })
        }

        $scope.$on('changeLang',function(){
            activate();
        })

        function saveField(field,value){
            var defer =100
            setTimeout(function(){
                var o={_id:self.item._id};
                if(typeof value!='undefined'){
                    o[field]=value
                }else{
                    o[field]=self.item[field]
                }

                var query={update:field}
                self.Items.save(query,o,function () {
                    global.set('saving',true)
                    $timeout(function () {
                        global.set('saving',false);
                    },1500)
                });
            },defer)
        };


    }
})()