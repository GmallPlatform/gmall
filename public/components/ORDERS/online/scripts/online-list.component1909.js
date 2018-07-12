'use strict';
(function(){

    angular.module('gmall.services')
        .directive('onlineEntry',listDirective)
        .directive('actionEntry',function($timeout){
            return {
                restrict: 'C',
                link:function (scope,element,arrts){
                    var h = element.parent().height()*scope.item.qty;
                    var w = element.parent().width();
                    element.css('height',h + 'px')
                    element.css('width',w + 'px');
                    $timeout(function(){
                        $(window).bind('click', function () {
                            scope.$apply(function() {
                                scope.item.entry.show=false;
                            })
                        })
                    },100)
                    
    
    
                },
                templateUrl: 'components/ORDERS/online/actionEntry.html',
            }
        })
    function listDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/ORDERS/online/onlineList.html',
        }
    };
    listCtrl.$inject=['$scope','Online','Master','Stuff','$state','global','Confirm','$q','exception'];
    function listCtrl($scope,Online,Master,Stuff,$state,global,Confirm,$q,exception){
        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        //self.moment=moment;
        self.$state=$state;
        self.Items=Online;
        self.date = new Date();
        var month = self.date.getMonth() + 1; //months from 1-12
        var day = self.date.getDate();
        var year = self.date.getFullYear();
        self.query={$and:[{year:year},{month:month},{day:day}]};
        self.paginate={page:0,rows:20,totalItems:0}
        self.startTimeParts=Online.startTimeParts;36;
        self.endTimeParts=Online.endTimeParts;72;
        self.timeTable=Online.timeTable;
        self.timeTable15min=Online.timeTable15min;
        self.timeParts=Online.timeParts;
        /*self.timeTable=['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
        self.timeParts=[];
        for(var i=0;i<96;i++){self.timeParts.push({busy:false,i:i})};*/
        self.items=[];// list of stuffs
        self.selectedStuff=[];//
        self.newItem={}
        //self.date=Date.now()
        self.datePickerOptions ={

            locale: {
                applyClass: 'btn-green',
                applyLabel: "Выбрать",
                fromLabel: "от",
                toLabel: "до",
                cancelLabel: 'Отменить',
                customRangeLabel: 'Прозвольный диапазон',
                format:"DD.MM.YY",
                daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
                firstDay: 1,
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                    'Ноябрь', 'Декабрь'
                ]
            },
            singleDatePicker: true,
            autoUpdateInput: true,
            autoapply: true,
            eventHandlers: {
                'apply.daterangepicker': function(ev, picker) {
                    changeDate()
                }
            }
        }


        self.getList=getList;
        self.newEntry=newEntry;
        self.changeDate=changeDate;
        self.filterServices=filterServices;
        self.selectStuff=selectStuff;
        self.allTable=allTable;

        function filterServices(item) {
            return !item.hide
        }
        function selectStuff(item) {

            self.selectedStuff=[item.selectedStuff]
            Online.filterListServices(self.masters,self.items,self.selectedStuff);
            self.items.forEach(function (c) {
                if(c._id!=item._id){
                    delete c.selectedStuff;
                }else{
                    c.hide=true;
                }
            })
        }
        function allTable() {
            self.items.forEach(function (c) {
                delete c.selectedStuff
            })
            self.selectedStuff=[];
            Online.filterListServices(self.masters,self.items,self.selectedStuff);
        }

        /*self.saveField = saveField;
        self.searchItem=searchItem;
        self.deleteItem=deleteItem;
        self.createItem=createItem;*/
        //*******************************************************
        activate();

        function activate() {
            $q.when()
                .then(function () {
                    return getMasters()
                })
                .then(function(){
                    return getList()
                })
                .then(function () {
                    return getItems();
                })
                .then(function () {
                    return Online.filterListServices(self.masters,self.items,self.selectedStuff);
                })
                .then(function () {
                    setServicesInMasters()
                })

        }
        function getMasters(){
            return $q.when()
                .then(function(){
                    return Master.getList()
                })
                .then(function(data){
                    self.masters=data.map(function(m){
                        m.stuffs=m.stuffs.map(function(s){return s._id})
                        return m
                    });
                })
                .catch(function(err){
                    exception.catcher('получение списка мастеров')(err)
                });
        }
        function setServicesInMasters() {
            self.masters.forEach(function (m) {
                m.services=m.stuffs.reduce(function(a,s){
                    for(var i=0;i<self.items.length;i++){
                        for(var j=0;j<self.items[i].stuffs.length;j++){
                            if(self.items[i].stuffs[j]._id==s){
                                a.push(self.items[i].stuffs[j])
                            }
                        }
                    }
                    return a;
                },[]).filter(function(i){return i})
                //console.log(m.services)
            })

        }
        function getItems() {
            return $q.when()
                .then(function () {
                    return Stuff.getServicesForOnlineEntry()
                })
                .then(function (res) {
                    return self.items=res;
                })
                .catch(function(err){
                    exception.catcher('получение списка услуг')(err)
                });

            return;
        }


        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.masters.forEach(function(m){
                        m.entryTimeTable=angular.copy(self.timeParts)
                    })
                    self.onlineEntry = data[0]?data[0]:null;
                    //console.log(self.onlineEntry)
                    if(self.onlineEntry){
                        //console.log(self.onlineEntry)
                        setDataForEntry()
                    }
                    return self.onlineEntry;
                });
        }
        function setDataForEntry(){
            if(!self.onlineEntry.masters){
                self.onlineEntry.masters=[];
            }
            self.onlineEntry.masters.forEach(function(m){
                var master=self.masters.getOFA('_id',m.master);
                if(master){
                    m.entries.forEach(function(e){
                        /*e.editEntryAction=editEntryAction;
                        e.deleteEntryAction=deleteEntryAction;*/
                        //console.log(e)
                        for(var i=e.start;i<e.start+e.qty;i++){
                            master.entryTimeTable[i].busy=true;
                            if(i==e.start){
                                master.entryTimeTable[i].user= e.user.name;
                                master.entryTimeTable[i].phone= e.user.phone;
                                master.entryTimeTable[i].email= e.user.email||'';
                                master.entryTimeTable[i].service= e.service.name;
                                master.entryTimeTable[i].new=true;
                                master.entryTimeTable[i].qty=e.qty;
                                master.entryTimeTable[i].entry=e
                                //console.log(master.entryTimeTable[i])
                            }
                            if(e.start+e.qty-1!=i){
                                master.entryTimeTable[i].noBorder=true
                            }
                        }
                    })
                }
            })
        }
        function newEntry(master,val){
            var start=val;
            //console.log(val);
            var entry,entries=[];
            var entryTimeTable=master.entryTimeTable;
            if(entryTimeTable[val].busy){
                editEntry(master,val)
                return
            }


            $q.when()
                .then(function(){
                    return Online.selectService(master,val)
                })
                .then(function(entryLocal){
                    entry=entryLocal;
                    //console.log(entry)
                    var timePart=entry.services.reduce(function(t,item){
                        return t+item.timePart
                    },0)
                    //console.log(timePart)
                    for(var i=0+val;i<timePart+val;i++){
                        if(entryTimeTable[i].busy){
                            throw 'Не хватает времени'
                        }
                    }
                    //console.log(entryTimeTable,val);
                    entry.services.forEach(function(s,i){
                        var o = {start:val,qty:s.timePart,
                            service:{_id:s._id,name:s.name},user:entry.user};
                        if(i==0&& entry.remind && entry.timeRemind){
                            o.remind=entry.remind;
                            o.timeRemind=entry.timeRemind;
                        }
                        console.log(o)
                        entries.push(o)
                        for(var i=0+val;i<s.timePart+val;i++){
                            //console.log(i)
                            entryTimeTable[i].busy=true;
                            if(i==val){
                                entryTimeTable[i].service=s.name;
                                entryTimeTable[i].user=entry.user.name;
                            }
                            //console.log(i,entryTimeTable[i])
                            if(s.timePart+val-1!=i){
                                entryTimeTable[i].noBorder=true
                            }
                        }
                        val+=s.timePart;
                    })
                    if(!self.onlineEntry){
                        var o= self.query.$and.reduce(function(o,item){
                            for(var k in item){o[k]=item[k]}
                            return o;
                        },{})
                        console.log(o)
                        return self.Items.save(o).$promise
                    }else{
                        return
                    }

                    /*for(var i=0+val;i<timePart+val;i++){
                        entryTimeTable[i].busy=true;
                        if(i==e.start){
                            entryTimeTable[i].busy.user= e.user.name;
                            entryTimeTable[i].busy.service= e.user.service;
                        }
                        entryTimeTable[i].service=service.name
                        entryTimeTable[i].user='вася'
                    }*/
                })
                .then(function(onlineEntry){
                    //console.log(onlineEntry,onlineEntry._id)
                    if(onlineEntry){
                        var o= self.query.$and.reduce(function(o,item){
                            for(var k in item){o[k]=item[k]}
                            return o;
                        },{})
                        o._id=onlineEntry._id;
                        o.masters=[];
                        return o;
                        return self.Items.getItem(onlineEntry._id)
                    }else{
                        return;
                    }
                })
                .then(function(onlineEntry){
                    //console.log(onlineEntry)
                    if(onlineEntry){
                        self.onlineEntry=onlineEntry;
                    }
                    //console.log(master)
                    var m = angular.copy(self.onlineEntry.masters.getOFA('master',master._id))
                    return m;
                })
                .then(function(m){
                    //console.log(m);
                    if(!m){
                        //console.log('create master');
                        return Online.saveMasterInOnlineEntry(self.onlineEntry._id,master._id,entries)
                    }else{
                        m.entries=m.entries.concat(entries);
                        return Online.saveEntriesInOnlineEntry(self.onlineEntry._id,m._id,m.entries)
                    }
                })
                .then(function(){
                    getList()
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('запись на время')(err)
                    }
                })
            return;
            
            
            





            /*$q.when()
                .then(function(){
                    if(!sels.item)
                })*/


        }
        
        function changeDate() {
            var month = self.date.format('M');
            var day   = self.date.format('D');
            var year  = self.date.format('YYYY');
            self.query={$and:[{year:year},{month:month},{day:day}]};
            getList()
        }
        function editEntry(m,val){
            //console.log(self.onlineEntry)
            var entry,index;
            var master= self.onlineEntry.masters.getOFA('master',m._id)
            if(master){
                //console.log(master)
                for(var i=0;i<master.entries.length;i++){
                    if(val>=master.entries[i].start && val<master.entries[i].qty+master.entries[i].start){
                        //console.log(master.entries[i])
                        entry=angular.copy(master.entries[i]);
                        index=i;
                        break;
                    }
                }
                if(entry){
                    return $q.when()
                        .then(function(){
                            return Online.editEntry(m,entry)
                        })
                        .then(function(action){
                            //console.log(action);
                            if(action=='delete'){
                                master.entries.splice(index,1);
                                entryAction(master,'удаление записи')
                            }else if(action=='save'){
                                console.log(entry);
                                master.entries[index]=entry;
                                entryAction(master,'редактирование записи')
                            }
                        })
                }
            }
        }
        function entryAction(master,action){
            $q.when()
                .then(function(){
                    return Online.saveEntriesInOnlineEntry(self.onlineEntry._id,master._id,master.entries)
                })
                .then(function(){
                    getList()
                })
                .catch(function(err){
                    exception.catcher(action)(err)
                })
        }
        
        //********************************************************
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
        function saveField(master,field){
            //console.log('saveField',item)
            var o={_id:self.onlineEntry._id};
            if(field){
                o.entries=master.entries;
                o.master=master.master
            }

            var update={update:'entries',embeddedName:'masters'};
            if(master._id){
                if(!field){
                    update.embeddedPull=true;
                    update.update='entries';
                    o.entries=master.entries;
                }else{
                    update.embeddedVal=master._id
                }

            }else{
                update.embeddedPush=true;
            }
            console.log(update,o)
            //return self.Items.save(update,o).$promise;
        };
        function saveField1(item,field){
            var o={_id:item._id};
            o[field]=item[field]
            return self.Items.save({update:field},o ).$promise;
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
                    getList(self.paginate);
                })
                .then(function(){
                    var id=self.newItem._id;
                    delete self.newItem._id
                    setTimeout(function(){
                        $state.go('frame.master.item',{id:id})
                    },100)

                })
                .catch(function(err){
                    console.log(err)
                })
        }
        function deleteItem(item){
            var folder='images/'+global.get('store').val.subDomain+'/Master/'+item._id
            // console.log(folder)


            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    return self.getList();
                })
                .then(function(){
                    Photo.deleteFolder('Master',folder)
                })
                .catch(function(err){
                    if(!err){return}
                    err = (err &&err.data)||err
                    if(err){
                        exception.catcher('удаление объекта')(err)
                    }

                })

            /*Stuff.Items.delete({_id:stuff._id} ).$promise.then(function(res){
             $scope.getList($scope.paginate.page,$scope.paginate.rows,'reload');
             } ).catch(function(err){
             err = err.data||err
             exception.catcher('удаление товара')(err)
             })*/
        }
    }

    /*function actionEntryDirective($timeout){
        return {
            link:actionEntryLink,
            templateUrl: 'components/ORDERS/online/actionEntry.html',
        }
    };*/

})()
