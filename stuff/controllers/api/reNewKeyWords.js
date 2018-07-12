"use strict";
var getUrl = require('../getUniqueUrl.js')
var myUtil=require('../myUtil.js');
var forEach = myUtil.forEachForGenerators;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Stuff=mongoose.model('Stuff');
var Brand=mongoose.model('Brand');
var BrandTags=mongoose.model('BrandTags');
var Filter=mongoose.model('Filter');
var FilterTags=mongoose.model('FilterTags');
var Category=mongoose.model('Category');
var Group=mongoose.model('Group');



module.exports=function(req,res,next) {

    var groups=[];
    var caregories=[];
    var caregoriesO={};
    Promise.resolve()
        /*.then(function () {
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
            var langArr=req.store.langArr;
            var langMain=req.store.lang;
            if(!langArr){
                if(req.store.lang){
                    langArr=[req.store.lang]
                }
            }
            const cursor = Stuff.find({store:req.store._id})
                .populate('category','name nameL')
                .populate('brand','name nameL')
                .populate('brandTag','name nameL')
                .cursor();
            await cursor.eachAsync(async function(doc) {
                await new Promise(function (resolve,reject) {
                    handle(doc,langArr,langMain,resolve)
                });


            });

        })
        .then(function () {
            console.log('handle all items')
            res.json({msg:'Ok'})
        })
        .catch(function (err) {
            console.log('err',err)
            next(err)
        })




}

function handle(doc,langs,langMain, callback) {
    let keywords={};
    if(doc.nameL){
        for(let lang of langs){
            keywords[lang]=(doc.nameL[lang])?doc.nameL[lang]:doc.nameL[langMain];
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
    Stuff.update({_id:doc._id},{$set:{keywords:keywords}},function () {
        //console.log(keywords)
        callback()
    })
    /*console.log(keywords)
    callback()*/

}
