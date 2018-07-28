'use strict';
var mongoose = require('mongoose')//.set('debug', true);;
mongoose.Promise = global.Promise;
var domain = require('domain');
var ObjectID = mongoose.Types.ObjectId;
var rimraf = require('rimraf');
var fs = require('fs');
var co=require('co');
var config={langs:['ru','uk','en','de','es']}



var path = require('path');
var mime =require('mime');
var getUrl=require('./getUniqueUrl.js');

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

exports.get = function(req, res, next) {
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
        let lang='ru';
        if(req.query.lang && config.langs.indexOf(req.query.lang)>-1){
            lang=req.query.lang;
        }else if(req.store.lang){
            lang=req.store.lang
        }
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
        if (typeof  id =='object'){
            var query ={$or:[{_id:id},{url:req.params.id}]}
        }else{
            var query ={url:id}
        }

        query={$and:[query,{store:req.query.store}]}
        req.collection.load(query, function(e, result){
            if (e) return next(e)
            if (result){
                return res.send(result);
            } else {
                return res.sendStatus(404)
                console.log('send 404 ',req.headers.host)
                return;
            }

        },req)
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
        var perPage = (req.query.perPage && parseInt(req.query.perPage)>0)?parseInt(req.query.perPage):500;
        var options = {
            perPage: perPage,
            page: page,
            criteria:null,
            lang:req.store.lang
        }
        var alldata;
        if (req.query.query && req.query.query!='{}') {
            try {
                options.criteria=JSON.parse(req.query.query);
            } catch (err) {
                console.log(err)
                console.log('req.query.query')
                console.dir(req.query.query)
                options.criteria=req.query.query;
            }
        }
        if(!req.query.store){
            return next(new Error('не указан магазин'))
        }else{
            if(options.criteria && typeof options.criteria==='object'){
                var keys = Object.keys(options.criteria);
                if(keys.length==0){
                    options.criteria={store:req.query.store};
                }else if(keys.length==1){
                    if(keys[0]=='$and'){
                        options.criteria.$and.push({store:req.query.store});
                    }else if(keys[0]=='store'){
                        //options.criteria={$and:[{store:req.query.store},options.criteria]}
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
        options.req=req; // какой-то хак. где-то был нужен req
        //console.log(req.query)
        if (req.query && req.query.search && req.collection.searchList){
            options.perPage=50;
            options.searchStr= req.query.search
            req.collection.searchList(options,function(e, results){
                if (e) return next(e)
                return res.json(results)
            })
        } else {
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
                try {
                    var id = new ObjectID(req.params.id);
                } catch (err) {
                    var error = new Error('не верный id')
                    return next(id)
                }
                req.collection.remove({_id: id}, function(e, resultDelete){

                    if (e) return next(e)

                    if (req.collection.postDelete && typeof req.collection.postDelete === 'function'){
                        req.collection.postDelete(result,req);
                    }
                    res.json( {msg:'success'})
                })
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
    var arr=req.query.ids.split('_');
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {

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
            if (err) return next(err);
            if (req.collection.postDelete && typeof req.collection.postDelete === 'function'){
                req.collection.postDelete(result,req);
            }
            res.json( {msg:'success'})
        });

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

                co(function*() {
                    if(req.body.name){
                        req.body.url = yield getUrl.create(req.collection,req.query.store,req.body.name,req.collectionName)
                    }

                    if (req.collection.preUpdate && typeof req.collection.preUpdate === 'function'){
                        yield req.collection.preUpdate(req);
                    }
                    let stuff = yield insert();

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
            if(req.query.store){
                req.body.store=req.query.store;
            }
            stuff = new req.collection(req.body);
            upsertData = stuff.toObject();

            delete upsertData._id;
            if(!upsertData.store){
                upsertData.store=req.query.store;
            }


            let result = yield req.collection.update({_id: stuff.id}, upsertData, {upsert: true})
            var o={id:stuff.id};


            if(stuff.num){o.date=stuff.num};
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
                    if (req.body[arr[i]]|| req.body[arr[i]]==null || req.body[arr[i]]===0|| req.body[arr[i]]==='0' || req.body[arr[i]]==false || req.body[arr[i]]==''){
                        if(arr[i]=='name'){
                            if (req.body[arr[i]]){
                                req.body[arr[i]]=req.body[arr[i]].substring(0,100);
                            }

                        }
                        if(arr[i]=='desc'){
                            var limit=20000;
                            req.body[arr[i]]=req.body[arr[i]].substring(0,limit);
                        }
                        newVal[arr[i]]= req.body[arr[i]];
                    } else {console.log('нет - ',arr[i])}
                }

                if(req.body._id){
                    var query={_id:req.body._id};
                }else if(req.body.ids){
                    var query={_id:{$in:req.body.ids}};
                }



                if(req.query.embeddedName && req.query.embeddedVal){
                    //http://stackoverflow.com/questions/8955910/mongoose-updating-embedded-document-in-array
                    query[req.query.embeddedName+'._id']=req.query.embeddedVal;
                    Object.keys(newVal).forEach(function(key){
                        var newKey=req.query.embeddedName+'.$.'+key;
                        newVal[newKey]=newVal[key];
                        delete newVal[key];
                    })
                }
                if(req.body.$inc){
                    var setData={$inc:newVal};
                }else if(req.body.$mul){
                    var setData={$mul:newVal};
                }else{
                    var setData={$set:newVal};
                }

                if (req.query.embeddedName && req.query.embeddedPush){
                    setData={$push:{}};
                    setData.$push[req.query.embeddedName]=newVal;
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

                let multi =null
                if(req.body.ids){
                    multi={multi:true}
                }

                let oh = yield req.collection.update(query,setData,multi);

                res.json({id:req.body._id});

            }).catch(function(err){
                console.log('error in catch - ',err)
                return next(err)
            })
        }
    })
}






