'use strict';
angular.module('gmall.services')
.factory('Stuff', function ($resource,$state,global,$stateParams,$order,$q) {
    var Items=$resource('/api/collections/Stuff/:id',{id:'@_id'});
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
        console.log(this);
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
        console.log(inCart);
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
    function _getListOld(query,search,page,rows,items){
        var deferred=$q.defer();
        if (_query === query && _page==page && _rows==rows){
            deferred.resolve(_items)
        }else{
            Items.query({perPage:rows ,page:page,query:query,search:search},function(res){
                if (page==0 && res.length>0 && !res[0]._id){
                    items = res.shift().index;
                }
                res.forEach(function(el){
                    el.unableCart= _unableCart;
                    el.addInCart=_addInCart;
                    var _sp;
                    if (global.getSticker){
                        _sp=global.getSticker(el,true);
                    }
                    if (_sp && _sp.sticker){
                        el.sticker=_sp.sticker;
                        el.priceCampaign=_sp.priceCampaign;
                        el.campaignUrl=_sp.campaignUrl;
                    } else {
                        el.sticker = _sp;
                    }
                    if(el.gallery && el.gallery.length){
                        el.gallery.sort(function(a,b){return a.index- b.index})
                    }
                    if(el.addCriterion && el.addCriterion.length){
                        el.addCriterionToCart=[];
                        el.addCriterion.forEach(function(ac,index){
                            ac.tags=global.get('filterTags').val.getObjectFromArray('filter',ac.filter,true);
                            if (ac.tags[0]){
                                el.addCriterionToCart[index]=ac.tags[0]._id;
                            }
                        })
                    }
                })
                _items=res;
                if (items=='fullListForAddToCart'){
                    var arr=[];
                    res.forEach(function(el){
                        if (el.addCriterion && el.addCriterion.length){
                            el.addCriterion[0].tags.forEach(function(tag){
                                el.addCriterionToCart[0]=tag._id;
                                if (el.addCriterion[1] && el.addCriterion[1].tags){
                                    el.addCriterion[1].tags.forEach(function(tag1){
                                        el.addCriterionToCart[1]=tag1._id;
                                        var inCart = _getDataForCart.call(el);
                                        arr.push(inCart)
                                    })
                                }else{
                                    var inCart = _getDataForCart.call(el);
                                    arr.push(inCart)
                                }
                            })
                        }else{
                            var inCart = _getDataForCart.call(el);
                            arr.push(inCart)
                        }
                    })
                    res=arr;
                }
                deferred.resolve(res)
            },function(err){
                deferred.reject(err)
            })
        }
        return deferred.promise;
    }
    function _getList0512(query,search,page,rows,items){
        //console.log(query,page,rows)
        //query={"$and":[{"tags":{"$nin":["547307906633455c04c52c57"]}},{"section":"565d62e1f03c0150112aabf9"},{"brand":"54156efc019e33d809a0ef7a"},{"category":"565d6ac9f03c0150112aabfb"}]};
        return Items.query({perPage:rows ,page:page,query:query,search:search},function(res){
            if (page==0 && res.length>0 && !res[0]._id){
                var totalitems = res.shift().index;
            }
            if(res.length==0){
                totalitems=0;
            }
            /*if (items=='fullListForAddToCart'){
                var arr=[];
                res.forEach(function(el){
                    if (el.addCriterion && el.addCriterion.length){
                        el.addCriterion[0].tags.forEach(function(tag){
                            el.addCriterionToCart[0]=tag._id;
                            if (el.addCriterion[1] && el.addCriterion[1].tags){
                                el.addCriterion[1].tags.forEach(function(tag1){
                                    el.addCriterionToCart[1]=tag1._id;
                                    var inCart = _getDataForCart.call(el);
                                    arr.push(inCart)
                                })
                            }else{
                                var inCart = _getDataForCart.call(el);
                                arr.push(inCart)
                            }
                        })
                    }else{
                        var inCart = _getDataForCart.call(el);
                        arr.push(inCart)
                    }
                    //console.log(arr)
                })
                res=arr;
            } else {
                res.forEach(function(el){
                    el.unableCart= _unableCart;
                    el.addInCart=_addInCart;
                    var _sp;
                    if (global.getSticker){
                        _sp=global.getSticker(el,true);
                    }
                    if (_sp && _sp.sticker){
                        el.sticker=_sp.sticker;
                        el.priceCampaign=_sp.priceCampaign;
                        el.campaignUrl=_sp.campaignUrl;
                    } else {
                        el.sticker = _sp;
                    }
                    if(el.gallery && el.gallery.length){
                        el.gallery.sort(function(a,b){return a.index- b.index})
                    }
                    if(el.addCriterion && el.addCriterion.length){
                        el.addCriterionToCart=[];
                        el.addCriterion.forEach(function(ac,index){
                            ac.tags=global.get('filterTags').val.getObjectFromArray('filter',ac.filter,true);
                            if (ac.tags[0]){
                                el.addCriterionToCart[index]=ac.tags[0]._id;
                            }
                        })
                    }

                })
                items.totalItems=totalitems;
            }*/
            var arr=[];
            res.forEach(function(el){
                el.unableCart= _unableCart;
                el.addInCart=_addInCart;
                if(el.gallery && el.gallery.length){
                    el.gallery.sort(function(a,b){return a.index- b.index})
                }
                if(el.addCriterion && el.addCriterion.length){
                    el.addCriterionToCart=[];
                    el.addCriterion.forEach(function(ac,index){
                        ac.tags=global.get('filterTags').val.getObjectFromArray('filter',ac.filter,true);
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
                                    var inCart = _getDataForCart.call(el);
                                    arr.push(inCart)
                                })
                            }else{
                                var inCart = _getDataForCart.call(el);
                                arr.push(inCart)
                            }
                        })
                    }else{
                        var inCart = _getDataForCart.call(el);
                        arr.push(inCart)
                    }
                }else{
                    var _sp;
                    if (global.getSticker){
                        _sp=global.getSticker(el,true);
                    }
                    if (_sp && _sp.sticker){
                        el.sticker=_sp.sticker;
                        el.priceCampaign=_sp.priceCampaign;
                        el.campaignUrl=_sp.campaignUrl;
                    } else {
                        el.sticker = _sp;
                    }
                }
            })
            if (items=='fullListForAddToCart'){
                console.log(arr)
                res=arr;
                //return arr;
            }else{
                items.totalItems=totalitems;
                //return res
            }

        },function(err){
            return err
        }).$promise;
    }
    function _getList(query,search,page,rows,items){
        //console.log(query,page,rows)
        //query={"$and":[{"tags":{"$nin":["547307906633455c04c52c57"]}},{"section":"565d62e1f03c0150112aabf9"},{"brand":"54156efc019e33d809a0ef7a"},{"category":"565d6ac9f03c0150112aabfb"}]};
        var q = $q.defer();
        Items.query({perPage:rows ,page:page,query:query,search:search},function(res){
            if (page==0 && res.length>0 && !res[0]._id){
                var totalitems = res.shift().index;
            }
            if(res.length==0){
                totalitems=0;
            }

            var arr=[];
            res.forEach(function(el){
                el.unableCart= _unableCart;
                el.addInCart=_addInCart;
                if(el.gallery && el.gallery.length){
                    el.gallery.sort(function(a,b){return a.index- b.index})
                }
                if(el.addCriterion && el.addCriterion.length){
                    el.addCriterionToCart=[];
                    el.addCriterion.forEach(function(ac,index){
                        ac.tags=global.get('filterTags').val.getObjectFromArray('filter',ac.filter,true);
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
                    var _sp;
                    if (global.getSticker){
                        _sp=global.getSticker(el,true);
                    }
                    if (_sp && _sp.sticker){
                        el.sticker=_sp.sticker;
                        el.priceCampaign=_sp.priceCampaign;
                        el.campaignUrl=_sp.campaignUrl;
                    } else {
                        el.sticker = _sp;
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
    }
    var _getItem = function(id,cb){
        Items.get({id:id},function(res){
            res.unableCart= _unableCart;
            res.addInCart=_addInCart;
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
            // заполнение дополнительных параметор для selectov c дополнительными критериями
            res.addCriterionToCart=[];
            if(res.addCriterion && res.addCriterion.length){
                res.addCriterion.forEach(function(ac,index){
                    // название параметра перед селектом
                    ac.filterName = global.get('filters').val.getObjectFromArray('_id',ac.filter).name;
                    ac.tags=global.get('filterTags').val.getObjectFromArray('filter',ac.filter,true);
                    // установка параметров
                    if (index==0 && $stateParams.param1 && ac.tags.some && ac.tags.some(function(t){return $stateParams.param1== t._id})){
                        res.addCriterionToCart[index]=$stateParams.param1;
                    } else if(index==1 && $stateParams.param2 && ac.tags.some && ac.tags.some(function(t){return $stateParams.param2== t._id})){
                        res.addCriterionToCart[index]=$stateParams.param2;
                    } else if (ac.tags[0]){
                        res.addCriterionToCart[index]=ac.tags[0]._id;
                    }
                })
            }
            res.quantity=1;
            cb(res)
        },function(err){
            $state.go('404');
        })
    }
    return {
        getList: _getList,
        getItem:_getItem
    }
})

