'use strict';
var cache=require('../cache');
var cachePugFunctions=require('../cachePugFunctions');
var pugCache=require('../pugCache');
if(!cache.lang){
    cache.lang={};
}

/*
* //function gtag() {dataLayer.push(arguments);}
 //gtag('js', new Date());
 //gtag('config', !{JSON.stringify(store.googleAnalytics)});
 //gtag('config', "UA-66525516-1");
 */
var globalVar=require('../../public/scripts/globalVariable.js')
var DesignQuery=require('../../public/scripts/designQuery.js')
var DesignQueryOld=require('../../public/scripts/designQueryOld.js')
var SectionClass=require('../../public/scripts/SectionClass.js')
var allDataIndex=require('../../stuff/controllers/getAllData.js')
//var viber=require('../controllers/api/viber.js')
var middleware = require('../middleware');

/* модуди */
const getPartWithKey = require('../modules/getPartWithKey');
const getCSSForBlock = require('../modules/getCSSForBlock');
const getMainCSS = require('../modules/getMainCSS');
const getHeader = require('../modules/getHeader');
const getFooter = require('../modules/getFooter');
const getHomePageHtml = require('../modules/getHomePageHtml');
const mixinArgsDefine = require('../modules/mixinArgsDefine');
const getStuffDetailPageHTML = require('../modules/getStuffDetailPageHTML');
const getStuffsListPageHTML = require('../modules/getStuffsListPageHTML');
const getItemPage = require('../modules/getItemPage');
const getItemsForPage = require('../modules/getItemsForPage');
const getItemPageHTML = require('../modules/getItemPageHTML');
const getItemsPageHTML = require('../modules/getItemsPageHTML');
const getPriceHTML = require('../modules/getPriceHTML');
const hangleBlocksForPugCompile = require('../modules/hangleBlocksForPugCompile');
const userRedirect = require('../modules/userRedirect');
const setDataForStore=require('../../modules/setDataForStore')

let data404=require('../data404');

var request=require('request');
var config=require('../config/config' );
//var jade=require('jade');
var pug=require('pug');
var path=require('path');
var fs=require('fs');
var zlib = require('zlib');
var isWin = /^win/.test(process.platform);
var StuffClass=require('../../public/scripts/stuffClass.js')

var mkdirp = require('mkdirp');
fs.mkdirParentPromise = function(dirPath) {
    return new Promise(function (rs, rj) {
        mkdirp(dirPath, function (err) {
            if (err) {
                rj(err)
            }
            else {
                rs()
            }
        });
    })
}



if(!isWin){
    var mongoose = require('mongoose');
    var Group=mongoose.model('Group');
    var Brand=mongoose.model('Brand');
    var Stat=mongoose.model('Stat');
    var Paps=mongoose.model('Paps');
    var Coupon=mongoose.model('Coupon');
    var Witget=mongoose.model('Witget');
    var Master=mongoose.model('Master');
    var Keywords=mongoose.model('Keywords');
    var Seopage=mongoose.model('Seopage');
    var HomePage=mongoose.model('HomePage');
    var Campaign=mongoose.model('Campaign');
    var Stuff=mongoose.model('Stuff');
    var News=mongoose.model('News');
    var Filter=mongoose.model('Filter');
    var FilterTags=mongoose.model('FilterTags');
    var BrandTags = mongoose.model('BrandTags');
    var Info=mongoose.model('Info');
    var Label=mongoose.model('Label');
}

var HPBlocks=['left','right','header']
var getNameProperty=globalVar.getNamePropertyCSS;


const util = require('util');
const sass = require('node-sass');
var i=0;
var lengthStyleBlock=globalVar.lengthStyleBlock+1;//+1 = $hover-background-color



var template,menu1Key,menu2Key,footerKey;

var moment = require('moment');

var co=require('co')

var sizeof = require('object-sizeof');



function activate(){
    globalVar.home=globalVar.listOfBlocksForMainPage
    globalVar.header=globalVar.listOfBlocksForHeader;
    globalVar.footer=globalVar.listBlocksForFooter;
    globalVar.stat=globalVar.listOfBlocksForStats;
    globalVar.stuffDetail=globalVar.listOfBlocksForStuffDetail;
    globalVar.stuffDetailBlocks=globalVar.listOfBlocksForStuffDetailBlocks;
    globalVar.stuffDetailBlocks['button']='button';
    globalVar.stuffs=globalVar.listOfBlocksForStuffList;
    globalVar.stat=globalVar.listOfBlocksForStaticPage;
    globalVar.news=globalVar.listOfBlocksForNewsDetailPage;
    globalVar.list={'list':'list'}
    globalVar.price={'price':'price'}
    globalVar.info={'info':'info'}
    globalVar.cart={'cart':'cart'}
    globalVar.paps={'paps':'paps'}
    globalVar.dateTime={'dateTime':'dateTime'}
    globalVar.campaign={'campaign':'campaign'}
    globalVar.search={'search':'search','stuff':'stuff','list':'list','empty':'empty'}
    globalVar.index={'arrowDown':'arrowDown','arrowUp':'arrowUp','button':'button',
        'dimScreen':'dimScreen','link':'link','modalProject':'modalProject','modalBackdropClass':'modalBackdropClass',
        'slideMenu':'slideMenu','slideChat':'slideChat','slideCart':'slideCart','slideMenuHum':'slideMenuHum','icon':'icon','addbutton':'addbutton',
        'animated':'animated','animateforall':'animateforall','zoom':'zoom','chat':'chat','datetime':'datetime','campaign':'campaign','cabinet':'cabinet',
        'toasterError':'toasterError','toasterInfo':'toasterInfo'}

    function getData(gType){
        let suffix=(gType!='header'&& gType!='footer')?'partials/':'';
        let homePath = path.join( __dirname, '../../public/views/template/'+suffix+gType+'/' );
        let HPKeys = Object.keys(globalVar[gType]);
        if(gType=='header'){
            HPKeys.push('menu1','menu2','humburgerL','humburgerR')
        }
        if(gType=='list'){
            HPKeys.push('listmobile','listtablet','cart')
        }
        if(gType=='footer'){
            HPKeys.push('footer')
        }
        if(gType=='home'){

            HPKeys.push('right','left','top','rows','twoRows','oneRows',
                'map1','map2','bannerOne','name','text2','feedback1','feedback2','masters','video1','video2','videoLink','sn','seoDesc','blabla')
        }
        if(gType=='stat'){
            //HPKeys.push('stat','imgs')
            HPKeys=['stat']
        }
        if(gType=='stuffs'){
            //HPKeys.push('stat','imgs')
            HPKeys.push('seoDesc')
            HPKeys.push('cart')
        }
        if(gType=='stuffDetail'){
            HPKeys.push('stuffDetail')
        }
        if(gType=='news'){
            //HPKeys.push('news','imgs')
            HPKeys=['news']
        }
        if(gType=='cart'){
            //HPKeys.push('news','imgs')
            HPKeys.push('cartslide')
        }

        HPKeys.forEach(function(type){

            for(let i=0;i<25;i++){
                let s='',sCSS='';
                if(i){
                    s=i;
                    sCSS=i;
                }
                let fileName;
                if(gType=='home' || gType=='header' || gType=='footer'|| gType=='stat'|| gType=='news'||
                        gType=='stuffs' || gType=='stuffDetail'|| gType=='paps' ||
                    gType=='list'|| gType=='search'){
                    fileName= path.join(homePath,type,'/',type+s+'.jade');
                }else{
                    fileName= path.join(homePath,type,'/',type+s+'.html');
                }

                let fileNameCSS=  path.join(homePath,type,'/',type+sCSS+'.css');
                try{
                    let tab="    "
                    let dataForRender = fs.readFileSync(fileName, "utf8")
                    pugCache[gType+type+s]=dataForRender;
                    //pugCache[gType+type+s] =dataForRender.split('\n').filter(function(e){return e;}).map(function (l) {return tab+l}).join('\n')
                } catch (e) {

                }
                try{
                 let dataForRender = fs.readFileSync(fileNameCSS, "utf8")
                 pugCache[gType+type+sCSS+'CSS']=dataForRender;
                 } catch (e) {

                }

            }

            let fileName= path.join(homePath,type,'/',type+'class.scss');

            try{
                let dataForRender = fs.readFileSync(fileName, "utf8")
                pugCache[gType+type+'class']=dataForRender;
            } catch (e) {

            }
            globalVar.elementsList.forEach(function (el) {
                let fileName= path.join(homePath,type,'/',type+el+'.scss');
                try{
                    let dataForRender = fs.readFileSync(fileName, "utf8")
                    pugCache[gType+type+el]=dataForRender;
                } catch (e) {

                }
            })


        })



        /*try{
            let dataForRender = fs.readFileSync(fileName, "utf8")
            pugCache[gType+type+'class']=dataForRender;
        } catch (e) {

        }
        globalVar.elementsList.forEach(function (el) {
            let fileName= path.join(homePath,type,'/',type+el+'.scss');
            try{
                let dataForRender = fs.readFileSync(fileName, "utf8")
                pugCache[gType+type+el]=dataForRender;
            } catch (e) {

            }
        })*/
    }
    function getDataSASS(gType){
        let homePath = path.join( __dirname, '../../public/views/template/'+gType+'/' );
        let HPKeys = Object.keys(globalVar[gType]);
        HPKeys.forEach(function(type){
            for(let i=0;i<22;i++){
                let s='';
                if(i){
                    s=i;
                }
                let fileName= path.join(homePath,type,'/',type+s+'.scss');
                /*if(type=='animated'){
                    console.log(gType+type+s)
                }*/
                try{
                    let dataForRender = fs.readFileSync(fileName, "utf8")
                    pugCache[gType+type+s]=dataForRender;
                } catch (e) {
                    //console.log(e)
                }

            }
        })
    }
    getData('home')
    getData('header')
    getData('footer')
    getData('stuffs')
    getData('stuffDetail')
    getData('stat')
    getData('news')
    getData('list')
    getData('info')
    getData('cart')
    getData('campaign')
    getData('search')
    getData('dateTime')
    getData('paps')
    getData('price')
    getDataSASS('index')





    try{
        let fileName = path.join( __dirname, '../../public/views/content/index.pug' );
        let dataForRender = fs.readFileSync(fileName, "utf8")
        pugCache['contentAdmin']=dataForRender;
    } catch (e) {

    }

    try{
        let fileName = path.join( __dirname, '../../public/views/template/partials/stuffDetail/stuffDetail/stuffDetail-good.jade' );
        let dataForRender = fs.readFileSync(fileName, "utf8")
        pugCache['stuffDetail-good']=dataForRender;
        fileName = path.join( __dirname, '../../public/views/template/partials/stuffDetail/stuffDetail/stuffDetail-info.jade' );
        dataForRender = fs.readFileSync(fileName, "utf8")
        pugCache['stuffDetail-info']=dataForRender;
        fileName = path.join( __dirname, '../../public/views/template/partials/stuffDetail/stuffDetail/stuffDetail-media.jade' );
        dataForRender = fs.readFileSync(fileName, "utf8")
        pugCache['stuffDetail-media']=dataForRender;
        fileName = path.join( __dirname, '../../public/views/template/partials/stuffDetail/stuffDetail/stuffDetail-service.jade' );
        dataForRender = fs.readFileSync(fileName, "utf8")
        pugCache['stuffDetail-service']=dataForRender;
    } catch (e) {
        console.log(e)
    }



    let fileName = path.join( __dirname, '../../public/views/template/css/font-face.mixin.scss' );
    try{
        let dataForRender = fs.readFileSync(fileName, "utf8")
        pugCache['font-faceMixin']=dataForRender;
    } catch (e) {

    }

    fileName = path.join( __dirname, '../../public/views/menu-home-footer.jade' );

    let menuHomefooter=fs.readFileSync(fileName, "utf8")
    pugCache['menuHomefooter']=menuHomefooter;


    pugCache['mainIndexJade']=fs.readFileSync(path.join( __dirname, '../../public/views/index.pug' ), "utf8")

    let keys = Object.keys(globalVar.stuffDetailBlocks);
    let homePath = path.join( __dirname, '../../public/views/template/partials/stuffDetail/blocks' );
    let gType='stuffDetailBlocks'
    keys.forEach(function (type) {
        for(let i=0;i<15;i++){
            let s='',sCSS='';
            if(i){
                s=i;
                sCSS=i;
            }
            let fileName   = path.join(homePath,type,'/',type+s+'.jade')
            let fileNameCSS= path.join(homePath,type,'/',type+sCSS+'.css');

            try{
                let dataForRender = fs.readFileSync(fileName, "utf8")
                pugCache[gType+type+s]=dataForRender;
            } catch (e) {
                //console.log(e)
            }
            try{
                let dataForRender = fs.readFileSync(fileNameCSS, "utf8")
                //console.log(gType+type+sCSS+'CSS')
                pugCache[gType+type+sCSS+'CSS']=dataForRender;
            } catch (e) {
                //console.log(e)

            }

        }

    })
}

async function getStores() {
    const handleLanguageStore=require('../../modules/handleLanguageStore')
    const ipHost=require('../../modules/ip/ip' );
    const ports=require('../../modules/ports' );
    const urlForStores = (ipHost && ipHost.local)?'http://'+ipHost.remote_ip+':'+ports.storePort:'http://'+ipHost.ip+':'+ports.storePort;

    const urll =urlForStores+"/api/collections/Store?perPage=500";
    const urllLang =urlForStores+"/api/collections/Lang?perPage=500";
    try{
        await new Promise(function (resolve,reject) {
            request.get({url:urllLang}, function(err,response){

                if(err){console.log(err)}
                if(response && response.body){
                    try{
                        let langs = JSON.parse(response.body)
                        if(langs && langs.length){
                            langs.shift()
                            if(!cache.langsList){
                                cache.langsList={}
                            }
                            langs.forEach(function (lang) {
                                cache.langsList[lang.name]=lang;
                            })
                            resolve()
                        }
                        //console.log(stores)
                    }catch(err){reject(err)}
                }

            })
        })

        await new Promise(function (resolve,reject) {
            request.get({url:urll}, function(err,response){

                if(err){console.log(err)}
                if(response && response.body){
                    try{
                        let stores = JSON.parse(response.body)
                        if(stores && stores.length){
                            stores.shift()
                            if(!cache.storeList){
                                cache.storeList={}
                            }
                            stores.forEach(function (store) {
                                setDataForStore(store)
                                cache.storeList[store.subDomain]=store;
                            })
                            resolve()
                        }
                        //console.log(stores)
                    }catch(err){reject(err)}
                }

            })
        })
        console.log('done read stores')
        //console.log(cache.langsList)

    }catch(err){
        console.log(err)
    }

}
getStores()


function prepearAllData(o) {
    //console.time('prepearAllData')
    //console.log(o.labels)
    o.brands.forEach(b=>{
        let i = b.tags.length;
        while(i--){
            if(!b.tags[i].actived){
                b.tags.splice(i,1);
            }
        }
    })
    o.group.forEach(function(section){
        if(section && section.categories && section.categories.length){
            section.categories.forEach(function(c){
                c.section={url:section.url,name:section.name}
                c.linkData={groupUrl:section.url,categoryUrl:c.url,
                    searchStr:null,brand:null,brandTag:null,queryTag:null}
                o.categories[c._id]=c.linkData;
            })
        }
        if(section && section.child && section.child.length){
            section.child.forEach(function(subSection){
                if(subSection.categories && subSection.categories.length){
                    subSection.categories.forEach(function(c){
                        c.section={url:section.url,name:section.name,subSectionName:subSection.name,
                            subSectionUrl:subSection.url}
                        c.linkData={groupUrl:section.url,categoryUrl:c.url,parentGroup:subSection.url,
                            searchStr:null,brand:null,brandTag:null,queryTag:null}
                        var parentSection= o.group.getOFA('_id',c.group);
                        if(parentSection && parentSection.url && parentSection.url!=c.section.url){
                            c.parentGroupUrl=parentSection.url;
                        }
                        o.categories[c._id]=c.linkData;
                    })
                }
            })
        }
    })
    o.sectionsMenu=o.group.filter(section=>{
        //console.log(section.name,section.hideSection)
        let is;
        if(section && !section.hideSection){
            if((section.categories && section.categories.length && section.categories.some(c=>!c.notActive))||
                (section.child && section.child.length && section.child.some(ch=>ch.categories&&ch.categories.length&&ch.categories.some(c=>!c.notActive)))){
                return true
            }
        }

    })
    /*console.log('o.sectionsMenu',o.sectionsMenu.length)
    console.log('o.sectionsMenu',o.sectionsMenu[0].name)
    if(o.sectionsMenu[1]){
        console.log('o.sectionsMenu',o.sectionsMenu[1].name)
    }
*/


    o.sectionsMenu=o.sectionsMenu.map(section=>{
        section = JSON.parse(JSON.stringify(section))
        section.id='s'+section._id;
        section.innerId="innerDiv"+section._id
        section.tagHref='/' + section.url + '/category?queryTag='
        section.allCategiriesHref='/' + section.url + '/category'
        if(section.categories && section.categories.length){
            let i = section.categories.length;
            while(i--){
                if(section.categories[i].notActive){
                    section.categories.splice(i,1);
                }else{
                    section.categories[i].href=section.url+'/'+section.categories[i].url;
                }
            }
        }else{
            section.categories=[]
        }

        if(section.categories.length){
            if(section.categories.length<8){
                section.categories1=section.categories;
            }else if(section.categories.length<18){
                section.categories1=section.categories.splice(0,7);
                section.categories2=section.categories
            }else{
                section.categories1=section.categories.splice(0,7);
                section.categories2=section.categories.splice(0,10);
                section.categories3=section.categories
            }

        }

        if(section.child && section.child.length){
            for(let i=0;i<section.child.length;i++){
                if(section.child[i].categories && section.child[i].categories.length){
                    let j = section.child[i].categories.length
                    while (j--) {
                        if(section.child[i].categories[j].notActive){
                            section.child[i].categories.splice(j,1);
                        }else{
                            section.child[i].categories[j].href='/'+section.child[i].url+'/'+section.child[i].categories[j].url;
                        }
                    }
                    if(!section.child[i].categories.length){
                        section.child.splice(i,1);
                        i--;
                    }else{
                        section.child[i].href='/' +section.child[i].url+'/category';
                        section.child[i].tagHref='/' + section.child[i].url + '/category?queryTag='
                    }
                }else{
                    section.child.splice(i,1);
                    i--;
                }
            }
        }else{
            section.child=[]
        }
        if(!section.categories){section.categories=[]}
        if(!section.categories1){section.categories1=[]}
        if(!section.categories2){section.categories2=[]}
        if(!section.categories3){section.categories3=[]}

        if(section.categories.length>1 || section.categories1.length>1 || section.child.length>1 || section.child.some(ch=>ch.categories.length>1)){
            section.innerData=true;
        }else{
            section.href='/'+section.url+'/category';
        }
        //console.log(section.categories)
        return section;
    })

    o.brandsMenu=o.brands.map(function (brand) {
        brand = JSON.parse(JSON.stringify(brand))

        return brand;
    })
    //console.log(o.brandsMenu)
    //o.sectionsMenu.forEach(s=> console.log(s.name))


    HPBlocks.forEach(function(key){
        if(o.homePage[key] && o.homePage[key].length){
            o.homePage[key].forEach(function (block) {
                if(block && block.type=='categories'){
                    block[block.type].forEach(function (c) {
                        if(o.categories && o.categories[c._id]){
                            c.link='/'+o.categories[c._id].groupUrl+'/'+o.categories[c._id].categoryUrl
                        }

                    })
                }

            })
        }

    })
}
function getAllData(store,stuffHost,subDomain,local){
    let preload;
    if(store.preload && store.preload.use){
        preload=true;
    }
    return new Promise(function(resolve,reject){
        if(!local){
            if(cache.stores[store._id] && cache.stores[store._id].dbData && cache.stores[store._id].dbData.exp && moment().unix()< cache.stores[store._id].dbData.exp){
                zlib.unzip(cache.stores[store._id].dbData.data, function(err, buffer) {
                    if (!err) {
                        resolve(buffer)
                    }else{
                        reject(err)
                    }
                });


            }
            let models= [Group,Brand,Stat,Filter,Paps,Seopage,Coupon,Witget,HomePage,Campaign,Master,Info,Label];
            //console.time('getAllDataForIndex')
            allDataIndex.getAllDataForIndex(models,store.lang,store._id,subDomain,preload,function(err,results){
                if(err){return reject(err)}
                try{
                    var o={
                        group:results[0].filter(function(el){return el}),
                        brands:results[1],
                        stats:results[2],
                        filters:results[3],
                        paps:results[4],
                        seopages:results[5],
                        coupons:results[6],
                        witget:results[7],
                        homePage:results[8],
                        campaign:results[9],
                        masters:results[10],
                        info:results[11],
                        labels:results[12],
                        categories:{},
                        preloadPage:results[13]
                    }
                    prepearAllData(o)
                }catch(err){
                    return reject(err)
                }

                zlib.deflate(o, function(err, buffer) {
                    if (!err) {
                        cache.stores[store._id].dbData.data=buffer;
                        let seconds = (store.cache && store.cache.dbData)?store.cache.dbData:100000;
                        cache.stores[store._id].dbData.exp=moment().add(seconds, 'seconds').unix()
                    }
                });

                //console.timeEnd('getAllDataForIndex')
                return resolve(o);
            })
        }else{
            if(cache.stores[store._id] && cache.stores[store._id].dbData && cache.stores[store._id].dbData.exp && moment().unix()< cache.stores[store._id].dbData.exp){
                zlib.unzip(cache.stores[store._id].dbData.data, function(err, buffer) {
                    if (!err) {
                        resolve(buffer)
                    }else{
                        reject(err)
                    }
                });


            }
            let url =stuffHost+"/api/getAllDataForIndex?store="+store._id+"&subDomain="+store.subDomain+"&lang="+store.lang;
            if(preload){
                url +="&preload="+preload;
            }

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

            let req = request.get(options);
            req.on('response', function(res) {
                var chunks = [];
                res.on('data', function(chunk) {
                    chunks.push(chunk);
                });

                res.on('end', function() {
                    var buffer = Buffer.concat(chunks);
                    var encoding = res.headers['content-encoding'];
                    zlib.unzip(buffer, function(err, unzipbuffer) {
                        if (!err) {
                            try{
                                let results =JSON.parse(unzipbuffer.toString('utf8'));
                                var o={
                                    group:results[0],
                                    brands:results[1],
                                    stats:results[2],
                                    filters:results[3],
                                    paps:results[4],
                                    seopages:results[5],
                                    coupons:results[6],
                                    witget:results[7],
                                    homePage:results[8],
                                    campaign:results[9],
                                    masters:results[10],
                                    info:results[11],
                                    labels:results[12],
                                    categories:{},
                                    preloadPage:results[13]
                                }
                                prepearAllData(o)
                                return resolve(o);
                            }catch(err){
                                console.log('error in try',err)
                                return reject(err)
                            }
                        }else{
                            console.log('err',err)
                            reject(err)
                        }
                    });
                });
                res.on('error', function(err) {
                    console.log('msg',err)
                    //reject(err)
                })
            });
        }

    })
}


function getModelDataSearch(model,stuffHost,storeId,query,lang) {
    return new Promise(function(resolve,reject){
        let url = stuffHost+"/api/collections/"+model+"?store="+storeId+'&lang='+lang+'&search='+query;
        request.get({url:url}, function(err,response){
            if(err){return reject(err)}
            try{
                var items=JSON.parse(response.body);
            }catch(err){
                var items=[];
            }
            return resolve(items);
        })
    })
}
function getSearchItems(storeId,stuffHost,data){

    let lang=(data.lang)?data.lang:''

    //let query={$and:[{$or:[{name:data.searchStr},{artikul:data.searchStr},{desc:data.searchStr}]}]};
    let query=encodeURI(data.searchStr)
    let acts =[];
    data.models.forEach(function (m) {
        let model=m.charAt(0).toUpperCase() + m.slice(1).toLowerCase()
        acts.push(getModelDataSearch(model,stuffHost,storeId,query,lang))
    })

    return Promise.all(acts)
}









// compile ui components
function getPreloadPageHtml(preloadPage,req,jadeData,cssData) {
    let stuffHost = req.stuffHost;
    let photoHost = req.photoHost;
    return new Promise(function(resolve,reject){
        var dH=Date.now()
        let homePath = path.join( __dirname, '../../public/views/template/partials/home/' );
        let addVar=req.addVar;
        co(function* () {
            try{
                if(preloadPage && preloadPage._id){
                    Promise.resolve()
                        .then(function(){
                            return getItemPageHTML(req,{model:'Stat'},preloadPage)
                        })
                        .then(function (data) {
                            if(req.mobile){
                                data.jadeData.mobileWrapper='mobile-wrapper'
                            }else if(req.tablet){
                                data.jadeData.mobileWrapper='tablet-wrapper'
                            }else{
                                data.jadeData.mobileWrapper=''}
                            data.jadeData.lang=req.store.langData;
                            let html=pug.render(data.jadeItem,data.jadeData);
                            if(data.cssData.css){
                                html="<style>"+data.cssData.css+"</style>"+html
                            }

                            return resolve(html)
                        })
                        .catch(function (err) {
                            resolve('')
                        })
                }else{
                    return resolve('')
                }
            }catch(err){
                console.log('home page  from getPreloadPageHtml- ',err)
                resolve('')
            }
        }).catch(reject);
    })
}







module.exports = function(router) {


    router.get('/api/makeMainCSS',middleware.getStore,function(req, res,next){
        try {
            req.store.doFile=true;
            getMainCSS(req.store,req.store.template,req.photoHost)
            res.json({msg:'ok'})
        }catch(err){return next(err)}

    })
    router.get('/api/getFontFaces',function(req, res,next){
        var p = path.join( __dirname, '../../public/fonts/' );
        try {
            let folders = fs.readdirSync(p).filter(function(file) {
                return fs.statSync(path.join(p, file)).isDirectory();
            });
            res.json(folders)
        }catch(err){return next(err)}

    })
    router.get('/api/me/:user',function(req, res,next){
        let authorization= req.headers.authorization||req.headers.Authorization;
        // Set the headers
        const headers = {
            'Authorization':     authorization
        }
        if(isWin){
            var urll="http://"+config.userHost+"/api/me/"+req.params.user;
        }else{
            var urll="http://127.0.0.1:3001/api/me/"+req.params.user;
        }

        // Configure the request
        const options = {
            url:urll,
            method: 'GET',
            headers: headers,
            //qs: {'store': req.store._id}
        }

        try{


            request(options, function(err,response,body){
                if(err){return next(err)}
                if(response && response.body){
                    try{
                        let user = JSON.parse(response.body)
                        res.json(user)
                    }catch(err){next(err)}
                }
            })
        }catch(err){
            next(err)
        }
    })

    router.get('/api/getIcons/:icon',function(req, res,next){
        var p = path.join( __dirname, '../../public/img/icon/'+req.params.icon );
        try {
            let files = fs.readdirSync(p).filter(function(file) {
                return fs.statSync(path.join(p, file)).isFile();
            });
            res.json(files)
        }catch(err){return next(err)}

    })
    router.get('/api/resetStoreCashe/:storeId',function(req, res,next){
        const ipHost=require('../../modules/ip/ip' );
        const ports=require('../../modules/ports' );
        const urlForStores = (ipHost && ipHost.local)?'http://'+ipHost.remote_ip+':'+ports.storePort:'http://'+ipHost.ip+':'+ports.storePort;
        try{
            var urll=urlForStores+"/api/collections/Store/"+req.params.storeId;
            console.log('/api/resetStoreCashe/:storeId',urll)
            request.get({url:urll}, function(err,response){
                if(err){return next(err)}
                if(response && response.body){
                    try{
                        let store = JSON.parse(response.body)
                        setDataForStore(store)
                        cache.storeList[store.subDomain]=store;
                        process.send({ msg: 'clearCache', pid: process.pid,store:store});
                        res.json({msg:'OK'})
                    }catch(err){next(err)}
                }

            })

        }catch(err){
            next(err)
        }

    })
    router.get('/api/confirmemail/:store/:user',middleware.getStore,function(req, res,next){
        var userHost = req.store.protocol + '://'+config.userHost+'/api/confirmemail/'+req.params.store+'/'+req.params.user;
        request.get({url:userHost}, function(error,response){
            try{
                var data=JSON.parse(response.body);
            }catch(err){
                error=true;
            }
            if(error || !data.status || data.status!='ok'){
                var html='<h1>ошибка</h1>'
            }else{
                var html='<h1>Адрес успешно подтвержден.</h1>'
            }

            var content='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>подтверждение email</title> </head> <body>';
            content+=html+'</body></html>';
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(content);
            res.end();
        })


    });
    router.post('/api/setTemplate',middleware.getStore,function(req, res,next){
        if(req.body.store!=req.store._id){
            let error = new Error('нет прав')
            return next(error)
        }
        let fileName = './public/views/templates/'+req.store.subDomain+'.json';
        try{
            fs.writeFileSync(fileName,JSON.stringify(req.body.template, null, ' '))
            res.json({})
        }catch(err){
            return next(err)
        }

    });
    router.post('/api/setTemplateHP',middleware.getStore,function(req, res,next){
        if(req.body.store!=req.store._id){
            let error = new Error('нет прав')
            return next(error)
        }
        let fileName = './public/views/templatesHP/'+req.store.subDomain+'.json';
        try{
            let data = JSON.stringify(req.body.template, null, ' ')
            fs.writeFileSync(fileName,JSON.stringify(req.body.template, null, ' '))
            res.json({})
        }catch(err){
            console.log(err)
            return next(err)
        }

    });
    router.get('/api/getTemplates',function(req, res,next){
        const folder = './public/views/templates/';
        try{
            let files = fs.readdirSync(folder)
            files.forEach(file => {
            });
            res.json(files)
        }catch(err){
            return next(err)
        }

    });
    router.get('/api/search',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        let searchStr=req.query.searchStr.toLowerCase().trim().substring(0,50);
        if(!searchStr){
            return res.json({html:null,titles:null})
        }
        var storeHost = req.storeHost;
        var stuffHost = req.stuffHost;
        var photoHost = req.photoHost;
        Promise.resolve()
            .then(function(){
                return getSearchPageHTML(req,searchStr)
            })
            .then(function (data) {
                data.jadeData.lang=req.store.langData;
                data.jadeData.photoHost=photoHost;
                data.jadeData.store=req.store;
                let html=pug.render(data.jadeItem,data.jadeData);
                if(data.cssData.css){
                    html="<style>"+data.cssData.css+"</style>"+html
                }

                return res.json({html:html,titles:data.titles})
            })
            .catch(function (err) {
                console.log('/api/search',err)
                return next('error from searchn api ',err);
            })
    });
    router.get('/api/clearCache/:type',middleware.getStore,function(req, res,next){
        cache.stores[req.store._id]={}
        cachePugFunctions[req.store._id]={}

        if(cache.request[req.store.subDomain]){
            cache.request[req.store.subDomain].exp=0;
            cache.request[req.store.subDomain].store=null;

        }
        console.log(cache.stores[req.store._id])
        //console.log('clearcach')
        return res.json({msg:'OK'})
    })

    router.post('/api/orders/checkoutLiqpayComplite',middleware.getStore,function(req, res,next){
        var orderHost = req.store.protocol + '://'+config.orderHost;
        let url = orderHost+'/api/orders/checkoutLiqpayComplite/'+req.store._id
        return res.redirect('/cabinet')
    })
    router.post('/api/orders/checkoutLiqpayComplite/:store',middleware.getStore,function(req, res,next){
        var orderHost = req.store.protocol + '://'+config.orderHost;
        let url = orderHost+'/api/orders/checkoutLiqpayComplite/'+req.store._id
        request.post({url:url,formData: req.body}, function(error,response){
            console.log('/api/orders/checkoutLiqpayComplite',error)
        })
        return res.json({})
    })
    router.post('/api/orders/checkoutLiqpayCompliteEntry/:user',middleware.getStore,function(req, res,next){
        let url = req.store.orderHost+'/api/orders/checkoutLiqpayCompliteEntry/'+req.params.user+'/'+req.store._id;
        request.post({url:url,formData: req.body}, function(error,response){
            //console.log('/api/orders/checkoutLiqpayCompliteEntry',error)

        })
        return res.redirect('/cabinet')

    })
    router.post('/api/orders/checkoutLiqpayCompliteEntry/:user/:store',middleware.getStore,function(req, res,next){
        let url = req.store.orderHost+'/api/orders/checkoutLiqpayCompliteEntry/'+req.params.user+'/'+req.store._id
        request.post({url:url,formData: req.body}, function(error,response){
            //console.log('/api/orders/checkoutLiqpayCompliteEntry',error)
        })
        return res.redirect('/cabinet')
        //return res.json({})
    })


    router.get('/api/collections/:model',userRedirect.handleRequest)
    router.get('/api/collections/:model/:id',userRedirect.handleRequest)
    router.delete('/api/collections/:model',userRedirect.handleRequest);
    router.delete('/api/collections/:model/:id',userRedirect.handleRequest)
    router.post('/api/collections/:model',userRedirect.handleRequest)
    router.post('/api/collections/:model/:id',userRedirect.handleRequest)

    router.get('/api/*',userRedirect.handleRequest,function(req, res,next){
        return next('api doesn"t exist')
    })
    router.post('/api/*',userRedirect.handleRequest,function(req, res,next){
        return next('api doesn"t exist')
    })


    router.post('/auth/:type',userRedirect.postAuth)


    router.get('/unsubscribe-done',middleware.cutFiles,middleware.getStore,middleware.crawler,middleware.versionBrowser,compileResponse)
    router.get('/unsubscribe/:user',middleware.getStore,function(req, res,next){
        var userHost = req.store.protocol + '://'+config.userHost+'/api/unsubscribe/'+req.store._id+'/'+req.params.user;
        request.get({url:userHost}, function(error,response){

            try{
                var data=JSON.parse(response.body);
            }catch(err){
                error=true;
            }
            if(error || !data.status || data.status!='ok'){
                var html='<h1>ошибка</h1>'
                var content='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>подтверждение email</title> </head> <body>';
                content+=html+'</body></html>';
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(content);
                res.end();
            }else{
                res.redirect('/unsubscribe-done')
            }


        })


    });

    router.get('/robots.txt',middleware.getStore,function(req, res,next){
        res.type( 'text/plain' )
        //var text = 'User-agent: *\nDisallow: /\nDisallow: /admin123\nDisallow: /seo\nDisallow: /manage\nDisallow: /setting\nDisallow: /content\nDisallow: /promo\n' +
        var text = 'User-agent: *\nAllow: *.js\nDisallow: /admin123\nDisallow: /seo\nDisallow: /manage\nDisallow: /setting\nDisallow: /content\nDisallow: /promo\n' +
            'Sitemap: ' +req.store.link+'/'+ req.store.subDomain + '.xml'
        res.send( text )
    });
    router.get('/manage',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = req.store.remote_ip+':'+req.store.stuffPort;
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;

        return res.render('order/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            orderHost:orderHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            //ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+","+JSON.stringify(local)+")"
        });
    });
    router.get('/manage/*',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = req.store.remote_ip+':'+req.store.stuffPort;
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        //console.log(req.store.nameListsL)
        return res.render('order/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            orderHost:orderHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            //ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+","+JSON.stringify(local)+")"
        });
    });

    router.get('/bookkeep',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = req.store.remote_ip+':'+req.store.stuffPort;
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var accountHost = req.store.accountHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        //console.log(accountHost)
        return res.render('account/index',{
            accountHost:accountHost,
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            orderHost:orderHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
        });
    })
    router.get('/bookkeep/*',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = req.store.remote_ip+':'+req.store.stuffPort;
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var accountHost = req.store.accountHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        //console.log(accountHost)
        return res.render('account/index',{
            accountHost:accountHost,
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            orderHost:orderHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
        });
    })



    router.get('/masteronline'  ,middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('masteronline/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            orderHost:orderHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+","+JSON.stringify(local)+")"
        });
    });
    router.get('/masteronline/*',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('masteronline/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            orderHost:orderHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+","+JSON.stringify(local)+")"
        });
    });

    router.get('/onlinemanage'  ,middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('onlinemanage/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            orderHost:orderHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+","+JSON.stringify(local)+")"
        });
    });
    router.get('/onlinemanage/*',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('onlinemanage/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            orderHost:orderHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+","+JSON.stringify(local)+")"
        });
    });
    router.get('/translate',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        let d1=Date.now()
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('translate/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
        });

    });
    router.get('/translate/*',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        let d1=Date.now()
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('translate/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
        });

    });
    router.get('/content',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        let d1=Date.now()
        /*var stuffHost = req.store.protocol + '://'+config.stuffHost;
        var userHost = req.store.protocol + '://'+config.userHost;
        var notificationHost = req.store.protocol + '://'+config.notificationHost;
        var socketHost = req.store.protocol + '://'+config.socketHost;
        var storeHost = req.store.protocol + '://'+config.storeHost;
        var photoUpload =   req.store.protocol + '://'+config.photoUpload;
        var photoHost = req.store.protocol + '://'+config.photoDownload;*/

        var stuffHost = '';req.store.stuffHost;
        var userHost = '';req.store.userHost;
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var storeHost = '';//req.store.storeHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        //console.log(req.store.photoHost)

        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        //let ngInit="displaySlideMenu=true;setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+")";


        /*let filename=path.join(__dirname, '../../public/views/index.pug')
        let basedir=path.join(__dirname, '../../public/views')
        let allJadeData = {
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            //ngInit:ngInit,
        }
        allJadeData.filename=filename;
        try {
            let endhtml= pug.render(pugCache['contentAdmin'],allJadeData,{filename: filename,
                basedir:basedir,
                pretty:  true});
            let d2 = Date.now();
            console.log('time for INDEX request compile - ', d2 - d1,req.store.subDomain);
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(endhtml);
            return res.end();
        }catch(err){
            console.log(err)
        }
        return;*/



        return res.render('content/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            //ngInit:ngInit,
        });

    });
    router.get('/content/*',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        /*var stuffHost = req.store.protocol + '://'+config.stuffHost;
        var userHost = req.store.protocol + '://'+config.userHost;
        var notificationHost = req.store.protocol + '://'+config.notificationHost;
        var socketHost = req.store.protocol + '://'+config.socketHost;
        var storeHost = req.store.protocol + '://'+config.storeHost;
        var photoUpload =   req.store.protocol + '://'+config.photoUpload;
        var photoHost = req.store.protocol + '://'+config.photoDownload;
*/
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;


        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('content/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            //ngInit:"displaySlideMenu=true;setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+")"
        });
    });
    router.get('/setting',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('setting/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+")"
        });

    });
    router.get('/setting/*',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('setting/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+")"
        });

    });
    router.get('/promo',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('promo/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+")"
        });

    });
    router.get('/promo/*',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('promo/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            photoUpload:photoUpload,
            photoHost:photoHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+")"
        });

    });
    router.get('/seo',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('seo/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+")"
        });
    });
    router.get('/seo/*',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('seo/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+")"
        })
    });
    router.get('/store',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('store/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+")"
        });
    });
    router.get('/store/*',middleware.getStore,middleware.versionBrowser,function(req, res,next){
        var stuffHost = '';
        var userHost = '';
        var storeHost = '';
        var orderHost = '';
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = req.store.photoHost;
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('store/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+")"
        });
    });
    router.get('/admin123',middleware.cutFiles,middleware.getStore,middleware.versionBrowser,function(req, res,next){
        if(req.store.subDomain!='gmall'){next(new Error('sucks'))}
        var stuffHost = req.store.remote_ip+':'+req.store.stuffPort;
        var userHost = req.store.remote_ip+':'+req.store.userPort;
        var storeHost = req.store.remote_ip+':'+req.store.storePort;
        var orderHost = req.store.remote_ip+':'+req.store.orderPort;
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = (req.store.photoHost)?req.store.photoHost:'';
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('admin123/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            photoHost:photoHost,
            photoUpload:photoUpload,
            orderHost:orderHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+")"
        });
    });
    router.get('/admin123/*',middleware.cutFiles,middleware.getStore,middleware.versionBrowser,function(req, res,next){
        if(req.store.subDomain!='gmall'){next(new Error('sucks'))}
        var stuffHost = req.store.remote_ip+':'+req.store.stuffPort;
        var userHost = req.store.remote_ip+':'+req.store.userPort;
        var storeHost = req.store.remote_ip+':'+req.store.storePort;
        var orderHost = req.store.remote_ip+':'+req.store.orderPort;
        var notificationHost = req.store.notificationHost;
        var socketHost = req.store.socketHost;
        var photoUpload =   req.store.photoUpload;
        var photoHost = (req.store.photoHost)?req.store.photoHost:'';
        let mobile=req.mobile||null;
        let local = (req.hostname.indexOf('localhost')>-1)?true:false;
        return res.render('admin123/index',{
            stuffHost:stuffHost,
            userHost:userHost,
            notificationHost:notificationHost,
            socketHost:socketHost,
            storeHost:storeHost,
            photoHost:photoHost,
            photoUpload:photoUpload,
            orderHost:orderHost,
            store:req.store,
            mobile:mobile,
            local:local,
            ngInit:"setInitData("+JSON.stringify(req.store)+","+JSON.stringify(mobile)+")"
        });

    });


    router.get('/views/template/partials/paps/paps.html',middleware.getStore,middleware.versionBrowser,function(req,res,next){
        let jadeData={dj:{}},cssData={css:''};
        var storeHost = req.storeHost;
        var stuffHost = req.stuffHost;
        var photoHost = req.photoHost;
        jadeData.mobile=req.mobile;
        jadeData.tablet=req.tablet;
        jadeData.photoHost=photoHost;
        jadeData.filename= path.join(__dirname, '../../public/views/index.pug');
        if(req.mobile){
            jadeData.mobileWrapper='mobile-wrapper'
        }else if(req.tablet){
            jadeData.mobileWrapper='tablet-wrapper'
        }else{
            jadeData.mobileWrapper=''}

        var homePath = path.join( __dirname, '../../public/views/template/partials/paps/' );
        Promise.resolve()
            .then(function(){
                let addVar=req.addVar;
                try{
                    let item  =(req.store.template.paps)?req.store.template.paps:{};
                    item.type='paps'
                    item.i=1;
                    let jadeCart = getPartWithKey(item,'paps',homePath)
                    getCSSForBlock(homePath,item,'paps',cssData,addVar)
                    jadeData.dj[item.wrapclass]=item;
                    let html=pug.render(jadeCart,jadeData);
                    return html
                }catch(e){
                    console.log('getPaps ',e)
                    return '';

                }
            })
            .then(function (html) {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                if(cssData.css){
                    html="<style>"+cssData.css+"</style>"+html
                }
                res.write(html);
                res.end();
            })
            .catch(function (err) {
                console.log('/views/template/partials/paps/paps.html',err)
                return next(err);
            })
    })
    router.get('/views/template/partials/cart.html',middleware.getStore,middleware.versionBrowser,function(req,res,next){
        let jadeData={dj:{}},cssData={css:''};
        var stuffHost = req.stuffHost;
        var photoHost = req.photoHost;
        jadeData.mobile=req.mobile;
        jadeData.tablet=req.tablet;
        jadeData.photoHost=photoHost;
        jadeData.filename= path.join(__dirname, '../../public/views/index.pug');
        if(req.mobile){
            jadeData.mobileWrapper='mobile-wrapper'
        }else if(req.tablet){
            jadeData.mobileWrapper='tablet-wrapper'
        }else{
            jadeData.mobileWrapper=''}

        var homePath = path.join( __dirname, '../../public/views/template/partials/cart/' );
        Promise.resolve()
            .then(function(item){
                let addVar=req.addVar;
                try{
                    let cart  =req.store.template.cart;
                    if(req.store.cartSetting && req.store.cartSetting.slide){
                        cart.type='cartslide'
                    }else{
                        cart.type='cart';
                    }

                    cart.i=1;
                    let jadeCart = getPartWithKey(cart,'cart',homePath)
                    getCSSForBlock(homePath,cart,'cart',cssData,addVar)
                    jadeData.dj[cart.wrapclass]=cart;
                    let html=pug.render(jadeCart,jadeData);
                    return html
                }catch(e){
                    console.log('getcart ',e)
                    return '';

                }
            })
            .then(function (html) {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                if(cssData.css){
                    html="<style>"+cssData.css+"</style>"+html
                }
                res.write(html);
                res.end();
            })
            .catch(function (err) {
                console.log('getcart',err)
                return next(err);
            })
    })

    router.get('/views/template/partials/pricegoods.html',middleware.getStore,middleware.versionBrowser,function(req,res,next){
        var d = Date.now()
        Promise.resolve()
            .then(function(){

                return getPriceHTML(req,'pricegoods')
            })
            .then(function (data) {
                data.jadeData.photoHost = req.store.photoHost;
                data.jadeData.filename= path.join(__dirname, '../../public/views/index.pug');
                data.jadeData.titles=data.titles;
                if(req.mobile){
                    data.jadeData.mobileWrapper='mobile-wrapper'
                }else if(req.tablet){
                    data.jadeData.mobileWrapper='tablet-wrapper'
                }else{
                    data.jadeData.mobileWrapper=''
                }
                data.jadeData.lang=req.store.langData;
                var d1 = Date.now()
                let html=pug.render(data.jadeItem,data.jadeData);
                var d2 = Date.now()
                //console.log('time 2 is ',d1-d2)
                if(data.cssData.css){
                    html="<style>"+data.cssData.css+"</style>"+html
                }


                res.json({html:html,titles:data.titles})
            })
            .catch(function (err) {
                console.log('/views/template/pricegoods ',err)
                return next(err);
            })
    });
    router.get('/views/template/partials/priceservices.html',middleware.getStore,middleware.versionBrowser,function(req,res,next){
        var d = Date.now()
        Promise.resolve()
            .then(function(){
                return getPriceHTML(req,'priceservices')
            })
            .then(function (data) {
                data.jadeData.photoHost = req.store.photoHost;
                data.jadeData.filename= path.join(__dirname, '../../public/views/index.pug');
                data.jadeData.titles=data.titles;
                if(req.mobile){
                    data.jadeData.mobileWrapper='mobile-wrapper'
                }else if(req.tablet){
                    data.jadeData.mobileWrapper='tablet-wrapper'
                }else{
                    data.jadeData.mobileWrapper=''
                }
                data.jadeData.lang=req.store.langData;
                var d1 = Date.now()
                let html=pug.render(data.jadeItem,data.jadeData);
                var d2 = Date.now()
                //console.log('time 2 is ',d1-d2)
                if(data.cssData.css){
                    html="<style>"+data.cssData.css+"</style>"+html
                }


                res.json({html:html,titles:data.titles})
            })
            .catch(function (err) {
                console.log('/views/template/pricegoods ',err)
                return next(err);
            })
    });

    router.get('/views/template/partials/:type'+'.html',middleware.getStore,middleware.versionBrowser,function(req,res,next){
        var d = Date.now()
        Promise.resolve()
            .then(function(){
                return getItemsPageHTML(req)
            })
            .then(function (data) {
                //console.log(req.store.photoHost)
                data.jadeData.lang=req.store.langData
                data.jadeData.photoHost = req.store.photoHost;
                data.jadeData.filename= path.join(__dirname, '../../public/views/index.pug');
                data.jadeData.titles=data.titles;
                if(req.mobile){
                    data.jadeData.mobileWrapper='mobile-wrapper'
                }else if(req.tablet){
                    data.jadeData.mobileWrapper='tablet-wrapper'
                }else{
                    data.jadeData.mobileWrapper=''
                }
                data.jadeData.lang=req.store.langData;
                var d1 = Date.now()
                //console.log(data.jadeItem)
                /*fs.writeFile( 'public/views/masterpage_'+req.store.subDomain+'.pug', data.jadeItem, function (err, data) {
                    if (err) console.log(err);
                } );*/
                let html=pug.render(data.jadeItem,data.jadeData);
                var d2 = Date.now()
                if(data.cssData.css){
                    html="<style>"+data.cssData.css+"</style>"+html
                }
                res.json({html:html,titles:data.titles})
            })
            .catch(function (err) {
                console.log('/views/template/partials/:type ',err)
                return next(err);
            })
    });// списки
    router.get('/views/template/partials/scheduleplace/:week'+'.html',middleware.getStore,middleware.versionBrowser,function(req,res,next){
       /* console.log(req.params)
        console.log(req.query)*/
        var d = Date.now()
        let blocks=[]
        let block={is:true,type:"scheduleplace"};
        if(req.query.stuff){
            block.scheduleStuff=req.query.stuff;
        }
        if(req.query.templ){
            block.templ=req.query.templ;
        }
        if(req.params.week){
            block.week=req.params.week
        }
        blocks.push(block)
        //console.log(block)
        Promise.resolve()
            .then(async function () {
                let jadeData={dj:{}},cssData={};
                let jadeItem= await hangleBlocksForPugCompile(blocks,req,jadeData,cssData)
                jadeData.photoHost = req.store.photoHost
                jadeData.filename= path.join(__dirname, '../../public/views/index.pug');

                if(req.mobile){
                    jadeData.mobileWrapper='mobile-wrapper'
                }else if(req.tablet){
                    jadeData.mobileWrapper='tablet-wrapper'
                }else{
                    jadeData.mobileWrapper=''
                }
                jadeData.lang=req.store.langData;

                //console.log(data.jadeItem)
                /*fs.writeFile( 'public/views/masterpage_'+req.store.subDomain+'.pug', data.jadeItem, function (err, data) {
                 if (err) console.log(err);
                 } );*/
                jadeData.mobile=req.mobile;
                let html=pug.render(jadeItem,jadeData);


                res.json({html:html})
            })
            .catch(function (err) {
                console.log('views/template/partials/scheduleplace/:week ',err)
                return next(err);
            })
    });
    router.get('/views/template/partials/:campaignId/:condition',middleware.getStore,middleware.versionBrowser,function(req,res,next){
        //console.log("/views/template/partials/:campaignId/:condition")
        const campaignId=req.params.campaignId;
        const campaignCondition=(req.params.condition=='stuffs')?false:true
        const page =(req.query.page)?req.query.page:0;
        let stuffListType='good'
        const storeHost = req.store.storeHost;
        const stuffHost = req.store.stuffHost;
        const photoHost = req.store.photoHost;

        const makeJob = async () => {
            const campaing = await getItemPage(req.store._id,stuffHost,{model:'campaign',url:campaignId,lang:req.store.lang})
            if(campaing.cartType){
                stuffListType=campaing.cartType;
            }
            const query = setQueryForCampaign(campaing,campaignCondition)
            req.store.template.stuffListType[stuffListType].parts=req.store.template.stuffListType[stuffListType].parts.filter((item)=>{return item.name=='list' || item.name=='paginate'})
            //console.log(query)
            /*console.log(query,stuffListType)
            console.log(req.params,req.query)*/
            const data = await getStuffsListPageHTML(query,stuffListType,req,'fromAngular',true)

            let jadeItem=data.jadeItem;
            let jadeData=data.jadeData;
            jadeData.photoHost=photoHost;
            let cssData=data.cssData;
            jadeData.titles=data.titles
            jadeData.store=req.store
            if(req.mobile){
                jadeData.mobileWrapper='mobile-wrapper'
            }else if(req.tablet){
                jadeData.mobileWrapper='tablet-wrapper'
            }else{
                jadeData.mobileWrapper=''}
            jadeData.lang=req.store.langData;
            jadeData.langLink=(req.store.mainLang!=req.store.lang)?'?lang='+req.store.lang:'';

            try{
                let  d2=Date.now()
                let html=pug.render(jadeItem,jadeData);

                /*fs.mkdirParentPromise('public/views/'+req.store.subDomain).then(function () {
                    fs.writeFile( 'public/views/'+req.store.subDomain+'/stuffslistCampaign'+req.store.subDomain+'.html', html, function (err, data) {
                        if (err) console.log(err);
                    } );
                })*/

                let  d3=Date.now()
                if(cssData.css){
                    html="<style>"+cssData.css+"</style>"+html
                }
                /*let seconds = 100000;
                if(req.store.cache && req.store.cache.seconds){
                    seconds = req.store.cache.seconds;
                }
                if(req.store.cache && req.store.cache.all){
                    if(!cache.stores[req.store._id]){cache.stores[req.store._id]={}}
                    if(!cache.stores[req.store._id][req.store.lang]){cache.stores[req.store._id][req.store.lang]={}}
                    if(!cache.stores[req.store._id][req.store.lang][urlField]){cache.stores[req.store._id][req.store.lang][urlField]={}}
                    if(!cache.stores[req.store._id][req.store.lang][urlField][key]){cache.stores[req.store._id][req.store.lang][urlField][key]={}}
                    if(true){
                        zlib.deflate(html, function(err, buffer) {

                            /!*console.log('size of cache data for all store-',sizeof(cache.stores[req.store._id]))
                             console.log('size of cache data for save-',sizeof(buffer))*!/

                            if (!err) {
                                cache.stores[req.store._id][req.store.lang][urlField][key].exp=moment().add(seconds, 'seconds').unix()
                                cache.stores[req.store._id][req.store.lang][urlField][key].html=buffer;
                            }
                        });
                    }
                }
*/
                res.json({html:html,titles:null})
            }catch(err){console.log('/views/template/partials/campaign',err);next(err)}


        }

        makeJob()
            .then(()=>{
                //return res.json({html:222})
            })
            .catch(err => {
                console.log(' makeJob()',err);
                next(err)
                // output
                // Error: oops at makeRequest (index.js:7:9)
            })

        function setQueryForCampaign(campaign,campaignCondition){
            let query={}
            if(campaignCondition){
                if(campaign.conditionTags && campaign.conditionTags.length){
                    let  tags = campaign.conditionTags.map((item)=>item._id)
                    query.tags={$in:tags}
                }
                if(campaign.conditionBrandTags && campaign.conditionBrandTags.length){
                    let  tags = campaign.conditionBrandTags.map((item)=>item._id)
                    query.brandTag={$in:tags};
                }
                if(campaign.conditionBrands && campaign.conditionBrands.length){
                    let  tags = campaign.conditionBrands.map((item)=>item._id)
                    query.brand={$in:tags};
                }
                if(campaign.conditionCategories && campaign.conditionCategories.length){
                    let  tags = campaign.conditionCategories.map((item)=>item._id)
                    query.category={$in:tags};
                }
                if(campaign.conditionStuffs && campaign.conditionStuffs.length){
                    let  tags = campaign.conditionStuffs.map((item)=>item._id)
                    query._id={$in:tags};
                }
            }else{
                if(campaign.tags && campaign.tags.length){
                    let  tags = campaign.tags.map((item)=>item._id)
                    query.tags={$in:tags}
                }
                if(campaign.brandTags && campaign.brandTags.length){
                    let  tags = campaign.brandTags.map((item)=>item._id)
                    query.brandTag={$in:tags};
                }
                if(campaign.brands && campaign.brands.length){
                    let  tags = campaign.brands.map((item)=>item._id)
                    query.brand={$in:tags};
                }
                if(campaign.categories && campaign.categories.length){
                    let  tags = campaign.categories.map((item)=>item._id)
                    query.category={$in:tags};
                }
                if(campaign.stuffs && campaign.stuffs.length){
                    let  tags = campaign.stuffs.map((item)=>item._id)
                    query._id={$in:tags};
                }
            }


            var keys = Object.keys(query);
            var q={}
            if(keys.length==1){
                q=query;
            }else if(keys.length>1){
                q.$or=[];
                for(var k in query){
                    var o ={}
                    o[k]=query[k]
                    q.$or.push(o)
                }

            }
            q.actived=true;
            return q;
        }


    });
    router.get('/views/template/partials/stuffs/stuffs-list/:type',middleware.getStore,middleware.versionBrowser,function(req,res,next){
        var blockList=[];
        var campaign;
        var typeList='good'
        var idx=0;


        try{
            let jadeData={dj:{}},cssData={css:'',rows:4,filtersInModal:false};
            let type='stuffs'
            var homePath = path.join( __dirname, '../../public/views/template/partials/stuffs/' );
            var storeHost = req.storeHost;
            var stuffHost = req.stuffHost;
            var photoHost = req.photoHost;

            jadeData.mobile=req.mobile;
            jadeData.tablet=req.tablet;
            jadeData.photoHost=photoHost;
            jadeData.filename= path.join(__dirname, '../../public/views/index.pug');
            if(req.mobile){
                jadeData.mobileWrapper='mobile-wrapper'
            }else if(req.tablet){
                jadeData.mobileWrapper='tablet-wrapper'
            }else{
                jadeData.mobileWrapper=''}

            if(req.params.type=='campaign'){campaign=true}else{typeList=req.params.type}



            if(req.store.template.stuffListType && req.store.template.stuffListType[typeList] && req.store.template.stuffListType[typeList].parts
                && req.store.template.stuffListType[typeList].parts.length){
                blockList=req.store.template.stuffListType[typeList].parts;
                if(req.store.template.stuffListType[typeList].filtersInModal){
                    jadeData.filtersInModal=true;
                }
                if(req.store.template.stuffListType[typeList].rows){
                    jadeData.rows=req.store.template.stuffListType[typeList].rows
                }
            }


            let parts=[];
            let tab = '    ';

            let key ="wrap-stuffs-page"+Date.now()
            parts.push("- var key = '"+key+"'")
            parts.push("div(class=dj[key].wrapclass)")
            parts.push("  div(class=mobileWrapper)")
            let element=req.store.template.stuffListType[typeList];
            element.type=type;

            element.wrapclass=key;
            element.i=1;
            jadeData.dj[key]=element;
            getCSSForBlock(homePath,element,type,cssData)

            let jadeHTML='';
            let addVar=req.addVar;
            blockList
                .filter(function (block) {
                    if(campaign){
                        if(block.name=='list'){return true;}
                    }else{
                        if(block.is){
                            if(block.name=='filters'){
                                if(jadeData.filtersInModal || req.mobile){
                                    return true
                                }else{
                                    jadeData.filtersInList=true;
                                }
                            }else{
                                return true;
                            }
                        }

                    }
                })
                .forEach(function (element) {
                    if(element){
                        idx++;
                        element.i=idx;
                        element.type=element.name
                        //if(element.name=='categories'){element.templ=null;}
                        jadeHTML += getPartWithKey(element,'stuffs',homePath)
                        jadeData.dj[element.wrapclass]=element;
                        getCSSForBlock(homePath,element,'stuffs',cssData,addVar)
                    }

                })
            parts.splice.apply(parts,[3,0].concat(jadeHTML.split('\n').filter(function(e){return e;}).map(function (l) {return tab+l})))
            let jadeItem =parts.join("\n")
            let html=pug.render(jadeItem,jadeData);
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            if(cssData.css){
                html="<style>"+cssData.css+"</style>"+html
            }
            res.write(html);
            res.end();
        }catch(err){console.log('/views/template/partials/stuffs/stuffs-list/:type 3146',err)}
        return;
    });
    router.post('/views/template/partials/stuffs/stuffs-list/:type/:groupUrl/:categoryUrl',middleware.getStore,middleware.versionBrowser,function(req,res,next){
        console.log('duble??????????????????????????')
        console.log('duble??????????????????????????')
        return;
        var blockList=[];
        var campaign;
        var typeList='good'
        var idx=0;


        try{
            let jadeData={dj:{}},cssData={css:'',rows:4,filtersInModal:false};
            let type='stuffs'
            var homePath = path.join( __dirname, '../../public/views/template/partials/stuffs/' );
            var stuffHost = req.stuffHost;
            var photoHost = req.photoHost;

            jadeData.mobile=req.mobile;
            jadeData.tablet=req.tablet;
            jadeData.photoHost=photoHost;
            jadeData.filename= path.join(__dirname, '../../public/views/index.pug');
            if(req.mobile){
                jadeData.mobileWrapper='mobile-wrapper'
            }else if(req.tablet){
                jadeData.mobileWrapper='tablet-wrapper'
            }else{
                jadeData.mobileWrapper=''}

            if(req.params.type=='campaign'){campaign=true}else{typeList=req.params.type}

            if(req.store.template.stuffListType && req.store.template.stuffListType[typeList] && req.store.template.stuffListType[typeList].parts
                && req.store.template.stuffListType[typeList].parts.length){
                blockList=req.store.template.stuffListType[typeList].parts;
                if(req.store.template.stuffListType[typeList].filtersInModal){
                    jadeData.filtersInModal=true;
                }
                if(req.store.template.stuffListType[typeList].rows){
                    jadeData.rows=req.store.template.stuffListType[typeList].rows
                }
            }


            let parts=[];
            let tab = '    ';

            let key ="wrap-stuffs-page"+Date.now()
            parts.push("- var key = '"+key+"'")
            parts.push("div(class=dj[key].wrapclass)")
            parts.push("  div(class=mobileWrapper)")
            let element=req.store.template.stuffListType[typeList];
            element.type=type;

            element.wrapclass=key;
            element.i=1;
            jadeData.dj[key]=element;
            getCSSForBlock(homePath,element,type,cssData)

            let jadeHTML='';
            let addVar=req.addVar;
            blockList
                .filter(function (block) {
                    if(campaign){
                        if(block.name=='list'){return true;}
                    }else{
                        if(block.is){
                            if(block.name=='filters'){
                                if(jadeData.filtersInModal || req.mobile){
                                    return true
                                }else{
                                    jadeData.filtersInList=true;
                                }
                            }else{
                                return true;
                            }
                        }

                    }
                })
                .forEach(function (element) {
                    if(element){
                        idx++;
                        element.i=idx;
                        element.type=element.name
                        //if(element.name=='categories'){element.templ=null;}
                        jadeHTML += getPartWithKey(element,'stuffs',homePath)
                        jadeData.dj[element.wrapclass]=element;
                        getCSSForBlock(homePath,element,'stuffs',cssData,addVar)
                    }

                })
            parts.splice.apply(parts,[3,0].concat(jadeHTML.split('\n').filter(function(e){return e;}).map(function (l) {return tab+l})))
            let jadeItem =parts.join("\n")
            let html=pug.render(jadeItem,jadeData);
            /*res.writeHead(200, {
             "Content-Type": "text/html"
             });*/
            if(cssData.css){
                html="<style>"+cssData.css+"</style>"+html
            }
            /*res.write(html);
             res.end();*/
            res.json({html:html,titles:null})

        }catch(err){console.log('/views/template/partials/stuffs/stuffs-list/:type 3256',err)}
        return;
    });
    router.get('/views/template/partials/stuffs/stuffs-list/:type/:groupUrl/:categoryUrl'+'.html',middleware.getStore,middleware.versionBrowser,function(req,res,next){
        if(req.query && req.query.url){
            req.url = req.query.url;
            delete req.query.url
        }
        let urlField= JSON.stringify(req.params)+JSON.stringify(req.query)
        var local=(req.hostname=='localhost')
        local=(req.hostname.indexOf('localhost')>-1)?true:false;
        let key = 'desktop';
        if(req.mobile){key='mobile'};
        if(req.tablet){key='tablet'};
        let  d1=Date.now()
        if(cache.stores[req.store._id] && cache.stores[req.store._id][req.store.lang] &&
            cache.stores[req.store._id][req.store.lang][urlField] &&
            cache.stores[req.store._id][req.store.lang][urlField][key] &&
            cache.stores[req.store._id][req.store.lang][urlField][key].exp && moment().unix()
            < cache.stores[req.store._id][req.store.lang][urlField][key].exp){
            let d2 = Date.now();
            zlib.unzip(cache.stores[req.store._id][req.store.lang][urlField][key].html, function(err, buffer) {
                if (!err) {
                    return res.json({html:buffer.toString('utf8'),titles:null})
                }else{
                    console.log('/views/template/partials/stuffs/stuffs-list/:type',err)
                }
            });
            return;

        }




        let stuffListType='good'
        var storeHost = req.storeHost;
        var stuffHost = req.stuffHost;
        var photoHost = req.photoHost;

        if(req.params.type=='campaign'){campaign=true}else{stuffListType=req.params.type}
        Promise.resolve()
                .then(function () {
                    if(!req.query.query){throw 'there is not a query'}
                    /*if(req.store.template.stuffListCart.good && req.store.template.stuffListCart.good.elements && req.store.template.stuffListCart.good.elements['@brand-name']){
                        console.log("req.store.template.stuffListCart.good.elements['@brand-name'][0]",req.store.template.stuffListCart.good.elements['@brand-name'][0])
                    }*/

                    return getStuffsListPageHTML(req.query.query,stuffListType,req,'fromAngular')
                })
                .then(function (data) {
                    //console.log(data)
                    let jadeItem=data.jadeItem;
                    let jadeData=data.jadeData;
                    jadeData.photoHost=photoHost;
                    jadeData.mobile=req.mobile;
                    jadeData.tablet=req.tablet;

                    let cssData=data.cssData;
                    jadeData.titles=data.titles
                    jadeData.store=req.store
                    if(req.mobile){
                        jadeData.mobileWrapper='mobile-wrapper'
                    }else if(req.tablet){
                        jadeData.mobileWrapper='tablet-wrapper'
                    }else{
                        jadeData.mobileWrapper=''}
                    jadeData.lang=req.store.langData;
                    jadeData.langLink=(req.store.mainLang!=req.store.lang)?'?lang='+req.store.lang:'';

                    try{
                        let  d2=Date.now()
                        let html=pug.render(jadeItem,jadeData);

                        let  d3=Date.now()
                        if(cssData.css){
                            html="<style>"+cssData.css+"</style>"+html
                        }
                        let seconds = 100000;
                        if(req.store.cache && req.store.cache.seconds){
                            seconds = req.store.cache.seconds;
                        }
                        if(req.store.cache && req.store.cache.all){
                            if(!cache.stores[req.store._id]){cache.stores[req.store._id]={}}
                            if(!cache.stores[req.store._id][req.store.lang]){cache.stores[req.store._id][req.store.lang]={}}
                            if(!cache.stores[req.store._id][req.store.lang][urlField]){cache.stores[req.store._id][req.store.lang][urlField]={}}
                            if(!cache.stores[req.store._id][req.store.lang][urlField][key]){cache.stores[req.store._id][req.store.lang][urlField][key]={}}
                            if(true){
                                zlib.deflate(html, function(err, buffer) {
                                    if (!err) {
                                        cache.stores[req.store._id][req.store.lang][urlField][key].exp=moment().add(seconds, 'seconds').unix()
                                        cache.stores[req.store._id][req.store.lang][urlField][key].html=buffer;
                                    }
                                });
                            }
                        }

                        res.json({html:html,titles:null})
                    }catch(err){console.log('/views/template/partials/stuffs/stuffs-list/:type 3349',req.store.subDomain,req.url,err);next(err)}

                })
                .catch(function (err) {
                    console.log('/views/template/partials/stuffs/stuffs-list/:type 3349',req.store.subDomain,req.url,err)
                    next(err)
                })
        return;
    });

    router.get('/views/template/partials/stuffDetail/stuffDetailNew/:type/:url'+'.html',middleware.getStore,middleware.versionBrowser,function(req,res,next){
        //console.log('req.store',req.store)
        //console.log("'/views/template/partials/stuffDetail/stuffDetailNew/:type/:url'")
        let jadeData={dj:{}},cssData={css:''};
        var stuffHost = req.stuffHost;
        var photoHost = req.photoHost;
        jadeData.mobile=req.mobile;
        jadeData.tablet=req.tablet;
        jadeData.photoHost=photoHost;
        jadeData.filename= path.join(__dirname, '../../public/views/index.pug');
        if(req.mobile){
            jadeData.mobile=true;
            //console.log('jadeData.orientation',jadeData.orientation)
            jadeData.mobileWrapper='mobile-wrapper'
        }else if(req.tablet){
            jadeData.mobileWrapper='tablet-wrapper'
        }else{
            jadeData.mobileWrapper=''}

        var homePath = path.join( __dirname, '../../public/views/template/partials/stuffDetail/' );
        var typeList='good';
        if(req.params.type){typeList=req.params.type}
        let parts={right:'',left:'',bottom:'',top:''}

        //console.log('item')
        let stuff;
        Promise.resolve()
            .then(function(){
                //return getStuff(req.store._id,stuffHost,req.params.url)
            })
            .then(function(item){
                //console.log('item.name',item.name)
                stuff=item;
                return getStuffDetailPageHTML(req)
            })
            .then(async function(o){

                //console.log('o',o.titles)
                o.jadeData.lang=req.store.langData
                let html=pug.render(o.jadeItem,o.jadeData);
                if(o.cssData.css){
                    html="<style>"+o.cssData.css+"</style>"+html
                }
                return res.json({html:html,titles:o.titles})
            })
            .catch(function (err) {
                console.log("/views/template/partials/stuffDetail/stuffDetailNew/:type/:url'+'.html",err)
                return next(err);
            })
    });
    router.get('/views/template/partials/:model/itemPage/:url'+'.html',middleware.getStore,middleware.versionBrowser,function(req,res,next){
        //console.log('here?')
        var storeHost = req.storeHost;
        var stuffHost = req.stuffHost;
        var photoHost = req.photoHost;
        Promise.resolve()
            .then(function(){
                return getItemPageHTML(req,req.params)
            })
            .then(function (data) {
                if(req.mobile){
                    data.jadeData.mobileWrapper='mobile-wrapper'
                }else if(req.tablet){
                    data.jadeData.mobileWrapper='tablet-wrapper'
                }else{
                    data.jadeData.mobileWrapper=''}
                data.jadeData.lang=req.store.langData;
                let html=pug.render(data.jadeItem,data.jadeData);
                if(data.cssData.css){
                    html="<style>"+data.cssData.css+"</style>"+html
                }
                return res.json({html:html,titles:data.titles})
            })
            .catch(function (err) {
                return next(err);
            })
    });//страница из списка



    router.get('/home',middleware.cutFiles,middleware.getStore,middleware.versionBrowser,compileResponse)
    router.get('/cart',middleware.cutFiles,middleware.getStore,middleware.versionBrowser,compileResponse)
    router.get('/search',middleware.cutFiles,middleware.getStore,middleware.versionBrowser,compileResponse)
    router.get('/homepageHTML.html',middleware.getStore,middleware.versionBrowser,getHomePageHtmlByRequest)


    router.get('/:type',middleware.cutFiles,middleware.getStore,middleware.versionBrowser,compileResponse)

    router.get('/:group/:category',middleware.cutFiles,middleware.getStore,middleware.crawler,middleware.versionBrowser,compileResponse)
    router.get('/:group/:category/:stuff',middleware.cutFiles,middleware.getStore,middleware.crawler,middleware.versionBrowser,compileResponse)

    router.get('/' ,middleware.cutFiles,middleware.getStore,middleware.crawler,middleware.versionBrowser,compileResponse)
    router.get('/*',middleware.cutFiles,middleware.getStore,middleware.crawler,middleware.versionBrowser,compileResponse404)
}

activate();
/*function getKey(k) {
    return `a key named ${k}`;
}



// good
const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enabled')]: true,
};
console.log(obj)*/

async function getHomePageHtmlByRequest(req,res,next) {
    try{
        let data={
            model:'HomePage',
            url:req.store.subDomain,
            lang:req.store.lang
        }
        let acts=[];
        //console.log('stuffHost',req.stuffHost)
        acts.push(getItemPage(req.store._id,req.stuffHost,data))
        let data1={
            model:'Group',
            url:req.store.subDomain,
            lang:req.store.lang
        }

        acts.push(getItemsForPage(req.store._id,req.stuffHost,data1))

        let response =  await Promise.all(acts)
        let hp=response[0]
        let sections=response[1]
        if(sections.length){
            sections.shift()
        }
        let jadeData={dj:{}}
        let cssData={css:''}
        let jadeItem = await getHomePageHtml(hp,req,jadeData,cssData)
        //console.log('req.mobile',req.mobile)
        if(req.mobile){
            jadeData.mobileWrapper='mobile-wrapper';
            jadeData.mobile=true
        }else if(req.tablet){
            jadeData.mobileWrapper='tablet-wrapper'
            jadeData.tablet=true
        }else{
            jadeData.mobileWrapper=''}
        jadeData.lang=req.store.langData;
        jadeData.titles={}
        jadeData.sections=sections;
        jadeData.photoHost=req.photoHost;
        /*fs.mkdirParentPromise('public/views/'+req.store.subDomain).then(function () {
            fs.writeFile( 'public/views/'+req.store.subDomain+'/homePage.data', JSON.stringify(jadeData,null,'\t'), function (err, data) {
                if (err) console.log(err);
            } );
            fs.writeFile( 'public/views/'+req.store.subDomain+'/homePage.pug', jadeItem, function (err, data) {
                if (err) console.log(err);
            } );
        })*/
        let html=pug.render(jadeItem,jadeData);

        return res.json({html:html})
    }catch(err){next(err)}

}

function _page404(params,sections,numParams) {
    let firstParam=params.group;
    //console.log(firstParam=='group' || !_sectionIs(sections,firstParam))
    if(globalVar.reservedFirstParams.indexOf(firstParam)<0){
    //if(firstParam!='stat'&&firstParam!='news'&&firstParam!='master' &&firstParam!='campaign'&&firstParam!='info'&&firstParam!='additional'&&firstParam!='cabinet'){
        if(firstParam=='group' || !_sectionIs(sections,firstParam)){
            return true;
        }else{
            let secondParam=params.category;
            //console.log(params)
            // проверяем категорию
            if(secondParam!='category'){
                //console.log(!_categoryIs(params.category,sections))
                if(!_categoryIs(params.category,sections)){
                    return true;
                }
            }

        }

    }
}
function compileResponse404(req,res,next) {
    data404.homeHref=req.store.link;
    let d={dj:{'404':data404}}
    if(req.store.favicon){
        d.favicon=req.store.photoHost+"/"+req.store.favicon
    }
    res.render('404.pug', d);
}
function compileResponse(req,res,next) {
    let d1=Date.now();
    console.time('all compiling time')
    //console.time('stage 1')


    if(!req.store.nameLists){
        req.store.nameLists={};
    }
    co(function* () {
        let numParams = Object.keys(req.params).length
        if(!numParams){
            req.homePage=true;
        }
        //console.log('req.homePage',req.homePage)
        //req.homePage=true;
        if(numParams==1){
            //нет state при котором только название секции
            if(globalVar.reservedFirstParams.indexOf(req.params.type)<0){
                return compileResponse404(req,res,next)
            }

            /*if(req.params.type!='news' && req.params.type!='master'&& req.params.type!='stat'
                && req.params.type!='info'&& req.params.type!='campaign'&& req.params.type!='lookbook'&& req.params.type!='additional'){
                return compileResponse404(req,res,next)
            }*/
        }
        var storeHost = req.storeHost;
        var orderHost = req.orderHost;
        var stuffHost = req.stuffHost;
        var userHost = req.userHost;
        var photoHost = req.photoHost;
        var notificationHost = req.notificationHost;
        var socketHost = req.socketHost;
        var local=req.local;


        let key = 'desktop';
        if(req.mobile){key='mobile'};
        if(req.tablet){key='tablet'};


        let urlField;
        if(req.url=='/'){
            urlField='index'
        }else{
            urlField=req.url;
        }
        if(req.crawler){
            urlField+='_crawler'
        }


        // возврат из кеша
        /*if(cache.stores[req.store._id] && cache.stores[req.store._id][req.store.lang] &&
             cache.stores[req.store._id][req.store.lang][urlField] &&
                cache.stores[req.store._id][req.store.lang][urlField][key] &&
                    cache.stores[req.store._id][req.store.lang][urlField][key].exp && moment().unix()
                        < cache.stores[req.store._id][req.store.lang][urlField][key].exp){
             let d2 = Date.now();
             zlib.unzip(cache.stores[req.store._id][req.store.lang][urlField][key].html, function(err, buffer) {
                 if (!err) {
                     console.log('time for INDEX request compile - ', d2 - d1,req.store.subDomain);
                     res.writeHead(200, {"Content-Type": "text/html"});
                     res.write(buffer);
                     return res.end();
                 }else{
                     console.log("zlib.unzip(cache.stores[req.store._id][req.store.lang][urlField][key].html",err)
                 }
             });
             return;

         }*/

        //console.timeEnd('stage 1')

        //console.log(req.store)
        console.time('get dataForIndexPage')
        let dataForIndexPage=yield getindexPage(req)
        try {
            console.timeEnd('get dataForIndexPage')
        }catch(err){}
        //console.time('stage 3')

        let HTMLData=dataForIndexPage.HTMLData;
        let allData=dataForIndexPage.allData;
        let jadeData=dataForIndexPage.jadeData;
        let cssData=dataForIndexPage.cssData;
        let lang=dataForIndexPage.jadeData.lang;
        let template=dataForIndexPage.template;
        let preloadPage=dataForIndexPage.preloadPage;
        if(numParams==2){
            if(_page404(req.params,allData.group,numParams)){
                return compileResponse404(req,res,next)
            }
        }
        //console.timeEnd('stage 3')
        //console.time('stage 4')

        // установка титлов
        let seoUrl=req.url.replace("?_escaped_fragment_","");
        seoUrl=seoUrl.replace("&_escaped_fragment_","")
        let seopage=allData.seopages.getOFA('link',seoUrl)
        if(seopage){

            seopage=yield getItemPage(req.store._id,stuffHost,{model:'Seopage',url:seopage._id,lang:req.store.lang})

            if(seopage && seopage.link){
                if(!seopage.seo){
                    seopage.seo={}
                }
                seopage.seo.keywords=seopage.keywords.map(function(w){
                    return w.word
                }).filter(function(w){return w;}).join(',');
                let titles=seopage.seo;
                titles.domain=req.store.link;
                titles.author=titles.author||req.store.name;
                titles.canonical=req.store.link+seopage.link;
                seopage.desc&&(titles.desc=seopage.desc);
                if(!titles.image){
                    titles.image=jadeData.titles.image;
                }
                for(let k in titles){
                    if(titles[k]){
                        jadeData.titles[k]=titles[k]
                    }
                }
                //jadeData.titles=titles;
            }
        }

        //console.timeEnd('stage 4')
        //console.time('stage 5')
        //let fileName = path.join( __dirname, '../../public/views/menu-home-footer.jade' );

        let menuHomefooter=pugCache['menuHomefooter']//fs.readFileSync(fileName, "utf8")


        let a = menuHomefooter.split("\n")
        if(template.menu2.position=='left'||template.menu2.position=='right'){
            a.splice.apply(a,[10,1].concat(HTMLData.menu2.split("\n")))
        }
        /*fs.writeFile( 'public/views/homepage_'+req.store.subDomain+'.pug', HTMLData.homePageHtml, function (err, data) {
            if (err) console.log(err);
        } );*/
        //HTMLData.homePageHtml = fs.readFileSync('public/views/homepage_'+req.store.subDomain+'.pug','utf8')
        a.splice.apply(a,[9,1].concat(HTMLData.footer.split("\n")))
        if(req.homePage){
            a.splice.apply(a,[7,1].concat(HTMLData.homePageHtml.split("\n").map(function(l){return '      '+l})))
        }
        //a.splice.apply(a,[7,1].concat(HTMLData.homePageHtml.split("\n").map(function(l){return '      '+l})))
        let additionalData;
        if(numParams){
            if(numParams==1 && req.params.type && (req.params.type=='pricegoods' ||req.params.type=='priceservices')){
                additionalData=yield getPriceHTML(req,req.params.type)
            }else if(numParams==1 && req.params.type && req.params.type!='cabinet'){
                additionalData=yield getItemsPageHTML(req)
                let keyList = req.params.type+'List'
                let name= (req.store.nameLists && req.store.nameLists[keyList])?req.store.nameLists[keyList]:'list'
                if(jadeData.titles && typeof jadeData.titles=='object'){
                    jadeData.titles.canonical += '/'+ req.params.type
                    if(!seopage){
                        jadeData.titles.title =name +'. '+jadeData.titles.title
                        jadeData.titles.description =name +'. '+jadeData.titles.description
                    }
                }
            }else if(numParams==2){
                if(req.params.group=='news'){
                    additionalData=yield getItemPageHTML(req,{model:'News',url:req.params.category})
                    jadeData.titles.canonical += '/news'
                }else if(req.params.group=='stat'){
                    additionalData=yield getItemPageHTML(req,{model:'Stat',url:req.params.category})
                    jadeData.titles.canonical += '/stat'
                }else if(req.params.group=='master'){
                    additionalData=yield getItemPageHTML(req,{model:'Master',url:req.params.category})
                    jadeData.titles.canonical += '/master'
                }else if(req.params.group=='additional'){
                    additionalData=yield getItemPageHTML(req,{model:'Additional',url:req.params.category})
                    jadeData.titles.canonical += '/additional'
                }else if(req.params.group=='campaign'){
                    additionalData=yield getItemPageHTML(req,{model:'Campaign',url:req.params.category})
                    jadeData.titles.canonical += '/campaign'
                }else if(req.params.group=='info'){
                    additionalData=yield getItemPageHTML(req,{model:'Info',url:req.params.category})
                    jadeData.titles.canonical += '/info'
                }else if(req.params.group=='workplace'){
                    additionalData=yield getItemPageHTML(req,{model:'Workplace',url:req.params.category})
                    jadeData.titles.canonical += '/workplace'
                }else {
                    additionalData=yield getAdditionalStuffsHTML(req,allData);
                }
            }else if(numParams==3){
                req.allData=allData;
                additionalData=yield getStuffDetailPageHTML(req);
                //console.log('additionalData')
            }
        }else if(req.query.searchStr){
            let searchStr=req.query.searchStr.toLowerCase().trim().substring(0,50);
            if(searchStr){
                additionalData=yield getSearchPageHTML(req,searchStr)
            }
        }
        if(additionalData){
            jadeData.ngCloakHomePage=true;
            a.splice.apply(a,[5,0].concat(additionalData.jadeItem.split("\n").map(function(l){return '      '+l})))
            for(var kk in additionalData.jadeData){
                if(kk=='dj'){
                    for(var k in additionalData.jadeData.dj){
                        jadeData.dj[k]=additionalData.jadeData.dj[k]
                    }
                }else{
                    jadeData[kk]=additionalData.jadeData[kk];
                }
            }
            if(additionalData.cssData && additionalData.cssData.css){
                cssData.css+=additionalData.cssData.css;
            }
            if(additionalData.titles){
                for(let k in additionalData.titles){
                    if(seopage){
                        if((!jadeData.titles[k] && additionalData.titles[k]) || (k=='image' && additionalData.titles[k])){
                            jadeData.titles[k] =additionalData.titles[k]
                        }

                        /*if(k=='desc' && additionalData.titles[k]){
                            jadeData.titles[k] =additionalData.titles[k]+((jadeData.titles[k])?jadeData.titles[k]:'');
                        }else if(!jadeData.titles[k] && additionalData.titles[k]){
                            jadeData.titles[k] =additionalData.titles[k]
                        }*/

                    }else if(!seopage){
                        jadeData.titles[k]=additionalData.titles[k];
                        /*if(k=='title'){
                            jadeData.titles[k] = additionalData.titles[k]+'. '+((jadeData.titles[k])?jadeData.titles[k]:'');
                        }else if(k=='canonical'){
                            //console.log(additionalData.titles.canonical)
                            jadeData.titles.canonical = additionalData.titles.canonical
                            //console.log(additionalData.titles.canonical)
                        }else if(additionalData.titles[k]){
                            jadeData.titles[k] = additionalData.titles[k]
                        }*/
                    }
                }
                //console.log(jadeData.titles)
            }
        }else{
            jadeData.ngCloakHomePage=null;
        }
        try {
            //console.timeEnd('stage 5')
        }catch(err){}

        if(jadeData.titles.canonical && req.query && req.query.lang && req.store.langArr && req.store.langArr.indexOf(req.query.lang)>-1){
            jadeData.titles.canonical+='?lang='+req.query.lang
        }
        console.time('pug compile jadeMenuHomeFooter')

        if(template.menu2.position!='left'&&template.menu2.position!='right'){
            a.splice.apply(a,[1,1].concat(HTMLData.menu2.split("\n")))
        }
        a.splice.apply(a,[0,1].concat(HTMLData.menu1.split("\n")))
        let jadeMenuHomeFooter = a.join("\n")
        let htmlMenuHomeFooter=''
        jadeData.mobile=req.mobile;
        jadeData.tablet=req.tablet;
        //отступ для первого меню справа или слева
        let mainContentDivStyle= null;//'min-height:90vh;';

        if(template.menu1.position=='left' && template.margin && template.menu1.blockStyle && template.menu1.blockStyle[16]){
            if(!mainContentDivStyle){
                mainContentDivStyle=''
            }
            mainContentDivStyle+='padding-left:'+template.menu1.blockStyle[16]
        }
        if(template.menu1.position=='right' && template.margin && template.menu1.blockStyle && template.menu1.blockStyle[16]){
            if(!mainContentDivStyle){
                mainContentDivStyle=''
            }
            mainContentDivStyle+='padding-right:'+template.menu1.blockStyle[16]
        }
        jadeData.mainContentDivStyle=mainContentDivStyle;
        let fn;

        try{
            jadeData.filename= path.join(__dirname, '../../public/views/index.pug');
            jadeData.photoHost=photoHost;
            /*fs.writeFile( 'public/views/'+req.store._id+'.pug', (jadeMenuHomeFooter), function (err, data) {
                if (err) console.log(err);
            } );
            fs.writeFile( 'public/views/'+req.store._id+'.data', JSON.stringify(jadeData), function (err, data) {
                if (err) console.log(err);
            } );*/
            //console.log(urlField)
            if(req.store.cache && req.store.cache.productMode && cachePugFunctions && cachePugFunctions[req.store._id]  &&
                cachePugFunctions[req.store._id]['jadeMenuHomeFooter'] && cachePugFunctions[req.store._id]['jadeMenuHomeFooter'][key]
            && cachePugFunctions[req.store._id]['jadeMenuHomeFooter'][key][urlField]){
               // console.log("cachePugFunctions[req.store._id]['jadeMenuHomeFooter']"+key+urlField,req.store.cache.productMode,req.store.subDomain)
                fn = cachePugFunctions[req.store._id]['jadeMenuHomeFooter'][key][urlField];
            }else{
                fn = pug.compile(jadeMenuHomeFooter,{debug:false,compileDebug:false});
                if(!cachePugFunctions[req.store._id]){
                    cachePugFunctions[req.store._id]={}
                }
                if(!cachePugFunctions[req.store._id]['jadeMenuHomeFooter']){
                    cachePugFunctions[req.store._id]['jadeMenuHomeFooter']={desktop:{},tablet:{},mobile:{}}
                }
                //console.log(key,cachePugFunctions[req.store._id]['jadeMenuHomeFooter'][key])
                cachePugFunctions[req.store._id]['jadeMenuHomeFooter'][key][urlField]=fn
                //cachePugFunctions[req.store._id]['jadeMenuHomeFooter']=fn;
            }

            //console.log(jadeData.sectionsMenu)
            htmlMenuHomeFooter = fn(jadeData);
        }catch(err){
            fn = pug.compile(jadeMenuHomeFooter,{debug:false,compileDebug:false});
            if(cachePugFunctions && cachePugFunctions[req.store._id] && cachePugFunctions[req.store._id]['jadeMenuHomeFooter']){
                cachePugFunctions[req.store._id]['jadeMenuHomeFooter']=null;
            }
            console.log('htmlMenuHomeFooter render error -',req.store.subDomain,urlField,err)
        }

        console.timeEnd('pug compile jadeMenuHomeFooter')
        //console.time('stage 7')



        let globalCrawler = (req.query && req.query.subDomain) ? req.query.subDomain : null;


        let t= template;
        let store= Object.assign({},req.store)


        delete store.template
        delete store.redirect
        store.template={
            clickMenu:t.clickMenu,
            dropDownCatalog:t.menu1.dropDownCatalog,
            menu1:{
                is:t.menu1.is,
                fixed:t.menu1.fixed,
                scrollSlide:t.menu1.scrollSlide,
                position:t.menu1.position,
                background:t.menu1.background,
                BGColorOnHover:t.menu1.BGColorOnHover,
                margin:t.menu1.margin,
                marginOther:t.menu1.marginOther,
                hideMenuIfNotHome:t.menu1.hideMenuIfNotHome,
            },
            inverseColor:t.inverseColor,
            menu2:{
                is:t.menu2.is,
                fixed:t.menu2.fixed,
                position:t.menu2.position,
                slideMenuWidth:t.menu2.slideMenuWidth,
                slideMenuSpeed:t.menu2.slideMenuSpeed,
            },
            communication: t.footer.communication,
            folder:t.folder,

            newsList: {hideList:((t.newsList && t.newsList.hideList)?t.newsList.hideList:false),hideCart:((t.newsList && t.newsList.hideCart)?t.newsList.hideCart:false),hideNameList:((t.newsList && t.newsList.hideNameList)?t.newsList.hideNameList:false)},
            campaignList:{hideList:((t.campaignList && t.campaignList.hideList)?t.campaignList.hideList:false),hideCart:((t.campaignList && t.campaignList.hideCart)?t.campaignList.hideCart:false)},
            masterList:{hideList:((t.masterList && t.masterList.hideList)?t.masterList.hideList:false),hideCart:((t.masterList && t.masterList.hideCart)?t.masterList.hideCart:false)},
            workplaceList:{hideList:((t.workplaceList && t.workplaceList.hideList)?t.workplaceList.hideList:false),hideCart:((t.workplaceList && t.workplaceList.hideCart)?t.workplaceList.hideCart:false)},
            statList:{hideList:((t.statList && t.statList.hideList)?t.statList.hideList:false),hideCart:((t.statList && t.statList.hideCart)?t.statList.hideCart:false)},
            infoList:{hideList:((t.infoList && t.infoList.hideList)?t.infoList.hideList:false),hideCart:((t.infoList && t.infoList.hideCart)?t.infoList.hideCart:false)},
            lookbookList:{hideList:((t.lookbookList && t.lookbookList.hideList)?t.lookbookList.hideList:false),hideCart:((t.lookbookList && t.lookbookList.hideCart)?t.lookbookList.hideCart:false)},
            additionalList:{hideList:((t.additionalList && t.additionalList.hideList)?t.additionalList.hideList:false),hideCart:((t.additionalList && t.additionalList.hideCart)?t.additionalList.hideCart:false)},
            addcomponents:{zoom:{templ:0},cabinet:{templ:0},datetime:{temp:0},addbutton:((t.addcomponents && t.addcomponents.addbutton)?t.addcomponents.addbutton:{})},
            margin:t.margin,
            stuffListCart:t.stuffListCart,
            stuffListType:{},
            dimScreenColor:(t.index && t.index.dimScreen && t.index.dimScreen[0])?t.index.dimScreen[0]:null,
            dimScreenBGColor:(t.index && t.index.dimScreen && t.index.dimScreen[1])?t.index.dimScreen[1]:null,
            filtersForAll:t.filtersForAll,
            index:{icons:{}},
        };
        if(t.index && t.index.icons && typeof t.index.icons=='object'){
            for(let k in t.index.icons){
                if((k=='fbwhite'||k=='twwhite'||k=='googlewhite'||k=='vkwhite'||k=='pinwhite'||k=='okwhite'||k=='instwhite')&& t.index.icons[k].img){
                    store.template.index.icons[k]=t.index.icons[k]
                }
            }
        }
        if(t.addcomponents){
            if(t.addcomponents.zoom  && t.addcomponents.zoom.templ){
                store.template.addcomponents.zoom.templ=t.addcomponents.zoom.templ;
            }
            if(t.addcomponents.cabinet  && t.addcomponents.cabinet.templ){
                store.template.addcomponents.cabinet.templ=t.addcomponents.cabinet.templ;
            }
            if(t.addcomponents.datetime  && t.addcomponents.datetime.templ){
                store.template.addcomponents.datetime.templ=t.addcomponents.datetime.templ;
            }
        }

        store.template.stuffDetailType={}
        for(k in t.stuffDetailType){
            store.template.stuffDetailType[k]={}
            if(t.stuffDetailType[k].ratio){
                store.template.stuffDetailType[k].ratio=t.stuffDetailType[k].ratio;
            }else{
                store.template.stuffDetailType[k].ratio=0;
            }
        }
        for(k in t.stuffListType){
            store.template.stuffListType[k]={}
            if(t.stuffListType[k].rows){
                store.template.stuffListType[k].rows=t.stuffListType[k].rows;
            }
            if(t.stuffListType[k].filtersInModal){
                store.template.stuffListType[k].filtersInModal=t.stuffListType[k].filtersInModal;
            }
            if(t.stuffListType[k].filtersForAll){
                store.template.stuffListType[k].filtersForAll=t.stuffListType[k].filtersForAll;
            }
            if(t.stuffListType[k].hideList){
                store.template.stuffListType[k].hideList=t.stuffListType[k].hideList;
            }
            if(t.stuffListType[k].unsetSort){
                store.template.stuffListType[k].unsetSort=t.stuffListType[k].unsetSort;
            }

            if(t.stuffListType[k] && t.stuffListType[k].parts && t.stuffListType[k].parts.length){
                store.template.stuffListType[k].parts= t.stuffListType[k].parts.filter(el=>{
                    if(el.name=='filters' && el.is){store.template.stuffListType[k].filters=true;}
                    if(el.name=='paginate' && el.is){store.template.stuffListType[k].paginate=true;}
                    return el.name=='categories'||el.name=='filters'
                })
                store.template.stuffListType[k].perPage=(t.stuffListType[k].perPage)?t.stuffListType[k].perPage:20;
            }

        }
        //console.timeEnd('stage 7')
        //console.time('stage 8')
        try {
            let strData = JSON.stringify([
                store,
                req.crawler,
                local,
                req.mobile,
                req.tablet,
                allData.group,
                [],
                //allData.brands,
                allData.stats,
                [],
                //allData.filters,
                allData.paps,
                allData.seopages,
                allData.coupons,
                allData.witget,
                allData.labels,
                lang,
                allData.campaign,
                allData.masters,
                allData.info
            ])
            //let ngInitData = "setInitData(" + strData + ")"
            store.langLink=(store.mainLang!=store.lang)?'?lang='+store.lang:''
            let preloadPageAnimate;
            if(preloadPage && store.preload && store.preload.animate){
                preloadPageAnimate=store.preload.animate
            }
            if(preloadPage){
                if(req.mobile && !store.preload.mobile){
                    preloadPage=null
                } else if(req.tablet && !store.preload.tablet){preloadPage=null
                } else if(!req.tablet && !req.mobile && !store.preload.desctop){preloadPage=null}
            }
            let allJadeData={
                titles:jadeData.titles,
                CSS:HTMLData.CSS+cssData.css,
                htmlMenuHomeFooter:htmlMenuHomeFooter,
                storeHost:storeHost,
                stuffHost:stuffHost,
                userHost:userHost,
                notificationHost:notificationHost,
                socketHost:socketHost,
                orderHost:orderHost,
                photoHost:photoHost,
                globalCrawler:globalCrawler,
                chat:store.chat,
                store:store,
                ngInitData:strData,
                crawler:req.crawler,
                local:local,
                filters:JSON.stringify(allData.filters),
                brands:JSON.stringify(allData.brands),
                langLink:(req.store.mainLang!=req.store.lang)?'?lang='+req.store.lang:'',
                preloadPage:preloadPage,
                preloadPageAnimate:preloadPageAnimate
                /*mobile:req.mobile,
                tablet:req.tablet*/
            }
            if(isWin){
                //console.timeEnd('stage 8')

                res.render('local/index',allJadeData);
                console.timeEnd('all compiling time')
                let clientIp = req.headers['x-real-ip'] || req.headers['X-Real-IP'] || (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress
                console.log('clientIp',clientIp,req.hostname+req.url)
                //console.log(req.store.subDomain)
                return

            }
            //console.log("req.useragent && req.useragent.Browser && req.useragent.Browser",req.useragent && req.useragent.browser && req.useragent.Browser)
            //console.log(req.useragent)
            if(req.useragent && req.useragent.browser && req.useragent.browser=='IE'){
                res.render('index',allJadeData);
                console.timeEnd('all compiling time')
                //console.log(' for IE')
                let clientIp = req.headers['x-real-ip'] || req.headers['X-Real-IP'] || (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress
                console.log('clientIp',clientIp,req.hostname+req.url)
                return;
            }



            let filename=path.join(__dirname, '../../public/views/index.pug')
            let basedir=path.join(__dirname, '../../public/views')
            allJadeData.filename=filename;




            //let endhtml= pug.render(pugCache['mainIndexJade'],allJadeData,{filename: filename, basedir:basedir, pretty:  true});
            let fn;
            try{
                //console.log('req.store.cache',req.store.cache)
                if(req.store.cache && req.store.cache.productMode && cachePugFunctions && cachePugFunctions[req.store._id]  &&
                    cachePugFunctions[req.store._id]['mainIndexJade'] && cachePugFunctions[req.store._id]['mainIndexJade'][key]){
                    //console.log("cachePugFunctions[req.store._id]['mainIndexJade'][key]")
                    fn = cachePugFunctions[req.store._id]['mainIndexJade'][key];
                }else{
                    fn = pug.compile(pugCache['mainIndexJade'],{debug:false,compileDebug:false});
                    if(!cachePugFunctions[req.store._id]){
                        cachePugFunctions[req.store._id]={}
                    }
                    if(!cachePugFunctions[req.store._id].mainIndexJade){
                        cachePugFunctions[req.store._id].mainIndexJade={'desctop':null,mobile:null,tablet:null}
                    }

                    cachePugFunctions[req.store._id]['mainIndexJade'][key]=fn;
                }
            }catch(err){
                if(cachePugFunctions && cachePugFunctions[req.store._id] && cachePugFunctions[req.store._id]['mainIndexJade']){
                    cachePugFunctions[req.store._id]['mainIndexJade']=null;
                    fn = pug.compile(pugCache['mainIndexJade'],{debug:false,compileDebug:false});
                }
                console.log('mainIndexJade compile',err)
            }



            let endhtml = fn(allJadeData);



            //console.timeEnd('stage 8')
            try {
                console.timeEnd('all compiling time')
                let clientIp = req.headers['x-real-ip'] || req.headers['X-Real-IP'] || (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress
                console.log('clientIp',clientIp,req.hostname+req.url)
            }catch (err){}

            //console.log(req.store.subDomain)

            let seconds = 100000;
            if(req.store.cache && req.store.cache.seconds){
                seconds = req.store.cache.seconds;
            }
            //res.render('index',allJadeData);
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(endhtml);
            return res.end();

        }catch(e){
            console.log('render index block - ',e)
        }

    }).catch(function (err) {
        //console.log('err compile responce-',err)
        next(err)
    })
}

function getindexPage(req){
    let photoHost=req.photoHost;
    let stuffHost=req.stuffHost;
    let storeHost=req.storeHost;
    return co(function* () {
        //console.time('getindexPage all time')
        //console.time('getindexPage stage 1')
        let template= Object.assign({},req.store.template)
        //console.timeEnd('getindexPage stage 1')
        //console.time('getindexPage stage 2')
        let k =1;
        if(req.mobile){k=0.2}else if(req.tablet){k=0.5}
        let  local=(req.hostname.indexOf('localhost')>-1)?true:false;
        //let d1=Date.now()
        let allData = yield getAllData(req.store,stuffHost,req.store.subDomain,local);
        //console.timeEnd('getindexPage stage 2')
        //console.time('getindexPage stage 3')
        var jadeData={dj:{},titles:{title:'',description:'',keywords:''}},cssData={css:''};
        // установка титлов
        for(let k in jadeData.titles){if(req.store.seo && req.store.seo[k])jadeData.titles[k]=req.store.seo[k]}
        jadeData.titles.domain=req.store.domain;
        jadeData.titles.author=req.store.name;
        jadeData.titles.canonical=req.store.link;
        if(req.store.logo){jadeData.titles.image=photoHost+'/'+req.store.logo;}
        if(req.store.fbPhoto){jadeData.titles.image=photoHost+'/'+req.store.fbPhoto;}
        let lang=req.store.langData;
        jadeData.lang=lang;
        jadeData.sections=allData.group
        jadeData.sectionsMenu=allData.sectionsMenu
        jadeData.brandsMenu=allData.brandsMenu
        if(jadeData.sections.length){
            jadeData.sections.sort(function(a,b){return a.index- b.index});
        }
        /*console.timeEnd('getindexPage stage 3')
        console.time('getindexPage stage 4')*/

        jadeData.brands=allData.brands;
        jadeData.stat=allData.stats;
        jadeData.stats=allData.stats;
        jadeData.infos=allData.info;
        jadeData.preloadPage=allData.preloadPage;

        jadeData.store=req.store
        jadeData.currencyNgClass=(function(){
            let ngclass='{';
            for(var i=0,l=req.store.currencyArr.length;i<l;i++){
                if(i)ngclass+=",";
                ngclass+="'icon-"+req.store.currencyArr[i].toLowerCase()+"-img':'"+req.store.currencyArr[i].toUpperCase()+"'==global.get('currency').val";
            }
            ngclass+="}";
            return ngclass
        })()
        jadeData.photoHost=photoHost;
        jadeData.sn=req.store.sn
        if(!req.store.footer){req.store.footer={}}
        jadeData.footerText=(req.store.footer.text || '');
        jadeData.footerTextOne=(req.store.footer.text1 || '');
        if(req.mobile){
            jadeData.mobileWrapper='mobile-wrapper'
        }else if(req.tablet){
            jadeData.mobileWrapper='tablet-wrapper'
        }else{
            jadeData.mobileWrapper=''}
        /*console.timeEnd('getindexPage stage 4')
        console.time('getindexPage stage 5')*/
        setMenuDataForMobile(req,template)
        /*console.timeEnd('getindexPage stage 5')
        console.time('getindexPage stage 6')*/

        var slide = (template.menu2 && template.menu2.is)?template.menu2.position:null; // боковая позиция второго меню

        /*let jadeCollections=[];
        console.time('getindexPage getHomePageHtml')
        jadeCollections[0]=yield getHomePageHtml(allData.homePage,req,jadeData,cssData);
        console.timeEnd('getindexPage getHomePageHtml')
        console.time('getindexPage getMainCSS')
        jadeCollections[1]=getMainCSS(req.store,template,photoHost,k);
        console.timeEnd('getindexPage getMainCSS')
        console.time('getindexPage getHeader1')
        jadeCollections[2]=yield getHeader(template.menu1,'menu1',
            {store:req.store,sections:allData.group,stats:allData.stats,storeHost:storeHost,photoHost:photoHost,humburger:template.humburger},
            slide,req.store._id,menu1Key,req.mobile,req.tablet,lang,req.addVar,jadeData,cssData);
        console.timeEnd('getindexPage getHeader1')
        console.time('getindexPage getHeader2')
        jadeCollections[3]=yield getHeader(template.menu2,'menu2',
            {store:req.store,sections:allData.group,stats:allData.stats,storeHost:storeHost, photoHost:photoHost,humburger:template.humburger},
            template.menu1,req.store._id,menu2Key,req.mobile,req.tablet,lang,req.addVar,jadeData,cssData);
        console.timeEnd('getindexPage getHeader2')
        console.time('getindexPage getFooter')
        jadeCollections[4]=yield getFooter(req,template,footerKey,lang,allData.group,allData.stats,photoHost,req.addVar,jadeData,cssData);
        console.timeEnd('getindexPage getFooter')
        console.time('getindexPage getPreloadPageHtml')
        jadeCollections[5]=yield getPreloadPageHtml(allData.preloadPage,req,jadeData,cssData);
        console.timeEnd('getindexPage getPreloadPageHtml')*/
        let jadePromiseCollections=[
            getHomePageHtml(allData.homePage,req,jadeData,cssData),

            getMainCSS(req.store,template,photoHost,k),
            getHeader(template.menu1,'menu1',
                {store:req.store,sections:allData.group,stats:allData.stats,labels:allData.labels,storeHost:storeHost,photoHost:photoHost,humburger:template.humburger},
                slide,req.store._id,menu1Key,req.mobile,req.tablet,lang,req.addVar,jadeData,cssData),
            getHeader(template.menu2,'menu2',
                {store:req.store,sections:allData.group,stats:allData.stats,labels:allData.labels,storeHost:storeHost, photoHost:photoHost,humburger:template.humburger},
                template.menu1,req.store._id,menu2Key,req.mobile,req.tablet,lang,req.addVar,jadeData,cssData),
            getFooter(req,template,footerKey,lang,allData.group,allData.stats,photoHost,req.addVar,jadeData,cssData),
            getPreloadPageHtml(allData.preloadPage,req,jadeData,cssData),
        ]
        /*console.timeEnd('getindexPage stage 6')
        console.time('getindexPage stage 7')*/
        /*console.log(template.menu1.marginOther)
        console.log(!req.homePage && template.menu1.marginOther)*/
        if(req.homePage && template.margin){
            if(template.menu2 && template.menu2.is && template.menu2.position=='top'){
                var px=0;

                if(template.menu1.elements && template.menu1.elements['@navbar'] && template.menu1.elements['@navbar'][17]){
                    px+=parseInt(template.menu1.elements['@navbar'][17])
                }
                if(template.menu2.elements && template.menu2.elements['@navbar'] && template.menu2.elements['@navbar'][17]){
                    px+=parseInt(template.menu2.elements['@navbar'][17])
                }
                if(px){
                    cssData.css='#mainContentDiv{margin-top:'+px +'px}'+"\n"+cssData.css
                }
            }else{
                if(template.menu1.elements && template.menu1.elements['@navbar'] && template.menu1.elements['@navbar'][17]){
                    cssData.css='#mainContentDiv{margin-top:'+template.menu1.elements['@navbar'][17] +'}'+"\n"+cssData.css
                }
            }
        }else if(!req.homePage && !template.menu1.marginOther){
            if(template.menu2 && template.menu2.is && template.menu2.position=='top'){
                var px=0;
                if(template.menu1.elements && template.menu1.elements['@navbar'] && template.menu1.elements['@navbar'][17] && !template.menu1.hideMenuIfNotHome){
                    px+=parseInt(template.menu1.elements['@navbar'][17])
                }
                if(template.menu2.elements && template.menu2.elements['@navbar'] && template.menu2.elements['@navbar'][17]){
                    px+=parseInt(template.menu2.elements['@navbar'][17])
                }
                if(px){
                    cssData.css='#mainContentDiv{margin-top:'+px +'px}'+"\n"+cssData.css
                }
            }else{
                if(template.menu1.elements && template.menu1.elements['@navbar'] && template.menu1.elements['@navbar'][17]){
                    cssData.css='#mainContentDiv{margin-top:'+template.menu1.elements['@navbar'][17] +'}'+"\n"+cssData.css
                }
            }
        }
        //console.timeEnd('getindexPage stage 7')
        //console.time('getindexPage stage 8')
        let jadeCollections = yield Promise.all(jadePromiseCollections);
        let HTMLData = {
            homePageHtml:jadeCollections[0],
            CSS: jadeCollections[1],
            menu1: jadeCollections[2],
            menu2: jadeCollections[3],
            footer: jadeCollections[4],
        }
        let o={
            HTMLData:HTMLData,
            allData:allData,
            jadeData:jadeData,
            cssData:cssData,
            template:template,
            preloadPage: jadeCollections[5]
        }
        //console.timeEnd('getindexPage stage 8')
        //console.timeEnd('getindexPage all time')
        return o;

    }).catch(function (err) {
        console.log('getindexPage -')
        throw err
        console.log('getindexPage -',err)
    })
}
function _categoryIs(url,sections) {
    for(let i=0;i<sections.length;i++){
        if(sections[i].categories && sections[i].categories.length){
            for(let ii=0;ii<sections[i].categories.length;ii++){
                //console.log(sections[i].categories[ii].url,url,sections[i].categories[ii])
                if(sections[i].categories[ii].url==url && !sections[i].categories[ii].notActive){
                    return sections[i].categories[ii]._id
                }
            }
        }
        if(sections[i].child && sections[i].child.length){
            for(let j=0;j<sections[i].child.length;j++){
                if(sections[i].child[j].categories && sections[i].child[j].categories.length){
                    for(let jj=0;jj<sections[i].child[j].categories.length;jj++){
                        if(sections[i].child[j].categories[jj].url==url && !sections[i].child[j].categories[jj].notActive){
                            return sections[i].child[j].categories[jj]._id
                        }
                    }
                }
            }
        }
    }
}
function _sectionIs(sections,url) {
    for(let i=0;i<sections.length;i++){
        if(sections[i].url==url){
            return sections[i]._id
        }
        if(sections[i].child && sections[i].child.length){
            for(let j=0;j<sections[i].child.length;j++){
                if(sections[i].child[j].categories && sections[i].child[j].categories.length){
                    if(sections[i].child[j].url==url){
                        return sections[i].child[j]._id
                    }
                }
            }
        }
    }
}
function _getCategory(id,sections) {
    let _id;
    if(id && id.length){
        _id=id[0]
    }else{
        _id=id;
    }
    for(let i=0;i<sections.length;i++){
        if(sections[i].categories && sections[i].categories.length){
            for(let ii=0;ii<sections[i].categories.length;ii++){
                if(sections[i].categories[ii]._id==_id){
                    return sections[i].categories[ii]
                }
            }
        }
        if(sections[i].child && sections[i].child.length){
            for(let j=0;j<sections[i].child.length;j++){
                if(sections[i].child[j].categories && sections[i].child[j].categories.length){
                    for(let jj=0;jj<sections[i].child[j].categories.length;jj++){
                        if(sections[i].child[j].categories[jj]._id==_id){
                            return sections[i].child[j].categories[jj]
                        }
                    }
                }
            }
        }
    }
}
function _getParentSection(sections,sectionUrl,id){
    if(!sections) return  null;
    for(var i=0,l=sections.length;i<l;i++){
        if(sections[i].url && sections[i].url==sectionUrl){
            return sections[i];
            break
        }
        if (sections[i].child && sections[i].child.length){
            for(var ii=0,ll=sections[i].child.length;ii<ll;ii++){
                if(sections[i].child[ii].url && sections[i].child[ii].url==sectionUrl){
                    return sections[i].child[ii];
                    break
                }
            }
        }
    }
    return null;
}

function getAdditionalStuffsHTML(req,allData) {
    let sectionClass= new SectionClass.init(allData.group)
    let dQ= new DesignQuery.init(allData.brands,allData.brandTag,allData.filters,sectionClass)
    let queryDone = dQ.getQuery(req.params,req.query)
    //console.log(req.params)
    let stuffListType = sectionClass.getListType(req.params)
    //console.log(stuffListType)
    return getStuffsListPageHTML(queryDone,stuffListType,req,null)
}


function getSearchPageHTML(req,searchStr) {
    if(!req.store.template.search){
        req.store.template.search={blocks:[
            {type:'stuff',is:true},
            {type:'stat',is:true},
            {type:'news',is:true},
            {type:'info',is:true}
        ]}
    }
    let query={lang:req.store.lang,searchStr:searchStr,models:[]}
    req.store.template.search.blocks.forEach(function (b) {
        if(b.is){
            query.models.push(b.type)
        }
    })
    let home='search';
    let jadeData={dj:{}},cssData={css:''};

    var homePath = path.join( __dirname, '../../public/views/template/partials/'+home+'/' );
    //var itemPath = path.join( __dirname, '../../public/views/template/partials/'+type+'/' );
    var storeHost = req.storeHost;
    var stuffHost = req.stuffHost;
    var photoHost = req.photoHost;

    jadeData.mobile=req.mobile;
    jadeData.tablet=req.tablet;
    jadeData.photoHost=photoHost;
    let addVar=req.addVar;
    return new Promise(function (resolve,reject) {
        Promise.resolve()
            .then(function(res){
                return getSearchItems(req.store._id,stuffHost,query)
            })
            .then(function(results){
                if(!results) {
                    throw '404'
                }
                let resultsForModel={}
                var modelsNameSearch={}
                query.models.forEach(function (m,i) {
                    if(results[i].length){
                        resultsForModel[m]= results[i]

                        modelsNameSearch[m]=globalVar.modelsName[m][req.store.lang]
                    }
                })
                let jadeHTML='';
                let parts=[];
                let tab = '    ';

                let key ="wrap-static-page"+Date.now()
                parts.push("- var key = '"+key+"'")
                parts.push("div(class=dj[key].wrapclass)")
                parts.push("  div(class=mobileWrapper)")

                let element=req.store.template.search;
                element.type='search';
                element.wrapclass=key;
                element.empty= results.every(function (items) {
                    return !items.length
                })
                element.i=1;
                jadeData.dj[key]=element;
                let image,desc;// for titles
                let data={}
                if(!element.empty){
                    req.store.template.search.blocks.forEach(function(block,index){
                        if(block.type && block.is && resultsForModel[block.type]){
                            block.items=resultsForModel[block.type]
                            block.model=block.type;

                            block.modelName=modelsNameSearch[block.model]

                            if(block.type!='stuff'){block.type='list'}

                            block.i=index+Date.now();
                            jadeHTML+=getPartWithKey(block,'search',homePath)
                            jadeData.dj[block.wrapclass]=block;

                            getCSSForBlock(homePath,block,'search',cssData,addVar)
                        }
                    })
                }else{
                    let block={}
                    block.type='empty'
                    block.i='12'+Date.now();
                    jadeHTML+=getPartWithKey(block,'search',homePath)
                    jadeData.dj[block.wrapclass]=block;
                    getCSSForBlock(homePath,block,'search',cssData,addVar)
                }

                getCSSForBlock(homePath,element,'search',cssData,addVar)
                parts.splice.apply(parts,[3,0].concat(jadeHTML.split('\n').filter(function(e){return e;}).map(function (l) {return tab+l})))
                let jadeItem =parts.join("\n")
                let titles={title:' search results'};
                titles.canonical=req.store.link+'/search?searchStr='+searchStr;
                let o={
                    jadeItem:jadeItem,
                    jadeData:jadeData,
                    cssData:cssData,
                    titles:titles,
                }
                resolve(o)
            },function(err){console.log('eror 2 promise ',err)})
            .catch(function (err) {
                if(err!=404){reject(err)}
                //throw err;
                let titles={title:' 404'};
                let jadeHTML='';
                let parts=[];
                let tab = '    ';

                let key ="404"
                parts.push("- var key = '"+key+"'")
                parts.push("div(class=dj[key].wrapclass)")
                parts.push("  div(class=mobileWrapper)")
                data404.homeHref=req.store.link;
                jadeData.dj[key]=data404;
                let fileName = path.join( __dirname, '../../public/views/404include.jade' );
                jadeHTML=fs.readFileSync(fileName, "utf8")
                parts.splice.apply(parts,[3,0].concat(jadeHTML.split('\n').filter(function(e){return e;}).map(function (l) {return tab+l})))
                let jadeItem =parts.join("\n")
                fileName = path.join( __dirname, '../../public/styles/404.css' );
                cssData.css=fs.readFileSync(fileName, "utf8")
                let o={
                    jadeItem:jadeItem,
                    jadeData:jadeData,
                    cssData:cssData,
                    titles:titles,
                    item:404
                }
                resolve(o)
            })
    })
}





function setMenuDataForMobile(req,template) {
    if(template.menu1 && template.menu1.parts){
        template.menu1.parts=template.menu1.parts.filter(function(p){ return (p && p.is)})
    }else{
        if(!template.menu1){template.menu1={}}
        template.menu1.parts=[]
    }
    if(template.menu2 && template.menu2.parts){
        template.menu2.parts=template.menu2.parts.filter(function(p){return p && p.is})
    }else{
        if(!template.menu2){template.menu2={}}
        template.menu2.parts=[]
    }


    if(req.mobile || req.tablet){
        menu1Key='menu1M';
        menu2Key='menu2M';
        footerKey='footerM';
        if(req.tablet && template.menuTablet &&  template.menuTablet.use){
            template.menu1=template.menuTablet.menu1;
            template.menu2=template.menuTablet.menu2;
            template.margin=template.menuTablet.margin;
            template.clickMenu=template.menuTablet.clickMenu;
            template.inverseColor=template.menuTablet.inverseColor;
            if(template.menuTablet.humburger){template.humburger=template.menuTablet.humburger}


            template.menu1.parts=template.menu1.parts.filter(function(p){ return (p && p.is)})
            template.menu2.parts=template.menu2.parts.filter(function(p){return p && p.is})

            return;
        }

        if(req.mobile && template.menuMobile &&  template.menuMobile.use){

            template.menu1=template.menuMobile.menu1;
            template.menu2=template.menuMobile.menu2;
            template.margin=template.menuMobile.margin;
            template.clickMenu=template.menuMobile.clickMenu;
            template.inverseColor=template.menuMobile.inverseColor;
            if(template.menuMobile.humburger){template.humburger=template.menuMobile.humburger}
            template.menu1.parts=template.menu1.parts.filter(function(p){ return (p && p.is)})
            template.menu2.parts=template.menu2.parts.filter(function(p){return p && p.is})

            return;
        }


        var parts=[];
        let cart,cartIs;
        template.clickMenu=true;
        template.menu1.position='top';

        template.menu1.fixed=true;
        //template.menu1.background=true;

        var isLogo=template.menu1.parts.some(function(el){return el.name=='logo'})
        for(var i=0;i<template.menu1.parts.length;i++){
            if(template.menu1.parts[i].name=='name' && isLogo){
                template.menu1.parts.splice(i,1);
                i--;
            }else if(template.menu1.parts[i].name!='logo'&&template.menu1.parts[i].name!='cart'&&template.menu1.parts[i].name!='humburger'){
                var part=template.menu1.parts.splice(i,1);
                i--;
                parts.unshift(part[0])
            }else if(template.menu1.parts[i].name=='cart'){
                cartIs=true;
                template.menu1.parts[i].position='right'
            }else if(template.menu1.parts[i].name=='humburger'){
                template.menu1.parts[i].position='left'
            }
        }

        if(!cartIs){
            for(var i=0,l=template.menu2.parts.length;i<l;i++){
                //ищем корзину

                if(template.menu2.parts[i] && template.menu2.parts[i].name=='cart'){
                    cart = template.menu2.parts.splice(i,1)[0];
                    cart.position='right'
                    template.menu1.parts.push(cart)
                    break;
                }
            }
        }





        if(parts.length){
            template.menu2.is=true;
            template.menu2.position='left';
            if(req.mobile){
                template.menu2.slideMenuWidth='90%';
            }else if(req.tablet){
                template.menu2.slideMenuWidth='60%';
            }

            if(template.menu2.parts && template.menu2.parts.length){
                Array.prototype.push.apply(template.menu2.parts, parts);
            }else{
                template.menu2.parts=parts;
            }

        } else{
            if(template.menu2.is){
                template.menu2.position='left';
                if(template.menu2.mobile){
                    template.menu2.slideMenuWidth='90%';
                }else if(template.menu2.tablet){
                    template.menu2.slideMenuWidth='60%';
                }
            }
        }


        // define order of parts
        /*
         * 1.search
         * 2.enter
         * 3.cart
         * 4.sale
         * 5.new
         * 6.catelog
         * 7.info
         * 8.news
         * 9.lookbook
         * */

        var part;
        if(template.menu2.parts.length){
            template.menu2.mobile=req.mobile;
            template.menu2.tablet=req.tablet;


            // delete name
            for(var i =0,l=template.menu2.parts.length;i<l;i++){
                //if(!template.menu2.parts[i] || !template.menu2.parts[i].is){continue}
                if(template.menu2.parts[i].blockStyle && typeof template.menu2.parts[i].blockStyle[18]!='undefined'){
                    template.menu2.parts[i].blockStyle[18]=null;
                }


                template.menu2.parts[i].position='left'
                if(template.menu2.parts[i].name=='name'){
                    template.menu2.parts.splice(i,1)
                    i--;
                }else if(template.menu2.parts[i].name=='search'){
                    template.menu2.parts[i].index=0;
                }else if(template.menu2.parts[i].name=='enter'){
                    template.menu2.parts[i].index=1;
                }else if(template.menu2.parts[i].name=='catalog'){
                    template.menu2.parts[i].index=2;
                }else if(template.menu2.parts[i].name=='cart'){
                    template.menu2.parts[i].index=3;
                }else if(template.menu2.parts[i].name=='currency'){
                    template.menu2.parts[i].index=4;
                }else if(template.menu2.parts[i].name=='sale'){
                    template.menu2.parts[i].index=5;
                }else if(template.menu2.parts[i].name=='campaign'){
                    template.menu2.parts[i].index=6;
                }else if(template.menu2.parts[i].name=='new'){
                    template.menu2.parts[i].index=7;
                }else if(template.menu2.parts[i].name=='catalog'){
                    template.menu2.parts[i].index=8;
                }else if(template.menu2.parts[i].name=='info'){
                    template.menu2.parts[i].index=9;
                }else if(template.menu2.parts[i].name=='news'){
                    template.menu2.parts[i].index=10;
                }else if(template.menu2.parts[i].name=='lookbook'){
                    template.menu2.parts[i].index=11;
                }
            }
            template.menu2.parts.sort(function(a,b){return a.index-b.index})

        }



    }else{
        menu1Key='menu1';
        menu2Key='menu2';
        footerKey='footer';
    }
}




// установка запроса к серверу товаров по URL
/*
function _setBrand(brandId,filed){
    if(brandId && self.prop.brands){
        //brandTagId=brandTagId.split('+')
        self.prop.brand =  self.prop.brands.getOFA(filed,brandId);
        if (self.prop.brand){
            self.prop.query.brand=self.prop.brand._id;
            $location.search('brand',self.prop.brand.url);
            // установка коллекций
            //self.prop.brandCollections=self.prop.brand.tags;
        } else {
            //self.prop.brandCollections=[];
            $location.search('brand',null);
        }
    }else{
        //self.prop.brandCollections=[];
        $location.search('brand',null);
    }

}
function _setBrandTag(brandTagId){
    if (brandTagId){
        brandTagId=brandTagId.split('+')
        if(self.prop.brandCollections && brandTagId.length){
            var brandTag=self.prop.brandCollections.filter(function(c){
                return brandTagId.indexOf(c.url)>-1
            })
        }
        // если есть tag коллекции в стороке запроса то устанавливаем его в филоьтрах

        if(brandTag && brandTag.length){
            self.prop.query.brandTag=brandTag.map(function(t){return t._id});
            $location.search('brandTag',brandTag.map(function(t){return t.url}).join('+'));
        } else {
            $location.search('brandTag',null);
        }
    } else {
        $location.search('brandTag',null);
    }
}
function _setFilterTagsUrl(){
    if (self.prop.filterTags && self.prop.filterTags.length){
        self.prop.query.tags={};
        var queryTag = self.prop.filterTags.map(function(tag){
            if(!tag)return;
            if(!self.prop.query.tags[tag.filter]){self.prop.query.tags[tag.filter]=[]}
            self.prop.query.tags[tag.filter].push(tag._id);
            return tag.url} ).join('+');
        $location.search('queryTag', queryTag);

    }else{
        $location.search('queryTag', null);
    }
}
*/


return;



