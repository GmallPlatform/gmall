'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var domain = require('domain');
var ObjectID = mongoose.Types.ObjectId;

var rimraf = require('rimraf');
var im = require('imagemagick');
var async = require('async');
var multer  =   require('multer');
var fs = require('fs')
    , util = require('util');
var sizeOf = require('image-size');
var Busboy = require('busboy'),
    inspect = require('util').inspect;
var exec = require('child_process').exec;
var path = require('path');
var mime =require('mime');

var config={langs:['ru','uk','en','de']}

var configUrl=require('../config/config' );
const permission = require('../../modules/permission-api');
var request=require('request');

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
function save(req, res, next) {
    console.log('save')
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        var user;
        Promise.resolve()
            .then(function () {
                if(req.body && req.body.user && !req.body.user._id){
                    user=req.body.user;
                    delete req.body.user
                }
                return new Promise(function(resolve,reject){
                    if (req.collection.preUpdate && typeof req.collection.preUpdate === 'function'){
                        req.collection.preUpdate(req,function(err,res){
                            if (err) return reject(err);
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                })
            })
            .then(function () {
                var stuff,upsertData;
                //console.log(req.body)
                if(req.query.store){
                    req.body.store=req.query.store;
                }
                //console.log(req.body)
                stuff = new req.collection(req.body);
                //console.log('stuff ',stuff)
                upsertData = stuff.toObject();
                //console.log(upsertData)
                //console.log('ldlldld!')
                delete upsertData._id;
                /*if(!upsertData.store){
                 upsertData.store=req.store._id;
                 }*/
                //console.log('ldlldld!')
                //console.log('upsertData-',upsertData);
                req.collection.update({_id: stuff.id}, upsertData, {upsert: true}, function (err,result) {
                    if (err) return  next(err)
                    //если комментарий то вставляем ссылку на id thread parent-а
                    if (req.collection.postUpdate && typeof req.collection.postUpdate === 'function'){
                        req.collection.postUpdate(stuff);
                    }
                    console.log('user',user,req.collectionName)
                    if (req.collectionName=='Store' && user){
                        Promise.resolve()
                            .then(function () {
                                return new Promise(function (rs,rj) {
                                    request.post({url:'http://'+configUrl.userHost+'/User?store='+stuff._id, form: user},function(error, response, body) {
                                        console.log('body',body);
                                        rs()
                                    })
                                })

                            })
                            .then(function () {
                                var o={id:stuff.id};
                                if(stuff.date){o.date=stuff.date};
                                if(stuff._id){o._id=stuff._id};
                                res.json(o);
                            })
                    }else{
                        //console.log(stuff)
                        var o={id:stuff.id};
                        if(stuff.date){o.date=stuff.date};
                        if(stuff._id){o._id=stuff._id};
                        res.json(o);
                    }

                })
            })
            .catch(function(err){
                next(err)
            })
    })
}

exports.get = function(req, res, next) {
    //console.log('exports.get')
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        if (!req.params.id) return next();

        let id= req.params.id,query;

        //console.log('req.params.id',req.params.id,req.collectionName)



        if(req.collectionName=='CustomLists'){
            try {
                id = new ObjectID(id);
            } catch (err) {
                id=req.params.id;
            }
            if (typeof  id =='object'){
                query ={$or:[{_id:id},{url:req.params.id}]}
            }else{
                query ={url:id}
            }
            query.store=req.query.store
            //console.log(query)
        }else{
            query=id
        }
        //console.log('query',query)



        req.collection.load(query, async function(e, result){
                //console.log('req.url',req.url,req.checkPermission)
                if(req.checkPermission){
                    req.store=result;
                    try{
                        let perm = await permission.checkPermissionTranslator(req)
                        //console.log('perm',perm)
                    }catch (err){console.log('err in catch',err)}


                }

                if(false){
                    /*fs.writeFile( 'public/views/'+result.subDomain+'.json', JSON.stringify(result, null, '\t'), function (err, data) {
                        if (err) console.log(err);
                    } );*/

                }
            /*if(result.seller && result.seller.mailgun){
             delete result.seller.mailgun

             }
             delete result.payData
             delete result.alphasms
             delete result.googleAnalytics
             delete result.gl
             delete result.fb
             delete result.owner
             delete result.translaters
             */
            if (e) return next(e)
            if (result){
                return res.send(result);
            } else {
                return res.sendStatus(404)
            }
        })
    })
}
exports.list = function(req, res, next) {
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        next(error)
    });
    d.run(function () {
        var page = (req.query['page'] > 0 ? req.query['page'] : 0);
        var perPage = (req.query.perPage && parseInt(req.query.perPage)>0)?parseInt(req.query.perPage):100;
        var options = {
            perPage: perPage,
            page: page,
            criteria:null
        }

        if(req.collectionName=='CustomLists'){
            if(!options.criteria){
                options.criteria={}
            }
            options.criteria.store=req.query.store
        }
        if(req.query.query && req.query.query!='{}') {
            try {
                options.criteria=JSON.parse(req.query.query);
            } catch (err) {
                options.criteria=req.query.query;
            }
        }

        req.collection.list(options,function(e, results){
            if (e) return next(e)
            if (page==0){
                req.collection.count(options.criteria).exec(function (err, count) {
                    if (results.length>0){
                        results.unshift({'index':count});
                    }
                    return res.json(results)
                })
            } else {
                return res.json(results)
            }
        })

    })
}
exports.save = function(req, res, next) {
    //console.log('save????')
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        var user;
        Promise.resolve()
            .then(function () {
                if(req.body && req.body.user && !req.body.user._id){
                    user=req.body.user;
                    delete req.body.user
                }

                return new Promise(function(resolve,reject){
                    if (req.collection.preUpdate && typeof req.collection.preUpdate === 'function'){
                        req.collection.preUpdate(req,function(err,res){
                            if (err) return reject(err);
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                })
            })
            .then(function () {
                var stuff,upsertData;
                if(req.collectionName=='Store'){
                    req.body.date= Date.now()
                }
                stuff = new req.collection(req.body);
                upsertData = stuff.toObject();
                delete upsertData._id;
                req.collection.update({_id: stuff.id}, upsertData, {upsert: true}, function (err,result) {
                    if (err) return  next(err)
                    //если комментарий то вставляем ссылку на id thread parent-а
                    if (req.collection.postUpdate && typeof req.collection.postUpdate === 'function'){
                        req.collection.postUpdate(stuff);
                    }

                    //console.log('user',user,req.collectionName)
                    if (req.collectionName=='Store' && user){
                        Promise.resolve()
                            .then(function () {
                                if(req.body.clone){
                                    user.clone=true;
                                }
                                //console.log('user.clone',user.clone)
                                return new Promise(function (rs,rj) {
                                    let url = 'http://'+configUrl.userHost+'/api/collections/User?store='+stuff._id;
                                    request.post({url:url, form: user},function(error, response, body) {
                                        try{
                                            let b = JSON.parse(body)
                                            rs(b)
                                        }catch(err){
                                            rs()
                                        }

                                    })
                                })

                            })
                            .then(function (res_body) {
                                user = res_body
                                if(user && user.id){
                                    return req.collection.update({_id:stuff._id},{$set:{owner:[user.id]}});
                                }

                            })
                            .then(function () {
                                return req.collection.findOne({_id:stuff._id}).exec();
                            })
                            .then(function (newStore) {
                               // console.log('result update owner',newStore._id,newStore.subDomain,newStore.owner)
                            })
                            .then(function () {
                                var o={id:stuff.id};
                                if(user && user.token){
                                    o.token=user.token
                                }
                                if(stuff.date){o.date=stuff.date};
                                if(stuff._id){o._id=stuff._id};
                                res.json(o);
                            })
                    }else{
                        var o={id:stuff.id};
                        if(stuff.date){o.date=stuff.date};
                        if(stuff._id){o._id=stuff._id};
                        res.json(o);
                    }




                })
            })
            .catch(function(err){
                next(err)
            })
    })
}
exports.update = function(req, res, next) {
    //console.log(req.body)
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        var arr = [];
        if(req.query.update.split){
            arr =req.query.update.split(' ');
        }
        var newVal ={};
        for (var i= 0,l=arr.length;i<l;i++){
            if(arr[i]=='name'){
                req.body[arr[i]]=req.body[arr[i]].substring(0,100);
            }
            if(arr[i]=='desc'){
                req.body[arr[i]]=req.body[arr[i]].substring(0,2000);
            }
            newVal[arr[i]]= req.body[arr[i]];
        }
        if(!Object.keys(newVal).length){
            var error=new Error('не верный формат передаваемых данных')
            return next(error)
        }


        let lang='ru';
        //let indexImgs;
        if(req.query.lang && config.langs.indexOf(req.query.lang)>-1){
            lang=req.query.lang;
        }
        let newKeys={}
        newKeys.desc='descL.'+lang
        newKeys.name='nameL.'+lang
        newKeys.seo='seoL.'+lang
        newKeys.textCondition='textConditionL.'+lang
        newKeys.unitOfMeasure='unitOfMeasureL.'+lang
        newKeys.nameLists='nameListsL.'+lang
        newKeys.humburger='humburgerL.'+lang
        newKeys.location='locationL.'+lang
        newKeys.bonusButtonText='bonusButtonTextL.'+lang

        var query={_id:req.body._id};
        if(req.query.embeddedName && req.query.embeddedVal){
            //http://stackoverflow.com/questions/8955910/mongoose-updating-embedded-document-in-array
            query[req.query.embeddedName+'._id']=req.query.embeddedVal;
            Object.keys(newVal).forEach(function(key){
                var newKey=req.query.embeddedName+'.$.'+key;
                newVal[newKey]=newVal[key];
                delete newVal[key];
            })
        }


        let setData={$set:newVal}
        if(setData.$set){
            let keys=Object.keys(setData.$set);
            keys.forEach(function(k){
                if((k=='name' || k=='desc'  || k=='textCondition'|| k=='unitOfMeasure' || k=='seo' || k=='location' || k=='humburger'
                    || k=='nameLists' || k=='bonusButtonText') && setData.$set[k]!==null){
                    setData.$set[newKeys[k]]=setData.$set[k];
                    //delete setData[k]
                }
            })
        }




        if (req.query.embeddedName && req.query.embeddedPush){
            setData={$push:{}};
            setData.$push[req.query.embeddedName]=newVal;
            //setData.$push[req.query.embeddedName]["$position"]=0;
        }
        if (req.query.embeddedName && req.query.embeddedPull){
            setData={$pull:{}};
            // name of field = $ for array consist from literal elements not objects with fields
            if(newVal['_id_id']){
                newVal['_id']=newVal['_id_id'];
                delete newVal['_id_id']
            }
            setData.$pull[req.query.embeddedName]=(newVal.$)?newVal.$:newVal;
        }
        //console.log(setData)
        req.collection.update({_id:{$in:req.body._id}},setData,{ multi: true }, function (err,result) {
            if (err) return next(err)
            res.json({id:req.body._id});
        });
    })
}

exports.delete = function(req, res, next) {
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {

        req.collection.findById(req.params.id,function(err,result){
            function deleteItem(){
                var newVal={};
                if (req.query.file){
                    if (req.query.file=='file'){
                        if (result.img  && fs.existsSync('./public/'+result.img)){
                            fs.unlink('./public/'+result.img, function (err) {
                                if (err)
                                    console.log(err)
                                else{
                                    console.log('successfully deleted '+result.img);
                                }
                            });
                        }
                        newVal.img='';
                    } else {

                        if (result[req.query.file]  && fs.existsSync('./public/'+result[req.query.file])){
                            fs.unlink('./public/'+result[req.query.file], function (err) {
                                if (err)
                                    console.log(err)
                                else{
                                    console.log('successfully deleted '+result[req.query.file]);
                                }
                            });
                        }
                        if (result['small'+req.query.file]  && fs.existsSync('./public/'+result['small'+req.query.file])){
                            fs.unlink('./public/'+result['small'+req.query.file], function (err) {
                                if (err)
                                    console.log(err)
                                else{
                                    console.log('successfully deleted '+result['small'+req.query.file]);
                                }
                            });
                        }
                        newVal[req.query.file]='';
                        newVal['small'+req.query.file]='';
                    }

                    req.collection.update({_id:req.params.id},{$set:newVal},function(err,result){
                        if (err) return next(err)
                        res.json({msg:'deleted file success'});
                    })
                } else {
                    var folder =  './public/images/'+req.collectionName+'/' + req.params.id;
                    if (fs.existsSync(folder)) {
                        rimraf(folder, function(error) {
                            if (error) return next(error);
                            // console.log('Yes')
                        });

                    }
                    try {
                        var id = new ObjectID(req.params.id);
                    } catch (err) {
                        var error = new Error('не верный id')
                        return next(id)
                    }
                    req.collection.remove({_id: id}, function(e, resultDelete){
                        //console.log('!!!!',e,resultDelete)
                        if (e) return next(e)

                        if (req.collection.postDelete && typeof req.collection.postDelete === 'function'){
                            req.collection.postDelete(result,req);
                        }
                        //console.log('ggvv')
                        res.json( {msg:'success'})
                    })
                }
            }
            if (err) return next(err)
            if (req.collection.preDelete && typeof req.collection.preDelete === 'function'){
                req.collection.preDelete(req,result,function(err){
                    if (err) return next(err);
                    deleteItem();
                });
            } else {
                deleteItem();
            }









        });

    })

}

exports.deleteArray = function(req, res, next) {

    if (!req.query){res.json( {msg:'нечего удалить'})}
    var arr=[];
    for(var i in req.query){
        arr.push(req.query[i]);
    }
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        console.log(arr);
        arr=arr.map(function(id){
            try {
                id = new ObjectID(id);
            } catch (err) {
                console.log('err-',err)
                id=id;
            }
            return id;
        })
        req.collection.remove({_id: {$in: arr}},function(err,result){
            console.log(err)
            if (err) return next(err);
            if (req.collection.postDelete && typeof req.collection.postDelete === 'function'){
                req.collection.postDelete(result,req);
            }
            res.json( {msg:'success'})
        });

    })

}


function fileUpload(folderToDB,name,tmp_path,field,dimension,link,Model,id,file){

    // для файловой системы
    var folder =  './public/' + folderToDB;
    var target_path = folder+'/img' + name;
    // для записи в поле  IMG объекта
    var target_pathDB = folderToDB+'/img' + name;
    return new Promise(function(resolveM,rejectM){
        Promise.resolve()
            .then(function(){
                return new Promise(function(resolve,reject){
                    if (!fs.existsSync(folder)) {
                        fs.mkdirParent(folder, function(error) {
                            if (error){reject(err)}
                            resolve();
                        });
                    } else{
                        resolve();
                    }
                })
            })
            .then(function(){
                return new Promise(function(resolve,reject){
                    Model.findById(id,function(err,item){
                        if (err) {return reject(err)}
                        if(!item){err=new Error('нет объекта');return reject(err)}
                        if(item && item.toObject){
                            item=item.toObject();
                        }
                        resolve(item);
                    })
                })
            })
            .then(function(item){
                return new Promise(function(resolve,reject){
                    if (field=='gallery' || field=='imgs'){resolve(item)}
                    if (item[field]  && fs.existsSync('./public/'+item[field])){
                        fs.unlink('./public/'+item[field], function (err) {
                            if (err){reject(err)}
                            resolve(item);
                        });
                    } else {
                        resolve(item);
                    }
                })
            })
            .then(function(item){
                return new Promise(function(resolve,reject){
                    fs.rename(tmp_path, target_path, function(err) {
                        try{
                            var dimensions = sizeOf(target_path);
                        }catch(err){
                            console.log(err)
                        }

                        if(err){reject(err)}
                        if(field=='img' || field=='logo'){
                            var target_path1 = folder+'/small' + name;
                            var target_pathDB1 = folderToDB+'/small' + name;
                            im.resize({
                                srcPath: target_path,
                                dstPath: target_path,
                                width:   dimension
                            }, function(err, stdout, stderr){
                                //console.log('err-',err)
                                if(err){reject(err)}
                                im.resize({
                                    srcPath: target_path,
                                    dstPath: target_path1,
                                    width:  200
                                }, function(err, stdout, stderr){
                                    if(err){reject(err)}
                                    item[field]=target_pathDB;
                                    item['small'+field]=target_pathDB1;
                                    resolve(item);

                                });
                            });
                        }else if(field=='gallery'){
                            var target_path1 = folder+'/thumb' + name;
                            var target_path2 = folder+'/thumpSmall' + name;
                            var target_pathDB1 = folderToDB+'/thumb' + name;
                            var target_pathDB2 = folderToDB+'/thumpSmall' + name;
                            im.resize({
                                srcPath: target_path,
                                dstPath: target_path,
                                width:   1400
                            }, function(err, stdout, stderr){
                                if(err){reject(err)}

                                var width=600,height=900;
                                if(dimension){
                                    if(dimensions.height<dimensions.width){
                                        var width=600,height=400;
                                    }
                                }
                                im.resize({
                                    srcPath: target_path,
                                    dstPath: target_path1,
                                    width:   width,
                                    //height:height
                                }, function(err, stdout, stderr){
                                    if(err){reject(err)}
                                    im.resize({
                                        srcPath: target_path1,
                                        dstPath: target_path2,
                                        width:   150
                                    }, function(err, stdout, stderr){
                                        if(err){reject(err)}
                                        if(!item.gallery){item.gallery=[];}
                                        var photo={
                                            img:  target_pathDB,
                                            thumb:target_pathDB1,
                                            thumbSmall:target_pathDB2,
                                            index:item.gallery.length,
                                            link:link
                                        };

                                        item.gallery.push(photo);
                                        /*item.gallery.sort(function(a,b){return a.index- b.index});
                                         item.gallery.forEach(function(photo,i){photo.index=i;})*/
                                        resolve(item);
                                    });

                                });
                            });
                        }else{
                            im.resize({
                                srcPath: target_path,
                                dstPath: target_path,
                                width:   dimension
                            }, function(err, stdout, stderr){
                                if(err){reject(err)}
                                if(field=='imgs'){
                                    if(!item[field]){item[field]=[];}
                                    item[field].push({img:target_pathDB,index:0,actived:true});
                                }else{
                                    item[field]=target_pathDB;
                                }

                                resolve(item);
                            });
                        }
                    });
                })
            })
            .then(function(item){
                //console.log(5,'-',item)
                return new Promise(function(resolve,reject){
                    var o={}
                    o[field]=item[field];
                    if(item['small'+field]){
                        o['small'+field]=item['small'+field];
                    }
                    //console.log(o)
                    Model.update({_id:item._id},{$set: o},function(err) {
                        if (err){reject(err)}
                        resolve(item);
                    });
                })
            })
            .then(function(item){

                resolveM(item[field]);
            })
            .catch(function(err){
                rejectM(err)
            })
    })
}
function setDemension(demension,req, res, next){
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function (){
        if (!req.file) {
            res.json({ msg: 'No file uploaded at ' + new Date().toString() });
        } else {
            var file = req.file;
            var name=req.file.name||req.file.originalname;
            var field=(req.body.nameImg)?req.body.nameImg:'img'
            //console.log('name-',name,req.body);
            var tmp_path = req.file.path;
            var folderToDb='images/'+req.collectionName+'/'+req.body.id;
            var link=(req.body.link)?req.body.link.substring(0,200):'';
            Promise.resolve()
                .then(function(){
                    return fileUpload(folderToDb,name,tmp_path,field,demension,link,req.collection,req.body.id);
                } )
                .then(function(result){
                    // console.log('result-',result)
                    if(field=='gallery'){
                        res.json({gallery:result})
                    }else if(field=='imgs'){
                        res.json({imgs:result})
                    }else{
                        res.json({img:result})
                    }

                } )
                .catch(function(err){
                    return next(err)
                })

        }

    });
}
exports.fileUploadSticker = function(req, res, next) {
    setDemension(80,req, res, next);
}
exports.fileUpload = function(req, res, next) {
    setDemension(600,req, res, next);
}
exports.fileUploadBig = function(req, res, next) {
    setDemension(1200,req, res, next);
}
exports.fileUploadFullImg = function(req, res, next) {
    setDemension(1920,req, res, next);
}
exports.fileUploadGallery = function(req, res,next){
    setDemension(1920,req, res, next);
    return;
    console.log(req.body)
    console.log(req.params)
    return;
    var upload=
        function () {
            if (!req.file || !req.file.size) {
                res.send({ msg: 'No file uploaded at ' + new Date().toString() });
            } else {
                var file = req.file;
                var name=req.file.name||req.file.originalname;
                console.log('name-',name)
                var tmp_path = req.file.path;
                // set where the file should actually exists - in this case it is in the "images" directory
                var folder =  './public/images/'+req.collectionName+'/' + req.body.id;
                var target_path = folder+'/' + name;
                var target_pathDest=folder+'/'  + 'img'+ name;
                var thumb_target_path = folder+'/' +'thumb'+ name;
                var thumbSmall_target_path =folder+'/' +'thumbSmall'+ name;
                var target_pathQ = '/images/'+req.collectionName+'/'+ req.body.id+'/' + 'img' +name;
                var thumb_target_pathQ = '/images/'+req.collectionName+'/'+req.body.id+'/'+'thumb'+  name;
                var thumbSmall_target_pathQ = '/images/'+req.collectionName+'/'+req.body.id+'/'+'thumbSmall'+name;



                async.series([
                    function(callback){
                        //console.log(1,req.body);
                        if (!fs.existsSync(folder)) {
                            fs.mkdirParent(folder, function(error) {
                                //console.log(error)
                                if (error) return next(error);
                                callback();
                            });
                        } else {
                            callback();
                        }
                    },
                    function(callback){
                        //console.log(2,req.body);
                        fs.rename(tmp_path, target_path, function(err) {
                            if (err) return next(err);
                            callback();
                        });
                    },
                    function(callback){
                        //console.log(44);
                        var cmd = 'convert '+target_path+' -resize 1400 '+target_pathDest;
                        //console.log(cmd);
                        exec(cmd, {encoding: 'binary', maxBuffer: 5000*1024}, function(error, stdout) {
                            console.log('error - ',error)
                            if (error) return callback(error);
                            callback();
                            //fs.writeFileSync(target_pathDest, stdout, 'binary');
                        });
                        //console.log(thumb_target_path);
                        //console.log(target_path);
                        /*gm(target_path).resize(1000).write(writeStream, function (err) {
                         if (!err) console.log(' hooray! ');
                         });*/
                        /*im.resize({
                         srcPath: target_path,
                         //dstPath: target_pathDest,
                         width:   1200,
                         maxBuffer:5000*1024,
                         timeout:500
                         },
                         function(err, stdout, stderr){
                         console.log(err);
                         //console.log(stderr);
                         if (err) return next(err);
                         fs.writeFileSync(target_pathDest, stdout, 'binary');
                         console.log('resized kittens.jpg to fit within 256x256px')
                         callback();
                         })*/


                    },
                    /* function(callback){
                     var  isd = new Imagemin()
                     .src(target_pathDest)
                     .dest(folder+'/1.jpg')
                     .use(Imagemin.jpegtran({progressive: true}))
                     .run((err, files) => {
                     console.log(files[0]);
                     callback();
                     //=> {path: 'build/images/foo.jpg', contents: <Buffer 89 50 4e ...>}
                     });

                     },*/
                    function(callback){
                        //console.log(3,req.body);
                        if (req.body.index){
                            //console.log(thumbSmall_target_path);
                            //console.log(target_path);
                            im.resize({
                                    srcPath: target_path,
                                    dstPath: thumbSmall_target_path,
                                    width:   150
                                },
                                function(err, stdout, stderr){
                                    if (err) return next(err);
                                    callback();
                                })
                        } else {callback()}
//
                    },
                    function(callback){
                        //console.log(3);
                        //console.log(thumb_target_path);
                        //console.log(target_path);
                        im.resize({
                                srcPath: target_path,
                                dstPath: thumb_target_path,
                                width:   600

                            },
                            function(err, stdout, stderr){
                                if (err) return next(err);
                                callback();
                            })
                    },

                    function(callback){
                        function getIndex(index){
                            return index || 1;
                        }
                        //console.log(5);
                        var index =getIndex(req.body.index);
                        if (!index || index=='undefined'){
                            index=1;
                        }
                        index= getIndex(index);
                        //var small= (req.body.index==100)?thumbSmall_target_pathQ:'';
                        var small= thumbSmall_target_pathQ;
                        var link=(req.body.link)?req.body.link.substring(0,200):'';
                        var gallery={
                            thumb:thumb_target_pathQ,
                            thumbSmall:small,
                            img:  target_pathQ,
                            index:index,
                            link:link
                        };
                        //console.log(index);
                        req.collection.findById(req.body.id,function(err,stuff){
                            if (err) return next (err);
                            if(!stuff.gallery) stuff.gallery=[];
                            stuff.gallery.push(gallery );
                            stuff.gallery.sort(function(a,b){return a.index- b.index});
                            //console.log(stuff.gallery);
                            req.collection.update({_id:stuff._id},{$set:{gallery:stuff.gallery}},function(err) {
                                if (err) return callback(err);
                                callback(null,stuff.gallery);
                            })
                            /*stuff.save(function(err) {
                             if (err) return(err);
                             callback(null,stuff.gallery);
                             })*/
                        })
                    }
                ], function (err, results) {
                    //console.log(6);

                    if (err)
                        return next(err)
                    else
                    //console.log(results)
                        fs.unlink(target_path, function(error) {
                            if (error) return next(error);
                            res.json({msg:"загружено!",gallery:results[5]});
                        });
                    //res.json({msg:"загружено!",gallery:results[5]});

                })

            }
        }

    var size = '';
    var fileName = '';
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
        });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
        upload();
    });
    req.pipe(busboy)

}