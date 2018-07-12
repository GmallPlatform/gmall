'use strict';
angular.module('gmall.services')
.factory('Stuff', function ($resource,$state,global,$stateParams,$order,$q) {
    var Items=$resource('/api/collections/Stuff/:id',{id:'@_id'});
    //console.log($resource.updateField)
    var _items = [];
    var _query ='';
    var _page=0,_rows=0;
    var _unableCart = function(){
        if (!this.addCriterion || !this.addCriterion.length){
            if (this.available && this.available['notable']
                && this.available['notable'].quantity  && this.available['notable'].quantity!='0'){
                return true;
            }
        } else if (this.addCriterion.length==1){
           // console.log(this.available)
            if (this.available && this.available[this.addCriterionToCart[0]]&&
                this.available[this.addCriterionToCart[0]].quantity &&
                this.available[this.addCriterionToCart[0]].quantity!='0'){
                return true;
            }
        } else {
            if (this.available && this.available[this.addCriterionToCart[0]]&&
                this.available[this.addCriterionToCart[0]][this.addCriterionToCart[1]]&&
                this.available[this.addCriterionToCart[0]][this.addCriterionToCart[1]].quantity &&
                this.available[this.addCriterionToCart[0]][this.addCriterionToCart[1]].quantity!='0'){
                return true;
            }
        }
    }
    var _getParentGroupUrl = function(id){
        var group = global.get('groups').val.getObjectFromArray('_id',id);
        while(group.level && group.level!='0'){
            group = global.get('groups').val.getObjectFromArray('_id',group.parent);
        }
        return group || {url:'group',name:'Group'};
    }
    var _getDataForCart = function(){
        //console.log(this);
        var _data={};
        _data['filterTags']=global.get('filterTags');
        _data['brands']=global.get('brands');
        _data['categories']=global.get('categories');
        var inCart={}
        inCart.quantity=(this.quantity)?this.quantity:1;
        inCart.addCriterionName=[];
        if(this.addCriterionToCart && this.addCriterionToCart.length){
            //console.log(this.addCriterionToCart)
            this.addCriterionToCart.forEach(function(el){
                var t = _data['filterTags'].val.getObjectFromArray('_id',el);
                if (t && t.name){
                    inCart.addCriterionName.push(t.name)
                }
            })
            var res =inCart.addCriterionName.reduce(function(res, current) {
                if (res){res+=', '}
                return res + current;
            }, '');
            inCart.addCriterionName=res;
        }
        inCart.addCriterionToCart=(this.addCriterionToCart)?this.addCriterionToCart:null;
        //console.log(this);
        if (this.single){inCart.single=true;}
        inCart.unitOfMeasure= (this.unitOfMeasure)?this.unitOfMeasure:'шт';
        inCart.stuff=this._id;
        inCart._id=this._id;
        inCart.seller=this.seller;
        inCart.stuffUrl=this.url;
        //console.log(this.gallery)
        inCart.img=(this.gallery && this.gallery.length && this.gallery[0].thumbSmall)?this.gallery[0].thumbSmall:'';
        inCart.price=this.price;
        inCart.retail=this.retail;
        inCart.priceSale=this.priceSale;
        inCart.category=this.category||"category";
        var o=_data['categories'].val.getObjectFromArray('_id',this.category);
        if(o){
            inCart.categoryUrl=o.url;
            inCart.categoryName=o.name;
            var idgroup = (o.group._id)?o.group._id:o.group;
            var gn=_getParentGroupUrl(idgroup);
            inCart.groupUrl=gn.url;
            inCart.groupName=gn.name;
        } else {
            inCart.categoryUrl='id';
            inCart.categoryName='category';
            inCart.groupUrl="group"
        }
        inCart.tags=this.tags;
        inCart.name=this.name
        inCart.artikul =(this.artikul)?this.artikul:'';
        inCart.currency=(this.currency)?this.currency:'UAH';
        //console.log(this.sticker)
        inCart.sticker=this.sticker;
        /*if (this.sticker==='undefined'){
            inCart.sticker=_getSticker(this);
        } else {
            inCart.sticker=this.sticker;
        }*/
        //console.log(inCart);
        return inCart;
    }
    var _addInCart = function(){
        if (this.addCriterion && this.addCriterion.length){
            if (!this.addCriterionToCart || !this.addCriterionToCart[0]){
                return alert('Выберите параметры!')
            }
            if(this.addCriterion.length==2 && !this.addCriterionToCart[1]){
                return alert('Выберите параметры!')
            }
        }
        var inCart = _getDataForCart.call(this);
        //console.log(inCart)
        $order.addItemToCart(inCart)
        //CartLocal.addToCart(inCart)
    }


    function _getList(query,search,page,rows,items){
        return $q.when()
            .then(function(){
                // для заполниния дополнительных параметров
                var q= $q.defer();
                if(global.get('filterTags')){
                    q.resolve(global.get('filterTags').val)
                }else{
                    /*$resource('/api/collections/FilterTags').query(function(res){
                        res.shift();
                        q.resolve(res);
                    });*/
                    q.resolve([])
                }
                return q.promise;
            })
            .then(function(filterTags){
                var q = $q.defer();
                Items.query({perPage:rows ,page:page,query:query,search:search},function(res){
                    if (page==0 && res.length>0 && !res[0]._id){
                        var totalitems = res.shift().index;
                    }
                    if(res.length==0){
                        totalitems=0;
                    }

                    var arr=[];
                    var orderModel = new OrderModel();
                    //console.log(orderModel._isStuffInCampaign);
                    if(global.get('campaign' )){
                        orderModel.campaign=global.get('campaign' ).val;
                    }


                    res.forEach(function(el,i){
                        el.unableCart= _unableCart;
                        el.addInCart=_addInCart;
                        el.getUrlParams=_getUrlParams;
                        /*el.getCategoryName=_getCategoryName;
                        el.getBrandName=_getBrandName;*/
                        if(el.gallery && el.gallery.length){
                            el.gallery.sort(function(a,b){return a.index- b.index})
                        }
                        if(el.addCriterion && el.addCriterion.length){
                            el.addCriterionToCart=[];
                            el.addCriterion.forEach(function(ac,index){
                                ac.tags=filterTags.getObjectFromArray('filter',ac.filter,true);
                                if (ac.tags[0]){
                                    el.addCriterionToCart[index]=ac.tags[0]._id;
                                }
                            })
                        }
                        if (items=='fullListForAddToCart'){
                            if (el.addCriterion && el.addCriterion.length){
                                el.addCriterion[0].tags.forEach(function(tag){
                                    el.addCriterionToCart[0]=tag._id;
                                    if (el.addCriterion[1] && el.addCriterion[1].tags){
                                        el.addCriterion[1].tags.forEach(function(tag1){
                                            el.addCriterionToCart[1]=tag1._id;
                                            if(_unableCart.call(el)){
                                                var inCart = _getDataForCart.call(el);
                                                arr.push(inCart)
                                            }
                                        })
                                    }else{
                                        if(_unableCart.call(el)){
                                            var inCart = _getDataForCart.call(el);
                                            arr.push(inCart)
                                        }
                                    }
                                })
                            }else{
                                // доступно ли для заказа
                                if(_unableCart.call(el)){
                                    var inCart = _getDataForCart.call(el);
                                    arr.push(inCart)
                                }
                            }
                        }else{
                            //console.log(orderModel._isStuffInCampaign.call(null,el));
                            var campaign= orderModel._isStuffInCampaign.call(null,el);
                            if(campaign){
                                //console.log(campaign)
                                el.priceCampaign=
                                    Math.round(Number(el.price)-((Number(el.price)/100)*Number(campaign.discount)))
                                el.campaignUrl=campaign.url;
                            }else{
                                if (global.getSticker){
                                    el.sticker=global.getSticker(el,true);
                                }
                            }
                        }
                    })
                    if (items=='fullListForAddToCart'){
                        res=arr;
                        //return arr;
                    }else{
                        items.totalItems=totalitems;
                        //return res
                    }
                    //console.log(res)
                    q.resolve(res)

                },function(err){
                    q.resolve(err)
                });
                return q.promise;
            } )
            .then(function(res){
                return res;
            })
    }
    var _getItem = function(id,cb){
        $q.when()
            .then(function(){
                var q= $q.defer();
                if(global.get('filters')){
                    q.resolve(global.get('filters').val)
                }else{
                    q.resolve([])
                }
                return q.promise;
            })
            .then(function(filters){
                var q= $q.defer();
                if(global.get('filterTags') && global.get('filterTags').val){
                    //onsole.log("global.get('filterTags').val ",global.get('filterTags').val)
                    q.resolve([filters,global.get('filterTags').val])
                }else{
                    q.resolve([filters,[]])
                }
                return q.promise;
            })
            .then(function(filtr){
                var filters=filtr[0];
                var filterTags=filtr[1];
                //console.log(filters,filterTags)
                Items.get({id:id},function(res){
                    res.unableCart= _unableCart;
                    res.addInCart=_addInCart;
                    res.getUrlParams=_getUrlParams;
                    if(res.gallery && res.gallery.length){
                        res.gallery.sort(function(a,b){return a.index- b.index})
                    }
                    var _sp=global.getSticker(res,true);
                    //console.log(_sp)
                    // установка данных для отображения стикера
                    // если стикер для акции то отображать акционную цену
                    if (_sp && _sp.sticker){
                        res.sticker=_sp.sticker;
                        res.priceCampaign=_sp.priceCampaign;
                        res.campaignUrl=_sp.campaignUrl;
                    } else {
                        res.sticker = _sp;
                    }


                    /*// заполнение дополнительных параметор для selectov c дополнительными критериями
                    res.addCriterionToCart=[];
                    if(res.addCriterion && res.addCriterion.length){
                        res.addCriterion.forEach(function(ac,index){
                            // название параметра перед селектом
                            var filter= filters.getObjectFromArray('_id',ac.filter);
                            ac.filterName = (filter)?filter.name:'';
                            ac.tags=filterTags.getObjectFromArray('filter',ac.filter,true);
                            // установка параметров
                            if (index==0 && $stateParams.param1 && ac.tags.some && ac.tags.some(function(t){return $stateParams.param1== t._id})){
                                res.addCriterionToCart[index]=$stateParams.param1;
                            } else if(index==1 && $stateParams.param2 && ac.tags.some && ac.tags.some(function(t){return $stateParams.param2== t._id})){
                                res.addCriterionToCart[index]=$stateParams.param2;
                            } else if (ac.tags[0]){
                                res.addCriterionToCart[index]=ac.tags[0]._id;
                            }
                        })
                    }*/
                    res.quantity=1;
                    cb(res)
                },function(err){
                    $state.go('404');
                })
            })


    }

    //******************************************* для формирования url
    /*function getCategory(categories,id){
        for(var i=0,l=categories.length;i<l;i++){
            if(categories[i]._id==id){
                return categories[i];
                break;
            }
        }
    }
    function lookOverSubsection(section,id){
        var category;
        if(section.categories && section.categories.length){
            category= getCategory(section.categories,id);
            if(category){return category}
        }
        if(section.child && section.child.length){
            for(var i=0,l=section.child.length;i<l;i++){
                category=lookOverSubsection(section.child[i],id);
                if (category){
                    return category;
                }
            }
        }
    }
    var getCategoryNameUrl = function(id){
        var category;
        if(sections && sections.length){
            for(var i=0,l=sections.length;i<l;i++){
                category = lookOverSubsection(sections[i],id);
                if(category){
                    var o={
                        groupUrl:category.section.url,
                        categoryUrl:category.url
                    };
                    return o;
                }
            }
        }
        var o={
            groupUrl:'group',
            categoryUrl:'category'
        };
        return o;
        //console.log(id)
        if (!id || id=='category') return {name:'category',url:'id'};
        for (var i= 0,l=global.get('categories').val.length;i<l;i++){
            if (global.get('categories').val[i]._id==id){
                return {name:s,url:global.get('categories').val[i].url,groupUrl:global.get('categories').val[i].group.url} ;
                break;
            }
        }
    }*/
    var _getUrlParams = function(create){
        if (create && create=='new'){
            var obj = {
                groupUrl:$stateParams.groupUrl,
                categoryUrl:$stateParams.categoryUrl,
                stuffUrl:'new'
            }
            return obj;
        }
        //return;
        var stuff=this;
        if (!stuff) return;
        //var category = (stuff.category && stuff.category._id)?stuff.category._id:stuff.category;
        //var brand = (stuff.brand && stuff.brand._id)?stuff.brand._id:stuff.brand;
        //var categoryNameUrl=getCategoryNameUrl(category);
        var url = (stuff.url)?stuff.url:stuff.stuffUrl;
        var obj = {
            groupUrl:$stateParams.groupUrl,
            categoryUrl:$stateParams.categoryUrl,
            stuffUrl:url
        }
        if (stuff.addCriterionToCart && stuff.addCriterionToCart.length){
            obj.param1=stuff.addCriterionToCart[0];
            if(stuff.addCriterionToCart.length==2){
                obj.param2=stuff.addCriterionToCart[1];
            }
        }
        //console.log(obj)
        return obj;
    }
    var _saveField=function(stuff,field,cb){
        var f=field.split(' ');
        var o={_id:stuff._id}
        f.forEach(function(el){o[el]=stuff[el]})
        Items.save({update:field},o,function(res){
            if(cb && typeof cb =='function'){
                cb(null)
            }
        },function(err){
            if(cb && typeof cb =='function'){
                cb(err)
            }
        })
    }
    var _saveFieldPromise=function(stuff,field){
        var f=field.split(' ');
        var o={_id:stuff._id}
        f.forEach(function(el){o[el]=stuff[el]})
        return Items.save({update:field},o ).$promise
    }

    return {
        getList: _getList,
        getItem:_getItem,
        getUrlParams:_getUrlParams,
        Items:Items,
        saveField:_saveField,
        saveFieldPromise:_saveFieldPromise
        //getUrlParams:getUrlParams,
        /*getCategoryName:getCategoryName,
        getBrandName:getBrandName*/
    }
})
.service('queryFromUrlService',function($q,Sections,$stateParams,$location,Brands,FilterTags){
    this.get=function(){
        var self={prop:{query:{}}};
        $stateParams.searchStr&&(function(){
            var search=$stateParams.searchStr.substring(0,10);
            //var search= new RegExp($stateParams.searchStr.substring(0,10),'i');
            console.log(search)
            self.prop.query.$or=[{name:search},{artikul:search}]
            console.log(self.prop.query)
        })()
        //(self.prop.query.search=$stateParams.searchStr.substring(0,10))
        function _setBrand(brandId,filed){
            if(brandId && self.prop.brands){
                self.prop.brand =  self.prop.brands.getOFA(filed,brandId);
                if (self.prop.brand){
                    self.prop.query.brand=self.prop.brand._id;
                    $location.search('brand',self.prop.brand.url);
                    // установка коллекций
                    self.prop.brandCollections=self.prop.brand.tags;
                } else {
                    self.prop.brandCollections=[];
                    $location.search('brand',null);
                }
            }else{
                self.prop.brandCollections=[];
                $location.search('brand',null);
            }

        }
        function _setBrandTag(brandTagId,filed){
            // если установлена коллекция
            if (brandTagId && self.prop.brandCollections){
                // если есть tag коллекции в стороке запроса то устанавливаем его в филоьтрах
                var brandTag=self.prop.brandCollections.getObjectFromArray(filed,brandTagId);
                if(brandTag){
                    self.prop.query.brandTag=brandTag._id;
                    $location.search('brandTag',brandTag.url);
                } else {
                    $location.search('brandTag',null);
                }
            } else {
                $location.search('brandTag',null);
            }
        }
        function _setFilterTagsUrl(){
            if (self.prop.filterTags && self.prop.filterTags.length){
                self.prop.query.tags={};
                var queryTag = self.prop.filterTags.map(function(tag){
                    if(!self.prop.query.tags[tag.filter]){self.prop.query.tags[tag.filter]=[]}
                    self.prop.query.tags[tag.filter].push(tag._id);
                    return tag.url} ).join('+');
                $location.search('queryTag', queryTag);

            }else{
                $location.search('queryTag', null);
            }
        }

        return $q(function(resolve,reject){
            $q.when()
                .then(function(){
                    return Sections.getSections()
                }) // полчение списка разделов
                .then(function(sections){
                    if(!sections)return;
                    //console.log(sections)
                    //**************************************** Г Р У П П А   ********************************************
                    if ($stateParams.groupUrl!='brand' && $stateParams.groupUrl!='group'){
                        // получение раздела
                        if($stateParams.parentGroup){
                            self.parentSection=Sections.getParentSection($stateParams.parentGroup);
                        }else{
                            self.parentSection=Sections.getParentSection($stateParams.groupUrl);
                        }
                        // получение списка категорий
                        //self.prop.sectionCategories -- для получения списка категорий в запросе
                        //**************************************** К А Т Е Г О Р И Я  ********************************************
                        // получение выбранной категории
                        // основной шаг. от него отталкиваемся. есть категория в запросе или нет
                        // для получения брендов и фильтров
                        // если есть
                        if($stateParams.categoryList=='allCategories' || $stateParams.categoryUrl!='category'){
                            self.prop.categories=self.parentSection.categories;
                            self.prop.sectionCategories=self.prop.categories.map(function(el){return el._id})
                            if($stateParams.categoryUrl!='category' && self.parentSection && self.parentSection.categories){
                                var category= self.parentSection.categories.getOFA('url',$stateParams.categoryUrl)
                                if(category){
                                    self.prop.query.category=category._id;
                                }
                            }
                        }else{
                            //console.log(self.parentSection)
                            self.prop.sectionCategories=Sections.getEmbededCategories(self.parentSection,[])
                                .map(function(el){return el._id})
                            //console.log(self.prop.sectionCategories)
                            // у раздела нет вложенных категорий соответственно нет товаров
                            if(!self.prop.sectionCategories.length){
                                self.prop.sectionCategories=[null];
                            }
                        }
                    }
                })// категория
                .then(function(){
                    if($stateParams.brand && !self.prop.brands){
                        return Brands.getBrands()
                    }else{
                        return null;
                    }
                })
                .then(function(brands){
                    self.prop.brands=brands;
                    //****************************************Б Р Е Н Д   ********************************************
                    //**************************************** К О Л Л Е К Ц И И  ********************************************
                    _setBrand($stateParams.brand,'url')
                    _setBrandTag($stateParams.brandTag,'url');
                })// end brand && collections
                .then(function(){
                    //**************************************** Т Е Г И  ********************************************
                    // получение тегов если они есть в параметрах в массив
                    //для дальнейщей установки в визуальных фильтрах
                    return $q(function(resolve,reject){
                        if($stateParams.queryTag){
                            // анализ url на наличие тегов*************
                            var queryTags=$stateParams.queryTag.split('+');
                            // удаляем возможные дубли
                            queryTags= queryTags.filter(function(item, pos) {
                                return queryTags.indexOf(item) == pos;
                            })
                            FilterTags.getTagsByUrl(queryTags,function(res){
                                self.prop.filterTags=res;
                                resolve()
                            })
                        }else{
                            resolve()
                        }
                    });

                }) // end tags
                .then(function(){
                    _setFilterTagsUrl()
                    if(!self.prop.query['category'] && self.prop.sectionCategories && self.prop.sectionCategories.length){
                        self.prop.query['category']={$in:self.prop.sectionCategories}
                    }

                    resolve(self.prop.query)
                    //console.log(self.prop.query)
                })// установка урл тегов

                .catch(function(err){
                    reject(err)
                })
        })
    }
})

.factory('$section',['global',function(global) {
    var _sections = global.get('groups').val;
    var _groupUrl;
    function _getCategories(group){
        for(var i=0,l=group.length;i<l;i++){
            if (group[i].url==_groupUrl){
                return group[i].categories;
            } else {
                if (group[i].child && group[i].child.length){
                    var _arr = _getCategories(group[i].child);
                    if (_arr) return _arr;
                }
            }
        }
        return;
        // todo возврацать пустой массив
    }
    return {
        getCategories:function(url){
            _groupUrl=url;
            return _getCategories(_sections);
        }
    }
}])

.factory('CouponServ',['global','$state', function (global,$state) {
    // выбор купона
    var getCoupon = function(coupon){

        if(!global.get('user').val){
            $state.go('couponDetail',{id:coupon._id})
        } else {
            // запись купона в данные пользователя
            if (global.get('user').val.coupon.indexOf(coupon._id)<0 && global.get('user').val.coupons.indexOf(coupon._id)<0){
                global.get('user').val.coupon.push(coupon._id);
                User.updateCoupon({_id:global.get('user').val._id,coupon:global.get('user').val.coupon},function(res){
                    toaster.pop({
                        type: 'note',
                        title: 'Можно использовать в корзине',
                        body: coupon.name,
                        showCloseButton: true,
                        delay:15000,
                        closeHtml: '<button>Close</button>'
                    });
                    if ($rootScope.prevState=='stuff.stuffDetail'){
                        $state.go($rootScope.prevState,$rootScope.prevStateParam)
                    } else {
                        // переход на PAP
                    }
                },function(res){
                    toaster.pop({
                        type: 'error',
                        title: 'Не удается добавить',
                        body: coupon.name,
                        showCloseButton: true,
                        delay:15000,
                        closeHtml: '<button>Close</button>'
                    });
                });
            } else {
                toaster.pop({
                    type: 'error',
                    title: 'Купон уже добавлен или использовн!',
                    body: coupon.name,
                    showCloseButton: true,
                    delay:15000,
                    closeHtml: '<button>Close</button>'
                });
            }



            //console.log($rootScope.prevState,$rootScope.prevStateParam)
        }

    }
    return {
        getCoupon:getCoupon
    }
}])

