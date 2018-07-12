'use strict';
(function(){

    angular.module('gmall.services')
        .directive('onlineBooking',listDirective)
        .directive('weekSchedule',sheduleDirective)
        .directive('scheduleEntry',sheduleEntryDirective)
        .directive('ngRepeatEndWatch', function () {
            return {
                restrict: 'A',
                scope: {},
                link: function (scope, element, attrs) {
                    if (attrs.ngRepeat) {
                        if (scope.$parent.$last) {
                            if (attrs.ngRepeatEndWatch !== '') {
                                if (typeof scope.$parent.$parent[attrs.ngRepeatEndWatch] === 'function') {
                                    // Executes defined function
                                    scope.$parent.$parent[attrs.ngRepeatEndWatch]();
                                } else {
                                    // For watcher, if you prefer
                                    scope.$parent.$parent[attrs.ngRepeatEndWatch] = true;
                                }
                            } else {
                                // If no value was provided than we will provide one on you controller scope, that you can watch
                                // WARNING: Multiple instances of this directive could yeild unwanted results.
                                scope.$parent.$parent.ngRepeatEnd = true;
                            }
                        }
                    } else {
                        throw 'ngRepeatEndWatch: `ngRepeat` Directive required to use this Directive';
                    }
                }
            };
        })
        .directive('setClassWhenAtTop', function ($window,$timeout) {
            var $win = angular.element($window); // wrap window object as jQuery object
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
                        offsetTop = element.offset().top-60; // get element's top relative to the document

                    scope.mastersRepeatDone=mastersRepeatDone;
                    var first,delay=1000;
                    function mastersRepeatDone() {
                        if(first){delay=500}else{first=true;}
                        $timeout(function(){
                            init()
                        },delay)

                    }

                    var scrollHandler =function (e) {
                        if ($win.scrollTop() >= offsetTop) {
                            element.addClass(topClass);
                        } else {
                            element.removeClass(topClass);
                        }
                    }

                    function init() {
                        var w=0,outerW=1;
                        try{
                            w =element.width();
                            outerW = element.parent().parent().width()
                        }catch(err){}
                        if(outerW>=w){
                            $(window).scroll(scrollHandler);
                        }else{
                            $(window).off("scroll", scrollHandler);
                        }

                    }

                }
            };
        })

    function listDirective(global){
        return {
            scope: {},
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: function(){
                if(global.get('mobile').val){
                    return  'components/ORDERS/online/onlineListMobile.html'
                }else{
                    return  'components/ORDERS/online/onlineList.html'
                }
            }
        }
    };
    function sheduleDirective(global){
        return {
            scope: {},
            bindToController: true,
            controller: scheduleCtrl,
            controllerAs: '$ctrl',
            templateUrl: function(){
                if(global.get('mobile').val){
                    return  'components/ORDERS/online/scheduleMobile.html'
                }else{
                    return  'components/ORDERS/online/schedule.html'
                }
            }
        }
    };
    function sheduleEntryDirective(global){
        return {
            scope: {},
            bindToController: true,
            controller: scheduleEntryCtrl,
            controllerAs: '$ctrl',
            templateUrl: function(){
                if(global.get('mobile').val){
                    return  'components/ORDERS/online/scheduleEntryMobile.html'
                }else{
                    return  'components/ORDERS/online/scheduleEntry.html'
                }
            }
        }
    };
    listCtrl.$inject=['$scope','Booking','Master','Stuff','$rootScope','global','Confirm','$q','exception','socket','$timeout'];
    function listCtrl($scope,Booking,Master,Stuff,$rootScope,global,Confirm,$q,exception,socket,$timeout){

        var self = this;
        self.moment=moment;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$rootScope.$state;
        self.Items=Booking;
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
        self.selectedStuff=[];//
        self.selectedMaster;
        self.newItem={}
        var masters;

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


        //self.getList=getList;
        self.newBooking=newBooking;
        self.changeDate=changeDate;

        self.filterServices=filterServices;
        self.selectStuff=selectStuff;
        self.selectMaster=selectMaster;
        //self.allTable=allTable;
        self.filterTimePart=filterTimePart;
        self.filterTimePartForMaster=filterTimePartForMaster;

        self.changeActiveSlide=changeActiveSlide;


        self.changeWeek=changeWeek;
        self.setWeekDates=setWeekDates;
        self.getDateObj=getDateObj;
        self.filterTimePartWeek=filterTimePartWeek;
        self.filterTimePartForMasterWeek=filterTimePartForMasterWeek;
        self.scheduleTransfer=scheduleTransfer;



        function filterServices(item) {
            return !item.hide
        }
        function selectStuff(item) {
           // console.log('selectStuff')
            //console.log(item.selectedStuff)
            if(item){
                self.selectedStuff=[item]
            }else{
                self.selectedStuff=[]
            }
            self.selectedMaster=null;
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            if($scope.mastersRepeatDone && typeof $scope.mastersRepeatDone=='function'){
                $scope.mastersRepeatDone()
            }
        }
        function selectMaster(master) {
            //console.log('selectMaster')
            //console.log(master)
            self.selectedStuff=[];
            self.selStuff=null;
            self.masters.forEach(function (m) {
                if(!master || m._id==master._id){
                    m.show=true
                }else{
                    m.show=false;
                }
            })
            if($scope.mastersRepeatDone && typeof $scope.mastersRepeatDone=='function'){
                $scope.mastersRepeatDone()
            }
            if(self.selectedMaster){
                activateMasterWeek()
            }
        }

        //*******************************************************
        activate();
        

        function activate() {

            socket.on('newRecordOnSite',function(){
                console.log('newRecordOnSite');
                $timeout(function () {
                    getBooking()
                },1000)
            })
            //console.log($rootScope.$stateParams)
            changeStartEndTimeParts()
            $q.when()
                .then(function () {
                    return getMasters()
                })
                .then(function(){
                   // console.log(self.masters)
                    if($rootScope.$stateParams && $rootScope.$stateParams.id){
                        var m = self.masters.getOFA('_id',$rootScope.$stateParams.id)
                        //console.log(m);
                        if(m){
                            self.hideMastersList= m;

                        }else{
                            self.masters=null;
                            throw "master doesn't match"
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
                        master.entryTimeTable[i].comment=e.comment;
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
                    console.log('399',res)
                    res.forEach(function (s) {
                        s.duration=s.timePart*15
                        if(!s.currency){s.currency=global.get('store').val.mainCurrency}
                        s.currencyName=(global.get('store').val.currency && global.get('store').val.currency[s.currency] && global.get('store').val.currency[s.currency][2])?
                            global.get('store').val.currency[s.currency][2]:s.currency;

                    })
                    console.log(self.items)
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
                    //console.log(global.get('store').val)
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
                            masterNameL:master.nameL,
                            masterName:master.name,
                            masterUrl:master.url,
                            start:val,
                            qty:s.timePart,
                            service:{_id:s._id,name:s.name},
                            stuffName:s.name,
                            stuffNameL:s.nameL,
                            stuffLink:s.link,
                            paySum:s.price||0,
                            currency:s.currency|| global.get('store').val.mainCurrency,
                            user:entry.user,
                            tz:tz
                        };
                        if(s.backgroundcolor){o.service.backgroundcolor=s.backgroundcolor}
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

                    /*entries.forEach(function (e) {
                        return $q.when().then(function () {
                            return Booking.save(e).$promise
                        })
                    })*/
                    entries.forEach(function (e) {
                        actions.push(getPromise(e))
                        //console.log(e)
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
            function getPromise(e) {
                return Booking.save(e).$promise
            }
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
                    console.log('?????')
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
            console.log(index,swipe)
            //https://stackoverflow.com/questions/30300737/angular-ui-trigger-events-on-carousel
            /*if(swipe){
                if(swipe=='left'){
                    if(carousel && carousel.isolateScope && typeof carousel.isolateScope=='function'){
                        carousel.isolateScope().next();
                    }

                    //index = (self.activeSlide<self.item.gallery.length-1)?self.activeSlide+1:0;
                }else if(swipe=='right'){
                    if(carousel && carousel.isolateScope && typeof carousel.isolateScope=='function'){
                        carousel.isolateScope().prev();
                    }

                    // index = (self.activeSlide>0)?self.activeSlide-1:self.item.gallery.length-1;
                }
            }
            if(slideDelay){return}
            slideDelay=true
            self.activeSlide=index;self.item.gallery[index].active=true;
            $timeout(function () {
                slideDelay=false
            },700)*/
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
        function scheduleTransfer() {
            Booking.scheduleTransfer().then(
                function (err) {
                    if(err){
                        exception.catcher('перенос расписания')(err)
                    }else{
                        exception.showToaster('info','перенос расписания','Ok')
                    }
                    //console.log('!!!!!!!!!!!!!!')
                    getBooking()
                }
            )

        }
    }
    scheduleCtrl.$inject=['$scope','Booking','Master','Stuff','$rootScope','global','Confirm','$q','exception','socket','$state','Workplace'];
    function scheduleCtrl($scope,Booking,Master,Stuff,$rootScope,global,Confirm,$q,exception,socket,$state,Workplace){
        var self = this;

        self.moment=moment;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$rootScope.$state;
        self.Items=Booking;
        self.onlineEntr={};
        self.date = new Date();
        self.td=new Date();
        // преводим на три недели назад
        self.td.setTime(self.td.getTime() - (3*7)*86400000);
        self.td.setHours(0)

        var d;
        self.datesFoeWeeks=[]
        for(var i=0;i<=7;i++){
            d= new Date(self.date)
            d.setTime(d.getTime() + (i*7)*86400000);
            d.setHours(0)
            self.datesFoeWeeks.push(d)
        }
        //console.log(self.datesFoeWeeks)
        var tz =  self.date.getTimezoneOffset()/60
        var month = self.date.getMonth()// + 1; //months from 1-12
        var day = self.date.getDate();
        var year = self.date.getFullYear();
        if(month<10){month='0'+month}
        if(day<10){day='0'+day}
        self.week=3;


        self.noWrapSlides = true;
        /*$scope.$watch(function () {
            return self.week
        },function (n,o) {
            if(n!=o){
                self.changeWeek(n)
            }
        })*/

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



        self.timeParts=Booking.timeParts
        self.timePartsForTable=[];
        self.timePartsI=[];
        for(var i=0;i<96;i=i+1+delta){
            self.timePartsForTable.push(Booking.timeParts[i])
            self.timePartsI.push(i)
        }

        //console.log(self.timeParts)
        self.startTimeParts=Booking.startTimeParts
        self.endTimeParts=Booking.endTimeParts
        self.timeTable=Booking.timeTable;
        self.timeTable15min=Booking.timeTable15min;


        self.paginate={page:0,rows:100,totalItems:0}

        //console.log(global.get('langForm'))

        self.items=[];// list of stuffs
        self.selectedStuff=[];//
        self.selectedMaster;
        self.newItem={}
        var masters;


        var dtt= new Date();
        self.datePickerOptions ={
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: dtt.setDate(dtt.getDate() + 30),
            //minDate: dtt,
            startingDay: 1
        }
        self.slides=[{i:0},{i:1},{i:2},{i:3},{i:4},{i:5},{i:6},{i:7},{i:8},{i:9},{i:10},{i:11}]

        self.changeDate=changeDate;



        self.filterTimePart=filterTimePart;
        self.filterTimePartForMaster=filterTimePartForMaster;
        self.getDateObj=getDateObj;
        self.changeWeek=changeWeek;
        self.disabledTimePart=disabledTimePart;
        self.scheduleTransfer=scheduleTransfer;



        activate();

        $scope.$watch(function () {
            for (var i = 0; i < self.slides.length; i++) {
                if (self.slides[i].active) {
                    return self.slides[i];
                }
            }
        }, function (currentWeek, previousWeek) {
            if (currentWeek && previousWeek) {
                console.log('getBooking');
                changeWeek(currentWeek.i)
            }
        });



        function selectStuff(item) {
            // console.log('selectStuff')
            //console.log(item.selectedStuff)
            if(item){
                self.selectedStuff=[item]
            }else{
                self.selectedStuff=[]
            }
            self.selectedMaster=null;
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            $scope.mastersRepeatDone()
        }

        //*******************************************************



        function activate() {
            socket.on('newRecordOnSite',function(){
                console.log('newRecordOnSite');
                $timeout(function () {
                    getBooking()
                },1000)
            })
            changeStartEndTimeParts()
            setWeekDates(0)
            self.weeksRange= Booking.getWeeksRange(self.td)
            console.log(self.weeksRange)

            $q.when()
                .then(function () {
                    return getWorkplaces()
                })
                .then(function () {
                    return getMasters()
                })
                .then(function () {
                    return getServices();
                })
                .then(function(){
                    if(self.placeId){
                        self.selectedWorkplace=angular.copy(self.workplaces.getOFA('_id',self.placeId))
                    }
                    if(self.selectedWorkplace){
                        self.query.workplace = self.selectedWorkplace._id;
                        //console.log(self.query)
                    }else{
                        self.selectedWorkplace={}
                    }
                    self.query['user._id']='schedule'
                    return getBooking()
                })
                /*.then(function () {
                    return getServices();
                })*/
                .catch(function (err) {
                    console.log(err)
                    exception.catcher('инициализация')(err)
                })
        }
        function setWeekDates(week) {
            self.week=week;
            if(!week){
                var date = self.td;

            }else{
                var date= new Date(self.td)
                date.setTime(date.getTime() + (week*7)*86400000);
                date.setHours(0)
            }

            self.datesOfWeeks=Booking.getDatesForWeek(date);
            try{
                self.currentMonth=moment(date).format('MMMM')
                //console.log(self.currentMonth)
            }catch(err){}

            self.currentDayOfWeek=self.date.getDay()
            if(self.currentDayOfWeek==0){self.currentDayOfWeek=7;}
            self.currentDayOfWeek--;
            if(week){self.currentDayOfWeek==0;}
            self.query={date:{$in:self.datesOfWeeks.map(function (item) {
                return item.date
            })},master:self.masterId};
            //console.log(self.query)

        }
        function changeWeek(week) {
            //console.log('week',week)
            setWeekDates(week)
            self.tempEntry=null;
            console.log(self.weeksRange)
            $q.when()
                .then(function () {
                    return getBooking()
                })
        }
        function getWorkplaces(){
            return $q.when()
                .then(function(){
                    //return Master.getList()
                    return Workplace.getList(null,{})
                })
                .then(function(data){
                    self.workplaces=data
                })
                .catch(function(err){
                    exception.catcher('получение списка рабочих мест')(err)
                });
        }
        function getMasters(){
            return $q.when()
                .then(function(){
                    //return Master.getList()
                    return global.get('masters').val
                })
                .then(function(data){
                    //console.log(data)
                    self.masters=data
                })
                .catch(function(err){
                    exception.catcher('получение списка мастеров')(err)
                });
        }



        function getBooking() {
            Booking.getBookingWeekScheldule(self.query,self.selectedWorkplace,self.datesOfWeeks,self.items,self.masters,ngClickOnEntry)
                .then(function(data) {
                    //console.log(data)
                });
        }
        function getServices() {
            return $q.when()
                .then(function () {
                    return Stuff.getServicesForOnlineEntry()

                })
                .then(function (res) {
                    global.set('services',res)
                    return self.items=res.map(function (s) {
                        s.duration=s.timePart*15
                        if(!s.currency){s.currency=global.get('store').val.mainCurrency}
                        s.currencyName=(global.get('store').val.currency && global.get('store').val.currency[s.currency] && global.get('store').val.currency[s.currency][2])?
                            global.get('store').val.currency[s.currency][2]:s.currency;
                        return s;

                    })
                })
                /*.then(function () {
                 console.log('self.items',self.items)
                 })*/
                .catch(function(err){
                    console.log(err)
                    exception.catcher('получение списка услуг')(err)
                });

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
        }
        function changeStartEndTimeParts(date) {
            if(!date){date=self.date}
            var dayOfWeek = date.getDay();
            var month = date.getMonth()
            var day = date.getDate();
            self.currentDayOfYear=Booking.getDayOfYear(month,day-1)
            if(global.get('store').val.timeTable){
                self.storeSchedule=angular.copy(global.get('store').val.timeTable)
                self.dayoff=(self.storeSchedule[dayOfWeek] && self.storeSchedule[dayOfWeek].is)?false:true;
                //console.log(self.storeSchedule)
                var start = (self.storeSchedule[dayOfWeek] && self.storeSchedule[dayOfWeek].start)?self.storeSchedule[dayOfWeek].start:6
                var end = (self.storeSchedule[dayOfWeek] && self.storeSchedule[dayOfWeek].end)?self.storeSchedule[dayOfWeek].end:20
                self.startTimeParts=start *4
                self.endTimeParts=end *4
                for(dayOfWeek in global.get('store').val.timeTable){
                    if(global.get('store').val.timeTable[dayOfWeek].start<start){
                        start=global.get('store').val.timeTable[dayOfWeek].start;
                    }
                    if(global.get('store').val.timeTable[dayOfWeek].end>end){
                        end=global.get('store').val.timeTable[dayOfWeek].end;
                    }
                }
                //console.log(self.startTimeParts,self.endTimeParts)
                self.startTimeParts=start *4
                self.endTimeParts=end *4
            }
        }
        function filterTimePart(part) {
            return part.i>=self.startTimeParts&&part.i<self.endTimeParts
        }
        function filterTimePartForMaster(part) {
            if(self.timePartsI.indexOf(part.i)<0){
                return;
            }
            return part.i>=self.startTimeParts&&part.i<self.endTimeParts
        }
        function getDateObj(dateStr) {
            var year = dateStr.substring(4,8)
            var month = dateStr.substring(8,10)
            var day = dateStr.substring(10)

            try{
                var date = new Date(year,month,day)
                var s =moment(date).format('ddd');
                return s+'/'+day;
            }catch(err){console.log(err);return 'error handle date'}
        }
        function getDateObjFromStr(dateStr) {
            var year = dateStr.substring(4,8)
            var month = dateStr.substring(8,10)
            var day = dateStr.substring(10)

            try{
                var date = new Date(year,month,day)
                return date;
            }catch(err){console.log(err);return 'error handle date'}
        }
        function disabledTimePart(part,index) {
            if(!self.week && index==self.currentDayOfWeek){
                //console.log('провека времени записи')
                var d = new Date()
                var h = d.getHours();
                var p = Math.ceil(d.getMinutes()/15)-1;
                if(part.i-h*4+p<4){
                    return true;
                }
            }
        }

        function scheduleTransfer() {
            Booking.scheduleTransfer().then(
                function (err) {
                    if(err){
                        exception.catcher('перенос расписания')(err)
                    }else{
                        exception.showToaster('info','перенос расписания','Ok')
                    }
                    //console.log('!!!!!!!!!!!!!!')
                    getBooking()
                }
            )

        }


        function ngClickOnEntry(date){
            return;
            var item=this;
            //console.log(item)
            newBooking(self.masters,item)
        }

        function newBooking(masters,part){
            if(part.out){console.log('out');return}
            var val =part.i;
            var start=val;
            var entry,entries=[];


            var entryTimeTable=master.week[part.date].entryTimeTable;

            if(entryTimeTable[val].busy){
                editBooking(entryTimeTable[val].entry,val)
                return
            }
            $q.when()
                .then(function(){
                    //console.log(global.get('store').val)
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
                            paySum:s.price||0,
                            currency:s.currency|| global.get('store').val.mainCurrency,
                            user:entry.user,
                            tz:tz
                        };
                        if(s.backgroundcolor){o.service.backgroundcolor=s.backgroundcolor}
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
                            return Booking.save(e).$promise
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
                    console.log('?????')
                    getBooking()
                })
                .catch(function(err){
                    if(err){
                        exception.catcher(action)(err)
                    }

                })
        }

    }

    scheduleEntryCtrl.$inject=['$scope','Booking','Master','Stuff','$rootScope','global','Confirm','$q','exception','socket','$state','Workplace'];
    function scheduleEntryCtrl($scope,Booking,Master,Stuff,$rootScope,global,Confirm,$q,exception,socket,$state,Workplace){
        var self = this;
        self.moment=moment;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$rootScope.$state;
        self.Items=Booking;
        var entryId= $rootScope.$stateParams.id

        activate(entryId)


        function activate(id) {
            self.Items.getItem(id).then(function(data){
                console.log(data)
                self.entry=data;
            })
        }
    }

})()
