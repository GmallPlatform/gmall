'use strict';

const domainHost=require('./host/host' );
const domainHostSplit=domainHost.domain.split('.');
const ipHost=require('./ip/ip' );
const ports=require('./ports' );
const urlForStores = (ipHost && ipHost.local)?'http://'+ipHost.remote_ip+':'+ports.storePort:'http://'+ipHost.ip+':'+ports.storePort;
const urlForHost = (ipHost && ipHost.local)?'http://'+ipHost.remote_ip:'http://'+ipHost.ip;
const  photoDownloadHost= (ipHost.photo_ip)?'http://'+ipHost.photo_ip+':'+ports.photoDownloadPort:'';
const  photoUploadHost= (ipHost.photo_ip)?'http://'+ipHost.photo_ip+':'+ports.photoUploadPort:'http://'+ipHost.remote_ip+':'+ports.photoUploadPort;
const socketHost = 'http://'+ipHost.remote_ip+':'+ports.socketPort;

module.exports = setData;

function setData(store,admin){
    if(!store.lang){store.lang='ru'}
    store.mainLang=store.lang;
    if(store.redirect && store.redirect.urls && store.redirect.urls.length){
        store.redirect.urls=store.redirect.urls.reduce(function(o,i){
            if(i.url && i.redUrl){
                o[i.url]=i.redUrl;
            }
            return o;
        },{})
    }
    if(store.seller && !admin){
        delete store.seller.payInfo;
        delete store.seller.mailgun;
    }
    if (!store.domain) {
        store.domain = store.subDomain + '.'+domainHost.domain
    }
    if(!store.protocol){
        store.protocol='http'
    }
    if(!store.logo){
        store.logo='img/logo.png';
    }
    if(!store.favicon || (store.favicon.indexOf&&
        store.favicon.indexOf('http://')>-1)){
        store.favicon='img/favicon.ico';
    }
    var protocol = (store.protocol) ? store.protocol : 'http'
    store.link = protocol +'://'+ store.domain;
    if(!store.formatPrice){
        store.formatPrice=0;
    }
    store.remote_ip = ipHost.remote_ip;
    store.stuffPort=ports.stuffPort;
    store.storePort=ports.storePort;
    store.userPort=ports.userPort;
    store.orderPort=ports.orderPort;
    store.storeHost = urlForHost+':'+ports.storePort;
    store.orderHost = urlForHost+':'+ports.orderPort;
    store.stuffHost = urlForHost+':'+ports.stuffPort;
    store.userHost = urlForHost+':'+ports.userPort;
    store.photoHost = photoDownloadHost;
    store.photoUpload = photoUploadHost
    store.notificationHost = socketHost;
    store.socketHost = socketHost;
    store.addVar={};
    store.addVar.$mainColor=(store.template && store.template.index && store.template.index.mainColor)?store.template.index.mainColor:null;
    store.addVar.$addColor1=(store.template && store.template.index && store.template.index.addColor1)?store.template.index.addColor1:null;
    store.addVar.$addColor2=(store.template && store.template.index && store.template.index.addColor2)?store.template.index.addColor2:null;
    store.addVar.$addColor3=(store.template && store.template.index && store.template.index.addColor3)?store.template.index.addColor3:null;
    store.addVar.$addColor4=(store.template && store.template.index && store.template.index.addColor4)?store.template.index.addColor4:null;
    store.addVar.$backgroundImg=(store.backgroundImg)?'"'+store.photoHost+'/'+store.backgroundImg+'"':null;

    let item=store.template;
    if(typeof item =='object'){
        for(var k22 in item){
            if(typeof item[k22]=='object'){
                for(var k23 in item[k22]){
                    if(item[k22][k23] =='false'){item[k22][k23]=false}else if(item[k22][k23] =='true'){item[k22][k23]=true}
                    if(k23=='parts' && item[k22].parts && item[k22].parts.length){
                        item[k22].parts.forEach(function (p) {
                            if(p.is =='false'){p.is=false}else if(p.is =='true'){p.is=true}
                        })
                    }
                    if(typeof item[k22][k23]=='object' && k23!='parts'){
                        for(var k24 in item[k22][k23]){
                            if(item[k22][k23][k24] && item[k22][k23][k24] ==='false'){item[k22][k23][k24]=false}else if(item[k22][k23][k24] && item[k22][k23][k24] ==='true'){item[k22][k23][k24]=true}
                            if(k24=='parts' && item[k22][k23].parts && item[k22][k23].parts.length){
                                item[k22][k23].parts.forEach(function (p) {
                                    if(p.is =='false'){p.is=false}else if(p.is =='true'){p.is=true}
                                })
                            }
                            if(typeof item[k22][k23][k24]=='object' && k24!='parts'){
                                for(var k25 in item[k22][k23][k24]){
                                    if(item[k22][k23][k24][k25] && item[k22][k23][k24][k25] ==='false'){item[k22][k23][k24][k25]=false}else if(item[k22][k23][k24][k25] && item[k22][k23][k24][k25] ==='true'){item[k22][k23][k24][k25]=true}
                                    if(k25=='parts'&& item[k22][k23][k24].parts&& item[k22][k23][k24].parts.length){
                                        item[k22][k23][k24].parts.forEach(function (p) {
                                            if(p.is =='false'){p.is=false}else if(p.is =='true'){p.is=true}
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}