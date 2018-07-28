'use strict';
(function(){
    angular.module('gmall.services')
        .directive('scheduleMaster',scheduleDirective)
        .directive('schedulePlace',schedulePlaceDirective)
        .directive('schedulePlaceFromServer',schedulePlaceFromServerDirective)
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

    function scheduleDirective(global){
        return {
            scope: {
                masterId:'@'
            },
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: function () {
                var s=(global.get('mobile') && global.get('mobile').val)?'Mobile':'';
               return 'views/template/partials/home/schedule/directive/schedule'+s+'.html'
            }
        }
    };
    function schedulePlaceDirective(global){
        return {
            scope: {
                placeId:'@',
                scheduleStuff:'@',
            },
            bindToController: true,
            controller: placeCtrl,
            controllerAs: '$ctrl',
            templateUrl: function(element,attrs){
                var s=(attrs && attrs.templ && attrs.templ!='0')?attrs.templ:'';
                var sM=(attrs && attrs.mobile)?'Mobile':'';
                var url = 'views/template/partials/home/scheduleplace/directive/scheduleplace'+s+sM+'.html'
                //console.log(url)
                return url
            }
        }
    };
    function schedulePlaceFromServerDirective(global){
        return {
            /*scope: {
                stuff:'@'
            },*/
            scope:true,
            bindToController: true,
            controller: schedulePlaceFromServerCtrl,
            controllerAs: '$ctrl',
            replace: false,
            /*transclude: true,
            template: '<div ng-transclude></div>'*/
        }
    };
    listCtrl.$inject=['$scope','Booking','Master','Stuff','$rootScope','global','Confirm','$q','exception','socket','$state'];
    function listCtrl($scope,Booking,Master,Stuff,$rootScope,global,Confirm,$q,exception,socket,$state){
        var self = this;
        //console.log('listCtrl!!')
        self.moment=moment;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$rootScope.$state;
        self.Items=Booking;
        self.onlineEntr={};
        self.date = new Date();
        self.td=new Date();
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
            maxDate: dtt.setDate(dtt.getDate() + 30),
            //minDate: dtt,
            startingDay: 1
        }


        //self.getList=getList;
        self.newBooking=newBooking;
        self.changeDate=changeDate;


        self.selectStuff=selectStuff;

        self.filterTimePart=filterTimePart;
        self.filterTimePartForMaster=filterTimePartForMaster;
        self.booking=booking;
        self.getDateObj=getDateObj;
        self.changeWeek=changeWeek;
        self.disabledTimePart=disabledTimePart;



        self.$onInit=function () {
            activate();
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
            $scope.mastersRepeatDone()
        }

        //*******************************************************

        

        function activate() {
            socket.on('newRecordOnSite',function(){
                console.log('newRecordOnSite');
                getBooking()
            })
            if(!global.get('user').val){
                $scope.$on('logged',function(){
                    setUserAtEntry()
                })
            }
            changeStartEndTimeParts()
            setWeekDates(0)
            self.weeksRange=Booking.getWeeksRange(self.td)


            $q.when()
                .then(function () {
                    return getMasters()
                })
                .then(function(){
                    /*console.log(self.masters)
                    console.log(self.masterId)*/
                    self.selectedMaster=angular.copy(self.masters.getOFA('_id',self.masterId))
                    //console.log(self.selectedMaster)
                    if(self.selectedMaster){
                        self.query.master = self.selectedMaster._id;
                        //console.log(self.query)
                    }else{
                        self.selectedMaster=angular.copy(self.masters.getOFA('url',self.masterId))
                        if(self.selectedMaster){
                            self.query.master = self.selectedMaster._id;
                        }else{
                            self.masters=null;
                            throw "master doesn't match222"
                        }
                    }
                    //console.log(self.selectedMaster)
                    return getBooking()
                })
                .then(function () {
                    return getServices();
                })
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
            //console.log(self.datesOfWeeks)
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
        }
        function changeWeek(week) {
            setWeekDates(week)
            self.tempEntry=null;
            $q.when()
                .then(function () {
                    return getBooking()
                })
        }
        function getMasters(){
            return $q.when()
                .then(function(){
                    //return Master.getList()
                    return global.get('masters').val
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
            //console.log(self.query,self.datesOfWeeks)
            Booking.getBookingWeek(self.query,self.selectedMaster,self.datesOfWeeks,ngClickOnEntry)
                .then(function(data) {
                    if(global.get('user').val){
                        setUserAtEntry()
                    }
                });
        }
        function getBookingOld() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.selectedMaster['week']={}
                    self.datesOfWeeks.forEach(function (d,dayOfWeek) {
                        self.selectedMaster['week'][d.date]={}
                        self.selectedMaster['week'][d.date].entryTimeTable=angular.copy(self.timeParts);
                        self.selectedMaster['week'][d.date].entryTimeTable.forEach(function (p,i) {
                            p.date=d.date;
                            p.ngClickOnEntry=ngClickOnEntry;
                            if(self.storeSchedule){
                                // в self.storeSchedule 0 - это воскр у нас 0 - это понедельник
                                var j = dayOfWeek+1;
                                if(dayOfWeek==6){
                                    j=0;
                                }
                                if(!self.storeSchedule[j].is || p.i<self.storeSchedule[j].start*4 || p.i>=self.storeSchedule[j].end*4){
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
                    setBookingDataInMasters(data)
                    if(global.get('user').val){
                        setUserAtEntry()
                    }
                });
        }

        function clearTempBooking() {
            var e = self.tempEntry;
            if(!e){return}
            var master= self.selectedMaster;
            for(var i=e.start;i<e.start+e.qty;i++){
                master.week[e.date].entryTimeTable[i].busy=false;
                delete master.week[e.date].entryTimeTable[i].temp
                delete master.week[e.date].entryTimeTable[i].entry
                delete master.week[e.date].entryTimeTable[i].user
                delete master.week[e.date].entryTimeTable[i].phone
                delete master.week[e.date].entryTimeTable[i].email
                delete master.week[e.date].entryTimeTable[i].usedTime
                delete master.week[e.date].entryTimeTable[i].service
                delete master.week[e.date].entryTimeTable[i].qty
                delete master.week[e.date].entryTimeTable[i].noBorder
                delete master.week[e.date].entryTimeTable[i].new
                delete master.week[e.date].entryTimeTable[i].ngClick
            }
        }
        function setTempBooking(e) {
            self.tempEntry=e;
            var master= self.selectedMaster;
            for(var i=e.start;i<e.start+e.qty;i++){
                master.week[e.date].entryTimeTable[i].busy=true;
                master.week[e.date].entryTimeTable[i].temp=true;
                if(i==e.start){
                    if(e.user){
                        master.week[e.date].entryTimeTable[i].user= e.user.name;
                        master.week[e.date].entryTimeTable[i].phone= e.user.phone;
                        master.week[e.date].entryTimeTable[i].email= e.user.email||'';
                    }
                    master.week[e.date].entryTimeTable[i].usedTime=Booking.getUsedTime(e.start,e.qty);
                    master.week[e.date].entryTimeTable[i].service= e.service.name;
                    master.week[e.date].entryTimeTable[i].new=true;
                    master.week[e.date].entryTimeTable[i].qty=e.qty;
                }
                if(i!=e.start){
                    master.week[e.date].entryTimeTable[i].noBorder=true
                }
                master.week[e.date].entryTimeTable[i].entry=e;
            }
        }
        function ngClickOnEntry(date,index) {
            var item=this;
            if(!item.user && !item.temp){
                newBooking(date,item,index)
            }else if(item.user  && !item.temp && item.uiSref){
                $state.go('cabinet',{sec:'online'})
            }else if(item.temp){
                clearTempBooking()
            }
        }
        /* не используется*/
        function setBookingDataInMasters(booking){
            booking.forEach(function(e){
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
                    if(i==e.start){
                        console.log(master.week[e.date].entryTimeTable[i])
                    }
                }
            })
        }
        function setUserAtEntry() {
            var user= global.get('user').val
            for(var key in self.selectedMaster.week){
                self.selectedMaster.week[key].entryTimeTable.forEach(function (part) {
                    if(part.userId && part.userId==user._id){
                        part.user=global.get('langOrder').val.yourEntry||'Ваша запись'
                        part.uiSref="cabinet({sec:'online'})"
                    }
                })
            }

        }
        function getServices() {
            return $q.when()
                .then(function () {
                    //console.log(global.get('services').val)
                    if(!global.get('services').val){
                        return Stuff.getServicesForOnlineEntry()
                    }else{
                        return global.get('services').val
                    }

                })
                .then(function (res) {
                    if(!global.get('services').val){
                        global.set('services',res)
                    }
                    //console.log('res',res)
                    return self.items=res.map(function (s) {
                        s.duration=s.timePart*15
                        if(!s.currency){s.currency=global.get('store').val.mainCurrency}
                        s.currencyName=(global.get('store').val.currency && global.get('store').val.currency[s.currency] && global.get('store').val.currency[s.currency][2])?
                            global.get('store').val.currency[s.currency][2]:s.currency;
                        return s;

                    }).filter(function (s) {
                        return self.selectedMaster.stuffs.some(function (stuff) {
                            return stuff==s._id
                        })
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
        function newBooking(date,part,index){
            if(part.busy || part.out || (index<self.currentDayOfWeek && !self.week)){
                return;
            }
            if(!self.week && index==self.currentDayOfWeek){
                //console.log('провека времени записи')
                var d = new Date()
                var h = d.getHours();
                var p = Math.ceil(d.getMinutes()/15)-1;
                if(part.i-h*4+p<4){
                    console.log('провека времени записи. просрочена')
                    return;
                }
            }
            $q.when()
                .then(function () {
                    //console.log(self.items)
                    return Booking.selectService(self.items)
                })
                .then(function (item) {
                    clearTempBooking()
                    var val = part.i;
                    for(var i=0+val;i<item.timePart+val;i++){
                        if(!self.selectedMaster['week'][date].entryTimeTable[i] || self.selectedMaster['week'][date].entryTimeTable[i].out || self.selectedMaster['week'][date].entryTimeTable[i].busy){
                            throw 'Не хватает времени'
                        }
                    }
                    var e = {
                        date:date,
                        service:{
                            name:item.name
                        },
                        stuffName:item.name,
                        stuffNameL:item.nameL,
                        stuffLink:item.link,
                        backgroundcolor:item.backgroundcolor,
                        masterName:self.selectedMaster.name,
                        masterNameL:self.selectedMaster.nameL,
                        masterUrl:self.selectedMaster.url,
                        start:part.i,
                        qty:item.timePart
                    }
                    //console.log(item);
                    setTempBooking(e)
                    self.newEntry={}
                    var tempDate = self.datesOfWeeks.getOFA('date',date);
                    self.newEntry.stuff=item;
                    self.newEntry.date=tempDate.d;
                    self.newEntry.timePart={i:part.i,date:tempDate.date,master:self.selectedMaster._id};
                })
                .catch(function(err){
                    console.log(err)
                    if(err && err!="backdrop click"){
                        exception.catcher('запись на время')(err)
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

            if(part.i>=self.startTimeParts&&part.i<self.endTimeParts){
                // здесь проверка конкретного для для мастера
                if(self.selectedMaster['week'][part.date].masterSchedule){
                    if(part.i<self.selectedMaster['week'][part.date].masterSchedule.s
                        ||part.i>=self.selectedMaster['week'][part.date].masterSchedule.e
                        || !self.selectedMaster['week'][part.date].masterSchedule.is){
                        part.out=true;
                    }
                }
                //console.log(self.mastersO[part.master],part.master)
                return true;
            }else{
                part.out=true;
            }
        }
        function booking() {
            if(!self.newEntry){return;}

            /*if(!self.week && index==self.currentDayOfWeek){
                //console.log('провека времени записи')
                var d = new Date()
                var h = d.getHours();
                var p = Math.ceil(d.getMinutes()/15)-1;
                console.log(part.i,h*4+p)
                if(part.i-h*4+p<4){
                    console.log('провека времени записи. просрочена')
                    return;
                }
            }*/

            self.newEntry.master=self.selectedMaster._id;
            //console.log(self.newEntry)
            global.get('functions').val.witget('dateTime',self.newEntry)
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

    }
    placeCtrl.$inject=['$scope','Booking','Master','Stuff','$rootScope','global','Confirm','$q','exception','socket','$state','Workplace','$element'];
    function placeCtrl($scope,Booking,Master,Stuff,$rootScope,global,Confirm,$q,exception,socket,$state,Workplace,$element){
        var self = this;
        if(angular.element($element).data('stuff')){
            self.stuff=angular.element($element).data('stuff');
        }
        self.moment=moment;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$rootScope.$state;
        self.Items=Booking;
        self.onlineEntr={};
        self.date = new Date();
        self.td=new Date();
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


        self.week=0;
        self.noWrapSlides = true;
        $scope.$watch(function () {
            return self.week
        },function (n,o) {
            if(n!=o){
                self.changeWeek(n)
            }
        })

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
        self.slideMasterWeekArry=[{id:0,active:false},{id:1,active:false},{id:2,active:false},{id:3,active:false},{id:4,active:false},{id:5,active:false},{id:6,active:false}]
        self.currentDayOfWeek=5;
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


        self.changeDate=changeDate;



        self.filterTimePart=filterTimePart;
        self.filterTimePartForMaster=filterTimePartForMaster;
        self.getDateObj=getDateObj;
        self.changeWeek=changeWeek;
        self.disabledTimePart=disabledTimePart;

        self.swipeLeft=swipeLeft
        self.swipeRight=swipeRight
        function swipeLeft(idx) {
            if(idx.id<6){self.currentDayOfWeek++}else{self.currentDayOfWeek=0}
        }
        function swipeRight(idx) {
            if(idx.id==0){self.currentDayOfWeek=6}else{self.currentDayOfWeek--}
        }



        self.$onInit=function () {
            activate();
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
                    if(self.stuff){
                        self.query['service._id']=self.stuff;
                    }
                    //console.log(self.query)
                    return getBooking()
                })
                .then(function () {
                    return getServices();
                })
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
        }
        function changeWeek(week) {
            setWeekDates(week)
            self.tempEntry=null;
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
            //console.log(self.query)
            //console.log(self.datesOfWeeks)
            Booking.getBookingWeekScheldule(self.query,self.selectedWorkplace,self.datesOfWeeks,self.items,self.masters)
                .then(function(data) {});
        }
        function getServices() {
            return $q.when()
                .then(function () {
                    //console.log(global.get('services').val)
                    if(!global.get('services').val){
                        return Stuff.getServicesForOnlineEntry()
                    }else{
                        return global.get('services').val
                    }

                })
                .then(function (res) {
                    if(!global.get('services').val){
                        global.set('services',res)
                    }
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

    }
    schedulePlaceFromServerCtrl.$inject=['$scope','$http','global','$q','$compile','$attrs']
    function schedulePlaceFromServerCtrl($scope,$http,global,$q,$compile,$attrs) {
        var self = this;
        self.moment=moment;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.changeWeek=changeWeek;
        self.chancheActiveSlide=chancheActiveSlide;
        self.changeService=changeService;

        self.week=0;
        var delay;
        self.services=null;
        if($attrs.services){
            try{
                var services = JSON.parse($attrs.services);
                //console.log(global.get('services').val)
            }catch(err){
                console.log(err)
            }
        }
        if($attrs.stuff){
            self.stuff=$attrs.stuff;
        }
        self.$onInit=function () {
            //console.log($attrs)
            //console.log(self.stuff)
        }
        $scope.$watch(function () {
            return self.week
        },function (n,o) {
            if(n!=o){
                self.changeWeek(n)
            }
        })
        function changeWeek(week,service) {
            self.week=week
            if(!service){service=$attrs.stuff}
            //console.log(week)
            return $q.when()
                .then(function(){
                    var url='views/template/partials/scheduleplace/'+week
                    return $http.get(url.trim()+'.html',{params:{stuff:service,templ:$attrs.templ}})
                })
                .then(function(response){
                   // console.log(response)
                    if(!response){return;}
                    var addHtml=angular.element(response.data.html)
                    var atd1;
                    if(addHtml.find('#innerDivInschedule').html()){
                        atd1=$compile(addHtml.find('#innerDivInschedule').html())($scope)
                    }else{
                        atd1=$compile(addHtml)($scope)
                    }

                    var innerDivInschedule=$('#innerDivInschedule');
                    if(innerDivInschedule[0]){
                        innerDivInschedule.empty().append(atd1)
                    }

                })
                .catch(function (err) {
                    console.log(err)
                })
        }
        function chancheActiveSlide(direction) {
            if(delay){return}
            var week=self.week;
            if(direction=='right'){
                if(week>0){
                    week--;
                }else{
                    return;
                }
            }else{
                if(week<6){
                    week++;
                }else{
                    return
                }
            }
            delay=true;
            changeWeek(week).then(function () {
                delay=false;
            })


        }
        function changeService(s) {
            //console.log(delay,s)
            self.stuff=s
            if(delay){return}
            delay=true;
            changeWeek(self.week,s).then(function () {
                delay=false;
            })
        }
    }
})()
