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

let async=require('async')


exports.index=function(req,res,next) {
    switch (req.params.model) {
        case 'brand':
            fixBrand(req,res,next)
            break;
        case 'filter':
            fixFilter(req,res,next)
            break;
        case 'stuff':
            fixStuff(req,res,next)
            break;
        default:
           res.json({mms:'OK'})
    }
}

function fixFilter(req,res,next) {
    //res.json({ms:'OK brand'})
    let filtersForUpdate={}, filterTagsForUpdate={},filters,filterTags;
    Promise.resolve()
        .then(function () {
            return new Promise(function (rs,rj) {
                Filter.find({store:req.store._id}).lean().exec(function(err,items){
                    if(err){rj(err)}
                    filters=items
                    rs()
                })
            })
        })
        .then(function () {
            return new Promise(function (rs,rj) {
                FilterTags.find({store:req.store._id}).lean().exec(function(err,items){
                    if(err){rj(err)}
                    filterTags=items
                    rs()
                })
            })
        })
        .then(function () {

            filters.forEach(function(b){
                let change=false;
                let changeT=false;

                //console.log(b)
                let tags= b.tags.filter(function(t){return t}).map(function(t){return t.toString()})
               /* console.log(b.tags)
                 console.log(tags)*/
                if(tags.length !=b.tags.length){
                    change=true;
                }

                filterTags.filter(function(t){return t}).forEach(function(t){
                    /*if(t.name=='new' && b.name=='основные группы'){
                        console.log(t)
                        console.log(tags.indexOf(t._id.toString())>-1 && t.filter.toString()!=b._id.toString())
                        console.log(b)

                    }*/
                    if(tags.indexOf(t._id.toString())>-1 && t.filter.toString()!=b._id.toString()){
                        t.filter=b._id;
                        filterTagsForUpdate[t._id]={filter:t.filter}
                    }
                    if(t.filter.toString()==b._id.toString() && tags.indexOf(t._id.toString())<0){
                        tags.push(t._id.toString())
                        change=true;
                    }
                    /*console.log(t)
                     console.log(typeof  t._id)
                     console.log(typeof  t.brand)*/
                })

                //console.log('change',change)
                if(change){
                    filtersForUpdate[b._id]={tags:tags}
                }
            })
            /* brands.forEach(function(brand){
             b=brands.toObject();
             b.tags.forEach(function(t){console.log(typeof  t)})
             })*/
            //console.log(brandsForUpdate)
            //console.log(brandTagsForUpdate)
        })

        .then(function(){
            let acts=[];
            console.log('filterTagsForUpdate',filterTagsForUpdate)
            console.log('filtersForUpdate',filtersForUpdate)
            acts.push(myUtil.getPromiseForUpdateInDB(filterTagsForUpdate,FilterTags))
            acts.push(myUtil.getPromiseForUpdateInDB(filtersForUpdate,Filter))
            return Promise.all(acts)

        })
        .then()
        .then(function(){
            res.json({ms:'ok'})

        })
        .then(function(){
            return forEach(filterTags, function * (tag, idx) {
                //console.log(filter)
                if(tag && tag.name){
                    let oldUrl=tag.url;
                    tag.url = yield getUrl.create(FilterTags,req.store._id,tag.name)
                    if(tag.url!=oldUrl){
                        let o={}
                        o[tag._id]={url:tag.url}
                        yield myUtil.getPromiseForUpdateInDB(o,FilterTags)
                    }

                }

            })
        })
        .then(function(){
            console.log('Ok!')
        })
        .catch(function (err) {
            return next(err)
        })
}

function fixBrand(req,res,next) {
    //res.json({ms:'OK brand'})
    let brandsForUpdate={}, brandTagsForUpdate={},brands,brandTags;
    Promise.resolve()
        .then(function () {
            return new Promise(function (rs,rj) {
                Brand.find({store:req.store._id}).lean().exec(function(err,items){
                    if(err){rj(err)}
                    brands=items
                    rs()
                })
            })
        })
        .then(function () {
            return new Promise(function (rs,rj) {
                BrandTags.find({store:req.store._id}).lean().exec(function(err,items){
                    if(err){rj(err)}
                    brandTags=items
                    rs()
                })
            })
        })
        .then(function () {

            brands.forEach(function(b){
                let change=false;
                let changeT=false;

               // console.log(typeof b._id)
                let tags= b.tags.filter(function(t){return t}).map(function(t){return t.toString()})
                /*console.log(b.tags)
                console.log(tags)*/
                tags=tags.reduce(function(accum, current) {
                    if (accum.indexOf(current) < 0) {
                        accum.push(current);
                    }
                    return accum;
                },[]);

                if(tags.length !=b.tags.length){
                    change=true;
                }
                brandTags.forEach(function(t){
                    if(tags.indexOf(t._id.toString())>-1 && t.brand.toString()!=b._id.toString()){
                        t.brand=b._id;
                        brandTagsForUpdate[t._id]={brand:t.brand}
                    }
                    if(t.brand.toString()==b._id.toString() && tags.indexOf(t._id.toString())<0){
                        tags.push(t._id.toString())
                        change=true;
                    }
                    /*console.log(t)
                    console.log(typeof  t._id)
                    console.log(typeof  t.brand)*/
                })

                //console.log('change',change)
                if(change){
                    brandsForUpdate[b._id]={tags:tags}
                }
            })
           /* brands.forEach(function(brand){
                b=brands.toObject();
                b.tags.forEach(function(t){console.log(typeof  t)})
            })*/
           //console.log(brandsForUpdate)
           //console.log(brandTagsForUpdate)
        })
        .then(function(){
            return forEach(brands, function * (brand, idx) {
                console.log(brand)
                if(!brand.url){
                    brand.url = yield getUrl.create(Brand,req.store._id,brand.name)
                    brandsForUpdate[brand._id]={url:brand.url}
                }

            })
        })
        .then(function(){
                let acts=[];
                acts.push(myUtil.getPromiseForUpdateInDB(brandTagsForUpdate,BrandTags))
                acts.push(myUtil.getPromiseForUpdateInDB(brandsForUpdate,Brand))
                return Promise.all(acts)

        })
        .then(function(){
           res.json({ms:'ok'})

        })

        .catch(function (err) {
            return next(err)
        })
}

function fixStuff(req,res,next) {
    //res.json({ms:'OK brand'})
    let stuffsForUpdate={},stuffs,filterTags=[];
    var groups=[];
    var caregories=[];
    var caregoriesO={};
    Promise.resolve()
        .then(function () {
            return new Promise(function (rs,rj) {
                let options={req:{store:{lang:'ru'}},criteria:{store:req.store._id}}
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

        })
        .then(function () {
            return new Promise(function (rs,rj) {
                Stuff.find({store:req.store._id})
                    .populate('category','name nameL')
                    .populate('brand','name nameL')
                    .populate('brandTag','name nameL')
                    .lean().exec(function(err,items){
                    if(err){rj(err)}
                    stuffs=items
                    rs()
                })
            })
        })
        .then(function () {
            return new Promise(function (rs,rj) {
                FilterTags.find({store:req.store._id}).lean().exec(function(err,items){
                    if(err){rj(err)}
                    filterTags=items.reduce(function(o,item){ o.push(item._id.toString());return o},[])
                    rs()
                })
            })
        })
        .then(function () {
            //console.log('stuffs.length',stuffs.length)
            stuffs.forEach(function(item){
                if(item.stock){
                    let ch=false;
                    let keys=Object.keys(item.stock)
                    let stock = {}
                    for(let key in item.stock){
                        if(!key || filterTags.indexOf(key)<0){
                            //console.log(item.name)
                            ch=true;
                        }else{
                            stock[key]=item.stock[key]
                        }
                    }
                    if(ch){
                        if(!stuffsForUpdate[item._id]){stuffsForUpdate[item._id]={}}
                        stuffsForUpdate[item._id].stock=stock;
                    }
                }
            })
        })
        .then(function(){
            return forEach(stuffs, function * (item, idx) {
                if(!item.url){
                    item.url = yield getUrl.create(Stuff,req.store._id,item.name+((item.artikul)?' '+item.artikul:''))
                    if(!stuffsForUpdate[item._id]){stuffsForUpdate[item._id]={}}
                    stuffsForUpdate[item._id].url=item.url;
                }
                if(!item.link){
                    //console.log(item.name)
                    let category=(item.category && item.category[0])?item.category[0]:item.category;
                    if(category._id){
                        category=category._id;
                    }
                    if(caregoriesO[category]){
                        let categoryUrl=caregoriesO[category].url
                        let groupUrl=caregoriesO[category].groupUrl;
                        item.link='/'+groupUrl+'/'+categoryUrl+'/'+item.url;
                        if(!stuffsForUpdate[item._id]){stuffsForUpdate[item._id]={}}
                        stuffsForUpdate[item._id].link=item.link;
                    }
                    console.log(item.link)
                }


                if(!item.keywords || typeof item.keywords!='object' || !Object.keys(item.keywords).length){
                    let doc = item;
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
                        if(doc.artikul){
                            keywords['ru']+=' '+doc.artikul;
                        }
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
                    if(!stuffsForUpdate[item._id]){stuffsForUpdate[item._id]={}}
                    stuffsForUpdate[item._id].keywords=keywords;
                    console.log(keywords)

                }




            })
        })
        .then(function(){
            let acts=[];
            //console.log(stuffsForUpdate)
            acts.push(myUtil.getPromiseForUpdateInDB(stuffsForUpdate,Stuff))
            return Promise.all(acts)

        })
        .then(function(){
            res.json({ms:'ok'})

        })

        .catch(function (err) {
            return next(err)
        })
}