/*
To make recovery in case of failure easier, an ad
 be started on port '1022'. If anything goes wrong
 ssh you can still connect to the additional one.
 If you run a firewall, you may need to temporaril
 this is potentially dangerous it's not done autom
 open the port with e.g.:
 'iptables -I INPUT -p tcp --dport 1022 -j ACCEPT'
 */




'use strict';
angular.module('gmall.directives')

.directive('storeSetting', function(){
    storeCtrl.$inject=['$q','Store','global','Seller','FilterTags','exception','Config','Template','$uibModal','$http','$scope','ConfigData','$timeout','Confirm','Master','$user']
    function storeCtrl($q,Store,global,Seller,FilterTags,exception,Config,Template,$uibModal,$http,$scope,ConfigData,$timeout,Confirm,Master,$user){
        var self = this;
        self.Items=Store;
        self.item={};
        self.item.timeTable=[{start:8,end:18},{start:8,end:18},{start:8,end:18},{start:8,end:18},{start:8,end:18},{start:8,end:18},{start:8,end:18}]
        self.lang=global.get('store' ).val.lang
        self.cacheTime=[
            {name:'1 hour',val:3600},
            {name:'12 hours',val:43200},
            {name:'1 day',val:86400},
            {name:'7 days',val:604800},
            {name:'30 days',val:2592000},
        ]

        self.yearTable= [];
        for(var ii=0;ii<=365;ii++){
            self.yearTable.push({is:true,s:10,e:18})
        }
        self.months=['январь',"февраль",'март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь']
        self.selectedMonth=0;




        self.selectTag=selectTag;
        self.deleteTag=deleteTag;
        self.addRedirects=addRedirects;
        self.deleteRedirects=deleteRedirects;
        self.global=global;
        self.animationTypes=animationTypes;
        self.onSelected=onSelected;
        self.bonusFormAdditionFields=bonusFormAdditionFields;
        var filtertTags=[];
        self.checkTest=checkTest;
        self.saveField=saveField

        self.changePhoneCodes=changePhoneCodes;
        self.saveFieldTemplate=saveFieldTemplate;
        self.saveTemplate=saveTemplate;
        self.changeTemplate=changeTemplate;
        self.clearCache=clearCache;
        self.setRowsForStuffList=setRowsForStuffList;
        self.changeCurrencyOrder=changeCurrencyOrder;
        self.savePhoneForSale=savePhoneForSale;

        self.deleteOwner=deleteOwner;
        self.getOwner=getOwner;
        self.addOwner=addOwner;

        self.deleteTranslater=deleteTranslater;
        self.getTranslaters=getTranslaters;
        self.addTranslater=addTranslater;

        self.syncWithStore=syncWithStore;
        //self.clearCashe=clearCashe;

        function clearCashe() {
            $q.when()
                .then(function () {
                    return $http.get("/api/resetStoreCashe/"+global.get('store').val._id)
                })
                .then(function (res) {
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)
                })
                .catch(function (err) {
                    exception.catcher('cброс кеша')(err)
                })

        }
        /*function clearCache(type) {
            var url = 'api/clearCache/'+type;
            Confirm('подтвердите')
                .then(function(){
                    return $http.get(url)
                })
                .then(function () {
                    exception.showToaster('info','сброс кеша','готово')
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('сброс кеша')(err)
                    }
                })

        }*/

        function savePhoneForSale() {
            console.log(self.item.seller.phone)
            self.saveFieldSeller('phone')
        }




        self.weekDays=weekDays;
        self.sliderOptions={
            floor: 0,
            ceil: 24,
            step: 1,
            onEnd:function () {
                saveField('timeTable')
            }
        }
        self.sliderOptionsForMsster={
            floor: 0,
            ceil: 24,
            step: 1,
        }
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
        function saveMasterSchedule() {
            if(self.selectedMaster){
                var o={_id:self.selectedMaster._id,timeTable:self.selectedMaster.timeTable}
                Master.save({update:'timeTable'},o,function () {
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)
                })
            }
        }
        /****************************************************************************************************/

        self.list=[];
        for (var i = 1; i <= 3; ++i) {
            self.list.push({label: "Item A" + i});
        }
        self.formatAverage=['не округлять','до десятков копеек','до целых','до десятков целых','сотен целых']





        activate()
        $scope.$on('changeLang',function(){
            setConfigData(global.get('store' ).val.lang)
            self.lang=global.get('store' ).val.lang
            self.item.name=(self.item.nameL[self.lang])?self.item.nameL[self.lang]:''
        })

        function activate(){
            var today = new Date()
            self.selectedMonth = today.getMonth()


            $q.when()
                .then(function () {
                    return $http.get('/api/getTemplates')
                })
                .then(function (res) {
                    //console.log(res)
                    self.templates=res.data
                })
                .then(function () {
                    return Master.getList()
                })
                .then(function (items) {
                    //console.log(items)
                    items.forEach(function (item) {
                        if(!item.timeTable || !item.timeTable.length || item.timeTable.length!=366){
                            item.timeTable=angular.copy(self.yearTable)
                        }
                    })
                    self.masters=items;
                })
                .then(function(){
                    return Config.getList();
                })

                .then(function(res){
                    console.log(res)
                    self.config=res[0];
                    self.config.phoneCodes=phoneCodes;
                    //console.log(self.config.phoneCodes)
                    console.log(self.config.currency,self.config.unitOfMeasure)
                    self.config.langs=languagesOfPlatform;
                    return Store.get({_id:global.get('store' ).val._id}).$promise;
                })
                .then(function(res){

                    //console.log(res._id)
                    /*res['currencyArr']=['UAH'];
                    res.currency={'UAH':[1,'UAH','грн.']};
                    res.mainCurrency='UAH';
                    return Store.save({update:'currencyArr currency mainCurrency'},res)
                    return*/

                    if(!res.domain){res.domain=res.subDomain+'.gmall.io'}
                    if(!res.lang){res.lang='ru'}
                    if(!res.langArr){res.langArr=['ru']}
                    //console.log(res.timeTable)
                    if(!res.timeTable){res.timeTable=[{},{},{},{},{},{},{}]}
                    res.timeTable.forEach(function (item,i) {
                        //console.log(i,res.timeTable[i])
                        if(!res.timeTable[i]){
                            res.timeTable[i]={}
                        }
                        if(!res.timeTable[i].start && res.timeTable[i].start!=0){
                            res.timeTable[i].start=8
                        }
                        if(!res.timeTable[i].end && res.timeTable[i].end!=0){
                            res.timeTable[i].end=18
                        }
                    })
                    var r=res;
                    if(!r.texts){r.texts={}}
                    if(!r.texts.subscriptionName){
                        r.texts.suscriptionName={}// заголовок в модальном окне подписки)
                    }
                    if(!r.texts.subscriptionText){
                        r.texts.suscriptionText={}// текст в модальном окне подписки)
                    }
                    if(!r.texts.callName){
                        r.texts.callName={}// заголовок для модального окна заказа обратного звонка
                    }
                    if(!r.texts.callText){
                        r.texts.callText={}// текст для модального окна заказа обратного звонка
                    }
                    if(!r.texts.feedbackName){
                        r.texts.feedbackName={}// заголовок для модального окна обратной связи
                    }
                    if(!r.texts.feedbackText){
                        r.texts.feedbackText={}// текст для модального окна заказа обратной связи
                    }
                    if(!r.texts.emailName){
                        r.texts.emailName={}// обращение в письме о подписке
                    }
                    if(!r.texts.emailText){
                        r.texts.emailText={}// текст в письме о подписке
                    }
                    if(!r.texts.confirmemail){
                        r.texts.confirmemail={}// текст в письме о подписке
                    }
                    if(!r.texts.mailTextRepeat){
                        r.texts.mailTextRepeat={}// текст в письме о подписке
                    }
                    if(!r.texts.orderMailText){
                        r.texts.orderMailText={}// текст в письме о заказе
                    }

                    if(!r.texts.buttonAuth){
                        r.texts.buttonAuth={}//текст на кнопки авторизации в письме
                    }
                    if(!r.texts.auth){
                        r.texts.auth={}// текст на кнопке авторизации в письме
                    }
                    if(!r.texts.pswd){
                        r.texts.pswd={}// текст для письма с паролем
                    }
                    if(!r.texts.unsubscribeName){
                        r.texts.unsubscribeName={}// заголовок в модальном окне подписки)
                    }
                    if(!r.texts.unsubscribeText){
                        r.texts.unsubscribeText={}// текст в модальном окне подписки)
                    }
                    if(!r.texts.dateTimeText){
                        r.texts.dateTimeText={}// текст в виджете записи на время)
                    }
                    if(!r.texts.masterName){
                        r.texts.masterName={}// текст в виджете записи на время)
                    }

                    if(!r.payData){
                        r.payData={}
                    }
                    if(!r.payData.liqPay){
                        r.payData.liqPay={}
                    }
                    if(!r.payData.pv24){
                        r.payData.pv24={}
                    }

                    /*if(!r.textCondition){
                        r.textCondition={}// условия покупки при оформлении заказа)
                    }*/


                    //self.item=res;
                    for(var key in res){
                        if(key!='_id'){
                            self.item[key]=res[key]
                        }



                    }
                    var i=0;

                    if(self.item.currency){
                        for(var key in self.item.currency){
                           if(!self.item.currency[key][3]){self.item.currency[key][3]=[]}
                           if(typeof self.item.currency[key][4]=='undefined'){self.item.currency[key][4]=0}
                           if(typeof self.item.currency[key][5]=='undefined'){self.item.currency[key][5]=2}
                        }

                    }
                    //console.log(self.item.currency)
                    self.currencyList = self.item.currencyArr.map(function(c){
                        return {name:c,index:i++}
                    })
                    //console.log(self.currencyList)
                    if(!self.item.phoneCodes || !self.item.phoneCodes.length){
                        self.item.phoneCodes=[self.config.phoneCodes[0]];
                        self.item.phoneCode=self.config.phoneCodes[0];
                        self.saveField('phoneCodes phoneCode')
                    }
                    if(!self.item.redirects){
                        self.item.redirects=[];
                    }
                    //console.log(self.item.turbosms)
                    if(!self.item.turbosms){
                        self.item.turbosms={};
                    }
                    if(!self.item.alphasms){
                        self.item.alphasms={};
                    }



                    //console.log(self.item.turbosms)


                    // tatiana 5867d1b3163808c33b590c12
                    // zefiz  578f5d1598238914569a1d39
                    // smartclinic 56f42aaafc50a3171d0e90e0
                    /*var o= {
                        is:false,
                        stores:[],
                        mps:[{
                            name:'smartclinic',
                            _id: '56f42aaafc50a3171d0e90e0'
                        }]
                    };
                    if (!self.item.mp){
                        self.item.mp=o;
                        self.saveField('mp')
                    }*/
                    //console.log(self.item.mp)
                   /* var o= {
                        is:true,
                        stores:['578f5d1598238914569a1d39'],
                        mps:[]
                    };*/
                    var o= {
                        is:false,
                        stores:[],
                        mps:[{
                            name:'smartclinic',
                            _id: '56f42aaafc50a3171d0e90e0'
                        }]
                    };
                    //self.item.mp=o;
                    //self.saveField('mp')
                    /*if (!self.item.mp){
                        self.item.mp=o;
                        self.saveField('mp')
                    }*/

                    $timeout(function () {
                        self.item._id=res._id
                        //console.log($.material)
                        //$.material.init()
                    },100)
                    return  FilterTags.getFilterTags()

                })
                .then(function(res){
                    filtertTags=res;
                    //console.log(filtertTags);

                    self.item.saleTag=filtertTags.getOFA('url',self.item.saleTag);
                    self.item.newTag=filtertTags.getOFA('url',self.item.newTag);
                    //console.log(self.item.saleTag,self.item.newTag)
                })
                .then(function () {
                    return ConfigData.getList(null);
                })
                .then(function (res) {
                    console.log(res)
                    self.configDatas=res;
                    setConfigData(global.get('store' ).val.lang)

                })

                .catch(function(err){
                    exception.catcher('получение данных')(err)
                })
        }
        //console.log(global.get('store' ).val)
       /* Store.get({_id:global.get('store' ).val._id}).$promise.then(function(res){
            self.item=res
        })*/
       function setConfigData(lang) {
           self.configData=self.configDatas.reduce(function (o,item) {
               if(item.lang==lang){
                   o[item.type]=item.data;
               }
               return o;
           },{})
               //console.log(self.configData)
       }
        function saveFieldTemplate(field,value){
            //console.log(field,value);return;
            var o ={_id:global.get('store').val._id}
            o[field]=value
            console.log(o)
            Store.save({update:field},o,function(err){
                exception.showToaster('info','обновлено')
            })
        }
        function saveField(field){
            var o ={_id:global.get('store' ).val._id}
            //console.log(global.get('store' ).val)
            if(field=='currencyArr'){
                var i=0;
                self.currencyList = self.item.currencyArr.map(function(c){
                    return {name:c,index:i++}
                })
                //empty
                //console.log(self.item)
                if(!self.item[field] ||
                    !self.item[field].length){
                    self.item[field]=['UAH'];
                    self.item.currency={'UAH':[1,'UAH','грн.',[],0,2]};
                    self.item.mainCurrency='UAH';
                }else{
                    try {

                        var currencyArrOld=Object.keys(self.item.currency).filter(function(el){return el})
                        //console.log(currencyArrOld)

                    } catch (err) {

                        var currencyArrOld=[];
                        self.item.currency=[];

                    }

                    if(self.item[field].length<currencyArrOld.length){
                        //delete
                        var diff = currencyArrOld.filter(function(x) { return self.item.currencyArr.indexOf(x) < 0 });
                        // delete from currency array

                        delete self.item.currency[diff[0]];

                        for(var i= 0,l=self.item.currency.length;i<l;i++){
                            if(self.item.currency[i][Object.keys(self.item.currency[i])[0]]==diff[0]){
                                self.item.currency.splice(i,1);
                                break;
                            }
                        }
                        // check mainCurrency
                         if(diff[0]==self.item.mainCurrency){
                             self.item.mainCurrency=Object.keys(self.item.currency)[0];
                             self.item.currency[self.item.mainCurrency][0]=1;
                        }
                    }else{
                        //add

                        var diff = self.item.currencyArr.filter(function(x) { return currencyArrOld.indexOf(x) < 0 });


                        self.item.currency[diff[0]]=[1,diff[0],'',[],0,2]

                    }
                }
                //console.log(self.item.currency)
                if(!self.item.mainCurrency){self.item.mainCurrency='UAH'}
                field +=' mainCurrency currency';
                o.mainCurrency=self.item.mainCurrency;
                if(!self.item.currency){
                    self.item.currency={'UAH':[1,'UAH','грн.',[],0,2]};

                }
                o.currency=self.item.currency;
                //console.log(self.item.currency)
                o['currencyArr']=self.item.currencyArr;
            }else if(field=='mainCurrency'){
                self.item.currency[self.item.mainCurrency][0]=1;
                field +=' currency';
                o.currency=self.item.currency;
                o.mainCurrency=self.item.mainCurrency;
            }else if(field=='owner'){
                o[field]=self.item[field].map(function (item) {
                    return item._id
                });
            }else{
                var fields=field.split(' ');
                fields.forEach(function(f){
                    o[f]=self.item[f];
                })

            }

            Store.save({update:field},o,function(){
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)


            },function(err){
                if(fields=='unitOfMeasure'){
                    console.log('in thems')
                    var oo ={_id:global.get('store').val._id,unitOfMeasureL:{}}
                    Store.save({update:'unitOfMeasureL'},oo,function(){
                        Store.get({_id:global.get('store').val._id,clone:'clone'})
                        Store.save({update:field},o,function(){
                            global.set('saving',true);
                            $timeout(function(){
                                global.set('saving',false);
                            },1500)
                        })
                    })
                }

            })
            //console.log(field,o)
        }

        self.saveFieldSeller=function(field){
            // console.log(field)
            var o ={_id:self.item.seller._id}
            if(field=='archImages'){
                self.item.seller[field]=self.item.seller[field].substring(0,300)
            }else if(field=='oayInfo'){
                self.item.seller[field]=self.item.seller[field].substring(0,3000)
            }else if(field=='saleMail'){
                self.item.seller[field]=self.item.seller[field].substring(0,100)
            }
            o[field]=self.item.seller[field]

            Seller.save({update:field},o,function () {
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)


            })
        }



        function selectTag(field){
            $q.when()
                .then(function(){
                    return FilterTags.selectFilterTag();
                })
                .then(function(tag){
                    self.item[field]=tag;
                    var o ={_id:global.get('store' ).val._id}
                    o[field]=self.item[field].url;
                    return Store.save({update:field},o).$promise
                })
                .catch(function(err){
                    if (err!='cancel'){
                        exception.catcher('выбор группы')(err)
                    }

                })
        }
        function deleteTag(field){
            $q.when()
                .then(function(){
                    self.item[field]=null;
                    var o ={_id:global.get('store' ).val._id}
                    o[field]=self.item[field]
                    return Store.save({update:field},o).$promise
                })
                .catch(function(err){
                    if (err!='cancel'){
                        exception.catcher('сброс группы')(err)
                    }

                })
        }
        function changePhoneCodes(){
            if(!self.item.phoneCodes || !self.item.phoneCodes.length){
                self.item.phoneCodes=[self.config.phoneCodes[0]];
                self.item.phoneCode=self.config.phoneCodes[0];

            }else{
                self.saveField('phoneCodes')
            }
        }

        function onSelected(){
            setTimeout(function(){
                $(':focus').blur();
            },50)
        }

        function bonusFormAdditionFields(){
            if(!self.item.bonusForm){self.item.bonusForm={}}

            if(!self.item.bonusForm.fields){
                self.item.bonusForm.fields=[{name:'Ближайший магазин',type:'select',values:['n2 ffdf','dd 444','jjdjdjd']},
                    {name:'Пол',type:'radio',values:['men','femail']}]
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/storeSetting/modal/setFieldsForBonusForm.html',
                controller: setFieldsForBonusFormCtrl,
                controllerAs:'$ctrl',
                size: 'lg',
                resolve:{
                    fields:function(){
                        return self.item.bonusForm.fields;
                    }
                }
            });
            modalInstance.result.then(function(){
                self.item.bonusForm.fields=self.item.bonusForm.fields.filter(function (e) {
                    return e
                })
                self.saveField('bonusForm');
            },function(){});
        }
        setFieldsForBonusFormCtrl.$inject=['$uibModalInstance','exception','global','$q','fields'];
        function setFieldsForBonusFormCtrl($uibModalInstance,exception,global,$q,fields){
            var self=this;
            self.fields=fields
            //console.log(fields)
            self.addField=addField;
            self.newField={type:'text',name:'название поля',values:[]}

            function addField() {
                self.fields.push(self.newField);
                self.newField={type:'text',name:'название поля',values:[]}
            }
            self.ok=function(){
                console.log(fields)
                $uibModalInstance.close();
            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };

        }
        function addRedirects(){
            self.item.redirects.push({from:'',to:''})
            saveField('redirects')
        }
        function deleteRedirects(i){
            self.item.redirects.splice(i,1)
            saveField('redirects')
        }
        function saveTemplate() {
            $q.when()
                .then(function () {
                    return $http.post('/api/setTemplate',{template:self.item.template,store:self.item._id})
                })
                .then(function (res) {
                    exception.showToaster('success','статус','обновлено')
                })
                .catch(function(err){
                    exception.catcher('выгрузка шаблона')(err)
                })
        }
        function changeTemplate(file) {
            console.log(file)
            $q.when()
                .then(function () {
                    return $http.get('/views/templates/'+file)
                })
                .then(function (res) {
                    console.log(res.data)
                    //return;
                    self.item.template=res.data;
                    Store.save({update:'template'},{_id:self.item._id,template:res.data})

                    exception.showToaster('success','статус','обновлено')
                })
                .catch(function(err){
                    exception.catcher('загрузка шаблона')(err)
                })

        }



        function setRowsForStuffList(list) {
            if(!list.rows){
                list.rows=4
            }
        }
        
        function changeCurrencyOrder() {
            self.item.currencyArr=self.currencyList.map(function (c) {
                return c.name;
            })
            self.saveField('currencyArr');
        };
        function checkTest(item) {
            console.log(item)
        }


        function deleteOwner(i){
            Confirm('Убрать админа?')
                .then(function () {
                    if(i){
                        self.item.owner.splice(i,1);
                        self.saveField('owner')
                    }else {
                        exception.showToaster('error','запрет','нельзя удалить владельца')
                    }
                })

        }
        function getOwner(){

            if(self.item.owner && self.item.owner.length){
                var q= {$and:[{store:self.item._id},{_id :{$in:self.item.owner}}]}
                $q.when()
                    .then(function(){
                        return $user.getList({page:0,rows:50},q)
                    })
                    .then(function(res){
                        //console.log(res)
                        if(res && res.length){
                            self.item.owner=self.item.owner.map(function (user) {
                                for(var i=0;i<res.length;i++){
                                    if(res[i]._id==user){
                                        return res[i]
                                    }
                                }
                                return null;
                            }).filter(function (item) {
                                return item;
                            });
                        }

                        self.item.showOwner=true;
                    })
            }else{
                self.item.showOwner=true;
            }
        }
        function addOwner(){
            $user.selectItem({store:self.item._id}).then(function(user){
                if(!self.item.owner){self.item.owner=[]}
                if(self.item.owner.some(function(e){return e._id==user._id})){return}
                self.item.owner.push({_id:user._id,name:user.name,email:user.email})
                self.saveField('owner');
                if(!self.item.seller.user){
                    var o={_id:self.item.seller._id,};
                    o.user=user._id;
                    o.name=user.name;
                    Seller.save({update:'user name'},o)
                }
            })
        }

        function deleteTranslater(i){
            Confirm('Убрать переводчика?')
                .then(function () {
                    self.item.еranslaters.splice(i,1);
                    self.saveField('translaters')
                })

        }
        function getTranslaters(){

            if(self.item.translaters && self.item.translaters.length){
                var q= {$and:[{store:self.item._id},{_id :{$in:self.item.translaters}}]}
                $q.when()
                    .then(function(){
                        return $user.getList({page:0,rows:50},q)
                    })
                    .then(function(res){
                        //console.log(res)
                        if(res && res.length){
                            self.item.translaters=self.item.translaters.map(function (user) {
                                for(var i=0;i<res.length;i++){
                                    if(res[i]._id==user){
                                        return res[i]
                                    }
                                }
                                return null;
                            }).filter(function (item) {
                                return item;
                            });
                        }

                        self.item.showTranslaters=true;
                    })
            }else{
                self.item.showTranslaters=true;
            }
        }
        function addTranslater(){
            $user.selectItem({store:self.item._id}).then(function(user){
                if(!self.item.translaters){self.item.translaters=[]}
                if(self.item.translaters.some(function(e){return e._id==user._id})){return}
                self.item.translaters.push({_id:user._id,name:user.name,email:user.email})
                self.saveField('translaters');
            })
        }


        function syncWithStore() {
            //console.log(self.item)
            if(!self.currentMonthDays){return}
            /*console.log(self.selectedMonth)
            console.log(self.selectedMaster.timeTable)
            console.log(self.monthDayDelta,self.currentMonthDays)*/
            self.selectedMaster.timeTable.forEach(function (item,i) {
                if(i>=self.monthDayDelta&&i<self.monthDayDelta+self.currentMonthDays){
                    var day = i-self.monthDayDelta+1
                    var d = new Date(year,self.selectedMonth,day);
                    try{
                        var n = d.getDay();
                        if(self.item.timeTable && self.item.timeTable[n]){
                            item.s=self.item.timeTable[n].start
                            item.e=self.item.timeTable[n].end
                            item.is=self.item.timeTable[n].is
                        }
                    }catch(err){console.log(err)}

                    //console.log(getDayOfWeek(day),n)
                }
            })
        }

        self.countriesList =[

            {name: 'AllOther', code: 'ALLOTHER'},
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Åland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'AndorrA', code: 'AD'},
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
            {name: 'Bangladesh', code: 'BD'},
            {name: 'Barbados', code: 'BB'},
            {name: 'Belarus', code: 'BY'},
            {name: 'Belgium', code: 'BE'},
            {name: 'Belize', code: 'BZ'},
            {name: 'Benin', code: 'BJ'},
            {name: 'Bermuda', code: 'BM'},
            {name: 'Bhutan', code: 'BT'},
            {name: 'Bolivia', code: 'BO'},
            {name: 'Bosnia and Herzegovina', code: 'BA'},
            {name: 'Botswana', code: 'BW'},
            {name: 'Bouvet Island', code: 'BV'},
            {name: 'Brazil', code: 'BR'},
            {name: 'British Indian Ocean Territory', code: 'IO'},
            {name: 'Brunei Darussalam', code: 'BN'},
            {name: 'Bulgaria', code: 'BG'},
            {name: 'Burkina Faso', code: 'BF'},
            {name: 'Burundi', code: 'BI'},
            {name: 'Cambodia', code: 'KH'},
            {name: 'Cameroon', code: 'CM'},
            {name: 'Canada', code: 'CA'},
            {name: 'Cape Verde', code: 'CV'},
            {name: 'Cayman Islands', code: 'KY'},
            {name: 'Central African Republic', code: 'CF'},
            {name: 'Chad', code: 'TD'},
            {name: 'Chile', code: 'CL'},
            {name: 'China', code: 'CN'},
            {name: 'Christmas Island', code: 'CX'},
            {name: 'Cocos (Keeling) Islands', code: 'CC'},
            {name: 'Colombia', code: 'CO'},
            {name: 'Comoros', code: 'KM'},
            {name: 'Congo', code: 'CG'},
            {name: 'Congo, The Democratic Republic of the', code: 'CD'},
            {name: 'Cook Islands', code: 'CK'},
            {name: 'Costa Rica', code: 'CR'},
            {name: 'Cote D\'Ivoire', code: 'CI'},
            {name: 'Croatia', code: 'HR'},
            {name: 'Cuba', code: 'CU'},
            {name: 'Cyprus', code: 'CY'},
            {name: 'Czech Republic', code: 'CZ'},
            {name: 'Denmark', code: 'DK'},
            {name: 'Djibouti', code: 'DJ'},
            {name: 'Dominica', code: 'DM'},
            {name: 'Dominican Republic', code: 'DO'},
            {name: 'Ecuador', code: 'EC'},
            {name: 'Egypt', code: 'EG'},
            {name: 'El Salvador', code: 'SV'},
            {name: 'Equatorial Guinea', code: 'GQ'},
            {name: 'Eritrea', code: 'ER'},
            {name: 'Estonia', code: 'EE'},
            {name: 'Ethiopia', code: 'ET'},
            {name: 'Falkland Islands (Malvinas)', code: 'FK'},
            {name: 'Faroe Islands', code: 'FO'},
            {name: 'Fiji', code: 'FJ'},
            {name: 'Finland', code: 'FI'},
            {name: 'France', code: 'FR'},
            {name: 'French Guiana', code: 'GF'},
            {name: 'French Polynesia', code: 'PF'},
            {name: 'French Southern Territories', code: 'TF'},
            {name: 'Gabon', code: 'GA'},
            {name: 'Gambia', code: 'GM'},
            {name: 'Georgia', code: 'GE'},
            {name: 'Germany', code: 'DE'},
            {name: 'Ghana', code: 'GH'},
            {name: 'Gibraltar', code: 'GI'},
            {name: 'Greece', code: 'GR'},
            {name: 'Greenland', code: 'GL'},
            {name: 'Grenada', code: 'GD'},
            {name: 'Guadeloupe', code: 'GP'},
            {name: 'Guam', code: 'GU'},
            {name: 'Guatemala', code: 'GT'},
            {name: 'Guernsey', code: 'GG'},
            {name: 'Guinea', code: 'GN'},
            {name: 'Guinea-Bissau', code: 'GW'},
            {name: 'Guyana', code: 'GY'},
            {name: 'Haiti', code: 'HT'},
            {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
            {name: 'Holy See (Vatican City State)', code: 'VA'},
            {name: 'Honduras', code: 'HN'},
            {name: 'Hong Kong', code: 'HK'},
            {name: 'Hungary', code: 'HU'},
            {name: 'Iceland', code: 'IS'},
            {name: 'India', code: 'IN'},
            {name: 'Indonesia', code: 'ID'},
            {name: 'Iran, Islamic Republic Of', code: 'IR'},
            {name: 'Iraq', code: 'IQ'},
            {name: 'Ireland', code: 'IE'},
            {name: 'Isle of Man', code: 'IM'},
            {name: 'Israel', code: 'IL'},
            {name: 'Italy', code: 'IT'},
            {name: 'Jamaica', code: 'JM'},
            {name: 'Japan', code: 'JP'},
            {name: 'Jersey', code: 'JE'},
            {name: 'Jordan', code: 'JO'},
            {name: 'Kazakhstan', code: 'KZ'},
            {name: 'Kenya', code: 'KE'},
            {name: 'Kiribati', code: 'KI'},
            {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
            {name: 'Korea, Republic of', code: 'KR'},
            {name: 'Kuwait', code: 'KW'},
            {name: 'Kyrgyzstan', code: 'KG'},
            {name: 'Lao People\'S Democratic Republic', code: 'LA'},
            {name: 'Latvia', code: 'LV'},
            {name: 'Lebanon', code: 'LB'},
            {name: 'Lesotho', code: 'LS'},
            {name: 'Liberia', code: 'LR'},
            {name: 'Libyan Arab Jamahiriya', code: 'LY'},
            {name: 'Liechtenstein', code: 'LI'},
            {name: 'Lithuania', code: 'LT'},
            {name: 'Luxembourg', code: 'LU'},
            {name: 'Macao', code: 'MO'},
            {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
            {name: 'Madagascar', code: 'MG'},
            {name: 'Malawi', code: 'MW'},
            {name: 'Malaysia', code: 'MY'},
            {name: 'Maldives', code: 'MV'},
            {name: 'Mali', code: 'ML'},
            {name: 'Malta', code: 'MT'},
            {name: 'Marshall Islands', code: 'MH'},
            {name: 'Martinique', code: 'MQ'},
            {name: 'Mauritania', code: 'MR'},
            {name: 'Mauritius', code: 'MU'},
            {name: 'Mayotte', code: 'YT'},
            {name: 'Mexico', code: 'MX'},
            {name: 'Micronesia, Federated States of', code: 'FM'},
            {name: 'Moldova, Republic of', code: 'MD'},
            {name: 'Monaco', code: 'MC'},
            {name: 'Mongolia', code: 'MN'},
            {name: 'Montserrat', code: 'MS'},
            {name: 'Morocco', code: 'MA'},
            {name: 'Mozambique', code: 'MZ'},
            {name: 'Myanmar', code: 'MM'},
            {name: 'Namibia', code: 'NA'},
            {name: 'Nauru', code: 'NR'},
            {name: 'Nepal', code: 'NP'},
            {name: 'Netherlands', code: 'NL'},
            {name: 'Netherlands Antilles', code: 'AN'},
            {name: 'New Caledonia', code: 'NC'},
            {name: 'New Zealand', code: 'NZ'},
            {name: 'Nicaragua', code: 'NI'},
            {name: 'Niger', code: 'NE'},
            {name: 'Nigeria', code: 'NG'},
            {name: 'Niue', code: 'NU'},
            {name: 'Norfolk Island', code: 'NF'},
            {name: 'Northern Mariana Islands', code: 'MP'},
            {name: 'Norway', code: 'NO'},
            {name: 'Oman', code: 'OM'},
            {name: 'Pakistan', code: 'PK'},
            {name: 'Palau', code: 'PW'},
            {name: 'Palestinian Territory, Occupied', code: 'PS'},
            {name: 'Panama', code: 'PA'},
            {name: 'Papua New Guinea', code: 'PG'},
            {name: 'Paraguay', code: 'PY'},
            {name: 'Peru', code: 'PE'},
            {name: 'Philippines', code: 'PH'},
            {name: 'Pitcairn', code: 'PN'},
            {name: 'Poland', code: 'PL'},
            {name: 'Portugal', code: 'PT'},
            {name: 'Puerto Rico', code: 'PR'},
            {name: 'Qatar', code: 'QA'},
            {name: 'Reunion', code: 'RE'},
            {name: 'Romania', code: 'RO'},
            {name: 'Russian Federation', code: 'RU'},
            {name: 'RWANDA', code: 'RW'},
            {name: 'Saint Helena', code: 'SH'},
            {name: 'Saint Kitts and Nevis', code: 'KN'},
            {name: 'Saint Lucia', code: 'LC'},
            {name: 'Saint Pierre and Miquelon', code: 'PM'},
            {name: 'Saint Vincent and the Grenadines', code: 'VC'},
            {name: 'Samoa', code: 'WS'},
            {name: 'San Marino', code: 'SM'},
            {name: 'Sao Tome and Principe', code: 'ST'},
            {name: 'Saudi Arabia', code: 'SA'},
            {name: 'Senegal', code: 'SN'},
            {name: 'Serbia and Montenegro', code: 'CS'},
            {name: 'Seychelles', code: 'SC'},
            {name: 'Sierra Leone', code: 'SL'},
            {name: 'Singapore', code: 'SG'},
            {name: 'Slovakia', code: 'SK'},
            {name: 'Slovenia', code: 'SI'},
            {name: 'Solomon Islands', code: 'SB'},
            {name: 'Somalia', code: 'SO'},
            {name: 'South Africa', code: 'ZA'},
            {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
            {name: 'Spain', code: 'ES'},
            {name: 'Sri Lanka', code: 'LK'},
            {name: 'Sudan', code: 'SD'},
            {name: 'Suriname', code: 'SR'},
            {name: 'Svalbard and Jan Mayen', code: 'SJ'},
            {name: 'Swaziland', code: 'SZ'},
            {name: 'Sweden', code: 'SE'},
            {name: 'Switzerland', code: 'CH'},
            {name: 'Syrian Arab Republic', code: 'SY'},
            {name: 'Taiwan, Province of China', code: 'TW'},
            {name: 'Tajikistan', code: 'TJ'},
            {name: 'Tanzania, United Republic of', code: 'TZ'},
            {name: 'Thailand', code: 'TH'},
            {name: 'Timor-Leste', code: 'TL'},
            {name: 'Togo', code: 'TG'},
            {name: 'Tokelau', code: 'TK'},
            {name: 'Tonga', code: 'TO'},
            {name: 'Trinidad and Tobago', code: 'TT'},
            {name: 'Tunisia', code: 'TN'},
            {name: 'Turkey', code: 'TR'},
            {name: 'Turkmenistan', code: 'TM'},
            {name: 'Turks and Caicos Islands', code: 'TC'},
            {name: 'Tuvalu', code: 'TV'},
            {name: 'Uganda', code: 'UG'},
            {name: 'Ukraine', code: 'UA'},
            {name: 'United Arab Emirates', code: 'AE'},
            {name: 'United Kingdom', code: 'GB'},
            {name: 'United States', code: 'US'},
            {name: 'United States Minor Outlying Islands', code: 'UM'},
            {name: 'Uruguay', code: 'UY'},
            {name: 'Uzbekistan', code: 'UZ'},
            {name: 'Vanuatu', code: 'VU'},
            {name: 'Venezuela', code: 'VE'},
            {name: 'Viet Nam', code: 'VN'},
            {name: 'Virgin Islands, British', code: 'VG'},
            {name: 'Virgin Islands, U.S.', code: 'VI'},
            {name: 'Wallis and Futuna', code: 'WF'},
            {name: 'Western Sahara', code: 'EH'},
            {name: 'Yemen', code: 'YE'},
            {name: 'Zambia', code: 'ZM'},
            {name: 'Zimbabwe', code: 'ZW'}
        ]


    }
    return {
        scope: {},
        bindToController: true,
        controller: storeCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/storeSetting/storeSetting.html'
    };
})

    .directive('storesList', function(){

        return {
            scope: {},
            restrict:'E',
            bindToController: true,
            controller: storeListCtrl,

            controllerAs: '$ctrl',
            templateUrl: 'components/storeSetting/storeList.html'
        };
        storeListCtrl.$inject=['$q','$state','Store','global','Seller','exception','Config','Template','$user','$http','Confirm','Photo','$timeout','siteName']
        function storeListCtrl($q,$state,Store,global,Seller,exception,Config,Template,$user,$http,Confirm,Photo,$timeout,siteName){
            console.log('storeListCtrl')
            console.log('stuffHost',stuffHost,'storeHost',storeHost)
            console.log(userHost)
            var self = this;
            self.Items=Store;
            self.$state=$state;
            self.query={storeType:'in-work'};
            self.paginate={page:0,rows:30,items:0}

            self.storeTypes=['work','template','in-work']

            self.getList=getList;
            self.createItem=createItem;
            self.saveField=saveField;
            self.addOwner=addOwner;
            self.deleteOwner=deleteOwner;
            self.getOwner=getOwner;

            self.deleteStore=deleteStore;
            self.cloneStore=cloneStore;
            self.readStore=readStore;
            self.readStoreUnable=readStoreUnable;
            self.changeDomain=changeDomain;
            self.changeType=changeType;
            self.searchItem=searchItem;
            self.changeSubDomain=changeSubDomain;
            self.clearDomain=clearDomain;
            activate()
            function activate(){

                $q.when()
                    .then(function(){
                        return Template.getList()
                    })
                    .then(function(res){
                        //console.log(res)
                        self.templates=res;
                    })
                    .then(function(){
                        return Config.getList();
                    })
                    .then(function(res){
                        //console.log(res)
                        self.config=res[0];
                        //console.log(self.config.currency,self.config.unitOfMeasure)
                        return Store.getList(self.paginate,self.query)

                    })
                    .then(function(data) {
                        data.forEach(function (s) {
                            s.date=moment(s.date).format('LLL')
                        })
                        self.items = data;
                        return self.items;
                    })
                    .then(function () {
                        var url =(storeHost)? 'http://'+storeHost+'/api/getSubDomains':'/api/getSubDomains'
                        return $http.get(url)
                    })
                    .then(function (res) {
                        self.subDomains=res.data;
                        console.log('self.subDomains',self.subDomains)
                    })

                    .catch(function(err){
                        console.log(err)
                        exception.catcher('получение данных')(err)
                    })
            }
            function getList(){
                return $q.when()
                    .then(function(){
                        return Store.getList(self.paginate,self.query)
                    })
                    .then(function(data) {
                        data.forEach(function (s) {
                            s.date=moment(s.date).format('LLL')
                        })
                        self.items = data;
                        return self.items;
                    })
            }
            //console.log(global.get('store' ).val)
            /* Store.get({_id:global.get('store' ).val._id}).$promise.then(function(res){
             self.item=res
             })*/
            function saveField(item,field,exist){
                if(exist){exception.catcher('выбор домена')('занят')}
                var o ={_id:item._id}/*,
                    currencyArr:['UAH'],
                    mainCurrency:'UAH',
                    currency:{UAH:[1,'UAH','грн.']}}*/
                o[field]=angular.copy(item[field]);
                if(field=='owner'){
                    o[field]=o[field].map(function(e){return e._id})
                }
                //field+=" currencyArr mainCurrency currency"
                if(field=='template'){
                    console.log('template')
                    var ooo = self.templates.getOFA('_id',item[field]);
                    /*console.log(ooo)
                    delete ooo._id;
                    delete ooo.name;*/
                    o[field]=ooo;
                }
                Store.save({update:field},o,function () {
                    global.set('saving',true);
                    console.log(global.get('saving'))
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)
                })
               // console.log(field,o)
            }

            self.saveFieldSeller=function(field){
                //console.log(field)
                var o ={_id:self.item.seller._id}
                o[field]=self.item.seller[field]
                Seller.save({update:field},o)
            }

            function createItem(){
                //console.log('create')
                $q.when()
                    .then(function(){
                        return siteName.choiceName()
                    })
                    .then(function(subDomain){
                        var store ={subDomain:subDomain}
                        store.name=subDomain;
                        store.storeType='in-work'
                        //console.log(store)
                        //store._id='56f42aaafc50a3171d0e90e0',
                        store.currencyArr=['UAH'];
                        store.mainCurrency='UAH';
                        store.currency={UAH:[1,'UAH','грн.']};
                       // store._id='56f42aaafc50a3171d0e90e0'
                        //console.log(store)
                        return Store.save(store).$promise
                    })
                    .then(function(){
                        return Store.getList(self.paginate,self.query)

                    })
                    .then(function(data) {
                        self.items = data;
                        return self.items;
                    })
                    .catch(function(err){
                        if(err){
                            exception.catcher('создание магазина')(err)
                        }
                    })
            }
            function deleteOwner(item,i){
                //console.log(item)
                item.owner.splice(i,1);
                self.saveField(item,'owner')
            }
            function getOwner(item){
                item.showOwner=true;
                if(item.owner && item.owner.length){
                    var q= {$and:[{store:item._id},{_id :{$in:item.owner}}]}
                    $q.when()
                        .then(function(){
                            return $user.getList({page:0,rows:50},q)
                        })
                        .then(function(res){
                            //console.log(res)
                            item.owner=res;
                        })
                }
            }
            function addOwner(item){
                $user.selectItem({store:item._id}).then(function(user){
                    if(!item.owner){item.owner=[]}
                    if(item.owner.some(function(e){return e._id==user._id})){return}
                    item.owner.push({_id:user._id,name:user.name,email:user.email})
                    self.saveField(item,'owner');
                    if(!item.seller.user){
                        var o={_id:item.seller._id,};
                        o.user=user._id;
                        o.name=user.name;
                        Seller.save({update:'user name'},o)
                    }
                })
            }

            function cloneStore(item) {
                return $q.when()
                    .then(function () {
                        return Store.upload(item)
                        //return Store.pickSubDomain()
                    })
                    .then(function () {
                        exception.showToaster('success','статус','выгрузка Store завершена')
                    })
                    .then(function () {
                        var url = (stuffHost)?'http://'+stuffHost+'/api/uploadStore/'+item._id:'/api/uploadStore/'+item._id
                        return $http.get(url)
                        //return Store.pickSubDomain()
                    })
                    .then(function () {
                        exception.showToaster('success','статус','выгрузка models завершена')
                    })
                    .catch(function(err){
                        if(err){
                            exception.catcher('выгрузка магазина')(err)
                        }
                    })
                    /*.then(function(data){
                        var store = angular.copy(item);
                        delete store.seller
                        delete store._id
                        delete store.owner;
                        delete store.domain
                        store.name=data.name;
                        store.subDomain=data.subDoamin;
                        for(var k in store.sn){
                            store.sn[k].link=null;
                        }
                        
                        return Store.save(store)
                    })
                    .then(function(){
                        console.log(res)
                    })*/

            }
            function readStore(item,readStore) {
                if(!readStore){return}

                Confirm('подтверждаете?')

                    .then(function () {
                        return $http.get('/api/readStoreStuff/'+item._id+'?subDomain='+readStore)
                    })

                    .then(function () {
                        exception.showToaster('success','статус','чтение models завершено')

                    })
                   /* .then(function () {
                        return $http.get('/api/readStoreUser/'+item._id+'?subDomain='+readStore)
                    })
                    .then(function () {
                        exception.showToaster('success','статус','чтение users завершено')

                    })
                    .then(function () {
                        return $http.get('/api/readStoreOrder/'+item._id+'?subDomain='+readStore)
                    })
                    .then(function () {
                        exception.showToaster('success','статус','чтение orders завершено')

                    })*/
                    .then(function () {
                        var url = (storeHost)?'http://'+storeHost+'/api/readStoreStore/'+item._id+'?subDomain='+readStore:'/api/readStoreStore/'+item._id+'?subDomain='+readStore
                        return $http.get(url)
                    })
                    .then(function () {
                        exception.showToaster('success','статус','чтение Store завершено')
                    })
                    .then(function () {
                        self.subDomain=''

                    })
                    .catch(function(err){
                        if(err){
                            exception.catcher('загрузка магазина')(err)
                        }
                    })
                /*.then(function(data){
                 var store = angular.copy(item);
                 delete store.seller
                 delete store._id
                 delete store.owner;
                 delete store.domain
                 store.name=data.name;
                 store.subDomain=data.subDoamin;
                 for(var k in store.sn){
                 store.sn[k].link=null;
                 }

                 return Store.save(store)
                 })
                 .then(function(){
                 console.log(res)
                 })*/

            }
            function deleteStore(item) {
                var folder='images/'+item.subDomain;
                Confirm("удалить?" )
                    .then(function(){
                        Confirm("удалить "+ item.subDomain+"???" )
                            .then(function(){
                                var url = 'http://'+stuffHost+'/api/deleteStore/'+item._id;
                                //console.log(url)
                                return $http.get(url)
                            })
                            .then(function(){
                                var url =socketHost+'/api/deleteStore/'+item._id
                                //console.log(url)
                                return $http.get(url)
                            })
                            .then(function(){
                                var url = 'http://'+orderHost+'/api/deleteStore/'+item._id;
                                //console.log(url)
                                return $http.get(url)
                            })
                            .then(function(){
                                var url='http://'+userHost+'/api/deleteStore/'+item._id;
                                //console.log(url)
                                return $http.get(url)
                            })
                            .then(function(){
                                var url = 'http://'+storeHost+'/api/deleteStore/'+item._id;
                                //console.log(url)
                                return $http.get(url)
                            })
                            .then(function(){
                                var folder='images/'+((item.subDomain)?item.subDomain:item._id)
                                return Photo.deleteFolder('Store',folder)
                            })

                            .then(function (res) {
                                //console.log(res)
                                exception.showToaster('info','status','good');

                            })
                            .then(function(){
                                self.paginate.items--;
                                if(self.paginate.page){self.paginate.page--}
                                return getList()

                            })
                            .catch(function(err){
                                if(err){
                                    exception.catcher('удаление магазина')(err)
                                }
                            })
                    } )




                /*var stuffHost = req.store.protocol + '://'+config.stuffHost;
                var userHost = req.store.protocol + '://'+config.userHost;
                var notificationHost = req.store.protocol + '://'+config.notificationHost;
                var socketHost = req.store.protocol + '://'+config.socketHost;
                var storeHost = req.store.protocol + '://'+config.storeHost;
                var photoHost = req.store.protocol + '://'+config.photoDownload;*/
                return;

                var folder='images/'+item.subDomain;
                Confirm("удалить???" )
                    .then(function(){
                        return Store.delete({_id:item._id} ).$promise;
                    } )
                    .then(function(){
                        activate();
                        return Photo.deleteFolder('Stat',folder)
                    })
                    .then(function () {
                        return User.delete({store:item._id} ).$promise;
                        // delete catalog chat user orders
                    })
                    .catch(function(err){
                        exception.catcher('удаление магазина')(err)
                    })
            }

            function readStoreUnable(item) {
                item.readStore=true;
                $timeout(function () {
                    item.readStore=false
                },15000)
            }
            function changeType(type) {
                self.paginate.page=0;
                if(type){
                    self.query.storeType=type
                }else{
                    delete self.query.storeType
                }
                delete self.query.$or
                getList()
            }
            function searchItem(str) {
                str=str.substring(0,15)
                console.log(str)
                self.paginate.page=0;
                delete self.query.storeType
                if(str){
                    self.query.$or=[{name:str},{subDomain:str}]
                }else{
                    delete self.query.$or
                }
                getList()
            }

            function changeSubDomain(item) {
                $q.when()
                    .then(function () {
                        return siteName.choiceName()
                    })
                    .then(function (name) {
                        item.subDomain=name.toLowerCase();
                        saveField(item,'subDomain')
                    })

            }
            function changeDomain(item) {
                $q.when()
                    .then(function () {
                        var data={
                            windowName:'Введите название домена',
                            field:'domain'
                        }
                        return siteName.choiceName(data)
                    })
                    .then(function (name) {
                        item.domain=name.toLowerCase();
                        saveField(item,'domain')
                    })

            }
            function clearDomain(item) {
                Confirm('Очистить значение поля домен?')
                    .then(function () {
                        item.domain=null;
                        saveField(item,'domain')
                    })
            }



        }
    })


.directive('currencyComponent',currencyComponent)
.directive('mainConfig',mainConfigComponent)
.directive('configData',configDataComponent);
function configDataComponent(){
    return{
        scope: {},
        restrict:"E",
        bindToController: true,
        controller: configDataComponentCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/storeSetting/configData.component.html'
    }
}
configDataComponentCtrl.$inject=['ConfigData','$q'];
function configDataComponentCtrl(Items,$q) {
    var self=this;
    self.selectType=selectType;
    self.languagesOfPlatform=languagesOfPlatform;
    self.propertiesOfConfigData=propertiesOfConfigData;
    self.saveField=saveField;
    var query=null;
    activate()
    function activate(){
        self.type = propertiesOfConfigData[0].key
        selectType(self.type)
    }
    function selectType(type) {
        query={type:type}
        $q.when()
            .then(function () {
                return Items.getList(null,query)
            })
            .then(function (res) {
                //console.log(res)
                if(!res.length){
                    var acts=[];
                    languagesOfPlatform.forEach(function(lang,idx){
                        var o ={type:type,lang:lang,data:[]}
                        acts.push(Items.save(o).$promise)
                    })
                    return $q.when()
                        .then(function(){
                            //console.log(acts)
                            return $q.all(acts)
                        })
                        .then(function(){
                            return Items.getList(null,query)
                        })
                }else if(res.length!=languagesOfPlatform.length){
                    var arr =languagesOfPlatform.diff(res.map(function (item){return item.lang}))
                    var acts=[];
                    arr.forEach(function(lang,idx){
                        var o ={type:type,lang:lang,data:[]}
                        acts.push(Items.save(o).$promise)
                    })
                    return $q.when()
                        .then(function(){
                            //console.log(acts)
                            return $q.all(acts)
                        })
                        .then(function(){
                            return Items.getList(null,query)
                        })
                }else{
                    return res;
                }
            })
            .then(function (res) {
                self.items=res;
                console.log(self.items)
            })
    }
    function saveField(item,field) {
        console.log(item)
        var o ={_id:item._id}
        o[field]=item[field]
        Items.save({update:field},o)

    }
}

//==================currencyComponent======================
function currencyComponent(){
    return{
        scope: {},
        restrict:"E",
        bindToController: true,
        controller: currencyComponentCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/storeSetting/currency.component.html'
    }
}
currencyComponentCtrl.$inject=['Store','$q','global','$http','$uibModal','exception'];
function currencyComponentCtrl(Store,$q,global,$http,$uibModal,exception){
    var self=this;
    self.save=save;
    self.recalculatePrice=recalculatePrice;
    activate();
    function activate(){
        $q.when()
            .then(function(){
                return Store.get({_id:global.get('store' ).val._id}).$promise
            })
            .then(function(res){
                for(var key in res.currency){
                    if (key==res.mainCurrency){
                        res.currency[key][0]=1;
                    }else{
                        res.currency[key][0] =Number(res.currency[key][0]);
                    }
                }
                self.item=res;
            })
    }
    function save(){
        var o ={_id:global.get('store' ).val._id}
        for(var key in self.item.currency){
            if(self.item.currency[key][2]){
                self.item.currency[key][2]=self.item.currency[key][2].substring(0,5);
            }
        }
        o.currency=self.item.currency
        Store.save({update:'currency'},o)
    }
    function recalculatePrice() {
        self.percValue=0;


        $uibModal.open({
            animation: true,
            templateUrl: 'components/storeSetting/modal/progressBar.html',
            controller: function($uibModalInstance,socket){

                $q.when()
                    .then(function () {
                        return $http({
                            method: "get",
                            url: '/api/recalculatePrice',
                        })
                    })
                    .then(function () {
                        $uibModalInstance.close();
                        exception.showToaster('info','выполнено')
                    })
                    .catch(function (err) {
                        console.log(err)
                        if(err){
                            exception.catcher('пересчет цены')(err)
                        }
                        $uibModalInstance.close();
                    })




               /* var self=this;
                self.max=100;
                socket.on('recalculatePrice',function(data){
                    self.value=data.perc;
                    console.log(self.value)
                    if(data.perc>=97){
                        $uibModalInstance.close();
                    }
                })
                self.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };*/
            },
            controllerAs:'$ctrl',
            size:'lg',

        });
        /*return $http({
            method: "get",
            url: stuffHost+'/api/recalculatePrice',
            data:data,
        })*/

        return;



        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/user/modal/downloadUsers.html',
            controller: function($uibModalInstance){
                var self=this;
                self.dateStart=Date.now()
                self.dateEnd=Date.now()
                self.ok=function(){
                    var o ={}
                    if(self.showPhone){
                        o={dateStart:self.dateStart,dateEnd:self.dateEnd}
                    }
                    $uibModalInstance.close(o);
                }
                self.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            controllerAs:'$ctrl',
            size:'lg',

        });
        modalInstance.result.then(function (data) {
            //console.log(data)
            $q.when()
                .then(function(){
                    self.pending=true;
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'components/storeSetting/modal/progressBar.html',
                        controller: function($uibModalInstance,socket){
                            var self=this;
                            self.max=100;
                            socket.on('recalculatePrice',function(data){
                                self.value=data.perc;
                                console.log(self.value)
                                if(data.perc>=97){
                                    $uibModalInstance.close();
                                }
                            })
                            self.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                        },
                        controllerAs:'$ctrl',
                        size:'lg',

                    });

                    return $http({
                        method: "POST",
                        url: userHost+'/api/download/subscribersList',
                        data:data,
                    })
                })

                .then(function (response) {
                    self.pending=false;
                })
                .catch(function(err){
                    self.pending=false;
                    if(err){
                        err=err.data||err;
                        exception.catcher('пересчет цены')(err)
                    }

                })
        }, function () {
        });
    }
}


//==================currencyComponent======================
function mainConfigComponent(){
    return{
        scope: {},
        restrict:"E",
        bindToController: true,
        controller: mainConfigComponentCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/storeSetting/mainConfig.component.html'
    }
}
mainConfigComponentCtrl.$inject=['Config','$q','global','exception','toaster'];
function mainConfigComponentCtrl(Config,$q,global,exception,toaster){
    var self=this;
    self.updateItem=updateItem;
    activate();
    function activate(){
        $q.when()
            .then(function(){
                return Config.query().$promise
            })
            .then(function(res){
                self.item=res[1]
                console.log(self.item)
                //res[2].$delete();

            })
    }
    function updateItem(){

        var item=angular.copy(self.item)
        delete item._id;
        delete item.__v
        var keys=Object.keys(item).join(' ')
        /*console.log(keys)
        return;*/
        Config.save({update:keys},self.item,function(res){
            toaster.pop('success', "сохранение", "перезаписано");
        })

    }
}

angular.module('gmall.directives')
    .directive('tagManagerForObject', function() {
    return {
        restrict: 'E',
        scope: { tags: '=',header:'@'},
        template:
        '<div class="tags">' +
        '<h3 ng-bind="header"></h3>'+
        '<p class="link-warning">удалить теги</p><p><a ng-repeat="(idx, tag) in tags" class="tag" ng-click="remove(idx)">{{getNameTag(idx)}} - {{tags[idx][getNameTag(idx)]}}</a></p>' +
        '<hr></div>' +
        '<div class="form-group"><div class="input-group"><input class="form-control" type="text" placeholder="добавить тег" ng-model="new_value.key" style="width: 45%; margin-right: 10px"> ' +
        '<input class="form-control"  type="text" placeholder="добавить значение" ng-model="new_value.value" style="width: 45%">' +
        '<span class="input-group-btn"><a class="btn btn-fab btn-fab-mini" ng-click="add()"><i class="material-icons link-success">add</i></a></div></div> '+
        '<h4 class="link-success">редактировать из списка</h4>'+
        '<div>'+
        '<a  class="tag-list" ng-repeat="(idx,tag) in tags" ng-click="edit(idx)">{{getNameTag(idx)}} - {{tags[idx][getNameTag(idx)]}}</a>'+
        '</div><hr>',
        link: function ( $scope, $element ) {
            $scope.new_value={};
            $scope.getNameTag = function(i){
                return Object.getOwnPropertyNames($scope.tags[i])[0]
            }
            // FIXME: this is lazy and error-prone
            var input = angular.element( $element.children()[1] );

            // This adds the new tag to the tags array
            $scope.add = function() {
                if (!$scope.tags || !$scope.tags.length){$scope.tags=[]};
                var o={};
                o[$scope.new_value.key]=$scope.new_value.value
                $scope.tags.push(o);
                $scope.new_value = {};
            };

            // This is the ng-click handler to remove an item
            $scope.remove = function ( idx ) {
                $scope.tags.splice( idx, 1 );
            };
            $scope.edit = function(idx) {
                $scope.new_value.key = $scope.getNameTag(idx);
                $scope.new_value.value = $scope.tags[idx][$scope.new_value.key];
                $scope.tags.splice( idx, 1 );
            };

            // Capture all keypresses
            input.bind( 'keypress', function ( event ) {
                // But we only care when Enter was pressed
                if ( event.keyCode == 13 ) {
                    // There's probably a better way to handle this...
                    $scope.$apply( $scope.add );
                }
            });
        }
    };
})

    .directive('tagManager', function() {
        return {
            restrict: 'E',
            scope: { tags: '=' ,header:'@'},
            template:
            '<div class="tags">' +
            '<h3 ng-bind="header"></h3></br>'+
            '<p class="link-warning">удалить метки</p><p><a ng-repeat="(idx, tag) in tags" class="tag" ng-click="remove(idx)">{{tag}}</a></p>' +
            '<hr></div>' +
            '<div class="form-group"><div class="input-group"><input class="form-control"  type="text" placeholder="добавить тег" ng-model="new_value"> ' +
            '<span class="input-group-btn"><a class="btn btn-fab btn-fab-mini" ng-click="add()"><i class="material-icons link-success">add</i></a></span></div></div>'+
            '<h4 class="link-success">редактировать из списка</h4>'+
            '<div>'+
            '<a class="tag-list" ng-repeat="tag in tags" ng-click="edit($index)">{{tag}}</a>'+
            '</div>' +
            '<hr>',
            link: function ( $scope, $element ) {
                // FIXME: this is lazy and error-prone
                var input = angular.element( $element.children()[1] );

                // This adds the new tag to the tags array
                $scope.add = function() {
                    if (!$scope.tags || !$scope.tags.length){$scope.tags=[]}
                    $scope.tags.push( $scope.new_value );
                    $scope.new_value = "";
                };

                // This is the ng-click handler to remove an item
                $scope.remove = function ( idx ) {
                    $scope.tags.splice( idx, 1 );
                };
                $scope.edit = function(idx) {
                    $scope.new_value = $scope.tags[idx];
                    $scope.tags.splice( idx, 1 );
                };

                // Capture all keypresses
                input.bind( 'keypress', function ( event ) {
                    // But we only care when Enter was pressed
                    if ( event.keyCode == 13 ) {
                        // There's probably a better way to handle this...
                        $scope.$apply( $scope.add );
                        //event.stopPropagation();
                        event.preventDefault()
                    }
                });
            }
        };
    })



