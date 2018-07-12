'use strict';
const fs=require('fs');
var path=require('path');
const pugCache=require('../pugCache');
const isWin = /^win/.test(process.platform);
const sass = require('node-sass');
const mixinArgsDefine = require('../modules/mixinArgsDefine');
const globalVar=require('../../public/scripts/globalVariable.js')
const getNameProperty=globalVar.getNamePropertyCSS;
const lengthStyleBlock=globalVar.lengthStyleBlock+1;//+1 = $hover-background-color
const co=require('co')
module.exports = function getMainCSS(store,template,photoHost,k) {
    let d1=Date.now()
    let mainCSSFilePath = path.join( __dirname, '../../public/css/'+store._id+'.css' );
    if(!store.doFile){
        try{
            let dataCSS = fs.readFileSync(mainCSSFilePath, "utf8")
            return dataCSS;
        }catch(err){
            console.log('get maincss',err)
        }
    }
    /*if(store.useCSSFile){
     return
     }*/
    let storeId=store._id;
    let main=template.index;
    let backgroundImg=store.backgroundImg;
    let addcomponents=template.addcomponents;
    if(!addcomponents){
        addcomponents={}
    }




    return new Promise(function(resolve,reject){
        try{
            if(main.mainColor){addcomponents.mainColor=main.mainColor}
            if(main.addColor1){addcomponents.addColor1=main.addColor1}
            if(main.addColor2){addcomponents.addColor2=main.addColor2}
            if(main.addColor3){addcomponents.addColor3=main.addColor3}
            if(main.addColor4){addcomponents.addColor4=main.addColor4}

        }catch(err){
            reject(err)
        }
        /*if(cache.stores[storeId].homePageCSS){
         resolve(cache.stores[storeId].homePageCSS)
         }*/
        var mixin='';
        co(function* () {
            //https://gist.github.com/jonathantneal/d0460e5c2d5d7f9bc5e6
            //mixin +== "@mixin font-face($font,$url) {@font-face {font-family: $font;src: local($font),url($url);}}";
            let p = path.join( __dirname, '../../public/views/template/css/font-face.mixin.scss' );
            let keyCache='font-faceMixin'
            if(pugCache[keyCache] &&!isWin){
                mixin +=pugCache[keyCache];
            }else{
                mixin += fs.readFileSync(p, "utf8");
            }

            if(main && main.fontFaces && main.fontFaces.length){
                let extens=['eot','woff2','woff','ttf','otf','svg']
                let actions=[]
                main.fontFaces.forEach(function(font,i){
                    let p = path.join( __dirname, '../../public/fonts/',font );
                    actions[i]=new Promise(function (resolve,reject) {
                        fs.readdir(p,function(err,files){
                            if(err)reject(err)
                            resolve(files)
                        })
                    })
                })
                let o = yield Promise.all(actions);
                //console.log(o)
                main.fontFaces.forEach(function(font,i){
                    let fontsExt='';
                    let srcs=''
                    extens.forEach(function(ext){
                        if(o[i].indexOf(font+'.'+ext)>-1){
                            if(srcs){
                                srcs+=' '+ext
                            }else{
                                srcs+=ext;
                            }
                            //console.log(srcs)
                        }
                    })
                    let pathF = "'/fonts/"+font+"/"+font+"'";
                    mixin+="@include font-face("+font+","+pathF+",null,null,"+srcs+");"


                })
            }
            if(main && main.body){
                let el='';
                for(let i=0;i<lengthStyleBlock;i++){
                    if(main.body[i]){
                        let n = getNameProperty(i,main.body[i],k)
                        if(n){
                            el+=n[0]+':'+n[1]+';';
                        }
                    }

                }
                if(el){
                    mixin+="body{"+el+"}"
                }
            }
            if(backgroundImg){
                mixin+=".body-background{background-image: url("+photoHost+'/'+backgroundImg+")}"
            }
            if(main && main.elements && typeof main.elements=='object'){
                for(let element in main.elements){
                    let el='';
                    for(let i=0;i<lengthStyleBlock;i++){
                        //for(let i=0,l=main.elements[element].length;i<l;i++){
                        if(main.elements[element][i]){
                            let n = getNameProperty(i,main.elements[element][i],k)
                            if(n){
                                el+=n[0]+':'+n[1]+';';
                            }
                        }

                    }

                    if(el){
                        if(element[0]=='@'){
                            element=element.replace('__','.')
                            element='.'+element.substring(1)
                        }else if(element[0]=='&'){
                            element=element.substring(1)
                            element=element.replace('&',':')
                        }
                        mixin+=element+"{"+el+"}"
                    }
                }
            }

            mixin +=getMixinForBlocks(main,'dimScreen',k,'id')
            //mixin +=getMixinForBlocks(main,'addbutton',k,'id')
            mixin +=getMixinForBlocks(main,'link',k,null,main.linkFile)
            let addFile = (main.buttonColorFile && main.buttonColorFile>0)?'color'+main.buttonColorFile:'color';
            let preffix =  (main.buttonFile && main.buttonFile>0)?''+main.buttonFile:'';
            mixin +=getMixinForBlocks(main,'button',k,null,preffix,addFile)
            mixin +=getMixinForBlocks(main,'arrowDown',k)
            mixin +=getMixinForBlocks(main,'arrowUp',k)
            if(main['modalProject']){
                mixin +=getMixinForBlocks(main,'modalProject',k,'class')
            }
            if(main['modalBackdropClass']){
                //if(main['modalBackdropClass'])
                mixin +=getMixinForBlocks(main,'modalBackdropClass',k,'class')
            }
            mixin +=getMixinForBlocks(main,'slideMenu',k)
            if(main['slideChat']){
                mixin +=getMixinForBlocks(main,'slideChat',k)
            }
            if(main['slideCart']){
                mixin +=getMixinForBlocks(main,'slideCart',k)
            }
            if(main['slideEntry']){
                mixin +=getMixinForBlocks(main,'slideEntry',k)
            }

            mixin +=getMixinForBlocks(main,'slideMenuHum',k)

            mixin +=getMixinForBlocks(main,'animateforall',k)

            if(addcomponents){
                var style=''
                if(addcomponents.zoom){
                    if(addcomponents.zoom.style){
                        style=addcomponents.zoom.style
                    }else{
                        style=''
                    }
                    mixin +=getMixinForBlocks(addcomponents,'zoom',k,'class',style)
                }
                if(addcomponents.chat){
                    if(addcomponents.chat.style){
                        style=addcomponents.chat.style
                    }else{
                        style=''
                    }
                    mixin +=getMixinForBlocks(addcomponents,'chat',k,null,style)
                }
                if(addcomponents.datetime){
                    if(addcomponents.datetime.style){
                        style=addcomponents.datetime.style
                    }else{
                        style=''
                    }
                    mixin +=getMixinForBlocks(addcomponents,'datetime',k,'class',style)
                }
                if(addcomponents.campaign){
                    if(addcomponents.campaign.style){
                        style=addcomponents.campaign.style
                    }else{
                        style=''
                    }
                    mixin +=getMixinForBlocks(addcomponents,'campaign',k,null,style)
                }
                if(addcomponents.cabinet){
                    if(addcomponents.cabinet.style){
                        style=addcomponents.cabinet.style
                    }else{
                        style=''
                    }
                    mixin +=getMixinForBlocks(addcomponents,'cabinet',k,'class',style)
                }
                if(addcomponents.toastError){
                    if(addcomponents.toastError.style){
                        style=addcomponents.toastError.style
                    }else{
                        style=''
                    }
                    mixin +=getMixinForBlocks(addcomponents,'toastError',k,'class',style)
                }
                if(addcomponents.toastInfo){
                    if(addcomponents.toastInfo.style){
                        style=addcomponents.toastInfo.style
                    }else{
                        style=''
                    }
                    mixin +=getMixinForBlocks(addcomponents,'toastInfo',k,'class',style)
                }
                if(addcomponents.addbutton){
                    if(addcomponents.addbutton.style){
                        style=addcomponents.addbutton.style
                    }else{
                        style=''
                    }
                    mixin +=getMixinForBlocks(addcomponents,'addbutton',k,'id',style)
                }
            }


            try{
                let file = path.join( __dirname, '../../public/views/template/index/icon/icon.scss' );
                let jadeIcon='';
                keyCache='indexicon'
                if(pugCache[keyCache] &&!isWin){
                    jadeIcon +=pugCache[keyCache];
                }else{
                    jadeIcon=fs.readFileSync(file, "utf8");
                }


                mixin += "@mixin icon-wrap($img:null,$hoverImg:null,"+mixinArgsDefine+") {"+jadeIcon+"}";
                for(let icon in main.icons){
                    if(main.icons[icon].img){
                        let mixinArgs = '"'+main.icons[icon].img+'"';
                        if(main.icons[icon].hoverImg){
                            mixinArgs+=','+'"'+main.icons[icon].hoverImg+'"';
                        }else{
                            mixinArgs+=','+null;
                        }
                        for(let i=0;i<lengthStyleBlock;i++){
                            let n;
                            if(main.icons[icon].styles && main.icons[icon].styles[i]){
                                n = getNameProperty(i,main.icons[icon].styles[i],k);
                                if(n){
                                    mixinArgs+=','+n[1];
                                }
                            }else{
                                mixinArgs+=','+null;
                            }
                        }
                        mixin+="\n.icon-"+icon+"-img {@include icon-wrap("+mixinArgs+");}"
                    }
                    if(main.icons[icon].hoverImg){
                        let mixinArgs = '"'+main.icons[icon].hoverImg+'"'+','+null;
                        for(let i=0;i<lengthStyleBlock;i++){
                            let n;
                            if(main.icons[icon].styles[i]){
                                n = getNameProperty(i,main.icons[icon].styles[i],k);
                                if(n){
                                    mixinArgs+=','+n[1];
                                }
                            }else{
                                mixinArgs+=','+null;
                            }
                        }
                        mixin+="\n.icon-"+icon+"-inverse {@include icon-wrap("+mixinArgs+");}"
                    }

                }
            }catch(err){
                console.log('from body ',err)
            }
            try{
                if(mixin){
                    if(main.icons && main.icons.prevgallery && main.icons.nextgallery){
                        var carouselIcon=".gallery  .carousel-control.left {background:url("+main.icons.prevgallery.img+")!important;background-position: center!important;width: 30px!important;background-repeat: no-repeat!important;}"
                        carouselIcon+=".gallery  .carousel-control.right {background:url("+main.icons.nextgallery.img+")!important;background-position: center!important;width: 30px!important;background-repeat: no-repeat!important;}"
                    }
                    var compileCss = sass.renderSync({
                        data: mixin
                    });
                    if(compileCss.css){
                        if(carouselIcon){
                            compileCss.css+=carouselIcon
                        }
                        let d2=Date.now()
                        fs.writeFile( 'public/css/'+store._id+'.css', compileCss.css, function (err, data) {
                            if (err) {console.log('fs.writeFile',err)}else {console.log('public/css/'+store._id+'.css was written')}
                        } );
                        resolve(compileCss.css)
                    }else{
                        console.log('compileCss.css is empty')
                        resolve('')
                    }

                }else{
                    resolve('')
                }

            }catch(err){
                console.log('main css',err)
                resolve('')
            }

        }).catch(function (err) {
            console.log('get main CSS err ',err)
            resolve('')
        });
    })
}


function getMixinForBlocks(stylesData,name,k,type,preffix,addFile){
    if(!preffix){preffix=''}
    try{
        let file = path.join( __dirname, '../../public/views/template/index/'+name+'/'+name+preffix+'.scss' );
        let mixin='';
        if(addFile){
            addFile=path.join( __dirname, '../../public/views/template/index/'+name+'/'+addFile+'.scss' );
            mixin+=fs.readFileSync(addFile, "utf8");
        }
        let data,
            keyCache='index'+name+preffix;
        if(pugCache[keyCache] &&!isWin){
            data=pugCache['index'+name+preffix]
        }else{
            data=fs.readFileSync(file, "utf8");
        }

        let elements='';
        if(stylesData[name] && stylesData[name].elements && typeof stylesData[name].elements=='object'){
            for(var key in stylesData[name].elements){
                let el='';
                for(let i=0;i<lengthStyleBlock;i++){
                    if(key=='a' && i==1){continue}
                    let n;
                    if(stylesData[name].elements[key][i]){
                        n = getNameProperty(i,stylesData[name].elements[key][i],k);
                        if(n){
                            el+=n[0]+':'+n[1]+';';
                        }
                    }
                }
                if(el){
                    /*if(key[0]=='@'){
                     key='.'+key.substring(1);

                     }*/
                    let addName=key;
                    let oldkey=key;
                    if(key[0]=='@'){
                        oldkey=key.substring(1)
                        //два класса
                        key=key.replace('__','.')
                        key=key.replace('&',':')
                        key='.'+key.substring(1)
                        addName='class'
                    }else if(key[0]=='&'){
                        oldkey=key.substring(1)
                        // hover для елементов
                        key=key.substring(1)
                        key=key.replace('&',':')
                    }
                    elements+=key+'{'+el+'}';





                }
                if(key=='a' && stylesData[name].elements.a[1]){
                    elements+='a:hover {color:'+stylesData[name].elements.a[1]+'}';
                }
            }
        }
        if(elements){
            data+="\n"+elements
        }



        if(stylesData[name]){
            if(stylesData[name].styles){
                var styles= stylesData[name].styles
            }else if(stylesData[name].blockStyle){
                var styles= stylesData[name].blockStyle
            } else{
                var styles= stylesData[name]
            }
        }


        let mixinArgsForBlocks = mixinArgsDefine+',$mainColor:null,$addColor1:null,$addColor2:null,$addColor3:null,$addColor4:null'
        let mixinArgs='';
        for(let i=0;i<lengthStyleBlock;i++){
            let n;
            if(i>0){mixinArgs+=','}
            if(styles && styles[i]){
                n = getNameProperty(i,styles[i],k);
                if(n){
                    mixinArgs+=n[1];
                }else{
                    mixinArgs+=null;
                }
            }else{
                mixinArgs+=null;
            }
        }

        let mainColor=(stylesData.mainColor)?stylesData.mainColor:'null';
        let addColor1=(stylesData.addColor1)?stylesData.addColor1:'null';
        let addColor2=(stylesData.addColor2)?stylesData.addColor2:'null';
        let addColor3=(stylesData.addColor3)?stylesData.addColor3:'null';
        let addColor4=(stylesData.addColor4)?stylesData.addColor4:'null';

        mixinArgs+=','+mainColor+','+addColor1+','+addColor2+','+addColor3+','+addColor4;
        if(name=='toastError'){
            name='toast-error'
        }
        if(name=='toastInfo'){
            name='toast-info'
        }
        mixin += "@mixin "+name+"("+mixinArgsForBlocks+") {"+data+"}";

        switch (type){
            case 'class':mixin+="\n ."+name+" {@include "+name+"("+mixinArgs+");}";break;
            case 'id':mixin+="\n #"+name+" {@include "+name+"("+mixinArgs+");}";break;
            default     :mixin+="\n @include "+name+"("+mixinArgs+")"
        }

        return mixin;
    }catch(err){
        console.log('getMixinForBlocks',name,' ',err)
        return '';
    }

}
