'use strict';
const path=require('path');
const getPartWithKey = require('../modules/getPartWithKey');
const getCSSForBlock = require('../modules/getCSSForBlock');
const moment = require('moment');
const string= 'abcdefghijklmnopqrstuvwxyzQAZWSXEDCRFVTGBYHNUJMIKOLP1234567890';
function shuffle(len) {
    var parts = string.split('');
    for (var i = parts.length; i > 0;) {
        var random = parseInt(Math.random() * i);
        var temp = parts[--i];
        parts[i] = parts[random];
        parts[random] = temp;
    }
    return parts.join('').substring(0,len);
}
module.exports = function hangleBlocksForPugCompile(blocks,req,jadeData,cssData,item){
    let homePath = path.join( __dirname, '../../public/views/template/partials/home/' );
    let photoHost=req.photoHost;
    let stuffHost=req.stuffHost;
    let addVar=req.addVar;
    let str='';
    let idx=0;
    blocks.forEach(function(d,index){

        if(blocks[index-1] && blocks[index-1].img){
            addVar.$imgPrevBlock='"'+blocks[index-1].img+'"';'"'+req.photoHost+'/'+blocks[index-1].img+'"';
        }else{
            addVar.$imgPrevBlock='"'+req.store.backgroundImg+'"';'"'+req.photoHost+'/'+req.store.backgroundImg+'"';
        }

        if(blocks[index].img){
            blocks[index].alt=blocks[index].name||blocks[index].type
        }
        if(blocks[index].imgs && blocks[index].imgs.lrngth){
            blocks[index].imgs.forEach(function(img){
                img.alt=img.name||blocks[index].type
            })
        }
        if(blocks[index][blocks[index].type] && blocks[index][blocks[index].type].forEach){
            blocks[index][blocks[index].type].forEach(function(img){
                if(img && typeof img=='object'){
                    img.alt=img.name
                }
            })
        }
        // для банннера
        if(d.link){
            if(d.link == 'subscription' || d.link == 'subscriptionAdd' || d.link == 'feedback' || d.link == 'dateTime' || d.link == 'allBonus' || d.link == 'call'){
                d.ngClick="global.get('functions').val.action('"+d.link+"')"
            } else {
                d.href = d.link;
            }
            d.element='a'
        }else{
            d.element='div'
        }

        if(d.button && d.button.link){
            if(d.button.link == 'subscription' || d.button.link == 'subscriptionAdd' || d.button.link == 'feedback' || d.button.link == 'dateTime' || d.button.link == 'allBonus' || d.button.link == 'call'){
                d.button.ngClick="global.get('functions').val.action('"+d.button.link+"')"
            }else{
                d.button.href = d.button.link;
            }
        }
        if(d.button1 && d.button1.link){
            if(d.button1.link == 'subscription' || d.button1.link == 'subscriptionAdd' || d.button1.link == 'feedback' || d.button1.link == 'dateTime' || d.button1.link == 'allBonus' || d.button1.link == 'call'){
                d.button1.ngClick="global.get('functions').val.action('"+d.button1.link+"')"
            }else{
                d.button1.href = d.button1.link;
            }
        }

        /*********************/
        if(d.type && d.is){
            idx++;
            if(req.mobile){
                d.animate=null;
            }
            switch (d.type[d.type.length-1]){
                case '1':{d.type=d.type.substring(0,d.type.length-1)+'One';break;}
                case '2':{d.type=d.type.substring(0,d.type.length-1)+'Two';break;}
                case '3':{d.type=d.type.substring(0,d.type.length-1)+'Three';break;}
            }
            if(d._id){

                d.i=d._id
            }else if(item && item._id){
                d.i=item._id
            }else{
                d.i=shuffle(4)
            }
            if(item && item._id){
                d.i=item._id
            }else{
                d.i=shuffle(4)
            }

            d.i+=index
            let templ;
            if(d.type=='info' && d.templ){
                templ=d.templ
            }

            if(item && !item.img && (d.type=='banner'||d.type=='bannerOne') && d.useImg){
                if(d.img){
                    item.img=d.img;
                }

            }
            if(item && !item.desc && (d.type=='banner'||d.type=='bannerOne' || d.type=='text' || d.type=='text2') && d.useDesc){
                if(d.desc){
                    item.desc=(d.desc.clearTag)?d.desc.clearTag():d.desc.clearTag;
                }
            }
            //console.log(d.type)
            if(d.type=='name' && item){
                //console.log(item.name,item.nameL)
                d.nameL=item.nameL
                d.name=item.name;
            }
            if(d.type=='position' && item){
                d.position=item.position;
            }
            if(d.type=='date' && item){
                moment.locale(req.store.lang)
                d.date=moment(item.date).format('LL');
            }
            if(item && !item.img &&(d.type=='slider' ||d.type=='stuffs' || d.type=="campaign" || d.type=="filterTags"||
                d.type=="brandTags"|| d.type=="brands"|| d.type=="categories") && d[d.type]&& d[d.type][0]&& d[d.type][0].img){
                item.img=d[d.type][0].img;
            }


            str += getPartWithKey(d,'home',homePath);

            jadeData.dj[d.wrapclass]=d;
            if(d.type=='schedule' && item){
                jadeData.dj[d.wrapclass]._id=item._id
            }

            if(req.mobile && d.mobile){
                if(d.mobile.elements && typeof d.mobile.elements == 'object' && Object.keys(d.mobile.elements)){
                    d.elements=d.mobile.elements;
                }
                if(d.mobile.blockStyle && d.mobile.blockStyle.length && d.mobile.blockStyle.some(s=>s)){
                    d.blockStyle=d.mobile.blockStyle;
                }
            }else if(req.tablet && d.tablet){
                if(d.tablet.elements && typeof d.tablet.elements == 'object' && Object.keys(d.tablet.elements)){
                    d.elements=d.tablet.elements;
                }
                if(d.tablet.blockStyle && d.tablet.blockStyle.length && d.tablet.blockStyle.some(s=>s)){
                    d.blockStyle=d.tablet.blockStyle;
                }
            }

            if(d.type=='scheduleplace' && item && d.stuffs && d.stuffs[0] && d.stuffs[0]._id){
                d.scheduleStuff=d.stuffs[0]._id;
            }

            jadeData.dj[d.wrapclass]=d;
            getCSSForBlock(homePath,d,'home',cssData,addVar)
            d.additionalClass=(d.animate)?' pre-animate-opacity':'';

            if(d.img) {
                jadeData.dj[d.wrapclass].backgroundStyle = "background-image:url(" + photoHost + '/' + d.img + ");"
                d.img=photoHost+'/'+d.img
            }
            if(idx==1 &&(d.type=='slider' || d.type=='banner' || d.type=='bannerOne')){
                d.id='arrowDownDiv'
                d.arrowDownDiv='arrowDownDiv'
            }else{
                d.id=d._id;
            }
            //if(d.desc){d.desc.trim()}
            if(d.type=='slider'){
                jadeData.dj[d.wrapclass].delta=3;
                jadeData.dj[d.wrapclass].className  ="col-lg-4 col-md-4 col-sm-4 col-xs-4 home-section"
                if(req.tablet){
                    jadeData.dj[d.wrapclass].delta=2;
                    jadeData.dj[d.wrapclass].className  ="col-lg-6 col-md-6 col-sm-6 col-xs-6 home-section"
                }else if(req.mobile){
                    jadeData.dj[d.wrapclass].className  ="col-lg-12 col-md-12 col-sm-12 col-xs-12 home-section"
                    jadeData.dj[d.wrapclass].delta=1;
                }
                if(d.imgs && d.imgs.length){
                    d.imgs=d.imgs.filter(function(i){
                        return i.actived
                    })
                    d.imgs.forEach(function (slide) {
                        if(slide.link && (slide.link.indexOf('://')>-1||slide.link.indexOf('www')>-1)){slide.target='_blank'}
                        if(slide.button && slide.button.is){
                            if(slide.button.link=='dateTime'){
                                slide.button.link=null;
                                slide.button.ngClick="$ctrl.global.get('functions').val.witget('dateTime')"
                            }else if(slide.button.link=='feedback'){
                                slide.button.link=null;
                                slide.button.ngClick="$ctrl.global.get('functions').val.witget('feedback')"
                            }else if(slide.button.link=='orderStuffFromHP'){
                                slide.button.link=null;
                                slide.button.ngClick="global.get('functions').val.orderStuffFromHP('"+slide.button.stuffUrl+"')"
                            }else if(slide.button.link=='subscription'){
                                slide.button.link=null;
                                slide.button.ngClick="$ctrl.global.get('functions').val.witget('subscription')"
                            }else if(slide.button.link=='call'){
                                slide.button.link=null;
                                slide.button.ngClick="$ctrl.global.get('functions').val.witget('call')"
                            }else if(slide.button.link=='subscriptionAdd'){
                                slide.button.link=null;
                                slide.button.ngClick="$ctrl.global.get('functions').val.witget('subscriptionAdd')"
                            }else if(slide.button.link=='allBonus'){
                                slide.button.link=null;
                                slide.button.ngClick="$ctrl.global.get('functions').val.witget('allBonus')"
                            }
                        }
                    })
                }
            }/*else if(d.type=='info' && templ){
                jadeData.dj[d.wrapclass].templ=templ
            }*/


        }
    })
    return str+"\n";
}