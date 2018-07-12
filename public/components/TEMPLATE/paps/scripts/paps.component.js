'use strict';
(function(){
    angular.module('gmall.services')
        .service('Paps', serviceFunction);
    serviceFunction.$inject=['$resourse'];
    function serviceFunction(){
        
    }
    angular.module('gmall.directives')
        .directive('dateTimeEntry',itemDirective)
    var s=(global.get('store').val.template.paps)?global.get('store').val.template.paps:'';
    return {
        scope: {
        },
        bindToController: true,
        controller: itemCtrl,
        controllerAs: '$ctrl',
        templateUrl:'views/template/partials/paps/paps'+s+'.html',
        restrict:'E'
    }
    itemCtrl.$inject=['Paps','$stateParams'];
    function itemCtrl(Paps,$stateParams){
        var self = this;
        self.Items=Paps;
        self.global=global;
        self.mobile=global.get('mobile' ).val;
        //********************activate***************************
        activate();
        //*******************************************************
        function activate() {
            //getItems();
            getItem()
        }
        function getItem() {
            self.Items.get({_id:$stateParams.url},function(res){
                //console.log(res)
                self.item=res;
            },function(err){
                $state.go('404')
            });

        }
    }
})()
