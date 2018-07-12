'use strict';
function _salePrice(doc,sale){
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
function _retailPrice(doc,retail,store){
    if(!doc.driveRetailPrice){
        if(store.seller.retail){
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

/*
* currency=global.get('currency').val
 formatAverage=global.get('store').val.currency[currency][4];
 self.formatPrice=global.get('store').val.currency[currency][5];
 console.log('self.formatPrice',self.formatPrice)
 if(typeof self.formatPrice=='undefined'){
 self.formatPrice=2;
 }
 del=-1;
 if(formatAverage==1){del=-1}else if(formatAverage==2){del=0}else if(formatAverage==3){del=1} else if(formatAverage==4){del=2}
 */

exports.setPrice= function(doc,store,currency,formatPrice){
    if(!formatPrice && formatPrice!=0){formatPrice=-2}
    try{
        var sale = (store.seller.sale||0)/100;
        var retail=(store.seller.retail||0)/100;
        var el = doc;

        var keys=[];
        if(el.stock){
            if(el.stock['null']){delete el.stock['null']}
            if(el.stock['undefined']){delete el.stock['undefined']}
            keys=Object.keys(el.stock)
        }
        if (!el.stock || typeof el.stock!='object' || !keys.length){
            el.stock={notag:{quantity:1,price:el.price}}
            el.sort='notag'
        }else if(el.stock['notag']){
            el.stock['notag'].price=el.price;
        }
        keys=Object.keys(el.stock);
        el.sort=keys[0];

        if(el.currency && currency != el.currency){
            for(var tag in el.stock){
                el.stock[tag].price=Math.ceil10(Number(el.stock[tag].price)/Number(store.currency[el.currency][0]),formatPrice)
            }
        }


        el.price=el.stock[el.sort].price

        _salePrice(el,sale);
        _retailPrice(el,retail,store);
        return el;
    }catch(err){
        return doc;
        console.log(err)
    }

}
exports.setRate= function(el,rate,formatPrice){
    if(!formatPrice && formatPrice!=0){formatPrice=-2}
    for(var key in el.stock){
        //console.log(key)

        el.stock[key].price=Math.ceil10(Number(el.stock[key].price)*rate,formatPrice)

        if(el.stock[key].retail){
            el.stock[key].retail=Math.ceil10(Number(el.stock[key].retail)*rate,formatPrice)
        }
        if(el.stock[key].priceSale){
            el.stock[key].priceSale=Math.ceil10(Number(el.stock[key].priceSale)*rate,formatPrice)
        }
        if(key=='notag'){
            el.price=el.stock[key].price
            el.retail=el.stock[key].retail
            el.priceSale=el.stock[key].priceSale
        }else{
            //console.log(el.stock[key].price)
        }
    }
    return el;
}






