'use strict';
(function(){

    angular.module('gmall.services')
        .service('Stuff', stuffService)
        .service('Comments', commentService);
    stuffService.$inject=['$resource','$uibModal','$q','Sections','$stateParams','$state','$location','Brands','FilterTags','global','$order','exception','$user','$email','CreateContent','$rootScope','Filters','$timeout'];
    function stuffService($resource,$uibModal,$q,Sections,$stateParams,$state,$location,Brands,FilterTags,global,$order,exception,$user,$email,CreateContent,$rootScope,Filters,$timeout){
        var Items= $resource('/api/collections/Stuff/:_id',{_id:'@_id'});
        var categoriesLink={},
            queryData={};
        var stuffsService=[]

        $rootScope.$on('$stateChangeStart', function(event, to, toParams, fromState, fromParams){
            if(to.name=='stuffs'||to.name=='stuffs.stuff' || to.name=='frame.stuffs'||to.name=='frame.stuffs.stuff'){
                $q.when()
                    .then(function () {
                        //console.log(toParams)
                        return getQuery(toParams,to)
                    })
                    .then(function (query) {
                        queryData=query;
                        //console.log(queryData)
                    })
            }
        })

        return {
            Items:Items,
            query:Items.query,
            get:Items.get,
            getList:getList,
            search:search,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            create:create,
            //setQuery:setQuery,
            getQuery:getQuery,
            getQueryFromUrl:getQueryFromUrl,
            setFilters:setFilters,
            cloneStuff:cloneStuff,
            saveField:saveField,
            selectItem:selectItem,
            select:selectItem,
            selectItemWithSort:selectItemWithSort,
            getServicesForOnlineEntry:getServicesForOnlineEntry,
            getAllBonus:getAllBonus,
            zoomImg:zoomImgGlobal,
            setDataForStuff:_setDataForStuff,
            getDataForBooking:_getDataForBooking,
        }

        function _salePrice(doc,sale){
            //console.log(doc.stack)
            if(doc.driveSalePrice && doc.driveSalePrice.maxDiscount){
                doc.maxDiscount=doc.driveSalePrice.maxDiscount;
            }
            if(!doc.driveSalePrice || doc.driveSalePrice.type==0){
                doc.priceSale= 0
                for(var key in doc.stock){
                    doc.stock[key].priceSale= 0;
                }
            } else if(doc.driveSalePrice.type==2){
                doc.priceSale=Math.ceil10(Number(doc.price)-sale*doc.price,-2);
                for(var key in doc.stock){
                    doc.stock[key].priceSale= Math.ceil10(Number(doc.stock[key].price)-sale*doc.stock[key].price,-2);
                }
            }else if(doc.driveSalePrice.type==1){
                if(doc.driveSalePrice.condition){
                    sale=doc.driveSalePrice.percent/100;
                    doc.priceSale=Math.ceil10(Number(doc.price)-sale*doc.price,-2);
                    for(var key in doc.stock){
                        doc.stock[key].priceSale= Math.ceil10(Number(doc.stock[key].price)-sale*doc.stock[key].price,-2);
                    }
                }else{
                    sale=Number(doc.driveSalePrice.sum);
                    doc.priceSale=Math.ceil10(Number(doc.price)-sale,-2);
                    for(var key in doc.stock){
                        doc.stock[key].priceSale= Math.ceil10(Number(doc.stock[key].price)-sale,-2);
                    }
                }
            }
        }
        
        function _getPrice() {
            
        }
        
        function _retailPrice(doc,retail){
            if(!doc.driveRetailPrice){
                if(global.get('store').val.seller.retail){
                    doc.driveRetailPrice={type:2}
                }else{
                    doc.driveRetailPrice={type:0}
                }

            }
            //console.log(doc.driveRetailPrice,!doc.driveRetailPrice || !doc.driveRetailPrice.type==0)
            if(doc.driveRetailPrice.type==0){
                doc.retail= 0
                for(var key in doc.stock){
                    doc.stock[key].retail= 0;
                }
            } else if(doc.driveRetailPrice.type==2){
                doc.retail= Math.ceil10(Number(doc.price)+retail*Number(doc.price),-2);
                for(var key in doc.stock){
                    doc.stock[key].retail= Math.ceil10(Number(doc.stock[key].price)+retail*doc.stock[key].price,-2);
                }
            }else if(doc.driveRetailPrice.type==1){
                if(doc.driveRetailPrice.condition){
                    retail=doc.driveRetailPrice.percent/100;
                    doc.retail= Math.ceil10(Number(doc.price)+retail*doc.price,-2);
                    for(var key in doc.stock){
                        doc.stock[key].retail= Math.ceil10(Number(doc.stock[key].price)+retail*doc.stock[key].price,-2);
                    }
                }else{
                    retail=Number(doc.driveRetailPrice.sum);
                    doc.retail= Math.ceil10(Number(doc.price)+retail,-2);
                    for(var key in doc.stock){
                        doc.stock[key].retail= Math.ceil10(Number(doc.stock[key].price)+retail,-2);
                    }
                }
            }
            //console.log(doc.stock)
            
        }
        function _setPrice(doc){
            if(!doc){
                doc=this;
            }
            if(doc.price<0){doc.price=0}
            //doc.price=Math.round10(doc.price, -2);
            //console.log(doc.stock)
            //return;
            doc.sort=null;
            var sale = (global.get('store').val.seller.sale||0)/100;
            var retail=(global.get('store').val.seller.retail||0)/100;
            var el = (doc)?doc:this;
            if (!el.stock || typeof el.stock!='object'){
                el.stock={notag:{quantity:1,price:el.price}}
                el.sort='notag'
            }else if(el.stock['notag']){
                el.stock['notag'].price=el.price;

            }
            if(global.get('currency') && el.currency && global.get('store').val.mainCurrency != el.currency){
                el.price=Math.ceil10(Number(el.price)/Number(global.get('store').val.currency[el.currency][0]),-2)
                for(var tag in el.stock){
                    el.stock[tag].price=Math.ceil10(Number(el.stock[tag].price)/Number(global.get('store').val.currency[el.currency][0]),-2)
                }
            }
           // console.log(el.driveRetailPrice)
            //console.log(el.price)
            _salePrice(el,sale);
            _retailPrice(el,retail);
            //console.log(el.stock)
            //global.get('store').val.seller.retail&&_retailPrice(el,retail);

            return el;
        }

        function _changeSortOfStuff(sort){
            /*console.log(this.stock && sort && this.stock[sort] && !this.stock[sort].quantity)
            console.log(this.stock,sort,this.stock[sort],this.stock[sort].quantity)*/
            if(this.stock && sort && this.stock[sort] && !this.stock[sort].quantity){
                return;
            }
            /*console.log(sort)
            console.log(this.name,sort);*/
            //console.log(sort)
            if(sort){
                this.sort=sort;
            }
            if(this.sort){
                var sort=this.stock[this.sort];
                this.sortName=sort.name;
                this.price=sort.price;
                this.priceSale=sort.priceSale;
                this.retail=sort.retail;
                this.priceCampaign=sort.priceCampaign;
            } else{
                this.sortName=null;
                if(!this.stock || !this.stock.notag){
                    this.price=0;
                    this.priceSale=0;
                    this.retail=0;
                }
            }
            //_onSelectedSort()
        }
        function _addItemToOrder(){
            var self=this;
            if(!this.sort){
                this.unableToOrder=true;
                //console.log(this.name,this.unableToOrder)
                $timeout(function () {
                    self.unableToOrder=false;
                },2500)
                return 'nosort';
            }
            //console.log(this.sort,this.name)
            if(this.sortsOfStuff && this.sortsOfStuff.filter && !this.sort){
                exception.catcher('ошибка')('выберите разновидность')
            }else {
                if(this.stock[this.sort].name){
                    this.sortName=this.stock[this.sort].name;
                }
                $order.addItemToCart(this)
            }
            $rootScope.$emit('AddToCart')

        }
        function _dateTime(){
            var self=this;
            if(!this.sort){
                this.unableToOrder=true;
                //console.log(this.name,this.unableToOrder)
                $timeout(function () {
                    self.unableToOrder=false;
                },2500)
                return 'nosort';
            }
            global.get('functions').val.witget('dateTime',{stuff:this})
        }
        function _setSticker(stuff){
            //console.log(stuff.tags)
            return FilterTags.getSticker(stuff.tags);
            //console.log(stuff.name+' '+stuff.artikul,stuff.sticker)
        }
        function _checkInCart(){
            //console.log($order.checkInCart(this))
            return $order.checkInCart(this)
            //return true;
        }
        var delay
        function zoomImgGlobal(i,images,home) {
            //console.log(images[i])
            var imgs = $("img[src$='"+images[i].img+"']"),img,horizontalOrient;
            //console.log(imgs)
            if(imgs && imgs[0]){
                img=$(imgs[0]);
                if(img.width() && img.height() && img.width() > img.height()){
                    horizontalOrient=true;
                }
            }else{
                imgs = $("img[src$='"+images[i].thumb+"']")
                //console.log(imgs)
                if(imgs && imgs[0]){
                    img=$(imgs[0]);
                    if(img.width() && img.height() && img.width() > img.height()){
                        horizontalOrient=true;
                    }
                }else{
                    if(images[i].el){
                        if(images[i].el.width && images[i].el.height && images[i].el.width > images[i].el.height){
                            horizontalOrient=true;
                        }
                        //console.log(images[i].el)
                    }
                }
            }
            //console.log('horizontalOrient',horizontalOrient)
           /* console.log($(img).width())
            console.log($(img).height())*/
            //console.log(horizontalOrient)
            if(delay){return}
            delay=true;
            $timeout(function () {
                delay=false
            },1000)
            //console.log(i)
            var self=this;
            var content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            var contentZoom="width=device-width, initial-scale=1, maximum-scale=3"
            var viewPort=document.getElementById("viewport");
            //console.log(viewPort)
            var templ=(global.get('store').val.template.addcomponents && global.get('store').val.template.addcomponents.zoom && global.get('store').val.template.addcomponents.zoom.templ)?global.get('store').val.template.addcomponents.zoom.templ:'';
            var templateUrl = 'views/template/partials/stuffDetail/modal/zoom'+templ+'.html'
            viewPort.setAttribute("content", contentZoom);
            $rootScope.$emit('modalOpened');
            var options={
                animation: true,
                bindToController: true,
                controllerAs: '$ctrl',
                windowClass:  function(){return((horizontalOrient)?'zoom zoom-modal-horizontal':'zoom zoom-modal-vertical')},//'app-modal-window',
                templateUrl: templateUrl,
                controller: function ($uibModalInstance,global,gallery,i,home,horizontalOrient){
                    var self=this;
                    if(home){
                        if(horizontalOrient){
                            self.style="width:98vw;height:auto"
                        }else{
                            self.style="height:93vh;width:auto"
                        }

                    }else{
                        self.style="width:100%"
                    }
                    self.modal=global.get('mobile').val
                    self.idx=i;
                    self.gallery=angular.copy(gallery);
                    //console.log(self.gallery)
                    self.gallery[i].active=true;

                    self.next=next;
                    self.prev=prev;
                    self.chancheActiveSlide=chancheActiveSlide;
                    var delay=false
                    function next(i) {
                        //console.log('next',i)
                        if(delay){return}
                        delay=true
                        if(i+1==self.gallery.length){
                            self.gallery[0].active=true;
                            self.idx=0
                        }else{
                            self.gallery[i+1].active=true;
                            self.idx=i+1
                        }
                        $timeout(function () {
                            delay=false
                        },500)
                    }
                    function prev(i) {
                        //console.log('prev',i)
                        if(delay){return}
                        delay=true
                        if(i==0){
                            self.gallery[self.gallery.length-1].active=true;
                            self.idx=self.gallery.length-1
                        }else{
                            self.gallery[i-1].active=true;
                            self.idx=i-1
                        }
                        $timeout(function () {
                            delay=false
                        },500)
                    }
                    function chancheActiveSlide(i) {
                        self.gallery[i].active=true;
                        self.idx=i
                    }
                    self.ok=function(){
                        $uibModalInstance.close();
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                },
                resolve:{
                    gallery:function(){
                        return images
                    },
                    i:function(){
                        return i;
                    },
                    home:function(){
                        return home;
                    },
                    horizontalOrient:horizontalOrient,

                }
            }
            if(!home){
                options.size='lg'
            }
            $q.when()
                .then(function(){
                    return $uibModal.open(options).result
                })
                .then(function(res){
                    //console.log(res)
                    viewPort.setAttribute("content", content);
                    $rootScope.$emit('modalClosed')
                })
                .catch(function(err){
                    viewPort.setAttribute("content", content);
                    $rootScope.$emit('modalClosed')
                    //console.log(err)
                    if(err && err!='backdrop click'){
                        err=err.data||err;
                        exception.catcher('zoom')(err)
                    }
                })
        }
        function _zoomImg(i) {
            zoomImgGlobal(i,this.gallery)
        }
        function _setCategoryName(item){
            //console.log(item)
            //console.log(item.name,item.artikul,item.category)
            if(item.category && item.category._id){
                item.category=[item.category]
            }
            if(item.category && item.category.length){
                //console.log(global.get('category').val)
                i=0;
                var c=null;
                while(i<item.category.length && !c){
                    //console.log(i,global.get('categoriesO').val[item.category[i]])
                    if(typeof item.category[i]=='object'){item.category[i]=item.category[i]._id}
                    if(global.get('categoriesO').val[item.category[i]]){
                        c=global.get('categoriesO').val[item.category[i]]
                    }
                    i++
                }
            }
            //console.log(c)
            if(global.get('categories' ).val){
                if(!c){
                    if(!categoriesLink[item.category]){
                        c =global.get('categories').val.getOFA('_id',item.category);
                    }else{
                        c = categoriesLink[item.category];
                    }
                }

                if(c){
                    //console.log(c)
                    item.categoryUrl= c.url;
                    item.categoryName= c.name
                    if(c.linkData){
                        item.groupUrl= c.linkData.groupUrl
                        item.parentGroup=c.linkData.parentGroup||null;
                    }else{
                        item.groupUrl= 'group';
                        item.categoryUrl= 'category';
                        item.parentGroup=null;
                    }
                }else{
                    item.groupUrl= 'group';
                    item.categoryUrl= 'category';
                }
            }
            if(item.brand && global.get('brands') && global.get('brands').val){
                if(typeof item.brand=='object'){
                    item.brand=item.brand._id
                }
                var b =global.get('brands').val.getOFA('_id',item.brand);
                if(b){
                    item.brandUrl= b.url;
                    item.brandName=b.name;
                    if(item.brandTag){
                        var bt = b.tags.getOFA('_id',item.brandTag)
                        if(bt){
                            item.brandTagUrl=bt.url;
                            item.brandTagName=bt.name;
                        }


                    }
                }
            }

        }
        function _setDataForStuff(stuff,filterTags,stuffsState){
            //console.log(stuff);
            stuff.changeSortOfStuff=_changeSortOfStuff;
            stuff.addItemToOrder=_addItemToOrder;
            stuff.dateTime=_dateTime;
            stuff.onSelected =_onSelectedSort;
            stuff.order=_orderStuff,
            stuff.getBonus=_getBonus,
            stuff.zoomImg=_zoomImg,
            stuff.checkInCart=_checkInCart
            stuff.getDataForBooking=_getDataForBooking;
            _setCategoryName(stuff)
            _setPrice(stuff)
            stuff.setPrice=_setPrice;
            if(stuff.multiple && stuff.minQty){
                stuff.quantity= Number(stuff.minQty);
            }else{
                stuff.quantity=1;
                stuff.minQty=1;
            }
            if(!stuff.single){
                stuff.maxQty=150;
            }
            //stuff.quantity=1;
            if(!stuff.sale){
                _checkCamapign(stuff)
                //console.log(stuff)
            }
            stuff.expected=true;
            if(stuff.stock && typeof stuff.stock == 'object' && !stuff.stock.notag){
                if(stuff.sortsOfStuff && stuff.sortsOfStuff.filterGroup && global.get('filtersO') && global.get('filtersO').val && global.get('filtersO').val[stuff.sortsOfStuff.filterGroup]){
                    var filterGroup=global.get('filtersO').val[stuff.sortsOfStuff.filterGroup];
                    var filterGroupTags;
                    if(filterGroup){
                        stuff.sortsOfStuff.name = filterGroup.name.charAt(0).toUpperCase() + filterGroup.name.slice(1).toLowerCase();
                        stuff.groupName = stuff.sortsOfStuff.name;
                        filterGroupTags=filterGroup.tags.map(function(t){return t._id})
                        for(var ii=0;ii<stuff.tags.length;ii++){
                            var idx=filterGroupTags.indexOf(stuff.tags[ii]);
                            if(idx>-1){
                                stuff.groupTagName=filterGroup.tags[idx].name.charAt(0).toUpperCase() + filterGroup.tags[idx].name.slice(1).toLowerCase();
                                break;
                            }
                        }
                    }
                }
                //console.log(stuff.name,stuff.sortsOfStuff.name,stuff.groupTaaName)
                if(stuff.sortsOfStuff && stuff.sortsOfStuff.filter && global.get('filtersO') && global.get('filtersO').val && global.get('filtersO').val[stuff.sortsOfStuff.filter]){
                    stuff.filterName=global.get('filtersO').val[stuff.sortsOfStuff.filter].name.toLowerCase();
                    stuff.filterName= stuff.filterName.charAt(0).toUpperCase() + stuff.filterName.slice(1).toLowerCase();
                }
                if(stuff.sortsOfStuff && stuff.sortsOfStuff.stuffs){
                    for(var  i21=0;i21<stuff.sortsOfStuff.stuffs.length;i21++){

                        if(stuff.sortsOfStuff.stuffs[i21]._id!=stuff._id && stuff.sortsOfStuff.stuffs[i21].archived){
                            stuff.sortsOfStuff.stuffs.splice(i21,1);
                            i21--;
                        }else if(stuff.sortsOfStuff.stuffs[i21].stock && typeof stuff.sortsOfStuff.stuffs[i21].stock =='object'){
                            for(var k in stuff.sortsOfStuff.stuffs[i21].stock){
                                if(stuff.sortsOfStuff.stuffs[i21].stock[k].quantity){
                                    stuff.sortsOfStuff.stuffs[i21].stock[k].quantity=Number(stuff.sortsOfStuff.stuffs[i21].stock[k].quantity)
                                }
                            }
                        }
                    }
                }


                var keys = Object.keys(stuff.stock);
                stuff.stockKeysArray =keys.map(function (k) {
                    stuff.stock[k].quantity=Number(stuff.stock[k].quantity)

                    if(global.get('filterTagsO') && global.get('filterTagsO').val && global.get('filterTagsO').val[k]){
                        var tag = global.get('filterTagsO').val[k];
                    }else{
                        var tag = filterTags.getOFA('_id',k);
                    }
                    if(tag){
                        //console.log(stuff.stock[k].quantity,typeof stuff.stock[k].quantity,tag.name)
                        return {_id:k,index:tag.index,name:tag.name,quantity:Number(stuff.stock[k].quantity)}
                    }else{
                        //console.log(k,stuff.name,stuff.artikul,stuff.stock)
                        return null
                    }
                })
                .filter(function (key) {return key/* && (stuff.stock[key._id].quantity||stuff.stock[key._id].quantity==0);*/})
                .sort(function (a,b) {
                    if(!a || !b )return 1;
                    return a.index-b.index
                })
                /*console.log(stuff.stock)
                console.log(stuff.stockKeysArray)*/
                var sort_Id=null;
                //console.log(stuff.stockKeysArray)
                //console.log(global.get('sectionType').val)
                /*for(var ii=0;ii<stuff.stockKeysArray..lrngth;ii++){
                    var key= tuff.stockKeysArray[ii];
                    if(!global.get('sectionType') || !global.get('sectionType').val || !global.get('store').val.template.stuffListType[global.get('sectionType').val].unsetSort) {
                        //console.log('устанавливаем разновидность')
                        if (!sort_Id && stuff.stock[key._id].quantity) {
                            sort_Id = key._id;
                            stuff.sort = sort_Id;
                            break;
                            //console.log(key.name)
                        }
                    }
                }*/
                stuff.stockKeysArray.forEach(function (key) {
                    // устанавливаем  разновидноть
                    //if(!stuff.sort &&(!global.get('sectionType') || !global.get('sectionType').val || !global.get('store').val.template.stuffListType[global.get('sectionType').val].unsetSort)) {
                    if(!stuff.sort &&(!global.get('sectionType') || !global.get('sectionType').val || !global.get('store').val.template.stuffListType[global.get('sectionType').val].unsetSort || $state.current.name!='stuffs.stuff' || stuffsState)) {
                        //console.log('устанавливаем разновидность')
                        if (!sort_Id && stuff.stock[key._id].quantity) {
                            sort_Id = key._id;
                            stuff.sort = sort_Id;
                            //console.log(key.name)
                        }
                    }else{
                        //console.log('не устанавливаем разновидность')
                    }



                    key.quantity=Number(stuff.stock[key._id].quantity);
                    if(key.quantity && stuff.expected){
                        stuff.expected=false;
                    }
                    if(key.quantity){
                        if(stuff.multiple && stuff.minQty){
                            key.quantity= Number(stuff.minQty);
                        }else{
                            key.quantity=1;
                            stuff.minQty=1;
                        }
                    }
                    stuff.stock[key._id].name=key.name;
                    //console.log(stuff.stock[key._id])
                })

                if(stuff.stockKeysArray.length && sort_Id){
                    _changeSortOfStuff.call(stuff,sort_Id);
                }
                //console.log(stuff.sort)

            }else if(stuff.stock && typeof stuff.stock == 'object' && stuff.stock.notag){
                if(stuff.stock['notag'].quantity){
                    stuff.sort='notag'
                    stuff.expected=false;
                }
                stuff.stockKeysArray=[{name:'notag',_id:'notag',quantity:stuff.stock['notag'].quantity}]
            }
            if(!stuff.campaignId){
                stuff.sticker=_setSticker(stuff)
            }
            if(stuff.gallery && stuff.gallery.length){
                stuff.gallery.sort(function(a,b){return a.index- b.index})
            }


            if(!stuffsState){
                //console.log(stuffsState)
                if(typeof _filtersO !='undefined'  && stuff.sortsOfStuff && stuff.sortsOfStuff.stuffs && stuff.sortsOfStuff.stuffs.length){
                    var filterGroup,filterGroupTags=[];
                    if(stuff.sortsOfStuff.filterGroup){
                        filterGroup= _filtersO[stuff.sortsOfStuff.filterGroup]
                        if(filterGroup){
                            filterGroupTags=filterGroup.tags.map(function(t){return t._id})
                        }
                    }
                    //console.log(filterGroup)
                    stuff.sortsOfStuff.stuffs.forEach(function (itemS,i) {
                        itemS.gallery.forEach(function (s,ii) {
                            if(!ii){
                                s.active=true
                            }else{
                                s.active=false
                            }
                        })
                        for(var ii=0;ii<itemS.tags.length;ii++){
                            var idx=filterGroupTags.indexOf(itemS.tags[ii]);
                            if(idx>-1){
                                if(filterGroup.tags[idx].img){
                                    stuff.sortsOfStuff.stuffs[i].gallery[0].thumbSmallTag=filterGroup.tags[idx].img
                                }
                                break;
                            }
                        }
                    })
                }
            }
            /*if(stuff.artikul=='БЕРН узор "саржа"'){
                console.log(stuff)
            }*/

            return stuff

        }
        function _onSelectedSort(){
            setTimeout(function(){
                $(':focus').blur();
            },50)
        }
        function _orderStuff(){
            var stuff=this;
            // очистка корзины
            $order.clearCart();
            stuff.cena=stuff.price;
            stuff.sum= stuff.cena*stuff.quantity;
            if(stuff.addItemToOrder()=='nosort'){
                return;
            }
            //console.log(stuff)
            // get user info
            //return;
            $q.when()
                .then(function(){
                     return $user.getInfo(stuff.service)
                })
                .then(function(user){
                    /*console.log(user);
                    return;*/
                    return $order.checkOutFromList(user)
                })
                .then(function(){
                    $order.clearCart();
                })
                .catch(function(err){
                    $order.clearCart();
                    if(err){
                        exception.catcher('заказ')(err)
                    }

                })

        }
        function getAllBonus() {
            return _getBonus(true)
        }
        function _getBonus(all){
            var stuffs;
            var stuff=this;
            return $q.when()
                .then(function () {
                    if(all){
                        var p={page:0,rows:100};
                        var query={$and:[{orderType:4},{actived:true}]}
                        return getList(p,query);
                    }else{
                        return [stuff]
                    }
                })
                .then(function (sts) {
                    stuffs=sts;
                })
                .then(function(){
                     return $user.getInfoBonus()
                })
                .then(function(user){
                    if(!user || !user.email){throw 'нет email'}
                    var content=CreateContent.emailBonus(stuffs);

                    var bonus=(stuffs && stuffs[0] && stuffs[0].imgs && stuffs[0].imgs[0] && stuffs[0].imgs[0].name)?stuffs[0].imgs[0].name:'получение контента'
                    //console.log(content,bonus)
                    /*var popupWin=window.open();
                    popupWin.document.write(content);
                    popupWin.window.focus();*/

                    //return;
                    var domain=global.get('store').val.domain;
                    var o={email:user.email,content:content,
                        subject:bonus+' ✔',from:  '<promo@'+domain+'>'};
                    return $q(function(resolve,reject){
                        $email.save(o,function(res){
                            exception.showToaster('note','Сообщение','На Ваш email отправлено письмо');
                            resolve()
                        },function(err){
                            exception.showToaster('warning','отправка уведомления',err.data)
                            resolve()
                        } )
                    })
                }) //email

                .then(function(){
                    var states= $state.get();
                    if(global.get('paps') && states.some(function(state){return state.name=='thanksPage'})){
                        var pap = global.get('paps').val.getOFA('action','bonus');
                        //console.log(pap)
                        if(pap && pap.url){
                            $state.go('thanksPage',{id:pap.url})
                        }else{
                            exception.showToaster('note','Заказ','Все прошло успешно.');
                        }
                    }else{
                        exception.showToaster('note','Заказ','Все прошло успешно.');
                    }

                })//paps
                .catch(function(err){
                    if(err){
                        exception.catcher('получение бонуса')(err)
                    }

                })

        }

        function _checkCamapign(stuff){
            return $order.checkCampaign(stuff);
        }
        function _getDataForBooking(){
            var el=this;
            var stuff={
                _id:this._id,
                artikul:this.artikul,
                name:this.name,
                nameL:this.nameL,
                link:this.link,
                backgroundcolor:this.backgroundcolor,
                timePart:(el.timePart)?el.timePart:4,
                price:this.price,
                priceSale:this.priceSale,
                currency:this.currency
            }
            if(el.sort){
                stuff.price= el.stock[el.sort].price;
                stuff.priceSale= el.stock[el.sort].priceSale;
                stuff.timePart=(el.stock[el.sort].timePart)?el.stock[el.sort].timePart:4;
            }
            if(el.sortName){
                stuff.name= el.name+' '+el.sortName;
            }
            //console.log(stuff)
            return stuff;
        }
        function getList(paginate,query,search){
            //console.log('???')
            if(!paginate){paginate={page:0}}
            /*if(global.get('crawler') && global.get('crawler').val){
                query={$and:[{store:global.get('store').val._id},{actived:true}]}
            }*/
            var data ={perPage:paginate.rows ,page:paginate.page,query:query,search:search};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return Items.query(data).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                //console.log(response)
                //console.log(paginate)
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                var maxIndex;
                return $q.when()
                    .then(function(){
                        return FilterTags.getFilterTags()
                    })
                    .then(function (ft) {
                        //console.log(ft.length)
                        response.forEach(function(el){
                            if(el.index==99999 && maxIndex){
                                el.index--;
                            }
                            if(el.index==99999){
                                maxIndex=true;
                            }

                            _setDataForStuff(el,ft)
                        })
                    })
                    .then(function () {
                        return response;
                    })
            }
            function getListFailed(error) {
                console.log('XHR Failed for getStuffs.' + error);
                return $q.reject(error);
            }
        }
        function search(search,setData){
            // setData - если ищем товар в админке для дальнейшего использования необходимо получить с сервера все данные
            var data ={search:search,setData:setData};
            return Items.query(data).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                //console.log(response)
                if(setData){
                    return $q.when()
                        .then(function(){
                            return FilterTags.getFilterTags()
                        })
                        .then(function (ft) {
                            //console.log(ft.length)
                            response.forEach(function(el){
                                if(el.index==99999 && maxIndex){
                                    el.index--;
                                }
                                if(el.index==99999){
                                    maxIndex=true;
                                }

                                _setDataForStuff(el,ft)
                            })
                        })
                        .then(function () {
                            return response;
                        })
                }else{
                    return response
                }

            }
            function getListFailed(error) {
                console.log('XHR Failed for getStuffs.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id,o){
            var query={_id:id};
            if(o){
                for(var k in o){
                    query[k]=o[k]
                }
            }
            //console.log(query)
            return Items.get( query).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(res) {

                //res.getDataForCart=_getDataForCart;
                return $q.when()
                    .then(function(){
                        return FilterTags.getFilterTags()
                    })
                    .then(function (ft) {
                        _setDataForStuff(res,ft)
                        //console.log(res.stock)
                        //res.quantity=1;
                        return res;
                    })
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(){
            //console.log('!!!')
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/stuff/createStuff.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.item=''
                        self.ok=function(){
                            $uibModalInstance.close(self.item);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (item) {
                    if(item.name){
                        resolve(item)
                    }else{
                        reject()
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
        function getQueryFromUrl(campaignCondition){
            //console.log(campaignCondition)
            if($state.current.name=='campaign.detail'){
                return $q.when()
                    .then(function(){
                        return global.get('campaign').val
                    })
                    .then(function(campaigns){
                        var campaign=campaigns.getOFA('url',$stateParams.id)
                        //console.log(campaign)
                        if(campaign){
                            return setQueryForCampaign(campaign,campaignCondition);
                        }
                    })
            }else{
                return queryData;
            }
            function setQueryForCampaign(campaign,campaignCondition){
                var query={};
                return $q.when()
                    .then(function(){
                        return FilterTags.getFilterTags()
                    })
                    .then(function(filterTags){
                        if(campaignCondition){
                            if(campaign.conditionTags && campaign.conditionTags.length){
                                query.queryTags={}
                                campaign.conditionTags.forEach(function(tag){
                                    var t = filterTags.getOFA('_id',tag);
                                    if(t){
                                        if(!query.queryTags[t.filter]){query.queryTags[t.filter]=[]}
                                        query.queryTags[t.filter].push(t._id)
                                    }
                                })
                            }
                            if(campaign.conditionBrandTags && campaign.conditionBrandTags.length){
                                query.brandTag={$in:campaign.conditionBrandTags};
                            }
                            if(campaign.conditionBrands && campaign.conditionBrands.length){
                                query.brand={$in:campaign.conditionBrands};
                            }
                            if(campaign.conditionCategories && campaign.conditionCategories.length){
                                query.category={$in:campaign.conditionCategories}
                            }
                            if(campaign.conditionStuffs && campaign.conditionStuffs.length){
                                query._id={$in:campaign.conditionStuffs}
                            }
                        }else{
                            if(campaign.tags && campaign.tags.length){
                                query.queryTags={}
                                campaign.conditionTags.forEach(function(tag){
                                    var t = filterTags.getOFA('_id',tag);
                                    if(t){
                                        if(!query.queryTags[t.filter]){query.queryTags[t.filter]=[]}
                                        query.queryTags[t.filter].push(t._id)
                                    }
                                })
                            }
                            if(campaign.brandTags && campaign.brandTags.length){
                                query.brandTag={$in:campaign.brandTags};
                            }
                            if(campaign.brands && campaign.brands.length){
                                query.brand={$in:campaign.brands};
                            }
                            if(campaign.categories && campaign.categories.length){
                                query.category={$in:campaign.categories}
                            }
                            if(campaign.stuffs && campaign.stuffs.length){
                                query._id={$in:campaign.stuffs}
                            }
                        }

                        _setQueryForTags(query)

                        var keys = Object.keys(query);
                        var q={}
                        if(keys.length==1){
                            q=query;
                        }else if(keys.length>1){
                            q.$or=[];
                            for(var k in query){
                                var o ={}
                                o[k]=query[k]
                                q.$or.push(o)
                            }

                        }
                        q.actived=true;
                        return q;
                    })
            }
        }
        function getQuery(stateParams,to) {
            return _setQuery(stateParams,to)
        }
        function _setQueryForTags(query,filters) {
            //console.log(query.queryTags,query.queryTags && typeof query.queryTags=='object')
            if(query.queryTags && typeof query.queryTags=='object'){
                try{
                    var keys = Object.keys(query.queryTags);
                }catch(err){
                    //console.log(err)
                    keys=[]
                }

                if(keys.length==1){
                    query.tags={$in:query.queryTags[keys[0]]}
                }else if(keys.length>1){
                    query.$and=[];
                    keys.forEach(function(k){
                        query.$and.push({tags:{$in:query.queryTags[k]}})
                    })
                }
            }
            delete query.queryTags

            if(query.filters && typeof query.filters=='object'){
                try{
                    var keys = Object.keys(query.filters);
                }catch(err){
                    //console.log(err)
                    keys=[]
                }
                if(keys.length==1){
                    var filter;
                    if(filters){
                        filter = filters.getOFA('_id',keys[0])
                    }
                    //console.log(filter)
                    if(filter && filter.price){
                        query['priceForFilter']=query.filters[keys[0]]
                        console.log('query.filters[keys[0]]',query.filters[keys[0]])
                    }else{
                        query['filters.'+keys[0]]=query.filters[keys[0]]
                    }

                }else if(keys.length>1){
                    if(!query.$and){
                        query.$and=[];
                    }
                    keys.forEach(function(k){
                        var filter;
                        if(filters){
                            filter = filters.getOFA('_id',k)
                        }
                        //console.log(filter)
                        if(filter && filter.price){
                            query['priceForFilter']=query.filters[k]
                        }else{
                            var o ={};
                            o['filters.'+k]=query.filters[k]
                            query.$and.push(o)
                        }
                    })
                    if(query.$and.length==1){
                        for(var k in query.$and[0]){
                            query[k] = query.$and[0][k];
                        }
                        delete query.$and
                    }

                }
            }
            delete query.filters
        }
        function _setQuery(stateParams,to) {
            //console.log(stateParams)
            global.set('category',null);
            var parentSection,sectionCategories,categoryBrands=[],categoryFilters=[],query={},breadcrumbs=[];
            return $q(function(resolve,reject){
                $q.when()
                    .then(function(){
                        return $q.all([Sections.getSections(),Brands.getBrands(),Filters.getFilters()])
                    })
                    .then(function(data){
                        var sections=data[0],brands=data[1],filters=data[2];
                        //console.log(stateParams)
                        parentSection=Sections.getSection(sections,stateParams.groupUrl);
                        //console.log(parentSection)

                        global.set('parentSection',parentSection)
                        if(parentSection){
                            if(stateParams.categoryUrl!='category'){
                                if(parentSection.categories && parentSection.categories.length){
                                    var categorySet;
                                    parentSection.categories.forEach(function(c){
                                        if(c.url==stateParams.categoryUrl){
                                            global.set('category',c);
                                            categorySet=true;
                                            c.set=true;
                                            query.category=c._id;
                                            categoryBrands=c.brands;
                                            categoryFilters=c.filters
                                            //console.log(categoryFilters)
                                        }else{
                                            c.set=false
                                        }
                                    })
                                    if(!query.category){
                                        throw 404
                                    }
                                } else{
                                    throw 404
                                }
                            }else{
                                sectionCategories=Sections.getEmbededCategories(parentSection,[]).map(function(el){return el._id})
                                if(!sectionCategories.length){
                                    query.category=null;
                                }else{
                                    query.category={$in:sectionCategories}
                                    //console.log(global.get('categoriesO').val)
                                    sectionCategories.forEach(function (cat) {
                                        //console.log(cat)
                                        var c = global.get('categoriesO').val[cat];

                                        c.filters.forEach(function(f){
                                            if(categoryFilters.indexOf(f)<0){
                                                categoryFilters.push(f)
                                            }
                                        })
                                        c.brands.forEach(function(b){
                                            if(categoryBrands.indexOf(b)<0){
                                                categoryBrands.push(b)
                                            }
                                        })
                                    })
                                }
                            }
                        }
                        // бренд и коллекци
                        // ************************************************************************
                        var brandSet,brandTagSet,brandsArr,brandTagsArr;
                        //console.log(categoryBrands)

                        if(stateParams.brand){
                            brandsArr=stateParams.brand.split('__')
                        }
                        if(stateParams.brandTag){
                            brandTagsArr=stateParams.brandTag.split('__')
                        }
                        query.brand=[];
                        query.brandTag=[];
                        brands.forEach(function (b){
                            //console.log(b)
                            b.inList=false;
                            b.showCollections=false;
                            if((to.name=='stuffs' || to.name=='stuffs.stuff')){
                                if(categoryBrands && categoryBrands.length){
                                    if(categoryBrands.indexOf(b._id)>-1){
                                        b.inList=true;
                                    }
                                }
                            }else{
                                b.inList=true;
                            }


                            if(brandsArr && brandsArr.indexOf(b.url)>-1){
                                query.brand.push(b._id)
                                b.set=true;
                                breadcrumbs.push({type:'brand',name:b.name,url:b.url})
                                brandSet=true;
                            }else{
                                b.set=false;
                            }
                            b.tags.forEach(function (t) {
                                if(brandTagsArr && brandTagsArr.indexOf(t.url)>-1){
                                    query.brandTag.push(t._id)
                                    t.set=true;
                                    breadcrumbs.push({type:'brandTag',name:t.name,url:t.url})
                                    b.showCollections=true;
                                    brandTagSet=true;
                                }else{
                                    t.set=false;
                                }
                            })

                        })
                        if(query.brand.length){
                            if(query.brand.length==1){
                                query.brand=query.brand[0]
                            }else{
                                query.brand={$in:query.brand}
                            }
                        }else{
                            query.brand=null;
                        }
                        if(query.brandTag.length){
                            if(query.brandTag.length==1){
                                query.brandTag=query.brandTag[0]
                            }else{
                                query.brandTag={$in:query.brandTag}
                            }
                        }else{
                            query.brandTag=null;
                        }
                        if(!query.brandTag){
                            delete query.brandTag
                        }
                        if(!query.brand){
                            delete query.brand
                        }
                        //console.log(query.brandTag)
                        if(!brandSet){$location.search('brand',null);}
                        if(!brandTagSet){$location.search('brandTag',null);}

                        // end brand && collections
                        var queryTags;
                        if(stateParams.queryTag){
                            // анализ url на наличие тегов*************
                            queryTags=stateParams.queryTag.split('__');
                            // удаляем возможные дубли
                            queryTags= queryTags.filter(function(item, pos) {
                                return queryTags.indexOf(item) == pos;
                            })
                        }
                        query.filters={} // для количественных признаков
                        var filterTags;
                        if(stateParams.filterTag){
                            // анализ url на наличие тегов*************
                            filterTags=stateParams.filterTag.split('__');
                            // удаляем возможные дубли
                            filterTags= filterTags.filter(function(item, pos) {
                                return filterTags.indexOf(item) == pos;
                            })
                            filterTags = filterTags.map(function(f){
                                return f.split('_')
                            }).filter(function(f){return f.length==3}).forEach(function(f){
                                query.filters[f[0]]={$gte:Number(f[1]),$lte:Number(f[2])}
                            })
                        }


                        query.queryTags={}
                        filters.forEach(function (f) {
                            f.inList=false;
                            if((to.name=='stuffs' || to.name=='stuffs.stuff')){
                                if(categoryFilters.indexOf(f._id)>-1){
                                    f.inList=true;
                                    f.open=false;
                                }
                            }else{
                                f.inList=true;
                            }

                            if(categoryFilters && categoryFilters.length){
                                if(categoryFilters.indexOf(f._id)>-1){
                                    f.inList=true;
                                    f.open=false;
                                }
                            }
                            if(f.count){
                                //console.log(query.filters[f._id])
                                if(query.filters[f._id]){
                                    f.open=true;
                                    f.set=true;
                                    f.minValue =query.filters[f._id].$gte
                                    f.maxValue=query.filters[f._id].$lte
                                }else{
                                    f.minValue =f.min
                                    f.maxValue=f.max
                                }
                            }else{
                                f.tags.forEach(function (t) {
                                    if(queryTags && queryTags.indexOf(t.url)>-1){
                                        if(!query.queryTags[t.filter]){query.queryTags[t.filter]=[]}
                                        query.queryTags[t.filter].push(t._id)
                                        f.open=true;
                                        t.set=true;
                                        breadcrumbs.push({type:'queryTag',name:t.name,url:t.url})
                                    }else{
                                        t.set=false;
                                    }
                                })
                            }
                        })
                        _setQueryForTags(query,filters)
                        global.set('breadcrumbs',breadcrumbs);
                        // для клиенского запроса только опубликованные товары
                        if(to.name=='stuffs' || to.name=='stuffs.stuff' ){
                            query.actived=true;
                        }
                        //console.log('query.actived',query.actived)
                        //console.log(stateParams)
                        if(stateParams.searchStr){
                            var search=stateParams.searchStr.substring(0,20);
                            query['keywords.'+global.get('store').val.lang]=search
                        }
                        //console.log(to.name,query)
                        resolve(query)
                    })
                    .catch(function(err){
                        reject(err)
                    })
            })
        }





        function setFilters(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl:'components/stuff/filterStuffsList.html',
                    controller: setFiltersCtrl,
                    controllerAs: '$ctrl',
                    //size: 'lg',
                    windowClass:'modalProject',
                    //windowTopClass:'modalTopProject',
                    backdropClass:'modalBackdropClass',
                    //openedClass:'modalOpenedClass'
                });
                modalInstance.result.then(function () {resolve()},function(){reject()});
            })

        }
        function cloneStuff(stuff,clone){
            if(!global.get('seller' ).val){return};
            /*if(stuff) {
                stuff=angular.copy(stuff);
            }else{
                stuff={name:'',actived:false}
            }
            stuff.seller = global.get('seller' ).val*/
            //console.log(global.get('seller'));
            /*stuff.brand=(stuff.brand && stuff.brand._id)?stuff.brand._id:stuff.brand;
            stuff.brandTag=(stuff.brandTag && stuff.brandTag._id)?stuff.brandTag._id:stuff.brandTag;
            stuff.category=(stuff.category && stuff.category._id)?stuff.category._id:stuff.category;*/
            //stuff.sortsOfStuff=(stuff.sortsOfStuff && stuff.sortsOfStuff._id)?stuff.sortsOfStuff._id:stuff.sortsOfStuff;
            //delete stuff._id;
            /*delete stuff.url;
            delete stuff.gallery;
            delete stuff.setTagsValue;
            delete stuff.sortsOfStuff;*/
            return $q.when()
                .then(function(){
                    if(stuff && stuff._id) {
                        return Items.get({_id:stuff._id,clone:'clone'}).$promise
                    }else{
                        if($stateParams && $stateParams.categoryUrl!='category'){
                            var category=global.get('categories').val.getOFA('url',$stateParams.categoryUrl);
                            if(category && category._id){
                                stuff.category=category
                            }

                        }
                        return stuff;
                    }

                })
                .then(function(st){
                    stuff=angular.copy(st);
                    if(!stuff.category.length){
                        stuff.category=[stuff.category]
                    }


                    if(!stuff.index){stuff.index=0}
                    stuff.index++;
                    //console.log(stuff)
                    delete stuff._id;
                    delete stuff.url;
                    delete stuff.link;
                    delete stuff.__v;
                    delete stuff.nameL;
                    delete stuff.artikulL;
                    delete stuff.gallery;
                    delete stuff.sort;
                    delete stuff.sortsOfStuff;
                    delete stuff.keywords;
                    if(stuff.blocks && stuff.blocks.length){
                       stuff.blocks.forEach(function (b) {
                           delete b._id
                           b.template=null;
                           b.templateName=null;
                           if(b.img){b.img=null}
                           if(b.video){b.video=null}
                           if(b.imgs && b.imgs.length){
                               b.imgs.forEach(function (slide) {
                                   if(slide.img){slide.img=null;}
                               })
                           }
                       })
                    }
                    //console.log(stuff.blocks)
                    stuff.stock={'notag':{price:stuff.price}}
                    stuff.actived=false;
                    return $q(function(resolve,reject){
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl:'components/stuff/cloneStuffModal.html',
                            controller: cloneStuffCtrl,
                            controllerAs: '$ctrl',
                            size: 'lg',
                            resolve: {
                                stuff: function () {
                                    return stuff;
                                },
                                clone: function () {
                                    return clone;
                                },
                            }
                        });
                        modalInstance.result.then(function (stuff) {
                            /*console.log(stuff)
                            reject()*/
                            resolve(stuff)
                        },function(){
                            reject()
                        });
                    })

                })

            //console.log(stuff)


        }
        function saveField(stuff,field){
            var f=field.split(' ');
            var o={_id:stuff._id}
            f.forEach(function(el){o[el]=stuff[el]})
            return Items.save({update:field},o).$promise
        }
        function selectItem(query){
            console.log('внимание - сделать так же как и  selectItemWithSort')
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/stuff/modal/selectStuffModal.html',
                    controller: selectStuffCtrl,
                    controllerAs:'$ctrl',
                    size: 'lg',
                    resolve:{
                        query:function(){
                            return query;
                        }
                    }
                });

                modalInstance.result.then(function (stuff) {
                    resolve(stuff)
                },function(){
                    reject()
                });
            })

        }
        function selectItemWithSort(query){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/stuff/modal/selectStuffWithSortModal.html',
                    controller: selectItemWithSortCtrl,
                    controllerAs:'$ctrl',
                    size: 'lg',
                    resolve:{
                        query:function(){
                            return query;
                        }
                    }
                });
                modalInstance.result.then(function (stuff) {
                    resolve(stuff)
                },function(){
                    reject()
                });
            })

        }
        function getServicesForOnlineEntry(){
            //console.log('stuffsService',stuffsService)
            if(stuffsService){return stuffsService}
            var data ={query:{orderType:2,actived:true}};
            var filterTags=[];
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return $q.when()
                .then(function () {
                    return FilterTags.getFilterTags()
                })
                .then(function (fts) {
                    filterTags=fts;
                })
                .then(function () {
                    //console.log(data)
                    return Items.query(data).$promise
                })
                .then(getListComplete)
                .catch(getListFailed);

            function getListComplete(data) {
                data.shift();
                var items=[];
                data.forEach(function(el){
                    //console.log(el)
                    _setPrice(el)
                    el.sort=null;
                    var category=(el.category && el.category.length)?el.category[0]:el.category;
                    //console.log(global.get('categoriesO'))
                    if(global.get('categoriesO') && global.get('categoriesO').val){
                        var c=global.get('categoriesO').val[category]
                    }else{
                        var c=global.get('categories').val.getOFA('_id',category);
                    }
                    //console.log(el.name,el.category,c)
                    if(!c){c={name:'Категория'}}
                    el.category=c.name
                    //console.log(el.category)

                    if(!el.timePart){el.timePart=4}
                    try{
                        if(el.sortsOfStuff && el.sortsOfStuff.differentPrice){
                            for (var sort in el.stock){
                                var s= {
                                    _id:el._id,
                                    name:el.name+' '+_getTagName(sort),
                                    nameL:el.nameL,
                                    link:el.link,
                                    artikul:el.artikul,
                                    price: el.stock[sort].price,
                                    category:el.category,
                                    timePart:el.timePart
                                }

                                //console.log('s',s)
                                items.push(s)
                            }
                        }else{
                            if(el.stock.notag){
                                el.price= el.stock.notag.price;
                            }else{
                                try{
                                    el.price=el.stock[Object.keys(el.stock)[0]].price
                                }catch (err){
                                    console.log(err)
                                }
                            }
                            items.push(el)
                        }
                    }catch(err){console.log(err)}

                    //console.log('done')
                })
                stuffsService=items;
                return items;

            }
            function getListFailed(error) {
                console.log('XHR Failed for getStuffs.' + error);
                return $q.reject(error);
            }
            //*********************************************************
            function _getTagName(_id){
                //console.log(_id)
                if(!_id || !filterTags || _id=='notag')return '';
                //console.log(_id,_filterTagsO)
                return ((_filterTagsO[_id])?_filterTagsO[_id].name:'');

                return filterTags.getOFA('_id',_id ).name||'';
            }

        }

    }
    setFiltersCtrl.$inject=['global','$uibModalInstance'];
    function setFiltersCtrl(global,$uibModalInstance){
        var self=this;
        self.global=global;
        self.cancel = function () {
            $uibModalInstance.dismiss();
        };
        self.ok = function () {
            $uibModalInstance.close();
        };

    }


    cloneStuffCtrl.$inject=['$q','global','Stuff','stuff','$uibModalInstance','Category','clone'];
    function cloneStuffCtrl($q,global,Stuff,stuff,$uibModalInstance,Category,clone){
        var self=this;
        self.Items=Stuff;
        var $ctrl=self;
        self.stuff=stuff;
        //console.log(stuff)
        self.clone=clone;
        self.categoryDisabled=true;
        self.selectCategory=function(){
            $q.when()
                .then(function(){
                    return Category.select();
                })
                .then(function(selectedCategory){
                    //console.log(selectedCategory)
                    if(!self.stuff.category){
                        self.categoryDisabled=false
                        setTimeout(function(){
                            $('#createStuffCategory').trigger("change");
                            self.categoryDisabled=true;
                        },100)
                    }
                    self.stuff.category=selectedCategory;
                })
                .catch(function(err){
                    console.log(err)
                })
        }
        self.createNewStuff = function(){
            if(!self.stuff.category){
                self.alertMessage2=true;
                setTimeout(function(){
                    console.log('))))')
                    self.alertMessage2=false;
                },3000)
                return;
            }
            if(!self.stuff.name){
                self.alertMessage2=true;
                setTimeout(function(){
                    self.alertMessage2=false;
                },3000)
                return;
            }
            self.stuff.name=self.stuff.name.substring(0,100);
            if(self.stuff.artikul){
                self.stuff.artikul=self.stuff.artikul.substring(0,100);
            }


            if(!self.clone && self.stuff.category && self.stuff.category._id){
                self.stuff.category=self.stuff.category._id;
            }
            if(stuff.stock && stuff.stock.notag && stuff.stock.notag.price!=stuff.price){
                stuff.stock.notag.price=stuff.price;
            }
            $q.when()
                .then(function(){
                    self.stuff.keywords={};
                    var k =self.stuff.name;
                    if(self.stuff.artikul){
                        k+=' '+self.stuff.artikul;
                    }
                    //console.log(self.stuff.category)
                    if(self.stuff.category){
                        var c;
                        if(typeof self.stuff.category=='object'){
                            var cc=(typeof self.stuff.category[0]=='object')?self.stuff.category[0]._id:self.stuff.category[0]
                            c = global.get('categories').val.getOFA('_id',cc);
                        }else{
                            c = global.get('categories').val.getOFA('_id',self.stuff.category);
                        }
                        //console.log(c)
                        k+=' '+((c.nameL && c.nameL[global.get('store').val.lang])?c.nameL[global.get('store').val.lang]:c.name);
                    }
                    if(self.stuff.brand){
                        var bb=(typeof self.stuff.brand=='object')?self.stuff.brand._id:self.stuff.brand;
                        var b  = global.get('brands').val.getOFA('_id',bb);
                        k+=' '+((b.nameL&& b.nameL[global.get('store').val.lang])?b.nameL[global.get('store').val.lang]:b.name);
                        if(self.stuff.brandTag){
                            var bt = b.tags.getOFA('_id',self.stuff.brandTag);
                            if(bt && bt.nameL && bt.nameL[global.get('store').val.lang]){
                                k+=' '+bt.nameL[global.get('store').val.lang]
                            }
                        }


                    }

                    stuff.keywords[global.get('store').val.lang]=k;



                    return self.Items.save(self.stuff).$promise;
                })
                .then(function(res){
                    self.stuff._id=res.id;
                    self.stuff.url=res.url;
                    var c;
                    if(typeof self.stuff.category=='object'){
                        var cc=(typeof self.stuff.category[0]=='object')?self.stuff.category[0]._id:self.stuff.category[0]
                        c = global.get('categories').val.getOFA('_id',cc);
                    }else{
                        c = global.get('categories').val.getOFA('_id',self.stuff.category);
                    }
                    self.stuff.link='/'+c.linkData.groupUrl+'/'+c.linkData.categoryUrl+'/'+res.url;
                    self.Items.save({update:'link'},{_id:self.stuff._id,link:self.stuff.link})
                    $uibModalInstance.close(self.stuff)
                })
                .catch(function(err){
                    return $q.reject(err)
                })

        }
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
    selectStuffCtrl.$inject=['$q','Stuff','$uibModalInstance','query'];
    function selectStuffCtrl($q,Stuff,$uibModalInstance,query){
        var cashQuery=angular.copy(query)
        //console.log(query)
        var self=this;
        self.stuffs=[];
        self.name='';
        var paginate={page:0,rows:30,items:0}
        self.search = function(name){
            if (name.length<3){return}

            if(query){
                if (!query.$and){query={$and:[query]}}
                query.$and.push({$or:[{name:name},{artikul:name}]})
            }else{
                query={$or:[{name:name},{artikul:name}]}
            }
            //console.log(query)

            $q.when()
                .then(function(){
                    return Stuff.search(name,true)
                })
                .then(function(res){
                    self.stuffs=res;
                })

            /*Stuff.getList(paginate,query).then(function(res){
                query=angular.copy(cashQuery)
                self.stuffs=res;
            })*/
        }
        self.selectStuff=function(stuff){
            if(stuff.imgThumb){stuff.img=stuff.imgThumb}
            stuff.link="/"+stuff.groupUrl+'/'+stuff.categoryUrl+"/"+stuff.url;
            $uibModalInstance.close(stuff);
        }
        self.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }
    selectItemWithSortCtrl.$inject=['$q','Stuff','$uibModalInstance','Filters','FilterTags','exception','query','global'];
    function selectItemWithSortCtrl($q,Stuff,$uibModalInstance,Filters,FilterTags,exception,query,global){
        var cashQuery=angular.copy(query)
        var self=this;
        self.global=global;
        self.stuffs=[];
        self.name='';
        var paginate={page:0,rows:30,items:0}

        self.getFilterName=getFilterName;
        self.search = function(name){
            //console.log(name)
            if (name.length<3){return}
            $q.when()
                .then(function(){
                    return Stuff.search(name,true)
                })
                .then(function(res){
                    if(!global.get('seller') || !global.get('seller').val){
                        self.stuffs=res.map(function (s) {
                            //console.log(s)
                            for(var i=0;i<s.stockKeysArray.length;i++){
                                if(!s.stockKeysArray[i].quantity){
                                    s.stockKeysArray.splice(i,1)
                                    i--;
                                }
                            }
                            return s;
                        }).filter(function(s){
                            // /console.log(s)
                            return s.actived && s.stockKeysArray.length})
                        //console.log(self.stuffs)
                    }else{
                        self.stuffs=res;
                    }
                })


            return;
            if(query){
                if (!query.$and){query={$and:[query]}}
                query.$and.push({$or:[{name:name},{artikul:name}]})
            }else{
                query={$or:[{name:name},{artikul:name}]}
            }
            Stuff.getList(paginate,query).then(function(res){
                query=angular.copy(cashQuery)
                if(!global.get('seller') || !global.get('seller').val){
                    self.stuffs=res.map(function (s) {
                            //console.log(s)
                            for(var i=0;i<s.stockKeysArray.length;i++){
                                if(!s.stockKeysArray[i].quantity){
                                    s.stockKeysArray.splice(i,1)
                                    i--;
                                }
                            }
                            return s;
                        }).filter(function(s){
                            // /console.log(s)
                            return s.actived && s.stockKeysArray.length})
                    //console.log(self.stuffs)
                }else{
                    self.stuffs=res;
                }

            })
        }
        self.selectStuff=function(stuff){
            if(stuff.sortsOfStuff && stuff.sortsOfStuff.filter && !stuff.sort){
                exception.catcher('ошибка')('выберите разновидность')
            }else {
                /*var inCart= stuff.getDataForCart()
                if(inCart.sort){
                    inCart.addCriterionName=getTagName(inCart.sort);
                }*/
                $uibModalInstance.close(stuff);
            }
        }
        self.cancel = function () {
            $uibModalInstance.dismiss();
        };
        activate()
        function activate(){
            $q.when()
                .then(function(){
                    return Filters.getFilters()
                })
                .then(function(filters){
                    self.filters=filters;
                })
                .then(function(){
                    return FilterTags.getFilterTags()
                })
                .then(function(filterTags){
                    self.filterTags=filterTags;
                })
                .catch(function(err){
                    console.log(err)
                })
        }
        function getFilterName(_id){
            return self.filters.getOFA('_id',_id ).name||null;
        }

    }
    //*******************comments************************************
    commentService.$inject=['$resource','$uibModal','$q'];
    function commentService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/Comment/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            create:create,
        }
        function getList(paginate,query){

            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
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
                .catch(getItemFailed);
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
                    templateUrl: 'components/stuff/modal/createComment.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.name=''
                        self.ok=function(){
                            $uibModalInstance.close(self.name);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (name) {
                    if(name){
                        resolve(name.substring(0,100))
                    }else{
                        reject('empty')
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
    }


})()
