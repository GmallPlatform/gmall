'use strict';
var StuffClass=require('../../../public/scripts/stuffClass.js')
var getUrl = require('../getUniqueUrl.js')
var myUtil=require('../myUtil.js');
var storeAPI = require('../../../modules/store-api');


var forEach = myUtil.forEachForGenerators;

var schedule = require('node-schedule');
const util = require('util')
var Excel = require('exceljs');
var mime =require('mime');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var domain = require('domain');
var ObjectID = mongoose.Types.ObjectId;
var fs = require('fs');
var co = require('co');
var path = require('path');
let async=require('async')
var request=require('request')
//https://github.com/Leonidas-from-XIV/node-xml2js
var xml2js = require('xml2js');

var Group=mongoose.model('Group');
var Category=mongoose.model('Category');
var Brand=mongoose.model('Brand');
var BrandTags=mongoose.model('BrandTags');
var Stat=mongoose.model('Stat');
var Paps=mongoose.model('Paps');
var Coupon=mongoose.model('Coupon');
var Witget=mongoose.model('Witget');
var Master=mongoose.model('Master');
var Keywords=mongoose.model('Keywords');
var Seopage=mongoose.model('Seopage');
var HomePage=mongoose.model('HomePage');
var Campaign=mongoose.model('Campaign');

var SortsOfStuff=mongoose.model('SortsOfStuff')


var Stuff=mongoose.model('Stuff');
var News=mongoose.model('News');
var Filter=mongoose.model('Filter');
var FilterTags=mongoose.model('FilterTags');
var Info=mongoose.model('Info');
var ExternalCatalog=mongoose.model('ExternalCatalog');


function uploadPhotos(photos,subDomain,photoHost,backUrl,smallPhoto) {
    let url=photoHost+'api/uploadPhotosToStuffs';
    return new Promise(function (rs,rj) {
        let form = {subDomain:subDomain,photos:photos,url:backUrl}
        if(smallPhoto){form.smallPhoto=true}
        request.post({url:url,form:form}, function(error,data){
            if(error){
                console.log('error-',error)
                rj(error)
                //запись в лог загрузок
                // и сохранение данных на диск с последующей повторной загрузкой
            }else{
                console.log('OK')
                rs()
                // запись в лог загрузок

            }

        })
    })


}
function getPromiseForSaveInDB(arr) {
    return new Promise(function (rs,rj) {
        async.eachSeries(arr, function(item,cb) {
            item.save(function(err){
                cb(err)
            })
        }, function(err, result) {
            if(err){rj(err)}else{rs()}
        });
    })
}
function getPromiseForUpdateInDB(obj,Model) {
    return new Promise(function (rs,rj) {
        async.eachOfSeries(obj, function(item, _id,cb) {
            let data={$set:{}};
            for(let key in item){
                data.$set[key]=item[key]
            }
            Model.update({_id:_id},data,function(err){
                cb(err)
            })
        }, function(err, result) {
            if(err){rj(err)}else{rs()}
        });
    })
}


function uploadCatalog(extCatalog,store,uploadFile,res,next) {
    let lang = store.lang;
    //console.log(extCatalog)
    let extCatalogId=(extCatalog._id && extCatalog._id.toString)?extCatalog._id.toString():extCatalog._id;

    let confirm;
    if(extCatalog.confirm){
        confirm=true;
        if(res){res.json({})}
    }

    //console.log('ssss')
    let currency = store.mainCurrency;
    let indexOfCatalog= (extCatalog.index)?extCatalog.index:1
    var configIP=require('../../config/config.js')
    var photoHost="http://"+configIP.photoUpload+'/';
    var backUrl="http://"+configIP.stuffHost+'/api/photoUploadResults/'+store.id+'/'+extCatalog.url;

    let typeLog=store.subDomain+'_externalCatalog';
    var date = new Date().toISOString().replace( /T/, ' ' ).replace( /\..+/, '' );
    var stringToFile = "\r" +
        "*************************upload users************************************\r"+
        date + "\r";
    // из файла
    let filtersFromFile={};
    let brandTagsFromFile={},brandTagsForBD={};
    let brandsFromFile=[],brandsForBD={};
    let groupsFromDB=[];
    let categoriesFromFile={},categoriesForBD={};
    var collections=[];
    var categors=[];
    // из БД
    var categories=[],filters=[],filterTags=[],brandTags=[],brands=[],groups=[],stuffsFromDB=[],sortsOfStuffFromDB=[];
    //let sortFilter;
    // новые
    var categoriesNew=[],filtersNew=[],brandTagsNew=[],brandsNew=[],filterTagsNew=[],stuffsNew=[],sortsOfStuffNew=[];
    var groupsNew=[];
    var photos={};
    var categoriesUpdate={},groupUpdate={},filtersUpdate={},brandTagsUpdate={},brandsUpdate={},filterTagsUpdate={};
    var targetBrand;
    var targetGroup;
    // для связи фильтров и брендов с категорией
    let linkCategories={}

    let sortsOfStuffUpdate={},stuffsUpdate={};
    let stuffIdForXML=1;
    let sortIdForXML=1;


    let mimetype;

    if(uploadFile){
        mimetype=mime.extension(mime.lookup(uploadFile.originalname))
    }else{
        mimetype=mime.extension(mime.lookup(extCatalog.link.split('?')[0]));
    }
    //console.log('mimetype',mimetype)
    if(mimetype!='xml' &&  mimetype!='xlsx'){
        throw 'unknown file type'
    }


    Promise.resolve()
    // получение данных из БД
        .then(function () {
            return new Promise(function (rs,rj) {
                Brand.find({store:store._id}).lean().populate('tags').exec(function(err,items){
                    if(err){rj(err)}
                    brands=items
                    /*console.log('items.length',items.length)
                     console.log(extCatalog.brand)*/
                    if(extCatalog.brand){
                        targetBrand=brands.find(function(b){
                            //console.log(b._id.toString(),extCatalog.brand)
                            return b._id.toString()==extCatalog.brand})
                    }

                    //console.log(targetBrand)
                    //rj('finish')
                    rs()
                })
            })

        })
        .then(function () {
            //console.log(targetGroup)
            return new Promise(function (rs,rj) {
                Group.list({criteria:{store:store._id},perPage:100,page:0,req:{store:store}},function(err,items){
                    if(err){rj(err)}
                    groups=items
                    if(items){
                        items.forEach(function (item) {
                            groupsFromDB.push(item)
                            item.child.forEach(function (ch) {
                                groupsFromDB.push(ch)
                            })
                        })
                    }

                    if(extCatalog.group){
                        targetGroup=groups.find(function(g){
                            //console.log(b._id.toString(),extCatalog.brand)
                            return g._id.toString()==extCatalog.group})
                    }
                    if(!targetGroup && groups[0]){
                        targetGroup=groups[0]
                    }
                    if(targetGroup){
                        if(targetGroup && targetGroup.categories && targetGroup.categories.length){
                            targetGroup.categories.forEach(function (c) {
                                categories.push(c)
                            })
                        }
                        if(targetGroup && targetGroup.child && targetGroup.child.length){
                            targetGroup.child.forEach(function (ch) {
                                if(ch.categories && ch.categories.length){
                                    ch.categories.forEach(function (c) {
                                        categories.push(c)
                                    })
                                }
                            })

                        }
                        rs()
                    }else{
                        let section = new Group({name:'catalog',url:'catalog',store:store._id})
                        targetGroup=section.toObject()
                        groups.push(targetGroup)
                        section.save(function (err) {
                            if(err){throw err}
                            rs();
                        })
                    }
                    //console.log(targetGroup)
                    // targetGroup=(extCatalog.group)?groups.getOFA('_id',extCatalog.group):groups[0]
                })
            })

        })
        .then(function () {
            return new Promise(function (rs,rj) {
                FilterTags.find({store:store._id}).lean().exec(function(err,items){
                    if(err){rj(err)}
                    filterTags=items
                    rs()
                })
            })

        })
        .then(function () {
            return new Promise(function (rs,rj) {
                Filter.find({store:store._id}).populate('tags').lean().exec(function(err,items){
                    if(err){rj(err)}
                    filters=items;
                    //console.log(items)
                    /*sortFilter=filters.getOFA('name','размеры')

                     sortFilter.tags=sortFilter.tags.map(function (t) {
                     return t._id
                     })*/
                    rs()
                })
            })
        })
        .then(function () {
            return new Promise(function (rs,rj) {
                BrandTags.find({store:store._id}).lean().exec(function(err,items){
                    if(err){rj(err)}
                    brandTags=items
                    rs()
                })
            })
        })
        .then(function () {
            return new Promise(function (rs,rj) {
                SortsOfStuff.find({store:store._id}).lean().exec(function(err,items){
                    if(err){rj(err)}
                    sortsOfStuffFromDB=items;
                    //console.log('sortsOfStuffFromDB.length',sortsOfStuffFromDB.length)

                    items.forEach(function(s){
                        if(s.idForXML && s.idForXML>=sortIdForXML && s.idForXML<100000){
                            sortIdForXML++;
                        }
                    })
                    items.forEach(function(s){
                        if(!s.idForXML){
                            s.idForXML=sortIdForXML;
                            sortIdForXML++;
                            sortsOfStuffUpdate[s._id]={'idForXML':s.idForXML}
                        }
                    })
                    rs()
                })
            })
        })
        .then(function () {
            return new Promise(function (rs,rj) {
                let $gteIdForXML=indexOfCatalog*100000;
                let $ltIdForXML=(indexOfCatalog+1)*100000;
                let $and ={store:store._id,$and:[{idForXML:{$gte:$gteIdForXML}},{idForXML:{$lt:$ltIdForXML}}]}

                Stuff.find($and)
                    .sort(({'index': -1})).lean().exec(function(err,items){
                    //console.log(err)
                    //console.log('items.length',items.length)
                    if(items.length>10000){
                        //console.log('items.length',items.length)
                        rj("exceeded the limit of product in  DB")
                    }
                    //console.log('items.length',items.length)
                    if(err){rj(err)}
                    stuffsFromDB=items;
                    items.forEach(function(s){
                        //console.log(s.idForXML)
                        if(s.idForXML && s.idForXML>=stuffIdForXML && s.idForXML<100000){
                            stuffIdForXML++;
                        }
                    })
                    items.forEach(function(s){
                        if(s.sortsOfStuff){
                            s.sortsOfStuff=sortsOfStuffFromDB.getOFA('_id',s.sortsOfStuff)
                            //console.log(!!s.sortsOfStuff)
                        }
                        if(!s.idForXML){
                            s.idForXML=stuffIdForXML;
                            stuffIdForXML++;
                            stuffsUpdate[s._id]={'idForXML':s.idForXML}
                        }
                    })
                    rs()
                })
            })
        })
        // получение данных их файла для обработки и загрузки в БД
        .then(function(){
            //console.log('from file ',!!uploadFile )
            if(uploadFile && uploadFile.path){return uploadFile.path}
            let ended = false;
            return new Promise(function (rs,rj) {
                var rand = Math.floor(Math.random()*100000000).toString()
                let ext= extCatalog.link.split('.')
                ext = ext[ext.length-1]
                let fileName='./public/temp/'+extCatalog.url+rand+'.'+ext
                let writeStreeam=fs.createWriteStream(fileName,{flags: 'w', encoding: 'utf-8',mode:'0666' });
                request(extCatalog.link).pipe(writeStreeam);
                writeStreeam.on('finish',nice_ending);
                writeStreeam.on('end',nice_ending);
                writeStreeam.on('error', error_ending);
                writeStreeam.on('close', error_ending);
                function nice_ending() {
                    if (!ended) {
                        ended = true;
                        rs(fileName)
                    }
                }
                function error_ending(err) {
                    console.log('error_ending',err)
                    console.log('ended ',ended)
                    if (!ended) {
                        ended = true;
                        rj("file error");
                    }
                }
            })
        })
        .then(function(filname){
            if(mimetype=='xml'){
                return getXMLDataFromFile(filname)
            }else if(mimetype=='xlsx'){
                return getworkbookXLSXfromFile(filname)

            }
        })
        .then(function(data){
            if(mimetype=='xml'){
                return parseXML(data)
            }else if(mimetype=='xlsx'){
                return parseXLSX(data)
            }
        })
        // обработка товаров
        .then(function(stuffs){
            //console.log(stuffs.length)
            if(stuffs.length>10000){
                throw 'exceeded the limit of product in file';
            }
            //console.log('stage 2')
            //console.log(linkCategories)

            //**************************************************************************************
            let brandsForDb={};
            brandsFromFile.forEach(function(brandName){
                let brandTemp =  brands.getOFA('name',brandName);
                if(!brandTemp){
                    let newBrand = new Brand({name:brandName,store:store._id,index:1,actived:true})
                    brandsNew.push(newBrand)
                    brandTemp=newBrand.toObject();
                    brands.push(brandTemp)
                }
                brandsForDb[brandName]=brandTemp._id.toString();
            })


            for(let brandName in brandTagsFromFile){
                let brandTemp =  brands.getOFA('name',brandName);
                if(!brandTemp){
                    let newBrand = new Brand({name:brandName,store:store._id,index:1,actived:true})
                    brandsNew.push(newBrand)
                    brandTemp=newBrand.toObject();
                    brands.push(brandTemp)
                }
                brandsForBD[brandName]=brandTemp._id;

                if(brandTemp && brandTemp.tags){
                    brandTagsFromFile[brandName].forEach(function(el,i){
                        let c = brandTemp.tags.getOFA('name',el);
                        if(!c){
                            c = brandTagsNew.getOFA('name',el);
                            if(!c){
                                c = new BrandTags({brand:brandTemp._id,name:el,store:store._id,index:1,actived:true})
                                brandTagsNew.push(c)
                                brandTemp.tags.push(c);
                                if(!brandsUpdate[brandTemp._id]){brandsUpdate[brandTemp._id]={}}
                                brandsUpdate[brandTemp._id]['tags']=brandTemp.tags.map(function (t) {
                                    return t._id
                                });
                            }
                        }
                        brandTagsForBD[el]=c._id;
                    })
                }
            }
            //**************************************************************************************
            // tags
            let filterTagsForBD={}
            let filtersForBD={}
            for(let filterName in filtersFromFile){
                let filter = filters.getOFA('name',filterName);
                if(!filter){
                    let newFilter =  new Filter({store:store._id,name:filterName,actived:true,index:1})
                    filtersNew.push(newFilter);
                    filter = newFilter.toObject();
                    filters.push(filter)
                }
                if(!filtersForBD[filterName]){
                    filtersForBD[filterName]=filter._id.toString();
                }
                filtersFromFile[filterName].forEach(function (el,i) {
                    let name= el.split('$$$')[0];
                    let tag= filter.tags.getOFA('name',name)
                    if(!tag){
                        tag = new FilterTags({store:store._id,filter:filter._id,name:name,index:1})
                        filterTagsNew.push(tag)
                        filter.tags.push(tag)
                        if(!filtersUpdate[filter._id]){
                            filtersUpdate[filter._id]={}
                        }
                        filtersUpdate[filter._id]['tags']=filter.tags.map(function(t){return t._id});
                    }
                    if(!filterTagsForBD[el]){
                        filterTagsForBD[el]=tag._id.toString();
                    }
                })
            }


            // обрабатываем категории на связь с брендами и фильтрами установка полей filters,brands у категории
            //*****************************************************
            for(let c in linkCategories){
                if(categoriesForBD[c]){
                    let category = getCategoryFromGroups(groups,categoriesForBD[c])
                    if(category.brands){
                        category.brands=category.brands.map(function(b){if(b && b.toString){return b.toString()}else{return b} })
                    }
                    if(category.filters){
                        category.filters=category.filters.map(function(b){if(b && b.toString){return b.toString()}else{return b} })
                    }
                    if(category){
                        if(linkCategories[c].brands && linkCategories[c].brands.length){

                            linkCategories[c].brands.forEach(function (b) {
                                if(!category.brands){category.brands=[]}
                                if(category.brands.indexOf(brandsForDb[b])<0){
                                    category.brands.push(brandsForDb[b])
                                    if(!categoriesUpdate[category._id]){categoriesUpdate[category._id]={}}
                                    categoriesUpdate[category._id].brands=category.brands;
                                }
                            })
                        }
                        if(linkCategories[c].filters && linkCategories[c].filters.length){
                            linkCategories[c].filters.forEach(function (f) {
                                if(!category.filters){category.filters=[]}
                                if(category.filters.indexOf(filtersForBD[f])<0){
                                    category.filters.push(filtersForBD[f])
                                    if(!categoriesUpdate[category._id]){categoriesUpdate[category._id]={}}
                                    categoriesUpdate[category._id].filters=category.filters;
                                }
                            })
                        }
                    }
                }
            }
            let qtyUpdate=extCatalog.qty,
                nameUpdate=extCatalog.nameUpdate,
                tagsUpdate=extCatalog.tags,
                priceUpdate=extCatalog.price,
                descUpdate=extCatalog.desc,
                artikulUpdate=extCatalog.artikul;


            //*************************************************************
            //******************S T U F F S *******************
            //*************************************************************
            for(let index=0;index<stuffs.length;index++){
                let s=stuffs[index];
                let sortFilter=null;
                if(s.oldprice){
                    let diff = s.oldprice-s.price;
                    s.price =s.oldprice;
                    s.driveSalePrice={type:1,condition:false,sum:diff}
                }else{
                    s.driveSalePrice={type:0,condition:true}
                }
                if(s.sortFilter  && s.groupId){
                    sortFilter= filters.getOFA('name',s.sortFilter)
                    if(!sortFilter){
                        sortFilter= filtersNew.getOFA('name',s.sortFilter)
                    }
                    if(sortFilter){
                        s.stock={}
                        sortFilter.tags.forEach(function (t) {
                            s.stock[t._id]={quantity:0,price:s.price}
                        })
                    }else{
                        s.sortFilter=null;
                        s.stock={notag:{quantity:((Number(s.quantity))?Number(s.quantity):0),price:s.price}}
                    }
                }else{
                    s.stock={notag:{quantity:((Number(s.quantity))?Number(s.quantity):0),price:s.price}} // единица так как если 0 то нет в наличии avaible = false
                }
                if(s.stockFromFile){
                    for(let key in s.stockFromFile){
                        if(s.stock[filterTagsForBD[key]]){
                            s.stock[filterTagsForBD[key]].quantity=(Number(s.stockFromFile[key]))?Number(s.stockFromFile[key]):0;
                        }
                    }
                }
                s.category=[categoriesForBD[s.categoryId]];
                if(s.keywords){
                    let oo={}
                    oo[lang]=s.keywords
                    s.keywords=oo;
                }
                //console.log(s.keywords)
                if(targetBrand){
                    s.brand=targetBrand._id;
                }else{
                    /*todo новый бренды и соответствие*/
                    s.brand= brandsForDb[s.brandName]
                }
                if(s.brandTagName){
                    s.brandTag=brandTagsForBD[s.brandTagName]
                }



                //tags
                let tagsNew=[];
                for(let filterName in s.filters){
                    s.filters[filterName].forEach(function(t){
                        tagsNew.push(filterTagsForBD[t])
                    })
                }
                s.tags=tagsNew;
                s.gallety=[]
                s.store=store._id;
                if(extCatalog.store){s.externalStore=extCatalog.store}
                s.index=index;

                s.idForXML=(s.idForXML<50000)?indexOfCatalog*100000+Number(s.idForXML):Number(s.idForXML);
                let usedStuff  = stuffsFromDB.find(function(el){return el.idForXML==s.idForXML})


                if(!usedStuff){

                    let stuff = new Stuff(s)
                    if(s.groupId){
                        let groupId= indexOfCatalog*100000+Number(s.groupId)
                        let sortsOfStuff=sortsOfStuffNew.getOFA('idForXML',groupId)
                        if(sortsOfStuff){
                            sortsOfStuff.stuffs.push(stuff._id)
                        }else{
                            sortsOfStuff= new SortsOfStuff({store:store._id,filter:(sortFilter&& sortFilter._id)?sortFilter._id:null,stuffs:[stuff._id],idForXML:groupId})
                            sortsOfStuffNew.push(sortsOfStuff)
                        }
                        stuff.sortsOfStuff=sortsOfStuff._id
                    }

                    //gallery
                    if(s.imgs){
                        let gallery=[];
                        photos[stuff._id]=s.imgs;
                        let preffix='/images/'+store.subDomain+'/Stuff/'+stuff._id+'/'
                        s.imgs.forEach(function(img,i){
                            //if(i){return}
                            let photo=img.split('/');
                            photo = photo[photo.length-1]
                            let o={
                                index:i,
                                img:preffix+'img'+photo,
                                thumb:preffix+'thumb'+photo,
                                thumbSmall:preffix+'thumbSmall'+photo,
                            }

                            gallery.push(o)
                        })
                        stuff.gallery= gallery;
                    }
                    delete s.imgs;
                    stuffsNew.push(stuff)
                }else{
                    //console.log(usedStuff.artikul,priceUpdate && qtyUpdate)
                    if(nameUpdate){
                        if(!stuffsUpdate[usedStuff._id]){stuffsUpdate[usedStuff._id]={}}
                        stuffsUpdate[usedStuff._id].name=s.name;
                        stuffsUpdate[usedStuff._id]['nameL']=s.nameL;
                        //stuffsUpdate[usedStuff._id]['nameL.'+lang]=s.name;
                    }
                    if(artikulUpdate){
                        if(!stuffsUpdate[usedStuff._id]){stuffsUpdate[usedStuff._id]={}}
                        stuffsUpdate[usedStuff._id].artikul=s.artikul;
                        //stuffsUpdate[usedStuff._id]['artikulL.'+lang]=s.artikul;
                        stuffsUpdate[usedStuff._id]['artikulL']=s.artikulL;
                    }
                    if(descUpdate){
                        if(!stuffsUpdate[usedStuff._id]){stuffsUpdate[usedStuff._id]={}}
                        stuffsUpdate[usedStuff._id].desc=s.desc;
                        //stuffsUpdate[usedStuff._id]['descL.'+lang]=s.desc;
                        stuffsUpdate[usedStuff._id]['descL']=s.descL;
                    }
                    if(tagsUpdate){
                        if(!stuffsUpdate[usedStuff._id]){stuffsUpdate[usedStuff._id]={}}
                        stuffsUpdate[usedStuff._id].tags=s.tags;
                    }
                    if(priceUpdate && qtyUpdate){
                        if(!stuffsUpdate[usedStuff._id]){stuffsUpdate[usedStuff._id]={}}
                        stuffsUpdate[usedStuff._id].price=s.price;
                        stuffsUpdate[usedStuff._id].driveSalePrice=s.driveSalePrice;
                        stuffsUpdate[usedStuff._id].stock=s.stock;
                    }else if(!priceUpdate && qtyUpdate){
                        if(!stuffsUpdate[usedStuff._id]){stuffsUpdate[usedStuff._id]={}}
                        for(let k in s.stock){
                            // количество оставляем такое же. обновляем только цену
                            if(usedStuff.stock[k]){
                                usedStuff.stock[k].quantity=s.stock[k].quantity
                            }
                            stuffsUpdate[usedStuff._id].stock=usedStuff.stock;
                        }
                    } else if(priceUpdate){
                        if(!stuffsUpdate[usedStuff._id]){stuffsUpdate[usedStuff._id]={}}
                        stuffsUpdate[usedStuff._id].price=s.price;
                        stuffsUpdate[usedStuff._id].driveSalePrice=s.driveSalePrice;
                        for(let k in s.stock){
                            // количество оставляем такое же. обновляем только цену
                            s.stock[k].quantity=usedStuff.stock[k].quantity
                        }
                        stuffsUpdate[usedStuff._id].stock=s.stock;
                    }

                    if(extCatalogId && extCatalogId!=usedStuff.extCatalog){
                        if(!stuffsUpdate[usedStuff._id]){stuffsUpdate[usedStuff._id]={}}
                        usedStuff.extCatalog=extCatalogId
                        stuffsUpdate[usedStuff._id].extCatalog=usedStuff.extCatalog

                    }
                    //console.log(s.actived)
                    if(s.actived!=usedStuff.actived){
                        if(!stuffsUpdate[usedStuff._id]){stuffsUpdate[usedStuff._id]={}}
                        usedStuff.actived=s.actived;
                        stuffsUpdate[usedStuff._id].actived=usedStuff.actived;
                    }
                }
            }
            // если товара нет в файле для загрузке мы никак не отрабатываем эту ситуацию
            /*stuffsFromDB.forEach(function (s,index) {
                if(!s.used){
                    if(!stuffsUpdate[s._id]){stuffsUpdate[s._id]={}}
                    stuffsUpdate[s._id].actived=false;
                }
            })*/
            if(!extCatalog.confirm && res){
                let o={
                    newCategories:categoriesNew.length,
                    newFilters:filtersNew.length,
                    newFilterTags:filterTagsNew.length,
                    newBrands:brandsNew.length,
                    newBrandTags:brandTagsNew.length,
                    newStuffs:stuffsNew.length,
                    newSorts:sortsOfStuffNew.length,
                    updateStuffs:Object.keys(stuffsUpdate).length,
                }
                return res.json(o)
            }
            return;

        })
        // полуыение URL для новых объектов
        .then(function(){
            if(!extCatalog.confirm){return}
            return forEach(stuffsNew, function * (stuff, idx) {
                stuff.url = yield getUrl.create(Stuff,store._id,stuff.name+' '+stuff.artikul)
            })
        })
        .then(function(){
            if(!extCatalog.confirm){return}
            return forEach(categoriesNew, function * (item, idx) {
                item.url = yield getUrl.create(Category,store._id,item.name)
            })
        })
        .then(function(){
            if(!extCatalog.confirm){return}
            return forEach(groupsNew, function * (item, idx) {
                item.url = yield getUrl.create(Group,store._id,item.name)
            })
        })
        .then(function(){
            if(!extCatalog.confirm){return}
            return forEach(filtersNew, function * (item, idx) {
                item.url = yield getUrl.create(Filter,store._id,item.name)
            })
        })
        .then(function(){
            if(!extCatalog.confirm){return}
            return forEach(brandTagsNew, function * (item, idx) {
                item.url = yield getUrl.create(BrandTags,store._id,item.name)
            })
        })
        .then(function(){
            if(!extCatalog.confirm){return}
            return forEach(brandsNew, function * (item, idx) {
                item.url = yield getUrl.create(Brand,store._id,item.name)
            })
        })
        .then(function(){

            if(!extCatalog.confirm){return}
            return forEach(filterTagsNew, function * (item, idx) {
                item.url = yield getUrl.create(FilterTags,store._id,item.name)
            })
        })
        //загрузка фотографий
        .then(function(){
            if(!extCatalog.confirm){return }
            //throw  'finish';
            return uploadPhotos(photos,store.subDomain,photoHost,backUrl,extCatalog.smallPhoto)
        })
        // запись и обновление БД
        .then(function(){
            if(!extCatalog.confirm){return }
            console.log('saving in db new data')
            let acts=[];
            console.log('categoriesNew ',categoriesNew.length)
            acts.push(getPromiseForSaveInDB(categoriesNew))
            console.log('groupsNew ',groupsNew.length)
            acts.push(getPromiseForSaveInDB(groupsNew))
            console.log('filtersNew ',filtersNew.length)
            acts.push(getPromiseForSaveInDB(filtersNew))
            console.log('brandTagsNew ',brandTagsNew.length)
            acts.push(getPromiseForSaveInDB(brandTagsNew))
            console.log('brandsNew ',brandsNew.length)
            acts.push(getPromiseForSaveInDB(brandsNew))
            console.log('filterTagsNew ',filterTagsNew.length)
            acts.push(getPromiseForSaveInDB(filterTagsNew))
            console.log('stuffsNew ',stuffsNew.length)
            acts.push(getPromiseForSaveInDB(stuffsNew))
            console.log('sortsOfStuffNew ',sortsOfStuffNew.length)
            acts.push(getPromiseForSaveInDB(sortsOfStuffNew))
            return Promise.all(acts)

        })
        .then(function(){
            if(!extCatalog.confirm){return }
            console.log('update objects')
            let acts=[];
            acts.push(getPromiseForUpdateInDB(categoriesUpdate,Category))
            acts.push(getPromiseForUpdateInDB(groupUpdate,Group))
            acts.push(getPromiseForUpdateInDB(filtersUpdate,Filter))
            acts.push(getPromiseForUpdateInDB(brandTagsUpdate,BrandTags))
            acts.push(getPromiseForUpdateInDB(brandsUpdate,Brand))
            acts.push(getPromiseForUpdateInDB(filterTagsUpdate,FilterTags))
            acts.push(getPromiseForUpdateInDB(sortsOfStuffUpdate,SortsOfStuff))
            acts.push(getPromiseForUpdateInDB(stuffsUpdate,Stuff))
            return Promise.all(acts)

        })
        .then(function(){
            if(!extCatalog.confirm){return}else{
                if(stuffsNew.length){
                    stringToFile +="new products - "+stuffsNew.length+"\r"
                }
                if(Object.keys(stuffsUpdate).length){
                    stringToFile +="updated products - "+Object.keys(stuffsUpdate).length+"\r"
                }
                if(categoriesNew.length){
                    stringToFile +="new categories - "+categoriesNew.length+"\r"
                }
                if(brandsNew.length){
                    stringToFile +="new brands - "+brandsNew.length+"\r"
                }
                if(brandTagsNew.length){
                    stringToFile +="new collection in brands - "+brandTagsNew.length+"\r"
                }
                if(filtersNew.length){
                    stringToFile +="new groups of attributes - "+filtersNew.length+"\r"
                }
                if(filterTagsNew.length){
                    stringToFile +="new attributes - "+filterTagsNew.length+"\r"
                }
                if(sortsOfStuffNew.length){
                    stringToFile +="new group of products - "+sortsOfStuffNew.length+"\r"
                }

                myUtil.saveInLogFile(typeLog,stringToFile)
                console.log('everyThing is done')
            }

        })
        .then(function(){
            //console.log('first check')
            if(!extCatalog.confirm){return}
            /* новая фича еще не тестилась*/
            //return setLinkForNewStuffs(stuffsNew,store._id)

        })
        .catch(function (err) {
            console.log('err',err)
            if(!extCatalog.confirm && res){return res.json({err:err})}else{
                stringToFile += "error - "+err+"\r";
                myUtil.saveInLogFile(typeLog,stringToFile)
            }

            // write to log file
        })



    function getworkbookXLSXfromFile(filePath) {
        var workbook = new Excel.Workbook();
        return workbook.xlsx.readFile(filePath)
    }
    function getXMLDataFromFile(filePath) {
        return myUtil.readFilePromise(filePath).then(function(data){
            var parser = new xml2js.Parser({cdata:true});
            return new Promise(function (rs,rj) {
                parser.parseString(data, function (err, result) {
                    //console.log('err parseString',err)
                    if(result){
                        rs(result)
                    }else{
                        rs(null)
                    }
                    //console.log('Done');
                });

            })
        })
    }
    function parseXLSX(workbook) {
        return new Promise(function (rs,rj) {
            let stuffs=[];
            console.log('parseXLSX')
            // use workbook
            //let myFormat = true//null;//'myFormat';
            workbook.eachSheet(function(worksheet, sheetId) {
                if(sheetId==1){
                    worksheet.eachRow(function(row, rowNumber) {
                        if(rowNumber==1){return}
                        //let stuff = handleRow(row.values,myFormat,rowNumber,worksheet.actualRowCount);
                        let stuff = handleRow(row.values,rowNumber,worksheet.actualRowCount);
                        stuffs.push(stuff)
                    })
                }
            });

            let ss=joinGroup(stuffs)
            //console.log(categoriesFromFile)
            //console.log(brandTagsFromFile)

            rs(ss)
        })
    }
    function setFiltersFromFile(s){
        if(s.filters){
            for(let key in s.filters){
                if(!filtersFromFile[key]){filtersFromFile[key]=[]}
                filtersFromFile[key]=Array.from(new Set( filtersFromFile[key].concat(s.filters[key]) ));
            }
        }
        if(s.brandName){
            if(brandsFromFile.indexOf(s.brandName)<0){
                brandsFromFile.push(s.brandName)
            }
            if(s.brandTagName){
                if(!brandTagsFromFile[s.brandName]){brandTagsFromFile[s.brandName]=[];}
                if(brandTagsFromFile[s.brandName].indexOf(s.brandTagName)<0){
                    brandTagsFromFile[s.brandName].push(s.brandTagName)
                }
            }
        }
    }
    function handleRow(v,idx,rowCount){
        let s;
        s={
            name:v[2],
            arikul:'',
            desc:v[4],
            price:v[6],
            currency:v[7],
            unitOfMesure:v[8],
            imgs:v[12].split(','),
            /* todo проверить когжа несколько фото с прома*/
            actived:(v[13]=='+')?true:false,
            qty:v[14],
            categoryId:v[15],
            categoryName:v[16],
            id:v[21],
            brandName:v[25],
            groupId:v[29],
            filters:{},
            index:rowCount-idx,
            sortFilter:(v[30] && v[29])?v[30]:null,
        }
        if(!linkCategories[s.categoryId]){linkCategories[s.categoryId]={brands:[],filters:[]}}
        for(let i= 30;i<58;i=i+3){
            if(!v[i]){continue}
            if(!s.filters[v[i]]){s.filters[v[i]]=[]}
            s.filters[v[i]].push(v[i+2])
            if(linkCategories[s.categoryId].filters.indexOf(v[i])<0){
                linkCategories[s.categoryId].filters.push(v[i])
            }
        }
        if(s.brandName && linkCategories[s.categoryId].brands.indexOf(s.brandName)<0){
            linkCategories[s.categoryId].brands.push(s.brandName)
        }

        return s;
    }
    function parseXML(data) {
        //console.log('data',data)
        return new Promise(function (rs,rj) {

            if(!data || !data.yml_catalog || !data.yml_catalog.shop || !data.yml_catalog.shop.length || !data.yml_catalog.shop[0].offers){
                rj('unknown data format')
            }
            //console.log('categoriesFromFile befor ',categoriesFromFile)
            categoriesFromFile=handleCategoriesFromFile(data.yml_catalog.shop[0].categories)
            //console.log('categoriesFromFile',categoriesFromFile)
            let offers = data.yml_catalog.shop[0].offers;
            let stuffs=[];
            offers[0].offer.forEach(function(offer,i) {
                let stuff = handleOffer(offer,i,offers.length,categoriesFromFile);
                stuffs.push(stuff)
            });
            let ss = joinGroup(stuffs)


            //console.log(filtersFromFile)
            //console.log('categoriesFromFile',categoriesFromFile)
            rs(ss)
        })
    }
    function joinGroup(stuffs){
        let ss = [];
        for(let i=0;i<stuffs.length;i++){
            if(!stuffs[i].groupId){
                setFiltersFromFile(stuffs[i])
                //stuffs[i].sortFilter=null;
                ss.push(stuffs[i])
            }else{
                let ssGroup=[stuffs[i]];
                for(let ii=i+1;ii<stuffs.length;ii++){
                    if(stuffs[ii].groupId ==stuffs[i].groupId && stuffs[ii].name ==stuffs[i].name && stuffs[ii].artikul ==stuffs[i].artikul){
                        ssGroup.push(stuffs.splice(ii,1)[0])
                        ii--
                    }
                }
                let s = stuffs[i];
                s.sortFilter=null;
                if(ssGroup.length>1){
                    s =ssGroup.reduce(function(o,item){
                        if(!o){o=item}else{
                            if(!o.sortFilter){
                                o.sortFilter=item.sortFilter
                            }
                            //let keys=Objects.keys(item.filters)
                            for(let key in item.filters){
                                if(!o.filters[key]){
                                    o.filters[key]=item.filters[key]
                                }else{
                                    o.filters[key]=  Array.from(new Set( o.filters[key].concat(item.filters[key]) ));
                                }
                            }
                            // оболочку группы пропустили и начали с первого елемента
                            if(!o.stockFromFile){o.stockFromFile={}}
                            if(item.sortFilter && item.filters[item.sortFilter] && item.filters[item.sortFilter].length){
                                // первый параметр является тегом разновидности
                                o.stockFromFile[item.filters[item.sortFilter][0]]=Number(item.quantity);
                            }
                            /*if(o.artikul=='BLIK малиновое'){
                             console.log(o.filters[o.sortFilter][0])
                             }*/
                        }
                        return o;
                    },null)
                }


                /*if(s.artikul=='BLIK малиновое'){
                 console.log(s.stockFromFile)
                 console.log(s.filters)
                 }*/

                setFiltersFromFile(s)
                ss.push(s)
            }
        }
        ss.sort(function (a,b) {
            return a.index-b.index
        })
        return ss;
    }
    function handleCategoriesFromFile(data) {
        if(data && data[0] && data[0].category && data[0].category.length){
            let catalog={};
            let groupsFromFile = [];
            let addRate =indexOfCatalog*100000
            data[0].category.forEach(function (c) {
                catalog[c.$.id]={name:c._,idForXML:c.$.id};
                if(c.$.parentId){
                    catalog[c.$.id].parentId=c.$.parentId;
                    if(groupsFromFile.indexOf(c.$.parentId)<0){
                        groupsFromFile.push(c.$.parentId)
                    }
                }
            })
            // формируем дерево в один проход
            for(let idForXML in catalog){
                if(catalog[idForXML].parentId){
                    // если у группы есть  родительский  раздел
                    if(groupsFromFile.indexOf(idForXML)<0){
                        // если группа не является разделом то помещаем ее в категории родителя
                        if(!catalog[catalog[idForXML].parentId].categories){
                            catalog[catalog[idForXML].parentId].categories=[]
                        }
                        catalog[catalog[idForXML].parentId].categories.push(catalog[idForXML])
                        catalog[idForXML].used=true
                    }else{
                        // если группа является разделом то помещаем ее в подразделы родителя
                        if(!catalog[catalog[idForXML].parentId].child){
                            catalog[catalog[idForXML].parentId].child=[]
                        }
                        catalog[catalog[idForXML].parentId].child.push(catalog[idForXML])
                        catalog[idForXML].used=true;
                    }
                }

            }

            //*******************************************************************************************
            let stringCatalog=[]
            for(let idForXML in catalog){
                if(!catalog[idForXML].used){
                    stringCatalog.push(catalog[idForXML])
                }
            }
            //fs.writeFile('./public/cataloggazfirst.json',JSON.stringify(stringCatalog, null, ' '))
            //*******************************************************************************************

            let categoryToChild={}
            // сдвиг категорий второго уровня вложения на их родительский раздел
            for(let idForXML in catalog){
                if(catalog[idForXML].used){
                    delete catalog[idForXML]
                }else{
                    if(catalog[idForXML].child){
                        catalog[idForXML].child.forEach(function (ch) {
                            if(ch.child){
                                ch.child.forEach(function (ch2) {
                                    if(!ch.categories){ch.categories=[]}
                                    ch.categories.push(ch2)
                                    if(ch2.categories){
                                        ch2.categories.forEach(function(c){categoryToChild[c.idForXML]=ch2.idForXML})
                                        ch2.categories=null;
                                    }
                                    if(ch2.child){
                                        ch2.child.forEach(function (ch3) {
                                            if(ch3.categories){
                                                ch3.categories.forEach(function(c){categoryToChild[c.idForXML]=ch2.idForXML})
                                                ch3.categories=null;
                                            }
                                            if(ch3.child){
                                                ch3.child.forEach(function (ch4) {
                                                    if(ch4.categories){
                                                        ch4.categories.forEach(function(c){categoryToChild[c.idForXML]=ch2.idForXML})
                                                        ch4.categories=null;
                                                    }
                                                })
                                            }
                                            ch3.child=null;
                                        })
                                        ch2.child=null;
                                    }
                                })
                            }
                        })
                    }
                }
            }
            //fs.writeFile('./public/cataloggaz.json',JSON.stringify(catalog, null, ' '))

            // создаем каталог
            //console.log(catalog)
            for(let idForXML in catalog){
                //console.log(catalog[idForXML])
                if(!catalog[idForXML].categories && !catalog[idForXML].child){
                    //console.log('это категория в targetGroup');
                    let idForXMLNew =  (idForXML<1000)?addRate+Number(idForXML):idForXML;
                    let c = targetGroup.categories.find(function(cc){return cc.idForXML==idForXMLNew || cc.name.toLowerCase()==catalog[idForXML].name.toLowerCase()});
                    //console.log(c)
                    if(!c){
                        let newC = new Category({name:catalog[idForXML].name,store:store._id,index:1,group:targetGroup._id,idForXML:idForXMLNew})
                        categoriesNew.push(newC)
                        c=newC.toObject();
                        targetGroup.categories.push(c);
                        if(!groupUpdate[targetGroup._id]){groupUpdate[targetGroup._id]={}}
                        groupUpdate[targetGroup._id]['categories']=targetGroup.categories.map(function(cat){return cat._id});
                    }
                    categoriesForBD[idForXML]=c._id;
                }else if(catalog[idForXML].categories && !catalog[idForXML].child){
                    // группа с категориями переходит в targetGroup
                    let idForXMLNew =  (idForXML<1000)?addRate+Number(idForXML):idForXML;
                    let g = groupsFromDB.find(function(gg){return gg.idForXML==idForXMLNew || gg.name==catalog[idForXML].name});
                    if(!g){
                        let newG = new Group({name:catalog[idForXML].name,store:store._id,index:1,idForXML:idForXMLNew,level:1,parent:targetGroup._id})
                        groupsNew.push(newG)
                        g= newG.toObject();
                        targetGroup.child.push(g);
                        if(!groupUpdate[targetGroup._id]){groupUpdate[targetGroup._id]={}}
                        groupUpdate[targetGroup._id]['child']=targetGroup.child.map(function(ch){return ch._id});
                    }
                    //console.log('это категории в targetGroup child',catalog[idForXML],g);
                    catalog[idForXML].categories.forEach(function(category){
                        let idForXMLNew =  (category.idForXML<1000)?addRate+Number(category.idForXML):category.idForXML;
                        let c = g.categories.find(function(cc){return cc.idForXML==idForXMLNew || cc.name==category.name});
                        if(!c){
                            let newC = new Category({name:category.name,store:store._id,index:1,group:g._id,idForXML:idForXMLNew})
                            categoriesNew.push(newC)
                            c=newC.toObject();
                            g.categories.push(c);
                            if(!groupUpdate[g._id]){groupUpdate[g._id]={}}
                            groupUpdate[g._id]['categories']=g.categories.map(function(cat){return cat._id});
                        }
                        categoriesForBD[category.idForXML]=c._id;
                    })
                }else if(catalog[idForXML].child){
                   // есть подразделы . делаем эту секцию корневой
                    let idForXMLNew =  (idForXML<1000)?addRate+Number(idForXML):idForXML;
                    let section = groups.find(function(gg){return gg.idForXML==idForXMLNew && !gg.level});
                    if(!section){
                        let sectionN = new Group({name:catalog[idForXML].name,store:store._id,index:1,idForXML:idForXMLNew,level:0,parent:null})
                        groupsNew.push(sectionN)
                        section= sectionN.toObject();
                        groups.push(section)
                    }
                    if(catalog[idForXML].categories){
                        catalog[idForXML].categories.forEach(function(category){
                            let idForXMLNew =  (category.idForXML<1000)?addRate+Number(category.idForXML):category.idForXML;
                            let c = section.categories.find(function(cc){return cc.idForXML==idForXMLNew});
                            if(!c){
                                let newC  = new Category({name:category.name,store:store._id,index:1,group:section._id,idForXML:idForXMLNew})
                                categoriesNew.push(newC)
                                c=newC.toObject();
                                section.categories.push(c);
                                if(!groupUpdate[section._id]){groupUpdate[section._id]={}}
                                groupUpdate[section._id]['categories']=section.categories.map(function(cat){return cat._id});
                            }
                            categoriesForBD[category.idForXML]=c._id;
                        })
                    }
                    catalog[idForXML].child.forEach(function(ch){
                        let idForXMLNew =  (ch.idForXML<1000)?addRate+Number(ch.idForXML):ch.idForXML;
                        let g = groupsFromDB.find(function(gg){return gg.idForXML==idForXMLNew});
                        if(!g){
                            let newG = new Group({name:ch.name,store:store._id,index:1,idForXML:idForXMLNew,level:1,parent:section._id})
                            groupsNew.push(newG)
                            g= newG.toObject()
                            section.child.push(g);
                            if(!groupUpdate[section._id]){groupUpdate[section._id]={}}
                            groupUpdate[section._id]['child']=section.child.map(function(ch){return ch._id});
                        }
                        if(ch.categories){
                            ch.categories.forEach(function(category){
                                let idForXMLNew =  (category.idForXML<1000)?addRate+Number(category.idForXML):category.idForXML;
                                let c = g.categories.find(function(cc){return cc.idForXML==idForXMLNew});
                                if(!c){
                                    let newC = new Category({name:category.name,store:store._id,index:1,group:g._id,idForXML:idForXMLNew})
                                    categoriesNew.push(newC)
                                    c=newC.toObject();
                                    g.categories.push(c);
                                    if(!groupUpdate[g._id]){groupUpdate[g._id]={}}
                                    groupUpdate[g._id]['categories']=g.categories.map(function(cat){return cat._id});
                                }
                                categoriesForBD[category.idForXML]=c._id;
                            })
                        }
                    })
                }
            }
            // переприсваивание категориям ссылок на их разделы, ставшие категориями в процессе оптимизации каталога
            for(let k in categoryToChild){
                if(categoriesForBD[categoryToChild[k]]){
                    categoriesForBD[k]=categoriesForBD[categoryToChild[k]]
                    //console.log('yes')
                }
            }
            //console.log(catalog['7293631'].child[0])
            //console.log(categoryToChild)
            //console.log(categoriesForBD)
            //console.log(groupsNew)
            //console.log(groupUpdate)
            //console.log(groups)
            /*fs.writeFile('./public/groupsUpdate.json',JSON.stringify(groupUpdate, null, '   '))
            fs.writeFile('./public/groups.json',JSON.stringify(groups, null, '   '))*/
            return catalog;
        }
    }
    function handleOffer(o,i,offersCount) {
        let s;
        //console.log(o)
        s={
            name:(o.name)?o.name[0]:'',
            artikul:(o.vendorCode)?o.vendorCode[0]:'',
            desc:o.description[0],
            price:(o.price)?o.price[0]:0,
            oldprice:(o.oldprice)?o.oldprice[0]:null,
            currency:o.currencyId[0],
            unitOfMesure:'',
            imgs:(o.picture)?o.picture:null,
            /* todo проверить когжа несколько фото с прома*/
            actived:o.$. available,
            quantity:(o.quantity)?o.quantity[0]:0,
            categoryId:o.categoryId[0],
            //categoryName:categoriesFromFile[o.categoryId[0]],
            idForXML:o.$.id,
            brandName:(o.vendor)?o.vendor[0]:null,
            brandTagName:(o.collection)?o.collection[0]:null,
            keywords:(o.keywords)?o.keywords[0]:null,
            groupId:(o.$.group_id)?o.$.group_id:null,
            filters:{},
            index:offersCount-i,
            sortFilter:null,
            typePrefix:(o.typePrefix)?o.typePrefix[0]:null
        }

        if(!linkCategories[s.categoryId]){linkCategories[s.categoryId]={brands:[],filters:[]}}
        if(!s.name && s.typePrefix){s.name=s.typePrefix+' '+((s.brandName)?s.brandName:'')+' '+((s.model)?s.model:'')}
        if(o.param && o.param.length){
            o.param.forEach(function(p,i){
                if(!i){
                    s.sortFilter=p.$.name
                }
                if(!s.filters[p.$.name]){s.filters[p.$.name]=[]}
                s.filters[p.$.name].push(p._+'$$$'+p.$.name)


                if(linkCategories[s.categoryId].filters.indexOf(p.$.name)<0){
                    linkCategories[s.categoryId].filters.push(p.$.name)
                }
            })
        }

        if(s.brandName && linkCategories[s.categoryId].brands.indexOf(s.brandName)<0){
            linkCategories[s.categoryId].brands.push(s.brandName)
        }



        //console.log(s.groupId)
        return s;

    }
    function getCategoryFromGroups(groups,id) {
        if(id && id.toString){
            id=id.toString()
        }
        //console.log(id)
        for(let i=0;i<groups.length;i++){
            let g = groups[i];
            for(let j=0;j<g.categories.length;j++){
                //console.log(g.categories[j].toString(),id)
                if(g.categories[j]._id.toString()==id){
                    return g.categories[j]
                }
            }
            for(let j=0;j<g.child.length;j++){
                let ch = g.child[j]
                //console.log(ch)
                if(ch.categories){
                    for(let jj=0;jj<ch.categories.length;jj++){
                        if(ch.categories[jj]._id.toString()==id){
                            return ch.categories[jj]
                        }
                    }
                }

            }
        }

    }


}

function setLinkForNewStuffs(stuffs,store) {
    var groups=[];
    var caregories=[];
    var caregoriesO={};
    return Promise.resolve()
        .then(function () {
            return new Promise(function (rs,rj) {
                let options={req:{store:{lang:'ru'}},criteria:{store:store}}
                Group.list(options,function(err,res){
                    rs(res)
                })
            })
        })
        .then(function (sections) {
            sections.forEach(function(section){
                if(section.categories && section.categories.length){
                    section.categories.forEach(function(c){
                        c.groupUrl=section.url
                        caregoriesO[c._id.toString()]=c;
                    })
                }
                if(section.child && section.child.length){
                    section.child.forEach(function(subSection){
                        if(subSection.categories && subSection.categories.length){
                            subSection.categories.forEach(function(c){
                                c.groupUrl=subSection.url;
                                caregoriesO[c._id.toString()]=c;
                            })
                        }
                    })
                }
            })

        })
        .then(async function () {

        })

}


exports.downLoadExternalCatalog=function(req,res,next){
    let extCatalog=req.body;
    let store = req.store;
    uploadCatalog(extCatalog,store,req.file,res,next)
}



/*exports.photoUploadResults=function(req,res,next){
    console.log(req.body)
    console.log(req.params)
}*/
init()
let taskList={}
function init(){


    let d = new Date()
    console.log('init schedule',d.toISOString())
    let timezoneOffset=Math.ceil(d.getTimezoneOffset()/60);
    console.log(timezoneOffset)
    ExternalCatalog.find().lean().exec(function (err,items) {
        //console.log(items)
        items.forEach(function(item){
            if(!item.autoUpdate){return}
            //console.log(item.link,item.period);
            item.confirm=true;
            storeAPI.getStoreById(item.store,function (err,store) {
                //console.log(err)
                if(store && store._id){
                    let taskSchedule = new schedule.RecurrenceRule();
                    if(item.period){
                        //let timeDiff=
                        switch(item.period){
                            case 'everyMon10':taskSchedule.dayOfWeek=1;taskSchedule.hour=10+timezoneOffset; break;
                            case 'everyMon12':taskSchedule.dayOfWeek=1;taskSchedule.hour=12+timezoneOffset;break;
                            case 'everyFri10':taskSchedule.dayOfWeek=5;taskSchedule.hour=10+timezoneOffset; break;
                            case 'everyFri12':taskSchedule.dayOfWeek=5;taskSchedule.hour=12+timezoneOffset;break;
                            case 'everyDay10':taskSchedule.hour=10+timezoneOffset;break;
                            case 'everyDay12':taskSchedule.hour=12+timezoneOffset;break;
                            case 'everyDay101418':taskSchedule.hour=[10+timezoneOffset,14+timezoneOffset,18+timezoneOffset];break;
                            default:taskSchedule.dayOfWeek=1;taskSchedule.hour=10+timezoneOffset;break
                        }
                        taskSchedule.minute=0;
                        /*taskSchedule.dayOfWeek=[0,1,2,3,4,5,6]
                        taskSchedule.hour=[10,11,12,13,14,15,16,17,18,19,20];
                        taskSchedule.minute=[0,1,3,4,16,18,20,24,28,30,31,33,36,40,41,42,43,45,46,50]
                        console.log(taskSchedule.minute,taskSchedule.hour)*/
                        taskList[item._id.toString()]=schedule.scheduleJob(taskSchedule,function(){
                            console.log(item)
                            uploadCatalog(item,store)
                        });

                    }
                }

            })
        })
    })
}


exports.changeTaskSchedule=function(req,res,next){
    if(req.body &&  req.body._id){
        let d = new Date()
        let timezoneOffset=Math.ceil(d.getTimezoneOffset()/60);
        console.log(timezoneOffset)

        let item =req.body;
        let store = req.store;
        item.confirm=true;
        if(taskList[item._id]){
            console.log('cancel  Schedule')
            taskList[item._id].cancel();
        }

        let taskSchedule = new schedule.RecurrenceRule();

        if(item.period){
            //console.log(item.period)
            switch(item.period){
                case 'everyMon10':taskSchedule.dayOfWeek=1;taskSchedule.hour=10+timezoneOffset; break;
                case 'everyMon12':taskSchedule.dayOfWeek=1;taskSchedule.hour=12+timezoneOffset;break;
                case 'everyFri10':taskSchedule.dayOfWeek=5;taskSchedule.hour=10+timezoneOffset; break;
                case 'everyFri12':taskSchedule.dayOfWeek=5;taskSchedule.hour=12+timezoneOffset;break;
                case 'everyDay10':taskSchedule.hour=10+timezoneOffset;break;
                case 'everyDay12':taskSchedule.hour=12+timezoneOffset;break;
                case 'everyDay101418':taskSchedule.hour=[10+timezoneOffset,14+timezoneOffset,18+timezoneOffset];break;
                default:taskSchedule.dayOfWeek=1;taskSchedule.hour=10+timezoneOffset;break
            }
            try{
                //taskSchedule.minute=[25,26,27,28,29,30]
                taskSchedule.minute=0;
                console.log(taskSchedule.minute,taskSchedule.hour)
                console.log(taskSchedule.dayOfWeek)
                taskList[item._id]=schedule.scheduleJob(taskSchedule,function(){
                    console.log('change Schedule ',item.period)
                    uploadCatalog(item,store)
                });
            }catch(err){
                console.log(err)
            }

        }

        res.json({msg:'OK'})
    }else{
        let error = new Error('external catalog is empty');
        next(error)
    }
}


