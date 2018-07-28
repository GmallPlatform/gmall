'use strict';
const path=require('path');
const fs=require('fs');
const getPartWithKey = require('../modules/getPartWithKey');
const getCSSForBlock = require('../modules/getCSSForBlock');
const pugCache=require('../pugCache');
const isWin = /^win/.test(process.platform);
module.exports = function getHeader(menuData,type,data,slide,storeId,cache_key,mobile,tablet,lang,addVar,jadeData,cssData){
    //console.log(data.labels)

    return new Promise(function(resolve,reject){
        if(menuData.fixed){
            menuData.fixed = 'fixed';
        }
        if(slide){
            menuData.slide=slide;
        }
        var p ='public/views/template/header/'+type+'/';
        if(type=='menu1'){
            if(!menuData.is){
                resolve('') ;
            }
        }else if(type=='menu2'){
            var menu1Data=slide;
            if(!menu1Data.is || !menuData.is){
                resolve('') ;
            }
            if(menu1Data.position=='top'){
                if(menu1Data.fixed){
                    if(menuData.position=='top'){
                        menuData.fixed=true;
                        menuData.padding=true;
                    }else if(menuData.position=='bottom'){
                        return null;
                    }else if(menuData.position=='right'){
                        menuData.fixed=null;
                        menuData.padding=null
                    }else if(menuData.position=='left'){
                        menuData.fixed=null;
                        menuData.padding=null
                    }
                }else{
                    if(menuData.position=='top'){
                        menuData.fixed=false;
                        menuData.padding=null
                    }else if(menuData.position=='bottom'){
                        return null;
                    }else if(menuData.position=='right'){
                        menuData.fixed=null;
                        menuData.padding=null
                    }else if(menuData.position=='left'){
                        menuData.fixed=null;
                        menuData.padding=null
                    }
                }
            }else if(menu1Data.position=='bottom'){
                if(menu1Data.fixed){
                    if(menuData.position=='top'){
                        menuData.fixed=true;
                        menuData.padding=false;
                    }else if(menuData.position=='bottom'){
                        menuData.fixed=true;
                        menuData.padding=true;
                    }else if(menuData.position=='right'){
                        menuData.fixed=null;
                        menuData.padding=null
                    }else if(menuData.position=='left'){
                        menuData.fixed=null;
                        menuData.padding=null
                    }
                }else{
                    if(menuData.position=='top'){
                        return null;
                    }else if(menuData.position=='bottom'){
                        return null;
                    }else if(menuData.position=='right'){
                        menuData.fixed=null;
                        menuData.padding=null
                    }else if(menuData.position=='left'){
                        menuData.fixed=null;
                        menuData.padding=null
                    }
                }
            }else if(menu1Data.position=='left' || menu1Data.position=='right'){
                //resolve('') ;
            }
        }
        var pp=path.join( __dirname, '../../public/views/template/header/' )
        let parts={right:'',left:'',center:'',top:''}
        if(!data.humburger){
            data.humburger={is:true}
        }
        let hum = menuData.parts.getOFA('name','humburger');
        if(hum){
            hum.text=data.store.humburger;
            if(!data.humburger.icon && !hum.text){
                hum.iconStandart=true
            }else if (data.humburger.icon){
                hum.icon=data.humburger.icon
            }
        }
        if(type=='menu1'){
            if(!hum){
                if(slide=='left'){
                    data.humburger.name='humburger'
                    data.humburger.position='left'
                    data.humburger.text=data.store.humburger;
                    if(!data.humburger.icon && !data.humburger.text){
                        data.humburger.iconStandart=true
                    }
                    menuData.parts.unshift(data.humburger)
                }else if(slide=='right'){
                    data.humburger.name='humburger'
                    data.humburger.position='right'
                    data.humburger.text=data.store.humburger;
                    if(!data.humburger.icon && !data.humburger.text){
                        data.humburger.iconStandart=true
                    }
                    menuData.parts.unshift(data.humburger)
                }
            }
        }else{
            if(menu1Data && menu1Data.hideMenuIfNotHome){
                menuData.hideMenuIfNotHome=true;
            }
        }

        let key ='wrap-header-'+type;
        menuData.type=type;
        menuData.i=1;
        menuData.wrapclass=key;
        getCSSForBlock(pp,menuData,'header',cssData)
        let animationDelay=0
        menuData.parts.forEach(function(d,i){
            if(!d.is || d.is=='false'){return}

            d.animationDelay=animationDelay;
            if(d.name=='catalog'){
                animationDelay+=data.sections.reduce(function (i,s) {
                    if(!s.hideSection){i++}
                    return i;
                },0)
            }else if(d.name=='info'){
                animationDelay+=data.stats.reduce(function (i,p) {
                    if(p.actived){i++}
                    return i;
                },0)
            }else{
                animationDelay++
            }

            if(d.name=='phone'){
                d.phone=(menuData.phone)?menuData.phone:'00000000';
                d.phone=d.phone.split(',')
            }
            if(d.name=='text' && menuData.desc){
                d.desc=menuData.desc
            }
            d.positionMenu=menuData.position;
            d.cache_key=cache_key;
            d.type=d.name;
            if(menuData.animate){
                d.blockAnimate=menuData.animate
            }
            if(d.type=='logo'){
                d.alt='logo'
            }
            d.addLink=''
            if(d.type=='master' && data.store.template.masterList && data.store.template.masterList.listLabel && data.labels && data.labels.length){
                let l = data.labels.find(l=>l.list=='master')
                //console.log(l)
                if(l){
                    d.addLink='?labels='+l.name
                }
            }
            if(d.type=='news' && data.store.template.newsList && data.store.template.newsList.listLabel && data.labels && data.labels.length){
                let l = data.labels.find(l=>l.list=='news')
                //console.log(l)
                if(l){
                    d.addLink='?labels='+l.name
                }
            }
            d.BGColorOnHover=menuData.BGColorOnHover;
            d.i=i;
            let preffix="- var pullClass=''\r\n"
            try{

                d.i=d.cache_key;
                parts[d.position]+=getPartWithKey(d,'header',pp,preffix)
                if(d.name=='humburger'){
                }
                jadeData.dj[d.wrapclass]=d;
                getCSSForBlock(pp,d,'header',cssData,addVar)
            }catch(err){
                console.log('menuData.parts.forEach',err)
            }


        })
        let html=''
        try{
            /*let key ='wrap-header-'+type;
             menuData.type=type;
             menuData.i=1;
             menuData.wrapclass=key;*/

            jadeData.dj[key]=menuData;

            if(type=='menu2'){
                jadeData.dj[key].navClass=(menuData.fixed) ? 'navbar navbar-fixed-top' : 'navbar';
                if(menu1Data.background){
                    jadeData.dj[key].navClass+=' menuColor'
                }
            }else if(type=='menu1'){
                if(menuData.position=='left'){

                }else{
                    jadeData.dj[key].wrapClass="wrap-for-horizontel-menu navbar-toggle-slide"
                }
                jadeData.dj[key].navClass='navbar navbar-'+((menuData.fixed)?'fixed-':'')+menuData.position;
                if(menuData.background){
                    jadeData.dj[key].navClass+=' menuColor'
                }
            }


            let f="- var key='"+key+"'"+"\r\n";
            let keyCache='header'+type;
            if(pugCache[keyCache] && !isWin){
                f+=pugCache[keyCache];
            }else{
                f+=fs.readFileSync(pp+type+'/'+type+'.jade', "utf8")
            }
            let fa = f.split("\n")
            let tab='            ';//12 blanks
            let r = parts.right.split("\n").map(function (l) {return tab+l})
            let c = parts.center.split("\n").map(function (l) {
                let s='  '
                if((menuData.position=='left'||menuData.position=='right')&&menuData.type=='menu2'){
                    s='';
                }
                return tab+s+l
            })
            let l = parts.left.split("\n").map(function (l) {return tab+l})


            if(type=='menu1'){
                fa.splice.apply(fa,[14,1].concat(r))
                fa.splice.apply(fa,[12,1].concat(l))
                fa.splice.apply(fa,[10,1].concat(c))
            }else if(type=='menu2'){
                if(menuData.position=='left'||menuData.position=='right'){
                    fa.splice.apply(fa,[11,1].concat(r))
                    fa.splice.apply(fa,[10,1].concat(c))
                    fa.splice.apply(fa,[9,1].concat(l))
                }else{
                    fa.splice.apply(fa,[23,1].concat(r))
                    fa.splice.apply(fa,[21,1].concat(l))
                    fa.splice.apply(fa,[19,1].concat(c))
                }
            }

            let jadeMenu = fa.join("\n")
            //getCSSForBlock(pp,menuData,'header',cssData)
            return resolve(jadeMenu)
        }catch(err){
            console.log('get header ',type,' ',err)
        }
    })
}