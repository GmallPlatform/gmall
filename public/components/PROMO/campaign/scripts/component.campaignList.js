'use strict';
(function(){
    angular.module('gmall.services')
        .directive('campaignList',campaignListDirective);
    function campaignListDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: campaignListCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/PROMO/campaign/campaignList.html',
        }
    };
    campaignListCtrl.$inject=['Campaign','$state','global','Confirm','exception','Photo'];
    function campaignListCtrl(Campaign,$state,global,Confirm,exception,Photo){
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
        self.Items=Campaign;
        self.query={};
        self.paginate={page:0,rows:5,totalItems:0}
        self.newItem={name:'Новая акционная компания',actived:false}
        self.getList=getList;
        self.saveField = saveField;
        self.searchItems=searchItems;
        self.createItem=createItem;
        self.deleteItem=deleteItem;
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
        function saveField(item,field,defer){
            defer =defer||0
            setTimeout(function(){
                var o={_id:item._id};
                o[field]=item[field]
                return self.Items.save({update:field},o ).$promise.then(function(){
                    console.log('saved')
                },function(err){console.log(err)});
            },defer)
        };
        function createItem(){
            self.Items.create()
                .then(function(res){
                    self.newItem={actived:false};
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
                    $state.go('frame.campaigns.campaign',{id:self.newItem._id})
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('создание компании')(err)
                    }

                })
        }
        function deleteItem(item){
            var folder='images/'+global.get('store').val.subDomain+'/Campaign/'+item.url
            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    Photo.deleteFolder('Campaign',folder)
                })
                .then(function(){
                    activate(0);
                })
                .catch(function(err){
                    exception.catcher('удаление компании')(err)
                })
        }

    }
})()
