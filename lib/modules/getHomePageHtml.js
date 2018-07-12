'use strict';
const path=require('path');
const fs=require('fs');
const getPartWithKey = require('../modules/getPartWithKey');
const getCSSForBlock = require('../modules/getCSSForBlock');
const hangleBlocksForPugCompile = require('../modules/hangleBlocksForPugCompile');
var pugCache=require('../pugCache');
var isWin = /^win/.test(process.platform);

module.exports = function getHomePageHtml(hp,req,jadeData,cssData) {
    let photoHost=req.photoHost;
    let stuffHost=req.stuffHost;
    return new Promise(async function(resolve,reject){
        var dH=Date.now()
        let homePath = path.join( __dirname, '../../public/views/template/partials/home/' );
        if(!hp.rows){
            hp.rows={left:{},right:{},top:{}}
        }
        let addVar=req.addVar;
        try{
            let jadeHome="home-page-two-rows-container(image-load-watcher-home-page)"
            let parts={top:[],left:[],right:[]}
            let tab = '      ';
            for(let k in parts){
                if(hp[k]){
                    hp[k]=
                        hp[k].filter(function (el) {
                            return el && el.type && el.is
                        }).sort(function (a,b) {
                            return a.index-b.index
                        })

                    if(hp[k].length){
                        //console.log(hp.rows[k])
                        let key ="wrap-home-"+k;
                        //parts[k].push("  - var key = '"+key+"'")
                        parts[k].push("  div(class=dj['"+key+"'].wrapclass)")
                        parts[k].push("    div(class=mobileWrapper)")
                        hp.rows[k].type=k;
                        hp.rows[k].i=1;
                        hp.rows[k]['wrapclass']=key;
                        getCSSForBlock(homePath,hp.rows[k],'home',cssData,addVar)
                        jadeData.dj[key]={wrapclass:key}
                        /*if(k=='left' && !(req.mobile && hp['right'].length)){
                            hp[k].push({type:'seoDesc',is:true})
                        } else if(req.mobile && k=='right'){
                            hp[k].push({type:'seoDesc',is:true})
                        }*/
                        if(k=='left' && hp.right.length){
                            jadeData.dj[key]['wrapclass']+=" left-col col-lg-8 col-md-8 col-sm-12 col-xs-12"
                        } else if(k=='right'){
                            jadeData.dj[key]['wrapclass']+=" right-col col-lg-4 col-md-4 col-sm-12 col-xs-12"
                        }

                    }

                    let str= await hangleBlocksForPugCompile(hp[k],req,jadeData,cssData,hp)


                    parts[k].splice.apply(parts[k],[3,0].concat(str.split('\n').filter(function(e){return e;}).map(function (l) {return tab+l})))
                    if(jadeHome){jadeHome+="\n"}
                    jadeHome+=parts[k].join("\n")
                }
            }
            //console.log(jadeHome)
            return resolve(jadeHome)
        }catch(err){
            console.log('home page  from getHomePageHtml- ',err)
            resolve('')
        }

    })
}