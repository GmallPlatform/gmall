'use strict';
(function(){

    angular.module('gmall.services')
        .directive('lookbookList',lookbookListDirective)
        .directive('lookbookTemplate',lookbookListTemplateDirective);
    function lookbookListDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: lookbookListCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/lookbook/lookbookList.html',
        }
    };
    lookbookListTemplateDirective.$inject=['global']
    function lookbookListTemplateDirective(global){
        var s=(global.get('store').val.template.newsList)?global.get('store').val.template.newsList:'';
        return {
            scope: {
                actived:'@'
            },
            rescrict:"E",
            bindToController: true,
            controller: lookbookListCtrl,
            controllerAs: '$ctrl',
            templateUrl:'views/template/partials/lookbook/lookbookList'+s+'.html',
        }
    };

    lookbookListCtrl.$inject=['Lookbook','$state','global','exception','Confirm','Photo','$timeout'];
    function lookbookListCtrl(Lookbook,$state,global,exception,Confirm,Photo,$timeout){
        var self = this;
        self.mobile=global.get('mobile' ).val;
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
        self.$state=$state;
        self.Items=Lookbook;
        self.moment=moment;
        self.query={};
        self.paginate={page:0,rows:50,totalItems:0}
        self.newItem={name:'Новая иноформация',actived:false}
        self.getList=getList;
        self.saveField = saveField;
        self.searchItem=searchItem;
        self.createItem=createItem;
        self.deleteItem=deleteItem;
        //*******************************************************
        activate();

        function activate() {
            return getList().then(function() {
                //console.log('Activated news list View');
            });
        }
        function getList() {
            if(!Object.keys(self.query ).length && self.actived){
                self.query={actived:true}
            }
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.items = data;
                    return self.items;
                });
        }
        function searchItem(searchStr){
            if(searchStr){
                self.query = {name:searchStr.substring(0,10)};
            }else{
                self.query = {};
            }

            self.paginate.page=0;
            return getList().then(function() {
                console.log('Activated list View');
            });
        }
        function saveField(item,field,defer){
            defer =defer||0
            setTimeout(function(){
                var o={_id:item._id};
                o[field]=item[field]
                return self.Items.save({update:field},o ).$promise.then(function(){
                    global.set('saving',true)
                    $timeout(function () {
                        global.set('saving',false);
                    },1500)
                },function(err){console.log(err)});
            },defer)
        };
        function createItem(){
            self.Items.create()
                .then(function(res){
                    self.newItem={actived:false}
                    self.newItem.name=res;
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem._id=res.id;
                    self.newItem.url=res.url;
                    self.paginate.page=0;
                    return getList(self.paginate);
                })
                .then(function(){
                    var id=self.newItem._id;
                    delete self.newItem._id
                    $state.go('frame.lookbook.item',{id:id})
                })
                .catch(function(err){
                    delete self.newItem._id
                    err = err.data||err
                    exception.catcher('создание объекта')(err)
                })
        }
        function deleteItem(item){
            var folder='images/'+global.get('store').val.subDomain+'/Lookbook/'+item.url
            console.log(folder)
            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    return self.getList();
                })
                .then(function(){
                    Photo.deleteFolder('Lookbook',folder)
                })
                .catch(function(err){
                    if(!err){return}
                    err = (err &&err.data)||err
                    if(err){
                        exception.catcher('удаление объета')(err)
                    }

                })
        }
    }
})()
