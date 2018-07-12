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
            templateUrl: 'components/TEMPLATE/dateTimeEntry/dateTimeEntry.html',
        }
    }
    itemCtrl.$inject=['$scope','Booking','UserEntry','$user','$element','$timeout','Stuff','Master','$stateParams','$q','$uibModal','exception','global','$rootScope'];
    function itemCtrl($scope,Booking,UserEntry,$user,$element,$timeout,Stuff,Master,$stateParams,$q,$uibModal,exception,global,$rootScope){
        var self = this;
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
        self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
        self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';
        


        self.selectedStuff=[];
        self.startTimeParts=Online.startTimeParts;36;
        self.endTimeParts=Online.endTimeParts;72;
        self.timeTable15min=Online.timeTable15min;
        self.timeParts=Online.timeParts;
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
        self.back=back;
        self.forward=forward;


        //stuff
        self.addStuff=addStuff;
        self.deleteStuff=deleteStuff;
        self.clearStuff=clearStuff;

        self.selectMaster=selectMaster;
        self.clearMaster=clearMaster;

        self.setDay=setDay;
        self.setTimePart=setTimePart;
        self.filterTimePart=filterTimePart;

        self.orderService=orderService;



        //self.getTagName=getTagName;
        /*self.getFilterName=getFilterName;
        var stuffs;*/

        //********************activate***************************
        activate();
        //*******************************************************
        function activate() {
            $timeout(function(){
               // console.log($($element).parent().height())
                $($element).height($($element).parent().height())
                $($element).find('#wrapper-for-entry1').height('100%')
                w2=$($element).find('#wrapper-for-entry2');
                blocks=$($element).find('#wrapper-for-entry2').children()
                widthBlock=$(blocks[0]).width()
                self.currentBlock=0;
            },1500)

            $(window).resize(function(){
                $($element).height($($element).parent().height())
                $($element).find('#wrapper-for-entry1').height('100%')
                widthBlock=$(blocks[0]).width()
            })
            $scope.$on('dateTime',function(e,stuff){
                if(!opened){
                    opened=true;
                    self.name=(global.get('user').val && global.get('user').val.profile.fio)?global.get('user').val.profile.fio:'';
                    self.phone=(global.get('user').val && global.get('user').val.profile.phone)?global.get('user').val.profile.phone:'';
                    if(self.phone){
                        var phoneCode='+'+self.phone.substring(0,self.phone.length-10);
                        if(self.phoneCodes.getOFA('code',phoneCode)){
                            self.phoneCode=phoneCode;
                        }

                        self.phone=self.phone.substring(self.phone.length-10)
                    }
                    //console.log(self.phone,self.phoneCode,self.name)
                    $q.when()
                        .then(function () {
                            return getMasters()
                        })
                        .then(function () {
                            return getItems();
                        })
                        .then(function () {
                            return Online.filterListServices(self.masters,self.items,self.selectedStuff);
                        })
                        .then(function () {
                            if(!stuff){return}
                            self.currentBlock=0;
                            self.selectedStuff=[stuff.getDataForOnline()];
                            $timeout(function(){
                                forward()
                            },200)
                        })

                }else{
                    if(!stuff){return}
                    self.currentBlock=0;
                    self.selectedStuff=[stuff.getDataForOnline()];
                    $timeout(function(){
                        forward()
                    },200)
                }

            })
        }
        function getMasters(){
            return $q.when()
                .then(function(){
                    return global.get('masters').val;
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
        function getItems() {
            return $q.when()
                .then(function () {
                    return self.Items.getServicesForOnlineEntry()
                })
                .then(function (res) {
                    return self.items=res;
                })
                .catch(function(err){
                    exception.catcher('получение списка услуг')(err)
                });

            return;
        }
        function back() {
            if(self.currentBlock==2){
                clearMaster()
            }
            widthBlock=$(blocks[0]).width()
            if(self.currentBlock){self.currentBlock--}
            var magrin_left=widthBlock*self.currentBlock;
            $(w2).css('margin-left',-magrin_left)
        }
        function forward(){
            widthBlock=$(blocks[0]).width()
            self.currentBlock++
            var magrin_left=widthBlock*self.currentBlock;
            //console.log(magrin_left)
            $(w2).css('margin-left',-magrin_left)
        }


        //***********************stuff
        function addStuff(stuff) {
            if(self.selectedStuff.map(function(s){return s.name}).indexOf(stuff.name)>-1){
                console.log('already is in list')
                return;
            }
            self.selectedStuff.push(stuff);
            Online.filterListServices(self.masters,self.items,self.selectedStuff);
        }
        function deleteStuff(i) {
            self.selectedStuff.splice(i,1);
            Online.filterListServices(self.masters,self.items,self.selectedStuff);
        }
        function clearStuff(){
            self.selectedStuff=[];
        }

        //**********************************************
        //***********master
        function selectMaster(master){
            self.masters.forEach(function (m) {
                if(master){
                    if(master._id==m._id){
                        m.selected=true;
                    }else{
                        m.selected=null;
                    }
                }else{
                    m.selected=true;
                }

            })
            forward()
        }
        function clearMaster(){
            self.masters.forEach(function (m) {
                m.selected=null;
            })
        }
        //********************* date
        //************** day
        function setDay(td){
            forward();
            var date = new Date(td);
            month = date.getMonth() + 1; //months from 1-12
            day = date.getDate();
            year = date.getFullYear();
            if(month<10){month='0'+month}
            var query={date:'date'+year+month+day};
            getBookingData(query)
        }

        //********************* timepart
        function getBookingData(query){
            //if(!self.selectedMaster){return}
            console.log(query)

            return Booking.getList({page:0,rows:10},query)
                .then(function(data) {
                    var datePart=query.$and.reduce(function (o,elem) {
                        var keys = Object.keys(elem);
                        o[keys[0]] = elem[keys[0]];
                        return o;
                    },{})

                    var stuffsDuration=self.selectedStuff.reduce(function(d,item){
                        //console.log(item)
                        return d+((item.timePart)?item.timePart:4)
                    },0)
                    //console.log(stuffsDuration)
                    self.onlineEntry = data[0]?data[0]:null;
                    if(self.onlineEntry){
                        self.entryTimeTable=angular.copy(Online.timeParts);
                        self.entryTimeTable.forEach(function (b) {b.busy=true;b.date=query.date})
                        self.masters.forEach(function (masterFromList) {
                            //console.log(masterFromList)
                            if(masterFromList.selected && masterFromList.show){
                                masterFromList.entryTimeTable=angular.copy(Online.timeParts)
                                var entryMaster =self.onlineEntry.masters.getOFA('master',masterFromList._id)
                                //console.log(entryMaster)
                                if(entryMaster){
                                    entryMaster.entries.forEach(function(e){
                                        for(var i=e.start;i<e.start+e.qty;i++){
                                            masterFromList.entryTimeTable[i].busy=true;
                                        }
                                    })
                                    //setDataForEntry(entryMaster,masterFromList)
                                }/*else{
                                    masterFromList.entryTimeTable=[];
                                }*/
                            }else {
                                masterFromList.entryTimeTable=[];
                            }
                            masterFromList.entryTimeTable.forEach(function(block,i){
                                //console.log(masterFromList.name,i,block.busy)
                                if(!block.busy && self.entryTimeTable[i].busy){
                                    for(var j=i;j<i+stuffsDuration;j++){
                                        if(masterFromList.entryTimeTable[j] && masterFromList.entryTimeTable[j].busy){
                                            return;
                                        }
                                    }
                                    //console.log('enter - ',i,masterFromList.name)
                                    self.entryTimeTable[i].busy=false;
                                    self.entryTimeTable[i].master=masterFromList;
                                }
                            })

                        })
                        return self.onlineEntry;
                    }else{
                       console.log(datePart);
                       self.onlineEntry=angular.copy(datePart)
                        return $q.when()
                            .then(function () {
                                return Online.save(self.onlineEntry).$promise
                                //return {_id:'sdfsdfsd222'}
                            })
                            .then(function (res) {
                                self.onlineEntry._id=(res._id)?res._id:res.id;
                                self.onlineEntry.masters=[];
                                return self.onlineEntry
                            })
                            .then(function () {
                                self.entryTimeTable=angular.copy(Online.timeParts);
                                self.entryTimeTable.forEach(function (b) {b.busy=true;b.date=datePart})
                                self.masters.forEach(function (masterFromList) {
                                    //console.log(masterFromList)
                                    if(masterFromList.selected && masterFromList.show){
                                        masterFromList.entryTimeTable=angular.copy(Online.timeParts)
                                    }else {
                                        masterFromList.entryTimeTable=[];
                                    }
                                    masterFromList.entryTimeTable.forEach(function(block,i){
                                        //console.log(masterFromList.name,i,block.busy)
                                        if(!block.busy && self.entryTimeTable[i].busy){
                                            for(var j=i;j<i+stuffsDuration;j++){
                                                if(masterFromList.entryTimeTable[j] && masterFromList.entryTimeTable[j].busy){
                                                    return;
                                                }
                                            }
                                            //console.log('enter - ',i,masterFromList.name)
                                            self.entryTimeTable[i].busy=false;
                                            self.entryTimeTable[i].master=masterFromList;
                                        }
                                    })
                                })

                                return;
                            })

                        /*return
                        console.log('create online')*/
                    }

                });
        }
        function setDataForEntry(entryMaster,master){
            entryMaster.entries.forEach(function(e){
                for(var i=e.start;i<e.start+e.qty;i++){
                    master.entryTimeTable[i].busy=true;
                }
            })
        }
        function setTimePart(part) {
            self.timePart=part;
            console.log(part)
            forward()
        }
        function filterTimePart(item){
            // console.log(item.i>=self.startTimeParts && item.i<=Online.endTimeParts && !item.busy)
            if(item.i>=self.startTimeParts && item.i<=Online.endTimeParts && !item.busy){
                return true;
            }

        }


        /* var t2 =moment("четверг, 15 января 1995 г., 12:12", "DD-MMMM-YYYY, H:mm");
         console.log(moment(t2).format('LLLL'))*/
        function orderService(){
            var user = global.get('user').val;
            var store = global.get('store').val
            var phone = self.phoneCode.substring(1)+self.phone.substring(0,10);
            self.email = (user)?user.email:null;
            if(!phone){
                console.log('нет телефона')
                return
            }
            function checkOut(userEntry) {
                //console.log(userEntry)
                var entry={
                    services:self.selectedStuff,
                    user:{
                        _id:userEntry._id,
                        name:userEntry.name,
                        phone:userEntry.phone,
                        email:userEntry.email
                    },
                    /*remind:self.remind,
                     timeRemind:self.timeRemind*/
                };
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
                            entries.push(o)
                            val+=s.timePart;
                        })
                        var m = angular.copy(self.onlineEntry.masters.getOFA('master',self.timePart.master._id))
                        //console.log()
                       // return entries;
                        if(!m){
                            //console.log('create master');
                            return Online.saveMasterInOnlineEntry(self.onlineEntry._id,self.timePart.master._id,entries)
                        }else{
                            m.entries=m.entries.concat(entries);
                            return Online.saveEntriesInOnlineEntry(self.onlineEntry._id,m._id,m.entries)
                        }

                    })
                    .then(function(res){
                        clearStuff()
                        clearMaster();
                        while(self.currentBlock){
                            back()
                        }
                        if($rootScope.checkedMenu && $rootScope.checkedMenu.entryTime){
                            $rootScope.checkedMenu.entryTime=false;
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

            if(user && user.data && user.data[store._id] && user.data[store._id].userEntry){
                $q.when()
                    .then(function(){
                        user.profile.fio=self.name;
                        user.profile.phone=phone;
                        var o={_id:user._id,profile:user.profile}
                        return $user.save({update:'profile'},o).$promise
                    })
                    .then(function(){
                        var o={_id:user.data[store._id].userEntry,name:self.name,phone:phone}
                        if(self.email){o.email=email;}
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
                        if(user){
                            return $q.when()
                                .then(function () {
                                    user.profile.fio=self.name;
                                    user.profile.phone=phone;
                                    var o={_id:user._id,profile:user.profile,data:{}}
                                    o.data[store._id]=user.data[store._id];
                                    o.data[store._id].userEntry=userEntry._id;
                                    console.log(o)
                                    return $user.save({update:'profile data.'+store._id},o).$promise
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

    }

})()