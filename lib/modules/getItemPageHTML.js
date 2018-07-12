'use strict';
const fs=require('fs');
const path=require('path');
const request=require('request');
const globalVar=require('../../public/scripts/globalVariable.js')
const getPartWithKey = require('../modules/getPartWithKey');
const getCSSForBlock = require('../modules/getCSSForBlock');
const hangleBlocksForPugCompile = require('../modules/hangleBlocksForPugCompile');
const setMobileOrTabletStyle=require('../setMobileOrTabletStyle');
const getItemPage = require('../modules/getItemPage');
const getItemsForPage = require('../modules/getItemsForPage');
const pugCache=require('../pugCache');

const isWin = /^win/.test(process.platform);
const zlib = require('zlib');
let data404=require('../data404');



module.exports = function getItemPageHTML(req,query,itemPage) {
    //console.log('itemPage',itemPage)
    // staticPage nes detail
    let type=query.model.toLowerCase()
    //console.log(req.store.lang)
    query.lang=req.store.lang;
    let home='home';
    let jadeData={dj:{}},cssData={css:''};

    var homePath = path.join( __dirname, '../../public/views/template/partials/'+home+'/' );
    var itemPath = path.join( __dirname, '../../public/views/template/partials/'+type+'/' );
    var stuffHost = req.stuffHost;
    var photoHost = req.photoHost

    jadeData.mobile=req.mobile;
    jadeData.tablet=req.tablet;
    jadeData.photoHost=photoHost;
    return new Promise(function (resolve,reject) {
        Promise.resolve()
            .then(function(){
                if(itemPage){return}
                if(type=='info'){
                    var queryInfo = {model:type,lang:req.store.lang,query:'query='+JSON.stringify({actived:true})}
                    return getItemsForPage(req.store._id,stuffHost,queryInfo)
                }
            })
            .then(function(res){
                if(itemPage){return itemPage}
                if(res){
                    if(res && res.length){
                        res.shift()
                        jadeData.info=res;
                        jadeData.info.forEach(function (i) {if(query.url==i.url){i.active=true}})
                    }else{
                        jadeData.info=[]
                    }
                }
                //console.log(query)
                return getItemPage(req.store._id,stuffHost,query)
            })
            .then(async function(item){
                //console.log(item.name)
                if(!item) {
                    throw '404'
                }
                let addVar=req.addVar;
                let jadeHTML='';
                let parts=[];
                let tab = '    ';

                let element=(req.store.template[type])?req.store.template[type]:{};
                let key ="wrap-static-page"+item._id
                let s = (req.store.template[type] && req.store.template[type].templ)?req.store.template[type].templ:''
                key = "wrap-"+type+"-"+type+s+1;

                parts.push("- var key = '"+key+"'")
                let mainDiv="div(class=dj[key].wrapclass"
                if(element.setImgAsBackground && element.img){
                    let style='style="background-image:url('+photoHost+'/'+element.img+');"'
                    mainDiv +=','+style
                }
                mainDiv +=")"
                parts.push(mainDiv)
                parts.push("  div(class=mobileWrapper)")


                element.type=type;
                element.wrapclass=key;
                element.i=1;
                jadeData.dj[key]=element;
                let image,desc;// for titles
                let data={}


                if(type=='info' || type=='campaign'){
                    if(type=='info' && item.blocks && item.blocks.length){
                        item.blocks=item.blocks.filter(function(b){return b.actived})
                    }
                    data.itemDetail=item;
                    for(let k in data){
                        jadeData.dj[key][k]=data[k]
                    }
                    let homePath = path.join( __dirname, '../../public/views/template/partials/'+type+'/' );
                    let s = (req.store.template[type] && req.store.template[type].templ)?req.store.template[type].templ:''
                    jadeHTML= getPartWithKey(element,type,homePath)
                }else{
                    item.video='';
                    item.img='';
                    item.desc='';
                    //console.log(item.img_tr)
                    if(item.img_tr){
                        if(item.img_tr.video){
                            item.video=item.img_tr.video;
                        }
                        if(item.img_tr.img){
                            item.img=item.img_tr.img;
                        }
                        if(item.img_tr.imgs){
                            item.imgs=item.img_tr.imgs;
                        }
                        if(item.img_tr.desc){
                            item.desc=item.img_tr.desc;
                        }
                    }

                    try{
                        jadeHTML+=await hangleBlocksForPugCompile(item.blocks,req,jadeData,cssData,item)
                        //console.log(jadeData)
                    }catch(err){
                        console.log('hangleBlocksForPugCompil',err)
                        throw err;
                    }
                }
                setMobileOrTabletStyle(req,element)
                getCSSForBlock(itemPath,element,type,cssData,addVar)
                parts.splice.apply(parts,[3,0].concat(jadeHTML.split('\n').filter(function(e){return e;}).map(function (l) {return tab+l})))
                let jadeItem =parts.join("\n")
                let titles={title:' '+item.name};
                if(!item.img && item.imgs  && item.imgs[0] && item.imgs[0].img){
                    item.img=item.imgs[0].img;
                }
                if(item.img){titles.image=photoHost+ '/'+ item.img}
                if(item.desc){titles.description=item.desc}
                titles.canonical=req.store.link+'/'+type+'/'+item.url
                let o={
                    jadeItem:jadeItem,
                    jadeData:jadeData,
                    cssData:cssData,
                    titles:titles,
                    item:item
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
} //newsdetail stat detail