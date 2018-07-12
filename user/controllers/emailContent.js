'use strict';
var moment = require('moment');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var config = require('../config/config');
//var Store = mongoose.model('Store')
function getHeader(bgImage,logo,name){
    var s=
        '<!DOCTYPE html><html><head><meta charset=utf-8/></head>'+
        '<body style="font-family: arial, helvetica, sans-serif;">'+
        '<div  style=" background: #fff; margin: 0 auto; color: #433745; padding: 40px; width: 800px;  background-image: url('+bgImage+');" >'+
        '<div  style="text-align: center">'+
        '<img style="width: 160px; margin-bottom: 10px;" src="'+logo+'">'+
        '</div>'+
        '</div>'+
        '<div style="clear: both"></div>'+
        '<div style="text-align: center">'+
        '<h3 style="text-align: center; color: #433745; font-size: 28px; margin: 0 0 30px 0; text-transform: uppercase;">'+name+'</h3>';

    return s;
}
function getFooter(){
    return '</body></html>';
}

function getEnterButton(store,token,link,frame){
    //console.log(frame,typeof frame,frame[0])
    //console.log(!frame || typeof frame !='string' || frame[0]!='/');
    if(!frame || typeof frame !='string' || frame[0]!='/'){frame='/home?token'}
    //console.log('frame-',frame)
    var s='<p>'+((store.texts&& store.texts.buttonAuth&& store.texts.buttonAuth[store.lang])?store.texts.buttonAuth[store.lang]:'')+'<br/>'+
        '<a href="'+link+frame+'='+token+'">'+((store.texts&& store.texts.auth&& store.texts.auth[store.lang])?store.texts.auth[store.lang]:'')+'</a></p>';
    //console.log(s)
    return s;
}
function getPasswordInfo(store,pswd){
    var s = '<p>'+((store.texts&& store.texts.pswd&&store.texts.pswd[store.lang])?store.texts.pswd[store.lang]:'')+' - <strong>'+pswd+'</strong></p>';
    return s;
}

/*
 |--------------------------------------------------------------------------
 | subscription
 |--------------------------------------------------------------------------
 */
exports.subscription= function(store,user,provider,token,repeat) {
    //store.domain='localhost:8090'

    var bgImage=(store.background)?'http://'+config.storeHost+'/'+store.background:null;
    var name = '';//(user.name )?store.texts.mail.nameuser.name:'';

    if(user.name){
        name=((store.texts && store.texts.mailName && store.texts.mailName[store.lang])?store.texts.mailName[store.lang]:'')+' '+user.name
    }
    if(user.profile && user.profile.fio){
        name=((store.texts && store.texts.mailName&& store.texts.mailName[store.lang])?store.texts.mailName[store.lang]:'')+' '+user.profile.fio
    }


    var logo =(store.logo)?'http://'+config.photoDownload+'/'+store.logo:null;
    //console.log(logo)

    var content =getHeader(bgImage,logo,name);
    if(!repeat){
        content += store.texts.mailText[store.lang];
        if(store.confirmEmail){
            content +='<p>'+((store.texts&& store.texts.confirmemail&& store.texts.confirmemail[store.lang])?store.texts.confirmemail[store.lang]:'')+'</p>';
            content +='<a href="'+store.link+'/api/confirmemail/'+store._id+'/'+user._id+'">'+store.link+'/api/confirmemail/'+store._id+'/'+user._id+'</a>';

        }
        //console.log(content)

    }else if(repeat=="confirmEmail"){
        if(store.confirmEmail){
            content +='<p>'+((store.texts&& store.texts.confirmemail&& store.texts.confirmemail[store.lang])?store.texts.confirmemail[store.lang]:'')+'</p>';
            content +='<a href="'+store.link+'/api/confirmemail/'+store._id+'/'+user._id+'">'+store.link+'/api/confirmemail/'+store._id+'/'+user._id+'</a>';

        }
    }else{
        content +='<p>'+((store.texts&& store.texts.mailTextRepeat&&store.texts.mailTextRepeat[store.lang])?store.texts.mailTextRepeat[store.lang]:'')+'</p>';;
    }

    if(!store.cabinetNot){
        //console.log(user)
        if (user.password){content += getPasswordInfo(store,user.password)}
        //console.log(getPasswordInfo(user.password))
        content += getEnterButton(store,token,store.link,user.frame);
    }

    content += getFooter();
    return content;
};

exports.repeatMailForConfirm=function(store,user){
    //store.domain='localhost:8090'

    var bgImage=(store.background)?'http://'+config.storeHost+'/'+store.background:null;
    var name = '';//(user.name )?store.texts.mail.nameuser.name:'';

    if(user.name){
        name=((store.texts && store.texts.mailName && store.texts.mailName[store.lang])?store.texts.mailName[store.lang]:'')+' '+user.name
    }
    if(user.profile && user.profile.fio){
        name=((store.texts && store.texts.mailName&& store.texts.mailName[store.lang])?store.texts.mailName[store.lang]:'')+' '+user.profile.fio
    }


    var logo =(store.logo)?'http://'+config.photoDownload+'/'+store.logo:null;
    //console.log(logo)

    var content =getHeader(bgImage,logo,name);
    content +='<p>'+((store.texts&& store.texts.confirmemail&& store.texts.confirmemail[store.lang])?store.texts.confirmemail[store.lang]:'')+'</p>';
    content +='<a href="'+store.link+'/api/confirmemail/'+store._id+'/'+user._id+'">'+store.link+'/api/confirmemail/'+store._id+'/'+user._id+'</a>';

    content += getFooter();
    return content;

}


