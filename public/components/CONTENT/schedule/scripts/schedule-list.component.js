'use strict';
(function(){

    angular.module('gmall.services')
        .directive('scheduleList',listDirective)

    function listDirective(global){
        return {
            scope: {},
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: function(){
                return 'components/CONTENT/schedule/scheduleList.html'
                /*if(global.get('mobile').val){
                    return  'components/ORDERS/online/onlineListMobile.html'
                }else{
                    return  'components/ORDERS/online/onlineList.html'
                }*/
            }
        }
    };
    listCtrl.$inject=['$scope','Schedule','Master','Stuff','$rootScope','global','Confirm','$q','exception'];
    function listCtrl($scope,Schedule,Master,Stuff,$rootScope,global,Confirm,$q,exception){

        var self = this;
        self.moment=moment;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$rootScope.$state;
        self.Items=Schedule;
        self.onlineEntr={};
        self.date = new Date();
        self.td=new Date();
        var tz =  self.date.getTimezoneOffset()/60
        var month = self.date.getMonth()// + 1; //months from 1-12
        var day = self.date.getDate();
        var year = self.date.getFullYear();

        if(month<10){month='0'+month}
        if(day<10){day='0'+day}
        self.query={date:'date'+year+month+day};
        self.paginate={page:0,rows:500,totalItems:0}
        self.timeParts=Booking.timeParts;
        self.startTimeParts=Booking.startTimeParts
        self.endTimeParts=Booking.endTimeParts
        self.timeTable=Booking.timeTable;
        self.timeTable15min=Booking.timeTable15min;
        self.minDurationForService=global.get('store').val.seller.minDurationForService||15;
        var delta=0;
        //console.log(self.minDurationForService)
        switch (self.minDurationForService){
            case 30: delta=1;break;
            case 60: delta=3;break;
            case 90: delta=5;break;
            case 120:delta=7;break;
            default :delta=0;
        }
        self.timePartsForTable=[];
        var partsArray=[]
        for(var i=0;i<96;i=i+1+delta){
            self.timePartsForTable.push(Booking.timeParts[i])
            partsArray.push(i)
        }
        self.slideMasterWeekArry=[{id:0,active:false},{id:1,active:false},{id:2,active:false},{id:3,active:false},{id:4,active:false},{id:5,active:false},{id:6,active:false}]
        //console.log(global.get('langForm'))

        self.items=[];// list of stuffs
        self.newItem={}

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
        var dtt= new Date();
        self.datePickerOptions ={
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: dtt.setDate(dtt.getDate() + 90),
            //minDate: dtt,
            startingDay: 1
        }



        self.newBooking=newBooking;
        self.changeDate=changeDate;



        self.filterTimePart=filterTimePart;
        self.filterTimePartForMaster=filterTimePartForMaster;

        self.changeActiveSlide=changeActiveSlide;


        self.changeWeek=changeWeek;
        self.setWeekDates=setWeekDates;
        self.getDateObj=getDateObj;
        self.filterTimePartWeek=filterTimePartWeek;
        self.filterTimePartForMasterWeek=filterTimePartForMasterWeek;



        //*******************************************************
        activate();
        

        function activate() {


            changeStartEndTimeParts()
            $q.when()
                .then(function () {
                    return getMasters()
                })
                .then(function(){
                    console.log($rootScope.$stateParams)
                    if($rootScope.$stateParams && $rootScope.$stateParams.id){
                        var m = self.masters.getOFA('_id',$rootScope.$stateParams.id)
                        //console.log(m);
                        if(m){
                            self.hideMastersList= m;

                        }else{
                            m = self.masters.getOFA('url',$rootScope.$stateParams.id)
                            if(m){
                                self.hideMastersList= m;
                            }else{
                                self.masters=null;
                                throw "master doesn't match1"
                            }
                        }


                    }
                    return getBooking()
                })
                .then(function () {
                    return getServices();
                })
                .then(function () {
                    return Booking.filterListServices(self.masters,self.items,self.selectedStuff);
                })
                .then(function () {
                    setServicesInMasters()
                })
                .then(function () {
                    if(self.hideMastersList){
                        selectMaster(self.hideMastersList)
                    }
                })
                .catch(function (err) {
                    exception.catcher('инициализация')(err)
                })

        }

        function getMasters(){
            return $q.when()
                .then(function(){
                    return Master.getList()
                })
                .then(function(data){
                    //console.log(data)
                    self.masters=data.map(function(m){
                        if(m.stuffs){
                            //m.stuffs=m.stuffs.map(function(s){return s._id})
                        }else{
                            m.stuffs=[];
                        }

                        return m
                    }).filter(function (m) {
                        //console.log(m.stuffs)
                        return m.stuffs.length
                    });
                    //console.log(self.masters)
                })
                .catch(function(err){
                    exception.catcher('получение списка мастеров')(err)
                });
        }

        function getBooking() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.mastersO={}
                    self.masters.forEach(function(m){
                        m.entryTimeTable=angular.copy(self.timeParts);
                        m.entryTimeTable.forEach(function (p) {
                            p.master=m._id;

                            if(self.dayOff){
                                p.out=true;
                            }else{
                                if(m.timeTable && m.timeTable[self.currentDayOfYear]){
                                    if(!m.timeTable[self.currentDayOfYear].is ||
                                        p.i<m.timeTable[self.currentDayOfYear].s*4 ||
                                        p.i>=m.timeTable[self.currentDayOfYear].e*4)
                                    {
                                        p.out=true;
                                    }

                                }
                            }

                            //console.log(self.dayOff,p.out)

                        })
                        if(m.timeTable && m.timeTable[self.currentDayOfYear]){
                            m.masterSchedule=angular.copy(m.timeTable[self.currentDayOfYear])
                            //console.log(self.currentDayOfYear,m.name,m.timeTable)
                            m.masterSchedule.s*=4;
                            m.masterSchedule.e*=4;
                        }else if(self.storeSchedule){
                            m.masterSchedule=self.storeSchedule;
                        }else{
                            m.masterSchedule={}
                        }
                        self.mastersO[m._id]=m
                    })
                    setBookingDataInMasters(data)
                });
        }
        function setBookingDataInMasters(booking){
            //console.log(booking)
            masters=self.masters.reduce(function (o,item) {
                o[item._id]=item;

                return o;
            },{})
            /*console.log(masters)
            console.log(booking)*/
            booking.forEach(function(e){
                var master= masters[e.master]
                for(var i=e.start;i<e.start+e.qty;i++){
                    master.entryTimeTable[i].busy=true;
                    if(i==e.start){
                        master.entryTimeTable[i].user= e.user.name;
                        master.entryTimeTable[i].phone= e.user.phone;
                        master.entryTimeTable[i].email= e.user.email||'';
                        master.entryTimeTable[i].service= e.service.name;
                        master.entryTimeTable[i].new=true;
                        master.entryTimeTable[i].qty=e.qty;
                        master.entryTimeTable[i].used=e.used;
                        master.entryTimeTable[i].confirm=e.confirm;
                    }
                    if(i!=e.start){
                        master.entryTimeTable[i].noBorder=true
                    }
                    /*if(e.start+e.qty-1!=i){
                        master.entryTimeTable[i].noBorder=true
                    }*/
                    master.entryTimeTable[i].entry=e;
                    if(global.get('store').val.onlineReservation && (!e.status || e.status!=1)){
                        master.entryTimeTable[i].reservation=true;
                    }
                }
            })
        }
        function getServices() {
            return $q.when()
                .then(function () {
                    return Stuff.getServicesForOnlineEntry()
                })
                .then(function (res) {
                    res.forEach(function (s) {
                        s.duration=s.timePart*15
                        if(!s.currency){s.currency=global.get('store').val.mainCurrency}
                        s.currencyName=(global.get('store').val.currency && global.get('store').val.currency[s.currency] && global.get('store').val.currency[s.currency][2])?
                            global.get('store').val.currency[s.currency][2]:s.currency;

                    })
                    return self.items=res;
                })
                .catch(function(err){
                    exception.catcher('получение списка услуг')(err)
                });

        }
        function setServicesInMasters() {
            self.masters.forEach(function (m) {
                m.services=m.stuffs.map(function(s){
                    for(var i=0;i<self.items.length;i++){
                        if(self.items[i]._id==s){
                            return self.items[i]
                        }
                    }
                    return null;
                },[]).filter(function(i){return i})
                //console.log(m.services)
            })

        }





        function newBooking(master,part,week){
            if(part.out){console.log('out');return}
            var val =part.i;
            var start=val;
            var entry,entries=[];
            if(week){
                var entryTimeTable=master.week[part.date].entryTimeTable;
            }else{
                var entryTimeTable=master.entryTimeTable;
            }

            if(entryTimeTable[val].busy){
                editBooking(entryTimeTable[val].entry,val)
                return
            }
            $q.when()
                .then(function(){
                    if(week){
                        var dd = Booking.getDateFromStrDateEntry(part.date)
                        return Booking.newBooking(master,val,self.selectedStuff,dd,part.date,start)
                    }else{
                        return Booking.newBooking(master,val,self.selectedStuff,self.date,self.query.date,start)
                    }

                })
                .then(function(entryLocal){
                    if(!entryLocal)return;
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
                    entry.services.forEach(function(s,i){
                        var o = {
                            date:self.query.date,
                            master:master._id,
                            start:val,
                            qty:s.timePart,
                            service:{_id:s._id,name:s.name},
                            paySum:s.price,
                            currency:s.currency,
                            user:entry.user,
                            tz:tz
                        };
                        if(week){
                            o.date=part.date
                        }
                        if(s.priceSale){
                            o.price=s.priceSale
                        }
                        if(i==0&& entry.remind && entry.timeRemind){
                            o.remind=entry.remind;
                            o.timeRemind=entry.timeRemind;
                        }
                        //console.log(o)
                        entries.push(o)
                        for(var i=0+val;i<s.timePart+val;i++){
                            //console.log(i)
                            entryTimeTable[i].busy=true;
                            if(i==val){
                                entryTimeTable[i].service=s.name;
                                entryTimeTable[i].user=entry.user.name;
                                entryTimeTable[i].noBorder=true
                            }
                            //console.log(i,entryTimeTable[i])

                            /*if(s.timePart+val-1!=i){
                                entryTimeTable[i].noBorder=true
                            }*/
                        }
                        val+=s.timePart;
                    })
                    var actions=[];
                    //console.log(entries)
                    entries.forEach(function (e) {
                        return $q.when().then(function () {
                            Booking.save(e).$promise
                        })
                    })
                    return $q.all(actions);

                })
                .then(function(){
                    console.log('getBooking')
                    if(self.selectedMaster){
                        return Booking.getBookingWeek(self.queryWeek,self.selectedMaster,self.datesOfWeeks,ngClickOnEntry,true)
                    }else{
                        getBooking()
                    }

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('запись на время')(err)
                    }
                })
            return;
        }
        function editBooking(entry,val){
            //console.log(entry)
            return $q.when()
                .then(function(){
                    return Booking.editBooking(entry,masters)
                })
                .then(function(res){
                    if(res && res.action=='delete'){
                       return Booking.delete({_id:entry._id}).$promise;
                    }else if(res &&  res.action=='save' && res.update){
                        return Booking.save({update:res.update},entry).$promise;
                    }
                })
                .then(function(){
                    getBooking()
                })
                .catch(function(err){
                    if(err){
                        exception.catcher(action)(err)
                    }

                })
        }
        function changeDate() {
            if(!self.date){
                self.date=new Date;
            }
            var date = new Date(self.date);
            changeStartEndTimeParts(date);
            var month = date.getMonth() //+ 1; //months from 1-12
            var day = date.getDate();
            var year = date.getFullYear();
            //console.log(d.getMonth())
            if(month<10){month='0'+month}
            if(day<10){day='0'+day}
            self.query={date:'date'+year+month+day};
            //console.log(self.query)
            getBooking()
            if(self.selectedMaster){
                self.slideMasterWeekArry[0].active=true
                changeWeek(0)
            }

        }



        function filterTimePart(part) {
            //console.log(self.startTimeParts, part.i,self.endTimeParts,part.i>=self.startTimeParts&&part.i<self.endTimeParts)
            return part.i>=self.startTimeParts&&part.i<self.endTimeParts
        }
        function filterTimePartForMaster(part) {
            return partsArray.indexOf(part.i)>-1 && part.i>=self.startTimeParts&&part.i<self.endTimeParts

            if(partsArray.indexOf(part.i)<0){return false}
            if(part.i>=self.startTimeParts&&part.i<self.endTimeParts&&self.storeSchedule.is){
                if(self.mastersO[part.master].masterSchedule){
                    if(part.i<self.mastersO[part.master].masterSchedule.s||part.i>=self.mastersO[part.master].masterSchedule.e || !self.mastersO[part.master].masterSchedule.is){
                        part.out=true;
                    }
                }
                //console.log(self.mastersO[part.master],part.master)
                return true;
            }else{
                part.out=true;
            }
        }


        function changeActiveSlide(index,swipe){
            self.masters[index].active=true;
        }
        function activateMasterWeek() {
            changeWeek(0)
        }
        function changeWeek(week) {
            setWeekDates(week)
            self.tempEntry=null;
            $q.when()
                .then(function () {
                    return Booking.getBookingWeek(self.queryWeek,self.selectedMaster,self.datesOfWeeks,ngClickOnEntry,true)
                })
                .then(function () {
                    self.slideMasterWeekArry[0].active=true
                    //console.log(self.selectedMaster)
                })
        }
        function setWeekDates(week) {
            // установка идет он выбраной даты
            self.week=week;
            if(!week){
                var date = self.date;
            }else{
                var date= new Date(self.date)
                date.setTime(date.getTime() + (week*7)*86400000);
                date.setHours(0)
            }
            if(!self.datesOfWeeks){
                self.datesOfWeeks=Booking.getDatesForWeek(date);
            }else{
                var t = Booking.getDatesForWeek(date);
                for(var i=0;i<t.length;i++){
                    self.datesOfWeeks[i]=t[i]
                }
            }

            try{
                self.currentMonth=moment(date).format('MMMM')
                //console.log(self.currentMonth)
            }catch(err){}

            self.currentDayOfWeek=self.td.getDay()
            if(self.currentDayOfWeek==0){self.currentDayOfWeek=7;}
            self.currentDayOfWeek--;
            if(week){self.currentDayOfWeek==0;}
            self.queryWeek={date:{$in:self.datesOfWeeks.map(function (item) {
                return item.date
            })},master:self.selectedMaster._id};
        }
        function getDateObj(dateStr) {
            if(!dateStr){return}
            var year = dateStr.substring(4,8)
            var month = dateStr.substring(8,10)
            var day = dateStr.substring(10)

            try{
                var date = new Date(year,month,day)
                var s =moment(date).format('ddd');
                return s+'/'+day;
            }catch(err){console.log(err);return 'error handle date'}
        }
        function getBookingWeek() {
            var storeScheduleWeek=angular.copy(global.get('store').val.timeTable)
            return self.Items.getList(self.paginate,self.queryWeek)
                .then(function(data) {
                    self.selectedMaster['week']={}
                    self.datesOfWeeks.forEach(function (d,dayOfWeek) {
                        self.selectedMaster['week'][d.date]={}
                        self.selectedMaster['week'][d.date].entryTimeTable=angular.copy(self.timeParts);
                        self.selectedMaster['week'][d.date].entryTimeTable.forEach(function (p,i) {
                            p.date=d.date;
                            p.ngClickOnEntry=ngClickOnEntry;
                            if(storeScheduleWeek){
                                // в self.storeSchedule 0 - это воскр у нас 0 - это понедельник
                                var j = dayOfWeek+1;
                                if(dayOfWeek==6){
                                    j=0;
                                }
                                if(!storeScheduleWeek[j].is || p.i<storeScheduleWeek[j].start*4 || p.i>=storeScheduleWeek[j].end*4){
                                    p.out=true;
                                }
                            }
                            if(self.selectedMaster.timeTable && self.selectedMaster.timeTable[d.dayOfYear]){
                                if(!self.selectedMaster.timeTable[d.dayOfYear].is ||
                                    p.i<self.selectedMaster.timeTable[d.dayOfYear].s*4 ||
                                    p.i>=self.selectedMaster.timeTable[d.dayOfYear].e*4)
                                {
                                    p.out=true;
                                }

                            }
                        })
                    })
                    data.forEach(function(e){
                        //console.log(e)
                        var master= self.selectedMaster;
                        for(var i=e.start;i<e.start+e.qty;i++){
                            master.week[e.date].entryTimeTable[i].busy=true;
                            if(i==e.start){
                                master.week[e.date].entryTimeTable[i].usedTime=Booking.getUsedTime(e.start,e.qty);
                                master.week[e.date].entryTimeTable[i].userId= e.user._id;
                                master.week[e.date].entryTimeTable[i].service= e.service.name;
                                master.week[e.date].entryTimeTable[i].new=true;
                                master.week[e.date].entryTimeTable[i].qty=e.qty;
                                master.week[e.date].entryTimeTable[i].used=e.used;
                                master.week[e.date].entryTimeTable[i].confirm=e.confirm;
                            }
                            if(i!=e.start){
                                master.week[e.date].entryTimeTable[i].noBorder=true
                            }
                            master.week[e.date].entryTimeTable[i].entry=e;
                            if(global.get('store').val.onlineReservation && (!e.status || e.status!=1)){
                                master.week[e.date].entryTimeTable[i].reservation=true;
                            }
                        }
                    })
                });
        }
        function ngClickOnEntry(date,index) {
            //console.log(date,index)
            var item=this;
            //console.log(item)
            newBooking(self.selectedMaster,item,true)
            /*if(!item.user && !item.temp){
                newBooking(date,item,index)
            }else if(item.user  && !item.temp && item.uiSref){
                $state.go('cabinet',{sec:'online'})
            }else if(item.temp){
                clearTempBooking()
            }*/
        }
        function filterTimePartWeek(part) {
            return part.i>=self.startTimePartsWeek&&part.i<self.endTimePartsWeek
        }
        function filterTimePartForMasterWeek(part) {
            //console.log(partsArray.indexOf(part.i)>-1 && part.i>=self.startTimePartsWeek&&part.i<self.endTimePartsWeek)
            /*if(partsArray.indexOf(part.i)<0){
                return;
            }*/
            return partsArray.indexOf(part.i)>-1 && part.i>=self.startTimePartsWeek&&part.i<self.endTimePartsWeek
        }



        /*new functions*/
        function changeStartEndTimeParts(date) {
            if(!date){date=self.date}
            var dayOfWeek = date.getDay();
            var month = date.getMonth()
            var day = date.getDate();
            self.currentDayOfYear=Booking.getDayOfYear(month,day-1)
            self.storeSchedule=angular.copy(global.get('store').val.timeTable[dayOfWeek])
            self.dayOff=(self.storeSchedule && self.storeSchedule.is)?false:true;
            //console.log(self.storeSchedule)
            var start = (self.storeSchedule && self.storeSchedule.start)?self.storeSchedule.start:6
            var end = (self.storeSchedule && self.storeSchedule.end)?self.storeSchedule.end:20
            self.startTimeParts=start *4
            self.endTimeParts=end *4

            //console.log(self.startTimeParts,self.endTimeParts)

            self.startTimePartsWeek=self.startTimeParts
            self.startTimePartsWeek=self.endTimeParts

            if(global.get('store').val.timeTable){
                self.storeScheduleWeek=angular.copy(global.get('store').val.timeTable)
                start=10;
                end=15;
                for(var dayOfWeek in global.get('store').val.timeTable){
                    if(global.get('store').val.timeTable[dayOfWeek].start<start){
                        start=global.get('store').val.timeTable[dayOfWeek].start;
                    }
                    if(global.get('store').val.timeTable[dayOfWeek].end>end){
                        end=global.get('store').val.timeTable[dayOfWeek].end;
                    }
                }
                self.startTimePartsWeek=start *4
                self.endTimePartsWeek=end *4
            }


        }
    }

})()
