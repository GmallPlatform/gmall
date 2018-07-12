angular
    .module('gmall.services')
    .factory('Confirm', confirmFactory);

confirmFactory.$inject = ['$q','$uibModal'];

function confirmFactory($q,$uibModal) {
    return service;
    function service(question){
        return $q(function(resolve,reject){
            var options={
                animation: true,
                template : [
                    '<div class="modal-header">',
                        '<h3 class="modal-title text-center" ng-bind="$ctrl.question"></h3>',
                        "<span clacc='icon-cancel-img'></span>",
                    '</div>',
                    '<div class="modal-body confirm">',
                    '<form ng-submit="$ctrl.ok()">'+
                    '<button autofocus class="btn btn-project btn-border  btn-modal pull-right" type="reset" ng-click="$ctrl.cancel()">{{global.get("langOrder").val.noo}}</button>',
                    '<button class="btn btn-project btn-modal pull-left" type="submit">{{global.get("langOrder").val.yes}}</button>',
                    '</form>'+
                    '<div class="clearfix"></div>',
                    '</div>'
                ].join(''),
                controller: function($uibModalInstance,question){
                    var self=this;
                    self.question=question
                    self.ok=function(){
                        $uibModalInstance.close();
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                size: 'sm',
                resolve:{
                    question: function(){return question}
                }
            }
            $uibModal.open(options).result.then(function () {resolve();},function () {reject()});
        })


    }
}
