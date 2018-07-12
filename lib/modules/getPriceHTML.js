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
let StuffClass=require('../../public/scripts/stuffClass.js')
const pugCache=require('../pugCache');
const isWin = /^win/.test(process.platform);
const zlib = require('zlib');
let data404=require('../data404');



module.exports = function getPriceHTML(req,type) {
    let mainCurrency = req.store.mainCurrency;
    if(req.query.currency && req.store.mainCurrency!=req.query.currency){
        req.store.mainCurrency=req.query.currency
    }
    let jadeData={dj:{}},cssData={css:''};
    var stuffHost = req.stuffHost;

    let sections;
    return new Promise(function (resolve,reject) {
        let page=0;
        let rows=500;
        let query = ''
        if(type=='pricegoods'){
            query = JSON.stringify({actived:true,service:false})
        }else{
            query = JSON.stringify({actived:true,service:true})
        }
        Promise.resolve()
            .then(function () {
                return getItemsForPage(req.store._id,stuffHost,{model:'Group',lang:req.store.lang})
            })
            .then(function (sec) {
                //console.log(sec)
                if(sec.length){sec.shift()}
                sections = sec;
            })
            .then(function(){
                let data={model:'Stuff',query:'',lang:req.store.lang}
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

                data.query+='&query='+query

                return getItemsForPage(req.store._id,stuffHost,data)
            })
            .then(async function(items){
                if(!items) {
                    throw '404'
                }

                let total=0;
                if(!page && items.length){
                    total = items.shift().index
                }
                let arrTags=[];



                let element=(req.store.template[type])?req.store.template[type]:{};


                let masters;
                let mastersInStuff={}
                console.log('element.showMosters',element.showMosters)
                if(element.showMosters){
                    let query = JSON.stringify({actived:true})
                    let data={model:'Master',query:'perPage=100&query='+query,lang:req.store.lang}
                    masters = await getItemsForPage(req.store._id,stuffHost,data);
                    //console.log(masters)
                    if(masters && masters.length){
                        masters.shift()
                        masters.forEach(function(m){
                            if(m.stuffs && m.stuffs.length){
                                m.stuffs.forEach(function(s){
                                    if(!mastersInStuff[s]){
                                        mastersInStuff[s]=[]
                                    }
                                    let o={
                                        name:m.name,
                                        url:m.url
                                    }
                                    mastersInStuff[s].push(o)
                                })
                            }
                        })
                    }

                }
                //console.log(mastersInStuff)

                let categories={}

                let formatPrice=(req.store.formatPrice)?-Number(req.store.formatPrice):0;

                try{

                    items.forEach(function (doc) {
                        if(!categories[doc.category[0]]){
                            categories[doc.category[0]]={stuffs:[]}
                        }
                        //console.log("doc._id.toString()",doc._id.toString(),mastersInStuff[doc._id.toString()])
                        if(mastersInStuff[doc._id.toString()]){
                            doc.masters=mastersInStuff[doc._id.toString()]
                        }
                        //console.log(doc.masters)
                        if(!doc.currency){
                            doc.currency=mainCurrency;
                        }
                        if(doc.sortsOfStuff && doc.sortsOfStuff.differentPrice){
                            for(let tag in doc.stock){
                                if(arrTags.indexOf(tag)<0 && tag!='undefined' && typeof tag !='object' && tag!='[object Object]'){
                                    arrTags.push(tag)
                                }
                            }
                        }

                        StuffClass.setPrice(doc,req.store,mainCurrency,formatPrice)
                        let rate;
                        if(mainCurrency!=req.store.mainCurrency){
                            rate=req.store.currency[req.store.mainCurrency][0];
                            StuffClass.setRate(doc,rate,formatPrice)
                        }

                        doc.price=Math.ceil10(doc.price,formatPrice)
                        /*if(doc.name=='стрижка женская'){
                            console.log(doc.name,doc.price)
                        }*/

                        categories[doc.category[0]].stuffs.push(doc)
                    })
                }catch(err){
                    throw err
                }

                sections.forEach(s=>{
                    s.categories.forEach(c=>{
                        if(categories[c._id]){
                            categories[c._id].name=c.name
                            c.var=c.url.split('-').join('_');
                            c.stuffs=categories[c._id].stuffs
                            c.stuffs.forEach((s,i)=>{
                                if(!(i%2)){s.class='even'}
                            })
                        }
                    })
                    s.child.forEach(ch=>{
                        ch.categories.forEach(c=>{
                            if(categories[c._id]){
                                categories[c._id].name=c.name
                                c.var=c.url.split('-').join('_');
                                c.stuffs=categories[c._id].stuffs
                                c.stuffs.forEach((s,i)=>{
                                    if(!(i%2)){s.class='even'}
                                })
                            }
                        })
                    })
                })



                //console.log(sections)
                let filterTags;

                if(arrTags.length){
                    let data={model:'FilterTags',query:'perPage='+rows,lang:req.store.lang}
                    data.query +='&query='+JSON.stringify({_id:{$in:arrTags}})
                    filterTags = await getItemsForPage(req.store._id,stuffHost,data)
                    if(filterTags && filterTags.length){
                        filterTags.shift()
                    }
                }

                var homePath = path.join( __dirname, '../../public/views/template/partials/price' );


                let typeList = 'price';
                element.type=typeList;
                element.i=type;
                let s='';
                if(element.templ){s=element.templ}
                let key ="wrap-price-price"+s+element.i;
                element.wrapclass=key;

                let jadeItem = getPartWithKey(element,'price',homePath+'/')

                jadeData.dj[key]={}

                setMobileOrTabletStyle(req,element)
                getCSSForBlock(homePath,element,'price',cssData)


                jadeData.dj[key].listName=(req.store.nameLists && req.store.nameLists[type])?req.store.nameLists[type]:'price';
                jadeData.dj[key].wrapclass=key;
                jadeData.dj[key].items=items;
                jadeData.dj[key].categories=categories;
                jadeData.dj[key].sections=sections;

                if(filterTags && filterTags.reduce){
                    jadeData.dj[key].filterTags=filterTags.reduce(function (o,item) {
                        if(!o[item._id]){
                            o[item._id]=item.name
                        }
                        return o;
                    },{})
                }else{
                    jadeData.dj[key].filterTags={}
                }
                jadeData.dj[key].currency=req.store.currency[req.store.mainCurrency][2];
                jadeData.dj[key].formatPrice=formatPrice*-1;

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





