'use strict';
var StuffClass=require('../../public/scripts/stuffClass.js')

var getUrl = require('./getUniqueUrl.js')
var myUtil=require('./myUtil.js');
const util = require('util')
var Excel = require('exceljs');
var allDataIndex=require('./getAllData.js')
var uploadCatalog=require('./api/uploadCatalog.js')
var downloadCatalog=require('./api/downloadCatalog.js')
var alignmentIndex=require('./api/alignmentIndex.js')
var fixedDB=require('./api/fixedDB.js')
var reNewKeyWords=require('./api/reNewKeyWords.js')

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//var domain = require('domain');
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
var Label=mongoose.model('Label');


var Stuff=mongoose.model('Stuff');
var News=mongoose.model('News');
var Filter=mongoose.model('Filter');
var FilterTags=mongoose.model('FilterTags');
var Info=mongoose.model('Info');

var zlib = require('zlib');


fs.mkdirParent = function(dirPath, callback) {
    //Call the standard fs.mkdir
    fs.mkdir(dirPath, function(error) {
        //When it fail in this way, do the custom steps

        if (error ) { //&& error.errno === 34
            //Create all the parents recursively

            fs.mkdirParent(path.dirname(dirPath), callback);
            //And then the directory
            fs.mkdirParent(dirPath, callback);
        } else {
            //Manually run the callback since we used our own callback to do all these
            callback && callback(error);
        }
    });
};

function getFilters(q) {
    return new Promise(function(resolve,reject){
        Filter.find(q).sort({'index': 1}).select('name').exec(function(err,res){
            //console.log(res)
            if(err){return reject(err)}
            return resolve(res.map(function(f){
                f=f.toObject();
                if(typeof f._id=="object"){
                    f._id=f._id.toString()
                }
                return f;
            }))
        })
    })
}
function getFilterTags(q) {
    return new Promise(function(resolve,reject){
        FilterTags.find(q).select('name filter').exec(function(err,res){
            if(err){return reject(err)}
            return resolve(res.map(function(ft){
                ft= ft.toObject()
                if(typeof ft.filter=='object'){
                    ft.filter=ft.filter.toString();
                }
                return ft;
            }))
        })
    })
}
function createArchImages(){

}



exports.createSitemap=function(req,res,next){
    var content='';
    var domain=req.store.link;
    var sections;
    var categories=[];
    var fileName=path.join(__dirname, '../../public', req.store.subDomain+'.xml');
    function getXMLBlock(url){
        var c ="\t"+"<url>"+"\n";
        c +="\t\t"+"<loc>"+url+"</loc>"+"\n";
        c +="\t\t"+"<changefreq>weekly</changefreq>"+"\n"+"\t\t"+"<priority>1.0</priority>"+"\n"+"\t"+"</url>"+"\n";
        return c;
    }
    Promise.resolve()
        .then(function(){
            content='<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+"\n";
            content +="\t"+"<url>"+"\n";
            content +="\t\t"+"<loc>"+domain+"</loc>"+"\n";
            content +="\t\t"+"<changefreq>weekly</changefreq>"+"\n"+"\t\t"+"<priority>1.0</priority>"+"\n"+"\t"+"</url>"+"\n";
            content +="\t"+"<url>"+"\n";
            content +="\t\t"+"<loc>"+domain+"/home</loc>\n";
            content +="\t\t"+"<changefreq>weekly</changefreq>"+"\n"+"\t\t"+"<priority>1.0</priority>"+"\n"+"\t"+"</url>"+"\n";
            /*return new Promise(function(resolve,reject){
                //console.log(content)
                fs.writeFile(fileName , content, {encoding: 'utf8'}, function(err){
                    if(err) {
                        throw err;
                    } else {
                        resolve()
                    }
                });
            })*/
        })

        .then(function(){
            return new Promise(function(resolve,reject){
                Group.list({criteria:{store:req.store._id},perPage:100,page:0,req:req},function(err,sections){
                    if(err){reject(err)}
                    resolve(sections);
                })
            })

        })
        .then(function(ss){
            sections=ss;
            //console.log(sections)
            sections.forEach(function(section){
                var url= domain+'/'+section.url+'/category';
                content +=getXMLBlock(url)
                if(section.categories && section.categories.length){
                    section.categories.forEach(function(category){
                        var url= domain+'/'+section.url+'/'+category.url;
                        content +=getXMLBlock(url)
                        category.section={url:section.url}
                    })
                    categories.push.apply(categories,section.categories)
                }

                if(section.child && section.child.length){
                    section.child.forEach(function(subSection){
                        var url= domain+'/'+section.url
                            +'/category?parentGroup='+subSection.url//+'&categoryList=allCategories';
                        content +=getXMLBlock(url)
                        if(subSection.categories && subSection.categories.length){
                            subSection.categories.forEach(function(category,i){

                                category.section={url:section.url}
                                var url= domain+'/'+section.url+'/'+category.url+'?parentGroup='+subSection.url;
                                content +=getXMLBlock(url)
                            })
                            categories.push.apply(categories,subSection.categories)
                        }
                    })
                }
                
            })
            categories.forEach(function(c){
                if(typeof c._id =='object'){
                    c._id=c._id.toString();
                }
               // console.log(typeof c._id);
            })
        })
        .then(function(){
            return new Promise(function(resolve,reject){
                Stat.find({store:req.store._id},function(err,stats){
                    if(err){reject(err)}
                    resolve(stats);
                })
            })

        })
        .then(function(stats){
            stats.forEach(function(stat){
                var url= domain+'/staticPage/'+stat.url;
                content +=getXMLBlock(url)
            })
        })
        .then(function(){
            console.log('stuff')
            return new Promise(function(resolve,reject){
                Stuff.find({store:req.store._id,actived:true},function(err,stuffs){
                    if(err){reject(err)}
                    resolve(stuffs);
                })
            })

        })
        .then(function(stuffs){
            //console.log(categories)
            stuffs.forEach(function(stuff){
                var sectionUrl="group"
                var categoryUrl="category"

                var category=categories.getOFA('_id',stuff.category.toString());
                //console.log(stuff.category,category)
                if(category){
                    sectionUrl=category.section.url;
                    categoryUrl=category.url;
                }
                var url= domain+'/'+sectionUrl+'/'+categoryUrl+'/'+stuff.url;
                content +=getXMLBlock(url)
            })
        })
        .then(function(){
            var url= domain+'/lookbook';
            content +=getXMLBlock(url)
            var url= domain+'/info';
            content +=getXMLBlock(url)
            return new Promise(function(resolve,reject){
                Info.find({store:req.store._id},function(err,items){
                    if(err){reject(err)}
                    resolve(items);
                })
            })

        })
        .then(function(info){
            info.forEach(function(n){
                var url= domain+'/info'+'/'+n.url;
                content +=getXMLBlock(url)
            })
        })
        .then(function(){
            var url= domain+'/news';
            content +=getXMLBlock(url)
            return new Promise(function(resolve,reject){
                News.find({store:req.store._id,actived:true},function(err,news){
                    if(err){reject(err)}
                    resolve(news);
                })
            })

        })
        .then(function(news){
            news.forEach(function(n){
                var url= domain+'/news'+'/'+n.url;
                content +=getXMLBlock(url)
            })
        })

        .then(function(){
            content +="</urlset>";
        })
        .then(function(){
            return new Promise(function(resolve,reject){
                //console.log(content)
                fs.writeFile(fileName , content, {encoding: 'utf8'}, function(err){
                    if(err) {
                        throw err;
                    } else {
                        resolve()
                        console.log("File  "+req.store.subDomain+'.xml'+" create successfully.");

                    }
                });
            })

        })
        .then(function(){
            res.sendFile(fileName)
        })
        .catch(function(err){
            next(err)
        })
}
exports.downloadPrice=function(req,res,next){
    if(!req.query.store){
        return next(new Error('не указан магазин'))
    }
    var configIP=require('../config/config.js')
    var imgPrefix="http://"+configIP.photoDownload+'/';
    console.log(imgPrefix)


    var options={$and:[{store:req.query.store},{actived:true}]};
    for(var key in req.body){
        let o={};o[key]=req.body[key]
        options.$and.push(o)
    }
    //console.log(options)
    var folder='./public/price/'+req.store._id;
    var filters=[],filtersObj={},filtersArr=[];
    var filterTags={};
    var images={};
    co(function* () {
        var filters = yield getFilters({$and:[{store:req.query.store},{actived:true}]});
        var filterTags = yield getFilterTags({store:req.query.store});
        return {f:filters,ft:filterTags};
    })
        .then(function (o) {
            //console.log(o)
            filters=o.f;
            filters.forEach(function(f){
                filtersObj[f._id]=f;
                filtersArr.push(f._id)
            })
            //console.log(filtersArr)
            o.ft.forEach(function (ft) {
                filterTags[ft._id]=ft
            })
            return;
        })
        .then(function(){
            //console.log(1)
            return new Promise(function(resolve,reject){
                if (!fs.existsSync(folder)) {
                    //console.log('!fs.existsSync(folder)')
                    fs.mkdirParent(folder, function(error) {
                        //console.log(error)
                        if (error){reject(err)}
                        resolve();
                    });
                } else{
                    //console.log('!fs.existsSync(folder)')
                    resolve();
                }
            })
        })
        .then(function(){
            function setRow(sheet,row,stuff,collection,tag){
                var tags={};
                if(!tag || tag=='notag'){
                    stuff.tags.forEach(function(ft){
                        //console.log(ft,filterTags[ft],stuff.name)
                        if(!ft || !filterTags[ft]){return}

                        var ind= filtersArr.indexOf(filterTags[ft].filter);
                        //console.log(ind,filterTags[ft])
                        if(ind>-1){
                            if(!tags[ind]){
                                tags[ind]=filterTags[ft].name;
                            }else{
                                tags[ind]+=','+filterTags[ft].name;
                            }
                        }
                    })
                    //console.log(tags)
                    if(Object.keys(tags).length){
                        for(key in tags){
                            sheet.set(9+(Number(key)+1), row, tags[key]);
                        }
                    }
                }else{
                    stuff.tags.forEach(function(ft){
                        if(typeof ft=='object' && ft.toString){
                            ft=ft.toString()
                        }
                        /*console.log(ft,tag,stuff.sortsOfStuff && stuff.sortsOfStuff.differentPrice&&
                            filterTags[ft].filter==stuff.sortsOfStuff.filter)*/
                        //console.log(ft,filterTags[ft],stuff.name)
                        if(!ft || !filterTags[ft]){return}
                        //console.log(typeof filterTags[ft].filter)
                        if(stuff.sortsOfStuff && stuff.sortsOfStuff.differentPrice &&
                            filterTags[ft].filter==stuff.sortsOfStuff.filter &&
                                ft!=tag
                        ){
                            return;
                        }
                        var ind= filtersArr.indexOf(filterTags[ft].filter);
                        //console.log(ind,filterTags[ft])
                        if(ind>-1){
                            if(!tags[ind]){
                                tags[ind]=filterTags[ft].name;
                            }else{
                                tags[ind]+=','+filterTags[ft].name;
                            }
                        }
                    })
                    //console.log(tags)
                    if(Object.keys(tags).length){
                        for(key in tags){
                            sheet.set(9+(Number(key)+1), row, tags[key]);
                        }
                    }
                }

                if(!tag){
                    tag=Object.keys(stuff.stock)[0]
                    var nameStuff=stuff.name

                }else{
                    var s='';
                    if(tag!='notag'){
                        s=(filterTags[tag])?' '+filterTags[tag].name:''
                    }
                    var nameStuff=stuff.name+s;
                }

                var price = stuff.stock[tag].price;
                var sale = stuff.stock[tag].priceSale||'';
                var retail = stuff.stock[tag].retail||'';
                var imgs=stuff.gallery.map(function (item) {
                    return imgPrefix+item.img
                }).join(',')
                images[nameStuff]=stuff.gallery.map(function (item) {
                    return item.img
                }).join(',')
                //console.log(imgs)

                sheet.set(1, row, nameStuff);
                sheet.set(2, row, stuff.artikul);
                sheet.set(3, row, stuff.category.name);
                sheet.set(4, row, collection);
                sheet.set(5, row, price);
                sheet.set(6, row, sale);
                sheet.set(7, row, retail);
                sheet.set(8, row, (stuff.desc)?stuff.desc.clearTag():'');
                sheet.set(9, row, imgs);





            }
            Stuff.find(options)
                .sort('category')
                .populate('category','name')
                .populate('brand','name')
                .populate('brandTag','name')
                .populate('sortsOfStuff')
                //.populate('tags','filter name')
                .exec(function(err,stuffs){
                    var rows=0;
                    var store=req.store;
                    var currency=req.query.currency||store.mainCurrency;
                    var rate=store.currency[currency][0]
                    stuffs.forEach(function (stuff,index) {
                        stuffs[index]=stuff.toObject();
                        stuff=stuffs[index];
                        StuffClass.setPrice(stuff,store,currency);
                        StuffClass.setRate(stuff,rate);
                        //console.log(stuff.sortsOfStuff)
                        if(stuff.stock && typeof stuff.stock=='object'){
                            if(stuff.stock && stuff.stock.notag){
                                if(stuff.stock.notag.quantity){
                                    rows++
                                    //console.log('rows-',rows,' ',stuff.name)
                                }else{
                                    delete stuff.stock;
                                }
                            }else{
                                for(var key in stuff.stock){
                                    if(!stuff.stock[key].quantity){
                                        delete stuff.stock[key];
                                    }
                                }
                                var jj=Object.keys(stuff.stock).length;
                                if(!jj){
                                    delete stuff.stock
                                }else{

                                    if(stuff.sortsOfStuff && stuff.sortsOfStuff.differentPrice){
                                        rows+=jj;
                                    }else{
                                        rows++;
                                    }
                                    /*console.log('rows-',rows,' ',stuff.name)
                                    console.log('jj-',jj)*/
                                }
                            }
                        }
                        //console.log(stuff.stock)

                    })
                    //console.log(rows)
                    //console.log(stuffs.length)
                    if (err) return next();
                    var excelbuilder = require('msexcel-builder');
                    var now =  Date.now();
                    var workbook = excelbuilder.createWorkbook('./public/price/'+req.store._id+'/',now+'.xlsx')
                    var sheet1 = workbook.createSheet('sheet1', 9+filters.length, rows+3);
                    sheet1.set(1, 1, 'Название');
                    sheet1.set(2, 1, 'артикул');
                    sheet1.set(3, 1, 'категория');
                    sheet1.set(4, 1, 'коллекция');
                    sheet1.set(5, 1, 'цена');
                    sheet1.set(6, 1, 'цена sale');
                    sheet1.set(7, 1, 'цена розница');
                    sheet1.set(8, 1, 'описание');
                    sheet1.set(9, 1, 'фото');
                    for (var i=0;i<filters.length;i++){
                        sheet1.set(9+(i+1), 1, filters[i].name);
                        sheet1.width(9+(i+1), 17)
                    }
                    sheet1.width(1, 50)
                    sheet1.width(2, 15)
                    sheet1.width(3, 15)
                    sheet1.width(4, 15)
                    sheet1.width(5, 15)
                    sheet1.width(6, 15)
                    sheet1.width(7, 17)
                    sheet1.width(8, 17)
                    sheet1.width(9, 17)

                    var stuff;
                    var tag='';
                    var offset=0;
                    for (var i = 2; i < stuffs.length+2; i++){
                        //continue;
                        stuff=stuffs[i-2];
                        if (stuff.brandTag && stuff.brandTag.name){tag=stuff.brandTag.name}else{tag=''}
                        //console.log(stuff.name,stuff.artikul,stuff.category.name,tag)
                        if(stuff.stock && typeof stuff.stock=='object'){
                            if(stuff.stock && stuff.stock.notag){
                                setRow(sheet1,i+offset,stuff,tag,'notag')
                            }else{
                                if(stuff.sortsOfStuff && stuff.sortsOfStuff.differentPrice){
                                    var ii=0;
                                    for(var key in stuff.stock){
                                        if(ii){
                                            offset++
                                        }
                                        setRow(sheet1,i+offset,stuff,tag,key)
                                        ii++;
                                    }
                                }else{
                                    setRow(sheet1,i+offset,stuff,tag)
                                }
                            }
                        }else{
                            --offset;
                        }
                    }
                    workbook.save(function(ok){
                        //console.log(ok)
                        res.json({file:req.store._id+'-'+now+'.xlsx',images:images});
                        if (!ok)
                            workbook.cancel();
                        else {
                            
                        }
                    });
                });
        })
        .catch(function(err){
            return next(err)
        })

}
exports.downloadPriceFromFile = function(req,res,next){
    var file = './public/price/'+req.params.file.split('-').join('/');
    console.log(file);
    if (fs.existsSync(file)){
        //console.log('ceotcndetn');
        res.download(file); // Set disposition and send it.
    }else{
        res.json({})
    }
}

exports.downloadCatalog=function(req,res,next){
    return downloadCatalog.downloadCatalog(req,res,next);
}
exports.downloadPriceXML=function(req,res,next){


    return downloadCatalog.downloadCatalog(req,res,next);


    if(!req.query.store){
        return next(new Error('не указан магазин'))
    }
    var configIP=require('../config/config.js')
    var imgPrefix="http://"+configIP.photoDownload+'/';
    console.log(imgPrefix)


    var options={$and:[{store:req.query.store},{actived:true}]};
    for(var key in req.body){
        let o={};o[key]=req.body[key]
        options.$and.push(o)
    }
    //console.log(options)
    var folder='./public/price/'+req.store._id;
    var filters=[],filtersObj={},filtersArr=[];
    var filterTags={};
    var images={};

    co(function* () {
        var filters = yield getFilters({$and:[{store:req.query.store},{actived:true}]});
        //console.log(filters)
        var filterTags = yield getFilterTags({store:req.query.store});
        return {f:filters,ft:filterTags};
    })
        .then(function (o) {
            //console.log(o)
            filters=o.f;
            filters.forEach(function(f){
                //console.log(f)
                filtersObj[f._id]=f;
                filtersArr.push(f._id)
            })
            //console.log(filtersArr)
            o.ft.forEach(function (ft) {
                filterTags[ft._id]=ft
            })
            return;
        })
        .then(function(){
            //console.log(1)
            return new Promise(function(resolve,reject){
                if (!fs.existsSync(folder)) {
                    //console.log('!fs.existsSync(folder)')
                    fs.mkdirParent(folder, function(error) {
                        //console.log(error)
                        if (error){reject(err)}
                        resolve();
                    });
                } else{
                    //console.log('!fs.existsSync(folder)')
                    resolve();
                }
            })
        })
        .then(function(){
            function setRow(stuff,collection,tag){
                var filtesContent=''
                var tags={};
                if(!tag || tag=='notag'){
                    stuff.tags.forEach(function(ft){
                        //console.log(ft,filterTags[ft],stuff.name)
                        if(!ft || !filterTags[ft]){return}

                        var ind= filtersArr.indexOf(filterTags[ft].filter);
                        //console.log(filtersObj[filterTags[ft].filter])
                        var key = getUrl.url_slug(filtersObj[filterTags[ft].filter].name)
                        if(ind>-1){
                            if(!tags[key]){
                                tags[key]=filterTags[ft].name;
                            }else{
                                tags[key]+=','+filterTags[ft].name;
                            }
                        }
                    })
                    //console.log(tags)
                    if(Object.keys(tags).length){
                        for(key in tags){
                            //sheet.set(9+(Number(key)+1), row, tags[key]);
                            filtesContent +=
                                "\t\t"+"<"+key+">"+tags[key]+"</"+key+">"+"\n";
                        }
                    }
                    //console.log(filtesContent)
                }else{
                    stuff.tags.forEach(function(ft){
                        if(typeof ft=='object' && ft.toString){
                            ft=ft.toString()
                        }
                        /*console.log(ft,tag,stuff.sortsOfStuff && stuff.sortsOfStuff.differentPrice&&
                         filterTags[ft].filter==stuff.sortsOfStuff.filter)*/
                        //console.log(ft,filterTags[ft],stuff.name)
                        if(!ft || !filterTags[ft]){return}
                        //console.log(typeof filterTags[ft].filter)
                        if(stuff.sortsOfStuff && stuff.sortsOfStuff.differentPrice &&
                            filterTags[ft].filter==stuff.sortsOfStuff.filter &&
                            ft!=tag
                        ){
                            return;
                        }
                        var ind= filtersArr.indexOf(filterTags[ft].filter);
                        //console.log(filtersObj[filterTags[ft].filter])
                        //console.log(ind,filterTags[ft])
                        var key = getUrl.url_slug(filtersObj[filterTags[ft].filter].name)

                        if(ind>-1){
                            if(!tags[key]){
                                tags[key]=filterTags[ft].name;
                            }else{
                                tags[key]+=','+filterTags[ft].name;
                            }
                        }
                    })
                    //console.log(tags)
                    if(Object.keys(tags).length){
                        for(key in tags){
                            //sheet.set(9+(Number(key)+1), row, tags[key]);
                            filtesContent +=
                                "\t\t"+"<"+key+">"+tags[key]+"</"+key+">"+"\n";

                        }
                    }
                    //console.log(filtesContent)
                }

                if(!tag){
                    tag=Object.keys(stuff.stock)[0]
                    var nameStuff=stuff.name
                }else{
                    var s='';
                    if(tag!='notag'){
                        s=(filterTags[tag])?' '+filterTags[tag].name:''
                    }
                    var nameStuff=stuff.name+s;
                }

                var price = stuff.stock[tag].price;
                var sale = stuff.stock[tag].priceSale||'';
                var retail = stuff.stock[tag].retail||'';

                var c ="\t"+"<content>"+"\n";
                c +="\t\t"+"<url>"+req.store.link+"/group/category/"+stuff.url+"</url>"+"\n";
                c +="\t\t"+"<id>"+stuff._id+"</id>"+"\n";
                c +="\t\t"+"<name>"+nameStuff+"</name>"+"\n";
                if(stuff.artikul){
                    c +="\t\t"+"<artikul>"+stuff.artikul+"</artikul>"+"\n";
                }
                if(stuff.desc){
                    c +="\t\t"+"<description>"+stuff.desc.clearTag()+"</description>"+"\n";
                }
                c +="\t\t"+"<price>"+price+"</price>"+"\n";
                if(sale){
                    c +="\t\t"+"<sale-price>"+sale+"</sale-price>"+"\n";
                }
                if(retail){
                    c +="\t\t"+"<retail-price>"+retail+"</retail-price>"+"\n";
                }
                c +="\t\t"+"<category>"+stuff.category.name+"</category>"+"\n";
                if(collection){
                    c +="\t\t"+"<collection>"+collection+"</collection>"+"\n";
                }

                stuff.gallery.forEach(function (item) {
                    c +="\t\t"+"<photo>"+imgPrefix+item.img+"</photo>"+"\n";
                })
                if(filtesContent){
                    c +=filtesContent
                }
                c +="\t"+"</content>"+"\n";
                return c;
            }
            Stuff.find(options)
                .sort('category')
                .populate('category','name')
                .populate('brand','name')
                .populate('brandTag','name')
                .populate('sortsOfStuff')
                //.populate('tags','filter name')
                .exec(function(err,stuffs){
                    if (err) return next();
                    var rows=0;
                    var store=req.store;
                    var currency=req.query.currency||store.mainCurrency;
                    var content='<data>';
                    var rate=store.currency[currency][0]

                    //console.log(currency)
                    stuffs.forEach(function (stuff,index) {
                        stuffs[index]=stuff.toObject();
                        stuff=stuffs[index];
                        StuffClass.setPrice(stuff,store,currency);
                        StuffClass.setRate(stuff,rate);
                        //console.log(stuff.sortsOfStuff)
                        if(stuff.stock && typeof stuff.stock=='object'){
                            if(stuff.stock && stuff.stock.notag){
                                if(stuff.stock.notag.quantity){
                                    rows++
                                    //console.log('rows-',rows,' ',stuff.name)
                                }else{
                                    delete stuff.stock;
                                }
                            }else{
                                for(var key in stuff.stock){
                                    if(!stuff.stock[key].quantity){
                                        delete stuff.stock[key];
                                    }
                                }
                                var jj=Object.keys(stuff.stock).length;
                                if(!jj){
                                    delete stuff.stock
                                }else{

                                    if(stuff.sortsOfStuff && stuff.sortsOfStuff.differentPrice){
                                        rows+=jj;
                                    }else{
                                        rows++;
                                    }
                                    /*console.log('rows-',rows,' ',stuff.name)
                                     console.log('jj-',jj)*/
                                }
                            }
                        }
                        //console.log(stuff.stock)

                    })
                    //console.log(rows)
                    //console.log(stuffs.length)

                    var stuff;
                    var tag='';
                    var offset=0;
                    for (var i = 2; i < stuffs.length+2; i++){
                        //continue;
                        stuff=stuffs[i-2];
                        if (stuff.brandTag && stuff.brandTag.name){tag=stuff.brandTag.name}else{tag=''}
                        //console.log(stuff.name,stuff.artikul,stuff.category.name,tag)
                        if(stuff.stock && typeof stuff.stock=='object'){
                            if(stuff.stock && stuff.stock.notag){
                                content+=setRow(stuff,tag,'notag')
                            }else{
                                if(stuff.sortsOfStuff && stuff.sortsOfStuff.differentPrice){
                                    var ii=0;
                                    for(var key in stuff.stock){
                                        if(ii){
                                            offset++
                                        }
                                        content+=setRow(stuff,tag,key)
                                        ii++;
                                    }
                                }else{
                                    content+=setRow(stuff,tag)
                                }
                            }
                        }else{
                            --offset;
                        }
                    }
                    content +='</data>'+"\n";
                    var now =  Date.now();
                    var fileName=now+'.xml'
                    Promise.resolve()
                        .then(function(){
                            return new Promise(function(resolve,reject){
                                //console.log('content-',content)
                                fs.writeFile(folder+'/'+fileName , content, {encoding: 'utf8'}, function(err){
                                    if(err) {
                                        throw err;
                                    } else {
                                        resolve()
                                        console.log("File  "+fileName+" create successfully.");

                                    }
                                });
                            })

                        })
                        .then(function(){
                            res.json({file:'/price/'+req.store._id+'/'+fileName});
                        })
                        .catch(function(err){
                            return next(err)
                        })





                });
        })
        .catch(function(err){
            return next(err)
        })

}
exports.downloadPriceFromFileXML = function(req,res,next){
    var file = './public/price/'+req.params.file.split('-').join('/');
    console.log(file);
    if (fs.existsSync(file)){
        //console.log('ceotcndetn');
        res.download(file); // Set disposition and send it.
    }else{
        res.json({})
    }
}
var i=0;
function getData(model,method,options,c){
    return new Promise(function(resolve,reject){
        if(method=='load'){
            options=options.criteria;
        }
        model[method](options,function(err, results){
            /*if(method=='load'){
               // console.log('i- ',i++,err,results)
            }else{
                console.log('i- ',i++,err,results.length,c)
            }*/

            if(err){return reject(err)}
            if(results){
                resolve(results)
            }else{
                resolve([])
            }
        })
    })
}
exports.getAllDataForIndex=function(req,res,next){
    //console.log(req.query)

    //res.json([[1,3],[2,4]])
    let models= [Group,Brand,Stat,Filter,Paps,Seopage,Coupon,Witget,HomePage,Campaign,Master,Info,Label];



    let lang=(req.query.lang)?req.query.lang:'ru';
    //console.log(lang,req.query.store,req.query.subDomain)
    let preload;
    if(req.query.preload){
        preload=true;
    }
    allDataIndex.getAllDataForIndex(models,lang,req.query.store,req.query.subDomain,preload,function(error,results){
        if(error){return next(error)}
        //console.log(results)
        zlib.deflate(JSON.stringify(results), function(err, buffer) {
            //console.log(err)
            if (!err) {
                //res.setHeader('Content-type','application/zip')
                res.setHeader('content-encoding', 'gzip')
                res.write(buffer,'binary');
                return res.end(null, 'binary');
                //return res.send(buffer)
            }else{
                next(err)
            }
        });

    })

}

exports.setTemplate=function(req,res,next){
    console.log(req.body);

    res.json({})
}
exports.getSearchData=function(req,res,next){
    console.log(req.params,req.query)
    res.json({})
}








exports.downLoadExternalCatalog=function(req,res,next){
    uploadCatalog.downLoadExternalCatalog(req,res,next)
}
exports.changeTaskSchedule=function(req,res,next){
    uploadCatalog.changeTaskSchedule(req,res,next)
}

exports.photoUploadResults=function(req,res,next){
    uploadCatalog.photoUploadResults(req,res,next)
}
exports.alignmentIndex=function(req,res,next){
    alignmentIndex.alignmentIndex(req,res,next)
}
exports.fixedDB=function(req,res,next){
    fixedDB.index(req,res,next)
}
exports.reNewKeyWords=function(req,res,next){
    reNewKeyWords(req,res,next)
}

exports.changeMPCategory=function(req,res,next){
    console.log(req.body)
    let query={store:req.store._id,category:req.body.category}
    req.body.categoriesMP.unshift(req.body.category);

    let categories= req.body.categoriesMP;
    /*console.log(req.body.category,categories)
    return;*/

    if(req.body.category){
        Stuff.find(query,function (err,stuffs) {
            stuffs.forEach(function (s) {
                console.log(s.name,s.category)
            })
        })
        Stuff.update(query, { category: categories}, { multi : true}, function(err, count){
            console.log(err)
            console.log(count)
            if(err){return next(err)}
            return res.json({msg:'ok',count:count})
        });
    }else{
        let error = new Error('there is not category was selected')
        next(error)
    }

}
exports.getBlocksHP=function(req,res,next){
    //console.log(req.params)
    HomePage.find({'blocks.template':true,'blocks.type':req.params.type},function (err,hps) {
        //console.log(hps)
        let a=[];
        hps.forEach(function (h) {
            h.blocks.forEach(function (b) {
                if(b.template && b.type==req.params.type){
                    a.push(b)
                }
            })
        })
        res.json(a)
    })
}
exports.getBlocksForAll=function(req,res,next){
    doIt().catch(error => next(error));
    async function doIt() {
        let hps = await HomePage.find({'blocks.template':true,'blocks.type':req.params.type})
        let sts = await Stuff.find({'blocks.template':true,'blocks.type':req.params.type})
        let ns = await News.find({'blocks.template':true,'blocks.type':req.params.type})
        let ms = await Master.find({'blocks.template':true,'blocks.type':req.params.type})
        let ss = await Stat.find({'blocks.template':true,'blocks.type':req.params.type})
        let cs = await Category.find({'blocks.template':true,'blocks.type':req.params.type})
        let a=[];
        hps.forEach(function (h) {
            h.blocks.forEach(function (b) {
                if(b.template && b.type==req.params.type){
                    a.push(b)
                }
            })
        })
        sts.forEach(function (item) {
            item.blocks.forEach(function (b) {
                if(b.template && b.type==req.params.type){
                    a.push(b)
                }
            })
        })
        ns.forEach(function (item) {
            item.blocks.forEach(function (b) {
                if(b.template && b.type==req.params.type){
                    a.push(b)
                }
            })
        })
        ms.forEach(function (item) {
            item.blocks.forEach(function (b) {
                if(b.template && b.type==req.params.type){
                    a.push(b)
                }
            })
        })
        ss.forEach(function (item) {
            item.blocks.forEach(function (b) {
                if(b.template && b.type==req.params.type){
                    a.push(b)
                }
            })
        })
        cs.forEach(function (item) {
            item.blocks.forEach(function (b) {
                if(b.template && b.type==req.params.type){
                    a.push(b)
                }
            })
        })
        res.json(a)

    }
}










