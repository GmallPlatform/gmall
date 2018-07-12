'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('dateTimeEntry',itemDirective)

    function itemDirective(){

        return {
            scope: {

            },
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            //templateUrl: 'components/TEMPLATE/dateTimeEntry/dateTimeEntry.html',
            //templateUrl: 'views/template/partials/dateTime/dateTimeEntry'+s+'.html',
            template: '<div ng-include="::$ctrl.getContentUrl()"></div>'
            /*templateUrl: function(){
                console.log(global.get('store').val)
                var s = (global.get('store').val.template.addComponents.datetime.templ)?global.get('store').val.template.addComponents.datetime.templ:'';
                return 'views/template/partials/dateTime/dateTimeEntry'+s+'.html'
            }*/
        }
    }
    itemCtrl.$inject=['$scope','Booking','UserEntry','$user','$element','$timeout','Stuff','Master','$stateParams','$state','$q','$uibModal','exception','global','$rootScope','$auth','Account','$http','CreateContent','$notification','socket'];
    function itemCtrl($scope,Booking,UserEntry,$user,$element,$timeout,Stuff,Master,$stateParams,$state,$q,$uibModal,exception,global,$rootScope,$auth,Account,$http,CreateContent,$notification,socket){
        var self = this;
        function getContentUrl() {
            var s = (global.get('store').val.template.addcomponents.datetime.templ)?global.get('store').val.template.addcomponents.datetime.templ:'';
            //console.log('views/template/partials/dateTime/dateTime/dateTime'+s+'.html')
            return 'views/template/partials/dateTime/dateTime/dateTime'+s+'.html'
        }
        self.moment=moment;
        var blocks, widthBlock;
        var w2;
        var opened;
        self.Items=Stuff;
        self.items=[];
        //console.log(self.selectedStuff)
        /*if (self.stuff){
            self.selectedStuff=self.stuff;
        }*/
        //self.selectedTime=null;
        /*self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
        self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';*/

        //2223333344

        //self.themeUIselect=(!global.get('mobile').val)?'selectize':'bootstrap';
        //self.searchUIselect=(!global.get('mobile').val)?true:false;
        //self.themeUIselect='bootstrap';
        //self.searchUIselect=false;

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
        self.timePartsI=[];
        for(var i=0;i<96;i=i+1+delta){
            self.timePartsI.push(i)
        }


        self.selectedStuff=[];
        self.timeTable15min=Booking.timeTable15min;
        self.timeParts=Booking.timeParts;
        self.timeRemindArr=Booking.timeRemindArr;
        var month, day, year;
        self.moment=moment;
        self.global=global;
        self.mobile=global.get('mobile' ).val;
        self.today=moment(Date.now())
        self.dateEnd=moment(self.today + (30 * 24 * 60 * 60 * 1000))

        self.countries = [ // Taken from https://gist.github.com/unceus/6501985
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Åland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'Andorra', code: 'AD'},
            {name: 'Angola', code: 'AO'},
            {name: 'Anguilla', code: 'AI'},
            {name: 'Antarctica', code: 'AQ'},
            {name: 'Antigua and Barbuda', code: 'AG'},
            {name: 'Argentina', code: 'AR'},
            {name: 'Armenia', code: 'AM'},
            {name: 'Aruba', code: 'AW'},
            {name: 'Australia', code: 'AU'},
            {name: 'Austria', code: 'AT'},
            {name: 'Azerbaijan', code: 'AZ'},
            {name: 'Bahamas', code: 'BS'},
            {name: 'Bahrain', code: 'BH'},
            {name: 'Bangladesh', code: 'BD'}
        ];





        //****************** set data for date
        self.td= new Date();
        self.altInputFormats = ['M!/d!/yyyy'];
        var today = new Date()
        self.dateOptions={
            minDate: new Date(),
            maxDate: new Date().setDate(today.getDate()+30)
            //dateDisabled: disabled,
            //formatYear: 'yy',
            //startingDay: 1
        };
        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
        //********************************************************

        //self.orderDate=moment(Date.now()).format('LLLL');
        //console.log(self.orderDate)
        self.getContentUrl=getContentUrl;

        self.back=back;
        self.forward=forward;
        self.authComplite=authComplite;


        //stuff
        self.addStuff=addStuff;
        self.deleteStuff=deleteStuff;
        self.clearStuff=clearStuff;
        self.getStuffDuration=getStuffDuration;

        self.selectMaster=selectMaster;
        self.clearMaster=clearMaster;
        self.selectMasterFromList=selectMasterFromList;
        self.displaySelectMasterBlock=displaySelectMasterBlock;
        self.otherFreeTime=otherFreeTime;

        self.setDay=setDay;
        self.handleTimePart=handleTimePart;
        self.setTimePart=setTimePart;
        self.clearTimePart=clearTimePart;
        self.filterTimePart=filterTimePart;
        self.filterNearesBlock=filterNearesBlock;
        self.filterTimePartForAll=filterTimePartForAll;// фильтр для отображения текста о том что нет свободного времени для записи

        self.orderService=orderService;
        self.sendCodeToPhone=sendCodeToPhone;
        self.verifyCode=verifyCode;
        self.sendMessage=sendMessage;// отправка уведомления о записи на телефон

        self.checkDisable=checkDisable;

        function checkDisable(form) {
            console.log(form)
        }



        //self.getTagName=getTagName;
        /*self.getFilterName=getFilterName;
        var stuffs;*/

        //********************activate***************************
        self.$onInit=function () {
            activate();
        }

        //*******************************************************
        function activate() {
            self.searchEnabled=(!global.get('mobile').val)?true:false;
            self.dateTimeImg=(global.get('store').val.dateTimeImg)?global.get('store').val.dateTimeImg:null;
            self.masterName=global.get('lang').val.masters;
            if(global.get('store').val.texts && global.get('store').val.texts.masterName && global.get('store').val.texts.masterName[global.get('store').val.lang]){
                self.masterName=global.get('store').val.texts.masterName[global.get('store').val.lang]
            }
            $timeout(function(){
                $($element).height($($element).parent().height())
                $($element).find('#wrapper-for-entry1').height('100%')
                self.currentBlock=0;
            },1500)

            $(window).resize(function(){
                $($element).height($($element).parent().height())
                $($element).find('#wrapper-for-entry1').height('100%')
                if(blocks && blocks[0]){
                    widthBlock=$(blocks[0]).width()
                }

            })
            $(window).bind('orientationchange', function(event) {
                $($element).height($($element).parent().height())
                $($element).find('#wrapper-for-entry1').height('100%')
                if(blocks && blocks[0]){
                    widthBlock=$(blocks[0]).width()
                }
            });
            $scope.$on('dateTime',function(e,argsObj){
                //console.log(argsObj)
                self.currentBlock=0;
                var stuff=null;
                var master=null;
                if(argsObj){
                    if(argsObj.stuff){
                        stuff=argsObj.stuff
                    }
                    if(argsObj.master){
                        master=argsObj.master
                    }

                }

                self.name=(global.get('user').val && global.get('user').val.profile && global.get('user').val.profile.fio)?global.get('user').val.profile.fio:'';
                self.phone=(global.get('user').val && global.get('user').val.profile && global.get('user').val.profile.phone)?global.get('user').val.profile.phone:'1';
                //console.log(self.name,self.phone)
                if(!opened){
                    opened=true;
                    $q.when()
                        .then(function () {
                            return getMasters()
                        })
                        .then(function () {
                            return getItems();
                        })
                        .then(function () {
                            //console.log(self.masters)
                            if(self.masters && self.masters.length && self.masters.length==1){
                                master=self.masters[0]._id;
                            }
                            if(master){
                                setMaster(master)
                                return Booking.filterListServices(self.masters,self.items,self.selectedStuff);
                            }
                            //self.currentBlock=0;

                        })
                        .then(function () {
                            if(!stuff){return Booking.filterListServices(self.masters,self.items,self.selectedStuff);}else{
                                if(stuff.getDataForBooking){
                                    addStuff(stuff.getDataForBooking())
                                }else{
                                    var s= Stuff.getDataForBooking.call(stuff)
                                    addStuff(s)
                                }

                            }

                        })
                        .then(function () {
                            self.showMasterBlock=displaySelectMasterBlock()
                        })
                        .then(function () {
                            if(argsObj && argsObj.date){
                                self.td= new Date(argsObj.date)
                                setDataForDay(argsObj.date)
                            }
                            if(argsObj && argsObj.timePart){
                                argsObj.timePart.master=self.masters.getOFA('_id',argsObj.timePart.master)
                                self.timePart= argsObj.timePart

                            }

                        })
                        .catch(function (err) {
                            console.log(err)
                            if(err){
                                exception.catcher('init')(err)
                            }
                        })

                }else{
                    if(self.masters && self.masters.length && self.masters.length==1){
                        master=self.masters[0]._id;
                        setMaster(master)
                        Booking.filterListServices(self.masters,self.items,self.selectedStuff);
                        if(stuff){
                            self.selectedStuff.length=0;
                            if(stuff.getDataForBooking){
                                addStuff(stuff.getDataForBooking())
                            }else{
                                var s= Stuff.getDataForBooking.call(stuff)
                                addStuff(s)
                            }
                        }
                        if(argsObj && argsObj.date){
                            self.td= new Date(argsObj.date)
                            setDataForDay(argsObj.date)
                        }
                        if(argsObj && argsObj.timePart){
                            argsObj.timePart.master=self.masters.getOFA('_id',argsObj.timePart.master)
                            self.timePart= argsObj.timePart

                        }
                    }else{
                        if(master){
                            setMaster(master)
                            self.selectedStuff.length=0;
                            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
                        }
                        if(stuff){
                            self.selectedStuff.length=0;
                            //clearMaster()
                            if(stuff.getDataForBooking){
                                addStuff(stuff.getDataForBooking())
                            }else{
                                var s= Stuff.getDataForBooking.call(stuff)
                                addStuff(s)
                            }
                        }
                        if(argsObj && argsObj.date){
                            self.td= new Date(argsObj.date)
                            setDataForDay(argsObj.date)
                        }
                        if(argsObj && argsObj.timePart){
                            argsObj.timePart.master=self.masters.getOFA('_id',argsObj.timePart.master)
                            self.timePart= argsObj.timePart
                            console.log(self.timePart)

                        }
                        Booking.filterListServices(self.masters,self.items,self.selectedStuff);
                    }
                    self.showMasterBlock=displaySelectMasterBlock()
                }
            })
        }
        function getMasters(){
            return $q.when()
                .then(function(){
                    return global.get('masters').val;
                })
                .then(function(data){
                    //console.log(data)
                    self.masters=data.map(function(m){
                        //m.stuffs=m.stuffs.map(function(s){return s._id})
                        return m
                    }).filter(function(m){return (m.stuffs && m.stuffs.length)});

                })
                .catch(function(err){
                    exception.catcher('получение списка мастеров')(err)
                });
        }
        function setMaster(master){
            self.masters.forEach(function (m) {
                if(m._id==master){
                    m.selected=true;
                    self.selectedMaster=m;
                    m.show=true;
                    //console.log(m)
                }else{
                    m.selected=null;
                    m.show=false;
                }
            })
            self.timePart=null
            //console.log(self.master)
        }
        function getItems() {
            return $q.when()
                .then(function () {
                    return self.Items.getServicesForOnlineEntry()
                })
                .then(function (res) {
                    //console.log(res)
                    return self.items=res;
                })
                .catch(function(err){
                    exception.catcher('получение списка услуг')(err)
                });

            return;
        }
        function back() {
            self.currentBlock=0;
            return;
            console.log(self.currentBlock)
            if(self.currentBlock==4){
                self.currentBlock=3;
            } else {
                self.currentBlock=0;
            }

        }
        function forward(){
            self.currentBlock=0;
        }
        function authComplite() {
            self.currentBlock=0;
        }


        //***********************stuff
        function addStuff(stuff) {
            if(self.selectedStuff.map(function(s){return s.name}).indexOf(stuff.name)>-1){
                console.log('already is in list')
                return;
            }
            if(!self.selectedMaster || self.selectedMaster._id=='any'){
                self.selectedStuff.length=0;
            }
            self.selectedStuff.push(stuff);
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            self.showMasterBlock=displaySelectMasterBlock()
            //console.log(self.showMasterBlock)
            if(!self.showMasterBlock){
                selectMaster('any')
            }
            self.timePart=null
            self.stuffForEntry=null;
            back()
            //console.log(self.masters)
        }
        function deleteStuff(i,event) {
            //console.log(event)
            event.stopPropagation();
            self.selectedStuff.splice(i,1);
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            self.showMasterBlock=displaySelectMasterBlock()
            if(!self.showMasterBlock && self.selectedStuff.length){
                selectMaster('any')
            }
            console.log(!self.selectedStuff.length && self.selectedMaster && self.selectedMaster._id=='any')
            if(!self.selectedStuff.length && self.selectedMaster && self.selectedMaster._id=='any'){
                clearMaster()
            }
            self.timePart=null
        }
        function clearStuff(){
            self.selectedStuff.length=0
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            self.showMasterBlock=displaySelectMasterBlock()
            if(!self.showMasterBlock){
                selectMaster('any')
            }
            if(!self.selectedStuff.length && self.selectedMaster && self.selectedMaster._id=='any'){
                clearMaster()
            }
            self.timePart=null
        }
        function getStuffDuration(stuff) {
            if(stuff.timePart){
                return stuff.timePart*minTimePart
            }else{
                return 30
            }
        }

        //**********************************************
        //***********master
        function selectMaster(master){
            if(master && master=='any'){
                self.selectedMaster={_id:'any',name:global.get('langForm').val.noObject}
            }else{
                self.masters.forEach(function (m) {
                    if(master){
                        if(master._id==m._id){
                            m.selected=true;
                            self.selectedMaster=m
                            //m.show=true;
                            //console.log(self.selectedMaster)
                        }else{
                            m.selected=null;
                            //m.show=false;
                        }
                    }else{
                        m.selected=true;
                    }

                })
            }
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            forward()
            self.timePart=null
        }
        function clearMaster(){
            //console.log('clearMaster')
            self.selectedMaster=null;
            self.masters.forEach(function (m) {
                m.selected=null;
            })
            //self.selectedStuff.length=1;
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            self.timePart=null
        }
        function selectMasterFromList() {
            self.masters.forEach(function (m) {
                m.nearestBlocks=null;
            })
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            self.currentBlock=2

            if(global.get('store').val.timeTable && !global.get('store').val.timeTable.some(function(day){return day.is})){return}// если нет ни одного рабочего дня

            var daysForCheck = 7;
            var date = self.td;
            var month = date.getMonth()
            var day = date.getDate();
            var year = date.getFullYear();


            var queryArr={$or:[]};
            var helpQuery=[]
            var helpQueryO={}
            var dayOfWeek;
            var monthStr

            var today = new Date()
            self.hours=today.getHours();
            self.minutes=Math.ceil(today.getMinutes()/15)-1;
            //console.log(self.hours,self.minutes)
            /*todo убрать 0*/
            var startBlockForCurrentDay=self.hours*4+self.minutes;
            var currentMonth = today.getMonth()
            var currentday =   today.getDate();
            var currentDayOfYear =  Booking.getDayOfYear(currentMonth,currentday-1);
            var daysOfMonth = Booking.getDaysOfMonth(month,year)
            var storeTimeTable = global.get('store').val.timeTable;
            /*формирование запроса*/
            for(var i = 0;i<daysForCheck;i++){
                date = new Date(year,month,day);
                dayOfWeek=date.getDay();
                /* только рабочие дни магазина*/
                while(!storeTimeTable[dayOfWeek].is){
                    day++;
                    if(day>daysOfMonth){
                        day=1;
                        month++
                        daysOfMonth = Booking.getDaysOfMonth(month,year)
                        if(month>11){
                            month=0;
                            year++;
                        }
                    }
                    date = new Date(year,month,day);
                    dayOfWeek=date.getDay();
                }
                monthStr=month;
                if(month<10){monthStr='0'+month}
                if(day<10){day='0'+day}
                queryArr.$or.push({date:'date'+year+monthStr+day});
                helpQuery.push({y:year,m:month,d:day,dayOfWeek:dayOfWeek,dayOfYear:Booking.getDayOfYear(month,day-1),query:'date'+year+monthStr+day})
                helpQueryO['date'+year+monthStr+day]=i;
                day++;
                if(day>daysOfMonth){
                    day=1;
                    month++
                    daysOfMonth = Booking.getDaysOfMonth(month,year)
                    if(month>11){
                        month=0;
                        year++;
                    }
                }
            }
            /******************************************************************/

            return Booking.getList({page:0,rows:3000},queryArr)
                .then(function(entries) {
                    var entriesForMaster=entries.reduce(function (o,item) {
                        /*console.log(o,item)
                        if(!o){o={}}*/
                        if(!o[item.master]){o[item.master]=[]}
                        o[item.master].push(item)
                        return o
                    },{})
                    //console.log(entriesForMaster)
                    /*длительность услуги*/
                    var durationStuffs=self.selectedStuff.reduce(function (s,item) {
                        //console.log(item)
                        return s+=item.timePart
                    },0)
                    //console.log(durationStuffs)
                    self.masters.forEach(function (m) {
                        m.nearestBlocks=[];
                        if(!m.show){return;}
                        /*время доступное для записи расчитывается только если есть выбранная услуга*/
                        if(!self.selectedStuff.length){return}
                        //console.log(m)
                        var entrs = [];
                        for(var i =0;i<daysForCheck;i++){
                            entrs.push([])
                        }
                        if(entriesForMaster[m._id]){
                            entriesForMaster[m._id].forEach(function (e) {
                                helpQueryO[e.date] // номер проверяемого дня
                                entrs[helpQueryO[e.date]].push(e)
                            })
                        }
                        //console.log(entr)


                        var blocks=[];
                        var startBlock;
                        var endBlock;
                        //startBlockForCurrentDay=60;
                        for(var i=0;i<daysForCheck;i++){
                            if(blocks.length){break}/*если на предыдущую дату уже есть свободный блок то следужщие дни не обрабатываем*/
                            if(m.timeTable && m.timeTable[helpQuery[i].dayOfYear] && !m.timeTable[helpQuery[i].dayOfYear].is){continue/*не рабочий день у мастера*/}
                            if(i==0 && helpQuery[i].dayOfYear==currentDayOfYear){
                                startBlock=startBlockForCurrentDay;
                            }else{
                                startBlock=0;
                            }
                            endBlock=95;
                            //console.log(startBlock,helpQuery[i].dayOfWeek,storeTimeTable)
                            /*console.log(startBlock)
                            console.log(endBlock)*/
                            /*установка времени работы магаза*/
                            if(storeTimeTable && storeTimeTable[helpQuery[i].dayOfWeek]){
                                if(storeTimeTable[helpQuery[i].dayOfWeek].start){
                                    var tempStart = storeTimeTable[helpQuery[i].dayOfWeek].start*4;
                                    if(tempStart>startBlock){
                                        startBlock=tempStart;
                                    }
                                }
                                if(storeTimeTable[helpQuery[i].dayOfWeek].end){
                                    var tempEnd = storeTimeTable[helpQuery[i].dayOfWeek].end*4;
                                    if(tempEnd<endBlock){
                                        endBlock=tempEnd;
                                    }
                                }

                            }
                            /*console.log(startBlock)
                            console.log(endBlock)*/
                            //console.log(m.timeTable,helpQuery[i].dayOfYear,currentDayOfYear)
                            /*установка времени работы для мастера*/
                            if(m.timeTable && m.timeTable[helpQuery[i].dayOfYear]){
                                if(m.timeTable[helpQuery[i].dayOfYear].s){
                                    var tempStart = m.timeTable[helpQuery[i].dayOfYear].s*4;
                                    if(tempStart>startBlock){
                                        startBlock=tempStart;
                                    }
                                }
                                if(m.timeTable[helpQuery[i].dayOfYear].e){
                                    var tempEnd = m.timeTable[helpQuery[i].dayOfYear].e*4;
                                    if(tempEnd<endBlock){
                                        endBlock=tempEnd;
                                    }
                                }
                            }

                            /*console.log(startBlock)
                            console.log(endBlock)*/

                            var entryTimeTable=angular.copy(Booking.timeParts)
                            entrs[i].forEach(function(e){
                                for(var ii=e.start;ii<e.start+e.qty;ii++){
                                    entryTimeTable[ii].busy=true;
                                }
                            })
                            var durationCheck;
                            for(var ii=startBlock;ii<=endBlock;ii++){
                                if(!entryTimeTable[ii].busy){
                                    durationCheck=true;
                                    /*проверка длятельности услуги*/
                                    if(durationStuffs){
                                        for(var iii=ii+1;iii<ii+durationStuffs;iii++){
                                            //console.log(ii,iii)
                                            if(iii>=endBlock || entryTimeTable[iii].busy){
                                                durationCheck=false;
                                                break;
                                            }
                                        }
                                    }
                                    if(!durationCheck){continue}

                                    var o={i:ii,date:helpQuery[i].query}
                                    if(!blocks.length){
                                        var dd= new Date(helpQuery[i].y,helpQuery[i].m,helpQuery[i].d);
                                        o.dateString = moment(dd).format('LL')
                                    }
                                    blocks.push(o)
                                    if(blocks.length>=5){break}
                                }

                            }
                            if(blocks.length>=5){break}
                        }
                        m.nearestBlocks=blocks;
                        //console.log(m.nearestBlocks)
                    })

                })
        }
        function displaySelectMasterBlock() {
            if(self.masters && self.masters.length){
                var criteria=self.masters.some(function (m) {
                    return m.show && !m.workplace
                })
                return criteria
            }

        }
        function otherFreeTime(master){
            selectMaster(master)
            handleTimePart()
        }
        //********************* date

        //************** day
        function setDay(td){
            if(self.selectedMaster && self.selectedStuff && self.selectedStuff.length){
                self.currentBlock=4;
            }else{
                back();
            }
            if(td){
                self.td=td;
            }

            setDataForDay(self.td);
            self.timePart=null
        }
        function setDataForDay(td) {
            var date = new Date(td);
            var currentdate = new Date()
            self.currentDay=currentdate.getDate()
            self.hours=currentdate.getHours();
            self.minutes=Math.ceil(currentdate.getMinutes()/15)-1;
            month = date.getMonth() //+ 1; //months from 1-12
            day = date.getDate();
            year = date.getFullYear();
            self.currentTimeBlock=(self.currentDay==day)?self.hours*4+self.minutes:0;
            //console.log('self.currentTimeBlock - ',self.currentTimeBlock)
            if(month<10){month='0'+month}
            if(day<10){day='0'+day}
            var query={date:'date'+year+month+day};
            //console.log(query)
            getBookingData(query)
        }

        //********************* timepart

        function getBookingData(query){
            var d  = new Date(self.td);
            var dayOfWeek = d.getDay();
            var month = d.getMonth()
            var day = d.getDate();
            var currentDayOfYear=Booking.getDayOfYear(month,day-1)
            //console.log(currentDayOfYear)

            var storeSchedule=angular.copy(global.get('store').val.timeTable[dayOfWeek])
            if(!storeSchedule){
                storeSchedule={start:0,end:95}
            }
            storeSchedule.start *=4
            storeSchedule.end *=4
            //console.log(storeSchedule)
            var masterSchedule;
            if(self.selectedMaster && self.selectedMaster.timeTable && self.selectedMaster.timeTable[currentDayOfYear]){
                masterSchedule=angular.copy(self.selectedMaster.timeTable[currentDayOfYear])
                masterSchedule.s*=4;
                masterSchedule.e*=4;
            }
            var lastBlock=95;

            //console.log(masterSchedule)

            return Booking.getList({page:0,rows:10},query)
                    .then(function(entries) {
                    //console.log(entries)
                    // продолжительность услуги
                    var stuffsDuration=self.selectedStuff.reduce(function(d,item){
                        //console.log(item)
                        return d+((item.timePart)?item.timePart:4)
                    },0)
                    /*инициализация временных блоков для записи. сначала не доступны все*/
                    self.entryTimeTable=angular.copy(Booking.timeParts);
                    self.entryTimeTable.forEach(function (b,i) {
                        /*время работы магазина*/
                        if(storeSchedule.is){
                            if(i>=storeSchedule.start && i<storeSchedule.end){
                                /* проверяем мастера*/
                                if(!masterSchedule || (masterSchedule.is && i>=masterSchedule.s && i<masterSchedule.e)){
                                    // если мастер любой (any) то показывается время работы магазина
                                    b.show=true
                                }else{
                                   b.show= false
                                }
                            }else{
                                b.show=false
                            }
                        }else{
                            b.show=false
                        }
                        if(self.entryTimeTable[i-1] && self.entryTimeTable[i-1].show && !self.entryTimeTable[i].show){
                            lastBlock=i;
                        }
                        /**************************/
                        b.busy=true;b.date=query.date
                    })
                    //console.log(lastBlock)
                    self.masters.forEach(function (master) {
                        //console.log(self.timePartsI)
                        if((master.selected && master.show) || (self.selectedMaster && self.selectedMaster._id=='any' && self.selectedStuff[0] && master.stuffs.indexOf(self.selectedStuff[0]._id)>-1)){
                            master.entryTimeTable=angular.copy(Booking.timeParts)
                            entries.forEach(function(e){
                                if(e.master==master._id){
                                    for(var i=e.start;i<e.start+e.qty;i++){
                                        master.entryTimeTable[i].busy=true;
                                    }
                                }
                            })
                            var tempSchedule;
                            if(self.selectedMaster._id==='any'){
                                if(master.timeTable && master.timeTable[currentDayOfYear]){
                                    tempSchedule = angular.copy(master.timeTable[currentDayOfYear])
                                    tempSchedule.s*=4;
                                    tempSchedule.e*=4;
                                }
                            }
                            master.entryTimeTable.forEach(function(block,i){
                                // если запись доступна от текущего времени. если она доступна по времени работы магазина. если она доступна у мастера если она пока недоступна в общем списке записей
                                if(i>self.currentTimeBlock && self.entryTimeTable[i].show && !block.busy && self.entryTimeTable[i].busy){
                                    if(self.selectedMaster._id==='any' && tempSchedule && (!tempSchedule.is || i<tempSchedule.s || i>=tempSchedule.e)){
                                        // запись не обрабатываем так как для этого мастера она не попадает в его расписание
                                        return;
                                    }
                                    // можно проверить теперь показывать ли для мастера
                                    //это сдвижка от текущего блока вперед нет ли занятого блока в течении выполнения услуги
                                    var l = i+stuffsDuration;
                                    for(var j=i;j<l;j++){
                                        if(master.entryTimeTable[j] && master.entryTimeTable[j].busy){
                                            return;
                                        }
                                    }
                                    self.entryTimeTable[i].busy=false;
                                    self.entryTimeTable[i].master=master;
                                }
                            })
                        }else {
                            /*заглушка*/
                            master.entryTimeTable=[];
                        }
                    })
                    // унеможливеть запись на блоки перед окончанием работы магазина которые не дают времени на услугу
                    for(var i = lastBlock-stuffsDuration+1;i<=lastBlock;i++){
                        self.entryTimeTable[i].busy=true;
                    }
                });
        }
        function setTimePart(part,master) {
            //console.log(part)
            try{
                var month = Number(part.date.substring(8,10))
                var day = Number(part.date.substring(10));

                var monthD = self.td.getMonth()
                var dayD = self.td.getDate();

                if(month!=monthD || day !=dayD){
                    self.td.setMonth(month,day)
                }

                /*console.log(month,day,monthD,dayD)
                console.log(self.td.toString())*/
            }catch(err){console.log(err)}

            self.timePart=part;
            if(master){
                self.selectedMaster=master;
                master.selected=true;
                master.show=true;
                self.timePart.master=master
                //console.log(master)
                Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            }
            forward()
        }
        /*todo перенести в фильтр в getBookingData*/
        function filterTimePart(item){
            return item.show && !item.busy &&self.timePartsI.indexOf(item.i)>-1
        }
        function filterNearesBlock(item){
            return self.timePartsI.indexOf(item.i)>-1
        }
        function filterTimePartForAll() {
            // для показа сообщения что нет доступного времени
            //console.log(self.entryTimeTable)
            if(!self.entryTimeTable){return}
            //console.log(typeof self.entryTimeTable)
            var result = !self.entryTimeTable.some(function(item,i){
                //console.log(item)
                /*if(item.i==40){
                    console.log(item)
                    console.log(item.show && !item.buzy)
                }*/
                return item.show && !item.busy
            })
            //console.log(result)
            return result
        }

        function orderService(form){
            //console.log(form)
            if(!form.name.$valid){
                var err = global.get('langError').val.entername;
                exception.catcher(global.get('lang').val.error)(err);
                return;
            }else if(!form.phoneForm.$valid){
                var err = global.get('langError').val.phonenotformat;
                exception.catcher(global.get('lang').val.error)(err);
                return;
            }

            if(!form.$valid){return}
            //console.log(self.selectedMaster,self.selectedStuff,self.timePart)
            if(!self.selectedMaster){
                var err = global.get('langError').val['notMaster']
                exception.catcher(global.get('lang').val.error)(err)
                return;
            }else if(!self.selectedStuff || !self.selectedStuff.length){
                var err = global.get('langError').val['notService']
                exception.catcher(global.get('lang').val.error)(err)
                return;
            }else if(!self.timePart){
                var err = global.get('langError').val['notTime']
                exception.catcher(global.get('lang').val.error)(err)
                return;
            }
            var user = global.get('user').val;
            var store = global.get('store').val
            var phone=self.phone
            var name = self.name;
            if(!phone){
                console.log('нет телефона')
                return
            }
            if(self.date && self.date.getTimezoneOffset()){
                var tz =  self.date.getTimezoneOffset()/60
            }else{
                var dTemp = new Date()
                var tz =  dTemp.getTimezoneOffset()/60
            }

            function checkOut(userEntry) {
                //console.log(self.selectedStuff)
                /*console.log(userEntry);
                return;*/
                /*console.log(self.remind,self.timeRemind)
                return;*/
                prepareMessage(self.selectedStuff,userEntry,self.timePart.date,self.timePart.i)
                //return;
                var entry={
                    services:self.selectedStuff,
                    user:userEntry,
                    remind:self.remind,
                    timeRemind:self.timeRemind
                };
                //console.log(self.timePart);
                var entries=[],val=self.timePart.i;
                $q.when()
                    .then(function(){
                        entry.services.forEach(function(s,i){
                            var o = {start:val,qty:s.timePart,
                                stuffName:s.name,
                                stuffNameL:s.nameL,
                                stuffLink:s.link,
                                backgroundcolor:s.backgroundcolor,
                                masterName:self.timePart.master.name,
                                masterNameL:self.timePart.master.nameL,
                                masterUrl:self.timePart.master.url,
                                service:{_id:s._id,name:s.name},user:entry.user};
                            if(i==0&& entry.remind && entry.timeRemind){
                                o.remind=entry.remind;
                                o.timeRemind=entry.timeRemind;
                            }
                            o.master=self.timePart.master._id
                            o.date=self.timePart.date;
                            o.tz=tz;
                            if(s.price){
                                o.paySum=s.price;
                            }
                            if(s.priceSale){
                                o.paySum=s.priceSale;
                            }
                            if(s.currency){
                                o.currency=s.currency;
                            }
                            entries.push(o)
                            val+=s.timePart;
                        })
                        //console.log(entries)

                        //var actions=[];
                        entries.forEach(function (e) {
                            return $q.when().then(function () {
                                return Booking.save(e).$promise
                            })
                        })
                        //return $q.all(actions);
                    })
                    .then(function(res){
                        socket.emit('newRecordOnSite',{store:global.get('store').val._id,seller:global.get('store').val.seller._id})
                        console.log("global.get('store').val.submitDateTime",global.get('store').val.submitDateTime)
                        // клиент
                        if(!global.get('store').val.submitDateTime){
                            console.log('client')
                            return sendMessage();

                        }
                    })
                    .then(function () {
                        if(self.selectedMaster && self.selectedMaster.notification){
                            if(self.selectedMaster.notification==1){
                                console.log('admin notification==1')
                                if(self.selectedMaster.phone){
                                    return sendMessage(self.selectedMaster.phone);
                                }
                            }else if(self.selectedMaster.notification==2){
                                console.log('admin notification==2')
                                return $q.when()
                                    .then(function () {
                                        if(self.selectedMaster.phone){
                                            return sendMessage(self.selectedMaster.phone);
                                        }
                                    })
                                    .then(function () {
                                        if(global.get('store').val.seller.phone){
                                            return sendMessage(global.get('store').val.seller.phone);
                                        }
                                    })


                            }else if(self.selectedMaster.notification==0){
                                console.log('admin notification==0')
                                if(global.get('store').val.seller.phone){
                                    return  sendMessage(global.get('store').val.seller.phone);
                                }
                            }
                        }else{
                            // admin
                            console.log('admin default')
                            if(global.get('store').val.seller.phone){
                                return  sendMessage(global.get('store').val.seller.phone);
                            }
                        }
                    })
                    .then(function(res){
                        clearStuff()
                        clearMaster();
                        self.td= new Date();
                        self.timePart=null
                        $rootScope.checkedMenuChange('entryTime',false);
                        //notification
                        try{
                            // отправка уведомления
                            var entry = angular.copy(entries[0]);
                            var mm = self.masters.getOFA('_id',entry.master);
                            entry.masterName=(mm)?mm.name:'?????'
                            entry.dateForNote = self.dataForSend.date;
                            var content=CreateContent.dateTimeNote(entry)
                            //console.log(content)
                            var o={addressee:'seller',
                                type:'dateTime',
                                content:content,
                                seller:global.get('store').val.seller._id};
                        }catch(err){
                            console.log(err)
                        }

                        //console.log(o)
                        //return;
                        return $q(function(resolve,reject){
                            $notification.save(o,function(res){
                                exception.showToaster('note', global.get('langNote').val.sent,'');
                                resolve()
                            },function(err){
                                exception.catcher('error')(err);
                                resolve()
                            } )
                        })
                    })
                    .then(function(res){
                        var pap = global.get('paps').val.getOFA('action','booking');
                        if(pap && pap.url){
                            $state.go('thanksPage',{id:pap.url})
                        }
                    })
                    .catch(function(err){
                        if(err){
                            exception.catcher('запись на время')(err)
                        }
                    })

            }
            function checkUserEntry(phone) {
                var query = {phone:phone};
                return $q.when()
                    .then(function () {
                        //return $user.checkPhoneForExist(phone)
                        return $user.getItem(phone,'profile.phone')
                    })
                    .then(function(res){
                        //console.log(res)
                        if(res){return res}else{return null}
                    })
            }
            function createUserEntry(name,phone) {
                var email= phone+'@gmall.io'
                var user = {email:email,name:name,profile:{phone:phone,fio:name}};
                return $auth.signup(user)
                    .then(function(response) {
                        console.log(response)
                        if(response && response.data &&  response.data.token){
                            if(response.data.token=='update'){
                                throw null;
                            }else{
                                $auth.setToken(response);
                                return Account.getProfile()
                            }
                        } else{
                            throw response;
                        }

                    })
                    .then(function(response){
                        console.log(response)
                        if(response){
                            global.set('user',response.data);
                            global.get('functions').val.logged();
                        }

                    })
                    .catch(function(err){
                        if(err){
                            exception.catcher('new client')(err)
                        }
                    })

            }

            if(user){
                $q.when()
                    .then(function () {
                        return checkUserEntry(phone)
                    })
                    .then(function (res) {
                        //console.log(res,user)
                        if(res && res._id && res._id!=user._id){
                            throw 'такой телефон уже зарегистрирован. разлогинтесь и при записи на него вы получите sms с кодом авторизации'
                        }

                    })
                    .then(function () {
                        //console.log(global.get('user').val)
                        var userEntry={
                            _id:global.get('user').val._id,
                            name:name,
                            phone:phone,
                            email:global.get('user').val.email,
                        }
                        checkOut(userEntry)
                    })
                    .then(function () {
                        if(name!=user.name|| phone!=user.pfone){
                            global.get('user').val.profile.fio=name;
                            global.get('user').val.profile.phone=phone;
                            var o ={_id:global.get('user').val._id,profile:global.get('user').val.profile}
                            $user.save({update:'profile'},o,function () {
                                //exception.showToaster('succes','статус','обновлено!')
                            })
                        }
                    })
                    .catch(function (err) {
                        exception.catcher(global.get('lang').val.error)(err)
                        //console.log(err)
                    })

            }else{
                $q.when()
                    .then(function(){
                        //return $user.checkPhoneForExist(phone)
                        return checkUserEntry(phone)
                    })
                    .then(function (res) {
                        //console.log(res);
                        if(res && res._id){
                            sendCodeToPhone()
                            dateTimeAuth(res)
                            //self.currentBlock=5;
                            return null
                        }else{
                            return createUserEntry(self.name,phone)
                        }
                    })
                    .then(function () {
                        if(global.get('user').val){
                            var user={
                                _id:global.get('user').val._id,
                                name:global.get('user').val.profile.fio||global.set('user').val.name,
                                phone:global.get('user').val.profile.phone,
                                email:global.get('user').val.email,
                            }
                            checkOut(user)
                        }
                    })
            }
            return;
        }
        function handleTimePart() {
            self.currentBlock=4;
            setDataForDay(self.td)
        }
        function clearTimePart() {
            self.timePart=null
        }
        function dateTimeAuth(user) {
            //console.log(user)
            /*if(user.email!=user.profile.phone+'@gmall.io'){
                self.authWithEmail=true;
            }else{
                self.authWithEmail=false;
            }*/
            self.authWithEmail=false;
            self.currentBlock=5;
        }
        function sendCodeToPhone() {
            var o = {phone:self.phone}
            self.sendCodeDisable=true;
            $q.when()
                .then(function () {
                    return $http.post('/api/users/sendSMS',o)
                })
                .then(function () {
                    exception.showToaster('info','send code','success')
                    $timeout(function () {
                        self.sendCodeDisable=false
                    },10000)
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('send code')(err)
                    }
                    $timeout(function () {
                        self.sendCodeDisable=false
                    },10000)
                })

        }
        function verifyCode(code) {
            var o = {code:code,phone:self.phone}
            self.sendVerifyCodeDisable=true;
            $q.when()
                .then(function () {
                    return $http.post('/api/users/verifySMScode',o)
                })
                .then(function (response) {
                    console.log(response)
                    exception.showToaster('info','verify code','success')
                    $timeout(function () {
                        self.sendVerifyCodeDisable=false
                    },10000);
                    if(response && response.data &&  response.data.token){
                        $auth.setToken(response);
                        return Account.getProfile()
                    }else{throw 'wrong response'}
                })
                .then(function(response){
                    if(response){
                        authComplite();
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                    }

                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('verify code')(err)
                    }
                    $timeout(function () {
                        self.sendVerifyCodeDisable=false
                    },10000)
                })

        }
        function sendMessage(phone) {
            if(phone){
                self.dataForSend.phone=phone;
            }
            if(!self.dataForSend.phone){console.log(self.dataForSend);return}
            return $q.when()
                .then(function () {
                    console.log('self.dataForSend.phone',self.dataForSend.phone)
                    return $http.post('/api/users/sendMessageAboutDeal',self.dataForSend)
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('send message')(err)
                    }
                })
        }
        function sendMessageOld(seller) {
            /*console.log(self.selectedMaster)
             return;
             */
            //console.log(self.dataForSend)
            var secondMessage;
            if(seller){
                if(!global.get('store').val.seller.phone){
                    return
                }else{
                    if(self.selectedMaster && self.selectedMaster.phone && self.selectedMaster.notification){
                        self.dataForSend.phone= self.selectedMaster.phone
                        if(self.selectedMaster.notification==2 && global.get('store').val.seller.phone){
                            secondMessage=global.get('store').val.seller.phone;
                        }
                    }else{
                        self.dataForSend.phone= global.get('store').val.seller.phone
                    }

                }
            }
            if(self.dataForSend && self.dataForSend.phone && self.dataForSend.date){
                $q.when()
                    .then(function () {
                        console.log(self.dataForSend)
                        if(self.dataForSend.phone){
                            return $http.post('/api/users/sendMessageAboutDeal',self.dataForSend)
                        }
                    })
                    .then(function () {
                        if(secondMessage){
                            self.dataForSend.phone= secondMessage;
                            //console.log(self.dataForSend)
                            return $http.post('/api/users/sendMessageAboutDeal',self.dataForSend)
                        }


                    })
                    .catch(function (err) {
                        if(err){
                            exception.catcher('send message')(err)
                        }
                    })
            }
        }
        function prepareMessage(stuffs,user,date,start) {
            self.dataForSend={}
            if(!stuffs || !stuffs.length || !user & user._id || !user.phone){
                return
            }
            var hour = Math.floor(start/4)
            var minutes = (start%4)*15
            var year = date.substring(4,8)
            var month = date.substring(8,10)
            var day = date.substring(10)
            try{
                date = new Date(year,month,day,hour,minutes)
                date= moment(date).format('lll')
                //console.log(date)
                self.dataForSend.name=user.name
                self.dataForSend.userId=user._id
                self.dataForSend.phone=user.phone
                self.dataForSend.text=global.get('langOrder').val.recordedOn+' '+stuffs[0].name.toUpperCase()+' '+global.get('langOrder').val.onn+' '+date;
                self.dataForSend.date=date//.toString()
                //self.dataForSend.date2=date.toISOString()
                //self.dataForSend.date3=date.toUTCString()
                //self.dataForSend.date=date.toTimeString()
            }catch(err){console.log(err)}

        }

    }

})()