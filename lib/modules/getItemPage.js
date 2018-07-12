'use strict';
const request=require('request');


const isWin = /^win/.test(process.platform);

module.exports = function getItemPage(storeId,stuffHost,data){
    //console.log(stuffHost)
    if(!isWin){
        stuffHost='http://127.0.0.1:'+stuffHost.split(':')[2]
    }
    let url=data.url;
    let model=data.model[0].toUpperCase() + data.model.substr(1);
    let lang=(data.lang)?'&lang='+data.lang:''
    let query=(data.query)?'&query='+data.query:''
    return new Promise(function(resolve,reject){
        let urll =stuffHost+"/api/collections/"+model+"/"+url+"?store="+storeId+lang+query;
        //console.log(urll)
        request.get({url:urll}, function(err,response){
            if(err){return reject(err)}
            try{
                var item=JSON.parse(response.body);
            }catch(err){
                var item=null;
            }
            if(item && !item._id){
                item=null;
            }
            if(item && item.blocks && item.blocks.length){
                item.blocks.sort(function (a,b) {
                    return a.index-b.index
                })
            }
            //console.log(item.blocks)
            return resolve(item);
        })
    })
}