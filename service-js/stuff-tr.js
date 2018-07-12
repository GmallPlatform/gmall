'use strict';
var globalFunction=require('./public/scripts/myPrototype.js')
var co=require('co')
var fs = require('fs');
var path = require('path');
var mongoose=require('mongoose');
var db = mongoose.connect('mongodb://localhost/gmall-stuff',{useMongoClient:true});
// Bootstrap models
var modelsPath = path.join( __dirname, 'stuff/models' );
require( modelsPath + '/category.js' );
require( modelsPath + '/brand.js' );
require( modelsPath + '/stuff.js' );

var i=0;
var async = require('async')
var Items= mongoose.model('Stuff');
var Group= mongoose.model('Group');



//var stream = Items.find().stream();





var q = async.queue(function (doc, callback) {
    //console.log(++i,' -')
    if(doc.category && !doc.link){
        let id =(doc.category.toString)?doc.category.toString():doc.category
        //console.log(id,caregoriesO[id].url,caregoriesO[id].groupUrl)
        if(caregoriesO[id] && !doc.link){
            doc.categoryUrl=caregoriesO[id].url
            doc.groupUrl=caregoriesO[id].groupUrl;
            console.log('/'+doc.groupUrl,'/',doc.categoryUrl,'/',doc.url)
            Items.update({_id:doc._id},{$set:{link:'/'+doc.groupUrl+'/'+doc.categoryUrl+'/'+doc.url}},function () {
                callback()
            })
            /*console.log(doc.link)
            callback()*/
        }else{
            //console.log(doc)
            callback()
        }

    }else{
        //console.log(doc.store,doc.name)
        callback()
    }
});

q.drain = function() {
    console.log('all items have been processed');
    //db.close();
}


function handle(doc, callback) {
    let keywords={};
    if(doc.nameL){
        for(let lang in doc.nameL){
            keywords[lang]=doc.nameL[lang];

            if(doc.artikulL &&  doc.artikulL[lang]){
                keywords[lang]+=' '+doc.artikulL[lang];
            }else if(doc.artikul && lang=='ru'){
                keywords[lang]+=' '+doc.artikul;
            }
            if(doc.category && doc.category[0] && doc.category[0].nameL && doc.category[0].nameL[lang]){
                keywords[lang]+=' '+doc.category[0].nameL[lang];
            }
            if(doc.brand && doc.brand.nameL && doc.brand.nameL[lang]){
                keywords[lang]+=' '+doc.brand.nameL[lang];
            }
            if(doc.brandTag){
                if(doc.brandTag.nameL && doc.brandTag.nameL[lang]){
                    keywords[lang]+=' '+doc.brandTag.nameL[lang];
                }else{
                    keywords[lang]+=' '+doc.brandTag.name;
                }

            }
        }
    }
    let keys = Object.keys(keywords)
    if(!keys.length){
        keywords['ru']=doc.name;
        if(doc.category && doc.category[0] && doc.category[0].nameL && doc.category[0].nameL.ru){
            keywords.ru+=' '+doc.category[0].nameL.ru;
        }
        if(doc.brand && doc.brand.nameL && doc.brand.nameL.ru){
            keywords.ru+=' '+doc.brand.nameL.ru;
        }
        if(doc.brandTag){
            if(doc.brandTag.nameL && doc.brandTag.nameL.ru){
                keywords.ru+=' '+doc.brandTag.nameL.ru;
            }else{
                keywords.ru+=' '+doc.brandTag.name;
            }
        }


    }
    /*if(doc.store=='5867d1b3163808c33b590c12'){
        //console.log('keywords',keywords)
        console.log(keywords.ru)
    }*/


    //callback()
    Items.update({_id:doc._id},{$set:{keywords:keywords}},function () {
        callback()
    })


}




var groups=[];
var caregories=[];
var caregoriesO={};
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
        const cursor = Items.find()
            .populate('category','name nameL')
            .populate('brand','name nameL')
            .populate('brandTag','name nameL')
            .cursor();
        await cursor.eachAsync(async function(doc) {
            await new Promise(function (resolve,reject) {
                handle(doc,resolve)
            });


        });
        /*stream.on('data', function (doc) {
            //console.log(doc.name)
            q.push(doc, function(err) {
                //console.log('finished processing doc ',doc.name);
            });
        }).on('error', function (err) {
            // handle the error
            console.log(err)
        }).on('close', function () {
            // the stream is closed
            console.log('all done')
        });*/




    })
    .then(function () {
        console.log('handle all items')
    })
    .catch(function (err) {
        console.log('err',err)
    })

return;




