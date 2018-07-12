'use strict';
(function() {
    angular.module('gmall.directives')
        .directive('maskStuff', maskStuff)


    function maskStuff() {
        return {
            scope: {},
            restrict: "E",
            bindToController: true,
            controller: maskStuffCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/SEO/maskStuff/maskStuff.html',
        }
    }
    maskStuffCtrl.$inject=['$q','Sections','global','$timeout']
    function maskStuffCtrl($q,Sections,global,$timeout) {
        //console.log('maskStuffCtrl')
        var self=this;
        self.oneArr=['сайт','доменное имя','группа','категория','бренд','коллекция','товар','артикул','цена']
        self.twoArr=['дефис (-)','вертикаль (|)','запятая (,)','пробел ( )','точка (.)','восклицательный знак (!)']
        self.threeArr=['maskAddWord_bay','maskAddWord_order','maskAddWord_service']
        self.mask=[];
        self.addMaskElement=addMaskElement;
        self.changeGroup=changeGroup;
        self.removeElementFromMask=removeElementFromMask;
        /*console.log(global.get('lang').val)
        console.log(global.get('langForm').val)*/
        function addMaskElement() {
            if(self.maskElement && (self.twoArr.indexOf(self.maskElement)>-1 ||self.group.mask.indexOf(self.maskElement)<0)){
                self.group.mask.push(self.maskElement);
                self.maskElement=null;
                saveField()
            }
        }
        function changeGroup() {
            $q.when()
                .then(function () {
                    return Sections.select()
                })
                .then(function (group) {
                    //group.mask=[];
                    self.group=group;
                    if(!self.group.mask){self.group.mask=[];}
                })
        }
        function saveField(){
            var o = {_id:self.group._id,mask:self.group.mask}
            return Sections.savePure({update:'mask'},o).$promise.then(function(){
                console.log('saved')
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)

            },function(err){console.log(err)});
        };
        function removeElementFromMask(i) {
            self.group.mask.splice(i,1)
            saveField();
        }
    }
})()
