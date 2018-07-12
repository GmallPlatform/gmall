'use strict';
const request=require('request');
var zlib = require('zlib');


const isWin = /^win/.test(process.platform);
module.exports = function getItemsForPage(storeId,stuffHost,data){
    if(!isWin){
        stuffHost='http://127.0.0.1:'+stuffHost.split(':')[2]
    }
    //console.log(stuffHost)
    let lang=(data.lang)?'&lang='+data.lang:''
    let query=data.query;
    let model=data.model[0].toUpperCase() + data.model.substr(1);
    let url = stuffHost+"/api/collections/"+model+"?store="+storeId+'&'+query+lang;

    //console.log(url)


    let headers = {
        "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
        "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8;application/json;charset=utf-8,*/*",
        "user-agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
        "accept-encoding" : "gzip",
        'Accept-Encoding': 'gzip',
    };
    let options = {
        uri: url,
        json: true,
        method: 'GET',
        timeout: 1500,
        headers:headers
        /* href: '',
         pathname: '/'*/
    };
    //console.log(url)
    let req = request.get(options);
    return new Promise(function(resolve,reject){
        req.on('response', function(res) {
            var chunks = [];
            res.on('data', function(chunk) {
                //console.log(chunk)
                chunks.push(chunk);
            });

            res.on('end', function() {
                var buffer = Buffer.concat(chunks);
                //console.log(buffer)
                if(buffer.byteLength==2){return resolve([])}// нет ничего пустой массив
                var encoding = res.headers['content-encoding'];

                zlib.unzip(buffer, function(err, unzipbuffer) {
                    if (!err) {
                        try{
                            //console.log(unzipbuffer.toString('utf8'))
                            let results =JSON.parse(unzipbuffer.toString('utf8'));
                            return resolve(results);
                        }catch(err){
                            console.log('error in try',err)
                            return reject(err)
                        }
                    }else{
                        //console.log('err',err)
                        //console.log(buffer.toString())
                        if(buffer.toString){
                            try{
                                let data = JSON.parse(buffer.toString())
                                return resolve(data)
                            }catch(err){}

                        }
                        reject(err)

                    }
                });
            });
            res.on('error', function(err) {
                console.log('msg',err)
                reject(err)
            })
        });
    })



    return;
    return new Promise(function(resolve,reject){
        request.get({url:url}, function(err,response){
            if(err){return reject(err)}
            try{
                var items=JSON.parse(response.body);
            }catch(err){
                var items=null;
            }
            if(!items){
                items=null;
            }
            return resolve(items);
        })
    })
}