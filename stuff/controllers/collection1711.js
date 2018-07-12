'use strict';
var mongoose = require('mongoose');
var domain = require('domain');
var ObjectID = mongoose.Types.ObjectId;
var rimraf = require('rimraf');
var im = require('imagemagick');
var async = require('async');
var multer  =   require('multer');
var fs = require('fs');
var config={langs:['ru','uk','en','de']}
, util = require('util');
var sizeOf = require('image-size');
//var multiparty = require('multiparty');
/*var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({defer: true})*/
var Busboy = require('busboy'),
inspect = require('util').inspect;
//var fs = require('fs');
//var gm = require('gm');
var exec = require('child_process').exec;
//const Imagemin = require('imagemin');
var path = require('path');
var mime =require('mime');
var getUrl=require('./getUniqueUrl.js');
var co=require('co')
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
        var alldata;
        //console.log('req.query-',req.query)
        //console.log(req.collectionName)
        if (req.query.query && req.query.query!='{}') {
            try {
                options.criteria=JSON.parse(req.query.query);
            } catch (err) {
                //console.log(err)
                options.criteria=req.query.query;
            }
        }
        //console.log('options.criteria-',options.criteria)
        //console.log(req.query.store);
        if(!req.query.store){
            return next(new Error('не указан магазин'))
        }else{
            if(options.criteria && typeof options.criteria==='object'){
                if(options.criteria.alldata){
                    delete options.criteria.alldata;
                    alldata=true;
                }
                var keys = Object.keys(options.criteria);
                if(keys.length==0){
                    options.criteria={store:req.query.store};
                }else if(keys.length==1){
                    if(keys[0]=='$and'){
                        options.criteria.$and.push({store:req.query.store});
                    }else{
                        options.criteria={$and:[{store:req.query.store},options.criteria]}
                    }
                }else{
                    options.criteria={$and:[{store:req.query.store},options.criteria]}
                }
            }else{
                options.criteria={store:req.query.store};
            }
        }


        //console.log('criteria-',options.criteria)
        /*console.log(req.query);
        console.log(options.criteria.$and);*/
    // даты
        /*if (req.query && req.query.dtfrom && req.query.dtto){
            var start=new Date(req.query.dtfrom);
            var  end =new Date(req.query.dtto);
            var queryDate = {date: {
                $gte:start,
                $lte: end
            }};
        } else {
            var date = new Date();
            date.setDate(date.getDate() - 1);
            var from = date.setHours(0,0,0);
            var to   = date.setHours(23,59,59);
            /!*var start=new Date(from);
             var  end =new Date(to);*!/
            var queryDate = {date: {
                $gte:from,
                $lte: to
            }};
        }
        if (queryDate){
            options.dateRange=queryDate;
        }*/
        //console.log('options-',options.criteria);
        options.req=req; // какой-то хак. где-то был нужен req
        if (req.query && req.query.search){
            req.collection.search(req,function(e, results){
                if (e) return next(e)
                return res.json(results)
            })
        } else {
            if (alldata && req.collection.listAlldata){
                req.collection.listAlldata(options,function(e, results){
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
            }else{
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
            }

        }

    })
}

exports.save = function(req, res, next) {
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        if(!req.query.store){
            var error = new Error('не задан магазин')
            return next(error)
        }
        if (req.query.update){
            updateStuff()
        }else{
            createStuff()
        }
        function createStuff(){
            if (!req.body._id){
                // create new element
                //console.log('create new element')
                co(function*() {
                    if(req.body.name){
                        req.body.url = yield getUrl.create(req.collection,req.query.store,req.body.name)
                    }
                    //console.log(req.body.url); // 1
                    if (req.collection.preUpdate && typeof req.collection.preUpdate === 'function'){
                        yield req.collection.preUpdate(req);
                    }
                    let stuff = yield insert();
                    //console.log(stuff)
                    if (req.collection.postUpdate && typeof req.collection.postUpdate === 'function'){
                        yield req.collection.postUpdate(stuff);
                    }
                }).catch(function(err){
                    console.log('error in catch - ',err)
                    return next(err)
                })
            }else {
                console.log('111????')
                let err=new Error('перезапись существуюшего елемента.Воспользуйтесь update.')
                return next(err)
            }
        }
        function* insert(){
            var stuff,upsertData;
            //console.log(req.body)
            if(req.query.store){
                req.body.store=req.query.store;
            }
            stuff = new req.collection(req.body);
            upsertData = stuff.toObject();
            //console.log('ldlldld!')
            delete upsertData._id;
            if(!upsertData.store){
                upsertData.store=req.query.store;
            }
            //console.log(req.store.lang)
            upsertData.nameL={}
            upsertData.nameL[req.store.lang]=upsertData.name
            //console.log('ldlldld!')
            //console.log('upsertData-',upsertData);
            let result = yield req.collection.update({_id: stuff.id}, upsertData, {upsert: true})
            var o={id:stuff.id};
            // console.log(stuff)
            if(stuff.num){o.num=stuff.num};
            if(stuff.date){o.date=stuff.date};
            if(stuff.url){o.url=stuff.url};
            if(stuff._id){o._id=stuff._id};
            res.json(o);
            return stuff;
        }
        function updateStuff(){
            var arr = req.query.update.split(' ');
            co(function*() {
                if (req.collection.middlewareForUpdate && typeof req.collection.middlewareForUpdate === 'function'){
                    yield req.collection.middlewareForUpdate(req.body,arr);
                }
                var newVal ={};
                for (var i= 0,l=arr.length;i<l;i++){
                    if (req.body[arr[i]]|| req.body[arr[i]]==null || req.body[arr[i]]===0|| req.body[arr[i]]==='0' || req.body[arr[i]]===false || req.body[arr[i]]==''){
                        if(arr[i]=='name'){
                            if (!req.body[arr[i]]){
                                var error = new Error('название не может быть пустым')
                                throw error;
                            }
                            req.body[arr[i]]=req.body[arr[i]].substring(0,100);
                        }
                        if(arr[i]=='desc'){
                            var limit=4000;
                            if(req.collectionName=='Stat'){
                                limit=12000;
                            }
                            req.body[arr[i]]=req.body[arr[i]].substring(0,limit);
                        }
                        newVal[arr[i]]= req.body[arr[i]];
                    } else {console.log('нет - ',arr[i])}
                }
                /*console.log('newVal-',newVal)
                 console.log(req.query)*/
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
                var setData={$set:newVal};
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
                //console.log(req.collectionName,query,setData,newVal)
                /*console.log(req.collectionName,query,setData,newVal)
                return;*/



                let lang='ru';
                if(req.query.lang && config.langs.indexOf(req.query.lang)>-1){
                    lang=req.query.lang;
                }
                let newKeys={}
                newKeys.desc='descL.'+lang
                newKeys.name='nameL.'+lang
                let keys=Object.keys(setData);
                keys.forEach(function(k){
                    if(k=='name' || k=='desc'){
                        setData[newKeys[k]]=setData[k];
                        delete setData[k]
                    }
                })
                console.log(setData)
                yield req.collection.update(query,setData);
                return res.json({id:req.body._id});
            }).catch(function(err){
                console.log('error in catch - ',err)
                return next(err)
            })
        }
    })
}

exports.save3008 = function(req, res, next) {
    //console.log(req.body);
    /*console.log('********************************************************')
     console.log(req.body);
     console.log('query - ',req.query)
     return;*/
    //console.log(req.body);
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        //console.log('???????????????')
        // console.log(req.query); return next();

        function insert(){
            var stuff,upsertData;
            //console.log(req.body)
            if(req.query.store){
                req.body.store=req.query.store;
            }
            stuff = new req.collection(req.body);
            upsertData = stuff.toObject();
            //console.log('ldlldld!')
            delete upsertData._id;
            if(!upsertData.store){
                upsertData.store=req.query.store;
            }
            //console.log('ldlldld!')
            //console.log('upsertData-',upsertData);
            req.collection.update({_id: stuff.id}, upsertData, {upsert: true}, function (err,result) {
                //console.log(err)
                if (err) return  next(err)
                //если комментарий то вставляем ссылку на id thread parent-а
                if (req.collection.postUpdate && typeof req.collection.postUpdate === 'function'){
                    req.collection.postUpdate(stuff);
                }
                var o={id:stuff.id};
                // console.log(stuff)
                if(stuff.num){o.num=stuff.num};
                if(stuff.date){o.date=stuff.date};
                if(stuff.url){o.url=stuff.url};
                if(stuff._id){o._id=stuff._id};

                res.json(o);
            })
        }
        // todo убрать в модель комментариев
        if (req.collectionName=="Comment" && req.body.text){
            req.body.text=req.body.text.substring(0,500);
        }

        function updateStuff(id,newVal,cb){
            req.collection.update({_id:id},{$set:newVal}, function (err,result) {
                if (err) return  next(err)
                //console.log(result);
                cb(null,{id:req.body._id})
            })
        }
        //console.log('query - ',req.query)
        if (req.query.update){

            var arr = req.query.update.split(' ');

            //console.log(req.query.retail,req.query.price);
            if (req.query.retail || req.query.price){
                var newPr={};
                var plus= JSON.parse(req.query.plus)
                var sum= JSON.parse(req.query.sum);
                //console.log(plus);
                newPr['retail'] = parseFloat(req.query.retail);
                newPr['price'] = parseFloat(req.query.price);
                // работа с группой товаров
                //console.log('работа с группой товаров');
                req.collection.find({_id:{$in:req.body}})
                    .exec(function(err,docs){
                        //console.log(docs);
                        if (err) return next(err);
                        async.each(docs,function(el,callback){
                            //console.log(el);
                            newVal={};
                            for (var i= 0,l=arr.length;i<l;i++){
                                if (el[arr[i]]) {
                                    if (sum){
                                        if (plus){
                                            newVal[arr[i]]= el[arr[i]]+newPr[arr[i]];
                                        } else {
                                            newVal[arr[i]]= el[arr[i]]-newPr[arr[i]];
                                        }
                                    } else {
                                        if (plus){
                                            //console.log(Math.round((el[arr[i]]*newPr[arr[i]])/100));
                                            newVal[arr[i]]= el[arr[i]]+Math.round((el[arr[i]]*newPr[arr[i]])/100);
                                        } else {
                                            newVal[arr[i]]= el[arr[i]]-Math.round((el[arr[i]]*newPr[arr[i]])/100);
                                        }
                                    }


                                }
                            }

                            updateStuff(el._id,newVal,function(){
                                // console.log(newVal);
                                callback();
                            });
                        },function(err){
                            res.json({msg:'ok'})
                        })
                        //console.log(res);
                    })
            } else {
                Promise.resolve()
                    .then(function(){
                        if(req.collection.middlewareForUpdate && typeof req.collection.middlewareForUpdate=='function'){
                            return req.collection.middlewareForUpdate(req.body,arr)
                        }else{
                            return;
                        }
                    })
                    .then(function(){
                        var newVal ={};
                        for (var i= 0,l=arr.length;i<l;i++){
                            if (req.body[arr[i]]|| req.body[arr[i]]==null || req.body[arr[i]]===0|| req.body[arr[i]]==='0' || req.body[arr[i]]===false || req.body[arr[i]]==''){
                                if(arr[i]=='name'){
                                    if (!req.body[arr[i]]){
                                        var error = new Error('название не может быть пустым')
                                        return next(error)
                                    }
                                    req.body[arr[i]]=req.body[arr[i]].substring(0,100);
                                }
                                if(arr[i]=='desc'){
                                    var limit=4000;
                                    if(req.collectionName=='Stat'){
                                        limit=12000;
                                    }
                                    req.body[arr[i]]=req.body[arr[i]].substring(0,limit);
                                }
                                newVal[arr[i]]= req.body[arr[i]];
                            } else {console.log('нет - ',arr[i])}
                        }
                        /*console.log('newVal-',newVal)
                         console.log(req.query)*/
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
                        var setData={$set:newVal};
                        if (req.query.embeddedName && req.query.embeddedPush){
                            setData={$push:{}};
                            setData.$push[req.query.embeddedName]=newVal;
                            //setData.$push[req.query.embeddedName]["$position"]=0;
                        }
                        if (req.query.embeddedName && req.query.embeddedPull){
                            setData={$pull:{}};
                            // name of field = $ for array consist from literal elements not objects with fields
                            setData.$pull[req.query.embeddedName]=(newVal.$)?newVal.$:newVal;
                        }
                        //console.log(req.collectionName,query,setData,newVal)
                        //return;
                        req.collection.update(query,setData, function (err,result) {
                            if (err) return next(err)
                            console.log(result)
                            res.json({id:req.body._id});
                        });
                    })
            }
        } else {
            if (req.collection.preUpdate && typeof req.collection.preUpdate === 'function'){
                req.collection.preUpdate(req,function(err,res){
                    //console.log('??????????')
                    if (err) return next(err);
                    insert();
                });
            } else {
                insert();
            }
        }


    })
}
exports.get = function(req, res, next) {
    //console.log(req.params);
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });

    d.run(function () {
        if (!req.params.id) return next();
        if (!req.query.store){
            var error = new Error('не определен домен')
            return next(error);}
        var idarr=req.params.id.split('.' ),id=req.params.id;
        if (idarr.length>1){
            id=req.params.id;
        }else{
            try {
                id = new ObjectID(id);
            } catch (err) {
                id=req.params.id;
            }
        }
        //console.log(req.params.id,id)



        if (typeof  id =='object'){
            var query ={$or:[{_id:id},{url:req.params.id}]}
        }else{
            var query ={url:id}
        }
        query={$and:[query,{store:req.query.store}]}
        //console.log(query)
        req.collection.load(query, function(e, result){
            //console.log(e,result);
            if (e) return next(e)
            if (result){
                //console.log('send result')
                res.name=res.nameL[req.store.lang];
                res.desc=res.descL[req.store.lang];
                return res.send(result);
            } else {
                return res.sendStatus(404)
                console.log('send 404 ',req.headers.host)
                return;
            }

        },req)
    })
}

/*exports.update = function(req, res, next) {
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {

        req.collection.update({_id: new ObjectID(req.params.id)},
            {$set: req.body},
            {safe: true, multi: false}, function(e, result){
                if (e) return next(e)
                res.send((result === 1) ? {msg:'success'} : {msg:'error'})
            })
    })
}*/

exports.delete = function(req, res, next) {
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        //return next('гонква')
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
        // console.log(arr);
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
    //console.log('folderToDB-',folderToDB)
    // для файловой системы
    var folder =  './public/' + folderToDB;
    var target_path = folder+'/img' + name;
    // для записи в поле  IMG объекта
    var target_pathDB = folderToDB+'/img' + name;
    return new Promise(function(resolveM,rejectM){
        Promise.resolve()
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
                //console.log(2)
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
                //console.log(item)
                return new Promise(function(resolve,reject){
                    if (field=='gallery' || field=='imgs'){resolve(item)}
                    if (item[field]  && fs.existsSync('./public/'+item[field])){
                        //console.log('./public/'+item[field])
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
                //console.log(4)
                return new Promise(function(resolve,reject){
                    fs.rename(tmp_path, target_path, function(err) {
                        var dimensions = sizeOf(target_path);
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

                            console.log(dimensions)
                            im.resize({
                                srcPath: target_path,
                                dstPath: target_path,
                                width:   1400
                            }, function(err, stdout, stderr){
                                if(err){reject(err)}

                                console.log(dimensions.width, dimensions.height);
                                if(dimensions.height>dimensions.width){
                                    var width=600,height=900;
                                }else{
                                    var width=600,height=400;
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

                                //console.log('item[field]-',item[field])
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
                //console.log(6)
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

exports.videoUpload = function(req, res, next){

    var folder='images/'+req.collectionName+'/'+req.body.id;
    var suffix=Date.now();
    var name=req.file.name||req.file.originalname;
    name=suffix + '-' + name;
    /*var storage =   multer.diskStorage({
        destination: function (req, file, callback) {

            callback(null, 'public/'+folder);
        },
        filename: function (req, file, callback) {
            callback(null, suffix + '-' + file.fieldname+'.' + mime.extension(file.mimetype));
        }
    });*/
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            var folder='images/'+req.collectionName+'/'+req.body.id;

            callback(null, 'public/'+folder);
        },
        filename: function (req, file, callback) {
            var suffix=Date.now();
            callback(null, suffix + '-' + file.fieldname+'.' + mime.extension(file.mimetype));
        }
    });
    //var upload = multer({ dest : 'public/'+folder}).single('video');

    /*var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/videos/')
        },
        filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
            });
        }
    });*/
    var upload = multer({ storage: storage } ).single('video');





    //console.log(req.body);
    var folderPath='public/'+folder;
    var fileName;
    var field=req.body.nameImg;
    var id=req.body.id;
    upload(req,res,function(err,result) {
        console.log(req.file)
        fileName=Date.now() + '.' + mime.extension(req.file.mimetype)
        Promise.resolve()
            .then(function(){
                //console.log(1)
                return new Promise(function(resolve,reject){
                    if (!fs.existsSync(folderPath)) {
                        //console.log('!fs.existsSync(folder)')
                        fs.mkdirParent(folderPath, function(error) {
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
                //console.log(2)
                return new Promise(function(resolve,reject){
                    req.collection.findOne({_id:id},function(err,item){
                        if (err) {return reject(err)}
                        //console.log(item)
                        if(!item){err=new Error('нет объекта');return reject(err)}
                        if(item && item.toObject){
                            item=item.toObject();
                        }
                        resolve(item);
                    })
                })
            })
            .then(function(item){
                //console.log(item)

                return new Promise(function(resolve,reject){
                    if (item[field]  && fs.existsSync('./public/'+item[field])){
                        //console.log('./public/'+item[field])
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
                //console.log(4)
                return new Promise(function(resolve,reject){
                    fs.rename(req.file.path,folderPath+'/'+fileName, function(err) {
                        if(err){reject(err)}
                        item[field]=folder+'/'+fileName
                        resolve(item)
                    })
                })
            })
            .then(function(item){
                //console.log(5,'-',item)
                return new Promise(function(resolve,reject){
                    var o={}
                    o[field]=item[field];
                    req.collection.update({_id:item._id},{$set: o},function(err) {
                        if (err){reject(err)}
                        resolve(item);
                    });
                })
            })
            .then(function(item){
                res.json({img:item[field]});
            })
            .catch(function(err){
                console.log(err)
                return next(err)
            })

    });

}


function fileUpload3101(dimension,req,res,next){
    //console.log(dimension)
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        var stuff;
        //console.log('req.file-',req.file)
        console.log('req.bod!!!!!!!!!!!!!!!!y-',req.body)
        if (!req.file) {
            res.json({ msg: 'No file uploaded at ' + new Date().toString() });
        } else {
            var file = req.file;
            var name=req.file.name||req.file.originalname;
            console.log('name-',name)

            var tmp_path = req.file.path;
            var browserFolder =  'images/'+req.collectionName+'/' + req.body.id;
            // set where the file should actually exists - in this case it is in the "images" directory
            var folder =  './public/images/'+req.collectionName+'/' + req.body.id;
            var target_path = folder+'/' + name;
            // для записи в поле  IMG объекта
            var target_pathQ = browserFolder+'/' + name;
            //console.log(tmp_path,target_path)
            //console.log(req.collectionName)
            Promise.resolve()
                .then(function(){
                    //console.log(1)
                    return new Promise(function(resolve,reject){
                        if (!fs.existsSync(folder)) {
                            fs.mkdirParent(folder, function(error) {
                                if (error){throw err;reject(err)}
                                resolve();
                            });
                        } else{
                            resolve();
                        }
                    })
                })
                .then(function(){
                    //console.log(2)
                    return new Promise(function(resolve,reject){
                        req.collection.findById(req.body.id,function(err,item){
                            if (err) {throw err;reject(err)}
                            resolve(item);
                        })
                    })
                })
                .then(function(item){
                    //console.log(item)
                    return new Promise(function(resolve,reject){
                        if (item[req.body.nameImg]  && fs.existsSync('./public/'+item[req.body.nameImg])){
                            fs.unlink('./public/'+item[req.body.nameImg], function (err) {
                                if (err){throw err;reject(err)}
                                resolve(item);
                            });
                        } else {
                            resolve(item);
                        }
                    })
                })
                .then(function(item){
                    //console.log(4)
                    return new Promise(function(resolve,reject){
                        fs.rename(tmp_path, target_path, function(err) {
                            if(err){throw err;reject(err)}
                            im.resize({
                                srcPath: target_path,
                                dstPath: target_path,
                                width:   dimension
                            }, function(err, stdout, stderr){
                                if(err){throw err;reject(err)}
                                resolve(item);
                            });

                        });
                    })
                })
                .then(function(item){
                    //console.log(5)
                    return new Promise(function(resolve,reject){
                        //item[req.body.nameImg]=target_pathQ;
                        var o={}
                        o[req.body.nameImg]=target_pathQ;
                        req.collection.update({_id:item._id},{$set: o},function(err) {
                            if (err){throw err;reject(err)}
                            resolve();
                        });
                    })
                })
                .then(function(item){
                    //console.log(6)
                    res.json({img:target_pathQ});
                })
                .catch(function(err){
                    next(err)
                })

            /*async.series([
             function(callback){
             req.collection.findById(req.body.id,function(err,result){
             console.log('err-',err)
             if (err)
             callback(err);
             else{
             stuff = result;
             callback(null);
             }
             })

             },
             function(callback){
             if (!fs.existsSync(folder)) {
             fs.mkdirParent(folder, function(error) {
             if (error)
             callback(error);
             else
             callback(null);
             });
             } else
             callback(null);
             },
             function(callback){
             console.log('stuff-',stuff);
             if (stuff[req.body.nameImg]  && fs.existsSync('./public/'+stuff[req.body.nameImg])){
             fs.unlink('./public/'+stuff[req.body.nameImg], function (err) {
             if (err)
             console.log(err)
             else{
             console.log('successfully deleted '+stuff[req.body.nameImg]);
             }
             callback(null);
             });
             } else
             callback(null);

             },
             function(callback){
             fs.rename(tmp_path, target_path, function(err) {
             console.log('err-',err)
             if (err)
             callback(err);
             im.resize({
             srcPath: target_path,
             dstPath: target_path,
             width:   dimension
             }, function(err, stdout, stderr){
             if (err)
             callback(err);
             else
             callback(null);
             });

             });

             },
             function(cb){
             stuff[req.body.nameImg]=target_pathQ;
             stuff.save(function(err) {
             if (err) { cb(err); }
             else
             cb(null)
             });
             }
             ], function (err, results) {
             if (err)
             return next(err)
             else
             res.json({img:target_pathQ});
             })*/
        }

    })
}

exports.fileUpload3101 = function(req, res, next) {
    fileUpload(600,req,res,next)
    return;
    // console.log(req.body);
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        var stuff;
        setTimeout(
            function () {
                if (!req.file || !req.file.size) {
                    res.send({ msg: 'No file uploaded at ' + new Date().toString() });
                } else {
                    var file = req.file;
                    var tmp_path = req.file.path;
                    // set where the file should actually exists - in this case it is in the "images" directory
                    var folder =  './public/images/'+req.collectionName+'/' + req.body.id;
                    var target_path = folder+'/' + req.file.name;
                    // для записи в поле  IMG объекта
                    var target_pathQ = '/images/'+req.collectionName+'/'+ req.body.id+'/' + req.file.name;


                    async.series([
                        function(callback){
                            req.collection.findById(req.body.id,function(err,result){
                                if (err)
                                    callback(err);
                                else{
                                    stuff = result;
                                    callback(null);
                                }
                            })

                        },
                        function(callback){
                            if (!fs.existsSync(folder)) {
                                fs.mkdirParent(folder, function(error) {
                                    console.log(error)
                                    if (error)
                                        callback(error);
                                    else
                                        callback(null);
                                });
                            } else
                                callback(null);
                        },

                        function(callback){
                            // console.log(stuff);
                            if (stuff.img  && fs.existsSync('./public/'+stuff.img)){
                                fs.unlink('./public/'+stuff.img, function (err) {
                                    if (err)
                                        console.log(err)
                                    else{
                                        console.log('successfully deleted '+stuff.img);
                                    }
                                    callback(null);
                                });
                            } else
                                callback(null);

                        },


                        function(callback){
                            fs.rename(tmp_path, target_path, function(err) {
                                if (err)
                                    callback(err);
                                im.resize({
                                    srcPath: target_path,
                                    dstPath: target_path,
                                    width:   600
                                }, function(err, stdout, stderr){
                                    if (err)
                                        callback(err);
                                    else
                                        callback(null);
                                });

                            });

                        },

                        function(cb){
                            stuff.img=target_pathQ;
                            stuff.save(function(err) {
                                if (err) { cb(err); }
                                else
                                    cb(null)
                            });
                        }
                    ], function (err, results) {
                        if (err)
                            return next(err)
                        else
                            res.json({img:stuff.img});
                    })
                }
            },
            (req.param('delay', 'yes') == 'yes') ? 200 : -1
        );
    })


}

exports.fileUploadSticker3101 = function(req, res, next) {
    fileUpload(80,req,res,next)
}
exports.fileUploadBig3101 = function(req, res, next) {
    //console.log(req.body); return;
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        var stuff;
        console.log('req.file-',req.file)
        console.log('req.bod!!!!!!!!!!!!!!!!y-',req.body)
        if (!req.file) {
            res.json({ msg: 'No file uploaded at ' + new Date().toString() });
        } else {
            var file = req.file;
            var name=req.file.name||req.file.originalname;
            console.log('name-',name)

            var tmp_path = req.file.path;
            var browserFolder =  'images/'+req.collectionName+'/' + req.body.id;
            // set where the file should actually exists - in this case it is in the "images" directory
            var folder =  './public/images/'+req.collectionName+'/' + req.body.id;
            var target_path = folder+'/' + name;
            // для записи в поле  IMG объекта
            var target_pathQ = browserFolder+'/' + name;
            console.log(tmp_path,target_path)
            async.series([
                function(callback){
                    req.collection.findById(req.body.id,function(err,result){
                        console.log('err-',err)
                        if (err)
                            callback(err);
                        else{
                            stuff = result;
                            callback(null);
                        }
                    })

                },
                function(callback){
                    if (!fs.existsSync(folder)) {
                        fs.mkdirParent(folder, function(error) {
                            if (error)
                                callback(error);
                            else
                                callback(null);
                        });
                    } else
                        callback(null);
                },
                function(callback){
                    console.log(stuff);
                    if (stuff[req.body.nameImg]  && fs.existsSync('./public/'+stuff[req.body.nameImg])){
                        fs.unlink('./public/'+stuff[req.body.nameImg], function (err) {
                            if (err)
                                console.log(err)
                            else{
                                console.log('successfully deleted '+stuff[req.body.nameImg]);
                            }
                            callback(null);
                        });
                    } else
                        callback(null);

                },
                function(callback){
                    fs.rename(tmp_path, target_path, function(err) {
                        console.log('err-',err)
                        if (err)
                            callback(err);
                        im.resize({
                            srcPath: target_path,
                            dstPath: target_path,
                            width:   1200
                        }, function(err, stdout, stderr){
                            if (err)
                                callback(err);
                            else
                                callback(null);
                        });

                    });

                },
                function(cb){
                    stuff[req.body.nameImg]=target_pathQ;
                    stuff.save(function(err) {
                        if (err) { cb(err); }
                        else
                            cb(null)
                    });
                }
            ], function (err, results) {
                if (err)
                    return next(err)
                else
                    res.json({img:stuff[req.body.nameImg]});
            })
        }

    })


}
exports.fileUploadFullImg3001 = function(req, res, next) {
    //console.log(req.body); return;
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        var stuff;
        setTimeout(
            function () {
                if (!req.file || !req.file.size) {
                    res.send({ msg: 'No file uploaded at ' + new Date().toString() });
                } else {
                    var file = req.file;
                    var tmp_path = req.file.path;
                    // set where the file should actually exists - in this case it is in the "images" directory
                    var folder =  './public/images/'+req.collectionName+'/' + req.body.id;
                    var target_path = folder+'/' + req.file.name;
                    // для записи в поле  IMG объекта
                    var target_pathQ = '/images/'+req.collectionName+'/'+ req.body.id+'/' + req.file.name;

                    async.series([
                        function(callback){
                            req.collection.findById(req.body.id,function(err,result){
                                if (err)
                                    callback(err);
                                else{
                                    stuff = result;
                                    callback(null);
                                }
                            })

                        },
                        function(callback){
                            if (!fs.existsSync(folder)) {
                                fs.mkdirParent(folder, function(error) {
                                    if (error)
                                        callback(error);
                                    else
                                        callback(null);
                                });
                            } else
                                callback(null);
                        },
                        function(callback){
                            //console.log(stuff);
                            if (stuff[req.body.nameImg]  && fs.existsSync('./public/'+stuff[req.body.nameImg])){
                                fs.unlink('./public/'+stuff[req.body.nameImg], function (err) {
                                    if (err)
                                        console.log(err)
                                    else{
                                        console.log('successfully deleted '+stuff[req.body.nameImg]);
                                    }
                                    callback(null);
                                });
                            } else
                                callback(null);

                        },
                        function(callback){
                            fs.rename(tmp_path, target_path, function(err) {
                                if (err)
                                    callback(err);
                                im.resize({
                                    srcPath: target_path,
                                    dstPath: target_path,
                                    width:   1920
                                }, function(err, stdout, stderr){
                                    if (err)
                                        callback(err);
                                    else
                                        callback(null);
                                });

                            });

                        },
                        function(cb){
                            stuff[req.body.nameImg]=target_pathQ;
                            stuff.save(function(err) {
                                if (err) { cb(err); }
                                else
                                    cb(null)
                            });
                        }
                    ], function (err, results) {
                        if (err)
                            return next(err)
                        else
                            res.json({img:stuff[req.body.nameImg]});
                    })
                }
            },100

        );
    })


}


exports.fileUploadGallery3101 = function(req, res,next){
    //var form = new multiparty.Form({defer: true});
    //console.log('***********************************************')
    //console.log(req.body);
    //console.log('***********************************************')
    //res.send(200)
    var stuff;
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

exports.fileGalleryDelete = function(req, res,next){
    //console.log('req.params-',req.params);
    var id = req.params.id;
    var photo,
        photoId = req.params.idImage;

    req.collection.findById(id,function(err,stuff){
        if (err) { next(err);}
        //console.log(cake);
        if(stuff.gallery) {
            photo = stuff.gallery.id(photoId);
            //console.log(photo);
            var thumbfile = (photo.thumb)?'./public'+photo.thumb:null;
            var imgfile =  (photo.img)?'./public'+photo.img:null;
            var imgSmall =  (photo.thumbSmall)?'./public'+photo.thumbSmall:null;


            if (thumbfile){
                fs.unlink(thumbfile, function (err) {
                    if (err)
                        console.log(err)
                    else
                        console.log('successfully deleted '+photo.thumb);
                });
            }
            if(imgfile){
                fs.unlink(imgfile, function (err) {
                    if (err)
                        console.log(err)
                    else
                        console.log('successfully deleted '+photo.img);
                });
            }
            if(imgSmall){
                fs.unlink(imgSmall, function (err) {
                    if (err)
                        console.log(err)
                    else
                        console.log('successfully deleted '+photo.img);
                });
            }

            stuff.gallery.id(photoId).remove();
            stuff.save(function(err) {
                if (err){ next(err)}
                res.json({msg:'удалено!',gallery:stuff.gallery});

            })
        } else
            res.json({msg:'нечего удалять!!'});

    })


}

exports.fileDeleteFromImgs=function(req,res,next){
    var admin=false,seller=null;
    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
                if(!req.body.file || !req.body._id){
                    var err = new Error('нечего удалять')
                    reject(err);
                }else{resolve()}
            })
        } )//нечего удалять
        /*.then(function(){
            return new Promise(function(resolve,reject){
                if(!req.user){
                    err = new Error('необходима авторизация')
                    reject(err);
                }else{resolve()}
            })
        } )//необходима авторизация
        .then(function(){
            return new Promise(function(resolve,reject){
                var owners=req.store.owner.map(function(el){
                    if(el.toString()){return el.toString()}else{return el;}
                })
                if(owners.indexOf(req.user._id.toString())>-1){
                    admin=true;
                    resolve(admin)
                }else{
                    err = new Error('необходима авторизация for Store')
                    reject(err);
                }
            })
        }) //необходима авторизация for Store
        .then(function(){
            return new Promise(function(resolve,reject){
                resolve()
            })

        })*/
        .then(function(){
            //проверка прав
            return new Promise(function(resolve,reject){
                // обратить внимание не _id, а id  так как _ID занят под параметр deleteFilesFromStuff
                var query={_id:req.body.id};
                req.collection.findOne(query,function(err,stuff){
                    if(err){return reject(err) };
                    if(!stuff){
                        err = new Error('нет такого stuff')
                        reject(err);
                    }
                    resolve(stuff.imgs)
                })
            })
        } )
        .then(function(imgs){
            return new Promise(function(resolve,reject){
                imgs=imgs.map(function(i){
                    return i.img;
                } )
                if (imgs.indexOf(req.body.file)<0){
                    var err = new Error('файд не принадлежит товару')
                    reject(err);
                }else{
                    resolve(req.body.file);
                }

            })
        } )
        .then(function(file){
            //console.log('start deleting - ',file)
            return new Promise(function(resolve,reject){
                if (fs.existsSync('./public/'+file)){
                    //console.log('./public/',file)
                    Promise.resolve()
                        .then(function(){
                            return new Promise(function(resolve1,reject1){
                                fs.unlink('./public/'+file, function (err) {
                                    if (err){ return reject1(err)}
                                    console.log('deleted ',file)
                                    resolve1()
                                });
                            })
                        } )
                        .then(function(){
                            resolve();
                        } )
                        .catch(function(err){
                            reject(err);
                        })

                }else{
                    resolve()
                }
            })

    })
        .then(function(){
            res.json({})
        })
        .catch(function(err){
        next(err)
    })

}





exports.updateGallery = function(req, res,next) {
    /*console.log('ddddd');
   console.log(req.params);*/
    var id = req.params.id;
    var gallery = req.body.gallery;
    req.collection.findById(id,function(err,stuff){
        /*console.log(stuff);
        console.log(err)*/
        if (err) next(err);
        if (stuff){
            req.collection.update({_id:stuff._id},{$set:{gallery:gallery}},function(err){
                if (err) next(err);
                res.json({msg:'обновлено',gallery:gallery});
            })
            /*stuff.gallery=gallery;
            stuff.save(function(err){
                if (err) next(err);
                res.json({msg:'обновлено',gallery:gallery});
            });*/
            // stop here, otherwise 404
        } else {
            // send 404 not found
            res.json({msg:'нет объекта в базе'});
        }
    })
}


exports.copyfile=function(req,res,next){
    if(!req.body || !req.body.fileSrc || !req.body.fieldName){
        var err=new Error('нечего или некуда копировать')
        return next()
    }
    var file=req.body.fileSrc.split('/')
    var folder='images/'+req.collectionName+'/'+req.body._id;

    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
                if (!fs.existsSync('./public/'+folder)) {
                    //console.log('!fs.existsSync(folder)')
                    fs.mkdirParent('./public/'+folder, function(error) {
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
            var filePath=folder+'/'+file[file.length-1];
            //console.log('filePath- ',filePath);
            var stream = fs.createReadStream('./public/'+req.body.fileSrc).pipe(fs.createWriteStream('./public/'+filePath));
            stream.on('finish', function () {
                //console.log('finish')
                var o={};
                o[req.body.fieldName]=filePath;
                //console.log(o)
                req.collection.update({_id:req.body._id},{$set:o},function(err){
                    if (err) next(err);
                    res.json({id:req.body._id});
                })
            });
        })


}


///////////////////////////////

exports.deleteFilesFromStuff=function(req,res,next){
    console.log(req.body);
    var admin=false,seller=null;
    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
                if(!req.body.files ||!req.body.files.length || !req.body._id){
                    var err = new Error('нечего удалять')
                    reject(err);
                }else{resolve()}
            })
        })
        /*.then(function(){
            return new Promise(function(resolve,reject){
                if(!req.user){
                    var err = new Error('необходима авторизация')
                    reject(err);
                }else{resolve()}
            })
        })*/
        /*.then(function(){
            var owners=req.store.owner.map(function(el){
                if(el.toString()){return el.toString()}else{return el;}
            })
            if(owners.indexOf(req.user._id.toString())>-1){
                admin=true;
                seller=req.store.seller._id.toString();;
            }
            return;
        })*/

        .then(function(){
            //проверка прав
            return new Promise(function(resolve,reject){
                // обратить внимание не _id, а id  так как _ID занят под параметр deleteFilesFromStuff
                var query={_id:req.body.id};
                console.log(query)
                req.collection.findOne(query,function(err,stuff){
                    //console.log(stuff)
                    if(err){return reject(err)};
                    if(!stuff){
                        err = new Error('нет такого товара или товар не соответствует продавцу')
                        reject(err);
                    }else{
                        //console.log(stuff)
                        resolve(stuff.gallery)
                    }

                    /*if(stuff.seller && stuff.seller.toString!=seller){
                     resolve(stuff.gallery)
                     } else{
                     err = new Error('товар не соответствует продавцу')
                     reject(err)
                     }*/
                })
            })
        } ).then(function(gallery){
        return new Promise(function(resolve,reject){
            gallery=gallery.map(function(g){
                var arr = [];
                if(g.img){arr.push( g.img)}
                if(g.thumb){arr.push( g.thumb)}
                if(g.thumbSmall){arr.push( g.thumbSmall)}
                return arr;
            } ).reduce(function(arr,item){
                if(item.length){
                    item.forEach(function(el){arr.push(el)})
                    return arr;
                }
            },[])
            //console.log(gallery);
            req.body.files.forEach(function(file){
                if (gallery.indexOf(file)<0){
                    err = new Error('файд не принадлежит товару')
                    reject(err);
                }
            })
            resolve();
        })
    } ).then(function(){
        console.log('start deleting')
        var actions=req.body.files.map(function(file){
            return new Promise(function(resolve,reject){
                console.log(file)
                if (fs.existsSync('./public'+file)){
                    console.log('./public',file)
                    Promise.resolve().then(function(){
                        return new Promise(function(resolve1,reject1){
                            fs.unlink('./public'+file, function (err) {
                                if (err){reject1(err)}
                                console.log('deleted ',file)
                                resolve1()
                            });
                        })
                    } ).then(function(){
                        resolve();
                    } ).catch(function(err){
                        reject(err);
                    })

                }else{
                    resolve()
                }
            })
        })
        return new Promise(function(resolve,reject){
            Promise.all(actions).then(function(){resolve()}).catch(function(err){reject(err)})
        })
    }).then(function(){
        res.json({})
    }).catch(function(err){
        next(err)
    })

}


exports.deleteSlideImage=function(req,res,next){
    var admin=false,seller=null;
    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
                if(!req.body.file || !req.body._id){
                    err = new Error('нечего удалять')
                    reject(err);
                }else{resolve()}
            })
        } )//нечего удалять
        /*.then(function(){
            return new Promise(function(resolve,reject){
                if(!req.user){
                    err = new Error('необходима авторизация')
                    reject(err);
                }else{resolve()}
            })
        } )*///необходима авторизация
        /*.then(function(){
            return new Promise(function(resolve,reject){
                var owners=req.store.owner.map(function(el){
                    if(el.toString()){return el.toString()}else{return el;}
                })
                if(owners.indexOf(req.user._id.toString())>-1){
                    admin=true;
                    resolve(admin)
                }else{
                    err = new Error('необходима авторизация for Store')
                    reject(err);
                }
            })
        })*/ //необходима авторизация for Store
        .then(function(){
            return new Promise(function(resolve,reject){
                resolve()
            })

        })
        .then(function(){
            //проверка прав
            return new Promise(function(resolve,reject){
                var query={_id:req.body._id}
                req.collection.findOne(query,function(err,homePage){
                    if(err){return reject(err) };
                    if(!homePage){
                        err = new Error('нет такого homepage')
                        reject(err);
                    }
                    resolve(homePage.imgs)
                })
            })
        } ).then(function(imgs){
        return new Promise(function(resolve,reject){
            imgs=imgs.map(function(i){
                return i.img;
            } )
            if (imgs.indexOf(req.body.file)<0){
                var err = new Error('файд не принадлежит товару')
                reject(err);
            }else{
                resolve(req.body.file);
            }

        })
    } ).then(function(file){
        //console.log('start deleting - ',file)
        return new Promise(function(resolve,reject){
            if (fs.existsSync('./public'+file)){
                //console.log('./public',file)
                Promise.resolve()
                    .then(function(){
                        return new Promise(function(resolve1,reject1){
                            fs.unlink('./public'+file, function (err) {
                                if (err){ return reject1(err)}
                                console.log('deleted ',file)
                                resolve1()
                            });
                        })
                    } )
                    .then(function(){
                        resolve();
                    } )
                    .catch(function(err){
                        reject(err);
                    })

            }else{
                resolve()
            }
        })

    }).then(function(){
        res.json({})
    }).catch(function(err){
        next(err)
    })

}


