'use strict';
(function(){

    angular.module('gmall.services')
        .directive('papsItem',itemDirective)
        .directive('papsItemTemplate',itemDirectiveTemplate);


    function itemDirectiveTemplate(global){
        //var s=(global.get('store').val.template.paps)?global.get('store').val.template.paps:'';
        return {
            scope: {},
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl:'views/template/partials/paps/paps.html',
            restrict:'E'
        }
    }
    function itemDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/paps/papsItem.html',
        }
    }
    itemCtrl.$inject=['Paps','$stateParams','$q','$uibModal','exception','global','$timeout','$scope','$anchorScroll'];
    function itemCtrl(Paps,$stateParams,$q,$uibModal,exception,global,$timeout,$scope,$anchorScroll){
        var self = this;
        self.Items=Paps;
        self.mobile=global.get('mobile' ).val;
        self.saveField=saveField;

        //********************activate***************************
        activate();
        $scope.$on('changeLang',function(){
            activate()
        })
        //*******************************************************
        function activate() {
            $anchorScroll()
            return getItem($stateParams.id).then(function() {
               /* console.log(id)
                console.log(ga)*/
            }).catch(function(err){
                err = err.data||err
                exception.catcher('получение post action page')(err)
            });
        }
        function getItem(id) {
            return self.Items.getItem(id)
                .then(function(data) {
                    self.item = data;
                    return self.item;
                } ).catch(function(err){
                    return $q.reject(err)
                });
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
})()