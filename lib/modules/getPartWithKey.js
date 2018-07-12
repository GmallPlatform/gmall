'use strict';
const fs=require('fs');
const pugCache=require('../pugCache');
const isWin = /^win/.test(process.platform);
const  re = /dj\[key]/gi;
module.exports = function getPartWithKey(d,type,pp,preffix){
    //console.log(d.type,type,pp)
    try{
        let s='',sCSS='';
        //if(d.name=='currency'){console.log((d.style && d.style!='0'),d.style)}
        if(d.templ && d.templ!='0'){s=d.templ}
        if(d.style && d.style!='0'){sCSS=d.style}
        let key = "wrap-"+type+"-"+d.type+s+d.i;
        d['wrapclass']=key;
        let str='',str1;
        if(preffix){str+=preffix+'\n'}
        let keyCache =type+d.type+s;
        if(pugCache[keyCache]  && !isWin){
            str1 =pugCache[keyCache];
        }else{
            str1 =fs.readFileSync(pp+d.type+'/'+d.type+s+'.jade', "utf8");
        }
        //console.log('strl',str1)
        let replaceKey = "dj['"+key+"']";
        str+=str1.replace(re,replaceKey);
        return str+"\n"
    }catch (err){
        console.log('getPartWithKey -',err)
        return ''
    }
    //return a string
}
