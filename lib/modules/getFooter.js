'use strict';
const path=require('path');
const fs=require('fs');
const getPartWithKey = require('../modules/getPartWithKey');
const getCSSForBlock = require('../modules/getCSSForBlock');
const pugCache=require('../pugCache');
const setMobileOrTabletStyle=require('../setMobileOrTabletStyle');
const isWin = /^win/.test(process.platform);
module.exports = function getFooter(req,template,cache_key,lang,section,stat,photoHost,arrVar,jadeData,cssData){
    //onsole.log(jadeData.store.lang)
    return new Promise(function(resolve,reject){
        var pp=path.join( __dirname, '../../public/views/template/footer/' )
        let parts={right:'',left:'',center:'',top:''}
        try{

            let key ='wrap-footer-footer1';
            let foot  =template.footer;
            foot.type='footer';
            foot.wrapclass=key;
            foot.i=1;
            setMobileOrTabletStyle(req,foot)
            getCSSForBlock(pp,foot,'footer',cssData)
            if(template.footer.parts && template.footer.parts.length){
                template.footer.parts.forEach(function(d,i){
                    if(d.is){
                        if(!d.type){d.type=d.name}
                        if(d.type=='infoline'){
                            if(template.footer.communication && template.footer.communication.use){
                                d.use=template.footer.communication.use
                            }
                            if(d.blocks && d.blocks.length){
                                d.blocks.forEach(function(b){
                                    if(b && b.nameL && typeof b.nameL=='object' && b.nameL[jadeData.store.lang]){
                                        b.name=b.nameL[jadeData.store.lang]
                                    }
                                })
                            }
                        }
                        if(d.type=='catalog'){
                            let gr={},cats={};
                            let groups=[];
                            let categories = [];
                            if(template.footer.catalog){
                                section.forEach(function(s){
                                    gr[s._id]=s;
                                    s.categories.forEach(function (c) {
                                        cats[c._id]=c
                                    })
                                    s.child.forEach(function (ch) {
                                        if(ch.catgories){
                                            ch.catgories.forEach(function (c) {
                                                cats[c._id]=c
                                            })
                                        }
                                    })
                                })
                                if(template.footer.catalog.groups && template.footer.catalog.groups.length){
                                    template.footer.catalog.groups.forEach(function (g) {
                                        if(gr[g]){
                                            groups.push({name:gr[g].name,url:gr[g].url})
                                        }
                                    })
                                }
                                if(template.footer.catalog.categories && template.footer.catalog.categories.length){
                                    template.footer.catalog.categories.forEach(function (c) {
                                        if(cats[c]){
                                            categories.push({name:cats[c].name,url:cats[c].url,groupUrl:cats[c].linkData.groupUrl})
                                        }
                                    })
                                }
                            }
                            d.groups=groups;
                            d.categories=categories;
                        }
                        d.i=i;
                        parts[d.position]+=getPartWithKey(d,'footer',pp)
                        jadeData.dj[d.wrapclass]=d;
                        setMobileOrTabletStyle(req,d)
                        getCSSForBlock(pp,d,'footer',cssData)
                    }
                })
            }


            jadeData.dj[key]=foot;
            let f="- var key='"+key+"'; var kyeForClass='"+key+"'"+"\r\n";
            if(!foot.ratio){
                jadeData.dj[key].leftClass=  "col-lg-4 col-md-4 col-sm-6 col-xs-12 footer-left";
                jadeData.dj[key].centerClass="col-lg-4 col-md-4 col-sm-6 col-xs-12 footer-center"
                jadeData.dj[key].rightClass= "col-lg-4 col-md-4 col-sm-6 col-xs-12 footer-right"
            }else if(foot.ratio==1){
                jadeData.dj[key].leftClass=  "col-lg-6 col-md-6 col-sm-6 col-xs-12 footer-left";
                jadeData.dj[key].centerClass="col-lg-6 col-md-6 col-sm-6 col-xs-12 footer-center"
                jadeData.dj[key].rightClass= null
            }else if(foot.ratio==2){
                jadeData.dj[key].leftClass=  "col-lg-4 col-md-4 col-sm-4 col-xs-12 footer-left";
                jadeData.dj[key].centerClass="col-lg-8 col-md-8 col-sm-8 col-xs-12 footer-center"
                jadeData.dj[key].rightClass= null
            }else if(foot.ratio==3){
                jadeData.dj[key].leftClass=  "col-lg-8 col-md-8 col-sm-8 col-xs-12 footer-left";
                jadeData.dj[key].centerClass="col-lg-4 col-md-4 col-sm-4 col-xs-12 footer-center"
                jadeData.dj[key].rightClass= null
            }else if(foot.ratio==4){
                jadeData.dj[key].leftClass=  "col-lg-12 col-md-12 col-sm-12 col-xs-12 footer-left";
                jadeData.dj[key].centerClass=null
                jadeData.dj[key].rightClass= null
            }else{
                jadeData.dj[key].leftClass=  "col-lg-4 col-md-4 col-sm-6 col-xs-12 footer-left";
                jadeData.dj[key].centerClass="col-lg-4 col-md-4 col-sm-6 col-xs-12 footer-center"
                jadeData.dj[key].rightClass= "col-lg-4 col-md-4 col-sm-6 col-xs-12 footer-right"
            }



            let keyCache='footerfooter'
            if(pugCache[keyCache] && !isWin){
                f+=pugCache[keyCache];
            }else{
                f+=fs.readFileSync(pp+'footer/footer.jade', "utf8")
            }
            let fa = f.split("\n")
            let tab1='        ';
            let tab= '            ';
            let r = parts.right.split("\n").map(function (l) {return tab+l})
            let c = parts.center.split("\n").map(function (l) {return tab+l})
            let l = parts.left.split("\n").map(function (l) {return tab+l})
            let t = parts.top.split("\n").map(function (l) {return tab1+l})
            fa.splice.apply(fa,[15,1].concat(r))
            fa.splice.apply(fa,[12,1].concat(c))
            fa.splice.apply(fa,[9,1].concat(l))
            fa.splice.apply(fa,[5,1].concat(t))
            let jadeFooter = fa.join("\n")
            return resolve(jadeFooter)
            /*let html=pug.render(jadeFooter,jadeData);
             resolve(html)*/
        }catch(e){
            console.log('getFooter ',e)
            resolve('')
        }
    })


}