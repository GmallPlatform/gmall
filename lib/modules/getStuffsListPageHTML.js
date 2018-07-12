'use strict';
const fs=require('fs');
const path=require('path');
const request=require('request');
const globalVar=require('../../public/scripts/globalVariable.js')
const getPartWithKey = require('../modules/getPartWithKey');
const getCSSForBlock = require('../modules/getCSSForBlock');
const getItemPage = require('../modules/getItemPage');
const getItemsForPage = require('../modules/getItemsForPage');
const hangleBlocksForPugCompile = require('../modules/hangleBlocksForPugCompile');
const setMobileOrTabletStyle=require('../setMobileOrTabletStyle');
const pugCache=require('../pugCache');
const isWin = /^win/.test(process.platform);
const zlib = require('zlib');
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




module.exports = function getDataForStuffList(queryDone,stuffListType,req,fromAngular,campaignList){
    //console.log('queryDone',queryDone)
    let section;
    let stuffHost = req.stuffHost;
    let photoHost = req.photoHost;
    let urlPage= req.url;
    let urlForStuff
    if(!fromAngular){
        urlForStuff=urlPage.split('?');
    }else{
        urlForStuff=(req.query.url)?req.query.url.split('?'):urlPage.split('?');
    }
    //console.log(req.query.url)
    if(urlForStuff && urlForStuff[0]){
        let c = urlForStuff[0].split('/');
        if(c && c.length && c.length==4){
            c.pop();
            urlForStuff[0]=c.join('/')
        }
    }
    //console.log('urlForStuff',urlForStuff)


    urlPage = urlPage.split('/').join('~')
    urlPage=urlPage.split('?').join('~~')
    urlPage=urlPage.split('&').join('~~~')
    urlPage=urlPage.split('=').join('~~~~')
    let storeHost=req.storeHost;
    let group = req.params.group;
    let query=null
    let jadeData={dj:{}},cssData={css:''};
    let page=(req.query&&req.query.pages)?Number(req.query.pages):0;


    let perPage=20;

    let filtersInList=false;
    let rows;
    let filterBlock;
    let filtersInModal;
    let delta;
    let midleRows
    let category;
    let objectData;
    let customTemplate;



    //*******************************************
    return Promise.resolve()
        .then(function(){
            return getItemPage(req.store._id,storeHost,{model:'CustomLists',url:urlPage,lang:req.store.lang})
        })
        .then(function(template){
            if(template && template._id && template.actived){
                customTemplate=template;
                rows=(customTemplate.rows)?customTemplate.rows:3;
                filterBlock=customTemplate.blocks.find(e=>e.name=='filters' && e.is&& e.is!='false')
                filtersInModal=customTemplate.filtersInModal
            }else{
                rows=(req.store.template.stuffListType[stuffListType] && req.store.template.stuffListType[stuffListType].rows)||3;
                filterBlock=req.store.template.stuffListType[stuffListType].parts.find(e=>e.name=='filters' && e.is && e.is!='false')
                filtersInModal=req.store.template.stuffListType[stuffListType].filtersInModal
            }
            if(req.query.rows && req.query.rows!=rows && rows>req.query.rows){
                rows=req.query.rows;
            }
            if(filterBlock && !req.mobile && !filtersInModal){
                filtersInList=true;
                rows--
            }
            //console.log(filterBlock,filtersInList)
            // определяем количество perPage для данного rows
            if(fromAngular){
                perPage=(req.query&&req.query.perPage)?req.query.perPage:20;
            }else{
                perPage=(req.store.template.stuffListType[stuffListType]&&req.store.template.stuffListType[stuffListType].perPage)?Number(req.store.template.stuffListType[stuffListType].perPage):20;
            }
            perPage=Number(perPage)
            delta = perPage%rows;
            midleRows=Math.round(rows/2);
            if(delta>=midleRows){
                perPage+=(rows-delta)
            }else{
                perPage-=delta
            }

        })
        .then(function () {
            return getItemPage(req.store._id,stuffHost,{model:'Group',url:req.params.groupUrl,lang:req.store.lang})
        })
        .then(function (sec) {
            //console.log(sec)
            section = sec;
            return queryDone
        })
        .then(function (query) {
            //console.log(query)
            let acts=[];
            if(query && typeof query=='string'){
                try{
                    query=JSON.parse(query)
                }catch(err){console.log('query=JSON.parse(query)',err)}
            }
            if(query.category && query.category.toString && !query.category.$in){
                query.category = query.category.toString()
            }
            //console.log("query.category && typeof query.category=='string'",query.category && typeof query.category=='string')
            if(query.category && typeof query.category=='string'){
                /*let cat = section.categories.find(c=>c._id==query.category)
                let pr=Promise.resolve(cat)
                acts.push(pr)*/
                acts.push(getItemPage(req.store._id,stuffHost,{model:'Category',url:query.category,lang:req.store.lang}))
            }else{
                let pr=Promise.resolve()
                acts.push(pr)
            }
            if(section && section.groupStuffs){
                let data={model:'GroupStuffs',query:'',lang:req.store.lang}
                let page,rows=20;
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
                    let query={actived:true}
                    if(data.query){
                        data.query+='&query='+JSON.stringify(query)
                    }else{
                        data.query='query='+JSON.stringify(query)
                    }
                }

                acts.unshift(getItemsForPage(req.store._id,stuffHost,data))
            }else{
                //perPage=4;
                //console.log(query)
                acts.unshift(getStuffs(req.store._id,stuffHost,query,page,perPage))
            }

            //acts.push(getItemPage(req.store._id,stuffHost,{model:'Group',url:req.params.groupUrl,lang:req.store.lang}))
            return Promise.all(acts)
        })
        .then(function (data) {
            let items=data[0]
            //console.log(items[1].img,items[1].gallery)
            let titles={};
            //console.log('data[1]',data[1])
            if(data[1] && data[1]._id){
                let item=data[1];
                category=item;
                //console.log('category',category)
                if(item.name){
                    titles={title:' '+item.name}
                    if(item.desc){
                        titles.desc=item.desc;
                        titles.description=item.desc.clearTag().substring(0,250);
                    }

                }
                if(item.img){
                    titles.image=photoHost+'/'+item.img;
                }
                // проверяем фильтры есть ли у категории
                if((!item.filters || !item.filters.length) && filtersInList){
                    filtersInList=false;
                    filterBlock=null;
                    rows++
                }

            }
            if(!titles.image){
                if(items[0] && items[0].gallery && items[0].gallery[0] && items[0].gallery[0].thumb){
                    titles.image=photoHost+'/'+items[0].gallery[0].thumb;
                }
            }
            if(section){
                titles.canonical='/'+section.url+'/'+((category && category.url)?category.url:'category')
            }

            //console.log(titles)
            //console.log(items)
            objectData={
                items:items,
                titles:titles
            }
            //console.log('titles',titles)
            return objectData;
        })


        //********************************************************************
        .then(async function () {
            let o = objectData
            let items=o.items;
            let total=0;
            if(!page && items.length){
                total = items.shift().index
            }
            if(section && section.groupStuffs){
                items.forEach(function (item) {
                    if(item.store!=req.store._id){
                        item.link="/"+section.url+'/'+category.url+'?store='+item.store
                    }
                    item.uiSref='stuffs.stuff(stuff.stateObj)'
                    delete item.nameL
                    delete item.descL
                    if(item.stuffs && item.stuffs.length){
                        item.price=item.stuffs.reduce(function (sum,item) {
                            try{
                                if(item.price){
                                    sum +=Number(item.price)
                                }
                            }catch(err){
                                console.log("item.price=item.stuffs.reduce(function (sum,item) {",err)
                            }
                            return sum
                        },0)
                    }
                    item.groupStuffsInList=JSON.stringify(item)
                })
            }else{
                items.forEach(function (item) {
                    if(item.store!=req.store._id){
                        item.link="/"+section.url+'/'+category.url+"/"+item.url+'?store='+item.store
                    }else if(campaignList){
                        //console.log(item.link)
                    }else{
                        item.link= urlForStuff[0]+'/'+item.url+((urlForStuff[1])?'?'+urlForStuff[1]:'')
                    }
                    //console.log(item.link)
                    delete item.nameL
                    delete item.descL
                    //delete item.desc
                    item.gallery.splice(1)
                    let preffixForPhoto = (req.store.photoHost)?req.store.photoHost:'';
                    if(!item.gallery[0] || !item.gallery[0].thumb){
                        item.gallery[0]={thumb:'/img/no.png',img:'/img/no.png'}
                        if(item.blocks && item.blocks.length){
                            for(let i=0;i<item.blocks.length;i++){
                                if(block.img && block.useImg){
                                    //console.log(block.type,i)
                                    item.img=block.img;
                                    break;
                                }
                            }
                        }
                    }else{
                        if(item.gallery[0].img){
                            item.gallery[0].img=((item.gallery[0].img[0]!='/')?preffixForPhoto+'/':preffixForPhoto)+item.gallery[0].img;
                        }
                        if(item.gallery[0].thumb){
                            item.gallery[0].thumb=((item.gallery[0].thumb[0]!='/')?preffixForPhoto+'/':preffixForPhoto)+item.gallery[0].thumb;
                        }

                    }
                    //console.log(item.gallery[0],item.img)
                    item.stuffInList=JSON.stringify(item)
                    item.uiSref='stuffs.stuff(stuff.stateObj)'
                })
            }


            var homePath = path.join( __dirname, '../../public/views/template/partials/stuffs/' );
            let type = 'stuffs';




            //***********************************************************************************

            let idx=132;
            //let parts=[];
            let tab = '    ';
            // это верхняя оболочка. она не применяеся
            //let key ="wrap-stuffs-page-stuffsList"
            //parts.push("- var key = '"+key+"'")
            //parts.push("div(class=dj['wrap-stuffs-page-stuffsList'].wrapclass)")
            //parts.push("  div(class=mobileWrapper)")
            //console.log(stuffListType)
            let element=(customTemplate)?customTemplate:req.store.template.stuffListType[stuffListType];
            //setMobileOrTabletStyle(req,element)

            /*element.type=type;
            element.wrapclass=key;
            element.i=1;
            jadeData.dj[key]=element;*/

            let blockList=(customTemplate)?customTemplate.blocks:req.store.template.stuffListType[stuffListType].parts;
            if(req.mobile || element.rows==1){rows=1} else if(req.tablet){rows=2}


            let jadeItem='';
            if(!page){
                // стили формируем только для первой страницы
                //getCSSForBlock(homePath,element,type,cssData)
            }
            let addVar=req.addVar;
            let filteredList= blockList
                .filter(function (block) {
                    return block.is && block.is!='false';
                })
            for(let element of filteredList){
                if(element){
                    idx++;
                    element.i=idx;
                    element.type=element.name

                    if(element.name=='list'){
                        element.i=stuffListType;
                        element.templ=rows
                        let jadeList = getPartWithKey(element,'stuffs',homePath+'/')
                        //console.log('element.wrapclass',element.wrapclass)
                        setMobileOrTabletStyle(req,element)
                        let a = jadeList.split('\n')
                        let key ="wrap-stuffs-"+element.type+element.templ+element.i;
                        jadeData.dj[key]={
                            page:page,
                            total:total,
                            qty:items.length,
                        }
                        let typeCart = 'cart';
                        let cartJade;
                        let elementCart=(req.store.template.stuffListCart && req.store.template.stuffListCart[stuffListType])?req.store.template.stuffListCart[stuffListType]:{};
                        setMobileOrTabletStyle(req,elementCart)
                        if(customTemplate && customTemplate.stuffListCart){
                            elementCart=customTemplate.stuffListCart;
                        }
                        if(cartJade = pugCache['stuffs'+typeCart+((elementCart.templ && elementCart.templ!='0')?elementCart.templ:'')]){
                            let cartJadeArr=cartJade.split("\n").map(function(s){return '                                '+s})
                            if(rows==1){
                                a.splice.apply(a,[10,1].concat(cartJadeArr))
                            }else if(rows==4){
                                a.splice.apply(a,[25,1].concat(cartJadeArr))
                                a.splice.apply(a,[20,1].concat(cartJadeArr))
                                a.splice.apply(a,[15,1].concat(cartJadeArr))
                                a.splice.apply(a,[10,1].concat(cartJadeArr))
                            }else if(rows==5){
                                a.splice.apply(a,[30,1].concat(cartJadeArr))
                                a.splice.apply(a,[25,1].concat(cartJadeArr))
                                a.splice.apply(a,[20,1].concat(cartJadeArr))
                                a.splice.apply(a,[15,1].concat(cartJadeArr))
                                a.splice.apply(a,[10,1].concat(cartJadeArr))
                            }else if(rows==3){
                                //a.splice(20,1,cartJadeArr)
                                a.splice.apply(a,[20,1].concat(cartJadeArr))
                                a.splice.apply(a,[15,1].concat(cartJadeArr))
                                a.splice.apply(a,[10,1].concat(cartJadeArr))
                            }else if(rows==2){
                                a.splice.apply(a,[15,1].concat(cartJadeArr))
                                a.splice.apply(a,[10,1].concat(cartJadeArr))
                            }

                            jadeList= a.join("\n")
                        }
                        //console.log(jadeList)
                        //fs.writeFile( 'public/views/stuffslist'+req.store.subDomain+'.pug', jadeList, function (err, data) {if (err) console.log(err);} );
                        //***************************************************************
                        //element.type=type;
                        element.wrapclass=key;
                        element.i=1;
                        let addVar=req.addVar;
                        // найти где css для списка и получать его только если нулевая страница
                        if(!page){
                            // это стили для  для списка
                            getCSSForBlock(homePath,element,'stuffs',cssData,addVar)
                            elementCart.name='cart'
                            elementCart.type='cart'
                            // оболочка для списка одновременно оболочка для карточки
                            elementCart.wrapclass=element.wrapclass
                            getCSSForBlock(homePath,elementCart,'stuffs',cssData,addVar)
                            /*let cssData1={css:''}
                            getCSSForBlock(homePath,elementCart,'cart',cssData1,addVar)
                            console.log(cssData1.css)*/
                        }

                        if(items.length){
                            jadeData.dj[key].lastItemId= items[items.length-1]._id
                        }else{
                            jadeData.dj[key].lastItemId='null'
                        }

                        if(filtersInList){
                            jadeData.dj[key].filtersInlist=filtersInList;
                            filterBlock.wrapclass='filters-wrap';//element.wrapclass;
                            setMobileOrTabletStyle(req,filterBlock)
                            getCSSForBlock(homePath,filterBlock,'stuffs',cssData,addVar)
                        }


                        jadeData.dj[key].templ=elementCart.templ;// defile number of template
                        jadeData.dj[key].itemsType=type;
                        jadeData.dj[key].wrapclass=key;
                        jadeData.dj[key].items=items;
                        if(rows==2){
                            jadeData.dj[key].itemsArr2=items.divideArrayWithChunk(2);
                        }else if(rows==3){
                            jadeData.dj[key].itemsArr3=items.divideArrayWithChunk(3);
                        }else if(rows==4){
                            jadeData.dj[key].itemsArr4=items.divideArrayWithChunk(4);
                        }else if(rows==5){
                            jadeData.dj[key].itemsArr5=items.divideArrayWithChunk(5);
                        }


                        jadeData.dj[key].filtersClass="col-lg-3 col-md-3 col-sm-3 col-xs-3"
                        jadeData.dj[key].classList = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
                        if(jadeData.dj[key].filtersInlist){
                            if(req.tablet){
                                jadeData.dj[key].filtersClass="col-lg-4 col-md-4 col-sm-4 col-xs-4"
                                jadeData.dj[key].classList = "col-lg-8 col-md-8 col-sm-8 col-xs-8";
                            }else{
                                jadeData.dj[key].classList = "col-lg-9 col-md-9 col-sm-9 col-xs-9";
                            }


                        }
                        jadeData.dj[key].classList12 = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
                        jadeData.dj[key].classList9="col-lg-9 col-md-9 col-sm-9 col-xs-9"

                        jadeItem +=jadeList;
                        //console.log(key)
                    }else if(element.name=='filters'){
                        //console.log(element.name,page)
                        if(!page){
                            if(req.store.template.stuffListType[stuffListType].filtersInModal || req.mobile){
                                //console.log('element.wrapclass',element.wrapclass)
                                let  data = getPartWithKey(element,'stuffs',homePath)
                                //console.log(element.wrapclass)
                                jadeItem +=data
                                //wrapclass устанавливается в предыдущей функции
                                jadeData.dj[element.wrapclass]=element;
                                element.wrapclass='modalProject'
                                setMobileOrTabletStyle(req,element)
                                getCSSForBlock(homePath,element,'stuffs',cssData,addVar)
                            }
                        }

                    }else if(element.name=='button'){
                        let  data = getPartWithKey(element,'stuffs',homePath)
                        jadeItem +=data
                        //wrapclass устанавливается в предыдущей функции
                        if(customTemplate && customTemplate.button){
                            if(customTemplate.button.nameL && customTemplate.button.nameL[req.store.lang]){
                                customTemplate.button.name=customTemplate.button.nameL[req.store.lang]
                            }
                            for(let key in customTemplate.button){
                                element[key]=customTemplate.button[key]
                            }
                        }
                        jadeData.dj[element.wrapclass]=element;
                        setMobileOrTabletStyle(req,element)
                        getCSSForBlock(homePath,element,'stuffs',cssData,addVar)
                    }else if(element.name=='blocks'){
                        let jadeHTML='';
                        /*let partsBlock=[];
                         let tab = '    ';
                         let key ="wrap-blocks-page"+Date.now()
                         partsBlock.push("- var key = '"+key+"'")
                         partsBlock.push("div(class=dj[key].wrapclass)")
                         partsBlock.push("  div(class=mobileWrapper)")
                         let element=(req.store.template[type])?req.store.template[type]:{};
                         element.type=type;
                         element.wrapclass=key;
                         element.i=1;
                         jadeData.dj[key]=element;*/
                        //jadeHTML+=hangleBlocksForPugCompile(category.blocks,req,jadeData,cssData,category)
                        if(category && category.blocks && category.blocks.length){
                            jadeItem +=await hangleBlocksForPugCompile(category.blocks,req,jadeData,cssData,category)
                        }

                        //partsBlock.splice.apply(partsBlock,[3,0].concat(jadeHTML.split('\n').filter(function(e){return e;}).map(function (l) {return tab+l})))
                        //jadeItem +=partsBlock.join("\n")
                    }else{
                        //console.log(element.name)
                        if(!page){
                            jadeItem += getPartWithKey(element,'stuffs',homePath)

                            //wrapclass устанавливается в предыдущей функции
                            jadeData.dj[element.wrapclass]=element;
                            jadeData.dj[element.wrapclass].allCategoriesLink='/'+req.params.groupUrl+'/category'
                            if(element.name=='desc'){
                                if(category && category.desc){
                                    jadeData.dj[element.wrapclass].desc=category.desc;
                                }
                            }
                            if(element.name=='categories' && section && section.categories){
                                let categories =section.categories.filter(function (c) {
                                    return !c.notActive;
                                }).map(function (c) {
                                    c.link='/'+section.url+'/'+c.url
                                    return c;
                                })
                                jadeData.dj[element.wrapclass].categories=categories;
                                jadeData.dj[element.wrapclass].section=section;
                            }else{
                                jadeData.dj[element.wrapclass].categories=[]
                            }
                            setMobileOrTabletStyle(req,element)
                            getCSSForBlock(homePath,element,'stuffs',cssData,addVar)
                        }
                    }


                }

            }




            /*fs.mkdirParentPromise('public/views/'+req.store.subDomain).then(function () {
                    fs.writeFile( 'public/views/'+req.store.subDomain+'/stuffslist'+req.store.subDomain+'.css', cssData.css, function (err, data) {
                        if (err) console.log(err);
                    } );
                fs.writeFile( 'public/views/'+req.store.subDomain+'/stuffslist'+req.store.subDomain+'.pug', jadeItem, function (err, data) {
                    if (err) console.log(err);
                } );
            })*/



            jadeData.langLink=(req.store.mainLang!=req.store.lang)?'?lang='+req.store.lang:'';
            o.jadeItem=jadeItem;
            o.jadeData=jadeData;
            o.cssData=cssData;
            return o;
        })
        //********************************************************************
        .catch(function (err) {
            console.log('getDataForStuffList',err)
            return null;
        })
}
function getStuffs(storeId,stuffHost,query,page,perPage){
    if(!isWin){
        stuffHost='http://127.0.0.1:'+stuffHost.split(':')[2]
    }
    if(query && typeof query=='object'){
        query=JSON.stringify(query)
    }
    return new Promise(function(resolve,reject){
        let url = stuffHost+"/api/collections/Stuff?store="+storeId+'&query='+query;
        if(page){url+='&page='+page}
        if(perPage){url+='&perPage='+perPage}

        let headers = {
            "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
            "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8;application/json;charset=utf-8,*/*",
            "user-agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
            "accept-encoding" : "gzip",
            'Accept-Encoding': 'gzip',
        };
        let options = {
            uri: url,
            json: true,
            method: 'GET',
            timeout: 1500,
            headers:headers
            /* href: '',
             pathname: '/'*/
        };

        let req = request.get(options);
        req.on('response', function(res) {
            var chunks = [];
            res.on('data', function(chunk) {
                //console.log(chunk)
                chunks.push(chunk);
            });

            res.on('end', function() {
                var buffer = Buffer.concat(chunks);
                /*console.log(buffer.toString('utf8'))
                console.log(buffer.byteLength)*/
                if(buffer.byteLength==2){return resolve([])}// нет ничего пустой массив
                var encoding = res.headers['content-encoding'];
                zlib.unzip(buffer, function(err, unzipbuffer) {
                    if (!err) {
                        try{
                            let results =JSON.parse(unzipbuffer.toString('utf8'));
                            return resolve(results);
                        }catch(err){
                            console.log('error in try',err)
                            return reject(err)
                        }
                    }else{
                        console.log('err',err)
                        reject(err)
                    }
                });
            });
            res.on('error', function(err) {
                console.log('msg',err)
                reject(err)
            })
        });






        return;
        request.get({url:url}, function(err,response){
            console.log(response.body)
            if(err){return reject(err)}
            try{
                var items=JSON.parse(response.body);
            }catch(err){
                return reject(err)
            }
            /*if(items && items.length){
             items.shift()
             }*/
            return resolve(items);
        })
    })
}