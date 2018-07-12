'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ObjectID = mongoose.Types.ObjectId;
var Stuff=mongoose.model('Stuff')
var moment = require('moment');



function handle(stuff, currency,mainCurrency,callback) {
    //console.log(stuff.name)
    stuff.priceForFilter=[]
    try{
        for(let key in stuff.stock){
            if(stuff.stock[key] && stuff.stock[key].quantity && stuff.stock[key].price){
                let c = (stuff.currency)?stuff.currency:mainCurrency;
                let price =(c==mainCurrency)?stuff.stock[key].price:Math.ceil10(stuff.stock[key].price/currency[c][0],-2)
                stuff.priceForFilter.push(price)
            }
        }
        Stuff.update({_id:stuff._id},{$set:{priceForFilter:stuff.priceForFilter}},function () {
            //console.log(stuff.priceForFilter)
            callback()
        })

    }catch(err){
        callback()
        console.log(err)
    }

    callback()
}
exports.recalculatePrice=async function (req,res,next){

    const currency = req.store.currency;
    const mainCurrency = req.store.mainCurrency;
    //console.log(currency)
    const q={store:req.store._id};
    const cursor = Stuff.find(q).cursor();
    let i=0;
    await cursor.eachAsync(async function(doc) {
        await new Promise(function (resolve,reject) {
           /* let perc = parseInt((progress / total) * 100);

            if(prevPerc!=perc){
                prevPerc=perc;
                setTimeout(function(){


                    if(req.sockets[id]){
                        req.sockets[id].emit('userslistCreating',{perc:perc})
                    }

                    callback();
                },5)
            }else{
                setTimeout(function(){
                    callback();
                },5)
            }*/
            handle(doc,currency,mainCurrency,resolve)
        });
        i++
        //console.log(i)
    });



    return res.json({msg:'Ok'});
}












