'use strict';
const request=require('request');
var zlib = require('zlib');
var globalFunction=require('./public/scripts/myPrototype.js')
var co=require('co')
var fs = require('fs');
var path = require('path');
var mongoose=require('mongoose');
var db = mongoose.connect('mongodb://localhost/gmall-order',{useMongoClient:true});
// Bootstrap models
var modelsPath = path.join( __dirname, 'order/models' );
require( modelsPath + '/online.js' );

var Items= mongoose.model('Booking');
let i=0;
function handle(doc, callback) {
    //console.log(i++,doc.stuffNameL,doc.masterNameL)
    let o={$set:{}}
    //callback()
    //o.$set.stuffName=doc.stuffName
    Items.update({_id:doc._id},o,function () {
        callback()
    })


}


const stuffHost='http://139.162.161.36:8900'

var stuffs=[];
var masters=[];

Promise.resolve()
   /* .then(function () {

        return new Promise(function (rs,rj) {
            let options={req:{store:{lang:'ru'}}}
            Group.list(options,function(err,res){
                rs(res)
            })
        })
    })
    .then(function (sections) {
        sections.forEach(function(section){
            if(section.categories && section.categories.length){
                section.categories.forEach(function(c){
                    c.groupUrl=section.url
                    caregoriesO[c._id.toString()]=c;
                })
            }
            if(section.child && section.child.length){
                section.child.forEach(function(subSection){
                    if(subSection.categories && subSection.categories.length){
                        subSection.categories.forEach(function(c){
                            c.groupUrl=subSection.url;
                            caregoriesO[c._id.toString()]=c;
                        })
                    }
                })
            }
        })

    })*/
    .then( async function () {
        console.log('handle')
        /*{store:'59df225e6cde3d5b2d80dfc3'}*/
        const cursor = Items.find({'user._id':"schedule"}).cursor();
        await cursor.eachAsync(async function(doc) {
            //console.log(doc.stuffNameL,doc.masterNameL)
            //return;
            if(doc && doc.service && doc.service._id){
             //console.log(doc.service.name,doc.service._id,doc.master)
                let stuff;
                if(doc.service._id!='reserved'){
                    if(stuffs[doc.service._id]){
                        stuff=stuffs[doc.service._id];
                    }else{
                        stuff = await getItem(stuffHost,'Stuff',doc.store,doc.service._id)
                        stuffs[doc.service._id]=stuff;
                    }
                    if(stuff){
                        doc.stuffNameL=stuff.nameL
                        doc.stuffName=stuff.name
                        doc.stuffLink=stuff.link
                        doc.backgroundcolor=stuff.backgroundcolor
                    }

                }
                if(doc.master){
                    let master;
                    if(masters[doc.master]){
                        master=masters[doc.master];
                    }else{
                        master = await getItem(stuffHost,'Master',doc.store,doc.master)
                        masters[doc.master]=master;
                    }
                    if(master){
                        doc.masterNameL=master.nameL
                        doc.masterName=master.name
                        doc.masterUrl=master.url
                    }
                }

             }
            await new Promise(function (resolve,reject) {
                //handle(doc,resolve)
                doc.save(function (err) {
                    if(err){console.log(err)}
                    console.log(i++)
                    resolve()
                })
            });

        });





    })
    .then(function () {
        console.log('handle all items')
    })
    .catch(function (err) {
        console.log('err',err)
    })

function getItem(stuffHost,model,storeId,id){
    let url = stuffHost+"/api/collections/"+model+"/"+id+"?store="+storeId;
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
    let req = request(options);
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
                            let results =JSON.parse(unzipbuffer.toString('utf8'));
                            //console.log(results)
                            return resolve(results);
                        }catch(err){
                            console.log('error in try',err)
                            return reject(err)
                        }
                    }else{
                        //console.log('err',err)
                        console.log(buffer.toString())
                        if(buffer.toString){
                            let bb = buffer.toString()
                            if(bb=='Not Found'){
                                return resolve(null)
                            }
                            try{
                                let data = JSON.parse(bb)
                                return resolve(data)
                            }catch(err){
                                reject(err)
                            }

                        }else{
                            reject(err)
                        }

                    }
                });
            });
            res.on('error', function(err) {
                console.log('msg',err)
                reject(err)
            })
        });
    })
}




