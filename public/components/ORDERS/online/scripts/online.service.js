'use strict';
(function(){
    
    angular.module('gmall.services')
        .service('Online', serviceFoo)
        .service('Booking', serviceBooking)
        .directive('reminderOnline',function () {
            return {
                templateUrl: 'components/ORDERS/online/reminderOnline.html',
            }
        })


    serviceBooking.$inject=['$resource','$uibModal','$q','global','$http','exception'];
    function serviceBooking($resource,$uibModal,$q,global,$http,exception){
        var Items= $resource('/api/collections/Booking/:_id',{_id:'@_id'});
        var timeRemindArr=timeRemindArrLang.map(function (el) {
            return {time:el[global.get('store').val.lang],part:el.part}
        })

        var timeDurationdArr=timeDurationArrLang.map(function (el) {
            return {time:el[global.get('store').val.lang],part:el.part}
        })
        //console.log(timeDurationdArr)

            /*[{time:'полчаса',part:2},
            {time:'час',part:4},
            {time:'два часа',part:8},
            {time:'три часа',part:12}]*/
        var startTimeParts=36;
        var endTimeParts=72;
        var timeParts=[];
        for(var i=0;i<96;i++){timeParts.push({busy:false,i:i})};
        var timeTable=['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
        var timeTable15min=[
            '00:00','00:15','00:30','00:45',
            '01:00','01:15','01:30','01:45',
            '02:00','02:15','02:30','02:45',
            '03:00','03:15','03:30','03:45',
            '04:00','04:15','04:30','04:45',
            '05:00','05:15','05:30','05:45',
            '06:00','06:15','06:30','06:45',
            '07:00','07:15','07:30','07:45',
            '08:00','08:15','08:30','08:45',
            '09:00','09:15','09:30','09:45',
            '10:00','10:15','10:30','10:45',
            '11:00','11:15','11:30','11:45',
            '12:00','12:15','12:30','12:45',
            '13:00','13:15','13:30','13:45',
            '14:00','14:15','14:30','14:45',
            '15:00','15:15','15:30','15:45',
            '16:00','16:15','16:30','16:45',
            '17:00','17:15','17:30','17:45',
            '18:00','18:15','18:30','18:45',
            '19:00','19:15','19:30','19:45',
            '20:00','20:15','20:30','20:45',
            '21:00','21:15','21:30','21:45',
            '22:00','22:15','22:30','22:45',
            '23:00','23:15','23:30','23:45',
        ]
        var paginate={page:0,rows:500,totalItems:0};

        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            timeTable:timeTable,
            timeTable15min:timeTable15min,
            timeParts:timeParts,
            startTimeParts:startTimeParts,
            endTimeParts:endTimeParts,
            newBooking:newBooking,
            editBooking:editBooking,
            filterListServices:filterListServices,
            timeRemindArr:timeRemindArr,
            getDayOfYear:getDayOfYear,// порядковый номер дня в году
            getDaysOfMonth:getDaysOfMonth,// количество дней в месяце\
            sendMessage:sendMessage,// отправка данных о записи клиенту
            getDateStringFromEntry:getDateStringFromEntry,//
            getDateFromEntry:getDateFromEntry,//
            getDateFromStrDateEntry:getDateFromStrDateEntry,
            getDatesForWeek:getDatesForWeek,//
            selectService:selectService,
            getCheckOutLiqpayHtml:getCheckOutLiqpayHtml,
            getUsedTime:getUsedTime,
            getBookingWeek:getBookingWeek,
            getBookingWeekScheldule:getBookingWeekScheldule,
            getWeeksRange:getWeeksRange,
            scheduleTransfer:scheduleTransfer

        }
        function getCheckOutLiqpayHtml(entry,user) {
            //console.log(order)
            entry=angular.copy(entry);
            if(user){entry.user=user}
            return $q.when()
                .then(function () {
                    return $http.post('/api/orders/checkoutLiqpayEntry',entry)
                })
                .then(function (res) {
                    //console.log(res)
                    if(!res || !res.data.html){
                        return;
                    }
                    entry.checkOutLiqpayHtml=res.data.html
                    entry.checkOutLiqpayHtmlIs=true;
                })
                .then(function(res){
                })
                .catch(function(err){
                    exception.catcher('error')(err);
                })
        }
        function getDatesForWeek(date,num) {
            if(!num){num=7}
            var ds=[];
            var d= new Date(date)
            var dw = date.getDay()
            if(dw==0){dw=7}
            for(var i=1;i<=num;i++){
                d= new Date(date)
                d.setTime(d.getTime() + (i-dw)*86400000);
                d.setHours(0)
                var month = d.getMonth()// + 1; //months from 1-12
                var day = d.getDate();
                var year = d.getFullYear();
                var dayOfYear=getDayOfYear(month,day-1)
                if(month<10){month='0'+month}
                if(day<10){day='0'+day}
                var o={
                    date:'date'+year+month+day,
                    d:d,
                    dayOfYear:dayOfYear,
                    month:moment(d).format('MMMM')
                }
                ds.push(o)
            }
            return ds;
        }
        function getDateFromEntry(entry) {
            var hour = Math.floor(entry.start/4)
            var minutes = (entry.start%4)*15
            var year = entry.date.substring(4,8)
            var month = entry.date.substring(8,10)
            var day = entry.date.substring(10)
            //console.log(entry.date,year,month,day,hour,minutes)
            try{
                var date = new Date(year,month,day,hour,minutes)
                return date;
            }catch(err){console.log(err);return 'error handle date'}
        }

        function getDateFromStrDateEntry(str) {
            var year =str.substring(4,8)
            var month = str.substring(8,10)
            var day = str.substring(10)
            //console.log(entry.date,year,month,day,hour,minutes)
            try{
                var date = new Date(year,month,day)
                return date;
            }catch(err){console.log(err);return 'error handle date'}
        }
        function getDateStringFromEntry(entry,format) {
            var hour = Math.floor(entry.start/4)
            var minutes = (entry.start%4)*15
            var year = entry.date.substring(4,8)
            var month = entry.date.substring(8,10)
            var day = entry.date.substring(10)
            //console.log(entry.date,year,month,day,hour,minutes)
            try{
                if(format){
                    var date = new Date(year,month,day)
                }else{
                    var date = new Date(year,month,day,hour,minutes)
                    date= moment(date).format('LLL')
                }
                return date;
            }catch(err){console.log(err);return 'error handle date'}
        }
        function sendMessage(entry,user) {
            entry=JSON.parse(JSON.stringify(entry))
            if(user){entry.user=user;}
            var dataForSend={}

            var hour = Math.floor(entry.start/4)
            var minutes = (entry.start%4)*15
            var year = entry.date.substring(4,8)
            var month = entry.date.substring(8,10)
            var day = entry.date.substring(10)
            try{
                var date = new Date(year,month,day,hour,minutes)
                date= moment(date).format('lll')
                dataForSend.name=entry.user.name
                dataForSend.userId=entry.user._id
                dataForSend.phone=entry.user.phone
                dataForSend.text=global.get('langOrder').val.recordedOn+' '+entry.service.name.toUpperCase()+' '+global.get('langOrder').val.onn+' '+date;
                dataForSend.date=date;
            }catch(err){console.log(err)}
            console.log(dataForSend)
            if(dataForSend && dataForSend.date){
                $q.when()
                    .then(function () {
                        return $http.post('/api/users/sendMessageAboutDeal',dataForSend)
                    })
                    .catch(function (err) {
                        if(err){
                            exception.catcher('send message')(err)
                        }
                    })
            }

        }
        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return Items.query(data).$promise
                .then(getListComplete)
            //.catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
            //.catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function newBooking(master,timePart,services,date,entryDate,start){

            //console.log(services)
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size:'lg',
                    templateUrl: 'components/ORDERS/online/newBooking.html',
                    controller: function ($uibModalInstance,global,$timeout,$user,exception,master,timePart,services,Booking,entryDate,start){
                        //console.log(services)
                        var self=this;
                        self.global=global;
                        //console.log(global.get('store').val.nameLists)
                        self.date=moment(date).format('L');
                        self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
                        self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';

                        self.hour=parseInt(timePart/4);
                        self.minutes=((timePart-self.hour*4)*15)?(timePart-self.hour*4)*15:'00';
                        self.timeRemindArr=timeRemindArr;
                        self.schedule=true;
                        self.mastersInEntry=[];
                        //console.log(timePart,self.hour,self.minutes)
                        master.services.forEach(function(s){
                            s.used=false;
                            s.duration = s.timePart*15
                            //console.log(s)
                        })
                        //console.log(master.services)
                        self.userName='';
                        self.master=master;
                        self.oldPhone='';
                        self.services=(services.length)?services:[];
                        //console.log(self.services);
                        self.entriesToMove=null;
                        self.entryToMove=null;

                        var pattern = /[^0-9]*/g;


                        if(global.get('store').val.seller && global.get('store').val.seller.minDurationForService && Number(global.get('store').val.seller.minDurationForService/15)){
                            var delta = Number(global.get('store').val.seller.minDurationForService/15);
                            if(delta==1){
                                delta=0;
                                console.log(delta)
                            }
                            self.timeDurationdArr=timeDurationdArr.filter(function (p) {
                                return !(p.part%delta)
                            })

                        }else{
                            self.timeDurationdArr=timeDurationdArr;
                        }

                        //self.selectUser=selectUser;
                        self.searchUser = searchUser;
                        self.clearUser=clearUser;
                        self.allFieldCheck=allFieldCheck;
                        self.addUser=addUser;
                        self.checkNameNewUser=checkNameNewUser;
                        self.refreshUsers=refreshUsers;
                        self.moveEtry=moveEtry;
                        self.addingNewUser=addingNewUser;

                        function addingNewUser() {
                            self.addingUser=!self.addingUser;
                            if(self.addingUser){
                                if(self.cachePhone){
                                    var newVal = self.cachePhone.replace(pattern, '')
                                    console.log(newVal)
                                    console.log(newVal.length==self.cachePhone.length)
                                    if(newVal.length==self.cachePhone.length){
                                        var tempPhone=self.cachePhone.substring(0,10);
                                        for(var i=tempPhone.length;i<10;i++){
                                            tempPhone+='0'
                                        }
                                        self.oldPhone=tempPhone;
                                    }else{
                                        self.userName=self.cachePhone;
                                    }
                                }
                            }
                        }

                        function refreshUsers(phone){
                            if (phone.length<3){return}
                            //var newVal = phone.replace(pattern, '').substring(0,10);
                            self.cachePhone=phone
                            //if(self.oldPhone==phone){return}else{self.oldPhone=phone}
                            searchUser(phone)
                        }
                        function searchUser(phone){
                            var q= {$or:[{'profile.phone':phone},{name:phone},{email:phone}]}
                            $user.getList({page:0,rows:20},q).then(function(res){
                                self.users=res.map(function (user) {
                                    if(user.profile && user.profile.phone && user.profile.phone[0]=="+"){
                                        user.profile.phone=user.profile.phone.substring(1)
                                    }
                                    if(user.profile && user.profile.phone && user.profile.phone.length<10){
                                        while(user.profile.phone.length<10){
                                            user.profile.phone+='0'
                                        }
                                    }
                                    if(user.profile && user.profile.phone && user.profile.phone.length==10){
                                        user.profile.phone='38'+user.profile.phone
                                    }
                                    user.phone=(user.profile)?user.profile.phone:null;
                                    return user
                                });
                            })
                        }

                        function clearUser(){
                            self.user=null;
                        }
                        function addUser(){
                            console.log('add user')
                            var user={
                                name:self.userName,
                                //email:self.userEmail,
                                profile:{
                                    phone:self.phoneCode.substring(1)+self.oldPhone.substring(0,10),
                                    fio:self.userName
                                },
                                store:global.get('store').val._id
                            }
                            return $q.when()
                                .then(function () {
                                    return $user.checkPhoneForExist(user.profile.phone)
                                })
                                .then(function (res) {
                                    if(res && res.exist){
                                        throw 'phone exist in base'
                                    }
                                    if(user.email){
                                        return $user.checkEmailForExist(user.email)
                                    }else{
                                        user.email=user.profile.phone+'@gmall.io'
                                    }
                                })
                                .then(function (res) {
                                    if(res && res.exist){
                                        throw 'email exist in base'
                                    }
                                })
                                .then(function(){
                                    return $user.save(user).$promise
                                })
                                .then(function(res){
                                    user._id=(res._id)?res._id:res.id;
                                    self.addingUser=false;
                                    self.userName='';
                                    self.user=user;
                                    console.log(user)
                                    self.oldPhone=''
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('новый клиент')(err)
                                    }
                                })
                        }
                        function allFieldCheck() {
                            var data =(!self.services.length && !self.reserved)|| (!self.user && !self.schedule && !self.reserved)
                            return data
                        }
                        function checkNameNewUser(){
                            //console.log(!self.userName || self.userName.length<3)
                            return (!self.userName || self.userName.length<3)
                        }
                        function moveEtry() {
                            //console.log(self.entryToMove);
                            // продолжителькость записи проверить qty
                            //console.log(master)
                            //console.log(start)
                            var busy=false;
                            for(var i=start;i<start+self.entryToMove.qty;i++){
                                if(master.entryTimeTable[i].busy || master.entryTimeTable[i].out){
                                    busy=true;
                                    break
                                }
                            }
                            //console.log(busy)
                            if(busy){
                                $uibModalInstance.dismiss('не достаточно времени');
                                return;
/*

                                exception.catcher('перенос записи')('не достаточно времени')
                                self.entryToMove=null;
                                return;*/
                            }
                            var o ={_id:self.entryToMove._id}
                            o.date=entryDate;
                            o.start=start;
                            o.move=false;
                            var update='start move date'
                            //console.log(o)
                            Booking.save({update:update},o,function(err){
                                global.set('saving',true);
                                $timeout(function(){
                                    global.set('saving',false);
                                },1500)
                            })
                            $uibModalInstance.close();

                        }

                        actived()
                        self.ok=function(){
                            //console.log(self.user)
                            //console.log(self.schedule)
                            var item={
                                remind:self.remind,
                                timeRemind:self.timeRemind,
                                schedule:self.schedule
                            }
                            if(self.services.length){
                                item.services=self.services
                            }else if(self.reserved){
                                item.services=[{
                                    _id:'reserved',
                                    name:'reserved',
                                    timePart:self.reserved
                                }]
                            }else{
                                return;
                            }
                            if(self.user && self.user._id){
                                item.user={
                                    _id:self.user._id,
                                        name:self.user.name,
                                        email:self.user.email
                                }
                                if(self.user.profile && self.user.profile.phone){
                                    item.user.phone=self.user.profile.phone;
                                }
                                /*console.log(item.user)
                                return;*/

                            }else if(self.schedule){
                                item.user={
                                    _id:'schedule',
                                    name:'schedule',
                                }
                            }else if(self.reserved){
                                item.user={
                                    _id:'reserved',
                                    name:'reserved',
                                }
                            }
                            if(self.mastersInEntry.length){
                                item.masters=self.mastersInEntry;
                            }




                            $uibModalInstance.close(item);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                        function actived() {
                            var query={query:{master:master._id,move:true}}
                            Booking.query(query,function (res) {
                                //console.log(res)
                                if(res && res.length){
                                    res.shift();
                                    self.entriesToMove=res.map(function (e) {
                                        e.name=e.service.name+' '+Booking.getDateStringFromEntry(e);
                                        return e;
                                    })
                                }
                            })
                            self.masters=global.get('masters').val.filter(function (m) {
                                return m._id!=master._id
                            })

                            //console.log(self.masters)
                        }
                    },
                    controllerAs:'$ctrl',
                    resolve:{
                        master:function(){return master},
                        timePart:function(){return timePart},
                        services:function(){return services},
                        entryDate:function(){return entryDate},
                        start:function(){return start},

                    }
                });
                modalInstance.result.then(
                    function (item) {resolve(item)},
                    function (err) {reject(err)}
                );
            })

        }
        function editBooking(entry,masters){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size:'lg',
                    templateUrl: 'components/ORDERS/online/editBooking.html',
                    controller: function (global,$uibModalInstance,$user,Booking,$timeout,UserEntry,exception,entry,masters){
                        //console.log(masters,entry)
                        var self=this;
                        self.master=masters[entry.master];
                        self.global=global;
                        self.moment=moment;
                        self.entry=entry;
                        var currentDate=Booking.getDateStringFromEntry(entry,true)
                        self.dateEntry=moment(currentDate).format('LL')+','+moment(currentDate).format('dddd');
                        var oldEntry=angular.copy(entry)
                        self.qty=oldEntry.qty
                        self.remind=entry.remind;
                        self.timeRemind=entry.timeRemind;
                        self.hour=parseInt(entry.start/4);
                        self.minutes=(entry.start-self.hour*4)*15;
                        self.timeRemindArr=timeRemindArr;
                        var delta=0;
                        if(global.get('store').val.seller && global.get('store').val.seller.minDurationForService && Number(global.get('store').val.seller.minDurationForService/15)){
                            var delta = Number(global.get('store').val.seller.minDurationForService/15);
                            if(delta==1){
                                delta=0;
                                console.log(delta)
                            }
                            self.timeDurationdArr=timeDurationdArr.filter(function (p) {
                                return !(p.part%delta)
                            })

                        }else{
                            self.timeDurationdArr=timeDurationdArr;
                        }

                        self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
                        self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';
                        var update='';

                        self.updateUser=updateUser;
                        self.recordAgreed=recordAgreed;
                        self.saveField=saveField;
                        self.changeDuration=changeDuration;
                        self.changeStartPart=changeStartPart;
                        self.moveEntry=moveEntry;
                        self.timeParts=_setTimeParts()
                        self.changeTimeFilter=changeTimeFilter;
                        self.addNewUser=addNewUser;
                        self.refreshUsers=refreshUsers;
                        self.deleteUser=deleteUser;
                        self.addUser=addUser;




                        //console.log(self.timeParts)
                        self.startPart=oldEntry.start;




                        actived()

                        function _setTimeParts(){
                            return timeTable15min.map(function (t,i) {
                                var busy = false;
                                if(self.master.entryTimeTable[i].out){
                                    busy =true;
                                }else if(self.master.entryTimeTable[i].busy && self.master.entryTimeTable[i].entry._id!=self.entry._id){
                                    busy =true;
                                }else{
                                    for(var j=i+1;j<i+self.qty;j++){
                                        if(!self.master.entryTimeTable[j] || self.master.entryTimeTable[j].out || (self.master.entryTimeTable[j].busy && self.master.entryTimeTable[j].entry._id!=self.entry._id)){
                                            busy =true;
                                        }
                                    }

                                }
                                return {part:i,time:t,busy:busy}
                            })
                        }
                        function addNewUser(user) {
                            if(user){
                                self.newUser=user;
                            }
                            //console.log(self.newUser)
                            if(self.entry.users && self.entry.users.length && self.entry.users.some(function (u) {
                                   return u._id==self.newUser._id
                                })){return}
                            var o={_id:self.newUser._id,
                                phone:self.newUser.phone,
                                name:self.newUser.name,
                                email:self.newUser.email
                            }
                            self.entry.users.push(o);
                            saveField('users')
                        }
                        function deleteUser(i) {
                            self.entry.users.splice(i,1);
                            saveField('users')
                        }
                        function refreshUsers(phone){
                            if (phone.length<3){return}
                            //var newVal = phone.replace(pattern, '').substring(0,10);
                            self.cachePhone=phone
                            //if(self.oldPhone==phone){return}else{self.oldPhone=phone}
                            searchUser(phone)
                        }
                        function searchUser(phone){
                            var q= {$or:[{'profile.phone':phone},{name:phone},{email:phone}]}
                            $user.getList({page:0,rows:20},q).then(function(res){
                                self.users=res.map(function (user) {
                                    if(user.profile && user.profile.phone && user.profile.phone[0]=="+"){
                                        user.profile.phone=user.profile.phone.substring(1)
                                    }
                                    if(user.profile && user.profile.phone && user.profile.phone.length<10){
                                        while(user.profile.phone.length<10){
                                            user.profile.phone+='0'
                                        }
                                    }
                                    if(user.profile && user.profile.phone && user.profile.phone.length==10){
                                        user.profile.phone='38'+user.profile.phone
                                    }
                                    user.phone=(user.profile)?user.profile.phone:null;
                                    return user
                                });
                            })
                        }

                        function addUser(){
                            //console.log('add user')
                            var user={
                                name:self.userName,
                                //email:self.userEmail,
                                profile:{
                                    phone:self.phoneCode.substring(1)+self.oldPhone.substring(0,10),
                                    fio:self.userName
                                },
                                store:global.get('store').val._id
                            }
                            return $q.when()
                                .then(function () {
                                    return $user.checkPhoneForExist(user.profile.phone)
                                })
                                .then(function (res) {
                                    if(res && res.exist){
                                        throw 'phone exist in base'
                                    }
                                    if(user.email){
                                        return $user.checkEmailForExist(user.email)
                                    }else{
                                        user.email=user.profile.phone+'@gmall.io'
                                    }
                                })
                                .then(function (res) {
                                    if(res && res.exist){
                                        throw 'email exist in base'
                                    }
                                })
                                .then(function(){
                                    return $user.save(user).$promise
                                })
                                .then(function(res){
                                    user._id=(res._id)?res._id:res.id;
                                    self.user={
                                        _id:user._id,
                                        name: user.name,
                                        email:user.email,
                                        phone:user.profile.phone
                                    }
                                    addNewUser(self.user)
                                    //console.log(user)

                                    self.addingUser=false;
                                    self.userName='';
                                    self.oldPhone=''
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('новый клиент')(err)
                                    }
                                })
                        }

                        function actived(){
                           // console.log(self.entry)
                            self.user=Object.assign({},entry.user);
                            if(self.user.phone){
                                self.splitPoint = self.user.phone.length-10;
                                self.phoneCode='+'+self.user.phone.substring(0,self.splitPoint)
                                self.user.phone=self.user.phone.substring(self.splitPoint)
                            }
                            self.mastersAdditional=global.get('masters').val.filter(function (m) {
                                return m._id!=self.entry.master._id
                            })

                            //console.log(self.mastersAdditional)
                        }
                        function updateUser() {
                            self.editingUser=false;
                            /*var  {phone,name,email}=self.user;
                             console.log(phone,name,email)*/
                            var o={_id:entry.user._id};
                            o['profile.phone']=self.phoneCode.substring(1)+self.user.phone;
                            o['profile.fio']=self.user.name;
                            o.email=self.user.email;
                            update='profile.phone profile.fio email';

                            return $q.when()
                                .then(function () {
                                    if(o['profile.phone']){
                                        return $user.checkPhoneForExist(o['profile.phone'],entry.user._id)
                                    }else{
                                        throw 'phone is empty'
                                    }

                                })
                                .then(function (res) {
                                    if(res && res.exist){
                                        throw 'phone exist in base'
                                    }
                                    if(o.email){
                                        return $user.checkEmailForExist(o.email,entry.user._id)
                                    }else{
                                        o.email=o['profile.phone']+'@gmall.io'
                                    }
                                })
                                .then(function (res) {
                                    if(res && res.exist){
                                        throw 'email exist in base'
                                    }
                                })
                                .then(function(){
                                    return $user.save({update:update},o).$promise
                                })
                                .then(function () {
                                    entry.user=self.user;
                                    entry.user.phone=o['profile.phone'];
                                    saveField('user')
                                    /*console.log(entry.user)
                                    console.log(self.user)
                                    console.log(o)*/
                                    //actived()
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('обновление данных')(err)
                                    }
                                })
                            return;


                            if(!entry.user.phone || '+'+entry.user.phone.substring(0,self.splitPoint)!=self.phoneCode){
                                update='phone';
                            }else if(!entry.user.phone || entry.user.phone.substring(self.splitPoint)!=self.user.phone){
                                update='phone'
                            }
                            if(entry.user.name!=self.user.name){
                                update+=(update)?' name':'name';
                            }
                            if(entry.user.email!=self.user.email){
                                update+=(update)?' email':'email';
                            }
                            UserEntry.save({update:update},o,function(){
                                entry.user=o;
                                actived()
                            })
                            update='user';
                        }
                        var delay;
                        function recordAgreed(user) {
                            if(delay){return}
                            delay=true;
                            $timeout(function () {
                               delay=false
                            },2000)
                            entry.confirm=Date.now()
                            saveField('confirm')
                            Booking.sendMessage(entry,user)
                        }
                        function saveField(field) {
                            var o ={_id:entry._id}
                            o[field]=entry[field]
                            //console.log(o)
                            Booking.save({update:field},o,function(err){
                                global.set('saving',true);
                                $timeout(function(){
                                    global.set('saving',false);
                                },1500)
                            })
                        }
                        function changeDuration() {
                            //console.log(self.entry,self.master)
                            var delta = self.qty-self.entry.qty;
                            if(delta<0){
                                for(var i = self.entry.start+self.qty;i<self.entry.start+self.entry.qty;i++){
                                    self.master.entryTimeTable[i].busy=false
                                    delete self.master.entryTimeTable[i].entry
                                    delete self.master.entryTimeTable[i].noBorder
                                    console.log(i)
                                }
                                self.entry.qty=self.qty
                                oldEntry.qty=self.qty
                                saveField('qty')
                                self.timeParts=_setTimeParts()
                            }else{
                                var start = self.entry.start+self.entry.qty
                                var busy=false;
                                for(var i =start;i<start+delta;i++){
                                    if(!self.master.entryTimeTable[i] || self.master.entryTimeTable[i].busy || self.master.entryTimeTable[i].out){
                                        busy=true;
                                        break;
                                    }
                                }
                                if(!busy){
                                    console.log(start,start+delta)
                                    if(self.master.entryTimeTable[start-1]){
                                        self.master.entryTimeTable[start-1].noBorder=true;
                                    }
                                    for(var i =start;i<start+delta;i++){
                                        console.log(i)
                                        self.master.entryTimeTable[i].busy=true;
                                        self.master.entryTimeTable[i].entry=self.entry
                                        if(i<start+delta-1){
                                            self.master.entryTimeTable[i].noBorder=true;
                                        }else{
                                            self.master.entryTimeTable[i].noBorder=false;
                                        }
                                    }
                                    self.entry.qty=self.qty
                                    oldEntry.qty=self.qty
                                    saveField('qty')
                                    self.timeParts=_setTimeParts()
                                }else{
                                    //console.log(self.qty)
                                    exception.catcher('изменение продолжительности')('недостаточно свободного времени')
                                    self.qty=self.entry.qty
                                }

                            }
                        }
                        function changeStartPart() {
                            var delta=self.entry.start-self.startPart;
                            //console.log(delta)
                            var part={busy:false,i:0,master:self.master._id}
                            if(delta>0){
                                for(var i=0;i<self.entry.qty;i++){
                                    var j = self.startPart+i;
                                    //console.log(j,j+delta)

                                    self.master.entryTimeTable[j]=self.master.entryTimeTable[j+delta]
                                    self.master.entryTimeTable[j].i=j

                                }
                                for(var i=self.startPart+self.entry.qty;i<self.startPart+self.entry.qty+delta;i++){
                                    //console.log(i)
                                    if(self.master.entryTimeTable[i].busy && self.master.entryTimeTable[i].entry && self.master.entryTimeTable[i].entry._id==self.entry._id){
                                        self.master.entryTimeTable[i]=angular.copy(part)
                                        self.master.entryTimeTable[i].i=i;
                                    }

                                }
                            }else{
                                for(var i=self.entry.qty;i>0;i--){
                                    var j = self.startPart+i-1;
                                    //console.log(j,j+delta)

                                    self.master.entryTimeTable[j]=self.master.entryTimeTable[j+delta]
                                    self.master.entryTimeTable[j].i=j

                                }
                                //console.log(self.entry.start,self.entry.start-delta)
                                for(var i=self.entry.start;i<self.entry.start-delta;i++){
                                    //console.log(i)
                                    if(self.master.entryTimeTable[i].busy && self.master.entryTimeTable[i].entry && self.master.entryTimeTable[i].entry._id==self.entry._id){
                                        self.master.entryTimeTable[i]=angular.copy(part)
                                        self.master.entryTimeTable[i].i=i;
                                    }

                                }
                            }
                            self.entry.start=self.startPart;
                            self.hour=parseInt(self.entry.start/4);
                            self.minutes=(self.entry.start-self.hour*4)*15;
                            saveField('start')
                        }
                        function moveEntry() {
                            self.entry.move=!self.entry.move
                            self.saveField('move')
                            if(self.entry.move){
                                $uibModalInstance.close();
                            }
                        }
                        function changeTimeFilter(p) {
                            return !p.busy && !(p.part%delta)
                        }

                        self.ok=function(){
                            update=''
                            /*entry.remind=self.remind;
                            entry.timeRemind=self.timeRemind;

                            if(entry.remind!=oldEntry.remind){
                                if(update){update+=' '}
                                update+='remind';
                            }
                            if(entry.timeRemind!=oldEntry.timeRemind){
                                if(update){update+=' '}
                                update+='timeRemind';
                            }
                            if(entry.used!=oldEntry.used){
                                if(update){update+=' '}
                                update+='used';
                            }
                            if(entry.confirm!=oldEntry.confirm){
                                if(update){update+=' '}
                                update+='confirm';
                            }*/
                            $uibModalInstance.close({action:'save',update:update});
                        }
                        self.delete=function(){
                            $uibModalInstance.close({action:'delete'});
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                        
                    },
                    controllerAs:'$ctrl',
                    resolve:{
                        entry:function(){return entry},
                        masters:function(){return masters}

                    }
                });
                modalInstance.result.then(
                    function (action) {resolve(action)},
                    function () {reject()}
                );
            })

        }
        function filterListServicesOld(masters,items,selectedStuff) {
            var stuffs=null;
            /*console.log(selectedStuff)
            console.log(masters)*/
            // проверяем есть ли выбранный мастер
            var selectedMaster=masters.filter(function (m) {
                return m.selected;
            })
            //console.log("selectedMaster && selectedMaster.length",selectedMaster && selectedMaster.length)
            if(selectedMaster && selectedMaster.length){
                stuffs=selectedMaster[0].stuffs;
            }else{
                stuffs=masters.filter(function(m){
                    if(!selectedStuff.length){
                        m.show=true;
                        return true;
                    }
                    m.show = selectedStuff.every(function(s){
                        // все выбранные услуги оказываются мастером
                        return m.stuffs.indexOf(s._id)>-1
                    })
                    return m.show;
                }).reduce(function(a,item){
                    Array.prototype.push.apply(a,item.stuffs)
                    return a
                },[])
            }


            //console.log(stuffs)
            items.forEach(function(item){
                item.stuffs.forEach(function (s) {
                    if(stuffs && selectedMaster.length){
                        if(stuffs.indexOf(s._id)>-1){s.hide=false}else{s.hide=true}
                        //console.log(stuffs.indexOf(s._id),s._id,s.name)
                    }else{
                        s.hide=false
                    }

                })
                item.hide=item.stuffs.every(function(s){return s.hide})
            })
            if(selectedStuff && selectedStuff.length){
                masters.forEach(function (m) {
                    m.show = selectedStuff.every(function(s){
                        // все выбранные услуги оказываются мастером
                        return m.stuffs.indexOf(s._id)>-1
                    })
                })
            }

        }
        function filterListServices(masters,items,selectedStuff) {
            //console.log(selectedStuff)
            if(!selectedStuff){
                selectedStuff=[];
            }
            selectedStuff=selectedStuff.filter(function (s) {
                return s
            })
            var stuffs=null;
            // проверяем есть ли выбранный мастер
            var selectedMaster=masters.filter(function (m) {
                return m.selected;
            })
            //console.log("selectedMaster && selectedMaster.length",selectedMaster && selectedMaster.length)
            if(selectedMaster && selectedMaster.length){
                stuffs=selectedMaster[0].stuffs;
            }else{
                stuffs=masters.filter(function(m){
                    if(!selectedStuff.length){
                        m.show=true;
                        return true;
                    }
                    m.show = selectedStuff.every(function(s){
                        // все выбранные услуги оказываются мастером
                        return m.stuffs.indexOf(s._id)>-1
                    })
                    return m.show;
                }).reduce(function(a,item){
                    Array.prototype.push.apply(a,item.stuffs)
                    return a
                },[])
            }

            if(selectedStuff && selectedStuff.length){
                masters.forEach(function (m) {
                    m.show = selectedStuff.every(function(s){
                        // все выбранные услуги оказываются мастером
                        return m.stuffs.indexOf(s._id)>-1
                    })
                })
            }
            //console.log(stuffs,selectedMaster.length)
            items.forEach(function (s) {
                if(stuffs && selectedMaster.length){
                    if(stuffs.indexOf(s._id)>-1){s.show=true}else{s.show=false}
                    //console.log(stuffs.indexOf(s._id),s._id,s.name)
                }else{
                    s.show=true
                }

            })
            //console.log(items)

        }
        function getDayOfYear(selectedMonth,day) {
            if(selectedMonth==1){
                return 31+day
            }else if(selectedMonth==2){
                return 31+29+day
            }else if(selectedMonth==3){
                return 31+29+31+day
            }else if(selectedMonth==4){
                return 31+29+31+30+day
            }else if(selectedMonth==5){
                return 31+29+31+30+31+day
            }else if(selectedMonth==6){
                return 31+29+31+30+31+30+day
            }else if(selectedMonth==7){
                return 31+29+31+30+31+30+31+day
            }else if(selectedMonth==8){
                return 31+29+31+30+31+30+31+31+day
            }else if(selectedMonth==9){
                return 31+29+31+30+31+30+31+31+30+day
            }else if(selectedMonth==10){
                return 31+29+31+30+31+30+31+31+30+31+day
            }else if(selectedMonth==11){
                return 31+29+31+30+31+30+31+31+30+31+30+day
            }else{
                return day;
            }
        }
        //https://habrahabr.ru/post/261773/
        function getDaysOfMonth(x, y) {
            return 28 + ((x + Math.floor(x / 8)) % 2) + 2 % x + Math.floor((1 + (1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1))) / x) + Math.floor(1/x) - Math.floor(((1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1)))/x); }
        function selectService(items) {
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                windowClass:'modalProject',
                templateUrl: 'components/ORDERS/online/selectServiceInSite.html',
                controller: function ($uibModalInstance, global, $timeout, items) {
                    var self=this;
                    self.global=global;
                    self.items=items;
                    //console.log(items)

                    self.ok = function (item) {
                        $uibModalInstance.close(item);
                    }

                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    }

                },
                controllerAs:'$ctrl',
                resolve:{
                    items:function () {
                        return items
                    }
                }
            })
            return modalInstance.result;
        }
        function getUsedTime(start,qty) {
            /*start=43
            qty=5*/
            var end = start+qty;
            var h = Math.floor(start/4);
            var m = (start-h*4)*15||'00';
            var h1 = Math.floor(end/4);
            var m1 = (end-h1*4)*15||'00';
            return h+'.'+m+' - '+h1+'.'+m1;
        }
        function getBookingWeek(queryWeek,selectedMaster,datesOfWeeks,ngClickOnEntry,admin) {
            //console.log(selectedMaster)
            var storeScheduleWeek=angular.copy(global.get('store').val.timeTable)
            return getList(paginate,queryWeek)
                .then(function(data) {
                    selectedMaster['week']={}
                    datesOfWeeks.forEach(function (d,dayOfWeek) {
                        //console.log(d.dayOfYear,selectedMaster.timeTable[d.dayOfYear])
                        selectedMaster['week'][d.date]={}
                        selectedMaster['week'][d.date].entryTimeTable=angular.copy(timeParts);
                        selectedMaster['week'][d.date].entryTimeTable.forEach(function (p,i) {
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


                            if(selectedMaster.timeTable && selectedMaster.timeTable[d.dayOfYear]){
                                if(!selectedMaster.timeTable[d.dayOfYear].is ||
                                    p.i<selectedMaster.timeTable[d.dayOfYear].s*4 ||
                                    p.i>=selectedMaster.timeTable[d.dayOfYear].e*4)
                                {
                                    p.out=true;
                                }

                            }


                        })
                    })
                    data.forEach(function(e){
                        //console.log(e)
                        var master= selectedMaster;
                        for(var i=e.start;i<e.start+e.qty;i++){
                            master.week[e.date].entryTimeTable[i].busy=true;
                            if(i==e.start){
                                master.week[e.date].entryTimeTable[i].usedTime=getUsedTime(e.start,e.qty);
                                master.week[e.date].entryTimeTable[i].userId= e.user._id;
                                master.week[e.date].entryTimeTable[i].service= e.service.name;
                                master.week[e.date].entryTimeTable[i].new=true;
                                master.week[e.date].entryTimeTable[i].qty=e.qty;
                                master.week[e.date].entryTimeTable[i].used=e.used;
                                master.week[e.date].entryTimeTable[i].confirm=e.confirm;
                                if(admin){
                                    master.week[e.date].entryTimeTable[i].user=e.user;
                                    //console.log(master.week[e.date].entryTimeTable[i].user)
                                }
                            }
                            if(i!=e.start){
                                master.week[e.date].entryTimeTable[i].noBorder=true
                            }
                            master.week[e.date].entryTimeTable[i].entry=e;
                            if(global.get('store').val.onlineReservation && (!e.status || e.status!=1)){
                                master.week[e.date].entryTimeTable[i].reservation=true;
                            }
                            if(i==e.start){
                                //console.log(master.week[e.date].entryTimeTable[i])
                            }
                        }
                    })
                });
        }
        function getBookingWeekScheldule(queryWeek,selectedWorkplace,datesOfWeeks,services,masters,ngClickOnEntry) {
            var storeScheduleWeek=angular.copy(global.get('store').val.timeTable)
            return getList(paginate,queryWeek)
                .then(function(data) {
                    selectedWorkplace['week']={}
                    datesOfWeeks.forEach(function (d,dayOfWeek) {
                        selectedWorkplace['week'][d.date]={}
                        selectedWorkplace['week'][d.date].entryTimeTable=angular.copy(timeParts);
                        selectedWorkplace['week'][d.date].entryTimeTable.forEach(function (p,i) {
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
                        })
                    })
                    data.forEach(function(e){
                        //e.ngClickOnEntry=ngClickOnEntry;
                        var serviseLink=null;
                        if(e.service && e.service._id && services){
                            var sTemp=services.getOFA('_id',e.service._id)
                            if(sTemp){
                                serviseLink=sTemp.link
                            }
                            //console.log(serviseLink)
                        }
                        var masterLink=null;
                        var masterName='';
                        if(e.master  && masters){
                            var mTemp=masters.getOFA('_id',e.master)
                            if(mTemp){
                                masterLink='/master/'+mTemp.url
                                masterName=mTemp.name;
                            }
                        }
                        var workplace= selectedWorkplace;
                        for(var i=e.start;i<e.start+e.qty;i++){
                            workplace.week[e.date].entryTimeTable[i].busy=true;
                            if(i==e.start){
                                workplace.week[e.date].entryTimeTable[i]._id=e._id;
                                workplace.week[e.date].entryTimeTable[i].usedTime=getUsedTime(e.start,e.qty);
                                workplace.week[e.date].entryTimeTable[i].userId= e.user._id;
                                workplace.week[e.date].entryTimeTable[i].service= e.service.name;
                                workplace.week[e.date].entryTimeTable[i].serviceLink= serviseLink;
                                workplace.week[e.date].entryTimeTable[i].masterLink= masterLink;
                                workplace.week[e.date].entryTimeTable[i].masterName= masterName;
                                if(e.masters && e.masters.length){
                                    workplace.week[e.date].entryTimeTable[i].masters=e.masters.map(function (m) {
                                        var mm = masters.getOFA('_id',m);
                                        return mm
                                    })
                                    //console.log(workplace.week[e.date].entryTimeTable[i].masters);

                                }

                                workplace.week[e.date].entryTimeTable[i].new=true;
                                workplace.week[e.date].entryTimeTable[i].qty=e.qty;
                                workplace.week[e.date].entryTimeTable[i].used=e.used;
                                workplace.week[e.date].entryTimeTable[i].confirm=e.confirm;
                                workplace.week[e.date].entryTimeTable[i].comment=e.comment;
                                workplace.week[e.date].entryTimeTable[i].zIndex=1;

                            }
                            if(e.service.backgroundcolor){
                                workplace.week[e.date].entryTimeTable[i].backgroundcolor=e.service.backgroundcolor;
                            }else{
                                workplace.week[e.date].entryTimeTable[i].backgroundcolor=null;
                            }

                            if(i!=e.start){
                                workplace.week[e.date].entryTimeTable[i].noBorder=true
                            }
                            workplace.week[e.date].entryTimeTable[i].entry=e;
                            if(global.get('store').val.onlineReservation && (!e.status || e.status!=1)){
                                workplace.week[e.date].entryTimeTable[i].reservation=true;
                            }
                            /*if(i==e.start){
                                console.log(master.week[e.date].entryTimeTable[i])
                            }*/
                        }
                    })
                });
        }
        function getWeeksRange(today) {
            var weeksRange= [{},{},{},{},{},{},{}]
            weeksRange.forEach(function (el,i) {
                if(!i){
                    var date = today;

                }else{
                    var date= new Date(today)
                    date.setTime(date.getTime() + (i*7)*86400000);
                    date.setHours(0)
                }
                var datesOfWeeks=getDatesForWeek(date);
                //console.log(datesOfWeeks)
                el.startDate=datesOfWeeks[0].d
                el.startDateString=moment(datesOfWeeks[0].d).format('DD MMM')
                el.endDate=datesOfWeeks[6].d
                el.endDateString=moment(datesOfWeeks[6].d).format('DD MMM')
                //console.log(el.startDateString,'-',el.endDateString)
            })
            return weeksRange
        }
        function scheduleTransfer(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size:'lg',
                    templateUrl: 'components/ORDERS/online/scheduleTransfer.html',
                    controller: function (global,$uibModalInstance,Booking,$timeout,exception){
                        var self=this;
                        self.global=global;
                        self.moment=moment;
                        self.paginate={}
                        var startdate = moment().subtract(42,"days")
                        var td = new Date(startdate)
                        //console.log(startdate,td)

                        self.weeksFrom=getWeeksRange(td)
                        self.weeksFrom.forEach(function (el) {
                            el.date=el.startDateString+'/'+el.endDateString
                        })

                        var addDate = moment().add(7,"days")
                        var addDate = moment().add(0,"days")
                        var tdAdd = new Date(addDate)

                        self.weeksTo=getWeeksRange(tdAdd)
                        self.weeksTo.forEach(function (el) {
                            el.date=el.startDateString+'/'+el.endDateString
                        })

                        //console.log(self.weeksFrom)
                        self.ok=function(){
                            if(!self.weekFrom || !self.weekTo){
                                exception.catcher('ошибка')('не выбрана неделя')
                                return
                            }
                            self.disabled=true;
                            //console.log(self.weekFrom,self.weekTo)
                            var date= new Date(self.weekFrom.startDate)
                            self.datesOfWeeks=Booking.getDatesForWeek(date);
                            //console.log(self.datesOfWeeks)
                            self.queryWeek={date:{$in:self.datesOfWeeks.map(function (item) {
                                return item.date
                            })},'user.name':'schedule'};
                            //console.log(self.queryWeek)
                            var dataFrom,dataTo;
                            return Booking.getList(self.paginate,self.queryWeek)
                                .then(function(data) {

                                    if(data && data.length){
                                        data.shift()
                                    }
                                    //console.log(data)
                                    dataFrom=data;
                                    date= new Date(self.weekTo.startDate)
                                    self.datesOfWeeks=Booking.getDatesForWeek(date);
                                    //console.log(self.datesOfWeeks)
                                    self.queryWeek={date:{$in:self.datesOfWeeks.map(function (item) {
                                        return item.date
                                    })},'user.name':'schedule'};
                                    return Booking.getList(self.paginate,self.queryWeek)
                                })
                                .then(function(data) {
                                    if(data && data.length){
                                        data.shift()
                                    }
                                    //console.log(data)
                                    dataTo=data;
                                    var acts=[];
                                    data.forEach(function (d) {
                                        var delEntryPromise = Booking.delete({_id:d._id});
                                        acts.push(delEntryPromise.$promise)

                                    })
                                    return $q.all(acts)

                                })

                                .then(function () {
                                    var start = moment(self.weekFrom.startDate);
                                    var end = moment(self.weekTo.startDate);
                                    var daysDelta=end.diff(start, "days")
                                    //console.log(daysDelta)

                                    /*var stD=new Date(self.weekFrom.startDate)
                                    var enD=new Date(self.weekTo.startDate)
                                    end.diff(start, "days")*/

                                    var acts=[];
                                    dataFrom.forEach(function (d) {
                                        //console.log(d)
                                        delete d._id
                                        delete d.__v
                                        var newDate = getDateFromEntry(d)
                                        newDate.setDate(newDate.getDate() + daysDelta);
                                        var month = newDate.getMonth() //+ 1; //months from 1-12
                                        var day = newDate.getDate();
                                        var year = newDate.getFullYear();
                                        if(month<10){month='0'+month}
                                        if(day<10){day='0'+day}
                                        d.date='date'+year+month+day;
                                        var newEntryPromise = Booking.save(d);
                                        acts.push(newEntryPromise.$promise)

                                    })
                                    return $q.all(acts)
                                })
                                .then(function (res) {
                                    //console.log(res)
                                    $uibModalInstance.close()
                                })
                                .catch(function (err) {
                                    $uibModalInstance.close(err)
                                    //console.log(err)
                                })


                            return

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
                                //$uibModalInstance.close();
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };

                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(
                    function () {resolve()},
                    function () {reject()}
                );
            })

        }


    }

    serviceFoo.$inject=['$resource','$uibModal','$q','global'];
    function serviceFoo($resource,$uibModal,$q,global){
        var Items= $resource('/api/collections/Online/:_id',{_id:'@_id'});
        var timeRemindArr=[{time:'полчаса',part:2},
            {time:'час',part:4},
        {time:'два часа',part:8},
        {time:'три часа',part:12}]
        var timeDuration=[
            {time:'15 мин',part:1},
            {time:'полчаса',part:2},
            {time:'45 мин',part:3},
            {time:'час',part:4},
            {time:'1 час 30 мин',part:6},
            {time:'два часа',part:8},
            {time:'два часа 30 мин',part:10},
            {time:'три часа',part:12},
            {time:'четыре часа',part:16}
        ]
        var startTimeParts=36;
        var endTimeParts=72;
        var timeParts=[];
        for(var i=0;i<96;i++){timeParts.push({busy:false,i:i})};
        var timeTable=['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
        var timeTable15min=[
            '00:00','00:15','00:30','00:45',
            '01:00','01:15','01:30','01:45',
            '02:00','02:15','02:30','02:45',
            '03:00','03:15','03:30','03:45',
            '04:00','04:15','04:30','04:45',
            '05:00','05:15','05:30','05:45',
            '06:00','06:15','06:30','06:45',
            '07:00','07:15','07:30','07:45',
            '08:00','08:15','08:30','08:45',
            '09:00','09:15','09:30','09:45',
            '10:00','10:15','10:30','10:45',
            '11:00','11:15','11:30','11:45',
            '12:00','12:15','12:30','12:45',
            '13:00','13:15','13:30','13:45',
            '14:00','14:15','14:30','14:45',
            '15:00','15:15','15:30','15:45',
            '16:00','16:15','16:30','16:45',
            '17:00','17:15','17:30','17:45',
            '18:00','18:15','18:30','18:45',
            '19:00','19:15','19:30','19:45',
            '20:00','20:15','20:30','20:45',
            '21:00','21:15','21:30','21:45',
            '22:00','22:15','22:30','22:45',
            '23:00','23:15','23:30','23:45',
        ]
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            create:create,
            editEntry:editEntry,
            selectService:selectService,
            timeTable:timeTable,
            timeTable15min:timeTable15min,
            timeParts:timeParts,
            startTimeParts:startTimeParts,
            endTimeParts:endTimeParts,
            filterListServices:filterListServices
        }

        function getList(paginate,query){
           if(!paginate){
               paginate={page:0}
           }
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return Items.query(data).$promise
                .then(getListComplete)
                //.catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                //.catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/CONTENT/master/createMaster.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.name=''
                        self.ok=function(){
                            $uibModalInstance.close(self.name);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (name) {
                    if(name){
                        resolve(name.substring(0,50))
                    }else{
                        reject()
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
        function selectService(master,timePart){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size:'lg',
                    templateUrl: 'components/ORDERS/online/selectService.html',
                    controller: function ($uibModalInstance,global,$user,UserEntry,exception,master,timePart){
                        var self=this;
                        self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
                        self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';

                        self.hour=parseInt(timePart/4);
                        self.minutes=(timePart-self.hour*4)*15;
                        self.timeRemindArr=timeRemindArr;
                        //console.log(timePart,self.hour,self.minutes)
                        master.services.forEach(function(s){
                            s.used=false
                        })
                        self.userName='';
                        self.master=master;
                        self.oldPhone='';
                        self.services=[];
                        var pattern = /[^0-9]*/g;

                        self.selectUser=selectUser;
                        self.searchUser = searchUser;
                        self.clearUser=clearUser;
                        self.allFieldCheck=allFieldCheck;
                        self.addUser=addUser;
                        self.checkNameNewUser=checkNameNewUser;
                        self.refreshUsers=refreshUsers;


                        function selectUser(user){
                            self.user=user;
                            self.users=null;
                        }
                        function refreshUsers(phone){
                            if (phone.length<3){return}
                            //var newVal = phone.replace(pattern, '').substring(0,10);
                            self.oldPhone=phone
                            //if(self.oldPhone==phone){return}else{self.oldPhone=phone}
                            searchUser(phone)
                        }
                        function searchUser(phone){
                            var q= {$or:[{'phone':phone},{name:phone},{email:phone}]}
                            UserEntry.getList({page:0,rows:20},q).then(function(res){
                                self.users=res;
                            })
                        }

                        function clearUser(){
                            self.user=null;
                        }
                        function addUser(){
                            console.log('add user')
                            var user={name:self.userName,
                                email:self.userEmail,
                                phone:self.phoneCode.substring(1)+self.oldPhone.substring(0,10)}
                            /*return $q.when()
                                .then(function(){
                                    return UserEntry.save(user).$promise
                                })
                                .then(function(res){
                                    user._id=(res._id)?res._id:res.id;
                                    self.addingUser=false;
                                    self.userName='';
                                    self.user=user;
                                    console.log(user)
                                    self.oldPhone=''
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('новый клиент')(err)
                                    }
                                })*/
                        }
                        function allFieldCheck() {
                            var data =!self.services.length|| !self.user
                            return data
                        }
                        function checkNameNewUser(){
                            //console.log(!self.userName || self.userName.length<3)
                            return (!self.userName || self.userName.length<3)
                        }
                        self.ok=function(){
                            //console.log(self.remind)
                            var item={
                                services:self.services,
                                user:{
                                    _id:self.user._id,
                                    name:self.user.name,
                                    phone:self.user.phone,
                                    email:self.user.email
                                },
                                remind:self.remind,
                                timeRemind:self.timeRemind
                            }
                            //console.log(item)

                            $uibModalInstance.close(item);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                    resolve:{
                        master:function(){return master},
                        timePart:function(){return timePart},
                    }
                });
                modalInstance.result.then(
                    function (item) {resolve(item)},
                    function () {reject()}
                );
            })

        }
        function editEntry(master,entry,saveFoo){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size:'lg',
                    templateUrl: 'components/ORDERS/online/editOnline.html',
                    controller: function ($uibModalInstance,$user,UserEntry,master,entry){
                        console.log(entry)
                        var self=this;
                        self.master=master;
                        self.entry=entry;
                        self.remind=entry.remind;
                        self.timeRemind=entry.timeRemind;
                        self.hour=parseInt(entry.start/4);
                        self.minutes=(entry.start-self.hour*4)*15;
                        self.timeRemindArr=timeRemindArr;
                        self.timeDuration=timeDuration;
                        console.log(self.timeDuration)
                        self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
                        self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';
                        
                        self.updateUser=updateUser;
                        self.changeDuration=changeDuration;
                        
                        actived()


                        function actived(){
                            self.user=Object.assign({},entry.user);
                            self.splitPoint = self.user.phone.length-10;
                            self.phoneCode='+'+self.user.phone.substring(0,self.splitPoint)
                            self.user.phone=self.user.phone.substring(self.splitPoint)
                        }
                        function updateUser() {
                            self.editingUser=false;
                            /*var  {phone,name,email}=self.user;
                            console.log(phone,name,email)*/
                            var o={_id:entry.user._id};
                            o.phone=self.phoneCode.substring(1)+self.user.phone;
                            o.name=self.user.name;
                            o.email=self.user.email;
                            var update='';
                            if('+'+entry.user.phone.substring(0,self.splitPoint)!=self.phoneCode){
                                update='phone';
                            }else if(entry.user.phone.substring(self.splitPoint)!=self.user.phone){
                                update='phone'
                            }
                            if(entry.user.name!=self.user.name){
                                update+=(update)?' name':'name';
                            }
                            if(entry.user.email!=self.user.email){
                                update+=(update)?' email':'email';
                            }
                            //console.log(update,o)
                            UserEntry.save({update:update},o,function(){
                                entry.user=o;
                                actived()
                            })
                        }

                        function changeDuration() {
                            console.log(self.entry,master)
                        }

                        self.ok=function(){
                            entry.remind=self.remind;
                            entry.timeRemind=self.timeRemind;
                            $uibModalInstance.close('save');
                        }
                        self.delete=function(){
                            $uibModalInstance.close('delete');
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                    resolve:{
                        master:function(){return master},
                        entry:function(){return entry}
                    }
                });
                modalInstance.result.then(
                    function (action) {resolve(action)},
                    function () {reject()}
                );
            })

        }

        function saveMasterInOnlineEntry(onlineEntry,id,entries){
            var update={update:'master entries',embeddedName:'masters',embeddedPush:true};
            var o={_id:onlineEntry,master:id,entries:entries};
            return Items.save(update,o).$promise;
        }
        function saveEntriesInOnlineEntry(onlineEntry,id,entries){
            var update={update:'entries',embeddedName:'masters',embeddedVal:id};
            var o={_id:onlineEntry,entries:entries};
            return Items.save(update,o).$promise;
        }
        function filterListServices(masters,items,selectedStuff) {
            console.log(masters)
            var stuffs=null;
            stuffs=masters.filter(function(m){

                if(!selectedStuff.length){
                    m.show=true;
                    return true;
                }
                m.show = selectedStuff.every(function(s){
                    // все выбранные услуги оказываются мастером
                    return m.stuffs.indexOf(s._id)>-1
                })
                return m.show;
            }).reduce(function(a,item){
                a.extend(item.stuffs)
                return a
            },[])
            console.log(stuffs)
            items.forEach(function(item){
                item.stuffs.forEach(function (s) {
                    if(stuffs){
                        if(stuffs.indexOf(s._id)>-1){s.hide=false}else{s.hide=true}
                    }else{
                        s.hide=false
                    }

                })
                //item.hide=item.stuffs.every(function(s){return s.hide})
                console.log(item)
            })

        }
    }
})()
