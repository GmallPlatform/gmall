//http://stackoverflow.com/questions/25069777/sharing-code-between-angularjs-and-nodejs
'use strict';
(function(){
    var order = function(){
        var self=this;
        this.cart={stuffs:[]};
        this.seller=null;
        this.cascade=[];
        this.opt={};
        this.campaign=[];
        this.coupon={};
        this.totalCount=0;
        this.sum=0;
        this.price;  // для работы с ценой
        this.priceSale;//
        this.retail; //
        this.discount=null;// для управления ценой из админки ордера
        this.currency;
        this.mainCurrency;
        this.currencyStore;
        this.messageForCampaign={};
        this.type;
        this.user;
        this.paySum;
        // псевдо приватные методы
        //http://stackoverflow.com/questions/436120/javascript-accessing-private-member-variables-from-prototype-defined-functions
        function _checkInCondition(__campaign,stuff){
            var stuffBrand=(stuff.brand && stuff.brand._id)?stuff.brand._id:stuff.brand
            var stuffCategory = (typeof stuff.category=='object' && stuff.category.length)?stuff.category[0]:stuff.category;
            if (__campaign.conditionStuffs && __campaign.conditionStuffs.length && __campaign.conditionStuffs.indexOf(stuff._id)>-1){
                return true
            }
            if (__campaign.conditionTags && __campaign.conditionTags.length && __campaign.conditionTags.some(function(tag){return stuff.tags.indexOf(tag)>-1})){
                return true;
            }
            if (__campaign.conditionBrandTags && __campaign.conditionBrandTags.length && __campaign.conditionBrandTags.indexOf(stuff.brandTag)>-1){
                return true
            }
            if (__campaign.conditionBrands && __campaign.conditionBrands.length && __campaign.conditionBrands.indexOf(stuffBrand)>-1){
                return true
            }
            if (__campaign.conditionCategories && __campaign.conditionCategories.length && __campaign.conditionCategories.indexOf(stuffCategory)>-1){
                return true
            }
        }
        this._cartCount=function(campaign,cam){
            var i=0;
            var self=this;
            //console.log(this.cart)
            this.cart.stuffs.forEach(function(item){
                //console.log(item.quantity);
                if (campaign){
                    //console.log('_isStuffInCampaign(item)-',_isStuffInCampaign(item))
                    if (campaign=='withoutcampaign'){
                        //console.log(item.campaignId)
                        if (!item.campaignId){
                            if(!cam){
                                i +=Number(item.quantity);
                            }else{
                                if(_checkInCondition(cam,item)){
                                    i +=Number(item.quantity);
                                }

                            }

                            //console.log('i-',i)
                        }
                    }else{
                        if (item.campaignId==campaign){
                            i +=Number(item.quantity);
                            //console.log('i-',i)
                        }
                    }
                }else{
                    if(item.quantity)
                        i +=Number(item.quantity);
                }
            })
            //console.log('cartcount ',i)
            return i;
        }
        this._checkDiscount=function(){
            var dis = this.discount;
            if (dis){
                if (!dis.value)dis.value=0;
                if(dis.type==1 || dis.type==3){
                    //Принудительная оптовая цена для всех позиций включая розницу и sale.
                    return self.price;
                } else if(dis.type==2 || dis.type==4 || dis.type==5){
                    //Принудительное изменение цены на оптовую всех позиций без изменения цены sale
                    if(self.priceSale){
                        return self.priceSale;
                    }else{
                        return self.price;
                    }
                }
            } else return;
        }
        this._getDiscountPrice=function(dis,s){
            if (dis){
                if (!dis.value)dis.value=0;
                if(dis.type==1){
                    //Принудительная оптовая цена для всех позиций включая розницу и sale.
                    return s.price;
                } else if(dis.type==2){
                    //Принудительное изменение цены на оптовую всех позиций без изменения цены sale
                    if(s.priceSale){
                        return s.priceSale;
                    }else{
                        return s.price;
                    }
                }if(dis.type==3){
                    //Принудительное изменение цены на оптовую, включая SALE, и применение ко всем позициям скидки, value значение скидки в %
                    return  Math.ceil10((s.price-(s.price/100)*dis.value),-5);
                } else if(dis.type==4){
                    //Принудительное изменение цены на оптовую, кроме цен SALE, и применение скидки на позиции кроме SAL
                    if(s.priceSale){
                        return s.priceSale
                    }else{
                        return Math.ceil10((s.price-(s.price/100)*dis.value),-5);
                    }
                }else if(dis.type==5){
                    //Принудительное изменение цены на оптовую, кроме цен SALE, и применение ко всем позициям скидки скидки
                    var cena;
                    if(s.priceSale){
                        cena=s.priceSale;
                    }else{
                        cena=s.price;
                    }
                    return Math.ceil10((cena-(cena/100)*dis.value),-5);
                }
            } else return;
        }
        this._checkDiscount2302=function(){
            var dis = this.discount;
            if (dis){
                if (!dis.value)dis.value=0;
                if(dis.type==1){
                    //Принудительная оптовая цена для всех позиций включая розницу и sale.
                    return self.price;
                } else if(dis.type==2){
                    //Принудительное изменение цены на оптовую всех позиций без изменения цены sale
                    if(self.priceSale){
                        return self.priceSale;
                    }else{
                        return self.price;
                    }
                }if(dis.type==3){
                    //Принудительное изменение цены на оптовую, включая SALE, и применение ко всем позициям скидки, value значение скидки в %
                    return  Math.ceil10((self.price-(self.price/100)*dis.value),-5);
                } else if(dis.type==4){
                    //Принудительное изменение цены на оптовую, кроме цен SALE, и применение скидки на позиции кроме SAL
                    if(self.priceSale){
                        return self.priceSale
                    }else{
                        return Math.ceil10((self.price-(self.price/100)*dis.value),-5);
                    }
                }else if(dis.type==5){
                    //Принудительное изменение цены на оптовую, кроме цен SALE, и применение ко всем позициям скидки скидки
                    var cena;
                    if(self.priceSale){
                        cena=self.priceSale;
                    }else{
                        cena=self.price;
                    }
                    return Math.ceil10((cena-(cena/100)*dis.value),-5);
                }
            } else return;
        }

        this._isStuffInCampaign=function(stuff,campaign){
            //console.log(stuff)
            var stuffCategory = (typeof stuff.category=='object' && stuff.category.length)?stuff.category[0]:stuff.category;
            var stuffBrand=(stuff.brand && stuff.brand._id)?stuff.brand._id:stuff.brand
            function check(__campaign){
                //console.log(stuffCategory,__campaign.categories)
                //console.log(__campaign,stuff.name)
                if (__campaign.stuffs && __campaign.stuffs.length && __campaign.stuffs.indexOf(stuff._id)>-1){
                    return true
                }
                if (__campaign.tags && __campaign.tags.length && stuff.tags && __campaign.tags.some(function(tag){return stuff.tags.indexOf(tag)>-1})){
                    return true;
                }
                if (__campaign.brandTags && __campaign.brandTags.length && __campaign.brandTags.indexOf(stuff.brandTag)>-1){
                    return true
                }
                if (__campaign.brands && __campaign.brands.length && __campaign.brands.indexOf(stuffBrand)>-1){
                    return true
                }
                if (__campaign.categories && __campaign.categories.length && __campaign.categories.indexOf(stuffCategory)>-1){
                    return true
                }
            }
            function setCampaignPrice(__campaign){
                //console.log(stuff.name,__campaign)
                stuff.sticker=__campaign.sticker;
                stuff.campaignUrl=__campaign.url;
                stuff.campaignId=__campaign._id;
                var i=0;
                for(var key in stuff.stock){
                    var price=Number(stuff.stock[key].price);
                    stuff.stock[key].priceCampaign=(__campaign.condition=='percent')?
                        Math.ceil10((price-(Number(__campaign.percent)/100)*price),-2):
                        Math.ceil10((price-Number(__campaign.sum)),-2);
                    if(!i){
                        i++;
                        stuff.priceCampaign=stuff.stock[key].priceCampaign

                    }
                    //console.log(price,stuff.stock[key].priceCampaign)
                }
                //console.log( stuff.campaignUrl)
            }
            if (!self.campaign ||  !self.campaign.length) return false;
            // если нет параметра campaign то для всех компаний

            if (!campaign) {
                for (var j=0,ll=self.campaign.length;j<ll;j++){
                    var is=check(self.campaign[j]);
                    //console.log(is,(is && !self.campaign[j].revers),(!is && self.campaign[j].revers))
                    if ((is && !self.campaign[j].revers)||(!is && self.campaign[j].revers)){
                        setCampaignPrice(self.campaign[j])
                        return self.campaign[j];
                        break;
                    }
                }
            } else {
                // в конкретную компанию входит или нет
                var __campaign=self.campaign.getObjectFromArray('_id',campaign);
                if(__campaign){
                    var is=check(__campaign);

                    if ((is && !__campaign.revers)||(!is && __campaign.revers)){
                        setCampaignPrice(__campaign)
                        return __campaign;
                    }
                }
            }
            return false;
        }
        this._getCountForBaseStuffs=function(campaign){
            var q=0;
            this.cart.stuffs.forEach(function(item){
                if (campaign.forGroupBase){
                    if (campaign.groupBaseTag && item.tags && item.tags.indexOf(campaign.groupBaseTag)>-1){
                        q+=Number(item.quantity);
                    }else if(campaign.groupBaseCollection && campaign.groupBaseCollection==stuff.brandTag){
                        q+=Number(item.quantity);
                    }
                }else{
                    if (campaign.baseStuffs.indexOf(item._id)>-1){
                        q+=Number(item.quantity);
                    }
                }

            })
            //console.log(q);
            return q;

        }
        this._checkCompaignCondition=function(id){
            if(!self.campaign) {return}
            var __campaign = self.campaign.getOFA('_id',id);
            //console.log(__campaign)
            if(__campaign && !__campaign.forAll && !__campaign.revers){
                // колмчество не акционных товаров
                var countConditionStuffs=self._cartCount('withoutcampaign',__campaign);
                //console.log(countConditionStuffs)
                if (__campaign.ratio){
                    var countStuff=self._cartCount(__campaign._id); // количество для конкретной компании
                    //console.log('countStuff',countStuff)
                    if(parseInt(countConditionStuffs/__campaign.ratio)>=countStuff){
                        /*console.log('countConditionStuffs ',countConditionStuffs);
                        console.log('__campaign.ratio ',__campaign.ratio)
                        console.log('parseInt(countConditionStuffs/__campaign.ratio) ',parseInt(countConditionStuffs/__campaign.ratio))
                        console.log('countStuff ',countStuff)*/
                        return true;
                    }
                }else{
                    // нет кратности применения
                    // просто если хватает товаров из условия
                    return true;
                }

                /*
                if (!__campaign.useBase){
                    countBaseStuff = self._cartCount('withoutcampaign');
                } else {
                    // baseStuffs количество в корзине
                    countBaseStuff=self._getCountForBaseStuffs(__campaign);
                }
                //console.log('countBaseStuff-',countBaseStuff)
                if (__campaign.ratio){
                    var countStuff=self._cartCount(id); // количество для конкретной компании
                    if(parseInt(countBaseStuff/__campaign.ratio)>=countStuff){
                        return true;
                    }
                }else{
                    // нет кратности применения
                    // просто если хватает товаров из условия
                    if (countBaseStuff>=__campaign.condition){
                        return true;
                    }
                }*/
            }else{
                // нет услоаий просто применям акционную цену
                return true;
            }
        }
        this._checkCompaignConditionForBase=function(id){
            var campaign = self.campaign.getObjectFromArray('_id',id);
            //console.log(campaign);
            //console.log("self._cartCount('withoutcampaign')-",self._cartCount('withoutcampaign'))
            //console.log("self._cartCount(campaign._id)-",self._cartCount(campaign._id))
            //console.log(campaign.condition && campaign.useBase && self._cartCount('withoutcampaign') && !self._cartCount(campaign._id))
            if(campaign.useBase && self._getCountForBaseStuffs(campaign)>=campaign.condition && !self._cartCount(campaign._id)){
                return true;
            }
        }
        this._getUnitOfMeasure=function(){
            var a = this.cart.stuffs.reduce(function(arr,i){
                if(i.unitOfMeasure && arr.indexOf(i.unitOfMeasure)<0){
                    arr.push(i.unitOfMeasure)
                }
                return arr;
            },[])
            //console.log(a)
            if(a.length==1){
                return a[0]
            }else{
                return null
            }
        }
    }
    var _getCascadePrice=function(self){
        var newPrice=self.price;
        var cascade=self.cascade;
        if (cascade && cascade.length) {
            for(var i=0,l=cascade.length;i<l;i++){
                if (self.totalCount>=cascade[i][0]){
                    newPrice=Math.ceil10((self.price-(self.price/100)*cascade[i][1]),-2);
                }
            }
            return newPrice;
        } else {
            return self.price;
        }
    }


    order.prototype.init=function(campaign,mainCurrency,currencyStore) {
        //console.log(campaign)
        this.campaign=campaign;
        this.mainCurrency=mainCurrency;
        this.currencyStore=currencyStore;
    }
    order.prototype.setCamapign=function(campaign) {
        this.campaign=campaign;
        for(var i=0,l=campaign.length;i<l;i++){
            this.messageForCampaign[campaign[i].url]={base:null,stuff:null};
        }
    }
    order.prototype.setCart=function(stuffs) {
        //console.log(stuffs)
        this.cart.stuffs = stuffs;
        this.sortCart();
    }

    order.prototype.setSellerData=function(seller,cascade,opt) {
        this.seller =seller;
        this.cascade=cascade;
        this.opt=opt;
    }
    order.prototype.setCoupon=function(coupon) {
        // console.log(coupon)
        this.coupon =coupon;
    }
    order.prototype.setDiscount=function(discount) {
        this.discount=discount;
    }
    order.prototype.setCurrency=function(currency) {
        this.currency=currency;
    }
    order.prototype.changeCurrency=function(currency){
        this.currency=currency;
        this.kurs=this.currencyStore[this.currency][0];
    }
    order.prototype.getPrice=function(i) {
        var stuff=this.cart.stuffs[i];
        this.totalCount=this._cartCount();
        this.price=stuff.price;
        this.priceSale=stuff.priceSale;
        this.retail=stuff.retail;
        this.priceCampaign=stuff.priceCampaign;
        stuff.maxDiscountOver=false;

        // вычисляем условие опта
        var optIs=false;

        if (!this.opt || !this.opt.quantity || this.totalCount>=this.opt.quantity){
            optIs=true;
        }

        // 1.проверка на ручное управление ценой
        var cena;
        if (cena=this._checkDiscount()){
            if(this.discount && this.discount.value && stuff.maxDiscount && this.discount.value >stuff.maxDiscount){
                stuff.maxDiscountOver=true;
            }else{
                checkMaxDiscount(stuff,cena)
            }

            return cena;
        }
        //console.log(stuff.priceCampaign)
        //2. товар в акции проверить на опт и на выполнение условий акции
        //console.log(this._checkCompaignCondition(stuff.campaignId))
        //console.log(stuff.priceCampaign,stuff.campaignId,optIs,this._checkCompaignCondition(stuff.campaignId))
        //console.log('this._checkCompaignCondition(stuff.campaignId) -',this._checkCompaignCondition(stuff.campaignId))
        if (stuff.priceCampaign && optIs && this._checkCompaignCondition(stuff.campaignId) ){
            return stuff.priceCampaign
        }
        // 3.проверка на опт
        if (!optIs){
            return this.retail || this.price;
        }
        //4.eсли опт и есть   цена или каскад скидок
        if (this.priceSale){
            checkMaxDiscount(stuff,this.priceSale)
            return this.priceSale;
        } else {
            return _getCascadePrice(this);
        }
        return stuff.price;
    };
    order.prototype.getTotalSum=function(discount){
        var sum=0;
        var self=this;
        this.cart.stuffs.forEach(function(c){
            //console.log(c)
            var s=(c.sum)?(c.sum):c.price;
            if(discount){
                var p = self._getDiscountPrice(self.discount,c)
                    if(p){
                        s= p*c.quantity;
                    }
            }
            sum+=s
        });
        if(discount){
            var dis = this.discount;
            if (dis){
                if(dis.type==6){
                    sum = Math.ceil10((sum-(sum/100)*dis.value),-5);
                }else if(dis.type==7){
                    sum=sum-dis.value;
                }
            }
        }
        //console.log(sum)
        //this.sum=sum;
        return sum;
    };
    order.prototype.getTotalQuantity=function(){
        var q=0;
        this.cart.stuffs.forEach(function(c){
            q+=Number(c.quantity);
        });
        return q;
    };
    order.prototype.getCampaignQuantity=function(){
        return this._cartCount('campaign');
    };
    order.prototype.getConditionForDisplayMsg=function(){
        return this.messageForCampaign

    };
    order.prototype.getCouponSum=function(){
        //console.log(this.coupon)
        if (this.coupon && Object.keys(this.coupon).length){
            if(!this.coupon.condition){
                return Math.ceil10((this.sum-(this.sum/100)*Number(this.coupon.val)),-5);
            }else if(this.coupon.condition){
                var val=this.coupon.val;
                //console.log(this.sum,val)
                if(this.coupon.currency && this.currencyStore[this.coupon.currency] && this.currencyStore[this.coupon.currency][0]){
                    val = Math.round(val/this.currencyStore[this.coupon.currency][0])
                }
                /*if(this.coupon.currency && this.coupon.currency!=this.currency && this.currencyStore && this.currencyStore[this.coupon.currency] && this.currencyStore[this.coupon.currency][0]){
                    console.log(this.currencyStore[this.coupon.currency][0])
                    val = Math.round(val/this.currencyStore[this.coupon.currency][0])
                }*/
                //console.log(this.sum-Number(val))
                return (this.sum-Number(val));
            }
        }else{
            //console.log(this.sum)
            return this.sum
        }
    };
    order.prototype.clearOrder=function(){
        this.cart.stuffs.length=0;
        //this.seller=null;
        //this.cascade=[];
        //this.opt={};
        //this.campaign=[];
        this.coupon={};
        this.totalCount=0;
        this.sum=0;
    }
    order.prototype.checkInCart=function(itemTo){
        //console.log(itemTo.name,this.cart.stuffs.some(function(c){return ((itemTo._id == c._id) && (itemTo.sort == c.sort))}))
        return this.cart.stuffs.some(function(c){return ((itemTo._id == c._id) && (itemTo.sort == c.sort))})
    }
    order.prototype.addStuffToOrder=function(itemTo){
        if (this.cart.stuffs.length>=150){return false}
        if (!this.cart.stuffs.some(function(c){return ((itemTo._id == c._id) && (itemTo.sort == c.sort))})){
            var itemToCart = angular.copy(itemTo);
            for(var key in itemToCart){
                if(typeof itemToCart[key]=='function'){
                    delete itemToCart[key]
                }
            }
            delete itemToCart.comments
            delete itemToCart.desc
            delete itemToCart.gallery
            delete itemToCart.imgs
            delete itemToCart.nameL
            delete itemToCart.checkInCart
            delete itemToCart.addItemToOrder
            delete itemToCart.addInfo
            delete itemToCart.getDataForBooking
            delete itemToCart.FullTags
            delete itemToCart.changeSortOfStuff
            delete itemToCart.checkInCart
            delete itemToCart.driveRetailPrice
            delete itemToCart.getBonus
            delete itemToCart.zoomImg
            delete itemToCart.stockKeysArray
            delete itemToCart.sortsOfStuff
            delete itemToCart.setPrice



            this.cart.stuffs.push(itemToCart);
            this.sortCart();
            /*this.cart.stuffs.sort(function(a,b){
                if(a.brand < b.brand) return -1;
                if(a.brand > b.brand) return 1;
                return 0;
            })*/
            return true;
        }else {
            return false;
        }

    }
    order.prototype.getShipCost=function(){
        var s=this.shipDetail.reduce(function(s,c){
            if (isNaN( c.sum)){
                return s;
            }else{
                return s+Number(c.sum)
            }
        },0)
        return s;
    }
    order.prototype.getTotalPay=function(){
        if(!this.pay){this.pay=[]}
        var s=this.pay.reduce(function(s,c){
            if (isNaN( c.sum)){
                return s;
            }else{
                return s+Number(c.sum)
            }
        },0)
        return s;
    }
    order.prototype.getTotalDiscount=function(){
        if(this.sum && this.sum0){
            if (this.sum>this.sum0){return 0}else{
                return (100-Math.round(this.sum*100/this.sum0))
            }
        }


        /*this.priceSum = this.cart.stuffs.reduce(function(s,c){
            s+=c.quantity* c.price;
            return s;
        },0)
        var sumT =this.getCouponSum()
        //console.log(sum,sumT,100-Math.round(sumT*100/sum))
        if (sumT>this.priceSum){return 0}else{
            return (100-Math.round(sumT*100/this.priceSum))
        }*/
    }
    order.prototype.checkCampaign=function(stuff){
        return this._isStuffInCampaign(stuff);
    }
    order.prototype.sortCart=function(){
        this.cart.stuffs.sort(function(a,b){
            if(!a.extCatalog && !b.extCatalog){
                if(a.category < b.category) return -1;
                if(a.category > b.category) return 1;
                return 0
            }else if(a.extCatalog && !b.extCatalog){
                return 1
            }else if(!a.extCatalog && b.extCatalog){
                return -1
            }else if(a.extCatalog && b.extCatalog && a.extCatalog != b.extCatalog){
                if(a.category < b.category) return -1;
                if(a.category > b.category) return 1;
            }else if (a.extCatalog && b.extCatalog && a.extCatalog == b.extCatalog){
                if(a.category < b.category) return -1;
                if(a.category > b.category) return 1;
                return 0
            }
        })
    }
    function checkMaxDiscount(stuff,price){
        if(stuff.maxDiscount){
            if((1-price/stuff.price)*100>stuff.maxDiscount){
                stuff.maxDiscountOver=true;
            }
        }
        //console.log('stuff.maxDiscountOver - ',stuff.maxDiscountOver)
    }


    function getOrder(){
        return new order();
    }


    var myShareData = {getOrder:getOrder};


    if(typeof window !== 'undefined'){
        window.myShareData = myShareData;
        window.OrderModel=order;
    } else {
        module.exports = myShareData;
    }

})()


