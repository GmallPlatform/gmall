'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var domain = require('domain');
var ObjectID = mongoose.Types.ObjectId;
var path = require('path');
var Store = mongoose.model('Store')
var Seller = mongoose.model('Seller')
var request=require('request')

var Lang = mongoose.model('Lang')
var config=require('../config/config' );
var fs=require('fs')
var co=require('co')
var cache={};

const ipHost=require('../../modules/ip/ip' );
const ports=require('../../modules/ports' );
const  photoUploadHost= (ipHost.photo_ip)?'http://'+ipHost.photo_ip+':'+ports.photoUploadPort:'http://'+ipHost.remote_ip+':'+ports.photoUploadPort;


exports.getStore=function(req,res,next){
    //console.log('req.connection.remoteAddress',req.connection.remoteAddress)
    //console.log(req.body);
    let langPage;
    if(req.body.langPage){
        langPage=req.body.langPage;
        delete req.body.langPage;
    }
    let lang;
    if(req.body.lang){
        lang=req.body.lang;
        delete req.body.lang;
    }
    /*console.log('langPage-',langPage)
    console.log('lang-',lang)*/
    //console.log('lang-',lang)
    Store.findOne(req.body)
        //.lean()
        //.populate( 'template')
        .populate('seller')
        .populate('redirect')
        .exec( function (err, store) {
            if(err){return next(err)}
            //console.log(store.template)
            if(!store){
                console.log('!store api 43',req.body)
                return res.json({})
            }
            let mainLang=store.lang;
            //console.log('lang',lang)
            store.handleLanguage(lang);
            store = store.toObject();
            store.mainLang=mainLang;
            if(store.seoL && store.seoL[store.mainLang]){
                store.seo=store.seoL[store.mainLang];
            }
            //console.log(store.redirect)
            if(store.redirect && store.redirect.urls && store.redirect.urls.length){
                store.redirect.urls=store.redirect.urls.reduce(function(o,i){
                    if(i.url && i.redUrl){
                        o[i.url]=i.redUrl;
                    }
                    return o;
                },{})
            }

            if(!langPage){
                return res.json(store);
            }
            //console.log(store.redirect.urls)

            Lang.findOne(langPage).lean().exec(function(err,lang){
                let d= store;
                if(lang && lang.tags){
                    d.langData={};
                    for(let k in lang.tags){
                        //console.log(results[0])
                        d.langData[k]=lang.tags[k][store.lang]
                    }

                }
                res.json(d)
            })

        })
}

exports.uploadStore=function(req,res,next){
    var Seller = mongoose.model('Seller')
    //console.log(config)
    co(function* () {
        let store = yield getObject(Store,req.params.id)
        if(!store){throw 'nothing to upload'}
        let folder = './public/stores/'+store.subDomain;
        try {
            fs.accessSync(folder, fs.F_OK);

        } catch (e) {
            fs.mkdirSync(folder);
        }
        fs.writeFileSync(folder+'/store.json',JSON.stringify(store, null, ' '))
        let seller = yield getObject(Seller,store.seller)
        fs.writeFileSync(folder+'/seller.json',JSON.stringify(seller, null, ' '))
        res.json({})
    }).catch(next)



}

function getObject(Model,id) {
    return new Promise(function (rs,rj) {
        Model.findById(id).exec(function (err,store) {
            if(err){return rj(err)}
            rs(store)
        })
    })
}

exports.readStore=function(req,res,next){
    console.log(req.params)


    co(function* () {
        let storeTarget = yield getObject(Store,req.params.id)
        if(!storeTarget){throw 'nothing to read'}
        let file = './public/stores/'+req.query.subDomain+'/store.json'
        //console.log(file)
        try{
            let data = fs.readFileSync(file);
            let store = JSON.parse(data);
            //console.log(store)
            let upadateData={};
            let folders=[];
            let photos=[];
            folders.push('/images/'+storeTarget.subDomain+'/Store/'+storeTarget._id)
            for(let k in store){
                if(k!='owner' && k!='seller' && k!='name' && k!='domain' && k!='subDomain'&& k!='_id'){
                    if(k=='favicon'||k=='logo'||k=='logoInverse'||k=='fbPhoto'||k=='background'||k=='allCategories'||k=='emptyList'
                        ||k=='nophoto'||k=='dateTimeImg'|| k=='backgroundImg'||k=='copyrightImg'){
                        if(store[k]){
                            let parts = store[k].split('/')
                            //console.log(parts)
                            parts[1]=storeTarget.subDomain;
                            parts[3]=storeTarget._id;
                            let newPath=parts.join('/');
                            photos.push([store[k],newPath]);
                            store[k]=newPath;
                        }
                    }
                    upadateData[k]=store[k]
                }
            }
            //console.log(photos)
            delete upadateData.name
            delete upadateData.nameL
            delete upadateData.owner
            delete upadateData.feedbackEmail
            delete upadateData.pinterest
            delete upadateData.counters
            delete upadateData.yandex
            delete upadateData.fbId
            delete upadateData.glId
            delete upadateData.redirect
            delete upadateData.turbosms
            delete upadateData.alphasms

            delete upadateData.payData
            delete upadateData.onlinePay
            delete upadateData.onlinePayEntry
            delete upadateData.googleAnalytics
            delete upadateData.glPlaceId
            delete upadateData.glMap
            delete upadateData.fb
            delete upadateData.gl
            delete upadateData.vk
            delete upadateData.disqus
            delete upadateData.googleSearchConsole

            Store.update({_id:storeTarget._id},{$set:upadateData},function(err,result){
                if(err){return next(err)}
                //let url=photoUploadHost+'/api/copyPhotos'
                let url='http://127.0.0.1:3300'+'/api/copyPhotos'
                //console.log(url,config)
                /**/
                console.log('url',url);
                /*console.log(photos)
                console.log('folders',folders)*/
                request.post({url:url,form:{folders:folders,photos:photos,subDomain:storeTarget.subDomain}}, function(error,data){
                    if(error){
                        console.log(error)
                        next(error)
                    }else{
                        try{
                            var data=JSON.parse(data.body);
                            console.log(data)
                            res.json(data)
                        }catch(err){
                            console.log(err)
                            next(err)
                        }

                    }

                })

            })

        }catch(err){
            console.log(err)
            next(err)
        }
    }).catch(next)

}
function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}
exports.getSubDomains=function(req,res,next){
    let srcpath = './public/stores/'
    try{
        res.json(getDirectories(srcpath))
    }catch(err){
        next(err)
    }
}



exports.cloneStore=function(req,res,next){
    res.json(req.body)

}


exports.deleteStore=function(req,res,next){
    if(!req.store || !req.store._id ){
        return next("can't delete" )
    }
    let store=req.store._id;
    //console.log('store',req.store.seller)
    let seller =(req.store.seller && req.store.seller._id)?req.store.seller._id:null;
    deleteModels()
        .then(function () {
            res.json({msg:'ok'})
        })
        .catch(function (err) {
            next(err)
        })
    async function deleteModels () {
        if(seller){
            await new Promise(function (rs,rj) {
                Seller.findOneAndRemove({_id:seller}, function (err) {
                    if (err) {
                        return rj(err)
                    }
                    return rs()
                })
            })
        }
        if(store){
            await new Promise(function (rs,rj) {
                Store.findOneAndRemove({_id:store}, function (err) {
                    if (err) {
                        return rj(err)
                    }
                    return rs()
                })
            })
        }

    }
}

exports.getTemplates=function (req,res,next) {
    Store.find({storeType:'template'},function (err,stores) {
        if(err){return next(err)}
        if(stores && stores.length){
            stores=stores.map(function (s) {
                let o={}
                o.subDomain=s.subDomain
                o.name=s.name;
                o.template=s.template
                return o;
            })
        }
        res.json(stores)
    })
}














