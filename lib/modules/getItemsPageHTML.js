'use strict';
const fs=require('fs');
const path=require('path');
const request=require('request');
const globalVar=require('../../public/scripts/globalVariable.js')
const getPartWithKey = require('../modules/getPartWithKey');
const getCSSForBlock = require('../modules/getCSSForBlock');
const getItemPage = require('../modules/getItemPage');
const getItemsForPage = require('../modules/getItemsForPage');
const setMobileOrTabletStyle=require('../setMobileOrTabletStyle');
const pugCache=require('../pugCache');
const isWin = /^win/.test(process.platform);
const zlib = require('zlib');
const moment=require('moment')
let data404=require('../data404');
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



module.exports = function getItemsPageHTML(req) {
    /*console.log(req.params)
    console.log(req.query)
    console.log(req.url)*/
    let type= req.params.type[0].toUpperCase() + req.params.type.substr(1);
    let jadeData={dj:{}},cssData={css:''};
    var stuffHost = req.stuffHost;
    let photoHost = req.photoHost;
    return new Promise(function (resolve,reject) {
        let page=0;
        let rows=(req.tablet)?20:21;
        Promise.resolve()
            .then(function(){
                let data={model:type,query:'',lang:req.store.lang}
                if(req.query.page){
                    data.query='page='+req.query.page;
                    page=req.query.page;
                }
                if(req.query.perPage){
                    if(data.query){
                        data.query+='&perPage='+req.query.perPage
                    }else{
                        data.query='perPage='+req.query.perPage
                    }
                }else{
                    if(data.query){
                        data.query+='&perPage='+rows
                    }else{
                        data.query='perPage='+rows
                    }
                }

                if(req.query.query){
                    if(data.query){
                        data.query+='&query='+req.query.query
                    }else{
                        data.query='query='+req.query.query
                    }
                }else{
                    if(req.params.type=='master' || req.params.type=='news'||req.params.type=='campaign' ||req.params.type=='lookbook' ||req.params.type=='stat'||req.params.type=='additional' ||req.params.type=='info'){
                        let query={actived:true}
                        if(data.query){
                            data.query+='&query='+JSON.stringify(query)
                        }else{
                            data.query='query='+JSON.stringify(query)
                        }
                    }
                }
                //console.log('data',data)
                return getItemsForPage(req.store._id,stuffHost,data)
            })
            .then(function(items){

                if(!items) {
                    throw '404'
                }
                let total=0;
                if(!page && items.length){
                    total = items.shift().index
                }
                var homePath = path.join( __dirname, '../../public/views/template/partials/list' );

                let type = 'list';
                if(req.mobile || (req.store.template && req.store.template[req.params.type+'List']
                    &&req.store.template[req.params.type+'List'].rows==1)){
                    type='listmobile';
                }if(type!='listmobile' && (req.tablet || (req.store.template && req.store.template[req.params.type+'List']
                    &&req.store.template[req.params.type+'List'].rows==2))){type='listtablet'}
                let d = {type:type,i:type}
                let jadeItem = getPartWithKey(d,'list',homePath+'/')
                let a = jadeItem.split('\n')
                let key ="wrap-list-"+type+d.i;
                jadeData.dj[key]={
                    page:page,
                    total:total,
                    qty:items.length,
                }
                if(!page){
                    jadeData.dj[key].img=(req.store.template[req.params.type+'List'] && req.store.template[req.params.type+'List'].img)?req.store.template[req.params.type+'List'].img:null;
                }
                if(!req.store.template[req.params.type+'List'] || typeof req.store.template[req.params.type+'List']!='object'){
                    req.store.template[req.params.type+'List']={}
                }
                if(req.store.template[req.params.type+'List'].chess){
                    jadeData.dj[key].chess=true;
                }
                let element=(req.store.template[req.params.type+'List'])?req.store.template[req.params.type+'List']:{};
                let typeCart = 'cart';
                let cartJade;
                if(cartJade = pugCache['list'+typeCart+((element.templ)?element.templ:'')]){
                    let cartJadeArr=cartJade.split("\n").map(function(s){return '                                '+s})
                    if(type=='listmobile'){
                        a.splice.apply(a,[13,1].concat(cartJadeArr))
                    }else if(type=='list'){
                        a.splice.apply(a,[24,1].concat(cartJadeArr))
                        a.splice.apply(a,[19,1].concat(cartJadeArr))
                        a.splice.apply(a,[14,1].concat(cartJadeArr))
                    }else if(type=='listtablet'){
                        a.splice.apply(a,[19,1].concat(cartJadeArr))
                        a.splice.apply(a,[14,1].concat(cartJadeArr))
                    }

                    jadeItem= a.join("\n")

                }
                element.type=type;
                element.wrapclass=key;
                element.i=1;



                if(!page){
                    setMobileOrTabletStyle(req,element)
                    getCSSForBlock(homePath,element,'list',cssData)
                }
                if(items.length){
                    jadeData.dj[key].lastItemId= items[items.length-1]._id
                }else{
                    jadeData.dj[key].lastItemId='null'
                }


                moment.locale(req.store.lang)
                //console.log(items)
                items.forEach(function (e,i) {
                    items[i].i=i;
                    e.wrapclass=key;
                    if(jadeData.dj[key].chess && i%2==0){
                        items[i].pullLeft=' pull-left';
                        items[i].pullRight=' pull-right';
                    }
                    if(req.params.type!='lookbook'){
                        e.link=req.params.type+'/'+e.url;
                    }
                    if(e.img){ e.img=(photoHost)?photoHost + '/' +e.img:e.img}
                    if(e.imgs){e.imgs.forEach(sl=>{sl.img=(photoHost)?photoHost + '/' +sl.img:sl.img})}
                    if(e.desc){
                        e.desc= e.desc.clearTag().substring(0,150)
                        e.desc= e.desc.substr(0, Math.min(e.desc.length, e.desc.lastIndexOf(" ")))+' ...'
                        //s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                    }
                    /*if(e.desc){
                        console.log('e.desc.length',e.desc.length)
                    }*/

                    if(e.date){e.date=moment(e.date).format('LL')}
                })
                jadeData.dj[key].templ=element.templ;// defile number of template
                //jadeData.dj[key].href=(req.params.type=='lookbook')?'':req.params.type+'/'
                jadeData.dj[key].itemsType=type;

                jadeData.dj[key].hideNameList=(req.store.template[req.params.type+'List'] && req.store.template[req.params.type+'List'].hideNameList)?req.store.template[req.params.type+'List'].hideNameList:null;
                jadeData.dj[key].listName=(req.store.nameLists && req.store.nameLists[req.params.type+'List'])?req.store.nameLists[req.params.type+'List']:null;
                req.store.template[req.params.type+'List']

                jadeData.dj[key].wrapclass=key;
                jadeData.dj[key].items=items;
                jadeData.dj[key].itemsArr2=items.divideArrayWithChunk(2);
                jadeData.dj[key].itemsArr3=items.divideArrayWithChunk(3);


                /*fs.mkdirParentPromise('public/views/'+req.store.subDomain).then(function () {
                    fs.writeFile( 'public/views/'+req.store.subDomain+'/list_'+req.store.subDomain+'.pug', jadeItem, function (err, data) {
                        if (err) console.log(err);
                    } );
                    fs.writeFile( 'public/views/'+req.store.subDomain+'/list_'+req.store.subDomain+'.data', JSON.stringify(jadeData,null,'\t'), function (err, data) {
                        if (err) console.log(err);
                    } );
                })*/
                let titles={}
                let o={
                    jadeItem:jadeItem,
                    jadeData:jadeData,
                    cssData:cssData,
                    titles:titles,
                }
                resolve(o)
            })
            .catch(function (err) {
                if(err!=404){reject(err)}
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
} //news stat campaign masters info