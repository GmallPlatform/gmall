'use strict';
angular.module('gmall.services')
.provider('global',[function(){
    var _data = {}; // our data storage array
    var _urls = {}; // end urls
    this.setUrl = function(urls){
        _urls = urls;
    }
    var _set = function(what,val){
        val=val||null
        //console.log(what,val)
        //if(what=='user' && val){return;}
        if(angular.isDefined(what)){
            if (!_data[what]){
                _data[what]={val:val}}
            else {
                _data[what].val=(angular.isDefined(val)) ? val: null;
            }
            //return true;
        }/*else{
            return false;
        }*/
    }; // end _set
    var _getSticker = function(stuff){
        var id = (stuff._id)?stuff._id:stuff.stuff;
        if (!stuff.tags || !stuff.tags.length) return;
        if (!_data['filterTagsSticker'].val) return;
        //console.log(_data['filterTagsSticker'])
        for(var i=0,l=_data['filterTagsSticker'].val.length;i<l;i++){
            var tag = _data['filterTagsSticker'].val[i]._id;
            if (stuff.tags.indexOf(tag)>-1){
                return (_data['filterTagsSticker'].val[i].sticker)?_data['filterTagsSticker'].val[i].sticker:false;
                break;
            }
        }
        return false;
    }
    var _getDataForCart = function(stuff){
        console.log('не используется!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        return;
        var inCart={}
        inCart.quantity=(stuff.quantity)?stuff.quantity:1;

        inCart.addCriterionName=[];
        //console.log(stuff.addCriterionToCart,stuff.addCriterionToCart.length)
        if(stuff.addCriterionToCart && stuff.addCriterionToCart.length){
            console.log(stuff.addCriterionToCart)
            stuff.addCriterionToCart.forEach(function(el){

                var t = _data['filterTags'].val.getObjectFromArray('_id',el);
                if (t && t.name){
                    inCart.addCriterionName.push(t.name)
                }
            })
        }
        inCart.addCriterionToCart=(stuff.addCriterionToCart)?stuff.addCriterionToCart:null;
        if (stuff.single){inCart.single=true;}
        inCart.unitOfMeasure= (stuff.unitOfMeasure)?stuff.unitOfMeasure:'шт';
        inCart.stuff=stuff._id;
        inCart.stuffUrl=stuff.url;
        inCart.seller=stuff.seller;
        inCart.img=(stuff.gallery[0].thumb)?stuff.gallery[0].thumb:'';
        inCart.price=stuff.price;
        inCart.retail=stuff.retail;
        inCart.priceSale=stuff.priceSale;
        inCart.brand=stuff.brand||'brand';
        var _brand =_data['brands'].val.getObjectFromArray('_id',stuff.brand);
        inCart.brandUrl=(_brand)?_brand.url:'brand';
        inCart.brandName=(_brand)?_brand.name:'';
        inCart.category=stuff.category||"category";
        var o=_data['categories'].val.getObjectFromArray('_id',stuff.category);
        if(o){
            inCart.categoryUrl=o.url;
            inCart.categoryName=o.name;
            inCart.groupUrl=o.group.url;
            inCart.groupName=o.group.name;
        } else {
            inCart.categoryUrl='id';
            inCart.categoryName='category';
            inCart.groupUrl="group"
        }
        inCart.tags=stuff.tags;
        inCart.name=stuff.name
        if (stuff.artikul){
            inCart.name +=' '+stuff.artikul;
        }
        if (stuff.sticker==='undefined'){
            inCart.sticker=_getSticker(stuff);
        } else {
            inCart.sticker=stuff.sticker;
        }

        //console.log(inCart);
        return inCart;
    }

// Provider method for set
    this.set = _set;

// service methods
    this.$get = ['$http',function($http){


        return {
            request : function(url,vars){
                //console.log(url)
                if(angular.isDefined(vars)){
                    return $http.post(url,$.param(vars),{headers:{'Content-Type': 'application/x-www-form-urlencoded'}});
                }else{
                    return $http.get(url);
                }
                //return ['a','d','c']
            },

            url : function(which){
                return _urls[which];
            }, // end url

            set : _set, // end set

            get : function(what){
                if(angular.isDefined(what) && (what in _data))
                    return _data[what];//angular.copy(_data[what]);
                else
                    return undefined;
            }, // end get

            del : function(what){
                if(angular.isDefined(what)){
                    var i = _data.indexOf(what);
                    if(i >= 0)
                        return _data.splice(i,1);
                }
                return false;
            }, // end del

            clear : function(){
                _data = [];
            }, // end clear
            getAll:function(){ return _data},
            //глобальные функции
            getSticker:_getSticker,
            getDataForCart: _getDataForCart

        };
    }]; // end $get
}]) // end appDataStoreSrvc / storage-services


.factory('globalSrv',['global',function(global){
    //-- Variables --//
    var _send = global.request;
    //-- Methods --//
    return {
        getData:function(name,param,abbr){
            //console.log(abbr)
            var url = global.url(name);
            if(angular.isDefined(param) && !(angular.equals(param,null) || angular.equals(param,'')))
                url += '/' + param;
            if(angular.isDefined(abbr) && !(angular.equals(abbr,null) || angular.equals(abbr,''))&& typeof abbr=='object'){
                url += '?';
                for(var key in abbr){
                    if (url[url.length-1]!='?'){
                        url+= '&';
                    }
                    url +=key+'='+abbr[key]
                }
            }

            //console.log(url)
            return _send(url);
        }
    };
}]) // end subjectSrv / module(myapp.services)
