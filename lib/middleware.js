'use strict';
//

var request = require('request');
var config=require('./config/config' )
const domainHost=require('../modules/host/host' );
const domainHostSplit=domainHost.domain.split('.');
const ipHost=require('../modules/ip/ip' );
const ports=require('../modules/ports' );
const urlForStores = (ipHost && ipHost.local)?'http://'+ipHost.remote_ip+':'+ports.storePort:'http://'+ipHost.ip+':'+ports.storePort;
const urlForHost = (ipHost && ipHost.local)?'http://'+ipHost.remote_ip:'http://'+ipHost.ip;
const  photoDownloadHost= (ipHost.photo_ip)?'http://'+ipHost.photo_ip+':'+ports.photoDownloadPort:'';
const  photoUploadHost= (ipHost.photo_ip)?'http://'+ipHost.photo_ip+':'+ports.photoUploadPort:'http://'+ipHost.remote_ip+':'+ports.photoUploadPort;
const socketHost = 'http://'+ipHost.remote_ip+':'+ports.socketPort;


const handleLanguageStore=require('../modules/handleLanguageStore')
const setDataForStore=require('../modules/setDataForStore')

//console.log(domainHostSplit,ipHost,ports);

var tmpFileName;


var url=require('url');
var phantom=require('node-phantom-simple');
//require('phantomjs-polyfill')
var fs=require('fs')

var MobileDetect = require('mobile-detect')

var globalVar=require('../public/scripts/globalVariable.js')

var i=0;
var cache=require('../lib/cache');
var moment = require('moment');
var query;
var filesExt=['jpeg','jpg', 'gif', 'png','pdf','js','css','html','ttf','woff','woff2','svg','eot','map']
const isWin = /^win/.test(process.platform);
module.exports = {
    cutFiles:function(req, res, next){
        var urlParse = url.parse(req.url);
        var urlparams =decodeURIComponent(urlParse.pathname);
        if(urlparams.indexOf('{{')>-1){
            console.log('запрос -',urlparams)
            return res.sendStatus(404)
        }
        var prsUrlparams=urlparams.split('/');
        if (prsUrlparams[prsUrlparams.length-1]){
            tmpFileName=prsUrlparams[prsUrlparams.length-1].split('.');
            if (tmpFileName.length>1 && filesExt.indexOf(tmpFileName[tmpFileName.length-1])>-1){
                console.log('ищет файл -',urlparams)
                return res.sendStatus(404)
            }else if(tmpFileName[0]=='undefined'){
                console.log('запрос -',urlparams)
                return res.sendStatus(404)
            }
        }
        next();
    },
    getStore:function(req, res, next){
        let clientIp = req.headers['x-real-ip'] || req.headers['X-Real-IP'] || (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress
        if (req.query.subDomain) {
            query = {subDomain: req.query.subDomain};
            req.crawler = true;
        } else {
            var subDomain = req.headers.host.split( '.' );
            if(subDomain[0] && subDomain[0].toLowerCase()=='www'){
                subDomain.shift()
            }
            if (subDomain[subDomain.length - 1] == 'localhost:8909') {
                subDomain[subDomain.length - 1] = domainHostSplit[0]//'gmall';
                subDomain[subDomain.length] = domainHostSplit[1]//'io';
            }
            if (subDomain.length == 2) {
                query = {domain: subDomain.join( '.' )}
            }else if (subDomain.length == 3 && subDomain[1]!=domainHostSplit[0]) {
                query = {domain: subDomain.join( '.' )}
            }else {
                query = {subDomain: subDomain[0]}
            }

        }
        if(query && query.subDomain && query.subDomain.toLowerCase){
            query.subDomain=query.subDomain.toLowerCase()
        }


        let params = req.url.split('/')

        let adminRequest=((params.length && globalVar.reservedFirstParamsForAdmin.indexOf(params[1])>-1)||req.url=='/api/makeMainCSS')?true:false;

        var keyRequest=query.subDomain+((req.query.lang)?'@'+req.query.lang:'@nolang');
        req.keyRequest=keyRequest;

        if(cache.storeList && cache.storeList[query.subDomain]  && !adminRequest ){
            try{
                req.store=JSON.parse(JSON.stringify(cache.storeList[query.subDomain]));
                processWithStore()
                try{
                    var urii = decodeURIComponent(req.url.split('#')[0])
                }catch(err){
                    next()
                }
                if(req.store.redirect && req.store.redirect.urls && req.store.redirect.urls[urii]){
                    console.log('redirect from ',urii)
                    return res.redirect(req.store.redirect.urls[urii])
                }else{
                    return next();
                }
            }catch(err){
                console.log(err)
            }
        }
        //query.langPage={name:"gmall.home"};

        if(req.query.lang){query.lang=req.query.lang}

        //console.log('urlForStores',urlForStores)

        request.post({url:urlForStores+"/api/getstore", form: query}, function(err,response){
            //console.log(err)
            if(err){return next(err)}
            try{
                req.store=JSON.parse(response.body);
                setDataForStore(req.store,adminRequest)
                if(!req.store || !req.store.subDomain){
                    let err = new Error('no existing subdomain')
                    next(err)
                }
                processWithStore()
                try{
                    var urii = decodeURIComponent(req.url.split('#')[0])

                }catch(err){
                    next()
                }
                if(req.store.redirect && req.store.redirect.urls && req.store.redirect.urls[urii]){
                    console.log('redirect from ',urii)
                    return res.redirect(req.store.redirect.urls[urii])
                }else{
                    return next();
                }
            }catch(err){
                console.log(err)
                return next(err)
            }
        })


        function processWithStore() {
            req.store.clientIp=clientIp;
            if(req.query.lang){req.store.lang=req.query.lang}
            req.addVar= req.store.addVar
            req.storeHost=req.store.storeHost;
            req.orderHost=req.store.orderHost;
            req.stuffHost=req.store.stuffHost;
            req.userHost=req.store.userHost;
            req.photoHost=req.store.photoHost;
            req.photoUpload=req.store.photoUpload
            req.notificationHost=req.store.notificationHost;
            req.socketHost=req.store.socketHost;
            req.local=(req.hostname.indexOf('localhost')>-1)?true:false;
            req.store.local= req.local;
            handleLanguageStore(req.store,req.query.lang)
            if(cache.langsList['gmall.home'] && cache.langsList['gmall.home'].tags){
                req.store.langData={};
                for(let k in cache.langsList['gmall.home'].tags){
                    //console.log(results[0])
                    req.store.langData[k]=cache.langsList['gmall.home'].tags[k][req.store.lang]
                }
                //console.log(req.store.langData)

            }
            if(cache.langsList['index.error'] && cache.langsList['index.error'].tags){
                req.store.langError={};
                for(let k in cache.langsList['index.error'].tags){
                    req.store.langError[k]=cache.langsList['index.error'].tags[k][req.store.lang]
                }

            }
            if(cache.langsList['index.note'] && cache.langsList['index.note'].tags){
                req.store.langNote={};
                for(let k in cache.langsList['index.note'].tags){
                    req.store.langNote[k]=cache.langsList['index.note'].tags[k][req.store.lang]
                }

            }
            if(cache.langsList['index.order'] && cache.langsList['index.order'].tags){
                req.store.langOrder={};
                for(let k in cache.langsList['index.order'].tags){
                    req.store.langOrder[k]=cache.langsList['index.order'].tags[k][req.store.lang]
                }
                //console.log(req.store.langOrder)
            }
            if(cache.langsList['index.forms'] && cache.langsList['index.forms'].tags){
                req.store.langForm={};
                for(let k in cache.langsList['index.forms'].tags){
                    req.store.langForm[k]=cache.langsList['index.forms'].tags[k][req.store.lang]
                }

            }
        }

    },
    versionBrowser :  function (req, res, next) {

        /*var md = new MobileDetect(req.headers['user-agent']);
        req.tablet=md.tablet();
        req.mobile=md.phone();
        //console.log('tablet ', md.tablet())
        //console.log('phone ',md.phone())
        if (req.useragent.Browser=='IE' && parseFloat(req.useragent.Version)<10){
            return res.redirect('/IE89')
        } else {
            return next();
        }*/
        //return;


        var ua=req.headers['user-agent'],$ = {};
        /*try {
            ua = req.headers['user-agent'].toLowerCase();
        } catch (err) {
            ua = req.headers['user-agent'];
        }*/

       // console.log("req.headers['user-agent']",ua)

      if (/mobile/i.test(ua))
          $.Mobile = true;

      if (/like Mac OS X/.test(ua)) {
          //$.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
          $.iPhone = /iPhone/.test(ua);
          $.iPad = /iPad/.test(ua);
      }
      //console.log(/Android/.test(ua));

      if (/Android/.test(ua))
          $.Android = true;
      // /Android ([0-9\.]+)[\);]/.exec(ua)[1];

      if (/webOS\//.test(ua))
          $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

      if (/(Intel|PPC) Mac OS X/.test(ua))
          $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

      if (/Windows NT/.test(ua)){
          let win22 =/Windows NT ([0-9\._]+)[\);]/.exec(ua)
          if(win22 && win22[1]){
              $.Windows =  win22[1];
          }

      }


     // console.log($);
      if ($.Android || $.iPhone){
          req.mobile=true;
      }
      if($.iPad){
          req.iPad=true;
          req.tablet=true;
      }
        next();
      //console.log(req.useragent)
      /*if (req.useragent.Browser=='IE' && parseFloat(req.useragent.Version)<10){
         return res.redirect('/IE89')
      } else {
          next();
      }*/

      //res.redirect('/ru/login')
  },
    crawler:function (req, res, next) {

        //console.log('req.url from crawler ',req.url);
        var fragment = req.query._escaped_fragment_;
        // var path = req.url;
        var facebook = /facebookexternalhit/.test( req.headers['user-agent'] );
        var google = /google\.com\/\+/.test( req.headers['user-agent'] );
        if (typeof fragment === 'undefined' && !facebook && !google) {
            next();
            return;
        }else{
            req.crawler=true;
        }
        return next();
        var urlParse = url.parse( req.url );
        var urlQuery = urlParse.query;
        var urlparams = urlParse.pathname;
        //console.log(req.hostname,req.url)
        //console.log(decodeURIComponent(urlparams))
        //console.log('!!!!!!!!!!!!!!!!urlparams-',urlparams);
        //var prsUrlparams=decodeURIComponent(urlparams).split('/');
        var prsUrlparams = urlparams.split( '/' );
        //console.log('     индексирование.  url -',decodeURIComponent(urlparams));
        //console.log('prsUrlparams.length-',prsUrlparams.length);
        /*if (prsUrlparams.length>6){return next()}
         if (facebook){
         urlparams=encodeURIComponent(urlparams)
         }*/

        console.log( 'CRAWLER  --   N-', i++ );
        //crawlerInServer=true;
        // webkit ***************
        phantom.create({parameters:{'load-images':'no','disk-cache':'yes'}}, function (err, ph) {
            //console.log('     ph - ',err);
            //console.log(ph)
            return ph.createPage( function (err, page) {
                //console.log('     page -',err)
                //console.log("http://"+req.store.subDomain+".127.0.0.1:8909/" + urlparams);
                //console.log("http://localhost:8909"+ urlparams+"?subDomain="+req.store.subDomain)
                console.log("http://"+req.store.subDomain+".localhost:8909" + urlparams)
                console.log('req.host from crawler ',req.hostname)
                page.onConsoleMessage = function(msg, lineNum, sourceId) {

                    console.log('CONSOLE: ' + JSON.stringify(msg) + ' (from line #' + lineNum + ' in "' + sourceId + '")');
                };
                //"http://"+req.store.subDomain+".localhost:8909"
                return page.open( "http://localhost:8909" + urlparams+"?subDomain="+req.store.subDomain, function (status) {
                    //crawlerInServer=false;
                    console.log('status -',status);
                    //if (!status) return  next(new Error('Crawler\'s server internal error !'));
                    // console.log('status -',status,' crawlerInServer-',crawlerInServer);
                    return page.evaluate( (function () {
                        //console.log('ddddddddddddddddd')
                        // We grab the content inside <html> tag...
                        return document.getElementsByTagName( 'html' )[0].innerHTML;
                    }), function (err, result) {
                        // ... and we send it to the client.
                        // console.log('err -',err)
                        // console.log(result)
                        //crawlerInServer=false;
                        res.send( result );
                        return ph.exit();
                    } );
                } );
            } );
        } );
        //***********************
        var date = new Date().toISOString().replace( /T/, ' ' ).replace( /\..+/, '' );
        var s = date + "\t" + decodeURIComponent( urlparams ) + "\t\n";
        fs.appendFile( 'crawling.log', s, function (err, data) {
            if (err) throw error;
        } );

        /* if(typeof(req.query._escaped_fragment_) !== "undefined") {

         } else {
         next();
         }*/

    }
};


