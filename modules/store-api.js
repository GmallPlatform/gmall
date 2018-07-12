var request=require('request');



const ipHost=require('../modules/ip/ip' );
const ports=require('../modules/ports' );
const urlForStores = 'http://'+ipHost.ip+':'+ports.storePort;
const urlForStoresForLocal = (ipHost && ipHost.local)?'http://'+ipHost.remote_ip+':'+ports.storePort:'http://'+ipHost.ip+':'+ports.storePort;



const moment= require('moment');
let cache={};
const seconds = 30;
module.exports = {
    getStore: function (req, res, next) {
        //console.log('req.url',req.url)
        var store = (req.body.store) ? req.body.store : (req.params.store || req.query.store)
        //console.log(config.storeHost)
        //
        let urll=urlForStores + "/api/collections/Store/" + store;
        if(req.onPhotoHost && ipHost && ipHost.local){
            urll = urlForStoresForLocal + "/api/collections/Store/" + store;
        }

        //console.log(urll)
        try{
            if(cache && cache[urll] && cache[urll].exp && moment().unix()<cache[urll].exp){
                req.store = JSON.parse( cache[urll].store);
                if(req.query.lang && req.store.langArr && req.store.langArr.length && req.store.langArr.indexOf(req.query.lang)>-1){
                    req.store.lang=req.query.lang;
                }
                //console.log('store from cache');
                return next()
            }
        }catch(err){console.log(err)}


        request.get( {url: urll}, function (err, response) {
            //console.log('err,response.body ',err,response.body)

            if (err) {
                return next( err )
            }
            try {
                req.store = JSON.parse( response.body );
                if (!req.store.lang) {
                    req.store.lang = 'ru'
                }
                //console.log(req.query)
                if(req.query.lang && req.store.langArr && req.store.langArr.length && req.store.langArr.indexOf(req.query.lang)>-1){
                    req.store.lang=req.query.lang;
                }
                if (!req.store.domain) {
                    req.store.domain = req.store.subDomain + '.gmall.io'
                }
                if (!req.store.protocol) {
                    req.store.protocol = 'http'
                }
                var protocol = (req.store.protocol) ? req.store.protocol : 'http'
                req.store.link = protocol + '://' + req.store.domain;
                //console.log( 'req.store.link -', req.store.link )
                if(!cache[urll]){cache[urll]={}}
                cache[urll].exp=moment().add(seconds, 'seconds').unix()
                cache[urll].store=JSON.stringify(req.store);
                next();
            } catch (err) {
                return next( err )
            }
        } )
    },
    getStoreById: function (id, next) {
        //console.log('getStoreById',id)
        var urll = urlForStores + "/api/collections/Store/" + id;
        request.get( {url: urll}, function (err, response) {
            //console.log('err,response.body ',err,response.body)

            if (err) {
                return next( err )
            }
            try {
                var store = JSON.parse( response.body );
                if (!store.lang) {
                    store.lang = 'ru'
                }
                //console.log(req.query)
                if (!store.domain) {
                    store.domain = store.subDomain + '.gmall.io'
                }
                if (!store.protocol) {
                    store.protocol = 'http'
                }
                var protocol = (store.protocol) ? store.protocol : 'http'
                store.link = protocol + '://' + store.domain;
                next(null,store);
            } catch (err) {
                return next( err )
            }
        } )
    },
    getStoreByIdPromise: function (id) {
        var urll = urlForStores + "/api/collections/Store/" + id;
        return new Promise(function (rs,rj) {
            request.get( {url: urll}, function (err, response) {
                //console.log('err,response.body ',err,response.body)

                if (err) {
                    return rj( err )
                }
                try {
                    var store = JSON.parse( response.body );
                    if (!store.lang) {
                        store.lang = 'ru'
                    }
                    //console.log(req.query)
                    if (!store.domain) {
                        store.domain = store.subDomain + '.gmall.io'
                    }
                    if (!store.protocol) {
                        store.protocol = 'http'
                    }
                    var protocol = (store.protocol) ? store.protocol : 'http'
                    store.link = protocol + '://' + store.domain;
                    rs(store);
                } catch (err) {
                    return rj( err )
                }
            } )
        })

    },
    getStoreSubDomain: function (req, res, next) {
        var url=urlForStores+"/api/getstore";
        let query = {subDomain: req.params.subDomain};
        query.langPage={name:"gmall.home"};
        if(req.params.lang){query.lang=req.params.lang}
        request.post({url:url, form: query}, function(err,response){
            if(err){return next(err)}
            try{
                req.store=JSON.parse(response.body);
                //console.log(req.store)
                //console.log('req.store.subDomain- getStore request.post ',req.store.subDomain)
                if(!req.store || !req.store.subDomain){
                    let err = new Error('no existing subdomain')
                    next(err)
                }
                if (!req.store.domain) {
                    req.store.domain = req.store.subDomain + '.gmall.io'
                }
                if(!req.store.protocol){
                    req.store.protocol='http'
                }
                if(!req.store.logo){
                    req.store.logo='img/logo.png';
                }
                if(!req.store.favicon || (req.store.favicon.indexOf&&
                    req.store.favicon.indexOf('http://')>-1)){
                    req.store.favicon='img/favicon.ico';
                }
                var protocol = (req.store.protocol) ? req.store.protocol : 'http'
                req.store.link = protocol +'://'+ req.store.domain;
                //console.log('req.store.link -',req.store.link,req.url )
                next();
            }catch(err){
                return next(err)
            }
        })
    }

}