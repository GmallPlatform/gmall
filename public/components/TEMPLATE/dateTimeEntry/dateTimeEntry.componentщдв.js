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
    itemCtrl.$inject=['$scope','Booking','UserEntry','$user','$element','$timeout','Stuff','Master','$stateParams','$state','$q','$uibModal','exception','global','$rootScope'];
    function itemCtrl($scope,Booking,UserEntry,$user,$element,$timeout,Stuff,Master,$stateParams,$state,$q,$uibModal,exception,global,$rootScope){
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
        


        self.selectedStuff=[];
        self.startTimeParts=Booking.startTimeParts;36;
        self.endTimeParts=Booking.endTimeParts;72;
        self.timeTable15min=Booking.timeTable15min;
        self.timeParts=Booking.timeParts;
        self.timeRemindArr=Booking.timeRemindArr;
        var month, day, year;
        self.moment=moment;
        self.global=global;
        self.mobile=global.get('mobile' ).val;
        self.today=moment(Date.now())
        self.dateEnd=moment(self.today + (30 * 24 * 60 * 60 * 1000))





        //****************** set data for date
        self.td= new Date();
        self.altInputFormats = ['M!/d!/yyyy'];
        var today = new Date()
        self.dateOptions={
            minDate: new Date()
            //dateDisabled: disabled,
            //formatYear: 'yy',
            //maxDate: new Date().setDate(today.getDate()+30),
           // minDate: new Date(),
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


        //stuff
        self.addStuff=addStuff;
        self.deleteStuff=deleteStuff;
        self.clearStuff=clearStuff;
        self.getStuffDuration=getStuffDuration;

        self.selectMaster=selectMaster;
        self.clearMaster=clearMaster;

        self.setDay=setDay;
        self.handleTimePart=handleTimePart;
        self.setTimePart=setTimePart;
        self.clearTimePart=clearTimePart;
        self.filterTimePart=filterTimePart;
        self.filterTimePartForAll=filterTimePartForAll;// фильтр для отображения текста о том что нет свободного времени для записи

        self.orderService=orderService;



        //self.getTagName=getTagName;
        /*self.getFilterName=getFilterName;
        var stuffs;*/

        //********************activate***************************
        activate();
        //*******************************************************
        function activate() {
            self.dateTimeImg=(global.get('store').val.dateTimeImg)?global.get('store').val.dateTimeImg:null;
            $timeout(function(){
               // console.log($($element).parent().height())
                $($element).height($($element).parent().height())
                $($element).find('#wrapper-for-entry1').height('100%')
                /*w2=$($element).find('#wrapper-for-entry2');
                blocks=$($element).find('#wrapper-for-entry2').children()
                widthBlock=$(blocks[0]).width()*/
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
                widthBlock=$(blocks[0]).width()
            });
            $scope.$on('dateTime',function(e,argsObj){
                self.currentBlock=0;
                //console.log(argsObj)
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
                //console.log(stuff)
                if(!opened){
                    opened=true;
                    self.name=(global.get('user').val && global.get('user').val.profile && global.get('user').val.profile.fio)?global.get('user').val.profile.fio:'';
                    self.phone=(global.get('user').val && global.get('user').val.profile && global.get('user').val.profile.phone)?global.get('user').val.profile.phone:'';
                    $q.when()
                        .then(function () {
                            return getMasters()
                        })
                        .then(function () {
                            return getItems();
                        })
                        .then(function () {
                            if(master){
                                setMaster(master)
                                return Booking.filterListServices(self.masters,self.items,self.selectedStuff);
                            }
                            //self.currentBlock=0;

                        })
                        .then(function () {
                            if(!stuff){return}
                            //console.log(stuff)
                            //self.currentBlock=0;
                            self.selectedStuff.push(stuff.getDataForBooking());
                            //console.log(self.items)
                            //console.log(self.selectedStuff)
                            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
                            /*$timeout(function(){
                                forward()
                            },200)*/
                        })

                }else{
                    //console.log(stuff)
                    /*while(self.currentBlock){
                        back()
                    }*/
                    if(master){
                        setMaster(master)
                        //self.currentBlock=0;
                        self.selectedStuff.length=0;
                        Booking.filterListServices(self.masters,self.items,self.selectedStuff);
                    }else if(stuff){
                        //self.currentBlock=0;
                        self.selectedStuff.length=0;
                        self.selectedStuff.push(stuff.getDataForBooking());
                        clearMaster()
                        //Booking.filterListServices(self.masters,self.items,self.selectedStuff);
                        /*$timeout(function(){
                            forward()
                        },200)*/
                    }

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

            if(self.currentBlock==2){
                clearMaster()
            }
            widthBlock=$(blocks[0]).width()
            if(self.currentBlock){self.currentBlock--}
            var magrin_left=widthBlock*self.currentBlock;

            //$(w2).css('margin-left',-magrin_left)
        }
        function forward(){
            self.currentBlock=0;
            return;
            widthBlock=$(blocks[0]).width()
            self.currentBlock++
            var magrin_left=widthBlock*self.currentBlock;
            //console.log(magrin_left)
            //$(w2).css('margin-left',-magrin_left)
        }


        //***********************stuff
        function addStuff(stuff) {
            if(self.selectedStuff.map(function(s){return s.name}).indexOf(stuff.name)>-1){
                console.log('already is in list')
                return;
            }
            if(!self.selectedMaster){
                self.selectedStuff.length=0;
                back()
            }
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            self.selectedStuff.push(stuff);

            self.timePart=null
            //console.log(self.masters)
        }
        function deleteStuff(i,event) {
            //console.log(event)
            event.stopPropagation();
            self.selectedStuff.splice(i,1);
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            self.timePart=null
        }
        function clearStuff(){
            self.selectedStuff.length=0
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
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
                            //console.log(self.selectedMaster)
                        }else{
                            m.selected=null;
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
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            self.timePart=null
        }
        //********************* date
        //************** day
        function setDay(td){
            //forward();
            self.td=td;
            setDataForDay(td);
            back();
            self.timePart=null
        }
        function setDataForDay(td) {
            var date = new Date(td);
            var currentdate = new Date()
            self.currentDay=currentdate.getDate()
            self.hours=currentdate.getHours();
            self.minutes=Math.ceil(currentdate.getMinutes()/15)-1;
            month = date.getMonth() + 1; //months from 1-12
            day = date.getDate();
            year = date.getFullYear();
            self.currentTimeBlock=(self.currentDay==day)?self.hours*4+self.minutes:0;
            //console.log('self.currentTimeBlock - ',self.currentTimeBlock)
            if(month<10){month='0'+month}
            var query={date:'date'+year+month+day};

            getBookingData(query)
        }
        //********************* timepart
        function getBookingData(query){
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
                    self.entryTimeTable.forEach(function (b) {b.busy=true;b.date=query.date})
                    /**/
                    self.masters.forEach(function (master) {
                        //console.log(master)
                        if(master.selected && master.show){
                            master.entryTimeTable=angular.copy(Booking.timeParts)
                            entries.forEach(function(e){
                                if(e.master==master._id){
                                    for(var i=e.start;i<e.start+e.qty;i++){
                                        master.entryTimeTable[i].busy=true;
                                    }
                                }
                            })
                        }else {
                            master.entryTimeTable=[];
                        }
                        master.entryTimeTable.forEach(function(block,i){


                            if(!block.busy && self.entryTimeTable[i].busy){
                                if(master.name=='Пелихова Анна Борисовна'){
                                    /*console.log(i,block.busy,self.entryTimeTable[i].busy)
                                    console.log(i>=self.startTimeParts && i<=Booking.endTimeParts && i>self.currentTimeBlock)
                                    console.log(self.startTimeParts,Booking.endTimeParts,self.currentTimeBlock)*/
                                }
                                if(i>=self.startTimeParts && i<=Booking.endTimeParts && i>self.currentTimeBlock){
                                    // можно проверить теперь показывать ли для мастера
                                    for(var j=i;j<i+stuffsDuration;j++){
                                        if(master.entryTimeTable[j] && master.entryTimeTable[j].busy){
                                            return;
                                        }
                                        self.entryTimeTable[i].busy=false;
                                        self.entryTimeTable[i].master=master;
                                    }
                                }

                            }
                        })
                        //console.log(master.entryTimeTable)
                    })
                    /**/
                    for(var i = self.endTimeParts-stuffsDuration+1;i<=self.endTimeParts;i++){
                        self.entryTimeTable[i].busy=true;
                    }
                });
        }
        function setTimePart(part) {
            self.timePart=part;
            forward()
        }
        /*todo перенести в фильтр в getBookingData*/
        function filterTimePart(item){
            return !item.busy
            console.log(i,self.startTimeParts,Booking.endTimeParts,self.currentTimeBlock)
            if(item.i>=self.startTimeParts && item.i<=Booking.endTimeParts && !item.busy && item.i>self.currentTimeBlock){
                return true;
            }

        }
        function filterTimePartForAll() {
            //console.log(self.entryTimeTable)
            if(!self.entryTimeTable){return}
            //console.log(typeof self.entryTimeTable)
            var result = self.entryTimeTable.every(function(item){
                return item.busy
            })
            //console.log(result)
            return result
        }

        function orderService(){
            var user = global.get('user').val;
            //console.log('user-',user)
            //if(!user){user={profile:{}}}

            var store = global.get('store').val
            //var phone = self.phoneCode.substring(1)+self.phone.substring(0,10);
            var phone=self.phone
            self.email = (user)?user.email:null;
            if(!phone){
                console.log('нет телефона')
                return
            }
            function checkOut(userEntry) {
                /*console.log(userEntry);
                return;*/
                var entry={
                    services:self.selectedStuff,
                    user:{
                        _id:userEntry._id,
                        name:userEntry.name,
                        phone:userEntry.phone,
                        email:userEntry.email
                    },
                    remind:self.remind,
                    timeRemind:self.timeRemind
                };
                //console.log(self.timePart);
                var entries=[],val=self.timePart.i;
                $q.when()
                    .then(function(){
                        entry.services.forEach(function(s,i){
                            var o = {start:val,qty:s.timePart,
                                service:{_id:s._id,name:s.name},user:entry.user};
                            if(i==0&& entry.remind && entry.timeRemind){
                                o.remind=entry.remind;
                                o.timeRemind=entry.timeRemind;
                            }
                            o.master=self.timePart.master._id
                            o.date=self.timePart.date;
                            entries.push(o)
                            val+=s.timePart;
                        })
                        //console.log(entries)

                        var actions=[];
                        entries.forEach(function (e) {
                            return $q.when().then(function () {
                                Booking.save(e).$promise
                            })
                        })
                        return $q.all(actions);
                    })
                    .then(function(res){
                        //return;
                        clearStuff()
                        clearMaster();
                        self.dt= new Date();
                        //console.log(self.td)
                        self.timePart=null
                        $rootScope.checkedMenuChange('entryTime',false)
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
                        return UserEntry.getList(null,query)
                    })
                    .then(function(res){
                        if(res && res[0]){return res[0]}else{return null}
                    })
            }
            function createUserEntry(name,phone,email) {
                console.log('add user')
                var userLocal={name:name,phone:phone};
                    if(email){userLocal.email=email}
                return $q.when()
                    .then(function(){
                        return UserEntry.save(userLocal).$promise
                    })
                    .then(function(res){
                        userLocal._id=(res._id)?res._id:res.id;
                        return userLocal;
                    })
                    .catch(function(err){
                        if(err){
                            exception.catcher('новый клиент')(err)
                        }
                    })
            }


            //console.log(user.data[store._id].userEntry);

            if(user && user.userEntry){
                $q.when()
                    .then(function(){
                        user.profile.fio=self.name;
                        user.profile.phone=phone;
                        var o={_id:user._id,profile:user.profile}
                        return $user.save({update:'profile'},o).$promise
                    })
                    .then(function(){
                        var o={_id:user.userEntry,name:self.name,phone:phone}
                        if(self.email){o.email=self.email;}
                        return $q.when()
                            .then(function () {
                                return UserEntry.save({update:'name phone email'},o).$promise
                            })
                            .then(function () {
                                return o
                            })

                    })
                    .then(function (userEntry) {
                        checkOut(userEntry)
                    })
                    .catch(function (err) {
                        console.log(err)
                    })

            }else{
                $q.when()
                    .then(function(){
                        return checkUserEntry(phone)
                    })
                    .then(function (userEntry) {
                        //console.log(userEntry);
                        if(!userEntry){
                            return createUserEntry(self.name,phone,self.email)
                        }else{
                            return userEntry;
                        }
                    })
                    .then(function (userEntry) {
                        //console.log('478 user ',user)
                        if(user){
                            return $q.when()
                                .then(function () {
                                    user.profile.fio=self.name;
                                    user.profile.phone=phone;
                                    var o={_id:user._id,profile:user.profile}
                                    o.userEntry=userEntry._id;
                                    console.log(o)
                                    return $user.save({update:'profile userEntry'},o).$promise
                                })
                                .then(function (res) {
                                    return userEntry;
                                })
                        }else{
                            return userEntry;
                        }
                    })
                    .then(function (userEntry) {
                        checkOut(userEntry)
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

    }

})()