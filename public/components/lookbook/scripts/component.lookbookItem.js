'use strict';
(function(){

    angular.module('gmall.directives')
        .directive('lookbookItem',lookbookItemDirective)
    function lookbookItemDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: lookbookItemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/lookbook/lookbookItem.html',
        }
    }
    lookbookItemCtrl.$inject=['Lookbook','$stateParams','$q','global','exception','Photo','$timeout','$scope','$uibModal'];
    function lookbookItemCtrl(Lookbook,$stateParams,$q,global,exception,Photo,$timeout,$scope,$uibModal){
        //console.log('???');
        var self = this;
        self.Items=Lookbook;
        self.item={};
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.datePickerOptions ={
            locale: {
                applyClass: 'btn-green',
                applyLabel: "Выбрать",
                fromLabel: "от",
                toLabel: "до",
                cancelLabel: 'Отменить',
                customRangeLabel: 'Прозвольный диапазон',
                format:"DD-MMMM-YYYY",
                daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
                firstDay: 1,
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                    'Ноябрь', 'Декабрь'
                ]
            },
            singleDatePicker: true,
            date:{
                startDate: null, endDate: null
            }
        }
        self.saveField=saveField;
        self.movedSlide=movedSlide;
        self.deleteSlide=deleteSlide;
        self.filterBlocks=filterBlocks;
        self.editSlide=editSlide;
        //********************activate***************************
        activate();
        $scope.$on('changeLang',function(){
            activate()
        })
        //*******************************************************
        function activate() {
            //console.log(id)
            return getItem($stateParams.id).then(function() {
                //console.log('Activated item View');
            } ).catch(function(err){
                err = err.data||err
                exception.catcher('получение объекта')(err)
            });
        }
        function getItem(id) {
            //console.log(id)
            return self.Items.getItem(id)
                //console.log(id)
                .then(function(data) {
                    for(var key in data){
                        self.item[key]=data[key]
                    }
                    //self.item = data;
                    return self.item;
                } ).catch(function(err){
                    console.log(err)
                    return $q.reject(err)
                });
        }
        function saveField(field,defer){
            //console.log(field)
            defer =defer||0
            setTimeout(function(){
                var o={_id:self.item._id};
                o[field]=self.item[field]
                self.Items.save({update:field},o,function () {
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)
                });
            },defer)
        };
        function editSlide(index){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/staticPage/editSlide.html',
                controller: function(slide,$uibModalInstance){
                    var self=this;
                    self.item=slide;
                    self.ok=function(){
                        console.log(self.item)
                        $uibModalInstance.close(self.item);
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                size:'lg',
                resolve: {
                    slide: function () {
                        return self.item.imgs[index];
                    },
                }
            });
            modalInstance.result.then(function (slide) {
                //console.log(slide)
                self.saveField('imgs')
            }, function () {
            });
        }
        var keyParts=global.get('store').val.template.stat.parts.filter(function (el) {
            return el.is
        }).map(function (el) {
            return el.name
        });
        //console.log(keyParts)
        function filterBlocks(item) {
            return keyParts.indexOf(item.key)>-1
        }

        function movedSlide(){
            self.item.imgs.forEach(function(el,i){
                el.index=i;
            })
            self.saveField('imgs')
        }
        function deleteSlide(index){
            //var data={file:images.img,id:self.item._id,_id:'fileDeleteFromImgs'}
           // self.Items.save(data).$promise
//console.log(self.item.imgs,index)
                Photo.deleteFiles('Lookbook',[self.item.imgs[index].img])
            .then(function(response) {
                self.item.imgs.splice(index,1)
                self.saveField('imgs')
            }, function(err) {
                console.log(err)
            });
        }
    }
})()
