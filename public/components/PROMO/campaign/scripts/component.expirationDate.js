/**
 * @desc news directive that is specific to the main module
 * @example <news-item></news-item>
 */
'use strict';
(function(){
    angular.module('gmall.services')
        .directive('expirationDateCorrect',expirationDateDirective)
    function expirationDateDirective(){
        return {
            scope: {
                date:'@'
            },
            rescrict:"E",
            bindToController: true,
            controller: expirationDateCtrl,
            controllerAs: '$ctrl',
            templateUrl: function(){
                return 'components/PROMO/campaign/expirationDate.html'
            },
        }
    }
    expirationDateCtrl.$inject=['$interval','global'];
    function expirationDateCtrl($interval,global) {
        var self=this;
        self.gethumanizeDay=gethumanizeDay;
        self.gethumanizeHour=gethumanizeHour;
        self.gethumanizeMin=gethumanizeMin;
        self.gethumanizeSec=gethumanizeSec;

        activate()
        function activate(){
            var d = new Date(self.date);
            d.setHours(23)
            d.setMinutes(59)
            d.setSeconds(59)
            //console.log(moment(d).format('LLL'))
            console.log(Date.parse(self.date))
            self.dateEnd=Math.round((Date.parse(d)-Date.now())/1000)
            //console.log(self.dateEnd)
            var interval = $interval(function() {
                self.dateEnd--;
                if(self.dateEnd<=0){return}
                self.seconds = Math.floor((self.dateEnd) % 60);
                self.minutes = Math.floor(((self.dateEnd / (60)) % 60));
                self.hours = Math.floor(((self.dateEnd / (3600)) % 24));
                self.days = Math.floor(((self.dateEnd / (3600)) / 24));
                console.log(self.seconds,self.minutes,self.hours,self.days)

                //add leading zero if number is smaller than 10
                self.sseconds = self.seconds < 10 ? '0' + self.seconds : self.seconds;
                self.mminutes = self.minutes < 10 ? '0' + self.minutes : self.minutes;
                self.hhours = self.hours < 10 ? '0' + self.hours : self.hours;
                self.ddays = self.days < 10 ? '0' + self.days : self.days;
            }, 1000)
        }
        function gethumanizeDay(d){
            if(d==1 || d==21 || d==31 || d==41 || d==51 || d==61 || d==71 || d==71 || d==91 || d==101 || d==121 || d==131 || d==141 || d==151 || d==161 || d==171 || d==181 || d==191 || d==201 || d==221 || d==231 || d==241 || d==251 || d==261 || d==271 || d==281 || d==291 || d==301 || d==321 || d==331 || d==341 || d==351 || d==361){
                return global.get('lang').val.day
            }else if((d>1 && d<5)||(d>21 && d<25)||(d>31 && d<35)||(d>41 && d<45)||(d>51 && d<55)||(d>61 && d<65) || (d>71 && d<75) || (d>81 && d<85) || (d>91 && d<95) || (d>101 && d<105)||(d>121 && d<125)||(d>131 && d<135)||(d>141 && d<145)||(d>151 && d<155)||(d>161 && d<165) || (d>171 && d<175) || (d>181 && d<185) || (d>191 && d<195)||(d>201 && d<205)||(d>221 && d<225)||(d>231 && d<235)||(d>241 && d<245)||(d>251 && d<255)||(d>261 && d<265) || (d>271 && d<275) || (d>281 && d<285) || (d>291 && d<295)||(d>301 && d<305)||(d>321 && d<325)||(d>331 && d<335)||(d>341 && d<345)||(d>351 && d<355)||(d>361 && d<365)){
                return global.get('lang').val.days
            }else if(d==0||(d>=5 && d<21)||(d>=25 && d<31)||(d>=35 && d<41)||(d>=45 && d<51)||(d>=65 && d<71)||(d>=75 && d<81)||(d>=85 && d<91)||(d>=95 && d<101)||(d>=105 && d<121)||(d>=125 && d<131)||(d>=135 && d<141)||(d>=145 && d<151)||(d>=165 && d<171)||(d>=175 && d<181)||(d>=185 && d<191)||(d>=195 && d<201)||(d>=205 && d<221)||(d>=225 && d<231)||(d>=235 && d<241)||(d>=245 && d<251)||(d>=265 && d<271)||(d>=275 && d<281)||(d>=285 && d<291)||(d>=295 && d<301)||(d>=305 && d<321)||(d>=325 && d<331)||(d>=335 && d<341)||(d>=345 && d<351)||(d>=365 && d<371)){
                return global.get('lang').val.dayss
            }
        }
        function gethumanizeHour(h){
            if(h==1 || h==21){
                return global.get('lang').val.hour}
            else if((h>1&&h<5)||(h>21 && h<25)){
                return global.get('lang').val.hours
            }else if(h==0 ||h<21){
                return global.get('lang').val.hourss }
        }
        function gethumanizeMin(h){
            if(h==1 || h==21|| h==31|| h==41|| h==51){
                return global.get('lang').val.minute_a}
            else if((h>1&&h<5)||(h>21 && h<25)||(h>31 && h<35)||(h>41 && h<45)||(h>51 && h<55)){
                return global.get('lang').val.minutes
            }else if(h==0||h<21 || (h>24 && h<31)|| (h>34 && h<41)|| (h>44 && h<51)|| (h>54 && h<61)){
                return global.get('lang').val.minutess }
        }
        function gethumanizeSec(h){
            if(h==1 || h==21|| h==31|| h==41|| h==51){
                return global.get('lang').val.second}
            else if((h>1&&h<5)||(h>21 && h<25)||(h>31 && h<35)||(h>41 && h<45)||(h>51 && h<55)){
                return global.get('lang').val.seconds
            }else if(h==0||h<21 || (h>24 && h<31)|| (h>34 && h<41)|| (h>44 && h<51)|| (h>54 && h<61)){
                return global.get('lang').val.secondss }
        }
    }
})()
