'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('material',materialDirective)


    function materialDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'bookkeep/components/material/material.html',
        }
    }
    itemCtrl.$inject=['Material','$stateParams','global','$q','$uibModal','$timeout','$scope','Confirm']
    function itemCtrl(Items,$stateParams,global,$q,$uibModal,$timeout,$scope,Confirm){
        var self = this;
        self.Items=Items;
        self.global=global;
        self.create=create;
        self.item={}
        self.unitOfMeasure=global.get('unitOfMeasure').val
        if(self.unitOfMeasure && self.unitOfMeasure.length){
            self.item.unitOfMeasure=self.unitOfMeasure[0]
        }



        function create(form) {
            console.log(form)
            if(!form.$valid){return}

            $q.when()
                .then(function(){
                    return self.Items.save(self.item).$promise
                } )
                .then(function(res){
                    self.item={}
                })
                .then(function(){
                    //$state.go('frame.accList.item',{id:self.newItem._id})
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)
                })
                .catch(function(err){
                    exception.catcher('создание материала')(err)
                })
        }





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