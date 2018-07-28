/**
 * @desc news directive that is specific to the main module
 * @example <news-item></news-item>
 */
'use strict';
(function(){
    angular.module('gmall.services')
        .directive('campaignItem',itemDirective)
        .directive('campaignItemTemplate',campaignItemTemplateDirective)
        .directive('expirationDate',expirationDateDirective)

    function itemDirective(){
        return {
            scope: {},
            rescrict:"E",
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/PROMO/campaign/campaignItem.html',
        }
    }
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

        this.$onInit = function() {
            activate()
        }


        function activate(){
            var d = new Date(self.date);
            d.setHours(23)
            d.setMinutes(59)
            d.setSeconds(59)
            //console.log(moment(d).format('LLL'))
            //console.log(Date.parse(self.date))
            self.dateEnd=Math.round((Date.parse(d)-Date.now())/1000)
            //console.log(self.dateEnd)
            var interval = $interval(function() {
                self.dateEnd--;
                if(self.dateEnd<=0){return}
                self.seconds = Math.floor((self.dateEnd) % 60);
                self.minutes = Math.floor(((self.dateEnd / (60)) % 60));
                self.hours = Math.floor(((self.dateEnd / (3600)) % 24));
                self.days = Math.floor(((self.dateEnd / (3600)) / 24));
                // console.log(self.seconds,self.minutes,self.hours,self.days)

                //add leading zero if number is smaller than 10
                self.sseconds = self.seconds < 10 ? '0' + self.seconds : self.seconds;
                self.mminutes = self.minutes < 10 ? '0' + self.minutes : self.minutes;
                self.hhours = self.hours < 10 ? '0' + self.hours : self.hours;
                self.ddays = self.days < 10 ? '0' + self.days : self.days;
            }, 1000)
        }
        //console.log(global.get('lang').val)
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
                return global.get('lang').val.hourss
            }
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
    itemCtrl.$inject=['Campaign','$stateParams','$state','$q','$uibModal','global','exception','Stuff','News','$window','FilterTags','BrandTags','Category','$timeout','$interval','$scope','Brands'];
    function itemCtrl(Campaign,$stateParams,$state,$q,$uibModal,global,exception,Stuff,News,$window,FilterTags,BrandTags,Category,$timeout,$interval,$scope,Brand){
        console.log('Campaign')
        var self = this;
        self.Items=Campaign;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.cartType='good'



        self.cartTypes=[{type:'good',name:'товар'},{type:'service',name:'услуга'},{type:'info',name:'инфо'},{type:'media',name:'медиа'}]
        self.saveField=saveField;
        self.createNews = createNews;
        self.selectFilterTag=selectFilterTag;
        self.selectBrandTag=selectBrandTag;
        self.selectBrand=selectBrand;
        self.selectCategory=selectCategory;
        self.selectStuff=selectStuff;
        self.selectConditionFilterTag=selectConditionFilterTag;
        self.selectConditionBrandTag=selectConditionBrandTag;
        self.selectConditionBrand=selectConditionBrand;
        self.selectConditionCategory=selectConditionCategory;
        self.selectConditionStuff=selectConditionStuff;
        self.deleteBrandTag=deleteBrandTag;
        self.deleteCategory=deleteCategory;
        self.deleteFilterTag=deleteFilterTag;
        self.deleteStuff=deleteStuff;
        self.deleteConditionBrandTag=deleteConditionBrandTag;
        self.deleteConditionBrand=deleteConditionBrand;
        self.deleteBrand=deleteBrand;
        self.deleteConditionCategory=deleteConditionCategory;
        self.deleteConditionFilterTag=deleteConditionFilterTag;
        self.deleteConditionStuff=deleteConditionStuff;
        self.onSelected=onSelected;
        self.showConditionInput=showConditionInput;
        self.dispalyCondition=dispalyCondition;

        //********************activate***************************
        activate();
        $scope.$on('changeLang',function(){
            activate()
        })

        //*******************************************************
        function activate() {
            return getItem($stateParams.id).then(function() {
                //console.log('Activated item View');
                self.campaignStuff='stuffs'

            } ).catch(function(err){
                exception.catcher('получение компании')(err)
            });
            if(global.get('tempContent') && global.get('tempContent').val){
                $('#tempContent').empty()
                global.set('tempContent',null)
            }
        }
        function getItem(id) {
            return self.Items.getItem(id)
                .then(function(data) {
                    /*if(data.condition!="percent" || data.condition!="sum"){
                        data.condition="percent"
                    }*/
                    //console.log(data)
                    self.showCondition={percent:false,sum:false};
                    self.showCondition[data.condition]=true;
                    self.item = data;
                    //return self.item;
                    //console.log(Math.round((Date.parse(self.item.dateEnd)-Date.now())/1000));
                    if(self.item.cartType){
                        self.cartType=self.item.cartType;
                    }
                    console.log(self.cartType)
                } ).catch(function(err){
                    return $q.reject(err)
                });
        }
        function saveField(field,defer){
            if(field=='dateStart'){

                 var d = new Date(self.item[field]);
                 d.setHours(0)
                 d.setMinutes(0)
                 d.setSeconds(1)
                self.item[field]=d;
                console.log(self.item[field])

            }else if(field=='dateEnd'){

                var d = new Date(self.item[field]);
                d.setHours(23)
                d.setMinutes(59)
                d.setSeconds(59)
                self.item[field]=d;
                console.log(self.item[field])
            }
            defer =defer||0
            setTimeout(function(){
                var o={_id:self.item._id};
                //console.log(field)
                if(field=='brandTags' || field=='categories' || field=='tags' || field=='brands' || field=='conditionBrandTags'
                    || field=='conditionCategories' || field=='conditionTags' || field=='conditionBrands'){
                    o[field]=self.item[field].map(function (b) {return b._id})
                }else{
                    o[field]=self.item[field]
                }
                self.Items.save({update:field},o,function () {
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)

                },function(err){
                    console.log(err)
                });
            },defer)
        };
        function createNews(){
            //var domain=global.get('store' ).val.domain||global.get('store' ).val.subDomain;
            var news={
                name:self.item.name,
                link:'/campaign/'+self.item.url,
                img:self.item.img,
                desc:self.item.desc,
                actived:false
            }
            $q.when()
                .then(function(){
                    return News.save(news).$promise;
                })
                .then(function(res){
                    $state.go('frame.news',{url:res.id});
                })
                .catch(function(err){
                    exception.catcher('создание новости')(err)
                })

        }
        function selectFilterTag(){
            $q.when()
                .then(function(){
                    return FilterTags.selectFilterTag();
                })
                .then(function(tag){
                    if(!self.item.tags){self.item.tags=[]}
                    //console.log(tag)
                    self.item.tags.push(tag)
                    saveField('tags');
                })
                .catch(function(err){
                    exception.catcher('выбор характеристики')(err)
                })
        }
        function selectBrandTag(){
            $q.when()
                .then(function(){
                    return BrandTags.selectBrandTag();
                })
                .then(function(tag){
                    //console.log(tag)
                    if(!self.item.brandTags){self.item.brandTags=[]}
                    self.item.brandTags.push(tag)
                    //console.log(tag)
                    saveField('brandTags');
                })
                .catch(function(err){
                    exception.catcher('выбор коллекции')(err)
                })
        }
        function selectBrand(){
            $q.when()
                .then(function(){
                    return Brand.select();
                })
                .then(function(tag){
                    if(!self.item.brands){self.item.brands=[]}
                    self.item.brands.push(tag)
                    //console.log(tag)
                    saveField('brands');

                })
                .catch(function(err){
                    exception.catcher('выбор коллекции')(err)
                })
        }
        function selectCategory(){
            $q.when()
                .then(function(){
                    return Category.selectWithSection();
                })
                .then(function(c){
                    //console.log(c)
                    if(!c){return}
                    if(!self.item.categories){self.item.categories=[]}
                    if(typeof c == 'object' && c.length){
                       c.forEach(function (cat) {
                           if(!self.item.categories.getOFA('_id',cat._id)){
                               self.item.categories.push(cat)
                           }
                       })
                    }else{
                        if(!self.item.categories.getOFA('_id',c._id)){
                            self.item.categories.push(c)
                        }
                    }
                    saveField('categories');
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('выбор категории')(err)
                    }
                })
        }

        function selectStuff(){
            $q.when()
                .then(function(){
                    return Stuff.selectItem({actived:true});
                })
                .then(function(stuff){
                    if(!self.item.stuffs){self.item.stuffs=[]}
                    self.item.stuffs.push(stuff)
                    saveField('stuffs');

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('выбор товара')(err)
                    }

                })
        }
        function selectConditionFilterTag(){
            $q.when()
                .then(function(){
                    return FilterTags.selectFilterTag();
                })
                .then(function(tag){
                    if(!self.item.conditionTags){self.item.conditionTags=[]}
                    self.item.conditionTags.push(tag)
                    saveField('conditionTags');
                })
                .catch(function(err){
                    exception.catcher('выбор характеристики')(err)
                })
        }
        function selectConditionBrandTag(){
            $q.when()
                .then(function(){
                    return BrandTags.selectBrandTag();
                })
                .then(function(tag){
                    if(!self.item.conditionBrandTags){self.item.conditionBrandTags=[]}
                    self.item.conditionBrandTags.push(tag)
                    saveField('conditionBrandTags');
                })
                .catch(function(err){
                    exception.catcher('выбор коллекции')(err)
                })
        }
        function selectConditionBrand(){
            $q.when()
                .then(function(){
                    return Brand.select();
                })
                .then(function(tag){
                    if(!self.item.conditionBrands){self.item.conditionBrands=[]}
                    self.item.conditionBrands.push(tag)
                    saveField('conditionBrands');
                })
                .catch(function(err){
                    exception.catcher('выбор коллекции')(err)
                })
        }
        function selectConditionCategory(){
            $q.when()
                .then(function(){
                    return Category.selectWithSection();
                })
                .then(function(c){
                    if(!c){return}
                    if(!self.item.conditionCategories){self.item.conditionCategories=[]}

                    if(typeof c == 'object' && c.length){
                        c.forEach(function (cat) {
                            if(!self.item.conditionCategories.getOFA('_id',cat._id)){
                                self.item.conditionCategories.push(cat)
                            }
                        })
                    }else{
                        if(!self.item.conditionCategories.getOFA('_id',c._id)){
                            self.item.conditionCategories.push(c)
                        }
                    }
                    saveField('conditionCategories');
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('выбор категории')(err)
                    }
                })
        }
        function selectConditionStuff(){
            $q.when()
                .then(function(){
                    return Stuff.selectItem();
                })
                .then(function(stuff){
                    if(!self.item.conditionStuffs){self.item.conditionStuffs=[]}
                    self.item.conditionStuffs.push(stuff)
                    saveField('conditionStuffs');

                })
                .catch(function(err){
                    exception.catcher('выбор товара')(err)
                })
        }
        function deleteBrandTag(i){
            self.item.brandTags.splice(i,1);
            saveField('brandTags');
        }
        function deleteBrand(i){
            self.item.brands.splice(i,1);
            saveField('brands');
        }
        function deleteCategory(i){
            self.item.categories.splice(i,1);
            saveField('categories');
        }
        function deleteFilterTag(i){
            self.item.tags.splice(i,1);
            saveField('tags');
        }
        function deleteStuff(i){
            self.item.stuffs.splice(i,1);
            saveField('stuffs');
        }
        function deleteConditionBrandTag(i){
            self.item.conditionBrandTags.splice(i,1);
            saveField('conditionBrandTags');
        }
        function deleteConditionBrand(i){
            self.item.conditionBrands.splice(i,1);
            saveField('conditionBrands');
        }
        function deleteConditionCategory(i){
            self.item.conditionCategories.splice(i,1);
            saveField('conditionCategories');
        }
        function deleteConditionFilterTag(i){
            self.item.conditionTags.splice(i,1);
            saveField('conditionTags');
        }
        function deleteConditionStuff(i){
            self.item.conditionStuffs.splice(i,1);
            saveField('conditionStuffs');
        }
        function onSelected(){
            setTimeout(function(){
                $(':focus').blur();
            },50)
        }
        function showConditionInput(val){
            for(var key in self.showCondition){
                if(key==val){
                    $timeout(function(){
                        self.showCondition[val]=true;
                    },530)
                }else{
                    self.showCondition[key]=false;
                }
            }
        }
        function dispalyCondition(){
            if(!self.item){return;}
            if((self.item.conditionTags&& self.item.conditionTags.length)
                || (self.item.conditionBrandTags && self.item.conditionBrandTags.length)
                ||  (self.item.conditionStuffs && self.item.conditionStuffs.length)
                ||  (self.item.conditionCategories && self.item.conditionCategories.length)){
                return true;
            }
        }

    }
    //=====================campaignItemTemplateDirective
    function campaignItemTemplateDirective(global){
        var s=(global.get('store').val.template.campaignTempl)?global.get('store').val.template.campaignTempl:'';
        return {
            scope: {},
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl:'views/template/partials/campaign/campaignDetail'+s+'.html',
            restrict:'E'
        }
    }
})()
