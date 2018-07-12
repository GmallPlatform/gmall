'use strict';
(function(){

    angular.module('gmall.directives')
        .directive('masterSchedule',masterScheduleDirective);

    function masterScheduleDirective($stateParams){
        return {
            bindToController: true,
            scope: {
                master:'@'
            },
            controllerAs: '$ctrl',
            controller: masterScheduleCtrl,
            templateUrl:'components/CONTENT/master/masterSchedule.html'
        }
    }
    masterScheduleCtrl.$inject=['$scope','$http','$stateParams','global','Master','$q','$timeout']
    function masterScheduleCtrl($scope,$http,$stateParams,global,Master,$q,$timeout) {
        var self=this;

        self.yearTable= [];
        for(var ii=0;ii<=365;ii++){
            self.yearTable.push({is:true,s:10,e:18})
        }
        self.months=['январь',"февраль",'март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь']
        self.selectedMonth=0;
        self.weekDays=weekDays;
        self.sliderOptionsForMssterArr=[];
        for(var i =0;i<=365;i++){
            var j =i;
            var o ={
                floor: 0,
                ceil: 24,
                step: 1,
                id:j,
                onEnd: onEndSlide
            }
            self.sliderOptionsForMssterArr.push(o)
        }
        function onEndSlide(sliderId) {
            //console.log(sliderId)
            saveMasterSchedule(sliderId)
        }

        /*self.sliderOptionsForMsster={
            floor: 0,
            ceil: 24,
            step: 1,
        }*/
        self.changeMaster=changeMaster;
        self.changeMonth=changeMonth;
        self.getDayOfWeek=getDayOfWeek;
        self.saveMasterSchedule=saveMasterSchedule;

        function changeMaster() {
            console.log(self.selectedMaster)
            //changeMonth(0)
            /*self.selectedMonth=0;
             self.currentMonthDays=31;
             self.monthDayDelta=getMonthDayDelta()*/
            //self.masterDays=self
        }
        function changeMonth(month){
            //console.log(month)
            self.selectedMonth= month
            self.monthDayDelta=getMonthDayDelta()
            self.currentMonthDays=getDaysInMonth()
            //console.log(self.selectedMonth,self.currentMonthDays,self.monthDayDelta)
        }
        function getMonthDayDelta(){
            //console.log('getMonthDayDelta')
            if(self.selectedMonth==1){
                return 31
            }else if(self.selectedMonth==2){
                return 31+29
            }else if(self.selectedMonth==3){
                return 31+29+31
            }else if(self.selectedMonth==4){
                return 31+29+31+30
            }else if(self.selectedMonth==5){
                return 31+29+31+30+31
            }else if(self.selectedMonth==6){
                return 31+29+31+30+31+30
            }else if(self.selectedMonth==7){
                return 31+29+31+30+31+30+31
            }else if(self.selectedMonth==8){
                return 31+29+31+30+31+30+31+31
            }else if(self.selectedMonth==9){
                return 31+29+31+30+31+30+31+31+30
            }else if(self.selectedMonth==10){
                return 31+29+31+30+31+30+31+31+30+31
            }else if(self.selectedMonth==11){
                return 31+29+31+30+31+30+31+31+30+31+30
            }else{
                return 0;
            }
        }
        var today = new Date();
        var year=today.getFullYear();
        function getDayOfWeek(day) {
            var d = new Date(year,self.selectedMonth,day);
            //console.log(d.toDateString())
            var weekday = new Array(7);
            weekday[0] =  'Воскресенье'//"Sunday";
            weekday[1] = "Понедельник";
            weekday[2] = "Вторник";
            weekday[3] = "Среда";
            weekday[4] = "Четверг";
            weekday[5] = "Пятница";
            weekday[6] = "Суббота";
            var n = weekday[d.getDay()];
            return n;
            /*weekday[0] =  "Sunday";
             weekday[1] = "Monday";
             weekday[2] = "Tuesday";
             weekday[3] = "Wednesday";
             weekday[4] = "Thursday";
             weekday[5] = "Friday";
             weekday[6] = "Saturday";
             */
        }



        function getDaysInMonth() {
            //https://habrahabr.ru/post/261773/
            function f(x, y) { return 28 + ((x + Math.floor(x / 8)) % 2) + 2 % x + Math.floor((1 + (1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1))) / x) + Math.floor(1/x) - Math.floor(((1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1)))/x); }
            var x=self.selectedMonth+1;
            var d = f(x, year)
            //var d= 28+(x+Math.ceil(x/8))%2+2%x+2*Math.ceil(1/x)
            //console.log(d)
            return d;
        }
        function saveMasterSchedule(i) {

            if(self.selectedMaster){
                if(i!=undefined){
                    var o={_id:self.selectedMaster._id}
                    o['timeTable.'+i]=self.selectedMaster.timeTable[i]
                    Master.save({update:'timeTable.'+i},o,function () {
                        global.set('saving',true);
                        $timeout(function(){
                            global.set('saving',false);
                        },1500)
                    })
                }else{
                    var o={_id:self.selectedMaster._id,timeTable:self.selectedMaster.timeTable}
                    Master.save({update:'timeTable'},o,function () {
                        global.set('saving',true);
                        $timeout(function(){
                            global.set('saving',false);
                        },1500)
                    })
                }

            }
        }

        activate()

        function activate() {
            var today = new Date()
            self.selectedMonth = today.getMonth()
            $q.when()
                .then(function () {
                    if(self.master){
                        return Master.getItem(self.master)
                    }
                })
                .then(function (master) {
                    if(master){
                        self.selectedMaster=master;
                        if(!master.timeTable || !master.timeTable.length || master.timeTable.length!=366){
                            master.timeTable=angular.copy(self.yearTable)
                            saveMasterSchedule()
                        }
                    }
                })
                .then(function () {
                    self.changeMonth(self.selectedMonth)
                })
                .then(function(){
                    $timeout(function () {
                        $scope.$broadcast('rzSliderForceRender');
                    },200);
                })
        }

    }
})()
