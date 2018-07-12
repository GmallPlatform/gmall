'use strict';
const fs=require('fs');
const path=require('path');
const pugCache=require('../pugCache');
const isWin = /^win/.test(process.platform);
const sass = require('node-sass');
const mixinArgsDefine = require('../modules/mixinArgsDefine');
const globalVar=require('../../public/scripts/globalVariable.js')
const getNameProperty=globalVar.getNamePropertyCSS;
const lengthStyleBlock=globalVar.lengthStyleBlock+1;//+1 = $hover-background-color

module.exports = function getCSSForBlock(homePath,block,type,cssData,addVar) {
    return new Promise(function(resolve,reject){
        if(!block.type){block.type=block.name}
        var s='',sCSS='',k=1;
        if(block.style && block.style!='0'){sCSS=block.style}
        var elements=''
        var mixinArgs='';

        if(block.blockStyle){
            let el='';
            for(let i=0;i<lengthStyleBlock;i++){
                let n;
                if(i>0){mixinArgs+=','}
                if(block.blockStyle[i]){
                    n = getNameProperty(i,block.blockStyle[i],k);
                    if(n){
                        mixinArgs+=n[1];
                        //el+=n[0]+':'+n[1]+';';
                        if(type=='header' && (block.type=='menu1' || block.type=='menu2') && !block.background && i===1){
                            //когда нет фонового цвета то из настроек фоновый цвет передается как цвет для ховера
                        }else{
                            el+=n[0]+':'+n[1]+';';
                        }
                        /*if((block.type!='menu1' && block.type!='menu2') &&  i!==1){
                         el+=n[0]+':'+n[1]+';';
                         }*/

                    }else{
                        mixinArgs+=null;
                    }
                }else{
                    if(i==lengthStyleBlock-1){
                        if(block.type=='menu1' && block.BGColorOnHover && block.blockStyle[1]){
                            mixinArgs+=block.blockStyle[1];
                        }else{
                            mixinArgs+=null
                        }

                    }else{
                        mixinArgs+=null;
                    }
                }
            }
            if(el){
                elements=el;
            }
        }

        let animationMixin=''
        if(block.animate){
            if(pugCache['index'+block.animate]){
                let css=pugCache['index'+block.animate]
                animationMixin += "@mixin block-animation"+"("+mixinArgsDefine+") {" +css+"}";
                animationMixin+="\n."+block['wrapclass']+" {@include block-animation"+"("+mixinArgs+");}"

            }

        }
        //*************************************************************
        var mixin='',mixinElements='';
        if(addVar && typeof addVar=="object"){
            for(let k in addVar){
                mixin+=k+':'+addVar[k]+";\n";
            }

        }
        //*************************************************************
        if(block.elements && typeof block.elements=='object'){
            for(var key in block.elements){
                let elementMixinArgs='';
                let el='';
                for(let i=0;i<lengthStyleBlock;i++){
                    if(i>0){elementMixinArgs+=','}
                    if(key=='a' && i==1){continue}
                    let n;
                    if(block.elements[key][i]){
                        n = getNameProperty(i,block.elements[key][i],k);
                        if(n){
                            el+=n[0]+':'+n[1]+';';
                        }
                        elementMixinArgs+=n[1];
                    }else{
                        elementMixinArgs+=null;
                    }
                }
                let addName=key;
                let oldkey=key.replace('&','---');
                if(key[0]=='@'){
                    oldkey=oldkey.substring(1)
                    //два класса
                    key=key.replace('__','.')
                    key=key.replace('&',':')
                    key='.'+key.substring(1)
                    //console.log(key)
                    addName='class'
                }else if(key[0]=='&'){
                    oldkey=oldkey.substring(1)
                    // hover для елементов
                    key=key.substring(1)
                    key=key.replace('&',':')
                    key=key.replace('__','.')
                }
                if(el){
                    elements+=key+'{'+el+'}';
                }
                if(key=='a' && block.elements.a[1]){
                    elements+='a:hover {color:'+block.elements.a[1]+'}';
                }
                //console.log(key,elements)
                if(pugCache[type+block.type+addName]){
                    if(key[0]=='.'){
                        key=key.substring(1)
                        let i = key.indexOf(':');
                        if(i>-1){
                            key=key.substring(0,i)
                        }
                        i = key.indexOf('.');
                        if(i>-1){
                            elementMixinArgs+=',null'
                        }else{
                            elementMixinArgs+=','+key
                        }
                        //console.log(key)
                    }else{
                        elementMixinArgs+=',null'
                    }
                    let css=pugCache[type+block.type+addName]
                    //console.log('css',css)
                    //console.log('oldkey',oldkey)
                    //console.log("block['wrapclass']",block['wrapclass']+" {@include block-wrap"+block.type+oldkey+"("+elementMixinArgs+");}")
                    mixinElements += "@mixin block-wrap"+block.type+oldkey+"("+mixinArgsDefine+',$className:null'+") {" +css+"}";
                    mixinElements +="\n."+block['wrapclass']+" {@include block-wrap"+block.type+oldkey+"("+elementMixinArgs+");}"
                }

            }
        }
        try {
            let css='';
            //console.log(!!pugCache[type+block.type+sCSS+'CSS'])
            if(pugCache[type+block.type+sCSS+'CSS'] && !isWin){
                css=pugCache[type+block.type+sCSS+'CSS']
            }else{
                //console.log("homePath,type,block.type,s,sCSS",homePath,type,block.type,s,sCSS)
                css=getCachedData(homePath,type,block.type,s,sCSS,true)
            }

            if(block.type=='menu2' && !block.mobile && !block.tablet){
                if(css){
                    let c=css.split('/*main style*/')
                    css=c[1];
                }
            }

            if(elements||css){
                mixin += "@mixin block-wrap("+mixinArgsDefine+") {" +elements+css+"}";
                //if(block.type=='banner' && sCSS=='11'){console.log(mixin)}
                mixin+="\n."+block['wrapclass']+" {@include block-wrap("+mixinArgs+");}"
                if(mixinElements){
                    mixin+="\n"+mixinElements
                }
                if(animationMixin){
                    mixin+="\n"+animationMixin
                }

                if(mixin){
                    var compileCss = sass.renderSync({
                        data: mixin
                    });
                    if(compileCss.css){
                        cssData.css+=compileCss.css
                    }
                }
            }
        }catch (e) {
            console.log('type is ',type,'  ')
            console.log('type block is ',block.type)
            //console.log(e)
        }
        return resolve('');
    })
}
function getCachedData(homePath,gType,type,s,sCSS,CSSfile) {
    let fileName;
    if(s && isNaN(s)){
        fileName= path.join(homePath,type,'/',type+s+'.scss');
        try{
            let dataForRender = fs.readFileSync(fileName, "utf8")
            return dataForRender
        } catch (e) {
            console.log('getCachedData',e)
        }
    }else{
        if(gType=='home' || gType=='header' || gType=='footer'|| gType=='stat'|| gType=='news' || gType=='list'){
            fileName= path.join(homePath,type,'/',type+s+'.jade');
        }else{
            fileName= path.join(homePath,type,'/',type+s+'.html');
        }
        let fileNameCSS=  path.join(homePath,type,'/',type+sCSS+'.css');
        if(CSSfile){
            try{
                let dataForRender = fs.readFileSync(fileNameCSS, "utf8")
                return dataForRender
            } catch (e) {
                console.log('getCachedData2',e)
            }
        }else{
            try{
                //console.log(gType+type+s)
                let dataForRender = fs.readFileSync(fileName, "utf8")
                return dataForRender
            } catch (e) {
                console.log('getCachedData 3',e)
            }
        }
    }
}