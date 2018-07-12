(function(){
    'use strict';
    angular.module('gmall.services')
        .directive('seopageList',listDirective);
    function listDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/SEO/seopages/seopageList.html',
        }
    };
    listCtrl.$inject=['Seopage','$q','$state','global','Confirm','exception'];
    function listCtrl(Seopage,$q,$state,global,Confirm,exception){
        var self = this;
        self.mobile=global.get('mobile' ).val;
        //self.moment=moment;
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
        self.Items=Seopage;
        self.query={};
        self.paginate={page:0,rows:50,totalItems:0}
        self.newItem={name:'Новая продвигаемая страница',actived:false}
        self.getList=getList;
        self.saveField = saveField;
        self.searchItems=searchItems;
        self.createItem=createItem;
        self.deleteItem=deleteItem;
        self.dropCallback=dropCallback;
        //*******************************************************
        activate();

        function activate(page) {
            if(page || page===0){
                self.paginate.page=0;
            }
            return getList().then(function() {
                //console.log('Activated campaign list View');
            });
        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.items = data;
                    return self.items;
                });
        }
        function searchItems(searchStr){
            if(searchStr){
                self.query = {name:searchStr.substring(0,10)};
            }else{
                self.query = {};
            }
            self.paginate.page=0;
            activate();
        }
        function saveField(item,field){
            var o={_id:item._id};
            o[field]=item[field]
            return self.Items.save({update:field},o ).$promise
        };
        function createItem(){
            self.Items.create()
                .then(function(res){
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
                    delete self.newItem._id;
                    //$state.go('frame.seoPages.item',{id:id})
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('создание компании')(err)
                    }

                })
        }
        function deleteItem(item){
            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    activate(0);
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('удаление страницы')(err)
                    }

                })
        }
        function dropCallback(item){
            //console.log(item)
            var actions=[];
            setTimeout(function(){
                self.items.forEach(function(item,idx){
                   item.index=idx+1;
                    actions.push(saveField(item,'index'))

                })
                $q.all(actions)
                //saveField('main')
            },100)
            return item
        }

    }
})()
