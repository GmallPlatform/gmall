'use strict';
var modelsList = require('../../modules/modelsList');


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ObjectID = mongoose.Types.ObjectId;

var fs = require('fs');
var co = require('co');
var path = require('path');
let async=require('async')
let request=require('request')

const ipHost=require('../../modules/ip/ip' );
const ports=require('../../modules/ports' );
const  photoUploadHost= (ipHost.photo_ip)?'http://'+ipHost.photo_ip+':'+ports.photoUploadPort:'http://'+ipHost.remote_ip+':'+ports.photoUploadPort;



var Additional=mongoose.model('Additional');
var Brand=mongoose.model('Brand');
var BrandTags=mongoose.model('BrandTags');
var Campaign=mongoose.model('Campaign');
var Category=mongoose.model('Category');
var Group=mongoose.model('Group');
var Comment=mongoose.model('Comment');
var Coupon=mongoose.model('Coupon');
var ExternalCatalog=mongoose.model('ExternalCatalog');
var Filter=mongoose.model('Filter');
var FilterTags=mongoose.model('FilterTags');
var HomePage=mongoose.model('HomePage');
var Info=mongoose.model('Info');
var Lookbook=mongoose.model('Lookbook');
var Master=mongoose.model('Master');
var News=mongoose.model('News');
var Paps=mongoose.model('Paps');
var Seopage=mongoose.model('Seopage');
var Keywords=mongoose.model('Keywords');
var Stat=mongoose.model('Stat');
var Stuff=mongoose.model('Stuff');
var SortsOfStuff=mongoose.model('SortsOfStuff');
var AddInfo=mongoose.model('AddInfo');
var Witget=mongoose.model('Witget');

var models=[
    'Additional',
    'Brand',
    'BrandTags',
    'Campaign',
    'Category',
    'Group',
    'Comment',
    'Coupon',
    'ExternalCatalog',
    'Filter',
    'FilterTags',
    'HomePage',
    'Info',
    'Lookbook',
    'Master',
    'News',
    'Paps',
    'Seopage',
    'Keywords',
    'Stat',
    'Stuff',
    'SortsOfStuff',
    'AddInfo',
    'Witget',
]
// добавить стафф гроуп


var models=modelsList.models;
var Models = models.reduce(function (o,item) {
    o[item]=mongoose.model(item);
    return o
},{})
exports.uploadStore=function(req,res,next){
    let folder = './public/stores/'+req.store.subDomain;
    try {
        fs.accessSync(folder, fs.F_OK);
    } catch (e) {
        fs.mkdirSync(folder);
    }
    let query = {store:req.store._id}
    let acts=models.map(function(model){handleModel(model,query,folder)})
    Promise.all(acts).then(function (results) {
        res.json({})
    }).catch(next)
}
function handleModel(model,q,folder) {
    let Model= mongoose.model(model);
    /*var readerStream = Model.find(q).stream();
    var writerStream = fs.createWriteStream(folder+'/'+model+'.json');*/
    return new Promise(function (rs,rj) {
        Model.find(q).lean().exec(function (err, data) {
            let d = JSON.stringify(data)
            fs.writeFile(folder + '/' + model + '.json', d, 'utf8', function (err, results) {
                if (err) {
                    rj(err)
                }
                rs()
            })
        })
    })
}

exports.readStore=function(req,res,next){
    //let config=require('../config/config.js')
    let folder = './public/stores/'+req.query.subDomain;
    let dataTable={folders:[],photos:[],subDomain:req.store.subDomain}
    let newStore={};
    async.eachSeries(models, function (model,callback) {
        let folderPreffix='/images/'+req.store.subDomain+'/'+model+'/'
        //console.log(folderPreffix)
        dataTable.folders.push(folderPreffix)
        Promise.resolve()
            .then(function () {
                //console.log('start handle models')
                return handleModelClone(model,req.store._id,folder,folderPreffix,req.store.subDomain,dataTable,newStore)
            })
            .then(function () {
                callback()
            })
            .catch(function (err) {
                callback(err)
            })
    },function (error,results) {
        console.log('all models done ')
        //console.log(error)
        if(error){return next(error)}

        try{
            newStore.Brand.forEach(function (item) {
                if(item.tags && item.tags.length){
                    item.tags.forEach(function (el,i) {
                        item.tags[i]=dataTable.BrandTags[el]
                    })
                }
            })
            newStore.BrandTags.forEach(function (item) {
                if(item.categories && item.categories.length){
                    item.categories.forEach(function (el,i) {
                        item.categories[i]=dataTable.Category[el]
                    })
                }
                if(item.brand){item.brand=dataTable.Brand[item.brand]}
            })
            newStore.Filter.forEach(function (item) {
                if(item.tags && item.tags.length){
                    item.tags.forEach(function (el,i) {
                        item.tags[i]=dataTable.FilterTags[el]
                    })
                }
            })
            newStore.FilterTags.forEach(function (item) {
                if(item.filter){item.filter=dataTable.Filter[item.filter]}
            })
            newStore.Category.forEach(function (item) {
                if(item.group){item.group=dataTable.Group[item.group]}
                if(item.brands && item.brands.length){
                    item.brands.forEach(function (b,i) {
                        item.brands[i]=dataTable.Brand[b]
                    })
                }
                if(item.filters && item.filters.length){
                    item.filters.forEach(function (f,i) {
                        item.filters[i]=dataTable.Filter[f]
                    })
                }
            })
            newStore.Group.forEach(function (item) {
                if(item.parent){item.parent=dataTable.Group[item.parent]}
                if(item.child && item.child.length){
                    item.child.forEach(function (el,i) {
                        item.child[i]=dataTable.Group[el]
                    })
                }
                if(item.categories && item.categories.length){
                    item.categories.forEach(function (el,i) {
                        item.categories[i]=dataTable.Category[el]
                    })
                }
                //console.log(item)
            })
            newStore.Stuff.forEach(function (item){
                if(item.tags && item.tags.length){
                    item.tags.forEach(function (el,i) {
                        item.tags[i]=dataTable.FilterTags[el]
                    })
                }
                if(item.brand){item.brand=dataTable.Brand[item.brand]}
                if(item.brandTag){item.brandTag=dataTable.BrandTags[item.brandTag]}
                if(item.category){
                    if(typeof item.category =='object'){
                        if(item.category.length){
                            let arr=[];
                            item.category.forEach(function (c) {
                                if(dataTable.Category[c]){
                                    arr.push(dataTable.Category[c])
                                }
                            })
                            item.category=arr;
                        }
                    }else{
                        item.category=dataTable.Category[item.category]
                    }
                }
                if(item.section){item.section=dataTable.Group[item.section]}
                if(item.sortsOfStuff){item.sortsOfStuff=dataTable.SortsOfStuff[item.sortsOfStuff]}
                if(item.addInfo){item.addInfo=dataTable.AddInfo[item.addInfo]}

                if(item.stock && typeof item.stock =='object'){
                    let keys = Object.keys(item.stock);
                    keys.forEach(function (key) {
                        if(key!='notag'){
                            if(dataTable.FilterTags[key]){
                                let newKey = dataTable.FilterTags[key];
                                item.stock[newKey]=item.stock[key];
                                delete item.stock[key];
                            }

                        }
                    })
                }
                //console.log(item.link)
            })
            newStore.SortsOfStuff.forEach(function (item) {
                if(item.filter){item.filter=dataTable.Filter[item.filter]}
                if(item.filterGroup){item.filterGroup=dataTable.Filter[item.filterGroup]}
                if(item.addInfo){item.addInfo=dataTable.AddInfo[item.addInfo]}
                if(item.stuffs && item.stuffs.length){
                    item.stuffs.forEach(function (el,i) {
                        item.stuffs[i]=dataTable.Stuff[el]
                    })
                }
            })
            newStore.AddInfo.forEach(function (item) {
                if(item.filter){item.filter=dataTable.Filter[item.filter]}
            })
            newStore.News.forEach(function(item){
                if(item.blocks && item.blocks.length){
                    item.blocks.forEach(function (block) {
                        if(block._id){
                            let model;
                            //console.log(block.type)
                            if(block.type=='stuffs'){model='Stuffs'}
                            else if(block.type=='filterTags'){model='FilterTags'}
                            else if(block.type=='brandTags'){model='BrandTags'}
                            else if(block.type=='brands'){model='Brand'}
                            else if(block.type=='categories'){model='Category'}
                            else if(block.type=='info'){model='Info'}
                            else if(block.type=='campaign'){model='Campaign'}
                            else if(block.type=='news'){model='News'}
                            if(model && dataTable[model] && block[block.type] && block[block.type].length){
                                let arr=[];
                                block[block.type].forEach(function (s) {
                                    //console.log(item.name,s,dataTable[model][s])
                                    if(dataTable[model][s]){
                                        arr.push(dataTable[model][s])
                                    }
                                })
                                block[block.type]=arr;
                            }
                        }
                    })
                }
            })
            newStore.Stat.forEach(function(item){
                if(item.blocks && item.blocks.length){
                    item.blocks.forEach(function (block) {
                        if(block._id){
                            let model;
                            if(block.type=='stuffs'){model='Stuffs'}
                            else if(block.type=='filterTags'){model='FilterTags'}
                            else if(block.type=='brandTags'){model='BrandTags'}
                            else if(block.type=='brands'){model='Brand'}
                            else if(block.type=='categories'){model='Category'}
                            else if(block.type=='info'){model='Info'}
                            else if(block.type=='news'){model='News'}
                            else if(block.type=='campaign'){model='Campaign'}
                            if(model && dataTable[model] && block[block.type] && block[block.type].length){
                                let arr=[];
                                block[block.type].forEach(function (s) {
                                    //console.log(item.name,s,dataTable[model][s])
                                    if(dataTable[model][s]){
                                        arr.push(dataTable[model][s])
                                    }
                                })
                                block[block.type]=arr;
                            }
                        }
                    })
                }
            })
            //console.log('newStore.Master',newStore.Master)
            newStore.Master.forEach(function(item){
                if(item.blocks && item.blocks.length){
                    item.blocks.forEach(function (block) {
                        if(block._id){
                            let model;
                            if(block.type=='stuffs'){model='Stuff'}
                            else if(block.type=='filterTags'){model='FilterTags'}
                            else if(block.type=='brandTags'){model='BrandTags'}
                            else if(block.type=='brands'){model='Brand'}
                            else if(block.type=='categories'){model='Category'}
                            else if(block.type=='info'){model='Info'}
                            else if(block.type=='news'){model='News'}
                            else if(block.type=='campaign'){model='Campaign'}
                            if(model && dataTable[model] && block[block.type] && block[block.type].length){
                                let arr=[];
                                block[block.type].forEach(function (s) {
                                    //console.log(item.name,s,dataTable[model][s])
                                    if(dataTable[model][s]){
                                        arr.push(dataTable[model][s])
                                    }
                                })
                                block[block.type]=arr;
                                //console.log(arr)
                            }
                            //console.log(block)
                            /*if(model && dataTable[model] && dataTable[model][block._id] ){
                                block._id=dataTable[model][block._id]
                            }*/

                        }
                    })
                }
            })
            let position =['left','right','header']
            newStore.HomePage.forEach(function(item){
                /*position.forEach(function(pos){
                    if(item && item[pos] && item[pos].length){
                        item[pos].forEach(function(block,j){
                            block.filterTags.forEach(function(el,i){
                                block.filterTags[i]=dataTable.FilterTags[el]
                            })
                            block.brandTags.forEach(function(el,i){
                                block.brandTags[i]=dataTable.BrandTags[el]
                            })
                            block.brands.forEach(function(el,i){
                                block.brands[i]=dataTable.Brand[el]
                            })
                            block.categories.forEach(function(el,i){
                                //console.log(el,dataTable.Category[el])
                                block.categories[i]=dataTable.Category[el]
                            })
                            block.stuffs.forEach(function(el,i){
                                block.stuffs[i]=dataTable.Stuff[el]
                            })
                            block.news.forEach(function(el,i){
                                block.news[i]=dataTable.News[el]
                            })
                            block.campaign.forEach(function(el,i){
                                block.campaign[i]=dataTable.Campaign[el]
                            })
                            block.info.forEach(function(el,i){
                                block.info[i]=dataTable.Info[el]
                            })
                        })
                    }
                })*/




                if(item.blocks && item.blocks.length){
                    item.blocks.forEach(function (block) {
                        if(block._id){
                            let model;
                            if(block.type=='stuffs'){model='Stuffs'}
                            else if(block.type=='filterTags'){model='FilterTags'}
                            else if(block.type=='brandTags'){model='BrandTags'}
                            else if(block.type=='brands'){model='Brand'}
                            else if(block.type=='categories'){model='Category'}
                            else if(block.type=='info'){model='Info'}
                            else if(block.type=='news'){model='News'}
                            else if(block.type=='campaign'){model='Campaign'}
                            if(model && dataTable[model] && block[block.type] && block[block.type].length){
                                let arr=[];
                                block[block.type].forEach(function (s) {
                                    console.log(item.name,s,dataTable[model][s])
                                    if(dataTable[model][s]){
                                        arr.push(dataTable[model][s])
                                    }
                                })
                                block[block.type]=arr;
                            }
                        }
                    })
                }
            })
            newStore.Comment.forEach(function (item) {
                if(item.stuff){item.stuff=dataTable.Stuff[item.stuff]}
            })
            newStore.Campaign.forEach(function (item) {
                if(item.tags && item.tags.length){
                    item.tags.forEach(function (el,i) {
                        item.tags[i]=dataTable.FilterTags[el]
                    })
                }
                if(item.conditionTags && item.conditionTags.length){
                    item.conditionTags.forEach(function (el,i) {
                        item.conditionTags[i]=dataTable.FilterTags[el]
                    })
                }
                if(item.stuffs && item.stuffs.length){
                    item.stuffs.forEach(function (el,i) {
                        item.stuffs[i]=dataTable.Stuff[el]
                    })
                }
                if(item.conditionStuffs && item.conditionStuffs.length){
                    item.conditionStuffs.forEach(function (el,i) {
                        item.conditionStuffs[i]=dataTable.Stuff[el]
                    })
                }
                if(item.categories && item.categories.length){
                    item.categories.forEach(function (el,i) {
                        item.categories[i]=dataTable.Category[el]
                    })
                }
                if(item.conditionCategories && item.conditionCategories.length){
                    item.conditionCategories.forEach(function (el,i) {
                        item.conditionCategories[i]=dataTable.Category[el]
                    })
                }
                if(item.brandTags && item.brandTags.length){
                    item.brandTags.forEach(function (el,i) {
                        item.brandTags[i]=dataTable.BrandTags[el]
                    })
                }
                if(item.conditionBrandTags && item.conditionBrandTags.length){
                    item.conditionBrandTags.forEach(function (el,i) {
                        item.conditionBrandTags[i]=dataTable.BrandTags[el]
                    })
                }
            })
        }catch(err){
            console.log(err)
            return next(err)
        }

        //let url=photoUploadHost+'/api/copyPhotos'
        let url='http://127.0.0.1:3300'+'/api/copyPhotos'



        Promise.resolve()
            .then(function () {
                return new Promise(function(rs,rj){
                    /*console.log(folders)
                    console.log(url)*/
                    console.log('url',url)
                    request.post({url:url,form:{folders:dataTable.folders,photos:dataTable.photos,subDomain:dataTable.subDomain,deleteFolder:true}}, function(error,data){
                        if(error){
                            console.log('error-',error)
                            next(error)
                        }else{
                            try{
                                var data=JSON.parse(data.body);
                                console.log('data-',data)
                                rs()
                            }catch(err){
                                console.log(err)
                                rj(err)
                            }

                        }

                    })
                })
            })
            .then(function(){
                //return res.json({msg:'ok'});
                async.eachSeries(models, function(model, asyncdone) {
                    async.each(newStore[model], function(data, cb) {
                        if(model=='Master'){
                            console.log(data.name)
                        }
                        data.save(cb);
                    }, function(err) {
                        if (err) return asyncdone(err);
                        asyncdone();
                    });
                }, function(err) {
                    if (err) return next(err);
                    res.json({msg:'ok'}); // or `done(err)` if you want the pass the error up
                });


            })
            .catch(next)

    } )
}
function handleModelClone(model,store,folder,folderPreffix,subDomain,dataTable,newStore) {
    console.log('model',model)
    dataTable[model]={}
    newStore[model]=[];
    let Model= mongoose.model(model);
    let isPhoto;
    let position =['left','right','header']
    function handlePhoto(img,id) {
        let parts=img.split('/')
        parts[1]=subDomain;
        if(parts[2]!=model){
            parts[2]=model
        }
        parts[3]=id;
        let newFile=parts.join('/')
        if(!isPhoto){
            dataTable.folders.push(folderPreffix+id)
            isPhoto=true;
        }
        /*if(newFile=='/images/semya/57231bb7334d842a04e962c0/5b374fa61146e13913e89c74'){
            console.log('yes')
        }*/
        //console.log(newFile)
        return [img,newFile]
    }

    return new Promise(function (rs,rj) {
        Model.remove({store:store},function(err){
            if(err){rj(err)}
            try {
                fs.accessSync(folder,  fs.R_OK | fs.W_OK);
                fs.readFile(folder+'/'+model+'.json','utf8',function(err,results){
                    //console.log('model ',model)
                    //console.log(err)
                    if(err){rs()}
                    try{
                        let collection=JSON.parse(results)
                        if(collection && collection.length){
                            async.each(collection,function(item,cb){
                                /*if(item._id=='57231bb7334d842a04e962c0' || item._id=='5b374fa61146e13913e89c74'){
                                    console.log(item)
                                }*/
                                isPhoto=false;
                                let id= item._id;
                                delete item._id;
                                item.store=store;
                                if(model=='HomePage'){
                                    item.url=subDomain;
                                }
                                let data = new Model(item)

                                //handle photos
                                if(data.smallimg && typeof data.smallimg!='object' && typeof data.smallimg=='string'){
                                    dataTable.photos.push(handlePhoto(data.smallimg,data.url))
                                    data.smallimg=dataTable.photos[dataTable.photos.length-1][1];
                                }
                                if(data.img && typeof data.img!='object'&& typeof data.smallimg=='string'){
                                    dataTable.photos.push(handlePhoto(data.img,data.url))
                                    data.img=dataTable.photos[dataTable.photos.length-1][1];
                                }
                                if(data.logo && typeof data.img!='logo'&& typeof data.smallimg=='string'){
                                    dataTable.photos.push(handlePhoto(data.logo,data.url))
                                    data.logo=dataTable.photos[dataTable.photos.length-1][1];
                                }
                                if(data.sticker && typeof data.sticker!='object' && data.sticker.length && data.sticker.length>6){
                                    dataTable.photos.push(handlePhoto(data.sticker,data.url))
                                    data.sticker=dataTable.photos[dataTable.photos.length-1][1];
                                }
                                if(data.imgs && data.imgs.length){
                                    data.imgs.forEach(function(d,i){
                                        if(d.img && d.img.length){
                                            dataTable.photos.push(handlePhoto(d.img,data.url))
                                            data.imgs[i].img=dataTable.photos[dataTable.photos.length-1][1];
                                        }

                                    })
                                }
                                if(data.gallery && data.gallery.length){
                                    data.gallery.forEach(function(d,i){
                                        if(d.img && d.img.length){
                                            dataTable.photos.push(handlePhoto(d.img,data.url))
                                            data.gallery[i].img=dataTable.photos[dataTable.photos.length-1][1];
                                        }
                                        if(d.thumb && d.img.thumb){
                                            dataTable.photos.push(handlePhoto(d.thumb,data.url))
                                            data.gallery[i].thumb=dataTable.photos[dataTable.photos.length-1][1];
                                        }
                                        if(d.thumbSmall && d.img.thumbSmall){
                                            dataTable.photos.push(handlePhoto(d.thumbSmall,data.url))
                                            data.gallery[i].thumbSmall=dataTable.photos[dataTable.photos.length-1][1];
                                        }
                                    })
                                }
                                if(data.blocks && data.blocks.length){
                                    data.blocks.forEach(function(block,j){
                                        if(block.img && block.img.length){
                                            dataTable.photos.push(handlePhoto(block.img,data.url))
                                            data.blocks[j].img=dataTable.photos[dataTable.photos.length-1][1];
                                        }
                                        if(block.video && block.video.length){
                                            //console.log(block.video)
                                            dataTable.photos.push(handlePhoto(block.video,data.url))
                                            data.blocks[j].video=dataTable.photos[dataTable.photos.length-1][1];
                                            console.log(data.blocks[j].video)
                                        }
                                        if(block.imgs && block.imgs.length){
                                            block.imgs.forEach(function(d,i){
                                                if(d.img && d.img.length){
                                                    let tempData = handlePhoto(d.img,data.url)
                                                    data.blocks[j].imgs[i].img=tempData[1];
                                                    if((block.name && block.name=='slider') || (block.type && block.type=='slider')){
                                                        dataTable.photos.push(tempData)
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                                /*position.forEach(function(pos){
                                    if(data && data[pos] && data[pos].length){
                                        data[pos].forEach(function(block,j){
                                            delete data[pos][j]._id
                                            if(block.img){
                                                dataTable.photos.push(handlePhoto(block.img,data._id))
                                                data[pos][j].img=dataTable.photos[dataTable.photos.length-1][1];
                                            }
                                            if(block.video){
                                                dataTable.photos.push(handlePhoto(block.video,data._id))
                                                data[pos][j].video=dataTable.photos[dataTable.photos.length-1][1];
                                            }
                                            if(block.imgs && block.imgs.length){
                                                block.imgs.forEach(function(d,i){
                                                    dataTable.photos.push(handlePhoto(d.img,data._id))
                                                    data[pos][j].imgs[i].img=dataTable.photos[dataTable.photos.length-1][1];
                                                })
                                            }
                                        })
                                    }
                                })
*/

                                if(data){
                                    dataTable[model][id]=data._id
                                    newStore[model].push(data)
                                    cb()
                                }else{
                                    cb()
                                }
                            },function(err){
                                if(err){rj(err)}
                                console.log('завершение модели ',model)
                                rs()
                            })
                        }else{
                            rs()
                        }
                    }catch(err){
                        console.log('парсинг файла ',err)
                        rs()
                    }
                })
            } catch (e) {
                rs()
            }
        })
    })



    var stream = fs.createReadStream(folder+'/'+model+'.json')
    stream = byline.createStream(stream);
    /*stream.on('readable', function() {
        var line;
        while (null !== (line = stream.read())) {
            try{
                let data = JSON.parse(line)
                dataTable.folders.push(folderPreffix+data._id)
                console.log(folderPreffix+data._id)
            }catch(err){
                console.log('err-',err)
            }

        }
    });*/

    Model.remove({store:store},function(err){
        stream.on('data', function(line) {
            stream.pause()
            try{
                let d = JSON.parse(line)
                let id= d._id;
                delete d._id;
                let data = new Model(d)

                dataTable.folders.push(folderPreffix+data._id)
                if(data.img && typeof data.img!='Object'){
                    //console.log(data.img)
                    let parts=data.img.split('/')
                    //console.log(parts)
                    parts[1]=subDomain;
                    parts[3]=data._id;
                    let newFile=parts.join('/')
                    dataTable.photos.push([data.img,newFile])
                    data.img=newFile;
                }
                if(data){
                    setTimeout(function(){
                        console.log('saver ',data.name)
                        stream.resume()
                    },400)
                    /*data.save(function(){
                        console.log('saver ',data.name)
                        stream.resume()
                    })*/
                }else{
                    stream.resume()
                }
                //console.log(folderPreffix+data._id)
            }catch(err){
                console.log('err-',err)
            }
        });
    })


    return new Promise(function (rs,rj) {
        stream.on('finish', function() {
            console.log('finish')
            rs(model)

        })
        stream.on('error', function() {
            console.log(error)
            rj(error)
        })
    })

}
/*********************************************************************************************/

exports.deleteStore=function (req,res,next) {
    /*if(!req.store || !req.store._id || !req.store.wantToDelete){
        return next("can't delete" )
    }*/
    if(!req.store || !req.store._id){
        return next("can't delete" )
    }

    async function deleteModels () {
        for (let model of models) {
            await deleteModel(model,req.store._id)
        }
    }
    function deleteModel(model,store) {
        let Model= mongoose.model(model);
        if(Model && store){
            return new Promise(function (rs,rj) {
                Model.remove({store:store},function(err){
                    if(err){return rj(err)}
                    return rs()
                })
            })
        }
    }
    deleteModels()
        .then(function () {
            res.json({msg:'ok'})
        })
        .catch(function (err) {
            next(err)
        })

    return;

}









